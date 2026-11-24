// Cache Name für Session- & Speaker-Seiten
const DATA_CACHE = 'nf-session-speaker-v2'
// Cache Name für App Shell + statische Assets (CSS, JS, Fonts, Icons, etc.)
const SHELL_CACHE = 'nf-app-shell-v1'

// Gemeinsamer Activate-Handler
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys()

      // Nur veraltete App-Shell-Caches dieser Anwendung entfernen.
      // Mirjams Daten-Cache bleibt hier unberührt.
      await Promise.all(
        cacheNames
          .filter(name =>
            name.startsWith('nf-app-shell-') &&
            name !== SHELL_CACHE
          )
          .map(name => caches.delete(name))
      )

      await self.clients.claim()
    })()
  )
})

// --- APP-SHELL & STATISCHE ASSETS: CACHE FIRST ---
// Aufgabe C - Antonia (Person 1)
//
// Gemäß Offline-Konzept:
// App-Shell und statische Build-Dateien werden Cache First geladen.
// Persönliche Session-IDs bleiben ausschließlich im localStorage.

// App-Shell bereits beim Installieren vorbereiten.
// Dadurch sind auch JS/CSS vorhanden, die vor der ersten
// Service-Worker-Aktivierung vom Browser geladen wurden.
self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const response = await fetch('/shell-assets.json', {
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error('App-Shell-Liste konnte nicht geladen werden.')
      }

      const urls = await response.json()
      const cache = await caches.open(SHELL_CACHE)

      await cache.addAll(urls)
    })()
  )
})

self.addEventListener('fetch', event => {
  const request = event.request
  const url = new URL(request.url)

  if (
    request.method !== 'GET' ||
    url.origin !== self.location.origin
  ) {
    return
  }

  // Diese Pfade behandelt ausschließlich Mirjams Listener.
  if (
    url.pathname.startsWith('/sessions/') ||
    url.pathname.startsWith('/speakers/')
  ) {
    return
  }

  const pagePath = url.pathname.replace(/\/$/, '') || '/'

  const isShellPage =
    request.mode === 'navigate' &&
    (pagePath === '/' || pagePath === '/mein-programm')

  const isShellPayload =
    url.pathname === '/_payload.json' ||
    url.pathname === '/mein-programm/_payload.json'

  const isStaticAsset =
    url.pathname.startsWith('/_nuxt/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.startsWith('/fonts/') ||
    url.pathname === '/favicon.ico' ||
    url.pathname === '/manifest.webmanifest' ||
    /\.(?:css|js|mjs|woff2?|ttf|otf|eot)$/i.test(url.pathname)

  if (!isShellPage && !isShellPayload && !isStaticAsset) {
    return
  }

  // Seiten unabhängig von Query-Parametern und abschließendem
  // Slash zuordnen. Nuxt-Payloads wie bei Mirjam ohne _b speichern.
  const cacheKey = isShellPage
    ? url.origin + pagePath
    : isShellPayload
      ? url.origin + url.pathname
      : request

  event.respondWith(
    (async () => {
      const cache = await caches.open(SHELL_CACHE)
      const cachedResponse = await cache.match(cacheKey)

      if (cachedResponse) {
        return cachedResponse
      }

      let networkResponse

      try {
        networkResponse = await fetch(request)
      } catch {
        if (isShellPage) {
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

        // Für fehlendes JS/CSS/JSON keine HTML-Fehlerseite liefern.
        return Response.error()
      }

      if (networkResponse.ok) {
        try {
          await cache.put(cacheKey, networkResponse.clone())
        } catch (error) {
          // Ein Speicherproblem soll das Online-Laden nicht verhindern.
          console.warn('App-Shell konnte nicht gecacht werden.', error)
        }
      }

      return networkResponse
    })()
  )
})
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