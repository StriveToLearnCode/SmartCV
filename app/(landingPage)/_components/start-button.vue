<template>
  <div class="w-full max-w-md mx-auto space-y-4">
    <!-- Slider Container -->
    <div
      ref="trackRef"
      class="relative h-12 rounded-lg border border-[#e1e1e1] dark:border-[#2f2f2f] bg-white dark:bg-[#191919] overflow-hidden cursor-pointer select-none shadow-sm"
      @mousedown="handleStart"
      @touchstart.passive="handleStart"
    >
      <!-- Progress Background -->
      <div
        class="absolute inset-0 bg-[#37352f]/5 dark:bg-[#d4d4d4]/5 transition-all duration-200"
        :style="{ width: progressPercent + '%' }"
      ></div>

      <!-- Text -->
      <div
        class="absolute inset-0 flex items-center justify-center text-sm font-medium text-[#9b9b9b] dark:text-[#6e6e6e] transition-opacity"
        :class="{ 'opacity-0': isComplete }"
      >
        <span>Swipe to Start →</span>
      </div>

      <!-- Success Text -->
      <div
        v-if="isComplete"
        class="absolute inset-0 flex items-center justify-center text-sm font-medium text-[#37352f] dark:text-[#d4d4d4]"
      >
        <span class="mr-2">✨</span>
        Let's go!
      </div>

      <!-- Slider Handle -->
      <div
        class="absolute top-1/2 -translate-y-1/2 w-8 h-8 ml-1 rounded bg-[#37352f] dark:bg-[#d4d4d4] shadow-sm transition-all duration-200 flex items-center justify-center cursor-grab active:cursor-grabbing"
        :class="{ 'cursor-default': isComplete }"
        :style="{ left: handlePosition + 'px' }"
      >
        <div class="text-white dark:text-[#191919] text-xs font-bold">→</div>
      </div>
    </div>

    <!-- Consent Message -->
    <p class="text-xs text-center text-[#9b9b9b]/60">
      By starting, you agree to our
      <a href="#" class="underline hover:text-[#37352f] dark:hover:text-[#d4d4d4]">Terms</a>
      and
      <a href="#" class="underline hover:text-[#37352f] dark:hover:text-[#d4d4d4]">Privacy</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const trackRef = ref<HTMLElement>()
const handlePosition = ref(4)
const isDragging = ref(false)
const isComplete = ref(false)

const maxPosition = computed(() => {
  if (!trackRef.value) return 0
  return trackRef.value.clientWidth - 44 // 44 = handle width + padding
})

const progressPercent = computed(() => {
  if (maxPosition.value === 0) return 0
  return (handlePosition.value / maxPosition.value) * 100
})

function handleStart(_e: MouseEvent | TouchEvent) {
  if (isComplete.value) return
  isDragging.value = true

  const moveHandler = (moveEvent: MouseEvent | TouchEvent) => {
    if (!isDragging.value || !trackRef.value) return

    let clientX = 0
    if ('touches' in moveEvent) {
      const touch = moveEvent.touches[0]
      if (touch) clientX = touch.clientX
    } else if ('clientX' in moveEvent) {
      clientX = moveEvent.clientX
    }

    const rect = trackRef.value!.getBoundingClientRect()
    const newPosition = Math.min(Math.max(clientX - rect.left - 20, 4), maxPosition.value)
    handlePosition.value = newPosition

    // Check if completed
    if (newPosition >= maxPosition.value * 0.95) {
      complete()
    }
  }

  const endHandler = () => {
    if (!isComplete.value) {
      // Snap back if not completed
      handlePosition.value = 4
    }
    isDragging.value = false
    document.removeEventListener('mousemove', moveHandler)
    document.removeEventListener('touchmove', moveHandler)
    document.removeEventListener('mouseup', endHandler)
    document.removeEventListener('touchend', endHandler)
  }

  document.addEventListener('mousemove', moveHandler)
  document.addEventListener('touchmove', moveHandler)
  document.addEventListener('mouseup', endHandler)
  document.addEventListener('touchend', endHandler)
}

function complete() {
  isComplete.value = true
  handlePosition.value = maxPosition.value
  isDragging.value = false

  setTimeout(() => {
    router.push('/login')
  }, 600)
}
</script>
