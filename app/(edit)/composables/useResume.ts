import { ref, watch } from 'vue'

export interface ResumeSection {
  id: string
  type: 'basics' | 'summary' | 'education' | 'work' | 'projects' | 'skills' | 'custom'
  title: string
  isVisible: boolean
  variant?: string // e.g. 'list', 'matrix', 'cloud', 'timeline'
}

export interface ResumeData {
  template: 'classic' | 'modern' | 'minimal'
  basics: {
    name: string
    email: string
    phone: string
    summary: string
    location: string
    website: string
    title: string
  }
  sections: ResumeSection[]
  education: Array<{
    id: string
    institution: string
    area: string
    studyType: string
    startDate: string
    endDate: string
    score: string
  }>
  work: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    highlights: string[]
    summary: string
  }>
  projects: Array<{
    id: string
    name: string
    description: string
    keywords: string[]
    url: string
  }>
  skills: Array<{
    id: string
    name: string
    level: string
    keywords: string[]
  }>
  custom: Record<string, string>
}

const defaultResume: ResumeData = {
  template: 'classic',
  basics: {
    name: '张三',
    title: '高级前端工程师',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    summary: '资深全栈开发工程师，拥有5年Web开发经验，擅长Vue和Node.js。致力于构建高性能、可扩展的前端应用。',
    location: '北京',
    website: 'github.com/zhangsan'
  },
  sections: [
    { id: 'summary', type: 'summary', title: '个人简介', isVisible: true },
    { id: 'education', type: 'education', title: '教育经历', isVisible: true, variant: 'timeline' },
    { id: 'work', type: 'work', title: '工作经历', isVisible: true, variant: 'timeline' },
    { id: 'projects', type: 'projects', title: '项目经验', isVisible: true },
    { id: 'skills', type: 'skills', title: '专业技能', isVisible: true, variant: 'list' }
  ],
  custom: {},
  education: [
    {
      id: '1',
      institution: '北京大学',
      area: '计算机科学与技术',
      studyType: '本科',
      startDate: '2015-09',
      endDate: '2019-06',
      score: 'GPA 3.8/4.0'
    }
  ],
  work: [
    {
      id: '1',
      company: '某知名互联网公司',
      position: '高级前端工程师',
      startDate: '2019-07',
      endDate: '至今',
      summary: '负责公司核心产品的前端架构设计与开发。',
      highlights: [
        '主导了项目重构，提升了50%的页面加载速度',
        '开发了通用的组件库',
        '引入自动化测试流程，减少了30%的线上Bug'
      ]
    }
  ],
  projects: [
    {
      id: '1',
      name: '智能简历平台',
      description: '一个基于AI的自动简历生成与优化平台。',
      keywords: ['Vue 3', 'TypeScript', 'AI', 'Tailwind CSS'],
      url: ''
    }
  ],
  skills: [
    {
      id: '1',
      name: '前端开发',
      level: '精通',
      keywords: ['Vue.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vite']
    },
    {
      id: '2',
      name: '后端开发',
      level: '熟悉',
      keywords: ['Node.js', 'Express', 'PostgreSQL', 'Redis']
    }
  ]
}

// History management
const HISTORY_LIMIT = 20

// Shared state (Singleton)
const resumeData = ref<ResumeData>(JSON.parse(JSON.stringify(defaultResume)))

// Undo/Redo State
const history = ref<string[]>([JSON.stringify(defaultResume)])
const historyIndex = ref(0)
const isUndoing = ref(false)

watch(
  resumeData,
  (newVal) => {
    if (isUndoing.value) return

    const snapshot = JSON.stringify(newVal)
    if (snapshot === history.value[historyIndex.value]) return

    if (historyIndex.value < history.value.length - 1) {
      history.value = history.value.slice(0, historyIndex.value + 1)
    }

    history.value.push(snapshot)
    if (history.value.length > HISTORY_LIMIT) {
      history.value.shift()
    } else {
      historyIndex.value++
    }
  },
  { deep: true }
)

export const useResume = () => {
  const undo = () => {
    if (historyIndex.value > 0) {
      isUndoing.value = true
      historyIndex.value--
      resumeData.value = JSON.parse(history.value[historyIndex.value])
      setTimeout(() => {
        isUndoing.value = false
      }, 0)
    }
  }

  const redo = () => {
    if (historyIndex.value < history.value.length - 1) {
      isUndoing.value = true
      historyIndex.value++
      resumeData.value = JSON.parse(history.value[historyIndex.value])
      setTimeout(() => {
        isUndoing.value = false
      }, 0)
    }
  }

  const updateBasics = (key: keyof ResumeData['basics'], value: string) => {
    resumeData.value.basics[key] = value
  }

  const addSection = (type: ResumeSection['type'], title: string, variant?: string) => {
    const id = type + '-' + Date.now()
    resumeData.value.sections.push({
      id,
      type,
      title,
      isVisible: true,
      variant
    })

    if (type === 'custom') {
      if (!resumeData.value.custom) resumeData.value.custom = {}
      resumeData.value.custom[id] = ''
    }
  }

  const removeSection = (id: string) => {
    const index = resumeData.value.sections.findIndex((s) => s.id === id)
    if (index !== -1) {
      resumeData.value.sections.splice(index, 1)
    }
  }

  // Helper to add items to arrays (education, work, etc)
  const addItem = (key: 'education' | 'work' | 'projects' | 'skills'): string => {
    const id = Date.now().toString()
    if (key === 'education') {
      resumeData.value.education.push({
        id,
        institution: '',
        area: '',
        studyType: '',
        startDate: '',
        endDate: '',
        score: ''
      })
    } else if (key === 'work') {
      resumeData.value.work.push({
        id,
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        summary: '',
        highlights: []
      })
    } else if (key === 'projects') {
      resumeData.value.projects.push({ id, name: '', description: '', keywords: [], url: '' })
    } else if (key === 'skills') {
      resumeData.value.skills.push({ id, name: '', level: '', keywords: [] })
    }
    return id
  }

  const removeItem = (key: 'education' | 'work' | 'projects' | 'skills', id: string) => {
    const arr = resumeData.value[key] as Array<{ id: string }>
    const index = arr.findIndex((item) => item.id === id)
    if (index !== -1) arr.splice(index, 1)
  }

  return {
    resumeData,
    updateBasics,
    addSection,
    removeSection,
    addItem,
    removeItem,
    undo,
    redo,
    canUndo: () => historyIndex.value > 0,
    canRedo: () => historyIndex.value < history.value.length - 1
  }
}
