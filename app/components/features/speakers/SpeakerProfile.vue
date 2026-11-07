<!-- SpeakerProfile.vue stellt nur die Speaker-Details dar,
     die von der Seite /speakers/[id] übergeben werden -->

<script setup>
defineProps({
  speaker: {
    type: Object,
    required: true
  },
  sessions: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <article>
    <h1>{{ speaker.name }}</h1>

    <NuxtLink to="/">
      Zurück zur gesamten Session-Übersicht
    </NuxtLink>

    <section>
      <h2>Speaker-Informationen</h2>

      <dl>
        <dt>Titel</dt>
        <dd>{{ speaker.title }}</dd>

        <dt>Firma</dt>
        <dd>{{ speaker.company }}</dd>
      </dl>
    </section>

    <section>
      <h2>Über {{ speaker.name }}</h2>
      <p>{{ speaker.bio }}</p>
    </section>

    <section>
      <h2>Sessions</h2>

      <ul v-if="sessions.length">
        <li
          v-for="session in sessions"
          :key="session.id"
        >
          <NuxtLink :to="`/sessions/${session.id}`">
            {{ session.title }}
          </NuxtLink>
        </li>
      </ul>

      <p v-else>
        Diesem Speaker sind keine Sessions zugeordnet.
      </p>
    </section>
  </article>
</template>