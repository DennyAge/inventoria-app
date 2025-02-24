<template>
  <div class="relative" ref="selectRef">
    <label v-if="label" class="text-sm" for="selectRef">{{ label }}</label>
    <div
      class="h-8 md:h-10 border border-gray-300 rounded-lg p-2 cursor-pointer bg-white flex items-center justify-between"
      :class="error && 'border-red-500'"
      @click="toggleDropdown"
    >
      <span
        v-if="selectedOptions.length"
        class="text-xs sm:text-sm md:text-base truncate"
        >{{ selectedText }}</span
      >
      <span v-else class="text-gray-400">{{ placeholder }}</span>
      <Icon
        name="ri:arrow-down-s-line"
        class="w-4 h-4 text-gray-600"
        :class="isOpen && 'rotate-180'"
      />
    </div>

    <div
      v-if="isOpen"
      class="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10"
    >
      <input
        v-if="searchable"
        v-model="searchQuery"
        type="text"
        class="w-full p-2 border-b border-gray-200 focus:outline-none"
        placeholder="Search..."
        @keydown.stop
      />
      <ul class="max-h-60 overflow-y-auto p-2">
        <li
          v-for="option in filteredOptions"
          :key="option.value"
          class="p-2 cursor-pointer rounded-md hover:bg-primary-25 flex items-center mb-1 text-sm md:text-base"
          :class="{ 'bg-primary-25': isSelected(option) }"
          @click="toggleSelection(option)"
        >
          <input
            v-if="multiple"
            type="checkbox"
            :checked="isSelected(option)"
            class="mr-2"
          />
          <slot name="option" :option="option">{{ option.label }}</slot>
        </li>
        <li
          v-if="!filteredOptions.length"
          class="p-2 text-gray-500 text-center"
        >
          No options found
        </li>
      </ul>
    </div>
    <span v-if="error" class="text-red-500 text-xs">
      {{ error }}
    </span>
  </div>
</template>

<script setup lang="ts">
type Option = { value: string | number; label: string };

const props = defineProps<{
  options: Option[];
  modelValue: string | string[];
  multiple?: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
  searchable?: boolean;
}>();
const emit = defineEmits(["update:modelValue", "input"]);

//data
const isOpen = ref(false);
const searchQuery = ref("");
const selectRef = ref<HTMLElement | null>(null);

const selectedOptions = computed(() => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    return props.options.filter((option) =>
      props.modelValue.includes(option.value),
    );
  }
  return props.options.find((option) => option.value === props.modelValue)
    ? [props.options.find((option) => option.value === props.modelValue)!]
    : [];
});

const selectedText = computed(() =>
  selectedOptions.value.map((option) => option.label).join(", "),
);

const filteredOptions = computed(() =>
  props.options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const isSelected = (option: Option) => {
  return props.multiple
    ? props.modelValue.includes(option.value)
    : props.modelValue === option.value;
};

const toggleSelection = (option: Option) => {
  if (props.multiple) {
    const newValue = props.modelValue.includes(option.value)
      ? props.modelValue.filter((val) => val !== option.value)
      : [...props.modelValue, option.value];
    emit("update:modelValue", newValue);
    emit("input", newValue);
  } else {
    emit("update:modelValue", option.value);
    emit("input", option.value);
    isOpen.value = false;
  }
};

const handleClickOutside = (event: Event) => {
  if (selectRef.value && !selectRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));
</script>
