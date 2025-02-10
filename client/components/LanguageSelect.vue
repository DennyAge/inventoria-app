<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="flex items-center justify-between py-1 px-2 border border-gray-200 rounded-md bg-white"
    >
      {{ locale ? locale.toUpperCase() : "" }}
      <Icon
        name="ri:arrow-down-s-line"
        class="w-4 h-4 text-gray-600"
        :class="cn(showDropdown && 'rotate-180')"
      />
    </button>
    <div
      v-if="showDropdown"
      class="flex flex-col gap-2 absolute top-8 left-0 w-max z-10 p-2 border border-gray-200 rounded-md bg-white"
    >
      <button
        v-for="loc in locales"
        :key="loc.code"
        class="border-none cursor-pointer rounded-md hover:bg-primary-25 py-1 px-2"
        :class="cn(loc.code === locale && 'bg-primary-25')"
        @click="setLocale(loc.code)"
      >
        {{ loc.code.toUpperCase() }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
//helpers
import { cn } from "~/lib/utils.js";

//data
const { locale, locales, setLocale } = useI18n();
const showDropdown = ref<boolean>(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
</script>
