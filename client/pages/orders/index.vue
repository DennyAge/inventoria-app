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
      <div
        class="orders-page__body"
        :class="clsx({ 'body-flex': selectedOrder })"
      >
        <div
          class="orders-page__list"
          :class="clsx({ 'small-list': selectedOrder })"
          ref="componentTop"
        >
          <Spinner v-if="isLoading" />
          <div v-for="order in orders" :key="order?._id || order.title">
            <OrderCard :order="order" @delete-order="openDeleteModal" />
          </div>
        </div>
        <OrderProductsCard
          :order="selectedOrder"
          :products="selectedProducts"
          @delete-product="openDeleteModal"
          @close-product-card="closeOrderProductsCard"
          @add-product="addNewProduct"
        />
      </div>
    </div>
    <DeleteModal
      v-if="showDeleteModal"
      :title="
        deletedType === 'product'
          ? $t('deleteModalTitleProduct')
          : $t('deleteModalTitleOrder')
      "
      :data="modalData"
      @close="showDeleteModal = false"
      @submit="handleDelete"
    />
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
import type { Order, Product } from "~/types";
import { useOrdersStore } from "~/store/order.store";
import { useProductsStore } from "~/store/products.store";
const ordersStore = useOrdersStore();
const productsStore = useProductsStore();
import clsx from "clsx";

const isLoading = ref(true);
const orders = computed(() => ordersStore.orders);
const selectedOrder = computed(() => ordersStore.selectedOrder);
const selectedProducts = computed(() => productsStore.selectedProducts);
const showDeleteModal = ref(false);
const modalData = ref();
const deletedType = ref<string | null>(null);
const componentTop = ref<HTMLElement | null>(null);

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

watch(selectedOrder, async (newValue) => {
  if (newValue) {
    await nextTick();
    if (componentTop.value) {
      componentTop.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
});
const openDeleteModal = (data: Order | Product, type: string) => {
  showDeleteModal.value = true;
  modalData.value = data;
  deletedType.value = type;
};
const handleDelete = async (id: string) => {
  isLoading.value = true;
  if (deletedType.value === "order") {
    await ordersStore.deleteOrder(id);
  }
  if (deletedType.value === "product") {
    await productsStore.deleteProduct(id);
  }
  showDeleteModal.value = false;
  isLoading.value = false;
};
const closeOrderProductsCard = () => {
  ordersStore.setSelectedOrder(null);
  productsStore.setSelectedProducts(null);
};
const addNewOrder = () => {
  alert("Add new order!");
};
const addNewProduct = () => {
  alert("Add new product!");
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
.body-flex {
  display: flex;
  gap: 1rem;
}
.orders-page__list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.small-list {
  width: 50%;
}
</style>
