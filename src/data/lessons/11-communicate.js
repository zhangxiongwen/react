/**
 * 组件通信章节
 * 每个条目 = 一句话总结 + 详细步骤 + 完整可抄 demo + 易错点
 */
const communicate = {
  id: 'communicate',
  title: '组件通信',
  summary: '父传子 props、子传父回调、状态提升、Context 主题切换——全部用完整 demo 学会',
  order: 11,
  items: [
    {
      id: 'parent-child-props',
      title: '父 → 子：用 props 把数据和展示传下去',
      summary: '谁拥有 state，谁往下传 props；子组件只负责「接收 + 展示 + 触发事件」',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'props 就是父组件传给子组件的参数，像函数调用时的实参。父写 <Child name="小明" />，子用 function Child({ name }) 接收。props 只读——子不能改 props，要改数据只能通知父组件。',
          },
          {
            type: 'text',
            title: '1）是什么：props（properties 的缩写）',
            body: '在 React 里，组件就像函数：父组件「调用」子组件时，通过 JSX 属性传入数据和行为，这些数据集合就叫 props。\n\n例如：<UserCard title="当前用户" user={currentUser} highlight={true} />\n\n子组件 UserCard 收到的 props 是一个对象：{ title: "当前用户", user: {...}, highlight: true }。\n\nprops 的核心特性：只读（read-only）。React 规定子组件不能直接修改 props（props.title = "xxx" 无效且反模式）。数据如果要变，必须由「拥有 state 的父组件」来改，再重新传新的 props 下来。\n\n可以把它想成：父组件是「数据源头」，子组件是「展示窗口」——窗口只能显示传进来的内容，不能自己改源头。',
          },
          {
            type: 'table',
            title: '2）特点：props 能传什么、怎么传',
            headers: ['传法', 'JSX 写法', '子组件收到', '说明'],
            rows: [
              ['字符串', 'title="当前计数"', '字符串 "当前计数"', '引号内直接写文字'],
              ['数字/变量', 'count={count}', '变量 count 的值', '非字符串必须加 {}'],
              ['布尔', 'highlight={true} 或 highlight', 'true', 'true 时可简写属性名'],
              ['对象/数组', 'user={currentUser}', '对象引用', '传的是引用，不是拷贝'],
              ['函数', 'onAdd={() => setCount(c => c + 1)}', '函数', '子组件可调用，但不能替父改 state'],
              ['子节点', '<Card>内容</Card>', 'props.children', '标签之间的内容'],
            ],
          },
          {
            type: 'text',
            title: '3）为什么：先想清楚「数据归谁管」',
            body: '这是 React 通信的第一原则，也叫「单向数据流」的起点。\n\n计数器里的数字、用户列表、表单输入值——谁需要「拥有并修改」这份数据，就把 useState 写在谁那里。\n\n父组件拥有 count，子组件只需要「显示 count」和「点按钮时告诉父组件加 1」，那就把 count 和 onAdd 都通过 props 传下去。\n\n能 props 解决的，不要急着上 Context 或 Redux。props 清晰、可追踪、易调试——在 React DevTools 里能看到每个组件收到了什么 props。\n\n决策口诀：数据只被一个分支用时，state 放在最近共同祖先或使用者本身；多个子组件都要用时，再考虑提升（下一节）或 Context。',
          },
          {
            type: 'text',
            title: '4）怎么用：三步走',
            body: '第 1 步——父组件声明 state 并传给子组件：\n\nconst [count, setCount] = useState(0)\n\n<CounterDisplay count={count} onAdd={() => setCount(c => c + 1)} />\n\n第 2 步——子组件用解构接收 props：\n\nfunction CounterDisplay({ count, onAdd, label }) { ... }\n\n第 3 步——子组件只展示 props，不复制一份本地 state：\n\n展示用 props.count；需要改就调 props.onAdd()，让父组件 setCount。\n\n花括号 {} 里传的是 JavaScript 表达式：数字、字符串、变量、函数、三元、甚至另一个组件都可以。传字符串可以写 title="当前计数" 或 title={"当前计数"}；传变量必须加花括号 count={count}。',
          },
          {
            type: 'code',
            title: '完整可抄 demo：用户信息卡片（父传多个 props）',
            language: 'jsx',
            body: `import { useState } from 'react'

/**
 * 子组件 UserCard：只接收 props，负责展示
 * props 是只读的 —— 子组件不能改 props，只能用来渲染
 * - title：字符串 props
 * - user：对象 props（传的是引用）
 * - highlight：布尔 props
 */
function UserCard({ title, user, highlight }) {
  return (
    <div
      style={{
        padding: 16,
        border: '1px solid #ddd',
        borderRadius: 8,
        background: highlight ? '#f0fdf4' : '#fff', // 根据 props 决定样式
      }}
    >
      <h3>{title}</h3>
      <p>姓名：{user.name}</p>
      <p>邮箱：{user.email}</p>
      <p>角色：{user.role}</p>
    </div>
  )
}

/**
 * 父组件 UserPage：拥有 state，决定传给子组件什么 props
 * 单向数据流：数据从父 → 子，通过 props 传递
 */
function UserPage() {
  const [currentIndex, setCurrentIndex] = useState(0) // 父拥有「当前索引」这份 state

  const users = [
    { id: 1, name: '小明', email: 'ming@demo.com', role: '前端' },
    { id: 2, name: '小红', email: 'hong@demo.com', role: '后端' },
    { id: 3, name: '小刚', email: 'gang@demo.com', role: '测试' },
  ]

  const currentUser = users[currentIndex] // 派生：从数组 + 索引算出当前用户

  return (
    <div>
      <h2>父传子 props 演示</h2>

      {/* 传字符串用引号；传变量/对象/布尔必须加 {} */}
      <UserCard
        title="当前选中用户"
        user={currentUser}
        highlight={true}
      />

      <div style={{ marginTop: 16 }}>
        <button
          type="button"
          onClick={() =>
            setCurrentIndex((i) => (i + 1) % users.length) // 父改 state → props 变 → 子重渲染
          }
        >
          切换下一个用户
        </button>
        <p>当前索引：{currentIndex}</p>
      </div>

      {/* 同一子组件，不同 props → 渲染不同内容 */}
      <UserCard
        title="列表第一个（只读展示）"
        user={users[0]}
        highlight={false}
      />
    </div>
  )
}

export default UserPage`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：父组件动一下控件，三个子组件同时更新（单向数据流）',
            body: `import { useState } from 'react' // 引入 useState，数据的「所有权」在父组件手里

// 子组件 ①：只把 props 里的用户名画成一个标题
function Header({ name, mood }) {
  return (
    <div style={{ padding: 10, background: '#e6f4ff', borderRadius: 6, marginBottom: 8 }}>
      顶部栏：你好，{name}！今天心情 {mood} 分
    </div>
  )
}

// 子组件 ②：同样只读 props，把心情分数画成一根进度条
function MoodBar({ mood }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ height: 10, background: '#f0f0f0', borderRadius: 5, overflow: 'hidden' }}>
        {/* 宽度百分比由 props 算出来：mood 是 0~10，乘 10 就是百分比 */}
        <div style={{ width: mood * 10 + '%', height: '100%', background: '#52c41a', transition: 'width .2s' }} />
      </div>
    </div>
  )
}

// 子组件 ③：连一句话都是从 props 推导出来的，自己不存任何 state
function Advice({ name, mood }) {
  const text = mood >= 7 ? '状态不错，继续写代码' : mood >= 4 ? '喝杯水休息一下' : '今天先别写 bug 了' // 三元推导建议

  return (
    <div style={{ padding: 10, background: '#fafafa', borderRadius: 6, fontSize: 14 }}>
      给 {name} 的建议：{text}
    </div>
  )
}

export default function Demo() { // 默认导出组件
  // ★ 这两份数据只在父组件里 useState 一次，就是「唯一数据源」
  const [name, setName] = useState('小明')
  const [mood, setMood] = useState(6)

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui', maxWidth: 420 }}>
      <div style={{ padding: 12, background: '#fffbe6', borderRadius: 8, marginBottom: 12 }}>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#874d00' }}>父组件的控件（数据只住在这里）</p>

        <label style={{ display: 'block', marginBottom: 8 }}>
          名字：
          <input
            value={name} // 受控：输入框显示的值来自父组件的 state
            onChange={(e) => setName(e.target.value)} // 改 state → 三个子组件的 props 一起变
            style={{ padding: 4 }}
          />
        </label>

        <label>
          心情 {mood} 分：
          <input
            type="range" // 滑块，拖动时连续触发 onChange
            min={0}
            max={10}
            value={mood}
            onChange={(e) => setMood(Number(e.target.value))} // e.target.value 是字符串，Number 转成数字
          />
        </label>
      </div>

      {/* 同一份 name / mood 通过 props 分别流向三个子组件：这就是「单向数据流」 */}
      <Header name={name} mood={mood} />
      <MoodBar mood={mood} />
      <Advice name={name} mood={mood} />

      <p style={{ marginTop: 12, fontSize: 13, color: '#666' }}>
        三个子组件里一个 useState 都没有 —— 它们只是「展示窗口」，改数据永远是父组件的活。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: '完整可抄 demo：计数器（父管 state，子管展示）',
            language: 'jsx',
            body: `import { useState } from 'react'

// 子组件：只展示 count，不自己存 count（避免和父不同步）
function CounterDisplay({ count, onAdd, label }) {
  return (
    <div>
      <p>{label}：{count}</p>
      {/* onAdd 是父传下来的函数 —— 子只负责在点击时调用 */}
      <button type="button" onClick={onAdd}>
        +1
      </button>
    </div>
  )
}

// 父组件：count 的「唯一数据源」在这里
function Parent() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h2>计数器</h2>
      {/* 父传数据 count + 传行为 onAdd（回调 props 的雏形） */}
      <CounterDisplay
        label="当前计数"
        count={count}
        onAdd={() => setCount((c) => c + 1)} // 函数也是 props，必须加 {}
      />
      {/* 父也可以直接操作同一份 state */}
      <button type="button" onClick={() => setCount(0)}>
        父组件重置为 0
      </button>
    </div>
  )
}

export default Parent`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：写一个星星评分组件，父组件传不同 props 复用四次',
            body: `import { useState } from 'react' // 引入 useState，只有父组件需要它

/**
 * 子组件 Stars：一个纯展示组件（Presentational Component）
 * 它自己不存任何数据，只负责「把收到的 props 画成 UI」
 * - score：几颗星（必填）
 * - label：左边的说明文字
 * - max：满分多少颗，给个默认值 5，父组件不传也能用
 * - color：星星颜色，默认金色
 */
function Stars({ score, label, max = 5, color = '#faad14' }) {
  // Array.from 造一个长度为 max 的数组，用来 map 出 max 颗星星
  const slots = Array.from({ length: max }, (_, i) => i) // i 从 0 开始

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
      <span style={{ width: 84, fontSize: 13, color: '#666' }}>{label}</span>

      <span style={{ fontSize: 20, letterSpacing: 2 }}>
        {slots.map((i) => (
          // i < score 的位置画实心星，其余画空心星；key 用下标（这个列表长度固定、不增删，才可以用）
          <span key={i} style={{ color: i < score ? color : '#d9d9d9' }}>
            ★
          </span>
        ))}
      </span>

      <span style={{ fontSize: 13, color: '#999' }}>
        {score} / {max}
      </span>
    </div>
  )
}

