<template>
  <div class="flex items-center justify-center gap-2">
    <button
      v-for="loc in locales"
      :key="loc.code"
      class="border-none bg-transparent"
      :class="loc.code === locale && 'font-bold'"
      @click="setLocale(loc.code)"
    >
      {{ loc.code.toUpperCase() }}
    </button>
  </div>
</template>

<script lang="ts" setup>
const { locale, locales, setLocale } = useI18n();
</script>
