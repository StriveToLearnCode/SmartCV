<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1400px] mx-auto px-4 pb-12">
    <!-- 1. 简历卡片区 -->
    <div class="flex flex-col gap-4 animate-fade-in-up" style="animation-delay: 0.1s">
      <h3 class="text-stone-500 text-sm font-medium uppercase tracking-wider pl-1">简历草稿</h3>
      <div
        class="bg-white p-4 rounded shadow-sm border border-stone-200 min-h-[200px] hover:shadow-md transition-all cursor-pointer relative group overflow-hidden"
      >
        <div
          class="absolute top-0 left-0 w-full h-1 bg-stone-800 opacity-0 group-hover:opacity-100 transition-opacity"
        ></div>
        <div class="text-xs text-stone-400 mb-2">刚刚生成</div>
        <div class="font-serif text-lg text-stone-800 mb-2">产品经理_V3.pdf</div>
        <p class="text-stone-500 text-sm line-clamp-4">
          资深产品经理，拥有5年SaaS平台经验。擅长用户体验设计与数据驱动决策...
        </p>
      </div>
    </div>

    <!-- 2. JD 智能解析 -->
    <div class="flex flex-col gap-4 animate-fade-in-up" style="animation-delay: 0.2s">
      <h3 class="text-stone-500 text-sm font-medium uppercase tracking-wider pl-1">JD 分析笔记</h3>
      <div class="bg-yellow-50/50 p-5 rounded shadow-sm border border-yellow-100/50 min-h-[200px] relative">
        <div class="flex items-center justify-between mb-3">
          <span class="text-stone-600 font-serif font-bold">匹配度</span>
          <span class="text-2xl font-serif text-stone-800">85%</span>
        </div>
        <div class="space-y-2">
          <div class="text-xs text-stone-500 uppercase">缺失技能</div>
          <div class="flex flex-wrap gap-2">
            <span class="px-2 py-1 bg-white border border-stone-200 rounded text-xs text-stone-600">SQL</span>
            <span class="px-2 py-1 bg-white border border-stone-200 rounded text-xs text-stone-600">Figma</span>
          </div>
        </div>
        <div class="mt-4 text-sm text-stone-600 leading-relaxed">
          <span class="text-stone-400 mr-1">💡</span> 建议强调你在上一份工作中主导的数据分析项目。
        </div>
      </div>
    </div>

    <!-- 3. 求职看板 -->
    <div class="flex flex-col gap-4 animate-fade-in-up" style="animation-delay: 0.3s">
      <h3 class="text-stone-500 text-sm font-medium uppercase tracking-wider pl-1">本周任务</h3>
      <div class="bg-white p-4 rounded shadow-sm border border-stone-200 min-h-[200px]">
        <ul class="space-y-3">
          <li class="flex items-start gap-3 group cursor-pointer">
            <div
              class="w-4 h-4 rounded border border-stone-300 mt-0.5 group-hover:border-stone-800 transition-colors"
            ></div>
            <span class="text-sm text-stone-600 group-hover:text-stone-800 line-through opacity-50">更新项目经历</span>
          </li>
          <li class="flex items-start gap-3 group cursor-pointer">
            <div
              class="w-4 h-4 rounded border border-stone-300 mt-0.5 group-hover:border-stone-800 transition-colors"
            ></div>
            <span class="text-sm text-stone-600 group-hover:text-stone-800">投递 A 岗位</span>
          </li>
          <li class="flex items-start gap-3 group cursor-pointer">
            <div
              class="w-4 h-4 rounded border border-stone-300 mt-0.5 group-hover:border-stone-800 transition-colors"
            ></div>
            <span class="text-sm text-stone-600 group-hover:text-stone-800">补充技能 React</span>
          </li>
        </ul>
        <button
          class="mt-4 w-full py-2 text-xs text-stone-400 border border-dashed border-stone-200 rounded hover:border-stone-400 hover:text-stone-600 transition-colors"
        >
          + 添加任务
        </button>
      </div>
    </div>

    <!-- 4. 模板推荐 -->
    <div class="flex flex-col gap-4 animate-fade-in-up" style="animation-delay: 0.4s">
      <h3 class="text-stone-500 text-sm font-medium uppercase tracking-wider pl-1">推荐模板</h3>
      <div class="grid grid-cols-2 gap-3">
        <div
          class="aspect-3/4 bg-stone-200 rounded cursor-pointer hover:ring-2 ring-stone-400 transition-all relative overflow-hidden"
        >
          <!-- Placeholder for template preview -->
          <div class="absolute inset-0 bg-white m-1 shadow-sm flex items-center justify-center text-xs text-stone-300">
            简约
          </div>
        </div>
        <div
          class="aspect-3/4 bg-stone-200 rounded cursor-pointer hover:ring-2 ring-stone-400 transition-all relative overflow-hidden"
        >
          <!-- Placeholder for template preview -->
          <div
            class="absolute inset-0 bg-stone-50 m-1 shadow-sm flex items-center justify-center text-xs text-stone-300"
          >
            创意
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 智能看板区域，包含4个主要模块
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
