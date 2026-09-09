/**
 * 数据请求与接口联调章节
 * 每个条目 = 一句话总结 + 详细步骤 + 完整可抄 demo + 易错点
 */
const practice = {
  id: 'practice',
  title: '数据请求与接口联调',
  summary:
    'fetch vs axios、三态模板与竞态处理、手写 axios 拦截器、json-server 本地 mock、Todolist 串联练习与乐观更新、阶段自检与后续路线',
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
            body: `// 练手 API 地址：jsonplaceholder 支持 CORS，浏览器可直接请求
const API = 'https://jsonplaceholder.typicode.com'

// ============================================================
// 场景 A：GET 用户列表 —— 最基础的「拉数据」
// ============================================================

// ---------- fetch 写法（浏览器原生，不用安装）----------
async function fetchUserList_fetch() {
  // 第 1 步：发 GET 请求，await 等到「响应头」（还不是 JSON 数据）
  const res = await fetch(\`\${API}/users\`)
  // ★ fetch 最大坑：404/500 不会自动 throw，res.ok 为 false 时仍会继续执行
  if (!res.ok) {
    throw new Error(\`HTTP \${res.status}: \${res.statusText}\`)
  }
  // 第 2 步：再 await 一次，把响应 body 解析成 JS 对象/数组
  const data = await res.json()
  return data
}

// ---------- axios 写法（npm 库，项目里更常用）----------
import axios from 'axios'

async function fetchUserList_axios() {
  // axios.get 返回 { data, status, headers... }，解构出 data 就是业务数据
  const { data } = await axios.get(\`\${API}/users\`)
  // axios 自动解析 JSON；404/500 默认 reject，会进 catch，不用写 res.ok
  return data
}

// ============================================================
// 场景 B：GET 带查询参数 ?userId=1 —— 筛选某用户的文章
// ============================================================

async function fetchPostsByUser_fetch(userId) {
  // fetch 拼查询参数：用 URL + searchParams，比手动字符串拼接更安全
  const url = new URL(\`\${API}/posts\`)
  url.searchParams.set('userId', String(userId))
  const res = await fetch(url)
  if (!res.ok) throw new Error('请求失败')
  return res.json()
}

async function fetchPostsByUser_axios(userId) {
  // axios 用 params 对象，库会自动拼成 ?userId=1
  const { data } = await axios.get(\`\${API}/posts\`, {
    params: { userId },
  })
  return data
}

// ============================================================
// 场景 C：POST 创建文章 —— 往服务器「提交」数据
// ============================================================

async function createPost_fetch(title, body) {
  const res = await fetch(\`\${API}/posts\`, {
    method: 'POST', // 必须指定 POST，默认是 GET
    headers: { 'Content-Type': 'application/json' }, // ★ 告诉服务器 body 是 JSON
    body: JSON.stringify({ title, body, userId: 1 }), // ★ 对象要手动转成 JSON 字符串
  })
  if (!res.ok) throw new Error('创建失败')
  return res.json() // 返回服务器创建后的对象（含 id）
}

async function createPost_axios(title, body) {
  // axios.post(url, 数据对象) —— 自动 JSON 序列化 + 设置 Content-Type
  const { data } = await axios.post(\`\${API}/posts\`, {
    title,
    body,
    userId: 1,
  })
  return data
}

// ============================================================
// 场景 D：错误处理对比 —— 初学者最容易踩的坑
// ============================================================

async function demoErrors() {
  // fetch：404 不 throw，只有断网才会进 catch
  try {
    const res = await fetch(\`\${API}/users/99999\`)
    console.log('fetch res.ok', res.ok) // false，但代码仍会继续往下走
    // 如果不写 if (!res.ok)，后面 res.json() 可能解析到错误页 HTML
  } catch (e) {
    console.log('fetch 只有网络错误才到这')
  }

  // axios：404/500 默认 throw，和业务代码 try/catch 心智一致
  try {
    await axios.get(\`\${API}/users/99999\`)
  } catch (e) {
    console.log('axios 错误', e.response?.status) // 404
    console.log('axios message', e.message)
  }
}

// ============================================================
// 场景 E：取消请求 —— 用户快速切页时避免「幽灵 setState」
// ============================================================

function fetchWithCancel_fetch() {
  const controller = new AbortController()
  // signal 传给 fetch；组件卸载时调用 abort() 取消进行中的请求
  fetch(\`\${API}/users\`, { signal: controller.signal })
  return () => controller.abort() // 返回 cleanup 函数，给 useEffect 用
}

function fetchWithCancel_axios() {
  const controller = new AbortController()
  axios.get(\`\${API}/users\`, { signal: controller.signal })
  return () => controller.abort()
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：同一个「取用户列表」，fetch 写一遍、axios 写一遍，并排比代码量',
            body: `import { useState } from 'react' // 沙箱里没有后端，所有请求都用 setTimeout 造假数据

// 假数据：真实项目里这是后端返回的用户表
const USERS = [
  { id: 1, name: '小明', email: 'ming@example.com' },
  { id: 2, name: '小红', email: 'hong@example.com' },
]

// 模拟 fetch：注意它 resolve 出来的是「响应对象」，数据还包在里面
function fakeFetch() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,                           // fetch 用 ok 表示状态码是不是 2xx
        status: 200,
        json: () => Promise.resolve(USERS), // ★ 想拿数据还得再 await 一次
      })
    }, 600)                                 // 600ms 模拟网络耗时
  })
}

// 模拟 axios 实例：直接给你 { data }，JSON 已经帮你解析好
const axios = {
  get: () =>
    new Promise((resolve) => {
      setTimeout(() => resolve({ data: USERS, status: 200 }), 600)
    }),
}

