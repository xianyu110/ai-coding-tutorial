# AI Coding 零基础实战教程

> 从零开始，用自然语言指挥 AI 构建真实软件项目。

这是一套面向零基础读者的 AI Coding 实战教程，覆盖环境准备、AI 编程基础理论、Claude Code 深度使用、Skills 技能系统、完整项目实战，以及 Codex Desktop 的安装和使用。

在线阅读入口：

- GitHub Pages：启用 Pages 后访问 `https://<your-github-username>.github.io/ai-coding-tutorial/`
- 本地预览：打开 `index.html`，或在本目录启动一个静态服务器

## 章节目录

| 章节 | 标题 | CSDN |
| --- | --- | --- |
| 00 | [不会写代码，也能用 AI 构建软件：AI Coding 零基础教程前言](chapters/00-intro.md) | [已发布](https://blog.csdn.net/xianyu120/article/details/162344390) |
| 01 | [第零部分：环境准备与工具安装](chapters/01-environment.md) | 待发布 |
| 02 | [第一部分：AI 编程基础理论](chapters/02-foundations.md) | 待发布 |
| 03 | [第二部分：AI 编程工具生态](chapters/03-tools.md) | 待发布 |
| 04 | [第三部分：Claude Code 深度使用与进阶技巧](chapters/04-claude-code.md) | 待发布 |
| 05 | [第四部分：AI 技能系统（Skills）深度实践](chapters/05-skills.md) | 待发布 |
| 06 | [第五部分：完整项目案例实操](chapters/06-mini-mall.md) | 待发布 |
| 07 | [第六部分：项目实战（独立完成）](chapters/07-practice.md) | 待发布 |
| 08 | [第七部分：Codex Desktop 安装和使用教程](chapters/08-codex-desktop.md) | 待发布 |
| 09 | [附录](chapters/09-appendix.md) | 待发布 |

## 本地预览

由于 `index.html` 会通过 `fetch` 加载章节 Markdown，推荐在项目目录启动静态服务器：

```bash
python3 -m http.server 8080
```

然后打开：

```text
http://localhost:8080/
```

## GitHub Pages 部署

1. 创建 GitHub 仓库，例如 `ai-coding-tutorial`
2. 推送本目录到仓库
3. 在 GitHub 仓库设置中打开 `Settings -> Pages`
4. Source 选择 `Deploy from a branch`
5. Branch 选择 `main`，目录选择 `/root`

部署完成后即可在线阅读。
