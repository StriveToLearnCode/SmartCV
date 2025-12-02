<template>
  <div>
    <TextAreaField
      label="内容"
      v-model="resumeData.basics.summary"
      rows="5"
      placeholder="简要介绍你的背景..."
    />
  </div>
</template>
<script setup lang="ts">
import { useResume } from '../../composables/useResume'
import TextAreaField from './TextAreaField.vue'

const { resumeData } = useResume()
</script>

