<template>
  <div
    class="relative h-[450px] sm:h-[600px] perspective-1000 w-full flex justify-center md:block select-none pointer-events-none md:pointer-events-auto"
  >
    <!-- 最底层纸张 (多层堆叠效果) -->
    <div
      class="absolute top-4 right-auto md:right-4 w-[300px] h-[420px] sm:w-[400px] sm:h-[560px] bg-[#f5f5f4] border border-stone-200 shadow-sm -rotate-12 z-0 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0"
    ></div>

    <!-- 中层草稿纸 -->
    <div
      class="absolute top-0 right-auto md:right-10 w-[300px] h-[420px] sm:w-[400px] sm:h-[560px] bg-white border border-stone-200 shadow-paper-float -rotate-6 z-10 transition-transform duration-700 hover:-rotate-8 hover:-translate-y-4 flex flex-col left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 overflow-hidden"
    >
      <!-- 网格线背景 -->
      <div class="absolute inset-0 bg-grid-paper-small opacity-50 pointer-events-none"></div>

      <!-- 模糊内容 -->
      <div class="p-8 opacity-20 blur-[1px]">
        <div class="w-1/2 h-8 bg-stone-800 mb-4 rounded-sm"></div>
        <div class="w-full h-2 bg-stone-300 mb-2 rounded-sm"></div>
        <div class="w-full h-2 bg-stone-300 mb-2 rounded-sm"></div>
        <div class="w-3/4 h-2 bg-stone-300 mb-8 rounded-sm"></div>

        <div class="flex gap-4">
          <div class="w-1/3 h-64 bg-stone-100 rounded-sm"></div>
          <div class="flex-1 space-y-4">
            <div class="w-full h-32 bg-stone-100 rounded-sm"></div>
            <div class="w-full h-32 bg-stone-100 rounded-sm"></div>
          </div>
        </div>
      </div>

      <!-- 描摹纸覆盖层 -->
      <div class="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
    </div>

    <!-- 顶层最终稿 (自动排版动画) -->
    <div
      class="absolute top-8 md:top-10 right-auto md:right-0 w-[300px] h-[420px] sm:w-[400px] sm:h-[560px] bg-[#fafaf9] border border-stone-200 shadow-paper-stack rotate-3 z-20 transition-transform duration-500 hover:rotate-6 hover:-translate-y-2 flex flex-col left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 overflow-hidden"
    >
      <!-- 纸张纹理 -->
      <div class="absolute inset-0 bg-noise opacity-50 pointer-events-none"></div>

      <!-- 装订孔 -->
      <div
        class="absolute left-3 top-0 bottom-0 flex flex-col justify-between py-8 pointer-events-none z-30"
      >
        <div class="w-3 h-3 rounded-full bg-[#1c1917]/10 shadow-inner"></div>
        <div class="w-3 h-3 rounded-full bg-[#1c1917]/10 shadow-inner"></div>
        <div class="w-3 h-3 rounded-full bg-[#1c1917]/10 shadow-inner"></div>
      </div>

      <!-- 简历头部骨架 -->
      <div
        class="h-24 border-b border-stone-100 p-6 pl-12 flex flex-col justify-center space-y-3 relative"
      >
        <div
          class="w-32 h-6 bg-stone-800 rounded-sm animate-paper-item"
          style="animation-delay: 0.2s"
        ></div>
        <div class="flex gap-2 animate-paper-item" style="animation-delay: 0.4s">
          <div class="w-16 h-2 bg-stone-300 rounded-sm"></div>
          <div class="w-16 h-2 bg-stone-300 rounded-sm"></div>
          <div class="w-16 h-2 bg-stone-300 rounded-sm"></div>
        </div>
        <!-- 荧光笔标记 -->
        <div
          class="absolute right-6 top-6 text-red-400 font-handwriting text-2xl opacity-0 animate-fade-in"
          style="animation-delay: 2s"
        >
          v1.0
        </div>
      </div>

      <!-- 简历主体骨架 -->
      <div class="flex-1 p-6 pl-12 flex gap-6">
        <!-- 左侧栏 -->
        <div class="w-1/3 space-y-6 border-r border-stone-100 pr-4 pt-2">
          <!-- 头像/简介 -->
          <div class="space-y-2 animate-paper-item" style="animation-delay: 0.6s">
            <div
              class="w-full aspect-square bg-stone-200 rounded-md mb-3 grayscale contrast-125"
            ></div>
            <div class="w-full h-2 bg-stone-300 rounded-sm"></div>
            <div class="w-4/5 h-2 bg-stone-300 rounded-sm"></div>
          </div>

          <!-- 技能列表 -->
          <div class="space-y-3 animate-paper-item" style="animation-delay: 0.8s">
            <div class="w-10 h-3 bg-stone-500 rounded-sm"></div>
            <div class="flex flex-wrap gap-2">
              <div class="w-12 h-4 bg-stone-100 rounded-sm border border-stone-200"></div>
              <div class="w-8 h-4 bg-stone-100 rounded-sm border border-stone-200"></div>
              <div class="w-14 h-4 bg-stone-100 rounded-sm border border-stone-200"></div>
            </div>
          </div>
        </div>

        <!-- 右侧栏 -->
        <div class="flex-1 space-y-6 pt-2">
          <!-- 工作经历 1 -->
          <div class="space-y-3 animate-paper-item" style="animation-delay: 1s">
            <div class="flex justify-between items-center">
              <div class="w-24 h-4 bg-stone-800 rounded-sm"></div>
              <div class="w-12 h-3 bg-stone-300 rounded-sm"></div>
            </div>
            <div class="space-y-2">
              <div class="w-full h-2 bg-stone-200 rounded-sm"></div>
              <div class="w-full h-2 bg-stone-200 rounded-sm"></div>
              <div class="w-5/6 h-2 bg-stone-200 rounded-sm"></div>
            </div>
          </div>

          <!-- 工作经历 2 -->
          <div class="space-y-3 animate-paper-item" style="animation-delay: 1.2s">
            <div class="flex justify-between items-center">
              <div class="w-20 h-4 bg-stone-800 rounded-sm"></div>
              <div class="w-12 h-3 bg-stone-300 rounded-sm"></div>
            </div>
            <div class="space-y-2">
              <div class="w-full h-2 bg-stone-200 rounded-sm"></div>
              <div class="w-11/12 h-2 bg-stone-200 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 自动排版扫描线 -->
      <div
        class="absolute top-0 left-0 w-full h-1 bg-blue-400/50 shadow-[0_0_10px_rgba(96,165,250,0.8)] z-50 animate-scan-line opacity-0"
      ></div>
    </div>

    <!-- 小标签 -->
    <div
      class="absolute top-16 md:top-24 left-1/2 md:left-16 -translate-x-[140%] md:translate-x-0 w-32 h-32 md:w-40 md:h-40 bg-[#fef08a] shadow-paper-lg -rotate-12 z-30 p-4 font-handwriting flex flex-col items-center justify-center text-center transform hover:scale-110 transition-transform clip-sticky-note"
    >
      <div class="w-8 h-2 bg-yellow-200/50 mb-2 rounded-full"></div>
      <span class="font-serif italic text-stone-800 leading-tight text-lg"
        >AI Auto-<br />Formatting</span
      >
      <div
        class="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-yellow-200/30 rotate-2 blur-[1px]"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.animate-paper-item {
  animation: slide-in-paper 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes slide-in-paper {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}

.animate-scan-line {
  animation: scan 2s linear forwards;
}

@keyframes scan {
  0% {
    top: 0;
    opacity: 1;
  }
  90% {
    top: 100%;
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

/* 模拟便利贴稍微卷起的角 */
.clip-sticky-note {
  clip-path: polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%);
}
</style>
