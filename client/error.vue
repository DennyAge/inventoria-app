<template>
  <div class="w-full h-dvh flex items-center justify-center bg-white">
    <div
      class="flex flex-col items-center justify-center"
      v-if="error?.statusCode === 500"
    >
      <nuxt-img src="/images/500.jpg" class="w-1/2" />
      <span>Server error! Please try later...</span>
    </div>
    <div
      class="flex flex-col items-center justify-center"
      v-if="error?.statusCode === 404"
    >
      <nuxt-img src="/images/404.jpg" class="w-1/2" />
      <Button @click="goToDashboard"> Go to Dashboard </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
import Button from "~/components/ui/Button.vue";

defineProps({
  error: Object as () => NuxtError,
});

const goToDashboard = () => clearError({ redirect: "/" });
</script>
