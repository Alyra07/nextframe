# NextFrame

NextFrame ist eine Konferenzplattform, die im Rahmen der Lehrveranstaltung NextGen Web Frontends als Teamprojekt entwickelt wird.

Die Plattform präsentiert die fiktive zweitägige Web-Frontend-Konferenz FrontendNow und soll in Zukunft die Suche nach Sessions, die Anzeige von Speaker-Profilen und die Erstellung eines persönlichen Konferenzprogramms ermöglichen.

Die Anwendung basiert auf Nuxt 4 und Vue 3.

## Setup

### Voraussetzungen

- Node.js in einer aktuellen, von Nuxt unterstützten Version
- npm

### Installation

Repository klonen:

```bash
git clone https://github.com/Alyra07/nextframe
cd nextframe
```

Dependencies installieren:

```bash
npm install
```

Entwicklungsserver starten:

```bash
npm run dev
```

Anschließend die im Terminal angezeigte Adresse öffnen (z.B.: `http://localhost:3000`).

## Projektstruktur

- `app/` – Anwendungscode, Seiten, Layouts und Komponenten
- `app/composables/` – Wiederverwendbare Anwendungslogik
- `data/` – Statischer Konferenzdatensatz
- `tokens/` – Design Tokens
- `docs/` – Dokumentation unserer Arbeit