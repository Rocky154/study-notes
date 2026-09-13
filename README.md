# 📒 我的学习笔记

一个极简的个人笔记站：笔记就是 `notes/` 里的 Markdown 文件，网页自动读取、渲染、搜索。

---

## 日常怎么用

### 看笔记（本机）

双击 **`本地预览.command`** → 浏览器自动打开 `http://localhost:8765`。
关掉弹出的终端窗口即可停止。

### 加一篇笔记（三种方式，任选）

**方式 A：让 Claude 帮你写（最省事）**
总结完直接说“把这个加到笔记站”，新的 `.md` 文件会写进 `notes/`，索引也会自动重建。

**方式 B：在网页里写**
点右上角 **「＋ 新建笔记」** → 填标题/标签/正文 → 点 **「下载 .md」** →
把下载好的文件拖进 `notes/` 文件夹 → 双击 `发布.command`。

**方式 C：直接写文件**
在 `notes/` 里新建一个 `.md` 文件，开头按下面的格式写元数据：

```markdown
---
title: Python 第2章：值与变量
date: 2026-09-20
source: 《Introduction to Python Programming》第2章
tags: [Python, 第2章, 变量]
summary: 一句话摘要（可省略，省略时自动从正文提取）
---

## 正文从这里开始

支持标题、列表、**加粗**、表格、代码块、引用……
```

### 发布到网上

双击 **`发布.command`** → 自动重建索引 + 提交 + 推送到 GitHub Pages。
约 1 分钟后网址即更新。

---

## 网页功能

| 功能 | 说明 |
|---|---|
| 全文搜索 | 顶部搜索框，标题/正文/标签/来源一起搜；空格分隔多个关键词＝同时满足；命中处黄色高亮，正文自动跳到第一处 |
| 快捷键 | `⌘ + K` 直接聚焦搜索框 |
| 标签筛选 | 左侧标签条，点一下只看该标签；标签后的数字是篇数 |
| 深色模式 | 右上角 ◐ 切换，默认跟随系统 |
| 手机适配 | 手机上点左上角 ☰ 打开笔记目录 |
| 直达链接 | 每篇笔记有独立网址 `#/文件名`，可以收藏 |

---

## 一次性设置：连接 GitHub Pages

> ⚠️ GitHub Pages 是**公开**的，只把笔记放进这个文件夹，别放证件、成绩单等私人文件。

1. 在 <https://github.com/new> 建一个仓库，名字例如 `study-notes`，选 **Public**，
   **不要**勾选任何初始化选项（README / .gitignore / license 全都不选）。

2. 打开「终端」，把下面几行里的 `你的用户名` 换成你的 GitHub 用户名后逐行运行：

   ```bash
   cd ~/Desktop/未命名文件夹/study-notes
   git remote add origin https://github.com/你的用户名/study-notes.git
   git branch -M main
   git push -u origin main
   ```

   第一次推送会弹出 GitHub 登录窗口，按提示授权即可。

3. 回到仓库页面 → **Settings → Pages** → Source 选 **Deploy from a branch**，
   分支选 **main**，目录选 **/ (root)** → Save。

4. 等 1 分钟左右，网站地址就是：
   `https://你的用户名.github.io/study-notes/`

之后每次加笔记，只要双击 `发布.command` 就会自动更新线上版本。

---

## 文件结构

```
study-notes/
├── index.html            网页本体
├── assets/
│   ├── style.css         样式
│   ├── app.js            搜索、筛选、渲染逻辑
│   └── vendor/marked.min.js   Markdown 渲染器（已内置，离线可用）
├── notes/
│   ├── *.md              ← 你的笔记都在这里
│   └── index.json        自动生成的索引，不用手改
├── tools/build_index.py  扫描 notes/ 生成索引
├── 本地预览.command       本机预览
└── 发布.command           重建索引 + 推送上线
```

备份很简单：整个 `study-notes` 文件夹拷走就行，笔记都是纯文本 `.md`。
