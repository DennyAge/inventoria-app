<template>
  <div class="pie-chart">
    <div class="progress-container">
      <canvas ref="pieChart"></canvas>
    </div>
    <div class="graph_type__info">
      <div v-for="info in items" :key="info.label" class="graph_type__item">
        <div class="graph_type_icon" :style="`background: ${info.color}`"></div>
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
<style scoped>
.pie-chart {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}
.progress-container {
  position: relative;
}
.graph_type__info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
}
.graph_type__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.graph_type_icon {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 100%;
}
</style>
