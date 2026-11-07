# AI-LOG - Antonia Novak (Person 1)


## Datum: 06.11.2026

### 1. Refactoring der SessionList mit BaseCard + SessionCard

**Tool:** ChatGPT (OpenAI, GPT-6)

**Prompt:** "Wenn du dir unser `02-architektur-adr.md` und das `03-state-management-konzept.md` anschaust, dann denke ich es wäre doch sinnvoll wenn ich statt der einfachen SessionList auf `index.vue` eine `BaseCard.vue` und `SessionCard.vue` erstelle, damit es in Zukunft einfacher ist die einzelnen session elemente in der liste anzupassen. Bitte hilf mir bei dem refactor, wenn du das auch so siehst. Ich habe unsere ADRs und die `SessionList` + `/pages/index.vue` files angehängt."

**Zweck:** Überprüfung und Verbesserung der Komponentenstruktur gemäß unserem Architektur-ADR. ChatGPT hat die Aufteilung in wiederverwendbare components empfohlen, daraufhin habe ich die Darstellung einzelner Sessions in `SessionCard.vue` ausgelagert, die gemeinsame Kartenstruktur über `BaseCard.vue` umgesetzt und `SessionList.vue` vereinfacht.

### 2. Session-Übersicht CSS Styling

**Tool:** ChatGPT (OpenAI, GPT-6)

**Prompt:** "Wir haben schon Branding und Design-Tokens für unser Projekt festgelegt (*ADR und tokens.css angehängt*). Nachdem ich jetzt die `BaseCard` und `SessionCard` components angelegt hab (*beide Files angehängt*) ist jetzt der perfekte Zeitpunkt diese ein bisschen zu stylen damit die landing page ansprechend und im Sinne unseres brandings aussieht. Bitte hilf mir diese neuen components folgendermaßen mit scoped style umzugestalten: [...] *Hier habe ich ausführlich beschrieben wie die Session-Übersicht aussehen soll*"

**Zweck:** Styling der `BaseCard` und `SessionCard` entsprechend unserem NextFrame-Branding. Ich wurde bei der Umsetzung mit `scoped CSS` und bestehenden Design Tokens unterstützt. Anschließend habe ich das Styling selbst angepasst, um eine übersichtliche Darstellung der Session-Informationen zu erreichen.

### 3. SessionFilters CSS Styling

**Tool:** ChatGPT (OpenAI, GPT-6)

**Prompt:** "Hilf mir bitte auch mit dem CSS styling für die `SessionFilters.vue`. Sie müssen nicht genau wie die Cards aussehen, aber sollen besser zu den Farben und dem branding von NextFrame passen. Natürlich sollst du auch wieder meine vorher geschickten `tokens.css` verwenden. `SessionFilters.vue` file: *Hier habe ich das File eingefügt*"

**Zweck:** Ebenfall Anpassung der `SessionFilters.vue` an unser Branding und die vorhandenen Design Tokens. ChatGPT hat eine Grundlage für das scoped CSS erstellt, damit die Filteroberfläche optisch zur neu gestalteten Session-Übersicht passt und ich das Design anschließend weiter anpassen kann.

### 4. Extraktion einer reusable BaseButton-Komponente

**Tool:** ChatGPT (OpenAI, GPT-6)

**Prompt:** "Ich will den "Filter zurücksetzen" button zu einer wiederverwendbaren /base komponente machen, damit wir das design bzw. layout für alle in zukunft erstellten Buttons verwenden können. Beurteile, ob das sinnvoll ist und begründe - wenn ja, extrahiere meinen styled Button aus `SessionFilters.vue` und mach ihn zu einer /base Komponente mit zwei variants (falls wir in Zukunft ein secondary Button-Design einsetzen wollen). Hier ist mein styled SessionFilters.vue: *Hier habe ich nochmal das fertige File eingefügt*"

**Zweck:** Ich habe überprüft, ob der bestehende Reset-Button in eine wiederverwendbare Base-Komponente ausgelagert werden sollte. Mit ChatGPT's Unterstützung habe ich `BaseButton.vue` mit zwei Varianten erstellt, um ein einheitliches Button-Design für zukünftige Features zu ermöglichen und `SessionFilters.vue` entsprechend anzupassen.


## Datum: 07.11.2026

### 1. Implementierung der Speaker-Profile

**Tool:** ChatGPT (OpenAI, GPT-6)

**Prompt:** "Ich kümmere gerade um Speaker-Profilseiten auf unserer Konferenz-Anwendung: *hier habe ich die Angabe kopiert und eingefügt*. Bitte erkläre mir wie ich diese Profilseiten implementieren kann und beachte dabei auch unsere bisherigen ADRs, vor allem das `02-architektur-adr.md` und das `03-state-management-konzept.md` (beide angehängt)! Ich vermute ich kann mich gut an den schon bestehenden Session-Detailseiten unter der jeweiligen Route `/sessions/[id]` orientieren, ist das richtig (ich habe `/sessions/[id].vue` angehängt)"

**Zweck:** Umsetzung der dynamischen Speaker-Profilseiten gemäß unserer bestehenden Architektur. ChatGPT hat mir bestätigt, dass die Session-Detailseiten als Vorlage geeignet sind, daraufhin habe ich die Route `/speakers/[id].vue` und die Darstellungskomponente `SpeakerProfile.vue` erstellt. Die Speaker-Profile und zugehörigen Sessions werden über das bestehende `useConferenceData()` geladen und gegenseitig mit den Session-Detailseiten verlinkt.

### 2. SSG-Konfiguration für Speaker-Profilseiten

**Tool:** ChatGPT (OpenAI, GPT-6)

**Prompt:** "Ich habe die `/speakers/[id]` Routen erfolgreich implementiert und möchte jetzt noch SSG als Rendering-Strategie für dieses Feature einsetzen. Wie mache ich das, wenn die Speaker nur über die jeweiligen Session-Detailsseiten erreichbar sind und umgekehrt? Hier ist die `nuxt.config.ts` und unser bisheriges `01-rendering-strategie-adr.md` für Schritt2 als Referenz: *zwei genannte Files eingefügt*"

**Zweck:** Umsetzung der festgelegten SSG-Strategie für alle 18 Speaker-Profilseiten. Mir wurde erklärt, dass die Speaker-Routen unabhängig von ihrer Verlinkung explizit für das Prerendering registriert werden können. Daraufhin habe ich die `nuxt.config.ts` um `speakerRoutes` erweitert, analog zu den bestehenden Session-Routen. Die statische Generierung wird anschließend durch einen Generate-Build und die Kontrolle der erzeugten HTML-Dateien überprüft.