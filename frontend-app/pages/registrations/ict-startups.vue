<script setup lang="ts">

definePageMeta({
  title: 'Register',
      layout: 'guest',
})
const genStore = useGeneralStore()
const femaleFounders = [{  label : 'Yes', value: 'Yes'}, {  label : 'No', value: 'No'} ]

const steps = [
  { title: 'Account Information' },
  { title: 'Startup Profile' },
  { title: 'Review & Submit' }
]
const currentStep = ref(0)
const showTip = ref(true)
const registrationComplete = ref(false)
const nextStep = () => { if (currentStep.value < steps.length - 1) currentStep.value++ }
const prevStep = () => { if (currentStep.value > 0) currentStep.value-- }

// Account info
const account = reactive({
  first_name: '',
  middle_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  password: ''
})
// Startup info
const founderList = ref([{ founderName: '', founderPhone: '+255..' }])
const startup = reactive({
    startup_name: '',
    founders: founderList.value,
    region_location: 1,
    email: '',
    phone_number: '+255',
    website: '',
    industry: 1,
    description: '',
    hasFemaleFounder: 'No',
    date_establishment: '',
    funding_stage: 1,
    team_size: 1,
})
const addInput = () => {
  founderList.value.push({ founderName: '', founderPhone: '+255..' })
}
const removeInput = (index) => {
  founderList.value.splice(index, 1)
  if (founderList.value.length === 0) {
    founderList.value.push({ founderName: '', founderPhone: '+255..' })
  }
}
const isAccountStepValid = computed(() => {
  return account.first_name && account.last_name && account.email && account.phone_number && account.password
})
const isStartupStepValid = computed(() => {
  return startup.startup_name && startup.email && startup.phone_number && startup.region_location && startup.industry && startup.funding_stage && startup.team_size && startup.hasFemaleFounder && startup.date_establishment && startup.description && founderList.value.every(f => f.founderName && f.founderPhone)
})
const submitRegistration = () => {
  // Simulate registration success
  registrationComplete.value = true
}
const init = async () => {
  await Promise.all([
        genStore.retrieveSectors(),
        genStore.retrieveFundingStages(),
        genStore.retrieveRegions(),
  ])
}
onNuxtReady(()=> {
  init()
})
</script>

