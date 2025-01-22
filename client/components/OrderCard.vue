<template>
  <div class="order-card">
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
        <Icon name="ri:list-unordered" class="icon" />
      </button>
      {{ productsByOrderId?.length }}
    </div>
    <div class="data">
      <span>{{ totalPrice.USD }} $</span>
      <span>{{ totalPrice.UAH }} UAH</span>
    </div>
    <button @click="handleDeleteOrder(order._id)" class="remove-btn">
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
const { locale } = useI18n();

interface Props {
  order: Order;
}
const props = defineProps<Props>();

const { productsByOrderId } = await GqlGetProductsByOrderId({
  orderId: props.order._id,
});

const totalPrice = sumPricesByProduct(productsByOrderId);

const productsStore = useProductsStore();

const handleDeleteOrder = (orderId: string) => {
  console.log(orderId);
};
const handleOpenOrderProducts = () => {
  productsStore.setSelectedProducts(productsByOrderId);
};
</script>

<style scoped>
.order-card {
  display: grid;
  align-items: center;
  grid-template-columns: 40% 25% 5% 20% 5%;
  gap: 1rem;
  padding: 20px 40px;
  border: 1px solid var(--color-neutral-grey-25);
  border-radius: 4px;
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
.remove-btn {
  width: max-content;
  border: none;
  padding: 0;
  margin: 0;
  background: transparent;
}
</style>
