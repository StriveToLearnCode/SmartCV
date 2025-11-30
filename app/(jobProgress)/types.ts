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

export interface TimelineNode {
  id?: string // Added ID for easier tracking
  stage: string // Display Label (e.g. "Tech 1")
  mainStage: MainStage // Grouping
  date?: string
  completed: boolean
  current: boolean
  detail?: string
  subEvents?: SubEvent[]

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
  count: number
  color: 'gray' | 'blue' | 'green' | 'red'
}
