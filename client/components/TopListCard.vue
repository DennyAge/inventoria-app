<template>
  <div class="w-full h-full">
    <div class="border-b border-gray-200 pb-2">
      <h3 class="text-xl font-bold">
        {{ type === "order" ? "Top Orders:" : "Top Products:" }}
      </h3>
    </div>
    <div v-if="data && data?.length > 0">
      <div v-if="type === 'order'" class="animate-slide-down">
        <ul
          v-for="item in randomData"
          :key="item?._id || item.title"
          class="grid items-center grid-cols-[0.5fr_2fr_1.5fr] gap-4 list-none py-2.5 my-5 border-b border-neutral-200"
        >
          <li>
            <nuxt-img src="/images/order.svg" alt="order" class="w-12" />
          </li>
          <li class="truncate" :title="item.title">
            {{ item.title }}
          </li>
          <li>Products : {{ item.products.length }}</li>
        </ul>
      </div>
      <div v-if="type === 'product'" class="animate-slide-down">
        <ul
          v-for="item in randomData"
          :key="item?._id || item.title"
          class="grid items-center grid-cols-[0.5fr_2fr_1.5fr] gap-4 list-none py-2.5 my-5 border-b border-neutral-200"
        >
          <li>
            <nuxt-img
              :src="
                item.photo?.length > 0
                  ? `${item.photo[0]}`
                  : '/images/devices.svg'
              "
              :alt="item.title"
              class="w-12"
            />
          </li>
          <li class="truncate" :title="item.title">
            {{ item.title }}
          </li>
          <li>{{ item.type }}</li>
        </ul>
      </div>
    </div>
    <div v-else class="flex items-center justify-center">
      <nuxt-img src="/images/empty.svg" alt="order" class="w-[150px]" />
    </div>
  </div>
</template>

<script setup lang="ts">
//types
import type { Product, Order } from "~/types.js";
interface Props {
  data: Product[] | Order[] | null;
  type: string;
}

const props = defineProps<Props>();

//data
//TODO: create BE functional for top order/products
const randomData = computed(() => {
  if (!props.data) return null;

  if (props.data.length <= 3) return props.data;
  const shuffled = [...props.data].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
});
</script>
