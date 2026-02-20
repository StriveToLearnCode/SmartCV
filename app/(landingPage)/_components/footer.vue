<template>
  <footer class="py-8 border-t border-[#E9EBEF] bg-[#FFFFFF]">
    <div class="mx-auto max-w-[1160px] px-6 lg:px-8">
      <div class="flex flex-wrap items-center justify-center gap-6 text-sm text-[#8A8F98]">
        <a href="/privacy" class="hover:text-[#111827] transition-colors">Privacy</a>
        <a href="/terms" class="hover:text-[#111827] transition-colors">Terms</a>
        <a href="/contact" class="hover:text-[#111827] transition-colors">Contact</a>
      </div>
      <p class="text-center text-[12px] text-[#8A8F98] mt-4">
        &copy; {{ new Date().getFullYear() }} InterviewKit. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>
