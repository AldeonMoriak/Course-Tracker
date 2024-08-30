<template>
  <div
    class="min-w-360px mx-auto flex min-h-screen flex-col bg-orange-50 text-black transition-all duration-500"
  >
    <nav class="mx-auto max-w-6xl bg-orange-50 px-4 py-2">
      <ul class="flex w-full gap-4 text-black">
        <li>
          <NuxtLink exact-active-class="underline text-orange-600" to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink
            :class="{ 'text-orange-600 underline': $route.path.startsWith('/courses') }"
            to="/courses"
            >Courses</NuxtLink
          >
        </li>
      </ul>
    </nav>
    <div class="mx-auto mt-5 w-full max-w-6xl">
      <slot class="text-black" />
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
</script>
