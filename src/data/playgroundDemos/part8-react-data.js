/**
 * 演练台 · 网络请求与数据
 * React 源码类 demo：runtime: 'react' + language: 'tsx'
 *
 * 沙箱里不能 import 第三方请求库，但全局 fetch / AbortController 可以直接用。
 * 大部分 demo 用文件顶部的 fakeApi（setTimeout + Promise 造假数据），
 * 好处是断网也能演示，还能故意造 500 错误和慢响应；
 * 其中 3 个 demo（p8-fetch-three-states / p8-polling / p8-dog-image）
 * 打的是真实公开接口，所以必须把错误态写完整。
 */
const part8 = [
  {
    id: 'p8-fetch-three-states',
    title: '请求三态模板（真实接口）',
    group: '16-网络请求与刷新',
    summary: '加载中 / 出错 / 空数据 / 有数据，四个分支缺一不可',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState, useEffect } from 'react'

// 这是所有请求代码的骨架：一个请求要照顾四种画面
export default function Demo() {
  const [users, setUsers] = useState([]) // 数据。初始给空数组而不是 null，渲染时就不用到处防空
  const [loading, setLoading] = useState(true) // 一进来就在请求，所以初始值直接是 true
  const [error, setError] = useState('') // 错误文案。空字符串表示「目前没出错」

  useEffect(() => {
    let alive = true // 标志位：组件还在页面上吗？卸载后就不要再 setState 了
    const ac = new AbortController() // 用它在组件卸载时取消这次没跑完的请求
    setLoading(true) // 每次开始请求，先进入「加载中」
    setError('') // 并且把上一次的错误清掉，否则会一直挂着

    // 真实的公开接口，返回 5 个用户；signal 交给 AbortController 管
    fetch('https://jsonplaceholder.typicode.com/users?_limit=5', { signal: ac.signal })
      .then((res) => {
        // fetch 遇到 404/500 不会自己抛错，必须手动看 res.ok（是不是 2xx）
        if (!res.ok) throw new Error('接口返回 ' + res.status)
        return res.json() // 把响应体解析成 JS 对象，这一步同样是异步的
      })
      .then((data) => {
        if (alive) setUsers(data) // 只有组件还活着才写入数据
      })
      .catch((err) => {
        if (err.name === 'AbortError') return // 自己主动取消的，不算错误，直接忽略
        if (alive) setError(err.message || '请求失败')
      })
      .finally(() => {
        if (alive) setLoading(false) // 不管成功还是失败，都要退出「加载中」
      })

    return () => {
      alive = false // 清理第一步：以后所有回调都别再动 state
      ac.abort() // 清理第二步：把还在飞的请求掐掉
    }
  }, []) // 依赖数组是空的 → 只在组件挂载时请求一次

  return (
    <div style={wrap}>
      <h4 style={h4}>请求三态 + 空数据</h4>

      {/* 分支一：加载中。别让用户对着空白页面发呆 */}
      {loading && <p style={muted}>加载中…</p>}

      {/* 分支二：出错。真实网络请求一定要有这个分支 */}
      {!loading && error && (
        <div style={errBox}>
          <b>请求失败：</b>
          {error}
          <p style={{ ...muted, margin: '6px 0 0' }}>
            没联网的话这里会显示错误提示，这正是错误处理该有的样子
          </p>
        </div>
      )}

      {/* 分支三：请求成功但一条数据都没有，要单独提示，不能留一片空白 */}
      {!loading && !error && users.length === 0 && <p style={muted}>暂无数据</p>}

      {/* 分支四：正常渲染列表。key 用后端给的 id，最稳 */}
      {!loading && !error && users.length > 0 && (
        <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
          {users.map((u) => (
            <li key={u.id}>
              {u.name} <span style={muted}>· {u.email}</span>
            </li>
          ))}
        </ul>
      )}

      <p style={tip}>
        试试把 _limit=5 改成 _limit=2，右边只剩两个人；把网址故意打错一个字母，就能看到错误态
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24', background: '#f7faf8' }
const h4 = { margin: '0 0 12px', fontSize: 15 }
const muted = { fontSize: 13, color: '#5c6b63' }
const errBox = { padding: 12, background: '#fff', border: '1px solid #c53030',
  borderRadius: 8, color: '#c53030', fontSize: 13 }
const tip = { marginTop: 16, fontSize: 12, color: '#5c6b63', lineHeight: 1.7 }`,
  },
  {
    id: 'p8-res-ok',
    title: 'fetch 不会因为 500 抛错',
    group: '16-网络请求与刷新',
    summary: '不判断 res.ok，服务器的错误信息会被当成数据渲染出来',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

// 模拟一个「坏掉的接口」：HTTP 500，返回的 body 是错误对象而不是列表
// 真实项目里这就是服务器崩了的时候给你的东西
function fakeApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: false, // fetch 的响应用 ok 表示「状态码是不是 2xx」
        status: 500, // 服务器内部错误
        json: () => Promise.resolve({ error: 'Internal Server Error' }), // 注意：不是数组
      })
    }, 600)
  })
}

export default function Demo() {
  const [wrong, setWrong] = useState('还没请求') // 左栏结果
  const [right, setRight] = useState('还没请求') // 右栏结果

  // ❌ 错误写法：拿到响应就直接 json()，从不检查状态码
  async function loadWrong() {
    setWrong('加载中…')
    const res = await fakeApi() // 就算是 500，这个 await 也会正常成功（不会进 catch）
    const data = await res.json() // 于是解析出来的是 { error: ... }
    setWrong('拿到数据：' + JSON.stringify(data)) // 错误信息被当成「数据」渲染出来了
  }

  // ✅ 正确写法：不是 2xx 就自己 throw，让 catch 接住，进入错误态
  async function loadRight() {
    setRight('加载中…')
    try {
      const res = await fakeApi()
      if (!res.ok) throw new Error('接口返回 ' + res.status) // 关键就是这一行
      const data = await res.json()
      setRight('拿到数据：' + JSON.stringify(data))
    } catch (err) {
      setRight('❌ 出错了：' + err.message) // 用户看到的是「出错了」，而不是一串乱码
    }
  }

  return (
    <div style={wrap}>
      <h4 style={h4}>同一个 500 响应，两种处理方式</h4>

      <div style={{ display: 'flex', gap: 14 }}>
        <div style={{ ...col, border: '2px solid #e0a0a0' }}>
          <p style={tag}>❌ 不判断 res.ok</p>
          <button onClick={loadWrong} style={btn}>请求一次</button>
          <p style={out}>{wrong}</p>
        </div>

        <div style={{ ...col, border: '2px solid #8fc0a9' }}>
          <p style={tag}>✅ 判断 res.ok 后 throw</p>
          <button onClick={loadRight} style={btn}>请求一次</button>
          <p style={out}>{right}</p>
        </div>
      </div>

      <p style={tip}>
        两边都点一下：左边把服务器的报错当成数据显示了，右边老老实实进了错误态。
        <br />
        试试把 fakeApi 里的 ok 改成 true、status 改成 200，两边就都变正常了
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24', background: '#f7faf8' }
const h4 = { margin: '0 0 12px', fontSize: 15 }
const col = { flex: 1, padding: 14, background: '#fff', border: '2px solid', borderRadius: 10 }
const tag = { margin: '0 0 10px', fontSize: 13, color: '#5c6b63' }
const out = { margin: '12px 0 0', fontSize: 12, lineHeight: 1.7, wordBreak: 'break-all' }
const btn = { padding: '7px 14px', fontSize: 13, borderRadius: 6, cursor: 'pointer',
  border: '1px solid #2f6b4f', background: '#2f6b4f', color: '#fff' }
const tip = { marginTop: 16, fontSize: 12, color: '#5c6b63', lineHeight: 1.8 }`,
  },
  {
    id: 'p8-manual-refresh',
    title: '手动刷新按钮',
    group: '16-网络请求与刷新',
    summary: '把请求抽成 loadData，effect 调一次、按钮再调一次',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState, useEffect, useRef, useCallback } from 'react'

// 模拟接口：700ms 后返回三个城市的随机温度，每次数字都不一样
// 数字会变，就能看出「确实又请求了一次」，而不是界面在骗你
function fakeApi() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        ['北京', '上海', '广州'].map((city) => ({
          city,
          temp: 8 + Math.floor(Math.random() * 22), // 8~29 之间的随机整数
        }))
      )
    }, 700)
  })
}

