## Tooling
NextFrame verwendet ein manuell eingebundenes Web App Manifest und einen Service Worker ohne zusätzliches PWA-Plugin. Die Registrierung erfolgt über ein ausschließlich clientseitiges Nuxt-Plugin im Produktionsbuild. Diese Lösung benötigt keine weitere Abhängigkeit und ermöglicht, die gemeinsam beschlossenen Cache-First-Regeln in Aufgabe C direkt und nachvollziehbar zu ergänzen.

## Manifest Werte
Das Manifest verwendet „NextFrame“ als Namen und Kurznamen. Start-URL und Gültigkeitsbereich sind /; display: "standalone" ermöglicht die Darstellung als eigenständige Anwendung. Die Hintergrundfarbe #080B10 entspricht dem Token --color-background, die Theme-Farbe #172441 dem Token --color-surface.

## Begründung Icon & Farbwerte
Die PNG-Icons in 192 × 192 und 512 × 512 Pixeln zeigen das Monogramm „NF“ mit dem lila Markenpunkt auf dunklem Hintergrund. Sie greifen die vorhandene Textmarke und Farbpalette auf und bleiben auch in kleinen Darstellungen erkennbar. Die Installation wird über die Browserfunktion angeboten.