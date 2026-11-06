
<script setup>
import BaseButton from '~/components/base/BaseButton.vue'

defineProps({
  tracks: Array,
  days: Array,
  levels: Array
})

const selectedTrack = defineModel('track')
const selectedDay = defineModel('day')
const selectedLevel = defineModel('level')

defineEmits(['reset'])
</script>

<template>
  <div class="session-filters">

    <div class="session-filters__fields">

      <label class="session-filters__field">
        <span class="session-filters__label">Thema</span>

        <select
          v-model="selectedTrack"
          class="session-filters__select"
        >
          <option value="">Alle Themen</option>
          <option
            v-for="track in tracks"
            :key="track.id"
            :value="track.id"
          >
            {{ track.name }}
          </option>
        </select>
      </label>

      <label class="session-filters__field">
        <span class="session-filters__label">Tag</span>

        <select
          v-model="selectedDay"
          class="session-filters__select"
        >
          <option value="">Alle Tage</option>
          <option
            v-for="(day, index) in days"
            :key="day"
            :value="String(day)"
          >
            Tag {{ index + 1 }}
          </option>
        </select>
      </label>

      <label class="session-filters__field">
        <span class="session-filters__label">Level</span>

        <select
          v-model="selectedLevel"
          class="session-filters__select"
        >
          <option value="">Alle Level</option>
          <option
            v-for="level in levels"
            :key="level"
            :value="level"
          >
            {{ level }}
          </option>
        </select>
      </label>

    </div>

    <div class="session-filters__actions">
      <BaseButton @click="$emit('reset')">
        Filter zurücksetzen
      </BaseButton>
    </div>

  </div>
</template>

<style scoped>
.session-filters {
  padding: var(--spacing-card);
  margin-block: var(--spacing-section);
  background: var(--color-surface);
  border-radius: var(--radius-card);
}

.session-filters__fields {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--spacing-grid);
}

.session-filters__field {
  display: grid;
  gap: var(--space-2);
  min-width: 0;
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
}

.session-filters__label {
  font-weight: var(--font-weight-semibold);
}

/* Drop-down Select */
.session-filters__select {
  box-sizing: border-box;
  width: 100%;
  padding: var(--space-3);

  background: var(--color-background);
  color: var(--color-text-primary);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-button);
  font: inherit;
  cursor: pointer;
}

.session-filters__select:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: var(--space-1);
}

/* Reset Button div */
.session-filters__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--space-3);
}

@media (max-width: 640px) {
  .session-filters__fields {
    grid-template-columns: 1fr;
  }
}
</style>
