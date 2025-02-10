import type { LoginInput, SignUpInput, User } from "~/types.js";
import { defineStore } from "pinia";

const defaultValues: {
  user: User | null;
} = {
  user: null,
};

export const useAuthStore = defineStore("auth", {
  state: () => defaultValues,
  getters: {
    isAuth: (state) => !!state.user,
  },
  actions: {
    setUser(user: User) {
      this.$patch({ user });
      if (process.client) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    },
    loadUserFromLocalStorage() {
      if (process.client) {
        const user = localStorage.getItem("user");
        if (user) {
          this.$patch({ user: JSON.parse(user) });
        }
      }
    },
    async getAuthUser() {
      try {
        const { authUser } = await GqlGetAuthUser();
        if (authUser) {
          this.setUser(authUser);
        }
      } catch (error) {
        console.error("Failed to fetch auth user:", error);
        this.clearAuthStore();
      }
    },
    async login(input: LoginInput) {
      try {
        const { login: user } = await GqlLogin({ input });
        if (user) {
          this.setUser(user);
        }
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    async register(input: SignUpInput) {
      try {
        const { signUp: user } = await GqlRegister({ input });
        if (user) {
          this.setUser(user);
        }
      } catch (error) {
        console.error("Registration failed:", error);
        throw error;
      }
    },
    async logout() {
      try {
        const { logout } = await GqlLogout();
        if (logout?.message) {
          this.clearAuthStore();
        }
      } catch (error) {
        console.error("Logout failed:", error);
        throw error;
      }
    },
    clearAuthStore: function () {
      this.$patch(defaultValues);
      if (process.client) {
        localStorage.removeItem("user");
      }
    },
  },
});
