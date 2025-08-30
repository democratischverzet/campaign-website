<script setup lang="ts">
import posthog from 'posthog-js'
const config = useRuntimeConfig()


onMounted(() => {
  console.log('Initializing PostHog with config:', config.public.posthogUIHost, config.public.posthogAPIHost)
  posthog.init(config.public.posthogPublicKey,
    {
      ui_host: config.public.posthogUIHost,
      api_host: config.public.posthogAPIHost,
      person_profiles: 'identified_only' // or 'always' to create profiles for anonymous users as well
    }
  )
})
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
