<template>
  <table v-if="!selectedOrder" class="w-full">
    <tbody>
      <tr
        class="w-full grid items-center grid-cols-[3fr_1fr_1fr_1fr_auto] gap-2.5 p-5 border border-neutral-200 shadow-md rounded-lg bg-white mb-4 cursor-pointer hover:bg-primary-25"
        @click="handleOpenOrderProducts"
      >
        <td class="break-words text-sm lg:text-base">
          {{ order.title }}
        </td>
        <td class="flex items-center justify-center gap-3">
          <div class="flex flex-col">
            <span class="text-base">{{ products?.length }}</span>
            <span class="text-gray-400 text-xs lg:text-sm">
              {{ $t("product") }}
            </span>
          </div>
        </td>
        <td class="flex flex-col items-center text-nowrap">
          <span class="text-gray-400 text-xs">
            {{ formatTimestampShort(order?.createdAt) }}
          </span>
          <span class="text-sm lg:text-base">
            {{ formatTimestampLong(order?.createdAt, locale) }}
          </span>
        </td>
        <td class="flex flex-col items-center text-nowrap">
          <span class="text-gray-400 text-xs">{{ totalPrice.USD }} $</span>
          <span class="text-sm lg:text-base">{{ totalPrice.UAH }} ₴</span>
        </td>
        <td class="flex flex-col items-center">
          <Button
            variant="icon"
            size="icon"
            @click.stop="handleDeleteOrder(order)"
          >
            <Icon name="ri:delete-bin-6-line" size="20" class="text-gray-400" />
          </Button>
        </td>
      </tr>
    </tbody>
  </table>

  <table v-else class="w-full">
    <tbody>
      <tr
        @click="handleOpenOrderProducts"
        class="hidden max-w-[31.25rem] md:grid items-center grid-cols-[4fr_4fr_1fr] p-5 pr-0 border border-neutral-200 shadow-md rounded-lg mb-4 cursor-pointer hover:bg-primary-25"
        :class="selectedOrder._id === order._id ? 'bg-primary-25' : 'bg-white'"
      >
        <td class="flex gap-2 items-center">
          <div class="flex flex-col text-sm lg:text-base">
            <span class="text-base">{{ products?.length }}</span>
            <span class="text-gray-400 text-xs lg:text-sm">
              {{ $t("product") }}
            </span>
          </div>
        </td>
        <td class="flex flex-col items-center text-nowrap">
          <span class="text-xs text-gray-400">
            {{ formatTimestampShort(order?.createdAt) }}
          </span>
          <span class="text-sm lg:text-base">
            {{ formatTimestampLong(order?.createdAt, locale) }}
          </span>
        </td>
        <td v-if="selectedOrder._id === order._id">
          <Icon name="ri:arrow-right-wide-line" size="30" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
//types
import type { Order } from "~/types.js";
//helpers
import {
  formatTimestampLong,
  formatTimestampShort,
  sumPricesByProduct,
} from "~/lib/utils";

//store
import { useProductsStore } from "~/stores/products.store";
import { useOrdersStore } from "~/stores/order.store";
//components
import Button from "~/components/ui/Button.vue";

interface Props {
  order: Order;
}
const props = defineProps<Props>();
const emit = defineEmits(["delete-order"]);

const productsStore = useProductsStore();
const ordersStore = useOrdersStore();

//data
const { locale } = useI18n();
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
