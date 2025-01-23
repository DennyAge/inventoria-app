<template>
  <div class="delete-modal">
    <div class="delete-modal__content">
      <div class="delete-modal__header">
        <h5>{{ title }}</h5>
        <CloseButton @click="onClose" />
      </div>
      <div class="delete-modal__body">
        <span>{{ data?.title }}</span>
      </div>
      <div class="delete-modal__footer">
        <button @click="onClose" type="button" class="btn btn-danger">
          {{ $t("no") }}
        </button>
        <button @click="onSubmit" type="button" class="btn btn-success">
          {{ $t("yes") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, Order } from "~/types";

interface Props {
  title?: string;
  data: Product | Order;
}
const props = defineProps<Props>();
const emit = defineEmits(["close", "submit"]);

const onClose = () => {
  emit("close", false);
};
const onSubmit = () => {
  emit("submit", props.data._id);
};
</script>

<style scoped>
.delete-modal {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  box-sizing: border-box;
}
.delete-modal__content {
  background: var(--color-neutral-grey-10);
  width: 100%;
  max-width: 600px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.delete-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--color-neutral-grey-75);
  font-size: 1rem;
}
.delete-modal__body {
  padding: 2rem;
  border-bottom: 1px solid var(--color-neutral-grey-75);
}
.delete-modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem 2rem;
}
</style>
