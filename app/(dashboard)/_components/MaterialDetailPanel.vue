<template>
  <div
    class="w-full max-w-lg h-full bg-[var(--bg-primary)] border-l border-[var(--border)] overflow-y-auto flex flex-col"
    @click.stop
  >
    <!-- 顶部：标题 + 关闭 + 一行数据 -->
    <div class="shrink-0 p-6 pb-4">
      <div class="flex items-start justify-between gap-3 mb-3">
        <h2 class="text-lg font-semibold text-[var(--text-primary)] truncate min-w-0">{{ material.title }}</h2>
        <button
          type="button"
          class="p-2 rounded hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] shrink-0"
          aria-label="关闭"
          @click="$emit('close')"
        >
          <XMarkIcon class="w-5 h-5" />
        </button>
      </div>
      <p class="text-sm text-[var(--text-secondary)]">
        成功率 <span :class="rate >= 60 ? 'text-[var(--text-success)] font-medium' : ''">{{ rate }}%</span>
        <span
          v-if="trend !== 0"
          class="font-medium"
          :class="trend >= 0 ? 'text-[var(--text-success)]' : 'text-[var(--text-red)]'"
        >
          {{ trend >= 0 ? '↑' : '↓' }}{{ trend >= 0 ? trend : -trend }}%
        </span>
        <span class="text-[var(--text-dim)]">
          · 使用 {{ material.useCount ?? 0 }} 次 · 通过 {{ material.passCount ?? 0 }} 次</span
        >
        <span v-if="comparisonText" class="text-[var(--text-dim)]"> · {{ comparisonText }}</span>
      </p>
    </div>

    <div class="flex-1 px-6 pb-6 space-y-5">
      <!-- 能力维度：细条 + 数字，无大卡片 -->
      <section v-if="abilityList.length" class="space-y-2">
        <h3 class="label-num font-semibold text-[var(--text-secondary)] uppercase tracking-wider">能力维度</h3>
        <div class="space-y-2.5">
          <div v-for="item in abilityList" :key="item.name" class="flex items-center gap-3">
            <span class="label-num text-[var(--text-secondary)] w-24 shrink-0">{{ item.name }}</span>
            <div class="score-bar flex-1 min-w-0">
              <div class="score-bar-fill transition-all" :style="{ width: item.score * 10 + '%' }" />
            </div>
            <span class="num-secondary text-[var(--text-primary)] w-5 text-right tabular-nums">{{ item.score }}</span>
          </div>
        </div>
      </section>

      <!-- 版本演进：时间轴 ○ / ●，无大卡片 -->
      <section v-if="(material.versions ?? []).length" class="space-y-1">
        <h3 class="label-num font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">版本演进</h3>
        <div class="relative pl-5 border-l-2 border-[var(--border)] space-y-0">
          <div
            v-for="(ver, index) in material.versions ?? []"
            :key="ver.id"
            class="relative flex items-center gap-2 py-2 pl-3 -ml-[21px]"
          >
            <span
              class="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 shrink-0"
              :class="
                isRecommended(ver)
                  ? 'bg-[var(--primary)] border-[var(--primary)]'
                  : 'bg-[var(--bg-primary)] border-[var(--border)]'
              "
              aria-hidden="true"
            />
            <span
              class="label-num text-[var(--text-secondary)]"
              :class="isRecommended(ver) ? 'font-medium text-[var(--primary)]' : ''"
            >
              {{ isRecommended(ver) ? '当前推荐' : ver.label || `版本 ${index + 1}` }}
            </span>
          </div>
        </div>
        <!-- 当前推荐版本内容：单一块，非卡片 -->
        <div v-if="recommendedVersion" class="mt-3 pt-3 border-t border-[var(--border)]">
          <p class="text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
            {{ recommendedVersion.content }}
          </p>
        </div>
      </section>

      <!-- ④ 优化建议 -->
      <section v-if="suggestions.length" class="card rounded-[12px] p-4">
        <h3 class="label-num font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">建议提升点</h3>
        <ul class="space-y-1.5">
          <li
            v-for="(s, i) in suggestions"
            :key="i"
            class="label-num-sm text-[var(--text-primary)] flex items-start gap-2"
          >
            <span class="text-[var(--text-dim)] shrink-0">·</span>
            <span>{{ s }}</span>
          </li>
        </ul>
      </section>

      <!-- ⑤ 标签（紧凑） -->
      <section>
        <div class="flex items-center justify-between gap-2 mb-2">
          <h3 class="label-num font-semibold text-[var(--text-secondary)] uppercase tracking-wider">标签</h3>
          <button
            v-if="allTags.length > 6"
            type="button"
            class="label-num text-[var(--text-blue)] hover:underline"
            @click="showAllTags = !showAllTags"
          >
            {{ showAllTags ? '收起' : '更多' }}
          </button>
        </div>
        <div class="flex flex-wrap gap-1.5 label-num">
          <template v-for="t in displayTags" :key="t.key">
            <span v-if="t.role" class="pill">{{ t.role }}</span>
            <span v-else-if="t.tech" class="pill">{{ t.tech }}</span>
            <span v-else-if="t.scenario" class="pill">{{ t.scenario }}</span>
            <span v-else-if="t.difficulty" class="pill">{{ t.difficulty }}</span>
          </template>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMaterials, type Material } from '../../composables/useMaterials'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{ material: Material }>()
