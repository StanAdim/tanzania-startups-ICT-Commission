<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})
useHead({
  title: 'About Tanzania Startups',
})
const categories = [
  {title: 'ICT Grassroot Programmes', key : 'grassroot-programs',  description: '....'},
  {title: 'ICT Startup', key : 'ict-startups',  description: '....'},
  {title: 'ICT Innovation Hub', key : 'innovation-hubs',  description: '....'},
  {title: 'Digital Accelerators', key : 'digital-accelerators',  description: '....'},
]
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
    <div class=" mx-2">
      <div class="bg-sky-50 py-8 pt-10">
        <div class="max-w-7xl  px-4 sm:px-6 lg:px-8">
          <div class="">
            <h2 class="text-2xl font-extrabold text-sky-900 sm:text-4xl">
              What Does This System Do
            </h2>
            <p class="mt-3 text-xl sm:mt-4">
              An ICT startup ecosystem that seek to fosters innovation, collaboration,
              and growth through technology, entrepreneurship, funding, and supportive networks.
            </p>
            <p class="mt-3 text-xl sm:mt-4">The following are the systems registration stakeholders
            </p>
            <div class="mt-2" v-for="category in categories" :id="category?.key" :key="category?.title">
              <h3 class="text-lg font-extrabold text-sky-900  mt-4">{{category?.title}}</h3>
              <p class="mt-3 sm:mt-4 h-[20vh]"> {{ category?.description }}</p>
            </div>

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
