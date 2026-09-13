---
title: Python 第1章精读：两本教材对照总结
date: 2026-09-13
source: 《Fundamentals of Python Programming》(Halterman) 第1章 + 《Introduction to Python Programming》(OpenStax) 第1章
tags: [Python, 第1章, 编程基础, print, input, 变量, 字符串, 错误处理, 注释]
summary: Halterman 第1章讲“程序是什么、工具链是什么”（概念课），OpenStax 第1章直接教你写出第一批能跑的程序（实操课）。
---

两本书第 1 章定位完全不同：**Halterman 第1章讲“程序是什么、工具链是什么”（概念课），OpenStax 第1章直接教你写出第一批能跑的程序（实操课）**。

---

# 📘 一、Fundamentals of Python Programming（Halterman）

## 第 1 章：The Context of Software Development（软件开发的背景）

这一章几乎没有代码，目的是让你建立“程序员的世界观”。

### 开篇：程序的两个层次

一个程序同时存在于两个层面：

- **低层（具体）**：电信号改变计算机内部状态
- **高层（抽象）**：用户在完成真实工作或娱乐

同一台机器，装一个程序就变成计算器，装另一个就变成象棋对手。作者强调：现在绝大多数程序员都工作在高层，**几乎不需要懂底层电路也能写出复杂软件**。

### 1.1 Software（软件）

- 软件是**无形的**。硬盘、CD、U 盘只是“介质”，光盘本身不是软件，光盘上的**图案**才是。
- 程序要运行，必须先从硬盘**加载进内存**。
- 这些图案本质上是 **0 和 1 的序列**（二进制 / base 2），这就是**机器语言（machine language）**——处理器唯一能直接执行的东西。
- 机器语言人类几乎无法阅读，所以有了**高级语言（higher-level language）**。
- 为什么不用英语这样的自然语言编程？因为**自然语言天生有歧义**，要正确理解需要海量背景知识，超出当今软件能力。编程语言则用**简单结构 + 极严格的规则**来表达解法。

### 1.2 Development Tools（开发工具）

书里给的示例片段：

```python
subtotal = 25
tax = 3
total = subtotal + tax
```

要点：

- `subtotal`、`tax`、`total` 叫**变量（variable）**，代表“存在内存里的一个值”。数学家用变量比计算机早几百年。
- 看起来像代数式，**没有一个二进制数字**——这就是高级语言的价值。
- 处理器读不懂它，需要**解释器（interpreter）**翻译。
  - **源代码（source code）** = 你写的 Python
  - **目标代码（target code）** = 翻译出的机器码
- **跨平台**：同一份 Python 源码，只要目标平台有 Python 解释器就能跑。程序员只需想“怎么解决问题”，不用想“某台机器的指令集”。

**五类工具：**

| 工具 | 作用 | 关键概念 |
|---|---|---|
| **Editor 编辑器** | 输入并保存源代码 | **syntax（语法）**＝语言各部分的排列规则。书里用英语句子类比：`The tall boy runs quickly to the door.` 合法；`Boy the tall runs door to quickly the.` 单词一样但排列错误，不合语法 |
| **Compiler 编译器** | 一次性把源码全部翻译成目标文件 | 编译一次，之后可反复运行，**速度快**。代表：C、C++、Java、C#。（冷知识：最早的 C++ 编译器是把 C++ 翻译成 C） |
| **Interpreter 解释器** | 每次运行都重新翻译 | 所以解释型语言又叫**脚本语言（scripting language）**。通常比编译型慢，但**不用重新编译就能跨平台**，适合动态探索式开发——作者认为这对初学者是理想的。代表：Python、Ruby、Perl、JavaScript |
| **Debugger 调试器** | 跟踪程序执行、定位错误 | 可以边运行边看当前执行到源码哪一行，观察变量值是否按预期变化。错误也叫 **bug** |
| **Profiler 性能分析器** | 收集运行统计 | 某段代码被执行了多少次、耗时多久；还能测 **coverage（覆盖率）**。软件发布后出故障，常常是因为用户用到了测试期间从没执行过的代码 |

**IDE（集成开发环境）**＝编辑器＋调试器＋各种辅助工具打包成一个程序。书中点名的 Python IDE：Wingware、Enthought、IDLE。

> ⚠️ 作者的忠告（很重要）：工具再好也**不能替你写软件**。没有任何东西能替代**严密的逻辑思维、创造力、常识和编程经验**。

