<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][][]>([
  [
    [
      {
        label: 'Democratisch Verzet ✌️',
        type: 'label'
      },
      {
        label: 'Over ons',
        icon: 'mdi-info',
        to: '/over'
      },

      {
        label: 'Contact',
        icon: 'mdi-email',
        to: '/contact'
      },

      {
        label: 'Perskit',
        icon: 'mdi-newspaper',
        to: 'https://drive.google.com/drive/folders/1Iz1MLCorsKCpHiQMAJouVzLtr2Ri56xX',
        target: '_blank'
      },

    ],
  ],
  [
    [
      {
        label: 'Sluit je aan',
        type: 'label'
      },
      {
        label: 'Besluit mee',
        icon: 'mdi-heart',
        to: '/besluit-mee'
      },
      {
        label: 'WhatsApp groep',
        icon: 'mdi-whatsapp',
        to: 'https://democratischverzet.nl/whatsapp-invite',
        target: '_blank'
      },
      {
        label: 'Agenda',
        icon: 'mdi-calendar',
        to: '/agenda'
      },
      {
        label: 'Doneer',
        icon: 'mdi-euro',
        to: '/doneer'
      },

      {
        label: 'Vacatures',
        icon: 'mdi-briefcase-person',
        to: '/vacatures'
      },
    ],
  ],
  [
    [
      {
        label: 'Aan de slag',
        type: 'label'
      },
      {
        label: 'Handleidingen',
        icon: 'mdi-book',
        to: '/handleidingen'
      },
      {
        label: 'Strategie',
        icon: 'mdi-target-arrow',
        to: 'https://docs.google.com/document/d/1jKKJ9TSNR6orGs0gb_NAYBJbsvE8_Bi3bxRq6xtRCpQ/edit?tab=t.hn7ogcihlppc',
        target: '_blank'
      },
      {
        label: 'Huisstijl',
        icon: 'mdi-paint-outline',
        to: '/huisstijl'
      },
    ],
  ],
  [
    [
      {
        label: 'Social media',
        type: 'label'
      },
      {
        label: 'Substack',
        icon: 'mdi-info',
        to: 'https://democratischverzet.substack.com/',
        target: '_blank'
      },
      {
        label: 'Instagram',
        icon: 'mdi-instagram',
        to: 'https://www.instagram.com/democratischverzet/',
        target: '_blank'
      },
      {
        label: 'Facebook',
        icon: 'mdi-facebook',
        to: 'https://www.facebook.com/democratischverzet/',
        target: '_blank'
      },
      {
        label: 'LinkedIn',
        icon: 'mdi-linkedin',
        to: 'https://www.linkedin.com/company/democratisch-verzet/',
        target: '_blank'
      },
      {
        label: 'Youtube',
        icon: 'mdi-youtube',
        to: 'https://www.youtube.com/@democratischverzet',
        target: '_blank'
      },
    ],
  ]
])
</script>

<template>
  <div class="flex justify-center mt-20 mb-12">
    <NuxtImg src="/img/logo.svg" width="200" height="200" alt="Democratisch Verzet logo" />
  </div>
  <div class="p-8 grid md:grid-cols-2 xl:grid-cols-4 gap-6  border-t-8 border-t-secondary bg-secondary-100">
    <UCard v-for="item in items">
      <UNavigationMenu orientation="vertical" :items="item" />
    </UCard>


  </div>

</template>
