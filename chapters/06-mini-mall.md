# AI Coding 零基础实战教程

## 第五部分：完整项目案例实操

> **学习目标**：通过从零到一的完整项目开发，掌握AI编程的全流程
>
> **完成标志**：独立使用 Claude Code 完成一个可运行的全栈项目

前面部分讲完了理论知识，这一部分动手做个项目：

一个完整可运行的微型商城——覆盖商品、用户、购物车、订单、后台管理全模块

> **提示**：本章的每个步骤都包含完整的 Prompt（可直接复制使用）和验证方法。你可以一边阅读一边跟做。
>
>   **跟做的 6 条经验**
>
>   1. 把 Claude Code 当同事用 — 直接描述你想干什么，不用纠结措辞。越具体越好。
>   2. 多用 /plan 模式 — 复杂任务先让它出方案，你审核后再动手，避免返工。
>   3. 小步快跑 — 一个任务一个任务来，别一口气提太多需求。
>   4. 善用 CLAUDE.md — 放在项目根目录，cc 会自动读取，理解你的项目规范。
>   5. 创建任务列表 — 多步骤任务告诉它"创建任务列表"，cc 会跟踪进度不遗漏。
>   6. 反馈很重要 — 它做错了就说，它会记下来以后改进。


### 5.0 项目：微型商城（Mini Mall）—— 完整演示 Claude Code 13 项核心功能

> 这是一个完整的全栈电商项目，也是本教程的**核心案例**。你将在这个项目中从零构建一个可部署的 Web 应用，并依次体验 `/plan`、CLAUDE.md、Hook、Memory、Skill、`/review`、`/security-review`、多模型切换等 Claude Code 全部核心功能。

#### 5.0.1 本章概述

在项目一中，你学会了用 Claude Code 做一个带 Web 界面的记账工具——那只是热身。本项目将带你从零构建一个**真正可部署到互联网的 Web 应用**：一个微型商城。

更重要的是，本项目将**全程演示 Claude Code 的 13 项核心功能**。你不只是学会做一个商城，你还将学会如何把 Claude Code 用到极致。

#### 5.0.2 你将学到的 Claude Code 核心功能

| # | 功能 | 是什么 | 什么时候用 |
|---|------|--------|-----------|
| 1 | `/plan` | 让 AI 先出方案，人审核后再动手 | 任何复杂任务开始前 |
| 2 | `/init` + CLAUDE.md | 自动生成项目规范文档 | 项目搭好后，让 AI 理解你的规范 |
| 3 | Task 任务列表 | 把大任务拆成小步骤，逐个跟踪 | 多步骤任务时告诉 AI "创建任务列表" |
| 4 | 自定义 Skill | 把重复性工作封装成可复用的"操作手册" | 相同的模式要重复做多次时 |
| 5 | 官方 Skill | 使用社区维护的高质量技能 | 需要前端设计、文档生成等专业能力时 |
| 6 | Hook 配置 | 让 AI 在特定操作前后自动执行命令 | 每次改完代码想自动格式化时 |
| 7 | Memory 系统 | 让 AI 记住你的偏好，越用越懂你 | 你的技术偏好、项目约定 |
| 8 | `/review` | 让 AI 审查代码质量 | 每完成一个功能模块后 |
| 9 | `/security-review` | 安全检查：密码、认证、漏洞 | 认证模块完成 + 上线前 |
| 10 | 多模型切换 | 简单任务用便宜模型，复杂任务用强模型 | 省钱 + 提效 |
| 11 | 权限模式 | 控制 AI 的操作权限 | 保护你的代码不被意外修改 |
| 12 | Git 工作流 | 版本控制，随时能"后悔" | 每个功能完成后提交一次 |
| 13 | 环境变量管理 | API 密钥、数据库连接等敏感信息 | 任何需要连接外部服务的项目 |

#### 5.0.3 我们要做什么

一个**微型电商网站**，包含：

```
买家视角：浏览商品 → 搜索筛选 → 查看详情 → 注册登录 → 加入购物车 → 下单 → 模拟支付 → 查看订单
管理员视角：商品管理（增删改查）→ 订单管理（状态流转）→ 分类管理
```

