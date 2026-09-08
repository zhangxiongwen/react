/**
 * Part 1：HTML/CSS 基础 + Flex 布局（35 个渐进 Demo）
 */
const demos = [
  // ── 01-基础入门（8）────────────────────────────────────────
  {
    id: 'p1-basic-blank',
    title: '空白模板',
    group: '01-基础入门',
    summary: '最小可运行 HTML，从零开始写',
    code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>空白模板</title>
  <style>
    /* 全局：让 padding/border 算进 width，避免布局意外 */
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 16px;                              /* 去掉浏览器默认 8px 外边距 */
      font: 14px/1.6 system-ui, sans-serif;      /* 系统字体 + 行高 */
      color: #1f2a24;
    }
  </style>
</head>
<body>
  <!-- 从这里开始写你的 HTML -->
  <h1>开始写代码吧</h1>
  <p>左侧改代码，右侧实时预览。支持 HTML / CSS / JavaScript。</p>
</body>
</html>`,
  },
  {
    id: 'p1-basic-block-stack',
    title: '块级元素纵向堆叠',
    group: '01-基础入门',
    summary: 'div / p / h1 默认占满一行，自上而下排列',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  /* 块级元素：width 默认 100%，独占一行 */
  .block {
    padding: 12px 16px;
    margin-bottom: 8px;           /* 块与块之间的垂直间距 */
    background: #eef6f1;
    border: 1px solid #9bb5a6;
    border-radius: 8px;
  }
  .block--accent { background: #d9ebe1; border-color: #2f6b4f; }
</style>

<!-- 三个 div 会纵向堆叠，不会并排 -->
<div class="block block--accent">标题区 — 块级元素</div>
<div class="block">正文段落：块级元素宽度撑满父级，换行后仍占一整行。</div>
<div class="block">底部说明：无需 flex，默认文档流就是竖排。</div>`,
  },
  {
    id: 'p1-basic-inline-block',
    title: '行内 vs 块级',
    group: '01-基础入门',
    summary: 'span 不换行；display:block 可强制换行',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; }

  .row {
    padding: 12px;
    margin-bottom: 12px;
    background: #f7faf8;
    border: 1px dashed #9bb5a6;
    border-radius: 8px;
  }
  /* 行内：在同一行里排列，宽高由内容决定 */
  .tag {
    display: inline;              /* 默认值，可省略 */
    padding: 4px 10px;
    background: #2f6b4f;
    color: #fff;
    border-radius: 999px;
    font-size: 12px;
    /* 注意：inline 元素的上下 padding 可能不影响行高 */
  }
  /* 块级：独占一行 */
  .tag-block {
    display: block;
    margin-top: 6px;
    padding: 8px 12px;
    background: #eef6f1;
    border: 1px solid #9bb5a6;
    border-radius: 6px;
    color: #1f2a24;
  }
</style>

<div class="row">
  <!-- span 是行内元素，多个 span 会排在同一行 -->
  <span class="tag">React</span>
  <span class="tag">CSS</span>
  <span class="tag">HTML</span>
  <span>← 这些标签在同一行流动</span>
</div>

<div class="row">
  <span class="tag-block">display:block 后，每个 span 独占一行</span>
  <span class="tag-block">像卡片列表一样竖排</span>
