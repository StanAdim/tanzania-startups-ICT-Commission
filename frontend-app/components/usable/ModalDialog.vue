<template>
  <Transition
    enter-active-class="ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 overflow-y-auto"
      @click.self="closeModal"
    >
      <!-- Backdrop -->
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <!-- Modal -->
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <Transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full"
            :class="maxWidthClass"
          >
            <!-- Header -->
            <div v-if="showHeader" class="bg-gray-50 px-4 py-3 sm:px-6">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                  {{ title }}
                </h3>
                <button
                  v-if="showCloseButton"
                  @click="closeModal"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span class="sr-only">Close</span>
                  <i class="fa-solid fa-times h-6 w-6"></i>
                </button>
              </div>
            </div>

            <!-- Body -->
            <div class="px-4 py-5 sm:p-6">
              <slot></slot>
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <slot name="footer"></slot>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  showHeader?: boolean
  showCloseButton?: boolean
  closeOnBackdrop?: boolean
  closeOnEscape?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  maxWidth: 'md',
  showHeader: true,
  showCloseButton: true,
  closeOnBackdrop: true,
  closeOnEscape: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

// Computed properties
const maxWidthClass = computed(() => {
  const classes = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    '3xl': 'sm:max-w-3xl',
    '4xl': 'sm:max-w-4xl',
    '5xl': 'sm:max-w-5xl',
    '6xl': 'sm:max-w-6xl',
    '7xl': 'sm:max-w-7xl'
  }
  return classes[props.maxWidth]
})

// Methods
const closeModal = () => {
  if (props.closeOnBackdrop) {
    emit('update:modelValue', false)
    emit('close')
  }
}

// Keyboard event handling
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEscape && props.modelValue) {
    closeModal()
  }
}

// Lifecycle
onMounted(() => {
  if (props.closeOnEscape) {
    document.addEventListener('keydown', handleEscape)
  }
})

onUnmounted(() => {
  if (props.closeOnEscape) {
    document.removeEventListener('keydown', handleEscape)
  }
})

// Watch for modelValue changes to handle body scroll
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}, { immediate: true })
</script>

<style scoped>
/* Custom scrollbar for modal content */
.overflow-hidden::-webkit-scrollbar {
  width: 6px;
}

.overflow-hidden::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-hidden::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-hidden::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
