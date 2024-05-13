<template>
  <div class="flex flex-wrap gap-2">
    <div v-for="tag in tags" class="bg-gray-300 text-black font-thin max-w-28 rounded px-1 py-0.5">
      {{ tag }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ tags: string[] }>();
</script>
