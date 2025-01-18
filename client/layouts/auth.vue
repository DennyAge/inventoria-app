<template>
  <main class="auth-layout">
    <div class="auth-layout__left-side">
      <div class="logo">
        <Image src="/logo.png" alt="logo" width="35px" />
        <span>Inventory</span>
      </div>
    </div>
    <div class="auth-layout__right-side">
      <slot />
    </div>
  </main>
</template>

<script lang="ts" setup></script>

<style scoped>
.auth-layout {
  display: flex;
  height: 100vh;
  width: 100%;
}
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  text-transform: uppercase;
  padding: 1.5rem 2rem;
}
.auth-layout__left-side {
  flex: 1;
  background: url("/chris-lee-unsplash.jpg") no-repeat;
}
.auth-layout__right-side {
  flex: 1;
}
</style>
