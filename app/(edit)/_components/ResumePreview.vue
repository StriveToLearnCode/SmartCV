<script setup lang="ts">
import { computed } from 'vue'
import { type ResumeData } from '../composables/useResume'

const props = defineProps<{
  resume: ResumeData
  highlightKeywords?: string[]
}>()

const highlightText = (text: string) => {
  if (!text) return ''
  if (!props.highlightKeywords || props.highlightKeywords.length === 0) return text

  const escapedKeywords = props.highlightKeywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  if (escapedKeywords.length === 0) return text

  const pattern = new RegExp(`(${escapedKeywords.join('|')})`, 'gi')
  return text.replace(
    pattern,
    '<span class="bg-yellow-200/60 px-0.5 rounded-sm mx-0.5 decoration-clone box-decoration-clone">$1</span>'
  )
}

const isModern = computed(() => props.resume.template === 'modern')
const isMinimal = computed(() => props.resume.template === 'minimal')
const isClassic = computed(() => !props.resume.template || props.resume.template === 'classic')

// For Modern Layout
const leftSections = computed(() => {
  // In modern layout, we put skills in the sidebar. 
  // We could also add 'summary' here if we wanted a narrow summary, but usually summary is wide.
  return props.resume.sections.filter(s => s.type === 'skills' && s.isVisible)
})

const rightSections = computed(() => {
  return props.resume.sections.filter(s => s.type !== 'skills' && s.isVisible)
})
</script>

