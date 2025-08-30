<script setup lang="ts">
const people = ref([
  {
    avatar: '/img/danielle.jpg',
    name: 'Danielle',
    title: 'Beeldend kunstenaar',
    desc: '"Ik ben eigenlijk helemaal geen activist. Ik vind het belangrijk dat we weer met elkaar in gesprek gaan. Hier kan ik bijdragen aan die verbinding. Mensen en organisaties bij elkaar brengen, dat is wat ik het liefste doe."',
  },
  {
    avatar: '/img/joppe.jpeg',
    name: 'Joppe',
    title: 'Online marketeer',
    desc: '"De hele wereld staat in de fik. Dat komt door de elite die zichzelf aan het verrijken is. Ik wil daar iets aan doen, maar voel me vaak machteloos. Democratisch Verzet is een plek waar ik kan bijdragen aan échte verandering."',
  },
])
</script>
<template>
  <div class="grid md:grid-cols-2 gap-4 mb-8">
    <UCard v-for="person in people" :key="person.name">
      <UAvatar :src="person.avatar" size="xl" />
      <h3 class="font-semibold text-lg">{{ person.name }}</h3>
      <p class="text-sm text-gray-500 mb-2">{{ person.title }}</p>
      <p class="italic text-gray-700">{{ person.desc }}</p>
    </UCard>
  </div>
</template>