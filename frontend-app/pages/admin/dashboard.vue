<script setup lang="ts">
import {useGeneralStore} from "~/stores/useGeneralStore";

definePageMeta({
  title: 'Profile - Profile Name',
  layout: 'admin',
  middleware:['auth', 'admin-role-checker'],
})
const globalData = useGlobalDataStore()
const genStore = useGeneralStore()

const dataItems = computed(() => [
  { title: 'ICT Startups', path: '/admin/profiles/startups', size: genStore.getProfilesCountAdmin?.approved_startups,  minTitle: 'All ' , total: genStore.getProfilesCountAdmin?.startups },
  { title: 'ICT Innovation Hubs', path: '/admin/profiles/hubs', size: genStore.getProfilesCountAdmin?.approved_hubs,  minTitle: 'All ' , total: genStore.getProfilesCountAdmin?.hubs },
  { title: 'Digital Accelerators', path: '/admin/profiles/accelerators', size: genStore.getProfilesCountAdmin?.approved_accelerators,  minTitle: 'All ' , total: genStore.getProfilesCountAdmin?.accelerators },
  { title: 'Grassroot Programs', path: '/admin/profiles/grassroots', size: genStore.getProfilesCountAdmin?.approved_grassroots,  minTitle: 'All ' , total: genStore.getProfilesCountAdmin?.grassroots },
  { title: 'All Products', path: '/admin/products', size: genStore.getProfilesCountAdmin?.approved_products,  minTitle: 'All ' , total: genStore.getProfilesCountAdmin?.products },
  { title: 'All Projects', path: '/admin/projects', size: genStore.getProfilesCountAdmin?.approved_projects,  minTitle: 'All ' , total: genStore.getProfilesCountAdmin?.projects },
])
const init = async () => {
  globalData.assignPageTitle('Admin Dashboard')
  await genStore.retrieveProfilesCounts()
}
onNuxtReady(()=> {
  init()
})
</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2 my-2 p-2 rounded-lg bg-sky-50" >
      <AuthWildCard
          v-for="item in dataItems"
          :key="item.path"
          :title="item.title"
          :path="item.path"
          :size="item.size"
          :total="item.total"
          :minTitle="item.minTitle"
      />
    </div>

  </div>
</template>

<style scoped></style>
