<template>
  <div
    class="bg-white rounded-sm shadow-sm border border-stone-200 overflow-hidden group hover:shadow-md transition-all duration-300 relative"
  >
    <!-- Header -->
    <div
      @click="isActive = !isActive"
      class="flex items-center justify-between p-4 cursor-pointer bg-[#fffdf5] border-b border-stone-100"
    >
      <div class="flex items-center gap-3">
        <span class="text-xl">👤</span>
        <span class="font-bold text-stone-800 text-sm tracking-wide font-serif">基本信息</span>
      </div>
      <div class="text-stone-300 transform transition-transform duration-300" :class="{ 'rotate-180': isActive }">
        ▼
      </div>
    </div>

    <div v-show="isActive" class="p-6 bg-white">
      <div class="grid grid-cols-2 gap-x-6 gap-y-2">
        <InputField label="姓名" v-model="resumeData.basics.name" placeholder="你的名字" />
        <InputField label="意向职位" v-model="resumeData.basics.title" placeholder="例如：高级前端工程师" />
      </div>
      <div class="grid grid-cols-2 gap-x-6 gap-y-2">
        <InputField label="电话" v-model="resumeData.basics.phone" placeholder="138..." />
        <InputField label="邮箱" v-model="resumeData.basics.email" placeholder="example@..." />
      </div>
      <div class="grid grid-cols-2 gap-x-6 gap-y-2">
        <InputField label="城市" v-model="resumeData.basics.location" placeholder="北京" />
        <InputField label="网站/作品集" v-model="resumeData.basics.website" placeholder="github.com/..." />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useResume } from '../../composables/useResume'
import InputField from './InputField.vue'

const { resumeData } = useResume()
const isActive = ref(true)
</script>

