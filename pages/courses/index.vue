<template>
  <div>
    <div
      class="grid justify-items-center gap-4"
      :class="[allCourses?.length ? 'grid-cols-3' : 'grid-cols-1']"
    >
      <Card
        :actions="[
          {
            title: 'Delete',
            callback: handleClickDelete,
          },
          {
            title: 'Edit',
            callback: handleClickEdit,
          },
        ]"
        class="cursor-pointer"
        v-for="course in allCourses"
        @click="navigateTo(`/courses/${course.id}`)"
        @keyup.enter="() => navigateTo(`/courses/${course.id}`)"
        :course="course"
        :key="course.id"
      />
      <button
        tabindex="0"
        class="w-72 rounded-xl bg-orange-50 p-20 text-orange-600 outline-dashed outline-orange-200 hover:bg-orange-200 hover:outline-orange-500 focus:bg-orange-100 focus:outline-orange-400"
        @keyup.enter.stop="
          () => {
            navigateTo('/courses/new-course');
          }
        "
        @click.stop="
          () => {
            navigateTo('/courses/new-course');
          }
        "
      >
        + Add Course
      </button>
    </div>
    <!-- <div class="fixed bottom-10 right-10 flex items-center justify-center"> -->
    <!--   <button -->
    <!--     class="rounded-full bg-orange-200 px-4 py-2 text-xl text-orange-800 hover:bg-orange-400 hover:text-white" -->
    <!--     @click="() => navigateTo('/courses/new-course')" -->
    <!--     title="Add New Course" -->
    <!--   > -->
    <!--     + -->
    <!--   </button> -->
    <!-- </div> -->
  </div>
  <Teleport to="body">
    <form @submit.prevent="editCourse" v-if="isModalShown">
      <div class="fixed inset-0 bg-orange-500 bg-opacity-75 transition-opacity"></div>
      <div class="fixed bottom-0 z-50 w-full bg-white">
        <div class="mx-auto max-w-2xl">
          <div class="h-10"></div>
          <div class="flex flex-col gap-4">
            <label class="block text-sm text-orange-600">
              Course Name
              <input
                ref="titleRef"
                type="text"
                v-model="tempCourse.title"
                class="block w-full rounded-md border-orange-300 bg-orange-100 px-4 py-2 text-orange-600 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </label>
            <label class="block text-sm text-orange-600">
              Course Description
              <textarea
                type="text"
                v-model="tempCourse.description"
                class="block w-full rounded-md border-orange-300 bg-orange-100 px-4 py-2 text-orange-600 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              ></textarea>
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
</template>

<script setup lang="ts">
import type { Database } from '~/types/database.types';
import type { Course } from '~/types/Types';

const toast = useToast();
const session = useSupabaseSession();
const isModalShown = ref(false);
const titleRef = ref(null);
const { focused } = useFocus(titleRef);

const allCourses = ref<Course[]>([]);
const initialCourse: Course = {
  title: '',
  video: [],
  description: '',
  user_id: session.value!.user.id,
};
const tempCourse = ref<Course>({ ...initialCourse });

const handleClickEdit = async (course: Course) => {
  tempCourse.value = { ...course };
  isModalShown.value = true;
  await nextTick();
  focused.value = true;
};

const handleClickDelete = async (course: Course) => {
  if (confirm(`Are you sure you want to delete ${course.title}?`)) {
    const response = await client.from('course').delete().eq('id', course.id!);
    if (response.error) {
      toast.add({ title: response.error.message, color: 'red' });
    } else {
      toast.add({ title: `${course.title} is deleted`, color: 'green' });
      fetchCourses();
    }
  }
};
function closeModal() {
  isModalShown.value = false;
  tempCourse.value = initialCourse;
}

async function editCourse() {
  if (!tempCourse.value.title) {
    toast.add({ title: 'Please enter a Name for the course', color: 'red' });
    return;
  }
  if (!tempCourse.value.description) {
    toast.add({ title: 'Please enter a Description for the course', color: 'red' });
    return;
  }
  if (!tempCourse.value.id) {
    toast.add({ title: 'Something went wrong. Try again!', color: 'red' });
    closeModal();
    return;
  }
  const { error } = await client
    .from('course')
    .update({
      title: tempCourse.value.title,
      description: tempCourse.value.description,
    })
    .eq('id', tempCourse.value.id!);
  if (error) {
    toast.add({ title: error.message, color: 'red' });
    return;
  }
  toast.add({ title: 'Course was successfully edited!', color: 'green' });
  const editedCourse = allCourses.value.find((item) => item.id === tempCourse.value.id);
  editedCourse!.title = tempCourse.value.title;
  editedCourse!.description = tempCourse.value.description;
  closeModal();
}

const client = useSupabaseClient<Database>();

const fetchCourses = async () => {
  const { data: courses } = await client
    .from('course')
    .select('*, video(*)')
    .eq('user_id', session.value!.user.id)
    .order('created_at', {
      ascending: false,
    });

  courses?.map((item) => {
    item.video.sort((a, b) => a.row - b.row);
  });
  allCourses.value = courses as Course[];
};

fetchCourses();
</script>
