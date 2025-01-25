<template>
  <div>
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
        <div class="chart-label">
          <div class="rate-icon" />
          Max sell
        </div>
      </div>
    </div>
    <div class="line-chart__wrapper">
      <canvas id="lineChart" ref="barChart" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Chart, type ChartOptions } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ref, computed, onMounted } from "vue";
import { formatCurrency, crossLine } from "~/lib/utils";

interface ItemData {
  label: string;
  allocated: number;
  booked: number;
  rate: number;
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
  orderColor: "#DFECFF",
  productLabel: "Products",
  productColor: "#9CBEED",
});

const barChart = ref<HTMLCanvasElement | null>(null);

const chartConfig = computed(() => {
  const datasetStyle = {
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    barThickness: 30,
    borderRadius: 20,
  };

  const yOptions: ChartOptions<"bar">["scales"]["y"] = {
    ticks: {
      callback: formatYLabel,
      precision: 0,
    },
    beginAtZero: true,
  };

  const yTwoOptions: ChartOptions<"bar">["scales"]["y"] = {
    position: "right",
    type: "linear",
    grid: {
      display: false,
    },
    ticks: {
      callback: formatTwoYLabel,
      stepSize: 25,
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
          label: "Participation rate",
          type: "line",
          data: props.items.map((item) => item.rate),
          backgroundColor: "#282828",
          borderColor: "#282828",
          borderWidth: 2,
          pointRadius: 30,
          pointHoverBorderWidth: 2,
          pointHoverRadius: 30,
          pointStyle: "line",
          showLine: false,
          yAxisID: "y2",
          datalabels: {
            display: true,
          },
        },
        {
          label: props.orderLabel,
          data: props.items.map((item) => item.allocated),
          backgroundColor: props.orderColor,
          datalabels: {
            display: false,
          },
          ...datasetStyle,
        },
        {
          label: props.productLabel,
          data: props.items.map((item) => item.booked),
          backgroundColor: props.productColor,
          datalabels: {
            display: false,
          },
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
        y2: yTwoOptions,
      },
      plugins: {
        datalabels: {
          anchor: "center",
          align: "top",
          color: "#282828",
          font: {
            weight: "bold",
          },
          formatter: (value: number) => `${value} %`,
        },
        tooltip: {
          enabled: true,
          padding: 10,
          backgroundColor: "#DFDFFF",
          displayColors: false,
          callbacks: {
            title: () => "",
            label: (context) => {
              const label = context.dataset.label || "";
              const value = context.parsed.y || 0;
              return `${label}: ${value}`;
            },
          },
        },
        legend: false,
      },
    },
    plugins: [ChartDataLabels],
  };
});

const formatYLabel = (value: number | string) => {
  return formatCurrency(Number(value));
};

const formatTwoYLabel = (value: number | string) => {
  return `${value}%`;
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
  gap: 0.125rem;
  font-size: 0.875rem;
}
.label-icon {
  width: 2.25rem;
  height: 0.5rem;
  border-radius: 0.5rem;
}
.rate-icon {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background: var(--color-neutral-black);
}
</style>
