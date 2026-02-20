<template>
  <div class="workspace-header-wrap">
    <button
      type="button"
      class="group workspace-header w-full flex items-start gap-2.5 px-3 py-3 text-left border-b border-[var(--border)] bg-[var(--bg-primary)] cursor-pointer select-none"
      :class="{ 'workspace-header-expanded': expanded }"
      @click="onClick"
    >
      <div
        class="logo-wrap shrink-0 flex items-center justify-center p-1.5 rounded-lg border border-[var(--border-light)] w-8 h-8 mt-0.5"
      >
        <img :src="logo" alt="" class="w-[17px] h-[17px] object-contain" />
      </div>
      <div class="min-w-0 flex-1">
        <div class="text-[18px] font-semibold text-[var(--text-primary)] leading-tight">SmartCV</div>
        <div class="text-[12px] text-[var(--text-secondary)] leading-tight mt-0.5">求职空间</div>
        <div class="text-[11px] text-[var(--text-secondary)] leading-tight mt-1 flex items-center gap-1.5 flex-wrap">
          <span>进行中 · 2 场面试 · 匹配度</span>
          <router-link to="/dashboard/analysis" class="workspace-pill" @click.stop> 78% </router-link>
        </div>
      </div>
      <ChevronDownIcon class="workspace-chevron shrink-0 mt-0.5" />
    </button>

    <!-- 展开内容区：max-height + opacity 150ms -->
    <div class="workspace-expand" :class="{ 'workspace-expand-visible': expanded }">
      <div class="workspace-expand-inner">
        <div class="text-[11px] text-[var(--text-secondary)] px-3 py-2">进行中的工作区</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { useThemeStore } from '../../../store/use-theme'

const theme = useThemeStore()
const logo = computed(() => (theme.theme === 'light' ? '/assets/logo-light.svg' : '/assets/logo-dark.svg'))

const expanded = ref(false)
const emit = defineEmits<{ (e: 'toggle'): void }>()

function onClick() {
  expanded.value = !expanded.value
  emit('toggle')
}
</script>

<style scoped>
.workspace-header-wrap {
  margin: 0;
}

/* 1️⃣ Hover: 整块 #F7F8FA，箭头 0.6→1，120ms */
.workspace-header {
  margin: 0;
  transition:
    background-color 120ms ease,
    transform 80ms ease-out;
}
.workspace-header:hover {
  background: #f7f8fa;
}
.workspace-header:active {
  transform: scale(0.99);
}

.workspace-chevron {
  width: 14px;
  height: 14px;
  color: var(--text-secondary);
  opacity: 0.6;
  transition:
    transform 150ms ease,
    color 120ms ease,
    opacity 120ms ease;
}
.workspace-header:hover .workspace-chevron {
  opacity: 1;
}
.workspace-header-expanded .workspace-chevron {
  transform: rotate(180deg);
}

/* 3️⃣ 展开区域：max-height + opacity 150ms */
.workspace-expand {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition:
    max-height 150ms ease,
    opacity 150ms ease;
}
.workspace-expand-visible {
  max-height: 120px;
  opacity: 1;
}
.workspace-expand-inner {
  border-bottom: 1px solid var(--border);
  background: var(--bg-primary);
}

/* 4️⃣ 78% 胶囊：hover 加深 5% + 轻阴影，点击可跳分析页 */
.workspace-pill {
  display: inline-flex;
  align-items: center;
  padding: 0 6px;
  height: 18px;
  font-size: 11px;
  font-weight: 500;
  color: var(--primary);
  background: rgba(37, 99, 235, 0.08);
  border-radius: 4px;
  text-decoration: none;
  transition:
    background-color 120ms ease,
    box-shadow 120ms ease;
}
.workspace-pill:hover {
  background: rgba(37, 99, 235, 0.13);
  box-shadow: 0 1px 2px rgba(37, 99, 235, 0.15);
}

.logo-wrap {
  background: rgba(37, 99, 235, 0.04);
  box-shadow: none;
}
@media (prefers-color-scheme: dark) {
  .workspace-header:hover {
    background: var(--bg-secondary);
  }
  .logo-wrap {
    background: rgba(96, 165, 250, 0.06);
  }
  .workspace-pill {
    background: rgba(96, 165, 250, 0.12);
    color: var(--text-primary-accent);
  }
  .workspace-pill:hover {
    background: rgba(96, 165, 250, 0.18);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
}
</style>
