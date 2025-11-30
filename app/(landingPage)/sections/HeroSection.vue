<template>
  <section
    class="pt-32 pb-20 px-4 md:pt-44 md:pb-32 md:px-12 lg:px-20 relative overflow-hidden bg-[#fafaf9]"
  >
    <!-- 背景装饰：网格底板 -->
    <div class="absolute inset-0 bg-grid-paper opacity-[0.15] pointer-events-none"></div>
    <div class="absolute inset-0 bg-noise opacity-50 pointer-events-none"></div>
    
    <!-- 装饰：左上角的大型模糊光晕 -->
    <div class="absolute -top-40 -left-40 w-[600px] h-[600px] bg-stone-200/30 rounded-full blur-3xl pointer-events-none"></div>
    
    <!-- 装饰：右下角的纹理块 -->
    <div class="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-t from-[#e7e5e4]/20 to-transparent pointer-events-none"></div>

    <div class="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
      <!-- 左侧内容 -->
      <div class="relative z-20 max-w-2xl">
        <HeroContent />
      </div>
      
      <!-- 右侧视觉 (在移动端可能需要调整高度或隐藏部分装饰) -->
      <div class="relative z-10 flex justify-center lg:justify-end h-[500px] sm:h-[600px] items-center lg:items-start pt-10 lg:pt-0">
        <HeroVisual />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import HeroContent from '../components/HeroContent.vue'
import HeroVisual from '../components/HeroVisual.vue'
</script>

<style scoped>
/* 确保在超大屏幕上也居中对齐 */
@media (min-width: 1600px) {
  section {
    display: flex;
    align-items: center;
    min-height: 90vh;
  }
}
</style>
