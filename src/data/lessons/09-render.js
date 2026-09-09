/**
 * 条件渲染与列表章节
 */
const render = {
  id: 'render',
  title: '条件渲染与列表',
  summary: '条件渲染完整场景（&&/三元/提前return）；列表 map+key+过滤搜索完整 Demo',
  order: 9,
  items: [
    {
      id: 'conditional',
      title: '条件渲染完整场景：加载/错误/权限/空状态/多分支',
      summary: '&& 有就显示；三元二选一；提前 return 处理多分支；避免 0 被渲染',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '条件渲染 = 根据 state/props 决定「显示 A 还是 B 还是什么都不显示」。常用：if + 提前 return、三元 ? :、&& 短路。',
          },
          {
            type: 'text',
            title: '为什么条件渲染是必学技能？',
            body: '真实页面很少静态不变：加载中要 spinner、失败要错误页、未登录要跳转提示、管理员才看到按钮、列表为空要占位图。这些都不是写死 JSX，而是根据 loading、error、user、list.length 等状态动态决定渲染什么。\n\nReact 没有 Vue 的 v-if 指令——一切用 JavaScript 表达式：if、三元、&&、对象映射。选对写法能让 JSX 可读、少 bug（尤其是 count && 把 0 渲染出来的经典坑）。',
          },
          {
            type: 'text',
            title: '1）为什么需要条件渲染？',
            body: '组件 return 的是「这一次渲染」的 UI 快照。state/props 变了，组件重跑，return 不同的 JSX，界面就切换了。\n\n条件渲染本质：在 return 里或 return 前，用 JS 逻辑从多种 UI 中选一种（或组合多种）。和 HTML/CSS 的 display:none 不同——条件为 false 时 React 往往根本不创建那部分虚拟 DOM（或 return null 整段不渲染）。',
          },
          {
            type: 'table',
            title: '2）四种条件渲染方式怎么选',
            headers: ['方式', '写法', '适用场景', '注意'],
            rows: [
              ['提前 return', 'if (loading) return <Loading />', '页面级多分支（加载/错误/空/正常）', '主 return 最干净'],
              ['三元 ? :', '{ ok ? <A /> : <B /> }', '二选一（登录/未登录）', '不要嵌套超过 1 层'],
              ['&& 短路', '{ show && <Modal /> }', '有就显示，无就 null', 'count 为 0 会渲染 0'],
              ['对象映射', 'STATUS_MAP[s]?.ui', '3+ 固定枚举状态', '配默认 fallback'],
            ],
          },
          {
            type: 'text',
            title: '3）方式一：提前 return（分支多、逻辑复杂时首选）',
            body: '在组件 return 主 JSX 之前，用 if 判断 loading / error / 无权限 / 无数据等情况，直接 return 对应的 JSX。\n\n好处：\n\n① 主 return 保持干净，不用套多层三元。\n\n② 每个分支可以 early return，减少嵌套。\n\n③ 适合「页面级」互斥状态——加载中和正常内容不会同时出现。\n\n模式：先处理异常/边界，最后 return  happy path（正常界面）。',
          },
          {
            type: 'code',
            title: '完整 Demo：Dashboard 页面（加载/错误/未登录/正常）',
            language: 'jsx',
            body: `// 条件渲染：根据 props 决定显示什么 UI
// 父组件通过 props 传入 loading / error / user / messages
function Dashboard({ loading, error, user, messages }) {
  // ===== 方式一：提前 return —— 多分支互斥时首选 =====
  // 加载中：直接 return 加载 UI，后面的代码不会执行
  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <p>⏳ 加载中...</p>
      </div>
    )
  }

  // 出错：提前 return 错误页，主界面不会渲染
  if (error) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'crimson' }}>
        <p>❌ 出错了：{error}</p>
        <button type="button" onClick={() => window.location.reload()}>
          重试
        </button>
      </div>
    )
  }

  // 未登录：!user 为 true 时进入此分支
  if (!user) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <p>请先登录</p>
        <a href="/login">去登录</a>
      </div>
    )
  }

  // ===== 走到这里说明：已加载、无错误、已登录 —— 正常主界面 =====
  // 对象映射：用 role 当 key 查中文名，比嵌套三元更清晰
  const roleText = {
    admin: '管理员',
    editor: '编辑',
    guest: '访客',
  }[user.role] || '未知角色'

  return (
    <div style={{ padding: 24 }}>
      <h1>你好，{user.name}</h1>
      <p>身份：{roleText}</p>

      {/* 方式三：&& 短路 —— 条件为真才渲染右边 */}
      {user.role === 'admin' && (
        <button type="button" style={{ marginBottom: 16 }}>
          进入后台
        </button>
      )}

      {/* 方式二：三元 ? : —— 二选一（有消息 / 空状态） */}
      {messages.length > 0 ? (
        <div>
          <p>你有 {messages.length} 条消息</p>
          <ul>
            {/* 列表渲染：map 把数组变成 JSX 数组；key 帮助 React 认项 */}
            {messages.map((m) => (
              <li key={m.id}>{m.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p style={{ color: '#999' }}>暂无消息</p>
      )}
    </div>
  )
}

// 父组件：传不同 props 测试各种条件分支
function App() {
  return (
    <>
      <Dashboard loading={true} />
      <Dashboard error="网络超时" user={null} messages={[]} />
      <Dashboard
        user={{ name: '小明', role: 'admin' }}
        messages={[{ id: 1, title: '系统通知' }]}
      />
    </>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：下拉框切换「加载中 / 出错 / 空数据 / 有数据」四种界面',
            body: `import { useState } from 'react' // 引入 useState，用来保存「现在模拟哪一种接口结果」

const MESSAGES = [ // 假数据：只有「有数据」这种状态才会用到它
  { id: 1, title: '系统通知：服务器已升级' },
  { id: 2, title: '小红给你发来一条私信' },
]

const box = { padding: 20, borderRadius: 8, background: '#fafafa', minHeight: 96 } // 四种状态共用的外框样式

// 面板子组件：四种状态是互斥的，所以用「提前 return」一层层挡掉，最后才轮到正常界面
function MessagePanel({ status }) {
  if (status === 'loading') { // ① 加载中：直接 return，函数到这里就结束，下面一行都不会执行
    return <div style={box}>⏳ 加载中，请稍候…</div>
  }

  if (status === 'error') { // ② 出错：错误界面和正常界面永远不会同时出现，这就是提前 return 的好处
    return <div style={{ ...box, color: '#cf1322' }}>❌ 加载失败：网络超时，请重试</div>
  }

  const list = status === 'success' ? MESSAGES : [] // 三元：只有 success 才给真数据，否则给空数组

  if (list.length === 0) { // ③ 空数据：列表为空时给占位提示，而不是渲染一个空荡荡的 ul
    return <div style={{ ...box, color: '#999' }}>📭 一条消息都没有</div>
  }

  return ( // ④ 能走到这里说明：加载完了、没报错、而且有数据 —— 这才是「主 return」
    <div style={box}>
      <p style={{ margin: '0 0 8px' }}>共 {list.length} 条消息</p>
      <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.9 }}>
        {list.map((m) => ( // 有数据才 map，key 用数据里稳定的 id
          <li key={m.id}>{m.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Demo() { // live Demo 必须默认导出一个函数组件
  const [status, setStatus] = useState('loading') // 一个字符串 state 就能模拟接口的四种结果

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      <label>
        切换状态：
        <select
          value={status} // 受控 select：显示的选项永远等于 state 的值
          onChange={(e) => setStatus(e.target.value)} // 选中项变化 → 改 state → 面板重新渲染
          style={{ padding: 6, marginLeft: 8 }}
        >
          <option value="loading">加载中 loading</option>
          <option value="error">出错 error</option>
          <option value="empty">空数据 empty</option>
          <option value="success">有数据 success</option>
        </select>
      </label>

      {/* 三元用在小处很合适：一句话提示当前走的是哪条分支 */}
      <p style={{ color: '#666', fontSize: 13 }}>
        当前：{status === 'success' ? '主 return（正常界面）' : '被提前 return 拦住了，主界面根本没渲染'}
      </p>

      {/* 状态通过 props 传给面板，面板只负责「从四种 UI 里选一种」 */}
      <MessagePanel status={status} />
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '4）方式二：三元运算符 ? : （二选一）',
            body: '适合两种 UI 互斥显示：已登录 / 未登录、有数据 / 空状态、展开 / 收起。\n\n写法：{ condition ? <A /> : <B /> }。\n\n不要嵌套超过 1 层三元——否则变成「问号地狱」，可读性急剧下降。多层分支请改用提前 return 或映射对象。\n\n展开 FAQ 示例里 open ? <p>答案</p> : null 是常见模式；: null 可以省略吗？可以，但显式写 null 有时更清晰。',
          },
          {
            type: 'code',
            title: '完整 Demo：登录状态切换 + 展开收起',
            language: 'jsx',
            body: `import { useState } from 'react'

// Demo 1：三元运算符 —— 登录 / 未登录二选一
function AuthHeader() {
  // user 为 null 表示未登录；登录后存 { name: '...' }
  const [user, setUser] = useState(null)

  return (
    <header
      style={{
        padding: '12px 24px',
        background: '#001529',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <strong>My App</strong>

      {/* 三元：condition ? 真时UI : 假时UI */}
      {user ? (
        <span>
          欢迎，{user.name}
          <button
            type="button"
            onClick={() => setUser(null)} // 退出 = 把 user 设回 null
            style={{ marginLeft: 12 }}
          >
            退出
          </button>
        </span>
      ) : (
        <button type="button" onClick={() => setUser({ name: '小明' })}>
          登录
        </button>
      )}
    </header>
  )
}

// Demo 2：三元控制展开/收起 —— open 为 true 显示答案
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false) // false = 默认收起

  return (
    <div style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)} // 点击切换 true/false
        style={{
          width: '100%',
          textAlign: 'left',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        {/* 箭头图标也随 open 变化 —— 小处用三元很合适 */}
        {open ? '▼' : '▶'} {question}
      </button>
      {/* open 为 true 显示答案，false 时 : null 什么都不渲染 */}
      {open ? (
        <p style={{ color: '#666', margin: '8px 0 0 24px' }}>{answer}</p>
      ) : null}
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '5）方式三：&& 短路（有就显示，没有就 null）',
            body: '写法：{ condition && <Component /> }。\n\nJS 规则：condition 为真才求值右边；为 false、null、undefined 时直接返回 condition，不渲染右边。\n\n最常用：{ isAdmin && <AdminPanel /> }、{ list.length > 0 && <List /> }。\n\n经典坑：count 为 0 时，0 && <Badge /> 的结果是 0——React 会渲染数字 0！因为 0 是假值但仍是合法 JSX 子节点。计数类条件必须写 count > 0 && ...。',
          },
          {
            type: 'code',
            title: '经典坑：count 为 0 时会渲染出数字 0',
            language: 'jsx',
            body: `// && 短路经典坑：count 为 0 时会把数字 0 渲染到页面上
function NotificationBadge({ count }) {
  return (
    <div>
      <span>消息</span>

      {/* ❌ 错误写法：0 && JSX 的结果是 0，React 会渲染数字 0 */}
      {/* JS 规则：假值 && 右边 → 返回假值本身，0 是合法 React 子节点 */}
      {/* {count && <span className="badge">{count}</span>} */}

      {/* ✅ 修复 1：显式比较，保证左边是 true/false，不是 0 */}
      {count > 0 && (
        <span
          style={{
            background: 'red',
            color: 'white',
            borderRadius: 10,
            padding: '2px 6px',
            fontSize: 12,
            marginLeft: 4,
          }}
        >
          {count}
        </span>
      )}

      {/* ✅ 修复 2：Boolean() 把 0 转成 false，不会漏出 0 */}
      {Boolean(count) && <span>...</span>}

      {/* ✅ 修复 3：三元 —— 最明确，适合初学者 */}
      {count > 0 ? <span>{count}</span> : null}
    </div>
  )
}

// 测试：count=0 不应显示红 badge；count=5 应显示
<NotificationBadge count={0} />
<NotificationBadge count={5} />`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：把 count 减到 0，亲眼看见左边多出来的那个「0」',
            body: `import { useState } from 'react' // 引入 useState 存消息条数

const cell = { flex: 1, padding: 14, borderRadius: 8, minHeight: 92 } // 左右两个盒子共用的样式
const badge = { background: '#f5222d', color: '#fff', borderRadius: 10, padding: '1px 7px', fontSize: 12, marginLeft: 6 } // 红色小圆点

export default function Demo() { // 默认导出组件
  const [count, setCount] = useState(2) // 故意可以减到 0 —— 0 正是 && 的经典坑

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        {/* Math.max(0, ...) 保证不会减成负数，方便你反复在 0 和正数之间切换 */}
        <button type="button" onClick={() => setCount((c) => Math.max(0, c - 1))}>-1</button>
        <strong>count = {count}</strong>
        <button type="button" onClick={() => setCount((c) => c + 1)}>+1</button>
        <span style={{ color: '#d46b08', fontSize: 13 }}>← 减到 0 看左边</span>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        {/* 左：错误写法。JS 规则是「假值 && 右边」直接返回那个假值本身，
            而 0 是一个合法的 React 子节点，于是数字 0 就被画到页面上了 */}
        <div style={{ ...cell, background: '#fff1f0', border: '1px solid #ffa39e' }}>
          <p style={{ margin: '0 0 8px', fontSize: 13, color: '#a8071a' }}>
            ❌ {'{count && <span>{count}</span>}'}
          </p>
          <div>
            消息
            {count && <span style={badge}>{count}</span>}
          </div>
          <p style={{ margin: '8px 0 0', fontSize: 12, color: '#a8071a' }}>
            {count === 0 ? '看见「消息 0」了吗？那个 0 就是漏出来的' : 'count 是正数时看起来一切正常'}
          </p>
        </div>

        {/* 右：正确写法。count > 0 的结果一定是 true / false，
            false 不会被 React 渲染，所以 0 的时候干干净净 */}
        <div style={{ ...cell, background: '#f6ffed', border: '1px solid #b7eb8f' }}>
          <p style={{ margin: '0 0 8px', fontSize: 13, color: '#237804' }}>
            ✅ {'{count > 0 && <span>{count}</span>}'}
          </p>
          <div>
            消息
            {count > 0 && <span style={badge}>{count}</span>}
          </div>
          <p style={{ margin: '8px 0 0', fontSize: 12, color: '#237804' }}>
            {count === 0 ? '这里什么都不显示 —— 才是我们想要的' : '和左边表现一致'}
          </p>
        </div>
      </div>

      <p style={{ marginTop: 12, fontSize: 13, color: '#666' }}>
        {/* 另外两种同样安全的写法，都能把 0 变成 false */}
        其他修法：{'{Boolean(count) && ...}'} 或 {'{count > 0 ? <span/> : null}'}；
        空字符串 '' 和 null / undefined 不会渲染，只有数字 0 和 NaN 会「漏出来」。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '6）&& 短路：哪些值会「漏」到界面上',
            headers: ['condition 值', '&& 表达式结果', '界面表现'],
            rows: [
              ['true / 1 / "hi"', '<Component />', '正常显示组件'],
              ['false', 'false', '不显示'],
              ['null / undefined', 'null / undefined', '不显示'],
              ['0 ⚠️', '0', '显示数字 0！'],
              ['"" 空字符串', '""', '不显示（空字符串不渲染）'],
              ['NaN', 'NaN', '可能显示 NaN 文字'],
            ],
            note: '数字计数、金额等用 > 0 或 !!value 比较，不要裸写 {count && ...}。',
          },
          {
            type: 'text',
            title: '7）方式四：多分支映射（3 个以上固定选项）',
            body: '状态是枚举值（pending/success/error、small/medium/large）时，用对象映射比嵌套三元清晰：\n\nconst config = { pending: {...}, paid: {...} }[status]\n\n或在 return 前 switch / if-else 赋值给变量 content，最后 return content。\n\nEmptyState 组件配合条件渲染：列表为空时 return <EmptyState />，是产品页常见模式。',
          },
          {
            type: 'code',
            title: '完整 Demo：订单状态多分支 + 空状态组件',
            language: 'jsx',
            body: `// 方式四：对象映射 —— 3+ 固定枚举状态时用，比嵌套三元清晰
function OrderStatus({ status }) {
  // status 是 'pending' | 'paid' | 'shipped' | 'cancelled' 等枚举值
  const config = {
    pending: { color: '#faad14', text: '待支付', icon: '⏳' },
    paid: { color: '#52c41a', text: '已支付', icon: '✅' },
    shipped: { color: '#1677ff', text: '已发货', icon: '🚚' },
    cancelled: { color: '#999', text: '已取消', icon: '❌' },
  }

  // 查不到时用 || 给默认值，避免 undefined 报错
  const item = config[status] || { color: '#999', text: '未知', icon: '❓' }

  return (
    <span style={{ color: item.color, fontWeight: 500 }}>
      {item.icon} {item.text}
    </span>
  )
}

// 空状态组件：列表无数据时的占位 UI，可复用
function EmptyState({ title = '暂无数据', description, action }) {
  return (
    <div
      style={{
        padding: 48,
        textAlign: 'center',
        color: '#999',
      }}
    >
      <p style={{ fontSize: 48, margin: 0 }}>📭</p>
      <h3 style={{ color: '#666' }}>{title}</h3>
      {/* &&：有 description / action 才渲染对应区块 */}
      {description && <p>{description}</p>}
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  )
}

function OrderList({ orders }) {
  // 提前 return：空数组时整页显示 EmptyState，不进入下面的 map
  if (orders.length === 0) {
    return (
      <EmptyState
        title="还没有订单"
        description="去商城逛逛吧"
        action={<button type="button">去购物</button>}
      />
    )
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {orders.map((order) => (
        <li
          key={order.id} // 稳定 id 作 key，列表增删时 React 才能正确复用 DOM
          style={{
            padding: 16,
            border: '1px solid #eee',
            marginBottom: 8,
            borderRadius: 8,
          }}
        >
          订单 #{order.id} · <OrderStatus status={order.status} />
        </li>
      ))}
    </ul>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：切换游客 / 普通用户 / 管理员，按角色显示不同按钮',
            body: `import { useState } from 'react' // 引入 useState 保存当前登录身份

// 角色配置：3+ 个固定枚举值，用对象映射比嵌套三元清晰得多
const ROLES = {
  guest: { label: '游客', desc: '没登录，只能看', color: '#8c8c8c' },
  user: { label: '普通用户', desc: '能发帖、能编辑自己的内容', color: '#1677ff' },
  admin: { label: '管理员', desc: '能删别人的帖、能进后台', color: '#cf1322' },
}

const btn = { padding: '6px 12px', marginRight: 8, marginBottom: 8, cursor: 'pointer' } // 按钮共用样式

// 工具栏子组件：按角色决定渲染哪些按钮
function Toolbar({ role }) {
  const isUser = role === 'user' || role === 'admin' // 「已登录」= 普通用户或管理员，抽成变量避免重复判断
  const isAdmin = role === 'admin' // 管理员专属权限

  return (
    <div style={{ padding: 14, border: '1px dashed #d9d9d9', borderRadius: 8 }}>
      {/* 所有人都能看：不加任何条件 */}
      <button type="button" style={btn}>查看内容</button>

      {/* && 短路：isUser 为 true 才渲染右边的按钮，false 时什么都不渲染 */}
      {isUser && <button type="button" style={btn}>发帖</button>}
      {isUser && <button type="button" style={btn}>编辑我的内容</button>}

      {/* 管理员才有的两个高危操作 */}
      {isAdmin && <button type="button" style={{ ...btn, color: '#cf1322' }}>删除他人内容</button>}
      {isAdmin && <button type="button" style={{ ...btn, color: '#cf1322' }}>进入后台</button>}

      {/* 三元：游客给一句引导，已登录的给一句欢迎 —— 二选一场景用三元最自然 */}
      {role === 'guest' ? (
        <p style={{ color: '#8c8c8c', margin: '4px 0 0' }}>登录后才能发帖哦</p>
      ) : (
        <p style={{ color: '#389e0d', margin: '4px 0 0' }}>已登录，可执行上面的操作</p>
      )}
    </div>
  )
}

export default function Demo() { // 默认导出组件
  const [role, setRole] = useState('guest') // 当前角色，真实项目里来自登录接口
  const info = ROLES[role] || ROLES.guest // 查映射表；用 || 兜底，防止拿到 undefined 后取属性报错

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      <div style={{ marginBottom: 12 }}>
        {/* Object.keys 把角色 key 变成数组，再 map 出三个切换按钮；key 用角色名，稳定唯一 */}
        {Object.keys(ROLES).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)} // 点一下换身份 → state 变 → 工具栏重新渲染
            style={{
              ...btn,
              fontWeight: role === r ? 'bold' : 'normal', // 当前身份加粗，让选中态一眼可见
              background: role === r ? '#e6f4ff' : '#fff',
            }}
          >
            {ROLES[r].label}
          </button>
        ))}
      </div>

      <p style={{ color: info.color, marginTop: 0 }}>
        当前身份：{info.label} —— {info.desc}
      </p>

      <Toolbar role={role} /> {/* 把角色传给工具栏，权限判断集中在子组件里 */}
    </div>
  )
}`,
          },
          {
            type: 'list',
            title: '8）可读性建议',
            ordered: true,
            items: [
              '分支 ≥ 3 个 → 提前 return 或映射对象',
              '二选一 → 三元',
              '有/无、权限按钮 → &&（数字比较用 > 0）',
              '不要在 JSX 里写 10 行 if-else，抽成函数或子组件',
              'loading/error/empty 各做成小组件，Dashboard 里组合',
            ],
          },
          {
            type: 'list',
            title: '9）动手练习清单',
            ordered: true,
            items: [
              '做 Toggle 组件，三元切换「开/关」两种样式',
              '做 NotificationBadge，测试 count=0 时不显示',
              '做 OrderList，orders 为空时显示 EmptyState',
              '把 Dashboard 的 loading/error/user 三个提前 return 改成独立子组件',
              '故意写 {count && <Badge />} 观察 count=0 时页面上的 0',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '多分支提前 return；二选一三元；有/无用 && 但数字要 > 0。枚举状态用对象映射。0 && JSX 会露出 0——永远显式比较。',
          },
        ],
      },
    },
    {
      id: 'list-map',
      title: '列表 map + key + 过滤搜索完整 Demo',
      summary: '数组 map 渲染列表；key 必须稳定唯一；过滤排序用派生值不要另存 state',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '列表渲染 = 数组.map(item => <Item key={item.id} />)。key 帮助 React 认项，必须稳定唯一，不要用 index（列表会变时）。',
          },
          {
            type: 'text',
            title: '为什么列表渲染和 key 是高频考点？',
            body: '几乎所有 App 都有列表：商品、消息、Todo、评论。写法固定：数据数组 + map + key。但 key 用错（尤其用 index）会导致删除中间项后输入框内容窜行、动画错乱、内部 state 错位。\n\n过滤搜索则和 state 章节的「派生值」呼应：keyword 是 state，filteredList 是算出来的，不要双份存。下面用大 Demo 把 map、key、filter、sort、空状态一次练完。',
          },
          {
            type: 'text',
            title: '1）基本套路：数组 → map → JSX 数组',
            body: '1）准备数组数据（来自 state 或 props 或常量）。\n\n2）array.map((item) => <Li key={item.id}>...</Li>)——map 返回 JSX 数组。\n\n3）用 {} 包在父元素里：{list.map(...)}。\n\n4）空数组时用条件渲染显示 EmptyState。\n\n5）key 写在 map 回调 return 的最外层元素上——不是内层 div 上。\n\n6）列表项复杂时拆成 ProductRow 子组件，父组件只管 map 和数据。',
          },
          {
            type: 'text',
            title: '2）key 是什么？为什么重要？',
            body: '当列表增删、排序、过滤后顺序变化时，React 需要知道「哪一项对应哪个组件实例/DOM 节点」，以便复用正确的 DOM、保留正确的内部 state（如输入框焦点、展开态）。\n\nkey 是每项在兄弟节点中的稳定标识，只在兄弟间唯一即可，不要求全局唯一。\n\n没有 key 或 key 不稳定（用 index，删第一项后后面 index 全变），React 会错误复用 DOM——表现就是输入框内容跑到别的行上。',
          },
          {
            type: 'code',
            title: 'key 正确 vs 错误对照',
            language: 'jsx',
            body: `// key 对照：React 用 key 在兄弟节点间识别「哪一项是哪一项」
const list = [
  { id: 'a1', name: '苹果' },
  { id: 'b2', name: '香蕉' },
  { id: 'c3', name: '橙子' },
]

// ✅ 最佳：数据里稳定的唯一 id（数据库 id / uuid）
{list.map((item) => (
  <div key={item.id}>{item.name}</div>
))}

// ⚠️ 凑合：业务上唯一且不变的字段
{list.map((item) => (
  <div key={item.email}>{item.name}</div>
))}

// ❌ 列表会增删排序时禁用 index 作 key
{list.map((item, index) => (
  <div key={index}>{item.name}</div>
))}
// 删第一项后，原 index=1 变成 index=0，React 误以为同一项，DOM/state 会窜行

// ❌ key 写在内部元素上无效 —— 必须写在 map 直接返回的最外层
{list.map((item) => (
  <Wrapper>
    <div key={item.id}>{item.name}</div>  {/* 无效！key 在 Wrapper 里面 */}
  </Wrapper>
))}

// ✅ key 写在 map 返回的最外层标签/组件上
{list.map((item) => (
  <Wrapper key={item.id}>
    <div>{item.name}</div>
  </Wrapper>
))}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo【必玩】：先在每行输入框打字，再点「删除第一项」——左边 key={index} 的内容会窜行',
            body: `import { useState } from 'react' // 引入 useState 保存这份两个列表共用的数据

const INITIAL = [ // 初始三条数据，每条都有稳定的 id
  { id: 'a', name: '苹果' },
  { id: 'b', name: '香蕉' },
  { id: 'c', name: '橙子' },
]

// 一个列表组件：两边唯一的差别就是 key 用 index 还是用 item.id
function FruitList({ title, items, useIndexAsKey, tone }) {
  return (
    <div style={{ flex: 1, padding: 12, borderRadius: 8, background: tone.bg, border: '1px solid ' + tone.border }}>
      <p style={{ margin: '0 0 10px', fontSize: 13, color: tone.text, fontWeight: 'bold' }}>{title}</p>

      {items.map((item, index) => (
        // ★★ 全场唯一的差异在这一行：index 会随着删除而整体前移，item.id 永远跟着数据本身
        <div
          key={useIndexAsKey ? index : item.id}
          style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}
        >
          <span style={{ width: 44, fontSize: 13 }}>{item.name}</span>

          {/* 这是「非受控」输入框：你敲进去的字保存在真实 DOM 节点里，不在 React 的 state 里。
              所以 React 复用了哪个 DOM 节点，你的字就跟着留在那一行 —— 这正是 key 要解决的问题。 */}
          <input
            defaultValue={''}
            placeholder={'给「' + item.name + '」写备注'}
            style={{ flex: 1, padding: 4, fontSize: 12 }}
          />
        </div>
      ))}

      {items.length === 0 && <p style={{ fontSize: 12, color: '#999' }}>删空了，点「重置」再来一遍</p>}
    </div>
  )
}

export default function Demo() { // 默认导出组件
  const [items, setItems] = useState(INITIAL) // 两个列表读同一份 state，保证对比公平

  // slice(1) 返回去掉第一项的新数组：删完之后，原来 index=1 的香蕉变成了 index=0
  function removeFirst() {
    setItems((prev) => prev.slice(1))
  }

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      <ol style={{ margin: '0 0 12px', paddingLeft: 20, fontSize: 13, color: '#d46b08', lineHeight: 1.9 }}>
        <li>在左右两边的 6 个输入框里分别打字（就写「苹果备注」「香蕉备注」「橙子备注」最直观）</li>
        <li>点下面的「删除第一项」，苹果那一行消失</li>
        <li>看左边：写给苹果的备注跑到香蕉那一行去了；右边：备注还老老实实跟着自己的水果</li>
      </ol>

      <div style={{ marginBottom: 12 }}>
        <button type="button" onClick={removeFirst} disabled={items.length === 0} style={{ padding: '6px 12px', marginRight: 8 }}>
          删除第一项
        </button>
        {/* 重置只恢复数据，输入框里的字由浏览器重新挂载后清空 */}
        <button type="button" onClick={() => setItems(INITIAL)} style={{ padding: '6px 12px' }}>
          重置
        </button>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <FruitList title="❌ key={index}" items={items} useIndexAsKey tone={{ bg: '#fff1f0', border: '#ffa39e', text: '#a8071a' }} />
        <FruitList title="✅ key={item.id}" items={items} useIndexAsKey={false} tone={{ bg: '#f6ffed', border: '#b7eb8f', text: '#237804' }} />
      </div>

      <p style={{ marginTop: 12, fontSize: 13, color: '#666', lineHeight: 1.8 }}>
        原因：React 在兄弟节点之间靠 key 认人。左边删掉苹果后，香蕉的 key 从 1 变成 0，
        React 看到「key=0 还在」，就把原本属于苹果的那个 DOM 节点（连里面的字一起）留下来改个文字复用 —— 于是内容窜行。
        右边 key 是 id，React 知道被删的是 a，直接销毁 a 那一行，其余原封不动。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '3）key 选用对照',
            headers: ['key 来源', '评价', '说明'],
            rows: [
              ['数据库 id / uuid', '✅ 最佳', '增删排序都不变'],
              ['业务唯一字段 sku/email', '✅ 可以', '保证稳定唯一'],
              ['map 的 index', '❌ 列表可变时禁用', '删中间项必窜行'],
              ['Math.random()', '❌ 绝对禁止', '每次渲染 key 都变，性能差+状态丢'],
              ['组合 key `${cat}-${id}`', '⚠️ 看情况', '跨分类唯一时可用'],
            ],
          },
          {
            type: 'text',
            title: '4）过滤和搜索：用派生值，不要另存 filtered state',
            body: '有 keyword、category、onlyInStock 等筛选条件时，每次渲染用 filter/sort 从原数组算出 visible 列表。\n\n不要 useState 再存一份 filteredList——否则改 ALL_PRODUCTS 或改 keyword 时要记得 sync 两份，极易漏改。\n\n这和 state 章节的「最小 state / 派生值」是同一原则：存「用户输入的条件」，不存「条件的计算结果」。\n\n排序前先 [...visible] 复制再 sort，不要对原数组直接 .sort()（会 mutate）。',
          },
          {
            type: 'code',
            title: '完整大 Demo：商品列表（搜索 + 分类 + 排序 + 空状态）',
            language: 'jsx',
            body: `import { useState } from 'react'

// 静态数据源（真实项目可能来自 API）
const ALL_PRODUCTS = [
  { id: 1, name: '机械键盘', category: 'digital', price: 399, stock: 10 },
  { id: 2, name: '无线鼠标', category: 'digital', price: 99, stock: 0 },
  { id: 3, name: '纯棉 T 恤', category: 'clothes', price: 79, stock: 50 },
  { id: 4, name: '牛仔裤', category: 'clothes', price: 199, stock: 30 },
  { id: 5, name: '显示器', category: 'digital', price: 1299, stock: 5 },
  { id: 6, name: '运动帽', category: 'clothes', price: 59, stock: 0 },
]

const CATEGORY_MAP = {
  all: '全部分类',
  digital: '数码',
  clothes: '服饰',
}

function ProductList() {
  // 只存「用户输入的筛选条件」—— 不另存 filteredList（派生值原则）
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('all')
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [sortBy, setSortBy] = useState('default') // default | price-asc | price-desc

  // ===== 派生列表 visible：每次渲染根据条件重新计算 =====
  let visible = ALL_PRODUCTS

  // 1. 关键词搜索（trim 去空格，toLowerCase 不区分大小写）
  if (keyword.trim()) {
    const q = keyword.trim().toLowerCase()
    visible = visible.filter((p) => p.name.toLowerCase().includes(q))
  }

  // 2. 分类筛选
  if (category !== 'all') {
    visible = visible.filter((p) => p.category === category)
  }

  // 3. 仅有货
  if (onlyInStock) {
    visible = visible.filter((p) => p.stock > 0)
  }

  // 4. 排序：先 [...visible] 复制，避免 .sort() 修改原数组（mutate）
  visible = [...visible]
  if (sortBy === 'price-asc') {
    visible.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-desc') {
    visible.sort((a, b) => b.price - a.price)
  }

  // 派生统计：从 visible 算出，不必单独 useState
  const totalCount = visible.length

  return (
    <div style={{ padding: 24, maxWidth: 640 }}>
      <h2>商品列表</h2>

      {/* 筛选栏：受控组件 —— value 来自 state，onChange 更新 state */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          marginBottom: 16,
          padding: 16,
          background: '#fafafa',
          borderRadius: 8,
        }}
      >
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="搜索商品名..."
          style={{ flex: 1, minWidth: 160, padding: 8 }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: 8 }}
        >
          {/* option 列表也要 map + key，规则和商品列表一样 */}
          {Object.entries(CATEGORY_MAP).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: 8 }}
        >
          <option value="default">默认排序</option>
          <option value="price-asc">价格从低到高</option>
          <option value="price-desc">价格从高到低</option>
        </select>

        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
          />
          仅有货
        </label>
      </div>

      <p style={{ color: '#666', marginBottom: 12 }}>
        共 {totalCount} 件商品
        {keyword && \` · 搜索「\${keyword}」\`}
      </p>

      {/* 条件渲染：有结果 map 列表，无结果显示空状态 */}
      {visible.length === 0 ? (
        <div style={{ padding: 48, textAlign: 'center', color: '#999' }}>
          <p style={{ fontSize: 40 }}>🔍</p>
          <p>没有找到匹配的商品</p>
          <button
            type="button"
            onClick={() => {
              // 一键重置所有筛选条件
              setKeyword('')
              setCategory('all')
              setOnlyInStock(false)
            }}
          >
            清除筛选
          </button>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {visible.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </ul>
      )}
    </div>
  )
}

// 列表项拆成子组件：父负责 map + 筛选，子负责单行 UI
function ProductRow({ product }) {
  return (
    <li
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        border: '1px solid #eee',
        borderRadius: 8,
        marginBottom: 8,
      }}
    >
      <div>
        <strong>{product.name}</strong>
        <span style={{ marginLeft: 8, color: '#999', fontSize: 12 }}>
          {CATEGORY_MAP[product.category]}
        </span>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ color: '#cf1322', fontWeight: 'bold' }}>
          ¥{product.price}
        </div>
        <div style={{ fontSize: 12, color: product.stock > 0 ? '#52c41a' : '#999' }}>
          {product.stock > 0 ? \`库存 \${product.stock}\` : '缺货'}
        </div>
      </div>
    </li>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：搜索框实时过滤 + 价格排序 + 「没有匹配结果」空状态',
            body: `import { useState } from 'react' // 引入 useState 保存搜索词和排序方式

const ALL = [ // 原始数据放在组件外：它不会变，所以不用 state，也不必每次渲染重建
  { id: 1, name: '机械键盘', price: 399 },
  { id: 2, name: '无线鼠标', price: 99 },
  { id: 3, name: '显示器', price: 1299 },
  { id: 4, name: '键盘手托', price: 59 },
  { id: 5, name: 'USB 扩展坞', price: 189 },
]

export default function Demo() { // 默认导出组件
  const [keyword, setKeyword] = useState('') // state ①：用户输入的关键词
  const [sort, setSort] = useState('none') // state ②：排序方式 none / asc / desc

  // ✅ 派生值：每次渲染现算。keyword 一变组件重跑，visible 自然就是最新的，
  //    千万别再 useState 存一份 filteredList —— 那样必须手动同步两份数据，极易漏改
  let visible = ALL.filter((p) => p.name.toLowerCase().includes(keyword.trim().toLowerCase()))

  // 排序前先用 [...visible] 复制一份：sort 会原地修改数组，直接排原数组就「污染」了数据源
  visible = [...visible]
  if (sort === 'asc') visible.sort((a, b) => a.price - b.price) // 价格从低到高
  if (sort === 'desc') visible.sort((a, b) => b.price - a.price) // 价格从高到低

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui', maxWidth: 460 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input
          value={keyword} // 受控输入框：显示的值永远来自 state
          onChange={(e) => setKeyword(e.target.value)} // 每敲一个字就更新 state，列表立刻跟着变
          placeholder="搜索商品名，试试「键盘」或「xyz」"
          style={{ flex: 1, padding: 6 }}
        />
        {/* 三个排序按钮：点一下切换排序方式，当前选中的按钮加粗 */}
        {[
          { key: 'none', label: '默认' },
          { key: 'asc', label: '价 ↑' },
          { key: 'desc', label: '价 ↓' },
        ].map((opt) => (
          <button
            key={opt.key} // 按钮列表同样要 key，规则和商品列表完全一样
            type="button"
            onClick={() => setSort(opt.key)}
            style={{ padding: '6px 10px', fontWeight: sort === opt.key ? 'bold' : 'normal' }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* 数量也是派生值，直接用 visible.length，不用单独存 state */}
      <p style={{ fontSize: 13, color: '#666', margin: '0 0 8px' }}>命中 {visible.length} 件</p>

      {/* 三元条件渲染：有结果就 map 列表，没结果就显示空状态 */}
      {visible.length === 0 ? (
        <div style={{ padding: 32, textAlign: 'center', color: '#999', background: '#fafafa', borderRadius: 8 }}>
          <p style={{ fontSize: 32, margin: 0 }}>🔍</p>
          <p style={{ margin: '6px 0 10px' }}>没有匹配「{keyword}」的商品</p>
          <button type="button" onClick={() => setKeyword('')}>清空搜索</button>
        </div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {visible.map((p) => ( // key 用数据自带的稳定 id，过滤排序后顺序怎么变都不怕
            <li
              key={p.id}
              style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', border: '1px solid #eee', borderRadius: 6, marginBottom: 6 }}
            >
              <span>{p.name}</span>
              <strong style={{ color: '#cf1322' }}>¥{p.price}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '5）Walkthrough：这个 Demo 涵盖了哪些知识点',
            body: '1）map 渲染 ProductRow，key={product.id}。\n\n2）keyword/category/onlyInStock/sortBy 是 state（用户可控条件）。\n\n3）visible、totalCount 是派生值，filter + sort 链式处理。\n\n4）visible.length === 0 时空状态 + 「清除筛选」重置所有条件。\n\n5）select 的 option 也是 map 渲染，key={key}。\n\n6）ProductRow 拆成子组件，列表项 UI 与筛选逻辑分离。\n\n7）条件渲染：有结果 ul map，无结果 Empty 区块（三元）。',
          },
          {
            type: 'code',
            title: '列表 + 本地增删（state 是数组时）',
            language: 'jsx',
            body: `import { useState } from 'react'

// 动态列表：state 是数组，增删改都要「不可变更新」
function DynamicList() {
  const [items, setItems] = useState([
    { id: 1, text: '第一项' },
    { id: 2, text: '第二项' },
  ])
  const [nextId, setNextId] = useState(3) // 自增 id，保证每项 key 稳定唯一

  function handleAdd() {
    // 函数式更新 + 展开：prev 是旧数组，末尾追加新项，不 mutate 原数组
    setItems((prev) => [...prev, { id: nextId, text: \`第 \${nextId} 项\` }])
    setNextId((id) => id + 1)
  }

  function handleRemove(id) {
    // filter 返回新数组，去掉 id 匹配的那一项
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div style={{ padding: 20 }}>
      <button type="button" onClick={handleAdd}>添加</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}> {/* 用 id 作 key，删中间项不会窜行 */}
            {item.text}
            {/* 箭头函数包一层，把 item.id 传给 handleRemove */}
            <button type="button" onClick={() => handleRemove(item.id)}>
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
            title: 'Live Demo：嵌套列表（分类 → 分类下的条目），每一层 map 都要有自己的 key',
            body: `import { useState } from 'react' // 引入 useState，用来记录哪些分类是展开的

const GROUPS = [ // 两层结构：外层是分类，每个分类里还有一个 items 数组
  {
    id: 'fe', // 外层 key 用这个
    name: '前端',
    items: [
      { id: 'fe-1', name: 'React 基础' }, // 内层 key 用这个
      { id: 'fe-2', name: 'CSS 布局' },
      { id: 'fe-3', name: 'TypeScript' },
    ],
  },
  {
    id: 'be',
    name: '后端',
    items: [
      { id: 'be-1', name: 'Node.js' },
      { id: 'be-2', name: 'MySQL' },
    ],
  },
  { id: 'ops', name: '运维', items: [] }, // 故意留一个空分类，演示内层的空状态
]

export default function Demo() { // 默认导出组件
  // 用数组存「当前展开的分类 id」，默认把前端展开
  const [openIds, setOpenIds] = useState(['fe'])

  // 切换展开/收起：已在数组里就 filter 掉，不在就追加 —— 都是「不可变更新」，返回新数组
  function toggle(id) {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui', maxWidth: 420 }}>
      <p style={{ margin: '0 0 10px', fontSize: 13, color: '#666' }}>点分类标题展开 / 收起</p>

      {/* 第一层 map：遍历分类。key={group.id} 写在 map 直接返回的最外层元素上 */}
      {GROUPS.map((group) => {
        const open = openIds.includes(group.id) // 派生值：这个分类当前是否展开

        return (
          <div key={group.id} style={{ border: '1px solid #eee', borderRadius: 8, marginBottom: 8, overflow: 'hidden' }}>
            <button
              type="button"
              onClick={() => toggle(group.id)} // 箭头函数包一层，才能把 group.id 传进去
              style={{ width: '100%', textAlign: 'left', padding: '10px 12px', border: 'none', background: '#fafafa', cursor: 'pointer' }}
            >
              {open ? '▼' : '▶'} {group.name}
              <span style={{ color: '#999', fontSize: 12, marginLeft: 6 }}>（{group.items.length} 项）</span>
            </button>

            {/* && 短路：收起时整段子列表根本不渲染 */}
            {open && (
              <ul style={{ listStyle: 'none', margin: 0, padding: '8px 12px' }}>
                {/* 第二层 map：遍历这个分类下的条目，key={item.id} 是这一层自己的 key。
                    key 只要求在「同一批兄弟节点」里唯一，不要求全局唯一 —— 所以两层各管各的 */}
                {group.items.map((item) => (
                  <li key={item.id} style={{ padding: '4px 0', fontSize: 14 }}>
                    · {item.name}
                  </li>
                ))}

                {/* 内层空数组也要给提示，否则展开后是一片空白 */}
                {group.items.length === 0 && (
                  <li style={{ color: '#999', fontSize: 13 }}>这个分类下还没有课程</li>
                )}
              </ul>
            )}
          </div>
        )
      })}

      <p style={{ marginTop: 12, fontSize: 13, color: '#666' }}>
        易错点：只给外层加 key、内层 map 忘了加，控制台会警告 “Each child in a list should have a unique key”。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'list',
            title: '6）key 与列表自检清单',
            ordered: true,
            items: [
              'key 在 map 返回的最外层元素 / 组件标签上',
              'key 来自稳定 id，不是 index（列表会增删时）',
              '过滤结果是派生值，不单独 useState',
              'sort 前 [...arr] 复制，不 mutate 原 state 数组',
              '空列表有 EmptyState 或友好提示',
              '列表项复杂时拆 Row/Item 子组件',
            ],
          },
          {
            type: 'list',
            title: '7）动手练习清单',
            ordered: true,
            items: [
              '给 ProductList 加「价格区间」筛选（min/max 两个 input）',
              '做 TodoList：map 渲染 + 过滤「已完成/未完成」tab，用派生值',
              '故意用 index 做 key，删除中间 todo，看输入框内容是否错乱',
              '把 ProductRow 加上「加入购物车」按钮，点击后父组件 items 数组增加一项',
              'option 列表 map 时也加上 key，体会和商品列表同一规则',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'map 渲染列表，key 用稳定 id 写在最外层。筛选排序是派生值，别双份 state。删改列表禁用 index 作 key；排序前先复制数组。',
          },
        ],
      },
    },
  ],
}

export default render
