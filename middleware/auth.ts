export default defineNuxtRouteMiddleware((to, _from) => {
  const session = useSupabaseSession();
  const user = useSupabaseUser();

  console.log(session.value, user.value);
  if (!user.value) {
    return navigateTo('/login');
  }
});
