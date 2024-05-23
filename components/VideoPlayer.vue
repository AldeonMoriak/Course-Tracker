<template>
	<ClientOnly>
		<div>
			<vue-plyr ref="plyr">
				<div class="plyr__video-embed">
					<iframe
						:src="source === 'youtube' ?
							`https://www.youtube.com/embed/${videoId}?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1` :
							`https://player.vimeo.com/video/${videoId}?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media`"
						allowfullscreen allowtransparency allow="autoplay"></iframe>
				</div>
			</vue-plyr>
		</div>
	</ClientOnly>
</template>

<script setup lang="ts">
import type Plyr from 'plyr';

const props = defineProps<{ videoId: string; source: 'youtube' | 'vimeo' }>();
const plyr = ref<{player: Plyr} | null>(null)
onMounted(async () => {
	await nextTick(() => {
		console.log(plyr.value!.player);
		plyr.value!.player.on('progress', (event) => console.log('progess', event));
	});
});
defineExpose({ plyr })
</script>
