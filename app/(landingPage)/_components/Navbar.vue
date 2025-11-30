<template>
  <nav
    class="fixed top-0 w-full border-b border-stone-200/50 bg-[#FAFAF9]/90 backdrop-blur-md z-50 transition-all duration-500"
  >
    <div class="absolute inset-0 bg-paper-texture opacity-50 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 md:px-12 py-4 flex justify-between items-center w-full relative z-10">
      <!-- Logo: 极简文字 -->
      <div class="flex items-center gap-2 cursor-pointer" @click="router.push('/')">
        <div
          class="w-8 h-8 bg-stone-800 flex items-center justify-center rounded-sm shadow-sm rotate-1 transition-transform group-hover:rotate-0"
        >
          <span class="text-stone-50 font-serif font-bold text-lg">S</span>
        </div>
        <div class="font-serif-display font-medium text-xl tracking-tight text-stone-900">SmartCV.</div>
        <span
          class="text-[10px] font-sans uppercase tracking-wider border border-stone-200 px-1.5 py-0.5 bg-white text-stone-400 ml-2 hidden sm:inline-block rounded-sm transform -rotate-2"
          >Beta</span
        >
      </div>

      <!-- Navigation Links -->
      <div class="hidden md:flex items-center gap-8">
        <a href="#" class="text-stone-600 text-sm font-serif hover:text-stone-900 transition-colors nav-link-underline"
          >功能特权</a
        >
        <a href="#" class="text-stone-600 text-sm font-serif hover:text-stone-900 transition-colors nav-link-underline"
          >精选模板</a
        >
        <a href="#" class="text-stone-600 text-sm font-serif hover:text-stone-900 transition-colors nav-link-underline"
          >求职指南</a
        >
      </div>

      <button
        class="px-6 py-2 bg-stone-800 text-stone-50 text-xs font-medium uppercase tracking-widest hover:bg-stone-700 transition-all rounded-sm border border-transparent hover:border-stone-300 shadow-sm sketch-border hover:shadow-md active:scale-95"
        @click="router.push('/dashboard')"
      >
        开始制作
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped>
/* Add some paper texture specific override if needed, but using global classes is better */
</style>
