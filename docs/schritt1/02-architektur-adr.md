# Architekturentscheidung: Komponenten- & Ordnerstruktur (ADR)

## 1. Kontext

NextFrame ist eine Konferenz-Webanwendung für FrontendNow. Nutzer sollen Sessions filtern, Speaker-Profile ansehen und einen persönlichen Zeitplan erstellen können. Als Grundlage verwenden wir Nuxt 4 mit Vue 3. Wir benötigen eine übersichtliche Architektur, die klare Verantwortlichkeiten, wiederverwendbare Komponenten und eine einfache Erweiterung in späteren Projektschritten ermöglicht.

## 2. Optionen

### Option A: Rein technische Layer-Struktur

Komponenten werden ausschließlich nach ihrer technischen Funktion in `base/`, `feature/` und `layout/` organisiert. Die Anwendungslogik liegt in den `composables/`, ohne weitere fachliche Gruppierung der Komponenten.

**Vorteile:**
- Einfache, leicht verständliche Ordnerstruktur
- Klare Trennung nach technischen Zuständigkeiten
- Geringer anfänglicher Strukturierungsaufwand

**Nachteile:**
- Komponenten verschiedener Features liegen im selben Verzeichnis
- Zusammengehörige Komponenten sind bei späteren Erweiterungen weniger übersichtlich
- Einzelne Ordner können mit zunehmender Projektgröße unübersichtlich werden

### Option B: Hybride Layer- & Feature-Struktur

Die Komponenten werden ebenfalls in technische Layer unterteilt, innerhalb von `features/` aber zusätzlich nach `sessions/`, `speakers/` und `schedule/` gruppiert. Die Logik wird unabhängig davon in den spezialisierten Composables gekapselt.

**Vorteile:**
- Klare Verantwortlichkeiten durch getrennte Komponenten-Layer
- Zusammengehörige Feature-Komponenten bleiben gruppiert
- Gute Wartbarkeit, Wiederverwendbarkeit und Testbarkeit
- Übersichtliche Erweiterung um neue Funktionen und Komponenten

**Nachteile:**
- Mehr Ordner + Dateien
- Etwas höherer anfänglicher Strukturierungsaufwand
- Verantwortlichkeiten müssen konsequent eingehalten werden

## 3. Entscheidung

Wir haben uns gemeinsam für **Option B – die hybride Layer- & Feature-Struktur** entschieden, da sie technische Verantwortlichkeiten klar trennt und zusammengehörige Komponenten übersichtlich gruppiert.

### Komponenten-Layer

Wir definieren drei klar getrennte Komponentenschichten:

- **Base/UI:** Allgemeine, wiederverwendbare UI-Elemente wie `BaseButton.vue` und `BaseCard.vue`, ohne spezifische Logik.
- **Feature:** Komponenten für Sessions, Speaker und "Mein Programm", beispielsweise `SessionCard.vue` oder `ScheduleButton.vue`.
- **Layout:** Komponenten für die übergreifende Seitenstruktur wie `AppHeader.vue` und `AppNavigation.vue` - sie werden dann im Nuxt-Layout `default.vue` eingebunden.

Die Base/UI-Komponenten bilden die wiederverwendbare Grundlage. Feature-Komponenten können diese verwenden und über Composables auf die benötigte Logik zugreifen. Layout-Komponenten übernehmen die gemeinsame Seitenstruktur.

### Composables & Headless-Ansatz

Wir verfolgen grundsätzlich einen **Headless-Ansatz**, bei dem Fachlogik und reaktiver Zustand von der Darstellung getrennt werden. Die Logik liegt in wiederverwendbaren JavaScript-Composables, während Vue-Komponenten die Benutzeroberfläche übernehmen.

Dafür verwenden wir voraussichtlich drei spezialisierte Composables:
- `useConferenceData.js` - stellt statische Konferenzdaten bereit
- `useSessionFilters.js` - verwaltet Filterzustand und reaktive Filterergebnisse
- `useSchedule.js` - verwaltet den persönlichen Zeitplan und die Speicherung in `localStorage`

**Beispiel Session-Filterung:** Ohne Headless-Aufteilung würden Filterlogik und UI gemeinsam in `SessionFilters.vue` liegen. Wir trennen sie stattdessen in `useSessionFilters.js` (Logik), `SessionFilters.vue` (Bedienoberfläche) und `SessionList.vue` (Ergebnisdarstellung).

Wir halten diese Trennung für sinnvoll, da die Filterlogik unabhängig getestet, wiederverwendet und mit unterschiedlichen Oberflächen kombiniert werden kann. Bei einfachen UI-Elementen verzichten wir dagegen auf unnötige Abstraktionen.

### Geplante Ordnerstruktur & Komponentenübersicht

Die Struktur zeigt als Beispiel ein paar geplante Komponenten und ihre Zuordnung zu den drei Layern. Gemeinsame TypeScript-Typen können bei Bedarf unter `app/types/` definiert werden.

```text
nextframe/
├── app/
│   ├── assets/css/
│   │   └── main.css
│   ├── components/
│   │   ├── base/
│   │   │   ├── BaseButton.vue
│   │   │   └── BaseCard.vue
│   │   ├── features/
│   │   │   ├── sessions/
│   │   │   │   ├── SessionCard.vue
│   │   │   │   ├── SessionFilters.vue
│   │   │   │   └── SessionList.vue
│   │   │   ├── speakers/
│   │   │   │   └── SpeakerCard.vue
│   │   │   └── schedule/
│   │   │       └── ScheduleButton.vue
│   │   └── layout/
│   │       ├── AppHeader.vue
│   │       └── AppNavigation.vue
│   ├── composables/
│   │   ├── useConferenceData.js
│   │   ├── useSessionFilters.js
│   │   └── useSchedule.js
│   ├── layouts/
│   │   └── default.vue
│   ├── pages/
│   │   └── index.vue
│   ├── types/
│   └── app.vue
├── data/
│   └── conference-data.json
├── tokens/
│   └── tokens.css
├── docs/schritt1/
├── public/
├── nuxt.config.ts
├── package.json
└── README.md
```

## 4. Konsequenzen

Die gewählte Architektur verbessert Übersichtlichkeit, Wiederverwendbarkeit und Testbarkeit. Durch spezialisierte Composables bleibt die Fachlogik unabhängig von der Darstellung, während die Feature-Gruppierung spätere Erweiterungen erleichtert.

Nachteilig sind der zusätzliche Strukturierungsaufwand und die höhere Anzahl an Dateien. Deshalb achten wir darauf, die Verantwortlichkeiten konsequent zu trennen, ohne unnötige Abstraktionen einzuführen.