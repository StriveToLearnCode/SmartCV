<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
        @click.self="emit('update:modelValue', false)"
      >
        <div
          class="personalize-modal w-full max-w-xl rounded-[12px] border border-[var(--border)] bg-[var(--bg-primary)] overflow-hidden max-h-[85vh] flex flex-col"
          @click.stop
        >
          <!-- 标题栏：标题居中，关闭在右 -->
          <div class="relative flex items-center justify-center px-5 py-4 border-b border-[var(--border)]">
            <h3 class="text-lg font-semibold text-[var(--text-primary)]">个性化你的 AI 助手</h3>
            <button
              type="button"
              class="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              @click="emit('update:modelValue', false)"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>

          <div class="p-5 space-y-5 overflow-y-auto flex-1 min-h-0">
            <!-- 1. 头像区：左右箭头 + 圆形头像 + 饰品叠在上方 -->
            <div class="flex items-center justify-center gap-3">
              <button
                type="button"
                class="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                @click="cycleAccessory(-1)"
              >
                <ChevronLeftIcon class="w-5 h-5" />
              </button>
              <div
                class="w-25 h-25 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center overflow-hidden relative shrink-0"
              >
                <img v-if="baseLogo" :src="baseLogo" class="absolute inset-0 w-full h-full object-cover" alt="" />
                <span
                  v-if="selectedAccessoryIcon"
                  class="absolute inset-0 flex items-center justify-center text-3xl pointer-events-none"
                >
                  {{ selectedAccessoryIcon }}
                </span>
              </div>
              <button
                type="button"
                class="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                @click="cycleAccessory(1)"
              >
                <ChevronRightIcon class="w-5 h-5" />
              </button>
            </div>

            <!-- 2. 名称输入 -->
            <div>
              <input
                :value="name"
                type="text"
                placeholder="输入名称"
                class="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder-[var(--text-dim)] outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] text-sm"
                @input="onNameInput"
              />
            </div>

            <!-- 3. 说明：同一行「说明」+「+ 设置说明」蓝色按钮，下方灰色说明框 -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-[var(--text-secondary)]">说明</span>
                <button
                  type="button"
                  class="flex items-center gap-1 text-xs font-medium text-[var(--accent)] hover:underline"
                  @click="showDescriptionEdit = true"
                >
                  <PlusIcon class="w-3.5 h-3.5" />
                  设置说明
                </button>
              </div>
              <p
                v-if="!showDescriptionEdit"
                class="text-sm text-[var(--text-secondary)] py-2.5 px-3 rounded-lg bg-[var(--bg-secondary)] min-h-[56px] cursor-text"
                @click="showDescriptionEdit = true"
              >
                {{ description || '使用页面为 AI 提供指令并指导其行为' }}
              </p>
              <textarea
                v-else
                :value="description"
                placeholder="使用页面为 AI 提供指令并指导其行为"
                class="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] placeholder-[var(--text-dim)] outline-none focus:ring-2 focus:ring-[var(--accent)]/20 text-sm min-h-[72px] resize-y"
                @input="onDescriptionInput"
                @blur="showDescriptionEdit = false"
              />
            </div>

            <!-- 4. 饰品网格：4x4，圆角方钮，选中蓝框 -->
            <div class="grid grid-cols-8 gap-2">
              <button
                v-for="acc in PERSONALIZE_ACCESSORIES"
                :key="acc.id"
                type="button"
                class="aspect-square rounded-xl border-2 flex items-center justify-center hover:opacity-90 transition-all bg-[var(--bg-secondary)]"
                :class="
                  localAccessoryId === acc.id
                    ? 'border-[var(--accent)] ring-1 ring-[var(--accent)]/30'
                    : 'border-[var(--border)]'
                "
                @click="localAccessoryId = acc.id"
              >
                {{ acc.icon }}
              </button>
              <button
                type="button"
                class="aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-0.5 hover:bg-[var(--bg-hover)] text-[var(--text-secondary)] text-xs transition-colors"
                :class="
                  localAccessoryId === null ? 'border-[var(--accent)] bg-[var(--accent)]/5' : 'border-[var(--border)]'
                "
                @click="localAccessoryId = null"
              >
                <span class="text-base">✕</span>
                移除
              </button>
            </div>
          </div>

          <!-- 底部：重置 + 完成 -->
          <div class="px-5 py-4 border-t border-[var(--border)] flex justify-end gap-3 bg-[var(--bg-primary)]">
            <button
              type="button"
              class="px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-secondary)] text-sm font-medium hover:bg-[var(--bg-hover)] transition-colors"
              @click="handleReset"
            >
              重置
            </button>
            <button
              type="button"
              class="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
              @click="emit('update:modelValue', false)"
            >
              完成
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { XMarkIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import {
  PERSONALIZE_ACCESSORIES,
  DEFAULT_ASSISTANT_NAME,
  DEFAULT_ASSISTANT_DESCRIPTION,
  getAccessoryById
} from '../_composables/personalize-accessories'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    baseLogo: string
    name: string
    description: string
    accessoryId: string | null
  }>(),
  {
    name: () => DEFAULT_ASSISTANT_NAME,
    description: () => DEFAULT_ASSISTANT_DESCRIPTION,
    accessoryId: () => null
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'update:name': [value: string]
  'update:description': [value: string]
  'update:accessoryId': [value: string | null]
}>()

const showDescriptionEdit = ref(false)
const localAccessoryId = ref<string | null>(props.accessoryId)

watch(
  () => props.modelValue,
  (open) => {
    if (open) localAccessoryId.value = props.accessoryId
  }
)
watch(
  () => props.accessoryId,
  (v) => {
    localAccessoryId.value = v
  }
)
watch(localAccessoryId, (v) => {
  emit('update:accessoryId', v)
})

const selectedAccessoryIcon = computed(() => getAccessoryById(localAccessoryId.value)?.icon ?? null)

/** 饰品顺序：无 → 第1个 → … → 最后一个，循环 */
const accessoryOrder = computed(() => [null, ...PERSONALIZE_ACCESSORIES.map((a) => a.id)])

function cycleAccessory(delta: number) {
  const list = accessoryOrder.value
  const currentIndex = list.indexOf(localAccessoryId.value)
  const nextIndex = (currentIndex + delta + list.length) % list.length
  localAccessoryId.value = list[nextIndex]
}

function onNameInput(e: Event) {
  const el = e.target as HTMLInputElement
  emit('update:name', el.value)
}

function onDescriptionInput(e: Event) {
  const el = e.target as HTMLTextAreaElement
  emit('update:description', el.value)
}

function handleReset() {
  localAccessoryId.value = null
  emit('update:name', DEFAULT_ASSISTANT_NAME)
  emit('update:description', DEFAULT_ASSISTANT_DESCRIPTION)
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
