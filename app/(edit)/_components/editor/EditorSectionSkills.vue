<template>
  <div class="space-y-6">
    <div v-for="(skill, idx) in resumeData.skills" :key="skill.id" class="group/item relative">
      <div class="absolute -right-2 -top-2 opacity-0 group-hover/item:opacity-100 transition-opacity z-10">
        <button
          @click="removeItem('skills', skill.id)"
          class="text-stone-300 hover:text-red-500 bg-white rounded-full shadow-sm border border-stone-100 w-5 h-5 flex items-center justify-center text-xs"
        >
          ×
        </button>
      </div>

      <div class="flex flex-col gap-2">
        <input
          v-model="skill.name"
          class="w-full border-b border-stone-200 pb-1 text-sm font-bold text-stone-700 focus:border-stone-800 focus:outline-none bg-transparent"
          placeholder="技能类别 (如: 前端)"
        />

        <textarea
          :value="skill.keywords.join(', ')"
          @input="updateKeywords(skill, $event)"
          class="w-full p-2 bg-stone-50 border border-transparent hover:border-stone-200 rounded text-sm focus:outline-none focus:bg-white focus:border-stone-400 text-stone-600 transition-colors"
          placeholder="输入技能，用逗号分隔..."
          rows="2"
        ></textarea>

        <div class="flex flex-wrap gap-2 mt-1" v-if="skill.keywords.length">
          <span
            v-for="(kw, kwi) in skill.keywords"
            :key="kwi"
            class="px-2 py-0.5 bg-[#fefce8] text-stone-600 text-xs rounded border border-stone-200"
          >
            {{ kw }}
          </span>
        </div>
      </div>
    </div>
    <button
      @click="addItem('skills')"
      class="w-full py-2 text-stone-400 text-xs font-bold uppercase tracking-widest border-t border-dashed border-stone-200 hover:text-stone-600 hover:bg-stone-50 transition-colors"
    >
      + 添加技能组
    </button>
  </div>
</template>
<script setup lang="ts">
import { useResume } from '../../composables/useResume'

const { resumeData, addItem, removeItem } = useResume()

const updateKeywords = (skill: any, event: Event) => {
  const target = event.target as HTMLTextAreaElement
  skill.keywords = target.value.split(',').map((s: string) => s.trim())
}
</script>