export default function Demo() {
  const [list, setList] = useState([]) // 列表数据
  const [loading, setLoading] = useState(false) // 是否正在请求
  const [times, setTimes] = useState(0) // 一共成功请求了几次
  const alive = useRef(true) // 组件是否还在页面上（用 ref 存，跨渲染不丢）

  // 把请求逻辑抽成一个函数，谁都能调：effect 调、按钮调、以后重试也能调
  // useCallback 包一层，保证函数身份稳定，放进 effect 依赖里不会造成死循环
  const loadData = useCallback(async () => {
    setLoading(true) // 进入刷新中：按钮会被禁用
    const data = await fakeApi()
    if (!alive.current) return // 请求回来时组件可能已经被切走了，这时不能 setState
    setList(data) // 注意：旧数据一直留在界面上，只在新数据到手时替换 → 不闪白
    setTimes((n) => n + 1)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadData() // 进入页面自动拉一次
    return () => {
      alive.current = false // 卸载时改掉标志位，拦住迟到的 setState
    }
  }, [loadData])

  return (
    <div style={wrap}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <h4 style={h4}>实时气温</h4>
        {/* 正在刷新时禁用按钮，避免用户狂点发出一堆重复请求 */}
        <button onClick={loadData} disabled={loading} style={loading ? btnOff : btn}>
          {loading ? '刷新中…' : '刷新'}
        </button>
        <span style={muted}>已请求 {times} 次</span>
      </div>

      {/* 首次加载还没有任何数据时给个占位，之后刷新就一直显示旧数据 */}
      {list.length === 0 && <p style={muted}>加载中…</p>}

      <div style={{ display: 'flex', gap: 10, opacity: loading ? 0.55 : 1 }}>
        {list.map((it) => (
          <div key={it.city} style={card}>
            <p style={{ margin: 0, fontSize: 13, color: '#5c6b63' }}>{it.city}</p>
            <p style={{ margin: '4px 0 0', fontSize: 26, fontWeight: 700 }}>{it.temp}°</p>
          </div>
        ))}
      </div>

      <p style={tip}>
        点「刷新」：按钮变灰、旧温度先半透明留着，新数据到了才换掉。
        <br />
        试试把 opacity 那行删掉，就没有「正在更新」的感觉了
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24', background: '#f7faf8' }
const h4 = { margin: 0, fontSize: 15 }
const muted = { fontSize: 13, color: '#5c6b63' }
const card = { padding: '12px 18px', background: '#fff', border: '1px solid #e2e9e4',
  borderRadius: 8, transition: 'opacity .2s' }
const btn = { padding: '6px 14px', fontSize: 13, borderRadius: 6, cursor: 'pointer',
  border: '1px solid #2f6b4f', background: '#2f6b4f', color: '#fff' }
const btnOff = { ...btn, background: '#c8d5cd', border: '1px solid #c8d5cd', cursor: 'not-allowed' }
const tip = { marginTop: 16, fontSize: 12, color: '#5c6b63', lineHeight: 1.8 }`,
  },
  {
    id: 'p8-polling',
    title: '自动轮询：每 3 秒刷一次（真实接口）',
    group: '16-网络请求与刷新',
    summary: 'setInterval 定时探活，带暂停开关，卸载必须 clearInterval',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState, useEffect } from 'react'
import dayjs from 'dayjs' // 轻量的日期库，用来把时间格式化成 时:分:秒

export default function Demo() {
  const [info, setInfo] = useState(null) // 最近一次探活的结果
  const [error, setError] = useState('') // 探活失败的原因
  const [at, setAt] = useState('') // 上次更新时间
  const [running, setRunning] = useState(true) // 轮询开关
  const [times, setTimes] = useState(0) // 一共探了几次

  useEffect(() => {
    if (!running) return // 暂停时干脆不建定时器，比建了再判断更省事

    let cancelled = false // 本轮 effect 是否已失效（切开关或卸载都会失效）
    const ac = new AbortController() // 卸载时用来掐掉正在飞的那次请求

    async function tick() {
      const start = Date.now() // 记开始时间，用来算这次请求花了多久
      try {
        // 真实接口。每次耗时都不一样，所以能看出确实是重新请求了
        const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', { signal: ac.signal })
        if (!res.ok) throw new Error('接口返回 ' + res.status) // fetch 不会因为 500 自己抛错
        const data = await res.json()
        if (cancelled) return // 数据回来晚了，这轮已作废，直接丢掉
        setInfo({ status: res.status, cost: Date.now() - start, title: data.title })
        setError('')
      } catch (err) {
        if (cancelled || err.name === 'AbortError') return // 主动取消不算故障
        setError(err.message || '请求失败')
      }
      if (!cancelled) {
        setAt(dayjs().format('HH:mm:ss')) // 记下这次刷新的时刻
        setTimes((n) => n + 1)
      }
    }

    tick() // 先立刻探一次，别让用户干等 3 秒
    const timer = setInterval(tick, 3000) // 之后每 3 秒重新探一次

    return () => {
      cancelled = true
      ac.abort()
      clearInterval(timer) // 最关键的一行：不清理的话切走 demo 后它还在后台偷偷请求
    }
  }, [running]) // running 变化 → 旧 effect 先清理，再决定要不要建新定时器

  return (
    <div style={wrap}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <h4 style={h4}>接口健康监控</h4>
        {/* 一个 state 控制开关，effect 会自动跟着建/拆定时器 */}
        <button onClick={() => setRunning((v) => !v)} style={btn}>
          {running ? '暂停' : '继续'}
        </button>
        <span style={{ ...muted, color: running ? '#2f6b4f' : '#c53030' }}>{running ? '● 轮询中' : '● 已暂停'}</span>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <div style={card}>
          <p style={muted}>服务状态</p>
          {/* 三种情况：出错 / 还没探到 / 正常 */}
          <p style={{ ...num, color: error ? '#c53030' : '#2f6b4f' }}>
            {error ? '异常' : info ? String(info.status) : '—'}
          </p>
        </div>
        <div style={card}>
          <p style={muted}>本次耗时</p>
          {/* info 可能还是 null，用三元兜一下，不然首帧会报错 */}
          <p style={num}>{info && !error ? info.cost + 'ms' : '—'}</p>
        </div>
      </div>

      {/* 轮询失败也要有明确的错误态，不能只是数字停住不动 */}
      {error && (
        <div style={errBox}>
          <b>探活失败：</b>{error}
          <p style={{ margin: '6px 0 0', fontSize: 12 }}>
            没联网的话这里会显示错误提示，这正是错误处理该有的样子
          </p>
        </div>
      )}

      <p style={{ ...muted, marginTop: 12 }}>上次更新：{at || '尚未更新'} ｜ 已探活 {times} 次</p>

      <p style={tip}>试试把 3000 改成 1000，耗时数字会跳得飞快；点「暂停」它会立刻停下来</p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24', background: '#f7faf8' }
const h4 = { margin: 0, fontSize: 15 }
const muted = { margin: 0, fontSize: 13, color: '#5c6b63' }
const num = { margin: '6px 0 0', fontSize: 28, fontWeight: 700 }
const card = { flex: 1, padding: 14, background: '#fff', border: '1px solid #e2e9e4', borderRadius: 8 }
const errBox = { marginTop: 12, padding: 12, background: '#fff', borderRadius: 8,
  border: '1px solid #c53030', color: '#c53030', fontSize: 13 }
const btn = { padding: '6px 14px', fontSize: 13, borderRadius: 6, cursor: 'pointer',
  border: '1px solid #2f6b4f', background: '#2f6b4f', color: '#fff' }
const tip = { marginTop: 14, fontSize: 12, color: '#5c6b63', lineHeight: 1.8 }`,
  },
  {
    id: 'p8-debounce-search',
    title: '搜索防抖：停手 500ms 才发请求',
    group: '16-网络请求与刷新',
    summary: '敲了 20 个字只发 3 次请求，计数器一比就知道值不值',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState, useEffect } from 'react'

const ALL = ['苹果', '香蕉', '菠萝', '西瓜', '草莓', '蓝莓', '芒果', '橙子', '葡萄']

// 模拟搜索接口：300ms 后返回包含关键字的水果
function fakeApi(keyword) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ALL.filter((name) => name.includes(keyword)))
    }, 300)
  })
}

