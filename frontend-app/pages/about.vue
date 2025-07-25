<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})
useHead({
  title: 'About Tanzania Startups',
})

const keyFunctions = [
  {key: 'Registration & Recognition', description: 'We offer an official platform for ICT startups, hubs, accelerators, and grass-root ICT innovation programs to gain recognition and visibility within the country.'},
  {key: 'Market Linkages', description: 'Connecting startups, institutions, and organizations with investors, corporate partners, and key industry players to unlock growth and business opportunities.'},
  {key: 'Grass-root ICT Innovation Programs', description: 'Supporting local ICT talent, innovation, and institutions through programs aimed at fostering the development of digital solutions across Tanzania.'},
  {key: 'Capacity Building', description: 'Offering resources, training, and workshops to help startups, institutions, and ICT professionals grow and build sustainable businesses.'},
  {key: 'Networking & Partnerships', description: 'Facilitating collaborations between innovators, investors, and industry leaders to create a vibrant digital ecosystem.'},
  {key: 'Access to Funding', description: 'Connecting startups and organizations with investors and funding opportunities to scale their solutions and drive innovation.'},
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
  <div class="bg-gradient-to-b from-sky-50 to-white py-12 md:py-20">
    <div class="container mx-auto px-4">
      <!-- Hero/Intro Section -->
      <div class="flex flex-col md:flex-row items-center mb-12">
        <div class="md:w-2/3">
          <h1 class="text-4xl md:text-5xl font-extrabold text-sky-900 mb-4">About Tanzania ICT Startups</h1>
          <p class="text-lg text-sky-700 mb-4">Empowering innovation, recognition, and growth for Tanzania’s digital future.</p>
        </div>
        <div class="md:w-1/3 flex justify-center">
          <img src="/images/img(2).png" alt="About illustration" class="w-40 md:w-64 rounded-xl shadow-lg" />
        </div>
      </div>
      <!-- Who We Are -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 data-aos="slide-down" class="text-2xl font-extrabold text-sky-900 sm:text-4xl mb-2">Who We Are</h2>
          <p class="mt-3 text-lg sm:mt-4">
            Tanzania ICT Startup is a platform governed by the ICT Commission of Tanzania. It is designed to register ICT startups, hubs, and accelerators and ensure their recognition and promotion to digital consumers, investors, and business partners. The platform connects these entities with market opportunities, investors, and corporate partners by facilitating visibility and credibility.
            Aligned with the ICT Commission’s mandate, this platform fosters innovation, drives investment in the ICT sector, and supports research on emerging digital trends. We are committed to creating a collaborative environment where registered startups, hubs, and accelerators can access the resources and networks needed to thrive, contributing to Tanzania’s growing digital economy.
            We also encourage the growth of grassroots programs aimed at nurturing ICT talent and fostering innovation from the ground up. These programs ensure that emerging startups and innovators from all regions of Tanzania can access the support they need to develop and scale their solutions.
          </p>
        </div>
        <div class="flex flex-col justify-center items-center">
          <blockquote class="border-l-4 border-green-600 pl-4 italic text-gray-600 bg-green-50 p-4 rounded-lg shadow">
            “We believe in a future where every Tanzanian innovator has the opportunity to thrive.”<br/>
            <span class="font-semibold text-green-700">— ICT Commission</span>
          </blockquote>
        </div>
      </div>
      <!-- What We Do -->
      <div class="mb-12">
        <h2 data-aos="fade-up" class="text-2xl font-extrabold text-sky-900 sm:text-4xl mt-4 mb-2">What We Do</h2>
        <p class="mt-3 text-lg sm:mt-4 mb-4">
          Tanzania ICT Startup provides a comprehensive platform for registering and supporting ICT startups, hubs, accelerators, and grass-root ICT innovation programs in Tanzania. Our key offerings include:
        </p>
        <div class="my-4 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
          <div v-for="item in keyFunctions" :key="item.key" class="flex items-start bg-sky-100 rounded-lg p-4 shadow group hover:bg-sky-200 transition">
            <span class="mr-4 text-2xl text-sky-700">
              <i v-if="item.key.includes('Registration')" class="fa-solid fa-id-badge"></i>
              <i v-else-if="item.key.includes('Market')" class="fa-solid fa-link"></i>
              <i v-else-if="item.key.includes('Grass-root')" class="fa-solid fa-seedling"></i>
              <i v-else-if="item.key.includes('Capacity')" class="fa-solid fa-chalkboard-user"></i>
              <i v-else-if="item.key.includes('Networking')" class="fa-solid fa-network-wired"></i>
              <i v-else-if="item.key.includes('Funding')" class="fa-solid fa-coins"></i>
              <i v-else class="fa-solid fa-circle-info"></i>
            </span>
            <div>
              <b class="text-sky-900">{{item.key}}</b>
              <div class="text-gray-700 text-base mt-1">{{ item.description }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Profile Categories -->
      <div class="mb-12">
        <GuestProfileDescription />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
