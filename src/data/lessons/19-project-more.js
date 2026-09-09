/**
 * 完整项目后半：路由 / 请求 / 权限 / 国际化 / 上线
 * 由 19-project.js 合并进同一章
 */
const projectMoreItems = [
  {
    id: 'project-router',
    title: '路由架构：布局、守卫、菜单和 URL 怎么对齐',
    summary:
      '集中式路由表 + 登录守卫 + 菜单和路由共用一份配置；未登录跳登录页并记住原来要去哪',
    content: {
      sections: [
        {
          type: 'tip',
          title: '一句话记住',
          body: '真实项目里路由不是「每个页面自己写 `<Link>`」就完了，而是**一张表管三件事**：哪个 URL 渲染哪个页面、这个页面套哪层布局、没登录能不能进。菜单也从同一张表生成，改一处、三处一起对。',
        },
        {
          type: 'text',
          title: '4.1 为什么不能把 Route 散落在各个页面',
          body: '入门教程常在 `App.jsx` 里手写七八个 `<Route>`。项目一大就会出现：菜单里有「用户管理」，地址栏却打不开；或者页面能打开，菜单高亮却不对。\n\n根因是 **URL、页面组件、菜单文案各写各的**。正确做法：一份 `config/menu.ts`（或 `router/index.tsx`）同时喂给路由表和侧栏菜单。',
        },
        {
          type: 'code',
          title: '4.2 路由表模板（可直接抄）',
          language: 'tsx',
          body: `// router/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom'
import BasicLayout from '@/layouts/BasicLayout'
import BlankLayout from '@/layouts/BlankLayout'
import RequireAuth from '@/router/RequireAuth'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import UserList from '@/pages/UserList'
import NotFound from '@/pages/NotFound'

export const router = createBrowserRouter([
  {
    element: <BlankLayout />,           // 登录页 / 404 不要左侧菜单
    children: [
      { path: '/login', element: <Login /> },
    ],
  },
  {
    element: (
      <RequireAuth>                     // 守卫包住整棵业务树
        <BasicLayout />
      </RequireAuth>
    ),
    children: [
      { path: '/', element: <Navigate to="/dashboard" replace /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/users', element: <UserList /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])`,
        },
        {
          type: 'code',
          title: '4.3 登录守卫：没 token 就踢回登录，并记住原地址',
          language: 'tsx',
          body: `// router/RequireAuth.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getToken } from '@/utils/storage'

export default function RequireAuth({ children }) {
  const location = useLocation()
  const token = getToken()

  if (!token) {
    // state.from 留给登录成功后跳回来；replace 避免登录页还能点浏览器后退
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children || <Outlet />
}`,
        },
        {
          type: 'code',
          live: true,
          runtime: 'react',
          language: 'tsx',
          title: 'Live Demo：模拟「没登录 → 登录 → 回到原页」',
          body: `import { useState } from 'react'
import { Alert, Button, Input, Space, Tag } from 'antd'

export default function Demo() {
  const [token, setToken] = useState('')
  const [page, setPage] = useState('/users')
  const [from, setFrom] = useState('')
  const [account, setAccount] = useState('admin')

  function go(path) {
    if (!token && path !== '/login') {
      setFrom(path)
      setPage('/login')
      return
    }
    setPage(path)
  }

  function login() {
    if (!account.trim()) return
    setToken('mock-token')
    setPage(from || '/dashboard')
    setFrom('')
  }

  function logout() {
    setToken('')
    setPage('/login')
  }

  return (
    <Space vertical size={12} style={{ width: '100%' }}>
      <Alert showIcon type="info" title="下面不是真路由，是把守卫逻辑缩成可点的状态机" />
      <div>
        当前页 <Tag color="blue">{page}</Tag>
        登录态 <Tag color={token ? 'green' : 'red'}>{token ? '已登录' : '未登录'}</Tag>
        {from ? <Tag>原目标 {from}</Tag> : null}
      </div>
      <Space wrap>
        <Button onClick={() => go('/dashboard')}>去仪表盘</Button>
        <Button onClick={() => go('/users')}>去用户管理</Button>
        <Button danger disabled={!token} onClick={logout}>退出</Button>
      </Space>
      {page === '/login' ? (
        <Space>
          <Input value={account} onChange={(e) => setAccount(e.target.value)} placeholder="账号" style={{ width: 160 }} />
          <Button type="primary" onClick={login}>登录并跳回</Button>
        </Space>
      ) : (
        <div>业务页：{page}。点「退出」再点菜单，会先去登录页。</div>
      )}
    </Space>
  )
}`,
        },
        {
          type: 'list',
          title: '4.4 新手最容易踩的坑',
          ordered: true,
          items: [
            '守卫里用 `<a href="/login">` 而不是 `<Navigate>` / `navigate()` —— 整页刷新，React 状态全丢',
            '登录成功写死跳 `/`，把用户原来要去的 `/users?id=3` 忘了',
            '菜单 path 写 `/user`，路由写 `/users`，点菜单 404',
            '404 的 `path: \'*\'` 没放在最后，把后面的路由全吃掉',
          ],
        },
        {
          type: 'code',
          title: '4.5 给路由挂 `meta`：让菜单、标题、权限都从这张表长出来',
          language: 'tsx',
          body: `// router/routes.tsx —— 把「路由 + 菜单 + 权限」写进同一份配置
// react-router 允许在路由对象上挂自定义字段，习惯上叫 meta（元信息）
import { DashboardOutlined, UserOutlined } from '@ant-design/icons'

export const businessRoutes = [
  {
    path: '/dashboard',                    // URL 路径，浏览器地址栏里显示的就是它
    element: <Dashboard />,                // 匹配到这个路径时渲染哪个组件
    meta: {
      title: 'menu.dashboard',             // 菜单文字：存词典 key，渲染时再 t() 翻译
      icon: <DashboardOutlined />,         // 菜单前面的小图标
      roles: [],                           // 空数组 = 所有登录用户都能进
    },
  },
  {
    path: '/users',
    element: <UserList />,
    meta: {
      title: 'menu.users',
      icon: <UserOutlined />,
      roles: ['admin', 'operator'],        // 只有这两个角色能进，别人访问就 403
    },
  },
  {
    path: '/users/:id',                    // 冒号开头是动态参数，页面里用 useParams() 取
    element: <UserDetail />,
    meta: {
      title: 'menu.userDetail',
      hideInMenu: true,                    // 详情页不该出现在左侧菜单里
      activeMenu: '/users',                // 但进来时要让「用户管理」这一项保持高亮
    },
  },
]

// 侧栏菜单直接从同一份配置生成：改 path 只改一处，菜单和路由永远对得上
export function toMenuItems(routes, t) {
  return routes
    .filter((r) => !r.meta?.hideInMenu)                    // 过掉不进菜单的路由
    .map((r) => ({ key: r.path, icon: r.meta?.icon, label: t(r.meta.title) }))
}`,
        },
        {
          type: 'table',
          title: '4.6 路由表字段说明表',
          intro: '一条路由对象里能写的字段就这些。前五个是 react-router 自己认的；`meta` 里的字段是**我们自己约定**的——框架根本不认识它，只有我们的菜单、守卫、页面标题这几段代码会去读。',
          headers: ['字段', '谁认识它', '作用', '写错的典型症状'],
          rows: [
            ['`path`', 'react-router', 'URL 路径。`/users` 是固定路径；`/users/:id` 里 `:id` 是动态参数，页面里用 `useParams()` 取；`*` 匹配所有没被匹配到的路径', '菜单写 `/user`、路由写 `/users`，点菜单直接 404'],
            ['`element`', 'react-router', '匹配到这个路径时渲染的 **JSX 元素**——是 `<UserList />`，不是 `UserList`', '写成 `element: UserList` → 页面空白，控制台报「不是有效的 React 元素」'],
            ['`children`', 'react-router', '子路由数组。父级的 `element` 里必须有 `<Outlet />`，子路由才有地方渲染', '父级忘了 `<Outlet />` → 子页面永远不显示，只看到一层外壳'],
            ['`index`', 'react-router', '`index: true` 表示「父路径本身」对应的默认子页面，等价于 `path: \'\'`', '和 `path` 同时写，启动就报配置错误'],
            ['`errorElement`', 'react-router', '这条路由（含它整棵子树）渲染报错时显示的兜底 UI', '不配就整站白屏，用户只看到一片空白'],
            ['`meta.title`', '我们自己的代码', '菜单文字 + 浏览器标签标题。存**词典 key**（如 `menu.users`）而不是中文，切语言才会跟着变', '写死中文 → 切成英文后菜单还是中文'],
            ['`meta.icon`', '我们自己的代码', '菜单前的图标，按需从 `@ant-design/icons` 单个引入', '图标库全量引入 → 打包体积白白多出几百 KB'],
            ['`meta.roles`', '我们自己的代码', '允许进入的角色数组。空数组或不写 = 所有登录用户都能进；守卫里拿它和当前用户角色比对', '只在菜单里过滤、没在守卫里判断 → 直接粘 URL 就能进'],
            ['`meta.hideInMenu`', '我们自己的代码', '这条路由不出现在左侧菜单（详情页、编辑页常用）', '不设 → 菜单里冒出「用户详情」这种点不进去的空项'],
            ['`meta.activeMenu`', '我们自己的代码', '进入详情页时指定该高亮哪一项菜单', '不设 → 打开详情页，左侧菜单全部失去高亮'],
          ],
          note: '判断一个字段该不该放进 `meta`：**它是给 react-router 用的，还是给我们自己的菜单 / 守卫 / 标题用的？** 后者一律进 `meta`。这样以后要换路由库，只重写外层结构，`meta` 整块能直接搬走。',
        },
        {
          type: 'tip',
          title: '一句话记忆',
          body: '一份路由表 + 一层 `RequireAuth` + 登录成功读 `location.state.from`。菜单和路由用同一份 path，改名只改一处。',
        },
      ],
    },
  },
  {
    id: 'project-request',
    title: '网络请求：axios 封装、拦截器、统一错误',
    summary:
      '全项目只留一个 axios 实例：自动带 token、自动剥 data、4xx/5xx 统一提示；页面里只调用 api/*.ts',
    content: {
      sections: [
        {
          type: 'tip',
          title: '一句话记住',
          body: '组件里**禁止**直接 `axios.get(\'http://...\')`。所有请求走 `api/request.ts` 这一个出口：请求拦截器塞 token，响应拦截器剥掉 `{ code, data, message }` 外壳，失败统一 `message.error`。',
        },
        {
          type: 'text',
          title: '5.1 后端常见返回格式',
          body: '国内后台接口几乎都长这样：\n\n`{ "code": 0, "data": { ... }, "message": "ok" }`\n\n页面真正要用的是 `data`。如果每个组件都写 `if (res.code === 0) setList(res.data)`，改一次字段就要改几十处。所以拦截器里直接 `return res.data`，组件拿到的已经是业务数据。',
        },
        {
          type: 'code',
          title: '5.2 request.ts 标准封装',
          language: 'ts',
          body: `// api/request.ts
import axios from 'axios'
import { message } from 'antd'
import { getToken, clearToken } from '@/utils/storage'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 开发走代理，生产走同域 /api
  timeout: 8000,
})

http.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = \`Bearer \${token}\`
  return config
})

http.interceptors.response.use(
  (response) => {
    const body = response.data
    // 有的接口直接返回数组，没有 code 外壳
    if (body && typeof body === 'object' && 'code' in body) {
      if (body.code !== 0) {
        message.error(body.message || '请求失败')
        if (body.code === 401) {
          clearToken()
          window.location.href = '/login'
        }
        return Promise.reject(body)
      }
      return body.data
    }
    return body
  },
  (error) => {
    const status = error.response?.status
    if (status === 401) {
      clearToken()
      window.location.href = '/login'
    }
    message.error(error.response?.data?.message || error.message || '网络异常')
    return Promise.reject(error)
  }
)

export default http`,
        },
        {
          type: 'code',
          title: '5.3 按模块拆 api/user.ts',
          language: 'ts',
          body: `// api/user.ts —— 页面只 import 这些函数，不碰 axios
import http from './request'

export function getUserList(params: { page: number; keyword?: string }) {
  return http.get('/users', { params })
}

export function createUser(payload: { name: string; role: string }) {
  return http.post('/users', payload)
}

export function updateUser(id: number, payload: { name: string }) {
  return http.put(\`/users/\${id}\`, payload)
}

export function deleteUser(id: number) {
  return http.delete(\`/users/\${id}\`)
}`,
        },
        {
          type: 'code',
          live: true,
          runtime: 'react',
          language: 'tsx',
          title: 'Live Demo：请求三态 loading / 成功 / 失败',
          body: `import { useEffect, useState } from 'react'
import { Alert, Button, Space, Table, Tag } from 'antd'

function mockFetch(fail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) reject(new Error('模拟 500：服务端挂了'))
      else resolve([
        { id: 1, name: '小明', role: 'admin' },
        { id: 2, name: '小红', role: 'user' },
      ])
    }, 600)
  })
}

export default function Demo() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fail, setFail] = useState(false)

  function load() {
    setLoading(true)
    setError('')
    mockFetch(fail)
      .then((data) => setList(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [fail])

  return (
    <Space vertical size={12} style={{ width: '100%' }}>
      <Space>
        <Button type="primary" onClick={load} loading={loading}>重新请求</Button>
        <Button onClick={() => setFail((v) => !v)}>{fail ? '切回成功' : '下次让它失败'}</Button>
      </Space>
      {error ? <Alert type="error" showIcon title={error} /> : null}
      <Table
        rowKey="id"
        size="small"
        loading={loading}
        dataSource={list}
        pagination={false}
        columns={[
          { title: 'ID', dataIndex: 'id', width: 60 },
          { title: '姓名', dataIndex: 'name' },
          { title: '角色', dataIndex: 'role', render: (v) => <Tag color={v === 'admin' ? 'red' : 'blue'}>{v}</Tag> },
        ]}
      />
    </Space>
  )
}`,
        },
        {
          type: 'list',
          title: '5.4 易错清单',
          ordered: true,
          items: [
            '封装已经 `return response.data`，组件里又写一遍 `.data`，结果是 `undefined`',
            '`baseURL` 末尾带 `/`，请求路径开头也带 `/`，有的环境会拼成 `//users`',
            'token 从 Redux 读而不是 `localStorage`：`request.ts` 依赖 store，容易循环引用',
            '401 只弹 toast 不跳登录，用户会在一个已经失效的页面上继续点',
          ],
        },
        {
          type: 'table',
          title: '5.5 HTTP 状态码与前端应对表',
          intro: 'HTTP 状态码是**服务器给整个请求的判决**，由 axios 的第二个拦截器（错误回调）处理。这张表就是 `request.ts` 里那段 `if (status === ...)` 该怎么写的依据——照着抄一遍，你的错误处理就比 90% 的新手项目完整了。',
          headers: ['状态 / 情况', '含义', '前端该做什么', '用户看到什么'],
          rows: [
            ['**400** Bad Request', '参数格式不对（少传字段、类型错）', '直接把后端返回的 `message` 弹出来，方便联调时定位', '「缺少参数 keyword」'],
            ['**401** Unauthorized', '没登录，或 token 过期 / 被顶下线', '`clearToken()` 清掉本地凭证 → 跳登录页，并带上当前地址好登录后跳回', '「登录已过期，请重新登录」，然后自动回到登录页'],
            ['**403** Forbidden', '登录了，但这个账号没有这个操作的权限', '**不要跳登录页**（跳了用户会以为是掉登录，反复登录还是不行），只提示无权限', '「无权限操作，请联系管理员」'],
            ['**404** Not Found', '接口地址不存在（多半是路径拼错或后端没发版）', '开发环境把完整 URL 打进 console，生产环境只给一句通用提示', '「请求的资源不存在」'],
            ['**422** Unprocessable Entity', '格式对但业务校验没过，通常带**字段级**错误详情', '把 `errors` 映射到表单上：`form.setFields([{ name, errors: [msg] }])`，让红字出现在对应输入框下面', '「邮箱已被注册」直接显示在邮箱输入框下方'],
            ['**429** Too Many Requests', '请求太频繁被限流', '禁用提交按钮几秒，别让用户继续点；搜索类接口顺手加防抖', '「操作过于频繁，请稍后再试」'],
            ['**500** / **502** / **504**', '服务端自己崩了、网关挂了、上游超时', '只给通用提示（绝对不要把后端异常堆栈给用户看），并把错误上报到监控平台', '「服务器繁忙，请稍后重试」+ 一个「重试」按钮'],
            ['**网络超时**', '`error.code === \'ECONNABORTED\'`，超过 axios 的 `timeout`', '提示超时并提供重试；上传大文件的接口单独调大 `timeout`', '「请求超时，请检查网络后重试」'],
            ['**断网 / 跨域**', '`error.code === \'ERR_NETWORK\'`，请求压根没到服务器', '`error.response` 是 `undefined`，**必须用可选链 `error.response?.status`**，否则这里自己先报错', '「网络连接失败」'],
            ['**主动取消**', '`axios.isCancel(error)` 为 `true`，我们自己 abort 掉的', '**直接 `return`，什么提示都不要弹**——这是正常行为，不是错误', '什么都看不到（正是我们要的）'],
          ],
          note: '两条最容易漏的：① `error.response` 在断网时是 `undefined`，所有取值都要用 `?.`；② 主动取消的请求会走进错误回调，如果不判断 `axios.isCancel`，用户每输入一个字就会弹一个「网络异常」。',
        },
        {
          type: 'table',
          title: '5.6 业务错误码约定表（示例，和后端一起定）',
          intro: 'HTTP 状态码只有几十个，不够描述业务。所以国内接口普遍返回 `{ code, data, message }`：**HTTP 是 200，业务成败看 `code`**。这张表就是我们和后端约定的 `code` 字典，一般写进接口文档，前端只在 `request.ts` 里读它。',
          headers: ['code', '含义', '前端处理方式', '要不要弹提示'],
          rows: [
            ['`0`', '成功（有的团队用 `200`，统一就行）', '拦截器 `return body.data`，业务代码拿到的直接是数据', '不弹'],
            ['`1001`', '参数校验失败', '弹 `message`，联调期同时 `console.warn` 出参数', '弹'],
            ['`1002`', '账号或密码错误', '登录页把错误显示在表单下方，比 toast 更明显', '表单内提示'],
            ['`2001`', 'token 过期', '和 HTTP 401 走同一套逻辑：清 token + 跳登录', '弹一次'],
            ['`2002`', '无操作权限', '提示无权限；顺便刷新一次权限码（可能是后台刚改了角色）', '弹'],
            ['`3001`', '数据不存在（被别人删了）', '列表页静默刷新一次；详情页显示「该记录已被删除」空状态', '视场景'],
            ['`3002`', '名称重复 / 唯一约束冲突', '和 422 一样映射到表单字段上', '表单内提示'],
            ['`4001`', '业务流程不允许（例如已审核的单子不能改）', '弹后端给的 `message`，它比前端猜的准', '弹'],
            ['`5000`', '服务端内部错误', '通用提示 + 上报监控', '弹'],
            ['`9999`', '未知错误（兜底分支）', '`message.error(body.message || \'请求失败\')`', '弹'],
          ],
          note: '三条约定必须提前和后端谈好，否则后期极难改：**① 成功码到底是 `0` 还是 `200`；② `message` 是不是可以直接给用户看（能不能直接弹）；③ 分页字段叫 `page/pageSize` 还是 `pageNum/limit`。** 谈好之后写进接口文档，前端所有页面才能共用同一个封装。',
        },
        {
          type: 'tip',
          title: '一句话记忆',
          body: '一个 axios 实例 + 两个拦截器 + 按业务拆 `api/*.ts`。页面只关心「调哪个函数、loading/error/data 怎么展示」。',
        },
      ],
    },
  },
  {
    id: 'project-data-hook',
    title: '数据请求 Hook：把 loading / error / 重试 收进一个 Hook',
    summary:
      '为什么页面里不该到处写 useEffect + setLoading；完整的 useRequest / useList 实现（分页、搜索、AbortController 竞态处理、手动重试、依赖变化自动重拉）；以及 TanStack Query 替你做了什么',
    content: {
      sections: [
        {
          type: 'tip',
          title: '一句话记住',
          body: '上一节解决了「请求怎么发」，这一节解决「请求的状态谁来管」。**`loading` / `error` / `data` 这三个 state 永远同时出现，所以它们应该被一个 Hook 一起管掉**，页面里只写 `const { data, loading, error, refetch } = useRequest(...)` 一行。',
        },
        {
          type: 'code',
          title: '6.1 先看反例：几乎每个新手项目里都有这段代码',
          language: 'tsx',
          body: `// pages/UserList/index.tsx —— 能跑，但这段代码在项目里被抄了几十遍
export default function UserList() {
  const [list, setList] = useState([])          // 数据
  const [loading, setLoading] = useState(false) // 加载中
  // 注意：这里连 error 都没有 —— 接口挂了页面就一直转圈

  useEffect(() => {
    setLoading(true)                            // 开始转圈
    getUserList()
      .then(setList)                            // 成功就塞进 state
      .finally(() => setLoading(false))         // 无论成败都关掉转圈
  }, [])                                        // 空数组：只在挂载时请求一次

  return <Table loading={loading} dataSource={list} columns={columns} />
}`,
        },
        {
          type: 'text',
          title: '6.2 为什么页面里不该到处写 `useEffect` + `setLoading`',
          body: '上面那段代码能跑，但只要页面超过五个，就会暴露四个问题：\n\n**问题一：同一段样板代码抄了几十遍。** 三个 `useState` + 一个 `useEffect`，每个页面都写一次。哪天要给所有请求加个「失败自动重试一次」，你得改几十个文件。\n\n**问题二：`error` 经常被忘掉。** 大部分人只写 `loading` 和 `data`，`.catch` 直接省了。结果接口 500 时页面永远转圈——因为 `finally` 都没写，`loading` 再也回不到 `false`。\n\n**问题三：竞态（race condition）。** 搜索框里快速输入「张」→「张三」，两个请求同时在飞。如果「张」那个请求慢了 200ms 后回来，它会**覆盖掉「张三」的结果**：你看到的是搜索框里写着「张三」，列表里却是「张」的数据。这个 bug 在本地网络快的时候根本测不出来，一上线就冒出来。\n\n**问题四：组件卸载后还在 `setState`。** 用户点进列表页立刻又退出去，请求回来时组件已经没了。React 18 之后不再报警告了，但这个请求和它后面的一串处理仍然是白跑的。\n\n这四个问题的解法完全一样：**抽成一个 Hook，在一个地方处理干净。**',
        },
        {
          type: 'code',
          title: '6.3 `hooks/useRequest.ts`：完整实现（含竞态处理）',
          language: 'ts',
          body: `// hooks/useRequest.ts —— 全项目通用的「请求三态」Hook
import { useCallback, useEffect, useRef, useState } from 'react'

// service = 真正去发请求的那个函数
// 它会收到一个 signal（取消信号），透传给 axios 就能支持「取消请求」
type Service<T> = (ctx: { signal: AbortSignal }) => Promise<T>

interface Options<T> {
  manual?: boolean               // true = 挂载时不自动请求，等你手动调 run()
  initialData?: T                // 数据回来之前的占位值，列表页一般给 []
  deps?: unknown[]               // 依赖数组：里面任意一项变了，就自动重新请求
  onSuccess?: (data: T) => void  // 成功回调，用来弹「保存成功」、关弹窗
  onError?: (err: Error) => void // 失败回调（一般不用写，拦截器已经统一弹过提示了）
}

export function useRequest<T>(service: Service<T>, options: Options<T> = {}) {
  const { manual = false, initialData, deps = [], onSuccess, onError } = options

  const [data, setData] = useState<T | undefined>(initialData) // 请求回来的数据
  const [loading, setLoading] = useState(!manual)              // 自动模式下首屏就该是加载中
  const [error, setError] = useState<Error | null>(null)       // 失败信息，成功时置回 null

  const abortRef = useRef<AbortController | null>(null) // 存住「上一次请求」的取消把手
  const seqRef = useRef(0)      // 请求序号：只有编号最新的那次结果才允许写进 state
  const aliveRef = useRef(true) // 组件是否还挂在页面上

  // 把最新的 service 和回调放进 ref：这样 run 的依赖可以是空数组，
  // 父组件每次渲染传进来的新函数也不会导致无限重新请求
  const latest = useRef({ service, onSuccess, onError })
  latest.current = { service, onSuccess, onError }

  const run = useCallback(async () => {
    abortRef.current?.abort()                // ① 先掐掉上一次还没回来的请求（竞态处理第一步）
    const controller = new AbortController() // ② 浏览器内置对象，专门用来取消异步任务
    abortRef.current = controller
    const seq = ++seqRef.current             // ③ 给本次请求发一个自增编号

    setLoading(true)
    setError(null)                           // 重新请求时先把上次的错误清掉，不然重试成功了红字还在
    try {
      const result = await latest.current.service({ signal: controller.signal })
      // ④ 竞态处理第二步：编号不是最新的（或组件已卸载），结果直接丢弃
      //    这一行就是「搜索框里写着张三、列表里却是张的数据」这个 bug 的解药
      if (seq !== seqRef.current || !aliveRef.current) return
      setData(result)
      latest.current.onSuccess?.(result)
      return result
    } catch (err) {
      // ⑤ 我们自己 abort 掉的不算错误，直接返回，不要弹提示
      //    漏了这一步，用户每输入一个字就会看到一个「网络异常」
      if (controller.signal.aborted) return
      if (seq !== seqRef.current || !aliveRef.current) return
      const e = err instanceof Error ? err : new Error(String(err))
      setError(e)
      latest.current.onError?.(e)
    } finally {
      // finally 里也要判断编号：否则旧请求回来会把新请求的 loading 关掉，转圈提前消失
      if (seq === seqRef.current && aliveRef.current) setLoading(false)
    }
  }, [])

  // deps 里任意一项变化就自动重跑；manual 模式下只暴露 run，不自动发
  useEffect(() => {
    if (!manual) run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  // 卸载时收尾：标记组件已死 + 取消还在飞的请求
  useEffect(() => {
    aliveRef.current = true
    return () => {
      aliveRef.current = false
      abortRef.current?.abort()
    }
  }, [])

  return {
    data,
    loading,
    error,
    run,                                      // 手动触发（manual 模式下用它）
    refetch: run,                             // 语义化别名：出错页的「重试」按钮直接绑它
    mutate: setData,                          // 只改本地数据不发请求（删除成功后先把那行去掉）
    cancel: () => abortRef.current?.abort(),  // 主动取消当前请求
  }
}`,
        },
        {
          type: 'code',
          title: '6.4 `hooks/useList.ts`：列表页专用（分页 + 搜索）',
          language: 'ts',
          body: `// hooks/useList.ts —— 建在 useRequest 之上，专门伺候「分页表格」这种页面
// 后台系统里 80% 的页面都是这个形状，所以再包一层非常值
import { useState } from 'react'
import { useRequest } from './useRequest'

interface PageResult<T> {
  list: T[]     // 当前这一页的数据
  total: number // 总条数，分页器要用它算一共几页
}

type Fetcher<T> = (
  params: Record<string, unknown>,      // 分页 + 搜索参数
  ctx: { signal: AbortSignal }          // 取消信号，透传给 axios
) => Promise<PageResult<T>>

export function useList<T>(fetcher: Fetcher<T>, extra: Record<string, unknown> = {}) {
  const [page, setPage] = useState(1)          // 当前页码，后端一般也是从 1 开始
  const [pageSize, setPageSize] = useState(10) // 每页条数
  const [keyword, setKeyword] = useState('')   // 搜索关键字

  // 关键：把 page / pageSize / keyword 放进 deps
  // 任意一个变化，useRequest 内部的 useEffect 就会自动重新请求，
  // 所以页面里翻页只要 setPage(2)，一个字的请求代码都不用写
  //
  // extra 用 JSON.stringify 拍平成字符串：对象在依赖数组里每次都是「新对象」，
  // 不拍平会导致每次渲染都触发一次请求，直接把接口打爆
  const req = useRequest<PageResult<T>>(
    (ctx) => fetcher({ page, pageSize, keyword, ...extra }, ctx),
    {
      initialData: { list: [], total: 0 },   // 首屏还没数据时给个空壳，避免 data.list 报 undefined
      deps: [page, pageSize, keyword, JSON.stringify(extra)],
    }
  )

  // 搜索时必须把页码打回第 1 页
  // 不然你在第 5 页搜一个新词，后端返回的第 5 页大概率是空的，用户以为「搜不到」
  function search(next: string) {
    setKeyword(next)
    setPage(1)
  }

  return {
    ...req,                              // data / loading / error / refetch / mutate 都原样透出
    list: req.data?.list ?? [],          // 解包成表格直接能用的形状
    total: req.data?.total ?? 0,
    page,
    pageSize,
    keyword,
    setPage,
    search,
    // 直接摊给 antd Table 的 pagination 属性，页面里一个字都不用改
    pagination: {
      current: page,
      pageSize,
      total: req.data?.total ?? 0,
      showSizeChanger: true,
      showTotal: (t: number) => '共 ' + t + ' 条',
      onChange: (p: number, s: number) => {
        setPage(p)
        setPageSize(s)
      },
    },
  }
}`,
        },
        {
          type: 'code',
          title: '6.5 页面里只剩两件事：取数据、渲染',
          language: 'tsx',
          body: `// pages/UserList/index.tsx
import { Alert, Button, Input, Space, Table } from 'antd'
import { getUserList, deleteUser } from '@/api/user'   // 接口层（上一节封装好的）
import { useList } from '@/hooks/useList'

export default function UserList() {
  // 一行拿到分页表格需要的一切：数据、三态、分页器、搜索、重试
  const { list, loading, error, keyword, search, pagination, refetch, mutate } = useList(
    // 把 ctx.signal 透传给 axios，取消请求才真正生效（否则只是不用结果，请求还在跑）
    (params, ctx) => getUserList(params, { signal: ctx.signal })
  )

  async function handleDelete(id: number) {
    await deleteUser(id)
    // 乐观更新：先把这一行从本地列表里去掉，用户立刻看到反馈
    mutate((prev) => ({ list: prev.list.filter((u) => u.id !== id), total: prev.total - 1 }))
    refetch() // 再静默重拉一次，保证分页和总数和后端一致
  }

  // 三态渲染：出错优先，其次交给 Table 自带的 loading 和空状态
  if (error) {
    return (
      <Alert
        type="error"
        showIcon
        title={'加载失败：' + error.message}
        action={<Button size="small" onClick={refetch}>重试</Button>}
      />
    )
  }

  return (
    <Space vertical size={12} style={{ width: '100%' }}>
      {/* 搜索：只管改 keyword，重新请求由 useList 里的 deps 自动完成 */}
      <Input.Search
        allowClear
        placeholder="搜索用户名"
        defaultValue={keyword}
        onSearch={search}
        style={{ width: 240 }}
      />
      <Table
        rowKey="id"
        loading={loading}      // 转圈交给 Table，不用自己写骨架屏
        dataSource={list}
        pagination={pagination} // 翻页 / 改每页条数，都会自动触发重新请求
        columns={[
          { title: '姓名', dataIndex: 'name' },
          { title: '角色', dataIndex: 'role' },
          {
            title: '操作',
            render: (_, row) => (
              <Button size="small" danger onClick={() => handleDelete(row.id)}>删除</Button>
            ),
          },
        ]}
      />
    </Space>
  )
}`,
        },
        {
          type: 'table',
          title: '6.6 `useRequest` 的参数与返回值速查表',
          intro: '自己写的 Hook 也要有「文档」。下面这张表就是它的说明书——**返回值那几项的名字建议直接照抄**，因为 ahooks、TanStack Query 用的都是这套叫法，以后换库你的页面几乎不用改。',
          headers: ['名字', '类型', '作用', '典型用法'],
          rows: [
            ['`options.manual`', '`boolean`', '`true` = 挂载时不自动请求。表单提交、点击导出这类「用户触发」的请求必须开', '`const { run } = useRequest(save, { manual: true })`'],
            ['`options.initialData`', '`T`', '数据回来之前的占位值，避免第一次渲染时 `data.list` 报 undefined', '列表页给 `{ list: [], total: 0 }`'],
            ['`options.deps`', '`unknown[]`', '依赖数组。里面的值一变就自动重新请求——分页、搜索、切 tab 全靠它', '`deps: [page, keyword]`'],
            ['`options.onSuccess`', '`(data) => void`', '成功后的副作用：关弹窗、弹提示、刷新父列表', '`onSuccess: () => { setOpen(false); refresh() }`'],
            ['`data`', '`T | undefined`', '请求成功后的业务数据（拦截器已经剥掉 `code/message` 外壳）', '`dataSource={data?.list}`'],
            ['`loading`', '`boolean`', '是否正在请求中', '`<Table loading={loading} />`'],
            ['`error`', '`Error | null`', '失败信息。**成功时会被重置成 `null`**，所以重试成功后红字会自己消失', '`if (error) return <Alert ... />`'],
            ['`run`', '`() => Promise`', '手动发起一次请求；会自动取消上一次没回来的', '`<Button onClick={run}>查询</Button>`'],
            ['`refetch`', '`() => Promise`', '`run` 的别名，语义上表示「重新拉一次」', '出错页的重试按钮'],
            ['`mutate`', '`(next) => void`', '只改本地 `data`，不发请求。删除 / 编辑后先让界面立刻响应（乐观更新）', '`mutate(prev => ({ ...prev, list: rest }))`'],
            ['`cancel`', '`() => void`', '主动取消当前请求。离开页面、关闭弹窗时用', '`useEffect(() => cancel, [])`'],
          ],
          note: '一个容易忽略的细节：`service` 里一定要把 `signal` 透传给 axios（`http.get(url, { signal })`），否则 `cancel()` 只是「不用这次结果」，请求本身还在跑，浏览器的并发连接数照样被占着。',
        },
        {
          type: 'code',
          live: true,
          runtime: 'react',
          language: 'tsx',
          title: 'Live Demo：关掉竞态防护，亲眼看「搜索结果和输入框对不上」',
          body: `import { useEffect, useRef, useState } from 'react' // useRef 用来存请求编号
import { Alert, Button, Input, Space, Switch, Table, Tag } from 'antd'

// 假数据。真实项目里这一段在 api/user 里，由 axios 去请求后端
const ALL = [
  { id: 1, name: '张三', role: 'admin' },
  { id: 2, name: '张小花', role: 'user' },
  { id: 3, name: '李四', role: 'user' },
  { id: 4, name: '王五', role: 'operator' },
]

// 假接口：关键字越短故意越慢，用来稳定复现「先发出的请求后回来」的竞态
function mockFetch(keyword) {
  const delay = keyword.length <= 1 ? 1500 : 300 // 一个字的请求慢 1.5 秒，两个字只要 0.3 秒
  return new Promise((resolve) => {
    setTimeout(() => resolve(ALL.filter((u) => u.name.indexOf(keyword) >= 0)), delay)
  })
}

export default function Demo() {
  const [keyword, setKeyword] = useState('') // 搜索关键字，相当于 useList 里的 keyword
  const [guard, setGuard] = useState(true) // 竞态防护开关（真实项目里就是请求编号 + AbortController）
  const [loading, setLoading] = useState(true) // 加载中
  const [list, setList] = useState(ALL) // 列表数据
  const [shownFor, setShownFor] = useState('') // 当前列表其实是哪个关键字的结果
  const [log, setLog] = useState([]) // 请求日志，用来看清谁先谁后
  const seqRef = useRef(0) // 请求编号：每发一次就 +1

  // keyword 一变就自动重新请求 —— 这就是 useRequest 里 deps 的作用
  useEffect(() => {
    const seq = ++seqRef.current // 本次请求的编号
    setLoading(true)
    mockFetch(keyword).then((data) => {
      if (guard && seq !== seqRef.current) {
        // ★ 整个 Hook 最关键的一行：编号过期就把结果丢掉
        setLog((xs) => ['丢弃：第 ' + seq + ' 次（「' + (keyword || '全部') + '」）回来晚了'].concat(xs).slice(0, 4))
        return // 注意这里不动 loading：最新那次请求回来时会关掉它
      }
      setList(data) // 写入列表
      setShownFor(keyword || '全部')
      setLoading(false)
      setLog((xs) => ['采用：第 ' + seq + ' 次（「' + (keyword || '全部') + '」）'].concat(xs).slice(0, 4))
    })
  }, [keyword, guard])

  // 输入框里写的关键字 和 列表实际对应的关键字 不一致 → 就是竞态翻车了
  const mismatch = !loading && shownFor !== (keyword || '全部')

  return (
    <Space vertical size={12} style={{ width: '100%' }}>
      <Alert
        showIcon
        type="info"
        title="玩法：先关掉「竞态防护」，然后在输入框里飞快输入「张三」（先输张，马上补三）"
      />
      <Space wrap>
        <Input
          allowClear
          placeholder="输入姓名，例如 张三"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: 200 }}
        />
        <span>竞态防护</span>
        <Switch checked={guard} onChange={setGuard} />
        <Button onClick={() => setKeyword('')}>重置</Button>
      </Space>
      <div>
        输入框里是 <Tag color="blue">{keyword || '全部'}</Tag>
        列表其实是 <Tag color={mismatch ? 'red' : 'green'}>{shownFor || '加载中'}</Tag>
      </div>
      {mismatch ? (
        <Alert showIcon type="error" title="对不上了！这就是竞态：慢请求后回来，覆盖了新请求的结果" />
      ) : null}
      <Table
        rowKey="id"
        size="small"
        loading={loading}
        pagination={false}
        dataSource={list}
        columns={[
          { title: '姓名', dataIndex: 'name' },
          { title: '角色', dataIndex: 'role', render: (v) => <Tag>{v}</Tag> },
        ]}
      />
      <div style={{ fontSize: 12, color: '#888', lineHeight: 1.9 }}>
        {log.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </Space>
  )
}`,
        },
        {
          type: 'code',
          title: '6.7 真实项目更常用 TanStack Query：同一个页面它这么写',
          language: 'tsx',
          body: `// 上面那 80 行 useRequest / useList，TanStack Query（旧名 React Query）全帮你做了
// 装它：npm install @tanstack/react-query
// 入口包一层 Provider：<QueryClientProvider client={queryClient}>...</QueryClientProvider>
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserList, deleteUser } from '@/api/user'

export default function UserList() {
  const qc = useQueryClient()          // 拿到「缓存管理器」，用来手动让某份数据失效
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')

  const { data, isLoading, isError, refetch } = useQuery({
    // queryKey 是这份数据的「身份证」，也是缓存的 key
    // 数组里的值一变就自动重新请求 —— 相当于我们自己写的 deps
    queryKey: ['users', { page, keyword }],
    // signal 由它自动塞给你，透传给 axios 就自带取消能力和竞态处理
    queryFn: ({ signal }) => getUserList({ page, keyword }, { signal }),
    staleTime: 30 * 1000,              // 30 秒内认为数据还新鲜：这期间切走再切回来，一个请求都不发
    placeholderData: (prev) => prev,   // 翻页时先保留上一页数据，避免表格闪一下空白
    retry: 1,                          // 失败自动重试 1 次（网络抖动很常见）
  })

  const del = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      // 告诉它「users 这份数据脏了」→ 所有正在用这份数据的组件自动重新拉取
      // 这一行替代了我们手写的 refetch，而且是全局生效的（列表页和详情页会一起刷新）
      qc.invalidateQueries({ queryKey: ['users'] })
    },
  })

  // 剩下的渲染和上面完全一样：isLoading 转圈、isError 显示重试、data 渲染表格
  return null
}`,
        },
        {
          type: 'table',
          title: '6.8 自己写 `useRequest` vs 用 TanStack Query',
          intro: '不是「哪个更好」，而是「什么时候值得多装一个库」。下面每一行都是 TanStack Query 帮你做掉的事：',
          headers: ['能力', '自己写 useRequest', 'TanStack Query'],
          rows: [
            ['三态（loading / error / data）', '要自己写，大约 60 行', '内置 `isLoading` / `isError` / `data`'],
            ['依赖变化自动重拉', '自己传 `deps`', '`queryKey` 变了自动重拉，还不用手写数组'],
            ['竞态处理', '自己写请求编号 + `AbortController`', '内置，`signal` 直接给你'],
            ['**缓存**', '**没有**。翻回第 1 页要重新请求一遍', '命中缓存直接给数据，`staleTime` 内一个请求都不发'],
            ['**请求去重**', '**没有**。三个组件都要用户信息就发三次请求', '同一个 `queryKey` 并发只发一次，结果共享给所有组件'],
            ['**失效重取**', '要自己一层层传 `refetch` 下去', '`invalidateQueries` 一句话，全站相关组件自动刷新'],
            ['窗口重新聚焦时刷新', '要自己监听 `visibilitychange`', '默认就开（切回浏览器标签自动拿最新数据）'],
            ['分页 / 无限滚动', '自己写', '`placeholderData` 保留上页、`useInfiniteQuery` 做无限加载'],
            ['提交类请求（增删改）', '自己写 `manual` 模式', '`useMutation` + 乐观更新 + 失败自动回滚'],
            ['DevTools', '没有', '有独立面板，能看到每份缓存的状态和过期时间'],
            ['体积成本', '0（就是你项目里的一个文件）', '约 13KB（gzip 后）'],
          ],
          note: '判断标准很直接：**接口少于 10 个、页面之间不共享数据 → 自己写这个 Hook 就够，还少一个依赖；接口几十个、多个页面要用同一份数据（用户信息、字典、菜单）→ 上 TanStack Query，缓存和去重带来的收益远超学习成本。** 但顺序别搞反：先自己写一遍，你才真的看懂 TanStack Query 到底替你做了什么。',
        },
        {
          type: 'list',
          title: '6.9 这一节的易错点',
          ordered: true,
          items: [
            '**`deps` 里放了对象或数组字面量**：`deps: [{ page }]` 每次渲染都是新对象，`useEffect` 每次都认为变了 → 无限请求，接口直接被打爆。要么拍平成 `JSON.stringify`，要么只放基本类型。',
            '**`service` 直接写成内联箭头函数还放进 `deps`**：函数每次渲染都是新的，同样导致无限循环。所以实现里用 `latest` 这个 ref 存住它。',
            '**搜索时忘了把页码打回第 1 页**：在第 5 页搜新词，后端返回空数组，用户以为「搜不到」。',
            '**竞态处理只做了一半**：只 `abort` 了旧请求但没判断请求编号。`abort` 只在请求还在飞时有用，如果响应已经在返回路上，还是会覆盖新数据——**两道防线都要有**。',
            '**把主动取消当成错误弹提示**：漏了 `if (controller.signal.aborted) return`，用户每输入一个字就弹一次「网络异常」。',
            '**`finally` 里无条件 `setLoading(false)`**：旧请求回来时把新请求的转圈关掉，用户看到「空列表 + 没有 loading」，以为没数据。',
            '**乐观更新后不 `refetch`**：本地删掉一行就不管了，分页总数和后端不一致，翻页开始错乱。',
            '**每个页面自己 `try/catch` 弹一遍错误提示**：拦截器已经统一弹过了，这里再弹一次 → 一个错误两个 toast。',
          ],
        },
        {
          type: 'tip',
          title: '一句话记忆',
          body: '`loading` / `error` / `data` 三个 state 永远同时出现，所以要一起收进 `useRequest`；`deps` 变化自动重拉，请求编号 + `AbortController` 挡住竞态，`mutate` 做乐观更新。接口一多就换 TanStack Query——它多给你的是**缓存、去重、失效重取**这三件自己写很难写好的事。',
        },
      ],
    },
  },
  {
    id: 'project-auth-i18n',
    title: '登录权限 + 国际化：两件「全站都要用」的事',
    summary:
      'token 存哪、按钮级权限怎么藏、中英文词典怎么切；antd 组件自己的文案也要跟着换',
    content: {
      sections: [
        {
          type: 'tip',
          title: '一句话记住',
          body: '**登录态用 token，权限用角色/权限码，文案用词典。** 三件事都不要写死在组件字符串里：token 放 `localStorage`，权限判断抽 `usePermission`，用户看得见的字放 `locales/*.json`。',
        },
        {
          type: 'text',
          title: '7.1 登录之后浏览器里到底存了什么',
          body: '登录接口成功后，后端通常返回 `token` + `user`（名字、角色、权限列表）。\n\n- **token**：之后每个请求的身份证，放 `localStorage`（刷新页面还在）或 `sessionStorage`（关标签就没）\n- **user**：给顶部栏头像、菜单过滤、按钮显隐用，放 Redux（或任意全局 store）\n\n不要只存 token 不存权限——否则每个页面都要再打一次「我是谁」接口才能决定按钮显不显示。',
        },
        {
          type: 'code',
          title: '7.2 按钮级权限：没有码就不要渲染',
          language: 'tsx',
          body: `// hooks/usePermission.ts
import { useAppSelector } from '@/store/hooks'

export function usePermission(code: string) {
  const codes = useAppSelector((s) => s.user.permissions)
  return codes.includes(code) || codes.includes('*')
}

// components/Auth/index.tsx
export function Auth({ code, children }) {
  const ok = usePermission(code)
  if (!ok) return null
  return children
}

// 页面里
<Auth code="user:delete">
  <Button danger>删除</Button>
</Auth>`,
        },
        {
          type: 'text',
          title: '7.3 国际化：先把字从组件里抠出来',
          body: '不要写 `<Button>新增用户</Button>`，要写 `<Button>{t(\'user.add\')}</Button>`。\n\n词典是两份 JSON，key 必须一模一样：\n\n`locales/zh-CN.json`：`{ "user.add": "新增用户" }`\n`locales/en-US.json`：`{ "user.add": "Add user" }`\n\n切换语言只改 `i18n.changeLanguage(\'en-US\')`，并同步 `antd` 的 `ConfigProvider locale`（否则分页器还显示「上一页」）。',
        },
        {
          type: 'code',
          title: '7.4 i18n 最小接入（react-i18next）',
          language: 'ts',
          body: `// locales/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import zh from './zh-CN.json'
import en from './en-US.json'

i18n.use(initReactI18next).init({
  resources: { 'zh-CN': { translation: zh }, 'en-US': { translation: en } },
  lng: localStorage.getItem('lang') || 'zh-CN',
  fallbackLng: 'zh-CN',
  interpolation: { escapeValue: false }, // React 已经防 XSS
})

export default i18n

// 组件里
import { useTranslation } from 'react-i18next'
const { t, i18n } = useTranslation()
i18n.changeLanguage('en-US')
localStorage.setItem('lang', 'en-US')`,
        },
        {
          type: 'code',
          live: true,
          runtime: 'react',
          language: 'tsx',
          title: 'Live Demo：权限开关 + 中英文切换',
          body: `import { useMemo, useState } from 'react'
import { Button, Card, Select, Space, Switch, Table, Tag } from 'antd'

const DICT = {
  'zh-CN': { title: '用户列表', add: '新增', del: '删除', name: '姓名', role: '角色', empty: '没有删除权限，按钮已隐藏' },
  'en-US': { title: 'Users', add: 'Add', del: 'Delete', name: 'Name', role: 'Role', empty: 'No delete permission — button hidden' },
}

const USERS = [
  { id: 1, name: 'Ada', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' },
]

export default function Demo() {
  const [lang, setLang] = useState('zh-CN')
  const [canDelete, setCanDelete] = useState(true)
  const [list, setList] = useState(USERS)
  const t = DICT[lang]

  const columns = useMemo(() => [
    { title: t.name, dataIndex: 'name' },
    { title: t.role, dataIndex: 'role', render: (v) => <Tag>{v}</Tag> },
    {
      title: '',
      render: (_, row) => canDelete ? (
        <Button size="small" danger onClick={() => setList((xs) => xs.filter((x) => x.id !== row.id))}>{t.del}</Button>
      ) : null,
    },
  ], [t, canDelete])

  return (
    <Space vertical size={12} style={{ width: '100%' }}>
      <Space wrap>
        <Select value={lang} onChange={setLang} style={{ width: 140 }} options={[
          { value: 'zh-CN', label: '中文' },
          { value: 'en-US', label: 'English' },
        ]} />
        <span>删除权限</span>
        <Switch checked={canDelete} onChange={setCanDelete} />
      </Space>
      <Card title={t.title} extra={<Button type="primary">{t.add}</Button>} size="small">
        <Table rowKey="id" size="small" pagination={false} columns={columns} dataSource={list} />
        {!canDelete ? <div style={{ marginTop: 8, color: '#888' }}>{t.empty}</div> : null}
      </Card>
    </Space>
  )
}`,
        },
        {
          type: 'list',
          title: '7.5 易错清单',
          ordered: true,
          items: [
            '用 `if (role === \'admin\')` 写死在十个页面里——角色一改全站漏改。统一走权限码',
            '前端隐藏按钮 ≠ 安全：接口还必须校验，前端只是少让人点错',
            '词典 key 中英文不一致：`user.add` vs `user.Add`，切语言变空白',
            '只翻译了自己的文案，忘了给 antd 换 `locale`，表格还显示 Pagination',
          ],
        },
        {
          type: 'table',
          title: '7.6 权限粒度对照表：一共要拦四层',
          intro: '「加权限」不是一件事，而是**四层拦截**，粒度从粗到细。新手最常见的错是只做了菜单级——菜单里看不到，但把 URL 直接粘进地址栏照样能进。',
          headers: ['粒度', '拦的是什么', '怎么实现', '漏了会怎样'],
          rows: [
            ['**菜单级**', '左侧菜单里看不看得见这一项', '拿路由表的 `meta.roles` 和当前用户角色比对，过滤掉不匹配的，再生成 `Menu` 的 `items`', '普通成员看到一堆点进去就报 403 的菜单，体验很差'],
            ['**路由级**', '直接输入 URL 能不能进这个页面', '在 `RequireAuth` 里再判一次 `meta.roles`：不匹配就渲染 403 页面（**不是跳登录页**）', '**最危险的一层**。菜单藏了但 URL 能进，等于没做权限'],
            ['**按钮级**', '页面里某个操作按钮显不显示', '`<Auth code="user:delete">` 包住按钮，`usePermission` 查不到码就 `return null`', '普通成员看到删除按钮，点了报错，以为是系统坏了'],
            ['**字段级**', '表格里某一列、详情里某个字段能不能看', '列配置里 `.filter()` 一遍：`columns.filter(c => !c.code || has(c.code))`', '手机号、身份证、薪资这类敏感字段泄露给所有人'],
            ['**接口级（后端做）**', '这个账号能不能调这个接口', '后端在网关或每个接口上校验，越权返回 403 / 业务码 `2002`', '**前端隐藏 ≠ 安全**。会用 F12 的人改一行 state 就能让按钮出现，接口照样调得通'],
          ],
          note: '记住这句话：**前端权限是「体验」，后端权限才是「安全」。** 前端做四层是为了让用户不看到、不点错；真正拦住越权的永远是后端。所以前端权限逻辑写得再漂亮，也一定要问后端「这个接口校验了吗」。',
        },
        {
          type: 'table',
          title: '7.7 国际化文案组织方式表',
          intro: '词典该怎么组织，取决于项目多大。下面按项目规模从小到大排，**先看最后一列判断自己该用哪种**。',
          headers: ['组织方式', 'key 长什么样', '优点', '缺点 / 什么时候用'],
          rows: [
            ['**单文件扁平 key**', '`{ "user.add": "新增用户", "user.del": "删除" }`，全站两个 JSON', '最简单，一眼看完；改文案只开两个文件', '超过 300 条就开始重复和冲突。**页面少于 10 个时用它**'],
            ['**按模块分组（嵌套）**', '`{ "user": { "add": "新增用户" } }`，代码里写 `t(\'user.add\')`', '结构清晰，模块之间不会撞名', '嵌套太深（超过三层）时 key 很长。**最常用的方案**'],
            ['**按页面拆 namespace**', '一个页面一个 JSON：`user.json`、`login.json`，用 `useTranslation(\'user\')`', '可以**按需懒加载**，进哪个页面才下载哪份词典', '要配 i18next 的 backend 插件。**几十个页面、词典上千条时用它**'],
            ['**公共 + 业务两层**', '`common.json` 放「确定/取消/保存」，各模块只放自己的业务词', '「确定」这种词全站只写一次，改一处全站生效', '要约定好什么算公共词。**推荐和上面两种搭配用**'],
            ['**中文原文当 key**', '`{ "新增用户": "Add user" }`', '写代码时不用起 key 名，`t(\'新增用户\')` 直接可读', '中文改一个字，所有语言的 key 全要改；key 里带标点很容易出错。**不推荐**'],
            ['**在线翻译平台**', '代码里只有 key，文案由 Crowdin / 自研平台管理，构建时拉下来', '翻译能交给非开发同学做，不用改代码', '要搭流程和 CI。**要出海、语言超过三种时才值得**'],
            ['**框架自带文案**', '`antd` 用 `ConfigProvider locale={enUS}`；`dayjs` 用 `dayjs.locale(\'en\')`', '分页器、日期选择器、空状态的内置文字自动跟着变', '**最容易忘的一项**：只翻自己的文案，会出现「上一页」和 Add 混在一起'],
          ],
          note: '还有两条实践经验：**① key 一律用英文小写加点**（`user.form.nameRequired`），中文项目也这样写，方便全局搜索；**② 词典里禁止拼接**——不要写 `t(\'共\') + count + t(\'条\')`，要用插值 `t(\'total\', { count })`，因为英文的语序和中文完全不同。',
        },
        {
          type: 'tip',
          title: '一句话记忆',
          body: 'token 证明「你是谁」，权限码证明「你能干什么」，词典证明「页面说哪种话」。三件事都抽成基础设施，业务页只消费，不自己发明。',
        },
      ],
    },
  },
  {
    id: 'project-global-state',
    title: '全局状态：哪些数据该放全局，怎么放',
    summary:
      '先讲判断标准（该放全局的 5 类 / 不该放全局的 4 类），再对照 Context、Redux Toolkit、Zustand 三种方案，最后给出后台系统真实的 store 划分',
    content: {
      sections: [
        {
          type: 'tip',
          title: '一句话记住',
          body: '判断标准只有一句：**关掉这个页面去另一个页面，这份数据还要用吗？** 要用 → 全局；不要用 → 页面里 `useState`。新手翻车几乎都是把「搜索关键字」「弹窗开关」这类临时状态塞进了全局 store。',
        },
        {
          type: 'text',
          title: '8.1 为什么要有「全局状态」这个东西',
          body: '先看一个具体场景。用户信息（名字、头像、角色）在三个地方要用：\n\n- 顶部栏要显示头像和名字\n- 左侧菜单要根据角色过滤掉没权限的菜单项\n- 用户列表页要根据角色决定删除按钮显不显示\n\n这三个组件在组件树上离得非常远。如果只用 props，你得从最外层的 `App` 一层层往下传，中间那些压根不关心用户信息的组件也得写一遍 `props.user` 再传下去——这就是所谓的 **props 逐层透传（prop drilling）**，改一个字段要动五六个文件。\n\n全局状态解决的就是这一件事：**把数据放在一个所有组件都能直接拿到的地方。**\n\n但它有代价，而且新手常常低估：\n\n- **调试变难。** 页面上一个数字不对，你不知道是哪个组件改的，得全局搜索 `dispatch`\n- **重渲染范围变大。** 放在 Context 里的值一变，所有用了它的组件全部重渲染\n- **代码变长。** 一个字段要写 action、reducer、selector，比 `useState` 多好几倍代码\n\n所以正确的心态是：**全局状态是不得不用时才用的工具，不是「高级写法」。** 能用 `useState` 解决的，永远优先 `useState`。',
        },
        {
          type: 'table',
          title: '8.2 判断表：这份数据该放全局吗',
          intro: '照着这张表对一眼就行。判断依据始终是那句话——**换个页面还要用吗？**',
          headers: ['数据', '放哪里', '为什么'],
          rows: [
            ['**当前登录人 + token**', '✅ 全局', '顶部栏、菜单、权限判断、请求头都要用，典型的跨页面数据'],
            ['**权限码 / 可见菜单**', '✅ 全局', '每个页面的按钮显隐都依赖它，而且只在登录时拉一次'],
            ['**主题（亮 / 暗）**', '✅ 全局', '影响整站外观，还要持久化到 `localStorage`'],
            ['**当前语言**', '✅ 全局', '整站文案 + antd 内置文案 + 日期格式都跟着它变'],
            ['**购物车 / 待提交清单**', '✅ 全局', '商品列表页加购、顶部角标显示数量、结算页读取——三个页面共享'],
            ['**未读消息数、全局通知**', '✅ 全局', '轮询一次，多处显示'],
            ['**表单里正在输入的值**', '❌ 页面内（`useState` 或 `Form`）', '只有这个表单自己用；进了全局，每敲一个字符全站重渲染'],
            ['**列表的筛选条件 / 页码**', '❌ 页面内（或放 URL 查询参数）', '离开页面就没意义了。要「回到列表还保留筛选」的话，正确做法是放 URL 上（`?page=2&keyword=张`），刷新和分享链接都还在'],
            ['**弹窗的开关状态**', '❌ 页面内', '典型的临时 UI 状态，`const [open, setOpen] = useState(false)` 就够'],
            ['**接口返回的列表数据**', '❌ 交给数据请求 Hook / TanStack Query', '这是**服务端数据的缓存**，不是「应用状态」。塞进 store 你就得自己处理「什么时候失效、什么时候重拉」——那正是查询库的活（见本章「数据请求 Hook」那节）'],
            ['**某个页面的 tab 选中项**', '❌ 页面内（或 URL）', '只影响这一个页面'],
          ],
          note: '最重要的一条是倒数第三行：**接口数据不要放全局 store。** 这是 Redux 时代留下的最大误区。「服务端数据」和「客户端状态」是两种东西：前者需要缓存、失效、重取（交给 TanStack Query），后者才是 store 该管的（登录态、主题、语言）。分清这两个，你的 store 会瘦一大半。',
        },
        {
          type: 'table',
          title: '8.3 三种方案对照：Context / Redux Toolkit / Zustand',
          intro: '三个都能用，区别在「样板代码有多少」和「出问题好不好查」。**先看最后一行选一个，别纠结。**',
          headers: ['维度', 'Context（React 自带）', 'Redux Toolkit', 'Zustand'],
          rows: [
            ['要不要装依赖', '不用，React 自带', '要（`@reduxjs/toolkit` + `react-redux`）', '要（约 1KB，极小）'],
            ['写一个字段要多少代码', '`createContext` + `Provider` + 自定义 Hook，约 20 行', 'slice + store + 类型化 hooks，约 40 行（一次性成本）', '`create` 一个函数，约 8 行'],
            ['读取写法', '`const { user } = useContext(AppContext)`', '`useAppSelector(s => s.user)` + `dispatch(action)`', '`const user = useUserStore(s => s.user)`'],
            ['**重渲染控制**', '**最差**：value 里任何一个字段变，所有消费组件全重渲染', '好：`useSelector` 只订阅你选的那一小块', '好：选择器函数只订阅你选的那一块'],
            ['DevTools 调试', '没有，只能 `console.log`', '**最强**：能看每个 action、时间旅行回退', '有（可接 Redux DevTools）'],
            ['异步逻辑（登录、拉用户信息）', '自己写，容易散乱', '`createAsyncThunk`，pending/fulfilled/rejected 三态自动生成', '直接在 store 的方法里 `await`，最简单'],
            ['能不能在组件外读写', '不能（必须在组件里）', '能（`store.getState()`）', '能（`useUserStore.getState()`）'],
            ['团队协作 / 大型项目', '一般（约定全靠自觉）', '**最好**：写法被框架限死，十个人写出来一个样', '好，但约定要自己定'],
            ['**什么时候选它**', '**只有 2～3 个简单全局值**（主题、语言），且很少变', '**复杂业务、多人协作、需要严格可追溯**（金融、后台中台）', '**中小项目、想少写样板代码**——这几年新项目最流行的选择'],
          ],
          note: '一个很实用的组合拳：**主题 / 语言用 Context，登录态和权限用 Zustand（或 RTK），接口数据用 TanStack Query。** 三样东西各管一段，谁都不越界。反过来最糟的做法是「所有东西都塞进一个巨大的 Redux store」。',
        },
        {
          type: 'code',
          title: '8.4 方案一：Context（简单全局值，零依赖）',
          language: 'tsx',
          body: `// store/ThemeContext.tsx —— 适合「主题、语言」这种只有两三个值、很少变的场景
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

interface ThemeValue {
  theme: 'light' | 'dark'
  toggle: () => void
}

// createContext 就是开一条「不用逐层传 props 的通道」
// 默认值只在「组件外面没包 Provider」时生效，一般给一个占位值
const ThemeContext = createContext<ThemeValue>({ theme: 'light', toggle: () => {} })

export function ThemeProvider({ children }) {
  // 初始值从 localStorage 读：刷新页面后主题不会丢
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  )

  // useCallback 让 toggle 的引用保持稳定，否则每次渲染都是新函数
  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', next) // 顺手持久化
      return next
    })
  }, [])

  // ★ 必须用 useMemo 包住 value
  // 不包的话，每次 Provider 重渲染都会生成一个新对象 { theme, toggle }，
  // 所有 useContext 的组件都会跟着重渲染 —— Context 性能问题的头号原因
  const value = useMemo(() => ({ theme, toggle }), [theme, toggle])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// 自定义 Hook 包一层：业务组件不用知道 Context 对象叫什么名字
// 顺便加一个「忘了包 Provider」的报错，比拿到默认值默默出错好排查得多
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme 必须在 ThemeProvider 里面用')
  return ctx
}

// 用法：main.tsx 里 <ThemeProvider><App /></ThemeProvider>
//      任意深层组件里 const { theme, toggle } = useTheme()`,
        },
        {
          type: 'code',
          title: '8.5 方案二：Redux Toolkit（复杂业务、多人协作）',
          language: 'ts',
          body: `// ===== store/slices/userSlice.ts —— 一个 slice 管一块业务 =====
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { login as loginApi, getProfile } from '@/api/auth'

// createAsyncThunk 会自动生成 pending / fulfilled / rejected 三个 action
// 好处：loading 和 error 不用自己维护，登录按钮的转圈直接读 status
export const login = createAsyncThunk(
  'user/login',                                  // action 名字，DevTools 里显示的就是它
  async (params: { username: string; password: string }) => {
    const res = await loginApi(params)           // 调接口
    localStorage.setItem('token', res.token)     // token 存本地，让 request.ts 的拦截器去读
    const profile = await getProfile()           // 再拉一次「我是谁」，拿到角色和权限码
    return profile                               // return 的值会变成 fulfilled 的 payload
  }
)

const userSlice = createSlice({
  name: 'user',                                  // 状态树上的名字，读的时候是 state.user
  initialState: {
    info: null as null | { name: string; role: string },
    permissions: [] as string[],                 // 权限码数组，按钮级权限要用
    status: 'idle' as 'idle' | 'loading' | 'failed',
  },
  reducers: {
    // RTK 内置了 immer，所以这里可以「直接改」state，它会帮你生成新对象
    // 注意：只有在 RTK 的 reducer 里能这么写，别的地方直接改 state 是 bug
    logout(state) {
      state.info = null
      state.permissions = []
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.status = 'loading' })     // 请求中
      .addCase(login.fulfilled, (state, action) => {                        // 成功
        state.status = 'idle'
        state.info = action.payload
        state.permissions = action.payload.permissions
      })
      .addCase(login.rejected, (state) => { state.status = 'failed' })      // 失败
  },
})

export const { logout } = userSlice.actions      // 导出同步 action
export default userSlice.reducer

// ===== store/index.ts —— 把所有 slice 拼成一棵状态树 =====
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import appReducer from './slices/appSlice'

export const store = configureStore({
  reducer: { user: userReducer, app: appReducer }, // 对应 state.user / state.app
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// ===== store/hooks.ts —— 类型化的两个 Hook（这一步别省）=====
import { useDispatch, useSelector } from 'react-redux'

// 包一层之后，写 useAppSelector(s => s.user.info) 时编辑器能自动补全字段名
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

// ===== 组件里 =====
// const { info, status } = useAppSelector((s) => s.user)
// const dispatch = useAppDispatch()
// dispatch(login({ username, password }))`,
        },
        {
          type: 'code',
          title: '8.6 方案三：Zustand（轻量，这几年新项目最流行）',
          language: 'ts',
          body: `// store/useUserStore.ts —— 同样的功能，代码只有 RTK 的三分之一
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { login as loginApi, getProfile } from '@/api/auth'

interface UserState {
  info: null | { name: string; role: string }
  permissions: string[]
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  has: (code: string) => boolean
}

// create 里的 set 用来改状态，get 用来读当前状态
// 注意：状态和「改状态的方法」是写在一起的，不像 Redux 要拆成 action + reducer
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      info: null,
      permissions: [],
      loading: false,

      // 异步逻辑直接 async/await 写在这里，不需要 thunk 那一套
      login: async (username, password) => {
        set({ loading: true })                    // set 只需传要改的字段，其余自动保留
        try {
          const res = await loginApi({ username, password })
          localStorage.setItem('token', res.token)
          const profile = await getProfile()
          set({ info: profile, permissions: profile.permissions })
        } finally {
          set({ loading: false })                 // 无论成败都要关掉转圈
        }
      },

      logout: () => {
        localStorage.removeItem('token')
        set({ info: null, permissions: [] })
      },

      // 派生逻辑（相当于 Redux 的 selector）也可以直接写成方法
      has: (code) => {
        const { permissions } = get()
        return permissions.includes(code) || permissions.includes('*')
      },
    }),
    {
      name: 'user-store',                                     // localStorage 里的 key
      partialize: (s) => ({ info: s.info, permissions: s.permissions }), // 只持久化这两个字段
    }
  )
)

// ===== 组件里：不需要 Provider，直接 import 就能用 =====
// const info = useUserStore((s) => s.info)          // 只订阅 info，别的字段变了不重渲染
// const login = useUserStore((s) => s.login)
//
// ★ 常见性能坑：写成 useUserStore() 不传选择器，会订阅整个 store，
//   任何字段变化都让这个组件重渲染。永远传一个选择器函数。
//
// 组件外也能用（比如在 axios 拦截器里）：useUserStore.getState().logout()`,
        },
        {
          type: 'code',
          title: '8.7 本项目的 store 划分：三块，各管一段',
          language: 'text',
          body: `store/
├── index.ts              ← configureStore（用 Zustand 就不需要这个文件）
├── hooks.ts              ← 类型化的 useAppSelector / useAppDispatch
└── slices/
    ├── userSlice.ts      ← 【当前登录人】
    │     info          : { id, name, avatar, role }   登录接口返回，顶部栏和权限判断都读它
    │     permissions   : string[]                     权限码，如 ['user:add','user:delete']
    │     status        : 'idle' | 'loading' | 'failed' 登录按钮的转圈状态
    │     ─ 为什么全局：顶部栏、菜单过滤、按钮权限三处都要用，且只在登录时拉一次
    │
    ├── appSlice.ts       ← 【应用级配置】
    │     theme         : 'light' | 'dark'             整站外观
    │     lang          : 'zh-CN' | 'en-US'            当前语言，同时驱动 antd 的 locale
    │     collapsed     : boolean                      左侧菜单是否折叠（用户偏好，要持久化）
    │     ─ 为什么全局：影响整个 Layout，而且要写进 localStorage 记住用户选择
    │
    └── permissionSlice.ts ← 【可见菜单与路由】
          menus         : MenuItem[]                   按角色过滤后的菜单树
          routes        : RouteObject[]                动态路由表（后端返回菜单的项目才需要）
          loaded        : boolean                      是否已经生成过，避免重复计算
          ─ 为什么全局：菜单在 Layout 里渲染，路由守卫也要读它判断能不能进

❌ 这三块里故意没有的东西（都不该进 store）：
   · 用户列表数据          → 交给 useList / TanStack Query（是服务端数据的缓存，不是应用状态）
   · 列表的搜索词和页码    → 页面内 useState，或者更好：放 URL 查询参数
   · 弹窗开关、表单草稿    → 页面内 useState
   · 全局 loading          → 各页面自己的 loading 就够，一个全局遮罩会挡住所有操作

💡 划分原则：一个 slice 对应「一件业务上的事」，而不是「一个页面」。
   如果你发现自己在建 userListSlice、orderListSlice，说明把接口数据塞进来了 —— 那是查询库的活。`,
        },
        {
          type: 'code',
          live: true,
          runtime: 'react',
          language: 'tsx',
          title: 'Live Demo：手写一个迷你全局 store，两个组件不传 props 也能同步',
          body: `import { createContext, useContext, useMemo, useReducer } from 'react' // Context + useReducer 就能手写一个迷你 store
import { Alert, Button, Card, Segmented, Space, Tag } from 'antd'

// ① 初始状态。真实项目里这一段是 Redux 的 initialState 或 Zustand 的 create 参数
const initialState = { user: null, theme: 'light', lang: 'zh-CN', logs: [] }

// ② reducer：老 state + action → 新 state。必须返回新对象，不能直接改老的
function reducer(state, action) {
  const log = (text) => [text].concat(state.logs).slice(0, 4) // 只留最近 4 条，模拟 DevTools 的 action 记录
  switch (action.type) {
    case 'user/login': // action 的命名习惯：模块名/动作名
      return { ...state, user: { name: action.payload, role: 'admin' }, logs: log('user/login → ' + action.payload) }
    case 'user/logout':
      return { ...state, user: null, logs: log('user/logout') }
    case 'app/setTheme':
      return { ...state, theme: action.payload, logs: log('app/setTheme → ' + action.payload) }
    case 'app/setLang':
      return { ...state, lang: action.payload, logs: log('app/setLang → ' + action.payload) }
    default:
      return state // 不认识的 action 原样返回，这是 reducer 的铁律
  }
}

// ③ Context 就是「不用逐层传 props」的那条通道
const StoreContext = createContext(null)
const useStore = () => useContext(StoreContext) // 自定义 Hook：任何深层组件一行拿到全局状态

// ④ 两个「页面级」组件：注意它们都没有接收任何 props
function TopBar() {
  const { state, dispatch } = useStore() // 直接从全局拿，不关心数据是谁改的
  return (
    <Card size="small" title="顶部栏（组件 A）">
      <Space wrap>
        {state.user ? <Tag color="green">{state.user.name}（{state.user.role}）</Tag> : <Tag>未登录</Tag>}
        {state.user ? (
          <Button size="small" onClick={() => dispatch({ type: 'user/logout' })}>退出</Button>
        ) : (
          <Button size="small" type="primary" onClick={() => dispatch({ type: 'user/login', payload: '张三' })}>登录</Button>
        )}
        <Tag color="blue">主题 {state.theme}</Tag>
        <Tag color="purple">语言 {state.lang}</Tag>
      </Space>
    </Card>
  )
}

function SettingPage() {
  const { state, dispatch } = useStore()
  return (
    <Card size="small" title="设置页（组件 B，和组件 A 之间没有任何 props）">
      <Space vertical size={8} style={{ width: '100%' }}>
        <Segmented
          value={state.theme}
          onChange={(v) => dispatch({ type: 'app/setTheme', payload: String(v) })}
          options={[{ value: 'light', label: '亮色' }, { value: 'dark', label: '暗色' }]}
        />
        <Segmented
          value={state.lang}
          onChange={(v) => dispatch({ type: 'app/setLang', payload: String(v) })}
          options={[{ value: 'zh-CN', label: '中文' }, { value: 'en-US', label: 'English' }]}
        />
      </Space>
    </Card>
  )
}

export default function Demo() {
  const [state, dispatch] = useReducer(reducer, initialState) // useReducer 就是一个迷你 Redux
  // ★ 必须用 useMemo：不然每次渲染都生成新的 value 对象，所有消费组件白白重渲染
  const value = useMemo(() => ({ state, dispatch }), [state])

  return (
    <StoreContext.Provider value={value}>
      <Space vertical size={12} style={{ width: '100%' }}>
        <Alert showIcon type="info" title="改设置页里的主题和语言，顶部栏会同步变 —— 两个组件之间没有任何 props" />
        <TopBar />
        <SettingPage />
        <Card size="small" title="action 日志（真实项目里这是 Redux DevTools 的画面）">
          {state.logs.length ? (
            state.logs.map((l, i) => <div key={i} style={{ fontSize: 12, color: '#666' }}>{l}</div>)
          ) : (
            <div style={{ fontSize: 12, color: '#999' }}>还没有任何操作</div>
          )}
        </Card>
      </Space>
    </StoreContext.Provider>
  )
}`,
        },
        {
          type: 'list',
          title: '8.8 这一节的易错点',
          ordered: true,
          items: [
            '**什么都往 store 里塞**：搜索框的每个字符都 `dispatch` 一次，全站组件跟着重渲染。判断标准永远是「换页面还要用吗」。',
            '**接口数据放 store**：于是你要自己写「什么时候失效、什么时候重拉、多个页面怎么共享」——这正是 TanStack Query 干的事，别自己造。',
            '**Context 的 `value` 没用 `useMemo` 包**：每次渲染都是新对象，所有 `useContext` 的组件全部重渲染，性能问题最常见的来源。',
            '**Zustand 里写 `useUserStore()` 不传选择器**：等于订阅整个 store，任何字段变化都重渲染。永远写 `useUserStore(s => s.info)`。',
            '**在 RTK 之外的地方直接改 state**：`state.info.name = \'x\'` 只有在 RTK 的 reducer 里（内置 immer）才合法，别的地方这么写页面根本不会更新。',
            '**`request.ts` 里从 store 读 token**：底层文件依赖了上层，很容易循环引用，打包直接报 `Cannot access before initialization`。token 一律从 `localStorage` 读。',
            '**登出时只清了 store 没清 `localStorage`**：刷新页面又「自动登录」回来了。两边都要清。',
            '**主题 / 语言忘了持久化**：用户切成暗色，刷新又变回亮色。这类偏好设置一定要写进 `localStorage`。',
          ],
        },
        {
          type: 'tip',
          title: '一句话记忆',
          body: '「换个页面还要用吗」决定进不进全局；**应用状态（登录态、主题、语言）进 store，服务端数据（列表、详情）进查询库**。两三个简单值用 Context（记得 `useMemo` 包 value），复杂业务用 Redux Toolkit，想少写样板代码用 Zustand。',
        },
      ],
    },
  },
  {
    id: 'project-form-quality',
    title: '表单与质量兜底：复杂表单怎么写、上线前怎么保证不崩',
    summary:
      'antd Form 在真实项目里的完整用法（校验规则、字段联动、动态增减、提交前转换）+ react-hook-form 适合什么场景 + 错误边界、错误上报、统一兜底 UI 这套质量地基',
    content: {
      sections: [
        {
          type: 'tip',
          title: '一句话记住',
          body: '**字段超过 5 个就别手写受控了，交给表单库。** 表单库替你管三件事：值、校验、错误提示。质量兜底也是一套固定动作：**ErrorBoundary 包住路由 + 全局错误上报 + 加载/空/错三态统一封装**，这三样配齐，页面就不会白屏。',
        },
        {
          type: 'text',
          title: '9.1 受控 vs 表单库：什么时候该换',
          body: '前面章节学的是**受控组件**：每个输入框一个 `useState`，`value` 和 `onChange` 自己接。两三个字段时它最清晰，没必要上库。\n\n但真实的后台表单动不动就是十几个字段。这时手写受控会碰到四堵墙：\n\n**第一堵：state 爆炸。** 12 个字段就是 12 个 `useState`，或者一个大对象加一堆 `setForm({ ...form, name: v })`。后者每次输入都要展开整个对象。\n\n**第二堵：校验逻辑无处安放。** 「姓名必填且 2-10 字」「手机号格式」「密码和确认密码要一致」「选了管理员才必填管理范围」……写在 `onChange` 里会把组件塞爆，写在提交时又没法及时给用户反馈。\n\n**第三堵：错误提示要自己管位置。** 每个字段下面显示什么红字、什么时候显示、提交失败后要不要滚动到第一个错误项——全都要手写。\n\n**第四堵：性能。** 一个 `useState` 在顶层，敲一个字整个表单的十几个组件全部重渲染。\n\n表单库存在的意义就是把这四件事一次性解决掉。React 生态里主流就两个：**antd 的 `Form`**（用了 antd 就直接用它，零额外依赖）和 **react-hook-form**（不依赖 UI 库，性能最好）。',
        },
        {
          type: 'table',
          title: '9.2 三种写法对照：什么时候用哪个',
          intro: '不要「因为高级」而选表单库，要按字段数量和场景选：',
          headers: ['维度', '手写受控 `useState`', 'antd `Form`', 'react-hook-form'],
          rows: [
            ['要装什么', '什么都不用', '用了 antd 就自带', '`react-hook-form`（约 9KB），配合 `zod` 做校验'],
            ['值存在哪', '你自己的 `useState`', '表单实例内部（`Form.useForm()`）', '`ref` 里（**非受控**，所以输入时不触发重渲染）'],
            ['校验怎么写', '自己写 if / 正则', '`rules` 数组，声明式，红字自动显示在字段下方', 'resolver + schema（`zod` / `yup`），校验规则能和 TS 类型共用一份'],
            ['**输入时的重渲染**', '整个表单组件都重渲染', '只重渲染那一个 `Form.Item`（内部做了隔离）', '**几乎不重渲染**（非受控，性能最好）'],
            ['字段联动', '自己写 `if`', '`Form.useWatch` 监听 + `shouldUpdate`', '`watch()`'],
            ['动态增减字段', '自己维护数组', '`Form.List`，配套的增删 API 都有', '`useFieldArray`'],
            ['和 UI 库的配合', '——', '和 antd 组件天然一体，样式对齐、错误位置都不用管', '要用 `Controller` 手动接 antd / MUI 这类受控组件，多一层包装'],
            ['**什么时候用**', '**1～4 个字段**：登录页、搜索框、简单弹窗', '**项目用了 antd**（后台系统的绝大多数情况）就用它，别再装库', '**没用组件库 / 自己写的 UI**；或者**几十个字段的超大表单**在意每一次输入的性能；或者想让校验 schema 和 TS 类型同源'],
          ],
          note: '一句大实话：**技术选型跟着 UI 库走。** 项目用 antd 就用 `Form`，用 MUI 或自己写 UI 就上 react-hook-form。同一个项目里两套表单库混用是最糟的选择——新人根本不知道该抄哪个页面。',
        },
        {
          type: 'code',
          title: '9.3 antd `Form` 在真实项目里的完整用法（四个真需求）',
          language: 'tsx',
          body: `// pages/UserList/UserFormModal.tsx
// 一个组件同时干「新增」和「编辑」两件事，这是后台系统最常见的表单形态
import { useEffect } from 'react'
import { Button, Form, Input, InputNumber, Modal, Select, Space, message } from 'antd'
import dayjs from 'dayjs'
import { createUser, updateUser } from '@/api/user'

export default function UserFormModal({ open, record, onClose, onSuccess }) {
  const [form] = Form.useForm() // 表单实例：校验、取值、设值、重置全靠它

  // ★ 需求一：字段联动 —— 监听 role 的值，选了 admin 才显示「管理范围」
  //   Form.useWatch 只会让「用到它的地方」重渲染，比自己 onValuesChange 存 state 干净
  const role = Form.useWatch('role', form)

  // 编辑时把已有数据回填进表单
  useEffect(() => {
    if (!open) return
    if (record) {
      // ★ 需求二：接口数据 → 表单值的转换（形状常常不一样）
      form.setFieldsValue({
        ...record,
        birthday: record.birthday ? dayjs(record.birthday) : undefined, // 字符串日期要转成 dayjs 对象，DatePicker 才认
        tags: (record.tags || '').split(',').filter(Boolean),           // 后端给逗号字符串，Select 要数组
      })
    } else {
      form.resetFields() // 新增时清空。别忘了这一步，否则会带上一次编辑的残留值
    }
  }, [open, record, form])

  async function handleOk() {
    // validateFields 会跑一遍所有 rules；有一条不过就 reject，并自动滚动到第一个错误项
    const values = await form.validateFields()

    // ★ 需求三：提交前的数据转换（界面的形状 ≠ 接口要的形状）
    const payload = {
      ...values,
      name: values.name.trim(),                                  // 去掉首尾空格，否则「 张三 」会进数据库
      birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : null, // dayjs 对象转回字符串
      tags: (values.tags || []).join(','),                        // 数组拼回逗号字符串
      scope: values.role === 'admin' ? values.scope : undefined,  // 非管理员就别把这个字段发上去
      contacts: (values.contacts || []).filter((c) => c?.value),  // 动态字段里的空行要过滤掉
    }

    if (record) await updateUser(record.id, payload)
    else await createUser(payload)
    message.success(record ? '修改成功' : '创建成功')
    onSuccess() // 通知父组件刷新列表
    onClose()
  }

  return (
    <Modal open={open} title={record ? '编辑用户' : '新增用户'} onOk={handleOk} onCancel={onClose} destroyOnHidden>
      <Form form={form} layout="vertical" initialValues={{ role: 'user', level: 1 }}>
        <Form.Item
          name="name"
          label="姓名"
          rules={[
            { required: true, message: '请输入姓名' },                 // 必填
            { min: 2, max: 10, message: '长度 2~10 个字' },            // 长度
            { pattern: /^[\\u4e00-\\u9fa5a-zA-Z]+$/, message: '只允许中文或英文' }, // 正则
            {
              // 自定义校验：需要查接口、或者要跨字段判断时用它
              validator: async (_, value) => {
                if (value === 'admin') throw new Error('这个名字被保留了，换一个')
              },
            },
          ]}
        >
          <Input placeholder="请输入" maxLength={10} showCount />
        </Form.Item>

        <Form.Item name="role" label="角色" rules={[{ required: true, message: '请选择角色' }]}>
          <Select
            options={[
              { value: 'user', label: '普通成员' },
              { value: 'operator', label: '运营' },
              { value: 'admin', label: '管理员' },
            ]}
          />
        </Form.Item>

        {/* 联动：只有 role === 'admin' 时这个字段才出现，并且此时才是必填 */}
        {role === 'admin' ? (
          <Form.Item name="scope" label="管理范围" rules={[{ required: true, message: '管理员必须指定管理范围' }]}>
            <Input placeholder="例如：华东大区" />
          </Form.Item>
        ) : null}

        <Form.Item name="level" label="等级" rules={[{ type: 'number', min: 1, max: 5, message: '只能是 1~5' }]}>
          <InputNumber min={1} max={5} style={{ width: '100%' }} />
        </Form.Item>

        {/* ★ 需求四：动态增减字段 —— Form.List 专门干这个 */}
        <Form.List name="contacts">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...rest }) => (
                <Space key={key} align="baseline">
                  <Form.Item
                    {...rest}
                    name={[name, 'value']}  // 嵌套字段名：最终值是 contacts[0].value
                    label={name === 0 ? '联系方式' : ''}
                    rules={[{ required: true, message: '不能为空' }]}
                  >
                    <Input placeholder="手机号或邮箱" style={{ width: 240 }} />
                  </Form.Item>
                  <Button danger onClick={() => remove(name)} disabled={fields.length === 1}>删除</Button>
                </Space>
              ))}
              <Button type="dashed" block onClick={() => add({ value: '' })}>+ 添加一条</Button>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  )
}`,
        },
        {
          type: 'text',
          title: '9.4 react-hook-form 适合什么场景',
          body: '`react-hook-form` 是 antd `Form` 之外最主流的选择，本笔记前面完全没提过它，这里补上。\n\n它和 antd `Form` 最本质的区别是：**它把输入框当成非受控组件，值存在 `ref` 里，所以你打字时 React 根本不重渲染。** antd `Form` 也做了字段级隔离，但仍然是受控的。\n\n什么时候值得用它：\n\n- **项目没用组件库**，或者用的是 MUI / shadcn / 自己写的 UI ——这时你本来就没有现成的 `Form`\n- **超大表单**（几十上百个字段，比如保单录入、问卷）在意每次按键的性能\n- **想让校验规则和 TS 类型同源**：用 `zod` 写一份 schema，既做运行时校验，又能 `z.infer` 出 TS 类型，不用维护两份\n\n什么时候**不要**用它：\n\n- 项目已经用了 antd。这时再装 react-hook-form，你得用 `Controller` 把每个 antd 组件包一层（因为 antd 组件都是受控的），代码反而更啰嗦，而且团队里会出现两套表单写法\n\n下面这段代码看一眼就够，重点是感受「schema 和类型同源」这件事。',
        },
        {
          type: 'code',
          title: '9.5 react-hook-form + zod：校验规则和 TS 类型只写一份',
          language: 'tsx',
          body: `// 装依赖：npm install react-hook-form zod @hookform/resolvers
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// ① 用 zod 写一份 schema：它同时是「运行时校验规则」和「TS 类型的来源」
const schema = z.object({
  name: z.string().min(2, '至少 2 个字').max(10, '最多 10 个字'),
  email: z.string().email('邮箱格式不对'),
  age: z.coerce.number().int().min(18, '必须成年'), // coerce 会把输入框的字符串自动转成数字
  password: z.string().min(8, '至少 8 位'),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, {
  message: '两次密码不一致',      // 跨字段校验写在 refine 里
  path: ['confirm'],             // 指定这条错误显示在哪个字段下面
})

// ② 类型直接从 schema 推出来，不用手写 interface —— 改 schema 类型自动跟着变
type FormValues = z.infer<typeof schema>

export default function SignUpForm() {
  const {
    register,        // 把原生 input 注册进表单（非受控，所以打字不重渲染）
    handleSubmit,    // 包一层：校验通过才会调用你的函数
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  return (
    <form onSubmit={handleSubmit(async (values) => { await submitApi(values) })}>
      {/* register 返回 name/onChange/ref 等属性，摊开给 input 就完成绑定 */}
      <input {...register('name')} placeholder="姓名" />
      {errors.name ? <span style={{ color: 'red' }}>{errors.name.message}</span> : null}

      <input {...register('email')} placeholder="邮箱" />
      {errors.email ? <span style={{ color: 'red' }}>{errors.email.message}</span> : null}

      <button type="submit" disabled={isSubmitting}>提交</button>
    </form>
  )
}

// ⚠️ 如果要配 antd 组件（受控的），必须用 Controller 包一层：
// <Controller name="role" control={control} render={({ field }) => <Select {...field} />} />
// 项目已经用了 antd 的话，直接用 antd 自己的 Form 更省事`,
        },
        {
          type: 'code',
          live: true,
          runtime: 'react',
          language: 'tsx',
          title: 'Live Demo：校验 + 联动 + 动态增减 + 提交前转换，四件事一次玩',
          body: `import { useState } from 'react' // 存住「提交后真正要发给后端的数据」
import { Alert, Button, Card, Form, Input, Select, Space } from 'antd'

export default function Demo() {
  const [form] = Form.useForm() // 表单实例：校验、取值、重置都靠它
  const [payload, setPayload] = useState(null) // 提交结果，用来展示转换后的数据
  const role = Form.useWatch('role', form) // 联动关键：监听 role 字段的当前值

  function onFinish(values) {
    // 只有所有 rules 都通过才会走进来。这里做「界面形状 → 接口形状」的转换
    setPayload({
      name: values.name.trim(), // 去掉首尾空格，不然「 张三 」会存进数据库
      role: values.role,
      // 非管理员就不要把 scope 发上去，避免后端存一堆无意义字段
      scope: values.role === 'admin' ? values.scope : undefined,
      // 动态字段：过滤掉空行，并把 [{ value: 'a' }] 拍平成 ['a']
      contacts: (values.contacts || []).filter((c) => c && c.value).map((c) => c.value),
    })
  }

  return (
    <Space vertical size={12} style={{ width: '100%' }}>
      <Alert showIcon type="info" title="试试：直接点提交看红字；把角色切成管理员看多出来的必填项；再加两条联系方式" />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ role: 'user', contacts: [{ value: '' }] }} // 初始值：默认一条空的联系方式
      >
        <Form.Item
          name="name"
          label="姓名"
          rules={[
            { required: true, message: '请输入姓名' }, // 必填校验
            { min: 2, max: 10, message: '长度 2~10 个字' }, // 长度校验
            {
              // 自定义校验：真实项目里这里可以去调接口查重名
              validator: async (_, value) => {
                if (value && value.trim() === 'admin') throw new Error('admin 是保留名，换一个')
              },
            },
          ]}
        >
          <Input placeholder="留空直接提交试试" maxLength={10} showCount />
        </Form.Item>

        <Form.Item name="role" label="角色" rules={[{ required: true, message: '请选择角色' }]}>
          <Select
            options={[
              { value: 'user', label: '普通成员' },
              { value: 'admin', label: '管理员' },
            ]}
          />
        </Form.Item>

        {/* 联动：只有选了管理员，这个字段才出现，而且此时才是必填 */}
        {role === 'admin' ? (
          <Form.Item name="scope" label="管理范围" rules={[{ required: true, message: '管理员必须填管理范围' }]}>
            <Input placeholder="例如：华东大区" />
          </Form.Item>
        ) : null}

        {/* Form.List 专门用来做「动态增减字段」 */}
        <Form.List name="contacts">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...rest }) => (
                <Space key={key} align="baseline">
                  {/* name={[name, 'value']} 表示最终值是 contacts[0].value */}
                  <Form.Item
                    {...rest}
                    name={[name, 'value']}
                    label={name === 0 ? '联系方式' : ''}
                    rules={[{ required: true, message: '不能为空' }]}
                  >
                    <Input placeholder="手机号或邮箱" style={{ width: 220 }} />
                  </Form.Item>
                  <Button danger onClick={() => remove(name)} disabled={fields.length === 1}>删除</Button>
                </Space>
              ))}
              <Button type="dashed" block onClick={() => add({ value: '' })}>+ 添加一条</Button>
            </>
          )}
        </Form.List>

        <Space style={{ marginTop: 12 }}>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button onClick={() => { form.resetFields(); setPayload(null) }}>重置</Button>
        </Space>
      </Form>

      {payload ? (
        <Card size="small" title="转换后真正发给后端的数据">
          <pre style={{ margin: 0, fontSize: 12 }}>{JSON.stringify(payload, null, 2)}</pre>
        </Card>
      ) : null}
    </Space>
  )
}`,
        },
        {
          type: 'text',
          title: '9.6 质量兜底：让页面「坏得体面一点」',
          body: '功能写完不等于能上线。上线后你会遇到三种「坏」：\n\n**第一种：某个组件抛异常。** React 的默认行为很残酷——**一个组件渲染报错，整棵组件树被卸载，用户看到纯白页面**，连菜单和退出按钮都没了。最典型的触发方式是接口返回的字段和你预期不一样，比如你写 `user.profile.name`，而 `profile` 是 `null`。\n\n**第二种：接口失败。** 上一节的拦截器已经统一弹了提示，但页面本身还得有东西可看——总不能弹个 toast 然后留一片空白。\n\n**第三种：你根本不知道它坏了。** 用户遇到白屏不会告诉你，他只会不再用。\n\n对应的三个动作：**ErrorBoundary 兜住渲染异常、统一的三态组件兜住接口失败、错误上报让你第一时间知道。** 这三样加起来不到 100 行代码，是性价比最高的投入。',
        },
        {
          type: 'code',
          title: '9.7 ErrorBoundary 包住路由 + 全局错误上报',
          language: 'tsx',
          body: `// ===== ① components/ErrorBoundary/index.tsx =====
// 注意：错误边界目前**只能用 class 组件**写，函数组件没有对应的 Hook
import { Component } from 'react'
import { Button, Result } from 'antd'
import { reportError } from '@/utils/report'

export default class ErrorBoundary extends Component {
  state = { error: null }

  // 子树渲染抛错时调用，返回值会合并进 state → 于是渲染兜底 UI
  static getDerivedStateFromError(error) {
    return { error }
  }

  // 这里能同时拿到错误和「组件调用栈」，是上报的最佳位置
  componentDidCatch(error, info) {
    reportError(error, { componentStack: info.componentStack, type: 'render' })
  }

  render() {
    if (this.state.error) {
      return (
        <Result
          status="error"
          title="页面出了点问题"
          subTitle="已自动上报，你可以重试或回到首页"
          extra={[
            // 清空 error 让它重新渲染一次；偶发错误（比如某次数据异常）这样就好了
            <Button key="retry" type="primary" onClick={() => this.setState({ error: null })}>重试</Button>,
            <Button key="home" onClick={() => { window.location.href = '/' }}>回到首页</Button>,
          ]}
        />
      )
    }
    return this.props.children
  }
}

// ===== ② 包在哪里：包住 <Outlet />，而不是包住整个 App =====
// layouts/BasicLayout/index.tsx
// <Layout>
//   <SideMenu />              ← 菜单在边界外面，所以业务页崩了菜单还在
//   <Layout.Content>
//     <ErrorBoundary key={location.pathname}>   ← key 换成路径：切换页面时自动重置错误状态
//       <Outlet />                              ← 只有业务页面在边界里面
//     </ErrorBoundary>
//   </Layout.Content>
// </Layout>
//
// 为什么这样包：只包 App 的话，任何页面崩了整站变成一个 Result 页，用户连菜单都点不了；
// 只包单个组件又太碎。「一个路由一层边界」是性价比最高的粒度。

// ===== ③ utils/report.ts：三种错误一个出口 =====
export function reportError(error, extra = {}) {
  const payload = {
    message: error?.message || String(error),
    stack: error?.stack,
    url: window.location.href,          // 出错的页面
    ua: navigator.userAgent,            // 什么浏览器
    time: new Date().toISOString(),
    ...extra,
  }
  if (import.meta.env.DEV) {
    console.error('[report]', payload)  // 开发环境只打印，别把本地报错上报到生产项目
    return
  }
  // 生产环境发给监控平台。用 sendBeacon：页面正在关闭时也能发出去，且不阻塞卸载
  navigator.sendBeacon('/api/log/error', JSON.stringify(payload))
}

// ===== ④ main.tsx：ErrorBoundary 抓不到的两类错误，用全局监听补上 =====
// 错误边界只管「渲染期间」的异常。异步回调里的报错、Promise 没 catch 的报错它都抓不到
window.addEventListener('error', (e) => {
  reportError(e.error || new Error(e.message), { type: 'window.error' })
})
window.addEventListener('unhandledrejection', (e) => {
  // 最常见来源：忘了 catch 的 await 请求
  reportError(e.reason, { type: 'unhandledrejection' })
})`,
        },
        {
          type: 'code',
          title: '9.8 统一的三态兜底 UI：一个组件解决 loading / 空 / 错',
          language: 'tsx',
          body: `// components/PageState/index.tsx
// 为什么要封装：不封装的话，20 个列表页各写一套「转圈 + 空状态 + 错误重试」，
// 文案、图标、按钮位置全都不一样，看起来就像 20 个不同的系统
import { Button, Empty, Result, Skeleton } from 'antd'

interface Props {
  loading: boolean
  error?: Error | null
  empty?: boolean          // 数据为空（注意：要由调用方判断，因为「空」的定义各页面不同）
  onRetry?: () => void
  children: React.ReactNode
}

export default function PageState({ loading, error, empty, onRetry, children }: Props) {
  // 顺序很重要：先判 loading，再判 error，最后判 empty
  // 反了就会出现「加载中却显示暂无数据」这种一闪而过的错误状态
  if (loading) {
    // 用骨架屏而不是转圈：骨架屏能让用户提前看到页面结构，感知上更快
    return <Skeleton active paragraph={{ rows: 6 }} />
  }

  if (error) {
    return (
      <Result
        status="warning"
        title="加载失败"
        subTitle={error.message}
        // 一定要给重试按钮：大部分接口失败是网络抖动，点一下就好了
        extra={onRetry ? <Button type="primary" onClick={onRetry}>重试</Button> : null}
      />
    )
  }

  if (empty) {
    // 空状态要给「下一步动作」，不能只说「暂无数据」让用户干瞪眼
    return (
      <Empty description="还没有数据">
        {onRetry ? <Button onClick={onRetry}>刷新看看</Button> : null}
      </Empty>
    )
  }

  return children
}

// ===== 页面里怎么用：和上一节的 useList 天然配套 =====
// const { list, loading, error, refetch } = useList(fetchUsers)
//
// <PageState loading={loading} error={error} empty={list.length === 0} onRetry={refetch}>
//   <Table rowKey="id" dataSource={list} columns={columns} />
// </PageState>
//
// 于是每个列表页只写一行 PageState，三种状态的样式和文案全站统一`,
        },
        {
          type: 'table',
          title: '9.9 质量兜底四件套：各挡哪一种崩',
          intro: '这四样各管一段，缺任何一个都会留下一类「用户遇到但你不知道」的问题：',
          headers: ['兜底手段', '挡住什么', '放在哪里', '不做会怎样'],
          rows: [
            ['**ErrorBoundary**', '**渲染期间**抛出的异常（读了 `null` 的属性、组件内部报错）', '包住 `<Outlet />`，一个路由一层；`key` 用 `location.pathname` 以便切页自动重置', '**整站白屏**，菜单和退出按钮全没了，用户只能关标签页'],
            ['**`window.error` / `unhandledrejection`**', '异步回调里的报错、忘了 `catch` 的 Promise——**这两类 ErrorBoundary 抓不到**', '`main.tsx` 里全局监听一次', '线上一半的报错你永远看不到'],
            ['**统一的三态组件**', '接口失败、数据为空、加载中', '`components/PageState`，每个列表页包一层', '20 个页面 20 种空状态；接口失败后一片空白，用户以为系统坏了'],
            ['**错误上报**', '「你不知道它坏了」这件事本身', '`utils/report.ts`，被上面三处共同调用；生产用 `sendBeacon` 或接 Sentry', '只能等用户投诉，而且用户说不清当时点了什么'],
          ],
          note: '两个容易忽略的细节：**① ErrorBoundary 在开发环境里挡不住报错遮罩层**（Vite 的错误浮层还是会弹），要验证效果得 `npm run build` 后 `npm run preview`；**② 上报要做采样和去重**，一个死循环报错能在一分钟内发几万条请求，把你自己的日志接口打挂。',
        },
        {
          type: 'list',
          title: '9.10 这一节的自检清单',
          ordered: true,
          items: [
            '**新增和编辑共用一个弹窗时，新增前调了 `form.resetFields()`** —— 漏了就会带上一次编辑的残留数据，这是后台系统最经典的脏数据来源。',
            '**`Modal` 加了 `destroyOnHidden`**（旧版叫 `destroyOnClose`）—— 不加的话弹窗内容不销毁，`initialValues` 只生效第一次。',
            '**提交前 `trim()` 了字符串字段** —— 「 张三 」和「张三」在数据库里是两条不同的记录。',
            '**日期字段做了双向转换** —— 回填时字符串转 `dayjs` 对象，提交时 `.format()` 转回字符串。直接把 dayjs 对象发给后端会变成一个巨大的 JSON。',
            '**联动隐藏的字段在提交时被剔除** —— 角色从管理员改回普通成员，`scope` 的旧值可能还留在表单值里，要显式 `undefined`。',
            '**动态字段过滤了空行** —— `Form.List` 里用户点了「添加」又没填，会提交一个 `{ value: undefined }`。',
            '**提交按钮有 loading 且防重复点击** —— 否则用户手快点两下，创建出两条一样的数据。',
            '**ErrorBoundary 包住了路由，且 `key` 会随路径变化** —— 不然一个页面崩了之后，切到别的页面还是那张错误页。',
            '**`window.error` 和 `unhandledrejection` 都监听了** —— 只做 ErrorBoundary 会漏掉一半的线上报错。',
            '**每个列表页都有加载 / 空 / 错三态** —— 断网点一次查询就能验，这是最容易验也最容易漏的一条。',
          ],
        },
        {
          type: 'tip',
          title: '一句话记忆',
          body: '字段超过 5 个就用表单库：项目有 antd 就用 `Form`（`rules` 校验、`useWatch` 联动、`Form.List` 动态增减、提交前统一转换），没有组件库或表单特别大就用 react-hook-form + zod。质量兜底记住四件套：**ErrorBoundary 包路由、全局监听补异步、`PageState` 统一三态、`report` 统一上报**。',
        },
      ],
    },
  },
  {
    id: 'project-ship',
    title: '性能、质量与上线：新手第一份上线检查单',
    summary:
      '列表页别乱请求、ErrorBoundary 兜底、打包前看体积、nginx 配好 history 回退，再对照清单打勾',
    content: {
      sections: [
        {
          type: 'tip',
          title: '一句话记住',
          body: '能上线的项目不只是「页面能点」。至少做到：**接口失败有提示、页面崩了有兜底、刷新子路由不是 404、环境变量没把密钥打进包**。',
        },
        {
          type: 'text',
          title: '10.1 性能：先治「重复请求」和「整表重渲染」',
          body: '新手项目慢，很少是因为没写 `useMemo`，而是：\n\n- 搜索框每个字都打接口 → 加 300ms 防抖\n- 父组件一个 `setState`，表格 200 行全重绘 → 列 `render` 里不要每次都新建函数也可以先放放，**先保证请求次数是对的**\n- 图片和 antd 图标全量引入 → 图标按需 `import { PlusOutlined } from \'@ant-design/icons\'`\n\n`React.memo` / `useCallback` 是加分项，不是第一课。',
        },
        {
          type: 'code',
          title: '10.2 ErrorBoundary：函数组件做不到的那一块',
          language: 'tsx',
          body: `// components/ErrorBoundary/index.tsx
import { Component } from 'react'
import { Button, Result } from 'antd'

export default class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <Result
          status="error"
          title="页面出了点问题"
          subTitle={String(this.state.error.message)}
          extra={<Button onClick={() => this.setState({ error: null })}>重试</Button>}
        />
      )
    }
    return this.props.children
  }
}

// 包在 BasicLayout 的 <Outlet /> 外面，一个页面崩了不影响登录和菜单`,
        },
        {
          type: 'code',
          title: '10.3 生产部署：Vite 产物 + nginx',
          language: 'nginx',
          body: `# npm run build 之后，把 dist/ 丢到服务器
# React Router 是前端路由：刷新 /users 时，nginx 必须回退到 index.html

server {
  listen 80;
  server_name example.com;
  root /var/www/admin-system;
  index index.html;

  # 接口代理到后端，避免浏览器跨域
  location /api/ {
    proxy_pass http://127.0.0.1:8080/;
  }

  location / {
    try_files $uri $uri/ /index.html;
  }
}`,
        },
        {
          type: 'table',
          title: '10.4 上线前检查单（建议打印打勾）',
          headers: ['检查项', '怎么验', '不过会怎样'],
          rows: [
            ['未登录打开 `/users` 会跳登录', '无痕窗口直接粘贴 URL', '数据裸奔'],
            ['登录过期（401）会清 token 并跳登录', '把 token 改成乱码再点查询', '无限转圈或报一堆错'],
            ['刷新 `/users` 不是 404', '部署后再按浏览器刷新', '只有点菜单能进，用户一刷新就懵'],
            ['`.env` 里没有密钥', '打开打包后的 JS 搜 `secret` / `password`', '密钥被人拿走'],
            ['空数据 / 加载中 / 失败 三种状态都有', '断网再点查询', '白屏，用户以为卡死'],
            ['删除有二次确认', '点删除看有没有 Popconfirm', '手滑删生产数据'],
            ['antd 和自己的文案能切语言', '切 EN 看表格分页', '一半中文一半 English'],
            ['构建命令是 `tsc --noEmit && vite build`', '故意写错一个类型再 build', '带红线的代码被发布上去'],
          ],
        },
        {
          type: 'list',
          title: '10.5 你这个项目学完应该能独立做的事',
          ordered: true,
          items: [
            '用 Vite + TS 从 0 起一个后台仓库，目录按 pages / api / router 分层',
            '封装 axios：token、错误提示、401 跳转',
            '做登录页 + 路由守卫 + 一个 CRUD 列表（表格 + 弹窗表单）',
            '给危险按钮加权限码，给整站加中英文词典',
            '本地 `build` 后用 nginx（或任意静态托管）发布，并配好 history 回退',
          ],
        },
        {
          type: 'table',
          title: '10.6 打包产物说明表：`dist/` 里的每个文件是什么',
          intro: '`npm run build` 跑完会得到一个 `dist/` 目录。很多新手不敢碰它，其实里面就四类东西。**看懂它，你才知道该给哪个文件配什么缓存**。',
          headers: ['产物', '里面是什么', '为什么长这样', '缓存策略'],
          rows: [
            ['`index.html`', '几行 HTML，`<script src="/assets/index-a3f9c1.js">` 指向当前这一版的 JS', '它是整个应用的**入口目录**：写着这一版该加载哪几个带哈希的文件', '**绝对不能缓存**（`no-cache`）。缓存了就会发版后还加载已被删除的旧 JS → 白屏'],
            ['`assets/index-[hash].js`', '你自己写的业务代码，编译 + 压缩 + 混淆后的结果', '文件名里的 `a3f9c1` 是**内容哈希**：代码改一个字符，哈希就变，文件名跟着变', '**强缓存一年**（`immutable`）。文件名变了就是新文件，浏览器自然会去下新的'],
            ['`assets/vendor-[hash].js`', 'react、antd 这些第三方依赖（配了 `manualChunks` 才会单独拆出来）', '依赖很少变，单独拆出来后你改业务代码它的哈希不变，用户就不用重复下载几百 KB', '强缓存一年'],
            ['`assets/index-[hash].css`', '所有样式合并压缩后的一个（或几个）CSS 文件', 'CSS 被单独抽出来，浏览器可以和 JS **并行下载**，首屏更快', '强缓存一年'],
            ['`assets/xxx-[hash].woff2` / `.png`', '字体、图片等静态资源', '小于 4KB 的图片会被内联成 base64 直接塞进 JS，所以 `dist` 里可能看不到它们', '强缓存一年'],
            ['`public/` 里的原样文件', '`favicon.ico`、`robots.txt` 这类不参与打包的文件', '`public/` 会被**原样复制**到 `dist` 根目录，文件名**不带哈希**（因为要用固定 URL 引用）', '短缓存（几小时），因为名字不变、内容可能变'],
            ['`*.js.map`（sourcemap）', '压缩代码和源码的对应关系表，用来把报错还原成源码行号', '`vite.config.ts` 里 `sourcemap: false` 就不会产出——**生产默认要关**，否则等于把源码传上线', '不上传到服务器；要排查线上问题就只传给错误监控平台'],
          ],
          note: '一句话理解「为什么带哈希」：**带哈希的文件可以永久缓存，不带哈希的文件必须不缓存。** 这两条配合起来，用户第二次访问几乎不用下载任何 JS（全部命中缓存），而你一发版新哈希立刻生效，不会出现「让用户清缓存」这种事。',
        },
        {
          type: 'code',
          title: '10.7 完整 nginx 配置（逐行注释，可直接抄）',
          language: 'nginx',
          body: `# /etc/nginx/conf.d/admin-system.conf
# 前置动作：npm run build 产出 dist/，把 dist 里的所有文件上传到 /var/www/admin-system

# ===== 1）gzip 压缩：文本类文件体积能压到三分之一左右 =====
gzip on;                    # 打开 gzip（nginx 默认是关闭的）
gzip_min_length 1k;         # 小于 1KB 的文件压完可能更大，不值得压
gzip_comp_level 6;          # 压缩级别 1~9；6 是「体积」和「CPU 消耗」的平衡点
gzip_vary on;               # 加上 Vary: Accept-Encoding，让 CDN 把压缩版和原版分开缓存
gzip_types text/plain text/css application/javascript application/json image/svg+xml;
                            # 只压文本类。jpg/png/woff2 本身已经是压缩格式，再压纯属浪费 CPU

server {
  listen 80;                       # 监听 80 端口（HTTP）；上了 HTTPS 之后这里换成 443 ssl
  server_name admin.example.com;   # 绑定的域名；多个域名用空格分开
  server_tokens off;               # 响应头里不暴露 nginx 版本号，少被针对性扫描

  root /var/www/admin-system;      # 静态文件根目录，就是 dist/ 上传后的位置
  index index.html;                # 访问目录时默认返回的文件

  # ===== 2）带哈希的静态资源：强缓存一年 =====
  location /assets/ {
    # Vite 产出的文件名带内容哈希（index-a3f9c1.js），内容一改文件名就变
    # 所以老文件可以放心让浏览器一直缓存，永远不会「缓存到旧代码」
    expires 1y;                                    # 一年内不再回服务器问
    add_header Cache-Control "public, immutable";  # immutable = 告诉浏览器「这个文件永远不会变」
    access_log off;                                # 静态资源不记访问日志，省磁盘和 IO
  }

  # ===== 3）index.html：必须禁止缓存 =====
  location = /index.html {
    # 它写着「当前这一版要加载哪几个哈希文件」，是整个应用的目录
    # 一旦被缓存：你发了新版，用户浏览器还在用旧 index.html，
    # 去请求已经被删掉的旧 JS → 直接白屏，而且用户自己刷新也好不了
    add_header Cache-Control "no-cache, no-store, must-revalidate";
    expires 0;                                     # 立即过期
  }

  # ===== 4）接口反向代理：解决线上跨域（线上没有 vite proxy）=====
  location /api/ {
    # 末尾这个 / 极其关键：带 / 会把 /api 前缀去掉
    #   浏览器请求 /api/users  →  实际转发到 http://127.0.0.1:8080/users
    # 如果后端接口本身就带 /api 前缀，就写成 http://127.0.0.1:8080（结尾不要斜杠）
    proxy_pass http://127.0.0.1:8080/;

    proxy_set_header Host $host;                     # 把用户访问的原始域名透传给后端（很多框架会校验）
    proxy_set_header X-Real-IP $remote_addr;         # 让后端拿到用户真实 IP，否则日志里全是 127.0.0.1
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  # 记录请求经过了哪几层代理
    proxy_set_header X-Forwarded-Proto $scheme;      # 告诉后端原始协议是 http 还是 https
    proxy_read_timeout 60s;                          # 导出报表这类慢接口，别 30 秒就掐断
  }

  # ===== 5）history 回退：解决「刷新子路由变 404」=====
  location / {
    try_files $uri $uri/ /index.html;
    # try_files 会按顺序尝试：
    #   $uri   → 服务器上真有这个文件就直接返回（例如 /assets/index-a3f9c1.js）
    #   $uri/  → 真有这个目录就返回目录里的 index
    #   都没有 → 返回 index.html，让 React Router 在浏览器端去匹配 /users
    #
    # 少了这一行会怎样：用户在 /users 页面按 F5，nginx 去磁盘上找 /users 这个文件，
    # 找不到就返回自己的 404 页面。因为 /users 这个路由只存在于前端 JS 里，
    # 服务器上压根没有同名文件 —— 这就是新手上线后最常问的「为什么点菜单能进、刷新就 404」
  }

  # ===== 6）可选：单页应用的 404 也交给前端处理 =====
  error_page 404 /index.html;   # 兜底，让 React 的 NotFound 页面来显示，而不是 nginx 的白页
}

# ===== 改完配置的两条命令（顺序别反）=====
# nginx -t          → 先检查语法，输出 "syntax is ok" 才继续（写错了不会影响正在跑的服务）
# nginx -s reload   → 平滑重载，不中断现有连接；千万不要用 restart（会有几秒不可用）`,
        },
        {
          type: 'code',
          title: '10.8 三套环境的 `.env` 对照（开发 / 测试 / 生产）',
          language: 'bash',
          body: `# ============ .env.development —— 本地开发，npm run dev 自动读它 ============
VITE_APP_TITLE=后台管理系统(本地)
VITE_API_BASE_URL=/api              # 只写前缀不写域名：走 vite proxy 转发，天然没有跨域
VITE_USE_MOCK=true                  # 后端接口没好时用假数据顶上
VITE_ENABLE_DEVTOOLS=true           # 打开调试面板、打印请求日志
VITE_SENTRY_DSN=                    # 本地报错不上报，留空即可


# ============ .env.staging —— 测试环境，npm run build:test 读它 ============
VITE_APP_TITLE=后台管理系统(测试)     # 标题带上「测试」，避免测试同学对着生产环境提 bug
VITE_API_BASE_URL=https://test-api.example.com   # 测试后端的真实域名
VITE_USE_MOCK=false                 # 测试环境必须连真接口，否则测了个假的
VITE_ENABLE_DEVTOOLS=true           # 测试环境保留调试能力，方便排查
VITE_SENTRY_DSN=https://xxx@sentry.example.com/2   # 上报到测试项目，和生产分开


# ============ .env.production —— 生产环境，npm run build 读它 ============
VITE_APP_TITLE=后台管理系统
VITE_API_BASE_URL=/api              # 生产同域：由 nginx 的 location /api/ 反代到后端
                                    # （如果前后端不同域，这里就写完整域名 https://api.example.com）
VITE_USE_MOCK=false                 # 生产绝对不能开 Mock，开了就是「页面全是假数据」
VITE_ENABLE_DEVTOOLS=false          # 关掉调试面板和请求日志
VITE_SENTRY_DSN=https://xxx@sentry.example.com/1   # 上报到生产项目


# ============ .env.local —— 你自己电脑上的私人覆盖 ============
# 优先级最高，会盖掉上面同名的变量；必须写进 .gitignore，不要提交
VITE_API_BASE_URL=http://192.168.1.37:8080   # 比如你要连同事本机起的后端


# ============ package.json 里对应的三条构建命令 ============
# "dev":        "vite"                              → 读 .env.development
# "build:test": "tsc --noEmit && vite build --mode staging"   → 读 .env.staging，产物同样在 dist/
# "build":      "tsc --noEmit && vite build"        → 读 .env.production
#
# ⚠️ 三个最常踩的坑
# 1. 变量名忘了 VITE_ 前缀 → 代码里读到 undefined，请求全打到 undefined/users
# 2. 值全都是字符串 → 判断开关必须写 === 'true'，因为 "false" 是非空字符串，if 里永远为真
# 3. 这些值会明文打进 JS 产物，浏览器里搜得到 → 密钥、数据库密码一律不许放这里`,
        },
        {
          type: 'table',
          title: '10.9 上线前检查清单表（配置类，构建之前逐条过）',
          intro: '7.4 那张表查的是**功能**，这张表查的是**配置**——这些项目功能测试全过也发现不了，但每一条都能让线上直接崩。建议做成 PR 模板，每次发版逐条打勾。',
          headers: ['检查项', '怎么查', '不过会怎样'],
          rows: [
            ['**环境变量指向生产**', '`npm run build` 后在 `dist/assets/*.js` 里搜 `192.168` 和 `localhost`，应该一个都搜不到', '线上页面请求打到你公司内网地址，用户全站转圈'],
            ['**Mock 开关已关**', '搜 `VITE_USE_MOCK`，确认 `.env.production` 里是 `false`', '页面显示的全是假数据「小明 / 小红」，还很难发现'],
            ['**`console.log` 已清掉**', 'ESLint 开 `no-console: warn`；或在 `vite.config.ts` 里配 `esbuild.drop: [\'console\', \'debugger\']` 自动删', '内部数据、接口结构、甚至 token 被打印在用户的控制台里'],
            ['**sourcemap 已关闭**', '看 `dist/` 里有没有 `.js.map` 文件；`build.sourcemap` 应为 `false`', '任何人点开 DevTools 就能看到你完整的源码和注释'],
            ['**接口地址与代理对得上**', '前端写 `/api`，就必须确认 nginx 里有 `location /api/`；两边缺一个就全 404', '所有接口 404，页面一片空'],
            ['**路由 base 与部署路径一致**', '部署到子目录 `/admin/` 时，`vite.config.ts` 的 `base: \'/admin/\'` 和 Router 的 `basename` 都要改', '页面能打开但 JS/CSS 全 404（白屏），或者路由全部匹配不上'],
            ['**history 回退已配**', '部署后直接在地址栏敲 `/users` 回车，再按一次 F5', '刷新子路由变 404，用户以为系统坏了'],
            ['**错误监控已接入**', '故意在页面里 `throw new Error(\'test\')`，看监控平台几秒内有没有收到', '线上报错你永远不知道，只能等用户来投诉'],
            ['**首屏体积可接受**', '`npx vite-bundle-visualizer` 看图；单个 chunk 超过 500KB 就该拆了', '4G 网络下白屏好几秒，用户直接关页面'],
            ['**路由已按页面懒加载**', '看 `dist/assets/` 是不是多个 chunk 而不是一个巨大的 JS', '打开登录页就要下载整站代码，首屏白等'],
            ['**gzip 已开启**', 'DevTools 的 Network 里看响应头有没有 `content-encoding: gzip`', '传输体积是压缩后的三倍，白花带宽和时间'],
            ['**缓存策略正确**', '`index.html` 是 `no-cache`，`/assets/` 是 `immutable`', '发版后用户看到的还是旧版，或者要教用户「按 Ctrl+F5」'],
            ['**构建用 `tsc --noEmit && vite build`**', '故意写错一个类型再 build，应该直接失败', '带类型错误的代码被发布上线'],
          ],
          note: '最省事的做法：把这张表写进仓库的 `.github/pull_request_template.md`，每次发版 PR 自动带出来一排复选框。**清单的价值不在于聪明，而在于不依赖记性。**',
        },
        {
          type: 'table',
          title: '10.10 部署方式对照表：`dist/` 该往哪儿放',
          intro: '前端打包出来就是一堆静态文件，**任何能托管静态文件的地方都能放**。按上手难度从易到难排：',
          headers: ['方式', '怎么做', '优点', '缺点 / 适合谁'],
          rows: [
            ['**Vercel**', '仓库连上去，选好构建命令 `npm run build` 和产物目录 `dist`，push 即自动部署', '零配置，自带 HTTPS 和 CDN，history 回退**默认就通**，预览环境每个 PR 一个', '国内访问不稳定；接口跨域要自己配 `vercel.json` 的 rewrites。**适合个人项目、作品集**'],
            ['**Netlify**', '同上；建一个 `_redirects` 文件写 `/* /index.html 200` 解决刷新 404', '和 Vercel 差不多，表单和函数功能好用', '同样国内访问慢。**适合个人项目**'],
            ['**nginx 自建**', '`scp` 或 CI 把 `dist/` 传到服务器，配好 7.7 那份配置', '完全可控：缓存、代理、gzip、灰度都能自己调；国内速度快', '要自己买服务器、配 HTTPS 证书、盯稳定性。**国内公司内部系统的主流方式**'],
            ['**对象存储 + CDN**', '`dist/` 上传到 OSS / COS / S3，套一层 CDN，控制台里配「默认首页」和「404 回源 index.html」', '带宽便宜、天然抗高并发、全国访问都快', '发版后要**手动刷新 CDN 缓存**（否则 `index.html` 还是旧的）；接口要另配跨域。**适合 C 端高流量站点**'],
            ['**Docker + nginx**', '写个两阶段 Dockerfile：第一段 `node` 里 build，第二段 `nginx` 里只拷 `dist/`', '环境完全一致，「我本地是好的」这句话消失；能接 K8s 做滚动发布', '要懂一点 Docker；镜像构建比直接传文件慢。**适合有运维团队的公司**'],
            ['**GitHub Pages**', 'CI 把 `dist/` 推到 `gh-pages` 分支', '免费', '只支持静态、**不能反向代理接口**，且部署在子路径下要改 `base`。**适合纯文档、纯展示页**'],
          ],
          note: '不管选哪种，前端这边只有两件事必须确认：**① 未匹配到的路径要回退到 `index.html`（否则刷新 404）；② 接口要么同域反代、要么后端开 CORS。** 这两条不通，其它配置再漂亮也上不了线。',
        },
        {
          type: 'code',
          live: true,
          runtime: 'react',
          language: 'tsx',
          title: 'Live Demo：上线前自检清单，打完勾才让你「发布」',
          body: `import { useState } from 'react' // 用 state 记住哪几项已经打勾
import { Alert, Button, Checkbox, Progress, Space, Tag, message } from 'antd'

// 把上面两张检查表压成一个可点的清单；level 决定漏掉它的后果有多严重
const CHECKS = [
  { id: 'env', text: '.env.production 的接口地址指向生产域名', level: '致命' },
  { id: 'mock', text: 'VITE_USE_MOCK 已改成 false', level: '致命' },
  { id: 'history', text: 'nginx 配了 try_files 回退 index.html', level: '致命' },
  { id: 'proxy', text: '线上接口能通（同域反代或后端开了 CORS）', level: '致命' },
  { id: 'sourcemap', text: 'build.sourcemap 已设为 false', level: '重要' },
  { id: 'console', text: 'console.log 已清掉或构建时自动 drop', level: '重要' },
  { id: 'cache', text: 'index.html 不缓存、/assets/ 强缓存一年', level: '重要' },
  { id: 'monitor', text: '错误监控已接入，能收到测试报错', level: '重要' },
  { id: 'size', text: '首屏体积看过，单个 chunk 没超过 500KB', level: '建议' },
  { id: 'gzip', text: 'nginx 已开 gzip', level: '建议' },
]

export default function Demo() {
  const [checked, setChecked] = useState<string[]>([]) // 已打勾的 id 列表
  const [shipped, setShipped] = useState(false) // 是否已经「发布」成功
  const [messageApi, contextHolder] = message.useMessage() // antd 6 必须用 hook 版拿 messageApi

  const percent = Math.round((checked.length / CHECKS.length) * 100) // 完成度
  // 找出还没打勾的致命项：只要还有一条，就不允许发布
  const blockers = CHECKS.filter((c) => c.level === '致命' && !checked.includes(c.id))

  function toggle(id: string) {
    // 已经勾了就取消，没勾就加上（用 filter / concat 生成新数组，不要直接改原数组）
    setChecked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : prev.concat(id)))
    setShipped(false) // 清单一变动，之前的「已发布」结论就作废
  }

  function ship() {
    if (blockers.length) {
      messageApi.error('还有 ' + blockers.length + ' 条致命项没过，先别发') // 拦住，不给发布
      return
    }
    setShipped(true)
  }

  return (
    <Space vertical size={12} style={{ width: '100%' }}>
      {contextHolder} {/* message 的挂载点，不渲染它提示就出不来 */}
      {/* 进度条：直观看到还差多少条 */}
      <Progress percent={percent} status={blockers.length ? 'active' : 'success'} />

      {CHECKS.map((c) => (
        <Checkbox
          key={c.id}
          checked={checked.includes(c.id)}
          onChange={() => toggle(c.id)}
        >
          {c.text}{' '}
          {/* 用颜色区分严重程度：致命项不打勾就不给发布 */}
          <Tag color={c.level === '致命' ? 'red' : c.level === '重要' ? 'orange' : 'default'}>
            {c.level}
          </Tag>
        </Checkbox>
      ))}

      <Space>
        <Button type="primary" onClick={ship}>发布到生产</Button>
        <Button onClick={() => { setChecked([]); setShipped(false) }}>全部清空</Button>
      </Space>

      {/* 三种结论：发布成功 / 被致命项拦住 / 只剩非致命项 */}
      {shipped ? (
        <Alert type="success" showIcon title="发布成功：致命项全部通过，剩下的项建议也补齐" />
      ) : blockers.length ? (
        <Alert
          type="error"
          showIcon
          title={'不能发布，致命项还差 ' + blockers.length + ' 条'}
          description={blockers.map((b) => b.text).join('；')}
        />
      ) : (
        <Alert type="info" showIcon title="致命项已全过，可以点「发布到生产」了" />
      )}
    </Space>
  )
}`,
        },
        {
          type: 'tip',
          title: '一句话记忆',
          body: '路由会守卫、请求会封装、按钮会按权限藏、文案会进词典、刷新不会 404——这五条齐了，你就不是「只会计数器」的新手了。',
        },
      ],
    },
  },
]

export default projectMoreItems
