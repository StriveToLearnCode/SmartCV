<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { type ResumeData, useResume } from '../composables/useResume'
import StarGuide from './StarGuide.vue'
import { useAutoSave } from '../../composables/useAutoSave'
import SaveStatusSticker from '../../components/SaveStatusSticker.vue'

defineProps<{
  resume: ResumeData
}>()

const { addItem, removeItem, addSection } = useResume()
const { status: saveStatus, triggerSave, timeAgo, lastSavedTime } = useAutoSave()

const handleFocusOut = (e: FocusEvent) => {
  const target = e.target as HTMLElement
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
    triggerSave(async () => {
      // Mock Save
      await new Promise(resolve => setTimeout(resolve, 800))
    })
  }
}


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

// Icons (Hand-drawn style simplified)
const icons: Record<string, string> = {
  basics: '👤',
  education: '🎓',
  work: '💼',
  projects: '🚀',
  skills: '⚡️',
  summary: '📝',
  custom: '📌'
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

const handleAddItem = (type: 'education' | 'work' | 'projects' | 'skills') => {
  const id = addItem(type)
  if (type === 'work' || type === 'projects') {
    // 自动开启 STAR 引导
    activeStarGuide.value = `${type}-${id}`
  }
}

// Components with "Form Line" style
const InputField = {
  props: ['label', 'modelValue', 'type', 'placeholder'],
  emits: ['update:modelValue'],
  template: `
    <div class="flex flex-col gap-1 mb-5 relative group">
      <label class="text-[10px] font-bold text-stone-400 uppercase tracking-wider ml-1">{{ label }}</label>
      <input 
        :type="type || 'text'" 
        :value="modelValue" 
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
        class="w-full px-2 py-2 bg-transparent border-b-2 border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-stone-800 transition-colors placeholder:text-stone-300/50 font-serif"
      />
      <!-- Highlight line effect -->
      <div class="absolute bottom-0 left-0 w-0 h-[2px] bg-stone-800 transition-all duration-300 group-focus-within:w-full"></div>
    </div>
  `
}

const TextAreaField = {
  props: ['label', 'modelValue', 'placeholder', 'rows'],
  emits: ['update:modelValue'],
  template: `
    <div class="flex flex-col gap-1 mb-5 relative group">
      <label class="text-[10px] font-bold text-stone-400 uppercase tracking-wider ml-1">{{ label }}</label>
      <textarea 
        :value="modelValue" 
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        :placeholder="placeholder"
        :rows="rows || 3"
        class="w-full p-3 bg-[#fdfdfc] border-2 border-dashed border-stone-200 rounded-sm text-stone-800 text-sm focus:outline-none focus:border-stone-400 transition-all resize-none placeholder:text-stone-300/50 leading-relaxed font-serif"
      ></textarea>
    </div>
  `
}
</script>

<template>
  <div class="h-full overflow-y-auto p-6 pb-32 space-y-8 scrollbar-hide" @focusout="handleFocusOut">
    <!-- Save Status Sticker (Floating Top Right) -->
    <div class="fixed top-24 right-[55%] z-50 pointer-events-none">
      <div class="pointer-events-auto transform rotate-3 opacity-80 hover:opacity-100 transition-opacity">
        <SaveStatusSticker 
          :status="saveStatus" 
          :timeAgo="timeAgo" 
          :lastSavedTime="lastSavedTime"
          @retry="triggerSave(async () => await new Promise(r => setTimeout(r, 800)))"
        />
      </div>
    </div>

    <!-- 固定：基本信息 -->
    <div
      class="bg-white rounded-sm shadow-sm border border-stone-200 overflow-hidden group hover:shadow-md transition-all duration-300 relative"
    >
      <!-- Header -->
      <div
        @click="toggleSection('basics')"
        class="flex items-center justify-between p-4 cursor-pointer bg-[#fffdf5] border-b border-stone-100"
      >
        <div class="flex items-center gap-3">
          <span class="text-xl">{{ icons.basics }}</span>
          <span class="font-bold text-stone-800 text-sm tracking-wide font-serif">基本信息</span>
        </div>
        <div class="text-stone-300 transform transition-transform duration-300" :class="{ 'rotate-180': activeSections['basics'] }">
          ▼
        </div>
      </div>

      <div v-show="activeSections['basics']" class="p-6 bg-white">
        <div class="grid grid-cols-2 gap-x-6 gap-y-2">
          <InputField label="姓名" v-model="resume.basics.name" placeholder="你的名字" />
          <InputField label="意向职位" v-model="resume.basics.title" placeholder="例如：高级前端工程师" />
        </div>
        <div class="grid grid-cols-2 gap-x-6 gap-y-2">
          <InputField label="电话" v-model="resume.basics.phone" placeholder="138..." />
          <InputField label="邮箱" v-model="resume.basics.email" placeholder="example@..." />
        </div>
        <div class="grid grid-cols-2 gap-x-6 gap-y-2">
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
      class="space-y-8"
      ghost-class="ghost-card"
      drag-class="paper-twist-drag"
    >
      <div
        v-for="section in resume.sections"
        :key="section.id"
        class="bg-white rounded-sm shadow-sm border border-stone-200 overflow-hidden group hover:shadow-md transition-all duration-300 relative"
        :class="{ 'ring-1 ring-stone-300': activeSections[section.id] }"
      >
        <!-- 模块头部 -->
        <div
          class="flex items-center justify-between p-4 bg-[#fffdf5] border-b border-stone-100 cursor-pointer select-none"
          @click="toggleSection(section.id)"
        >
          <div class="flex items-center gap-3 flex-1">
            <!-- 拖拽手柄 (Grip lines) -->
            <div
              class="drag-handle cursor-grab active:cursor-grabbing text-stone-300 hover:text-stone-500 p-2 -ml-2 hover:bg-stone-100/50 rounded transition-colors flex flex-col gap-0.5"
              title="拖拽排序"
            >
              <div class="w-4 h-0.5 bg-stone-300 rounded-full"></div>
              <div class="w-4 h-0.5 bg-stone-300 rounded-full"></div>
              <div class="w-4 h-0.5 bg-stone-300 rounded-full"></div>
            </div>
            
            <span class="text-xl">{{ icons[section.type] || icons.basics }}</span>
            
            <div v-if="editingTitleId === section.id" class="flex-1 mr-4" @click.stop>
              <input 
                ref="titleInputRef"
                v-model="section.title" 
                @blur="finishEditingTitle"
                @keydown.enter="finishEditingTitle"
                class="w-full px-2 py-1 bg-transparent border-b border-stone-800 text-sm focus:outline-none font-bold text-stone-800 font-serif"
              />
            </div>
            <div v-else class="group/title flex items-center gap-2">
              <span class="font-bold text-stone-800 text-sm tracking-wide font-serif">{{ section.title }}</span>
              <button 
                 @click.stop="startEditingTitle(section.id)"
                 class="opacity-0 group-hover/title:opacity-100 text-stone-400 hover:text-stone-600 p-1 transition-opacity"
                 title="重命名"
              >
                 ✎
              </button>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-2">
             <div v-if="section.type === 'skills'" class="mr-2" @click.stop>
              <select 
                v-model="section.variant" 
                class="text-[10px] font-bold text-stone-400 bg-transparent border-none hover:text-stone-600 focus:outline-none cursor-pointer uppercase"
              >
                <option value="list">List</option>
                <option value="matrix">Matrix</option>
                <option value="cloud">Cloud</option>
              </select>
            </div>

            <button
              @click.stop="section.isVisible = !section.isVisible"
              class="text-stone-300 hover:text-stone-600 p-1 transition-colors"
              :title="section.isVisible ? '隐藏' : '显示'"
            >
              {{ section.isVisible ? '👁️' : '🙈' }}
            </button>
            
            <div class="text-stone-300 transform transition-transform duration-300" :class="{ 'rotate-180': activeSections[section.id] }">
              ▼
            </div>
          </div>
        </div>

        <!-- 模块内容 -->
        <div v-show="activeSections[section.id]" class="p-6 bg-white relative">
          <!-- Paper texture overlay for inner content -->
          <div class="absolute inset-0 bg-paper-texture opacity-20 pointer-events-none"></div>
          <div class="relative z-10">

          <!-- 个人简介 -->
          <div v-if="section.type === 'summary'">
            <TextAreaField label="内容" v-model="resume.basics.summary" rows="5" placeholder="简要介绍你的背景..." />
          </div>

          <!-- 教育经历 -->
          <div v-if="section.type === 'education'" class="space-y-8">
            <div
              v-for="(edu, idx) in resume.education"
              :key="edu.id"
              class="relative pl-6 border-l-2 border-stone-200 group/item"
            >
              <div class="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-white border-2 border-stone-300 group-hover/item:border-stone-500 transition-colors"></div>
              
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
              @click="handleAddItem('education')"
              class="w-full py-2 text-stone-400 text-xs font-bold uppercase tracking-widest border-t border-dashed border-stone-200 hover:text-stone-600 hover:bg-stone-50 transition-colors"
            >
              + 添加教育经历
            </button>
          </div>

          <!-- 工作经历 -->
          <div v-if="section.type === 'work'" class="space-y-8">
            <div
              v-for="(job, idx) in resume.work"
              :key="job.id"
              class="relative pl-6 border-l-2 border-stone-200 group/item"
            >
              <div class="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-white border-2 border-stone-300 group-hover/item:border-stone-500 transition-colors"></div>
              
              <div class="absolute right-0 top-0 opacity-0 group-hover/item:opacity-100 transition-opacity">
                 <button @click="removeItem('work', job.id)" class="text-stone-300 hover:text-red-500">×</button>
              </div>

              <InputField label="公司" v-model="job.company" />
              <InputField label="职位" v-model="job.position" />
              <div class="grid grid-cols-2 gap-x-6 gap-y-2">
                <InputField label="开始时间" v-model="job.startDate" type="text" placeholder="YYYY-MM" />
                <InputField label="结束时间" v-model="job.endDate" type="text" placeholder="YYYY-MM" />
              </div>
              
              <div class="mt-4">
                <div class="flex justify-between items-end mb-2">
                  <label class="text-[10px] font-bold text-stone-400 uppercase tracking-wider ml-1">工作内容</label>
                  <button 
                    @click="toggleStarGuide('work', job.id)"
                    class="text-[10px] font-bold flex items-center gap-1 px-2 py-1 rounded-sm border transition-all group/btn"
                    :class="activeStarGuide === `work-${job.id}` ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-white border-stone-200 text-stone-500 hover:border-amber-200 hover:text-amber-600'"
                  >
                    <span class="group-hover/btn:animate-bounce">✨</span> 
                    {{ activeStarGuide === `work-${job.id}` ? '收起助手' : '不知道怎么写？' }}
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
                  placeholder="简单描述一下你做了什么，或者点击右上角 '不知道怎么写'，我来帮你..."
                  class="w-full p-3 bg-[#fdfdfc] border-2 border-dashed border-stone-200 rounded-sm text-stone-800 text-sm focus:outline-none focus:border-stone-400 transition-all resize-none placeholder:text-stone-300/50 leading-relaxed font-serif"
                ></textarea>
              </div>
            </div>
            <button
              @click="handleAddItem('work')"
              class="w-full py-2 text-stone-400 text-xs font-bold uppercase tracking-widest border-t border-dashed border-stone-200 hover:text-stone-600 hover:bg-stone-50 transition-colors"
            >
              + 添加工作经历
            </button>
          </div>

          <!-- 项目经验 -->
          <div v-if="section.type === 'projects'" class="space-y-8">
            <div
              v-for="(proj, idx) in resume.projects"
              :key="proj.id"
              class="relative pl-6 border-l-2 border-stone-200 group/item"
            >
              <div class="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-white border-2 border-stone-300 group-hover/item:border-stone-500 transition-colors"></div>
              <div class="absolute right-0 top-0 opacity-0 group-hover/item:opacity-100 transition-opacity">
                 <button @click="removeItem('projects', proj.id)" class="text-stone-300 hover:text-red-500">×</button>
              </div>

              <InputField label="项目名称" v-model="proj.name" />
              
              <div class="mt-4">
                <div class="flex justify-between items-end mb-2">
                  <label class="text-[10px] font-bold text-stone-400 uppercase tracking-wider ml-1">项目描述</label>
                  <button 
                    @click="toggleStarGuide('projects', proj.id)"
                    class="text-[10px] font-bold flex items-center gap-1 px-2 py-1 rounded-sm border transition-all group/btn"
                    :class="activeStarGuide === `projects-${proj.id}` ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-white border-stone-200 text-stone-500 hover:border-amber-200 hover:text-amber-600'"
                  >
                    <span class="group-hover/btn:animate-bounce">✨</span> 
                    {{ activeStarGuide === `projects-${proj.id}` ? '收起助手' : '理不清思路？' }}
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
                  placeholder="这个项目最让你自豪的是什么？"
                  class="w-full p-3 bg-[#fdfdfc] border-2 border-dashed border-stone-200 rounded-sm text-stone-800 text-sm focus:outline-none focus:border-stone-400 transition-all resize-none placeholder:text-stone-300/50 leading-relaxed font-serif"
                ></textarea>
              </div>
            </div>
            <button
              @click="handleAddItem('projects')"
              class="w-full py-2 text-stone-400 text-xs font-bold uppercase tracking-widest border-t border-dashed border-stone-200 hover:text-stone-600 hover:bg-stone-50 transition-colors"
            >
              + 添加项目经验
            </button>
          </div>

          <!-- 技能 -->
          <div v-if="section.type === 'skills'" class="space-y-6">
            <div v-for="(skill, idx) in resume.skills" :key="skill.id" class="group/item relative">
              <div class="absolute -right-2 -top-2 opacity-0 group-hover/item:opacity-100 transition-opacity z-10">
                 <button @click="removeItem('skills', skill.id)" class="text-stone-300 hover:text-red-500 bg-white rounded-full shadow-sm border border-stone-100 w-5 h-5 flex items-center justify-center text-xs">×</button>
              </div>
              
              <div class="flex flex-col gap-2">
                <input
                  v-model="skill.name"
                  class="w-full border-b border-stone-200 pb-1 text-sm font-bold text-stone-700 focus:border-stone-800 focus:outline-none bg-transparent"
                  placeholder="技能类别 (如: 前端)"
                />
                
                <textarea
                  :value="skill.keywords.join(', ')"
                  @input="updateKeywords(skill, $event)"
                  class="w-full p-2 bg-stone-50 border border-transparent hover:border-stone-200 rounded text-sm focus:outline-none focus:bg-white focus:border-stone-400 text-stone-600 transition-colors"
                  placeholder="输入技能，用逗号分隔..."
                  rows="2"
                ></textarea>
                
                <div class="flex flex-wrap gap-2 mt-1" v-if="skill.keywords.length">
                  <span
                    v-for="(kw, kwi) in skill.keywords"
                    :key="kwi"
                    class="px-2 py-0.5 bg-[#fefce8] text-stone-600 text-xs rounded border border-stone-200"
                  >
                    {{ kw }}
                  </span>
                </div>
              </div>
            </div>
            <button
              @click="handleAddItem('skills')"
              class="w-full py-2 text-stone-400 text-xs font-bold uppercase tracking-widest border-t border-dashed border-stone-200 hover:text-stone-600 hover:bg-stone-50 transition-colors"
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
      </div>
    </VueDraggable>

    <!-- 底部添加模块按钮 -->
    <div class="grid grid-cols-2 gap-4 pt-8 border-t-2 border-dashed border-stone-200/50">
      <p class="col-span-2 text-[10px] uppercase tracking-widest text-center text-stone-400 mb-2 font-serif">补充更多模块</p>
      <button
        @click="addSection('custom', '自我评价')"
        class="py-3 px-4 bg-white border border-stone-200 rounded-sm text-stone-600 text-xs font-bold hover:border-stone-400 hover:-translate-y-0.5 transition-all shadow-sm flex items-center justify-center gap-2 group"
      >
        <span class="text-lg group-hover:scale-110 transition-transform">📝</span>
        自我评价
      </button>
      <button
        @click="addSection('custom', '个人作品')"
        class="py-3 px-4 bg-white border border-stone-200 rounded-sm text-stone-600 text-xs font-bold hover:border-stone-400 hover:-translate-y-0.5 transition-all shadow-sm flex items-center justify-center gap-2 group"
      >
        <span class="text-lg group-hover:scale-110 transition-transform">🎨</span>
        个人作品
      </button>
    </div>
  </div>
</template>

<style scoped>
.drag-handle {
  touch-action: none;
}
.ghost-card {
  opacity: 0.4;
  background-color: #f5f5f4; 
  border: 2px dashed #a8a29e;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.paper-twist-drag {
  opacity: 0.9;
  transform: rotate(2deg) scale(1.02);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  z-index: 100;
}
</style>
