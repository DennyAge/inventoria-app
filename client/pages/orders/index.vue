<template>
  <section>
    <Header show-input />
    <div class="orders-page">
      <PageHeader
        :title="$t('coming')"
        count="26"
        add-btn
        :on-click="handleClick"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
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
import Header from "~/components/Header.vue";
import PageHeader from "~/components/PageHeader.vue";
const handleClick = () => {
  console.log(111);
};
</script>

<style scoped>
.orders-page {
  padding: 2rem 3rem;
}
</style>
