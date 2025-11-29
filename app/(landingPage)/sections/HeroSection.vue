<template>
  <section
    class="pt-32 pb-20 px-4 md:pt-40 md:pb-32 md:px-12 lg:px-30 relative overflow-hidden bg-[#fafaf9]"
  >
    <!-- 背景装饰 -->
    <div class="absolute inset-0 bg-grid-paper opacity-30 pointer-events-none"></div>
    <div class="absolute inset-0 bg-noise opacity-40 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
      <!-- 左侧 -->
      <div class="relative">
        <HeroContent />
      </div>
      <!-- 右侧 -->
      <div>
        <HeroVisual />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import HeroContent from '../components/HeroContent.vue'
import HeroVisual from '../components/HeroVisual.vue'

const count = computed(() => {
  return 1
})
</script>

<style></style>