export default function Demo() { // 默认导出组件
  const [score, setScore] = useState(3) // 只有第一行的分数需要变，所以只有它用 state

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui', maxWidth: 430 }}>
      {/* 第 1 次复用：分数由父组件的按钮控制，props 一变子组件立刻重画 */}
      <Stars label="我的评分" score={score} />

      <div style={{ margin: '4px 0 16px' }}>
        {/* Math.min / Math.max 把分数夹在 0~5 之间，避免星星越界 */}
        <button type="button" onClick={() => setScore((s) => Math.max(0, s - 1))} style={{ marginRight: 6 }}>
          少一颗
        </button>
        <button type="button" onClick={() => setScore((s) => Math.min(5, s + 1))}>
          多一颗
        </button>
      </div>

      <p style={{ fontSize: 13, color: '#666', margin: '0 0 8px' }}>下面是同一个组件、不同 props 的复用：</p>

      {/* 第 2 次：只传必填 props，max 和 color 走默认值 */}
      <Stars label="商品质量" score={5} />

      {/* 第 3 次：把满分改成 10 颗，颜色换成蓝色 —— 组件代码一行没改，只是 props 不同 */}
      <Stars label="物流速度" score={7} max={10} color="#1677ff" />

      {/* 第 4 次：0 分也能正常渲染成一排空心星 */}
      <Stars label="客服态度" score={0} color="#cf1322" />

      <p style={{ marginTop: 12, fontSize: 13, color: '#666' }}>
        子组件里没有 useState，也没有业务逻辑 —— 这种组件最好复用、最好测试，也最容易被别的页面拿去用。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '5）父传子 vs 子自己存 state（易混对照）',
            headers: ['做法', '数据流', '结果', '何时用'],
            rows: [
              ['父传 count，子只展示', '单向，父 → 子', '永远同步', '✅ 默认正确'],
              ['父传 count，子再 useState(props.count)', '父子各一份', '永不同步', '❌ 反模式'],
              ['子内部 useState 初始值', '子自己管', '与父无关', '仅当数据只属于该子组件'],
              ['父传 value + onChange', '受控组件', '父是唯一数据源', '表单输入标准模式'],
            ],
          },
          {
            type: 'list',
            title: '6）props 使用自检清单',
            ordered: true,
            items: [
              '这份数据谁拥有？useState 是否写在正确的组件里？',
              '子组件是否直接用了 props.xxx，而不是复制到本地 state？',
              '传变量/表达式是否加了花括号 {}？',
              'props 名字是否和子组件解构参数一致（拼写错误 → undefined）？',
              '布尔 props 为 true 时是否知道可以简写：highlight 等价 highlight={true}',
              '同一子组件传不同 props，是否理解会渲染不同内容？',
            ],
          },
          {
            type: 'text',
            title: '7）易错点汇总',
            body: '① 子组件复制 props 到本地 state：const [count, setCount] = useState(props.count)——父子各一份，永远不同步。除非做「可撤销草稿」等进阶场景，否则禁止。\n\n② props 名字写错：父传 userName，子解构 name → undefined，界面空白。\n\n③ 在 render 里每次创建新对象：user={{ name: "a" }}——引用每次都变，可能触发子组件无意义重渲染（性能章节再细讲）。\n\n④ 试图在子组件里改 props：props.count++ 无效；React 18+ 严格模式下还会警告。\n\n⑤ 混淆 props 和 state：props 是外部传入、只读；state 是组件内部拥有、可 setState 修改。\n\n⑥ 忘记给子组件传必填 props：可用默认参数 { label = "计数" } 或 TypeScript/PropTypes 约束（进阶）。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'props = 父传给子的只读参数；谁拥有 state 谁负责改。子组件展示 props、调 props.onXxx，别把 props 复制进本地 state。变量传值加 {}，布尔 true 可简写属性名。',
          },
        ],
      },
    },
    {
      id: 'child-parent-callback',
      title: '子 → 父：父传回调函数，子在事件里调用',
      summary: '数据改不了 props，子组件就「打电话」给父：onChange、onSubmit、onRemove',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'React 数据默认从上往下流。子想影响父的数据，父必须传一个函数下来（回调 props），子在点击/输入/提交时调用，把新值或通知传上去，父再 setState。',
          },
          {
            type: 'text',
            title: '1）是什么：回调 props（Callback Props）',
            body: '子组件不能直接修改父组件的 state——props 是只读的。那用户在下层子组件里点了删除、输入了文字、提交了表单，数据怎么回到父组件？\n\n答案：父组件传一个函数给子组件，这个函数就是「回调 props」。子组件在合适的时机（onClick、onChange、onSubmit）调用这个函数，把参数（新值、id、事件对象）传给父组件；父组件在函数里执行 setState，数据更新后再通过 props 流回子组件。\n\n典型命名：onChange、onSubmit、onRemove、onSelect、onKeywordChange——on 开头表示「事件通知，由父处理」。\n\n模式本质：子组件是「 dumb 展示 + 事件上报」，父组件是「 smart 数据 + 业务逻辑」。',
          },
          {
            type: 'table',
            title: '2）特点：子传父的数据流',
            headers: ['方向', '载体', '谁改 state', '例子'],
            rows: [
              ['父 → 子', 'props 数据', '父 setState', 'count={count}'],
              ['子 → 父', '回调 props', '父在回调里 setState', 'onAdd={() => setCount(c=>c+1)}'],
              ['子 → 父传什么', '函数参数', '—', 'onRemove(id)、onChange(value)'],
              ['子能否 setState 父的数据', '❌ 不能', '只能「通知」父', '调 props.onXxx(...)'],
            ],
          },
          {
            type: 'text',
            title: '3）为什么：单向数据流',
            body: 'React 刻意设计成单向数据流（One-Way Data Flow）：\n\n• 数据从父到子：props\n• 事件从子到父：回调 props\n\n好处：\n\n① 数据来源唯一，debug 时顺着组件树往上找 setState 即可。\n\n② 子组件可复用——SearchBar 不关心父是存 keyword 还是直接发请求，只负责「输入变了通知 onKeywordChange」。\n\n③ 避免多处随意改同一份数据导致状态不一致。\n\n如果子组件自己偷偷 useState 存 keyword，父组件也存 keyword，就会出现「输入框和父 state 不同步」的经典 bug。受控组件模式（value + onChange）就是子传父的标准形态。',
          },
          {
            type: 'text',
            title: '4）怎么用：三步走 + 命名习惯',
            body: '第 1 步——父组件定义处理函数并传给子：\n\nfunction handleKeywordChange(value) { setKeyword(value) }\n\n<SearchBar keyword={keyword} onKeywordChange={handleKeywordChange} />\n\n也可以直接传 setKeyword：onKeywordChange={setKeyword}（setState 本身接收新值）。\n\n第 2 步——子组件在事件里调用 props.onXxx：\n\n<input value={keyword} onChange={(e) => onKeywordChange(e.target.value)} />\n\n子不写 useState 存 keyword（那是父的数据）。\n\n第 3 步——命名统一 on 开头：onChange、onSubmit、onRemove。子触发时用 props.onRemove(id)。\n\n传函数注意：onSearch={handleSearch} 对（传函数引用）；onSearch={handleSearch()} 错（立刻执行，把返回值当 handler）。',
          },
          {
            type: 'code',
            title: '完整可抄 demo：搜索栏 + 结果列表（子传父经典模式）',
            language: 'jsx',
            body: `import { useState } from 'react'

/**
 * 子组件 SearchBar —— 受控输入 + 回调通知父
 * - keyword：来自父的 state（受控 value）
 * - onKeywordChange：输入变化时「打电话」给父
 * - onSearch：点击搜索或回车时通知父
 */
function SearchBar({ keyword, onKeywordChange, onSearch }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      <input
        value={keyword} // 受控：value 完全由父的 state 决定
        placeholder="输入关键词"
        onChange={(e) => onKeywordChange(e.target.value)} // 子 → 父：把新值传上去
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSearch()
        }}
      />
      <button type="button" onClick={onSearch}>
        搜索
      </button>
    </div>
  )
}

/** 子组件 ResultList：纯展示，所有 state 都在父 */
function ResultList({ loading, error, items }) {
  if (loading) return <p>搜索中...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (items.length === 0) return <p>暂无结果</p>

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}

/**
 * 父组件 SearchPage：拥有全部 state 和业务逻辑
 * 子传父 = 父传 onXxx 回调，子在事件里调用
 */
function SearchPage() {
  const [keyword, setKeyword] = useState('')
  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const mockDatabase = [
    { id: 1, name: 'React 入门' },
    { id: 2, name: 'React Router 实战' },
    { id: 3, name: 'Redux Toolkit' },
    { id: 4, name: 'Vue 对比' },
  ]

  async function handleSearch() {
    const q = keyword.trim()
    if (!q) {
      setError('请输入关键词')
      return
    }

    setLoading(true)
    setError('')

    try {
      await new Promise((r) => setTimeout(r, 500)) // 模拟 API 延迟
      const filtered = mockDatabase.filter((item) =>
        item.name.toLowerCase().includes(q.toLowerCase())
      )
      setResult(filtered)
    } catch (e) {
      setError(e.message || '搜索失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>子传父：搜索 demo</h2>

      {/* setKeyword 可直接当 onKeywordChange —— setState 本身接收新值 */}
      <SearchBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        onSearch={handleSearch}
      />

      <ResultList loading={loading} error={error} items={result} />
    </div>
  )
}

export default SearchPage`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：子组件按钮调用父传下来的回调，父组件把操作记成日志',
            body: `import { useState } from 'react' // 引入 useState：日志和点赞数都由父组件保管

/**
 * 子组件 ActionBar：自己一个 state 都没有
 * onAction 是父组件传下来的「回调 props」，子组件只在点击时调用它、把参数传上去
 */
function ActionBar({ onAction, likes }) {
  return (
    <div style={{ padding: 12, border: '1px dashed #91caff', borderRadius: 8, background: '#f0f8ff' }}>
      <p style={{ margin: '0 0 8px', fontSize: 13, color: '#0958d9' }}>我是子组件（不存数据，只负责通知父组件）</p>

      {/* 点赞：把动作名 '点赞' 作为参数传给父组件 */}
      <button type="button" onClick={() => onAction('点赞')} style={{ marginRight: 6 }}>
        👍 点赞（{likes}）
      </button>

      {/* 收藏 / 分享：同一个回调，靠参数区分是哪个动作 —— 比传三个回调更省事 */}
      <button type="button" onClick={() => onAction('收藏')} style={{ marginRight: 6 }}>
        ⭐ 收藏
      </button>
      <button type="button" onClick={() => onAction('分享')}>
        🔗 分享
      </button>
    </div>
  )
}

export default function Demo() { // 默认导出组件
  const [logs, setLogs] = useState([]) // 操作日志数组，父组件是它的唯一 owner
  const [likes, setLikes] = useState(0) // 点赞数也归父组件管

  // ★ 这个函数会被当成 props 传下去，子组件调用它时，真正 setState 的还是父组件
  function handleAction(actionName) {
    // 不可变更新：用 [新项, ...prev] 生成新数组，最新的记录排在最前面
    setLogs((prev) => [{ id: Date.now(), text: actionName, at: new Date().toLocaleTimeString() }, ...prev])

    if (actionName === '点赞') {
      setLikes((n) => n + 1) // 父组件可以在回调里顺便做别的业务逻辑，子组件完全不用知道
    }
  }

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui', maxWidth: 430 }}>
      {/* 传函数引用 handleAction，不是 handleAction() —— 加括号就变成渲染时立刻执行了 */}
      <ActionBar onAction={handleAction} likes={likes} />

      <div style={{ marginTop: 12 }}>
        <p style={{ fontSize: 13, color: '#666', margin: '0 0 6px' }}>
          父组件收到的操作日志（共 {logs.length} 条）
          {/* 有日志才显示清空按钮：&& 短路的典型用法 */}
          {logs.length > 0 && (
            <button type="button" onClick={() => setLogs([])} style={{ marginLeft: 8, fontSize: 12 }}>
              清空
            </button>
          )}
        </p>

        {/* 三元：没日志给一句提示，有日志就 map 出来 */}
        {logs.length === 0 ? (
          <p style={{ color: '#999', fontSize: 13 }}>点上面的按钮试试，通知会「冒泡」到这里</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: 140, overflowY: 'auto' }}>
            {logs.map((log) => ( // key 用 Date.now() 生成的 id，稳定唯一
              <li key={log.id} style={{ fontSize: 13, padding: '4px 8px', background: '#fafafa', borderRadius: 4, marginBottom: 4 }}>
                {log.at} —— 子组件通知：{log.text}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p style={{ marginTop: 12, fontSize: 13, color: '#666' }}>
        数据流闭环：子组件点击 → 调 onAction(参数) → 父组件 setState → 新的 props 流回子组件（点赞数变了）。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: '完整可抄 demo：待办项删除（子通知父删哪一条）',
            language: 'jsx',
            body: `import { useState } from 'react'

// 子组件 TodoItem：通过 onToggle / onRemove 把「操作哪一条」通知给父
function TodoItem({ todo, onToggle, onRemove }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <input
        type="checkbox"
        checked={todo.done} // 展示数据来自 props.todo
        onChange={() => onToggle(todo.id)} // 子 → 父：传 id 告诉父切换哪条
      />
      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
        {todo.text}
      </span>
      {/* 列表传参：onClick={() => onRemove(todo.id)}，不能写 onRemove(todo.id) */}
      <button type="button" onClick={() => onRemove(todo.id)}>
        删除
      </button>
    </li>
  )
}

