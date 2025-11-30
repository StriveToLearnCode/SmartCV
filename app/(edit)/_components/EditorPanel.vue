<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { type ResumeData, useResume } from '../composables/useResume'

defineProps<{
  resume: ResumeData
}>()

const { addItem, removeItem } = useResume()

// Icons
const icons: Record<string, string> = {
  basics:
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  education:
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
  work: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  projects:
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>',
  skills:
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>',
  summary:
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>'
}

const activeSections = ref<Record<string, boolean>>({
  basics: true
})

const toggleSection = (id: string) => {
  activeSections.value[id] = !activeSections.value[id]
}

const updateKeywords = (skill: any, event: Event) => {
  const target = event.target as HTMLTextAreaElement
  skill.keywords = target.value.split(',').map((s) => s.trim())
}

// Components
const InputField = {
  props: ['label', 'modelValue', 'type', 'placeholder'],
  emits: ['update:modelValue'],
  template: `
    <div class="flex flex-col gap-1.5 mb-4">
      <label class="text-xs font-bold text-stone-500 uppercase tracking-wider">{{ label }}</label>
      <input 
        :type="type || 'text'" 
        :value="modelValue" 
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
        class="w-full px-3 py-2.5 bg-stone-50/50 border border-stone-200 rounded-lg text-stone-800 text-sm focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition-all shadow-sm hover:bg-white"
      />
    </div>
  `
}

const TextAreaField = {
  props: ['label', 'modelValue', 'placeholder', 'rows'],
  emits: ['update:modelValue'],
  template: `
    <div class="flex flex-col gap-1.5 mb-4">
      <label class="text-xs font-bold text-stone-500 uppercase tracking-wider">{{ label }}</label>
      <textarea 
        :value="modelValue" 
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        :placeholder="placeholder"
        :rows="rows || 3"
        class="w-full px-3 py-2.5 bg-stone-50/50 border border-stone-200 rounded-lg text-stone-800 text-sm focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition-all shadow-sm resize-none hover:bg-white"
      ></textarea>
    </div>
  `
}
</script>

