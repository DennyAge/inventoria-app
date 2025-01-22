<template>
  <section>
    <Header show-input />
    <div class="orders-page">
      <PageHeader
        :title="$t('coming')"
        :count="orders?.length"
        add-btn
        :on-click="addNewOrder"
      />
      <div class="orders-page__body">
        <div class="orders-page__list">
          <Spinner v-if="isLoading" />
          <div v-for="order in orders" :key="order?._id || order.title">
            <OrderCard :order="order" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: "Orders",
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

const isLoading = ref(true);
const orders = computed(() => ordersStore.orders);

onMounted(async () => {
  try {
    if (orders.value.length === 0) {
      await productsStore.getProducts();
      await ordersStore.getOrders();
    }
  } finally {
    isLoading.value = false;
  }
});

const addNewOrder = () => {
  alert("Add new order!");
};
</script>

<style scoped>
.orders-page {
  padding: 2rem 3rem;
}
.orders-page__body {
  height: calc(100vh - 14rem);
  overflow: scroll;
  padding: 0 1rem 0 0;
}
.orders-page__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
