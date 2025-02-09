<template>
  <div>
    <div class="flex items-center gap-2">
      <input
        class="w-5 h-5 cursor-pointer"
        type="radio"
        :value="value"
        :id="id"
        :checked="modelValue === value"
        @change="updateValue"
      />
      <label>
        {{ label }}
      </label>
    </div>
    <span v-if="error" class="text-red-500 text-xs">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean | null;
  id: string;
  value: boolean;
  label: string;
  error?: string;
}>();
const emit = defineEmits(["update:modelValue"]);
const updateValue = () => {
  emit("update:modelValue", props.value);
};
</script>
