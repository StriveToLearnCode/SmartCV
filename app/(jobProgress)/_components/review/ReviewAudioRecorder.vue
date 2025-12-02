<template>
  <div>
    <div class="flex justify-between items-center mb-2">
      <label class="text-xs font-bold text-stone-500 uppercase flex items-center gap-2">
        面试录音
        <span
          class="px-1.5 py-0.5 bg-stone-100 text-[10px] text-stone-400 rounded border border-stone-200 font-normal"
          >AI 识别</span
        >
      </label>
    </div>

    <!-- Upload State -->
    <div
      v-if="!modelValue?.name"
      class="border-2 border-dashed border-stone-200 rounded-xl p-4 text-center hover:border-stone-300 hover:bg-stone-50 transition-all cursor-pointer group"
      @click="triggerFileInput"
    >
      <input
        type="file"
        accept="audio/*"
        class="hidden"
        ref="fileInputRef"
        @click.stop
        @change="handleAudioUpload"
      />
      <div class="text-stone-400 group-hover:text-stone-600 flex flex-col items-center gap-2">
        <div
          class="w-10 h-10 rounded-full bg-white border border-stone-100 shadow-sm flex items-center justify-center text-xl mb-1 group-hover:scale-110 transition-transform"
        >
          🎙️
        </div>
        <span class="text-xs font-medium">点击上传面试录音 (MP3, M4A)</span>
        <span class="text-[10px] text-stone-300">AI 将自动识别并生成复盘建议</span>
      </div>
    </div>

    <!-- Player & Actions State -->
    <div
      v-else
      class="bg-white border border-stone-200 rounded-xl p-3 shadow-[2px_2px_6px_rgba(0,0,0,0.02)]"
    >
      <div class="flex items-center gap-3 mb-3 pb-3 border-b border-stone-100">
        <div
          class="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center text-lg animate-pulse-slow"
        >
          🎵
        </div>
        <div class="flex-1 overflow-hidden">
          <div class="text-xs font-bold text-stone-700 truncate">{{ modelValue.name }}</div>
          <div class="text-[10px] text-stone-400 flex items-center gap-2">
            <span>{{ modelValue.duration || '未知时长' }}</span>
            <span class="w-1 h-1 bg-stone-300 rounded-full"></span>
            <span>{{
              (modelValue.file?.size
                ? (modelValue.file.size / 1024 / 1024).toFixed(2)
                : '0') + ' MB'
            }}</span>
          </div>
        </div>
        <button
          @click="removeAudio"
          class="w-8 h-8 rounded-full hover:bg-red-50 text-stone-400 hover:text-red-500 flex items-center justify-center transition-colors"
          title="删除录音"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!-- Transcribe Action -->
      <div v-if="!modelValue.transcription && !modelValue.isTranscribing">
        <button
          @click="startTranscription"
          class="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold rounded-lg shadow-md hover:shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 transform active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clip-rule="evenodd"
            />
          </svg>
          开始智能识别 (AI)
        </button>
      </div>

      <!-- Transcribing State -->
      <div
        v-else-if="modelValue.isTranscribing"
        class="w-full py-2 bg-stone-50 text-stone-500 text-xs font-bold rounded-lg border border-stone-100 flex items-center justify-center gap-2 relative overflow-hidden"
      >
        <!-- Progress Bar Mock -->
        <div class="absolute bottom-0 left-0 h-0.5 bg-indigo-500 animate-progress w-full"></div>
        <span class="animate-spin text-indigo-500">⏳</span> 正在识别与转录中...
      </div>

      <!-- Transcribed Result -->
      <div v-else class="mt-1 animate-fade-in">
        <div class="text-[10px] text-stone-400 mb-2 flex justify-between items-center px-1">
          <span class="font-bold text-indigo-900 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3 text-emerald-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            识别完成
          </span>
          <button
            @click="handleAppendTranscript"
            class="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-2 py-0.5 rounded transition-colors text-[10px] font-medium border border-transparent hover:border-indigo-100"
          >
            ↙ 填入下方记录
          </button>
        </div>
        <div
          class="bg-stone-50 rounded-lg p-3 text-xs text-stone-600 max-h-32 overflow-y-auto border border-stone-100 leading-relaxed font-serif italic select-text"
        >
          "{{ modelValue.transcription }}"
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AudioRecording } from '../../types' // Make sure AudioRecording is exported or use any/inline

// Assuming AudioRecording type exists in types.ts. If not, I might need to define it locally or import TimelineNode.
// The original file used TimelineNode which had audioRecording property.
// Let's assume we pass the audioRecording object directly.

const props = defineProps<{
  modelValue?: any // Should be AudioRecording | undefined
}>()

const emit = defineEmits(['update:modelValue', 'change', 'append', 'auto-save'])

const fileInputRef = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const handleAudioUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    const newRecording = {
      file: file,
      url: URL.createObjectURL(file),
      name: file.name,
      duration: '00:00',
      isTranscribing: false
    }
    emit('update:modelValue', newRecording)
    emit('change')
    emit('auto-save')
  }
  input.value = ''
}

const removeAudio = () => {
  if (props.modelValue?.url) {
    URL.revokeObjectURL(props.modelValue.url)
  }
  emit('update:modelValue', undefined)
  emit('change')
  emit('auto-save')
}

const startTranscription = () => {
  if (!props.modelValue) return
  
  // We need to emit an update to set isTranscribing = true
  const updated = { ...props.modelValue, isTranscribing: true }
  emit('update:modelValue', updated)
  
  // Mock Transcription
  setTimeout(() => {
    const finalRecording = {
      ...updated,
      isTranscribing: false,
      transcription: '面试官首先询问了关于 Vue3 响应式系统的理解，我解释了 Proxy 的作用。接着讨论了浏览器事件循环机制，特别是微任务和宏任务的区别。最后问到了项目中的性能优化实践，我提到了懒加载和虚拟列表，但在具体实现细节上回答得不够流畅。'
    }
    emit('update:modelValue', finalRecording)
    emit('change')
    emit('auto-save')
    
    // Check if we should auto append (logic was in parent) - let parent handle checking questions length
    // But here we can emit an event 'transcription-complete'
    emit('append', finalRecording.transcription)
  }, 3000)
}

const handleAppendTranscript = () => {
  if (props.modelValue?.transcription) {
    emit('append', props.modelValue.transcription)
  }
}
</script>

<style scoped>
.animate-progress {
  animation: progress 3s linear infinite;
}
@keyframes progress {
  0% {
    width: 0%;
    opacity: 1;
  }
  50% {
    width: 70%;
    opacity: 1;
  }
  100% {
    width: 100%;
    opacity: 0;
  }
}
.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.animate-fade-in {
  animation: fade-in 0.4s ease-out forwards;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

