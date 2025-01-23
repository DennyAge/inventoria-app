<template>
  <div class="small-order-card" v-if="selectedOrder">
    <div class="flex">
      <button class="product-btn" @click="handleOpenOrderProducts">
        <Icon name="ri:list-unordered" class="icon" />
      </button>
      <div>
        <span>{{ products?.length }}</span>
        <span>products</span>
      </div>
    </div>
    <div class="data">
      <span>
        {{ formatTimestampShort(order?.createdAt) }}
      </span>
      <span>
        {{ formatTimestampLong(order?.createdAt, locale) }}
      </span>
    </div>
    <div v-if="selectedOrder._id === order._id">
      <Icon name="ri:arrow-right-wide-line" class="icon" />
    </div>
  </div>
  <div class="order-card" v-else>
    <div>
      {{ order.title }}
    </div>
    <div class="data">
      <span>
        {{ formatTimestampShort(order?.createdAt) }}
      </span>
      <span>
        {{ formatTimestampLong(order?.createdAt, locale) }}
      </span>
    </div>
    <div class="flex">
      <button class="product-btn" @click="handleOpenOrderProducts">
        <Icon name="ri:list-unordered" />
      </button>
      {{ products?.length }}
    </div>
    <div class="data">
      <span>{{ totalPrice.USD }} $</span>
      <span>{{ totalPrice.UAH }} UAH</span>
    </div>
    <button @click="handleDeleteOrder(order)" class="remove-btn">
      <Icon name="ri:delete-bin-6-line" class="icon" />
    </button>
  </div>
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
  grid-template-columns: 40% 25% 10% 20% 5%;
  padding: 20px;
  border: 1px solid var(--color-neutral-grey-75);
  border-radius: 8px;
  background-color: var(--color-neutral-white);
}
.flex {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.data {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-neutral-grey-25);
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
  max-width: 500px;
  display: grid;
  align-items: center;
  grid-template-columns: 4fr 5fr 1fr;
  padding: 20px;
  border: 1px solid var(--color-neutral-grey-75);
  border-radius: 8px;
  background-color: var(--color-neutral-white);
}
.icon {
  font-size: 2rem;
}
</style>
