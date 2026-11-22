export default defineNuxtPlugin(nuxtApp => {

  if (import.meta.dev || !('serviceWorker' in navigator)) {
    return
  }

  nuxtApp.hook('app:mounted', async () => {
    try {
      await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none'
      })
    } catch (error) {
      console.error(
        'NextFrame: Service Worker konnte nicht registriert werden.',
        error
      )
    }
  })
})