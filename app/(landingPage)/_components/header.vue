<template>
  <header
    class="h-14 flex items-center justify-between px-6 lg:px-8 sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E9EBEF]"
  >
    <RouterLink class="flex items-center gap-2" to="/">
      <span class="text-base font-semibold tracking-tight text-[#111827]">InterviewKit</span>
    </RouterLink>

    <nav class="flex items-center gap-1">
      <RouterLink
        to="/docs"
        class="px-3 py-2 text-sm text-[#525866] hover:text-[#111827] rounded-[12px] transition-colors"
      >
        Docs
      </RouterLink>
      <RouterLink
        to="/pricing"
        class="px-3 py-2 text-sm text-[#525866] hover:text-[#111827] rounded-[12px] transition-colors"
      >
        Pricing
      </RouterLink>
      <div class="w-px h-4 bg-[#E9EBEF] mx-1" aria-hidden="true" />
      <RouterLink
        to="/login"
        class="px-3 py-2 text-sm font-medium text-[#111827] hover:bg-[#F7F8FA] rounded-[12px] transition-colors"
      >
        Log in
      </RouterLink>
      <RouterLink
        to="/register"
        class="ml-1 px-4 py-2 text-sm font-medium bg-[#111827] text-white rounded-[12px] hover:opacity-90 transition-opacity"
      >
        Get started
      </RouterLink>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>
