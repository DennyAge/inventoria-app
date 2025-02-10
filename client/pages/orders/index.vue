<template>
  <section>
    <MainHeader show-input @filter="filteredByInput" />
    <div class="p-4 md:p-8">
      <PageHeader
        :title="$t('orders')"
        :count="filteredOrders?.length"
        add-btn
        :on-click="() => (showAddOrderModal = true)"
      />
      <EmptyContent
        v-if="filteredOrders.length <= 0"
        :title="$t('ordersEmpty')"
      />
      <div
        v-else
        class="h-[calc(100vh-14rem)] overflow-scroll"
        :class="{ 'flex gap-4': selectedOrder }"
      >
        <div
          class="flex flex-col"
          :class="{ 'md:w-1/2': selectedOrder }"
          ref="componentTop"
        >
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
        <span class="break-words">{{ deleteData?.title }}</span>
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
//types
import type {
  CreateProductInput,
  Order,
  OrderInput,
  Product,
} from "~/types.js";
//components
import MainHeader from "~/components/MainHeader.vue";
//store
import { useOrdersStore } from "~/stores/order.store";
import { useProductsStore } from "~/stores/products.store";
import { useLoadingStore } from "~/stores/loading.store.js";

const ordersStore = useOrdersStore();
const productsStore = useProductsStore();
const loadingStore = useLoadingStore();

//data
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
  loadingStore.setLoading(true);
  ordersStore.setSelectedOrder(null);
  productsStore.setSelectedProducts(null);
  try {
    if (orders.value.length === 0) {
      await productsStore.getProducts();
      await ordersStore.getOrders();
    }
    filteredOrders.value = orders.value;
  } finally {
    loadingStore.setLoading(false);
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
    loadingStore.setLoading(true);
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
    filteredOrders.value = orders.value;
    loadingStore.setLoading(false);
  }
};
const closeOrderProductsCard = () => {
  ordersStore.setSelectedOrder(null);
  productsStore.setSelectedProducts(null);
};

const handleAddOrder = async (input: OrderInput) => {
  try {
    loadingStore.setLoading(true);
    await ordersStore.createOrder(input);
  } catch (error) {
    console.error(error);
  } finally {
    showAddOrderModal.value = false;
    filteredOrders.value = orders.value;
    loadingStore.setLoading(false);
  }
};
const handleAddProduct = async (input: CreateProductInput) => {
  console.log(input);
  try {
    loadingStore.setLoading(true);
    await productsStore.createProduct(input);
  } catch (error) {
    console.error(error);
  } finally {
    showAddProductModal.value = false;
    loadingStore.setLoading(false);
  }
};
const filteredByInput = (value: string) => {
  filteredOrders.value = orders.value.filter((order) =>
    order.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
  );
};
</script>
