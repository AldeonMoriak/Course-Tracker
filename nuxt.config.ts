// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxtjs/tailwindcss', '@nuxtjs/supabase', "@nuxt/image"],
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
				persistSession: true
			}
		}
	},
});