<script lang="ts" setup>
const open = ref(false)

</script>
<template>
  <UContainer class="flex justify-between gap-4 p-4 items-center">
    <NuxtLink class="font-bold" to="/">Democratisch Verzet ✌️</NuxtLink>
    <div class="flex gap-2">
      <UButton size="xl" icon="mdi-heart" to="/besluit-mee" class="max-md:hidden">Besluit mee</UButton>
      <UButton size="xl" icon="mdi-whatsapp" to="https://democratischverzet.nl/whatsapp-invite" class="max-lg:hidden"
        target="_blank">
        WhatsApp groep</UButton>
      <!-- <UButton size="xl" icon="mdi-euro" class="max-md:hidden">Doneer</UButton> -->
      <UDrawer direction="right" v-model:open="open" class="cursor-pointer">
        <UButton size="xl" variant="soft" icon="mdi-menu">Menu</UButton>

        <template #content>
          <div class="max-w-96 w-11/12 space-y-6 py-10 pr-8 pl-2 overflow-y-scroll">

            <div class="space-y-2">
              <div>
                <NuxtLink to="/" class="font-bold text-secondary text-2xl" @click="open = false">Democratisch Verzet ✌️
                </NuxtLink>
              </div>

              <div>Onze democratie is kapot. Wij gaan weer naar elkaar luisteren. Nederland is van ons allemaal.</div>
            </div>

            <div class="space-y-2 w-full">


              <UButton size="xl" icon="mdi-info" to="/over" block variant="soft" color="secondary"
                @click="open = false">Wie zijn
                wij?
              </UButton>

              <UButton size="xl" icon="mdi-calendar" to="/agenda" block variant="soft" color="secondary"
                @click="open = false">Agenda
              </UButton>

              <UButton size="xl" icon="mdi-book" to="/handleidingen" block variant="soft" color="secondary"
                @click="open = false">Handleidingen
              </UButton>

            </div>

            <div class=" space-y-2">
              <UButton size="xl" icon="mdi-heart" to="/besluit-mee" block color="secondary" @click="open = false">
                Besluit mee</UButton>
              <!-- <UButton size="xl" icon="mdi-euro" block color="secondary" to="/doneer" @click="open = false">Doneer
              </UButton> -->
            </div>

            <UCard class="bg-orange-50 mt-12">
              <div class="font-bold mb-2">Blijf op de hoogte</div>
              <UButton size="lg" icon="mdi-whatsapp" block color="primary"
                to="https://democratischverzet.nl/whatsapp-invite" target="_blank">Open WhatsApp</UButton>
            </UCard>

            <div class="flex gap-1 justify-center my-12">
              <UButton size="lg" icon="bi-substack" to="https://democratischverzet.substack.com/" square variant="ghost"
                color="neutral" target="_blank">
              </UButton>
              <UButton size="lg" icon="mdi-instagram" to="https://www.instagram.com/democratischverzet/" square
                variant="ghost" color="neutral" target="_blank">
              </UButton>
              <UButton size="lg" icon="mdi-facebook" to="https://www.facebook.com/democratischverzet/" square
                variant="ghost" color="neutral" target="_blank"></UButton>
              <UButton size="lg" icon="mdi-linkedin" to="https://www.linkedin.com/company/democratisch-verzet/" square
                variant="ghost" color="neutral" target="_blank"></UButton>

              <UButton size="lg" icon="mdi-youtube" to="https://www.youtube.com/@democratischverzet" square
                variant="ghost" color="neutral" target="_blank">
              </UButton>

            </div>



          </div>

        </template>
      </UDrawer>
    </div>

  </UContainer>

</template>