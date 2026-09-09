/**
 * 演练台 · React 状态管理
 *
 * 和前面 part1~part4 的区别：
 * 这些 Demo 的 code 不是 HTML 片段，而是 React 源码，所以多了两个字段：
 *   runtime: 'react'  → 告诉演练台走 Babel 编译后直接渲染，而不是塞进 iframe
 *   language: 'tsx'   → 让左侧编辑器按 JSX/TSX 高亮
 *
 * 沙箱里只能 import react / antd / @ant-design/icons / dayjs，
 * 而且必须 export default 一个组件。没有 CSS 文件，样式全写内联 style。
 */
const part5 = [
  {
    id: 'p5-counter',
    title: 'useState 计数器（最小状态）',
    group: '13-React状态管理',
    summary: '一个 state + 一个按钮，看清「改数据 → 界面自动重画」',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react' // useState 是「让组件记住一个值」的钩子

export default function Demo() { // 演练台约定：必须默认导出一个组件
  // 解构出两样东西：当前值 count，和修改它的函数 setCount
  // useState(0) 里的 0 是初始值，只在第一次渲染时生效
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui' }}>
      {/* 直接把 state 写进 JSX，count 变了这里就会自动重画 */}
      <p style={{ fontSize: 40, margin: '0 0 16px', fontWeight: 700 }}>{count}</p>

      <div style={{ display: 'flex', gap: 8 }}>
        {/* 点击时调用 setCount，React 收到通知后重新执行整个组件函数 */}
        <button onClick={() => setCount(count + 1)} style={btn}>+1</button>
        <button onClick={() => setCount(count - 1)} style={btn}>-1</button>
        {/* 恢复初始值就是再 set 一次 0，不需要什么特殊 API */}
        <button onClick={() => setCount(0)} style={{ ...btn, background: '#fff', color: '#1f2a24' }}>
          归零
        </button>
      </div>

      <p style={{ marginTop: 16, fontSize: 13, color: '#5c6b63' }}>
        试试把上面的 useState(0) 改成 useState(100)，右边会从 100 开始
      </p>
    </div>
  )
}

// 样式抽成对象复用，避免每个按钮重复写一遍
const btn = {
  padding: '8px 16px',
  fontSize: 14,
  border: '1px solid #2f6b4f',
  borderRadius: 6,
  background: '#2f6b4f',
  color: '#fff',
  cursor: 'pointer',
}`,
  },
  {
    id: 'p5-state-stale',
    title: '连点三次的陷阱：直接传值 vs 函数式更新',
    group: '13-React状态管理',
    summary: '同一次点击里连写三次 setN(n+1) 只加 1，这是新手第一大坑',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

export default function Demo() {
  const [a, setA] = useState(0) // 左边：用「直接传新值」的写法
  const [b, setB] = useState(0) // 右边：用「函数式更新」的写法

  function addThreeWrong() {
    // ❌ 三行读到的 a 都是本次渲染时的那个快照（比如都是 0）
    // 于是三次都在算 0 + 1，最终只加了 1
    setA(a + 1)
    setA(a + 1)
    setA(a + 1)
  }

  function addThreeRight() {
    // ✅ 传函数时，React 会把「上一次的结果」喂给你
    // 所以三次分别算 0→1、1→2、2→3，真的加了 3
    setB((prev) => prev + 1)
    setB((prev) => prev + 1)
    setB((prev) => prev + 1)
  }

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ ...box, border: '2px solid #e0a0a0' }}>
          <p style={tag}>❌ setA(a + 1) 写三次</p>
          <p style={num}>{a}</p>
          <button onClick={addThreeWrong} style={btn}>点我加三次</button>
        </div>

        <div style={{ ...box, border: '2px solid #8fc0a9' }}>
          <p style={tag}>✅ setB(v =&gt; v + 1) 写三次</p>
          <p style={num}>{b}</p>
          <button onClick={addThreeRight} style={btn}>点我加三次</button>
        </div>
      </div>

      <p style={{ marginTop: 16, fontSize: 13, color: '#5c6b63', lineHeight: 1.7 }}>
        各点一次：左边只涨 1，右边涨 3。
        <br />
        原因：组件函数每次渲染都是一个独立快照，a 在这次渲染里是个固定的数字，
        连写三次等于算了三遍同样的加法。要基于「最新值」累加，就必须传函数。
      </p>
    </div>
  )
}

const box = { flex: 1, padding: 14, border: '2px solid', borderRadius: 10 }
const tag = { margin: '0 0 8px', fontSize: 13, color: '#5c6b63' }
const num = { margin: '0 0 12px', fontSize: 32, fontWeight: 700 }
const btn = {
  padding: '7px 14px',
  fontSize: 13,
  border: '1px solid #2f6b4f',
  borderRadius: 6,
  background: '#2f6b4f',
  color: '#fff',
  cursor: 'pointer',
}`,
  },
  {
    id: 'p5-boolean-toggle',
    title: '布尔开关与两种条件渲染',
    group: '13-React状态管理',
    summary: '一个 !open 取反玩转展开/收起，顺带讲清 && 和三元的分工',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

export default function Demo() {
  // 布尔 state 的惯例命名：值叫 open，改它的函数叫 setOpen
  const [open, setOpen] = useState(false) // 详情面板要不要显示
  const [agree, setAgree] = useState(false) // 协议有没有勾上

  return (
    <div style={wrap}>
      {/* !open 就是「取反」：true 变 false、false 变 true，这就是开关的全部秘密 */}
      <button onClick={() => setOpen(!open)} style={btn}>
        {/* 按钮文字也跟着 state 走：两种情况都要显示内容 → 用三元 */}
        {open ? '收起详情' : '展开详情'}
      </button>

      {/* 条件渲染写法一：&& —— 左边为真才渲染右边，为假就什么都不画 */}
      {open && (
        <div style={panel}>
          我是详情内容。注意：open 为 false 时我不是被藏起来了，而是压根没被渲染出来。
        </div>
      )}

      {/* 受控复选框：checked 读 state，onChange 里把 state 改掉 */}
      <label style={row}>
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)} // e.target.checked 就是勾选后的新布尔值
        />
        <span>我已阅读并同意用户协议</span>
      </label>

      {/* 条件渲染写法二：三元 —— 真假两边都要显示东西时用它 */}
      {agree ? (
        <p style={{ ...tip, color: '#2f6b4f' }}>✅ 已同意，可以提交了</p>
      ) : (
        <p style={{ ...tip, color: '#c53030' }}>❌ 还没同意，提交按钮是灰的</p>
      )}

      {/* 布尔 state 还能直接喂给 disabled 这类属性，不用写 if */}
      <button disabled={!agree} style={{ ...btn, opacity: agree ? 1 : 0.45 }}>
        提交
      </button>

      <p style={hint}>
        试试把 setOpen(!open) 改成 setOpen((v) =&gt; !v)：效果一样，但后者拿到的是最新值，更稳妥
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }
const panel = {
  margin: '12px 0',
  padding: 12,
  background: '#f7faf8',
  border: '1px solid #e2e9e4',
  borderRadius: 8,
  fontSize: 13,
  lineHeight: 1.7,
}
const row = { display: 'flex', alignItems: 'center', gap: 8, margin: '12px 0', fontSize: 14 }
const tip = { margin: '0 0 12px', fontSize: 14 }
const hint = { marginTop: 16, fontSize: 13, color: '#5c6b63' }
const btn = {
  padding: '7px 14px',
  fontSize: 13,
  border: '1px solid #2f6b4f',
  borderRadius: 6,
  background: '#2f6b4f',
  color: '#fff',
  cursor: 'pointer',
}`,
  },
  {
    id: 'p5-object-state',
    title: '对象 state：改属性没用，要换新对象',
    group: '13-React状态管理',
    summary: '左边表单打字界面纹丝不动，右边正常——差别只在一个展开运算符',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

// 三个字段抽出来循环渲染，省得同样的 input 写三遍
const FIELDS = [
  { key: 'name', label: '姓名' },
  { key: 'email', label: '邮箱' },
  { key: 'city', label: '城市' },
]

export default function Demo() {
  // 两份内容一样的数据，但必须各写一个对象字面量：共用一个的话左边会把右边也改坏
  const [bad, setBad] = useState({ name: '小明', email: 'ming@qq.com', city: '杭州' })
  const [good, setGood] = useState({ name: '小明', email: 'ming@qq.com', city: '杭州' })
  const [tick, setTick] = useState(0) // 这个 state 只用来手动逼 React 重画一次

  function changeBad(key, value) {
    bad[key] = value // ❌ 就地改属性：里面的值确实变了，但对象本身还是原来那个
    setBad(bad) // React 拿新旧值一比，发现是同一个对象 → 判定「没变化」→ 不重画
  }

  function changeGood(key, value) {
    // ✅ 先展开旧对象的全部字段，再覆盖其中一个，得到一个全新对象（引用变了）
    setGood({ ...good, [key]: value })
  }

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <Card title="❌ user.name = x; setUser(user)" color="#e0a0a0" data={bad} onChange={changeBad} />
        <Card title="✅ setUser({ ...user, name: x })" color="#8fc0a9" data={good} onChange={changeGood} />
      </div>

      <button onClick={() => setTick(tick + 1)} style={btn}>强制重新渲染一次（第 {tick} 次）</button>

      <p style={hint}>
        在左边任意输入框里打几个字：下面那行「组件里读到的」一动不动。
        <br />
        再点上面那个按钮 —— 左边的文字突然跳出来了，说明数据早就被改掉了，只是 React 完全不知情。
        <br />
        试试把 changeBad 的两行换成 changeGood 的写法，左边立刻就正常了。
      </p>
    </div>
  )
}

// 左右两栏共用的小卡片，唯一的区别是外面传进来的 onChange 不一样
function Card({ title, color, data, onChange }) {
  return (
    <div style={{ flex: 1, padding: 14, border: '2px solid ' + color, borderRadius: 10 }}>
      <p style={{ margin: '0 0 10px', fontSize: 13, color: '#5c6b63' }}>{title}</p>
      {FIELDS.map((f) => (
        // 循环渲染每一项都要给 key，React 靠它认人
        <label key={f.key} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <span style={{ width: 34, fontSize: 13, color: '#5c6b63' }}>{f.label}</span>
          {/* 受控输入框：value 来自 state，改动交给 onChange 处理 */}
          <input value={data[f.key]} onChange={(e) => onChange(f.key, e.target.value)} style={input} />
        </label>
      ))}
      <p style={preview}>组件里读到的：{data.name} / {data.email} / {data.city}</p>
    </div>
  )
}

const input = {
  flex: 1,
  minWidth: 0,
  padding: '5px 8px',
  fontSize: 13,
  border: '1px solid #e2e9e4',
  borderRadius: 6,
}
const preview = { margin: '10px 0 0', padding: 8, background: '#f7faf8', borderRadius: 6, fontSize: 13 }
const hint = { marginTop: 14, fontSize: 13, color: '#5c6b63', lineHeight: 1.8 }
const btn = {
  marginTop: 14,
  padding: '7px 14px',
  fontSize: 13,
  border: '1px solid #2f6b4f',
  borderRadius: 6,
  background: '#2f6b4f',
  color: '#fff',
  cursor: 'pointer',
}`,
  },
  {
    id: 'p5-array-state',
    title: '数组 state：增删改都要返回新数组',
    group: '13-React状态管理',
    summary: 'push 点了没反应，展开/filter/map 才是 React 认的三板斧',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

export default function Demo() {
  // 两份独立的初始数组：不能共用同一个，否则左边 push 会顺手把右边也改了
  const [badList, setBadList] = useState(['React', 'CSS'])
  const [goodList, setGoodList] = useState(['React', 'CSS'])
  const [text, setText] = useState('') // 输入框内容：新标签名，也用作改名后的名字

  function addBad() {
    badList.push(text || '新标签') // ❌ push 是「就地追加」，数组还是原来那个数组
    setBadList(badList) // 引用没变 → React 认为没变化 → 界面一动不动
  }

  function addGood() {
    setGoodList([...goodList, text || '新标签']) // ✅ 展开旧数组 + 追加一项 = 全新数组
    setText('') // 加完顺手清空输入框
  }

  function removeGood(i) {
    // ✅ filter 天生返回新数组：只留下「下标不等于 i」的那些项
    setGoodList(goodList.filter((_, idx) => idx !== i))
  }

  function renameGood(i) {
    // ✅ map 也返回新数组：命中的那项换成新名字，其它原样返回
    setGoodList(goodList.map((t, idx) => (idx === i ? text || t + '·改' : t)))
  }

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }}>
      {/* 输入框内容也是一个 state：输入什么，添加/改名就用什么 */}
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="先在这里输入标签名" style={input} />

      <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
        <div style={{ ...box, border: '2px solid #e0a0a0' }}>
          <p style={tag}>❌ list.push(x) 之后 setList(list)</p>
          <div style={chips}>{badList.map((t, i) => <span key={i} style={chip}>{t}</span>)}</div>
          <button onClick={addBad} style={btn}>添加</button>
        </div>

        <div style={{ ...box, border: '2px solid #8fc0a9' }}>
          <p style={tag}>✅ [...list, x] / filter / map</p>
          <div style={chips}>
            {goodList.map((t, i) => (
              <span key={i} style={chip}>
                {t}
                {/* 改名：把这一项换成输入框里的名字 */}
                <b onClick={() => renameGood(i)} style={mini}>改</b>
                {/* 删除：按下标把这一项筛掉 */}
                <b onClick={() => removeGood(i)} style={mini}>×</b>
              </span>
            ))}
          </div>
          <button onClick={addGood} style={btn}>添加</button>
        </div>
      </div>

      <p style={hint}>
        两边都点「添加」：左边毫无反应（数据其实已经进去了，只是 React 没被通知），右边正常长出新标签。
        <br />
        记一句话就够：push / splice / sort / reverse 这些「就地改」的方法，用在 state 上一律不生效。
        <br />
        试试把 addBad 改成 setBadList([...badList, text])，左边马上就活过来了。
      </p>
    </div>
  )
}

