<script lang="ts" setup>
const open = ref(false)

</script>
<template>
  <UContainer class="flex justify-between gap-4 p-4 items-center">
    <NuxtLink id="nav-home" class="font-bold" to="/">Democratisch Verzet ✌️</NuxtLink>
    <div class="flex gap-2">
      <UButton id="nav-join" size="xl" icon="mdi-heart" to="/besluit-mee" class="max-md:hidden">Besluit mee</UButton>
      <UButton id="nav-whatsapp" size="xl" icon="mdi-whatsapp" to="https://democratischverzet.nl/whatsapp-invite"
        class="max-lg:hidden" target="_blank">
        WhatsApp groep</UButton>
      <!-- <UButton size="xl" icon="mdi-euro" class="max-md:hidden">Doneer</UButton> -->
      <UDrawer direction="right" v-model:open="open" class="cursor-pointer">
        <UButton id="nav-open-drawer" size="xl" variant="soft" icon="mdi-menu">Menu</UButton>

        <template #content>
          <div class="max-w-96 space-y-4 sm:space-y-6 py-10 pr-8 pl-2 ">

            <div class="space-y-2">
              <div>
                <NuxtLink id="nav-drawer-home" to="/" class="font-bold text-secondary text-xl" @click="open = false">
                  Democratisch Verzet ✌️
                </NuxtLink>
              </div>

              <div>Onze democratie is kapot. Wij gaan weer naar elkaar luisteren. Nederland is
                van ons allemaal.
              </div>
            </div>

            <div class="space-y-2 w-full">


              <UButton id="nav-drawer-about" size="xl" icon="mdi-info" to="/over" block variant="soft" color="secondary"
                @click="open = false">
                Wie zijn
                wij?
              </UButton>

              <UButton id="nav-drawer-agenda" size="xl" icon="mdi-calendar" to="/agenda" block variant="soft"
                color="secondary" @click="open = false">Agenda
              </UButton>

              <UButton id="nav-drawer-guides" size="xl" icon="mdi-book" to="/handleidingen" block variant="soft"
                color="secondary" @click="open = false">Handleidingen
              </UButton>
              <UButton id="nav-drawer-donate" size="xl" icon="mdi-euro" to="/doneer" block variant="soft"
                color="secondary" @click="open = false">Doneer
              </UButton>

            </div>

            <div class="space-y-2">
              <UButton id="nav-drawer-join" size="xl" icon="mdi-heart" to="/besluit-mee" block color="secondary"
                @click="open = false">
                Besluit mee</UButton>
              <UButton id="nav-drawer-whatsapp" size="xl" icon="mdi-whatsapp"
                to="https://democratischverzet.nl/whatsapp-invite" block color="secondary" target="_blank">
                WhatsApp groep</UButton>
              <!-- <UButton size="xl" icon="mdi-euro" block color="secondary" to="/doneer" @click="open = false">Doneer
              </UButton> -->
            </div>



            <div class="flex gap-1 justify-center">
              <UButton id="nav-drawer-substack" size="lg" icon="bi-substack"
                to="https://democratischverzet.substack.com/" square variant="ghost" color="neutral" target="_blank">
              </UButton>
              <UButton id="nav-drawer-instagram" size="lg" icon="mdi-instagram"
                to="https://www.instagram.com/democratischverzet/" square variant="ghost" color="neutral"
                target="_blank">
              </UButton>
              <UButton id="nav-drawer-facebook" size="lg" icon="mdi-facebook"
                to="https://www.facebook.com/democratischverzet/" square variant="ghost" color="neutral"
                target="_blank"></UButton>
              <UButton id="nav-drawer-linkedin" size="lg" icon="mdi-linkedin"
                to="https://www.linkedin.com/company/democratisch-verzet/" square variant="ghost" color="neutral"
                target="_blank"></UButton>

              <UButton id="nav-drawer-youtube" size="lg" icon="mdi-youtube"
                to="https://www.youtube.com/@democratischverzet" square variant="ghost" color="neutral" target="_blank">
              </UButton>

            </div>



          </div>

        </template>
      </UDrawer>
    </div>

  </UContainer>

</template>