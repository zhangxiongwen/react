/**
 * 第 1 章：认识 React
 * 目标：知道 React 解决什么问题、怎么建项目、目录怎么组织
 */
const intro = {
  id: 'intro',
  title: '认识 React',
  summary: '搞清楚 React 是什么、为什么学、环境怎么搭、项目目录怎么组织',
  order: 3,
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
            body: `// ===== index.html =====
// <div id="app">
//   <span id="count">0</span>
//   <button id="add">+1</button>
//   <button id="reset">归零</button>
//   <p id="hint"></p>
// </div>

// ===== main.js =====
let count = 0

const countEl = document.getElementById('count')
const hintEl = document.getElementById('hint')

// 每次 count 变化，都要调用这个函数「手动刷新界面」
function render() {
  countEl.textContent = count
  countEl.style.color = count > 5 ? 'red' : 'black'
  hintEl.textContent = count > 5 ? '超过 5 了！' : ''
  // 如果还有列表、按钮禁用状态……这里会继续变长
}

document.getElementById('add').addEventListener('click', () => {
  count += 1
  render() // 忘写这一行？界面就不更新了
})

document.getElementById('reset').addEventListener('click', () => {
  count = 0
  render()
})

render() // 首次渲染`,
          },
          {
            type: 'text',
            title: '5）第二步：同样的功能，用 React 怎么写？',
            body: 'React 里你不再维护 render() 去改 DOM。你把 count 存进 useState（状态钩子，第 4 章细讲），return 的 JSX 直接写「界面长什么样」。count 变了，React 重新执行组件函数，自动更新 span 的颜色和文字。\n\n对比传统写法：你不需要 getElementById，不需要手动 textContent，不需要在每次点击后记得调用 render()。setCount 一调用，React 就知道要刷新界面了。\n\n下面是可以直接复制到 src/App.js 里跑的完整代码（需先 npm start）。',
          },
          {
            type: 'code',
            title: 'React 写法完整 Demo：数据驱动界面',
            language: 'jsx',
            body: `import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h2>React 计数器</h2>
      {/* 界面直接「描述」count 长什么样，不用 getElementById */}
      <span style={{ color: count > 5 ? 'red' : 'black', fontSize: 32 }}>
        {count}
      </span>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <button onClick={() => setCount(0)} style={{ marginLeft: 8 }}>
          归零
        </button>
      </div>

      {/* 条件显示：count > 5 才出现提示 */}
      {count > 5 && <p style={{ color: 'crimson' }}>超过 5 了！</p>}
    </div>
  )
}

export default Counter

// 使用方式：在 App.js 里 import Counter from './Counter'，然后 return <Counter />`,
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
function Greeting({ name }) {
  return <h1>你好，{name}</h1>  // 描述结果，不是一步步操作 DOM
}

// 【组件化】页面拆成可复用积木，像搭乐高
function App() {
  return (
    <div>
      <Greeting name="小明" />
      <Greeting name="小红" />  {/* 同一组件，不同数据 */}
      <Counter />                 {/* 上一节的计数器 */}
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
              '会一点 HTML / CSS / JavaScript：变量、函数、数组、对象、箭头函数。本教程第 0 章有 HTML 布局复习。',
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
            body: `node -v    # 应输出类似 v20.11.0
npm -v     # 应输出类似 10.2.0

# 如果两条都有版本号 → 可以继续
# 如果报错 command not found → 去 nodejs.org 安装 LTS 版，装完重启终端再试`,
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
            body: `# 1. 进入你想放项目的目录（示例：桌面）
cd ~/Desktop

# 2. 创建项目（my-app 可改成任意英文名，不要中文和空格）
npx create-react-app my-app

# 等待 1～3 分钟，看到 "Happy hacking!" 表示成功

# 3. 进入项目文件夹
cd my-app

# 4. 启动开发服务器
npm start

# 浏览器会自动打开 http://localhost:3000
# 看到旋转的 React logo 就成功了`,
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
  "name": "my-app",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}

// start  → 本地开发，热更新，端口 3000
// build  → 打包成静态文件到 build/ 文件夹，可部署到服务器
// test   → 运行测试（Jest + Testing Library）
// eject  → 弹出所有配置（不可逆！初学绝对不要用）`,
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
            body: `// ===== public/index.html（只看这一行就够）=====
// <body>
//   <div id="root"></div>   ← React 应用会渲染到这里
// </body>

// ===== src/index.js（CRA 默认入口，理解每一行）=====
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

// 1. 找到 HTML 里的 #root 节点
const root = ReactDOM.createRoot(document.getElementById('root'))

// 2. 把 <App /> 组件「渲染」进 root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// StrictMode：开发模式下帮你看潜在问题，不影响功能

// ===== src/App.js（你的第一个修改点）=====
function App() {
  return (
    <div>
      <h1>我的第一个 React 页面</h1>
      <p>把这段文字改成你自己的内容，保存，看浏览器是否自动更新。</p>
    </div>
  )
}

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
            body: `// src/index.js（react-demo 真实代码，简化注释）
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>       {/* Redux 全局状态 */}
      <BrowserRouter>              {/* 前端路由 */}
        <App />
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
            body: `react-demo/
├── public/
│   └── index.html              # 页面壳子，只有 <div id="root">
├── package.json                # 依赖和 npm 脚本
└── src/
    ├── index.js                # 入口：挂载 React + Router + Redux
    ├── App.js                  # 根组件：用 useRoutes 渲染路由表
    ├── index.css               # 全局样式、CSS 变量
    │
    ├── routes/
    │   └── index.js            # 路由表：URL 路径 ↔ 页面组件
    │
    ├── layouts/
    │   └── MainLayout.js       # 公共布局（顶栏 + 内容区）
    │
    ├── pages/                  # 「一整页」放这里
    │   ├── Home/index.js       # 首页：章节列表
    │   ├── LessonDetail/index.js  # 章节详情：知识点内容
    │   ├── AuthDemo/           # 鉴权 Demo 多页面
    │   └── JsonServerDemo/     # 请求 Demo
    │
    ├── components/             # 多个页面都会用的小组件
    │   ├── Header/             # 顶栏导航
    │   ├── CodeBlock/          # 代码高亮块
    │   ├── DocContent/         # 文档内容渲染（读 sections 数据）
    │   ├── LessonGroup/        # 章节分组卡片
    │   ├── LiveDemo/           # 可运行代码预览
    │   └── auth/               # 鉴权相关小组件
    │
    ├── data/                   # 静态数据、教程文案
    │   ├── lessons.js          # 汇总所有章节
    │   └── lessons/            # 各章节独立文件（你现在学的就在这儿）
    │       ├── 01-intro.js
    │       ├── 02-jsx.js
    │       └── ...
    │
    ├── store/                  # Redux 全局状态（进阶章节讲）
    │   ├── index.js
    │   ├── hooks.js
    │   └── slices/
    │
    └── utils/                  # 纯函数工具、常量
        ├── helpers.js
        ├── constants.js
        ├── request.js
        └── auth.js`,
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
              ['是一份不会频繁变的配置/文案/教程数据？', 'data/', 'lessons/01-intro.js'],
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
            body: `// src/pages/Home/index.js（简化示意，对照真实文件看）
import lessons from '../../data/lessons'        // 数据从 data 来
import LessonGroup from '../../components/LessonGroup'  // UI 从 components 来

function Home() {
  return (
    <div className="home">
      <h1>React 学习路线</h1>
      {lessons.map((lesson) => (
        <LessonGroup key={lesson.id} lesson={lesson} />
      ))}
    </div>
  )
}

export default Home

// 规律：page 负责「拼页面」，data 负责「有什么内容」，component 负责「怎么展示一块 UI」`,
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
              ['data 章节文件', '数字前缀 + 短横线 + 英文名', '01-intro.js、02-jsx.js', 'intro.js（排序乱）'],
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
            body: `// 1. src/index.js — 挂载应用，包一层 Router + Redux
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

// 2. src/App.js — 根据 URL 选页面
function App() {
  const element = useRoutes(routes)  // routes 来自 ./routes
  return element
}

// 3. src/routes/index.js — 路由表
const routes = [
  {
    path: '/',
    element: <MainLayout />,       // 公共布局
    children: [
      { index: true, element: <Home /> },
      { path: 'lesson/:categoryId/:itemId', element: <LessonDetail /> },
    ],
  },
]

// 4. 用户访问 /lesson/intro/what-is-react
//    → MainLayout 渲染（带 Header）
//    → LessonDetail 渲染
//    → LessonDetail 从 data/lessons 读 intro 章节内容
//    → DocContent 组件把 sections 渲染成文字/代码/提示块/表格`,
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
              '打开 src/data/lessons/01-intro.js，就是你现在看的这份教程数据。',
              '改 data/lessons/01-intro.js 里某段文字，保存，刷新详情页，感受「数据和 UI 分离」。',
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
              '在 src/data/lessons/ 里找到 01-intro.js，确认就是你现在看的这份数据。',
              '思考：如果新增一章「13-xxx.js」，需要改哪几个文件？（答案：新建 data/lessons/13-xxx.js + 在 data/lessons.js 里 import 并加入 lessons 数组）',
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
  ],
}

export default intro