<template>
  <div class="bg-gradient-to-b from-sky-50 to-white min-h-screen py-8 px-2 md:px-0">
    <div class="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
      <!-- Left: Stepper Registration Form -->
      <div class="w-full md:w-4/5">
        <div class="text-center md:text-left mb-8">
          <h1 class="text-3xl md:text-4xl font-extrabold text-sky-900 mb-2">Register Your ICT Startup</h1>
          <p class="text-lg text-sky-700 mb-4">Join Tanzania’s digital innovation ecosystem and unlock new opportunities for your startup.</p>
        </div>
        <!-- Onboarding Tips -->
        <div v-if="showTip" class="mb-6 flex items-start gap-3 bg-blue-50 border-l-4 border-blue-400 rounded p-4 relative">
          <span class="text-2xl text-blue-600 mt-1"><i class="fa-solid fa-circle-info"></i></span>
          <div class="flex-1">
            <b class="text-blue-800">Tip:</b> Have your company info, team details, and a brief description ready. All fields are required for a smooth registration.
          </div>
          <button @click="showTip = false" class="absolute top-2 right-2 text-blue-400 hover:text-blue-700" aria-label="Dismiss onboarding tip"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <!-- Progress Bar -->
        <div class="mb-6 flex flex-col gap-2">
          <div class="flex items-center justify-between mb-1">
            <span v-for="(step, idx) in steps" :key="step.title" class="text-xs font-semibold" :class="currentStep === idx ? 'text-green-700' : 'text-gray-400'">
              {{ step.title }}
            </span>
          </div>
          <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div :style="{ width: ((currentStep+1)/steps.length*100)+'%' }" class="h-full bg-green-500 transition-all duration-300"></div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 lg:p-10">
          <div v-if="!registrationComplete">
            <div v-if="currentStep === 0">
              <h2 class="text-xl font-bold text-sky-800 mb-4 flex items-center gap-2"><i class="fa-solid fa-user"></i> Account Information</h2>
              <form @submit.prevent>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-4">
                  <UsableBaseInput v-model="account.first_name" label="First Name" required />
                  <UsableBaseInput v-model="account.middle_name" label="Middle Name (optional)" />
                  <UsableBaseInput v-model="account.last_name" label="Last Name" required />
                  <UsableBaseInput v-model="account.email" label="Email" type="email" required />
                  <UsableBaseInput v-model="account.phone_number" label="Phone Number" required />
                  <UsableBaseInput v-model="account.password" label="Password" type="password" required />
                </div>
                <div class="flex justify-end mt-4">
                  <button type="button" class="rounded-full bg-green-600 text-white font-bold py-3 px-10 text-lg shadow hover:bg-green-700 transition" @click="nextStep" :disabled="!isAccountStepValid">Next</button>
                </div>
              </form>
            </div>
            <div v-else-if="currentStep === 1">
              <h2 class="text-xl font-bold text-sky-800 mb-4 flex items-center gap-2"><i class="fa-solid fa-building"></i> Startup Profile Information</h2>
              <form @submit.prevent>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-4">
                  <UsableBaseInput v-model="startup.startup_name" label="Startup Name" required />
                  <UsableBaseInput v-model="startup.email" label="Startup Email" type="email" required />
                  <UsableBaseInput v-model="startup.phone_number" label="Startup Phone Number" required />
                  <UsableBaseInput v-model="startup.website" label="Website" />
                  <UsableBaseSelect v-model="startup.region_location" label="Region" :options="genStore.getRegions" required />
                  <UsableBaseSelect v-model="startup.industry" label="Industry | Sector" :options="genStore.getSectors" required />
                  <UsableBaseSelect v-model="startup.funding_stage" label="Funding Stage" :options="genStore.getFundingStage" required />
                  <UsableBaseInput v-model="startup.team_size" label="Team Size" type="number" required />
                  <UsableBaseSelect v-model="startup.hasFemaleFounder" label="Has Female Founder" :options="femaleFounders" required />
                  <UsableBaseInput v-model="startup.date_establishment" label="Date Of Establishment" type="date" required />
                </div>
                <div class="mb-4">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-semibold text-sky-800">Founding Team</span>
                    <span @click="addInput" class="text-xs font-bold hover:cursor-pointer text-sky-600 px-2 py-1 rounded-md bg-sky-100 hover:bg-sky-200"><i class="fa-solid fa-plus"></i> Add Founder</span>
                  </div>
                  <div class="flex flex-col gap-2">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 items-center" v-for="(input, index) in founderList" :key="index">
                      <UsableBaseInput v-model="input.founderName" label="Founder Full Name" required />
                      <UsableBaseInput v-model="input.founderPhone" label="Founder Phone Number" required />
                      <button @click="removeInput(index)" class="text-red-600 text-lg mt-2 md:mt-6" title="Remove Founder">
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="mb-6">
                  <UsableBaseTextArea v-model="startup.description" label="Startup Brief Description" placeholder="Brief on vision and mission of the Startup toward problem solving and service delivering - Less than 200 words" required />
                </div>
                <div class="flex justify-between mt-4">
                  <button type="button" class="rounded-full bg-gray-200 text-gray-700 font-bold py-3 px-10 text-lg shadow hover:bg-gray-300 transition" @click="prevStep">Back</button>
                  <button type="button" class="rounded-full bg-green-600 text-white font-bold py-3 px-10 text-lg shadow hover:bg-green-700 transition" @click="nextStep" :disabled="!isStartupStepValid">Next</button>
                </div>
              </form>
            </div>
            <div v-else-if="currentStep === 2">
              <h2 class="text-xl font-bold text-sky-800 mb-4 flex items-center gap-2"><i class="fa-solid fa-eye"></i> Review & Submit</h2>
              <div class="mb-6">
                <h3 class="font-semibold text-green-700 mb-2">Account Information</h3>
                <ul class="mb-4 text-sm">
                  <li><b>First Name:</b> {{ account.first_name }}</li>
                  <li><b>Middle Name:</b> {{ account.middle_name }}</li>
                  <li><b>Last Name:</b> {{ account.last_name }}</li>
                  <li><b>Email:</b> {{ account.email }}</li>
                  <li><b>Phone Number:</b> {{ account.phone_number }}</li>
                </ul>
                <h3 class="font-semibold text-green-700 mb-2">Startup Profile</h3>
                <ul class="text-sm">
                  <li><b>Startup Name:</b> {{ startup.startup_name }}</li>
                  <li><b>Email:</b> {{ startup.email }}</li>
                  <li><b>Phone Number:</b> {{ startup.phone_number }}</li>
                  <li><b>Website:</b> {{ startup.website }}</li>
                  <li><b>Region:</b> {{ startup.region_location }}</li>
                  <li><b>Industry:</b> {{ startup.industry }}</li>
                  <li><b>Funding Stage:</b> {{ startup.funding_stage }}</li>
                  <li><b>Team Size:</b> {{ startup.team_size }}</li>
                  <li><b>Has Female Founder:</b> {{ startup.hasFemaleFounder }}</li>
                  <li><b>Date of Establishment:</b> {{ startup.date_establishment }}</li>
                  <li><b>Description:</b> {{ startup.description }}</li>
                  <li><b>Founders:</b>
                    <ul class="ml-4">
                      <li v-for="(input, idx) in founderList" :key="idx">{{ input.founderName }} ({{ input.founderPhone }})</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="flex justify-between mt-4">
                <button type="button" class="rounded-full bg-gray-200 text-gray-700 font-bold py-3 px-10 text-lg shadow hover:bg-gray-300 transition" @click="prevStep">Back</button>
                <button type="button" class="rounded-full bg-green-600 text-white font-bold py-3 px-10 text-lg shadow hover:bg-green-700 transition" @click="submitRegistration">Submit Registration</button>
              </div>
            </div>
          </div>
          <!-- Confirmation/Next Steps Page -->
          <div v-else class="flex flex-col items-center justify-center min-h-[300px]">
            <div class="text-green-600 text-5xl mb-4"><i class="fa-solid fa-circle-check"></i></div>
            <h2 class="text-2xl font-bold text-green-700 mb-2">Registration Successful!</h2>
            <p class="text-lg text-gray-700 mb-4 text-center max-w-md">Thank you for registering your ICT Startup. Please check your email for a verification link. Once verified, you can log in and complete your profile or explore the dashboard.</p>
            <nuxt-link to="/login">
              <button class="rounded-full bg-sky-700 text-white font-bold py-3 px-10 text-lg shadow hover:bg-sky-800 transition">Go to Login</button>
            </nuxt-link>
          </div>
        </div>
      </div>
      <!-- Right: Info Box and About ICT Startup -->
      <div class="w-full md:w-2/5 flex flex-col gap-6">
        <div class="p-4 bg-green-50 border-l-4 border-green-600 rounded shadow flex items-start gap-4">
          <span class="text-2xl text-green-700 mt-1"><i class="fa-solid fa-lightbulb"></i></span>
          <div>
            <h2 class="font-bold text-green-800 mb-1">Who should register as an ICT Startup?</h2>
            <ul class="list-disc ml-5 text-green-900 text-sm">
              <li>ICT-focused business or project (software, hardware, digital services, etc.)</li>
              <li>Team size, years of operation, product readiness, and market validation considered</li>
              <li>Registered or intending to register as a business in Tanzania</li>
            </ul>
          </div>
        </div>
        <div class="p-4 bg-sky-50 border-l-4 border-sky-600 rounded shadow">
          <h2 class="font-bold text-sky-800 mb-1">What is an ICT Startup?</h2>
          <p class="text-sky-900 text-sm">
            An ICT Startup is a newly established business or project focused on developing innovative solutions in information and communication technology. This includes software, hardware, digital platforms, and services that address market needs or societal challenges. ICT Startups are typically characterized by their growth potential, use of technology, and drive for innovation.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 1024px) {
  .max-w-5xl {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
@media (max-width: 768px) {
  .flex-row {
    flex-direction: column !important;
  }
  .w-3\/5, .w-2\/5, .w-4\/5 {
    width: 100% !important;
  }
  .gap-8 {
    gap: 2rem !important;
  }
  .grid-cols-2 {
    grid-template-columns: 1fr !important;
  }
}
</style>