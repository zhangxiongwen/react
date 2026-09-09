/**
 * 路由章节
 * 每个条目 = 一句话总结 + 详细步骤 + 完整可抄 demo + 易错点
 */
const router = {
  id: 'router',
  title: '路由实战（react-router-dom）',
  summary:
    '从定义路由、useRoutes，到守卫、403、404、登录回跳、lazy + Suspense 懒加载——每节都有可交互 Demo',
  order: 12,
  items: [
    {
      id: 'router-setup-full',
      title: '路由从零到跑通：安装 → BrowserRouter → 路由表',
      summary: '单页应用靠 URL 切换页面；react-router-dom v6 用 Routes/Route 或 useRoutes 集中配路由',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'React 单页应用（SPA）只有一个 HTML；改 URL 不整页刷新，而是 JS 根据路径换组件——react-router-dom 负责匹配路径、渲染页面、提供 Link 跳转和 useNavigate 编程式导航。',
          },
          {
            type: 'text',
            title: '1. 是什么：前端路由',
            body: '传统多页网站（MPA）：点链接 → 浏览器向服务器要新 HTML → 整页白屏刷新 → 所有 JS 状态丢失。\n\nReact 单页应用（SPA）：首次加载一个 index.html + 整包 JS；之后点链接或改地址栏，**不请求新 HTML**，而是由 react-router-dom 在内存里切换要渲染的 React 组件树。\n\n你可以把路由想象成「URL 路径 → 页面组件」的对照表。用户访问 /lesson/router/router-setup-full，路由器查表，决定渲染 LessonDetail 而不是 Home。',
          },
          {
            type: 'table',
            title: 'SPA 路由 vs 传统多页（先建立直觉）',
            intro: '为什么 React 项目几乎都用前端路由？对照下面这张表。',
            headers: ['对比项', '传统 MPA（多页）', 'React SPA + 前端路由'],
            rows: [
              ['页面切换', '整页刷新，白屏闪一下', '只换中间内容区，顶栏可保持不动'],
              ['状态保留', '刷新后全丢', '同页内 state 可保留；刷新仍会丢（需持久化）'],
              ['URL', '每个 .html 一个地址', '一个 HTML，路径由 JS 解释（/home、/users/1）'],
              ['首屏', '每个页面单独请求', '首次加载 JS 包较大，之后切换快'],
              ['后端', '每个 URL 对应一个 HTML 文件', '生产环境需配置「所有路径回退 index.html」'],
            ],
            note: '本项目就是 SPA：MainLayout 顶栏不变，Outlet 区域随 URL 换页面。',
          },
          {
            type: 'text',
            title: '2. 特点：react-router-dom v6 核心概念',
            body: '**BrowserRouter**：包住整个 App，启用 HTML5 History API，URL 是 /home 这种干净路径（没有 #）。\n\n**Routes / Route 或 useRoutes**：声明「路径匹配规则」和「匹配到了渲染谁」。\n\n**嵌套路由**：父路由渲染 Layout，子路由渲染具体页面；Layout 里放 **Outlet** 作为子页面插槽。\n\n**动态段 :param**：path 里写 :userId，页面用 useParams() 读取。\n\n**Navigate**：编程式重定向组件，等价于「一进来就 navigate 走」。\n\nv6 已废弃 v5 的 Switch、component= 写法——本笔记和本项目一律用 v6 语法。',
          },
          {
            type: 'list',
            title: '3. 为什么：商业项目要集中管理路由表',
            ordered: true,
            items: [
              '路径和页面对照关系一目了然——新人看 routes/index.js 就知道全站有哪些页',
              'App.js 保持干净，只写 useRoutes(routes)，不被几十条 Route 淹没',
              '以后做权限：可根据角色 filter 路由数组，再交给 useRoutes',
              '和布局解耦：MainLayout + Outlet 写一次，所有子页共享顶栏',
              '便于对照文档和 Code Review——改路由不用在 App 里翻找',
            ],
          },
          {
            type: 'text',
            title: '4. 怎么用：四步跑通（对照本项目源码）',
            body: '按下面顺序读源码，并在浏览器地址栏手动改 URL 观察页面切换——比只看文档快十倍。\n\n**第 1 步**：npm install react-router-dom（本项目已装好）。\n\n**第 2 步**：src/index.js 最外层包 BrowserRouter（本项目还有 Redux Provider）。\n\n**第 3 步**：src/routes/index.js 写路由表数组。\n\n**第 4 步**：src/App.js 里 const element = useRoutes(routes); return element。\n\n**第 5 步（嵌套）**：MainLayout 里放 Outlet，子路由页面渲染在 Outlet 位置；index: true 表示访问父路径 / 时的默认子页。',
          },
          {
            type: 'list',
            title: '对照本项目：建议阅读顺序',
            ordered: true,
            items: [
              'src/index.js —— BrowserRouter 包在哪',
              'src/App.js —— useRoutes 怎么用',
              'src/routes/index.js —— 完整路由表（含 /demo/auth）',
              'src/layouts/MainLayout.js —— Outlet 插槽',
              'src/pages/Home/index.js —— 首页',
              'src/pages/LessonDetail/index.js —— useParams 读 :categoryId :itemId',
              '浏览器试：/lesson/router/router-setup-full 看详情页切换',
            ],
          },
          {
            type: 'code',
            title: '第 1 步：安装命令',
            language: 'bash',
            body: `# 安装 react-router-dom（React 官方路由库，v6 是当前主流版本）
npm install react-router-dom

# 装完后 package.json 里会出现类似：
#   "react-router-dom": "^6.x"
# 本项目已装好，可直接打开 src/index.js、src/routes/index.js 对照学习`,
          },
          {
            type: 'code',
            title: '第 2 步：入口 src/index.js（对照本项目）',
            language: 'jsx',
            body: `// 入口文件：React 应用从这里挂载到 #root
import React from 'react'
import ReactDOM from 'react-dom/client'
// BrowserRouter：启用 HTML5 History 路由，URL 形如 /home（没有 #）
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'
import App from './App'

// createRoot 是 React 18 的挂载方式（替代旧的 ReactDOM.render）
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    {/* Provider：把 Redux store 注入整棵组件树 */}
    <Provider store={store}>
      {/* ★ BrowserRouter 必须包住 App，子组件才能用 Link / useNavigate / useParams */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// ★ 常见报错：没有 BrowserRouter 时
//   useNavigate() may be used only in the context of a Router
//   Link 点击后整页刷新或无效`,
          },
          {
            type: 'code',
            title: '第 3 步：路由表 src/routes/index.js（本项目完整配置）',
            language: 'jsx',
            body: `// Navigate：路由重定向组件，匹配到就自动跳转到 to 指定的路径
import { Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/index'
import LessonDetail from '../pages/LessonDetail/index'

/**
 * 路由表（数组）—— 商业项目常见做法：集中管理全站路径
 *
 * 路径说明：
 *   /                              → 知识目录首页（Home）
 *   /lesson/:categoryId/:itemId    → 知识点详情（LessonDetail）
 *   *                              → 兜底：前面都没匹配上时触发
 */
const routes = [
  {
    path: '/',                    // 根路径
    element: <MainLayout />,     // 父路由：布局壳（顶栏 + Outlet 插槽）
    children: [                   // 子路由：渲染在 MainLayout 的 <Outlet /> 里
      {
        index: true,              // index: true = 访问父路径 / 时的默认子页（等价 path: ''）
        element: <Home />,
      },
      {
        // 动态段 :categoryId :itemId —— 页面里用 useParams() 读取，值永远是字符串
        path: 'lesson/:categoryId/:itemId',  // 子 path 不要写开头 /，会相对父 path 拼接
        element: <LessonDetail />,
      },
      {
        // path: '*' 匹配「本层 children 里前面都没匹配上」的任意路径（404 兜底）
        path: '*',
        // replace：替换当前历史记录，避免用户点返回又回到无效页
        element: <Navigate to="/" replace />,
      },
    ],
  },
]

export default routes`,
          },
          {
            type: 'code',
            title: '第 4 步：App.js 用 useRoutes',
            language: 'jsx',
            body: `// useRoutes：把路由配置数组「渲染」成当前 URL 对应的组件树
import { useRoutes } from 'react-router-dom'
import routes from './routes'

function App() {
  // 根据浏览器地址栏路径，从 routes 数组里匹配规则，算出该渲染哪个 element
  const element = useRoutes(routes)
  return element  // 可能是 MainLayout+Home，也可能是 MainLayout+LessonDetail
}

export default App

// ★ useRoutes 和下面 JSX 写法能力完全等价，只是配置形式不同：
// <Routes>
//   <Route path="/" element={<MainLayout />}>
//     <Route index element={<Home />} />
//     <Route path="lesson/:categoryId/:itemId" element={<LessonDetail />} />
//     <Route path="*" element={<Navigate to="/" replace />} />
//   </Route>
// </Routes>`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：手写一个迷你路由，看懂 BrowserRouter + Routes 在干什么',
            body: `import { useState } from 'react' // 迷你路由只靠一个 state 记住「当前路径」，不需要装任何库

// ① 三个页面组件 —— 真实项目里它们分别是 src/pages/Home、About、Users
function HomePage() {                                          // 首页组件
  return <p style={{ margin: 0 }}>🏠 首页内容（真实项目里是 &lt;Home /&gt;）</p>
}
function AboutPage() {                                         // 关于页组件
  return <p style={{ margin: 0 }}>ℹ️ 关于页内容（真实项目里是 &lt;About /&gt;）</p>
}
function UsersPage() {                                         // 用户页组件
  return <p style={{ margin: 0 }}>👥 用户页内容（真实项目里是 &lt;Users /&gt;）</p>
}

// ② 路由表：path → 要渲染的组件。真实项目里这就是 src/routes/index.js 导出的 routes 数组
const routes = [
  { path: '/', label: '首页', element: <HomePage /> },         // 真实写法：{ path: '/', element: <Home /> }
  { path: '/about', label: '关于', element: <AboutPage /> },   // 真实写法：{ path: 'about', element: <About /> }
  { path: '/users', label: '用户', element: <UsersPage /> },   // 真实写法：{ path: 'users', element: <Users /> }
]

export default function Demo() {
  // ③ 当前路径存在 state 里；真实项目里这份数据由 BrowserRouter 从地址栏读出来并保持同步
  const [path, setPath] = useState('/')

  // ④ 查表匹配：找出 path 相同的那一条。真实项目里这一步是 <Routes> / useRoutes 内部的匹配算法
  const matched = routes.find((r) => r.path === path)

  return (
    <div style={{ border: '1px solid #d9d9d9', borderRadius: 8, overflow: 'hidden' }}>
      {/* ⑤ 顶栏：切路由时它不会卸载，等价于 MainLayout 里那个固定不动的 <Header /> */}
      <div style={{ display: 'flex', gap: 8, padding: 10, background: '#fafafa', borderBottom: '1px solid #eee' }}>
        {routes.map((r) => (
          <button
            key={r.path}                                        // 列表渲染要给稳定的 key
            onClick={() => setPath(r.path)}                     // 真实项目里这是 <Link to={r.path}>，点击后改地址栏
            style={{
              padding: '4px 10px',
              cursor: 'pointer',
              borderRadius: 4,
              border: '1px solid #d9d9d9',
              background: path === r.path ? '#1677ff' : '#fff', // 当前项高亮，等价于 NavLink 的 isActive
              color: path === r.path ? '#fff' : '#333',
            }}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* ⑥ 假地址栏：让你直观看到「先是路径变了，页面才跟着换」 */}
      <div style={{ padding: '6px 10px', fontSize: 12, color: '#888', fontFamily: 'monospace' }}>
        地址栏：http://localhost:3000{path}
      </div>

      {/* ⑦ 内容区就是 MainLayout 里的 <Outlet /> 插槽：匹配到谁就把谁渲染在这里 */}
      <div style={{ padding: 16, minHeight: 60 }}>
        {matched ? matched.element : <p style={{ margin: 0, color: '#cf1322' }}>404：没有匹配到 {path}</p>}
      </div>
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: '第 5 步：布局 MainLayout.js + Outlet',
            language: 'jsx',
            body: `// Outlet：嵌套路由的「插槽」—— 匹配的子路由 element 会渲染在这里
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import './MainLayout.css'

/**
 * 主布局组件：顶栏固定不变，中间内容区随 URL 切换
 *
 * 嵌套路由原理：
 *   访问 /           → MainLayout 渲染，Outlet 里是 Home
 *   访问 /lesson/... → MainLayout 渲染，Outlet 里是 LessonDetail
 */
function MainLayout() {
  return (
    <div className="MainLayout">
      <Header />  {/* 顶栏：所有子页共享，不会随路由卸载 */}
      <main className="MainLayout-main">
        {/* ★ 没有 Outlet，子路由页面无处渲染，屏幕会是空白 */}
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout`,
          },
          {
            type: 'table',
            title: '嵌套路由结构对照表',
            intro: '理解「父 path + 子 path」如何拼成最终 URL。',
            headers: ['配置', '实际 URL', '渲染结果'],
            rows: [
              ['父 path: "/" + 子 index: true', '/', 'MainLayout → Outlet 里是 Home'],
              ['父 path: "/" + 子 path: "lesson/:categoryId/:itemId"', '/lesson/router/router-setup-full', 'MainLayout → Outlet 里是 LessonDetail'],
              ['父 path: "/" + 子 path: "demo/auth"', '/demo/auth', 'MainLayout → Outlet 里是 AuthDemoHome'],
              ['子 path 写 "lesson/..." 不要写 "/lesson/..."', '—', 'v6 子路由相对父路径拼接，开头 / 会当成绝对路径'],
            ],
            note: 'index: true 和 path: "" 在 v6 等价，推荐写 index: true 更清晰。',
          },
          {
            type: 'text',
            title: '5. 易错：路由配置常见坑',
            body: '**子路由 path 不要写开头的 /**：写 lesson/:id 不是 /lesson/:id（在父 path / 下会自动拼成 /lesson/:id）。\n\n**Route 的 element 传 JSX 元素 <Home />**，不是 v5 的 component={Home}。\n\n**Navigate 加 replace**：避免用户点浏览器返回又回到 404 或登录拦截前的页，造成死循环感。\n\n**改了 routes 后热更新有时不生效**：刷新页面试试。\n\n**生产部署**：Nginx/静态托管要把所有路径 fallback 到 index.html，否则刷新 /lesson/xxx 会 404（服务器找不到这个文件）。',
          },
          {
            type: 'list',
            title: '易错清单（打勾自检）',
            ordered: false,
            items: [
              '子路由 path 是否误写了开头的 /',
              'BrowserRouter 是否包在 App 外层（index.js）',
              'Layout 里是否放了 Outlet（没有 Outlet 子页不显示）',
              '动态段名字和 useParams 解构的名字是否一致',
              '404 的 path: "*" 是否放在 children 最后',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '入口包 BrowserRouter → 路由表配 path/element/children → App 里 useRoutes → 布局用 Outlet 做插槽；子 path 相对父 path 拼接，动态段用 :name + useParams。',
          },
        ],
      },
    },
    {
      id: 'use-routes-vs-jsx',
      title: 'useRoutes 是什么？和 <Routes>/<Route> 有啥区别？',
      summary: '两种写法能力等价；本项目用 useRoutes + 路由表，是为了集中管理和商业项目结构',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'useRoutes(routes 配置数组) 和手写 <Routes><Route /></Routes> 是同一套路由引擎的两种写法——匹配规则、嵌套、参数完全一样；差别在「配置放哪、好不好维护」，不是功能强弱。',
          },
          {
            type: 'text',
            title: '1. 是什么：两种等价写法',
            body: 'React Router v6 内部只有一套匹配算法。你可以用 **JSX 声明式** 写 <Route path="..." element={...} />，也可以把同样的结构写成 **JS 对象数组**，交给 useRoutes() 渲染。\n\n网上教程和小 demo 常用 JSX——打开 App.js 就能看见全部路由。商业项目更常用 **路由表 + useRoutes**——路径和组件映射集中在 routes/index.js，App 只有一行 useRoutes。',
          },
          {
            type: 'table',
            title: '三种写法对比（能力 vs 适用场景）',
            intro: '先精通一种，换另一种成本很低——结构是一一对应的。',
            headers: ['写法', '典型代码', '优点', '缺点', '适合'],
            rows: [
              ['JSX Routes', '<Routes><Route path="/" element={A}/></Routes>', '直观、跟官方文档一致', '路由多了 App 臃肿', 'demo、页面少于 10 个'],
              ['useRoutes', 'useRoutes(routes 数组)', '集中管理、可 filter、App 干净', '多跳一个文件', '中小型真实项目（本项目）'],
              ['createBrowserRouter', 'RouterProvider + loader/action', '路由级数据预加载、SSR 友好', '概念更多、不能再包 BrowserRouter', '复杂数据路由、SSR'],
            ],
            note: '本项目选 BrowserRouter + useRoutes：够入门和中小型业务；loader/action 以后按需再学。',
          },
          {
            type: 'text',
            title: '2. 特点：结构一一对应',
            body: 'JSX 里嵌套的 <Route> 等于 useRoutes 数组里的 children 数组。index 属性等于 index: true。element 属性等于 element: <Component />。\n\n**Outlet 的位置**也一致：父 Route 的 element 是 Layout，Layout 内放 <Outlet />，子 Route 的 element 渲染在 Outlet 里。',
          },
          {
            type: 'code',
            title: '写法 A：JSX 路由（网上最常见）',
            language: 'jsx',
            body: `// 写法 A：JSX 声明式路由 —— 网上教程最常见，打开 App.js 就能看到全部路由
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import LessonDetail from './pages/LessonDetail'

function App() {
  return (
    // BrowserRouter 也可以写在 index.js，这里演示「包在 App 里」的写法
    <BrowserRouter>
      {/* Routes：路由容器，内部放多条 Route 匹配规则 */}
      <Routes>
        {/* 父 Route：path 匹配 / 时渲染 MainLayout */}
        <Route path="/" element={<MainLayout />}>
          {/* index：访问 / 时的默认子页，不需要写 path="" */}
          <Route index element={<Home />} />
          {/* 子 path 相对父 path 拼接 → 实际 URL 是 /lesson/:categoryId/:itemId */}
          <Route path="lesson/:categoryId/:itemId" element={<LessonDetail />} />
          {/* path="*" 兜底 404，应放在同级 children 最后 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

// 优点：结构直观，跟官方文档一致，适合 demo
// 缺点：路由多了 App.js 又长又乱；不好按模块拆分、不好做权限 filter`,
          },
          {
            type: 'code',
            title: '写法 B：useRoutes（本项目）',
            language: 'jsx',
            body: `// ---------- src/routes/index.js ----------
// 路由表：用 JS 对象数组描述 path / element / children 结构
const routes = [
  {
    path: '/',
    element: <MainLayout />,   // 父路由：布局壳
    children: [
      { index: true, element: <Home /> },  // 访问 / 时默认页
      { path: 'lesson/:categoryId/:itemId', element: <LessonDetail /> },
      { path: '*', element: <Navigate to="/" replace /> },  // 404 兜底
    ],
  },
]
export default routes

// ---------- src/App.js ----------
import { useRoutes } from 'react-router-dom'
import routes from './routes'

function App() {
  // useRoutes：根据当前地址栏 URL，从 routes 数组匹配并返回要渲染的 element
  const element = useRoutes(routes)
  return element
}

// ---------- src/index.js ----------
// 入口只包一层 BrowserRouter，App 里不再重复包：
// <BrowserRouter><App /></BrowserRouter>

// 优点：路由集中管理、App 干净、以后可按权限 filter 路由表
// 缺点：初学要多跳一个文件；要习惯「对象配置」而不是纯 JSX`,
          },
          {
            type: 'code',
            title: '对照：其实是一回事',
            language: 'text',
            body: `# 两种写法一一对应关系（能力完全相同，只是语法皮肤不同）

JSX 写法                         useRoutes 写法
────────────────────────────────────────────────────
<Routes>                         useRoutes([ ... ])
  <Route path="/" element={A}>     { path:'/', element:A,
    <Route index element={B}/>       children:[
    <Route path="x" element={C}/>      { index:true, element:B },
  </Route>                             { path:'x', element:C },
</Routes>                            ]}

# 匹配规则、嵌套、Outlet、useParams 完全相同
# 选哪个 = 项目规模 + 团队习惯，不是谁更「高级」`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：路由表数组 vs JSX 写法，并排渲染出同一个结果',
            body: `import { useState, Children } from 'react' // Children：把 JSX 子元素列表转成数组，方便读它们的 props

// 三个页面组件，两种写法共用同一批组件，方便对比结果
function HomePage() { return <span>🏠 首页</span> }              // 对应 <Home />
function ListPage() { return <span>📄 列表页</span> }            // 对应 <List />
function DetailPage() { return <span>🔍 详情页</span> }          // 对应 <Detail />

// 匹配函数：给一份「配置数组 + 当前路径」，算出该渲染哪个元素
// 真实项目里这段逻辑藏在 react-router-dom 内部，两种写法共用的就是它
function matchRoute(table, path) {
  const hit = table.find((r) => r.path === path)                 // 逐条比对 path
  return hit ? hit.element : <span style={{ color: '#cf1322' }}>404</span> // 没命中就兜底
}

// ===== 写法 A：路由表数组（真实项目里交给 useRoutes(routes) 渲染）=====
const routeTable = [
  { path: '/', element: <HomePage /> },                          // 等价于 <Route path="/" element={<Home />} />
  { path: '/list', element: <ListPage /> },                      // 等价于 <Route path="/list" ... />
  { path: '/detail', element: <DetailPage /> },                  // 等价于 <Route path="/detail" ... />
]

// ===== 写法 B：JSX 声明（真实项目里是 <Routes><Route /></Routes>）=====
function MiniRoute() { return null }                             // 只当「配置载体」，自己不渲染任何东西
function MiniRoutes({ path, children }) {
  // 把每个 <MiniRoute path element /> 的 props 收集成数组 —— 收完就和写法 A 的数组长得一模一样
  const table = Children.toArray(children).map((child) => ({
    path: child.props.path,                                      // 读 JSX 上写的 path 属性
    element: child.props.element,                                // 读 JSX 上写的 element 属性
  }))
  return matchRoute(table, path)                                 // 复用同一个匹配函数，证明「同一个引擎，两张皮」
}

const boxStyle = { flex: 1, border: '1px solid #d9d9d9', borderRadius: 8, padding: 12 } // 两栏共用样式

export default function Demo() {
  const [path, setPath] = useState('/')                          // 当前路径，两栏共用同一个值

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {['/', '/list', '/detail', '/oops'].map((p) => (         // 最后一个是故意写错的路径，用来看 404
          <button
            key={p}
            onClick={() => setPath(p)}                           // 真实项目里点的是 <Link to={p}>
            style={{
              padding: '4px 10px', cursor: 'pointer', borderRadius: 4,
              border: '1px solid #d9d9d9',
              background: path === p ? '#1677ff' : '#fff',       // 当前路径高亮
              color: path === p ? '#fff' : '#333',
            }}
          >
            {p}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <div style={boxStyle}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>写法 A：useRoutes(路由表数组)</div>
          {/* 直接把数组交给匹配函数，相当于 const element = useRoutes(routes) */}
          <div style={{ padding: 10, background: '#f6ffed', borderRadius: 6 }}>{matchRoute(routeTable, path)}</div>
        </div>

        <div style={boxStyle}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>写法 B：&lt;Routes&gt;&lt;Route /&gt;&lt;/Routes&gt;</div>
          <div style={{ padding: 10, background: '#e6f4ff', borderRadius: 6 }}>
            {/* JSX 写法：结构一眼能看懂，但内部会被转成和写法 A 一样的配置数组 */}
            <MiniRoutes path={path}>
              <MiniRoute path="/" element={<HomePage />} />
              <MiniRoute path="/list" element={<ListPage />} />
              <MiniRoute path="/detail" element={<DetailPage />} />
            </MiniRoutes>
          </div>
        </div>
      </div>

      <p style={{ marginTop: 12, fontSize: 13, color: '#666' }}>
        两栏永远显示同一个页面：说明两种写法只是「配置形式」不同，匹配能力完全一样。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: '写法 C：数据路由（了解即可）',
            language: 'jsx',
            body: `// 写法 C：数据路由 API —— 支持 loader/action 预加载，SSR 友好（了解即可）
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// createBrowserRouter：创建带数据能力的 router 实例（不是普通对象数组）
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      // 进阶：可在这里加 loader 在渲染前预取数据
    ],
  },
])

function App() {
  // RouterProvider 接管路由，内部已包含 history 管理
  return <RouterProvider router={router} />
}

// ★ 注意：用了 RouterProvider 就不要再包 BrowserRouter，两者二选一`,
          },
          {
            type: 'text',
            title: '3. 为什么：本项目坚持 useRoutes',
            body: '1）路由定义和页面组件分离，符合商业项目目录习惯（pages / routes / layouts 各管各的）。\n\n2）以后做登录权限时，可以写 const allowedRoutes = routes.filter(...) 再 useRoutes(allowedRoutes)——JSX 写法也能做，但 filter 对象数组更自然。\n\n3）和文档里「集中管理路由表」的教学一致，你读 src/routes/index.js 就能看到含 /demo/auth 的完整结构。\n\n你完全可以在练习项目里改成 JSX Routes，**行为不会变**。',
          },
          {
            type: 'code',
            title: '把本项目改成 JSX 写法会长这样（等价）',
            language: 'jsx',
            body: `// 仅演示 JSX Routes 与 useRoutes 的等价性；本仓库仍保持 useRoutes 写法
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="lesson/:categoryId/:itemId" element={<LessonDetail />} />
        <Route path="demo/json-server" element={<JsonServerDemo />} />
        {/* path="*" 必须放最后，匹配所有未命中路径 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}`,
          },
          {
            type: 'list',
            title: '4. 怎么用：怎么选写法（决策顺序）',
            ordered: true,
            items: [
              '跟着教程抄、路由少于 5 条 → JSX <Routes> 最直观',
              '路由会变多、要集中管理、要做权限过滤 → 路由表 + useRoutes（本项目）',
              '需要 loader 预加载、action 提交、SSR → createBrowserRouter + RouterProvider',
              '团队已有规范 → 跟团队，三种能力等价',
            ],
          },
          {
            type: 'text',
            title: '5. 易错：混用 v5/v6 或混用两种 Router',
            body: '**不要用 Switch**（v5），v6 用 Routes。**不要用 component={Home}**（v5），v6 用 element={<Home />}。\n\n**RouterProvider 和 BrowserRouter 二选一**——同时包会报错或行为异常。\n\n**BrowserRouter 只包一次**——通常在 index.js，不要在 App 里又包一层（除非刻意做微前端隔离）。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'JSX Routes 和 useRoutes 是同一引擎的两种皮肤——demo 用 JSX 直观，真实项目用路由表集中管理；需要 loader 再 upgrade 到 createBrowserRouter。',
          },
        ],
      },
    },
    {
      id: 'route-guard',
      title: '路由守卫实战（含可运行 Demo）',
      summary: '未登录跳登录、已登录踢出登录页、角色 403、登录回跳——项目里真有页面可点',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'React Router 没有 Vue 的 beforeEach——用「守卫组件」包一层：检查通过就渲染 <Outlet /> 继续显示子路由，不通过就 <Navigate to="..." /> 踢走；登录回跳靠 state.from 记住原地址。',
          },
          {
            type: 'text',
            title: '0. 先动手：打开 /demo/auth 走一遍',
            body: '顶部导航点 **「路由演示」**，或浏览器直接打开 **/demo/auth**。那里有登录、个人中心、后台、403、未保存提示、404 的真实链接和页面提示。\n\n文档下面的代码与 **src/components/auth/**、**src/routes/index.js** 完全一致——建议边点边对照源码。\n\n推荐体验顺序：未登录点「个人中心」→ 被踢到登录页 → 登录 → 自动回到个人中心 → 用普通 user 进后台 → 403 → 已登录再开 /login → 被踢回演示首页。',
          },
          {
            type: 'text',
            title: '1. 是什么：路由守卫',
            body: '进入某个 URL 对应的页面前，先做**准入检查**：有没有登录？角色够不够？表单有没有未保存？\n\n检查不通过时，不渲染目标页面，而是**改去别的 URL**（登录页、403 页、首页）。\n\n实现方式：在路由表里插入一层**没有 path 的父路由**，element 是守卫组件；守卫内部 return Outlet 或 Navigate。',
          },
          {
            type: 'table',
            title: '本项目 /demo/auth 守卫地图',
            intro: '每个路径对应哪种守卫、预期行为——建议逐项点击验证。',
            headers: ['路径', '守卫组件', '未登录', '已登录 user', '已登录 admin'],
            rows: [
              ['/demo/auth', '无（公开）', '可看演示首页', '可看', '可看'],
              ['/demo/auth/login', 'GuestOnly', '显示登录表单', '踢回 /demo/auth', '踢回 /demo/auth'],
              ['/demo/auth/profile', 'RequireAuth', '跳登录 + 记 from', '显示个人中心', '显示个人中心'],
              ['/demo/auth/admin', 'RequireAuth + RequireRole', '跳登录', '跳 403', '显示后台'],
              ['/demo/auth/403', '无（公开）', '可看说明页', '可看', '可看'],
              ['/demo/auth/unsaved', 'RequireAuth', '跳登录', '未保存离开演示', '同左'],
            ],
            note: '前端守卫只是体验与门禁——真安全必须后端校验 token 和权限。',
          },
          {
            type: 'text',
            title: '2. 特点：三种守卫模式',
            body: '**RequireAuth（登录守卫）**：没 token → Navigate 到 /demo/auth/login，并把当前 location 放进 state.from。\n\n**GuestOnly（反向守卫）**：已登录还访问登录页 → Navigate 到 /demo/auth，避免重复登录表单。\n\n**RequireRole（角色守卫）**：登录了但角色不在 allow 列表 → Navigate 到 /demo/auth/403。\n\n守卫可以**嵌套**：先 RequireAuth 再 RequireRole，像套娃一样一层层检查。',
          },
          {
            type: 'text',
            title: '3. 为什么：state.from 实现登录回跳',
            body: '用户本来想去 /demo/auth/profile，被 RequireAuth 拦到登录页。如果登录成功后只 navigate(\'/\')，用户会困惑「我的个人中心呢？」。\n\nNavigate 时带上 state={{ from: location }}，登录页用 useLocation().state?.from?.pathname 读出原目标，登录成功后 navigate(from, { replace: true })——**无缝回到原来想去的页**。\n\nreplace: true 避免历史栈里留下「登录页 → 个人中心 → 点返回又回到登录页」的糟糕体验。',
          },
          {
            type: 'code',
            title: '案例 1：RequireAuth（src/components/auth/RequireAuth.js）',
            language: 'jsx',
            body: `// 路由守卫三件套：Navigate（重定向）、Outlet（放行子路由）、useLocation（读当前 URL）
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isLoggedIn } from '../../utils/auth'

/**
 * RequireAuth：登录守卫
 * - 未登录 → 重定向到登录页，并记住原地址（state.from）
 * - 已登录 → 渲染 <Outlet />，继续显示受保护的子路由页面
 */
function RequireAuth() {
  // useLocation：拿到当前 URL 信息（pathname、search、state 等）
  const location = useLocation()

  if (!isLoggedIn()) {
    // Navigate：不渲染页面，直接改 URL 跳走
    // replace：替换历史记录，避免用户点返回又回到受保护页造成死循环
    // state.from：把「用户本来想去哪」传给登录页，登录成功后可以跳回
    return (
      <Navigate
        to="/demo/auth/login"
        replace
        state={{ from: location }}
      />
    )
  }

  // 已登录：Outlet 是子路由的插槽，ProfilePage 等会渲染在这里
  return <Outlet />
}

export default RequireAuth`,
          },
          {
            type: 'code',
            title: '路由表怎么挂 RequireAuth（节选）',
            language: 'jsx',
            body: `// 路由表里「无 path 的父路由」= 纯守卫层，只负责检查，不参与 URL 匹配
{
  element: <RequireAuth />,  // 没有 path：作为包裹层，检查通过才渲染 children
  children: [
    // 未登录访问 /demo/auth/profile → RequireAuth 拦截 → 自动去登录页
    { path: 'demo/auth/profile', element: <ProfilePage /> },
    { path: 'demo/auth/unsaved', element: <UnsavedFormPage /> },
  ],
}`,
          },
          {
            type: 'code',
            title: '案例 2：LoginPage 登录回跳（本项目已实现）',
            language: 'jsx',
            body: `// LoginPage 登录回跳核心逻辑（摘自本项目 LoginPage）
const location = useLocation()   // 读路由 state（RequireAuth 传来的 from）
const navigate = useNavigate()   // 编程式跳转 API

// 守卫 Navigate 时带的 state.from；没有则默认去演示首页
const from = location.state?.from?.pathname || '/demo/auth'

function handleSubmit(e) {
  e.preventDefault()
  login({ name, role })              // 写入 localStorage，标记已登录
  // replace: true → 登录页不留在历史栈，用户点返回不会回到登录表单
  navigate(from, { replace: true })  // 回到个人中心等原目标页
}`,
          },
          {
            type: 'code',
            title: '案例 3：GuestOnly 反向守卫（本项目已实现）',
            language: 'jsx',
            body: `/**
 * GuestOnly：反向守卫 —— 已登录用户不应再看到登录页
 * 典型场景：用户已登录还访问 /login → 踢回首页或仪表盘
 */
function GuestOnly() {
  if (isLoggedIn()) {
    // 已登录：不让进登录页，重定向到演示首页
    return <Navigate to="/demo/auth" replace />
  }
  // 未登录：正常渲染子路由（LoginPage）
  return <Outlet />
}

// 路由配置：GuestOnly 包裹登录页
{
  element: <GuestOnly />,  // 无 path，纯守卫层
  children: [
    { path: 'demo/auth/login', element: <LoginPage /> },
  ],
}`,
          },
          {
            type: 'code',
            title: '案例 4：RequireRole + 嵌套（admin → 403）',
            language: 'jsx',
            body: `/**
 * RequireRole：角色守卫 —— 登录了但权限不够 → 403
 * allow：允许访问的角色数组，如 ['admin']
 */
function RequireRole({ allow = [] }) {
  const role = getRole() // 从 localStorage 读：'user' | 'admin'
  if (!allow.includes(role)) {
    // 角色不在白名单 → 跳 403 说明页（不是 404，路径存在但没权限）
    return <Navigate to="/demo/auth/403" replace />
  }
  return <Outlet />  // 角色 OK → 继续渲染子路由（AdminPage）
}

// 守卫嵌套：先 RequireAuth（登录）再 RequireRole（角色）
{
  element: <RequireAuth />,  // 第一层：必须登录
  children: [
    { path: 'demo/auth/profile', element: <ProfilePage /> },
    {
      element: <RequireRole allow={['admin']} />,  // 第二层：必须 admin
      children: [
        { path: 'demo/auth/admin', element: <AdminPage /> },
      ],
    },
  ],
}`,
          },
          {
            type: 'code',
            title: '403 页面（公开，谁都能看说明）',
            language: 'jsx',
            body: `// 403 页面：公开路由，谁都能打开看说明（不需要 RequireAuth）
function ForbiddenPage() {
  return (
    <div>
      <h1>403 没有权限</h1>
      <p>你的角色不能访问该页面。</p>
      {/* Link：声明式跳转，不刷新整页 */}
      <Link to="/demo/auth/login">换账号登录</Link>
      <Link to="/">回首页</Link>
    </div>
  )
}

// 路由（公开，不包在 RequireAuth 里）：
{ path: 'demo/auth/403', element: <ForbiddenPage /> }`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：登录守卫 + 登录回跳 + 角色 403（未登录先点「用户管理」试试）',
            body: `import { useState } from 'react' // 用普通 state 手写守卫，把 RequireAuth 的判断逻辑摊开给你看

// 菜单表：need 表示这条路由的准入要求。真实项目里这份信息写在 routes 数组的守卫层里
const MENUS = [
  { path: '/', label: '首页', need: 'public' },                    // 公开页，谁都能进
  { path: '/profile', label: '个人中心', need: 'login' },          // 需要登录 → RequireAuth
  { path: '/users', label: '用户管理', need: 'admin' },            // 需要 admin 角色 → RequireAuth + RequireRole
]

export default function Demo() {
  const [user, setUser] = useState(null)      // null = 未登录；真实项目里这份数据来自 localStorage / Redux
  const [path, setPath] = useState('/')       // 当前路径；真实项目里由 BrowserRouter 管理
  const [from, setFrom] = useState('')        // 被拦截前想去的地址；真实项目里是 Navigate 的 state={{ from: location }}
  const [tip, setTip] = useState('')          // 界面上解释「刚刚为什么被拦」，方便你观察守卫行为

  // 守卫本体：真实项目里就是 RequireAuth / RequireRole 里那几行 if，通过返回 <Outlet />，不通过返回 <Navigate />
  function guard(target) {
    const menu = MENUS.find((m) => m.path === target)              // 找到目标路由的准入要求
    if (menu.need !== 'public' && !user) {                         // 要登录却没登录 → 踢去登录页
      return { pass: false, to: '/login', why: '未登录：RequireAuth 把你重定向到登录页，并记下 from=' + target }
    }
    if (menu.need === 'admin' && user.role !== 'admin') {          // 登录了但角色不够 → 403（不是 404）
      return { pass: false, to: '/403', why: '当前角色是 ' + user.role + '，RequireRole 只放行 admin' }
    }
    return { pass: true }                                          // 检查通过，正常渲染目标页
  }

  function go(target) {                                            // 点菜单：先过守卫，再决定真正去哪
    const r = guard(target)
    if (r.pass) { setPath(target); setTip(''); return }            // 放行
    if (r.to === '/login') setFrom(target)                         // 记住原目标，登录成功后跳回去
    setPath(r.to)                                                  // 真实项目里这一步是 <Navigate to={r.to} replace />
    setTip(r.why)
  }

  function login(role) {
    setUser({ name: role === 'admin' ? '管理员' : '小明', role })   // 真实项目：写入 token 后 setUser
    const back = from || '/'                                       // 有 from 就回原目标，没有就回首页
    setPath(back)                                                  // 真实项目：navigate(from, { replace: true })
    setTip('登录成功，自动跳回被拦截前想去的地址：' + back)
    setFrom('')                                                    // 用完清掉，避免下次误跳
  }

  const box = { border: '1px solid #d9d9d9', borderRadius: 8, padding: 14, minHeight: 90, marginTop: 12 }

  return (
    <div>
      <div style={{ marginBottom: 8, fontSize: 13 }}>
        当前身份：{user ? user.name + '（' + user.role + '）' : '未登录'}
        {user && (
          <button onClick={() => { setUser(null); setPath('/'); setTip('已退出登录') }} style={{ marginLeft: 8 }}>
            退出登录
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {MENUS.map((m) => (
          <button key={m.path} onClick={() => go(m.path)} style={{ padding: '4px 10px', cursor: 'pointer' }}>
            {m.label}
          </button>
        ))}
      </div>

      {tip && <p style={{ color: '#d46b08', fontSize: 13, marginTop: 8 }}>守卫提示：{tip}</p>}

      <div style={box}>
        <div style={{ fontSize: 12, color: '#888', fontFamily: 'monospace', marginBottom: 8 }}>地址栏：{path}</div>
        {path === '/' && <p style={{ margin: 0 }}>🏠 首页：公开内容，谁都能看。</p>}
        {path === '/profile' && <p style={{ margin: 0 }}>🙋 个人中心：只有登录用户能看到（RequireAuth 放行）。</p>}
        {path === '/users' && <p style={{ margin: 0 }}>🛠️ 用户管理：admin 专属后台（RequireRole 放行）。</p>}
        {path === '/403' && <p style={{ margin: 0, color: '#cf1322' }}>403 没有权限：路径存在，但你的角色不够。</p>}
        {path === '/login' && (
          <div>
            <p style={{ marginTop: 0 }}>🔐 登录页{from && '（登录后会自动回到 ' + from + '）'}</p>
            <button onClick={() => login('user')} style={{ marginRight: 8 }}>以 user 登录</button>
            <button onClick={() => login('admin')}>以 admin 登录</button>
          </div>
        )}
      </div>
    </div>
  )
}`,
          },
          {
            type: 'list',
            title: '4. 怎么用：自己项目加守卫的步骤',
            ordered: true,
            items: [
              '写 isLoggedIn() / getRole() 工具（读 localStorage 或 Redux）',
              '写 RequireAuth、GuestOnly、RequireRole 三个小组件',
              '在 routes 里用「无 path 的父路由 + element: 守卫 + children」包裹受保护页',
              '登录页 Navigate 时带 state.from；登录成功 navigate(from)',
              '403 页单独注册为公开路由，方便展示说明和换账号入口',
              '打开 /demo/auth 逐项点一遍，对照 src/routes/index.js 结构',
            ],
          },
          {
            type: 'text',
            title: '5. 易错：守卫常见坑',
            body: '**忘记 replace**：历史栈堆积，用户点返回在登录页和受保护页之间来回跳。\n\n**state.from 没传或登录页没读**：登录后总是去首页，体验差。\n\n**守卫写在有 path 的 Route 上**：可以，但「无 path 纯守卫父路由 + children」更清晰，一个守卫保护多条子路由。\n\n**只在前端拦**：用户改 localStorage 就能伪造 admin——生产环境 API 必须验 token 和角色。\n\n**RequireAuth 和 GuestOnly 搞反**：登录页应该 GuestOnly（已登录踢走），个人中心应该 RequireAuth（未登录踢走）。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '守卫 = 检查 + Outlet 或 Navigate；RequireAuth 拦未登录并记 from，GuestOnly 拦已登录进登录页，RequireRole 拦无权限进 403——到 /demo/auth 走一遍比背代码快。',
          },
        ],
      },
    },
    {
      id: 'route-404-and-more',
      title: '404 页面、未保存拦截、整站路由表怎么配',
      summary: 'path:* 自定义 404；beforeunload 脏表单；对照本项目完整 routes',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '404 用 path:"*" 放 children 最后 + 专门 NotFound 页（别静默 Navigate 回家）；脏表单离开用 beforeunload 拦刷新关闭，应用内跳转进阶用 useBlocker。',
          },
          {
            type: 'text',
            title: '1. 是什么：404 与兜底路由',
            body: '用户输入了不存在的路径，或链接写错了——路由器找不到匹配项，需要**兜底处理**。\n\nv6 用 path: \'*\' 匹配「前面都没匹配上」的任意路径。应放在**同一层 children 的最后**，否则会过早吞掉其他路由。\n\n**更好做法**：渲染 NotFoundPage，显示当前 pathname + 回首页链接——用户知道自己输错了。不推荐静默 Navigate to="/"，用户会懵「怎么突然回首页了」。',
          },
          {
            type: 'code',
            title: 'NotFound 页面（本项目 src/pages/NotFound）',
            language: 'jsx',
            body: `// NotFound 404 页面：用户访问不存在的路径时展示友好提示
import { Link, useLocation } from 'react-router-dom'

function NotFoundPage() {
  // useLocation().pathname：当前 URL 路径，如 /this-page-does-not-exist
  const location = useLocation()
  return (
    <div>
      <h1>404 页面不存在</h1>
      {/* 告诉用户具体哪个路径没匹配到，比静默跳首页体验好 */}
      <p>没有匹配到：{location.pathname}</p>
      <Link to="/">回首页</Link>
    </div>
  )
}

// routes 里（必须放在 children 最后，否则会过早拦截其他路由）：
{ path: '*', element: <NotFoundPage /> }

// ❌ 不推荐：静默 Navigate 回首页，用户不知道自己输错了 URL
// { path: '*', element: <Navigate to="/" replace /> }`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：地址栏里随便敲一个不存在的路径，看 404 兜底是怎么生效的',
            body: `import { useState } from 'react' // 用 state 假装地址栏，观察「匹配不上就走 * 兜底」的过程

// 已注册的路由表；真实项目里 path:'*' 那条必须放在同级 children 的最后
const routes = [
  { path: '/', title: '首页', text: '欢迎回来～' },
  { path: '/about', title: '关于我们', text: '这是一个教学项目。' },
  { path: '/lesson/router', title: '路由章节', text: '正在阅读路由课程。' },
]

export default function Demo() {
  const [input, setInput] = useState('/lesson/router') // 输入框里正在编辑的路径
  const [path, setPath] = useState('/')                // 已经「回车跳转」过去的当前路径

  const matched = routes.find((r) => r.path === path)  // 逐条匹配；真实项目里这是路由器内部做的

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: '#888' }}>地址栏</span>
        <input
          value={input}                                                  // 受控输入框
          onChange={(e) => setInput(e.target.value)}                     // 输入时同步到 state
          onKeyDown={(e) => { if (e.key === 'Enter') setPath(input) }}   // 回车 = 真正跳转
          style={{ flex: 1, padding: '4px 8px', fontFamily: 'monospace' }}
        />
        <button onClick={() => setPath(input)}>前往</button>
        {/* 快捷按钮：一键试一个肯定不存在的路径 */}
        <button onClick={() => { setInput('/no-such-page'); setPath('/no-such-page') }}>试个不存在的</button>
      </div>

      <div style={{ marginTop: 12, border: '1px solid #d9d9d9', borderRadius: 8, padding: 16, minHeight: 90 }}>
        {matched ? (
          <div>
            <h4 style={{ margin: '0 0 6px' }}>{matched.title}</h4>
            <p style={{ margin: 0 }}>{matched.text}</p>
          </div>
        ) : (
          // 这一整块就是 NotFoundPage：告诉用户「哪个路径」没匹配上，比静默跳首页友好得多
          <div>
            <h4 style={{ margin: '0 0 6px', color: '#cf1322' }}>404 页面不存在</h4>
            <p style={{ margin: '0 0 10px' }}>没有匹配到：<code>{path}</code></p>
            {/* 真实项目里这是 <Link to="/">回首页</Link> */}
            <button onClick={() => { setInput('/'); setPath('/') }}>回首页</button>
          </div>
        )}
      </div>

      <p style={{ fontSize: 13, color: '#666', marginTop: 10 }}>
        已注册路径只有 / 、/about 、/lesson/router，其余全部落到 path:'*' 这条兜底规则上。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '2. 是什么：表单未保存离开',
            body: '用户填了表单还没保存，就要关标签页、刷新、或点链接离开——应该提示「有未保存更改」。\n\n**关标签页 / 刷新**：浏览器原生 beforeunload 事件（本项目 /demo/auth/unsaved 已演示）。\n\n**应用内跳转（点 Link）**：BrowserRouter 下完整方案是 useBlocker（v6.4+ 数据路由更完整）；本项目用「脏标记 dirty + confirm」演示核心思路。\n\n打开 **/demo/auth/unsaved**，输入文字后尝试刷新或离开，观察浏览器提示。',
          },
          {
            type: 'code',
            title: 'beforeunload 核心（本项目 UnsavedFormPage）',
            language: 'jsx',
            body: `// 脏表单拦截：用户有未保存修改时，关标签页/刷新应弹出浏览器原生提示
const [dirty, setDirty] = useState(false)  // dirty=true 表示表单有未保存改动

useEffect(() => {
  // beforeunload：浏览器「即将离开页面」事件（关标签、刷新、输入新 URL）
  function onBeforeUnload(e) {
    if (!dirty) return  // 没有未保存改动，不拦截
    e.preventDefault()
    // 现代浏览器忽略自定义文案，设空字符串即可触发系统默认提示
    e.returnValue = ''
  }
  window.addEventListener('beforeunload', onBeforeUnload)
  // 清理：组件卸载时移除监听，避免内存泄漏
  return () => window.removeEventListener('beforeunload', onBeforeUnload)
}, [dirty])  // dirty 变化时重新绑定

// 用户输入时 setDirty(true)；保存成功 setDirty(false)
// 注意：beforeunload 拦不住 SPA 内 Link 跳转，完整方案需 useBlocker（进阶）`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：表单没保存就想离开？自己画一个确认弹层拦住他',
            body: `import { useState } from 'react' // 不用浏览器原生 confirm（它会阻塞线程、样式也丑），自己画一层

export default function Demo() {
  const [path, setPath] = useState('/edit')  // 当前页面；真实项目里由路由管理
  const [text, setText] = useState('')       // 表单内容
  const [saved, setSaved] = useState('')     // 上次保存下来的内容
  const [pending, setPending] = useState('') // 「待确认要去的那个路径」，非空时弹层可见

  const dirty = text !== saved               // 脏标记：输入框内容和已保存内容不一致 = 有未保存改动

  // 统一的跳转入口：真实项目里这里是 useBlocker 的回调，或在 navigate 前手动拦一道
  function tryGo(target) {
    if (path === '/edit' && dirty) { setPending(target); return } // 有未保存改动 → 先弹确认层，不跳
    setPath(target)                                               // 干净 → 直接跳
  }

  const btn = { padding: '4px 10px', cursor: 'pointer', marginRight: 8 }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ marginBottom: 10 }}>
        <button style={btn} onClick={() => tryGo('/edit')}>编辑页</button>
        <button style={btn} onClick={() => tryGo('/list')}>列表页</button>
        <span style={{ fontSize: 12, color: dirty ? '#d46b08' : '#389e0d' }}>
          {dirty ? '● 有未保存改动' : '○ 已保存'}
        </span>
      </div>

      <div style={{ border: '1px solid #d9d9d9', borderRadius: 8, padding: 14, minHeight: 110 }}>
        {path === '/edit' ? (
          <div>
            <p style={{ marginTop: 0 }}>📝 编辑页：改点东西，然后去点「列表页」试试</p>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}   // 每次输入都会让 dirty 变 true
              placeholder="随便输点内容"
              style={{ padding: '4px 8px', width: '60%' }}
            />
            <button style={{ ...btn, marginLeft: 8 }} onClick={() => setSaved(text)}>
              保存
            </button>
          </div>
        ) : (
          <p style={{ margin: 0 }}>📄 列表页：你已经安全离开编辑页了。</p>
        )}
      </div>

      {/* 自己画的确认弹层：比 window.confirm 可控（能自定义文案、样式、第三个按钮） */}
      {pending && (
        <div
          style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8,
          }}
        >
          <div style={{ background: '#fff', borderRadius: 8, padding: 18, width: 300 }}>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>离开前确认</div>
            <p style={{ fontSize: 13, color: '#666', marginTop: 0 }}>
              当前表单有未保存的修改，确定要离开去 {pending} 吗？
            </p>
            <div style={{ textAlign: 'right' }}>
              <button style={btn} onClick={() => setPending('')}>留下继续编辑</button>
              {/* 确认离开：把内容丢弃（真实项目也可以「先保存再跳」） */}
              <button
                style={{ ...btn, marginRight: 0, background: '#cf1322', color: '#fff', border: 'none' }}
                onClick={() => { setText(saved); setPath(pending); setPending('') }}
              >
                放弃修改并离开
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '常见路由需求 → 做法 → 本项目 Demo',
            intro: '把项目里几乎总会碰到的路由需求汇总——建议逐项点到对应路径。',
            headers: ['需求', '做法', 'Demo 路径'],
            rows: [
              ['多页面切换', 'routes + useRoutes', '全站任意路径'],
              ['嵌套布局顶栏', 'Layout + Outlet', '全站（MainLayout）'],
              ['动态详情参数', ':id + useParams', '/lesson/router/...'],
              ['未登录进个人中心', 'RequireAuth', '/demo/auth/profile'],
              ['登录后回原页', 'location.state.from', '登录流程（先点 profile 再登录）'],
              ['已登录进登录页', 'GuestOnly', '/demo/auth/login'],
              ['无权限进后台', 'RequireRole → 403', '/demo/auth/admin'],
              ['403 说明页', 'ForbiddenPage', '/demo/auth/403'],
              ['404', "path:'*' + NotFoundPage", '/this-page-does-not-exist'],
              ['未保存离开', 'beforeunload + dirty', '/demo/auth/unsaved'],
            ],
            note: '顶部导航「路由演示」入口汇总了 /demo/auth 下全部案例。',
          },
          {
            type: 'code',
            title: '本项目完整路由结构（精简注释版）',
            language: 'jsx',
            body: `// 本项目完整路由结构（精简注释版）—— 建议对照 src/routes/index.js 阅读
const routes = [
  {
    path: '/',
    element: <MainLayout />,  // 全站共享布局
    children: [
      { index: true, element: <Home /> },
      { path: 'lesson/:categoryId/:itemId', element: <LessonDetail /> },
      { path: 'demo/json-server', element: <JsonServerDemo /> },
      { path: 'demo/auth', element: <AuthDemoHome /> },       // 公开：演示首页
      { path: 'demo/auth/403', element: <ForbiddenPage /> }, // 公开：403 说明

      // GuestOnly：已登录用户不能进登录页
      { element: <GuestOnly />, children: [
          { path: 'demo/auth/login', element: <LoginPage /> },
      ]},

      // RequireAuth：未登录不能进 profile / unsaved / admin
      { element: <RequireAuth />, children: [
          { path: 'demo/auth/profile', element: <ProfilePage /> },
          { path: 'demo/auth/unsaved', element: <UnsavedFormPage /> },
          // 嵌套 RequireRole：admin 才能进后台
          { element: <RequireRole allow={['admin']} />, children: [
              { path: 'demo/auth/admin', element: <AdminPage /> },
          ]},
      ]},

      { path: '*', element: <NotFoundPage /> },  // 404 兜底，放最后
    ],
  },
]`,
          },
          {
            type: 'list',
            title: '3. 为什么：推荐学习顺序',
            ordered: true,
            items: [
              '① BrowserRouter + 路由表 + Outlet 跑通基础切换',
              '② Link / navigate 会跳转',
              '③ useParams 读动态段',
              '④ 理解 useRoutes 和 JSX Route 等价',
              '⑤ RequireAuth + 登录回跳（/demo/auth/profile）',
              '⑥ GuestOnly、RequireRole、403、404',
              '⑦ 脏表单 beforeunload（/demo/auth/unsaved）',
              '⑧ 以后再学 createBrowserRouter / loader / useBlocker',
            ],
          },
          {
            type: 'text',
            title: '4. 易错：404 与未保存',
            body: '**path: "*" 不在最后**：会拦截后面所有路由（其实后面也没有，但逻辑上要养成习惯）。\n\n**404 和 403 混淆**：404 是「路径不存在」；403 是「路径存在但没权限」——两者页面文案要区分。\n\n**beforeunload 无法自定义文案**：现代浏览器只显示系统默认提示，returnValue 设空字符串即可。\n\n**只拦 beforeunload 不拦 SPA 内跳转**：用户点 Link 仍会 silent 离开——完整方案要 useBlocker 或全局 dirty 拦截。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '404 用 * 兜底 + 友好页；守卫分层 RequireAuth 套 RequireRole；登录回跳靠 state.from；打开顶部「路由演示」按表逐项点 /demo/auth 比只看文档快。',
          },
        ],
      },
    },
    {
      id: 'route-lazy-suspense',
      title: '路由懒加载：React.lazy + Suspense（首屏提速）',
      summary:
        '不做懒加载，首屏要下载整站代码；React.lazy 把每个页面拆成单独 chunk，用到才下载，Suspense 负责下载期间的占位',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'const Report = React.lazy(() => import(\'./pages/Report\'))，再用 <Suspense fallback={骨架屏}> 包住路由出口——页面代码被拆成独立 chunk（代码块），用户点到那个路由才去下载，首屏因此变小变快。',
          },
          {
            type: 'text',
            title: '1. 为什么需要：不拆包时首屏在下载整个网站',
            body: '打包工具（Webpack / Vite）默认会把你 import 进来的所有页面**打进同一个 JS 文件**。假设你有 30 个页面，其中「报表页」引了一个 500KB 的图表库——那么用户只是想看首页，浏览器也得先把这 500KB 一起下载、解析、执行完，首屏才出得来。\n\n**代码分割（code splitting）** 就是把这一个大包切成很多小 chunk：首屏只下载首屏要的那块，其余的等用户真正点进去再下载。路由是最自然的切割线，因为「一个路由 = 一个页面 = 一整块用户当下不一定需要的代码」。\n\n效果很直观：首屏 JS 从 1.2MB 降到 200KB，白屏时间可能从 3 秒降到 1 秒以内；代价是切换到没访问过的页面时，会多一次几十到几百毫秒的 chunk 下载——这就是 Suspense fallback 要盖住的那段时间。',
          },
          {
            type: 'text',
            title: '2. 怎么写：React.lazy 只做一件事',
            body: 'React.lazy(fn) 接收一个「返回 Promise 的函数」，这个 Promise 要 resolve 出一个含 default 导出的模块。**动态 import() 刚好就返回这样的 Promise**，所以标准写法永远是 React.lazy(() => import(\'./pages/Report\'))。\n\n注意 import(\'...\') 带括号，是**动态导入**（运行时才发请求），和文件顶部那种静态 import 完全不是一回事——打包工具看到动态 import() 就会自动把这个模块单独打成一个 chunk 文件。\n\nlazy 返回的是一个「占位组件」。第一次渲染它时模块还没到，React 会把渲染**挂起（suspend）**，向上找最近的 <Suspense>，先渲染 fallback；等 chunk 下载完，再把真正的组件换上去。**所以没有 Suspense 就会直接报错**：A component suspended while responding to synchronous input。',
          },
          {
            type: 'code',
            title: '基本写法：lazy + Suspense 三行看懂',
            language: 'jsx',
            body: `// lazy：声明「这个组件的代码单独打包，用到再下载」
// Suspense：声明「下载期间先显示什么」
import { lazy, Suspense } from 'react'

// ★ 动态 import() 返回 Promise，打包工具会把 Report.js 单独打成一个 chunk 文件
// ★ Report.js 必须是 export default 一个组件，否则运行时报 undefined
const Report = lazy(() => import('./pages/Report'))

function App() {
  return (
    // fallback：chunk 还在下载时渲染的内容，必须给，且建议带最小高度
    <Suspense fallback={<div style={{ minHeight: 300 }}>加载中…</div>}>
      {/* 第一次渲染 Report 时 React 会「挂起」，先显示 fallback；chunk 到了再换成真组件 */}
      <Report />
    </Suspense>
  )
}

export default App`,
          },
          {
            type: 'code',
            title: '完整可抄：整份懒加载路由表（含首屏不懒加载的取舍）',
            language: 'jsx',
            body: `// ---------- src/routes/index.js：懒加载版路由表（可直接抄）----------
import { lazy, Suspense } from 'react'
import { Navigate } from 'react-router-dom'

// 布局壳和首页「不」懒加载：它们首屏必然要用，拆出去反而多一次请求
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'

// 其余页面统统懒加载：每个 lazy() 都会生成一个独立 chunk
const LessonDetail = lazy(() => import('../pages/LessonDetail'))
const Report = lazy(() => import('../pages/Report'))       // 这个页面引了很大的图表库
const Settings = lazy(() => import('../pages/Settings'))
const NotFound = lazy(() => import('../pages/NotFound'))

/**
 * 小工具：给懒加载页面套一层 Suspense
 * 为什么写成函数：每个路由都手写一遍 <Suspense fallback={...}> 太啰嗦
 */
function lazyPage(node) {
  return (
    // minHeight 很关键：占住位置，chunk 到了内容撑开时不会「跳一下」
    <Suspense fallback={<div style={{ minHeight: 320, padding: 24, color: '#999' }}>页面加载中…</div>}>
      {node}
    </Suspense>
  )
}

const routes = [
  {
    path: '/',
    element: <MainLayout />,                       // 布局同步加载，切页时顶栏始终在
    children: [
      { index: true, element: <Home /> },          // 首页同步加载，首屏零等待
      { path: 'lesson/:categoryId/:itemId', element: lazyPage(<LessonDetail />) },
      { path: 'report', element: lazyPage(<Report />) },
      { path: 'settings', element: lazyPage(<Settings />) },
      { path: '*', element: lazyPage(<NotFound />) },  // 404 页也可以懒加载
    ],
  },
]

export default routes

// ★ 另一种更省事的写法：只在 MainLayout 的 <Outlet /> 外面包一层 Suspense
// function MainLayout() {
//   return (
//     <div>
//       <Header />
//       <Suspense fallback={<PageSkeleton />}>
//         <Outlet />   {/* 所有子路由共用这一个 fallback */}
//       </Suspense>
//     </div>
//   )
// }`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：亲眼看懒加载——第一次点要等 chunk 下载，第二次点秒开',
            body: `import { useState } from 'react' // 沙箱里没法真的发网络请求，用 setTimeout 模拟「下载 chunk」的耗时

// 假装这是三个路由页面，size 表示这个页面的 chunk 有多大（越大下载越久）
const PAGES = [
  { key: 'home', label: '首页', size: 40, ms: 400, text: '🏠 首页内容（真实项目里通常不懒加载，首屏直接给）' },
  { key: 'report', label: '报表页', size: 620, ms: 1400, text: '📊 报表页内容（引了很大的图表库，最该懒加载）' },
  { key: 'setting', label: '设置页', size: 90, ms: 600, text: '⚙️ 设置页内容（用户不一定会点开）' },
]

export default function Demo() {
  const [current, setCurrent] = useState('')   // 当前显示的页面 key
  const [loaded, setLoaded] = useState([])     // 已经下载过 chunk 的页面：React 内部也维护着这样一份缓存
  const [loading, setLoading] = useState(null) // 正在下载的那个页面对象，非空时显示 Suspense 的 fallback

  function open(page) {
    if (loaded.includes(page.key)) {           // ★ 已经下载过 → 直接切换，零等待（第二次点就是这条路径）
      setCurrent(page.key)
      return
    }
    setLoading(page)                           // ★ 第一次点 → React 把渲染「挂起」，显示 fallback
    // 真实项目里这段等待是浏览器在下载 import('./pages/Xxx') 拆出来的那个 chunk 文件
    setTimeout(() => {
      setLoaded((prev) => [...prev, page.key]) // chunk 到位，记进缓存
      setLoading(null)
      setCurrent(page.key)                     // 真正的组件替换掉 fallback
    }, page.ms)
  }

  const page = PAGES.find((p) => p.key === current) // 当前要渲染的页面数据

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
        {PAGES.map((p) => (
          <button key={p.key} onClick={() => open(p)} disabled={!!loading} style={{ padding: '4px 10px', cursor: 'pointer' }}>
            {p.label}
            {/* 已下载过的标个勾，提示这次点击不会再等 */}
            <span style={{ marginLeft: 6, fontSize: 12, color: loaded.includes(p.key) ? '#389e0d' : '#999' }}>
              {loaded.includes(p.key) ? '✓已缓存' : p.size + 'KB'}
            </span>
          </button>
        ))}
        <button onClick={() => { setLoaded([]); setCurrent('') }} style={{ padding: '4px 10px', cursor: 'pointer' }}>
          清空缓存（相当于刷新页面）
        </button>
      </div>

      {/* minHeight 固定：这就是 fallback 要给最小高度的原因，内容到位时布局不会跳动 */}
      <div style={{ border: '1px solid #d9d9d9', borderRadius: 8, padding: 16, minHeight: 130 }}>
        {loading ? (
          // ↓↓↓ 这一整块就是 <Suspense fallback={...}> 里写的东西：骨架屏
          <div>
            <p style={{ marginTop: 0, color: '#d46b08', fontSize: 13 }}>
              ⏳ 这段等待就是在下载 {loading.label} 的 chunk（约 {loading.size}KB）
            </p>
            {[100, 85, 60].map((w) => (
              <div key={w} style={{ height: 14, width: w + '%', background: '#f0f0f0', borderRadius: 4, marginBottom: 8 }} />
            ))}
          </div>
        ) : page ? (
          <div>
            <p style={{ margin: 0 }}>{page.text}</p>
            <p style={{ fontSize: 12, color: '#888', marginBottom: 0 }}>
              再点一次「{page.label}」试试：chunk 已在内存里，React 直接渲染，不会再有等待。
            </p>
          </div>
        ) : (
          <p style={{ margin: 0, color: '#999' }}>点上面的菜单，观察第一次点和第二次点的区别。</p>
        )}
      </div>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '3. 加载失败怎么办：chunk 请求会失败，必须兜底',
            body: '懒加载把「渲染组件」变成了一次**网络请求**，网络请求就会失败：用户网差、断网、或者你刚发布新版本导致旧 chunk 文件名已经不存在（这个非常常见，用户开着旧页面不刷新，点进新页面就 404）。\n\nSuspense 只管「还没到」，**不管「到不了」**。要处理失败必须再包一层**错误边界（Error Boundary，一个能捕获子树渲染错误的类组件）**：捕获到错误就显示「加载失败，点击重试」，重试按钮改一个 key 强制重新挂载，React 会重新发起那次 import()。\n\n生产上还有个常用兜底：错误信息里包含 ChunkLoadError 或 Loading chunk failed 时，直接 window.location.reload() 拉一次最新的 index.html——因为这多半是版本更新导致的旧 chunk 失效。',
          },
          {
            type: 'code',
            title: '错误边界 + 重试（可直接抄进项目）',
            language: 'jsx',
            body: `import { Component, Suspense, lazy, useState } from 'react'

/**
 * ChunkErrorBoundary：错误边界必须是 class 组件（函数组件目前没有等价 API）
 * 它捕获子树渲染阶段抛出的错误，包括 lazy 下载失败抛出的错误
 */
class ChunkErrorBoundary extends Component {
  state = { error: null }                       // error 非空表示子树炸了

  // 静态方法：子组件抛错时被调用，返回值会合并进 state，触发降级 UI
  static getDerivedStateFromError(error) {
    return { error }
  }

  // 副作用位置：上报监控。chunk 失效多半是发版导致，可以在这里直接刷新页面
  componentDidCatch(error) {
    if (/ChunkLoadError|Loading chunk .* failed/.test(error.message)) {
      // window.location.reload()   // 生产环境常用兜底：拉一次最新的 index.html
    }
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24 }}>
          <p>页面加载失败，请检查网络后重试。</p>
          {/* 清空 error 让子树重新渲染，lazy 会重新发起一次 import() */}
          <button onClick={() => this.setState({ error: null })}>重试</button>
        </div>
      )
    }
    return this.props.children               // 没出错就正常渲染子树
  }
}

