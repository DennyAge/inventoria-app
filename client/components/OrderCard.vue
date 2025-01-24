<template>
  <ul class="small-order-card" v-if="selectedOrder">
    <li class="d-flex gap-3">
      <button class="product-btn" @click="handleOpenOrderProducts">
        <Icon name="ri:list-unordered" class="icon" size="25" />
      </button>
      <div class="d-flex flex-column">
        <span>{{ products?.length }}</span>
        <span>{{ $t("product") }}</span>
      </div>
    </li>
    <li class="d-flex flex-column align-items-center">
      <span class="text-sm text-gray">
        {{ formatTimestampShort(order?.createdAt) }}
      </span>
      <span>
        {{ formatTimestampLong(order?.createdAt, locale) }}
      </span>
    </li>
    <li v-if="selectedOrder._id === order._id">
      <Icon name="ri:arrow-right-wide-line" size="30" />
    </li>
  </ul>

  <ul class="order-card" v-else>
    <li class="text-break">
      {{ order.title }}
    </li>
    <li class="d-flex align-items-center justify-content-center gap-3">
      <button class="product-btn" @click="handleOpenOrderProducts">
        <Icon name="ri:list-unordered" size="25" />
      </button>
      <div class="d-flex flex-column">
        <span class="fs-5">{{ products?.length }}</span>
        <span class="text-gray">{{ $t("product") }}</span>
      </div>
    </li>
    <li class="d-flex flex-column align-items-center">
      <span class="text-gray text-sm">
        {{ formatTimestampShort(order?.createdAt) }}
      </span>
      <span>
        {{ formatTimestampLong(order?.createdAt, locale) }}
      </span>
    </li>
    <li class="d-flex flex-column align-items-center">
      <span class="text-gray text-sm">{{ totalPrice.USD }} $</span>
      <span>{{ totalPrice.UAH }} UAH</span>
    </li>
    <li class="d-flex flex-column align-items-center">
      <button @click="handleDeleteOrder(order)" class="remove-btn">
        <Icon name="ri:delete-bin-6-line" size="20" class="text-gray" />
      </button>
    </li>
  </ul>
</template>
<script setup lang="ts">
import type { Order } from "~/types";
import {
  formatTimestampLong,
  formatTimestampShort,
  sumPricesByProduct,
} from "~/lib/utils";
import { useProductsStore } from "~/store/products.store";
import { useOrdersStore } from "~/store/order.store";
const { locale } = useI18n();

interface Props {
  order: Order;
}
const props = defineProps<Props>();
const productsStore = useProductsStore();
const ordersStore = useOrdersStore();
const products = productsStore.getProductsByIds(props.order.products);
const selectedOrder = computed(() => ordersStore.selectedOrder);
const emit = defineEmits(["delete-order"]);

const totalPrice = sumPricesByProduct(products);

const handleDeleteOrder = (order: Order) => {
  return emit("delete-order", order, "order");
};
const handleOpenOrderProducts = () => {
  ordersStore.setSelectedOrder(props.order);
  productsStore.setSelectedProducts(products);
};
</script>

<style scoped>
.order-card {
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 3fr 1fr 1fr 1fr auto;
  gap: 0.625rem;
  padding: 1.25rem;
  border: 0.063rem solid var(--color-neutral-grey-75);
  border-radius: 0.5rem;
  background-color: var(--color-neutral-white);
  list-style: none;
}
.product-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.063rem solid var(--color-neutral-grey-25);
  border-radius: 50%;
  padding: 0.5rem;
  background: transparent;
}
.product-btn:hover {
  background-color: var(--color-accent-blue-25);
}
.remove-btn {
  width: max-content;
  border: none;
  padding: 0;
  margin: 0;
  background: transparent;
}
.small-order-card {
  width: 100%;
  max-width: 31.25rem;
  display: grid;
  align-items: center;
  grid-template-columns: 4fr 4fr 1fr;
  padding: 1.25rem 0 1.25rem 1.25rem;
  border: 0.063rem solid var(--color-neutral-grey-75);
  border-radius: 0.5rem;
  background-color: var(--color-neutral-white);
  list-style: none;
}
</style>
