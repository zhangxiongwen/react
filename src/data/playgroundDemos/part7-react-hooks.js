/**
 * 演练台 · Hooks 实战
 * React 源码类 demo：runtime: 'react' + language: 'tsx'
 *
 * 这一批围绕四个最常用的 Hook 展开：
 *   useEffect（依赖数组 / 清理函数 / 事件监听）
 *   useRef（操作 DOM / 存不触发渲染的值）
 *   useMemo & useCallback（性能优化，配合 React.memo）
 *   自定义 Hook（useToggle / useLocalStorage / useDebounce）
 *
 * 沙箱里只能 import react / antd / @ant-design/icons / dayjs，
 * 而且必须 export default 一个组件。没有 CSS 文件，样式全写内联 style。
 */
const part7 = [
  {
    id: 'p7-effect-deps',
    title: 'useEffect 依赖数组的三种写法',
    group: '15-Hooks实战',
    summary: '[] 只跑一次、[dep] 变了才跑、不写数组每次都跑',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState, useRef, useEffect } from 'react'

export default function Demo() {
  const [dep, setDep] = useState(0)     // 这个 state 会被写进依赖数组
  const [other, setOther] = useState(0) // 这个是「无关的 state」，只负责触发重新渲染

  // 三个计数器都存在 useRef 里：改 ref 不会触发重新渲染，
  // 不然「统计渲染」这件事本身又会引起渲染，套娃了
  const once = useRef(0)
  const onDep = useRef(0)
  const every = useRef(0)

  // ① 空数组 []：只在组件第一次出现时跑一次，之后再也不跑
  useEffect(() => { once.current++ }, [])

  // ② [dep]：React 每次渲染后比较 dep 变没变，变了才跑
  useEffect(() => { onDep.current++ }, [dep])

  // ③ 不写数组：每次渲染完都跑（最容易写出死循环的写法，慎用）
  useEffect(() => { every.current++ })

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }}>
      <div style={{ display: 'flex', gap: 12 }}>
        {/* 三张卡片分别显示三个 effect 各执行了多少次 */}
        <Card label="① 依赖写 []" hint="只跑一次" n={once.current} />
        <Card label="② 依赖写 [dep]" hint="dep 变才跑" n={onDep.current} />
        <Card label="③ 不写依赖数组" hint="每次渲染都跑" n={every.current} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 14, alignItems: 'center' }}>
        {/* 改 dep：② 和 ③ 会涨，① 不动 */}
        <button onClick={() => setDep(dep + 1)} style={btn}>改 dep（现在 {dep}）</button>
        {/* 改无关 state：只有 ③ 会涨 */}
        <button onClick={() => setOther(other + 1)} style={btn}>随便改点别的 state（{other}）</button>
      </div>

      <p style={tip}>
        先狂点右边那个按钮：只有 ③ 在涨；再点左边：② 和 ③ 一起涨，① 永远是 1。
        <br />
        计数存在 ref 里不会自己刷新界面，所以你看到的是「上一次渲染后」的数字，多点几下差距就很明显。
        <br />
        试试把 ② 的依赖 [dep] 改成 [other]，看看谁跟着谁涨。
      </p>
    </div>
  )
}

// 小卡片组件：只负责把数字显示出来
function Card({ label, hint, n }) {
  return (
    <div style={box}>
      <p style={tag}>{label}</p>
      <p style={{ margin: '0 0 4px', fontSize: 30, fontWeight: 700, color: '#2f6b4f' }}>{n}</p>
      <p style={{ margin: 0, fontSize: 12, color: '#5c6b63' }}>{hint}</p>
    </div>
  )
}

