<template>
  <section>
    <MainHeader show-input @filter="filteredByInput" />
    <div class="orders-page">
      <PageHeader
        :title="$t('orders')"
        :count="orders?.length"
        add-btn
        :on-click="() => (showAddOrderModal = true)"
      />
      <EmptyContent
        v-if="filteredOrders.length <= 0"
        :title="$t('ordersEmpty')"
      />
      <div
        v-else
        class="orders-page__body"
        :class="{ 'body-flex': selectedOrder }"
      >
        <div
          class="orders-page__list"
          :class="{ 'small-list': selectedOrder }"
          ref="componentTop"
        >
          <Spinner v-if="isLoading" />
          <div v-for="order in filteredOrders" :key="order?._id || order.title">
            <OrderCard :order="order" @delete-order="openDeleteModal" />
          </div>
        </div>
        <OrderProductsCard
          :order="selectedOrder"
          :products="selectedProducts"
          @delete-product="openDeleteModal"
          @close-product-card="closeOrderProductsCard"
          @add-product="showAddProductModal = true"
        />
      </div>
    </div>
    <Modal
      v-if="showDeleteModal"
      :title="
        deletedType === 'product'
          ? $t('deleteModalTitleProduct')
          : $t('deleteModalTitleOrder')
      "
      :btn-text="$t('delete')"
      @close="showDeleteModal = false"
      @submit="handleDelete"
    >
      <div>
        <span class="text-break">{{ deleteData?.title }}</span>
      </div>
    </Modal>
    <Modal
      v-if="showAddOrderModal"
      :title="$t('addModalTitleOrder')"
      :btn-text="$t('save')"
      @close="showAddOrderModal = false"
      hidden-footer
    >
      <OrderForm @close="showAddOrderModal = false" @submit="handleAddOrder" />
    </Modal>
    <Modal
      v-if="showAddProductModal"
      :title="$t('addModalTitleProduct')"
      :btn-text="$t('save')"
      @close="showAddProductModal = false"
      hidden-footer
    >
      <ProductForm
        :orderId="selectedOrder?._id"
        @close="showAddProductModal = false"
        @submit="handleAddProduct"
        :is-loading="isLoading"
      />
    </Modal>
  </section>
</template>

<script setup lang="ts">
import EmptyContent from "~/components/EmptyContent.vue";

useHead({
  title: "Orders",
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/logo.png",
    },
  ],
});
import type { CreateProductInput, Order, OrderInput, Product } from "~/types";
import { useOrdersStore } from "~/store/order.store";
import { useProductsStore } from "~/store/products.store";
import MainHeader from "~/components/MainHeader.vue";
const ordersStore = useOrdersStore();
const productsStore = useProductsStore();

const isLoading = ref(true);
const orders = computed(() => ordersStore.orders);
const selectedOrder = computed(() => ordersStore.selectedOrder);
const selectedProducts = computed(() => productsStore.selectedProducts);
const showDeleteModal = ref(false);
const showAddOrderModal = ref(false);
const showAddProductModal = ref(false);
const deleteData = ref();
const deletedType = ref<string | null>(null);
const componentTop = ref<HTMLElement | null>(null);

const filteredOrders = ref<Order[]>([]);

onMounted(async () => {
  isLoading.value = true;
  ordersStore.setSelectedOrder(null);
  productsStore.setSelectedProducts(null);
  try {
    if (orders.value.length === 0) {
      await productsStore.getProducts();
      await ordersStore.getOrders();
    }
    filteredOrders.value = orders.value;
  } finally {
    isLoading.value = false;
  }
});

watch(selectedOrder, async (newValue) => {
  if (newValue) {
    await nextTick();
    if (componentTop.value) {
      componentTop.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }
});
const openDeleteModal = (data: Order | Product, type: string) => {
  showDeleteModal.value = true;
  deleteData.value = data;
  deletedType.value = type;
};
const handleDelete = async () => {
  const { _id } = deleteData.value;
  try {
    isLoading.value = true;
    if (deletedType.value === "order") {
      await ordersStore.deleteOrder(_id);
    }
    if (deletedType.value === "product") {
      await productsStore.deleteProduct(_id);
    }
  } catch (error) {
    console.error(error);
  } finally {
    showDeleteModal.value = false;
    isLoading.value = false;
    filteredOrders.value = orders.value;
  }
};
const closeOrderProductsCard = () => {
  ordersStore.setSelectedOrder(null);
  productsStore.setSelectedProducts(null);
};

const handleAddOrder = async (input: OrderInput) => {
  try {
    isLoading.value = true;
    await ordersStore.createOrder(input);
  } catch (error) {
    console.error(error);
  } finally {
    showAddOrderModal.value = false;
    isLoading.value = false;
    filteredOrders.value = orders.value;
  }
};
const handleAddProduct = async (input: CreateProductInput) => {
  try {
    isLoading.value = true;
    await productsStore.createProduct(input);
  } catch (error) {
    console.error(error);
  } finally {
    showAddProductModal.value = false;
    isLoading.value = false;
  }
};
const filteredByInput = (value: string) => {
  filteredOrders.value = orders.value.filter((order) =>
    order.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
  );
};
</script>

<style scoped>
.orders-page {
  padding: 2rem;
}
.orders-page__body {
  height: calc(100vh - 14rem);
  overflow: scroll;
  padding: 0 1rem 0 0;
}
.body-flex {
  display: flex;
  gap: 1rem;
}
.orders-page__list {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.small-list {
  width: 50%;
}
</style>
