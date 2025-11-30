<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { type ResumeData, useResume } from '../composables/useResume'
import StarGuide from './StarGuide.vue'

defineProps<{
  resume: ResumeData
}>()

const { addItem, removeItem, addSection } = useResume()

// State for STAR guide
const activeStarGuide = ref<string | null>(null) // Format: 'type-id' e.g., 'work-1'

const toggleStarGuide = (type: string, id: string) => {
  const key = `${type}-${id}`
  if (activeStarGuide.value === key) {
    activeStarGuide.value = null
  } else {
    activeStarGuide.value = key
  }
}

// State for Title Editing
const editingTitleId = ref<string | null>(null)
const titleInputRef = ref<HTMLInputElement | null>(null)

const startEditingTitle = (id: string) => {
  editingTitleId.value = id
  nextTick(() => {
    titleInputRef.value?.focus()
  })
}

const finishEditingTitle = () => {
  editingTitleId.value = null
}

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
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>',
  custom:
    '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>'
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
      <label class="text-[10px] font-bold text-stone-500 uppercase tracking-wider">{{ label }}</label>
      <input 
        :type="type || 'text'" 
        :value="modelValue" 
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
        class="w-full px-3 py-2.5 bg-white/80 border border-stone-200 rounded-lg text-stone-800 text-sm focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200/50 transition-all shadow-sm hover:bg-white hover:border-stone-300"
      />
    </div>
  `
}

const TextAreaField = {
  props: ['label', 'modelValue', 'placeholder', 'rows'],
  emits: ['update:modelValue'],
  template: `
    <div class="flex flex-col gap-1.5 mb-4">
      <label class="text-[10px] font-bold text-stone-500 uppercase tracking-wider">{{ label }}</label>
      <textarea 
        :value="modelValue" 
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        :placeholder="placeholder"
        :rows="rows || 3"
        class="w-full px-3 py-2.5 bg-white/80 border border-stone-200 rounded-lg text-stone-800 text-sm focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200/50 transition-all shadow-sm resize-none hover:bg-white hover:border-stone-300"
      ></textarea>
    </div>
  `
}
</script>

<template>
  <div class="h-full overflow-y-auto p-6 pb-32 space-y-6 scrollbar-hide">
    <!-- 固定：基本信息 -->
    <div
      class="bg-[#fbfbf9] rounded-sm shadow-[1px_2px_4px_rgba(0,0,0,0.06)] border border-stone-200 overflow-hidden group hover:shadow-[2px_4px_8px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-rotate-[0.5deg]"
    >
      <div
        @click="toggleSection('basics')"
        class="flex items-center justify-between p-4 cursor-pointer bg-[#fbfbf9] hover:bg-[#fdfdfc] transition-colors"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 rounded-lg bg-[#f0f0ea] flex items-center justify-center text-stone-600 border border-stone-200/50"
            v-html="icons.basics"
          ></div>
          <span class="font-serif font-bold text-stone-700 text-sm tracking-wide">基本信息</span>
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

      <div v-show="activeSections['basics']" class="p-5 border-t border-stone-200/60 bg-white/40">
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
    <VueDraggable
      v-model="resume.sections"
      :animation="200"
      handle=".drag-handle"
      class="space-y-6"
      ghost-class="ghost-card"
      :drag-class="'opacity-50'"
    >
      <div
        v-for="section in resume.sections"
        :key="section.id"
        class="bg-[#fbfbf9] rounded-sm shadow-[1px_2px_4px_rgba(0,0,0,0.06)] border border-stone-200 overflow-hidden group hover:shadow-[2px_4px_8px_rgba(0,0,0,0.08)] transition-all duration-300 transform focus-within:rotate-0 hover:rotate-[0.5deg]"
        :class="{ 'rotate-0': activeSections[section.id] }"
      >
        <!-- 模块头部 -->
        <div
          class="flex items-center justify-between p-4 bg-[#fbfbf9] hover:bg-[#fdfdfc] transition-colors select-none"
        >
          <div class="flex items-center gap-3 flex-1 cursor-pointer" @click="toggleSection(section.id)">
            <!-- 拖拽手柄 -->
            <div
              class="drag-handle cursor-grab active:cursor-grabbing text-stone-300 hover:text-stone-500 p-1.5 -ml-1.5 hover:bg-stone-100 rounded-md transition-colors"
              title="拖拽排序"
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
                <circle cx="9" cy="12" r="1" />
                <circle cx="9" cy="5" r="1" />
                <circle cx="9" cy="19" r="1" />
                <circle cx="15" cy="12" r="1" />
                <circle cx="15" cy="5" r="1" />
                <circle cx="15" cy="19" r="1" />
              </svg>
            </div>
            <div
              class="w-8 h-8 rounded-lg bg-[#f0f0ea] flex items-center justify-center text-stone-600 border border-stone-200/50"
              v-html="icons[section.type] || icons.basics"
            ></div>
            
            <div v-if="editingTitleId === section.id" class="flex-1 mr-4" @click.stop>
              <input 
                ref="titleInputRef"
                v-model="section.title" 
                @blur="finishEditingTitle"
                @keydown.enter="finishEditingTitle"
                class="w-full px-2 py-1 bg-white border border-amber-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-amber-100 font-serif font-bold text-stone-800"
              />
            </div>
            <div v-else class="group/title flex items-center gap-2">
              <span class="font-serif font-bold text-stone-700 text-sm tracking-wide">{{ section.title }}</span>
              <button 
                 @click.stop="startEditingTitle(section.id)"
                 class="opacity-0 group-hover/title:opacity-100 text-stone-400 hover:text-stone-600 p-1 transition-opacity hover:bg-stone-100 rounded"
                 title="重命名模块"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
              </button>
            </div>
          </div>

          <div class="flex items-center gap-1">
            <!-- 开关/显示隐藏 -->
            <button
              @click="section.isVisible = !section.isVisible"
              class="text-stone-300 hover:text-stone-600 p-1.5 rounded-md hover:bg-stone-100 transition-all"
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
              class="text-stone-300 hover:text-stone-600 transition-transform duration-300 p-1.5 rounded-md hover:bg-stone-100"
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
        <div v-show="activeSections[section.id]" class="p-5 border-t border-stone-200/60 bg-white/40">
          <!-- 个人简介 -->
          <div v-if="section.type === 'summary'">
            <TextAreaField label="内容" v-model="resume.basics.summary" rows="5" placeholder="简要介绍你的背景..." />
          </div>

          <!-- 教育经历 -->
          <div v-if="section.type === 'education'" class="space-y-6">
            <div
              v-for="edu in resume.education"
              :key="edu.id"
              class="relative pl-4 border-l-2 border-stone-300/50 group/item"
            >
              <div
                class="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-stone-400 group-hover/item:bg-stone-500 transition-colors"
              ></div>
              <div class="flex justify-end mb-2">
                <button
                  @click="removeItem('education', edu.id)"
                  class="text-xs text-stone-400 hover:text-red-500 flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity px-2 py-1 hover:bg-red-50 rounded"
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
              class="w-full py-3 border border-dashed border-stone-300 rounded-lg text-stone-500 hover:bg-stone-50 hover:text-stone-700 hover:border-stone-400 text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
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
            <div
              v-for="job in resume.work"
              :key="job.id"
              class="relative pl-4 border-l-2 border-stone-300/50 group/item"
            >
              <div
                class="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-stone-400 group-hover/item:bg-stone-500 transition-colors"
              ></div>
              <div class="flex justify-end mb-2">
                <button
                  @click="removeItem('work', job.id)"
                  class="text-xs text-stone-400 hover:text-red-500 flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity px-2 py-1 hover:bg-red-50 rounded"
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
              <div class="mb-4">
                <div class="flex justify-between items-end mb-1.5">
                  <label class="text-[10px] font-bold text-stone-500 uppercase tracking-wider">工作内容</label>
                  <button 
                    @click="toggleStarGuide('work', job.id)"
                    class="text-[10px] font-bold flex items-center gap-1 px-2 py-0.5 rounded transition-colors"
                    :class="activeStarGuide === `work-${job.id}` ? 'bg-amber-100 text-amber-700' : 'text-amber-600 hover:bg-amber-50'"
                  >
                    <span class="text-xs">✨</span> STAR 写作助手
                  </button>
                </div>
                
                <StarGuide 
                  v-if="activeStarGuide === `work-${job.id}`"
                  :initial-value="job.summary"
                  @update:modelValue="job.summary = $event"
                  @close="activeStarGuide = null"
                />
                
                <textarea 
                  v-else
                  v-model="job.summary"
                  rows="5"
                  placeholder="描述你的主要职责和成就..."
                  class="w-full px-3 py-2.5 bg-white/80 border border-stone-200 rounded-lg text-stone-800 text-sm focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200/50 transition-all shadow-sm resize-none hover:bg-white hover:border-stone-300"
                ></textarea>
              </div>
            </div>
            <button
              @click="addItem('work')"
              class="w-full py-3 border border-dashed border-stone-300 rounded-lg text-stone-500 hover:bg-stone-50 hover:text-stone-700 hover:border-stone-400 text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
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
              class="relative pl-4 border-l-2 border-stone-300/50 group/item"
            >
              <div
                class="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-stone-400 group-hover/item:bg-stone-500 transition-colors"
              ></div>
              <div class="flex justify-end mb-2">
                <button
                  @click="removeItem('projects', proj.id)"
                  class="text-xs text-stone-400 hover:text-red-500 flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity px-2 py-1 hover:bg-red-50 rounded"
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
              <div class="mb-4">
                <div class="flex justify-between items-end mb-1.5">
                  <label class="text-[10px] font-bold text-stone-500 uppercase tracking-wider">项目描述</label>
                  <button 
                    @click="toggleStarGuide('projects', proj.id)"
                    class="text-[10px] font-bold flex items-center gap-1 px-2 py-0.5 rounded transition-colors"
                    :class="activeStarGuide === `projects-${proj.id}` ? 'bg-amber-100 text-amber-700' : 'text-amber-600 hover:bg-amber-50'"
                  >
                    <span class="text-xs">✨</span> STAR 写作助手
                  </button>
                </div>
                
                <StarGuide 
                  v-if="activeStarGuide === `projects-${proj.id}`"
                  :initial-value="proj.description"
                  @update:modelValue="proj.description = $event"
                  @close="activeStarGuide = null"
                />
                
                <textarea 
                  v-else
                  v-model="proj.description"
                  rows="4"
                  placeholder="项目背景和你的贡献..."
                  class="w-full px-3 py-2.5 bg-white/80 border border-stone-200 rounded-lg text-stone-800 text-sm focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200/50 transition-all shadow-sm resize-none hover:bg-white hover:border-stone-300"
                ></textarea>
              </div>
            </div>
            <button
              @click="addItem('projects')"
              class="w-full py-3 border border-dashed border-stone-300 rounded-lg text-stone-500 hover:bg-stone-50 hover:text-stone-700 hover:border-stone-400 text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
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
                  class="w-full px-3 py-2.5 bg-white/80 border border-stone-200 rounded-lg text-sm mb-2 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200/50"
                  placeholder="技能类别 (如: 前端)"
                />
                <!-- Visual Tags/Chips for Keywords -->
                <div class="flex flex-wrap gap-2 mb-2" v-if="skill.keywords.length">
                  <span
                    v-for="(kw, kwi) in skill.keywords"
                    :key="kwi"
                    class="px-2 py-1 bg-stone-100 text-stone-600 text-xs rounded-md border border-stone-200 flex items-center gap-1"
                  >
                    {{ kw }}
                    <button @click="skill.keywords.splice(kwi, 1)" class="hover:text-red-500">×</button>
                  </span>
                </div>
                <textarea
                  :value="skill.keywords.join(', ')"
                  @input="updateKeywords(skill, $event)"
                  class="w-full px-3 py-2.5 bg-white/80 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-200/50 text-stone-500"
                  placeholder="输入技能，用逗号分隔..."
                  rows="1"
                ></textarea>
              </div>
              <button
                @click="removeItem('skills', skill.id)"
                class="text-stone-300 hover:text-red-500 mt-2 p-1 rounded hover:bg-stone-100 transition-colors"
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
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            </div>
            <button
              @click="addItem('skills')"
              class="w-full py-2 border border-dashed border-stone-300 rounded-lg text-stone-500 hover:bg-stone-50 text-xs font-bold tracking-wider uppercase transition-colors"
            >
              + 添加技能组
            </button>
          </div>

          <!-- 自定义模块 -->
          <div v-if="section.type === 'custom'">
             <TextAreaField 
               label="模块内容" 
               v-model="resume.custom[section.id]" 
               rows="6" 
               placeholder="输入自定义内容..." 
             />
          </div>
        </div>
      </div>
    </VueDraggable>

    <!-- 底部添加模块按钮 -->
    <div class="grid grid-cols-2 gap-3 pt-4 border-t border-stone-200 border-dashed">
      <p class="col-span-2 text-[10px] uppercase tracking-widest text-center text-stone-400 mb-1">更多模块</p>
      <button
        @click="addSection('custom', '自定义模块')"
        class="py-3 px-3 bg-[#fbfbf9] border border-stone-200 rounded-xl text-stone-600 text-xs hover:border-stone-400 transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 group hover:-rotate-1"
      >
        <span
          class="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 transition-colors text-stone-500"
          >+</span
        >
        自定义模块
      </button>
      <button
        class="py-3 px-3 bg-[#fbfbf9] border border-stone-200 rounded-xl text-stone-600 text-xs hover:border-stone-400 transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 group hover:rotate-1"
      >
        <span
          class="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-stone-200 transition-colors text-stone-500"
          >+</span
        >
        获奖经历
      </button>
    </div>
  </div>
</template>

<style scoped>
.drag-handle {
  touch-action: none;
}
.ghost-card {
  opacity: 0.5;
  background-color: #fafaf9; /* stone-50 */
  border-style: dashed;
  border-color: #d6d3d1; /* stone-300 */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
