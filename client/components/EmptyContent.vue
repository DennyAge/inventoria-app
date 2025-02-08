<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <Image src="/images/empty.svg" alt="logo" width="500px" />
    <h5 class="text-2xl text-gray-500">{{ title }}</h5>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  title?: string;
}>();
</script>
