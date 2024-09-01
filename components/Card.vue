<template>
  <div tabindex="0" class="w-72 rounded bg-orange-200">
    <div class="relative flex h-64 flex-col gap-y-2">
      <div class="h-[70%]">
        <NuxtImg
          class="h-full w-full rounded-t object-cover"
          v-if="course.video.length"
          :src="course.video[0].thumbnail ?? undefined"
          fit="cover"
        />
        <div v-else class="h-full w-full rounded-t bg-orange-300"></div>
        <UProgress :value="progress" />
      </div>
      <svg
        tabindex="0"
        class="absolute left-1 top-1 h-8 w-8 rounded-full hover:bg-orange-100 focus:bg-orange-100"
        @click.stop="isModalShown = !isModalShown"
        @keyup.enter.stop="isModalShown = !isModalShown"
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
        v-if="isModalShown"
        class="absolute left-1 top-10 rounded bg-orange-50 px-4 py-2 text-orange-900"
      >
        <div
          v-for="action in actions"
          @click.stop="() => action.callback(course)"
          @keyup.enter.stop="() => action.callback(course)"
          class="text-left"
          tabindex="0"
        >
          {{ action.title }}
        </div>
      </div>
      <svg
        v-if="course.video.every((item) => item.is_watched)"
        class="absolute right-1 top-1 h-8 w-8"
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
      <div class="flex flex-col gap-4">
        <UTooltip :ui="{ width: 'max-w-full' }" :text="course?.title ?? ''">
          <div class="truncate p-2 font-bold text-orange-900">
            {{ `${course.title}` }}
          </div>
        </UTooltip>
        <Tags v-if="course.tags" :tags="course.tags" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Course } from '@/types/Types';
const props = defineProps<{
  course: Course;
  actions: { title: string; callback: (course: Course) => void }[];
}>();
const isModalShown = ref(false);
const target = ref(null);
onClickOutside(target, () => (isModalShown.value = false));

const progress = computed(() => {
  if (props.course.video.length) {
    return (
      (props.course.video.filter((item) => item.is_watched).length / props.course.video.length) *
      100
    );
  }
  return 0;
});
console.log(progress.value);
</script>
