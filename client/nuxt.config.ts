export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "nuxt-site-config",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "@nuxt/icon",
    "nuxt-graphql-client",
    "@nuxtjs/tailwindcss",
  ],
  css: ["~/assets/css/tailwind.css"],

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
      apiBaseUrl: process.env.NUXT_PUBLIC_API_URL || "http://localhost:8080",
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
