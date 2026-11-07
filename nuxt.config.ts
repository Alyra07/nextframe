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

  nitro: {
    prerender: {
      crawlLinks: false,
      routes: [
        '/',
        ...sessionRoutes,
        ...speakerRoutes
      ]
    }
  }
})
