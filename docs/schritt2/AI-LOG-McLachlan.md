# AI-LOG - Mirjam McLachlan (Person 2)


## Datum: 04.11.2026

### Integration der Session-Detailseiten in die bestehende Architektur

**Tool:** ChatGPT (GPT-6)

**Prompt:** "Wie genau integriere ich eine neue /pages/sessions/[id] route in meinem Vue Nuxt Projekt, das folgende bestehende vordefinierte Architektur hat: *Ich habe einen Screenshot von unserer bisherigen Architektur geschickt und das `02-architektur-adr.md` als Referenz angehängt*"

**Zweck:** Ich habe keine Vorerfahrung mit Nuxt, also wollte ich die dynamischen Nuxt-Routen verstehen und überprüfen, wie das in unsere vorhandene Komponentenstruktur einzubauen ist. Dabei wurde mir erklärt, dass Nuxt 4 die [id] einer Session als dynamischen URL-Parameter erkennt. Daraufhin habe ich verstanden, dass ich einfach `/pages/sessions/[id].vue` erstellen kann und es durch einen `<NuxtLink>` mit der Session-Übersicht verbinden kann.

### Session-Detailseiten Debugging

**Tool:** ChatGPT (GPT-6)

**Prompt:** "*Screenshot von `http://localhost:3000/sessions/s01` angehängt.* Wie du auf dem Screenshot siehst, wird nichts auf der Session-Detailseite angezeigt, obwohl die Session-Details durch die `/sessions/[id]` Seite übergeben werden. *`[id].vue` & `SessionDetail.vue` files gezeigt* Wieso ist das so, bzw. wo könnte das Problem sonst liegen?"

**Zweck:** Untersuchung der leeren Session-Detailseite im localhost trotz korrekt implementierter dynamischer Route. Die Lösung war schnell gefunden: Ich musste den Import in `[id].vue` korrigieren und danach zeigten die Session-Detailseiten auch die gewünschten Informationen an.

### Begründung Rendering-Strategie für Session-Detailseiten

**Tool:** ChatGPT (GPT-6)

**Prompt:** "Für welche Rendering-Strategie sollten wir uns deiner meinung nach für die Session-Detailseiten entscheiden (bitte jeweils mit ausführlicher und quellenhinterlegter Begründung)? Unsere Optionen sind SSG, SSR oder ISR - beachte dabei auch, was eine sinnvoll wäre, wenn es sich um ECHTE Sessions (nicht fix unveränderte Konferenzdaten) handeln würde"

**Zweck:** Vergleich geeigneter Rendering-Strategien für die Session-Detailseiten zur Unterstützung der Ausarbeitung des ADR-Abschnitts. Kritische Überprüfung unserer (vorher bereits getroffenen) Rendering-Entscheidung unter Berücksichtigung möglicher Änderungen an Sessions bei realen Konferenzen. Entscheidung für SSG wurde anhand der statischen Konferenzdaten begründet.

### SSG-Konfiguration für Session-Detailseiten

**Tool:** ChatGPT (GPT-6)

**Prompt:** "Wie stelle ich sicher, dass SSG auch wirklich für das Session-Detailseiten Feature verwendet wird? *Hier habe ich `[id].vue` & `nuxt.config.ts` angehängt*"

**Zweck:** Überprüfung der bestehenden Session-Detailseiten und Einrichtung des Nuxt-Prerenderings für alle Session-Routen. Ziel war die technische Umsetzung der festgelegten SSG-Strategie sowie deren Überprüfung durch einen Generate-Build.


## Datum: 05.11.2026

### Kombination von SSG & CSR im statischen Build

**Tool:** ChatGPT (GPT-6)

**Prompt:** "Ändert sich unser statische Build in Zukunft, wenn wir wie geplant für das "Mein Programm" Dashboard CSR verwenden? Bleiben die build commands gleich wie im README (angehängt) angegeben, sobald die /mein-programm route hinzugefügt wurde? Bitte beschreibe wie das funktioniert"

