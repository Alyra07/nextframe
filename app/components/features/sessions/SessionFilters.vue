
<script setup>
defineProps({
  tracks: Array,
  days: Array,
  levels: Array
})

const selectedTrack = defineModel('track')
const selectedDay = defineModel('day')
const selectedLevel = defineModel('level')
</script>

<template>
  <div class="session-filters">
    <label>
      Track
      <select v-model="selectedTrack">
        <option value="">All tracks</option>
        <option
          v-for="track in tracks"
          :key="track.id"
          :value="track.id"
        >
          {{ track.name }}
        </option>
      </select>
    </label>

    <label>
      Day
      <select v-model="selectedDay">
        <option value="">All days</option>
        <option
          v-for="(day, index) in days"
          :key="day"
          :value="day"
        >
          Day {{ index + 1 }}
        </option>
      </select>
    </label>

    <label>
      Level
      <select v-model="selectedLevel">
        <option value="">All levels</option>
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
</template>
