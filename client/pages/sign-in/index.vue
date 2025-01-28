<template>
  <div class="sign-in-page">
    <div class="sign-in-page__header">
      <h1>Sign in to Inventoria</h1>
    </div>
    <form class="sign-in-page__form" @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model="form.email"
          type="email"
          class="form-control"
          id="email"
          aria-describedby="email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="form.password"
          type="password"
          class="form-control"
          id="password"
        />
      </div>
      <div class="error-message">
        {{ errorMessage }}
      </div>
      <button
        v-if="isLoading"
        class="btn btn-primary d-flex align-items-center justify-content-center gap-2"
        type="button"
        disabled
      >
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        <span class="sr-only">Loading...</span>
      </button>
      <button v-else type="submit" class="btn btn-primary">Sign In</button>
    </form>
    <p>Don't have account? <a href="/sign-up">Sign Up</a></p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";

definePageMeta({
  layout: "auth",
});
useHead({
  title: "Sign-In",
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/logo.png",
    },
  ],
});
const authStore = useAuthStore();
const form = reactive({
  email: "",
  password: "",
});
const errorMessage = ref<string>("");
const router = useRouter();
const isLoading = ref(false);

const login = async () => {
  try {
    isLoading.value = true;
    await authStore.login(form).then(() => {
      router.push("/");
    });
  } catch (error: any) {
    errorMessage.value = error.gqlErrors[0].message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.sign-in-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.sign-in-page__header {
  text-align: center;
}
.sign-in-page__form {
  width: 100%;
  max-width: 18.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.error-message {
  text-align: center;
  font-size: 0.8rem;
  color: var(--color-semantic-red-100);
}
</style>
