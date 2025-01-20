<template>
  <div class="sign-un-page">
    <div class="sign-un-page__header">
      <h1>Welcome to Inventoria</h1>
    </div>
    <form class="sign-un-page__form" @submit.prevent="register">
      <div class="form-group">
        <label for="fullName">Full Name</label>
        <input
          v-model="fullName"
          type="text"
          class="form-control"
          id="fullName"
          aria-describedby="fullName"
          required
        />
      </div>
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
          required
        />
      </div>
      <div class="error-message">
        {{ errorMessage }}
      </div>
      <button type="submit" class="btn btn-primary">Sign Up</button>
    </form>
    <p>Already have account? <a href="/sign-in">Sign In</a></p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "#vue-router";

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

const fullName = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const errorMessage = ref<string>("");

const router = useRouter();

watch([fullName, email, password], () => {
  errorMessage.value = "";
});

const register = async () => {
  try {
    const res = await GqlRegister({
      input: {
        fullName: fullName.value,
        email: email.value,
        password: password.value,
      },
    });
    if (res?.signUp) {
      await GqlLogin({
        input: { email: email.value, password: password.value },
      });
      router.push("/");
    }
  } catch (error: any) {
    errorMessage.value = error.gqlErrors[0].message;
  }
};
</script>

<style scoped>
.sign-un-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.sign-un-page__header {
  text-align: center;
}
.sign-un-page__form {
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
