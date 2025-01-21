<template>
  <section>
    <Header show-input />
    <div class="products-page">
      <PageHeader :title="$t('coming')" :count="products?.length" add-btn />
      <div class="products-page__body">
        <div class="products-page__list">
          <div v-for="product in products" :key="product?._id || product.title">
            <ProductCard :product="product" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCard from "~/components/ProductCard.vue";

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
import Header from "~/components/Header.vue";
import PageHeader from "~/components/PageHeader.vue";

const { products } = await GqlGetAllProducts();
</script>

<style scoped>
.products-page {
  padding: 2rem 3rem;
}
.products-page__body {
  height: calc(100vh - 14rem);
  overflow: scroll;
  padding: 0 1rem 0 0;
}
.products-page__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
