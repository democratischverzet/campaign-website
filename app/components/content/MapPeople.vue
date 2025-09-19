<script lang="ts" setup>
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'



const { data } = await useFetch('/api/getContactCoordinates')

const coordinates = data.value?.coordinates ?? []

// Template refs for marker elements
const markerRefs = ref<(Element | ComponentPublicInstance | null)[]>([])
let map: maplibregl.Map

const setMarkerRef = (el: Element | ComponentPublicInstance | null, index: number) => {
  if (el) {
    // Handle both component instance and element
    const element = '$el' in el ? el.$el as HTMLElement : el as HTMLElement
    markerRefs.value[index] = element
  }
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
    cooperativeGestures: true
  })

  map.on('load', () => {
    // Wait for next tick to ensure template refs are available
    nextTick(() => {
      coordinates.forEach((coordinate, index) => {
        const markerElement = markerRefs.value[index] as HTMLElement
        if (markerElement) {
          // Create MapLibre marker using the template element
          new maplibregl.Marker({
            element: markerElement,
            anchor: 'bottom'
          })
            .setLngLat([coordinate.longitude, coordinate.latitude])
            .addTo(map)
        }
      })
    })
  })
})

</script>
<template>
  <div>
    <div id="map" style="width: 100%; height: 500px"></div>

    <!-- Hidden marker components that will be positioned on the map -->
    <div style="position: absolute; top: -9999px; left: -9999px;">
      <PersonMarker v-for="(coordinate, index) in coordinates" :key="coordinate.id"
        :ref="(el: any) => setMarkerRef(el, index)" />
    </div>

    Coordinates: {{ coordinates }}

    <div v-for="(coordinate, index) in coordinates">
      {{ coordinate.latitude }}, {{ coordinate.longitude }}
    </div>
  </div>
</template>
