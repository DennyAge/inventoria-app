<template>
  <main v-if="user" class="w-full h-dvh flex flex-row">
    <SideBar :user="user" />
    <div
      class="flex flex-col flex-1 overflow-hidden w-page-content-sm md:w-page-content-md"
    >
      <slot />
    </div>
  </main>
  <Loader v-else />
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";
const router = useRouter();
const authStore = useAuthStore();

const user = computed(() => authStore.user);

const checkAuth = async () => {
  try {
    await authStore.loadUserFromLocalStorage();
    if (!authStore.isAuth) {
      await router.push("/sign-in");
    }
  } catch (error) {
    console.error("Failed get user:", error);
    await router.push("/sign-in");
  }
};

onMounted(checkAuth);
</script>
