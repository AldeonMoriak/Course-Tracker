<template>
  <div
    class="min-w-360px mx-auto flex min-h-screen max-w-7xl flex-col bg-gray-100 transition-all duration-500"
  >
    <nav class="bg-white px-4 py-2">
      <ul class="flex w-full gap-4">
        <li>
          <NuxtLink active-class="underline text-gray-400" to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink active-class="underline text-gray-400" to="/notes">Notes</NuxtLink>
        </li>
        <li>
          <NuxtLink active-class="underline text-gray-400" to="/courses/">Courses</NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="mx-auto mt-5 w-full max-w-6xl">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
</script>
