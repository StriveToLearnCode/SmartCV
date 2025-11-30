<template>
  <div class="relative h-[500px] sm:h-[600px] perspective-1000 w-full flex justify-center md:block select-none pointer-events-none md:pointer-events-auto">
    
    <!-- 背景装饰：散落的纸张 -->
    <div class="absolute top-10 right-10 w-64 h-80 bg-[#f5f5f4] shadow-sm rotate-6 rounded-sm z-0 border border-stone-200 opacity-60 hidden md:block"></div>
    <div class="absolute bottom-20 right-20 w-56 h-72 bg-[#fafaf9] shadow-sm -rotate-3 rounded-sm z-0 border border-stone-200 opacity-60 hidden md:block"></div>

    <!-- 主简历容器 -->
    <div
      class="absolute top-0 md:right-12 w-[340px] h-[480px] sm:w-[420px] sm:h-[594px] bg-white shadow-paper-float rotate-[-2deg] z-20 transition-all duration-700 ease-out hover:rotate-0 hover:scale-[1.02] flex flex-col overflow-hidden rounded-[2px] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 border border-stone-100"
    >
      <!-- 纸张纹理 -->
      <div class="absolute inset-0 bg-noise opacity-40 pointer-events-none z-0"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-white via-white to-stone-50 z-0"></div>

      <!-- 简历内容 -->
      <div class="relative z-10 p-8 flex flex-col h-full font-sans">
        
        <!-- 头部信息 -->
        <div class="border-b-2 border-stone-800 pb-6 mb-6">
          <div class="w-32 h-8 bg-stone-800 mb-3 rounded-[1px] animate-type-in" style="animation-delay: 0.2s"></div>
          <div class="flex gap-3 text-stone-400 text-xs">
            <div class="w-24 h-3 bg-stone-200 rounded-[1px] animate-fade-in" style="animation-delay: 0.4s"></div>
            <div class="w-24 h-3 bg-stone-200 rounded-[1px] animate-fade-in" style="animation-delay: 0.5s"></div>
          </div>
        </div>

        <!-- 主要内容区 -->
        <div class="flex-1 space-y-8">
          
          <!-- Section 1: Experience -->
          <div class="space-y-4">
            <div class="flex items-center gap-2 mb-2">
               <div class="w-4 h-4 bg-stone-800 rounded-full flex items-center justify-center text-[8px] text-white font-bold">1</div>
               <div class="w-20 h-4 bg-stone-300 rounded-[1px]"></div>
            </div>
            
            <!-- Job Item 1 -->
            <div class="relative group/item">
              <div class="flex justify-between mb-2">
                <div class="w-32 h-4 bg-stone-600 rounded-[1px] animate-slide-up" style="animation-delay: 0.8s"></div>
                <div class="w-16 h-3 bg-stone-200 rounded-[1px] animate-slide-up" style="animation-delay: 0.9s"></div>
              </div>
              <div class="space-y-2 pl-2 border-l-2 border-stone-100">
                <div class="w-full h-2 bg-stone-100 rounded-[1px] animate-slide-up" style="animation-delay: 1.0s"></div>
                <div class="w-[90%] h-2 bg-stone-100 rounded-[1px] animate-slide-up" style="animation-delay: 1.1s"></div>
                
                <!-- AI 优化的高亮行 -->
                <div class="relative w-[95%] h-2 bg-stone-800/10 rounded-[1px] animate-slide-up mt-1 overflow-hidden" style="animation-delay: 1.2s">
                   <div class="absolute inset-0 bg-stone-800/20 animate-shimmer"></div>
                </div>
              </div>

              <!-- AI 批注浮层 -->
              <div class="absolute -right-28 top-0 bg-[#fff176] text-stone-800 text-[10px] p-2 rounded-sm shadow-md rotate-3 w-24 transform transition-all duration-500 opacity-0 animate-pop-in z-30 handwriting font-medium border border-yellow-200/50" style="animation-delay: 1.8s">
                ✨ Quantified impact by 25%
                <div class="absolute -left-1 top-3 w-2 h-2 bg-[#fff176] transform rotate-45"></div>
              </div>
            </div>
          </div>

          <!-- Section 2: Skills -->
          <div class="space-y-4">
            <div class="flex items-center gap-2 mb-2">
               <div class="w-4 h-4 bg-stone-800 rounded-full flex items-center justify-center text-[8px] text-white font-bold">2</div>
               <div class="w-16 h-4 bg-stone-300 rounded-[1px]"></div>
            </div>
            <div class="flex flex-wrap gap-2">
              <div class="px-2 py-1 bg-stone-100 border border-stone-200 rounded-[1px] text-[10px] text-stone-500 animate-scale-in" style="animation-delay: 2.0s">Vue.js</div>
              <div class="px-2 py-1 bg-stone-100 border border-stone-200 rounded-[1px] text-[10px] text-stone-500 animate-scale-in" style="animation-delay: 2.1s">TypeScript</div>
              <div class="px-2 py-1 bg-stone-800 text-white rounded-[1px] text-[10px] animate-scale-in shadow-sm" style="animation-delay: 2.2s">AI Design</div>
              <div class="px-2 py-1 bg-stone-100 border border-stone-200 rounded-[1px] text-[10px] text-stone-500 animate-scale-in" style="animation-delay: 2.3s">Figma</div>
            </div>
          </div>

        </div>
        
        <!-- 底部进度条 -->
        <div class="mt-auto pt-4 border-t border-stone-100 flex items-center gap-3">
           <div class="text-[10px] font-bold text-stone-400 uppercase tracking-widest">ATS Score</div>
           <div class="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
             <div class="h-full bg-green-500 w-0 animate-grow-width rounded-full" style="animation-delay: 2.5s; animation-duration: 1s;"></div>
           </div>
           <div class="text-xs font-bold text-stone-800 animate-fade-in" style="animation-delay: 3.5s">98/100</div>
        </div>

      </div>

      <!-- 扫描光效 -->
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-stone-400/50 to-transparent shadow-[0_0_15px_rgba(0,0,0,0.1)] z-40 animate-scan-infinite opacity-0"></div>
    </div>

    <!-- 装饰元素：右上角胶带 -->
    <div class="absolute top-[-10px] md:right-28 w-24 h-8 bg-stone-200/40 rotate-[-15deg] backdrop-blur-sm z-30 shadow-sm left-1/2 md:left-auto"></div>

    <!-- 装饰元素：笔 -->
    <div class="absolute bottom-20 right-0 md:-right-4 w-48 h-4 bg-stone-800 rounded-full shadow-lg rotate-[-45deg] z-30 hidden md:flex items-center justify-end px-2">
       <div class="w-8 h-1 bg-stone-600 rounded-full"></div>
    </div>

  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.handwriting {
  font-family: 'Courier New', Courier, monospace; /* Fallback, ideally use a handwriting font */
}

