<script lang="ts" setup>
interface Props {
  src: string
}

const props = defineProps<Props>()

const emit = defineEmits(['show'])
</script>

<template>
  <div class="relative flex size-10">


    <span
      class="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75 translate-y-1/2"></span>
    <UButton size="xs" square rounded class="rounded-full cursor-pointer  transition-transform translate-y-1/2"
      variant="ghost" color="secondary" @click.stop="emit('show')">
      <UAvatar :src size="md" class="border-white border-2" />
    </UButton>
  </div>
</template>
<style scoped>
.animate-ping {
  animation: ping 5s infinite;
}

@keyframes ping {

  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>