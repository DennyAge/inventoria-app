<template>
  <header
    class="h-[3.75rem] p-8 flex items-center justify-between bg-white shadow-sm"
  >
    <div class="w-1/3">
      <CustomInput
        v-if="showInput"
        v-model="inputValue"
        :placeholder="$t('search')"
        :key="locale"
        type="email"
        name="search"
        id="search"
        remove-btn
      />
    </div>
    <DateTime />
  </header>
</template>

<script setup lang="ts">
import CustomInput from "~/components/ui/CustomInput.vue";

interface Props {
  showInput?: boolean;
}
withDefaults(defineProps<Props>(), {
  showInput: false,
});
const { locale } = useI18n();
const emit = defineEmits(["filter"]);

const inputValue = ref<string>("");

watch(inputValue, (newValue) => {
  emit("filter", newValue);
});
</script>
