<script setup lang="ts">
import {useGeneralStore} from "~/stores/useGeneralStore";

const genStore = useGeneralStore()

const init = async  () => {
  await Promise.all(
      [
        genStore.retrieveProfileCount('startups'),
        genStore.retrieveProfileCount('hubs'),
        genStore.retrieveProfileCount('accelerators'),
        genStore.retrieveProfileCount('grassroots')
      ]
  )
}
onNuxtReady(()=> {
  init()
})
</script>

<template>
  <div class="container mx-auto bg-gray-100/60 p-8 rounded-lg">
    <!-- Left Section: Statistics -->
    <div class=" flex md:flex-row flex-col gap-2 justify-between" data-aos-delay="300" data-aos="fade-right">
      <GuestStatItem color="yellow-500" :number="`${genStore.getGrassrootsCount} +`" label="Grassroot Programs" />
      <GuestStatItem color="blue-500" :number="`${genStore.getStartupsCount} +`" label="ICT Startups" />
      <GuestStatItem color="green-500" :number="`${genStore.getHubsCount} +`" label="Incubation Hubs" />
      <GuestStatItem color="black" :number="`${genStore.getAcceleratorsCount} +`" label="Digital Accelerators" />
    </div>
  </div>
</template>

<style scoped>

</style>