<script lang="ts" setup>
import maplibregl, { AttributionControl } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

let map: maplibregl.Map

import { testimonials, type Testimonial } from '~/testimonials'

const { data } = await useFetch('/api/getContactCoordinates')

// Modal state
const isModalOpen = ref(false)
const isTestimonialOpen = ref(false)
const selectedCity = ref<string>('')
const selectedTestimonial = ref<Testimonial>()

function openTestimonial(testimonial?: Testimonial) {
  if (testimonial) {
    selectedTestimonial.value = testimonial
  }
  isTestimonialOpen.value = true


}

// Generate GeoJSON data directly
const performantDots: GeoJSON.FeatureCollection<GeoJSON.Point> = {
  type: 'FeatureCollection',
  features: []
}

const markerRefs = ref<(Element | ComponentPublicInstance | null)[]>([])
const setMarkerRef = (el: Element | ComponentPublicInstance | null, index: number) => {
  if (el) {
    // Handle both component instance and element
    const element = '$el' in el ? el.$el as HTMLElement : el as HTMLElement
    markerRefs.value[index] = element
  }
}


// Generate GeoJSON data for testimonial avatars
const testimonialsGeoJSON: GeoJSON.FeatureCollection<GeoJSON.Point> = {
  type: 'FeatureCollection',
  features: testimonials.map((testimonial, index) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [testimonial.longitude, testimonial.latitude]
    },
    properties: {
      index,
      avatar: testimonial.avatar,
      name: testimonial.name,
      title: testimonial.title,
      desc: testimonial.desc,
      city: testimonial.city
    }
  }))
}

data.value?.coordinates.forEach((coordinate, index) => {
  if (coordinate.latitude && coordinate.longitude) {
    performantDots.features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [coordinate.longitude, coordinate.latitude]
      },
      properties: {
        new: coordinate.new,
        index,
        city: coordinate.city
      }
    })
  }
})


// Test: Generate 10.000 random coordinates within the Netherlands
// for (let i = 0; i < 10000; i++) {
//   const lat = 50.6 + Math.random() * (53.7 - 50.6)
//   const lon = 3.1 + Math.random() * (7.5 - 3.1)
//   performantDots.features.push({
//     type: 'Feature',
//     geometry: {
//       type: 'Point',
//       coordinates: [lon, lat]
//     },
//     properties: {
//       index: performantDots.features.length + 1 + i
//     }
//   })
// }

const numberOfDots = performantDots.features.length


let performantDotSize = 10

if (numberOfDots > 5000) {
  performantDotSize = 2
} else if (numberOfDots > 2000) {
  performantDotSize = 3
}
else if (numberOfDots > 1000) {
  performantDotSize = 4
} else if (numberOfDots > 100) {
  performantDotSize = 6
}

