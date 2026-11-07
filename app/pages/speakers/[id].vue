<!-- Dynamische Profilseite für einen Speaker -->

<script setup>
import { computed } from 'vue'
import SpeakerDetail from '~/components/features/speakers/SpeakerProfile.vue'

// Bei einer neuen Speaker-URL die Seite neu initialisieren
definePageMeta({
  key: route => route.path
})

const route = useRoute()

const {
  getSpeakerById,
  getSessionsBySpeakerId
} = useConferenceData()

// Speaker anhand der aktuellen URL ermitteln
const speaker = computed(() =>
  getSpeakerById(route.params.id)
)

// 404 bei nicht vorhandenem Speaker
if (!speaker.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Speaker nicht gefunden'
  })
}

// Zugehörige Sessions reaktiv auflösen
const sessions = computed(() =>
  speaker.value
    ? getSessionsBySpeakerId(speaker.value.id)
    : []
)
</script>

<template>
  <SpeakerDetail
    v-if="speaker"
    :speaker="speaker"
    :sessions="sessions"
  />
</template>