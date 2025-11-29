<template>
  <div>
    <!-- 导航栏 -->
    <Navbar />

    <!-- 主视觉区域 -->
    <HeroSection />

    <!-- 特性介绍区域 -->
    <FeatureSection />

    <!-- 跑马灯 -->
    <MarqueeSection />

    <!-- 页脚 -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import HeroSection from './sections/HeroSection.vue'
import FeatureSection from './sections/FeatureSection.vue'
import MarqueeSection from './sections/MarqueeSection.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<style>
@import './styles/landing.css';
</style>