![Mini Mall 首页示意](https://upload.maynor1024.live/file/1782457941444_mini-mall-homepage-mock.svg)

#### 5.0.4 技术栈说明

| 层面 | 选型 | 为什么选它 |
|------|------|-----------|
| 框架 | Next.js 16 | 前后端一体化，一个项目搞定全部 |
| 语言 | TypeScript | 类型安全，AI 写代码时能自动发现低级错误 |
| 数据库 | SQLite + Prisma 5 | SQLite 零配置，Prisma 让数据库操作像写作文一样直观 |
| 样式 | TailwindCSS 4 | 无需写 CSS 文件，直接在标签上加样式类名 |
| 认证 | 自制 Cookie Session | 比第三方库更透明，能看到认证的每一步 |

> 提示： **为什么不用 MySQL/PostgreSQL？** SQLite 是一个单文件数据库，不需要安装数据库服务器，开箱即用。对于学习阶段和原型项目，它是完美的选择。如果将来需要迁移到 PostgreSQL，只需要改一行配置。

---

### 5.1 项目启动：用 /plan 做架构设计

> **本节目标**：学会用 `/plan` 模式让 AI 在动手前先出方案
>
> **演示的 Claude Code 功能**：`/plan` 模式、AskUserQuestion

#### 5.1.1 什么是 /plan 模式，为什么重要

新手最容易犯的错误是：上来就让 AI 写代码。结果往往是 AI 写了一堆，方向偏了，又要重来。

`/plan` 模式的思路是**先想清楚再动手**：

```
你说"我要做什么"
  → AI 探索代码库、理解现状
  → AI 出一个详细方案
  → 你审核，确认方向正确
  → AI 按方案分步实施
```

这就像装修之前先出设计图——你不会让装修队直接开砸吧？

#### 5.1.2 实际操作

在终端中进入项目目录后，启动 Claude Code：

```bash
$ claude
```

然后告诉它你的需求：

```
我要做一个微型电商项目，叫 Mini Mall。
技术栈用 Next.js 16 + TypeScript + Prisma 5 + SQLite + TailwindCSS 4。
功能包括：
- 商品浏览（列表、详情、搜索、分类筛选）
- 用户注册登录
- 购物车
- 下单和订单管理（模拟支付）
- 后台管理（商品CRUD、订单管理、分类管理）

请用 /plan 模式帮我做架构设计。
```

Claude Code 会进入 plan 模式，提出几个问题来确认你的需求（这就是 AskUserQuestion 功能），比如：

- 用什么语言？（TypeScript）
- 用什么样式方案？（TailwindCSS）
- 你是新手还是老手？（新手友好）

确认后，AI 会生成一份完整的架构方案，包括：

```
数据库设计：6 个表的 ER 关系图
页面路由：10 个页面的路径和权限
API 设计：18 个接口的请求/响应格式
项目目录结构：每个文件放哪里
实施步骤：按什么顺序开发
```

![Mini Mall 规划模式输出截图](https://upload.maynor1024.live/file/1782457944433_电商项目1.png)

#### 5.1.3 阅读和审核方案

AI 出的方案不是圣旨——你才是决策者。仔细看一下：

-  数据库设计合理吗？（用户-商品-购物车-订单的关系是否清晰）
-  页面路由符合预期吗？（有没有漏掉什么页面）
-  技术选型合适吗？（有没有过度设计）

确认无误后，告诉 AI "可以开始"。

>  **验证**：AI 输出了包含数据库设计、页面路由、API 列表的完整方案，你审核后表示同意。

#### 5.1.4 你学到了什么

| 概念 | 说明 |
|------|------|
| `/plan` 模式 | 先规划后编码，避免方向性返工 |
| AskUserQuestion | AI 会主动问你不确定的问题，而不是瞎猜 |
| 架构方案 | 包含 ER 图、路由表、API 清单的完整设计文档 |

---

### 5.2 环境搭建：项目骨架 + CLAUDE.md

> **本节目标**：创建 Next.js 项目，生成 CLAUDE.md 让 AI 始终理解你的项目
>
> **演示的 Claude Code 功能**：`/init`、CLAUDE.md

#### 5.2.1 创建项目

在终端执行以下命令：

```bash
# 1. 进入工作目录
cd ~/projects

# 2. 用 create-next-app 创建项目（会自动安装依赖）
npx create-next-app@latest mini-mall --typescript --tailwind --app --src-dir

# 3. 进入项目目录
cd mini-mall

# 4. 安装额外依赖
npm install prisma @prisma/client bcryptjs
npm install -D tsx @types/bcryptjs
```

> 注意： **避坑**：项目路径不要用中文，否则某些工具会出奇怪的问题。

![Mini Mall 项目创建过程截图](https://upload.maynor1024.live/file/1782457950658_QQ20260516-145849.png)

#### 5.2.2 初始化 Prisma（数据库 ORM）

```bash
# 初始化 Prisma，选择 SQLite 作为数据库
npx prisma init --datasource-provider sqlite
```

这个命令会创建 `prisma/schema.prisma` 文件和 `.env` 环境变量文件。

#### 5.2.3 CLAUDE.md — AI 的项目"说明书"

CLAUDE.md 是 Claude Code 最核心的概念之一。它是一个放在项目根目录的 Markdown 文件，**每次你和 AI 对话时，AI 都会自动读取它**。

你可以把 CLAUDE.md 理解为给 AI 的"项目说明书"——里面写了：

- 用了什么技术栈
- 文件怎么组织的
- 命名规范是什么
- 有什么特殊的约定

##### 5.2.3.1 两种方式创建 CLAUDE.md

**方式一：让 AI 自动生成**

在 Claude Code 对话中输入：

```
/init
```

AI 会扫描你的项目结构，自动生成一份 CLAUDE.md。

**方式二：自己写（更精确）**

你可以在 CLAUDE.md 中写任何你想让 AI 记住的信息。以下是我们项目的 CLAUDE.md 内容：

```markdown
# Mini Mall 项目规范

## 技术栈
- 框架：Next.js 16 (App Router) + TypeScript
- 样式：TailwindCSS 4
- 数据库：SQLite + Prisma 5
- 认证：自制 Cookie Session + bcryptjs

## 目录结构
- src/app/ — 页面和 API
- src/components/ — 可复用组件
- src/lib/ — 工具函数
- prisma/ — 数据库模型

## 命名规范
- 文件名：kebab-case（如 product-card.tsx）
- 组件：PascalCase（如 ProductCard）
- 函数：camelCase（如 getProducts）

## 约定
- 所有 UI 文案和注释用中文
- 优先使用 Server Components
- API 返回 JSON，错误返回 { error: string }
```

> **提示**：有了 CLAUDE.md，你不需要每次对话都重新解释项目背景。AI 会自动读取它，就像新同事入职时先看员工手册一样。

#### 5.2.4 定义数据库模型

在 `prisma/schema.prisma` 中定义 6 个数据模型。以下是完整的模型定义：

```prisma
// 用户
model User {
  id      Int      @id @default(autoincrement())
  name     String
  email    String    @unique
  password  String
  role     String    @default("USER")  // USER 或 ADMIN
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  cartItems CartItem[]
  orders   Order[]
}

// 商品分类
model Category {
  id      Int      @id @default(autoincrement())
  name    String   @unique
  slug    String   @unique      // URL 友好的英文标识
  products Product[]
}

// 商品
model Product {
  id        Int       @id @default(autoincrement())
  name      String
  description String     @default("")
  price      Float
  image      String     @default("")
  stock      Int       @default(0)
  categoryId  Int
  category   Category   @relation(fields: [categoryId], references: [id])
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  cartItems   CartItem[]
  orderItems  OrderItem[]
}

// 购物车项
model CartItem {
  id      Int     @id @default(autoincrement())
  userId   Int
  productId Int
  quantity  Int     @default(1)
  user     User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  product   Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  @@unique([userId, productId])  // 同一用户同一商品只允许一条记录
}

// 订单
model Order {
  id      Int       @id @default(autoincrement())
  userId   Int
  status   String     @default("PENDING")
  total    Float
  createdAt DateTime   @default(now())
  user     User      @relation(fields: [userId], references: [id])
  items    OrderItem[]
}

// 订单明细
model OrderItem {
  id        Int    @id @default(autoincrement())
  orderId    Int
  productId   Int
  productName String  // 下单时锁定商品名，防止后续改名影响历史订单
  price      Float   // 下单时锁定价格
  quantity   Int
  order      Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product    Product @relation(fields: [productId], references: [id])
}
```

然后执行迁移：

```bash
# 生成 Prisma 客户端 + 创建数据库表
npx prisma migrate dev --name init
```

> **提示**：Prisma 的 `migrate dev` 做了三件事：1）对比 schema 和数据库；2）生成迁移 SQL 文件；3）应用到数据库。这些迁移文件可以提交到 Git，团队成员都能复现相同的数据库结构。

#### 5.2.5 填充种子数据

空数据库没法开发。写一个种子脚本，插入 12 个商品和 2 个测试用户。

创建 `prisma/seed.ts`：

```typescript
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 创建 5 个分类
  const categories = await Promise.all([
   prisma.category.create({ data: { name: "数码电子", slug: "digital" } }),
   prisma.category.create({ data: { name: "服装鞋帽", slug: "clothing" } }),
   prisma.category.create({ data: { name: "家居生活", slug: "home" } }),
   prisma.category.create({ data: { name: "食品饮料", slug: "food" } }),
   prisma.category.create({ data: { name: "图书教育", slug: "books" } }),
  ]);

  // 创建 12 个商品（代码略，见完整源码）
  // ...

  // 创建管理员和测试用户
  const adminPassword = await bcrypt.hash("admin123", 10);
  const userPassword = await bcrypt.hash("user123", 10);
  await prisma.user.create({
   data: { name: "管理员", email: "admin@example.com", password: adminPassword, role: "ADMIN" },
  });
  await prisma.user.create({
   data: { name: "测试用户", email: "user@example.com", password: userPassword, role: "USER" },
  });

  console.log("种子数据创建完成！");
}

main().finally(() => prisma.$disconnect());
```

在 `package.json` 中添加 seed 配置：

```json
"prisma": {
  "seed": "tsx prisma/seed.ts"
}
```

执行：

```bash
npx prisma db seed
```

>  **验证**：终端输出 "种子数据创建完成"。数据库中已有 5 个分类、12 个商品、2 个用户。

#### 5.2.6 你学到了什么

| 概念 | 说明 |
|------|------|
| create-next-app | Next.js 官方脚手架，一键生成项目 |
| Prisma | ORM 工具，用代码定义数据库结构 |
| Prisma Migrate | 数据库版本管理，像 Git 管理代码一样管理数据库 |
| Seed 脚本 | 开发阶段用来填充测试数据 |
| CLAUDE.md | AI 的项目说明书，每次对话自动加载 |

---

### 5.3 配置 Claude Code：Hook + 权限模式 + Memory

> **本节目标**：配置 Claude Code 的进阶设置，让开发更安全、更高效
>
> **演示的 Claude Code 功能**：Hook 配置、权限模式、Memory 系统

#### 5.3.1 Hook 配置：让 AI 自动执行命令

Hook（钩子）是 Claude Code 的一个强大功能——你可以在特定事件发生时（比如 AI 修改了文件），自动触发一条命令。

在我们的项目中，创建一个 `.claude/settings.json` 文件：

```json
{
  "permissions": {
   "allow": [
     "Bash(npm run dev)",
     "Bash(npm run build)",
     "Bash(npx prisma *)",
     "Bash(npm install *)"
   ]
  },
  "hooks": {
   "PostToolUse": [
     {
      "matcher": "Write|Edit",
      "hooks": [
        {
         "type": "command",
         "command": "echo \"文件已修改，建议检查一下改了什么\""
        }
      ]
     }
   ]
  }
}
```

解释一下这段配置：

- **`permissions.allow`**：这些命令 AI 可以直接执行，不需要每次弹出确认框
- **`hooks.PostToolUse`**：当 AI 使用 Write 或 Edit 工具修改文件后，自动执行提醒命令

> **提示**：Hook 可以做很多事——自动运行 Prettier 格式化代码、自动运行 ESLint 检查、甚至自动提交 Git。但初期不建议配置太多，够用就好。

#### 5.3.2 权限模式：控制 AI 的"自由度"

Claude Code 有三种权限模式，针对不同的场景：

| 模式 | 行为 | 适用场景 |
|------|------|---------|
| **Safe（安全）** | 所有危险操作都需要确认 | 新手阶段，不想让 AI 乱动文件 |
| **Approve（审批）** | 大部分操作要确认 | 日常开发，看到关键操作再放行 |
| **Edit（编辑）** | AI 自主操作 | 信任 AI，不想频繁点确认 |

> **注意**：建议初期使用 Approve 模式。当 AI 要执行 `rm -rf`、`git push --force` 等危险操作时，它会强制要求确认——这是保护你的最后一道防线。

![Claude Code 权限模式对比示意](https://upload.maynor1024.live/file/1782457947929_claude-permission-modes.svg)

#### 5.3.3 Memory 系统：让 AI 记住你的偏好

Memory 是 Claude Code 的持久化记忆系统。你可以让 AI 记住：

- 你的技术偏好："我喜欢用 TypeScript 严格模式"
- 项目约定："这个项目用 TailwindCSS，不要写 CSS 文件"
- 你踩过的坑："上次用 Prisma 7 有兼容问题，这次用 Prisma 5"

在任何对话中，直接告诉 AI：

```
请记住：我所有的项目都用 TypeScript 严格模式，UI 文案用中文，代码注释用中文。
```

AI 会把这条信息存到持久化记忆中，以后的对话都会自动读取。

>  **验证**：后续对话中问 AI "我们之前约定过编码规范吗？"——AI 会从 Memory 中检索并回答你。

#### 5.3.4 你学到了什么

| 概念 | 说明 |
|------|------|
| settings.json | Claude Code 的配置文件，控制权限、Hook 等 |
| Hook | 事件触发的自动命令 |
| 权限模式 | Safe / Approve / Edit 三种级别 |
| Memory | 跨对话持久化的记忆系统 |

---

### 5.4 创建自定义 Skill：api-crud-generator  重点

> **本节目标**：手把手创建你的第一个自定义 Skill，理解 Skill 的完整结构
>
> **演示的 Claude Code 功能**：自定义 Skill、Skill 的四层目录结构

#### 5.4.1 为什么要创建 Skill

在电商项目中，你会反复做同样的事情：

```
商品需要 CRUD → 写 Prisma 查询 + API Route + 管理页面
分类需要 CRUD → 写 Prisma 查询 + API Route + 管理页面
订单需要 CRUD → 写 Prisma 查询 + API Route + 管理页面
```

每次都是相似的代码结构，只是换了个模型名。如果每次都让 AI 从零写，不仅慢，而且每次的代码风格可能不一致。

Skill 就是解决这个问题的——**把重复的模式封装成可复用的"标准操作流程"**。

#### 5.4.2 Skill 的目录结构

一个完整的 Skill 是一个目录，推荐放在 `.claude/skills/` 下：

```
.claude/skills/api-crud-generator/
├── SKILL.md           ← 核心：技能描述文件（必选）
├── scripts/           ← 辅助脚本（可选）
├── resources/         ← 模板和配置（可选）
└── references/         ← 参考文档（可选）
```

对于我们这个项目，只需要 `SKILL.md` 就够了。

#### 5.4.3 编写 SKILL.md

创建 `.claude/skills/api-crud-generator/SKILL.md`：

```markdown
---
name: api-crud-generator
version: 1.0
description: 根据 Prisma 模型生成标准的 Next.js API Route + 前端管理页面
trigger: ["生成CRUD", "生成接口", "生成管理页面"]
---

# API CRUD 生成器

## 功能说明
根据指定的 Prisma 模型，自动生成标准的管理后台 CRUD 代码：
1. API Routes（5 个）：GET 列表、GET 详情、POST 创建、PUT 更新、DELETE 删除
2. 前端页面：数据列表页、创建/编辑表单

## 执行步骤

### 第 1 步：确认模型信息
询问用户：
- 要生成的模型名称（如 Product、Category）
- API 路径（如 /api/admin/products）
- 页面路由（如 /admin/products）

### 第 2 步：生成 API Route Handlers
按照标准模板生成以下文件：
1. `route.ts` — GET 列表 + POST 创建
2. `[id]/route.ts` — GET 详情 + PUT 更新 + DELETE 删除

### 第 3 步：生成前端管理页面
生成一个包含以下功能的管理页面：
- 数据表格（列出所有字段）
- "新增"按钮 + 表单
- 每行的"编辑"和"删除"按钮
- TailwindCSS 样式

### 第 4 步：确认并验证
- 列出所有生成的文件
- 提醒用户执行 npx prisma generate（如果模型有变更）
- 给出测试方法

## 注意事项
- 所有 UI 文案使用中文
- 使用 Next.js App Router 的 params 语法
- 创建和更新前做输入验证
- 密码字段永远不通过 API 返回
```

#### 5.4.4 SKILL.md 的结构解析

每个 Skill 文件包含两部分：

**1. Frontmatter（文件头部的 YAML 元数据）**
```yaml
---
name: 技能唯一名称
description: 一句话描述
trigger: 触发关键词列表
---
```

- `name`：技能的唯一标识
- `description`：帮助 AI 判断什么时候该用这个技能
- `trigger`：当用户消息包含这些关键词时，AI 知道要加载这个 Skill

**2. 正文（Markdown 格式的指令）**

这是 AI 执行任务时会阅读的"操作手册"。写得好坏直接决定 AI 的输出质量。

> **提示**：写 Skill 时想象你在给一个聪明的实习生写工作说明书——告诉他做什么、用什么工具、注意什么坑。

#### 5.4.5 在开发中使用 Skill

创建好 Skill 后，在 Claude Code 对话中，你只需要这样说：

```
请用 api-crud-generator Skill 为 Category 模型生成管理后台代码。
API 路径放在 /api/admin/categories，页面放在 /admin/categories。
```

AI 会：
1. 自动加载 SKILL.md 中的指令
2. 按照步骤 1-4 的标准流程执行
3. 生成符合项目规范的代码

这就是 Skill 的威力——**一次编写，反复使用，标准统一**。

#### 5.4.6 你学到了什么

| 概念 | 说明 |
|------|------|
| Skill 的定义 | 封装了特定能力的可复用指令集 |
| Frontmatter | Skill 的元数据，AI 用来判断何时加载 |
| SKILL.md | Skill 的核心载体 |
| 触发关键词 | 用户说什么话会激活这个 Skill |
| `@` 引用 | 安装官方 Skill 的方式，如 `anthropics/skills@frontend-design` |

---

### 5.5 商品模块开发

> **本节目标**：完成商品的增删查改全流程，学会用 Skill 加速开发
>
> **演示的 Claude Code 功能**：自定义 Skill 实战、/review、官方 Skill

#### 5.5.1 开发思路

商品模块是最核心的模块，包含：

```
后端 API        前端页面
──────────      ──────────
GET /api/products    →  首页商品列表（搜索 + 分类筛选 + 分页）
GET /api/products/[id] →  商品详情页
GET /api/categories   →  顶部导航的分类标签
```

（管理员接口稍后在 6.8 节实现）

#### 5.5.2 用 Prompt 驱动开发

在 Claude Code 对话中输入：

```
请实现商品模块的公开 API：
1. GET /api/products — 商品列表，支持 search（模糊搜索）、category（按slug筛选）、page（分页，每页9条）
2. GET /api/products/[id] — 商品详情，包含关联的分类信息
3. GET /api/categories — 分类列表，包含每个分类下的商品数量

然后实现前端页面：
1. 首页 — 商品网格展示 + 搜索框 + 分类标签切换 + 分页
2. 商品详情页 — 大图 + 名称/价格/描述/库存 + "加入购物车"按钮

要求：
- 用 Server Component 做数据获取
- 用 TailwindCSS 做样式
- UI 文案用中文
- 参考 CLAUDE.md 中的项目规范
```

AI 会：
1. 读取 CLAUDE.md 了解项目规范
2. 读取 Prisma schema 了解数据模型
3. 按照你的要求生成代码
4. 告诉你每个文件的用途

![商品模块开发流程示意](https://upload.maynor1024.live/file/1782457948624_mini-mall-product-flow.svg)

#### 5.5.3 代码审查：用 /review 检查质量

每个模块开发完后，用 `/review` 让 AI 做一次代码审查：

```
/review
```

AI 会检查：
-  代码是否符合项目规范
-  有没有潜在的性能问题（如 N+1 查询）
-  错误处理是否完善
-  类型定义是否正确

> **提示**：`/review` 类似于让一个高级工程师帮你 Code Review。它可能不会发现所有问题，但能帮你揪出大部分低级错误。

![Claude Code 代码审查输出示意](https://upload.maynor1024.live/file/1782457952446_claude-review-terminal.svg)

#### 5.5.4 你学到了什么

| 概念 | 说明 |
|------|------|
| Server Component | Next.js 默认的服务端组件，可以直接访问数据库 |
| 分页实现 | skip + take 实现数据库级分页 |
| 关联查询 | Prisma 的 include 语法加载关联数据 |
| /review | 让 AI 审查代码质量 |

---

### 5.6 用户认证模块

> **本节目标**：实现注册登录系统，理解认证的基本原理
>
> **演示的 Claude Code 功能**：/security-review、多模型切换

#### 5.6.1 认证基础：Cookie + Session

我们用最简单也最透明的认证方案——**Cookie Session**：

```
注册：用户填邮箱+密码 → bcrypt 哈希密码 → 存入数据库
登录：验证邮箱+密码 → 生成 session token → 写入 Cookie
鉴权：每次请求读取 Cookie → 解析出用户 ID → 判断权限
```

> 提示： **为什么不直接用 next-auth？** next-auth 很强大，但它是"黑盒"——你不知道内部怎么工作的。对于教学来说，自己实现一个简易的认证系统，能看到每一步的细节，更容易理解认证的本质。学会原理后，再用 next-auth 也不迟。

#### 5.6.2 实现认证系统

在 Claude Code 中输入：

```
请实现一个简易的用户认证系统：

1. 创建 src/lib/auth.ts，包含以下函数：
   - hashPassword(password) — 用 bcryptjs 哈希密码
   - verifyPassword(password, hash) — 验证密码
   - setSession(userId, role) — 把用户信息写入 httpOnly Cookie
   - getSession() — 从 Cookie 读取当前用户信息
   - getCurrentUser() — 获取当前用户的完整信息
   - clearSession() — 清除 Cookie（退出登录）

2. 实现 API：
   - POST /api/auth/register — 注册（验证邮箱唯一性，密码至少6位）
   - POST /api/auth/login — 登录（验证密码，写入session）
   - GET /api/auth/me — 获取当前用户
   - POST /api/auth/logout — 退出登录

3. 实现前端页面：
   - /login — 登录表单
   - /register — 注册表单

要求：
- 密码用 bcryptjs 哈希存储，绝不能存明文
- 登录失败时不要暴露"用户不存在"和"密码错误"的区别（防止撞库攻击）
- Session Cookie 设置 httpOnly + sameSite + secure（生产环境）
```

#### 5.6.3 安全审查：用 /security-review 检查

认证模块涉及用户数据安全。让 AI 做一次安全检查：

```
/security-review
```

AI 会检查：
-  密码是否正确哈希存储（绝对不能明文）
-  有没有 SQL 注入风险（Prisma 已经帮我们预防了）
-  Session Cookie 的安全属性是否正确
-  错误信息是否泄露了系统内部信息

> **注意**：`/security-review` 是一个参考性检查，不能替代专业的安全审计。但它能帮你发现大部分常见的安全问题，是上线前的重要一步。

![Claude Code 安全审查输出示意](https://upload.maynor1024.live/file/1782457957899_claude-security-review-terminal.svg)

#### 5.6.4 多模型切换实战

在这个项目中，你可以体验多模型切换的实际收益：

| 任务 | 推荐模型 | 理由 |
|------|---------|------|
| 写用户认证逻辑 | Claude Opus | 安全相关，要确保万无一失 |
| 写登录页面 UI | Claude Haiku | 简单表单，Haiku 足够且更快更便宜 |
| 日常功能开发 | Claude Sonnet | 速度和质量的最佳平衡 |

切换模型只需一条命令：

```
/model opus     ← 切换到 Opus，处理复杂逻辑
/model sonnet   ← 切回 Sonnet，日常开发
/model haiku    ← 切换到 Haiku，快速轻量任务
```

> 提示： **省钱技巧**：每天开发结束时，用 `/cost` 查看当天的 API 费用。如果发现账单太高，下次更多用 Haiku 处理简单任务。

#### 5.6.5 你学到了什么

| 概念 | 说明 |
|------|------|
| bcrypt | 密码哈希算法，即使数据库泄露，密码也无法被还原 |
| Cookie Session | 最简单的认证方案，Cookie 里存标识，服务端验证 |
| httpOnly Cookie | JavaScript 无法读取，防止 XSS 攻击偷取 Cookie |
| /security-review | AI 辅助的安全检查 |
| /model 切换 | 按任务复杂度选择不同级别的模型 |

---

### 5.7 购物车 + 订单模块

> **本节目标**：实现电商的核心交易流程
>
> **演示的 Claude Code 功能**：Task 任务列表、复杂业务逻辑处理

#### 5.7.1 用 Task 管理复杂模块

购物车和订单模块涉及多个子任务。告诉 AI：

```
请创建任务列表，跟踪购物车和订单模块的开发进度。
```

AI 会帮你拆分成：

```
□ 购物车 API（GET、POST、PUT、DELETE）
□ 购物车页面（展示、修改数量、删除、提交订单）
□ 订单 API（GET 列表、GET 详情、POST 下单）
□ 订单页面（列表页、详情页）
□ 订单状态机（PENDING → PAID → SHIPPED → COMPLETED）
```

每完成一项，AI 会自动标记为完成，你随时知道进度。

![Claude Code Task 列表进度截图](https://upload.maynor1024.live/file/1782457950658_QQ20260516-145849.png)

#### 5.7.2 实现购物车

在 Claude Code 中输入：

```
请实现购物车功能：

API：
- GET /api/cart — 获取当前用户的购物车（需登录）
- POST /api/cart — 加入购物车（productId + quantity）
  - 如果购物车已有该商品，增加数量
  - 检查库存，库存不足返回错误
- PUT /api/cart/[id] — 修改数量
- DELETE /api/cart/[id] — 删除某项

前端页面 /cart：
- 列表展示购物车商品（图片、名称、单价、数量、小计）
- 每项可以 + / - 调整数量，或删除
- 底部显示总价，"提交订单"按钮
- 未登录时跳转到登录页
```

#### 5.7.3 实现订单和"模拟支付"

```
请实现订单功能：

API：
- POST /api/orders — 从购物车创建订单
  - 在数据库事务中：创建订单 → 扣减库存 → 清空购物车
  - 如果库存不足，返回具体哪个商品缺货
- GET /api/orders — 我的订单列表
- GET /api/orders/[id] — 订单详情
- PUT /api/orders/[id] — 模拟支付（PENDING → PAID）

前端页面：
- /orders — 订单列表（订单号、金额、状态标签、时间）
- /orders/[id] — 订单详情（商品明细、合计、状态、模拟支付按钮）

订单状态流转：
PENDING（待付款）→ PAID（已支付）→ SHIPPED（已发货）→ COMPLETED（已完成）
                                               CANCELLED（已取消）← 可从任意状态取消
```

#### 5.7.4 核心业务逻辑解析

**为什么下单要用数据库事务？**

下单涉及三个操作：创建订单 + 扣减库存 + 清空购物车。这三个操作必须**要么全做，要么全不做**。如果创建了订单但库存扣减失败了——用户付了钱但库存没减，后续会超卖。

Prisma 的事务写法：

```typescript
const order = await prisma.$transaction(async (tx) => {
  // 1. 创建订单
  const newOrder = await tx.order.create({ data: { ... } });
  // 2. 扣减库存
  await tx.product.update({ where: { id }, data: { stock: { decrement: qty } } });
  // 3. 清空购物车
  await tx.cartItem.deleteMany({ where: { userId } });
  return newOrder;
});
// 如果任何一步失败，前面已执行的操作会自动回滚
```

**为什么订单明细要存 productName 和 price？**

历史订单不应该受后续商品修改影响。如果一个月后商品改名或涨价，你的历史订单不应该跟着变。所以下单时把商品名和价格"快照"到 OrderItem 表里。

#### 5.7.5 你学到了什么

| 概念 | 说明 |
|------|------|
| 数据库事务 | 保证多个操作要么全成功要么全失败 |
| 库存扣减时机 | 下单时扣减，防止超卖 |
| 数据快照 | 历史数据不应该受后续修改影响 |
| Task 管理 | 复杂模块拆成小任务，逐个跟踪 |

---

### 5.8 后台管理模块

> **本节目标**：用 Skill 快速生成后台 CRUD，实现管理功能
>
> **演示的 Claude Code 功能**：自定义 Skill 的复用、权限校验

#### 5.8.1 使用自定义 Skill 加速开发

还记得 6.4 节创建的 `api-crud-generator` Skill 吗？现在它派上用场了：

```
请用 api-crud-generator Skill 为后台管理生成以下模块：

1. 商品管理 /admin/products
   - API: GET/POST /api/admin/products
   - API: PUT/DELETE /api/admin/products/[id]
   - 页面：表格列表 + 新增/编辑表单

2. 订单管理 /admin/orders
   - API: GET /api/admin/orders（所有订单列表）
   - API: PUT /api/admin/orders/[id]（更新订单状态）
   - 页面：表格列表 + 状态流转按钮

3. 分类管理 /admin/categories
   - API: GET/POST /api/admin/categories
   - API: DELETE /api/admin/categories/[id]
   - 页面：列表 + 新增表单

所有后台页面需要验证当前用户是否为 ADMIN 角色。
```

> **提示**：这就是 Skill 的价值——如果没有 api-crud-generator，你需要为三个模块分别写几乎相同的 Prompt。有了 Skill，一句话就搞定了。

#### 5.8.2 权限校验

后台页面通过 Server Component 做权限校验：

```typescript
// src/app/admin/page.tsx
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
   redirect("/login");  // 非管理员直接跳转
  }
  // ... 页面内容
}
```

注意：**服务端校验是必须的**。不能只在客户端隐藏按钮——用户可以通过浏览器开发者工具直接调用 API。所以 API Route 里也要做权限检查（本项目简化处理，实际生产环境每个管理 API 都应该做）。

#### 5.8.3 更新导航栏

后台模块完成后，更新 Navbar 组件：

- 未登录时：显示"登录"按钮
- 登录后：显示用户名 + 购物车 + 我的订单
- 管理员：额外显示"后台管理"入口
- 点击"退出"：清除 Cookie，回到首页

AI 能根据会话状态动态展示导航菜单，提升用户体验。

#### 5.8.4 你学到了什么

| 概念 | 说明 |
|------|------|
| Skill 复用 | 一次创建，在多个模块中反复使用 |
| 权限校验 | 服务端检查用户角色，不能只靠前端 |
| redirect | Next.js 的服务端跳转方法 |

---

### 5.9 上线前审查 + 项目复盘

> **本节目标**：用 /review 和 /security-review 做最终检查，回顾完整项目
>
> **演示的 Claude Code 功能**：/review、/security-review、Git 工作流

#### 5.9.1 全量安全审查

所有功能完成后，做一次完整的安全检查：

```
/security-review
```

AI 会从多个维度检查：

| 维度 | 检查内容 |
|------|---------|
| 认证安全 | 密码正确哈希？Session 安全？ |
| 数据安全 | API 是否暴露了不该暴露的字段？ |
| 输入验证 | 是否有未验证的用户输入？ |
| 权限控制 | 管理接口是否正确保护？ |

> **注意**：AI 的安全审查不能替代专业安全审计。如果是真的上线的项目，还需要做渗透测试、依赖漏洞扫描等。

#### 5.9.2 最终代码审查

```
/review
```

AI 会给出代码质量报告，包括：
- 代码风格是否一致
- 有没有未使用的变量/导入
- 有没有潜在的运行时错误
- 改进建议

#### 5.9.3 Git 工作流回顾

看看我们一路走来的提交历史：

```bash
git log --oneline
```

理想情况下，你应该看到类似这样的提交历史：

```
a1b2c3d feat: 后台管理模块（商品/订单/分类 CRUD）
d4e5f6g feat: 购物车 + 订单模块
g7h8i9j feat: 用户认证模块（注册/登录/Session）
j0k1l2m feat: 商品模块（API + 前端页面）
m3n4o5p feat: 数据库模型 + 种子数据
p6q7r8s chore: 项目初始化
```

每个功能一个 commit，提交信息清晰明了。这就是良好的 Git 实践。

> **提示**：用 AI 开发时，养成一个习惯——**在让 AI 做大改动之前，先 `git add . && git commit`**。这样即使 AI 改坏了，你也能随时回到上一个正确的版本。这是无数 AI 编程老手的血泪经验。

#### 5.9.4 项目运行指南

```bash
# 1. 进入项目
cd mini-mall

# 2. 安装依赖
npm install

# 3. 初始化数据库
npx prisma migrate dev
npx prisma db seed

# 4. 启动开发服务器
npm run dev

# 5. 浏览器打开 http://localhost:3000
```

测试账号：
- 管理员：`admin@minimall.com` / `admin123`
- 用户：`user@example.com` / `user123`

#### 5.9.5 完整用户流程测试

```
1. 打开首页 → 看到 12 个商品，按分类筛选，搜索
2. 点击商品 → 查看详情
3. 注册新账号 → 登录
4. 加入购物车 → 修改数量 → 删除某项
5. 提交订单 → 查看订单列表 → 点击"模拟支付"
6. 退出 → 管理员登录 → 访问 /admin
7. 后台添加商品 → 编辑商品 → 管理订单状态
```

![Mini Mall 最终交付检查示意](https://upload.maynor1024.live/file/1782457960485_mini-mall-delivery-checklist.svg)

#### 5.9.6 你学到了什么

| 概念 | 说明 |
|------|------|
| /security-review | AI 辅助的安全检查，上线前必做 |
| /review | AI 代码审查，保证质量 |
| Git 提交规范 | 每个功能一个 commit，清晰可追溯 |
| 完整的项目交付 | 从架构设计到最终审查的完整闭环 |

---

### 5.10 项目总结：13 项 Claude Code 功能清单

| # | 功能 | 你在本项目中哪里用过 | 什么时候再用 |
|---|------|-------------------|-------------|
| 1 | `/plan` | 6.1 项目启动 | 任何新项目/新功能开始前 |
| 2 | CLAUDE.md | 6.2 环境搭建 | 每个项目都要有 |
| 3 | Task 任务列表 | 6.7 购物车开发 | 多步骤复杂任务 |
| 4 | 自定义 Skill | 6.4 创建 + 6.8 复用 | 重复性工作封装 |
| 5 | 官方 Skill | 文档提到 frontend-design | 需要专业能力时 |
| 6 | Hook 配置 | 6.3 配置 | 项目初始化时配置一次 |
| 7 | Memory | 6.3 配置 | 偏好和约定记录 |
| 8 | `/review` | 6.5 + 6.9 | 每个模块完成后 |
| 9 | `/security-review` | 6.6 + 6.9 | 认证模块 + 上线前 |
| 10 | 多模型切换 | 6.6.4 讨论 | 复杂逻辑用 Opus，UI 用 Haiku |
| 11 | 权限模式 | 6.3.2 讨论 | 根据信任程度调整 |
| 12 | Git 工作流 | 6.9.3 回顾 | 全程 |
| 13 | `.env` 管理 | 6.2 | 存储密钥和配置 |

---

### 5.11 下一步

完成了这个复杂项目，你已经掌握了 Claude Code 的核心用法。接下来进入第六部分——**独立实战**。从项目列表中选择一个你感兴趣的项目，不再依赖详细的 Prompt，自己规划、自己驱动。你准备好了。

如果你在独立实战中遇到问题，记住这个口诀：

```
先想清楚再问 AI（/plan）
让 AI 知道项目背景（CLAUDE.md）
小步快跑逐个来（Task）
做完一步存一步（Git commit）
```

---
