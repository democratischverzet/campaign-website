<script setup lang="ts">
import posthog from 'posthog-js'
const config = useRuntimeConfig()

const route = useRoute()

onMounted(() => {

  posthog.init(config.public.posthogPublicKey,
    {
      ui_host: config.public.posthogUIHost,
      api_host: config.public.posthogAPIHost,
      person_profiles: 'identified_only' // or 'always' to create profiles for anonymous users as well
    }
  )

  if (route.query.data_email) {
    posthog.identify(route.query.data_email as string,
      {
        email: route.query.data_email,
        name: route.query.data_name,
        phone: route.query.data_phone,
        postcode: route.query.data_postcode
      })
  }

  // Save any URL query parameters that start with "data_" in the local storage
  Object.keys(route.query).forEach(key => {
    if (key.startsWith('data_')) {
      localStorage.setItem(key, route.query[key] as string)
    }
  })

  // Remove query parameters from URL after identifying user
  if (Object.keys(route.query).length > 0) {
    const url = new URL(window.location.href)
    url.search = ''
    window.history.replaceState({}, document.title, url.toString())
  }

});



</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
