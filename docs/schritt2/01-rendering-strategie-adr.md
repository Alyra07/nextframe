# Rendering-Strategie ADR

## Einleitung & Entscheidungskriterien

Die Rendering-Strategie wird für jeden der vier Anwendungsteile separat festgelegt, da sich deren Anforderungen an Aktualität, Interaktivität und Personalisierung unterscheiden. Dafür vergleichen wir Static Site Generation (SSG), Client-Side Rendering (CSR), Server-Side Rendering (SSR) und Incremental Static Regeneration (ISR).

Die vier Anwendungsteile sind:
1. Session-Übersicht mit Filtern
2. Session-Detailseiten
3. Speaker-Profile
4. "Mein Programm" Dashboard

Entscheidend ist vor allem, ob Inhalte bereits zur Build-Zeit feststehen, sich während der Laufzeit verändern können oder von clientseitig gespeicherten Nutzerdaten abhängen. Zusätzlich berücksichtigen wir Ladeverhalten, Performance und den Implementierungsaufwand.

Ziel ist es, für jeden Anwendungsteil eine nachvollziehbare Rendering-Entscheidung zu treffen, die zu den tatsächlichen Dateneigenschaften passt und mit der technischen Umsetzung übereinstimmt.

## Entscheidungspunkte pro Anwendungsteil

### 1. Session-Übersicht mit Filtern - SSG mit clientseitiger Filterung

### 2. Session-Detailseiten - SSG

**Kontext**

Für jede der 20 Sessions unserer Konferenzplattform NextFrame gibt es eine eigene Detailseite unter `/sessions/[id]`. Dort werden Titel, Beschreibung, Tag, Uhrzeit, Raum, etc., sowie die zugehörigen Speaker angezeigt. Alle Informationen stammen aus der statischen `conference-data.json` und stehen bereits zur Build-Zeit fest.

**Optionen**

- **SSG (Static Site Generation):** Die Detailseiten werden während des Builds als statisches HTML generiert. Dadurch können sie schnell ausgeliefert werden, ohne dass bei jedem Aufruf eine serverseitige Berechnung notwendig ist.
- **SSR (Server-Side Rendering):** Die HTML-Seiten werden bei jeder Anfrage serverseitig gerendert - das ist bei häufigen Datenänderungen sinnvoll.
- **ISR (Incremental Static Regeneration):** Statische Seiten können nach festgelegten Intervallen oder gezielter Revalidierung neu generiert werden, sofern eine aktuelle Datenquelle verfügbar ist.

**Entscheidung**

Wir entscheiden uns für **SSG**, da die Session-Daten vollständig vorliegen und keine laufenden Aktualisierungen notwendig sind. Nuxt 4 unterstützt die Vorabgenerierung der dynamischen Session-Routen und der Datenzugriff erfolgt weiterhin zentral über `useConferenceData()`. Auch bei einer realen Konferenz wäre SSG für selten veränderte Session-Details grundsätzlich geeignet, solange bei Änderungen zeitnah ein neuer Build + Deployment erfolgen können. Kurzfristige Raum- oder Zeitverschiebungen könnten jedoch aktuellere Daten erfordern – für diesen Fall wäre ISR eine mögliche Alternative. Da unser Projekt aber ausschließlich einen statischen JSON-Datensatz verwendet, überwiegen für uns die Vorteile von SSG.

**Konsequenzen**

Die Detailseiten können schnell und ohne laufende Serverberechnung ausgeliefert werden. Ein Nachteil ist, dass Änderungen an den Konferenzdaten einen erneuten Build erfordern. Da unser Datensatz aber statisch ist, stellt das für dieses Projekt keine Einschränkung dar.

### 3. Speaker-Profile - SSG

### 4. "Mein Programm" Dashboard - CSR