<script setup>
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
</script>

<template>
  <div class="app-layout">
    <AppHeader />

    <main class="site-main">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-main {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
  box-sizing: border-box;
}

@media (max-width: 640px) {
  .site-main {
    padding: var(--space-6) var(--space-4);
  }
}
</style>