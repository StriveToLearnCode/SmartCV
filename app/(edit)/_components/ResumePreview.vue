<script setup lang="ts">
import { type ResumeData } from '../composables/useResume'

const props = defineProps<{
  resume: ResumeData
  highlightKeywords?: string[]
}>()

const highlightText = (text: string) => {
  if (!text) return ''
  if (!props.highlightKeywords || props.highlightKeywords.length === 0) return text
  
  // Simple keyword matching - in production use a robust highlighter to handle overlaps/html
  const escapedKeywords = props.highlightKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  if (escapedKeywords.length === 0) return text
  
  const pattern = new RegExp(`(${escapedKeywords.join('|')})`, 'gi')
  return text.replace(pattern, '<span class="bg-yellow-200/50 border-b border-amber-300/50 font-medium text-stone-900 px-0.5 rounded-sm">$1</span>')
}
</script>

<template>
  <div class="w-full h-full bg-white shadow-sm overflow-hidden flex flex-col relative print-container">
    <!-- 纸质纹理覆盖 -->
    <div class="absolute inset-0 bg-paper-texture opacity-60 pointer-events-none z-10 mix-blend-multiply"></div>
    
    <div class="flex-1 p-12 md:p-16 overflow-y-auto relative z-0 text-stone-900">
      
      <!-- Header (Basics) -->
      <header class="mb-10 border-b-2 border-stone-800 pb-8">
        <h1 class="text-5xl font-serif font-bold text-stone-900 mb-4 tracking-wide leading-tight">{{ resume.basics.name }}</h1>
        <p class="text-xl text-stone-600 font-serif italic mb-6">{{ resume.basics.title }}</p>
        <div class="flex flex-wrap gap-x-6 gap-y-2 text-stone-600 text-sm font-serif tracking-wide">
          <span v-if="resume.basics.phone" class="flex items-center gap-2">
             <span class="i-lucide-phone w-3 h-3"></span> {{ resume.basics.phone }}
          </span>
          <span v-if="resume.basics.email" class="flex items-center gap-2">
             <span class="i-lucide-mail w-3 h-3"></span> {{ resume.basics.email }}
          </span>
          <span v-if="resume.basics.location" class="flex items-center gap-2">
             <span class="i-lucide-map-pin w-3 h-3"></span> {{ resume.basics.location }}
          </span>
          <span v-if="resume.basics.website" class="flex items-center gap-2">
             <span class="i-lucide-link w-3 h-3"></span> {{ resume.basics.website }}
          </span>
        </div>
      </header>

      <!-- Dynamic Sections -->
      <div class="space-y-10">
        <template v-for="section in resume.sections" :key="section.id">
          <div v-if="section.isVisible">
            
            <!-- Title -->
            <h2 class="text-lg font-bold text-stone-900 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-stone-300 flex items-center gap-3">
               <span class="w-1.5 h-1.5 bg-stone-800 rounded-full"></span>
               {{ section.title }}
            </h2>

            <!-- Summary -->
            <div v-if="section.type === 'summary'" 
              class="text-stone-700 leading-loose font-serif text-sm text-justify"
              v-html="highlightText(resume.basics.summary)"
            ></div>

            <!-- Education -->
            <div v-if="section.type === 'education'" class="space-y-6">
              <div v-for="edu in resume.education" :key="edu.id">
                <div class="flex justify-between items-baseline mb-1">
                  <h3 class="font-bold text-stone-900 text-base tracking-wide">{{ edu.institution }}</h3>
                  <span class="text-stone-500 text-sm font-serif italic tabular-nums">{{ edu.startDate }} - {{ edu.endDate }}</span>
                </div>
                <div class="flex justify-between text-stone-700 text-sm font-serif">
                  <span>{{ edu.area }} <span v-if="edu.studyType">· {{ edu.studyType }}</span></span>
                  <span v-if="edu.score" class="text-stone-500">{{ edu.score }}</span>
                </div>
              </div>
            </div>

            <!-- Work -->
            <div v-if="section.type === 'work'" class="space-y-8">
               <div v-for="job in resume.work" :key="job.id">
                <div class="flex justify-between items-baseline mb-2">
                  <h3 class="font-bold text-stone-900 text-base tracking-wide">{{ job.company }}</h3>
                  <span class="text-stone-500 text-sm font-serif italic tabular-nums">{{ job.startDate }} - {{ job.endDate }}</span>
                </div>
                <div class="text-stone-800 font-medium text-sm mb-3 italic">{{ job.position }}</div>
                <p v-if="job.summary" 
                   class="text-stone-700 text-sm leading-relaxed font-serif mb-3 text-justify"
                   v-html="highlightText(job.summary)"
                ></p>
                <ul class="list-disc list-outside ml-4 space-y-1.5" v-if="job.highlights && job.highlights.length">
                  <li v-for="(highlight, index) in job.highlights" :key="index" 
                      class="text-stone-600 text-sm font-serif pl-1 leading-relaxed"
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
                    <a v-if="project.url" :href="project.url" target="_blank" class="text-stone-400 hover:text-stone-600 text-xs underline decoration-stone-300 underline-offset-4">Project Link ↗</a>
                  </div>
                  <p 
                     class="text-stone-700 text-sm leading-relaxed font-serif mb-3 text-justify"
                     v-html="highlightText(project.description)"
                  ></p>
                  <div class="flex gap-2 flex-wrap" v-if="project.keywords && project.keywords.length">
                    <span v-for="keyword in project.keywords" :key="keyword" 
                          class="px-2 py-0.5 bg-stone-100 text-stone-500 text-xs rounded-sm border border-stone-200 font-mono"
                          v-html="highlightText(keyword)"
                    ></span>
                  </div>
               </div>
            </div>

            <!-- Skills -->
            <div v-if="section.type === 'skills'">
              <div class="grid grid-cols-1 gap-4">
                <div v-for="skill in resume.skills" :key="skill.id" class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                  <span class="font-bold text-stone-800 text-sm w-24 shrink-0 pt-0.5">{{ skill.name }}</span>
                  <div class="flex flex-wrap gap-x-4 gap-y-2 flex-1">
                    <span v-for="kw in skill.keywords" :key="kw" 
                          class="text-stone-600 text-sm font-serif relative after:content-['•'] after:absolute after:-right-3 after:text-stone-300 last:after:content-none mr-1"
                          v-html="highlightText(kw)"
                    ></span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Custom -->
             <div v-if="section.type === 'custom'" class="space-y-6">
               <p class="text-stone-700 text-sm leading-relaxed font-serif text-justify whitespace-pre-wrap" 
                  v-if="resume.custom && resume.custom[section.id]"
                  v-html="highlightText(resume.custom[section.id])"
               ></p>
             </div>

          </div>
        </template>
      </div>

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
}

/* A4 Ratio Aspect if needed, but handled by parent container usually */
</style>
