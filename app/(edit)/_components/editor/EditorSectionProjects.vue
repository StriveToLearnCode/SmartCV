<template>
  <div class="space-y-8">
    <div
      v-for="(proj, idx) in resumeData.projects"
      :key="proj.id"
      class="relative pl-6 border-l-2 border-stone-200 group/item"
    >
      <div
        class="absolute -left-[7px] top-0 w-3 h-3 rounded-full bg-white border-2 border-stone-300 group-hover/item:border-stone-500 transition-colors"
      ></div>
      <div class="absolute right-0 top-0 opacity-0 group-hover/item:opacity-100 transition-opacity">
        <button @click="removeItem('projects', proj.id)" class="text-stone-300 hover:text-red-500">×</button>
      </div>

      <InputField label="项目名称" v-model="proj.name" />

      <div class="mt-4">
        <div class="flex justify-between items-end mb-2">
          <label class="text-[10px] font-bold text-stone-400 uppercase tracking-wider ml-1">项目描述</label>
          <button
            @click="toggleStarGuide(proj.id)"
            class="text-[10px] font-bold flex items-center gap-1 px-2 py-1 rounded-sm border transition-all group/btn"
            :class="
              activeGuideId === proj.id
                ? 'bg-amber-50 border-amber-200 text-amber-700'
                : 'bg-white border-stone-200 text-stone-500 hover:border-amber-200 hover:text-amber-600'
            "
          >
            <span class="group-hover/btn:animate-bounce">✨</span>
            {{ activeGuideId === proj.id ? '收起助手' : '理不清思路？' }}
          </button>
        </div>

        <StarGuide
          v-if="activeGuideId === proj.id"
          :initial-value="proj.description"
          @update:modelValue="proj.description = $event"
          @close="activeGuideId = null"
        />

        <textarea
          v-else
          v-model="proj.description"
          rows="4"
          placeholder="这个项目最让你自豪的是什么？"
          class="w-full p-3 bg-[#fdfdfc] border-2 border-dashed border-stone-200 rounded-sm text-stone-800 text-sm focus:outline-none focus:border-stone-400 transition-all resize-none placeholder:text-stone-300/50 leading-relaxed font-serif"
        ></textarea>
      </div>
    </div>
    <button
      @click="handleAdd"
      class="w-full py-2 text-stone-400 text-xs font-bold uppercase tracking-widest border-t border-dashed border-stone-200 hover:text-stone-600 hover:bg-stone-50 transition-colors"
    >
      + 添加项目经验
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
  const id = addItem('projects')
  activeGuideId.value = id
}
</script>

