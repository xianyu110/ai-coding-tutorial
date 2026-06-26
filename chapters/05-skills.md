# AI Coding 零基础实战教程

## 第四部分：AI技能系统（Skills）深度实践

> **学习目标**：掌握 Skill 系统的使用与创建，构建个人AI效率工具箱
>
> **完成标志**：能创建自定义 Skill 并集成到 Claude Code 中使用

如果说前面几部分教你的是"怎么和AI对话"，这一部分教你的是"怎么给AI写操作手册" —— 让AI不仅能听懂你的临时指令，还能按照标准化的流程高效执行重复性任务。

还记得 Part 4 开头的 Harness 七层框架吗？Skill 是其中的**第三层**，也是最重要的一层：它把专业知识变成 cc 在需要时按需调用的"外接大脑"。大模型再聪明，也不可能把所有领域的最佳实践都塞进训练数据。但有了 Skill，你可以——这正是它如此重要的原因。

### 4.1 什么是AI技能（Skill）

#### 4.1.1 Skill 的定义

**Skill（技能）** 是一个**封装了特定能力的可复用指令集**。

打个比方：你每次做一道菜，都要从头回忆配料和步骤，很容易忘这忘那。但如果你把菜谱写下来，下次照着做就行了，还能分享给别人。Skill 就是给AI写的"菜谱" —— 把一个复杂的任务标准化、流程化，让AI每次都能按照固定的高质量标准执行。

**Skill vs 单次 Prompt：**

| 维度 | 单次 Prompt | Skill |
|------|-----------|-------|
| 性质 | 一次性指令 | 可复用的标准流程 |
| 一致性 | 每次输出可能不同 | 每次按照同样的标准执行 |
| 效率 | 每次重新写一遍 | 一键触发 |
| 维护 | 用完即弃 | 可版本管理、持续优化 |
| 比喻 | 口头交代任务 | 书面的标准操作手册（SOP） |

#### 4.1.2 Skill 的核心价值

1. **一致性**：确保AI每次执行都遵循相同标准（不会这次用Tab缩进，下次用空格）
2. **效率**：复杂流程一键触发，无需每次重写Prompt
3. **可复用**：跨项目、跨团队共享最佳实践
4. **可迭代**：持续优化和升级，越用越好

#### 4.1.3 Skill 的组成结构

很多人以为 Skill 就是一个 Markdown 文件，其实不是。**一个完整的 Skill 是一个目录**，可以包含多种类型的文件，就像一个"能力包"。

