<template>
  <div class="page-header">
    <div class="page-header__title">
      <span>{{ title }}</span>
      <span v-if="count"> / {{ count }}</span>
    </div>
    <button
      v-if="addBtn"
      @click="onClick"
      type="button"
      class="btn btn-success"
    >
      + {{ $t("add") }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  count?: string | number;
  addBtn?: boolean;
  onClick?: () => void;
}
const props = withDefaults(defineProps<Props>(), {
  addBtn: false,
});
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
}
.page-header__title {
  font-size: 1.7rem;
  font-weight: 600;
}
</style>
