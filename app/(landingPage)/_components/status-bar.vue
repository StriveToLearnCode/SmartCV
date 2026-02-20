<template>
  <section class="mt-10 py-6 border-b border-[#E9EBEF] bg-[#FFFFFF]">
    <div class="mx-auto max-w-[1160px] px-6 lg:px-8">
      <div
        class="flex flex-wrap items-center justify-center gap-6 lg:gap-10 text-sm"
        role="navigation"
        aria-label="Status"
      >
        <RouterLink
          to="/resume-edit"
          class="flex items-center gap-2 text-[#111827] hover:text-[#525866] transition-colors"
        >
          <span class="text-[#8A8F98]">匹配度</span>
          <span class="font-semibold tabular-nums">78%</span>
        </RouterLink>
        <RouterLink
          to="/resume-edit"
          class="flex items-center gap-2 text-[#111827] hover:text-[#525866] transition-colors"
        >
          <span class="text-[#8A8F98]">ATS</span>
          <span class="font-semibold tabular-nums">85%</span>
        </RouterLink>
        <RouterLink
          to="/resume-edit"
          class="flex items-center gap-2 text-[#111827] hover:text-[#525866] transition-colors"
        >
          <span class="text-[#8A8F98]">待优化</span>
          <span class="font-semibold tabular-nums">2</span>
        </RouterLink>
        <RouterLink
          to="/dashboard/analysis"
          class="flex items-center gap-2 text-[#111827] hover:text-[#525866] transition-colors"
        >
          <span class="text-[#8A8F98]">待复盘</span>
          <span class="font-semibold tabular-nums">2</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
