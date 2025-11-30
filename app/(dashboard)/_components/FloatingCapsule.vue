<template>
  <Motion
    drag
    :dragMomentum="false"
    :dragElastic="0.1"
    class="fixed bottom-8 left-1/2 z-50 touch-none"
    :style="{ x: '-50%' }"
    @pointerdown="onPointerDown"
  >
    <!-- 纸条容器 -->
    <Motion
      :initial="false"
      :animate="{
        width: isExpanded ? 'auto' : '48px',
        height: 'auto',
        borderRadius: isExpanded ? '12px' : '24px',
        padding: isExpanded ? '0px' : '0px'
      }"
      :transition="{
        type: 'spring',
        stiffness: 250,
        damping: 25
      }"
      class="relative bg-[#fdfbf7] bg-paper-texture border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center"
      :class="{ 'shadow-[0_8px_30px_rgba(0,0,0,0.12)] opacity-90 scale-[1.02]': isDragging }"
      @dragStart="onDragStart"
      @dragEnd="onDragEnd"
    >
      <!-- 纸质纹理覆盖 -->
      <div class="absolute inset-0 pointer-events-none bg-stone-50/30 mix-blend-multiply"></div>

      <!-- 折叠状态: 图标 -->
      <Motion
        v-if="!isExpanded"
        class="flex items-center justify-center w-[48px] h-[48px]"
        :initial="{ opacity: 0, scale: 0.8 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0.8 }"
        @click="toggleExpand"
      >
        <!-- 默认折叠图标 -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-stone-600"
        >
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      </Motion>

      <!-- 展开状态: Tab 列表 -->
      <Motion
        v-else
        class="flex items-center p-1 min-w-max"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :exit="{ opacity: 0 }"
      >
        <div class="flex items-center gap-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click.stop="selectTab(tab.id)"
            class="relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-[8px] group outline-none flex flex-col items-center gap-1 min-w-[70px]"
            :class="[modelValue === tab.id ? 'text-stone-800' : 'text-stone-500 hover:text-stone-700']"
          >
            <!-- 文字 -->
            <span class="relative z-10 font-serif tracking-wide">{{ tab.label }}</span>

            <!-- 底部指示条 -->
            <Motion
              v-if="modelValue === tab.id"
              layoutId="active-paper-indicator"
              class="absolute bottom-0.5 w-6 h-1 bg-stone-800/80 rounded-full"
              :transition="{ type: 'spring', stiffness: 300, damping: 30 }"
            />

            <!-- 悬停背景 -->
            <div
              class="absolute inset-0 rounded-[8px] bg-stone-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
              v-if="modelValue !== tab.id"
            ></div>
          </button>
        </div>

        <!-- 收起/折叠按钮 -->
        <button
          @click.stop="handleClose"
          class="ml-2 w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-600 hover:bg-stone-100/50 rounded-full transition-colors mr-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </Motion>
    </Motion>
  </Motion>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Motion } from 'motion-v'

interface Tab {
  id: string
  label: string
}

defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isExpanded = ref(false)
const isDragging = ref(false)
const startPos = ref({ x: 0, y: 0 })

const tabs: Tab[] = [
  { id: 'overview', label: '概览' },
  { id: 'progress', label: '进度' },
  { id: 'suggestion', label: '建议' },
  { id: 'templates', label: '模板' }
]

const selectTab = (id: string) => {
  emit('update:modelValue', id)
}

const onPointerDown = (e: PointerEvent) => {
  // 记录按下时的位置，用于后续计算移动距离
  startPos.value = { x: e.clientX, y: e.clientY }
}

const onDragStart = () => {
  isDragging.value = true
}

const onDragEnd = () => {
  // 延迟重置状态，防止拖拽结束时立即触发 click 事件导致展开
  setTimeout(() => {
    isDragging.value = false
  }, 300)
}

const toggleExpand = (e: MouseEvent) => {
  // 计算按下和松开的距离
  const dx = Math.abs(e.clientX - startPos.value.x)
  const dy = Math.abs(e.clientY - startPos.value.y)

  // 如果移动超过 5px，视为拖拽操作，不触发点击
  if (dx > 5 || dy > 5) {
    return
  }

  // 双重保险：如果 drag 状态未重置，也不触发
  if (isDragging.value) {
    return
  }

  isExpanded.value = !isExpanded.value
}

const handleClose = () => {
  isExpanded.value = false
}
</script>

<style scoped>
.bg-paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
}
</style>
