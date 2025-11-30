<template>
  <div class="bg-[#f5f5f4] min-h-screen relative overflow-hidden">
    <router-view v-slot="{ Component }">
      <transition name="paper-stack" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style>
/* 全局纸质叠放切换动效 */
.paper-stack-enter-active,
.paper-stack-leave-active {
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.paper-stack-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
  transform-origin: center top;
}

.paper-stack-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

/* 确保背景统一 */
body {
  background-color: #f5f5f4;
}
</style>
