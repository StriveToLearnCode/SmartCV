# InterviewKit 设计系统使用指南

## 概览

InterviewKit 是一个 **AI 面试复盘工具**，设计风格参考 **GitHub Issue / Code Review**，强调技术报告感、结构化和可扫描性。

## 核心设计原则

### 1. 像技术复盘，不像聊天机器人

- ✅ 结构化卡片 + 清晰边框
- ✅ 短句 + 列表，可快速扫描
- ✅ 技术面试官视角的文案
- ❌ 聊天气泡、emoji、情绪化表达

### 2. 高对比低饱和

- 深色背景 + 浅色文字（对比度 ≥ 7:1）
- 所有颜色饱和度 ≤ 60%
- 危险色使用**低饱和红**（#fca5a5），不用纯红

### 3. 严禁渐变

- 所有颜色必须是纯色块
- 渐变会削弱专业感

### 4. 极度克制的 accent 使用

- 仅用于主按钮和关键词高亮
- 不用于装饰或大面积背景

## 文件结构

```
.claude/skills/frontend-design/
├── SKILL.md                    # 完整设计规范文档
└── README.md                   # 本文件

app/(dashboard)/
├── interview-input.vue         # 输入阶段：技术问卷表单
├── interview-loading.vue       # 生成阶段：进度反馈
└── interview-review.vue        # 输出阶段：结构化报告 + Action Checklist
```

## SOP 全链路流程

### 1️⃣ 输入阶段（interview-input.vue）

**设计要点**：

- 表单风格：技术问卷，不是聊天框
- 大面积文本域，支持粘贴长文本
- 必填项标 `*`，辅助说明置于输入框下方
- 禁止情绪化引导语（如"嗨！让我帮你～"）

**示例文案**：

```
面试记录 *
[大文本框]
粘贴或输入你的面试对话内容...
```

### 2️⃣ 生成阶段（interview-loading.vue）

**设计要点**：

- 进度条 + 状态文字（不用 Spinner）
- 状态文字技术性描述：
  - "正在解析面试记录..."
  - "识别技术问题..."
  - "生成复盘报告..."
- 显示预计剩余时间

**禁止**：

- "AI 正在努力工作～"
- 过于花哨的 Loading 动画
- 无反馈的空白等待

### 3️⃣ 输出阶段（interview-review.vue）

**固定信息层级**（不可更改顺序）：

1. **VERDICT** - 总体判断（首屏可见）
2. **TOP PROBLEMS** - 核心问题（最多 3 条）
3. **RISK SIGNALS** - 风险信号
4. **MISSED QUESTIONS** - 未答好的问题（对比标准答案）
5. **NEXT ACTIONS** - 改进 Checklist（可勾选 + 可导出）

**设计要点**：

- 每个区块有清晰边框
- 使用左侧色块标记严重程度
- Verdict 使用大字号 + 对比色
- 关键词加粗，数据用大字号

## 色彩使用规范

### Dark Theme（默认主题）

```css
--bg-primary: #0b0d12; /* 深色主背景 */
--bg-panel: #111625; /* 卡片背景 */
--border: #1f2740; /* 边框 */

--accent: #3b82f6; /* 强调色（极度克制使用） */
--success: #86efac; /* 成功色（低饱和绿） */
--danger: #fca5a5; /* 危险色（低饱和红） */

--text-main: #eaeef7; /* 主文字 */
--text-muted: #b7c0d6; /* 次要文字 */
--text-dim: #475569; /* 弱化文字 */
```

### 强制约束

1. **主色（accent）极度克制使用**
   - ✅ "生成复盘报告" 主按钮
   - ✅ 关键词高亮（小面积）
   - ❌ 装饰性使用、导航栏高亮

2. **危险色必须低饱和**
   - ✅ #fca5a5（低饱和红）
   - ❌ #ff0000（纯红色，过于刺眼）

3. **禁止黄色/橙色**
   - 理由：黄橙色带有"警告但可接受"的暧昧感

4. **严禁渐变**
   - 理由：渐变像营销页面，削弱专业感

5. **所有卡片必须有边框**
   - 理由：清晰的信息边界

## 组件规范

### Buttons

```vue
<!-- Primary Button: 仅用于关键动作 -->
<button class="btn-primary">生成复盘报告</button>

<!-- Secondary Button: 次要操作 -->
<button class="btn-secondary">重置</button>

<!-- Danger Button: 危险操作 -->
<button class="btn-danger">删除</button>
```

**样式要求**：

- 圆角: 8-12px
- 内边距: px-6 py-3
- 阴影: 无或极轻

### Cards

