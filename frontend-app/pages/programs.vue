<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Acceleration Programs</h1>
        <p class="text-gray-600">
          Discover and apply to acceleration programs that can help your startup grow.
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button
          v-if="auth.isCommissionStaff || auth.isAdmin"
          @click="showCreateModal = true"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <i class="fa-solid fa-plus mr-2"></i>
          Create Program
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormSelect
          v-model="filters.status"
          label="Status"
          :options="statusOptions"
          placeholder="All Statuses"
        />
        
        <FormSelect
          v-model="filters.organizer"
          label="Organizer"
          :options="organizerOptions"
          placeholder="All Organizers"
        />
        
        <FormInput
          v-model="filters.search"
          label="Search"
          placeholder="Search programs..."
          icon="fa-solid fa-search"
        />
      </div>
    </div>

    <!-- Programs Grid -->
    <div v-if="loading" class="text-center py-12">
      <i class="fa-solid fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
      <p class="text-gray-500">Loading programs...</p>
    </div>

    <div v-else-if="filteredPrograms.length === 0" class="text-center py-12">
      <i class="fa-solid fa-inbox text-4xl text-gray-300 mb-4"></i>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No programs found</h3>
      <p class="text-gray-500">
        {{ filters.search || filters.status || filters.organizer ? 'Try adjusting your filters.' : 'No programs are currently available.' }}
      </p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="program in filteredPrograms"
        :key="program.id"
        class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
      >
        <!-- Program Header -->
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                {{ program.name }}
              </h3>
              <p class="text-sm text-gray-600 mb-2">
                <i class="fa-solid fa-building mr-1"></i>
                {{ program.organizer }}
              </p>
            </div>
            <Badge
              :variant="getStatusVariant(program.status)"
              :text="program.status"
              size="sm"
            />
          </div>
          
          <p class="text-gray-700 text-sm line-clamp-3">
            {{ program.description }}
          </p>
        </div>

        <!-- Program Details -->
        <div class="p-6 space-y-4">
          <div class="flex items-center text-sm text-gray-600">
            <i class="fa-solid fa-calendar mr-2"></i>
            <span>Deadline: {{ formatDate(program.deadline) }}</span>
          </div>
          
          <div class="flex items-center text-sm text-gray-600">
            <i class="fa-solid fa-users mr-2"></i>
            <span>{{ program.current_participants }}/{{ program.max_participants }} participants</span>
          </div>
          
          <div class="flex items-center text-sm text-gray-600">
            <i class="fa-solid fa-map-marker-alt mr-2"></i>
            <span>{{ program.region_location || 'N/A' }}</span>
          </div>
        </div>

        <!-- Program Actions -->
        <div class="px-6 pb-6">
          <div class="flex space-x-3">
            <button
              @click="viewProgram(program)"
              class="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <i class="fa-solid fa-eye mr-2"></i>
              View Details
            </button>
            
            <button
              v-if="canApplyToProgram(program)"
              @click="applyToProgram(program)"
              :disabled="hasAppliedToProgram(program.id)"
              class="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i v-if="hasAppliedToProgram(program.id)" class="fa-solid fa-check mr-2"></i>
              <i v-else class="fa-solid fa-paper-plane mr-2"></i>
              {{ hasAppliedToProgram(program.id) ? 'Applied' : 'Apply Now' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Program Modal -->
    <ModalDialog
      v-model="showCreateModal"
      title="Create New Program"
      max-width="2xl"
    >
      <form @submit.prevent="handleCreateProgram" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            v-model="newProgram.name"
            label="Program Name"
            placeholder="Enter program name"
            required
          />
          
          <FormInput
            v-model="newProgram.organizer"
            label="Organizer"
            placeholder="Enter organizer name"
            required
          />
          
          <FormInput
            v-model="newProgram.start_date"
            type="date"
            label="Start Date"
            required
          />
          
          <FormInput
            v-model="newProgram.end_date"
            type="date"
            label="End Date"
            required
          />
          
          <FormInput
            v-model="newProgram.deadline"
            type="date"
            label="Application Deadline"
            required
          />
          
          <FormInput
            v-model="newProgram.max_participants"
            type="number"
            label="Max Participants"
            placeholder="50"
            required
          />
          
          <FormSelect
            v-model="newProgram.status"
            label="Status"
            :options="statusOptions"
            required
          />
          
          <FormInput
            v-model="newProgram.region_location"
            label="Region/Location"
            placeholder="e.g., Dar es Salaam, Tanzania"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Description <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="newProgram.description"
            rows="4"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe the program, its goals, and what participants can expect..."
            required
          ></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Eligibility Criteria <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="newProgram.eligibility_criteria"
            rows="3"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="What are the requirements for startups to participate?"
            required
          ></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Requirements
          </label>
          <textarea
            v-model="newProgram.requirements"
            rows="3"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="What documents or materials do participants need to submit?"
          ></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Benefits
          </label>
          <textarea
            v-model="newProgram.benefits"
            rows="3"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="What benefits will participants receive from this program?"
          ></textarea>
        </div>
      </form>
      
      <template #footer>
        <div class="flex justify-end space-x-3">
          <button
            @click="showCreateModal = false"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            @click="handleCreateProgram"
            :disabled="creatingProgram"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i v-if="creatingProgram" class="fa-solid fa-spinner fa-spin mr-2"></i>
            {{ creatingProgram ? 'Creating...' : 'Create Program' }}
          </button>
        </div>
      </template>
    </ModalDialog>

    <!-- Apply to Program Modal -->
    <ModalDialog
      v-model="showApplyModal"
      title="Apply to Program"
      max-width="lg"
    >
      <form @submit.prevent="handleApplyToProgram" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Why should your startup be selected for this program? <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="applicationData.notes"
            rows="4"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tell us about your startup's potential, challenges, and how this program can help..."
            required
          ></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Supporting Documents
          </label>
          <input
            type="file"
            multiple
            @change="handleFileUpload"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <p class="mt-1 text-sm text-gray-500">
            Upload any relevant documents (business plan, pitch deck, etc.)
          </p>
        </div>
      </form>
      
      <template #footer>
        <div class="flex justify-end space-x-3">
          <button
            @click="showApplyModal = false"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            @click="handleApplyToProgram"
            :disabled="submittingApplication"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i v-if="submittingApplication" class="fa-solid fa-spinner fa-spin mr-2"></i>
            {{ submittingApplication ? 'Submitting...' : 'Submit Application' }}
          </button>
        </div>
      </template>
    </ModalDialog>
  </div>
</template>

<script setup lang="ts">
import type { Program } from '~/types/interfaces'

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

useHead({
  title: 'Acceleration Programs - Tanzania Startups'
})

const auth = useAuthStore()
const programStore = useProgramStore()
const globalStore = useGlobalDataStore()

// Reactive state
const loading = ref(false)
const showCreateModal = ref(false)
const showApplyModal = ref(false)
const selectedProgram = ref<Program | null>(null)
const creatingProgram = ref(false)
const submittingApplication = ref(false)

const filters = reactive({
  status: '',
  organizer: '',
  search: ''
})

const newProgram = reactive({
  name: '',
  organizer: '',
  description: '',
  eligibility_criteria: '',
  start_date: '',
  end_date: '',
  deadline: '',
  status: 'draft',
  max_participants: 50,
  region_location: '',
  requirements: '',
  benefits: ''
})

const applicationData = reactive({
  notes: '',
  documents: [] as File[]
})

// Computed properties
const filteredPrograms = computed(() => {
  let filtered = programStore.programs

  if (filters.status) {
    filtered = filtered.filter(program => program.status === filters.status)
  }
  if (filters.organizer) {
    filtered = filtered.filter(program => program.organizer === filters.organizer)
  }
  if (filters.search) {
    const search = filters.search.toLowerCase()
    filtered = filtered.filter(program => 
      program.name.toLowerCase().includes(search) ||
      program.description.toLowerCase().includes(search) ||
      program.organizer.toLowerCase().includes(search)
    )
  }

  return filtered
})

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'active', label: 'Active' },
  { value: 'closed', label: 'Closed' },
  { value: 'completed', label: 'Completed' }
]

