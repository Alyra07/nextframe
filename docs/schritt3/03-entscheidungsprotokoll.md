# Entscheidungsprotokoll mit Testszenarien

## Testszenarien

### Szenario 1 - Session-Übersicht nach Online-Besuch offline öffnen

**Ausgangslage:** Die NextFrame-Anwendung wurde über `http://localhost:3000` mit einem statisch generierten Produktionsbuild gestartet. Die Session-Übersicht wurde zunächst online geladen, sodass der Service Worker die benötigten App-Shell-Ressourcen speichern konnte.

**Aktion:** Anschließend wurde in Chrome DevTools unter `Network` der Modus `Offline` aktiviert und die Startseite mit F5 erneut geladen.

**Beobachtetes Verhalten:** Die Session-Übersicht wurde weiterhin vollständig und mit korrektem Styling angezeigt. Im Network-Tab wurde die HTML-Anfrage mit Status 200 durch den Service Worker beantwortet. Unter `Application -> Cache Storage` waren außerdem die gespeicherten JavaScript-, CSS- und HTML-Ressourcen im Cache `nf-app-shell-v1` sichtbar.

**Ergebnis:** Die Cache-First-Strategie stellt die Session-Übersicht nach einem vorherigen Online-Besuch auch ohne aktive Netzwerkverbindung bereit.

**Nachweis:** [App-Shell-Caching & Offline-Test](04-verifikations-nachweis.md#3-cache-first-verifikation)

### Szenario 2 - "Mein Programm" offline öffnen und bearbeiten

**Ausgangslage:** Während einer bestehenden Online-Verbindung wurden drei Sessions über die Session-Übersicht zum persönlichen Programm hinzugefügt. Die Seite "Mein Programm" wurde anschließend geöffnet und die ausgewählten Sessions wurden korrekt angezeigt.

**Aktion:** In Chrome DevTools wurde unter `Network` der Offline-Modus aktiviert. Danach wurde die Seite `/mein-programm` mit F5 neu geladen. Zusätzlich wurde eine zuvor gespeicherte Session über die Schaltfläche "Entfernen" aus dem Programm gelöscht und der `localStorage` überprüft.

**Beobachtetes Verhalten:** Im Network-Tab wurden die benötigten Ressourcen mit Status 200 durch den Service Worker ausgeliefert. Nach dem Entfernen einer Session zeigte die Anwendung nur noch zwei Einträge. Auch der gespeicherte Wert unter `nextframe:my-program` enthielt entsprechend zwei Session-IDs.

**Ergebnis:** App-Shell-Caching und `localStorage` ermöglichen die Offline-Nutzung des persönlichen Programms.

**Nachweis:** ["Mein Programm" offline](04-verifikations-nachweis.md#4-offline-szenarien-aus-d)

### Szenario 3 - Erstbesuch ohne vorheriges Online-Laden

**Ausgangslage:** Um einen echten Erstbesuch zu simulieren, wurde ein frischer Inkognito-Kontext verwendet. Für NextFrame waren dort weder ein registrierter Service Worker noch zuvor gespeicherte Cache-Einträge vorhanden.

**Aktion:** Vor dem ersten Aufruf wurde in Chrome DevTools unter `Network` der Modus `Offline` aktiviert. Anschließend wurde versucht, `http://localhost:3000` erstmals zu öffnen.

**Beobachtetes Verhalten:** Die Startseite konnte nicht geladen werden. Chrome zeigte die Fehlermeldung `ERR_INTERNET_DISCONNECTED`. Auch im Network-Tab war erkennbar, dass die Dokumentanfrage wegen der fehlenden Netzwerkverbindung scheiterte.

**Ergebnis:** Dieses Verhalten ist eine bewusste und akzeptierte Einschränkung der Strategie. Ohne einen vorherigen Online-Besuch kann der Service Worker nicht installiert werden und die benötigten Dateien können nicht im Cache liegen. Erst nach einer erfolgreichen Online-Initialisierung steht die Offline-Funktionalität zur Verfügung.

**Nachweis:** [Erstbesuch ohne Cache](04-verifikations-nachweis.md#4-offline-szenarien-aus-d)

## Teamübergreifende Testergebnisse & Cross-Review

Die drei Szenarien werden von beiden Teammitgliedern unabhängig auf ihren eigenen Rechnern getestet, um Unterschiede zwischen Browserzuständen, Cache-Inhalten oder Service-Worker-Versionen festzustellen.

| Szenario | Mirjam | Antonia |
|---|---|---|
| 1 - Session-Übersicht offline | Erfolgreich (Chrome DevTools) | bitte ergänzen |
| 2 - "Mein Programm" offline | Erfolgreich (Chrome DevTools) | bitte ergänzen |
| 3 - Erstbesuch offline | Erwarteter Verbindungsfehler | bitte ergänzen |

**Ausstehend für Antonia:**

- ADR-artige Dokumentation der Offline-/Caching-Entscheidungen
  (Kontext, Optionen, Entscheidung, Konsequenzen)
- Unabhängige Durchführung aller drei Testszenarien
- Ergänzung der eigenen Testergebnisse
- Abgleich von möglichen Unterschieden
- Gemeinsamer Cross-Review vor Abgabe

**Status:** Erster Entwurf der Testszenarien durch mich (Mirjam) - Entscheidungsprotokoll & Cross-Review stehen noch aus :)

## Fazit

Die durchgeführten Tests zeigen, dass bereits verfügbare Anwendungsressourcen offline erneut geladen werden können und das persönliche Programm dank `localStorage` weiterhin bedienbar bleibt.

Der fehlgeschlagene Erstbesuch im Offline-Modus ist eine dokumentierte und akzeptierte Grenze der Implementierung - Für zukünftig veränderliche Konferenzdaten müsste die Aktualisierungsstrategie neu bewertet werden.

Die zugehörigen Screenshots, Service-Worker-Nachweise und Lighthouse-Ergebnisse befinden sich im [04-verifikations-nachweis.md](04-verifikations-nachweis.md).