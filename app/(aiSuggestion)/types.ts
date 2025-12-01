export interface SuggestionAction {
  label: string
  value: any
  preview?: string // If value is too long
}

export interface SuggestionItem {
  id: string
  category: string // 'basics', 'work', 'education', 'project'
  severity: 'high' | 'low'
  title: string
  message: string
  originalText?: string
  targetPath: string // e.g., 'basics.summary', 'work[0].summary'
  originalValue?: any // Store original for undo
  isFixed?: boolean
  actions?: SuggestionAction[]
}

export const CATEGORY_MAP: Record<string, string> = {
  basics: '基本信息',
  work: '工作经历',
  project: '项目经验',
  education: '教育背景',
  skills: '技能特长'
}
