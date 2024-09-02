<template>
  <div>
    <h1 class="text-center text-2xl">Welcome to Course Tracker App</h1>
    <div class="h-10"></div>
    <div class="text-primary-500 text-center text-xl">
      A simple app to track your learning video courses
    </div>
    <div class="text-primary-500 text-center text-xl">
      Go to
      <ULink
        inactive-class="underline underline-offset-2 text-orange-700 dark:text-orange-700 hover:text-orange-500 dark:hover:text-orange-500"
        to="/courses"
        >Courses</ULink
      >
      and start adding courses.
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Course Tracker',
  meta: [{ name: 'description', content: 'A site to manage your learning courses' }],
});
</script>