const box = { flex: 1, padding: 14, border: '2px solid', borderRadius: 10 }
const tag = { margin: '0 0 10px', fontSize: 13, color: '#5c6b63' }
const chips = { display: 'flex', flexWrap: 'wrap', gap: 6, minHeight: 30, marginBottom: 10 }
const chip = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  padding: '3px 8px',
  background: '#f7faf8',
  border: '1px solid #e2e9e4',
  borderRadius: 6,
  fontSize: 13,
}
const mini = { color: '#5c6b63', cursor: 'pointer', fontWeight: 400 }
const input = { width: '100%', padding: '6px 10px', fontSize: 13, border: '1px solid #e2e9e4', borderRadius: 6 }
const hint = { marginTop: 14, fontSize: 13, color: '#5c6b63', lineHeight: 1.8 }
const btn = { padding: '6px 14px', fontSize: 13, border: '1px solid #2f6b4f', borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer' }`,
  },
  {
    id: 'p5-lazy-init',
    title: '惰性初始化：别让初始值每次渲染都白算',
    group: '13-React状态管理',
    summary: 'useState(f()) 每渲染一次算一遍，useState(() => f()) 只算一次',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

// 用一个模块级对象记「初始化函数被真正执行了几次」，直接显示在界面上（比 console.log 看得见）
const runs = { eager: 0, lazy: 0 }

// 假装这是个很贵的初始化：读 localStorage、算一大堆数据……
function expensiveInit(tag) {
  let sum = 0
  for (let i = 0; i < 100000; i++) sum += i // 空转十万次，模拟耗时
  runs[tag] += 1 // 每被调用一次就记一笔
  return 0 // 这个返回值会被当作 state 的初始值
}

export default function Demo() {
  // ❌ 带括号 = 每次渲染都真的把函数执行一遍
  //    只有第一次的返回值会被采纳，之后每次渲染都是白算，纯浪费
  const [a, setA] = useState(expensiveInit('eager'))

  // ✅ 把函数「本身」交给 useState（注意没有括号，不是在这里调用它）
  //    React 只在第一次渲染时替你调用一次，之后再也不碰 —— 这就叫惰性初始化
  const [b, setB] = useState(() => expensiveInit('lazy'))

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ ...box, border: '2px solid #e0a0a0' }}>
          <p style={tag}>❌ useState(expensiveInit())</p>
          <p style={num}>初始化跑了 {runs.eager} 次</p>
          <button onClick={() => setA(a + 1)} style={btn}>点我重新渲染（a = {a}）</button>
        </div>

        <div style={{ ...box, border: '2px solid #8fc0a9' }}>
          <p style={tag}>✅ useState(() =&gt; expensiveInit())</p>
          <p style={num}>初始化跑了 {runs.lazy} 次</p>
          <button onClick={() => setB(b + 1)} style={btn}>点我重新渲染（b = {b}）</button>
        </div>
      </div>

      <p style={hint}>
        随便点几下按钮（每点一下就是一次重新渲染）：左边的次数一路往上涨，右边永远停着不动。
        <br />
        小提示：教学站开了 React 严格模式，开发环境下 React 会故意多跑一遍来帮你发现副作用，
        所以起步数字可能是 2 而不是 1，不影响结论。
        <br />
        试试把右边的 () =&gt; 去掉，它立刻就退化成左边那种每次都白算的写法。
      </p>
    </div>
  )
}

