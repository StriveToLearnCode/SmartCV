<template>
  <div>
    <!-- 头部 -->
    <section>
      <Header />
    </section>
    <!-- 主体 -->
    <section>
      <Main />
    </section>
    <!-- 底部 -->
    <section>
      <Footer />
    </section>
    <!-- 跑马灯 -->
    <section>
      <Swiper />
    </section>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import Footer from './components/Footer.vue'
import Swiper from './components/Swiper.vue'
</script>

<style>
@import './styles/landing.css';
</style>