打个比方：如果把 Skill 比作一本食谱，那么：
- **SKILL.md** 就是食谱本身（菜名、步骤、注意事项）
- **scripts/** 就是配套的厨房小工具（削皮刀、量杯 —— 封装好的辅助脚本）
- **resources/** 就是附赠的食材包和调料配比表（模板、示例数据、配置）
- **references/** 就是食谱末尾的"参考书目"（营养学标准、食品安全规范 —— AI 可随时查阅的参考资料）

**标准 Skill 目录结构：**

```
skill-xxx/               # Skill 根目录（命名规范：小写+短横线）
├── SKILL.md              # 核心：技能描述文件（必选）
├── scripts/              # 辅助脚本目录（可选）
│   ├── helper.py          # Python 辅助脚本
│   └── utils.js           # JavaScript 工具函数
├── resources/            # 配套资源目录（可选）
│   ├── template/          # 模板文件（如代码模板、报告模板）
│   ├── examples/          # 示例文件（如输入/输出示例数据）
│   └── config/            # 配置文件（如规则定义、默认参数）
├── references/            # 参考文档目录（可选）
│   ├── best-practices.md    # 最佳实践文档
│   ├── api-docs.md         # API 参考文档
│   └── standards.md        # 行业/团队编码规范
└── requirements.txt        # 依赖声明（可选，列出脚本需要的第三方包）
```

> **提示**：Skill 的核心是 `SKILL.md`，其余文件均为辅助。如果你的 Skill 只需要一份指令说明，只放一个 `SKILL.md` 就够了。但当 Skill 涉及复杂逻辑（如数据处理、格式转换）时，配上 `scripts/`、`resources/` 和 `references/` 会大幅提升 Skill 的能力和可维护性。

**各组成部分详解：**

**1. SKILL.md（必选）—— 技能的"说明书"**

这是 Skill 的核心载体。它包含两部分：头部的**元数据（Frontmatter）**和正文的**具体指令**。

```markdown
---
# 元数据（Frontmatter，YAML 格式）
name: react-component-generator   # 技能名称（唯一标识）
version: 1.0                  # 技能版本
description: 根据需求生成符合项目规范的 React 组件文件集  # 技能简介
trigger: ["创建组件", "新建React组件", "生成组件"]      # 触发关键词
tools: ["typescript", "react"]    # 依赖工具
author: your-name              # 技能作者
---

# React 组件生成器

## 执行步骤
1. 确认组件名称和功能需求
2. 在 src/components/{componentName}/ 目录下创建文件
3. 按照 resources/template/ 中的模板生成代码
4. 运行 scripts/validate.js 验证组件结构

## 输出规范
- 所有文件创建完成后，报告创建的文件列表
- 给出组件的使用示例代码

## 错误处理
- 如果目录已存在，提示用户确认是否覆盖
- 如果缺少依赖包，提示安装命令

## 示例
给一个完整的输入→输出示例。
```

> **注意**：Frontmatter（元数据）是可选的，很多简单的 Skill 可以省略它。但如果你的 Skill 需要被 Agent 系统自动发现和匹配，Frontmatter 中的 `trigger` 和 `description` 就非常重要 —— Agent 启动时只读取元数据，只有当用户任务匹配触发条件时，才会加载完整指令。这种"**渐进式披露**"的设计可以节省上下文窗口空间。

**2. scripts/（可选）—— 辅助脚本**

当 Skill 需要执行复杂逻辑时（如数据预处理、文件批量操作、格式验证），把这些逻辑封装到脚本中比写在 SKILL.md 里更清晰：

```python
# scripts/helper.py —— 辅助脚本示例
def fill_missing_value(df, column, strategy="mean"):
   """缺失值填充：把复杂逻辑封装成函数，SKILL.md 中只需调用即可"""
   if strategy == "mean":
      df[column].fillna(df[column].mean(), inplace=True)
   elif strategy == "empty":
      df[column].fillna("", inplace=True)
   return df
```

**3. resources/（可选）—— 配套资源**

- `template/`：存放代码模板、文档模板。例如 React 组件的标准结构模板，AI 可以基于模板快速生成代码
- `examples/`：存放输入/输出示例。帮助 AI 理解"好的输出长什么样"
- `config/`：存放配置文件（JSON/YAML），定义规则和参数，避免在 SKILL.md 中硬编码

**4. references/（可选）—— 参考文档**

与 `resources/` 不同，`references/` 存放的不是"模板和配置"，而是 **AI 执行任务时可以查阅的知识性文档**。比如：

- 编码规范文档（团队的代码风格指南）
- 安全审计标准（如 OWASP Top 10 清单）
- API 文档（第三方服务的接口说明）
- 技术选型文档（为什么用 A 不用 B 的决策记录）

> **提示**：`references/` 和 `resources/` 的区别可以这样理解 —— `resources/` 是"生产材料"（模板、配置，直接用于生成输出），`references/` 是"参考书"（规范、标准、文档，用于指导 AI 做出正确决策）。

**5. requirements.txt（可选）—— 依赖声明**

如果 `scripts/` 中的脚本依赖第三方库，在这里声明，方便部署时一键安装：

```
pandas>=2.0.0
openpyxl>=3.1.0
```

**简单 vs 完整 Skill 的选择：**

| 场景 | 推荐结构 | 说明 |
|------|---------|------|
| 简单的编码规范 | 只需 SKILL.md | 如 Git 提交规范、命名约定 |
| 代码生成类 | SKILL.md + resources/template/ | 模板驱动，保证生成代码的一致性 |
| 数据处理类 | SKILL.md + scripts/ + resources/config/ | 复杂逻辑封装到脚本，配置外部化 |
| 质量审查类 | SKILL.md + references/ | 参考文档驱动，确保审查有据可依 |
| 完整工程流程 | 全套目录 | 如项目初始化、CI/CD 配置等复杂流程 |

#### 4.1.4 Skill 的类型分类

| 类型 | 描述 | 示例 |
|------|------|------|
| 代码生成类 | 按模板生成代码 | React组件生成器、API端点生成器 |
| 工程流程类 | 执行标准化流程 | 项目初始化、CI/CD配置 |
| 质量保障类 | 代码审查与测试 | 安全审计Skill、代码审查Skill |
| 文档生成类 | 自动生成文档 | API文档生成、变更日志生成 |
| 调试修复类 | 排查和修复问题 | 错误诊断Skill、性能调优Skill |

---

### 4.2 官方与社区 Skill 资源

你不必从零开始造轮子。Skill 生态已经非常成熟，从 Anthropic 官方到头部大厂、再到社区开发者，已经沉淀了大量可直接使用的高质量 Skill。学会"找到好 Skill → 评估 → 安装 → 在此基础上定制"，是比从头写更高效的路径。

#### 4.2.1 Anthropic 官方 Skill 库

**仓库地址**：https://github.com/anthropics/skills

这是 Anthropic 官方维护的 Skill 库，质量最高、最值得优先使用。官方对 Skill 的定义是：

> *"Skills are folders of instructions, scripts, and resources that Claude loads dynamically to improve performance on specialized tasks."*
> （Skill 是由指令、脚本和资源组成的文件夹，Claude 会动态加载它们以提升在专业任务上的表现。）

**官方 Skill 分类总览：**

| 类别 | Skill 示例 | 说明 |
|------|-----------|------|
| **文档处理** | `docx`、`pdf`、`pptx`、`xlsx` | 生成和处理 Office 文档、PDF，生产级质量 |
| **创意设计** | `algorithmic-art`、`canvas-design`、`slack-gif-creator` | 生成算法艺术、设计画布、动图 |
| **开发技术** | `frontend-design`、`mcp-builder`、`webapp-testing`、`artifacts-builder` | 前端设计、MCP Server 生成、Web 应用测试 |
| **企业沟通** | `brand-guidelines`、`internal-comms` | 品牌规范、内部沟通模板 |
| **工具** | `skill-creator` | 用 AI 创建新 Skill 的 Skill（"元技能"） |

**安装方式（使用 Vercel Skills CLI）：**

```bash
# 安装 Anthropic 官方全部 Skill（全局安装）
$ npx skills add anthropics/skills -g

# 只安装指定 Skill（推荐按需安装）
$ npx skills add anthropics/skills@frontend-design -g
$ npx skills add anthropics/skills@mcp-builder -g
$ npx skills add anthropics/skills@skill-creator -g
```

> **提示**：`skill-creator` 是一个非常有趣的"元技能" —— 它的功能是帮你创建新的 Skill。如果你刚开始学习 Skill 编写，可以先安装它，然后告诉 AI"帮我创建一个 XXX Skill"，它会按照标准规范帮你生成 SKILL.md 和目录结构。

**手动安装（不使用 CLI）：**

如果你不想用 `npx skills` 命令，也可以手动操作：

```bash
# 克隆官方仓库到本地
$ git clone https://github.com/anthropics/skills.git

# 将需要的 Skill 目录复制到你的项目中
$ cp -r skills/skills/frontend-design .claude/skills/
```

#### 4.2.2 Vercel 官方 Skill 库

**仓库地址**：https://github.com/vercel-labs/skills

Vercel（Next.js 的母公司）维护的 Skill 库，专注于 **React、Next.js、AI SDK、部署** 等前端生态。如果你用 Next.js 技术栈开发，这个库非常有价值。

**Vercel Skill 分类：**

| 类别 | 覆盖内容 |
|------|---------|
| **React / Next.js** | React 最佳实践、Next.js App Router、性能优化 |
| **AI SDK** | Vercel AI SDK 集成、AI 应用开发 |
| **设计与 UI** | 无障碍设计、高性能 UI 组件 |
| **浏览器自动化** | 浏览器交互自动化测试 |
| **部署** | Vercel 平台部署流程 |
| **商业** | 电商和支付体验 |
| **工作流** | 持久化、弹性工作流 |
| **通用工具** | `find-skills`（搜索发现新 Skill） |

**安装方式：**

```bash
# 安装 Vercel 全部 Skill
$ npx skills add vercel-labs/skills -g

# 安装 find-skills（推荐首先安装，用于搜索发现其他 Skill）
$ npx skills add vercel-labs/skills@find-skills -g -y
```

> **提示**：`find-skills` 是一个"技能发现者" Skill —— 当你需要完成某个任务但不知道有没有现成的 Skill 时，它会自动帮你搜索并推荐最合适的 Skill。**强烈建议首先安装它**。

#### 4.2.3 Vercel Skills CLI：Skill 的"包管理器"

Vercel 还提供了一个命令行工具 `npx skills`，可以把它理解为 **Skill 世界的 npm** —— 用来搜索、安装、管理各种 Skill。

**基本用法：**

```bash
# 搜索 Skill（按关键词）
$ npx skills find "react testing"

# 安装 Skill（从 GitHub 仓库）
$ npx skills add <owner/repo>        # 安装仓库中的全部 Skill
$ npx skills add <owner/repo>@<name>   # 安装指定 Skill
$ npx skills add <owner/repo> -g      # 全局安装（所有项目可用）

# 列出已安装的 Skill
$ npx skills list

# 初始化（在当前项目创建 Skill 目录）
$ npx skills init
```

**支持的 AI 工具**：Claude Code、GitHub Copilot、Cursor、Qoder、OpenAI Codex、Cline、Windsurf 等多种 AI 编程工具。具体支持范围会随 CLI 版本变化，安装前以项目 README 为准。

![Skills 搜索命令输出示意](https://upload.maynor1024.live/file/1782457935439_skills-find-terminal.svg)

#### 4.2.4 社区 Skill 库

除了官方库，社区贡献了大量 Skill 资源：

**精选 GitHub 仓库：**

| 仓库 | Skill 数量 | 特色 |
|------|-----------|------|
| **ComposioHQ/awesome-claude-skills** | 127+ | 10大分类，含59个SaaS应用集成Skill |
| **alirezarezvani/claude-skills** | 235+ | 9大领域，含25个POWERFUL级高级Skill |
| **travisvn/awesome-claude-skills** | 持续更新 | 精选列表，社区投票排名 |
| **glebis/claude-skills** | 专项 | 专注特定工作流的高质量Skill |

**alirezarezvani/claude-skills 领域覆盖（235+ Skill）：**

```
工程核心（37）：架构、前端、后端、QA、DevOps、安全、AI/ML
高级工程（45）：Agent设计器、RAG架构师、数据库设计、CI/CD构建器、MCP构建器
产品（16）：产品经理、UX研究员、UI设计、落地页、SaaS脚手架
营销（44）：内容、SEO、CRO、渠道、增长、情报、销售
项目管理（9）：Scrum Master、Jira集成、Confluence集成
C-Level顾问（34）：全套C-Suite角色（CTO、CFO等）
合规与质量（14）：ISO 13485、GDPR、FDA合规
商业与增长（5）：客户成功、销售工程师、收入运营
财务（4）：财务分析、SaaS指标教练
```

**安装社区 Skill：**

```bash
# 从社区仓库安装
$ npx skills add alirezarezvani/claude-skills -g
$ npx skills add ComposioHQ/awesome-claude-skills -g

# 手动安装（克隆后复制需要的目录）
$ git clone https://github.com/alirezarezvani/claude-skills.git
$ cp -r claude-skills/engineering-team/frontend .claude/skills/
```

**国内大厂 Skill 库（ 国内用户推荐）：**

国内头部科技公司也在积极拥抱 Skill 生态，维护了多个高质量的 Skill 库：

| 厂商 | 仓库/平台 | 特色 Skill | 说明 |
|------|----------|-----------|------|
| **字节跳动/火山引擎** | GitHub: bytedance/agentkit-samples | 联网搜索、文本转语音（TTS）、图像理解 | 基于火山引擎 API，企业级 AgentKit 示例 |
| **科大讯飞** | GitHub: iflytek/iFly-Skills | 语音合成（TTS）、语音转写、PDF/图片OCR、发票OCR、机器翻译、文本校对 | 讯飞 AI 能力的 Skill 封装，语音和 OCR 最强 |
| **科大讯飞** | GitHub: iflytek/skillhub | 企业级 Skill 注册中心 | 私有部署的 Skill 商店，支持团队协作管理 |
| **阿里巴巴/通义灵码** | 通义灵码内置 | 代码审查、日志分析、API 文档生成 | 支持 SKILL.md 格式，可在 `~/.lingma/skills/` 自定义 |
| **腾讯/CodeBuddy** | CodeBuddy Agent 平台 | 自定义 Skill 构建 | 支持 Skill 创建和集成，与腾讯云生态打通 |

**安装国内大厂 Skill 示例：**

```bash
# 科大讯飞 iFly-Skills（语音、OCR、翻译等 AI 能力）
$ git clone https://github.com/iflytek/iFly-Skills.git
$ cp -r iFly-Skills/ifly-pdf-image-ocr .claude/skills/
# 注意：需要在讯飞开放平台申请 API Key，配置 XFEI_APP_ID 等环境变量

# 字节跳动 AgentKit Samples
$ git clone https://github.com/bytedance/agentkit-samples.git
$ cp -r agentkit-samples/skills/byted-web-search .claude/skills/
# 注意：需要火山引擎 API Key
```

> **提示**：国内大厂的 Skill 大多基于各自的云服务 API，使用前需要注册对应平台并获取 API Key。但它们在**中文处理、语音识别、OCR** 等方面的能力远超海外同类 Skill，非常适合国内开发者。

#### 4.2.5 Skill 聚合平台

如果觉得逐个找仓库太麻烦，还有专门的 Skill 聚合搜索平台：

| 平台 | 地址 | Skill 数量 | 特色 |
|------|------|-----------|------|
| **skills.sh** | https://skills.sh | 48,000+ | Vercel 官方推荐的发现平台 |
| **SkillsMP** | https://skillsmp.com/zh | 900,000+ | 最大的 Skill 市场，支持中文界面 |
| **AgentSkills.io** | https://agentskills.io | 开放标准 | Agent Skills 开放标准定义 |

在这些平台上，你可以按分类浏览、按关键词搜索，找到需要的 Skill 后一键安装。

> **提示**：SkillsMP 从 GitHub 上自动索引包含 SKILL.md 的仓库，所以你在 GitHub 上发布的 Skill 也可能被收录进去。

#### 4.2.6 Cursor 规则库

Cursor 使用 Rules 作为项目级 AI 行为规范。旧版常见 `.cursorrules`，新版更推荐 `.cursor/rules/*.mdc`。它和 Skill 不完全相同，但都属于“把经验写成可复用上下文”的做法。社区贡献了大量现成模板：

| 资源 | 地址 | 说明 |
|------|------|------|
| **cursor.directory** | https://cursor.directory/ | 按技术栈分类的规则模板集合 |
| **cursorrules.org** | https://cursorrules.org/ | 可参考旧版规则写法，再迁移到 `.cursor/rules/*.mdc` |
| **awesome-cursorrules** | GitHub: PatrickJS/awesome-cursorrules | 社区精选规则合集 |

#### 4.2.7 使用第三方 Skill 的安全评估

Skill 本质上是给 AI 的"操作指令"，某些恶意 Skill 可能包含危险操作。在使用任何第三方 Skill 之前，**必须进行安全评估**：

| 维度 | 检查项 | 举例 |
|------|--------|------|
| **安全性** | 是否包含危险命令？是否会泄露敏感信息？ | 检查有无 `rm -rf`、`curl` 发送数据到外部 |
| **维护状态** | 最近更新时间？作者是否活跃？ | 超过6个月未更新的慎用 |
| **文档完整性** | SKILL.md 是否清晰？有无使用说明和示例？ | 缺少文档的 Skill 质量可能不高 |
| **兼容性** | 是否与你使用的工具版本兼容？ | 检查 Frontmatter 中的 tools 字段 |
| **来源可信度** | 是官方/知名组织还是个人？Star 数？ | 优先选用官方库和高 Star 仓库 |

**安全检查的最佳实践：**

```bash
# 1. 安装前先浏览 Skill 内容（不要盲目安装）
# 在 GitHub 上直接阅读 SKILL.md

# 2. 检查 scripts/ 目录中的脚本（如果有的话）
# 确保没有网络请求、文件删除等危险操作

# 3. 在测试项目中先试用，确认安全后再用于正式项目
```

> **注意**：永远不要盲目使用来历不明的 Skill。安装前至少通读一遍 SKILL.md 的内容和 scripts/ 目录中的脚本代码，确保没有危险操作。**官方库（Anthropic、Vercel）优先，社区高 Star 仓库其次，个人仓库最后。**

#### 4.2.8 经典 Skill 实操体验

在学习"如何创建 Skill"之前，先来体验几个经典的现有 Skill，建立直观感受。

**案例一：用 skill-creator 让 AI 帮你创建 Skill**

`skill-creator` 是 Anthropic 官方提供的一个"元技能" —— 它的功能就是帮你创建新的 Skill。这相当于请了一位 Skill 专家替你写"操作手册"。

```bash
# Step 1：安装 skill-creator
$ npx skills add anthropics/skills@skill-creator -g
```

安装后，在 Claude Code 中输入：

```
> 用 skill-creator 帮我创建一个名为 weekly-report-generator 的技能。
> 功能：每周自动扫描本周的 Git 提交记录和 TODO 变更，
> 生成一份结构化的周报 Markdown 文件。
> 需要的工具：Read、Glob、Bash（用于 git log）。
```

Claude 会按照 skill-creator 的规范，自动帮你生成完整的 Skill 目录：

```
预期输出：
~/.claude/skills/weekly-report-generator/
├── SKILL.md        # 包含 Frontmatter 和详细执行步骤
├── scripts/
│   └── collect-commits.sh   # 收集本周提交的脚本
└── resources/
   └── template/
      └── weekly-report.md  # 周报模板
```

> **提示**：skill-creator 会交互式地询问你一些问题（技能名称、触发词、执行步骤等），然后生成符合规范的 SKILL.md。**初学者强烈建议先用 skill-creator 生成 Skill，再根据需要手动调整**，比从零开始写效率高得多。

**案例二：使用官方 PDF 文档处理 Skill**

Anthropic 官方的 `pdf` Skill 可以让 Claude 处理 PDF 文件 —— 解析内容、提取信息、生成摘要等。

```bash
# 安装 PDF 技能
$ npx skills add anthropics/skills@pdf -g
```

安装后即可直接使用：

```
> 请读取 docs/产品需求文档.pdf，提取其中的核心功能列表和技术要求，
> 整理成一份 Markdown 格式的摘要。
```

Claude 会调用 pdf Skill 中的脚本解析 PDF 文件结构，提取文本内容并按你的要求整理输出。

> **提示**：同类的官方文档处理 Skill 还有 `docx`（Word 文档）、`xlsx`（Excel 表格）、`pptx`（PowerPoint 演示文稿）。它们的工作方式类似 —— 把文档格式（本质是 ZIP + XML）"翻译"成 Claude 能理解的结构，然后进行处理。

**案例三：使用官方 frontend-design Skill**

`frontend-design` Skill 让 Claude 具备专业的前端设计能力 —— 生成像素级精确的 UI 组件。

```bash
# 安装前端设计技能
$ npx skills add anthropics/skills@frontend-design -g
```

使用示例：

```
> 请使用 frontend-design 技能，为书签管理器设计一个响应式的卡片列表页面。
> 要求：支持暗色模式，卡片包含标题、URL、标签和收藏时间。
> 技术栈：React + Tailwind CSS。
```

---

### 4.3 构建自己的 Skill

这是本部分最核心的内容。我们通过三个实战案例，手把手教你创建自己的Skill。

#### 4.3.1 识别 Skill 化的机会

观察你日常使用AI时的重复行为：

- 你是否经常给AI写**类似的Prompt**？→ 把它变成Skill
- 你的项目是否有**固定的开发模式**？→ 把它变成Skill
- 你是否有**标准化的审查流程**？→ 把它变成Skill

> **提示**：DRY原则（Don't Repeat Yourself）不仅适用于代码，也适用于Prompt。如果你发现自己连续3次写了类似的Prompt，就是时候把它Skill化了。

#### 4.3.2 实战：创建一个 React 组件生成 Skill

**需求**：每次创建新的React组件时，需要遵循统一的文件结构和编码规范。我们来创建一个包含模板和验证脚本的**完整 Skill 包**。

**Step 1：创建 Skill 目录结构**

在项目根目录下创建如下结构：

```bash
# 一次性创建完整的 Skill 目录
$ mkdir -p .claude/skills/react-component/scripts
$ mkdir -p .claude/skills/react-component/resources/template
$ mkdir -p .claude/skills/react-component/resources/examples
```

创建后的目录结构：

```
.claude/skills/react-component/    # Skill 根目录
├── SKILL.md                  # 核心指令文件
├── scripts/                  # 辅助脚本
│   └── validate.js             # 组件结构验证脚本
└── resources/                 # 配套资源
   ├── template/               # 代码模板
   │   ├── component.tsx.tpl      # 组件主文件模板
   │   └── test.tsx.tpl         # 测试文件模板
   └── examples/               # 示例
      └── BookmarkCard-example/   # 一个完整的示例组件供参考
```

**Step 2：编写 SKILL.md（核心指令）**

创建 `.claude/skills/react-component/SKILL.md`：

````markdown
---
name: react-component-generator
version: 1.0
description: 根据组件名称和功能描述，生成符合项目规范的 React 组件文件集
trigger: ["创建组件", "新建React组件", "生成组件"]
tools: ["typescript", "react", "tailwindcss"]
author: your-name
---

# React 组件生成器

## 触发条件
当用户要求创建新的 React 组件时使用此 Skill。

## 输入参数
- componentName（必填）：组件名称，使用 PascalCase 格式
- description（必填）：组件功能描述
- hasProps（可选，默认true）：是否需要 Props 类型定义
- hasState（可选，默认false）：是否需要状态管理

## 执行步骤

1. 在 `src/components/` 目录下创建组件文件夹：
   `src/components/{componentName}/`

2. 参考 `resources/template/` 中的模板文件创建以下文件：
   - `index.tsx` - 组件主文件（参考 component.tsx.tpl）
   - `types.ts` - TypeScript 类型定义（如果 hasProps=true）
   - `{componentName}.test.tsx` - 测试文件（参考 test.tsx.tpl）

3. 组件代码规范：
   - 使用函数式组件 + TypeScript
   - Props 使用 interface 定义，命名为 {componentName}Props
   - 使用 Tailwind CSS 处理样式
   - 导出使用 named export
   - 添加 JSDoc 注释说明组件功能

4. 测试代码规范：
   - 使用 @testing-library/react
   - 至少包含：渲染测试、Props 传递测试

5. 创建完成后，可运行 `scripts/validate.js` 验证组件结构完整性。

## 输出规范
- 所有文件创建完成后，报告创建的文件列表
- 给出组件的使用示例代码

## 参考示例
参见 `resources/examples/BookmarkCard-example/` 中的完整示例。

## 示例

输入：
- componentName: "BookmarkCard"
- description: "展示单个书签的卡片组件，显示标题、URL和标签"
- hasProps: true
- hasState: false

预期输出文件：
- src/components/BookmarkCard/index.tsx
- src/components/BookmarkCard/types.ts
- src/components/BookmarkCard/BookmarkCard.test.tsx
````

**Step 3：创建辅助脚本（scripts/）**

创建 `.claude/skills/react-component/scripts/validate.js`：

```javascript
// scripts/validate.js —— 验证组件目录结构是否完整
// AI 在执行 Skill 后可以运行此脚本进行自检

const fs = require('fs');
const path = require('path');

function validateComponent(componentName) {
  const dir = path.join('src/components', componentName);
  const requiredFiles = ['index.tsx', 'types.ts'];
  const missing = [];

  requiredFiles.forEach(file => {
   if (!fs.existsSync(path.join(dir, file))) {
     missing.push(file);
   }
  });

  if (missing.length > 0) {
   console.error(` 组件 ${componentName} 缺少文件: ${missing.join(', ')}`);
   return false;
  }
  console.log(` 组件 ${componentName} 结构验证通过`);
  return true;
}

// 从命令行参数获取组件名
const componentName = process.argv[2];
if (!componentName) {
  console.error('用法: node validate.js <ComponentName>');
  process.exit(1);
}
validateComponent(componentName);
```

**Step 4：创建代码模板（resources/template/）**

创建 `.claude/skills/react-component/resources/template/component.tsx.tpl`：

```tsx
// resources/template/component.tsx.tpl —— 组件代码模板
// AI 生成代码时参考此模板结构

/**
 * {componentName} 组件
 * {description}
 */

