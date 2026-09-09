/**
 * 章节：React 命名与目录规范
 * 面向初学者的完整笔记：目录、命名、组件、Hook、CSS、路由、反例与速查
 */
const conventions = {
  id: 'conventions',
  title: '命名与目录规范',
  order: 14,
  summary:
    'React 项目里约定很多：文件夹怎么分、组件为什么必须大写、事件叫 handle 还是 on、CSS 怎么写 className……这一章按「为什么 → 怎么写 → 反例」讲透，让你写得整齐、别人也一眼能看懂。',
  items: [
    {
      id: 'why-conventions',
      title: '为什么要统一命名与目录？',
      summary: '规范不是语法强制，但组件大写是 React 硬规则；统一约定 = 少踩坑 + 好协作',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '命名规范大多是「团队约定」，但组件名必须大写开头是 React 硬规则。统一命名能让你一眼分清：这是页面、组件、工具函数，还是 Hook。',
          },
          {
            type: 'text',
            title: '1.1 特点：规范 ≠ 语法，但违反某些约定会直接出 Bug',
            body: 'JavaScript 本身不强制你文件夹叫 pages、函数叫 handleSubmit。但 React 有一条硬规则：组件名必须 PascalCase（大写开头），否则 React 会把它当成 HTML 标签，你的组件逻辑根本不会执行。\n\n其余约定（目录划分、事件命名、CSS 类名）大多是「团队默契」。遵守它们不是形式主义，而是让代码像一本有目录的书——新人打开项目 30 秒就能找到该改的文件。',
          },
          {
            type: 'text',
            title: '1.2 为什么：统一规范能带来什么？',
            body: '① 一眼看懂：看到 UserCard.js 知道是组件，看到 formatDate.js 知道是工具函数，看到 useAuth.js 知道是 Hook。\n\n② 少踩坑：组件写成小写 → 页面空白；列表 key 用数组下标 → 排序后状态错乱；全局 CSS 叫 .title → 全站样式互相覆盖。\n\n③ 好找文件：一页一文件夹，相关 css、子组件、常量聚在同一目录，改需求不用满项目搜索。\n\n④ 协作省事：你和同事不用猜「这个文件到底该放哪」「这个 prop 叫 onClose 还是 handleClose」。',
          },
          {
            type: 'list',
            title: '1.3 怎么写：拿到一个新文件，先问自己四个问题',
            ordered: true,
            intro: '放文件之前，用下面四问决定目录和命名。答完再动手写，比写完再搬文件省事得多。',
            items: [
              '这是「一整屏页面」还是「可复用的小 UI 块」？→ 页面进 pages/，小组件进 components/',
              '这是「多个页面共用的壳（顶栏 + 内容区）」吗？→ 进 layouts/',
              '这里面会调用 useState / useEffect 等 Hook 吗？→ 抽成 hooks/useXxx.js',
              '这是纯逻辑、和界面无关的函数吗？→ 进 utils/，文件名 camelCase',
            ],
          },
          {
            type: 'table',
            title: '1.4 反例：不遵守约定时常见后果',
            headers: ['反例行为', '表面现象', '根本原因', '正确方向'],
            rows: [
              ['function button() 小写组件', '页面上按钮区域空白', 'React 当成 HTML 标签 <button>，不执行你的函数', 'function Button() 大写开头'],
              ['pages 里有的用文件夹、有的单文件', '新人不知道 Home 在哪', '风格不统一，导入路径混乱', '全项目统一：一页一文件夹 或 全用单文件'],
              ['所有 .js 都堆在 components/', '找不到页面入口', '页面组件和按钮组件混在一起', 'pages/ 放页面，components/ 放可复用 UI'],
              ['CSS 全局写 .title、.box', '改 A 页标题，B 页也变了', '类名太通用，全局污染', '加前缀 user-card__title 或用 CSS Modules'],
            ],
          },
          {
            type: 'text',
            title: '1.5 本章阅读顺序',
            body: '文件夹怎么分 → 一个页面怎么组织 → 组件必须大写 → 文件名对照表 → 变量/函数/布尔/事件 → props 与 children → Hook 命名 → CSS className → export/import → 路由 path → 其它约定（key、ref、Context…）→ 反例汇总 → 速查表。\n\n建议：每读完一节，打开本仓库 src/ 目录对照看一眼，比纯看文字记得牢。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '规范让代码「可读、可找、可协作」；组件大写是硬规则，其余约定全项目统一比「哪种更好」更重要。',
          },
        ],
      },
    },
    {
      id: 'folder-structure',
      title: '常见目录怎么分？（pages / components / hooks…）',
      summary: '先问「这是什么类型的代码」，再决定进哪个文件夹；附决策对照表',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '目录 = 代码的「分类标签」。pages 放整页，components 放可复用 UI，hooks 放 useXxx，utils 放纯函数——先分类，再写代码。',
          },
          {
            type: 'text',
            title: '2.1 特点：中小型 React 项目常见 src/ 结构',
            body: '下面这套结构在国内 React 项目（CRA、Vite、Next.js 等）里非常常见。本学习仓库 react-demo 也采用类似划分。注意：不是「必须一模一样」，而是「每个目录职责清晰、全项目统一」。',
          },
          {
            type: 'code',
            title: '2.2 标准目录树（对照本仓库打开看）',
            language: 'text',
            body: `src/                              # 源代码根目录，React 项目主要在这里写代码
  pages/          # 页面：和路由 URL 一一对应的一整屏界面
  components/     # 可复用 UI：按钮、卡片、代码块、文档渲染器…（多页共用）
  layouts/        # 布局壳：顶栏 + 侧栏 + <Outlet /> 中间内容区
  routes/         # 路由配置：定义 path 字符串对应哪个页面组件
  hooks/          # 自定义 Hook：必须以 use 开头，封装可复用的 state 逻辑
  utils/          # 纯工具函数：和 UI 无关，不能写 JSX，不能调 Hook
  store/          # 全局状态：Redux store、slice 等（多页共享的数据）
  data/           # 静态数据：课程配置、mock 数据、不会频繁变的文案
  assets/         # 静态资源：图片、字体、图标（import 后由打包工具处理）
  App.js          # 根组件：通常包 Router，用 useRoutes 渲染当前页面
  index.js        # 入口：ReactDOM.createRoot(...).render(<App />)`,
          },
          {
            type: 'table',
            title: '2.3 为什么：各目录放什么、不放什么',
            headers: ['目录', '放什么（✅）', '不放什么（❌）', '典型例子'],
            rows: [
              ['pages/', '和路由一一对应的完整页面', '到处复用的小按钮、通用 Modal', 'Home/、LessonDetail/、DemoAuth/LoginPage.js'],
              ['components/', '可在多个页面复用的 UI 块', '只服务某一页的整页业务逻辑', 'Button.js、CodeBlock.js、DocContent/'],
              ['layouts/', '多页共用的外壳（Header + Outlet）', '某一页独有的正文内容', 'MainLayout.js、AuthLayout.js'],
              ['hooks/', '以 use 开头的自定义 Hook', '普通工具函数、组件', 'useAuth.js、useDebounce.js'],
              ['utils/', '与 UI 无关的纯 JavaScript 函数', '带 JSX 的 React 组件', 'request.js、formatDate.js、auth.js'],
              ['routes/', '路由表、懒加载配置', '页面 UI 本身', 'index.js 里 export routes 数组'],
              ['store/', 'Redux store、slice、action', '组件内部的 useState', 'store/index.js、userSlice.js'],
              ['data/', '静态 JSON、课程列表、常量配置', '运行时才会变的业务数据', 'lessons/、routes.js'],
            ],
          },
          {
            type: 'table',
            title: '2.4 怎么写：「我该把这个文件放哪？」决策表',
            headers: ['你的代码是…', '放进…', '文件名风格', '导入示例'],
            rows: [
              ['一整屏页面，对应一个 URL', 'pages/Xxx/', 'PascalCase 文件夹 + index.js', "import Home from '../pages/Home'"],
              ['多个页面都会用的按钮/卡片', 'components/', 'PascalCase.js', "import Button from '../components/Button'"],
              ['顶栏 + 侧边栏 + 内容区壳子', 'layouts/', 'PascalCase.js', "import MainLayout from '../layouts/MainLayout'"],
              ['封装 useState + useEffect 的逻辑', 'hooks/', 'use + PascalCase.js', "import { useAuth } from '../hooks/useAuth'"],
              ['格式化日期、发 HTTP 请求', 'utils/', 'camelCase.js', "import { formatDate } from '../utils/date'"],
              ['全站共享的用户登录状态', 'store/', 'camelCase + Slice', "import { useSelector } from 'react-redux'"],
              ['路由 path 与 element 映射', 'routes/', 'index.js 或 routes.js', "import routes from '../routes'"],
              ['课程列表、菜单配置等静态数据', 'data/', 'camelCase.js', "import lessons from '../data/lessons'"],
            ],
          },
          {
            type: 'list',
            title: '2.5 反例：目录使用中的常见错误',
            ordered: false,
            items: [
              '❌ 把 LoginPage 和 Button 都放 components/ → 分不清「页面入口」和「小组件」',
              '❌ 在 utils/request.js 里写 return <Loading /> → 带 JSX 的应该是组件或 Hook，不是 util',
              '❌ hooks/ 里放 getToken() 普通函数 → 没有 use 前缀，不能在里面调 Hook',
              '❌ 每个页面各自 copy 一份请求逻辑 → 应抽到 utils/ 或 hooks/ 复用',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '整页 → pages；复用 UI → components；共用壳 → layouts；use 开头逻辑 → hooks；纯函数 → utils。',
          },
        ],
      },
    },
    {
      id: 'page-folder',
      title: '一个页面 = 一个文件夹（index.js + CSS）',
      summary: 'pages/Home/index.js + index.css；导入路径短、相关文件聚在一起',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '商业项目常见写法：每个页面对应一个 PascalCase 文件夹，入口叫 index.js，样式放同目录。外面 import 时只写到文件夹名，路径更干净。',
          },
          {
            type: 'text',
            title: '3.1 特点：页面文件夹里通常有什么？',
            body: '一个「页面」在 React 里就是一个组件，但它往往比 Button 复杂得多：有自己的布局、私有样式、子组件、常量、甚至专属 Hook。\n\n用文件夹把这一切包在一起，就像给这一页建了一个「专属抽屉」——改 Home 页不会误翻到 LessonDetail 的文件。',
          },
          {
            type: 'code',
            title: '3.2 怎么写：推荐目录结构示例',
            language: 'text',
            body: `pages/                          # 所有「整页」组件放这里
  Home/                           # 一个页面 = 一个 PascalCase 文件夹
    index.js          # 页面主组件：export default function Home() { ... }
    index.css         # 只给 Home 页用的样式，在 index.js 里 import './index.css'
    Banner.js         # （可选）只有 Home 页会用的私有子组件，不放到全局 components/
    constants.js      # （可选）Home 页专用常量，如默认分页大小
  LessonDetail/                   # 另一个页面，同样一页一文件夹
    index.js
    index.css
  DemoAuth/                       # 同一业务模块下多个相关页面，可以共用一个文件夹
    LoginPage.js      # 登录页组件
    ProfilePage.js    # 个人资料页
    auth.css          # DemoAuth 模块内多个页面共用的样式`,
          },
          {
            type: 'text',
            title: '3.3 为什么：用「文件夹 + index.js」的三大好处',
            body: '① 导入路径简洁：写 import Home from \'../pages/Home\' 即可，不用写 ../pages/Home/Home.js。因为 Node / Webpack 会自动找文件夹里的 index.js。\n\n② 相关文件聚合：css、子组件、常量、测试文件都能塞进同一文件夹，改需求时只打开一个目录。\n\n③ 名字即文档：文件夹名 Home（PascalCase）和组件名 Home 一致，新人看路径就知道这是哪个页面。',
          },
          {
            type: 'table',
            title: '3.4 三种组织方式对比（团队选一种，全项目统一）',
            headers: ['方式', '结构', '适合场景', '导入写法'],
            rows: [
              ['✅ 推荐：文件夹 + index.js', 'pages/Home/index.js + index.css', '中等以上复杂度页面', "import Home from '../pages/Home'"],
              ['✅ 可以：单文件页面', 'pages/Home.js + Home.css', '极简页面、学习/demo 项目', "import Home from '../pages/Home'"],
              ['✅ 可以：业务模块文件夹', 'pages/DemoAuth/LoginPage.js', '同一模块多个相关页面', "import LoginPage from '../pages/DemoAuth/LoginPage'"],
              ['❌ 避免：混用以上三种', '有的 Home/ 文件夹，有的 About.js 单文件', '——', '新人无法预测文件在哪'],
            ],
          },
          {
            type: 'text',
            title: '3.5 样式文件命名：index.css 还是 Home.css？',
            body: '两种都常见，团队统一即可：\n\n• index.css：和 index.js 配对，页面里写 import \'./index.css\'。好处是「入口文件和入口样式同名」，打开文件夹一眼配对。\n\n• Home.css：和页面组件名同名，写 import \'./Home.css\'。好处是样式文件名直接体现页面名，多个 js 文件共用 css 时更清晰。\n\n本仓库两种都会见到。重点不是选哪种，而是「页面私有样式跟页面放一起，不要散落到全局 styles/ 除非确实全站共用」。',
          },
          {
            type: 'code',
            title: '3.6 反例 vs 正例：页面组织',
            language: 'jsx',
            body: `// ❌ 反例：整页组件和可复用小组件混放在 components/ 里
// components/HomePage.js        ← HomePage 是一整屏，应该放 pages/Home/
// components/HomePage.css
// components/UserCard.js        ← UserCard 才是可复用 UI，适合放 components/

// ✅ 正例：页面进 pages/，可复用 UI 进 components/
// pages/Home/index.js
import './index.css'   // 引入同目录样式；相对路径 ./ 表示当前文件夹
// 从 components 引入可复用卡片，../../ 向上两级到 src 再进 components
import UserCard from '../../components/UserCard'

// export default：页面组件通常默认导出，路由里 import Home from '../pages/Home'
export default function Home() {
  return (
    // className 挂 CSS 类名（JSX 里不能写 class）
    <div className="home-page">
      <h1>首页</h1>
      {/* 传 prop：name="小明" 会作为 props.name 传给 UserCard */}
      <UserCard name="小明" />
    </div>
  )
}`,
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '一页一文件夹，index.js 当入口，css 放旁边；import 只写到文件夹名，相关文件不散落。',
          },
        ],
      },
    },
    {
      id: 'component-naming',
      title: '组件必须大写开头 + 必须 return 可渲染内容（硬规则）',
      summary: 'PascalCase 是 React 识别组件的开关；小写 = 被当成 HTML 标签',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '组件名必须 PascalCase（UserCard、MainLayout）。这是 React 硬规则：小写开头会被当成原生 HTML 标签，你的组件函数根本不会被调用。',
          },
          {
            type: 'text',
            title: '4.1 特点：React 怎么区分「你的组件」和「HTML 标签」？',
            body: 'React 编译 JSX 时有一条简单规则：<div> 是小写 → 原生 HTML；<UserCard> 是大写开头 → 去调你定义的 UserCard 函数。\n\n这不是 ESLint 偏好，不是 TypeScript 要求，是 React 核心机制。违反它，页面不会报错崩溃，但会「静默失败」——你写的组件逻辑完全不执行，初学者最容易在这里卡半天。',
          },
          {
            type: 'code',
            title: '4.2 反例 vs 正例：组件命名（复制对照）',
            language: 'jsx',
            body: `// ❌ 反例：组件函数名小写开头 —— React 会当成 HTML 标签，不会执行你的函数
function userCard({ name }) {
  return <div className="user-card">{name}</div>
}
// 在 JSX 里写 <userCard name="Tom" /> 时：
// → 浏览器会渲染一个空的自定义 HTML 标签 <usercard>（小写）
// → userCard 函数根本不会被调用，页面可能是空白，且控制台常常不报错

// ✅ 正例：PascalCase 大写开头 —— React 识别为「自定义组件」
function UserCard({ name }) {
  // { name } 是解构 props；className 是 JSX 里的 CSS 类名属性
  return <div className="user-card">{name}</div>
}
// 写 <UserCard name="Tom" /> 时：
// → React 调用 UserCard 函数，传入 { name: 'Tom' }，正常渲染

// ✅ 文件名最好和组件名一致，方便查找
// 文件路径：components/UserCard.js
export default function UserCard({ name }) {
  return <div className="user-card">{name}</div>
}`,
          },
          {
            type: 'text',
            title: '4.3 为什么：组件还必须 return「能渲染的东西」？',
            body: '函数组件的本质是：React 调用你的函数，拿到返回值，把它变成 DOM。\n\n如果忘记 return，函数默认返回 undefined，React 无法渲染任何东西 → 页面空白，控制台可能出现 warning。\n\n合法返回值包括：JSX 元素、字符串、数字、null（故意不渲染）、Fragment（<>...</>）、数组（多个并列元素，每个需 key）。',
          },
          {
            type: 'code',
            title: '4.4 怎么写：return 的各种合法写法',
            language: 'jsx',
            body: `// ✅ 最常见：return 一段 JSX，React 把它变成 DOM
function Hello() {
  return <h1>你好</h1>
}

// ✅ return null：故意什么都不渲染（比如没权限、数据为空时）
function Empty({ visible }) {
  // 条件不满足时提前 return null，下面代码不会执行
  if (!visible) return null
  return <p>可见内容</p>
}

// ✅ Fragment（<>...</>）：多个并列元素包在一起，DOM 里不会多出一个 div
function TitleAndDesc() {
  return (
    <>
      <h2>标题</h2>
      <p>描述</p>
    </>
  )
}

// ✅ 返回字符串或数字也合法（少见，多用于简单文本节点）
function PlainText() {
  return '纯文字'
}

// ❌ 反例：函数没有 return，默认返回 undefined，React 无法渲染 → 页面空白
function Broken() {
  const title = '你好'
  // 只定义了变量，忘记 return JSX → 组件什么都不显示
}`,
          },
          {
            type: 'table',
            title: '4.5 组件命名与文件对照',
            headers: ['对象', '命名规则', '示例', '常见错误'],
            rows: [
              ['组件函数名', 'PascalCase', 'function UserCard()', 'function userCard() ❌'],
              ['组件文件名', 'PascalCase（国内常见）', 'UserCard.js', 'user-card.js（可以但组件名仍要大写）'],
              ['复杂组件', '文件夹 + index.js', 'DocContent/index.js', 'doc-content/index.js ❌ 文件夹也建议 PascalCase'],
              ['使用组件', 'JSX 里 PascalCase', '<UserCard name="Tom" />', '<userCard /> ❌'],
            ],
          },
          {
            type: 'list',
            title: '4.6 自检清单：写完后快速过一遍',
            ordered: true,
            items: [
              '组件函数名是否 PascalCase 大写开头？',
              '文件名是否和组件名一致（或文件夹名一致）？',
              '是否有 return，且 return 的不是 undefined？',
              'JSX 里使用时是否 <UserCard /> 而不是 <userCard />？',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '组件大写是 React 开关；忘记 return 页面就空白。文件名、函数名、JSX 用法三处保持一致。',
          },
        ],
      },
    },
    {
      id: 'file-naming',
      title: '文件名怎么写？（对照表）',
      summary: '组件 PascalCase、工具 camelCase、Hook useXxx、测试 *.test.js',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '看文件名猜类型：大写开头多半是组件，use 开头是 Hook，小写开头多半是工具或配置。全项目统一比纠结「哪种最正确」重要。',
          },
          {
            type: 'table',
            title: '5.1 文件命名完整对照表',
            headers: ['文件类型', '推荐命名', '示例', '说明'],
            rows: [
              ['React 组件', 'PascalCase.js', 'UserCard.js、MainLayout.js', '文件名 ≈ 组件名，打开即知'],
              ['页面文件夹', 'PascalCase/', 'pages/Home/、pages/LessonDetail/', '文件夹名 = 页面组件名'],
              ['工具 / 配置', 'camelCase.js', 'request.js、formatDate.js、auth.js', '动词或名词短语，小写开头'],
              ['自定义 Hook', 'use + PascalCase.js', 'useAuth.js、useLocalStorage.js', '必须以 use 开头'],
              ['样式文件', '同名或 index.css', 'UserCard.css、index.css', '跟组件或 index.js 配对'],
              ['CSS Modules', '*.module.css', 'UserCard.module.css', 'import styles from \'./UserCard.module.css\''],
              ['测试文件', '*.test.js / *.spec.js', 'UserCard.test.js', '和被测文件同目录或 __tests__ 旁'],
              ['常量 / 静态数据', 'camelCase 或复数', 'lessons.js、routes.js', 'data/ 目录下常见'],
              ['Redux slice', 'camelCase + Slice', 'userSlice.js、cartSlice.js', 'store/ 目录下'],
            ],
          },
          {
            type: 'text',
            title: '5.2 为什么：文件名是「第一眼文档」',
            body: '在 IDE 文件树里，你还没打开文件，文件名就已经传达了类型信息。\n\nUserCard.js → 组件；formatDate.js → 工具；useAuth.js → Hook；Home/index.js → 页面入口。\n\n如果团队有人用 UserCard.js、有人用 user-card.js、有人用 userCard.js，光找文件就要猜三次。统一命名 = 减少认知负担。',
          },
          {
            type: 'text',
            title: '5.3 怎么写：扩展名选择',
            body: '普通 JavaScript 项目（CRA、Vite + JS）：组件和逻辑都用 .js。\n\nTypeScript 项目：含 JSX 的文件用 .tsx（如 UserCard.tsx）；纯逻辑无 JSX 用 .ts（如 formatDate.ts）。\n\n本仓库是 .js 项目，所以你会看到 components/CodeBlock/index.js 这类路径。',
          },
          {
            type: 'table',
            title: '5.4 反例：模糊文件名 vs 清晰文件名',
            headers: ['❌ 模糊命名', '问题', '✅ 清晰命名'],
            rows: [
              ['data.js', '不知道装什么数据', 'lessons.js、userProfile.js'],
              ['temp.js / new.js / copy.js', '临时文件容易进仓库', '按业务含义命名或删掉'],
              ['utils.js', '一个文件塞所有工具，膨胀后难维护', '按领域拆分：date.js、request.js、storage.js'],
              ['index.js（在非页面/组件入口位置）', '多个 index.js 难以搜索区分', '只在「文件夹入口」使用 index.js'],
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '组件 PascalCase、Hook use 开头、工具 camelCase、页面文件夹 PascalCase——见名知义。',
          },
        ],
      },
    },
    {
      id: 'js-identifiers',
      title: '变量、函数、布尔、常量、事件命名',
      summary: 'camelCase 为主；布尔 is/has/can；事件 handleXxx 对内、onXxx 对外',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '变量和函数用 camelCase；布尔用 is/has/can 开头；组件内部写 handleSubmit，传给子组件的 prop 叫 onSubmit。',
          },
          {
            type: 'table',
            title: '6.1 标识符命名对照表',
            headers: ['类型', '规则', '✅ 正例', '❌ 反例'],
            rows: [
              ['普通变量', 'camelCase', 'userName、pageSize、activeTab', 'user_name、PageSize'],
              ['普通函数', 'camelCase + 动词开头', 'getUserList、formatPrice、validateForm', 'userlist、data'],
              ['布尔变量', 'is / has / can / should 前缀', 'isLoading、hasError、canSubmit', 'flag、status、ok'],
              ['真正常量', 'UPPER_SNAKE_CASE', 'MAX_PAGE_SIZE、API_BASE_URL', 'maxPageSize（若真是不可变常量）'],
              ['组件内事件处理', 'handle + 事件名', 'handleSubmit、handleClick、handleClose', 'submit、clickHandler'],
              ['传给子组件的回调 prop', 'on + 事件名', 'onSubmit、onClose、onChange', 'submitHandler、closeFn'],
            ],
          },
          {
            type: 'text',
            title: '6.2 为什么：布尔变量必须「读起来像判断句」',
            body: '看到 isLoading，你立刻知道它是 true/false，且含义是「是否正在加载」。\n\n看到 flag 或 status，你必须往上翻十几行代码才能猜它表示什么。在条件渲染里 {isLoading && <Spinner />} 比 {flag && <Spinner />} 可读性高一个数量级。\n\n常见前缀：is（状态）、has（是否拥有）、can（是否允许）、should（是否应该）。',
          },
          {
            type: 'code',
            title: '6.3 怎么写：handleXxx 与 onXxx 的配合（完整示例）',
            language: 'jsx',
            body: `// 命名约定：onXxx = 父组件传进来的回调（对外接口）；handleXxx = 组件内部真正执行的函数
// 需要从 react 导入 useState（此处省略 import 行，实际文件里要写上）

function LoginForm({ onSuccess, onError }) {
  // useState(false)：布尔状态，isLoading 表示是否正在提交
  const [isLoading, setIsLoading] = useState(false)
  // hasError：是否显示错误提示，布尔变量用 is/has 前缀更易读
  const [hasError, setHasError] = useState(false)

  // handleSubmit：组件内部事件处理函数，handle + 事件名
  async function handleSubmit(e) {
    e.preventDefault()        // 阻止表单默认刷新页面行为
    setIsLoading(true)        // 开始提交，按钮显示「提交中…」
    setHasError(false)
    try {
      await loginApi()        // 调用登录接口（示意）
      onSuccess()             // 成功后通知父组件，由父组件决定跳转等
    } catch {
      setHasError(true)       // 失败时显示错误
      onError?.()             // ?. 可选链：父组件没传 onError 也不报错
    } finally {
      setIsLoading(false)     // 无论成功失败，都要结束 loading 状态
    }
  }

  return (
    // onSubmit 绑定的必须是函数引用，不是字符串 "handleSubmit()"
    <form onSubmit={handleSubmit}>
      {/* hasError 为 true 时才渲染错误提示（&& 短路） */}
      {hasError && <p className="error">登录失败</p>}
      {/* disabled={isLoading}：提交中禁用按钮，防止重复点击 */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? '提交中…' : '登录'}
      </button>
    </form>
  )
}

// 父组件：把 handle 函数通过 onXxx prop 传给子组件
function LoginPage() {
  function handleLoginSuccess() {
    navigate('/profile')   // 登录成功后跳转到个人页（navigate 来自 React Router）
  }

  // onSuccess={handleLoginSuccess}：prop 名 on 开头，值是父组件的 handle 函数
  return <LoginForm onSuccess={handleLoginSuccess} />
}`,
          },
          {
            type: 'text',
            title: '6.4 常量：什么时候用 UPPER_SNAKE_CASE？',
            body: '只有「真正不会变的值」才用大写下划线：API 根地址、分页上限、枚举值。\n\n如果值会随配置或运行时变化（比如从接口拿到的 pageSize），就用普通 camelCase 变量，不要叫 MAX_PAGE_SIZE。\n\nmodule 顶层的 const API_BASE = \'/api\' 是常量；组件里的 const [count, setCount] = useState(0) 是 state，不是常量。',
          },
          {
            type: 'list',
            title: '6.5 反例：命名模糊导致的阅读痛苦',
            ordered: false,
            items: [
              '❌ const data = ... → 改成 userList、lessonItems 等有业务含义的名字',
              '❌ const flag = true → 改成 isVisible、isChecked',
              '❌ function click() {} 作为按钮处理 → 改成 handleClick',
              '❌ <Modal close={fn} /> → 改成 onClose={handleClose}，和原生 onClick 风格一致',
              '❌ 父组件传 onSubmit，子组件内部也叫 onSubmit → 内部应叫 handleSubmit，避免和 prop 同名混淆',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'on 对外、handle 对内；布尔像 isLoading 这样一读就懂；常量才全大写。',
          },
        ],
      },
    },
    {
      id: 'props-children',
      title: 'Props 与 children 命名',
      summary: 'props 用 camelCase；嵌套内容用 children；布尔可简写',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'props 是组件的「参数」，用 camelCase；标签包裹的内容自动变成 children；布尔 prop 传 true 时可写 isActive 代替 isActive={true}。',
          },
          {
            type: 'text',
            title: '7.1 特点：props 是什么？',
            body: 'props（properties 的缩写）是父组件传给子组件的数据，类似函数的参数。\n\n子组件不应该直接修改 props（只读）。需要改的话，由父组件通过 callback（如 onChange）通知父组件去改 state。\n\n命名风格和 JavaScript 变量一致：camelCase，见名知义，避免 a、b、data1 这种。',
          },
          {
            type: 'code',
            title: '7.2 怎么写：清晰的 props + children 完整示例',
            language: 'jsx',
            body: `// Card 组件：通过解构 props 拿到 title、isActive、onClose、children
function Card({ title, isActive, onClose, children }) {
  return (
    // 三元运算符：根据 isActive 切换不同的 CSS 类名
    <div className={isActive ? 'card card--active' : 'card'}>
      <div className="card__header">
        <h3>{title}</h3>
        {/* type="button" 防止在 form 里误触提交；aria-label 给读屏软件用 */}
        <button type="button" onClick={onClose} aria-label="关闭">
          ×
        </button>
      </div>
      {/* children：标签 <Card>...</Card> 中间的内容会自动传到这里 */}
      <div className="card__body">{children}</div>
    </div>
  )
}

// 父组件使用 Card 的完整示例
function App() {
  // useState(true)：控制卡片是否高亮/打开
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Card
      title="用户信息"              // 普通 prop：字符串
      isActive={isOpen}             // 布尔 prop：完整写法 isActive={true/false}
      onClose={() => setIsOpen(false)}  // 回调 prop：点击关闭时把 isOpen 设为 false
    >
      {/* 下面两行是 children，会显示在 Card 的 body 区域 */}
      <p>姓名：张三</p>
      <p>邮箱：zhang@example.com</p>
    </Card>
  )
}

// 布尔 prop 简写：下面两种写法完全等价（仅当值为 true 时）
<Card isActive={true} />   // 完整写法
<Card isActive />          // 简写：省略 ={true}`,
          },
          {
            type: 'table',
            title: '7.3 props 命名对照',
            headers: ['prop 类型', '命名风格', '示例', '注意'],
            rows: [
              ['普通数据', 'camelCase 名词', 'userName、items、count', '名字体现业务含义'],
              ['布尔状态', 'is / has / can 前缀', 'isOpen、isDisabled、hasIcon', '可读成判断句'],
              ['回调函数', 'on + 动词/事件', 'onClick、onSubmit、onClose', '和 handleXxx 对内呼应'],
              ['嵌套内容', '固定叫 children', 'children', '不要用 content、body 代替除非有特殊理由'],
              ['组件类型 prop', '名词或 render 前缀', 'icon、renderFooter', 'renderXxx 表示「渲染函数」'],
            ],
          },
          {
            type: 'text',
            title: '7.4 为什么：children 是 React 的特殊 prop',
            body: '当你写 <Card>这里是内容</Card>，React 自动把「这里是内容」作为 props.children 传给 Card。\n\n你不需要（也不应该）写 <Card children={...} />，除非在某些高级场景（比如动态传递）。\n\nchildren 可以是：文本、元素、多个元素、甚至 null。Layout 组件最常用 children：外面传什么，中间内容区就显示什么。',
          },
          {
            type: 'code',
            title: '7.5 反例 vs 正例',
            language: 'jsx',
            body: `// ❌ 反例：props 名字太短（d、fn、x），读代码的人完全猜不出含义
function Box({ d, fn, x }) {
  return <div onClick={fn}>{d}</div>
}

// ✅ 正例：props 用有业务含义的 camelCase 名字
function Alert({ message, variant, onDismiss }) {
  return (
    // 模板字符串拼接 className；\${variant} 在真实代码里是 \${variant}，这里演示 BEM 修饰符
    <div className={\`alert alert--\${variant}\`}>
      {message}
      <button type="button" onClick={onDismiss}>关闭</button>
    </div>
  )
}

// ❌ 反例：子组件直接依赖父组件的 setCount 改数据（违反单向数据流）
function BadCounter({ count, setCount }) {
  // 子组件不应该「拥有」修改 count 的权力，除非父组件明确传入 setter
  return <button onClick={() => setCount(count + 1)}>+</button>
}

// ✅ 正例：子组件只负责 UI，通过 onIncrement 通知父组件去改 state
function GoodCounter({ count, onIncrement }) {
  // 点击时调用父组件传来的函数，由父组件决定 count 怎么变
  return <button onClick={onIncrement}>{count}</button>
}`,
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'props camelCase、回调 onXxx、标签间内容即 children；props 只读，要改让父组件改 state。',
          },
        ],
      },
    },
    {
      id: 'hooks-naming',
      title: 'Hook 命名：必须以 use 开头',
      summary: 'useAuth、useLocalStorage；缺 use 就不算 Hook，不能随便调其它 Hook',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '自定义 Hook 必须以 use 开头。React 和 ESLint 靠这个前缀判断「这个函数里能不能调用其它 Hook」。',
          },
          {
            type: 'text',
            title: '8.1 特点：Hook 是什么？',
            body: 'Hook 是 React 16.8 引入的机制，让你在函数组件里使用 state、副作用等能力（useState、useEffect…）。\n\n你也可以把「可复用的 stateful 逻辑」抽成自定义 Hook，比如 useAuth（登录状态）、useDebounce（防抖输入）。\n\n自定义 Hook 不是魔法，就是一个普通 JavaScript 函数——但名字必须以 use 开头，这是 React 官方硬规则。',
          },
          {
            type: 'code',
            title: '8.2 怎么写 vs 反例',
            language: 'javascript',
            body: `// ✅ 正例：自定义 Hook 必须以 use 开头，内部可以调用其它 Hook
function useAuth() {
  // 用 useState 存当前用户；null 表示未登录
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // useEffect：组件挂载后执行副作用（如发请求）；[] 表示只执行一次
  useEffect(() => {
    fetchCurrentUser()
      .then(setUser)           // 请求成功，把用户数据写入 state
      .finally(() => setIsLoading(false))  // 无论成败，结束 loading
  }, [])

  // 返回对象：组件里 const { user, isLoggedIn } = useAuth() 解构使用
  return { user, isLoading, isLoggedIn: !!user }  // !!user 把值转成布尔
}

// ✅ 文件名和 Hook 名一致：hooks/useAuth.js

// ❌ 反例：没有 use 前缀 —— React 不认为这是 Hook，ESLint 会报错
function auth() {
  const [user, setUser] = useState(null) // 规则：Hook 只能在组件或其它 Hook 顶层调用
  return user
}

// ❌ 反例：名字像普通工具函数，却里面调了 Hook —— 命名误导
function getLocalStorage(key) {
  const [value, setValue] = useState(key)
  return value
}

// ✅ 正确做法：需要 Hook 就命名 useLocalStorage，并放 hooks/ 目录
function useLocalStorage(key, initialValue) {
  // 惰性初始化：只在首次渲染时读 localStorage
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })
  // ... 省略：value 变化时写回 localStorage 的逻辑
  return [value, setValue]   // 返回方式和 useState 类似，方便使用
}`,
          },
          {
            type: 'table',
            title: '8.3 Hook vs 普通函数：放哪、怎么命名',
            headers: ['特征', '自定义 Hook', '普通工具函数'],
            rows: [
              ['命名', 'useAuth、useDebounce', 'formatDate、getToken'],
              ['能否调用 useState 等', '✅ 可以', '❌ 不可以'],
              ['存放目录', 'hooks/', 'utils/'],
              ['返回值', '常返回 state + 操作函数', '返回计算结果'],
              ['使用方式', '在组件或 Hook 顶层调用', '任意地方调用'],
            ],
          },
          {
            type: 'list',
            title: '8.4 Hook 使用硬规则（和命名相关）',
            ordered: true,
            intro: '命名只是入口，下面这些规则同样必须遵守：',
            items: [
              '只在函数组件或其它 Hook 的顶层调用 Hook，不要在 if/for/嵌套函数里调用',
              '自定义 Hook 名字 use + 大写开头：useAuth ✅，useauth ❌，auth ❌',
              '文件名建议与 Hook 名一致：useAuth.js 导出 useAuth',
              '一个 Hook 专注一件事：useAuth 管登录，useCart 管购物车，不要 useEverything',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '带 use 的是 Hook，进 hooks/ 目录；不带 use 的是普通函数，别在里面调 useState。',
          },
        ],
      },
    },
    {
      id: 'css-class-naming',
      title: 'CSS：className、kebab-case、BEM、Modules',
      summary: 'JSX 里写 className 不是 class；类名用短横线；Modules 防冲突',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'JSX 属性叫 className（因为 class 是 JS 保留字）；CSS 类名多用 kebab-case；想避免全局冲突用 CSS Modules 或 BEM 前缀。',
          },
          {
            type: 'text',
            title: '9.1 特点：JSX 里为什么不是 class？',
            body: 'HTML 里写 class="box"，但 JSX 本质是 JavaScript，class 在 JS 里是定义类的保留字（ES6 class MyComponent {}）。\n\n所以 React 用 className 代替 class。写 class="box" 在 JSX 里会报警或无效。\n\n同理：for 属性在 JSX 里叫 htmlFor（<label htmlFor="email">）。',
          },
          {
            type: 'code',
            title: '9.2 怎么写：className 的几种常见写法',
            language: 'jsx',
            body: `// ✅ 单个静态类名：CSS 里定义 .user-card，这里用 className 挂上
<div className="user-card">

// ✅ 动态类名：根据 isActive 切换多个类，用三元运算符拼接字符串
<div className={isActive ? 'user-card user-card--active' : 'user-card'}>

// ✅ BEM 命名：块__元素--修饰符，结构清晰，减少全局样式冲突
<article className="user-card">
  <h2 className="user-card__title">标题</h2>
  <p className="user-card__desc user-card__desc--muted">描述</p>
</article>

// ✅ CSS Modules：import 后 styles.card 会变成带哈希的唯一类名
import styles from './UserCard.module.css'
<div className={styles.card}>

// ❌ 反例汇总
<div class="user-card">           // JSX 里不能用 class，必须用 className
<div className="UserCard">        // CSS 类名习惯用小写短横线，不用 PascalCase
<div className="box">             // 太通用，全局 CSS 里 .box 很容易互相覆盖`,
          },
          {
            type: 'table',
            title: '9.3 三种 CSS 策略对比',
            headers: ['策略', '写法', '优点', '缺点', '适用'],
            rows: [
              ['全局 CSS + kebab-case', 'user-card、main-header', '简单、学习成本低', '类名冲突风险', '小项目、页面私有 css'],
              ['BEM 命名', 'block__element--modifier', '结构清晰、减少冲突', '类名较长', '中大型项目全局 CSS'],
              ['CSS Modules', 'styles.card（编译后唯一）', '局部作用域、几乎不冲突', '多一个 import；动态类名稍繁琐', '组件库、中大型项目'],
            ],
          },
          {
            type: 'text',
            title: '9.4 为什么：组件名和 class 名可以不一样？',
            body: 'React 组件名用 PascalCase：UserCard（JS 标识符规则 + React 约定）。\n\nCSS 类名传统上用 kebab-case：user-card（CSS 社区习惯，和 HTML class 一致）。\n\n对应关系：组件 UserCard 的根元素 className 常写 "user-card" 或 styles.card（Modules）。\n\n页面私有样式（pages/Home/index.css）只在该页 import，即使用 .title 也不容易冲突；但全局 styles.css 里不要写 .title、.box 这种万能类名。',
          },
          {
            type: 'code',
            title: '9.5 CSS Modules 完整示例',
            language: 'jsx',
            body: `// ===== UserCard.module.css（CSS Modules 文件，类名会被编译成唯一哈希）=====
.card {
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
.title {
  font-size: 18px;
  font-weight: 600;
}

// ===== UserCard.js（组件里 import CSS Modules）=====
// import styles 后，styles.card 对应 .card，不会和别的文件的 .card 冲突
import styles from './UserCard.module.css'

export default function UserCard({ title, children }) {
  return (
    // className={styles.card} 编译后类似 className="UserCard_card_x7f2a"
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      {/* children：卡片正文，由父组件传入 */}
      {children}
    </div>
  )
}
// 优点：每个组件的样式局部作用域，几乎不会和全局 .card、.title 打架`,
          },
          {
            type: 'list',
            title: '9.6 反例：CSS 命名导致的全局灾难',
            ordered: false,
            items: [
              '❌ 全局 CSS 写 .title { color: red } → 全站所有 title 变红',
              '❌ 每个组件都用 .container、.wrapper → 互相覆盖，DevTools 里分不清来源',
              '❌ JSX 写 class= → 无效，应写 className=',
              '❌ 组件叫 UserCard，css 里写 .UserCard {} → 能工作但不符合 CSS 社区习惯',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'JSX 用 className；类名 kebab-case 或 BEM；怕冲突上 CSS Modules。',
          },
        ],
      },
    },
    {
      id: 'export-import',
      title: 'export / import 与 barrel 桶文件',
      summary: '页面 default export；工具 named export；index.js 可集中再导出',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '一个文件一个主组件 → 默认导出 export default；多个工具函数并列 → 命名导出 export function；components/index.js 可当桶文件统一出口。',
          },
          {
            type: 'table',
            title: '10.1 默认导出 vs 命名导出',
            headers: ['方式', '导出写法', '导入写法', '典型用途'],
            rows: [
              ['默认导出', 'export default function Home() {}', "import Home from '../pages/Home'", '页面、组件「一个文件一个主出口」'],
              ['命名导出', 'export function formatDate() {}', "import { formatDate } from '../utils/date'", '工具函数、常量、多个并列导出'],
              ['混合', 'export default Home; export { helper }', "import Home, { helper } from './Home'", '较少用，一般拆开'],
              ['重新导出', 'export { default as Button } from \'./Button\'', "import { Button } from '../components'", '桶文件 index.js'],
            ],
          },
          {
            type: 'code',
            title: '10.2 怎么写：常见 export/import 模式',
            language: 'javascript',
            body: `// ===== 页面组件：通常一个文件一个主组件，用默认导出 =====
// pages/Home/index.js
export default function Home() {
  return <h1>首页</h1>
}

// 导入默认导出：import 后面名字可以自取，但习惯与组件名一致
import Home from './pages/Home'

// ===== 工具函数：一个文件可 export 多个，用命名导出 =====
// utils/date.js
export function formatDate(d) { /* 格式化为日期字符串 */ }
export function formatTime(d) { /* 格式化为时间字符串 */ }

// 命名导入：花括号里名字必须和 export 的名字一致
import { formatDate, formatTime } from './utils/date'
// 或用 as 起别名，避免命名冲突
import { formatDate as fmt } from './utils/date'

// ===== 桶文件 barrel（可选）：在 index.js 里集中 re-export 多个组件 =====
// components/index.js
export { default as Button } from './Button'
export { default as Modal } from './Modal'
export { default as CodeBlock } from './CodeBlock'

// 外部一次从文件夹导入多个组件，路径更短
import { Button, Modal } from '../components'`,
          },
          {
            type: 'text',
            title: '10.3 为什么：页面常用 default，工具常用 named？',
            body: '页面和主组件通常「一个文件只 export 一个东西」，default export 导入时路径更短：import Home from \'../pages/Home\'。\n\n工具文件往往有多个函数（formatDate、formatTime、parseDate），用 named export 按需导入，打包工具可以 tree-shaking 去掉没用到的函数。\n\n团队约定比技术对错更重要：有些团队全部用 named export（包括组件），也可以，只要统一。',
          },
          {
            type: 'text',
            title: '10.4 barrel 桶文件：什么时候用 index.js 集中导出？',
            body: '当 components/ 下有十几个组件，外部每次写 import Button from \'../components/Button\'、import Modal from \'../components/Modal\' 路径很长。\n\n可以在 components/index.js 里统一 re-export，外部写 import { Button, Modal } from \'../components\'。\n\n小项目不必强行加桶文件——直接 import 具体路径更清晰、跳转更准确。项目变大、重复路径太多时再引入。',
          },
          {
            type: 'list',
            title: '10.5 反例：export/import 常见错误',
            ordered: false,
            items: [
              '❌ 一个文件多个 export default → 语法错误，只能有一个 default',
              '❌ import { Home } from \'./Home\' 但 Home 是 default export → 应 import Home from \'./Home\'',
              '❌ 桶文件 export 太多导致循环依赖 → 尽量只 re-export，不在 index.js 写业务逻辑',
              '❌ 路径 ../../../components/Button → 考虑桶文件或路径别名 @/components',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '页面 default；工具 named；组件多了用 index 桶文件统一出口，小项目直接引具体文件。',
          },
        ],
      },
    },
    {
      id: 'route-naming',
      title: '路由 path 与页面文件的对应关系',
      summary: 'URL 用小写短横线；页面组件仍 PascalCase；两套命名不要混',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'URL path 用小写 + 短横线（/demo/auth/login）；页面组件仍 PascalCase（LoginPage）；文件放 pages/DemoAuth/LoginPage.js。',
          },
          {
            type: 'text',
            title: '11.1 特点：两套命名体系',
            body: '路由涉及两套名字，初学者最容易混：\n\n① URL path：给用户和浏览器看的地址，传统 Web 习惯小写 + 短横线，如 /lesson-detail、/demo/auth/login。\n\n② React 组件名：给开发者看的代码标识符，必须 PascalCase，如 LessonDetail、LoginPage。\n\n它们一一对应，但风格不同——这是正常的，不要试图把 URL 写成 PascalCase 或把组件写成 kebab-case。',
          },
          {
            type: 'table',
            title: '11.2 path、组件、文件对照表',
            headers: ['URL path', '页面组件', '文件路径', '说明'],
            rows: [
              ['/', 'Home', 'pages/Home/index.js', '首页，path 常写 / 或 /home'],
              ['/lesson/:id', 'LessonDetail', 'pages/LessonDetail/index.js', ':id 是动态参数'],
              ['/demo/auth/login', 'LoginPage', 'pages/DemoAuth/LoginPage.js', '多级 path 对应模块文件夹'],
              ['/demo/auth/profile', 'ProfilePage', 'pages/DemoAuth/ProfilePage.js', '同模块多页面放同一文件夹'],
              ['*（兜底）', 'NotFoundPage', 'pages/NotFoundPage/index.js', '404 页面，path 写 *'],
            ],
          },
          {
            type: 'code',
            title: '11.3 怎么写：路由配置示例',
            language: 'jsx',
            body: `// routes/index.js — 路由表：把 URL path 和要渲染的页面组件对应起来
// 每个页面组件从 pages/ 默认 import
import Home from '../pages/Home'
import LessonDetail from '../pages/LessonDetail'
import LoginPage from '../pages/DemoAuth/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'

// routes 是数组，每一项描述一条路由规则
const routes = [
  // path: '/' 访问首页时，element 指定渲染 <Home /> 组件
  { path: '/', element: <Home /> },
  // :id 是动态参数，如 /lesson/jsx-basics 里的 jsx-basics
  { path: '/lesson/:id', element: <LessonDetail /> },
  // 多级 path 用小写 + 短横线，和 PascalCase 组件名是两套命名体系
  { path: '/demo/auth/login', element: <LoginPage /> },
  // path: '*' 是兜底路由，匹配所有未定义的路径，必须放在数组最后
  { path: '*', element: <NotFoundPage /> },
]

export default routes

// 在页面组件里读取动态参数：
// /user/:userId  →  const { userId } = useParams()  // useParams 来自 react-router-dom`,
          },
          {
            type: 'list',
            title: '11.4 路由命名建议',
            ordered: true,
            items: [
              'path 全小写，单词用短横线连接：/user-profile 而不是 /UserProfile 或 /user_profile',
              '动态参数用 camelCase：:userId、:lessonId，取值时 useParams() 名字一致',
              '相关页面放同一文件夹：DemoAuth/ 下有 LoginPage、RegisterPage',
              '404 路由 path: \'*\' 放在路由表最后，否则会拦截所有路径',
            ],
          },
          {
            type: 'table',
            title: '11.5 反例',
            headers: ['❌ 反例', '问题', '✅ 正例'],
            rows: [
              ['path: \'/LoginPage\'', 'URL 不应 PascalCase', "path: '/login' 或 '/demo/auth/login'"],
              ['组件 function login-page()', '组件不能 kebab-case', 'function LoginPage()'],
              ['path 和文件名强行一致', 'LoginPage.js 不必 path=/LoginPage', 'path=/demo/auth/login 即可'],
              ['每个页面散在不同顶级目录', '难找', '按业务模块分子文件夹'],
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'URL 小写短横线，组件 PascalCase，文件放 pages/；动态参数 :userId 用 camelCase。',
          },
        ],
      },
    },
    {
      id: 'list-key-ref',
      title: '其它容易忽略的约定（key、ref、Context、环境变量…）',
      summary: '列表 key 要稳定；ref 叫 xxxRef；Context 叫 XxxContext；CRA 环境变量 REACT_APP_ 前缀',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '列表 key 用稳定 id 别用 index；ref 变量叫 inputRef；Context 一套命名：UserContext + UserProvider + useUser；环境变量必须 REACT_APP_ 开头。',
          },
          {
            type: 'table',
            title: '12.1 其它命名约定速查',
            headers: ['对象', '习惯写法', '示例', '注意'],
            rows: [
              ['列表 key', 'JSX 特殊 prop，名固定 key', 'key={item.id}', '用稳定唯一 id，别用 Math.random() 或 index（列表会变顺序时）'],
              ['ref 变量', 'xxxRef', 'const inputRef = useRef(null)', 'DOM 引用或保存可变值'],
              ['Context 对象', 'XxxContext', 'const ThemeContext = createContext()', '描述「什么上下文」'],
              ['Context Provider', 'XxxProvider', 'function ThemeProvider({ children })', '提供值的组件'],
              ['Context 消费 Hook', 'useXxx / useXxxContext', 'function useTheme() { return useContext(ThemeContext) }', '封装 useContext 方便使用'],
              ['高阶组件 HOC', 'withXxx', 'withAuth(DashboardPage)', '现在较少用，了解即可'],
              ['CRA 环境变量', 'REACT_APP_ 前缀', 'REACT_APP_API_URL', '只有 REACT_APP_ 开头才会注入到前端代码'],
              ['测试属性', 'data-testid', 'data-testid="user-card"', 'kebab-case，给测试工具找元素用'],
              ['图片 alt', '有意义的描述', 'alt="用户头像"', '装饰性图片用 alt=""，不要省略 alt'],
            ],
          },
          {
            type: 'code',
            title: '12.2 怎么写：key 与 ref 示例',
            language: 'jsx',
            body: `// 示例数据：每项有稳定唯一的 id，用作列表 key
const todos = [
  { id: 'a1', text: '学 JSX' },
  { id: 'b2', text: '学组件' },
]

function TodoList() {
  // useRef(null)：创建 ref，用来直接访问 DOM 节点（如 input.focus()）
  const inputRef = useRef(null)

  function focusInput() {
    // optional chaining ?.：inputRef.current 存在时才调用 focus
    inputRef.current?.focus()
  }

  return (
    <div>
      {/* ref={inputRef}：把这个 input 的 DOM 节点存到 inputRef.current */}
      <input ref={inputRef} placeholder="新任务" data-testid="todo-input" />
      <ul>
        {todos.map((todo) => (
          // ✅ key 必须用稳定唯一 id；React 靠 key 识别列表项，优化更新
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      {/* ❌ key={index}：列表增删、排序时，输入框内容可能「错位」到别的行 */}
      {/* ❌ key={Math.random()}：每次渲染 key 都变，等于没有 key，性能差 */}
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: '12.3 Context 一套命名示例',
            language: 'jsx',
            body: `// 从 react 导入 Context 相关 API 和 Hook
import { createContext, useContext, useState } from 'react'

// 1. 创建 Context 对象：命名 XxxContext，描述「这是什么上下文」
const AuthContext = createContext(null)

// 2. Provider 组件：XxxProvider，用 value 把数据提供给所有子组件
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // value 里的对象就是子组件通过 useAuth 能读到的全部数据
  const value = { user, setUser, isLoggedIn: !!user }
  // Provider 包裹的子树都能访问 AuthContext
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// 3. 自定义 Hook：useXxx，封装 useContext，组件里调用更简洁
export function useAuth() {
  const ctx = useContext(AuthContext)
  // 若组件不在 AuthProvider 内部，ctx 为 null，主动抛错提示开发者
  if (!ctx) throw new Error('useAuth 必须在 AuthProvider 内使用')
  return ctx
}

// 使用方式（在 index.js 或 App.js）：
// <AuthProvider><App /></AuthProvider>
// 任意子组件：const { user, isLoggedIn } = useAuth()`,
          },
          {
            type: 'text',
            title: '12.4 环境变量：为什么必须 REACT_APP_ 前缀？',
            body: 'Create React App（以及多数前端构建工具）出于安全考虑：只有以 REACT_APP_ 开头的环境变量才会被打包进浏览器端代码。\n\n在 .env 文件里写：REACT_APP_API_URL=https://api.example.com\n\n代码里用：process.env.REACT_APP_API_URL\n\n不要把密钥、数据库密码写进 REACT_APP_ 变量——前端代码用户都能看到。敏感逻辑放后端。',
          },
          {
            type: 'list',
            title: '12.5 反例',
            ordered: false,
            items: [
              '❌ key={index} 且列表可排序、删除 → 输入框内容会「错位」到别的行',
              '❌ ref 叫 input 而不是 inputRef → 容易和 DOM id 或变量混淆',
              '❌ Context 叫 MyContext → 太泛，应叫 AuthContext、ThemeContext',
              '❌ .env 写 API_URL=... 没有 REACT_APP_ 前缀 → 前端读不到，值为 undefined',
              '❌ <img src="avatar.png"> 没有 alt → 无障碍和 SEO 差',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'key 要稳定；ref 带 Ref 后缀；Context 三件套 Context + Provider + useXxx；环境变量 REACT_APP_ 开头。',
          },
        ],
      },
    },
    {
      id: 'anti-patterns',
      title: '常见反例汇总（尽量别这样）',
      summary: '小写组件、目录混乱、模糊命名、全局裸 class——对照表一次看清',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '反例不是「绝对不能」，而是「初学者和协作成本最高的写法」。对照下面表格，写代码时主动避开。',
          },
          {
            type: 'table',
            title: '13.1 反例 → 问题 → 更好做法（完整对照）',
            headers: ['反例', '会导致什么问题', '更好做法'],
            rows: [
              ['function button() 小写组件', 'React 当 HTML 标签，组件不渲染', 'function Button() + <Button />'],
              ['组件没有 return', '页面空白，控制台 warning', '确保 return JSX / null / 字符串'],
              ['pages 有的用文件夹、有的单文件', '新人找不到文件，风格混乱', '全项目统一一种页面组织方式'],
              ['所有代码塞 components/', '页面和按钮分不清，目录膨胀', '页面 → pages/，复用 UI → components/'],
              ['utils/ 里写 return <div>', '工具函数不应包含 JSX', '抽到 components/ 或 hooks/'],
              ['hooks/ 里放 getToken() 无 use 前缀', '误调 Hook 规则，ESLint 报错', '改名 useToken 或移到 utils/'],
              ['data.js / temp.js / new.js', '看不出职责，temp 容易进仓库', '按业务命名：lessons.js、userApi.js'],
              ['全局 CSS .title / .box / .container', '改一处样式，全站多处变化', 'BEM 前缀或 CSS Modules'],
              ['props 叫 a、b、fn、data', '阅读代码像解谜', 'userName、onSubmit 等有含义名字'],
              ['列表 key={Math.random()}', '每次渲染重建 DOM，性能差且 state 丢失', 'key={item.id} 稳定唯一值'],
              ['子组件直接修改 props', '违反单向数据流，难追踪 bug', '通过 onXxx 回调让父组件改 state'],
              ['环境变量 API_KEY=xxx 无 REACT_APP_', '前端 process.env 读不到', 'REACT_APP_API_KEY=xxx'],
              ['一个组件 500 行：请求+表单+表格+工具', '难维护、难测试', '拆子组件 + hooks/ + utils/'],
              ['每个页面 copy 粘贴相同请求逻辑', '改接口要改 N 处', '抽到 utils/request.js 或 hooks/useApi'],
            ],
          },
          {
            type: 'list',
            title: '13.2 提交代码前自检（反例排查清单）',
            ordered: true,
            items: [
              '有没有小写开头的「组件」函数？',
              '新文件是否放在了正确的目录（pages / components / hooks / utils）？',
              '有没有 .title、.box 这种过于通用的全局 class？',
              '列表渲染是否用了稳定的 key？',
              '事件 prop 是否 onXxx，内部处理是否 handleXxx？',
              '有没有 temp.js、test copy.js 这种临时文件？',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '大写组件、分对目录、起名有意义、key 要稳定、样式防冲突——避开这些反例，代码质量立刻上一个台阶。',
          },
        ],
      },
    },
    {
      id: 'cheatsheet',
      title: '一张表速查（收藏本章）',
      summary: '对象 → 风格 → 例子；入门记住三句话',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '这张表涵盖本章所有命名约定。初学阶段收藏这一页，写代码时对照即可，不用全背下来。',
          },
          {
            type: 'table',
            title: '14.1 命名与目录终极速查表',
            headers: ['对象', '风格 / 规则', '例子', '硬规则？'],
            rows: [
              ['组件 / 页面文件', 'PascalCase', 'UserCard.js、Home/index.js', '✅ 组件名必须大写'],
              ['组件函数名', 'PascalCase', 'function UserCard()', '✅ 硬规则'],
              ['页面组织', '一页一文件夹', 'pages/Home/index.js + index.css', '约定'],
              ['自定义 Hook', 'use + PascalCase', 'useAuth.js → function useAuth()', '✅ 必须 use 开头'],
              ['普通函数 / 变量', 'camelCase', 'getUserList、userName', '约定'],
              ['布尔变量', 'is / has / can / should', 'isOpen、hasError、canEdit', '约定'],
              ['事件 props', 'on + 事件名', 'onSubmit、onClose', '约定'],
              ['事件处理函数', 'handle + 事件名', 'handleSubmit、handleClick', '约定'],
              ['props 一般', 'camelCase', 'userName、items、variant', '约定'],
              ['嵌套内容', '固定 children', '<Card>…</Card>', 'React 机制'],
              ['CSS className 属性', 'className（不是 class）', 'className="user-card"', '✅ JSX 硬规则'],
              ['CSS 类名', 'kebab-case / BEM / Modules', 'user-card、user-card__title', '约定'],
              ['工具 / 配置', 'camelCase', 'request.js、formatDate.js', '约定'],
              ['常量', 'UPPER_SNAKE_CASE', 'MAX_PAGE_SIZE、API_BASE_URL', '约定'],
              ['路由 path', '小写 + 短横线', '/demo/auth/login', '约定'],
              ['路由动态参数', 'camelCase', ':userId、:lessonId', '约定'],
              ['ref 变量', 'xxxRef', 'inputRef、modalRef', '约定'],
              ['Context', 'XxxContext / XxxProvider / useXxx', 'AuthContext、useAuth', '约定'],
              ['环境变量 (CRA)', 'REACT_APP_ 前缀', 'REACT_APP_API_URL', '✅ 构建工具硬规则'],
              ['测试属性', 'data-testid', 'data-testid="submit-button"', '约定'],
              ['列表 key', '稳定唯一 id', 'key={item.id}', '✅ React 硬规则（要有 key）'],
            ],
          },
          {
            type: 'table',
            title: '14.2 目录 → 放什么（速查）',
            headers: ['目录', '放什么', '命名'],
            rows: [
              ['pages/', '整页组件（对应路由）', 'PascalCase 文件夹'],
              ['components/', '可复用 UI', 'PascalCase.js'],
              ['layouts/', '多页共用布局壳', 'PascalCase.js'],
              ['hooks/', 'useXxx 自定义 Hook', 'useXxx.js'],
              ['utils/', '纯函数工具', 'camelCase.js'],
              ['routes/', '路由配置', 'index.js'],
              ['store/', 'Redux 等全局状态', 'camelCase + Slice'],
              ['data/', '静态数据 / 配置', 'camelCase.js'],
            ],
          },
          {
            type: 'list',
            title: '14.3 入门三句话（背这三句就够启动）',
            ordered: true,
            items: [
              '组件必须大写开头（PascalCase），并且 return 可渲染的内容（JSX / null）。',
              '一页一文件夹：pages/Home/index.js + 同目录 css，相关文件不散落。',
              '整页 → pages；复用 UI → components；use 逻辑 → hooks；纯函数 → utils；名字能看出类型。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '大写组件、分页文件夹、目录分清楚、on/handle 分内外、key 要稳定——这五条覆盖 80% 日常规范。',
          },
        ],
      },
    },
  ],
}

export default conventions
