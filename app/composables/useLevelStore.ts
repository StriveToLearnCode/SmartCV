import { ref, computed } from 'vue'

// Level System Configuration
const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500]

interface LevelState {
  currentXp: number
  totalXp: number
  level: number
  title: string
}

const state = ref<LevelState>({
  currentXp: 45,
  totalXp: 45,
  level: 1,
  title: '求职萌新'
})

const TITLES = [
  '求职萌新', // Level 1
  '初露锋芒', // Level 2
  '面霸预备', // Level 3
  'offer收割机', // Level 4
  '职场新星', // Level 5
  '行业专家', // Level 6
  '总监潜质', // Level 7
  'VP候选人', // Level 8
  'CEO预备役', // Level 9
  '创业大亨'  // Level 10
]

export const useLevelStore = () => {
  
  const currentLevelInfo = computed(() => {
    const levelIndex = state.value.level - 1
    const currentThreshold = LEVEL_THRESHOLDS[levelIndex]
    const nextThreshold = LEVEL_THRESHOLDS[levelIndex + 1] || Infinity
    const levelXp = state.value.totalXp - currentThreshold
    const requiredXp = nextThreshold - currentThreshold
    const progress = Math.min(100, Math.max(0, (levelXp / requiredXp) * 100))
    
    return {
      level: state.value.level,
      title: TITLES[levelIndex] || TITLES[TITLES.length - 1],
      progress,
      currentXp: levelXp,
      requiredXp
    }
  })

  const addXp = (amount: number, reason?: string) => {
    state.value.totalXp += amount
    state.value.currentXp += amount
    
    // Check for level up
    const newLevel = LEVEL_THRESHOLDS.findIndex(t => state.value.totalXp < t) 
    // if totalXp is 150 (Thresholds: 0, 100, 300), findIndex returns 2 (300). Level is 2.
    // if totalXp is 50 (Thresholds: 0, 100), findIndex returns 1 (100). Level is 1.
    
    let calculatedLevel = newLevel === -1 ? LEVEL_THRESHOLDS.length : newLevel
    
    if (calculatedLevel > state.value.level) {
      // Level Up!
      state.value.level = calculatedLevel
      state.value.title = TITLES[state.value.level - 1] || TITLES[TITLES.length - 1]
      // TODO: Trigger level up notification/animation
      console.log('Level Up!', state.value.level)
    }
  }

  return {
    state,
    currentLevelInfo,
    addXp
  }
}

