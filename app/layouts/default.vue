
<template>
  <div class="app-layout">
    <header class="site-header">
      <div class="container">
        <h1 class="logo">
          NextFrame<span>.</span>
        </h1>
      </div>
    </header>

    <main class="site-main">
      <slot />
    </main>

    <footer class="site-footer">
      <div class="container">
        <p>© 2026 NextFrame</p>
        <p>Focus & Clarity</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
  box-sizing: border-box;
}

/* Header */
.site-header {
  padding: var(--space-4) 0;
  border-bottom: 1px solid var(--color-border);
}

.logo {
  margin: 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.logo span {
  color: var(--color-accent);
}

/* Main */
.site-main {
  flex: 1;
}

/* Footer */
.site-footer {
  padding: var(--space-4) 0;
  border-top: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
}

.site-footer .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-4);
}

.site-footer p {
  margin: 0;
}

@media (max-width: 640px) {
  .container {
    padding: 0 var(--space-4);
  }

  .site-footer .container {
    flex-direction: column;
    gap: var(--space-2);
    text-align: center;
  }
}
</style>
