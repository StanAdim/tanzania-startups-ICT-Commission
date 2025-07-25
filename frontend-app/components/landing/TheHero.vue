<script setup lang="ts">

</script>

<template>
  <div class="relative bg-gradient-to-b from-white via-sky-50 to-white py-10 md:py-20">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <div class="md:w-1/2 mx-4">
        <!-- Tagline -->
        <div class="text-green-700 font-semibold text-lg md:text-xl mb-2 md:mb-4" data-aos="fade-in">
          Empowering Tanzania’s Digital Future
        </div>
        <!-- Title -->
        <div class="md:text-[60px] text-[30px] md:mt-2 mt-2">
          <div class="leading-none py-0.5 font-extrabold" data-aos="fade-up"><span class="appColor">ICT Innovation</span> </div>
          <div class="leading-none py-0.5 font-extrabold appColor" data-aos="slide-left">and</div>
          <div class="leading-none py-0.5 font-extrabold appColor" data-aos="fade-left">Promotion Portal</div>
        </div>
        <!-- Description -->
        <div class="mt-4">
          <div class="md:w-2/3">
            <p class="desc">This portal registers
              <span>ICT Startups</span>,
              <span>Digital accelerators</span>,
              <span>Incubation Hubs</span>
              and <span>Grassroot Programs</span> along with their on going
              Projects and Products to create a network of actors in the
              ICT business ecosystem.</p>
          </div>
        </div>
        <!-- Buttons -->
        <div class="mt-6 flex gap-4 flex-wrap">
          <nuxt-link to="/register" >
            <button data-aos="slide-left"  type="button" class="sm:w-auto rounded-full bg-green-600 text-white font-semibold py-4 px-10 hover:bg-green-700">
              Register Now →
            </button>
          </nuxt-link>
          <nuxt-link to="/about">
            <button type="button" class="sm:w-auto rounded-full border-2 border-green-600 text-green-700 font-semibold py-4 px-10 hover:bg-green-50">
              Learn More
            </button>
          </nuxt-link>
        </div>
      </div>
      <div class="md:w-1/2 w-full flex justify-center mt-10 md:mt-0">
        <div class="bg-cover h-[32vh] md:h-[60vh] w-full max-w-xs md:max-w-md bg-center bg-no-repeat bg-[url('/images/img-opt.png')] rounded-xl shadow-lg" data-aos="fade-down"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.desc span{
  @apply font-bold text-black
}
</style>