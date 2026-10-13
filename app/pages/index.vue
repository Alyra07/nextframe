<script setup>
import { useConferenceData } from '../composables/useConferenceData'

const { conference, sessions, speakers, tracks } = useConferenceData()
</script>

<template>
  <section>
    <h2>Willkommen bei NextFrame</h2>
    <p>Die Konferenzplattform befindet sich im Aufbau... :-)</p>

    <h2>Konferenzdaten erfolgreich geladen:</h2>
    <h3>{{ conference.name }}</h3>
    <p>{{ conference.tagline }}</p>
    <p>Location: {{ conference.location }}</p>

    <p>{{ sessions.length }} Sessions geladen</p>
    <p>{{ speakers.length }} Speaker geladen</p>
    <p>{{ tracks.length }} Tracks geladen</p>
  </section>
</template>
