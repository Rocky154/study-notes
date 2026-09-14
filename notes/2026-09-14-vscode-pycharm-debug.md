---
title: VS Code 调试速查 & PyCharm 教程对照表
date: 2026-09-14
source: 实操配置（跟黑马程序员 PyCharm 教程时用）
tags: [VS Code, PyCharm, 调试, breakpoint, 快捷键, Mac, 工具]
summary: 跟 PyCharm 教程但用 VS Code 时的术语与位置对照，加上 Mac 调试快捷键和我改过的设置。
---

跟视频教程学 Python 时，教程用 **PyCharm**（Windows、中文界面），我用的是 **VS Code**。
功能完全一一对应，只是位置和叫法不同。下面是换算表。

## 界面对照

| PyCharm（教程里） | VS Code（我的） | 怎么打开 |
|---|---|---|
| **调试** 面板 | **Run and Debug** | `Shift` + `⌘` + `D` |
| **线程和变量** | **VARIABLES** | Run and Debug 侧边栏里 |
| **控制台** | **DEBUG CONSOLE** | 底部面板标签页 |
| 添加监视 | **WATCH** | Run and Debug 侧边栏里 |
| 代码右边灰字显示变量值 | **Inline Values** | 需在设置里开 `debug.inlineValues` |
| 左侧红点断点 | 一样，点行号左边 | `fn` + `F9` |
| 顶部调试按钮条 | 悬浮/固定工具条 | 见下方快捷键 |
| 左侧项目文件树 | **EXPLORER** | `Shift` + `⌘` + `E` |

## 调试术语中英对照

| 中文 | 英文 | 说明 |
|---|---|---|
| 断点 | **breakpoint** | 跑到这行就暂停 |
| 打/取消断点 | **toggle breakpoint** | 按一下打，再按取消 |
| 调试 | **debug** / **debugger** | |
| 开始调试 | **Start Debugging** | |
| 单步跳过（不进函数） | **Step Over** | **调试单行最常用** |
| 单步进入（跳进函数） | **Step Into** | |
| 跳出当前函数 | **Step Out** | |
| 继续到下一个断点 | **Continue** / **Resume** | |
| 停止调试 | **Stop** | |
| 变量面板 | **Variables** | |
| 监视表达式 | **Watch** | |
| 调用栈 | **Call Stack** | |

## Mac 快捷键（VS Code）

> Mac 上 F 键要配 `fn`，否则是调音量/亮度的系统键。

| 操作 | 快捷键 |
|---|---|
| 打/取消断点 | `fn` + `F9` |
| 开始调试 / 继续 | `fn` + `F5` |
| 单步跳过 | `fn` + `F10` |
| 单步进入 | `fn` + `F11` |
| 跳出 | `Shift` + `fn` + `F11` |
| 停止调试 | `Shift` + `fn` + `F5` |
| 打开调试面板 | `Shift` + `⌘` + `D` |
| 命令面板（万能入口） | `Shift` + `⌘` + `P` → 输入 `debug` |
| 保存 | `⌘` + `S` |
| 注释 / 取消注释选中行 | `⌘` + `/` |
| 增加 / 减少缩进 | `Tab` / `Shift` + `Tab` |

## 完整调试流程

1. 点行号左边打 🔴 断点
2. `Shift` + `⌘` + `D` → 点 **▷ Run and Debug** → 选 **Python Debugger** → **Python File**
3. 程序用到 `input()` 时，在底部 **TERMINAL** 里输入（不是 Debug Console）
4. 停在断点后看：代码旁灰字的变量值、左侧 **VARIABLES** 面板
5. `fn` + `F10` 一行一行往下走

## 我改过的设置

文件位置：`~/Library/Application Support/Code/User/settings.json`

| 设置项 | 效果 |
|---|---|
| `"debug.inlineValues": "on"` | 代码行右边直接显示变量值（PyCharm 同款效果） |
| `"debug.toolBarLocation": "docked"` | 调试按钮固定在上方，不浮动挡代码 |
| `"debug.openDebug": "openOnDebugBreak"` | 命中断点自动切到调试面板 |
| `"debug.internalConsoleOptions": "neverOpen"` | 走集成终端，**`input()` 才能正常输入**（关键） |
| `"editor.stickyScroll.enabled": true` | 滚动时把当前 `while` / `if` 钉在顶部，看嵌套循环很有用 |
| `"editor.guides.indentation": true` | 显示缩进参考竖线 |
| `"editor.renderWhitespace": "boundary"` | 显示多余空格，防缩进错误 |

## 不用 IDE 也能调试：`breakpoint()`

Python 3.7+ 自带，直接写进代码：

```python
for i in range(1, 6):
    breakpoint()          # 跑到这里暂停，进入 pdb
    print(i)
```

终端出现 `(Pdb)` 提示符后可用的命令：

| 命令 | 全称 | 作用 |
|---|---|---|
| `n` | next | 执行下一行（≈ Step Over） |
| `s` | step | 进入函数（≈ Step Into） |
| `c` | continue | 继续到下一个断点 |
| `l` | list | 看当前代码位置 |
| `p 变量名` | print | 打印变量值 |
| `w` | where | 看调用栈 |
| `q` | quit | 退出 |

## 最朴素但最常用：print 调试

英文叫 **print debugging**。到处插 `print()` 看变量：

```python
for i in range(1, 6):
    print("现在 i =", i)      # 调完删掉或注释
    print("*" * i)
```

专业程序员也天天用。初学阶段先把 `print()` 调试用熟，再学断点完全来得及。
