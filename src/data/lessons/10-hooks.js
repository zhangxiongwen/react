/**
 * 常用 Hooks 章节
 */
const hooks = {
  id: 'hooks',
  title: '常用 Hooks 精讲',
  summary:
    'useEffect 依赖与清理、useRef DOM与定时器、useMemo/useCallback/memo 性能三件套、useReducer、自定义 Hook',
  order: 10,
  items: [
    {
      id: 'useeffect-basic',
      title: 'useEffect 完整用法：副作用、依赖数组、清理函数',
      summary: 'effect = 渲染之外的事；[] 只跑一次；[dep] 依赖变才跑；return 清理',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'useEffect = 告诉 React「渲染完成后，请帮我执行这段副作用代码」。依赖数组控制何时重新执行；return 函数负责清理。',
          },
          {
            type: 'text',
            title: '1）是什么：副作用（Side Effect）',
            body: 'React 组件函数的主要职责只有一件事：根据当前的 props 和 state，返回 JSX（描述 UI 长什么样）。\n\n除此之外、会影响「组件外部世界」或「组件外部数据」的操作，都叫副作用（Side Effect），简称 effect。常见例子：\n\n• 请求接口拉数据\n• 修改 document.title\n• 订阅 WebSocket / 事件监听\n• setInterval / setTimeout 定时器\n• 读写 localStorage\n• 操作第三方 DOM 库（地图、图表）\n\nuseEffect 就是 React 官方提供的 Hook，专门用来「声明和管理」这些副作用——什么时候跑、什么时候重新跑、什么时候清理。',
          },
          {
            type: 'text',
            title: '2）特点：渲染与副作用分离',
            body: 'useEffect 的执行时机和组件函数体不同：\n\n① 组件函数体：每次渲染都会从头到尾执行（算 JSX）。\n\n② useEffect 回调：在浏览器完成本次 DOM 更新之后才执行（异步于渲染）。\n\n③ 依赖数组：决定 effect 何时「重新订阅/重新请求/重新绑定」。\n\n④ return 清理函数：在下次 effect 执行前、或组件卸载时调用，用来撤销上一次的副作用。\n\n可以把 useEffect 想成：React 帮你记了一张「待办清单」——渲染画完界面后，再按清单跑副作用；清单内容变了（依赖变了），就先清掉旧的再跑新的。',
          },
          {
            type: 'table',
            title: '3）三种依赖写法对照（必须背熟）',
            headers: ['写法', '何时执行 effect', '典型场景', '风险'],
            rows: [
              ['不传第二参数', '每次渲染后都执行', '几乎不用（调试/特殊同步）', '容易重复订阅、性能差'],
              ['空数组 []', '只在挂载时执行一次', '改 title、初始请求、全局订阅', 'effect 里用到的值可能是「旧闭包」'],
              ['[a, b, ...]', 'a 或 b 变化时执行', '按 userId 拉数据、keyword 搜索', '漏写依赖 → 闭包抓到旧值'],
            ],
          },
          {
            type: 'text',
            title: '4）为什么：副作用不能随意写在组件顶层',
            body: '如果把 fetch、addEventListener、setInterval 直接写在组件函数体里（return 之前），会发生什么？\n\n• 每次 state 变化 → 组件重渲染 → 函数体重新执行 → 副作用又跑一遍。\n\n• 结果：重复发请求、重复订阅、旧定时器没清掉 → 内存泄漏、数据错乱、控制台警告「Can\'t perform a React state update on an unmounted component」。\n\nuseEffect 的价值就是把「渲染逻辑」和「副作用逻辑」分开，并给你依赖数组 + 清理函数两个控制旋钮。\n\n类比：组件函数像「画一幅画」，useEffect 像「画完以后再去寄快递」——你不会每涂一笔就寄一次快递。',
          },
          {
            type: 'text',
            title: '5）怎么用：基本语法与执行顺序',
            body: '语法：useEffect(() => { /* 副作用 */ return () => { /* 清理 */ } }, [deps])\n\n逐步理解：\n\n1）第一个参数是 effect 函数，React 在 commit 阶段（DOM 更新后）调用它。\n\n2）第二个参数是依赖数组（可选）：不写 = 每次渲染后跑；[] = 只挂载跑一次；[x] = x 变才跑。\n\n3）effect 可以 return 一个函数，这是清理函数（cleanup）。\n\n4）当 deps 变化时：先跑上一次的 cleanup → 再跑新的 effect。\n\n5）组件卸载时：也会跑最后一次 cleanup。\n\n记忆口诀：挂载跑 effect → 依赖变「先清理再 effect」→ 卸载只清理。',
          },
          {
            type: 'code',
            title: '完整 Demo：三种依赖写法 + 改标题 + 按 id 拉数据',
            language: 'jsx',
            body: `import { useEffect, useState } from 'react'

// useEffect：在「渲染完成之后」执行副作用（请求、改 title、订阅等）
function UserDetail({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // ===== Effect 1：依赖 [] —— 只在组件挂载时执行一次 =====
  useEffect(() => {
    const prevTitle = document.title
    document.title = '用户详情 - My App'

    // return 清理函数：卸载时（或 effect 重跑前）执行
    return () => {
      document.title = prevTitle // 离开页面时还原原标题
    }
  }, []) // 空数组 = 不依赖任何值，只挂载跑一次

  // ===== Effect 2：依赖 [userId] —— userId 变化时重新拉数据 =====
  useEffect(() => {
    if (!userId) {
      setUser(null)
      setLoading(false)
      return // 早退：没有 id 就不发请求
    }

    let cancelled = false // 竞态处理：旧请求返回时不再 setState

    async function loadUser() {
      setLoading(true)
      setError('')

      try {
        await new Promise((r) => setTimeout(r, 800)) // 模拟网络延迟
        const mockData = {
          1: { id: 1, name: '小明', city: '上海' },
          2: { id: 2, name: '小红', city: '北京' },
        }
        const data = mockData[userId]

        if (!cancelled) { // 只有「未被取消」的请求才更新 state
          if (data) {
            setUser(data)
          } else {
            setError('用户不存在')
          }
        }
      } catch (err) {
        if (!cancelled) setError(err.message || '加载失败')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadUser() // 在 effect 里调用 async 函数（不要直接把 effect 写成 async）

    return () => {
      cancelled = true // userId 变或卸载时标记取消，忽略过期响应
    }
  }, [userId]) // userId 变了 → 先跑 cleanup → 再跑新 effect

  // 条件渲染：根据 loading / error / user 决定显示什么
  if (loading) return <p>加载中...</p>
  if (error) return <p style={{ color: 'crimson' }}>{error}</p>
  if (!user) return <p>请选择用户</p>

  return (
    <div style={{ padding: 20 }}>
      <h2>{user.name}</h2>
      <p>城市：{user.city}</p>
    </div>
  )
}

// 父组件切换 userId，观察 effect 如何重新执行
function App() {
  const [userId, setUserId] = useState(1)

  return (
    <div>
      <button type="button" onClick={() => setUserId(1)}>用户 1</button>
      <button type="button" onClick={() => setUserId(2)}>用户 2</button>
      <button type="button" onClick={() => setUserId(999)}>不存在</button>
      <UserDetail userId={userId} />
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：依赖数组三种写法对照——各自到底执行了几次',
            body: `import { useEffect, useRef, useState } from 'react' // useRef 用来记次数（改它不会触发渲染）

export default function Demo() { // 约定：必须默认导出一个组件
  const [text, setText] = useState('') // 输入框内容：每敲一个字都会触发一次重新渲染
  const [step, setStep] = useState(0) // 另一个状态：只有点按钮时才会变
  const noDeps = useRef(0) // 计数器①：不传依赖数组的 effect 跑了几次
  const emptyDeps = useRef(0) // 计数器②：依赖数组是 [] 的 effect 跑了几次
  const stepDeps = useRef(0) // 计数器③：依赖数组是 [step] 的 effect 跑了几次

  useEffect(() => { // ① 没有第二个参数
    noDeps.current += 1 // 每次渲染完成后都会执行一次，所以敲字也会涨
  }) // 注意这里没有依赖数组

  useEffect(() => { // ② 第二个参数是空数组
    emptyDeps.current += 1 // 只在组件挂载时执行一次，之后永远不再执行
  }, []) // [] = 不依赖任何值

  useEffect(() => { // ③ 第二个参数里有 step
    stepDeps.current += 1 // 只有 step 变化时才重新执行
  }, [step]) // step 变了 → 重跑；敲字不影响它

  const row = { // 抽出一份行样式，三行复用（没有 CSS 文件，只能写内联样式）
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 12px',
    border: '1px solid #eee',
    borderRadius: 6,
    marginBottom: 8,
  }

  return (
    <div style={{ padding: 16 }}>
      <input
        value={text} // 受控输入框：值来自 state
        onChange={(e) => setText(e.target.value)} // 每敲一个字就 setState → 触发一次渲染
        placeholder="随便敲几个字（只是制造重新渲染）"
        style={{ width: '100%', padding: 8, marginBottom: 10, boxSizing: 'border-box' }}
      />
      <button
        type="button"
        onClick={() => setStep((s) => s + 1)} // 改 step：只有第③个 effect 会重跑
        style={{ padding: '6px 14px', marginBottom: 14 }}
      >
        step + 1（当前 {step}）
      </button>

      <div style={row}><span>① useEffect(fn) 不传依赖</span><b>{noDeps.current} 次</b></div>
      <div style={row}><span>② useEffect(fn, []) 空数组</span><b>{emptyDeps.current} 次</b></div>
      <div style={row}><span>③ useEffect(fn, [step]) 有依赖</span><b>{stepDeps.current} 次</b></div>

      <p style={{ fontSize: 12, color: '#888', lineHeight: 1.7 }}>
        effect 是在「渲染之后」才跑的，所以数字总是慢半拍，多点两下就能看出规律：
        ① 一直涨、② 永远停在 1、③ 只跟着 step 涨。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '6）清理函数：什么时候必须写？',
            headers: ['副作用类型', '清理写法', '不清理的后果'],
            rows: [
              ['setInterval / setTimeout', 'clearInterval / clearTimeout', '卸载后仍 tick、setState 警告'],
              ['addEventListener', 'removeEventListener', '重复绑定、内存泄漏'],
              ['WebSocket / 订阅', 'close / unsubscribe', '后台仍收消息、改 state'],
              ['异步请求', 'cancelled 标志或 AbortController', '旧请求覆盖新数据'],
              ['改 document.title', '还原为 prevTitle', '离开页面 title 残留'],
            ],
          },
          {
            type: 'code',
            title: '完整 Demo：定时器 + resize 监听（必须清理）',
            language: 'jsx',
            body: `import { useEffect, useState } from 'react'

function Clock() {
  const [time, setTime] = useState(new Date())
  const [width, setWidth] = useState(window.innerWidth)

  // 副作用：定时器 —— 必须在 useEffect 里创建，不能写在组件顶层
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date()) // 每秒更新 time，触发重渲染
    }, 1000)

    // ✅ 清理：组件卸载时必须 clearInterval，否则内存泄漏 + setState 警告
    return () => clearInterval(timer)
  }, []) // [] = 只挂载时启动一次定时器

  // 副作用：window resize 事件监听
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // ✅ 清理：卸载时移除监听，避免重复绑定
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <p>当前时间：{time.toLocaleTimeString('zh-CN')}</p>
      <p>窗口宽度：{width}px</p>
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：清理函数——不写 return 清理，卸载后定时器还在偷偷跑',
            body: `import { useCallback, useEffect, useRef, useState } from 'react' // useCallback 让传给子组件的函数引用稳定

// 子组件：挂载时启动一个定时器，每 0.8 秒往日志里写一行
function Ticker({ withCleanup, onTick, keepTimer }) {
  useEffect(() => {
    let n = 0 // 本次定时器自己的计数
    const timer = setInterval(() => { // 创建定时器：这就是一个副作用
      n += 1 // 每 tick 一次就加一
      onTick((withCleanup ? '✅ 有清理版 tick ' : '❌ 无清理版 tick ') + n) // 写日志
    }, 800)
    keepTimer(timer) // 把定时器 id 交给父组件保管，方便一键收拾泄漏
    if (!withCleanup) return // 故意不返回清理函数：卸载后这个定时器还活着（这就是内存泄漏）
    return () => clearInterval(timer) // ✅ 正确写法：卸载或依赖变化前，先把旧定时器清掉
  }, [withCleanup, onTick, keepTimer]) // 依赖里的三个值都必须稳定，否则 effect 会反复重启

  return (
    <p style={{ margin: 0, padding: 10, background: '#f6ffed', borderRadius: 6 }}>
      子组件已挂载，每 0.8 秒 tick 一次
    </p>
  )
}

export default function Demo() {
  const [mounted, setMounted] = useState(false) // 控制子组件挂载 / 卸载
  const [withCleanup, setWithCleanup] = useState(false) // 是否写清理函数
  const [logs, setLogs] = useState([]) // 日志列表，用来「看见」定时器还在不在跑
  const timersRef = useRef([]) // 存所有创建过的定时器 id（包括泄漏掉的那些）

  const onTick = useCallback((line) => { // useCallback([]) → 引用永远不变，子组件 effect 不会被误重启
    setLogs((prev) => [line, ...prev].slice(0, 8)) // 只保留最新 8 条
  }, [])

  const keepTimer = useCallback((id) => { // 同样要稳定引用
    timersRef.current.push(id) // 记下 id
  }, [])

  useEffect(() => () => timersRef.current.forEach(clearInterval), []) // 整个 Demo 卸载时兜底清理

  function cleanAll() { // 「收拾残局」按钮：把泄漏的定时器统统关掉
    timersRef.current.forEach(clearInterval) // 逐个清除
    timersRef.current = [] // 清空记录
    setLogs([]) // 清空日志
  }

  return (
    <div style={{ padding: 16 }}>
      <label style={{ display: 'block', marginBottom: 10 }}>
        <input
          type="checkbox"
          checked={withCleanup} // 勾上 = effect 里 return clearInterval
          onChange={(e) => setWithCleanup(e.target.checked)}
        />{' '}
        写清理函数（return () =&gt; clearInterval）
      </label>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button type="button" onClick={() => setMounted((v) => !v)} style={{ padding: '6px 12px' }}>
          {mounted ? '卸载子组件' : '挂载子组件'}
        </button>
        <button type="button" onClick={cleanAll} style={{ padding: '6px 12px' }}>
          收拾残局（清掉所有泄漏定时器）
        </button>
      </div>

      {mounted && <Ticker withCleanup={withCleanup} onTick={onTick} keepTimer={keepTimer} />}

      <pre style={{ marginTop: 12, padding: 10, background: '#141414', color: '#b7eb8f', borderRadius: 6, minHeight: 90, fontSize: 12 }}>
        {logs.length ? logs.join('\\n') : '（日志区：这里会显示定时器的 tick）'}
      </pre>

      <p style={{ fontSize: 12, color: '#888', lineHeight: 1.7 }}>
        玩法：不勾清理 → 挂载 → 卸载，日志还在继续涨（组件没了定时器还活着）；
        勾上清理 → 挂载 → 卸载，日志立刻停。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '7）依赖数组怎么填？（exhaustive-deps 规则）',
            body: 'React 官方 ESLint 插件有一条规则：react-hooks/exhaustive-deps。\n\n原则：effect 函数体内用到的 props、state、context、以及组件内定义的函数/变量，原则上都应放进依赖数组。\n\n漏依赖的典型症状：\n\n• keyword 变了，搜索不重新发请求\n• count 变了，定时器里打印的还是旧 count\n• theme 变了，effect 里读到的还是旧 theme\n\n这不是 React 的 bug，是 JavaScript 闭包机制——effect 函数「记住」的是创建那次渲染里的变量快照。\n\n修复路径：① 把漏掉的值加进 deps；② 用函数式 setState 减少对外部 state 的依赖；③ 用 useRef 存「不需要触发 effect 重跑」的可变值；④ 用 useCallback 稳定函数引用（进阶）。\n\n不要习惯性 eslint-disable——先理解为什么警告，再决定是否真的例外。',
          },
          {
            type: 'code',
            title: '依赖遗漏示例与修复',
            language: 'jsx',
            body: `function SearchResults({ keyword }) {
  const [results, setResults] = useState([])

  // ❌ 漏依赖 keyword：keyword 变了 effect 不会重跑，搜索结果是旧的
  // useEffect(() => {
  //   fetch(\`/api/search?q=\${keyword}\`).then(...)
  // }, [])

  // ✅ 正确：effect 里用到的 props/state 都要放进依赖数组
  useEffect(() => {
    if (!keyword.trim()) {
      setResults([])
      return
    }

    let cancelled = false // 快速输入时，忽略过期的搜索结果

    fetch(\`/api/search?q=\${encodeURIComponent(keyword)}\`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setResults(data)
      })

    return () => { cancelled = true }
  }, [keyword]) // ← keyword 必须在这里，否则闭包抓到旧 keyword

  return (/* 渲染 results */)
}`,
          },
          {
            type: 'code',
            title: 'localStorage 同步（常见 effect 场景）',
            language: 'jsx',
            body: `function ThemeApp() {
  // 惰性初始化：只在首次渲染时读 localStorage，避免每次 render 都读
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  // theme 变化时同步到 localStorage 和 DOM 属性 —— 典型 effect 场景
  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme]) // theme 变才重跑，不是每次 render 都写

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      当前：{theme}
    </button>
  )
}`,
          },
          {
            type: 'list',
            title: '8）useEffect 自检清单',
            ordered: true,
            items: [
              '副作用是否放在了 useEffect 里，而不是组件函数体顶层？',
              '依赖数组是否包含 effect 内用到的 props/state？',
              'setInterval、addEventListener、订阅是否写了 return 清理？',
              '异步请求是否处理了「组件卸载 / 参数变化后旧请求返回」？',
              '[] 的 effect 里若用到外部变量，是否确认可以接受闭包旧值？',
              '开发环境 StrictMode 双跑时，清理函数是否能让状态恢复正常？',
            ],
          },
          {
            type: 'text',
            title: '9）易错点汇总',
            body: '① 把「根据 state 算出来的 UI」写进 effect——那是渲染逻辑，应直接写在 return 里或用 useMemo。\n\n② 在 effect 里无条件 setState 且 deps 为空 []——只跑一次还好；deps 写错可能导致无限循环（effect → setState → 渲染 → effect…）。\n\n③ async 函数直接当 effect 回调——useEffect(async () => {}) 不行，因为 effect 期望 return 清理函数，而 async 函数 return 的是 Promise。正确写法：在 effect 里定义 async function 再调用，或用 IIFE。\n\n④ 以为 effect 会在 setState「之后立刻」读到新 state——和组件函数体一样，同一次 effect 执行里读到的仍是触发这次渲染的快照。\n\n⑤ 生产环境去掉清理函数「因为 dev 双跑看起来重复」——StrictMode 双跑正是为了帮你发现没清理的 bug。',
          },
          {
            type: 'tip',
            title: 'StrictMode 下 effect 跑两次？',
            body: '开发模式 React.StrictMode 会故意「挂载 → 清理 → 再挂载」，帮你发现没写清理的 bug。生产环境不会双跑。所以清理函数写对很重要；不要因为 dev 双跑就去掉 StrictMode。',
          },
          {
            type: 'list',
            title: '10）动手练习清单',
            ordered: true,
            items: [
              '做 Clock 组件，卸载时确认控制台不再打印 tick',
              '做 UserDetail，快速切换 userId，确认不会显示错用户（cancelled 标志）',
              'theme 切换并同步到 document.documentElement',
              '故意漏依赖，看 ESLint 警告，再修复',
              '把 effect 写成 async 箭头函数，看报错，改成内部 async function',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '副作用进 useEffect；deps 控制重跑，[] 只挂载一次，[x] 随 x 变。创建了监听/定时器/订阅必 return 清理。异步请求用 cancelled 或 AbortController 防过期覆盖。effect 里用到的 state/props 都要进依赖数组。',
          },
        ],
      },
    },
    {
      id: 'useref-basic',
      title: 'useRef 完整用法：操作 DOM + 定时器 id 可变盒子',
      summary: 'ref = 不触发渲染的可变引用；ref={} 拿 DOM；存 timer id',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'useRef = 一个跨渲染不变的「盒子」，改 .current 不会触发重新渲染。两种用途：1）拿真实 DOM；2）存定时器 id 等不需要显示在界面上的值。',
          },
          {
            type: 'text',
            title: '1）是什么：可变的「引用盒子」',
            body: 'useRef(initialValue) 返回一个普通 JavaScript 对象：{ current: initialValue }。\n\n这个对象在组件的整个生命周期内保持同一个引用（地址不变），但你可以随意修改 .current 的值。\n\n关键特性：修改 ref.current 不会触发组件重新渲染。React 不会因为你改了 ref 就去重跑组件函数、更新 DOM。\n\n因此 useRef 适合两类数据：\n\n• 需要和 DOM 节点打交道（focus、scroll、测量尺寸）\n• 需要在多次渲染之间记住某个值，但这个值的变化不需要反映在 UI 上（定时器 id、是否已请求过、上一次的 props）',
          },
          {
            type: 'table',
            title: '2）特点：useRef vs useState 对照',
            headers: ['对比', 'useState', 'useRef'],
            rows: [
              ['改值后是否重渲染', '✅ 会', '❌ 不会'],
              ['值的读取方式', '直接 count', 'ref.current'],
              ['适合存什么', '要显示在 UI 上的数据', 'DOM 引用、timer id、标记位'],
              ['更新方式', 'setCount(新值)', 'ref.current = 新值'],
              ['跨渲染保留', '✅', '✅'],
            ],
          },
          {
            type: 'text',
            title: '3）为什么：有些数据不该驱动 UI 更新',
            body: '假设你把 setInterval 返回的 timer id 存在 useState 里：\n\nconst [timerId, setTimerId] = useState(null)\n\n每次 start/stop 更新 timerId → 触发重渲染 → 但界面上根本不需要显示 timerId → 白白多渲染。\n\n又比如「这是第几次渲染」的计数——你只想在 console 里看，不想显示在页面上，用 useRef 递增 renderCount.current 即可。\n\n反过来：秒表显示的秒数必须驱动 UI，所以用 useState；而「定时器 id」只是内部 bookkeeping，用 useRef。\n\n口诀：要出现在 JSX 里 → useState；只是内部记个数、存个引用 → useRef。',
          },
          {
            type: 'text',
            title: '4）怎么用（用途一）：获取和操作真实 DOM',
            body: '四步流程：\n\n1）声明：const inputRef = useRef(null)\n\n2）绑定：JSX 里 <input ref={inputRef} />\n\n3）挂载后：inputRef.current 指向真实 DOM 节点（卸载后变回 null）\n\n4）在 useEffect 或事件处理函数里调用 DOM API：inputRef.current?.focus()\n\n常用 DOM 操作：focus()、select()、scrollIntoView()、getBoundingClientRect()、click()。\n\n注意：不要在组件渲染期间（return 之前）读写 ref.current 来做 UI 逻辑——此时 DOM 可能还没挂上。自动聚焦应放在 useEffect([], ...) 里。',
          },
          {
            type: 'code',
            title: '完整 Demo：搜索框自动聚焦 + 全选 + 滚动到视图',
            language: 'jsx',
            body: `import { useEffect, useRef } from 'react'

// useRef 用途一：获取真实 DOM 节点，调用 focus / scroll 等原生 API
function SearchBox() {
  const inputRef = useRef(null)   // 绑定到 input
  const resultRef = useRef(null)  // 绑定到结果区域

  // DOM 挂载后才能 focus —— 放在 useEffect([], ...) 里，不要写在 render 期间
  useEffect(() => {
    inputRef.current?.focus() // ?. 安全调用：挂载前 current 是 null
  }, [])

  function handleSelectAll() {
    inputRef.current?.select() // 选中输入框全部文字
  }

  function handleClear() {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.focus()
    }
  }

  function handleScrollToResult() {
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {/* ref={inputRef}：React 会把真实 DOM 节点挂到 inputRef.current */}
        <input
          ref={inputRef}
          type="text"
          placeholder="搜索..."
          style={{ flex: 1, padding: 10 }}
        />
        <button type="button" onClick={handleSelectAll}>全选</button>
        <button type="button" onClick={handleClear}>清空</button>
      </div>

      <button type="button" onClick={handleScrollToResult}>
        滚动到结果
      </button>

      <div style={{ height: 400 }} />

      <div
        ref={resultRef}
        style={{
          padding: 16,
          background: '#e6f4ff',
          borderRadius: 8,
        }}
      >
        搜索结果区域（点击下方按钮会滚到这里）
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
            title: 'Live Demo：用 useRef 操作真实 DOM——一键聚焦、全选、滚动到指定元素',
            body: `import { useRef, useState } from 'react' // useRef 拿到真实 DOM 节点

export default function Demo() {
  const inputRef = useRef(null) // ① 声明一个 ref，初始值 null
  const targetRef = useRef(null) // 另一个 ref：指向列表里第 7 项
  const listRef = useRef(null) // 指向可滚动的列表容器
  const [tip, setTip] = useState('点上面的按钮试试') // 只是提示文字

  function focusInput() {
    inputRef.current?.focus() // ?. 是安全调用：没挂载时 current 还是 null
    setTip('已调用 inputRef.current.focus()，光标进输入框了')
  }

  function selectAll() {
    inputRef.current?.select() // 选中输入框里的全部文字（原生 DOM 方法）
    setTip('已调用 select()，文字被全选')
  }

  function scrollToTarget() {
    // scrollIntoView 是原生 DOM API，React 本身没有「滚动到某元素」的能力，只能靠 ref
    targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    setTip('已调用 scrollIntoView()，列表滚到了第 7 项')
  }

  return (
    <div style={{ padding: 16 }}>
      {/* ② 把 ref 绑到 JSX 上，挂载后 React 会把真实 DOM 塞进 inputRef.current */}
      <input
        ref={inputRef}
        defaultValue="这里是一段可以被全选的文字" // 非受控写法：值不由 state 管
        style={{ width: '100%', padding: 8, marginBottom: 10, boxSizing: 'border-box' }}
      />

      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <button type="button" onClick={focusInput} style={{ padding: '6px 12px' }}>聚焦输入框</button>
        <button type="button" onClick={selectAll} style={{ padding: '6px 12px' }}>全选文字</button>
        <button type="button" onClick={scrollToTarget} style={{ padding: '6px 12px' }}>滚动到第 7 项</button>
      </div>

      {/* 一个高度固定、可以滚动的列表容器 */}
      <div ref={listRef} style={{ height: 140, overflowY: 'auto', border: '1px solid #eee', borderRadius: 6 }}>
        {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
          <div
            key={n} // 列表渲染必须给 key
            ref={n === 7 ? targetRef : null} // ③ 只给第 7 项绑 ref，其余不绑
            style={{
              padding: 10,
              background: n === 7 ? '#fffbe6' : 'transparent', // 目标项高亮一下
              borderBottom: '1px solid #f5f5f5',
            }}
          >
            第 {n} 项{n === 7 ? '（targetRef 指向我）' : ''}
          </div>
        ))}
      </div>

      <p style={{ fontSize: 12, color: '#888', marginTop: 10 }}>{tip}</p>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '5）怎么用（用途二）：存可变值（定时器 id、标记位）',
            body: '模式：const timerRef = useRef(null)\n\n• start：timerRef.current = setInterval(...)\n\n• pause：clearInterval(timerRef.current); timerRef.current = null\n\n• 卸载清理：useEffect return 里 clearInterval(timerRef.current)\n\n还可以存：\n\n• hasFetchedRef——防止 StrictMode 或重复渲染导致请求发两次\n\n• prevPropsRef——对比前后 props 变化\n\n• isMountedRef——异步回调里判断是否还在树上（现代更推荐 cancelled 标志）',
          },
          {
            type: 'code',
            title: '完整 Demo：秒表（useRef 存 timer id + useState 存显示数字）',
            language: 'jsx',
            body: `import { useEffect, useRef, useState } from 'react'

// useRef 用途二：存 timer id 等「不需要显示在 UI 上」的可变值
function Stopwatch() {
  const [seconds, setSeconds] = useState(0)   // 要显示 → useState
  const [running, setRunning] = useState(false)
  const timerRef = useRef(null) // 定时器 id 不必驱动 UI → useRef

  function start() {
    if (timerRef.current) return // 防止重复 start 创建多个定时器

    timerRef.current = setInterval(() => {
      setSeconds((s) => s + 1) // 函数式更新，不依赖闭包里的旧 seconds
    }, 1000)
    setRunning(true)
  }

  function pause() {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null // 清空 ref，允许再次 start
    }
    setRunning(false)
  }

  function reset() {
    pause()
    setSeconds(0)
  }

  // 卸载时清理定时器 —— 和 useEffect 定时器 demo 同一规则
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  const display = \`\${String(minutes).padStart(2, '0')}:\${String(secs).padStart(2, '0')}\`

  return (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <p style={{ fontSize: 48, fontFamily: 'monospace' }}>{display}</p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        {!running ? (
          <button type="button" onClick={start}>开始</button>
        ) : (
          <button type="button" onClick={pause}>暂停</button>
        )}
        <button type="button" onClick={reset}>重置</button>
      </div>
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: 'useRef 记录「上一次的值」（进阶但实用）',
            language: 'jsx',
            body: `import { useEffect, useRef, useState } from 'react'

// 自定义 Hook：用 ref 存「上一次渲染」的值（进阶但实用）
function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value // 本次渲染完成后，才把当前 value 写入 ref
  }, [value])
  return ref.current   // 返回的是「上一次」的值（本次 render 期间还没更新）
}

function Counter() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count) // 点 +1 后，prevCount 是点击前的数字

  return (
    <div style={{ padding: 20 }}>
      <p>当前：{count}</p>
      <p>上一次：{prevCount ?? '无'}</p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>+1</button>
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: 'useRef vs useState 对照',
            language: 'jsx',
            body: `// useRef vs useState：改 ref 不重渲染，改 state 会重渲染
function RenderCount() {
  const [count, setCount] = useState(0)      // 要显示在 UI 上
  const renderRef = useRef(0)                // 只内部计数，不必显示

  renderRef.current += 1 // 每次组件函数执行（渲染）时 +1，不触发额外渲染

  return (
    <div>
      <p>state count: {count}</p>
      <p>本次是第 {renderRef.current} 次渲染</p>
      <button onClick={() => setCount((c) => c + 1)}>+1（会渲染）</button>
    </div>
  )
}

// 选择口诀：
// 要出现在 JSX 里 → useState
// 只是内部计数 / 存 timer id / 存 DOM 引用 → useRef`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：改 ref 不重渲染、改 state 会重渲染——同一个计数的两种存法',
            body: `import { useRef, useState } from 'react' // 同时用两种方式存计数，看差别

export default function Demo() {
  const [stateCount, setStateCount] = useState(0) // 用 state 存的计数：改它会触发重新渲染
  const refCount = useRef(0) // 用 ref 存的计数：改它「不会」触发重新渲染
  const renders = useRef(0) // 记录组件函数一共执行了多少次（也就是渲染次数）

  renders.current += 1 // 每次渲染（组件函数执行）都 +1，不会引起额外渲染

  const box = { // 两张卡片共用的样式
    flex: 1,
    padding: 12,
    border: '1px solid #eee',
    borderRadius: 8,
    textAlign: 'center',
  }

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <div style={box}>
          <p style={{ margin: 0, color: '#888', fontSize: 13 }}>useState 计数</p>
          <p style={{ fontSize: 30, margin: '6px 0' }}>{stateCount}</p>
          <button type="button" onClick={() => setStateCount((c) => c + 1)} style={{ padding: '6px 12px' }}>
            +1（会重渲染）
          </button>
        </div>

        <div style={box}>
          <p style={{ margin: 0, color: '#888', fontSize: 13 }}>useRef 计数</p>
          <p style={{ fontSize: 30, margin: '6px 0' }}>{refCount.current}</p>
          <button
            type="button"
            onClick={() => { refCount.current += 1 }} // 直接改 .current，React 完全不知情
            style={{ padding: '6px 12px' }}
          >
            +1（界面不动）
          </button>
        </div>
      </div>

      <p style={{ padding: 10, background: '#f5f5f5', borderRadius: 6, margin: 0 }}>
        组件到目前为止渲染了 <b>{renders.current}</b> 次
      </p>

      <p style={{ fontSize: 12, color: '#888', lineHeight: 1.7 }}>
        玩法：先狂点右边「+1（界面不动）」几下，数字纹丝不动（值其实已经改了，只是没重新渲染）；
        再点一下左边的 +1 触发渲染，右边的数字会「一次性补上」。
        结论：需要显示在界面上的值用 useState，只是内部记账用 useRef。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '6）场景选型：什么时候用 ref？',
            headers: ['场景', '推荐', '原因'],
            rows: [
              ['输入框自动聚焦', 'useRef + useEffect', '需要调 DOM API'],
              ['存 setInterval id', 'useRef', 'id 不必显示在 UI'],
              ['显示倒计时数字', 'useState', '数字要渲染到界面'],
              ['记录渲染次数（调试用）', 'useRef', '改值不需重渲染'],
              ['表单输入值', 'useState（受控）', '值要驱动 UI 更新'],
              ['读上一次 props', 'useRef + useEffect', '对比变化，不触发渲染'],
            ],
          },
          {
            type: 'text',
            title: '7）易错点汇总',
            body: '① ref.current 初始是 null，挂载前调用 DOM 方法会报错——用 optional chaining：ref.current?.focus()。\n\n② 不要把 ref 当 state 用——需要驱动 UI 更新的数据必须用 useState，否则改了界面不变。\n\n③ 在渲染期间写 ref.current = xxx 来「存上一次渲染的值」——读到的时机不对；应像 usePrevious 那样在 useEffect 里更新。\n\n④ 受控组件(value + onChange)通常不需要 ref 读值；非受控才常用 ref（React 19 前文件上传等）。\n\n⑤ 给子组件传 ref 需要 forwardRef（进阶）；原生标签 input/div 直接 ref={} 即可。\n\n⑥ 误以为改 ref 会触发 useEffect——ref 不在依赖里且改了也不重渲染，effect 不会因为 ref 变而重跑。',
          },
          {
            type: 'list',
            title: '8）动手练习清单',
            ordered: true,
            items: [
              '做登录页，进入时密码框自动 focus',
              '做 Stopwatch，确认卸载后定时器停止',
              '用 usePrevious 显示「上一次点击的时间戳」',
              '对比 timer id 存 useState vs useRef，感受哪个更合理',
              '故意在 render 里调 ref.current.focus()，观察与 useEffect 的差异',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'useRef = 跨渲染不变的 { current } 盒子；改 .current 不重渲染。绑 ref={} 拿 DOM，在 effect/事件里操作。timer id、标记位用 ref；要显示在界面上的值用 useState。挂载前 current 是 null，用 ?. 安全调用。',
          },
        ],
      },
    },
    {
      id: 'usememo-basic',
      title: 'useMemo：把「算得慢的值」缓存起来',
      summary: '依赖不变就复用上次结果，只给真正慢的计算用，别滥用',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'useMemo(() => 算一个值, [依赖]) = 「依赖没变就别再算了，把上次的结果直接还给我」。它缓存的是「值」，不是组件。',
          },
          {
            type: 'text',
            title: '1）是什么：给「计算结果」加一层缓存',
            body: '先记住一个事实：**每次渲染，组件函数都会从第一行执行到最后一行**。\n\n也就是说，只要任何一个 state 变了（哪怕是一个跟计算完全无关的输入框），你写在组件里的这行代码就会重新跑一遍：\n\n`const total = 一个很慢的计算(list)`\n\nuseMemo 就是给这行代码套一个「缓存盒子」：\n\n`const total = useMemo(() => 一个很慢的计算(list), [list])`\n\n含义是：React，请你记住这次算出来的结果；下次渲染时如果 `list` 还是同一个（用 Object.is 比较），就直接把上次的结果还给我，不要再算了。\n\n注意两点：\n\n• 第一个参数是**一个函数**（不是计算结果本身），React 需要它才能决定「要不要执行」。\n\n• 第二个参数是依赖数组，规则和 useEffect 完全一样：数组里的任意一项变了，就重新计算。',
          },
          {
            type: 'text',
            title: '2）为什么需要它：无关的 state 也会引发重算',
            body: '典型场景：一个页面里有「一万条数据的统计/排序/过滤」，同时还有一个搜索框、一个开关、一个分页器。\n\n用户在搜索框里敲一个字 → setState → 组件重新渲染 → 那段「一万条数据的统计」又算了一遍 → 每敲一个字卡一下。\n\n这不是 React 的 bug，而是函数组件的运行方式：函数重新执行，里面的所有语句自然都会重新执行。\n\nuseMemo 让你精确地说明：这个值只依赖 `data`，跟输入框没关系，所以敲字的时候别重算。\n\n还有第二个用途（下一节会细讲）：**保持引用稳定**。对象/数组每次渲染都是新建的，`{} !== {}`，把它传给 `React.memo` 包裹的子组件会让 memo 失效；用 useMemo 缓存住，引用就稳定了。',
          },
          {
            type: 'code',
            title: '基本写法（对照：不用 vs 用）',
            language: 'jsx',
            body: `import { useMemo, useState } from 'react'

function Report({ orders }) {
  const [keyword, setKeyword] = useState('')

  // ❌ 不用 useMemo：keyword 每敲一个字，下面这段统计就重算一遍
  // const stats = orders.reduce((acc, o) => { /* 很重的统计 */ }, {})

  // ✅ 用 useMemo：只有 orders 变化时才重新统计
  const stats = useMemo(() => {
    return orders.reduce(
      (acc, o) => {
        acc.count += 1                 // 累计订单数
        acc.amount += o.amount         // 累计金额
        return acc
      },
      { count: 0, amount: 0 }
    )
  }, [orders]) // 依赖 orders：换了数据才重算，敲字不重算

  // ✅ 过滤也是同理：依赖 orders 和 keyword 两个值
  const filtered = useMemo(() => {
    return orders.filter((o) => o.name.includes(keyword))
  }, [orders, keyword])

  return (
    <div>
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <p>共 {stats.count} 单，合计 {stats.amount} 元</p>
      <p>匹配 {filtered.length} 条</p>
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：关掉缓存每敲一个字都卡，打开缓存立刻顺滑',
            body: `import { useMemo, useRef, useState } from 'react' // useMemo 缓存慢计算的结果

const LOOP = 12000000 // 循环 1200 万次：故意让这个计算慢到你能明显感觉到

function slowSum(seed) { // 一个「很慢」的纯计算函数，模拟真实项目里的大数据统计
  let total = 0 // 累加结果
  for (let i = 0; i < LOOP; i++) { // 空转一千两百万次
    total += (i % 7) * seed // 随便算点东西，防止引擎把循环优化掉
  }
  return total // 返回结果
}

export default function Demo() {
  const [seed, setSeed] = useState(1) // 参与慢计算的数字：只有它变了才「应该」重算
  const [text, setText] = useState('') // 和慢计算毫无关系的输入框
  const [useCache, setUseCache] = useState(true) // 开关：是否启用 useMemo
  const runs = useRef(0) // 记录慢计算真正被执行了多少次

  const cached = useMemo(() => { // 缓存版：只有 seed 变化时才执行里面的函数
    runs.current += 1 // 真算了一次
    const t0 = performance.now() // 开始计时
    const value = slowSum(seed) // 执行慢计算
    return { value, ms: Math.round(performance.now() - t0) } // 结果和耗时一起缓存
  }, [seed]) // 依赖数组：seed 没变就直接复用上一次的返回值

  let result = cached // 默认用缓存版的结果
  if (!useCache) { // 关掉缓存：每次渲染都老老实实重算一遍
    runs.current += 1 // 计数 +1
    const t0 = performance.now() // 开始计时
    const value = slowSum(seed) // 又算一次（敲字也会走到这里）
    result = { value, ms: Math.round(performance.now() - t0) } // 覆盖上面的缓存结果
  }

  return (
    <div style={{ padding: 16 }}>
      <label style={{ display: 'block', marginBottom: 10 }}>
        <input
          type="checkbox"
          checked={useCache} // 勾上 = 走 useMemo 缓存
          onChange={(e) => setUseCache(e.target.checked)}
        />{' '}
        启用 useMemo 缓存
      </label>

      <input
        value={text} // 这个输入框跟慢计算一点关系都没有
        onChange={(e) => setText(e.target.value)} // 但它会触发重新渲染
        placeholder="在这里快速敲一串字，感受卡不卡"
        style={{ width: '100%', padding: 8, marginBottom: 10, boxSizing: 'border-box' }}
      />

      <button
        type="button"
        onClick={() => setSeed((s) => s + 1)} // 改 seed：这时候「应该」重算
        style={{ padding: '6px 14px', marginBottom: 12 }}
      >
        换一个 seed（当前 {seed}）
      </button>

      <div style={{ padding: 12, background: '#f5f5f5', borderRadius: 6, lineHeight: 2 }}>
        <div>计算结果：{result.value}</div>
        <div>本次计算耗时：<b>{result.ms} ms</b>（0 表示直接命中了缓存）</div>
        <div>慢计算累计执行：<b style={{ color: useCache ? '#389e0d' : '#cf1322' }}>{runs.current}</b> 次</div>
      </div>

      <p style={{ fontSize: 12, color: '#888', lineHeight: 1.7 }}>
        取消勾选后在输入框里敲一串字：每个字都要等一下，执行次数疯涨；
        重新勾上再敲：瞬间响应，执行次数不动——因为 seed 没变。
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
            title: 'Live Demo：useMemo 缓存过滤后的列表——点无关按钮不会重新过滤',
            body: `import { useMemo, useRef, useState } from 'react' // 缓存「过滤结果」这种派生数据

const ALL = Array.from({ length: 3000 }, (_, i) => ({ // 造 3000 条假数据，只在模块加载时造一次
  id: i + 1, // 唯一 id，用作列表 key
  name: '组件 ' + (i + 1), // 名称
  type: ['表单', '导航', '反馈'][i % 3], // 轮流分三类
}))

export default function Demo() {
  const [keyword, setKeyword] = useState('') // 搜索关键字
  const [tick, setTick] = useState(0) // 一个跟过滤完全无关的计数器
  const filterRuns = useRef(0) // 记录过滤函数真正跑了几次

  const filtered = useMemo(() => { // 只有 keyword 变化时才重新过滤
    filterRuns.current += 1 // 真过滤了一次
    const k = keyword.trim() // 去掉首尾空格
    return ALL.filter((it) => it.name.includes(k) || it.type.includes(k)) // 名称或分类命中都算
  }, [keyword]) // 依赖只有 keyword：点计数器按钮不会重新过滤

  const top = useMemo(() => filtered.slice(0, 8), [filtered]) // 只展示前 8 条，也顺手缓存一下

  return (
    <div style={{ padding: 16 }}>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)} // 改关键字 → 依赖变 → 重新过滤
        placeholder="试试输入：表单 / 导航 / 组件 12"
        style={{ width: '100%', padding: 8, marginBottom: 10, boxSizing: 'border-box' }}
      />

      <button
        type="button"
        onClick={() => setTick((t) => t + 1)} // 只改 tick：触发重新渲染，但不该触发重新过滤
        style={{ padding: '6px 12px', marginBottom: 10 }}
      >
        无关计数器 +1（当前 {tick}）
      </button>

      <p style={{ margin: '6px 0' }}>
        命中 <b>{filtered.length}</b> 条 ｜ 过滤函数累计执行 <b>{filterRuns.current}</b> 次
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {top.map((it) => ( // 渲染前 8 条
          <li key={it.id} style={{ padding: 8, borderBottom: '1px solid #f0f0f0' }}>
            {it.name} <span style={{ color: '#999', fontSize: 12 }}>{it.type}</span>
          </li>
        ))}
      </ul>

      <p style={{ fontSize: 12, color: '#888', lineHeight: 1.7 }}>
        狂点「无关计数器」：界面在重新渲染，但「过滤函数累计执行」纹丝不动；
        一改关键字它才 +1。这就是 useMemo 的作用。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '3）什么时候真的需要 useMemo？',
            headers: ['场景', '要不要用', '原因'],
            rows: [
              ['a + b、字符串拼接、取长度', '❌ 不要', '本来就是纳秒级，包一层反而更慢'],
              ['几十条数据的 filter / map', '❌ 不要', '现代浏览器毫无压力'],
              ['几千上万条数据的排序/统计', '✅ 要', '一次几十毫秒，会让输入卡顿'],
              ['把对象/数组传给 memo 子组件', '✅ 要', '保持引用稳定，否则 memo 白包'],
              ['作为其他 Hook 的依赖项', '✅ 要', '引用不稳定会让 effect 反复重跑'],
              ['值本身每次渲染都会变', '❌ 没用', '依赖一直变，缓存永远命中不了'],
            ],
            note: '判断标准：先测量，再优化。React DevTools Profiler 里看到某次渲染确实慢，再考虑 useMemo；不要「预防性」到处包。',
          },
          {
            type: 'text',
            title: '4）易错点汇总',
            body: '① **传错了第一个参数**：`useMemo(slowSum(list), [list])` 是错的——这样等于先把函数执行了，缓存了个寂寞。必须写 `useMemo(() => slowSum(list), [list])`。\n\n② **依赖漏写**：`useMemo(() => filter(list, keyword), [list])` 漏了 keyword，结果关键字变了列表却不更新。规则和 useEffect 一样，函数体里用到的值都要进依赖数组。\n\n③ **依赖里放了每次都变的东西**：比如依赖一个每次渲染新建的对象，缓存永远失效，白白多了一次比较。\n\n④ **在 useMemo 里写副作用**：不要在里面 setState、发请求、操作 DOM——那是 useEffect 的活。useMemo 应该是一个纯计算。\n\n⑤ **到处滥用**：useMemo 本身也有成本（存函数、存依赖、每次比较）。给 `a+b` 包一层是净亏损，还让代码变难读。\n\n⑥ **以为它能保证「只算一次」**：不能。React 有权在内存紧张时丢掉缓存重算，也不保证跨组件复用。它是性能优化，不是语义保证——你的代码不能依赖「它一定不会重算」。',
          },
          {
            type: 'list',
            title: '5）useMemo 自检清单',
            ordered: true,
            items: [
              '第一个参数写的是箭头函数（() => 结果），不是直接调用？',
              '函数体里用到的每个变量都进依赖数组了吗？',
              '这个计算真的慢吗？还是我在「预防性优化」？',
              '包起来的值是不是要传给 React.memo 子组件 / 当作别的 Hook 的依赖？',
              'useMemo 里有没有混进 setState、请求这类副作用？',
              '依赖数组里有没有「每次渲染都新建」的对象或函数？',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'useMemo 缓存的是「值」。第一个参数必须是函数，依赖数组规则同 useEffect。只在两种情况用：计算真的很慢、或者需要稳定的引用传给 memo 子组件。其余情况直接写普通变量，更简单也更快。',
          },
        ],
      },
    },
    {
      id: 'usecallback-memo',
      title: 'useCallback 与 React.memo：减少不必要的子组件重渲染',
      summary: '函数每次渲染都是新引用，useCallback 稳住它，memo 才拦得住',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'React.memo 负责「props 没变就别重渲染」，useCallback 负责「让传下去的函数别每次都变成新的」。两个必须配合使用，单用其中一个基本没效果。',
          },
          {
            type: 'text',
            title: '1）先搞懂一件事：函数每次渲染都是全新的',
            body: '在组件里写：\n\n`function handleClick() { ... }` 或 `const handleClick = () => { ... }`\n\n每一次渲染，组件函数都会重新执行，于是这个函数**又被重新创建了一遍**。它的行为一模一样，但它是一个新对象、新地址。\n\n用代码说话：`(() => {}) === (() => {})` 的结果是 `false`。两个长得一样的函数，引用并不相等。\n\n平时这完全没关系——反正函数就是拿来调用的。但只要你把它当 props 传给一个被 `React.memo` 包裹的子组件，问题就来了。',
          },
          {
            type: 'text',
            title: '2）React.memo 是什么：给组件加一道「props 没变就跳过」的门',
            body: '默认情况下，父组件重新渲染，所有子组件都会跟着重新渲染——哪怕子组件的 props 一个字都没变。\n\n`React.memo(子组件)` 会在渲染前做一次检查：把这次的 props 和上次的 props **逐个字段用 Object.is 比较**（这叫「浅比较」）。全都相等 → 跳过这次渲染，直接复用上次的结果。\n\n于是关键问题出现了：\n\n父组件重渲染 → `onClick={() => ...}` 重新创建 → 这个 prop 的引用变了 → 浅比较判定「props 变了」→ memo 直接失效，子组件照样重渲染。\n\n**useCallback 就是来解决这个的**：`const handleClick = useCallback(() => { ... }, [])` 表示「依赖没变就把上次那个函数还给我」，引用稳定了，memo 才拦得住。\n\n记住这个搭配关系：useMemo 缓存值 → useCallback 缓存函数 → memo 缓存组件渲染结果。三件套本质是同一个思路。',
          },
          {
            type: 'code',
            title: '基本写法：memo + useCallback 配合',
            language: 'jsx',
            body: `import { memo, useCallback, useState } from 'react'

// React.memo 包裹：props 浅比较没变化就跳过重渲染
const TodoItem = memo(function TodoItem({ todo, onToggle }) {
  console.log('渲染 TodoItem', todo.id) // 用日志观察哪些子组件真的重渲染了
  return (
    <li onClick={() => onToggle(todo.id)}>
      {todo.done ? '✅' : '⬜'} {todo.title}
    </li>
  )
})

function TodoList() {
  const [todos, setTodos] = useState([{ id: 1, title: '学 Hooks', done: false }])
  const [keyword, setKeyword] = useState('') // 和列表无关的 state

  // ❌ 这样写：每次渲染都是新函数 → TodoItem 的 memo 完全失效
  // const handleToggle = (id) => setTodos(...)

  // ✅ useCallback：依赖 [] 不变 → 永远返回同一个函数引用
  const handleToggle = useCallback((id) => {
    // 函数式更新：不依赖外部的 todos，所以依赖数组能保持空
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }, []) // 空依赖：这个函数从头到尾都是同一个

  return (
    <div>
      {/* 敲这个输入框会让 TodoList 重渲染，但 TodoItem 不会 */}
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
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
            title: 'Live Demo：两个 memo 子组件，一个渲染次数疯涨、一个纹丝不动',
            body: `import { memo, useCallback, useRef, useState } from 'react' // memo 拦重渲染，useCallback 稳函数引用

// 子组件用 React.memo 包裹：props 浅比较没变化就跳过渲染
const Child = memo(function Child({ label, count, onAdd, tone }) {
  const renders = useRef(0) // 记录自己被渲染了多少次
  renders.current += 1 // 每次渲染 +1

  return (
    <div style={{ flex: 1, padding: 12, border: '2px solid ' + tone, borderRadius: 8 }}>
      <p style={{ margin: 0, fontSize: 13 }}>{label}</p>
      <p style={{ margin: '8px 0', fontSize: 13 }}>
        我被渲染了 <b style={{ fontSize: 22, color: tone }}>{renders.current}</b> 次
      </p>
      <button type="button" onClick={onAdd} style={{ padding: '4px 10px' }}>
        我的计数 +1（{count}）
      </button>
    </div>
  )
})

export default function Demo() {
  const [tick, setTick] = useState(0) // 和两个子组件都无关的计数器
  const [a, setA] = useState(0) // 左边子组件的计数
  const [b, setB] = useState(0) // 右边子组件的计数

  // ✅ useCallback 包一层：依赖是 []，所以每次渲染拿到的都是「同一个」函数
  const addB = useCallback(() => setB((v) => v + 1), []) // 用函数式更新，才不需要依赖 b

  return (
    <div style={{ padding: 16 }}>
      <button
        type="button"
        onClick={() => setTick((t) => t + 1)} // 只改 tick，两个子组件的数据都没变
        style={{ padding: '8px 16px', marginBottom: 12 }}
      >
        无关计数器 +1（当前 {tick}）
      </button>

      <div style={{ display: 'flex', gap: 12 }}>
        <Child
          label="❌ 收到「每次渲染都新建」的函数"
          count={a}
          tone="#cf1322"
          onAdd={() => setA((v) => v + 1)} // 内联箭头函数：每次渲染都是新引用 → memo 失效
        />
        <Child
          label="✅ 收到 useCallback 包过的函数"
          count={b}
          tone="#389e0d"
          onAdd={addB} // 引用稳定 → props 浅比较全等 → memo 成功跳过渲染
        />
      </div>

      <p style={{ fontSize: 12, color: '#888', lineHeight: 1.7 }}>
        狂点上面的「无关计数器」：左边的渲染次数一直涨，右边永远不动。
        （开发模式下 React 会故意多渲染一遍，数字可能是 2 的倍数，看趋势就行。）
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
            title: 'Live Demo：memo 只做浅比较——内联对象一样会让它失效',
            body: `import { memo, useMemo, useRef, useState } from 'react' // 对象也要缓存，不然 memo 照样白包

const Panel = memo(function Panel({ label, config, tone }) { // 同样用 memo 包裹
  const renders = useRef(0) // 自己的渲染计数
  renders.current += 1 // 每渲染一次 +1

  return (
    <div style={{ flex: 1, padding: 12, border: '2px solid ' + tone, borderRadius: 8 }}>
      <p style={{ margin: 0, fontSize: 13 }}>{label}</p>
      <p style={{ margin: '8px 0 0', fontSize: 13 }}>
        渲染次数：<b style={{ fontSize: 22, color: tone }}>{renders.current}</b>
      </p>
      <p style={{ margin: '6px 0 0', fontSize: 12, color: '#888' }}>
        主题 {config.theme} ／ 尺寸 {config.size}
      </p>
    </div>
  )
})

export default function Demo() {
  const [tick, setTick] = useState(0) // 无关计数器

  // ✅ 用 useMemo 把配置对象缓存住：依赖 [] → 永远是同一个对象引用
  const stableConfig = useMemo(() => ({ theme: 'dark', size: 'large' }), [])

  return (
    <div style={{ padding: 16 }}>
      <button
        type="button"
        onClick={() => setTick((t) => t + 1)} // 只是触发父组件重新渲染
        style={{ padding: '8px 16px', marginBottom: 12 }}
      >
        无关计数器 +1（当前 {tick}）
      </button>

      <div style={{ display: 'flex', gap: 12 }}>
        {/* 内联对象字面量：每次渲染都是一个「长得一样但地址不同」的新对象 */}
        <Panel label="❌ config={{ ... }} 内联对象" tone="#cf1322" config={{ theme: 'dark', size: 'large' }} />
        {/* useMemo 缓存过的对象：引用不变，浅比较通过 */}
        <Panel label="✅ config 用 useMemo 缓存" tone="#389e0d" config={stableConfig} />
      </div>

      <p style={{ fontSize: 12, color: '#888', lineHeight: 1.7 }}>
        两个 Panel 的内容完全一样，只有对象的「引用」不同。memo 只比较 props 的第一层（Object.is），
        所以左边每次都判定「props 变了」。函数要 useCallback，对象/数组要 useMemo。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '3）三件套分工对照',
            headers: ['API', '缓存什么', '典型写法', '单独用有没有效果'],
            rows: [
              ['useMemo', '一个计算出来的值', 'useMemo(() => 计算(), [dep])', '有（慢计算场景）'],
              ['useCallback', '一个函数（引用）', 'useCallback(fn, [dep])', '基本没有，要配 memo'],
              ['React.memo', '子组件的渲染结果', 'memo(Child)', '有，但 props 含函数/对象时会失效'],
            ],
            note: 'useCallback(fn, deps) 完全等价于 useMemo(() => fn, deps)，只是写起来更顺手。',
          },
          {
            type: 'text',
            title: '4）易错点汇总（这节的坑特别多）',
            body: '① **给所有函数都套 useCallback**：这是最常见的过度优化。如果这个函数只是给原生 `<button onClick>` 用，或者子组件根本没被 memo 包裹，useCallback 纯属浪费——它自己也要存函数、比依赖，还让代码变啰嗦。\n\n② **useCallback 了但子组件没 memo**：函数引用再稳定也没用，父组件一渲染子组件照样跟着渲染。两者必须成对出现。\n\n③ **memo 了但还传内联对象/数组/内联函数**：`style={{...}}`、`data={[...]}`、`onClick={() => ...}` 全都是每次新建的引用，memo 立刻失效（上面第二个 Demo 就是演示这个）。\n\n④ **依赖数组写错，闭包抓到旧值**：`useCallback(() => setCount(count + 1), [])` 里的 `count` 永远是第一次渲染的 0。解决办法是用函数式更新 `setCount(c => c + 1)`，就能安心保持空依赖。\n\n⑤ **memo 只做浅比较**：props 里传一个嵌套很深的对象，外层引用没变但内部字段改了，memo 会判定「没变」从而跳过渲染，界面就不更新了。要么保证不可变更新（每层都新建），要么别指望 memo。\n\n⑥ **props 里含 children**：`<Memo><div/></Memo>` 的 children 每次都是新的 React 元素对象，memo 通常拦不住。',
          },
          {
            type: 'list',
            title: '5）什么时候才值得用（自检清单）',
            ordered: true,
            items: [
              '子组件是不是真的「渲染起来很贵」（大列表、复杂图表）？',
              '子组件有没有用 React.memo 包裹？没包裹的话 useCallback 是白写的。',
              '传下去的 props 里还有没有内联对象、内联数组、内联函数？',
              'useCallback 的依赖数组能不能靠「函数式更新」缩成 []？',
              '有没有先用 React DevTools Profiler 确认过这里确实是瓶颈？',
              '优化之后代码可读性下降了多少？值不值？',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '函数每次渲染都是新引用 → 传给 memo 子组件会让浅比较失败 → 用 useCallback 稳住它。memo 只比较 props 第一层，所以对象和数组也要用 useMemo 缓存。默认不要优化，等 Profiler 指出瓶颈再优化。',
          },
        ],
      },
    },
    {
      id: 'usereducer-basic',
      title: 'useReducer：状态复杂时比 useState 更清晰',
      summary: '把「怎么改状态」集中到 reducer，组件只负责 dispatch 一个动作',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'useReducer = 把散落各处的 setState 收拢成一个函数：组件只喊「发生了什么」（dispatch 一个 action），reducer 统一决定「状态该变成什么样」。',
          },
          {
            type: 'text',
            title: '1）三个新名词：state / action / dispatch',
            body: '别被名字吓到，它们特别简单：\n\n• **state**：当前的状态对象，和 useState 里的 state 完全是一个意思。\n\n• **action**：一个描述「发生了什么事」的普通对象，惯例是 `{ type: "增加", payload: 数据 }`。type 是事件名字，payload 是附带的数据（可以没有）。\n\n• **dispatch**：一个函数，用来「派发」action。你调用 `dispatch({ type: "increment" })`，就等于告诉 React：发生了一件叫 increment 的事，请更新状态。\n\n再加一个主角：\n\n• **reducer**：形如 `(state, action) => 新的 state` 的**纯函数**。它是唯一决定状态怎么变的地方，内部通常是一个 `switch (action.type)`。\n\n写法：`const [state, dispatch] = useReducer(reducer, 初始state)`\n\n流程：点击按钮 → `dispatch(action)` → React 调用 `reducer(当前state, action)` → 拿到返回值当作新 state → 重新渲染。\n\n重点：reducer 必须是纯函数——只根据入参算出新对象返回，**不要修改原 state**（要 `{ ...state, x: 1 }` 而不是 `state.x = 1`），也不要在里面发请求、打接口、操作 DOM。',
          },
          {
            type: 'code',
            title: '基本骨架（背下这个形状就够了）',
            language: 'jsx',
            body: `import { useReducer } from 'react'

// ① 初始状态：一个普通对象
const initialState = { count: 0 }

// ② reducer：(旧 state, action) => 新 state，必须是纯函数
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }        // 返回新对象，不要改 state
    case 'decrement':
      return { count: state.count - 1 }
    case 'addBy':
      return { count: state.count + action.payload } // payload 携带数据
    case 'reset':
      return initialState                       // 直接回到初始状态
    default:
      return state                              // 认不出的 action 原样返回
  }
}

function Counter() {
  // ③ useReducer 返回 [当前状态, 派发函数]
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      <p>{state.count}</p>
      {/* ④ 组件里不写「怎么改」，只说「发生了什么」 */}
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'addBy', payload: 10 })}>+10</button>
      <button onClick={() => dispatch({ type: 'reset' })}>重置</button>
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：同一个计数器——useState 版 vs useReducer 版并排对照',
            body: `import { useReducer, useState } from 'react' // 左右两栏用两种方式实现同一个功能

// ===== useReducer 版：所有「状态怎么变」的逻辑都集中在这个函数里 =====
function reducer(state, action) { // (旧状态, 动作) => 新状态，纯函数
  switch (action.type) { // 按动作类型分支
    case 'inc': return { count: state.count + 1 } // 加一
    case 'dec': return { count: Math.max(0, state.count - 1) } // 减一，但不小于 0
    case 'addBy': return { count: state.count + action.payload } // 加上 payload 里的数
    case 'reset': return { count: 0 } // 归零
    default: return state // 不认识的动作，原样返回
  }
}

export default function Demo() {
  const [count, setCount] = useState(0) // 左栏：普通 useState

  const [state, dispatch] = useReducer(reducer, { count: 0 }) // 右栏：useReducer

  const col = { flex: 1, padding: 12, border: '1px solid #eee', borderRadius: 8 } // 两栏共用样式
  const btn = { padding: '4px 10px', marginRight: 6 } // 按钮共用样式

  return (
    <div style={{ display: 'flex', gap: 12, padding: 16 }}>
      <div style={col}>
        <p style={{ marginTop: 0, fontSize: 13, color: '#888' }}>useState 版</p>
        <p style={{ fontSize: 30, margin: '6px 0' }}>{count}</p>
        {/* 每个按钮自己写一遍「怎么改」，逻辑散落在 JSX 里 */}
        <button type="button" style={btn} onClick={() => setCount((c) => c + 1)}>+1</button>
        <button type="button" style={btn} onClick={() => setCount((c) => Math.max(0, c - 1))}>-1</button>
        <button type="button" style={btn} onClick={() => setCount((c) => c + 10)}>+10</button>
        <button type="button" style={btn} onClick={() => setCount(0)}>重置</button>
      </div>

      <div style={col}>
        <p style={{ marginTop: 0, fontSize: 13, color: '#888' }}>useReducer 版</p>
        <p style={{ fontSize: 30, margin: '6px 0' }}>{state.count}</p>
        {/* 按钮只负责「说发生了什么」，怎么改由 reducer 统一决定 */}
        <button type="button" style={btn} onClick={() => dispatch({ type: 'inc' })}>+1</button>
        <button type="button" style={btn} onClick={() => dispatch({ type: 'dec' })}>-1</button>
        <button type="button" style={btn} onClick={() => dispatch({ type: 'addBy', payload: 10 })}>+10</button>
        <button type="button" style={btn} onClick={() => dispatch({ type: 'reset' })}>重置</button>
      </div>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '2）useState 和 useReducer 怎么选？',
            headers: ['情况', '选谁', '理由'],
            rows: [
              ['一两个独立的简单值', 'useState', 'useReducer 是杀鸡用牛刀'],
              ['多个字段要一起改', 'useReducer', '一次 dispatch 改一整组，不会漏改'],
              ['新状态依赖旧状态的复杂规则', 'useReducer', '规则集中在 reducer，好读好测'],
              ['同一份状态有很多种操作方式', 'useReducer', '一个 switch 一览无余'],
              ['要把「怎么改」传给深层子组件', 'useReducer', 'dispatch 引用天生稳定，传下去不破坏 memo'],
              ['逻辑想单独写单元测试', 'useReducer', 'reducer 是纯函数，脱离 React 也能测'],
            ],
            note: '判断信号：当你发现一个事件处理函数里连着调了三四个 setXxx，或者不同 setXxx 之间有「必须同时改」的约束时，就该换 useReducer 了。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：一个 reducer 管住 Todo 的全部状态（输入框 + 列表 + 筛选）',
            body: `import { useReducer } from 'react' // 多字段状态交给一个 reducer 统一管理

