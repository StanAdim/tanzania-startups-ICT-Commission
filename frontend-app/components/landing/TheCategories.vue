<script setup lang="ts">
const categories = [
  {title: 'ICT Startups',
    icon: 'startups.png',
    aosForm:'zoom-in',
    target: 'ict-startups',
    registration: '/registrations/ict-startups',
    description : 'Early-stage ICT companies.',
    tooltip: 'Entrepreneurs developing new ICT products or services to meet market demand.',
    style: 'bg-blue-400 text-white'},
  { title: 'ICT Incubation Hubs',
    icon: 'Innovation-hubs.png',
    aosForm:'zoom-in',
    target: 'innovation-hubs',
    registration: '/registrations/innovation-hubs',
    description : 'Centers supporting startup growth.',
    tooltip: 'Spaces for digital technology innovators with prototypes or MVPs ready for use.',
    style: 'bg-green-400 text-black'
  },
]
const goToCategory = (target) => {
  if (target) window.location.href = `/profiles/${target}`;
}
</script>

<template>
  <div class="container mx-auto md:mt-4">
    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
      <div
        v-for="item in categories"
        :key="item.title"
        :class="['category-card', item.style]"
        :data-aos="item?.aosForm"
        @click="goToCategory(item.target)"
        tabindex="0"
        role="button"
        @keyup.enter="goToCategory(item.target)"
        :aria-label="item.title"
      >
        <div class="flex flex-col items-center justify-center p-4 relative">
          <img :src="`/images/icons/${item.icon}`" :alt="item.title + ' icon'" class="w-16 h-16 mb-2 object-contain" />
          <div class="font-bold text-lg mb-1">{{ item.title }}</div>
          <div class="text-sm mb-2 text-center">{{ item.description }}</div>
          <span class="absolute left-1/2 -translate-x-1/2 bottom-[-2.2rem] z-10 w-max px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none">{{ item.tooltip }}</span>
          <nuxt-link :to="item.registration" class="mt-4 w-full flex justify-center">
            <button class="rounded-full bg-white text-sky-700 font-bold py-2 px-6 text-base shadow hover:bg-sky-50 hover:text-sky-900 transition border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400" :aria-label="'Register as ' + item.title">
              Register as {{ item.title }}
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-8">
      <nuxt-link to="/profiles/explore">
        <button class="rounded-full bg-gradient-to-r from-sky-700 to-green-600 text-white font-semibold py-4 px-12 text-lg shadow-lg hover:scale-105 hover:from-sky-800 hover:to-green-700 transition">See All</button>
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped>
.category-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border-radius: 1rem;
  margin-bottom: 2rem;
  position: relative;
}
.category-card:hover, .category-card:focus {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 6px 24px rgba(0,0,0,0.10);
  outline: 2px solid #0ea5e9;
}
.category-card .group:hover span, .category-card:focus span {
  opacity: 1 !important;
}
@media (max-width: 640px) {
  .category-card {
    margin-bottom: 2.5rem;
  }
}
</style>