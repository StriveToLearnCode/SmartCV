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
  // Use a "highlighter pen" style span
  return text.replace(pattern, '<span class="bg-yellow-200/60 px-0.5 rounded-sm mx-0.5 decoration-clone box-decoration-clone">$1</span>')
}
</script>

<template>
  <div class="w-full h-full bg-white shadow-sm overflow-hidden flex flex-col relative print-container font-serif">
    <!-- 纸质纹理覆盖 -->
    <div class="absolute inset-0 bg-paper-texture opacity-30 pointer-events-none z-10 mix-blend-multiply"></div>
    
    <div class="flex-1 p-12 md:p-16 overflow-y-auto relative z-0 text-stone-900 leading-relaxed">
      
      <!-- Header (Basics) -->
      <header class="mb-12 border-b-2 border-stone-800 pb-8">
        <h1 class="text-5xl font-bold text-stone-900 mb-4 tracking-tight leading-tight">{{ resume.basics.name }}</h1>
        <p class="text-xl text-stone-600 italic mb-6 font-light">{{ resume.basics.title }}</p>
        <div class="flex flex-wrap gap-x-6 gap-y-2 text-stone-500 text-sm tracking-wide">
          <span v-if="resume.basics.phone" class="flex items-center gap-2">
             <span>📞</span> {{ resume.basics.phone }}
          </span>
          <span v-if="resume.basics.email" class="flex items-center gap-2">
             <span>✉️</span> {{ resume.basics.email }}
          </span>
          <span v-if="resume.basics.location" class="flex items-center gap-2">
             <span>📍</span> {{ resume.basics.location }}
          </span>
          <span v-if="resume.basics.website" class="flex items-center gap-2">
             <span>🔗</span> {{ resume.basics.website }}
          </span>
        </div>
      </header>

      <!-- Dynamic Sections -->
      <div class="space-y-10">
        <template v-for="section in resume.sections" :key="section.id">
          <div v-if="section.isVisible">
            
            <!-- Title -->
            <h2 class="text-lg font-bold text-stone-900 uppercase tracking-[0.15em] mb-6 pb-2 border-b border-stone-300 flex items-center gap-3">
               <span class="w-1.5 h-1.5 bg-stone-800 rounded-full"></span>
               {{ section.title }}
            </h2>

            <!-- Summary -->
            <div v-if="section.type === 'summary'" 
              class="text-stone-700 leading-loose text-justify"
              v-html="highlightText(resume.basics.summary)"
            ></div>

            <!-- Education -->
            <div v-if="section.type === 'education'" class="space-y-6">
              <div v-for="edu in resume.education" :key="edu.id">
                <div class="flex justify-between items-baseline mb-1">
                  <h3 class="font-bold text-stone-900 text-base tracking-wide">{{ edu.institution }}</h3>
                  <span class="text-stone-500 text-sm italic tabular-nums">{{ edu.startDate }} - {{ edu.endDate }}</span>
                </div>
                <div class="flex justify-between text-stone-700 text-sm">
                  <span>{{ edu.area }} <span v-if="edu.studyType" class="text-stone-400 mx-1">/</span> {{ edu.studyType }}</span>
                  <span v-if="edu.score" class="text-stone-500 italic">{{ edu.score }}</span>
                </div>
              </div>
            </div>

            <!-- Work -->
            <div v-if="section.type === 'work'" class="space-y-8">
               <div v-for="job in resume.work" :key="job.id">
                <div class="flex justify-between items-baseline mb-2">
                  <h3 class="font-bold text-stone-900 text-base tracking-wide">{{ job.company }}</h3>
                  <span class="text-stone-500 text-sm italic tabular-nums">{{ job.startDate }} - {{ job.endDate }}</span>
                </div>
                <div class="text-stone-800 font-medium text-sm mb-3 italic border-l-2 border-stone-200 pl-3">{{ job.position }}</div>
                <p v-if="job.summary" 
                   class="text-stone-700 text-sm leading-loose mb-3 text-justify"
                   v-html="highlightText(job.summary)"
                ></p>
                <ul class="list-disc list-outside ml-4 space-y-2" v-if="job.highlights && job.highlights.length">
                  <li v-for="(highlight, index) in job.highlights" :key="index" 
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
                    <a v-if="project.url" :href="project.url" target="_blank" class="text-stone-400 hover:text-stone-600 text-xs underline decoration-dotted underline-offset-4">Link ↗</a>
                  </div>
                  <p 
                     class="text-stone-700 text-sm leading-loose mb-3 text-justify"
                     v-html="highlightText(project.description)"
                  ></p>
                  <div class="flex gap-2 flex-wrap" v-if="project.keywords && project.keywords.length">
                    <span v-for="keyword in project.keywords" :key="keyword" 
                          class="px-2 py-0.5 bg-stone-50 text-stone-500 text-xs rounded-sm border border-stone-200"
                          v-html="highlightText(keyword)"
                    ></span>
                  </div>
               </div>
            </div>

            <!-- Skills -->
            <div v-if="section.type === 'skills'">
              <div class="grid grid-cols-1 gap-6">
                <div v-for="skill in resume.skills" :key="skill.id" class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 border-b border-dashed border-stone-200 pb-4 last:border-none">
                  <span class="font-bold text-stone-800 text-sm w-24 shrink-0 pt-0.5 uppercase tracking-wider text-xs">{{ skill.name }}</span>
                  <div class="flex flex-wrap gap-x-4 gap-y-2 flex-1">
                    <span v-for="kw in skill.keywords" :key="kw" 
                          class="text-stone-700 text-sm relative after:content-['/'] after:text-stone-300 after:mx-2 last:after:content-none"
                          v-html="highlightText(kw)"
                    ></span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Custom -->
             <div v-if="section.type === 'custom'" class="space-y-6">
               <p class="text-stone-700 text-sm leading-loose text-justify whitespace-pre-wrap" 
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

.bg-paper-texture {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
}
</style>
