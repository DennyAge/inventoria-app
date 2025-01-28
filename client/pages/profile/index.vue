<template>
  <section>
    <TopMenu />
    <div class="orders-page">
      <button @click="logout" type="button" class="btn btn-success">
        Logout
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";

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
const authStore = useAuthStore();
const logout = async () => {
  try {
    await authStore.logout().then(() => {
      router.push("/sign-in");
    });
  } catch (error: any) {
    console.error(error);
  }
};
</script>

<style scoped>
.orders-page {
  padding: 2rem 3rem;
}
</style>
