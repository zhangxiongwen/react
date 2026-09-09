/**
 * 演练台 · React 实战小页面
 * React 源码类 demo：runtime: 'react' + language: 'tsx'
 *
 * 这一组和前面几组不一样：不再是「一个知识点一个例子」，
 * 而是把 state、事件、列表、条件渲染、请求组合成一个「小而完整的页面」，
 * 尽量贴近真实项目里天天写的那些东西。
 *
 * 沙箱约束（切勿违反）：只能 import react / antd / @ant-design/icons / dayjs；
 * 必须 export default 一个叫 Demo 的组件；样式全写内联；
 * 不碰地址栏、不用 fixed 遮罩、不用 alert，localStorage 的 key 一律 pg- 开头。
 */
const part9 = [
  {
    id: 'p9-todo-full',
    title: 'Todo 完整版（刷新不丢）',
    group: '17-React实战案例',
    summary: '增删改查 + 三种筛选 + 本地存储，最经典的练手项目',
    runtime: 'react',
    language: 'tsx',
    code: `import { useEffect, useMemo, useState } from 'react' // 三个最常用的钩子

const KEY = 'pg-todos' // localStorage 的键名，加 pg- 前缀避免和网站自己的数据打架

// 首屏读一次本地存储；没存过或数据坏了都要有兜底，不能让页面白屏
function readTodos() {
  try {
    const raw = localStorage.getItem(KEY) // 拿到的是字符串（或 null）
    return raw ? JSON.parse(raw) : [{ id: 1, text: '读完这一课', done: false }]
  } catch (err) {
    return [] // JSON 解析失败就当成空列表
  }
}

export default function Demo() {
  // useState 传「函数」而不是「值」：这样 readTodos 只在第一次渲染跑一次（惰性初始化）
  const [todos, setTodos] = useState(readTodos)
  const [text, setText] = useState('') // 输入框内容
  const [filter, setFilter] = useState('all') // 当前筛选：all / active / done

  // todos 一变就写回 localStorage，所以刷新页面数据还在
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos)) // 只能存字符串，所以要 stringify
  }, [todos]) // 依赖数组写 todos = 「只在 todos 变化后执行」

  function add() {
    const t = text.trim() // 去掉首尾空格
    if (!t) return // 空内容不让加
    setTodos((prev) => [...prev, { id: Date.now(), text: t, done: false }]) // 用「新数组」替换旧数组
    setText('') // 清空输入框
  }

  // 勾选：map 出一个新数组，只把命中的那一项换成新对象（绝不直接改原对象）
  const toggle = (id) => setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  const remove = (id) => setTodos((prev) => prev.filter((t) => t.id !== id)) // 删除 = 把它过滤掉
  const clearDone = () => setTodos((prev) => prev.filter((t) => !t.done)) // 清空已完成

  // 筛选结果是「算出来的」，不再单独存一个 state，否则两份数据很容易不同步
  const shown = useMemo(
    () => todos.filter((t) => (filter === 'all' ? true : filter === 'done' ? t.done : !t.done)),
    [todos, filter] // 这两个没变就直接复用上次的结果
  )
  const left = todos.filter((t) => !t.done).length // 「还剩几件」同样是算出来的

  return (
    <div style={wrap}>
      <h3 style={{ margin: '0 0 12px', fontSize: 16 }}>我的待办</h3>

      <div style={{ display: 'flex', gap: 8 }}>
        {/* 受控输入框：value 来自 state，onChange 再写回 state */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()} // 回车等于点「添加」
          placeholder="输入任务，按回车添加"
          style={input}
        />
        <button onClick={add} style={btn}>添加</button>
      </div>

      <div style={{ display: 'flex', gap: 8, margin: '12px 0' }}>
        {/* 用数组 map 出三个筛选按钮，选中的那个换个底色 */}
        {[['all', '全部'], ['active', '未完成'], ['done', '已完成']].map(([k, label]) => (
          <button key={k} onClick={() => setFilter(k)} style={filter === k ? tabOn : tab}>{label}</button>
        ))}
      </div>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {shown.map((t) => (
          // key 要唯一且稳定，React 靠它认出「哪一项被改了」
          <li key={t.id} style={row}>
            <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
            {/* 样式也能由 state 决定：完成后加删除线、文字变浅 */}
            <span style={{ flex: 1, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#5c6b63' : '#1f2a24' }}>
              {t.text}
            </span>
            <button onClick={() => remove(t.id)} style={mini}>删除</button>
          </li>
        ))}
        {/* 空状态：别让用户对着一片空白发愣 */}
        {shown.length === 0 && <li style={{ ...row, color: '#5c6b63' }}>这个分类下没有任务</li>}
      </ul>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
        <span style={{ fontSize: 13, color: '#5c6b63' }}>还剩 {left} 件</span>
        <button onClick={clearDone} style={tab}>清空已完成</button>
      </div>

      <p style={hint}>
        试试添加两条任务，然后按 F5 刷新整个页面 —— 任务还在，因为每次改动都写进了 localStorage
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', background: '#f7faf8', color: '#1f2a24' }
const input = { flex: 1, padding: '7px 10px', fontSize: 14, border: '1px solid #e2e9e4', borderRadius: 6 }
const btn = { padding: '7px 14px', fontSize: 13, border: '1px solid #2f6b4f', borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer' }
const tab = { padding: '5px 12px', fontSize: 13, border: '1px solid #e2e9e4', borderRadius: 6, background: '#fff', color: '#1f2a24', cursor: 'pointer' }
const tabOn = { ...tab, background: '#2f6b4f', border: '1px solid #2f6b4f', color: '#fff' }
const row = { display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', marginBottom: 6, background: '#fff', border: '1px solid #e2e9e4', borderRadius: 6, fontSize: 14 }
const mini = { padding: '3px 8px', fontSize: 12, border: '1px solid #e2e9e4', borderRadius: 5, background: '#fff', color: '#c53030', cursor: 'pointer' }
const hint = { marginTop: 14, fontSize: 13, color: '#5c6b63', lineHeight: 1.7 }`,
  },
  {
    id: 'p9-cart',
    title: '购物车：总价要算不要存',
    group: '17-React实战案例',
    summary: '加购、数量加减、删除，合计金额全部由购物车推导出来',
    runtime: 'react',
    language: 'tsx',
    code: `import { useMemo, useState } from 'react'

// 商品清单：真实项目里这份数据来自接口，这里先写死方便演示
const GOODS = [
  { id: 1, name: '机械键盘', price: 299 },
  { id: 2, name: '人体工学椅', price: 899 },
  { id: 3, name: '显示器支架', price: 159 },
  { id: 4, name: '降噪耳机', price: 499 },
]

export default function Demo() {
  // 购物车只存「买了哪个 id、买了几件」，名字和价格去 GOODS 里查
  // 这叫「单一数据源」：同一份信息只存一处，就不会出现两边对不上的情况
  const [cart, setCart] = useState([])

  function addToCart(good) {
    setCart((prev) => {
      const hit = prev.find((it) => it.id === good.id) // 车里已经有这件商品吗
      if (hit) {
        // 有 → 只把这一项的数量 +1，其他项原样返回
        return prev.map((it) => (it.id === good.id ? { ...it, qty: it.qty + 1 } : it))
      }
      return [...prev, { id: good.id, qty: 1 }] // 没有 → 追加一条新记录
    })
  }

  // 改数量：delta 传 +1 或 -1，减到 0 就顺手整条移除，省得再写一套判断
  function changeQty(id, delta) {
    setCart((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: it.qty + delta } : it))
        .filter((it) => it.qty > 0)
    )
  }

  const removeItem = (id) => setCart((prev) => prev.filter((it) => it.id !== id)) // 单项删除

  // 关键：总件数、总金额都是「由 cart 推导出来的」，不另外存 state
  // 如果把 total 也存成 state，任何一次加减忘了同步，就会出现「金额和商品对不上」的经典 bug
  const { count, total } = useMemo(() => {
    let count = 0
    let total = 0
    for (const it of cart) {
      const good = GOODS.find((g) => g.id === it.id) // 用 id 反查商品信息
      count += it.qty // 累加件数
      total += good.price * it.qty // 累加金额
    }
    return { count, total }
  }, [cart]) // cart 没变就直接复用上次算好的结果

  return (
    <div style={wrap}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h4 style={h4}>商品列表</h4>
          {/* 列表渲染的标准写法：map 出一堆 JSX，每个都带 key */}
          {GOODS.map((g) => (
            <div key={g.id} style={row}>
              <span style={{ flex: 1 }}>{g.name}</span>
              <span style={{ color: '#c53030', marginRight: 8 }}>¥{g.price}</span>
              <button onClick={() => addToCart(g)} style={btn}>加入</button>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <h4 style={h4}>购物车（{count} 件）</h4>
          {/* 空购物车提示：条件渲染，数组为空时才显示 */}
          {cart.length === 0 && <p style={{ fontSize: 13, color: '#5c6b63' }}>购物车是空的，先从左边加两件吧</p>}

          {cart.map((it) => {
            const good = GOODS.find((g) => g.id === it.id) // 每行都反查一次商品详情
            return (
              <div key={it.id} style={row}>
                <span style={{ flex: 1 }}>{good.name}</span>
                <button onClick={() => changeQty(it.id, -1)} style={mini}>-</button>
                <span style={{ width: 26, textAlign: 'center' }}>{it.qty}</span>
                <button onClick={() => changeQty(it.id, 1)} style={mini}>+</button>
                <button onClick={() => removeItem(it.id)} style={{ ...mini, marginLeft: 8, color: '#c53030' }}>删</button>
              </div>
            )
          })}

          <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #e2e9e4', fontSize: 14 }}>
            合计：<b style={{ color: '#c53030', fontSize: 18 }}>¥{total}</b>
          </div>
        </div>
      </div>

      <p style={hint}>
        试试把「机械键盘」点两次「加入」：右边数量变成 2 而不是多出一行，金额也跟着翻倍
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', background: '#f7faf8', color: '#1f2a24' }
const h4 = { margin: '0 0 10px', fontSize: 14, color: '#2f6b4f' }
const row = { display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px', marginBottom: 6, background: '#fff', border: '1px solid #e2e9e4', borderRadius: 6, fontSize: 14 }
const btn = { padding: '4px 10px', fontSize: 12, border: '1px solid #2f6b4f', borderRadius: 5, background: '#2f6b4f', color: '#fff', cursor: 'pointer' }
const mini = { width: 24, padding: '2px 0', fontSize: 13, border: '1px solid #e2e9e4', borderRadius: 5, background: '#fff', color: '#1f2a24', cursor: 'pointer' }
const hint = { marginTop: 14, fontSize: 13, color: '#5c6b63', lineHeight: 1.7 }`,
  },
  {
    id: 'p9-table-crud',
    title: '后台表格 CRUD（增删改查）',
    group: '17-React实战案例',
    summary: 'antd Table + Modal + Form，一个弹窗同时管新增和编辑',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'
import { Button, Form, Input, Modal, Popconfirm, Select, Space, Table, Tag } from 'antd'

export default function Demo() {
  // 列表数据先放本地 state。
  // 真实项目里这里是 useEffect 里调接口（GET /users）拿回来再 setRows
  const [rows, setRows] = useState([
    { id: 1, name: '张三', role: 'admin' },
    { id: 2, name: '李四', role: 'user' },
  ])
  const [open, setOpen] = useState(false) // 弹窗开关
  const [editing, setEditing] = useState(null) // null = 新增模式；有对象 = 正在编辑那一行
  const [form] = Form.useForm() // antd 表单实例，用来读值 / 校验 / 重置

  // 点「新增」：清空表单再打开弹窗
  function openAdd() {
    setEditing(null)
    form.resetFields() // 不重置会残留上次填的内容
    setOpen(true)
  }

  // 点「编辑」：把这一行的数据回填进表单
  function openEdit(row) {
    setEditing(row)
    form.setFieldsValue(row)
    setOpen(true)
  }

  async function submit() {
    const values = await form.validateFields() // 校验不通过会抛错，下面的代码就不会执行
    if (editing) {
      // 编辑：真实项目是 PUT /users/:id，接口成功后再更新本地列表
      setRows((prev) => prev.map((r) => (r.id === editing.id ? { ...r, ...values } : r)))
    } else {
      // 新增：真实项目是 POST /users，id 通常由后端生成，这里拿时间戳凑一个
      setRows((prev) => [...prev, { id: Date.now(), ...values }])
    }
    setOpen(false) // 关弹窗
  }

  const remove = (id) => setRows((prev) => prev.filter((r) => r.id !== id)) // 真实项目：DELETE /users/:id

  // columns 描述「每一列怎么显示」；render 用来自定义单元格内容
  const columns = [
    { title: '姓名', dataIndex: 'name' },
    {
      title: '角色',
      dataIndex: 'role',
      render: (v) => <Tag color={v === 'admin' ? 'green' : 'default'}>{v === 'admin' ? '管理员' : '普通用户'}</Tag>,
    },
    {
      title: '操作',
      render: (_, row) => ( // render 的第二个参数就是整行数据
        <Space>
          <Button size="small" onClick={() => openEdit(row)}>编辑</Button>
          {/* Popconfirm 是气泡确认框：比浏览器自带的确认框好，不会卡住整个页面 */}
          <Popconfirm title="确定删除这一行？" okText="删除" cancelText="取消" onConfirm={() => remove(row.id)}>
            <Button size="small" danger>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    // 外层必须 position: 'relative'，才能配合下面 Modal 的 getContainer={false}
    <div style={{ padding: 20, position: 'relative', background: '#f7faf8', fontFamily: 'system-ui' }}>
      <Button type="primary" onClick={openAdd} style={{ marginBottom: 12 }}>新增用户</Button>

      {/* rowKey 告诉 Table 用哪个字段当唯一标识，作用和列表里的 key 一样 */}
      <Table rowKey="id" size="small" pagination={false} columns={columns} dataSource={rows} />

      <Modal
        title={editing ? '编辑用户' : '新增用户'} // 同一个弹窗，标题跟着模式变
        open={open}
        okText="保存"
        cancelText="取消"
        onOk={submit}
        onCancel={() => setOpen(false)}
        getContainer={false} // 关键：渲染在上面这个 div 里，不要挂到 body 上盖住整站
      >
        <Form form={form} layout="vertical" initialValues={{ role: 'user' }}>
          {/* rules 是 antd 的声明式校验，required 表示必填 */}
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '姓名不能为空' }]}>
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item name="role" label="角色">
            <Select options={[{ value: 'admin', label: '管理员' }, { value: 'user', label: '普通用户' }]} />
          </Form.Item>
        </Form>
      </Modal>

      <p style={{ marginTop: 12, fontSize: 13, color: '#5c6b63', lineHeight: 1.7 }}>
        试试点「新增用户」但把姓名留空直接保存 —— 会被 rules 拦住；再点某一行的「编辑」看数据回填
      </p>
    </div>
  )
}`,
  },
  {
    id: 'p9-login-form',
    title: '登录表单：校验 + loading + 切换',
    group: '17-React实战案例',
    summary: '错误提示挂在输入框下方，登录成功后整个界面换一套',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

export default function Demo() {
  const [name, setName] = useState('') // 用户名输入框的值
  const [pwd, setPwd] = useState('') // 密码输入框的值
  const [errs, setErrs] = useState({}) // 错误集合，形如 { name: '请输入用户名' }
  const [loading, setLoading] = useState(false) // 请求进行中 → 按钮禁用并改文案
  const [user, setUser] = useState(null) // 登录成功后记住的用户，null = 未登录

  // 校验函数：返回「字段名 → 错误文案」的对象，一个都没错就是空对象
  function validate() {
    const e = {}
    if (!name.trim()) e.name = '请输入用户名'
    if (!pwd) e.pwd = '请输入密码'
    else if (pwd.length < 6) e.pwd = '密码至少 6 位'
    return e
  }

  function submit() {
    const e = validate()
    setErrs(e) // 先把错误显示到界面上
    if (Object.keys(e).length > 0) return // 有错就不继续提交
    setLoading(true) // 进入加载态

    // 模拟接口：真实项目这里是 fetch('/api/login')，用 setTimeout 假装 1 秒网络延迟
    setTimeout(() => {
      setLoading(false) // 不管成功失败都要关掉 loading，否则按钮永远转圈
      if (name === 'admin' && pwd === '123456') {
        setUser(name) // 成功 → 存下用户，界面自动切换（下面的 if (user) 会命中）
      } else {
        setErrs({ pwd: '用户名或密码错误（正确的是 admin / 123456）' })
      }
    }, 1000)
  }

  // 已登录就直接 return 另一套界面 —— 这叫「提前返回式的条件渲染」，比嵌套三目清楚得多
  if (user) {
    return (
      <div style={wrap}>
        <p style={{ margin: '0 0 14px', fontSize: 18 }}>欢迎回来，{user}</p>
        <button
          onClick={() => { setUser(null); setPwd(''); setErrs({}) }} // 退出 = 把相关 state 清回初始值
          style={btn}
        >
          退出登录
        </button>
        <p style={hint}>点「退出登录」会回到表单，密码被清空、用户名还留着</p>
      </div>
    )
  }

  return (
    <div style={wrap}>
      <h3 style={{ margin: '0 0 16px', fontSize: 16 }}>登录</h3>

      <label style={label}>用户名</label>
      <input
        value={name}
        onChange={(e) => { setName(e.target.value); setErrs((p) => ({ ...p, name: '' })) }} // 一边打字一边清掉旧错误
        placeholder="admin"
        style={{ ...input, border: '1px solid ' + (errs.name ? '#c53030' : '#e2e9e4') }} // 出错时边框变红
      />
      {/* && 写法：左边为真才渲染右边，是「有错才显示」的标准套路 */}
      {errs.name && <p style={errText}>{errs.name}</p>}

      <label style={label}>密码</label>
      <input
        type="password"
        value={pwd}
        onChange={(e) => { setPwd(e.target.value); setErrs((p) => ({ ...p, pwd: '' })) }}
        onKeyDown={(e) => e.key === 'Enter' && submit()} // 密码框回车直接提交
        placeholder="123456"
        style={{ ...input, border: '1px solid ' + (errs.pwd ? '#c53030' : '#e2e9e4') }}
      />
      {errs.pwd && <p style={errText}>{errs.pwd}</p>}

      <button
        onClick={submit}
        disabled={loading} // 禁用能防止用户狂点导致发好几次请求
        style={{ ...btn, marginTop: 16, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        {loading ? '登录中…' : '登录'} {/* 按钮文案也跟着 loading 走 */}
      </button>

      <p style={hint}>
        试试三件事：① 什么都不填直接点登录；② 密码填 123；③ 用 admin / 123456 登录成功
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', background: '#f7faf8', color: '#1f2a24', maxWidth: 320 }
const label = { display: 'block', marginBottom: 5, fontSize: 13, color: '#5c6b63' }
const input = { width: '100%', padding: '7px 10px', fontSize: 14, border: '1px solid #e2e9e4', borderRadius: 6, marginBottom: 4, boxSizing: 'border-box' }
const errText = { margin: '0 0 10px', fontSize: 12, color: '#c53030' }
const btn = { padding: '8px 18px', fontSize: 14, border: '1px solid #2f6b4f', borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer' }
const hint = { marginTop: 16, fontSize: 13, color: '#5c6b63', lineHeight: 1.7 }`,
  },
  {
    id: 'p9-mini-router',
    title: '迷你路由：四个页面来回切',
    group: '17-React实战案例',
    summary: '一个 state 就是一套路由，列表点进详情还能带参数返回',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

// 假装这是接口返回的文章列表
const POSTS = [
  { id: 1, title: 'React 是怎么更新界面的', body: '数据变了就重新执行组件函数，React 比对差异后只改动真正变化的那部分 DOM。' },
  { id: 2, title: 'useState 到底存在哪', body: 'React 按调用顺序把状态记在组件实例上，所以钩子不能写在 if 或循环里。' },
  { id: 3, title: '为什么不能直接改数组', body: 'push 不会产生新引用，React 认为「没变」，界面自然不会重画。' },
]

export default function Demo() {
  // 「现在在哪一页」就是一个普通 state —— 这就是最朴素的路由
  // 真实项目里这份活由 react-router-dom 的 Routes + useNavigate 来干
  const [page, setPage] = useState('home')
  // 页面参数（这里是文章 id）。真实项目里用 useParams 从地址里读出来
  const [postId, setPostId] = useState(null)

  // 跳转函数：真实项目里等价于 const navigate = useNavigate() 之后调 navigate('/list')
  // 注意全程不动浏览器地址栏，不然会把整个教学站的路径给改掉
  function go(next, id = null) {
    setPage(next)
    setPostId(id)
  }

  const post = POSTS.find((p) => p.id === postId) // 用参数反查数据，相当于详情页拿到 id 后去调接口

  return (
    <div style={wrap}>
      {/* 导航栏用 button 而不是带 # 锚点的 a 标签，后者会改浏览器地址栏 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {[['home', '首页'], ['list', '列表'], ['about', '关于']].map(([k, text]) => (
          <button key={k} onClick={() => go(k)} style={page === k ? tabOn : tab}>{text}</button>
        ))}
      </div>

      <div style={panel}>
        {/* 下面这一串条件渲染，就是 Routes 里一堆 Route 的手写版 */}
        {page === 'home' && (
          <div>
            <h4 style={h4}>首页</h4>
            <p style={p}>这是一个不碰地址栏的「假路由」：切换页面只靠一个 state。</p>
            <button onClick={() => go('list')} style={btn}>去看文章列表</button>
          </div>
        )}

        {page === 'list' && (
          <div>
            <h4 style={h4}>文章列表</h4>
            {POSTS.map((it) => (
              // 点某一项时把 id 一起传过去，这就是「带参数跳转」
              <div key={it.id} onClick={() => go('detail', it.id)} style={item}>
                <span style={{ flex: 1 }}>{it.title}</span>
                <span style={{ color: '#5c6b63' }}>查看 ›</span>
              </div>
            ))}
          </div>
        )}

        {/* 详情页要判断 post 存在再渲染，否则参数丢了会读到 undefined 报错 */}
        {page === 'detail' && post && (
          <div>
            <button onClick={() => go('list')} style={tab}>‹ 返回列表</button>
            <h4 style={{ ...h4, marginTop: 12 }}>{post.title}</h4>
            <p style={p}>{post.body}</p>
            <p style={{ margin: 0, fontSize: 12, color: '#5c6b63' }}>
              当前参数 id = {post.id}（真实项目里这个值来自 useParams）
            </p>
          </div>
        )}

        {page === 'about' && (
          <div>
            <h4 style={h4}>关于</h4>
            <p style={p}>页面切换的本质：不同的 state 值渲染出不同的 JSX，换 DOM 的脏活 React 帮你干。</p>
          </div>
        )}
      </div>

      <p style={hint}>
        试试点「列表」→ 任选一篇进详情 → 点返回。全程浏览器地址栏一动不动，
        因为「当前页面」只是组件里的一个变量
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', background: '#f7faf8', color: '#1f2a24' }
const panel = { padding: 16, background: '#fff', border: '1px solid #e2e9e4', borderRadius: 10, minHeight: 150 }
const h4 = { margin: '0 0 8px', fontSize: 15, color: '#2f6b4f' }
const p = { margin: '0 0 12px', fontSize: 13, lineHeight: 1.8 }
const item = { display: 'flex', padding: '8px 10px', marginBottom: 6, border: '1px solid #e2e9e4', borderRadius: 6, fontSize: 13, cursor: 'pointer' }
const tab = { padding: '5px 12px', fontSize: 13, border: '1px solid #e2e9e4', borderRadius: 6, background: '#fff', color: '#1f2a24', cursor: 'pointer' }
const tabOn = { ...tab, background: '#2f6b4f', border: '1px solid #2f6b4f', color: '#fff' }
const btn = { padding: '6px 14px', fontSize: 13, border: '1px solid #2f6b4f', borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer' }
const hint = { marginTop: 14, fontSize: 13, color: '#5c6b63', lineHeight: 1.7 }`,
  },
  {
    id: 'p9-tab-lazy',
    title: 'Tab 懒加载 + 结果缓存',
    group: '17-React实战案例',
    summary: '第一次点开才请求，切回来直接用缓存，界面上数给你看',
    runtime: 'react',
    language: 'tsx',
    code: `import { useEffect, useState } from 'react'

const TABS = [
  { key: 'hot', label: '热门' },
  { key: 'new', label: '最新' },
  { key: 'mine', label: '我的' },
]

// 模拟接口：0.8 秒后返回这个 tab 的三条数据
// 真实项目里换成 fetch('/api/list?tab=' + key).then((r) => r.json())
function fetchTab(key) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([key + ' · 内容 A', key + ' · 内容 B', key + ' · 内容 C']), 800)
  })
}

