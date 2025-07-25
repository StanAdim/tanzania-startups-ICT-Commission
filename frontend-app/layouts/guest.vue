<script setup lang="ts">
</script>

<template>
  <div>
    <div class="">
        <LandingTopHeader />
      <!--      Nav-->
      <div class="bg-fade">
        <GuestNav />
      </div>
      <!--      Content-->
      <div class="mx-auto px-4">
        <slot />
      </div>
      <!--      Footer-->
      <div class=""></div>
    </div>
  </div>
</template>

<style scoped>

</style>
