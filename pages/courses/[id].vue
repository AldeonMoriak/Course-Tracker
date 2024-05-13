<template>
  <div class="flex justify-between w-full">
    <div class="w-3/4">
      <div class="w-full">
        <VideoPlayer :video-id="selectedVideo" />
      </div>
      <div class="">
        <div class="text-black font-bold text-2xl pb-5">{{ selectedVideo }}</div>
        <Tags :tags="['1', '2']" />
      </div>
    </div>
    <div class="bg-gray-100 w-1/4 h-screen p-4">
      <div class="flex flex-col gap-3">
        <div
          class="text-lg font-normal cursor-pointer hover:text-gray-700"
          v-for="vid in videoList"
          @click="() => selectVideo(vid.link)"
        >
          {{ vid.link }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Video } from '@/types/Types';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const selectedVideo = ref('bTqVqk7FSmY');
const route = useRoute();
// get the course details
//route.params.id

const selectVideo = (link: string) => (selectedVideo.value = link);

const videoList: Array<Video> = [
  {
    id: '1',
    link: 'bTqVqk7FSmX',
  },
  {
    id: '2',
    link: 'V4a_J38XdHk',
  },
  {
    id: '1',
    link: 'bTqVqk7FSmY',
  },
  {
    id: '2',
    link: 'bTqVqk7FSmD',
  },
  {
    id: '1',
    link: 'bTqVqk7FSmY',
  },
  {
    id: '2',
    link: 'bTqVqk7FSmY',
  },
  {
    id: '1',
    link: 'bTqVqk7FSmY',
  },
  {
    id: '2',
    link: 'bTqVqk7FSmY',
  },
  {
    id: '1',
    link: 'bTqVqk7FSmY',
  },
  {
    id: '2',
    link: 'bTqVqk7FSmY',
  },
  {
    id: '1',
    link: 'bTqVqk7FSmY',
  },
  {
    id: '2',
    link: 'bTqVqk7FSmY',
  },
];
</script>
