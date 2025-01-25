import { setActivePinia, createPinia } from "pinia";
import { useAuthStore } from "/store/auth.store";
import { describe, it, expect, beforeEach, vi } from "vitest";

describe("useAuthStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("isAuth return false, if user not auth", () => {
    const store = useAuthStore();
    expect(store.isAuth).toBe(false);
  });

  it("isAuth return true, if user auth", () => {
    const store = useAuthStore();
    store.setUser({ fullName: "Test Dev", email: "test@test.com" });
    expect(store.isAuth).toBe(true);
  });

  it("setUser refresh user state", () => {
    const store = useAuthStore();
    const user = { fullName: "Test Dev", email: "test@test.com" };

    store.setUser(user);
    expect(store.user).toEqual(user);
  });
});
