<template>
  <div
    class="hidden md:w-sidebar-sm lg:w-sidebar-md py-4 bg-primary-25 md:flex flex-col items-center justify-between shadow-md"
    :class="cn({ 'lg:w-sidebar-sm': smallSidebar })"
  >
    <div>
      <div class="flex items-center justify-center gap-2 mb-12">
        <nuxt-img src="/logo.png" alt="logo" width="35px" />
        <span
          class="text-2xl uppercase hidden lg:block"
          :class="cn({ 'lg:hidden': smallSidebar })"
        >
          Inventoria
        </span>
      </div>
      <nav class="flex flex-col gap-y-2">
        <NuxtLink
          v-for="link in navigationLinks"
          :key="link.name"
          :to="localePath(link.path)"
          class="flex items-center gap-2 uppercase py-2 px-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white"
          :class="cn({ 'justify-center': smallSidebar })"
          active-class="text-white bg-primary-100"
        >
          <Icon :name="link.icon" />
          <span
            class="cursor-pointer hidden lg:block"
            :class="cn({ 'lg:hidden': smallSidebar })"
          >
            {{ $t(link.name) }}
          </span>
        </NuxtLink>
      </nav>
    </div>
    <Button variant="icon" size="icon" @click="setSmallSidebar">
      <Icon
        name="ri:arrow-left-double-fill"
        class="w-6 h-6"
        :class="cn({ 'rotate-180': smallSidebar })"
      />
    </Button>
  </div>
</template>

<script setup lang="ts">
//helpers
import { navigationLinks } from "~/constants/index.js";
import { cn } from "~/lib/utils.js";
//components
import Button from "~/components/ui/Button.vue";

const localePath = useLocalePath();
//data
const smallSidebar = ref<boolean>(false);

const setSmallSidebar = () => {
  smallSidebar.value = !smallSidebar.value;
};
</script>
