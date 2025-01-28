<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <h1 class="text-center">Sign in to Inventoria</h1>
    <form
      class="flex flex-col gap-1 w-full max-w-[18.75rem] mb-1"
      @submit.prevent="login"
    >
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
      <div class="text-center text-sm text-red-500">
        {{ errorMessage }}
      </div>
      <button
        v-if="isLoading"
        class="btn btn-primary d-flex align-items-center justify-content-center gap-2"
        type="button"
        disabled
      >
        <span
          class="spinner-border spinner-border-md"
          role="status"
          aria-hidden="true"
        ></span>
        <span class="sr-only">Loading...</span>
      </button>
      <button v-else type="submit" class="btn btn-primary">Sign In</button>
    </form>
    <p>Don`t have account? <a href="/sign-up">Sign Up</a></p>
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
