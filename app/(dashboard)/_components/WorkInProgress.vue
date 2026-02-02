<template>
  <div class="grow flex flex-col items-center justify-center min-h-[60vh] opacity-50">
    <div class="w-16 h-16 bg-stone-200 rounded-full mb-4 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-8 h-8 text-stone-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.033a17.255 17.255 0 015.957 5.957l-3.033 2.496m-8.462-8.462A7.5 7.5 0 003 7.5c0 1.566.468 3.014 1.258 4.222m5.83-5.83a7.48 7.48 0 014.093-.929m0 0A7.5 7.5 0 0121 7.5a7.5 7.5 0 01-2.25 5.25m-5.83-5.83l-3.033 2.496a17.255 17.255 0 01-5.957 5.957l2.496 3.033"
        />
      </svg>
    </div>
    <h2 class="text-xl font-serif text-stone-600 mb-2 tracking-wide">
      {{ title }}
    </h2>
    <p class="text-stone-400 text-sm font-serif">正在施工中...</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

