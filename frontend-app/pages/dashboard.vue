<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-6 text-white">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold mb-2">
            Welcome back, {{ auth.getLoggedUser?.firstName }}!
          </h1>
          <p class="text-blue-100">
            Here's what's happening with your startup today.
          </p>
        </div>
        <div class="text-right">
          <p class="text-sm text-blue-200">Last updated</p>
          <p class="text-lg font-semibold">{{ currentTime }}</p>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Startup Status -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
              <i class="fa-solid fa-building text-white"></i>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Startup Status</p>
            <p class="text-2xl font-semibold text-gray-900">
              <Badge 
                :variant="startupStatusVariant" 
                :text="startupStatusText"
                size="lg"
              />
            </p>
          </div>
        </div>
      </div>

      <!-- Active Programs -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
              <i class="fa-solid fa-gauge-high text-white"></i>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Active Programs</p>
            <p class="text-2xl font-semibold text-gray-900">{{ activeProgramsCount }}</p>
          </div>
        </div>
      </div>

      <!-- Applied Labels -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
              <i class="fa-solid fa-tag text-white"></i>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Applied Labels</p>
            <p class="text-2xl font-semibold text-gray-900">{{ appliedLabelsCount }}</p>
          </div>
        </div>
      </div>

      <!-- Pending Applications -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
              <i class="fa-solid fa-clock text-white"></i>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Pending Applications</p>
            <p class="text-2xl font-semibold text-gray-900">{{ pendingApplicationsCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Quick Actions</h2>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            @click="navigateTo('/startups/register')"
            class="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-colors"
          >
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <i class="fa-solid fa-plus text-blue-600"></i>
            </div>
            <div class="text-left">
              <h3 class="font-medium text-gray-900">Register Startup</h3>
              <p class="text-sm text-gray-500">Add your startup to the platform</p>
            </div>
          </button>

          <button
            @click="navigateTo('/programs')"
            class="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-green-500 transition-colors"
          >
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <i class="fa-solid fa-gauge-high text-green-600"></i>
            </div>
            <div class="text-left">
              <h3 class="font-medium text-gray-900">Browse Programs</h3>
              <p class="text-sm text-gray-500">Find acceleration programs</p>
            </div>
          </button>

          <button
            @click="navigateTo('/labels')"
            class="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-purple-500 transition-colors"
          >
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <i class="fa-solid fa-tag text-purple-600"></i>
            </div>
            <div class="text-left">
              <h3 class="font-medium text-gray-900">Apply for Labels</h3>
              <p class="text-sm text-gray-500">Get certified labels</p>
            </div>
          </button>

          <button
            @click="navigateTo('/profile/setting/my-account')"
            class="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-500 transition-colors"
          >
            <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
              <i class="fa-solid fa-user-gear text-gray-600"></i>
            </div>
            <div class="text-left">
              <h3 class="font-medium text-gray-900">Update Profile</h3>
              <p class="text-sm text-gray-500">Manage your account</p>
            </div>
          </button>

          <button
            @click="navigateTo('/profile/documents')"
            class="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-orange-500 transition-colors"
          >
            <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
              <i class="fa-solid fa-folder text-orange-600"></i>
            </div>
            <div class="text-left">
              <h3 class="font-medium text-gray-900">Documents</h3>
              <p class="text-sm text-gray-500">Manage your documents</p>
            </div>
          </button>

          <button
            @click="navigateTo('/profile/programmes')"
            class="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-indigo-500 transition-colors"
          >
            <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
              <i class="fa-solid fa-list-check text-indigo-600"></i>
            </div>
            <div class="text-left">
              <h3 class="font-medium text-gray-900">My Applications</h3>
              <p class="text-sm text-gray-500">View application status</p>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Recent Activity</h2>
      </div>
      <div class="p-6">
        <div v-if="recentActivity.length === 0" class="text-center py-8">
          <i class="fa-solid fa-inbox text-4xl text-gray-300 mb-4"></i>
          <p class="text-gray-500">No recent activity</p>
        </div>
        <div v-else class="space-y-4">
          <div
            v-for="activity in recentActivity"
            :key="activity.id"
            class="flex items-center p-4 border border-gray-200 rounded-lg"
          >
            <div class="flex-shrink-0">
              <div :class="[
                'w-8 h-8 rounded-full flex items-center justify-center',
                activity.type === 'program' ? 'bg-green-100' : 
                activity.type === 'label' ? 'bg-purple-100' : 'bg-blue-100'
              ]">
                <i :class="[
                  'text-sm',
                  activity.type === 'program' ? 'fa-solid fa-gauge-high text-green-600' :
                  activity.type === 'label' ? 'fa-solid fa-tag text-purple-600' :
                  'fa-solid fa-building text-blue-600'
                ]"></i>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
              <p class="text-sm text-gray-500">{{ activity.description }}</p>
            </div>
            <div class="text-right">
              <p class="text-xs text-gray-400">{{ formatDate(activity.date) }}</p>
              <Badge 
                :variant="getStatusVariant(activity.status)" 
                :text="activity.status"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StartupData, ProgramApplication, LabelApplication } from '~/types/interfaces'

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

