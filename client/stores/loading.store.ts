import { defineStore } from "pinia";

const defaultValues: {
  isLoading: false;
} = {
  isLoading: false,
};

export const useLoadingStore = defineStore("loading", {
  state: () => defaultValues,
  getters: {},
  actions: {
    setLoading(value: boolean) {
      this.$patch({ isLoading: value });
    },
  },
});
