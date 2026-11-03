
<script setup>
defineProps({
  sessions: Array
})

const { getTrackById } = useConferenceData()
</script>

<template>
  <div class="session-list">
    <p>{{ sessions.length }} sessions found</p>

    <p v-if="sessions.length === 0">
      No sessions match your filters.
    </p>

    <ul v-else>
      <li
        v-for="session in sessions"
        :key="session.id"
      >
        <NuxtLink :to="`/sessions/${session.id}`">
          <h2>{{ session.title }}</h2>
        </NuxtLink>

        <p>
          {{ getTrackById(session.trackId)?.name }}
          · {{ session.startTime }}–{{ session.endTime }}
          · {{ session.level }}
        </p>
      </li>
    </ul>
  </div>
</template>
