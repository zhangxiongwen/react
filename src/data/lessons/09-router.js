/**
 * 第 9 章：路由
 * 每个条目 = 一句话总结 + 详细步骤 + 完整可抄 demo + 易错点
 */
const router = {
  id: 'router',
  title: '路由实战（react-router-dom）',
  summary: '从定义路由、useRoutes，到守卫、403、404、登录回跳——含可运行 Demo',
  order: 11,
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
            body: `npm install react-router-dom

# 装完后 package.json 里会有 "react-router-dom": "^6.x"
# 本项目已装好，可直接对照源码学习`,
          },
          {
            type: 'code',
            title: '第 2 步：入口 src/index.js（对照本项目）',
            language: 'jsx',
            body: `import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    {/* Redux Provider 和 BrowserRouter 都包在最外层 */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// ★ 没有 BrowserRouter，下面都会报错：
// useNavigate() may be used only in the context of a Router
// Link 点击无效`,
          },
          {
            type: 'code',
            title: '第 3 步：路由表 src/routes/index.js（本项目完整配置）',
            language: 'jsx',
            body: `import { Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/index'
import LessonDetail from '../pages/LessonDetail/index'

/**
 * 路由表 —— 商业项目常见做法：集中管理
 *
 * 路径说明：
 *   /                              → 知识目录首页（Home）
 *   /lesson/:categoryId/:itemId    → 知识点详情（LessonDetail）
 *   *                              → 未知路径，重定向回首页
 */
const routes = [
  {
    path: '/',
    element: <MainLayout />,   // 父路由：布局壳
    children: [
      {
        index: true,             // 访问 / 时渲染 Home（不需要写 path: ''）
        element: <Home />,
      },
      {
        // :categoryId 和 :itemId 是动态段，后面用 useParams 读取
        path: 'lesson/:categoryId/:itemId',
        element: <LessonDetail />,
      },
      {
        // 404：任何没匹配到的路径
        path: '*',
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
            body: `import { useRoutes } from 'react-router-dom'
import routes from './routes'

function App() {
  const element = useRoutes(routes)
  return element
}

export default App

// useRoutes 等价于手写：
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
            title: '第 5 步：布局 MainLayout.js + Outlet',
            language: 'jsx',
            body: `import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import './MainLayout.css'

/**
 * 主布局：顶栏固定，中间内容区随路由变化
 * Outlet = 「子路由渲染的插槽」
 */
function MainLayout() {
  return (
    <div className="MainLayout">
      <Header />
      <main className="MainLayout-main">
        {/* Home、LessonDetail 等子页面渲染在这里 */}
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
            body: `import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import LessonDetail from './pages/LessonDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="lesson/:categoryId/:itemId" element={<LessonDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

// 优点：一眼能看懂；跟着官方文档好抄
// 缺点：路由一多，App.js 又长又乱；不好按模块拆分、不好做权限动态路由`,
          },
          {
            type: 'code',
            title: '写法 B：useRoutes（本项目）',
            language: 'jsx',
            body: `// ---------- src/routes/index.js ----------
const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'lesson/:categoryId/:itemId', element: <LessonDetail /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]
export default routes

// ---------- src/App.js ----------
import { useRoutes } from 'react-router-dom'
import routes from './routes'

function App() {
  // useRoutes：根据当前地址栏，算出该渲染哪棵组件树
  const element = useRoutes(routes)
  return element
}

// ---------- src/index.js ----------
// <BrowserRouter><App /></BrowserRouter>

// 优点：路由集中、App 干净、以后可按权限 filter 路由表
// 缺点：初学要多跳一个文件；要习惯「对象配置」而不是纯 JSX`,
          },
          {
            type: 'code',
            title: '对照：其实是一回事',
            language: 'text',
            body: `JSX 写法                         useRoutes 写法
────────────────────────────────────────────────────
<Routes>                         useRoutes([ ... ])
  <Route path="/" element={A}>     { path:'/', element:A,
    <Route index element={B}/>       children:[
    <Route path="x" element={C}/>      { index:true, element:B },
  </Route>                             { path:'x', element:C },
</Routes>                            ]}

匹配规则、嵌套、Outlet、params 完全相同
选哪个 = 项目风格 + 路由规模，不是谁更「高级」`,
          },
          {
            type: 'code',
            title: '写法 C：数据路由（了解即可）',
            language: 'jsx',
            body: `import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

// 注意：用了 RouterProvider，就不要再包 BrowserRouter`,
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
            body: `// 仅演示等价性；本仓库仍保持 useRoutes
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="lesson/:categoryId/:itemId" element={<LessonDetail />} />
        <Route path="demo/json-server" element={<JsonServerDemo />} />
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
            body: `import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isLoggedIn } from '../../utils/auth'

function RequireAuth() {
  const location = useLocation()

  if (!isLoggedIn()) {
    // replace：避免返回键又回到受保护页造成死循环
    // state.from：登录成功后跳回原地址
    return (
      <Navigate
        to="/demo/auth/login"
        replace
        state={{ from: location }}
      />
    )
  }

  // 已登录：继续渲染子路由页面
  return <Outlet />
}

