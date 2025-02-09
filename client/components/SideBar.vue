<template>
  <div
    class="w-sidebar-sm lg:w-sidebar-md px-3 py-4 bg-primary-25 flex flex-col items-center justify-between shadow-md"
  >
    <div>
      <div class="flex items-center justify-center gap-2 mb-12">
        <nuxt-img src="/logo.png" alt="logo" width="35px" />
        <span class="text-2xl uppercase hidden lg:block">Inventoria</span>
      </div>
      <nav class="flex flex-col gap-2">
        <NuxtLink
          v-for="link in navigationLinks"
          :key="link.name"
          :to="localePath(link.path)"
          class="flex items-center gap-2 uppercase py-2 px-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white"
          active-class="text-white bg-primary-100"
        >
          <Icon :name="link.icon" />
          <span class="hidden lg:block cursor-pointer">
            {{ $t(link.name) }}
          </span>
        </NuxtLink>
      </nav>
    </div>
    <div class="flex flex-col items-center gap-3">
      <UserCard v-if="user" :user="user" />
      <LanguageSelect />
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigationLinks } from "~/constants/index.js";
import type { User } from "~/types";

interface Props {
  user: User;
}
defineProps<Props>();
const localePath = useLocalePath();
</script>
