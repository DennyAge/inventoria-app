<template>
  <div class="user" @click="">
    <button class="user__int" @click="router.push('/profile')">
      {{ getInitials(user.fullName) || "IN" }}
    </button>
    <div class="user__info">
      <p>{{ user.fullName }}</p>
      <span>{{ user.email }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getInitials } from "~/lib/utils";
import { useRouter } from "#vue-router";
import type { User } from "~/types";
const router = useRouter();

interface Props {
  user: User;
}
const props = defineProps<Props>();
</script>

<style scoped>
.user {
  width: max-content;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem;
  border-radius: 3.75rem;
  border: 0.063rem solid var(--color-accent-blue-100);
}
.user__int {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  justify-content: center;

  background: var(--color-accent-blue-100);
  color: var(--color-neutral-grey-10);
  font-weight: 700;
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 100%;
}
.user__info {
  display: flex;
  flex-direction: column;
}
.user__info p {
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
}
.user__info span {
  font-size: 0.8rem;
}

@media screen and (max-width: 900px) {
  .user {
    padding: 0.3rem;
  }
  .user__info {
    display: none;
  }
}
</style>
