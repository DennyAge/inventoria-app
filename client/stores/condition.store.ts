export const useIsLoadingStore = defineStore("isLoading", {
  state: () => ({
    isLoading: false,
  }),
  actions: {
    setIsLoading(data: boolean) {
      this.$patch({ isLoading: data });
    },
  },
});
