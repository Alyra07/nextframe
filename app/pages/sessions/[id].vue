<!-- Dynamische Detailseite für eine Session -->

<script setup>
import { computed } from 'vue'
import SessionDetail from '~/components/features/sessions/SessionDetail.vue'

// Bei einer neuen Session-URL die Seite neu initialisieren
definePageMeta({
  key: route => route.path
})

const route = useRoute()

const {
  getSessionById,
  getTrackById,
  getRoomById,
  getSpeakersBySessionId
} = useConferenceData()

// Session anhand der aktuellen URL ermitteln
const session = computed(() =>
  getSessionById(route.params.id)
)

// 404 bei nicht vorhandener Session
if (!session.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Session nicht gefunden'
  })
}

// Zugehörige Informationen reaktiv auflösen
const track = computed(() =>
  session.value
    ? getTrackById(session.value.trackId)
    : null
)

const room = computed(() =>
  session.value
    ? getRoomById(session.value.roomId)
    : null
)

const speakers = computed(() =>
  session.value
    ? getSpeakersBySessionId(session.value.id)
    : []
)
</script>

<template>
  <SessionDetail
    v-if="session"
    :session="session"
    :track="track"
    :room="room"
    :speakers="speakers"
  />
</template>