defineEmits<{ (e: 'close'): void }>()

const { materials, successRate } = useMaterials()
const showAllTags = ref(false)

const rate = computed(() => successRate(props.material))

/** 趋势：优先用素材上的 successRateChange，否则用 0 */
const trend = computed(() => props.material.successRateChange ?? 0)

/** 对比文案：高于/低于平均素材 X% */
const comparisonText = computed(() => {
  const r = rate.value
  const list = materials.value.filter((m) => (m.useCount ?? 0) > 0)
  if (list.length === 0) return ''
  const avg = Math.round(list.reduce((sum, m) => sum + successRate(m), 0) / list.length)
  const diff = r - avg
  if (diff > 0) return `高于平均素材 ${diff}%`
  if (diff < 0) return `低于平均素材 ${-diff}%`
  return '与平均素材持平'
})

/** 能力维度列表 */
const abilityList = computed(() => {
  const dims = props.material.abilityDims
  if (!dims || !Object.keys(dims).length) return []
  return Object.entries(dims).map(([name, score]) => ({ name, score }))
})

/** 推荐版本 id（最后一版或素材指定的 recommendedVersionId） */
const recommendedId = computed(() => {
  const vs = props.material.versions ?? []
  return props.material.recommendedVersionId ?? vs[vs.length - 1]?.id ?? ''
})

function isRecommended(ver: { id: string }) {
  return ver.id === recommendedId.value
}

/** 当前推荐版本对象（用于展示内容） */
const recommendedVersion = computed(() => {
  const vs = props.material.versions ?? []
  return vs.find((v) => v.id === recommendedId.value) ?? null
})

/** 优化建议 */
const suggestions = computed(() => props.material.optimizationSuggestions ?? [])

/** 所有标签（用于折叠） */
const allTags = computed(() => {
  const t = props.material.tags
  const list: { key: string; role?: string; tech?: string; scenario?: string; difficulty?: string }[] = []
  ;(t?.role ?? []).forEach((r) => list.push({ key: 'r-' + r, role: r }))
  ;(t?.tech ?? []).forEach((r) => list.push({ key: 't-' + r, tech: r }))
  ;(t?.scenario ?? []).forEach((r) => list.push({ key: 's-' + r, scenario: r }))
  if (t?.difficulty) list.push({ key: 'd', difficulty: t.difficulty })
  return list
})

const displayTags = computed(() => (showAllTags.value ? allTags.value : allTags.value.slice(0, 6)))
</script>
