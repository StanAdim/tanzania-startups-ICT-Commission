<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})
useHead({
  title: 'About Tanzania Startups',
})
const globalData = useGlobalDataStore()
const init = async  () => {
  console.log('About Page')
}
onNuxtReady(()=> {
  init()
})
</script>
<template>
  <div class="container mx-auto">
    <div class="md:h-[60vh] mx-2">
      <div class="bg-sky-50 py-8 pt-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-3xl font-extrabold text-sky-900 sm:text-4xl">
              Tanzania ICT Startups, ICT Innovation Hubs and Accelerator Ecosystem
            </h2>
            <p class="mt-3 text-xl text-sky-500 sm:mt-4">
              An ICT startup ecosystem fosters innovation, collaboration, and growth through technology, entrepreneurship, funding, and supportive networks
            </p>
          </div>
        </div>
        <div class="mt-10 pb-1">
<!--          Something-->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
