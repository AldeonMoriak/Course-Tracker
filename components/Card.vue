<template>
  <div tabindex="0" class="m-4 w-1/3 rounded bg-orange-200">
    <div class="flex h-64 flex-col gap-y-4">
      <NuxtImg
        class="h-[80%] w-full rounded object-cover"
        v-if="course.video.length"
        :src="course.video[0].thumbnail ?? undefined"
        fit="cover"
      />
      <div v-else class="h-[80%] w-full rounded bg-orange-400"></div>
      <div class="flex flex-col gap-4">
        <div class="p-2 font-bold text-orange-900">{{ course.title }}</div>
        <Tags v-if="course.tags" :tags="course.tags" />
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
