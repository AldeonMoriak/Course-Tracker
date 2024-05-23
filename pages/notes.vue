<template>
  <div v-for="note in notes">{{ note }}</div>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
const { data: notes } = await useAsyncData('notes', async () => {
  const { data } = await client.from('notes').select();
  return data;
});
</script>
