<template>
  <section>
    <Header />
    <div class="p-8">
      <div class="flex flex-col h-[calc(100vh - 7rem)] gap-8 overflow-x-auto">
        <div class="flex gap-4">
          <div class="w-full py-4 px-8 bg-white rounded-2xl flex items-center">
            <DoughnutChart :items="typesStatistics" :index="1" />
          </div>
          <div class="w-full py-4 px-8 bg-white rounded-2xl">
            <TopListCard type="order" :data="orders" />
          </div>
          <div class="w-full py-4 px-8 bg-white rounded-2xl">
            <TopListCard type="product" :data="products" />
          </div>
        </div>
        <div class="flex gap-8">
          <div class="w-full py-4 px-8 bg-white rounded-2xl">
            <TwoSideBarChart :items="cityStatistics" />
          </div>
          <div class="w-full py-4 px-8 bg-white rounded-2xl">
            <BarChart :items="sellStatistics" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BarChart from "~/components/charts/BarChart.vue";
import Header from "~/components/MainHeader.vue";
import DoughnutChart from "~/components/charts/DoughnutChart.vue";
import TwoSideBarChart from "~/components/charts/TwoSideBarChart.vue";
import TopListCard from "~/components/TopListCard.vue";
import { typesStatistics, cityStatistics, sellStatistics } from "~/constants";
import { useOrdersStore } from "~/store/order.store";
import { useProductsStore } from "~/store/products.store";

useHead({
  title: "Dashboard",
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/logo.png",
    },
  ],
});

const ordersStore = useOrdersStore();
const productsStore = useProductsStore();
const orders = computed(() => ordersStore.orders);
const products = computed(() => productsStore.products);

onMounted(async () => {
  try {
    if (orders.value.length === 0) {
      await productsStore.getProducts();
      await ordersStore.getOrders();
    }
  } finally {
  }
});
</script>
