<template>
  <div class="product-card">
    <div>
      {{ product.title }}
    </div>
    <div>
      {{ product.type }}
    </div>
    <div class="data">
      <span>
        с {{ formatTimestampLong(product.guarantee.start, locale) }}
      </span>
      <span> по {{ formatTimestampLong(product.guarantee.end, locale) }} </span>
    </div>
    <div class="data">
      <span>{{ product.price[0]?.value }} $</span>
      <span>{{ product.price[1]?.value }} UAH</span>
    </div>
    <div>{{ order?.title }}</div>
    <button @click="handleDeleteProduct(product)" class="remove-btn">
      <Icon name="ri:delete-bin-6-line" class="icon" />
    </button>
  </div>
</template>
<script setup lang="ts">
import type { Product } from "~/types";
import { useOrdersStore } from "~/store/order.store";
import { formatTimestampLong, formatTimestampShort } from "~/lib/utils";

interface Props {
  product: Product;
}
const props = defineProps<Props>();
const { locale } = useI18n();
const ordersStore = useOrdersStore();
const order = ordersStore.getOrderById(props.product.order);
const emit = defineEmits(["delete-product"]);

const handleDeleteProduct = (product: Product) => {
  emit("delete-product", product);
};
</script>

<style scoped>
.product-card {
  display: grid;
  align-items: center;
  grid-template-columns: 2fr 1fr 1fr 1fr 2fr auto;
  gap: 10px;
  padding: 20px;
  border: 1px solid var(--color-neutral-grey-25);
  border-radius: 4px;
}
.data {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.remove-btn {
  width: max-content;
  border: none;
  padding: 0;
  margin: 0;
  background: transparent;
}
</style>
