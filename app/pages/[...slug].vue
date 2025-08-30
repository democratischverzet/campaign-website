<script setup lang="ts">
const route = useRoute()

const { data: contentPage } = await useAsyncData(`content:${route.path}`, () => queryCollection('content').path(route.path).first())

useSeoMeta({
  title: contentPage.value?.title,
  description: contentPage.value?.description
})
</script>

<template>
  <UContainer>
    <ContentRenderer v-if="contentPage" :value="contentPage"
      class="mt-8 mb-32 mx-auto prose [&_h1_a]:no-underline [&_h2_a]:no-underline [&_h3_a]:no-underline [&_h4_a]:no-underline [&_h5_a]:no-underline [&_h6_a]:no-underline" />
    <div v-else>Page not found</div>

  </UContainer>
</template>
