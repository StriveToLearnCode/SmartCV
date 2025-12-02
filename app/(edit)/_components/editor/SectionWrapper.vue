<template>
  <div
    class="bg-white rounded-sm shadow-sm border border-stone-200 overflow-hidden group hover:shadow-md transition-all duration-300 relative"
    :class="{ 'ring-1 ring-stone-300': isActive }"
  >
    <!-- 模块头部 -->
    <div
      class="flex items-center justify-between p-4 bg-[#fffdf5] border-b border-stone-100 cursor-pointer select-none"
      @click="$emit('toggle-expand')"
    >
      <div class="flex items-center gap-3 flex-1">
        <!-- 拖拽手柄 (Grip lines) -->
        <div
          class="drag-handle cursor-grab active:cursor-grabbing text-stone-300 hover:text-stone-500 p-2 -ml-2 hover:bg-stone-100/50 rounded transition-colors flex flex-col gap-0.5"
          title="拖拽排序"
        >
          <div class="w-4 h-0.5 bg-stone-300 rounded-full"></div>
          <div class="w-4 h-0.5 bg-stone-300 rounded-full"></div>
          <div class="w-4 h-0.5 bg-stone-300 rounded-full"></div>
        </div>

        <span class="text-xl">{{ icon }}</span>

        <div v-if="isEditingTitle" class="flex-1 mr-4" @click.stop>
          <input
            ref="titleInputRef"
            v-model="section.title"
            @blur="finishEditing"
            @keydown.enter="finishEditing"
            class="w-full px-2 py-1 bg-transparent border-b border-stone-800 text-sm focus:outline-none font-bold text-stone-800 font-serif"
          />
        </div>
        <div v-else class="group/title flex items-center gap-2">
          <span class="font-bold text-stone-800 text-sm tracking-wide font-serif">{{ section.title }}</span>
          <button
            @click.stop="startEditing"
            class="opacity-0 group-hover/title:opacity-100 text-stone-400 hover:text-stone-600 p-1 transition-opacity"
            title="重命名"
          >
            ✎
          </button>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex items-center gap-2">
        <div v-if="section.type === 'skills'" class="mr-2" @click.stop>
          <select
            v-model="section.variant"
            class="text-[10px] font-bold text-stone-400 bg-transparent border-none hover:text-stone-600 focus:outline-none cursor-pointer uppercase"
          >
            <option value="list">List</option>
            <option value="matrix">Matrix</option>
            <option value="cloud">Cloud</option>
          </select>
        </div>

        <button
          @click.stop="section.isVisible = !section.isVisible"
          class="text-stone-300 hover:text-stone-600 p-1 transition-colors"
          :title="section.isVisible ? '隐藏' : '显示'"
        >
          {{ section.isVisible ? '👁️' : '🙈' }}
        </button>

        <div
          class="text-stone-300 transform transition-transform duration-300"
          :class="{ 'rotate-180': isActive }"
        >
          ▼
        </div>
      </div>
    </div>

    <!-- 模块内容 -->
    <div v-show="isActive" class="p-6 bg-white relative">
      <!-- Paper texture overlay for inner content -->
      <div class="absolute inset-0 bg-paper-texture opacity-20 pointer-events-none"></div>
      <div class="relative z-10">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { ResumeSection } from '../../composables/useResume'

const props = defineProps<{
  section: ResumeSection
  isActive: boolean
  icon: string
}>()

const emit = defineEmits(['toggle-expand'])

const isEditingTitle = ref(false)
const titleInputRef = ref<HTMLInputElement | null>(null)

const startEditing = () => {
  isEditingTitle.value = true
  nextTick(() => {
    titleInputRef.value?.focus()
  })
}

const finishEditing = () => {
  isEditingTitle.value = false
}
</script>

<style scoped>
.bg-paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
}
</style>

