<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts"></script>

<style>
:root {
  /* neutral */
  --color-neutral-black: #000000;
  --color-neutral-dark: #1a051d;
  --color-neutral-grey-100: #838383;
  --color-neutral-grey-75: #d0c9d6;
  --color-neutral-grey-25: #ecebed;
  --color-neutral-grey-10: #f7f5f9;
  --color-neutral-white: #ffffff;

  /*Primary color */
  --color-primery-purple-100: #6979f8;
  --color-primery-purple-75: #dba5f5;
  --color-primery-purple-25: #eedff2;

  /*Accent color */
  --color-accent-blue-100: #6979f8;
  --color-accent-blue-75: #a5affb;
  --color-accent-blue-25: #e5e7fa;

  /*Semantic color */
  --color-semantic-yellow-100: #ffcf5c;
  --color-semantic-yellow-75: #ffe29d;
  --color-semantic-yellow-25: #fff8e7;

  --color-semantic-orange-100: #ffa26b;
  --color-semantic-orange-75: #ffc7a6;
  --color-semantic-orange-25: #ffe8da;

  --color-semantic-blue-100: #0084f4;
  --color-semantic-blue-75: #66b5f8;
  --color-semantic-blue-25: #d5e9fa;

  --color-semantic-green-100: #00c48c;
  --color-semantic-green-75: #7ddfc3;
  --color-semantic-green-25: #d5f2ea;

  --color-semantic-red-100: #ff647c;
  --color-semantic-red-75: #fdafbb;
  --color-semantic-red-25: #fbe4e8;
  /* shadows */
  --large-shadow: 0 0.0625rem 1.5rem 0.5rem rgba(0, 0, 0, 0.08),
    0 0 0.0625rem rgba(20, 20, 20, 0.08);
  --main-shadow: 0 2px 6px 0 rgba(5, 16, 55, 0.1);
  --blue-shadow: 0 2px 6px 0 #66b5f8;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  width: 100%;
  height: 100vh;
  background-color: var(--color-neutral-white);
}
</style>