<template>
  <div class="w-full h-full bg-white shadow-sm overflow-hidden flex flex-col relative print-container font-serif">
    
    <!-- ================================================================== -->
    <!-- CLASSIC & MINIMAL LAYOUT (Single Column)                           -->
    <!-- ================================================================== -->
    <div v-if="!isModern" class="flex-1 overflow-y-auto relative z-0 text-stone-900 leading-relaxed h-full"
         :class="[ isMinimal ? 'p-8 md:p-12' : 'p-12 md:p-16' ]">
         
      <!-- 纸质纹理 (仅 Classic) -->
      <div v-if="isClassic" class="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none z-10 mix-blend-multiply fixed z-0"></div>

      <!-- Header -->
      <header class="relative z-10 mb-10 pb-6" :class="[ isClassic ? 'border-b-2 border-stone-800' : 'border-b border-stone-100' ]">
        <h1 class="text-5xl font-bold text-stone-900 mb-4 tracking-tight leading-tight" :class="{ 'text-4xl': isMinimal }">{{ resume.basics.name }}</h1>
        <p class="text-xl text-stone-600 italic mb-6 font-light" :class="{ 'text-stone-800 not-italic font-normal': isMinimal }">{{ resume.basics.title }}</p>
        <div class="flex flex-wrap gap-x-6 gap-y-2 text-stone-500 text-sm tracking-wide" :class="{ 'text-stone-400': isMinimal }">
          <span v-if="resume.basics.phone" class="flex items-center gap-2">
            <span v-if="isClassic">📞</span> {{ resume.basics.phone }}
          </span>
          <span v-if="resume.basics.email" class="flex items-center gap-2">
            <span v-if="isClassic">✉️</span> {{ resume.basics.email }}
          </span>
          <span v-if="resume.basics.location" class="flex items-center gap-2">
            <span v-if="isClassic">📍</span> {{ resume.basics.location }}
          </span>
          <span v-if="resume.basics.website" class="flex items-center gap-2">
            <span v-if="isClassic">🔗</span> {{ resume.basics.website }}
          </span>
        </div>
      </header>

      <!-- Dynamic Sections -->
      <div class="space-y-10 relative z-10">
        <template v-for="section in resume.sections" :key="section.id">
          <div v-if="section.isVisible">
            <!-- Title -->
            <h2
              v-if="isClassic"
              class="text-lg font-bold text-stone-900 uppercase tracking-[0.15em] mb-6 pb-2 border-b border-stone-300 flex items-center gap-3"
            >
              <span class="w-1.5 h-1.5 bg-stone-800 rounded-full"></span>
              {{ section.title }}
            </h2>
            <h2
              v-else
              class="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4"
            >
              {{ section.title }}
            </h2>

            <!-- Content (Shared) -->
            <component :is="'div'">
              <!-- Summary -->
              <div
                v-if="section.type === 'summary'"
                class="text-stone-700 leading-loose text-justify"
                :class="{ 'text-sm': isMinimal }"
                v-html="highlightText(resume.basics.summary)"
              ></div>

              <!-- Education -->
              <div v-if="section.type === 'education'" class="space-y-6">
                <div v-for="edu in resume.education" :key="edu.id">
                  <div class="flex justify-between items-baseline mb-1">
                    <h3 class="font-bold text-stone-900 text-base tracking-wide">{{ edu.institution }}</h3>
                    <span class="text-stone-500 text-sm italic tabular-nums"
                      >{{ edu.startDate }} - {{ edu.endDate }}</span
                    >
                  </div>
                  <div class="flex justify-between text-stone-700 text-sm">
                    <span
                      >{{ edu.area }} <span v-if="edu.studyType" class="text-stone-400 mx-1">/</span>
                      {{ edu.studyType }}</span
                    >
                    <span v-if="edu.score" class="text-stone-500 italic">{{ edu.score }}</span>
                  </div>
                </div>
              </div>

              <!-- Work -->
              <div v-if="section.type === 'work'" class="space-y-8">
                <div v-for="job in resume.work" :key="job.id">
                  <div class="flex justify-between items-baseline mb-2">
                    <h3 class="font-bold text-stone-900 text-base tracking-wide">{{ job.company }}</h3>
                    <span class="text-stone-500 text-sm italic tabular-nums"
                      >{{ job.startDate }} - {{ job.endDate }}</span
                    >
                  </div>
                  <div class="text-stone-800 font-medium text-sm mb-3 italic border-l-2 border-stone-200 pl-3" :class="{ 'border-none pl-0 not-italic': isMinimal }">
                    {{ job.position }}
                  </div>
                  <p
                    v-if="job.summary"
                    class="text-stone-700 text-sm leading-loose mb-3 text-justify"
                    v-html="highlightText(job.summary)"
                  ></p>
                  <ul class="list-disc list-outside ml-4 space-y-2" v-if="job.highlights && job.highlights.length">
                    <li
                      v-for="(highlight, index) in job.highlights"
                      :key="index"
                      class="text-stone-600 text-sm pl-1 leading-relaxed marker:text-stone-300"
                      v-html="highlightText(highlight)"
                    ></li>
                  </ul>
                </div>
              </div>

              <!-- Projects -->
              <div v-if="section.type === 'projects'" class="space-y-6">
                <div v-for="project in resume.projects" :key="project.id">
                  <div class="flex justify-between items-baseline mb-2">
                    <h3 class="font-bold text-stone-900 text-base tracking-wide">{{ project.name }}</h3>
                    <a
                      v-if="project.url"
                      :href="project.url"
                      target="_blank"
                      class="text-stone-400 hover:text-stone-600 text-xs underline decoration-dotted underline-offset-4"
                      >Link ↗</a
                    >
                  </div>
                  <p
                    class="text-stone-700 text-sm leading-loose mb-3 text-justify"
                    v-html="highlightText(project.description)"
                  ></p>
                  <div class="flex gap-2 flex-wrap" v-if="project.keywords && project.keywords.length">
                    <span
                      v-for="keyword in project.keywords"
                      :key="keyword"
                      class="px-2 py-0.5 bg-stone-50 text-stone-500 text-xs rounded-sm border border-stone-200"
                      v-html="highlightText(keyword)"
                    ></span>
                  </div>
                </div>
              </div>

              <!-- Skills -->
              <div v-if="section.type === 'skills'">
                <div class="grid grid-cols-1 gap-6">
                  <div
                    v-for="skill in resume.skills"
                    :key="skill.id"
                    class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 border-b border-dashed border-stone-200 pb-4 last:border-none"
                    :class="{ 'border-none pb-2': isMinimal }"
                  >
                    <span
                      class="font-bold text-stone-800 w-24 shrink-0 pt-0.5 uppercase tracking-wider text-xs"
                      >{{ skill.name }}</span
                    >
                    <div class="flex flex-wrap gap-x-4 gap-y-2 flex-1">
                      <span
                        v-for="kw in skill.keywords"
                        :key="kw"
                        class="text-stone-700 text-sm relative after:content-['/'] after:text-stone-300 after:mx-2 last:after:content-none"
                        v-html="highlightText(kw)"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Custom -->
              <div v-if="section.type === 'custom'" class="space-y-6">
                <p
                  class="text-stone-700 text-sm leading-loose text-justify whitespace-pre-wrap"
                  v-if="resume.custom && resume.custom[section.id]"
                  v-html="highlightText(resume.custom[section.id])"
                ></p>
              </div>
            </component>
          </div>
        </template>
      </div>
    </div>

    <!-- ================================================================== -->
    <!-- MODERN LAYOUT (Two Columns)                                        -->
    <!-- ================================================================== -->
    <div v-else class="flex flex-row h-full w-full text-stone-800">
      
      <!-- LEFT COLUMN -->
      <aside class="w-[32%] min-w-[260px] bg-slate-50 h-full border-r border-stone-200 p-8 overflow-y-auto">
        
        <!-- Basics Header in Sidebar -->
        <div class="mb-10">
          <h1 class="text-3xl font-bold text-slate-900 mb-2 leading-tight">{{ resume.basics.name }}</h1>
          <p class="text-base text-slate-600 font-medium mb-6">{{ resume.basics.title }}</p>
          
          <div class="flex flex-col gap-3 text-sm text-slate-500">
            <span v-if="resume.basics.phone" class="flex items-center gap-3">
              <span class="w-4 text-center">📱</span> {{ resume.basics.phone }}
            </span>
            <span v-if="resume.basics.email" class="flex items-center gap-3 break-all">
              <span class="w-4 text-center">✉️</span> {{ resume.basics.email }}
            </span>
            <span v-if="resume.basics.location" class="flex items-center gap-3">
              <span class="w-4 text-center">📍</span> {{ resume.basics.location }}
            </span>
            <span v-if="resume.basics.website" class="flex items-center gap-3 break-all">
              <span class="w-4 text-center">🔗</span> <span class="text-xs">{{ resume.basics.website }}</span>
            </span>
          </div>
        </div>

        <!-- Sidebar Sections (Skills) -->
        <div class="space-y-8">
          <template v-for="section in leftSections" :key="section.id">
            <div>
              <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-200 pb-1">{{ section.title }}</h3>
              
              <!-- Skills Rendering -->
              <div v-if="section.type === 'skills'" class="space-y-4">
                <div v-for="skill in resume.skills" :key="skill.id">
                  <div class="font-bold text-slate-700 text-sm mb-1">{{ skill.name }}</div>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="kw in skill.keywords"
                      :key="kw"
                      class="px-2 py-0.5 bg-white border border-slate-200 rounded text-xs text-slate-600"
                      v-html="highlightText(kw)"
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>

      </aside>

      <!-- RIGHT COLUMN -->
      <main class="flex-1 h-full overflow-y-auto p-10 bg-white">
        <div class="space-y-10 max-w-3xl mx-auto">
          
          <template v-for="section in rightSections" :key="section.id">
             <div class="group">
                <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 pb-2 border-b-2 border-slate-100">
                  {{ section.title }}
                </h2>

                <!-- Summary -->
                <div v-if="section.type === 'summary'">
                   <p class="text-slate-600 leading-relaxed" v-html="highlightText(resume.basics.summary)"></p>
                </div>

                <!-- Education -->
                <div v-if="section.type === 'education'" class="space-y-6">
                  <div v-for="edu in resume.education" :key="edu.id" class="relative pl-4 border-l-2 border-slate-100">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                      <h3 class="font-bold text-slate-800">{{ edu.institution }}</h3>
                      <span class="text-slate-400 text-sm font-mono">{{ edu.startDate }} - {{ edu.endDate }}</span>
                    </div>
                    <div class="text-slate-600 text-sm mb-1">{{ edu.area }} <span v-if="edu.studyType" class="text-slate-300">|</span> {{ edu.studyType }}</div>
                    <div v-if="edu.score" class="text-slate-500 text-xs italic">{{ edu.score }}</div>
                  </div>
                </div>

                <!-- Work -->
                <div v-if="section.type === 'work'" class="space-y-8">
                  <div v-for="job in resume.work" :key="job.id">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                       <h3 class="font-bold text-slate-800 text-lg">{{ job.company }}</h3>
                       <span class="text-slate-400 text-sm font-mono">{{ job.startDate }} - {{ job.endDate }}</span>
                    </div>
                    <div class="text-slate-700 font-medium mb-3">{{ job.position }}</div>
                    <p v-if="job.summary" class="text-slate-600 text-sm leading-relaxed mb-2" v-html="highlightText(job.summary)"></p>
                    <ul v-if="job.highlights && job.highlights.length" class="list-disc list-outside ml-4 space-y-1">
                       <li v-for="(hl, idx) in job.highlights" :key="idx" class="text-slate-600 text-sm pl-1" v-html="highlightText(hl)"></li>
                    </ul>
                  </div>
                </div>

                <!-- Projects -->
                <div v-if="section.type === 'projects'" class="space-y-6">
                   <div v-for="proj in resume.projects" :key="proj.id">
                      <div class="flex justify-between items-baseline mb-1">
                         <h3 class="font-bold text-slate-800">{{ proj.name }}</h3>
                         <a v-if="proj.url" :href="proj.url" target="_blank" class="text-blue-500 text-xs hover:underline">查看链接 ↗</a>
                      </div>
                      <p class="text-slate-600 text-sm leading-relaxed mb-2" v-html="highlightText(proj.description)"></p>
                      <div class="flex flex-wrap gap-2" v-if="proj.keywords?.length">
                        <span v-for="tag in proj.keywords" :key="tag" class="text-xs text-slate-400">#{{tag}}</span>
                      </div>
                   </div>
                </div>

                <!-- Custom -->
                <div v-if="section.type === 'custom'">
                   <p class="text-slate-600 leading-relaxed whitespace-pre-wrap" v-if="resume.custom?.[section.id]" v-html="highlightText(resume.custom[section.id])"></p>
                </div>

             </div>
          </template>

        </div>
      </main>

    </div>

  </div>
</template>

<style scoped>
@media print {
  .print-container {
    width: 100%;
    height: auto;
    box-shadow: none;
    overflow: visible;
  }
  /* 打印时确保背景色生效 */
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}

.bg-paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
}

/* Fixed background behavior */
.fixed-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
