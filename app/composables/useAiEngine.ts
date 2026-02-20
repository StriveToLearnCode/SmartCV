import { ref, computed } from 'vue'

export type AnalysisLevel = 'writing' | 'alignment' | 'prediction'

interface OptimizationRequest {
  text: string
  type: 'star' | 'quantify' | 'action-verb' | 'grammar'
}

interface MatchResult {
  score: number
  missingSkills: string[]
  goodMatch: string[]
  suggestions: string[]
}

interface PredictionResult {
  offerProbability: number
  marketTrend: 'hot' | 'stable' | 'cold'
  interviewSuccessRate: number
  nextStepRecommendation: string
}

const isAnalyzing = ref(false)

export function useAiEngine() {
  // Level 1: Writing Enhancement (写作增强)
  const optimizeText = async (req: OptimizationRequest): Promise<string> => {
    isAnalyzing.value = true
    return new Promise((resolve) => {
      setTimeout(() => {
        isAnalyzing.value = false
        switch (req.type) {
          case 'star':
            resolve(
              `<strong>S (Situation):</strong> 面临高并发场景下的页面卡顿问题。<br><strong>T (Task):</strong> 需将首屏加载时间(LCP)从 2.5s 优化至 1.2s 以内。<br><strong>A (Action):</strong> 引入 Web Worker 处理计算密集型任务，并实现虚拟滚动列表。<br><strong>R (Result):</strong> 最终 FPS 稳定在 55+，用户留存率提升 15%。`
            )
            break
          case 'quantify':
            resolve(
              req.text.replace(/提升了性能/g, '提升了 40% 的渲染性能').replace(/很多用户/g, '服务于 10k+ 日活用户')
            )
            break
          case 'action-verb':
            resolve(req.text.replace(/负责/g, '主导').replace(/做过/g, '构建').replace(/帮忙/g, '协助'))
            break
          case 'grammar':
            resolve(req.text + ' (已修正拼写和语序)')
            break
          default:
            resolve(req.text)
        }
      }, 1200)
    })
  }

  // Level 2: Semantic Alignment (语义对齐)
  const analyzeMatch = async (resumeText: string, jdText: string): Promise<MatchResult> => {
    isAnalyzing.value = true
    return new Promise((resolve) => {
      setTimeout(() => {
        isAnalyzing.value = false
        // Mock logic based on keywords
        const score = 78
        resolve({
          score,
          missingSkills: ['Next.js', 'GraphQL', 'CI/CD Pipelines'],
          goodMatch: ['Vue 3', 'TypeScript', 'Performance Optimization'],
          suggestions: [
            'JD 强调 <strong>Next.js</strong>，建议在项目经历中补充 SSR 相关经验（即使是 Vue SSR 也可以作为迁移能力证明）。',
            '缺少 <strong>GraphQL</strong> 关键词，如有相关学习经历建议添加到 Skills 模块。'
          ]
        })
      }, 1500)
    })
  }

  // Level 3: Prediction Model (预测模型)
  const predictOutcome = async (): Promise<PredictionResult> => {
    isAnalyzing.value = true
    return new Promise((resolve) => {
      setTimeout(() => {
        isAnalyzing.value = false
        resolve({
          offerProbability: 65, // Based on current resume + market
          marketTrend: 'stable',
          interviewSuccessRate: 33, // Historical data
          nextStepRecommendation:
            '当前 Offer 概率 65%。若补齐 Next.js 技能并在“系统设计”面试环节表现提升，概率可提升至 85%。建议本周专注于 React/Next.js 的实战项目练习。'
        })
      }, 2000)
    })
  }

  return {
    isAnalyzing,
    optimizeText,
    analyzeMatch,
    predictOutcome
  }
}
