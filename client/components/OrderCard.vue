<template>
  <transition name="slide-fade" mode="out-in">
    <ul
      class="w-full grid items-center grid-cols-[3fr_1fr_1fr_1fr_auto] gap-2.5 p-5 border border-neutral-200 shadow-md rounded-lg bg-white mb-4"
      v-if="!selectedOrder"
      key="full"
    >
      <li class="break-words text-sm lg:text-base">
        {{ order.title }}
      </li>
      <li class="flex items-center justify-center gap-3">
        <button
          class="flex items-center justify-center border border-neutral-200 rounded-full p-2 bg-transparent hover:bg-blue-100"
          @click="handleOpenOrderProducts"
        >
          <Icon name="ri:list-unordered" class="w-4 h-4 lg:w-6 lg:h-6" />
        </button>
        <div class="flex flex-col">
          <span class="text-base lg:text-xl">{{ products?.length }}</span>
          <span class="text-gray-400 text-sm lg:text-base">
            {{ $t("product") }}
          </span>
        </div>
      </li>
      <li class="flex flex-col items-center">
        <span class="text-gray-400 text-xs">
          {{ formatTimestampShort(order?.createdAt) }}
        </span>
        <span class="text-sm lg:text-base">
          {{ formatTimestampLong(order?.createdAt, locale) }}
        </span>
      </li>
      <li class="flex flex-col items-center">
        <span class="text-gray-400 text-xs">{{ totalPrice.USD }} $</span>
        <span class="text-sm lg:text-base">{{ totalPrice.UAH }} UAH</span>
      </li>
      <li class="flex flex-col items-center">
        <Button variant="icon" size="icon" @click="handleDeleteOrder(order)">
          <Icon name="ri:delete-bin-6-line" size="20" class="text-gray-400" />
        </Button>
      </li>
    </ul>

    <ul
      class="w-full max-w-[31.25rem] grid items-center grid-cols-[4fr_4fr_1fr] p-5 pr-0 border border-neutral-200 shadow-md rounded-lg bg-white mb-4"
      v-else
    >
      <li class="flex gap-2 items-center">
        <button
          class="flex items-center justify-center border border-neutral-200 rounded-full p-2 bg-transparent hover:bg-blue-100"
          @click="handleOpenOrderProducts"
        >
          <Icon name="ri:list-unordered" class="icon" size="25" />
        </button>
        <div class="flex flex-col text-sm lg:text-base">
          <span>{{ products?.length }}</span>
          <span>{{ $t("product") }}</span>
        </div>
      </li>
      <li class="flex flex-col items-center">
        <span class="text-xs text-gray-400">
          {{ formatTimestampShort(order?.createdAt) }}
        </span>
        <span class="text-sm lg:text-base">
          {{ formatTimestampLong(order?.createdAt, locale) }}
        </span>
      </li>
      <li v-if="selectedOrder._id === order._id">
        <Icon name="ri:arrow-right-wide-line" size="30" />
      </li>
    </ul>
  </transition>
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
import Button from "~/components/ui/Button.vue";
const { locale } = useI18n();

interface Props {
  order: Order;
}
const props = defineProps<Props>();
const emit = defineEmits(["delete-order"]);

const productsStore = useProductsStore();
const ordersStore = useOrdersStore();
const products = computed(() => {
  return productsStore.getProductsByIds(props.order.products);
});

const selectedOrder = computed(() => ordersStore.selectedOrder);
const totalPrice = computed(() => sumPricesByProduct(products.value));

const handleDeleteOrder = (order: Order) => {
  return emit("delete-order", order, "order");
};

const handleOpenOrderProducts = () => {
  ordersStore.setSelectedOrder(props.order);
  productsStore.setSelectedProducts(products.value);
};
</script>

<style scoped>
.slide-fade-leave-active {
  animation: slideFadeOut 0.3s ease;
}
.slide-fade-enter-active {
  animation: slideFadeIn 0.3s ease;
  animation-fill-mode: backwards;
}

@keyframes slideFadeOut {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
}

@keyframes slideFadeIn {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
