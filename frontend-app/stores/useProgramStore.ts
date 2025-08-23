import { defineStore } from 'pinia'
import type { Program, ProgramApplication } from '~/types/interfaces'
import { useApiFetch } from '~/composables/useApiFetch'

export const useProgramStore = defineStore('program', () => {
  const programs = ref<Program[]>([])
  const currentProgram = ref<Program | null>(null)
  const applications = ref<ProgramApplication[]>([])
  const loading = ref(false)
  const filters = reactive({
    status: '',
    organizer: '',
    search: ''
  })

  // Get filtered programs
  const filteredPrograms = computed(() => {
    let filtered = programs.value

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

  // Get active programs
  const activePrograms = computed(() => {
    return programs.value.filter(program => program.status === 'active')
  })

  // Get programs by status
  const getProgramsByStatus = (status: string) => {
    return programs.value.filter(program => program.status === status)
  }

  // Fetch all programs
  async function fetchPrograms() {
    loading.value = true
    try {
      const { data, error } = await useApiFetch('/api/programs')
      if (data.value) {
        programs.value = data.value
      }
      if (error.value) {
        console.error('Error fetching programs:', error.value)
      }
    } catch (err) {
      console.error('Error fetching programs:', err)
    } finally {
      loading.value = false
    }
  }

  // Fetch single program by ID
  async function fetchProgram(id: string) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/programs/${id}`)
      if (data.value) {
        currentProgram.value = data.value
      }
      if (error.value) {
        console.error('Error fetching program:', error.value)
      }
    } catch (err) {
      console.error('Error fetching program:', err)
    } finally {
      loading.value = false
    }
  }

  // Create new program
  async function createProgram(programData: Partial<Program>) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch('/api/programs', {
        method: 'POST',
        body: programData
      })
      if (data.value) {
        programs.value.push(data.value)
        return { success: true, data: data.value }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error creating program:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Update program
  async function updateProgram(id: string, programData: Partial<Program>) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/programs/${id}`, {
        method: 'PUT',
        body: programData
      })
      if (data.value) {
        const index = programs.value.findIndex(p => p.id === id)
        if (index !== -1) {
          programs.value[index] = data.value
        }
        if (currentProgram.value?.id === id) {
          currentProgram.value = data.value
        }
        return { success: true, data: data.value }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error updating program:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Delete program
  async function deleteProgram(id: string) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/programs/${id}`, {
        method: 'DELETE'
      })
      if (data.value) {
        programs.value = programs.value.filter(p => p.id !== id)
        if (currentProgram.value?.id === id) {
          currentProgram.value = null
        }
        return { success: true }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error deleting program:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Fetch program applications
  async function fetchProgramApplications(programId?: string) {
    loading.value = true
    try {
      const url = programId ? `/api/programs/${programId}/applications` : '/api/program-applications'
      const { data, error } = await useApiFetch(url)
      if (data.value) {
        applications.value = data.value
      }
      if (error.value) {
        console.error('Error fetching program applications:', error.value)
      }
    } catch (err) {
      console.error('Error fetching program applications:', err)
    } finally {
      loading.value = false
    }
  }

  // Apply to program
  async function applyToProgram(programId: string, applicationData: any) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/programs/${programId}/apply`, {
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
      console.error('Error applying to program:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Update application status
  async function updateApplicationStatus(applicationId: string, status: string, notes?: string) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/program-applications/${applicationId}/status`, {
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

  // Get applications by program
  const getApplicationsByProgram = (programId: string) => {
    return applications.value.filter(app => app.program_id === programId)
  }

  // Clear current program
  function clearCurrentProgram() {
    currentProgram.value = null
  }

  // Reset filters
  function resetFilters() {
    filters.status = ''
    filters.organizer = ''
    filters.search = ''
  }

  return {
    programs,
    currentProgram,
    applications,
    loading,
    filters,
    filteredPrograms,
    activePrograms,
    getProgramsByStatus,
    fetchPrograms,
    fetchProgram,
    createProgram,
    updateProgram,
    deleteProgram,
    fetchProgramApplications,
    applyToProgram,
    updateApplicationStatus,
    getApplicationsByStartup,
    getApplicationsByProgram,
    clearCurrentProgram,
    resetFilters
  }
})
