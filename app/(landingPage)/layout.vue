<template>
  <div class="lp min-h-screen bg-[#FFFFFF] text-[#111827]">
    <Header />
    <main class="space-y-0">
      <Hero />
      <StatusBar />
      <Features />
      <FlowStepper />
      <DemoSection />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from './_components/header.vue'
import Hero from './_components/hero.vue'
import StatusBar from './_components/status-bar.vue'
import Features from './_components/features.vue'
import FlowStepper from './_components/flow-stepper.vue'
import DemoSection from './_components/demo-section.vue'
import Footer from './_components/footer.vue'
</script>

<style scoped>
/* A 风格设计 token（首页统一） */
.lp {
  --lp-text: #111827;
  --lp-subtext: #525866;
  --lp-muted: #8a8f98;
  --lp-border: #e9ebef;
  --lp-bg: #ffffff;
  --lp-bg-subtle: #f7f8fa;
  --lp-primary: #111827;
  --lp-radius-card: 16px;
  --lp-radius-button: 12px;
  --lp-shadow: 0 8px 30px rgba(17, 24, 39, 0.08);
}
</style>
