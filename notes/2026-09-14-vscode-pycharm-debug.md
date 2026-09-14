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

## 调试工具条按钮图解

Run And Debug 面板顶部那排按钮，从左到右：

| 图标 | 英文名 | 中文意思 | 快捷键 | 什么时候用 |
|:---:|---|---|---|---|
| **▷\|** | **Continue** | 继续 | `F5` | 跑到下一个断点，中间代码飞快跑完不停 |
| **⤼** | **Step Over** | 单步跳过 | `F10` | **最常用**。执行当前行，停在下一行 |
| **↓** | **Step Into** | 单步进入 | `F11` | 这行在调用函数时，跳进函数内部 |
| **↑** | **Step Out** | 跳出 | `Shift`+`F11` | 从函数内部跳回调用处 |
| **↻** | **Restart** | 重新调试 | `Shift`+`⌘`+`F5` | 从头再跑一遍 |
| **◻** | **Stop** | 停止 | `Shift`+`F5` | 结束调试 |

初学阶段只要记两个：**⤼ Step Over**（一行行走）和 **◻ Stop**（停）。
`Step Into` / `Step Out` 等学到自己写 `def` 函数时再用。
不想记快捷键就直接点按钮，效果一样。

## Mac 的 fn 键：位置与免按方法

`fn` 在键盘**左下角最角落**，`Control` 键左边。新款 MacBook 上是 `fn` + 地球图标 🌐。

**建议一次性改掉，以后不用按 fn**：

> 系统设置 → 键盘 → 点「键盘快捷键…」按钮 → 左侧选「功能键」
> → 打开「将 F1、F2 等键用作标准功能键」

开启后 `F5` / `F10` 直接生效，和各种教程里的快捷键完全一致。
想调音量改成按 `fn` + F11/F12。

## 完整调试流程（每次照做）

```
① ⌘ + S                先保存！不保存调试的是旧代码
② 点行号左边            打断点 🔴
③ F5                    启动（没改设置就按 fn + F5）
④ 底部 Terminal 输入    程序要 input() 时在这里打字
⑤ 程序停在红点处        看代码旁灰字 + 左侧 Variables
⑥ 反复按 F10            一行行往下走，观察变量变化
⑦ 看完按 ◻ 停止
```

### 断点该打在哪一行

| 想弄懂什么 | 断点打在 |
|---|---|
| 变量的值对不对 | **用到这个变量的那行** |
| `if` 为什么没进去 | **`if` 那一行**，不是 `if` 里面的行 |
| 循环每轮怎么变 | **循环体的第一行** |

⚠️ **最容易犯的错**：打在 `if` **里面**的行。条件不成立时那行永不执行，
程序不会停，看起来像"调试坏了"。（我踩过这个坑）

## 用单步调试理解 if / elif（实战心得）

拿这段代码举例，断点打在第一个 `if`：

```python
for i in range(5):
    username = input("请输入用户名：")
    password = input("请输入密码：")
    if username == "admin" and password == "666888":   # ← 断点
        print("登录成功")
        break
    elif username == "zhangsan" and password == "123456":
        print("登录成功")
        break
    else:
        print("登录失败")
```

输入 `zhangsan` / `123456` 后连按 `F10`，黄色箭头会：

| 第几次 | 跳到 | 为什么 |
|---|---|---|
| 1 | `elif` 那行 | 第一个 `if` 条件为**假**，**整个分支体被跳过** |
| 2 | `print("登录成功")` | `elif` 条件为**真**，进入分支体 |
| 3 | `break` | 打印完，准备跳出循环 |
| 4 | 循环外 | `break` 直接结束 `for`，不再问下一轮 |

**关键收获**：`if / elif` 只走**第一个成立**的分支，其余分支体完全跳过。
这个过程读代码很难有实感，单步走一遍就记住了。
同理可以观察 `i` 每轮怎么累加、`continue` 怎么跳回循环开头。

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