// 父组件 TodoList：todos 数组的唯一 owner
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: '学 props', done: false },
    { id: 2, text: '学子传父', done: false },
  ])

  function handleToggle(id) {
    // 不可变更新：map 返回新数组，只改匹配 id 的那一项
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function handleRemove(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}   // 传函数引用，不是 handleToggle()
          onRemove={handleRemove}
        />
      ))}
    </ul>
  )
}

export default TodoList`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：子组件表单提交时把值回传父组件，父组件加进列表',
            body: `import { useState } from 'react' // 引入 useState：父子各存各自该存的东西

/**
 * 子组件 AddForm：只管「输入中的草稿」这一份本地 state
 * 草稿是子组件自己的临时数据，父组件不关心，所以放在子组件里是合理的；
 * 真正要「入库」的那一刻，才通过 onSubmit 回调把值交给父组件。
 */
function AddForm({ onSubmit }) {
  const [name, setName] = useState('') // 草稿 ①：书名
  const [author, setAuthor] = useState('') // 草稿 ②：作者

  const canSubmit = name.trim() !== '' // 派生值：书名非空才允许提交

  function handleSubmit(e) {
    e.preventDefault() // 阻止表单默认提交行为（浏览器会整页刷新）
    if (!canSubmit) return // 不满足条件直接返回

    // ★ 子传父的关键一步：把整理好的对象交给父组件，剩下的事父组件决定
    onSubmit({ name: name.trim(), author: author.trim() || '佚名' })

    setName('') // 交出去之后清空草稿，方便继续录入
    setAuthor('')
  }

  return (
    // 用 form + onSubmit，这样按回车也能提交，比只绑 button 的 onClick 更规范
    <form onSubmit={handleSubmit} style={{ padding: 12, border: '1px dashed #91caff', borderRadius: 8, background: '#f0f8ff' }}>
      <p style={{ margin: '0 0 8px', fontSize: 13, color: '#0958d9' }}>子组件表单（草稿存在子组件里）</p>

      <input
        value={name} // 受控输入框：值来自子组件自己的 state
        onChange={(e) => setName(e.target.value)}
        placeholder="书名（必填）"
        style={{ padding: 5, marginRight: 6 }}
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="作者（可空）"
        style={{ padding: 5, marginRight: 6 }}
      />

      {/* disabled 用派生值控制：没填书名时按钮点不动 */}
      <button type="submit" disabled={!canSubmit}>
        添加
      </button>
    </form>
  )
}

