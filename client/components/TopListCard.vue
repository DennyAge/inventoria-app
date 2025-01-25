<template>
  <div class="top-list-card">
    <div class="top-list-card__header">
      <h3>{{ type === "order" ? "Top Orders:" : "Top Products:" }}</h3>
    </div>
    <div v-if="type === 'order'" class="top-list-card__body">
      <ul
        v-for="item in randomData"
        :key="item?._id || item.title"
        class="top-list-card__list"
      >
        <li>
          <Image src="/images/order.svg" alt="order" width="50px" />
        </li>
        <li class="text-break">
          {{ item.title }}
        </li>
        <li>Products : {{ item.products.length }}</li>
      </ul>
    </div>
    <div v-if="type === 'product'" class="top-list-card__body">
      <ul
        v-for="item in randomData"
        :key="item?._id || item.title"
        class="top-list-card__list"
      >
        <li>
          <Image
            :src="`/images/${item.photo}`"
            :alt="item.title"
            width="50px"
          />
        </li>
        <li class="text-break">
          {{ item.title }}
        </li>
        <li>{{ item.type }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, Order } from "~/types";
interface Props {
  data: Product[] | Order[] | null;
  type: string;
}

const props = defineProps<Props>();

//TODO: create BE functional for top order/products
const randomData = computed(() => {
  if (!props.data) return null;

  if (props.data.length <= 3) return props.data;
  const shuffled = [...props.data].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
});
</script>

<style scoped>
.top-list-card {
}
.top-list-card__header {
  border-bottom: 0.063rem solid var(--color-neutral-grey-75);
}
.top-list-card__body {
}
.top-list-card__list {
  display: grid;
  align-items: center;
  grid-template-columns: 0.5fr 2fr 1.5fr;
  gap: 1rem;
  list-style: none;
}
.top-list-card__list {
  padding: 0.625rem 0;
  margin: 1.25rem 0;
  border-bottom: 1px solid var(--color-neutral-grey-75);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-2.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.top-list-card__body {
  animation: slideDown 0.5s ease;
}
</style>
