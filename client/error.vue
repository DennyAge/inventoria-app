<template>
  <div class="error_page">
    <div class="error_page__content" v-if="error?.statusCode === 500">
      <Image src="/images/500.jpg" width="50%" />
      <span>Server error! Please try later...</span>
    </div>
    <div class="error_page__content" v-if="error?.statusCode === 404">
      <Image src="/images/404.jpg" width="50%" />
      <button class="btn btn-primary" @click="goToDashboard">
        Go to Dashboard
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const goToDashboard = () => clearError({ redirect: "/" });
</script>

<style scoped>
.error_page {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.error_page__content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
