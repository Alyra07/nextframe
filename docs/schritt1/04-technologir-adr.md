**1. Kontext**
NextFrame ist eine Konferenz-Webanwendung für die fiktive zweitägige Konferenz FrontendNow. Nutzer:innen sollen künftig Sessions durchsuchen und filtern, Speaker-Profile aufrufen und einen persönlichen Zeitplan zusammenstellen können. Dafür sind unterschiedliche Seitentypen, dynamische Detailseiten und eine verständliche Navigation nötig. Die Daten stammen aus einer bereitgestellten statischen conference-data.json; ein eigenes Backend, eine Datenbank oder ein Login sind nicht vorgesehen.
Wir benötigen ein Frontend-Setup, das mit TypeScript arbeitet, wiederverwendbare Vue-Komponenten und spezialisierte Composables unterstützt und sich im zweiköpfigen Team nachvollziehbar strukturieren lässt. Bewertet werden deshalb Routing, Entwicklungs- und Konfigurationsaufwand, Wartbarkeit, Erweiterbarkeit und Flexibilität.

**2. Optionen**
Option A: Nuxt 4 mit Vue 3 und TypeScript
Nuxt bietet dateibasiertes Routing und Konventionen für Seiten, Layouts, Komponenten und Composables. Neue Detailseiten können über Dateien im app/pages/-Verzeichnis angelegt werden. Viele wiederkehrende Imports übernimmt das Framework automatisch.
Vorteile: weniger manuelle Einrichtung, einheitliche Struktur, gute Unterstützung mehrerer Seitentypen und dynamischer Routen.
Nachteile: zusätzliche Nuxt-Konzepte und stärkere Orientierung an Framework-Konventionen.

Option B: Vue 3 mit Vite, TypeScript und Vue Router
Vite bietet ein schlankes Entwicklungs-Setup. Routing wird mit Vue Router ergänzt; weitere Strukturen und Integrationen werden vom Team selbst festgelegt.
Vorteile: hohe Flexibilität, direkter Einfluss auf den Projektaufbau und geringer Framework-Overhead.
Nachteile: mehr eigenständige Konfiguration und zusätzliche Architekturentscheidungen für Routing und Projektorganisation.

Option C: React + Vite + TypeScript (theoretischer Vergleich)
React ermöglicht ebenfalls komponentenbasierte Frontends. Für mehrere Seiten wäre zusätzlich eine Routing-Lösung erforderlich.
Vorteile: großes Ökosystem, flexible Architektur, wiederverwendbare Komponenten.
Nachteile: andere Konzepte als Vue sowie zusätzlicher Integrationsaufwand. Da in der Lehrveranstaltung Vue vorgegeben ist, ist React keine zulässige Wahl, sondern dient nur als Vergleich.

**3. Entscheidung**
Wir entscheiden uns gemeinsam für Nuxt 4 mit Vue 3 und TypeScript. Für NextFrame überwiegen die Vorteile des integrierten Routings und der klaren Konventionen: Sessions, Speaker und der persönliche Zeitplan benötigen auf Dauer unterschiedliche Ansichten. Die einheitliche Struktur erleichtert außerdem die Aufteilung und Abstimmung der Arbeit im Team.
Unsere vereinbarte Trennung in Base/UI-, Feature- und Layout-Komponenten bleibt bestehen. Die Logik wird in spezialisierten Composables wie useConferenceData(), später useSessionFilters() und useSchedule(), gekapselt. Für die Filterung bleibt der geplante Headless-Ansatz erhalten.

**4. Konsequenzen**
Nuxt reduziert wiederkehrende Setup-Arbeit und bietet eine gut erweiterbare Ausgangsbasis. Gleichzeitig entsteht Einarbeitungsaufwand, und wir müssen die Projektkonventionen konsequent beachten. Zusätzliche Funktionen implementieren wir erst in den dafür vorgesehenen Projektschritten.
Nicht Teil dieser Entscheidung: SSR, SSG oder CSR. Die Rendering-Strategie wird erst in Schritt 2 bewertet und festgelegt.