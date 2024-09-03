<template>
  <Teleport to="body">
    <form @submit.prevent="submit">
      <div class="fixed inset-0 bg-orange-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed bottom-0 z-50 w-full bg-white px-2">
        <div class="mx-auto max-w-2xl">
          <div class="h-10"></div>
          <div class="flex flex-col gap-4">
            <label class="block text-sm text-orange-600">
              Video URL
              <input
                ref="videoUrlRef"
                placeholder="YouTube or Vimeo video url"
                type="url"
                v-model="tempURL"
                class="mt-2 block w-full rounded-md border-orange-300 bg-orange-100 px-4 py-2 text-orange-600 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </label>
            <template v-if="tempVideo.video_id">
              <label class="block text-sm text-orange-600">
                Video Name
                <input
                  type="text"
                  v-model="tempVideo.title"
                  class="block w-full rounded-md border-orange-300 bg-orange-100 px-4 py-2 text-orange-600 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </label>
              <label class="block text-sm text-orange-600">
                Video Thumbnail
                <img :src="tempVideo.thumbnail!" alt="video thumbnail" class="pt-4" />
              </label>
            </template>
          </div>
        </div>
        <div class="h-20"></div>
        <div class="mx-auto flex max-w-2xl gap-4">
          <button
            type="submit"
            class="min-w-sm mb-3 inline-flex w-full max-w-lg justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
            :class="[tempVideo.thumbnail ? 'bg-orange-700' : 'bg-orange-500']"
          >
            {{ tempVideo.thumbnail ? 'Add Video' : 'Check URL' }}
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
</template>

<script setup lang="ts">
import type { Video } from '~/types/Types';

const props = defineProps<{
  closeModal: () => void;
  addVideo(tempVideo: Video): void;
}>();

const toast = useToast();

const session = useSupabaseSession();

const initialVideo: Video = {
  video_id: '',
  source: 'youtube',
  thumbnail: '',
  title: '',
  course_id: '',
  user_id: session.value!.user.id,
  is_watched: false,
  row: 1,
} as const;

const videoUrlRef = ref();
useFocus(videoUrlRef, { initialValue: true });
const tempURL = ref('');
const tempVideo = ref<Video>({ ...initialVideo });
watch(tempURL, () => {
  tempVideo.value = { ...initialVideo };
});

const submit = () => {
  if (tempVideo.value.thumbnail) {
    if (!tempVideo.value.title) {
      toast.add({ title: 'Please enter a valid Video Name', color: 'red' });
      return;
    }
    props.addVideo(tempVideo.value);
  } else {
    checkURL();
  }
};

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

  if (!tempURL.value) {
    toast.add({ title: 'Please enter a valid Youtube or Vimeo video', color: 'red' });
    return;
  }
  const result = matchYoutubeUrl(tempURL.value);
  if (result) {
    tempVideo.value.video_id = result;
    tempVideo.value.source = 'youtube';
    tempVideo.value.thumbnail = `https://img.youtube.com/vi/${result}/mqdefault.jpg`;
  } else {
    matchVimeoUrl(tempURL.value).then((vimeoResult) => {
      if (vimeoResult) {
        tempVideo.value.video_id = vimeoResult.video_id;
        tempVideo.value.source = 'vimeo';
        tempVideo.value.thumbnail = vimeoResult.thumbnail;
        tempVideo.value.title = vimeoResult.title;
      } else {
        toast.add({ title: 'Please enter a valid Youtube or Vimeo video', color: 'red' });
      }
    });
  }
}
</script>
