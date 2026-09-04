/**
 * 第 2 章：JSX
 * 目标：能熟练在组件里写 JSX，知道花括号、属性、Fragment 的正确用法
 */
const jsx = {
  id: 'jsx',
  title: 'JSX 语法精讲',
  summary: '在 JS 里写界面：根节点、Fragment、花括号表达式、className、style——每个都有完整 Demo',
  order: 4,
  items: [
    {
      id: 'jsx-basics',
      title: 'JSX 完整写法：根节点、Fragment、标签闭合、注释',
      summary: 'JSX = 在 JS 里写类似 HTML 的标签；必须有一个根；Fragment 避免多余 div；所有标签必须闭合',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'JSX = JavaScript XML，让你在 .js/.jsx 文件里写界面。组件 return 的必须是一个根节点（或用 <> 包起来），所有标签必须闭合。',
          },
          {
            type: 'text',
            title: '1）JSX 是什么？',
            body: 'JSX 是 React 提供的一种语法扩展，让你在 JavaScript 文件里写「看起来像 HTML」的标签。它不是 HTML，也不是字符串——它是 JavaScript 表达式。\n\nBabel（CRA 已内置）会把 JSX 编译成普通 JavaScript 调用。例如 <div>你好</div> 会被编译成 React.createElement("div", null, "你好")。日常开发你直接写 JSX，不必手写 createElement。\n\nJSX 只能出现在两个地方：① 组件 return 后面；② 花括号 {} 表达式里（后面详讲）。不能在普通 JS 语句里随便写标签（比如 if 块中间、函数体顶层不带 return 的地方）。',
          },
          {
            type: 'text',
            title: '2）JSX 和 HTML 有什么关系？有什么不同？',
            body: '看起来像：标签名、嵌套结构、属性写法都和 HTML 相似，有 HTML 基础会更快上手。\n\n本质不同：JSX 是 JavaScript，要遵循 JS 规则。class 要写成 className（class 是 JS 保留字）；for 要写成 htmlFor；style 必须是对象而不是字符串；所有标签必须闭合（包括 <img />、<br />）；属性名用驼峰（onClick 不是 onclick）。\n\n编译后：JSX 不会直接进浏览器，Babel 先编译成 createElement 调用，Webpack 再打包。所以你写的 .js 文件里可以有 JSX，是因为 CRA 帮你配好了 Babel。',
          },
          {
            type: 'table',
            title: '3）JSX vs HTML 关键差异对照表',
            headers: ['写法', 'HTML', 'JSX', '原因'],
            rows: [
              ['类名', 'class="btn"', 'className="btn"', 'class 是 JS 保留字'],
              ['label 关联', 'for="email"', 'htmlFor="email"', 'for 是 JS 保留字'],
              ['行内样式', 'style="color:red"', 'style={{ color: "red" }}', 'style 接收 JS 对象'],
              ['事件', 'onclick="..."', 'onClick={handler}', '驼峰 + 传函数不是字符串'],
              ['自闭合', '<img>、<br>', '<img />、<br />', 'JSX 要求所有标签闭合'],
              ['注释', '<!-- 注释 -->', '{/* 注释 */}', 'JSX 里不能用 HTML 注释'],
              ['属性值', '都是字符串', '字符串可省略 {}，其它用 {}', 'JS 表达式需要花括号'],
            ],
          },
          {
            type: 'text',
            title: '4）规则一：组件必须 return 且只能有一个根节点',
            body: '函数组件的 return 后面只能有一个「顶层元素」。如果你写了两个并列的 <h1> 和 <p>，编译器会报错：Adjacent JSX elements must be wrapped in an enclosing tag。\n\n为什么？因为 return 只能返回一个值。两个并列标签相当于返回两个值，JS 语法不允许。\n\n解决办法：用 <div> 包一层（最简单），或用 Fragment（<>...</>，不增加多余 DOM 节点）。也可以 return null 表示「什么都不渲染」。',
          },
          {
            type: 'code',
            title: '完整 Demo：根节点三种写法（复制运行对照）',
            language: 'jsx',
            body: `// ===== 写法 1：单个根元素（最简单）=====
function Hello() {
  return <h1>你好，React</h1>
}

// ===== 写法 2：div 包裹多个子元素 =====
function Article() {
  return (
    <div className="article">
      <h1>文章标题</h1>
      <p>第一段正文。</p>
      <p>第二段正文。</p>
    </div>
  )
}

// ===== 写法 3：Fragment 短语法（不增加多余 DOM 节点）=====
function ArticleWithFragment() {
  return (
    <>
      <h1>文章标题</h1>
      <p>第一段正文。</p>
      <p>第二段正文。</p>
    </>
  )
}

// ===== 返回 null：表示「什么都不渲染」=====
function Empty() {
  return null
}

// ===== ❌ 错误：两个并列根节点，编译直接报错 =====
function Bad() {
  return (
    <h1>标题</h1>
    <p>正文</p>
  )
}

// ===== App.js 里测试 =====
function App() {
  return (
    <div style={{ padding: 20 }}>
      <Hello />
      <Article />
      <ArticleWithFragment />
    </div>
  )
}

export default App`,
          },
          {
            type: 'text',
            title: '5）Fragment 是什么？什么时候用？',
            body: 'Fragment 是 React 提供的一个「透明容器」——它把多个子元素包在一起满足「单一根节点」规则，但不会在真实 DOM 里多出一个 div。\n\n什么时候用 div 包一层没问题？大多数情况 div 包一层完全 OK，不影响功能和样式。什么时候必须用 Fragment？① 不想破坏 CSS 布局（比如 flex/grid 的直接子元素数量有要求）。② HTML 语义要求（比如 <dl> 里只能有 <dt>/<dd>，不能插 div）。③ 表格结构（tr 里不能套 div）。\n\n短语法 <>...</> 最常用。但在 map 循环里 Fragment 需要 key 时，必须用完整写法 <Fragment key={...}>，短语法 <> 不能写 key 属性。',
          },
          {
            type: 'code',
            title: 'Fragment 完整 Demo：含 map + key 场景',
            language: 'jsx',
            body: `import { Fragment } from 'react'

// 场景：渲染「定义列表」，每项有 dt + dd 两个标签，不想外面套 div
const glossary = [
  { id: 'jsx', term: 'JSX', def: '在 JS 里写界面语法' },
  { id: 'props', term: 'Props', def: '父组件传给子组件的数据' },
  { id: 'state', term: 'State', def: '组件内部可变的数据' },
]

function Glossary() {
  return (
    <dl>
      {glossary.map((item) => (
        // map 里 Fragment 需要 key → 必须用完整写法
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.def}</dd>
        </Fragment>
      ))}
    </dl>
  )
}

// 对比：如果不用 Fragment，只能套 div，语义不对
function GlossaryWithDiv() {
  return (
    <dl>
      {glossary.map((item) => (
        <div key={item.id}>  {/* ❌ div 在 dl 里语义不对 */}
          <dt>{item.term}</dt>
          <dd>{item.def}</dd>
        </div>
      ))}
    </dl>
  )
}`,
          },
          {
            type: 'text',
            title: '6）规则二：所有标签必须闭合',
            body: 'HTML 里 <img>、<br>、<input> 可以不写结束标签（void elements）。JSX 里必须自闭合：<img />、<br />、<input />。\n\n自定义组件也一样：<Button></Button> 或 <Button /> 都可以，但不能只写 <Button> 没有闭合。\n\n漏写 / 会报语法错误：Expected corresponding JSX closing tag。养成习惯：写开始标签时就决定是成对闭合还是自闭合。',
          },
          {
            type: 'code',
            title: '标签闭合对照 + 完整表单片段',
            language: 'jsx',
            body: `function FormSnippet() {
  return (
    <form>
      {/* ✅ 自闭合标签 */}
      <img src="/logo.png" alt="Logo" width={48} height={48} />
      <br />
      <input type="text" placeholder="姓名" />
      <hr />

      {/* ✅ 有内容的标签：成对写 */}
      <label>
        邮箱
        <input type="email" />
      </label>

      <button type="submit">提交</button>

      {/* ❌ 以下写法在 JSX 里会报错 */}
      {/* <img src="x.png">           缺少 /> */}
      {/* <input type="text">         缺少 /> */}
    </form>
  )
}`,
          },
          {
            type: 'text',
            title: '7）规则三：JSX 里怎么写注释',
            body: 'JSX 子节点里的注释必须写成 {/* 注释内容 */}。这是 JS 块注释包在 JSX 花括号里的形式。\n\n不能写 // 在标签中间（会被当成文本或语法错误）。不能写 HTML 的 <!-- -->（在 JSX 里无效，可能显示为文本）。\n\nJSX 外面的普通 JS 区域可以用 // 或 /* */ 注释，没问题。注释可以跨多行。',
          },
          {
            type: 'code',
            title: '注释正确 vs 错误写法',
            language: 'jsx',
            body: `function CommentDemo() {
  // ✅ 这行注释在 JSX 外面，普通 JS 注释，没问题
  return (
    <div>
      {/* ✅ JSX 内部必须用这种注释 */}
      {/* 可以写多行
          注释内容 */}

      <p>可见内容</p>

      {/* ❌ 错误：不能在标签属性位置写 //
      <p // 这样不行
      >

      ❌ 错误：HTML 注释在 JSX 里无效
      <!-- 这不是 JSX 注释 -->
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '8）JSX 基础常见报错对照表',
            headers: ['报错信息', '原因', '修复方法'],
            rows: [
              ['Adjacent JSX elements must be wrapped...', 'return 后面有两个并列元素', '用 <div> 或 <>...</> 包起来'],
              ['Expected corresponding JSX closing tag', '开始标签没有对应结束标签', '检查每个 <div> 有 </div>，<img> 写 />'],
              ['Unexpected token', 'JSX 里用了 // 注释', '改成 {/* 注释 */}'],
              ['class is not valid', '写了 class 而不是 className', '改成 className="..."'],
              ['Invalid DOM property for', '写了 for 而不是 htmlFor', '改成 htmlFor="..."'],
              ['The tag <X> is unrecognized', '组件名小写开头', 'React 组件必须 PascalCase：UserCard 不是 userCard'],
            ],
          },
          {
            type: 'list',
            title: '9）动手练习清单',
            ordered: true,
            items: [
              '写一个 Profile 组件，return 里有头像 img、姓名 h2、简介 p，用 Fragment（<>...</>）包裹，不要多余 div。',
              '故意删掉 img 的 />，看终端报什么错，再改回来。',
              '在 JSX 里加 {/* 我是注释 */}，确认页面不显示注释文字。',
              '打开浏览器开发者工具 Elements 面板，对比 Article（有 div）和 ArticleWithFragment（无多余 div）的 DOM 结构差异。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'JSX 一个根、标签必闭合、注释用 {/* */}、class → className。并列元素用 <> 包，map 里要 key 用 <Fragment key={...}>。',
          },
        ],
      },
    },
    {
      id: 'jsx-expression',
      title: '花括号 {} 完整用法：变量、运算、三元、函数、列表',
      summary: '标签里插动态值用 {}；能写表达式不能写语句；对象不能直接渲染',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'JSX 标签内的 { } 里只能放「表达式」（能算出值的代码），不能直接写 if、for、function 声明等语句。',
          },
          {
            type: 'text',
            title: '1）花括号 {} 是什么？',
            body: 'JSX 里，标签之间的纯文字是静态的（原样显示）。要插入 JavaScript 动态值，用 { 表达式 } 把 JS 代码包起来。\n\n表达式 = 能算出一个值的代码。变量名、数字运算、字符串拼接、函数调用、三元运算符 ? :、数组的 map、对象属性访问——这些都是表达式。\n\n语句 = 不能当值用的代码。if (...) { }、for (...) { }、const x = 1、function foo() {}、return ——这些不能在 {} 里直接写。需要逻辑？在 return 之前用 if，或在 {} 里用三元 / &&。',
          },
          {
            type: 'table',
            title: '2）{} 里能写什么、不能写什么',
            headers: ['类型', '能放 {} 里吗', '示例', '替代写法'],
            rows: [
              ['变量', '✅', '{name}', '-'],
              ['运算', '✅', '{age + 1}', '-'],
              ['函数调用', '✅', '{formatDate(d)}', '-'],
              ['三元表达式', '✅', '{ok ? "是" : "否"}', '-'],
              ['&& 短路', '✅', '{show && <Modal />}', '-'],
              ['数组 map', '✅', '{list.map(...)}', '-'],
              ['对象属性', '✅', '{user.name}', '-'],
              ['if 语句', '❌', '{ if (ok) ... }', 'return 前 if 或三元'],
              ['for 循环', '❌', '{ for (...) ... }', '数组 map'],
              ['const/let 声明', '❌', '{ const x = 1 }', '写在 return 之前'],
              ['整个对象', '❌', '{{ a: 1 }}', '{obj.a} 或 JSON.stringify'],
            ],
          },
          {
            type: 'text',
            title: '3）怎么用：插入变量、运算、函数返回值',
            body: '最常见用法：把组件里的变量、计算结果、函数返回值显示在界面上。\n\n字符串、数字会正常显示。布尔值 true/false、null、undefined 作为 JSX 子节点时，React 什么也不显示（这是 && 条件渲染的基础）。\n\n注意：数字 0 会显示出来！所以 {count && <Badge />} 当 count=0 时页面会出现一个 0。计数类条件应写 count > 0 && ...。',
          },
          {
            type: 'code',
            title: '完整 Demo：Profile 卡片（变量 + 运算 + 函数）',
            language: 'jsx',
            body: `function ProfileCard() {
  const name = '小明'
  const age = 18
  const score = 86
  const tags = ['React', 'CSS', 'JavaScript']
  const now = new Date()

  function formatScore(n) {
    return n >= 60 ? \`\${n} 分（及格）\` : \`\${n} 分（不及格）\`
  }

  function getGrade(n) {
    if (n >= 90) return 'A'
    if (n >= 80) return 'B'
    if (n >= 60) return 'C'
    return 'D'
  }

  return (
    <div style={{ padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
      <h2>{name}</h2>
      <p>年龄：{age} 岁</p>
      <p>明年年龄：{age + 1}</p>
      <p>{formatScore(score)}</p>
      <p>等级：{getGrade(score)}</p>
      <p>今天：{now.toLocaleDateString('zh-CN')}</p>
      <p>标签数量：{tags.length}</p>
    </div>
  )
}

export default ProfileCard`,
          },
          {
            type: 'text',
            title: '4）条件渲染：在 JSX 里做 if/else',
            body: 'JSX 的 {} 里不能直接写 if 语句，但有三种常用模式实现条件渲染：\n\n① 提前 return（分支多、逻辑复杂时最清晰）：在 return JSX 之前用 if 判断，满足条件就 return 另一段 JSX。② 三元运算符 ? :（二选一）：{ ok ? <Success /> : <Error /> }。③ && 短路（有就显示）：{ isLoggedIn && <Dashboard /> }，左侧为真才渲染右侧。\n\n选择建议：2～3 个互斥分支用提前 return；简单二选一 inline 用三元；「有就显示、没有就不显示」用 &&。',
          },
          {
            type: 'code',
            title: '完整 Demo：条件显示（三元 + && + 提前 return）',
            language: 'jsx',
            body: `function StatusPanel({ loading, error, user }) {
  // 方式 1：提前 return（分支多、逻辑复杂时最清晰）
  if (loading) {
    return <p>加载中...</p>
  }
  if (error) {
    return <p style={{ color: 'crimson' }}>错误：{error}</p>
  }
  if (!user) {
    return <p>请先登录</p>
  }

  // 方式 2：三元（二选一）
  const roleLabel = user.role === 'admin' ? '管理员' : '普通用户'

  return (
    <div>
      <h3>欢迎，{user.name}</h3>
      <p>身份：{roleLabel}</p>

      {/* 方式 3：&& （有就显示） */}
      {user.role === 'admin' && (
        <button type="button">进入后台</button>
      )}

      {/* 安全写法：避免 count 为 0 时渲染出 0 */}
      {user.unreadCount > 0 && (
        <span>你有 {user.unreadCount} 条未读消息</span>
      )}
    </div>
  )
}

// 测试用法
function App() {
  return (
    <>
      <StatusPanel loading={true} />
      <StatusPanel user={{ name: '小红', role: 'admin', unreadCount: 3 }} />
    </>
  )
}`,
          },
          {
            type: 'table',
            title: '5）三种条件渲染方式对照表',
            headers: ['方式', '语法', '适用场景', '易错点'],
            rows: [
              ['提前 return', 'if (...) return <A />', '3+ 个互斥分支、加载/错误/空状态', '别忘了最后的默认 return'],
              ['三元 ? :', '{ ok ? <A /> : <B /> }', '二选一、inline 简单判断', '嵌套三元可读性差，复杂时用 return'],
              ['&& 短路', '{ cond && <Comp /> }', '「有就显示」、可选内容', '左侧是 0 会渲染出 0，用 > 0 比较'],
            ],
          },
          {
            type: 'text',
            title: '6）列表渲染：用 map 把数组变成 JSX',
            body: '数组.map() 是 JSX 里最常用的「循环」。map 回调 return 一段 JSX，外层用 {} 包起来。每项必须有唯一的 key 属性（第 6 章列表渲染会细讲 key 的原理，这里先会用）。\n\nkey 帮助 React 识别哪一项变了、哪一项是新增的，优化更新性能。用数据的唯一 id 做 key，不要用数组 index（除非列表静态且不会重排）。\n\nmap 返回的是一个 JSX 数组，React 可以直接渲染数组。',
          },
          {
            type: 'code',
            title: '完整 Demo：Todo 列表用 map 渲染',
            language: 'jsx',
            body: `function TodoList() {
  const todos = [
    { id: 1, text: '学习 JSX 花括号', done: true },
    { id: 2, text: '学习 Props', done: false },
    { id: 3, text: '学习 State', done: false },
  ]

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            textDecoration: todo.done ? 'line-through' : 'none',
            color: todo.done ? '#999' : '#333',
            padding: '8px 0',
          }}
        >
          {todo.done ? '✅' : '⬜'} {todo.text}
        </li>
      ))}
    </ul>
  )
}`,
          },
          {
            type: 'text',
            title: '7）易错：{} 里常见错误写法',
            body: '新手最常踩四个坑：① {} 里写 if 语句 → 编译报错 Unexpected token。② {} 里直接放对象 {{ a: 1 }} → 运行报错 Objects are not valid as a React child。③ 在 return 的 JSX 中间写 const 声明 → 不行，声明要写在 return 之前。④ {count && <Badge />} 当 count=0 时页面显示 0 → 改成 count > 0 && ...。',
          },
          {
            type: 'code',
            title: '错误 vs 正确完整对照',
            language: 'jsx',
            body: `function ErrorVsCorrect({ ok, user }) {
  // ✅ 变量声明写在 return 之前
  const message = ok ? '成功' : '失败'

  // ❌ 错误：{} 里不能写 if 语句
  // return <div>{ if (ok) { return 'yes' } }</div>

  // ❌ 错误：对象不能直接当子节点
  // return <div>{{ name: '小明' }}</div>

  // ✅ 正确：渲染对象的某个字段
  return (
    <div>
      <p>{message}</p>
      <p>{user.name}</p>
      <p>{JSON.stringify(user)}</p>  {/* 调试时把对象转字符串 */}
    </div>
  )
}

// ✅ 正确：复杂条件在 return 之前用 if
function Box({ ok }) {
  if (!ok) {
    return <div>暂无数据</div>
  }
  return <div>有数据，请查看</div>
}`,
          },
          {
            type: 'table',
            title: '8）花括号 {} 常见陷阱对照表',
            headers: ['错误写法', '报错 / 现象', '正确写法'],
            rows: [
              ['{ if (ok) { return "yes" } }', 'Unexpected token', 'return 前 if，或 {ok ? "yes" : "no"}'],
              ['{{ name: "小明" }}', 'Objects are not valid as a React child', '{user.name} 或 {JSON.stringify(user)}'],
              ['return (<div> const x=1 </div>)', '语法错误', 'const x=1 写在 return 之前'],
              ['{0 && <Badge />}', '页面显示数字 0', '{count > 0 && <Badge />}'],
              ['{true}', '什么都不显示（正常）', '布尔值不渲染，这是 && 的基础'],
              ['{undefined} / {null}', '什么都不显示（正常）', '可用于「不渲染任何内容」'],
            ],
          },
          {
            type: 'list',
            title: '9）动手练习清单',
            ordered: true,
            items: [
              '写一个 Weather 组件，用三元显示「晴天 ☀️ / 雨天 🌧️」。',
              '用 map 渲染 5 个水果名称（ul > li），每项加 key。',
              '故意写 {{ a: 1 }} 看报错，改成 { JSON.stringify({ a: 1 }) } 修复。',
              '写 {0 && <span>有消息</span>}，观察页面上的 0，改成 {false && ...} 或 {count > 0 && ...} 对比。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '{} 里只放表达式：变量、运算、三元、map、&&。if/for/声明放 return 前。对象不能直接渲染，0 会被显示出来。',
          },
        ],
      },
    },
    {
      id: 'jsx-attributes',
      title: '属性完整用法：className、style、htmlFor 与动态属性',
      summary: 'JSX 属性用驼峰命名；class 改 className；style 必须是对象；动态 class 和 style 写法',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'JSX 属性 ≈ HTML 属性，但 class → className，for → htmlFor，style 必须是 {{ 驼峰键: 值 }} 对象，不能写字符串。',
          },
          {
            type: 'text',
            title: '1）JSX 属性是什么？和 HTML 有什么不同？',
            body: 'JSX 属性（attributes）用来给标签或组件传配置：样式、事件、表单行为、无障碍属性等。大部分和 HTML 属性一一对应，但因为 JSX 编译成 JavaScript，有些名字必须改。\n\n核心差异：class → className（class 是 JS 保留字）。for → htmlFor（for 是 JS 保留字）。style 必须是 JS 对象，不是 CSS 字符串。事件和 DOM 属性用驼峰：onClick、onChange、tabIndex、autoFocus、readOnly。\n\n属性值的写法：字符串可以写 title="提示" 或 title={变量}。数字、布尔、对象、表达式必须用 {} 包起来：width={100}、disabled={true}、style={{ color: "red" }}。',
          },
          {
            type: 'table',
            title: '2）HTML 属性 → JSX 属性改名对照表',
            headers: ['HTML', 'JSX', '说明'],
            rows: [
              ['class="btn"', 'className="btn"', 'class 是 JS 保留字'],
              ['for="email"', 'htmlFor="email"', 'for 是 JS 保留字'],
              ['style="color:red"', 'style={{ color: "red" }}', '对象 + 驼峰键名'],
              ['onclick', 'onClick={fn}', '驼峰 + 传函数引用'],
              ['tabindex', 'tabIndex', '驼峰命名'],
              ['readonly', 'readOnly', '驼峰命名'],
              ['maxlength', 'maxLength', '驼峰命名'],
              ['colspan', 'colSpan', '驼峰命名（表格）'],
            ],
          },
          {
            type: 'text',
            title: '3）className：静态与动态写法',
            body: '给元素加 CSS 类名用 className（不是 class）。CSS 类定义在 .css 文件里（如 index.css 或组件同名 CSS），className 只是「挂上」这些类。\n\n静态：className="btn btn-primary"。动态：className={变量} 或根据条件拼接多个类名。入门用字符串拼接或数组 filter + join 即可；大项目可用 clsx 或 classnames 库（此处不展开）。\n\n易错：写 class 不会报错但样式不生效（React 会警告 Unknown prop class）。DevTools 里看到 class 属性说明写错了。',
          },
          {
            type: 'code',
            title: '完整 Demo：Button 组件动态 className',
            language: 'jsx',
            body: `// 假设 CSS 里有：
// .btn { padding: 8px 16px; border: none; cursor: pointer; }
// .btn-primary { background: #1677ff; color: white; }
// .btn-danger { background: #ff4d4f; color: white; }
// .btn-disabled { opacity: 0.5; cursor: not-allowed; }

function Button({ variant = 'primary', disabled = false, children }) {
  // 方式 1：三元拼接（字段少时够用）
  let className = 'btn'
  if (variant === 'primary') className += ' btn-primary'
  if (variant === 'danger') className += ' btn-danger'
  if (disabled) className += ' btn-disabled'

  return (
    <button
      type="button"
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

// 方式 2：数组 filter + join（多个条件时更清晰）
function Tab({ label, active }) {
  const className = [
    'tab',
    active ? 'tab-active' : '',
    active ? 'tab-highlight' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={className}>{label}</div>
}

function App() {
  return (
    <div style={{ padding: 20, display: 'flex', gap: 8 }}>
      <Button>主要按钮</Button>
      <Button variant="danger">删除</Button>
      <Button disabled>禁用</Button>
      <Tab label="首页" active={true} />
      <Tab label="设置" active={false} />
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '4）style 行内样式：必须是对象，键名驼峰',
            body: 'JSX 的 style 属性接收一个 JavaScript 对象，不是 CSS 字符串。外层 {} 是 JSX 表达式，内层 {} 是对象字面量，所以写成 style={{ key: value }}。\n\n键名用驼峰：backgroundColor（不是 background-color）、fontSize（不是 font-size）、marginTop（不是 margin-top）。\n\n数值如果不带单位，React 自动加 px（如 padding: 16 → 16px）。颜色、百分比、em 等带单位的值写字符串：color: "red"、width: "50%"、marginTop: "12px"。\n\n为什么用对象而不是字符串？因为 JS 里对象可以动态计算、合并、根据 props 变化——字符串很难做这些。',
          },
          {
            type: 'code',
            title: '完整 Demo：Card 组件 style 对象写法',
            language: 'jsx',
            body: `function Card({ title, highlight = false, children }) {
  // 方式 1：先定义对象，再传给 style
  const cardStyle = {
    backgroundColor: highlight ? '#fff7e6' : '#f5f5f5',
    padding: 16,                    // 数字 → 自动加 px
    marginTop: '12px',              // 带单位用字符串
    borderRadius: 8,
    border: '1px solid #e8e8e8',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  }

  const titleStyle = {
    color: highlight ? '#d48806' : '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  }

  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>{title}</h3>
      <div style={{ color: '#666', lineHeight: 1.6 }}>{children}</div>
    </div>
  )
}

function App() {
  return (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <Card title="普通卡片">
        <p>这是卡片内容，style 对象写在 JSX 外面更清晰。</p>
      </Card>
      <Card title="高亮卡片" highlight>
        <p>highlight 为 true 时背景变黄。</p>
      </Card>
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: 'style 错误 vs 正确对照',
            language: 'jsx',
            body: `function StyleMistakes() {
  return (
    <div>
      {/* ❌ 错误：HTML 字符串写法 */}
      {/* <p style="color: red">不行</p> */}

      {/* ❌ 错误：键名带横线 */}
      {/* <p style={{ font-size: 14 }}>不行</p> */}

      {/* ❌ 错误：少包一层 {} */}
      {/* <p style={ color: 'red' }>不行</p> */}

      {/* ✅ 正确 */}
      <p style={{ color: 'crimson', fontSize: 14, marginTop: '8px' }}>
        正确的行内样式
      </p>

      {/* ✅ 动态 style：根据 props 变化 */}
      <span style={{ color: true ? 'green' : 'gray' }}>状态文字</span>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '5）style 常见错误对照表',
            headers: ['错误写法', '现象', '正确写法'],
            rows: [
              ['style="color: red"', '样式不生效 / 警告', 'style={{ color: "red" }}'],
              ['style={{ font-size: 14 }}', '语法错误', 'style={{ fontSize: 14 }}'],
              ['style={ color: "red" }', '语法错误', 'style={{ color: "red" }}'],
              ['style={{ padding: "16" }}', '能工作但单位不对', 'padding: 16（数字自动 px）'],
              ['style={{ width: 50 }}', '正常，50px', '百分比用 width: "50%"'],
            ],
          },
          {
            type: 'text',
            title: '6）htmlFor 与其它常用属性',
            body: 'htmlFor 关联 label 和 input 的 id：点击 label 文字时，浏览器会自动聚焦到对应 input。这是无障碍（a11y）的基本要求。\n\n表单常用属性：placeholder（占位文字）、disabled（禁用）、readOnly（只读）、autoComplete（浏览器自动填充提示）、type（input 类型）、name（表单字段名）。\n\n图片：src（地址）、alt（替代文字，无障碍必须写，也利于 SEO）。链接：href、target="_blank" 建议加 rel="noopener noreferrer"（安全）。\n\ndata 属性：data-testid="submit-btn" 方便测试框架定位元素，不影响样式和功能。',
          },
          {
            type: 'code',
            title: '完整 Demo：表单属性 + htmlFor + 布尔属性',
            language: 'jsx',
            body: `function SignUpForm() {
  return (
    <form style={{ padding: 20, maxWidth: 360 }}>
      {/* htmlFor 对应 input 的 id，点击 label 会聚焦 input */}
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="email">邮箱</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          style={{ display: 'block', width: '100%', marginTop: 4, padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label htmlFor="password">密码</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="至少 6 位"
          autoComplete="new-password"
          style={{ display: 'block', width: '100%', marginTop: 4, padding: 8 }}
        />
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input type="checkbox" defaultChecked />
        同意用户协议
      </label>

      <button
        type="submit"
        data-testid="submit-btn"
        style={{ marginTop: 16, padding: '8px 24px' }}
      >
        注册
      </button>
    </form>
  )
}`,
          },
          {
            type: 'text',
            title: '7）展开属性：把对象键值批量变成 JSX 属性',
            body: '当你有一组属性存在对象里，可以用 {...obj} 展开到 JSX 标签上，等价于逐个写属性。展开后还可以覆盖：后面的属性优先级更高。\n\n常见场景：封装通用组件时透传 props（<Input {...rest} />）、复用链接配置、合并默认属性和用户传入属性。',
          },
          {
            type: 'code',
            title: '展开属性 Demo',
            language: 'jsx',
            body: `function SpreadPropsDemo() {
  const linkProps = {
    href: 'https://react.dev',
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'doc-link',
  }

  const inputProps = {
    type: 'text',
    placeholder: '搜索...',
    'aria-label': '搜索框',
  }

  return (
    <div>
      {/* 展开：等价于逐个写属性 */}
      <a {...linkProps}>React 官方文档</a>
      <input {...inputProps} />

      {/* 展开 + 覆盖：后面的属性优先 */}
      <input {...inputProps} placeholder="覆盖后的占位符" />
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '8）className vs style 怎么选？',
            headers: ['维度', 'className + CSS 文件', 'style 行内对象'],
            rows: [
              ['适合场景', '大部分样式、可复用、响应式', '动态计算值、临时调试、一次性'],
              ['性能', '更好（CSS 类可缓存）', '每次渲染创建新对象（小项目无感）'],
              ['伪类/媒体查询', '✅ :hover、@media', '❌ 不支持'],
              ['维护性', '样式和逻辑分离，好维护', '样式混在 JS 里，多了难读'],
              ['动态值', '切换类名', '直接写表达式，如 width: percent + "%"'],
              ['建议', '默认首选', '仅动态值或调试时用'],
            ],
          },
          {
            type: 'table',
            title: '9）JSX 属性综合易错表（本章汇总）',
            headers: ['易错点', '错误示例', '正确示例'],
            rows: [
              ['类名', 'class="btn"', 'className="btn"'],
              ['label 关联', '<label for="x">', '<label htmlFor="x">'],
              ['行内样式', 'style="color:red"', 'style={{ color: "red" }}'],
              ['样式键名', 'font-size', 'fontSize'],
              ['事件处理', 'onClick="handleClick()"', 'onClick={handleClick}'],
              ['布尔属性', 'disabled="true"（字符串）', 'disabled={true} 或 disabled'],
              ['自定义组件', '<userCard />', '<UserCard />（PascalCase）'],
              ['传递对象', 'data={name: "x"}', 'data={{ name: "x" }}（双花括号）'],
            ],
            note: '传递对象给属性时：外层 {} 是 JSX 表达式，内层 {} 是对象。所以 data={{ name: "x" }} 不是笔误。',
          },
          {
            type: 'list',
            title: '10）动手练习清单',
            ordered: true,
            items: [
              '写一个 Alert 组件，props 接收 type（"success"|"error"），用 className 或 style 切换绿/红背景。',
              '写一个 Avatar 组件，style 设置 width/height/borderRadius: "50%" 实现圆形头像。',
              '写 label + input，用 htmlFor 和 id 关联，点击 label 文字能聚焦输入框。',
              '把 linkProps 对象用 {...linkProps} 展开到 <a> 上，对比逐个写属性的写法。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'className 挂 CSS 类，style 传驼峰对象，htmlFor 连 label。大部分样式用 CSS 文件，style 只留给动态值。',
          },
        ],
      },
    },
  ],
}

export default jsx
