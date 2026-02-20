import { defineStore } from 'pinia'
export const useThemeStore = defineStore('theme', () => {
  // 初始化：从 localStorage 读取，或使用系统偏好
  const getInitialTheme = () => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored as 'light' | 'dark'

    // 检查系统偏好
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  }

  const theme = ref<'light' | 'dark'>(getInitialTheme())

  // 应用主题到 DOM
  const applyTheme = (newTheme: 'light' | 'dark') => {
    const html = document.documentElement
    if (newTheme === 'dark') {
      html.classList.add('dark')
      html.classList.remove('light')
    } else {
      html.classList.remove('dark')
      html.classList.add('light')
    }
    localStorage.setItem('theme', newTheme)
  }

  // 初始化时应用主题
  applyTheme(theme.value)

  // 监听主题变化
  watch(theme, (newTheme) => {
    applyTheme(newTheme)
  })

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return { theme, toggleTheme }
})