import { {componentName}Props } from './types';

export function {componentName}({ ...props }: {componentName}Props) {
  return (
   <div className="...">
     {/* 组件内容 */}
   </div>
  );
}
```

> **提示**：`resources/template/` 中的模板文件不是让 AI 原样复制的，而是给 AI 一个"参考样式"。AI 会根据模板的结构和风格，结合用户需求生成实际代码。这比纯文字描述更直观，生成质量也更高。

**Step 5：在 CLAUDE.md 中引用此 Skill**

在你的 CLAUDE.md 文件中添加：

```markdown
## 可用 Skills
- 创建 React 组件时，请读取 `.claude/skills/react-component/SKILL.md` 并严格遵循其中的规范
```

**Step 6：使用 Skill**

在 Claude Code 中输入：

```
> 请按照 React 组件生成器 Skill 的规范，创建一个 BookmarkCard 组件。
> 组件功能：展示单个书签的卡片，显示标题、URL、描述和标签列表。
> 需要 Props，不需要状态管理。
```

Claude Code 会按照 Skill 定义的规范，参考模板文件，自动创建所有文件。完成后你还可以运行验证脚本确认结构：

```bash
$ node .claude/skills/react-component/scripts/validate.js BookmarkCard
 组件 BookmarkCard 结构验证通过
