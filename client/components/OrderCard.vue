<template>
  <div class="order-card">
    <div>
      {{ order.title }}
    </div>
    <div>
      {{ order.date }}
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Order } from "~/types";

interface Props {
  order: Order;
}
const props = defineProps<Props>();

const { productsByOrderId } = await GqlGetProductsByOrderId({
  orderId: props.order._id,
});
</script>

<style scoped>
.order-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 20px 40px;
  border: 1px solid var(--color-neutral-grey-25);
  border-radius: 4px;
}
</style>
