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
    "nuxt-graphql-client",
  ],
  i18n: {
    vueI18n: "./i18n.config.ts",
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  runtimeConfig: {
    public: {
      GQL_HOST: "http://localhost:8080/graphql",
    },
  },
  "graphql-client": {
    clients: {
      default: {
        host: process.env.GQL_HOST! || "http://localhost:8080/graphql",
        corsOptions: {
          credentials: "include",
        },
      },
    },
  },
});