const initialState = { // 初始状态：四个字段全放在一个对象里
  text: '', // 输入框内容
  filter: 'all', // 当前筛选：all / active / done
  list: [ // 待办列表
    { id: 1, title: '看懂 useReducer 的三个名词', done: true },
    { id: 2, title: '把这个 Demo 改成自己的', done: false },
  ],
  nextId: 3, // 下一条的 id，也是状态的一部分
}

function reducer(state, action) { // 所有的状态变化规则都写在这里
  switch (action.type) {
    case 'input': // 用户在输入框里打字
      return { ...state, text: action.payload } // 展开旧状态，只覆盖 text

    case 'add': { // 新增一条待办
      const title = state.text.trim() // 去掉首尾空格
      if (!title) return state // 空内容不处理，原样返回（React 会跳过更新）
      return {
        ...state,
        text: '', // 顺手清空输入框 —— 一次 dispatch 同时改了三个字段
        nextId: state.nextId + 1, // id 自增
        list: [...state.list, { id: state.nextId, title, done: false }], // 新数组，不用 push
      }
    }

    case 'toggle': // 勾选 / 取消勾选
      return {
        ...state,
        list: state.list.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t)), // 只替换命中的那一项
      }

    case 'remove': // 删除一条
      return { ...state, list: state.list.filter((t) => t.id !== action.id) } // filter 生成新数组

    case 'filter': // 切换筛选条件
      return { ...state, filter: action.payload }

    case 'clearDone': // 清空所有已完成
      return { ...state, list: state.list.filter((t) => !t.done) }

    default:
      return state // 兜底：认不出的 action 不改状态
  }
}

