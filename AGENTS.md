<skills_system priority="1">

## Available Skills

<!-- SKILLS_TABLE_START -->
<usage>
When users ask you to perform tasks, check if any of the available skills below can help complete the task more effectively. Skills provide specialized capabilities and domain knowledge.

How to use skills:

- Invoke: `npx openskills read <skill-name>` (run in your shell)
  - For multiple: `npx openskills read skill-one,skill-two`
- The skill content will load with detailed instructions on how to complete the task
- Base directory provided in output for resolving bundled resources (references/, scripts/, assets/)

Usage notes:

- Only use skills listed in <available_skills> below
- Do not invoke a skill that is already loaded in your context
- Each skill invocation is stateless
  </usage>

<available_skills>

<skill>
<name>frontend-design</name>
<description>创建具有高设计质量的独特、生产级前端界面。当用户要求构建 Web 组件、页面、制品、海报或应用程序时使用此技能（示例包括网站、落地页、仪表板、React 组件、HTML/CSS 布局，或美化任何 Web UI）。生成富有创意、精致的代码和 UI 设计，避免千篇一律的 AI 美学。</description>
<location>project</location>
</skill>

<skill>
<name>git-rules</name>
<description>git提交规范</description>
<location>project</location>
</skill>

</available_skills>

<!-- SKILLS_TABLE_END -->

</skills_system>
