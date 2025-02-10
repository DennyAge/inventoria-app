<template>
  <button
    class="flex flex-row items-center justify-center border-none cursor-pointer bg-primary-100 hover:bg-primary-100/70 font-bold text-white w-10 h-10 rounded-full"
    @click="goToProfile"
  >
    {{ getInitials(user.fullName) || "IN" }}
  </button>
</template>

<script setup lang="ts">
//helpers
import { getInitials } from "~/lib/utils";
//types
import type { User } from "~/types.js";

interface Props {
  user: User;
}
defineProps<Props>();

const router = useRouter();
const localePath = useLocalePath();

const goToProfile = () => {
  router.push(localePath("/profile"));
};
</script>
