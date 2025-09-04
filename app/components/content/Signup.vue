<script setup lang="ts">
export interface SignupProps {
  id: string
  title: string
  description: string
  // buttonLabel: string
  // buttonIcon: string
}

const props = defineProps<SignupProps>()

function getURL() {
  return `https://tally.so/embed/${props.id}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`
}

const page = ref(1)

function init() {
  // @ts-ignore
  var d = document,
    w = 'https://tally.so/widgets/embed.js',
    v = function () {
      // @ts-ignore
      'undefined' != typeof Tally
        ? // @ts-ignore
        Tally.loadEmbeds()
        : d
          .querySelectorAll('iframe[data-tally-src]:not([src])')
          .forEach(function (e) {
            // @ts-ignore
            e.src = e.dataset.tallySrc
          })
    }
  // @ts-ignore
  if ('undefined' != typeof Tally) v()
  else if (d.querySelector('script[src="' + w + '"]') == null) {
    var s = d.createElement('script')
      ; (s.src = w), (s.onload = v), (s.onerror = v), d.body.appendChild(s)
  }

  // Listen for page view events
  window.addEventListener('message', (e) => {
    nextTick(() => {
      let data
      try {
        data = JSON.parse(e.data)
        console.log('Tally event:', data)
      } catch (error) {
        // Do nothing
      }

      if (data?.event === 'Tally.FormPageView' && data?.payload?.formId === props.id) {
        console.log('Fullscreen!', data)
        page.value = data?.payload?.page
      }
    })
  })
}

onMounted(() => {
  init()
})
</script>
<template>
  <!-- <UCard class="bg-primary/20 my-8">
    <h1>{{ props.title }}</h1>
    <p class="font-bold text-xl" v-if="props.description">
      {{ props.description }}
    </p>
    <UButton :icon="buttonIcon" @click="openForm" size="xl" class="cursor-pointer text-xl font-bold">{{ buttonLabel }}
    </UButton>


  </UCard> -->

  <UCard ref="formContainer" class="my-8 bg-primary/10">
    <slot></slot>
    <div class="not-prose space-y-2" v-if="page === 1">
      <h2 class="font-bold text-2xl">{{ props.title }}</h2>
      <p class=" text-lg" v-if="props.description">
        {{ props.description }}
      </p>
    </div>

    <iframe :data-tally-src="getURL()" loading="lazy" width="100%" height="174.5" frameborder="0" marginheight="0"
      marginwidth="0" title="Onze democratie is kapot. Wat nu?"></iframe>

  </UCard>


</template>