export default defineNuxtRouteMiddleware((to, _from) => {
  const session = useSupabaseSession()
  const user = useSupabaseUser()

  if (!user.value) {
    return navigateTo('/login')
  }
})
