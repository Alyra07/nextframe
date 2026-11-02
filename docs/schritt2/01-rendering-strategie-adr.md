# Rendering-Strategie ADR

## Einleitung & Entscheidungskriterien

Die Rendering-Strategie wird für jeden der vier Anwendungsteile separat festgelegt, da sich deren Anforderungen an Aktualität, Interaktivität und Personalisierung unterscheiden. Dafür vergleichen wir Static Site Generation (SSG), Client-Side Rendering (CSR), Server-Side Rendering (SSR) und Incremental Static Regeneration (ISR).

Die vier Anwendungsteile sind:
1. Session-Detailseiten
2. Session-Übersicht mit Filtern
3. Speaker-Profile
4. "Mein Programm" Dashboard

Entscheidend ist vor allem, ob Inhalte bereits zur Build-Zeit feststehen, sich während der Laufzeit verändern können oder von clientseitig gespeicherten Nutzerdaten abhängen. Zusätzlich berücksichtigen wir Ladeverhalten, Performance und den Implementierungsaufwand.

Ziel ist es, für jeden Anwendungsteil eine nachvollziehbare Rendering-Entscheidung zu treffen, die zu den tatsächlichen Dateneigenschaften passt und mit der technischen Umsetzung übereinstimmt.

## Entscheidungspunkte pro Anwendungsteil