```

![React 组件 Skill 目录结构示意](https://upload.maynor1024.live/file/1782457935224_react-skill-structure.svg)

#### 4.3.3 实战：创建一个 API 端点生成 Skill

这个 Skill 相对简单，不需要辅助脚本，只需一个 SKILL.md 加一份配置文件：

```
.claude/skills/api-endpoint/
├── SKILL.md                  # 核心指令
└── resources/
   └── config/
      └── response-format.json   # API 统一返回格式定义
```

创建 `.claude/skills/api-endpoint/SKILL.md`：

```markdown
---
name: api-endpoint-generator
version: 1.0
description: 为指定的数据模型生成标准的 CRUD API 端点
trigger: ["创建API", "生成端点", "新建接口"]
---

# RESTful API 端点生成器

## 输入参数
- modelName（必填）：数据模型名称（如 "bookmark"、"tag"）
- fields（必填）：模型字段列表
- operations（可选，默认全部）：需要的操作（create/read/update/delete/list）

## 执行步骤

1. 在 `src/app/api/{modelName}s/` 目录下创建 `route.ts`

2. 实现以下端点：
   - GET /api/{modelName}s → 获取列表（支持分页、搜索）
   - POST /api/{modelName}s → 创建
   - GET /api/{modelName}s/[id] → 获取单个
   - PUT /api/{modelName}s/[id] → 更新
   - DELETE /api/{modelName}s/[id] → 删除

