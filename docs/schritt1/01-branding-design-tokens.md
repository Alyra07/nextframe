# A – Branding-Konzept & Design Tokens

## Markenkonzept und Positionierung

NextFrame ist eine moderne Konferenzplattform für die fiktive Web-Frontend-Konferenz FrontendNow. Unter dem Leitgedanken „Focus & Clarity“ verfolgt die Anwendung das Ziel, Konferenzinformationen übersichtlich, intuitiv und schnell zugänglich zu machen. Im Gegensatz zu klassischen, häufig informationsüberladenen Konferenz-Websites setzt NextFrame auf ein modulares Bento-Grid-Layout, eine klare visuelle Hierarchie und eine gezielte Hervorhebung relevanter Inhalte.

Das Design unterstützt die Nutzer:innen dabei, Sessions zu entdecken, Speaker kennenzulernen und langfristig einen persönlichen Konferenzzeitplan zusammenzustellen. Die Gestaltung verbindet eine reduzierte, moderne Ästhetik mit funktionaler Orientierung.



## Farbkonzept

Ein fast schwarzer Hintergrund (#080B10) bildet die Grundlagefür unsere Website. Für die Karten und weitere Flächen haben wir einerseits ein dunkles Blau (#172441) und als Kontrast, visuelle Abwechslung und Text Farbe für dunkle Hintergründe haben wir ein helles Grau (#E2E5EB) ausgesucht.

Blau (#2D76EE) dient als Primärfarbe für wichtige Interaktionselemente und Hervorhebungen. Lila (#A64DEB) ergänzt das Branding als Akzentfarbe. Die begrenzte Anzahl an Farben soll eine ruhige, konsistente Gestaltung unterstützen.

## Barrierefreiheit und Kontrast

Bei der Farbauswahl wurden die Kontrastanforderungen nach WCAG AA berücksichtigt. Normaler Text benötigt ein Kontrastverhältnis von mindestens 4,5:1, großer Text mindestens 3:1.

Der helle Text auf dem dunklen Hintergrund erreicht 15.61:1, auf mittelblauen Karten 12.19:1. Dunkler Text auf hellen Flächen erreicht 15.61:1. Blau auf Dunkelblau erreicht 4.63:1 und Lila auf Dunkelblau 4.58:1.

Hellgrauer Text auf den ursprünglichen Brand-Farben erfüllt mit 3,37:1 beziehungsweise 4,40:1 nicht die Anforderungen für normalen Text. Deshalb wurden dunklere Varianten für interaktive Elemente mit hellgrauer Beschriftung ergänzt. Das dünklere Blau (#0D449D) und Lila (#600F9F) erfüllen nun den Kontrast mit 7.13:1 und 8.05:1.

## Design-Token-Struktur

Die Design Tokens werden als CSS Custom Properties in `tokens/tokens.css` definiert. Dabei wird zwischen primitiven und semantischen Tokens unterschieden.

Primitive Tokens enthalten konkrete Designwerte, beispielsweise `--color-blue-500`, `--space-4` oder `--font-size-base`. Semantische Tokens beschreiben dagegen ihre Funktion innerhalb der Anwendung, beispielsweise `--color-background`, `--color-text-primary` oder `--spacing-card`.

Die Spacing-Skala basiert auf den Werten 4, 8, 12, 16, 24, 32 und 48 Pixel. Für die Typografie wird eine abgestufte Skala von 12 bis 40 Pixel mit definierten Schriftstärken und Zeilenhöhen verwendet. Eine Systemschrift sorgt zunächst für eine einfache, performante Umsetzung.

## Begründung der Entscheidungen

- Wartbarkeit: Durch die zentrale Definition der Designwerte können spätere Änderungen an Farben, Abständen oder Schriftgrößen vorgenommen werden, ohne zahlreiche Komponenten einzeln anzupassen.

- Konsistenz: Einheitliche Tokens stellen sicher, dass wiederkehrende UI-Elemente wie Buttons, Cards und Navigation dieselben Gestaltungsregeln verwenden. Das ist besonders für die modulare Bento-Grid-Struktur wichtig.

- Theming-Erweiterbarkeit: Die Trennung von primitiven und semantischen Tokens ermöglicht später unterschiedliche Themes. Farbzuweisungen können beispielsweise für einen Light Mode angepasst werden, ohne die einzelnen Komponenten verändern zu müssen.

-> Zusätzlich verbessert die Token-Struktur die Zusammenarbeit im zweiköpfigen Team, da gemeinsame Gestaltungsregeln dokumentiert und direkt im Code verfügbar sind.

## Konsequenzen

Die Einführung eines Token-Systems erfordert anfänglich zusätzliche Planung und eine konsequente Verwendung semantischer Variablen. Langfristig erleichtert sie jedoch die Weiterentwicklung der Anwendung, reduziert visuelle Inkonsistenzen und schafft eine stabile Grundlage für zukünftige Funktionen und Themes.