const Report = lazy(() => import('./pages/Report'))

function App() {
  const [retryKey, setRetryKey] = useState(0)  // 改 key 可以强制整棵子树重新挂载

  return (
    // ★ 顺序：ErrorBoundary 在外，Suspense 在内 —— 先接住错误，再接住「还没到」
    <ChunkErrorBoundary key={retryKey}>
      <Suspense fallback={<div style={{ minHeight: 320 }}>加载中…</div>}>
        <Report />
      </Suspense>
    </ChunkErrorBoundary>
  )
}

export default App`,
          },
          {
            type: 'table',
            title: '哪些该懒加载，哪些不该',
            intro: '不是拆得越碎越好——每个 chunk 都是一次额外的 HTTP 请求。',
            headers: ['模块', '建议', '原因'],
            rows: [
              ['首页 / 布局壳 MainLayout', '不懒加载', '首屏必然要用，拆出去反而多一次往返'],
              ['登录页', '通常不懒加载', '未登录用户第一站，等待感最明显'],
              ['报表 / 富文本编辑器 / 地图页', '强烈建议懒加载', '依赖体积大，且多数用户不会点开'],
              ['后台管理、设置页', '建议懒加载', '低频访问'],
              ['404 页', '可懒加载', '正常用户几乎不会触发'],
              ['一个页面里的小组件', '看情况', '低于 30KB 拆了收益不大，反而多请求'],
            ],
            note: '判断标准：这块代码「多数用户在首屏用不到」且「体积不小」，就值得 lazy。',
          },
          {
            type: 'list',
            title: '4. 易错点清单（踩过的人都点头）',
            ordered: true,
            items: [
              'lazy 的模块必须是 default export：export default function Report(){} —— 只有具名导出会拿到 undefined，报错 Element type is invalid',
              '具名导出要用 lazy(() => import(\'./x\').then(m => ({ default: m.Report })))——手动包一层 default',
              '不要在组件内部调用 lazy()：写在组件里每次渲染都会生成新的 lazy 组件，导致整页反复卸载重挂、loading 闪个不停。lazy 一定放模块顶层',
              'fallback 要有最小高度（minHeight）：否则 loading 时容器塌成一条线，内容到位又撑开，页面「跳一下」，体验很差',
              '忘了包 Suspense：报错 A component suspended while responding to synchronous input',
              'import() 里不能写完全动态的变量路径：import(path) 打包工具分析不了，至少要写成 import(\'./pages/\' + name) 这种带静态前缀的形式',
              '开发环境感觉不到效果：本地 chunk 秒下，要在 Network 面板把网速调成 Slow 3G 才看得出差别',
            ],
          },
          {
            type: 'text',
            title: '5. 顺带解决：切换路由后页面停在半山腰',
            body: '懒加载做完你多半会碰到另一个体验 bug：从一篇长文章的底部点进另一个页面，新页面**打开时滚动条还停在中间**。因为 SPA 切路由并不刷新浏览器，滚动位置自然不会重置。\n\n解决办法是一个「什么都不渲染、只干副作用」的小组件：监听 pathname 变化，变了就 window.scrollTo({ top: 0 })。本项目已经写好了，就在 **src/components/ScrollToTop.js**，挂在布局层即可。\n\n它还多做了一件事：如果 URL 带 hash（如 /doc#faq），就不强制回顶，而是滚到对应锚点元素——因为用户点锚点链接的本意就是跳到那一段。\n\n和懒加载配合时注意顺序：chunk 还在下载时 fallback 高度可能很小，此时滚动无处可去；等真实内容撑开后位置才准。给 fallback 一个接近真实内容的 minHeight，能顺带让滚动恢复更稳。',
          },
          {
            type: 'code',
            title: '本项目 src/components/ScrollToTop.js（照抄即可）',
            language: 'jsx',
            body: `import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * 路由切换时把页面滚回顶部
 * 若 URL 带 hash（如 /#contact），滚到对应锚点，不强制回顶
 */
