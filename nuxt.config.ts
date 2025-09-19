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
    '@pinia/nuxt',
  ],

  // Global CSS files.
  css: ['~/assets/css/main.css'],

  ui: {
    colorMode: false,
  },

  runtimeConfig: {
    // Private (server-only) runtime config
    cloudflareDatabaseID: '',
    cloudflareDatabaseName: '',
    tallyApiKey: '',
    loopsApiKey: '',
    postcodeApiKey: '',

    // Public runtime config automatically exposed to client
    public: {
      posthogPublicKey: '',
      posthogUIHost: '',
      posthogAPIHost: '',
      posthogDefaults: '',
    },
  },

  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
      wrangler: {
        observability: {
          enabled: true,
          head_sampling_rate: 1,
        },
        vars: {
          // Private
          NUXT_CLOUDFLARE_DATABASE_ID:
            process.env.NUXT_CLOUDFLARE_DATABASE_ID || '',
          NUXT_CLOUDFLARE_DATABASE_NAME:
            process.env.NUXT_CLOUDFLARE_DATABASE_NAME || '',
          NUXT_TALLY_API_KEY: process.env.NUXT_TALLY_API_KEY || '',
          NUXT_LOOPS_API_KEY: process.env.NUXT_LOOPS_API_KEY || '',
          NUXT_POSTCODE_API_KEY: process.env.NUXT_POSTCODE_API_KEY || '',

          // Public
          NUXT_PUBLIC_POSTHOG_PUBLIC_KEY:
            process.env.NUXT_PUBLIC_POSTHOG_PUBLIC_KEY || '',
          NUXT_PUBLIC_POSTHOG_UI_HOST:
            process.env.NUXT_PUBLIC_POSTHOG_UI_HOST || '',
          NUXT_PUBLIC_POSTHOG_API_HOST:
            process.env.NUXT_PUBLIC_POSTHOG_API_HOST || '',
          NUXT_PUBLIC_POSTHOG_DEFAULTS:
            process.env.NUXT_PUBLIC_POSTHOG_DEFAULTS || '',
        },

        d1_databases: [
          {
            binding: 'DB',
            database_name: process.env.NUXT_CLOUDFLARE_DATABASE_NAME || '',
            database_id: process.env.NUXT_CLOUDFLARE_DATABASE_ID || '',
          },
        ],
        // kv_namespaces: [
        //   {
        //     binding: 'CACHE',
        //     id: '',
        //   },
        // ],
      },
    },
  },
})
