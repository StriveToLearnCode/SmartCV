import { ref, computed } from 'vue'

export type GuideStatus = 'resume_incomplete' | 'interview_review' | 'job_match' | 'all_good'

interface GuideState {
  status: GuideStatus
  message: string
  subMessage?: string
  actionLabel?: string
  action?: () => void
}

export function useUserGuide() {
  // Mock State - in real app this would come from stores
  const incompleteModules = ref(2)
  const unreviewedInterviews = ref(1)
  const jobMatchScore = ref(78)
  
  const currentGuide = computed<GuideState>(() => {
    // 1. Priority: Unfinished Resume
    if (incompleteModules.value > 0) {
      return {
        status: 'resume_incomplete',
        message: `你还有 ${incompleteModules.value} 个模块未完成`,
        subMessage: '完善经历有助于提高 30% 的求职成功率',
        actionLabel: '去完善'
      }
    }

    // 2. Priority: Interview Review
    if (unreviewedInterviews.value > 0) {
      return {
        status: 'interview_review',
        message: `你有 ${unreviewedInterviews.value} 条未复盘的面试`,
        subMessage: '及时复盘是成长的关键',
        actionLabel: '去复盘'
      }
    }

    // 3. Priority: Job Match (If resume is good)
    if (jobMatchScore.value > 0) {
      return {
        status: 'job_match',
        message: `最近发布的简历匹配 ${jobMatchScore.value}% 的岗位`,
        subMessage: '建议针对薄弱项进行针对性优化',
        actionLabel: '查看详情'
      }
    }

    return {
      status: 'all_good',
      message: '一切准备就绪',
      subMessage: '保持自信，祝你求职顺利！'
    }
  })

  return {
    currentGuide
  }
}

