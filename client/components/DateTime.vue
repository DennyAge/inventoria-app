<template>
  <div class="flex items-end gap-8">
    <div class="flex flex-col">
      <span>{{ day }}</span>
      <span>{{ date }}</span>
    </div>
    <div class="flex items-center gap-2">
      <Icon name="lucide:alarm-clock" class="text-green-500" />
      <span> {{ time }}</span>
    </div>
    <div
      v-if="activeSessions"
      class="w-6 h-6 flex items-center justify-center rounded-full bg-green-300 p-2 mb-1"
    >
      {{ activeSessions }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatDate, formatTime, getDayOfWeek } from "~/lib/utils";
const { locale } = useI18n();

const date = ref<string>("");
const time = ref<string>("");
const day = ref<string>("");
const activeSessions = useState<number>("activeSessions");

const updateDateTime = (): void => {
  date.value = formatDate(new Date(), locale.value);
  time.value = formatTime(new Date(), locale.value);
  day.value = getDayOfWeek(new Date(), locale.value);
};

let timer: ReturnType<typeof setInterval>;

onMounted(() => {
  updateDateTime();
  timer = setInterval(updateDateTime, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});

watch(locale, () => {
  updateDateTime();
});
</script>
