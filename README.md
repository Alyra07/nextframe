# NextFrame

**NextFrame** ist eine Konferenzplattform, die im Rahmen der Lehrveranstaltung NextGen Web Frontends als Teamprojekt entwickelt wird.

Die Plattform präsentiert die fiktive zweitägige Web-Frontend-Konferenz **FrontendNow** und soll die Suche nach Sessions, die Anzeige von Speaker-Profilen und die Erstellung eines persönlichen Konferenzprogramms ermöglichen. Die Anwendung basiert auf **Nuxt 4 & Vue 3**.

### Contributors:
- Antonia Novak (GitHub: T0niana)
- Mirjam McLachlan (GitHub: Alyra07)


## Setup

### Voraussetzungen

- Node.js in einer aktuellen, von Nuxt unterstützten Version
- npm

### Installation

**Repository klonen:**
```bash
git clone https://github.com/Alyra07/nextframe.git
cd nextframe
```

**Dependencies installieren:**
```bash
npm ci
```
`npm ci` installiert die im `package-lock.json` festgelegten Dependency-Versionen.

**Note:** Bei der Überprüfung mit `npm audit` wurden kritische Sicherheitsmeldungen in indirekten Dependencies festgestellt. Kompatible Updates wurden mit `npm audit fix` durchgeführt - Auf einen erzwungenen Downgrade von Nuxt haben wir verzichtet, um die Kompatibilität des Projekts nicht zu gefährden. Verbleibende Meldungen werden bei zukünftigen Dependency-Updates erneut überprüft.

**Entwicklungsserver starten:**
```bash
npm run dev
```
Anschließend die im Terminal angezeigte Adresse öffnen (`http://127.0.0.1:3000/`).


### Statischen Build generieren (SSG + CSR)

NextFrame verwendet unterschiedliche Rendering-Strategien:

- **SSG:** Session-Übersicht, Session-Detailseiten & Speaker-Profile
- **CSR:** Das Dashboard „Mein Programm“ wird clientseitig gerendert. Die persönliche Session-Auswahl wird ausschließlich im Browser über `localStorage` verwaltet.

Die Rendering-Strategien sind in `nuxt.config.ts` konfiguriert und unter `docs/schritt2/01-rendering-strategie-adr.md` begründet.

**Statischen Build erstellen:**
```bash
npm run generate
```
Nuxt erstellt die Dateien im Verzeichnis `.output/public/`. Die dynamischen Detailrouten werden über die Prerender-Konfiguration registriert.

**Generierten Build lokal testen:**
```bash
npx serve .output/public
```
Anschließend die im Terminal angezeigte lokale Adresse öffnen.

**Funktionstest:** Die Session-Übersicht, Speaker-Profile und Detailseiten sollten direkt erreichbar sein. Im Dashboard „Mein Programm“ sollte die persönliche Session-Auswahl nach einem Neuladen erhalten bleiben.


## Projektstruktur

- `app/` – Anwendungscode, Seiten, Layouts und Komponenten
- `app/composables/` – Wiederverwendbare Anwendungslogik
- `data/` – Statischer Konferenzdatensatz
- `tokens/` – Design Tokens
- `docs/` – Dokumentation unserer Arbeit