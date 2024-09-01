<template>
  <div class="mb-5 flex w-full justify-between">
    <div class="w-3/4">
      <div class="w-full">
        <template v-if="selectedVideo?.video_id">
          <ClientOnly :key="selectedVideo?.id">
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
          <div class="">
            <div class="flex items-center justify-between pb-5">
              <div class="text-2xl font-bold text-orange-900">{{ selectedVideo?.title }}</div>
              <div class="flex items-center">
                <UCheckbox
                  v-model="selectedVideo.is_watched"
                  label="Watched"
                  @change="changeCheckbox"
                  color="orange"
                />
              </div>
            </div>
            <Tags :tags="['1', '2']" />
          </div>
          <div class="">
            <div>{{ openedCourse?.description }}</div>
          </div>
        </template>
        <div v-else>No Video Selected</div>
      </div>
    </div>
    <div class="w-1/4 bg-orange-50 px-4">
      <div class="flex flex-col gap-5">
        <div
          tabindex="0"
          v-for="(vid, index) in openedCourse?.video"
          @click="() => selectVideo(vid as any)"
          :key="vid.id"
          @keyup.enter="() => selectVideo(vid as any)"
          class="relative flex cursor-pointer rounded-xl focus:outline focus:outline-4 focus:outline-offset-2 focus:outline-orange-700"
          :class="{
            ' ring-4 ring-orange-400 ring-offset-2': selectedVideo?.id === vid.id,
          }"
        >
          <UTooltip :ui="{ width: 'max-w-full' }" :text="vid.title ?? ''">
            <div
              class="absolute top-0 h-full w-full rounded-xl bg-gradient-to-t from-orange-900/80 via-10% to-orange-400/0"
            ></div>
            <svg
              tabindex="0"
              class="absolute left-1 top-1 h-8 w-8 rounded-full hover:bg-orange-100 focus:bg-orange-100"
              @click.stop="isModalShown = vid.id!"
              @keyup.enter.stop="isModalShown = vid.id!"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 20 20"
            >
              <g fill="#ff7800">
                <circle cx="10" cy="15" r="2" />
                <circle cx="10" cy="10" r="2" />
                <circle cx="10" cy="5" r="2" />
              </g>
            </svg>
            <div
              ref="target"
              v-if="isModalShown === vid.id"
              class="absolute left-1 top-10 rounded bg-orange-50 px-4 py-2 text-orange-900"
            >
              <div
                @click.stop="() => handleClickEdit(vid)"
                @keyup.enter.stop="() => handleClickEdit(vid)"
                class="text-left"
                tabindex="0"
              >
                Edit
              </div>
              <div
                @click.stop="() => handleClickDelete(vid)"
                @keyup.enter.stop="() => handleClickDelete(vid)"
                class="text-left"
                tabindex="0"
              >
                Delete
              </div>
            </div>
            <NuxtImg
              placeholder-class="bg-orange-200 w-full h-full"
              :src="vid.thumbnail!"
              class="rounded-xl"
            />
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
            <div class="absolute bottom-2 left-2 max-w-60 truncate text-lg text-white">
              {{ `${index + 1}- ${vid.title}` }}
            </div>
          </UTooltip>
        </div>
        <button
          class="rounded-xl bg-orange-50 py-20 text-orange-600 outline-dashed outline-orange-200 hover:bg-orange-200 hover:outline-orange-500 focus:bg-orange-100 focus:outline-orange-400"
          @keyup.enter.stop="
            () => {
              isAddVideoModalShown = true;
            }
          "
          @click.stop="
            () => {
              isAddVideoModalShown = true;
            }
          "
        >
          + Add Video
        </button>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <form @submit.prevent="editVideo" v-if="isEditModalShown">
      <div class="fixed inset-0 bg-orange-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed bottom-0 z-50 w-full bg-white">
        <div class="mx-auto max-w-2xl">
          <div class="h-10"></div>
          <div class="flex flex-col gap-4">
            <label class="block text-sm text-orange-600">
              Video Name
              <input
                ref="titleRef"
                type="text"
                v-model="tempVideo.title"
                class="block w-full rounded-md border-orange-300 bg-orange-100 px-4 py-2 text-orange-600 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </label>
          </div>
        </div>
        <div class="h-20"></div>
        <div class="mx-auto flex max-w-2xl gap-4">
          <button
            type="submit"
            class="mb-3 inline-flex w-full justify-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
          >
            Edit
          </button>
          <button
            class="mb-3 inline-flex w-full justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-base font-medium text-orange-500 shadow-sm hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
            @click="() => closeModal()"
          >
            Close
          </button>
        </div>
      </div>
    </form>
  </Teleport>
  <AddVideo
    v-if="isAddVideoModalShown"
    :close-modal="() => (isAddVideoModalShown = false)"
    :add-video="addVideo"
  />
