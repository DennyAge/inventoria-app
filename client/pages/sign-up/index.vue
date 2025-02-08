<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <h1 class="text-center text-4xl">Welcome to Inventoria</h1>
    <form
      class="flex flex-col gap-2 w-full max-w-[18.75rem] mb-1"
      @submit.prevent="register"
    >
      <CustomInput
        v-model="form.fullName"
        label="Full Name"
        placeholder="FullName"
        type="text"
        name="fullName"
        id="fullName"
        required
      />
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
      <Button type="submit" size="full">Sign Up</Button>
    </form>
    <p>
      Already have account?
      <NuxtLink class="text-blue-600" href="/sign-in">Sign In</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/store/auth.store";
import CustomInput from "~/components/ui/CustomInput.vue";
import Button from "~/components/ui/Button.vue";

definePageMeta({
  layout: "auth",
});
useHead({
  title: "Sign-Up",
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
  fullName: "",
  email: "",
  password: "",
});

const errorMessage = ref<string>("");
const router = useRouter();
const isLoading = ref(false);

const register = async () => {
  try {
    isLoading.value = true;
    await authStore
      .register(form)
      .then(
        async () =>
          await authStore.login({ email: form.email, password: form.password }),
      );
    router.push("/");
  } catch (error: any) {
    errorMessage.value = error.gqlErrors[0].message;
  } finally {
    isLoading.value = false;
  }
};
</script>
