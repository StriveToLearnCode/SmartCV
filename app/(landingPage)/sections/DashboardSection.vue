<template>
  <section class="py-24 px-4 md:px-12 bg-[#fafaf9] relative overflow-hidden">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
      <!-- 左侧：功能列表 -->
      <div>
        <div class="mb-10">
          <span class="font-serif text-stone-500 italic text-lg block mb-2">Workspace</span>
          <h2 class="font-serif-display font-medium text-4xl text-stone-800 tracking-tight mb-6">
            全流程求职管理
          </h2>
          <p class="text-stone-600 font-sans font-light leading-relaxed mb-8">
            不再为混乱的投递记录烦恼。SmartCV 提供一站式工作台，从简历创建到最终入职，每一个环节都井井有条。
          </p>
        </div>

        <div class="space-y-6">
          <div v-for="item in features" :key="item.title" class="flex gap-4 group cursor-pointer">
            <div class="w-12 h-12 rounded-sm bg-white border border-stone-200 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all text-xl shrink-0">
              {{ item.icon }}
            </div>
            <div>
              <h3 class="font-serif text-lg font-medium text-stone-800 group-hover:text-stone-600 transition-colors">
                {{ item.title }}
              </h3>
              <p class="text-stone-500 text-sm font-light mt-1">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-10">
           <button class="px-8 py-3 bg-stone-800 text-stone-50 text-sm font-medium uppercase tracking-widest hover:bg-stone-700 transition-all rounded-sm shadow-sm">
             进入工作台
           </button>
        </div>
      </div>

      <!-- 右侧：抽象 Dashboard 示意 -->
      <div class="relative">
        <!-- 底层装饰 -->
        <div class="absolute -inset-4 bg-stone-200/50 rotate-2 rounded-sm z-0"></div>
        
        <!-- 主面板 -->
        <div class="bg-white border border-stone-200 shadow-paper p-6 rounded-sm relative z-10 min-h-[400px] flex flex-col">
           <!-- Header -->
           <div class="h-12 border-b border-stone-100 flex justify-between items-center mb-6">
             <div class="w-32 h-4 bg-stone-100 rounded-sm"></div>
             <div class="flex gap-2">
               <div class="w-8 h-8 bg-stone-50 rounded-full"></div>
               <div class="w-24 h-8 bg-stone-800 rounded-sm"></div>
             </div>
           </div>

           <!-- 看板列 -->
           <div class="flex gap-4 flex-1 overflow-hidden">
             <div class="w-1/3 bg-stone-50/50 rounded-sm p-3 space-y-3">
                <div class="w-20 h-3 bg-stone-200 rounded-sm mb-2"></div>
                <!-- Card 1 -->
                <div class="bg-white p-3 border border-stone-100 shadow-sm rounded-sm space-y-2">
                   <div class="w-full h-3 bg-stone-800/10 rounded-sm"></div>
                   <div class="w-2/3 h-2 bg-stone-100 rounded-sm"></div>
                   <div class="flex justify-between mt-2">
                     <div class="w-6 h-6 rounded-full bg-stone-100"></div>
                     <div class="w-12 h-4 bg-green-100/50 text-green-800 rounded-xs"></div>
                   </div>
                </div>
                <!-- Card 2 -->
                 <div class="bg-white p-3 border border-stone-100 shadow-sm rounded-sm space-y-2">
                   <div class="w-3/4 h-3 bg-stone-800/10 rounded-sm"></div>
                   <div class="w-1/2 h-2 bg-stone-100 rounded-sm"></div>
                </div>
             </div>

             <div class="w-1/3 bg-stone-50/50 rounded-sm p-3 space-y-3">
                <div class="w-20 h-3 bg-stone-200 rounded-sm mb-2"></div>
                <div class="bg-white p-3 border border-stone-100 shadow-sm rounded-sm space-y-2 opacity-80">
                   <div class="w-full h-3 bg-stone-800/10 rounded-sm"></div>
                   <div class="w-2/3 h-2 bg-stone-100 rounded-sm"></div>
                </div>
             </div>

             <div class="w-1/3 bg-stone-50/50 rounded-sm p-3 space-y-3 opacity-60">
                <div class="w-20 h-3 bg-stone-200 rounded-sm mb-2"></div>
             </div>
           </div>
        </div>

        <!-- 悬浮元素：PDF 导出 -->
        <div class="absolute -bottom-6 -right-6 bg-white p-4 border border-stone-200 shadow-paper-float rounded-sm z-20 w-48 rotate-[-3deg] flex items-center gap-3">
          <div class="w-10 h-12 bg-red-50 border border-red-100 flex items-center justify-center text-red-400 font-bold text-xs">PDF</div>
          <div>
            <div class="text-xs font-bold text-stone-800">Resume_v2.pdf</div>
            <div class="text-[10px] text-stone-400">Export successful</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    title: '简历版本管理',
    desc: '为不同岗位创建不同版本的简历，随时切换，一键复制。',
    icon: '📑'
  },
  {
    title: '求职看板',
    desc: '可视化管理所有投递记录，从初筛到面试，进度一目了然。',
    icon: '📋'
  },
  {
    title: '多格式导出',
    desc: '支持高清 PDF 导出，保留完整排版格式，ATS 解析无障碍。',
    icon: '📥'
  }
]
</script>

<style scoped>
.shadow-paper {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
}
.shadow-paper-float {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
}
</style>

