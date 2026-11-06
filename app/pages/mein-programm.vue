
<script setup>
import ScheduleOverview from '~/components/features/schedule/ScheduleOverview.vue'

// Composable für die Verwaltung des "Mein Programm" Features
const {
  scheduledSessions,
  isInitialized
} = useSchedule()
</script>

<template>
  <section class="schedule-page">
    <h1>Mein Programm</h1>
    <h3>Dein persönlicher Zeitplan für die FrontendNow-Konferenz.</h3>

    <!-- ScheduleOverview-Komponente zeigt die vom User hinzugefügten Sessions an -->
    <ScheduleOverview
      :sessions="scheduledSessions"
      :is-initialized="isInitialized"
    />
  </section>
</template>