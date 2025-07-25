<template>
  <span :class="badgeClass" aria-label="Startup Stage">{{ label }}</span>
</template>
<script setup>
const props = defineProps({ label: String });
const badgeClass = computed(() => {
  switch (props.label) {
    case 'Idea Stage': return 'bg-gray-400 text-white px-2 py-1 rounded';
    case 'Early Stage': return 'bg-blue-400 text-white px-2 py-1 rounded';
    case 'Growth Stage': return 'bg-green-500 text-white px-2 py-1 rounded';
    case 'Mature Stage': return 'bg-yellow-500 text-white px-2 py-1 rounded';
    default: return 'bg-sky-500 text-white px-2 py-1 rounded';
  }
});
</script> 