3. 代码规范：
   - 使用 Prisma Client 操作数据库
   - 统一返回格式参考 `resources/config/response-format.json`
   - 包含输入验证
   - 包含错误处理（try-catch）

4. 创建完成后，列出所有 API 端点的 URL 和用法
```

同时创建 `.claude/skills/api-endpoint/resources/config/response-format.json`：

```json
{
  "success_response": {
   "success": true,
   "data": "<返回数据>"
  },
  "error_response": {
   "success": false,
   "error": "<错误信息>"
  },
  "list_response": {
   "success": true,
   "data": "<数据数组>",
   "pagination": {
     "page": 1,
     "pageSize": 20,
     "total": 100
   }
  }
}
```

> **提示**：把 API 的返回格式定义抽到 `resources/config/` 中，好处是 SKILL.md 更简洁，而且修改格式时只需改 JSON 文件，不用动 Skill 指令。

#### 4.3.4 实战：创建一个 Git 规范化 Skill

Git 规范化 Skill 非常简单，不需要脚本和资源文件，**只需一个 SKILL.md 即可**。这说明并非所有 Skill 都要用上全套目录 —— 够用就好。

创建 `.claude/skills/git-commit/SKILL.md`：

````markdown
---
name: git-commit-standard
version: 1.0
description: 在提交代码时，自动生成符合 Conventional Commits 规范的 commit message
trigger: ["提交代码", "git commit", "生成commit"]
---

# Git 提交规范化

## 执行步骤

1. 运行 `git diff --staged` 查看暂存区的修改
2. 分析修改内容，判断变更类型：
   - feat: 新功能
   - fix: 修复Bug
   - refactor: 重构（不改变功能）
   - style: 样式修改
   - docs: 文档更新
   - test: 测试相关
   - chore: 构建/工具变更

3. 生成 commit message，格式：
   ```
   <type>(<scope>): <description>

   <body>
   ```

4. 显示给用户确认后执行 `git commit`

## 示例
修改了 src/components/BookmarkCard.tsx 中的样式

生成的 message：
​```
style(BookmarkCard): 优化书签卡片的响应式布局