export default function Demo() {
  const [keyword, setKeyword] = useState('') // 输入框里的字，每敲一下就变
  const [typed, setTyped] = useState(0) // 敲了几个字（键盘事件次数）
  const [reqs, setReqs] = useState(0) // 真正发出去几次请求
  const [list, setList] = useState(ALL) // 搜索结果
  const [searching, setSearching] = useState(false) // 是否正在搜

  useEffect(() => {
    let cancelled = false
    setSearching(true)

    // 不马上请求，先挂一个 500ms 的定时器
    const timer = setTimeout(async () => {
      const data = await fakeApi(keyword)
      if (cancelled) return
      setList(data)
      setReqs((n) => n + 1) // 走到这里才算真发了一次请求
      setSearching(false)
    }, 500)

    return () => {
      cancelled = true
      clearTimeout(timer) // 500ms 内又敲了一个字 → 上一个定时器在这里被掐掉，请求根本没发出去
    }
  }, [keyword]) // keyword 一变就重新计时，这就是「防抖」的全部秘密

  return (
    <div style={wrap}>
      <h4 style={h4}>水果搜索</h4>

      <input
        value={keyword}
        // 每次输入都更新 keyword，同时给「敲字次数」加一
        onChange={(e) => {
          setKeyword(e.target.value)
          setTyped((n) => n + 1)
        }}
        placeholder="连续快速输入，比如 果 → 苹果"
        style={input}
      />

      <div style={{ display: 'flex', gap: 10, margin: '12px 0' }}>
        <div style={card}>
          <p style={muted}>敲了几个字</p>
          <p style={num}>{typed}</p>
        </div>
        <div style={card}>
          <p style={muted}>实际发了几次请求</p>
          <p style={{ ...num, color: '#2f6b4f' }}>{reqs}</p>
        </div>
      </div>

      {searching ? (
        <p style={muted}>搜索中…</p>
      ) : list.length === 0 ? (
        <p style={muted}>没有匹配的水果</p>
      ) : (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {list.map((name) => (
            <span key={name} style={pill}>{name}</span>
          ))}
        </div>
      )}

      <p style={tip}>
        快速敲十几个字，会发现左边涨得飞快、右边只涨一两次——省下的都是白花的服务器钱。
        <br />
        试试把 500 改成 0，两个数字就几乎一样了
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24', background: '#f7faf8' }
const h4 = { margin: '0 0 12px', fontSize: 15 }
const muted = { margin: 0, fontSize: 13, color: '#5c6b63' }
const num = { margin: '4px 0 0', fontSize: 24, fontWeight: 700 }
const card = { flex: 1, padding: 12, background: '#fff', border: '1px solid #e2e9e4', borderRadius: 8 }
const pill = { padding: '5px 12px', fontSize: 13, background: '#fff',
  border: '1px solid #e2e9e4', borderRadius: 999 }
const input = { width: '100%', padding: '8px 12px', fontSize: 14,
  border: '1px solid #e2e9e4', borderRadius: 6, boxSizing: 'border-box' }
const tip = { marginTop: 14, fontSize: 12, color: '#5c6b63', lineHeight: 1.8 }`,
  },
  {
    id: 'p8-race',
    title: '竞态：慢请求把新数据盖回去了',
    group: '16-网络请求与刷新',
    summary: '先点水果再点蔬菜，不做处理的那边会显示错的分类',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState, useEffect } from 'react'

// 模拟接口：故意让「水果」慢 2 秒，其他分类 300ms 就回来
// 于是「先点水果、马上点蔬菜」时，水果的结果一定后到
function fakeApi(cat) {
  const delay = cat === '水果' ? 2000 : 300
  return new Promise((resolve) => {
    setTimeout(() => resolve(cat + ' 的商品（耗时 ' + delay + 'ms）'), delay)
  })
}

const CATS = ['水果', '蔬菜', '零食']

export default function Demo() {
  const [cat, setCat] = useState('水果') // 当前选中的分类，两栏共用
  const [wrong, setWrong] = useState('—') // 左栏：不处理竞态
  const [right, setRight] = useState('—') // 右栏：处理竞态

  // ❌ 谁最后回来就用谁的结果，跟用户点的顺序无关
  useEffect(() => {
    fakeApi(cat).then((txt) => setWrong(txt)) // 迟到的旧请求会把新数据覆盖掉
  }, [cat])

  // ✅ 每次 cat 变化，先把上一轮标记成「过期」，过期的结果直接丢掉
  useEffect(() => {
    let ignore = false // 这一轮请求还算数吗？
    fakeApi(cat).then((txt) => {
      if (ignore) return // 已经切到别的分类了，这个结果作废
      setRight(txt)
    })
    return () => {
      ignore = true // 清理函数在「下一次 effect 执行前」和「卸载时」都会跑
    }
  }, [cat])

  return (
    <div style={wrap}>
      <h4 style={h4}>请求回来的顺序是乱的</h4>

      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)} // 切换分类会同时触发上面两个 effect
            style={c === cat ? btnOn : btn}
          >
            {c}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 14 }}>
        <div style={{ ...col, border: '2px solid #e0a0a0' }}>
          <p style={tag}>❌ 直接 setState</p>
          <p style={out}>{wrong}</p>
        </div>
        <div style={{ ...col, border: '2px solid #8fc0a9' }}>
          <p style={tag}>✅ 用 ignore 丢掉过期结果</p>
          <p style={out}>{right}</p>
        </div>
      </div>

      <p style={{ ...muted, marginTop: 12 }}>
        你当前点的是：<b>{cat}</b>
      </p>

      <p style={tip}>
        操作步骤：点「水果」，然后马上点「蔬菜」。
        左边会先显示蔬菜、两秒后又变回水果（错的）；右边永远停在你最后点的那个。
        <br />
        试试把 2000 改成 200，竞态就不容易复现了——但它并没有消失，只是运气好
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24', background: '#f7faf8' }
const h4 = { margin: '0 0 12px', fontSize: 15 }
const muted = { margin: 0, fontSize: 13, color: '#5c6b63' }
const col = { flex: 1, padding: 14, background: '#fff', border: '2px solid', borderRadius: 10 }
const tag = { margin: '0 0 8px', fontSize: 13, color: '#5c6b63' }
const out = { margin: 0, fontSize: 13, fontWeight: 600, lineHeight: 1.6 }
const btn = { padding: '6px 14px', fontSize: 13, borderRadius: 6, cursor: 'pointer',
  border: '1px solid #e2e9e4', background: '#fff', color: '#1f2a24' }
const btnOn = { ...btn, background: '#2f6b4f', border: '1px solid #2f6b4f', color: '#fff' }
const tip = { marginTop: 14, fontSize: 12, color: '#5c6b63', lineHeight: 1.8 }`,
  },
  {
    id: 'p8-pagination',
    title: '分页加载：一页一页换',
    group: '16-网络请求与刷新',
    summary: 'page 变了就重新请求，首末页禁用按钮',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState, useEffect } from 'react'

// 假装数据库里有 23 条数据
const DB = Array.from({ length: 23 }, (_, i) => '第 ' + (i + 1) + ' 号商品')

// 模拟分页接口：接收页码和每页条数，返回这一页的数据 + 总条数
// 总条数必须由后端给，前端才知道一共有几页
function fakeApi(page, pageSize) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list: DB.slice((page - 1) * pageSize, page * pageSize), // 切出这一页
        total: DB.length,
      })
    }, 500)
  })
}

