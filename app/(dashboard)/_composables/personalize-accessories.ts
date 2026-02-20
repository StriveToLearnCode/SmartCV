/**
 * 个性化「装扮」饰品列表：在固定底图上叠加，不替换 logo
 */
export interface Accessory {
  id: string
  icon: string
  label?: string
}

export const PERSONALIZE_ACCESSORIES: Accessory[] = [
  { id: 'hat', icon: '🎩', label: '帽子' },
  { id: 'mustache', icon: '🧔', label: '胡子' },
  { id: 'scarf', icon: '🧣', label: '围巾' },
  { id: 'flower', icon: '🌸', label: '花' },
  { id: 'pencil', icon: '✏️', label: '铅笔' },
  { id: 'duck', icon: '🐤', label: '小鸭' },
  { id: 'chili', icon: '🌶️', label: '辣椒' },
  { id: 'crown', icon: '👑', label: '皇冠' },
  { id: 'apple', icon: '🍎', label: '苹果' },
  { id: 'leaf', icon: '🍀', label: '叶子' },
  { id: 'wand', icon: '✨', label: '魔法' },
  { id: 'bow', icon: '🎀', label: '领结' },
  { id: 'cowboy', icon: '🤠', label: '牛仔帽' },
  { id: 'tshirt', icon: '👕', label: 'T恤' },
  { id: 'lock', icon: '🔒', label: '锁' }
]

export const DEFAULT_ASSISTANT_NAME = 'SmartCV AI'
export const DEFAULT_ASSISTANT_DESCRIPTION = ''

export function getAccessoryById(id: string | null): Accessory | null {
  if (!id) return null
  return PERSONALIZE_ACCESSORIES.find((a) => a.id === id) ?? null
}
