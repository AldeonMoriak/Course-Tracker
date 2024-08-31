<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Course Tracker',
  meta: [{ name: 'description', content: 'A site to manage your learning courses' }],
});
</script>
