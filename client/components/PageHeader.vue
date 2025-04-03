<template>
  <div class="flex items-center justify-between gap-4 mb-4">
    <div class="flex items-center gap-4">
      <div class="flex gap-2 text-xl md:text-2xl font-bold">
        <h6>{{ title }}</h6>
        <span v-if="count">/ {{ count }}</span>
      </div>
    </div>
    <div v-if="filter" class="flex items-center gap-2 w-48 sm:w-60 md:w-64">
      <label class="text-sm md:text-base" for="type">{{ $t("type") }}:</label>
      <CustomSelect
        :options="productTypes"
        v-model="type"
        @input="onChange"
        class="w-full"
      />
    </div>
    <Button v-if="addBtn" @click="onClick" type="button">
      + {{ $t("addNewOrder") }}
    </Button>
  </div>
</template>

<script setup lang="ts">
//helpers
import { productTypes } from "~/constants";
//components
import Button from "~/components/ui/Button.vue";
import CustomSelect from "~/components/ui/CustomSelect.vue";

interface Props {
  title: string;
  count?: string | number;
  addBtn?: boolean;
  filter?: boolean;
  onClick?: () => void;
}
withDefaults(defineProps<Props>(), {
  addBtn: false,
});
const emit = defineEmits(["filter"]);

//data
const type = ref<string | string[]>("All");

const onChange = () => {
  emit("filter", type.value);
};
</script>
