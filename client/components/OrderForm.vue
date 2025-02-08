<template>
  <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
    <CustomInput
      v-model="form.title"
      :label="$t('title')"
      placeholder="Title"
      type="text"
      name="title"
      id="title"
      maxlength="75"
      required
      :error="!form.title.trim() && showFormError ? 'Title is required' : ''"
    />
    <TextArea
      v-model="form.description"
      :label="$t('description')"
      placeholder="Description"
      name="description"
      id="description"
      rows="5"
      maxlength="250"
      required
      :error="
        !form.description.trim() && showFormError
          ? 'Description is required'
          : ''
      "
    />

    <div class="flex justify-end gap-4">
      <Button @click="onClose" type="button" variant="outline">
        {{ $t("cancel") }}
      </Button>
      <Button @click="onSubmit" type="button">
        {{ $t("add") }}
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import CustomInput from "~/components/ui/CustomInput.vue";
import TextArea from "~/components/ui/TextArea.vue";
import Button from "~/components/ui/Button.vue";

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
  emit("submit", form);
};
</script>

<style scoped></style>
