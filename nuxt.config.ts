// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@nuxt/image', '@nuxt/ui', '@vueuse/nuxt'],
  ui: {
    global: true,
  },
  supabase: {
    redirectOptions: {
      cookieRedirect: true,
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: [],
    },
    clientOptions: {
      auth: {
        persistSession: true,
      },
    },
    types: './types/database.types',
  },

  compatibilityDate: '2024-08-20',
});
