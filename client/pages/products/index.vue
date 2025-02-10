<template>
  <section>
    <MainHeader show-input @filter="filteredByInput" />
    <div class="w-full h-full p-4 md:p-8">
      <PageHeader
        :title="$t('product')"
        :count="filteredProducts?.length"
        filter
        @filter="filterProducts"
      />
      <EmptyContent
        v-if="filteredProducts.length <= 0"
        :title="$t('productEmpty')"
      />
      <div v-else class="h-[calc(100vh-14rem)] overflow-scroll">
        <div class="flex flex-col">
          <div
            v-for="product in filteredProducts"
            :key="product?._id || product.title"
          >
            <ProductCard :product="product" @delete-product="openDeleteModal" />
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-if="showDeleteModal"
      :title="$t('deleteModalTitleProduct')"
      :btn-text="$t('delete')"
      @close="showDeleteModal = false"
      @submit="deleteProduct"
    >
      <div>
        <span class="break-words">{{ deleteData?.title }}</span>
      </div>
    </Modal>
  </section>
</template>

<script setup lang="ts">
import type { Product } from "~/types.js";

useHead({
  title: "Products",
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/logo.png",
    },
  ],
});
//components
import EmptyContent from "~/components/EmptyContent.vue";
//store
import { useOrdersStore } from "~/stores/order.store";
import { useProductsStore } from "~/stores/products.store";
import { useLoadingStore } from "~/stores/loading.store.js";

const ordersStore = useOrdersStore();
const productsStore = useProductsStore();
const loadingStore = useLoadingStore();

//data
const showDeleteModal = ref(false);
const deleteData = ref();
const products = computed(() => productsStore.products);
const filteredProducts = ref<Product[]>([]);

onMounted(async () => {
  try {
    if (products.value.length === 0) {
      loadingStore.setLoading(true);
      await ordersStore.getOrders();
      await productsStore.getProducts();
    }
    filteredProducts.value = products.value;
  } catch (error) {
    console.error(error);
  } finally {
    loadingStore.setLoading(false);
  }
});

const openDeleteModal = (product: Product) => {
  showDeleteModal.value = true;
  deleteData.value = product;
};
const deleteProduct = async () => {
  const { _id } = deleteData.value;
  try {
    loadingStore.setLoading(true);
    await productsStore.deleteProduct(_id);
  } catch (error) {
    console.error(error);
  } finally {
    showDeleteModal.value = false;
    filteredProducts.value = products.value;
    loadingStore.setLoading(false);
  }
};
const filterProducts = (type: string) => {
  if (type === "All") {
    filteredProducts.value = products.value;
  } else {
    filteredProducts.value = products.value.filter(
      (product) => product.type === type,
    );
  }
};
const filteredByInput = (value: string) => {
  filteredProducts.value = products.value.filter((product) =>
    product.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
  );
};
</script>
