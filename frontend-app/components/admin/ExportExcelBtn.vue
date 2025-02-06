<script setup lang="ts">
const docStore = useDocumentStore()
const props = defineProps({
  fileType: {
    default: 'none',
    type: String
  },
  fileName: {
    default: 'simple_file',
    type: String
  }
})
</script>

<template>
  <UsableNewFeatureBtn @click.prevent="docStore.handleExcelFileExport(props.fileType, props.fileName)" :is-normal="true" name="Export List" iconClass="fa-solid fa-file-arrow-down" />
</template>

<style scoped>

</style>