const PAGE_SIZE = 5

export default function Demo() {
  const [page, setPage] = useState(1) // 当前页码，从 1 开始（后端习惯）
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    setLoading(true)
    fakeApi(page, PAGE_SIZE).then((res) => {
      if (ignore) return // 快速连点翻页时，丢掉过期的那一页结果
      setList(res.list) // 分页是「替换」：新一页顶掉旧一页
      setTotal(res.total)
      setLoading(false)
    })
    return () => {
      ignore = true
    }
  }, [page]) // 页码一变就重新请求，这是分页的核心

  const pages = Math.ceil(total / PAGE_SIZE) || 1 // 总页数 = 总条数 ÷ 每页条数，向上取整

  return (
    <div style={wrap}>
      <h4 style={h4}>商品列表</h4>

      <div style={{ minHeight: 150 }}>
        {loading ? (
          <p style={muted}>加载第 {page} 页…</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 2 }}>
            {list.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
        {/* 第一页时禁用「上一页」，否则会请求 page=0 这种非法页码 */}
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 1 || loading} style={page === 1 || loading ? btnOff : btn}>
          上一页
        </button>

        <span style={muted}>{\`第 \${page} / \${pages} 页\`}</span>

        {/* 最后一页时禁用「下一页」 */}
        <button onClick={() => setPage((p) => p + 1)} disabled={page === pages || loading} style={page === pages || loading ? btnOff : btn}>
          下一页
        </button>

        <span style={muted}>共 {total} 条</span>
      </div>

      <p style={tip}>
        试试把 PAGE_SIZE 改成 10，页数会从 5 页变成 3 页；
        把 minHeight: 150 删掉，翻页时列表会上下抖动——这就是它存在的理由
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24', background: '#f7faf8' }
const h4 = { margin: '0 0 12px', fontSize: 15 }
const muted = { margin: 0, fontSize: 13, color: '#5c6b63' }
const btn = { padding: '6px 14px', fontSize: 13, borderRadius: 6, cursor: 'pointer',
  border: '1px solid #2f6b4f', background: '#2f6b4f', color: '#fff' }
const btnOff = { ...btn, background: '#c8d5cd', border: '1px solid #c8d5cd', cursor: 'not-allowed' }
const tip = { marginTop: 16, fontSize: 12, color: '#5c6b63', lineHeight: 1.8 }`,
  },
  {
    id: 'p8-load-more',
    title: '加载更多：追加而不是替换',
    group: '16-网络请求与刷新',
    summary: '和分页只差一个字：新数据 push 到旧列表后面',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState, useEffect } from 'react'

const DB = Array.from({ length: 12 }, (_, i) => '动态 #' + (i + 1))
const PAGE_SIZE = 4

// 和分页用的是同一个接口，区别完全在前端怎么用返回值
function fakeApi(page) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list: DB.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        total: DB.length,
      })
    }, 700)
  })
}

