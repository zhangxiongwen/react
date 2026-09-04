/**
 * 第 6 章：条件与列表
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
            body: `function Dashboard({ loading, error, user, messages }) {
  // ===== 提前 return：处理「非正常」状态 =====
  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <p>⏳ 加载中...</p>
      </div>
    )
  }

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

  if (!user) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <p>请先登录</p>
        <a href="/login">去登录</a>
      </div>
    )
  }

  // ===== 正常状态：主界面 =====
  const roleText = {
    admin: '管理员',
    editor: '编辑',
    guest: '访客',
  }[user.role] || '未知角色'

  return (
    <div style={{ padding: 24 }}>
      <h1>你好，{user.name}</h1>
      <p>身份：{roleText}</p>

      {/* 管理员才显示 */}
      {user.role === 'admin' && (
        <button type="button" style={{ marginBottom: 16 }}>
          进入后台
        </button>
      )}

      {/* 消息区域 */}
      {messages.length > 0 ? (
        <div>
          <p>你有 {messages.length} 条消息</p>
          <ul>
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

// 测试不同状态
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
            type: 'text',
            title: '4）方式二：三元运算符 ? : （二选一）',
            body: '适合两种 UI 互斥显示：已登录 / 未登录、有数据 / 空状态、展开 / 收起。\n\n写法：{ condition ? <A /> : <B /> }。\n\n不要嵌套超过 1 层三元——否则变成「问号地狱」，可读性急剧下降。多层分支请改用提前 return 或映射对象。\n\n展开 FAQ 示例里 open ? <p>答案</p> : null 是常见模式；: null 可以省略吗？可以，但显式写 null 有时更清晰。',
          },
          {
            type: 'code',
            title: '完整 Demo：登录状态切换 + 展开收起',
            language: 'jsx',
            body: `import { useState } from 'react'

function AuthHeader() {
  const [user, setUser] = useState(null) // null 表示未登录

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

      {/* 三元：二选一 */}
      {user ? (
        <span>
          欢迎，{user.name}
          <button
            type="button"
            onClick={() => setUser(null)}
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

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          textAlign: 'left',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        {open ? '▼' : '▶'} {question}
      </button>
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
            body: `function NotificationBadge({ count }) {
  return (
    <div>
      <span>消息</span>

      {/* ❌ count=0 时，页面会显示一个 0（因为 0 是假值但 React 会渲染它） */}
      {/* {count && <span className="badge">{count}</span>} */}

      {/* ✅ 修复方式 1：显式比较 */}
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

      {/* ✅ 修复方式 2：转布尔 */}
      {Boolean(count) && <span>...</span>}

      {/* ✅ 修复方式 3：三元 */}
      {count > 0 ? <span>{count}</span> : null}
    </div>
  )
}

// 测试
<NotificationBadge count={0} />   // 不应显示 badge
<NotificationBadge count={5} />  // 应显示 5`,
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
            body: `function OrderStatus({ status }) {
  const config = {
    pending: { color: '#faad14', text: '待支付', icon: '⏳' },
    paid: { color: '#52c41a', text: '已支付', icon: '✅' },
    shipped: { color: '#1677ff', text: '已发货', icon: '🚚' },
    cancelled: { color: '#999', text: '已取消', icon: '❌' },
  }

  const item = config[status] || { color: '#999', text: '未知', icon: '❓' }

  return (
    <span style={{ color: item.color, fontWeight: 500 }}>
      {item.icon} {item.text}
    </span>
  )
}

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
      {description && <p>{description}</p>}
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  )
}

function OrderList({ orders }) {
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
          key={order.id}
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
            body: `const list = [
  { id: 'a1', name: '苹果' },
  { id: 'b2', name: '香蕉' },
  { id: 'c3', name: '橙子' },
]

// ✅ 最好：后端/数据里稳定的唯一 id
{list.map((item) => (
  <div key={item.id}>{item.name}</div>
))}

// ⚠️ 凑合：业务上唯一的字段（如 email、sku）
{list.map((item) => (
  <div key={item.email}>{item.name}</div>
))}

// ❌ 避免：用 index 当 key（列表会增删排序时）
{list.map((item, index) => (
  <div key={index}>{item.name}</div>
))}
// 删除第一项后，原来 index=1 的项变成 index=0，React 以为没换，DOM 复用出错

// ❌ 错误：key 写在内部，不是 map 直接返回的元素上
{list.map((item) => (
  <Wrapper>
    <div key={item.id}>{item.name}</div>  {/* 无效！ */}
  </Wrapper>
))}

// ✅ 正确：key 在 map 返回的最外层
{list.map((item) => (
  <Wrapper key={item.id}>
    <div>{item.name}</div>
  </Wrapper>
))}`,
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
  const [keyword, setKeyword] = useState('')
  const [category, setCategory] = useState('all')
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [sortBy, setSortBy] = useState('default') // default | price-asc | price-desc

  // ===== 派生列表：不存 state，每次渲染计算 =====
  let visible = ALL_PRODUCTS

  // 1. 关键词搜索（不区分大小写）
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

  // 4. 排序（复制再 sort，不要 mutate 原数组）
  visible = [...visible]
  if (sortBy === 'price-asc') {
    visible.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-desc') {
    visible.sort((a, b) => b.price - a.price)
  }

  // 派生统计
  const totalCount = visible.length

  return (
    <div style={{ padding: 24, maxWidth: 640 }}>
      <h2>商品列表</h2>

      {/* 搜索 + 筛选栏 */}
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

      {/* 列表 or 空状态 */}
      {visible.length === 0 ? (
        <div style={{ padding: 48, textAlign: 'center', color: '#999' }}>
          <p style={{ fontSize: 40 }}>🔍</p>
          <p>没有找到匹配的商品</p>
          <button
            type="button"
            onClick={() => {
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
            type: 'text',
            title: '5）Walkthrough：这个 Demo 涵盖了哪些知识点',
            body: '1）map 渲染 ProductRow，key={product.id}。\n\n2）keyword/category/onlyInStock/sortBy 是 state（用户可控条件）。\n\n3）visible、totalCount 是派生值，filter + sort 链式处理。\n\n4）visible.length === 0 时空状态 + 「清除筛选」重置所有条件。\n\n5）select 的 option 也是 map 渲染，key={key}。\n\n6）ProductRow 拆成子组件，列表项 UI 与筛选逻辑分离。\n\n7）条件渲染：有结果 ul map，无结果 Empty 区块（三元）。',
          },
          {
            type: 'code',
            title: '列表 + 本地增删（state 是数组时）',
            language: 'jsx',
            body: `import { useState } from 'react'

function DynamicList() {
  const [items, setItems] = useState([
    { id: 1, text: '第一项' },
    { id: 2, text: '第二项' },
  ])
  const [nextId, setNextId] = useState(3)

  function handleAdd() {
    setItems((prev) => [...prev, { id: nextId, text: \`第 \${nextId} 项\` }])
    setNextId((id) => id + 1)
  }

  function handleRemove(id) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div style={{ padding: 20 }}>
      <button type="button" onClick={handleAdd}>添加</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.text}
            <button type="button" onClick={() => handleRemove(item.id)}>
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
// 这里用 id 做 key，不用 index，删除中间项不会窜行`,
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
