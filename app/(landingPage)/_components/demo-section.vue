<template>
  <section id="demo" class="py-20 lg:py-[80px] bg-[#0f172a] w-full">
    <div class="w-full px-6 lg:px-8">
      <div class="max-w-[900px] mx-auto text-center mb-8">
        <h2 class="text-[26px] lg:text-[30px] font-bold tracking-tight text-white mb-2">See it in action</h2>
        <p class="text-[14px] text-slate-400">Paste JD → get fixes → post-mortem to assets → @ mention in resume.</p>
      </div>

      <div class="w-[80%] max-w-[960px] mx-auto">
        <div
          class="rounded-lg bg-slate-700/50 border border-slate-600/50 aspect-video flex items-center justify-center overflow-hidden"
        >
          <div class="text-center py-12 px-6">
            <div
              class="w-16 h-16 rounded-full border-2 border-slate-500 flex items-center justify-center mx-auto mb-3 text-slate-400 hover:text-white hover:border-slate-400 transition-colors cursor-pointer"
            >
              <PlayIcon class="w-8 h-8 ml-1" />
            </div>
            <p class="text-sm font-medium text-slate-400">Video (10–15 sec)</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PlayIcon } from '@heroicons/vue/24/outline'
</script>
