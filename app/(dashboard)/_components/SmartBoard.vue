<template>
  <div class="w-full max-w-[1400px] mx-auto px-4 pb-24 space-y-12">
    <!-- Section 0: 今日最重要 (Today's Focus) - New Companion Module -->
    <section class="animate-fade-in">
      <div class="flex items-center gap-2 mb-6">
        <h3 class="font-handwriting text-2xl text-stone-700 -rotate-1 flex items-center gap-2">
          <span class="text-xl">📌</span>
          Today's Focus
          <span class="text-sm font-sans text-stone-400 ml-2 not-italic">别慌，一件一件来</span>
        </h3>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Priority Card 1: Interview (Sticky Note Style) -->
        <div class="md:col-span-2 relative group cursor-pointer">
          <div
            class="absolute inset-0 bg-amber-100 rounded-sm transform rotate-1 group-hover:rotate-0 transition-transform duration-300 shadow-md"
          ></div>
          <div
            class="relative bg-[#fffbeb] border-l-4 border-amber-400 p-6 rounded-r-sm shadow-sm h-full flex flex-col justify-between"
          >
            <div>
              <div class="flex justify-between items-start mb-3">
                <div class="flex items-center gap-2">
                  <span
                    class="px-2 py-1 bg-amber-200 text-amber-800 text-[10px] font-bold rounded-sm uppercase tracking-wider"
                    >即将开始</span
                  >
                  <h4 class="font-serif text-xl font-bold text-stone-800">Nexus AI · 产品经理初试</h4>
                </div>
                <div
                  class="w-8 h-8 rounded-full bg-white border-2 border-amber-200 flex items-center justify-center text-lg shadow-sm"
                >
                  ☕️
                </div>
              </div>
              <p class="text-stone-600 text-sm leading-relaxed font-serif">
                还有 <span class="font-bold text-amber-600 text-lg mx-1">3</span> 小时。记得提前调试好摄像头，深呼吸。
              </p>
            </div>

            <div class="mt-6 flex items-center gap-4">
              <button
                @click="openCheatSheet"
                class="px-4 py-2 bg-white border-2 border-amber-200 text-amber-800 text-xs font-bold rounded-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2"
              >
                <span>💊</span> 打开面试急救包
              </button>
              <div class="text-xs text-stone-400 font-serif italic">"你准备得很充分，做自己就好。"</div>
            </div>
          </div>
        </div>

        <!-- Priority Card 2: Action Item (Checklist) -->
        <div class="relative group">
          <div
            class="absolute inset-0 bg-white rounded-sm shadow-paper border border-stone-200 transform -rotate-1 group-hover:rotate-0 transition-transform"
          ></div>
          <div class="relative p-6 h-full flex flex-col">
            <h4 class="font-serif font-bold text-stone-700 mb-4 flex items-center gap-2"><span>📝</span> 待办事项</h4>
            <ul class="space-y-3 flex-1">
              <li class="flex items-start gap-3 group/item cursor-pointer">
                <div
                  class="mt-0.5 w-4 h-4 border-2 border-stone-300 rounded-sm flex items-center justify-center transition-colors group-hover/item:border-stone-800"
                >
                  <div class="w-2 h-2 bg-stone-800 rounded-[1px] opacity-0 group-hover/item:opacity-20"></div>
                </div>
                <span class="text-sm text-stone-600 line-through decoration-stone-300 decoration-2"
                  >完善简历：项目经历</span
                >
              </li>
              <li class="flex items-start gap-3 group/item cursor-pointer">
                <div
                  class="mt-0.5 w-4 h-4 border-2 border-stone-300 rounded-sm flex items-center justify-center transition-colors group-hover/item:border-stone-800"
                ></div>
                <span class="text-sm text-stone-800">复习「用户增长」相关案例</span>
                <span class="ml-auto text-[10px] text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded">高优</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 1: 求职旅程地图 (Job Journey Map) -->
    <section>
      <div class="flex items-center justify-between mb-8">
        <h3 class="font-handwriting text-2xl text-stone-600 transform -rotate-1">
          My Journey <span class="text-sm font-sans text-stone-400 ml-2 not-italic">你走过的每一步都算数</span>
        </h3>
        <button
          class="text-sm text-stone-500 hover:text-stone-800 underline decoration-dashed underline-offset-4 font-serif"
        >
          查看所有记录
        </button>
      </div>

      <!-- Timeline Container -->
      <div class="relative pt-10 pb-10 overflow-x-auto hide-scrollbar">
        <!-- Main Line (Hand-drawn style) -->
        <div class="absolute top-[54px] left-0 w-full h-1 bg-stone-200 rounded-full"></div>
        <svg
          class="absolute top-[48px] left-0 w-full h-4 text-stone-300 pointer-events-none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 6 Q 20 4 40 6 T 80 6 T 120 6 T 160 6 T 200 6 T 240 6 T 280 6 T 320 6 T 360 6 T 400 6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-dasharray="4 4"
          />
        </svg>

        <div class="flex items-start min-w-max gap-12 px-4">
          <div
            v-for="(node, index) in journeyNodes"
            :key="index"
            class="relative group flex flex-col items-center w-32"
          >
            <!-- Date Label -->
            <span class="text-xs font-serif text-stone-400 mb-3">{{ node.date }}</span>

            <!-- Node Circle -->
            <div
              class="w-6 h-6 rounded-full border-2 z-10 bg-white transition-all duration-300 group-hover:scale-110 cursor-pointer relative"
              :class="[
                node.status === 'active'
                  ? 'border-stone-800 ring-4 ring-stone-100'
                  : node.status === 'completed'
                    ? 'border-stone-800 bg-stone-800'
                    : 'border-stone-300'
              ]"
              @click="toggleNode(index)"
            >
              <div
                v-if="node.status === 'completed'"
                class="text-white text-[10px] flex items-center justify-center h-full"
              >
                ✔
              </div>
            </div>

            <!-- Status Label -->
            <div class="mt-3 text-center">
              <div class="font-serif font-bold text-stone-700 text-sm">{{ node.title }}</div>
              <div class="text-[10px] text-stone-500 mt-1 bg-stone-100 px-1.5 py-0.5 rounded-sm inline-block">
                {{ node.company }}
              </div>
            </div>

            <!-- Pull-down Paper Slip (Details) -->
            <Motion
              v-if="activeNode === index"
              :initial="{ height: 0, opacity: 0 }"
              :animate="{ height: 'auto', opacity: 1 }"
              :exit="{ height: 0, opacity: 0 }"
              class="absolute top-20 w-48 bg-white shadow-paper-float p-3 z-20 border-t-4 overflow-hidden"
              :class="node.type === 'rejected' ? 'border-orange-200' : 'border-stone-800'"
            >
              <!-- Paper Texture -->
              <div class="absolute inset-0 bg-paper-texture opacity-50 pointer-events-none"></div>

              <div class="relative z-10 space-y-2">
                <p class="text-xs text-stone-600 leading-relaxed font-serif">
                  {{ node.feedback || '等待反馈中...' }}
                </p>
                <div v-if="node.type === 'rejected'" class="mt-2 pt-2 border-t border-dashed border-stone-200">
                  <div class="flex items-center gap-1 text-xs text-orange-400 font-bold">
                    <span>🌟</span> 经验值 +10
                  </div>
                  <p class="text-[10px] text-stone-400 mt-1">"没什么大不了的，这只是个匹配问题。"</p>
                </div>
              </div>
            </Motion>
          </div>

          <!-- Add New Node -->
          <div
            class="relative flex flex-col items-center w-32 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <div class="h-4 w-1 mb-3"></div>
            <div
              class="w-6 h-6 rounded-full border-2 border-dashed border-stone-400 flex items-center justify-center text-stone-400 text-xs"
            >
              +
            </div>
            <div class="mt-3 font-serif text-stone-400 text-sm">新投递</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: 简历族谱 (Resume Family) -->
    <section class="relative">
      <div class="flex items-center gap-3 mb-8">
        <h3 class="font-handwriting text-2xl text-stone-600 transform rotate-1">
          Resume Family <span class="text-sm font-sans text-stone-400 ml-2 not-italic">像侦探一样管理你的版本</span>
        </h3>
      </div>

      <!-- Detective Wall Container -->
      <div
        class="bg-[#fdfbf7] bg-paper-texture border border-stone-200 p-8 min-h-[400px] relative overflow-x-auto shadow-inner rounded-sm"
      >
        <div class="min-w-[600px] h-[350px] relative">
          <!-- Red String Connections (SVG Layer) -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none z-10">
            <!-- Lines connecting nodes -->
            <path
              d="M150 120 Q 250 150 350 120"
              stroke="#ef4444"
              stroke-width="1.5"
              fill="none"
              stroke-dasharray="2,2"
              class="opacity-60"
            />
            <path
              d="M150 120 Q 200 250 250 300"
              stroke="#ef4444"
              stroke-width="1.5"
              fill="none"
              stroke-dasharray="2,2"
              class="opacity-60"
            />
          </svg>

          <!-- Master Node -->
          <div class="absolute top-20 left-20 z-20">
            <div
              class="relative bg-white p-4 shadow-paper border-2 border-stone-800 w-40 transform -rotate-2 hover:rotate-0 transition-transform cursor-pointer group"
            >
              <div
                class="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 shadow-sm border border-red-600 z-30"
              ></div>
              <h4 class="font-serif font-bold text-stone-800">通用母版 v2</h4>
              <p class="text-xs text-stone-500 mt-1">最后更新: 昨晚</p>
              <div
                class="absolute -right-2 -bottom-2 opacity-0 group-hover:opacity-100 transition-opacity bg-yellow-100 text-[10px] px-2 py-1 rounded shadow-sm"
              >
                ✎ 点击修改
              </div>
            </div>
          </div>

          <!-- Child Node 1 -->
          <div class="absolute top-20 left-[350px] z-20">
            <div
              class="relative bg-white p-3 shadow-paper border border-stone-200 w-36 transform rotate-1 hover:rotate-0 transition-transform cursor-pointer"
            >
              <div
                class="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-stone-300 shadow-sm border border-stone-400 z-30"
              ></div>
              <h4 class="font-serif font-medium text-stone-700 text-sm">产品经理_SaaS</h4>
              <div class="mt-2 flex gap-1 flex-wrap">
                <span class="text-[10px] bg-green-50 text-green-700 px-1 border border-green-100">强调数据</span>
              </div>
            </div>
          </div>

          <!-- Child Node 2 -->
          <div class="absolute top-[300px] left-[250px] z-20">
            <div
              class="relative bg-white p-3 shadow-paper border border-stone-200 w-36 transform -rotate-1 hover:rotate-0 transition-transform cursor-pointer"
            >
              <div
                class="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-stone-300 shadow-sm border border-stone-400 z-30"
              ></div>
              <h4 class="font-serif font-medium text-stone-700 text-sm">用户运营_字节</h4>
              <div class="mt-2 flex gap-1 flex-wrap">
                <span class="text-[10px] bg-blue-50 text-blue-700 px-1 border border-blue-100">强调社区</span>
              </div>
            </div>
          </div>

          <!-- Sticky Note Hint -->
          <div
            class="absolute bottom-8 right-8 w-48 bg-yellow-100 p-4 shadow-sticky rotate-2 font-handwriting text-stone-600 text-sm leading-snug"
          >
            "修改母版时，我会提醒你同步到所有子简历哦！"
          </div>
        </div>
      </div>
    </section>
    <!-- Modals -->
    <InterviewCheatSheet v-model="showCheatSheet" :data="mockCheatSheetData" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Motion } from 'motion-v'