const box = { flex: 1, padding: 12, border: '1px solid #e2e9e4', borderRadius: 10, background: '#f7faf8' }
const tag = { margin: '0 0 6px', fontSize: 13, color: '#5c6b63' }
const btn = { padding: '7px 14px', fontSize: 13, border: '1px solid #2f6b4f', borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer' }
const tip = { marginTop: 14, fontSize: 13, color: '#5c6b63', lineHeight: 1.8 }`,
  },
  {
    id: 'p7-effect-cleanup',
    title: 'useEffect 清理函数：定时器不清会叠加',
    group: '15-Hooks实战',
    summary: '反复开关秒表，左边越走越快，右边始终正常',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState, useRef, useEffect } from 'react'

export default function Demo() {
  const [badOn, setBadOn] = useState(false)   // 左边秒表的开关
  const [badTick, setBadTick] = useState(0)   // 左边走过的「格子数」，每格 0.2 秒
  const [okOn, setOkOn] = useState(false)     // 右边秒表的开关
  const [okTick, setOkTick] = useState(0)
  const leaked = useRef([])                   // 把漏掉的定时器 id 记下来，只为了卸载时兜底

  // ❌ 错误写法：开了 setInterval，却没有 return 清理函数
  useEffect(() => {
    if (!badOn) return                        // 关掉时啥也不干 —— 可上一个定时器还活着！
    const t = setInterval(() => setBadTick((n) => n + 1), 200)
    leaked.current.push(t)                    // 真实的错误代码没有这行，这里只是留个把柄
  }, [badOn])

  // 兜底：组件被卸载（切走这个 demo）时，把漏掉的定时器全部清掉，别让它们在后台偷跑
  useEffect(() => () => leaked.current.forEach(clearInterval), [])

  // ✅ 正确写法：return 一个函数，React 会在「下次执行前」和「组件卸载时」自动调用它
  useEffect(() => {
    if (!okOn) return
    const t = setInterval(() => setOkTick((n) => n + 1), 200)
    return () => clearInterval(t)             // 这一行就是全部的秘密
  }, [okOn])

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }}>
      <div style={{ display: 'flex', gap: 14 }}>
        <div style={{ ...box, border: '2px solid #e0a0a0' }}>
          <p style={tag}>❌ 没写 return 清理</p>
          <p style={{ ...num, color: '#c53030' }}>{(badTick / 5).toFixed(1)}s</p>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => setBadOn(!badOn)} style={btn}>{badOn ? '暂停' : '开始'}</button>
            <button onClick={() => setBadTick(0)} style={ghost}>归零</button>
          </div>
        </div>

        <div style={{ ...box, border: '2px solid #8fc0a9' }}>
          <p style={tag}>✅ return () =&gt; clearInterval(t)</p>
          <p style={num}>{(okTick / 5).toFixed(1)}s</p>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => setOkOn(!okOn)} style={btn}>{okOn ? '暂停' : '开始'}</button>
            <button onClick={() => setOkTick(0)} style={ghost}>归零</button>
          </div>
        </div>
      </div>

      <p style={tip}>
        亲手点：左边「开始 → 暂停 → 开始 → 暂停」来回按五六次，你会发现它暂停不了、而且越走越快 ——
        每按一次开始就多一个定时器在跑，它们全都在给同一个数字加一。
        <br />
        右边同样操作却永远匀速，因为每次 effect 重新执行前，上一次的 clearInterval 已经先跑过了。
        <br />
        试试给左边的 effect 也补上 return () =&gt; clearInterval(t)，bug 立刻消失。
      </p>
    </div>
  )
}

const box = { flex: 1, padding: 14, border: '2px solid', borderRadius: 10, background: '#f7faf8' }
const tag = { margin: '0 0 8px', fontSize: 13, color: '#5c6b63' }
const num = { margin: '0 0 12px', fontSize: 32, fontWeight: 700, color: '#2f6b4f' }
const btn = { padding: '6px 14px', fontSize: 13, border: '1px solid #2f6b4f', borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer' }
const ghost = { padding: '6px 14px', fontSize: 13, border: '1px solid #e2e9e4', borderRadius: 6, background: '#fff', color: '#1f2a24', cursor: 'pointer' }
const tip = { marginTop: 14, fontSize: 13, color: '#5c6b63', lineHeight: 1.8 }`,
  },
  {
    id: 'p7-effect-listener',
    title: 'useEffect 里加事件监听（记得摘掉）',
    group: '15-Hooks实战',
    summary: '方向键移动小方块，关掉开关就 removeEventListener',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState, useEffect } from 'react'

const STEP = 14  // 每按一次方向键走多少像素

