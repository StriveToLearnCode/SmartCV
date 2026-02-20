<template>
  <aside
    class="sidebar flex flex-col h-full shrink-0 transition-all duration-[120ms] ease-out relative bg-[var(--bg-primary)]"
    :class="isCollapsed ? 'w-0 min-w-0 opacity-0 overflow-hidden pointer-events-none' : 'w-[260px]'"
  >
    <WorkspaceSwitcher @toggle="onWorkspaceToggle" />

    <div ref="sidebarScrollRef" class="flex-1 overflow-y-auto sidebar-scroll" @keydown="onNavKeydown">
      <!-- 快捷 -->
      <div class="sidebar-group">
        <div class="sidebar-group-title">QUICK</div>
        <div class="sidebar-group-inner">
          <button type="button" class="sidebar-search-trigger" @click="openCommandPalette">
            <MagnifyingGlassIcon class="sidebar-icon" />
            <span class="flex-1 text-left">搜索</span>
            <span class="sidebar-search-kbd">⌘K</span>
          </button>
          <div class="sidebar-item">
            <ClockIcon class="sidebar-icon" />
            <span>最近访问</span>
          </div>
        </div>
      </div>

      <!-- 工作区 -->
      <div class="sidebar-group">
        <div class="sidebar-group-title">WORKSPACE</div>
        <div class="sidebar-group-inner">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="sidebar-item sidebar-item-link"
            :class="{ 'sidebar-item-active': isActive(item.path) }"
            tabindex="0"
          >
            <component :is="item.icon" class="sidebar-icon" />
            <span class="flex-1 truncate">{{ item.name }}</span>
          </router-link>
        </div>
      </div>

      <!-- 简历 -->
      <div class="sidebar-group">
        <div class="sidebar-group-title">RESUME</div>
        <div class="sidebar-group-inner">
          <router-link
            to="/resume-edit/1"
            class="sidebar-item sidebar-item-link sidebar-resume-item"
            :class="{ 'sidebar-item-active': isResumeActive }"
            tabindex="0"
          >
            <DocumentTextIcon class="sidebar-icon" />
            <span class="flex-1 truncate">前端开发工程师 · 2026</span>
            <EllipsisHorizontalIcon class="sidebar-resume-more" />
          </router-link>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="sidebar-footer">
      <div class="sidebar-footer-item" @click="() => {}">
        <PlusIcon class="sidebar-footer-icon" />
        <span>新建页面</span>
      </div>
      <div class="sidebar-footer-item" @click="handleLogout">
        <ArrowRightOnRectangleIcon class="sidebar-footer-icon" />
        <span>退出登录</span>
      </div>
    </div>

    <div
      class="absolute right-0 top-0 bottom-0 w-1 hover:bg-[var(--border)] cursor-col-resize transition-colors opacity-0 hover:opacity-100"
    ></div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  MagnifyingGlassIcon,
  ClockIcon,
  ViewColumnsIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  DocumentTextIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon,
  EllipsisHorizontalIcon
} from '@heroicons/vue/24/outline'
import type { Component } from 'vue'
import WorkspaceSwitcher from './WorkspaceSwitcher.vue'

const props = defineProps<{
  isCollapsed?: boolean
}>()

const route = useRoute()
const router = useRouter()

const navItems: { name: string; path: string; icon: Component }[] = [
  { name: '求职看板', path: '/dashboard/job-board', icon: ViewColumnsIcon },
  { name: '面试复盘', path: '/dashboard/analysis', icon: ChartBarIcon },
  { name: 'AI 助手', path: '/dashboard/chat', icon: ChatBubbleLeftRightIcon },
  { name: '素材库', path: '/dashboard/knowledge', icon: BookOpenIcon }
]

const isActive = (path: string) => route.path.includes(path)
const isResumeActive = computed(() => route.path.startsWith('/resume-edit'))

const handleLogout = () => router.push('/login')

const sidebarScrollRef = ref<HTMLElement | null>(null)

function getFocusables(): HTMLElement[] {
  const el = sidebarScrollRef.value
  if (!el) return []
  const nodes = el.querySelectorAll<HTMLElement>('button.sidebar-search-trigger, a.sidebar-item-link')
  return Array.from(nodes)
}

function onNavKeydown(e: KeyboardEvent) {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
  const focusables = getFocusables()
  const current = document.activeElement as HTMLElement
  const idx = focusables.indexOf(current)
  if (idx === -1) return
  const next = focusables[idx + 1]
  const prev = focusables[idx - 1]
  if (e.key === 'ArrowDown' && next) {
    e.preventDefault()
    next.focus()
  } else if (e.key === 'ArrowUp' && prev) {
    e.preventDefault()
    prev.focus()
  }
}

function onWorkspaceToggle() {
  // 展开工作区列表（Linear 风格）
}

function openCommandPalette() {
  window.dispatchEvent(new CustomEvent('open-command-palette'))
}
</script>

<style scoped>
.sidebar {
  border-right: 1px solid var(--border);
}

.sidebar-scroll {
  padding: 8px 0;
}

