<script lang="ts" setup>
// Keep layout minimal
definePageMeta({ layout: 'fullscreen' })

// Just your IDs
const videos = ref([
  { id: 'eeO0CG4MZGs' },
  { id: '58EbWx9ypoc' },
  { id: 'L7i52ExS0QA' },
  { id: 'rg7XksdzhUY' },
  { id: 'eov7vpjuBnA' },

])

// Refs for slide containers & player components
const slideRefs = ref<HTMLElement[]>([])
const playerRefs = ref<Record<string, any>>({}) // component instances keyed by video id
let observer: IntersectionObserver | null = null

// Global sound state (starts muted because player-vars passes mute:1)
const soundOn = ref(false)
// Show sound toggle only after a video actually starts playing
const startedPlaying = ref(false)

function registerPlayer(id: string) {
  return (el: any) => {
    if (el) {
      playerRefs.value[id] = el
      // If sound already enabled when a player mounts, unmute it immediately
      if (soundOn.value) {
        const p = el?.player
        try { p?.unMute?.(); p?.setVolume?.(100) } catch { }
      }
    }
  }
}

function toggleSound() {
  soundOn.value = !soundOn.value
  const comps = Object.values(playerRefs.value)
  for (const comp of comps) {
    const p = comp?.player
    if (!p) continue
    try {
      if (soundOn.value) {
        p.unMute?.();
        p.setVolume?.(100)
      } else {
        p.mute?.()
      }
    } catch { }
  }
}

function handleVisibility(entries: IntersectionObserverEntry[]) {
  entries.forEach(entry => {
    const id = (entry.target as HTMLElement).dataset.videoId
    if (!id) return
    const comp = playerRefs.value[id]
    const player = comp?.player // exposed by ScriptYouTubePlayer
    if (!player) return
    try {
      if (entry.isIntersecting) {
        player.playVideo()
        if (!startedPlaying.value) startedPlaying.value = true

      }
      else player.pauseVideo()
    } catch { }
  })
}

const isMobile = ref()

onMounted(() => {
  observer = new IntersectionObserver(handleVisibility, { threshold: 0.6 })
  // Observe after next tick so refs are populated
  nextTick(() => {
    slideRefs.value.forEach(el => el && observer!.observe(el))
  })

  // Detect if this is a mobile device (simple check)
  isMobile.value = /Mobi|Android/i.test(navigator.userAgent)
})

onBeforeUnmount(() => { observer?.disconnect() })

</script>

<template>
  <div class="video-feed h-dvh w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-black text-white">
    <div v-for="video in videos" :key="video.id" ref="slideRefs" :data-video-id="video.id"
      class="relative h-dvh w-full flex items-center justify-center snap-start">
      <ScriptYouTubePlayer :video-id="video.id" :ref="registerPlayer(video.id)"
        :player-vars="{ autoplay: 0, mute: isMobile ? 1 : 0, controls: 0, playsinline: 1, loop: 1, rel: 0 }"
        class="h-dvh w-full" @state-change="startedPlaying = true">
        <template #placeholder>
          <div
            class="absolute h-dvh w-full  bg-gradient-to-br from-orange-600 via-white to-blue-700 animate-gradient text-black px-8 py-16 text-center text-2xl space-y-4">
            <div class="font-bold">Democratisch Verzet ✌️</div>
            <div>Scoll voor een algoritme met alleen maar goede videos!</div>
          </div>

        </template>
        <template #awaitingLoad>
          <div
            class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-grow hover:scale-105 transition-transform animate-shadow">
            <UButton icon="mdi-youtube" size="xl" rounded class="cursor-pointer ">
              Start video
            </UButton>
          </div>
          <img src="/img/grover.gif" class="absolute bottom-0 left-1/2 -translate-x-1/2 " />
        </template>
      </ScriptYouTubePlayer>
    </div>
  </div>
  <UButton icon="mdi-volume-high" class="fixed bottom-8 left-8" @click="toggleSound" size="xl"
    v-if="startedPlaying && !soundOn && isMobile">
    Geluid aan
  </UButton>


</template>

<style scoped>
.video-feed::-webkit-scrollbar {
  display: none;
}

@keyframes gradient-move {
  0% {
    background-position: 0% 0%
  }

  50% {
    background-position: 100% 50%
  }

  100% {
    background-position: 100% 100%
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient-move 3s ease-in-out infinite alternate-reverse;
}

@keyframes grow {
  0% {}

  50% {
    transform: scale(2);
  }

  100% {}
}

.animate-grow {
  animation: grow 3s ease-in-out infinite;
  transform: scale(1.5)
}

@keyframes shadow {
  0% {}

  30% {
    box-shadow: 0 0 64px var(--color-orange-700);
  }

  60% {
    box-shadow: 0 0 64px var(--color-white);
  }

  100% {}
}

.animate-shadow {
  animation: shadow 6s ease-in-out infinite alternate-reverse;
  border-radius: 8px;
  box-shadow: 0 0 64px var(--color-blue-700);
}
</style>