/**
 * 第 7 章：Hooks
 */
const hooks = {
  id: 'hooks',
  title: '常用 Hooks 精讲',
  summary: 'useEffect 依赖与清理、useRef DOM与定时器、自定义 Hook 两个完整例子',
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

function UserDetail({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // ===== Effect 1：空依赖 [] — 挂载时改页面标题，卸载时还原 =====
  useEffect(() => {
    const prevTitle = document.title
    document.title = '用户详情 - My App'

    return () => {
      document.title = prevTitle // 清理：离开页面时还原
    }
  }, [])

  // ===== Effect 2：有依赖 [userId] — id 变就重新拉数据 =====
  useEffect(() => {
    // 没有 userId 时不请求
    if (!userId) {
      setUser(null)
      setLoading(false)
      return
    }

    let cancelled = false // 标记：防止过期请求覆盖新数据

    async function loadUser() {
      setLoading(true)
      setError('')

      try {
        // 模拟 API（真实项目换成 fetch/axios）
        await new Promise((r) => setTimeout(r, 800))
        const mockData = {
          1: { id: 1, name: '小明', city: '上海' },
          2: { id: 2, name: '小红', city: '北京' },
        }
        const data = mockData[userId]

        if (!cancelled) {
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

    loadUser()

    // 清理：userId 变化或组件卸载时，忽略这次请求的结果
    return () => {
      cancelled = true
    }
  }, [userId]) // userId 变了 → 清掉旧 effect → 跑新 effect

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

// 父组件：切换 userId 测试 effect 重新执行
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

  // 定时器：每秒更新
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    // ✅ 清理：卸载时清除定时器
    return () => clearInterval(timer)
  }, [])

  // 窗口 resize 监听
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // ✅ 清理：卸载时移除监听
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

  // ❌ 漏依赖 keyword：keyword 变了不会重新搜索
  // useEffect(() => {
  //   fetch(\`/api/search?q=\${keyword}\`).then(...)
  // }, [])

  // ✅ 正确：keyword 进依赖
  useEffect(() => {
    if (!keyword.trim()) {
      setResults([])
      return
    }

    let cancelled = false

    fetch(\`/api/search?q=\${encodeURIComponent(keyword)}\`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setResults(data)
      })

    return () => { cancelled = true }
  }, [keyword]) // ← keyword 必须在这里

  return (/* 渲染 results */)
}`,
          },
          {
            type: 'code',
            title: 'localStorage 同步（常见 effect 场景）',
            language: 'jsx',
            body: `function ThemeApp() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  // theme 变化时写入 localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

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

function SearchBox() {
  const inputRef = useRef(null)
  const resultRef = useRef(null)

  // 挂载后自动聚焦
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleSelectAll() {
    inputRef.current?.select()
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
            type: 'text',
            title: '5）怎么用（用途二）：存可变值（定时器 id、标记位）',
            body: '模式：const timerRef = useRef(null)\n\n• start：timerRef.current = setInterval(...)\n\n• pause：clearInterval(timerRef.current); timerRef.current = null\n\n• 卸载清理：useEffect return 里 clearInterval(timerRef.current)\n\n还可以存：\n\n• hasFetchedRef——防止 StrictMode 或重复渲染导致请求发两次\n\n• prevPropsRef——对比前后 props 变化\n\n• isMountedRef——异步回调里判断是否还在树上（现代更推荐 cancelled 标志）',
          },
          {
            type: 'code',
            title: '完整 Demo：秒表（useRef 存 timer id + useState 存显示数字）',
            language: 'jsx',
            body: `import { useEffect, useRef, useState } from 'react'

function Stopwatch() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const timerRef = useRef(null) // 存 setInterval 返回的 id

  function start() {
    if (timerRef.current) return // 防止重复 start

    timerRef.current = setInterval(() => {
      setSeconds((s) => s + 1) // 显示的数字用 state
    }, 1000)
    setRunning(true)
  }

  function pause() {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setRunning(false)
  }

  function reset() {
    pause()
    setSeconds(0)
  }

  // 组件卸载时清理定时器
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

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value // 渲染完成后更新为当前值
  }, [value])
  return ref.current   // 返回的是「上一次渲染」的值
}

function Counter() {
  const [count, setCount] = useState(0)
  const prevCount = usePrevious(count)

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
            body: `// 场景：渲染次数
function RenderCount() {
  const [count, setCount] = useState(0)
  const renderRef = useRef(0)

  renderRef.current += 1 // 每次渲染 +1，不触发额外渲染

  return (
    <div>
      <p>state count: {count}</p>
      <p>本次是第 {renderRef.current} 次渲染</p>
      <button onClick={() => setCount((c) => c + 1)}>+1（会渲染）</button>
    </div>
  )
}

// 选择：
// 要显示在 UI 上 → useState
// 只是内部计数/存 id/DOM → useRef`,
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

// ========== hooks/useLocalStorage.js ==========
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw != null ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.warn('localStorage 写入失败', err)
    }
  }, [key, value])

  return [value, setValue]
}

// ========== 使用：ThemeSwitch ==========
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

// ========== 另一个组件也用同一个 Hook ==========
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

// ========== hooks/useFetch.js ==========
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
  }, [url])

  return { data, loading, error, refetch: fetchData }
}

// ========== 使用：UserListPage（组件非常干净）==========
function UserListPage() {
  // 真实项目换成真实 API；这里用 JSONPlaceholder 演示
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

function useToggle(initial = false) {
  const [on, setOn] = useState(initial)

  const toggle = useCallback(() => setOn((v) => !v), [])
  const setTrue = useCallback(() => setOn(true), [])
  const setFalse = useCallback(() => setOn(false), [])

  return { on, toggle, setTrue, setFalse, setOn }
}

function ModalDemo() {
  const modal = useToggle(false)

  return (
    <div style={{ padding: 20 }}>
      <button type="button" onClick={modal.setTrue}>打开弹窗</button>

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
          onClick={modal.setFalse}
        >
          <div
            style={{ background: 'white', padding: 24, borderRadius: 8 }}
            onClick={(e) => e.stopPropagation()}
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
