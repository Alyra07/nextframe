<template>
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
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
  box-sizing: border-box;
}

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

@media (max-width: 640px) {
  .container {
    padding: 0 var(--space-4);
  }

  .main-navigation {
    gap: var(--space-4);
  }

  .nav-link {
    font-size: var(--font-size-sm);
  }
}
</style>