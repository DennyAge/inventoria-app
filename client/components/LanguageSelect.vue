<template>
  <div class="language-select">
    <button
      v-for="loc in locales"
      :key="loc.code"
      class="language-select__bnt"
      :class="loc.code === locale && 'active'"
      @click="setLocale(loc.code)"
    >
      {{ loc.code.toUpperCase() }}
    </button>
  </div>
</template>

<script lang="ts" setup>
const { locale, locales, setLocale } = useI18n();
</script>

<style scoped>
.language-select {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
}
.language-select__bnt {
  border: none;
  background: transparent;
}
.active {
  font-weight: bold;
}
</style>