export default function Demo() {
  const [pos, setPos] = useState({ x: 100, y: 50 })  // 小方块在容器里的坐标
  const [on, setOn] = useState(true)                 // 监听的总开关
  const [hits, setHits] = useState(0)                // 一共响应了多少次按键

  useEffect(() => {
    if (!on) return  // 开关关着就不加监听，effect 直接结束

    // 这个函数每次 effect 执行都会新建一个，所以「加」和「摘」用的必须是同一个引用
    function onKeyDown(e) {
      if (!e.key.startsWith('Arrow')) return  // 只关心四个方向键
      // 光标在输入框/文本域里时放行，否则会把「移动光标」这种正常操作也抢走
      const tag = e.target.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return
      e.preventDefault()                      // 阻止方向键滚动页面
      setHits((n) => n + 1)
      setPos((p) => {
        // Math.min / Math.max 把方块夹在容器内，别跑出去
        if (e.key === 'ArrowUp') return { ...p, y: Math.max(0, p.y - STEP) }
        if (e.key === 'ArrowDown') return { ...p, y: Math.min(120, p.y + STEP) }
        if (e.key === 'ArrowLeft') return { ...p, x: Math.max(0, p.x - STEP) }
        return { ...p, x: Math.min(260, p.x + STEP) }
      })
    }

    window.addEventListener('keydown', onKeyDown)              // 挂上监听
    return () => window.removeEventListener('keydown', onKeyDown) // 摘掉监听（关键！）
  }, [on])  // 开关变化时：先摘掉旧的，再决定要不要挂新的

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }}>
      {/* 外层容器设 relative，里面的小方块用 absolute 定位，不会影响整个网站 */}
      <div style={{ position: 'relative', height: 160, background: '#f7faf8', border: '1px solid #e2e9e4', borderRadius: 10 }}>
        <div
          style={{
            position: 'absolute',
            left: pos.x,           // 坐标直接来自 state，state 一变方块就挪
            top: pos.y,
            width: 40, height: 40,
            borderRadius: 8,
            background: on ? '#2f6b4f' : '#b9c4bd',  // 关掉监听时变灰
            transition: 'left .12s, top .12s',       // 加点过渡，移动更顺滑
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 12 }}>
        <button onClick={() => setOn(!on)} style={btn}>{on ? '关掉键盘监听' : '打开键盘监听'}</button>
        <span style={{ fontSize: 13, color: '#5c6b63' }}>已响应 {hits} 次按键</span>
      </div>

      <p style={tip}>
        点一下右边的画面让它获得焦点，然后按 ↑ ↓ ← → 移动方块；点「关掉监听」后按键就没反应了。
        <br />
        如果 effect 里只 addEventListener 却不 return removeEventListener，
        每开关一次就会多留一个监听器，按一下方向键方块会一次跳好几格，还会一直占着内存。
        <br />
        试试把 STEP 改成 40，方块一步就迈很大。
      </p>
    </div>
  )
}

const btn = { padding: '7px 14px', fontSize: 13, border: '1px solid #2f6b4f', borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer' }
const tip = { marginTop: 12, fontSize: 13, color: '#5c6b63', lineHeight: 1.8 }`,
  },
  {
    id: 'p7-ref-dom',
    title: 'useRef 抓真实 DOM：聚焦与滚动',
    group: '15-Hooks实战',
    summary: '一键聚焦输入框、一键把长列表滚到底部',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState, useRef } from 'react'

export default function Demo() {
  // useRef(null) 造一个「盒子」，把它交给 JSX 的 ref 属性，
  // React 渲染完就会把真实 DOM 节点塞进 boxRef.current
  const inputRef = useRef(null)
  const listRef = useRef(null)
  const [logs, setLogs] = useState(() =>
    Array.from({ length: 12 }, (_, i) => '第 ' + (i + 1) + ' 条消息')  // 初始 12 条假数据
  )

  function focusInput() {
    inputRef.current.focus()   // .current 就是那个真实的 <input> 元素，能调所有原生方法
    inputRef.current.select()  // 顺手把已有文字全选中
  }

  function scrollToBottom() {
    const el = listRef.current
    if (!el) return                 // 组件已经被切走时 current 是 null，先挡一下
    el.scrollTop = el.scrollHeight  // 把滚动位置设成「内容总高度」＝滚到最底
  }

  function addLog() {
    const text = inputRef.current.value.trim() || '新消息'  // 读输入框当前值
    setLogs((old) => [...old, text])                        // 追加一条
    inputRef.current.value = ''
    // 等 React 把新的一条渲染出来再滚动，所以放进 setTimeout 排到下一轮
    setTimeout(scrollToBottom, 0)
  }

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }}>
      {/* ref={inputRef} 就是「把这个 DOM 节点存进 inputRef」 */}
      <input ref={inputRef} placeholder="随便打点字" style={input} />

      <div style={{ display: 'flex', gap: 8, margin: '10px 0' }}>
        <button onClick={focusInput} style={btn}>聚焦并全选输入框</button>
        <button onClick={addLog} style={btn}>添加一条并滚到底</button>
        <button onClick={scrollToBottom} style={ghost}>直接滚到底部</button>
      </div>

      {/* 这个 div 自己能滚（overflow: auto），ref 指向它才能改它的 scrollTop */}
      <div ref={listRef} style={{ height: 140, overflow: 'auto', border: '1px solid #e2e9e4', borderRadius: 8, background: '#f7faf8', padding: 8 }}>
        {logs.map((t, i) => (
          <p key={i} style={{ margin: '0 0 6px', fontSize: 13 }}>{t}</p>
        ))}
      </div>

      <p style={tip}>
        ref 是 React 里「拿到真实 DOM 节点」的正规方式：聚焦、滚动、播放视频、量尺寸都靠它。
        <br />
        别用 document.querySelector 去抓 —— 页面上可能同时有好几个同样的组件，抓错了都不知道；
        而且组件还没渲染出来时根本抓不到。
        <br />
        试试把 height: 140 改成 60，列表更矮，滚到底的效果更明显。
      </p>
    </div>
  )
}

const input = { width: 240, padding: '7px 10px', fontSize: 13, border: '1px solid #e2e9e4', borderRadius: 6, outline: 'none' }
const btn = { padding: '7px 14px', fontSize: 13, border: '1px solid #2f6b4f', borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer' }
const ghost = { padding: '7px 14px', fontSize: 13, border: '1px solid #e2e9e4', borderRadius: 6, background: '#fff', color: '#1f2a24', cursor: 'pointer' }
const tip = { marginTop: 12, fontSize: 13, color: '#5c6b63', lineHeight: 1.8 }`,
  },
  {
    id: 'p7-ref-vs-state',
    title: 'useRef 存值 vs useState 存值',
    group: '15-Hooks实战',
    summary: '同样是加一，ref 那边界面纹丝不动',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState, useRef } from 'react'

