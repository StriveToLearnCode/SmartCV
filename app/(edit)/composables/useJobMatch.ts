import { ref, computed } from 'vue'
import type { ResumeData } from './useResume'

export interface JobMatchResult {
  score: number
  matchedKeywords: string[]
  missingKeywords: string[]
  suggestions: string[]
}

export const useJobMatch = () => {
  const isJobMatchMode = ref(false)
  const jdContent = ref('')
  const isAnalyzing = ref(false)

  // Mock keywords for demonstration - in a real app this would use NLP/AI
  const commonTechKeywords = [
    // Frontend
    'Vue',
    'React',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'HTML',
    'CSS',
    'Tailwind',
    'Sass',
    'Less',
    'Git',
    'Webpack',
    'Vite',
    'Jest',
    'Cypress',
    'Eslint',
    'Prettier',

    // Backend / DevOps
    'REST API',
    'GraphQL',
    'AWS',
    'Docker',
    'Kubernetes',
    'CI/CD',
    'Nginx',
    'Linux',
    'Python',
    'Java',
    'Go',
    'SQL',
    'MongoDB',
    'Redis',

    // Design / Product
    'Figma',
    'Sketch',
    'UI/UX',
    'Photoshop',
    'Axure',
    'Product Management',

    // Soft Skills / Methodologies
    'Agile',
    'Scrum',
    'Kanban',
    'Teamwork',
    'Communication',
    'Leadership',
    'Problem Solving',
    'English',
    'Analysis',
    'Project Management'
  ]

  const analysisResult = ref<JobMatchResult | null>(null)

  const toggleJobMatchMode = () => {
    isJobMatchMode.value = !isJobMatchMode.value
  }

  const analyzeJD = async (resumeData: ResumeData) => {
    if (!jdContent.value.trim()) return

    isAnalyzing.value = true

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simple keyword matching logic
    const jdText = jdContent.value.toLowerCase()
    const resumeText = JSON.stringify(resumeData).toLowerCase()

    const foundKeywords: string[] = []
    const missingKeywords: string[] = []

    // Extract potential keywords from JD (mock implementation)
    // In reality, we'd extract these FROM the JD text.
    // Here we just check which of our "common list" appears in the JD.
    const jdKeywords = commonTechKeywords.filter((k) => jdText.includes(k.toLowerCase()))

    // Check overlap with resume
    jdKeywords.forEach((keyword) => {
      if (resumeText.includes(keyword.toLowerCase())) {
        foundKeywords.push(keyword)
      } else {
        missingKeywords.push(keyword)
      }
    })

    // Calculate score
    const total = jdKeywords.length
    const score = total === 0 ? 0 : Math.round((foundKeywords.length / total) * 100)

    analysisResult.value = {
      score: Math.max(score, 45), // Minimum "encouragement" score
      matchedKeywords: foundKeywords,
      missingKeywords,
      suggestions:
        missingKeywords.length > 0
          ? [`建议在"专业技能"或"项目经历"中补充：${missingKeywords.slice(0, 3).join(', ')}`]
          : ['简历匹配度很高，建议检查排版后导出！']
    }

    isAnalyzing.value = false
  }

  return {
    isJobMatchMode,
    jdContent,
    isAnalyzing,
    analysisResult,
    toggleJobMatchMode,
    analyzeJD
  }
}
