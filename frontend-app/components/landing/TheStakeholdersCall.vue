<template>
  <div class="flex flex-col md:flex-row flex-wrap container mx-auto py-12 md:py-20 items-center">
    <div class="md:w-1/2 w-full flex justify-center mb-8 md:mb-0">
      <div data-aos-delay="500" data-aos="flip-down" class="bg-cover h-[40vh] md:h-[60vh] w-full max-w-xs md:max-w-md bg-center bg-no-repeat bg-[url('/images/img(6).png')] rounded-xl shadow-lg"></div>
    </div>
    <div class="md:w-1/2 w-full p-8 rounded-lg bg-fade space-y-6 flex flex-col items-start">
      <!-- Headline -->
      <h2 class="text-4xl font-bold text-gray-800 mb-2"><span class="text-green-600" data-aos-delay="600" data-aos="zoom-out">Join the Movement</span></h2>
      <!-- Description -->
      <p class="text-gray-700 mb-4">
        The ICT Commission invites all stakeholders to collaborate in building a structured, reliable, and competitive digital innovation ecosystem in Tanzania. Together, we can drive socio-economic growth and contribute to global digital progress.
      </p>
      <!-- Stakeholder Roles -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <GuestButtonCard to="https://www.bot.go.tz/DFDI/Sandbox" label="Fintec" icon="fa-solid fa-coins" data-aos="zoom-in" />
        <GuestButtonCard to="https://www.tcra.go.tz/" label="Communication" icon="fa-solid fa-signal" data-aos="zoom-in" />
        <GuestButtonCard to="https://www.cmsa.go.tz/" label="Capital Investments" icon="fa-solid fa-chart-line" data-aos="zoom-in" />
        <GuestButtonCard to="https://www.nmbbank.co.tz/" label="Cooperate Financial Solutions" icon="fa-solid fa-building-columns" data-aos="zoom-in" />
        <GuestButtonCard to="/" label="Management" icon="fa-solid fa-users-cog" data-aos="zoom-in" />
      </div>
      <!-- Testimonial/Quote -->
      <blockquote class="mt-6 border-l-4 border-green-600 pl-4 italic text-gray-600">
        “Collaboration is the key to unlocking Tanzania’s digital potential.”<br/>
        <span class="font-semibold text-green-700">— ICT Commission</span>
      </blockquote>
    </div>
  </div>
</template>

<style scoped>
.bg-fade {
  background: linear-gradient(90deg, #f0fdf4 0%, #f1f5f9 100%);
}
</style>
<script setup lang="ts">
</script>