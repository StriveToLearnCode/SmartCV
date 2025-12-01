import { ref, onUnmounted } from 'vue'

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export function useAutoSave() {
  const status = ref<SaveStatus>('idle')
  const lastSavedTime = ref<Date | null>(null)
  const errorMessage = ref<string | null>(null)
  const timeAgo = ref('')
  
  let timer: number | null = null

  const updateTimeAgo = () => {
    if (!lastSavedTime.value) return
    const now = new Date()
    const diff = Math.floor((now.getTime() - lastSavedTime.value.getTime()) / 1000)

    if (diff < 10) {
      timeAgo.value = '刚刚'
    } else if (diff < 60) {
      timeAgo.value = `${diff}秒前`
    } else {
      const minutes = Math.floor(diff / 60)
      timeAgo.value = `${minutes}分钟前`
    }
  }

  const startTimer = () => {
    if (timer) clearInterval(timer)
    timer = window.setInterval(updateTimeAgo, 1000)
  }

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  const triggerSave = async (saveFn: () => Promise<void>) => {
    if (status.value === 'saving') return

    status.value = 'saving'
    errorMessage.value = null

    try {
      // 模拟网络延迟，确保用户能看到“保存中”
      const minDelay = new Promise(resolve => setTimeout(resolve, 500))
      
      await Promise.all([saveFn(), minDelay])
      
      status.value = 'saved'
      lastSavedTime.value = new Date()
      timeAgo.value = '刚刚'
      
      startTimer()
      
    } catch (err) {
      console.error('Auto save failed:', err)
      status.value = 'error'
      errorMessage.value = '网络异常'
      stopTimer()
    }
  }

  const markDirty = () => {
    // 可以在这里处理 dirty 状态逻辑
  }

  onUnmounted(() => {
    stopTimer()
  })

  return {
    status,
    lastSavedTime,
    timeAgo,
    errorMessage,
    triggerSave,
    markDirty
  }
}
