<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :min="min"
        :max="max"
        :step="step"
        :accept="accept"
        :multiple="multiple"
        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
        :class="[
          error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : '',
          size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base',
          icon ? 'pl-10' : ''
        ]"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      
      <div
        v-if="icon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <i :class="[icon, 'text-gray-400']"></i>
      </div>
      
      <div
        v-if="type === 'password'"
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <button
          type="button"
          @click="togglePassword"
          class="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
        >
          <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
        </button>
      </div>
    </div>
    
    <p
      v-if="error"
      class="mt-1 text-sm text-red-600"
    >
      {{ error }}
    </p>
    
    <p
      v-else-if="helpText"
      class="mt-1 text-sm text-gray-500"
    >
      {{ helpText }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'file'
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  error?: string
  helpText?: string
  id?: string
  name?: string
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  min?: string | number
  max?: string | number
  step?: string | number
  accept?: string
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  label: '',
  placeholder: '',
  required: false,
  disabled: false,
  readonly: false,
  error: '',
  helpText: '',
  id: '',
  name: '',
  size: 'md',
  icon: '',
  min: undefined,
  max: undefined,
  step: undefined,
  accept: '',
  multiple: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  input: [event: Event]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

// Reactive state
const showPassword = ref(false)

// Computed properties
const inputType = computed(() => {
  if (props.type === 'password' && showPassword.value) {
    return 'text'
  }
  return props.type
})

// Methods
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// Generate unique ID if not provided
const uniqueId = computed(() => {
  return props.id || `input-${Math.random().toString(36).substr(2, 9)}`
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
