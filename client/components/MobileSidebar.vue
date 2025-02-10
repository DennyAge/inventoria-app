<template>
  <div
    class="absolute top-0 left-0 z-40 h-dvh pt-20 pb-8 px-8 bg-primary-25 w-full animate-slide-down md:hidden flex flex-col justify-between"
  >
    <nav class="flex flex-col gap-2">
      <NuxtLink
        v-for="link in navigationLinks"
        :key="link.name"
        :to="localePath(link.path)"
        class="flex items-center gap-2 uppercase py-2 px-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white"
        active-class="text-white bg-primary-100"
      >
        <Icon :name="link.icon" />
        <span class="cursor-pointer">
          {{ $t(link.name) }}
        </span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { navigationLinks } from "~/constants/index.js";
const localePath = useLocalePath();
</script>

<style scoped></style>
