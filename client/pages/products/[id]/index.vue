<template>
  <section>
    <MainHeader />
    <div class="h-[calc(100vh-10rem)] px-8">
      <div class="flex items-center py-4">
        <NuxtLink
          to="/products"
          class="flex items-center justify-center gap-2 py-2 px-4 border rounded-lg border-gray-200 bg-white cursor-pointer hover:shadow-lg"
        >
          <Icon name="ri:arrow-left-line" />
          Back
        </NuxtLink>
      </div>
      <Spinner v-if="isLoading" />
      <div
        v-else
        class="w-full h-full flex py-8 bg-white overflow-auto rounded-2xl gap-4"
      >
        <div
          class="flex flex-col justify-between items-center flex-1 px-6 animate-slide-down border-r border-gray-200"
        >
          <div>
            <nuxt-img
              :src="selectedImage"
              :alt="product?.title"
              class="max-h-56"
            />
          </div>
          <div class="flex items-center gap-4">
            <div
              v-for="(image, index) in product?.photo"
              :key="index"
              class="cursor-pointer"
              @click="selectedImage = image"
            >
              <nuxt-img
                :src="`${image}`"
                :alt="product?.title"
                class="max-h-14"
              />
            </div>
          </div>
          <Map :locations="mockLocations" :zoom="12" />
        </div>
        <div
          class="flex flex-col justify-between flex-1 px-6 animate-slide-down"
        >
          <h3 class="break-words text-2xl font-semibold">
            {{ product?.title }}
          </h3>
          <ul class="list-none m-0 p-0 flex flex-col gap-4">
            <li class="flex gap-4">
              <b class="min-w-36">{{ $t("serialNumber") }}:</b>
              {{ product?.serialNumber }}
            </li>
            <li class="flex gap-4">
              <b class="min-w-36">{{ $t("type") }}:</b>
              {{ product?.type }}
            </li>
            <li class="flex gap-4">
              <b class="min-w-36">{{ $t("state") }}:</b>
              {{ product?.isUsed ? $t("new") : $t("used") }}
            </li>
            <li class="flex gap-4">
              <b class="min-w-36">{{ $t("specification") }}:</b>
              {{ product?.specification }}
            </li>
            <li class="flex gap-4">
              <b class="min-w-36">{{ $t("guarantee") }}:</b>
              <span>
                {{ formatTimestampLong(product?.guarantee?.start, locale) }}
                -
                {{ formatTimestampLong(product?.guarantee?.end, locale) }}
              </span>
            </li>
            <li class="flex gap-4">
              <b class="min-w-36">{{ $t("price") }}:</b>
              <span
                >{{ product?.price[1]?.value }} UAH /
                {{ product?.price[0]?.value }} $</span
              >
            </li>
            <li class="flex gap-4">
              <b class="min-w-36">{{ $t("createdAt") }}:</b>
              <span>{{ formatTimestampLong(product?.createdAt, locale) }}</span>
            </li>
          </ul>

          <div>
            <h5 class="mb-3 text-lg font-semibold">Order:</h5>
            <ul class="list-none m-0 p-0 flex flex-col gap-4">
              <li class="flex gap-4">
                <b class="min-w-36">{{ $t("title") }}:</b>
                <span class="break-words"> {{ order?.title }}</span>
              </li>
              <li class="flex gap-4">
                <b class="min-w-36">{{ $t("description") }}:</b>
                <span class="break-words">
                  {{ order?.description }}
                </span>
              </li>
            </ul>
          </div>
          <div class="flex items-center justify-end gap-4">
            <Button @click="showDeleteModal = true" variant="outline">
              {{ $t("delete") }}
            </Button>
            <Button
              class="btn btn-success"
              @click="showEditProductModal = true"
            >
              {{ $t("edit") }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <Modal
    v-if="showDeleteModal"
    :title="$t('deleteModalTitleProduct')"
    :btn-text="$t('delete')"
    @close="showDeleteModal = false"
    @submit="handleDelete"
  >
    <div>
      <span class="break-words">{{ product?.title }}</span>
    </div>
  </Modal>
  <Modal
    v-if="showEditProductModal"
    :title="$t('addModalTitleProduct')"
    :btn-text="$t('save')"
    @close="showEditProductModal = false"
    hidden-footer
  >
    <ProductForm
      @close="showEditProductModal = false"
      @submit="handleUpdateProduct"
      :product="product"
      edit-mode
    />
  </Modal>
</template>

<script setup lang="ts">
import { UpdateProductInput } from "~/types";

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
//stores
import { useProductsStore } from "~/stores/products.store";
import { useOrdersStore } from "~/stores/order.store";
//helpers
import { formatTimestampLong } from "~/lib/utils";
//TODO: change mock data to product data
import { mockLocations } from "~/constants";
//components
import Button from "~/components/ui/Button.vue";

const { locale } = useI18n();
const productsStore = useProductsStore();
const ordersStore = useOrdersStore();

const isLoading = ref(true);
const route = useRoute();
const router = useRouter();
const productId = route.params.id.toString();

const product = computed(() => productsStore.product);
const order = computed(() => ordersStore.order);
const selectedImage = ref<string | null>(null);
const localePath = useLocalePath();
const showDeleteModal = ref(false);
const showEditProductModal = ref(false);

onMounted(async () => {
  try {
    await productsStore.getProduct(productId);
    const orderId = product.value?.order;
    if (orderId) {
      await ordersStore.getOrder(orderId);
      selectedImage.value = product.value.photo[0];
    }
  } catch (error) {
    console.error(error);
    router.push(localePath("/products"));
  } finally {
    isLoading.value = false;
  }
});
const handleDelete = async () => {
  try {
    isLoading.value = true;
    await productsStore.deleteProduct(productId).then(() => {
      router.push(localePath("/products"));
    });
  } catch (error) {
    console.error(error);
  } finally {
    showDeleteModal.value = false;
    isLoading.value = false;
  }
};
const handleUpdateProduct = async (input: UpdateProductInput) => {
  try {
    isLoading.value = true;
    await productsStore.updateProduct(productId, input);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
    showEditProductModal.value = false;
  }
};
</script>
