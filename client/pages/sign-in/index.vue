<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <h1 class="text-center text-4xl">Sign in to Inventoria</h1>
    <form
      class="flex flex-col gap-2 w-full max-w-[18.75rem] mb-1"
      @submit.prevent="login"
    >
      <CustomInput
        v-model="form.email"
        label="Email"
        placeholder="Email"
        type="email"
        name="email"
        id="email"
        required
      />

      <CustomInput
        v-model="form.password"
        label="Password"
        placeholder="Password"
        type="password"
        id="password"
        name="password"
        required
      />

      <div class="text-center text-sm text-red-500">
        {{ errorMessage }}
      </div>
      <Button type="submit" size="full">Sign In</Button>
    </form>
    <p>
      Don`t have account?
      <NuxtLink class="text-blue-600" href="/sign-up">Sign Up</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import Button from "~/components/ui/Button.vue";
import CustomInput from "~/components/ui/CustomInput.vue";

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
