/**
 * 第 3 章：组件与 Props
 */
const components = {
  id: 'components',
  title: '组件与 Props',
  summary: '函数组件定义导出使用、Props 传参解构默认值、children 插槽——每个都有完整大 Demo',
  order: 6,
  items: [
    {
      id: 'function-component',
      title: '函数组件完整流程：定义 → 导出 → 导入 → 使用',
      summary: '组件 = 返回 JSX 的大写函数；默认导出/具名导出；何时拆组件',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'React 组件 = 名字首字母大写的函数，return 一段 JSX。使用时写 <MyComponent />，React 会调用这个函数并渲染返回值。',
          },
          {
            type: 'text',
            title: '为什么这一节要单独讲透？',
            body: '组件是 React 的「积木块」。不会拆组件，页面就会越写越长、越改越怕；会拆组件，同一块 UI 写一次到处复用，每个文件职责清晰。\n\n初学常见困惑：为什么函数名必须大写？export default 和 export function 有什么区别？什么时候该拆、拆多细？下面按「定义 → 导出 → 导入 → 使用 → 拆分」完整走一遍，并保留可直接复制的 Demo。',
          },
          {
            type: 'text',
            title: '1）什么是组件？为什么要拆？',
            body: '组件是可复用的 UI 单元：一个按钮、一张用户卡片、整个导航栏、一整页都可以是组件。\n\n把页面拆成组件的好处：\n\n① 同一块 UI 写一次，多处复用（改一处，处处生效）。\n\n② 每个文件职责清晰，好读好改——打开 UserCard.js 就知道只管用户卡片。\n\n③ 可以单独测试、单独维护，团队协作时减少冲突。\n\nReact 现代写法主流是「函数组件」：就是一个 JavaScript 函数，接收 props，返回 JSX。类组件是老写法，新项目基本不用，知道有这回事即可。',
          },
          {
            type: 'table',
            title: '2）组件 vs 普通函数：关键区别',
            headers: ['对比点', '普通函数', 'React 组件'],
            rows: [
              ['命名', '小写即可：formatDate', '首字母必须大写：UserCard'],
              ['返回值', '任意类型', 'JSX、null、或字符串/数字等可渲染内容'],
              ['调用方式', '函数调用：formatDate()', 'JSX 标签：<UserCard />'],
              ['谁调用', '你自己在代码里调', 'React 在渲染时自动调'],
              ['能否用 Hooks', '不能', '可以（useState 等）'],
            ],
            note: 'React 靠「首字母大写」区分自定义组件和 HTML 原生标签（div、span 等）。',
          },
          {
            type: 'text',
            title: '3）第一步：写一个最简单的组件',
            body: '规则逐条记：\n\n① 函数名首字母必须大写（Button 不是 button）——React 看到大写标签才会去调你的函数。\n\n② return 后面是 JSX（或 null 表示不渲染任何东西）。\n\n③ 一个文件通常放一个「主组件」，用 export default 导出。\n\n④ 在别的文件 import 后，像 HTML 标签一样 <Button /> 使用。\n\n⑤ 组件可以嵌套：App 里用 UserCard，UserCard 里用 Avatar——形成「组件树」。',
          },
          {
            type: 'code',
            title: '完整 Demo：从创建 Button 到在 App 里使用',
            language: 'jsx',
            body: `// ========== src/components/Button.js ==========
function Button() {
  return (
    <button
      type="button"
      style={{
        padding: '8px 16px',
        background: '#1677ff',
        color: 'white',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer',
      }}
    >
      点击我
    </button>
  )
}

export default Button

// ========== src/App.js ==========
import Button from './components/Button'

function App() {
  return (
    <div style={{ padding: 24 }}>
      <h1>组件使用示例</h1>
      <Button />
      <Button />   {/* 同一组件可以用多次 */}
    </div>
  )
}

export default App`,
          },
          {
            type: 'text',
            title: '4）React 如何渲染 <Button />？（理解 WHY）',
            body: '你写 <Button /> 时，React 内部大致等价于调用 Button()，拿到返回的 JSX，再转成真实 DOM 显示在页面上。\n\n每次父组件重新渲染，子组件函数也会重新执行——所以组件函数里不要写「只想执行一次」的重逻辑（那是 useEffect 的事，后面章节讲）。\n\n同一组件用多次（如两个 <Button />），React 会分别调用两次 Button()，得到两个独立的按钮 DOM。',
          },
          {
            type: 'text',
            title: '5）第二步：三种导出 / 导入方式（项目里都会遇到）',
            body: '默认导出 default：一个文件只导出一个主组件，import 时名字随便起（建议与组件名一致）。\n\n具名导出 named export：一个文件导出多个小组件，import 时名字必须和导出一致（或用 as 重命名）。\n\n同文件内部组件：只在当前文件用的辅助组件，可以不 export——外部 import 不到，封装在文件内部。\n\n为什么有两种导出？default 适合「这个文件的主角色就一个」；named 适合「工具库式的一文件多组件」，且利于 Tree Shaking（打包时未用的可以去掉）。',
          },
          {
            type: 'table',
            title: '6）default 导出 vs 具名导出对照',
            headers: ['方式', '导出写法', '导入写法', '适用场景'],
            rows: [
              ['默认导出', 'export default Button', "import Button from './Button'", '一个文件一个主组件（最常见）'],
              ['具名导出', 'export function IconHome() {}', "import { IconHome } from './icons'", '一个文件多个小组件'],
              ['重命名导入', 'export function IconHome() {}', "import { IconHome as Home } from './icons'", '避免命名冲突'],
              ['混合', 'export default Page + export function Helper', '分别 default 和 {} 导入', '主组件 + 可复用子件同文件'],
            ],
          },
          {
            type: 'code',
            title: '完整 Demo：默认导出 vs 具名导出 vs 内部组件',
            language: 'jsx',
            body: `// ========== Avatar.js：默认导出（一个文件一个主组件）==========
function Avatar() {
  return <span style={{ fontSize: 32 }}>👤</span>
}
export default Avatar

// 使用：import Avatar from './Avatar'
// 或：import MyAvatar from './Avatar'  ← 名字可以自定


// ========== icons.js：具名导出（一个文件多个小组件）==========
export function IconHome() {
  return <span title="首页">🏠</span>
}
export function IconUser() {
  return <span title="用户">👤</span>
}
export function IconSetting() {
  return <span title="设置">⚙️</span>
}

// 使用：
import { IconHome, IconUser } from './icons'
// 或：import { IconHome as HomeIcon } from './icons'


// ========== Page.js：同文件内部组件（不 export）==========
function PageTitle({ text }) {
  return <h2 style={{ marginBottom: 16 }}>{text}</h2>
}

function PageFooter() {
  return <footer style={{ marginTop: 24, color: '#999' }}>© 2026</footer>
}

function Page() {
  return (
    <article>
      <PageTitle text="关于我们" />
      <p>页面正文内容...</p>
      <PageFooter />
    </article>
  )
}

export default Page  // 只导出 Page，Title/Footer 外部看不到`,
          },
          {
            type: 'text',
            title: '7）第三步：何时该拆组件？（实用判断标准）',
            body: '出现以下信号就该拆：\n\n① 一段 JSX 超过一屏，读起来吃力。\n\n② 同一段 UI 在页面里出现两次以上（复制粘贴是拆分信号）。\n\n③ 一块区域有独立逻辑（如搜索框、分页器、用户卡片）。\n\n④ 你想单独复用或测试它。\n\n不要拆太碎：一个纯文字的 <span> 没必要单独做组件——拆分成本 > 收益。\n\n拆分的粒度直觉：「能独立命名、独立理解的一块 UI」。UserCard 比「左边头像右边文字的那块」好命名、好沟通。',
          },
          {
            type: 'list',
            title: '8）拆分决策清单（按顺序自问）',
            ordered: true,
            items: [
              '这段 JSX 是否在 2 个以上地方出现？→ 是则抽组件',
              '打开文件是否要在脑子里「折叠」某一大段才能读？→ 是则抽组件',
              '这块 UI 能否用一句话命名（如 ProductCard、SearchBar）？→ 能则值得抽',
              '抽完后 props 是否超过 8～10 个且难以维护？→ 可能拆太碎或结构需调整',
              '是否仅为一行 div 包一层？→ 通常不必单独建文件',
            ],
          },
          {
            type: 'code',
            title: '完整大 Demo：从「一团 JSX」拆成清晰组件树',
            language: 'jsx',
            body: `// ========== 拆之前：App.js 200 行，又长又乱 ==========
// 下面展示「拆之后」的目标结构

// --- Avatar.js ---
function Avatar({ src, name, size = 48 }) {
  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      style={{ borderRadius: '50%', objectFit: 'cover' }}
    />
  )
}
export default Avatar

// --- Badge.js ---
function Badge({ children, color = '#1677ff' }) {
  return (
    <span
      style={{
        background: color,
        color: 'white',
        padding: '2px 8px',
        borderRadius: 12,
        fontSize: 12,
      }}
    >
      {children}
    </span>
  )
}
export default Badge

// --- UserCard.js：组合 Avatar + Badge ---
import Avatar from './Avatar'
import Badge from './Badge'

function UserCard({ user }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        padding: 16,
        border: '1px solid #eee',
        borderRadius: 8,
        maxWidth: 360,
      }}
    >
      <Avatar src={user.avatar} name={user.name} />
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <strong>{user.name}</strong>
          {user.isVip && <Badge color="#faad14">VIP</Badge>}
        </div>
        <p style={{ color: '#666', margin: '4px 0' }}>{user.bio}</p>
        <small style={{ color: '#999' }}>{user.city}</small>
      </div>
    </div>
  )
}
export default UserCard

// --- App.js：只负责组装数据和顶层布局 ---
import UserCard from './components/UserCard'

function App() {
  const users = [
    {
      name: '小明',
      bio: '前端学习者',
      city: '上海',
      avatar: 'https://i.pravatar.cc/48?u=1',
      isVip: true,
    },
    {
      name: '小红',
      bio: 'React 爱好者',
      city: '北京',
      avatar: 'https://i.pravatar.cc/48?u=2',
      isVip: false,
    },
  ]

  return (
    <div style={{ padding: 24 }}>
      <h1>用户列表</h1>
      {users.map((user) => (
        <UserCard key={user.name} user={user} />
      ))}
    </div>
  )
}
export default App`,
          },
          {
            type: 'text',
            title: '9）组件树与数据流（建立全局直觉）',
            body: '拆完后的结构是一棵树：App 是根，UserCard 是子，Avatar/Badge 是孙。数据通常从上层往下传（props），事件从下层往上通知（回调 props）。\n\nApp 持有 users 数组，map 出多个 UserCard；每个 UserCard 只负责「怎么展示一个用户」，不关心列表从哪来。这种分工让改样式（改 UserCard）和改数据（改 App）互不影响。',
          },
          {
            type: 'code',
            title: '致命错误：大小写搞错会怎样',
            language: 'jsx',
            body: `// ❌ 错误 1：函数名小写 → React 当成 HTML 原生标签，不会执行你的函数
function button() {
  return <button>错</button>
}
// 使用 <button /> 渲染的是原生 HTML button，不是你写的函数

// ❌ 错误 2：组件名小写使用
function MyButton() {
  return <button>对</button>
}
// 写 <mybutton /> → 报错或渲染异常

// ✅ 正确：函数名大写 + 使用也大写
function MyButton() {
  return <button type="button">确定</button>
}
// 使用 <MyButton />

// ❌ 错误 3：忘记 export / import
// Button.js 写了 function 但没 export default
// App.js import Button from './Button' → Module not found 或 undefined`,
          },
          {
            type: 'table',
            title: '10）常见报错速查',
            headers: ['报错 / 现象', '原因', '修复'],
            rows: [
              ['Element type is invalid', '组件未 export 或 import 路径错', '检查 export default / 路径大小写'],
              ['<mybutton /> 不生效', '使用时不符合 PascalCase', '改成 <MyButton />'],
              ['Rendered more hooks than expected', '组件名小写被当原生标签', '函数名和使用都大写'],
              ['Module not found', 'import 路径错误或文件不存在', '核对相对路径 ./components/Button'],
              ['Button is not defined', '用了组件但没 import', '文件顶部加 import'],
            ],
          },
          {
            type: 'list',
            title: '11）文件组织小建议',
            ordered: false,
            items: [
              '稍大的组件用文件夹：Header/index.js + Header/Header.css',
              '小组件一个文件即可：Badge.js',
              '组件名和文件名保持一致：UserCard.js 里 export 的函数叫 UserCard',
              'pages/ 放页面级组件，components/ 放可复用 UI 块',
              '同一目录 index.js 可 re-export，简化 import 路径',
            ],
          },
          {
            type: 'list',
            title: '12）动手练习清单',
            ordered: true,
            items: [
              '新建 ProductCard.js，显示商品名、价格、图片，在 App 里渲染 3 个',
              '把 IconHome/IconUser 放同一文件具名导出，在导航栏里用',
              '故意把组件名改成小写，看浏览器和控制台报什么错',
              '画一张 App → UserCard → Avatar 的组件树草图，标出 props 方向',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '组件 = 大写函数 + return JSX；<Button /> 是 React 帮你调 Button()。default 导出一个主组件，named 导出多个。能独立命名的一块 UI 就值得拆；小写名会被当成 HTML 标签。',
          },
        ],
      },
    },
    {
      id: 'props',
      title: 'Props 完整用法：传参、解构、默认值、展开、只读原则',
      summary: 'props = 父传子的数据；解构接收；默认值；传对象/函数；子组件不能改 props',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'Props = 父组件传给子组件的参数，像函数 arguments。单向流动：父 → 子。子组件只读 props，要改数据必须通知父组件改 state。',
          },
          {
            type: 'text',
            title: '为什么需要 Props？',
            body: '没有 props，每个 Button 只能显示同一段文字、同一种颜色——组件无法复用。Props 让同一组件在不同位置显示不同内容、不同样式、不同行为。\n\n可以把组件想成「带参数的 UI 函数」：Greeting({ name: "小明" }) 和 Greeting({ name: "小红" }) 渲染不同问候语。JSX 里写成 <Greeting name="小明" /> 更直观。',
          },
          {
            type: 'text',
            title: '1）Props 是什么？数据怎么流动？',
            body: 'Props（properties 的缩写）是父组件传给子组件的数据。子组件通过函数参数接收。\n\nReact 的数据流是单向的（One-Way Data Flow）：\n\n① state 在谁那里，谁负责改。\n\n② 父组件把数据通过 props 往下传。\n\n③ 子组件通过回调函数（也是 props，如 onChange、onDelete）通知父组件「请帮我改」。\n\n④ 子组件直接修改 props 是错误做法——会破坏可预测性，React 也会警告。\n\n这种单向流的好处：出 bug 时顺着「谁持有 state → 谁传 props」就能定位，不用猜数据被哪偷偷改了。',
          },
          {
            type: 'table',
            title: '2）Props vs State 对照（初学必分清）',
            headers: ['对比', 'Props', 'State'],
            rows: [
              ['谁拥有', '父组件传入', '当前组件自己 useState'],
              ['能否被子组件改', '❌ 只读', '✅ 用 setState 改'],
              ['变化时谁重新渲染', '父变 → 子跟着变', '自己 setState → 自己重渲染'],
              ['类比', '函数参数', '函数内部的变量（跨渲染保存）'],
              ['典型用途', '配置、展示数据、回调', '表单输入、开关、列表数据'],
            ],
          },
          {
            type: 'text',
            title: '3）第一步：基础传参与接收（两种写法）',
            body: '写法 A：参数叫 props，用 props.name 访问——适合 prop 很多、要动态访问 props[key] 的场景。\n\n写法 B（推荐）：解构 { name, age } 直接拿字段——代码短、一眼看出用了哪些 prop。\n\n传值规则：\n\n① 字符串可写 name="小明" 或 name={\'小明\'}。\n\n② 数字、布尔、对象、数组、函数必须用 {} 包起来，因为它们是 JavaScript 表达式，不是 HTML 字符串。\n\n③ 传布尔 true 可简写：isStudent 等价于 isStudent={true}。',
          },
          {
            type: 'code',
            title: '完整 Demo：Greeting 组件各种传参方式',
            language: 'jsx',
            body: `// 写法 A：props 对象
function GreetingA(props) {
  return (
    <p>
      你好，{props.name}！你 {props.age} 岁了。
      {props.isStudent && '（学生）'}
    </p>
  )
}

// 写法 B：解构（更常用）
function GreetingB({ name, age, isStudent = false }) {
  return (
    <p>
      你好，{name}！你 {age} 岁了。
      {isStudent && '（学生）'}
    </p>
  )
}

function App() {
  return (
    <div style={{ padding: 20 }}>
      {/* 字符串：引号或花括号都行 */}
      <GreetingB name="小明" age={18} isStudent={true} />
      <GreetingB name={'小红'} age={20} />

      {/* 数字、布尔必须用 {} */}
      <GreetingB name="小刚" age={25} isStudent={false} />

      {/* 传对象：用 {} 包一层 */}
      <UserBadge user={{ id: 1, name: '小李', level: 5 }} />
    </div>
  )
}

function UserBadge({ user }) {
  return (
    <div style={{ marginTop: 8 }}>
      <strong>{user.name}</strong> · Lv.{user.level}
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '4）JSX 传 prop 的值类型对照',
            headers: ['类型', '写法示例', '常见错误'],
            rows: [
              ['字符串', 'name="小明"', '数字也写引号 → 变成字符串 "18"'],
              ['数字', 'age={18}', 'age="18" 是字符串，算术可能出错'],
              ['布尔 true', 'disabled 或 disabled={true}', 'disabled="false" 字符串仍为真！'],
              ['布尔 false', 'disabled={false}', 'disabled="" 在 HTML 里仍可能当真'],
              ['对象', 'user={{ id: 1, name: "a" }}', '忘记外层 {}'],
              ['数组', 'items={[1, 2, 3]}', 'items="[1,2,3]" 是字符串不是数组'],
              ['函数', 'onClick={handleClick}', 'onClick={handleClick()} 渲染时就执行'],
            ],
          },
          {
            type: 'text',
            title: '5）第二步：默认值——参数默认值（推荐写法）',
            body: '解构时直接写 = 默认值：function Button({ size = "medium" })。父组件没传该 prop 时，值为 undefined，此时用默认值。\n\n为什么推荐参数默认值而不是 defaultProps？函数组件时代，解构默认值更直观、TypeScript 友好、少一层 API。老项目可能见到 defaultProps，知道即可。\n\n注意：父组件显式传 undefined 时，默认值行为与「没传」在解构默认值里通常一致；传 null 则不会替换成默认值（null 是有意传的值）。',
          },
          {
            type: 'code',
            title: '完整 Demo：通用 Button 组件（默认值 + 多种 props）',
            language: 'jsx',
            body: `function Button({
  type = 'button',       // 默认普通按钮，不是 submit
  variant = 'primary',   // primary | danger | ghost
  size = 'medium',       // small | medium | large
  disabled = false,
  onClick,
  children = '按钮',     // 默认文字
}) {
  const sizeMap = {
    small: { padding: '4px 8px', fontSize: 12 },
    medium: { padding: '8px 16px', fontSize: 14 },
    large: { padding: '12px 24px', fontSize: 16 },
  }

  const colorMap = {
    primary: { bg: '#1677ff', color: '#fff' },
    danger: { bg: '#ff4d4f', color: '#fff' },
    ghost: { bg: 'transparent', color: '#1677ff', border: '1px solid #1677ff' },
  }

  const s = sizeMap[size]
  const c = colorMap[variant]

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        ...s,
        background: c.bg,
        color: c.color,
        border: c.border || 'none',
        borderRadius: 6,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {children}
    </button>
  )
}