export default function Demo() {
  const [stateCount, setStateCount] = useState(0) // 存在 state 里：一改就重新渲染
  const refCount = useRef(0)                      // 存在 ref 里：改了 React 完全不知道
  const [, setTick] = useState(0)                 // 只用来手动逼一次渲染的小道具

  const renders = useRef(0) // 统计渲染次数也用 ref，免得统计本身又引发渲染
  renders.current++         // 写在组件函数体里：每渲染一次就执行一次

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }}>
      <p style={{ margin: '0 0 12px', fontSize: 13, color: '#5c6b63' }}>
        组件一共渲染了 <b style={{ color: '#2f6b4f', fontSize: 18 }}>{renders.current}</b> 次
      </p>

      <div style={{ display: 'flex', gap: 14 }}>
        <div style={{ ...box, border: '2px solid #8fc0a9' }}>
          <p style={tag}>useState 存的数字</p>
          <p style={num}>{stateCount}</p>
          {/* set 函数会通知 React：数据变了，请重画 */}
          <button onClick={() => setStateCount((n) => n + 1)} style={btn}>state +1</button>
        </div>

        <div style={{ ...box, border: '2px solid #e0a0a0' }}>
          <p style={tag}>useRef 存的数字</p>
          <p style={{ ...num, color: '#c53030' }}>{refCount.current}</p>
          {/* 直接改 .current，没有任何「通知」，界面自然不会变 */}
          <button onClick={() => { refCount.current++ }} style={btn}>ref +1</button>
        </div>
      </div>

      {/* 逼一次渲染：这时候 JSX 才会重新读一遍 refCount.current，真实值就露出来了 */}
      <button onClick={() => setTick((t) => t + 1)} style={{ ...btn, marginTop: 12, background: '#fff', color: '#1f2a24', border: '1px solid #e2e9e4' }}>
        强制刷新一下界面
      </button>

      <p style={tip}>
        狂点「ref +1」十下，右边数字纹丝不动，渲染次数也不涨；
        再点「强制刷新一下界面」，数字唰地跳到 10 —— 说明它一直在偷偷加，只是没人通知 React 重画。
        <br />
        结论：<b>要显示给用户看的值用 useState；只是自己记一下、不影响画面的值用 useRef</b>
        （比如定时器 id、上一次的坐标、DOM 节点）。
        <br />
        注：开发模式下 React 会故意多渲染一遍来帮你查 bug，所以渲染次数可能一次涨 2，看趋势就好。
        <br />
        试试把 refCount 改成 useState，右边就会跟左边一模一样了。
      </p>
    </div>
  )
}

