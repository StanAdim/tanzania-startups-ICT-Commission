<template>
  <div class="mb-4">
    <label v-if="label" class="block text-gray-600 text-sm font-semibold mb-1">{{ label }}</label>
    <input
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="{'md:w-72 w-full':props.isFull, 'w-full': !props.isFull}"
        class=" border h-10 border-gray-300 rounded-lg px-4 py-0 focus:outline-none focus:border-blue-500"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  label: { type: String, default: '' },
  isFull: { type: Boolean, default: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  modelValue: { type: [String, Number], default: '' },
});
const emit = defineEmits(['update:modelValue']);
</script>

<style scoped>
/* Scoped styles if needed */
</style>
