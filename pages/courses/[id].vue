<template>
  <div class="flex w-full justify-between">
    <div class="w-3/4">
      <div class="w-full">
        <div :key="selectedVideo?.id">
          <vue-plyr :key="selectedVideo?.id" ref="plyr">
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
              :checked="selectedVideo?.is_watched"
              class="h-4 w-4 rounded border-gray-300 bg-orange-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-orange-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
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
    <div class="h-screen w-1/4 bg-orange-100 px-4">
      <div class="flex flex-col gap-5">
        <div
          tabindex="0"
          v-for="(vid, index) in course?.video"
          :title="vid.title ?? ''"
          @click="() => selectVideo(vid as any)"
          :key="vid.id"
          @keyup.enter="() => selectVideo(vid as any)"
          class="relative flex cursor-pointer"
          :class="{
            'rounded-xl ring-4 ring-orange-400 ring-offset-2': selectedVideo?.id === vid.id,
          }"
        >
          <div
            class="absolute top-0 h-full w-full rounded-xl bg-gradient-to-t from-orange-900/80 via-10% to-orange-400/0"
          ></div>
          <NuxtImg :src="vid.thumbnail!" class="rounded-xl" />
          <svg
            v-if="vid.is_watched"
            class="absolute right-1 top-0 h-8 w-8"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="#fb923c"
              d="m23.5 17l-5 5l-3.5-3.5l1.5-1.5l2 2l3.5-3.5zM12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0 8c.5 0 .97-.07 1.42-.21c-.27.71-.42 1.43-.42 2.21v.45l-1 .05c-5 0-9.27-3.11-11-7.5c1.73-4.39 6-7.5 11-7.5s9.27 3.11 11 7.5c-.25.64-.56 1.26-.92 1.85c-.9-.54-1.96-.85-3.08-.85c-.78 0-1.5.15-2.21.42c.14-.45.21-.92.21-1.42a5 5 0 0 0-5-5a5 5 0 0 0-5 5a5 5 0 0 0 5 5"
            />
          </svg>
          <div class="absolute bottom-2 left-2 text-lg text-white">
            {{
              `${index + 1}- ${vid.title?.length && vid.title.length > 23 ? vid.title?.slice(0, 20) + '...' : vid.title}`
            }}
          </div>
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

const client = useSupabaseClient<Database>();

const selectedVideo = ref();
const route = useRoute();

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

const { data: course } = await client
  .from('course')
  .select('*, video(*)')
  .eq('id', route.params.id)
  .single();

if (course?.video.length) {
  course?.video.sort((a, b) => a.row - b.row);
  const unwatchedVideo = course.video.find((item) => !item.is_watched);
  if (!unwatchedVideo) {
    selectedVideo.value = course.video[0];
  } else {
    selectedVideo.value = unwatchedVideo;
  }
}

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
      if (
        selectedVideo.value &&
        progress > 0.95 &&
        !selectedVideo.value.is_watched &&
        !isSending.value
      ) {
        isSending.value = true;
        changeIsWatched(true);
      }
    });
  });
});
</script>
