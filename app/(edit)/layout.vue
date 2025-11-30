<script setup lang="ts">
import { useResume } from './composables/useResume'
import ResumePreview from './_components/ResumePreview.vue'
import EditorPanel from './_components/EditorPanel.vue'

const { resumeData } = useResume()
</script>

<template>
  <div class="h-screen w-full bg-[#f5f5f0] text-stone-800 font-sans flex overflow-hidden">
    <!-- Left Sidebar (Editor) - 40% -->
    <aside
      class="w-[40%] min-w-[400px] h-full border-r border-stone-200/60 bg-[#fdfdfc] shadow-[10px_0_30px_-10px_rgba(0,0,0,0.03)] relative z-20 flex flex-col transition-all duration-300 ease-in-out"
    >
      <!-- Toolbar / Header -->
      <div
        class="px-6 py-4 border-b border-stone-100 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex justify-between items-center"
      >
        <div>
          <h2 class="text-xl font-serif font-bold text-stone-800 flex items-center gap-2">
            <span class="w-2 h-6 bg-stone-800 rounded-full"></span>
            简历编辑器
          </h2>
          <p class="text-stone-500 text-xs mt-1 pl-4">拖拽模块以调整顺序</p>
        </div>
        <div class="flex gap-2">
          <button
            class="p-2 text-stone-500 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
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
            class="p-2 text-stone-500 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            title="导出 PDF"
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Editor Content -->
      <div class="flex-1 overflow-hidden bg-[#fafaf9]">
        <EditorPanel :resume="resumeData" />
      </div>
    </aside>

    <!-- Right Sidebar (Preview) - 60% -->
    <main class="flex-1 h-full p-8 md:p-12 flex flex-col justify-center items-center relative bg-stone-200/50">
      <!-- 背景装饰 -->
      <div class="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none"></div>
      <div class="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <!-- Optional big watermark or pattern -->
      </div>

      <!-- 预览容器，模拟A4纸张悬浮 -->
      <div
        class="w-full max-w-[210mm] h-[297mm] max-h-full bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-[2px] overflow-hidden transition-all duration-500 ease-out transform hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] relative z-10 flex flex-col"
      >
        <ResumePreview :resume="resumeData" />
      </div>

      <!-- 底部提示 -->
      <div
        class="absolute bottom-6 w-full text-center text-stone-400 text-xs font-serif italic flex gap-4 justify-center"
      >
        <span>实时预览中</span>
        <span>·</span>
        <span>A4 标准尺寸</span>
      </div>
    </main>
  </div>
</template>

<style>
/* 全局纸质风格字体设置 */
body {
  background-color: #f5f5f0;
}
</style>
