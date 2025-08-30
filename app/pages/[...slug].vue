<script setup lang="ts">
const route = useRoute()

const path = route.params.slug
  ? '/' + (Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug)
  : '/'

const { data: home } = await useAsyncData(`content:${path}`, () => queryCollection('content').path(path).first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description
})
</script>

<template>
  <UContainer>
    <ContentRenderer v-if="home" :value="home"
      class="mt-8 mb-32 mx-auto prose [&_h1_a]:no-underline [&_h2_a]:no-underline [&_h3_a]:no-underline [&_h4_a]:no-underline [&_h5_a]:no-underline [&_h6_a]:no-underline" />
    <div v-else>Page not found</div>

  </UContainer>
</template>
