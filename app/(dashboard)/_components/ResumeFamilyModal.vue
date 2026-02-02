<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/20 backdrop-blur-sm"
      >
        <div class="absolute inset-0" @click="close"></div>

        <Motion
          :initial="{ opacity: 0, scale: 0.95 }"
          :animate="{ opacity: 1, scale: 1 }"
          class="relative w-[95vw] h-[90vh] bg-[#fdfbf7] bg-paper-texture rounded shadow-2xl flex flex-col overflow-hidden border border-stone-200"
        >
          <!-- Toolbar -->
          <div
            class="h-16 border-b border-stone-200 px-6 flex items-center justify-between bg-white/50 backdrop-blur-sm z-50"
          >
            <h2 class="text-xl font-serif font-bold text-stone-800 flex items-center gap-2">
              <span>🕸️</span> Resume Family
            </h2>
            <div class="flex items-center gap-4">
              <div class="text-xs text-stone-400">双击卡片重命名 • 拖拽移动 • 点击连线</div>
              <button
                @click="close"
                class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors text-stone-500"
              >
                ✕
              </button>
            </div>
          </div>

          <!-- Canvas Area (Restored Full Functionality) -->
          <div
            class="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing"
            @mousedown="startPan"
            @mousemove="panCanvas"
            @mouseup="endPan"
            @mouseleave="endPan"
          >
            <div
              class="absolute inset-0 transform origin-center transition-transform duration-75 ease-linear"
              :style="{ transform: `translate(${pan.x}px, ${pan.y}px) scale(1)` }"
            >
              <!-- Connections -->
              <svg class="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                <path
                  v-for="conn in connections"
                  :key="conn.key"
                  :d="conn.d"
                  stroke="#ef4444"
                  stroke-width="1.5"
                  fill="none"
                  stroke-dasharray="4,4"
                  class="opacity-60"
                />
              </svg>

              <!-- Nodes -->
              <div
                v-for="node in nodes"
                :key="node.id"
                class="absolute z-20"
                :style="{
                  left: `${node.x}px`,
                  top: `${node.y}px`
                }"
                @mousedown.stop="startDrag($event, node)"
              >
                <div
                  class="relative bg-white p-4 shadow-paper border border-stone-200 w-56 group transition-shadow hover:shadow-lg"
                  :class="[
                    node.type === 'master' ? 'border-2 border-stone-800' : '',
                    draggingId === node.id ? 'scale-105 shadow-xl z-50' : ''
                  ]"
                >
                  <!-- Pin -->
                  <div
                    class="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full shadow-sm border z-30"
                    :class="node.type === 'master' ? 'bg-red-500 border-red-600' : 'bg-stone-300 border-stone-400'"
                  ></div>

                  <!-- Content -->
                  <div @dblclick.stop="enableEditing(node)">
                    <input
                      v-if="node.isEditing"
                      v-model="node.title"
                      @blur="node.isEditing = false"
                      @keyup.enter="node.isEditing = false"
                      class="font-serif font-bold text-stone-800 text-base w-full border-b border-stone-300 outline-none bg-transparent"
                      autofocus
                    />
                    <h4
                      v-else
                      class="font-serif font-bold text-stone-800 text-base truncate cursor-text"
                      title="双击重命名"
                    >
                      {{ node.title }}
                    </h4>
                  </div>
                  <p v-if="node.subtitle" class="text-xs text-stone-500 mt-1">{{ node.subtitle }}</p>

                  <!-- Tags -->
                  <div v-if="node.tags && node.tags.length" class="mt-3 flex gap-1 flex-wrap">
                    <span
                      v-for="tag in node.tags"
                      :key="tag"
                      class="text-[10px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded border border-green-100"
                      >{{ tag }}</span
                    >
                  </div>

                  <!-- Actions Bar -->
                  <div
                    class="mt-4 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity border-t border-stone-100 pt-2"
                  >
                    <button
                      @click.stop="copyNode(node)"
                      class="p-1.5 hover:bg-stone-100 rounded text-stone-500 hover:text-stone-800 transition-colors"
                      title="复制"
                    >
                      📋
                    </button>
                    <button
                      @click.stop="addTag(node)"
                      class="p-1.5 hover:bg-stone-100 rounded text-stone-500 hover:text-stone-800 transition-colors"
                      title="标签"
                    >
                      🏷️
                    </button>
                    <button
                      @click.stop="navigateToEdit(node.id)"
                      class="px-3 py-1 bg-stone-800 text-white text-xs rounded hover:bg-stone-700 transition-colors"
                    >
                      编辑
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Motion>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { Motion } from 'motion-v'
import { useRouter } from 'vue-router'

