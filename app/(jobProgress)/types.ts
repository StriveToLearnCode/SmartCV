export type JobStatus = 'Applying' | 'Interviewing' | 'Offer' | 'Rejected'
export type JobPriority = 'Low' | 'Medium' | 'High' | 'Urgent'

export type MainStage = 'Applied' | 'Interview' | 'Offer'

export interface SubEvent {
  id: string
  title: string
  date?: string
  type?: 'email' | 'meeting' | 'task' | 'info'
  completed?: boolean
}

export interface GrowthStat {
  category: string
  score: number
  delta: number
}

export interface TimelineNode {
  id?: string // Added ID for easier tracking
  stage: string // Display Label (e.g. "Tech 1")
  mainStage: MainStage // Grouping
  date?: string
  completed: boolean
  current: boolean
  detail?: string
  subEvents?: SubEvent[]
  cheer?: string // Empathetic text for this stage
  actionStatus?: string // e.g. "建议明天跟进"

  // Expanded Details
  interviewer?: string
  interviewType?: 'Onsite' | 'Online' | 'Phone'
  questions?: string // Stored as text or structured
  selfScore?: number
  tags?: string[]
  improvement?: string
  aiSummary?: {
    feedback: string
    weakPoints: string[]
    suggestions: string
  }
  growthStats?: GrowthStat[] // New field
  
  // Audio Review
  audioRecording?: {
    file?: File | null // Runtime only
    url?: string
    name: string
    duration?: string
    transcription?: string
    isTranscribing?: boolean
  }
}

export interface ContactPerson {
  name: string
  role?: string
  email?: string
  phone?: string
  avatar?: string
}

export interface Attachment {
  name: string
  size: string
  type: string
  uploadDate: string
}

export interface CheatSheetData {
  interviewer: {
    name: string
    role: string
  }
  keywords: string[]
  stories: string[]
  questions: string[]
}

export interface JobApplication {
  id: string
  position: string
  company: string
  location?: string
  salary?: string
  status: JobStatus
  priority: JobPriority
  progress: number // 0-100
  currentMainStage: MainStage
  currentSubStage: string // e.g. 'tech1'

  timeline: TimelineNode[]

  updatedAt: string
  deadline?: string
  description?: string
  nextInterview?: string
  nextInterviewDate?: string
  notes?: string
  contacts?: ContactPerson[]
  files?: Attachment[]
  applyPlatform?: string
  applyDate?: string
  waitingDays?: number

  cheatSheet?: CheatSheetData // New field for Interview Cheat Sheet

  aiInsight?: {
    replyRate?: string
    avgResponseTime?: string
    successTrend?: string
    nextAction?: string
  }
}

export interface StageConfig {
  id: string
  label: string
  cheer: string // Default cheer text for main stage
  count: number
  color: 'gray' | 'blue' | 'green' | 'red'
}
