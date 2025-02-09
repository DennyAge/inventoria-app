<template>
  <div>
    <div class="flex justify-between mb-6">
      <div class="flex items-center gap-5">
        <div class="flex items-center gap-2 text-sm">
          <div
            :style="`background: ${orderColor}`"
            class="w-2.5 h-2.5 rounded-full"
          />
          {{ orderLabel }}
        </div>
        <div class="flex items-center gap-2 text-sm">
          <div
            :style="`background: ${productColor}`"
            class="w-2.5 h-2.5 rounded-full"
          />
          {{ productLabel }}
        </div>
        <div class="flex items-center gap-2 text-sm">
          <div class="w-2.5 h-2.5 rounded-full bg-black" />
          Max sell
        </div>
      </div>
    </div>
    <div class="h-auto">
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
