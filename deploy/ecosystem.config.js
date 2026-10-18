// PM2-Konfiguration für die VPS. Wird bei jedem Deployment nach
// /var/www/nextjs/scw/ecosystem.config.js kopiert, siehe deploy/README.md
const BASE = "/var/www/nextjs/scw";

module.exports = {
  apps: [
    {
      // Live-Seite, nginx leitet sc-wehingen.de hierher
      name: "scw",
      cwd: `${BASE}/current`,
      script: "server.js",
      node_args: `--env-file=${BASE}/shared/.env.production`,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        // Nur lokal lauschen, erreichbar ausschließlich über nginx
        HOSTNAME: "127.0.0.1",
      },
    },
    {
      // Testseite, erreichbar über test.sc-wehingen.de oder SSH-Tunnel
      name: "scw-staging",
      cwd: `${BASE}/staging`,
      script: "server.js",
      node_args: `--env-file=${BASE}/shared/.env.staging`,
      env: {
        NODE_ENV: "production",
        PORT: 3001,
        HOSTNAME: "127.0.0.1",
      },
    },
  ],
};
