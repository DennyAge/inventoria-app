<template>
  <div v-if="order" class="order-product-card">
    <div class="order-product-card__header">
      <div class="order-product-card__title">
        <h1>{{ order?.title }}</h1>
        <CloseButton @click="closeProductsCard" />
      </div>
      <button
        @click="handleAddProduct"
        type="button"
        class="btn btn-success btn-sm"
      >
        + Add new Products
      </button>
    </div>
    <div v-if="products?.length">
      <ul
        v-for="product in products"
        :key="product?._id || product.title"
        class="order-product-card__list"
      >
        <li>
          <Image
            :src="`/images/${product.photo}`"
            :alt="product.title"
            width="50px"
          />
        </li>
        <li class="flex">
          <span>{{ product.title }}</span>
          <span>{{ product.serialNumber }}</span>
        </li>
        <li>{{ product.type }}</li>
        <li>
          <button @click="handleDeleteProduct(product)" class="remove-btn">
            <Icon name="ri:delete-bin-6-line" class="icon" />
          </button>
        </li>
      </ul>
    </div>
    <div v-else class="order-product__empty-card">
      <Image src="/images/empty.svg" alt="logo" width="200px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, Order } from "~/types";
interface Props {
  products: Product[] | null;
  order: Order | null;
}
const props = defineProps<Props>();
const emit = defineEmits([
  "delete-product",
  "add-product",
  "close-product-card",
]);

const handleDeleteProduct = (product: Product) => {
  emit("delete-product", product, "product");
};
const handleAddProduct = () => {
  emit("add-product");
};
const closeProductsCard = () => {
  emit("close-product-card");
};
</script>

<style scoped>
.order-product-card {
  width: 100%;
  height: max-content;
  border: 1px solid var(--color-neutral-grey-75);
  border-radius: 8px;
  background-color: var(--color-neutral-white);
}
.order-product-card__header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 10px 30px;
}
.order-product-card__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.order-product-card__list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid var(--color-neutral-grey-75);
  padding: 10px 30px;
  list-style: none;
  margin: 0;
}
.remove-btn {
  width: max-content;
  border: none;
  padding: 0;
  margin: 0;
  background: transparent;
}
.btn {
  width: max-content;
}
.order-product__empty-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
