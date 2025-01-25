<template>
  <ul class="product-card">
    <li class="text-break">
      {{ product.title }}
    </li>
    <li class="d-flex justify-content-center text-center">
      {{ product.type }}
    </li>
    <li class="d-flex align-items-center gap-2">
      <div class="d-flex flex-column">
        <div class="text-gray">{{ $t("from") }}</div>
        <span class="text-gray">{{ $t("to") }}</span>
      </div>
      <div class="d-flex flex-column">
        <span>{{ formatTimestampLong(product.guarantee.start, locale) }}</span>
        <span>{{ formatTimestampLong(product.guarantee.end, locale) }}</span>
      </div>
    </li>
    <li class="d-flex flex-column">
      <span class="text-sm">{{ product.price[0]?.value }} $</span>
      <span>{{ product.price[1]?.value }} UAH</span>
    </li>
    <li class="text-break">{{ order?.title }}</li>
    <li>
      <button @click="handleDeleteProduct(product)" class="remove-btn">
        <Icon name="ri:delete-bin-6-line" size="20" class="text-gray" />
      </button>
    </li>
  </ul>
</template>
<script setup lang="ts">
import type { Product } from "~/types";
import { useOrdersStore } from "~/store/order.store";
import { formatTimestampLong } from "~/lib/utils";

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
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 2fr 1.2fr 1fr 0.7fr 2fr auto;
  gap: 0.625rem;
  padding: 1.25rem;
  border: 0.063rem solid var(--color-neutral-grey-25);
  box-shadow: var(--main-shadow);
  border-radius: 0.5rem;
  background-color: var(--color-neutral-white);
  list-style: none;
}
.remove-btn {
  width: max-content;
  border: none;
  padding: 0;
  margin: 0;
  background: transparent;
}
</style>
