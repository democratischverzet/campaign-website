// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
  ],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      posthogPublicKey: 'phc_ePWcvlGf6OZW3i4jh0OSthZpeqlyPcSDzqqknpM92MP',
      posthogUIHost: 'https://eu.posthog.com',
      posthogAPIHost: 'https://data.democratischverzet.nl',
      posthogDefaults: '2025-05-24',
    },
  },

  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
})
