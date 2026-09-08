/**
 * Part 2：Grid 布局 / 定位 Stack / 页面骨架
 * 共 35 个预设 Demo，供代码演练台使用
 */
const part2GridPositionDemos = [
  // ── 04-Grid布局（12）────────────────────────────────────────
  {
    id: 'p2-grid-3col',
    title: '基础三列等宽',
    group: '04-Grid布局',
    summary: 'grid-template-columns: repeat(3, 1fr) 三等分',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; color: #1f2a24; }

  /* 开启 Grid，三列等宽 */
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 列，每列 1fr 平分剩余空间 */
    gap: 12px;                               /* 行列间距统一 12px */
  }
  .col {
    padding: 20px 16px;
    background: #eef6f1;
    border: 1px solid #9bb5a6;
    border-radius: 10px;
    text-align: center;
  }
  .col strong { display: block; margin-bottom: 4px; color: #2f6b4f; }
  .hint { margin-top: 12px; font-size: 12px; color: #5c6b62; }
</style>

<div class="grid">
  <div class="col"><strong>列 A</strong>1fr</div>
  <div class="col"><strong>列 B</strong>1fr</div>
  <div class="col"><strong>列 C</strong>1fr</div>
</div>
<p class="hint">改 repeat(3) 为 2 或 4，观察列数变化</p>`,
  },
  {
    id: 'p2-grid-auto-fill',
    title: 'auto-fill 响应式卡片',
    group: '04-Grid布局',
    summary: 'repeat(auto-fill, minmax) 自动算列数',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .grid {
    display: grid;
    /* auto-fill：尽量多放列；minmax(160px,1fr) 每列最小 160px，多余空间平分 */
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
  }
  .card {
    padding: 16px;
    background: #fff;
    border: 1px solid #9bb5a6;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(31, 42, 36, 0.06);
  }
  .card h3 { margin: 0 0 6px; font-size: 15px; color: #2f6b4f; }
  .card p { margin: 0; font-size: 13px; color: #5c6b62; }
  .tag {
    display: inline-block;
    margin-top: 8px;
    padding: 2px 8px;
    font-size: 11px;
    background: #d9ebe1;
    border-radius: 999px;
    color: #2f6b4f;
  }
</style>

<div class="grid">
  <article class="card"><h3>React 基础</h3><p>组件与 JSX</p><span class="tag">12 课</span></article>
  <article class="card"><h3>状态管理</h3><p>useState / useReducer</p><span class="tag">8 课</span></article>
  <article class="card"><h3>路由</h3><p>React Router v6</p><span class="tag">6 课</span></article>
  <article class="card"><h3>样式方案</h3><p>CSS Modules</p><span class="tag">5 课</span></article>
  <article class="card"><h3>性能优化</h3><p>memo / lazy</p><span class="tag">4 课</span></article>
</div>`,
  },
  {
    id: 'p2-grid-auto-fit',
    title: 'auto-fit 拉伸填满',
    group: '04-Grid布局',
    summary: 'auto-fit vs auto-fill：末列会拉伸',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .wrap { margin-bottom: 20px; }
  .label { font-size: 12px; font-weight: 700; color: #2f6b4f; margin-bottom: 8px; }

  .grid-fill, .grid-fit {
    display: grid;
    gap: 10px;
    margin-bottom: 4px;
  }
  /* auto-fill：空轨道保留，卡片不会拉伸变宽 */
  .grid-fill {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
  /* auto-fit：空轨道折叠，现有列拉伸填满容器 */
  .grid-fit {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
  .box {
    padding: 14px;
    background: #eef6f1;
    border-radius: 8px;
    text-align: center;
    font-size: 13px;
    border: 1px solid #9bb5a6;
  }
  .hint { font-size: 12px; color: #5c6b62; }
</style>

<div class="wrap">
  <div class="label">auto-fill（空列保留）</div>
  <div class="grid-fill">
    <div class="box">A</div><div class="box">B</div><div class="box">C</div>
  </div>
</div>
<div class="wrap">
  <div class="label">auto-fit（列拉伸填满）</div>
  <div class="grid-fit">
    <div class="box">A</div><div class="box">B</div><div class="box">C</div>
  </div>
</div>
<p class="hint">拉宽预览区：auto-fit 的三张卡片会变宽；auto-fill 保持 minmax 宽度</p>`,
  },
  {
    id: 'p2-grid-holy-layout',
    title: 'Grid 圣杯布局',
    group: '04-Grid布局',
    summary: 'grid-template-areas 命名区域 + 侧栏切换面板',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; color: #1f2a24; }

  .holy {
    display: grid;
    /* 三行：顶栏 auto、中间 1fr、底栏 auto；两列：侧栏 180px + 主栏 1fr */
    grid-template-columns: 180px 1fr;
    grid-template-rows: auto 1fr auto;
    /* 用名字描述每个格子归属哪个区域 */
    grid-template-areas:
      "header header"
      "nav    main"
      "footer footer";
    min-height: 320px;
    gap: 0;
  }
  header { grid-area: header; padding: 12px 16px; background: #2f6b4f; color: #fff; }
  nav    { grid-area: nav;    padding: 16px; background: #eef6f1; border-right: 1px solid #9bb5a6; }
  main   { grid-area: main;   padding: 16px; background: #f7faf8; overflow: auto; }
  footer { grid-area: footer; padding: 10px 16px; background: #d9ebe1; font-size: 12px; color: #5c6b62; }

  /* 侧栏用 button，避免 href="#" 跳转 */
  nav strong { display: block; margin-bottom: 8px; color: #2f6b4f; }
  nav button {
    display: block;
    width: 100%;
    padding: 6px 0;
    border: 0;
    background: transparent;
    color: #2f6b4f;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }
  nav button.active { font-weight: 700; text-decoration: underline; }

  .panel { display: none; }
  .panel.active { display: block; }
  .panel h2 { margin: 0 0 12px; font-size: 18px; }

  .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .card {
    padding: 12px;
    background: #fff;
    border: 1px solid #d9e0d8;
    border-radius: 8px;
    text-align: center;
  }
  .card b { display: block; font-size: 20px; color: #2f6b4f; }
  .card span { font-size: 12px; color: #5c6b62; }

  table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; font-size: 13px; }
  th, td { padding: 8px 10px; text-align: left; border-bottom: 1px solid #eef6f1; }
  th { background: #eef6f1; }

  .form { max-width: 280px; }
  .form label { display: block; margin: 10px 0 4px; font-size: 12px; color: #5c6b62; }
  .form input, .form select {
    width: 100%;
    padding: 7px 10px;
    border: 1px solid #c5d2ca;
    border-radius: 6px;
    font: inherit;
    box-sizing: border-box;
  }
  .form button {
    margin-top: 12px;
    padding: 8px 14px;
    border: 0;
    border-radius: 6px;
    background: #2f6b4f;
    color: #fff;
    font: inherit;
    cursor: pointer;
  }
</style>

<div class="holy">
  <header>Header — 横跨两列</header>
  <nav>
    <strong>导航</strong>
    <button type="button" class="nav-item active" data-panel="dashboard">仪表盘</button>
    <button type="button" class="nav-item" data-panel="users">用户</button>
    <button type="button" class="nav-item" data-panel="settings">设置</button>
  </nav>
  <main>
    <!-- ① 仪表盘：统计卡片 -->
    <section class="panel active" id="panel-dashboard">
      <h2>仪表盘</h2>
      <div class="cards">
        <div class="card"><b>1,024</b><span>总用户</span></div>
        <div class="card"><b>86</b><span>今日订单</span></div>
        <div class="card"><b>98%</b><span>可用率</span></div>
      </div>
    </section>
    <!-- ② 用户：简易表格 -->
    <section class="panel" id="panel-users">
      <h2>用户</h2>
      <table>
        <thead><tr><th>姓名</th><th>角色</th><th>状态</th></tr></thead>
        <tbody>
          <tr><td>张三</td><td>管理员</td><td>正常</td></tr>
          <tr><td>李四</td><td>运营</td><td>待审核</td></tr>
          <tr><td>王五</td><td>访客</td><td>正常</td></tr>
        </tbody>
      </table>
    </section>
    <!-- ③ 设置：简易表单 -->
    <section class="panel" id="panel-settings">
      <h2>设置</h2>
      <form class="form" onsubmit="event.preventDefault()">
        <label>站点名称</label>
        <input value="Demo Admin" />
        <label>默认语言</label>
        <select><option>简体中文</option><option>English</option></select>
        <button type="submit">保存</button>
      </form>
    </section>
  </main>
  <footer>Footer © 2026</footer>
</div>

<script>
  // 圣杯布局侧栏切换：button + data-panel，不用 href="#"
  const navItems = document.querySelectorAll('.nav-item')
  const panels = document.querySelectorAll('.panel')

  navItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.panel
      navItems.forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')
      panels.forEach((p) => p.classList.remove('active'))
      document.getElementById('panel-' + id)?.classList.add('active')
    })
  })
</script>`,
  },
  {
    id: 'p2-grid-sidebar-main',
    title: '侧栏 + 主内容 Grid',
    group: '04-Grid布局',
    summary: '固定侧栏宽 + 主栏 1fr，JS 切换面板',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; color: #1f2a24; }

  .layout {
    display: grid;
    /* 左 220px 固定，右 1fr 自适应；单行 */
    grid-template-columns: 220px 1fr;
    min-height: 280px;
  }
  .sidebar {
    padding: 20px 16px;
    background: #1f2a24;
    color: #e8f0eb;
  }
  .sidebar .logo { font-weight: 700; font-size: 16px; margin-bottom: 16px; }
  /* 侧栏菜单用 button，避免 href="#" 导致页面跳动 */
  .sidebar button {
    display: block;
    width: 100%;
    padding: 8px 10px;
    margin-bottom: 4px;
    border: 0;
    background: transparent;
    color: #b8cfc0;
    font: inherit;
    text-align: left;
    border-radius: 6px;
    cursor: pointer;
  }
  .sidebar button.active { background: #2f6b4f; color: #fff; }
  .main { padding: 24px; background: #fff; }
  .panel { display: none; }
  .panel.active { display: block; }
  .panel h1 { margin: 0 0 8px; font-size: 20px; }
  .panel .sub { margin: 0 0 16px; color: #5c6b62; font-size: 13px; }

  .stat-row { display: flex; gap: 12px; }
  .stat {
    flex: 1;
    padding: 12px;
    background: #eef6f1;
    border-radius: 8px;
    text-align: center;
  }
  .stat b { display: block; font-size: 22px; color: #2f6b4f; }

  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th, td { padding: 8px 10px; text-align: left; border-bottom: 1px solid #eef6f1; }
  th { background: #f7faf8; color: #5c6b62; }

  .product-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  .product {
    padding: 12px;
    background: #f7faf8;
    border: 1px solid #d9e0d8;
    border-radius: 8px;
    text-align: center;
    font-size: 13px;
  }
  .product .emoji { font-size: 24px; margin-bottom: 4px; }

  .chart-box {
    height: 140px;
    background: linear-gradient(180deg, #d9ebe1 0%, #eef6f1 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #5c6b62;
    font-size: 13px;
  }
</style>

<div class="layout">
  <aside class="sidebar">
    <div class="logo">Admin</div>
    <button type="button" class="nav-item active" data-panel="overview">概览</button>
    <button type="button" class="nav-item" data-panel="orders">订单</button>
    <button type="button" class="nav-item" data-panel="products">商品</button>
    <button type="button" class="nav-item" data-panel="reports">报表</button>
  </aside>
  <main class="main">
    <!-- 概览：统计卡片 -->
    <section class="panel active" id="panel-overview">
      <h1>欢迎回来</h1>
      <p class="sub">Grid 两列：侧栏固定宽，主栏吃掉剩余空间。</p>
      <div class="stat-row">
        <div class="stat"><b>128</b>今日访问</div>
        <div class="stat"><b>36</b>新订单</div>
        <div class="stat"><b>¥8.2k</b>营收</div>
      </div>
    </section>
    <!-- 订单：表格 -->
    <section class="panel" id="panel-orders">
      <h1>订单管理</h1>
      <p class="sub">最近订单列表（示意）</p>
      <table>
        <thead><tr><th>订单号</th><th>客户</th><th>金额</th><th>状态</th></tr></thead>
        <tbody>
          <tr><td>#1001</td><td>张三</td><td>¥199</td><td>已完成</td></tr>
          <tr><td>#1002</td><td>李四</td><td>¥79</td><td>待发货</td></tr>
          <tr><td>#1003</td><td>王五</td><td>¥128</td><td>待支付</td></tr>
        </tbody>
      </table>
    </section>
    <!-- 商品：网格 -->
    <section class="panel" id="panel-products">
      <h1>商品库</h1>
      <p class="sub">在售商品一览</p>
      <div class="product-grid">
        <div class="product"><div class="emoji">📚</div>前端手册</div>
        <div class="product"><div class="emoji">🎧</div>降噪耳机</div>
        <div class="product"><div class="emoji">⌨️</div>机械键盘</div>
        <div class="product"><div class="emoji">🖱️</div>无线鼠标</div>
        <div class="product"><div class="emoji">💡</div>台灯</div>
        <div class="product"><div class="emoji">🪴</div>绿植</div>
      </div>
    </section>
    <!-- 报表：图表占位 -->
    <section class="panel" id="panel-reports">
      <h1>销售报表</h1>
      <p class="sub">近 30 日趋势（占位）</p>
      <div class="chart-box">📈 折线图区域 — 可接入 ECharts 等库</div>
    </section>
  </main>
</div>

<script>
  // 侧栏切换：data-panel 对应 panel-{id}
  const navItems = document.querySelectorAll('.nav-item')
  const panels = document.querySelectorAll('.panel')

  navItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.panel
      navItems.forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')
      panels.forEach((p) => p.classList.remove('active'))
      document.getElementById('panel-' + id)?.classList.add('active')
    })
  })
</script>`,
  },
  {
    id: 'p2-grid-gap',
    title: 'gap / row-gap / column-gap',
    group: '04-Grid布局',
    summary: '分别控制行间距与列间距',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .demo {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 60px);
    /* gap 简写 = row-gap column-gap */
    row-gap: 20px;      /* 行间距 20px */
    column-gap: 8px;    /* 列间距 8px — 故意设不同值便于对比 */
    margin-bottom: 24px;
  }
  .cell {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #d9ebe1;
    border-radius: 6px;
    font-size: 13px;
    color: #2f6b4f;
    font-weight: 600;
  }
  .legend { font-size: 12px; color: #5c6b62; }
  .legend code { background: #eef6f1; padding: 2px 6px; border-radius: 4px; }
</style>

<div class="demo">
  <div class="cell">1</div><div class="cell">2</div><div class="cell">3</div>
  <div class="cell">4</div><div class="cell">5</div><div class="cell">6</div>
</div>
<p class="legend">
  当前：<code>row-gap: 20px</code> <code>column-gap: 8px</code><br/>
  也可写 <code>gap: 20px 8px</code>（先行后列）
</p>`,
  },
  {
    id: 'p2-grid-span',
    title: '跨列跨行 span',
    group: '04-Grid布局',
    summary: 'grid-column / grid-row 合并单元格',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .board {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 72px);
    gap: 8px;
  }
  .tile {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eef6f1;
    border: 1px solid #9bb5a6;
    border-radius: 8px;
    font-size: 13px;
    color: #2f6b4f;
  }
  /* 从第 1 列线到第 3 列线 → 占 2 列 */
  .wide { grid-column: 1 / 3; background: #2f6b4f; color: #fff; font-weight: 700; }
  /* 从第 2 行到第 4 行 → 占 2 行 */
  .tall { grid-column: 4; grid-row: 1 / 3; background: #d9ebe1; }
  /* span 写法：从当前格起跨 2 列 */
  .hero { grid-column: span 2; grid-row: span 2; background: #c8dfd0; font-weight: 600; }
</style>

<div class="board">
  <div class="tile wide">grid-column: 1 / 3</div>
  <div class="tile">3</div>
  <div class="tile tall">row 1→3</div>
  <div class="tile">5</div>
  <div class="tile hero">span 2×2</div>
  <div class="tile">8</div>
  <div class="tile">9</div>
  <div class="tile">10</div>
</div>`,
  },
  {
    id: 'p2-grid-dense',
    title: 'dense 紧凑回填',
    group: '04-Grid布局',
    summary: 'grid-auto-flow: dense 填空洞',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    /* dense：后面的小块会回填前面因跨列产生的空位 */
    grid-auto-flow: dense;
  }
  .item {
    padding: 16px;
    background: #eef6f1;
    border-radius: 8px;
    text-align: center;
    font-size: 13px;
    color: #2f6b4f;
  }
  .item.w2 { grid-column: span 2; background: #2f6b4f; color: #fff; }
  .item.h2 { grid-row: span 2; background: #d9ebe1; }
  .hint { margin-top: 10px; font-size: 12px; color: #5c6b62; }
</style>

<div class="grid">
  <div class="item w2">宽 2 列</div>
  <div class="item">2</div>
  <div class="item h2">高 2 行</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item w2">宽 2 列</div>
  <div class="item">7</div>
  <div class="item">8</div>
</div>
<p class="hint">去掉 dense 后，小块不会回填宽块右侧的空洞</p>`,
  },
  {
    id: 'p2-grid-named-lines',
    title: '命名网格线',
    group: '04-Grid布局',
    summary: 'grid-template-columns 自定义线名',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .layout {
    display: grid;
    /* 给列线起名字，便于 grid-column 引用 */
    grid-template-columns:
      [sidebar-start] 200px
      [sidebar-end main-start] 1fr
      [main-end];
    min-height: 200px;
    border: 1px solid #9bb5a6;
    border-radius: 10px;
    overflow: hidden;
  }
  aside {
    /* 从 sidebar-start 到 sidebar-end */
    grid-column: sidebar-start / sidebar-end;
    padding: 16px;
    background: #eef6f1;
  }
  main {
    grid-column: main-start / main-end;
    padding: 16px;
    background: #fff;
  }
  code { font-size: 12px; background: #f7faf8; padding: 2px 6px; border-radius: 4px; }
</style>

<div class="layout">
  <aside>
    <strong>侧栏</strong>
    <p style="font-size:12px;color:#5c6b62;margin:8px 0 0;">
      <code>sidebar-start / sidebar-end</code>
    </p>
  </aside>
  <main>
    <strong>主内容</strong>
    <p style="font-size:12px;color:#5c6b62;margin:8px 0 0;">
      <code>main-start / main-end</code>
    </p>
  </main>
</div>`,
  },
  {
    id: 'p2-grid-masonry',
    title: '瀑布流式 auto-rows',
    group: '04-Grid布局',
    summary: 'grid-auto-rows + 不同高度模拟 masonry',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .masonry {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* 每行最小 80px，内容多则自动增高（默认 auto） */
    grid-auto-rows: minmax(80px, auto);
    gap: 10px;
  }
  .brick {
    padding: 12px;
    background: #fff;
    border: 1px solid #9bb5a6;
    border-radius: 8px;
    font-size: 13px;
    color: #1f2a24;
  }
  .brick h4 { margin: 0 0 6px; color: #2f6b4f; font-size: 14px; }
  .brick p { margin: 0; color: #5c6b62; line-height: 1.5; }
  /* 不同 span 制造高低错落 */
  .brick.tall { grid-row: span 2; background: #eef6f1; }
  .brick.wide { grid-column: span 2; }
</style>

<div class="masonry">
  <div class="brick tall">
    <h4>长文卡片</h4>
    <p>Grid 原生 masonry 仍在实验阶段；用 span + auto-rows 可近似瀑布流效果。这段文字较长，卡片自然变高。</p>
  </div>
  <div class="brick"><h4>短</h4><p>一行摘要</p></div>
  <div class="brick"><h4>通知</h4><p>3 条未读</p></div>
  <div class="brick wide"><h4>横幅</h4><p>跨两列的促销信息</p></div>
  <div class="brick"><h4>标签</h4><p>#CSS #Grid</p></div>
</div>`,
  },
  {
    id: 'p2-grid-dashboard',
    title: '仪表盘 Widget 网格',
    group: '04-Grid布局',
    summary: '不等宽 widget 组合布局',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; background: #f4f7f5; }

  .dashboard {
    display: grid;
    /* 12 列栅格，方便 widget 按 3/4/6/12 切分 */
    grid-template-columns: repeat(12, 1fr);
    gap: 12px;
  }
  .widget {
    padding: 16px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(31, 42, 36, 0.06);
  }
  .widget h3 { margin: 0 0 4px; font-size: 13px; color: #5c6b62; font-weight: 500; }
  .widget .val { font-size: 28px; font-weight: 700; color: #2f6b4f; }
  .widget .delta { font-size: 12px; color: #38a169; }
  /* 各占 12 栅格中的 3 列 = 一行 4 个 */
  .kpi { grid-column: span 3; }
  /* 图表占 8 列，侧栏占 4 列 */
  .chart { grid-column: span 8; min-height: 140px; }
  .side  { grid-column: span 4; }
  .chart-placeholder {
    height: 100px;
    background: linear-gradient(180deg, #d9ebe1 0%, #eef6f1 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #5c6b62;
    font-size: 13px;
  }
  .list { margin: 0; padding: 0; list-style: none; font-size: 13px; }
  .list li { padding: 6px 0; border-bottom: 1px solid #eef6f1; color: #1f2a24; }
</style>

<div class="dashboard">
  <div class="widget kpi"><h3>总用户</h3><div class="val">12,480</div><div class="delta">↑ 8.2%</div></div>
  <div class="widget kpi"><h3>日活</h3><div class="val">3,291</div><div class="delta">↑ 2.1%</div></div>
  <div class="widget kpi"><h3>转化率</h3><div class="val">4.7%</div><div class="delta">↓ 0.3%</div></div>
  <div class="widget kpi"><h3>营收</h3><div class="val">¥86k</div><div class="delta">↑ 12%</div></div>
  <div class="widget chart">
    <h3>近 7 日趋势</h3>
    <div class="chart-placeholder">📈 折线图区域</div>
  </div>
  <div class="widget side">
    <h3>待办</h3>
    <ul class="list">
      <li>审核 3 条评论</li>
      <li>发布 v2.1 公告</li>
      <li>备份数据库</li>
    </ul>
  </div>
</div>`,
  },
  {
    id: 'p2-grid-gallery',
    title: '图片画廊 Grid',
    group: '04-Grid布局',
    summary: 'grid + object-fit 做相册墙',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .gallery {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
  }
  .photo {
    position: relative;
    aspect-ratio: 1;          /* 正方形格子 */
    border-radius: 8px;
    overflow: hidden;
    background: #d9ebe1;
  }
  /* Featured 占 2×2 大格 */
  .photo.featured {
    grid-column: span 2;
    grid-row: span 2;
    aspect-ratio: auto;
  }
  .photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;        /* 裁剪填满，不变形 */
    display: block;
  }
  .photo .cap {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 6px 8px;
    background: linear-gradient(transparent, rgba(0,0,0,.55));
    color: #fff;
    font-size: 11px;
  }
  /* 用渐变色块模拟图片 */
  .ph1 { background: linear-gradient(135deg, #2f6b4f, #6fcf97); }
  .ph2 { background: linear-gradient(135deg, #4a5568, #a0aec0); }
  .ph3 { background: linear-gradient(135deg, #c53030, #fc8181); }
  .ph4 { background: linear-gradient(135deg, #2b6cb0, #63b3ed); }
  .ph5 { background: linear-gradient(135deg, #744210, #d69e2e); }
</style>

<div class="gallery">
  <div class="photo featured ph1"><span class="cap">封面 · 旅行相册</span></div>
  <div class="photo ph2"></div>
  <div class="photo ph3"></div>
  <div class="photo ph4"></div>
  <div class="photo ph5"></div>
  <div class="photo ph2"></div>
  <div class="photo ph3"></div>
</div>`,
  },

  // ── 05-定位Stack（12）────────────────────────────────────────
  {
    id: 'p2-pos-badge',
    title: '相对 + 绝对：角标',
    group: '05-定位Stack',
    summary: '父 relative，子 absolute 贴角',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 24px; font: 14px/1.5 system-ui, sans-serif; }

  .card {
    position: relative;       /* 建立定位上下文，absolute 子元素相对它 */
    width: 240px;
    padding: 20px;
    background: #fff;
    border: 1px solid #9bb5a6;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(31, 42, 36, 0.08);
  }
  .card h3 { margin: 0 0 8px; color: #1f2a24; }
  .card p { margin: 0; font-size: 13px; color: #5c6b62; }
  .badge {
    position: absolute;         /* 脱离文档流，按 top/right 定位 */
    top: -10px;
    right: -10px;
    min-width: 24px;
    height: 24px;
    padding: 0 7px;
    line-height: 24px;
    text-align: center;
    background: #c53030;
    color: #fff;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    box-shadow: 0 2px 6px rgba(197, 48, 48, 0.4);
  }
</style>

<div class="card">
  <span class="badge">NEW</span>
  <h3>消息通知</h3>
  <p>你有 3 条未读消息，角标用 absolute 叠在卡片右上角。</p>
</div>`,
  },
  {
    id: 'p2-pos-play-btn',
    title: '封面播放按钮',
    group: '05-定位Stack',
    summary: 'absolute 居中叠加在封面上',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 24px; font: 14px/1.5 system-ui, sans-serif; }

  .cover {
    position: relative;       /* 封面容器：给播放按钮当参照 */
    width: 320px;
    aspect-ratio: 16 / 9;
    border-radius: 12px;
    overflow: hidden;
    background: linear-gradient(135deg, #1f2a24, #2f6b4f);
  }
  .cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
  /* 半透明遮罩 + 居中按钮 */
  .overlay {
    position: absolute;
    inset: 0;                 /* top/right/bottom/left 全 0 */
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.25);
    transition: background 0.2s;
  }
  .cover:hover .overlay { background: rgba(0, 0, 0, 0.4); }
  .play {
    width: 56px;
    height: 56px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.95);
    color: #2f6b4f;
    font-size: 22px;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    /* 三角形播放图标用 padding 偏移模拟 */
    padding-left: 4px;
  }
  .duration {
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 2px 8px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 12px;
    border-radius: 4px;
  }
</style>

<div class="cover">
  <div class="overlay">
    <button class="play" aria-label="播放">▶</button>
  </div>
  <span class="duration">12:34</span>
</div>`,
  },
  {
    id: 'p2-pos-tooltip',
    title: 'Tooltip 提示框',
    group: '05-定位Stack',
    summary: 'absolute 相对触发元素弹出',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 48px; font: 14px/1.5 system-ui, sans-serif; }

  .trigger {
    position: relative;       /* tooltip 的定位参照 */
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    background: #2f6b4f;
    color: #fff;
    border: none;
    border-radius: 8px;
    font: inherit;
    cursor: pointer;
  }
  .tooltip {
    position: absolute;
    bottom: calc(100% + 8px); /* 出现在按钮上方，留 8px 间距 */
    left: 50%;
    transform: translateX(-50%); /* 水平居中于按钮 */
    padding: 6px 10px;
    background: #1f2a24;
    color: #e8f0eb;
    font-size: 12px;
    white-space: nowrap;
    border-radius: 6px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s;
  }
  /* 小三角 */
  .tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: #1f2a24;
  }
  .trigger:hover .tooltip,
  .trigger:focus .tooltip { opacity: 1; }
</style>

<button class="trigger">
  保存
  <span class="tooltip">Ctrl + S 快捷保存</span>
</button>`,
  },
  {
    id: 'p2-pos-modal',
    title: 'Modal 遮罩居中',
    group: '05-定位Stack',
    summary: '点击打开 / 按钮或遮罩关闭',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; min-height: 220px; }

  .page { padding: 24px; }
  .page h2 { margin: 0 0 8px; }
  .page p { margin: 0 0 16px; color: #5c6b62; }
  .open-btn {
    padding: 10px 18px;
    border: 0;
    border-radius: 8px;
    background: #2f6b4f;
    color: #fff;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
  }

  /* fixed：相对视口定位；默认隐藏，.open 时显示 */
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(31, 42, 36, 0.45);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }
  .backdrop.open { display: flex; }
  .dialog {
    width: min(360px, 90vw);
    padding: 24px;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  }
  .dialog h3 { margin: 0 0 8px; color: #1f2a24; }
  .dialog p { margin: 0 0 20px; color: #5c6b62; font-size: 13px; }
  .actions { display: flex; gap: 8px; justify-content: flex-end; }
  .btn {
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid #9bb5a6;
    background: #fff;
    font: inherit;
    cursor: pointer;
  }
  .btn.primary { background: #c53030; color: #fff; border-color: #c53030; }
</style>

<div class="page">
  <h2>我的文件</h2>
  <p>点击下方按钮打开确认框；点「取消 / 删除」或遮罩可关闭。</p>
  <button type="button" class="open-btn" id="open-modal">删除文件…</button>
</div>

<div class="backdrop" id="backdrop" aria-hidden="true">
  <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="dlg-title">
    <h3 id="dlg-title">确认删除？</h3>
    <p>此操作不可撤销，文件将从云端永久移除。</p>
    <div class="actions">
      <button type="button" class="btn" id="btn-cancel">取消</button>
      <button type="button" class="btn primary" id="btn-ok">删除</button>
    </div>
  </div>
</div>

<script>
  const backdrop = document.getElementById('backdrop')
  const open = () => {
    backdrop.classList.add('open')
    backdrop.setAttribute('aria-hidden', 'false')
  }
  const close = () => {
    backdrop.classList.remove('open')
    backdrop.setAttribute('aria-hidden', 'true')
  }

  document.getElementById('open-modal').addEventListener('click', open)
  document.getElementById('btn-cancel').addEventListener('click', close)
  document.getElementById('btn-ok').addEventListener('click', close)
  // 点遮罩关闭；点对话框本身不关闭
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close()
  })
</script>`,
  },
  {
    id: 'p2-pos-fixed-bottom',
    title: 'Fixed 底部操作栏',
    group: '05-定位Stack',
    summary: 'fixed bottom 贴底 CTA 栏',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; color: #1f2a24; }

  .content { padding: 16px 16px 80px; } /* 底部留白，避免被 fixed 栏遮挡 */
  .item {
    padding: 14px;
    margin-bottom: 10px;
    background: #eef6f1;
    border-radius: 8px;
  }
  .bar {
    position: fixed;          /* 固定于视口 */
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: #fff;
    border-top: 1px solid #d9e0d8;
    box-shadow: 0 -4px 16px rgba(31, 42, 36, 0.08);
    z-index: 50;
  }
  .price { font-size: 18px; font-weight: 700; color: #c53030; }
  .price small { font-size: 12px; color: #5c6b62; font-weight: 400; }
  .checkout {
    padding: 10px 24px;
    background: #2f6b4f;
    color: #fff;
    border: none;
    border-radius: 8px;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
  }
</style>

<div class="content">
  <h2 style="margin-top:0;">购物车</h2>
  <div class="item">React 实战课程 × 1</div>
  <div class="item">CSS 布局手册 × 1</div>
  <div class="item">TypeScript 入门 × 1</div>
</div>

<div class="bar">
  <div class="price"><small>合计 </small>¥ 298</div>
  <button class="checkout">去结算</button>
</div>`,
  },
  {
    id: 'p2-pos-fixed-top',
    title: 'Fixed 顶栏 + 内容留白',
    group: '05-定位Stack',
    summary: 'fixed top 导航，body padding-top 补偿',
    code: `<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font: 14px/1.5 system-ui, sans-serif;
    /* fixed 顶栏高度 52px，内容区需 padding-top 避免被遮挡 */
    padding-top: 52px;
    color: #1f2a24;
  }
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid #d9e0d8;
    z-index: 100;
  }
  .navbar .logo { font-weight: 700; color: #2f6b4f; }
  /* 顶栏链接用 button 模拟，避免 href="#" 跳转；本 Demo 重点在 fixed 滚动 */
  .navbar nav button {
    margin-left: 16px;
    padding: 0;
    border: 0;
    background: none;
    color: #5c6b62;
    font: inherit;
    cursor: pointer;
  }
  .navbar nav button.active { color: #2f6b4f; font-weight: 600; }
  main { padding: 24px 20px; max-width: 640px; }
  .block {
    height: 100px;
    margin-bottom: 12px;
    background: #eef6f1;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #5c6b62;
  }
</style>

<header class="navbar">
  <div class="logo">LearnHub</div>
  <nav>
    <button type="button" class="active">首页</button>
    <button type="button">课程</button>
    <button type="button">关于</button>
  </nav>
</header>

<main>
  <h1>向下滚动</h1>
  <p style="color:#5c6b62;">顶栏 position:fixed 始终可见</p>
  <div class="block">区块 1</div>
  <div class="block">区块 2</div>
  <div class="block">区块 3</div>
</main>`,
  },
  {
    id: 'p2-pos-sticky-header',
    title: 'Sticky 吸顶导航',
    group: '05-定位Stack',
    summary: 'position:sticky + top:0',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; }

  .hero {
    padding: 40px 20px;
    background: linear-gradient(135deg, #2f6b4f, #6fcf97);
    color: #fff;
    text-align: center;
  }
  .hero h1 { margin: 0; font-size: 24px; }
  .tabs {
    position: sticky;         /* 滚动到阈值前正常流，之后「粘」在 top */
    top: 0;
    z-index: 10;
    display: flex;
    gap: 0;
    background: #fff;
    border-bottom: 1px solid #d9e0d8;
  }
  .tab {
    flex: 1;
    padding: 12px;
    text-align: center;
    font-size: 13px;
    color: #5c6b62;
    border-bottom: 2px solid transparent;
  }
  .tab.active { color: #2f6b4f; font-weight: 700; border-bottom-color: #2f6b4f; }
  .section { padding: 20px; }
  .card {
    height: 80px;
    margin-bottom: 10px;
    background: #eef6f1;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    color: #5c6b62;
  }
</style>

<div class="hero"><h1>产品详情</h1></div>
<div class="tabs">
  <div class="tab active">概述</div>
  <div class="tab">规格</div>
  <div class="tab">评价</div>
</div>
<div class="section">
  <div class="card">内容块 1 — 向下滚，Tab 栏会吸顶</div>
  <div class="card">内容块 2</div>
  <div class="card">内容块 3</div>
  <div class="card">内容块 4</div>
  <div class="card">内容块 5</div>
</div>`,
  },
  {
    id: 'p2-pos-sticky-section',
    title: 'Sticky 章节标题',
    group: '05-定位Stack',
    summary: '长列表中 section 标题吸顶',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; color: #1f2a24; }

  .list { max-width: 400px; margin: 0 auto; }
  .section-title {
    position: sticky;
    top: 0;
    padding: 10px 16px;
    background: #eef6f1;
    font-weight: 700;
    font-size: 13px;
    color: #2f6b4f;
    border-bottom: 1px solid #9bb5a6;
    z-index: 5;
  }
  .row {
    padding: 12px 16px;
    border-bottom: 1px solid #f0f4f2;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #d9ebe1;
    flex-shrink: 0;
  }
  .name { font-weight: 500; }
  .sub { font-size: 12px; color: #5c6b62; }
</style>

<div class="list">
  <div class="section-title">A</div>
  <div class="row"><div class="avatar"></div><div><div class="name">Alice</div><div class="sub">在线</div></div></div>
  <div class="row"><div class="avatar"></div><div><div class="name">Amy</div><div class="sub">5 分钟前</div></div></div>
  <div class="row"><div class="avatar"></div><div><div class="name">Aaron</div><div class="sub">昨天</div></div></div>
  <div class="section-title">B</div>
  <div class="row"><div class="avatar"></div><div><div class="name">Bob</div><div class="sub">在线</div></div></div>
  <div class="row"><div class="avatar"></div><div><div class="name">Ben</div><div class="sub">1 小时前</div></div></div>
  <div class="section-title">C</div>
  <div class="row"><div class="avatar"></div><div><div class="name">Carol</div><div class="sub">在线</div></div></div>
  <div class="row"><div class="avatar"></div><div><div class="name">Chris</div><div class="sub">3 天前</div></div></div>
</div>`,
  },
  {
    id: 'p2-pos-sticky-table',
    title: 'Sticky 表头',
    group: '05-定位Stack',
    summary: '表格 thead sticky 滚动时固定',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 13px/1.4 system-ui, sans-serif; color: #1f2a24; }

  .table-wrap {
    max-height: 220px;        /* 限制高度触发滚动 */
    overflow: auto;
    border: 1px solid #9bb5a6;
    border-radius: 10px;
  }
  table { width: 100%; border-collapse: collapse; }
  th, td { padding: 10px 14px; text-align: left; border-bottom: 1px solid #eef6f1; }
  th {
    position: sticky;
    top: 0;                   /* 表头吸在滚动容器顶部 */
    background: #2f6b4f;
    color: #fff;
    font-weight: 600;
    z-index: 2;
  }
  tr:hover td { background: #f7faf8; }
  td.num { text-align: right; font-variant-numeric: tabular-nums; }
</style>

<div class="table-wrap">
  <table>
    <thead>
      <tr><th>商品</th><th>分类</th><th class="num">库存</th><th class="num">单价</th></tr>
    </thead>
    <tbody>
      <tr><td>机械键盘</td><td>外设</td><td class="num">128</td><td class="num">¥399</td></tr>
      <tr><td>显示器支架</td><td>外设</td><td class="num">56</td><td class="num">¥159</td></tr>
      <tr><td>USB-C  Hub</td><td>配件</td><td class="num">340</td><td class="num">¥89</td></tr>
      <tr><td>降噪耳机</td><td>音频</td><td class="num">72</td><td class="num">¥1299</td></tr>
      <tr><td>鼠标垫 XL</td><td>外设</td><td class="num">500</td><td class="num">¥49</td></tr>
      <tr><td>摄像头 4K</td><td>外设</td><td class="num">31</td><td class="num">¥599</td></tr>
      <tr><td>笔记本支架</td><td>配件</td><td class="num">88</td><td class="num">¥129</td></tr>
    </tbody>
  </table>
</div>`,
  },
  {
    id: 'p2-pos-abs-vs-rel',
    title: 'absolute vs relative 对比',
    group: '05-定位Stack',
    summary: 'relative 保留占位，absolute 脱离流',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .row { display: flex; gap: 24px; flex-wrap: wrap; }
  .demo { flex: 1; min-width: 200px; }
  .demo h4 { margin: 0 0 8px; font-size: 13px; color: #2f6b4f; }

  .flow { border: 1px dashed #9bb5a6; padding: 8px; border-radius: 8px; }
  .box {
    width: 60px;
    height: 40px;
    background: #d9ebe1;
    border: 1px solid #9bb5a6;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    margin-bottom: 6px;
  }
  /* relative：相对自身原位置偏移，仍占据原来的空间 */
  .rel-box {
    position: relative;
    top: 12px;
    left: 20px;
    background: #2f6b4f;
    color: #fff;
  }
  /* absolute：完全脱离文档流，不占位 */
  .abs-parent { position: relative; min-height: 100px; }
  .abs-box {
    position: absolute;
    top: 20px;
    left: 40px;
    background: #c53030;
    color: #fff;
  }
  .note { font-size: 11px; color: #5c6b62; margin-top: 6px; }
</style>

<div class="row">
  <div class="demo">
    <h4>relative — 保留占位</h4>
    <div class="flow">
      <div class="box">1</div>
      <div class="box rel-box">2 ↘</div>
      <div class="box">3（不被覆盖）</div>
    </div>
    <p class="note">box2 视觉偏移，但原位置仍留白</p>
  </div>
  <div class="demo">
    <h4>absolute — 脱离文档流</h4>
    <div class="flow abs-parent">
      <div class="box">1</div>
      <div class="box abs-box">2</div>
      <div class="box">3（会上移）</div>
    </div>
    <p class="note">box2 不占位，box3 会顶上来</p>
  </div>
</div>`,
  },
  {
    id: 'p2-pos-z-index',
    title: 'z-index 层叠顺序',
    group: '05-定位Stack',
    summary: '同层叠上下文内数值大的在上',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 32px; font: 14px/1.5 system-ui, sans-serif; }

  .stage {
    position: relative;
    width: 280px;
    height: 180px;
  }
  .layer {
    position: absolute;
    width: 120px;
    height: 80px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    color: #fff;
    box-shadow: 0 4px 12px rgba(0,0,0,.15);
  }
  /* z-index 只在定位元素（或非 static）上生效 */
  .a { top: 20px;  left: 20px;  background: #2f6b4f; z-index: 1; }
  .b { top: 50px;  left: 80px;  background: #3182ce; z-index: 3; } /* 最高 */
  .c { top: 80px;  left: 140px; background: #c53030; z-index: 2; }
  .legend { margin-top: 16px; font-size: 12px; color: #5c6b62; }
  .legend span { display: inline-block; width: 12px; height: 12px; border-radius: 2px; margin-right: 4px; vertical-align: middle; }
</style>

<div class="stage">
  <div class="layer a">z:1</div>
  <div class="layer b">z:3 最上</div>
  <div class="layer c">z:2</div>
</div>
<p class="legend">
  <span style="background:#2f6b4f"></span>绿 z-index:1 &nbsp;
  <span style="background:#3182ce"></span>蓝 z-index:3 &nbsp;
  <span style="background:#c53030"></span>红 z-index:2
</p>`,
  },
  {
    id: 'p2-pos-stack',
    title: 'Flutter 式 Stack 层叠',
    group: '05-定位Stack',
    summary: 'relative 容器 + 多个 absolute 子层',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 24px; font: 14px/1.5 system-ui, sans-serif; }

  /* Stack 容器：类似 Flutter Stack widget */
  .stack {
    position: relative;       /* 所有 absolute 子元素相对此容器 */
    width: 280px;
    height: 200px;
    border-radius: 16px;
    overflow: hidden;
    background: #1f2a24;
  }
  .stack-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(160deg, #2f6b4f 0%, #1a2420 100%);
  }
  .stack-content {
    position: absolute;
    bottom: 16px;
    left: 16px;
    right: 16px;
    color: #fff;
  }
  .stack-content h3 { margin: 0 0 4px; font-size: 18px; }
  .stack-content p { margin: 0; font-size: 12px; opacity: 0.85; }
  .stack-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    padding: 4px 10px;
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(4px);
    border-radius: 999px;
    font-size: 11px;
    color: #fff;
  }
  .stack-action {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 32px;
    height: 32px;
    border: none;
    border-radius: 50%;
    background: rgba(255,255,255,0.9);
    font-size: 16px;
    cursor: pointer;
  }
</style>

<div class="stack">
  <div class="stack-bg"></div>
  <span class="stack-badge">精选</span>
  <button class="stack-action" aria-label="收藏">♡</button>
  <div class="stack-content">
    <h3>CSS 布局实战</h3>
    <p>Flex · Grid · 定位 — 24 课时</p>
  </div>
</div>`,
  },

  // ── 06-页面骨架（11）────────────────────────────────────────
  {
    id: 'p2-skel-hcf',
    title: 'Header + Content + Footer',
    group: '06-页面骨架',
    summary: '经典三段式页面结构',
    code: `<style>
  * { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; }
  body {
    display: flex;
    flex-direction: column;   /* 纵向排列：头-身-脚 */
    font: 14px/1.5 system-ui, sans-serif;
    color: #1f2a24;
  }
  header {
    padding: 14px 20px;
    background: #2f6b4f;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .top-links { display: flex; gap: 4px; align-items: center; }
  .top-links button {
    border: 0; background: transparent; color: rgba(255,255,255,.85);
    font: inherit; font-size: 13px; cursor: pointer; margin-left: 12px; padding: 0;
  }
  .top-links button:hover { color: #fff; text-decoration: underline; }
  main {
    flex: 1;                  /* 撑满中间，footer 自然沉底 */
    padding: 24px 20px;
    background: #f7faf8;
    max-width: 720px;
    width: 100%;
    margin: 0 auto;
  }
  footer {
    padding: 12px 20px;
    background: #eef6f1;
    text-align: center;
    font-size: 12px;
    color: #5c6b62;
    border-top: 1px solid #d9e0d8;
  }
</style>

<header>
  <strong>SiteName</strong>
  <nav class="top-links">
    <!-- 装饰性顶栏：用 button，避免 href="#" 跳转 -->
    <button type="button">文档</button>
    <button type="button">博客</button>
    <button type="button">GitHub</button>
  </nav>
</header>
<main>
  <h1 style="margin-top:0;">文章标题</h1>
  <p>这是正文区域。内容少时 footer 仍贴在视口底部，靠 flex:1 实现。</p>
</main>
<footer>© 2026 SiteName · 保留所有权利</footer>`,
  },
  {
    id: 'p2-skel-admin-2col',
    title: '两栏后台管理',
    group: '06-页面骨架',
    summary: '侧栏切换：仪表盘 / 用户 / 订单 / 设置（带简单界面）',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; color: #1f2a24; }

  .admin {
    display: grid;
    grid-template-columns: 220px 1fr;
    min-height: 360px;
  }
  .sidenav {
    background: #1a2420;
    color: #b8cfc0;
    padding: 20px 0;
  }
  .sidenav .brand {
    padding: 0 20px 20px;
    font-weight: 700;
    color: #fff;
    font-size: 16px;
  }
  /* 侧栏用 button，不要用 href="#" —— 避免跳转、方便 JS 切面板 */
  .sidenav button {
    display: block;
    width: 100%;
    padding: 10px 20px;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    text-align: left;
    cursor: pointer;
  }
  .sidenav button:hover,
  .sidenav button.active {
    background: #2f6b4f;
    color: #fff;
  }

  .workspace {
    background: #f4f7f5;
    padding: 20px 24px;
    overflow: auto;
  }
  .workspace h1 { margin: 0 0 6px; font-size: 20px; }
  .workspace .sub { margin: 0 0 16px; font-size: 12px; color: #5c6b62; }

  /* 默认只显示当前面板 */
  .panel { display: none; }
  .panel.active { display: block; }

  .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .mini-card {
    padding: 16px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(31,42,36,.06);
  }
  .mini-card b { display: block; font-size: 22px; color: #2f6b4f; }
  .mini-card span { font-size: 12px; color: #5c6b62; }

  table {
    width: 100%;
    border-collapse: collapse;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(31,42,36,.06);
  }
  th, td {
    padding: 10px 12px;
    text-align: left;
    border-bottom: 1px solid #e8eee9;
    font-size: 13px;
  }
  th { background: #eef6f1; font-weight: 650; }
  .tag {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 11px;
    background: #e3f0e9;
    color: #1f5c40;
  }
  .tag.warn { background: #fff3cd; color: #92400e; }
  .tag.bad { background: #fde8e8; color: #c53030; }

  .toolbar {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }
  .toolbar input, .form-card input, .form-card select {
    font: inherit;
    padding: 7px 10px;
    border: 1px solid #c5d2ca;
    border-radius: 8px;
  }
  .toolbar button, .form-card button, .btn {
    font: inherit;
    padding: 7px 12px;
    border: 0;
    border-radius: 8px;
    background: #2f6b4f;
    color: #fff;
    cursor: pointer;
  }
  .btn.ghost {
    background: #fff;
    color: #3d4a43;
    border: 1px solid #c5d2ca;
  }

  .form-card {
    max-width: 420px;
    padding: 16px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 1px 4px rgba(31,42,36,.06);
  }
  .form-card label {
    display: block;
    margin: 10px 0 4px;
    font-size: 12px;
    font-weight: 650;
    color: #5c6b62;
  }
  .form-card input, .form-card select { width: 100%; box-sizing: border-box; }
  .form-actions { margin-top: 16px; display: flex; gap: 8px; }
</style>

<div class="admin">
  <!-- 侧栏：用 data-panel 标记要打开哪一页，不要写 href="#" -->
  <aside class="sidenav">
    <div class="brand">⚙ Admin</div>
    <button type="button" class="nav-item active" data-panel="dashboard">仪表盘</button>
    <button type="button" class="nav-item" data-panel="users">用户管理</button>
    <button type="button" class="nav-item" data-panel="orders">订单</button>
    <button type="button" class="nav-item" data-panel="settings">系统设置</button>
  </aside>

  <div class="workspace">
    <!-- ① 仪表盘 -->
    <section class="panel active" id="panel-dashboard">
      <h1>仪表盘</h1>
      <p class="sub">概览今日关键指标</p>
      <div class="cards">
        <div class="mini-card"><b>1,024</b><span>总用户</span></div>
        <div class="mini-card"><b>86</b><span>今日订单</span></div>
        <div class="mini-card"><b>98.2%</b><span>可用率</span></div>
      </div>
    </section>

    <!-- ② 用户管理：列表 + 简单操作 -->
    <section class="panel" id="panel-users">
      <h1>用户管理</h1>
      <p class="sub">查询、查看角色与状态（示意数据）</p>
      <div class="toolbar">
        <input type="search" placeholder="搜索用户名 / 邮箱" style="flex:1" />
        <button type="button">搜索</button>
        <button type="button" class="btn ghost">新增用户</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>用户</th>
            <th>角色</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>张三<br><span style="color:#7a8a80;font-size:12px">zhang@demo.com</span></td>
            <td>管理员</td>
            <td><span class="tag">正常</span></td>
            <td><button type="button" class="btn ghost">编辑</button></td>
          </tr>
          <tr>
            <td>李四<br><span style="color:#7a8a80;font-size:12px">li@demo.com</span></td>
            <td>运营</td>
            <td><span class="tag warn">待审核</span></td>
            <td><button type="button" class="btn ghost">编辑</button></td>
          </tr>
          <tr>
            <td>王五<br><span style="color:#7a8a80;font-size:12px">wang@demo.com</span></td>
            <td>普通用户</td>
            <td><span class="tag bad">已禁用</span></td>
            <td><button type="button" class="btn ghost">编辑</button></td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- ③ 订单：订单列表 -->
    <section class="panel" id="panel-orders">
      <h1>订单</h1>
      <p class="sub">最近订单列表（示意）</p>
      <div class="toolbar">
        <select>
          <option>全部状态</option>
          <option>待支付</option>
          <option>已发货</option>
          <option>已完成</option>
        </select>
        <input type="search" placeholder="订单号" style="flex:1" />
        <button type="button">筛选</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>订单号</th>
            <th>商品</th>
            <th>金额</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ORD-20260301</td>
            <td>年度会员</td>
            <td>¥199</td>
            <td><span class="tag">已完成</span></td>
          </tr>
          <tr>
            <td>ORD-20260302</td>
            <td>课程套餐 A</td>
            <td>¥79</td>
            <td><span class="tag warn">待支付</span></td>
          </tr>
          <tr>
            <td>ORD-20260303</td>
            <td>周边礼盒</td>
            <td>¥128</td>
            <td><span class="tag">已发货</span></td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- ④ 系统设置：简单表单 -->
    <section class="panel" id="panel-settings">
      <h1>系统设置</h1>
      <p class="sub">站点基础配置（点保存只会 alert 示意）</p>
      <form class="form-card" id="settings-form">
        <label for="site-name">站点名称</label>
        <input id="site-name" name="siteName" value="知趣集 Admin" />

        <label for="site-lang">默认语言</label>
        <select id="site-lang" name="lang">
          <option value="zh-CN">简体中文</option>
          <option value="en">English</option>
        </select>

        <label for="site-notify">
          <input id="site-notify" name="notify" type="checkbox" checked style="width:auto;margin-right:6px" />
          开启邮件通知
        </label>

        <div class="form-actions">
          <button type="submit">保存设置</button>
          <button type="reset" class="btn ghost">重置</button>
        </div>
      </form>
    </section>
  </div>
</div>

<script>
  /**
   * 侧栏切换面板：
   * 1）不要用 <a href="#"> —— 会改变地址栏 hash，还可能滚到顶部
   * 2）用 button + data-panel，点击后切换 .active
   */
  const navItems = document.querySelectorAll('.nav-item')
  const panels = document.querySelectorAll('.panel')

  navItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.panel // dashboard | users | orders | settings

      // 侧栏高亮
      navItems.forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')

      // 只显示对应面板
      panels.forEach((p) => p.classList.remove('active'))
      const target = document.getElementById('panel-' + id)
      if (target) target.classList.add('active')
    })
  })

  // 设置页：阻止真正提交，演示一下取值
  document.getElementById('settings-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    alert(
      '已保存（演示）\\n' +
        '站点：' + fd.get('siteName') + '\\n' +
        '语言：' + fd.get('lang') + '\\n' +
        '邮件通知：' + (fd.get('notify') ? '开' : '关')
    )
  })
</script>`,
  },
  {
    id: 'p2-skel-3col',
    title: '三栏布局',
    group: '06-页面骨架',
    summary: '左目录 + 正文面板 + 右侧栏联动',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; color: #1f2a24; }

  .three-col {
    display: grid;
    grid-template-columns: 180px 1fr 240px; /* 左固定 | 中自适应 | 右固定 */
    min-height: 320px;
  }
  .left {
    padding: 16px;
    background: #eef6f1;
    border-right: 1px solid #d9e0d8;
  }
  .left strong { display: block; margin-bottom: 8px; color: #2f6b4f; }
  /* 左侧目录：button + data-panel，不用 href="#" */
  .left button {
    display: block;
    width: 100%;
    padding: 6px 0;
    border: 0;
    background: transparent;
    color: #2f6b4f;
    font: inherit;
    font-size: 13px;
    text-align: left;
    cursor: pointer;
  }
  .left button.active { font-weight: 700; text-decoration: underline; }

  .center { padding: 20px; background: #fff; }
  .panel { display: none; }
  .panel.active { display: block; }
  .panel h2 { margin: 0 0 12px; font-size: 18px; }
  .article { line-height: 1.7; color: #3d4a42; font-size: 14px; margin: 0 0 10px; }

  .right {
    padding: 16px;
    background: #f7faf8;
    border-left: 1px solid #d9e0d8;
  }
  .widget {
    padding: 12px;
    background: #fff;
    border: 1px solid #d9e0d8;
    border-radius: 8px;
    margin-bottom: 12px;
    font-size: 13px;
  }
  .widget h4 { margin: 0 0 8px; font-size: 13px; color: #2f6b4f; }
  .widget p { margin: 0; color: #5c6b62; line-height: 1.5; }
</style>

<div class="three-col">
  <!-- 左栏：文档目录，点击切换中间正文 -->
  <nav class="left">
    <strong>目录</strong>
    <button type="button" class="nav-item active" data-panel="intro">简介</button>
    <button type="button" class="nav-item" data-panel="install">安装</button>
    <button type="button" class="nav-item" data-panel="quickstart">快速开始</button>
    <button type="button" class="nav-item" data-panel="api">API</button>
  </nav>

  <!-- 中栏：各章节正文面板 -->
  <article class="center">
    <section class="panel active" id="panel-intro">
      <h2>简介</h2>
      <p class="article">MiniDocs 是一个轻量文档框架，适合教程站与内部知识库。三栏布局让目录、正文与辅助信息同时可见。</p>
      <p class="article">左侧目录负责跳转章节，中间展示详细内容，右侧可放本页小目录、相关链接或广告位。</p>
    </section>
    <section class="panel" id="panel-install">
      <h2>安装</h2>
      <p class="article">使用 npm 安装：<code>npm install minidocs</code>。也可通过 CDN 在静态 HTML 中直接引入。</p>
      <p class="article">安装完成后，在项目根目录创建 <code>docs.config.js</code>，指定站点标题与主题色即可启动本地预览。</p>
    </section>
    <section class="panel" id="panel-quickstart">
      <h2>快速开始</h2>
      <p class="article">运行 <code>npx minidocs dev</code> 启动开发服务器，浏览器访问 localhost:3000 即可预览。</p>
      <p class="article">在 <code>docs/</code> 目录下新建 Markdown 文件，Front Matter 里写好 title 与 order，左侧目录会自动生成。</p>
    </section>
    <section class="panel" id="panel-api">
      <h2>API</h2>
      <p class="article"><code>createSite(config)</code> 创建站点实例；<code>renderPage(slug)</code> 渲染指定页面为 HTML 字符串。</p>
      <p class="article">插件可通过 <code>onBuild</code> 钩子扩展构建流程，例如自动生成搜索索引或导出 PDF。</p>
    </section>
  </article>

  <!-- 右栏：随当前章节变化的辅助信息 -->
  <aside class="right" id="sidebar-widgets">
    <div class="widget" id="widget-toc">
      <h4>本页目录</h4>
      <p id="toc-text">概述 · 适用场景 · 下一步</p>
    </div>
    <div class="widget">
      <h4>相关链接</h4>
      <p id="links-text">GitHub · 示例仓库</p>
    </div>
  </aside>
</div>

<script>
  /**
   * 三栏文档站切换逻辑：
   * 1）左侧 button 带 data-panel，点击后高亮 nav + 显示对应 .panel
   * 2）右侧 widget 文案随章节简要更新
   * 3）全程不用 href="#"，避免 hash 跳转或滚到顶部
   */
  const navItems = document.querySelectorAll('.nav-item')
  const panels = document.querySelectorAll('.panel')
  const tocText = document.getElementById('toc-text')
  const linksText = document.getElementById('links-text')

  // 各章对应的右侧栏文案
  const sidebarMeta = {
    intro:      { toc: '概述 · 适用场景 · 下一步', links: 'GitHub · 示例仓库' },
    install:    { toc: 'npm 安装 · CDN · 环境要求', links: 'Node 版本说明 · 故障排查' },
    quickstart: { toc: '启动 dev · 写第一篇 · 部署', links: '部署到 Vercel · 主题定制' },
    api:        { toc: 'createSite · renderPage · 插件', links: 'TypeScript 类型 · 更新日志' },
  }

  navItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.panel

      navItems.forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')

      panels.forEach((p) => p.classList.remove('active'))
      document.getElementById('panel-' + id)?.classList.add('active')

      const meta = sidebarMeta[id]
      if (meta) {
        tocText.textContent = meta.toc
        linksText.textContent = meta.links
      }
    })
  })
</script>`,
  },
  {
    id: 'p2-skel-mobile-tab',
    title: '移动端底部 Tab',
    group: '06-页面骨架',
    summary: '底栏切换多个页面（不用 href="#"）',
    code: `<style>
  * { box-sizing: border-box; }
  body {
    margin: 0 auto;
    font: 14px/1.5 system-ui, sans-serif;
    color: #1f2a24;
    max-width: 390px;
    background: #f4f7f5;
    min-height: 420px;
  }
  .screen { padding: 16px 16px 72px; min-height: 360px; }
  .screen h2 { margin: 0 0 12px; font-size: 18px; }
  .panel { display: none; }
  .panel.active { display: block; }
  .feed-item, .cell {
    padding: 14px; margin-bottom: 10px; background: #fff;
    border-radius: 10px; box-shadow: 0 1px 4px rgba(31,42,36,.05);
  }
  .tabbar {
    position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
    width: 100%; max-width: 390px; display: flex; background: #fff;
    border-top: 1px solid #d9e0d8;
    padding-bottom: env(safe-area-inset-bottom, 0);
  }
  .tab {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    padding: 8px 0 6px; border: 0; background: transparent;
    font-size: 10px; color: #5c6b62; cursor: pointer;
  }
  .tab .icon { font-size: 20px; margin-bottom: 2px; }
  .tab.active { color: #2f6b4f; font-weight: 600; }
</style>

<div class="screen">
  <section class="panel active" id="panel-home">
    <h2>首页</h2>
    <div class="feed-item"><strong>动态 1</strong><p style="margin:4px 0 0;font-size:13px;color:#5c6b62;">今日学习打卡 ✓</p></div>
    <div class="feed-item"><strong>动态 2</strong><p style="margin:4px 0 0;font-size:13px;color:#5c6b62;">完成了 Grid 章节</p></div>
  </section>
  <section class="panel" id="panel-discover">
    <h2>发现</h2>
    <div class="cell">热门话题：#Flex布局</div>
    <div class="cell">热门话题：#sticky吸顶</div>
  </section>
  <section class="panel" id="panel-publish">
    <h2>发布</h2>
    <div class="cell">
      <textarea rows="4" style="width:100%;font:inherit;border:1px solid #c5d2ca;border-radius:8px;padding:8px;" placeholder="写点什么…"></textarea>
      <button type="button" style="margin-top:8px;padding:8px 14px;border:0;border-radius:8px;background:#2f6b4f;color:#fff;">发布</button>
    </div>
  </section>
  <section class="panel" id="panel-msg">
    <h2>消息</h2>
    <div class="cell"><strong>系统通知</strong><div style="font-size:12px;color:#5c6b62;">你有一条新回复</div></div>
    <div class="cell"><strong>小明</strong><div style="font-size:12px;color:#5c6b62;">晚上一起看 Demo？</div></div>
  </section>
  <section class="panel" id="panel-me">
    <h2>我的</h2>
    <div class="cell"><strong>学员小白</strong><div style="font-size:12px;color:#5c6b62;">已学 12 个布局 Demo</div></div>
    <div class="cell">账号设置</div>
    <div class="cell">退出登录</div>
  </section>
</div>

<nav class="tabbar">
  <button type="button" class="tab active" data-panel="home"><span class="icon">🏠</span>首页</button>
  <button type="button" class="tab" data-panel="discover"><span class="icon">🔍</span>发现</button>
  <button type="button" class="tab" data-panel="publish"><span class="icon">➕</span>发布</button>
  <button type="button" class="tab" data-panel="msg"><span class="icon">💬</span>消息</button>
  <button type="button" class="tab" data-panel="me"><span class="icon">👤</span>我的</button>
</nav>

<script>
  const tabs = document.querySelectorAll('.tab')
  const panels = document.querySelectorAll('.panel')
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.panel
      tabs.forEach((t) => t.classList.remove('active'))
      tab.classList.add('active')
      panels.forEach((p) => p.classList.remove('active'))
      document.getElementById('panel-' + id)?.classList.add('active')
    })
  })
</script>`,
  },

  {
    id: 'p2-skel-master-detail',
    title: 'Master-Detail 主从',
    group: '06-页面骨架',
    summary: '左侧列表 + 右侧详情面板',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; color: #1f2a24; }

  .master-detail {
    display: grid;
    grid-template-columns: 260px 1fr;
    height: 300px;
    border: 1px solid #d9e0d8;
    border-radius: 12px;
    overflow: hidden;
  }
  .master {
    border-right: 1px solid #d9e0d8;
    overflow-y: auto;
    background: #f7faf8;
  }
  .master-item {
    padding: 12px 16px;
    border-bottom: 1px solid #eef6f1;
    cursor: pointer;
    font-size: 13px;
  }
  .master-item:hover { background: #eef6f1; }
  .master-item.active {
    background: #fff;
    border-left: 3px solid #2f6b4f;
    font-weight: 600;
  }
  .master-item .sub { font-size: 11px; color: #5c6b62; font-weight: 400; margin-top: 2px; }
  .detail {
    padding: 20px 24px;
    background: #fff;
    overflow-y: auto;
  }
  .detail h2 { margin: 0 0 8px; font-size: 18px; }
  .detail .meta { font-size: 12px; color: #5c6b62; margin-bottom: 16px; }
  .detail p { line-height: 1.7; color: #3d4a42; }
</style>

<div class="master-detail">
  <div class="master">
    <div class="master-item active">项目 Alpha<div class="sub">更新于 2 小时前</div></div>
    <div class="master-item">项目 Beta<div class="sub">更新于 昨天</div></div>
    <div class="master-item">项目 Gamma<div class="sub">更新于 3 天前</div></div>
    <div class="master-item">项目 Delta<div class="sub">更新于 1 周前</div></div>
  </div>
  <div class="detail">
    <h2>项目 Alpha</h2>
    <div class="meta">负责人：张三 · 状态：进行中</div>
    <p>Master-Detail 模式常见于邮件客户端、IDE 文件树、设置页。左侧选中项，右侧展示详情。</p>
  </div>
</div>`,
  },
  {
    id: 'p2-skel-app-shell',
    title: 'App Shell 壳层',
    group: '06-页面骨架',
    summary: 'sticky 顶栏 + 可滚动主区域',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; color: #1f2a24; }

  .app {
    display: flex;
    flex-direction: column;
    height: 320px;            /* 模拟视口高度 */
    border: 1px solid #d9e0d8;
    border-radius: 12px;
    overflow: hidden;
  }
  .app-header {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    height: 48px;
    background: #2f6b4f;
    color: #fff;
  }
  .app-header .title { font-weight: 600; }
  .app-header button {
    background: rgba(255,255,255,.15);
    border: none;
    color: #fff;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
  }
  .app-main {
    flex: 1;                /* 占据剩余高度 */
    overflow-y: auto;         /* 仅主区域滚动，壳层不动 */
    padding: 16px;
    background: #f7faf8;
  }
  .card {
    padding: 14px;
    margin-bottom: 10px;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #eef6f1;
  }
</style>

<div class="app">
  <header class="app-header">
    <span class="title">📚 学习 App</span>
    <button>设置</button>
  </header>
  <main class="app-main">
    <div class="card">第 1 课 · HTML 基础</div>
    <div class="card">第 2 课 · CSS 选择器</div>
    <div class="card">第 3 课 · Flex 布局</div>
    <div class="card">第 4 课 · Grid 布局</div>
    <div class="card">第 5 课 · 定位</div>
    <div class="card">第 6 课 · 响应式</div>
  </main>
</div>`,
  },
  {
    id: 'p2-skel-settings',
    title: '设置页分组',
    group: '06-页面骨架',
    summary: '分组列表 + 可点击 Toggle',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; color: #1f2a24; background: #f4f7f5; }

  .settings { max-width: 480px; margin: 16px auto; }
  .settings h1 { margin: 0 0 20px; font-size: 22px; padding: 0 4px; }
  .group { margin-bottom: 24px; }
  .group-label {
    padding: 0 4px 8px;
    font-size: 12px;
    font-weight: 700;
    color: #5c6b62;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .group-body {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #d9e0d8;
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    border-bottom: 1px solid #eef6f1;
    font-size: 14px;
  }
  .row:last-child { border-bottom: none; }
  .row .desc { display: block; font-size: 12px; color: #5c6b62; margin-top: 2px; }
  /* 可点击 toggle：用 button，on/off 靠 aria-checked */
  .toggle {
    width: 44px; height: 26px;
    padding: 0;
    border: 0;
    background: #2f6b4f;
    border-radius: 999px;
    position: relative;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s;
  }
  .toggle::after {
    content: '';
    position: absolute;
    top: 3px; right: 3px;
    width: 20px; height: 20px;
    background: #fff;
    border-radius: 50%;
    transition: left 0.15s, right 0.15s;
  }
  .toggle[aria-checked="false"] { background: #cbd5ce; }
  .toggle[aria-checked="false"]::after { right: auto; left: 3px; }
  .chevron { color: #9bb5a6; }
  .hint { margin: 0 4px; font-size: 12px; color: #5c6b62; }
</style>

<div class="settings">
  <h1>设置</h1>
  <p class="hint">点右侧开关可切换开 / 关</p>
  <div class="group">
    <div class="group-label">账户</div>
    <div class="group-body">
      <div class="row"><div>个人资料<span class="desc">头像、昵称</span></div><span class="chevron">›</span></div>
      <div class="row"><div>修改密码</div><span class="chevron">›</span></div>
    </div>
  </div>
  <div class="group">
    <div class="group-label">偏好</div>
    <div class="group-body">
      <div class="row">
        <div>深色模式</div>
        <button type="button" class="toggle" role="switch" aria-checked="false" aria-label="深色模式"></button>
      </div>
      <div class="row">
        <div>消息通知</div>
        <button type="button" class="toggle" role="switch" aria-checked="true" aria-label="消息通知"></button>
      </div>
      <div class="row"><div>语言</div><span style="color:#5c6b62;font-size:13px;">简体中文 ›</span></div>
    </div>
  </div>
</div>

<script>
  document.querySelectorAll('.toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const on = btn.getAttribute('aria-checked') === 'true'
      btn.setAttribute('aria-checked', on ? 'false' : 'true')
    })
  })
</script>`,
  },
  {
    id: 'p2-skel-empty',
    title: '空状态居中',
    group: '06-页面骨架',
    summary: 'flex 居中展示 empty state',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; }

  .page {
    min-height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px;
    background: #f7faf8;
    text-align: center;
  }
  .icon {
    width: 80px;
    height: 80px;
    margin-bottom: 16px;
    background: #eef6f1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
  }
  .page h2 { margin: 0 0 8px; font-size: 18px; color: #1f2a24; }
  .page p { margin: 0 0 20px; color: #5c6b62; font-size: 14px; max-width: 280px; }
  .btn {
    padding: 10px 20px;
    background: #2f6b4f;
    color: #fff;
    border: none;
    border-radius: 8px;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
  }
</style>

<div class="page">
  <div class="icon">📭</div>
  <h2>暂无消息</h2>
  <p>你还没有收到任何通知。开始关注好友或加入项目吧。</p>
  <button class="btn">去发现</button>
</div>`,
  },
  {
    id: 'p2-skel-loading',
    title: 'Loading 骨架屏',
    group: '06-页面骨架',
    summary: '先骨架 → 延时出真数据，可刷新重演',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; color: #1f2a24; }

  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }
  .toolbar h2 { margin: 0; font-size: 16px; }
  .refresh {
    padding: 6px 12px;
    border: 1px solid #9bb5a6;
    border-radius: 8px;
    background: #fff;
    font: inherit;
    font-size: 13px;
    cursor: pointer;
  }
  .status { font-size: 12px; color: #5c6b62; margin: 0 0 12px; }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.45; }
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .sk-card, .real-card {
    padding: 16px;
    background: #fff;
    border: 1px solid #eef6f1;
    border-radius: 10px;
  }
  .sk-line {
    height: 12px;
    background: #d9ebe1;
    border-radius: 4px;
    margin-bottom: 10px;
    animation: pulse 1.5s ease-in-out infinite;
  }
  .sk-line.w80 { width: 80%; }
  .sk-line.w60 { width: 60%; }
  .sk-line.w40 { width: 40%; }
  .sk-avatar, .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-bottom: 12px;
  }
  .sk-avatar {
    background: #d9ebe1;
    animation: pulse 1.5s ease-in-out infinite;
  }
  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2f6b4f;
    color: #fff;
    font-weight: 700;
    font-size: 14px;
  }
  .real-card h3 { margin: 0 0 6px; font-size: 14px; }
  .real-card p { margin: 0; font-size: 12px; color: #5c6b62; line-height: 1.5; }
  .hidden { display: none !important; }
</style>

<div class="toolbar">
  <h2>学员列表</h2>
  <button type="button" class="refresh" id="refresh">刷新重演</button>
</div>
<p class="status" id="status">加载中…（约 2 秒后显示真实数据）</p>

<div class="grid" id="skeleton">
  <div class="sk-card">
    <div class="sk-avatar"></div>
    <div class="sk-line w80"></div>
    <div class="sk-line w60"></div>
    <div class="sk-line w40"></div>
  </div>
  <div class="sk-card">
    <div class="sk-avatar"></div>
    <div class="sk-line w80"></div>
    <div class="sk-line w60"></div>
    <div class="sk-line w40"></div>
  </div>
  <div class="sk-card">
    <div class="sk-line w80"></div>
    <div class="sk-line w60"></div>
  </div>
  <div class="sk-card">
    <div class="sk-line w80"></div>
    <div class="sk-line w60"></div>
  </div>
</div>

<div class="grid hidden" id="real">
  <div class="real-card">
    <div class="avatar">张</div>
    <h3>张同学</h3>
    <p>已完成 Flex 作业 · 进度 80%</p>
  </div>
  <div class="real-card">
    <div class="avatar">李</div>
    <h3>李同学</h3>
    <p>正在学 Grid · 进度 45%</p>
  </div>
  <div class="real-card">
    <div class="avatar">王</div>
    <h3>王同学</h3>
    <p>本周打卡 5 天</p>
  </div>
  <div class="real-card">
    <div class="avatar">赵</div>
    <h3>赵同学</h3>
    <p>新加入 · 欢迎！</p>
  </div>
</div>

<script>
  const skeleton = document.getElementById('skeleton')
  const real = document.getElementById('real')
  const status = document.getElementById('status')
  let timer = null

  function showSkeleton() {
    clearTimeout(timer)
    skeleton.classList.remove('hidden')
    real.classList.add('hidden')
    status.textContent = '加载中…（约 2 秒后显示真实数据）'
    timer = setTimeout(() => {
      skeleton.classList.add('hidden')
      real.classList.remove('hidden')
      status.textContent = '加载完成 ✓  点「刷新重演」可再看一遍骨架 → 真数据'
    }, 2000)
  }

  document.getElementById('refresh').addEventListener('click', showSkeleton)
  showSkeleton()
</script>`,
  },
  {
    id: 'p2-skel-toolbar',
    title: '面包屑 + 标题 + 操作栏',
    group: '06-页面骨架',
    summary: '页面顶部工具条组合',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; color: #1f2a24; background: #f4f7f5; }

  .toolbar-page { padding: 20px 24px; }
  .breadcrumb {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #5c6b62;
    margin-bottom: 12px;
  }
  .breadcrumb a { color: #2f6b4f; text-decoration: none; }
  .breadcrumb span { color: #9bb5a6; }
  .page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 20px;
  }
  .page-header h1 { margin: 0; font-size: 24px; }
  .page-header .subtitle { margin: 4px 0 0; font-size: 13px; color: #5c6b62; }
  .actions { display: flex; gap: 8px; flex-shrink: 0; }
  .btn {
    padding: 8px 14px;
    border-radius: 8px;
    border: 1px solid #9bb5a6;
    background: #fff;
    font: inherit;
    font-size: 13px;
    cursor: pointer;
  }
  .btn.primary { background: #2f6b4f; color: #fff; border-color: #2f6b4f; }
  .content-box {
    padding: 20px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #d9e0d8;
  }
</style>

<div class="toolbar-page">
  <nav class="breadcrumb">
    <button type="button" class="crumb-link" style="border:0;background:transparent;color:#2f6b4f;font:inherit;cursor:pointer;padding:0;">项目</button><span>/</span>
    <button type="button" class="crumb-link" style="border:0;background:transparent;color:#2f6b4f;font:inherit;cursor:pointer;padding:0;">Alpha</button><span>/</span>
    任务详情
  </nav>
  <div class="page-header">
    <div>
      <h1>重构导航组件</h1>
      <p class="subtitle">#TASK-1284 · 分配给李四</p>
    </div>
    <div class="actions">
      <button class="btn">分享</button>
      <button class="btn primary">编辑</button>
    </div>
  </div>
  <div class="content-box">
    <p style="margin:0;color:#3d4a42;">正文区域：面包屑提供路径上下文，标题区放主操作按钮。</p>
  </div>
</div>`,
  },
  {
    id: 'p2-skel-split-pane',
    title: 'Split Pane 分栏',
    group: '06-页面骨架',
    summary: '拖中间分隔条可左右调宽',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 13px/1.5 'SF Mono', Consolas, monospace; color: #1f2a24; }

  .hint { margin: 0 0 10px; font: 12px/1.5 system-ui, sans-serif; color: #5c6b62; }
  .split {
    display: flex;
    height: 260px;
    border: 1px solid #d9e0d8;
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
  }
  .pane {
    overflow: auto;
    padding: 12px;
    min-width: 80px;
  }
  .pane-code {
    width: 50%;              /* 初始宽度；拖拽时由 JS 改写 */
    flex-shrink: 0;
    background: #1a2420;
    color: #a8d4b8;
  }
  .pane-preview {
    flex: 1;                 /* 右侧吃掉剩余宽度 */
    background: #f7faf8;
    font-family: system-ui, sans-serif;
  }
  .divider {
    width: 6px;
    flex-shrink: 0;
    background: #d9e0d8;
    cursor: col-resize;
    transition: background 0.15s;
  }
  .divider:hover,
  .divider.dragging { background: #2f6b4f; }
  .pane-code pre { margin: 0; white-space: pre-wrap; font-size: 12px; line-height: 1.6; }
  .preview-box {
    padding: 16px;
    background: #2f6b4f;
    color: #fff;
    border-radius: 8px;
    text-align: center;
  }
  .label {
    font-size: 11px;
    font-weight: 700;
    color: #5c6b62;
    margin-bottom: 8px;
    font-family: system-ui, sans-serif;
  }
  .pane-code .label { color: #6fcf97; }
</style>

<p class="hint">按住中间绿色分隔条左右拖动，可调整左右栏宽度。</p>
<div class="split" id="split">
  <div class="pane pane-code" id="left">
    <div class="label">EDITOR</div>
    <pre>&lt;div class="box"&gt;
  Hello Split!
&lt;/div&gt;

.box {
  padding: 16px;
  background: #2f6b4f;
}</pre>
  </div>
  <div class="divider" id="divider" title="拖拽调整宽度"></div>
  <div class="pane pane-preview">
    <div class="label">PREVIEW</div>
    <div class="preview-box">Hello Split!</div>
  </div>
</div>

<script>
  const split = document.getElementById('split')
  const left = document.getElementById('left')
  const divider = document.getElementById('divider')
  let dragging = false

  divider.addEventListener('mousedown', (e) => {
    e.preventDefault()
    dragging = true
    divider.classList.add('dragging')
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  })

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return
    const rect = split.getBoundingClientRect()
    // 相对 split 左边缘的坐标，限制最小/最大宽度
    let w = e.clientX - rect.left
    const min = 80
    const max = rect.width - 86 // 预留 divider + 右栏最小宽
    w = Math.max(min, Math.min(max, w))
    left.style.width = w + 'px'
  })

  document.addEventListener('mouseup', () => {
    if (!dragging) return
    dragging = false
    divider.classList.remove('dragging')
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  })
</script>`,
  },
]

export default part2GridPositionDemos
