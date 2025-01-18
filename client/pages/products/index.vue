<template>
  <section>
    <Header show-input />
    <div class="products-page">
      <PageHeader :title="$t('coming')" count="26" add-btn />
    </div>
  </section>
</template>

<script setup lang="ts">
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
</script>

<style scoped>
.products-page {
  padding: 2rem 3rem;
}
</style>
