# Offline-Strategie: Caching-Konzept

Für NextFrame soll die Offline-Strategie sicherstellen, dass die wichtigsten Funktionen der Konferenzplattform auch bei schlechtem oder vollständig ausgefallenem WLAN verfügbar bleiben. Besonders während einer Konferenz ist eine stabile Internetverbindung nicht garantiert. Deshalb unterscheiden wir die Caching-Strategie nach Art und Aktualitätsanforderung der jeweiligen Daten.

## App-Shell & statische Assets - Cache First

Für die App-Shell sowie statische Assets wie CSS, JavaScript und Icons verwenden wir **Cache First**. Diese Dateien ändern sich während der Nutzung nicht, sondern erst mit einem neuen Build der Anwendung. Bei einem Seitenaufruf wird zuerst geprüft, ob die benötigte Ressource bereits im Cache liegt. Dadurch kann die grundlegende Benutzeroberfläche auch ohne Netzwerk geladen werden. Gleichzeitig werden unnötige Netzwerkzugriffe vermieden und bereits besuchte Seiten schneller dargestellt.

## Session-Seiten & Session-Daten - Cache First

Auch für die Session-Seiten und Session-Daten setzen wir auf **Cache First**. Die Konferenzdaten stammen aus dem statischen Datensatz und werden für NextFrame nicht zur Laufzeit verändert. Die Session-Übersicht und die Session-Detailseiten werden bereits mit SSG erzeugt. Ein erneuter Netzwerkzugriff würde hier keinen Aktualitätsvorteil bieten. Nach einem erfolgreichen ersten Laden können Nutzer:innen deshalb die zwischengespeicherten Sessions auch im Flugmodus aufrufen.

## Speaker-Seiten & Speaker-Daten - Cache First

Für die Speaker-Seiten und Speaker-Daten verwenden wir ebenfalls **Cache First**, da diese Informationen statisch sind und bereits mit SSG vorgerendert werden. Die Speaker-Profile müssen daher nicht bei jedem Aufruf erneut aus dem Netzwerk geladen werden. Sobald die entsprechenden Seiten im Cache vorhanden sind, können Nutzer:innen auch offline auf die Informationen zugreifen.

## „Mein Programm“ - Cache First & localStorage

Die „Mein Programm“-Seite wird ebenfalls über **Cache First** verfügbar gemacht. Dabei unterscheiden wir zwischen der Seite selbst und den persönlichen Daten. Die App-Shell und das notwendige JavaScript müssen im Cache vorhanden sein, damit die Seite offline geöffnet werden kann. Die ausgewählten persönlichen Session-IDs benötigen dagegen keine eigene Service-Worker-Caching-Strategie. Sie werden bereits im `localStorage` unter `nextframe:my-program` gespeichert und beim Laden clientseitig wiederhergestellt.

## Alternativen

### Stale-While-Revalidate

Als Alternative haben wir **Stale-While-Revalidate** betrachtet. Diese Strategie wäre beispielsweise für zukünftig veränderliche Raum- oder Zeitplandaten geeignet. Dabei wird zunächst eine vorhandene Cache-Version angezeigt und gleichzeitig im Hintergrund eine aktuelle Version aus dem Netzwerk geladen. Bei kurzfristigen Raumänderungen wäre dieser Kompromiss zwischen schneller Verfügbarkeit und Aktualität sinnvoll. Für den derzeit statischen Datensatz von NextFrame ist dieser zusätzliche Mechanismus jedoch nicht notwendig.

### Network Only

**Network Only** wäre für Live-Daten geeignet, bei denen veraltete Informationen problematisch wären. Dabei werden Daten ausschließlich über das Netzwerk geladen. Da NextFrame derzeit keine solchen Live-Daten besitzt, verwenden wir diese Strategie nicht.

### Verhalten bei vollständigem Verbindungsabbruch

Bei einem vollständigen Verbindungsabbruch bleiben nach einem vorherigen Online-Besuch die zwischengespeicherte Anwendung, Sessions, Speaker und das persönliche Programm weiterhin nutzbar. Ein Erstbesuch ohne zuvor gefüllten Cache kann dagegen nicht vollständig offline funktionieren und stellt eine bewusste Grenze unserer Offline-Strategie dar.