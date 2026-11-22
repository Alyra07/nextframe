// Cache first regeln müssen ergänzt werden, persönliche session IDs bleiben im Local storage
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})