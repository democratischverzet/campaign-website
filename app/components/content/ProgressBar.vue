<script setup lang="ts">
const { data } = await useFetch('/api/getFormSubmissionCount')

const count = data.value?.count ?? 0
// const count = 200

// Generate a nice next goal based on the current count. E.g. if count is 47, next goal is 50; if 1123, next goal is 1200
const nextGoal = computed(() => {
  const c = count ?? 0

  // Ambitious early milestones
  if (c < 10) return 10
  if (c < 25) return 25
  if (c < 40) return 40
  if (c < 50) return 50
  if (c < 75) return 75
  if (c < 100) return 100

  // Determine order of magnitude (e.g. 112 -> 100)
  const magnitude = Math.pow(10, Math.floor(Math.log10(c)))
  const multipliers = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 7.5, 8, 9, 10]

  for (const m of multipliers) {
    const goal = Math.round(m * magnitude)
    if (goal > c) {
      // Ensure at least ~15% ambition
      if (goal < c * 1.15) continue
      return goal
    }
  }

  return 10 * magnitude
})
</script>
<template>
  <div class="mb-8 space-y-2">
    <div class="flex justify-between items-center md:text-xl">
      <div>
        Handtekeningen: {{ count }}
      </div>
      <div>
        Volgend doel: {{ nextGoal }}
      </div>
    </div>
    <UProgress v-model="count" :max="nextGoal" size="xl" />
  </div>
</template>