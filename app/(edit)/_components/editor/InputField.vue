<template>
  <div class="flex flex-col gap-1 mb-5 relative group">
    <label class="text-[10px] font-bold text-stone-400 uppercase tracking-wider ml-1">{{ label }}</label>
    <input 
      :type="type || 'text'" 
      :value="modelValue" 
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      class="w-full px-2 py-2 bg-transparent border-b-2 border-stone-200 text-stone-800 text-sm focus:outline-none focus:border-stone-800 transition-colors placeholder:text-stone-300/50 font-serif"
    />
    <!-- Highlight line effect -->
    <div class="absolute bottom-0 left-0 w-0 h-[2px] bg-stone-800 transition-all duration-300 group-focus-within:w-full"></div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  label: string
  modelValue?: string | number
  type?: string
  placeholder?: string
}>()
defineEmits(['update:modelValue'])
</script>

