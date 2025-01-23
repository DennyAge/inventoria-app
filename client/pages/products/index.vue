<template>
  <section>
    <Header show-input />
    <div class="products-page">
      <PageHeader :title="$t('coming')" :count="products?.length" />
      <div class="products-page__body">
        <div class="products-page__list">
          <Spinner v-if="isLoading" />
          <div v-for="product in products" :key="product?._id || product.title">
            <ProductCard :product="product" @delete-product="openDeleteModal" />
          </div>
        </div>
      </div>
    </div>
    <DeleteModal
      v-if="showDeleteModal"
      :title="$t('deleteModalTitleProduct')"
      :data="modalData"
      @close="showDeleteModal = false"
      @submit="deleteProduct"
    />
  </section>
</template>

<script setup lang="ts">
import type { Product } from "~/types";

useHead({
  title: "Products",
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
const showDeleteModal = ref(false);
const modalData = ref();
const products = computed(() => productsStore.products);

onMounted(async () => {
  try {
    if (products.value.length === 0) {
      await ordersStore.getOrders();
      await productsStore.getProducts();
    }
  } finally {
    isLoading.value = false;
  }
});
const openDeleteModal = (product: Product) => {
  showDeleteModal.value = true;
  modalData.value = product;
};
const deleteProduct = async (productId: string) => {
  isLoading.value = true;
  await productsStore.deleteProduct(productId);
  showDeleteModal.value = false;
  isLoading.value = false;
};
</script>

<style scoped>
.products-page {
  padding: 2rem 3rem;
}
.products-page__body {
  height: calc(100vh - 14rem);
  overflow: scroll;
  padding: 0 1rem 0 0;
}
.products-page__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