const organizerOptions = computed(() => {
  const organizers = [...new Set(programStore.programs.map((p: Program) => p.organizer))]
  return [
    { value: '', label: 'All Organizers' },
    ...organizers.map((org: any) => ({ value: org, label: org }))
  ]
})

// Methods
const loadPrograms = async () => {
  loading.value = true
  try {
    await programStore.fetchPrograms()
  } catch (error) {
    console.error('Error loading programs:', error)
    globalStore.assignAlertMessage('Failed to load programs.', 'error')
  } finally {
    loading.value = false
  }
}

const viewProgram = (program: Program) => {
  navigateTo(`/programs/${program.id}`)
}

const canApplyToProgram = (program: Program): boolean => {
  if (!auth.isStartupUser) return false
  if (program.status !== 'active') return false
  if (program.current_participants >= program.max_participants) return false
  return true
}

const hasAppliedToProgram = (programId: string): boolean => {
  return programStore.applications.some((app: any) => 
    app.program_id === programId && app.startup_id === auth.getLoggedUserProfile?.profileable?.id
  )
}

const applyToProgram = (program: Program) => {
  selectedProgram.value = program
  showApplyModal.value = true
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    applicationData.documents = Array.from(target.files)
  }
}

const handleApplyToProgram = async () => {
  if (!selectedProgram.value || !applicationData.notes.trim()) {
    globalStore.assignAlertMessage('Please fill in all required fields.', 'error')
    return
  }

  submittingApplication.value = true

  try {
    const result = await programStore.applyToProgram(selectedProgram.value.id, {
      notes: applicationData.notes,
      documents: applicationData.documents
    })

    if (result.success) {
      globalStore.assignAlertMessage('Application submitted successfully!', 'success')
      showApplyModal.value = false
      selectedProgram.value = null
      applicationData.notes = ''
      applicationData.documents = []
    } else {
      globalStore.assignAlertMessage('Failed to submit application. Please try again.', 'error')
    }
  } catch (error) {
    console.error('Application error:', error)
    globalStore.assignAlertMessage('An error occurred. Please try again.', 'error')
  } finally {
    submittingApplication.value = false
  }
}

const handleCreateProgram = async () => {
  if (!newProgram.name || !newProgram.organizer || !newProgram.description) {
    globalStore.assignAlertMessage('Please fill in all required fields.', 'error')
    return
  }

  creatingProgram.value = true

  try {
    const result = await programStore.createProgram(newProgram)

    if (result.success) {
      globalStore.assignAlertMessage('Program created successfully!', 'success')
      showCreateModal.value = false
      
      // Reset form
      Object.assign(newProgram, {
        name: '',
        organizer: '',
        description: '',
        eligibility_criteria: '',
        start_date: '',
        end_date: '',
        deadline: '',
        status: 'draft',
        max_participants: 50,
        region_location: '',
        requirements: '',
        benefits: ''
      })
    } else {
      globalStore.assignAlertMessage('Failed to create program. Please try again.', 'error')
    }
  } catch (error) {
    console.error('Create program error:', error)
    globalStore.assignAlertMessage('An error occurred. Please try again.', 'error')
  } finally {
    creatingProgram.value = false
  }
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'active': return 'success'
    case 'draft': return 'secondary'
    case 'closed': return 'warning'
    case 'completed': return 'info'
    default: return 'secondary'
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Lifecycle
onMounted(() => {
  loadPrograms()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
