<script setup lang="ts">
import { useResume } from './composables/useResume'
import { useJobMatch } from './composables/useJobMatch'
import ResumePreview from './_components/ResumePreview.vue'
import EditorPanel from './_components/EditorPanel.vue'
import StickyNoteGuide from '../components/StickyNoteGuide.vue'
import { useUserGuide } from '../composables/useUserGuide'
import { ref, computed, watch } from 'vue'

const { resumeData, undo, redo, canUndo, canRedo } = useResume()
const { isJobMatchMode, jdContent, isAnalyzing, analysisResult, toggleJobMatchMode, analyzeJD } = useJobMatch()
const { currentGuide: guide } = useUserGuide()

// const isSaving = ref(false) // Moved to individual components or global state if needed
// const saveStatus = computed(() => (isSaving.value ? '保存中...' : '已保存'))

const handleAnalyze = () => {
  analyzeJD(resumeData.value)
}

// Auto-analyze when JD changes (Debounced)
let debounceTimer: ReturnType<typeof setTimeout>
watch(jdContent, (newVal) => {
  if (newVal && newVal.length > 20) { // Avoid triggering on short text
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      handleAnalyze()
    }, 800)
  }
})
</script>

<template>
  <div class="h-screen w-full bg-[#f5f5f0] bg-paper-texture text-stone-800 font-sans flex overflow-hidden">
    <!-- Left Sidebar (Editor) - 45% -->
    <aside
      class="w-[45%] min-w-[420px] max-w-[600px] h-full border-r border-stone-200/60 bg-[#fdfdfc] shadow-[10px_0_30px_-10px_rgba(0,0,0,0.03)] relative z-20 flex flex-col transition-all duration-300 ease-in-out"
    >
      <!-- Toolbar / Header -->
      <div
        class="px-6 py-4 border-b border-stone-100 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex justify-between items-center shadow-sm"
      >
        <div class="flex items-center gap-4">
          <div>
            <h2 class="text-xl font-serif font-bold text-stone-800 flex items-center gap-2 tracking-tight">
              <!-- Notebook Icon -->
              <span class="text-2xl transform -rotate-6">📒</span>
              简历手账
            </h2>
          </div>

          <!-- Undo/Redo (Simple Icons) -->
          <div class="flex items-center gap-1 ml-2 pl-4 border-l border-stone-200 h-6">
             <button @click="undo" :disabled="!canUndo" class="text-stone-400 hover:text-stone-700 disabled:opacity-30 transition-colors" title="撤销">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>
             </button>
             <button @click="redo" :disabled="!canRedo" class="text-stone-400 hover:text-stone-700 disabled:opacity-30 transition-colors" title="重做">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13"/></svg>
             </button>
          </div>
        </div>

        <!-- Guide Area (Small version for editor) -->
        <div class="absolute left-1/2 -translate-x-1/2 top-2 z-40 hidden xl:block pointer-events-none">
           <div class="pointer-events-auto transform scale-75 origin-top hover:scale-90 transition-transform">
             <StickyNoteGuide 
               v-if="guide && guide.status === 'resume_incomplete'"
               :title="guide.message"
               :description="guide.subMessage"
               type="warning"
             />
           </div>
        </div>

        <div class="flex gap-2">
          <!-- Job Matching Toggle -->
          <button
            @click="toggleJobMatchMode"
            class="flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-xl transition-all shadow-sm border group"
            :class="
              isJobMatchMode
                ? 'bg-amber-100 text-amber-800 border-amber-200 shadow-inner'
                : 'bg-[#fffbeb] text-stone-600 border-stone-200 hover:bg-[#fff7ed] hover:border-amber-200 hover:text-amber-700'
            "
            title="开启职位匹配模式"
          >
            <span class="text-base group-hover:scale-110 transition-transform">🎯</span>
            <span class="hidden xl:inline font-serif">匹配 JD</span>
          </button>

          <button
            class="flex items-center gap-2 px-4 py-1.5 bg-stone-800 text-[#fefce8] text-xs font-bold rounded-sm shadow-[2px_2px_0px_0px_rgba(28,25,23,0.2)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(28,25,23,0.2)] active:translate-y-[2px] active:shadow-none border-2 border-stone-800 transition-all"
            title="导出 PDF"
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            <span class="hidden sm:inline">存进保险箱 (PDF)</span>
          </button>
        </div>
      </div>

      <!-- Editor Content -->
      <div class="flex-1 overflow-hidden bg-[#fdfdfc] relative">
        <EditorPanel :resume="resumeData" />
      </div>
    </aside>

    <!-- Right Sidebar (Preview + JD Match) -->
    <main class="flex-1 h-full relative bg-[#e5e5e0] overflow-hidden flex">
      <!-- 背景装饰 -->
      <div class="absolute inset-0 bg-paper-texture opacity-40 pointer-events-none"></div>

      <!-- 预览区域容器 (Slides to left when JD is open) -->
      <div
        class="flex-1 h-full transition-all duration-500 ease-in-out flex flex-col items-center justify-center relative"
        :class="{ 'mr-[320px] md:mr-[360px]': isJobMatchMode }"
      >
        <!-- 预览容器，模拟A4纸张悬浮 -->
        <div class="h-full w-full overflow-y-auto custom-scrollbar flex justify-center p-8 md:p-12">
          <div
            class="w-full max-w-[210mm] bg-white shadow-paper-float rounded-[1px] transition-all duration-500 ease-out relative z-10 flex flex-col origin-top scale-[0.85] md:scale-90 lg:scale-100 my-auto print-preview-card"
          >
            <ResumePreview :resume="resumeData" :highlight-keywords="analysisResult?.matchedKeywords || []" />
          </div>
        </div>

        <!-- 底部提示 -->
        <div
          class="absolute bottom-6 w-full text-center text-stone-400 text-xs font-handwriting flex gap-4 justify-center pointer-events-none z-20 opacity-60"
        >
          <span>"预览效果"</span>
          <span>·</span>
          <span>A4</span>
        </div>
      </div>

      <!-- JD Sidebar (Slide Out) -->
      <aside
        class="absolute top-0 right-0 bottom-0 w-[320px] md:w-[360px] bg-[#fffdf5] border-l border-amber-200/50 shadow-[-10px_0_30px_-10px_rgba(0,0,0,0.05)] z-40 transform transition-transform duration-500 ease-in-out flex flex-col font-serif"
        :class="isJobMatchMode ? 'translate-x-0' : 'translate-x-full'"
      >
        <!-- Tape at top -->
        <div class="absolute -left-3 top-10 w-6 h-12 bg-amber-100/50 border border-amber-200/50 -rotate-3 shadow-sm z-50 pointer-events-none"></div>

        <div class="p-5 border-b border-amber-100 bg-[#fffbeb] flex justify-between items-center relative">
          <h3 class="font-bold text-amber-900 flex items-center gap-2">
            <span class="text-xl">✂️</span> JD 剪报夹
          </h3>
          <button @click="toggleJobMatchMode" class="text-amber-400 hover:text-amber-700 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-paper-texture">
          <!-- Input Area -->
          <div class="space-y-3 relative">
            <label class="text-xs font-bold text-amber-800/60 uppercase tracking-wider">粘贴职位描述</label>
            <div class="relative">
               <textarea
                 v-model="jdContent"
                 class="w-full h-48 p-4 bg-white border-2 border-dashed border-amber-200 rounded-sm text-sm text-stone-700 placeholder:text-amber-300/50 focus:outline-none focus:border-amber-400 resize-none leading-relaxed font-sans"
                 placeholder="在这里粘贴 JD，我会帮你分析..."
               ></textarea>
               <!-- Paper clip visual -->
               <div class="absolute -top-3 right-4 w-4 h-8 border-2 border-stone-300 rounded-full z-10 pointer-events-none rotate-12 bg-transparent" style="border-bottom: none; height: 10px;"></div>
            </div>
            <button
              @click="handleAnalyze"
              :disabled="!jdContent || isAnalyzing"
              class="w-full py-3 bg-stone-800 text-[#fefce8] font-bold rounded-sm shadow-md hover:bg-stone-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              <span v-if="isAnalyzing" class="animate-spin">↻</span>
              {{ isAnalyzing ? '正在分析...' : '✨ 生成分析卡片' }}
            </button>
          </div>

          <!-- Analysis Result -->
          <div v-if="analysisResult" class="space-y-6 animate-fade-in pb-10">
            <!-- Score Card -->
            <div class="bg-white p-5 rounded-sm border border-amber-100 shadow-sm flex items-center gap-5 transform rotate-1 relative">
              <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-amber-100/50 rotate-1"></div>
              
              <div class="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg class="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="#fde68a" stroke-width="6" fill="none" class="opacity-30" />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#d97706"
                    stroke-width="6"
                    fill="none"
                    :stroke-dasharray="2 * Math.PI * 28"
                    :stroke-dashoffset="2 * Math.PI * 28 * (1 - analysisResult.score / 100)"
                    stroke-linecap="round"
                    class="transition-all duration-1000 ease-out"
                  />
                </svg>
                <span class="absolute text-lg font-bold text-amber-700 font-mono">{{ analysisResult.score }}%</span>
              </div>
              <div>
                <div class="text-[10px] text-stone-400 font-bold uppercase tracking-wider">匹配度</div>
                <div class="text-sm text-stone-700 font-medium leading-snug mt-1">
                  {{ analysisResult.score >= 80 ? '很有希望！冲！🚀' : '补全关键词后再投递 💪' }}
                </div>
              </div>
            </div>

            <!-- Missing Keywords -->
            <div v-if="analysisResult.missingKeywords.length > 0">
              <h4 class="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <span>⚠️</span> 缺失关键词
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="kw in analysisResult.missingKeywords"
                  :key="kw"
                  class="px-2 py-1 bg-red-50 text-red-600/80 border border-red-100 rounded-sm text-xs font-bold decoration-wavy underline decoration-red-200"
                >
                  {{ kw }}
                </span>
              </div>
            </div>

            <!-- Suggestions -->
            <div>
              <h4 class="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">优化建议</h4>
              <ul class="space-y-3">
                <li
                  v-for="(sugg, i) in analysisResult.suggestions"
                  :key="i"
                  class="text-sm text-stone-600 bg-[#fefce8] p-3 rounded-sm border border-amber-100 leading-relaxed relative"
                >
                  <span class="absolute -left-1 top-2 text-amber-400 text-xs">👉</span>
                  <span class="pl-3">{{ sugg }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<style>
.bg-paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(168, 162, 158, 0.2);
  border-radius: 2px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(168, 162, 158, 0.4);
}

.shadow-paper-float {
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1), 0 0 2px rgba(0,0,0,0.05);
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.font-handwriting {
  font-family: 'Caveat', cursive; /* Assuming global font load */
}
</style>
