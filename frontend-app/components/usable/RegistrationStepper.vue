<template>
  <div>
    <div v-for="(step, idx) in steps" :key="idx" v-show="idx === currentStep">
      <h3>{{ step.title }}</h3>
      <slot :name="step.slot"></slot>
    </div>
    <div class="flex gap-2 mt-4">
      <button @click="prevStep" :disabled="currentStep === 0">Back</button>
      <button @click="nextStep" :disabled="currentStep === steps.length - 1">Next</button>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({ steps: Array });
const currentStep = ref(0);
const nextStep = () => { if (currentStep.value < props.steps.length - 1) currentStep.value++; };
const prevStep = () => { if (currentStep.value > 0) currentStep.value--; };
</script> 