<template>
  <div class="h-full overflow-y-auto p-6 pb-24 space-y-6">
    <!-- 固定：基本信息 -->
    <div
      class="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden group hover:shadow-md transition-all duration-300"
    >
      <div
        @click="toggleSection('basics')"
        class="flex items-center justify-between p-4 cursor-pointer bg-stone-50/30 hover:bg-stone-50 transition-colors"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 shadow-inner"
            v-html="icons.basics"
          ></div>
          <span class="font-serif font-bold text-stone-700">基本信息</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-stone-400 transition-transform duration-300"
          :class="{ 'rotate-180': activeSections['basics'] }"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      <div v-show="activeSections['basics']" class="p-5 border-t border-stone-100">
        <div class="grid grid-cols-2 gap-4">
          <InputField label="姓名" v-model="resume.basics.name" placeholder="你的名字" />
          <InputField label="意向职位" v-model="resume.basics.title" placeholder="例如：高级前端工程师" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <InputField label="电话" v-model="resume.basics.phone" placeholder="138..." />
          <InputField label="邮箱" v-model="resume.basics.email" placeholder="example@..." />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <InputField label="城市" v-model="resume.basics.location" placeholder="北京" />
          <InputField label="网站/作品集" v-model="resume.basics.website" placeholder="github.com/..." />
        </div>
      </div>
    </div>

    <!-- 可拖拽区域 -->
    <VueDraggable v-model="resume.sections" :animation="200" handle=".drag-handle" class="space-y-4">
      <div
        v-for="section in resume.sections"
        :key="section.id"
        class="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden group hover:shadow-md transition-all duration-300"
      >
        <!-- 模块头部 -->
        <div class="flex items-center justify-between p-4 bg-stone-50/30 hover:bg-stone-50 transition-colors">
          <div class="flex items-center gap-3 flex-1 cursor-pointer" @click="toggleSection(section.id)">
            <!-- 拖拽手柄 -->
            <div class="drag-handle cursor-grab active:cursor-grabbing text-stone-300 hover:text-stone-500 p-1 -ml-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="9" cy="12" r="1" />
                <circle cx="9" cy="5" r="1" />
                <circle cx="9" cy="19" r="1" />
                <circle cx="15" cy="12" r="1" />
                <circle cx="15" cy="5" r="1" />
                <circle cx="15" cy="19" r="1" />
              </svg>
            </div>
            <div
              class="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-600 shadow-inner"
              v-html="icons[section.type] || icons.basics"
            ></div>
            <span class="font-serif font-bold text-stone-700">{{ section.title }}</span>
          </div>

          <div class="flex items-center gap-2">
            <!-- 开关/显示隐藏 -->
            <button
              @click="section.isVisible = !section.isVisible"
              class="text-stone-400 hover:text-stone-600 p-1 transition-colors"
              :title="section.isVisible ? '隐藏模块' : '显示模块'"
            >
              <svg
                v-if="section.isVisible"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                <line x1="2" x2="22" y1="2" y2="22" />
              </svg>
            </button>
            <!-- 折叠 -->
            <button
              @click="toggleSection(section.id)"
              class="text-stone-400 transition-transform duration-300 p-1"
              :class="{ 'rotate-180': activeSections[section.id] }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>

        <!-- 模块内容 -->
        <div v-show="activeSections[section.id]" class="p-5 border-t border-stone-100 bg-white">
          <!-- 个人简介 -->
          <div v-if="section.type === 'summary'">
            <TextAreaField label="内容" v-model="resume.basics.summary" rows="5" placeholder="简要介绍你的背景..." />
          </div>

          <!-- 教育经历 -->
          <div v-if="section.type === 'education'" class="space-y-6">
            <div
              v-for="edu in resume.education"
              :key="edu.id"
              class="relative pl-4 border-l-2 border-stone-200 group/item"
            >
              <div
                class="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-stone-300 group-hover/item:bg-stone-400 transition-colors"
              ></div>
              <div class="flex justify-end mb-2">
                <button
                  @click="removeItem('education', edu.id)"
                  class="text-xs text-red-400 hover:text-red-600 flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                  删除
                </button>
              </div>
              <InputField label="学校" v-model="edu.institution" />
              <div class="grid grid-cols-2 gap-4">
                <InputField label="专业" v-model="edu.area" />
                <InputField label="学历" v-model="edu.studyType" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <InputField label="开始时间" v-model="edu.startDate" type="text" placeholder="YYYY-MM" />
                <InputField label="结束时间" v-model="edu.endDate" type="text" placeholder="YYYY-MM" />
              </div>
              <InputField label="成绩/荣誉" v-model="edu.score" placeholder="GPA 3.8, 优秀毕业生..." />
            </div>
            <button
              @click="addItem('education')"
              class="w-full py-3 border border-dashed border-stone-300 rounded-xl text-stone-500 hover:bg-stone-50 hover:text-stone-700 hover:border-stone-400 text-sm transition-all flex items-center justify-center gap-2 font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              添加教育经历
            </button>
          </div>

          <!-- 工作经历 -->
          <div v-if="section.type === 'work'" class="space-y-6">
            <div v-for="job in resume.work" :key="job.id" class="relative pl-4 border-l-2 border-stone-200 group/item">
              <div
                class="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-stone-300 group-hover/item:bg-stone-400 transition-colors"
              ></div>
              <div class="flex justify-end mb-2">
                <button
                  @click="removeItem('work', job.id)"
                  class="text-xs text-red-400 hover:text-red-600 flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                  删除
                </button>
              </div>
              <InputField label="公司" v-model="job.company" />
              <InputField label="职位" v-model="job.position" />
              <div class="grid grid-cols-2 gap-4">
                <InputField label="开始时间" v-model="job.startDate" type="text" placeholder="YYYY-MM" />
                <InputField label="结束时间" v-model="job.endDate" type="text" placeholder="YYYY-MM" />
              </div>
              <TextAreaField label="工作内容" v-model="job.summary" rows="5" placeholder="描述你的主要职责和成就..." />
            </div>
            <button
              @click="addItem('work')"
              class="w-full py-3 border border-dashed border-stone-300 rounded-xl text-stone-500 hover:bg-stone-50 hover:text-stone-700 hover:border-stone-400 text-sm transition-all flex items-center justify-center gap-2 font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              添加工作经历
            </button>
          </div>

          <!-- 项目经验 -->
          <div v-if="section.type === 'projects'" class="space-y-6">
            <div
              v-for="proj in resume.projects"
              :key="proj.id"
              class="relative pl-4 border-l-2 border-stone-200 group/item"
            >
              <div
                class="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-stone-300 group-hover/item:bg-stone-400 transition-colors"
              ></div>
              <div class="flex justify-end mb-2">
                <button
                  @click="removeItem('projects', proj.id)"
                  class="text-xs text-red-400 hover:text-red-600 flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                  删除
                </button>
              </div>
              <InputField label="项目名称" v-model="proj.name" />
              <TextAreaField label="项目描述" v-model="proj.description" rows="4" placeholder="项目背景和你的贡献..." />
            </div>
            <button
              @click="addItem('projects')"
              class="w-full py-3 border border-dashed border-stone-300 rounded-xl text-stone-500 hover:bg-stone-50 hover:text-stone-700 hover:border-stone-400 text-sm transition-all flex items-center justify-center gap-2 font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              添加项目经验
            </button>
          </div>

          <!-- 技能 -->
          <div v-if="section.type === 'skills'" class="space-y-4">
            <div v-for="skill in resume.skills" :key="skill.id" class="flex gap-3 items-start group/item">
              <div class="flex-1">
                <input
                  v-model="skill.name"
                  class="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-sm mb-2"
                  placeholder="技能类别 (如: 前端)"
                />
                <textarea
                  :value="skill.keywords.join(', ')"
                  @input="updateKeywords(skill, $event)"
                  class="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded text-sm"
                  placeholder="技能列表，用逗号分隔..."
                  rows="2"
                ></textarea>
              </div>
              <button @click="removeItem('skills', skill.id)" class="text-stone-400 hover:text-red-500 mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            </div>
            <button
              @click="addItem('skills')"
              class="w-full py-2 border border-dashed border-stone-300 rounded-lg text-stone-500 hover:bg-stone-50 text-xs transition-colors"
            >
              + 添加技能组
            </button>
          </div>
        </div>
      </div>
    </VueDraggable>

    <!-- 底部添加模块按钮 -->
    <div class="grid grid-cols-2 gap-3 pt-4 border-t border-stone-200 border-dashed">
      <p class="col-span-2 text-xs text-center text-stone-400 mb-1">自定义模块</p>
      <button
        class="py-2 px-3 bg-white border border-stone-200 rounded-lg text-stone-600 text-xs hover:border-stone-400 transition-colors shadow-sm"
      >
        + 自定义模块
      </button>
      <button
        class="py-2 px-3 bg-white border border-stone-200 rounded-lg text-stone-600 text-xs hover:border-stone-400 transition-colors shadow-sm"
      >
        + 获奖经历
      </button>
    </div>
  </div>
</template>

<style scoped>
.drag-handle {
  touch-action: none;
}
</style>
