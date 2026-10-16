<script setup lang="ts">
import { useConferenceData } from '../composables/useConferenceData'

const { conference, sessions, speakers, tracks } = useConferenceData()
</script>

<template>
  <main class="home">

    <div class="bento-grid">
     
      <section class="card hero">
        <p class="eyebrow">FOCUS & CLARITY</p>

        <div>
          <h2>Your conference.<br>Your perspective.</h2>
          <p>Entdecke die {{ conference.name }}-Konferenz.</p>
        </div>
      </section>

      <section class="card coming-soon">
        <div>
          <h2>Coming soon! ✦</h2>
          <p>Unsere Konferenzplattform befindet sich noch im Aufbau.</p>
        </div>

        <div class="stats">
          <span>{{ sessions.length }} Sessions</span>
          <span>{{ speakers.length }} Speakers</span>
          <span>{{ tracks.length }} Tracks</span>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.home {
  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
  padding: var(--space-8);
  color: var(--color-text-primary);
}

.brand {
  margin-bottom: var(--space-8);
  font-size: var(--font-size-xl);
}

.brand span {
  color: var(--color-accent);
}

.bento-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-grid);
}

.card {
  padding: var(--spacing-card);
  border-radius: var(--radius-card);
}

.hero {
  min-height: 300px;
  background: var(--color-surface);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.eyebrow {
  color: var(--color-accent);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
}

.hero h2 {
  font-size: var(--font-size-2xl);
  line-height: var(--line-height-tight);
  margin-bottom: var(--space-4);
}

.coming-soon {
  background: var(--color-surface-contrast);
  color: var(--color-text-on-light);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-6);
}

.coming-soon h2 {
  margin-bottom: var(--space-3);
}

.stats {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.stats span {
  padding: var(--space-2);
  border-radius: var(--radius-badge);
  background: var(--color-surface);
  color: var(--color-text-primary);
  font-size: var(--font-size-xs);
}

@media (max-width: 650px) {
  .home {
    padding: var(--space-4);
  }

  .bento-grid {
    grid-template-columns: 1fr;
  }

  .hero {
    min-height: 250px;
  }
}
</style>
