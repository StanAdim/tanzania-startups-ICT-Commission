<script setup lang="ts">
definePageMeta({ layout: 'landing',})
useHead({ title: 'Profile List',})
const route = useRoute()
const globalData = useGlobalDataStore()
const generalStore = useGeneralStore()

const renderTitle = computed(() => {
  return route.params.profile_type
      .replace('-', ' ') // Replace hyphens with spaces
      .split(' ') // Split the string into words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' '); // Join the words back into a single string
});

const category = ref('')
const init = async  () => {
  switch (route.params.profile_type){
    case 'grassroot-programmes':
      category.value = 'grassroots';
      break;
    case 'ict-startups':
      category.value = 'startups';
      break;
      case 'digital-accelerators':
      category.value = 'accelerators';
      break;
    case 'innovation-hubs':
      category.value = 'hubs';
      break;
    default:
      category.value = 'startups'

  }
  await generalStore.retrieveApprovedProfiles(category.value)
}
onNuxtReady(()=> {
  init()
})
const headers = ref(['Sn', "Name",'Based On', "Location"])
</script>
<template>
  <div class="container mx-auto">
    <div class=" mx-2">
      <div class="bg-sky-50 py-8 pt-10">
        <div class="w-full  px-4 sm:px-6 lg:px-8">
          <div class="">
            <h3 data-aos="slide-down" data-aos-duration="1000" class="text-lg font-extrabold text-sky-900  mt-4">Approved {{ renderTitle }}</h3>
                <UsableProfilesTable :data="generalStore.getApprovedProfiles?.data" :headers="headers" />
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