</template>

<script setup lang="ts">
import type { Course, Video } from '@/types/Types';
import type Plyr from 'plyr';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Database } from '~/types/database.types';

const toast = useToast();

const client = useSupabaseClient<Database>();

const { y } = useWindowScroll({ behavior: 'smooth' });

const isModalShown = ref('');
const isAddVideoModalShown = ref(false);
const isEditModalShown = ref(false);
const selectedVideo = ref<Video>();
const route = useRoute();

const openedCourse = ref<Course>({
  title: '',
  tags: [],
  video: [],
  description: '',
  user_id: '',
});

const titleRef = ref(null);
const { focused } = useFocus(titleRef);
const initialVideo: Video = {
  video_id: '',
  source: 'youtube',
  thumbnail: '',
  title: '',
  course_id: '',
  user_id: '',
  is_watched: false,
  row: 1,
} as const;

const tempVideo = ref<Video>({ ...initialVideo });

const changeCheckbox = async (event: boolean) => {
  changeIsWatched(event);
};

async function addVideo(tempVideo: Video) {
  const tmp = {
    ...tempVideo,
    row: openedCourse.value.video.length + 1,
    course_id: openedCourse.value.id!,
  };
  const { error } = await client.from('video').insert(tmp).single();
  openedCourse.value?.video.push(tmp);
  isAddVideoModalShown.value = false;
}

const changeIsWatched = async (isWatched: boolean) => {
  const { error } = await client
    .from('video')
    .update({ is_watched: isWatched })
    .eq('id', selectedVideo.value!.id!);
  if (!error) {
    selectedVideo.value!.is_watched = isWatched;
  }
  isSending.value = false;
};

const fetchCourse = async () => {
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

    useHead({
      title: `${course.title} Course - Course Tracker`,
      meta: [{ name: 'description', content: course.description }],
    });
    openedCourse.value = course;
  }
};

fetchCourse();

const selectVideo = (video: Video) => {
  selectedVideo.value = video;
  y.value = 0;
};

const isSending = ref(false);
const plyr = ref<{ player: Plyr } | null>(null);
onMounted(async () => {
  await nextTick(() => {
    plyr.value?.player.on('timeupdate', (event) => {
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

const handleClickEdit = async (video: Video) => {
  tempVideo.value = { ...video };
  isEditModalShown.value = true;
  await nextTick();
  focused.value = true;
};

const handleClickDelete = async (video: Video) => {
  if (confirm(`Are you sure you want to delete ${video.title}?`)) {
    const response = await client.from('video').delete().eq('id', video.id!);
    if (response.error) {
      toast.add({ title: response.error.message, color: 'red' });
    } else {
      toast.add({ title: `${video.title} is deleted`, color: 'green' });
      openedCourse.value.video = openedCourse.value.video.filter((item) => item.id !== video.id);
    }
  }
};
function closeModal() {
  isEditModalShown.value = false;
  tempVideo.value = initialVideo;
}
async function editVideo() {
  if (!tempVideo.value.title) {
    toast.add({ title: 'Please enter a Name for the video', color: 'red' });
    return;
  }
  if (!tempVideo.value.id) {
    toast.add({ title: 'Something went wrong. Try again!', color: 'red' });
    closeModal();
    return;
  }
  const { error } = await client
    .from('video')
    .update({
      title: tempVideo.value.title,
    })
    .eq('id', tempVideo.value.id);
  if (error) {
    toast.add({ title: error.message, color: 'red' });
    return;
  }
  toast.add({ title: 'Video was successfully edited!', color: 'green' });
  const editedCourse = openedCourse.value.video.find((item) => item.id === tempVideo.value.id);
  editedCourse!.title = tempVideo.value.title;
  closeModal();
}
</script>