### 1.3 Learning Programming with Python

- **Guido van Rossum** 于 **1980 年代末**创造 Python。
- 相比 C / C++ / Java / C#，Python 追求**简单但强大**的语法。
- 使用者：Google、Yahoo、Facebook、CERN、Industrial Light and Magic（工业光魔）、NASA。
- Python 的美在于：**高手能做大事，同时新手也能比其他陡峭语言更快解决有趣的问题**。
- **Python 3.0 于 2008 年末发布，与 Python 2 不兼容**，本书基于 Python 3。
- 本书不求覆盖 Python 全部特性，**重点是编程技巧和好习惯**，学到的东西能迁移到 Java、C#、C++。

### 1.4 Writing a Python Program（写第一个程序）

- **statement（语句）** = 解释器执行的一条指令，是程序**执行的基本单位**。
- Listing 1.1 `simple.py`：

```python
print("this is a simple python program")
```

- 语句可以组成更大的块 **block**，函数和方法就由 block 构成。
- 操作流程：`File→New` 新建 → 输入代码 → `File→Save`（**文件名必须以 `.py` 结尾**）→ 点绿色三角 **Run**（输出显示在 Python Shell 面板）或点 **Debug**（输出在 Debug I/O 面板）。
- **作者推荐用 Debug 而非 Run**，因为调试模式给开发者更多控制权。
- 也可以完全脱离 IDE，**从命令行运行**。前提是**系统 PATH 环境变量配置正确**，否则找不到 Python 解释器。

### 1.5 The Python Interactive Shell（交互式命令行）

- 除了写文件，还能**直接和解释器对话**，敲一句执行一句。
- 提示符是三个大于号 **`>>>`**。带 `>>>` 的是你输入的，不带的是解释器的回应：

```text
>>> print("hello!")
hello!
```

- 交互式解释器对**试验语言特性极其宝贵**——不写完整程序也能学到很多东西。

### 1.6 A Longer Python Program（更长的程序）

Listing 1.2 `arrow.py`，6 条 print 画一个箭头：

```python
print("  *  ")
print(" *** ")
print("*****")
print("  *  ")
print("  *  ")
print("  *  ")
```

要点：

- 这种多行程序**别在交互 shell 里敲**，否则输入和输出会混在一起——**用编辑器写进文件再运行**。交互 shell 只适合试小片段。
- 🔴 **Python 中缩进有意义**！每条语句前**不能有多余的空格或 Tab**：

```text
>>> print('hi')
  File "<stdin>", line 1
    print('hi')
    ^
IndentationError: unexpected indent
```

### 1.7 Exercises（10 道复习题）

全是概念题，可以用来自测：什么是编译器？什么是解释器？两者异同？编译/解释后的代码与源代码有何不同？用什么工具产出 Python 源码？运行 Python 程序需要什么？高级语言相比机器语言的优势？IDE 如何提升效率？Python 的“官方”IDE 是什么（答：IDLE）？什么是语句？

> 💡 **时效性提醒**：这本书是 2018 年的草稿版，力推的 WingIDE 101 如今已不是主流。同样的操作用 **VS Code + Python 扩展**、**PyCharm Community** 或系统自带的 **IDLE** 都能完成，概念完全通用。

---

# 📗 二、Introduction to Python Programming（OpenStax）

## 第 1 章：Statements（语句）

这一章有 8 节 + 1 节总结，每节都有**学习目标 + 概念练习 + 动手练习**。

### 引子

- 程序由**按顺序执行的语句**组成，**一条语句描述一个要执行的动作**。
- `print("Good morning")` → 输出消息；`count = 0` → 把整数 0 赋给变量 count。
- **犯错是编程的正常组成部分**，所以本章专门有一节教怎么读错误信息。

### 1.1 Background（背景）

- **计算机**＝存储和处理信息的电子设备（手机、平板、笔记本、台式机、服务器都算）。
- **程序**＝计算机可运行的指令序列。
- **不需要任何计算机背景，也不需要很强的数学**。
- **library（库）**＝可被其他程序使用的代码集合。Python 自带庞大的 **Standard Library（标准库）**，社区还提供海量第三方库，比如数据分析用的 **Pandas**。
- **syntax（语法）**＝代码必须如何组织的规则，定义关键字、符号、格式。

**例 1.1 Hello World 对比：**

Python 一行：

```python
print("Hello, World!")
```

Java 五行：

```java
public class Hello {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}
```

