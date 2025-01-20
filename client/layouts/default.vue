<template>
  <main v-if="authUser" class="page-container">
    <Sidebar :user="authUser" />
    <div class="page-content">
      <slot />
    </div>
  </main>
  <Loader v-else />
</template>

<script setup lang="ts">
import Sidebar from "~/components/Sidebar.vue";
import Loader from "~/components/Loader.vue";

import { useRouter } from "vue-router";
import { onMounted } from "vue";

const { authUser } = await GqlGetAuthUser();
const router = useRouter();

onMounted(() => {
  if (!authUser) {
    router.push("/sign-in");
  }
});
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
}
@media screen and (max-width: 900px) {
  .page-content {
    width: calc(100% - 6.5rem);
  }
}
</style>
