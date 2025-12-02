<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/20 backdrop-blur-sm"
  >
    <div
      class="bg-[#fdfbf7] rounded-sm max-w-lg w-full p-8 shadow-2xl border border-stone-200 relative rotate-1"
    >
      <!-- Top Tape -->
      <div
        class="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 border border-white/60 shadow-sm -rotate-2 backdrop-blur-sm z-20"
      ></div>

      <button
        @click="$emit('update:modelValue', false)"
        class="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
      >
        ×
      </button>

      <h3 class="text-xl font-bold text-stone-800 mb-2 font-serif flex items-center gap-2">
        <span class="text-2xl">✂️</span>
        JD 剪报夹
      </h3>
      <p class="text-xs text-stone-500 mb-6 font-serif italic">
        "把看到的职位描述贴在这里，我会帮你整理成卡片。"
      </p>

      <div class="space-y-4">
        <textarea
          class="w-full h-40 p-4 rounded-sm bg-white border-2 border-dashed border-stone-200 text-sm focus:outline-none focus:border-stone-400 resize-none placeholder:text-stone-300 font-mono leading-relaxed"
          placeholder="在此处粘贴..."
        ></textarea>
        <div class="flex justify-end gap-3 pt-2">
          <button
            @click="$emit('update:modelValue', false)"
            class="px-4 py-2 text-xs font-bold text-stone-400 hover:text-stone-600 uppercase tracking-wider"
          >
            算了
          </button>
          <button
            @click="$emit('update:modelValue', false)"
            class="px-6 py-2 bg-stone-800 text-[#f7f5f2] text-xs font-bold rounded-sm shadow-md hover:bg-stone-700 transform hover:-translate-y-0.5 transition-all"
          >
            整理并保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()
defineEmits(['update:modelValue'])
</script>

