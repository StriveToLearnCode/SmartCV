<template>
  <div class="h-screen flex flex-col bg-[var(--bg-primary)] items-center justify-center relative overflow-hidden">
    <!-- Background Gradients -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(59,130,246,0.05)_0%,transparent_70%)]"
      ></div>
    </div>

    <!-- Main Card -->
    <div class="w-full max-w-2xl relative z-10 px-6">
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-[var(--text-primary)] mb-2">Interview Analysis</h1>
        <p class="text-[var(--text-secondary)]">Upload your interview recording to get AI-powered insights.</p>
      </div>

      <div class="card rounded-[12px] p-8 transition-all duration-500" :class="{ 'scale-95 opacity-80': isProcessing }">
        <!-- 1. Upload State -->
        <div v-if="!isProcessing" class="space-y-8">
          <!-- Dropzone -->
          <div
            class="border-2 border-dashed border-[var(--border)] rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 hover:bg-blue-500/5 transition-colors group"
            @click="triggerFileInput"
            @dragover.prevent
            @drop.prevent="handleDrop"
          >
            <input type="file" ref="fileInput" class="hidden" accept="audio/*,video/*" @change="handleFileChange" />
            <div
              class="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform"
            >
              ☁️
            </div>
            <p class="text-[var(--text-primary)] font-medium mb-1">Click to upload or drag and drop</p>
            <p class="text-xs text-[var(--text-secondary)]">MP3, WAV, M4A (Max 50MB)</p>
          </div>

          <!-- Divider -->
          <div class="flex items-center gap-4">
            <div class="h-px bg-[var(--border)] flex-1"></div>
            <span class="text-xs text-[var(--text-secondary)] uppercase tracking-wider">OR</span>
            <div class="h-px bg-[var(--border)] flex-1"></div>
          </div>

          <!-- Record Button -->
          <button
            class="w-full py-3 rounded-xl border border-[var(--border)] hover:bg-[var(--bg-hover)] flex items-center justify-center gap-2 text-[var(--text-primary)] font-medium transition-colors"
          >
            <div class="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            Start Recording
          </button>
        </div>

        <!-- 2. Processing State -->
        <div v-else class="py-12 flex flex-col items-center text-center space-y-6">
          <div class="relative w-24 h-24 flex items-center justify-center">
            <!-- Spinner Ring -->
            <div
              class="absolute inset-0 border-4 border-[var(--border)] border-t-blue-500 rounded-full animate-spin"
            ></div>
            <span class="text-2xl animate-bounce">✨</span>
          </div>

          <div class="space-y-2 max-w-sm">
            <h3 class="text-xl font-bold text-[var(--text-primary)] animate-pulse">
              {{ stageText }}
            </h3>
            <p class="text-sm text-[var(--text-secondary)]">
              Converting speech to text, analyzing sentiment, and extracting key technical questions...
            </p>
          </div>

          <!-- Progress Steps -->
          <div class="flex items-center gap-2 mt-4">
            <div
              v-for="(step, idx) in steps"
              :key="step"
              class="w-2 h-2 rounded-full transition-colors duration-300"
              :class="currentStepIndex >= idx ? 'bg-blue-500' : 'bg-[var(--border)]'"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAiEngine, ProcessingStage } from '@/app/composables/useAiEngine'

const router = useRouter()
const { processInterviewAudio, processingStage } = useAiEngine()

const fileInput = ref<HTMLInputElement | null>(null)
const isProcessing = computed(() => processingStage.value !== 'idle' && processingStage.value !== 'completed')

const steps: ProcessingStage[] = [
  'transcribing',
  'segmenting',
  'identifying',
  'classifying',
  'scoring',
  'extracting',
  'optimizing'
]

const currentStepIndex = computed(() => {
  return steps.indexOf(processingStage.value)
})

const stageText = computed(() => {
  switch (processingStage.value) {
    case 'uploading':
      return 'Uploading Audio...'
    case 'transcribing':
      return 'Transcribing Speech...'
    case 'segmenting':
      return 'Segmenting Conversation...'
    case 'identifying':
      return 'Identifying Questions...'
    case 'classifying':
      return 'Classifying Topics...'
    case 'scoring':
      return 'Evaluating Answers...'
    case 'extracting':
      return 'Structuring Data...'
    case 'optimizing':
      return 'Generating Suggestions...'
    case 'completed':
      return 'Analysis Complete!'
    default:
      return 'Processing...'
  }
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

// const handleFileChange = async (e: Event) => {
//   const target = e.target as HTMLInputElement
//   if (target.files && target.files.length > 0) {
//     const file = target.files[0]
//     if (file) {
//       await startAnalysis(file)
//     }
//   }
// }

// const handleDrop = async (e: DragEvent) => {
//   if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
//     const file = e.dataTransfer.files[0]
//     if (file) {
//       await startAnalysis(file)
//     }
//   }
// }

const handleFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    if (file) {
      await startAnalysis(file)
    }
  }
}

const handleDrop = async (e: DragEvent) => {
  if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
    const file = e.dataTransfer.files[0]
    if (file) {
      await startAnalysis(file)
    }
  }
}

const startAnalysis = async (file: File) => {
  try {
    await processInterviewAudio(file)
    router.push('/dashboard/interview-review') // Updated path
  } catch (error) {
    console.error('Analysis failed', error)
    // Handle error state
  }
}
</script>
