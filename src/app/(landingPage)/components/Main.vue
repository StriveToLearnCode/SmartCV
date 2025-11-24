<template>
  <section
    class="pt-32 pb-20 px-4 md:pt-40 md:pb-32 md:px-12 lg:px-30 relative overflow-hidden border-b border-stone-200 bg-[#fafaf9]"
  >
    <!-- 背景装饰 -->
    <div class="absolute inset-0 bg-grid-paper opacity-60 pointer-events-none"></div>
    <div class="absolute inset-0 bg-noise opacity-40 pointer-events-none"></div>

    <!-- 几何切割线 (装饰) -->
    <div class="absolute top-0 right-[45%] w-px h-full bg-stone-200 hidden lg:block pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-full h-px bg-stone-200 hidden lg:block pointer-events-none"></div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
      <!-- 左侧 -->
      <div class="relative">
        <LeftContent />
      </div>
      <!-- 右侧 -->
      <div>
        <RightCV />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import LeftContent from './LeftContent.vue'
import RightCV from './RightCV.vue'

const count = computed(() => {
  return 1
})
</script>

<style></style>
