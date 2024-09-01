<template>
  <div
    class="min-w-360px mx-auto box-content flex min-h-screen flex-col bg-orange-50 text-orange-900 transition-all duration-500"
  >
    <UHorizontalNavigation
      :links="links"
      class="mx-auto max-w-6xl bg-orange-50 px-4 py-2 text-orange-900"
      :ui="{
        active:
          'text-primary-900 dark:text-primary-900 after:bg-primary-500 dark:after:bg-primary-400 after:rounded-full',
        inactive:
          'text-primary-500 dark:text-primary-400 hover:text-primary-900 dark:hover:text-white',
        before: 'hover:before:bg-primary-50 dark:hover:before:bg-primary-800/50',
        icon: {
          active: 'text-primary-700 dark:text-primary-600',
          inactive:
            'text-primary-200 dark:text-primary-400 group-hover:text-primary-200 dark:group-hover:text-primary-200',
        },
      }"
    />
    <!-- <nav class="mx-auto max-w-6xl bg-orange-50 px-4 py-2"> -->
    <!--   <ul class="flex w-full gap-4 text-orange-900"> -->
    <!--     <li> -->
    <!--       <NuxtLink exact-active-class="underline text-orange-600" to="/">Home</NuxtLink> -->
    <!--     </li> -->
    <!--     <li> -->
    <!--       <NuxtLink -->
    <!--         :class="{ 'text-orange-600 underline': $route.path.startsWith('/courses') }" -->
    <!--         to="/courses" -->
    <!--         >Courses</NuxtLink -->
    <!--       > -->
    <!--     </li> -->
    <!--     <li> -->
    <!--       <span -->
    <!--         class="cursor-pointer" -->
    <!--         tabindex="0" -->
    <!--         v-if="user?.id" -->
    <!--         @keyup.enter="exit" -->
    <!--         @click="exit" -->
    <!--         >Sign Out</span -->
    <!--       > -->
    <!--     </li> -->
    <!--   </ul> -->
    <!-- </nav> -->
    <div class="mx-auto mt-5 w-full max-w-6xl">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient();
const user = await supabase.auth.getUser();

useHead({
  title: 'Course Tracker',
  meta: [{ name: 'description', content: 'A site to manage your learning courses' }],
});

const exit = async () => {
  if (confirm('Are you sure you want to exit from your account?')) {
    await supabase.auth.signOut();
    localStorage.clear();
    navigateTo('/login');
  }
};

const links = [
  [
    {
      label: 'Home',
      icon: 'i-heroicons-home',
      to: '/',
      class: 'text-orange-900',
    },
    {
      label: 'Courses',
      icon: 'i-heroicons-film',
      to: '/courses',
    },
  ],
  [
    {
      label: 'Sign Out',
      icon: 'i-heroicons-arrow-right-on-rectangle-20-solid',
      click: exit,
    },
  ],
];
</script>
