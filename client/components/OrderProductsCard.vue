<template>
  <div v-if="products" class="order-product-card" :key="order?._id">
    <div class="order-product-card__header">
      <div class="d-flex justify-content-between gap-5">
        <h6 class="text-break">{{ order?.title }}</h6>
        <CloseButton @click="closeProductsCard" />
      </div>
      <button
        @click="handleAddProduct"
        type="button"
        class="btn btn-success btn-sm"
      >
        + {{ $t("addNewProduct") }}
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
            :src="
              product.photo?.length > 0
                ? `${product.photo[0]}`
                : '/images/devices.svg'
            "
            :alt="product.title"
            width="50px"
          />
        </li>
        <li class="d-flex flex-column">
          <span class="text-break">
            {{ product.title }}
          </span>
          <span class="text-sm text-gray">{{ product.serialNumber }}</span>
        </li>
        <li>{{ product.type }}</li>
        <li>
          <button @click="handleDeleteProduct(product)" class="remove-btn">
            <Icon name="ri:delete-bin-6-line" size="20" class="text-gray" />
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

defineProps<Props>();
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
  border: 0.063rem solid var(--color-neutral-grey-25);
  box-shadow: var(--main-shadow);
  border-radius: 0.5rem;
  background-color: var(--color-neutral-white);

  animation: slideLeft 0.7s ease;
}
.order-product-card__header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem 1.875rem;
}

.order-product-card__list {
  display: grid;
  align-items: center;
  grid-template-columns: 0.5fr 3fr 2fr auto;
  gap: 0.625rem;
  border-top: 0.063rem solid var(--color-neutral-grey-75);
  padding: 0.625rem 1.875rem;
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

@keyframes slideLeft {
  from {
    opacity: 0;
    transform: translateX(-3rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
