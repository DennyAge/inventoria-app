export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "nuxt-site-config",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@nuxt/icon",
    "usebootstrap",
  ],
  i18n: {
    vueI18n: "./i18n.config.ts",
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