const box = { flex: 1, padding: 14, border: '2px solid', borderRadius: 10 }
const tag = { margin: '0 0 8px', fontSize: 13, color: '#5c6b63' }
const num = { margin: '0 0 12px', fontSize: 20, fontWeight: 700 }
const hint = { marginTop: 16, fontSize: 13, color: '#5c6b63', lineHeight: 1.8 }
const btn = {
  padding: '7px 14px',
  fontSize: 13,
  border: '1px solid #2f6b4f',
  borderRadius: 6,
  background: '#2f6b4f',
  color: '#fff',
  cursor: 'pointer',
}`,
  },
  {
    id: 'p5-derived-state',
    title: '派生状态：能算出来的就别存',
    group: '13-React状态管理',
    summary: '购物车总价存成 state 就会忘了同步，渲染时现算永远不会错',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

// 商品清单是死数据，不会变，所以不需要放进 state
const GOODS = [
  { id: 'kb', name: '机械键盘', price: 199 },
  { id: 'ms', name: '无线鼠标', price: 89 },
  { id: 'cp', name: '马克杯', price: 39 },
]

export default function Demo() {
  // 真正的「源头数据」只有这一份：每件商品买了几个
  const [qty, setQty] = useState({ kb: 1, ms: 1, cp: 1 })
  // ❌ 把总价也存成 state：一份能算出来的冗余数据，从此得靠人肉同步
  const [savedTotal, setSavedTotal] = useState(199 + 89 + 39)

  function change(g, delta) {
    const next = Math.max(0, qty[g.id] + delta) // 数量最少减到 0，不能是负数
    setQty({ ...qty, [g.id]: next }) // 对象 state 照例展开一份新的
    // ❌ 手动同步总价：这里只处理了「加」，「减」的分支忘了写
    //    真实项目里的 bug 就长这样 —— 后来多了个入口，没人记得顺手更新那份冗余数据
    if (delta > 0) setSavedTotal(savedTotal + g.price)
  }

  // ✅ 派生状态：能由 qty 算出来的东西就别存，渲染时现算，永远不可能对不上
  const total = GOODS.reduce((sum, g) => sum + g.price * qty[g.id], 0)

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }}>
      {GOODS.map((g) => (
        <div key={g.id} style={row}>
          <span style={{ flex: 1 }}>{g.name}</span>
          <span style={{ width: 60, color: '#5c6b63' }}>￥{g.price}</span>
          {/* 减号：只改数量，总价那份 state 不会跟着动 —— bug 就藏在这 */}
          <button onClick={() => change(g, -1)} style={mini}>-</button>
          <span style={{ width: 28, textAlign: 'center' }}>{qty[g.id]}</span>
          <button onClick={() => change(g, 1)} style={mini}>+</button>
        </div>
      ))}

      <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
        <div style={{ ...box, border: '2px solid #e0a0a0' }}>
          <p style={tag}>❌ 存成 state 的 total</p>
          <p style={{ ...num, color: '#c53030' }}>￥{savedTotal}</p>
        </div>
        <div style={{ ...box, border: '2px solid #8fc0a9' }}>
          <p style={tag}>✅ 渲染时 reduce 现算</p>
          <p style={{ ...num, color: '#2f6b4f' }}>￥{total}</p>
        </div>
      </div>

      <p style={hint}>
        先点几下「+」，两边一致；再点一下「-」—— 左边纹丝不动，两个数字当场对不上了。
        <br />
        判断标准很简单：这个值能不能由别的 state 算出来？能，就别用 useState 存它。
        <br />
        试试把那行改成 setSavedTotal(savedTotal + g.price * delta)：左边暂时对上了，
        可只要以后再加个「清空购物车」按钮，同样的坑还会再踩一次 —— 而右边什么都不用改。
      </p>
    </div>
  )
}

const row = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 10px',
  marginBottom: 6,
  background: '#f7faf8',
  border: '1px solid #e2e9e4',
  borderRadius: 8,
  fontSize: 14,
}
const box = { flex: 1, padding: 14, border: '2px solid', borderRadius: 10 }
const tag = { margin: '0 0 6px', fontSize: 13, color: '#5c6b63' }
const num = { margin: 0, fontSize: 26, fontWeight: 700 }
const hint = { marginTop: 16, fontSize: 13, color: '#5c6b63', lineHeight: 1.8 }
const mini = {
  width: 26,
  height: 26,
  border: '1px solid #2f6b4f',
  borderRadius: 6,
  background: '#fff',
  color: '#2f6b4f',
  cursor: 'pointer',
}`,
  },
  {
    id: 'p5-reducer-todo',
    title: 'useReducer：把改法集中到一个函数里',
    group: '13-React状态管理',
    summary: '待办清单的增删改清空，全靠 dispatch 一个动作对象',
    runtime: 'react',
    language: 'tsx',
    code: `import { useReducer, useState } from 'react'

// reducer 是个纯函数：输入「旧 state + 一个动作」，输出「新 state」
// 所有修改逻辑都收在这里，组件里只管派发动作，不写业务细节
function reducer(state, action) {
  switch (action.type) {
    case 'add': // 新增：展开旧数组 + 追加一条
      return [...state, { id: Date.now(), text: action.text, done: false }]
    case 'toggle': // 切换完成：map 出新数组，命中那条换个新对象
      return state.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t))
    case 'remove': // 删除：filter 掉这一条
      return state.filter((t) => t.id !== action.id)
    case 'clear': // 清空：直接返回空数组
      return []
    default: // 认不出的动作原样返回，保证 reducer 永远有返回值
      return state
  }
}

export default function Demo() {
  // useReducer(处理函数, 初始值) 返回「当前值 + 派发函数」，用法很像 useState
  const [todos, dispatch] = useReducer(reducer, [
    { id: 1, text: '学会 useState', done: true },
    { id: 2, text: '搞懂 useReducer', done: false },
  ])
  const [text, setText] = useState('') // 输入框这种简单状态，继续用 useState 就行

  function add() {
    if (!text.trim()) return // 空内容不加
    dispatch({ type: 'add', text }) // 派发一个「动作对象」，怎么改交给 reducer 决定
    setText('')
  }

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="要做点什么？" style={input} />
        <button onClick={add} style={btn}>添加</button>
        <button onClick={() => dispatch({ type: 'clear' })} style={{ ...btn, background: '#fff', color: '#1f2a24' }}>
          清空
        </button>
      </div>

      {todos.map((t) => (
        <div key={t.id} style={row}>
          {/* 勾选框只负责派发 toggle，具体怎么改由 reducer 统一处理 */}
          <input type="checkbox" checked={t.done} onChange={() => dispatch({ type: 'toggle', id: t.id })} />
          <span style={{ flex: 1, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#5c6b63' : '#1f2a24' }}>
            {t.text}
          </span>
          <b onClick={() => dispatch({ type: 'remove', id: t.id })} style={{ color: '#c53030', cursor: 'pointer' }}>×</b>
        </div>
      ))}

      <p style={{ margin: '10px 0 0', fontSize: 13, color: '#5c6b63' }}>
        共 {todos.length} 条，已完成 {todos.filter((t) => t.done).length} 条（这两个数字都是现算的派生值）
      </p>

      <p style={hint}>
        什么时候从 useState 换成 useReducer？当同一份数据有三四种以上改法、或者几个 state 老是要一起改的时候。
        <br />
        好处是：改法全在 reducer 里排排坐，出 bug 只用看这一个函数；组件里只剩「派发什么动作」。
        <br />
        试试给 reducer 加一个 case 'toggleAll'，然后在界面上加个「全部标记完成」按钮。
      </p>
    </div>
  )
}

const input = { flex: 1, padding: '6px 10px', fontSize: 13, border: '1px solid #e2e9e4', borderRadius: 6 }
const row = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 10px',
  marginTop: 8,
  background: '#f7faf8',
  border: '1px solid #e2e9e4',
  borderRadius: 8,
  fontSize: 14,
}
const hint = { marginTop: 14, fontSize: 13, color: '#5c6b63', lineHeight: 1.8 }
const btn = { padding: '6px 14px', fontSize: 13, border: '1px solid #2f6b4f', borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer' }`,
  },
  {
    id: 'p5-snapshot',
    title: 'state 是「这次渲染的快照」',
    group: '13-React状态管理',
    summary: 'setCount 下一行读到的还是旧值，把它显示出来就全明白了',
    runtime: 'react',
    language: 'tsx',
    code: `import { useEffect, useState } from 'react'

export default function Demo() {
  const [count, setCount] = useState(0)
  const [inHandler, setInHandler] = useState('（还没点）') // 存「setCount 下一行读到的值」
  const [inEffect, setInEffect] = useState('（还没点）') // 存「界面画完之后读到的值」

  function handleClick() {
    setCount(count + 1) // 通知 React：下次渲染时 count 要变成 count + 1

    // 这一行紧跟在 setCount 后面，但 count 仍然是本次渲染那个固定的数字
    // 把它记下来显示在界面上，比嘴上讲一百遍「异步更新」都直观
    setInHandler('刚才那行代码里读到的 count 是 ' + count)

    // 想在这里就用上新值，别指望 count，自己先算出来存进变量
    const next = count + 1
    console.log('要立刻用新值就用自己算的 next =', next)
  }

  // useEffect 里的代码在「这次渲染真的画到屏幕上之后」才跑，那时 count 已经是新值了
  useEffect(() => {
    setInEffect('渲染完成后 useEffect 里读到的 count 是 ' + count)
  }, [count]) // 依赖数组写 [count]：只有 count 变了才重新执行

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }}>
      <p style={{ fontSize: 36, margin: '0 0 14px', fontWeight: 700 }}>{count}</p>
      <button onClick={handleClick} style={btn}>+1 并记录当时读到的值</button>

      <div style={{ ...card, border: '2px solid #e0a0a0', marginTop: 14 }}>
        <p style={tag}>❌ 事件函数里（同一次渲染的快照，是旧值）</p>
        <p style={val}>{inHandler}</p>
      </div>

      <div style={{ ...card, border: '2px solid #8fc0a9' }}>
        <p style={tag}>✅ useEffect 里（下一次渲染之后，是新值）</p>
        <p style={val}>{inEffect}</p>
      </div>

      <p style={hint}>
        点几下按钮：上面的大数字每次 +1，但中间那行永远比它慢一拍 —— 因为组件函数每次执行都是一张独立的快照，
        count 在这次渲染里就是一个不会变的数字，setCount 改的是「下一次渲染」的它。
        <br />
        所以：要立刻用新值，自己写 const next = count + 1；要在更新完成后做事，写进 useEffect。
        <br />
        试试把 setInHandler 里的 count 换成 next，中间那行就跟大数字对上了。
      </p>
    </div>
  )
}

const card = { padding: 12, border: '2px solid', borderRadius: 10, marginBottom: 10 }
const tag = { margin: '0 0 6px', fontSize: 13, color: '#5c6b63' }
const val = { margin: 0, fontSize: 14, fontWeight: 600 }
const hint = { marginTop: 6, fontSize: 13, color: '#5c6b63', lineHeight: 1.8 }
const btn = {
  padding: '7px 14px',
  fontSize: 13,
  border: '1px solid #2f6b4f',
  borderRadius: 6,
  background: '#2f6b4f',
  color: '#fff',
  cursor: 'pointer',
}`,
  },
  {
    id: 'p5-key-reset',
    title: '换个 key，子组件状态自动归零',
    group: '13-React状态管理',
    summary: '切换用户时左边的点赞数被串号了，右边加个 key 就干净了',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

const USERS = [
  { id: 1, name: '小明' },
  { id: 2, name: '小红' },
]

export default function Demo() {
  const [index, setIndex] = useState(0) // 当前看的是第几个用户
  const user = USERS[index]

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }}>
      {/* 切换用户：两个卡片收到的 props 都会变成新用户 */}
      <button onClick={() => setIndex(index === 0 ? 1 : 0)} style={btn}>
        切换用户（当前：{user.name}）
      </button>

      <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
        <div style={{ ...box, border: '2px solid #e0a0a0' }}>
          <p style={tag}>❌ 没写 key</p>
          {/* React 看到「同样位置、同样类型」的组件，就认为还是原来那个，内部 state 原封不动留着 */}
          <UserCard user={user} />
        </div>

        <div style={{ ...box, border: '2px solid #8fc0a9' }}>
          <p style={tag}>✅ {'key={user.id}'}</p>
          {/* key 变了 = React 认定这是另一个组件：旧的卸载、新的挂载，state 从初始值重新来过 */}
          <UserCard key={user.id} user={user} />
        </div>
      </div>

      <p style={hint}>
        先在左右两边各点几下「点赞」，再点上面的「切换用户」：
        左边名字换了、点赞数却还挂在那儿（张冠李戴），右边老老实实回到 0。
        <br />
        结论：想让一个组件「换一个对象就彻底重来」，最省事的办法就是给它一个会变的 key，
        不用在 useEffect 里手动一个个把 state 清零。
        <br />
        试试把右边的 key 改成 key=&#123;1&#125; 这种写死的值，它立刻就和左边一样了。
      </p>
    </div>
  )
}

// 子组件：自己管着一份点赞数，父组件看不见也管不着
function UserCard({ user }) {
  const [likes, setLikes] = useState(0) // 初始值 0 —— 只有「重新挂载」时才会再用一次

  return (
    <div>
      <p style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 600 }}>{user.name}</p>
      <p style={{ margin: '0 0 10px', fontSize: 24, fontWeight: 700 }}>{likes} 赞</p>
      <button onClick={() => setLikes(likes + 1)} style={{ ...btn, padding: '5px 12px' }}>点赞</button>
    </div>
  )
}

const box = { flex: 1, padding: 14, border: '2px solid', borderRadius: 10 }
const tag = { margin: '0 0 10px', fontSize: 13, color: '#5c6b63' }
const hint = { marginTop: 16, fontSize: 13, color: '#5c6b63', lineHeight: 1.8 }
const btn = {
  padding: '7px 14px',
  fontSize: 13,
  border: '1px solid #2f6b4f',
  borderRadius: 6,
  background: '#2f6b4f',
  color: '#fff',
  cursor: 'pointer',
}`,
  },
]

export default part5
