<template>
  <section>
    <TopMenu />
    <div class="product-page">
      <div class="product-page__header">
        <NuxtLink
          to="/products"
          class="btn btn-light d-flex align-items-center gap-1"
        >
          <Icon name="ri:arrow-left-line" size="20" />
          Back
        </NuxtLink>
      </div>
      <Spinner v-if="isLoading" />
      <div v-else class="product-page__content">
        <div class="content__left-side">
          <div class="d-flex align-items-center justify-content-center">
            <Image :src="selectedImage" :alt="product?.title" height="250px" />
          </div>
          <div class="image-selector">
            <div
              v-for="(image, index) in product?.photo"
              :key="index"
              class="image-selector__slide"
              @click="selectedImage = image"
            >
              <Image :src="`${image}`" :alt="product?.title" height="50px" />
            </div>
          </div>
          <div />
          <div>
            <Map :locations="mockLocations" :zoom="12" />
          </div>
        </div>
        <div class="content__right-side">
          <h3 class="text-break">{{ product?.title }}</h3>
          <ul class="product-details">
            <li>
              <b>{{ $t("serialNumber") }}:</b>
              {{ product?.serialNumber }}
            </li>
            <li>
              <b>{{ $t("type") }}:</b>
              {{ product?.type }}
            </li>
            <li>
              <b>{{ $t("state") }}:</b>
              {{ product?.isUsed ? $t("new") : $t("used") }}
            </li>
            <li>
              <b>{{ $t("specification") }}:</b>
              {{ product?.specification }}
            </li>
            <li>
              <b>{{ $t("guarantee") }}:</b>
              <span>
                {{ formatTimestampLong(product?.guarantee?.start, locale) }}
                -
                {{ formatTimestampLong(product?.guarantee?.end, locale) }}
              </span>
            </li>
            <li>
              <b>{{ $t("price") }}:</b>
              <span
                >{{ product?.price[1]?.value }} UAH /
                {{ product?.price[0]?.value }} $</span
              >
            </li>
            <li>
              <b>{{ $t("createdAt") }}:</b>
              <span>{{ formatTimestampLong(product?.createdAt, locale) }}</span>
            </li>
          </ul>

          <div>
            <h5 class="mb-3">Order:</h5>
            <ul class="product-details">
              <li>
                <b>{{ $t("title") }}:</b>
                <span class="text-break"> {{ order?.title }}</span>
              </li>
              <li>
                <b>{{ $t("description") }}:</b>
                <span class="text-break">
                  {{ order?.description }}
                </span>
              </li>
            </ul>
          </div>
          <div class="right-side__footer">
            <button class="btn btn-danger" @click="showDeleteModal = true">
              {{ $t("delete") }}
            </button>
            <button
              class="btn btn-success"
              @click="showEditProductModal = true"
            >
              {{ $t("edit") }}
            </button>
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
      <span class="text-break">{{ product?.title }}</span>
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
import { useProductsStore } from "~/store/products.store";
import { useOrdersStore } from "~/store/order.store";
import { formatTimestampLong } from "~/lib/utils";
//TODO: change mock data to product data
import { mockLocations } from "~/constants";
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

<style scoped>
.product-page {
  height: calc(100vh - 10rem);
  padding: 0 2rem;
}
.product-page__header {
  display: flex;
  align-items: center;
  padding: 1rem 0;
}
.product-page__content {
  width: 100%;
  height: 100%;
  padding: 2rem 0;
  background: var(--color-neutral-white);
  border-radius: 1rem;
  overflow: auto;

  display: flex;

  gap: 1rem;
}
.content__left-side {
  flex: 1;
  border-right: 0.1rem solid var(--color-neutral-grey-75);
  padding: 0 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  animation: slideDown 0.5s ease;
}
.content__right-side {
  flex: 1;
  padding: 0 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: slideDown 0.5s ease;
}

.product-details {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-details li {
  display: flex;
  gap: 1rem;
}

.product-details b {
  min-width: 150px;
  font-weight: bold;
}

.product-details span {
  flex: 1;
}
.right-side__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}
.image-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.image-selector__slide {
  cursor: pointer;
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
</style>
