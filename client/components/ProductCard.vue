<template>
  <div class="product-card">
    <div>
      {{ product.title }}
    </div>
    <div>
      {{ product.type }}
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Product } from "~/types";

interface Props {
  product: Product;
}
const props = defineProps<Props>();
</script>

<style scoped>
.product-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 20px 40px;
  border: 1px solid var(--color-neutral-grey-25);
  border-radius: 4px;
}
</style>
