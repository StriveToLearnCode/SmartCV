<template>
  <div
    class="relative group cursor-pointer transition-transform duration-300 hover:scale-105 hover:-rotate-1"
    @click="emit('click')"
  >
    <!-- Scotch Tape (Top Center) -->
    <div
      class="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/30 backdrop-blur-[1px] border-l border-r border-white/40 rotate-[-2deg] opacity-80 shadow-sm z-10 pointer-events-none"
    ></div>

    <!-- Paper Body -->
    <div
      class="bg-[#fff7cd] text-stone-800 p-4 pr-8 rounded-sm shadow-[2px_4px_12px_rgba(0,0,0,0.1)] border-b border-r border-[#e2dcb0] relative overflow-hidden min-w-[280px] max-w-sm transform rotate-1"
    >
      <!-- Paper Texture -->
      <div class="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none"></div>

      <!-- Content -->
      <div class="relative z-10 flex items-start gap-3">
        <!-- Icon/Emoji -->
        <div class="text-xl mt-0.5 shrink-0">
           <span v-if="type === 'warning'">📝</span>
           <span v-else-if="type === 'success'">🌟</span>
           <span v-else>💡</span>
        </div>

        <div class="flex-1">
          <h4 class="font-serif font-bold text-stone-800 text-sm leading-tight mb-1">
            {{ title }}
          </h4>
          <p class="font-serif text-xs text-stone-600 leading-relaxed">
            {{ description }}
          </p>
        </div>
        
        <!-- Action Arrow (Hand-drawn style) -->
        <div class="absolute bottom-2 right-2 text-stone-400 group-hover:text-stone-600 group-hover:translate-x-1 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </div>
      </div>
      
      <!-- Folded Corner (Bottom Right) -->
      <div class="absolute bottom-0 right-0 w-4 h-4 bg-linear-to-tl from-black/5 to-transparent pointer-events-none"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  type?: 'info' | 'warning' | 'success'
}>()

const emit = defineEmits(['click'])
</script>

<style scoped>
/* Add paper texture if not global */
.bg-paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
}
</style>