export default function Demo() {
  const [fetchLog, setFetchLog] = useState('还没请求') // 左栏：fetch 写法的结果
  const [axiosLog, setAxiosLog] = useState('还没请求') // 右栏：axios 写法的结果

  // ---------- 写法 A：fetch，四步走 ----------
  async function runFetch() {
    setFetchLog('请求中...')                            // 请求前先给个反馈
    try {
      const res = await fakeFetch()                     // 真实项目：fetch(/api/users)
      if (!res.ok) throw new Error('HTTP ' + res.status) // ★ 必须自己检查，fetch 不会替你抛错
      const data = await res.json()                     // ★ 第二次 await 才拿到数组
      setFetchLog('成功：' + data.map((u) => u.name).join('、'))
    } catch (e) {
      setFetchLog('失败：' + e.message)                 // 只有断网这类网络错误才会到这
    }
  }

  // ---------- 写法 B：axios，一步到位 ----------
  async function runAxios() {
    setAxiosLog('请求中...')
    try {
      const { data } = await axios.get('/api/users')    // 真实项目：axios.get(/api/users)
      setAxiosLog('成功：' + data.map((u) => u.name).join('、'))
    } catch (e) {
      setAxiosLog('失败：' + e.message)                 // 4xx/5xx 会自动 reject 到这里
    }
  }

  // 两栏公共样式：抽出来避免重复写 style
  const box = { flex: 1, border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }
  const log = { background: '#f9fafb', padding: 8, marginTop: 8, fontSize: 12, minHeight: 34 }

  return (
    <div style={{ display: 'flex', gap: 12, fontSize: 14, flexWrap: 'wrap' }}>
      <div style={box}>
        <b>fetch（浏览器原生）</b>
        <p style={{ color: '#666', margin: '6px 0' }}>要检查 res.ok，还要两次 await</p>
        <button type="button" onClick={runFetch} style={{ padding: '6px 12px' }}>
          用 fetch 取列表
        </button>
        <pre style={log}>{fetchLog}</pre>
      </div>
      <div style={box}>
        <b>axios（第三方库）</b>
        <p style={{ color: '#666', margin: '6px 0' }}>自动解析 JSON，错误自动进 catch</p>
        <button type="button" onClick={runAxios} style={{ padding: '6px 12px' }}>
          用 axios 取列表
        </button>
        <pre style={log}>{axiosLog}</pre>
      </div>
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：fetch 最大的坑——404/500 不进 catch，看错误页被当成数据渲染',
            body: `import { useState } from 'react' // 沙箱里没有后端，四种服务端结果全部用 setTimeout 模拟

// 可切换的四种「服务端结果」：真实项目里由后端决定，这里让你自己点
const CASES = [
  { key: '200', label: '返回 200 正常' },
  { key: '404', label: '返回 404 找不到' },
  { key: '500', label: '返回 500 服务器错误' },
  { key: 'offline', label: '网络断了' },
]

// 模拟 fetch 的真实行为：只有网络层失败才 reject，404/500 一律 resolve
function fakeFetch(kind) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (kind === 'offline') {
        reject(new TypeError('Failed to fetch')) // ★ 只有断网/跨域这类问题才 reject
        return
      }
      if (kind === '200') {
        resolve({ ok: true, status: 200, json: () => Promise.resolve([{ id: 1, name: '小明' }]) })
        return
      }
      // ★ 关键：404 / 500 也是 resolve！fetch 认为「服务器答话了 = 请求成功」
      resolve({
        ok: false,
        status: Number(kind),
        json: () => Promise.resolve({ error: kind === '404' ? 'Not Found' : 'Server Error' }),
      })
    }, 400)
  })
}

export default function Demo() {
  const [kind, setKind] = useState('404')     // 当前选中的服务端结果
  const [bad, setBad] = useState('还没请求')  // 错误写法的输出
  const [good, setGood] = useState('还没请求') // 正确写法的输出

  async function run() {
    setBad('请求中...')
    setGood('请求中...')

    // ---------- 错误写法：不检查 res.ok，直接把 body 当数据用 ----------
    try {
      const res = await fakeFetch(kind)                    // 真实项目：fetch(/api/users)
      const data = await res.json()                        // 404 时这里拿到的是错误对象
      setBad('渲染出来的「数据」：' + JSON.stringify(data)) // ★ 错误页就这样被当成列表渲染了
    } catch (e) {
      setBad('进了 catch：' + e.message)                   // 只有断网才会走到这
    }

    // ---------- 正确写法：先看 res.ok，不对就自己 throw ----------
    try {
      const res = await fakeFetch(kind)
      if (!res.ok) throw new Error('请求失败：HTTP ' + res.status) // ★ 这一行是必需的
      const data = await res.json()
      setGood('成功：' + JSON.stringify(data))
    } catch (e) {
      setGood('正确地进了 catch：' + e.message)            // 404/500/断网都能被拦住
    }
  }

  const log = { background: '#f9fafb', padding: 8, fontSize: 12, minHeight: 34, whiteSpace: 'pre-wrap' }

  return (
    <div style={{ fontSize: 14 }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {CASES.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setKind(c.key)}                 // 切换要模拟的服务端结果
            style={{
              padding: '6px 10px',
              border: '1px solid ' + (kind === c.key ? '#2563eb' : '#e5e7eb'), // 选中态高亮
              background: kind === c.key ? '#eff6ff' : '#fff',
              borderRadius: 6,
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <button type="button" onClick={run} style={{ padding: '6px 14px', marginBottom: 10 }}>
        用这个结果发一次请求
      </button>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, border: '1px solid #fecaca', borderRadius: 8, padding: 10 }}>
          <b style={{ color: '#b91c1c' }}>❌ 不写 if (!res.ok)</b>
          <pre style={log}>{bad}</pre>
        </div>
        <div style={{ flex: 1, border: '1px solid #bbf7d0', borderRadius: 8, padding: 10 }}>
          <b style={{ color: '#15803d' }}>✅ 写了 if (!res.ok)</b>
          <pre style={log}>{good}</pre>
        </div>
      </div>
    </div>
  )
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

// 公开练手 API，支持跨域（CORS）
const API = 'https://jsonplaceholder.typicode.com'

function UserListPage() {
  // ===== 三态 state：任何「拉数据」页面都建议这样声明 =====
  const [list, setList] = useState([])       // data：成功拿到的列表
  const [loading, setLoading] = useState(true) // loading：初始 true，一进来就显示加载中
  const [error, setError] = useState('')     // error：失败时的错误文案

  useEffect(() => {
    // AbortController：组件卸载或依赖变化时取消未完成的请求
    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)  // 请求前：打开 loading，清空上次错误
        setError('')

        const res = await fetch(\`\${API}/users\`, {
          signal: controller.signal, // 绑定取消信号
        })

        // fetch 必须手动判断 HTTP 状态码
        if (!res.ok) {
          throw new Error(\`请求失败：HTTP \${res.status}\`)
        }

        const data = await res.json()
        setList(data) // 成功：写入 data state
      } catch (e) {
        // 用户切走页面导致的取消，不算业务错误，直接 return
        if (e.name === 'AbortError') return
        setError(e.message || '未知错误')
        setList([]) // 失败时清空列表，避免显示旧数据
      } finally {
        setLoading(false) // ★ 无论成功失败都要关 loading（别只写在 try 里）
      }
    }

    load()

    // cleanup：下次 effect 执行前或组件卸载时取消请求
    return () => controller.abort()
  }, []) // 空依赖 []：只在组件挂载时请求一次

  // ===== 三态渲染：顺序固定 loading → error → 正常 UI =====
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

  // 成功态：map 渲染列表，key 用稳定 id
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
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：三态模板跑一遍——骨架屏 → 列表 / 错误 + 重试，带「让请求失败」开关',
            body: `import { useState } from 'react' // 沙箱没有后端，请求用 setTimeout 模拟

// 模拟接口：真实项目里这一行是 axios.get(/api/users)
function loadUsers(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('请求失败：HTTP 500')) // 打开开关时固定失败，方便你看错误态
        return
      }
      resolve([
        { id: 1, name: '小明', email: 'ming@example.com' },
        { id: 2, name: '小红', email: 'hong@example.com' },
        { id: 3, name: '小刚', email: 'gang@example.com' },
      ])
    }, 900) // 900ms 让你看清 loading 骨架
  })
}

