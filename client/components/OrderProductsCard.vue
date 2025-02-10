<template>
  <div
    v-if="products"
    class="w-full h-max border border-gray-200 rounded-lg bg-white shadow-sm animate-slide-left"
    :key="order?._id"
  >
    <div class="flex flex-col gap-4 py-5 px-7">
      <div class="flex justify-between gap-5">
        <h6 class="break-words text-xl">{{ order?.title }}</h6>
        <Button
          type="button"
          variant="icon"
          size="icon"
          @click="closeProductsCard"
        >
          <Icon name="ri:close-large-fill" />
        </Button>
      </div>
      <Button @click="handleAddProduct" type="button">
        + {{ $t("addNewProduct") }}
      </Button>
    </div>
    <div v-if="products?.length">
      <ul
        v-for="product in products"
        :key="product?._id || product.title"
        class="grid items-center grid-cols-[0.5fr_3fr_2fr_auto] gap-2.5 border-t border-neutral-400 p-2.5 px-7 m-0"
      >
        <li>
          <nuxt-img
            :src="
              product.photo?.length > 0
                ? `${product.photo[0]}`
                : '/images/devices.svg'
            "
            :alt="product.title"
            width="50px"
          />
        </li>
        <li class="flex flex-col">
          <span class="break-words">
            {{ product.title }}
          </span>
          <span class="text-xs text-gray-400">{{ product.serialNumber }}</span>
        </li>
        <li>{{ product.type }}</li>
        <li>
          <Button
            @click="handleDeleteProduct(product)"
            size="icon"
            variant="icon"
          >
            <Icon name="ri:delete-bin-6-line" size="20" class="text-gray-400" />
          </Button>
        </li>
      </ul>
    </div>
    <div v-else class="flex flex-col items-center justify-center">
      <nuxt-img src="/images/empty.svg" alt="logo" width="200px" />
    </div>
  </div>
</template>

<script setup lang="ts">
//types
import type { Product, Order } from "~/types.js";
//components
import Button from "~/components/ui/Button.vue";

interface Props {
  products: Product[] | null;
  order: Order | null;
}
defineProps<Props>();

const emit = defineEmits([
  "delete-product",
  "add-product",
  "close-product-card",
]);

const handleDeleteProduct = (product: Product) => {
  emit("delete-product", product, "product");
};
const handleAddProduct = () => {
  emit("add-product");
};
const closeProductsCard = () => {
  emit("close-product-card");
};
</script>