import InterviewCheatSheet from '../../(jobProgress)/_components/InterviewCheatSheet.vue'

const activeNode = ref<number | null>(null)
const showCheatSheet = ref(false)

const mockCheatSheetData = {
  interviewer: { name: 'Alex', role: 'Product Lead' },
  stories: [
    '拥有 3 年 SaaS 产品经验，主导过类似项目',
    '熟悉 Agile 开发流程，具备良好的跨部门协作能力',
    '对 AI 落地场景有独到见解（见简历项目 B）'
  ],
  questions: [
    '目前团队的规模和配置是怎样的？',
    '该岗位未来半年的核心 KPI 是什么？',
    '公司目前对 AI 产品的战略定位是？'
  ],
  keywords: ['AI 产品', '数据驱动', 'Agile']
}

const openCheatSheet = () => {
  showCheatSheet.value = true
}

const journeyNodes = [
  {
    date: '10/24',
    title: '投递简历',
    company: 'Pixel Corp',
    status: 'completed',
    type: 'normal',
    feedback: '已发送，等待查看'
  },
  {
    date: '10/26',
    title: 'HR 查看',
    company: 'Pixel Corp',
    status: 'completed',
    type: 'normal',
    feedback: 'HR 在 10:24 查看了你的简历'
  },
  {
    date: '10/28',
    title: '初试',
    company: 'Pixel Corp',
    status: 'completed',
    type: 'rejected',
    feedback: '很遗憾，岗位匹配度略有不足。'
  },
  {
    date: '11/02',
    title: '投递简历',
    company: 'Nexus AI',
    status: 'active',
    type: 'normal',
    feedback: '面试安排在下午 2:00'
  },
  { date: '11/05', title: '等待 Offer', company: 'Nexus AI', status: 'pending', type: 'normal', feedback: '' }
]

const toggleNode = (index: number) => {
  activeNode.value = activeNode.value === index ? null : index
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.shadow-paper-float {
  box-shadow:
    0 10px 20px -5px rgba(0, 0, 0, 0.1),
    0 5px 10px -5px rgba(0, 0, 0, 0.05);
}
.bg-paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
}
</style>
