import { defineStore } from 'pinia'
import type { User, UserRole, UserStatus } from '~/types/interfaces'
import { useApiFetch } from '~/composables/useApiFetch'

export const useUserManagementStore = defineStore('userManagement', () => {
  const users = ref<User[]>([])
  const currentUser = ref<User | null>(null)
  const loading = ref(false)
  const filters = reactive({
    role: '',
    status: '',
    search: ''
  })

  // Get filtered users
  const filteredUsers = computed(() => {
    let filtered = users.value

    if (filters.role) {
      filtered = filtered.filter(user => user.role === filters.role)
    }
    if (filters.status) {
      filtered = filtered.filter(user => user.status === filters.status)
    }
    if (filters.search) {
      const search = filters.search.toLowerCase()
      filtered = filtered.filter(user => 
        user.firstName.toLowerCase().includes(search) ||
        user.lastName.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
      )
    }

    return filtered
  })

  // Get users by role
  const getUsersByRole = (role: UserRole) => {
    return users.value.filter(user => user.role === role)
  }

  // Get users by status
  const getUsersByStatus = (status: UserStatus) => {
    return users.value.filter(user => user.status === status)
  }

  // Fetch all users
  async function fetchUsers() {
    loading.value = true
    try {
      const { data, error } = await useApiFetch('/api/users')
      if (data.value) {
        users.value = data.value
      }
      if (error.value) {
        console.error('Error fetching users:', error.value)
      }
    } catch (err) {
      console.error('Error fetching users:', err)
    } finally {
      loading.value = false
    }
  }

  // Fetch single user by ID
  async function fetchUser(id: string) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/users/${id}`)
      if (data.value) {
        currentUser.value = data.value
      }
      if (error.value) {
        console.error('Error fetching user:', error.value)
      }
    } catch (err) {
      console.error('Error fetching user:', err)
    } finally {
      loading.value = false
    }
  }

  // Create new user
  async function createUser(userData: Partial<User>) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch('/api/users', {
        method: 'POST',
        body: userData
      })
      if (data.value) {
        users.value.push(data.value)
        return { success: true, data: data.value }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error creating user:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Update user
  async function updateUser(id: string, userData: Partial<User>) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/users/${id}`, {
        method: 'PUT',
        body: userData
      })
      if (data.value) {
        const index = users.value.findIndex(u => u.uid === id)
        if (index !== -1) {
          users.value[index] = data.value
        }
        if (currentUser.value?.uid === id) {
          currentUser.value = data.value
        }
        return { success: true, data: data.value }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error updating user:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Delete user
  async function deleteUser(id: string) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/users/${id}`, {
        method: 'DELETE'
      })
      if (data.value) {
        users.value = users.value.filter(u => u.uid !== id)
        if (currentUser.value?.uid === id) {
          currentUser.value = null
        }
        return { success: true }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error deleting user:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Update user role
  async function updateUserRole(userId: string, role: UserRole) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/users/${userId}/role`, {
        method: 'PATCH',
        body: { role }
      })
      if (data.value) {
        const index = users.value.findIndex(u => u.uid === userId)
        if (index !== -1) {
          users.value[index].role = role
        }
        if (currentUser.value?.uid === userId) {
          currentUser.value.role = role
        }
        return { success: true, data: data.value }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error updating user role:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Update user status
  async function updateUserStatus(userId: string, status: UserStatus) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch(`/api/users/${userId}/status`, {
        method: 'PATCH',
        body: { status }
      })
      if (data.value) {
        const index = users.value.findIndex(u => u.uid === userId)
        if (index !== -1) {
          users.value[index].status = status
        }
        if (currentUser.value?.uid === userId) {
          currentUser.value.status = status
        }
        return { success: true, data: data.value }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error updating user status:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Invite new user (Commission staff)
  async function inviteUser(inviteData: { email: string, role: UserRole, firstName: string, lastName: string }) {
    loading.value = true
    try {
      const { data, error } = await useApiFetch('/api/users/invite', {
        method: 'POST',
        body: inviteData
      })
      if (data.value) {
        return { success: true, data: data.value }
      }
      if (error.value) {
        return { success: false, error: error.value }
      }
    } catch (err) {
      console.error('Error inviting user:', err)
      return { success: false, error: err }
    } finally {
      loading.value = false
    }
  }

  // Activate user account
  async function activateUser(userId: string) {
    return updateUserStatus(userId, UserStatus.ACTIVE)
  }

  // Deactivate user account
  async function deactivateUser(userId: string) {
    return updateUserStatus(userId, UserStatus.INACTIVE)
  }

  // Suspend user account
  async function suspendUser(userId: string) {
    return updateUserStatus(userId, UserStatus.SUSPENDED)
  }

  // Clear current user
  function clearCurrentUser() {
    currentUser.value = null
  }

  // Reset filters
  function resetFilters() {
    filters.role = ''
    filters.status = ''
    filters.search = ''
  }

  return {
    users,
    currentUser,
    loading,
    filters,
    filteredUsers,
    getUsersByRole,
    getUsersByStatus,
    fetchUsers,
    fetchUser,
    createUser,
    updateUser,
    deleteUser,
    updateUserRole,
    updateUserStatus,
    inviteUser,
    activateUser,
    deactivateUser,
    suspendUser,
    clearCurrentUser,
    resetFilters
  }
})
