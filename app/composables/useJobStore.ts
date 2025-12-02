import { ref, computed } from 'vue'
import type { JobApplication, MainStage } from '../(jobProgress)/types'

// Mock Data (Moved from layout)
const initialJobs: JobApplication[] = [
  {
    id: '1',
    position: '高级前端工程师',
    company: 'TechVision',
    currentMainStage: 'Applied',
    currentSubStage: 'waiting',
    status: 'Applying',
    priority: 'High',
    progress: 30,
    applyPlatform: 'Boss直聘',
    applyDate: '11/24',
    waitingDays: 7,
    updatedAt: '2023-11-24',
    timeline: [
      {
        id: 't1',
        mainStage: 'Applied',
        stage: '投递',
        date: '11/24',
        completed: true,
        current: false,
        subEvents: []
      },
      {
        id: 't2',
        mainStage: 'Applied',
        stage: '等待回音',
        date: '11/25',
        completed: true,
        current: true,
        cheer: '已送达HR，建议2天后跟进',
        subEvents: []
      },
      { id: 't3', mainStage: 'Interview', stage: '一面', completed: false, current: false },
      { id: 't4', mainStage: 'Interview', stage: '二面', completed: false, current: false },
      { id: 't5', mainStage: 'Offer', stage: 'Offer', completed: false, current: false }
    ],
    aiInsight: {
      avgResponseTime: '2-4 天',
      successTrend: '中等',
      nextAction: '该岗位已等待 7 天，建议主动跟进。'
    }
  },
  {
    id: '2',
    position: '产品设计师',
    company: 'CreativeInc',
    currentMainStage: 'Interview',
    currentSubStage: 'first_round',
    status: 'Interviewing',
    priority: 'Urgent',
    progress: 50,
    applyPlatform: '拉勾',
    applyDate: '11/20',
    nextInterview: '初面',
    nextInterviewDate: '2025-12-03 14:00', // Tomorrow relative to user date Dec 2
    timeline: [
      { id: 't1', mainStage: 'Applied', stage: '投递', completed: true, current: false },
      {
        id: 't2',
        mainStage: 'Interview',
        stage: '一面',
        completed: false,
        current: true,
        cheer: '面试官: Alex (Design Lead)'
      }
    ],
    cheatSheet: {
      interviewer: { name: 'Alex', role: 'Design Lead' },
      stories: ['主导过 SaaS 改版', '建立了 Design System'],
      questions: ['设计团队在产品决策中的话语权如何？'],
      keywords: ['UX Research', 'Figma', 'Design Systems']
    }
  }
]

// Global state
const allJobs = ref<JobApplication[]>(initialJobs)

export const useJobStore = () => {
  
  const addJob = (job: JobApplication) => {
    allJobs.value.push(job)
  }

  const updateJobStatus = (jobId: string, newStatus: string) => {
    const job = allJobs.value.find(j => j.id === jobId)
    if (job) {
      // Update logic here (simplified)
      console.log(`Job ${jobId} status updated to ${newStatus}`)
    }
  }

  const getJobById = (id: string) => {
    return allJobs.value.find(j => j.id === id)
  }

  return {
    allJobs,
    addJob,
    updateJobStatus,
    getJobById
  }
}