const box = { flex: 1, padding: 14, border: '2px solid', borderRadius: 10, background: '#f7faf8' }
const tag = { margin: '0 0 8px', fontSize: 13, color: '#5c6b63' }
const num = { margin: '0 0 12px', fontSize: 32, fontWeight: 700, color: '#2f6b4f' }
const btn = { padding: '7px 14px', fontSize: 13, border: '1px solid #2f6b4f', borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer' }
const tip = { marginTop: 14, fontSize: 13, color: '#5c6b63', lineHeight: 1.8 }`,
  },
  {
    id: 'p7-usememo-heavy',
    title: 'useMemo 缓存昂贵计算（能摸到卡顿）',
    group: '15-Hooks实战',
    summary: '关掉缓存打字明显卡，打开就丝滑',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState, useMemo } from 'react'

// 一个故意写得很慢的函数：循环几百万次开方，纯粹为了拖时间
function heavySum(level) {
  let sum = 0
  for (let i = 0; i < level * 2000000; i++) sum += Math.sqrt(i) // level 越大越慢
  return Math.round(sum)
}

export default function Demo() {
  const [level, setLevel] = useState(3)     // 计算量档位，只有它变了才需要重算
  const [text, setText] = useState('')      // 和计算毫无关系的输入框
  const [cache, setCache] = useState(false) // 要不要用 useMemo

  // ✅ useMemo：把结果记住，只有依赖 [level] 变了才重新跑那个慢函数
  const cached = useMemo(() => heavySum(level), [level])

  const t0 = Date.now()
  // ❌ 关掉缓存时：每次渲染（也就是每敲一个字）都老老实实重算一遍
  const result = cache ? cached : heavySum(level)
  const cost = Date.now() - t0 // 本次渲染在这个计算上花了多少毫秒

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }}>
      <div style={{ padding: 12, background: '#f7faf8', border: '1px solid #e2e9e4', borderRadius: 10 }}>
        <p style={{ margin: '0 0 6px', fontSize: 13, color: '#5c6b63' }}>慢计算的结果</p>
        <p style={{ margin: '0 0 6px', fontSize: 26, fontWeight: 700, color: '#2f6b4f' }}>{result}</p>
        <p style={{ margin: 0, fontSize: 13, color: cost > 5 ? '#c53030' : '#5c6b63' }}>
          本次渲染耗时 {cost} ms{cost > 5 ? '（就是它让你打字卡）' : '（直接用缓存，没重算）'}
        </p>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '12px 0' }}>
        <span style={{ fontSize: 13, color: '#5c6b63' }}>计算量</span>
        {/* 改档位 = 改依赖，两种写法都必须重算 */}
        {[1, 3, 6].map((v) => (
          <button key={v} onClick={() => setLevel(v)} style={v === level ? btn : ghost}>{v} 档</button>
        ))}
        <button onClick={() => setCache(!cache)} style={{ ...btn, marginLeft: 12, background: cache ? '#2f6b4f' : '#c53030', border: '1px solid ' + (cache ? '#2f6b4f' : '#c53030') }}>
          {cache ? '✅ 已开启 useMemo' : '❌ 没用 useMemo'}
        </button>
      </div>

      {/* 这个输入框和上面的计算八竿子打不着，却会被它拖累 */}
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="在这里连续快速打字" style={input} />

      <p style={tip}>
        先在「❌ 没用 useMemo」状态下按住一个键狂打字：每敲一下都要重算几百万次，输入框明显跟不上手。
        <br />
        点一下按钮开启 useMemo 再打：瞬间丝滑 —— 因为 level 没变，React 直接把上次的结果拿出来用。
        <br />
        试试把 2000000 改成 20000000，卡顿会夸张到起飞（也别改太大，会假死）。
      </p>
    </div>
  )
}

const input = { width: 280, padding: '8px 10px', fontSize: 14, border: '1px solid #e2e9e4', borderRadius: 6, outline: 'none' }
const btn = { padding: '6px 12px', fontSize: 13, border: '1px solid #2f6b4f', borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer' }
const ghost = { padding: '6px 12px', fontSize: 13, border: '1px solid #e2e9e4', borderRadius: 6, background: '#fff', color: '#1f2a24', cursor: 'pointer' }
const tip = { marginTop: 12, fontSize: 13, color: '#5c6b63', lineHeight: 1.8 }`,
  },
  {
    id: 'p7-usecallback-memo',
    title: 'useCallback + React.memo 挡住重渲染',
    group: '15-Hooks实战',
    summary: '父组件改无关 state，左边子组件白忙、右边不动',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState, useCallback, useRef, memo } from 'react'