export default function Demo() {
  const [state, dispatch] = useReducer(reducer, initialState) // 一行拿到状态和派发函数

  const shown = state.list.filter((t) => // 根据筛选条件算出要显示的列表（派生数据，不进 state）
    state.filter === 'all' ? true : state.filter === 'done' ? t.done : !t.done
  )

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input
          value={state.text} // 值来自 reducer 管理的 state
          onChange={(e) => dispatch({ type: 'input', payload: e.target.value })} // 派发「输入」动作
          onKeyDown={(e) => e.key === 'Enter' && dispatch({ type: 'add' })} // 回车也能添加
          placeholder="输入待办，回车或点按钮添加"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="button" onClick={() => dispatch({ type: 'add' })} style={{ padding: '6px 14px' }}>添加</button>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 10, fontSize: 13 }}>
        {['all', 'active', 'done'].map((f) => ( // 三个筛选按钮由数组生成
          <button
            key={f}
            type="button"
            onClick={() => dispatch({ type: 'filter', payload: f })} // 派发「切换筛选」
            style={{ padding: '4px 10px', fontWeight: state.filter === f ? 700 : 400 }}
          >
            {{ all: '全部', active: '未完成', done: '已完成' }[f]}
          </button>
        ))}
        <button type="button" onClick={() => dispatch({ type: 'clearDone' })} style={{ padding: '4px 10px' }}>清除已完成</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {shown.map((t) => ( // 渲染筛选后的列表
          <li key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, borderBottom: '1px solid #f0f0f0' }}>
            <input type="checkbox" checked={t.done} onChange={() => dispatch({ type: 'toggle', id: t.id })} />
            <span style={{ flex: 1, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#999' : '#141414' }}>
              {t.title}
            </span>
            <button type="button" onClick={() => dispatch({ type: 'remove', id: t.id })} style={{ padding: '2px 8px' }}>删除</button>
          </li>
        ))}
      </ul>

      <pre style={{ marginTop: 12, padding: 10, background: '#fafafa', border: '1px solid #eee', borderRadius: 6, fontSize: 12 }}>
        {JSON.stringify(state, null, 2)}
      </pre>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '3）和 Redux 什么关系？（学完这节再看 Redux 会很轻松）',
            body: 'Redux 的核心思想和 useReducer **一模一样**：\n\n`(state, action) => newState`\n\n对照关系：\n\n• useReducer 的 reducer ↔ Redux 的 reducer（Redux Toolkit 里叫 `createSlice` 的 `reducers`）\n\n• useReducer 的 dispatch ↔ Redux 的 dispatch（配 `useDispatch()` 拿到）\n\n• useReducer 的 state ↔ Redux 的 store 里的一小片 state（配 `useSelector()` 取出）\n\n• `{ type, payload }` 这个 action 形状，两边完全一致\n\n**唯一的区别是作用范围**：useReducer 的状态只属于**当前这个组件**（组件卸载就没了）；Redux 的 store 是**全局**的，任何组件都能读能改，还有 DevTools 时间旅行、中间件、持久化这些配套。\n\n所以路线是：先用 useReducer 把「状态集中管理」这套思路练熟 → 再去看第 16 章 Redux，你会发现只是把同一套东西搬到了全局，几乎没有新概念要学。\n\n什么时候该从 useReducer 升级到 Redux？当同一份状态需要被**很多个不相邻的组件**共享，而你已经开始层层往下传 props（俗称 props drilling）的时候。中间还有一档过渡方案：useReducer + useContext（第 11 章讲过），足够应付中小型项目。',
          },
          {
            type: 'text',
            title: '4）易错点汇总',
            body: '① **在 reducer 里直接改 state**：`state.count++` 或 `state.list.push(x)` 之后再 `return state`——React 发现引用没变，直接跳过渲染，界面纹丝不动。必须返回**新对象/新数组**。\n\n② **忘了 `...state`**：写成 `return { text: "" }` 会把其他字段全弄丢。改单个字段的标准写法是 `{ ...state, text: "" }`。\n\n③ **在 reducer 里发请求 / 打日志 / 操作 DOM**：reducer 必须纯净。副作用放在事件处理函数或 useEffect 里，请求回来之后再 dispatch 一个 `{ type: "loaded", payload: data }`。\n\n④ **default 分支不写或者抛错**：建议 `default: return state`（宽容）或 `throw new Error("未知 action: " + action.type)`（严格，能尽早发现拼错的 type）。二选一，别什么都不写导致返回 undefined。\n\n⑤ **action.type 拼写错误**：`"increment"` 写成 `"incremnet"`，reducer 走进 default，状态不变，还不报错，非常难查。可以把 type 抽成常量，或用 TypeScript 约束（第 17 章）。\n\n⑥ **把派生数据存进 state**：像上面 Demo 里的 `shown`，是由 `list` 和 `filter` 算出来的，直接在渲染时算就行，存进 state 只会带来「忘了同步」的 bug。',
          },
          {
            type: 'list',
            title: '5）useReducer 自检清单',
            ordered: true,
            items: [
              'reducer 是纯函数吗（没有请求、没有随机数、没有改入参）？',
              '每个 case 都返回了「新对象」，而不是改完旧的再返回？',
              '只改一个字段时，有没有先 ...state 把其他字段带上？',
              'default 分支写了吗？',
              'action 的形状统一吗（都是 { type, payload }）？',
              '这些状态是不是真的复杂到需要 reducer？两个独立的布尔值用 useState 就好。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'useReducer(reducer, 初始值) 返回 [state, dispatch]。组件只 dispatch「发生了什么」，reducer 用 switch 决定「状态变成什么」，必须返回新对象。多字段联动、操作种类多的时候用它；它就是缩小版的 Redux，学会它 Redux 那章几乎零成本。',
          },
        ],
      },
    },
    {
      id: 'react19-hooks',
      title: '了解即可：React 19 的新 Hook（useTransition / useOptimistic / useId / useDeferredValue）',
      summary: 'React 19 新增的四个 Hook，先知道有，遇到对应场景再回来查',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '这四个 Hook 解决的都是「体验」问题：让界面在忙的时候不卡死、让操作看起来秒回、让 id 不重复。新手先知道它们存在，遇到卡顿和「等接口」的场景再回来用。',
          },
          {
            type: 'text',
            title: '0）先说清楚：为什么现在讲这个',
            body: '本项目用的是 **React 19**（可以在 package.json 里看到 `"react": "^19.x"`），所以下面这些 Hook 你现在就能直接用，不需要额外装任何东西。\n\n但它们和 useState / useEffect 不是一个层级的东西：\n\n• useState、useEffect、useRef 是**每天都要用**的地基。\n\n• 这四个是**解决特定体验问题**的工具，一个项目里可能一个月都用不上一次。\n\n所以这一节的目标只有一个：**让你知道有这么个东西、大概解决什么问题**。每个 Hook 配了一个能直接玩的小 Demo，玩一遍留个印象就够了，不用背。',
          },
          {
            type: 'text',
            title: '1）useTransition：把「不着急的更新」标记成低优先级',
            body: '写法：`const [isPending, startTransition] = useTransition()`\n\n场景：搜索框下面挂着一个几千条的列表。你每敲一个字，既要更新输入框（用户马上要看到），又要重新过滤并渲染整个大列表（很慢）。React 默认把这两件事一视同仁，结果就是输入框跟着列表一起卡。\n\nuseTransition 让你区分优先级：\n\n```\nsetText(值)                                   // 紧急：输入框立刻更新\nstartTransition(() => setQuery(值))           // 不紧急：大列表慢慢来，可以被打断\n```\n\n被 `startTransition` 包住的更新会被 React 降级：如果期间来了更紧急的更新（比如你又敲了一个字），React 会**丢弃**正在进行的那次渲染，重新来过。输入框因此始终跟手。\n\n`isPending` 是个布尔值，在这个低优先级更新完成之前是 `true`，正好拿来显示「加载中」的灰色状态。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：useTransition——敲字时输入框跟手，大列表慢慢跟上',
            body: `import { useState, useTransition } from 'react' // useTransition 区分「紧急」和「不紧急」的更新

const ALL = Array.from({ length: 3000 }, (_, i) => '列表项 ' + (i + 1)) // 3000 条假数据

export default function Demo() {
  const [text, setText] = useState('') // 输入框的值：必须立刻响应（紧急）
  const [query, setQuery] = useState('') // 真正用来过滤列表的值（不紧急）
  const [isPending, startTransition] = useTransition() // isPending 表示「低优先级更新还没做完」

  function handleChange(e) {
    const value = e.target.value // 先把值取出来（事件对象不能异步复用）
    setText(value) // ① 紧急更新：输入框马上显示新字符
    startTransition(() => setQuery(value)) // ② 非紧急更新：列表可以慢一点，还可以被后来的输入打断
  }

  const list = ALL.filter((s) => s.includes(query.trim())) // 根据 query 过滤（渲染上千个 li 很慢）

  return (
    <div style={{ padding: 16 }}>
      <input
        value={text}
        onChange={handleChange}
        placeholder="快速连打几个数字，比如 1 2 3"
        style={{ width: '100%', padding: 8, marginBottom: 8, boxSizing: 'border-box' }}
      />

      <p style={{ margin: '6px 0', fontSize: 13, color: isPending ? '#d46b08' : '#389e0d' }}>
        {isPending ? '⏳ 列表更新中（isPending = true），但输入框依然跟手' : '✅ 列表已是最新（isPending = false）'}
        ｜ 命中 {list.length} 条
      </p>

      {/* opacity 变淡：一个很常见的「旧内容还在，新内容在路上」的过渡效果 */}
      <div style={{ height: 180, overflowY: 'auto', border: '1px solid #eee', borderRadius: 6, opacity: isPending ? 0.5 : 1 }}>
        {list.slice(0, 800).map((s) => ( // 最多渲染 800 条，已经足够慢了
          <div key={s} style={{ padding: '4px 10px', fontSize: 13, borderBottom: '1px solid #fafafa' }}>{s}</div>
        ))}
      </div>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '2）useOptimistic：先假装成功，失败了再回滚',
            body: '写法：`const [乐观值, 添加乐观更新] = useOptimistic(真实值, (当前值, 传入的数据) => 新的临时值)`\n\n场景：点赞、收藏、发消息。你点一下「赞」，如果老老实实等接口返回再 +1，用户会觉得「这按钮是不是坏了」。成熟的产品都是**先让数字变成 +1**，等接口真的成功了就保持，失败了再退回去。这套做法叫「乐观更新」。\n\n以前要手写一堆临时 state 和回滚逻辑，React 19 把它内置成了一个 Hook：\n\n• 第一个参数是**真实的**状态（只有请求成功后才更新它）。\n\n• 第二个参数是一个函数，描述「在等待期间，界面应该显示成什么样」。\n\n• 返回的第一个值就是给界面用的：请求进行中显示乐观值，请求结束后自动变回真实值。\n\n**关键约束**：调用「添加乐观更新」这个函数必须在一次 transition（`startTransition`）或表单 action 里面，否则 React 会警告。也正因如此，它天生和 `useTransition` 搭配使用。\n\n最妙的地方是**回滚不用你写**：只要请求失败时不去更新真实值，transition 一结束，乐观值自动消失、数字自己退回去。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：useOptimistic——点赞数先变，请求失败自动回滚',
            body: `import { useOptimistic, useState, useTransition } from 'react' // React 19 的乐观更新

function fakeRequest(shouldFail) { // 用 setTimeout 模拟一次 1.2 秒的网络请求（演示环境不发真实请求）
  return new Promise((resolve, reject) => {
    setTimeout(() => (shouldFail ? reject(new Error('网络开小差了')) : resolve()), 1200)
  })
}

export default function Demo() {
  const [likes, setLikes] = useState(10) // 真实的点赞数：只有请求成功才会改它
  const [failNext, setFailNext] = useState(false) // 勾上就让下一次请求失败
  const [msg, setMsg] = useState('点一下试试') // 状态提示文字
  const [isPending, startTransition] = useTransition() // 乐观更新必须在 transition 里进行

  // 第一个参数是真实值；第二个参数说明「等待期间界面显示成什么样」
  const [optimisticLikes, addOptimistic] = useOptimistic(likes, (current, delta) => current + delta)

  function handleLike() {
    startTransition(async () => { // React 19 支持 async 的 transition
      addOptimistic(1) // ① 先假装成功：界面上的数字立刻 +1
      setMsg('⏳ 请求中…（数字已经先加上了）')
      try {
        await fakeRequest(failNext) // ② 等「接口」返回
        setLikes((n) => n + 1) // ③ 成功：把真实值也加上，数字稳稳停在新值
        setMsg('✅ 成功，真实数据已更新')
      } catch (err) {
        setMsg('❌ ' + err.message + '——真实值没变，数字自动回滚了') // ④ 失败：什么都不做，乐观值消失即回滚
      }
    })
  }

  return (
    <div style={{ padding: 16 }}>
      <label style={{ display: 'block', marginBottom: 12 }}>
        <input type="checkbox" checked={failNext} onChange={(e) => setFailNext(e.target.checked)} />{' '}
        让下一次请求失败（看回滚效果）
      </label>

      <button
        type="button"
        onClick={handleLike}
        disabled={isPending} // 请求中禁用，避免连点
        style={{ padding: '10px 20px', fontSize: 16, cursor: isPending ? 'not-allowed' : 'pointer' }}
      >
        👍 点赞 {optimisticLikes}
      </button>

      <p style={{ marginTop: 12, fontSize: 13 }}>{msg}</p>
      <p style={{ fontSize: 12, color: '#888', lineHeight: 1.7 }}>
        界面显示的是「乐观值」{optimisticLikes}，服务器上的「真实值」是 {likes}。
        请求成功时两者最终一致；请求失败时乐观值自动作废，你不需要写任何回滚代码。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '3）useDeferredValue：让「跟着变的那个值」慢一拍',
            body: '写法：`const 延迟值 = useDeferredValue(值)`\n\n它和 useTransition 解决同一个问题（大列表拖慢输入），区别在于**你控制的是谁**：\n\n• useTransition 包住的是**更新动作**（我来决定哪次 setState 不紧急）——适合更新在你自己手里的场景。\n\n• useDeferredValue 包住的是**一个值**（这个值可以慢一点跟上）——适合值是别人传给你的（比如 props），你没法去改人家的 setState。\n\n用法上，你会拿到一个「延迟版」的值：紧急渲染时它还是旧的，等空闲了再更新成新的。用 `值 !== 延迟值` 就能判断「现在显示的是不是过期内容」，拿来做变灰效果。\n\n和防抖（debounce）的区别：防抖是**固定等 500ms**，机器快慢都一样等；useDeferredValue 是**跟着设备性能走**，快的设备几乎没有延迟，慢的设备才会明显延后。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：useDeferredValue——输入框秒回，列表用「过期内容」顶着',
            body: `import { useDeferredValue, useMemo, useState } from 'react' // 让某个值「慢一拍」跟上

const ALL = Array.from({ length: 3000 }, (_, i) => '数据行 ' + (i + 1)) // 3000 条假数据

export default function Demo() {
  const [text, setText] = useState('') // 输入框的即时值
  const deferred = useDeferredValue(text) // 延迟版的值：忙的时候它还是旧的
  const isStale = text !== deferred // 两者不相等 = 下面显示的是「过期内容」

  const list = useMemo( // 用延迟值去做重计算，输入框就不会被它拖慢
    () => ALL.filter((s) => s.includes(deferred.trim())), // 过滤 3000 条
    [deferred] // 注意依赖的是 deferred，不是 text
  )

  return (
    <div style={{ padding: 16 }}>
      <input
        value={text} // 输入框绑的是即时值，所以永远跟手
        onChange={(e) => setText(e.target.value)}
        placeholder="连续快速输入，观察下面变灰的一瞬间"
        style={{ width: '100%', padding: 8, marginBottom: 8, boxSizing: 'border-box' }}
      />

      <p style={{ margin: '6px 0', fontSize: 13 }}>
        即时值：<b>{text || '（空）'}</b> ｜ 延迟值：<b>{deferred || '（空）'}</b> ｜ 命中 {list.length} 条
      </p>

      <div style={{ height: 160, overflowY: 'auto', border: '1px solid #eee', borderRadius: 6, opacity: isStale ? 0.4 : 1, transition: 'opacity .2s' }}>
        {list.slice(0, 600).map((s) => ( // 渲染 600 行，制造一点渲染压力
          <div key={s} style={{ padding: '4px 10px', fontSize: 13, borderBottom: '1px solid #fafafa' }}>{s}</div>
        ))}
      </div>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '4）useId：生成全局唯一且稳定的 id',
            body: '写法：`const id = useId()`\n\n这个最简单，用途也最窄：给表单元素生成 id，好让 `<label htmlFor>` 能正确关联输入框（点文字就能聚焦输入框，屏幕阅读器也需要它）。\n\n那为什么不直接写 `id="username"`？因为组件是会被**复用**的。同一个 `<Field />` 在页面上出现三次，就会有三个 `id="username"`，HTML 里 id 重复是非法的，label 会关联到错的那一个。\n\n那为什么不用 `Math.random()`？因为每次渲染都会变，而且服务端渲染（SSR）时服务端和客户端生成的值对不上，React 会报 hydration 不匹配的错。useId 保证：**同一个组件实例每次渲染拿到的都是同一个 id，不同实例之间不重复，服务端客户端也一致**。\n\n一个组件里需要多个 id 时，不用调用多次，加后缀就行：`id + "-name"`、`id + "-email"`。\n\n⚠️ 不要用 useId 生成列表的 `key`，key 应该来自数据本身的唯一标识（比如后端返回的 id）。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：useId——同一个组件用三次，id 各不相同、点标签能聚焦',
            body: `import { useId, useState } from 'react' // useId 给可复用组件生成唯一 id

function Field({ label, placeholder }) { // 一个可以被反复使用的输入框组件
  const id = useId() // 每个组件实例都会拿到一个独一无二、且跨渲染稳定的 id

  return (
    <div style={{ marginBottom: 12 }}>
      {/* htmlFor 要和 input 的 id 对上，点击文字才能聚焦到输入框 */}
      <label htmlFor={id} style={{ display: 'block', fontSize: 13, marginBottom: 4, cursor: 'pointer' }}>
        {label}（点我试试聚焦）
      </label>
      <input id={id} placeholder={placeholder} style={{ width: '100%', padding: 8, boxSizing: 'border-box' }} />
      <p style={{ margin: '4px 0 0', fontSize: 12, color: '#888' }}>这个实例拿到的 id：{id}</p>
    </div>
  )
}

export default function Demo() {
  const [count, setCount] = useState(0) // 用来触发重新渲染，验证 id 不会变

  return (
    <div style={{ padding: 16 }}>
      {/* 同一个组件用了三次：如果 id 写死，三个 label 会全部关联到第一个输入框 */}
      <Field label="用户名" placeholder="请输入用户名" />
      <Field label="邮箱" placeholder="请输入邮箱" />
      <Field label="手机号" placeholder="请输入手机号" />

      <button type="button" onClick={() => setCount((c) => c + 1)} style={{ padding: '6px 12px' }}>
        触发重新渲染（{count} 次）
      </button>
      <p style={{ fontSize: 12, color: '#888' }}>反复点这个按钮：三个 id 始终不变，这就是「稳定」的含义。</p>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '5）四个 Hook 各解决什么问题（汇总）',
            headers: ['Hook', '解决的问题', '一句话用法', '什么时候会遇到'],
            rows: [
              [
                'useTransition',
                '慢的更新拖累了快的更新',
                'startTransition(() => setXxx(v))，配 isPending 显示加载态',
                '搜索大列表、切换重量级 Tab',
              ],
              [
                'useOptimistic',
                '等接口返回的那一秒界面像卡住了',
                'useOptimistic(真实值, (cur, d) => 临时值)，在 transition 里调用',
                '点赞、收藏、发消息、加购物车',
              ],
              [
                'useDeferredValue',
                '值变化太频繁，跟着它算的东西很慢',
                'const 延迟值 = useDeferredValue(值)，用延迟值去做重计算',
                '值是别人传来的 props，改不了它的 setState',
              ],
              [
                'useId',
                '可复用组件里 id 会重复、SSR 会对不上',
                'const id = useId()，配 label htmlFor 使用',
                '封装表单组件、做无障碍',
              ],
            ],
            note: 'useTransition 和 useDeferredValue 高度相似：能控制 setState 就用前者，只拿得到一个值就用后者。两个都属于「并发特性」，本质是让 React 可以中断和重排渲染工作。',
          },
          {
            type: 'text',
            title: '6）易错点与边界',
            body: '① **以为 useTransition 能让代码变快**：不能。慢的计算还是那么慢，它只是改变了「先渲染谁」的顺序，让用户感觉不卡。真正的性能问题还得靠 useMemo、虚拟列表、减少数据量来解决。\n\n② **在 startTransition 里更新输入框的值**：那输入框就会变得反应迟钝。受控输入框的 value 必须走紧急更新。\n\n③ **在 transition 之外调用 useOptimistic 的更新函数**：React 会警告 “An optimistic state update occurred outside a transition”。必须包在 `startTransition` 或表单 `action` 里。\n\n④ **乐观更新失败后手动去减回来**：不需要。只要真实值没变，transition 结束后乐观值会自动作废。你要做的只是给用户一个失败提示。\n\n⑤ **用 useId 当列表 key**：key 要能对应到具体那条数据，useId 做不到这件事。\n\n⑥ **无脑把这些用在小项目里**：几十条数据的列表不需要 useTransition，同步的本地操作不需要 useOptimistic。这些是解决真实卡顿和真实网络延迟的工具。',
          },
          {
            type: 'list',
            title: '7）这一节你只需要记住',
            ordered: true,
            items: [
              'useTransition：把不着急的 setState 包起来，配 isPending 显示「加载中」',
              'useOptimistic：先假装成功，失败了自动回滚，必须配 startTransition',
              'useDeferredValue：让某个值慢一拍，用它去做重计算',
              'useId：可复用表单组件里生成唯一 id，配 label htmlFor',
              '这四个都是「体验优化」工具，不是每天都用的地基 Hook',
              '现在留个印象就行，等真的遇到卡顿或者「等接口」的场景再回来查',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'React 19 新 Hook 都在解决体验：useTransition 让慢更新不挡道，useDeferredValue 让慢的值晚点跟上，useOptimistic 让操作看起来秒回（失败自动回滚），useId 让复用组件的 id 不打架。先知道有，遇到再用。',
          },
        ],
      },
    },
    {
      id: 'custom-hook',
      title: '自定义 Hook：useLocalStorage + useFetch 两个完整例子',
      summary: '自定义 Hook = 以 use 开头的函数，内部可调用其它 Hook，复用 state+effect 逻辑',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '自定义 Hook = 把可复用的 state + effect 逻辑抽成 useXxx 函数。它复用的是逻辑，不是 UI；每个组件调用都有独立的状态。',
          },
          {
            type: 'text',
            title: '1）是什么：以 use 开头的逻辑复用函数',
            body: '自定义 Hook 本质上就是一个 JavaScript 函数，名字必须以 use 开头（如 useLocalStorage、useFetch、useToggle）。\n\n函数内部可以调用 useState、useEffect、useRef 等任意 Hook——因此它本身也必须遵守 Hooks 规则（只在组件或其他 Hook 的顶层调用）。\n\n它返回什么由你决定：可以是 [value, setValue] 数组（模仿 useState），也可以是 { data, loading, error } 对象。\n\n重要：自定义 Hook 复用的是「状态逻辑」，不是「状态本身」。每个组件调用 useLocalStorage("theme") 都会得到自己独立的一份 theme state——它们互不影响。',
          },
          {
            type: 'table',
            title: '2）特点：Hook vs 普通工具函数',
            headers: ['对比', '普通函数 utils/xxx', '自定义 Hook useXxx'],
            rows: [
              ['能否调用 useState/useEffect', '❌ 不能', '✅ 可以'],
              ['调用位置', '任何地方', '仅组件或其他 Hook 顶层'],
              ['是否持有 state', '否', '每次调用创建独立 state'],
              ['返回值', '任意', '通常是 state + 操作方法'],
              ['典型用途', '格式化、校验、纯计算', '持久化、请求、订阅、窗口尺寸'],
            ],
          },
          {
            type: 'text',
            title: '3）为什么：DRY 你的 state + effect 模式',
            body: '真实项目里会反复出现相同模式：\n\n• 读/写 localStorage 并同步 state\n• 发请求 → loading → data/error → 卸载取消\n• 监听 window resize / scroll\n• 输入框防抖 debounce\n• 布尔开关 toggle\n\n如果每个组件都复制粘贴一遍 useState + useEffect，代码冗余、bug 修一处漏一处。抽成自定义 Hook 后：\n\n• 组件只剩「声明数据 + 渲染 UI」\n• 逻辑集中测试、集中改\n• 命名即文档：一看 useFetch 就知道在拉数据\n\n抽取时机：同一套 state+effect 在 2 个以上组件出现，或单组件逻辑超过 30 行且能清晰命名时。过早抽象增加理解成本——重复 3 次再 DRY 是务实原则。',
          },
          {
            type: 'text',
            title: '4）怎么用：编写规则四步',
            body: '1）命名：use + 动词/名词，如 useLocalStorage、useWindowSize、useDebounce。\n\n2）文件：习惯放 src/hooks/useXxx.js，一个 Hook 一个文件或相关 Hook 放一起。\n\n3）内部：正常写 useState/useEffect，把「初始化 + 副作用 + 返回 API」封装好。\n\n4）返回：简单二元组用数组 [value, setValue]；字段多时用对象 { data, loading, refetch }，调用方解构更清晰。\n\n5）错误处理：像 useTheme 那样包 useContext 时检查 null；useFetch 返回 error 字符串而不是 throw，让 UI 决定怎么展示。',
          },
          {
            type: 'text',
            title: '示例一：useLocalStorage——持久化 state',
            body: '需求：theme、用户名、侧边栏折叠状态等，刷新页面后要保留。\n\n模式拆解：\n\n• 初始值：useState(() => JSON.parse(localStorage.getItem(key)) ?? initialValue)——惰性初始化，只读一次。\n\n• 同步：useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value])\n\n• 对外：return [value, setValue]，和 useState 用法一致。\n\n抽成 Hook 后，任何组件一行 const [theme, setTheme] = useLocalStorage("theme", "light") 即可。',
          },
          {
            type: 'code',
            title: '完整 Demo：useLocalStorage Hook + ThemeSwitch 组件',
            language: 'jsx',
            body: `import { useEffect, useState } from 'react'

// ========== 自定义 Hook：封装 localStorage 读写逻辑 ==========
// 规则：函数名以 use 开头；内部可调用其他 Hook；每个组件调用有独立 state
function useLocalStorage(key, initialValue) {
  // 惰性初始化：首次渲染读 localStorage，刷新后恢复上次保存的值
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw != null ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })

  // value 变化时写入 localStorage —— 副作用放 useEffect
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.warn('localStorage 写入失败', err)
    }
  }, [key, value])

  // 返回和 useState 一样的 [value, setValue]，调用方无感
  return [value, setValue]
}

// ========== 使用：ThemeSwitch —— 主题持久化 ==========
function ThemeSwitch() {
  const [theme, setTheme] = useLocalStorage('app-theme', 'light')

  const isDark = theme === 'dark'

  return (
    <div
      style={{
        padding: 24,
        minHeight: 200,
        background: isDark ? '#141414' : '#ffffff',
        color: isDark ? '#ffffff' : '#141414',
        transition: 'all 0.3s',
      }}
    >
      <p>当前主题：{theme}</p>
      <button
        type="button"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
      >
        切换到 {isDark ? '浅色' : '深色'}
      </button>
      <p style={{ fontSize: 13, color: isDark ? '#999' : '#666' }}>
        刷新页面，主题会保留（看 localStorage）
      </p>
    </div>
  )
}

// ========== 另一个组件也用同一 Hook —— 但 state 各自独立 ==========
function UserGreeting() {
  const [name, setName] = useLocalStorage('user-name', '游客')

  return (
    <div style={{ padding: 16 }}>
      <p>你好，{name}</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="输入名字"
      />
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '示例二：useFetch——封装请求 + loading + error',
            body: '几乎每个列表页都要走同一流程：\n\n挂载 → setLoading(true) → fetch → 成功 setData / 失败 setError → finally setLoading(false) → 卸载时忽略过期响应。\n\n抽成 useFetch(url) 返回 { data, loading, error, refetch } 后，页面组件极其简洁——只剩 if (loading) / if (error) / 渲染列表。\n\n要点：\n\n• url 进依赖数组，换地址自动重拉\n\n• cancelled 标志或 AbortController 处理竞态\n\n• refetch 用 useCallback 包一层，供「重试」按钮调用',
          },
          {
            type: 'code',
            title: '完整 Demo：useFetch Hook + 用户列表页',
            language: 'jsx',
            body: `import { useCallback, useEffect, useState } from 'react'

// ========== 自定义 Hook：封装 fetch + loading + error 三态 ==========
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // useCallback 稳定 refetch 函数引用，供「重试」按钮使用
  const fetchData = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError(err.message || '请求失败')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [url])

  // url 变化时自动重新请求；卸载时用 cancelled 忽略过期响应
  useEffect(() => {
    let cancelled = false

    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
        const json = await res.json()
        if (!cancelled) setData(json)
      } catch (err) {
        if (!cancelled) {
          setError(err.message || '请求失败')
          setData(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => { cancelled = true }
  }, [url]) // url 进依赖：换地址就重新拉

  return { data, loading, error, refetch: fetchData }
}

// ========== 使用：页面组件只剩条件渲染 + 列表 map ==========
function UserListPage() {
  const { data, loading, error, refetch } = useFetch(
    'https://jsonplaceholder.typicode.com/users'
  )

  if (loading) {
    return <p style={{ padding: 20 }}>加载用户列表...</p>
  }

  if (error) {
    return (
      <div style={{ padding: 20, color: 'crimson' }}>
        <p>加载失败：{error}</p>
        <button type="button" onClick={refetch}>重试</button>
      </div>
    )
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>用户列表（{data?.length ?? 0}）</h2>
        <button type="button" onClick={refetch}>刷新</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {data?.map((user) => (
          <li
            key={user.id}
            style={{
              padding: 12,
              border: '1px solid #eee',
              marginBottom: 8,
              borderRadius: 6,
            }}
          >
            <strong>{user.name}</strong>
            <span style={{ color: '#999', marginLeft: 8 }}>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: 'Bonus：useToggle（简单但常用）',
            language: 'jsx',
            body: `import { useState, useCallback } from 'react'

// 简单自定义 Hook：封装布尔开关逻辑，避免每个组件重复写 useState + toggle
function useToggle(initial = false) {
  const [on, setOn] = useState(initial)

  // useCallback 让 toggle/setTrue/setFalse 引用稳定（传给 memo 子组件时有用）
  const toggle = useCallback(() => setOn((v) => !v), [])
  const setTrue = useCallback(() => setOn(true), [])
  const setFalse = useCallback(() => setOn(false), [])

  return { on, toggle, setTrue, setFalse, setOn }
}

function ModalDemo() {
  const modal = useToggle(false) // 每个组件调用 useToggle 都有独立的 on 状态

  return (
    <div style={{ padding: 20 }}>
      <button type="button" onClick={modal.setTrue}>打开弹窗</button>

      {/* modal.on 为 true 时渲染遮罩层 —— && 条件渲染 */}
      {modal.on && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={modal.setFalse} // 点遮罩关闭
        >
          <div
            style={{ background: 'white', padding: 24, borderRadius: 8 }}
            onClick={(e) => e.stopPropagation()} // 阻止冒泡，点内容区不关闭
          >
            <h3>弹窗内容</h3>
            <button type="button" onClick={modal.toggle}>切换</button>
            <button type="button" onClick={modal.setFalse}>关闭</button>
          </div>
        </div>
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
            title: 'Live Demo：自己写 useToggle 和 useCounter——同一份逻辑被三处复用',
            body: `import { useCallback, useState } from 'react' // 自定义 Hook 内部就是普通的 Hook 调用

// ===== 自定义 Hook 一：布尔开关 =====
function useToggle(initial = false) { // 名字必须以 use 开头
  const [on, setOn] = useState(initial) // 每个调用者都会拿到自己独立的一份 state
  const toggle = useCallback(() => setOn((v) => !v), []) // 取反，引用稳定
  const off = useCallback(() => setOn(false), []) // 直接关掉
  return { on, toggle, off } // 字段多就返回对象，调用方解构更清晰
}

// ===== 自定义 Hook 二：带上下限的计数器 =====
function useCounter(initial = 0, { min = 0, max = 10 } = {}) {
  const [count, setCount] = useState(initial) // 计数值
  const inc = useCallback(() => setCount((c) => Math.min(c + 1, max)), [max]) // 加一但不超过 max
  const dec = useCallback(() => setCount((c) => Math.max(c - 1, min)), [min]) // 减一但不低于 min
  const reset = useCallback(() => setCount(initial), [initial]) // 恢复初始值
  return { count, inc, dec, reset } // 对外只暴露「数据 + 操作」，不暴露 setCount
}

export default function Demo() {
  const panel = useToggle(true) // 第 1 次调用：控制面板展开/收起
  const dark = useToggle(false) // 第 2 次调用：控制深色模式 —— 和上面互不影响
  const qty = useCounter(1, { min: 1, max: 5 }) // 复用计数逻辑：商品数量 1~5

  const wrap = { // 根据 dark.on 切换配色
    padding: 16,
    background: dark.on ? '#141414' : '#ffffff',
    color: dark.on ? '#eeeeee' : '#141414',
    borderRadius: 8,
  }

  return (
    <div style={wrap}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button type="button" onClick={panel.toggle} style={{ padding: '6px 12px' }}>
          {panel.on ? '收起面板' : '展开面板'}
        </button>
        <button type="button" onClick={dark.toggle} style={{ padding: '6px 12px' }}>
          {dark.on ? '切回浅色' : '切到深色'}
        </button>
      </div>

      {/* panel.on 为 true 时才渲染下面这块 —— && 条件渲染 */}
      {panel.on && (
        <div style={{ padding: 12, border: '1px dashed #999', borderRadius: 6 }}>
          <p style={{ marginTop: 0 }}>购买数量（1~5，到边界按钮会失效）</p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button type="button" onClick={qty.dec} style={{ padding: '4px 12px' }}>-</button>
            <b style={{ fontSize: 20 }}>{qty.count}</b>
            <button type="button" onClick={qty.inc} style={{ padding: '4px 12px' }}>+</button>
            <button type="button" onClick={qty.reset} style={{ padding: '4px 12px' }}>重置</button>
          </div>
        </div>
      )}

      <p style={{ fontSize: 12, opacity: 0.7, lineHeight: 1.7 }}>
        useToggle 被调用了两次，两份 on 状态完全独立——自定义 Hook 复用的是「逻辑」，不是「状态」。
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
            title: 'Live Demo：自己写 useDebounce——停手 500ms 才「发请求」',
            body: `import { useEffect, useState } from 'react' // 防抖 = useState + useEffect + 定时器

// ===== 自定义 Hook：把一个值「延迟」返回，期间又变了就重新计时 =====
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value) // 存放延迟后的值

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay) // 延迟 delay 毫秒后才更新
    return () => clearTimeout(timer) // ✅ 关键：value 又变了就先把上一个定时器清掉（这就是防抖）
  }, [value, delay]) // value 或 delay 变化时重新计时

  return debounced // 返回「稳定下来之后」的值
}

export default function Demo() {
  const [keyword, setKeyword] = useState('') // 输入框的即时值：每敲一个字就变
  const debounced = useDebounce(keyword, 500) // 防抖后的值：停手 500ms 才变
  const [logs, setLogs] = useState([]) // 假装的「请求记录」

  useEffect(() => {
    if (!debounced.trim()) return // 空关键字不发请求
    // 真实项目里这里是 fetch / axios，这个演示环境不发网络请求，只记一条日志
    setLogs((prev) => ['🔍 搜索：' + debounced, ...prev].slice(0, 6))
  }, [debounced]) // 只依赖防抖后的值 → 敲字过程中一次都不会触发

  return (
    <div style={{ padding: 16 }}>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)} // 每个字符都会更新 keyword
        placeholder="快速输入几个字，然后停手"
        style={{ width: '100%', padding: 8, marginBottom: 10, boxSizing: 'border-box' }}
      />

      <p style={{ margin: '6px 0' }}>即时值：<b>{keyword || '（空）'}</b></p>
      <p style={{ margin: '6px 0' }}>
        防抖值：<b style={{ color: keyword === debounced ? '#389e0d' : '#d46b08' }}>
          {debounced || '（空）'}
        </b>
        {keyword !== debounced && <span style={{ fontSize: 12, color: '#d46b08' }}>（等待中…）</span>}
      </p>

      <pre style={{ padding: 10, background: '#fafafa', border: '1px solid #eee', borderRadius: 6, minHeight: 80, fontSize: 12 }}>
        {logs.length ? logs.join('\\n') : '（这里显示实际「发出」的请求，敲 10 个字通常只发 1 次）'}
      </pre>
    </div>
  )
}`,
          },
          {
            type: 'list',
            title: '5）自定义 Hook 关键规则清单',
            ordered: true,
            items: [
              '函数名必须以 use 开头，方便 React 和 ESLint 识别',
              '只在组件或其他 Hook 的顶层调用，不在 if/for 里',
              '每个组件调用 = 独立 state，状态不会在组件间共享',
              '返回值：字段少用数组 [value, setValue]；字段多用对象 { data, loading }',
              '文件名放 src/hooks/，与组件分离',
              'Hook 内可以有多个 useState/useEffect，对外暴露简洁 API',
            ],
          },
          {
            type: 'table',
            title: '6）常见自定义 Hook 一览（练完本节能写）',
            headers: ['Hook 名', '职责', '核心实现'],
            rows: [
              ['useLocalStorage', '持久化 state', 'useState 惰性读 + useEffect 写'],
              ['useFetch', '请求三态', 'useEffect fetch + cancelled + refetch'],
              ['useToggle', '布尔开关', 'useState + useCallback 包 toggle'],
              ['useDebounce', '防抖输入', 'useState + useEffect 延迟更新'],
              ['useWindowSize', '窗口尺寸', 'useState + resize 监听 + 清理'],
              ['usePrevious', '上一次值', 'useRef + useEffect 滞后更新'],
            ],
          },
          {
            type: 'text',
            title: '7）易错点汇总',
            body: '① 在普通函数里调用 useLocalStorage——违反 Hooks 规则，必须只在组件或 Hook 里调。\n\n② 以为两个组件共用同一个 Hook 就会共享 state——不会，各调各的。\n\n③ 把 JSX 也塞进 Hook 返回——Hook 应只返回数据和操作，UI 留在组件里（除非做 headless 组件库）。\n\n④ useFetch 的 url 是空字符串或 null 时仍发请求——应在 Hook 内 if (!url) return 早退。\n\n⑤ localStorage 存对象忘记 JSON.stringify/parse——会存成 [object Object]。\n\n⑥ Hook 参数变化时 effect 行为要想清楚：换 key 会重新读 storage 吗？通常 key 应稳定，换 key 等于换「抽屉」。',
          },
          {
            type: 'list',
            title: '8）动手练习清单',
            ordered: true,
            items: [
              '把 useLocalStorage 接入 react-demo 的 Header，记住用户上次访问的章节',
              '用 useFetch 拉取 https://jsonplaceholder.typicode.com/posts?_limit=5 显示文章列表',
              '写 useDebounce(value, delay) 返回防抖后的值，接入搜索框',
              '写 useWindowSize() 返回 { width, height }，窗口变化时更新',
              '写 useCounter(initial) 返回 { count, inc, dec, reset }，体会对象返回值风格',
            ],
          },
          {
            type: 'tip',
            title: '何时抽取',
            body: '同一套 state+effect 在 2 个以上组件出现，或单组件逻辑超过 30 行且可命名成清晰职责时，再抽 Hook。过早抽象增加理解成本；重复 3 次再考虑 DRY。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '自定义 Hook = use 开头的函数，内部用 Hooks 封装可复用逻辑；每个调用者独立 state。持久化用 useLocalStorage，请求用 useFetch，开关用 useToggle。只抽逻辑不抽 UI，遵守 Hooks 顶层规则。',
          },
        ],
      },
    },
  ],
}

export default hooks
