<template>
  <div>
    <h3 class="text-lg font-bold mb-2">Recommended Support Entities</h3>
    <div v-if="recommendations && (recommendations.hubs.length || recommendations.accelerators.length || recommendations.programs.length)">
      <div v-if="recommendations.hubs.length">
        <h4 class="font-semibold">Hubs</h4>
        <ul>
          <li v-for="hub in recommendations.hubs" :key="hub.id">{{ hub.hub_name }}</li>
        </ul>
      </div>
      <div v-if="recommendations.accelerators.length">
        <h4 class="font-semibold">Accelerators</h4>
        <ul>
          <li v-for="acc in recommendations.accelerators" :key="acc.id">{{ acc.accelerator_name }}</li>
        </ul>
      </div>
      <div v-if="recommendations.programs.length">
        <h4 class="font-semibold">Programs</h4>
        <ul>
          <li v-for="prog in recommendations.programs" :key="prog.id">{{ prog.grassroot_name }}</li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>No recommendations available at this time.</p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({ recommendations: Object });
</script> 