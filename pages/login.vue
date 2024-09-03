<script setup lang="ts">
const supabase = useSupabaseClient();
const email = ref('');

const user = useSupabaseUser();
const toast = useToast();
const isLoading = ref(false);

if (user.value) navigateTo('/');

const signInWithOtp = async () => {
  if (!email.value) {
    toast.add({ title: 'Please enter a valid email' });
    return;
  }
  isLoading.value = true;
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo:
        process.env.NODE_ENV === 'production'
          ? 'https://course-tracker.mirshekaran.ir/confirm'
          : 'http://localhost:3000/confirm',
    },
  });
  isLoading.value = false;
  if (error) {
    toast.add({ title: error.message, color: 'red' });
    return console.log(error);
  }
  toast.add({ title: 'Please check your email for the magic link.' });
};
</script>

<template>
  <div class="flex items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
    <div
      class="inline-block max-h-screen transform overflow-y-auto overflow-x-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
    >
      <form @submit.prevent="signInWithOtp" class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <label class="block text-sm text-orange-600">
          Email
          <input
            v-model="email"
            type="email"
            class="block w-full rounded-md border-orange-300 bg-orange-100 px-4 py-2 text-orange-600 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </label>
        <div class="pb-6 pt-3">
          <UButton variant="solid" type="submit" :loading="isLoading" label="Send Magic Link" />
        </div>
      </form>
    </div>
  </div>
</template>