function App() {
  return (
    <div style={{ padding: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button>保存</Button>                          {/* 全部用默认值 */}
      <Button size="large">大按钮</Button>
      <Button variant="danger">删除</Button>
      <Button variant="ghost" size="small">取消</Button>
      <Button disabled>禁用</Button>
      <Button onClick={() => alert('点了！')}>点我</Button>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '6）第三步：传对象、数组、函数、展开 props',
            body: '复杂数据用对象/数组一次传入，避免 prop 爆炸（十几个单独字段）。\n\n回调函数（如 onEdit、onDelete）也是 props——子组件在事件里调用它通知父组件。这是「子不能直接改 props，但可以请求父改」的标准模式。\n\n展开运算符 {...obj} 可以把对象的键值批量变成 JSX 属性，适合透传 HTML 原生属性（className、data-*、aria-*）到 DOM 元素，而不必一个个手写。',
          },
          {
            type: 'code',
            title: '完整 Demo：TodoItem 传对象 + 回调 + 展开属性',
            language: 'jsx',
            body: `import { useState } from 'react'

function TodoItem({ todo, onToggle, onRemove }) {
  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 0',
        borderBottom: '1px solid #eee',
      }}
    >
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span
        style={{
          flex: 1,
          textDecoration: todo.done ? 'line-through' : 'none',
          color: todo.done ? '#999' : '#333',
        }}
      >
        {todo.text}
      </span>
      <button type="button" onClick={() => onRemove(todo.id)}>
        删除
      </button>
    </li>
  )
}

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 Props', done: false },
    { id: 2, text: '学习 State', done: true },
  ])

  function handleToggle(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function handleRemove(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, maxWidth: 400 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}                    // 传对象
          onToggle={handleToggle}        // 传函数
          onRemove={handleRemove}
        />
      ))}
    </ul>
  )
}

// 展开 props 示例
function Box(props) {
  const boxDefaults = { className: 'box', 'data-testid': 'box' }
  return <div {...boxDefaults} {...props}>内容</div>
}
// <Box style={{ color: 'red' }}>  → className、data-testid、style 都有`,
          },
          {
            type: 'text',
            title: '7）第四步：只读原则——子组件绝不能改 props',
            body: 'Props 对子组件是只读的。在子组件里写 props.user.name = "新名字" 或 props.items.push(...) 都是错误：\n\n① 违反 React 单向数据流设计。\n\n② React 用浅比较判断要不要更新，mutate 同一引用可能导致界面不刷新。\n\n③ 多个子组件共享同一对象引用时，一处篡改处处异常，极难调试。\n\n正确做法：子组件调用 props.onChange(newValue)，由父组件用 setState 更新后再传入新 props。',
          },
          {
            type: 'code',
            title: '错误 vs 正确：修改 props 的对照 Demo',
            language: 'jsx',
            body: `import { useState } from 'react'

// ❌ 错误：在子组件里直接改 props
function BadEditor({ user }) {
  function rename() {
    user.name = '被篡改的名字'  // 直接 mutate props！
  }
  return (
    <div>
      <p>{user.name}</p>
      <button onClick={rename}>改名（错误方式）</button>
    </div>
  )
}

// ✅ 正确：通过回调通知父组件
function GoodEditor({ user, onRename }) {
  return (
    <div>
      <p>当前：{user.name}</p>
      <button type="button" onClick={() => onRename('新名字')}>
        改名（正确方式）
      </button>
    </div>
  )
}

function Parent() {
  const [user, setUser] = useState({ id: 1, name: '小明' })

  return (
    <GoodEditor
      user={user}
      onRename={(name) => setUser({ ...user, name })}
    />
  )
}`,
          },
          {
            type: 'text',
            title: '8）props 变化会怎样？',
            body: '父组件 state 变了 → 父组件重新渲染 → 传入新的 props → 子组件也重新渲染（除非被 React.memo 等优化跳过，初学先默认都会重渲染）。\n\n所以「数据的主人」是持有 state 的那个组件，props 只是传递通道。子组件显示的 todo.done 永远来自父组件最近一次传入的 todo 对象，不是子组件自己「记住」的旧值。',
          },
          {
            type: 'list',
            title: '9）Props 设计自检清单',
            ordered: true,
            items: [
              '子组件是否只读 props，没有 user.xxx = 或 array.push？',
              '需要改数据时，是否提供了 onXxx 回调给父组件？',
              '布尔/数字是否用 {} 传递，避免字符串陷阱？',
              '可选 prop 是否写了解构默认值？',
              'prop 超过 7～8 个是否考虑合并成对象（如 user、config）？',
            ],
          },
          {
            type: 'list',
            title: '10）动手练习清单',
            ordered: true,
            items: [
              '写 Rating 组件，props 接收 score（1-5）和 onChange，点击星星调用 onChange',
              '给 Button 加 loading prop，loading 时显示「提交中...」并 disabled',
              '故意在子组件里改 props，观察 React 严格模式下的警告',
              '用 {...rest} 封装 Input 组件，透传 placeholder、disabled 等原生属性',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'Props 父传子、只读；要改就 onXxx 回调让父 setState。解构 + 默认值最常用；对象/函数/数字记得用 {}。数据主人是持 state 的组件，props 是单向通道。',
          },
        ],
      },
    },
    {
      id: 'children',
      title: 'children 插槽完整用法：布局容器、卡片、Modal',
      summary: '标签之间的内容 = props.children；具名插槽；组合组件模式',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '写在组件开闭标签之间的内容，会自动变成 props.children。用来做「外壳固定、内容自定义」的通用容器。',
          },
          {
            type: 'text',
            title: '为什么需要 children？',
            body: '很多 UI 是「壳子一样、内容不同」：卡片有边框和标题区，但正文可能是表单、列表或纯文字；布局有 Header/Footer，中间每页不同。\n\n如果 Card 组件把每种可能的内容都写死在内部，组件会无限膨胀。React 的解法：外壳由 Card 负责，中间那块交给使用者通过 children 传入——这就是「组合（Composition）」优于「继承」的体现。',
          },
          {
            type: 'text',
            title: '1）children 是什么？解决什么问题？',
            body: '当你做一个通用外壳（卡片、布局、弹窗），内部具体内容每次不同，不可能把所有可能的内容都写死在组件里。\n\n语法上就是 <Card>这里是 children</Card>，开闭标签之间的所有东西（文字、元素、多个元素、甚至表达式）都会作为 props.children 传给 Card 函数。\n\nchildren 本质上是普通 prop，只是 JSX 语法糖让你写起来像 HTML 嵌套，更符合直觉。',
          },
          {
            type: 'table',
            title: '2）children vs 普通 prop 对照',
            headers: ['方式', '写法', '适用'],
            rows: [
              ['children（默认插槽）', '<Card>内容</Card>', '主体区域自定义，最常见'],
              ['具名 prop', '<Panel header={...} footer={...} />', '多个区域各自自定义'],
              ['两者混用', '<Modal title="x">内容</Modal>', '固定 prop + 灵活 children'],
              ['函数 children', '<DataLoader>{({ data }) => ...}</DataLoader>', '进阶 render props，后面再深入'],
            ],
          },
          {
            type: 'text',
            title: '3）第一步：基础 children——Card 容器',
            body: '子组件通过 props.children（或解构 { children }）接收。\n\nchildren 可以是：纯文字、单个 JSX 元素、多个并列元素（React 会自动包成数组）、null/undefined（什么都不显示）。\n\nCard 负责标题和边框样式，正文完全由外部决定——Card 不需要知道里面是任务列表还是公告文字。',
          },
          {
            type: 'code',
            title: '完整 Demo：Card + Layout 基础 children',
            language: 'jsx',
            body: `function Card({ title, children }) {
  return (
    <section
      style={{
        border: '1px solid #e8e8e8',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
        maxWidth: 480,
      }}
    >
      {title && (
        <header
          style={{
            padding: '12px 16px',
            background: '#fafafa',
            fontWeight: 'bold',
            borderBottom: '1px solid #e8e8e8',
          }}
        >
          {title}
        </header>
      )}
      <div style={{ padding: 16 }}>{children}</div>
    </section>
  )
}

function App() {
  return (
    <div style={{ padding: 24 }}>
      <Card title="今日任务">
        <p>1. 学习 Props</p>
        <p>2. 学习 children</p>
        <button type="button">标记完成</button>
      </Card>

      <Card title="公告">
        纯文字也可以作为 children，不一定要标签包裹。
      </Card>

      {/* 自闭合组件没有 children */}
      <Card title="空内容" />
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '4）第二步：MainLayout 实战——本项目的布局模式',
            body: '布局组件是最典型的 children 用法：Header/Footer 固定，中间 main 区域每次不同。\n\nreact-demo 的 MainLayout 就是：外层壳子 + {children} 渲染当前页面。页面组件不需要重复写 Header，路由切换时只换 children 部分，壳子保持不变。\n\n这种模式也叫 Layout 组件或 Outlet 模式（React Router 里类似概念）。',
          },
          {
            type: 'code',
            title: '完整 Demo：MainLayout + 页面组合（仿 react-demo）',
            language: 'jsx',
            body: `function Header() {
  return (
    <header
      style={{
        padding: '12px 24px',
        background: '#001529',
        color: 'white',
      }}
    >
      <strong>React 学习站</strong>
      <nav style={{ display: 'inline', marginLeft: 24 }}>
        <a href="/" style={{ color: '#fff', marginRight: 16 }}>首页</a>
        <a href="/about" style={{ color: '#fff' }}>关于</a>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer style={{ padding: 16, textAlign: 'center', color: '#999' }}>
      © 2026 React Demo
    </footer>
  )
}

function MainLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, padding: 24 }}>{children}</main>
      <Footer />
    </div>
  )
}

