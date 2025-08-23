<template>
  <div class="max-w-4xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Register Your Startup</h1>
      <p class="text-gray-600">
        Join the Tanzania ICT Commission Startup Ecosystem Platform and connect with opportunities.
      </p>
    </div>

    <!-- Registration Form -->
    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Basic Information -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            v-model="formData.name"
            label="Startup Name"
            placeholder="Enter your startup name"
            required
            :error="errors.name"
          />
          
          <FormInput
            v-model="formData.registration_number"
            label="Registration Number"
            placeholder="Business registration number"
            required
            :error="errors.registration_number"
          />
          
          <FormSelect
            v-model="formData.sector"
            label="Sector"
            :options="sectorOptions"
            placeholder="Select sector"
            required
            :error="errors.sector"
          />
          
          <FormSelect
            v-model="formData.stage"
            label="Development Stage"
            :options="stageOptions"
            placeholder="Select stage"
            required
            :error="errors.stage"
          />
          
          <FormInput
            v-model="formData.date_established"
            type="date"
            label="Date Established"
            required
            :error="errors.date_established"
          />
          
          <FormInput
            v-model="formData.location"
            label="Location"
            placeholder="City, Region"
            required
            :error="errors.location"
          />
          
          <FormInput
            v-model="formData.region"
            label="Region"
            placeholder="Tanzania region"
            required
            :error="errors.region"
          />
        </div>
        
        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Description <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="formData.description"
            rows="4"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': errors.description }"
            placeholder="Describe your startup, mission, and vision..."
            required
          ></textarea>
          <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            v-model="formData.contact_email"
            type="email"
            label="Contact Email"
            placeholder="startup@example.com"
            required
            :error="errors.contact_email"
          />
          
          <FormInput
            v-model="formData.contact_phone"
            type="tel"
            label="Contact Phone"
            placeholder="+255 123 456 789"
            required
            :error="errors.contact_phone"
          />
          
          <FormInput
            v-model="formData.website"
            type="url"
            label="Website"
            placeholder="https://www.startup.com"
            :error="errors.website"
          />
        </div>
        
        <!-- Social Media Links -->
        <div class="mt-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Social Media Links</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              v-model="formData.social_links.linkedin"
              type="url"
              label="LinkedIn"
              placeholder="https://linkedin.com/company/startup"
              :error="errors['social_links.linkedin']"
            />
            
            <FormInput
              v-model="formData.social_links.twitter"
              type="url"
              label="Twitter"
              placeholder="https://twitter.com/startup"
              :error="errors['social_links.twitter']"
            />
            
            <FormInput
              v-model="formData.social_links.facebook"
              type="url"
              label="Facebook"
              placeholder="https://facebook.com/startup"
              :error="errors['social_links.facebook']"
            />
            
            <FormInput
              v-model="formData.social_links.instagram"
              type="url"
              label="Instagram"
              placeholder="https://instagram.com/startup"
              :error="errors['social_links.instagram']"
            />
          </div>
        </div>
      </div>

      <!-- Founders Information -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Founders Information</h2>
          <button
            type="button"
            @click="addFounder"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <i class="fa-solid fa-plus mr-2"></i>
            Add Founder
          </button>
        </div>
        
        <div v-if="formData.founders.length === 0" class="text-center py-8 text-gray-500">
          <i class="fa-solid fa-users text-4xl mb-4"></i>
          <p>No founders added yet. Click "Add Founder" to get started.</p>
        </div>
        
        <div v-else class="space-y-6">
          <div
            v-for="(founder, index) in formData.founders"
            :key="index"
            class="border border-gray-200 rounded-lg p-6"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Founder {{ index + 1 }}</h3>
              <button
                v-if="formData.founders.length > 1"
                type="button"
                @click="removeFounder(index)"
                class="text-red-600 hover:text-red-800"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                v-model="founder.name"
                label="Full Name"
                placeholder="Enter founder's full name"
                required
                :error="errors[`founders.${index}.name`]"
              />
              
              <FormInput
                v-model="founder.role"
                label="Role/Position"
                placeholder="e.g., CEO, CTO, Founder"
                required
                :error="errors[`founders.${index}.role`]"
              />
              
              <FormInput
                v-model="founder.email"
                type="email"
                label="Email"
                placeholder="founder@startup.com"
                required
                :error="errors[`founders.${index}.email`]"
              />
              
              <FormInput
                v-model="founder.phone"
                type="tel"
                label="Phone"
                placeholder="+255 123 456 789"
                required
                :error="errors[`founders.${index}.phone`]"
              />
            </div>
            
            <div class="mt-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Bio <span class="text-red-500">*</span>
              </label>
              <textarea
                v-model="founder.bio"
                rows="3"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :class="{ 'border-red-300 focus:ring-red-500 focus:border-red-500': errors[`founders.${index}.bio`] }"
                placeholder="Brief biography and background..."
                required
              ></textarea>
              <p v-if="errors[`founders.${index}.bio`]" class="mt-1 text-sm text-red-600">
                {{ errors[`founders.${index}.bio`] }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Section -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-medium text-gray-900">Ready to Submit?</h3>
            <p class="text-sm text-gray-500">
              Review your information before submitting. You can edit this later.
            </p>
          </div>
          <div class="flex space-x-4">
            <button
              type="button"
              @click="saveDraft"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <i class="fa-solid fa-save mr-2"></i>
              Save Draft
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i v-if="loading" class="fa-solid fa-spinner fa-spin mr-2"></i>
              <i v-else class="fa-solid fa-paper-plane mr-2"></i>
              {{ loading ? 'Submitting...' : 'Submit Registration' }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { StartupData, Founder } from '~/types/interfaces'

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

useHead({
  title: 'Register Startup - Tanzania Startups'
})

const auth = useAuthStore()
const startupStore = useStartupStore()
const globalStore = useGlobalDataStore()

// Form data
const formData = reactive({
  name: '',
  registration_number: '',
  sector: '',
  stage: '',
  description: '',
  date_established: '',
  location: '',
  region: '',
  contact_email: '',
  contact_phone: '',
  website: '',
  social_links: {
    linkedin: '',
    twitter: '',
    facebook: '',
    instagram: ''
  },
  founders: [] as Omit<Founder, 'id'>[]
})

// Form state
const loading = ref(false)
const errors = reactive<Record<string, string>>({})

// Options for select fields
const sectorOptions = [
  { value: 'fintech', label: 'Financial Technology' },
  { value: 'healthtech', label: 'Health Technology' },
  { value: 'edtech', label: 'Education Technology' },
  { value: 'agritech', label: 'Agriculture Technology' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'logistics', label: 'Logistics & Supply Chain' },
  { value: 'clean_energy', label: 'Clean Energy' },
  { value: 'ai_ml', label: 'Artificial Intelligence & Machine Learning' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'other', label: 'Other' }
]

const stageOptions = [
  { value: 'idea', label: 'Idea Stage' },
  { value: 'mvp', label: 'MVP Development' },
  { value: 'early_traction', label: 'Early Traction' },
  { value: 'growth', label: 'Growth Stage' },
  { value: 'scale', label: 'Scale Stage' }
]

// Methods
const addFounder = () => {
  formData.founders.push({
    name: '',
    role: '',
    email: '',
    phone: '',
    bio: ''
  })
}

const removeFounder = (index: number) => {
  formData.founders.splice(index, 1)
}

const validateForm = (): boolean => {
  errors.value = {}
  
  // Basic validation
  if (!formData.name.trim()) {
    errors.name = 'Startup name is required'
  }
  
  if (!formData.registration_number.trim()) {
    errors.registration_number = 'Registration number is required'
  }
  
  if (!formData.sector) {
    errors.sector = 'Sector is required'
  }
  
  if (!formData.stage) {
    errors.stage = 'Development stage is required'
  }
  
  if (!formData.description.trim()) {
    errors.description = 'Description is required'
  }
  
  if (!formData.date_established) {
    errors.date_established = 'Date established is required'
  }
  
  if (!formData.location.trim()) {
    errors.location = 'Location is required'
  }
  
  if (!formData.region.trim()) {
    errors.region = 'Region is required'
  }
  
  if (!formData.contact_email.trim()) {
    errors.contact_email = 'Contact email is required'
  } else if (!isValidEmail(formData.contact_email)) {
    errors.contact_email = 'Please enter a valid email address'
  }
  
  if (!formData.contact_phone.trim()) {
    errors.contact_phone = 'Contact phone is required'
  }
  
  // Validate founders
  if (formData.founders.length === 0) {
    errors.founders = 'At least one founder is required'
  } else {
    formData.founders.forEach((founder, index) => {
      if (!founder.name.trim()) {
        errors[`founders.${index}.name`] = 'Founder name is required'
      }
      if (!founder.role.trim()) {
        errors[`founders.${index}.role`] = 'Founder role is required'
      }
      if (!founder.email.trim()) {
        errors[`founders.${index}.email`] = 'Founder email is required'
      } else if (!isValidEmail(founder.email)) {
        errors[`founders.${index}.email`] = 'Please enter a valid email address'
      }
      if (!founder.phone.trim()) {
        errors[`founders.${index}.phone`] = 'Founder phone is required'
      }
      if (!founder.bio.trim()) {
        errors[`founders.${index}.bio`] = 'Founder bio is required'
      }
    })
  }
  
  return Object.keys(errors.value).length === 0
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const handleSubmit = async () => {
  if (!validateForm()) {
    globalStore.assignAlertMessage('Please fix the errors before submitting.', 'error')
    return
  }
  
  loading.value = true
  
  try {
    const result = await startupStore.registerStartup(formData)
    
    if (result.success) {
      globalStore.assignAlertMessage('Startup registration submitted successfully!', 'success')
      navigateTo('/dashboard')
    } else {
      globalStore.assignAlertMessage('Failed to submit registration. Please try again.', 'error')
    }
  } catch (error) {
    console.error('Registration error:', error)
    globalStore.assignAlertMessage('An error occurred. Please try again.', 'error')
  } finally {
    loading.value = false
  }
}

const saveDraft = () => {
  // Save form data to localStorage
  localStorage.setItem('startup_registration_draft', JSON.stringify(formData))
  globalStore.assignAlertMessage('Draft saved successfully!', 'success')
}

const loadDraft = () => {
  const draft = localStorage.getItem('startup_registration_draft')
  if (draft) {
    try {
      const parsedDraft = JSON.parse(draft)
      Object.assign(formData, parsedDraft)
    } catch (error) {
      console.error('Error loading draft:', error)
    }
  }
}

// Lifecycle
onMounted(() => {
  // Add at least one founder by default
  if (formData.founders.length === 0) {
    addFounder()
  }
  
  // Load draft if exists
  loadDraft()
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
