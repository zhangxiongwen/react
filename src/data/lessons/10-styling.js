/**
 * 第 10 章：样式
 * 每个条目 = 一句话总结 + 详细步骤 + 完整可抄 demo + 易错点
 */
const styling = {
  id: 'styling',
  title: '样式方案入门',
  summary: 'CSS 文件怎么组织、className 怎么写、动态样式怎么切换——入门够用的一套完整做法',
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
            body: `/* src/index.css —— 全站基础，在 index.js 里 import */

/* 1. CSS 变量：改主题色只改这里 */
:root {
  --color-text: #1f2a24;
  --color-text-muted: #5c6b62;
  --color-bg: #faf9f6;
  --color-surface: #ffffff;
  --color-accent: #2f6b4f;
  --color-accent-hover: #245a42;
  --color-border: #e5e7eb;
  --radius-md: 8px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --font-sans: system-ui, -apple-system, 'Segoe UI', sans-serif;
}

/* 2. 基础重置 */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--font-sans);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.6;
}

/* 3. 全局元素默认 */
a {
  color: var(--color-accent);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button {
  font-family: inherit;
  cursor: pointer;
}

/* 4. 可选：通用容器 */
.App-container {
  max-width: 960px;
  margin: 0 auto;
  padding: var(--space-lg);
}`,
          },
          {
            type: 'code',
            title: '完整可抄 demo：Button 组件 + Button.css',
            language: 'jsx',
            body: `// ========== Button.js ==========
import './Button.css'

/**
 * 通用按钮组件
 * - primary：是否主按钮样式
 * - disabled：禁用
 * - children：按钮文字
 */
function Button({ children, primary = false, disabled = false, onClick, type = 'button' }) {
  const classNames = [
    'Button',
    primary ? 'Button--primary' : 'Button--default',
    disabled ? 'Button--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classNames}
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
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  font-size: 14px;
  transition: background 0.15s, border-color 0.15s;
}

.Button--default {
  background: var(--color-surface);
  color: var(--color-text);
}

.Button--default:hover:not(.Button--disabled) {
  background: #f3f4f6;
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
            body: `// src/components/ProductCard/index.js
import './ProductCard.css'

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="ProductCard">
      <img
        className="ProductCard-image"
        src={product.image}
        alt={product.name}
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
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.ProductCard-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
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
            body: `/* src/components/Header/Header.css —— 打开源码对照 */

.Header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.Header-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: var(--space-md) var(--space-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.Header-brand {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
}

.Header-brand:hover {
  text-decoration: none;
  color: var(--color-accent);
}

.Header-nav {
  display: flex;
  gap: var(--space-md);
}

.Header-link {
  color: var(--color-text-muted);
  font-size: 14px;
}

.Header-link:hover {
  color: var(--color-accent);
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
            body: '大部分样式（颜色、布局、hover、动画）写在 CSS 文件里，用 className 切换不同 class。只有运行时才知道的具体数值（进度条宽度 37%、拖拽 left: 120px）才用 style={{ width: \'37%\' }}。style 里属性名用驼峰：backgroundColor 不是 background-color。',
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
            title: '4）怎么用：拼接 className 的三种写法',
            body: '写法 1——三元表达式（最常见）：\n\nclassName={active ? \'Tab Tab--active\' : \'Tab\'}\n\n写法 2——数组 filter join（多 class 推荐）：\n\n[\'Tab\', active && \'Tab--active\', disabled && \'Tab--disabled\'].filter(Boolean).join(\' \')\n\n写法 3——模板字符串：\n\n`Tab ${active ? \'Tab--active\' : \'\'}`\n\nstyle 写法：\n\nstyle={{ width: `${percent}%`, backgroundColor: isError ? \'red\' : \'#ccc\' }}\n\n注意：style 的值是对象，外层 {} 是 JSX 表达式，内层 {} 是 JS 对象。属性名驼峰：fontSize、zIndex、backgroundColor。',
          },
          {
            type: 'code',
            title: '完整可抄 demo：Tab 切换（动态 className）',
            language: 'jsx',
            body: `import { useState } from 'react'
import './Tabs.css'

function Tab({ active, children, onClick }) {
  const className = [
    'Tab',
    active ? 'Tab--active' : '',
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
  const [activeKey, setActiveKey] = useState('intro')

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
            active={activeKey === tab.key}
            onClick={() => setActiveKey(tab.key)}
          >
            {tab.label}
          </Tab>
        ))}
      </div>
      <div className="Tabs-panel">
        {activeKey === 'intro' && <p>这是介绍内容</p>}
        {activeKey === 'code' && <pre>const x = 1</pre>}
        {activeKey === 'tip' && <p>记得保存文件</p>}
      </div>
    </div>
  )
}

/* Tabs.css
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

function TextField({ label, value, onChange, error }) {
  const inputClass = [
    'TextField-input',
    error ? 'TextField-input--error' : '',
    value ? 'TextField-input--filled' : '',
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
    setEmailError(validateEmail(val))
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

/* CSS 片段
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
  /* 有内容时略深边框 */
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

function ProgressBar({ percent, label }) {
  const safe = Math.min(100, Math.max(0, percent))

  return (
    <div className="Progress">
      <div className="Progress-label">
        {label}：{safe}%
      </div>
      <div className="Progress-track">
        {/* 宽度是运行时才知道的 → 用 style */}
        <div
          className="Progress-bar"
          style={{ width: \`\${safe}%\` }}
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
              // 也可以纯 CSS，这里演示 style 覆盖颜色
              color: filled ? '#f59e0b' : '#d1d5db',
              fontSize: 24,
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
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ padding: 24, maxWidth: 400 }}>
      <h2>动态样式 Demo</h2>
      <ProgressBar percent={progress} label="加载进度" />
      <StarRating score={Math.round(progress / 20)} />
    </div>
  )
}

/* Progress.css
.Progress-track {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}
.Progress-bar {
  height: 100%;
  background: #2563eb;
  transition: width 0.3s ease;
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
 * 在根元素切换 class，CSS 变量跟着变
 * 比每个元素写 style 更易维护
 */
function ThemeBox() {
  const [dark, setDark] = useState(false)

  return (
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
  --tb-bg: #ffffff;
  --tb-text: #111827;
  --tb-card: #f3f4f6;
  padding: 24px;
  background: var(--tb-bg);
  color: var(--tb-text);
  min-height: 200px;
  transition: background 0.2s, color 0.2s;
}
.ThemeBox--dark {
  --tb-bg: #111827;
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
  ],
}

export default styling
