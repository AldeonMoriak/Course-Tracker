<template>
  <div>
    <div class="flex w-full max-w-full flex-row flex-wrap justify-center space-x-4">
      <Card
        @click="navigateTo('/courses/1')"
        class="cursor-pointer"
        :course="{
          name: 'Drawing with charcoal',
          tags: ['tag 1', 'tag 2', 'charcoal'],
          id: '1',
        }"
      />
      <Card
        @click="navigateTo('/courses/2')"
        class="cursor-pointer"
        :course="{
          name: 'Programming with Me',
          tags: ['tag 1', 'tag 2', 'coding'],
          id: '1',
        }"
      />
      <Card
        @click="navigateTo('/courses/1')"
        class="cursor-pointer"
        :course="{
          name: 'Drawing with charcoal',
          tags: ['tag 1', 'tag 2', 'charcoal'],
          id: '1',
        }"
      />
      <Card
        @click="navigateTo('/courses/2')"
        class="cursor-pointer"
        :course="{
          name: 'Programming with Me',
          tags: ['tag 1', 'tag 2', 'coding'],
          id: '1',
        }"
      />
      <Card
        @click="navigateTo('/courses/1')"
        class="cursor-pointer"
        :course="{
          name: 'Drawing with charcoal',
          tags: ['tag 1', 'tag 2', 'charcoal'],
          id: '1',
        }"
      />
      <Card
        @click="navigateTo('/courses/2')"
        class="cursor-pointer"
        :course="{
          name: 'Programming with Me',
          tags: ['tag 1', 'tag 2', 'coding'],
          id: '1',
        }"
      />
    </div>
    <div class="fixed bottom-10 right-10 flex items-center justify-center">
      <button
        class="rounded-full bg-blue-200 px-4 py-2 text-xl text-gray-800 hover:bg-blue-400 hover:text-white"
        @click="() => navigateTo('/courses/new-course')"
				title="Add New Course"
      >
        +
      </button>
    </div>
  </div>
</template>
