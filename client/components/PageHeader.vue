<template>
  <div class="page-header">
    <div class="d-flex align-items-center gap-5">
      <div class="page-header__title">
        <span>{{ title }}</span>
        <span v-if="count"> / {{ count }}</span>
      </div>
      <div v-if="filter" class="page-header__filter">
        <div class="page-header__filter">
          <label for="type">{{ $t("type") }}:</label>
          <select
            class="form-control"
            id="type"
            v-model="type"
            @change="onChange"
          >
            <option>All</option>
            <option
              v-for="option in productTypes"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <button
      v-if="addBtn"
      @click="onClick"
      type="button"
      class="btn btn-success"
    >
      + {{ $t("addNewOrder") }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { productTypes } from "~/constants";

interface Props {
  title: string;
  count?: string | number;
  addBtn?: boolean;
  filter?: boolean;
  onClick?: () => void;
}
const props = withDefaults(defineProps<Props>(), {
  addBtn: false,
});
const emit = defineEmits(["filter"]);
const type = ref<string>("All");

const onChange = () => {
  emit("filter", type.value);
};
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}
.page-header__title {
  font-size: 1.7rem;
  font-weight: 600;
}
.page-header__filter {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