@keyframes scan-infinite {
  0% { top: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}
.animate-scan-infinite {
  animation: scan-infinite 4s ease-in-out infinite;
  animation-delay: 2s;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-shimmer {
  animation: shimmer 2s infinite;
}

@keyframes grow-width {
  to { w: 92%; } /* Tailwind w-full doesn't animate well with keyframes directly sometimes, using inline style better for width usually but here standard css */
}
/* Custom width animation */
.animate-grow-width {
  animation: width-grow 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
@keyframes width-grow {
  from { width: 0; }
  to { width: 92%; }
}

.animate-type-in {
  animation: type-in 0.5s ease-out forwards;
  width: 0;
  opacity: 0;
}
@keyframes type-in {
  to { width: 128px; opacity: 1; }
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out forwards;
  opacity: 0;
  transform: translateY(10px);
}
@keyframes slide-up {
  to { opacity: 1; transform: translateY(0); }
}

.animate-pop-in {
  animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
@keyframes pop-in {
  to { opacity: 1; transform: rotate(3deg) scale(1); }
}

.animate-scale-in {
  animation: scale-in 0.3s ease-out forwards;
  opacity: 0;
  transform: scale(0.9);
}
@keyframes scale-in {
  to { opacity: 1; transform: scale(1); }
}

.shadow-paper-float {
  box-shadow: 
    0 1px 1px rgba(0,0,0,0.02), 
    0 2px 2px rgba(0,0,0,0.02),
    0 4px 4px rgba(0,0,0,0.02), 
    0 8px 8px rgba(0,0,0,0.02),
    0 16px 16px rgba(0,0,0,0.02),
    0 20px 25px -5px rgba(0, 0, 0, 0.1), 
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
</style>

