<template>
  <div
    class="min-h-screen p-4 sm:p-8 font-sans text-stone-800 bg-[#f7f5f2] bg-paper-texture relative overflow-x-hidden"
  >
    <!-- Background Decorative Elements -->
    <div
      class="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-stone-100 to-transparent opacity-50 pointer-events-none"
    ></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Header: Zine Title -->
      <header class="flex items-end justify-between mb-12 border-b-2 border-stone-800 pb-4">
        <div>
          <h1 class="text-5xl font-serif font-bold text-stone-900 tracking-tighter mb-2">
            <span class="italic mr-2">The</span>Resume Zine
          </h1>
          <p class="text-stone-500 font-mono text-xs tracking-widest uppercase">
            AI-Powered Creative Editor &bull; Vol. {{ resumes.length }}
          </p>
        </div>
        <div class="hidden md:block text-right">
          <div class="text-sm font-bold text-stone-800 mb-1">已分析 {{ resumes.length }} 份作品</div>
          <div class="text-xs text-stone-400 font-handwriting rotate-2">"Let's make it better."</div>
        </div>
      </header>

      <!-- Main Content: Zine Editor View -->
      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Left: Resume Collection (Zine Covers) -->
        <div class="lg:w-1/3 shrink-0">
          <div class="sticky top-8">
            <h3 class="text-xs font-bold text-stone-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <span class="w-2 h-2 bg-stone-800 rounded-full"></span>
              我的作品集
            </h3>

            <div class="space-y-8">
              <div
                v-for="(resume, index) in resumes"
                :key="resume.id"
                class="group cursor-pointer relative perspective-1000"
                @click="activeResumeId = resume.id"
              >
                <!-- Spine Binding -->
                <div class="absolute left-0 top-2 bottom-2 w-1.5 bg-stone-300 rounded-l-sm z-20 shadow-inner"></div>

                <!-- Zine Cover -->
                <div
                  class="ml-1.5 bg-white border-2 border-stone-800 p-6 h-48 shadow-[4px_4px_0px_0px_rgba(41,37,36,1)] transition-all duration-300 relative overflow-hidden"
                  :class="
                    activeResumeId === resume.id
                      ? 'translate-x-2 -translate-y-1 shadow-[8px_8px_0px_0px_rgba(41,37,36,1)] bg-stone-50'
                      : 'hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(41,37,36,1)]'
                  "
                >
                  <!-- Tape -->
                  <div
                    class="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-100/80 rotate-2 backdrop-blur-sm shadow-sm z-10"
                  ></div>

                  <div class="flex flex-col h-full justify-between relative z-0">
                    <div>
                      <div class="text-[10px] font-mono text-stone-400 mb-1">#0{{ index + 1 }}</div>
                      <h4
                        class="text-lg font-serif font-bold text-stone-900 leading-tight line-clamp-2 group-hover:underline decoration-2 underline-offset-2"
                      >
                        {{ resume.name }}
                      </h4>
                    </div>

                    <div class="flex items-end justify-between">
                      <div class="flex flex-col gap-1">
                        <span
                          class="text-[10px] font-bold uppercase bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200 w-fit"
                        >
                          Score: {{ resume.score }}
                        </span>
                        <span class="text-[10px] text-stone-400">{{ resume.lastUpdated }}</span>
                      </div>

                      <!-- Mini Sketches -->
                      <div class="opacity-20 group-hover:opacity-40 transition-opacity">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-12 w-12"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1"
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add New Zine (Placeholder) -->
            <div
              class="mt-8 border-2 border-dashed border-stone-300 rounded-lg p-4 text-center cursor-pointer hover:border-stone-500 hover:bg-stone-100 transition-colors"
            >
              <div class="text-stone-400 text-xs font-bold uppercase">+ 新建草稿</div>
            </div>
          </div>
        </div>

        <!-- Right: Scrapbook Editor (Details & AI) -->
        <div class="lg:flex-1 min-h-[80vh]">
          <Transition name="fade" mode="out-in">
            <div v-if="activeResume" :key="activeResume.id" class="relative">
              <!-- Background Paper Base -->
              <div
                class="bg-white shadow-xl min-h-[800px] p-8 md:p-12 relative rotate-[0.5deg] border border-stone-200"
              >
                <!-- Grid Pattern -->
                <div
                  class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-20 pointer-events-none"
                ></div>

                <!-- Binder Rings (Visual) -->
                <div class="absolute left-4 top-0 bottom-0 w-8 flex flex-col justify-between py-12 pointer-events-none">
                  <div
                    v-for="i in 6"
                    :key="i"
                    class="w-4 h-4 rounded-full bg-stone-200 shadow-inner border border-stone-300"
                  ></div>
                </div>

                <!-- Content Area -->
                <div class="pl-8 relative">
                  <!-- Title Area with Task Summary -->
                  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
                    <h2
                      class="text-4xl font-serif font-bold text-stone-900 tracking-tight underline decoration-wavy decoration-stone-300 underline-offset-8"
                    >
                      {{ activeResume.name }}
                    </h2>

                    <!-- Task Summary Tape -->
                    <div
                      class="flex items-center gap-2 text-xs font-bold uppercase tracking-wide bg-stone-100 px-3 py-1.5 rounded-sm border border-stone-200 rotate-1 shadow-sm"
                    >
                      <span class="text-red-500">3 必改</span>
                      <span class="w-1 h-1 bg-stone-300 rounded-full"></span>
                      <span class="text-stone-500">7 建议</span>
                    </div>
                  </div>

                  <!-- AI Suggestions List (Collapsible Paper Strips) -->
                  <div class="space-y-12">
                    <div
                      v-for="(group, index) in groupSuggestions(activeResume.suggestions)"
                      :key="index"
                      class="relative"
                    >
                      <!-- Section Marker -->
                      <div class="flex items-center gap-4 mb-6">
                        <h3
                          class="text-xl font-bold font-mono uppercase text-stone-400 tracking-widest border-b-2 border-stone-800 pb-1"
                        >
                          {{ group.category }}
                        </h3>
                        <div class="h-px flex-1 bg-stone-200 border-b border-dashed border-stone-300"></div>
                      </div>

                      <!-- Suggestion Strips -->
                      <div class="grid grid-cols-1 gap-6">
                        <div v-for="suggestion in group.items" :key="suggestion.id" class="relative group/item">
                          <!-- Main Strip -->
                          <div
                            class="bg-white border-l-4 p-4 pl-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer relative overflow-hidden"
                            :class="[
                              getSuggestionBorderColor(suggestion.type),
                              activeSuggestionId === suggestion.id
                                ? 'bg-stone-50 rounded-t-lg border-stone-200 border-l-stone-800'
                                : 'rounded-lg'
                            ]"
                            @click="toggleSuggestion(suggestion.id)"
                          >
                            <!-- Folded Corner (Visual) -->
                            <div
                              class="absolute top-0 right-0 border-t-[12px] border-r-[12px] border-t-stone-100 border-r-white shadow-sm"
                            ></div>

                            <div class="flex items-start justify-between gap-4">
                              <div class="flex-1">
                                <div class="flex items-center gap-2 mb-1">
                                  <span
                                    class="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm border"
                                    :class="getTypeBadgeStyle(suggestion.type)"
                                  >
                                    {{ suggestion.typeLabel }}
                                  </span>
                                  <h4 class="text-sm font-bold text-stone-800">{{ suggestion.title }}</h4>
                                </div>
                                <p class="text-xs text-stone-500 font-serif line-clamp-1">{{ suggestion.content }}</p>
                              </div>

                              <!-- Chevron -->
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 text-stone-300 transition-transform duration-300 mt-1"
                                :class="{ 'rotate-180': activeSuggestionId === suggestion.id }"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </div>

                          <!-- Editable Paper Panel (Slide Down) -->
                          <div
                            v-if="activeSuggestionId === suggestion.id"
                            class="bg-stone-100/50 border-x border-b border-stone-200 rounded-b-lg p-6 animate-slide-down relative -mt-1 shadow-inner"
                          >
                            <!-- Target Section Visual Highlight -->
                            <div
                              class="mb-6 p-3 bg-white border border-dashed border-stone-300 rounded text-xs font-mono text-stone-400 relative"
                            >
                              <div class="absolute -left-3 top-3 w-1.5 h-6 bg-yellow-400 rounded-r-sm"></div>
                              <span class="uppercase tracking-widest text-[9px] text-stone-300 mb-1 block"
                                >Target Section</span
                              >
                              <div class="font-serif text-stone-600 bg-yellow-50/50 px-1 inline">
                                {{ suggestion.targetContent }}
                              </div>
                            </div>

                            <!-- Rewrite Options -->
                            <div class="space-y-4">
                              <div class="flex items-center justify-between">
                                <h5 class="text-xs font-bold text-stone-500 uppercase tracking-wide">
                                  选择 AI 改写风格
                                </h5>
                              </div>

                              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div
                                  v-for="opt in suggestion.options"
                                  :key="opt.style"
                                  class="bg-white p-3 rounded border border-stone-200 hover:border-stone-400 cursor-pointer transition-all group/opt relative"
                                >
                                  <div
                                    class="text-[10px] font-bold text-stone-400 uppercase mb-2 group-hover/opt:text-indigo-500"
                                  >
                                    {{ opt.label }}
                                  </div>
                                  <p class="text-xs text-stone-700 font-serif leading-relaxed">{{ opt.content }}</p>

                                  <!-- Apply Button Overlay -->
                                  <div
                                    class="absolute inset-0 bg-stone-900/5 backdrop-blur-[1px] opacity-0 group-hover/opt:opacity-100 flex items-center justify-center transition-opacity rounded"
                                  >
                                    <button
                                      class="bg-stone-900 text-white text-xs font-bold px-3 py-1.5 rounded shadow-sm hover:scale-105 transition-transform"
                                    >
                                      应用此版
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="flex items-center justify-center h-[600px] text-stone-400 font-mono">
              Select a Zine to start editing...
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

