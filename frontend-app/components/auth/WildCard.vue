<script setup lang="ts">
const props = defineProps({
  title : {
    default: 'Title',
    type: String
  },
  size : {
    default: 0,
    type: [Number, String]
  },
  path : {
    default: '/',
    type: String
  },
  total : {
      default: 0,
      type: String
  },
  minTitle : {
    default: '',
    type: String
  },
})
</script>

<template>
  <div class="flex-1 bg-sky-100 border border-sky-200 rounded-xl p-6 animate-fade-in">
    <h2 class="text-xl md:text-3xl text-sky-900">
      {{ props.title }} <br><strong>{{ props.size }}</strong>
    </h2>
    <div class="text-sky-900 text-lg">
      Out of
      <strong class="text-gray-600 text-2xl ml-2">{{ props.total }} </strong>
    </div>
    <nuxt-link :to="props.path" class="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-sky-800 hover:bg-sky-900 transition-transform duration-300 hover:scale-105">
      <i class="fa-solid fa-arrow-right-long"></i>
    </nuxt-link>
  </div>
</template>

<style scoped>

</style>