<template>
  <div class="m-4 w-1/3 rounded bg-gray-200 p-2">
    <div class="flex h-72 flex-col gap-y-4">
      <div class="h-[80%] w-full rounded bg-yellow-300"></div>
      <div class="flex flex-col gap-4">
        <div class="font-bold text-gray-600">{{ course.title }}</div>
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
