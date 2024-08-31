<template>
  <div
    class="min-w-360px mx-auto flex min-h-screen flex-col bg-orange-50 text-orange-900 transition-all duration-500"
  >
    <nav class="mx-auto max-w-6xl bg-orange-50 px-4 py-2">
      <ul class="flex w-full gap-4 text-orange-900">
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
        <li>
          <span
            class="cursor-pointer"
            tabindex="0"
            v-if="user?.id"
            @keyup.enter="exit"
            @click="exit"
            >Sign Out</span
          >
        </li>
      </ul>
    </nav>
    <div class="mx-auto mt-5 w-full max-w-6xl">
      <slot class="text-orange-900" />
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const exit = async () => {
  if (confirm('Are you sure you want to exit from your account?')) {
    await supabase.auth.signOut();
    navigateTo('/login');
  }
};
</script>
