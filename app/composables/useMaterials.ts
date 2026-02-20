import { ref, computed } from 'vue'

/** 素材版本：原回答 → AI 优化 → 实战修改 */
export interface MaterialVersion {
  id: string
  label: string // 原回答 | AI 优化版本 | 实战修改版本
  content: string
  updatedAt: string
  /** 版本标签：面试高通过率、简历匹配高、模拟面试优化 等 */
  versionTags?: string[]
}

/** 标签：岗位、技术、场景、难度，便于复用与筛选 */
export interface MaterialTags {
  role?: string[] // 岗位
  tech?: string[] // 技术
  scenario?: string[] // 场景
  difficulty?: string // 难度：初/中/高
}

export interface Material {
  id: string
  title: string
  category: string
  content: string
  fileUrl?: string
  date?: string
  /** 可标签化：岗位、技术、场景、难度 */
  tags?: MaterialTags
  /** 可进化：版本链 */
  versions?: MaterialVersion[]
  /** 数据价值：使用次数、通过次数、成功率 */
  useCount?: number
  passCount?: number
  lastUsedAt?: string
  /** 成功率较上周期变化（百分点），如 +6 */
  successRateChange?: number
  /** 能力维度分（1-10）：结构清晰度、量化能力、匹配度 等 */
  abilityDims?: Record<string, number>
  /** 当前推荐使用的版本 id（默认取最后一版） */
  recommendedVersionId?: string
  /** 优化建议：可增加业务规模数据、可强调性能指标 等 */
  optimizationSuggestions?: string[]
}

const materials = ref<Material[]>([
  {
    id: 'cert-001',
    title: 'PMP 项目管理专业人士认证',
    category: '职业证书',
    content: 'PMI颁发，项目管理专业人士(PMP)认证。掌握项目启动、规划、执行、监控和收尾五大过程组。',
    fileUrl: '/assets/mock-pmp.pdf',
    date: 'Jun 2025',
    tags: { role: ['项目经理'], tech: ['PMP'], scenario: ['简历', '面试'], difficulty: '高' },
    versions: [
      { id: 'v1', label: '原描述', content: 'PMP 认证，项目管理。', updatedAt: '2025-06-01' },
      {
        id: 'v2',
        label: 'AI 优化版本',
        content: 'PMI 颁发的项目管理专业人士(PMP)认证，掌握五大过程组与十大知识领域。',
        updatedAt: '2025-06-02'
      },
      {
        id: 'v3',
        label: '实战修改版本',
        content: 'PMI颁发，项目管理专业人士(PMP)认证。掌握项目启动、规划、执行、监控和收尾五大过程组。',
        updatedAt: '2025-06-15'
      }
    ],
    useCount: 5,
    passCount: 3,
    lastUsedAt: '2025-02-10'
  },
  {
    id: 'cert-002',
    title: 'AWS 解决方案架构师助理级',
    category: '职业证书',
    content: 'AWS Certified Solutions Architect – Associate。具备在AWS上设计分布式系统的能力。',
    fileUrl: '/assets/mock-aws.pdf',
    date: 'Aug 2025',
    tags: { role: ['后端', '架构'], tech: ['AWS', '云'], scenario: ['简历', 'JD 匹配'], difficulty: '中' },
    versions: [
      { id: 'v1', label: '原描述', content: 'AWS SAA 认证。', updatedAt: '2025-08-01' },
      {
        id: 'v2',
        label: 'AI 优化版本',
        content: 'AWS Certified Solutions Architect – Associate，具备在 AWS 上设计可扩展、高可用分布式系统的能力。',
        updatedAt: '2025-08-05'
      }
    ],
    useCount: 3,
    passCount: 2,
    lastUsedAt: '2025-02-08'
  },
  {
    id: 'exp-001',
    title: '字节跳动前端实习',
    category: '实习经历',
    content: '2025.06-2025.09，在互娱研发部门负责抖音活动页开发，使用Vue3+TS，优化首屏加载速度提升30%。',
    date: 'Sep 2025',
    tags: { role: ['前端'], tech: ['Vue3', 'TypeScript'], scenario: ['简历', '面试', 'STAR'], difficulty: '中' },
    versions: [
      { id: 'v1', label: '原回答', content: '在字节做前端，写活动页。', updatedAt: '2025-06-01' },
      {
        id: 'v2',
        label: 'AI 优化版本',
        content: '2025.06-2025.09 在互娱研发部门负责抖音活动页开发，Vue3+TS，首屏加载提升 30%。',
        updatedAt: '2025-06-02'
      },
      {
        id: 'v3',
        label: '实战修改版本',
        content: '2025.06-2025.09，在互娱研发部门负责抖音活动页开发，使用Vue3+TS，优化首屏加载速度提升30%。',
        updatedAt: '2025-09-01',
        versionTags: ['面试高通过率', '简历匹配高']
      }
    ],
    useCount: 8,
    passCount: 5,
    lastUsedAt: '2025-02-12',
    successRateChange: 6,
    abilityDims: { 结构清晰度: 8, 量化能力: 7, 匹配度: 9 },
    recommendedVersionId: 'v3',
    optimizationSuggestions: ['可增加业务规模数据（如 DAU、QPS）', '可强调性能指标（首屏时间、错误率）']
  },
  {
    id: 'qa-001',
    title: 'Vue 3 响应式原理（面试题）',
    category: '面试问答',
    content: 'Vue 3 用 Proxy 替代 defineProperty，get 里 track、set 里 trigger，配合 Reflect 与 WeakMap。',
    date: 'Feb 2025',
    tags: { role: ['前端'], tech: ['Vue3', '原理'], scenario: ['模拟面试', '面试复盘'], difficulty: '中' },
    versions: [
      { id: 'v1', label: '原回答', content: '用 Proxy 做响应式。', updatedAt: '2025-02-01' },
      {
        id: 'v2',
        label: 'AI 优化版本',
        content:
          'Vue 3 用 Proxy 替代 Object.defineProperty 做响应式。在 get 里用 track 做依赖收集，在 set 里用 trigger 派发更新；配合 Reflect 与 WeakMap。',
        updatedAt: '2025-02-02'
      }
    ],
    useCount: 3,
    passCount: 2,
    lastUsedAt: '2025-02-12',
    successRateChange: 4,
    abilityDims: { 结构清晰度: 9, 量化能力: 5, 匹配度: 8 },
    recommendedVersionId: 'v2',
    optimizationSuggestions: ['可补充原理与源码的对应关系']
  },
  {
    id: 'proj-001',
    title: '个人博客系统',
    category: '项目经历',
    content: '全栈开发个人博客，前端Next.js，后端NestJS，数据库PostgreSQL，部署在Vercel。',
    date: 'Dec 2024',
    tags: {
      role: ['全栈', '前端'],
      tech: ['Next.js', 'NestJS', 'PostgreSQL'],
      scenario: ['简历', 'JD'],
      difficulty: '初'
    },
    versions: [
      { id: 'v1', label: '原描述', content: '用 Next 和 Nest 写了个博客。', updatedAt: '2024-12-01' },
      {
        id: 'v2',
        label: 'AI 优化版本',
        content: '全栈开发个人博客，前端 Next.js、后端 NestJS、数据库 PostgreSQL，部署在 Vercel。',
        updatedAt: '2024-12-05'
      }
    ],
    useCount: 4,
    passCount: 1,
    lastUsedAt: '2025-02-05',
    successRateChange: -2,
    abilityDims: { 结构清晰度: 6, 量化能力: 5, 匹配度: 6 },
    optimizationSuggestions: ['可补充技术选型理由', '可增加可观测性（监控、日志）']
  }
])

