<template>
  <div class="flex flex-col items-center gap-3">
    <div class="relative w-60">
      <canvas ref="pieChart" class="w-full h-full"></canvas>
    </div>
    <div class="flex flex-wrap items-start gap-y-2 gap-x-4">
      <div
        v-for="info in items"
        :key="info.label"
        class="flex items-center gap-2"
      >
        <div
          class="w-2.5 h-2.5 rounded-full"
          :style="`background: ${info.color}`"
        />
        {{ info.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Chart,
  type ChartItem,
  type ChartData,
  type ChartOptions,
} from "chart.js/auto";

interface ItemData {
  label: string;
  value: number;
  color: string;
}

interface Props {
  items: ItemData[];
  index?: number;
}

const props = withDefaults(defineProps<Props>(), {
  index: 1,
});

const pieChart = ref<HTMLCanvasElement | null>(null);

let chart: Chart<"doughnut", number[], string> | null = null;

onMounted(() => {
  if (pieChart.value) {
    const ctx = pieChart.value.getContext("2d") as ChartItem;

    const data: ChartData<"doughnut", number[], string> = {
      datasets: [
        {
          data: props.items.map((info) => info.value),
          backgroundColor: props.items.map((info) => info.color),
        },
      ],
    };

    const options: ChartOptions<"doughnut"> = {
      events: ["hover"],
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateRotate: true,
        animateScale: true,
      },
      borderWidth: 0,
      interaction: {
        mode: "nearest",
        intersect: false,
      },
    };

    chart = new Chart(ctx, {
      type: "doughnut",
      data,
      options,
    });
  }
});

onBeforeUnmount(() => {
  if (chart) {
    chart.destroy();
    chart = null;
  }
});
</script>