export default function Demo() {
  const [list, setList] = useState([]) // 累积起来的全部数据
  const [page, setPage] = useState(1) // 下一次要请求第几页
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  // 请求一页，并把结果「追加」到列表尾部
  async function loadPage(p) {
    setLoading(true)
    const res = await fakeApi(p)
    // 分页写的是 setList(res.list)（替换），这里写的是展开旧数组再拼新数组（追加）
    setList((prev) => [...prev, ...res.list])
    setTotal(res.total)
    setPage(p + 1) // 下次点按钮就去拿下一页
    setLoading(false)
  }

  useEffect(() => {
    let ignore = false
    fakeApi(1).then((res) => {
      if (ignore) return // 卸载后不再写 state
      setList(res.list)
      setTotal(res.total)
      setPage(2)
    })
    return () => {
      ignore = true
    }
  }, []) // 只在挂载时拉第一页

  const noMore = total > 0 && list.length >= total // 已经把所有数据都加载完了吗

  return (
    <div style={wrap}>
      <h4 style={h4}>动态流（累加式）</h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {list.map((t) => (
          <div key={t} style={row}>{t}</div>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        {noMore ? (
          // 到底了要明确告诉用户，不然他会一直点
          <p style={muted}>—— 没有更多了 ——</p>
        ) : (
          <button onClick={() => loadPage(page)} disabled={loading} style={loading ? btnOff : btn}>
            {loading ? '加载中…' : '加载更多'}
          </button>
        )}
        <p style={{ ...muted, marginTop: 8 }}>
          已显示 {list.length} / {total} 条
        </p>
      </div>

      <p style={tip}>
        它和分页的区别只有一行：分页是 setList(新的)，加载更多是 setList([...旧的, ...新的])。
        <br />
        试试把 loadPage 里的展开写法改成 setList(res.list)，它就退化成分页了
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24', background: '#f7faf8' }
const h4 = { margin: '0 0 12px', fontSize: 15 }
const muted = { margin: 0, fontSize: 13, color: '#5c6b63' }
const row = { padding: '9px 12px', fontSize: 13, background: '#fff',
  border: '1px solid #e2e9e4', borderRadius: 6 }
const btn = { padding: '7px 16px', fontSize: 13, borderRadius: 6, cursor: 'pointer',
  border: '1px solid #2f6b4f', background: '#2f6b4f', color: '#fff' }
const btnOff = { ...btn, background: '#c8d5cd', border: '1px solid #c8d5cd', cursor: 'not-allowed' }
const tip = { marginTop: 16, fontSize: 12, color: '#5c6b63', lineHeight: 1.8 }`,
  },
  {
    id: 'p8-post-form',
    title: '提交表单：防止重复提交',
    group: '16-网络请求与刷新',
    summary: '提交中禁用按钮，成功清空、失败保留内容可重试',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

// 模拟「新增留言」的 POST 接口：800ms 后返回，30% 概率失败
// 故意留失败分支，方便你看到错误态长什么样
function fakeApi(text) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) reject(new Error('服务器开小差了，请重试'))
      else resolve({ id: Date.now(), text }) // 成功时后端一般会把新记录还给前端
    }, 800)
  })
}

export default function Demo() {
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false) // 正在提交？靠它禁用按钮
  const [ok, setOk] = useState('') // 成功提示
  const [error, setError] = useState('') // 失败提示
  const [list, setList] = useState([]) // 已提交的留言

  async function submit() {
    if (sending) return // 双保险：万一按钮没禁用成功，这里也拦一道
    if (!text.trim()) {
      setError('留言不能为空') // 能在前端拦掉的，就别浪费一次请求
      return
    }
    setSending(true)
    setError('')
    setOk('')
    try {
      const saved = await fakeApi(text.trim())
      setList((prev) => [saved, ...prev]) // 把后端返回的新记录插到最前面
      setText('') // 成功才清空输入框
      setOk('提交成功！')
    } catch (err) {
      setError(err.message) // 失败时输入内容原样保留，用户可以直接再点一次
    } finally {
      setSending(false) // 不管成败都要解锁按钮，否则表单会永久卡死
    }
  }

  return (
    <div style={wrap}>
      <h4 style={h4}>写条留言</h4>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={sending} // 提交期间连输入框一起锁上，避免改了内容却提交了旧值
        placeholder="说点什么…（接口有 30% 概率失败，多点几次能看到错误）"
        style={area}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
        <button onClick={submit} disabled={sending} style={sending ? btnOff : btn}>
          {sending ? '提交中…' : '提交'}
        </button>
        {/* 成功和失败只显示一个，因为提交前都清空了 */}
        {ok && <span style={{ fontSize: 13, color: '#2f6b4f' }}>{ok}</span>}
        {error && <span style={{ fontSize: 13, color: '#c53030' }}>❌ {error}</span>}
      </div>

      <div style={{ marginTop: 14 }}>
        {list.length === 0 ? (
          <p style={muted}>还没有留言</p>
        ) : (
          list.map((it) => (
            <div key={it.id} style={row}>{it.text}</div>
          ))
        )}
      </div>

      <p style={tip}>
        提交那 800ms 里疯狂点按钮，也只会发出一次请求——因为 sending 把它锁住了。
        <br />
        试试把按钮上的 disabled 那一行删掉，就能点出一堆重复留言
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24', background: '#f7faf8' }
const h4 = { margin: '0 0 10px', fontSize: 15 }
const muted = { margin: 0, fontSize: 13, color: '#5c6b63' }
const area = { width: '100%', height: 64, padding: 10, fontSize: 13, fontFamily: 'inherit',
  border: '1px solid #e2e9e4', borderRadius: 6, boxSizing: 'border-box', resize: 'vertical' }
const row = { padding: '8px 12px', marginBottom: 6, fontSize: 13, background: '#fff',
  border: '1px solid #e2e9e4', borderRadius: 6 }
const btn = { padding: '7px 16px', fontSize: 13, borderRadius: 6, cursor: 'pointer',
  border: '1px solid #2f6b4f', background: '#2f6b4f', color: '#fff' }
const btnOff = { ...btn, background: '#c8d5cd', border: '1px solid #c8d5cd', cursor: 'not-allowed' }
const tip = { marginTop: 14, fontSize: 12, color: '#5c6b63', lineHeight: 1.8 }`,
  },
  {
    id: 'p8-optimistic',
    title: '乐观更新：先变界面，失败再回滚',
    group: '16-网络请求与刷新',
    summary: '点赞立刻变红，接口失败才撤回，体验差别一试就懂',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

// 模拟点赞接口：故意慢 1.5 秒，并且有 40% 概率失败
function fakeApi() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.4) reject(new Error('网络不给力'))
      else resolve(true)
    }, 1500)
  })
}

