<template>
  <div class="app-layout">
    <header class="site-header">
      <div class="container header-content">
        <NuxtLink
          to="/"
          class="logo"
        >
          NextFrame<span>.</span>
        </NuxtLink>

        <nav class="main-navigation">
          <NuxtLink
            to="/"
            class="nav-link"
          >
            Sessions
          </NuxtLink>

          <NuxtLink
            to="/mein-programm"
            class="nav-link"
          >
            Mein Programm
          </NuxtLink>
        </nav>
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

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  text-decoration: none;
}

.logo span {
  color: var(--color-accent);
}

.main-navigation {
  display: flex;
  align-items: center;
  gap: var(--space-8);
}

.nav-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
}

.nav-link:hover {
  color: var(--color-text-primary);
}

.nav-link.router-link-active {
  color: var(--color-accent);
}

/* Main */

.site-main {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
  box-sizing: border-box;
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
}

.site-footer p {
  margin: 0;
}

/* Mobile Responsive */
@media (max-width: 640px) {
  .container {
    padding: 0 var(--space-4);
  }

  .site-main {
    padding: var(--space-6) var(--space-4);
  }

  .main-navigation {
    gap: var(--space-4);
  }

  .nav-link {
    font-size: var(--font-size-sm);
  }

  .site-footer .container {
    flex-direction: column;
    gap: var(--space-2);
    text-align: center;
  }
}
</style>