---
name: interviewkit-ui-theme
description: InterviewKit UI 主题与组件规范 - Notion 风格。现代、优雅、文档化的设计系统，强调阅读体验与笔记感。
---

# InterviewKit UI Design System (Notion Style)

## 产品定位

InterviewKit 是一个 **AI 面试复盘工具**，但我们不再冷冰冰。我们希望像一份**精心整理的 Notion 笔记**，结构清晰、阅读舒适，让用户在复盘时感到从容。

---

## Product Personality（产品性格）

- **Documentary**（文档感）- 像在阅读一篇高质量笔记
- **Elegant**（优雅）- 良好的排版和留白
- **Organized**（条理）- 结构化但不过分生硬
- **Human**（人性化）- 允许使用 Emoji 和柔和色彩

---

## Visual References（视觉参考）

**核心灵感**：

- **Notion**（文档流、Emoji、Callout Blocks、柔和色块）
- **Linear**（极简、现代）- _仅保留其排版的精致感_
- **Craft Docs**（高质量排版）

**设计特征**：

- 📄 **文档流布局**：页面像一张白纸（或深色纸），内容自然流动
- 🎨 **Emoji 图标**：每个页面/板块都有一个代表性 Emoji
- 🧱 **Block 概念**：内容由“块”组成（Callouts, Toggles, Quotes）
- 🌈 **Pastel Colors**：使用低饱和度的柔和背景色（红/黄/蓝/绿背景块）
- 🔲 **极简边框**：极淡的边框或无边框，用背景色区分层级

---

## 全局视觉规则（优先遵守）

详见项目根目录 `docs/VISUAL_RULES.md`，摘要：

- **主色**：仅一个 `#2563EB`（Linear 蓝）；成功绿仅用于「增长/成功率」；删除黄色、浅蓝大块背景、彩色卡片背景。
- **卡片**：白底、1px 浅灰边框、圆角 12px、**无阴影**；层级靠留白。
- **数据**：主指标大号数字、次指标小号灰字、趋势 ↑+绿色、评分为细条+数字、标签为灰色 pill。

---

## Color System（色彩系统）

### Notion Dark Theme

```css
:root {
  /* 基础背景 */
  --bg-primary: #191919; /* Notion 深色主背景 */
  --bg-secondary: #202020; /* 侧边栏/浮层背景 */
  --bg-hover: #2c2c2c; /* 悬停背景 */

  /* 文字颜色 */
  --text-primary: #d4d4d4; /* 主文字 (Notion off-white) */
  --text-secondary: #9b9b9b; /* 次要文字 */
  --text-dim: #6e6e6e; /* 弱化文字 */

  /* 边框 */
  --border: #2f2f2f; /* 极淡的分割线 */

  /* Notion 风格功能色（背景色模式） */
  --bg-red: rgba(224, 108, 117, 0.15);
  --text-red: #ff7b72;

  --bg-blue: rgba(97, 175, 239, 0.15);
  --text-blue: #79c0ff;

  --bg-green: rgba(152, 195, 121, 0.15);
  --text-green: #7ee787;

  --bg-yellow: rgba(229, 192, 123, 0.15);
  --text-yellow: #d2a8ff; /* 借用 purple 调 */

  --bg-gray: rgba(155, 155, 155, 0.1);
  --text-gray: #9b9b9b;
}
```

### 规则

1.  **使用 Callout Blocks**：
    - 不要用实心深色卡片，用**带背景色的块**（Callout）来强调内容。
    - 例如：Verdict 使用 `--bg-blue`，Risk 使用 `--bg-red`。
2.  **Emoji is King**：
    - 标题前必须加 Emoji。
    - `Verdict` -> `📋 总体评估`
    - `Risks` -> `🚨 风险信号`
3.  **圆角**：
    - 统一使用 `6px` 或 `8px`（Notion 的圆角很小）。

---

## Typography（排版）

- **标题**：使用 Sans-serif，字重 600-700。
- **正文**：行高 `1.6`，字号 `15px` 或 `16px`（阅读感）。
- **代码**：JetBrains Mono / Fira Code，使用 Notion 风格的代码块（深灰背景 + 语法高亮）。

---

## SOP 全链路（Notion 版）

### 1. 输入阶段（The "Page"）

- **标题区**：巨大的页面标题 + 图标（如 📝）。
- **属性区**：像 Notion Database 的 Properties（两列布局：Label - Value）。
- **内容区**：极简的编辑器风格输入框，无边框，只有 Placeholder。

### 2. 生成阶段（The "Syncing"）

- 保持极简。
- 使用骨架屏（Skeleton）或简单的 loading spinner（Notion 风格的转圈）。
- 文字提示：“AI 正在整理笔记...”

### 3. 输出阶段（The "Report"）

**布局结构**：

1.  **Header**：Emoji + 大标题（如 "Vue 高级面试复盘"）。
2.  **Properties**：面试时间、岗位、评分（Database 属性样式）。
3.  **Callout Block (Verdict)**：蓝色或灰色背景块，展示核心结论。
4.  **Toggle Lists (Details)**：
    - `▶️ 🔴 核心问题 (Top Problems)` (展开可见详情)
    - `▶️ 🟠 风险信号 (Risk Signals)`
    - `▶️ 🟢 亮点 (Highlights)`
5.  **Checklist (Action Items)**：标准的 checkbox 列表。

---

## Components（组件规范）

### Callout Block（强调块）

```css
.callout {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-radius: 6px;
  background: var(--bg-gray); /* 默认灰色背景 */
  color: var(--text-primary);
}
```

### Toggle List（折叠列表）

使用 `<details>` 和 `<summary>` 实现，箭头图标要小。

### Tags/Badges

Notion 风格的 Tag 是**淡背景 + 深色文字**，圆角 `4px`。

---

## 一句话总结

**把面试复盘变成一篇精美的 Notion 笔记：清晰、优雅、令人想收藏。**
