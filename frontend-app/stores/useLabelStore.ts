import { defineStore } from 'pinia'
import type { Label, LabelApplication } from '~/types/interfaces'
import { useApiFetch } from '~/composables/useApiFetch'

export const useLabelStore = defineStore('label', () => {
  const labels = ref<Label[]>([])
  const currentLabel = ref<Label | null>(null)
  const applications = ref<LabelApplication[]>([])
  const loading = ref(false)
  const filters = reactive({
    status: '',
    search: ''
  })

  // Get filtered labels
  const filteredLabels = computed(() => {
    let filtered = labels.value

    if (filters.status) {
      filtered = filtered.filter(label => label.status === filters.status)
    }
    if (filters.search) {
      const search = filters.search.toLowerCase()
      filtered = filtered.filter(label => 
        label.name.toLowerCase().includes(search) ||
        label.description.toLowerCase().includes(search)
      )
    }

    return filtered
  })

  // Get active labels
  const activeLabels = computed(() => {
    return labels.value.filter(label => label.status === 'active')
  })

  // Fetch all labels
  async function fetchLabels() {
    loading.value = true
    try {
      const { data, error } = await useApiFetch('/api/labels')
      if (data.value) {
        labels.value = data.value
      }
      if (error.value) {
        console.error('Error fetching labels:', error.value)
      }
    } catch (err) {
      console.error('Error fetching labels:', err)
    } finally {
      loading.value = false
    }
  }

  // Fetch single label by ID
  async function fetchLabel(id: string) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/labels/${id}`)
      if (data.value) {
        currentLabel.value = data.value
      }
      if (error.value) {
        console.error('Error fetching label:', error.value)
      }
    } catch (err) {
      console.error('Error fetching label:', err)
    } finally {
      loading.value = false
    }
  }

  // Create new label
  async function createLabel(labelData: Partial<Label>) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch('/api/labels', {
        method: 'POST',
        body: labelData
      })
      if (data.value) {
        labels.value.push(data.value)
        return { success: true, data: data.value }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error creating label:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Update label
  async function updateLabel(id: string, labelData: Partial<Label>) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/labels/${id}`, {
        method: 'PUT',
        body: labelData
      })
      if (data.value) {
        const index = labels.value.findIndex(l => l.id === id)
        if (index !== -1) {
          labels.value[index] = data.value
        }
        if (currentLabel.value?.id === id) {
          currentLabel.value = data.value
        }
        return { success: true, data: data.value }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error updating label:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Delete label
  async function deleteLabel(id: string) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/labels/${id}`, {
        method: 'DELETE'
      })
      if (data.value) {
        labels.value = labels.value.filter(l => l.id !== id)
        if (currentLabel.value?.id === id) {
          currentLabel.value = null
        }
        return { success: true }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error deleting label:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Fetch label applications
  async function fetchLabelApplications(labelId?: string) {
    loading.value = true
    try {
      const url = labelId ? `/api/labels/${labelId}/applications` : '/api/label-applications'
      const { data, error } = await useApiFetch(url)
      if (data.value) {
        applications.value = data.value
      }
      if (error.value) {
        console.error('Error fetching label applications:', error.value)
      }
    } catch (err) {
      console.error('Error fetching label applications:', err)
    } finally {
      loading.value = false
    }
  }

  // Apply for label
  async function applyForLabel(labelId: string, applicationData: any) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/labels/${labelId}/apply`, {
        method: 'POST',
        body: applicationData
      })
      if (data.value) {
        applications.value.push(data.value)
        return { success: true, data: data.value }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error applying for label:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Update application status
  async function updateApplicationStatus(applicationId: string, status: string, notes?: string) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/label-applications/${applicationId}/status`, {
        method: 'PATCH',
        body: { status, notes }
      })
      if (data.value) {
        const index = applications.value.findIndex(a => a.id === applicationId)
        if (index !== -1) {
          applications.value[index].status = status
          if (notes) {
            applications.value[index].review_notes = notes
          }
        }
        return { success: true, data: data.value }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error updating application status:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Get applications by startup
  const getApplicationsByStartup = (startupId: string) => {
    return applications.value.filter(app => app.startup_id === startupId)
  }

  // Get applications by label
  const getApplicationsByLabel = (labelId: string) => {
    return applications.value.filter(app => app.label_id === labelId)
  }

  // Get approved labels for startup
  const getApprovedLabelsForStartup = (startupId: string) => {
    return applications.value
      .filter(app => app.startup_id === startupId && app.status === 'approved')
      .map(app => app.label)
  }

  // Clear current label
  function clearCurrentLabel() {
    currentLabel.value = null
  }

  // Reset filters
  function resetFilters() {
    filters.status = ''
    filters.search = ''
  }

  return {
    labels,
    currentLabel,
    applications,
    loading,
    filters,
    filteredLabels,
    activeLabels,
    fetchLabels,
    fetchLabel,
    createLabel,
    updateLabel,
    deleteLabel,
    fetchLabelApplications,
    applyForLabel,
    updateApplicationStatus,
    getApplicationsByStartup,
    getApplicationsByLabel,
    getApprovedLabelsForStartup,
    clearCurrentLabel,
    resetFilters
  }
})
