
<!-- SessionDetail.vue stellt nur die Session-Details dar, die von der Seite /sessions/[id] übergeben werden!! -->

<script setup>
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
  <article>
    <h1>{{ session.title }}</h1>

    <!-- NuxtLink zu /sessions ändern falls die SessionList in Zukunft in einer anderen Route implementiert wird -->
    <NuxtLink to="/">
      Zurück zur gesamten Session-Übersicht
    </NuxtLink>

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
        <!-- Eigener Link zur jeweiligen Speaker-Profilseite -->
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