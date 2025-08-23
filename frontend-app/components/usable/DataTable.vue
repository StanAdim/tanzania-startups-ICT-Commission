<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <!-- Table Header with Search and Filters -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <!-- Search -->
        <div class="flex-1 max-w-sm">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="fa-solid fa-search text-gray-400"></i>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :placeholder="searchPlaceholder"
              @input="handleSearch"
            />
          </div>
        </div>

        <!-- Filters -->
        <div v-if="showFilters" class="flex flex-wrap gap-2">
          <slot name="filters"></slot>
          <button
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <i class="fa-solid fa-times mr-1"></i>
            Clear
          </button>
        </div>

        <!-- Actions -->
        <div v-if="$slots.actions" class="flex gap-2">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              :class="[
                'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                column.sortable ? 'cursor-pointer hover:bg-gray-100' : '',
                column.width || ''
              ]"
              @click="column.sortable ? handleSort(column.key) : null"
            >
              <div class="flex items-center space-x-1">
                <span>{{ column.label }}</span>
                <span v-if="column.sortable" class="flex flex-col">
                  <i
                    :class="[
                      'text-xs',
                      sortKey === column.key && sortOrder === 'asc' ? 'text-blue-500' : 'text-gray-400'
                    ]"
                  >
                    ▲
                  </i>
                  <i
                    :class="[
                      'text-xs',
                      sortKey === column.key && sortOrder === 'desc' ? 'text-blue-500' : 'text-gray-400'
                    ]"
                  >
                    ▼
                  </i>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(item, index) in paginatedData"
            :key="item.id || index"
            class="hover:bg-gray-50"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              <slot :name="column.key" :item="item" :value="getNestedValue(item, column.key)">
                {{ getNestedValue(item, column.key) }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div
      v-if="filteredData.length === 0"
      class="text-center py-12 px-6"
    >
      <i class="fa-solid fa-inbox text-4xl text-gray-300 mb-4"></i>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No data found</h3>
      <p class="text-gray-500">
        {{ searchQuery ? 'Try adjusting your search terms.' : 'No items to display.' }}
      </p>
    </div>

    <!-- Pagination -->
    <div
      v-if="showPagination && totalPages > 1"
      class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
    >
      <div class="flex-1 flex justify-between sm:hidden">
        <button
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{ startIndex + 1 }}</span>
            to
            <span class="font-medium">{{ endIndex }}</span>
            of
            <span class="font-medium">{{ filteredData.length }}</span>
            results
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              :disabled="currentPage === 1"
              @click="goToPage(currentPage - 1)"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                page === currentPage
                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
            
            <button
              :disabled="currentPage === totalPages"
              @click="goToPage(currentPage + 1)"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '~/types/interfaces'

interface Props {
  data: any[]
  columns: TableColumn[]
  searchPlaceholder?: string
  showFilters?: boolean
  showPagination?: boolean
  itemsPerPage?: number
  searchable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  searchPlaceholder: 'Search...',
  showFilters: true,
  showPagination: true,
  itemsPerPage: 10,
  searchable: true
})

const emit = defineEmits<{
  search: [query: string]
  sort: [key: string, order: 'asc' | 'desc']
  filter: [filters: any]
}>()

// Reactive state
const searchQuery = ref('')
const currentPage = ref(1)
const sortKey = ref('')
const sortOrder = ref<'asc' | 'desc'>('asc')

// Computed properties
const filteredData = computed(() => {
  let filtered = [...props.data]
  
  // Apply search
  if (props.searchable && searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item => {
      return Object.values(item).some(value => 
        String(value).toLowerCase().includes(query)
      )
    })
  }
  
  // Apply sorting
  if (sortKey.value) {
    filtered.sort((a, b) => {
      const aVal = getNestedValue(a, sortKey.value)
      const bVal = getNestedValue(b, sortKey.value)
      
      if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1
      if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1
      return 0
    })
  }
  
  return filtered
})

const totalPages = computed(() => Math.ceil(filteredData.value.length / props.itemsPerPage))

const paginatedData = computed(() => {
  if (!props.showPagination) return filteredData.value
  
  const start = (currentPage.value - 1) * props.itemsPerPage
  const end = start + props.itemsPerPage
  return filteredData.value.slice(start, end)
})

const startIndex = computed(() => (currentPage.value - 1) * props.itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + props.itemsPerPage, filteredData.value.length))

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const hasActiveFilters = computed(() => {
  // This can be customized based on your filter implementation
  return false
})

// Methods
const handleSearch = () => {
  currentPage.value = 1
  emit('search', searchQuery.value)
}

const handleSort = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
  emit('sort', key, sortOrder.value)
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  currentPage.value = 1
  emit('filter', {})
}

const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

// Watch for data changes and reset pagination
watch(() => props.data, () => {
  currentPage.value = 1
}, { deep: true })
</script>

<style scoped>
/* Add any custom styles here */
</style>
