<template>
  <div class="min-h-screen font-sans text-stone-800 bg-[#f7f5f2] bg-paper-texture relative flex flex-col">
    <!-- Header: 功能性导航 -->
    <AiHeader :name="resumeData.basics.name" :total-issues="totalIssues" />

    <div class="flex-1 flex max-w-6xl mx-auto w-full p-6 gap-8 items-start">
      <!-- 左侧：诊断概览 Dashboard -->
      <ScoreDashboard
        :score="score"
        :score-color="scoreColor"
        :issue-counts="issueCounts"
        :category-map="categoryMap"
        :grouped-suggestions="groupedSuggestions"
        @scroll-to="scrollToCategory"
      />

      <!-- 右侧：建议详情列表 -->
      <SuggestionList
        :grouped-suggestions="groupedSuggestions"
        :category-map="categoryMap"
        :active-suggestion-id="activeSuggestionId"
        @apply="applyAction"
        @undo="undoAction"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAiAnalysis } from './composables/useAiAnalysis'
import AiHeader from './_components/AiHeader.vue'
import ScoreDashboard from './_components/ScoreDashboard.vue'
import SuggestionList from './_components/SuggestionList.vue'

// ----------------------------------------------------------------
// 逻辑接入
// ----------------------------------------------------------------
const {
  resumeData,
  activeSuggestionId,
  applyAction,
  undoAction,
  groupedSuggestions,
  totalIssues,
  issueCounts,
  score,
  scoreColor,
  categoryMap,
  analyze
} = useAiAnalysis()

// 初始化分析
analyze()

// 交互逻辑
const scrollToCategory = (cat: string) => {
  document.getElementById('section-' + cat)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.bg-paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' /%3E%3C/g%3E%3C/svg%3E");
}
</style>
