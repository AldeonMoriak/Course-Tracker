<template>
  <div class="flex w-full justify-between">
    <div class="w-3/4">
      <div class="w-full">
        <div :key="selectedVideo?.id">
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
        </div>
      </div>
      <div class="">
        <div class="flex items-center justify-between pb-5">
          <div class="text-2xl font-bold text-black">{{ selectedVideo?.title }}</div>
          <div class="flex items-center">
            <input
              id="default-checkbox"
              type="checkbox"
              @change="changeCheckbox"
              :checked="selectedVideo.is_watched"
              class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
            />
            <label for="default-checkbox" class="ms-2 text-sm font-medium">Watched</label>
          </div>
        </div>
        <Tags :tags="['1', '2']" />
      </div>
      <div class="">
        <div>{{ course?.description }}</div>
      </div>
    </div>
    <div class="h-screen w-1/4 bg-gray-100 p-4">
      <div class="flex flex-col gap-3">
        <div
          class="line-clamp-1 cursor-pointer text-lg font-normal hover:text-gray-700"
          v-for="(vid, index) in course?.video"
          @click="() => selectVideo(vid as any)"
        >
          {{ `${index + 1}- ${vid.title}` }}
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

const selectedVideo = ref();
const route = useRoute();
// get the course details
console.log(route.params.id);

const changeCheckbox = async (event: Event) => {
  if (!event || !event.target) return;
  changeIsWatched((event.target as HTMLInputElement).checked);
};

const changeIsWatched = async (isWatched: boolean) => {
  const { error } = await client
    .from('video')
    .update({ is_watched: isWatched })
    .eq('id', selectedVideo.value.id);
  if (!error) {
    selectedVideo.value.is_watched = isWatched;
  }
  isSending.value = false;
};

const client = useSupabaseClient<Database>();
const { data: course } = await client
  .from('course')
  .select('*, video(*)')
  .eq('id', route.params.id)
  .single();

selectedVideo.value = course?.video.length ? course?.video[0] : undefined;

const selectVideo = (video: Video) => {
  selectedVideo.value = video;
};
const isSending = ref(false);
const plyr = ref<{ player: Plyr } | null>(null);
onMounted(async () => {
  await nextTick(() => {
    //plyr.value!.player.on('ready', (event) => console.log('ready', event));
    plyr.value!.player.on('timeupdate', (event) => {
      const progress = event.detail.plyr.currentTime / event.detail.plyr.duration;
      if (progress > 0.95 && !selectedVideo.value.is_watched && !isSending.value) {
        isSending.value = true;
        changeIsWatched(true);
      }
    });
  });
});
</script>
