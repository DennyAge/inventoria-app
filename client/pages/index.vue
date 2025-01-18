<template>
  <section>
    <Header />
    <div class="dashboard-page">
      <PageHeader :title="$t('dashboard')" />
      {{ activeSessions }}
    </div>
  </section>
</template>

<script setup>
useHead({
  title: "Dashboard",
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/logo.png",
    },
  ],
});
const { $io } = useNuxtApp();
const activeSessions = ref(0);

onMounted(() => {
  $io.on("activeSessions", (count) => {
    activeSessions.value = count;
  });
});

onUnmounted(() => {
  $io.disconnect();
});

import Header from "~/components/Header.vue";
import PageHeader from "~/components/PageHeader.vue";
</script>

<style scoped>
.dashboard-page {
  padding: 2rem 3rem;
}
</style>