export default function Demo() {
  const [list, setList] = useState([])          // data：成功拿到的列表
  const [loading, setLoading] = useState(false) // loading：请求进行中
  const [error, setError] = useState('')        // error：失败文案
  const [fail, setFail] = useState(false)       // 「让请求失败」开关

  async function load() {
    try {
      setLoading(true)           // 第 1 步：打开 loading
      setError('')               // 第 2 步：清空上次的错误，重试时才不会残留
      const data = await loadUsers(fail)
      setList(data)              // 第 3 步：成功写入 data
    } catch (e) {
      setError(e.message)        // 失败写入 error
      setList([])                // 顺手清空旧数据，避免「报错了还显示老列表」
    } finally {
      setLoading(false)          // ★ 无论成败都要关 loading，写在 finally 里最稳
    }
  }

  // 骨架屏：几个灰条，比「加载中...」三个字体验好得多
  const skeleton = { height: 14, background: '#e5e7eb', borderRadius: 4, marginBottom: 8 }

  return (
    <div style={{ fontSize: 14 }}>
      <label style={{ display: 'block', marginBottom: 8 }}>
        <input type="checkbox" checked={fail} onChange={(e) => setFail(e.target.checked)} />
        {' '}让这次请求失败（勾上再点加载，看错误态）
      </label>

      <button type="button" onClick={load} disabled={loading} style={{ padding: '6px 14px' }}>
        {loading ? '加载中...' : '加载用户列表'} {/* 按钮自身也反映 loading，防止重复点击 */}
      </button>

      <div style={{ marginTop: 12, border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
        {/* ★ 渲染顺序固定：loading → error → 空态 → 数据 */}
        {loading ? (
          <div>
            <div style={skeleton} />
            <div style={{ ...skeleton, width: '80%' }} />
            <div style={{ ...skeleton, width: '60%' }} />
          </div>
        ) : error ? (
          <div>
            <p style={{ color: 'crimson', margin: 0 }}>加载失败：{error}</p>
            <button type="button" onClick={load} style={{ marginTop: 8, padding: '4px 10px' }}>
              重试 {/* 重试就是再调一次同一个 load，不用刷新整页 */}
            </button>
          </div>
        ) : list.length === 0 ? (
          <p style={{ color: '#9ca3af', margin: 0 }}>还没有数据，点上面的按钮加载</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {list.map((u) => (
              <li key={u.id}>{u.name} — {u.email}</li> // key 用稳定 id，不要用下标
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: '完整可抄 demo：fetch 详情页（依赖 id 重新请求）',
            language: 'jsx',
            body: `import { useEffect, useState } from 'react'

// 详情页：从路由 params 拿到 userId，拉单个用户
function UserDetailPage({ userId }) {
  const [user, setUser] = useState(null)   // 单条详情，初始 null
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!userId) return // 没有 id 时不发请求

    const controller = new AbortController()

    async function load() {
      try {
        setLoading(true)
        setError('')
        setUser(null) // ★ 切换用户时先清空，避免短暂显示上一个用户

        // URL 里拼 userId：/users/1、/users/2 ...
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
  }, [userId]) // ★ 依赖 userId：从列表点进不同用户时会重新请求

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

// POST 表单：提交时用 submitting 态，不要用整页 loading 盖住表单
function CreatePostForm() {
  const [title, setTitle] = useState('')   // 受控输入：标题
  const [body, setBody] = useState('')     // 受控输入：正文
  const [submitting, setSubmitting] = useState(false) // 提交中，禁用按钮防重复点
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(null) // 成功后存服务器返回的对象

  async function handleSubmit(e) {
    e.preventDefault() // 阻止浏览器默认刷新整页
    if (!title.trim()) {
      setError('标题不能为空')
      return
    }

    setSubmitting(true)
    setError('')
    setSuccess(null)

    try {
      // fetch POST：method + headers + JSON.stringify 三件套
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          userId: 1, // 练手 API 要求带 userId
        }),
      })

      if (!res.ok) throw new Error('提交失败')
      const data = await res.json()
      setSuccess(data) // 显示返回的 id 等字段
      setTitle('')     // 成功后清空表单
      setBody('')
    } catch (e) {
      setError(e.message)
    } finally {
      setSubmitting(false) // 无论成败都恢复按钮
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
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：竞态 bug——快速切 tab，慢请求后到会覆盖新数据；打开开关修好它',
            body: `import { useState, useRef } from 'react' // useRef 存「最新一次请求的编号」，改它不会触发重渲染

// 两个 tab：文章慢（1500ms），评论快（300ms）——先点文章再点评论，就能复现竞态
const TABS = [
  { key: 'posts', label: '文章（慢，1.5 秒）', delay: 1500, data: '文章列表：React 入门 / Hooks 详解' },
  { key: 'comments', label: '评论（快，0.3 秒）', delay: 300, data: '评论列表：写得不错 / 求更新' },
]

// 模拟接口：真实项目里这是 axios.get(/api/ + tab.key)
function loadTab(tab) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(tab.data), tab.delay) // 不同 tab 耗时不同，这是竞态的根源
  })
}

export default function Demo() {
  const [fixed, setFixed] = useState(false)   // 是否启用「忽略过期响应」修复
  const [active, setActive] = useState('')    // 用户当前选中的 tab（界面高亮用）
  const [content, setContent] = useState('还没请求') // 实际渲染出来的内容
  const [logs, setLogs] = useState([])        // 请求流水日志，方便你看谁先谁后
  const reqId = useRef(0)                     // ★ 请求编号：每发一次 +1，只认最新那个

  function addLog(text) {
    setLogs((prev) => [...prev, text].slice(-6)) // 只留最近 6 条，界面不会越堆越长
  }

  async function clickTab(tab) {
    const myId = reqId.current + 1 // 本次请求的编号
    reqId.current = myId           // 记录「最新请求」是我
    setActive(tab.key)
    setContent('加载中...')
    addLog('发出 → ' + tab.label)

    const data = await loadTab(tab)

    // ★ 修复的关键：回来时先问一句「我还是最新的那次请求吗？」
    if (fixed && myId !== reqId.current) {
      addLog('丢弃 ← ' + tab.label + '（已过期）') // 过期响应直接扔掉，不写 state
      return
    }

    setContent(data)
    addLog('渲染 ← ' + tab.label)
  }

  return (
    <div style={{ fontSize: 14 }}>
      <label style={{ display: 'block', marginBottom: 8 }}>
        <input type="checkbox" checked={fixed} onChange={(e) => setFixed(e.target.checked)} />
        {' '}启用修复：忽略过期响应（真实项目里也可以用 AbortController 直接取消请求）
      </label>

      <p style={{ color: '#666', margin: '0 0 8px' }}>
        玩法：先点「文章」，立刻再点「评论」。不修复时，慢的文章后到会把评论盖掉。
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => clickTab(t)}
            style={{
              padding: '6px 10px',
              borderRadius: 6,
              border: '1px solid ' + (active === t.key ? '#2563eb' : '#e5e7eb'),
              background: active === t.key ? '#eff6ff' : '#fff',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 期望：这里显示的内容应该始终等于你最后点的那个 tab */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
        <b>当前渲染内容：</b>{content}
      </div>

      <pre style={{ background: '#f9fafb', padding: 8, fontSize: 12, marginTop: 8 }}>
        {logs.join('\\n') || '（请求日志会出现在这里）'}
      </pre>
    </div>
  )
}`,
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
 * axios 实例 —— 商业 React 项目的标准封装
 *
 * 为什么要封装？
 * - baseURL 改一次，全项目生效
 * - 拦截器统一加 token、统一剥 response.data
 *
 * 用法：
 *   import http from '../utils/request'
 *   const users = await http.get('/users')
 *   await http.post('/posts', { title: 'hi' })
 */

// axios.create 创建独立实例，不影响全局 axios
const http = axios.create({
  // 所有相对路径请求都会自动加此前缀
  // 开发配 proxy 时可留空或 '/api'，见 package.json
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000, // 10 秒无响应则 reject，避免一直 loading
  headers: {
    'Content-Type': 'application/json', // 默认发 JSON
  },
})

// ========== 请求拦截：每个请求「发出去之前」执行 ==========
http.interceptors.request.use(
  (config) => {
    // 从 localStorage 读登录 token（真实项目登录成功后写入）
    const token = localStorage.getItem('token')
    if (token) {
      // 后端约定：Authorization: Bearer <token>
      config.headers.Authorization = \`Bearer \${token}\`
    }
    return config // 必须 return，否则请求发不出去
  },
  (error) => Promise.reject(error)
)

// ========== 响应拦截：每个响应「回来之后」执行 ==========
http.interceptors.response.use(
  // 成功（2xx）：直接 return response.data，组件里不用再 .data
  (response) => response.data,
  (error) => {
    // 用户主动取消的请求，原样 reject
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }

    const status = error.response?.status
    const message =
      error.response?.data?.message ||
      error.message ||
      '网络异常，请稍后重试'

    // 401 = 未登录或 token 过期
    if (status === 401) {
      console.warn('未登录或登录已过期')
      // 真实项目：清 token + 跳登录页
      // localStorage.removeItem('token'); navigate('/login')
    }

    // 统一包装成 Error，组件 catch 里 e.message 即可
    return Promise.reject(new Error(message))
  }
)

export default http
export { axios } // 需要 isCancel 等工具时可一并导出`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：手写一个迷你 axios——create + 双拦截器，看清执行顺序',
            body: `import { useState } from 'react' // 沙箱里没有 axios 也没有后端，两样都手写模拟

// ========== 迷你 axios：真实的 axios 核心也就是这套「请求前/响应后」的钩子 ==========
function createClient(config, log) {
  const reqHooks = []  // 请求拦截器队列
  const resHooks = []  // 响应拦截器队列

  return {
    interceptors: {
      request: { use: (fn) => reqHooks.push(fn) },   // 注册请求拦截器
      response: { use: (fn) => resHooks.push(fn) },  // 注册响应拦截器
    },
    async get(url) {
      // 第 1 步：组装配置，baseURL 在这里拼上，组件里只写相对路径
      let cfg = { url: config.baseURL + url, headers: {} }
      log('① 组件调用 http.get(' + url + ')')

      // 第 2 步：依次跑请求拦截器（加 token 就发生在这一步）
      for (const fn of reqHooks) cfg = fn(cfg)

      // 第 3 步：真正发请求。真实项目里是 XMLHttpRequest，这里用 setTimeout 假装
      log('③ 真正发出：' + cfg.url + '，Header=' + JSON.stringify(cfg.headers))
      const response = await new Promise((resolve) => {
        setTimeout(() => resolve({ status: 200, data: [{ id: 1, name: '小明' }] }), 500)
      })

      // 第 4 步：依次跑响应拦截器（剥 data 就发生在这一步）
      let result = response
      for (const fn of resHooks) result = fn(result)
      return result // 返回给组件的，是被拦截器处理过的结果
    },
  }
}

export default function Demo() {
  const [logs, setLogs] = useState([])         // 执行顺序日志
  const [result, setResult] = useState('')     // 组件最终 await 到的东西
  const [token, setToken] = useState('')       // 假的登录 token

  async function run() {
    const lines = []
    const log = (t) => lines.push(t)           // 收集日志，跑完一次性 setState

    // 和 request.js 一样：create 出实例 → 注册两个拦截器
    const http = createClient({ baseURL: 'https://api.example.com' }, log)

    http.interceptors.request.use((cfg) => {
      log('② 请求拦截器：' + (token ? '带上 Authorization' : '没有 token，跳过'))
      if (token) cfg.headers.Authorization = 'Bearer ' + token // 统一加登录凭证
      return cfg                                                // ★ 必须 return，否则请求发不出去
    })

    http.interceptors.response.use((res) => {
      log('④ 响应拦截器：剥掉外层，只把 res.data 交给组件')
      return res.data                                           // ★ 组件里就不用再写 .data 了
    })

    const data = await http.get('/users')
    log('⑤ 组件拿到：' + JSON.stringify(data))
    setLogs(lines)
    setResult(JSON.stringify(data))
  }

  return (
    <div style={{ fontSize: 14 }}>
      <label style={{ display: 'block', marginBottom: 8 }}>
        假 token：
        <input
          value={token}
          onChange={(e) => setToken(e.target.value)} // 留空 = 未登录，填任意字符 = 已登录
          placeholder="留空表示未登录"
          style={{ marginLeft: 6, padding: '4px 8px' }}
        />
      </label>

      <button type="button" onClick={run} style={{ padding: '6px 14px' }}>
        发一次 http.get(/users)
      </button>

      <pre style={{ background: '#f9fafb', padding: 10, fontSize: 12, marginTop: 10 }}>
        {logs.length ? logs.join('\\n') : '（点按钮看拦截器的执行顺序）'}
      </pre>

      {result && (
        <p style={{ color: '#15803d', margin: 0 }}>
          组件里 await 到的已经是业务数据：{result}
        </p>
      )}
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：拦截器统一处理错误——401 踢回登录、403 无权限、500 弹提示',
            body: `import { useState } from 'react' // 沙箱里没有后端，各种状态码都用 setTimeout 模拟

// 下拉可选的状态码：真实项目里由后端返回，这里让你手动挑
const STATUS_LIST = [200, 401, 403, 500]

// 模拟一次请求：真实项目里这是 axios 实例发出的请求
function fakeRequest(status) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status === 200) {
        resolve({ status, data: { name: '小明' } })
        return
      }
      // axios 的行为：非 2xx 一律 reject，错误对象里带着 response
      reject({ response: { status, data: { message: '服务端返回 ' + status } } })
    }, 400)
  })
}

