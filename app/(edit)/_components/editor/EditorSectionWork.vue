<template>
  <div class="space-y-8">
    <div
      v-for="(job, idx) in resumeData.work"
      :key="job.id"
      class="relative pl-6 border-l-2 border-stone-200 group/item"
    >
      <div
        class="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-white border-2 border-stone-300 group-hover/item:border-stone-500 transition-colors"
      ></div>

      <div class="absolute right-0 top-0 opacity-0 group-hover/item:opacity-100 transition-opacity">
        <button @click="removeItem('work', job.id)" class="text-stone-300 hover:text-red-500">×</button>
      </div>

      <InputField label="公司" v-model="job.company" />
      <InputField label="职位" v-model="job.position" />
      <div class="grid grid-cols-2 gap-x-6 gap-y-2">
        <InputField label="开始时间" v-model="job.startDate" type="text" placeholder="YYYY-MM" />
        <InputField label="结束时间" v-model="job.endDate" type="text" placeholder="YYYY-MM" />
      </div>

      <div class="mt-4">
        <div class="flex justify-between items-end mb-2">
          <label class="text-[10px] font-bold text-stone-400 uppercase tracking-wider ml-1">工作内容</label>
          <button
            @click="toggleStarGuide(job.id)"
            class="text-[10px] font-bold flex items-center gap-1 px-2 py-1 rounded-sm border transition-all group/btn"
            :class="
              activeGuideId === job.id
                ? 'bg-amber-50 border-amber-200 text-amber-700'
                : 'bg-white border-stone-200 text-stone-500 hover:border-amber-200 hover:text-amber-600'
            "
          >
            <span class="group-hover/btn:animate-bounce">✨</span>
            {{ activeGuideId === job.id ? '收起助手' : '不知道怎么写？' }}
          </button>
        </div>

        <StarGuide
          v-if="activeGuideId === job.id"
          :initial-value="job.summary"
          @update:modelValue="job.summary = $event"
          @close="activeGuideId = null"
        />

        <textarea
          v-else
          v-model="job.summary"
          rows="5"
          placeholder="简单描述一下你做了什么，或者点击右上角 '不知道怎么写'，我来帮你..."
          class="w-full p-3 bg-[#fdfdfc] border-2 border-dashed border-stone-200 rounded-sm text-stone-800 text-sm focus:outline-none focus:border-stone-400 transition-all resize-none placeholder:text-stone-300/50 leading-relaxed font-serif"
        ></textarea>
      </div>
    </div>
    <button
      @click="handleAdd"
      class="w-full py-2 text-stone-400 text-xs font-bold uppercase tracking-widest border-t border-dashed border-stone-200 hover:text-stone-600 hover:bg-stone-50 transition-colors"
    >
      + 添加工作经历
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useResume } from '../../composables/useResume'
import InputField from './InputField.vue'
import StarGuide from '../StarGuide.vue'

const { resumeData, addItem, removeItem } = useResume()

const activeGuideId = ref<string | null>(null)

const toggleStarGuide = (id: string) => {
  activeGuideId.value = activeGuideId.value === id ? null : id
}

const handleAdd = () => {
  const id = addItem('work')
  activeGuideId.value = id
}
</script>

