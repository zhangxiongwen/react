/**
 * 演练台 · 组件与传值
 * React 源码类 demo：runtime: 'react' + language: 'tsx'
 *
 * 这一组从「父传子」一路讲到 Context：
 * props 基础 → 只读约束 → 默认值 → 子传父 → 状态提升 →
 * children → JSX 当 prop → 透传地狱 → useContext → 自定义 Hook。
 *
 * 沙箱里只能 import react / antd / @ant-design/icons / dayjs，
 * 而且必须 export default 一个叫 Demo 的组件。没有 CSS 文件，样式全写内联 style。
 */
const part6 = [
  {
    id: 'p6-props-flow',
    title: '父传子：数据从上往下流',
    group: '14-组件与传值',
    summary: '父组件改输入框，两个子组件同时跟着变',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react' // 数据存在父组件里，所以父组件需要 useState

// 子组件 1：把收到的名字做成一张名片
// 函数组件的第一个参数固定叫 props，是个对象，装着父组件传下来的所有数据
function NameCard(props) {
  return (
    <div style={card}>
      <p style={label}>子组件 A · 名片</p>
      {/* props.name 就是父组件写在 <NameCard name={...} /> 上的那个值 */}
      <p style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>
        {props.name || '（还没输入）'}
      </p>
    </div>
  )
}

// 子组件 2：写法换成「解构」，{ name } 等价于 props.name，只是更短更常用
function NameStat({ name }) {
  return (
    <div style={card}>
      <p style={label}>子组件 B · 统计</p>
      {/* 同一份数据，不同的子组件可以有完全不同的用法 */}
      <p style={{ margin: 0, fontSize: 14 }}>字数：{name.length}</p>
      <p style={{ margin: '6px 0 0', fontSize: 14 }}>大写：{name.toUpperCase() || '—'}</p>
    </div>
  )
}

export default function Demo() {
  // 数据只在这里存一份，这叫「唯一数据源」
  const [name, setName] = useState('xiaoming')

  return (
    <div style={wrap}>
      <input
        value={name} // 输入框的内容由 state 决定
        onChange={(e) => setName(e.target.value)} // 打字时更新父组件的 state
        placeholder="在这里输入名字"
        style={input}
      />

      <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
        {/* 同一个 name 同时发给两个子组件，写法就是「属性名={值}」 */}
        <NameCard name={name} />
        <NameStat name={name} />
      </div>

      <p style={hint}>
        试试在输入框里打字：两个子组件会一起变。
        数据只在父组件里存了一份，靠 props 往下发——这就是「单向数据流」。
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }
const input = {
  width: '100%',
  padding: '9px 12px',
  fontSize: 14,
  border: '1px solid #e2e9e4',
  borderRadius: 8,
  outline: 'none',
  boxSizing: 'border-box',
}
const card = { flex: 1, padding: 14, background: '#f7faf8', border: '1px solid #e2e9e4', borderRadius: 10 }
const label = { margin: '0 0 8px', fontSize: 12, color: '#5c6b63' }
const hint = { marginTop: 16, fontSize: 13, color: '#5c6b63', lineHeight: 1.7 }`,
  },
  {
    id: 'p6-props-readonly',
    title: 'props 是只读的',
    group: '14-组件与传值',
    summary: '子组件改不动 props，正确做法是让父组件传个修改函数',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

// ❌ 左边：子组件试图直接修改 props
function BadChild(props) {
  const [msg, setMsg] = useState('') // 只用来把「改的结果」显示出来

  function tryMutate() {
    try {
      props.count = props.count + 1 // 直接写 props：React 把 props 冻住了，这里会抛错
      setMsg('赋值没报错，但父组件的数据没动，界面照样不变')
    } catch (err) {
      setMsg('报错了：' + err.message) // 给冻结对象赋值会抛 TypeError
    }
  }

  return (
    <div style={{ ...box, border: '2px solid #e0a0a0' }}>
      <p style={tag}>❌ 子组件里写 props.count = ...</p>
      <p style={num}>{props.count}</p>
      <button onClick={tryMutate} style={btnGhost}>试着自己改</button>
      <p style={{ ...small, color: '#c53030' }}>{msg}</p>
    </div>
  )
}

// ✅ 右边：父组件除了数据，还把「修改这份数据的函数」一起当 prop 传下来
function GoodChild({ count, onAdd }) {
  return (
    <div style={{ ...box, border: '2px solid #8fc0a9' }}>
      <p style={tag}>✅ 子组件调用父组件给的 onAdd()</p>
      <p style={num}>{count}</p>
      {/* 子组件不碰数据，只负责在合适的时机喊一声 */}
      <button onClick={onAdd} style={btn}>请父组件改</button>
      <p style={small}>数据归谁所有，就由谁来改</p>
    </div>
  )
}

export default function Demo() {
  const [left, setLeft] = useState(0) // 左边这份数据，子组件怎么折腾都改不动
  const [right, setRight] = useState(0) // 右边这份，靠回调函数由父组件来改

  return (
    <div style={wrap}>
      <div style={{ display: 'flex', gap: 14 }}>
        {/* 只传数据，不传修改方法 */}
        <BadChild count={left} />
        {/* 数据 + 修改函数一起传，子组件才有「请求修改」的能力 */}
        <GoodChild count={right} onAdd={() => setRight(right + 1)} />
      </div>

      <p style={hint}>
        试试各点一次：左边纹丝不动（多半还会红字报错），右边正常 +1。
        <br />
        规矩就一条：props 只读。子组件想改，只能请拥有这份数据的父组件出手。
        试着把 onAdd 改成 {'{'}() =&gt; setRight(right + 10){'}'} 看看。
      </p>
      <p style={small}>（左边的 setLeft 故意没被调用，所以它永远是 {left}）</p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }
const box = { flex: 1, padding: 14, border: '2px solid', borderRadius: 10, background: '#f7faf8' }
const tag = { margin: '0 0 8px', fontSize: 13, color: '#5c6b63' }
const num = { margin: '0 0 12px', fontSize: 32, fontWeight: 700 }
const small = { margin: '10px 0 0', fontSize: 12, color: '#5c6b63', minHeight: 18 }
const hint = { marginTop: 16, fontSize: 13, color: '#5c6b63', lineHeight: 1.8 }
const btn = {
  padding: '7px 14px', fontSize: 13, border: '1px solid #2f6b4f',
  borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer',
}
const btnGhost = { ...btn, background: '#fff', color: '#c53030', border: '1px solid #c53030' }`,
  },
  {
    id: 'p6-props-default',
    title: '默认值与可选 props',
    group: '14-组件与传值',
    summary: '解构参数里写 = 默认值，没传的 prop 自动兜底',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

// 在解构参数里写「= 值」就是默认值：父组件没传这个 prop 时自动用它
// 这样调用方只需要关心自己在意的那几个属性，其余全部兜底
function Btn({ text, type = 'primary', size = 'mid', onPick }) {
  const isPrimary = type === 'primary' // 主按钮实心，其余描边
  // 按 size 三档决定内边距和字号
  const pad = size === 'big' ? '12px 24px' : size === 'small' ? '4px 10px' : '8px 16px'
  const fz = size === 'big' ? 16 : size === 'small' ? 12 : 14

  return (
    <button
      // 把「最终生效的值」报给父组件，方便观察默认值有没有起作用
      onClick={() => onPick(text + ' 实际拿到：type=' + type + '，size=' + size)}
      style={{
        padding: pad,
        fontSize: fz,
        borderRadius: 6,
        cursor: 'pointer',
        border: '1px solid #2f6b4f',
        background: isPrimary ? '#2f6b4f' : '#fff',
        color: isPrimary ? '#fff' : '#2f6b4f',
      }}
    >
      {text}
    </button>
  )
}

export default function Demo() {
  const [log, setLog] = useState('点上面任意一个按钮，看它实际收到了什么')

  return (
    <div style={wrap}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* 一个都不传：type 和 size 全走默认值 */}
        <Btn text="全默认" onPick={setLog} />
        {/* 只传 size：type 仍然是默认的 primary */}
        <Btn text="只传 size" size="big" onPick={setLog} />
        {/* 只传 type：size 仍然是默认的 mid */}
        <Btn text="只传 type" type="ghost" onPick={setLog} />
        {/* 两个都传：默认值被完全覆盖 */}
        <Btn text="都传" type="ghost" size="small" onPick={setLog} />
        {/* 传 undefined 等于没传，照样走默认值；传 null 就不会兜底了 */}
        <Btn text="传 undefined" type={undefined} onPick={setLog} />
      </div>

      <p style={result}>{log}</p>

      <p style={hint}>
        试试把函数签名里的 size = 'mid' 改成 size = 'big'，
        再点「全默认」和「只传 type」这两个按钮，它们会一起变大。
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }
const result = {
  marginTop: 16,
  padding: '10px 12px',
  fontSize: 13,
  background: '#f7faf8',
  border: '1px solid #e2e9e4',
  borderRadius: 8,
}
const hint = { marginTop: 14, fontSize: 13, color: '#5c6b63', lineHeight: 1.7 }`,
  },
  {
    id: 'p6-child-to-parent',
    title: '子传父：回调函数',
    group: '14-组件与传值',
    summary: '星星组件点一下，通过 onChange 把分数报给父组件',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

// 子组件：只负责把星星画出来，分数本身存在父组件那儿
// value 是父组件给的当前分数，onChange 是父组件给的「回调函数」
function Stars({ value, onChange }) {
  const [hover, setHover] = useState(0) // 悬停高亮属于组件自己的小状态，父组件不关心

  return (
    <div style={{ display: 'flex', gap: 6, fontSize: 32, cursor: 'pointer' }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n} // 列表渲染要给每项一个稳定的 key
          onClick={() => onChange(n)} // 关键一步：调用父组件传来的函数，把 n 交上去
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          // 悬停时优先看 hover，否则看真实分数
          style={{ color: n <= (hover || value) ? '#e8a33d' : '#e2e9e4' }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default function Demo() {
  const [score, setScore] = useState(3) // 分数的真正归属地：父组件
  const [times, setTimes] = useState(0) // 顺便记一下被打分了几次

  // 这个函数会被当作 prop 交给子组件，由子组件决定什么时候调用它
  function handleChange(n) {
    setScore(n) // 收到子组件报上来的 n，父组件自己更新数据
    setTimes(times + 1)
  }

  return (
    <div style={wrap}>
      {/* 数据往下（value），事件往上（onChange），这就是父子通信的全部套路 */}
      <Stars value={score} onChange={handleChange} />

      <p style={{ margin: '14px 0 0', fontSize: 15 }}>
        当前分数：<b style={{ color: '#2f6b4f', fontSize: 20 }}>{score}</b> 分
        <span style={{ color: '#5c6b63', fontSize: 13 }}>（已修改 {times} 次）</span>
      </p>

      {/* 父组件拿到分数后想怎么用都行，子组件完全不知情 */}
      <p style={{ margin: '8px 0 0', fontSize: 14, color: '#5c6b63' }}>
        {score >= 4 ? '谢谢好评！' : score === 3 ? '还有提升空间' : '抱歉，我们会改进'}
      </p>

      <p style={hint}>
        试试把 onChange 改成 {'{'}(n) =&gt; setScore(6 - n){'}'}，星星就会反过来打分。
        子组件只管「喊一声」，怎么处理是父组件的自由。
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }
const hint = { marginTop: 18, fontSize: 13, color: '#5c6b63', lineHeight: 1.7 }`,
  },
  {
    id: 'p6-lift-state',
    title: '兄弟组件通信：状态提升',
    group: '14-组件与传值',
    summary: '商品列表和购物车徽标，把 state 提到共同父组件里联动',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

const GOODS = [
  { id: 1, name: '机械键盘', price: 399 },
  { id: 2, name: '人体工学椅', price: 1299 },
  { id: 3, name: '显示器支架', price: 259 },
]

// 兄弟 A：商品列表。它不保存购物车，只负责喊「我要加这个」
function GoodsList({ onAdd }) {
  return (
    <div style={panel}>
      <p style={label}>兄弟 A · 商品列表</p>
      {GOODS.map((g) => (
        <div key={g.id} style={row}>
          <span>{g.name}</span>
          <span style={{ color: '#5c6b63' }}>￥{g.price}</span>
          {/* 点击时把整个商品对象交给父组件 */}
          <button onClick={() => onAdd(g)} style={btn}>加入</button>
        </div>
      ))}
    </div>
  )
}

// 兄弟 B：购物车徽标。它也不保存数据，只把父组件算好的东西画出来
function CartBadge({ items, onClear }) {
  const total = items.reduce((sum, it) => sum + it.price, 0) // 合计金额
  return (
    <div style={panel}>
      <p style={label}>兄弟 B · 购物车</p>
      <p style={{ margin: '0 0 6px', fontSize: 28, fontWeight: 700, color: '#2f6b4f' }}>
        {items.length} 件
      </p>
      <p style={{ margin: '0 0 10px', fontSize: 14 }}>合计 ￥{total}</p>
      <button onClick={onClear} style={{ ...btn, background: '#fff', color: '#c53030', border: '1px solid #c53030' }}>
        清空
      </button>
    </div>
  )
}

export default function Demo() {
  // 「状态提升」：cart 看上去该归购物车组件所有，
  // 但商品列表也要改它，兄弟之间又不能直接对话，
  // 于是把这份 state 往上搬到两者共同的父组件里，再用 props 分别发下去。
  const [cart, setCart] = useState([])

  return (
    <div style={wrap}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        {/* 往下发的是「函数」，让 A 有能力请求修改 */}
        <GoodsList onAdd={(g) => setCart([...cart, g])} />
        {/* 往下发的是「数据」，让 B 有东西可画 */}
        <CartBadge items={cart} onClear={() => setCart([])} />
      </div>

      <p style={hint}>
        点左边的「加入」，右边的数字立刻跟着变——两个兄弟谁也没直接联系谁。
        <br />
        试试把 setCart([...cart, g]) 改成 setCart([...cart, g, g])，一次加两件。
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }
const panel = { flex: 1, padding: 14, background: '#f7faf8', border: '1px solid #e2e9e4', borderRadius: 10 }
const label = { margin: '0 0 10px', fontSize: 12, color: '#5c6b63' }
const row = { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 14 }
const hint = { marginTop: 16, fontSize: 13, color: '#5c6b63', lineHeight: 1.8 }
const btn = {
  marginLeft: 'auto', padding: '4px 12px', fontSize: 13, border: '1px solid #2f6b4f',
  borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer',
}`,
  },
  {
    id: 'p6-children',
    title: 'children：把内容塞进容器',
    group: '14-组件与传值',
    summary: '同一个 Card 组件，装文字、装按钮、装列表都行',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

// children 是一个特殊的 prop：
// 写在 <Card> 和 </Card> 之间的所有内容，React 会自动打包成 children 传进来
function Card({ title, children }) {
  return (
    <div style={card}>
      <p style={cardTitle}>{title}</p>
      {/* 容器不关心里面是什么，给什么就画什么 */}
      <div>{children}</div>
    </div>
  )
}

export default function Demo() {
  const [n, setN] = useState(0)
  const [list, setList] = useState(['写 JSX', '学 props'])

  return (
    <div style={wrap}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* 用法 1：塞一段纯文字 */}
        <Card title="装文字">
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7 }}>
            Card 只负责外框和标题，内容由使用者决定。
          </p>
        </Card>

        {/* 用法 2：塞一个带交互的按钮，它自己的 state 照样能用 */}
        <Card title="装按钮">
          <p style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 700 }}>{n}</p>
          <button onClick={() => setN(n + 1)} style={btn}>点我 +1</button>
        </Card>

        {/* 用法 3：塞一个动态列表，children 可以是任意复杂的 JSX */}
        <Card title="装列表">
          <ul style={{ margin: '0 0 8px', paddingLeft: 18, fontSize: 14 }}>
            {list.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
          <button onClick={() => setList([...list, '第 ' + (list.length + 1) + ' 项'])} style={btn}>
            加一条
          </button>
        </Card>
      </div>

      <p style={hint}>
        三张卡片用的是同一个 Card 组件，差别只在于中间塞了什么。
        试试再复制一张 Card，标题随便改，里面塞个输入框试试。
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }
const card = {
  width: 180, padding: 14, background: '#f7faf8',
  border: '1px solid #e2e9e4', borderRadius: 10,
}
const cardTitle = { margin: '0 0 10px', fontSize: 13, color: '#2f6b4f', fontWeight: 700 }
const hint = { marginTop: 16, fontSize: 13, color: '#5c6b63', lineHeight: 1.7 }
const btn = {
  padding: '5px 12px', fontSize: 13, border: '1px solid #2f6b4f',
  borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer',
}`,
  },
  {
    id: 'p6-jsx-as-prop',
    title: '把 JSX 当 prop 传（具名插槽）',
    group: '14-组件与传值',
    summary: 'Panel 接收 header / footer 两个 JSX prop，比 children 更灵活',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

// children 只有一个「坑」，想在多个位置各放一块内容怎么办？
// 答案：prop 的值可以是任意 JSX 元素，于是想开几个坑就开几个
function Panel({ header, children, footer }) {
  return (
    <div style={panel}>
      <div style={bar}>{header}</div>
      <div style={{ padding: 14, fontSize: 14, lineHeight: 1.8 }}>{children}</div>
      <div style={{ ...bar, borderTop: '1px solid #e2e9e4', borderBottom: 'none' }}>{footer}</div>
    </div>
  )
}

export default function Demo() {
  const [editing, setEditing] = useState(false) // 用它切换两套完全不同的头尾
  const [text, setText] = useState('把 JSX 存进变量、当参数传，都是合法的。')

  return (
    <div style={wrap}>
      <Panel
        // header 这个 prop 的值就是一段 JSX，直接写在花括号里
        header={
          <span style={{ fontWeight: 700, color: '#2f6b4f' }}>
            {editing ? '✏️ 编辑模式' : '📄 阅读模式'}
          </span>
        }
        // footer 里塞按钮也完全没问题，事件处理照常工作
        footer={
          editing ? (
            <button onClick={() => setEditing(false)} style={btn}>保存并退出</button>
          ) : (
            <span style={{ fontSize: 12, color: '#5c6b63' }}>点下面的按钮切到编辑模式</span>
          )
        }
      >
        {/* 夹在标签中间的这段仍然是 children，和上面两个 prop 各占各的位置 */}
        {editing ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={area}
          />
        ) : (
          <span>{text}</span>
        )}
      </Panel>

      <button onClick={() => setEditing(!editing)} style={{ ...btn, marginTop: 12 }}>
        切换模式
      </button>

      <p style={hint}>
        点「切换模式」看头、身、尾三块同时换内容。
        试试给 Panel 再加一个 aside 插槽，在组件里多渲染一个位置。
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }
const panel = { border: '1px solid #e2e9e4', borderRadius: 10, overflow: 'hidden', background: '#fff' }
const bar = { padding: '10px 14px', background: '#f7faf8', borderBottom: '1px solid #e2e9e4' }
const area = {
  width: '100%', height: 70, padding: 8, fontSize: 14, fontFamily: 'inherit',
  border: '1px solid #e2e9e4', borderRadius: 6, boxSizing: 'border-box', outline: 'none',
}
const hint = { marginTop: 14, fontSize: 13, color: '#5c6b63', lineHeight: 1.7 }
const btn = {
  padding: '6px 14px', fontSize: 13, border: '1px solid #2f6b4f',
  borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer',
}`,
  },
  {
    id: 'p6-prop-drilling',
    title: 'props 透传地狱',
    group: '14-组件与传值',
    summary: '爷爷传到孙子，中间层被迫当二传手（下一个 demo 解决它）',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

// 第三层 · 孙子：全场只有它真正需要 theme
function Grandson({ theme }) {
  const dark = theme === 'dark'
  return (
    <div style={{ ...layer, background: dark ? '#1f2a24' : '#f7faf8', color: dark ? '#fff' : '#1f2a24' }}>
      <b>孙子</b>：我才是真正要用 theme 的人，现在是「{theme}」
    </div>
  )
}

// 第二层 · 爸爸：自己一点都用不到 theme，
// 却必须在参数里接住它、再原封不动传给儿子——这就是「二传手」
function Father({ theme }) {
  return (
    <div style={layer}>
      <b>爸爸</b>：我用不到 theme，但不接住就断链了 😩
      <Grandson theme={theme} />
    </div>
  )
}

// 第一层 · 爷爷：同样是纯粹的路过者
function Grandpa({ theme }) {
  return (
    <div style={layer}>
      <b>爷爷</b>：我也只是路过，负责往下递
      <Father theme={theme} />
    </div>
  )
}

export default function Demo() {
  const [theme, setTheme] = useState('light') // 数据在最顶上

  return (
    <div style={wrap}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} style={btn}>
        切换主题（当前 {theme}）
      </button>

      {/* 为了让最底下的孙子变色，这个 theme 要一层层手动往下传 3 次 */}
      <div style={{ marginTop: 14 }}>
        <Grandpa theme={theme} />
      </div>

      <p style={hint}>
        数一数：theme 一共被写了 3 遍，中间两层明明用不到却躲不掉。
        <br />
        层级再深一点、再多几个 prop，就会变成又臭又长的「透传地狱」（prop drilling）。
        <br />
        试试把 Father 里的 theme={'{'}theme{'}'} 删掉，孙子立刻就拿不到值了。
        <b style={{ color: '#2f6b4f' }}>下一个 demo 用 Context 彻底解决它。</b>
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }
const layer = {
  padding: 12, marginTop: 10, fontSize: 14,
  border: '1px dashed #e2e9e4', borderRadius: 8,
}
const hint = { marginTop: 16, fontSize: 13, color: '#5c6b63', lineHeight: 1.9 }
const btn = {
  padding: '7px 14px', fontSize: 13, border: '1px solid #2f6b4f',
  borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer',
}`,
  },
  {
    id: 'p6-use-context',
    title: 'useContext 解决透传',
    group: '14-组件与传值',
    summary: '同样的三层结构，中间层一个 prop 都不用接',
    runtime: 'react',
    language: 'tsx',
    code: `import { createContext, useContext, useState } from 'react'

// 第一步：创建一个「频道」，括号里是没人提供数据时的默认值
const ThemeContext = createContext('light')

// 第三层 · 孙子：不从参数拿，直接从频道里收货
function Grandson() {
  const theme = useContext(ThemeContext) // 一行搞定，中间隔多少层都无所谓
  const dark = theme === 'dark'
  return (
    <div style={{ ...layer, background: dark ? '#1f2a24' : '#f7faf8', color: dark ? '#fff' : '#1f2a24' }}>
      <b>孙子</b>：我用 useContext 自己拿到了「{theme}」
    </div>
  )
}

// 第二层 · 爸爸：对比上一个 demo，参数里的 theme 没了，干干净净
function Father() {
  return (
    <div style={layer}>
      <b>爸爸</b>：我啥都不用接、啥都不用传 😌
      <Grandson />
    </div>
  )
}

// 第一层 · 爷爷：同样清爽
function Grandpa() {
  return (
    <div style={layer}>
      <b>爷爷</b>：我也解放了
      <Father />
    </div>
  )
}

export default function Demo() {
  const [theme, setTheme] = useState('light')

  return (
    // 第二步：用 Provider 把子树包起来，value 就是要广播出去的数据
    // 包在里面的任何一层，不管多深，都能用 useContext 收到
    <ThemeContext.Provider value={theme}>
      <div style={wrap}>
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} style={btn}>
          切换主题（当前 {theme}）
        </button>

        <div style={{ marginTop: 14 }}>
          {/* 注意这里也不用传 theme 了 */}
          <Grandpa />
        </div>

        <p style={hint}>
          点按钮，最深处的孙子实时变色，而中间两层代码里根本找不到 theme 这个词。
          <br />
          试试把 Provider 那一行删掉：孙子会退回 createContext('light') 里的默认值。
          <br />
          小提醒：Context 适合「全局少量、变化不频繁」的东西（主题、语言、登录用户），
          普通父子传值老老实实用 props 就好。
        </p>
      </div>
    </ThemeContext.Provider>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }
const layer = {
  padding: 12, marginTop: 10, fontSize: 14,
  border: '1px dashed #e2e9e4', borderRadius: 8,
}
const hint = { marginTop: 16, fontSize: 13, color: '#5c6b63', lineHeight: 1.9 }
const btn = {
  padding: '7px 14px', fontSize: 13, border: '1px solid #2f6b4f',
  borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer',
}`,
  },
  {
    id: 'p6-auth-context',
    title: 'Context 存登录用户 + 自定义 Hook',
    group: '14-组件与传值',
    summary: '封装 useAuth()，任意深度的组件都能拿到用户和登出',
    runtime: 'react',
    language: 'tsx',
    code: `import { createContext, useContext, useState } from 'react'

// 频道里这次放的是一个对象：用户信息 + 两个操作方法
const AuthContext = createContext(null)

// 自定义 Hook：名字必须以 use 开头。它只是把 useContext 包了一层，
// 好处是调用方不用认识 AuthContext，还能统一做「忘了套 Provider」的检查
function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth 必须用在 AuthProvider 里面')
  return ctx
}

// 把状态和方法收在一个 Provider 组件里，外部只管用，不管怎么实现
function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // null 表示未登录

  const login = (name) => setUser({ name, at: new Date().toLocaleTimeString() })
  const logout = () => setUser(null)

  // value 里同时给出数据和改数据的方法，下面任何一层都能取用
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

// 深层组件 1：顶栏，用一行 useAuth() 就拿到了用户和登出方法
function TopBar() {
  const { user, logout } = useAuth()
  if (!user) return <div style={bar}>未登录</div>
  return (
    <div style={bar}>
      <span>👤 {user.name}（{user.at} 登录）</span>
      <button onClick={logout} style={{ ...btn, marginLeft: 'auto' }}>退出</button>
    </div>
  )
}

// 深层组件 2：藏在两层 div 里，照样一行拿到状态
function DeepContent() {
  const { user, login } = useAuth()
  return (
    <div style={layer}>
      <div style={layer}>
        {user ? (
          <span>只有登录后才能看到的内容，欢迎 {user.name}</span>
        ) : (
          <button onClick={() => login('小明')} style={btn}>以「小明」身份登录</button>
        )}
      </div>
    </div>
  )
}

export default function Demo() {
  return (
    // 只要被 Provider 包住，里面多深都能用 useAuth()
    <AuthProvider>
      <div style={wrap}>
        <TopBar />
        <DeepContent />
        <p style={hint}>
          点「登录」再点「退出」：顶栏和深层内容一起变，两个组件之间没有任何 props。
          试试把 login('小明') 改成 login('小红')。
        </p>
      </div>
    </AuthProvider>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', color: '#1f2a24' }
const bar = {
  display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', fontSize: 14,
  background: '#f7faf8', border: '1px solid #e2e9e4', borderRadius: 8,
}
const layer = { padding: 12, marginTop: 10, fontSize: 14, border: '1px dashed #e2e9e4', borderRadius: 8 }
const hint = { marginTop: 16, fontSize: 13, color: '#5c6b63', lineHeight: 1.8 }
const btn = {
  padding: '5px 12px', fontSize: 13, border: '1px solid #2f6b4f',
  borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer',
}`,
  },
]

export default part6
