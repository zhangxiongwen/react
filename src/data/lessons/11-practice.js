/**
 * 第 11 章：请求数据与工程实践
 * 每个条目 = 一句话总结 + 详细步骤 + 完整可抄 demo + 易错点
 */
const practice = {
  id: 'practice',
  title: '请求数据与工程实践',
  summary: 'fetch vs axios、json-server 本地 mock、axios 封装、Todolist 骨架、入门毕业清单',
  order: 15,
  items: [
    {
      id: 'fetch-vs-axios',
      title: 'fetch vs axios：详细对比 + 大 demo 对照',
      summary: '学原理用 fetch；真实项目用 axios——自动 JSON、错误进 catch、拦截器统一带 token',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'fetch 是浏览器自带的，适合理解「发请求 → 等响应 → 处理数据」的本质；axios 是 npm 库，商业项目更常用——自动 JSON、4xx/5xx 进 catch、拦截器统一 token——本项目封装在 src/utils/request.js。',
          },
          {
            type: 'text',
            title: '1. 是什么：两种 HTTP 客户端',
            body: 'React 组件要展示服务器数据，必须发 HTTP 请求。浏览器内置 **fetch API**——不用安装，任何现代浏览器都有。\n\n**axios** 是基于 Promise 的第三方库——npm install axios 后 import 使用。它把 fetch 里重复的样板代码（JSON 解析、错误判断、查询参数拼接）封装好了，并提供**拦截器**在请求发出前/响应回来后统一处理。\n\n学 React 数据请求：**先用 fetch 搞懂三态模板**，再切 axios + request.js 封装——换库只改请求那一行，页面 loading/error/data 逻辑不变。',
          },
          {
            type: 'table',
            title: 'fetch vs axios 核心对比（建议收藏）',
            intro: '对照「安装、JSON、错误、POST、查询参数、拦截器」一眼看清差异。',
            headers: ['能力', 'fetch（浏览器原生）', 'axios（npm 库）'],
            rows: [
              ['安装', '不用', 'npm install axios'],
              ['响应 JSON', '手动 await res.json()', '自动，在 response.data'],
              ['HTTP 4xx/5xx', '默认不 throw，要 if (!res.ok)', '默认 throw，进 catch'],
              ['POST JSON body', '手动 headers + JSON.stringify', '传对象即可'],
              ['查询参数', '手动拼 URL 或 URLSearchParams', 'params: { page: 1 } 自动拼'],
              ['超时', '需 AbortController 自己实现', 'timeout: 8000 一行配置'],
              ['拦截器', '无', '有（项目封装核心）'],
              ['取消请求', 'AbortController + signal', 'AbortController + signal'],
              ['适用场景', '学习原理、最小 demo', '商业 React 项目主力'],
            ],
            note: '练手 API 推荐 jsonplaceholder.typicode.com（支持 CORS）；本地 CRUD 用 json-server（见本章后面）。',
          },
          {
            type: 'text',
            title: '2. 特点：fetch 的「两个 await」',
            body: 'fetch 返回的是 **Response 对象**，不是直接的数据。\n\n第一步：await fetch(url) 等到响应头。\n\n第二步：判断 res.ok（状态码 200–299 为 true；404/500 为 false）。\n\n第三步：await res.json() 把 body 解析成 JS 对象。\n\n**最大坑**：404 时 fetch **不会 throw**，初学者不写 if (!res.ok) 会以为成功了，其实拿到的是错误页 HTML 或空 body。',
          },
          {
            type: 'text',
            title: '3. 特点：axios 的「data 在 .data」',
            body: 'axios 响应结构是 { data, status, headers, ... }。业务数据在 **response.data**。\n\n本项目 request.js 的响应拦截器直接 return response.data——所以组件里 await http.get() 拿到的**已经是业务数据**，不要再 .data。\n\naxios 状态码非 2xx 默认 **reject**，和业务代码「失败就 catch」一致，心智负担更小。',
          },
          {
            type: 'list',
            title: '4. 为什么：真实项目选 axios',
            ordered: true,
            items: [
              '每个组件不用重复写 res.ok 检查和 JSON.parse',
              '拦截器一处加 token、一处处理 401 跳登录',
              'baseURL 改域名只改 request.js 一处',
              '和团队/后端约定一致——国内 React 项目 axios 占多数',
              '以后接 TanStack Query 时 axios 作 fetcher 很自然',
            ],
          },
          {
            type: 'code',
            title: '大 demo：同一件事两种写法（用户列表 + 创建用户）',
            language: 'javascript',
            body: `const API = 'https://jsonplaceholder.typicode.com'

// ============================================================
// 场景 A：GET 用户列表
// ============================================================

// ---------- fetch 写法 ----------
async function fetchUserList_fetch() {
  const res = await fetch(\`\${API}/users\`)
  // ★ fetch 的坑：404 不会 throw，必须自己判断
  if (!res.ok) {
    throw new Error(\`HTTP \${res.status}: \${res.statusText}\`)
  }
  const data = await res.json() // ★ 还要再 await 一次转 JSON
  return data
}

// ---------- axios 写法 ----------
import axios from 'axios'

async function fetchUserList_axios() {
  const { data } = await axios.get(\`\${API}/users\`)
  // data 已经是数组；404/500 会直接 throw，进 catch
  return data
}

// ============================================================
// 场景 B：GET 带查询参数 ?userId=1
// ============================================================

async function fetchPostsByUser_fetch(userId) {
  const url = new URL(\`\${API}/posts\`)
  url.searchParams.set('userId', String(userId))
  const res = await fetch(url)
  if (!res.ok) throw new Error('请求失败')
  return res.json()
}

async function fetchPostsByUser_axios(userId) {
  const { data } = await axios.get(\`\${API}/posts\`, {
    params: { userId }, // 自动变成 ?userId=1
  })
  return data
}

// ============================================================
// 场景 C：POST 创建文章
// ============================================================

async function createPost_fetch(title, body) {
  const res = await fetch(\`\${API}/posts\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // ★ 要自己写
    body: JSON.stringify({ title, body, userId: 1 }), // ★ 要自己 stringify
  })
  if (!res.ok) throw new Error('创建失败')
  return res.json()
}

async function createPost_axios(title, body) {
  const { data } = await axios.post(\`\${API}/posts\`, {
    title,
    body,
    userId: 1,
  })
  return data
}

// ============================================================
// 场景 D：错误处理对比
// ============================================================

async function demoErrors() {
  // fetch：404 不 throw
  try {
    const res = await fetch(\`\${API}/users/99999\`)
    console.log('fetch res.ok', res.ok) // false
    // 如果不写 if (!res.ok)，后面 res.json() 可能拿到错误页 HTML
  } catch (e) {
    console.log('fetch 只有网络错误才到这')
  }

  // axios：404 throw
  try {
    await axios.get(\`\${API}/users/99999\`)
  } catch (e) {
    console.log('axios 错误', e.response?.status) // 404
    console.log('axios message', e.message)
  }
}

// ============================================================
// 场景 E：取消请求（两者写法几乎一样）
// ============================================================

function fetchWithCancel_fetch() {
  const controller = new AbortController()
  fetch(\`\${API}/users\`, { signal: controller.signal })
  return () => controller.abort()
}

function fetchWithCancel_axios() {
  const controller = new AbortController()
  axios.get(\`\${API}/users\`, { signal: controller.signal })
  return () => controller.abort()
}`,
          },
          {
            type: 'list',
            title: '5. 怎么用：怎么选（决策顺序）',
            ordered: true,
            items: [
              '初学、理解 HTTP 本质 → 先写 fetch + 三态模板',
              '项目超过 3 个接口、要统一 token → axios + request.js',
              '需要缓存/重试/去重 → 在 axios 之上加 TanStack Query',
              '练手没后端 → jsonplaceholder 或 json-server（见后文）',
            ],
          },
          {
            type: 'text',
            title: '6. 易错：fetch 与 axios 常见坑',
            body: '**fetch 忘记 res.ok**——最常见 bug，404 当成功处理。\n\n**fetch 的 res.json() 也要 await**——漏写 await 拿到的是 Promise 不是数据。\n\n**axios 响应在 res.data**——直接 console.log(res) 看不到业务数组。\n\n**拦截器 return response.data 后组件又 .data**——undefined。\n\n**跨域被浏览器拦**——开发配 proxy 或用支持 CORS 的练手 API。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'fetch 要 res.ok + 两次 await；axios 自动 JSON 且 4xx 进 catch——学原理用 fetch，做项目用 axios + request.js 封装。',
          },
        ],
      },
    },
    {
      id: 'fetch-three-states',
      title: 'fetch 三态模板：loading / error / data',
      summary: '无论 fetch 还是 axios，页面里都是这三态：加载中、出错、成功渲染',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '发请求前 setLoading(true)；成功 setData、失败 setError；finally setLoading(false)——渲染时 loading → error → 正常 UI；换 axios 只改请求那一行，三态逻辑不变。',
          },
          {
            type: 'text',
            title: '1. 是什么：请求页面的固定结构',
            body: '任何「从服务器拉数据并展示」的页面，用户都会经历三种状态：\n\n**loading**：还没拿到数据，显示「加载中…」或骨架屏。\n\n**error**：请求失败（网络断、404、500），显示错误信息和重试按钮。\n\n**data**：成功拿到数据，map 渲染列表或展示详情。\n\n这三态是 React 数据请求的** universal 模板**——fetch、axios、甚至以后的 TanStack Query 都要映射到这三种 UI 状态（Query 用 isLoading/isError/data，本质相同）。',
          },
          {
            type: 'table',
            title: '三态 state 与渲染顺序',
            intro: '按这个顺序写 if return，逻辑最清晰。',
            headers: ['state', '类型建议', '何时设置', '渲染'],
            rows: [
              ['loading', 'boolean，初始 true', '请求前 true，finally false', '加载中… / Spinner'],
              ['error', 'string，初始 ""', 'catch 里 setError(e.message)', '红色错误 + 重试按钮'],
              ['data', 'array 或 null', 'try 里 setData(...)', '列表 map 或详情展示'],
            ],
            note: '空列表 data=[] 和 loading 不同——loading 是还没拿到，空列表是拿到了但长度为 0。',
          },
          {
            type: 'text',
            title: '2. 特点：useEffect + AbortController',
            body: '请求放在 **useEffect** 里——组件挂载时（或依赖变化时）自动拉数据。\n\n**AbortController**：useEffect 的 cleanup return () => controller.abort()。用户快速切页时取消进行中的请求，避免「页都走了还在 setState」的警告。\n\ncatch 里 **if (e.name === \'AbortError\') return**——取消不算业务错误，别显示成「加载失败」。',
          },
          {
            type: 'list',
            title: '3. 为什么：finally 里关 loading',
            ordered: false,
            items: [
              '只在 try 里 setLoading(false) → 出错时永远 loading',
              'finally 无论成功失败都执行 → loading 一定被关掉',
              '请求前 setError("") 清空上次错误 → 重试时不显示旧错误',
              '详情页 userId 变化时 setUser(null) → 避免短暂显示上一个用户',
            ],
          },
          {
            type: 'list',
            title: '4. 怎么用：四步模板（清单）',
            ordered: true,
            items: [
              '声明三 state：data、loading、error',
              'useEffect 里 async load() { try/catch/finally }',
              'cleanup 里 controller.abort()',
              '渲染：if (loading) return ...; if (error) return ...; return 正常 UI',
            ],
          },
          {
            type: 'code',
            title: '完整可抄 demo：fetch 用户列表（三态 + 取消）',
            language: 'jsx',
            body: `import { useEffect, useState } from 'react'

const API = 'https://jsonplaceholder.typicode.com'

function UserListPage() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setError('')

        const res = await fetch(\`\${API}/users\`, {
          signal: controller.signal,
        })

        if (!res.ok) {
          throw new Error(\`请求失败：HTTP \${res.status}\`)
        }

        const data = await res.json()
        setList(data)
      } catch (e) {
        // 组件卸载导致的取消，不算错误
        if (e.name === 'AbortError') return
        setError(e.message || '未知错误')
        setList([])
      } finally {
        setLoading(false)
      }
    }

    load()

    return () => controller.abort()
  }, []) // 空依赖：只在挂载时请求一次

  // ===== 三态渲染 =====
  if (loading) {
    return (
      <div>
        <h2>用户列表</h2>
        <p>加载中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h2>用户列表</h2>
        <p style={{ color: 'crimson' }}>加载失败：{error}</p>
        <button type="button" onClick={() => window.location.reload()}>
          刷新重试
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2>用户列表（共 {list.length} 人）</h2>
      <ul>
        {list.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserListPage`,
          },
          {
            type: 'code',
            title: '完整可抄 demo：fetch 详情页（依赖 id 重新请求）',
            language: 'jsx',
            body: `import { useEffect, useState } from 'react'

function UserDetailPage({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!userId) return

    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setError('')
        setUser(null)

        const res = await fetch(
          \`https://jsonplaceholder.typicode.com/users/\${userId}\`,
          { signal: controller.signal }
        )

        if (!res.ok) throw new Error('用户不存在')
        setUser(await res.json())
      } catch (e) {
        if (e.name === 'AbortError') return
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [userId]) // ★ userId 变了重新请求

  if (loading) return <p>加载用户 {userId}...</p>
  if (error) return <p>错误：{error}</p>
  if (!user) return null

  return (
    <div>
      <h1>{user.name}</h1>
      <p>邮箱：{user.email}</p>
      <p>电话：{user.phone}</p>
    </div>
  )
}

export default UserDetailPage`,
          },
          {
            type: 'code',
            title: '完整可抄 demo：fetch POST 提交表单（三态用在按钮上）',
            language: 'jsx',
            body: `import { useState } from 'react'

function CreatePostForm() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) {
      setError('标题不能为空')
      return
    }

    setSubmitting(true)
    setError('')
    setSuccess(null)

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          userId: 1,
        }),
      })

      if (!res.ok) throw new Error('提交失败')
      const data = await res.json()
      setSuccess(data)
      setTitle('')
      setBody('')
    } catch (e) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>发布文章（fetch POST）</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && (
        <p style={{ color: 'green' }}>
          创建成功！ID：{success.id}
        </p>
      )}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="标题"
        disabled={submitting}
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="正文"
        disabled={submitting}
      />
      <button type="submit" disabled={submitting}>
        {submitting ? '提交中...' : '发布'}
      </button>
    </form>
  )
}

export default CreatePostForm`,
          },
          {
            type: 'text',
            title: '5. 易错：三态模板',
            body: '**finally 里 setLoading(false)**——别只在 try 里写。\n\n**AbortError 要 return**——别显示成错误。\n\n**依赖数组漏写 userId**——切换详情不刷新。\n\n**loading 和空列表混淆**——文案要区分「加载中」和「暂无数据」。\n\n**POST 用 submitting 不用 loading**——避免整页被 loading 盖住表单（见上面 demo）。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '三 state + useEffect try/catch/finally + abort 清理；渲染顺序 loading → error → data——这套模板换 axios 只改请求一行。',
          },
        ],
      },
    },
    {
      id: 'axios-interceptor-full',
      title: 'axios 完整用法：实例 + 拦截器 + 组件（对照 request.js）',
      summary: 'axios.create 统一 baseURL；拦截器带 token、直接返回 data；组件里 import http 即可',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '商业项目 axios.create 出 http 实例：统一 baseURL/超时/Content-Type；请求拦截器加 Authorization；响应拦截器 return response.data——全项目 import http，改域名只改一处。',
          },
          {
            type: 'text',
            title: '1. 是什么：为什么要封装 http 实例',
            body: '如果每个组件都写 axios.get(\'https://api.example.com/users\')——域名改一次要改几十个文件；token 要复制粘贴到每个请求；401 处理散落各处。\n\n**axios.create** 创建一个独立实例，有自己的 defaults（baseURL、timeout、headers）。\n\n**拦截器 interceptors**：在请求发出前 / 响应回来后插入统一逻辑——加 token、剥掉 response.data、401 跳登录。\n\n本项目 **src/utils/request.js** 就是标准商业封装——下面代码与仓库一致，建议逐行对照。',
          },
          {
            type: 'table',
            title: '拦截器职责分工',
            intro: '请求拦截「发出去之前」；响应拦截「回来之后」。',
            headers: ['拦截器', '时机', '典型逻辑', '本项目'],
            rows: [
              ['request.use', '每个请求发出前', '加 Authorization、加 traceId', '读 localStorage token'],
              ['response.use 成功', '2xx 响应', 'return response.data 简化组件', '直接 return data'],
              ['response.use 失败', '非 2xx / 网络错误', '统一 message、401 处理', 'reject new Error(message)'],
            ],
            note: '组件里 await http.get("/users") 拿到的是数组，不是 { data, status, headers }。',
          },
          {
            type: 'list',
            title: '2. 特点：封装四步',
            ordered: true,
            items: [
              'axios.create({ baseURL, timeout, headers })',
              'request 拦截器：读 token → config.headers.Authorization',
              'response 拦截器成功：(response) => response.data',
              'response 拦截器失败：包装 Error + 401 分支',
            ],
          },
          {
            type: 'text',
            title: '3. 为什么：baseURL + proxy',
            body: '开发时 React 跑 3000，json-server 跑 3001——直接请求会跨域。本项目 package.json 配 **"proxy": "http://localhost:3001"**，request.js 里 baseURL 留空，写 http.get(\'/users\') 即可——开发服务器自动转发。\n\n生产环境 baseURL 改成 REACT_APP_API_BASE_URL 或真实域名。打包后 proxy 不生效，必须配正式 API 地址。',
          },
          {
            type: 'code',
            title: '对照本项目：src/utils/request.js（完整注释版）',
            language: 'javascript',
            body: `import axios from 'axios'

/**
 * axios 实例 —— 商业项目常见封装
 *
 * 用法：
 *   import http from '../utils/request'
 *   const users = await http.get('/users')
 *   await http.post('/posts', { title: 'hi' })
 */

const http = axios.create({
  // 所有请求自动加此前缀
  // 开发时可改成 '/api' + package.json proxy
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ========== 请求拦截：发出去之前 ==========
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ========== 响应拦截：回来之后 ==========
http.interceptors.response.use(
  (response) => response.data, // ★ 组件里拿到的就是 data
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }

    const status = error.response?.status
    const message =
      error.response?.data?.message ||
      error.message ||
      '网络异常，请稍后重试'

    if (status === 401) {
      console.warn('未登录或登录已过期')
      // 真实项目：localStorage.removeItem('token'); navigate('/login')
    }

    return Promise.reject(new Error(message))
  }
)

export default http
export { axios }`,
          },
          {
            type: 'code',
            title: '完整可抄 demo：组件里用 http 拉列表',
            language: 'jsx',
            body: `import { useEffect, useState } from 'react'
import http from '../../utils/request' // 路径按你的文件调整

function UserListWithHttp() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setError('')

        // ★ 拦截器已返回 data，这里直接是用户数组
        const data = await http.get('/users', {
          signal: controller.signal,
        })
        setList(data)
      } catch (e) {
        // axios 取消：CanceledError / ERR_CANCELED
        if (e.name === 'CanceledError' || e.code === 'ERR_CANCELED') return
        if (e.name === 'AbortError') return
        setError(e.message || '加载失败')
      } finally {
        setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [])

  if (loading) return <p>加载中...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <ul>
      {list.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  )
}

export default UserListWithHttp`,
          },
          {
            type: 'code',
            title: '完整可抄 demo：登录 + POST + 自动带 token',
            language: 'jsx',
            body: `import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import http from '../../utils/request'

function LoginAndFetchPage() {
  const navigate = useNavigate()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // 练手：jsonplaceholder 没有真登录，这里模拟
      // 真实：const { token } = await http.post('/login', { account, password })
      await new Promise((r) => setTimeout(r, 500))
      const fakeToken = 'demo-token-' + Date.now()
      localStorage.setItem('token', fakeToken)

      // 之后所有 http 请求会自动带 Authorization（见 request.js 拦截器）
      navigate('/', { replace: true })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreatePost() {
    try {
      const result = await http.post('/posts', {
        title: '测试文章',
        body: '内容',
        userId: 1,
      })
      alert('创建成功 id=' + result.id)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>登录</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          placeholder="账号"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="密码"
        />
        <button type="submit" disabled={loading}>
          {loading ? '登录中...' : '登录'}
        </button>
      </form>

      <button type="button" onClick={handleCreatePost} style={{ marginTop: 16 }}>
        登录后点我：POST 创建文章（自动带 token）
      </button>
    </div>
  )
}

export default LoginAndFetchPage`,
          },
          {
            type: 'code',
            title: 'axios 常用 API 速查（组件里或 api 模块里用）',
            language: 'javascript',
            body: `import http from '../utils/request'

// GET + 查询参数 → /users?page=1&keyword=react
const users = await http.get('/users', {
  params: { page: 1, keyword: 'react' },
})

// POST body
const post = await http.post('/posts', { title: '标题', body: '内容' })

// PUT 全量更新 / PATCH 部分更新 / DELETE
await http.put('/users/1', { name: '小明' })
await http.patch('/users/1', { name: '小明' })
await http.delete('/users/1')

// 上传 FormData（要改 Content-Type，让浏览器自动带 boundary）
const form = new FormData()
form.append('file', file)
await http.post('/upload', form, {
  headers: { 'Content-Type': 'multipart/form-data' },
})

// 并发请求
const [users, posts] = await Promise.all([
  http.get('/users'),
  http.get('/posts'),
])`,
          },
          {
            type: 'list',
            title: '4. 怎么用：接入步骤清单',
            ordered: true,
            items: [
              'npm install axios',
              '新建 src/utils/request.js（create + 双拦截器）',
              '组件 import http，配合三态模板',
              '开发配 proxy + baseURL 空或 /api',
              '401 在拦截器里清 token + navigate（别无限循环）',
              '对照 /demo/json-server 页看真实联调',
            ],
          },
          {
            type: 'text',
            title: '5. 易错：axios 封装',
            body: '**拦截器 return response.data 后组件又 .data**——undefined。\n\n**baseURL 末尾不要 /**，path 开头要 /**：baseURL + /users。\n\n**401 拦截器里无限 navigate**——登录页请求也 401 会死循环，要排除登录接口或判断当前路径。\n\n**localStorage token 键名不统一**——全项目用一个常量。\n\n**取消错误**：axios 是 CanceledError，fetch 是 AbortError——两个都要判断。\n\n**打开 src/utils/request.js 逐行对照本节**——比背 API 快。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'create 实例 → 请求拦截加 token → 响应拦截 return data → 组件 import http；别在组件里裸写 axios.get 全 URL。',
          },
        ],
      },
    },
    {
      id: 'todo-practice-full',
      title: 'Todolist 完整骨架：可运行级别的串联练习',
      summary: '受控输入、列表 CRUD、过滤、持久化、可选接 axios——把前面知识串成一个小项目',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'Todo 是 React 入门「毕业考」：useState 管列表和输入、受控组件、map+key、不可变更新、useMemo 过滤、useEffect 持久化——进阶版把增删改换成 http 请求即可。',
          },
          {
            type: 'text',
            title: '1. 是什么：为什么要做 Todolist',
            body: '前面各章学的知识点——useState、受控输入、条件渲染、列表 map、不可变更新、useEffect、派生数据——分散在不同 demo 里。Todolist 把它们**串成一个完整小应用**，做完一遍你会明显感到「入门了」。\n\n本地版用 localStorage 持久化；进阶版把 CRUD 换成 axios + json-server，就是真实后台列表的缩小版。',
          },
          {
            type: 'table',
            title: '功能清单 vs 对应知识点',
            intro: '按顺序实现，每完成一项打勾。',
            headers: ['功能', '知识点', '难度'],
            rows: [
              ['输入框新增 todo', '受控组件、onKeyDown Enter', '⭐'],
              ['列表渲染 + checkbox', 'map、key、checked+onChange', '⭐'],
              ['切换 done / 删除', '不可变 map / filter', '⭐⭐'],
              ['过滤 全部/未完成/已完成', 'useMemo 派生、不要复制 state', '⭐⭐'],
              ['统计条数', 'useMemo 或派生变量', '⭐'],
              ['localStorage 持久化', 'useEffect、懒初始化 useState', '⭐⭐'],
              ['清除已完成（可选）', 'filter 批量删', '⭐'],
              ['拆组件 + axios（进阶）', 'props 回调、http CRUD', '⭐⭐⭐'],
            ],
            note: '建议新建 Vite/CRA 项目亲手敲一遍，不要只复制粘贴。',
          },
          {
            type: 'text',
            title: '2. 特点：数据结构设计',
            body: '每条 todo：**{ id: number, text: string, done: boolean }**。\n\nid 用 Date.now() 或 crypto.randomUUID()——**不要用数组 index 当 id**（删除后 index 变，React diff 会乱）。\n\nstate 三块：**todos** 数组、**text** 输入、**filter** 枚举 \'all\' | \'active\' | \'done\'。',
          },
          {
            type: 'table',
            title: '不可变更新口诀表',
            intro: '永远不要 todos.push() 或直接 todos[i].done = true。',
            headers: ['操作', '写法', '错误写法'],
            rows: [
              ['新增', '[...prev, newItem]', 'prev.push(newItem)'],
              ['切换 done', 'prev.map(t => t.id===id ? {...t, done:!t.done} : t)', 't.done = true'],
              ['删除', 'prev.filter(t => t.id !== id)', 'prev.splice(i, 1)'],
              ['清空已完成', 'prev.filter(t => !t.done)', '循环 delete'],
            ],
            note: 'setTodos 必须传新数组/新对象，React 靠引用变化检测更新。',
          },
          {
            type: 'list',
            title: '3. 怎么用：分步实现（推荐顺序）',
            ordered: true,
            items: [
              '第 1 步：useState([]) + 输入框受控 + 按钮/回车 addTodo',
              '第 2 步：ul map 渲染，checkbox 切换 done，删除按钮',
              '第 3 步：filter state + useMemo 算 visibleTodos',
              '第 4 步：显示总条数、未完成条数',
              '第 5 步：useEffect 写 localStorage；useState 懒初始化读 localStorage',
              '第 6 步（可选）：清除已完成、双击编辑',
              '第 7 步（进阶）：拆 TodoInput/TodoItem，接 http CRUD',
            ],
          },
          {
            type: 'code',
            title: '完整可抄 demo：Todolist（单文件可运行骨架）',
            language: 'jsx',
            body: `import { useState, useEffect, useMemo } from 'react'
import './TodoApp.css'

const FILTERS = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '未完成' },
  { key: 'done', label: '已完成' },
]

const STORAGE_KEY = 'react-demo-todos'

function TodoApp() {
  // ===== state =====
  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')

  // ===== 持久化 =====
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // ===== 派生数据 =====
  const visibleTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done)
    if (filter === 'done') return todos.filter((t) => t.done)
    return todos
  }, [todos, filter])

  const activeCount = useMemo(
    () => todos.filter((t) => !t.done).length,
    [todos]
  )

  // ===== 操作 =====
  function addTodo() {
    const value = text.trim()
    if (!value) return
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: value, done: false },
    ])
    setText('')
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function removeTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.done))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addTodo()
  }

  // ===== 渲染 =====
  return (
    <div className="TodoApp">
      <h1 className="TodoApp-title">Todo List</h1>
      <p className="TodoApp-desc">入门串联练习：state、列表、过滤、持久化</p>

      {/* 输入区 */}
      <div className="TodoApp-inputRow">
        <input
          className="TodoApp-input"
          value={text}
          placeholder="输入待办，回车添加"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" className="TodoApp-addBtn" onClick={addTodo}>
          添加
        </button>
      </div>

      {/* 过滤 + 统计 */}
      <div className="TodoApp-toolbar">
        <div className="TodoApp-filters">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={
                filter === f.key
                  ? 'TodoApp-filter TodoApp-filter--active'
                  : 'TodoApp-filter'
              }
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <span className="TodoApp-stats">
          共 {todos.length} 条，未完成 {activeCount} 条
        </span>
      </div>

      {/* 列表 */}
      {visibleTodos.length === 0 ? (
        <p className="TodoApp-empty">
          {filter === 'all' ? '还没有待办，添加一条吧' : '当前筛选下没有条目'}
        </p>
      ) : (
        <ul className="TodoApp-list">
          {visibleTodos.map((todo) => (
            <li key={todo.id} className="TodoApp-item">
              <label className="TodoApp-itemLabel">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span
                  className={
                    todo.done ? 'TodoApp-text TodoApp-text--done' : 'TodoApp-text'
                  }
                >
                  {todo.text}
                </span>
              </label>
              <button
                type="button"
                className="TodoApp-removeBtn"
                onClick={() => removeTodo(todo.id)}
              >
                删除
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* 底部操作 */}
      {todos.some((t) => t.done) && (
        <button type="button" className="TodoApp-clearBtn" onClick={clearCompleted}>
          清除已完成
        </button>
      )}
    </div>
  )
}

export default TodoApp`,
          },
          {
            type: 'code',
            title: 'TodoApp.css（配套样式，可直接复制）',
            language: 'css',
            body: `.TodoApp {
  max-width: 520px;
  margin: 0 auto;
  padding: 24px;
}

.TodoApp-title {
  margin: 0 0 8px;
}

.TodoApp-desc {
  color: #666;
  font-size: 14px;
  margin: 0 0 20px;
}

.TodoApp-inputRow {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.TodoApp-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
}

.TodoApp-addBtn {
  padding: 10px 16px;
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
}

.TodoApp-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 8px;
}

.TodoApp-filters {
  display: flex;
  gap: 4px;
}

.TodoApp-filter {
  padding: 6px 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  border-radius: 6px;
  font-size: 13px;
}

.TodoApp-filter--active {
  background: #eff6ff;
  border-color: #2563eb;
  color: #2563eb;
}

.TodoApp-stats {
  font-size: 13px;
  color: #666;
}

.TodoApp-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.TodoApp-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f3f4f6;
}

.TodoApp-itemLabel {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  cursor: pointer;
}

.TodoApp-text--done {
  text-decoration: line-through;
  color: #9ca3af;
}

.TodoApp-removeBtn {
  padding: 4px 10px;
  font-size: 12px;
  color: #ef4444;
  background: transparent;
  border: 1px solid #fecaca;
  border-radius: 4px;
}

.TodoApp-empty {
  color: #9ca3af;
  text-align: center;
  padding: 24px;
}

.TodoApp-clearBtn {
  margin-top: 16px;
  font-size: 13px;
  color: #666;
  background: none;
  border: none;
  text-decoration: underline;
}`,
          },
          {
            type: 'code',
            title: '进阶：拆组件 + 接 axios（思路代码）',
            language: 'jsx',
            body: `// 拆成 TodoInput / TodoItem / TodoFilter 三个子组件
// 父组件 TodoPage 拥有 todos state，props + 回调传下去（第 8 章）

import http from '../utils/request'

function TodoPageRemote() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    http.get('/todos').then(setTodos).finally(() => setLoading(false))
  }, [])

  async function addTodo(text) {
    const created = await http.post('/todos', { text, done: false })
    setTodos((prev) => [...prev, created])
  }

  async function toggleTodo(id, done) {
    await http.patch(\`/todos/\${id}\`, { done: !done })
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !done } : t))
    )
  }

  async function removeTodo(id) {
    await http.delete(\`/todos/\${id}\`)
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  if (loading) return <p>加载中...</p>
  // ... 其余 UI 和本地版相同
}`,
          },
          {
            type: 'list',
            title: '自检清单（做完打勾）',
            ordered: false,
            items: [
              'map 用了 key={todo.id} 不是 index',
              'checkbox 是 checked + onChange，不是 defaultChecked',
              'filter 用 useMemo 派生，没有第二份 todos state',
              'localStorage 初始值在 useState(() => ...) 懒初始化',
              'JSON.parse 包了 try/catch',
              '空输入 addTodo 直接 return',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'id 稳定、更新不可变、过滤用派生、持久化用 useEffect——本地 Todo 练熟再换 http CRUD 就是真实项目列表页。',
          },
        ],
      },
    },
    {
      id: 'json-server',
      title: 'json-server：本地 mock 接口 + React 联调演示',
      summary: '零后端练 CRUD：db.json 自动生成 REST API，配合 proxy 和 axios 使用',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'json-server 读 db.json 自动生成 REST 接口——React 用 axios 请求 /users、POST /users 就像连真后端；开发配 proxy 解决跨域，上线换真实 API 地址。',
          },
          {
            type: 'text',
            title: '1. 是什么：json-server',
            body: '后端接口还没好，但你想先写列表页、表单、增删改——**json-server** 读项目根目录的 **db.json**，在本地启动一个假 REST API 服务（默认 3001 端口）。\n\n你不需要写 Node/Java 后端，专注练 React + axios + 三态模板。\n\n**只在本地开发用**——上线前把 baseURL 换成真实后端，db.json 不会打进生产包。',
          },
          {
            type: 'table',
            title: '什么时候用 json-server vs 公开 API',
            intro: '按场景选练手方式。',
            headers: ['场景', '推荐', '原因'],
            rows: [
              ['只练 GET 列表', 'jsonplaceholder', '零配置、外网 CORS 已开'],
              ['练 POST/PUT/DELETE', 'json-server', '公开 API 只读或假成功'],
              ['练分页筛选语法', 'json-server', '支持 ?_page &_limit &字段=值'],
              ['和后端字段对齐', 'json-server + 自建 db.json', '数据结构自己定'],
              ['本项目演示页', '/demo/json-server', '已实现 GET/POST/DELETE'],
            ],
            note: '顶部导航点「API 演示」或访问 /demo/json-server 看完整联调。',
          },
          {
            type: 'list',
            title: '2. 特点：db.json 规则',
            ordered: false,
            items: [
              '每个顶层键名 = 一个 REST 资源（users → /users）',
              '值是对象数组，每项建议有 id 字段',
              'POST 新增可不传 id，json-server 自动递增',
              '--watch 模式下改 db.json 自动重载',
            ],
          },
          {
            type: 'code',
            title: '第 1 步：安装（本项目已装好）',
            language: 'bash',
            body: `npm install -D json-server

# 开发依赖即可，打包上线不会带上 json-server`,
          },
          {
            type: 'code',
            title: '第 2 步：准备 db.json（项目根目录）',
            language: 'json',
            body: `{
  "users": [
    { "id": 1, "name": "小明", "email": "xiaoming@example.com", "role": "admin" },
    { "id": 2, "name": "小红", "email": "xiaohong@example.com", "role": "user" }
  ],
  "posts": [
    { "id": 1, "title": "React 入门", "body": "内容...", "userId": 1 }
  ],
  "todos": [
    { "id": 1, "text": "学习 JSX", "done": false }
  ]
}

# 规则：每个「键名」自动变成一个 REST 资源
# users  → /users
# posts  → /posts
# todos  → /todos`,
          },
          {
            type: 'table',
            title: '第 3 步：json-server 自动提供的 REST 接口（users 资源）',
            intro: '和标准 REST 约定一致，axios 直接调。',
            headers: ['方法', '路径', '作用'],
            rows: [
              ['GET', '/users', '查全部'],
              ['GET', '/users/2', '查 id=2'],
              ['GET', '/users?role=admin', '按条件筛选'],
              ['GET', '/users?_page=1&_limit=10', '分页'],
              ['POST', '/users', '新增（body JSON）'],
              ['PUT', '/users/2', '整条替换 id=2'],
              ['PATCH', '/users/2', '部分修改 id=2'],
              ['DELETE', '/users/2', '删除 id=2'],
            ],
            note: '浏览器可直接打开 http://localhost:3001/users 看 JSON。',
          },
          {
            type: 'code',
            title: '第 4 步：启动 mock 服务',
            language: 'bash',
            body: `# 方式 A：两个终端（推荐初学，看得清楚）
# 终端 1：启动 mock API（3001 端口）
npm run server

# 终端 2：启动 React（3000 端口）
npm start

# 方式 B：一条命令同时启动（package.json 已配置）
npm run start:all

# 启动成功后浏览器可访问：
# http://localhost:3001/users   ← 直接看 JSON 数据`,
          },
          {
            type: 'text',
            title: '4. 为什么：proxy 解决跨域',
            body: 'React 开发服务器跑 **3000**，json-server 跑 **3001**——浏览器视为不同源，直接 fetch/axios 会 CORS 报错。\n\n本项目 **package.json** 配 **"proxy": "http://localhost:3001"**。开发时 axios 请求 http://localhost:3000/users，CRA 开发服务器**自动转发**到 3001。\n\n**src/utils/request.js** 里 baseURL 留空（或 /api），写 http.get(\'/users\') 即可。**proxy 只在开发生效**，生产必须配 REACT_APP_API_BASE_URL。',
          },
          {
            type: 'code',
            title: '第 5 步：在 React 里发请求（完整 Demo）',
            language: 'jsx',
            body: `import { useEffect, useState } from 'react'
import http from '../utils/request'

function UserPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // GET：查列表
  async function loadUsers() {
    try {
      setLoading(true)
      setError('')
      const data = await http.get('/users')
      setUsers(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  // POST：新增
  async function addUser() {
    await http.post('/users', {
      name: '新用户',
      email: 'new@example.com',
      role: 'user',
    })
    loadUsers() // 重新拉列表
  }

  // PATCH：改部分字段
  async function toggleRole(id) {
    await http.patch(\`/users/\${id}\`, { role: 'admin' })
    loadUsers()
  }

  // DELETE：删除
  async function removeUser(id) {
    await http.delete(\`/users/\${id}\`)
    loadUsers()
  }

  if (loading) return <p>加载中...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <button onClick={addUser}>新增用户</button>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} - {u.email}
            <button onClick={() => toggleRole(u.id)}>设 admin</button>
            <button onClick={() => removeUser(u.id)}>删除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '对照本项目可运行演示页',
            body: '顶部导航点 **「API 演示」**，或访问 **/demo/json-server**。页面已实现：GET 用户列表、POST 新增、DELETE 删除。\n\n完整代码见 **src/pages/JsonServerDemo/index.js**——建议先 npm run start:all 启动双服务，再打开演示页点按钮看 Network 面板。',
          },
          {
            type: 'code',
            title: 'package.json 关键配置（对照本项目）',
            language: 'json',
            body: `{
  "scripts": {
    "server": "json-server --watch db.json --port 3001",
    "start:all": "concurrently \\"npm run server\\" \\"npm start\\" --names api,web"
  },
  "proxy": "http://localhost:3001"
}`,
          },
          {
            type: 'list',
            title: '6. 怎么用：联调启动清单',
            ordered: true,
            items: [
              '确认 db.json 在项目根目录',
              'npm run server 或 npm run start:all',
              '浏览器打开 localhost:3001/users 确认 mock 正常',
              'request.js baseURL 与 proxy 策略一致',
              '打开 /demo/json-server 点增删查',
              'DevTools Network 看请求是否 200',
            ],
          },
          {
            type: 'text',
            title: '7. 易错：json-server 常见坑',
            body: '**忘记 npm run server**——页面报网络错误。\n\n**3001 端口被占用**——换端口，proxy 也要一起改。\n\n**改 db.json 后没生效**——确认用了 --watch；或重启 server。\n\n**POST 后列表没更新**——假 API 成功但你要自己 loadUsers() 或乐观更新 state。\n\n**生产环境还用 localhost:3001**——proxy 不生效，必须环境变量配真实 API。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'db.json → npm run server → proxy 转发 → http.get("/users")；演示页 /demo/json-server，对照 JsonServerDemo 源码。',
          },
        ],
      },
    },
    {
      id: 'graduation-checklist',
      title: '入门毕业清单：你能写什么、下一步学什么',
      summary: '对照清单自检；推荐练手项目由易到难；知道学完本笔记后该往哪走',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '能独立搭项目、函数组件、useState/useEffect、列表 CRUD、React Router、axios 三态、Redux 基础——并完成 Todolist 或简易商品列表之一，就算 React 入门合格，可以学 TypeScript 或 Next.js。',
          },
          {
            type: 'text',
            title: '1. 是什么：怎样算「入门过关」',
            body: '「看过教程」和「能写出来」差很远。入门过关的标志是：给你一个新需求（比如带登录的用户列表），你能**独立拆页面、配路由、发请求、处理 loading/error**——不需要每步都翻文档。\n\n本笔记按 order 顺序覆盖这些能力。下面清单逐项自检；推荐练手项目从 Todolist 到带登录后台，难度递增。',
          },
          {
            type: 'list',
            title: '2. 自检清单（逐项打勾）',
            ordered: false,
            items: [
              '【项目结构】能说出 pages / components / routes / utils / store 各放什么',
              '【JSX】会写表达式、条件渲染、列表 map + key',
              '【组件】函数组件、props 解构、子传父回调',
              '【State】受控输入、不可变更新（map/filter/spread）',
              '【Effect】挂载请求、依赖数组、cleanup、AbortController',
              '【通信】父传子、状态提升、Context 基本用法',
              '【路由】BrowserRouter、路由表、Link、useNavigate、useParams、守卫（/demo/auth）',
              '【样式】组件旁 CSS、动态 className',
              '【请求】fetch 三态、axios + request.js、json-server 联调',
              '【状态管理】Redux Toolkit createSlice、useSelector、useDispatch',
            ],
          },
          {
            type: 'table',
            title: '3. 推荐练手项目（由易到难）',
            intro: '每项都是一个小里程碑——预计时间供参考，动手比看更重要。',
            headers: ['项目', '练什么', '预计', '完成标志'],
            rows: [
              ['Todolist', 'useState、map/filter、受控、localStorage', '半天', '刷新不丢、过滤正常'],
              ['用户列表', 'axios 三态、http.get、列表渲染', '半天', 'loading/error/列表三态正确'],
              ['列表 + 详情多页', 'Router、useParams、详情请求', '1 天', '点进详情 id 变数据变'],
              ['简易记账本', 'CRUD、筛选、汇总、localStorage', '1～2 天', '按分类统计金额'],
              ['带登录后台列表', '表单、token、拦截器、RequireAuth', '2～3 天', '未登录跳登录、401 处理'],
              ['react-demo 知识手册', '读源码、改 lessons、加章节', '随时', '能自己加一篇教程条目'],
            ],
            note: '带登录项目可直接参考本章 axios 封装 + 第 9 章 /demo/auth 守卫。',
          },
          {
            type: 'table',
            title: '4. 下一步学什么（按优先级）',
            intro: '先别贪多——下面按「投入产出比」排序。',
            headers: ['方向', '解决什么问题', '建议时机'],
            rows: [
              ['TypeScript + React', '类型安全、IDE 提示、少低级 bug', '入门后立即'],
              ['TanStack Query', '请求缓存、refetch、少写三态样板', 'axios 熟练后'],
              ['React Router 进阶', 'lazy、loader/action、useBlocker', '守卫熟练后'],
              ['RTK Query', '和 Redux 一体的请求方案', '已用 Redux 的项目'],
              ['Zustand', '轻量全局状态，小项目够用', 'Redux 觉得重时'],
              ['Next.js', 'SEO、SSR、文件路由', '要做官网/博客时'],
              ['Testing Library', '组件测试、回归保障', '进团队有 CI 要求时'],
            ],
            note: '一次精通一个库，别同时开十个教程。',
          },
          {
            type: 'code',
            title: '常用命令 & 文件速查（复制贴墙）',
            language: 'bash',
            body: `# 创建项目
npx create-react-app my-app
# 或
npm create vite@latest my-app -- --template react

# 本地 mock 接口（本项目）
npm run server       # 只启动 json-server（3001）
npm run start:all    # 同时启动 mock + React

# 常用依赖
npm install react-router-dom axios @reduxjs/toolkit react-redux
npm install -D json-server

# 本项目关键文件
src/utils/request.js       # axios 封装（baseURL 空 = 走 proxy）
db.json                    # json-server 数据
src/pages/JsonServerDemo/  # API 演示页 /demo/json-server
src/routes/index.js        # 路由表（含 /demo/auth）`,
          },
          {
            type: 'list',
            title: '5. 怎么用：这份笔记最高效',
            ordered: true,
            items: [
              '按首页 order 顺序学，不要跳章',
              '每章「完整可抄 demo」亲手敲一遍，改变量看效果',
              '请求问题 → src/utils/request.js',
              '路由问题 → src/routes/index.js + /demo/auth',
              '学完用 Todolist 串联，再用用户列表练 axios',
              '卡住回对应章节「易错点」和「一句话记忆」',
            ],
          },
          {
            type: 'text',
            title: '6. 易错：学习心态',
            body: '**报错先看控制台红字**，复制去搜，比瞎改有效。\n\n**改一处运行看一处**——别一次改十个文件找不到 bug。\n\n**概念不懂先跑通 demo 再回头理解**——编程是螺旋上升。\n\n**别过早学十个状态管理库**——useState + Context + Redux Toolkit 练熟足够。\n\n**看完 ≠ 会**——动手 hours 远大于看书 hours。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '清单打勾 + Todolist 毕业 + 用户列表练 axios + /demo/auth 练守卫——四条都做过，就可以自信学 TS 和 Next 了。',
          },
        ],
      },
    },
  ],
}

export default practice
