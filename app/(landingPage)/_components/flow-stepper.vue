<template>
  <section class="py-12 lg:py-20 bg-[#F7F8FA]">
    <div class="mx-auto max-w-[1160px] px-6 lg:px-8">
      <h2 class="text-[24px] lg:text-[28px] font-bold tracking-tight text-[#111827] mb-2">One loop</h2>
      <p class="text-[14px] text-[#525866] leading-relaxed mb-10 max-w-xl">
        From resume to pipeline, interview, post-mortem, and reuse.
      </p>

      <!-- 2×2 网格，更紧凑 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-16 md:gap-y-10 max-w-3xl">
        <div v-for="step in steps" :key="step.num" class="py-4 border-b border-[#E9EBEF] last:border-b-0">
          <h3 class="text-[13px] font-semibold uppercase tracking-wider text-[#8A8F98] mb-1">
            {{ step.num }} {{ step.title }}
          </h3>
          <p class="text-[15px] text-[#111827] font-medium">{{ step.headline }}</p>
          <p class="text-[13px] text-[#525866] leading-relaxed mt-0.5">{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  { num: '01', title: 'Import', headline: 'Resume or LinkedIn', desc: 'Bring your existing profile in one click.' },
  {
    num: '02',
    title: 'Analyze',
    headline: 'JD + match score',
    desc: 'See how you stack up against the job description.'
  },
  { num: '03', title: 'Track', headline: 'Pipeline & interviews', desc: 'One board for Applied, Interview, Offer.' },
  { num: '04', title: 'Reuse', headline: 'Post-mortem → library', desc: 'Turn every interview into reusable assets.' }
]
</script>
