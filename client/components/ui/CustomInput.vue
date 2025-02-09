<script setup lang="ts">
import { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
  placeholder?: string;
  label?: string;
  name?: string;
  error?: string;
  required?: boolean;
  leftIcon?: boolean;
  rightIcon?: boolean;
  type?: string;
  readOnly?: boolean;
  removeBtn?: boolean;
  disabled?: boolean;
  max?: number;
  maxLength?: number;
  min?: number;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  defaultValue: props.defaultValue,
});

const showPassword = ref(false);

const inputType = computed(() =>
  showPassword.value && props.name === "password"
    ? "text"
    : props.type || "text",
);

const handleClearValue = (e: Event) => {
  e.preventDefault();
  modelValue.value = typeof modelValue.value === "number" ? 0 : "";
};
const handleShowPassword = (e: Event) => {
  e.preventDefault();
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div>
    <label v-if="label" class="text-sm mb-1" :for="name">{{ label }}</label>
    <div class="relative">
      <div v-show="leftIcon" class="absolute top-3 left-2 flex items-center">
        <slot name="left-icon" />
      </div>
      <input
        v-model="modelValue"
        :name="name"
        :maxlength="maxLength"
        :required="required"
        :disabled="disabled"
        :readOnly="readOnly"
        :placeholder="placeholder"
        :type="inputType"
        :max="max"
        :min="min"
        :class="
          cn(
            'flex h-10 py-2 w-full rounded-md border border-gray-200 bg-white',
            { 'pl-7 pr-2': leftIcon },
            { 'pl-7 pr-7': leftIcon && rightIcon },
            { 'pr-7 pl-2': rightIcon || removeBtn },
            { 'pr-7 pl-2': name === 'password' },
            { 'pr-7 pl-7': leftIcon && removeBtn },
            { 'px-2': !rightIcon && !leftIcon && !removeBtn },
            { 'border-red-500 mb-1': error },
          )
        "
      />
      <div v-show="rightIcon" class="absolute top-3 right-2 flex items-center">
        <slot name="right-icon" />
      </div>
      <button
        v-if="removeBtn"
        @click="handleClearValue"
        class="absolute top-3 right-2 flex items-center p-0 m-0 w-max h-max z-1000"
      >
        <Icon name="ri:close-fill" />
      </button>
      <button
        v-if="name === 'password'"
        @click="handleShowPassword"
        class="absolute top-3 right-2 flex items-center p-0 m-0 w-max h-max z-1000"
      >
        <Icon v-if="showPassword" name="ri:eye-line" />
        <Icon v-else name="ri:eye-off-line" />
      </button>
      <span v-if="error" class="text-red-500 text-xs absolute top-11">
        {{ error }}
      </span>
    </div>
  </div>
</template>
