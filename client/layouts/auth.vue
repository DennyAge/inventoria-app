<template>
  <main v-if="!user" class="auth-layout">
    <div class="auth-layout__left-side">
      <div class="logo">
        <Image src="/logo.png" alt="logo" width="35px" />
        <span>Inventoria</span>
      </div>
    </div>
    <div class="auth-layout__right-side">
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

onMounted(async () => {
  try {
    await authStore.loadUserFromLocalStorage();
    if (authStore.isAuth) {
      await router.push("/");
    }
  } catch (error) {
    console.error("Failed get user:", error);
  }
});
</script>

<style scoped>
.auth-layout {
  display: flex;
  height: 100vh;
  width: 100%;
}
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  text-transform: uppercase;
  padding: 1.5rem 2rem;
}
.auth-layout__left-side {
  flex: 1;
  background: url("/images/chris-lee-unsplash.jpg") no-repeat center/cover;
}
.auth-layout__right-side {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
