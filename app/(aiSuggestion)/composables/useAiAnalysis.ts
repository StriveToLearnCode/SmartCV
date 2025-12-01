import { ref, computed, watch } from 'vue'
import { useResume } from '../../(edit)/composables/useResume'
import { type SuggestionItem, CATEGORY_MAP } from '../types'

// 简单实现 lodash 的 get/set 以防未安装
const getValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc: any, part: string) => {
    // Handle array syntax: work[0] -> work, 0
    const arrayMatch = part.match(/(\w+)\[(\d+)\]/)
    if (arrayMatch) {
      return acc && acc[arrayMatch[1]] ? acc[arrayMatch[1]][parseInt(arrayMatch[2])] : undefined
    }
    return acc ? acc[part] : undefined
  }, obj)
}

const setValue = (obj: any, path: string, value: any) => {
  const parts = path.split('.')
  let current = obj
  for (let i = 0; i < parts.length - 1; i++) {
    let part = parts[i]
    const arrayMatch = part.match(/(\w+)\[(\d+)\]/)
    if (arrayMatch) {
      const key = arrayMatch[1]
      const idx = parseInt(arrayMatch[2])
      if (!current[key]) current[key] = []
      if (!current[key][idx]) current[key][idx] = {}
      current = current[key][idx]
    } else {
      if (!current[part]) current[part] = {}
      current = current[part]
    }
  }
  const lastPart = parts[parts.length - 1]
  const lastMatch = lastPart.match(/(\w+)\[(\d+)\]/)
  if (lastMatch) {
    current[lastMatch[1]][parseInt(lastMatch[2])] = value
  } else {
    current[lastPart] = value
  }
}