export default function Demo() {
  // 左边：老实等接口回来再改界面
  const [slowLiked, setSlowLiked] = useState(false)
  const [slowCount, setSlowCount] = useState(10)
  const [slowBusy, setSlowBusy] = useState(false)
  // 右边：先改界面，失败再撤回（这就是「乐观更新」）
  const [fastLiked, setFastLiked] = useState(false)
  const [fastCount, setFastCount] = useState(10)
  const [msg, setMsg] = useState('')

  async function likeSlow() {
    setSlowBusy(true) // 用户会盯着「处理中」等 1.5 秒
    setMsg('')
    try {
      await fakeApi()
      setSlowLiked(true) // 接口成功了才让心变红
      setSlowCount((n) => n + 1)
    } catch (err) {
      setMsg('左边失败了：' + err.message + '（界面本来就没变，不用回滚）')
    } finally {
      setSlowBusy(false)
    }
  }

  async function likeFast() {
    setFastLiked(true) // 不等接口，立刻变红
    setFastCount((n) => n + 1) // 数字也立刻 +1，用户零等待
    setMsg('')
    try {
      await fakeApi()
    } catch (err) {
      // 失败了就把刚才那两步撤销回去，并且告诉用户一声
      setFastLiked(false)
      setFastCount((n) => n - 1)
      setMsg('右边失败了：' + err.message + '（已回滚成原样）')
    }
  }

  return (
    <div style={wrap}>
      <h4 style={h4}>同一个慢接口，两种点赞体验</h4>

      <div style={{ display: 'flex', gap: 14 }}>
        <div style={{ ...col, border: '2px solid #e0a0a0' }}>
          <p style={tag}>等接口回来再更新</p>
          <button onClick={likeSlow} disabled={slowBusy || slowLiked} style={heart(slowLiked)}>
            {slowLiked ? '♥' : '♡'} {slowCount}
          </button>
          <p style={muted}>{slowBusy ? '处理中…（干等 1.5 秒）' : '点一下试试'}</p>
        </div>

        <div style={{ ...col, border: '2px solid #8fc0a9' }}>
          <p style={tag}>✅ 乐观更新</p>
          <button onClick={likeFast} disabled={fastLiked} style={heart(fastLiked)}>
            {fastLiked ? '♥' : '♡'} {fastCount}
          </button>
          <p style={muted}>点一下：瞬间就变了</p>
        </div>
      </div>

      {/* 失败提示，两边共用一行 */}
      {msg && <p style={{ marginTop: 12, fontSize: 13, color: '#c53030' }}>{msg}</p>}

      <p style={tip}>
        多点几次（有 40% 会失败）：右边偶尔会红一下又弹回去，这就是回滚。
        代价是「偶尔闪回」，换来的是「绝大多数情况下零等待」。
        <br />
        试试把 1500 改成 100，两种写法的差别就几乎看不出来了——接口越慢，乐观更新越值
      </p>
    </div>
  )
}

