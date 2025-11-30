<template>
  <div>
    <!-- 导航栏 -->
    <Navbar />

    <!-- 主视觉区域 -->
    <HeroSection />

    <!-- 特性介绍区域 (核心卖点) -->
    <FeatureSection />

    <!-- 模板展示区域 (轮播) -->
    <TemplateSection />

    <!-- 功能看板区域 -->
    <DashboardSection />

    <!-- 页脚 -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import HeroSection from './sections/HeroSection.vue'
import FeatureSection from './sections/FeatureSection.vue'
import TemplateSection from './sections/TemplateSection.vue'
import DashboardSection from './sections/DashboardSection.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<style>
@import './styles/landing.css';
</style>