// Types
type Priority = 'High' | 'Medium' | 'Low'
type Category = 'Education' | 'Experience' | 'Project' | 'Skills' | 'Layout'
type SuggestionType = 'critical' | 'professional' | 'style' | 'highlight'

interface RewriteOption {
  style: string
  label: string
  content: string
}

interface Suggestion {
  id: number
  category: Category
  title: string
  type: SuggestionType
  typeLabel: string
  content: string // Description
  targetContent: string // The original text in resume
  options: RewriteOption[]
}

interface Resume {
  id: number
  name: string
  lastUpdated: string
  score: number
  moduleScores: Record<Category, number>
  priority: Priority
  suggestions: Suggestion[]
}

// Mock Data
const resumes = ref<Resume[]>([
  {
    id: 1,
    name: '前端开发工程师 - 2024春招',
    lastUpdated: '2h ago',
    score: 85,
    moduleScores: { Education: 95, Experience: 80, Project: 75, Skills: 90, Layout: 100 },
    priority: 'High',
    suggestions: [
      {
        id: 101,
        category: 'Experience',
        title: '缺少量化数据',
        type: 'critical',
        typeLabel: '必改',
        content: '项目描述过于定性，缺乏具体的数据支持。',
        targetContent: '负责优化系统性能，提高了页面加载速度。',
        options: [
          { style: 'concise', label: '简洁专业', content: '优化系统性能，首屏加载速度提升 40%。' },
          {
            style: 'impact',
            label: '成果强化',
            content: '主导性能优化专项，通过代码分割与缓存策略，使首屏加载时间减少 60%，用户留存率提升 15%。'
          },
          {
            style: 'expert',
            label: '行业专家',
            content:
              '设计并实施全链路性能优化方案（SSR + Edge Cache），将 LCP 指标从 2.5s 优化至 0.8s，达到行业领先水平。'
          }
        ]
      },
      {
        id: 103,
        category: 'Project',
        title: '缺乏STAR法则',
        type: 'professional',
        typeLabel: '职业性',
        content: '未体现遇到的困难和解决方案。',
        targetContent: '在开发过程中遇到了渲染问题，后来解决了。',
        options: [
          { style: 'concise', label: '简洁专业', content: '解决复杂表格渲染卡顿问题，提升渲染效率。' },
          { style: 'impact', label: '成果强化', content: '针对万级数据渲染卡顿，引入虚拟滚动技术，帧率稳定在 60fps。' },
          {
            style: 'expert',
            label: '行业专家',
            content: '基于 Virtual DOM 原理重构表格组件，解决海量数据渲染瓶颈，内存占用降低 45%。'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '全栈工程师 - 申请国外名校',
    lastUpdated: '1d ago',
    score: 60,
    moduleScores: { Education: 60, Experience: 70, Project: 85, Skills: 80, Layout: 50 },
    priority: 'Medium',
    suggestions: [
      {
        id: 201,
        category: 'Education',
        title: 'GPA 格式不统一',
        type: 'style',
        typeLabel: '风格',
        content: 'GPA 写法不统一，且未注明排名。',
        targetContent: 'GPA: 3.8/4.0',
        options: [
          { style: 'concise', label: '标准格式', content: 'GPA: 3.8 / 4.0' },
          { style: 'impact', label: '强调排名', content: 'GPA: 3.8 / 4.0 (Top 5%)' },
          { style: 'expert', label: '详细', content: 'GPA: 3.8 / 4.0 (Major GPA: 3.9)' }
        ]
      }
    ]
  }
])

const activeResumeId = ref<number>(1)
const activeSuggestionId = ref<number | null>(null)

const activeResume = computed(() => {
  return resumes.value.find((r) => r.id === activeResumeId.value)
})

// Helpers
const moduleMap: Record<string, string> = {
  Education: 'Education',
  Experience: 'Experience',
  Project: 'Projects',
  Skills: 'Skills',
  Layout: 'Layout'
}

const groupSuggestions = (suggestions: Suggestion[]) => {
  const groups: Record<string, Suggestion[]> = {}
  suggestions.forEach((s) => {
    if (!groups[s.category]) groups[s.category] = []
    groups[s.category].push(s)
  })
  return Object.keys(groups).map((key) => ({
    categoryKey: key,
    category: moduleMap[key] || key,
    items: groups[key] || []
  }))
}

const toggleSuggestion = (id: number) => {
  if (activeSuggestionId.value === id) {
    activeSuggestionId.value = null
  } else {
    activeSuggestionId.value = id
  }
}

const getSuggestionBorderColor = (type: SuggestionType) => {
  const map: Record<SuggestionType, string> = {
    critical: 'border-l-red-400',
    professional: 'border-l-indigo-400',
    style: 'border-l-amber-400',
    highlight: 'border-l-emerald-400'
  }
  return map[type] || 'border-l-stone-300'
}

const getTypeBadgeStyle = (type: SuggestionType) => {
  const map: Record<SuggestionType, string> = {
    critical: 'bg-red-50 text-red-600 border-red-100',
    professional: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    style: 'bg-amber-50 text-amber-600 border-amber-100',
    highlight: 'bg-emerald-50 text-emerald-600 border-emerald-100'
  }
  return map[type]
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');

.font-handwriting {
  font-family: 'Caveat', cursive;
}

.perspective-1000 {
  perspective: 1000px;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-slide-down {
  animation: slide-down 0.3s ease-out forwards;
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
