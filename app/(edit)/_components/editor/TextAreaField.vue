<template>
  <div class="flex flex-col gap-1 mb-5 relative group">
    <label class="text-[10px] font-bold text-stone-400 uppercase tracking-wider ml-1">{{ label }}</label>
    <textarea 
      :value="modelValue" 
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :placeholder="placeholder"
      :rows="rows || 3"
      class="w-full p-3 bg-[#fdfdfc] border-2 border-dashed border-stone-200 rounded-sm text-stone-800 text-sm focus:outline-none focus:border-stone-400 transition-all resize-none placeholder:text-stone-300/50 leading-relaxed font-serif"
    ></textarea>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  label: string
  modelValue?: string
  placeholder?: string
  rows?: number | string
}>()
defineEmits(['update:modelValue'])
</script>

