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

**Kontext**

Die Session-Übersicht zeigt alle 20 Sessions von NextFrame und ermöglicht eine kombinierbare Filterung nach Track, Konferenztag und Level. Die Daten stammen aus der statischen `conference-data.json` und stehen bereits zur Build-Zeit fest. Während die Session-Inhalte unverändert bleiben, müssen die Filterergebnisse auf Nutzereingaben reagieren.

**Optionen**

- **SSG (mit clientseitiger Filterung):** Die vollständige Übersicht wird vorab generiert. Anschließend können die vorhandenen Sessions im Browser ohne zusätzliche Serveranfragen gefiltert werden.

- **SSR:** Die Übersicht könnte bei jedem Seitenaufruf serverseitig erzeugt werden - bei unserem statischen Datensatz entsteht dadurch jedoch kein Aktualitätsvorteil.

- **ISR:** Wäre sinnvoll, wenn sich der Konferenzzeitplan gelegentlich ändern würde. Dafür wären allerdings eine aktualisierbare Datenquelle und entsprechende Revalidierungsmechanismen notwendig.

**Entscheidung**

Wir entscheiden uns für **SSG mit clientseitiger Filterung**, da sämtliche Session-Daten bereits beim Build verfügbar sind. Die Startseite `/` wird über die Nuxt-Konfiguration vorab generiert. Obwohl SSR oder ISR bei einem Konferenzzeitplan sinnvoll sein könnten, verzichten wir darauf, da unser Projekt ausschließlich einen statischen, schreibgeschützten Datensatz ohne Backend verwendet. `useConferenceData()` stellt die Daten zentral bereit, während `useSessionFilters()` die reaktive Filterlogik übernimmt. Durch die Trennung in `SessionFilters.vue` und `SessionList.vue` bleiben Bedienoberfläche und Ergebnisdarstellung unabhängig von der Filterlogik. Da lediglich 20 Sessions verarbeitet werden, ist die clientseitige Filterung ohne zusätzliche Serveranfragen ausreichend performant. Auch kombinierte Filter können dadurch unmittelbar angewendet werden.

**Konsequenzen**

Die Übersicht ist schnell verfügbar und Filteränderungen werden ohne Neuladen angezeigt. Änderungen am Konferenzdatensatz erfordern allerdings einen erneuten Build. Kurzfristige Zeitplanänderungen können daher nicht automatisch übernommen werden.


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


### 3. Speaker-Profile – SSG

**Kontext**

Für alle 18 Speaker der Konferenz gibt es eine eigene Profilseite unter der jeweiligen `/speakers/[id]` Route. Angezeigt werden Name, Titel, Firma, Biografie und die zugehörigen Sessions mit Verlinkungen zu deren Detailseiten. Sämtliche Informationen stammen aus der statischen `conference-data.json` und stehen bereits zur Build-Zeit vollständig zur Verfügung.

**Optionen**

- **SSG:** Alle Speaker-Profile können bereits beim Build generiert und anschließend ohne zusätzliche Serververarbeitung ausgeliefert werden.

- **ISR:** Wäre sinnvoll, wenn Speaker-Informationen oder Session-Zuordnungen nachträglich aktualisiert werden müssten. Dafür wären jedoch eine aktualisierbare Datenquelle und entsprechende Revalidierungsmechanismen notwendig.

**Entscheidung**

Wir entscheiden uns für **SSG**, da sämtliche Speaker-Daten und ihre Session-Zuordnungen bereits feststehen. In `nuxt.config.ts` werden die 18 Profilrouten aus `conference-data.json` ermittelt und für das Prerendering registriert. Die dynamische Seite `/speakers/[id]` nutzt `useConferenceData()`, um den jeweiligen Speaker und dessen Sessions zentral abzurufen. `SpeakerProfile.vue` übernimmt ausschließlich die Darstellung. Dadurch bleibt die bestehende Trennung zwischen Datenzugriff und UI erhalten. Da alle Profile vorab generiert werden können, ist eine serverseitige Verarbeitung bei jedem Aufruf aus unserer Sicht nicht nötig.

**Konsequenzen**

Die Profilseiten sind schnell verfügbar und benötigen zur Laufzeit keine serverseitige Datenverarbeitung. Änderungen an Speaker-Informationen oder Session-Zuordnungen erfordern allerdings einen erneuten Build. Da der Datensatz im Projekt unveränderlich ist, stellt dies keine wesentliche Einschränkung dar.


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