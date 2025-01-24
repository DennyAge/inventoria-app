<template>
  <form class="order-form" @submit.prevent="onSubmit">
    <div class="form-group">
      <label for="title">Title</label>
      <input
        v-model="title"
        type="text"
        class="form-control"
        id="title"
        aria-describedby="title"
        required
        maxlength="120"
        :class="{ 'is-invalid': !title.trim() && showFormError }"
      />
      <span v-if="!title.trim() && showFormError" class="text-danger">
        Title is required
      </span>
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <textarea
        v-model="description"
        class="form-control"
        :class="{ 'is-invalid': !description.trim() && showFormError }"
        id="description"
        rows="5"
        aria-describedby="description"
        required
        style="resize: none"
      />
      <span
        v-if="!description.trim() && showFormError"
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
const title = ref<string>("");
const description = ref<string>("");
const showFormError = ref<boolean>(false);

const emit = defineEmits(["close", "submit"]);

const onClose = () => {
  emit("close");
};
const onSubmit = () => {
  if (!title.value.trim() || !description.value.trim()) {
    showFormError.value = true;
    return;
  }
  emit("submit", { title: title.value, description: description.value });
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
