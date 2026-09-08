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
        style 里 top: \'10px\'（手动字符串）
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
        margin: \'12px 24px\'；padding: 8 → 8px
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
