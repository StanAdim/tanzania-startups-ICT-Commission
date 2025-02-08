<template>
      <div class="flex flex-row flex-wrap  container mx-auto ">
        <div class="md:w-1/2 hidden md:block">
          <div data-aos-delay="500" data-aos="flip-down" class="bg-cover h-[60vh] bg-center bg-no-repeat bg-[url('/images/img(6).png')]" ></div>
        </div>
        <div class="md:w-1/2  p-8 rounded-lg bg-fade space-y-6">
          <!-- Header Text -->
          <div class="space-y-2">
            <h2 class="text-4xl font-bold text-gray-800"><span class="text-green-600" data-aos-delay="600" data-aos="zoom-out">Regulatory Sandboxes</span></h2>
            <p class="text-gray-700">
              ICT Commission commend all stakeholders to join efforts with the ICT Commission in this endeavor of building a structured, reliable, and competitive digital innovation ecosystem in Tanzania with significant socio-economic growth in Tanzania and contribute to the global social welfare through digital innovation.
            </p>
          </div>

          <!-- Stakeholder Roles -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GuestButtonCard to="https://www.bot.go.tz/DFDI/Sandbox" label="Fintec" data-aos="zoom-in" />
            <GuestButtonCard to="https://www.tcra.go.tz/" label="Communication" data-aos="zoom-in" />
            <GuestButtonCard to="https://www.cmsa.go.tz/" label="Capital Investments" data-aos="zoom-in" />
            <GuestButtonCard to="https://www.nmbbank.co.tz/" label="Cooperate Financial Solutions" data-aos="zoom-in" />
            <GuestButtonCard to="/" label="Management" data-aos="zoom-in" />
          </div>

          <!-- Join Us Button -->
<!--          <button type="button" class="sm:w-auto  rounded-full bg-green-600 text-white font-semibold py-4 px-10  hover:bg-green-700">-->
<!--            Join Us →-->
<!--          </button>-->
        </div>
      </div>
</template>

<style scoped>
/* Add any additional styles if needed */
</style>
<script setup lang="ts">
</script>