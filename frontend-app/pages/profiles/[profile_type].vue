<script setup lang="ts">
import Router from "#app/plugins/router";

definePageMeta({
  layout: 'landing',
})
useHead({
  title: 'Profile List',
})
const categories = [
  {title: 'ICT Grassroot Programmes', key : 'grassroot-programs',  description: '....'},
  {title: 'ICT Startup', key : 'ict-startups',  description: '....'},
  {title: 'ICT Innovation Hub', key : 'innovation-hubs',  description: '....'},
  {title: 'Digital Accelerators', key : 'digital-accelerators',  description: '....'},
]
const globalData = useGlobalDataStore()
const init = async  () => {
  console.log('Profile type Page')
}
onNuxtReady(()=> {
  init()
})

const route = useRoute()

const renderTitle = computed(() => {
  return route.params.profile_type
      .replace('-', ' ') // Replace hyphens with spaces
      .split(' ') // Split the string into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' '); // Join the words back into a single string
});
const headers = ref(['Sn', "Name","Location"])
const profiles = [
  {name: ' Name', loc: 'None'},
  {name: ' Name', loc: 'None'},
  {name: ' Name', loc: 'None'},
  {name: ' Name', loc: 'None'},
]

</script>
<template>
  <div class="container mx-auto">
    <div class=" mx-2">
      <div class="bg-sky-50 py-8 pt-10">
        <div class="w-full  px-4 sm:px-6 lg:px-8">
          <div class="">
            <h3 class="text-lg font-extrabold text-sky-900  mt-4"> Registered {{ renderTitle }}</h3>
                <UsableProfilesTable :data="profiles" :headers="headers" />
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