- 调整了移动端下的卡片宽度
- 修复了标签溢出问题
​```
````

> **提示**：注意对比三个实战 Skill 的复杂度递减关系 —— React 组件 Skill（完整包：SKILL.md + scripts + resources）→ API 端点 Skill（中等：SKILL.md + resources/config）→ Git 提交 Skill（最简：仅 SKILL.md）。**根据实际需求选择合适的结构，不必过度设计**。

#### 4.3.5 实战：创建一个代码安全审计 Skill（references 实践）

前面三个案例分别展示了 `scripts/`、`resources/`、纯 SKILL.md 的用法，这个案例重点展示 **`references/` 目录** —— 当 Skill 需要 AI 依据特定的标准和规范来执行任务时，把参考文档放入 `references/` 是最佳实践。

**需求**：在提交代码前，让 AI 按照 OWASP 安全清单和团队编码安全规范，对代码进行安全审计。

**Step 1：创建 Skill 目录结构**

```bash
$ mkdir -p .claude/skills/security-audit/references
$ mkdir -p .claude/skills/security-audit/resources/examples
```

完成后的结构：

```
.claude/skills/security-audit/
├── SKILL.md                    # 审计流程指令
├── references/                  #  参考文档（AI 审计时依据的"法规"）
│   ├── owasp-top10-checklist.md     # OWASP Top 10 安全检查清单
│   └── team-security-standards.md   # 团队安全编码规范
└── resources/
   └── examples/
      └── audit-report-sample.md   # 审计报告示例（让 AI 知道输出长什么样）
```

**Step 2：编写 SKILL.md**

创建 `.claude/skills/security-audit/SKILL.md`：

````markdown
---
name: security-audit
version: 1.0
description: 对指定代码进行安全审计，依据 OWASP Top 10 和团队安全规范输出审计报告
trigger: ["安全审计", "security audit", "安全检查", "代码安全"]
---

# 代码安全审计

## 执行步骤

1. 读取用户指定的代码文件或目录
2. 阅读 `references/owasp-top10-checklist.md`，逐项检查代码是否存在对应漏洞
3. 阅读 `references/team-security-standards.md`，检查代码是否符合团队安全规范
4. 按照 `resources/examples/audit-report-sample.md` 的格式，生成安全审计报告
5. 对每个发现的问题：标注严重等级（高危/中危/低危）、给出修复建议和修复代码

## 输出规范
- 使用 Markdown 表格列出所有问题
- 每个问题包含：文件路径、行号、问题描述、严重等级、修复建议
- 最后给出安全评分（0-100）和总结

## 错误处理
- 如果代码量过大，优先审计 API 路由和数据库操作相关的文件
- 如果无法判断是否存在风险，标记为"待人工确认"
````

**Step 3：编写参考文档（references/）**

这是本案例的重点。`references/` 中的文件不会直接变成输出，而是作为 AI 做判断时的"知识库"。

创建 `.claude/skills/security-audit/references/owasp-top10-checklist.md`：

```markdown
# OWASP Top 10 安全检查清单

## 1. 注入攻击（Injection）
- [ ] SQL 查询是否使用参数化查询或 ORM？
- [ ] 是否存在字符串拼接 SQL 的情况？
- [ ] 用户输入是否经过转义和过滤？

## 2. 身份认证失效（Broken Authentication）
- [ ] 密码是否明文存储？（应使用 bcrypt 等加密）
- [ ] 会话令牌是否使用安全的随机数生成？
- [ ] 是否有登录失败次数限制？

## 3. 敏感数据泄露（Sensitive Data Exposure）
- [ ] API 密钥、数据库密码是否硬编码在代码中？
- [ ] 敏感数据是否通过 HTTPS 传输？
- [ ] 日志中是否记录了敏感信息？

## 4. XSS 跨站脚本攻击
- [ ] 用户输入是否在渲染前经过转义？
- [ ] 是否使用 dangerouslySetInnerHTML 等危险 API？
- [ ] CSP（Content Security Policy）头是否设置？

## 5. 安全配置错误
- [ ] 是否关闭了调试模式？
- [ ] 错误页面是否暴露了堆栈信息？
- [ ] 默认账户密码是否已修改？

（后续 6-10 条按同样格式补充）
```

创建 `.claude/skills/security-audit/references/team-security-standards.md`：

```markdown
# 团队安全编码规范

## 强制规则（违反即为高危）
1. 禁止在代码中硬编码任何密钥、密码、令牌，必须使用环境变量
2. 所有数据库操作必须通过 ORM（Prisma），禁止直接写 SQL
3. 所有用户输入必须在服务端验证，不能只依赖前端验证
4. API 路由必须有权限校验，不允许裸接口

## 建议规则（违反为中危）
1. 文件上传功能必须限制文件类型和大小
2. 敏感操作（删除、修改密码等）需要二次确认
3. 分页查询必须限制 pageSize 最大值，防止数据库压力攻击
4. 错误响应不应包含内部实现细节
```

**Step 4：编写输出示例（resources/examples/）**

创建 `.claude/skills/security-audit/resources/examples/audit-report-sample.md`：

```markdown
# 安全审计报告

**审计范围**：src/app/api/
**审计时间**：2026-04-30
**审计依据**：OWASP Top 10 + 团队安全规范

## 发现问题

| # | 文件 | 行号 | 问题描述 | 等级 | 修复建议 |
|---|------|------|---------|------|---------|
| 1 | src/app/api/users/route.ts | 23 | SQL 字符串拼接，存在注入风险 |  高危 | 改用 Prisma 参数化查询 |
| 2 | src/lib/auth.ts | 45 | API 密钥硬编码 |  高危 | 移至 .env 环境变量 |
| 3 | src/app/api/upload/route.ts | 12 | 文件上传未限制类型 |  中危 | 添加 MIME 类型白名单 |

