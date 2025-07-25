<script setup lang="ts">
definePageMeta({
  title: 'Register',
  layout: 'guest',
})
const globalData = useGlobalDataStore()
const config = useRuntimeConfig();
const options = [
  {label: 'ICT Startup', path: '/registrations/ict-startups' , style: 'bg-blue-400 text-white', icon: 'startups.png', aos: 'fade-up'},
]
const iconPath = (icon) => `/images/icons/${icon}`
</script>

<template>
  <div class="bg-gradient-to-b from-sky-50 to-white min-h-screen flex flex-col justify-center items-center py-12">
    <!-- Hero/Intro Section -->
    <div class="text-center mb-10">
      <h1 class="md:text-4xl text-2xl font-bold appColor mb-2">Register as an ICT Startup</h1>
      <p class="text-lg text-sky-700">Currently, only ICT Startup registration is available. More options coming soon.</p>
    </div>
    <!-- Grid Section -->
    <div class="flex flex-col md:flex-row justify-center items-center gap-6 w-full">
      <div
        v-for="option in options"
        :key="option.label"
        :class="['option-card', option.style]"
        :data-aos="option?.aos" data-aos-duration="1000"
        @click="$router.push(option.path)"
        tabindex="0"
        role="button"
        @keyup.enter="$router.push(option.path)"
        :aria-label="option.label"
      >
        <div class="flex justify-center mb-2">
          <img :data-aos="option?.aos" data-aos-duration="1000" class="h-[50px] w-[50px]" :src="iconPath(option?.icon)" :alt="option.label + ' icon'">
        </div>
        <div class="font-semibold text-xl">{{ option.label }}</div>
        <div class="pt-4 text-center underline">Join</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.option-card {
  cursor: pointer;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
  padding: 2rem 1.5rem;
  min-width: 220px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}
.option-card:hover, .option-card:focus {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 6px 24px rgba(0,0,0,0.10);
  outline: 2px solid #0ea5e9;
  background: #f0f9ff;
}
@media (max-width: 640px) {
  .option-card {
    min-width: 90vw;
    margin-bottom: 2rem;
  }
}
</style>