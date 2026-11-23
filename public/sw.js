// Cache Name für Session- & Speaker-Seiten
const DATA_CACHE = 'nf-session-speaker-v2'
// Cache Name für App Shell + statische Assets (CSS, JS, Fonts, Icons, etc.)
const SHELL_CACHE = 'nf-app-shell-v1'

// Gemeinsamer Activate-Handler
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

// --- APP-SHELL & STATISCHE ASSETS: CACHE FIRST ---
// Aufgabe C - Antonia (Person 1) :)
// TODO: Startseite, Mein Programm, JS, CSS, Fonts, Icons und Manifest cachen (-> SHELL_CACHE)


// --- SESSION- & SPEAKER-SEITEN: CACHE FIRST ---

// Begründung gemäß /docs/schritt3/02-offline-strategie-konzept.md:
// Session- und Speaker-Daten sind statisch und werden zur Laufzeit nicht verändert.
// Bereits geladene Seiten werden deshalb bevorzugt aus dem Cache ausgeliefert -> So bleiben sie auch bei schlechtem WLAN verfügbar

self.addEventListener('fetch', event => {
  const request = event.request
  const url = new URL(request.url)

  if (
    request.method !== 'GET' ||
    url.origin !== self.location.origin
  ) {
    return
  }

  const isSessionOrSpeaker =
    url.pathname.startsWith('/sessions/') ||
    url.pathname.startsWith('/speakers/')

  if (!isSessionOrSpeaker) {
    return
  }

  // Nuxt nutzt _payload.json für clientseitige Navigation
  const isPayload = url.pathname.endsWith('/_payload.json')

  // Nur HTML-Navigationen und Nuxt-Payloads cachen
  if (request.mode !== 'navigate' && !isPayload) {
    return
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(DATA_CACHE)

      // Payloads unabhängig vom _b-Query-Parameter zuordnen
      const cacheKey = isPayload
        ? url.origin + url.pathname
        : request

      // Cache First: gespeicherte Antwort bevorzugen
      const cachedResponse = await cache.match(cacheKey)

      if (cachedResponse) {
        return cachedResponse
      }

      try {
        const networkResponse = await fetch(request)

        if (networkResponse.ok) {
          await cache.put(
            cacheKey,
            networkResponse.clone()
          )
        }

        return networkResponse
      } catch (error) {
        // Fehlende Payload: Netzwerkfehler statt HTML/Text
        if (isPayload) {
          return Response.error()
        }

        // Fehlende HTML-Seite
        return new Response(
          'Diese Seite ist offline noch nicht verfügbar.',
          {
            status: 503,
            headers: {
              'Content-Type': 'text/plain; charset=utf-8'
            }
          }
        )
      }
    })()
  )
})