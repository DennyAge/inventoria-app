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
  i18n: {
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
    tokenStorage: {
      mode: "localStorage",
    },
    codegen: {
      disableOnBuild: true,
    },
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
