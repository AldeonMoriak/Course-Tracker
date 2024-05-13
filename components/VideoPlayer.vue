<template>
  <ClientOnly>
    <div>
      <vue-plyr>
        <div data-plyr-provider="youtube" :data-plyr-embed-id="videoId"></div>
      </vue-plyr>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps<{ videoId: string }>();
</script>