Java 需要分号，Python 不需要。但书也指出：**简洁不是选语言的唯一标准**，比如安卓开发常用 Java。

### 1.2 Input/Output（输入输出）⭐ 核心

**输出：`print()`**

| 代码 | 输出 |
|---|---|
| `print("Today is Monday.")` `print("I like string beans.")` | `Today is Monday.` / `I like string beans.`（两行） |
| `print("Today", "is", "Monday")` | `Today is Monday` |
| `print("Today", "is", "Monday", sep="...")` | `Today...is...Monday` |
| `print("Today is Monday, ", end="")` + `print("I like string beans.")` | `Today is Monday, I like string beans.` |
| `print("Today","is","Monday", sep="? ", end="!!")` + `print("I like string beans.")` | `Today? is? Monday!!I like string beans.` |

- 多个值用逗号隔开，**默认用一个空格分隔** → 用 `sep=` 改。
- print 默认在末尾加**换行符（newline）** → 用 `end=""` 让下一个 print 接着同一行打印。

**输入：`input()`**

语句结构 `variable = input("prompt")` 有三部分：

1. **variable（变量）**：指向内存中的一个值，名字你自己起。
2. **`input()` 函数**：读取用户输入的**一行**。**函数（function）**＝一段有名字、可重复使用、被调用时完成某任务的代码。
3. **prompt（提示语）**：告诉用户程序在等输入，可省略。

```python
print("Please enter your name: ")
name = input()
print("You entered:", name)     # 用户输入 Sophia → You entered: Sophia
```

🔴 注意：`input()` 读到的**永远是字符串**。用户输入 6，变量里是 `"6"` 不是数字 6。

> 📌 书里有个专栏《空格真的重要吗？》：空格和换行本身不神圣，但**学会精确**是编程的核心技能。

### 1.3 Variables（变量）

- 变量让程序用**名字**而不是内存地址来引用值。
- **赋值运算符 `=`** 与数学中的等号**不同**：左边必须是变量，右边是要赋的值。
  - ✅ `temperature = 98.5`　❌ `98.5 = temperature`
- **先赋值，后使用**。先 `print("Total =", total)` 再 `total = 6` 会报错。

**命名规则：**

- 只能由**字母、数字、下划线**组成，长度不限；**不能以数字开头**（`101class` ❌，`2nd_input` ❌）。
- **区分大小写**：`Total` ≠ `total`。
- 风格指南推荐 **snake_case（蛇形命名）**：全小写 + 下划线，如 `first_name`、`total_price`。（`DogBreed` → 应改为 `dog_breed`）
- 名字要**短且有描述性**：`count` 比 `c` 好，`zip_code` 比 `z` 好。
- **关键字（keywords）不能用作变量名**：

```text
False  await    else     import   pass
None   break    except   in       raise
True   class    finally  is       return
and    continue for      lambda   try
as     def      from     nonlocal while
assert del      global   not      with
async  elif     if       or       yield
```

### 1.4 String Basics（字符串基础）

- **字符串（string）**＝被一对匹配的单引号 `'` 或双引号 `"` 包围的字符序列。`"21"` 是字符串，不是数字。
- **引号嵌套技巧**：想在字符串里放单引号就用双引号包，反之亦然。

| 合法 | 非法 |
|---|---|
| `"17"` / `'17'` | `17`（这是数字不是字符串） |
| `"Where?"` / `'Where?'` | `"Where?'`（引号不匹配） |
| `"I hope you aren't sad."` | `'I hope you aren't sad.'` |
| `'The teacher said "Correct!" '` | `"The teacher said "Correct!" "` |

- **`len()`**：返回字符串**字符个数**。`len("Hi Ali")` → **6**（空格也算！）；`len("")` → 0。

```python
number = "12"
number_of_digits = len(number)
print("Number", number, "has", number_of_digits, "digits.")
# Number 12 has 2 digits.
```

- **拼接（concatenation）**：`+` 把字符串首尾相连。`"A" + "part"` → `"Apart"`；`"1" + "0"` → `"10"`（而 `1 + 0` → `1`）。

```python
color = input("What is your favorite color?")
print("Your favorite color is " + color + "!")
```

### 1.5 Number Basics（数字基础）

- 两种基本数字格式：**integer 整数**（`1`）和 **floating-point 浮点数 / 小数**（`2.0`）。
- **data type（数据类型）**＝语言表示数据的格式。用 `type()` 查看：
  - `type(1)` → `<class 'int'>`
  - `type(2.0)` → `<class 'float'>`
  - `"12.0"` 是 **string**，不是 float（有引号就是字符串！）
