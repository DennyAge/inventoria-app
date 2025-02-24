<template>
  <button :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')">
    <slot />
  </button>
</template>

<script setup lang="ts">
//helpers
import { cva } from "class-variance-authority";
import { cn } from "~/lib/utils.js";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm md:text-base shadow-xs w-max",
  {
    variants: {
      variant: {
        default: "bg-primary-100 text-white hover:bg-primary-100/90",
        outline: "border border-gray-200 bg-white hover:shadow-md",
        ghost: "hover:shadow-md",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "",
      },
      size: {
        default: "h-8 md:h-10 px-4 py-2",
        sm: "h-7 md:h-9 rounded-md px-3",
        lg: "h-9 md:h-11 rounded-md px-8",
        full: "w-full h-8 md:h-10 rounded-md px-8",
        icon: "w-max h-max",
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
