<template>
  <div class="sign-in-page">
    <div class="sign-in-page__header">
      <h1>Sign in to Inventoria</h1>
    </div>
    <form class="sign-in-page__form" @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          v-model="email"
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
          v-model="password"
          type="password"
          class="form-control"
          id="password"
        />
      </div>
      <div class="error-message">
        {{ errorMessage }}
      </div>
      <button type="submit" class="btn btn-primary">Sign In</button>
    </form>
    <p>Don't have account? <a href="/sign-up">Sign Up</a></p>
  </div>
</template>

<script setup lang="ts">
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
import { useRouter } from "vue-router";

const email = ref<string>("");
const password = ref<string>("");
const errorMessage = ref<string>("");

const router = useRouter();

const login = async () => {
  try {
    await GqlLogin({
      input: { email: email.value, password: password.value },
    });
    router.push("/");
  } catch (error: any) {
    errorMessage.value = error.gqlErrors[0].message;
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
  max-width: 300px;
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