## 安全评分：65/100

## 总结
发现 2 个高危、1 个中危问题。建议优先修复高危问题后再上线。
```

**Step 5：使用 Skill**

```
> 请使用安全审计 Skill，对 src/app/api/ 目录下的所有文件进行安全检查。
```

AI 会先读取 `references/` 中的两份参考文档作为审计标准，然后逐一检查代码，最后按照 `resources/examples/` 中的示例格式输出审计报告。

> **提示**：注意 `references/` 的价值 —— 如果不提供参考文档，AI 会按照自己的通用知识来审计，可能遗漏团队特有的安全要求。有了 `references/`，审计标准就变得**确定、可控、可迭代** —— 团队安全规范更新了？改一下 `references/team-security-standards.md` 就行。

**现在回顾四个案例，每个都突出了不同的 Skill 目录组件：**

| 案例 | 核心组件 | 教学重点 |
|------|---------|---------|
| React 组件 Skill | SKILL.md + scripts/ + resources/template/ | 完整包：脚本验证 + 模板驱动 |
| API 端点 Skill | SKILL.md + resources/config/ | 配置外部化 |
| Git 提交 Skill | 仅 SKILL.md | 最简结构 |
| 安全审计 Skill  | SKILL.md + references/ + resources/examples/ | 参考文档驱动审查 |

---

### 4.4 Skill 与 AI 工具的集成

#### 4.4.1 在 Claude Code 中集成

**方法一：通过 CLAUDE.md 引用（推荐）**

在 CLAUDE.md 中添加 Skill 引用：

```markdown
## 项目 Skills
以下 Skill 定义了标准化的开发流程（每个 Skill 是一个目录，核心指令在 SKILL.md 中）：
- `.claude/skills/react-component/` - React 组件生成规范
- `.claude/skills/api-endpoint/` - API 端点生成规范
- `.claude/skills/git-commit/` - Git 提交规范
- `.claude/skills/security-audit/` - 代码安全审计

执行相关任务时，请先阅读对应 Skill 目录下的 SKILL.md 并严格遵循。
如 Skill 中包含 scripts/、resources/ 或 references/，请一并参考。
```

**方法二：通过自定义 slash commands**

将 Skill 的触发文件放在 `.claude/commands/` 目录下，即可通过 `/skill名称` 直接触发：

```bash
# 文件结构
.claude/
├── commands/
│   ├── new-component.md   # 触发方式：/new-component（引用 skills 中的规范）
│   └── security-check.md   # 触发方式：/security-check
└── skills/
   ├── react-component/   # 完整 Skill 包（SKILL.md + scripts + resources）
   │   ├── SKILL.md
   │   ├── scripts/
   │   └── resources/
   ├── api-endpoint/      # 中等 Skill 包（SKILL.md + resources/config）
   │   ├── SKILL.md
   │   └── resources/
   ├── security-audit/    # 参考文档型（SKILL.md + references + resources/examples）
   │   ├── SKILL.md
   │   ├── references/
   │   └── resources/
   └── git-commit/       # 简单 Skill（仅 SKILL.md）
      └── SKILL.md
