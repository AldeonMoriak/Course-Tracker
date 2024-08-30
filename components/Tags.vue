<template>
  <div class="flex flex-wrap gap-2">
    <div v-for="tag in tags" class="max-w-28 rounded bg-gray-300 px-1 py-0.5 font-thin text-black">
      {{ tag.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tag } from '~/types/Types';

const props = defineProps<{ tags: Tag[] }>();
</script>
