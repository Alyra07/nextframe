<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  },
  // Variante (Farbe) des Buttons: primary, secondary
  variant: {
    type: String,
    default: 'primary'
  },
  // Größe des Buttons: small, medium
  size: {
    type: String,
    default: 'medium'
  },
  // Optionaler Link, falls der Button als Link fungieren soll
  to: {
    type: String,
    default: null
  }
})
</script>

<template>
  <!-- Falls ein "to"-Prop übergeben wird, rendern wir einen <NuxtLink> -->
  <NuxtLink
    v-if="to"
    :to="to"
    class="base-button"
    :class="[
      `base-button--${variant}`,
      `base-button--${size}`
    ]"
  >
    <slot />
  </NuxtLink>
  <!-- Ansonsten rendern wir einen normalen <button> -->
  <button
    v-else
    :type="type"
    class="base-button"
    :class="[
      `base-button--${variant}`,
      `base-button--${size}`
    ]"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: var(--color-text-on-action);
  border: 0;
  border-radius: var(--radius-button);

  font: inherit;
  font-weight: var(--font-weight-semibold);
  text-decoration: none;

  cursor: pointer;
}

.base-button--medium {
  padding: var(--space-3) var(--space-4);
}

.base-button--small {
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-sm);
}

.base-button--primary {
  background: var(--color-primary-action);
}

.base-button--primary:hover {
  background: var(--color-accent-action);
}

.base-button--secondary {
  background: var(--color-accent-action);
}

.base-button--secondary:hover {
  background: var(--color-primary-action);
}

.base-button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: var(--space-1);
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>