</div>`,
  },
  {
    id: 'p1-basic-box-sizing',
    title: 'box-sizing: border-box',
    group: '01-基础入门',
    summary: 'width 是否包含 padding 和 border',
    code: `<style>
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; }
  .compare { display: flex; gap: 16px; flex-wrap: wrap; }

  .box {
    width: 160px;                 /* 声明宽度都是 160px */
    padding: 20px;
    border: 4px solid #2f6b4f;
    background: #eef6f1;
    border-radius: 8px;
    font-size: 13px;
  }
  /* content-box（默认）：160px 只算内容区，总宽 = 160 + 40 + 8 = 208px */
  .content-box {
    box-sizing: content-box;
  }
  /* border-box（推荐）：160px 含 padding + border，视觉宽度就是 160px */
  .border-box {
    box-sizing: border-box;
  }
  .label { font-weight: 700; margin-bottom: 6px; color: #2f6b4f; }
  .hint { font-size: 12px; color: #5c6b62; margin-top: 12px; }
</style>

<p class="hint">两个盒子都写 width:160px — 观察实际占位宽度差异</p>
<div class="compare">
  <div class="box content-box">
    <div class="label">content-box</div>
    总宽超出 160px
  </div>
  <div class="box border-box">
    <div class="label">border-box ✓</div>
    总宽正好 160px
  </div>
</div>`,
  },
  {
    id: 'p1-basic-margin-auto',
    title: 'margin:auto 水平居中',
    group: '01-基础入门',
    summary: '块级元素设固定宽 + 左右 margin 自动',
    code: `<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 24px;
    font: 14px/1.6 system-ui, sans-serif;
    background: #f4f7f5;
  }

  /* 关键：块级 + 有明确 width + margin-left/right:auto → 水平居中 */
  .card {
    width: 280px;
    margin: 0 auto;               /* 上下 0，左右自动平分剩余空间 */
    padding: 20px 24px;
    background: #fff;
    border: 1px solid #9bb5a6;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(31, 42, 36, 0.08);
  }
  .card h2 { margin: 0 0 8px; font-size: 18px; color: #2f6b4f; }
  .card p { margin: 0; color: #5c6b62; font-size: 13px; }
</style>

<!-- 登录卡片示例：经典 margin:auto 居中 -->
<article class="card">
  <h2>欢迎回来</h2>
  <p>改 .card 的 width 或去掉 margin:auto，看居中效果变化。</p>
</article>`,
  },
  {
    id: 'p1-basic-padding-button',
    title: 'padding 与可点击区域',
    group: '01-基础入门',
    summary: '内边距扩大按钮，提升可点性',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .toolbar {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 12px;
    background: #f7faf8;
    border-radius: 10px;
  }
  /* 按钮：padding 决定「可点击热区」大小 */
  .btn {
    padding: 10px 18px;           /* 上下 10px，左右 18px 内边距 */
    border: 1px solid #2f6b4f;
    border-radius: 8px;
    background: #fff;
    color: #2f6b4f;
    font: inherit;
    cursor: pointer;
  }
  .btn--primary {
    padding: 10px 24px;           /* 主按钮可以更大一点 */
    background: #2f6b4f;
    color: #fff;
    border-color: #2f6b4f;
  }
  /* 对比：padding 太小，难点 */
  .btn--tiny {
    padding: 2px 6px;
    font-size: 12px;
  }
</style>

<div class="toolbar">
  <button class="btn">取消</button>
  <button class="btn btn--primary">保存修改</button>
  <button class="btn btn--tiny">太小</button>
  <span style="font-size:12px;color:#5c6b62;">← 对比 padding 差异</span>
</div>`,
  },
  {
    id: 'p1-basic-two-cols-percent',
    title: '两栏 50% 溢出 vs 修复',
    group: '01-基础入门',
    summary: 'content-box 下 50%+50% 会换行；border-box 可并排',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .section { margin-bottom: 20px; }
  .section h3 { margin: 0 0 8px; font-size: 14px; color: #2f6b4f; }
  .row { display: flex; flex-wrap: wrap; border: 1px dashed #9bb5a6; }

  .col {
    width: 50%;                   /* 各占一半 */
    padding: 12px;
    border: 2px solid #2f6b4f;
    background: #eef6f1;
    font-size: 13px;
  }
  /* 问题演示：content-box 时 border+padding 让总宽 > 50%，第二列被挤换行 */
  .broken .col { box-sizing: content-box; }

  .hint { font-size: 12px; color: #c53030; margin-top: 6px; }
  .ok { font-size: 12px; color: #2f6b4f; margin-top: 6px; }
</style>

<div class="section">
  <h3>❌ content-box：50% + 50% 却换行了</h3>
  <div class="row broken">
    <div class="col">左栏 50%</div>
    <div class="col">右栏被挤到下一行</div>
  </div>
  <p class="hint">padding + border 额外占宽，总和超过 100%</p>
</div>

<div class="section">
  <h3>✓ border-box：两栏正常并排</h3>
  <div class="row">
    <div class="col">左栏 50%</div>
    <div class="col">右栏 50%</div>
  </div>
  <p class="ok">width 已含 padding/border，加起来正好 100%</p>
</div>`,
  },
  {
    id: 'p1-basic-gap-vs-margin',
    title: 'gap vs margin 间距',
    group: '01-基础入门',
    summary: 'Flex gap 只控间距；margin 还会叠加外边距',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .demo { margin-bottom: 20px; }
  .demo h3 { margin: 0 0 8px; font-size: 14px; color: #2f6b4f; }
  .cards { display: flex; }

  .card {
    flex: 1;
    padding: 12px;
    background: #eef6f1;
    border: 1px solid #9bb5a6;
    border-radius: 8px;
    font-size: 13px;
  }

  /* 方式 A：margin-right 做间距 — 最后一个也要记得处理 */
  .with-margin .card { margin-right: 12px; }
  .with-margin .card:last-child { margin-right: 0; }

  /* 方式 B：gap — 只作用于 flex 子项之间，更干净 */
  .with-gap { gap: 12px; }

  .note { font-size: 12px; color: #5c6b62; margin-top: 6px; }
</style>

<div class="demo">
  <h3>margin-right 间距</h3>
  <div class="cards with-margin">
    <div class="card">卡片 A</div>
    <div class="card">卡片 B</div>
    <div class="card">卡片 C</div>
  </div>
  <p class="note">需 :last-child 去掉末尾 margin，且 margin 会参与外边距折叠</p>
</div>

<div class="demo">
  <h3>gap 间距（Flex 推荐）</h3>
  <div class="cards with-gap">
    <div class="card">卡片 A</div>
    <div class="card">卡片 B</div>
    <div class="card">卡片 C</div>
  </div>
  <p class="note">一行 gap:12px 搞定，子项之间均匀留空</p>
</div>`,
  },

  // ── 02-Flex·Row（14）────────────────────────────────────────
  {
    id: 'p1-flex-row-basic',
    title: 'Flex 行：基础并排',
    group: '02-Flex·Row',
    summary: 'display:flex 让子元素默认横排',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 开启 Flex：子元素沿主轴（默认水平）排列 */
  .bar {
    display: flex;
    gap: 12px;
    padding: 12px 16px;
    background: #2f6b4f;
    color: #fff;
    border-radius: 10px;
  }
  .bar__logo { font-weight: 700; }
  .bar__nav { display: flex; gap: 16px; }
  .bar__nav button {
    border: 0; background: transparent; font: inherit; cursor: pointer;
    color: #fff; opacity: 0.9; padding: 0;
  }
  .bar__nav button:hover { opacity: 1; text-decoration: underline; }
</style>

<!-- 简易顶栏：logo 和导航横排 -->
<header class="bar">
  <div class="bar__logo">Study</div>
  <nav class="bar__nav">
    <button type="button">首页</button>
    <button type="button">课程</button>
    <button type="button">关于</button>
  </nav>
</header>`,
  },
  {
    id: 'p1-flex-row-nav',
    title: 'space-between 导航',
    group: '02-Flex·Row',
    summary: '主轴两端对齐，中间自动撑开',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; }

  .nav {
    display: flex;
    justify-content: space-between; /* 主轴：首尾贴边，中间均分剩余空间 */
    align-items: center;            /* 交叉轴：垂直居中 */
    padding: 12px 20px;
    background: #1f2a24;
    color: #fff;
  }
  .nav__brand { font-weight: 700; font-size: 16px; }
  .nav__links { display: flex; gap: 20px; }
  .nav__links button { border: 0; background: transparent; font: inherit; cursor: pointer; padding: 0; }
  .nav__links a, .nav__links button { color: #e8f0eb; text-decoration: none; }
  .nav__actions { display: flex; gap: 8px; }
  .nav__btn {
    padding: 6px 14px;
    border-radius: 6px;
    border: 1px solid #6fcf97;
    background: transparent;
    color: #6fcf97;
    font: inherit;
    cursor: pointer;
  }
  .nav__btn--fill { background: #2f6b4f; border-color: #2f6b4f; color: #fff; }
</style>

<nav class="nav">
  <div class="nav__brand">React Study</div>
  <div class="nav__links">
    <button type="button">文档</button>
    <button type="button">示例</button>
    <button type="button">社区</button>
  </div>
  <div class="nav__actions">
    <button class="nav__btn">登录</button>
    <button class="nav__btn nav__btn--fill">注册</button>
  </div>
</nav>`,
  },
  {
    id: 'p1-flex-row-space-around',
    title: 'space-around 均匀留白',
    group: '02-Flex·Row',
    summary: '每个子项两侧各有一半间距',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .tabs {
    display: flex;
    justify-content: space-around; /* 子项周围空间相等（首尾只有半份） */
    padding: 8px;
    background: #f7faf8;
    border: 1px solid #d9e0d8;
    border-radius: 10px;
  }
  .tab {
    padding: 10px 16px;
    border: none;
    background: transparent;
    font: inherit;
    color: #5c6b62;
    cursor: pointer;
    border-radius: 6px;
  }
  .tab--active {
    background: #2f6b4f;
    color: #fff;
    font-weight: 600;
  }
  .hint { font-size: 12px; color: #5c6b62; margin-top: 8px; }
</style>

<div class="tabs">
  <button class="tab tab--active">概览</button>
  <button class="tab">分析</button>
  <button class="tab">设置</button>
</div>
<p class="hint">space-around：每项左右各有半份空隙，首尾贴边感较弱</p>`,
  },
  {
    id: 'p1-flex-row-space-evenly',
    title: 'space-evenly 完全均分',
    group: '02-Flex·Row',
    summary: '子项之间与首尾间距完全相等',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .steps {
    display: flex;
    justify-content: space-evenly;  /* 所有间隙（含首尾）宽度相同 */
    align-items: center;
    padding: 16px;
    background: #eef6f1;
    border-radius: 10px;
  }
  .step {
    text-align: center;
    font-size: 13px;
    color: #1f2a24;
  }
  .step__num {
    display: inline-flex;
    width: 32px;
    height: 32px;
    align-items: center;
    justify-content: center;
    background: #2f6b4f;
    color: #fff;
    border-radius: 50%;
    font-weight: 700;
    margin-bottom: 4px;
  }
  .hint { font-size: 12px; color: #5c6b62; margin-top: 8px; }
</style>

<div class="steps">
  <div class="step"><div class="step__num">1</div>注册</div>
  <div class="step"><div class="step__num">2</div>验证</div>
  <div class="step"><div class="step__num">3</div>完成</div>
</div>
<p class="hint">对比 space-around：evenly 让第一个和最后一个元素到边缘的空隙也相等</p>`,
  },
  {
    id: 'p1-flex-row-center',
    title: '双轴居中',
    group: '02-Flex·Row',
    summary: 'justify + align 同时 center',
    code: `<style>
  * { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; }
  body {
    display: flex;
    justify-content: center;  /* 主轴（水平）居中 */
    align-items: center;      /* 交叉轴（垂直）居中 */
    background: #f4f7f5;
    font: 14px/1.5 system-ui, sans-serif;
  }
  .modal {
    width: 300px;
    padding: 24px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #9bb5a6;
    box-shadow: 0 12px 40px rgba(31, 42, 36, 0.12);
    text-align: center;
  }
  .modal h2 { margin: 0 0 8px; color: #2f6b4f; }
  .modal p { margin: 0 0 16px; color: #5c6b62; font-size: 13px; }
  .modal button {
    padding: 8px 20px;
    border: none;
    border-radius: 8px;
    background: #2f6b4f;
    color: #fff;
    font: inherit;
    cursor: pointer;
  }
</style>

<!-- 空状态 / 弹窗类 UI 常用双轴居中 -->
<div class="modal">
  <h2>操作成功</h2>
  <p>你的修改已保存，可在列表中查看。</p>
  <button>知道了</button>
</div>`,
  },
  {
    id: 'p1-flex-row-start-end',
    title: 'flex-start / flex-end',
    group: '02-Flex·Row',
    summary: '子项靠主轴起点或终点对齐',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .demo { margin-bottom: 16px; }
  .demo h3 { margin: 0 0 8px; font-size: 13px; color: #2f6b4f; }
  .row {
    display: flex;
    gap: 8px;
    padding: 12px;
    min-height: 56px;
    background: #f7faf8;
    border: 1px dashed #9bb5a6;
    border-radius: 8px;
  }
  .chip {
    padding: 6px 12px;
    background: #d9ebe1;
    border-radius: 6px;
    font-size: 13px;
  }
  /* 靠左（主轴起点，默认） */
  .start { justify-content: flex-start; }
  /* 靠右（主轴终点） */
  .end { justify-content: flex-end; }
</style>

<div class="demo">
  <h3>justify-content: flex-start（默认靠左）</h3>
  <div class="row start">
    <span class="chip">标签 A</span>
    <span class="chip">标签 B</span>
  </div>
</div>

<div class="demo">
  <h3>justify-content: flex-end（靠右）</h3>
  <div class="row end">
    <span class="chip">标签 A</span>
    <span class="chip">标签 B</span>
  </div>
</div>`,
  },
  {
    id: 'p1-flex-row-gap',
    title: 'Flex gap 间距',
    group: '02-Flex·Row',
    summary: '一行 gap 控制 flex 子项间距',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .actions {
    display: flex;
    gap: 10px;                    /* 子项之间固定 10px，不影响容器边缘 */
    flex-wrap: wrap;
  }
  .btn {
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid #9bb5a6;
    background: #fff;
    font: inherit;
    cursor: pointer;
  }
  .btn--primary { background: #2f6b4f; color: #fff; border-color: #2f6b4f; }
  .btn--danger { color: #c53030; border-color: #c53030; }
</style>

<!-- 表单底部操作栏 -->
<div class="actions">
  <button class="btn btn--primary">提交</button>
  <button class="btn">存草稿</button>
  <button class="btn btn--danger">删除</button>
</div>`,
  },
  {
    id: 'p1-flex-row-wrap-chips',
    title: 'flex-wrap 标签换行',
    group: '02-Flex·Row',
    summary: '空间不足时自动折行',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .tags {
    display: flex;
    flex-wrap: wrap;              /* 允许换行（默认 nowrap 会挤在一起） */
    gap: 8px;                     /* 行内、行间间距都由 gap 控制 */
    padding: 12px;
    background: #f7faf8;
    border-radius: 10px;
    max-width: 320px;             /* 缩窄容器触发换行 */
  }
  .tag {
    padding: 4px 10px;
    background: #eef6f1;
    border: 1px solid #9bb5a6;
    border-radius: 999px;
    font-size: 12px;
    color: #2f6b4f;
  }
  .hint { font-size: 12px; color: #5c6b62; margin-top: 8px; }
</style>

<div class="tags">
  <span class="tag">JavaScript</span>
  <span class="tag">TypeScript</span>
  <span class="tag">React</span>
  <span class="tag">CSS Modules</span>
  <span class="tag">Vite</span>
  <span class="tag">Flexbox</span>
  <span class="tag">Grid</span>
</div>
<p class="hint">缩小预览宽度，标签会自动换行</p>`,
  },
  {
    id: 'p1-flex-row-nowrap-overflow',
    title: 'nowrap 横向溢出',
    group: '02-Flex·Row',
    summary: '不换行时子项可能被压缩或溢出',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .scroll-row {
    display: flex;
    flex-wrap: nowrap;              /* 强制单行 */
    gap: 12px;
    overflow-x: auto;               /* 溢出时横向滚动（常见移动端方案） */
    padding: 12px;
    background: #f7faf8;
    border-radius: 10px;
    max-width: 280px;
  }
  .pill {
    flex-shrink: 0;                 /* 禁止被 flex 压缩宽度 */
    padding: 8px 16px;
    background: #2f6b4f;
    color: #fff;
    border-radius: 999px;
    font-size: 13px;
    white-space: nowrap;
  }
  .hint { font-size: 12px; color: #5c6b62; margin-top: 8px; }
</style>

<!-- 横向滑动分类 Tab -->
<div class="scroll-row">
  <span class="pill">全部</span>
  <span class="pill">前端</span>
  <span class="pill">后端</span>
  <span class="pill">移动端</span>
  <span class="pill">DevOps</span>
  <span class="pill">设计</span>
</div>
<p class="hint">nowrap + flex-shrink:0 + overflow-x:auto 是横向 Tab 常用组合</p>`,
  },
  {
    id: 'p1-flex-row-align-items',
    title: 'align-items 交叉轴对齐',
    group: '02-Flex·Row',
    summary: 'stretch / center / baseline 对比',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .demo { margin-bottom: 16px; }
  .demo h3 { margin: 0 0 8px; font-size: 13px; color: #2f6b4f; }
  .row {
    display: flex;
    gap: 8px;
    min-height: 72px;
    padding: 8px;
    background: #f7faf8;
    border: 1px dashed #9bb5a6;
    border-radius: 8px;
  }
  .box { padding: 8px 12px; background: #d9ebe1; border-radius: 6px; font-size: 13px; }
  .box--tall { padding: 20px 12px; }
  .box--text { font-size: 20px; }

  .stretch { align-items: stretch; }    /* 默认：拉伸到容器交叉轴高度 */
  .center { align-items: center; }      /* 垂直居中 */
  .baseline { align-items: baseline; }  /* 文字基线对齐 */
</style>

<div class="demo">
  <h3>stretch（默认拉伸）</h3>
  <div class="row stretch">
    <div class="box">矮</div>
    <div class="box box--tall">高</div>
  </div>
</div>

<div class="demo">
  <h3>center（垂直居中）</h3>
  <div class="row center">
    <div class="box">矮</div>
    <div class="box box--tall">高</div>
  </div>
</div>

<div class="demo">
  <h3>baseline（文字基线）</h3>
  <div class="row baseline">
    <div class="box">14px 文字</div>
    <div class="box box--text">20px</div>
  </div>
</div>`,
  },
  {
    id: 'p1-flex-row-ml-auto',
    title: 'margin-left:auto 右推',
    group: '02-Flex·Row',
    summary: '单个 flex 子项靠右的经典技巧',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    background: #eef6f1;
    border-radius: 10px;
  }
  .toolbar__title { font-weight: 600; color: #1f2a24; }
  .toolbar__badge {
    padding: 2px 8px;
    background: #2f6b4f;
    color: #fff;
    border-radius: 999px;
    font-size: 11px;
  }
  /* 关键：auto 会吃掉左侧所有剩余空间，把元素推到最右 */
  .toolbar__action {
    margin-left: auto;
    padding: 6px 12px;
    border: 1px solid #2f6b4f;
    border-radius: 6px;
    background: #fff;
    color: #2f6b4f;
    font: inherit;
    cursor: pointer;
  }
</style>

<div class="toolbar">
  <span class="toolbar__title">未读消息</span>
  <span class="toolbar__badge">3</span>
  <button class="toolbar__action">全部标为已读</button>
</div>`,
  },
  {
    id: 'p1-flex-row-flex-1',
    title: 'flex:1 等分剩余',
    group: '02-Flex·Row',
    summary: '多列均分宽度，中间栏自适应',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .stats {
    display: flex;
    gap: 12px;
  }
  .stat {
    flex: 1;                        /* flex-grow:1 + flex-shrink:1 + flex-basis:0% */
    padding: 16px;
    background: #fff;
    border: 1px solid #9bb5a6;
    border-radius: 10px;
    text-align: center;
  }
  .stat__num { font-size: 24px; font-weight: 700; color: #2f6b4f; }
  .stat__label { font-size: 12px; color: #5c6b62; margin-top: 4px; }
</style>

<!-- 三列数据概览：每列等宽 -->
<div class="stats">
  <div class="stat">
    <div class="stat__num">128</div>
    <div class="stat__label">学习时长(h)</div>
  </div>
  <div class="stat">
    <div class="stat__num">42</div>
    <div class="stat__label">完成章节</div>
  </div>
  <div class="stat">
    <div class="stat__num">95%</div>
    <div class="stat__label">正确率</div>
  </div>
</div>`,
  },
  {
    id: 'p1-flex-row-grow-shrink',
    title: 'flex-grow / shrink',
    group: '02-Flex·Row',
    summary: '空间多余时 grow，不足时 shrink',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .layout {
    display: flex;
    gap: 8px;
    padding: 12px;
    background: #f7faf8;
    border-radius: 10px;
    max-width: 360px;
  }
  .side {
    flex: 0 0 80px;                 /* 不 grow 不 shrink，固定 80px */
    padding: 12px;
    background: #eef6f1;
    border-radius: 6px;
    font-size: 12px;
    text-align: center;
  }
  .main {
    flex: 1 1 auto;                 /* 可 grow 可 shrink，吃掉剩余空间 */
    padding: 12px;
    background: #d9ebe1;
    border-radius: 6px;
    font-size: 13px;
  }
  .aside {
    flex: 0 1 100px;                /* 不 grow，但空间不够时可 shrink 到 100px 以下 */
    padding: 12px;
    background: #eef6f1;
    border-radius: 6px;
    font-size: 12px;
  }
  .hint { font-size: 12px; color: #5c6b62; margin-top: 8px; }
</style>

<div class="layout">
  <aside class="side">侧栏<br/>固定 80px</aside>
  <main class="main">主内容 flex:1 — 宽度随容器变化</main>
  <aside class="aside">右栏<br/>可收缩</aside>
</div>
<p class="hint">缩小预览宽度，观察 main 变窄、aside 被压缩</p>`,
  },
  {
    id: 'p1-flex-row-order',
    title: 'order 视觉排序',
    group: '02-Flex·Row',
    summary: '不改变 DOM，只改 Flex 显示顺序',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .card {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 14px;
    background: #fff;
    border: 1px solid #9bb5a6;
    border-radius: 10px;
    max-width: 360px;
  }
  .card__thumb {
    width: 56px;
    height: 56px;
    background: #d9ebe1;
    border-radius: 8px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }
  .card__body { flex: 1; }
  .card__body h3 { margin: 0 0 4px; font-size: 15px; }
  .card__body p { margin: 0; font-size: 13px; color: #5c6b62; }
  /* DOM 里按钮在最后，但 order 让它显示在最左（移动端常见：操作按钮前置） */
  .card__action {
    order: -1;                      /* 数字越小越靠前，默认是 0 */
    padding: 6px 10px;
    border: 1px solid #c53030;
    border-radius: 6px;
    background: #fff;
    color: #c53030;
    font: inherit;
    font-size: 12px;
    cursor: pointer;
  }
  .hint { font-size: 12px; color: #5c6b62; margin-top: 8px; }
</style>

<article class="card">
  <div class="card__thumb">📦</div>
  <div class="card__body">
    <h3>订单 #1024</h3>
    <p>已发货 · 预计明天送达</p>
  </div>
  <!-- HTML 顺序：缩略图 → 文字 → 按钮；视觉上按钮被 order:-1 拉到最前 -->
  <button class="card__action">取消</button>
</article>
<p class="hint">注意：order 只改视觉，Tab 键焦点顺序仍按 DOM</p>`,
  },

  // ── 03-Flex·Column（13）────────────────────────────────────────
  {
    id: 'p1-flex-col-stack',
    title: 'Flex 列：纵向堆叠',
    group: '03-Flex·Column',
    summary: 'flex-direction:column 竖排子元素',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  .article {
    display: flex;
    flex-direction: column;         /* 主轴改为垂直 → 子元素自上而下 */
    gap: 12px;
    max-width: 360px;
    padding: 16px;
    background: #fff;
    border: 1px solid #9bb5a6;
    border-radius: 12px;
  }
  .article__meta { font-size: 12px; color: #5c6b62; }
  .article__title { margin: 0; font-size: 20px; color: #2f6b4f; }
  .article__body { margin: 0; color: #1f2a24; }
  .article__tags { display: flex; gap: 6px; }
  .tag {
    padding: 2px 8px;
    background: #eef6f1;
    border-radius: 999px;
    font-size: 11px;
    color: #2f6b4f;
  }
</style>

<article class="article">
  <div class="article__meta">2026-09-07 · 5 分钟阅读</div>
  <h1 class="article__title">Flex 纵向布局入门</h1>
  <p class="article__body">把 flex-direction 设为 column，就能优雅地堆叠标题、正文和标签。</p>
  <div class="article__tags">
    <span class="tag">CSS</span>
    <span class="tag">布局</span>
  </div>
</article>`,
  },
  {
    id: 'p1-flex-col-center',
    title: '列方向居中',
    group: '03-Flex·Column',
    summary: 'column + justify/align 居中内容',
    code: `<style>
  * { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; }
  body {
    display: flex;
    flex-direction: column;         /* 竖排 */
    justify-content: center;        /* 主轴（垂直）居中 */
    align-items: center;            /* 交叉轴（水平）居中 */
    background: #f4f7f5;
    font: 14px/1.5 system-ui, sans-serif;
  }
  .empty {
    text-align: center;
    padding: 24px;
  }
  .empty__icon { font-size: 48px; margin-bottom: 12px; }
  .empty__title { margin: 0 0 8px; color: #1f2a24; }
  .empty__desc { margin: 0 0 16px; color: #5c6b62; font-size: 13px; }
  .empty button {
    padding: 8px 18px;
    border: none;
    border-radius: 8px;
    background: #2f6b4f;
    color: #fff;
    font: inherit;
    cursor: pointer;
  }
</style>

<!-- 空状态页：column flex 双轴居中 -->
<div class="empty">
  <div class="empty__icon">📭</div>
  <h2 class="empty__title">暂无数据</h2>
  <p class="empty__desc">你还没有创建任何项目，点击下方开始吧。</p>
  <button>新建项目</button>
</div>`,
  },
  {
    id: 'p1-flex-col-footer-stick',
    title: '页脚沉底 flex:1',
    group: '03-Flex·Column',
    summary: '中间 main 撑满，footer 贴底',
    code: `<style>
  * { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; }
  body {
    display: flex;
    flex-direction: column;         /* 整页竖排：header → main → footer */
    font: 14px/1.5 system-ui, sans-serif;
  }
  header, footer {
    padding: 12px 16px;
    background: #2f6b4f;
    color: #fff;
    flex-shrink: 0;                 /* 头尾不被压缩 */
  }
  main {
    flex: 1;                        /* 吃掉剩余高度，把 footer 推到底部 */
    padding: 16px;
    background: #f7faf8;
  }
</style>

<header>顶栏 Header</header>
<main>
  <h1 style="margin-top:0;">内容区</h1>
  <p>内容少时，footer 仍贴在视口底部。</p>
</main>
<footer>底栏 Footer</footer>`,
  },
  {
    id: 'p1-flex-col-chat',
    title: '聊天布局三件套',
    group: '03-Flex·Column',
    summary: '头 + 可滚动列表 + 底部输入',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; }

  .chat {
    display: flex;
    flex-direction: column;
    height: 280px;                    /* 模拟固定高度容器 */
    max-width: 360px;
    margin: 16px;
    border: 1px solid #9bb5a6;
    border-radius: 12px;
    overflow: hidden;
  }
  .chat__header {
    flex-shrink: 0;
    padding: 12px 16px;
    background: #2f6b4f;
    color: #fff;
    font-weight: 600;
  }
  .chat__list {
    flex: 1;                        /* 中间区域占满剩余高度 */
    overflow-y: auto;               /* 消息多了就滚动 */
    padding: 12px;
    background: #f7faf8;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .msg {
    align-self: flex-start;
    max-width: 75%;
    padding: 8px 12px;
    background: #fff;
    border: 1px solid #d9e0d8;
    border-radius: 12px 12px 12px 4px;
    font-size: 13px;
  }
  .msg--me {
    align-self: flex-end;
    background: #d9ebe1;
    border-color: #9bb5a6;
    border-radius: 12px 12px 4px 12px;
  }
  .chat__input {
    flex-shrink: 0;
    display: flex;
    gap: 8px;
    padding: 10px;
    border-top: 1px solid #d9e0d8;
    background: #fff;
  }
  .chat__input input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #9bb5a6;
    border-radius: 8px;
    font: inherit;
  }
  .chat__input button {
    padding: 8px 14px;
    border: none;
    border-radius: 8px;
    background: #2f6b4f;
    color: #fff;
    font: inherit;
    cursor: pointer;
  }
</style>

<div class="chat">
  <header class="chat__header">小明</header>
  <div class="chat__list">
    <div class="msg">你好，Flex column 怎么做聊天框？</div>
    <div class="msg msg--me">头尾 flex-shrink:0，中间 flex:1 + overflow</div>
    <div class="msg">明白了，谢谢！</div>
    <div class="msg">再多几条消息试试滚动 ↓</div>
    <div class="msg msg--me">OK</div>
    <div class="msg">👍</div>
  </div>
  <footer class="chat__input">
    <input type="text" placeholder="输入消息…" />
    <button>发送</button>
  </footer>
</div>`,
  },
  {
    id: 'p1-flex-col-form',
    title: '表单纵向字段',
    group: '03-Flex·Column',
    summary: 'label + input 竖排，gap 控间距',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .form {
    display: flex;
    flex-direction: column;
    gap: 14px;                      /* 字段之间的统一间距 */
    max-width: 320px;
    padding: 20px;
    background: #fff;
    border: 1px solid #9bb5a6;
    border-radius: 12px;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;                       /* label 与 input 之间小间距 */
  }
  .field label { font-size: 13px; font-weight: 600; color: #1f2a24; }
  .field input, .field textarea {
    padding: 8px 12px;
    border: 1px solid #9bb5a6;
    border-radius: 8px;
    font: inherit;
  }
  .field textarea { min-height: 72px; resize: vertical; }
  .form button {
    margin-top: 4px;
    padding: 10px;
    border: none;
    border-radius: 8px;
    background: #2f6b4f;
    color: #fff;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
  }
</style>

<form class="form">
  <div class="field">
    <label for="name">姓名</label>
    <input id="name" type="text" placeholder="请输入姓名" />
  </div>
  <div class="field">
    <label for="email">邮箱</label>
    <input id="email" type="email" placeholder="you@example.com" />
  </div>
  <div class="field">
    <label for="bio">简介</label>
    <textarea id="bio" placeholder="简单介绍一下自己"></textarea>
  </div>
  <button type="submit">提交</button>
</form>`,
  },
  {
    id: 'p1-flex-col-reverse',
    title: 'column-reverse 倒序',
    group: '03-Flex·Column',
    summary: '视觉从下到上，DOM 顺序不变',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .timeline {
    display: flex;
    flex-direction: column-reverse; /* 主轴反向：最后一个 DOM 元素显示在最上 */
    gap: 8px;
    max-width: 320px;
  }
  .event {
    padding: 12px 14px;
    background: #eef6f1;
    border-left: 3px solid #2f6b4f;
    border-radius: 0 8px 8px 0;
    font-size: 13px;
  }
  .event__time { font-size: 11px; color: #5c6b62; margin-bottom: 4px; }
  .hint { font-size: 12px; color: #5c6b62; margin-top: 10px; }
</style>

<!-- DOM 按时间正序写，CSS 反转让最新事件在上 -->
<div class="timeline">
  <div class="event">
    <div class="event__time">09:00</div>
    创建账号
  </div>
  <div class="event">
    <div class="event__time">09:15</div>
    完成首次登录
  </div>
  <div class="event">
    <div class="event__time">09:30</div>
    开始学习 Flex
  </div>
</div>
<p class="hint">最新一条「开始学习」显示在最上方</p>`,
  },
  {
    id: 'p1-flex-col-stretch-buttons',
    title: 'stretch 全宽按钮',
    group: '03-Flex·Column',
    summary: 'align-items:stretch 让子项撑满交叉轴',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .panel {
    display: flex;
    flex-direction: column;
    align-items: stretch;           /* 默认值：子项在水平方向拉满 */
    gap: 10px;
    max-width: 280px;
    padding: 16px;
    background: #f7faf8;
    border-radius: 12px;
  }
  .panel p { margin: 0; font-size: 13px; color: #5c6b62; }
  .btn {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #9bb5a6;
    background: #fff;
    font: inherit;
    cursor: pointer;
    text-align: center;
  }
  .btn--primary { background: #2f6b4f; color: #fff; border-color: #2f6b4f; }
  .btn--ghost { background: transparent; color: #2f6b4f; }
</style>

<div class="panel">
  <p>选择登录方式：</p>
  <button class="btn btn--primary">使用微信登录</button>
  <button class="btn">使用手机号登录</button>
  <button class="btn btn--ghost">游客浏览</button>
</div>`,
  },
  {
    id: 'p1-flex-col-space-between',
    title: '列方向 space-between',
    group: '03-Flex·Column',
    summary: '固定高度容器，头尾贴边中间均分',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* 主轴（垂直）首尾贴边，中间均分空隙 */
    height: 200px;                    /* 必须有明确高度才看得出效果 */
    width: 240px;
    padding: 16px;
    background: #fff;
    border: 1px solid #9bb5a6;
    border-radius: 12px;
  }
  .card__top { font-size: 12px; color: #5c6b62; }
  .card__mid { font-size: 32px; font-weight: 700; color: #2f6b4f; }
  .card__bottom {
    font-size: 12px;
    color: #2f6b4f;
    cursor: pointer;
  }
</style>

<div class="card">
  <div class="card__top">今日步数</div>
  <div class="card__mid">8,432</div>
  <div class="card__bottom">查看详情 →</div>
</div>`,
  },
  {
    id: 'p1-flex-col-min-height-scroll',
    title: 'min-height:0 滚动陷阱',
    group: '03-Flex·Column',
    summary: 'overflow 写在「孙元素」上时，父级缺 min-height:0 会滚不动',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; color: #1f2a24; }

  .intro {
    margin: 0 0 14px;
    font-size: 12px;
    color: #5c6b62;
    line-height: 1.65;
  }
  .intro code {
    padding: 1px 4px;
    background: #eef6f1;
    border-radius: 4px;
    font-size: 11px;
  }
  .compare {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    align-items: flex-start;
  }
  .col { width: 200px; }
  .col h4 { margin: 0 0 8px; font-size: 13px; }
  .col.bad h4 { color: #c53030; }
  .col.good h4 { color: #2f6b4f; }

  /*
   * 关键结构（三层）：
   *   .shell  — 固定高度的 Flex 列容器
   *   .mid    — flex:1 的中间层（这里决定要不要 min-height:0）
   *   .scroll — 真正 overflow:auto 的滚动层（孙元素）
   *
   * 注意：如果把 overflow:auto 直接写在 flex 子项上，
   * 浏览器会把「自动最小高度」当成 0，陷阱演示不出来！
   */
  .shell {
    display: flex;
    flex-direction: column;
    height: 180px;
    border: 2px solid #c53030;
    border-radius: 10px;
    background: #fff;
    overflow: hidden; /* 统一裁切，对比「能不能在框内滚」 */
  }
  .shell.good { border-color: #2f6b4f; }

  .head {
    flex-shrink: 0;
    padding: 8px 10px;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    background: #c53030;
  }
  .shell.good .head { background: #2f6b4f; }

  .mid {
    flex: 1;              /* 想占满「头以下」剩余空间 */
    /* ❌ 左边：不写 min-height:0
         默认 min-height:auto → 高度至少等于内容
         → .mid 被内容撑高 → 相对 .shell 溢出被裁掉
         → 内层 .scroll 的 height:100% 也跟着变高，框内滚不动 */
  }
  .shell.good .mid {
    min-height: 0;        /* ✓ 右边：允许比内容更矮，才能把高度锁在壳里 */
  }

  .scroll {
    height: 100%;         /* 相对 .mid；.mid 被撑高时它也跟着高 */
    overflow-y: auto;
    padding: 8px 10px;
    background: #f7faf8;
    font-size: 12px;
  }
  .scroll p {
    margin: 0 0 8px;
    padding: 8px 10px;
    background: #fff;
    border: 1px solid #d9e0d8;
    border-radius: 6px;
  }

  .note {
    margin-top: 10px;
    font-size: 11px;
    line-height: 1.55;
  }
  .note.bad { color: #c53030; }
  .note.good { color: #2f6b4f; }
  .badge {
    display: inline-block;
    margin-top: 6px;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
  }
  .badge.bad { background: #fde8e8; color: #c53030; }
  .badge.good { background: #e6f4ec; color: #2f6b4f; }
</style>

<p class="intro">
  请试着在<strong>两个红/绿框内部</strong>用滚轮或触控板滑动。<br />
  左边：框内<strong>滚不动</strong>（下面条目被裁掉，看不到）。<br />
  右边：框内<strong>可以滚</strong>，能看到第 8 条。<br />
  唯一区别：右边的中间层多了 <code>min-height: 0</code>。
</p>

<div class="compare">
  <div class="col bad">
    <h4>❌ 中间层没有 min-height:0</h4>
    <div class="shell">
      <div class="head">好友列表</div>
      <div class="mid">
        <div class="scroll">
          <p>1. 小明 · 在线</p>
          <p>2. 小红 · 忙碌</p>
          <p>3. 小刚 · 离开</p>
          <p>4. 小美 · 在线</p>
          <p>5. 小强 · 在线</p>
          <p>6. 小芳 · 离线</p>
          <p>7. 小伟 · 在线</p>
          <p>8. 👉 你应该滚到这里</p>
        </div>
      </div>
    </div>
    <span class="badge bad">框内滚不动 · 第 8 条被裁掉</span>
    <p class="note bad">.mid 被内容撑破壳高 → .scroll 的 100% 失效 → overflow 起不了作用。</p>
  </div>

  <div class="col good">
    <h4>✓ 中间层写了 min-height:0</h4>
    <div class="shell good">
      <div class="head">好友列表</div>
      <div class="mid">
        <div class="scroll">
          <p>1. 小明 · 在线</p>
          <p>2. 小红 · 忙碌</p>
          <p>3. 小刚 · 离开</p>
          <p>4. 小美 · 在线</p>
          <p>5. 小强 · 在线</p>
          <p>6. 小芳 · 离线</p>
          <p>7. 小伟 · 在线</p>
          <p>8. 👉 你应该滚到这里</p>
        </div>
      </div>
    </div>
    <span class="badge good">框内可滚动 · 能看到第 8 条</span>
    <p class="note good">.mid 被压回壳内剩余高度 → .scroll 高度受限 → 出现滚动条。</p>
  </div>
</div>`,
  },
  {
    id: 'p1-flex-col-nested-row',
    title: '列里嵌套行：卡片',
    group: '03-Flex·Column',
    summary: '外层 column 堆叠，内层 row 横排',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 360px;
  }
  /* 每个卡片：外层 column */
  .item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 14px;
    background: #fff;
    border: 1px solid #9bb5a6;
    border-radius: 10px;
  }
  /* 卡片顶部：内层 row 横排头像+信息+操作 */
  .item__top {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #d9ebe1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .item__info { flex: 1; }
  .item__info h3 { margin: 0; font-size: 14px; }
  .item__info p { margin: 2px 0 0; font-size: 12px; color: #5c6b62; }
  .item__action {
    padding: 4px 10px;
    border: 1px solid #2f6b4f;
    border-radius: 6px;
    background: #fff;
    color: #2f6b4f;
    font-size: 12px;
    cursor: pointer;
  }
  .item__desc { font-size: 13px; color: #1f2a24; margin: 0; }
</style>

<div class="list">
  <article class="item">
    <div class="item__top">
      <div class="avatar">🧑</div>
      <div class="item__info">
        <h3>张三</h3>
        <p>2 小时前</p>
      </div>
      <button class="item__action">关注</button>
    </div>
    <p class="item__desc">嵌套 Flex：column 管整体，row 管头部一行。</p>
  </article>
  <article class="item">
    <div class="item__top">
      <div class="avatar">👩</div>
      <div class="item__info">
        <h3>李四</h3>
        <p>昨天</p>
      </div>
      <button class="item__action">关注</button>
    </div>
    <p class="item__desc">这是第二条动态内容。</p>
  </article>
</div>`,
  },
  {
    id: 'p1-flex-col-avatar-item',
    title: '头像 + 文字条目',
    group: '03-Flex·Column',
    summary: 'column 列表里每行 row 对齐',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .contacts {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-width: 320px;
    padding: 8px;
    background: #fff;
    border: 1px solid #9bb5a6;
    border-radius: 12px;
  }
  /* 每一行联系人：row 布局 */
  .contact {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 8px;
    border-radius: 8px;
    cursor: pointer;
  }
  .contact:hover { background: #f7faf8; }
  .contact__avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #2f6b4f;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    flex-shrink: 0;
  }
  .contact__text {
    display: flex;
    flex-direction: column;         /* 名字 + 副标题竖排 */
    gap: 2px;
    flex: 1;
    min-width: 0;                   /* 配合 text-overflow 截断长文本 */
  }
  .contact__name { font-weight: 600; font-size: 14px; }
  .contact__status {
    font-size: 12px;
    color: #5c6b62;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .contact__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #6fcf97;
    flex-shrink: 0;
  }
</style>

<div class="contacts">
  <div class="contact">
    <div class="contact__avatar">王</div>
    <div class="contact__text">
      <span class="contact__name">王五</span>
      <span class="contact__status">在线 · 正在写代码</span>
    </div>
    <span class="contact__dot"></span>
  </div>
  <div class="contact">
    <div class="contact__avatar">赵</div>
    <div class="contact__text">
      <span class="contact__name">赵六</span>
      <span class="contact__status">离线 · 最后上线 3 小时前</span>
    </div>
  </div>
  <div class="contact">
    <div class="contact__avatar">钱</div>
    <div class="contact__text">
      <span class="contact__name">钱七</span>
      <span class="contact__status">忙碌 · 会议中</span>
    </div>
  </div>
</div>`,
  },
  {
    id: 'p1-flex-col-steps',
    title: '垂直步骤条',
    group: '03-Flex·Column',
    summary: 'column 排列步骤，左侧指示线',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .steps {
    display: flex;
    flex-direction: column;
    gap: 0;
    max-width: 300px;
    padding: 8px 0;
  }
  .step {
    display: flex;
    gap: 14px;
    position: relative;
  }
  /* 左侧圆点 + 竖线 */
  .step__track {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
  }
  .step__dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #9bb5a6;
    border: 2px solid #fff;
    box-shadow: 0 0 0 2px #9bb5a6;
  }
  .step--done .step__dot { background: #2f6b4f; box-shadow: 0 0 0 2px #2f6b4f; }
  .step--active .step__dot { background: #fff; box-shadow: 0 0 0 2px #2f6b4f; }
  .step__line {
    flex: 1;
    width: 2px;
    min-height: 32px;
    background: #d9e0d8;
    margin: 4px 0;
  }
  .step:last-child .step__line { display: none; }
  .step--done .step__line { background: #2f6b4f; }
  .step__content { padding-bottom: 20px; }
  .step__title { font-weight: 600; font-size: 14px; margin-bottom: 2px; }
  .step__desc { font-size: 12px; color: #5c6b62; }
  .step--active .step__title { color: #2f6b4f; }
</style>

<div class="steps">
  <div class="step step--done">
    <div class="step__track">
      <div class="step__dot"></div>
      <div class="step__line"></div>
    </div>
    <div class="step__content">
      <div class="step__title">填写信息</div>
      <div class="step__desc">已完成</div>
    </div>
  </div>
  <div class="step step--active">
    <div class="step__track">
      <div class="step__dot"></div>
      <div class="step__line"></div>
    </div>
    <div class="step__content">
      <div class="step__title">支付订单</div>
      <div class="step__desc">进行中…</div>
    </div>
  </div>
  <div class="step">
    <div class="step__track">
      <div class="step__dot"></div>
    </div>
    <div class="step__content">
      <div class="step__title">完成</div>
      <div class="step__desc">等待前两步</div>
    </div>
  </div>
</div>`,
  },
  {
    id: 'p1-flex-col-price-stack',
    title: '价格信息堆叠',
    group: '03-Flex·Column',
    summary: '商品价、原价、标签纵向排列',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .product {
    display: flex;
    gap: 16px;
    max-width: 360px;
    padding: 16px;
    background: #fff;
    border: 1px solid #9bb5a6;
    border-radius: 12px;
  }
  .product__img {
    width: 100px;
    height: 100px;
    background: #eef6f1;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    flex-shrink: 0;
  }
  .product__info {
    display: flex;
    flex-direction: column;
    gap: 6px;                       /* 标题、价格、标签之间统一间距 */
    flex: 1;
  }
  .product__title { margin: 0; font-size: 15px; font-weight: 600; }
  .product__price {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .price-now { font-size: 22px; font-weight: 700; color: #c53030; }
  .price-old {
    font-size: 13px;
    color: #9bb5a6;
    text-decoration: line-through;
  }
  .product__tags { display: flex; gap: 6px; flex-wrap: wrap; }
  .badge {
    padding: 2px 8px;
    font-size: 11px;
    border-radius: 4px;
    background: #fef3f2;
    color: #c53030;
  }
  .badge--green { background: #eef6f1; color: #2f6b4f; }
  .product__btn {
    margin-top: auto;               /* 把按钮推到底部（在 column 里常用） */
    padding: 8px;
    border: none;
    border-radius: 8px;
    background: #2f6b4f;
    color: #fff;
    font: inherit;
    cursor: pointer;
  }
</style>

<article class="product">
  <div class="product__img">📚</div>
  <div class="product__info">
    <h3 class="product__title">React 实战教程（电子版）</h3>
    <div class="product__price">
      <span class="price-now">¥49.00</span>
      <span class="price-old">¥99.00</span>
    </div>
    <div class="product__tags">
      <span class="badge">限时 5 折</span>
      <span class="badge badge--green">包邮</span>
    </div>
    <button class="product__btn">加入购物车</button>
  </div>
</article>`,
  },
]

export default demos
