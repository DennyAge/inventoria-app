<template>
  <div class="empty-content">
    <Image src="/images/empty.svg" alt="logo" width="500px" />
    <h5 class="empty-content__title">{{ title }}</h5>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  title?: string;
}
const props = defineProps<Props>();
</script>
<style scoped>
.empty-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.empty-content__title {
  font-size: 1.5rem;
  color: var(--color-neutral-grey-100);
}
</style>
