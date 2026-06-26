# AI Coding 零基础实战教程

> 从零开始，用自然语言指挥 AI 构建真实软件项目。

这是一套面向零基础读者的 AI Coding 实战教程，覆盖环境准备、AI 编程基础理论、AI 编程工具生态、Claude Code 深度使用、Skills 技能系统、完整项目实战，以及 Codex Desktop 的安装和使用。

本仓库已整理成适合 GitHub Pages 托管的静态阅读站点：

- `README.md`：GitHub 仓库首页说明
- `index.html`：在线阅读首页
- `chapters/`：按章节拆分后的 Markdown 文档
- `assets/`：封面图等静态资源
- `chapters.json`：站点章节目录数据

## 在线阅读

GitHub Pages 启用后访问：

```text
https://<your-github-username>.github.io/ai-coding-tutorial/
```

本地预览地址：

```text
http://localhost:8080/
```

## 章节目录

| 章节 | 标题 | Markdown | CSDN |
| --- | --- | --- | --- |
| 00 | 不会写代码，也能用 AI 构建软件：AI Coding 零基础教程前言 | [查看](chapters/00-intro.md) | [已发布](https://blog.csdn.net/xianyu120/article/details/162344390) |
| 01 | 第零部分：环境准备与工具安装 | [查看](chapters/01-environment.md) | 待发布 |
| 02 | 第一部分：AI 编程基础理论 | [查看](chapters/02-foundations.md) | 待发布 |
| 03 | 第二部分：AI 编程工具生态 | [查看](chapters/03-tools.md) | 待发布 |
| 04 | 第三部分：Claude Code 深度使用与进阶技巧 | [查看](chapters/04-claude-code.md) | 待发布 |
| 05 | 第四部分：AI 技能系统（Skills）深度实践 | [查看](chapters/05-skills.md) | 待发布 |
| 06 | 第五部分：完整项目案例实操 | [查看](chapters/06-mini-mall.md) | 待发布 |
| 07 | 第六部分：项目实战（独立完成） | [查看](chapters/07-practice.md) | 待发布 |
| 08 | 第七部分：Codex Desktop 安装和使用教程 | [查看](chapters/08-codex-desktop.md) | 待发布 |
| 09 | 附录 | [查看](chapters/09-appendix.md) | 待发布 |

## 项目结构

```text
.
├── README.md
├── index.html
├── styles.css
├── script.js
├── chapters.json
├── assets/
│   └── cover-00-ai-coding-intro.png
└── chapters/
    ├── 00-intro.md
    ├── 01-environment.md
    ├── 02-foundations.md
    ├── 03-tools.md
    ├── 04-claude-code.md
    ├── 05-skills.md
    ├── 06-mini-mall.md
    ├── 07-practice.md
    ├── 08-codex-desktop.md
    └── 09-appendix.md
```

## 本地预览

`index.html` 会通过 `fetch` 加载 `chapters.json` 和章节 Markdown。浏览器直接打开本地文件时可能受到跨域限制，因此推荐启动静态服务器：

```bash
cd /Users/maynorai/Downloads/cursor/ai-coding-tutorial
python3 -m http.server 8080
```

然后打开：

```text
http://localhost:8080/
```

## GitHub Pages 部署

1. 在 GitHub 创建仓库，例如 `ai-coding-tutorial`
2. 添加远程仓库并推送：

```bash
cd /Users/maynorai/Downloads/cursor/ai-coding-tutorial
git remote add origin https://github.com/<your-github-username>/ai-coding-tutorial.git
git push -u origin main
```

3. 打开仓库的 `Settings -> Pages`
4. Source 选择 `Deploy from a branch`
5. Branch 选择 `main`，目录选择 `/root`

部署完成后即可在线阅读。

## 维护说明

- 新增或调整章节时，同步更新 `chapters.json` 和本 README 的章节目录。
- CSDN 发布状态更新后，同步填写对应章节的 `csdnUrl`。
- 图片资源优先使用自定义图床；仓库封面等站点资源放入 `assets/`。
