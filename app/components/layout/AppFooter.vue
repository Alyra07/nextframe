<template>
  <footer class="site-footer">
    <div class="container footer-content">
      <p>© 2026 NextFrame</p>
      <p>Focus & Clarity</p>
    </div>
  </footer>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
  box-sizing: border-box;
}

.site-footer {
  padding: var(--space-4) 0;
  border-top: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.site-footer p {
  margin: 0;
}

@media (max-width: 640px) {
  .container {
    padding: 0 var(--space-4);
  }

  .footer-content {
    flex-direction: column;
    gap: var(--space-2);
    text-align: center;
  }
}
</style>