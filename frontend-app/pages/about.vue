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
  <div class="container mx-auto">
    <div class=" mx-2">
      <div class="bg-sky-50 py-8 pt-10">
        <div class="  px-4 sm:px-6 lg:px-8">
          <div class="">
<!--            Who we Are-->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 lg:gap-8">
              <div class="">
                <h2 data-aos="slide-down" class="text-2xl font-extrabold text-sky-900 sm:text-4xl">
                  Who We Are
                </h2>
                <p class="mt-3 text-xl sm:mt-4">
                  Tanzania ICT Startup is a platform governed by the ICT Commission of Tanzania. It is designed to register ICT startups, hubs, and accelerators and ensure their recognition and promotion to digital consumers, investors, and business partners. The platform connects these entities with market opportunities, investors, and corporate partners by facilitating visibility and credibility.
                  Aligned with the ICT Commission’s mandate, this platform fosters innovation, drives investment in the ICT sector, and supports research on emerging digital trends. We are committed to creating a collaborative environment where registered startups, hubs, and accelerators can access the resources and networks needed to thrive, contributing to Tanzania’s growing digital economy.
                  We also encourage the growth of grassroots programs aimed at nurturing ICT talent and fostering innovation from the ground up. These programs ensure that emerging startups and innovators from all regions of Tanzania can access the support they need to develop and scale their solutions.
                </p>
              </div>
              <div class="flex justify-center items-center">
                <img  data-aos="slide-left" src="/images/img(2).png" alt="">
              </div>
            </div>
<!--            What we Do -->
            <div class="">
              <div class="" >
                <h2 data-aos="fade-up" class="text-2xl font-extrabold text-sky-900 sm:text-4xl mt-4">
                  What We Do
                </h2>
                <p class="mt-3 text-xl sm:mt-4">
                  Tanzania ICT Startup provides a comprehensive platform for registering and supporting ICT startups, hubs, accelerators, and grass-root ICT innovation programs in Tanzania. Our key offerings include:
                </p>
                <div class="my-4">
                  <ul class="mt-3 text-xl grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 lg:gap-8">
                    <li class="ml-4  rounded-lg  px-2 py-3 bg-sky-200" v-for="item in keyFunctions" data-aos="zoom-in">
                      <b class="px-2 text-sky-900">{{item?.key}}: </b> <br /> <span class="">{{ item?.description}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>


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
