<template>
  <div
    class="duration-500
		transition-all
		bg-gray-100
		min-w-360px
		max-w-7xl
		min-h-screen
		mx-auto
		flex flex-col"
  >
    <nav class="bg-white px-4 py-2">
      <ul class="flex w-full gap-4">
        <li>
          <NuxtLink active-class="underline text-gray-400" to="/">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink active-class="underline text-gray-400" to="/notes">Notes</NuxtLink>
        </li>
        <li>
          <NuxtLink active-class="underline text-gray-400" to="/courses/">Courses</NuxtLink>
        </li>
      </ul>
    </nav>
		<div class="mx-auto max-w-3xl w-full mt-5">
    <slot />
		</div>
  </div>
</template>

<script setup lang="ts">
	const user = useSupabaseUser()

</script>
