<template>
  <div v-if="sectionId && resumeData.custom">
    <TextAreaField
      label="模块内容"
      v-model="resumeData.custom[sectionId]"
      rows="6"
      placeholder="输入自定义内容..."
    />
  </div>
</template>
<script setup lang="ts">
import { useResume } from '../../composables/useResume'
import TextAreaField from './TextAreaField.vue'

defineProps<{
  sectionId: string
}>()

const { resumeData } = useResume()
</script>

