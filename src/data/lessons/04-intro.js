/**
 * 认识 React 章节
 * 目标：知道 React 解决什么问题、怎么建项目、目录怎么组织
 */
const intro = {
  id: 'intro',
  title: '认识 React 与开发环境',
  summary: '搞清楚 React 是什么、为什么学、环境怎么搭、项目目录怎么组织；跑不起来 / 白屏了怎么按四步排查、常见报错对照表、React DevTools 等调试工具怎么用',
  order: 4,
  items: [
    {
      id: 'what-is-react',
      title: 'React 是什么？传统写法 vs React 对比完整 Demo',
      summary: 'React = 用组件拼界面，数据变了 UI 自动更新；和传统手动改 DOM 对照着学',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'React 是一个 JavaScript 库，专门用来构建用户界面（UI）。你写「组件 + 数据」，界面自动跟着数据变，不用自己 document.getElementById 去改 HTML。',
          },
          {
            type: 'text',
            title: '1）React 是什么？',
            body: 'React 由 Meta（原 Facebook）开源，2013 年发布，目前是全球使用最广泛的前端 UI 库之一。它不是一个「全栈框架」，而是一个专注做一件事的库：把数据变成界面，并在数据变化时高效更新界面。\n\n你可以把它理解成「界面引擎」——你负责描述「界面应该长什么样」（声明式），React 负责在数据变了之后，算出最小差异并更新真实 DOM（数据驱动）。它运行在浏览器里，用 JavaScript 写逻辑，用 JSX 写界面结构（下一章细讲 JSX）。\n\n本学习项目 react-demo 就是标准 Create React App（CRA）+ React Router + Redux 的组合：React 管界面，Router 管页面跳转，Redux 管全局状态。先把 React 核心吃透，后面章节会逐个讲路由和状态管理。',
          },
          {
            type: 'text',
            title: '2）React 的核心特点',
            body: '① 组件化：页面拆成独立、可复用的「积木块」（组件），像搭乐高一样拼出复杂界面。② 声明式：你写「count 是 5 时文字变红」，而不是「找到 span，改 style.color」。③ 数据驱动：状态（state）一变，React 自动重新渲染对应部分。④ 虚拟 DOM：React 先在内存里对比新旧界面差异，再批量更新真实 DOM，比手动逐条改 DOM 更高效。⑤ 生态丰富：路由、状态管理、UI 组件库、服务端渲染（Next.js）都有成熟方案。\n\n初学阶段不必深究虚拟 DOM 算法，先建立直觉：你改数据 → React 帮你刷新界面。',
          },
          {
            type: 'text',
            title: '3）为什么要学 React？先理解「没有 React 时有多痛苦」',
            body: '传统前端三件套：HTML 搭结构 → CSS 写样式 → JavaScript 找 DOM 节点再改内容。页面简单时（一个按钮改一行文字）还行；一旦有了「计数器 + 列表 + 搜索 + 弹窗 + 表单校验」，你会写大量「找到某个 id/class，改 textContent / innerHTML / className」的代码。\n\n数据和界面缠在一起：count 变了，你要记得调用 render()；如果忘了，界面就「卡住」不更新。改一处逻辑，可能要在三四个 DOM 操作函数里同步修改。团队协作时，HTML 在 .html 文件，逻辑在 .js 文件，来回跳转找对应关系。\n\nReact 的核心价值：你只描述「界面应该长什么样」，数据变化时 React 帮你算差异并更新 DOM。逻辑和界面描述放在同一个组件函数里，改数据就能联动所有相关 UI。',
          },
          {
            type: 'text',
            title: '4）第一步：看懂传统写法在干什么（逐行理解）',
            body: '下面这段纯 JavaScript 代码模拟一个计数器。注意三个关键点：① count 是普通变量，变了之后浏览器不会自动知道。② 你必须手动调用 render()，把 count 的值「同步」到 span 的文字和颜色。③ 如果还要「在列表里显示 count 条记录」「按钮在 count=0 时禁用」，render() 函数会越来越长。\n\n这就是「命令式编程」：你一步步告诉浏览器「先改 A，再改 B，再改 C」。页面越复杂，维护成本指数级上升。',
          },
          {
            type: 'code',
            title: '传统写法完整 Demo：手动同步 DOM',
            language: 'javascript',
            body: `// ===== index.html（HTML 结构，浏览器直接渲染）=====
// <!-- 整个计数器界面都写在一个 div 里，id 供 JS 查找 -->
// <div id="app">
//   <!-- span 用来显示数字，id="count" 方便 JS 改文字 -->
//   <span id="count">0</span>
//   <!-- button 是按钮，id 用来绑定点击事件 -->
//   <button id="add">+1</button>
//   <button id="reset">归零</button>
//   <!-- 提示文字区域，初始为空 -->
//   <p id="hint"></p>
// </div>

// ===== main.js（纯 JavaScript 逻辑，和 HTML 分开写）=====
// 用 let 声明可变变量：count 是「数据」，界面不会自动跟着变
let count = 0

// document.getElementById：根据 id 找到 HTML 里的 DOM 节点，存起来复用
const countEl = document.getElementById('count')
const hintEl = document.getElementById('hint')

// 核心问题：数据变了，界面不会自动更新，必须手动写 render() 同步
function render() {
  // textContent：改元素里的文字内容
  countEl.textContent = count
  // style.color：改文字颜色；三元运算符 ? : 做简单条件判断
  countEl.style.color = count > 5 ? 'red' : 'black'
  // 超过 5 才显示提示，否则清空
  hintEl.textContent = count > 5 ? '超过 5 了！' : ''
  // 页面越复杂，这里要改的 DOM 越多，函数会越来越长
}

// addEventListener('click', ...)：给按钮绑定「点击时执行的函数」
document.getElementById('add').addEventListener('click', () => {
  count += 1          // 数据 +1
  render()            // 必须手动刷新界面；忘写这一行，数字不会变
})

document.getElementById('reset').addEventListener('click', () => {
  count = 0           // 数据归零
  render()            // 同样要手动同步到界面
})

render() // 页面第一次加载时也要调用，否则初始界面是空的`,
          },
          {
            type: 'text',
            title: '5）第二步：同样的功能，用 React 怎么写？',
            body: 'React 里你不再维护 render() 去改 DOM。你把 count 存进 useState（状态钩子，「State」那一章细讲），return 的 JSX 直接写「界面长什么样」。count 变了，React 重新执行组件函数，自动更新 span 的颜色和文字。\n\n对比传统写法：你不需要 getElementById，不需要手动 textContent，不需要在每次点击后记得调用 render()。setCount 一调用，React 就知道要刷新界面了。\n\n下面是可以直接复制到 src/App.js 里跑的完整代码（需先 npm start）。',
          },
          {
            type: 'code',
            title: 'React 写法完整 Demo：数据驱动界面',
            language: 'jsx',
            body: `// 从 react 包导入 useState：React 提供的「状态 Hook」，让函数组件能存可变数据
import { useState } from 'react'

// 定义一个函数组件：组件名必须大写开头（Counter），这是 React 的硬规则
function Counter() {
  // useState(0)：创建状态 count，初始值 0；setCount 用来更新 count
  // 调用 setCount 后，React 会自动重新渲染这个组件，界面跟着变
  const [count, setCount] = useState(0)

  // return 后面是 JSX：用类似 HTML 的语法「描述界面长什么样」
  return (
    // style 必须是 JS 对象 {{ }}，外层是 JSX 表达式，内层是对象
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h2>React 计数器</h2>
      {/* 花括号 {count}：把 JS 变量插进 JSX；颜色随 count 变化，不用手动改 DOM */}
      <span style={{ color: count > 5 ? 'red' : 'black', fontSize: 32 }}>
        {count}
      </span>

      <div style={{ marginTop: 12 }}>
        {/* onClick：点击事件，传函数；setCount(count + 1) 更新状态，React 自动刷新 */}
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(0)} style={{ marginLeft: 8 }}>
          归零
        </button>
      </div>

      {/* && 短路：左边为真才渲染右边；count > 5 时才显示这段提示 */}
      {count > 5 && <p style={{ color: 'crimson' }}>超过 5 了！</p>}
    </div>
  )
}

// 默认导出：别的文件可以用 import Counter from './Counter' 引入
export default Counter

// 使用方式：在 App.js 里 import Counter from './Counter'，然后 return <Counter />`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo【必玩】：左边故意「忘了调 render()」，看命令式写法怎么让界面卡住',
            body: `import { useRef, useState } from 'react' // useRef 存「不参与渲染」的数据，useState 存要显示的数据

// ⚠️ 这个 Demo 本身是用 React 写的，但左半边【故意模仿传统写法的思路】：
//    数据存在一个普通变量里（useRef 就相当于传统写法的 let count），
//    界面上显示什么，完全靠你自己手动去「同步」。
//    右半边是真正的 React 声明式写法。对比着点，你就明白 React 到底帮你做了什么。

const cell = { flex: 1, padding: 14, borderRadius: 8, minHeight: 190 } // 左右两块共用的外框
const btn = { padding: '5px 12px', marginRight: 6, cursor: 'pointer' } // 按钮共用样式

export default function Demo() { // 约定：必须默认导出一个函数组件
  // ===================== 左边：命令式（传统写法）=====================
  const dataRef = useRef(0) // 「数据」本身。相当于传统写法里的 let count = 0，改了它界面不会有任何反应
  const [domText, setDomText] = useState('0') // 「界面上真实显示的文字」，相当于 span 的 textContent
  const [domColor, setDomColor] = useState('#1f2a24') // 「界面上真实的颜色」，相当于 span 的 style.color
  const [domHint, setDomHint] = useState('') // 「界面上真实的提示文字」
  const [rememberRender, setRememberRender] = useState(true) // 你「记不记得」调用 render()
  const [, forceRefresh] = useState(0) // 仅为 Demo 服务：点一下就刷新一次界面，好让你看到「数据和界面对不上」

  // 这就是传统写法里那个 render()：把数据一项一项手动抄到界面上。
  // 界面上有几处会变，这里就要写几行；页面越复杂，这个函数越长、越容易漏。
  function render() {
    setDomText(String(dataRef.current)) // ① 同步数字
    setDomColor(dataRef.current > 5 ? '#cf1322' : '#1f2a24') // ② 同步颜色
    setDomHint(dataRef.current > 5 ? '超过 5 了！' : '') // ③ 同步提示
  }

  function oldAdd() {
    dataRef.current += 1 // 数据确实 +1 了
    forceRefresh((n) => n + 1) // 仅为 Demo：强制刷新一下，好把下面那行「真实数据」的最新值显示出来
    if (rememberRender) render() // ★ 但计数器界面变不变，取决于你有没有记得调这一行
  }

  // ===================== 右边：声明式（React 写法）=====================
  const [count, setCount] = useState(0) // 只有这一个 state，界面怎么长在 JSX 里描述

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12, cursor: 'pointer', fontSize: 13 }}>
        <input type="checkbox" checked={rememberRender} onChange={(e) => setRememberRender(e.target.checked)} />
        左边「记得调用 render()」——<strong>取消勾选，再狂点左边的 +1 试试</strong>
      </label>

      <div style={{ display: 'flex', gap: 12 }}>
        {/* ---------- 左：命令式 ---------- */}
        <div style={{ ...cell, background: '#fff1f0', border: '1px solid #ffa39e' }}>
          <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 700, color: '#a8071a' }}>传统写法（命令式）</p>

          {/* 界面显示的是 domText，而不是 dataRef —— 两者是两份数据，要靠 render() 才能对上 */}
          <div style={{ fontSize: 34, color: domColor, lineHeight: 1.2 }}>{domText}</div>
          <div style={{ minHeight: 20, fontSize: 13, color: '#cf1322' }}>{domHint}</div>

          <div style={{ margin: '8px 0' }}>
            <button type="button" style={btn} onClick={oldAdd}>+1</button>
            <button
              type="button"
              style={btn}
              onClick={() => {
                dataRef.current = 0 // 数据归零
                render() // 归零这里我们「记得」调了，所以界面一定会更新
              }}
            >
              归零
            </button>
          </div>

          {/* 把「真实数据」也露出来，方便你看清两者已经对不上了 */}
          <p style={{ margin: 0, fontSize: 12, color: '#a8071a' }}>
            真实数据 count = {dataRef.current}，界面上显示的是 {domText}
            {!rememberRender && String(dataRef.current) !== domText ? ' ← 对不上了！' : ''}
          </p>
        </div>

        {/* ---------- 右：声明式 ---------- */}
        <div style={{ ...cell, background: '#f6ffed', border: '1px solid #b7eb8f' }}>
          <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 700, color: '#389e0d' }}>React 写法（声明式）</p>

          {/* 界面直接由 count 算出来：颜色、提示都写成「count 的函数」，不存在「同步」这件事 */}
          <div style={{ fontSize: 34, color: count > 5 ? '#cf1322' : '#1f2a24', lineHeight: 1.2 }}>{count}</div>
          <div style={{ minHeight: 20, fontSize: 13, color: '#cf1322' }}>{count > 5 ? '超过 5 了！' : ''}</div>

          <div style={{ margin: '8px 0' }}>
            {/* setCount 一调用，React 自动重新执行整个组件函数，上面三处显示同时更新 */}
            <button type="button" style={btn} onClick={() => setCount(count + 1)}>+1</button>
            <button type="button" style={btn} onClick={() => setCount(0)}>归零</button>
          </div>

          <p style={{ margin: 0, fontSize: 12, color: '#389e0d' }}>
            没有 render()、没有 getElementById，也不可能「忘记同步」——因为压根没有第二份数据。
          </p>
        </div>
      </div>

      <p style={{ marginTop: 12, fontSize: 13, color: '#5c6b62' }}>
        👉 结论：命令式要维护<strong>「数据」和「界面」两份东西</strong>，还要靠你自觉把它们对齐；
        声明式只有<strong>一份数据</strong>，界面是它算出来的结果，天生对不错。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：最小计数器——这就是你即将学会写的东西（一共只有 3 行关键代码）',
            body: `import { useState } from 'react' // 第 1 行关键代码：从 react 引入 useState

export default function Demo() { // 组件就是一个普通函数，名字必须大写开头
  // 第 2 行关键代码：声明一个会变的数据 count，初始值 0；setCount 是它的「更新函数」
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', textAlign: 'center' }}>
      {/* 花括号 {count} 把 JS 变量插进界面。count 一变，这里显示的数字自动跟着变 */}
      <div style={{ fontSize: 44, fontWeight: 700, color: '#2f6b4f' }}>{count}</div>

      {/* 第 3 行关键代码：点击时调用 setCount，React 收到通知后自动重新渲染 */}
      <button
        type="button"
        onClick={() => setCount(count + 1)}
        style={{ padding: '8px 20px', fontSize: 15, cursor: 'pointer', borderRadius: 6, border: '1px solid #2f6b4f', background: '#2f6b4f', color: '#fff' }}
      >
        点我 +1
      </button>

      <p style={{ marginTop: 14, fontSize: 13, color: '#5c6b62', lineHeight: 1.8 }}>
        🎯 <strong>就这么多</strong>——一个 useState、一段 JSX、一个 onClick。
        <br />
        接下来的几章会把这三样东西拆开讲透：
        <br />
        JSX 怎么写（第 5 章）、组件怎么拆（第 6 章）、useState 怎么用（第 7 章）、事件怎么绑（第 8 章）。
      </p>

      <p style={{ marginTop: 8, fontSize: 12, color: '#8c8c8c' }}>
        提示：本站所有「Live Demo」都可以直接改代码，改完立刻看到效果 —— 试着把 +1 改成 +5。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '6）传统写法 vs React 完整对照表（建议收藏）',
            intro: '把下面这张表印在脑子里。遇到「该用 React 还是纯 JS」的疑惑时，回来对照。',
            headers: ['维度', '传统 DOM 操作', 'React'],
            rows: [
              ['编程方式', '命令式：一步步告诉浏览器改哪里', '声明式：描述「界面应该长什么样」'],
              ['数据变了之后', '你必须手动找 DOM、改 DOM', '调用 setState/setCount，React 自动更新'],
              ['界面和逻辑', 'HTML 和 JS 分散在不同文件', '同一组件函数里：数据 + JSX 界面'],
              ['复用', '复制粘贴 HTML + 改 id', '写一次组件，传不同 props 复用'],
              ['条件/列表', 'if + createElement 或模板字符串', 'JSX 里 {条件 && <组件>}、map 渲染列表'],
              ['维护成本', '页面越大 render() 越长', '拆成小组件，各管一块'],
              ['学习曲线', '入门简单，复杂页面难维护', '前期要学 JSX/组件/状态，长期更省心'],
              ['典型场景', '简单交互、嵌入脚本的小页面', '后台系统、电商、仪表盘、SPA'],
            ],
            note: 'React 不是银弹：纯静态官网、几乎无交互的页面，普通 HTML 就够。强 SEO 且交互少的页面可考虑 Next.js（React 框架，本教程后期会提到）。',
          },
          {
            type: 'text',
            title: '7）React 的两个核心思想：声明式 + 组件化',
            body: '声明式（Declarative）：你告诉 React「我要什么界面」，不是「先改 A 再改 B」。组件化（Component-based）：页面拆成可复用积木，每个组件是一个函数，接收 props（外部数据），返回 JSX（界面描述）。\n\n想象你在餐厅点菜：命令式是你冲进厨房自己切菜炒菜；声明式是你说「我要一份宫保鸡丁」，厨师（React）做好端上来。组件化是把菜单拆成「前菜组件」「主菜组件」「甜点组件」，同一套模板，不同配料（props）做出不同菜。',
          },
          {
            type: 'code',
            title: 'React 的两个核心思想（写在代码注释里对照）',
            language: 'jsx',
            body: `// 【声明式】你告诉 React「我要什么界面」，不是「先改 A 再改 B」
// Greeting 接收 props：{ name } 是解构写法，等价于 props.name
function Greeting({ name }) {
  // return 直接描述最终界面；{name} 把传入的数据显示出来
  return <h1>你好，{name}</h1>  // 不用 getElementById，不用 textContent
}

// 【组件化】页面拆成可复用积木，像搭乐高一样组合
function App() {
  // App 是根组件，return 只能有一个根节点，这里用 div 包起来
  return (
    <div>
      {/* 像 HTML 标签一样用组件，name="小明" 是传给 Greeting 的 prop */}
      <Greeting name="小明" />
      <Greeting name="小红" />  {/* 同一套代码，换不同 props 就能复用 */}
      <Counter />                 {/* 引用上一节的计数器组件 */}
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '8）React 适合做什么？初学阶段怎么定位？',
            body: '适合：后台管理系统、电商前台、仪表盘、内容站、中大型单页应用（SPA）、需要复杂交互的 Web App。本学习项目 react-demo 就是这类应用：章节列表 + 详情页 + 路由跳转 + 全局状态。\n\n不太适合：几乎无交互的纯静态官网（普通 HTML + CSS 就够，React 反而增加体积）。强 SEO 且交互少的页面可考虑 Next.js（React 的服务端渲染框架，后面再学）。\n\n现在先把 React 当作「写复杂交互网页的工具」即可，不必一次学完整个生态。',
          },
          {
            type: 'tip',
            title: '重要澄清（避免新手误解）',
            body: 'React 本身主要管「界面怎么渲染」。路由（多页面跳转）、发请求（axios/fetch）、全局状态（Redux/Context）都是额外能力或第三方库。学完 React 核心 + 路由 + 请求，就能写大多数基础项目了。本学习项目 react-demo 就是标准 CRA + React Router + Redux 的组合，各章会逐个讲清楚。',
          },
          {
            type: 'table',
            title: '9）本教程学习路线（按 react-demo 章节顺序）',
            intro: '下面是你接下来几章的学习顺序。每章都在 react-demo 里有对应知识点和可运行 Demo，建议边读边改代码。',
            headers: ['阶段', '章节', '你会学到什么', '学完后能做什么'],
            rows: [
              ['基础', 'HTML 布局 + 命名规范', '标签、Flex、CSS 选择器；项目约定', '看得懂页面结构和样式'],
              ['入门', '认识 React（本章）', 'React 是什么、建项目、目录组织', '创建并跑通 CRA 项目'],
              ['入门', 'JSX 语法', '花括号、属性、条件、列表、Fragment', '在组件里写界面'],
              ['核心', '组件 + Props', '函数组件、props 传递、children', '拆分和复用 UI 块'],
              ['核心', 'State 状态', 'useState、状态更新、受控组件', '做计数器、表单、开关'],
              ['核心', '事件处理', 'onClick、合成事件、表单提交', '响应用户操作'],
              ['核心', '列表与渲染', 'key、条件渲染细节、列表优化', '渲染 Todo 列表、分页'],
              ['进阶', 'Hooks 深入', 'useEffect、useRef、自定义 Hook', '副作用、请求、DOM 操作'],
              ['进阶', '组件通信', '父子传参、Context、组合模式', '跨层级共享数据'],
              ['工程', 'React Router', '路由表、嵌套路由、导航', '多页面 SPA'],
              ['工程', '样式方案', 'CSS Modules、styled-components', '组件级样式'],
              ['工程', 'Redux', 'store、slice、useSelector', '全局状态管理'],
              ['实战', '综合练习', 'TodoList、请求、鉴权 Demo', '独立完成小项目'],
            ],
            note: '不必一次学完。建议：每章动手改 react-demo 里的代码，保存后看浏览器变化，比只读不动手快 3 倍。',
          },
          {
            type: 'list',
            title: '10）动手练习清单',
            intro: '做完下面几项，你对「React 为什么存在」会有直观感受。',
            ordered: true,
            items: [
              '把 Counter Demo 复制进项目（新建 src/Counter.js，在 App.js 里 import），改按钮文案、改颜色阈值（比如 count > 10 变红），感受「只改 JSX，不动 DOM」。',
              '试着加一个「-1」按钮，用 setCount(count - 1)。保存后点按钮，看数字是否联动变化。',
              '思考：如果不用 React，你要在哪几个地方加 render() 调用？（答案：每次 count 变化的事件处理函数里，以及首次加载时）',
              '打开 react-demo 首页，点进「JSX 语法精讲」章节，继续下一章学习。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'React = 组件 + 数据 → 界面自动更新。传统是「数据变了你去改 DOM」，React 是「数据变了描述新界面，React 帮你改 DOM」。',
          },
        ],
      },
    },
    {
      id: 'create-project',
      title: '从零创建 React 项目：环境检查 → 创建 → 启动 → 改代码',
      summary: 'Node/npm 安装检查、CRA 创建、npm start、入口文件怎么串起来——完整流程一步步走',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'React 项目 = Node 环境 + create-react-app 脚手架 + npm start 启动开发服务器。改 src 里的代码，浏览器自动刷新。',
          },
          {
            type: 'text',
            title: '1）创建 React 项目是什么流程？',
            body: '从零到浏览器看到页面，一共四步：① 安装 Node.js（提供 JavaScript 运行环境和 npm 包管理器）。② 用 CRA 脚手架一键生成项目（自动配置 Webpack、Babel、开发服务器）。③ npm start 启动本地开发服务器。④ 改 src 里的代码，保存，浏览器自动热更新。\n\n你不需要自己配置 Webpack 或 Babel——CRA 都帮你做好了。初学先把「能跑起来、能改代码、能看到效果」这三件事做熟，再考虑 Vite 等其它工具。',
          },
          {
            type: 'list',
            title: '2）开始前你需要准备什么',
            intro: '下面四项缺一不可。如果某项没有，先补齐再继续。',
            ordered: false,
            items: [
              'Node.js（建议 LTS 长期支持版，官网 https://nodejs.org 下载安装）。装完自带 npm。',
              '会一点 HTML / CSS / JavaScript：变量、函数、数组、对象、箭头函数。本教程前三章有 HTML / CSS / JavaScript 复习。',
              '编辑器：VS Code 或 Cursor（你现在用的就是 Cursor）。',
              '终端：macOS 用 Terminal，Windows 用 PowerShell 或 Git Bash。',
            ],
          },
          {
            type: 'text',
            title: '3）第一步：检查 Node 和 npm 是否装好',
            body: '打开终端，输入下面两条命令。如果能看到版本号（如 v20.x.x、10.x.x），说明环境 OK，可以继续。\n\n如果提示 command not found，说明 Node 没装好或没加入系统 PATH。去 nodejs.org 下载 LTS 版安装，装完重启终端再试。Windows 用户安装时勾选「Add to PATH」。',
          },
          {
            type: 'code',
            title: '环境检查命令（复制到终端执行）',
            language: 'bash',
            body: `# node -v：查看 Node.js 版本；React 项目需要 Node 才能运行
node -v    # 应输出类似 v20.11.0（LTS 长期支持版最稳）

# npm -v：查看 npm 版本；npm 是 Node 自带的包管理器，用来安装依赖
npm -v     # 应输出类似 10.2.0

# 如果两条都有版本号 → 环境 OK，可以继续创建项目
# 如果报错 command not found → 说明没装 Node，去 nodejs.org 下载 LTS 版
# 安装后关闭并重新打开终端，再执行上面两条命令`,
          },
          {
            type: 'text',
            title: '4）第二步：用 Create React App（CRA）创建项目',
            body: 'CRA 是 React 官方长期推荐的脚手架（虽然官方现在更推 Vite，但 CRA 仍是初学最稳的选择）。它会自动配置：Webpack 打包、Babel 编译 JSX、开发服务器、热更新（改代码自动刷新）、Jest 测试环境。\n\n初学不必自己从零配这些工具——配一次可能要几天，用 CRA 一条命令 1～3 分钟搞定。本学习项目 react-demo 就是用 CRA 创建的。业界新项目也常用 Vite，原理类似，先把 CRA 跑通即可平滑迁移。',
          },
          {
            type: 'code',
            title: '创建项目完整命令（从头到尾复制执行）',
            language: 'bash',
            body: `# 1. cd：切换当前目录；~ 表示用户主目录，~/Desktop 是桌面
cd ~/Desktop

# 2. npx：临时下载并运行包，不用全局安装 create-react-app
# create-react-app：官方脚手架，一键生成 React 项目结构
# my-app：项目文件夹名，可改成任意英文名，不要用中文或空格
npx create-react-app my-app

# 首次创建会下载依赖，等待 1～3 分钟
# 看到终端输出 "Happy hacking!" 表示创建成功

# 3. 进入刚生成的项目文件夹（名字要和上一步一致）
cd my-app

# 4. npm start：读取 package.json 里的 start 脚本，启动开发服务器
npm start

# 成功后浏览器会自动打开 http://localhost:3000
# 看到旋转的 React logo 说明项目跑起来了
# 开发服务器会一直占着终端，停止请按 Ctrl+C`,
          },
          {
            type: 'text',
            title: '5）第三步：理解 npm start 之后发生了什么',
            body: 'npm start 会启动本地开发服务器（默认 3000 端口），编译 src 下的代码，把结果注入 public/index.html 里的 <div id="root">。你在 src 里改代码并保存，Webpack 会重新编译，浏览器自动刷新（热更新）。\n\n终端里如果看到红色报错，页面通常也会显示错误信息——先读报错第一行，再改代码。Syntax Error 多半是 JSX 语法写错（缺闭合标签、花括号不匹配等）。\n\n开发服务器会一直占着终端窗口，不要关。要停掉按 Ctrl+C。想同时执行别的命令，再开一个终端标签页。',
          },
          {
            type: 'code',
            title: 'package.json 里四个脚本分别干什么',
            language: 'json',
            body: `{
  // name：项目名称，也是 package.json 里的标识
  "name": "my-app",
  // scripts：npm 命令快捷方式；npm start 实际执行 "react-scripts start"
  "scripts": {
    // start → 本地开发：启动 Webpack 开发服务器，改代码自动热更新，默认端口 3000
    "start": "react-scripts start",
    // build → 生产打包：把 src 编译成静态文件，输出到 build/ 文件夹，用于部署上线
    "build": "react-scripts build",
    // test → 运行单元测试（Jest + Testing Library），写测试文件后才会用到
    "test": "react-scripts test",
    // eject → 把 CRA 隐藏的配置全部「弹出」到项目里；不可逆，初学绝对不要用
    "eject": "react-scripts eject"
  }
}

// 日常开发最常用：npm start（一直开着）和 npm run build（上线前打包）`,
          },
          {
            type: 'table',
            title: '6）npm 四个脚本对照表',
            headers: ['命令', '干什么', '什么时候用', '易错点'],
            rows: [
              ['npm start', '启动开发服务器，热更新', '日常写代码时一直开着', '端口 3000 被占用时会问你是否换端口，输入 Y 即可'],
              ['npm run build', '打包成生产环境静态文件', '要部署到服务器前', 'build/ 文件夹是输出，不要手动改里面的文件'],
              ['npm test', '运行单元测试', '写了测试文件后', '会进入 watch 模式，按 q 退出'],
              ['npm run eject', '弹出 Webpack/Babel 全部配置', '几乎永远不要用', '不可逆！弹出后无法回到 CRA 默认配置'],
            ],
          },
          {
            type: 'text',
            title: '7）第四步：新建项目后，先改哪几个文件？',
            body: '不要一上来改 node_modules（第三方依赖，npm install 自动生成，删了可以重装）。不要改 package-lock.json（依赖版本锁定文件）。\n\n初学者只需关心四个位置：public/index.html（页面壳子，只有一个 div#root）、src/index.js（挂载 React 的入口）、src/App.js（根组件，从这里开始写界面）、src/index.css（全局样式）。\n\n其它文件（App.test.js、setupTests.js、reportWebVitals.js）初学可以忽略，后面学测试和性能时再回头看。',
          },
          {
            type: 'code',
            title: '入口文件完整代码：从 HTML 到 React 应用',
            language: 'jsx',
            body: `// ===== public/index.html（浏览器真正加载的 HTML 壳子）=====
// <!-- body 里只有一个空 div，React 会把整个应用「挂载」到这里 -->
// <body>
//   <div id="root"></div>   ← 注意 id="root"，后面 JS 会找这个节点
// </body>

// ===== src/index.js（整个 React 应用的入口文件，CRA 默认从这里启动）=====
// import：从别的文件/包引入代码；React 是核心库
import React from 'react'
// ReactDOM/client：React 18 的新 API，负责把组件渲染到真实 DOM
import ReactDOM from 'react-dom/client'
// 引入全局 CSS，整个项目共用一份样式
import './index.css'
// 引入根组件 App；./App 表示同目录下的 App.js
import App from './App'

// createRoot：在 #root 节点上创建 React 18 的根容器
const root = ReactDOM.createRoot(document.getElementById('root'))

// render：把 JSX（<App />）渲染进 root，浏览器里就能看到界面了
root.render(
  // StrictMode：开发模式下额外检查潜在问题（如过时 API），不影响线上功能
  <React.StrictMode>
    <App />   {/* 自定义组件，像 HTML 标签一样写 */}
  </React.StrictMode>
)

// ===== src/App.js（根组件，初学者最常改的文件）=====
// 函数组件：名字 App 大写开头，React 才认它是组件
function App() {
  // return 后面是 JSX，描述这个组件要显示什么
  return (
    <div>
      <h1>我的第一个 React 页面</h1>
      <p>把这段文字改成你自己的内容，保存，看浏览器是否自动更新。</p>
    </div>
  )
}

// export default：默认导出，index.js 才能 import App from './App'
export default App`,
          },
          {
            type: 'text',
            title: '8）react-demo 的入口比 CRA 默认多了什么？',
            body: '本学习项目 react-demo 的 src/index.js 在 CRA 默认基础上包了两层：BrowserRouter（React Router，开启前端路由）和 Provider（Redux，注入全局 store）。这样各页面才能用 useNavigate 跳转、useSelector 读全局状态。\n\n你现在不必理解 Router 和 Redux 的细节——知道「入口文件负责把 React 挂到页面上，并包上项目需要的全局能力」就够了。后面路由章和 Redux 章会逐个讲。',
          },
          {
            type: 'code',
            title: 'react-demo 真实入口（对照 src/index.js 打开看）',
            language: 'jsx',
            body: `// src/index.js（react-demo 真实入口，比 CRA 默认多了路由和 Redux）
// BrowserRouter：来自 react-router-dom，让应用支持前端路由（URL 换页面不刷新）
import { BrowserRouter } from 'react-router-dom'
// Provider：Redux 提供的组件，把全局 store 注入到整棵组件树
import { Provider } from 'react-redux'
// store：Redux 全局状态仓库，多个页面共享的数据放这里
import { store } from './store'

// 和 CRA 一样：找到 HTML 里的 #root，创建 React 根
const root = ReactDOM.createRoot(document.getElementById('root'))

// 从外到内包三层：StrictMode → Provider → BrowserRouter → App
root.render(
  <React.StrictMode>
    {/* store={store}：把 Redux 仓库传给所有子组件，子组件才能 useSelector */}
    <Provider store={store}>
      {/* BrowserRouter：监听 URL 变化，渲染对应页面 */}
      <BrowserRouter>
        <App />   {/* 根组件里通常用 useRoutes 根据 URL 选页面 */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)`,
          },
          {
            type: 'list',
            title: '9）第一次动手——验证热更新（逐步清单）',
            intro: '按顺序做，确认你的开发环境完全 OK。',
            ordered: true,
            items: [
              '保持 npm start 在跑（终端不要关）。',
              '用编辑器打开 src/App.js。',
              '把 <h1> 里的文字改成「Hello 我的名字」。',
              '按 Cmd+S（Mac）或 Ctrl+S（Windows）保存。',
              '切回浏览器，文字应自动变成你改的内容（无需手动刷新）。',
              '如果没变：确认文件已保存；看终端有没有红色 Syntax Error；尝试硬刷新 Cmd+Shift+R。',
            ],
          },
          {
            type: 'table',
            title: '10）常见报错与解决办法',
            headers: ['报错现象', '原因', '解决办法'],
            rows: [
              ['Something is already running on port 3000', '3000 端口被别的程序占用', '终端问是否换端口 → 输入 Y（会用 3001 等）'],
              ['npm start 第一次很慢', '首次要编译全部依赖', '等 1～2 分钟正常，之后改代码会快很多'],
              ['改了代码页面没变化', '文件没保存 / 语法错误 / 缓存', '确认保存 → 看终端报错 → Cmd+Shift+R 硬刷新'],
              ['Module not found: ./xxx', 'import 路径写错', '检查大小写、./ 相对路径、文件是否存在'],
              ['npx create-react-app 卡住', '网络问题', '换 npm 镜像：npm config set registry https://registry.npmmirror.com'],
              ['SyntaxError: Unexpected token', 'JSX 语法错误', '检查标签闭合、花括号匹配、className 拼写'],
            ],
          },
          {
            type: 'tip',
            title: '本学习项目怎么启动（对照练习）',
            body: '你现在的 react-demo 项目：cd 到项目目录 → npm install（首次 clone 或拉代码后）→ npm start。结构和 CRA 默认项目一样，只是多了路由、Redux、章节数据（data/lessons/）等，后面章节会逐个讲。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'node -v 检查环境 → npx create-react-app 创建 → npm start 启动 → 改 src/App.js 验证热更新。react-demo 启动多加一步 npm install。',
          },
        ],
      },
    },
    {
      id: 'project-structure',
      title: '项目目录怎么组织？对照本 react-demo 真实结构',
      summary: 'pages/components/routes/data/utils 各放什么；怎么判断代码该放哪；命名习惯',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '按「职责」分文件夹：整页放 pages，可复用 UI 放 components，路径配置放 routes，静态数据放 data，纯函数放 utils。',
          },
          {
            type: 'text',
            title: '1）为什么要分目录？全写 App.js 行不行？',
            body: '练手时全塞进 App.js 也能跑——Counter 那种几十行的 Demo 完全没问题。但项目稍大就会乱：找不到文件、复制粘贴同一段 JSX、路由和页面逻辑搅在一起、改一个按钮样式要翻 500 行代码。\n\n真实项目（包括本 react-demo）按「职责」拆分文件夹，让每个文件「只做一件事」。好处：① 找代码快（知道功能就知道去哪个文件夹）。② 复用方便（Header 组件全站共用）。③ 团队协作不冲突（你改 pages，我改 components）。④ 后期维护轻松（删一个页面只动 pages 里一个文件夹）。',
          },
          {
            type: 'code',
            title: '2）本 react-demo 真实目录结构（打开项目对照看）',
            language: 'text',
            body: `react-demo/                          # 项目根目录
├── public/                          # 静态资源，不经过 Webpack 编译
│   └── index.html                   # 页面壳子，只有 <div id="root">，React 挂在这里
├── package.json                     # 项目配置：依赖列表、npm 脚本（start/build/test）
└── src/                             # 源代码目录，日常开发主要改这里
    ├── index.js                     # 入口：ReactDOM.createRoot + 挂载 App
    ├── App.js                       # 根组件：通常用 useRoutes 渲染路由表
    ├── index.css                    # 全局样式、CSS 变量（全站共用）
    │
    ├── routes/                      # 路由配置：URL 路径 ↔ 页面组件 的对应关系
    │   └── index.js                 # export routes 数组，定义每个 path 显示哪个页面
    │
    ├── layouts/                     # 布局壳：多页共用的外层结构
    │   └── MainLayout.js            # 例如：顶栏 Header + 中间内容区 <Outlet />
    │
    ├── pages/                       # 页面组件：一个 URL 通常对应 pages 里一个文件夹
    │   ├── Home/index.js            # 首页：章节列表
    │   ├── LessonDetail/index.js    # 章节详情：展示教程内容
    │   ├── AuthDemo/                # 鉴权 Demo 模块（一个业务下多个页面）
    │   └── JsonServerDemo/          # 请求 Demo 模块
    │
    ├── components/                  # 可复用 UI 块：多个页面都会用到的小组件
    │   ├── Header/                  # 顶栏导航
    │   ├── CodeBlock/               # 代码高亮展示块
    │   ├── DocContent/              # 读 sections 数据，渲染文字/代码/表格
    │   ├── LessonGroup/             # 章节分组卡片
    │   ├── LiveDemo/                # 可运行代码预览
    │   └── auth/                    # 鉴权相关小组件
    │
    ├── data/                        # 静态数据：教程文案、配置，和 UI 逻辑分离
    │   ├── lessons.js               # 汇总 import 各章节，export 成 lessons 数组
    │   └── lessons/                 # 各章节独立文件（你现在读的就是这里）
    │       ├── 04-intro.js           # 数字前缀 = 章节顺序
    │       ├── 05-jsx.js
    │       └── ...
    │
    ├── store/                       # Redux 全局状态（进阶章节讲）
    │   ├── index.js                 # 创建 store、合并 reducer
    │   ├── hooks.js                 # 封装 useSelector 等
    │   └── slices/                  # 按功能拆分的 slice（如 counterSlice）
    │
    └── utils/                       # 纯函数工具：不依赖 React，可单独测试
        ├── helpers.js               # 通用辅助函数
        ├── constants.js             # 常量（如 API 地址）
        ├── request.js               # 封装 fetch/axios 发请求
        └── auth.js                  # 鉴权相关工具函数`,
          },
          {
            type: 'table',
            title: '3）代码放哪个文件夹？决策表（最重要的一张表）',
            intro: '拿到一段新代码，按顺序问自己下面几个问题，第一个「是」的答案就是目标文件夹。',
            headers: ['问题', '是 → 放这里', '示例'],
            rows: [
              ['它是一个完整页面（有独立 URL）吗？', 'pages/', 'Home、LessonDetail、LoginPage'],
              ['多个页面都会用到的 UI 块吗？', 'components/', 'Header、CodeBlock、Button'],
              ['只是某一个页面内部用的子组件？', '该 page 下的 components/', 'LessonDetail 里的 Sidebar'],
              ['是「哪个 URL 显示哪个页面」的配置？', 'routes/', 'routes/index.js 路由表'],
              ['是整站公共的外壳布局？', 'layouts/', 'MainLayout（顶栏 + 内容区）'],
              ['是一份不会频繁变的配置/文案/教程数据？', 'data/', 'lessons/04-intro.js'],
              ['是纯函数、常量、请求封装？', 'utils/', 'formatDate()、API_BASE_URL'],
              ['是 Redux 全局状态？', 'store/', 'counterSlice、store/index.js'],
            ],
            note: '只有某一个页面用的子组件，不要放到全局 components/，避免全局目录膨胀。放在 pages/Xxx/components/ 里，import 路径更清晰。',
          },
          {
            type: 'text',
            title: '4）各文件夹详细说明',
            body: 'pages/：一个 URL 对应一个页面组件。通常每个页面一个文件夹，里面有 index.js（主组件）和可选的 PageName.css。复杂页面可在同目录下建 components/ 放私有子组件。\n\ncomponents/：跨页面复用的 UI 块。每个组件一个文件夹（如 Header/index.js + Header.css），PascalCase 命名。\n\nroutes/：路由表，定义 URL 和页面组件的对应关系。App.js 里 useRoutes(routes) 读取这张表。\n\nlayouts/：公共布局壳子，比如带顶栏的 MainLayout，所有子页面共享。\n\ndata/：静态数据，不和 UI 逻辑混在一起。本教程的章节内容就存在 data/lessons/ 里，改文字不用动组件代码。\n\nutils/：纯函数和常量，不依赖 React，可以单独测试。request.js 封装 fetch/axios 发请求。\n\nstore/：Redux 全局状态，多个页面共享的数据（如用户信息、购物车）放这里。',
          },
          {
            type: 'code',
            title: '5）对照示例：Home 页面怎么引用 data 和 components',
            language: 'jsx',
            body: `// src/pages/Home/index.js（首页：把数据和 UI 组件拼成完整页面）
// ../../ 表示向上两级目录：pages/Home → src，再进 data 或 components
import lessons from '../../data/lessons'        // 静态数据：所有章节列表
import LessonGroup from '../../components/LessonGroup'  // 可复用 UI：章节分组卡片

// 页面组件：名字 Home 大写，和文件夹名一致
function Home() {
  return (
    <div className="home">
      <h1>React 学习路线</h1>
      {/* map：把 lessons 数组每一项变成 JSX；key 帮助 React 识别列表项 */}
      {lessons.map((lesson) => (
        // lesson={lesson}：把整条章节数据传给子组件；key 用唯一 id
        <LessonGroup key={lesson.id} lesson={lesson} />
      ))}
    </div>
  )
}

// 默认导出，路由表里 import Home from '../pages/Home' 就能用
export default Home

// 分工规律：page 负责「拼页面」，data 负责「有什么内容」，component 负责「怎么展示一块 UI」`,
          },
          {
            type: 'table',
            title: '6）命名习惯对照表（团队项目必须统一）',
            headers: ['类型', '规范', '正确示例', '错误示例'],
            rows: [
              ['组件文件 / 函数名', 'PascalCase 大驼峰', 'Header/index.js、UserCard.js', 'header.js、user-card.js'],
              ['工具函数 / 变量', 'camelCase 小驼峰', 'getLessonPath()、formatDate()', 'GetLessonPath()、format_date()'],
              ['CSS 文件', '和组件同名', 'Header/Header.css', 'styles.css（太泛）'],
              ['路由 path', '小写 + 短横线或参数', '/lesson/:id、/demo/auth', '/Lesson/Detail'],
              ['data 章节文件', '数字前缀 + 短横线 + 英文名', '04-intro.js、05-jsx.js', 'intro.js（排序乱）'],
              ['文件夹名', 'PascalCase（组件）或小写', 'components/Header/、pages/home/', 'Components/header/'],
            ],
          },
          {
            type: 'text',
            title: '7）一个页面文件夹里通常有什么？',
            body: '简单页面：index.js + PageName.css 两个文件就够。例如 pages/NotFound/index.js。\n\n页面变复杂时，在同目录下建 components/ 放「只给这个页面用」的子组件。例如 LessonDetail 页面可能有自己的 TOC（目录）、Sidebar，这些不要放到全局 components/。\n\n一个页面文件夹的典型演进：① 刚开始只有 index.js。② 样式多了加 index.css。③ 子组件多了建 components/ 子目录。④ 页面专属 hooks 或 utils 也可以放页面文件夹里。',
          },
          {
            type: 'code',
            title: '8）从 URL 到页面的完整链路（理解本项目怎么跑起来）',
            language: 'jsx',
            body: `// ===== 第 1 步：src/index.js — 把 React 应用挂到页面上，并包上全局能力 =====
root.render(
  // Provider：Redux 全局状态，子组件里可以用 useSelector 读数据
  <Provider store={store}>
    // BrowserRouter：前端路由，URL 变了换页面，浏览器不会整页刷新
    <BrowserRouter>
      <App />   // 根组件，下面根据 URL 决定显示哪个页面
    </BrowserRouter>
  </Provider>
)

// ===== 第 2 步：src/App.js — 根据当前 URL 从路由表选出要渲染的页面 =====
function App() {
  // useRoutes：React Router 的 Hook，传入 routes 数组，返回当前 URL 匹配的 element
  const element = useRoutes(routes)  // routes 从 ./routes/index.js import
  return element   // 直接 return 匹配到的页面（或布局+页面）
}

// ===== 第 3 步：src/routes/index.js — 路由表：path 和页面对应关系 =====
const routes = [
  {
    path: '/',                      // 访问根路径 /
    element: <MainLayout />,        // 先渲染公共布局（带 Header）
    children: [                     // 嵌套路由：内容渲染在 MainLayout 的 <Outlet /> 里
      { index: true, element: <Home /> },   // / 默认显示 Home 首页
      // :categoryId :itemId 是动态参数，URL 里会变，页面里用 useParams 读取
      { path: 'lesson/:categoryId/:itemId', element: <LessonDetail /> },
    ],
  },
]

// ===== 第 4 步：用户访问 /lesson/intro/what-is-react 时发生了什么？ =====
// → BrowserRouter 解析 URL
// → useRoutes 匹配到 LessonDetail
// → MainLayout 渲染（顶栏 Header 始终显示）
// → LessonDetail 在 Outlet 位置渲染
// → LessonDetail 从 data/lessons 读取 intro 章节数据
// → DocContent 组件把 sections 数组渲染成文字块、代码块、表格等`,
          },
          {
            type: 'list',
            title: '9）学习建议：边读目录边打开文件',
            intro: '按下面步骤走一遍，比只看文字快得多。',
            ordered: true,
            items: [
              'npm start 跑起来 react-demo。',
              '从 src/index.js 开始，顺着 import 链看：index.js → App.js → routes → pages。',
              '打开 src/pages/Home/index.js，看它怎么 import data/lessons 和 components/LessonGroup。',
              '打开 src/data/lessons/04-intro.js，就是你现在看的这份教程数据。',
              '改 data/lessons/04-intro.js 里某段文字，保存，刷新详情页，感受「数据和 UI 分离」。',
              '自己练 TodoList 时也按 pages/components/utils 拆，比全写 App.js 更接近真实开发。',
            ],
          },
          {
            type: 'list',
            title: '10）动手练习',
            intro: '做完这三题，目录结构就基本掌握了。',
            ordered: true,
            items: [
              '在 src/pages/Home/index.js 找到渲染章节列表的 map，理解它怎么读 data/lessons.js。',
              '在 src/data/lessons/ 里找到 04-intro.js，确认就是你现在看的这份数据。',
              '思考：如果新增一章「20-xxx.js」，需要改哪几个文件？（答案：新建 data/lessons/20-xxx.js + 在 data/lessons.js 里 import 并加入 lessons 数组）',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '整页 pages、复用 components、路径 routes、文案 data、工具 utils。拿不准就问自己：「这段代码是整页、UI 块、还是纯数据/函数？」',
          },
        ],
      },
    },
    {
      id: 'debug-troubleshooting',
      title: '跑不起来 / 白屏了：新手排错四步法',
      summary: '一看终端、二看控制台、三用二分法缩小范围、四查常见原因对照表——把「不知道从哪下手」变成一套固定动作',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '**先看终端，再看浏览器控制台，再用二分法缩小范围，最后查对照表。** 90% 的新手问题在前两步就能解决——只要你真的把报错**读完**，而不是看到一片红就直接去问人。报错信息不是噪音，它就是答案本身。',
          },
          {
            type: 'text',
            title: '为什么这一节值得你认真看完',
            body: '写代码的时间里，有很大一部分是在「它怎么不动了」上度过的。新手和熟手最大的差距，往往不是「会写多少语法」，而是**出问题时有没有一套固定的排查动作**。\n\n新手的典型反应是：看到白屏 → 慌 → 反复刷新 → 把代码改回去又改回来 → 截图去问人。熟手的反应是：白屏 → 看终端 → 看 Console 第一行 → 定位到文件和行号 → 改完收工，全程 30 秒。\n\n差别只在于：熟手知道**信息在哪里**，而且知道**按什么顺序看**。下面这四步就是那套顺序。把它背下来，遇到问题就照着走一遍，不要跳步。',
          },
          {
            type: 'text',
            title: '第 1 步：先看终端（跑 npm start 的那个窗口）',
            body: '很多人一白屏就盯着浏览器，其实**编译阶段的错误只会出现在终端里**。如果代码根本没编译成功，浏览器上显示的可能是上一次成功编译的旧页面，或者干脆一片空白。\n\n**怎么看：** 找那个正在跑 `npm start` 的终端窗口，往上滚，找**第一段红色**（或带 `ERROR` / `Failed to compile` 字样的）内容。注意是**第一段**——后面的报错常常是被第一个错误带出来的连锁反应。\n\n下面是四类最常见的终端报错，以及它们真正在说什么：\n\n**① `Module not found: Error: Can\'t resolve \'./Xxx\'`**\n\n翻译：「你写的 import 路径，我找不到对应的文件。」\n\n检查三件事：**大小写**（macOS 不区分大小写但服务器区分，`./header` 和 `./Header` 在你电脑上都能跑，部署到 Linux 就挂）、**相对路径层级**（`./` 是同级，`../` 是上一级，数错一层是最常见的）、**文件名后缀和实际是否一致**。\n\n**② `Error: listen EADDRINUSE: address already in use :::3000`**\n\n翻译：「3000 端口已经被别的程序占了。」\n\n多半是你之前开的 `npm start` 没关掉。CRA 通常会问你 `Would you like to run the app on another port instead?`，输入 `Y` 换端口即可。要彻底关掉旧的：Mac/Linux 用 `lsof -ti:3000 | xargs kill -9`，Windows 用 `netstat -ano | findstr :3000` 找到 PID 再 `taskkill /PID 数字 /F`。\n\n**③ `Cannot find module \'xxx\'` 或 `Module not found: Can\'t resolve \'antd\'`（指向一个第三方包名）**\n\n翻译：「这个依赖没装。」\n\n刚 clone 下来的项目、或者刚拉了同事的新代码，都要先 `npm install`。如果 install 过了还报，试试删掉重装：`rm -rf node_modules package-lock.json && npm install`。\n\n**④ `The engine "node" is incompatible` / 一堆看不懂的 `node-sass`、`gyp` 报错**\n\n翻译：「Node 版本不对。」\n\n`node -v` 看看版本，装 LTS 版本最稳。多项目切换版本建议装 `nvm`（Node 版本管理器）。\n\n**关键提醒：终端有报错时，一定要先解决终端，不要去看浏览器。** 编译都没过，浏览器上看到的东西没有参考价值。',
          },
          {
            type: 'text',
            title: '第 2 步：再看浏览器控制台（F12 → Console）',
            body: '终端干净了，页面还是不对，就打开浏览器控制台：**F12**（Mac 也可以 `Cmd + Option + I`），切到 **Console** 标签。\n\n**怎么读一段红色报错？记住两句话：**\n\n**① 只看第一行的「错误类型 + 错误信息」。**\n\n比如 `TypeError: Cannot read properties of undefined (reading \'name\')`。\n\n- 冒号前面 `TypeError` 是**错误类型**（类型错误，说明你把某个东西当成了它不是的类型来用）。\n- 冒号后面才是**具体信息**：「读不到 undefined 的 name 属性」，翻译成人话就是「你写了 `某个东西.name`，但那个东西现在是 `undefined`」。\n\n看不懂英文？把这一行**原样**复制去搜索或问 AI，别自己转述——转述的过程中信息就丢了。\n\n**② 堆栈（stack）里，只找第一个属于你自己代码的文件名。**\n\n报错下面那一堆缩进的 `at xxx (yyy.js:12:5)` 叫调用栈，它记录了「出错前经过了哪些函数」。里面绝大多数是 React 内部或 node_modules 里的文件，**跟你没关系，直接跳过**。\n\n你要找的是第一个出现 `src/` 的行，比如 `at UserCard (src/components/UserCard/index.js:14:23)`。这就是**出错的文件和行号**：第 14 行第 23 个字符。Console 里这些文件名是可以直接点的，点进去就跳到 Sources 面板对应位置。\n\n**③ 顺带说说黄色的 Warning。**\n\n黄色警告不会让页面崩，但**几乎每一条都在预告一个未来的 bug**（比如 key 警告会导致列表状态错乱）。不要养成无视黄字的习惯，写完一个功能顺手把警告清干净。\n\n**④ 控制台一条报错都没有，但页面就是白的？**\n\n那说明代码「成功地渲染了一个空东西」。直接跳到第 3 步和第 4 步的对照表——白屏无报错的三大原因（路由不匹配 / 组件返回了 undefined / 忘了 export default）都在表里。',
          },
          {
            type: 'text',
            title: '第 3 步：缩小范围——二分法和「最小复现」',
            body: '有时候报错信息指向的位置很模糊（比如整个 `App.js`），或者根本没有报错。这时候不要靠猜，用**物理方法**把范围一刀一刀砍小。\n\n**方法 A：注释掉一半（二分法）**\n\n假设 `App.js` 里渲染了 8 个组件，页面白屏。把后 4 个注释掉，保存：\n\n- 页面正常了 → 问题在后 4 个里。把注释恢复，改成注释掉后 2 个……\n- 页面还是白 → 问题在前 4 个里。\n\n8 个组件，最多 3 次就能定位到具体是哪一个。这个方法笨，但**100% 有效**，而且不需要你理解任何原理。\n\n**方法 B：把可疑组件换成一个纯文本**\n\n怀疑 `<UserList />` 有问题？直接改成：\n\n```\n{/* <UserList /> */}\n<div>test</div>\n```\n\n- 页面出现了 `test` → 确实是 `UserList` 的问题，进去继续查。\n- 页面还是白 → 跟 `UserList` 没关系，问题在它外面（父组件、路由、布局）。\n\n**方法 C：从最外层往里剥**\n\n白屏时先在 `App.js` 的最开头 `return <div>APP 活着</div>`。看得到就说明 React 挂载没问题，问题在下面的路由或页面里；看不到就说明 `index.js` 挂载环节出了问题（`#root` 找不到、`createRoot` 没调用等）。\n\n**方法 D：`console.log` 打点**\n\n在组件函数第一行加 `console.log(\'UserList 渲染了\', props)`。\n\n- **压根没打印** → 这个组件根本没被渲染，问题在父组件的条件判断或路由。\n- **打印了但数据是 undefined** → 组件在跑，但数据没传到，问题在数据来源。\n\n这一步的核心心法是：**不要一次改好几个地方**。改一处、存一次、看一次结果。同时改三处，出问题了你分不清是哪一处造成的，反而越查越乱。',
          },
          {
            type: 'table',
            title: '第 4 步：常见报错 / 现象 → 真正原因和改法（本节核心，遇事先查这张表）',
            intro: '把这张表存进书签。左边是你在终端或控制台看到的原文（或看到的现象），右边是它真正在说什么、以及具体怎么改。绝大多数新手问题都能在这里找到。',
            headers: ['报错信息 / 现象', '真正的原因和改法'],
            rows: [
              [
                '页面全白，控制台一条报错都没有',
                '三大嫌疑，逐个排查：① **路由 path 不匹配**——URL 是 /home 但路由表里写的是 /Home（大小写敏感），或者少写了嵌套路由的 <Outlet />；② **组件 return 了 undefined**——函数里写了 if 但某个分支没有 return，或者写成了 `return;` 后面另起一行写 JSX（JS 会在 return 后自动加分号！JSX 必须用 `return (` 括起来紧跟在同一行）；③ **忘了 export default**——import 进来的是 undefined，React 渲染 undefined 就是一片空白。先在 App.js 顶部 return 一个 <div>test</div> 确认 React 本身活着。',
              ],
              [
                'Objects are not valid as a React child (found: object with keys {name, age})',
                '你把一个**对象**直接塞进了 JSX，比如 `<p>{user}</p>`。JSX 只能渲染字符串、数字、JSX 元素、数组，不能渲染对象。改法：渲染具体字段 `<p>{user.name}</p>`；想调试看内容就 `<pre>{JSON.stringify(user, null, 2)}</pre>`。报错括号里的 keys 会直接告诉你是哪个对象。⚠️ 另一个常见变体：`{}` 里放了 Date 对象或 Promise，也是同一个错。',
              ],
              [
                "Cannot read properties of undefined (reading 'xxx')",
                '你写了 `a.xxx`，但 `a` 现在是 undefined。**最常见的场景是异步数据还没到就渲染了**：接口要 300ms 才返回，但组件第一次渲染是立刻发生的，那一刻 `user` 还是初始值 undefined。三种改法：① 可选链 `user?.name`（推荐，最省事）；② 给 useState 一个合理初始值 `useState({})` 或 `useState([])`；③ 加加载判断 `if (!user) return <p>加载中…</p>`。数组同理：`list?.map(...)` 或 `useState([])`。',
              ],
              [
                'Warning: Each child in a list should have a unique "key" prop',
                '用 `.map()` 渲染列表时，返回的最外层元素上忘了写 `key`。改法：`{list.map(item => <li key={item.id}>{item.name}</li>)}`。**key 要写在 map 直接返回的那一层**，写到里面的子元素上无效。优先用数据自带的唯一 id；实在没有再用 index，但列表会增删排序时用 index 会导致内容窜行（第 9 章有专门的对比 Demo）。',
              ],
              [
                'Too many re-renders. React limits the number of renders to prevent an infinite loop',
                '你在**渲染过程中**直接调用了 setState，于是「渲染→setState→重渲染→再 setState」无限循环。99% 是事件绑定写错了：`onClick={handleClick()}` ❌ ——加了括号等于渲染时立刻执行它。改成 `onClick={handleClick}`（传函数本身）或 `onClick={() => handleClick(id)}`（需要传参时包一层箭头函数）。另一种情况是直接在组件函数体里写了 `setCount(1)`，那应该放进 useEffect 或事件处理函数里。',
              ],
              [
                'Rendered more hooks than during the previous render / Rendered fewer hooks than expected',
                'Hook 被写在了 `if`、`for`、`return` 之后或某个嵌套函数里，导致两次渲染时 Hook 的调用**数量或顺序**不一致，React 对不上号。改法：把所有 useState / useEffect / useRef **全部提到组件函数最顶部**，条件判断写在 Hook 内部，而不是包在 Hook 外面。错：`if (a) { const [x] = useState() }`；对：`const [x] = useState(); if (a) { ... }`。提前 return 也要写在所有 Hook 之后。',
              ],
              [
                'Invalid hook call. Hooks can only be called inside of the body of a function component',
                '三种可能：① 在**普通函数**里调了 Hook——自定义 Hook 的函数名必须以 `use` 开头，比如 `useMyThing`；② 在**类组件**或组件外部调了 Hook；③ 项目里装了**两份 React**（多见于 npm link 本地调试，或依赖里带了自己的 react）。前两种改代码即可；第三种执行 `npm ls react` 看是不是出现了两个版本。',
              ],
              [
                'Maximum update depth exceeded',
                'useEffect 里调用了 setState，而这个 state 又出现在 effect 的依赖数组里，形成死循环。改法：① 检查依赖数组是不是漏了或多了——`useEffect(fn)` **完全不写第二个参数**表示「每次渲染后都执行」，几乎总是写错了，只跑一次要写 `[]`；② 依赖里如果是对象/数组/函数，每次渲染都是新的引用，会被认为「变了」，用 useMemo / useCallback 包住（第 10 章讲）；③ setState 前加个「值真的变了才设」的判断。',
              ],
              [
                "Warning: Can't perform a React state update on an unmounted component",
                '组件已经被卸载（比如用户切走了页面），但之前发起的定时器/请求/事件监听还在跑，回来时想 setState。改法：**useEffect 一定要返回清理函数**——`return () => clearInterval(timer)`、`return () => controller.abort()`、`return () => el.removeEventListener(...)`。凡是在 effect 里「开」了什么，都要在返回的函数里「关」掉。',
              ],
              [
                "Module not found: Error: Can't resolve './xxx'",
                '编译期错误，只在**终端**出现。三个检查点：① **大小写**——你电脑上 `./header` 能找到 `Header.js`，Linux 服务器上就找不到，务必和文件名完全一致；② **相对路径层级**——`./` 同级、`../` 上一级、`../../` 上两级，从 `pages/Home/index.js` 引 `src/utils/x.js` 要写 `../../utils/x`；③ **文件是不是真的存在**、有没有拼错、有没有忘记保存新建的文件。指向第三方包名（如 antd）时则是没装依赖，跑 `npm install`。',
              ],
              [
                "'useState' is not defined / useState is not a function",
                '忘了 import，或 import 写错了。正确写法是**具名导入**：`import { useState } from \'react\'`（有花括号）。错误写法：`import useState from \'react\'`（没花括号，那是默认导入，拿到的是整个 React 对象）。同理 useEffect、useRef、useMemo 都要写在同一个花括号里：`import { useState, useEffect } from \'react\'`。',
              ],
              [
                '样式完全不生效（className 写了但没效果）',
                '按顺序查五条：① **CSS 文件忘了 import**——最高频，而且**不会有任何报错**；② **写成了 `class` 而不是 `className`**；③ **类名拼错或大小写不一致**——CSS 里 `.userCard`，JSX 里写 `user-card`；④ **被更高优先级的规则覆盖**——打开 DevTools 的 Elements 面板，右侧 Styles 里被划掉的就是失效的规则，能直接看到是谁覆盖的；⑤ **用了 CSS Modules 但写法不对**——必须 `className={styles.card}`，详见第 13 章。',
              ],
              [
                '改了代码，页面一点变化都没有',
                '① **文件没保存**（Cmd/Ctrl + S，看标签页上还有没有小圆点）；② **终端里其实有编译报错**，热更新已经停了，浏览器显示的是上一次成功的版本——回去看终端；③ **改的不是正在渲染的那个文件**（同名文件搞混，或者改了 `Button.js` 但页面引的是 `Button/index.js`）；④ **浏览器缓存**——Cmd/Ctrl + Shift + R 硬刷新；⑤ **热更新自己卡住了**——Ctrl+C 停掉 npm start 重新跑，这一招能解决意外的多数怪问题。',
              ],
              [
                'Adjacent JSX elements must be wrapped in an enclosing tag',
                'return 里并排放了两个标签。JSX 必须只有一个根节点。用 `<div>` 包起来，或者用不产生真实 DOM 的 Fragment：`<>...</>`。',
              ],
              [
                'Uncaught SyntaxError: Unexpected token / Failed to compile 但看不懂',
                '纯语法错误。按顺序看：标签有没有闭合（`<img>` 在 JSX 里必须写 `<img />`）、花括号/圆括号数量对不对、`return (` 的括号有没有配对、对象字面量里逗号有没有漏。编辑器里通常已经有红色波浪线了——**先把编辑器里所有红波浪线消掉，再去看浏览器**。',
              ],
              [
                'Warning: Received `true` for a non-boolean attribute / React does not recognize the `xxx` prop on a DOM element',
                '你把一个自定义 prop 透传到了真实 DOM 标签上，比如 `<div isActive={true}>`。原生 DOM 不认识 `isActive`。改法：解构时把自定义 prop 摘出来，只把剩下的 `...rest` 传给 DOM；或者改用 `data-` 开头的属性 `data-active="true"`。',
              ],
            ],
            note: '用法建议：先在这张表里用 Ctrl+F 搜报错的**关键几个英文单词**（比如搜 "unique key" 或 "undefined (reading"）。搜不到再去网上查——搜索时也请把**报错原文**贴进去，不要贴你自己转述的中文。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：报错模拟器——选一种常见错误，看现象、报错原文和正确改法',
            body: `import { useState } from 'react' // 引入 useState 保存当前选中的错误类型

// 【注意】这个 Demo 不会真的抛错崩掉页面 —— 它是把每种错误的「现象 / 报错原文 / 错误写法 / 正确写法」
// 当成数据展示出来。真实报错的样子请对照第 4 步那张大表，或者自己故意写错试一次。

const CASES = [ // 每一项就是一种高频错误的完整档案
  {
    key: 'child-object',
    label: 'Objects are not valid as a React child',
    symptom: '页面整块白掉或红屏，控制台一条醒目的红色报错',
    message: 'Uncaught Error: Objects are not valid as a React child (found: object with keys {name, age}). If you meant to render a collection of children, use an array instead.',
    why: '你把一整个对象塞进了 JSX 的花括号里。JSX 能渲染字符串、数字、JSX 元素和数组，唯独不能渲染普通对象。',
    bad: 'const user = { name: 小明, age: 18 }\\n\\nreturn <p>{user}</p>   // ❌ 整个对象塞进去了',
    good: 'const user = { name: 小明, age: 18 }\\n\\nreturn <p>{user.name}</p>              // ✅ 渲染具体字段\\n// 想看全部内容调试时：\\nreturn <pre>{JSON.stringify(user, null, 2)}</pre>',
  },
  {
    key: 'undefined-read',
    label: "Cannot read properties of undefined (reading 'name')",
    symptom: '页面首次加载就崩，但你手动刷新几次偶尔又是好的（取决于数据回来的快慢）',
    message: "Uncaught TypeError: Cannot read properties of undefined (reading 'name')\\n    at UserCard (src/components/UserCard/index.js:8:20)",
    why: '异步数据还没回来，组件已经先渲染了一次。那一刻 user 还是 undefined，你却在读它的 name。',
    bad: 'const [user, setUser] = useState()   // ❌ 初始值是 undefined\\n\\nuseEffect(() => { fetchUser().then(setUser) }, [])\\n\\nreturn <h2>{user.name}</h2>          // ❌ 第一次渲染时 user 还不存在',
    good: 'const [user, setUser] = useState(null)\\n\\nuseEffect(() => { fetchUser().then(setUser) }, [])\\n\\n// 方案一：可选链，user 是空时整个表达式就是 undefined，不报错\\nreturn <h2>{user?.name}</h2>\\n\\n// 方案二：加载态提前 return（更推荐，用户能看到反馈）\\nif (!user) return <p>加载中…</p>\\nreturn <h2>{user.name}</h2>',
  },
  {
    key: 'key-warning',
    label: 'Each child in a list should have a unique "key" prop',
    symptom: '页面能正常显示，但控制台有黄色警告；列表增删后输入框里的内容会窜到别的行',
    message: 'Warning: Each child in a list should have a unique "key" prop.\\n    Check the render method of \\'TodoList\\'.',
    why: 'map 渲染列表时，直接返回的那一层元素上没写 key。React 靠 key 认出「哪一条是哪一条」，没有 key 就只能靠位置猜。',
    bad: '{list.map(item => (\\n  <li>{item.name}</li>          // ❌ 没有 key\\n))}',
    good: '{list.map(item => (\\n  <li key={item.id}>{item.name}</li>   // ✅ key 写在 map 直接返回的最外层\\n))}\\n\\n// key 优先用数据自带的唯一 id；\\n// 列表会增删排序时千万别用 index，会导致内容窜行',
  },
  {
    key: 'too-many',
    label: 'Too many re-renders',
    symptom: '页面直接红屏崩溃，或者浏览器卡死风扇狂转',
    message: 'Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.',
    why: '在「渲染过程中」调用了 setState：渲染 → setState → 重新渲染 → 又 setState → 无限循环。最常见的是事件绑定时多写了一对括号。',
    bad: '// ❌ 加了括号 = 渲染这一行时就立刻执行 handleClick，于是立刻 setState\\n<button onClick={handleClick()}>点我</button>\\n\\n// ❌ 直接写在组件函数体里也一样会死循环\\nfunction Demo() {\\n  const [n, setN] = useState(0)\\n  setN(1)                 // 每次渲染都执行\\n  return <p>{n}</p>\\n}',
    good: '// ✅ 传函数本身，不要加括号 —— 让 React 在点击时才去调用它\\n<button onClick={handleClick}>点我</button>\\n\\n// ✅ 需要传参数时，包一层箭头函数\\n<button onClick={() => handleClick(item.id)}>删除</button>\\n\\n// ✅ 想在挂载后设一次值，放进 useEffect\\nuseEffect(() => { setN(1) }, [])',
  },
  {
    key: 'hooks-order',
    label: 'Rendered more hooks than during the previous render',
    symptom: '一开始正常，某个条件变化后突然崩溃',
    message: 'Uncaught Error: Rendered more hooks than during the previous render.\\n    at renderWithHooks',
    why: 'Hook 被写在了 if 里面。React 靠「调用顺序」来对应每个 Hook 的数据，顺序一变就全乱套了。',
    bad: 'function Profile({ userId }) {\\n  if (!userId) return <p>未登录</p>     // ❌ 在 Hook 之前就 return 了\\n\\n  const [data, setData] = useState(null)  // 有时执行，有时不执行 → 数量对不上\\n  return <div>{data}</div>\\n}',
    good: 'function Profile({ userId }) {\\n  // ✅ 所有 Hook 无条件写在最顶部，永远按同样的顺序执行\\n  const [data, setData] = useState(null)\\n\\n  // ✅ 条件判断和提前 return 都放在 Hook 之后\\n  if (!userId) return <p>未登录</p>\\n\\n  return <div>{data}</div>\\n}',
  },
  {
    key: 'blank-no-error',
    label: '白屏，但控制台一条报错都没有',
    symptom: '页面纯白，Console 干干净净，终端也没红字 —— 最让人抓狂的一种',
    message: '（没有任何报错，这正是它难查的原因）',
    why: '代码「成功地渲染了一个空东西」。三大嫌疑：路由 path 不匹配、组件返回了 undefined、忘了 export default。',
    bad: '// ❌ 嫌疑一：忘了默认导出，import 进来的是 undefined\\nfunction Home() { return <h1>首页</h1> }\\n// 这里少了一行 export default Home\\n\\n// ❌ 嫌疑二：return 后换行了，JS 自动补分号，实际返回 undefined\\nfunction Home() {\\n  return\\n    <h1>首页</h1>\\n}\\n\\n// ❌ 嫌疑三：URL 是 /home，路由表里写的是 path: /Home（大小写不匹配）',
    good: '// ✅ 一：补上默认导出\\nexport default Home\\n\\n// ✅ 二：左括号必须和 return 在同一行\\nfunction Home() {\\n  return (\\n    <h1>首页</h1>\\n  )\\n}\\n\\n// ✅ 三：路由 path 全小写，和 URL 完全一致\\n\\n// 排查手法：在 App.js 最顶上先 return <div>APP 活着</div>\\n// 看得到 → 问题在下面的路由/页面；看不到 → 问题在 index.js 挂载环节',
  },
  {
    key: 'module-not-found',
    label: "Module not found: Can't resolve './Header'",
    symptom: '浏览器上是一整屏红色错误页，**终端里**也有同样的红字',
    message: "Failed to compile.\\n\\nModule not found: Error: Can't resolve './Header' in '/Users/you/project/src/components'",
    why: '编译期错误：import 的路径找不到对应文件。这类错误只会出现在终端和编译错误页，跟运行时报错不是一回事。',
    bad: '// （下面路径两边的引号省略了，方便阅读）\\n\\nimport Header from ./header        // ❌ 大小写不对，实际文件叫 Header.js\\nimport helper from ./utils/help    // ❌ 层级数错了，从 pages/Home 出发应该是 ../../utils/help\\nimport { Button } from antd        // ❌ 没跑过 npm install 的话，antd 根本不存在',
    good: 'import Header from ./Header         // ✅ 大小写和文件名完全一致\\nimport helper from ../../utils/help // ✅ ../ 上一级，../../ 上两级，数清楚层数\\n\\n// 报错指向第三方包名（antd、axios 这种）→ 先跑 npm install\\n// 装了还报 → rm -rf node_modules package-lock.json && npm install',
  },
]

const pre = { // 代码块共用样式
  margin: '4px 0 0',
  padding: 10,
  background: '#f5f6f5',
  borderRadius: 6,
  fontSize: 12,
  fontFamily: 'monospace',
  whiteSpace: 'pre-wrap', // 让长行自动换行，不出横向滚动条
  lineHeight: 1.7,
}
const label = { margin: '10px 0 0', fontSize: 12, fontWeight: 700, color: '#5c6b62' } // 小标题

export default function Demo() { // 默认导出组件
  const [key, setKey] = useState(CASES[0].key) // 当前选中的错误类型
  const c = CASES.find((x) => x.key === key) // 按 key 找出对应的那份档案

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui', maxWidth: 620 }}>
      <label style={{ fontSize: 13, display: 'block', marginBottom: 10 }}>
        选一种常见错误：
        {/* 受控下拉框：value 绑 state，onChange 里更新 state */}
        <select
          value={key}
          onChange={(e) => setKey(e.target.value)}
          style={{ marginLeft: 8, padding: '4px 8px', fontSize: 13, maxWidth: 380 }}
        >
          {CASES.map((x) => (
            <option key={x.key} value={x.key}>{x.label}</option>
          ))}
        </select>
      </label>

      <div style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8, background: '#fff' }}>
        <p style={label}>😵 你会看到的现象</p>
        <p style={{ margin: '4px 0 0', fontSize: 13 }}>{c.symptom}</p>

        <p style={label}>📕 控制台里的报错原文（照着这段去搜索最有效）</p>
        <pre style={{ ...pre, background: '#fff1f0', color: '#a8071a' }}>{c.message}</pre>

        <p style={label}>🔍 它到底在说什么</p>
        <p style={{ margin: '4px 0 0', fontSize: 13, lineHeight: 1.8 }}>{c.why}</p>

        <p style={{ ...label, color: '#a8071a' }}>❌ 出错的写法</p>
        <pre style={pre}>{c.bad}</pre>

        <p style={{ ...label, color: '#389e0d' }}>✅ 正确的写法</p>
        <pre style={{ ...pre, background: '#f6ffed' }}>{c.good}</pre>
      </div>

      <p style={{ marginTop: 10, fontSize: 12, color: '#8c8c8c' }}>
        建议：每一种都自己在项目里故意写错一次、亲眼看一遍真实报错。踩过的坑才记得住。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'list',
            title: '排错四步法速记（贴在显示器边上）',
            ordered: true,
            intro: '出问题时不要跳步，按顺序走一遍，绝大多数问题撑不过第二步。',
            items: [
              '**看终端**：跑 npm start 的窗口有没有红字？有就先解决它，编译不过看浏览器没意义。',
              '**看控制台**：F12 → Console，读第一行的错误类型和信息，再在堆栈里找第一个带 src/ 的文件名和行号。',
              '**缩小范围**：注释掉一半、把可疑组件换成 <div>test</div>、在组件第一行 console.log。一次只改一处。',
              '**查对照表**：拿报错的关键英文单词回上面那张大表里搜。',
              '**还是不行**：把报错原文完整复制去搜索或问人（见下面「提问的正确姿势」）。',
              '**万能一招**：Ctrl+C 停掉 npm start 重新跑一次。热更新卡住导致的怪问题，重启就好了。',
            ],
          },
          {
            type: 'list',
            title: '提问的正确姿势（这样问，别人 30 秒就能帮你解决）',
            ordered: true,
            intro: '不管是问同事、发到群里，还是问 AI，一个好问题要包含下面这几样。缺了它们，对方只能靠猜。',
            items: [
              '**贴报错全文**，从第一行错误类型一直到堆栈里第一个 src/ 的位置。**原样复制文本，不要截图局部，更不要用自己的话转述**——转述的过程中最关键的信息往往就丢了。',
              '**贴相关代码**，尤其是报错行号指向的那个文件的那一段（前后各几行）。代码用代码块包起来，别贴成图片，方便对方直接复制修改。',
              '**说清楚你期望什么、实际发生了什么**：「我期望点击后列表少一项，实际是整页白屏」。不要只说「不行」「有问题」。',
              '**说明复现步骤**：是一打开就这样，还是点了某个按钮之后才这样？只在某个页面出现，还是到处都是？',
              '**说明你已经试过什么**：「我确认过文件保存了，也硬刷新过，把 UserList 注释掉之后页面就正常了」。这能省掉对方一半的提问。',
              '**说明环境**：Node 版本（node -v）、是刚 clone 的项目还是改了很久、最近改了什么（git diff 看一下）。',
              '**先自己搜一遍**：把报错原文粘进搜索框，多半第一条结果就是答案。搜过没解决的话，在提问时说明「我搜到了 xx 方案，试了没用」。',
            ],
          },
          {
            type: 'text',
            title: '最后：几个能大幅减少 bug 的习惯',
            body: '排错能力重要，但**少制造 bug** 更重要。这几个习惯几乎不花时间，却能挡掉大量问题：\n\n**① 写一点，看一眼。** 不要一口气写 200 行再刷新。每写完一个小功能就保存看一次效果——出问题时你**确切知道**是刚才那几行造成的，根本不需要排查。\n\n**② 把编辑器的红波浪线当回事。** 保存前扫一眼有没有红线、终端有没有黄字。编辑器已经提前告诉你了，别等浏览器崩了才回头找。\n\n**③ 装 ESLint 并让它在保存时自动检查。** CRA 默认已经带了，终端里那些黄色的 Warning 就是它给的。「定义了但没使用的变量」这类提示常常正好指出你的笔误。\n\n**④ 用 Git 频繁提交。** 每完成一小步就 commit 一次。改崩了 `git diff` 一看就知道动了什么，实在乱了 `git checkout .` 一键回到上一个好的状态。这是最强的「后悔药」。\n\n**⑤ 不要复制自己看不懂的代码。** 从网上抄一段过来，至少要能说出每一行大致在干什么。看不懂的代码出了问题，你没有任何排查能力。\n\n**⑥ 报错先自己读三遍再求助。** 大部分报错的英文很短，而且信息量极大。养成「读完再动」的习惯，你的进步速度会比别人快很多。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '**终端 → 控制台 → 二分法 → 查表。** 读报错只看两样：第一行的错误类型和信息、堆栈里第一个带 `src/` 的文件行号。白屏无报错就查三件事：路由 path、有没有 return、有没有 `export default`。一次只改一处；实在不行重启 `npm start`。',
          },
        ],
      },
    },
    {
      id: 'react-devtools',
      title: '调试工具：React DevTools 与浏览器面板',
      summary: 'Components 面板看组件树和 props/state、Profiler 看谁渲染慢，加上 Elements / Console / Network / Sources 四个浏览器面板——遇到什么问题该开哪个',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '装一个 **React Developer Tools** 浏览器扩展，F12 里就会多出 **Components** 和 **Profiler** 两个标签。Components 用来看「这块 UI 是哪个组件画的、它的 props 和 state 是什么」，Profiler 用来看「哪个组件渲染慢、渲染了几次」。加上浏览器自带的 Elements / Console / Network / Sources，六个面板覆盖 99% 的调试场景。',
          },
          {
            type: 'text',
            title: '1）React DevTools 怎么装',
            body: '**Chrome / Edge**：打开扩展商店（Chrome Web Store），搜 `React Developer Tools`，认准作者是 **Meta（Facebook）**，点安装。Edge 可以直接装 Chrome 商店的版本。\n\n**Firefox**：在 Add-ons 里搜同样的名字。\n\n**装好怎么确认**：打开任意一个用 React 写的网站（比如你自己的 `localhost:3000`），按 F12，标签栏最右边应该多出 **⚛️ Components** 和 **⚛️ Profiler** 两个标签。浏览器地址栏右边的扩展图标也会变成彩色——**灰色表示当前页面不是 React 应用**，彩色表示识别到了。\n\n**装不了扩展怎么办**（公司电脑限制、内网环境）：可以用独立版。终端里跑 `npx react-devtools` 会打开一个独立窗口，然后在你项目的 `public/index.html` 的 `<head>` 里加一行 `<script src="http://localhost:8097"></script>` 就能连上。用完记得把这行删掉。\n\n**一个常见困惑**：装好了但标签没出现——刷新一下页面（F5），扩展需要在页面加载时注入。还不行就重启浏览器。',
          },
          {
            type: 'text',
            title: '2）Components 面板：新手用得最多的一个',
            body: '打开 F12 → **Components**。左边是**组件树**（你写的组件的嵌套关系，比 Elements 里的 DOM 树好懂太多），选中任意一个组件，右边会显示它的全部信息。\n\n**它能帮你解决这四类问题：**\n\n**① 「这块 UI 到底是哪个组件画的？」**\n\n点面板左上角的**箭头图标**（选择器），然后在页面上点你想查的那块内容——组件树会自动跳到对应的组件并选中。接手别人的项目、或者自己项目文件多了找不到时，这一招能省下大量翻文件的时间。\n\n**② 「这个组件收到的 props 对不对？」**\n\n选中组件，右边 **props** 区域会列出它接收到的所有属性和当前的值。对象和数组可以展开。**「数据没传下来」这类问题，在这里一眼就能看出是父组件没传，还是传了但是 undefined。**\n\n**③ 「state 现在是什么？我改一下试试会怎样。」**\n\n右边的 **hooks** 区域按顺序列出这个组件的所有 Hook：`State`、`Effect`、`Ref`、`Memo`……State 的值**可以直接双击修改**，页面会立刻重新渲染。\n\n这一点特别有用：想看「列表为空时长什么样」，不用去改代码造假数据，直接在这里把数组改成 `[]`；想看错误提示的样式，直接把 `error` 改成一段文字。**调 UI 的效率能翻好几倍。**\n\n**④ 「它的父组件是谁？Context 传下来什么？」**\n\n面板底部有一条**面包屑**，显示从根组件到当前组件的完整路径，点任意一层就能跳过去。如果组件消费了 Context，右边也会有一块 `Context` 显示当前拿到的值。\n\n**两个实用小设置**（点右上角齿轮）：\n\n• 勾选 **Highlight updates when components render**——每次重新渲染时，对应的区域会闪一圈彩色边框。**这是肉眼观察「谁在重复渲染」最直观的方法**，做性能优化时必开。\n\n• **Hide components where...** 可以按名字过滤掉不关心的组件（比如各种 Provider），让组件树清爽一点。',
          },
          {
            type: 'text',
            title: '3）Profiler 面板：找出「谁渲染慢、谁渲染多」',
            body: 'Profiler 用来做**性能分析**，配合第 10 章的 `useMemo` / `useCallback` / `React.memo` 使用。初学阶段不用深究，但知道怎么录一次、怎么看，能让你的优化**有数据支撑**，而不是凭感觉瞎改。\n\n**怎么用（三步）：**\n\n1. F12 → **Profiler** → 点左上角的**蓝色圆点**开始录制。\n2. 在页面上做一次你觉得卡的操作（比如在输入框里打几个字、点几下按钮）。\n3. 再点一次圆点**停止录制**。\n\n**怎么看结果：**\n\n**火焰图（Flamegraph）**：每一次渲染（commit）画成一排横条。**条越宽 = 渲染耗时越长**，灰色表示这次没有重新渲染。你要找的就是那些又宽又亮的条。\n\n**排序图（Ranked）**：把本次渲染的组件按耗时**从高到低**排序。想快速找到罪魁祸首，直接看这个视图的第一行。\n\n**顶部的时间轴**：显示这次录制里一共发生了几次 commit。**如果你只点了一次按钮却看到十几次 commit，说明有不该发生的重复渲染**——这往往比「单次渲染慢」更值得优化。\n\n**点开某个组件**，右边会显示它「为什么会重新渲染」（Why did this render?）——需要先在设置里勾选 **Record why each component rendered**。它会明确告诉你是 props 变了、state 变了，还是父组件重渲染带的。**这一句话经常直接就是答案。**\n\n**⚠️ 重要前提**：Profiler 只在**开发模式**下有数据。生产构建（`npm run build`）默认会去掉 profiling 信息，这是为了减小体积——所以「开发环境测到的耗时」通常比生产环境**慢一些**，看相对大小就好，别太在意绝对数字。',
          },
          {
            type: 'text',
            title: '4）浏览器自带的四个面板',
            body: '**① Elements（元素）——看最终 DOM 和生效的 CSS**\n\nReact 最终也是生成真实 DOM，Elements 面板看到的就是最终结果。\n\n最有价值的是右侧的 **Styles** 区域：它按优先级列出作用在这个元素上的**所有** CSS 规则，**被划掉的横线表示这条规则被覆盖了**，旁边还写着来自哪个文件第几行。「我明明写了 `color: red` 怎么不生效」——来这里看，谁覆盖了它一目了然。\n\n右侧还能直接**实时改样式调参**：双击属性值改数字，或者点 `+` 加一条新规则，页面立刻变化。**调间距、调颜色时先在这里试出满意的数值，再回代码里写死**，比「改代码 → 保存 → 看效果」快十倍。注意这些修改**刷新就没了**，别忘了同步回代码。\n\n再下面的 **Computed** 区域显示「最终计算出来的值」，还有一个盒模型图，能直观看到 margin / border / padding / content 各占多少——布局对不上时看它。\n\n**② Console（控制台）——不只是看报错**\n\n除了看报错，`console` 还有几个被严重低估的方法：\n\n- `console.log({ user, list, count })` ——**加一层花括号**！这样打印出来会带**变量名**：`{user: {...}, list: Array(3), count: 5}`。比 `console.log(user, list, count)` 打出一堆没名字的值清楚得多。这是最值得马上养成的习惯。\n- `console.table(list)` ——数组（尤其是对象数组）用表格形式打印，行列对齐，还能点表头排序。看接口返回的列表数据时极其好用。\n- `console.warn()` / `console.error()` ——黄色和红色高亮，还会自动带上调用栈。自己埋的调试信息用这两个，在一堆 log 里更容易找到。\n- `console.count(\'渲染了\')` ——自动计数，第几次调用就打印几，用来数「这个函数被调了多少次」特别方便。\n- `console.time(\'加载\')` / `console.timeEnd(\'加载\')` ——测一段代码耗时。\n- 控制台**本身就是一个 JS 环境**：可以直接敲表达式回车执行，试语法、试数组方法比新建文件快得多。\n\n**③ Network（网络）——接口到底有没有发出去**\n\n和第 15 章的接口联调配合使用。打开 Network，刷新页面或触发一次请求，你能看到：\n\n- **请求有没有真的发出去**——列表里根本没有这条，说明代码压根没执行到，问题在前端逻辑，不是后端。\n- **Status 状态码**：`200` 成功、`404` 地址写错、`401`/`403` 没登录或没权限、`500` 后端崩了、`CORS error` 跨域问题。**这一列能直接判断「是前端的锅还是后端的锅」。**\n- 点开某条请求：**Headers** 看请求头（Token 带上了没）、**Payload** 看你发过去的参数对不对、**Response** 看后端真实返回了什么、**Preview** 把 JSON 格式化后展示。\n- 顶部的 **Fetch/XHR** 筛选按钮能只看接口请求，过滤掉图片和脚本。\n- 勾选 **Disable cache** 可以排除缓存干扰；旁边的下拉框能模拟慢速网络，用来测 loading 状态。\n\n**④ Sources（源代码）——打断点，一步步看**\n\n`console.log` 是「打印几个点」，断点是「让程序停下来，把当前所有变量都摊开给你看」。复杂逻辑用断点效率高得多。\n\n两种打断点的方式：\n\n- **在代码里写 `debugger`**：执行到这一行时，只要 DevTools 是打开的，程序就会自动暂停。最简单，但**记得删掉再提交**。\n- **在 Sources 面板点行号**：找到文件（`Cmd/Ctrl + P` 可以按文件名快速搜索），点左侧行号就打上了断点，蓝色标记。**右键行号还能设「条件断点」**——填一个条件表达式（比如 `item.id === 5`），只有满足时才暂停。循环里调试神器，不用一路点几十次。\n\n**暂停之后能干什么**：右侧 **Scope** 区域列出当前作用域里所有变量的实时值；把鼠标悬停在代码里任意变量上也会显示它的值；**Watch** 区域可以添加你想持续盯着的表达式；下面的 **Call Stack** 显示是谁调用到这里的。\n\n**四个控制按钮**（快捷键在括号里）：▶️ 继续执行到下一个断点（F8）、⤵️ 单步跳过这一行（F10）、⬇️ 单步进入这个函数内部（F11）、⬆️ 跳出当前函数（Shift+F11）。',
          },
          {
            type: 'text',
            title: '5）为什么我的 effect 执行了两次、日志打印了两次？（StrictMode 高频困惑）',
            body: '几乎每个新手都会问这个问题，所以单独拎出来讲清楚。\n\n**现象**：你在 `useEffect` 里写了 `console.log(\'挂载了\')`，结果控制台打印了**两次**；或者在 effect 里发了一个请求，Network 里看到**发了两遍**。\n\n**原因**：CRA 生成的 `src/index.js` 里，`<App />` 外面包了一层 `<React.StrictMode>`：\n\n```\nroot.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n)\n```\n\n从 React 18 开始，**StrictMode 会在开发模式下故意把每个组件多挂载一次**：挂载 → 立刻卸载 → 再挂载。所以 effect 会「执行 → 清理 → 再执行」，你看到的两次日志就是这么来的。\n\n**这不是 bug，是一个免费的体检项目。** React 这么做是为了**帮你提前暴露「没有正确清理副作用」的问题**：\n\n- 如果你的 effect 里 `setInterval` 了却没在返回函数里 `clearInterval`，两次挂载就会留下两个定时器，页面上的数字会**跳着走**——这个 bug 在生产环境里同样存在（比如用户来回切换页面时），只是不容易被发现。StrictMode 让它在开发时就立刻暴露出来。\n- 同理，没有 `removeEventListener` 的监听、没有 `abort` 的请求，都会在这里现形。\n\n**三件必须记住的事：**\n\n**① 生产环境绝对不会执行两次。** `npm run build` 之后 StrictMode 完全不生效，只挂载一次。所以**不要为了「解决」它而去掉 StrictMode**，那等于把体检仪器砸了。\n\n**② 正确的应对是「让 effect 能安全地执行两次」**，也就是老老实实写清理函数：\n\n```\nuseEffect(() => {\n  const timer = setInterval(tick, 1000)\n  return () => clearInterval(timer)   // ← 有了这行，执行两次也不会出问题\n}, [])\n```\n\n**③ 顺带一提**，StrictMode 下组件函数本身也会被多执行一次（用来检查你有没有在渲染期间做副作用），所以写在组件函数体里的 `console.log` 也会打两次。同样是开发环境限定。\n\n**如果实在被日志干扰**：可以临时把 `index.js` 里的 StrictMode 去掉验证一下，但**验证完一定要加回来**。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：没装 DevTools 也能查——自制「渲染次数 + props 变化」监视器',
            body: `import { useEffect, useRef, useState } from 'react' // useRef 存「跨渲染保留但不触发重渲染」的数据

/**
 * 【土办法调试工具】
 * DevTools 的 Profiler 能告诉你「渲染了几次、为什么渲染」，
 * 但在没装扩展、或者想把信息直接显示在界面上时，可以用 useRef 自己做一个。
 * 原理：useRef 的值改了不会触发重新渲染，正好用来当「计数器」和「上一次的值」。
 */
function useRenderTracker(name, props) {
  const renderCount = useRef(0) // 渲染次数计数器。用 useState 会死循环，必须用 useRef
  const prevProps = useRef(props) // 上一次的 props，用来做对比
  const changed = useRef([]) // 本次渲染中发生变化的 props 名字列表

  renderCount.current += 1 // 每次组件函数执行就 +1（组件函数每渲染一次就完整跑一遍）

  // 逐个 key 对比新旧 props，找出变了的那些
  const diff = []
  Object.keys(props).forEach((key) => {
    if (prevProps.current[key] !== props[key]) { // 用 !== 比较：对象/数组比的是引用
      diff.push(key + '：' + JSON.stringify(prevProps.current[key]) + ' → ' + JSON.stringify(props[key]))
    }
  })
  changed.current = diff

  // 副作用里把结果打到控制台 —— 真实项目里就靠这几行日志排查
  useEffect(() => {
    console.log('[' + name + '] 第 ' + renderCount.current + ' 次渲染', diff.length ? diff : '（props 没变，是父组件重渲染带的）')
    prevProps.current = props // 记录本次 props，供下次对比。必须放在 effect 里，不能放渲染期间
  })

  return { count: renderCount.current, changed: changed.current }
}

const panel = { padding: 10, borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', fontSize: 13, marginBottom: 8 }
const tag = { display: 'inline-block', padding: '1px 7px', borderRadius: 10, fontSize: 11, background: '#f0f7f3', color: '#2f6b4f', marginLeft: 6 }

// 子组件：接收 label 和 value 两个 props
function Child({ label, value }) {
  const { count, changed } = useRenderTracker('Child-' + label, { label, value }) // 接上监视器

  return (
    <div style={panel}>
      <strong>{label}</strong>
      <span style={tag}>已渲染 {count} 次</span>
      <p style={{ margin: '6px 0 0', fontSize: 12, color: '#5c6b62' }}>value = {String(value)}</p>
      <p style={{ margin: '4px 0 0', fontSize: 12, color: changed.length ? '#d46b08' : '#bfbfbf' }}>
        {changed.length ? '本次变化：' + changed.join('；') : '本次 props 没变 —— 纯粹被父组件带着重渲染了'}
      </p>
    </div>
  )
}

export default function Demo() { // 默认导出组件
  const [a, setA] = useState(0) // 只影响第一个子组件
  const [b, setB] = useState(0) // 只影响第二个子组件
  const [noise, setNoise] = useState(0) // 谁的 props 都不影响，但会让父组件重渲染

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui', maxWidth: 480 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        <button type="button" onClick={() => setA((n) => n + 1)}>改 A 的 props</button>
        <button type="button" onClick={() => setB((n) => n + 1)}>改 B 的 props</button>
        <button type="button" onClick={() => setNoise((n) => n + 1)}>
          改一个谁都不用的 state（{noise}）
        </button>
      </div>

      {/* 两个子组件的 props 各自独立，但它们的父组件是同一个 */}
      <Child label="子组件 A" value={a} />
      <Child label="子组件 B" value={b} />

      <p style={{ fontSize: 12, color: '#5c6b62', lineHeight: 1.9, margin: 0 }}>
        👉 点第三个按钮：<strong>两个子组件的渲染次数都会 +1，但它们的 props 一个都没变</strong>。
        <br />
        这就是「父组件重渲染 → 所有子组件跟着重渲染」的默认行为。
        <br />
        第 10 章的 React.memo 就是用来跳过这种无意义渲染的。
        <br />
        同时打开 F12 的 Console，能看到每次渲染的日志 —— 这就是没装 DevTools 时的土办法。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: 'console 的进阶用法速查（复制到控制台里跑一遍就记住了）',
            language: 'javascript',
            body: `const user = { id: 1, name: '小明', age: 18 }
const list = [
  { id: 1, name: '小明', score: 92 },
  { id: 2, name: '小红', score: 87 },
  { id: 3, name: '小刚', score: 78 },
]

// ❌ 打印一堆没名字的值，多了根本分不清谁是谁
console.log(user, list, user.age)

// ✅ 加一层花括号 —— 打印结果自动带上变量名：{user: {...}, list: Array(3)}
// 这是最值得立刻养成的习惯，改动只有两个字符，可读性提升巨大
console.log({ user, list })

// ✅ 对象数组用 table，自动排成表格，还能点表头排序 —— 看接口返回的列表数据神器
console.table(list)
// 只想看某几列：第二个参数传字段名数组
console.table(list, ['name', 'score'])

// ✅ 数一个函数被调用了多少次；参数是「计数器的名字」，可以有多个互不干扰
function handleClick() {
  console.count('handleClick 被调用')  // 打印：handleClick 被调用: 1 / 2 / 3 ...
}
console.countReset('handleClick 被调用')  // 需要时归零

// ✅ 测一段代码耗时；两个函数的字符串参数必须一模一样才能配对
console.time('计算总分')
const total = list.reduce((sum, item) => sum + item.score, 0)
console.timeEnd('计算总分')          // 打印：计算总分: 0.123ms

// ✅ 黄色警告 / 红色错误：自己埋的关键日志用这两个，在一屏 log 里一眼就能找到
console.warn('接口返回的数据是空的', { list })
console.error('登录失败', { status: 401 })

// ✅ 分组折叠：日志多的时候把相关的收进一组，控制台不会被刷屏
console.group('用户信息')
console.log('姓名：', user.name)
console.log('年龄：', user.age)
console.groupEnd()

// ✅ 条件断言：只有条件为 false 时才打印，适合埋「不该发生的情况」
console.assert(list.length > 0, '列表不应该为空！')

// 💡 小技巧：控制台里 $0 代表你在 Elements 面板里选中的那个 DOM 元素
// 选中一个元素后，在 Console 里敲 $0 回车，就能直接操作它，调试样式很方便`,
          },
          {
            type: 'table',
            title: '遇到什么问题，打开哪个面板（速查表）',
            intro: '这是本节最该记住的一张表。卡住时先对号入座，别在错误的面板里瞎找。',
            headers: ['你遇到的问题', '打开哪个面板', '具体看什么'],
            rows: [
              ['页面报红 / 白屏', 'Console', '第一行的错误类型和信息，堆栈里第一个带 src/ 的文件行号'],
              ['这块 UI 是哪个组件画的？', '⚛️ Components', '点左上角箭头选择器，再点页面上那块内容'],
              ['数据没传下来 / props 是 undefined', '⚛️ Components', '选中组件，看右边 props 区域的实际值'],
              ['想试试「列表为空」长什么样', '⚛️ Components', '在 hooks 区域直接双击改 State 的值，不用改代码'],
              ['state 改了但界面没变', '⚛️ Components', '看 State 到底变没变——没变就是 setState 写错了'],
              ['谁在疯狂重复渲染', '⚛️ Components 设置', '勾 Highlight updates，重渲染的区域会闪彩色边框'],
              ['点一下卡半天', '⚛️ Profiler', '录制一次操作，看 Ranked 视图第一行是谁'],
              ['一次操作触发了几十次渲染', '⚛️ Profiler', '顶部时间轴上的 commit 数量'],
              ['CSS 写了不生效', 'Elements', '右侧 Styles 里被划横线的规则，就是被谁覆盖了'],
              ['间距 / 宽高对不上', 'Elements → Computed', '底部的盒模型图，看 margin/border/padding 各占多少'],
              ['想快速调出合适的间距和颜色', 'Elements', '右侧直接改数值实时预览，满意了再抄回代码'],
              ['接口有没有发出去', 'Network → Fetch/XHR', '列表里有没有这条请求；没有就是前端逻辑没走到'],
              ['接口报错了，是谁的问题', 'Network', 'Status 状态码：404 地址错、401 没登录、500 后端崩'],
              ['我传的参数对不对', 'Network → Payload', '实际发出去的请求体和查询参数'],
              ['后端到底返回了什么', 'Network → Response / Preview', 'Preview 会把 JSON 格式化，更好读'],
              ['想测 loading 状态好不好看', 'Network', '顶部下拉框选 Slow 3G 模拟慢网'],
              ['一段复杂逻辑走到哪一步出错', 'Sources', '打断点或写 debugger，用 Scope 看所有变量的实时值'],
              ['循环里第 50 次才出错', 'Sources', '右键行号设「条件断点」，填条件表达式'],
              ['想数一个函数被调了几次', 'Console', 'console.count(\'名字\')'],
              ['想看清一堆变量的名字和值', 'Console', 'console.log({ a, b, c }) —— 加一层花括号'],
              ['看对象数组的列表数据', 'Console', 'console.table(list)'],
              ['effect / 日志执行了两次', '不用查，这是正常的', 'StrictMode 开发环境故意的，生产环境不会'],
              ['终端里 Failed to compile', '不在浏览器，看终端', '编译错误只在跑 npm start 的那个窗口里'],
            ],
          },
          {
            type: 'list',
            title: '动手练习：把上面的工具都过一遍（20 分钟）',
            ordered: true,
            intro: '光看不练等于没学。跑起来 react-demo，按顺序做完下面这些，这些工具你就真的会用了。',
            items: [
              '装好 React Developer Tools，打开 localhost:3000，确认 F12 里出现了 Components 和 Profiler 两个标签。',
              '在 Components 面板点左上角的箭头，然后点页面上的章节卡片，看看它跳到了哪个组件。',
              '选中那个组件，在右边找到它的 props，看看父组件传了什么下来。',
              '找一个有 useState 的组件（比如本页任意一个 Live Demo），在 hooks 区域直接双击改 State 的值，看页面立刻变化。',
              '打开设置勾上 Highlight updates when components render，然后随便点点页面，观察哪些区域在闪。',
              '在 Profiler 里录制一次「点击某个按钮」的操作，看 Ranked 视图里排第一的是谁。',
              '在 Elements 面板里选中一段文字，在右侧 Styles 里把它的 color 改成红色，感受实时调样式。',
              '在 Console 里敲 console.table([{a:1,b:2},{a:3,b:4}]) 回车，看看表格长什么样。',
              '打开 Network，刷新页面，找一条请求点开，把 Headers / Payload / Response 三个标签都看一遍。',
              '在任意组件的函数体第一行加一句 debugger，刷新页面，感受程序暂停后 Scope 里能看到什么。用完记得删掉。',
              '打开 src/index.js，观察 <React.StrictMode> 那一层；在某个组件的 useEffect 里加一句 console.log，确认它确实打印了两次。',
            ],
          },
          {
            type: 'text',
            title: '易错点与实用提醒',
            body: '① **DevTools 图标是灰的**——当前页面不是 React 应用，或者页面在扩展装好之前就打开了。刷新一下。\n\n② **Components 面板里组件全叫 `Anonymous`**——用了匿名箭头函数导出。给组件起个名字（`function UserCard() {}`）不仅 DevTools 好认，报错堆栈也更清楚。\n\n③ **在 Components 里改了 State，刷新就没了**——那只是临时改内存里的值，不会写回代码，本来就是用来快速试效果的。\n\n④ **Profiler 显示的耗时比生产环境慢**——开发模式有额外的检查开销。看**相对大小**（谁比谁慢）就好，不要纠结绝对毫秒数。\n\n⑤ **提交代码前删掉 `debugger` 和调试用的 `console.log`**——`debugger` 留在代码里会让所有开着 DevTools 的人卡住。ESLint 通常会警告，别忽略。\n\n⑥ **Network 里看不到请求**——先确认筛选器选的是 `All` 或 `Fetch/XHR`，另外**Network 面板必须在请求发出之前就打开**，之前发的请求不会补显示。\n\n⑦ **别在 Elements 面板里改 DOM 结构来「修 bug」**——React 会在下次渲染时把你的修改覆盖掉，而且它是从 JSX 生成的，改 DOM 没有意义。要改就改代码。\n\n⑧ **手机上怎么调试**——Chrome 的设备模式只能模拟屏幕尺寸，真机问题要用 USB 远程调试（Chrome 输入 `chrome://inspect`），iOS 用 Safari 的「开发」菜单连接。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '**Components 看组件树和 props/state（还能直接改 state 试效果），Profiler 看谁渲染慢渲染多，Elements 看 CSS 被谁覆盖，Console 用 `console.log({ 变量 })` 和 `console.table`，Network 看接口和状态码，Sources 打断点。** effect 执行两次是 StrictMode 开发环境故意的，生产不会——正确应对是老老实实写清理函数。',
          },
        ],
      },
    },
  ],
}

export default intro
