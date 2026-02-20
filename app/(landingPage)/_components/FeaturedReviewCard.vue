<template>
  <div
    class="featured-review-card rounded-[16px] border border-[#EAECEF] bg-white overflow-hidden shadow-[0_4px_20px_rgba(17,24,39,0.06)]"
  >
    <!-- 1）卡片头：场景 + 可信度 -->
    <div class="flex items-start justify-between gap-3 px-5 pt-4 pb-3 border-b border-[#EAECEF]">
      <div>
        <span class="inline-block text-[11px] font-medium text-[#8A8F98]">精选复盘 · 技术一面</span>
        <p class="text-[11px] text-[#8A8F98] mt-1">最近 7 天 · 某大厂</p>
      </div>
      <span
        class="shrink-0 px-2.5 py-1 text-[11px] font-medium rounded-full border border-[#2563eb]/30 text-[#2563eb] bg-[#2563eb]/05"
      >
        通过概率 65%
      </span>
    </div>

    <!-- 两栏：左 40% 大分数 + 趋势，右 60% 洞察 + 改进 + CTA -->
    <div class="flex flex-col md:flex-row">
      <!-- 左栏 40%：主视觉 大分数 + 趋势 -->
      <div
        class="md:w-[40%] px-5 py-5 md:py-6 border-b md:border-b-0 md:border-r border-[#EAECEF] flex flex-col justify-center"
      >
        <div class="flex items-baseline gap-1">
          <span class="score-num text-[#111827] tabular-nums">7.2</span>
          <span class="text-base text-[#8A8F98]">/10</span>
        </div>
        <p class="text-[13px] text-[#525866] mt-2">表现稳定 <span class="font-medium text-[#059669]">↑0.8</span></p>
      </div>

      <!-- 右栏 60%：AI 洞察 + 需要加强 + 底部 CTA -->
      <div class="md:w-[60%] flex flex-col">
        <!-- 3）AI 洞察 -->
        <div class="px-5 py-4 border-b border-[#EAECEF]">
          <h3 class="text-[15px] font-semibold text-[#111827] mb-3">AI 洞察</h3>
          <ul class="space-y-2">
            <li class="flex gap-2 text-[14px] text-[#525866] leading-snug">
              <span class="shrink-0 text-[11px] font-bold text-[#2563eb]">01</span>
              <span>行为回答结尾补数字，面试官更容易抓重点</span>
            </li>
            <li class="flex gap-2 text-[14px] text-[#525866] leading-snug">
              <span class="shrink-0 text-[11px] font-bold text-[#2563eb]">02</span>
              <span>原理结构清晰：能区分 Proxy 与 defineProperty</span>
            </li>
            <li class="flex gap-2 text-[14px] text-[#525866] leading-snug">
              <span class="shrink-0 text-[11px] font-bold text-[#2563eb]">03</span>
              <span>建议先给结论再展开，减少冗余</span>
            </li>
          </ul>
        </div>

        <!-- 4）需要加强：维度条 -->
        <div class="px-5 py-3 border-b border-[#EAECEF]">
          <h3 class="text-[13px] font-semibold text-[#111827] mb-2">需要加强</h3>
          <div class="flex flex-wrap gap-2">
            <span
              class="inline-flex items-center gap-1.5 px-2.5 py-1 text-[12px] rounded-md border border-[#EAECEF] text-[#525866] bg-[#F7F8FA]"
            >
              量化能力 <span class="font-semibold text-[#111827] tabular-nums">6/10</span>
            </span>
            <span
              class="inline-flex items-center gap-1.5 px-2.5 py-1 text-[12px] rounded-md border border-[#EAECEF] text-[#525866] bg-[#F7F8FA]"
            >
              逻辑完整度 <span class="font-semibold text-[#111827] tabular-nums">7/10</span>
            </span>
            <span
              class="inline-flex items-center gap-1.5 px-2.5 py-1 text-[12px] rounded-md border border-[#EAECEF] text-[#525866] bg-[#F7F8FA]"
            >
              表达流畅度 <span class="font-semibold text-[#111827] tabular-nums">8/10</span>
            </span>
          </div>
        </div>

        <!-- 5）底部：闭环证据 + CTA -->
        <div class="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-auto">
          <p class="text-[12px] text-[#8A8F98]">已生成 3 个练习题 · 1 条简历 bullet 可复用</p>
          <RouterLink
            to="/register"
            class="shrink-0 inline-flex items-center justify-center gap-1 px-4 py-2 text-[13px] font-medium text-white bg-[#111827] rounded-[12px] hover:opacity-90 transition-opacity"
          >
            一键生成改进计划
            <ArrowRightIcon class="w-4 h-4" />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
</script>

<style scoped>
.score-num {
  font-size: clamp(2rem, 5vw, 48px);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
</style>
