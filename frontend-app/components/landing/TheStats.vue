<script setup lang="ts">
import {useGeneralStore} from "~/stores/useGeneralStore";
import { ref, onMounted } from 'vue';

const genStore = useGeneralStore()

const stats = [
  { color: 'blue-500', label: 'ICT Startups', key: 'getStartupsCount', tooltip: 'Registered early-stage ICT companies.', icon: 'startups.png' },
  { color: 'green-500', label: 'Innovation Hubs', key: 'getHubsCount', tooltip: 'Centers supporting startup growth and innovation.', icon: 'Innovation-hubs.png' },
];

const animatedCounts = {
  getStartupsCount: ref(0),
  getHubsCount: ref(0),
};

const animateCount = (key, target) => {
  let start = 0;
  const step = Math.ceil(target / 40);
  const interval = setInterval(() => {
    start += step;
    if (start >= target) {
      animatedCounts[key].value = target;
      clearInterval(interval);
    } else {
      animatedCounts[key].value = start;
    }
  }, 20);
};

const init = async  () => {
  await Promise.all([
    genStore.retrieveProfileCount('startups'),
    genStore.retrieveProfileCount('hubs'),
  ]);
  animateCount('getStartupsCount', genStore.getStartupsCount);
  animateCount('getHubsCount', genStore.getHubsCount);
}
onMounted(init);
</script>

<template>
  <div class="container mx-auto bg-gray-100/60 p-8 rounded-lg">
    <div class="flex flex-col md:flex-row gap-6 md:gap-12 justify-center items-center" data-aos-delay="300" data-aos="fade-right">
      <div v-for="stat in stats" :key="stat.label" class="relative group flex flex-col items-center w-full md:w-auto mb-8 md:mb-0">
        <img :src="`/images/icons/${stat.icon}`" :alt="stat.label + ' icon'" class="w-10 h-10 mb-2" loading="lazy" />
        <GuestStatItem :color="stat.color" :number="`${animatedCounts[stat.key].value} +`" :label="stat.label" />
        <span class="absolute left-1/2 -translate-x-1/2 bottom-[-2.2rem] z-10 w-max px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none">{{ stat.tooltip }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.group:hover span {
  opacity: 1 !important;
}
@media (max-width: 640px) {
  .group {
    margin-bottom: 2.5rem;
  }
}
</style>