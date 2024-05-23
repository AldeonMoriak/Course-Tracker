<template>
  <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex gap-4 flex-col">
    <label class="block text-sm text-gray-600">
      Course Name
      <input type="text"
        class="block w-full rounded-md border-gray-300 bg-gray-100 px-4 py-2 text-gray-600 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    </label>
    <label class="block text-sm text-gray-600">
      Course Description
      <textarea type="text"
        class="block w-full rounded-md border-gray-300 bg-gray-100 px-4 py-2 text-gray-600 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
    </label>
    <Teleport to="body">
      <div v-if="isModalShown">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="fixed bottom-0 w-full bg-white z-50">
          <div class="max-w-2xl mx-auto">
            <div class="h-10"></div>
            <div class="flex flex-col gap-4">
              <label class="block text-sm text-gray-600">
                Video URL
                <input type="url" v-model="tempURL"
                  class="block w-full rounded-md border-gray-300 bg-gray-100 px-4 py-2 text-gray-600 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
              </label>
              <template v-if="tempVideo.link">
                <label class="block text-sm text-gray-600">
                  Video Name
                  <input type="url" v-model="tempVideo.title"
                    class="block w-full rounded-md border-gray-300 bg-gray-100 px-4 py-2 text-gray-600 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </label>
                <label class="block text-sm text-gray-600">
                  Video Thumbnail
                  <img :src="tempVideo.thumbnail" alt="video thumbnail" class="pt-4" />
                </label>
              </template>
            </div>
          </div>
          <div class="h-20"></div>
          <div class="max-w-2xl mx-auto flex gap-4">
            <button
              class="inline-flex w-full justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto sm:text-sm mb-3"
              @click="() => checkURL()">Check URL</button>
            <button
              class="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto sm:text-sm mb-3"
              @click="() => isModalShown = false">Close</button>
          </div>
        </div>
      </div>
    </Teleport>
    <div class="fixed bottom-10 right-10 flex items-center justify-center">
      <button class="rounded-full bg-blue-200 px-4 py-2 text-xl text-gray-800 hover:bg-blue-400 hover:text-white"
        @click="() => isModalShown = true" title="Add New Video">
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Course, Video } from '~/types/Types';

const isModalShown = ref(false)
const course = ref<Course | null>(null);
const tempURL = ref('')
const tempVideo = ref<Video>({
  id: '',
  link: '',
  source: 'youtube',
  thumbnail: '',
  title: '',
})

watch(tempURL, () => {
  tempVideo.value = {
    id: '',
    link: '',
    source: 'youtube',
    thumbnail: '',
    title: ''
  }
})

const checkURL = () => {
  function matchYoutubeUrl(url: string) {
    var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      return url.match(p)![1];
    }
    return false;
  }

  async function matchVimeoUrl(url: string) {
    const { data } = await useAsyncData('vimeo', async () =>
      $fetch(`https://vimeo.com/api/oembed.json?url=${url}`)
    );
    const result = (data.value as any)
    if (result && result.video_id) {
      return {
        video_id: result.video_id,
        thumbnail: result.thumbnail_url,
        title: result.title,
      }
    }
    return false;
  }

  const result = matchYoutubeUrl(tempURL.value);
  if (result) {
    tempVideo.value.link = result
    tempVideo.value.source = 'youtube'
    tempVideo.value.thumbnail = `https://img.youtube.com/vi/${result}/mqdefault.jpg`
  } else {
    matchVimeoUrl(tempURL.value).then(vimeoResult => {
      if (vimeoResult) {
        tempVideo.value.link = vimeoResult.video_id
        tempVideo.value.source = 'vimeo'
        tempVideo.value.thumbnail = vimeoResult.thumbnail
        tempVideo.value.title = vimeoResult.title
      }
    })
  }
}
</script>
