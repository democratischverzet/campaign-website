<script lang="ts" setup>
export interface ButtonProps {
  label: string
  to: string
  icon?: string
}

const props = defineProps<ButtonProps>()
</script>
<template>
  <UButton :icon="icon" :to="to">{{ label }}</UButton>
</template>