export default function Demo() {
  const [status, setStatus] = useState(401) // 想模拟哪个状态码
  const [page, setPage] = useState('用户列表页') // 假的当前页面，用来演示 401 跳登录
  const [toast, setToast] = useState('')    // 全局提示条
  const [logs, setLogs] = useState([])      // 拦截器做了什么

  async function run() {
    const lines = []
    setToast('')
    try {
      const res = await fakeRequest(status)
      lines.push('响应拦截器（成功分支）：return res.data')
      lines.push('组件拿到：' + JSON.stringify(res.data))
    } catch (err) {
      // ===== 这一整段在真实项目里写在响应拦截器的失败分支，全项目只写一次 =====
      const code = err.response?.status
      const message = err.response?.data?.message || '网络异常，请稍后重试'

      if (code === 401) {
        lines.push('401：token 无效 → 清掉 token，跳登录页')
        setPage('登录页')                    // 真实项目：navigate(/login)
        setToast('登录已过期，请重新登录')
      } else if (code === 403) {
        lines.push('403：登录了但没权限 → 只提示，不跳登录')
        setToast('你没有权限访问这个资源')    // 403 千万别跳登录，否则用户会反复登录
      } else if (code >= 500) {
        lines.push('500：服务端出错 → 弹提示，可上报监控')
        setToast('服务器开小差了：' + message)
      }
      lines.push('组件的 catch 里只需要写 e.message，脏活拦截器全包了')
    }
    setLogs(lines)
  }

  return (
    <div style={{ fontSize: 14 }}>
      <div style={{ marginBottom: 8 }}>
        让服务端返回：
        <select
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))} // select 的 value 是字符串，要转数字
          style={{ margin: '0 8px', padding: '4px 8px' }}
        >
          {STATUS_LIST.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button type="button" onClick={run} style={{ padding: '4px 12px' }}>发请求</button>
      </div>

      <p style={{ margin: '0 0 8px' }}>
        当前页面：<b>{page}</b>
        {page === '登录页' && (
          <button
            type="button"
            onClick={() => setPage('用户列表页')} // 假装重新登录成功
            style={{ marginLeft: 8, padding: '2px 8px' }}
          >
            重新登录
          </button>
        )}
      </p>

      {toast && (
        <div style={{ background: '#fef2f2', color: '#b91c1c', padding: 8, borderRadius: 6, marginBottom: 8 }}>
          {toast} {/* 真实项目里这是 antd 的 message.error 或全局 Toast */}
        </div>
      )}

      <pre style={{ background: '#f9fafb', padding: 10, fontSize: 12 }}>
        {logs.length ? logs.join('\\n') : '（选一个状态码，点发请求）'}
      </pre>
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: '完整可抄 demo：组件里用 http 拉列表',
            language: 'jsx',
            body: `import { useEffect, useState } from 'react'
import http from '../../utils/request' // 路径按你的项目结构调整

// 组件里用封装好的 http —— 三态模板和 fetch 版完全一样，只改请求那一行
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

        // ★ 拦截器已 return response.data，await 到的就是用户数组
        // 写相对路径 '/users'，baseURL 在 request.js 里统一配置
        const data = await http.get('/users', {
          signal: controller.signal,
        })
        setList(data)
      } catch (e) {
        // axios 取消：CanceledError 或 ERR_CANCELED（和 fetch 的 AbortError 不同）
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

// 演示：登录存 token → 后续 http 请求自动带 Authorization
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
      // 练手：jsonplaceholder 没有真登录接口，这里用 setTimeout 模拟
      // 真实项目：const { token } = await http.post('/login', { account, password })
      await new Promise((r) => setTimeout(r, 500))
      const fakeToken = 'demo-token-' + Date.now()
      // 写入 localStorage，request.js 请求拦截器会读并加到 Header
      localStorage.setItem('token', fakeToken)

      navigate('/', { replace: true }) // 登录成功跳首页
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreatePost() {
    try {
      // 登录后点这个：拦截器自动带 Bearer token（可在 Network 面板看 Header）
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

// ========== axios / http 常用 REST 写法速查 ==========

// GET + 查询参数 → 实际请求 /users?page=1&keyword=react
const users = await http.get('/users', {
  params: { page: 1, keyword: 'react' },
})

// POST：第二个参数是 JSON body，不用 JSON.stringify
const post = await http.post('/posts', { title: '标题', body: '内容' })

// PUT 全量替换 / PATCH 部分更新 / DELETE 删除
await http.put('/users/1', { name: '小明' })       // 整条替换 id=1
await http.patch('/users/1', { name: '小明' })     // 只改 name 字段
await http.delete('/users/1')

// 上传文件：用 FormData，Content-Type 让浏览器自动带 boundary
const form = new FormData()
form.append('file', file)
await http.post('/upload', form, {
  headers: { 'Content-Type': 'multipart/form-data' },
})

// 并发多个请求：等全部完成再一起拿结果
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

// 过滤选项：全部 / 未完成 / 已完成
const FILTERS = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '未完成' },
  { key: 'done', label: '已完成' },
]

const STORAGE_KEY = 'react-demo-todos' // localStorage 键名，全项目统一

function TodoApp() {
  // ===== state：Todo 入门毕业考的核心三块 =====
  const [todos, setTodos] = useState(() => {
    // 懒初始化：只在首次渲染读 localStorage，刷新不丢数据
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return [] // JSON 损坏时兜底空数组
    }
  })
  const [text, setText] = useState('')       // 输入框受控值
  const [filter, setFilter] = useState('all') // 当前筛选：all | active | done

  // ===== 持久化：todos 变化就写回 localStorage =====
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // ===== 派生数据：用 useMemo 从 todos 算出「要显示的列表」=====
  // 不要复制第二份 todos state，filter 只是视图条件
  const visibleTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.done)
    if (filter === 'done') return todos.filter((t) => t.done)
    return todos
  }, [todos, filter])

  const activeCount = useMemo(
    () => todos.filter((t) => !t.done).length,
    [todos]
  )

  // ===== CRUD 操作：全部用不可变更新（map/filter/spread）=====
  function addTodo() {
    const value = text.trim()
    if (!value) return // 空输入直接忽略
    setTodos((prev) => [
      ...prev, // 展开旧数组
      { id: Date.now(), text: value, done: false }, // id 用时间戳，别用 index
    ])
    setText('') // 清空输入框
  }

  function toggleTodo(id) {
    // map 找到对应项，复制对象并翻转 done
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
    if (e.key === 'Enter') addTodo() // 回车快捷添加
  }

  // ===== 渲染 =====
  return (
    <div className="TodoApp">
      <h1 className="TodoApp-title">Todo List</h1>
      <p className="TodoApp-desc">入门串联练习：state、列表、过滤、持久化</p>

      {/* 输入区：受控 input + 按钮 */}
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

      {/* 过滤按钮 + 统计条数 */}
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

      {/* 列表：空态 vs 有数据 */}
      {visibleTodos.length === 0 ? (
        <p className="TodoApp-empty">
          {filter === 'all' ? '还没有待办，添加一条吧' : '当前筛选下没有条目'}
        </p>
      ) : (
        <ul className="TodoApp-list">
          {visibleTodos.map((todo) => (
            <li key={todo.id} className="TodoApp-item">
              <label className="TodoApp-itemLabel">
                {/* 受控 checkbox：checked + onChange，不用 defaultChecked */}
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

      {/* 有已完成项时才显示「清除已完成」 */}
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
            body: `/* Todo 应用根容器：居中、限制最大宽度 */
.TodoApp {
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

/* 输入行：flex 让输入框占满剩余空间 */
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

/* 工具栏：过滤按钮 + 统计文字左右分布 */
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

/* 当前选中的过滤按钮高亮 */
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

/* 每条 todo：checkbox + 文字 + 删除按钮 */
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

/* 已完成：删除线 + 灰色 */
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
            body: `// 进阶思路：本地 Todo 练熟后，把 CRUD 换成 http + json-server
// 拆成 TodoInput / TodoItem / TodoFilter 三个子组件
// 父组件 TodoPage 拥有 todos state，通过 props + 回调传给子组件（见「组件通信」那一章）

import http from '../utils/request'

function TodoPageRemote() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  // 挂载时从 json-server 拉列表：GET /todos
  useEffect(() => {
    http.get('/todos').then(setTodos).finally(() => setLoading(false))
  }, [])

  // 新增：POST 成功后把服务器返回的对象（含 id）追加到 state
  async function addTodo(text) {
    const created = await http.post('/todos', { text, done: false })
    setTodos((prev) => [...prev, created])
  }

  // 切换完成：PATCH 部分更新 + 本地 state 同步
  async function toggleTodo(id, done) {
    await http.patch(\`/todos/\${id}\`, { done: !done })
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !done } : t))
    )
  }

  // 删除：DELETE 后 filter 掉本地项
  async function removeTodo(id) {
    await http.delete(\`/todos/\${id}\`)
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  if (loading) return <p>加载中...</p>
  // ... 其余 UI 和本地版 TodoApp 相同，只是操作函数换成上面的 async 版
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：Todolist 接「模拟接口」——增删改查各有 loading，失败能重试',
            body: `import { useState, useEffect } from 'react' // 沙箱没有后端，接口层用 setTimeout 模拟

// ========== 假后端：一份放在内存里的 todos，模拟 json-server ==========
let db = [
  { id: 1, text: '学会三态模板', done: true },
  { id: 2, text: '搞懂 axios 拦截器', done: false },
]
let nextId = 3

// 统一的假请求：真实项目里这四个函数就是 http.get / post / patch / delete
function api(action, payload, shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(action + ' 失败：HTTP 500'))
        return
      }
      if (action === 'list') resolve([...db])                                  // GET /todos
      if (action === 'add') {
        const item = { id: nextId++, text: payload.text, done: false }
        db = [...db, item]
        resolve(item)                                                          // POST /todos
      }
      if (action === 'toggle') {
        db = db.map((t) => (t.id === payload.id ? { ...t, done: !t.done } : t))
        resolve(db.find((t) => t.id === payload.id))                           // PATCH /todos/:id
      }
      if (action === 'remove') {
        db = db.filter((t) => t.id !== payload.id)
        resolve(true)                                                          // DELETE /todos/:id
      }
    }, 700)
  })
}