function HomePage() {
  return (
    <div>
      <h1>首页</h1>
      <p>这是 Home 页面的内容，被 MainLayout 包在中间。</p>
    </div>
  )
}

function AboutPage() {
  return (
    <div>
      <h1>关于</h1>
      <p>About 页面内容。</p>
    </div>
  )
}

function App() {
  const page = 'home' // 实际项目用 Router 切换

  return (
    <MainLayout>
      {page === 'home' ? <HomePage /> : <AboutPage />}
    </MainLayout>
  )
}`,
          },
          {
            type: 'text',
            title: '5）第三步：多个「具名插槽」——不只用 children',
            body: '有时除了中间主体，还需要自定义 header、footer、sidebar。不必强行塞进 children，可以多加几个 props：header、footer、actions。\n\n这和 Vue 的具名 slot 思路一样，在 React 里用 props 模拟即可。规则：主体用 children（约定俗成），其它具名区域用同名 prop 接收 JSX。\n\nModal 常见组合：title + onClose 是 prop（简单数据/回调），弹窗正文用 children（复杂 JSX）。',
          },
          {
            type: 'code',
            title: '完整 Demo：Panel 多插槽 + Modal 弹窗',
            language: 'jsx',
            body: `import { useState } from 'react'

// 具名插槽：header / footer / children
function Panel({ header, footer, children }) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: 8,
        maxWidth: 480,
      }}
    >
      <header style={{ padding: 16, borderBottom: '1px solid #eee' }}>
        {header}
      </header>
      <main style={{ padding: 16 }}>{children}</main>
      <footer
        style={{
          padding: 16,
          borderTop: '1px solid #eee',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 8,
        }}
      >
        {footer}
      </footer>
    </div>
  )
}

