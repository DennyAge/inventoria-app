<template>
  <div>
    <label v-if="label" class="text-[14px] mb-1" :for="name">{{ label }}</label>
    <div>
      <textarea
        v-model="modelValue"
        :name="name"
        :maxlength="maxLength"
        :required="required"
        :disabled="disabled"
        :readOnly="readOnly"
        :placeholder="placeholder"
        :rows="rows"
        :class="
          cn('flex p-2 w-full rounded-md border border-gray-200 bg-white', {
            'border-red-500': error,
          })
        "
        style="resize: none"
      />
      <span v-if="error" class="text-red-500 text-xs mb-1">
        {{ error }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
//core
import { HTMLAttributes } from "vue";
//helpers
import { cn } from "@/lib/utils";

const props = defineProps<{
  defaultValue?: string;
  modelValue?: string;
  class?: HTMLAttributes["class"];
  placeholder?: string;
  label?: string;
  name?: string;
  error?: string;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  maxLength?: number;
  rows?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

//data
const modelValue = computed({
  get: () => props.modelValue ?? props.defaultValue ?? "",
  set: (value) => emit("update:modelValue", value),
});
</script>