export default function Demo() {
  const [todos, setTodos] = useState([])       // 列表数据
  const [listLoading, setListLoading] = useState(true) // 整页加载态
  const [busyId, setBusyId] = useState(null)   // ★ 哪一行正在请求：单行 loading 靠它
  const [adding, setAdding] = useState(false)  // 新增按钮的 loading
  const [text, setText] = useState('')
  const [error, setError] = useState('')       // 最近一次失败的提示
  const [fail, setFail] = useState(false)      // 「让请求失败」开关

  async function loadList() {
    try {
      setListLoading(true)
      setError('')
      setTodos(await api('list'))              // 列表接口不受失败开关影响，方便你继续操作
    } finally {
      setListLoading(false)
    }
  }

  useEffect(() => { loadList() }, [])          // 挂载时拉一次列表

  async function handleAdd() {
    if (!text.trim()) return                   // 空输入直接忽略
    setAdding(true)
    setError('')
    try {
      const created = await api('add', { text: text.trim() }, fail)
      setTodos((prev) => [...prev, created])   // 用服务端返回的对象（带真实 id）入列
      setText('')
    } catch (e) {
      setError(e.message + '（内容还在输入框里，可以直接重试）') // 失败不清空输入，用户不用重打
    } finally {
      setAdding(false)
    }
  }

  async function handleToggle(id) {
    setBusyId(id)                              // 只锁这一行，其它行还能点
    setError('')
    try {
      const updated = await api('toggle', { id }, fail)
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t))) // 用服务端结果覆盖本地
    } catch (e) {
      setError(e.message)
    } finally {
      setBusyId(null)
    }
  }

  async function handleRemove(id) {
    setBusyId(id)
    setError('')
    try {
      await api('remove', { id }, fail)
      setTodos((prev) => prev.filter((t) => t.id !== id))
    } catch (e) {
      setError(e.message)
    } finally {
      setBusyId(null)
    }
  }

  if (listLoading) return <p style={{ fontSize: 14 }}>列表加载中...</p>

  return (
    <div style={{ fontSize: 14, maxWidth: 460 }}>
      <label style={{ display: 'block', marginBottom: 8 }}>
        <input type="checkbox" checked={fail} onChange={(e) => setFail(e.target.checked)} />
        {' '}让写操作（增/改/删）失败
      </label>

      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入待办"
          style={{ flex: 1, padding: '6px 10px' }}
        />
        <button type="button" onClick={handleAdd} disabled={adding} style={{ padding: '6px 12px' }}>
          {adding ? '提交中...' : '添加'} {/* 提交中禁用按钮，防止连点提交两条 */}
        </button>
      </div>

      {error && (
        <p style={{ color: 'crimson', margin: '0 0 8px' }}>
          {error}
          <button type="button" onClick={loadList} style={{ marginLeft: 8, padding: '2px 8px' }}>
            刷新列表
          </button>
        </p>
      )}

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {todos.map((t) => (
          <li key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0' }}>
            <input
              type="checkbox"
              checked={t.done}
              disabled={busyId === t.id}          // 这一行请求中就禁用，避免重复提交
              onChange={() => handleToggle(t.id)}
            />
            <span style={{ flex: 1, textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>
            {busyId === t.id && <span style={{ color: '#9ca3af' }}>处理中...</span>}
            <button type="button" onClick={() => handleRemove(t.id)} disabled={busyId === t.id}>
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：乐观更新——先改界面再发请求，失败自动回滚',
            body: `import { useState } from 'react' // 沙箱没有后端，请求用 setTimeout 模拟

// 模拟「保存完成状态」接口：真实项目里是 axios.patch(/api/todos/1)
function saveDone(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error('保存失败'))
      else resolve(true)
    }, 1200) // 故意慢一点，好看清「先改界面」和「后收到结果」的时间差
  })
}

const INIT = [
  { id: 1, text: '喝水', done: false },
  { id: 2, text: '写代码', done: false },
]

export default function Demo() {
  const [todos, setTodos] = useState(INIT)
  const [fail, setFail] = useState(false)       // 「让请求失败」开关
  const [optimistic, setOptimistic] = useState(true) // 切换：乐观更新 vs 老实等接口
  const [tip, setTip] = useState('')            // 提示条
  const [pending, setPending] = useState(false) // 老实模式下的等待态

  async function toggle(id) {
    const before = todos                         // ★ 先把旧数据存下来，失败时用它回滚
    setTip('')

    if (optimistic) {
      // ===== 乐观更新：假设一定会成功，立刻改界面，用户感觉「秒响应」=====
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
      try {
        await saveDone(fail)
        setTip('保存成功（界面早就变了，用户全程无感）')
      } catch (e) {
        setTodos(before)                         // ★ 回滚：把界面恢复成请求前的样子
        setTip(e.message + '，已自动回滚到修改前')
      }
      return
    }

    // ===== 保守写法：等接口回来再改界面，用户要盯着 loading 等 1.2 秒 =====
    setPending(true)
    try {
      await saveDone(fail)
      setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
      setTip('保存成功（等了 1.2 秒界面才动）')
    } catch (e) {
      setTip(e.message + '（界面本来就没动，不用回滚）')
    } finally {
      setPending(false)
    }
  }

  return (
    <div style={{ fontSize: 14, maxWidth: 420 }}>
      <label style={{ display: 'block' }}>
        <input type="checkbox" checked={optimistic} onChange={(e) => setOptimistic(e.target.checked)} />
        {' '}使用乐观更新（关掉对比保守写法）
      </label>
      <label style={{ display: 'block', marginBottom: 8 }}>
        <input type="checkbox" checked={fail} onChange={(e) => setFail(e.target.checked)} />
        {' '}让保存请求失败（看回滚效果）
      </label>

      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 8px' }}>
        {todos.map((t) => (
          <li key={t.id} style={{ padding: '4px 0' }}>
            <label>
              <input
                type="checkbox"
                checked={t.done}
                disabled={pending}              // 保守模式下请求期间禁用，避免状态错乱
                onChange={() => toggle(t.id)}
              />
              {' '}
              <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>
            </label>
          </li>
        ))}
      </ul>

      {pending && <p style={{ color: '#9ca3af', margin: 0 }}>保存中，请稍候...</p>}
      {tip && <p style={{ margin: 0, color: fail ? 'crimson' : '#15803d' }}>{tip}</p>}
    </div>
  )
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
            body: `# json-server：本地假 REST API，零后端练 CRUD
# -D 表示装到 devDependencies，打包上线不会带上

npm install -D json-server

# 装好后 package.json 里加 scripts（见下文），用 npm run server 启动`,
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

# ========== json-server 规则（db.json 放项目根目录）==========
# 每个顶层「键名」= 一个 REST 资源，自动生成 CRUD 接口：
#   users  → GET/POST /users，GET/PATCH/DELETE /users/:id
#   posts  → /posts
#   todos  → /todos（和 Todo 进阶版联调用）
# 数组每项建议有 id；POST 新增可不传 id，json-server 自动递增`,
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
            body: `# ========== 方式 A：两个终端（推荐初学，过程看得清楚）==========

# 终端 1：启动 json-server mock API（默认 3001 端口）
# --watch：改 db.json 后自动重载，不用重启
npm run server

# 终端 2：启动 React 开发服务器（默认 3000 端口）
npm start

# ========== 方式 B：一条命令同时启动（package.json 已配 concurrently）==========
npm run start:all

# ========== 验证 mock 是否正常 ==========
# 浏览器直接打开下面地址，应看到 JSON 数组：
# http://localhost:3001/users`,
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

// json-server 联调完整 Demo：GET 列表 + POST/PATCH/DELETE CRUD
function UserPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // GET：查全部用户 —— 配合三态模板
  async function loadUsers() {
    try {
      setLoading(true)
      setError('')
      // 相对路径 /users：开发时走 proxy 转发到 localhost:3001
      const data = await http.get('/users')
      setUsers(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers() // 挂载时拉一次列表
  }, [])

  // POST：新增用户 —— body 是 JSON 对象，json-server 自动分配 id
  async function addUser() {
    await http.post('/users', {
      name: '新用户',
      email: 'new@example.com',
      role: 'user',
    })
    loadUsers() // ★ 增删改后要重新拉列表（或乐观更新 state）
  }

  // PATCH：只改部分字段，比 PUT 整条替换更常用
  async function toggleRole(id) {
    await http.patch(\`/users/\${id}\`, { role: 'admin' })
    loadUsers()
  }

  // DELETE：按 id 删除
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
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：迷你 json-server——左边看你发的请求，右边看服务端返回',
            body: `import { useState } from 'react' // 沙箱没有后端，用一个内存数组当 db.json

// ========== 这就是「db.json」：一个 users 数组 ==========
let db = [
  { id: 1, name: '小明', role: 'admin' },
  { id: 2, name: '小红', role: 'user' },
  { id: 3, name: '小刚', role: 'user' },
]
let nextId = 4

// 迷你 json-server：按 method + path 分发，规则和真的 json-server 一致
function server(method, path, body) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const [pathname, query] = path.split('?')          // 把 /users?q=小 拆成路径和查询串
      const params = new URLSearchParams(query || '')    // 浏览器自带的查询串解析器
      const id = Number(pathname.split('/')[2] || 0)     // /users/2 里的 2

      if (method === 'GET') {
        let rows = [...db]
        const q = params.get('q')                        // json-server 的全文搜索参数
        if (q) rows = rows.filter((u) => u.name.includes(q))
        const page = Number(params.get('_page') || 1)    // 分页参数 _page
        const limit = Number(params.get('_limit') || 2)  // 每页条数 _limit
        const total = rows.length
        rows = rows.slice((page - 1) * limit, page * limit)
        resolve({ status: 200, body: rows, headers: { 'X-Total-Count': total } })
        return
      }
      if (method === 'POST') {                           // 新增：id 由服务端自动分配
        const item = { id: nextId++, ...body }
        db = [...db, item]
        resolve({ status: 201, body: item })
        return
      }
      if (method === 'PATCH') {                          // 部分更新：只改传来的字段
        db = db.map((u) => (u.id === id ? { ...u, ...body } : u))
        resolve({ status: 200, body: db.find((u) => u.id === id) })
        return
      }
      if (method === 'DELETE') {                         // 删除：返回空对象
        db = db.filter((u) => u.id !== id)
        resolve({ status: 200, body: {} })
      }
    }, 400)
  })
}

export default function Demo() {
  const [req, setReq] = useState('还没发请求')   // 左栏：请求报文
  const [res, setRes] = useState('')             // 右栏：响应报文
  const [page, setPage] = useState(1)            // 当前页码
  const [keyword, setKeyword] = useState('')     // 搜索关键字

  async function send(method, path, body) {
    setReq(method + ' ' + path + (body ? '\\n\\n' + JSON.stringify(body, null, 2) : ''))
    setRes('等待响应...')
    const r = await server(method, path, body)
    setRes(r.status + ' ' + (r.status === 201 ? 'Created' : 'OK') + '\\n\\n' + JSON.stringify(r.body, null, 2))
  }

  const btn = { padding: '5px 10px', marginRight: 6, marginBottom: 6 } // 按钮公共样式

  return (
    <div style={{ fontSize: 14 }}>
      <div style={{ marginBottom: 8 }}>
        搜索：
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)} // 对应 json-server 的 ?q= 参数
          placeholder="按名字搜，如 小"
          style={{ margin: '0 8px', padding: '4px 8px', width: 120 }}
        />
        页码：
        <input
          type="number"
          min={1}
          value={page}
          onChange={(e) => setPage(Number(e.target.value))} // 对应 ?_page= 参数
          style={{ margin: '0 8px', padding: '4px 8px', width: 60 }}
        />
      </div>

      <div>
        {/* 每个按钮对应一种 RESTful 操作：路径 + 方法决定「对谁做什么」 */}
        <button type="button" style={btn} onClick={() => send('GET', '/users?_page=' + page + '&_limit=2&q=' + keyword)}>
          GET 列表（分页+搜索）
        </button>
        <button type="button" style={btn} onClick={() => send('POST', '/users', { name: '新同学', role: 'user' })}>
          POST 新增
        </button>
        <button type="button" style={btn} onClick={() => send('PATCH', '/users/2', { role: 'admin' })}>
          PATCH 改 id=2 的角色
        </button>
        <button type="button" style={btn} onClick={() => send('DELETE', '/users/3')}>
          DELETE 删 id=3
        </button>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <b>你发出的请求</b>
          <pre style={{ background: '#f9fafb', padding: 10, fontSize: 12, minHeight: 90 }}>{req}</pre>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <b>服务端返回</b>
          <pre style={{ background: '#f0fdf4', padding: 10, fontSize: 12, minHeight: 90 }}>{res}</pre>
        </div>
      </div>
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：URLSearchParams 拼查询参数——分页 + 搜索 + 排序，别再手动拼字符串',
            body: `import { useState } from 'react' // 纯前端演示：只看 URL 怎么拼，不真的发请求

export default function Demo() {
  const [keyword, setKeyword] = useState('小 明') // 故意带空格，看编码差异
  const [page, setPage] = useState(2)
  const [limit, setLimit] = useState(10)
  const [sort, setSort] = useState('createdAt')   // 排序字段
  const [order, setOrder] = useState('desc')      // 排序方向

  // ===== 正确姿势：URLSearchParams 自动处理空格、中文、& 等特殊字符 =====
  const params = new URLSearchParams()
  params.set('_page', String(page))               // 值必须是字符串
  params.set('_limit', String(limit))
  params.set('_sort', sort)
  params.set('_order', order)
  if (keyword.trim()) params.set('q', keyword.trim()) // ★ 空关键字就不要拼上去，别发 q=
  const goodUrl = '/users?' + params.toString()

  // ===== 错误姿势：手动拼字符串，空格和中文没编码，还可能多一个 & =====
  const badUrl = '/users?_page=' + page + '&_limit=' + limit + '&q=' + keyword

  const box = { background: '#f9fafb', padding: 10, fontSize: 12, wordBreak: 'break-all' }
  const row = { display: 'block', marginBottom: 6 }

  return (
    <div style={{ fontSize: 14 }}>
      <label style={row}>
        关键字：
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} style={{ padding: '4px 8px' }} />
      </label>
      <label style={row}>
        页码：
        <input type="number" min={1} value={page} onChange={(e) => setPage(Number(e.target.value))} style={{ width: 60, padding: '4px 8px' }} />
        {' '}每页：
        <input type="number" min={1} value={limit} onChange={(e) => setLimit(Number(e.target.value))} style={{ width: 60, padding: '4px 8px' }} />
      </label>
      <label style={row}>
        排序字段：
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ padding: '4px 8px' }}>
          <option value="createdAt">createdAt</option>
          <option value="name">name</option>
        </select>
        {' '}方向：
        <select value={order} onChange={(e) => setOrder(e.target.value)} style={{ padding: '4px 8px' }}>
          <option value="asc">asc 升序</option>
          <option value="desc">desc 降序</option>
        </select>
      </label>

      <p style={{ margin: '10px 0 4px', color: '#15803d' }}>✅ URLSearchParams 拼出来的：</p>
      <pre style={box}>{goodUrl}</pre>

      <p style={{ margin: '10px 0 4px', color: '#b91c1c' }}>❌ 手动加号拼出来的（空格没编码，关键字为空时还会留个空 q=）：</p>
      <pre style={box}>{badUrl}</pre>

      <p style={{ color: '#666', marginTop: 10 }}>
        用 axios 时更省事：把这些参数放进 params 对象，库会自动拼成上面绿色那一行。
      </p>
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
}

# server：读 db.json 启动 mock REST API（3001 端口）
# start:all：concurrently 同时跑 mock + React，省事
# proxy：React 开发服务器(3000) 把未知路径转发到 3001，解决跨域
#   → 组件里 http.get('/users') 实际走 localhost:3000/users → 转发到 3001/users
#   → 只在 npm start 开发时生效，生产打包后必须配真实 API 地址`,
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
      title: '阶段自检：会写页面了吗？接着往哪走',
      summary: '对照清单自检当前能力；练手项目由易到难；看清后面四章分别解决什么问题',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '能独立搭项目、写函数组件、用 useState/useEffect、做列表 CRUD、配 React Router、写 axios 三态——并完成 Todolist 或用户列表之一，你已经能独立写出能连后端的页面了，这是一个重要节点；后面还有 Redux、TypeScript、Ant Design、完整项目实战四章等着你。',
          },
          {
            type: 'text',
            title: '1. 是什么：怎样算「这一阶段过关」',
            body: '「看过教程」和「能写出来」差很远。这一阶段过关的标志是：给你一个新需求（比如带登录的用户列表），你能**独立拆页面、配路由、发请求、处理 loading/error**——不需要每步都翻文档。\n\n到这里为止，你已经能独立写出能连后端的页面了，这是一个重要节点，值得停下来盘一盘。下面清单逐项自检；练手项目从 Todolist 到带登录后台，难度递增；最后一节告诉你接下来四章分别解决什么问题。',
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
            note: '带登录项目可直接参考本章 axios 封装 + 「路由实战」那一章的 /demo/auth 守卫。',
          },
          {
            type: 'table',
            title: '4. 下一步学什么（按优先级）',
            intro: '先别贪多——下面按「投入产出比」排序；打了「本站第 N 章」的，后面就有现成教程。',
            headers: ['方向', '解决什么问题', '建议时机'],
            rows: [
              ['TypeScript + React', '类型安全、IDE 提示、少低级 bug', '本站第 17 章'],
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
            body: `# ========== 创建新项目 ==========
npx create-react-app my-app
# 或 Vite（更轻更快）
npm create vite@latest my-app -- --template react

# ========== 本地 mock 接口（本项目）==========
npm run server       # 只启动 json-server（3001），React 需另开终端 npm start
npm run start:all    # 一条命令：mock API + React 同时跑

# ========== 本章常用依赖 ==========
npm install react-router-dom axios @reduxjs/toolkit react-redux
npm install -D json-server   # mock 后端，仅开发用

# ========== 本项目关键文件速查 ==========
# src/utils/request.js       axios 封装（baseURL 空 = 走 proxy 到 3001）
# db.json                    json-server 数据源，每个键名 = REST 资源
# src/pages/JsonServerDemo/  API 演示页，路由 /demo/json-server
# src/routes/index.js        路由表（含 /demo/auth 登录守卫）`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：迷你用户管理页——把本章知识点串成一个能跑的小页面',
            body: `import { useState, useEffect } from 'react' // 沙箱没有后端，接口层用 setTimeout 模拟

// ========== 假接口层：真实项目里这一整块就是 http.get / http.post / http.delete ==========
let db = [
  { id: 1, name: '小明', role: 'admin' },
  { id: 2, name: '小红', role: 'user' },
]
let nextId = 3

function request(action, payload, shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) { reject(new Error('接口出错了：HTTP 500')); return } // 统一的错误对象
      if (action === 'list') resolve(db.filter((u) => u.name.includes(payload?.q || '')))
      if (action === 'add') { const u = { id: nextId++, ...payload }; db = [...db, u]; resolve(u) }
      if (action === 'remove') { db = db.filter((u) => u.id !== payload.id); resolve(true) }
    }, 700)
  })
}

export default function Demo() {
  const [list, setList] = useState([])          // data
  const [loading, setLoading] = useState(true)  // loading
  const [error, setError] = useState('')        // error —— 老三样，一个都不能少
  const [q, setQ] = useState('')                // 搜索关键字
  const [name, setName] = useState('')          // 新增表单的受控输入
  const [fail, setFail] = useState(false)       // 「让请求失败」开关

  // 拉列表：三态模板 + 搜索参数，和真实列表页一模一样
  async function load(keyword) {
    try {
      setLoading(true)
      setError('')
      setList(await request('list', { q: keyword }, fail))
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load(q) }, []) // 挂载时拉一次；真实项目里搜索会加防抖再放进依赖

  async function add() {
    if (!name.trim()) return
    try {
      await request('add', { name: name.trim(), role: 'user' }, fail) // POST
      setName('')
      load(q)                                     // ★ 写操作成功后重新拉列表，保证和服务端一致
    } catch (e) { setError(e.message) }
  }

  async function remove(id) {
    try {
      await request('remove', { id }, fail)       // DELETE
      load(q)
    } catch (e) { setError(e.message) }
  }

  return (
    <div style={{ fontSize: 14, maxWidth: 440 }}>
      <label style={{ display: 'block', marginBottom: 8 }}>
        <input type="checkbox" checked={fail} onChange={(e) => setFail(e.target.checked)} />
        {' '}让接口失败（看错误态和重试）
      </label>

      <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="搜名字" style={{ flex: 1, padding: '6px 8px' }} />
        <button type="button" onClick={() => load(q)} style={{ padding: '6px 10px' }}>搜索</button>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="新用户名字" style={{ flex: 1, padding: '6px 8px' }} />
        <button type="button" onClick={add} style={{ padding: '6px 10px' }}>新增</button>
      </div>

      {loading ? (
        <p style={{ color: '#9ca3af' }}>加载中...</p>
      ) : error ? (
        <p style={{ color: 'crimson' }}>
          {error}
          <button type="button" onClick={() => load(q)} style={{ marginLeft: 8 }}>重试</button>
        </p>
      ) : list.length === 0 ? (
        <p style={{ color: '#9ca3af' }}>没有匹配的用户</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {list.map((u) => (
            <li key={u.id} style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: '1px solid #f3f4f6' }}>
              <span style={{ flex: 1 }}>{u.name}（{u.role}）</span>
              <button type="button" onClick={() => remove(u.id)}>删除</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}`,
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
            type: 'text',
            title: '7. 接下来的四章分别解决什么问题',
            body: '到这里你已经能独立写出能连后端的页面了，这是一个重要节点——但离「能接手一个真实项目」还差四块拼图，后面四章正好一块一块补上。\n\n**第 16 章 Redux 状态管理**：页面一多，登录信息、购物车、主题这些数据要在很多组件之间共享，props 一层层往下传会传疯。Redux Toolkit 把它们放进一个全局仓库，任何组件都能直接读写。\n\n**第 17 章 TypeScript**：你现在写 user.nmae 拼错了，只有页面白屏才发现。加上类型之后编辑器当场标红，接口字段、props、hooks 都有提示——这是本阶段之后投入产出比最高的一步。\n\n**第 18 章 Ant Design**：表格、分页、弹窗、表单校验、日期选择器，自己手写要写到天荒地老。组件库直接给你一整套，重点是学会「怎么按需改造别人的组件」。\n\n**第 19 章 完整项目实战**：把前面所有东西拼成一个真项目——目录怎么分、请求层怎么封装、路由和权限怎么组织、环境变量怎么配、最后怎么打包上线。',
          },
          {
            type: 'list',
            title: '8. 建议的推进顺序',
            ordered: true,
            intro: '不用一口气学完，按这个顺序推进最省力。',
            items: [
              '先把本章的三态模板和 axios 封装用熟（做一遍用户列表 + 详情页）',
              '第 16 章 Redux 全局状态：跨页面共享数据不再靠层层传 props',
              '第 17 章 TypeScript：给已有代码加类型，错误提前到写代码时暴露',
              '第 18 章 Ant Design：用组件库快速搭出像样的后台界面',
              '第 19 章 完整项目实战：从架构、联调到上线走完一整轮',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '清单打勾 + Todolist 跑通 + 用户列表练 axios + /demo/auth 练守卫——四条都做过，你已经能独立写出能连后端的页面了，这是一个重要节点；接着按 Redux（第 16 章）→ TypeScript（第 17 章）→ Ant Design（第 18 章）→ 完整项目实战（第 19 章）往下走。',
          },
        ],
      },
    },
  ],
}

export default practice
