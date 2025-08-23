<script setup lang="ts">
import TheBtnLoader from "~/components/usable/TheBtnLoader.vue";

definePageMeta({
  layout: 'guest',
  middleware: 'guest'
})
useHead({
  title: 'Login',
})
const globalData = useGlobalDataStore()
const auth = useAuthStore()
const form_data = reactive({
  email: '',
  password: '',
  rememberMe: ''
})
const handleLogin = async ()=> {
  await auth.login(form_data)
}
const IsNotFilled = computed(() => !(form_data.email.length > 0 && form_data.password.length > 0) )
</script>

<template>
  <div class="bg-gradient-to-b from-sky-50 to-white min-h-screen flex flex-col justify-center items-center py-12 px-2 md:px-0">
    <!-- Hero/Intro Section -->
    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-extrabold text-sky-900 mb-2">Login to Your Account</h1>
      <p class="text-lg text-sky-700">Access your dashboard and manage your ICT Startup profile.</p>
    </div>
    <!-- Login Form Card -->
    <form @submit.prevent="handleLogin" class="bg-white max-w-md w-full mx-auto p-6 md:p-10 rounded-xl shadow-lg flex flex-col gap-4">
      <UsableBaseInput :is-full="false" v-model="form_data.email" type="email" label="Email Address" placeholder="Enter your email" required />
      <UsableBaseInput :is-full="false" v-model="form_data.password" type="password" label="Password" placeholder="Enter your password" required />
      <div class="flex justify-between items-center mb-2">
        <label class="flex items-center text-sm text-gray-600">
          <input type="checkbox" v-model="form_data.rememberMe" class="mr-2" />
          Remember Me
        </label>
        <nuxt-link to="/forgot-password" class="text-sm text-blue-500 hover:underline">Forgot Password?</nuxt-link>
      </div>
      <UsableBaseButton :disabled="IsNotFilled" type="submit" color="blue" class="w-full">Login <TheBtnLoader /></UsableBaseButton>
      <div class="mt-2 text-sm text-center">
        <p>Not registered? <nuxt-link class="appColor hover:text-sky-700 hover:cursor-pointer font-semibold" to="/register">Create Account</nuxt-link></p>
      </div>
    </form>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .max-w-md {
    width: 100% !important;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>