// memo 包一层的意思是：props 和上次一模一样就跳过重新渲染
// 注意子组件必须写在外面（模块顶层）；写在 Demo 里面每次都会造一个新组件，缓存立刻失效
const Child = memo(function Child({ label, color, onAdd }) {
  const renders = useRef(0) // 记录自己被渲染了几次
  renders.current++
  return (
    <div style={{ ...box, border: '2px solid ' + color }}>
      <p style={tag}>{label}</p>
      <p style={{ margin: '0 0 10px', fontSize: 13 }}>
        我被渲染了 <b style={{ fontSize: 26, color }}>{renders.current}</b> 次
      </p>
      <button onClick={onAdd} style={btn}>子组件里的按钮</button>
    </div>
  )
})

export default function Demo() {
  const [other, setOther] = useState(0) // 和两个子组件完全无关的 state
  const [hits, setHits] = useState(0)   // 子组件按钮点了几次

  // ❌ 每次渲染都新建一个箭头函数：地址变了 → props 变了 → memo 判定「不一样」→ 子组件白跑一趟
  const badAdd = () => setHits((h) => h + 1)

  // ✅ useCallback 把函数缓存住，依赖是 [] → 永远返回同一个函数 → props 没变 → memo 生效
  const goodAdd = useCallback(() => setHits((h) => h + 1), [])

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        {/* 这个按钮只改父组件的 other，理论上跟子组件一点关系都没有 */}
        <button onClick={() => setOther(other + 1)} style={btn}>改父组件的无关 state（{other}）</button>
        <span style={{ fontSize: 13, color: '#5c6b63' }}>子按钮共点了 {hits} 次</span>
      </div>

      <div style={{ display: 'flex', gap: 14 }}>
        <Child label="❌ 直接传箭头函数" color="#c53030" onAdd={badAdd} />
        <Child label="✅ 传 useCallback 包过的" color="#2f6b4f" onAdd={goodAdd} />
      </div>

      <p style={tip}>
        狂点上面那个「改无关 state」：左边的次数一路涨（每次都在白白重画），右边稳稳不动。
        <br />
        原理：memo 用 === 比较每个 prop。函数也是对象，(a) =&gt; a 每写一次都是一个新对象，
        所以不加 useCallback 的话 memo 永远判定「props 变了」。
        <br />
        提示：开发模式下 React 会故意多渲染一遍，数字可能一次涨 2，看「变不变」就够了。
        <br />
        试试把 goodAdd 的依赖 [] 改成 [other]，右边立刻也跟着涨起来。
      </p>
    </div>
  )
}

const box = { flex: 1, padding: 14, border: '2px solid', borderRadius: 10, background: '#f7faf8' }
const tag = { margin: '0 0 8px', fontSize: 13, color: '#5c6b63' }
const btn = { padding: '6px 14px', fontSize: 13, border: '1px solid #2f6b4f', borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer' }
const tip = { marginTop: 14, fontSize: 13, color: '#5c6b63', lineHeight: 1.8 }`,
  },
  {
    id: 'p7-use-toggle',
    title: '自定义 Hook 入门：useToggle',
    group: '15-Hooks实战',
    summary: '把开关逻辑抽成一个函数，同一页复用三次',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState, useCallback } from 'react'

// 自定义 Hook = 一个名字以 use 开头的普通函数，里面可以调别的 Hook
// 它不渲染任何界面，只负责把「一段有状态的逻辑」打包起来给别人复用
function useToggle(initial = false) {
  const [on, setOn] = useState(initial)              // 这个 state 属于「调用它的那个组件」
  const toggle = useCallback(() => setOn((v) => !v), []) // 取反就是全部逻辑
  return [on, toggle]                                 // 学 useState 的样子返回一个数组
}

export default function Demo() {
  // 同一个 Hook 在一个组件里用三次，三份 state 各自独立、互不干扰
  const [open, toggleOpen] = useToggle(true)      // ① 折叠面板
  const [visible, toggleVisible] = useToggle()    // ② 密码是否明文
  const [dark, toggleDark] = useToggle()          // ③ 深色预览
  const [pwd, setPwd] = useState('react-2026')

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', color: dark ? '#f7faf8' : '#1f2a24', background: dark ? '#243029' : 'transparent', borderRadius: 10 }}>
      {/* ① 折叠面板：open 决定内容渲不渲染 */}
      <div style={card(dark)}>
        <button onClick={toggleOpen} style={btn}>{open ? '收起' : '展开'}详情</button>
        {open && (
          <p style={{ margin: '10px 0 0', fontSize: 13, lineHeight: 1.7 }}>
            这段文字由 open 控制。折叠、弹窗、下拉菜单……本质上都是一个布尔值在开关。
          </p>
        )}
      </div>

      {/* ② 密码框：visible 决定 input 的 type */}
      <div style={card(dark)}>
        <input
          type={visible ? 'text' : 'password'}
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          style={input}
        />
        <button onClick={toggleVisible} style={{ ...btn, marginLeft: 8 }}>{visible ? '隐藏' : '显示'}密码</button>
      </div>

      {/* ③ 深色预览：dark 决定整块区域的配色（只影响这个 demo，不碰整站） */}
      <div style={card(dark)}>
        <button onClick={toggleDark} style={btn}>{dark ? '切回浅色' : '切到深色'}</button>
        <span style={{ marginLeft: 10, fontSize: 13 }}>当前是 {dark ? '深色' : '浅色'} 模式</span>
      </div>

      <p style={{ ...tip, color: dark ? '#b9c4bd' : '#5c6b63' }}>
        三处开关的代码都只有一行 useToggle()，不用再各写一遍 useState + 取反函数。
        <br />
        记住两条规矩：名字必须以 use 开头；只能在组件或别的 Hook 的顶层调用，不能塞进 if 或循环里。
        <br />
        试试给 useToggle 再返回一个 setOn，然后加个「一键全部关闭」的按钮。
      </p>
    </div>
  )
}

const card = (dark) => ({ padding: 12, marginBottom: 10, border: '1px solid ' + (dark ? '#3c4f44' : '#e2e9e4'), borderRadius: 10, background: dark ? '#1c261f' : '#f7faf8' })
const input = { width: 180, padding: '7px 10px', fontSize: 13, border: '1px solid #e2e9e4', borderRadius: 6, outline: 'none' }
const btn = { padding: '6px 14px', fontSize: 13, border: '1px solid #2f6b4f', borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer' }
const tip = { marginTop: 12, fontSize: 13, lineHeight: 1.8 }`,
  },
  {
    id: 'p7-use-localstorage',
    title: '自定义 Hook：useLocalStorage',
    group: '15-Hooks实战',
    summary: '用法和 useState 一样，但刷新页面数据还在',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState, useEffect } from 'react'

