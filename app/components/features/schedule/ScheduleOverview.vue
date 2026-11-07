
<script setup>
defineProps({
  sessions: {
    type: Array,
    required: true
  },
  isInitialized: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div class="schedule-overview">
    <p v-if="!isInitialized">
      Programm wird geladen...
    </p>

    <p v-else-if="sessions.length === 0">
      Du hast noch keine Sessions zu deinem Programm hinzugefügt.
    </p>

    <div v-else>
      <p>
        {{ sessions.length }}
        {{ sessions.length === 1 ? 'Session' : 'Sessions' }}
        in deinem Programm
      </p>

      <ul>
        <li
          v-for="session in sessions"
          :key="session.id"
        >
          {{ session.title }}
        </li>
      </ul>
    </div>
  </div>
</template>