<template>
  <div class="relative py-10 bg-stone-200 overflow-hidden border-t border-stone-300 flex items-center justify-center">
    <!-- 装饰背景：斜纹 -->
    <div class="absolute inset-0 pattern-diagonal opacity-50"></div>

    <!-- 胶带容器 -->
    <div
      class="w-[120%] -rotate-1 bg-[#1c1917] text-[#fafaf9] py-4 shadow-lg border-y-2 border-stone-800 flex relative z-10 overflow-hidden"
    >
      <div
        class="animate-marquee whitespace-nowrap font-mono font-bold text-sm md:text-base uppercase tracking-[0.2em] flex gap-12 pr-12"
      >
        <span v-for="i in 6" :key="`a-${i}`">Start Creating Your CV /// AI Powered ///</span>
      </div>
      <div
        class="animate-marquee whitespace-nowrap font-mono font-bold text-sm md:text-base uppercase tracking-[0.2em] flex gap-12 pr-12"
      >
        <span v-for="i in 6" :key="`b-${i}`">Start Creating Your CV /// AI Powered ///</span>
      </div>

      <!-- 叠加纹理 -->
      <div class="absolute inset-0 bg-noise opacity-30 pointer-events-none"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
