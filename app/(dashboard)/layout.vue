<template>
  <div
    class="h-screen w-full bg-[var(--bg-primary)] flex overflow-hidden text-[var(--text-primary)]"
    :style="{ '--content-inset-left': isSidebarCollapsed ? '0' : '16rem' }"
  >
    <Sidebar :is-collapsed="isSidebarCollapsed" />

    <div v-if="isSidebarCollapsed" class="fixed top-4 left-4 z-50">
      <button
        type="button"
        class="min-w-[32px] min-h-[32px] p-2 hover:bg-[var(--bg-hover)] rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
        @click="toggleSidebar"
      >
        <Bars3Icon class="w-5 h-5 text-[var(--text-secondary)]" />
      </button>
    </div>

    <main class="flex-1 flex flex-col min-h-0 overflow-hidden relative bg-[var(--bg-primary)] min-w-0">
      <header
        class="top-bar h-14 flex items-center gap-3 flex-shrink-0 sticky top-0 bg-[var(--bg-primary)] z-10 transition-[padding] duration-200 group/header"
        :class="[isSidebarCollapsed ? 'pl-14 pr-6' : 'pl-6 pr-6']"
      >
        <button
          v-if="!isSidebarCollapsed"
          type="button"
          class="min-w-[32px] min-h-[32px] w-8 h-8 flex-shrink-0 flex items-center justify-center hover:bg-[var(--bg-hover)] active:scale-[0.98] rounded-md text-[var(--text-secondary)] transition-colors opacity-0 hover:opacity-100 group-hover/header:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
          title="收起侧边栏"
          @click="toggleSidebar"
        >
          <ChevronDoubleLeftIcon class="w-4 h-4" />
        </button>

        <EditablePageTitle
          v-model="displayTitle"
          v-model:icon-id="displayIconId"
          separator="/"
          class="min-w-0 flex-1"
          display-only
          @open-switcher="switcherOpen = !switcherOpen"
          @open-page-panel="openPagePanel"
        />

        <div class="ml-auto flex items-center gap-3">
          <!-- A. 保存状态：仅展示，不可点（error 时显示重试按钮） -->
          <template v-if="saveStatus === 'error'">
            <div class="save-status save-error inline-flex items-center gap-2 text-[12px] min-h-[32px] px-2 rounded-lg">
              <span class="save-dot w-1.5 h-1.5 rounded-full bg-[var(--text-red)] shrink-0" aria-hidden="true" />
              <span class="hidden lg:inline text-[var(--text-secondary)]">保存失败</span>
              <button type="button" class="text-[var(--primary)] hover:underline font-medium" @click="retrySave">
                重试
              </button>
            </div>
          </template>
          <span
            v-else
            class="save-status inline-flex items-center gap-1.5 text-[12px] text-[var(--text-secondary)] min-h-[32px] px-2 rounded-lg cursor-default"
            :title="saveStatusTooltip"
          >
            <span
              v-if="saveStatus === 'saving' && savingVisible"
              class="save-spinner w-1.5 h-1.5 shrink-0"
              aria-hidden="true"
            />
            <span
              v-else-if="saveStatus !== 'saving'"
              class="save-dot w-1.5 h-1.5 rounded-full shrink-0"
              aria-hidden="true"
              :class="saveDotClass"
            />
            <span class="hidden lg:inline">{{ displaySaveLabel }}</span>
          </span>

          <!-- B. 分享（主按钮） -->
          <div class="relative">
            <button
              type="button"
              ref="shareBtnRef"
              class="share-btn min-w-[32px] min-h-[32px] inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg hover:bg-[var(--bg-hover)] active:scale-[0.98] transition-colors text-[var(--text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
              title="分享"
              @click="toggleSharePanel"
            >
              <ShareIcon class="w-4 h-4 text-[var(--text-secondary)]" />
              <span class="hidden sm:inline">分享</span>
            </button>
            <Teleport to="body">
              <div
                v-if="shareOpen"
                ref="sharePanelRef"
                class="share-panel fixed z-[100] rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] shadow-lg py-4 px-4 min-w-[280px]"
                :style="sharePanelStyle"
                role="dialog"
                aria-label="分享此页面"
              >
                <h4 class="text-sm font-semibold text-[var(--text-primary)] mb-3">分享此页面</h4>
                <div class="mb-3">
                  <label
                    class="block text-[12px] font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-1.5"
                    >权限</label
                  >
                  <select
                    v-model="sharePermission"
                    class="w-full text-sm px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                    @change="onSharePermissionChange"
                  >
                    <option value="private">仅自己</option>
                    <option value="link">链接可查看</option>
                    <option value="members">指定成员可查看</option>
                  </select>
                </div>
                <button
                  type="button"
                  class="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
                  :class="
                    copyLinkJustDone
                      ? 'bg-[var(--text-green)]/15 text-[var(--text-green)]'
                      : 'bg-[var(--primary)] text-white hover:opacity-90'
                  "
                  @click="copyLinkFromSharePanel"
                >
                  <template v-if="copyLinkJustDone">
                    <CheckIcon class="w-4 h-4" />
                    已复制 ✓
                  </template>
                  <template v-else>
                    <LinkIcon class="w-4 h-4" />
                    复制链接
                  </template>
                </button>
                <div class="mt-3 space-y-2">
                  <label class="flex items-center gap-2 text-[13px] text-[var(--text-secondary)] cursor-pointer">
                    <input v-model="shareAllowCopy" type="checkbox" class="rounded border-[var(--border)]" />
                    允许复制内容
                  </label>
                  <label class="flex items-center gap-2 text-[13px] text-[var(--text-secondary)] cursor-pointer">
                    <input v-model="shareAllowComment" type="checkbox" class="rounded border-[var(--border)]" />
                    允许评论
                  </label>
                </div>
                <p class="mt-3 text-[11px] text-[var(--text-dim)]">链接包含页面路径与工作区信息</p>
                <!-- 权限变更 / 复制失败 toast -->
                <div v-if="shareToast" class="mt-2 text-[12px] text-[var(--primary)]">{{ shareToast }}</div>
              </div>
            </Teleport>
          </div>

          <!-- C. 更多（…） -->
          <div class="relative">
            <button
              type="button"
              ref="moreBtnRef"
              class="more-btn min-w-[32px] min-h-[32px] p-2 rounded-lg transition-colors text-[var(--text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
              :class="
                moreOpen
                  ? 'bg-[var(--bg-hover)] ring-1 ring-[var(--border)]'
                  : 'hover:bg-[var(--bg-hover)] active:scale-[0.98]'
              "
              title="更多"
              @click="moreOpen = !moreOpen"
            >
              <EllipsisHorizontalIcon class="w-5 h-5" />
            </button>
            <Teleport to="body">
              <div
                v-if="moreOpen"
                ref="morePanelRef"
                class="more-panel fixed z-[100] rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] shadow-lg py-1 min-w-[180px]"
                :style="morePanelStyle"
                role="menu"
              >
                <button
                  type="button"
                  class="more-item w-full text-left px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-hover)] flex items-center gap-2"
                  @click="onMoreRename"
                >
                  <PencilSquareIcon class="w-4 h-4 text-[var(--text-secondary)]" />
                  重命名
                </button>
                <button
                  type="button"
                  class="more-item w-full text-left px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-hover)] flex items-center gap-2"
                  @click="onMoreExport"
                >
                  <ArrowDownTrayIcon class="w-4 h-4 text-[var(--text-secondary)]" />
                  导出…
                </button>
                <button
                  type="button"
                  class="more-item w-full text-left px-4 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-hover)] flex items-center gap-2"
                  @click="onMoreRefresh"
                >
                  刷新数据
                </button>
                <div class="my-1 border-t border-[var(--border)]" />
                <button
                  type="button"
                  class="more-item more-item-danger w-full text-left px-4 py-2 text-sm text-[var(--text-red)] hover:bg-[var(--text-red)]/10 flex items-center gap-2"
                  @click="onMoreDelete"
                >
                  删除页面
                </button>
              </div>
            </Teleport>
            <!-- 删除二次确认 -->
            <Teleport to="body">
              <div
                v-if="deleteConfirmOpen"
                class="fixed z-[101] inset-0 flex items-center justify-center p-4 bg-black/20"
                @click.self="deleteConfirmOpen = false"
              >
                <div
                  class="rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] shadow-lg p-4 w-full max-w-[320px]"
                  role="dialog"
                  aria-label="确认删除"
                >
                  <p class="text-sm text-[var(--text-primary)] mb-1">确定删除此页面？</p>
                  <p class="text-[12px] text-[var(--text-secondary)] mb-4">删除后无法恢复。</p>
                  <div class="flex justify-end gap-2">
                    <button
                      type="button"
                      class="px-3 py-1.5 text-sm rounded-lg hover:bg-[var(--bg-hover)] text-[var(--text-primary)]"
                      @click="deleteConfirmOpen = false"
                    >
                      取消
                    </button>
                    <button
                      type="button"
                      class="px-3 py-1.5 text-sm rounded-lg bg-[var(--text-red)] text-white hover:opacity-90"
                      @click="confirmDeletePage"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            </Teleport>
          </div>
        </div>
      </header>

      <!-- 页面切换器 Popover -->
      <Teleport to="body">
        <div
          v-if="switcherOpen"
          ref="switcherPanelRef"
          class="switcher-panel fixed z-[100] rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] shadow-lg py-2 min-w-[260px] max-h-[320px] overflow-y-auto"
          :style="switcherPanelStyle"
          role="listbox"
        >
          <div class="px-3 pb-2 text-[11px] font-medium text-[var(--text-secondary)] uppercase tracking-wider">
            最近 / 页面
          </div>
          <button
            v-for="item in navItems"
            :key="item.path"
            type="button"
            class="switcher-item w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 rounded-lg mx-1 hover:bg-[var(--bg-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            :class="route.path.includes(item.path) ? 'text-[var(--primary)] font-medium' : 'text-[var(--text-primary)]'"
            @click="goToAndCloseSwitcher(item.path)"
          >
            {{ item.name }}
          </button>
        </div>
      </Teleport>

      <!-- 页面信息 Panel（仅非工具页：求职看板等，不重复页面名） -->
      <Teleport to="body">
        <div
          v-if="pagePanelOpen"
          ref="pagePanelRef"
          class="page-panel fixed z-[100] rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] shadow-lg p-4 w-[280px]"
          :style="pagePanelStyle"
          role="dialog"
          aria-label="快捷操作"
        >
          <p class="text-[13px] text-[var(--text-secondary)] mb-3">快捷操作与统计</p>
          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              class="text-xs px-3 py-1.5 rounded-lg bg-[var(--bg-hover)] hover:bg-[var(--border)]/30 text-[var(--text-primary)]"
              @click="pagePanelOpen = false"
            >
              新增投递
            </button>
            <button
              type="button"
              class="text-xs px-3 py-1.5 rounded-lg bg-[var(--bg-hover)] hover:bg-[var(--border)]/30 text-[var(--text-primary)]"
              @click="pagePanelOpen = false"
            >
              去复盘
            </button>
          </div>
        </div>
      </Teleport>

      <div
        class="absolute left-0 right-0 top-14 bottom-0 overflow-x-hidden"
        :class="isChatPage ? 'overflow-hidden' : 'overflow-y-auto'"
      >
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <div
              class="max-w-[900px] mx-auto w-full min-h-0 py-8"
              :class="isChatPage ? 'flex-1 flex flex-col px-12' : 'px-12'"
            >
              <component :is="Component" />
            </div>
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Sidebar from './_components/Sidebar.vue'
import EditablePageTitle from './_components/EditablePageTitle.vue'
import {
  Bars3Icon,
  ChevronDoubleLeftIcon,
  EllipsisHorizontalIcon,
  ShareIcon,
  LinkIcon,
  PencilSquareIcon,
  ArrowDownTrayIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'

type SaveStatus = 'saved' | 'saving' | 'error' | 'offline'

const route = useRoute()
const router = useRouter()
const isSidebarCollapsed = ref(false)
const isChatPage = computed(() => route.path === '/dashboard/chat' || route.path.startsWith('/dashboard/chat/'))
const customPageNames = ref<Record<string, string>>({})
const customPageIcons = ref<Record<string, string | null>>({})
const defaultIconByPath: Record<string, string> = {
  '/dashboard/job-board': 'Squares2X2',
  '/dashboard/analysis': 'ChartBar',
  '/dashboard/chat': 'Sparkles',
  '/dashboard/knowledge': 'BookOpen',
  '/resume-edit': 'DocumentText'
}

const navItems = [
  { name: '求职看板', path: '/dashboard/job-board' },
  { name: '面试复盘', path: '/dashboard/analysis' },
  { name: 'AI 助手', path: '/dashboard/chat' },
  { name: '素材库', path: '/dashboard/knowledge' },
  { name: '简历编辑', path: '/resume-edit' }
]

const currentPgaeName = computed(() => {
  const item = navItems.find((i) => route.path.includes(i.path))
  return item ? item.name : 'Untitled'
})

const currentPathKey = computed(() => route.path)

const displayIconId = computed({
  get() {
    const key = currentPathKey.value
    const custom = customPageIcons.value[key]
    if (custom !== undefined) return custom
    return defaultIconByPath[key] ?? null
  },
  set(v: string | null) {
    customPageIcons.value = { ...customPageIcons.value, [currentPathKey.value]: v }
  }
})

const displayTitle = computed({
  get() {
    const custom = customPageNames.value[currentPathKey.value]
    return (custom && custom.trim()) || currentPgaeName.value
  },
  set(v: string) {
    onTitleUpdate(v)
  }
})

function onTitleUpdate(v: string) {
  const key = currentPathKey.value
  const trimmed = v.trim()
  if (trimmed && trimmed !== currentPgaeName.value) {
    customPageNames.value = { ...customPageNames.value, [key]: trimmed }
  } else {
    const next = { ...customPageNames.value }
    delete next[key]
    customPageNames.value = next
  }
}

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

// --- 保存状态：saved / saving / error / offline ---
const saveStatus = ref<SaveStatus>('saved')
const lastSavedAt = ref<number>(Date.now())
const savingVisible = ref(false)
let savingTimer: ReturnType<typeof setTimeout> | null = null

const saveStatusLabel = computed(() => {
  const s = saveStatus.value
  if (s === 'saved') return '已保存'
  if (s === 'saving') return '正在保存…'
  if (s === 'offline') return '离线编辑中'
  return ''
})
const displaySaveLabel = computed(() => {
  if (saveStatus.value === 'saving' && !savingVisible.value) return '已保存'
  return saveStatusLabel.value
})
const saveStatusTooltip = computed(() => {
  const s = saveStatus.value
  if (s === 'saved') {
    const sec = Math.max(0, Math.floor((Date.now() - lastSavedAt.value) / 1000))
    if (sec < 5) return '已保存 · 刚刚'
    if (sec < 60) return `已保存 · ${sec} 秒前`
    return `已保存 · ${Math.floor(sec / 60)} 分钟前`
  }
  if (s === 'saving') return '正在保存'
  if (s === 'error') return '保存失败，可点击重试'
  if (s === 'offline') return '离线编辑中'
  return ''
})
const saveDotClass = computed(() => {
  const s = saveStatus.value
  if (s === 'saved') return 'bg-[var(--text-green)]'
  if (s === 'offline') return 'bg-[var(--text-dim)]'
  return 'bg-[var(--text-green)]'
})

watch(saveStatus, (s) => {
  if (s === 'saving') {
    if (savingTimer) clearTimeout(savingTimer)
    savingTimer = setTimeout(() => {
      savingVisible.value = true
    }, 800)
  } else {
    if (savingTimer) clearTimeout(savingTimer)
    savingTimer = null
    savingVisible.value = false
    if (s === 'saved') lastSavedAt.value = Date.now()
  }
})

function retrySave() {
  saveStatus.value = 'saving'
  setTimeout(() => {
    saveStatus.value = 'saved'
    lastSavedAt.value = Date.now()
  }, 800)
}

function setupOfflineListeners() {
  const setOffline = () => {
    saveStatus.value = 'offline'
  }
  const setOnline = () => {
    if (saveStatus.value === 'offline') saveStatus.value = 'saved'
  }
  window.addEventListener('offline', setOffline)
  window.addEventListener('online', setOnline)
  if (!navigator.onLine) setOffline()
  return () => {
    window.removeEventListener('offline', setOffline)
    window.removeEventListener('online', setOnline)
  }
}

// --- 分享面板 ---
const shareOpen = ref(false)
const shareBtnRef = ref<HTMLElement | null>(null)
const sharePanelRef = ref<HTMLElement | null>(null)
const sharePermission = ref<'private' | 'link' | 'members'>('private')
const sharePanelStyle = ref({ top: '0', left: '0' })
const copyLinkJustDone = ref(false)
const shareToast = ref('')
const shareAllowCopy = ref(false)
const shareAllowComment = ref(false)
let copyLinkRevertTimer: ReturnType<typeof setTimeout> | null = null

function toggleSharePanel() {
  shareOpen.value = !shareOpen.value
  if (shareOpen.value) {
    shareToast.value = ''
    positionSharePanel()
  }
}

function positionSharePanel() {
  nextTick(() => {
    const btn = shareBtnRef.value
    const panel = sharePanelRef.value
    if (btn && panel) {
      const r = btn.getBoundingClientRect()
      sharePanelStyle.value = {
        top: `${r.bottom + 6}px`,
        left: `${Math.min(r.left, window.innerWidth - 300)}px`
      }
    }
  })
}

function onSharePermissionChange() {
  if (sharePermission.value === 'link') {
    shareToast.value = '链接已启用可访问'
    setTimeout(() => {
      shareToast.value = ''
    }, 2500)
  }
}

function copyLinkFromSharePanel() {
  const url = window.location.href
  navigator.clipboard?.writeText(url).then(
    () => {
      copyLinkJustDone.value = true
      if (copyLinkRevertTimer) clearTimeout(copyLinkRevertTimer)
      copyLinkRevertTimer = setTimeout(() => {
        copyLinkJustDone.value = false
        copyLinkRevertTimer = null
      }, 2000)
    },
    () => {
      shareToast.value = '复制失败，请手动复制'
      setTimeout(() => {
        shareToast.value = ''
      }, 2500)
    }
  )
}

watch(shareOpen, (open) => {
  if (open) nextTick(positionSharePanel)
})

// --- 更多菜单 ---
const moreOpen = ref(false)
const moreBtnRef = ref<HTMLElement | null>(null)
const morePanelRef = ref<HTMLElement | null>(null)
const morePanelStyle = ref({ top: '0', left: '0' })
const deleteConfirmOpen = ref(false)

function onMoreRename() {
  moreOpen.value = false
  // 触发标题编辑：可让 EditablePageTitle 暴露 focusTitle 或由父组件发事件
  document.querySelector<HTMLButtonElement>('.breadcrumb .title-btn')?.click()
}

function onMoreExport() {
  moreOpen.value = false
  // TODO: 打开导出子菜单或弹窗（PNG/PDF/CSV）
}

function onMoreRefresh() {
  moreOpen.value = false
  // TODO: 刷新当前页数据
}

function onMoreDelete() {
  moreOpen.value = false
  deleteConfirmOpen.value = true
}

function confirmDeletePage() {
  deleteConfirmOpen.value = false
  // TODO: 调用删除页面 API / 路由到列表
}

watch(moreOpen, (open) => {
  if (open) {
    nextTick(() => {
      const btn = moreBtnRef.value
      const panel = morePanelRef.value
      if (btn && panel) {
        const r = btn.getBoundingClientRect()
        morePanelStyle.value = {
          top: `${r.bottom + 6}px`,
          left: `${Math.min(r.right - 180, r.left)}px`
        }
      }
    })
  }
})

// --- Page Switcher ---
const switcherOpen = ref(false)
const switcherPanelRef = ref<HTMLElement | null>(null)
const switcherPanelStyle = ref({ top: '0', left: '0' })

watch(switcherOpen, (open) => {
  if (open) {
    nextTick(() => {
      const header = document.querySelector('.top-bar')
      const panel = switcherPanelRef.value
      if (header && panel) {
        const r = header.getBoundingClientRect()
        switcherPanelStyle.value = {
          top: `${r.bottom + 4}px`,
          left: `${r.left + 48}px`
        }
      }
    })
  }
})

function goTo(path: string) {
  router.push(path)
}

function goToAndCloseSwitcher(path: string) {
  goTo(path)
  switcherOpen.value = false
}

// --- Page Panel（工具页 AI 助手不打开，仅工作区/项目页需要）---
const pagePanelOpen = ref(false)
const pagePanelRef = ref<HTMLElement | null>(null)
const pagePanelStyle = ref({ top: '0', left: '0' })

function openPagePanel() {
  if (!isChatPage.value) pagePanelOpen.value = true
}

watch(pagePanelOpen, (open) => {
  if (open) {
    nextTick(() => {
      const titleEl = document.querySelector('.breadcrumb .title-btn')
      const panel = pagePanelRef.value
      if (titleEl && panel) {
        const r = titleEl.getBoundingClientRect()
        pagePanelStyle.value = {
          top: `${r.bottom + 6}px`,
          left: `${r.left}px`
        }
      }
    })
  }
})

// --- Click outside & Esc ---
function handleClickOutside(e: MouseEvent) {
  const target = e.target as Node
  if (
    shareOpen.value &&
    sharePanelRef.value &&
    !sharePanelRef.value.contains(target) &&
    shareBtnRef.value &&
    !shareBtnRef.value.contains(target)
  )
    shareOpen.value = false
  if (
    moreOpen.value &&
    morePanelRef.value &&
    !morePanelRef.value.contains(target) &&
    moreBtnRef.value &&
    !moreBtnRef.value.contains(target)
  )
    moreOpen.value = false
  if (
    switcherOpen.value &&
    switcherPanelRef.value &&
    !switcherPanelRef.value.contains(target) &&
    !(target as Element).closest?.('.icon-wrap')
  )
    switcherOpen.value = false
  if (
    pagePanelOpen.value &&
    pagePanelRef.value &&
    !pagePanelRef.value.contains(target) &&
    !(target as Element).closest?.('.breadcrumb .title-btn')
  )
    pagePanelOpen.value = false
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    if (deleteConfirmOpen.value) deleteConfirmOpen.value = false
    else {
      shareOpen.value = false
      moreOpen.value = false
      switcherOpen.value = false
      pagePanelOpen.value = false
    }
    return
  }
  const mod = e.metaKey || e.ctrlKey
  if (mod && e.shiftKey && e.key === 'S') {
    e.preventDefault()
    shareOpen.value = true
    nextTick(positionSharePanel)
    return
  }
  if (mod && e.key === 's') {
    e.preventDefault()
    if (saveStatus.value === 'saved') {
      saveStatus.value = 'saving'
      setTimeout(() => {
        saveStatus.value = 'saved'
        lastSavedAt.value = Date.now()
      }, 600)
    }
    return
  }
}

let offlineCleanup: (() => void) | null = null
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
  offlineCleanup = setupOfflineListeners()
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
  offlineCleanup?.()
})
</script>

<style scoped>
.top-bar {
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
}

.save-spinner {
  border: 2px solid var(--text-secondary);
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
