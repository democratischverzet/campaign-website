<script setup lang="ts">
const props = defineProps<{
  title?: string
  description?: string
  buttonLabel: string
  buttonTo: string
  buttonIcon?: string
}>()
</script>
<template>
  <UCard class="bg-secondary-100">
    <div class="md:flex md:flex-row-reverse items-center max-md:text-center max-md:pb-6">
      <div class="flex-none md:px-8 max-md:flex max-md:justify-center">
        <NuxtImg src="/img/logo.svg" width="200" height="200" alt="Democratisch Verzet logo" />
      </div>
      <div class="flex-1 ">
        <h1>{{ props.title }}</h1>
        <p class="font-bold text-xl">
          {{ props.description }}
        </p>
        <UButton :to="props.buttonTo" size="xl" color="secondary" :icon="props.buttonIcon" class="not-prose">
          {{ props.buttonLabel }}
        </UButton>
      </div>
    </div>
  </UCard>
</template>