<template>
  <div class="h-full flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden">
    <!-- 内容控制条：两行，主次分明 -->
    <header class="shrink-0 px-6 pt-5 pb-4 border-b border-[var(--border)]/60">
      <p class="label-num text-[var(--text-secondary)] mb-4 max-w-2xl">
        写简历、JD、Cover Letter、模拟面试时可
        <strong class="text-[var(--text-primary)]">@ 引用</strong>
        ；复盘可
        <strong class="text-[var(--text-primary)]">一键加入</strong>
        ，JD 分析会推荐相关素材。
      </p>

      <!-- 第一行：主控制区 = 视图 + 搜索与新建 -->
      <div class="flex items-center justify-between gap-4 mb-3">
        <div
          class="inline-flex rounded-[12px] p-0.5 bg-[var(--bg-primary)] border border-[var(--border)]"
          role="group"
          aria-label="视图切换"
        >
          <button
            v-for="v in viewOptions"
            :key="v.id"
            type="button"
            @click="currentView = v.id"
            class="px-3 py-2 text-sm rounded-md transition-colors"
            :class="
              currentView === v.id
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            "
          >
            {{ v.name }}
          </button>
        </div>
        <div class="flex items-center gap-2">
          <div class="relative">
            <MagnifyingGlassIcon
              class="w-4 h-4 text-[var(--text-dim)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索标题、内容..."
              class="pl-9 pr-3 py-2 text-sm bg-[var(--bg-primary)] border border-[var(--border)]/70 rounded-lg w-56 placeholder:text-[var(--text-dim)] outline-none focus:border-[var(--text-secondary)] focus:ring-1 focus:ring-[var(--border)] transition-colors"
            />
          </div>
          <button
            type="button"
            class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--text-primary)] bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
            @click="openAddModal"
          >
            <PlusIcon class="w-4 h-4 text-[var(--primary)]" />
            新建素材
          </button>
        </div>
      </div>

      <!-- 第二行：Minimal Chip 筛选 + 排序 -->
      <div class="flex items-center gap-2 flex-wrap label-num">
        <!-- 点击空白关闭 -->
        <div v-if="openDropdown" class="fixed inset-0 z-40" aria-hidden="true" @click="openDropdown = null" />
        <!-- 岗位 -->
        <div class="relative" :class="openDropdown === 'role' ? 'z-50' : ''">
          <button
            type="button"
            class="knowledge-chip inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-colors"
            :class="filterRole ? 'pill' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]/50'"
            @click.stop="openDropdown = openDropdown === 'role' ? null : 'role'"
          >
            <span>{{ filterRole || '岗位' }}</span>
            <ChevronDownIcon class="w-3.5 h-3.5 opacity-70" />
          </button>
          <div
            v-show="openDropdown === 'role'"
            class="absolute left-0 top-full mt-1 py-1 min-w-[100px] rounded-[12px] border border-[var(--border)] bg-[var(--bg-primary)]"
            @click.stop
          >
            <button
              type="button"
              class="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-[var(--bg-hover)] transition-colors"
              :class="!filterRole ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'"
              @click="pickRole('')"
            >
              <span
                class="w-1.5 h-1.5 rounded-full shrink-0"
                :class="!filterRole ? 'bg-[var(--primary)]' : 'bg-transparent'"
              />
              <span>全部</span>
            </button>
            <button
              v-for="r in roleTags"
              :key="r"
              type="button"
              class="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-[var(--bg-hover)] transition-colors"
              :class="filterRole === r ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'"
              @click="pickRole(r)"
            >
              <span
                class="w-1.5 h-1.5 rounded-full shrink-0"
                :class="filterRole === r ? 'bg-[var(--primary)]' : 'bg-transparent'"
              />
              <span>{{ r }}</span>
            </button>
          </div>
        </div>
        <!-- 技术 -->
        <div class="relative" :class="openDropdown === 'tech' ? 'z-50' : ''">
          <button
            type="button"
            class="knowledge-chip inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-colors"
            :class="filterTech ? 'pill' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]/50'"
            @click.stop="openDropdown = openDropdown === 'tech' ? null : 'tech'"
          >
            <span>{{ filterTech || '技术' }}</span>
            <ChevronDownIcon class="w-3.5 h-3.5 opacity-70" />
          </button>
          <div
            v-show="openDropdown === 'tech'"
            class="absolute left-0 top-full mt-1 py-1 min-w-[100px] rounded-[12px] border border-[var(--border)] bg-[var(--bg-primary)]"
            @click.stop
          >
            <button
              type="button"
              class="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-[var(--bg-hover)] transition-colors"
              :class="!filterTech ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'"
              @click="pickTech('')"
            >
              <span
                class="w-1.5 h-1.5 rounded-full shrink-0"
                :class="!filterTech ? 'bg-[var(--primary)]' : 'bg-transparent'"
              />
              <span>全部</span>
            </button>
            <button
              v-for="t in techTags"
              :key="t"
              type="button"
              class="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-[var(--bg-hover)] transition-colors"
              :class="filterTech === t ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'"
              @click="pickTech(t)"
            >
              <span
                class="w-1.5 h-1.5 rounded-full shrink-0"
                :class="filterTech === t ? 'bg-[var(--primary)]' : 'bg-transparent'"
              />
              <span>{{ t }}</span>
            </button>
          </div>
        </div>
        <!-- 场景 -->
        <div class="relative" :class="openDropdown === 'scenario' ? 'z-50' : ''">
          <button
            type="button"
            class="knowledge-chip inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-colors"
            :class="filterScenario ? 'pill' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]/50'"
            @click.stop="openDropdown = openDropdown === 'scenario' ? null : 'scenario'"
          >
            <span>{{ filterScenario || '场景' }}</span>
            <ChevronDownIcon class="w-3.5 h-3.5 opacity-70" />
          </button>
          <div
            v-show="openDropdown === 'scenario'"
            class="absolute left-0 top-full mt-1 py-1 min-w-[100px] rounded-[12px] border border-[var(--border)] bg-[var(--bg-primary)]"
            @click.stop
          >
            <button
              type="button"
              class="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-[var(--bg-hover)] transition-colors"
              :class="!filterScenario ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'"
              @click="pickScenario('')"
            >
              <span
                class="w-1.5 h-1.5 rounded-full shrink-0"
                :class="!filterScenario ? 'bg-[var(--primary)]' : 'bg-transparent'"
              />
              <span>全部</span>
            </button>
            <button
              v-for="s in scenarioTags"
              :key="s"
              type="button"
              class="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-[var(--bg-hover)] transition-colors"
              :class="filterScenario === s ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'"
              @click="pickScenario(s)"
            >
              <span
                class="w-1.5 h-1.5 rounded-full shrink-0"
                :class="filterScenario === s ? 'bg-[var(--primary)]' : 'bg-transparent'"
              />
              <span>{{ s }}</span>
            </button>
          </div>
        </div>
        <!-- 难度 -->
        <div class="relative" :class="openDropdown === 'difficulty' ? 'z-50' : ''">
          <button
            type="button"
            class="knowledge-chip inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-colors"
            :class="filterDifficulty ? 'pill' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]/50'"
            @click.stop="openDropdown = openDropdown === 'difficulty' ? null : 'difficulty'"
          >
            <span>{{ filterDifficulty || '难度' }}</span>
            <ChevronDownIcon class="w-3.5 h-3.5 opacity-70" />
          </button>
          <div
            v-show="openDropdown === 'difficulty'"
            class="absolute left-0 top-full mt-1 py-1 min-w-[80px] rounded-[12px] border border-[var(--border)] bg-[var(--bg-primary)]"
            @click.stop
          >
            <button
              type="button"
              class="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-[var(--bg-hover)] transition-colors"
              :class="!filterDifficulty ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'"
              @click="pickDifficulty('')"
            >
              <span
                class="w-1.5 h-1.5 rounded-full shrink-0"
                :class="!filterDifficulty ? 'bg-[var(--primary)]' : 'bg-transparent'"
              />
              <span>全部</span>
            </button>
            <button
              v-for="d in ['初', '中', '高']"
              :key="d"
              type="button"
              class="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-[var(--bg-hover)] transition-colors"
              :class="filterDifficulty === d ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'"
              @click="pickDifficulty(d)"
            >
              <span
                class="w-1.5 h-1.5 rounded-full shrink-0"
                :class="filterDifficulty === d ? 'bg-[var(--primary)]' : 'bg-transparent'"
              />
              <span>{{ d }}</span>
            </button>
          </div>
        </div>
        <span class="text-[var(--border)] px-0.5">·</span>
        <span class="text-[var(--text-dim)]">排序</span>
        <!-- 排序 -->
        <div class="relative" :class="openDropdown === 'sort' ? 'z-50' : ''">
          <button
            type="button"
            class="knowledge-chip inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-colors text-[var(--text-primary)] hover:bg-[var(--bg-hover)]/50"
            @click.stop="openDropdown = openDropdown === 'sort' ? null : 'sort'"
          >
            <span>{{ sortOptions.find((o) => o.value === sortBy)?.label ?? '使用频率' }}</span>
            <ChevronDownIcon class="w-3.5 h-3.5 opacity-70" />
          </button>
          <div
            v-show="openDropdown === 'sort'"
            class="absolute left-0 top-full mt-1 py-1 min-w-[100px] rounded-[12px] border border-[var(--border)] bg-[var(--bg-primary)]"
            @click.stop
          >
            <button
              v-for="opt in sortOptions"
              :key="opt.value"
              type="button"
              class="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-[var(--bg-hover)] transition-colors"
              :class="sortBy === opt.value ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'"
              @click="pickSort(opt.value)"
            >
              <span
                class="w-1.5 h-1.5 rounded-full shrink-0"
                :class="sortBy === opt.value ? 'bg-[var(--primary)]' : 'bg-transparent'"
              />
              <span>{{ opt.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- 主内容：表格视图 -->
    <main class="flex-1 min-h-0 overflow-auto">
      <div class="px-6 py-4">
        <div class="border border-[var(--border)] rounded-lg overflow-hidden bg-[var(--bg-primary)]">
          <!-- 表头 -->
          <div
            class="grid gap-x-2 gap-y-0 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--bg-secondary)] label-num font-medium text-[var(--text-secondary)] uppercase tracking-wider"
            style="
              grid-template-columns:
                minmax(140px, 1fr) minmax(80px, 80px) minmax(100px, 100px) minmax(80px, 80px)
                56px 56px 56px 130px 110px;
            "
          >
            <div class="min-w-0 overflow-hidden">标题</div>
            <div class="min-w-0 overflow-hidden">岗位</div>
            <div class="min-w-0 overflow-hidden">技术</div>
            <div class="min-w-0 overflow-hidden">场景</div>
            <div class="min-w-0 overflow-hidden">难度</div>
            <div class="min-w-0 overflow-hidden">使用</div>
            <div class="min-w-0 overflow-hidden">通过</div>
            <div class="min-w-0 overflow-hidden">成功率</div>
            <div class="min-w-0 overflow-hidden">操作</div>
          </div>

          <div
            v-for="m in sortedMaterials"
            :key="m.id"
            class="grid gap-x-2 gap-y-0 px-4 py-2.5 border-b border-[var(--border)] last:border-0 items-center text-sm hover:bg-[var(--bg-hover)] transition-colors group"
            style="
              grid-template-columns:
                minmax(140px, 1fr) minmax(80px, 80px) minmax(100px, 100px) minmax(80px, 80px)
                56px 56px 56px 130px 110px;
            "
          >
            <div class="min-w-0 overflow-hidden flex flex-col justify-center gap-1.5 py-1">
              <button
                type="button"
                class="text-left font-medium text-[var(--text-primary)] truncate block w-full hover:text-[var(--text-blue)] leading-snug min-h-[1.25rem]"
                @click="openDetail(m)"
              >
                {{ m.title }}
              </button>
              <div class="label-num text-[var(--text-dim)] truncate leading-normal min-h-[1rem]">{{ m.category }}</div>
            </div>
            <div class="min-w-0 overflow-hidden text-[var(--text-secondary)] label-num">
              <div class="truncate" :title="(m.tags?.role ?? []).slice(0, 2).join(' ') || '—'">
                <span v-for="r in (m.tags?.role ?? []).slice(0, 2)" :key="r" class="mr-0.5">{{ r }}</span>
                <span v-if="!m.tags?.role?.length">—</span>
              </div>
            </div>
            <div class="min-w-0 overflow-hidden text-[var(--text-secondary)] label-num">
              <div class="truncate" :title="(m.tags?.tech ?? []).slice(0, 2).join(' ') || '—'">
                <span v-for="t in (m.tags?.tech ?? []).slice(0, 2)" :key="t" class="mr-0.5">{{ t }}</span>
                <span v-if="!m.tags?.tech?.length">—</span>
              </div>
            </div>
            <div class="min-w-0 overflow-hidden text-[var(--text-secondary)] label-num">
              <div class="truncate" :title="(m.tags?.scenario ?? []).slice(0, 2).join(' ') || '—'">
                <span v-for="s in (m.tags?.scenario ?? []).slice(0, 2)" :key="s" class="mr-0.5">{{ s }}</span>
                <span v-if="!m.tags?.scenario?.length">—</span>
              </div>
            </div>
            <div class="min-w-0 overflow-hidden">
              <span
                v-if="m.tags?.difficulty"
                class="px-1.5 py-0.5 rounded label-num border"
                :class="difficultyClass(m.tags.difficulty)"
              >
                {{ m.tags.difficulty }}
              </span>
              <span v-else class="text-[var(--text-dim)]">—</span>
            </div>
            <div class="min-w-0 overflow-hidden flex items-center gap-1.5">
              <span class="num-secondary text-[var(--text-primary)]">{{ m.useCount ?? 0 }}</span>
              <span v-if="(m.useCount ?? 0) >= 5" class="pill label-num">常用</span>
            </div>
            <div class="min-w-0 overflow-hidden">
              <span class="num-secondary text-[var(--text-primary)]">{{ m.passCount ?? 0 }}</span>
            </div>
            <div class="min-w-0 overflow-hidden flex items-center gap-2 flex-nowrap">
              <div class="w-12 h-1.5 bg-[var(--border)] rounded-full overflow-hidden shrink-0">
                <div
                  class="h-full rounded-full transition-all"
                  :class="successRate(m) >= 60 ? 'bg-[var(--text-success)]' : 'bg-[var(--border)]'"
                  :style="{ width: successRate(m) + '%' }"
                />
              </div>
              <span
                class="num-secondary shrink-0 tabular-nums"
                :class="successRate(m) >= 60 ? 'text-[var(--text-success)]' : 'text-[var(--text-secondary)]'"
              >
                {{ successRate(m) }}%
              </span>
              <span
                v-if="(m.useCount ?? 0) > 0"
                class="shrink-0 ml-2 px-1.5 py-0.5 rounded label-num border whitespace-nowrap"
                :class="successRateLabelClass(m)"
              >
                {{ successRateLabel(m) }}
              </span>
            </div>
            <div class="min-w-0 overflow-hidden flex items-center gap-1">
              <button
                type="button"
                class="p-1.5 rounded hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors shrink-0"
                title="复制引用（@素材）"
                @click="copyRef(m)"
              >
                <LinkIcon class="w-4 h-4" />
              </button>
              <button
                type="button"
                class="p-1.5 rounded hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] transition-colors"
                title="查看版本"
                @click="openDetail(m)"
              >
                <QueueListIcon class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div v-if="sortedMaterials.length === 0" class="px-4 py-12 text-center text-[var(--text-secondary)] text-sm">
            暂无素材，或筛选无结果。点击「新建素材」或从面试复盘一键加入。
          </div>
        </div>
      </div>
    </main>

    <!-- 素材质量诊断面板（决策支持） -->
    <Teleport to="body">
      <div
        v-if="detailMaterial"
        class="fixed inset-0 z-50 flex justify-end bg-black/20"
        @click.self="detailMaterial = null"
      >
        <MaterialDetailPanel :material="detailMaterial" @close="detailMaterial = null" />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMaterials, type Material } from '../composables/useMaterials'
import { MagnifyingGlassIcon, PlusIcon, LinkIcon, QueueListIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import MaterialDetailPanel from './_components/MaterialDetailPanel.vue'

const { materials, successRate, addMaterial } = useMaterials()

const currentView = ref('table')
const viewOptions = [
  { id: 'table', name: '表格' },
  { id: 'card', name: '卡片' }
]

const searchQuery = ref('')
const filterRole = ref('')
const filterTech = ref('')
const filterScenario = ref('')
const filterDifficulty = ref('')
const sortBy = ref<'useCount' | 'successRate' | 'lastUsedAt'>('useCount')
const openDropdown = ref<'role' | 'tech' | 'scenario' | 'difficulty' | 'sort' | null>(null)

const sortOptions: { value: 'useCount' | 'successRate' | 'lastUsedAt'; label: string }[] = [
  { value: 'useCount', label: '使用频率' },
  { value: 'successRate', label: '成功率' },
  { value: 'lastUsedAt', label: '最近使用' }
]

const detailMaterial = ref<Material | null>(null)

const roleTags = computed(() => {
  const set = new Set<string>()
  materials.value.forEach((m) => m.tags?.role?.forEach((r) => set.add(r)))
  return Array.from(set).sort()
})
const techTags = computed(() => {
  const set = new Set<string>()
  materials.value.forEach((m) => m.tags?.tech?.forEach((t) => set.add(t)))
  return Array.from(set).sort()
})
const scenarioTags = computed(() => {
  const set = new Set<string>()
  materials.value.forEach((m) => m.tags?.scenario?.forEach((s) => set.add(s)))
  return Array.from(set).sort()
})

const filteredMaterials = computed(() => {
  let list = materials.value
  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter(
      (m) =>
        m.title.toLowerCase().includes(q) || m.content.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)
    )
  }
  if (filterRole.value) list = list.filter((m) => m.tags?.role?.includes(filterRole.value))
  if (filterTech.value) list = list.filter((m) => m.tags?.tech?.includes(filterTech.value))
  if (filterScenario.value) list = list.filter((m) => m.tags?.scenario?.includes(filterScenario.value))
  if (filterDifficulty.value) list = list.filter((m) => m.tags?.difficulty === filterDifficulty.value)
  return list
})