**Zweck:** Überprüfung, ob SSG und CSR innerhalb desselben Nuxt-Generate Build kombiniert werden können und Erklärung, wie das im Hintergrund funktioniert. Überprüfung, ob das README im Bezug auf Build, lokale Bereitstellung und clientseitige Persistenz noch angepasst werden sollte.


## Datum: 06.11.2026

### Implementierung von useSchedule.js

**Tool:** ChatGPT (GPT-5.6 Sol)

**Prompt:** "Mein Ziel ist die Umsetzung der Grundfunktionen von "Mein Programm" unter Berücksichtigung des State-Management-Konzepts und Rendering-Strategie-ADRs (wir haben uns bei "mein Programm" für CSR entschieden). Hilf mir ein neues `useSchedule.js` composable zu erstellen, das mit `useState()` einen gemeinsamen reaktiven Zustand halten soll. Sessions werden ausschließlich als Ids im localStorage gespeichert, die beim Laden validieren und die vollständigen Session-Daten über `useConferenceData()` auflösen. *`useConferenceData.js` + relevante ADRs angehängt*"

**Zweck:** Implementierung des zentralen `useSchedule()`-Composable für "Mein Programm". Mit ChatGPT's Hilfe wurden gemeinsamer reaktiver State `useState()`, Speicherung ausschließlich von Session-IDs, Validierung, `localStorage`-Persistenz und Rehydration gemäß dem bestehenden State-Management-Konzept umgesetzt.

### Extraktion der „Mein Programm“-Übersicht

**Tool:** ChatGPT (GPT-5.6 Sol)

**Prompt:** "Ich möchte die Darstellung der hinzugefügten Sessions aus `pages/mein-programm.vue` (angehängt) in eine eigene Komponente unter `components/features/schedule/` auslagern, weil ich finde, dass das schön die responsibilities in unserem Projekt auf `/pages` (Route), `/composables` (Logik) und `/components` (Darstellung) aufteilt. Beurteile ob das sinnvoll ist, und wenn ja, hilf mir dabei."

**Zweck:** Aufteilung der „Mein Programm“-Seite in eine schlanke Page und eine separate Feature-Komponente. Die Darstellung von "Mein Programm" wurde in `ScheduleOverview.vue` ausgelagert, während State und Persistenz weiterhin über `useSchedule()` verwaltet werden.

### Styling der "Mein Programm"-Interaktion (Buttons)

**Tool:** ChatGPT (GPT-5.6 Sol)

**Prompt:** "Ich möchte den `ScheduleButton` kleiner gestalten und den `BaseButton` um einen optionalen NuxtLink erweitern. Wie kann ich diese Anpassungen umsetzen? Bitte hilf mir auch mit dem CSS für den ScheduleButton: *ScheduleButton & BaseButton angehängt*"

**Zweck:** Überarbeitung der "Mein Programm"-Interaktion (`ScheduleButton`) und Session-Darstellung auf der Homepage. Der wiederverwendbare `BaseButton` wurde um eine kleinere Variante und einen optionalen Link erweitert.


## Datum: 07.11.2026

### CSR-Konfiguration für "Mein Programm"

**Tool:** ChatGPT (GPT-5.6 Sol)

**Prompt:** "Für "Mein Programm" möchte ich nach unserer Rendering-Strategie Entscheidung CSR implementieren. Überprüfe nochmal ob mein `useSchedule.js` und die aktuelle `nuxt.config.ts` dafür korrekt aufgestellt ist und beschreibe wie ich es im Build testen kann."

**Zweck:** Korrektes Umsetzen und Testen der festgelegten CSR-Strategie für das "Mein Programm"-Feature. Die Route `/mein-programm` wurde über Nuxt Route Rules von SSR ausgeschlossen, während der persönliche State weiterhin clientseitig aus `localStorage` rehydriert wird.