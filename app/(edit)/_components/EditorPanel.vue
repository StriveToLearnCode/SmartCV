<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useResume } from '../composables/useResume'
import { useAutoSave } from '../../composables/useAutoSave'
import SaveStatusSticker from '../../components/SaveStatusSticker.vue'

import EditorSectionBasics from './editor/EditorSectionBasics.vue'
import EditorSectionSummary from './editor/EditorSectionSummary.vue'
import EditorSectionEducation from './editor/EditorSectionEducation.vue'
import EditorSectionWork from './editor/EditorSectionWork.vue'
import EditorSectionProjects from './editor/EditorSectionProjects.vue'
import EditorSectionSkills from './editor/EditorSectionSkills.vue'
import EditorSectionCustom from './editor/EditorSectionCustom.vue'
import SectionWrapper from './editor/SectionWrapper.vue'

// We use the shared state directly
const { resumeData, addSection } = useResume()
const { status: saveStatus, triggerSave, timeAgo, lastSavedTime } = useAutoSave()

const handleFocusOut = (e: FocusEvent) => {
  const target = e.target as HTMLElement
  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
    triggerSave(async () => {
      // Mock Save
      await new Promise((resolve) => setTimeout(resolve, 800))
    })
  }
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

const templates = [
  { id: 'classic', name: '经典单栏', icon: '📄', desc: '稳重/传统' },
  { id: 'modern', name: '现代双栏', icon: '📰', desc: '互联网/外企' },
  { id: 'minimal', name: '极简风', icon: '📝', desc: '干净/纯粹' }
]
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
          @retry="triggerSave(async () => await new Promise((r) => setTimeout(r, 800)))"
        />
      </div>
    </div>

    <!-- 模板选择 -->
    <div class="grid grid-cols-3 gap-2 mb-6">
      <button
        v-for="tpl in templates"
        :key="tpl.id"
        @click="resumeData.template = tpl.id as any"
        class="flex flex-col items-center justify-center p-2 rounded border transition-all text-center"
        :class="
          resumeData.template === tpl.id
            ? 'bg-stone-800 text-white border-stone-800 shadow-md'
            : 'bg-white border-stone-200 text-stone-500 hover:border-stone-400 hover:text-stone-700'
        "
      >
        <span class="text-lg mb-1">{{ tpl.icon }}</span>
        <span class="text-xs font-bold">{{ tpl.name }}</span>
        <span class="text-[9px] opacity-70 scale-90">{{ tpl.desc }}</span>
      </button>
    </div>

    <!-- 固定：基本信息 -->
    <EditorSectionBasics />

    <!-- 可拖拽区域 -->
    <VueDraggable
      v-model="resumeData.sections"
      :animation="200"
      handle=".drag-handle"
      class="space-y-8"
      ghost-class="ghost-card"
      drag-class="paper-twist-drag"
    >
      <SectionWrapper
        v-for="section in resumeData.sections"
        :key="section.id"
        :section="section"
        :isActive="activeSections[section.id]"
        :icon="icons[section.type] || icons.basics"
        @toggle-expand="toggleSection(section.id)"
      >
        <EditorSectionSummary v-if="section.type === 'summary'" />
        <EditorSectionEducation v-else-if="section.type === 'education'" />
        <EditorSectionWork v-else-if="section.type === 'work'" />
        <EditorSectionProjects v-else-if="section.type === 'projects'" />
        <EditorSectionSkills v-else-if="section.type === 'skills'" />
        <EditorSectionCustom v-else-if="section.type === 'custom'" :sectionId="section.id" />
      </SectionWrapper>
    </VueDraggable>

    <!-- 底部添加模块按钮 -->
    <div class="grid grid-cols-2 gap-4 pt-8 border-t-2 border-dashed border-stone-200/50">
      <p class="col-span-2 text-[10px] uppercase tracking-widest text-center text-stone-400 mb-2 font-serif">
        补充更多模块
      </p>
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
