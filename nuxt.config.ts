import { defineNuxtConfig } from 'nuxt/config'
import conferenceData from './data/conference-data.json'

// Alle Session-Detailrouten für SSG vorbereiten
const sessionRoutes = conferenceData.sessions.map(
  session => `/sessions/${session.id}`
)

// Alle Speaker-Profilrouten für SSG vorbereiten
const speakerRoutes = conferenceData.speakers.map(
  speaker => `/speakers/${speaker.id}`
)

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: '/icons/pwa-192x192.png'
        },
        {
          rel: 'manifest',
          href: '/manifest.webmanifest'
        },
        {
          rel: 'apple-touch-icon',
          href: '/icons/pwa-192x192.png'
        }
      ],
      meta: [
        {
          name: 'theme-color',
          content: '#172441'
        }
      ]
    }
  },

  routeRules: {
    '/mein-programm': {
      ssr: false
    }
  },

  nitro: {
    prerender: {
      crawlLinks: false,
      routes: [
        '/',
        '/mein-programm',
        ...sessionRoutes,
        ...speakerRoutes
      ]
    }
  }
})