```vue
<div class="review-card">
  <div class="card-header">
    <h2 class="section-title">VERDICT</h2>
  </div>
  <div class="card-content">
    ...
  </div>
</div>
```

**样式要求**：

- 永远有 border（1px solid --border）
- 永远有 heading
- 圆角: 16-20px
- 内边距: 24px 或 32px
- 阴影: 无或极轻

### Problem List（问题列表）

```vue
<div class="problem-item severity-high">
  <div class="problem-marker"></div>
  <div class="problem-content">
    <div class="problem-title">回答逻辑跳跃</div>
    <div class="problem-description">
      未说明技术背景即直接给出方案...
    </div>
  </div>
</div>
```

**样式要点**：

- 左侧色块标记严重程度
- severity-high: 低饱和红
- severity-medium: 蓝色
- severity-low: 灰色

### Checklist（行动清单）

```vue
<label class="checklist-item">
  <input type="checkbox" v-model="completed" />
  <span class="checklist-text">
    学习 Vue3 响应式原理，并手写简化版 reactive
  </span>
</label>
```

**功能要求**：

- 可勾选
- 已完成项置灰 + 删除线
- 支持导出 Markdown

## 文案规范

### ✅ 正确示例

```
回答逻辑跳跃，未说明背景即直接给出方案。

技术深度不足。在被追问 Redis 持久化时，仅停留在 RDB/AOF 表层。

建议：学习 Vue3 响应式原理，并用项目验证。
```

### ❌ 错误示例

```
加油！你已经很棒了！

不要灰心，下次会更好！

你超越了 60% 的候选人！（除非有数据支撑）
```

### 原则

1. **判断 + 证据 + 建议**
   任何负面反馈必须有具体证据和可执行建议

2. **禁止模糊安慰语**
   如"别担心"、"慢慢来"、"你很优秀"

3. **面试官视角**
   像在写技术面试评价表，不是在写鸡汤文

## 设计自检清单

在输出任何 UI 前，必须自问：

### 视觉检查

- ✅ 这像 GitHub Issue / Code Review 吗？
- ✅ 是否使用清晰边框而非悬浮卡片？
- ✅ 是否严禁渐变？
- ✅ 颜色是否高对比低饱和？
- ✅ 危险色是否使用低饱和红？

### 信息结构检查

- ✅ 信息层级是否严格按：Verdict → Top Problems → Risk Signals → Missed Questions → Next Actions？
- ✅ 首屏是否展示 Verdict + Top Problems（3 秒内看到核心）？
- ✅ 是否使用短句 + 列表而非长段落？

### 语气检查

- ✅ 是否避免鸡汤、情绪化表达？
- ✅ 是否保持技术面试官视角？
- ✅ 是否避免求职平台 / 聊天机器人风格？

### SOP 检查

- ✅ 输入阶段是否像技术问卷（不是聊天框）？
- ✅ Loading 是否有进度反馈？
- ✅ 输出是否结构化 + 可扫描？
- ✅ 行动清单是否可勾选 + 可导出？

## 禁止的设计模式

### ❌ 聊天界面风格

- 气泡对话框
- "AI 正在输入..." 动画
- Emoji 表情或头像

### ❌ 情绪化设计

- 鼓励性文案（"加油！"、"你很棒！"）
- 彩虹渐变或鲜艳配色
- 插画、吉祥物、装饰性图标

### ❌ 求职平台风格

- "匹配度 85%" 的百分比进度环
- "超越 60% 候选人" 的社交对比
- 大量使用绿色（暗示"通过"）

### ❌ 营销页面风格

- 大面积渐变背景
- 3D 悬浮效果
- 闪烁的 CTA 按钮

### ❌ 模糊表达

- "整体表现不错" - 没有具体指标
- "需要提升" - 没有说明如何提升
- "建议多练习" - 没有可执行的清单

## 一句话总结

**InterviewKit 的 UI 像 GitHub Issue 上的 Code Review：冷静、结构化、边界清晰，每一个像素都在说"这是技术复盘报告，不是聊天机器人"。**

## 快速开始

1. 阅读 `SKILL.md` 完整设计规范
2. 查看示例页面：
   - `interview-input.vue` - 输入表单
   - `interview-loading.vue` - Loading 状态
   - `interview-review.vue` - 复盘报告
3. 使用色彩系统 CSS 变量
4. 遵循信息层级和文案规范
5. 完成设计自检清单

## 问题反馈

如发现设计不符合规范，请检查：

1. 是否使用了聊天界面风格？
2. 是否使用了渐变或高饱和色？
3. 是否情绪化表达？
4. 是否违反信息层级顺序？
5. 是否过度使用 accent 颜色？

**记住：InterviewKit 不是在"陪伴用户"，而是在"审查用户"。**
