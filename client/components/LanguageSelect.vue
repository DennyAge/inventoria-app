<template>
  <div class="language-select">
    <button
      v-for="language in languages"
      :key="language"
      class="language-select__bnt"
      :class="language === locale && 'active'"
      @click="setLocale(language)"
    >
      {{ language.toUpperCase() }}
    </button>
  </div>
</template>

<script lang="ts" setup>
const { locale, setLocale } = useI18n();

const languages = ["en", "ua", "ru"];
</script>

<style scoped>
.language-select {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.language-select__bnt {
  border: none;
  background: transparent;
}
.active {
  font-weight: bold;
}
</style>
