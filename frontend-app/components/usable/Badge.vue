<template>
  <span
    :class="[
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      variantClasses,
      sizeClasses
    ]"
  >
    <i
      v-if="icon"
      :class="[icon, 'mr-1']"
    ></i>
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  icon: '',
  text: ''
})

// Computed properties
const variantClasses = computed(() => {
  const classes = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-cyan-100 text-cyan-800',
    light: 'bg-gray-50 text-gray-600',
    dark: 'bg-gray-800 text-gray-100'
  }
  return classes[props.variant]
})

const sizeClasses = computed(() => {
  const classes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm'
  }
  return classes[props.size]
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