export default function Demo() {
  const [active, setActive] = useState('hot') // 当前选中哪个 tab
  const [cache, setCache] = useState({}) // 缓存对象，形如 { hot: [...], new: [...] }
  const [loading, setLoading] = useState(false) // 是否正在请求
  const [counts, setCounts] = useState({}) // 每个 tab 真正发起过几次请求，用来证明缓存生效

  async function switchTo(key) {
    setActive(key) // 先切界面，用户感觉更快
    if (cache[key]) return // 命中缓存 → 直接返回，一次请求都不发
    setLoading(true)
    const data = await fetchTab(key) // 等接口回来
    setCache((prev) => ({ ...prev, [key]: data })) // 存进缓存（展开旧对象再加新 key，不能改旧的）
    setCounts((prev) => ({ ...prev, [key]: (prev[key] || 0) + 1 })) // 请求次数 +1
    setLoading(false)
  }

  // 首次挂载时自动加载第一个 tab。依赖数组是空的 → 整个生命周期只跑一次
  useEffect(() => {
    switchTo('hot')
  }, [])

  const list = cache[active] // 当前 tab 的数据，可能还没有（undefined）

  return (
    <div style={wrap}>
      <div style={{ display: 'flex', gap: 8, borderBottom: '1px solid #e2e9e4', paddingBottom: 10 }}>
        {TABS.map((t) => (
          <button key={t.key} onClick={() => switchTo(t.key)} style={active === t.key ? tabOn : tab}>
            {t.label}
            {/* 显示这个 tab 请求过几次：切来切去它都不会涨到 2 */}
            <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.75 }}>请求 {counts[t.key] || 0} 次</span>
          </button>
        ))}
      </div>

      <div style={panel}>
        {/* 异步界面至少要处理三种状态：加载中 / 有数据 / 还没数据。真实项目还得加一个「出错了」 */}
        {loading && <p style={{ margin: 0, fontSize: 13, color: '#5c6b63' }}>正在加载「{active}」的数据…</p>}
        {!loading && list && list.map((it) => <div key={it} style={item}>{it}</div>)}
        {!loading && !list && <p style={{ margin: 0, fontSize: 13, color: '#5c6b63' }}>这个 tab 还没加载过</p>}
      </div>

      <p style={hint}>
        试试点「最新」（等 0.8 秒）→ 点「我的」→ 再点回「最新」：
        第二次是瞬间出来的，而且「请求 N 次」还停在 1，说明读的是缓存不是接口。
        <br />
        想看重复请求的样子？把 switchTo 里那行 if (cache[key]) return 注释掉再试。
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', background: '#f7faf8', color: '#1f2a24' }
const panel = { marginTop: 12, padding: 16, minHeight: 120, background: '#fff', border: '1px solid #e2e9e4', borderRadius: 10 }
const item = { padding: '8px 10px', marginBottom: 6, border: '1px solid #e2e9e4', borderRadius: 6, fontSize: 13 }
const tab = { padding: '5px 12px', fontSize: 13, border: '1px solid #e2e9e4', borderRadius: 6, background: '#fff', color: '#1f2a24', cursor: 'pointer' }
const tabOn = { ...tab, background: '#2f6b4f', border: '1px solid #2f6b4f', color: '#fff' }
const hint = { marginTop: 14, fontSize: 13, color: '#5c6b63', lineHeight: 1.7 }`,
  },
  {
    id: 'p9-modal-drawer',
    title: '弹窗与抽屉：手写 vs 现成',
    group: '17-React实战案例',
    summary: '自己写一个遮罩弹窗（点遮罩 / 按 ESC 关），再对比 antd Drawer',
    runtime: 'react',
    language: 'tsx',
    code: `import { useEffect, useState } from 'react'
