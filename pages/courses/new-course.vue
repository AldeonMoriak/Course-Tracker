<template>
  <div class="flex flex-col gap-4 bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
    <label class="block text-sm text-orange-600">
      Course Name
      <input
        type="text"
        v-model="course.title"
        class="block w-full rounded-md border-orange-300 bg-orange-100 px-4 py-2 text-orange-600 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </label>
    <label class="block text-sm text-orange-600">
      Course Description
      <textarea
        type="text"
        v-model="course.description"
        class="block w-full rounded-md border-orange-300 bg-orange-100 px-4 py-2 text-orange-600 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      ></textarea>
    </label>
    <!-- <label class="block text-sm text-orange-600"> -->
    <!--   Tags -->
    <!--   <input -->
    <!--     type="text" -->
    <!--     v-model="course.tags" -->
    <!--     class="block w-full rounded-md border-orange-300 bg-orange-100 px-4 py-2 text-orange-600 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" -->
    <!--   /> -->
    <!-- </label> -->
    <label class="text-sm text-orange-600"> Videos </label>
    <div class="flex flex-wrap gap-4">
      <div
        class="w-72 rounded bg-blue-100 p-2"
        v-for="video in course.video"
        :key="video.video_id!"
      >
        <NuxtImg :src="video.thumbnail!" />
        <div>{{ video.title }}</div>
      </div>
      <button
        class="w-72 bg-orange-50 p-20 text-orange-600 outline-dashed outline-orange-200 hover:bg-orange-200 hover:outline-orange-500 focus:bg-orange-100 focus:outline-orange-400"
        :class="{ 'mx-auto': !course?.video?.length }"
        @click="
          () => {
            isModalShown = true;
          }
        "
      >
        + Add Video
      </button>
    </div>
    <button
      class="mx-auto mb-3 mt-5 inline-flex w-full max-w-lg justify-center rounded-md border border-transparent bg-orange-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      @click="() => addCourse()"
    >
      Add Course
    </button>
    <AddVideo v-if="isModalShown" :close-modal="closeModal" :add-video="addVideo" />
  </div>
</template>

<script setup lang="ts">
import type { Course, Video } from '~/types/Types';
import type { Database } from '~/types/database.types';
const session = useSupabaseSession();
const toast = useToast();

const isModalShown = ref(false);
const course = ref<Course>({
  title: '',
  tags: [],
  video: [],
  description: '',
  user_id: session.value!.user.id,
});

function addVideo(tempVideo: Video) {
  course.value?.video.push(tempVideo);
  closeModal();
}

const client = useSupabaseClient<Database>();

async function addCourse() {
  if (!course.value.title) {
    toast.add({ title: 'Please enter a Name for the course', color: 'red' });
    return;
  }
  if (!course.value.description) {
    toast.add({ title: 'Please enter a Description for the course', color: 'red' });
    return;
  }
  if (!course.value.video.length) {
    toast.add({ title: 'Please add some videos for the course', color: 'red' });
    return;
  }
  const { data, error: courseError } = await client
    .from('course')
    .insert({
      title: course.value.title,
      description: course.value.description,
      user_id: course.value.user_id,
    })
    .select()
    .single();

  if (data?.id) {
    course.value.video.map((vid, index) => {
      vid.course_id = data.id;
      vid.row = index + 1;
    });

    const { error } = await client.from('video').insert(course.value.video);
    if (error) {
      await client.from('course').delete().eq('id', data.id);
      toast.add({ title: error.message, color: 'red' });
      return;
    }
    navigateTo('/courses');
  } else if (courseError) {
    toast.add({ title: courseError.message, color: 'red' });
  } else {
    toast.add({ title: 'Something went wrong, please try again!', color: 'red' });
  }
}

function closeModal() {
  isModalShown.value = false;
  // tempURL.value = '';
  // tempVideo.value = initialVideo;
}
</script>
