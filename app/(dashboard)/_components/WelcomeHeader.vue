<template>
  <header class="w-full py-8 text-center animate-fade-in">
    <h1 class="text-2xl md:text-3xl font-serif text-stone-700 tracking-wide leading-relaxed">
      “今天想写点什么？<br class="md:hidden" />我帮你把简历变得更有故事。”
    </h1>
    <p class="mt-2 text-sm text-stone-400 font-light tracking-widest uppercase">SmartCV Dashboard</p>
  </header>
</template>

<script setup lang="ts">
// 文青风欢迎语组件
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