// 心形按钮的样式随「有没有点赞」变化，所以写成函数
const heart = (on) => ({ padding: '8px 18px', fontSize: 18, borderRadius: 999, background: '#fff',
  border: '1px solid ' + (on ? '#c53030' : '#e2e9e4'), color: on ? '#c53030' : '#5c6b63',
  cursor: on ? 'default' : 'pointer' })
const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24', background: '#f7faf8' }
const h4 = { margin: '0 0 12px', fontSize: 15 }
const muted = { margin: '10px 0 0', fontSize: 12, color: '#5c6b63' }
const col = { flex: 1, padding: 14, background: '#fff', border: '2px solid', borderRadius: 10 }
const tag = { margin: '0 0 10px', fontSize: 13, color: '#5c6b63' }
const tip = { marginTop: 14, fontSize: 12, color: '#5c6b63', lineHeight: 1.8 }`,
  },
  {
    id: 'p8-dog-image',
    title: '随机狗图（真实接口 + 图片加载态）',
    group: '16-网络请求与刷新',
    summary: '要地址、下图片是两次独立的加载，要分开做状态',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState, useEffect } from 'react'

export default function Demo() {
  const [url, setUrl] = useState('') // 接口返回的图片地址
  const [loadingUrl, setLoadingUrl] = useState(true) // 第一段：正在向接口要地址
  const [imgReady, setImgReady] = useState(false) // 第二段：地址有了，浏览器还在下载图片
  const [error, setError] = useState('')
  const [seed, setSeed] = useState(0) // 这个数一变就重新请求，这就是「换一张」的开关

  useEffect(() => {
    let ignore = false
    const ac = new AbortController() // 卸载时用它取消请求
    setLoadingUrl(true)
    setImgReady(false) // 换图时要把图片状态也重置，否则会先闪一下旧图
    setError('')
    setUrl('')

    fetch('https://dog.ceo/api/breeds/image/random', { signal: ac.signal })
      .then((res) => {
        if (!res.ok) throw new Error('接口返回 ' + res.status) // fetch 不会因为 500 自己抛错
        return res.json()
      })
      .then((data) => {
        if (!ignore) setUrl(data.message) // 这个接口把图片地址放在 message 字段里
      })
      .catch((err) => {
        if (ignore || err.name === 'AbortError') return // 主动取消不是错误
        setError(err.message || '请求失败')
      })
      .finally(() => {
        if (!ignore) setLoadingUrl(false)
      })

    return () => {
      ignore = true
      ac.abort() // 切走 demo 时把没跑完的请求掐掉
    }
  }, [seed]) // seed 变 → effect 重跑 → 又是一张新狗

  return (
    <div style={wrap}>
      <h4 style={h4}>随机狗狗</h4>

      <div style={stage}>
        {/* 第一段状态：还没拿到地址 */}
        {loadingUrl && <span style={muted}>正在向接口要图片地址…</span>}

        {/* 出错：真实网络请求必须有的分支 */}
        {!loadingUrl && error && (
          <div style={errBox}>
            <b>请求失败：</b>
            {error}
            <p style={{ margin: '6px 0 0', color: '#5c6b63', fontSize: 12 }}>
              没联网的话这里会显示错误提示，这正是错误处理该有的样子
            </p>
          </div>
        )}

        {/* 第二段状态：地址到手，但图片本身还在下载 */}
        {url && !imgReady && !error && <span style={muted}>地址拿到了，图片正在下载…</span>}

        {/* 第三段状态：图片下载完成才显示出来（没完成时用 display 藏着，onLoad 才会触发） */}
        {url && !error && (
          <img
            src={url}
            alt="随机狗狗"
            onLoad={() => setImgReady(true)} // 浏览器把图片下完了会调这个
            onError={() => setError('图片下载失败')} // 地址有效但图挂了，也要兜住
            style={{ ...img, display: imgReady ? 'block' : 'none' }}
          />
        )}
      </div>

      <button onClick={() => setSeed((n) => n + 1)} disabled={loadingUrl} style={loadingUrl ? btnOff : btn}>
        {loadingUrl ? '请求中…' : '换一张'}
      </button>

      <p style={tip}>
        注意这里有两次加载：先问接口要地址（快），再让浏览器下图片（慢）。
        只做一个 loading 的话，图片下载那段用户会看到空白。
        <br />
        试试把 onLoad 那行删掉，图片就永远显示不出来了——因为 imgReady 再也不会变 true
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24', background: '#f7faf8' }
const h4 = { margin: '0 0 12px', fontSize: 15 }
const muted = { fontSize: 13, color: '#5c6b63' }
const stage = { display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 240, height: 240, marginBottom: 12, padding: 8, background: '#fff',
  border: '1px solid #e2e9e4', borderRadius: 10, boxSizing: 'border-box' }
const img = { width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }
const errBox = { fontSize: 13, color: '#c53030', lineHeight: 1.6 }
const btn = { padding: '7px 16px', fontSize: 13, borderRadius: 6, cursor: 'pointer',
  border: '1px solid #2f6b4f', background: '#2f6b4f', color: '#fff' }
const btnOff = { ...btn, background: '#c8d5cd', border: '1px solid #c8d5cd', cursor: 'not-allowed' }
const tip = { marginTop: 14, fontSize: 12, color: '#5c6b63', lineHeight: 1.8 }`,
  },
]

export default part8
