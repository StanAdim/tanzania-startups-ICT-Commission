<script setup lang="ts">
definePageMeta({
  title: 'Register',
  layout: 'guest',
})
const globalData = useGlobalDataStore()
const config = useRuntimeConfig();
const options = [
  {label: 'ICT Startup', path: '/registrations/ict-startups' , style: 'bg-blue-400 text-white',     icon: 'startups.png',},
  {label: 'Incubation Hub', path: '/registrations/innovation-hubs' , style: 'bg-green-400 text-black',     icon: 'Innovation-hubs.png',},
  {label: 'Digital Accelerator', path: '/registrations/digital-accelerators' , style: 'bg-black text-white',     icon: 'accelerators.png',},
  {label: 'Grassroot Program', path: '/registrations/grassroot-programs' , style: 'bg-yellow-400 text-black',     icon: 'grassroot.png',},
  // "Graphic Designer",
  // "Large Company",
  // "Investor"
]
const iconPath = (icon) => `/images/icons/${icon}`

</script>

<template>
  <div class="bg-cover bg-center h-[80vh]  " style="background-image: url('/images/background/register.jpg');">
        <div class="bg-sky-50/85 w-full h-full flex  flex-col">
          <!-- Heading Section -->
          <div class="text-center my-12 ">
            <!--      <p class="md:text-md text-sm font-semibold appColor uppercase">WELCOME TO {{ config.public.appName }} Ecosystem</p>-->
            <h1 class="md:text-4xl text-2xl font-bold appColor mt-2">Whom would you <br /> like to join as?</h1>
          </div>

          <!-- Grid Section -->
          <div class="flex md:flex-row flex-col justify-center items-center gap-4">
            <div
                v-for="option in options"
                :key="option"
                :class="option.style"
                class="flex md:items-center text-center flex-col justify-center
                hover:text-white text-black hover:cursor-pointer m-1 h-48 w-64 rounded-lg border border-white shadow-md  transition">
              <div class="flex justify-center">
                <!-- Replace with appropriate icon -->
                <img class="h-[50px] w-[50px] " :src="iconPath(option?.icon)" :alt="option.label">
              </div>
              <nuxt-link :to="option.path" >
                <div class=" font-semibold text-xl">{{ option.label }}</div>
                <div class=" pt-4 hover:underline text-center">Join</div>
              </nuxt-link>
            </div>
          </div>
        </div>
  </div>
</template>

<style scoped>

</style>