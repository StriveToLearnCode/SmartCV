<template>
  <div
    class="relative h-[450px] sm:h-[600px] perspective-1000 w-full flex justify-center md:block select-none pointer-events-none md:pointer-events-auto"
  >
    <!-- 最底层纸张 -->
    <div
      class="absolute top-4 right-auto md:right-4 w-[300px] h-[420px] sm:w-[400px] sm:h-[560px] bg-[#f5f5f4] border border-stone-200 shadow-sm z-0 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 rounded-sm"
    ></div>

    <!-- 中层纸张 -->
    <div
      class="absolute top-2 right-auto md:right-7 w-[300px] h-[420px] sm:w-[400px] sm:h-[560px] bg-[#fafaf9] border border-stone-200 shadow-sm z-10 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 rounded-sm"
    ></div>

    <!-- 顶层最终稿 -->
    <div
      class="absolute top-0 right-auto md:right-10 w-[300px] h-[420px] sm:w-[400px] sm:h-[560px] bg-white border border-stone-200 shadow-paper rotate-0 z-20 transition-transform duration-500 hover:-translate-y-1 flex flex-col left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 overflow-hidden rounded-sm"
    >
      <!-- 纸张纹理 -->
      <div class="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>

      <!-- 简历头部骨架 -->
      <div class="h-24 border-b border-stone-50 p-6 pl-10 flex flex-col justify-center space-y-3 relative">
        <div class="w-32 h-5 bg-stone-800 rounded-sm animate-paper-item" style="animation-delay: 0.2s"></div>
        <div class="flex gap-2 animate-paper-item" style="animation-delay: 0.4s">
          <div class="w-12 h-1.5 bg-stone-200 rounded-sm"></div>
          <div class="w-12 h-1.5 bg-stone-200 rounded-sm"></div>
        </div>
      </div>

      <!-- 简历主体骨架 -->
      <div class="flex-1 p-6 pl-10 flex gap-6">
        <!-- 左侧栏 -->
        <div class="w-1/3 space-y-6 border-r border-stone-50 pr-4 pt-2">
          <!-- 头像/简介 -->
          <div class="space-y-2 animate-paper-item" style="animation-delay: 0.6s">
            <div class="w-full aspect-square bg-stone-100 rounded-sm mb-3 grayscale contrast-125"></div>
            <div class="w-full h-1.5 bg-stone-200 rounded-sm"></div>
            <div class="w-4/5 h-1.5 bg-stone-200 rounded-sm"></div>
          </div>

          <!-- 技能列表 -->
          <div class="space-y-3 animate-paper-item" style="animation-delay: 0.8s">
            <div class="w-8 h-2 bg-stone-400 rounded-sm"></div>
            <div class="flex flex-wrap gap-2">
              <div class="w-10 h-3 bg-stone-50 rounded-sm border border-stone-100"></div>
              <div class="w-6 h-3 bg-stone-50 rounded-sm border border-stone-100"></div>
              <div class="w-12 h-3 bg-stone-50 rounded-sm border border-stone-100"></div>
            </div>
          </div>
        </div>

        <!-- 右侧栏 -->
        <div class="flex-1 space-y-6 pt-2">
          <!-- 工作经历 1 -->
          <div class="space-y-3 animate-paper-item" style="animation-delay: 1s">
            <div class="flex justify-between items-center">
              <div class="w-20 h-3 bg-stone-700 rounded-sm"></div>
              <div class="w-10 h-2 bg-stone-200 rounded-sm"></div>
            </div>
            <div class="space-y-2">
              <div class="w-full h-1.5 bg-stone-100 rounded-sm"></div>
              <div class="w-full h-1.5 bg-stone-100 rounded-sm"></div>
              <div class="w-5/6 h-1.5 bg-stone-100 rounded-sm"></div>
            </div>
          </div>

          <!-- 工作经历 2 -->
          <div class="space-y-3 animate-paper-item" style="animation-delay: 1.2s">
            <div class="flex justify-between items-center">
              <div class="w-16 h-3 bg-stone-700 rounded-sm"></div>
              <div class="w-10 h-2 bg-stone-200 rounded-sm"></div>
            </div>
            <div class="space-y-2">
              <div class="w-full h-1.5 bg-stone-100 rounded-sm"></div>
              <div class="w-11/12 h-1.5 bg-stone-100 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 扫描线 -->
      <div
        class="absolute top-0 left-0 w-full h-px bg-stone-400/30 shadow-[0_0_10px_rgba(168,162,158,0.4)] z-50 animate-scan-line opacity-0"
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
