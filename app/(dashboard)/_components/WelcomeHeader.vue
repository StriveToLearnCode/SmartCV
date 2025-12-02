<template>
  <div class="w-full py-6 flex justify-center">
    <!-- Daily Focus Sticker -->
    <Motion
      :initial="{ y: -20, opacity: 0, rotate: -2 }"
      :animate="{ y: 0, opacity: 1, rotate: -1 }"
      :hover="{ rotate: 0, scale: 1.02 }"
      class="relative bg-[#fefce8] text-stone-800 p-6 md:p-8 max-w-2xl w-full shadow-sticky border border-yellow-200/60 transform rotate-[-1deg]"
    >
      <!-- Washi Tape -->
      <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 border border-white/60 shadow-sm rotate-[-2deg] backdrop-blur-sm z-20 tape-strip"></div>

      <div class="flex flex-col items-center text-center gap-3">
        <div class="flex items-center gap-2">
           <span class="text-xs font-bold uppercase tracking-widest text-yellow-600/80 bg-yellow-100 px-2 py-1 rounded-sm">Today's Focus</span>
           <span class="text-xs font-serif text-stone-400 italic">{{ currentDate }}</span>
        </div>

        <h2 class="text-2xl md:text-3xl font-serif font-medium text-stone-800 leading-snug">
          下午 2:00 有一场产品经理面试
        </h2>

        <!-- Warm Countdown Capsule -->
        <div class="mt-2 inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 border border-orange-100 rounded-full text-orange-800/80 text-sm font-medium shadow-sm">
           <span class="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
           还有 3 小时 20 分钟，别紧张，准备得很好
        </div>

        <p class="mt-4 text-stone-500 text-sm font-serif italic">
          “记得带上你的作品集 iPad，昨晚你已经把重点都标记好了。”
        </p>
      </div>
      
      <!-- Decorative: Coffee Stain -->
      <div class="absolute -bottom-4 -right-4 w-16 h-16 opacity-10 pointer-events-none mix-blend-multiply">
         <svg viewBox="0 0 100 100" class="w-full h-full fill-stone-800">
            <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50S27.9 10 50 10s40 17.9 40 40-17.9 40-40 40z"/>
         </svg>
      </div>
    </Motion>
  </div>
</template>

<script setup lang="ts">
import { Motion } from 'motion-v'
import { computed } from 'vue'

const currentDate = computed(() => {
  return new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })
})
</script>

<style scoped>
.shadow-sticky {
  box-shadow: 2px 3px 10px rgba(0,0,0,0.05);
}
.tape-strip {
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(1px);
}
</style>
