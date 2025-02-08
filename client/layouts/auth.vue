<template>
  <main v-if="!user" class="flex flex-col md:flex-row w-full h-dvh bg-gray-25">
    <div
      class="h-[30%] md:flex-1 md:h-full bg-auth bg-no-repeat bg-center bg-cover"
    >
      <div
        class="text-black flex items-center gap-2 text-2xl uppercase px-4 py-3 backdrop-blur-sm md:backdrop-blur-none"
      >
        <nuxt-img src="/logo.png" alt="logo" width="35px" />
        <span>Inventoria</span>
      </div>
    </div>
    <div class="flex items-center justify-center flex-1">
      <slot />
    </div>
  </main>
  <Loader v-else />
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/auth.store";
const router = useRouter();
const authStore = useAuthStore();

const user = computed(() => authStore.user);

onMounted(() => {
  try {
    authStore.loadUserFromLocalStorage();
    if (authStore.isAuth) {
      router.push("/");
    }
  } catch (error) {
    console.error("Failed get user:", error);
  }
});
</script>
