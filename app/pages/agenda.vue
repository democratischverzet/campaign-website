<script setup>

const tag = ref()
onMounted(() => {
  const params = new URLSearchParams(document.location.search);
  tag.value = params.get("tag") || '';
})

</script>

<template>

  <!-- The container is now correctly set to a column direction -->
  <div
    style="position: fixed; top: 90px; left: 0; width: 100%; height: calc(100% - 90px); display: flex; flex-direction: column;">

    <!-- This iframe will now grow vertically to fill the available space -->
    <iframe :src="`https://lu.ma/embed/calendar/cal-pTzFNGJnHUszRei/events?tag=${tag}`" width="100%" frameborder="0"
      allowfullscreen="" aria-hidden="false" tabindex="0" style="flex-grow: 1; border: none;">
    </iframe>

    <!-- This div will take up only the space its content needs at the bottom -->
    <div
      style="width: 100%; padding: 16px; background-color: #fff; display: flex; justify-content: center; align-items: center; gap:8px 16px; flex-wrap:wrap; text-align: center">
      <div v-if="!tag">Iedereen kan een evenement organiseren voor Democratisch Verzet!</div>
      <div v-else>Is er geen <strong>{{ tag }}</strong> evenement? Organiseer er zelf een of bekijk alle evenementen.
      </div>
      <div style="display: flex; justify-content: center; align-items: center; gap:8px; flex-wrap:wrap">
        <a href="/organiseer-evenement">
          <button
            style="padding: 12px 16px; border-radius:8px;font-size: 16px; cursor: pointer;background:var(--ui-secondary);color:white;font-weight:bold">Organiseer
            een evenement</button>
        </a>
        <a href="/agenda" rel="noopener noreferrer" v-if="tag">
          <button
            style="padding: 12px 16px; border-radius:8px;font-size: 16px; cursor: pointer;background:var(--ui-secondary);color:white;font-weight:bold">Bekijk
            alle evenementen</button>
        </a>
      </div>
    </div>
  </div>

  <a href="https://lu.ma/democratischverzet/map"
    style="position:fixed;top:106px;right:16px;background:white;padding:4px 8px;border-radius:8px;border:1px solid #ccc;text-decoration:none">🇳🇱
    Bekijk kaart</a>


</template>