```

#### 4.4.2 在 Cursor 中集成

将 Skill 的核心规则写入 Cursor Rules（推荐 `.cursor/rules/*.mdc`，旧项目可用 `.cursorrules`）：

```
When creating new React components:
- Follow the structure defined in .claude/skills/react-component/SKILL.md
- Reference templates in .claude/skills/react-component/resources/template/
- Always create types.ts for Props definitions
- Always include basic test file
```

---

### 4.5 Skill 的迭代与版本管理

#### 4.5.1 持续优化

Skill 不是写完就不管了。每次使用后，记录：

- AI 哪些地方做得好？→ 保持
- AI 哪些地方做得不好？→ 在 Skill 中加入更明确的指令
- 有没有遗漏的边界情况？→ 补充到错误处理部分

#### 4.5.2 版本管理

用 Git 管理你的 Skill 目录，就像管理代码一样：

```bash
# 提交整个 Skill 包（包括 SKILL.md、scripts、resources 等）
$ git add .claude/skills/react-component/
$ git commit -m "feat(skills): 新增 React 组件生成 Skill v1.0"

# 更新 Skill 后，修改 SKILL.md 中的版本号并提交
$ git add .claude/skills/react-component/SKILL.md
$ git commit -m "chore(skills): 升级 React 组件 Skill 至 v1.1，优化模板"
```

---

### 4.6 Superpowers 插件

Superpowers 是 Claude Code 生态中的一类**社区增强插件 / Skills 集合**。它不是“必装”的，但思路值得学习：把成熟工作流封装成可复用能力，让 AI 不只是会写代码，还会按固定方法做事。

##### 4.6.1 什么是 Superpowers？

Superpowers 本质是一套**工作方法论集合**，通常会封装成多个可复用 Skill。安装后，AI 可以在合适的任务中调用这些方法论。

**安装前后对比：**

| 没装 Superpowers                      | 装了 Superpowers                                             |
| ------------------------------------- | ------------------------------------------------------------ |
| 你：“加个批量导出功能”                | 你：“加个批量导出功能”                                       |
| AI：“好的，我来实现...”（直接写代码） | AI：“在开始前我需要确认：1.导出格式？2.数据量多大？3.需要异步吗？”→给出 2-3 个方案，确认后再动手 |

##### 4.6.2 核心 Skills 一览

| Skill                      | 功能                              | 触发时机            |
| -------------------------- | --------------------------------- | ------------------- |
| 头脑风暴 (brainstorming)   | 需求分析→设计规格，先想清楚再动手 | 新需求/新功能开始时 |
| 编写计划 (writing-plans)   | 把规格拆成可执行的实施步骤        | 确认设计后          |
| 执行计划 (executing-plans) | 按计划逐步实施，每步验证          | 开发过程中          |
| 测试驱动开发 (TDD)         | 严格 TDD：先写测试，再写代码      | 开发核心逻辑时      |
| 系统化调试 (debugging)     | 四阶段调试法：定位→分析→假设→修复 | 遇到 Bug 时         |
| 代码审查 (code-review)     | 派遣审查 agent 检查代码质量       | 功能完成后          |
| 完成前验证 (verification)  | 声称完成前必须跑验证              | 任务结束前          |

##### 4.6.3 安装方法

**方式一：npx 一键安装（推荐）**

```bash
# 进入你的项目目录（重要！不要在主目录 ~ 下运行）
$ cd /your/project

# 英文版（原版）
$ npx superpowers

# 中文增强版（推荐国内用户，包含 6 个中国特色 Skill）
$ npx superpowers-zh
```

安装后会在项目下生成 `.claude/skills/` 目录，包含所有 Skill 文件。

**方式二：手动安装（备选）**

```bash
# 克隆仓库
git clone https://github.com/jnMetaCode/superpowers-zh.git

# 复制 skills 到项目
cp -r superpowers-zh/skills /your/project/.claude/skills
```

> **注意**：手动安装只复制了 Skills 文件，不会配置自动触发钩子。推荐使用 npx 方式一键安装。

##### 4.6.4 是否必须安装？

**不是必须的。** Superpowers 是一个“锦上添花”的增强插件：

- **初学者**：建议先不装，熟悉 Claude Code 基本操作后再考虑
- **日常开发**：强烈推荐安装，能显著提升代码质量和开发流程规范性
- **团队项目**：强烈推荐安装，统一团队的 AI 工作方法论

```
~/.claude/
└── commands/         ← 你的全局 Skills
   ├── review.md      ← 代码审查 Skill
   ├── refactor.md    ← 重构优化 Skill
   └── test.md       ← 测试生成 Skill

项目根目录/
└── .claude/
   ├── commands/      ← 项目级 Skills
   │   ├── deploy.md   ← 部署流程 Skill
   │   └── migrate.md  ← 数据库迁移 Skill
   ├── settings.json   ← 项目配置
   └── CLAUDE.md      ← 项目规则文件
```

*图：Superpowers Skills 目录结构 —— 全局Skills对所有项目生效，项目级Skills仅对当前项目生效*

### 4.7 MCP（Model Context Protocol）简介

MCP 是 Anthropic 推出的一个标准化协议，让 AI 工具可以连接外部服务和数据源。你可以把 MCP 理解为给 AI 装"插件"或"扩展能力"。

**MCP 的概念：**

```
AI 工具（Claude Code）
   │
   ├── 内置能力：读写文件、运行命令
   │
   └── MCP 扩展能力：
      ├── GitHub MCP Server → 操作 GitHub（创建PR、管理Issue）
      ├── Database MCP Server → 直接查询数据库
      ├── Browser MCP Server → 浏览器自动化测试
      └── 更多第三方 MCP Server...
```

**MCP 与 Skill 的关系：**

- **Skill** 定义了"做什么、怎么做"（流程和规范）
- **MCP** 提供了"能力扩展"（让AI能做更多事情）

两者互补：你可以在 Skill 中调用 MCP 提供的能力。例如，一个"部署检查 Skill"可以调用 GitHub MCP 来创建 PR。

> **提示**：MCP 是一个进阶主题。初学者可以先专注于 Skill 的编写和使用，等熟练后再探索 MCP 扩展。

---

### 4.8 本部分小结与实践练习

**实践练习：**

- [ ] 使用 `npx skills add anthropics/skills@skill-creator -g` 安装官方 skill-creator，体验用 AI 创建 Skill
- [ ] 浏览 SkillsMP（skillsmp.com/zh）或 skills.sh，找到3个感兴趣的社区 Skill 并阅读其 SKILL.md
- [ ] 创建一个项目初始化 Skill（包含 SKILL.md + resources/template/ 技术栈配置模板）
- [ ] 创建一个代码审查 Skill（包含 SKILL.md + references/ 审查标准文档）
- [ ] 将自定义 Skill 集成到 Claude Code 中并实际使用一次
- [ ] 用 Git 提交你的 Skill 目录

#### 4.8.1 动手实践：创建一个「Git 提交规范化」Skill

前面看了 4 个案例，现在轮到你自己动手了。下面会带你从零创建一个 Git 提交规范化 Skill，整个流程大约 10 分钟。

**第 1 步：创建 Skill 目录**

```bash
mkdir -p .claude/skills/git-commit
```

**第 2 步：编写 SKILL.md**

创建 `.claude/skills/git-commit/SKILL.md`，写入以下内容：

````markdown
---
name: git-commit-standard
version: 1.0
description: 在提交代码时，自动生成符合 Conventional Commits 规范的 commit message
trigger: ["提交代码", "git commit", "生成commit"]
---

# Git 提交规范化

## 执行步骤

1. 运行 `git diff --staged` 查看暂存区的修改
2. 分析修改内容，判断变更类型：
   - feat: 新功能
   - fix: 修复Bug
   - refactor: 重构（不改变功能）
   - style: 样式修改
   - docs: 文档更新
   - test: 测试相关
   - chore: 构建/工具变更
3. 生成 commit message，格式：`<type>(<scope>): <description>`
4. 显示给用户确认后执行 `git commit`

## 示例

修改了 `src/components/Header.tsx` 中的导航样式

生成的 message：
​```
style(Header): 优化导航栏的响应式布局
​```
````

**第 3 步：在 CLAUDE.md 中注册 Skill**

在项目根目录的 `CLAUDE.md` 文件中添加以下内容，让 Claude Code 知道这个 Skill 的存在：

```markdown
## 项目 Skills
- `.claude/skills/git-commit/` — Git 提交规范化
  执行相关任务时请先阅读对应 SKILL.md。
```

**第 4 步：实际使用**

1. 随便修改项目中的某个文件（加几行注释或改个变量名即可）
2. 运行 `git add .` 暂存修改
3. 在 Claude Code 中输入：

```
请用 git-commit Skill 帮我生成 commit message 并提交
```

4. Claude Code 会自动读取你的 SKILL.md，分析 `git diff --staged` 的内容，生成类似 `style(Header): 优化导航栏的响应式布局` 这样的规范化提交信息

>  **验证**：如果 Claude Code 自动读取了你的 Skill、分析了 git diff、并生成了符合 Conventional Commits 格式的 commit message，说明你的 Skill 创建成功！

**第 5 步：用 Git 提交你的 Skill**

```bash
git add .claude/skills/git-commit/
git commit -m "feat(skills): 新增 Git 提交规范化 Skill"
```

> **提示**：将 Skill 目录提交到 Git 仓库后，团队其他成员 pull 代码后也能使用这个 Skill。这就是 Skill 的共享价值。

#### 4.8.2 进阶挑战（选做）

完成基础练习后，试试这些挑战来巩固你的 Skill 创建能力：

- [ ] 修改 Git 提交 Skill，加入对**中文 commit message** 的支持
- [ ] 参考 5.3.2 节，为你当前的技术栈创建一个**组件生成 Skill**（React/Vue/任意框架）
- [ ] 参考 5.3.5 节，创建一个包含 `references/` 的**代码审查 Skill**，加入你团队的编码规范

>  **验证**：如果你能独立创建一个 Skill 并在 Claude Code 中成功触发使用，恭喜完成第四部分！

---
