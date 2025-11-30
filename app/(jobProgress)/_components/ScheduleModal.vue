<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
    <div class="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-slide-up overflow-hidden flex flex-col max-h-[90vh]">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
        <h3 class="text-lg font-bold text-stone-800 flex items-center gap-2">
          <span class="w-1.5 h-5 bg-stone-800 rounded-full"></span>
          预约面试
        </h3>
        <button @click="close" class="text-stone-400 hover:text-stone-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-4 overflow-y-auto custom-scrollbar">
        <!-- Type -->
        <div>
          <label class="block text-xs font-bold text-stone-500 uppercase mb-1.5">面试轮次</label>
          <div class="grid grid-cols-4 gap-2">
            <button 
              v-for="type in ['初筛', '技术一面', '技术二面', 'HR面']" 
              :key="type"
              @click="form.type = type"
              class="py-2 text-xs font-bold rounded-lg border transition-all"
              :class="form.type === type ? 'bg-stone-800 text-white border-stone-800 shadow-md' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'"
            >
              {{ type }}
            </button>
          </div>
        </div>

        <!-- Time -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-stone-500 uppercase mb-1.5">日期</label>
            <input type="date" v-model="form.date" class="w-full text-sm p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-stone-400 outline-none transition-colors">
          </div>
          <div>
            <label class="block text-xs font-bold text-stone-500 uppercase mb-1.5">时间</label>
            <input type="time" v-model="form.time" class="w-full text-sm p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-stone-400 outline-none transition-colors">
          </div>
        </div>

        <!-- Duration & Format -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-stone-500 uppercase mb-1.5">预计时长</label>
            <select v-model="form.duration" class="w-full text-sm p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-stone-400 outline-none transition-colors appearance-none">
              <option value="30">30 分钟</option>
              <option value="45">45 分钟</option>
              <option value="60">60 分钟</option>
              <option value="90">90 分钟</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-stone-500 uppercase mb-1.5">形式</label>
             <select v-model="form.format" class="w-full text-sm p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-stone-400 outline-none transition-colors appearance-none">
              <option value="online">线上会议</option>
              <option value="offline">现场面试</option>
              <option value="phone">电话面试</option>
            </select>
          </div>
        </div>

        <!-- Location/Link -->
        <div>
          <label class="block text-xs font-bold text-stone-500 uppercase mb-1.5">
            {{ form.format === 'online' ? '会议链接' : form.format === 'phone' ? '联系电话' : '面试地点' }}
          </label>
          <input 
            type="text" 
            v-model="form.location" 
            :placeholder="form.format === 'online' ? 'Zoom / Tencent Meeting Link...' : '详细地址...'"
            class="w-full text-sm p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-stone-400 outline-none transition-colors"
          >
        </div>

         <!-- Notes -->
        <div>
          <label class="block text-xs font-bold text-stone-500 uppercase mb-1.5">备注 (可选)</label>
          <textarea 
            v-model="form.notes" 
            placeholder="需要准备的材料、注意事项等..."
            class="w-full text-sm p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-stone-400 outline-none transition-colors h-20 resize-none"
          ></textarea>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-6 pt-2 bg-white border-t border-stone-50">
        <button 
          @click="save" 
          class="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl shadow-lg shadow-stone-900/20 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span>确认预约</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  initialData?: any
}>()

const emit = defineEmits(['update:modelValue', 'save'])

const form = reactive({
  type: '技术一面',
  date: '',
  time: '',
  duration: '60',
  format: 'online',
  location: '',
  notes: ''
})

// Initialize date/time to soon
const initForm = () => {
  const now = new Date()
  now.setDate(now.getDate() + 2) // Default to 2 days later
  form.date = now.toISOString().split('T')[0]
  form.time = '14:00'
}

watch(() => props.modelValue, (val) => {
  if (val && !props.initialData) {
    initForm()
  }
})

const close = () => {
  emit('update:modelValue', false)
}

const save = () => {
  emit('save', { ...form })
  close()
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

