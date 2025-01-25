<template>
  <div class="chart-header">
    <div class="label-container">
      <div class="chart-label">
        <div :style="`background: ${orderColor}`" class="label-icon" />
        {{ orderLabel }}
      </div>
      <div class="chart-label">
        <div :style="`background: ${productColor}`" class="label-icon" />
        {{ productLabel }}
      </div>
    </div>
  </div>
  <div class="line-chart__wrapper">
    <canvas ref="barChart" id="lineChart"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { Chart, type ChartOptions } from "chart.js/auto";
import { formatCurrency, crossLine } from "~/lib/utils";

interface ItemData {
  label: string;
  allocated: number;
  booked: number;
}

interface Props {
  items: ItemData[];
  orderLabel?: string;
  orderColor?: string;
  productLabel?: string;
  productColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  orderLabel: "Orders",
  orderColor: "#DFDFFF",
  productLabel: "Products",
  productColor: "#A0A2ED",
});

const barChart = ref<HTMLCanvasElement | null>(null);

const chartConfig = computed(() => {
  const datasetStyle = {
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    barThickness: 25,
    borderRadius: 20,
  };

  const yOptions: ChartOptions<"bar">["scales"]["y"] = {
    ticks: {
      crossAlign: "far",
      callback: formatYLabel,
      precision: 0,
      stepSize: 1,
      max: 100,
    },
    beginAtZero: true,
  };

  return {
    type: "bar",
    data: {
      labels: props.items.map((item) => item.label),
      datasets: [
        {
          label: props.orderLabel,
          data: props.items.map((item) => item.allocated),
          backgroundColor: props.orderColor,
          ...datasetStyle,
        },
        {
          label: props.productLabel,
          data: props.items.map((item) => item.booked),
          backgroundColor: props.productColor,
          ...datasetStyle,
        },
      ],
    },
    options: {
      events: ["hover"],
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: yOptions,
      },
      plugins: {
        tooltip: {
          enabled: false,
          padding: 10,
          backgroundColor: "#DFDFFF",
          displayColors: false,
          callbacks: {
            title: () => "",
            label: (context) => {
              const label = context.dataset.label || "";
              if (context.parsed.y !== null) {
                return `${label}: ${context.parsed.y}`;
              }
              return label;
            },
            labelTextColor: () => "#282828",
          },
        },
        legend: false,
      },
    },
  };
});

const formatYLabel = (value: number | string) => {
  return formatCurrency(Number(value));
};

const renderChart = () => {
  if (!barChart.value) return;

  const ctx = barChart.value.getContext("2d");
  if (!ctx) return;

  const newChart = new Chart(ctx, chartConfig.value);

  newChart.canvas.addEventListener("mousemove", (e) => {
    crossLine(newChart, e);
  });
};

onMounted(() => {
  renderChart();
});
</script>

<style scoped>
.line-chart__wrapper {
  height: auto;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.label-container {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}
.chart-label {
  display: flex;
  align-items: center;
  gap: 0.313rem;
  font-size: 0.875rem;
}
.label-icon {
  width: 2.25rem;
  height: 0.5rem;
  border-radius: 0.5rem;
}
</style>
