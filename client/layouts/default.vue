<template>
  <main v-if="user" class="page-container">
    <SideBar :user="user" />
    <div class="page-content">
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

<style scoped>
.page-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
}
.page-content {
  display: flex;
  width: calc(100% - 16.5rem);
  flex: 1;
  flex-direction: column;
  overflow: hidden;
}
@media screen and (max-width: 900px) {
  .page-content {
    width: calc(100% - 6.5rem);
  }
}
</style>
