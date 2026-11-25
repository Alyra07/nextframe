# Entscheidungsprotokoll - Rendering & Offline-Verhalten

## 1. Kontext

NextFrame ist eine Konferenzplattform für FrontendNow, mit der NutzerInnen Sessions durchsuchen, Speaker-Profile ansehen und ein persönliches Programm zusammenstellen können. Da das WLAN auf einer Konferenz instabil oder zeitweise nicht verfügbar sein kann, soll die Anwendung auch ohne Netzwerkverbindung möglichst nutzbar bleiben. Gleichzeitig stammen sämtliche Konferenzinformationen aus einem statischen Datensatz, der sich zur Laufzeit nicht verändert.

Dieses Entscheidungsprotokoll fasst die Rendering-Entscheidungen aus Schritt 2 und die Offline-/Caching-Entscheidungen aus Schritt 3 zusammen. Zusätzlich werden die Ergebnisse von drei konkreten Offline-Tests dokumentiert. Die ausführlichen Strategiebegründungen sind in der [Rendering-Strategie-ADR aus Schritt 2](../schritt2/01-rendering-strategie-adr.md) und im [Offline-Konzept](02-offline-strategie-konzept.md) festgehalten.

## 2. Rendering-Entscheidungen aus Schritt 2

### Kontext & Optionen

Für NextFrame wurden SSG (Static Site Generation), CSR (Client-Side Rendering), SSR (Server-Side Rendering) und ISR (Incremental Static Regeneration) hinsichtlich Aktualität, Interaktivität und Personalisierung verglichen.

### Entscheidung

| Anwendungsteil | Rendering-Strategie | Begründung |
|---|---|---|
| Session-Übersicht | SSG mit clientseitiger Filterung | Statische Daten, Filterung ohne weitere Serveranfragen |
| Session-Detailseiten | SSG | Alle Session-Daten stehen zur Build-Zeit fest |
| Speaker-Profile | SSG | Statische Profile können vorgerendert werden |
| "Mein Programm" | CSR für den personalisierten Zustand | Die persönlichen Session-IDs werden im Browser verwaltet |

SSR und ISR wurden nicht gewählt, da NextFrame keine zur Laufzeit aktualisierten Konferenzdaten oder serverseitige Personalisierung benötigt.

### Konsequenzen

Die vorgerenderten Seiten können schnell und unabhängig von einer laufenden Serveranwendung ausgeliefert werden. Die clientseitigen Filter und das persönliche Programm bleiben nach dem Laden der benötigten JavaScript-Dateien interaktiv - Änderungen am Konferenzdatensatz erfordern allerdings einen neuen Build. Die SSG-Entscheidung bildet zugleich die Grundlage für die Offline-Strategie, da bereits generierte Ressourcen im Browser zwischengespeichert werden können.

## 3. Offline- & Caching-Entscheidungen aus Schritt 3

### 3.1 Kontext

Bei einem Verbindungsabbruch sollen bereits geladene Konferenzinformationen weiterhin verfügbar bleiben. Die Anwendung soll dafür möglichst keine erneuten Netzwerkanfragen benötigen. Dabei unterscheiden wir zwischen statischen Anwendungsressourcen, Session-/Speaker-Daten und dem persönlichen Programm.

### 3.2 Optionen

- **Cache First:** Eine Ressource wird zuerst aus dem Cache geladen -> Nur wenn sie noch nicht gespeichert ist, erfolgt ein Netzwerkzugriff
- **Stale-While-Revalidate:** Eine vorhandene Cache-Version wird sofort ausgeliefert, während im Hintergrund eine Aktualisierung erfolgt
- **Network Only:** Ressourcen werden ausschließlich aus dem Netzwerk geladen

### 3.3 Entscheidung

Wir verwenden für die relevanten Ressourcen **Cache First**, da sich die Konferenzdaten während der Laufzeit nicht verändern.

| Ressource | Strategie | Umsetzung |
|---|---|---|
| App-Shell, CSS, JS, Icons | Cache First | `nf-app-shell-v1` |
| Session-Seiten und Nuxt-Payloads | Cache First | `nf-session-speaker-v2` |
| Speaker-Seiten und Nuxt-Payloads | Cache First | `nf-session-speaker-v2` |
| Seite "Mein Programm" | Cache First | `nf-app-shell-v1` |
| Persönliche Session-IDs | localStorage | `nextframe:my-program` |

Die Caching-Regeln wurden im manuellen Service Worker `public/sw.js` umgesetzt. Das App-Shell-Caching verwendet zusätzlich eine generierte `shell-assets.json`, um die benötigten statischen Ressourcen bereits bei der Service-Worker-Installation vorzubereiten.

### 3.4 Konsequenzen

Die Cache-First-Strategie ermöglicht das erneute Laden gespeicherter Seiten auch bei vollständigem Verbindungsabbruch. Die App-Shell stellt dabei die notwendigen HTML-, JavaScript- und CSS-Ressourcen bereit. Session- und Speaker-Seiten beziehungsweise deren Nuxt-Payloads werden in einem separaten Cache gespeichert. Die persönlichen Session-IDs bleiben unabhängig davon im `localStorage`.

Als Einschränkung können noch nicht gecachte Detailseiten beim direkten Offline-Aufruf fehlschlagen. Außerdem erfordern Änderungen am Konferenzdatensatz einen neuen Build und eine Aktualisierung der Cache-Versionen. Ein Erstbesuch ohne vorheriges Online-Laden wird bewusst nicht unterstützt.

## 4. Testszenarien