interface ResumeNode {
  id: number
  title: string
  subtitle: string
  x: number
  y: number
  type: 'master' | 'child'
  parentId?: number
  tags?: string[]
  isEditing?: boolean
}

const props = defineProps<{
  modelValue: boolean
  nodes: ResumeNode[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'update:nodes', value: ResumeNode[]): void
}>()

const router = useRouter()
const pan = ref({ x: 0, y: 0 })
const startPanPos = ref({ x: 0, y: 0 })
const isPanning = ref(false)
const draggingId = ref<number | null>(null)

// Pan Logic
const startPan = (e: MouseEvent) => {
  if ((e.target as HTMLElement).closest('.group')) return
  isPanning.value = true
  startPanPos.value = { x: e.clientX - pan.value.x, y: e.clientY - pan.value.y }
}

const panCanvas = (e: MouseEvent) => {
  if (!isPanning.value) return
  pan.value = { x: e.clientX - startPanPos.value.x, y: e.clientY - startPanPos.value.y }
}

const endPan = () => {
  isPanning.value = false
}

const close = () => {
  emit('update:modelValue', false)
}

// Node Actions
const enableEditing = (node: ResumeNode) => {
  node.isEditing = true
  nextTick(() => {
    const input = document.querySelector('input[autofocus]') as HTMLInputElement
    if (input) input.focus()
  })
}

const startDrag = (e: MouseEvent, node: ResumeNode) => {
  e.preventDefault()
  draggingId.value = node.id

  const startX = e.clientX - node.x
  const startY = e.clientY - node.y

  const onMouseMove = (e: MouseEvent) => {
    if (draggingId.value === node.id) {
      node.x = e.clientX - startX
      node.y = e.clientY - startY
    }
  }

  const onMouseUp = () => {
    draggingId.value = null
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

const copyNode = (node: ResumeNode) => {
  // Clone and add new node logic would be emitted or handled here,
  // updating the nodes prop array if mutable or emitting update
  const newNodes = [...props.nodes]
  const newId = Math.max(...newNodes.map((n) => n.id)) + 1
  newNodes.push({
    id: newId,
    title: `${node.title} (Copy)`,
    subtitle: '刚刚',
    x: node.x + 30,
    y: node.y + 30,
    type: 'child',
    parentId: node.id,
    tags: []
  })
  emit('update:nodes', newNodes)
}

const addTag = (node: ResumeNode) => {
  const tag = prompt('请输入标签名称:')
  if (tag) {
    if (!node.tags) node.tags = []
    node.tags.push(tag)
  }
}

const navigateToEdit = (id: number) => {
  console.log(`Navigating to edit resume ${id}`)
  router.push('/edit')
}

// Connections
const connections = computed(() => {
  return props.nodes
    .filter((node) => node.parentId)
    .map((node) => {
      const parent = props.nodes.find((p) => p.id === node.parentId)
      if (!parent) return null
      const startX = parent.x + 80
      const startY = parent.y + 40
      const endX = node.x + 60
      const endY = node.y + 40

      const cx = (startX + endX) / 2
      const cy = (startY + endY) / 2 + 50

      return {
        d: `M${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`,
        key: `${parent.id}-${node.id}`
      }
    })
    .filter(Boolean) as { d: string; key: string }[]
})
</script>

<style scoped>
.bg-paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