// Modal：children 是弹窗内容，onClose 是回调 prop
function Modal({ open, title, onClose, children }) {
  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 8,
          minWidth: 320,
          maxWidth: '90vw',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid #eee',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <strong>{title}</strong>
          <button type="button" onClick={onClose}>✕</button>
        </div>
        <div style={{ padding: 16 }}>{children}</div>
      </div>
    </div>
  )
}

function App() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div style={{ padding: 24 }}>
      <Panel
        header={<h3 style={{ margin: 0 }}>设置面板</h3>}
        footer={
          <>
            <button type="button">取消</button>
            <button type="button">确定</button>
          </>
        }
      >
        <p>这里是 Panel 的主体内容（children）。</p>
      </Panel>

      <button type="button" onClick={() => setModalOpen(true)}>
        打开弹窗
      </button>

      <Modal
        open={modalOpen}
        title="确认删除"
        onClose={() => setModalOpen(false)}
      >
        <p>确定要删除这条记录吗？此操作不可撤销。</p>
        <button type="button" onClick={() => setModalOpen(false)}>
          我知道了
        </button>
      </Modal>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '6）children 还可以是函数吗？（了解 render props）',
            body: '进阶模式：children 是一个函数，组件内部把 data、loading 等「内部状态」通过调用 children({ data, loading }) 传给外部。这叫 render props 模式。\n\n初学先掌握「JSX 作为 children」即可；函数 children 在封装数据请求、逻辑复用时很有用，遇到再深入不迟。',
          },
          {
            type: 'code',
            title: 'children 还可以是函数吗？（了解 render props）',
            language: 'jsx',
            body: `// 进阶模式：children 是一个函数，把内部数据「反向」传给外部
function DataLoader({ url, children }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false) })
  }, [url])

  // children 是函数 → 调用它，传入 data 和 loading
  return children({ data, loading })
}

// 使用
<DataLoader url="/api/user">
  {({ data, loading }) =>
    loading ? <p>加载中...</p> : <p>{data.name}</p>
  }
</DataLoader>

// 初学先掌握「JSX 作为 children」即可，函数 children 后面遇到再深入`,
          },
          {
            type: 'list',
            title: '7）实战场景清单',
            ordered: false,
            items: [
              'Layout 布局：MainLayout 包页面',
              'Card 卡片：固定边框/标题，children 是正文',
              'Modal 弹窗：open/title/onClose + children 内容区',
              'Empty 空状态：图标固定，children 或 description 自定义文案',
              'Tabs 标签页：TabList 固定，TabPanel 用 children 或 map',
              'Button 组件：children 是按钮文字（<Button>保存</Button>）',
            ],
          },
          {
            type: 'list',
            title: '8）动手练习清单',
            ordered: true,
            items: [
              '写 Alert 组件，children 是提示正文，props 控制 type（success/error）',
              '写 Page 组件，header prop 放标题，children 放正文，footer prop 放操作按钮',
              '写 Modal，打开时 children 显示在弹窗中间，点遮罩关闭',
              '对比 Card 只用 children 和 Panel 用 header/footer/children 各适合什么场景',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '标签中间的内容 = children；外壳固定、内容自定义就用它。多个区域用 header/footer 等具名 prop。组合优于继承——别在 Card 里写死所有业务，把正文交给使用者。',
          },
        ],
      },
    },
  ],
}

export default components
