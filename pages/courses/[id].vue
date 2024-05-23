<template>
  <div class="flex w-full justify-between">
    <div class="w-3/4">
      <div class="w-full">
        <div :key="selectedVideo">
          <vue-plyr ref="plyr">
            <div class="plyr__video-embed">
              <iframe
                :src="
                  selectedVideoSource === 'youtube'
                    ? `https://www.youtube.com/embed/${selectedVideo}?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`
                    : `https://player.vimeo.com/video/${selectedVideo}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`
                "
                allowfullscreen
                allowtransparency
                allow="autoplay"
              ></iframe>
            </div>
          </vue-plyr>
        </div>
      </div>
      <div class="">
        <div class="pb-5 text-2xl font-bold text-black">{{ selectedVideo }}</div>
        <Tags :tags="['1', '2']" />
      </div>
      <div class="">
        <img
          v-if="selectedVideoSource === 'youtube'"
          :src="`https://img.youtube.com/vi/${selectedVideo}/mqdefault.jpg`"
          alt="video thumbnail"
        />
        <img v-else :src="selectedVideoThumbnail" alt="video thumbnail" />
      </div>
    </div>
    <div class="h-screen w-1/4 bg-gray-100 p-4">
      <div class="flex flex-col gap-3">
        <div
          class="cursor-pointer text-lg font-normal hover:text-gray-700"
          v-for="vid in videoList"
          @click="() => selectVideo(vid.link, vid.source)"
        >
          {{ vid.link }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Video } from '@/types/Types';
import type Plyr from 'plyr';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const selectedVideo = ref('bTqVqk7FSmY');
const selectedVideoSource = ref('513415111');
const selectedVideoThumbnail = ref('');
const route = useRoute();
// get the course details
console.log(route.params.id);

const getThumbnail = async () => {
  if (selectedVideoSource.value === 'vimeo') {
    const { data } = await useAsyncData('notes', async () =>
      $fetch(`https://vimeo.com/api/v2/video/${selectedVideo.value}.json`)
    );
		const thumbnail = (data.value as any)[0].thumbnail_medium;
		console.log((data.value as any)[0].thumbnail_medium)
    selectedVideoThumbnail.value = thumbnail;
  }
};

watch(selectedVideoSource, () => {
  getThumbnail();
});

const selectVideo = (link: string, source: 'youtube' | 'vimeo') => {
  selectedVideo.value = link;
  selectedVideoSource.value = source;
};

const plyr = ref<{ player: Plyr } | null>(null);
onMounted(async () => {
  await nextTick(() => {
    console.log(plyr.value!.player);
    plyr.value!.player.on('ready', (event) => console.log('progess', event));
  });
});

const videoList: Array<Video> = [
  {
    id: '0',
    link: '513415111',
    source: 'vimeo',
  },
  {
    id: '1',
    link: 'bTqVqk7FSmX',
    source: 'youtube',
  },
  {
    id: '2',
    link: 'V4a_J38XdHk',
    source: 'youtube',
  },
  {
    id: '1',
    link: 'bTqVqk7FSmY',
    source: 'youtube',
  },
  {
    id: '2',
    link: 'bTqVqk7FSmD',
    source: 'youtube',
  },
  {
    id: '1',
    link: 'bTqVqk7FSmY',
    source: 'youtube',
  },
  {
    id: '2',
    link: 'bTqVqk7FSmY',
    source: 'youtube',
  },
  {
    id: '1',
    link: 'bTqVqk7FSmY',
    source: 'youtube',
  },
  {
    id: '2',
    link: 'bTqVqk7FSmY',
    source: 'youtube',
  },
  {
    id: '1',
    link: 'bTqVqk7FSmY',
    source: 'youtube',
  },
  {
    id: '2',
    link: 'bTqVqk7FSmY',
    source: 'youtube',
  },
  {
    id: '1',
    link: 'bTqVqk7FSmY',
    source: 'youtube',
  },
  {
    id: '2',
    link: 'bTqVqk7FSmY',
    source: 'youtube',
  },
];
</script>