const sortedMaterials = computed(() => {
  const list = [...filteredMaterials.value]
  if (sortBy.value === 'useCount') {
    list.sort((a, b) => (b.useCount ?? 0) - (a.useCount ?? 0))
  } else if (sortBy.value === 'successRate') {
    list.sort((a, b) => successRate(b) - successRate(a))
  } else {
    list.sort((a, b) => (b.lastUsedAt ?? '').localeCompare(a.lastUsedAt ?? ''))
  }
  return list
})

function difficultyClass(d: string) {
  return 'pill'
}

function successRateLabel(m: Material): string {
  const r = successRate(m)
  if (r >= 60) return '高'
  if (r >= 40) return '中'
  return '低'
}

function successRateLabelClass(m: Material): string {
  const r = successRate(m)
  if (r >= 60) return '!text-[var(--text-success)] !bg-[var(--bg-green)]'
  return 'pill'
}

function pickRole(v: string) {
  filterRole.value = v
  openDropdown.value = null
}
function pickTech(v: string) {
  filterTech.value = v
  openDropdown.value = null
}
function pickScenario(v: string) {
  filterScenario.value = v
  openDropdown.value = null
}
function pickDifficulty(v: string) {
  filterDifficulty.value = v
  openDropdown.value = null
}
function pickSort(v: 'useCount' | 'successRate' | 'lastUsedAt') {
  sortBy.value = v
  openDropdown.value = null
}

function openDetail(m: Material) {
  detailMaterial.value = m
}

function copyRef(m: Material) {
  const text = `@${m.title}`
  navigator.clipboard?.writeText(text).then(() => {
    // 可配合 toast 提示「已复制，在写简历/聊天中输入 @ 可引用」
  })
}

function openAddModal() {
  // TODO: 打开新建素材弹窗，支持填标题、内容、标签（岗位/技术/场景/难度）
  addMaterial({
    id: `mat-${Date.now()}`,
    title: '新素材',
    category: '未分类',
    content: '',
    tags: {},
    versions: [{ id: 'v1', label: '原回答', content: '', updatedAt: new Date().toISOString().slice(0, 10) }]
  })
}
</script>
