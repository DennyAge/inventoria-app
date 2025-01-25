<template>
  <section>
    <Header />
    <div class="dashboard-page">
      <div class="dashboard-content">
        <div class="d-flex gap-4">
          <div class="content-block d-flex align-items-center">
            <PieChart :items="typesStatistics" :index="1" />
          </div>
          <div class="content-block">
            <TopListCard type="order" :data="orders" />
          </div>
          <div class="content-block">
            <TopListCard type="product" :data="products" />
          </div>
        </div>
        <div class="line-chart-section">
          <div class="content-block">
            <TwoSideBarChart :items="cityStatistics" />
          </div>
          <div class="content-block">
            <BarChart :items="sellStatistics" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BarChart from "~/components/charts/BarChart.vue";
import Header from "~/components/Header.vue";
import PieChart from "~/components/charts/PieChart.vue";
import PageHeader from "~/components/PageHeader.vue";
import TwoSideBarChart from "~/components/charts/TwoSideBarChart.vue";
import TopListCard from "~/components/TopListCard.vue";
import { typesStatistics, cityStatistics, sellStatistics } from "~/constants";

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

import { useOrdersStore } from "~/store/order.store";
import { useProductsStore } from "~/store/products.store";
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

<style scoped>
.dashboard-page {
  padding: 2rem;
}
.dashboard-content {
  height: calc(100vh - 7rem);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-x: auto;
}
.line-chart-section {
  display: flex;
  gap: 2rem;
}

.content-block {
  width: 100%;
  padding: 1rem 2rem;
  background: var(--color-neutral-white);
  border-radius: 1rem;
}
</style>
