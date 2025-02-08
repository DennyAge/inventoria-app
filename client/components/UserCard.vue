<template>
  <div
    class="w-max flex items-center p-1 lg:p-3 rounded-full border border-primary"
  >
    <button
      class="flex flex-row items-center justify-center border-none bg-primary-100 hover:bg-primary-100/70 font-bold text-white w-[3.125rem] h-[3.125rem] rounded-full"
      @click="goToProfile"
    >
      {{ getInitials(user.fullName) || "IN" }}
    </button>
    <div class="hidden lg:flex flex-col px-2">
      <span class="font-bold text-md m-0">{{ user.fullName }}</span>
      <span class="text-sm">{{ user.email }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getInitials } from "~/lib/utils";
import type { User } from "~/types";
const router = useRouter();
const localePath = useLocalePath();

const goToProfile = () => {
  router.push(localePath("/profile"));
};

interface Props {
  user: User;
}
defineProps<Props>();
</script>
