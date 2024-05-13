<template>
	<div class="relative max-w-7xl mx-auto">
		<div class="flex flex-row flex-wrap w-full space-x-4 max-w-full justify-center">
			<Card @click="navigateTo('/courses/1')" class="cursor-pointer" :course="{
				name: 'Drawing with charcoal',
				tags: ['tag 1', 'tag 2', 'charcoal'],
				id: '1',
			}" />
			<Card @click="navigateTo('/courses/2')" class="cursor-pointer" :course="{
				name: 'Programming with Me',
				tags: ['tag 1', 'tag 2', 'coding'],
				id: '1',
			}" />
			<Card @click="navigateTo('/courses/1')" class="cursor-pointer" :course="{
				name: 'Drawing with charcoal',
				tags: ['tag 1', 'tag 2', 'charcoal'],
				id: '1',
			}" />
			<Card @click="navigateTo('/courses/2')" class="cursor-pointer" :course="{
				name: 'Programming with Me',
				tags: ['tag 1', 'tag 2', 'coding'],
				id: '1',
			}" />
			<Card @click="navigateTo('/courses/1')" class="cursor-pointer" :course="{
				name: 'Drawing with charcoal',
				tags: ['tag 1', 'tag 2', 'charcoal'],
				id: '1',
			}" />
			<Card @click="navigateTo('/courses/2')" class="cursor-pointer" :course="{
				name: 'Programming with Me',
				tags: ['tag 1', 'tag 2', 'coding'],
				id: '1',
			}" />
		</div>
	</div>
</template>
