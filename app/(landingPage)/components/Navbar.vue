<template>
  <nav class="fixed top-0 w-full border-b border-stone-100 bg-[#FAFAF9]/90 backdrop-blur-md z-50">
    <div class="absolute inset-0 bg-noise opacity-50 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 md:px-12 py-4 flex justify-between items-center w-full relative z-10">
      <!-- Logo: 极简文字 -->
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 bg-stone-900 flex items-center justify-center rounded-sm">
          <span class="text-stone-50 font-sans font-medium text-sm">S</span>
        </div>
        <div class="font-serif-display font-medium text-xl tracking-tight text-stone-900">SmartCV.</div>
        <span
          class="text-[10px] font-sans uppercase tracking-wider border border-stone-200 px-1.5 py-0.5 bg-white text-stone-400 ml-2 hidden sm:inline-block rounded-sm"
          >Beta</span
        >
      </div>

      <button
        class="px-6 py-2 bg-stone-900 text-stone-50 text-xs font-medium uppercase tracking-widest hover:bg-stone-800 transition-all rounded-sm border border-transparent hover:border-stone-200"
      >
        开始制作
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped></style>
