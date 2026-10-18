# Deployment: Testseite, Freigabe und Rollback

Die Website wird in GitHub Actions gebaut und auf die VPS übertragen. Jede
Version landet in einem eigenen Ordner. Zwei PM2-Prozesse laufen parallel:

| Prozess       | Port | Zeigt auf | Erreichbar über                  |
|---------------|------|-----------|----------------------------------|
| `scw`         | 3000 | `current` | sc-wehingen.de (Live-Seite)      |
| `scw-staging` | 3001 | `staging` | test.sc-wehingen.de / SSH-Tunnel |

```
/var/www/nextjs/scw/
├── releases/<commit>/      fertige Builds, die letzten 5 bleiben erhalten
├── current  -> releases/…  Live-Seite
├── staging  -> releases/…  Testseite
├── previous -> releases/…  Version vor der letzten Freigabe
├── shared/
│   ├── .env.production
│   └── .env.staging
├── ecosystem.config.js     kommt bei jedem Deployment aus deploy/
└── scw-release.sh          kommt bei jedem Deployment aus deploy/
```

## Ablauf im Alltag

1. **Änderung pushen** (Push auf `main`) → Workflow **„Testseite deployen“**
   baut und aktualisiert die Testseite. Die Live-Seite bleibt unverändert.
   Einen anderen Branch testet man über *Actions → Testseite deployen →
   Run workflow* und Auswahl des Branches.
2. **Testseite prüfen** (siehe unten).
3. **Live schalten:** *Actions → Freigabe / Rollback → Run workflow →
   `freigeben`*. Die Live-Seite übernimmt genau die getestete Version, es
   wird nichts neu gebaut. Antwortet die Live-Seite danach nicht, wird
   automatisch auf die vorherige Version zurückgesetzt.
4. **Bei Problemen:** derselbe Workflow mit `zuruecksetzen` holt die
   vorherige Version zurück.

`status` zeigt, welche Version wo läuft.

> **Hinweis:** Den Button „Run workflow“ zeigt GitHub nur für Workflows, die
> im Standard-Branch (`main`) liegen. Die Workflows müssen also einmal nach
> `main` gelangen, bevor man andere Branches damit testen kann (siehe
> Schritt 7).

## Einmalige Einrichtung auf der VPS

Alle Befehle als `webuser` auf der VPS, sofern nicht anders angegeben.

### 1. Voraussetzungen prüfen

```bash
node -v      # mindestens v20.6 wegen --env-file, empfohlen v22
pm2 -v
curl --version
pm2 status   # wie heißt und wo läuft der aktuelle Prozess?
pm2 describe scw
```

Aus `pm2 describe scw` notieren: **script path**, **script args**,
**exec cwd** und **interpreter**. Damit lässt sich der alte Betrieb im
Notfall wiederherstellen (Schritt 8). PM2 verwaltet Prozesse pro
Linux-Benutzer: `pm2 status` muss als derselbe Benutzer laufen, den auch
GitHub Actions verwendet (`webuser`), sonst sieht man dort den Prozess
nicht.

Der Build entsteht in GitHub Actions auf Linux x64. Die VPS muss ebenfalls
Linux x64 sein (wegen der nativen Bildbibliothek `sharp`).

### 2. Verzeichnisse anlegen

```bash
sudo mkdir -p /var/www/nextjs/scw/releases /var/www/nextjs/scw/shared
sudo chown -R webuser:webuser /var/www/nextjs/scw
chmod 700 /var/www/nextjs/scw/shared
```

### 3. Umgebungsvariablen hinterlegen

Die bisherigen Werte aus der alten Installation übernehmen. `npm start`
liest neben `.env` auch `.env.production` und `.env.local` – mit
`ls -a /srv/www/homepage/app` prüfen, welche es gibt, und deren Inhalte in
eine Datei zusammenführen:

```bash
cp /srv/www/homepage/app/.env /var/www/nextjs/scw/shared/.env.production
cp /var/www/nextjs/scw/shared/.env.production /var/www/nextjs/scw/shared/.env.staging
chmod 600 /var/www/nextjs/scw/shared/.env.*
```

In `.env.staging` anpassen:

- `NEXTAUTH_URL=https://test.sc-wehingen.de` (bzw. `http://localhost:3001`,
  wenn nur per SSH-Tunnel getestet wird) – sonst klappt der Admin-Login
  auf der Testseite nicht.

Beide Dateien müssen existieren, sonst startet der jeweilige Prozess nicht.

> **Achtung:** Mit denselben Werten nutzt die Testseite **dieselbe
> Datenbank** wie die Live-Seite. Beiträge, die man auf der Testseite im
> Admin-Bereich anlegt, erscheinen sofort auch live, und Mietanfragen
> verschicken echte E-Mails. Zum Ansehen ist das unproblematisch.

### 4. GitHub einrichten

Unter *Settings → Secrets and variables → Actions* müssen vorhanden sein:

| Secret            | Inhalt                                               |
|-------------------|------------------------------------------------------|
| `VPS_HOST`        | IP-Adresse oder Hostname der VPS                     |
| `SSH_PRIVATE_KEY` | privater Deploy-Schlüssel von `webuser`              |
| `VPS_KNOWN_HOSTS` | geprüfter Hostschlüssel (`ssh-keyscan -H <host>`, Fingerprint vergleichen) |

Optional unter *Settings → Environments* die Umgebung `production` anlegen
und „Required reviewers“ aktivieren. Dann muss jede Freigabe in GitHub
zusätzlich bestätigt werden.

### 5. Testseite erreichbar machen

**Variante A – SSH-Tunnel (ohne DNS, nur für einen selbst):**

```bash
ssh -L 3001:127.0.0.1:3001 webuser@<VPS>
```