- 四则运算符：`+` `-` `*` `/`
- 🔴 **`/` 的结果永远是 float**：`7 / 2` → `3.5`，`20 / 2` → `10.0`（不是 10！）。`3.5 - 1.5` → `2.0`。

**运算符优先级（从高到低）：**

| 运算符 | 说明 | 例子 | 结果 |
|---|---|---|---|
| `()` | 括号 | `(1 + 2) * 3` | 9 |
| `**` | 幂 | `2 ** 4` | 16 |
| `+`, `-` | 正号、负号 | `-math.pi` | -3.14159 |
| `*`, `/` | 乘、除 | `2 * 3` | 6 |
| `+`, `-` | 加、减 | `1 + 2` | 3 |

易错点：

- `1 + 2 * 3` = **7**（乘法优先），`(1 + 2) * 3` = **9**
- `4 * 3 ** 2 + 1` = **37**（先 `3**2=9`，再 `4*9=36`，再 +1）
- 🔴 `-4 ** 2` = **-16**，因为 `**` 优先级高于负号，等价于 `-(4**2)`
- `result = -2 ** 3` 里有 **3 个**运算符（`=`、`-`、`**`）

### 1.6 Error Messages（错误信息）⭐ 新手必读

出错时 Python 会给你三样东西：**① 出错行号 ② 错误类型 ③ 更多细节**。

```text
Traceback (most recent call last):
  File "/home/student/Desktop/example.py", line 1
    print "Hello"
                ^
SyntaxError: Missing parentheses in call to 'print'. Did you mean print("Hello")?
```

- **Traceback** ＝ Python 报告错误位置和类型的清单，字面意思是“回溯”，提示你往回追查代码。
- **插入符 `^`** 指出 Python 发现错误的位置。⚠️ **真正的错误有时在 `^` 前一两行**，因为 Python 到那里才发现不对劲。
- **认真读错误信息是一项重要技能**。

**常见错误对照表：**

| 写错的代码 | 错误信息 | 原因 |
|---|---|---|
| `print("Have a nice day!"` | `SyntaxError: unexpected EOF while parsing` | 少了右括号，Python 读到文件末尾（EOF）这行还没结束 |
| `word = input("Type a word: )` | `SyntaxError: EOL while scanning string literal` | 少了收尾引号，字符串到行末（EOL）还没结束 |
| `print("You typed:", wird)` | `NameError: name 'wird' is not defined` | 变量名拼错 |
| `prints("You typed:", word)` | `NameError: name 'prints' is not defined` | 函数名多打了一个字母 |
| 行首多一个空格 | `IndentationError: unexpected indent` | 行首多了个空格 |
| 行首误按 Tab | `IndentationError: unexpected indent` | 行首误按了 Tab |

### 1.7 Comments（注释）

- **注释**用 **`#`** 开头，从 `#` 到行尾的内容运行时被忽略。但**字符串里的 `#` 是普通字符**：`"Item #1: "` 不是注释。
- 规范：
  - `#` 后跟**一个空格**：`# End of menu` 比 `#End of menu` 易读。
  - 注释要**解释代码的目的，而不是复述代码**。

**例 1.2：**

```python
# Display the menu options
print("Lunch Menu")
print("----------")
print("Burrito")
print("Enchilada")
print("Taco")
print("Salad")
print()   # End of menu

# Get the user's preferences
item1 = input("Item #1: ")
item2 = input("Item #2: ")
```

**代码质量**：程序员**读代码的时间多于写代码的时间**。两个方法：

1. 用**空行**分隔功能相似的代码段；
2. 每段前写**一条**注释——**不是每行都要注释**。

> 小技巧：想临时禁用某行，在行首加 `#` 即可。

**docstring（文档字符串）**

- 程序开头可以放一个字符串，写给**使用程序但不读源码的人**看。
- docs.python.org 上的大部分官方文档就是由 docstring 生成的。
- 通常用**三引号 `"""` 的多行字符串**，典型结构：**一行摘要 + 空行 + 详细描述**。

```python
"""Vacations Madlib.

This program asks the user for two adjectives and two nouns,
which are then used to print a funny story about a vacation.
"""
```

### 1.8 Why Python?（Python 的历史与流行）

**历史线：**