/** 成功率（用于排序与展示） */
function successRate(m: Material): number {
  const use = m.useCount ?? 0
  if (use === 0) return 0
  return Math.round(((m.passCount ?? 0) / use) * 100)
}

export function useMaterials() {
  const addMaterial = (material: Omit<Material, 'id'> & { id?: string }) => {
    const id = material.id ?? `mat-${Date.now()}`
    materials.value.push({
      ...material,
      id,
      useCount: material.useCount ?? 0,
      passCount: material.passCount ?? 0,
      versions: material.versions ?? [
        { id: 'v1', label: '原回答', content: material.content, updatedAt: new Date().toISOString().slice(0, 10) }
      ]
    })
  }

  const getMaterialById = (id: string) => {
    return materials.value.find((m) => m.id === id)
  }

  /** 记录使用（写简历 / 面试等场景引用后调用） */
  const recordUse = (id: string, passed?: boolean) => {
    const m = materials.value.find((m) => m.id === id)
    if (!m) return
    m.useCount = (m.useCount ?? 0) + 1
    if (passed === true) m.passCount = (m.passCount ?? 0) + 1
    m.lastUsedAt = new Date().toISOString().slice(0, 10)
  }

  /** 添加新版本（可进化） */
  const addVersion = (id: string, label: string, content: string) => {
    const m = materials.value.find((m) => m.id === id)
    if (!m) return
    const list = m.versions ?? []
    list.push({
      id: `v${list.length + 1}`,
      label,
      content,
      updatedAt: new Date().toISOString().slice(0, 10)
    })
    m.versions = list
    m.content = content
  }

  const updateMaterialTags = (id: string, tags: Partial<MaterialTags>) => {
    const m = materials.value.find((m) => m.id === id)
    if (!m) return
    m.tags = { ...m.tags, ...tags }
  }

  return {
    materials,
    addMaterial,
    getMaterialById,
    recordUse,
    addVersion,
    updateMaterialTags,
    successRate
  }
}
