<template>
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
    </div>
  </div>
  <div class="h-auto">
    <canvas ref="barChart" id="lineChart"></canvas>
  </div>
</template>

<script lang="ts" setup>
//core
import { Chart, type ChartOptions } from "chart.js/auto";
//helpers
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
