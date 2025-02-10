<template>
  <header
    class="h-[3.75rem] p-4 md:p-8 flex items-center justify-between bg-white shadow-sm relative"
  >
    <div class="flex items-end gap-4 w-full">
      <Button
        @click="openSidebar"
        variant="icon"
        size="icon"
        class="block md:hidden z-50"
      >
        <Icon v-if="showSidebar" name="ri:close-large-fill" class="h-6 w-6" />
        <Icon v-else name="ri:menu-line" class="h-6 w-6" />
      </Button>
      <div class="w-1/2">
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
    </div>
    <div class="flex items-end gap-2">
      <LanguageSelect />
      <Avatar :user="user" />
    </div>
    <MobileSidebar v-if="showSidebar" />
  </header>
</template>

<script setup lang="ts">
//components
import CustomInput from "~/components/ui/CustomInput.vue";
import Button from "~/components/ui/Button.vue";
import MobileSidebar from "~/components/MobileSidebar.vue";
import Avatar from "~/components/ui/Avatar.vue";
// store
import { useAuthStore } from "~/stores/auth.store";

interface Props {
  showInput?: boolean;
}
withDefaults(defineProps<Props>(), {
  showInput: false,
});

const emit = defineEmits(["filter"]);

const authStore = useAuthStore();
const { locale } = useI18n();

//data
const user = computed(() => authStore.user);
const inputValue = ref<string>("");
const showSidebar = ref<boolean>(false);

watch(inputValue, (newValue) => {
  emit("filter", newValue);
});

const openSidebar = () => {
  showSidebar.value = !showSidebar.value;
};
</script>
