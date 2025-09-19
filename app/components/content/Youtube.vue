<script setup lang="ts">
const props = defineProps<{ id: string }>()
</script>

<template>
  <ScriptYouTubePlayer ref="video" :video-id="id" :player-vars="{ rel: 0 }">
    <template #awaitingLoad>
      <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <UIcon name="mdi:youtube"
          class="text-9xl text-white opacity-50 hover:scale-110 hover:opacity-100 transition-all" />
      </div>
    </template>
  </ScriptYouTubePlayer>
</template>