// Animation function for pulse effect
function animatePulse() {
  const animationDuration = 2000 // 2 seconds
  const startTime = performance.now()

  function animate(timestamp: number) {
    const elapsed = timestamp - startTime
    const progress = (elapsed % animationDuration) / animationDuration

    // Calculate radius scale (grows from 1 to 3)
    const radiusScale = 1 + (progress * 2)

    // Calculate opacity (starts at 0.6, fades to 0)
    const opacity = Math.sin(progress * Math.PI) * 0.4

    if (map.getLayer('dots-pulse')) {
      map.setPaintProperty('dots-pulse', 'circle-radius', [
        'interpolate',
        ['linear'],
        ['zoom'],
        7, performantDotSize * radiusScale,
        15, performantDotSize * 8 * radiusScale
      ])

      map.setPaintProperty('dots-pulse', 'circle-opacity', opacity)
    }

    requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}

onMounted(() => {
  map = new maplibregl.Map({
    style: 'https://tiles.openfreemap.org/styles/liberty',
    // Netherlands
    bounds: [
      [3.1, 50.6],
      [7.5, 53.7],
    ],
    container: 'map',
    cooperativeGestures: true,
    attributionControl: false
  })


  map.on('styledata', () => {

    // Check if source already exists to avoid adding it multiple times
    if (!map.getSource('dots')) {
      // Add source for the dots
      map.addSource('dots', {
        type: 'geojson',
        data: performantDots
      })

      // Add pulse layer for animation (only for new coordinates)
      map.addLayer({
        id: 'dots-pulse',
        type: 'circle',
        source: 'dots',
        filter: ['==', ['get', 'new'], true],
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7, performantDotSize,
            15, performantDotSize * 3
          ],
          'circle-color': 'rgb(234, 88, 12)',
          'circle-opacity': 0.0
        }
      })

      // Add layer for the dots with primary color
      map.addLayer({
        id: 'dots-layer',
        type: 'circle',
        source: 'dots',
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            7, performantDotSize,
            15, performantDotSize * 3
          ],
          'circle-color': 'rgb(234, 88, 12)',
          'circle-opacity': 0.5
        }
      })



      // Start the pulse animation
      animatePulse()

      // Add hover effects
      map.on('mouseenter', 'dots-layer', (e) => {
        // Change cursor to pointer
        map.getCanvas().style.cursor = 'pointer'

        // Get the feature being hovered
        const hoveredFeature = e.features?.[0]
        if (hoveredFeature) {
          const hoveredIndex = hoveredFeature.properties?.index

          // Add hover layer for the specific dot
          if (!map.getLayer('dots-hover')) {
            map.addLayer({
              id: 'dots-hover',
              type: 'circle',
              source: 'dots',
              filter: ['==', ['get', 'index'], hoveredIndex],
              paint: {
                'circle-radius': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  7, performantDotSize * 1.2,
                  15, 18
                ],
                'circle-color': 'rgb(234, 88, 12)',
                'circle-opacity': 0.9,
                'circle-stroke-width': 2,
                'circle-stroke-color': 'rgb(194, 65, 12)'
              }
            })
          } else {
            // Update the filter to show only the hovered dot
            map.setFilter('dots-hover', ['==', ['get', 'index'], hoveredIndex])
          }
        }
      })

      map.on('mouseleave', 'dots-layer', () => {
        // Reset cursor
        map.getCanvas().style.cursor = ''

        // Hide hover layer
        if (map.getLayer('dots-hover')) {
          map.setFilter('dots-hover', ['==', ['get', 'index'], -1]) // Filter that matches nothing
        }
      })

      // Add click handler
      map.on('click', 'dots-layer', (e) => {
        const clickedFeature = e.features?.[0]
        if (clickedFeature) {
          const city = clickedFeature.properties?.city
          // Always open modal, even without city (using fallback text)
          selectedCity.value = city || ''
          isModalOpen.value = true
        }
      })

      // Wait for next tick to ensure template refs are available
      nextTick(() => {
        testimonials.forEach((testimonial, index) => {
          const markerElement = markerRefs.value[index] as HTMLElement
          if (markerElement) {
            // Create MapLibre marker using the template element
            const marker = new maplibregl.Marker({
              element: markerElement,
              anchor: 'bottom'
            })
              .setLngLat([testimonial.longitude, testimonial.latitude])
              .addTo(map)

            // Prevent map click events from bubbling up from marker element
            markerElement.addEventListener('click', (e) => {
              e.stopPropagation()
            })
          }
        })
      })
    }
  })
})
</script>
<template>
  <div>
    <div id="map" class="w-full rounded-md" style="height: 65vh;"></div>

    <!-- Hidden marker components that will be positioned on the map -->
    <div style="position: absolute; top: -9999px; left: -9999px;">
      <MapMarkerTestimonial v-for="(testimonial, index) in testimonials" :ref="(el: any) => setMarkerRef(el, index)"
        :src="testimonial.avatar" @show="openTestimonial(testimonial)" />
    </div>

    <div class="text-[8px] leading-2 text-neutral-400 text-right mt-1 text-balance"><a href="https://maplibre.org/"
        target="_blank" class="no-underline text-neutral-400">MapLibre</a> |
      <a href="https://openfreemap.org" target="_blank" class="no-underline text-neutral-400">OpenFreeMap</a> <a
        href="https://www.openmaptiles.org/" target="_blank" class="no-underline text-neutral-400">© OpenMapTiles</a>
      Data
      from <a href="https://www.openstreetmap.org/copyright" target="_blank"
        class="no-underline text-neutral-400">OpenStreetMap</a>
    </div>


    <UCard v-if="data?.newCount" class="text-xs text-gray-600 mt-3 bg-primary/10" variant="solid">
      <div class="flex items-center gap-4 justify-between flex-wrap">
        <div class="flex items-center gap-4">
          <span class="relative flex size-3">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span class="relative inline-flex size-3 rounded-full bg-primary"></span>
          </span>
          <div v-if="data?.newCount > 2">
            <strong>{{ data?.newCount }} nieuwe verzetshelden</strong> hebben zich net aangesloten.
          </div>
          <div v-else-if="data?.newCount === 1">
            <strong>{{ data?.newCount }} nieuwe verzetsheld</strong> heeft zich net aangesloten.
          </div>

        </div>
      </div>

    </UCard>



    <UModal v-model:open="isModalOpen">
      <template #title>
        Maak kennis ✌️
      </template>
      <template #description>
        Ontmoet verzetshelden in je {{ selectedCity || 'deze regio' }}:
      </template>
      <template #content>
        <NuxtImg src="/img/etentje.webp" alt="test" ratio=""></NuxtImg>
        <div class="p-6 space-y-4" role="dialog">


          <h2 class="text-xl font-bold">Maak kennis ✌️</h2>
          <div>Ontmoet verzetshelden in {{ selectedCity || 'deze regio' }}:</div>
          <UButton size="xl" icon="mdi-whatsapp" to="https://democratischverzet.nl/whatsapp-invite" target="_blank">Ga
            in WhatsApp groep
          </UButton>
        </div>
      </template>
    </UModal>

    <UModal v-model:open="isTestimonialOpen">
      <template #title>
        ...✌️
      </template>
      <template #description>
        ...
      </template>
      <template #content>
        <div class="p-6 space-y-4" role="dialog">
          <UAvatar :src="selectedTestimonial?.avatar" size="xl" />
          <h2 class="text-xl font-bold">{{ selectedTestimonial?.name }}</h2>
          <div class="text-sm text-gray-500">{{ selectedTestimonial?.title }} - {{ selectedTestimonial?.city }}</div>
          <div class="italic text-gray-700">{{ selectedTestimonial?.desc }}</div>

        </div>
        <div class="space-y-4 p-6">
          <div class="font-bold">Wat is jouw verhaal? Sluit je aan en ga in gesprek met verzetshelden in {{
            selectedTestimonial?.city }}:</div>
          <UButton size="xl" icon="mdi-whatsapp" to="https://democratischverzet.nl/whatsapp-invite" target="_blank">Ga
            in WhatsApp groep
          </UButton>
        </div>

      </template>
    </UModal>
  </div>
</template>