<template>
  <main v-if="user" class="w-full h-dvh flex flex-row">
    <Loader v-if="isLoading" />
    <SideBar :user="user" />
    <div
      class="flex flex-col flex-1 overflow-hidden w-page-content-sm md:w-page-content-md"
    >
      <slot />
    </div>
  </main>
  <MainLoader v-else />
</template>

<script setup lang="ts">
//components
import MainLoader from "~/components/MainLoader.vue";
import Loader from "~/components/ui/Loader.vue";
//store
import { useAuthStore } from "~/stores/auth.store";
import { useLoadingStore } from "~/stores/loading.store.js";

const router = useRouter();
const authStore = useAuthStore();
const loadingStore = useLoadingStore();

//data
const user = computed(() => authStore.user);
const isLoading = computed(() => loadingStore.isLoading);

const checkAuth = async () => {
  try {
    authStore.loadUserFromLocalStorage();
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
