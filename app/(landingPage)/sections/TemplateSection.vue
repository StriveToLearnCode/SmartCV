<template>
  <section class="py-24 bg-[#f5f5f4] relative overflow-hidden border-y border-[#e7e5e4]">
    <!-- 背景纹理 -->
    <div class="absolute inset-0 bg-noise opacity-50 pointer-events-none"></div>
    
    <div class="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
      <div class="flex flex-col items-center text-center mb-16">
        <span class="font-serif text-stone-500 italic text-lg mb-2">Gallery</span>
        <h2 class="font-serif-display font-medium text-4xl md:text-5xl text-stone-800 tracking-tight mb-6">
          精选纸质模版
        </h2>
        <p class="max-w-lg text-stone-600 font-sans font-light">
          每一款模板都经过精心设计，兼顾美学与 ATS 友好性。
        </p>
      </div>

      <!-- 模板展示轮播 -->
      <div class="relative w-full overflow-hidden group">
        <!-- 左右导航按钮 -->
        <button 
          @click="scroll('left')"
          class="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/80 backdrop-blur-sm border border-stone-200 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-4"
        >
          ←
        </button>
        <button 
          @click="scroll('right')"
          class="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/80 backdrop-blur-sm border border-stone-200 rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:-translate-x-4"
        >
          →
        </button>

        <!-- 滚动容器 -->
        <div 
          ref="scrollContainer"
          class="flex gap-8 overflow-x-auto pb-12 pt-4 px-4 snap-x snap-mandatory scrollbar-hide scroll-smooth"
        >
          <div 
            v-for="template in DEFAULT_CONTENT.templates" 
            :key="template.id"
            class="snap-center shrink-0 w-[280px] md:w-[320px]"
          >
            <div class="group/card cursor-pointer relative">
              <!-- 模板预览卡片 -->
              <div 
                class="aspect-[210/297] bg-white rounded-sm shadow-paper transition-all duration-500 ease-out group-hover/card:-translate-y-4 group-hover/card:rotate-1 group-hover/card:shadow-paper-float border border-stone-100 relative overflow-hidden"
                :style="{ backgroundColor: template.color }"
              >
                <!-- 模拟内容骨架 -->
                <div class="p-6 space-y-4 opacity-40">
                  <div class="w-20 h-2 bg-stone-800 rounded-sm"></div>
                  <div class="space-y-2">
                    <div class="w-full h-1 bg-stone-300"></div>
                    <div class="w-full h-1 bg-stone-300"></div>
                    <div class="w-2/3 h-1 bg-stone-300"></div>
                  </div>
                  <div class="pt-4 flex gap-4">
                    <div class="w-1/3 space-y-2">
                      <div class="w-full h-20 bg-stone-100"></div>
                    </div>
                    <div class="w-2/3 space-y-2">
                      <div class="w-full h-1 bg-stone-300"></div>
                      <div class="w-full h-1 bg-stone-300"></div>
                      <div class="w-full h-1 bg-stone-300"></div>
                      <div class="w-full h-1 bg-stone-300"></div>
                    </div>
                  </div>
                </div>

                <!-- 遮罩与按钮 -->
                <div class="absolute inset-0 bg-stone-900/0 group-hover/card:bg-stone-900/5 transition-colors flex items-center justify-center opacity-0 group-hover/card:opacity-100">
                  <button class="px-6 py-2 bg-white text-stone-800 text-xs uppercase tracking-widest font-medium shadow-sm rounded-sm transform translate-y-4 group-hover/card:translate-y-0 transition-all duration-300">
                    Preview
                  </button>
                </div>
              </div>
              
              <!-- 底部标签 -->
              <div class="text-center mt-6 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover/card:translate-y-0">
                <h4 class="font-serif text-lg text-stone-800">{{ template.name }}</h4>
                <p class="font-sans text-xs text-stone-500 uppercase tracking-wider mt-1">{{ template.style }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DEFAULT_CONTENT } from '../default'

const scrollContainer = ref<HTMLElement | null>(null)

const scroll = (direction: 'left' | 'right') => {
  if (!scrollContainer.value) return
  
  const scrollAmount = 340 // card width + gap
  const currentScroll = scrollContainer.value.scrollLeft
  
  scrollContainer.value.scrollTo({
    left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>