// 和 useState 长得一模一样，只是多做了两件事：初始值从 localStorage 读、值变了就写回去
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    // 传函数给 useState 叫「惰性初始化」：只在第一次渲染跑，不会每次都去读硬盘
    try {
      const saved = localStorage.getItem(key)
      return saved === null ? initial : JSON.parse(saved) // 存的是字符串，取出来要解析
    } catch (err) {
      return initial // 万一存进去的是坏数据，退回默认值，别让整个组件崩掉
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value)) // value 一变就同步写进浏览器
  }, [key, value])

  return [value, setValue] // 返回格式和 useState 完全一致，用起来零学习成本
}

export default function Demo() {
  // key 统一加 pg- 前缀，免得和网站自己的数据打架
  const [name, setName] = useLocalStorage('pg-hook-name', '')
  const [color, setColor] = useLocalStorage('pg-hook-color', '#2f6b4f')

  function clearAll() {
    localStorage.removeItem('pg-hook-name')  // 先把硬盘里的删掉
    localStorage.removeItem('pg-hook-color')
    setName('')                              // 再把界面上的恢复默认
    setColor('#2f6b4f')
  }

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }}>
      <div style={{ padding: 14, background: '#f7faf8', border: '1px solid #e2e9e4', borderRadius: 10 }}>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#5c6b63' }}>你的昵称</p>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="写个名字试试" style={input} />

        <p style={{ margin: '14px 0 8px', fontSize: 13, color: '#5c6b63' }}>喜欢的颜色</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {['#2f6b4f', '#c53030', '#2b5f8a'].map((c) => (
            // 选中的那个加粗边框，靠对比 color 判断
            <button key={c} onClick={() => setColor(c)} style={{ ...swatch, background: c, outline: c === color ? '3px solid #1f2a24' : 'none' }} />
          ))}
        </div>

        <p style={{ marginTop: 16, fontSize: 20, fontWeight: 700, color }}>
          你好，{name || '陌生人'} 👋
        </p>
      </div>

      <button onClick={clearAll} style={{ ...btn, marginTop: 12 }}>清空已保存的数据</button>

      <p style={tip}>
        <b>改完之后按 F5 刷新整个页面，内容还在</b> —— 因为它已经躺在浏览器的 localStorage 里了。
        <br />
        普通 useState 存在内存里，刷新就没；localStorage 存在硬盘上，关掉浏览器明天再来也还在。
        <br />
        试试把 key 改成 pg-hook-name-2，刷新后会发现之前那份数据「消失」了 —— 其实只是换了个抽屉。
      </p>
    </div>
  )
}