- **1982**：Guido van Rossum 进入荷兰国家研究院 **CWI**，加入设计教学/原型语言 **ABC** 的团队。ABC 对新手很友好，但**缺少写高级程序所需的功能**。
- 几年后他转到 CWI 的操作系统团队，团队需要更简单的方式写“监控计算机、分析数据”的程序。
- 他构想一门**兼具 ABC 的简单语法 + 专业级高级特性**的新语言。
- 最初只是**业余爱好**，名字取自他喜欢的英国喜剧团体 **Monty Python**（不是那条蛇！）。
- 一年后他和同事把 Python 真正用于实际工作，随后决定**免费公开全部源代码**。
- **1991 年发布 Version 0.9.0**——比 C++ 晚约 6 年，比 Java 早 4 年。
- 成功原因：**简单却强大 + 适合日常任务 + 免费开源**。

**流行度证据：**

- **TIOBE 指数**（荷兰公司，2001 年起按搜索引擎结果统计）：Python **自 2004 年起每年都在前 10**，**2021 年 10 月登顶第 1**。此前 20 年只有 C 和 Java 当过第一。
- **Stack Overflow** 每月提问量：近年 Python 已成为**被问得最多的语言**。

### 1.9 Chapter Summary（第 1 章速查表）

| 函数 | 说明 |
|---|---|
| `print(values)` | 输出一个或多个值，默认以空格分隔 |
| `input(prompt)` | 若有 prompt 则先输出它，然后读一行输入 |
| `len(string)` | 返回字符串长度（字符数） |
| `type(value)` | 返回值的类型。`type(123)` → `<class 'int'>` |

| 运算符 | 说明 |
|---|---|
| `=` 赋值 | 给变量赋值或更新值。**Python 中变量在第一次被赋值时才开始存在** |
| `+` 拼接 | 连接两个字符串，产生新字符串 |
| `+` `-` `*` `/` | 加、减、乘、除 |
| `**` 幂 | `3**2` 是 3 的平方 |

| 语法 | 说明 |
|---|---|
| `#` | 从 `#` 到行尾被忽略 |
| `'` 或 `"` | 两种引号都能写字符串，本书约定多用双引号 |
| `"""` | docstring，多行文档字符串 |

**章末综合练习：**

- **Fun facts**：只用一个变量 `number` 和一条赋值语句，在 print 里完成平方、立方、十分之一、加、减的计算并输出。
- **Mad lib**（填词游戏）：4 个 `input()` + 3 个 `print()` + 至少 2 条注释 + 1 个 docstring。

---

# 🧭 三、两章对照 & 学习建议

| | Halterman 第1章 | OpenStax 第1章 |
|---|---|---|
| 标题 | The Context of Software Development | Statements |
| 性质 | **概念/背景课**，几乎不写代码 | **实操课**，边学边写 |
| 核心收获 | 软件是什么、编译 vs 解释、开发工具全景、IDE、语法概念 | print / input / 变量 / 字符串 / 数字 / 报错 / 注释 |
| 唯一代码 | `print(...)`（hello + 箭头） | 几十个可运行小例子 + 8 个动手项目 |
| 时效 | 2018 草稿，IDE 部分过时 | 2026 版，非常新 |

**建议的阅读顺序：**

1. **先读 Halterman 1.1–1.3**（约 4 页）建立概念地图：源代码→解释器→机器码，编译 vs 解释，各类工具干什么。
2. **Halterman 1.4–1.6 只看概念**（statement、block、`>>>` 交互 shell、缩进敏感），**跳过 WingIDE 的截图操作**，改用 VS Code 或 IDLE。
3. **然后完整做 OpenStax 第 1 章**，每节的 “Concepts in Practice” 和 “Try It” 都动手写一遍。

**必须记牢的 8 件事：**

1. Python 是**解释型**语言，源码每次运行都被翻译 → 所以跨平台、适合探索式学习。
2. **语句是执行的基本单位**，程序自上而下逐条执行。
3. **缩进在 Python 中有语法意义**，行首乱加空格 = `IndentationError`。
4. **`=` 是赋值不是相等**；变量必须先赋值再使用。
5. **`input()` 返回的一定是字符串**，别直接拿它做数学运算。
6. **`/` 的结果一定是浮点数**；`-4 ** 2 == -16`。
7. **读懂 Traceback**：看行号、看错误类型、看 `^`（真正的错误可能在它前一两行）。
8. **注释解释“为什么”，不是复述“是什么”**；代码用空行分段。
