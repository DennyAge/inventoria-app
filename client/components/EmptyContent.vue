<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <nuxt-img src="/images/empty.svg" alt="logo" class="w-2/6" />
    <h5 class="text-1xl text-gray-500">
      {{ title ? title : "" }}
    </h5>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  title?: string;
}>();
</script>