const input = { width: 240, padding: '8px 10px', fontSize: 14, border: '1px solid #e2e9e4', borderRadius: 6, outline: 'none' }
const swatch = { width: 34, height: 34, borderRadius: '50%', border: 'none', cursor: 'pointer' }
const btn = { padding: '7px 14px', fontSize: 13, border: '1px solid #e2e9e4', borderRadius: 6, background: '#fff', color: '#c53030', cursor: 'pointer' }
const tip = { marginTop: 12, fontSize: 13, color: '#5c6b63', lineHeight: 1.8 }`,
  },
  {
    id: 'p7-use-debounce',
    title: '自定义 Hook：useDebounce 输入防抖',
    group: '15-Hooks实战',
    summary: '停手 500ms 才搜索，省下一大半请求',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState, useEffect } from 'react'

// 防抖：值变了先不急着用，等它安静 delay 毫秒再放行
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay) // 排一个 delay 毫秒后的任务
    return () => clearTimeout(t) // 关键：value 又变了就把上一个任务撤销，等于「重新计时」
  }, [value, delay])

  return debounced
}

const ALL = ['React 入门', 'React Hooks', 'Redux 状态管理', 'Vue 对比', 'CSS Flex 布局', 'TypeScript 基础']

export default function Demo() {
  const [keyword, setKeyword] = useState('')      // 每敲一个字就变一次
  const debounced = useDebounce(keyword, 500)     // 慢半拍的版本
  const [typed, setTyped] = useState(0)           // 敲了多少次键盘
  const [searched, setSearched] = useState(0)     // 真正「发请求」了多少次

  useEffect(() => {
    if (!debounced) return // 关键词是空的就不搜，省一次请求
    // 只有防抖后的值变化才会走到这里 —— 真实项目里这里就是 fetch 请求
    setSearched((n) => n + 1)
  }, [debounced])

  // 用防抖后的值来过滤，避免每敲一下都重算一遍列表
  const list = ALL.filter((t) => t.toLowerCase().includes(debounced.toLowerCase()))

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }}>
      <input
        value={keyword}
        onChange={(e) => { setKeyword(e.target.value); setTyped((n) => n + 1) }}
        placeholder="快速输入 react / css 试试"
        style={input}
      />

      <div style={{ display: 'flex', gap: 10, margin: '12px 0' }}>
        <div style={box}>
          <p style={tag}>keyword（每敲一下就变）</p>
          <p style={{ ...val, color: '#c53030' }}>{keyword || '（空）'}</p>
        </div>
        <div style={box}>
          <p style={tag}>debounced（停手 500ms 才跟上）</p>
          <p style={val}>{debounced || '（空）'}</p>
        </div>
      </div>

      <p style={{ margin: '0 0 10px', fontSize: 13, color: '#5c6b63' }}>
        敲了 <b style={{ color: '#c53030', fontSize: 18 }}>{typed}</b> 次键盘，
        实际只搜索了 <b style={{ color: '#2f6b4f', fontSize: 18 }}>{searched}</b> 次
      </p>

      {/* 搜索结果：用防抖后的关键词过滤 */}
      <div style={{ ...box, background: '#f7faf8' }}>
        {list.length === 0 && <p style={{ margin: 0, fontSize: 13, color: '#5c6b63' }}>没有匹配的结果</p>}
        {list.map((t) => (
          <p key={t} style={{ margin: '0 0 6px', fontSize: 13 }}>· {t}</p>
        ))}
      </div>

      <p style={tip}>
        连着快速打 8 个字：左边的红字一直在跳，右边要等你停手半秒才跟上，搜索次数远小于按键次数 ——
        省下的就是白白发出去的网络请求。
        <br />
        秘密全在清理函数：每次 value 变化都先 clearTimeout 撤销上一个计划，只有最后一次能活到 500ms。
        <br />
        试试把 500 改成 2000，会慢到有点难受；改成 0 就等于没有防抖。
      </p>
    </div>
  )
}

const input = { width: 300, padding: '8px 10px', fontSize: 14, border: '1px solid #e2e9e4', borderRadius: 6, outline: 'none' }
const box = { flex: 1, padding: 10, border: '1px solid #e2e9e4', borderRadius: 8 }
const tag = { margin: '0 0 6px', fontSize: 12, color: '#5c6b63' }
const val = { margin: 0, fontSize: 16, fontWeight: 700, color: '#2f6b4f' }
const tip = { marginTop: 12, fontSize: 13, color: '#5c6b63', lineHeight: 1.8 }`,
  },
]

export default part7
