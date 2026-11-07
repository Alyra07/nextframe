<script setup>
import ScheduleButton from '~/components/features/schedule/ScheduleButton.vue'

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

const { getSpeakersBySessionId } = useConferenceData()
</script>

<template>
  <div class="schedule-overview">
    <p v-if="!isInitialized">
      Programm wird geladen...
    </p>

    <p v-else-if="sessions.length === 0">
      Du hast noch keine Sessions zu deinem Programm hinzugefügt.
    </p>

    <template v-else>
      <p class="schedule-overview__count">
        {{ sessions.length }}
        {{ sessions.length === 1 ? 'Session' : 'Sessions' }}
        in deinem Programm
      </p>

      <div class="schedule-table-wrapper">
        <table class="schedule-table">
          <thead>
            <tr>
              <th>Session</th>
              <th>Speaker</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="session in sessions"
              :key="session.id"
            >
              <td>
                <NuxtLink :to="`/sessions/${session.id}`">
                  {{ session.title }}
                </NuxtLink>
              </td>

              <td>
                <div class="schedule-table__speakers">
                  <NuxtLink
                    v-for="speaker in getSpeakersBySessionId(session.id)"
                    :key="speaker.id"
                    :to="`/speakers/${speaker.id}`"
                  >
                    {{ speaker.name }}
                  </NuxtLink>
                </div>
              </td>

              <td class="schedule-table__action">
                <ScheduleButton :session-id="session.id" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<style scoped>
.schedule-overview__count {
  margin-bottom: var(--space-4);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.schedule-table-wrapper {
  overflow-x: auto;
  background: var(--color-surface);
  border-radius: var(--radius-card);
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: var(--space-4) var(--space-6);
  text-align: left;
  vertical-align: middle;
}

th {
  color: var(--color-accent);
  font-size: var(--font-size-sm);
}

tbody tr {
  border-top: 1px solid var(--color-primary);
}

td a {
  color: var(--color-text-primary);
  text-decoration: none;
}

td a:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

td:first-child {
  font-weight: var(--font-weight-semibold);
}

.schedule-table__speakers {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.schedule-table__action {
  text-align: right;
  white-space: nowrap;
}

@media (max-width: 640px) {
  th,
  td {
    padding: var(--space-3);
  }
}
</style>