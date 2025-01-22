<template>
  <div class="date-time">
    <div class="date-time__data">
      <span>{{ day }}</span>
      <span>{{ date }}</span>
    </div>
    <div class="date-time__time">
      <Icon name="lucide:alarm-clock" class="icon" />
      <span> {{ time }}</span>
    </div>
    <div v-if="activeSessions" class="date-time__session">
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

<style scoped>
.date-time {
  display: flex;
  align-items: flex-end;
  gap: 2rem;
}
.date-time__data {
  display: flex;
  flex-direction: column;
}
.date-time__time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.icon {
  color: var(--color-semantic-green-100);
}
.date-time__session {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background: var(--color-semantic-green-75);
  padding: 0.5rem;
  margin-bottom: 0.3rem;
}
</style>