export default function Demo() { // 默认导出组件
  // ★ 列表是「大家共享的正式数据」，所以归父组件所有
  const [books, setBooks] = useState([{ id: 1, name: 'React 学习笔记', author: '小明' }])
  const [nextId, setNextId] = useState(2) // 自增 id，保证每项 key 稳定唯一

  // 子组件提交时会调用它，参数 book 就是子组件传上来的对象
  function handleAdd(book) {
    setBooks((prev) => [...prev, { id: nextId, ...book }]) // 展开旧数组 + 追加新项，不修改原数组
    setNextId((id) => id + 1) // id 往后挪一位
  }

  function handleRemove(id) {
    setBooks((prev) => prev.filter((b) => b.id !== id)) // filter 返回新数组，去掉这一项
  }

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui', maxWidth: 440 }}>
      {/* 传函数引用给子组件；子组件只知道「提交时要喊一声」，不知道父组件拿去干什么 */}
      <AddForm onSubmit={handleAdd} />

      <p style={{ fontSize: 13, color: '#666', margin: '12px 0 6px' }}>父组件的书单（共 {books.length} 本）</p>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {books.map((b) => (
          <li key={b.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 10px', border: '1px solid #eee', borderRadius: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 14 }}>
              《{b.name}》<span style={{ color: '#999', fontSize: 12 }}>／{b.author}</span>
            </span>
            {/* 列表里传参必须用箭头函数包一层：onClick={() => handleRemove(b.id)} */}
            <button type="button" onClick={() => handleRemove(b.id)} style={{ fontSize: 12 }}>
              删除
            </button>
          </li>
        ))}
      </ul>

      {/* 空列表给个占位，别让界面空着 */}
      {books.length === 0 && <p style={{ color: '#999', fontSize: 13 }}>书单空了，上面加一本吧</p>}
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '5）传回调的常见写法对照',
            headers: ['写法', '是否正确', '说明'],
            rows: [
              ['onClick={handleClick}', '✅', '传函数引用，点击时执行'],
              ['onClick={handleClick()}', '❌', '渲染时立刻执行，不是点击时'],
              ['onClick={() => onRemove(id)}', '✅', '列表项需传参时用箭头包一层'],
              ['onChange={setKeyword}', '✅', 'setState 可直接当回调'],
              ['子组件内 onRemove = () => {}', '❌', '覆盖了 props，父永远收不到通知'],
            ],
          },
          {
            type: 'list',
            title: '6）子传父自检清单',
            ordered: true,
            items: [
              '父是否拥有全部需要共享的 state？',
              '父是否传了 onXxx 回调，而不是期望子自己 setState？',
              '子 input 是否 value={props.xxx} + onChange 调 props.onXxx？',
              '传函数是否没加括号 ()（除非你要传调用结果）？',
              '列表删除/切换是否通过 id 参数告诉父「操作哪一条」？',
              '子组件是否没有重复维护一份与父相同的 state？',
            ],
          },
          {
            type: 'text',
            title: '7）易错点汇总',
            body: '① 在子组件里写 onKeywordChange = () => {} 覆盖 props——父永远收不到通知。\n\n② 传函数加括号：onSearch={handleSearch()}——页面一加载就搜索，不是点击时搜索。\n\n③ 子组件自己 useState 存 keyword，又用 props.keyword 做 value——受控/非受控混乱，输入可能不受控。\n\n④ 回调里忘记把「新值」传上去：onChange={() => onChange()} 没传 e.target.value。\n\n⑤ React.memo 优化时，内联 onClick={() => onRemove(id)} 每次 render 是新函数，可能让 memo 失效——初学先不用 memo，知道即可。\n\n⑥ 子传父只能「通知和数据」，真正 setState 的永远是父组件——不要在子组件里直接改父 state（也没有 API 这样做）。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '子传父 = 父传 onXxx 回调，子在事件里 props.onXxx(参数)。父 setState，子只通知。onClick={fn} 不是 {fn()}；列表传参用 () => fn(id)。受控输入：value 来自父，onChange 通知父。',
          },
        ],
      },
    },
    {
      id: 'lift-state-siblings',
      title: '状态提升：兄弟组件共享同一份 state',
      summary: '筛选栏和列表是兄弟 → 把 keyword 提到共同父组件，分别 props 传下去',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '两个或多个兄弟组件要用同一份数据，就把 useState 写到它们的共同父组件里。父把「值 + 修改函数」分别 props 传给各个兄弟。这叫状态提升—— state 被提升到离它们最近的共同祖先。',
          },
          {
            type: 'text',
            title: '1）是什么：状态提升（Lifting State Up）',
            body: '当两个或多个组件需要显示/修改同一份数据，但它们之间没有父子关系（是兄弟），就不能把 state 放在任何一个兄弟内部——否则另一个兄弟读不到。\n\n解决办法：把 state「提升」到它们的共同父组件（或更上层祖先），由父组件：\n\n• 拥有 state\n• 通过 props 把值传给需要的兄弟\n• 通过回调 props 接收某个兄弟的修改请求\n\n这就是 React 官方文档里的 Lifting State Up（状态提升）。\n\n典型画面：左边 FilterBar 输入 keyword，右边 ItemList 根据 keyword 过滤——keyword 必须住在 Page 里，而不是 FilterBar 里。',
          },
          {
            type: 'table',
            title: '2）特点：提升前 vs 提升后',
            headers: ['', '提升前（错误）', '提升后（正确）'],
            rows: [
              ['state 位置', '兄弟 A 内部', '共同父组件'],
              ['兄弟 B 能否读到', '❌ 读不到 A 的 state', '✅ props 传入'],
              ['数据流', '断裂', '父 → 子，子 → 父回调 → 父 → 子'],
              ['父组件体积', '较瘦', '变「胖」——正常'],
              ['适用', '—', '兄弟共享、层级不深'],
            ],
          },
          {
            type: 'text',
            title: '3）为什么：兄弟无法直接访问彼此的 state',
            body: 'React 组件的 state 是封装在组件内部的——A 组件无法读取 B 组件的 useState，除非 B 主动通过 props 传出来（但 B 和 A 是平级，没有传 props 的关系）。\n\n初学者常想：「能不能让 List 直接 import FilterBar 然后读它的 state？」——不能，也违反组件化原则。\n\n兄弟之间不要直接 import 互相调用，永远通过父协调。父组件变成「交通枢纽」：\n\nFilterBar 不直接和 List 说话 → 都只和 Page 说话 → Page 拥有 keyword → 一边给 FilterBar 改，一边给 List 过滤。\n\n这就是「单向数据流」在兄弟场景下的标准解法。父变胖是正常的；state 实在太多再考虑 Context（下一节）或状态库。',
          },
          {
            type: 'text',
            title: '4）怎么用：三步走 + 数据流画图',
            body: '第 1 步——识别「兄弟要共享什么」：\n\n典型：筛选框 + 列表、温度输入 + 温度显示、购物车图标数量 + 购物车页列表。\n\n问：谁需要读？谁需要写？如果多个兄弟都要，就不能放在任何一个兄弟里。\n\n第 2 步——找到共同父组件，把 state 写在那里：\n\nFilterBar 和 List 都在 Page 里 → Page 写 const [keyword, setKeyword] = useState(\'\')。\n\nFilterBar：value={keyword} onChange={setKeyword}\n\nList：keyword={keyword} items={visibleItems} 或在 Page 里 filter 好传 visibleItems。\n\n第 3 步——画数据流（建议纸上画）：\n\nPage 拥有 keyword → FilterBar 显示/修改 → List 过滤展示。\n\nfilter 可以在父里用 useMemo 算 visibleItems 传下去（推荐，逻辑集中）；也可以把 keyword 和原始 items 都传给 List 让 List 自己 filter（小项目也行）。',
          },
          {
            type: 'code',
            title: '完整可抄 demo：筛选栏 + 列表（兄弟通信标准写法）',
            language: 'jsx',
            body: `import { useState, useMemo } from 'react'

/**
 * 兄弟 A：FilterBar —— 只负责输入 UI
 * keyword 存在父组件，这里通过 value + onChange 受控
 */
function FilterBar({ value, onChange, total, visibleCount }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <input
        value={value}
        placeholder="输入关键词过滤..."
        onChange={(e) => onChange(e.target.value)} // 修改请求发给父
        style={{ width: 280, padding: 8 }}
      />
      <p style={{ fontSize: 14, color: '#666' }}>
        显示 {visibleCount} / 共 {total} 条
      </p>
    </div>
  )
}

/**
 * 兄弟 B：ItemList —— 只负责展示已过滤的数据
 * 自己不存 keyword，只接收父算好的 items
 */
function ItemList({ items, keyword }) {
  if (items.length === 0) {
    return (
      <p>
        {keyword ? \`没有包含「\${keyword}」的条目\` : '暂无数据'}
      </p>
    )
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

/**
 * 状态提升（Lifting State Up）：
 * keyword 提到共同父 CatalogPage，两个兄弟通过 props 共享
 */
function CatalogPage() {
  const [keyword, setKeyword] = useState('') // ★ 共享 state 住在父组件

  const allItems = [
    'React 基础',
    'React Hooks',
    'React Router',
    'Redux Toolkit',
    'axios 请求',
    'CSS 样式方案',
  ]

  // 派生数据：用 useMemo 根据 keyword 算出可见列表，避免重复计算
  const visibleItems = useMemo(() => {
    const q = keyword.trim().toLowerCase()
    if (!q) return allItems
    return allItems.filter((item) => item.toLowerCase().includes(q))
  }, [keyword, allItems])

  return (
    <div>
      <h2>状态提升：兄弟共享 keyword</h2>

      <FilterBar
        value={keyword}
        onChange={setKeyword}           // 父 → 子：传值
        total={allItems.length}
        visibleCount={visibleItems.length}
      />

      <ItemList items={visibleItems} keyword={keyword} />
    </div>
  )
}

export default CatalogPage`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：输入框组件 + 实时预览组件，state 提到共同父组件',
            body: `import { useState } from 'react' // 引入 useState，写在「共同父组件」里

/**
 * 兄弟 A：Editor —— 只负责输入 UI
 * 它不存 text，靠 value + onChange 受控；改的请求交给父组件
 */
function Editor({ value, onChange }) {
  return (
    <div style={{ flex: 1, padding: 12, background: '#f0f8ff', borderRadius: 8 }}>
      <p style={{ margin: '0 0 8px', fontSize: 13, color: '#0958d9' }}>兄弟 A：编辑器</p>

      <textarea
        value={value} // 显示的内容来自父组件的 state
        onChange={(e) => onChange(e.target.value)} // 把新值交给父组件，父组件负责 setState
        rows={5}
        placeholder="随便打点字，右边同步变"
        style={{ width: '100%', padding: 6, boxSizing: 'border-box', fontFamily: 'inherit' }}
      />

      {/* 清空也是「请求父组件改数据」，传空字符串上去即可 */}
      <button type="button" onClick={() => onChange('')} style={{ marginTop: 6, fontSize: 12 }}>
        清空
      </button>
    </div>
  )
}

/**
 * 兄弟 B：Preview —— 只负责展示，同样不存 text
 * 它和 Editor 是平级关系，读不到 Editor 内部的东西，只能读父组件传下来的 props
 */
function Preview({ value }) {
  const chars = value.length // 派生值：字数现算，不用单独 useState
  const words = value.trim() === '' ? 0 : value.trim().split(/\\s+/).length // 按空白切分数「词数」

  return (
    <div style={{ flex: 1, padding: 12, background: '#f6ffed', borderRadius: 8 }}>
      <p style={{ margin: '0 0 8px', fontSize: 13, color: '#237804' }}>兄弟 B：实时预览</p>

      <div style={{ minHeight: 82, padding: 8, background: '#fff', borderRadius: 6, fontSize: 14, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {/* 三元：空内容时给灰色占位提示，而不是留一片空白 */}
        {value === '' ? <span style={{ color: '#bbb' }}>（还没有内容）</span> : value}
      </div>

      <p style={{ margin: '8px 0 0', fontSize: 12, color: '#666' }}>
        {chars} 个字符 · {words} 个词
      </p>
    </div>
  )
}

export default function Demo() { // 默认导出组件 —— 它就是两个兄弟的「共同父组件」
  // ★ 状态提升：text 既不放在 Editor 里，也不放在 Preview 里，而是提到它们的共同父组件
  const [text, setText] = useState('')

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      <p style={{ margin: '0 0 10px', fontSize: 13, color: '#666' }}>
        text 住在父组件：往下用 props 发给两个兄弟，往上用 onChange 收兄弟 A 的修改。
      </p>

      <div style={{ display: 'flex', gap: 12 }}>
        {/* 父 → 子：值给 A；子 → 父：A 的修改通过 setText 直接回来（setState 本身就接收新值） */}
        <Editor value={text} onChange={setText} />

        {/* 父 → 子：同一份值也给 B，两个兄弟永远同步，因为读的是同一个 state */}
        <Preview value={text} />
      </div>
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: '完整可抄 demo：摄氏 ↔ 华氏温度换算（经典状态提升）',
            language: 'jsx',
            body: `import { useState } from 'react'

// 兄弟 A：输入摄氏温度，通过 onChange 通知父
function CelsiusInput({ value, onChange }) {
  return (
    <label>
      摄氏温度：
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  )
}

// 兄弟 B：根据父传来的 celsius 派生显示华氏温度（只读展示）
function FahrenheitDisplay({ celsius }) {
  const fahrenheit = (celsius * 9) / 5 + 32 // 派生值，不必单独 useState
  return <p>华氏温度：{fahrenheit.toFixed(1)} °F</p>
}

function TemperatureConverter() {
  // ★ 状态提升：摄氏温度存在父组件，两个兄弟共用同一份数据
  const [celsius, setCelsius] = useState(0)

  return (
    <div>
      <h2>温度换算</h2>
      <CelsiusInput value={celsius} onChange={setCelsius} />
      <FahrenheitDisplay celsius={celsius} />
    </div>
  )
}

export default TemperatureConverter`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：左边「没提升」两边数据不同步，右边「提升后」永远一致',
            body: `import { useState } from 'react' // 引入 useState，两栏用法完全不同

const box = { flex: 1, padding: 12, borderRadius: 8 } // 左右两栏共用的外框
const panel = { padding: 10, background: '#fff', borderRadius: 6, marginBottom: 8, fontSize: 14 } // 每个兄弟的小面板

// ===== 左栏：没提升 —— 两个兄弟各自 useState，各存一份，谁也看不见谁 =====
function BadCounterA() {
  const [count, setCount] = useState(0) // ❌ 数据锁在兄弟 A 内部

  return (
    <div style={panel}>
      兄弟 A 的计数：<strong>{count}</strong>
      <button type="button" onClick={() => setCount((c) => c + 1)} style={{ marginLeft: 8 }}>
        +1
      </button>
    </div>
  )
}

function BadCounterB() {
  const [count, setCount] = useState(0) // ❌ 兄弟 B 又存了一份，和 A 毫无关系

  return (
    <div style={panel}>
      兄弟 B 的计数：<strong>{count}</strong>
      <button type="button" onClick={() => setCount((c) => c + 1)} style={{ marginLeft: 8 }}>
        +1
      </button>
    </div>
  )
}

// ===== 右栏：提升后 —— 两个兄弟都不存数据，只收 props + 调回调 =====
function GoodCounter({ who, count, onAdd }) {
  return (
    <div style={panel}>
      兄弟 {who} 看到的计数：<strong>{count}</strong> {/* 值来自父组件 */}
      <button type="button" onClick={onAdd} style={{ marginLeft: 8 }}>
        +1
      </button>
      {/* 点击只是「通知父组件」，真正 setState 的是父组件 */}
    </div>
  )
}

export default function Demo() { // 默认导出组件
  // ★ 提升后的那一份 state：住在两个兄弟的共同父组件（也就是这里）
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      <p style={{ margin: '0 0 10px', fontSize: 13, color: '#d46b08' }}>
        两边都点几下「+1」：左边两个数字各走各的，右边两个数字永远一样。
      </p>

      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ ...box, background: '#fff1f0', border: '1px solid #ffa39e' }}>
          <p style={{ margin: '0 0 8px', fontSize: 13, color: '#a8071a', fontWeight: 'bold' }}>❌ 没提升：state 在各自兄弟里</p>
          <BadCounterA />
          <BadCounterB />
          <p style={{ margin: 0, fontSize: 12, color: '#a8071a' }}>
            A 和 B 是平级，读不到彼此的 useState，于是出现两份「各自为政」的数据。
          </p>
        </div>

        <div style={{ ...box, background: '#f6ffed', border: '1px solid #b7eb8f' }}>
          <p style={{ margin: '0 0 8px', fontSize: 13, color: '#237804', fontWeight: 'bold' }}>✅ 提升后：state 在共同父组件</p>
          {/* 同一个 count 传给两个兄弟，同一个修改函数也传给两个兄弟 */}
          <GoodCounter who="A" count={count} onAdd={() => setCount((c) => c + 1)} />
          <GoodCounter who="B" count={count} onAdd={() => setCount((c) => c + 1)} />
          <p style={{ margin: 0, fontSize: 12, color: '#237804' }}>
            数据只有一份（父组件的 count），两个兄弟读的是同一个源，天然同步。
          </p>
        </div>
      </div>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '5）通信方式选型：何时用状态提升？',
            headers: ['场景', '推荐方案', '原因'],
            rows: [
              ['父 ↔ 单个子', 'props + 回调', '层级浅，最直接'],
              ['两个兄弟共享 state', '状态提升到共同父', '兄弟读不到彼此内部 state'],
              ['3～4 层 props 传递', '仍可用 props', '可接受，父逐层传'],
              ['很多层中间组件不用数据', 'Context', '避免 props drilling'],
              ['复杂全局状态、时间旅行', 'Redux / Zustand', '大型应用'],
            ],
          },
          {
            type: 'list',
            title: '6）状态提升自检清单',
            ordered: true,
            items: [
              '共享 state 是否放在了共同父组件，而不是某个兄弟里？',
              '兄弟 A 是否通过 onChange 回调把修改通知父，而不是期望 B 能读到 A？',
              '过滤/排序结果是派生值吗？能否用 useMemo 在父里算好再传？',
              '父组件 state 变多是否可接受——还是该上 Context？',
              '兄弟之间是否没有直接 import 互相调用？',
              '画数据流：父 → 子 props，子 → 父回调，是否闭环？',
            ],
          },
          {
            type: 'text',
            title: '7）易错点汇总',
            body: '① 把共享 state 放在兄弟 A 里，再想办法「传给」兄弟 B——B 读不到 A 的内部 state，除非 A 通过 props 传给 B（但 A 和 B 是平级，没有这条 props 链）。\n\n② 提升后父组件 state 太多就过早上 Redux——多数页面 5～10 个 useState 在 Page 里完全正常。\n\n③ filter 逻辑在 List 和 FilterBar 各写一份——重复且易不同步；应在父里算 visibleItems 或抽纯函数 filterItems(items, keyword)。\n\n④ 把「派生数据」也 useState 存一份——keyword 变忘记 sync filteredList；应 useMemo 或 render 里直接算。\n\n⑤ 兄弟通信用全局变量或模块级 let——破坏 React 数据流，刷新/多实例会乱。\n\n⑥ 提升过头：整个 App 一个巨型 App.js 堆所有 state——应按页面/功能拆子组件，state 提升到「最近共同父」即可，不是无脑提到 App。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '兄弟共享 state → 提到共同父组件。父拥有数据，兄弟只收 props + 发回调。过滤结果是派生值，父里 useMemo 算好传下去。兄弟不直接对话，永远经父协调。',
          },
        ],
      },
    },
    {
      id: 'context-theme',
      title: 'Context：跨多层传递主题（完整主题切换 demo）',
      summary: '主题、语言、登录用户等「很多层都要用」的数据，用 Provider 包住 + useContext 读取',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '当 props 要一层层穿过很多中间组件（props drilling），而中间层根本不用这些数据，只是「转手传递」时，用 Context。顶层 Provider 放入 value，深层子组件 useContext 直接取用。适合主题、语言、当前用户等全局性、变化不特别频繁的数据。',
          },
          {
            type: 'text',
            title: '1）是什么：Context（上下文）',
            body: 'React Context 提供了一种「跨层级传递数据」的机制，而不必手动把 props 一层层传给每一个中间组件。\n\n三个核心 API：\n\n• createContext(defaultValue)——创建一条「管道」\n\n• XxxContext.Provider value={...}——在子树顶层注入数据\n\n• useContext(XxxContext)——在任意深层子组件读取数据\n\n可以把它想成：ThemeProvider 在 App 最外层挂了一个「主题广播站」，DeepCard 在第 5 层也能直接收听，不需要 Layout、Sidebar、Content 每一层都传 theme props。\n\nContext 解决的是「传递路径太长、中间组件被迫当搬运工」的问题，不是替代所有 state 的方案。',
          },
          {
            type: 'table',
            title: '2）特点：Context vs props vs 状态库',
            headers: ['方案', '适用', '优点', '缺点'],
            rows: [
              ['props', '父子/浅层兄弟', '简单、可追踪', '深层传递冗余（drilling）'],
              ['状态提升', '兄弟共享', '数据流清晰', '父变胖'],
              ['Context', '跨多层全局信息', '深层直接读', '更新时订阅者重渲染'],
              ['Redux/Zustand', '大型复杂全局', '工具链强', '学习成本高'],
            ],
          },
          {
            type: 'text',
            title: '3）为什么：props drilling 的问题',
            body: '假设 App 有 theme state，只有最深层的 Button 需要改主题，但中间有 Layout → Sidebar → Nav → UserMenu → Button 五层。\n\n没有 Context 时：App 传 theme 给 Layout，Layout 传给 Sidebar……每一层都要写 theme={theme} setTheme={setTheme}，即使 Layout 和 Sidebar 根本不用 theme，只是「路过」。\n\n这叫 props drilling（属性钻取），带来：\n\n• 中间组件 API 膨胀，改 theme 要动很多文件\n• 可读性差，不知道 theme 最终在哪儿用\n• 重构痛苦\n\nContext 让真正需要 theme 的组件直接 useTheme()，中间层零 props。但注意：Context 更新时，所有 useContext 该 Context 的组件都会重渲染——所以不要把高频变化的数据（输入框每个字符、鼠标坐标）全塞 Context。',
          },
          {
            type: 'text',
            title: '4）怎么用：四步标准流程',
            body: '第 1 步——createContext 创建管道：\n\nconst ThemeContext = createContext(null)\n\nnull 是默认值，组件不在 Provider 内时使用（配合自定义 hook 抛错）。\n\n第 2 步——Provider 组件包住子树：\n\nThemeProvider 里 useState 管 theme，把 { theme, toggle, setTheme, colors } 放进 value，<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>。\n\nvalue 若是对象，用 useMemo 包一下，避免每次 render 新建对象导致所有消费者无意义重渲染。\n\n第 3 步——自定义 hook 封装 useContext（项目标配）：\n\nfunction useTheme() { const ctx = useContext(ThemeContext); if (!ctx) throw new Error(...); return ctx }\n\n第 4 步——在 index.js 或 App 最外层包 Provider，和 BrowserRouter 同级。',
          },
          {
            type: 'code',
            title: '完整可抄 demo：主题切换（Context 全流程）',
            language: 'jsx',
            body: `import { createContext, useContext, useState, useMemo } from 'react'

// ========== 1. createContext：创建一条「数据管道」 ==========
const ThemeContext = createContext(null) // null 是默认值（未包 Provider 时使用）

// 主题配置对象：light / dark 两套颜色
const themes = {
  light: {
    bg: '#ffffff',
    text: '#1f2937',
    card: '#f3f4f6',
    accent: '#2563eb',
  },
  dark: {
    bg: '#111827',
    text: '#f9fafb',
    card: '#1f2937',
    accent: '#60a5fa',
  },
}

// ========== 2. Provider：在子树顶层注入 theme state ==========
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  // useMemo：避免每次 render 新建 value 对象 → 导致所有消费者无意义重渲染
  const value = useMemo(
    () => ({
      theme,
      colors: themes[theme],
      toggle: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
      setTheme,
    }),
    [theme]
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// ========== 3. 自定义 Hook：封装 useContext + 错误检查（项目标配） ==========
function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme 必须在 ThemeProvider 内部使用')
  }
  return ctx
}

// ========== 4. 深层子组件：直接 useTheme，无需 props drilling ==========
function ThemeToggleButton() {
  const { theme, toggle, colors } = useTheme() // 跨层读取 Context

  return (
    <button
      type="button"
      onClick={toggle}
      style={{
        padding: '8px 16px',
        background: colors.accent,
        color: '#fff',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer',
      }}
    >
      当前：{theme === 'light' ? '浅色' : '深色'}（点击切换）
    </button>
  )
}

// 中间层：完全不传 theme props —— 解决 props drilling 的关键
function MiddleLayer() {
  return (
    <div>
      <p>我是中间层，不需要知道主题是什么</p>
      <DeepCard />
    </div>
  )
}

function DeepCard() {
  const { colors, theme } = useTheme()

  return (
    <div
      style={{
        marginTop: 16,
        padding: 20,
        background: colors.card,
        color: colors.text,
        borderRadius: 8,
      }}
    >
      <h3>深层卡片（第 3 层组件）</h3>
      <p>直接用 useTheme 读到主题：{theme}</p>
      <ThemeToggleButton />
    </div>
  )
}

function ThemedApp() {
  const { colors } = useTheme()

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: 24,
        background: colors.bg,
        color: colors.text,
        transition: 'background 0.2s, color 0.2s',
      }}
    >
      <h1>Context 主题切换 Demo</h1>
      <ThemeToggleButton />
      <MiddleLayer />
    </div>
  )
}

// ========== 5. 入口：最外层包 Provider，所有消费者必须在子树内 ==========
function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  )
}

export default App`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：点一下切换主题，三层嵌套的子组件全部一起变色',
            body: `import { createContext, useContext, useState, useMemo } from 'react' // Context 三件套 + useMemo

// ① createContext：建一条「数据管道」，参数 null 是没包 Provider 时的默认值
const ThemeContext = createContext(null)

const THEMES = { // 两套配色
  light: { bg: '#ffffff', card: '#f5f5f5', text: '#1f2937', accent: '#2563eb', name: '浅色' },
  dark: { bg: '#111827', card: '#1f2937', text: '#f9fafb', accent: '#60a5fa', name: '深色' },
}

// ② Provider 组件：把 state 和修改方法一起注入子树
function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light') // 真正的 state 在这里

  // useMemo：只有 mode 变了才生成新的 value 对象。否则每次渲染都新建对象，
  // 所有 useContext 的组件都会白白重渲染一次
  const value = useMemo(
    () => ({
      mode,
      colors: THEMES[mode],
      toggle: () => setMode((m) => (m === 'light' ? 'dark' : 'light')), // 把「修改数据的方法」也放进管道
    }),
    [mode]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// ③ 自定义 Hook：包一层 useContext，顺手检查「有没有忘记包 Provider」
function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme 必须在 ThemeProvider 内部使用') // 忘包 Provider 时给出人话报错
  return ctx
}

// 第 3 层（最深）：直接 useTheme 读主题，没有收到任何 props
function DeepButton() {
  const { mode, colors, toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle} // 切换方法也是从 Context 里拿的，不用父组件传
      style={{ padding: '6px 14px', background: colors.accent, color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
    >
      我在第 3 层 · 当前 {colors.name}（点我切换）
    </button>
  )
}

// 第 2 层：中间层 —— 注意它的参数列表是空的，一个 props 都没有
function MiddleLayer() {
  const { colors } = useTheme() // 想用就自己取，不想用就完全不用管主题这件事

  return (
    <div style={{ marginTop: 10, padding: 12, background: colors.card, borderRadius: 8 }}>
      <p style={{ margin: '0 0 8px', fontSize: 13 }}>我是第 2 层，没有接收任何 theme props</p>
      <DeepButton />
    </div>
  )
}

// 第 1 层：页面外壳，背景色也来自 Context
function Page() {
  const { colors, mode } = useTheme()

  return (
    <div style={{ padding: 16, background: colors.bg, color: colors.text, borderRadius: 8, transition: 'background .2s, color .2s' }}>
      <p style={{ marginTop: 0, fontSize: 13 }}>我是第 1 层，mode = {mode}</p>
      <MiddleLayer />
    </div>
  )
}

export default function Demo() { // 默认导出组件：入口负责把 Provider 包在最外层
  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      {/* 所有想读主题的组件都必须在 Provider 的子树里面，否则 useTheme 会抛错 */}
      <ThemeProvider>
        <Page />
      </ThemeProvider>
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: '对照：不用 Context 时 props 要穿 3 层（props drilling）',
            language: 'jsx',
            body: `// ❌ 没有 Context：props drilling（属性钻取）
// 中间组件 Layout / Child 根本不用 theme，却被迫当「搬运工」
function App() {
  const [theme, setTheme] = useState('light')
  return <Layout theme={theme} setTheme={setTheme} />
}

function Layout({ theme, setTheme }) {
  // Layout 自己不用 theme，只是往下传 —— 这就是 drilling 的问题
  return <Child theme={theme} setTheme={setTheme} />
}

function Child({ theme, setTheme }) {
  return <button onClick={() => setTheme('dark')}>{theme}</button>
}

// ✅ 有 Context：中间层零 props，深层直接 useContext
function App() {
  return (
    <ThemeProvider>
      <Layout /> {/* 干净：不传 theme */}
    </ThemeProvider>
  )
}

function Layout() {
  return <Child /> // 中间层完全不知道 theme 的存在
}

function Child() {
  const { theme, toggle } = useTheme() // 深层直接读取 Context
  return <button onClick={toggle}>{theme}</button>
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：Context 里同时放 state 和「改它的方法」，深层组件直接调用',
            body: `import { createContext, useContext, useState, useMemo } from 'react' // Context 三件套 + useMemo

// 购物车 Context：管道里既有数据（items），也有操作数据的函数（add / remove / clear）
const CartContext = createContext(null)

function CartProvider({ children }) {
  const [items, setItems] = useState([]) // 购物车数组，唯一数据源在这里

  // useMemo 的依赖是 [items]：items 没变就复用同一个 value 对象，避免消费者无意义重渲染
  const value = useMemo(() => {
    // 加购：已有就数量 +1（map 返回新数组），没有就追加一项
    function add(name) {
      setItems((prev) => {
        const hit = prev.find((it) => it.name === name)
        if (hit) return prev.map((it) => (it.name === name ? { ...it, qty: it.qty + 1 } : it))
        return [...prev, { id: Date.now(), name, qty: 1 }]
      })
    }

    function remove(id) {
      setItems((prev) => prev.filter((it) => it.id !== id)) // filter 返回新数组
    }

    const total = items.reduce((sum, it) => sum + it.qty, 0) // 派生值：总件数，reduce 累加

    // ★ 关键：state、派生值、修改方法全部塞进同一个 value，深层组件一次拿全
    return { items, total, add, remove, clear: () => setItems([]) }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart 必须在 CartProvider 内部使用') // 忘包 Provider 时快速定位
  return ctx
}

// 深层组件 ①：商品卡，直接调 Context 里的 add，不需要父组件传 onAdd
function ProductCard({ name }) {
  const { add } = useCart() // 只取用得到的那个方法

  return (
    <button type="button" onClick={() => add(name)} style={{ padding: '6px 10px', marginRight: 6 }}>
      加购 {name}
    </button>
  )
}

// 深层组件 ②：购物车角标，和 ProductCard 是平级，靠 Context 共享同一份数据
function CartBadge() {
  const { total } = useCart()

  return (
    <span style={{ padding: '2px 8px', background: '#1677ff', color: '#fff', borderRadius: 10, fontSize: 12 }}>
      🛒 {total} 件
    </span>
  )
}

// 中间层：一个 props 都不传 —— 这就是 Context 省下来的「搬运工代码」
function Shelf() {
  return (
    <div style={{ marginTop: 10 }}>
      {['键盘', '鼠标', '显示器'].map((n) => (
        <ProductCard key={n} name={n} /> // 列表 map 记得给 key
      ))}
    </div>
  )
}

// 中间层：同样零 props
function CartList() {
  const { items, remove, clear } = useCart() // 数据和两个方法一起取

  if (items.length === 0) return <p style={{ fontSize: 13, color: '#999' }}>购物车是空的</p> // 提前 return 处理空态

  return (
    <div>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 6px' }}>
        {items.map((it) => (
          <li key={it.id} style={{ fontSize: 13, marginBottom: 4 }}>
            {it.name} × {it.qty}
            {/* 直接调 Context 里的 remove，父组件完全没参与 */}
            <button type="button" onClick={() => remove(it.id)} style={{ marginLeft: 8, fontSize: 12 }}>
              移除
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={clear} style={{ fontSize: 12 }}>
        清空购物车
      </button>
    </div>
  )
}

export default function Demo() { // 默认导出组件
  return (
    <CartProvider>
      <div style={{ padding: 16, fontFamily: 'system-ui', maxWidth: 420 }}>
        <p style={{ margin: '0 0 8px', fontSize: 13, color: '#666' }}>
          Header 和货架是兄弟、和购物车列表隔着好几层，但都不用 props —— 数据和方法都从 Context 取。
        </p>
        <CartBadge />
        <Shelf />
        <div style={{ marginTop: 12, padding: 10, background: '#fafafa', borderRadius: 8 }}>
          <CartList />
        </div>
      </div>
    </CartProvider>
  )
}`,
          },
          {
            type: 'list',
            title: '5）Context 适用 / 不适用清单',
            ordered: false,
            items: [
              '✅ 主题 dark/light、语言 zh/en',
              '✅ 当前登录用户基本信息',
              '✅ 侧边栏折叠状态（多处读）',
              '✅ 表单步骤里跨层共享少量配置',
              '❌ 每个字符变化的输入框 value',
              '❌ 只父子两层就用 Context——props 更简单',
              '❌ 把所有 state 塞 Context——输入草稿、弹窗开关继续 useState',
              '❌ 高频鼠标位置、滚动位置——导致全树重渲染',
            ],
          },
          {
            type: 'list',
            title: '6）Context 实现自检清单',
            ordered: true,
            items: [
              '是否 createContext + Provider + useContext（或自定义 useXxx）三步齐全？',
              'Provider 是否包在足够外层，所有消费者都在子树内？',
              'value 对象是否用 useMemo 避免每次 render 新建？',
              '自定义 hook 是否检查了 ctx 为 null 并 throw 友好错误？',
              '是否只把「多层级都需要」的数据放 Context？',
              '主题切换时是否只有相关组件重渲染（可接受范围）？',
            ],
          },
          {
            type: 'text',
            title: '7）易错点汇总',
            body: '① 把所有 state 都塞 Context——输入框草稿、弹窗开关应继续用本地 useState；Context 更新会让所有订阅组件重渲染。\n\n② Provider 的 value 每次 render 都 { theme, toggle } 新建对象——即使 theme 没变，消费者也会重渲染；必须 useMemo([theme])。\n\n③ 忘记包 Provider——useContext 读到 defaultValue null，界面静默出错；自定义 hook 里 throw 可快速定位。\n\n④ 一个 Context 塞太多字段——任何字段变，所有消费者都重渲染；可按职责拆 ThemeContext、AuthContext。\n\n⑤ 用 Context 替代 props 导致数据流不可追踪——团队规范：局部仍 props，真正全局才 Context。\n\n⑥ 在 Provider 外调 useTheme——报错；测试时记得包 Provider 或 mock Context。',
          },
          {
            type: 'table',
            title: '8）通信方式总口诀',
            headers: ['关系', '首选', '备选'],
            rows: [
              ['父 → 子', 'props', '—'],
              ['子 → 父', '回调 props', '—'],
              ['兄弟共享', '状态提升', 'Context（层级深时）'],
              ['跨很多层', 'Context', '组合 props（仅 1～2 层时）'],
              ['大型全局', 'Redux / Zustand', '多个 Context 组合'],
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '父子 props，子父回调，兄弟提升，深层 Context。Provider 包外层，useMemo 稳 value，自定义 useXxx 防忘包 Provider。别把高频 state 塞 Context；主题/语言/用户才合适。',
          },
        ],
      },
    },
  ],
}

export default communicate
