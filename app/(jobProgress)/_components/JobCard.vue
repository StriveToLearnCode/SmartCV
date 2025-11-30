<template>
  <div 
    class="bg-white rounded-xl transition-all duration-500 ease-out border border-stone-100 overflow-hidden"
    :class="[
      expanded ? 'shadow-lg ring-1 ring-stone-200/50' : 'shadow hover:shadow-md hover:-translate-y-0.5'
    ]"
  >
    <!-- 主卡片区域 (点击切换折叠) -->
    <div 
      class="p-6 cursor-pointer relative group"
      @click="toggleExpand"
    >
      <!-- 纸质纹理叠加 -->
      <div class="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none"></div>
      
      <div class="relative z-10">
        <div class="flex justify-between items-start mb-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 flex-wrap">
              <h3 class="text-lg font-bold text-stone-800 font-serif tracking-wide group-hover:text-stone-600 transition-colors">
                {{ job.position }}
              </h3>
              <PriorityBadge :priority="job.priority" />
            </div>
            <div class="flex items-center gap-2 text-stone-500 text-sm mt-1">
              <span class="font-medium">{{ job.company }}</span>
              <span v-if="job.location" class="w-1 h-1 rounded-full bg-stone-300"></span>
              <span v-if="job.location">{{ job.location }}</span>
              <span v-if="job.salary" class="w-1 h-1 rounded-full bg-stone-300"></span>
              <span v-if="job.salary" class="text-stone-400">{{ job.salary }}</span>
              <span v-if="job.deadline" class="w-1 h-1 rounded-full bg-stone-300"></span>
              <span v-if="job.deadline" class="text-red-400 text-xs">截止: {{ job.deadline }}</span>
            </div>

            <!-- 面试提醒高亮区域 (新增) -->
            <div v-if="job.nextInterview" class="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-800 rounded-lg border border-amber-100 shadow-sm transition-transform hover:scale-105">
              <div class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-xs font-bold tracking-wide">面试: {{ job.nextInterview }}</span>
            </div>
          </div>
          <StatusBadge :status="job.status" class="shrink-0 ml-2" />
        </div>

        <!-- 进度条区域 -->
        <div class="mt-6 mb-2 px-1">
          <JobProgressBar :timeline="job.timeline" :progress="job.progress" />
        </div>
        
        <!-- 底部展开提示 (仅在折叠时显示) -->
        <div 
          class="flex justify-center mt-6 transition-opacity duration-300 delay-100"
          :class="expanded ? 'opacity-0 h-0 overflow-hidden mt-0' : 'opacity-40 group-hover:opacity-100'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    <!-- 展开详情区域 -->
    <div 
      class="bg-stone-50/50 border-t border-stone-100 transition-all duration-500 ease-in-out origin-top"
      :style="{ maxHeight: expanded ? '800px' : '0px', opacity: expanded ? 1 : 0 }"
    >
      <div class="p-6 relative">
        <div class="absolute inset-0 bg-paper-texture opacity-20 pointer-events-none"></div>
        
        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- 左侧：职位 JD 与 备注 -->
          <div class="lg:col-span-2 space-y-6">
            <div>
              <h4 class="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                职位详情 (JD)
              </h4>
              <div class="text-sm text-stone-600 leading-relaxed whitespace-pre-line bg-white p-4 rounded-lg border border-stone-100 shadow-sm">
                {{ job.description || '暂无职位描述...' }}
              </div>
            </div>
            
            <div v-if="job.notes" class="p-4 bg-yellow-50 border border-yellow-100 rounded-lg rotate-0 shadow-sm relative overflow-hidden">
              <div class="absolute top-0 right-0 w-4 h-4 bg-yellow-200/50 -mr-2 -mt-2 rotate-45"></div>
              <h4 class="text-xs font-bold text-yellow-600/70 uppercase tracking-wider mb-1">我的备注</h4>
              <p class="text-sm text-stone-600 font-handwriting">{{ job.notes }}</p>
            </div>
          </div>

          <!-- 右侧：面试、联系人、文件 -->
          <div class="space-y-6">
            <!-- 下一次面试 (详情页重复显示，保持信息完整性) -->
            <div v-if="job.nextInterview">
              <h4 class="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">日程安排</h4>
              <div class="flex items-start gap-3 p-3 bg-amber-50/50 border border-amber-100 rounded-lg shadow-sm">
                <div class="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-bold text-stone-800">{{ job.nextInterview }}</div>
                  <div class="text-xs text-stone-500 mt-0.5">请提前准备简历与作品集</div>
                </div>
              </div>
            </div>
            
            <!-- 联系人 -->
            <div v-if="job.contacts && job.contacts.length > 0">
               <h4 class="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">联系人</h4>
               <div class="space-y-2">
                 <div v-for="(contact, idx) in job.contacts" :key="idx" class="flex items-center gap-3 p-2 bg-white rounded-lg border border-stone-100">
                    <div class="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-500">
                      {{ contact.name[0] }}
                    </div>
                    <div class="overflow-hidden">
                      <div class="text-sm font-medium text-stone-700 truncate">{{ contact.name }}</div>
                      <div class="text-xs text-stone-400 truncate">{{ contact.role || 'HR / Recruiter' }}</div>
                    </div>
                 </div>
               </div>
            </div>

            <!-- 文件附件 -->
            <div>
              <h4 class="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>相关文件</span>
                <button class="text-stone-400 hover:text-stone-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </h4>
              <div class="space-y-2">
                <div v-if="job.files && job.files.length > 0">
                  <div v-for="(file, idx) in job.files" :key="idx" class="flex items-center justify-between p-2 bg-stone-100/50 rounded border border-stone-200/50 text-xs">
                    <span class="text-stone-600 truncate max-w-[120px]">{{ file.name }}</span>
                    <span class="text-stone-400">{{ file.size }}</span>
                  </div>
                </div>
                <div v-else class="text-xs text-stone-400 italic text-center py-2 bg-stone-50 rounded border border-dashed border-stone-200">
                  暂无附件
                </div>
              </div>
            </div>

          </div>
        </div>
        
        <!-- 收起按钮 -->
        <div class="mt-8 flex justify-center border-t border-stone-100 pt-4">
          <button 
            @click.stop="toggleExpand"
            class="text-xs text-stone-400 hover:text-stone-600 flex items-center gap-1 transition-colors px-4 py-2 hover:bg-stone-100 rounded-full"
          >
            <span>收起详情</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { JobApplication } from '../types'
import StatusBadge from './StatusBadge.vue'
import JobProgressBar from './JobProgressBar.vue'
import PriorityBadge from './PriorityBadge.vue'

const props = defineProps<{
  job: JobApplication
}>()

const expanded = ref(false)

const toggleExpand = () => {
  expanded.value = !expanded.value
}
</script>
