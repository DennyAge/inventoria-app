<template>
  <form class="order-form" @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="title">{{ $t("title") }}:</label>
      <input
        v-model="form.title"
        type="text"
        class="form-control"
        id="title"
        aria-describedby="title"
        required
        maxlength="120"
        :class="{ 'is-invalid': !form.title.trim() && showFormError }"
      />
      <span v-if="!form.title.trim() && showFormError" class="text-danger">
        Title is required
      </span>
    </div>
    <div class="form-group">
      <label for="description">{{ $t("description") }}:</label>
      <textarea
        v-model="form.description"
        class="form-control"
        :class="{ 'is-invalid': !form.description.trim() && showFormError }"
        id="description"
        rows="5"
        aria-describedby="description"
        required
        style="resize: none"
      />
      <span
        v-if="!form.description.trim() && showFormError"
        class="text-danger text-sm"
      >
        Description is required
      </span>
    </div>
    <div class="form-footer">
      <button @click="onClose" type="button" class="btn btn-danger">
        {{ $t("cancel") }}
      </button>
      <button @click="onSubmit" type="button" class="btn btn-success">
        {{ $t("add") }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits(["close", "submit"]);
const form = reactive({
  title: "",
  description: "",
});
const showFormError = ref<boolean>(false);

const onClose = () => {
  emit("close");
};
const onSubmit = () => {
  if (!form.title.trim() || !form.description.trim()) {
    showFormError.value = true;
    return;
  }
  emit("submit", { title: form.title, description: form.description });
};
</script>

<style>
.order-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
.text-danger {
  font-size: 0.8rem;
}
</style>
