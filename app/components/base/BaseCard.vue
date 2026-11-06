<template>
  <article class="base-card">
    <slot />
  </article>
</template>

<style scoped>
.base-card {
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  padding: var(--spacing-card);
  background-color: var(--color-surface);
  color: var(--color-text-primary);

  border: 1px solid transparent;
  border-radius: var(--radius-card);
}

/* Hover effect */
.base-card:hover {
  /* border-color: var(--color-primary); */
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  .base-card {
    transition: none;
  }

  .base-card:hover {
    transform: none;
  }
}
</style>
