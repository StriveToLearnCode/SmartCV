# InterviewKit UI - Notion Style Quickstart

## 🎯 立即体验

所有页面已重构为 Notion 风格（文档感、Emoji、柔和配色）。

### 1. 输入阶段 (The Page)

```
访问: http://localhost:5173/interview-input
```

- **风格**：极简 Notion 页面
- **特点**：大标题 + Emoji，Properties 属性栏，无边框编辑器

### 2. 生成阶段 (The Sync)

```
访问: http://localhost:5173/interview-loading
```

- **风格**：Notion Loading
- **特点**：极简 Spinner，柔和文字提示

### 3. 输出阶段 (The Report)

```
访问: http://localhost:5173/interview-review
```

- **风格**：Notion 笔记
- **特点**：Callout Blocks（提示块）、Toggle Lists（折叠列表）、Checklist

## 🎨 Notion 设计核心

### 1. 布局 (Layout)

- **文档流**：内容从上到下自然流动，像写笔记一样。
- **宽留白**：左右留白（Padding: 96px），阅读舒适。

### 2. 组件 (Components)

#### Callout Block (提示块)

用于 Verdict 或重要提示。

```html
<div class="callout blue">
  <div class="callout-icon">💡</div>
  <div class="callout-content">...</div>
</div>
```

#### Toggle List (折叠列表)

用于展示详细问题，保持页面整洁。

```html
<details class="toggle-block">
  <summary>▶️ 🔴 核心问题</summary>
  <div class="toggle-content">...</div>
</details>
```

#### Properties (属性)

类似 Notion Database 的属性展示。

```html
<div class="property-row">
  <div class="property-label">📅 日期</div>
  <div class="property-value">2023/10/24</div>
</div>
```

### 3. 色彩 (Pastel Colors)

使用低饱和度背景色。

| Color  | Class     | Hex (Bg)        |
| ------ | --------- | --------------- |
| Blue   | `.blue`   | `#2383E2 (15%)` |
| Red    | `.red`    | `#E06C75 (15%)` |
| Yellow | `.yellow` | `#E5C07B (15%)` |

## 🚀 开发指南

1.  **引用 CSS 变量**：所有颜色都定义在 `:root` 中（参考 `interview-input.vue`）。
2.  **使用 Emoji**：标题和 Block 必须配 Emoji。
3.  **保持极简**：不要加复杂的阴影和边框。

---

**一句话总结**：
把面试复盘变成一篇**精美的 Notion 笔记**，清晰、优雅、令人想收藏。
