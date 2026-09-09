/**
 * 样式方案章节
 * 每个条目 = 一句话总结 + 详细步骤 + 完整可抄 demo + 易错点
 */
const styling = {
  id: 'styling',
  title: '样式方案入门',
  summary: 'CSS 文件怎么组织、className 怎么写、动态样式怎么切换、CSS Modules 局部作用域、CSS 变量做暗黑主题、React 里怎么写响应式——从入门到能上手真实项目的一套完整做法',
  order: 13,
  items: [
    {
      id: 'css-files-organization',
      title: 'CSS 文件组织：全局样式 + 组件旁挂 CSS',
      summary: 'index.css 管全站基础；每个组件文件夹里放同名 .css，import 进来用 className',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'React 没有「官方样式方案」，最常见入门做法就是普通 CSS 文件 + className。全局重置和 CSS 变量放 src/index.css；每个组件旁边放 ComponentName.css，在 js 顶部 import，JSX 里写 className="ComponentName"。',
          },
          {
            type: 'text',
            title: '1）是什么：React 里的 CSS 组织方式',
            body: 'React 组件描述 UI 结构（JSX），样式（CSS）通常放在单独的 .css 文件里，通过 className 把两者关联起来。\n\n这和传统 HTML「一个 .html + 一个 .css」类似，但按组件拆分：每个组件文件夹里，.js 和 .css 同名放一起，维护时好找。\n\nCreate React App、Vite 等工具都支持在 JS 里 import \'./Button.css\'，打包时会把 CSS 注入页面。\n\n入门阶段掌握「普通全局 CSS + 组件前缀命名」就够应付大多数项目；CSS Modules、Tailwind、styled-components 是团队选型后再学的高级方案。',
          },
          {
            type: 'table',
            title: '2）特点：全局 CSS vs 组件 CSS',
            headers: ['文件', '放什么', '作用范围', '命名建议'],
            rows: [
              ['src/index.css', '变量、reset、body、a/button', '全站', ':root、body、通用 .App-container'],
              ['Component/Component.css', '该组件独有样式', '全局（普通 import）', '.Component、.Component-title'],
              ['*.module.css（进阶）', '局部作用域样式', '仅 import 的组件', 'camelCase 类名'],
              ['内联 style={{}}', '运行时动态数值', '单个元素', '进度条宽度等'],
            ],
          },
          {
            type: 'text',
            title: '3）为什么：要分全局和组件 CSS',
            body: '如果不分工，会出现两类问题：\n\n① 把所有样式堆进 index.css——文件几千行，改 Header 要翻半天，还容易误伤别的组件。\n\n② 每个组件 CSS 里重复定义 body margin、颜色变量——改主题色要改 20 个文件。\n\n正确分工：\n\n• index.css：全站「基础设施」——CSS 变量、盒模型 reset、body 字体、链接/按钮默认样式。\n\n• 组件 CSS：只写这个组件用到的 class，用组件名前缀避免和别的文件冲突。\n\n因为普通 import 的 CSS 仍是全局生效的（不像 CSS Modules 自动哈希），所以「组件名前缀」不是可选，是必做——否则两个组件都写 .title 就会互相覆盖。',
          },
          {
            type: 'text',
            title: '4）怎么用：四步建立项目习惯',
            body: '第 1 步——认识文件结构：\n\nsrc/index.css 全局；components/Header/Header.css 配 Header/index.js；pages/Home/Home.css 配 Home/index.js。规律：js 和 css 同名同文件夹。\n\n第 2 步——index.css 放变量和 reset：\n\n:root 定义 --color-accent、--space-md 等；body 设 margin:0、font-family；a、button 基础样式。\n\n第 3 步——组件 CSS 用「组件名前缀」：\n\nHeader 里用 .Header、.Header-brand、.Header-link，不要 .title、.link 这种通用名。类似 BEM：块__元素--修饰符，初学掌握「组件名前缀」就够。\n\n第 4 步——JS 顶部 import CSS，JSX 写 className：\n\nimport \'./Button.css\'\n\n<button className="Button Button--primary">——注意是 className 不是 class（class 是 JS 保留字）。',
          },
          {
            type: 'code',
            title: '完整可抄 demo：全局 index.css',
            language: 'css',
            body: `/* src/index.css —— 全站基础样式，在 src/index.js 里 import 一次即可 */

/* 1. CSS 变量（自定义属性）：全站颜色/间距集中定义，改主题只改这里 */
:root {
  --color-text: #1f2a24;           /* 正文颜色 */
  --color-text-muted: #5c6b62;     /* 次要文字 */
  --color-bg: #faf9f6;             /* 页面背景 */
  --color-surface: #ffffff;        /* 卡片/面板背景 */
  --color-accent: #2f6b4f;         /* 强调色（链接、按钮） */
  --color-accent-hover: #245a42;   /* 强调色 hover 态 */
  --color-border: #e5e7eb;         /* 边框色 */
  --radius-md: 8px;                /* 圆角 */
  --space-sm: 8px;                 /* 小间距 */
  --space-md: 16px;                /* 中间距 */
  --space-lg: 24px;                /* 大间距 */
  --font-sans: system-ui, -apple-system, 'Segoe UI', sans-serif;
}

/* 2. 盒模型重置：border-box 让 padding 不会撑大元素总宽度 */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;                       /* 去掉浏览器默认 8px 外边距 */
  font-family: var(--font-sans);   /* 引用上面定义的变量 */
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.6;                /* 行高，提升可读性 */
}

/* 3. 全局元素默认样式（所有页面共享） */
a {
  color: var(--color-accent);
  text-decoration: none;         /* 去掉下划线，hover 再加 */
}

a:hover {
  text-decoration: underline;
}

button {
  font-family: inherit;            /* 继承 body 字体，避免按钮字体不一致 */
  cursor: pointer;
}

/* 4. 可选：通用布局容器，多个页面复用 */
.App-container {
  max-width: 960px;
  margin: 0 auto;                  /* 水平居中 */
  padding: var(--space-lg);
}`,
          },
          {
            type: 'code',
            title: '完整可抄 demo：Button 组件 + Button.css',
            language: 'jsx',
            body: `// ========== Button.js ==========
// import CSS：打包工具会把样式注入页面（普通 import = 全局生效）
import './Button.css'

/**
 * 通用按钮组件 —— 演示「组件名前缀」class 命名（BEM 风格）
 * - primary：是否主按钮样式（绿色背景）
 * - disabled：禁用态
 * - children：按钮文字（JSX 子节点）
 */
function Button({ children, primary = false, disabled = false, onClick, type = 'button' }) {
  // 动态 className：根据 props 拼接多个 class，filter 去掉空字符串
  const classNames = [
    'Button',                                      // 基础 class
    primary ? 'Button--primary' : 'Button--default', // 修饰符：主按钮 / 默认按钮
    disabled ? 'Button--disabled' : '',
  ]
    .filter(Boolean)   // 去掉 falsy 值（''、false）
    .join(' ')         // 拼成 "Button Button--primary" 字符串

  return (
    <button
      type={type}
      className={classNames}  // ★ JSX 里写 className，不是 HTML 的 class
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button

// ========== Button.css ==========
/*
.Button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: var(--radius-md);      引用 index.css 里的 CSS 变量
  border: 1px solid var(--color-border);
  font-size: 14px;
  transition: background 0.15s, border-color 0.15s;  过渡动画
}

.Button--default {
  background: var(--color-surface);
  color: var(--color-text);
}

.Button--default:hover:not(.Button--disabled) {
  background: #f3f4f6;                  :hover 伪类只能在 CSS 里写
}

.Button--primary {
  background: var(--color-accent);
  color: #fff;
  border-color: var(--color-accent);
}

.Button--primary:hover:not(.Button--disabled) {
  background: var(--color-accent-hover);
}

.Button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
*/`,
          },
          {
            type: 'code',
            title: '完整可抄 demo：Card 页面组件（对照本项目结构）',
            language: 'jsx',
            body: `// src/components/ProductCard/index.js —— 组件 + 同名 CSS 的典型结构
import './ProductCard.css'

function ProductCard({ product, onAddToCart }) {
  return (
    // className 前缀 ProductCard- 避免和其他组件的 .title、.btn 冲突
    <article className="ProductCard">
      <img
        className="ProductCard-image"
        src={product.image}
        alt={product.name}  // 无障碍：图片描述
      />
      <div className="ProductCard-body">
        <h3 className="ProductCard-title">{product.name}</h3>
        <p className="ProductCard-price">¥{product.price}</p>
        <button
          type="button"
          className="ProductCard-btn"
          onClick={() => onAddToCart(product.id)}
        >
          加入购物车
        </button>
      </div>
    </article>
  )
}

export default ProductCard

// src/components/ProductCard/ProductCard.css
/*
.ProductCard {
  background: var(--color-surface);   卡片白底
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;                     图片圆角不溢出
}

.ProductCard-image {
  width: 100%;
  height: 160px;
  object-fit: cover;                    裁剪填充，不变形
}

.ProductCard-body {
  padding: var(--space-md);
}

.ProductCard-title {
  margin: 0 0 var(--space-sm);
  font-size: 16px;
}

.ProductCard-price {
  margin: 0 0 var(--space-md);
  color: var(--color-accent);
  font-weight: 600;
}

.ProductCard-btn {
  width: 100%;
  padding: var(--space-sm);
  background: var(--color-accent);
  color: #fff;
  border: none;
  border-radius: var(--radius-md);
}
*/

// 使用方 pages/Shop/index.js
/*
import ProductCard from '../../components/ProductCard'
import './Shop.css'

function Shop() {
  const products = [...]
  return (
    <div className="Shop">
      <h1 className="Shop-title">商品列表</h1>
      <div className="Shop-grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onAddToCart={handleAdd} />
        ))}
      </div>
    </div>
  )
}
*/`,
          },
          {
            type: 'code',
            title: '对照本项目：Header 的 CSS 组织',
            language: 'css',
            body: `/* src/components/Header/Header.css —— 对照本项目源码阅读 */

/* 块：Header 组件根元素 */
.Header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

/* 元素：Header 内部容器，限制宽度 + flex 布局 */
.Header-inner {
  max-width: 960px;
  margin: 0 auto;              /* 水平居中 */
  padding: var(--space-md) var(--space-lg);
  display: flex;               /* 品牌名和导航横排 */
  align-items: center;         /* 垂直居中 */
  justify-content: space-between;  /* 两端对齐 */
}

/* 元素：品牌 logo 链接 */
.Header-brand {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
}

.Header-brand:hover {
  text-decoration: none;     /* 覆盖全局 a:hover 的下划线 */
  color: var(--color-accent);
}

/* 元素：导航区域 */
.Header-nav {
  display: flex;
  gap: var(--space-md);        /* flex 子项间距（现代 CSS） */
}

/* 元素：单个导航链接 */
.Header-link {
  color: var(--color-text-muted);
  font-size: 14px;
}

.Header-link:hover {
  color: var(--color-accent);
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：两个组件都叫 .title 会互相污染，加了组件前缀就不冲突',
            body: `import { useState } from 'react' // 引入 useState，用来切换「有没有加组件前缀」

// ⚠️ Demo 环境不能 import 真的 .css 文件，所以这里用「JS 对象」来模拟一份 CSS 文件。
// 真实项目里下面这两个对象就是 CardA.css 和 CardB.css，里面写的是 .title { ... }，
// 在组件顶部 import './CardA.css' 引进来。普通 import 的 CSS 是【全局】的：
// 两个文件写了同名 class，后加载的那份会把先加载的覆盖掉 —— 用对象合并正好能还原这个过程。

// ❌ 冲突版：两个「CSS 文件」都写了同一个类名 title
const sheetA_bad = { title: { color: '#1677ff', fontSize: 18, fontWeight: 700 } } // CardA.css → .title 蓝色大标题
const sheetB_bad = { title: { color: '#cf1322', fontSize: 12, fontStyle: 'italic' } } // CardB.css → .title 红色小斜体

// ✅ 前缀版：各自加上「组件名-」前缀，类名不再相同，谁也覆盖不了谁
const sheetA_good = { 'CardA-title': { color: '#1677ff', fontSize: 18, fontWeight: 700 } }
const sheetB_good = { 'CardB-title': { color: '#cf1322', fontSize: 12, fontStyle: 'italic' } }

const box = { flex: 1, padding: 12, border: '1px solid #e5e7eb', borderRadius: 8, background: '#fff' } // 两张卡片共用的外框

// 一张卡片：sheet 是「最终生效的全局样式表」，cls 是这个组件在 JSX 里写的 className
function Card({ sheet, cls, file, text }) {
  const applied = sheet[cls] || {} // 按类名去样式表里查 —— 相当于浏览器按 class 匹配 CSS 规则

  return (
    <div style={box}>
      <p style={{ margin: 0, fontSize: 12, color: '#8c8c8c' }}>{file}</p>
      <p style={{ margin: '2px 0 8px', fontSize: 12, color: '#8c8c8c' }}>JSX 里写的类名：{cls}</p>
      {/* 把查到的样式展开到这个标题上，就是浏览器最终画出来的效果 */}
      <h4 style={{ margin: 0, ...applied }}>{text}</h4>
    </div>
  )
}

export default function Demo() { // 约定：必须默认导出一个函数组件
  const [prefixed, setPrefixed] = useState(false) // false = 不加前缀（会冲突），true = 加了前缀

  // 模拟浏览器加载顺序：先 CardA.css 再 CardB.css，对象展开时后者覆盖前者
  const sheet = prefixed
    ? { ...sheetA_good, ...sheetB_good } // 类名不同 → 两条规则和平共处
    : { ...sheetA_bad, ...sheetB_bad } // 类名相同 → B 把 A 的 .title 整个盖掉

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui', maxWidth: 520 }}>
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12, cursor: 'pointer' }}>
        {/* 受控复选框：勾上就切到「加了组件前缀」的那套类名 */}
        <input type="checkbox" checked={prefixed} onChange={(e) => setPrefixed(e.target.checked)} />
        给类名加组件前缀（.CardA-title / .CardB-title）
      </label>

      <div style={{ display: 'flex', gap: 12 }}>
        <Card sheet={sheet} cls={prefixed ? 'CardA-title' : 'title'} file="CardA / CardA.css" text="我是 A 卡片标题" />
        <Card sheet={sheet} cls={prefixed ? 'CardB-title' : 'title'} file="CardB / CardB.css" text="我是 B 卡片标题" />
      </div>

      <p style={{ marginTop: 12, fontSize: 13, color: prefixed ? '#389e0d' : '#a8071a' }}>
        {prefixed
          ? '✅ 两个标题各是各的样式：蓝色大标题 + 红色小斜体，互不干扰。'
          : '❌ A 卡片明明写了蓝色大标题，却被 B 的 .title 覆盖成了红色小斜体 —— 这就是「全局 CSS 撞名」。'}
      </p>
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：styles 对象模式——把一个组件的样式抽出来集中管理、多处复用',
            body: `import { useState } from 'react' // 引入 useState，用来切换「紧凑模式」

// 【styles 对象模式】把这个组件用到的所有样式收进一个对象，JSX 里只写 style={styles.xxx}。
// 好处 ①JSX 只剩结构，读起来清爽 ②同一份样式多处复用 ③改一处，用到它的地方全都跟着改。
// 真实项目里这套「命名」思路和写 CSS 文件时的 .Card / .Card-title 完全一致。
const styles = {
  card: { // 卡片外框
    padding: 14,
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    background: '#fff',
    marginBottom: 10,
  },
  title: { margin: 0, fontSize: 16, fontWeight: 700, color: '#1f2a24' }, // 标题
  desc: { margin: '6px 0 0', fontSize: 13, color: '#5c6b62', lineHeight: 1.6 }, // 描述文字
  tag: { // 标签基础样式
    display: 'inline-block',
    marginTop: 8,
    padding: '2px 8px',
    borderRadius: 10,
    fontSize: 12,
    background: '#f3f4f6',
    color: '#5c6b62',
  },
  // 变体：先展开基础 tag，再只覆盖要改的那两个属性 —— 相当于 CSS 里的 .tag--hot
  tagHot: { background: '#fff1f0', color: '#cf1322' },
  // 紧凑模式的「覆盖层」：只写和默认值不同的部分
  cardCompact: { padding: 8, marginBottom: 6 },
  titleCompact: { fontSize: 14 },
}

const LIST = [ // 假数据：三条课程，用来演示「同一份 styles 复用多次」
  { id: 1, name: 'CSS 文件组织', desc: '全局 index.css + 组件旁挂同名 CSS', hot: false },
  { id: 2, name: '动态样式', desc: '状态切 className，运行时数值用 style', hot: true },
  { id: 3, name: 'CSS Modules', desc: '让样式只作用于当前组件，彻底告别撞名', hot: false },
]

export default function Demo() { // 默认导出组件
  const [compact, setCompact] = useState(false) // 是否开启紧凑模式

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui', maxWidth: 460 }}>
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12, cursor: 'pointer' }}>
        <input type="checkbox" checked={compact} onChange={(e) => setCompact(e.target.checked)} />
        紧凑模式（只覆盖 padding 和字号，其余样式照旧复用）
      </label>

      {LIST.map((item) => (
        // 展开合并：基础样式在前，覆盖层在后；不开紧凑模式时展开一个空对象，等于不改
        <div key={item.id} style={{ ...styles.card, ...(compact ? styles.cardCompact : {}) }}>
          <h4 style={{ ...styles.title, ...(compact ? styles.titleCompact : {}) }}>{item.name}</h4>
          {/* 非紧凑模式才显示描述：紧凑模式下藏起来，界面更密 */}
          {!compact && <p style={styles.desc}>{item.desc}</p>}
          {/* 标签变体：基础 tag + hot 覆盖，和 CSS 里 class="tag tag--hot" 是一个意思 */}
          <span style={{ ...styles.tag, ...(item.hot ? styles.tagHot : {}) }}>
            {item.hot ? '🔥 重点' : '选学'}
          </span>
        </div>
      ))}

      <p style={{ fontSize: 12, color: '#8c8c8c' }}>
        三张卡片共用同一个 styles 对象：想让全部卡片圆角变大，只改 styles.card.borderRadius 一处。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '5）样式方案一览（入门 → 进阶）',
            headers: ['方案', '写法', '作用域', '何时学'],
            rows: [
              ['普通 CSS + className', 'import ./X.css', '全局', '✅ 现在'],
              ['CSS Modules', 'import styles from ./X.module.css', '局部', '团队要求时'],
              ['Tailwind', 'className="flex gap-2"', '工具类', '团队要求时'],
              ['styled-components', 'styled.div`...`', '组件级', '可选进阶'],
              ['CSS-in-JS (Emotion)', 'css={{}}', '组件级', '可选进阶'],
            ],
          },
          {
            type: 'list',
            title: '6）CSS 组织自检清单',
            ordered: true,
            items: [
              'index.css 是否在入口 index.js 里 import 了？',
              '组件 CSS 是否在组件 js 顶部 import 了？',
              'class 名是否带组件前缀（.Header-link 而非 .link）？',
              'JSX 是否写 className 而不是 class？',
              '颜色/间距是否优先用 :root 里的 CSS 变量？',
              '组件独有样式是否没有写进 index.css？',
              '样式不生效时：检查 import 路径、className 拼写、大小写',
            ],
          },
          {
            type: 'text',
            title: '7）易错点汇总',
            body: '① JSX 里写 class 不是 className——class 是 JS 保留字，React 会警告或无效。\n\n② 普通 import 的 CSS 是全局的，两个组件不要用同名 .title——加前缀 .Home-title、.LessonDetail-title。\n\n③ 样式没生效：import 路径错、className 拼写和 CSS 不一致（区分大小写）、选择器优先级被覆盖。\n\n④ 在全局 CSS 里写 div { ... }、* { ... } 过于宽泛——污染全站，难排查。\n\n⑤ 组件 CSS 里重复定义 :root 变量——应只在 index.css 定义一次，组件里 var(--color-accent) 引用。\n\n⑥ 忘记 import CSS 文件——JSX className 写了但页面无样式，Console 无报错，最容易忽略。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '全局 index.css 管变量和 reset；组件旁挂同名 .css，className 关联。普通 CSS 是全局的，类名必须组件前缀。JSX 用 className 不用 class；颜色间距用 CSS 变量集中管理。',
          },
        ],
      },
    },
    {
      id: 'dynamic-class-style',
      title: '动态样式：条件 className + 内联 style',
      summary: '状态切换样式优先改 class；宽度百分比、拖拽坐标等运行时数值用 style',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '大部分样式写在 CSS 文件里，用 className 切换。运行时数值才用 style={{}}。\n\n单位对照（极易混）：`.css` 里 `top:10` ❌ 必须 `top:10px`（只有 `0` 可省略单位）；React `style={{ top: 10 }}` ✅ 数字会自动当成 px。百分比始终写字符串：`width: \'50%\'`。',
          },
          {
            type: 'text',
            title: '1）是什么：动态样式两种手段',
            body: 'React 里组件的样式会随 props 和 state 变化——Tab 激活态、表单错误红框、主题深浅、进度条百分比。\n\n两种手段：\n\n① 动态 className——在 JS 里根据条件拼接不同的 class 名，具体颜色/边框/动画写在 CSS 文件里。\n\n② 内联 style——在 JSX 上写 style={{ key: value }}，值来自 state/props 的计算结果。\n\n选择原则：能写 class 就不写 style。class 支持 :hover、@media、transition；style 适合「只有运行时才知道的数字」。',
          },
          {
            type: 'table',
            title: '2）特点：className vs style 对照',
            headers: ['对比', 'className + CSS', '内联 style'],
            rows: [
              ['定义位置', '.Tab--active { color: blue }', 'style={{ color: "blue" }}'],
              ['hover/媒体查询', '✅ 原生支持', '❌ 不支持'],
              ['过渡动画', '✅ transition 在 CSS', '部分属性可 transition'],
              ['运行时数值', '需 CSS 变量或 many classes', '✅ width: `${p}%`'],
              ['优先级', '可被更高优先级覆盖', '高于 class（除 !important）'],
              ['维护性', '样式集中 CSS 文件', '样式散在 JSX 里'],
            ],
          },
          {
            type: 'text',
            title: '3）为什么：优先 class，慎用 style',
            body: '如果把所有样式都写进 style={{ ... }}：\n\n• JSX 变得又长又难读，颜色和布局逻辑混在组件逻辑里\n• 无法写 :hover、:focus、@media (max-width: 768px)\n• 设计师改样式要动 JS 文件，而不是 CSS\n• 相同样式难以复用\n\n正确分工：\n\n• 「状态类」——.active、.is-error、.Tab--active、.ThemeBox--dark 写在 CSS，JS 只负责「加不加这个 class」\n\n• 「动态数值」——进度条 width: `${percent}%`、拖拽 left: `${x}px`、柱状图 height: `${value}px` 用 style\n\n• 「组合用法」——className 管基础样式，style 只覆盖那一两个动态属性',
          },
          {
            type: 'text',
            title: '4）单位铁律：CSS 文件 vs React style={{}}（必看）',
            body: '这是初学最容易踩的坑，和布局章「盒子模型」里的单位规则对照着记。\n\n**① 写在 `.css` / `<style>` 里：**\n- 距离类属性（`width`/`height`/`margin`/`padding`/`top`/`left`/`gap`…）**数字必须带单位**\n- ✅ `top: 10px;`　❌ `top: 10;`（常被浏览器直接忽略）\n- ✅ **只有 `0` 可以省略单位**：`margin: 0;`\n- `%` 相对父容器：`width: 50%;`\n\n**② 写在 React `style={{ }}` 里：**\n- 属性名用**驼峰**：`marginTop`、`paddingLeft`、`backgroundColor`（不是 `margin-top`）\n- 值可以是**数字或字符串**\n- **数字会自动翻译成 px**：`style={{ top: 10 }}` 等价于 `style={{ top: \'10px\' }}`\n- 所以 React 里写 `margin: 16`、`width: 200` 是合法且常见的\n- **百分比、或其它单位必须用字符串**：`style={{ width: \'50%\' }}`、`style={{ marginTop: \'1.5rem\' }}`\n- `0` 写数字 `0` 即可：`style={{ margin: 0 }}`\n\n口诀：**CSS 文件手写 px；React 数字自动 px；百分号永远加引号。**',
          },
          {
            type: 'table',
            title: '同一意图：CSS vs React 怎么写',
            headers: ['意图', '.css 写法', 'React style={{}}'],
            rows: [
              ['上偏移 10px', 'top: 10px;', "style={{ top: 10 }} 或 top: '10px'"],
              ['上偏移漏单位', 'top: 10; ❌ 无效', 'style={{ top: 10 }} ✅ 自动当 px'],
              ['四边 margin 16px', 'margin: 16px;', 'style={{ margin: 16 }}'],
              ['上下 8、左右 16', 'padding: 8px 16px;', "style={{ padding: '8px 16px' }}"],
              ['宽一半', 'width: 50%;', "style={{ width: '50%' }}"],
              ['清零', 'margin: 0;', 'style={{ margin: 0 }}'],
              ['动态进度', '（不便）', 'style={{ width: `${percent}%` }}'],
            ],
            note: '简写多值（如 8px 16px）在 style 里通常写成一个字符串，不能写成两个裸数字。',
          },
          {
            type: 'code',
            title: '对照 demo：CSS 必须带 px；React 数字 = px',
            language: 'jsx',
            body: `/**
 * 单位对照（教学示意）
 * - 真正项目里：固定样式仍优先写 .css + className
 * - 这里用 style 演示「数字自动变 px」
 */
function UnitDemo({ percent = 40 }) {
  return (
    <div>
      {/* ✅ 数字 10 → 浏览器收到 top: 10px */}
      <div style={{ position: 'relative', top: 10, marginBottom: 16 }}>
        style 里 top: 10（自动 px）
      </div>

      {/* ✅ 字符串显式写单位，和上面等价 */}
      <div style={{ position: 'relative', top: '10px', marginBottom: 16 }}>
        style 里 top: '10px'（手动字符串）
      </div>

      {/* ✅ 百分比必须是字符串，数字 50 会变成 50px 而不是 50% */}
      <div
        style={{
          width: \`\${percent}%\`, // 动态百分比
          height: 12,
          background: '#2f6b4f',
          borderRadius: 6, // 数字 → 6px
        }}
      />

      {/*
        若写成 width: percent（纯数字），会变成 width: 40px，不是 40%！
        这是 style 数字自动加 px 时最容易踩的坑。
      */}

      {/* margin / padding 简写：多值请用字符串 */}
      <div style={{ margin: '12px 24px', padding: 8 }}>
        margin: '12px 24px'；padding: 8 → 8px
      </div>
    </div>
  )
}

export default UnitDemo`,
          },
          {
            type: 'text',
            title: '5）怎么用：拼接 className 的三种写法',
            body: '写法 1——三元表达式（最常见）：\n\nclassName={active ? \'Tab Tab--active\' : \'Tab\'}\n\n写法 2——数组 filter join（多 class 推荐）：\n\n[\'Tab\', active && \'Tab--active\', disabled && \'Tab--disabled\'].filter(Boolean).join(\' \')\n\n写法 3——模板字符串：\n\n`Tab ${active ? \'Tab--active\' : \'\'}`\n\nstyle 写法：\n\nstyle={{ width: `${percent}%`, backgroundColor: isError ? \'red\' : \'#ccc\' }}\n\n注意：style 的值是对象，外层 {} 是 JSX 表达式，内层 {} 是 JS 对象。属性名驼峰：fontSize、zIndex、backgroundColor。',
          },
          {
            type: 'code',
            title: '完整可抄 demo：Tab 切换（动态 className）',
            language: 'jsx',
            body: `import { useState } from 'react'
import './Tabs.css'

/**
 * 单个 Tab 按钮 —— 演示「状态切换 className」
 * active=true 时加 Tab--active class，具体样式写在 CSS 文件里
 */
function Tab({ active, children, onClick }) {
  const className = [
    'Tab',                        // 基础样式
    active ? 'Tab--active' : '',  // 激活态：条件拼接 class
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  )
}

function Tabs() {
  const [activeKey, setActiveKey] = useState('intro')  // 当前选中的 tab key

  const tabs = [
    { key: 'intro', label: '介绍' },
    { key: 'code', label: '代码' },
    { key: 'tip', label: '提示' },
  ]

  return (
    <div className="Tabs">
      <div className="Tabs-header" role="tablist">
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            active={activeKey === tab.key}  // 当前 tab 是否激活
            onClick={() => setActiveKey(tab.key)}
          >
            {tab.label}
          </Tab>
        ))}
      </div>
      <div className="Tabs-panel">
        {/* 条件渲染：只显示当前 tab 对应的内容 */}
        {activeKey === 'intro' && <p>这是介绍内容</p>}
        {activeKey === 'code' && <pre>const x = 1</pre>}
        {activeKey === 'tip' && <p>记得保存文件</p>}
      </div>
    </div>
  )
}

/* Tabs.css —— hover、边框等放 CSS，不放 JS
.Tab {
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: #666;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}
.Tab--active {
  color: #2563eb;
  border-bottom-color: #2563eb;
  font-weight: 600;
}
.Tabs-header {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid #e5e7eb;
}
.Tabs-panel {
  padding: 16px 0;
}
*/

export default Tabs`,
          },
          {
            type: 'code',
            title: '完整可抄 demo：表单校验状态（多 class 组合）',
            language: 'jsx',
            body: `import { useState } from 'react'

/**
 * 表单输入框 —— 演示「多 class 组合」：基础 + 错误态 + 有内容态
 */
function TextField({ label, value, onChange, error }) {
  const inputClass = [
    'TextField-input',
    error ? 'TextField-input--error' : '',      // 校验失败：红框
    value ? 'TextField-input--filled' : '',     // 有内容：略深边框
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="TextField">
      <label className="TextField-label">{label}</label>
      <input
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="TextField-error">{error}</p>}
    </div>
  )
}

function SignupForm() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  function validateEmail(val) {
    if (!val) return '邮箱不能为空'
    if (!val.includes('@')) return '邮箱格式不对'
    return ''
  }

  function handleEmailChange(val) {
    setEmail(val)
    setEmailError(validateEmail(val))  // 实时校验，动态切换 --error class
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <TextField
        label="邮箱"
        value={email}
        onChange={handleEmailChange}
        error={emailError}
      />
      <button type="submit" disabled={!!emailError || !email}>
        注册
      </button>
    </form>
  )
}

/* CSS 片段 —— 错误态样式放 CSS，JS 只负责加不加 class
.TextField-input {
  border: 1px solid #d1d5db;
  padding: 8px 12px;
  border-radius: 6px;
}
.TextField-input--error {
  border-color: #ef4444;
  background: #fef2f2;
}
.TextField-input--filled {
  有内容时略深边框
}
.TextField-error {
  color: #ef4444;
  font-size: 12px;
  margin-top: 4px;
}
*/

export default SignupForm`,
          },
          {
            type: 'code',
            title: '完整可抄 demo：进度条 + 评分（style 动态数值）',
            language: 'jsx',
            body: `import { useState, useEffect } from 'react'

/**
 * 进度条 —— 演示「运行时数值用 style」
 * 宽度百分比只有渲染时才知道，不适合写死在 CSS class 里
 */
function ProgressBar({ percent, label }) {
  const safe = Math.min(100, Math.max(0, percent))  // 限制 0~100

  return (
    <div className="Progress">
      <div className="Progress-label">
        {label}：{safe}%
      </div>
      <div className="Progress-track">
        {/* style={{ width: '37%' }} —— 外层 {} 是 JSX 表达式，内层 {} 是 JS 对象 */}
        <div
          className="Progress-bar"
          style={{ width: \`\${safe}%\` }}  // 动态宽度，必须带 % 单位
        />
      </div>
    </div>
  )
}

function StarRating({ score, max = 5 }) {
  return (
    <div className="StarRating" aria-label={\`评分 \${score} 星\`}>
      {Array.from({ length: max }, (_, i) => {
        const filled = i < score
        return (
          <span
            key={i}
            className={filled ? 'StarRating-star--filled' : 'StarRating-star'}
            style={{
              // style 属性名用驼峰：backgroundColor 不是 background-color
              color: filled ? '#f59e0b' : '#d1d5db',
              fontSize: 24,  // 数字会自动加 px
            }}
          >
            ★
          </span>
        )
      })}
    </div>
  )
}

function DynamicStyleDemo() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 10))
    }, 500)
    return () => clearInterval(timer)  // 清理定时器
  }, [])

  return (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <h2>动态样式 Demo</h2>
      <ProgressBar percent={progress} label="加载进度" />
      <StarRating score={Math.round(progress / 20)} />
    </div>
  )
}

/* Progress.css —— 静态样式放 CSS，动态 width 放 style
.Progress-track {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}
.Progress-bar {
  height: 100%;
  background: #2563eb;
  transition: width 0.3s ease;   CSS transition 让宽度变化有动画
}
*/

export default DynamicStyleDemo`,
          },
          {
            type: 'code',
            title: '完整可抄 demo：主题色切换（CSS 变量 + class）',
            language: 'jsx',
            body: `import { useState } from 'react'
import './ThemeBox.css'

/**
 * 主题切换 Demo —— CSS 变量 + 根 class 切换
 *
 * 原理：在根 div 切换 ThemeBox--dark class，
 * CSS 里 .ThemeBox--dark 重新定义 --tb-bg 等变量，
 * 子元素用 var(--tb-bg) 引用，全部跟着变色
 */
function ThemeBox() {
  const [dark, setDark] = useState(false)

  return (
    // 根据 state 拼接 class：浅色只有 ThemeBox，深色加 ThemeBox--dark
    <div className={dark ? 'ThemeBox ThemeBox--dark' : 'ThemeBox'}>
      <h3>主题切换（CSS 变量）</h3>
      <p>当前：{dark ? '深色' : '浅色'}</p>
      <button type="button" onClick={() => setDark((d) => !d)}>
        切换主题
      </button>
      <div className="ThemeBox-card">
        卡片内容会随 CSS 变量变色
      </div>
    </div>
  )
}

/* ThemeBox.css
.ThemeBox {
  --tb-bg: #ffffff;        局部 CSS 变量，只在这个组件 subtree 生效
  --tb-text: #111827;
  --tb-card: #f3f4f6;
  padding: 24px;
  background: var(--tb-bg);
  color: var(--tb-text);
  min-height: 200px;
  transition: background 0.2s, color 0.2s;   主题切换过渡动画
}
.ThemeBox--dark {
  --tb-bg: #111827;        只改变量值，不用逐个元素写 style
  --tb-text: #f9fafb;
  --tb-card: #1f2937;
}
.ThemeBox-card {
  margin-top: 16px;
  padding: 16px;
  background: var(--tb-card);
  border-radius: 8px;
}
*/

export default ThemeBox`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：点一下切换亮色 / 暗色，整块界面的配色一起变',
            body: `import { useState } from 'react' // 引入 useState 保存当前主题名

// 【主题 = 一张配色表】把两套配色写成对象映射，切换主题 = 换一张表。
// 这样新增第三套主题（比如「护眼绿」）只要再加一个 key，组件里一行都不用改。
const THEMES = {
  light: { // 亮色主题
    name: '亮色',
    bg: '#ffffff', // 面板背景
    text: '#1f2a24', // 正文颜色
    sub: '#5c6b62', // 次要文字
    card: '#f5f6f5', // 卡片背景
    border: '#e5e7eb', // 边框
    accent: '#2f6b4f', // 强调色（按钮、进度条）
  },
  dark: { // 暗色主题
    name: '暗色',
    bg: '#111827',
    text: '#f9fafb',
    sub: '#9ca3af',
    card: '#1f2937',
    border: '#374151',
    accent: '#4ade80',
  },
}

export default function Demo() { // 默认导出组件
  const [mode, setMode] = useState('light') // 当前主题名：'light' 或 'dark'
  const t = THEMES[mode] // 按名字取出这一套配色，下面所有颜色都从 t 里读

  return (
    // 外层容器：背景和文字色来自主题表；transition 让换色有 0.2s 渐变，不会闪
    <div
      style={{
        padding: 18,
        borderRadius: 10,
        fontFamily: 'system-ui',
        background: t.bg,
        color: t.text,
        border: '1px solid ' + t.border, // 字符串拼接，避免用模板字符串
        transition: 'background 0.2s, color 0.2s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <strong style={{ fontSize: 15 }}>当前主题：{t.name}</strong>
        {/* 切换按钮：setMode 里用函数式写法，根据旧值算新值 */}
        <button
          type="button"
          onClick={() => setMode((m) => (m === 'light' ? 'dark' : 'light'))}
          style={{
            padding: '6px 14px',
            borderRadius: 6,
            cursor: 'pointer',
            border: '1px solid ' + t.accent, // 按钮边框也跟着主题走
            background: t.accent,
            color: mode === 'light' ? '#fff' : '#111827', // 暗色主题下强调色偏亮，文字要用深色才看得清
          }}
        >
          {mode === 'light' ? '🌙 切到暗色' : '☀️ 切到亮色'}
        </button>
      </div>

      {/* 三张卡片：背景/边框全部读同一份主题表，所以一次切换就整体换肤 */}
      {[
        { id: 1, title: '订单总数', value: '1,286' },
        { id: 2, title: '今日新增', value: '42' },
        { id: 3, title: '待处理', value: '7' },
      ].map((c) => (
        <div
          key={c.id}
          style={{
            padding: 12,
            marginBottom: 8,
            borderRadius: 8,
            background: t.card,
            border: '1px solid ' + t.border,
            transition: 'background 0.2s',
          }}
        >
          <p style={{ margin: 0, fontSize: 12, color: t.sub }}>{c.title}</p>
          <p style={{ margin: '4px 0 0', fontSize: 20, fontWeight: 700, color: t.accent }}>{c.value}</p>
        </div>
      ))}

      <p style={{ margin: 0, fontSize: 12, color: t.sub }}>
        真实项目里更推荐：根元素切一个 class（.app--dark），配色写成 CSS 变量 —— 下一节专门讲。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：一个列表项的 hover / selected / disabled 三种状态怎么拼样式',
            body: `import { useState } from 'react' // 引入 useState 保存「选中了谁」和「鼠标停在谁身上」

// 把每种状态的样式单独抽成对象 —— 相当于 CSS 里的 .Item / .Item--hover / .Item--selected / .Item--disabled
const itemBase = { // 常态：所有列表项都有的基础样式
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 12px',
  marginBottom: 6,
  borderRadius: 8,
  border: '1px solid #e5e7eb',
  background: '#fff',
  cursor: 'pointer',
  transition: 'background 0.15s, border-color 0.15s',
}
const itemHover = { background: '#f5f6f5', borderColor: '#d9d9d9' } // 鼠标悬停
const itemSelected = { background: '#f0f7f3', borderColor: '#2f6b4f', fontWeight: 700 } // 已选中
const itemDisabled = { opacity: 0.45, cursor: 'not-allowed', background: '#fafafa' } // 禁用

const LIST = [ // 假数据：第 3 条故意设成禁用，方便你看三种状态的差别
  { id: 'a', name: '标准快递', note: '3-5 天', disabled: false },
  { id: 'b', name: '顺丰次日达', note: '明天送达', disabled: false },
  { id: 'c', name: '同城 2 小时达', note: '你所在城市暂不支持', disabled: true },
]

export default function Demo() { // 默认导出组件
  const [selectedId, setSelectedId] = useState('a') // 当前选中项的 id
  const [hoverId, setHoverId] = useState(null) // 当前鼠标悬停项的 id，null 表示没停在任何一项上

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui', maxWidth: 420 }}>
      <p style={{ margin: '0 0 10px', fontSize: 13, color: '#5c6b62' }}>把鼠标移上去、点一下试试，第三项是禁用的点不动：</p>

      {LIST.map((item) => {
        const selected = item.id === selectedId // 这一项是不是被选中了
        const hovered = item.id === hoverId && !item.disabled // 禁用项不给 hover 效果

        // 【拼样式的顺序很关键】优先级低的放前面，后面的会覆盖前面的同名属性：
        // 基础 → 悬停 → 选中 → 禁用（禁用优先级最高，所以放最后）
        const style = {
          ...itemBase,
          ...(hovered ? itemHover : {}), // 三元 + 展开空对象：条件不成立时等于什么都不加
          ...(selected ? itemSelected : {}),
          ...(item.disabled ? itemDisabled : {}),
        }

        return (
          <div
            key={item.id}
            style={style}
            // 真实项目里 hover 应该交给 CSS 的 :hover 写，性能更好、代码更短；
            // 这里因为 Demo 环境没有 CSS 文件，才用 JS 事件手动记录悬停状态
            onMouseEnter={() => setHoverId(item.id)}
            onMouseLeave={() => setHoverId(null)}
            onClick={() => {
              if (item.disabled) return // 禁用项：直接 return，点了没反应
              setSelectedId(item.id)
            }}
          >
            <span>
              {selected ? '● ' : '○ '}
              {item.name}
            </span>
            <span style={{ fontSize: 12, color: '#8c8c8c', fontWeight: 400 }}>{item.note}</span>
          </div>
        )
      })}

      <p style={{ fontSize: 12, color: '#8c8c8c' }}>
        当前选中：{LIST.find((i) => i.id === selectedId).name}
        ；鼠标位置：{hoverId ? LIST.find((i) => i.id === hoverId).name : '（不在列表上）'}
      </p>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '5）动态样式场景选型',
            headers: ['场景', '推荐', '示例'],
            rows: [
              ['Tab/按钮激活态', 'className 切换', 'Tab--active'],
              ['表单错误红框', 'className + CSS', 'TextField-input--error'],
              ['深色/浅色主题', '根 class + CSS 变量', 'ThemeBox--dark'],
              ['进度条宽度', 'style 百分比', 'width: `${p}%`'],
              ['拖拽位置', 'style 坐标', 'left/top'],
              ['hover 变色', 'CSS :hover', '不用 JS'],
            ],
          },
          {
            type: 'list',
            title: '6）动态样式自检清单',
            ordered: true,
            items: [
              '状态切换（active/error/disabled）是否用 class 而不是全写 style？',
              '多 class 拼接是否 filter(Boolean).join 避免多余空格？',
              'style 是否是对象 {{ }} 而不是字符串 "color:red"？',
              'style 属性是否驼峰：backgroundColor、fontSize？',
              '百分比/px 等是否带了单位（width: "50%" 不是 50）？',
              '主题切换是否考虑 CSS 变量 + 根 class，而非每个元素 inline？',
            ],
          },
          {
            type: 'text',
            title: '7）易错点汇总',
            body: '① class 写成 className，for 写成 htmlFor——HTML 属性在 JSX 里有几个特殊名字。\n\n② style 里是对象不是字符串：style="color:red" 错，style={{ color: \'red\' }} 对。\n\n③ CSS 属性驼峰：background-color → backgroundColor，z-index → zIndex。\n\n④ 数字会自动加 px（fontSize: 14 → 14px），但 width: 50 不会变成 50%，必须写 \'50%\'。\n\n⑤ 把所有样式塞 style——难维护、没法写 hover；状态类应放 CSS。\n\n⑥ 条件 class 很多时可考虑 clsx / classnames 库，初学手写数组即可。\n\n⑦ style 与 className 同时存在时，style 优先级更高——故意覆盖时用，否则可能困惑「为什么 CSS 改了不生效」。',
          },
          {
            type: 'list',
            title: '8）动手练习清单',
            ordered: true,
            items: [
              '做 Tabs 组件，切换时观察 Tab--active class 变化（DevTools Elements）',
              '做带校验的邮箱输入框，错误时加 TextField-input--error',
              '做进度条，用 style width 绑定 state，CSS 里加 transition',
              '做 ThemeBox，切换根 class 观察 CSS 变量变化',
              '故意写 style="color:red" 看报错，改成正确对象写法',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '状态样式切 class（.active、--error），运行时数字用 style（width、left）。style 是 {{ 驼峰 }} 对象；hover/动画放 CSS。主题用根 class 改 CSS 变量。className 管常态，style 只管动态那一两个值。',
          },
        ],
      },
    },
    {
      id: 'css-modules',
      title: 'CSS Modules：让样式只作用于当前组件',
      summary: '文件名改成 Xxx.module.css，import styles 后写 className={styles.card}；编译时自动加哈希，从此不用担心类名撞车',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '把 Card.css 改名成 Card.module.css，然后写 `import styles from \'./Card.module.css\'`、`className={styles.card}`。构建工具会把 `.card` 编译成 `.Card_card__1a2b3` 这种带哈希的唯一类名，别的组件再写 `.card` 也撞不上。',
          },
          {
            type: 'text',
            title: '1）先说清问题：普通 CSS 的「全局」到底有多危险',
            body: '上一节反复强调「类名要加组件前缀」，那是因为**普通 import 进来的 CSS 是全局生效的**——浏览器眼里只有一张大样式表，不管这条规则写在哪个文件里。\n\n于是会出现这些真实事故：\n\n• 你写了 `.title { color: blue }`，同事在另一个组件里写了 `.title { color: red }`。谁的生效？取决于打包后谁在后面——而这个顺序会随着 import 顺序变化，**今天好好的，明天加个新页面就坏了**。\n\n• 你想删掉一段没用的 CSS，但不敢删——因为不知道全站还有没有别的地方在用这个类名。CSS 会越堆越多，没人敢清理。\n\n• 起名字变成负担：`.Header-nav-link-active-mobile`，又长又难记，还是可能撞。\n\n「加组件前缀」是靠**人的自觉**来避免冲突；CSS Modules 是靠**工具**来保证不冲突。后者才是可靠的。',
          },
          {
            type: 'text',
            title: '2）CSS Modules 的原理：编译时把类名改成唯一的',
            body: 'CSS Modules 不是一个新语言，你写的还是**普通 CSS**。它做的事只有一件：\n\n**在打包时，把每个类名改写成一个全局唯一的名字，并把「你写的名字 → 改写后的名字」这张对照表交给 JS。**\n\n你在 `Card.module.css` 里写：\n\n```\n.card { padding: 16px; }\n```\n\n构建后浏览器里实际存在的是：\n\n```\n.Card_card__1a2b3 { padding: 16px; }\n```\n\n同时 `import styles from \'./Card.module.css\'` 拿到的 `styles` 就是那张对照表：\n\n```\n{ card: \'Card_card__1a2b3\' }\n```\n\n所以 `className={styles.card}` 最终渲染出来是 `class="Card_card__1a2b3"`。\n\n关键点：**哈希是按「文件路径 + 类名」算的**。所以另一个 `Modal.module.css` 里同样写 `.card`，会被编译成 `Modal_card__9f8e7`——两者天然不同，永远不可能互相覆盖。这就是「局部作用域（scoped）」的含义。',
          },
          {
            type: 'text',
            title: '3）命名要求：文件名必须带 .module',
            body: '这是 CRA / Vite / Next.js 共同的约定，**不是可选的**：\n\n• 文件必须叫 `something.module.css`（或 `.module.scss`、`.module.less`）。少了 `.module` 这一段，工具就当普通全局 CSS 处理，import 出来的 `styles` 会是空对象，`className={styles.card}` 变成 `undefined`，样式一点都不生效——这是新手第一号踩坑点。\n\n• 建议文件名和组件同名：`Card/index.js` 配 `Card/Card.module.css`。\n\n• **类名建议用小驼峰**：`.cardTitle` 而不是 `.card-title`。因为在 JS 里 `styles.cardTitle` 可以直接点出来；写短横线的话只能用 `styles[\'card-title\']`，别扭。\n\n• CRA 和 Vite 都**开箱支持**，不用装任何东西、不用改配置，改个文件名就能用。',
          },
          {
            type: 'code',
            title: '完整可抄 demo：Card.module.css + Card/index.js 两个文件对照',
            language: 'jsx',
            body: `/* ========== 文件 1：src/components/Card/Card.module.css ========== */
/*
  注意文件名里的 .module —— 少了它就退化成普通全局 CSS。
  里面写的就是普通 CSS，没有任何新语法。
  类名用小驼峰，方便 JS 里 styles.cardTitle 直接点出来。
*/
/*
.card {
  padding: 16px;                     卡片内边距
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}

.cardTitle {                         小驼峰命名，对应 JS 里的 styles.cardTitle
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.cardDesc {
  margin: 0;
  font-size: 13px;
  color: #5c6b62;
}

.highlight {                         修饰类：需要时和 .card 一起用
  border-color: #2f6b4f;
  box-shadow: 0 0 0 2px rgba(47, 107, 79, 0.12);
}

.card:hover {                        :hover 等伪类照常写，CSS Modules 完全支持
  border-color: #d9d9d9;
}
*/

// ========== 文件 2：src/components/Card/index.js ==========
// ★ 关键写法：import 一个默认变量（习惯叫 styles），它是「你写的类名 → 编译后类名」的对照表
// 普通 CSS 写的是 import './Card.css'（没有变量）；CSS Modules 必须 import 出一个变量
import styles from './Card.module.css'

/**
 * 卡片组件
 * - title / desc：显示的文字
 * - highlight：是否高亮（演示「多个 class 拼接」）
 */
function Card({ title, desc, highlight = false }) {
  return (
    // styles.card 的值是字符串 'Card_card__1a2b3'，直接交给 className
    // 多个 class 拼接：和普通 CSS 一样用数组 filter + join，只是每一项都要从 styles 上取
    <div
      className={[styles.card, highlight ? styles.highlight : '']
        .filter(Boolean) // 去掉空字符串，避免出现两个连续空格
        .join(' ')}      // 拼成 "Card_card__1a2b3 Card_highlight__4c5d6"
    >
      {/* 每一个类名都要写成 styles.xxx，不能再写成字符串 "cardTitle" */}
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{desc}</p>
    </div>
  )
}

export default Card

// ========== 文件 3：使用方 src/pages/Home/index.js ==========
// 使用方完全不需要知道 Card 内部用了什么类名 —— 这正是「样式也被封装进组件」的意义
/*
import Card from '../../components/Card'

function Home() {
  return (
    <div>
      <Card title="普通卡片" desc="用的是默认样式" />
      <Card title="高亮卡片" desc="多加了一个 highlight 类" highlight />
    </div>
  )
}
*/`,
          },
          {
            type: 'text',
            title: '4）三个必会技巧：拼接、动态取、:global',
            body: '**① 多个 class 拼接**\n\n最常见的三种写法，任选其一：\n\n- 数组法（推荐）：`[styles.btn, active && styles.btnActive].filter(Boolean).join(\' \')`\n- 模板字符串：`` `${styles.btn} ${active ? styles.btnActive : \'\'}` ``\n- 装个 `clsx` 库：`clsx(styles.btn, { [styles.btnActive]: active })`——真实项目里非常常用，装一下 `npm i clsx` 即可。\n\n**② 按变量动态取类名**\n\n类名存在变量里时用中括号：`className={styles[\'size\' + size]}`，或者做一张映射表 `const sizeMap = { sm: styles.small, lg: styles.large }`。注意别写成 `styles.sizesm`——点语法取不到拼出来的名字。\n\n**③ `:global` 逃生舱**\n\n有时候你需要一个**不被哈希**的真实类名：比如要覆盖第三方 UI 库（antd）的内部类名，或者要配合动画库约定的类名。这时用 `:global`：\n\n```\n:global(.ant-btn) { border-radius: 8px; }      /* 整条规则不加哈希 */\n\n.wrapper :global(.ant-btn) { color: red; }      /* 只在本组件内部生效，但目标类名不哈希 */\n```\n\n**第二种写法是最实用的**：外层 `.wrapper` 仍然是局部的，所以这条覆盖只影响本组件里的 antd 按钮，不会波及全站。\n\n反过来，`:local(...)` 可以在 `:global` 块里切回局部，但很少用到。',
          },
          {
            type: 'code',
            title: '完整可抄 demo：按钮组件（拼接 + 动态取名 + :global 覆盖第三方样式）',
            language: 'jsx',
            body: `import styles from './Button.module.css'

/**
 * 按钮组件 —— 演示 CSS Modules 的三种典型用法
 * - variant：primary / ghost，用「映射表」按变量取类名
 * - size：sm / md / lg，用「字符串拼接 + 中括号」取类名
 * - active：布尔修饰，用数组拼接
 */

// 映射表：把 props 的取值映射到 styles 上的类名。比 styles['btn' + variant] 更安全，
// 因为拼错了会得到 undefined 而不报错，映射表至少能在这里一眼看全有哪些取值
const VARIANT_MAP = {
  primary: styles.btnPrimary,
  ghost: styles.btnGhost,
}

function Button({ children, variant = 'primary', size = 'md', active = false, onClick }) {
  const className = [
    styles.btn,                      // 基础类，永远有
    VARIANT_MAP[variant],            // 按 props 从映射表取；取不到就是 undefined，会被 filter 掉
    styles['size' + size],           // 中括号动态取名：size='lg' → styles.sizelg（CSS 里要写 .sizelg）
    active ? styles.btnActive : '',  // 布尔修饰类
  ]
    .filter(Boolean)                 // 干掉 undefined 和 ''
    .join(' ')                       // 用空格连成最终的 class 字符串

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button

/* ========== Button.module.css ==========
.btn {
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
}

.btnPrimary { background: #2f6b4f; color: #fff; }
.btnGhost   { background: transparent; color: #2f6b4f; border-color: #2f6b4f; }

.sizesm { padding: 4px 10px; font-size: 12px; }      与 styles['size' + 'sm'] 对应
.sizemd { padding: 8px 16px; font-size: 14px; }
.sizelg { padding: 12px 22px; font-size: 16px; }

.btnActive { box-shadow: 0 0 0 2px rgba(47, 107, 79, 0.2); }

  :global 逃生舱 —— 覆盖 antd 按钮的内部类名。
  .btn 是局部的（带哈希），所以这条覆盖只在本组件内部生效，不会污染全站
.btn :global(.ant-btn-icon) {
  margin-right: 4px;
}
========================================= */`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：亲眼看看 CSS Modules 编译前后的类名长什么样',
            body: `import { useState } from 'react' // 引入 useState，用来切换「普通 CSS / CSS Modules」

// ⚠️ Demo 环境不能 import 真的 .module.css，所以下面用一个函数来「模拟构建工具的哈希过程」，
// 让你看清 styles 对象里到底装了什么、className 最终渲染成什么样。

// 模拟构建工具：把 (文件名, 类名) 编译成 文件名_类名__哈希
function hash(file, cls) {
  return file + '_' + cls + '__' + (file.length * 7 + cls.length * 13).toString(36) // 简易假哈希，真实哈希由 webpack 算
}

// 模拟「import styles from ./Card.module.css」之后，styles 变量里拿到的那张对照表
function buildStyles(file, classNames) {
  const out = {} // 空对象，逐个填进去
  classNames.forEach((cls) => {
    out[cls] = hash(file, cls) // key 是你写的类名，value 是编译后的唯一类名
  })
  return out
}

const cardStyles = buildStyles('Card', ['card', 'title']) // Card.module.css 里写了 .card 和 .title
const modalStyles = buildStyles('Modal', ['modal', 'title']) // Modal.module.css 里也写了一个 .title

const box = { flex: 1, padding: 12, border: '1px solid #e5e7eb', borderRadius: 8, background: '#fff', fontSize: 13 }
const code = { fontFamily: 'monospace', fontSize: 12, background: '#f5f6f5', padding: '2px 5px', borderRadius: 4 }

export default function Demo() { // 默认导出组件
  const [useModules, setUseModules] = useState(true) // true = CSS Modules，false = 普通全局 CSS

  // 普通 CSS：className 就是你手写的原始字符串，两个组件都是 'title' —— 会撞
  // CSS Modules：className 是编译后的哈希名，两个组件天然不同 —— 撞不上
  const cardTitleClass = useModules ? cardStyles.title : 'title'
  const modalTitleClass = useModules ? modalStyles.title : 'title'
  const conflict = cardTitleClass === modalTitleClass // 两个类名一样就意味着会互相覆盖

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui', maxWidth: 560 }}>
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 12, cursor: 'pointer' }}>
        <input type="checkbox" checked={useModules} onChange={(e) => setUseModules(e.target.checked)} />
        使用 CSS Modules（取消勾选 = 退回普通全局 CSS）
      </label>

      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <div style={box}>
          <p style={{ margin: '0 0 6px', color: '#8c8c8c' }}>Card/Card.module.css 里写的 .title</p>
          <p style={{ margin: 0 }}>
            浏览器里的 class：<span style={code}>{cardTitleClass}</span>
          </p>
        </div>
        <div style={box}>
          <p style={{ margin: '0 0 6px', color: '#8c8c8c' }}>Modal/Modal.module.css 里写的 .title</p>
          <p style={{ margin: 0 }}>
            浏览器里的 class：<span style={code}>{modalTitleClass}</span>
          </p>
        </div>
      </div>

      {/* 顺带展示 styles 对象本身长什么样 —— 它就是一张普通的 JS 对象「对照表」 */}
      <pre style={{ ...code, display: 'block', padding: 10, margin: '0 0 12px', whiteSpace: 'pre-wrap' }}>
        {useModules
          ? '// import styles from（./Card.module.css）拿到的 styles 对照表：\\n' + JSON.stringify(cardStyles, null, 2)
          : '// 普通 CSS 只有 import（./Card.css），没有 styles 变量\\n// className 只能手写字符串 "title"'}
      </pre>

      <p style={{ margin: 0, fontSize: 13, color: conflict ? '#a8071a' : '#389e0d' }}>
        {conflict
          ? '❌ 两个组件的类名完全一样，谁后加载谁生效 —— 全局 CSS 的经典事故。'
          : '✅ 哈希是按「文件 + 类名」算的，两个组件即使都叫 .title 也永远撞不上。'}
      </p>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '5）CSS Modules vs 手动 BEM 前缀：怎么选',
            intro: '两者解决的是同一个问题（类名冲突），差别在于「靠工具」还是「靠自觉」。',
            headers: ['对比项', 'CSS Modules', '手动 BEM / 组件前缀'],
            rows: [
              ['怎么保证不冲突', '构建工具加哈希，强制唯一', '靠人取名自觉，可能取重'],
              ['文件名', '必须是 Xxx.module.css', '普通 Xxx.css 即可'],
              ['JSX 写法', 'className={styles.card}', 'className="Card-title"'],
              ['类名长度', 'CSS 里可以写很短的 .card', '要写 .ProductCard-title 这种长名'],
              ['DevTools 里可读性', '显示 Card_card__1a2b3，略难认', '显示 .Card-title，一眼看懂'],
              ['能不能全局覆盖第三方样式', '要用 :global 逃生舱', '直接写，天然全局'],
              ['删代码的信心', '类名只在本文件用，敢删', '不确定全站还有没有人用，不敢删'],
              ['上手成本', '改文件名 + 改写法，10 分钟', '零成本，会写 CSS 就会'],
              ['适合什么时候用', '组件多、多人协作、长期维护', '小项目、练手、快速原型'],
            ],
            note: 'CRA 和 Vite 都开箱支持 CSS Modules，不用装任何依赖、不用改配置。真实团队项目里 CSS Modules 是最主流的选择之一；初学阶段建议先用普通 CSS + 前缀把基本功打牢，理解「为什么会冲突」之后再切过来，会记得非常牢。',
          },
          {
            type: 'list',
            title: '6）CSS Modules 自检清单',
            ordered: true,
            intro: '样式不生效时，从上往下逐条排查，90% 的问题在前三条。',
            items: [
              '文件名是不是 Xxx.module.css？少了 .module 这一段，styles 会是空对象。',
              'import 是不是写成了 import styles from \'./Card.module.css\'？普通 CSS 那种不带变量的 import 拿不到对照表。',
              'JSX 里是不是写成了 className={styles.card}？写成 className="card" 就完全对不上编译后的名字。',
              'CSS 里的类名和 JS 里点出来的是不是同一个？小驼峰 .cardTitle ↔ styles.cardTitle，大小写敏感。',
              '多个 class 是不是用空格拼起来的？数组 .filter(Boolean).join(\' \') 最稳。',
              '动态取名是不是用了中括号 styles[\'size\' + size]？点语法取不出拼接的名字。',
              '要覆盖 antd 等第三方类名时，是不是用了 :global 包住？不包的话类名会被哈希，选不中人家的元素。',
              '打开浏览器 Elements 面板确认：元素上的 class 是不是带哈希的长名字？是 undefined 说明 styles 里没这个 key。',
            ],
          },
          {
            type: 'text',
            title: '7）易错点汇总',
            body: '① **文件名忘了 `.module`**——最高频。表现是页面完全没样式、Elements 里 class 显示 `undefined`。\n\n② **`className={styles.card}` 写成了 `className="card"`**——CSS 里的 `.card` 已经被改名了，手写原始名字选不中任何东西。\n\n③ **类名写了短横线**：CSS 里 `.card-title`，JS 里 `styles.card-title` 会被解析成「styles.card 减去 title」，直接报错。要么改用小驼峰，要么写 `styles[\'card-title\']`。\n\n④ **拼接时忘了空格**：`styles.btn + styles.active` 拼出来是 `Btn_btn__1a2bBtn_active__3c4d`，变成一个不存在的类名。必须 `.join(\' \')`。\n\n⑤ **想覆盖 antd 样式却没用 `:global`**——你写的 `.ant-btn` 被编译成 `Xxx_ant-btn__abc`，永远选不中真正的 antd 按钮。\n\n⑥ **在 `.module.css` 里写 `:root { --x: ... }` 定义全局变量**——`:root` 不会被哈希（它是元素选择器不是类名），能用，但把全局变量藏在某个组件的 module 文件里很难找，还是应该放 `index.css`。\n\n⑦ **误以为 CSS Modules 能隔离一切**——它只隔离**类名**。元素选择器（`div { ... }`）、`:root`、`body` 这些照样是全局的，别在 module 文件里写。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '文件名加 `.module`，`import styles from`，JSX 写 `className={styles.card}`。工具按「文件 + 类名」加哈希保证唯一，类名可以取得很短。多 class 用数组 join 空格；要覆盖第三方类名用 `:global` 包住。它只隔离类名，不隔离 `div`、`:root`。',
          },
        ],
      },
    },
    {
      id: 'css-variables-theme',
      title: 'CSS 变量与暗黑主题：一处改色，全站生效',
      summary: ':root 定义 --main-color，各处 var() 引用；配合 data-theme 属性或 setProperty，一行代码切换整站配色',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '在 `:root` 里定义 `--main-color: #2f6b4f`，在任何地方用 `var(--main-color)` 引用。改主题不用改几百条 CSS 规则，只要在根元素上换一组变量值——`document.documentElement.setAttribute(\'data-theme\', \'dark\')` 一行就能整站换肤。',
          },
          {
            type: 'text',
            title: '1）CSS 自定义属性（CSS 变量）是什么',
            body: 'CSS 变量的正式名字叫「自定义属性（Custom Property）」，写法上有两个硬性规定：\n\n**① 定义时必须以两个减号开头**：`--main-color: #2f6b4f;`。不是 `$main-color`（那是 Sass），也不是 `@main-color`（那是 Less）。这是浏览器**原生**支持的，不需要任何预处理器和构建工具。\n\n**② 使用时必须用 `var()` 包起来**：`color: var(--main-color);`。直接写 `color: --main-color` 是无效的。\n\n和 Sass 变量最本质的区别：**Sass 变量在编译时就被替换成固定值了，浏览器根本看不到它**；CSS 变量是**运行时**活着的，浏览器随时能读、能改。正因为「运行时可改」，才能做主题切换——这是 Sass 变量做不到的。\n\n还有一点很关键：**CSS 变量会沿着 DOM 树继承**。在父元素上定义的变量，所有后代都能用；后代自己再定义一个同名变量，就在自己这棵子树里覆盖掉父级的值。主题切换靠的就是这个特性。',
          },
          {
            type: 'code',
            title: '完整可抄 demo：变量的定义、引用、默认值、局部覆盖',
            language: 'css',
            body: `/* ===== src/index.css：全站变量都定义在 :root 里 ===== */

/*
  :root 就是 <html> 元素，是整棵 DOM 树的根。
  在这里定义的变量，全站任何元素都能用 —— 因为变量会向下继承。
*/
:root {
  --color-brand: #2f6b4f;          /* 品牌主色：按钮、链接、强调 */
  --color-brand-dark: #245a42;     /* 主色的深色版，用于 hover */
  --color-text: #1f2a24;           /* 正文文字 */
  --color-text-muted: #5c6b62;     /* 次要文字 */
  --color-bg: #faf9f6;             /* 页面背景 */
  --color-surface: #ffffff;        /* 卡片背景 */
  --color-border: #e5e7eb;         /* 边框 */
  --radius: 8px;                   /* 圆角 —— 变量不只能存颜色，任何值都行 */
  --space: 16px;                   /* 间距 */
  --shadow: 0 1px 3px rgba(0,0,0,.08);   /* 甚至可以存一整段 box-shadow 的值 */
}

/* ===== 引用：任何属性的值都可以用 var() ===== */
.Card {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space);
  box-shadow: var(--shadow);
}

/* ===== 默认值（fallback）：var(变量名, 兜底值) ===== */
.Card-badge {
  /*
    如果 --badge-color 没有被定义过，就用第二个参数 #999。
    这在写「可被外部定制的组件」时特别有用：组件内部给一个合理默认值，
    使用方想换色时只要在外层定义 --badge-color 就能覆盖，不用改组件源码。
  */
  color: var(--badge-color, #999);

  /* 兜底值还可以嵌套：先试 A，A 没有就试 B，B 也没有就用固定值 */
  background: var(--badge-bg, var(--color-border, #eee));
}

/* ===== 局部覆盖：在某个组件上重新定义同名变量 ===== */
.Card--danger {
  /*
    只在 .Card--danger 这棵子树里，--color-brand 变成红色。
    它的后代元素里所有 var(--color-brand) 都自动跟着变红，
    你不需要为每个后代单独写一条覆盖规则 —— 这是 CSS 变量最爽的一点。
  */
  --color-brand: #cf1322;
  --color-border: #ffa39e;
}

/* ===== 计算：变量可以参与 calc() ===== */
.Card-inner {
  padding: calc(var(--space) / 2);          /* 8px */
  width: calc(100% - var(--space) * 2);     /* 减去左右内边距 */
}

/* ⚠️ 注意：变量里存「数字」时要连单位一起存 */
/* ✅ --space: 16px;  然后 padding: var(--space); */
/* ❌ --space: 16;    然后 padding: var(--space);  → 变成 padding: 16，无效 */
/* 如果非要存纯数字，用的时候要 calc()：padding: calc(var(--space) * 1px); */`,
          },
          {
            type: 'text',
            title: '2）做主题切换的三种改法（从推荐到不推荐）',
            body: '**① `data-theme` 属性 + CSS 属性选择器（最推荐）**\n\n在 `<html>` 上挂一个属性：`<html data-theme="dark">`。CSS 里写：\n\n```\n:root { --color-bg: #fff; --color-text: #111; }\n[data-theme=\'dark\'] { --color-bg: #111827; --color-text: #f9fafb; }\n```\n\nJS 里一行搞定：`document.documentElement.setAttribute(\'data-theme\', \'dark\')`。\n\n为什么最推荐：所有主题配色都集中在 CSS 文件里，JS 只负责「换一个属性值」，职责非常干净；而且加第三套主题只要再写一个 `[data-theme=\'sepia\']` 块。\n\n**② 根元素加 class**\n\n`document.documentElement.classList.toggle(\'dark\')`，CSS 里写 `.dark { --color-bg: ... }`。和方式 ① 几乎等价，只是属性选择器更能表达「这是一个枚举值」而不是「有/没有」。\n\n**③ JS 直接改变量值：`el.style.setProperty(\'--x\', value)`**\n\n```\ndocument.documentElement.style.setProperty(\'--color-brand\', \'#e91e63\')\n```\n\n这会在元素的 **inline style** 上写一个变量，优先级最高。适合**值本身是运行时算出来的**场景——用户自选主题色、根据封面图取色、滑块调节圆角大小。不适合用来做「两套固定配色的切换」，因为那样配色就散进 JS 里了。\n\n对应的还有读取和删除：`getComputedStyle(el).getPropertyValue(\'--x\')` 读当前值，`el.style.removeProperty(\'--x\')` 删掉恢复默认。\n\n**React 里还有第四种写法**：直接写在 `style` 里——`style={{ \'--color-brand\': color }}`。React 支持把 `--` 开头的 key 原样输出成自定义属性，非常适合「只想影响这一小块」的场景。',
          },
          {
            type: 'code',
            title: '完整可抄 demo：theme.css + useTheme Hook + 切换按钮',
            language: 'jsx',
            body: `/* ========== 文件 1：src/theme.css（在 index.js 里 import 一次） ========== */
/*
:root {
  color-scheme: light;                 告诉浏览器当前是亮色，滚动条/输入框等原生控件会跟着变
  --color-bg: #faf9f6;
  --color-surface: #ffffff;
  --color-text: #1f2a24;
  --color-text-muted: #5c6b62;
  --color-border: #e5e7eb;
  --color-brand: #2f6b4f;
}

  ★ 核心：暗色主题只是「换一组变量值」，不需要重写任何一条布局规则
[data-theme='dark'] {
  color-scheme: dark;
  --color-bg: #111827;
  --color-surface: #1f2937;
  --color-text: #f9fafb;
  --color-text-muted: #9ca3af;
  --color-border: #374151;
  --color-brand: #4ade80;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  transition: background .2s, color .2s;    换肤时有个柔和过渡，不会闪
}

  下面这些组件样式一个字都不用改，就自动支持了两套主题
.Card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}
*/

// ========== 文件 2：src/hooks/useTheme.js（自定义 Hook，全站复用） ==========
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'app-theme' // localStorage 的 key，刷新后记住用户选择

function useTheme() {
  // 惰性初始化：传函数给 useState，这段读取逻辑只在首次挂载时跑一次
  const [theme, setTheme] = useState(() => {
    // ① 优先用用户上次的选择
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
    // ② 没存过就跟随系统：matchMedia 能读到操作系统的深色模式偏好
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  // 副作用（effect，指渲染之外的操作）：theme 变了就同步到 <html> 上并存起来
  useEffect(() => {
    // ★ 这一行就是整个主题切换的核心：给 <html> 换一个 data-theme 属性值
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme) // 记住选择，刷新不丢
  }, [theme]) // 依赖数组：只有 theme 变化时才重新执行

  // 返回当前主题 + 切换函数，组件里解构出来就能用
  return { theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) }
}

export default useTheme

// ========== 文件 3：任意组件里使用 ==========
/*
import useTheme from '../../hooks/useTheme'

function Header() {
  const { theme, toggle } = useTheme()
  return (
    <button type="button" onClick={toggle}>
      {theme === 'dark' ? '☀️ 亮色' : '🌙 暗色'}
    </button>
  )
}
*/`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：点按钮切换 data-theme，整块界面用 CSS 变量一起换色',
            body: `import { useState } from 'react' // 引入 useState 保存当前主题名

// 【两套主题 = 两组 CSS 变量值】
// 真实项目里这两组值写在 theme.css 的 :root 和 [data-theme='dark'] 里；
// Demo 环境没有 CSS 文件，所以写成 JS 对象，再通过 style 挂到容器上 —— 效果完全一样。
const THEME_VARS = {
  light: {
    '--bg': '#faf9f6', // 注意：CSS 变量名必须以两个减号开头，React 支持原样写在 style 里
    '--surface': '#ffffff',
    '--text': '#1f2a24',
    '--muted': '#5c6b62',
    '--border': '#e5e7eb',
    '--brand': '#2f6b4f',
  },
  dark: {
    '--bg': '#111827',
    '--surface': '#1f2937',
    '--text': '#f9fafb',
    '--muted': '#9ca3af',
    '--border': '#374151',
    '--brand': '#4ade80',
  },
}

// ★ 关键：下面这些样式对象里【一个具体颜色都没有】，全是 var(--xxx)。
// 所以换主题时它们一行都不用改 —— 这正是 CSS 变量最大的价值。
const panel = {
  padding: 18,
  borderRadius: 10,
  fontFamily: 'system-ui',
  background: 'var(--bg)', // 用 var() 引用容器上定义的变量
  color: 'var(--text)',
  border: '1px solid var(--border)',
  transition: 'background .2s, color .2s, border-color .2s', // 换肤时柔和过渡
}
const card = {
  padding: 12,
  marginBottom: 8,
  borderRadius: 8,
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  transition: 'background .2s, border-color .2s',
}

export default function Demo() { // 默认导出组件
  const [theme, setTheme] = useState('light') // 'light' 或 'dark'

  return (
    // ★ 把整组变量展开到容器的 style 上：变量会向下继承给所有后代，
    //   所以里面的 card 写 var(--surface) 就能读到。
    //   真实项目里等价于给 <html> 加 data-theme="dark"。
    <div data-theme={theme} style={{ ...THEME_VARS[theme], ...panel }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <strong style={{ fontSize: 15 }}>仪表盘</strong>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--muted)' }}>
            data-theme = "{theme}"
          </p>
        </div>
        <button
          type="button"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} // 函数式更新：根据旧值算新值
          style={{
            padding: '6px 14px',
            borderRadius: 6,
            cursor: 'pointer',
            background: 'var(--brand)', // 按钮颜色同样来自变量
            color: 'var(--bg)',
            border: 'none',
            fontWeight: 700,
          }}
        >
          {theme === 'dark' ? '☀️ 切到亮色' : '🌙 切到暗色'}
        </button>
      </div>

      {[
        { id: 1, label: '今日访问', value: '3,842' },
        { id: 2, label: '新增用户', value: '126' },
        { id: 3, label: '转化率', value: '4.7%' },
      ].map((s) => (
        <div key={s.id} style={card}>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>{s.label}</p>
          <p style={{ margin: '4px 0 0', fontSize: 20, fontWeight: 700, color: 'var(--brand)' }}>{s.value}</p>
        </div>
      ))}

      <p style={{ margin: 0, fontSize: 12, color: 'var(--muted)' }}>
        上面 8 处颜色全部写的是 var(--xxx)，切换时它们一个字都没改 —— 变的只是根容器上那 6 个变量的值。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：拖动滑块调色 / 调圆角，一个变量同时驱动多个元素',
            body: `import { useRef, useState } from 'react' // useRef 拿真实 DOM 节点，用来演示 setProperty

export default function Demo() { // 默认导出组件
  const [hue, setHue] = useState(150) // 色相 0~360，用来算出主色
  const [radius, setRadius] = useState(10) // 圆角大小，单位 px
  const boxRef = useRef(null) // 指向下面那个容器的真实 DOM 节点，第二种改法要用

  // hsl(色相, 饱和度, 亮度) 是一种颜色写法，改一个数字就能滑过整个色环
  const brand = 'hsl(' + hue + ', 45%, 38%)' // 主色
  const brandSoft = 'hsl(' + hue + ', 45%, 94%)' // 同色系的浅色背景

  // 【改法 A】把变量写进 style（React 支持 -- 开头的 key），最常用、最 React
  const vars = {
    '--brand': brand,
    '--brand-soft': brandSoft,
    '--radius': radius + 'px', // ⚠️ 变量里存长度必须连单位一起存，写成裸数字用不了
  }

  // 【改法 B】用 DOM API 直接改变量，适合「不想触发 React 重渲染」的高频场景（如拖拽）
  function randomize() {
    const h = Math.floor(Math.random() * 360) // 随机色相
    setHue(h) // 同步 state，让滑块也跟着动
    // setProperty 会把变量写到元素的 inline style 上，优先级最高、立刻生效
    if (boxRef.current) {
      boxRef.current.style.setProperty('--brand', 'hsl(' + h + ', 45%, 38%)')
    }
    // 想删掉恢复默认：boxRef.current.style.removeProperty('--brand')
  }

  return (
    <div ref={boxRef} style={{ ...vars, padding: 16, fontFamily: 'system-ui', maxWidth: 460 }}>
      <div style={{ marginBottom: 10 }}>
        <label style={{ fontSize: 13, display: 'block', marginBottom: 4 }}>
          主色色相：{hue}
        </label>
        {/* range 滑块：受控组件，value 绑 state，onChange 里转成数字再存 */}
        <input
          type="range"
          min={0}
          max={360}
          value={hue}
          onChange={(e) => setHue(Number(e.target.value))} // e.target.value 是字符串，必须 Number 转换
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 13, display: 'block', marginBottom: 4 }}>圆角：{radius}px</label>
        <input
          type="range"
          min={0}
          max={28}
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      {/* ★ 下面 5 个元素没有一个写死颜色，全都读同两个变量 —— 拖一次滑块，5 处一起变 */}
      <button
        type="button"
        onClick={randomize}
        style={{ padding: '8px 16px', border: 'none', borderRadius: 'var(--radius)', background: 'var(--brand)', color: '#fff', cursor: 'pointer', marginBottom: 10 }}
      >
        🎲 随机换色（用 setProperty 改）
      </button>

      <div style={{ padding: 12, borderRadius: 'var(--radius)', background: 'var(--brand-soft)', border: '1px solid var(--brand)', marginBottom: 10 }}>
        <strong style={{ color: 'var(--brand)' }}>卡片标题</strong>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#5c6b62' }}>背景、边框、标题色都来自变量</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        {['首页', '文档', '关于'].map((t, i) => (
          <span
            key={t}
            style={{
              padding: '4px 12px',
              fontSize: 13,
              borderRadius: 'var(--radius)',
              // 第一个标签用实心主色，其余用浅色 —— 两种用法读的是同一组变量
              background: i === 0 ? 'var(--brand)' : 'var(--brand-soft)',
              color: i === 0 ? '#fff' : 'var(--brand)',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div style={{ height: 8, borderRadius: 999, background: 'var(--brand-soft)' }}>
        <div style={{ width: '62%', height: '100%', borderRadius: 999, background: 'var(--brand)' }} />
      </div>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '3）三种改变量的方式对照',
            headers: ['方式', '写法', '影响范围', '适合什么'],
            rows: [
              ['data-theme 属性', "html.setAttribute('data-theme','dark')", '全站', '✅ 固定的几套主题，配色留在 CSS 里'],
              ['根元素加 class', "html.classList.toggle('dark')", '全站', '和上面几乎等价，表达「有/没有」时用'],
              ['style 里写变量', "style={{ '--brand': color }}", '该元素及其后代', '✅ React 里只想影响一小块'],
              ['setProperty', "el.style.setProperty('--brand', v)", '该元素及其后代', '拖拽等高频场景，不想触发重渲染'],
              ['读当前值', "getComputedStyle(el).getPropertyValue('--brand')", '只读', '需要在 JS 里拿到最终生效的值'],
              ['删掉覆盖', "el.style.removeProperty('--brand')", '该元素', '恢复成继承来的默认值'],
            ],
            note: '优先级从低到高：:root 定义 < 祖先元素定义 < 本元素 class 定义 < 本元素 inline style（setProperty 和 React 的 style 都属于这一档）。所以 setProperty 写下的值会盖住 CSS 文件里的一切定义，除非那边用了 !important。',
          },
          {
            type: 'table',
            title: '4）一套够用的变量命名规范',
            intro: '变量名没有官方标准，但团队里统一命名能省下大量沟通成本。推荐「类别-用途-变体」三段式。',
            headers: ['类别', '示例', '说明'],
            rows: [
              ['颜色-语义', '--color-brand、--color-danger', '按「用途」命名，不要按颜色本身命名'],
              ['颜色-层级', '--color-bg、--color-surface、--color-border', 'bg 是页面底色，surface 是卡片面，逐层往上'],
              ['文字', '--color-text、--color-text-muted', '正文 + 次要文字，够用了'],
              ['间距', '--space-sm/md/lg（8/16/24px）', '定三档就够，避免 --space-13px 这种'],
              ['圆角/阴影', '--radius、--shadow', '全站统一，改一次整站风格就变了'],
              ['字号', '--font-sm/md/lg', '配合 clamp() 还能做流式字号'],
            ],
            note: '❌ 反例：--green、--blue-2。今天叫 --green，明天品牌色改成橙色，变量名就骗人了。永远按「它是干什么的」命名，不按「它长什么样」命名。',
          },
          {
            type: 'list',
            title: '5）CSS 变量自检清单',
            ordered: true,
            items: [
              '定义时是不是两个减号开头？--main-color，不是 $ 也不是 @。',
              '使用时是不是用 var() 包起来了？color: var(--main-color)。',
              '存长度值时单位带上了吗？--space: 16px 而不是 --space: 16。',
              '全站通用的变量是不是只在 index.css 的 :root 里定义了一次？',
              '组件想局部换色时，是不是在组件根元素上重新定义同名变量，而不是逐个后代写覆盖？',
              '变量名是不是按「用途」命名（--color-brand）而不是按颜色（--green）？',
              '做主题切换时，配色是不是集中在 CSS 里，JS 只负责换 data-theme？',
              '换肤有没有加 transition，避免整页猛地一闪？',
              '有没有给可能缺失的变量写兜底值：var(--badge-color, #999)？',
            ],
          },
          {
            type: 'text',
            title: '6）易错点汇总',
            body: '① **少写一个减号**：`-main-color` 不是自定义属性，浏览器直接忽略，且不会报错——最难查的一类问题。\n\n② **忘了 `var()`**：`color: --main-color` 无效。变量必须通过 `var()` 取值。\n\n③ **变量存了裸数字**：`--space: 16` 然后 `padding: var(--space)` → 变成 `padding: 16`，无效。要么存 `16px`，要么用的时候 `calc(var(--space) * 1px)`。\n\n④ **变量名区分大小写**：`--Color-Brand` 和 `--color-brand` 是两个不同的变量。全小写 + 短横线最稳。\n\n⑤ **在子元素上定义、想让父元素用**：变量只向**下**继承，不会向上冒泡。要给谁用就定义在谁的祖先上（通常是 `:root`）。\n\n⑥ **主题切换时元素颜色没变**：多半是那条 CSS 规则写死了颜色（`color: #111`）而不是 `var(--color-text)`。换肤前先把所有硬编码颜色替换成变量。\n\n⑦ **在 JS 里直接读 `el.style.getPropertyValue(\'--x\')` 读不到**——inline style 上没写就是空。要读「最终生效的值」必须用 `getComputedStyle(el).getPropertyValue(\'--x\')`，而且返回的字符串前面常带一个空格，记得 `.trim()`。\n\n⑧ **忘了给 `<html>` 加 `color-scheme`**：暗色主题下滚动条、输入框、下拉菜单等浏览器原生控件还是亮色的，很违和。加一句 `color-scheme: dark` 就好了。\n\n⑨ **IE 完全不支持**——但 IE 已经停止支持，现代项目可以放心用。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '`--x: 值` 定义、`var(--x, 兜底)` 使用、变量沿 DOM 树向下继承。全站变量放 `:root`，组件想局部换色就在组件根上重定义同名变量。主题切换 = 给 `<html>` 换 `data-theme`，配色全留在 CSS 里；运行时算出来的颜色才用 `setProperty` 或 React 的 `style={{ \'--x\': v }}`。',
          },
        ],
      },
    },
    {
      id: 'styling-responsive-react',
      title: 'React 里怎么写响应式：断点、容器宽度与移动端适配',
      summary: '布局能用媒体查询就用媒体查询；需要「换结构 / 换组件」时才用 useMediaQuery 在 JS 里判断——两条路线的分工和完整写法',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '**只是换样式（列数、字号、显隐），写 CSS 媒体查询**；**要换结构、换组件、少渲染点东西**（手机上把表格换成卡片列表、把侧边栏换成抽屉），才用 JS 的 `window.matchMedia` 配合自定义 Hook `useMediaQuery`。能用 CSS 解决就别拿 JS 解决。',
          },
          {
            type: 'text',
            title: '1）两条路线，各管一摊',
            body: '第 2 章的 `css-responsive` 那一节讲的是**纯 CSS 侧**：`@media (max-width: 768px)` 怎么写、断点怎么选、`flex-wrap` 和 `grid` 怎么自适应。那些知识在 React 里**完全通用**——React 组件的 `className` 依然对应 CSS 文件里的规则，媒体查询照样生效。这一节讲的是 **React 侧特有的部分**。\n\n**路线 A：CSS 媒体查询（默认选它）**\n\n组件里什么都不用做，把 `@media` 写在组件的 CSS 文件里就行：\n\n```\n.ProductGrid { display: grid; grid-template-columns: repeat(4, 1fr); }\n@media (max-width: 768px) { .ProductGrid { grid-template-columns: repeat(2, 1fr); } }\n```\n\n优点非常实在：**浏览器原生处理，零 JS 开销，不会触发 React 重渲染，服务端渲染也不会闪**。窗口一变浏览器立刻重排，比 JS 快得多。\n\n**路线 B：JS 判断宽度（有明确理由才用）**\n\n什么时候 CSS 真的不够用？\n\n• **要渲染完全不同的组件**：桌面端 `<DataTable />`，手机端 `<CardList />`。用 CSS 做的话你得把两套 DOM 都渲染出来再 `display: none` 藏一套——手机上白白渲染了一个大表格，浪费性能。\n\n• **要少加载点东西**：手机上不渲染那个很重的图表组件、不初始化地图。\n\n• **要把值传给 JS 逻辑**：轮播图在窄屏一次显示 1 张、宽屏 3 张，这个「3」得作为参数传给轮播组件。\n\n• **要根据宽度决定交互方式**：宽屏用 hover 展开菜单，窄屏改成点击展开。\n\n除此之外的场景，都请老老实实写 CSS。',
          },
          {
            type: 'table',
            title: '2）CSS 媒体查询 vs JS 监听宽度',
            headers: ['对比项', 'CSS @media', 'JS matchMedia / useMediaQuery'],
            rows: [
              ['写在哪', '组件的 .css 文件里', '组件的 JS 里，通常封装成 Hook'],
              ['性能', '✅ 浏览器原生，零开销', '要注册监听、变化时触发重渲染'],
              ['能做什么', '改样式：列数、字号、间距、显隐', '换组件、换结构、把宽度当参数传给逻辑'],
              ['能不能少渲染 DOM', '❌ 两套都渲染，只是藏一套', '✅ 真的只渲染需要的那一套'],
              ['首屏会不会闪', '不会', '首次渲染可能先按默认值渲染一帧'],
              ['SSR（服务端渲染）', '✅ 完全没问题', '服务端没有 window，要额外处理'],
              ['调试', 'DevTools 设备模式直接看', '要 console.log 或看 React DevTools'],
              ['默认选哪个', '✅ 默认选它', '有上面那些明确理由时才用'],
            ],
            note: '一个实用组合：布局用 CSS Grid 的 repeat(auto-fill, minmax(220px, 1fr))，连媒体查询都不用写，容器多宽就自动排几列——能这样解决的场景，两条路线都不需要。',
          },
          {
            type: 'code',
            title: '完整可抄 demo：路线 A —— 媒体查询写在 CSS 文件里',
            language: 'css',
            body: `/* src/pages/Shop/Shop.css —— 组件什么都不用改，响应式全在这里 */

/* 移动优先（Mobile First）：先写小屏样式，再用 min-width 往上加。
   好处是手机上加载的规则最少，而且「默认值」天然是最简单的那套。 */

.Shop-grid {
  display: grid;
  grid-template-columns: 1fr;      /* 默认（手机）：一列 */
  gap: 12px;
}

/* ≥ 640px（大手机 / 小平板）：两列 */
@media (min-width: 640px) {
  .Shop-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

/* ≥ 1024px（笔记本）：四列 */
@media (min-width: 1024px) {
  .Shop-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* 手机上藏掉侧边栏 —— 注意：DOM 还在，只是看不见 */
@media (max-width: 767px) {
  .Shop-sidebar {
    display: none;
  }
}

/* 【更省事的做法】连媒体查询都不写，让 grid 自己算列数：
   minmax(220px, 1fr) = 每列最少 220px，有富余就平分；
   auto-fill = 容器能塞几列就塞几列。
   容器 900px → 4 列；容器 500px → 2 列；容器 300px → 1 列。全自动。 */
.Shop-gridAuto {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

/* 流式字号：clamp(最小值, 理想值, 最大值)
   窄屏时不会小于 16px，宽屏时不会大于 24px，中间随视口宽度平滑变化。
   vw 是「视口宽度的百分之一」，2.5vw 在 800px 宽的屏上就是 20px。 */
.Shop-title {
  font-size: clamp(16px, 2.5vw, 24px);
  /* 间距同理，能省掉一堆媒体查询 */
  padding: clamp(12px, 3vw, 32px);
}`,
          },
          {
            type: 'text',
            title: '3）路线 B：useMediaQuery 自定义 Hook 完整实现',
            body: '`window.matchMedia(\'(max-width: 768px)\')` 会返回一个 `MediaQueryList` 对象，它有两个关键东西：\n\n• `.matches`——布尔值，当前是否匹配这条媒体查询。\n• `.addEventListener(\'change\', 回调)`——匹配状态**变化时**触发（注意：只在 true↔false 翻转时触发一次，不是每像素都触发，所以性能很好，比监听 `resize` 事件强得多）。\n\n把它包成 Hook 之后，任何组件里一行就能用：`const isMobile = useMediaQuery(\'(max-width: 768px)\')`。\n\n实现时有四个坑要绕：\n\n**① 初始值不能写死 `false`**——否则首屏会先按桌面端渲染一帧再跳到移动端，用户能看到明显的闪烁。要用 `useState(() => ...)` 惰性初始化，首次渲染就读到正确值。\n\n**② 必须在 `useEffect` 的返回函数里 `removeEventListener`**——组件卸载了监听还在，会内存泄漏，还可能对着已卸载的组件调 setState 而报警告。\n\n**③ 依赖数组要放 `query`**——查询字符串变了要重新注册监听。\n\n**④ 服务端渲染（SSR）时没有 `window`**——直接访问会报 `window is not defined`。加一个 `typeof window === \'undefined\'` 判断兜底。CRA 是纯客户端渲染，不会遇到；用 Next.js 时必须处理。',
          },
          {
            type: 'code',
            title: '完整可抄 demo：src/hooks/useMediaQuery.js（可直接复制进项目）',
            language: 'jsx',
            body: `import { useEffect, useState } from 'react'

/**
 * useMediaQuery —— 在 React 里订阅一条媒体查询
 *
 * @param {string} query 标准的媒体查询字符串，如 '(max-width: 768px)'
 * @returns {boolean} 当前是否匹配
 *
 * 用法：const isMobile = useMediaQuery('(max-width: 768px)')
 */
function useMediaQuery(query) {
  // ① 惰性初始化：传一个函数给 useState，这段只在组件首次挂载时执行一次。
  //    这样首帧渲染出来就是正确的宽度状态，不会先闪一下桌面端布局。
  const [matches, setMatches] = useState(() => {
    // SSR 兜底：服务端没有 window 对象，直接返回 false，等到了浏览器再纠正
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(query).matches // .matches 是布尔值：当前是否匹配
  })

  // ② 副作用（effect，指渲染之外的操作）：注册监听 + 卸载时清理
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined

    const mql = window.matchMedia(query) // MediaQueryList 对象

    // 事件回调：e.matches 就是变化后的新状态
    const onChange = (e) => setMatches(e.matches)

    // 进入 effect 时再同步一次：query 变了、或从挂载到 effect 执行之间宽度变了，都能兜住
    setMatches(mql.matches)

    // ★ 只在「匹配状态翻转」时触发一次，不是每像素都触发 —— 比监听 resize 高效得多
    mql.addEventListener('change', onChange)

    // ③ 清理函数：组件卸载或 query 变化时，先把旧监听摘掉，否则内存泄漏
    return () => mql.removeEventListener('change', onChange)
  }, [query]) // ④ 依赖数组：query 变了要重新订阅

  return matches
}

export default useMediaQuery

// ===== 常用断点也一起导出，避免各处硬编码字符串写错 =====
export const BREAKPOINTS = {
  mobile: '(max-width: 767px)',        // 手机
  tablet: '(min-width: 768px) and (max-width: 1023px)', // 平板
  desktop: '(min-width: 1024px)',      // 桌面
  dark: '(prefers-color-scheme: dark)', // 顺带：系统是否开了深色模式
  reduceMotion: '(prefers-reduced-motion: reduce)', // 用户是否要求减少动画
}

// ===== 在组件里怎么用 =====
/*
import useMediaQuery, { BREAKPOINTS } from '../../hooks/useMediaQuery'
import DataTable from './DataTable'
import CardList from './CardList'

function OrderPage({ orders }) {
  const isMobile = useMediaQuery(BREAKPOINTS.mobile)

  return (
    <div>
      <h1>订单</h1>
      {/* ★ 这才是 JS 判断宽度的正当理由：真的渲染两套完全不同的组件，
          手机上根本不会创建那个大表格的 DOM */}
      {isMobile ? <CardList orders={orders} /> : <DataTable orders={orders} />}
    </div>
  )
}
*/`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：拖动滑块「模拟」屏幕宽度，看断点怎么切换列数和布局',
            body: `import { useState } from 'react' // 引入 useState 保存模拟的容器宽度

// 【为什么用滑块而不是真的拖浏览器窗口？】
// 预览区就这么大，拖窗口不方便观察。这里用 state 控制容器宽度来「模拟」不同屏幕，
// 判断逻辑和真实的 useMediaQuery 完全一样 —— 都是「拿到一个宽度数字，映射成一套布局参数」。

// 断点表：和 CSS 里的 @media 断点保持一致，团队里应该只有这一份定义
const BREAKPOINTS = [
  { max: 639, name: '手机', cols: 1, showSide: false, font: 14, tone: '#cf1322' },
  { max: 1023, name: '平板', cols: 2, showSide: false, font: 15, tone: '#d46b08' },
  { max: Infinity, name: '桌面', cols: 4, showSide: true, font: 16, tone: '#389e0d' },
]

// 根据宽度找出当前落在哪个断点区间 —— 这一步对应 CSS 里浏览器帮你做的匹配
function matchBreakpoint(width) {
  return BREAKPOINTS.find((b) => width <= b.max) // find 返回第一个满足条件的，所以断点表必须从小到大排
}

const ITEMS = [ // 假数据：6 个商品卡片
  { id: 1, name: '机械键盘' },
  { id: 2, name: '无线鼠标' },
  { id: 3, name: '显示器' },
  { id: 4, name: '手托' },
  { id: 5, name: '扩展坞' },
  { id: 6, name: '摄像头' },
]

export default function Demo() { // 默认导出组件
  const [width, setWidth] = useState(900) // 模拟的「屏幕宽度」，单位 px
  const bp = matchBreakpoint(width) // 当前命中的断点配置

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      <label style={{ fontSize: 13, display: 'block', marginBottom: 4 }}>
        模拟屏幕宽度：<strong>{width}px</strong>
        <span style={{ color: bp.tone, marginLeft: 8, fontWeight: 700 }}>→ 命中「{bp.name}」断点</span>
      </label>
      <input
        type="range"
        min={320}
        max={1200}
        value={width}
        onChange={(e) => setWidth(Number(e.target.value))} // input 的 value 永远是字符串，要 Number 转成数字
        style={{ width: '100%', marginBottom: 12 }}
      />

      {/* 这个容器就是「模拟出来的屏幕」：宽度由 state 控制，最大不超过预览区 */}
      <div
        style={{
          width: '100%',
          maxWidth: width, // 容器宽度跟着滑块走
          margin: '0 auto',
          padding: 12,
          border: '2px dashed ' + bp.tone,
          borderRadius: 8,
          transition: 'max-width .15s, border-color .15s',
        }}
      >
        <div style={{ display: 'flex', gap: 12 }}>
          {/* ★ 这就是「JS 判断宽度」的正当用法：窄屏时侧边栏根本不渲染，
              而不是渲染出来再 display:none —— 省掉了这部分 DOM */}
          {bp.showSide && (
            <aside style={{ width: 110, flexShrink: 0, padding: 10, background: '#f5f6f5', borderRadius: 6, fontSize: 12 }}>
              <strong>筛选</strong>
              <p style={{ margin: '6px 0 0', color: '#8c8c8c' }}>桌面端才渲染</p>
            </aside>
          )}

          <div style={{ flex: 1 }}>
            {/* 列数来自断点配置：真实项目里这一步更推荐交给 CSS grid 的媒体查询 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(' + bp.cols + ', 1fr)', // 拼字符串生成 repeat(2, 1fr)
                gap: 8,
              }}
            >
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: 10,
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 6,
                    fontSize: bp.font, // 字号也跟着断点走
                    textAlign: 'center',
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p style={{ marginTop: 10, fontSize: 12, color: '#8c8c8c' }}>
        当前布局：{bp.cols} 列 · 字号 {bp.font}px · 侧边栏{bp.showSide ? '显示' : '不渲染'}。
        把滑块拖到 639 和 1023 附近，能清楚看到「跨过断点的那一刻」布局整体跳变。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：真实版 useMediaQuery——拖动你的浏览器窗口试试',
            body: `import { useEffect, useState } from 'react' // useEffect 注册监听，useState 存匹配结果

/**
 * 真实可用的 useMediaQuery —— 和上面静态代码块里那份一模一样，可以直接抄进项目
 * 这里放在 Demo 里，是为了让你能立刻看到它在你自己浏览器上的运行结果
 */
function useMediaQuery(query) {
  // 惰性初始化：首帧就读到正确值，避免先闪一下错误的布局
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false // SSR 兜底
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined

    const mql = window.matchMedia(query) // 拿到 MediaQueryList 对象
    const onChange = (e) => setMatches(e.matches) // 状态翻转时把新值写进 state

    setMatches(mql.matches) // 进 effect 时再同步一次，兜住中间的变化
    mql.addEventListener('change', onChange) // 只在 true↔false 翻转时触发，不是每像素

    return () => mql.removeEventListener('change', onChange) // ★ 清理：不摘监听会内存泄漏
  }, [query]) // query 变了要重新订阅

  return matches
}

