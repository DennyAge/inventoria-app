<template>
  <div
    class="fixed top-0 left-0 z-10 flex justify-center items-center w-full h-full bg-black/60"
  >
    <div
      class="flex flex-col overflow-hidden bg-white max-h-[95%] w-[37.25rem] rounded-md shadow-sm"
    >
      <div
        class="flex justify-between items-center py-3 px-8 border-b border-gray-200"
      >
        <h5>{{ title }}</h5>
        <Button type="button" variant="icon" size="icon" @click="onClose">
          <Icon name="ri:close-large-fill" />
        </Button>
      </div>
      <div class="p-8 overflow-scroll">
        <slot />
      </div>
      <div
        class="flex justify-end gap-4 py-3 px-8 border-t border-gray-200"
        v-if="!hiddenFooter"
      >
        <Button type="button" variant="outline" @click="onClose">
          {{ $t("cancel") }}
        </Button>
        <Button type="button" @click="onSubmit">{{ btnText }}</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "~/components/ui/Button.vue";

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
