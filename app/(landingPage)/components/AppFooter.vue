<template>
  <footer class="bg-[#fafaf9] border-t border-stone-100 py-12 px-4 md:px-12 relative overflow-hidden">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <!-- 左侧版权信息 -->
      <div class="text-stone-500 text-xs md:text-sm font-sans">
        {{ DEFAULT_CONTENT.meta.copyright }}
      </div>

      <!-- 右侧链接（可选） -->
      <div class="flex items-center gap-6">
        <a href="#" class="text-stone-400 hover:text-stone-600 text-xs md:text-sm font-sans transition-colors"
          >Privacy Policy</a
        >
        <a href="#" class="text-stone-400 hover:text-stone-600 text-xs md:text-sm font-sans transition-colors"
          >Terms of Service</a
        >
      </div>
    </div>

    <!-- 装饰背景 -->
    <div class="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>
  </footer>
</template>

<script setup lang="ts">
import { DEFAULT_CONTENT } from '../default'
</script>

<style scoped></style>

