export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  modules: [
    "nuxt-site-config",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@nuxt/icon",
    "usebootstrap",
    "nuxt-graphql-client",
  ],
  imports: {
    autoImport: true,
  },
  i18n: {
    locales: [
      {
        code: "en",
        name: "English",
      },
      {
        code: "ua",
        name: "Ukrainian",
      },
      {
        code: "ru",
        name: "Russian",
      },
    ],
    defaultLocale: "en",
    vueI18n: "./i18n.config.ts",
  },
  pinia: {
    storesDirs: ["./store/**"],
  },
  runtimeConfig: {
    public: {
      GQL_HOST: process.env.GQL_HOST!,
    },
  },
  nitro: {
    devProxy: {
      "/graphql": {
        target: process.env.GQL_HOST!,
        changeOrigin: true,
      },
    },
  },

  "graphql-client": {
    clients: {
      default: {
        host: process.env.GQL_HOST!,
        schema: "./schema.json",
        corsOptions: {
          mode: "cors",
          credentials: "include",
        },
      },
    },
  },
});
