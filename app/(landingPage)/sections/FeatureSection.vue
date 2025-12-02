<template>
  <section class="py-24 px-4 md:px-12 bg-[#fafaf9] relative overflow-hidden">
    <!-- 背景装饰：网格底板 -->
    <div class="absolute inset-0 bg-grid-paper opacity-40 pointer-events-none"></div>
    <div class="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- 标题区 -->
      <div class="flex flex-col items-center text-center mb-20 relative">
        <span class="font-handwriting text-stone-500 text-2xl block mb-4 transform -rotate-2 text-imprint">Why we made this</span>
        <h2 class="font-serif-display font-medium text-4xl md:text-5xl text-stone-800 tracking-tight mb-6 relative inline-block">
          <span class="relative z-10">把焦虑变成掌控感</span>
          <div class="absolute -bottom-2 left-0 w-full h-3 bg-yellow-200/60 -rotate-1 z-0 rounded-sm"></div>
        </h2>
        <p class="max-w-2xl text-stone-600 text-lg font-light leading-relaxed">
          求职不是一场冰冷的数字游戏，而是一段需要被温柔记录的旅程。
        </p>
      </div>

      <!-- 特性卡片网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="(tool, index) in DEFAULT_CONTENT.tools" :key="tool.title" class="relative group perspective-1000">
          
          <!-- 卡片本体 -->
          <div
            class="h-full p-8 transition-all duration-500 ease-out hover:-translate-y-2 relative overflow-hidden flex flex-col border-hand-drawn shadow-paper hover:shadow-paper-float bg-white"
            :class="[
              index % 2 === 0 ? 'rotate-1' : '-rotate-1', 
              'group-hover:rotate-0'
            ]"
          >
            <!-- 背景色块 (便利贴风格) -->
            <div class="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity" :class="tool.color"></div>
            <div class="absolute inset-0 bg-noise opacity-50 mix-blend-multiply"></div>

            <!-- 顶部胶带装饰 (随机出现) -->
            <div
              v-if="index % 3 !== 0"
              class="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 border border-white/60 shadow-sm rotate-[-2deg] backdrop-blur-sm z-20 tape-strip"
            ></div>
            
            <!-- 顶部图钉 (其他情况) -->
             <div v-else class="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-stone-300 shadow-inner border border-stone-400 z-20 flex items-center justify-center">
               <div class="w-1.5 h-1.5 bg-stone-500 rounded-full opacity-50"></div>
             </div>

            <!-- 图标 -->
            <div
              class="text-4xl mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 origin-center relative z-10 text-center"
            >
              {{ tool.icon }}
            </div>

            <h3 class="font-serif text-xl font-bold mb-3 text-stone-800 text-center relative z-10">
              {{ tool.title }}
            </h3>

            <p class="text-stone-600 font-sans text-sm leading-relaxed relative z-10 text-center">
              {{ tool.desc }}
            </p>

            <!-- 底部手绘装饰线 -->
            <div class="mt-auto pt-6 flex justify-center">
               <svg width="60" height="10" viewBox="0 0 60 10" class="text-stone-300 group-hover:text-stone-400 transition-colors">
                 <path d="M0 5 Q 15 0 30 5 T 60 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
               </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 底部补充文案 -->
      <div class="mt-20 text-center">
        <p class="font-handwriting text-2xl text-stone-400 transform rotate-1">
          "还有很多贴心小功能，等你打开这本手账..."
        </p>
      </div>
      
    </div>
  </section>
</template>

<script setup lang="ts">
import { DEFAULT_CONTENT } from '../default'
</script>

<style scoped>
/* 使得卡片有轻微的纸张弯曲感 */
.perspective-1000 {
  perspective: 1000px;
}
</style>

