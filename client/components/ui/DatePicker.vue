<template>
  <div class="relative w-full" ref="pickerRef">
    <div
      class="h-10 border border-gray-300 rounded-lg p-2 cursor-pointer bg-white flex items-center justify-between"
      :class="error && 'border-red-500'"
      @click="toggleCalendar"
    >
      <span v-if="selectedDate">{{ formattedDate }}</span>
      <span v-else class="text-gray-400">{{ placeholder }}</span>
      <Icon
        name="ri:calendar-line"
        class="w-4 h-4 text-gray-600"
        :class="error && 'text-red-500'"
      />
    </div>

    <div v-if="isOpen" class="absolute top-12 shadow-lg z-10">
      <VueDatePicker
        v-model="selectedDate"
        @update:modelValue="onDateSelect"
        inline
        :enable-time-picker="false"
        :auto-apply="true"
      />
    </div>
    <div v-if="error" class="text-xs text-red-500 absolute top-11">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps<{
  modelValue: number | string | null;
  placeholder?: string;
  error?: string;
}>();
const emit = defineEmits(["update:modelValue"]);

//data
const isOpen = ref(false);
const pickerRef = ref<HTMLElement | null>(null);
const selectedDate = ref<number | null>(
  props.modelValue ? Number(props.modelValue) : null,
);
const formattedDate = computed(() =>
  selectedDate.value ? new Date(selectedDate.value).toLocaleDateString() : "",
);

const toggleCalendar = () => {
  isOpen.value = !isOpen.value;
};

const onDateSelect = (date: Date) => {
  const timestamp = date.getTime();
  selectedDate.value = timestamp;
  emit("update:modelValue", timestamp.toString());
  isOpen.value = false;
};

const handleClickOutside = (event: Event) => {
  if (pickerRef.value && !pickerRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));
</script>
