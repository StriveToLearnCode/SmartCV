<template>
  <section class="hero-a relative min-h-[70vh] flex items-center overflow-hidden" aria-label="Hero">
    <div class="w-full max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <!-- 左 50%：标题 + 副标题一行 + 按钮 -->
        <div class="space-y-6">
          <h1 class="hero-h1 text-[#111827] leading-[1.05]">让每一次面试，都成为资产。</h1>
          <p class="hero-sub text-[#525866]">从简历到复盘，形成可复用的能力闭环。</p>
          <div class="flex flex-wrap items-center gap-4 pt-2">
            <RouterLink
              to="/register"
              class="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-[#111827] rounded-[12px] hover:opacity-90 transition-opacity"
            >
              免费开始
            </RouterLink>
            <a href="#demo" class="inline-flex items-center gap-1 text-sm font-medium text-[#111827] hover:underline">
              查看演示
              <ArrowRightIcon class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- 右 50%：精选复盘卡（能力展示卡） -->
        <div class="relative flex justify-center lg:justify-end w-full lg:w-[90%] max-w-[560px]">
          <FeaturedReviewCard />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import FeaturedReviewCard from './FeaturedReviewCard.vue'
</script>

<style scoped>
.hero-a {
  background:
    radial-gradient(circle at 20% 30%, rgba(88, 99, 255, 0.06), transparent 40%),
    radial-gradient(circle at 85% 60%, rgba(0, 200, 255, 0.04), transparent 40%);
}

.hero-h1 {
  font-size: clamp(2.5rem, 6vw, 72px);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.hero-sub {
  font-size: clamp(1rem, 1.25vw, 1.125rem);
  line-height: 1.5;
}
</style>
