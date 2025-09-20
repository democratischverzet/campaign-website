<script setup lang="ts">
import { testimonials } from '~/testimonials';
</script>
<template>
  <div class="grid md:grid-cols-2 gap-4 mb-8">
    <UCard v-for="testimonial in testimonials" :key="testimonial.name">
      <UAvatar :src="testimonial.avatar" size="xl" />
      <h3 class="font-semibold text-lg">{{ testimonial.name }}</h3>
      <p class="text-sm text-gray-500 mb-2">{{ testimonial.title }}</p>
      <p class="italic text-gray-700">{{ testimonial.desc }}</p>
    </UCard>
  </div>
</template>