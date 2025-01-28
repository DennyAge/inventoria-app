<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__header">
        <h5>{{ title }}</h5>
        <CloseButton @click="onClose" />
      </div>
      <div class="modal__body">
        <slot />
      </div>
      <div class="modal__footer" v-if="!hiddenFooter">
        <button @click="onClose" type="button" class="btn btn-danger">
          {{ $t("cancel") }}
        </button>
        <button @click="onSubmit" type="button" class="btn btn-success">
          {{ btnText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  btnText?: string;
  hiddenFooter?: boolean;
}>();

const emit = defineEmits(["close", "submit"]);

const onClose = () => {
  emit("close");
};
const onSubmit = () => {
  emit("submit");
};
</script>

<style scoped>
.modal {
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
.modal__content {
  background: var(--color-neutral-grey-10);
  max-height: 95%;
  width: 37.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 0.063rem solid var(--color-neutral-grey-75);
  font-size: 1rem;
}
.modal__body {
  padding: 2rem;
  overflow: scroll;
}
.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1rem 2rem;
  border-top: 0.063rem solid var(--color-neutral-grey-75);
}
</style>