export function useAiAnalysis() {
  const { resumeData } = useResume()
  const suggestions = ref<SuggestionItem[]>([])
  const activeSuggestionId = ref<string | null>(null)

  // 分析逻辑
  const analyze = () => {
    const list: SuggestionItem[] = []
    const data = resumeData.value

    // --- 1. 基础信息检查 ---
    if (!data.basics.summary || data.basics.summary.length < 10) {
      list.push({
        id: 'basics-summary-missing',
        category: 'basics',
        severity: 'high',
        title: '缺少个人简介',
        message: '个人简介是招聘方第一眼看到的内容，建议补充 50-100 字的自我介绍。',
        targetPath: 'basics.summary',
        originalText: data.basics.summary || '',
        actions: [
          {
            label: '填充模板',
            value:
              '拥有 [X] 年经验的 [职位名称]，专注于 [核心技能]。在 [过往公司] 任职期间，主导了 [核心项目]，成功提升了 [关键指标]。热衷于技术探索与团队协作。',
            preview: '通用专业模板 (需手动填空)'
          }
        ]
      })
    }

    if (!data.basics.phone || !data.basics.email) {
      list.push({
        id: 'basics-contact',
        category: 'basics',
        severity: 'high',
        title: '联系方式不完整',
        message: '请确保电话和邮箱都已填写，否则HR无法联系到你。',
        targetPath: 'basics.phone', // Just focusing on phone for simplicity
        originalText: '缺失'
      })
    }

    // --- 2. 工作经历检查 ---
    data.work.forEach((job: any, index: number) => {
      const path = `work[${index}].summary`
      const content = job.summary || ''

      // 规则：内容过短
      if (content.length > 0 && content.length < 20) {
        list.push({
          id: `work-${job.id}-short`,
          category: 'work',
          severity: 'low',
          title: '工作描述过于简单',
          message: `在 ${job.company} 的经历描述太短，无法体现你的价值。`,
          originalText: content,
          targetPath: path,
          actions: [
            {
              label: 'AI 扩写 (示例)',
              value: `作为核心成员参与了 ${job.company} 的主要业务开发，负责前端架构设计与性能优化。通过引入现代化工程流，提升了团队 30% 的开发效率。`,
              preview: '扩充为包含职责与成果的描述'
            }
          ]
        })
      }

      // 规则：缺少数字量化 (简单正则匹配)
      if (content.length > 50 && !/\d+%?/.test(content)) {
        list.push({
          id: `work-${job.id}-quantify`,
          category: 'work',
          severity: 'high',
          title: '缺少量化成果',
          message: '描述中缺少数字支撑（如：提升了20%性能），量化数据能极大提升简历说服力。',
          originalText: content,
          targetPath: path,
          actions: [
            {
              label: '添加量化数据模板',
              value: content + ' 在职期间，通过优化核心模块，使系统响应速度提升 40%，用户留存率增加 15%。',
              preview: '追加性能与业务数据'
            }
          ]
        })
      }
    })

    // --- 3. 项目经历检查 ---
    data.projects.forEach((proj: any, index: number) => {
      if (!proj.description) {
        list.push({
          id: `proj-${proj.id}-empty`,
          category: 'project',
          severity: 'high',
          title: '项目描述缺失',
          message: `项目 "${proj.name}" 还没有描述。`,
          targetPath: `projects[${index}].description`,
          originalText: '',
          actions: [
            {
              label: '填充 STAR 模板',
              value:
                '项目背景：xxx\n我的任务：负责核心模块开发\n行动：使用了 Vue3 和 TS 重构代码\n结果：减少了 50% 的 Bug 率',
              preview: 'STAR 法则模板'
            }
          ]
        })
      }
    })

    // Merge with existing suggestions state to keep "isFixed" status
    suggestions.value = list.map((newItem) => {
      const existing = suggestions.value.find((old) => old.id === newItem.id)
      if (existing && existing.isFixed) {
        return existing
      }
      return newItem
    })
  }

  // Watch data changes to re-analyze
  watch(
    () => resumeData.value,
    () => {
      // 如果用户正在操作修复，暂停自动重分析以免状态跳变，或者只做增量分析
      // 这里为了演示，每次进入页面分析一次即可，或者手动触发
    },
    { deep: true }
  )

  // 交互逻辑
  const applyAction = (item: SuggestionItem, action: any) => {
    // 1. Save original value for undo
    item.originalValue = getValue(resumeData.value, item.targetPath)

    // 2. Update Store
    setValue(resumeData.value, item.targetPath, action.value)

    // 3. Update UI state
    item.isFixed = true
    activeSuggestionId.value = item.id
  }

  const undoAction = (item: SuggestionItem) => {
    if (item.originalValue !== undefined) {
      setValue(resumeData.value, item.targetPath, item.originalValue)
      item.isFixed = false
    }
  }

  // Computed Properties
  const groupedSuggestions = computed(() => {
    const groups: Record<string, SuggestionItem[]> = {}
    suggestions.value.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = []
      groups[item.category].push(item)
    })

    return Object.keys(groups).map((key) => ({
      category: key,
      items: groups[key] || [],
      criticalCount: (groups[key] || []).filter((i) => i.severity === 'high' && !i.isFixed).length
    }))
  })

  const totalIssues = computed(() => suggestions.value.filter((i) => !i.isFixed).length)

  const issueCounts = computed(() => {
    const counts: Record<string, number> = {}
    suggestions.value.forEach((s) => {
      if (!s.isFixed) {
        counts[s.category] = (counts[s.category] || 0) + 1
      }
    })
    return counts
  })

  const score = computed(() => {
    let base = 100
    suggestions.value.forEach((s) => {
      if (!s.isFixed) {
        base -= s.severity === 'high' ? 10 : 5
      }
    })
    return Math.max(base, 0)
  })

  const scoreColor = computed(() => {
    if (score.value >= 80) return 'text-green-600'
    if (score.value >= 60) return 'text-amber-500'
    return 'text-red-500'
  })

  return {
    resumeData,
    suggestions,
    activeSuggestionId,
    analyze,
    applyAction,
    undoAction,
    groupedSuggestions,
    totalIssues,
    issueCounts,
    score,
    scoreColor,
    categoryMap: CATEGORY_MAP
  }
}

