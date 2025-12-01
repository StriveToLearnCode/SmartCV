<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
    <div
      class="bg-[#fdfdfc] rounded-2xl max-w-4xl w-full h-[90vh] shadow-2xl animate-slide-up flex flex-col overflow-hidden border border-stone-200"
    >
      <!-- Header -->
      <div class="px-8 py-6 border-b border-stone-200 flex justify-between items-center bg-white">
        <div>
          <h2 class="text-xl font-serif font-bold text-stone-800 flex items-center gap-2">
            <span class="text-2xl">📊</span> 求职数据智能分析
          </h2>
          <p class="text-sm text-stone-500 mt-1">基于你的投递记录生成的实时诊断报告</p>
        </div>
        <button
          @click="$emit('close')"
          class="w-8 h-8 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center hover:bg-stone-200 hover:text-stone-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <!-- 1. 核心指标看板 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <!-- 投递数 -->
          <div class="bg-white p-5 rounded-xl border border-stone-100 shadow-sm relative overflow-hidden group">
            <div
              class="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"
            ></div>
            <div class="relative z-10">
              <div class="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">已投递岗位</div>
              <div class="flex items-baseline gap-2">
                <span class="text-4xl font-bold text-stone-800">{{ stats.applied }}</span>
                <span class="text-xs text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded">+{{ stats.newThisWeek }} 本周</span>
              </div>
            </div>
          </div>

          <!-- 面试转化 -->
          <div class="bg-white p-5 rounded-xl border border-stone-100 shadow-sm relative overflow-hidden group">
            <div
              class="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"
            ></div>
            <div class="relative z-10">
              <div class="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">面试转化率</div>
              <div class="flex items-baseline gap-2">
                <span class="text-4xl font-bold text-stone-800">{{ stats.interviewRate }}%</span>
                <span class="text-sm text-stone-400">({{ stats.interview }}/{{ stats.applied }})</span>
              </div>
              <div class="w-full bg-stone-100 h-1.5 mt-3 rounded-full overflow-hidden">
                <div class="bg-amber-400 h-full rounded-full" :style="{ width: stats.interviewRate + '%' }"></div>
              </div>
            </div>
          </div>

          <!-- Offer -->
          <div class="bg-white p-5 rounded-xl border border-stone-100 shadow-sm relative overflow-hidden group">
            <div
              class="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform"
            ></div>
            <div class="relative z-10">
              <div class="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Offer 进度</div>
              <div class="flex items-baseline gap-2">
                <span class="text-4xl font-bold text-stone-800">{{ stats.offer }}</span>
                <span class="text-xs text-stone-500">份</span>
              </div>
              <p class="text-xs text-stone-400 mt-2" v-if="stats.offer === 0">加油！黎明就在眼前</p>
              <p class="text-xs text-emerald-600 mt-2 font-bold" v-else>恭喜！你的努力有了回报</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- 2. 招聘漏斗 & 阶段分析 -->
          <div class="lg:col-span-2 space-y-8">
            <!-- 漏斗图 -->
            <div class="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <h3 class="text-sm font-bold text-stone-800 mb-6 flex items-center gap-2">
                <span class="w-1.5 h-4 bg-stone-800 rounded-full"></span>
                求职漏斗分析
              </h3>
              
              <div class="space-y-4">
                <!-- 投递 -->
                <div class="relative">
                   <div class="flex justify-between text-xs font-bold mb-1 text-stone-600">
                     <span>已投递</span>
                     <span>{{ stats.applied }}</span>
                   </div>
                   <div class="w-full bg-stone-100 h-10 rounded-lg flex items-center px-3 relative overflow-hidden">
                     <div class="absolute inset-0 bg-blue-100/50 w-full"></div>
                     <span class="relative z-10 text-xs text-blue-800 font-bold">100%</span>
                   </div>
                </div>
                
                <!-- 漏斗连接线 -->
                <div class="flex justify-center -my-2 relative z-10">
                   <div class="bg-stone-100 text-stone-400 text-[10px] px-2 py-0.5 rounded-full border border-stone-200">
                     转化率 {{ stats.interviewRate }}%
                   </div>
                </div>

                <!-- 面试 -->
                <div class="relative">
                   <div class="flex justify-between text-xs font-bold mb-1 text-stone-600">
                     <span>面试中</span>
                     <span>{{ stats.interview }}</span>
                   </div>
                   <div class="w-full bg-stone-100 h-10 rounded-lg flex items-center px-3 relative overflow-hidden">
                     <div class="absolute inset-0 bg-amber-100/50 transition-all duration-500" :style="{ width: stats.interviewRate + '%' }"></div>
                     <span class="relative z-10 text-xs text-amber-800 font-bold">{{ stats.interviewRate }}%</span>
                   </div>
                </div>

                <!-- 漏斗连接线 -->
                 <div class="flex justify-center -my-2 relative z-10">
                   <div class="bg-stone-100 text-stone-400 text-[10px] px-2 py-0.5 rounded-full border border-stone-200">
                     转化率 {{ stats.offerRate }}%
                   </div>
                </div>

                <!-- Offer -->
                <div class="relative">
                   <div class="flex justify-between text-xs font-bold mb-1 text-stone-600">
                     <span>Offer</span>
                     <span>{{ stats.offer }}</span>
                   </div>
                   <div class="w-full bg-stone-100 h-10 rounded-lg flex items-center px-3 relative overflow-hidden">
                     <div class="absolute inset-0 bg-emerald-100/50 transition-all duration-500" :style="{ width: (stats.offer / (stats.applied || 1) * 100) + '%' }"></div>
                     <span class="relative z-10 text-xs text-emerald-800 font-bold">{{ (stats.offer / (stats.applied || 1) * 100).toFixed(1) }}%</span>
                   </div>
                </div>
              </div>
            </div>
            
            <!-- 渠道效率 (简单 Mock) -->
            <div class="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <h3 class="text-sm font-bold text-stone-800 mb-4 flex items-center gap-2">
                <span class="w-1.5 h-4 bg-stone-800 rounded-full"></span>
                投递渠道效率
              </h3>
              <div class="space-y-3">
                 <div v-for="(platform, idx) in platformStats" :key="idx" class="flex items-center text-sm">
                   <span class="w-24 font-medium text-stone-600 truncate">{{ platform.name }}</span>
                   <div class="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden mx-3">
                     <div class="h-full bg-stone-400 rounded-full" :style="{ width: platform.percent + '%' }"></div>
                   </div>
                   <span class="w-12 text-right text-xs text-stone-500">{{ platform.count }}份</span>
                 </div>
              </div>
            </div>
          </div>

          <!-- 3. AI 智能建议 (Sidebar) -->
          <div class="lg:col-span-1">
            <div class="bg-stone-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
               <!-- 背景装饰 -->
               <div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
               
               <h3 class="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
                 <span>🤖</span> AI 诊断建议
               </h3>

               <div class="space-y-6 relative z-10">
                 <div v-for="(insight, idx) in aiInsights" :key="idx" class="flex gap-3 items-start">
                   <div class="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-xs shrink-0 mt-0.5">
                     {{ idx + 1 }}
                   </div>
                   <div>
                     <h4 class="text-sm font-bold text-white mb-1">{{ insight.title }}</h4>
                     <p class="text-xs text-stone-300 leading-relaxed">{{ insight.content }}</p>
                     <button v-if="insight.action" class="mt-2 text-[10px] bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors">
                       {{ insight.action }}
                     </button>
                   </div>
                 </div>
               </div>

               <div class="mt-8 pt-6 border-t border-white/10">
                 <p class="text-xs text-stone-400 mb-2">当前状态评价</p>
                 <div class="text-2xl font-bold text-amber-400">{{ overallEvaluation }}</div>
               </div>
            </div>
            
            <!-- 心理加油站 -->
            <div class="mt-6 bg-amber-50 border border-amber-100 p-4 rounded-xl text-center">
              <div class="text-2xl mb-2">🌟</div>
              <p class="text-xs font-serif text-amber-900 italic">"{{ randomQuote }}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { JobApplication } from '../types'

