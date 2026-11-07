
<!-- SessionDetail.vue stellt nur die Session-Details dar, die von der Seite /sessions/[id] übergeben werden!! -->

<script setup>
import BaseButton from '~/components/base/BaseButton.vue'
import ScheduleButton from '~/components/features/schedule/ScheduleButton.vue'

defineProps({
  session: {
    type: Object,
    required: true
  },
  track: {
    type: Object,
    default: null
  },
  room: {
    type: Object,
    default: null
  },
  speakers: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <article class="session-detail">
    <h1>{{ session.title }}</h1>

    <div class="session-detail__actions">
      <BaseButton
        to="/"
        size="small"
        variant="secondary"
      >
        ← Zurück zur Übersicht
      </BaseButton>

      <ScheduleButton :session-id="session.id" />
    </div>

    <section>
      <h2>Beschreibung</h2>
      <p>{{ session.abstract }}</p>
    </section>

    <section>
      <h2>Session-Informationen</h2>

      <dl>
        <dt>Tag</dt>
        <dd>{{ session.day }}</dd>

        <dt>Uhrzeit</dt>
        <dd>
          {{ session.startTime }} –
          {{ session.endTime }}
        </dd>

        <dt>Raum</dt>
        <dd>{{ room?.name ?? 'Unbekannt' }}</dd>

        <dt>Track</dt>
        <dd>{{ track?.name ?? 'Unbekannt' }}</dd>

        <dt>Level</dt>
        <dd>{{ session.level }}</dd>

        <dt>Format</dt>
        <dd>{{ session.format }}</dd>
      </dl>
    </section>

    <section>
      <h2>Speaker</h2>

      <ul v-if="speakers.length">
        <li
          v-for="speaker in speakers"
          :key="speaker.id"
        >
          <NuxtLink :to="`/speakers/${speaker.id}`">
            {{ speaker.name }}
          </NuxtLink>
        </li>
      </ul>

      <p v-else>
        Zu dieser Session sind keine Speaker zugeordnet.
      </p>
    </section>
  </article>
</template>

<style scoped>
.session-detail__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}
</style>