useHead({
  title: 'Dashboard - Tanzania Startups'
})

const auth = useAuthStore()
const startupStore = useStartupStore()
const programStore = useProgramStore()
const labelStore = useLabelStore()

// Reactive state
const currentTime = ref('')
const recentActivity = ref<any[]>([])

// Computed properties
const startupStatusVariant = computed(() => {
  const startup = startupStore.currentStartup
  if (!startup) return 'warning'
  
  switch (startup.status) {
    case 'approved': return 'success'
    case 'rejected': return 'danger'
    case 'pending': return 'warning'
    default: return 'secondary'
  }
})

const startupStatusText = computed(() => {
  const startup = startupStore.currentStartup
  if (!startup) return 'Not Registered'
  
  return startup.status.charAt(0).toUpperCase() + startup.status.slice(1)
})

const activeProgramsCount = computed(() => {
  return programStore.applications.filter(app => 
    app.status === 'approved' && app.program.status === 'active'
  ).length
})

const appliedLabelsCount = computed(() => {
  return labelStore.applications.filter(app => 
    app.startup_id === startupStore.currentStartup?.id
  ).length
})

const pendingApplicationsCount = computed(() => {
  const programApps = programStore.applications.filter(app => 
    app.startup_id === startupStore.currentStartup?.id && app.status === 'pending'
  ).length
  
  const labelApps = labelStore.applications.filter(app => 
    app.startup_id === startupStore.currentStartup?.id && app.status === 'pending'
  ).length
  
  return programApps + labelApps
})

// Methods
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour12: true,
    hour: 'numeric',
    minute: '2-digit'
  })
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'approved': return 'success'
    case 'rejected': return 'danger'
    case 'pending': return 'warning'
    case 'under_review': return 'info'
    default: return 'secondary'
  }
}

const loadRecentActivity = async () => {
  // Load recent program applications
  await programStore.fetchProgramApplications()
  
  // Load recent label applications
  await labelStore.fetchLabelApplications()
  
  // Combine and sort recent activity
  const programActivities = programStore.applications
    .filter(app => app.startup_id === startupStore.currentStartup?.id)
    .map(app => ({
      id: app.id,
      type: 'program',
      title: `Program Application: ${app.program.name}`,
      description: `Applied to ${app.program.organizer}`,
      status: app.status,
      date: app.application_date
    }))
  
  const labelActivities = labelStore.applications
    .filter(app => app.startup_id === startupStore.currentStartup?.id)
    .map(app => ({
      id: app.id,
      type: 'label',
      title: `Label Application: ${app.label.name}`,
      description: `Applied for ${app.label.name} label`,
      status: app.status,
      date: app.application_date
    }))
  
  recentActivity.value = [...programActivities, ...labelActivities]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
}

// Lifecycle
onMounted(async () => {
  updateTime()
  setInterval(updateTime, 60000) // Update every minute
  
  // Load startup data if user has one
  if (auth.getLoggedUserProfile?.profileable?.id) {
    await startupStore.fetchStartup(auth.getLoggedUserProfile.profileable.id)
  }
  
  await loadRecentActivity()
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
