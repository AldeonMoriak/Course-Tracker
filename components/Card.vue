<template>
  <div class="bg-gray-200 rounded p-2 w-1/3 m-4">
    <div class="flex flex-col h-72 gap-y-4">
      <div class="bg-yellow-300 rounded w-full h-[80%]"></div>
      <div class="flex flex-col gap-4">
        <div class="text-gray-600 font-bold">{{ course.name }}</div>
        <Tags :tags="course.tags" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Course } from '@/types/Types';
const props = defineProps<{
  course: Course;
}>();
</script>
