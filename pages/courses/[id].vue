<template>
  <div class="flex w-full justify-between">
    <div class="w-3/4">
      <div class="w-full">
        <div :key="selectedVideo.id">
          <vue-plyr ref="plyr">
            <div class="plyr__video-embed">
              <iframe
                :src="
                  selectedVideo.source === 'youtube'
                    ? `https://www.youtube.com/embed/${selectedVideo.video_id}?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`
                    : `https://player.vimeo.com/video/${selectedVideo.video_id}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`
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
        <div class="pb-5 text-2xl font-bold text-black">{{ selectedVideo.title }}</div>
        <Tags :tags="['1', '2']" />
      </div>
      <div class="">
        <img :src="selectedVideo.thumbnail" alt="video thumbnail" />
      </div>
    </div>
    <div class="h-screen w-1/4 bg-gray-100 p-4">
      <div class="flex flex-col gap-3">
        <div
          class="cursor-pointer text-lg font-normal hover:text-gray-700"
          v-for="vid in course?.video"
          @click="() => selectVideo(vid as any)"
        >
          {{ vid.title }}
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
import type { Database } from '~/types/database.types';

const selectedVideo = ref<any>();
const route = useRoute();
// get the course details
console.log(route.params.id);

const client = useSupabaseClient<Database>();
const { data: course } = await client
  .from('course')
  .select('*, video(*)')
  .eq('id', route.params.id)
  .single();

selectedVideo.value = course?.video ? course?.video[0] : undefined;

const selectVideo = (video: Video) => {
  selectedVideo.value = video;
};

const plyr = ref<{ player: Plyr } | null>(null);
onMounted(async () => {
  await nextTick(() => {
    console.log(plyr.value!.player);
    plyr.value!.player.on('ready', (event) => console.log('progess', event));
  });
});
</script>
