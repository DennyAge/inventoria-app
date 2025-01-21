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
    <div>
      <button>Products</button>
      {{ productsByOrderId?.length }}
    </div>
    <div class="data">
      <span>{{ totalPrice.USD }} $</span>
      <span>{{ totalPrice.UAH }} UAH</span>
    </div>
    <button>Remove</button>
  </div>
</template>
<script setup lang="ts">
import type { Order } from "~/types";
import {
  formatTimestampLong,
  formatTimestampShort,
  sumPricesByProduct,
} from "~/lib/utils";

const { locale } = useI18n();

interface Props {
  order: Order;
}
const props = defineProps<Props>();

const { productsByOrderId } = await GqlGetProductsByOrderId({
  orderId: props.order._id,
});

const totalPrice = sumPricesByProduct(productsByOrderId);
</script>

<style scoped>
.order-card {
  display: grid;
  align-items: center;
  grid-template-columns: 40% 15% 10% 20% 10%;
  gap: 1rem;
  padding: 20px 40px;
  border: 1px solid var(--color-neutral-grey-25);
  border-radius: 4px;
}

.data {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
