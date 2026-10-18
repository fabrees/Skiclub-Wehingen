#!/usr/bin/env bash
# Verwaltet die Releases des Skiclub Wehingen auf der VPS.
#
#   scw-release.sh staging <commit>   Release als Testseite (Port 3001) aktivieren
#   scw-release.sh promote            Testseiten-Version live schalten (Port 3000)
#   scw-release.sh rollback           Live-Seite auf die vorherige Version zurücksetzen
#   scw-release.sh status             Zeigt, welche Version wo läuft
#   scw-release.sh cleanup            Alte Releases löschen
#
# Wird von GitHub Actions aufgerufen, kann aber auch direkt auf dem Server
# ausgeführt werden. Einrichtung: siehe deploy/README.md

set -euo pipefail

BASE="${SCW_BASE:-/var/www/nextjs/scw}"
ECOSYSTEM="$BASE/ecosystem.config.js"
KEEP_RELEASES="${SCW_KEEP_RELEASES:-3}"

APP_LIVE="scw"
APP_STAGING="scw-staging"
PORT_LIVE=3000
PORT_STAGING=3001

# Bei SSH-Aufrufen ohne Login-Shell sind node/pm2 aus nvm sonst nicht im PATH
if ! command -v pm2 >/dev/null 2>&1 && [ -s "$HOME/.nvm/nvm.sh" ]; then
  # shellcheck disable=SC1091
  . "$HOME/.nvm/nvm.sh" >/dev/null
fi

fail() {
  echo "FEHLER: $*" >&2
  exit 1
}

# Ziel eines Symlinks, leer wenn es ihn nicht gibt
link_target() {
  if [ -L "$BASE/$1" ]; then
    readlink -f "$BASE/$1"
  fi
}

# Symlink atomar ersetzen, damit er nie kurz fehlt
set_link() {
  local name="$1" target="$2"
  ln -sfn "$target" "$BASE/.$name.tmp"
  mv -Tf "$BASE/.$name.tmp" "$BASE/$name"
}

# PM2 kann sich den aufgelösten Pfad hinter dem Symlink merken. Deshalb den
# Prozess neu anlegen statt nur neu zu starten, so läuft sicher die neue Version.
restart_app() {
  pm2 delete "$1" >/dev/null 2>&1 || true
  pm2 start "$ECOSYSTEM" --only "$1"
  pm2 save >/dev/null
}

health_check() {
  local port="$1"
  curl --silent --show-error --fail --output /dev/null \
    --retry 15 --retry-delay 2 --retry-connrefused --max-time 10 \
    "http://127.0.0.1:$port/"
}

cmd_staging() {
  local commit="${1:-}"
  [ -n "$commit" ] || fail "Commit fehlt: scw-release.sh staging <commit>"
  local release="$BASE/releases/$commit"
  [ -f "$release/server.js" ] || fail "$release/server.js nicht gefunden"

  set_link staging "$release"
  restart_app "$APP_STAGING"
  health_check "$PORT_STAGING" || fail "Testseite antwortet nicht – siehe: pm2 logs $APP_STAGING"
  echo "Testseite läuft mit ${commit:0:7} auf Port $PORT_STAGING."
  cmd_cleanup
}

cmd_promote() {
  local target current previous
  target="$(link_target staging)"
  current="$(link_target current)"
  previous="$(link_target previous)"
  [ -n "$target" ] || fail "Es gibt noch keine Testseite, die freigegeben werden kann."

  if [ "$target" = "$current" ]; then
    echo "Die Testseiten-Version $(basename "$target" | cut -c1-7) ist bereits live."
    return
  fi

  [ -n "$current" ] && set_link previous "$current"
  set_link current "$target"
  restart_app "$APP_LIVE"

  if ! health_check "$PORT_LIVE"; then
    echo "Live-Seite antwortet nicht – setze automatisch zurück." >&2
    if [ -n "$current" ]; then
      set_link current "$current"
      restart_app "$APP_LIVE"
    fi
    if [ -n "$previous" ]; then
      set_link previous "$previous"
    else
      rm -f "$BASE/previous"
    fi
    fail "Freigabe abgebrochen, siehe: pm2 logs $APP_LIVE"
  fi
  echo "Live geschaltet: $(basename "$target" | cut -c1-7)."
}

cmd_rollback() {
  local previous current
  previous="$(link_target previous)"
  current="$(link_target current)"
  [ -n "$previous" ] || fail "Keine vorherige Version vorhanden."
  [ -f "$previous/server.js" ] || fail "Vorherige Version $previous ist nicht mehr vorhanden."

  set_link current "$previous"
  [ -n "$current" ] && set_link previous "$current"
  restart_app "$APP_LIVE"
  health_check "$PORT_LIVE" || fail "Live-Seite antwortet nicht – siehe: pm2 logs $APP_LIVE"
  echo "Zurückgesetzt auf $(basename "$previous" | cut -c1-7)."
}

cmd_status() {
  local name target
  for name in current staging previous; do
    target="$(link_target "$name")"
    printf '%-9s %s\n' "$name" "${target:+$(basename "$target")}"
  done
  pm2 list
}

# Behält die neuesten Releases sowie alles, worauf current/staging/previous
# zeigt. Unvollständige Releases (abgebrochene Übertragung) werden immer gelöscht.
cmd_cleanup() {
  local keep_paths count=0 release
  keep_paths="$(link_target current) $(link_target staging) $(link_target previous)"

  while IFS= read -r release; do
    [ -n "$release" ] || continue
    case " $keep_paths " in *" $release "*) count=$((count + 1)); continue ;; esac
    if [ ! -f "$release/server.js" ]; then
      rm -rf -- "$release"
      echo "Unvollständiges Release gelöscht: $(basename "$release")"
      continue
    fi
    count=$((count + 1))
    if [ "$count" -gt "$KEEP_RELEASES" ]; then
      rm -rf -- "$release"
      echo "Altes Release gelöscht: $(basename "$release")"
    fi
  done < <(ls -1dt "$BASE"/releases/*/ 2>/dev/null | sed 's:/$::')
}

case "${1:-}" in
  staging)  shift; cmd_staging "$@" ;;
  promote)  cmd_promote ;;
  rollback) cmd_rollback ;;
  status)   cmd_status ;;
  cleanup)  cmd_cleanup ;;
  *)
    echo "Verwendung: $0 {staging <commit>|promote|rollback|status|cleanup}" >&2
    exit 2
    ;;
esac
