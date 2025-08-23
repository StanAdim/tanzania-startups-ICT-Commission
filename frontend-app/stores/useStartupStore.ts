import { defineStore } from 'pinia'
import type { StartupData, Founder } from '~/types/interfaces'
import { useApiFetch } from '~/composables/useApiFetch'

export const useStartupStore = defineStore('startup', () => {
  const startups = ref<StartupData[]>([])
  const currentStartup = ref<StartupData | null>(null)
  const loading = ref(false)
  const filters = reactive({
    sector: '',
    stage: '',
    region: '',
    status: '',
    search: ''
  })

  // Get filtered startups
  const filteredStartups = computed(() => {
    let filtered = startups.value

    if (filters.sector) {
      filtered = filtered.filter(startup => startup.sector === filters.sector)
    }
    if (filters.stage) {
      filtered = filtered.filter(startup => startup.stage === filters.stage)
    }
    if (filters.region) {
      filtered = filtered.filter(startup => startup.region === filters.region)
    }
    if (filters.status) {
      filtered = filtered.filter(startup => startup.status === filters.status)
    }
    if (filters.search) {
      const search = filters.search.toLowerCase()
      filtered = filtered.filter(startup => 
        startup.name.toLowerCase().includes(search) ||
        startup.description.toLowerCase().includes(search) ||
        startup.contact_email.toLowerCase().includes(search)
      )
    }

    return filtered
  })

  // Fetch all startups
  async function fetchStartups() {
    loading.value = true
    try {
      const { data, error } = await useApiFetch('/api/startups')
      if (data.value) {
        startups.value = data.value
      }
      if (error.value) {
        console.error('Error fetching startups:', error.value)
      }
    } catch (err) {
      console.error('Error fetching startups:', err)
    } finally {
      loading.value = false
    }
  }

  // Fetch single startup by ID
  async function fetchStartup(id: string) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/startups/${id}`)
      if (data.value) {
        currentStartup.value = data.value
      }
      if (error.value) {
        console.error('Error fetching startup:', error.value)
      }
    } catch (err) {
      console.error('Error fetching startup:', err)
    } finally {
      loading.value = false
    }
  }

  // Register new startup
  async function registerStartup(startupData: Partial<StartupData>) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch('/api/startups', {
        method: 'POST',
        body: startupData
      })
      if (data.value) {
        startups.value.push(data.value)
        return { success: true, data: data.value }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error registering startup:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Update startup
  async function updateStartup(id: string, startupData: Partial<StartupData>) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/startups/${id}`, {
        method: 'PUT',
        body: startupData
      })
      if (data.value) {
        const index = startups.value.findIndex(s => s.id === id)
        if (index !== -1) {
          startups.value[index] = data.value
        }
        if (currentStartup.value?.id === id) {
          currentStartup.value = data.value
        }
        return { success: true, data: data.value }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error updating startup:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Delete startup
  async function deleteStartup(id: string) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/startups/${id}`, {
        method: 'DELETE'
      })
      if (data.value) {
        startups.value = startups.value.filter(s => s.id !== id)
        if (currentStartup.value?.id === id) {
          currentStartup.value = null
        }
        return { success: true }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error deleting startup:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Approve/reject startup
  async function updateStartupStatus(id: string, status: string, notes?: string) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/startups/${id}/status`, {
        method: 'PATCH',
        body: { status, notes }
      })
      if (data.value) {
        const index = startups.value.findIndex(s => s.id === id)
        if (index !== -1) {
          startups.value[index].status = status
        }
        if (currentStartup.value?.id === id) {
          currentStartup.value.status = status
        }
        return { success: true, data: data.value }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error updating startup status:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Add founder to startup
  async function addFounder(startupId: string, founder: Omit<Founder, 'id'>) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/startups/${startupId}/founders`, {
        method: 'POST',
        body: founder
      })
      if (data.value) {
        if (currentStartup.value?.id === startupId) {
          currentStartup.value.founders.push(data.value)
        }
        return { success: true, data: data.value }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error adding founder:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Remove founder from startup
  async function removeFounder(startupId: string, founderId: string) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/startups/${startupId}/founders/${founderId}`, {
        method: 'DELETE'
      })
      if (data.value) {
        if (currentStartup.value?.id === startupId) {
          currentStartup.value.founders = currentStartup.value.founders.filter(f => f.id !== founderId)
        }
        return { success: true }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error removing founder:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Clear current startup
  function clearCurrentStartup() {
    currentStartup.value = null
  }

  // Reset filters
  function resetFilters() {
    filters.sector = ''
    filters.stage = ''
    filters.region = ''
    filters.status = ''
    filters.search = ''
  }

  return {
    startups,
    currentStartup,
    loading,
    filters,
    filteredStartups,
    fetchStartups,
    fetchStartup,
    registerStartup,
    updateStartup,
    deleteStartup,
    updateStartupStatus,
    addFounder,
    removeFounder,
    clearCurrentStartup,
    resetFilters
  }
})