import { Button, Drawer } from 'antd'

export default function Demo() {
  const [open, setOpen] = useState(false) // 手写弹窗的开关
  const [drawer, setDrawer] = useState(false) // antd 抽屉的开关

  // 按 ESC 关弹窗：这类「全局键盘监听」必须自己挂、自己收
  useEffect(() => {
    if (!open) return // 弹窗没开就不用监听，省一次绑定
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false) // 只关心 ESC 这一个键
    }
    window.addEventListener('keydown', onKey) // 挂上监听
    // 返回的函数叫「清理函数」：弹窗关闭或组件卸载时 React 会自动调用它
    // 少写这一行，切走这个 demo 后监听还赖在页面上，是内存泄漏最常见的来源
    return () => window.removeEventListener('keydown', onKey)
  }, [open]) // open 每次变化都会先清理旧的、再挂新的

  return (
    // 外层设 position: 'relative'，下面的遮罩用 absolute 就只盖住这一块区域
    // 一定不要用 fixed 定位，那会盖住整个网站，连关闭按钮都点不着
    <div style={{ ...wrap, position: 'relative', minHeight: 280, overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={() => setOpen(true)} style={btn}>打开手写弹窗</button>
        <Button onClick={() => setDrawer(true)}>打开 antd 抽屉</Button>
      </div>

      <p style={{ ...p, marginTop: 14 }}>
        弹窗的本质就是「一个布尔值控制一段 JSX 显不显示」，没有任何魔法。
        难点全在细节上：遮罩点击、ESC、滚动锁定、焦点管理。
      </p>

      {/* open 为 false 时，这段 JSX 压根不会出现在页面上 */}
      {open && (
        <div onClick={() => setOpen(false)} style={mask}>
          {/* stopPropagation 阻止冒泡：不然点弹窗内部也会冒泡到遮罩上，导致刚点就关 */}
          <div onClick={(e) => e.stopPropagation()} style={dialog}>
            <h4 style={{ margin: '0 0 8px', fontSize: 15, color: '#2f6b4f' }}>我是手写弹窗</h4>
            {/* 内容区就是普通 JSX，想放什么放什么；组件化之后这里会做成 children */}
            <p style={{ ...p, margin: '0 0 14px' }}>三种关法都有效：点灰色遮罩、按 ESC、点下面的按钮。</p>
            <button onClick={() => setOpen(false)} style={btn}>知道了</button>
          </div>
        </div>
      )}

      {/* antd 的现成组件：getContainer={false} 让它渲染在当前容器里，而不是挂到 body 上 */}
      <Drawer
        title="antd Drawer"
        open={drawer}
        onClose={() => setDrawer(false)}
        getContainer={false} // 不加这行会盖住整个教学站
        size="default" // 抽屉宽度用 size 控制（新版 antd 已不推荐用 width）
      >
        <p style={p}>现成组件已经把遮罩、ESC、动画、焦点都处理好了，日常开发优先用它。</p>
        <p style={p}>手写一遍的意义在于：知道它内部就这么点东西，遇到坑能自己修。</p>
      </Drawer>

      <p style={hint}>
        试试打开手写弹窗后按一下 ESC 键；也可以把 dialog 的 width 从 300 改成 200 看弹窗变窄
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', background: '#f7faf8', color: '#1f2a24' }
const p = { margin: '0 0 8px', fontSize: 13, lineHeight: 1.8 }
const btn = { padding: '6px 14px', fontSize: 13, border: '1px solid #2f6b4f', borderRadius: 6, background: '#2f6b4f', color: '#fff', cursor: 'pointer' }
// 遮罩：absolute + inset:0 铺满「外层那个 relative 容器」，而不是铺满整个屏幕
const mask = {
  position: 'absolute',
  inset: 0, // 等价于 top / right / bottom / left 全部为 0
  background: 'rgba(31,42,36,0.45)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
const dialog = { width: 300, padding: 18, background: '#fff', border: '1px solid #e2e9e4', borderRadius: 10 }
const hint = { marginTop: 14, fontSize: 13, color: '#5c6b63', lineHeight: 1.7 }`,
  },
  {
    id: 'p9-step-form',
    title: '分步表单：三步走 + 逐步校验',
    group: '17-React实战案例',
    summary: '填资料 → 选套餐 → 确认提交，每步不填完不让往下走',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'
import { Button, Input, Radio, Steps } from 'antd'

const PLANS = [
  { value: 'free', label: '免费版 · ¥0 / 月' },
  { value: 'pro', label: '专业版 · ¥29 / 月' },
]

export default function Demo() {
  const [step, setStep] = useState(0) // 当前第几步，从 0 开始
  // 三步共用同一份数据：这样来回切步骤时填过的内容都还在
  const [data, setData] = useState({ name: '', phone: '', plan: '' })
  const [err, setErr] = useState('') // 校验没通过时的提示
  const [done, setDone] = useState(false) // 是否已提交完成

  // 只改其中一个字段：展开旧对象，再覆盖那一个 key
  const set = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }))
    setErr('') // 用户一动手就把旧错误清掉
  }

  // 当前这一步的校验规则：返回错误文案，空字符串代表通过
  function checkStep() {
    if (step === 0) {
      if (!data.name.trim()) return '请填写姓名'
      if (data.phone.trim().length !== 11) return '手机号要 11 位'
    }
    if (step === 1 && !data.plan) return '请选一个套餐'
    return ''
  }

  function next() {
    const msg = checkStep()
    if (msg) {
      setErr(msg) // 校验不通过 → 显示错误并卡在当前步
      return
    }
    setStep((s) => s + 1) // 通过了才 +1
  }

  // 提交成功后换一套界面，同时给一个「再来一次」把所有 state 复位
  if (done) {
    return (
      <div style={wrap}>
        <p style={{ margin: '0 0 10px', fontSize: 16, color: '#2f6b4f' }}>提交成功</p>
        <p style={p}>{data.name} / {data.phone} / {data.plan === 'pro' ? '专业版' : '免费版'}</p>
        <Button onClick={() => { setDone(false); setStep(0); setData({ name: '', phone: '', plan: '' }) }}>
          再来一次
        </Button>
      </div>
    )
  }

  return (
    <div style={wrap}>
      {/* Steps 只负责「画进度条」，current 指向第几步完全由我们的 state 说了算 */}
      <Steps size="small" current={step} items={[{ title: '填资料' }, { title: '选套餐' }, { title: '确认提交' }]} />

      <div style={panel}>
        {step === 0 && (
          <div style={{ display: 'grid', gap: 10, maxWidth: 260 }}>
            {/* 受控输入：value 从 data 里来，onChange 再写回 data */}
            <Input value={data.name} onChange={(e) => set('name', e.target.value)} placeholder="姓名" />
            <Input value={data.phone} onChange={(e) => set('phone', e.target.value)} placeholder="手机号，11 位" />
          </div>
        )}

        {step === 1 && (
          // 单选组的值也存进同一份 data，所以退回上一步再进来选中项还在
          <Radio.Group value={data.plan} onChange={(e) => set('plan', e.target.value)}>
            {PLANS.map((it) => (
              <Radio key={it.value} value={it.value} style={{ display: 'block', marginBottom: 10 }}>{it.label}</Radio>
            ))}
          </Radio.Group>
        )}

        {step === 2 && (
          <div>
            <h4 style={h4}>请核对信息</h4>
            {/* 汇总展示：因为前两步的数据一直在同一个 state 里，这里随时取得到 */}
            <p style={p}>姓名：{data.name}</p>
            <p style={p}>手机号：{data.phone}</p>
            <p style={p}>套餐：{data.plan === 'pro' ? '专业版（¥29 / 月）' : '免费版（¥0）'}</p>
          </div>
        )}

        {err && <p style={errText}>{err}</p>}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
        {/* 第一步没有「上一步」，用 disabled 而不是藏起来，按钮位置才不会跳 */}
        <Button disabled={step === 0} onClick={() => { setErr(''); setStep((s) => s - 1) }}>上一步</Button>
        {step < 2 && <Button type="primary" onClick={next}>下一步</Button>}
        {step === 2 && <Button type="primary" onClick={() => setDone(true)}>确认提交</Button>}
      </div>

      <p style={hint}>
        试试第一步什么都不填直接点「下一步」，会被拦住；填好走到第三步能看到前两步的汇总
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', background: '#f7faf8', color: '#1f2a24' }
const panel = { marginTop: 18, padding: 16, minHeight: 130, background: '#fff', border: '1px solid #e2e9e4', borderRadius: 10 }
const h4 = { margin: '0 0 10px', fontSize: 14, color: '#2f6b4f' }
const p = { margin: '0 0 6px', fontSize: 13, lineHeight: 1.8 }
const errText = { margin: '12px 0 0', fontSize: 12, color: '#c53030' }
const hint = { marginTop: 14, fontSize: 13, color: '#5c6b63', lineHeight: 1.7 }`,
  },
  {
    id: 'p9-list-filter',
    title: '列表页三件套：搜索 + 筛选 + 排序',
    group: '17-React实战案例',
    summary: '三个条件叠加生效，用 useMemo 缓存计算结果',
    runtime: 'react',
    language: 'tsx',
    code: `import { useMemo, useState } from 'react'
import { Empty, Input, Select, Tag } from 'antd'

// 一份本地数据。真实项目里通常是接口返回，筛选排序也可能整个交给后端做
const GOODS = [
  { id: 1, name: '机械键盘', cat: '外设', price: 299, sales: 120 },
  { id: 2, name: '无线鼠标', cat: '外设', price: 129, sales: 380 },
  { id: 3, name: '人体工学椅', cat: '家具', price: 899, sales: 45 },
  { id: 4, name: '升降桌', cat: '家具', price: 1299, sales: 30 },
  { id: 5, name: '显示器支架', cat: '家具', price: 159, sales: 210 },
  { id: 6, name: '降噪耳机', cat: '数码', price: 499, sales: 260 },
  { id: 7, name: '固态硬盘', cat: '数码', price: 359, sales: 175 },
  { id: 8, name: '扩展坞', cat: '数码', price: 219, sales: 95 },
  { id: 9, name: '键盘手托', cat: '外设', price: 59, sales: 430 },
  { id: 10, name: '桌面台灯', cat: '家具', price: 189, sales: 150 },
  { id: 11, name: '摄像头', cat: '数码', price: 279, sales: 68 },
  { id: 12, name: '鼠标垫', cat: '外设', price: 39, sales: 520 },
]

const CATS = [
  { value: 'all', label: '全部分类' },
  { value: '外设', label: '外设' },
  { value: '家具', label: '家具' },
  { value: '数码', label: '数码' },
]

export default function Demo() {
  const [kw, setKw] = useState('') // 搜索关键字
  const [cat, setCat] = useState('all') // 选中的分类
  const [sort, setSort] = useState('default') // 排序方式

  // useMemo：只有 kw / cat / sort 里有东西变了才重新算一遍。
  // 不加它的话，组件因为别的原因重渲染时，这段过滤 + 排序也会白算一次；
  // 数据量一大（几千条）就会明显卡手。
  const list = useMemo(() => {
    const key = kw.trim().toLowerCase() // 统一小写，搜索时不区分大小写
    let result = GOODS.filter((g) => {
      const hitKw = !key || g.name.toLowerCase().includes(key) // 关键字为空 = 这个条件不参与过滤
      const hitCat = cat === 'all' || g.cat === cat // all 表示不限分类
      return hitKw && hitCat // 两个条件都要满足 —— 这就是「条件叠加」
    })
    // sort 会「原地」改数组，所以先复制一份再排，养成不改原数据的习惯
    if (sort === 'priceAsc') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'priceDesc') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'sales') result = [...result].sort((a, b) => b.sales - a.sales)
    return result
  }, [kw, cat, sort])

  return (
    <div style={wrap}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {/* 三个筛选控件各自绑一个 state，改任意一个都会触发上面重新计算 */}
        <Input value={kw} onChange={(e) => setKw(e.target.value)} placeholder="搜商品名，比如「键」" style={{ width: 180 }} allowClear />
        <Select value={cat} onChange={setCat} options={CATS} style={{ width: 130 }} />
        <Select
          value={sort}
          onChange={setSort}
          style={{ width: 150 }}
          options={[
            { value: 'default', label: '默认排序' },
            { value: 'priceAsc', label: '价格从低到高' },
            { value: 'priceDesc', label: '价格从高到低' },
            { value: 'sales', label: '销量优先' },
          ]}
        />
      </div>

      {/* 实时结果数：直接读 list.length，永远不会和列表对不上 */}
      <p style={{ margin: '12px 0 8px', fontSize: 13, color: '#5c6b63' }}>共 {list.length} 条结果</p>

      {/* 无结果时给个空状态，比一片空白友好得多 */}
      {list.length === 0 ? (
        <Empty description="没有符合条件的商品，换个关键字试试" />
      ) : (
        list.map((g) => (
          <div key={g.id} style={row}>
            <span style={{ flex: 1 }}>{g.name}</span>
            <Tag>{g.cat}</Tag>
            <span style={{ width: 70, textAlign: 'right', color: '#c53030' }}>¥{g.price}</span>
            <span style={{ width: 84, textAlign: 'right', color: '#5c6b63', fontSize: 12 }}>销量 {g.sales}</span>
          </div>
        ))
      )}

      <p style={hint}>
        试试搜「键」再把分类切到「外设」，再按「销量优先」排 —— 三个条件是叠加生效的。
        搜个「abc」还能看到空状态。
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', background: '#f7faf8', color: '#1f2a24' }
const row = { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', marginBottom: 6, background: '#fff', border: '1px solid #e2e9e4', borderRadius: 6, fontSize: 13 }
const hint = { marginTop: 14, fontSize: 13, color: '#5c6b63', lineHeight: 1.7 }`,
  },
  {
    id: 'p9-drag-sort',
    title: '拖拽排序：三个事件搞定重排',
    group: '17-React实战案例',
    summary: 'draggable + DragStart / DragOver / Drop，带半透明和插入线',
    runtime: 'react',
    language: 'tsx',
    code: `import { useState } from 'react'

export default function Demo() {
  // 列表数据。拖拽的结果就是「把这个数组重新排一遍」，界面自然跟着变
  const [items, setItems] = useState(['需求评审', '接口约定', '写页面', '联调测试', '发布上线'])
  const [dragIdx, setDragIdx] = useState(null) // 正在被拖的那一项的下标
  const [overIdx, setOverIdx] = useState(null) // 鼠标当前悬停在哪一项上

  // ① onDragStart：按住并开始拖的那一瞬间触发一次，用来记住「拖的是谁」
  function onDragStart(index) {
    setDragIdx(index)
  }

  // ② onDragOver：拖着经过某一项时「持续」触发（每几十毫秒一次）
  // 必须调 preventDefault，否则浏览器默认「这里不能放」，onDrop 永远不会触发
  function onDragOver(e, index) {
    e.preventDefault()
    if (index !== overIdx) setOverIdx(index) // 记下插入位置，用来画那条绿色高亮线
  }

  // ③ onDrop：松手放下时触发一次，这才是真正做数组重排的地方
  function onDrop(index) {
    if (dragIdx === null || dragIdx === index) {
      reset() // 没在拖，或者原地放下，什么都不用做
      return
    }
    setItems((prev) => {
      const next = [...prev] // 先复制一份，绝不直接改 state 里的那个数组
      const [moved] = next.splice(dragIdx, 1) // 把被拖的那一项抽出来（splice 返回被删元素的数组）
      next.splice(index, 0, moved) // 再插到目标位置，第二个参数 0 表示「只插不删」
      return next
    })
    reset()
  }

  // 拖拽结束后把临时状态清空，否则半透明和高亮线会一直留着
  const reset = () => {
    setDragIdx(null)
    setOverIdx(null)
  }

  return (
    <div style={wrap}>
      <h4 style={h4}>开发流程（按住任意一行上下拖）</h4>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((it, i) => (
          <li
            key={it} // 这里用内容当 key：内容唯一且拖动后不变，React 就能正确复用节点
            draggable // 加上这一个属性，元素就能被拖动了，是 HTML5 原生能力
            onDragStart={() => onDragStart(i)}
            onDragOver={(e) => onDragOver(e, i)}
            onDrop={() => onDrop(i)}
            onDragEnd={reset} // 拖到界外松手也要清理，不然状态会卡住
            style={{
              ...row,
              opacity: dragIdx === i ? 0.35 : 1, // 视觉反馈一：被拖的那项半透明，表示「它正被搬走」
              // 视觉反馈二：悬停目标的上边缘画一条绿线，提示「会插到这儿」
              borderTop: overIdx === i && dragIdx !== i ? '3px solid #2f6b4f' : '3px solid transparent',
            }}
          >
            <span style={{ width: 22, color: '#5c6b63' }}>{i + 1}</span>
            <span style={{ flex: 1 }}>{it}</span>
            <span style={{ fontSize: 12, color: '#5c6b63' }}>按住拖动</span>
          </li>
        ))}
      </ul>

      {/* 把当前顺序打印出来，证明变的是数据而不是 DOM */}
      <p style={{ marginTop: 12, fontSize: 12, color: '#5c6b63' }}>当前顺序：{items.join(' → ')}</p>

      <p style={hint}>
        试试把「发布上线」拖到最上面：拖动时它变淡、目标位置出现绿线，松手后数组顺序真的改了。
        三个事件的分工是：DragStart 记起点（一次）、DragOver 跟踪位置（很多次）、Drop 落地重排（一次）。
      </p>
    </div>
  )
}

const wrap = { padding: 20, fontFamily: 'system-ui', background: '#f7faf8', color: '#1f2a24' }
const h4 = { margin: '0 0 12px', fontSize: 14, color: '#2f6b4f' }
const row = { display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', marginBottom: 6, background: '#fff', border: '1px solid #e2e9e4', borderRadius: 6, fontSize: 14, cursor: 'grab', userSelect: 'none' }
const hint = { marginTop: 12, fontSize: 13, color: '#5c6b63', lineHeight: 1.7 }`,
  },
]

export default part9
