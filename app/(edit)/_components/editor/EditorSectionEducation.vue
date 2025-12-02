<template>
  <div class="space-y-8">
    <div
      v-for="(edu, idx) in resumeData.education"
      :key="edu.id"
      class="relative pl-6 border-l-2 border-stone-200 group/item"
    >
      <div
        class="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-white border-2 border-stone-300 group-hover/item:border-stone-500 transition-colors"
      ></div>

      <div class="absolute right-0 top-0 opacity-0 group-hover/item:opacity-100 transition-opacity">
        <button @click="removeItem('education', edu.id)" class="text-stone-300 hover:text-red-500">×</button>
      </div>

      <InputField label="学校" v-model="edu.institution" />
      <div class="grid grid-cols-2 gap-x-6 gap-y-2">
        <InputField label="专业" v-model="edu.area" />
        <InputField label="学历" v-model="edu.studyType" />
      </div>
      <div class="grid grid-cols-2 gap-x-6 gap-y-2">
        <InputField label="开始时间" v-model="edu.startDate" type="text" placeholder="YYYY-MM" />
        <InputField label="结束时间" v-model="edu.endDate" type="text" placeholder="YYYY-MM" />
      </div>
      <InputField label="成绩/荣誉" v-model="edu.score" placeholder="GPA 3.8, 优秀毕业生..." />
    </div>

    <button
      @click="addItem('education')"
      class="w-full py-2 text-stone-400 text-xs font-bold uppercase tracking-widest border-t border-dashed border-stone-200 hover:text-stone-600 hover:bg-stone-50 transition-colors"
    >
      + 添加教育经历
    </button>
  </div>
</template>
<script setup lang="ts">
import { useResume } from '../../composables/useResume'
import InputField from './InputField.vue'

const { resumeData, addItem, removeItem } = useResume()
</script>

