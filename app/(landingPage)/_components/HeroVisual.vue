<template>
  <div class="relative h-[500px] sm:h-[600px] w-full flex justify-center md:block select-none pointer-events-none md:pointer-events-auto font-handwriting">
    
    <!-- 背景装饰：咖啡渍 -->
    <div class="absolute bottom-32 right-10 w-32 h-32 rounded-full border-[12px] border-[#f5f5f4] opacity-60 mix-blend-multiply transform scale-y-90 z-0"></div>

    <!-- 背景装饰：散落的便利贴 -->
    <div class="absolute top-20 right-20 w-32 h-32 bg-yellow-100 shadow-sticky rotate-6 p-4 z-10 hidden md:block">
       <p class="text-stone-600 text-lg leading-tight">别忘带作品集链接！</p>
       <div class="text-stone-400 text-sm mt-2 text-right">- SmartCV</div>
    </div>

    <!-- 主视觉：面试急救包 (展开的折页) -->
    <div
      class="absolute top-10 md:right-24 w-[320px] sm:w-[380px] bg-white shadow-paper-float rotate-[-3deg] z-20 transition-all duration-700 ease-out hover:rotate-0 hover:scale-[1.02] flex flex-col rounded-[2px] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 border-hand-drawn overflow-hidden"
    >
      <!-- 纸张纹理 -->
      <div class="absolute inset-0 bg-noise opacity-30 pointer-events-none z-0"></div>
      <div class="absolute inset-0 bg-[#fff] z-0"></div>

      <!-- 顶部标签 -->
      <div class="relative z-10 bg-stone-800 text-[#fefce8] p-4 flex justify-between items-center">
         <span class="text-xl font-bold tracking-wide">面试急救包 🚑</span>
         <span class="text-sm bg-stone-700 px-2 py-1 rounded-sm">2:00 PM Today</span>
      </div>

      <!-- 内容区 -->
      <div class="relative z-10 p-6 space-y-6 font-serif text-stone-800">
        
        <!-- WHO -->
        <div class="relative">
          <h3 class="text-sm font-bold text-stone-400 uppercase tracking-widest mb-1">WHO</h3>
          <div class="text-xl font-bold flex items-center gap-2">
             <div class="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-xs">HR</div>
             <span>Sarah Lin <span class="text-stone-400 font-normal text-base">(Recruiter)</span></span>
          </div>
          <!-- 手绘圈注 -->
          <svg class="absolute -top-2 -left-4 w-[110%] h-[140%] text-orange-200/50 -z-10 pointer-events-none" viewBox="0 0 200 60">
             <path d="M10 30 Q 50 5 190 20 Q 200 55 100 50 Q 0 45 10 30" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </div>

        <!-- WHAT -->
        <div>
          <h3 class="text-sm font-bold text-stone-400 uppercase tracking-widest mb-2">WHAT THEY NEED</h3>
          <div class="flex flex-wrap gap-2">
             <span class="px-2 py-1 bg-green-50 border border-green-200 text-green-800 rounded-sm text-sm transform -rotate-1">Figma 熟练</span>
             <span class="px-2 py-1 bg-green-50 border border-green-200 text-green-800 rounded-sm text-sm transform rotate-2">ToB 经验</span>
             <span class="px-2 py-1 bg-green-50 border border-green-200 text-green-800 rounded-sm text-sm transform -rotate-1">抗压能力</span>
          </div>
        </div>

        <!-- SAY (亮点) -->
        <div class="bg-[#fffbeb] p-4 rotate-1 shadow-sm border border-yellow-200 relative">
           <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-yellow-200/50 rotate-1"></div> <!-- 胶带 -->
           <h3 class="text-sm font-bold text-stone-500 mb-2">我的亮点 (记得说!)</h3>
           <ul class="list-disc list-inside text-stone-700 space-y-1 text-sm leading-relaxed">
              <li>主导过类似 SaaS 项目重构</li>
              <li>设计系统搭建经验丰富</li>
              <li><span class="highlight-marker">数据驱动：提升效率 30%</span></li>
           </ul>
        </div>

        <!-- ASK (反问) -->
        <div>
          <h3 class="text-sm font-bold text-stone-400 uppercase tracking-widest mb-1">ASK</h3>
          <p class="text-stone-600 text-sm italic">"团队目前最大的挑战是什么？"</p>
        </div>

      </div>
      
      <!-- 底部鼓励 -->
      <div class="mt-auto p-4 bg-stone-50 border-t border-stone-100 text-center">
         <p class="text-stone-400 text-sm font-handwriting text-lg">❤️ 放轻松，你准备得很好了！</p>
      </div>
    </div>

    <!-- 装饰：右上角小星星 -->
    <div class="absolute top-0 right-10 md:right-32 animate-bounce duration-[2000ms]">
       <div class="text-yellow-400 text-4xl drop-shadow-sm">✨</div>
    </div>
    
    <!-- 装饰：笔 -->
    <div class="absolute bottom-10 right-5 md:right-0 w-48 h-4 bg-stone-800 rounded-full shadow-lg rotate-[-12deg] z-30 hidden md:flex items-center justify-end px-2">
       <div class="w-8 h-1 bg-stone-600 rounded-full"></div>
       <div class="absolute -left-2 w-4 h-4 rounded-full bg-stone-300"></div>
    </div>

  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
/* 简单动画 */
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50% { transform: translateY(-10px) rotate(-2deg); }
}
</style>
