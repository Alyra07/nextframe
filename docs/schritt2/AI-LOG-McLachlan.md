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