function ScrollToTop() {
  // useLocation：URL 一变这个组件就重新渲染，effect 依赖因此被触发
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')          // #faq → faq
      // 等一帧：确保目标元素（尤其是懒加载刚到位的内容）已经挂载，否则找不到
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 0)
      return () => window.clearTimeout(timer)   // 清理定时器，避免组件卸载后还执行
    }

    // 普通换页：立刻回到顶部。用 'auto' 而不是 'smooth'，避免换页时看到一段多余的滚动动画
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    return undefined
  }, [pathname, search, hash])                  // 三者任一变化都重新执行

  return null                                   // 只做副作用，不渲染任何 DOM
}

export default ScrollToTop

// 用法：挂在布局层，和 <Outlet /> 同级即可
// <MainLayout>
//   <ScrollToTop />
//   <Outlet />
// </MainLayout>`,
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'lazy 放模块顶层 + 目标组件 default export + Suspense fallback 带 minHeight + 外面再套错误边界防 chunk 下载失败；首页和布局别懒加载；顺手挂个 ScrollToTop 让换页回到顶部。',
          },
        ],
      },
    },
    {
      id: 'link-navigate-full',
      title: '跳转三件套：Link、NavLink、useNavigate',
      summary: '用户能点的链接用 Link/NavLink；登录成功、提交后等逻辑跳转用 useNavigate',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '用户能点的链接 → Link / NavLink（声明式）；代码里逻辑触发 → useNavigate（命令式）——Link 不刷新整页，useNavigate 必须在 BrowserRouter 内调用。',
          },
          {
            type: 'text',
            title: '1. 是什么：两种导航方式',
            body: '**声明式导航**：在 JSX 里写 <Link to="/about">，像超链接一样表达「这里能去哪」。React Router 拦截点击，只换组件不刷新页面。\n\n**命令式导航**：在事件处理函数里调用 navigate(\'/home\')——适合「登录成功后跳转」「表单提交完跳转」「权限不足踢回首页」等**逻辑触发**的场景。\n\n**NavLink** 是 Link 的增强版：当前 URL 匹配 to 时自动高亮（active class），适合 tab 菜单、侧边栏。',
          },
          {
            type: 'table',
            title: 'Link vs NavLink vs useNavigate vs <a>',
            intro: '什么时候用哪个？对照这张表。',
            headers: ['API', '渲染/调用', '典型场景', '注意'],
            rows: [
              ['<a href>', '原生超链接', '外链、下载、mailto', '会整页刷新，SPA 内别用'],
              ['Link', '<a> + 前端路由', '菜单、卡片、面包屑、品牌 logo', 'to 可以是字符串或对象'],
              ['NavLink', 'Link + active 状态', 'Tab 导航、侧边栏当前项高亮', '嵌套路由时加 end 避免父路径误高亮'],
              ['useNavigate()', '函数 navigate(...)', '登录成功、提交后、守卫内踢走', '必须在 Router 上下文内'],
            ],
            note: '本项目 Header 里 Link to="/" 回首页——见 src/components/Header/index.js。',
          },
          {
            type: 'text',
            title: '2. 特点：navigate 常用选项',
            body: '**navigate(\'/\')**：去绝对路径。\n\n**navigate(-1)**：后退一页，等同浏览器返回。\n\n**navigate(\'/login\', { replace: true })**：替换当前历史记录——用户点返回不会回到被替换的页（登录成功后常用）。\n\n**navigate(\'/detail/1\', { state: { from: \'list\' } })**：带隐式状态，下一页用 useLocation().state 读——**刷新后 state 会丢**，重要数据放 URL 或重新请求。\n\n**navigate(\'detail\')**：相对路径，相对当前 URL（嵌套路由里常用）。',
          },
          {
            type: 'code',
            title: '完整可抄 demo：Link + NavLink 导航栏',
            language: 'jsx',
            body: `// Link / NavLink：声明式导航 —— 用户能点的链接，拦截点击后只换组件不刷新整页
import { Link, NavLink } from 'react-router-dom'

/**
 * 顶部导航 Demo
 * - Link：普通跳转，无「当前页高亮」
 * - NavLink：当前 URL 匹配 to 时 isActive=true，适合 Tab / 侧边栏
 */
function SiteNav() {
  // NavLink 的 style 可接收函数：{ isActive } 表示当前项是否激活
  const linkStyle = ({ isActive }) => ({
    padding: '8px 12px',
    textDecoration: 'none',
    color: isActive ? '#2563eb' : '#374151',
    fontWeight: isActive ? 600 : 400,
    borderBottom: isActive ? '2px solid #2563eb' : '2px solid transparent',
  })

  return (
    <header style={{ display: 'flex', gap: 16, padding: 16, borderBottom: '1px solid #eee' }}>
      {/* Link：品牌 logo 一般不需要 active 高亮 */}
      <Link to="/" style={{ fontWeight: 700, textDecoration: 'none', color: '#111' }}>
        我的站点
      </Link>

      <nav style={{ display: 'flex', gap: 8 }}>
        {/* NavLink + end：end 表示「精确匹配」—— 避免 / 误匹配 /about 等子路径 */}
        <NavLink to="/" style={linkStyle} end>
          首页
        </NavLink>
        <NavLink to="/about" style={linkStyle}>
          关于
        </NavLink>
        <NavLink to="/users" style={linkStyle}>
          用户
        </NavLink>
      </nav>
    </header>
  )
}

// 带动态路径参数的 Link —— to 可以是模板字符串
function LessonLink({ categoryId, itemId, title }) {
  return (
    <Link to={\`/lesson/\${categoryId}/\${itemId}\`}>
      {title}
    </Link>
  )
}

// 带查询参数的 Link —— to 也可以是对象 { pathname, search }
function SearchLink({ keyword }) {
  return (
    <Link to={{ pathname: '/search', search: \`?q=\${encodeURIComponent(keyword)}\` }}>
      搜索「{keyword}」
    </Link>
  )
}

export { SiteNav, LessonLink, SearchLink }`,
          },
          {
            type: 'code',
            title: '完整可抄 demo：useNavigate 四种常见场景',
            language: 'jsx',
            body: `// useNavigate：命令式导航 —— 在事件处理函数里「代码触发」跳转（登录成功、提交后等）
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function LoginPage() {
  // useNavigate() 返回 navigate 函数，必须在 BrowserRouter 内调用
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // 场景 1：登录成功后跳首页
  async function handleLogin() {
    setLoading(true)
    try {
      // await http.post('/login', { account, password })
      await new Promise((r) => setTimeout(r, 800))  // 模拟网络延迟
      localStorage.setItem('token', 'demo-token')
      // replace: true → 替换历史记录，用户点返回不会回到登录页
      navigate('/', { replace: true })
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  // 场景 2：取消 / 返回上一页（等同浏览器后退按钮）
  function handleCancel() {
    navigate(-1)
  }

  return (
    <div>
      <h2>登录</h2>
      <button type="button" onClick={handleLogin} disabled={loading}>
        {loading ? '登录中...' : '登录'}
      </button>
      <button type="button" onClick={handleCancel}>
        返回
      </button>
    </div>
  )
}

function CreatePostPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')

  // 场景 3：创建成功后跳详情页，并带隐式 state
  async function handleSubmit(e) {
    e.preventDefault()
    // const post = await http.post('/posts', { title })
    const fakeId = Date.now()
    navigate(\`/posts/\${fakeId}\`, {
      replace: true,
      // state：隐式传参，下一页用 useLocation().state 读（刷新会丢！）
      state: { message: '创建成功' },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button type="submit">发布</button>
    </form>
  )
}

function ProtectedPage() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  // 场景 4：组件内即时重定向（也可写在路由守卫 RequireAuth 里）
  if (!token) {
    navigate('/login', { replace: true, state: { from: '/protected' } })
    return null  // 跳转中不渲染内容，避免闪一下
  }

  return <div>受保护的内容</div>
}

export { LoginPage, CreatePostPage, ProtectedPage }`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：Link / NavLink / useNavigate 三者对照（右边能看到历史栈的变化）',
            body: `import { useState } from 'react' // 用一个数组当「浏览器历史栈」，把三种跳转的区别摊开看

const PAGES = {                                    // 路径 → 页面内容，省掉写三个组件
  '/': '🏠 首页内容',
  '/about': 'ℹ️ 关于页内容',
  '/users': '👥 用户列表内容',
  '/login': '🔐 登录页内容',
}

export default function Demo() {
  const [stack, setStack] = useState(['/'])        // 历史记录栈；真实项目里这份数据由浏览器 history 维护
  const [idx, setIdx] = useState(0)                // 当前停在栈的第几条
  const path = stack[idx]                          // 当前路径

  // 迷你 navigate：真实项目里是 const navigate = useNavigate() 拿到的那个函数
  function navigate(to, options) {
    const opt = options || {}
    if (to === -1) {                               // navigate(-1)：后退一页，等同浏览器返回按钮
      setIdx((i) => Math.max(0, i - 1))
      return
    }
    const next = stack.slice(0, idx + 1)           // 从当前位置截断：后退后再跳转，前进历史作废
    if (opt.replace) {
      next[next.length - 1] = to                   // replace: true → 替换当前这条，不新增记录
    } else {
      next.push(to)                                // 默认 push：往历史栈里加一条
    }
    setStack(next)
    setIdx(next.length - 1)
  }

  const linkStyle = (to, active) => ({             // NavLink 的 style 也可以写成函数，接收 { isActive }
    padding: '4px 10px', cursor: 'pointer', borderRadius: 4, border: '1px solid #d9d9d9',
    background: active ? '#1677ff' : '#fff',
    color: active ? '#fff' : '#333',
  })

  return (
    <div style={{ display: 'flex', gap: 14 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>① Link：普通声明式跳转，不高亮</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {/* 真实写法：<Link to="/about">关于</Link> —— 渲染成 <a>，但会拦截点击不刷新整页 */}
          <button onClick={() => navigate('/about')} style={linkStyle('/about', false)}>关于</button>
          <button onClick={() => navigate('/users')} style={linkStyle('/users', false)}>用户列表</button>
        </div>

        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>② NavLink：当前项自动高亮</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {['/', '/about', '/users'].map((p) => (
            // 真实写法：<NavLink to={p} style={({ isActive }) => ...}>；首页那条还要加 end 防止误高亮
            <button key={p} onClick={() => navigate(p)} style={linkStyle(p, path === p)}>{p}</button>
          ))}
        </div>

        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>③ useNavigate：代码里逻辑触发</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {/* 登录成功后常用 replace: true，用户点返回不会又回到登录页 */}
          <button onClick={() => navigate('/login')} style={linkStyle('', false)}>去登录页</button>
          <button onClick={() => navigate('/', { replace: true })} style={linkStyle('', false)}>
            登录成功 navigate('/', &#123; replace: true &#125;)
          </button>
          <button onClick={() => navigate(-1)} disabled={idx === 0} style={linkStyle('', false)}>
            navigate(-1) 返回上一页
          </button>
        </div>
      </div>

      <div style={{ width: 210 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>历史栈（← 当前位置）</div>
        <div style={{ border: '1px solid #d9d9d9', borderRadius: 8, padding: 10, fontFamily: 'monospace', fontSize: 12 }}>
          {stack.map((p, i) => (
            <div key={i} style={{ color: i === idx ? '#1677ff' : '#999' }}>
              {i + 1}. {p} {i === idx ? '←' : ''}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, padding: 10, background: '#fafafa', borderRadius: 8, minHeight: 50 }}>
          {PAGES[path]}
        </div>
      </div>
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: '对照本项目：Header 里的 Link',
            language: 'jsx',
            body: `// src/components/Header/index.js —— 本项目顶栏，对照源码阅读
import { Link } from 'react-router-dom'
import { APP_NAME } from '../../utils/constants'
import './Header.css'

function Header() {
  return (
    <header className="Header">
      <div className="Header-inner">
        {/* Link to="/"：点品牌名回首页，React Router 拦截点击，不整页刷新 */}
        <Link to="/" className="Header-brand">
          {APP_NAME}
        </Link>
        <nav className="Header-nav">
          <Link to="/" className="Header-link">
            知识目录
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header

// ★ 站内跳转用 Link，不要用 <a href="/"> —— 后者会整页刷新丢失 SPA 状态`,
          },
          {
            type: 'list',
            title: '3. 怎么用：决策顺序',
            ordered: true,
            items: [
              '静态菜单、卡片、面包屑 → Link',
              '需要当前页高亮 → NavLink（首页加 end）',
              '按钮提交、登录成功、守卫踢走 → useNavigate',
              '跳外链 → 普通 <a href target="_blank">',
              '传参给下一页 → URL params / search 优先；临时提示用 state',
            ],
          },
          {
            type: 'text',
            title: '4. 易错：跳转相关',
            body: '**Link 的 to 区分大小写**——路由 path 默认 caseSensitive（除非显式 false）。\n\n**NavLink 嵌套路由误高亮**——父路径 /lesson 会匹配 /lesson/xxx，给「只想首页高亮」的 NavLink 加 **end** 属性。\n\n**navigate 在 Router 外调用**——报错 useNavigate may be used only in the context of a Router。\n\n**绝对 vs 相对路径**——navigate(\'/path\') 从根开始；navigate(\'detail\') 相对当前 URL。\n\n**state 刷新会丢**——重要数据放 URL 或重新请求，state 只适合一次性 toast 提示。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '能点的用 Link/NavLink，逻辑里用 navigate；登录成功加 replace；NavLink 嵌套加 end；别用 <a href> 做站内跳转。',
          },
        ],
      },
    },
    {
      id: 'dynamic-route-params',
      title: '动态路由：useParams + useSearchParams 完整 demo',
      summary: '路径里的 :id 用 useParams 读；问号后面的 ?q= 用 useSearchParams 读和改',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '路径参数 /users/42 → 路由写 :userId，useParams() 读；查询参数 ?q=react → useSearchParams() 读写——params 值永远是字符串，换 id 要 useEffect 重新请求。',
          },
          {
            type: 'text',
            title: '1. 是什么：URL 里的两类参数',
            body: 'URL 可以携带两类动态信息：\n\n**路径参数（params）**：嵌在路径段里，如 /lesson/router/router-setup-full 的 router 和 router-setup-full。路由配置写 :categoryId/:itemId，页面用 useParams() 得到 { categoryId: "router", itemId: "router-setup-full" }。\n\n**查询参数（search / query）**：问号后面，如 /search?q=react&page=2。不改变路由匹配规则，适合搜索词、分页、筛选——用户复制链接就能分享当前筛选状态。',
          },
          {
            type: 'table',
            title: 'params vs search 怎么选',
            intro: '设计 URL 时先想「这个信息是否标识一个资源」。',
            headers: ['对比', '路径参数 useParams', '查询参数 useSearchParams'],
            rows: [
              ['URL 形态', '/users/42', '/search?q=react&page=2'],
              ['路由配置', 'path: "users/:userId"', 'path: "search" 即可，不用写 ?'],
              ['语义', '标识「哪个资源」', '修饰「怎么查/怎么筛」'],
              ['必填性', '通常必填（缺段不匹配）', '通常可选，有默认值'],
              ['改参数', '换 URL 路径，可能换组件', '同页内 setParams 更新筛选'],
              ['本项目例子', '/lesson/:categoryId/:itemId', '（搜索页可自建 demo）'],
            ],
            note: 'LessonDetail 用 useParams 读 categoryId + itemId，再 findLesson 查本地数据——见 src/pages/LessonDetail。',
          },
          {
            type: 'text',
            title: '2. 特点：useParams 的行为',
            body: '**值永远是字符串**——即使用户 ID 是数字 42，拿到的是 "42"。比较或请求前 Number(userId) 或 parseInt。\n\n**组件可能复用**——从详情 A 点到详情 B，同一组件实例不卸载，只是 params 变了。必须在 useEffect 依赖里加上 userId 重新请求，否则会显示上一个用户的数据。\n\n**可选动态段**——v6 可写 path: \'users/:userId?\'（少用，通常用两条路由或改 query）。',
          },
          {
            type: 'text',
            title: '3. 特点：useSearchParams 的行为',
            body: 'const [params, setParams] = useSearchParams()。\n\n**读**：params.get(\'q\') 得到字符串或 null。\n\n**写**：setParams({ q: \'react\', page: \'1\' }) 更新 URL 为 ?q=react&page=1，不刷新页面。\n\n**保留其他参数**：用 new URLSearchParams(params) 复制后再改单个 key，避免 setParams 覆盖掉别的筛选条件。',
          },
          {
            type: 'code',
            title: '完整可抄 demo：用户详情页（useParams + 请求）',
            language: 'jsx',
            body: `// useParams：读取 URL 路径里的动态段（:userId 等），值永远是字符串
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// 路由配置：{ path: 'users/:userId', element: <UserDetail /> }

function UserDetail() {
  const { userId } = useParams() // 例如 URL /users/42 → userId === "42"（字符串！）
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()  // 用于取消进行中的请求

    async function loadUser() {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(
          \`https://jsonplaceholder.typicode.com/users/\${userId}\`,
          { signal: controller.signal }  // 组件卸载或 userId 变化时 abort
        )
        if (!res.ok) throw new Error('用户不存在')
        setUser(await res.json())
      } catch (e) {
        if (e.name === 'AbortError') return  // 主动取消，不算错误
        setError(e.message)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
    return () => controller.abort()  // 清理：防止「旧请求覆盖新数据」
  }, [userId]) // ★ 从用户 A 切到用户 B，同一组件实例不卸载，必须依赖 userId 重新请求

  if (loading) return <p>加载用户 {userId}...</p>
  if (error) return <p>错误：{error}</p>
  if (!user) return null

  return (
    <div>
      <Link to="/users">← 返回列表</Link>
      <h1>{user.name}</h1>
      <p>邮箱：{user.email}</p>
      <p>城市：{user.address.city}</p>
    </div>
  )
}

export default UserDetail`,
          },
          {
            type: 'code',
            title: '对照本项目：LessonDetail 读 categoryId + itemId',
            language: 'jsx',
            body: `// src/pages/LessonDetail/index.js（核心逻辑）—— 本项目动态路由标准范例
import { Link, useParams } from 'react-router-dom'
import lessons from '../../data/lessons'
import { findLesson, getLessonPath } from '../../utils/helpers'

function LessonDetail() {
  // useParams：从 URL 路径提取动态段
  // URL 示例：/lesson/router/link-navigate-full
  const { categoryId, itemId } = useParams()
  // categoryId === 'router'（字符串）
  // itemId === 'link-navigate-full'（字符串）

  // 用 params 查本地数据（真实项目可能是 fetch API）
  const { category, item } = findLesson(lessons, categoryId, itemId)

  // 找不到数据时友好提示，别白屏
  if (!category || !item) {
    return (
      <div>
        <h1>未找到该知识点</h1>
        <Link to="/">返回知识目录</Link>
      </div>
    )
  }

  return (
    <article>
      <nav>
        <Link to="/">知识目录</Link>
        <span> / </span>
        <span>{category.title}</span>
      </nav>
      <h1>{item.title}</h1>
      {/* DocContent 渲染 item.content.sections */}
    </article>
  )
}

// helpers.js 里生成路径的工具函数：
// getLessonPath('router', 'link-navigate-full')
// → '/lesson/router/link-navigate-full'`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：列表点进详情，看 :id 参数是怎么从 URL 里被读出来的',
            body: `import { useState, useEffect } from 'react' // useEffect 用来演示「id 变了要重新取数据」

// 假数据；真实项目里详情数据是根据 id 去后端请求回来的
const USERS = [
  { id: '1', name: '张三', city: '北京', job: '前端工程师' },
  { id: '2', name: '李四', city: '上海', job: '后端工程师' },
  { id: '3', name: '王五', city: '深圳', job: '产品经理' },
]

// 详情页组件：真实项目里它的 userId 来自 const { userId } = useParams()
function UserDetail({ userId, onBack }) {
  const [user, setUser] = useState(null)          // 详情数据
  const [loading, setLoading] = useState(true)    // 加载态

  useEffect(() => {
    setLoading(true)
    // 模拟一次请求；真实项目里是 fetch('/api/users/' + userId)
    const timer = setTimeout(() => {
      setUser(USERS.find((u) => u.id === userId)) // 注意 u.id 和 userId 都是字符串
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)              // 清理：id 快速切换时取消上一次，防止旧数据覆盖新数据
  }, [userId])                                    // ★ 关键：依赖 userId。漏写会一直显示第一个用户的数据

  return (
    <div>
      <button onClick={onBack} style={{ marginBottom: 10 }}>← 返回列表</button>
      <div style={{ fontSize: 12, color: '#888', fontFamily: 'monospace', marginBottom: 8 }}>
        {/* 真实项目：路由配 path="users/:userId"，页面里 useParams() 得到 {'{'} userId: '{userId}' {'}'} */}
        地址栏 /users/{userId} → useParams() 读出 userId = "{userId}"（永远是字符串！）
      </div>
      {loading ? <p>加载用户 {userId} 的资料…</p> : user ? (
        <div style={{ padding: 12, background: '#f6ffed', borderRadius: 6 }}>
          <div style={{ fontWeight: 600 }}>{user.name}</div>
          <div style={{ fontSize: 13, color: '#666' }}>{user.city} · {user.job}</div>
        </div>
      ) : <p style={{ color: '#cf1322' }}>没有找到 id 为 {userId} 的用户</p>}
    </div>
  )
}

export default function Demo() {
  const [currentId, setCurrentId] = useState(null) // null 表示停在列表页；真实项目里靠 URL 区分

  return (
    <div style={{ border: '1px solid #d9d9d9', borderRadius: 8, padding: 14, minHeight: 170 }}>
      {currentId === null ? (
        <div>
          <div style={{ fontSize: 12, color: '#888', fontFamily: 'monospace', marginBottom: 8 }}>地址栏 /users</div>
          {USERS.map((u) => (
            // 真实写法：<Link to={'/users/' + u.id}>{u.name}</Link>
            <div key={u.id} style={{ padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
              <button onClick={() => setCurrentId(u.id)} style={{ cursor: 'pointer' }}>
                {u.name}（点进详情，URL 会变成 /users/{u.id}）
              </button>
            </div>
          ))}
          <p style={{ fontSize: 13, color: '#666' }}>
            进详情后直接点「返回列表」再点另一个人：组件不卸载，只是 userId 变了，所以必须靠 useEffect 依赖它重新取数。
          </p>
        </div>
      ) : (
        <UserDetail userId={currentId} onBack={() => setCurrentId(null)} />
      )}
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: '完整可抄 demo：搜索页（useSearchParams 读写）',
            language: 'jsx',
            body: `// useSearchParams：读写 URL 问号后面的查询参数 ?q=react&page=2
import { useSearchParams, Link } from 'react-router-dom'
import { useMemo } from 'react'

const ALL_ITEMS = [
  { id: 1, name: 'React 基础', tag: 'react' },
  { id: 2, name: 'React Router', tag: 'router' },
  { id: 3, name: 'Redux 入门', tag: 'redux' },
  { id: 4, name: 'axios 实战', tag: 'http' },
]

function SearchPage() {
  // 返回 [URLSearchParams 对象, setParams 函数]，类似 useState
  const [params, setParams] = useSearchParams()

  // 从 URL 读参数（刷新页面、分享链接都能恢复筛选状态）
  const q = params.get('q') || ''           // 关键词，没有则空字符串
  const tag = params.get('tag') || ''       // 标签筛选
  const page = Number(params.get('page') || '1')  // 页码，get 返回字符串需转数字
  const pageSize = 2

  // useMemo：q/tag 变化时才重新过滤，避免每次 render 都算
  const filtered = useMemo(() => {
    return ALL_ITEMS.filter((item) => {
      const matchQ = !q || item.name.toLowerCase().includes(q.toLowerCase())
      const matchTag = !tag || item.tag === tag
      return matchQ && matchTag
    })
  }, [q, tag])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, totalPages)  // 防止 page 超出范围
  const pageItems = filtered.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  )

  // 更新部分参数，保留其他 key（避免 setParams 覆盖掉别的筛选）
  function updateParams(partial) {
    const next = new URLSearchParams(params)  // 复制现有参数
    Object.entries(partial).forEach(([key, val]) => {
      if (val === '' || val === null || val === undefined) {
        next.delete(key)  // 空值则从 URL 移除该参数
      } else {
        next.set(key, String(val))
      }
    })
    setParams(next)  // 更新 URL，不刷新页面，组件不卸载
  }

  function handleSearch(keyword) {
    updateParams({ q: keyword, page: '1' })  // 换关键词时重置到第 1 页
  }

  function handleTagChange(newTag) {
    updateParams({ tag: newTag, page: '1' })
  }

  return (
    <div>
      <h2>搜索页</h2>
      <p>
        当前 URL 参数：q="{q}"，tag="{tag}"，page={safePage}
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={q}
          placeholder="关键词"
          onChange={(e) => updateParams({ q: e.target.value, page: '1' })}
        />
        <button type="button" onClick={() => handleSearch('React')}>
          搜 React
        </button>
        <button type="button" onClick={() => handleTagChange('redux')}>
          只看 redux 标签
        </button>
        <button type="button" onClick={() => setParams({})}>
          清空筛选
        </button>
      </div>

      <ul>
        {pageItems.map((item) => (
          <li key={item.id}>
            {item.name} <small>({item.tag})</small>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 16 }}>
        <button
          type="button"
          disabled={safePage <= 1}
          onClick={() => updateParams({ page: String(safePage - 1) })}
        >
          上一页
        </button>
        <span style={{ margin: '0 12px' }}>
          {safePage} / {totalPages}
        </span>
        <button
          type="button"
          disabled={safePage >= totalPages}
          onClick={() => updateParams({ page: String(safePage + 1) })}
        >
          下一页
        </button>
      </div>

      {/* 带查询参数的链接：别人打开能看到同样筛选 */}
      <p>
        <Link to={\`/search?q=\${encodeURIComponent(q)}&tag=\${tag}&page=\${safePage}\`}>
          复制当前筛选链接
        </Link>
      </p>
    </div>
  )
}

// 路由配置：{ path: 'search', element: <SearchPage /> }
export default SearchPage`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：?keyword=xx&page=2 —— useSearchParams 的等价逻辑（URL 会跟着筛选变）',
            body: `import { useState, useMemo } from 'react' // 用 state 存一份 params 对象，模拟 useSearchParams

const ALL = [                                          // 假数据源
  { id: 1, name: 'React 基础', tag: 'react' },
  { id: 2, name: 'React Router 实战', tag: 'router' },
  { id: 3, name: 'Redux 入门', tag: 'redux' },
  { id: 4, name: 'Router 守卫进阶', tag: 'router' },
  { id: 5, name: 'axios 请求封装', tag: 'http' },
]
const PAGE_SIZE = 2                                    // 每页两条，方便看分页效果

export default function Demo() {
  // 真实项目：const [params, setParams] = useSearchParams()，params 是 URLSearchParams 对象
  const [params, setParams] = useState({ keyword: '', tag: '', page: '1' })

  const keyword = params.keyword || ''                 // 真实项目：params.get('keyword') || ''
  const tag = params.tag || ''                         // 真实项目：params.get('tag') || ''
  const page = Number(params.page || '1')              // ★ 查询参数取出来也是字符串，要转数字

  // 只改部分 key、保留其它筛选条件；真实项目里用 new URLSearchParams(params) 复制后再 set
  function updateParams(partial) {
    setParams((prev) => {
      const next = { ...prev, ...partial }             // 复制旧参数再覆盖，避免把别的筛选冲掉
      Object.keys(next).forEach((k) => { if (next[k] === '') delete next[k] }) // 空值就从 URL 里去掉
      return next
    })
  }

  const filtered = useMemo(() => {                     // keyword/tag 变了才重算，避免每次渲染都过滤
    return ALL.filter((item) => {
      const hitKeyword = !keyword || item.name.toLowerCase().includes(keyword.toLowerCase())
      const hitTag = !tag || item.tag === tag
      return hitKeyword && hitTag
    })
  }, [keyword, tag])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)          // 防止筛选后页码越界
  const rows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  // 把参数对象拼回 URL 字符串，纯粹为了让你直观看到地址栏的变化
  const query = Object.keys(params).map((k) => k + '=' + encodeURIComponent(params[k])).join('&')

  return (
    <div>
      <div style={{ fontSize: 12, color: '#888', fontFamily: 'monospace', marginBottom: 10 }}>
        地址栏：/search{query ? '?' + query : ''}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
        <input
          value={keyword}
          placeholder="输入关键词"
          onChange={(e) => updateParams({ keyword: e.target.value, page: '1' })} // ★ 换关键词要重置到第 1 页
          style={{ padding: '4px 8px' }}
        />
        {['', 'router', 'redux'].map((t) => (
          <button
            key={t || 'all'}
            onClick={() => updateParams({ tag: t, page: '1' })}
            style={{ padding: '4px 10px', cursor: 'pointer', background: tag === t ? '#1677ff' : '#fff', color: tag === t ? '#fff' : '#333' }}
          >
            {t === '' ? '全部标签' : t}
          </button>
        ))}
        {/* 真实项目：setParams({}) 直接清空所有查询参数 */}
        <button onClick={() => setParams({ page: '1' })} style={{ padding: '4px 10px', cursor: 'pointer' }}>清空筛选</button>
      </div>

      <ul style={{ margin: 0, paddingLeft: 20, minHeight: 60 }}>
        {rows.length ? rows.map((r) => <li key={r.id}>{r.name} <small style={{ color: '#999' }}>#{r.tag}</small></li>)
          : <li style={{ listStyle: 'none', color: '#999', marginLeft: -20 }}>没有匹配结果</li>}
      </ul>

      <div style={{ marginTop: 10 }}>
        <button disabled={safePage <= 1} onClick={() => updateParams({ page: String(safePage - 1) })}>上一页</button>
        <span style={{ margin: '0 12px' }}>{safePage} / {totalPages}</span>
        <button disabled={safePage >= totalPages} onClick={() => updateParams({ page: String(safePage + 1) })}>下一页</button>
      </div>

      <p style={{ fontSize: 13, color: '#666' }}>
        筛选状态全写在 URL 里，所以刷新、收藏、发给同事都能还原同一个列表——这就是查询参数比组件内 state 强的地方。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'list',
            title: '4. 怎么用：动态路由开发步骤',
            ordered: true,
            items: [
              '路由 path 里写 :paramName（多个动态段按顺序命名）',
              '页面 const { paramName } = useParams()',
              '字符串转数字：Number(paramName) 或 parseInt',
              'useEffect(..., [paramName]) 依赖变化时重新请求',
              '筛选/分页用 useSearchParams，改 URL 不卸载组件',
              '找不到数据时渲染友好提示（LessonDetail 已示范）',
            ],
          },
          {
            type: 'text',
            title: '5. 易错：动态参数',
            body: '**useParams 全是字符串**——和数字 id 比较用 Number(id) === 42。\n\n**切换详情不刷新**——漏写 useEffect 依赖 userId。\n\n**setParams 覆盖其他 key**——用 URLSearchParams 复制后再改。\n\n**动态段名字和 useParams 解构不一致**——path 写 :userId 就要解构 userId 不是 id。\n\n**findLesson 找不到要友好 404**——别白屏（本项目 LessonDetail 已处理）。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '资源 id 放路径用 useParams（字符串！依赖变化要重新请求）；筛选分页放 ? 后面用 useSearchParams；本项目 /lesson/:categoryId/:itemId 就是标准范例。',
          },
        ],
      },
    },
  ],
}

export default router
