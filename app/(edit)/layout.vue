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

const isSaving = ref(false)
const saveStatus = computed(() => (isSaving.value ? '保存中...' : '已保存'))

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
  <div class="h-screen w-full bg-[#f5f5f0] text-stone-800 font-sans flex overflow-hidden">
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
            <h2 class="text-lg font-serif font-bold text-stone-800 flex items-center gap-2">
              <span class="w-1.5 h-5 bg-stone-800 rounded-full"></span>
              简历编辑器
            </h2>
            <p class="text-[10px] text-stone-400 font-medium pl-3.5 mt-0.5 uppercase tracking-wider">
              {{ saveStatus }}
            </p>
          </div>

          <!-- Undo/Redo -->
          <div class="flex items-center gap-1 ml-2 border-l border-stone-200 pl-4 h-8">
             <!-- ... undo/redo buttons ... -->
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
            class="flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-xl transition-all shadow-sm border"
            :class="
              isJobMatchMode
                ? 'bg-amber-100 text-amber-800 border-amber-200 shadow-inner'
                : 'bg-stone-100/50 text-stone-600 border-stone-200/50 hover:bg-white hover:shadow'
            "
            title="开启职位匹配模式"
          >
            <span class="text-base">🎯</span>
            <span class="hidden xl:inline">职位匹配</span>
          </button>

          <!-- Functional Buttons -->
          <div class="hidden lg:flex items-center gap-1 bg-stone-100/50 p-1 rounded-xl border border-stone-200/50 mr-2">
            <button
              class="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 hover:bg-white rounded-lg transition-all shadow-sm hover:shadow"
              title="模板设置"
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
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
              <span class="hidden xl:inline">模板</span>
            </button>
            <button
              class="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 hover:bg-white rounded-lg transition-all shadow-sm hover:shadow"
              title="字体排版"
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
                <path d="M4 7V4h16v3" />
                <path d="M9 20h6" />
                <path d="M12 4v16" />
              </svg>
              <span class="hidden xl:inline">排版</span>
            </button>
          </div>

          <button
            class="p-2 text-stone-500 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
            title="AI 优化"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z"
              />
              <path d="m14 7 3 3" />
              <path d="M5 6v4" />
              <path d="M19 14v4" />
              <path d="M10 2v2" />
              <path d="M7 8H3" />
              <path d="M21 16h-4" />
              <path d="M11 3H9" />
            </svg>
          </button>
          <button
            class="flex items-center gap-2 px-4 py-1.5 bg-stone-800 text-white text-xs font-bold rounded-xl shadow-md hover:bg-stone-900 transition-all hover:shadow-lg active:scale-95"
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
            导出
          </button>
        </div>
      </div>

      <!-- Editor Content -->
      <div class="flex-1 overflow-hidden bg-[#f0f0ea] relative">
        <!-- 顶部渐变阴影 -->
        <div
          class="absolute top-0 left-0 right-0 h-8 bg-linear-to-b from-stone-200/50 to-transparent z-10 pointer-events-none"
        ></div>
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
            class="w-full max-w-[210mm] bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-[2px] transition-all duration-500 ease-out relative z-10 flex flex-col origin-top scale-[0.85] md:scale-90 lg:scale-100 my-auto"
          >
            <ResumePreview :resume="resumeData" :highlight-keywords="analysisResult?.matchedKeywords || []" />
          </div>
        </div>

        <!-- 底部提示 -->
        <div
          class="absolute bottom-6 w-full text-center text-stone-400 text-xs font-serif italic flex gap-4 justify-center pointer-events-none z-20"
        >
          <span>实时预览中</span>
          <span>·</span>
          <span>A4 标准尺寸</span>
        </div>
      </div>

      <!-- JD Sidebar (Slide Out) -->
      <aside
        class="absolute top-0 right-0 bottom-0 w-[320px] md:w-[360px] bg-[#fffdf5] border-l border-amber-200/50 shadow-[-10px_0_30px_-10px_rgba(0,0,0,0.05)] z-40 transform transition-transform duration-500 ease-in-out flex flex-col"
        :class="isJobMatchMode ? 'translate-x-0' : 'translate-x-full'"
      >
        <div class="p-5 border-b border-amber-100 bg-[#fffdf5] flex justify-between items-center">
          <h3 class="font-serif font-bold text-amber-900 flex items-center gap-2">
            <span class="text-lg">🎯</span> 职位匹配助手
          </h3>
          <button @click="toggleJobMatchMode" class="text-amber-400 hover:text-amber-700">
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
          <!-- Input Area -->
          <div class="space-y-2">
            <label class="text-xs font-bold text-amber-800/70 uppercase tracking-wider">粘贴职位描述 (JD)</label>
            <textarea
              v-model="jdContent"
              class="w-full h-40 p-3 bg-white border border-amber-200 rounded-lg text-sm text-stone-700 placeholder:text-amber-300/50 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 resize-none shadow-inner"
              placeholder="在此处粘贴 JD 内容，系统将自动分析..."
            ></textarea>
            <button
              @click="handleAnalyze"
              :disabled="!jdContent || isAnalyzing"
              class="w-full py-2.5 bg-amber-400 text-white font-bold rounded-lg shadow-md hover:bg-amber-500 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="isAnalyzing" class="animate-spin">↻</span>
              {{ isAnalyzing ? '分析中...' : '开始匹配分析' }}
            </button>
          </div>

          <!-- Analysis Result -->
          <div v-if="analysisResult" class="space-y-6 animate-fade-in">
            <!-- Score -->
            <div class="bg-white p-4 rounded-xl border border-amber-100 shadow-sm flex items-center gap-4">
              <div class="relative w-16 h-16 flex items-center justify-center">
                <svg class="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="#fcd34d" stroke-width="6" fill="none" class="opacity-20" />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#f59e0b"
                    stroke-width="6"
                    fill="none"
                    :stroke-dasharray="2 * Math.PI * 28"
                    :stroke-dashoffset="2 * Math.PI * 28 * (1 - analysisResult.score / 100)"
                    class="transition-all duration-1000 ease-out"
                  />
                </svg>
                <span class="absolute text-lg font-bold text-amber-600">{{ analysisResult.score }}%</span>
              </div>
              <div>
                <div class="text-xs text-stone-400 font-bold uppercase">匹配度评分</div>
                <div class="text-sm text-stone-600 font-medium leading-tight mt-1">
                  {{ analysisResult.score >= 80 ? '非常匹配！' : '还有优化空间' }}
                </div>
              </div>
            </div>

            <!-- Missing Keywords -->
            <div v-if="analysisResult.missingKeywords.length > 0">
              <h4 class="text-xs font-bold text-amber-800/70 uppercase tracking-wider mb-2">缺失关键技能</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="kw in analysisResult.missingKeywords"
                  :key="kw"
                  class="px-2 py-1 bg-red-50 text-red-600 border border-red-100 rounded text-xs font-medium dashed-border"
                >
                  {{ kw }}
                </span>
              </div>
            </div>

            <!-- Suggestions -->
            <div>
              <h4 class="text-xs font-bold text-amber-800/70 uppercase tracking-wider mb-2">优化建议</h4>
              <ul class="space-y-2">
                <li
                  v-for="(sugg, i) in analysisResult.suggestions"
                  :key="i"
                  class="text-sm text-stone-600 bg-amber-50/50 p-3 rounded-lg border border-amber-100/50 leading-relaxed"
                >
                  💡 {{ sugg }}
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
/* 全局纸质风格字体设置 */
body {
  background-color: #f5f5f0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(120, 113, 108, 0.1);
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(120, 113, 108, 0.3);
}

.dashed-border {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='%23FCA5A5FF' stroke-width='1' stroke-dasharray='4%2c 4' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border: none;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
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
</style>
