const initialState: { user: User } = {
  user: {
    email: "DenX055@gmail.com",
    fullName: "Denys Aheienko",
  },
};

export const useAuthStore = defineStore("auth", {
  state: () => initialState,
  getters: {
    isAuth: (state) => state.user,
  },
  actions: {
    clear() {
      this.$patch(initialState);
    },
    setUser(data: User) {
      this.$patch({ user: data });
    },
  },
});
