<template>
  <section>
    <Header />
    <div class="orders-page">
      <button @click="logout" type="button" class="btn btn-success">
        Logout
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: "Profile",
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/logo.png",
    },
  ],
});
const router = useRouter();
const logout = async () => {
  await GqlLogout();
  router.push("/sign-in");
};
</script>

<style scoped>
.orders-page {
  padding: 2rem 3rem;
}
</style>
