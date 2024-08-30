<template>
  <div>
    <div class="flex w-full max-w-full flex-row flex-wrap justify-center space-x-4">
      <Card
        class="cursor-pointer"
        v-for="course in courses"
        @click="navigateTo(`/courses/${course.id}`)"
        @keyup.enter="() => navigateTo(`/courses/${course.id}`)"
        :course="course"
      />
    </div>
    <div class="fixed bottom-10 right-10 flex items-center justify-center">
      <button
        class="rounded-full bg-blue-200 px-4 py-2 text-xl text-gray-800 hover:bg-blue-400 hover:text-white"
        @click="() => navigateTo('/courses/new-course')"
        title="Add New Course"
      >
        +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Database } from '~/types/database.types';

const session = useSupabaseSession();

const client = useSupabaseClient<Database>();
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
</script>
