<script setup>
import BaseCard from '~/components/base/BaseCard.vue'

defineProps({
  session: {
    type: Object,
    required: true
  }
})

const { getTrackById } = useConferenceData()
</script>

<template>
  <BaseCard>
    <div class="session-card">

      <div class="session-card__top">
        <span class="session-card__track">
          {{ getTrackById(session.trackId)?.name }}
        </span>

        <span class="session-card__level">
          {{ session.level }}
        </span>
      </div>

      <h2 class="session-card__title">
        <NuxtLink :to="`/sessions/${session.id}`">
          {{ session.title }}
        </NuxtLink>
      </h2>

      <div class="session-card__details">

        <span class="session-card__detail">
          <span class="session-card__detail-label">Tag</span>
          {{ session.day }}
        </span>

        <span class="session-card__detail">
          <span class="session-card__detail-label">Zeit</span>
          {{ session.startTime }}–{{ session.endTime }}
        </span>

        <span class="session-card__detail">
          <span class="session-card__detail-label">Format</span>
          {{ session.format }}
        </span>

      </div>

      <div
        v-if="$slots.actions"
        class="session-card__actions"
      >
        <slot name="actions" />
      </div>

    </div>
  </BaseCard>
</template>

<style scoped>
.session-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  height: 100%;
}

/* Track & level */
.session-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.session-card__track {
  display: inline-flex;
  align-items: center;

  padding: var(--space-1) var(--space-3);
  background-color: var(--color-accent-action);
  color: var(--color-text-on-action);

  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-badge);
}

.session-card__level {
  color: var(--color-text-primary);
  font-size: var(--font-size-xs);
}

/* Session title */
.session-card__title {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  line-height: var(--text-heading-line-height);
  overflow-wrap: anywhere;
}

.session-card__title a {
  color: var(--color-text-primary);
  text-decoration: none;
}

.session-card__title a:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

.session-card__title a:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: var(--space-1);
  border-radius: var(--radius-sm);
}

/* Session metadata */
.session-card__details {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);

  padding-top: var(--space-3);
  border-top: 1px solid var(--color-primary);
}

.session-card__detail {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);

  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-body);
}

.session-card__detail-label {
  color: var(--color-accent);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
}
</style>
