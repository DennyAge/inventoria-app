<template>
  <main class="page-container">
    <Sidebar :user="user" />
    <div class="page-content">
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts">
import Sidebar from "~/components/Sidebar.vue";
import { useAuthStore } from "~/stores/auth.store";
const { user } = useAuthStore();
</script>

<style scoped>
.page-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
}
.page-content {
  display: flex;
  width: calc(100% - 16.5rem);
  flex: 1;
  flex-direction: column;
}
@media screen and (max-width: 900px) {
  .page-content {
    width: calc(100% - 6.5rem);
  }
}
</style>
