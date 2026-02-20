<template>
  <div class="breadcrumb flex items-center gap-2 min-w-0 flex-1">
    <!-- 图标按钮：点击打开页面切换器，hover tooltip -->
    <button
      v-if="iconComponent"
      type="button"
      class="icon-wrap min-w-[32px] min-h-[32px] w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] active:scale-[0.98] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
      :title="iconTooltip"
      @click="$emit('openSwitcher')"
      @keydown.enter="$emit('openSwitcher')"
    >
      <component :is="iconComponent" class="w-4 h-4" />
    </button>
    <span
      v-if="showSeparator !== false && separator"
      class="separator text-[10px] text-[var(--text-secondary)] opacity-70 flex-shrink-0 select-none font-medium"
    >
      {{ separator }}
    </span>
    <!-- 路线 B：标题仅展示，点击打开页面信息 -->
    <template v-if="displayOnly">
      <button
        type="button"
        class="title-btn text-left flex-1 min-w-0 truncate text-[15px] font-medium text-[var(--text-primary)] py-1.5 px-2 -ml-1 rounded hover:bg-[var(--bg-hover)] transition-colors cursor-pointer min-h-[32px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
        @click="$emit('openPagePanel')"
      >
        {{ modelValue || 'Untitled' }}
      </button>
    </template>
    <!-- 路线 A：可编辑标题 -->
    <template v-else>
      <template v-if="isEditing">
        <input
          ref="inputRef"
          :value="modelValue"
          type="text"
          class="title-input flex-1 min-w-0 bg-transparent border-none outline-none text-[15px] text-[var(--text-primary)] font-medium py-0.5 px-0.5 -ml-0.5 rounded focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 min-h-[32px]"
          @blur="commitEdit"
          @keydown.enter="commitEdit"
          @keydown.esc="cancelEdit"
        />
      </template>
      <button
        v-else
        type="button"
        class="title-btn text-left flex-1 min-w-0 truncate text-[15px] font-medium text-[var(--text-primary)] py-1.5 px-2 -ml-1 rounded hover:bg-[var(--bg-hover)] transition-colors min-h-[32px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]"
        @click="startEdit"
      >
        {{ modelValue || 'Untitled' }}
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { getPageTitleIconById } from '../../composables/pageTitleIcons'

const props = withDefaults(
  defineProps<{
    modelValue: string
    iconId?: string | null
    separator?: string
    showSeparator?: boolean
    /** 路线 B：标题仅展示，点击打开页面信息；false 则为可编辑（路线 A） */
    displayOnly?: boolean
    iconTooltip?: string
  }>(),
  {
    separator: '/',
    showSeparator: true,
    displayOnly: true,
    iconTooltip: '工作区 / 页面选择'
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  openSwitcher: []
  openPagePanel: []
}>()

const isEditing = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)
const iconComponent = computed(() => getPageTitleIconById(props.iconId ?? null))

function startEdit() {
  isEditing.value = true
  nextTick(() => inputRef.value?.focus())
}

function commitEdit() {
  isEditing.value = false
  const el = inputRef.value
  if (el) emit('update:modelValue', el.value.trim() || props.modelValue)
}

function cancelEdit() {
  isEditing.value = false
}
</script>
