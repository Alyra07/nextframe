
<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary'
  }
})
</script>

<template>
  <button
    :type="type"
    class="base-button"
    :class="`base-button--${variant}`"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-on-action);
  border: 0;
  border-radius: var(--radius-button);
  font: inherit;
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
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