const props = defineProps<{
  jobs: JobApplication[]
}>()

defineEmits(['close'])

// 1. 基础统计
const stats = computed(() => {
  const applied = props.jobs.length
  const interview = props.jobs.filter(j => j.currentMainStage === 'Interview').length
  const offer = props.jobs.filter(j => j.currentMainStage === 'Offer').length
  
  // Mock "New This Week"
  const newThisWeek = props.jobs.filter(j => {
    // Assuming applyDate is recent for mock
    return true
  }).length

  return {
    applied,
    interview,
    offer,
    newThisWeek,
    interviewRate: applied ? Math.round((interview / applied) * 100) : 0,
    offerRate: interview ? Math.round((offer / interview) * 100) : 0
  }
})

// 2. 平台分布 (Mock)
const platformStats = computed(() => {
  const map: Record<string, number> = {}
  props.jobs.forEach(j => {
    const p = j.applyPlatform || '其他'
    map[p] = (map[p] || 0) + 1
  })
  
  const total = props.jobs.length || 1
  return Object.entries(map)
    .map(([name, count]) => ({
      name,
      count,
      percent: Math.round((count / total) * 100)
    }))
    .sort((a, b) => b.count - a.count)
})

// 3. AI 洞察逻辑 (Rule-based)
const aiInsights = computed(() => {
  const insights = []
  const s = stats.value

  // Rule 1: 投递量过少
  if (s.applied < 5) {
    insights.push({
      title: '投递量不足',
      content: '目前的样本量较小（<5份），建议每天保持 3-5 份高质量投递，扩大机会漏斗。',
      action: '去投递'
    })
  } else {
    insights.push({
      title: '投递节奏保持良好',
      content: '你的投递活跃度超过了 80% 的求职者，请继续保持！'
    })
  }

  // Rule 2: 面试转化率低
  if (s.applied > 5 && s.interviewRate < 15) {
    insights.push({
      title: '简历通过率偏低',
      content: `当前的面试转化率仅为 ${s.interviewRate}%（行业平均 20%）。可能是简历关键词匹配度不够，或核心竞争力未突出。`,
      action: '优化简历'
    })
  } else if (s.applied > 5) {
    insights.push({
      title: '简历质量优秀',
      content: '你的简历通过率表现出色，说明背景与目标岗位匹配度很高。'
    })
  }

  // Rule 3: 面试挂掉 (Need more detailed status tracking in real app)
  // Mocking a generic advice
  insights.push({
    title: '准备下一场战斗',
    content: '根据日历，你接下来有面试安排。记得查看“面试作弊表”复习核心话术。',
    action: '查看日程'
  })

  return insights
})

const overallEvaluation = computed(() => {
  const s = stats.value
  if (s.offer > 0) return '🎉 成功上岸'
  if (s.interviewRate > 30) return '🔥 炙手可热'
  if (s.interviewRate > 10) return '📈 稳步推进'
  return '🌱 蓄势待发'
})

const randomQuote = "每一次被拒绝，都是为了让你在对的时间遇到对的那个 Offer。"
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.1);
  border-radius: 3px;
}

.animate-slide-up {
  animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(40px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
