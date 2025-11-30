export type JobStatus = 'Applying' | 'Interviewing' | 'Offer' | 'Rejected'
export type JobPriority = 'Low' | 'Medium' | 'High' | 'Urgent'

export interface TimelineNode {
  stage: string
  date?: string
  completed: boolean
  current: boolean
  detail?: string
}

export interface ContactPerson {
  name: string
  role?: string
  email?: string
  phone?: string
  avatar?: string // URL or initial
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
  progress: number
  timeline: TimelineNode[]
  updatedAt: string
  deadline?: string
  description?: string
  nextInterview?: string // Display text
  nextInterviewDate?: string // ISO date for sorting
  notes?: string
  contacts?: ContactPerson[]
  files?: Attachment[]
}
