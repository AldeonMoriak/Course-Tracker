<script setup lang="ts">
const supabase = useSupabaseClient();
const email = ref('');

const user = useSupabaseUser();
const toast = useToast();

if (user.value) navigateTo('/');

const signInWithOtp = async () => {
  if (!email.value) {
    toast.add({ title: 'Please enter a valid email' });
    return;
  }
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo:
        process.env.NODE_ENV === 'production'
          ? 'https://course-tracker.mirshekaran.ir/confirm'
          : 'http://test-aldeon:3000/confirm',
    },
  });
  if (error) {
    toast.add({ title: error.message, color: 'red' });
    return console.log(error);
  }
  toast.add({ title: 'Please check your email for the magic link.' });
};
</script>
<template>
  <div
    class="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0"
  >
    <div
      class="inline-block max-h-screen transform overflow-y-auto overflow-x-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
    >
      <form @submit.prevent="signInWithOtp" class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <label class="block text-sm text-gray-600">
          Email
          <input
            v-model="email"
            type="email"
            class="block w-full rounded-md border-gray-300 bg-gray-100 px-4 py-2 text-gray-600 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </label>
        <div class="bg-gray-50 pb-6 pt-3 sm:flex sm:flex-row">
          <button
            type="submit"
            class="inline-flex w-full justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto sm:text-sm"
          >
            Sign In with E-Mail
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