export default RequireAuth`,
          },
          {
            type: 'code',
            title: '路由表怎么挂 RequireAuth（节选）',
            language: 'jsx',
            body: `{
  element: <RequireAuth />,
  children: [
    { path: 'demo/auth/profile', element: <ProfilePage /> },
    { path: 'demo/auth/unsaved', element: <UnsavedFormPage /> },
    // 未登录访问 /demo/auth/profile → 自动去登录页
  ],
}`,
          },
          {
            type: 'code',
            title: '案例 2：LoginPage 登录回跳（本项目已实现）',
            language: 'jsx',
            body: `const location = useLocation()
const navigate = useNavigate()
// 守卫传来的原地址；没有就去 /demo/auth
const from = location.state?.from?.pathname || '/demo/auth'

function handleSubmit(e) {
  e.preventDefault()
  login({ name, role })          // 写入 localStorage
  navigate(from, { replace: true }) // 回到个人中心等原目标
}`,
          },
          {
            type: 'code',
            title: '案例 3：GuestOnly 反向守卫（本项目已实现）',
            language: 'jsx',
            body: `function GuestOnly() {
  if (isLoggedIn()) {
    return <Navigate to="/demo/auth" replace />
  }
  return <Outlet />
}

// 路由：
{
  element: <GuestOnly />,
  children: [
    { path: 'demo/auth/login', element: <LoginPage /> },
  ],
}`,
          },
          {
            type: 'code',
            title: '案例 4：RequireRole + 嵌套（admin → 403）',
            language: 'jsx',
            body: `function RequireRole({ allow = [] }) {
  const role = getRole() // 'user' | 'admin'
  if (!allow.includes(role)) {
    return <Navigate to="/demo/auth/403" replace />
  }
  return <Outlet />
}

