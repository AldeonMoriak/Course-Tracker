<template>
  <ClientOnly>
    <div>
      <vue-plyr>
        <div data-plyr-provider="youtube" :data-plyr-embed-id="props.videoId"></div>
      </vue-plyr>
      <vue-plyr>
        <div class="plyr__video-embed">
          <iframe
            src="https://www.youtube.com/embed/bTqVqk7FSmY?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
            allowfullscreen
            allowtransparency
            allow="autoplay"
          ></iframe>
        </div>
      </vue-plyr>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const props = defineProps<{ videoId: string }>();
console.log(props.videoId);
</script>
