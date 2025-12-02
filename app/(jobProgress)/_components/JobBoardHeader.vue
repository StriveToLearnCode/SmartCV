<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 pt-8 mb-12">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <!-- Logo/Title with hand-drawn underline -->
        <div class="relative inline-block">
          <h1 class="text-3xl font-bold text-stone-800 font-serif tracking-tight">求职看板</h1>
          <svg
            class="absolute -bottom-2 left-0 w-full h-3 text-yellow-300 -z-10"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
          >
            <path
              d="M0 5 Q 50 10 100 5"
              fill="none"
              stroke="currentColor"
              stroke-width="6"
              opacity="0.6"
            />
          </svg>
        </div>
        <p class="text-sm text-stone-500 mt-3 font-serif italic">
          "记录每一次投递，让求职进度有迹可循。"
        </p>
      </div>

      <div class="flex items-center gap-4 self-start md:self-auto">
        <!-- 1. 智能分析 (贴纸风格按钮) -->
        <button
          @click="$emit('show-analysis')"
          class="group relative px-4 py-2 bg-white border-2 border-stone-200 rounded-sm text-xs font-bold text-stone-600 hover:border-stone-400 hover:text-stone-900 transition-all shadow-sm hover:-rotate-1"
          title="查看求职数据分析"
        >
          <div class="flex items-center gap-2">
            <span class="text-lg">📊</span>
            <span class="hidden sm:inline">进度复盘</span>
          </div>
          <!-- 装饰胶带 -->
          <div
            class="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-stone-100/50 rotate-2 border border-white/50"
          ></div>
        </button>

        <!-- Resume Detective Wall (New) -->
        <button
          class="group relative px-4 py-2 bg-white border-2 border-stone-200 rounded-sm text-xs font-bold text-stone-600 hover:border-red-300 hover:text-red-900 transition-all shadow-sm hover:rotate-1"
          title="查看简历族谱"
        >
          <div class="flex items-center gap-2">
            <span class="text-lg">🕵️</span>
            <span class="hidden sm:inline">简历侦探墙</span>
          </div>
          <!-- Red String Decoration -->
          <svg
            class="absolute top-1/2 -right-2 w-6 h-12 text-red-800/30 pointer-events-none"
            viewBox="0 0 10 20"
          >
            <path d="M0 10 Q 5 15 10 5" fill="none" stroke="currentColor" stroke-width="1" />
          </svg>
        </button>

        <!-- 2. 视图切换 (极简) -->
        <div
          class="bg-white/50 p-1 rounded-lg border border-stone-200/50 flex gap-1 backdrop-blur-sm"
        >
          <button
            @click="$emit('update:viewMode', 'kanban')"
            class="p-2 rounded transition-all"
            :class="
              viewMode === 'kanban'
                ? 'bg-white shadow-sm text-stone-800'
                : 'text-stone-400 hover:text-stone-600'
            "
            title="看板视图"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 00-2-2h-2a2 2 0 00-2 2"
              />
            </svg>
          </button>
          <button
            @click="$emit('update:viewMode', 'calendar')"
            class="p-2 rounded transition-all"
            :class="
              viewMode === 'calendar'
                ? 'bg-white shadow-sm text-stone-800'
                : 'text-stone-400 hover:text-stone-600'
            "
            title="日历视图"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>

        <!-- Separator -->
        <div class="w-px h-8 bg-stone-300/30 mx-1"></div>

        <!-- 3. 核心操作区 -->
        <button
          @click="$emit('show-import')"
          class="px-4 py-2 bg-[#fefce8] border border-stone-200 text-stone-600 hover:bg-[#fff7ed] hover:border-orange-200 hover:text-orange-700 rounded-sm text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
        >
          <span>📝</span>
          <span class="hidden sm:inline">粘贴 JD</span>
        </button>

        <button
          @click="$emit('new-job')"
          class="px-5 py-2.5 bg-stone-800 text-[#f7f5f2] rounded-sm text-xs font-bold shadow-[3px_3px_0px_0px_rgba(28,25,23,0.2)] hover:translate-y-px hover:shadow-[2px_2px_0px_0px_rgba(28,25,23,0.2)] active:translate-y-[3px] active:shadow-none border-2 border-stone-800 transition-all flex items-center gap-2"
        >
          <span>+</span>
          新建投递
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  viewMode: 'kanban' | 'calendar'
}>()
defineEmits(['update:viewMode', 'show-analysis', 'show-import', 'new-job'])
</script>

