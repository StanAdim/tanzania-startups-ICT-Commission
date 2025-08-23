<script setup lang="ts">


definePageMeta({
    layout: 'landing',
  // middleware:'guest'
})
useHead({
  title: 'Landing',
})
const globalData = useGlobalDataStore()
</script>
<template>
  <main class="bg-white min-h-screen">
    <div class="md:container w-full mx-auto px-2 md:px-6 lg:px-8">
      <!-- Hero Section -->
      <section class="md:h-[60vh]" aria-label="Hero">
        <LandingTheHero />
      </section>
      <!-- Categories Section -->
      <section class="section" aria-label="Categories">
        <h2 class="sr-only">Explore Categories</h2>
        <LandingTheCategories />
      </section>
      <!-- Stats Section -->
      <section class="section" aria-label="Ecosystem Stats">
        <h2 class="sr-only">Ecosystem Statistics</h2>
        <LandingTheStats />
      </section>
      <!-- Stakeholders Call Section -->
      <section class="section" aria-label="Stakeholder Call to Action">
        <h2 class="sr-only">Stakeholder Call to Action</h2>
        <LandingTheStakeholdersCall />
      </section>
      <!-- Final Call to Action Section -->
      <section class="section" aria-label="Final Call to Action">
        <h2 class="sr-only">Get Started</h2>
        <LandingCallForAction />
      </section>
    </div>
  </main>
</template>

<style scoped>
.section {
  @apply pt-8;
}
@media (max-width: 640px) {
  .section {
    padding-top: 2rem !important;
  }
}
</style>
