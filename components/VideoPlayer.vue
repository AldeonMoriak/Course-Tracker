<template>
  <ClientOnly>
    <vue-plyr ref="plyr">
      <div class="plyr__video-embed">
        <iframe
          :src="
            selectedVideo?.source === 'youtube'
              ? `https://www.youtube.com/embed/${selectedVideo?.video_id}?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`
              : `https://player.vimeo.com/video/${selectedVideo?.video_id}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`
          "
          allowfullscreen
          allowtransparency
          allow="autoplay"
        ></iframe>
      </div>
    </vue-plyr>
  </ClientOnly>
</template>

<script setup lang="ts">
import type Plyr from 'plyr';
import type { Video } from '~/types/Types';

const props = defineProps<{ selectedVideo: Video; isSending: boolean }>();
const plyr = ref<{ player: Plyr } | null>(null);

const emit = defineEmits<{
  (e: 'makeVideoWatched'): void;
}>();

onMounted(async () => {
  await nextTick(() => {
    plyr.value?.player.on('timeupdate', (event) => {
      const progress = event.detail.plyr.currentTime / event.detail.plyr.duration;
      if (
        props.selectedVideo &&
        progress > 0.95 &&
        !props.selectedVideo.is_watched &&
        !props.isSending
      ) {
        emit('makeVideoWatched');
      }
    });
  });
});
defineExpose({ plyr });
</script>
