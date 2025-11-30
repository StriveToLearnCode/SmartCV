<template>
  <div class="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
    <div class="p-6 border-b border-stone-100 flex justify-between items-center">
      <h2 class="text-lg font-bold text-stone-800">求职日程</h2>
      <div class="flex gap-2">
        <button class="px-3 py-1 text-xs font-medium bg-stone-100 rounded hover:bg-stone-200 transition-colors">今天</button>
        <button class="px-3 py-1 text-xs font-medium text-stone-500 hover:text-stone-800 transition-colors">本周</button>
      </div>
    </div>
    
    <div class="p-6 grid grid-cols-1 lg:grid-cols-7 gap-6">
      <!-- Simple Calendar Grid (Mock for this week) -->
      <div v-for="(day, idx) in weekDays" :key="idx" class="min-h-[200px] bg-stone-50/50 rounded-xl border border-stone-100 p-3 flex flex-col gap-3">
        <div class="text-center mb-2">
          <div class="text-xs text-stone-400">{{ day.name }}</div>
          <div class="text-sm font-bold text-stone-800" :class="{'text-blue-600': day.isToday}">{{ day.date }}</div>
        </div>
        
        <!-- Events -->
        <div 
          v-for="event in getEventsForDay(day.fullDate)" 
          :key="event.id"
          class="p-2 rounded-lg border text-xs cursor-pointer transition-all hover:scale-105 hover:shadow-md group"
          :class="getEventColor(event.type)"
          @click="$emit('selectEvent', event)"
        >
          <div class="font-bold mb-0.5 truncate">{{ event.title }}</div>
          <div class="text-[10px] opacity-80">{{ event.time }}</div>
          <div class="mt-1 flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-current opacity-50"></span>
            <span class="truncate opacity-90">{{ event.company }}</span>
          </div>
        </div>
        
        <div v-if="getEventsForDay(day.fullDate).length === 0" class="flex-1 flex items-center justify-center">
          <span class="text-[10px] text-stone-300 select-none">无安排</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props
const props = defineProps<{
  events: Array<{
    id: string
    title: string
    time: string
    date: string // YYYY-MM-DD
    type: 'interview' | 'deadline' | 'offer'
    company: string
  }>
}>()

defineEmits(['selectEvent'])

// Mock Week Generator
const weekDays = [
  { name: '周一', date: '25', fullDate: '2023-11-25', isToday: false },
  { name: '周二', date: '26', fullDate: '2023-11-26', isToday: false },
  { name: '周三', date: '27', fullDate: '2023-11-27', isToday: false },
  { name: '周四', date: '28', fullDate: '2023-11-28', isToday: true },
  { name: '周五', date: '29', fullDate: '2023-11-29', isToday: false },
  { name: '周六', date: '30', fullDate: '2023-11-30', isToday: false },
  { name: '周日', date: '01', fullDate: '2023-12-01', isToday: false },
]

const getEventsForDay = (date: string) => {
  return props.events.filter(e => e.date === date)
}

const getEventColor = (type: string) => {
  switch(type) {
    case 'interview': return 'bg-blue-50 border-blue-100 text-blue-700'
    case 'offer': return 'bg-emerald-50 border-emerald-100 text-emerald-700'
    case 'deadline': return 'bg-amber-50 border-amber-100 text-amber-700'
    default: return 'bg-white border-stone-200 text-stone-600'
  }
}
</script>

