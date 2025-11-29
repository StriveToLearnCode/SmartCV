<template>
  <div class="relative py-10 bg-stone-50 overflow-hidden border-t border-stone-100 flex items-center justify-center">
    <!-- 胶带容器 -->
    <div class="w-[120%] bg-stone-100 text-stone-400 py-4 flex relative z-10 overflow-hidden">
      <div
        class="animate-marquee whitespace-nowrap font-sans font-medium text-xs md:text-sm uppercase tracking-[0.2em] flex gap-12 pr-12"
      >
        <span v-for="i in 6" :key="`a-${i}`">{{ DEFAULT_CONTENT.marquee.text }}</span>
      </div>
      <div
        class="animate-marquee whitespace-nowrap font-sans font-medium text-xs md:text-sm uppercase tracking-[0.2em] flex gap-12 pr-12"
      >
        <span v-for="i in 6" :key="`b-${i}`">{{ DEFAULT_CONTENT.marquee.text }}</span>
      </div>

      <!-- 叠加纹理 -->
      <div class="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DEFAULT_CONTENT } from '../default'
</script>

<style scoped>
.animate-marquee {
  animation: marquee 20s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
