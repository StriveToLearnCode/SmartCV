import type { Component } from 'vue'
import { ChartBarIcon, DocumentTextIcon, BookOpenIcon, SparklesIcon, Squares2X2Icon } from '@heroicons/vue/24/outline'

export interface PageTitleIconOption {
  id: string
  label: string
  component: Component
}

const iconOptions: PageTitleIconOption[] = [
  { id: 'Squares2X2', label: '看板', component: Squares2X2Icon },
  { id: 'ChartBar', label: '图表', component: ChartBarIcon },
  { id: 'Sparkles', label: 'AI', component: SparklesIcon },
  { id: 'BookOpen', label: '素材', component: BookOpenIcon },
  { id: 'DocumentText', label: '简历', component: DocumentTextIcon }
]

export function getPageTitleIcons(): PageTitleIconOption[] {
  return iconOptions
}

export function getPageTitleIconById(id: string | null): Component | null {
  if (!id) return null
  return iconOptions.find((i) => i.id === id)?.component ?? null
}
