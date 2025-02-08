<template>
  <ul
    class="w-full grid items-center grid-cols-[2fr_1.2fr_1fr_0.7fr_2fr_auto] gap-2.5 p-5 border border-neutral-200 shadow-sm rounded-lg bg-white mb-4"
  >
    <li class="truncate lg:overflow-visible lg:whitespace-normal break-words">
      <NuxtLink
        :to="localePath(`/products/${product._id}`)"
        class="underline cursor-pointer text-sm lg:text-base"
        >{{ product.title }}</NuxtLink
      >
    </li>
    <li class="flex justify-between text-center text-sm lg:text-base">
      {{ product.type }}
    </li>
    <li class="flex items-center gap-2">
      <div class="flex flex-col gap-2 mt-1 text-gray-400 text-xs lg:text-sm">
        <div>{{ $t("from") }}</div>
        <div>{{ $t("to") }}</div>
      </div>
      <div class="flex flex-col text-nowrap text-sm lg:text-base">
        <span>{{ formatTimestampLong(product.guarantee.start, locale) }}</span>
        <span>{{ formatTimestampLong(product.guarantee.end, locale) }}</span>
      </div>
    </li>
    <li class="flex flex-col text-nowrap">
      <span class="text-xs">{{ product.price[0]?.value }} $</span>
      <span class="text-sm lg:text-base"
        >{{ product.price[1]?.value }} UAH</span
      >
    </li>
    <li class="truncate md:break-words text-sm lg:text-base">
      {{ order?.title }}
    </li>
    <li>
      <Button @click="handleDeleteProduct(product)" variant="icon" size="icon">
        <Icon name="ri:delete-bin-6-line" size="20" class="text-gray-400" />
      </Button>
    </li>
  </ul>
</template>
<script setup lang="ts">
import type { Product } from "~/types";
import { useOrdersStore } from "~/store/order.store";
import { formatTimestampLong } from "~/lib/utils";
const { locale } = useI18n();

interface Props {
  product: Product;
}

const props = defineProps<Props>();
const emit = defineEmits(["delete-product"]);

const ordersStore = useOrdersStore();
const order = ordersStore.getOrderById(props.product.order);
const localePath = useLocalePath();
const handleDeleteProduct = (product: Product) => {
  emit("delete-product", product);
};
</script>
