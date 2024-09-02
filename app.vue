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
    <UModal
      v-model="isOpen"
      prevent-close
      :ui="{
        overlay: { background: 'bg-primary-500/50 dark:bg-primary-500/50' },
      }"
    >
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-primary-50 dark:divide-primary-50',
          background: 'bg-white dark:bg-white',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-primary-900 text-base font-semibold leading-6">Sign Out Modal</h3>
            <UButton
              color="primary"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <div class="text-primary-950">Are you sure you want to sign out from this website?</div>
        <template #footer>
          <div class="flex gap-2">
            <UButton
              color="primary"
              variant="solid"
              @click="exit"
              label="Yes"
              icon="i-heroicons-check-20-solid"
            />
            <UButton
              color="primary"
              variant="outline"
              icon="i-heroicons-x-mark-20-solid"
              @click="isOpen = false"
              label="Close"
            />
          </div>
        </template>
      </UCard>
    </UModal>
    <div class="mx-auto mt-5 w-full max-w-6xl">
      <NuxtPage />
    </div>
  </div>
  <UNotifications />
</template>

<script setup lang="ts">
import type { HorizontalNavigationLink } from './node_modules/@nuxt/ui/dist/runtime/types/index.d.ts';
const supabase = useSupabaseClient();
const user = await supabase.auth.getUser();

const isOpen = ref(false);

defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [isOpen],
    handler: () => {
      isOpen.value = false;
    },
  },
});

useHead({
  title: 'Course Tracker',
  meta: [{ name: 'description', content: 'A site to manage your learning courses' }],
});

const exit = async () => {
  await supabase.auth.signOut();
  isOpen.value = false;
  localStorage.clear();
  navigateTo('/login');
};

const links = computed(() => {
  const list: HorizontalNavigationLink[][] = [
    [
      {
        label: 'Home',
        icon: 'i-heroicons-home',
        to: '/',
      },
      {
        label: 'Courses',
        icon: 'i-heroicons-film',
        to: '/courses',
      },
    ],
  ];
  if (user.data.user?.id) {
    list.push([
      {
        label: 'Sign Out',
        icon: 'i-heroicons-arrow-right-on-rectangle-20-solid',
        click: () => (isOpen.value = true),
      },
    ]);
  }
  return list;
});
</script>