### 4.1 Szenario 1 - Session-Übersicht nach Online-Besuch offline öffnen

**Ausgangslage:** Die NextFrame-Anwendung wurde über `http://localhost:3000` mit einem statisch generierten Produktionsbuild gestartet. Die Session-Übersicht wurde zunächst online geladen, sodass der Service Worker die benötigten App-Shell-Ressourcen speichern konnte.

**Aktion:** Anschließend wurde in Chrome DevTools unter `Network` der Modus `Offline` aktiviert und die Startseite mit F5 erneut geladen.

**Beobachtetes Verhalten:** Die Session-Übersicht wurde weiterhin vollständig und mit korrektem Styling angezeigt. Im Network-Tab wurde die HTML-Anfrage mit Status 200 durch den Service Worker beantwortet. Unter `Application -> Cache Storage` waren außerdem die gespeicherten JavaScript-, CSS- und HTML-Ressourcen im Cache `nf-app-shell-v1` sichtbar.

**Ergebnis:** Die Cache-First-Strategie stellt die Session-Übersicht nach einem vorherigen Online-Besuch auch ohne aktive Netzwerkverbindung bereit.

**Nachweis:** [App-Shell-Caching & Offline-Test](04-verifikations-nachweis.md#3-cache-first-verifikation)

### 4.2 Szenario 2 - "Mein Programm" offline öffnen und bearbeiten

**Ausgangslage:** Während einer bestehenden Online-Verbindung wurden drei Sessions über die Session-Übersicht zum persönlichen Programm hinzugefügt. Die Seite "Mein Programm" wurde anschließend geöffnet und die ausgewählten Sessions wurden korrekt angezeigt.

**Aktion:** In Chrome DevTools wurde unter `Network` der Offline-Modus aktiviert. Danach wurde die Seite `/mein-programm` mit F5 neu geladen. Zusätzlich wurde eine zuvor gespeicherte Session über die Schaltfläche "Entfernen" aus dem Programm gelöscht und der `localStorage` überprüft.

**Beobachtetes Verhalten:** Im Network-Tab wurden die benötigten Ressourcen mit Status 200 durch den Service Worker ausgeliefert. Nach dem Entfernen einer Session zeigte die Anwendung nur noch zwei Einträge. Auch der gespeicherte Wert unter `nextframe:my-program` enthielt entsprechend zwei Session-IDs.

**Ergebnis:** App-Shell-Caching und `localStorage` ermöglichen die Offline-Nutzung des persönlichen Programms.

**Nachweis:** ["Mein Programm" offline](04-verifikations-nachweis.md#4-offline-szenarien-aus-d)

### 4.3 Szenario 3 - Erstbesuch ohne vorheriges Online-Laden

**Ausgangslage:** Um einen echten Erstbesuch zu simulieren, wurde ein frischer Inkognito-Kontext verwendet. Für NextFrame waren dort weder ein registrierter Service Worker noch zuvor gespeicherte Cache-Einträge vorhanden.

**Aktion:** Vor dem ersten Aufruf wurde in Chrome DevTools unter `Network` der Modus `Offline` aktiviert. Anschließend wurde versucht, `http://localhost:3000` erstmals zu öffnen.

**Beobachtetes Verhalten:** Die Startseite konnte nicht geladen werden. Chrome zeigte die Fehlermeldung `ERR_INTERNET_DISCONNECTED`. Auch im Network-Tab war erkennbar, dass die Dokumentanfrage wegen der fehlenden Netzwerkverbindung scheiterte.

**Ergebnis:** Dieses Verhalten ist eine bewusste und akzeptierte Einschränkung der Strategie. Ohne einen vorherigen Online-Besuch kann der Service Worker nicht installiert werden und die benötigten Dateien können nicht im Cache liegen. Erst nach einer erfolgreichen Online-Initialisierung steht die Offline-Funktionalität zur Verfügung.

**Nachweis:** [Erstbesuch ohne Cache](04-verifikations-nachweis.md#4-offline-szenarien-aus-d)

## 5. Teamübergreifende Testergebnisse & Cross-Review

Die drei Szenarien werden von beiden Teammitgliedern unabhängig auf ihren eigenen Rechnern getestet, um Unterschiede zwischen Browserzuständen, Cache-Inhalten oder Service-Worker-Versionen festzustellen.

| Szenario | Mirjam | Antonia |
|---|---|---|
| 1 - Session-Übersicht offline | Erfolgreich (Chrome DevTools) | Erfolgreich (Chrome DevTools) |
| 2 - "Mein Programm" offline | Erfolgreich (Chrome DevTools) | Erfolgreich (Chrome DevTools) |
| 3 - Erstbesuch offline | Erwarteter Verbindungsfehler | Verbindungsfehler |


## 6. Fazit

Die gewählten Rendering- & Cache-First-Strategien passen zum statischen Konferenzdatensatz von NextFrame. Die durchgeführten Tests zeigen, dass bereits verfügbare Anwendungsressourcen offline erneut geladen werden können und das persönliche Programm dank `localStorage` weiterhin bedienbar bleibt.

Der fehlgeschlagene Erstbesuch im Offline-Modus ist eine dokumentierte und akzeptierte Grenze der Implementierung - Für zukünftig veränderliche Konferenzdaten müsste die Aktualisierungsstrategie neu bewertet werden.

Die zugehörigen Screenshots, Service-Worker-Nachweise und Lighthouse-Ergebnisse befinden sich im [04-verifikations-nachweis.md](04-verifikations-nachweis.md).