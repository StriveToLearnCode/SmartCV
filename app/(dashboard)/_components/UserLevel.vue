<template>
  <div class="flex items-center gap-3 group cursor-pointer select-none">
    <div class="text-right hidden sm:block">
      <div class="text-xs font-bold text-stone-700">{{ levelInfo.title }}</div>
      <div class="text-[10px] text-stone-400 font-medium">
        Lv.{{ levelInfo.level }} · {{ Math.floor(levelInfo.progress) }}%
      </div>
    </div>
    
    <div class="relative w-10 h-10">
      <!-- Circular Progress Background -->
      <svg class="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
        <path
          class="text-stone-200"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
        />
        <!-- Circular Progress Value -->
        <path
          class="text-orange-500 transition-all duration-1000 ease-out"
          :stroke-dasharray="`${levelInfo.progress}, 100`"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
        />
      </svg>
      
      <!-- Avatar/Icon inside -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-stone-100 to-stone-200 border border-stone-300 flex items-center justify-center overflow-hidden">
            <span class="text-sm">👨‍💻</span>
        </div>
      </div>

      <!-- Level Badge -->
      <div class="absolute -bottom-1 -right-1 bg-stone-800 text-white text-[8px] font-bold px-1 rounded-full border border-white">
        {{ levelInfo.level }}
      </div>

      <!-- Floating XP Indicator -->
      <Transition name="float-up">
        <div
          v-if="showXpFloat"
          class="absolute -top-6 right-0 text-xs font-bold text-orange-500 whitespace-nowrap pointer-events-none"
        >
          +{{ lastGainedXp }} XP
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLevelStore } from '../../composables/useLevelStore'

const { currentLevelInfo: levelInfo, state } = useLevelStore()

const showXpFloat = ref(false)
const lastGainedXp = ref(0)

watch(
  () => state.value.totalXp,
  (newVal, oldVal) => {
    if (newVal > oldVal) {
      lastGainedXp.value = newVal - oldVal
      showXpFloat.value = true
      setTimeout(() => {
        showXpFloat.value = false
      }, 1500)
    }
  }
)
</script>

<style scoped>
.float-up-enter-active {
  transition: all 0.5s ease-out;
}
.float-up-leave-active {
  transition: all 0.5s ease-in;
}
.float-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.float-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.float-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.float-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

