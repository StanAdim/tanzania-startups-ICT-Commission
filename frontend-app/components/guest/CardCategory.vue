<script setup lang="ts">
import LargeBtn from "~/components/usable/large-btn.vue";

const props = defineProps({
  title: {
    default: 'Title',
    type: String
  },
  target: {
    default: '/about#',
    type: String
  },
  description: {
    default: 'Title',
    type: String
  },
  icon: {
    default: 'startup.png',
    type: String
  },
  style: {
    default: 'bg-blue-500 text-white',
    type: String
  }
})
const iconPath = computed(()=> `/images/icons/${props.icon}`)
</script>

<template>
  <div class="card" :class="props.style">
    <div class="card-inner">
      <div class="py-2 flex-1 flex justify-center">
        <!-- Replace with appropriate icon -->
        <img class="h-[60px] w-[60px] " :src="iconPath" :alt="props.title">
      </div>
      <div class="">
        <h2 class="text-xl font-semibold">{{props.title}}</h2>
      </div>
    </div>
    <div class="md:h-[22vh]">
      <p>{{props.description}}</p>
    </div>
    <div class="my-4">
      <NuxtLink class="border-2 border-sky-500 appBg  font-bold text-white  my-4 rounded-full px-8 py-2" :to="`/about#${props.target}`">Read More</NuxtLink>

    </div>
  </div>
</template>

<style scoped>
.card {
  @apply py-1 px-6 mx-2 shadow-2xl   rounded-md
}
.card-inner {
  @apply flex flex-col  space-x-2 mb-4
}
</style>