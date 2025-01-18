<template>
  <div class="sign-in">Sign Up</div>
</template>

<script setup lang="ts">
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
</script>

<style scoped>
.sign-in {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