Danach im Browser `http://localhost:3001` öffnen.

**Variante B – Subdomain mit Passwort (zum gemeinsamen Testen):**

1. DNS: A-/AAAA-Eintrag `test.sc-wehingen.de` auf die VPS.
2. Passwortdatei anlegen (als root):

   ```bash
   apt install apache2-utils
   htpasswd -c /etc/nginx/.htpasswd-scw vorstand
   ```

3. nginx-Block anlegen, z.B. `/etc/nginx/sites-available/test.sc-wehingen.de`:

   ```nginx
   server {
       listen 80;
       listen [::]:80;
       server_name test.sc-wehingen.de;
       return 301 https://$host$request_uri;
   }

   server {
       listen 443 ssl;
       listen [::]:443 ssl;
       server_name test.sc-wehingen.de;

       ssl_certificate     /etc/letsencrypt/live/test.sc-wehingen.de/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/test.sc-wehingen.de/privkey.pem;

       auth_basic           "Testumgebung";
       auth_basic_user_file /etc/nginx/.htpasswd-scw;
       add_header X-Robots-Tag "noindex, nofollow" always;

       location / {
           proxy_pass http://127.0.0.1:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. Zertifikat holen, z.B. mit Let's Encrypt (`certbot --nginx -d
   test.sc-wehingen.de`, oder erst den Port-80-Block aktivieren und
   `certbot certonly --webroot` nutzen). Danach `nginx -t && systemctl reload nginx`.

Die Live-Konfiguration (`proxy_pass http://localhost:3000`) bleibt
unverändert. Am besten auch dort `127.0.0.1` statt `localhost` eintragen,
damit nginx nicht zuerst IPv6 (`::1`) versucht – der Prozess lauscht nur auf
IPv4.

### 6. Erstes Deployment auf die Testseite

Den Workflow **„Testseite deployen“** laufen lassen (Push auf `main` oder
manuell). Er legt das erste Release an, setzt `staging` und startet
`scw-staging`. Prüfen:

```bash
/var/www/nextjs/scw/scw-release.sh status
pm2 logs scw-staging --lines 50
```

Die Live-Seite läuft bis hierhin unverändert im alten Betrieb weiter.

### 7. Reihenfolge, um den Redesign-Branch zu testen

1. Die Deployment-Dateien (`.github/workflows/*`, `deploy/`,
   `next.config.mjs` mit `output: 'standalone'`) nach `main` bringen. Der
   Push startet ein Deployment der Testseite mit dem bisherigen Stand von
   `main` – die Live-Seite bleibt unberührt.
2. *Actions → Testseite deployen → Run workflow* mit Branch
   `design-relaunch` starten.
3. Testseite prüfen. Wenn alles passt: `design-relaunch` nach `main` mergen
   und anschließend **freigeben**.

### 8. Live-Seite einmalig auf den neuen Betrieb umstellen

Erst wenn die Testseite einwandfrei läuft. **Kurze Unterbrechung der
Live-Seite (wenige Sekunden).**

```bash
cd /var/www/nextjs/scw

# alten Prozess beenden (Prozessdefinition wird entfernt, Dateien bleiben)
pm2 delete scw

# Testseiten-Version live schalten und neuen Prozess starten
./scw-release.sh promote
pm2 save
```

Danach `https://sc-wehingen.de` prüfen. Damit die Prozesse nach einem
Neustart der VPS wieder laufen, einmalig `pm2 startup` ausführen und den
ausgegebenen Befehl als root bestätigen.

**Zurück zum alten Betrieb**, falls etwas nicht klappt – die bisherige
Installation in `/srv/www/homepage/app` wird vom neuen Ablauf nicht
angefasst und bleibt dafür liegen:

```bash
pm2 delete scw
cd /srv/www/homepage/app
pm2 start npm --name scw -- start
pm2 save
```

Vorher mit den in Schritt 1 notierten Werten abgleichen, ob der alte
Prozess genau so gestartet wurde (z.B. mit zusätzlichem Port-Argument).
Erst wenn der neue Betrieb einige Zeit stabil läuft, kann
`/srv/www/homepage/app` gelöscht werden.

## Nach jeder Freigabe kurz testen

- Startseite, Unterseiten und Bilder laden über HTTPS
- Neuigkeiten erscheinen (Datenbank)
- „Mitglied werden“ und „Mietpreise“ öffnen die PDFs
- Mietanfrage kommt per E-Mail an
- Admin-Login und Beitrag bearbeiten
- `pm2 logs scw` ohne neue Fehler

## Fehlerbehebung

**Prozess startet nicht / „node: bad option: --env-file“**
Node ist älter als 20.6. Unter `webuser` Node 22 installieren (z.B. per
nvm) und PM2 damit neu installieren.

**`pm2: command not found` in GitHub Actions**
Das Skript lädt nvm automatisch aus `~/.nvm/nvm.sh`. Liegt Node woanders,
den Pfad zu `pm2` in der `PATH`-Variable von `webuser` für nicht
interaktive Shells eintragen (z.B. in `~/.bashrc` vor der Zeile, die bei
nicht interaktiven Shells abbricht).

**Testseite zeigt eine alte Version**
`./scw-release.sh status` zeigt, worauf `staging` zeigt;
`pm2 describe scw-staging` zeigt das tatsächliche
Arbeitsverzeichnis.

**Speicherplatz**
Es bleiben die letzten 5 Releases plus alle, auf die `current`, `staging`
oder `previous` zeigen. Unveränderte Dateien werden per Hardlink geteilt,
belegen also nur einmal Platz. Anzahl ändern: Umgebungsvariable
`SCW_KEEP_RELEASES`.
