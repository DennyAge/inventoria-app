<template>
  <header class="main-header">
    <div class="main-header__input">
      <input
        v-if="showInput"
        v-model="inputValue"
        id="search"
        class="form-control"
        :placeholder="$t('search')"
        :key="locale"
        @input="onChange"
      />
    </div>
    <DateTime />
  </header>
</template>

<script setup lang="ts">
interface Props {
  showInput?: boolean;
}
withDefaults(defineProps<Props>(), {
  showInput: false,
});
const { locale } = useI18n();
const emit = defineEmits(["filter"]);

const inputValue = ref<string>("");

const onChange = () => {
  emit("filter", inputValue.value);
};
</script>

<style scoped>
.main-header {
  height: 3.75rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-neutral-white);
  box-shadow: var(--large-shadow);
}
.main-header__input {
  width: 50%;
}
</style>
