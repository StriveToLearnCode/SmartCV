<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
    <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-slide-up relative">
      <button @click="$emit('close')" class="absolute top-4 right-4 text-stone-400 hover:text-stone-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <h3 class="text-lg font-bold text-stone-800 mb-6 flex items-center gap-2">
        <span class="w-1.5 h-6 bg-stone-800 rounded-full"></span>
        手动添加记录
      </h3>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Company & Position -->
        <div>
          <label class="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">公司名称</label>
          <input
            v-model="form.company"
            type="text"
            placeholder="例如：字节跳动"
            class="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-stone-400 transition-colors"
            required
          />
        </div>

        <div>
          <label class="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">职位名称</label>
          <input
            v-model="form.position"
            type="text"
            placeholder="例如：高级前端工程师"
            class="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-stone-400 transition-colors"
            required
          />
        </div>

        <!-- Status & Priority -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">当前状态</label>
            <select
              v-model="form.status"
              class="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-stone-400 transition-colors appearance-none"
            >
              <option value="Applying">已投递</option>
              <option value="Interviewing">面试中</option>
              <option value="Offer">已录用</option>
              <option value="Rejected">已挂</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">优先级</label>
            <select
              v-model="form.priority"
              class="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-stone-400 transition-colors appearance-none"
            >
              <option value="Low">低</option>
              <option value="Medium">中</option>
              <option value="High">高</option>
              <option value="Urgent">急</option>
            </select>
          </div>
        </div>

        <!-- Platform & Salary -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">投递平台</label>
            <input
              v-model="form.applyPlatform"
              type="text"
              placeholder="例如：Boss直聘"
              class="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-stone-400 transition-colors"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">薪资范围</label>
            <input
              v-model="form.salary"
              type="text"
              placeholder="例如：25-40k"
              class="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-stone-400 transition-colors"
            />
          </div>
        </div>

        <div class="pt-4 flex justify-end gap-3">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-stone-500 hover:bg-stone-50 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            type="submit"
            class="px-6 py-2 bg-stone-900 text-white text-sm font-bold rounded-lg hover:bg-stone-800 shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            添加记录
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { JobStatus, JobPriority } from '../types'

const emit = defineEmits(['close', 'add'])

const form = ref({
  company: '',
  position: '',
  status: 'Applying' as JobStatus,
  priority: 'Medium' as JobPriority,
  applyPlatform: '',
  salary: ''
})

const handleSubmit = () => {
  emit('add', { ...form.value })
  emit('close')
}
</script>

<style scoped>
.animate-slide-up {
  animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>

