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
      <select
        :id="id"
        :value="modelValue"
        :required="required"
        :disabled="disabled"
        :multiple="multiple"
        :size="multiple ? size : undefined"
        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
        :class="[
          error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : '',
          size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base',
          icon ? 'pl-10' : ''
        ]"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
      >
        <option
          v-if="placeholder && !multiple"
          value=""
          disabled
          selected
        >
          {{ placeholder }}
        </option>
        
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>
      
      <div
        v-if="icon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <i :class="[icon, 'text-gray-400']"></i>
      </div>
      
      <!-- Custom dropdown arrow -->
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <i class="fa-solid fa-chevron-down text-gray-400"></i>
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
interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
}

interface Props {
  modelValue: string | number | (string | number)[]
  options: SelectOption[]
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  helpText?: string
  id?: string
  name?: string
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '',
  required: false,
  disabled: false,
  error: '',
  helpText: '',
  id: '',
  name: '',
  size: 'md',
  icon: '',
  multiple: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | (string | number)[]]
  change: [event: Event]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

// Methods
const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  let value: string | number | (string | number)[]
  
  if (props.multiple) {
    value = Array.from(target.selectedOptions).map(option => option.value)
  } else {
    value = target.value
  }
  
  emit('update:modelValue', value)
  emit('change', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

// Generate unique ID if not provided
const uniqueId = computed(() => {
  return props.id || `select-${Math.random().toString(36).substr(2, 9)}`
})
</script>

<style scoped>
/* Custom select styling */
select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

/* Remove default arrow in IE */
select::-ms-expand {
  display: none;
}

/* Custom scrollbar for multiple select */
select[multiple]::-webkit-scrollbar {
  width: 6px;
}

select[multiple]::-webkit-scrollbar-track {
  background: #f1f1f1;
}

select[multiple]::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

select[multiple]::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
