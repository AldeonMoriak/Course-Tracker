<template>
  <div class="flex flex-col gap-4 bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
    <label class="block text-sm text-gray-600">
      Course Name
      <input
        type="text"
        v-model="course.name"
        class="block w-full rounded-md border-gray-300 bg-gray-100 px-4 py-2 text-gray-600 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </label>
    <label class="block text-sm text-gray-600">
      Course Description
      <textarea
        type="text"
        v-model="course.description"
        class="block w-full rounded-md border-gray-300 bg-gray-100 px-4 py-2 text-gray-600 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      ></textarea>
    </label>
    <div class="flex flex-wrap gap-4" v-if="course?.videos.length">
      <div class="w-72 rounded bg-blue-100 p-2" v-for="video in course.videos" :key="video.link">
        <NuxtImg :src="video.thumbnail" />
        <div>{{ video.title }}</div>
      </div>
    </div>
    <div v-else class="text-red-400">
      No Videos Added yet. Add by clicking on "+" button on the bottom right side of your browser
    </div>
    <button
      class="mb-3 inline-flex w-full justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
      @click="() => addCourse()"
    >
      Add Course
    </button>
    <Teleport to="body">
      <div v-if="isModalShown">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed bottom-0 z-50 w-full bg-white">
          <div class="mx-auto max-w-2xl">
            <div class="h-10"></div>
            <div class="flex flex-col gap-4">
              <label class="block text-sm text-gray-600">
                Video URL
                <input
                  type="url"
                  v-model="tempURL"
                  class="block w-full rounded-md border-gray-300 bg-gray-100 px-4 py-2 text-gray-600 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </label>
              <template v-if="tempVideo.link">
                <label class="block text-sm text-gray-600">
                  Video Name
                  <input
                    type="url"
                    v-model="tempVideo.title"
                    class="block w-full rounded-md border-gray-300 bg-gray-100 px-4 py-2 text-gray-600 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </label>
                <label class="block text-sm text-gray-600">
                  Video Thumbnail
                  <img :src="tempVideo.thumbnail" alt="video thumbnail" class="pt-4" />
                </label>
              </template>
            </div>
          </div>
          <div class="h-20"></div>
          <div class="mx-auto flex max-w-2xl gap-4">
            <button
              v-if="tempVideo.thumbnail"
              class="mb-3 inline-flex w-full justify-center rounded-md border border-transparent bg-green-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
              @click="() => addVideo()"
            >
              Add Video
            </button>
            <button
              v-else
              class="mb-3 inline-flex w-full justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
              @click="() => checkURL()"
            >
              Check URL
            </button>
            <button
              class="mb-3 inline-flex w-full justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
              @click="() => closeModal()"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Teleport>
    <div class="fixed bottom-10 right-10 flex items-center justify-center">
      <button
        class="rounded-full bg-blue-200 px-4 py-2 text-xl text-gray-800 hover:bg-blue-400 hover:text-white"
        @click="() => (isModalShown = true)"
        title="Add New Video"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Course, Video } from '~/types/Types';
import type { Database } from '~/types/database.types';
const session = useSupabaseSession();

const isModalShown = ref(false);
const course = ref<Course>({
  id: '',
  name: '',
  tags: [],
  videos: [],
  description: '',
  user_id: session.value!.user.id,
});
const tempURL = ref('');
const initialVideo: Video = {
  id: '',
  link: '',
  source: 'youtube',
  thumbnail: '',
  title: '',
  course_id: '',
} as const;
const tempVideo = ref<Video>({ ...initialVideo });

watch(tempURL, () => {
  tempVideo.value = { ...initialVideo };
});

function addVideo() {
  if (!tempVideo.value.thumbnail) return;
  course.value?.videos.push(tempVideo.value);
  closeModal();
}

const client = useSupabaseClient<Database>();

async function addCourse() {
  if (!course.value.name || !course.value.name || !course.value.videos.length) return;
  const { data } = await client
    .from('course')
    .insert({
      title: course.value.name,
      description: course.value.description,
      user_id: course.value.user_id,
    })
    .select()
    .single();

  if (data?.id) {
    course.value.videos.map((vid) => (vid.course_id = data.id));

    await client.from('video').insert(course.value.videos);
  }
}

function closeModal() {
  isModalShown.value = false;
  tempURL.value = '';
  tempVideo.value = initialVideo;
}

function checkURL() {
  function matchYoutubeUrl(url: string) {
    var p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      return url.match(p)![1];
    }
    return false;
  }

  async function matchVimeoUrl(url: string) {
    const { data } = await useAsyncData('vimeo', async () =>
      $fetch(`https://vimeo.com/api/oembed.json?url=${url}`)
    );
    const result = data.value as any;
    if (result && result.video_id) {
      return {
        video_id: result.video_id,
        thumbnail: result.thumbnail_url,
        title: result.title,
      };
    }
    return false;
  }

  const result = matchYoutubeUrl(tempURL.value);
  if (result) {
    tempVideo.value.link = result;
    tempVideo.value.source = 'youtube';
    tempVideo.value.thumbnail = `https://img.youtube.com/vi/${result}/mqdefault.jpg`;
  } else {
    matchVimeoUrl(tempURL.value).then((vimeoResult) => {
      if (vimeoResult) {
        tempVideo.value.link = vimeoResult.video_id;
        tempVideo.value.source = 'vimeo';
        tempVideo.value.thumbnail = vimeoResult.thumbnail;
        tempVideo.value.title = vimeoResult.title;
      }
    });
  }
}
</script>
