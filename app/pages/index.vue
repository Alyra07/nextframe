
<script setup>
import { computed } from 'vue'
import SessionFilters from '~/components/features/sessions/SessionFilters.vue'
import SessionList from '~/components/features/sessions/SessionList.vue'

const { sessions, tracks } = useConferenceData()

const {
  selectedTrack,
  selectedDay,
  selectedLevel,
  filteredSessions,
  resetFilters
} = useSessionFilters(sessions)

const days = computed(() =>
  [...new Set(sessions.map(session => session.day))].sort()
)

const levels = computed(() =>
  [...new Set(sessions.map(session => session.level))]
)
</script>

<template>
    <h1>Explore Sessions</h1>
    <p>Discover sessions at FrontendNow.</p>

    <SessionFilters
      v-model:track="selectedTrack"
      v-model:day="selectedDay"
      v-model:level="selectedLevel"
      :tracks="tracks"
      :days="days"
      :levels="levels"
    />

    <button type="button" @click="resetFilters">
      Reset filters
    </button>

    <SessionList :sessions="filteredSessions" />
</template>