const row = { display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 13 } // 每行共用样式
const dot = (on) => ({ width: 10, height: 10, borderRadius: '50%', background: on ? '#389e0d' : '#d9d9d9' }) // 小圆点：亮=匹配

export default function Demo() { // 默认导出组件
  // 同一个 Hook 可以在一个组件里调用多次，各订阅各的查询
  const isMobile = useMediaQuery('(max-width: 767px)')
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)') // 媒体查询不只能查宽度，还能查系统偏好
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)') // 用户是否在系统里要求减少动画

  const list = [
    { label: '(max-width: 767px) 手机', on: isMobile },
    { label: '(min-width: 768px) and (max-width: 1023px) 平板', on: isTablet },
    { label: '(min-width: 1024px) 桌面', on: isDesktop },
    { label: '(prefers-color-scheme: dark) 系统深色模式', on: prefersDark },
    { label: '(prefers-reduced-motion: reduce) 减少动画', on: reduceMotion },
  ]

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui', maxWidth: 460 }}>
      <p style={{ margin: '0 0 8px', fontSize: 13, color: '#5c6b62' }}>
        👉 拖动浏览器窗口宽度，或按 F12 打开 DevTools 用设备模式切换机型，看下面哪一行亮起来：
      </p>

      {list.map((it) => (
        <div key={it.label} style={row}>
          <span style={dot(it.on)} />
          <code style={{ fontSize: 12 }}>{it.label}</code>
          <strong style={{ marginLeft: 'auto', color: it.on ? '#389e0d' : '#bfbfbf' }}>
            {it.on ? 'true' : 'false'}
          </strong>
        </div>
      ))}

      {/* 拿到布尔值之后就能做「CSS 做不到的事」：渲染完全不同的组件 */}
      <div style={{ marginTop: 12, padding: 12, background: '#f5f6f5', borderRadius: 8, fontSize: 13 }}>
        {isMobile ? (
          <span>📱 当前会渲染 &lt;CardList /&gt;（手机版卡片列表，DOM 更轻）</span>
        ) : (
          <span>🖥️ 当前会渲染 &lt;DataTable /&gt;（桌面版大表格）</span>
        )}
      </div>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '4）移动端适配的五个要点（不做这些，手机上一定出问题）',
            body: '**① viewport meta 必须有**\n\n`public/index.html` 的 `<head>` 里这一行不能少（CRA 默认已经带了，但自己搭的项目容易漏）：\n\n```\n<meta name="viewport" content="width=device-width, initial-scale=1" />\n```\n\n没有它，手机浏览器会假装自己是 980px 宽的桌面屏，然后把整页缩小——你写的所有媒体查询全部失效，字小得看不清。这是移动端 0 号问题。\n\n**② 点击区域至少 44×44px**\n\n这是 Apple 人机界面指南的数字（Android 建议 48dp），依据是成年人指尖的平均接触面积。视觉上小图标没关系，但**可点区域**要撑够：\n\n```\n.IconButton { width: 24px; height: 24px; padding: 10px; }  /* 24 + 10*2 = 44 */\n```\n\n或者用伪元素撑开热区。相邻的可点元素之间也要留至少 8px 间隙，否则容易点错。\n\n**③ 绝对不要把 hover 当成唯一的交互方式**\n\n触摸屏没有「悬停」这个状态。「鼠标移上去才显示删除按钮」在手机上等于**这个按钮不存在**。如果一定要用，就配合媒体查询把 hover 效果限制在支持悬停的设备上：\n\n```\n@media (hover: hover) {\n  .Card:hover .Card-delete { opacity: 1; }\n}\n```\n\n窄屏下应该改成「长按」或者「直接常显」。\n\n**④ 用 `clamp()` 做流式字号和间距**\n\n`clamp(最小值, 理想值, 最大值)`——一行顶三个媒体查询：\n\n```\nfont-size: clamp(16px, 4vw, 28px);   /* 最小 16，最大 28，中间跟着视口平滑变化 */\npadding: clamp(12px, 3vw, 32px);\n```\n\n注意最小值不要低于 16px：**iOS Safari 在字号小于 16px 的输入框上会自动放大整个页面**，体验很糟。\n\n**⑤ 用 `dvh` 而不是 `vh` 做全屏高度**\n\n手机浏览器的地址栏会随滚动收起／展开，`100vh` 是按「地址栏收起时」算的，结果就是页面底部被地址栏挡住。改用 `100dvh`（dynamic viewport height）就能跟着实际可视区域变。',
          },
          {
            type: 'table',
            title: '5）常用断点参考（够用就好，不要定十档）',
            intro: '断点数字没有标准答案，重要的是「整个项目只有一套」。下面这套是 Tailwind / Bootstrap 的主流取值，可以直接抄。',
            headers: ['名称', '媒体查询', '典型设备', '常见布局'],
            rows: [
              ['sm 及以下', '(max-width: 639px)', '手机竖屏', '单列、汉堡菜单、底部导航'],
              ['md', '(min-width: 640px)', '大手机 / 手机横屏', '两列'],
              ['lg', '(min-width: 1024px)', '平板横屏 / 小笔记本', '侧边栏出现、三到四列'],
              ['xl', '(min-width: 1280px)', '桌面显示器', '内容区限宽居中，两侧留白'],
              ['特殊', '(hover: hover)', '有鼠标的设备', '只在这里写 :hover 效果'],
              ['特殊', '(prefers-color-scheme: dark)', '系统开了深色模式', '自动跟随系统主题'],
              ['特殊', '(prefers-reduced-motion: reduce)', '用户要求减少动画', '关掉过渡和动画，无障碍必做'],
            ],
            note: '移动优先（用 min-width 从小往大写）还是桌面优先（用 max-width 从大往小写）都可以，但**一个项目只能选一种**，混着写会让规则互相覆盖，非常难查。',
          },
          {
            type: 'list',
            title: '6）响应式自检清单',
            ordered: true,
            items: [
              'index.html 里有没有 viewport meta？没有的话所有媒体查询都白写。',
              '这个需求真的需要 JS 吗？只是改样式的话，写 CSS 媒体查询更快更稳。',
              '用了 useMediaQuery 的话，useEffect 里有没有 removeEventListener 清理？',
              'useMediaQuery 的初始值是不是惰性读取的？写死 false 会导致首屏闪一下。',
              '断点数字是不是全项目统一了一份？不要这个组件 768、那个组件 750。',
              '可点击元素的实际热区有没有到 44×44px？相邻按钮之间有没有留 8px 以上间隙？',
              'hover 效果有没有配合 @media (hover: hover)？触摸屏上没有悬停这回事。',
              '最小字号有没有 ≥ 16px？低于 16px 的输入框在 iOS 上会触发页面自动放大。',
              '全屏高度用的是 dvh 还是 vh？vh 在手机上会被地址栏挡住底部。',
              '有没有在 DevTools 的设备模式里真的切到 iPhone SE（375px）看一遍？',
            ],
          },
          {
            type: 'text',
            title: '7）易错点汇总',
            body: '① **漏了 viewport meta**——媒体查询全部失效，页面在手机上被整体缩小。CRA 默认带了，自己搭项目时最容易漏。\n\n② **用 `window.addEventListener(\'resize\')` 代替 `matchMedia`**——resize 在拖动时每帧都触发，会疯狂重渲染。`matchMedia` 只在跨过断点的那一刻触发一次，性能天差地别。真要监听 resize 也必须加防抖。\n\n③ **`useEffect` 里忘了返回清理函数**——组件卸载后监听还在，控制台会警告「Can\'t perform a React state update on an unmounted component」，第 4 章的排错那节专门讲了这个报错。\n\n④ **`useMediaQuery` 初始值写死 `false`**——首帧按桌面端渲染，第二帧才跳到移动端，用户能看到明显的布局闪烁。必须惰性初始化。\n\n⑤ **在 `useEffect` 依赖里传了一个每次都新建的字符串拼接**——比如 `useMediaQuery(\'(max-width: \' + w + \'px)\')`，`w` 一变就重新订阅一次。断点应该是常量。\n\n⑥ **min-width 和 max-width 混着写**——`@media (min-width: 768px)` 和 `@media (max-width: 768px)` 在正好 768px 时**都会命中**，样式打架。要么统一用 min-width，要么 max-width 那边写 767px。\n\n⑦ **手机上用 `display: none` 藏大组件**——DOM 还是渲染了，图片还是下载了，性能一点没省。真想省就用 `useMediaQuery` 条件渲染。\n\n⑧ **只在 Chrome 的设备模式里测**——设备模式模拟不了真机的地址栏高度、触摸精度、iOS Safari 的各种怪癖。上线前一定要用真手机开一次。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '改样式写 CSS `@media`，换组件才用 `useMediaQuery`。Hook 三件套：惰性初始化（不闪）、`addEventListener(\'change\')`（不是 resize）、清理函数（不泄漏）。移动端四件套：viewport meta、热区 44px、hover 配 `(hover: hover)`、字号 ≥16px 用 `clamp()`。断点全项目统一一份。',
          },
        ],
      },
    },
  ],
}

export default styling