/* 分组：标题 12px，组间距 24px */
.sidebar-group {
  margin-bottom: 24px;
}
.sidebar-group:last-child {
  margin-bottom: 0;
}

/* 四、分组标题：hover 可选 opacity 0.6，不可点击 */
.sidebar-group-title {
  font-size: 11px;
  font-weight: 500;
  color: var(--text-secondary);
  padding: 0 12px 8px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: opacity 120ms ease;
}
.sidebar-group-title:hover {
  opacity: 0.6;
}

.sidebar-group-inner {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* 二、搜索：hover 边框 #D1D5DB、bg #FAFAFA；focus 品牌色 + 2px ring */
.sidebar-search-trigger {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 12px;
  margin: 0 8px;
  gap: 10px;
  font-size: 14px;
  color: var(--text-secondary);
  background: var(--bg-primary);
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition:
    border-color 120ms ease,
    background-color 120ms ease,
    color 120ms ease;
  text-decoration: none;
  outline: none;
}
.sidebar-search-trigger:hover {
  background: #fafafa;
  border-color: #d1d5db;
  color: var(--text-primary);
}
.sidebar-search-trigger:focus-visible {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}
.sidebar-search-trigger:hover .sidebar-icon {
  color: var(--text-primary);
}
.sidebar-search-kbd {
  font-size: 11px;
  color: var(--text-dim);
}

/* 三、菜单项：默认 #374151 / #6B7280；hover 4% 蓝 + 蓝条 0.4；激活 6% + 蓝条滑入；点击 scale 0.99；键盘 focus 1px outline */
.sidebar-item {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 12px;
  gap: 10px;
  font-size: 14px;
  color: #374151;
  transition:
    background-color 100ms ease,
    color 100ms ease,
    transform 80ms ease-out;
  border-radius: 0;
  text-decoration: none;
  outline: none;
}
.sidebar-item:focus-visible {
  outline: 1px solid var(--primary);
  outline-offset: 1px;
}

.sidebar-item-link {
  margin: 0 8px;
  padding-left: 14px;
  border-radius: 6px;
  position: relative;
}
.sidebar-item-link::after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 16px;
  background: var(--primary);
  border-radius: 1px;
  opacity: 0;
  transition: opacity 100ms ease;
}
.sidebar-item-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 2px;
  height: 16px;
  background: var(--primary);
  border-radius: 1px;
  transform: translate(-4px, -50%);
  opacity: 0;
  transition:
    transform 100ms ease,
    opacity 100ms ease;
}
.sidebar-item-link:not(.sidebar-item-active):hover {
  color: var(--text-primary);
  background: rgba(37, 99, 235, 0.04);
}
.sidebar-item-link:not(.sidebar-item-active):hover::after {
  opacity: 0.4;
}
.sidebar-item-link:active {
  transform: scale(0.99);
  background: rgba(37, 99, 235, 0.07);
}

/* 激活态：6% 蓝底、2px 蓝条滑入 -4px→0、semibold、icon 品牌色 */
.sidebar-item-active {
  color: var(--text-primary) !important;
  font-weight: 600;
  background: rgba(37, 99, 235, 0.06) !important;
  padding-left: 14px;
  margin-left: 8px;
}
.sidebar-item-active::before {
  transform: translateY(-50%);
  opacity: 1;
}
.sidebar-item-active .sidebar-icon {
  color: var(--primary);
}

.sidebar-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: #6b7280;
  transition: color 120ms ease;
}
.sidebar-item-link:not(.sidebar-item-active):hover .sidebar-icon {
  color: #4b5563;
}
.sidebar-item-active .sidebar-icon {
  color: var(--primary);
}

/* 五、简历项：hover 极浅灰、右侧 ··· fade in 120ms */
.sidebar-resume-item .sidebar-resume-more {
  width: 18px;
  height: 18px;
  opacity: 0;
  transition: opacity 120ms ease;
  color: var(--text-secondary);
}
.sidebar-resume-item:hover .sidebar-resume-more {
  opacity: 1;
}
.sidebar-resume-item:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

/* 六、底部：hover 仅文字变深 + icon 0.7→1，无背景 */
.sidebar-footer {
  border-top: 1px solid var(--border);
  padding: 8px 0;
}

.sidebar-footer-item {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 36px;
  padding: 0 12px;
  margin: 0 8px;
  font-size: 13px;
  color: #9ca3af;
  cursor: pointer;
  transition: color 120ms ease;
  border-radius: 6px;
  background: transparent;
}

.sidebar-footer-item:hover {
  color: var(--text-secondary);
}

.sidebar-footer-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: #9ca3af;
  opacity: 0.7;
  transition:
    opacity 120ms ease,
    color 120ms ease;
}
.sidebar-footer-item:hover .sidebar-footer-icon {
  opacity: 1;
  color: var(--text-secondary);
}

/* 滚动条 */
.sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}
.sidebar-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 4px;
}
.sidebar:hover .sidebar-scroll::-webkit-scrollbar-thumb {
  background: var(--bg-hover);
}
</style>
