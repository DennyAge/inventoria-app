<template>
  <div>
    <button :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')">
      <slot />
    </button>
  </div>
</template>

<script setup lang="ts">
import { cva } from "class-variance-authority";
import { cn } from "~/lib/utils.js";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-md shadow-xs",
  {
    variants: {
      variant: {
        default: "bg-primary-100 text-white hover:bg-primary-100/90",
        outline: "border-1 border-gray-300 bg-white hover:shadow-md",
        ghost: "hover:shadow-md",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        full: "w-full h-10 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface Props {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>["variant"];
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>["size"];
}

withDefaults(defineProps<Props>(), {});
</script>

<style scoped></style>
