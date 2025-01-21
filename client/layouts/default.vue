<template>
  <main v-if="user" class="page-container">
    <Sidebar :user="user" />
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
import type { User } from "~/types";
const user = ref<User | null>(null);
const router = useRouter();

onMounted(async () => {
  try {
    const { authUser } = await GqlGetAuthUser();
    if (!authUser) {
      await router.push("/sign-in");
    } else {
      user.value = authUser;
    }
  } catch (err) {
    console.log(err);
    await router.push("/sign-in");
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
