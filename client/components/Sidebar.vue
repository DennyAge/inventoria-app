<template>
  <div class="sidebar">
    <div>
      <div class="sidebar__logo">
        <Image src="/logo.png" alt="logo" width="35px" />
        <span class="sidebar__logo__title">Inventoria</span>
      </div>
      <nav class="nav">
        <NuxtLink
          v-for="link in navigationLinks"
          :key="link.name"
          :to="link.path"
          class="nav-link"
          active-class="active"
        >
          <Icon :name="link.icon" class="nav-link__icon" />
          <span class="nav-link__text">{{ $t(link.name) }}</span>
        </NuxtLink>
      </nav>
    </div>
    <div class="sidebar__footer">
      <UserCard v-if="user" :user="user" />
      <LanguageSelect />
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigationLinks } from "~/constants/index.js";
import type { User } from "~/types";

interface Props {
  user: User;
}
defineProps<Props>();
</script>

<style scoped>
.sidebar {
  width: 16.5rem;
  padding: 1.5rem 2rem;
  background: var(--color-accent-blue-25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--large-shadow);
}
.sidebar__logo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
}

.sidebar__logo__title {
  font-size: 1.5rem;
  text-transform: uppercase;
}
.nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-transform: uppercase;
  color: var(--color-neutral-black);
  border-radius: 0.5rem;
}
.nav-link:hover {
  background: var(--color-accent-blue-100);
  color: var(--color-neutral-white);
}
.nav-link__icon {
  color: var(--color-neutral-black);
}
.nav-link:hover .nav-link__icon {
  filter: invert(100%);
}
.active {
  background: var(--color-accent-blue-100);
  border-radius: 8px;
  color: var(--color-neutral-white);
}
.active .nav-link__icon {
  filter: invert(100%);
}
.sidebar__footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}
@media screen and (max-width: 1366px) {
  .sidebar {
    width: 6.5rem;
  }
  .nav-link__text,
  .sidebar__logo__title {
    display: none;
  }
  .nav-link__icon {
    font-size: 1.2rem;
  }
}
</style>
