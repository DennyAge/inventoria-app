<template>
  <div>
    <h1>Active Users: {{ activeSessions }}</h1>
  </div>
</template>

<script setup>
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
</script>
