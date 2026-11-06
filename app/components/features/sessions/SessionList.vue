
<script setup>
import SessionCard from './SessionCard.vue'
import ScheduleButton from '~/components/features/schedule/ScheduleButton.vue'

defineProps({
  sessions: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section class="session-list">
    <p class="session-list__count" aria-live="polite">
      {{ sessions.length }}
      {{ sessions.length === 1 ? 'Session gefunden' : 'Sessions gefunden' }}
    </p>

    <p
      v-if="sessions.length === 0"
      class="session-list__empty"
    >
      Keine Sessions entsprechen den ausgewählten Filtern.
    </p>

    <ul v-else class="session-list__grid">
      <li
        v-for="session in sessions"
        :key="session.id"
        class="session-list__item"
      >
        <SessionCard :session="session">
          <template #actions>
            <ScheduleButton :session-id="session.id" />
          </template>
        </SessionCard>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.session-list {
  margin-top: var(--spacing-section);
}

.session-list__count {
  margin: 0 0 var(--space-4);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

/* Responsive BentoBox-style session grid */
.session-list__grid {
  columns: 3;
  column-gap: var(--spacing-grid);

  list-style: none;
  margin: 0;
  padding: 0;
}

.session-list__item {
  break-inside: avoid;
  margin-bottom: var(--spacing-grid);
}

.session-list__empty {
  padding: var(--spacing-card);
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  border-radius: var(--radius-card);

  font-size: var(--font-size-base);
  line-height: var(--text-body-line-height);
}

@media (max-width: 900px) {
  .session-list__grid {
    columns: 2;
  }
}

@media (max-width: 640px) {
  .session-list__grid {
    columns: 1;
  }
}
</style>
