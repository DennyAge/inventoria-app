<template>
  <button
    class="flex flex-row items-center justify-center border-none cursor-pointer bg-primary-100 hover:bg-primary-100/70 text-sm md:text-base font-bold text-white w-8 md:w-10 h-8 md:h-10 rounded-full"
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
