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


### 2. Session-Detailseiten – SSG

**Kontext**

Für jede der 20 Sessions von NextFrame gibt es eine eigene Detailseite unter `/sessions/[id]`. Angezeigt werden unter anderem Titel, Abstract, Tag, Uhrzeit, Raum, Track, Level, Format und die zugehörigen Speaker. Sämtliche Informationen stammen aus der statischen `conference-data.json` und stehen bereits zur Build-Zeit vollständig fest.

**Optionen**

- **SSG** eignet sich, weil alle 20 Routen und ihre Inhalte bereits beim Build bekannt sind. Die Seiten können daher vollständig vorab erzeugt und anschließend ohne weitere Datenabfrage ausgeliefert werden.

- **ISR** wäre interessant, wenn Session-Daten zwar überwiegend statisch wären, aber bspw. kurzfristige Raum- oder Zeitänderungen übernommen werden müssten. Dafür wäre jedoch eine aktualisierbare Datenquelle und eine Revalidierungsstrategie notwendig.

**Entscheidung**

Wir entscheiden uns für **SSG**. Für den vorhandenen statischen Datensatz bietet eine erneute Generierung einzelner Seiten keinen Vorteil gegenüber einem normalen Build. Gleichzeitig passen die Detailseiten gut zur Vorabgenerierung, da ihre Anzahl begrenzt und bekannt ist. Der zentrale Datenzugriff über `useConferenceData()` bleibt dabei unverändert und die dynamischen Session-Routen können beim Build erzeugt werden. Gegenüber einer Laufzeitlösung vermeiden wir damit unnötige Serverlogik und zusätzliche Datenzugriffe.

**Konsequenzen**

Die Detailseiten sind direkt auslieferbar und benötigen zur Laufzeit keine serverseitige Verarbeitung. Änderungen an `conference-data.json` werden allerdings erst nach einem neuen Build sichtbar. Für den in diesem Projekt vollständig statischen Datensatz ist diese Einschränkung akzeptabel.


### 3. Speaker-Profile - SSG


### 4. „Mein Programm“ Dashboard – CSR

**Kontext**

Im Dashboard „Mein Programm“ können NutzerInnen Sessions zu ihrem persönlichen Zeitplan hinzufügen oder daraus entfernen. Gespeichert werden ausschließlich die ausgewählten Session-IDs im `localStorage` unter `nextframe:my-program`. Damit ist der dargestellte Inhalt für jede Person unterschiedlich und ausschließlich im jeweiligen Browser verfügbar.

**Optionen**

- **CSR** kann direkt auf `localStorage` zugreifen und den persönlichen Zeitplan nach der Rehydration des States darstellen. Änderungen durch hinzufügen/entfernen einer Session können unmittelbar reaktiv übernommen werden.

- **SSG** könnte zwar die Grundstruktur des Dashboards vorab erzeugen, kennt beim Build jedoch keine persönliche Auswahl. Der eigentliche nutzerspezifische Inhalt müsste daher trotzdem clientseitig ergänzt werden.

- **SSR** könnte personalisierte Inhalte bereits auf dem Server erzeugen, würde dafür aber voraussetzen, dass der persönliche Zeitplan dem Server bekannt ist, etwa über Login, Cookies oder serverseitige Speicherung. Diese Infrastruktur ist aber in unserem Projekt nicht vorgesehen.

**Entscheidung**

Wir entscheiden uns für **CSR**, weil die einzige Quelle des personalisierten Zustands der Browser ist. `useSchedule()` verwaltet den gemeinsamen reaktiven State, und beim clientseitigen Initialisieren werden dann gespeicherte IDs aus `localStorage` gelesen, validiert und über `useConferenceData()` den vollständigen Session-Daten zugeordnet. CSR entspricht damit direkt unserer bestehenden State-Management-Architektur und benötigt weder Backend noch zusätzliche Synchronisationsmechanismen.

**Konsequenzen**

Änderungen am persönlichen Programm werden sofort dargestellt und bleiben nach einem Reload erhalten. Dafür kann der individuelle Inhalt erst nach der clientseitigen Rehydration angezeigt werden. Außerdem bleibt der Zeitplan ohne zusätzliche Synchronisierung auf den jeweiligen Browser beschränkt.