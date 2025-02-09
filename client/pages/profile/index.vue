<template>
  <section>
    <MainHeader />
    <div class="py-8 px-12">
      <Button @click="logout" type="button"> Logout </Button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import Button from "~/components/ui/Button.vue";

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

<style scoped></style>