// 路由嵌套：
{
  element: <RequireAuth />,
  children: [
    { path: 'demo/auth/profile', element: <ProfilePage /> },
    {
      element: <RequireRole allow={['admin']} />,
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
            body: `function ForbiddenPage() {
  return (
    <div>
      <h1>403 没有权限</h1>
      <p>你的角色不能访问该页面。</p>
      <Link to="/demo/auth/login">换账号登录</Link>
      <Link to="/">回首页</Link>
    </div>
  )
}

// 路由（公开，谁都能打开说明页）：
{ path: 'demo/auth/403', element: <ForbiddenPage /> }`,
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
            body: `import { Link, useLocation } from 'react-router-dom'

function NotFoundPage() {
  const location = useLocation()
  return (
    <div>
      <h1>404 页面不存在</h1>
      <p>没有匹配到：{location.pathname}</p>
      <Link to="/">回首页</Link>
    </div>
  )
}

// routes 里（放在 children 最后）：
{ path: '*', element: <NotFoundPage /> }

// ❌ 不推荐（用户没反馈）：
// { path: '*', element: <Navigate to="/" replace /> }`,
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
            body: `const [dirty, setDirty] = useState(false)

useEffect(() => {
  function onBeforeUnload(e) {
    if (!dirty) return
    e.preventDefault()
    e.returnValue = '' // 触发浏览器原生提示
  }
  window.addEventListener('beforeunload', onBeforeUnload)
  return () => window.removeEventListener('beforeunload', onBeforeUnload)
}, [dirty])

// 输入时 setDirty(true)；保存成功 setDirty(false)`,
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
            body: `const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'lesson/:categoryId/:itemId', element: <LessonDetail /> },
      { path: 'demo/json-server', element: <JsonServerDemo /> },
      { path: 'demo/auth', element: <AuthDemoHome /> },
      { path: 'demo/auth/403', element: <ForbiddenPage /> },

      { element: <GuestOnly />, children: [
          { path: 'demo/auth/login', element: <LoginPage /> },
      ]},

      { element: <RequireAuth />, children: [
          { path: 'demo/auth/profile', element: <ProfilePage /> },
          { path: 'demo/auth/unsaved', element: <UnsavedFormPage /> },
          { element: <RequireRole allow={['admin']} />, children: [
              { path: 'demo/auth/admin', element: <AdminPage /> },
          ]},
      ]},

      { path: '*', element: <NotFoundPage /> },
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
            body: `import { Link, NavLink } from 'react-router-dom'

/**
 * 顶部导航：Link 做品牌链接，NavLink 做带高亮的菜单
 */
function SiteNav() {
  const linkStyle = ({ isActive }) => ({
    padding: '8px 12px',
    textDecoration: 'none',
    color: isActive ? '#2563eb' : '#374151',
    fontWeight: isActive ? 600 : 400,
    borderBottom: isActive ? '2px solid #2563eb' : '2px solid transparent',
  })

  return (
    <header style={{ display: 'flex', gap: 16, padding: 16, borderBottom: '1px solid #eee' }}>
      {/* Link：不需要高亮，只是跳转 */}
      <Link to="/" style={{ fontWeight: 700, textDecoration: 'none', color: '#111' }}>
        我的站点
      </Link>

      <nav style={{ display: 'flex', gap: 8 }}>
        {/* NavLink：当前路径匹配时 isActive 为 true */}
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

// 带动态参数的 Link
function LessonLink({ categoryId, itemId, title }) {
  return (
    <Link to={\`/lesson/\${categoryId}/\${itemId}\`}>
      {title}
    </Link>
  )
}

// 带查询参数的 Link
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
            body: `import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // 场景 1：登录成功后跳首页，replace 避免返回键回到登录页
  async function handleLogin() {
    setLoading(true)
    try {
      // await http.post('/login', { account, password })
      await new Promise((r) => setTimeout(r, 800))
      localStorage.setItem('token', 'demo-token')
      navigate('/', { replace: true })
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  // 场景 2：取消 / 返回上一页
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

  // 场景 3：创建成功后跳详情页
  async function handleSubmit(e) {
    e.preventDefault()
    // const post = await http.post('/posts', { title })
    const fakeId = Date.now()
    navigate(\`/posts/\${fakeId}\`, {
      replace: true,
      state: { message: '创建成功' }, // 隐式传参，详情页用 useLocation 读
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

  // 场景 4：未登录时立刻重定向（也可写在路由 loader 或包装组件里）
  if (!token) {
    navigate('/login', { replace: true, state: { from: '/protected' } })
    return null
  }

  return <div>受保护的内容</div>
}

export { LoginPage, CreatePostPage, ProtectedPage }`,
          },
          {
            type: 'code',
            title: '对照本项目：Header 里的 Link',
            language: 'jsx',
            body: `// src/components/Header/index.js
import { Link } from 'react-router-dom'
import { APP_NAME } from '../../utils/constants'
import './Header.css'

function Header() {
  return (
    <header className="Header">
      <div className="Header-inner">
        {/* 点品牌名回首页，不刷新整页 */}
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

export default Header`,
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
            body: `import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// 路由配置：{ path: 'users/:userId', element: <UserDetail /> }

function UserDetail() {
  const { userId } = useParams() // 字符串，例如 "1"
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadUser() {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(
          \`https://jsonplaceholder.typicode.com/users/\${userId}\`,
          { signal: controller.signal }
        )
        if (!res.ok) throw new Error('用户不存在')
        setUser(await res.json())
      } catch (e) {
        if (e.name === 'AbortError') return
        setError(e.message)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
    return () => controller.abort()
  }, [userId]) // ★ userId 变了要重新请求

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
            body: `// src/pages/LessonDetail/index.js（核心逻辑）
import { Link, useParams } from 'react-router-dom'
import lessons from '../../data/lessons'
import { findLesson, getLessonPath } from '../../utils/helpers'

function LessonDetail() {
  // URL：/lesson/router/link-navigate-full
  const { categoryId, itemId } = useParams()
  // categoryId === 'router'
  // itemId === 'link-navigate-full'

  const { category, item } = findLesson(lessons, categoryId, itemId)

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

// helpers.js 里生成路径：
// getLessonPath('router', 'link-navigate-full')
// → '/lesson/router/link-navigate-full'`,
          },
          {
            type: 'code',
            title: '完整可抄 demo：搜索页（useSearchParams 读写）',
            language: 'jsx',
            body: `import { useSearchParams, Link } from 'react-router-dom'
import { useMemo } from 'react'

const ALL_ITEMS = [
  { id: 1, name: 'React 基础', tag: 'react' },
  { id: 2, name: 'React Router', tag: 'router' },
  { id: 3, name: 'Redux 入门', tag: 'redux' },
  { id: 4, name: 'axios 实战', tag: 'http' },
]

function SearchPage() {
  const [params, setParams] = useSearchParams()

  // 从 URL 读参数（刷新页面、分享链接都能恢复状态）
  const q = params.get('q') || ''
  const tag = params.get('tag') || ''
  const page = Number(params.get('page') || '1')
  const pageSize = 2

  // 根据 URL 参数过滤
  const filtered = useMemo(() => {
    return ALL_ITEMS.filter((item) => {
      const matchQ = !q || item.name.toLowerCase().includes(q.toLowerCase())
      const matchTag = !tag || item.tag === tag
      return matchQ && matchTag
    })
  }, [q, tag])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const pageItems = filtered.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  )

  function updateParams(partial) {
    const next = new URLSearchParams(params)
    Object.entries(partial).forEach(([key, val]) => {
      if (val === '' || val === null || val === undefined) {
        next.delete(key)
      } else {
        next.set(key, String(val))
      }
    })
    setParams(next)
  }

  function handleSearch(keyword) {
    updateParams({ q: keyword, page: '1' })
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

      {/* 带查询参数的链接，别人打开能看到同样筛选 */}
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
