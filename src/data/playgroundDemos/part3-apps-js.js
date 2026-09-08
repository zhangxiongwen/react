/**
 * 代码演练台 Part3：常见 App 界面片段（列表、导航、聊天、表单、交互）
 * 共 35 个 Demo，含 CSS 与必要 JavaScript
 */
const part3AppsJs = [
  // ── 07-列表与卡片（8）────────────────────────────────────────
  {
    id: 'p3-simple-list',
    title: '简单文字列表',
    group: '07-列表与卡片',
    summary: 'ul/li + 分隔线，最基础的信息列表',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; color: #1f2a24; }

  /* 去掉 ul 默认圆点，占满宽度 */
  .list {
    list-style: none;
    margin: 0;
    padding: 0;
    max-width: 360px;
    border: 1px solid #d9e0d8;
    border-radius: 10px;
    overflow: hidden; /* 圆角不被子项背景撑破 */
  }
  .list li {
    padding: 12px 16px;
    background: #fff;
    border-bottom: 1px solid #eef2ee; /* 每项底部分隔线 */
  }
  .list li:last-child { border-bottom: none; }
  .list li:hover { background: #f7faf8; } /* 悬停反馈 */
</style>

<ul class="list">
  <li>React 入门：组件与 JSX</li>
  <li>状态管理：useState 基础</li>
  <li>事件处理：点击与表单</li>
  <li>列表渲染：key 的重要性</li>
</ul>`,
  },
  {
    id: 'p3-list-avatar',
    title: '带头像的列表',
    group: '07-列表与卡片',
    summary: 'Flex 左图右文，常见于通讯录 / 消息',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .list { list-style: none; margin: 0; padding: 0; max-width: 380px; }
  .item {
    display: flex;           /* 横向排列：头像 + 文字区 */
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-bottom: 1px solid #eef2ee;
  }
  .avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;      /* 圆形头像 */
    background: linear-gradient(135deg, #6fcf97, #2f6b4f);
    flex-shrink: 0;          /* 不被文字挤扁 */
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 700;
  }
  .meta { flex: 1; min-width: 0; } /* min-width:0 让省略号生效 */
  .name { font-weight: 600; margin: 0 0 2px; }
  .desc {
    margin: 0;
    font-size: 13px;
    color: #5c6b62;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* 文字过长显示 … */
  }
  .time { font-size: 12px; color: #9bb5a6; }
</style>

<ul class="list">
  <li class="item">
    <div class="avatar">张</div>
    <div class="meta">
      <p class="name">张三</p>
      <p class="desc">明天下午三点开会，记得带笔记本</p>
    </div>
    <span class="time">10:30</span>
  </li>
  <li class="item">
    <div class="avatar">李</div>
    <div class="meta">
      <p class="name">李四</p>
      <p class="desc">作业已提交，请查收</p>
    </div>
    <span class="time">昨天</span>
  </li>
</ul>`,
  },
  {
    id: 'p3-media-object',
    title: 'Media Object 媒体对象',
    group: '07-列表与卡片',
    summary: '左图 + 标题 + 摘要，Bootstrap 经典模式',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; }

  .media {
    display: flex;
    gap: 14px;
    max-width: 420px;
    padding: 14px;
    background: #fff;
    border: 1px solid #d9e0d8;
    border-radius: 10px;
  }
  .media + .media { margin-top: 12px; }

  /* 缩略图区域：固定尺寸 */
  .thumb {
    width: 96px;
    height: 72px;
    border-radius: 8px;
    background: #d9ebe1;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2f6b4f;
    font-size: 12px;
  }
  .body { flex: 1; }
  .title { margin: 0 0 6px; font-size: 15px; }
  .text { margin: 0; color: #5c6b62; font-size: 13px; }
</style>

<article class="media">
  <div class="thumb">封面图</div>
  <div class="body">
    <h3 class="title">Flex 布局实战指南</h3>
    <p class="text">Media Object 把图片和文字并排，适合新闻、评论、搜索结果。</p>
  </div>
</article>

<article class="media">
  <div class="thumb">封面图</div>
  <div class="body">
    <h3 class="title">Grid 卡片网格</h3>
    <p class="text">左图右文结构清晰，移动端也常用。</p>
  </div>
</article>`,
  },
  {
    id: 'p3-card-list',
    title: '卡片式列表',
    group: '07-列表与卡片',
    summary: '每项独立卡片，带阴影与间距',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; background: #f4f7f5; }

  .cards {
    list-style: none;
    margin: 0;
    padding: 0;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    gap: 12px; /* 卡片之间的垂直间距 */
  }
  .card {
    padding: 16px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(31, 42, 36, 0.08);
  }
  .card h3 { margin: 0 0 6px; font-size: 16px; }
  .card p { margin: 0; color: #5c6b62; font-size: 13px; }
  .tag {
    display: inline-block;
    margin-top: 10px;
    padding: 2px 8px;
    font-size: 12px;
    background: #eef6f1;
    color: #2f6b4f;
    border-radius: 999px;
  }
</style>

<ul class="cards">
  <li class="card">
    <h3>第 1 课：HTML 结构</h3>
    <p>语义化标签与页面骨架</p>
    <span class="tag">基础</span>
  </li>
  <li class="card">
    <h3>第 2 课：CSS 布局</h3>
    <p>Flex 与 Grid 入门</p>
    <span class="tag">布局</span>
  </li>
  <li class="card">
    <h3>第 3 课：JavaScript</h3>
    <p>DOM 操作与事件</p>
    <span class="tag">交互</span>
  </li>
</ul>`,
  },
  {
    id: 'p3-product-row',
    title: '商品横向卡片行',
    group: '07-列表与卡片',
    summary: '电商列表：图 + 标题 + 价格 + 按钮',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .product {
    display: flex;
    gap: 12px;
    max-width: 420px;
    padding: 12px;
    border: 1px solid #d9e0d8;
    border-radius: 10px;
    background: #fff;
  }
  .pic {
    width: 88px;
    height: 88px;
    border-radius: 8px;
    background: #eef6f1;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
  }
  .info { flex: 1; display: flex; flex-direction: column; }
  .title { margin: 0; font-size: 15px; font-weight: 600; }
  .sub { margin: 4px 0 auto; font-size: 12px; color: #9bb5a6; }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
  }
  .price { color: #c53030; font-size: 18px; font-weight: 700; }
  .price small { font-size: 12px; }
  .btn {
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    background: #2f6b4f;
    color: #fff;
    font: inherit;
    cursor: pointer;
  }
</style>

<article class="product">
  <div class="pic">📚</div>
  <div class="info">
    <h3 class="title">前端入门实战手册</h3>
    <p class="sub">包邮 · 7天无理由</p>
    <div class="row">
      <span class="price"><small>¥</small>49.9</span>
      <button class="btn" type="button">加入购物车</button>
    </div>
  </div>
</article>`,
  },
  {
    id: 'p3-comment-list',
    title: '评论列表',
    group: '07-列表与卡片',
    summary: '头像 + 昵称 + 时间 + 评论正文',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; }

  .comments { max-width: 400px; }
  .comment {
    display: flex;
    gap: 10px;
    padding: 14px 0;
    border-bottom: 1px solid #eef2ee;
  }
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #2f6b4f;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
  }
  .content { flex: 1; }
  .head {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 4px;
  }
  .nick { font-weight: 600; font-size: 13px; }
  .time { font-size: 12px; color: #9bb5a6; }
  .text { margin: 0; color: #3d4a42; font-size: 14px; }
  .actions { margin-top: 8px; font-size: 12px; color: #5c6b62; }
  .actions span { margin-right: 12px; cursor: pointer; }
</style>

<section class="comments">
  <article class="comment">
    <div class="avatar">王</div>
    <div class="content">
      <div class="head">
        <span class="nick">王小明</span>
        <time class="time">2 小时前</time>
      </div>
      <p class="text">讲得很清楚，尤其是 Flex 那一段！</p>
      <div class="actions">
        <span>👍 12</span>
        <span>回复</span>
      </div>
    </div>
  </article>
  <article class="comment">
    <div class="avatar">陈</div>
    <div class="content">
      <div class="head">
        <span class="nick">陈同学</span>
        <time class="time">昨天</time>
      </div>
      <p class="text">能不能再出一期 Grid 的？</p>
      <div class="actions">
        <span>👍 3</span>
        <span>回复</span>
      </div>
    </div>
  </article>
</section>`,
  },
  {
    id: 'p3-notification-list',
    title: '通知消息列表',
    group: '07-列表与卡片',
    summary: '未读圆点 + 图标 + 摘要 + 时间',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .notify { list-style: none; margin: 0; padding: 0; max-width: 380px; }
  .item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 12px;
    border-bottom: 1px solid #eef2ee;
    position: relative;
  }
  .item.unread { background: #f7faf8; } /* 未读项浅底 */
  .dot {
    position: absolute;
    left: 4px;
    top: 18px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #c53030;
  }
  .icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #eef6f1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .body { flex: 1; }
  .title { margin: 0 0 4px; font-weight: 600; }
  .desc { margin: 0; font-size: 13px; color: #5c6b62; }
  .time { font-size: 12px; color: #9bb5a6; white-space: nowrap; }
</style>

<ul class="notify">
  <li class="item unread">
    <span class="dot" aria-hidden="true"></span>
    <div class="icon">📦</div>
    <div class="body">
      <p class="title">订单已发货</p>
      <p class="desc">您的包裹正在派送中，预计今日送达</p>
    </div>
    <span class="time">刚刚</span>
  </li>
  <li class="item unread">
    <span class="dot" aria-hidden="true"></span>
    <div class="icon">💬</div>
    <div class="body">
      <p class="title">新消息</p>
      <p class="desc">老师回复了你的作业评论</p>
    </div>
    <span class="time">5 分钟前</span>
  </li>
  <li class="item">
    <div class="icon">✅</div>
    <div class="body">
      <p class="title">系统通知</p>
      <p class="desc">本周学习报告已生成</p>
    </div>
    <span class="time">昨天</span>
  </li>
</ul>`,
  },
  {
    id: 'p3-long-scroll-list',
    title: '长列表滚动（虚拟感）',
    group: '07-列表与卡片',
    summary: '固定高度容器 + overflow 滚动，模拟超长列表',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 外层固定高度，内部滚动 — 真实虚拟列表会用 JS 只渲染可见项 */
  .scroll-box {
    max-width: 320px;
    height: 280px;
    overflow-y: auto;          /* 纵向超出时出现滚动条 */
    border: 1px solid #d9e0d8;
    border-radius: 10px;
    background: #fff;
  }
  .scroll-box::-webkit-scrollbar { width: 6px; }
  .scroll-box::-webkit-scrollbar-thumb {
    background: #9bb5a6;
    border-radius: 3px;
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-bottom: 1px solid #eef2ee;
  }
  .row:hover { background: #f7faf8; }
  .idx { color: #9bb5a6; font-size: 12px; width: 36px; }
  .label { flex: 1; }
  .badge {
    font-size: 11px;
    padding: 2px 6px;
    background: #eef6f1;
    border-radius: 4px;
    color: #2f6b4f;
  }
  .hint {
    margin-top: 8px;
    font-size: 12px;
    color: #5c6b62;
  }
</style>

<div class="scroll-box" id="list"></div>
<p class="hint">共 100 条数据 — 在容器内滚动。真实项目可用 react-window 等库做虚拟化。</p>

<script>
  // 用 JS 批量生成 100 条，模拟后端返回的长列表
  const box = document.getElementById('list')
  const frag = document.createDocumentFragment()

  for (let i = 1; i <= 100; i++) {
    const row = document.createElement('div')
    row.className = 'row'
    row.innerHTML =
      '<span class="idx">#' + i + '</span>' +
      '<span class="label">列表项 ' + i + '</span>' +
      '<span class="badge">' + (i % 3 === 0 ? '热门' : '普通') + '</span>'
    frag.appendChild(row)
  }

  box.appendChild(frag)
</script>`,
  },

  // ── 08-导航标签Tab（7）──────────────────────────────────────
  {
    id: 'p3-tabs-underline',
    title: '顶栏 Tab（下划线 + JS）',
    group: '08-导航标签Tab',
    summary: 'button 切换面板，保留下划线 active 样式',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .tabs {
    display: flex;
    gap: 0;
    border-bottom: 2px solid #eef2ee;
    max-width: 400px;
  }
  /* Tab 用 button，不用 href="#" */
  .tab {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    border: 0;
    background: none;
    color: #5c6b62;
    font: inherit;
    position: relative;
    cursor: pointer;
  }
  /* 当前 Tab：加粗 + 底部绿色粗线 */
  .tab.active {
    color: #2f6b4f;
    font-weight: 700;
  }
  .tab.active::after {
    content: '';
    position: absolute;
    left: 20%;
    right: 20%;
    bottom: -2px;
    height: 2px;
    background: #2f6b4f;
  }

  .panel { display: none; padding: 16px 4px; max-width: 400px; color: #3d4a42; }
  .panel.active { display: block; }

  .feed { list-style: none; margin: 0; padding: 0; }
  .feed li {
    padding: 12px 0;
    border-bottom: 1px solid #eef2ee;
    font-size: 14px;
  }
  .feed li:last-child { border-bottom: none; }
  .feed .meta { font-size: 12px; color: #9bb5a6; margin-top: 4px; }
</style>

<nav class="tabs">
  <button type="button" class="tab active" data-panel="recommend">推荐</button>
  <button type="button" class="tab" data-panel="follow">关注</button>
  <button type="button" class="tab" data-panel="hot">热门</button>
</nav>

<!-- 推荐：算法推荐流 -->
<section class="panel active" id="panel-recommend">
  <ul class="feed">
    <li><strong>Flex 布局 10 分钟入门</strong><div class="meta">1.2k 阅读 · 2 小时前</div></li>
    <li><strong>Grid 圣杯布局实战</strong><div class="meta">860 阅读 · 5 小时前</div></li>
    <li><strong>sticky 吸顶导航踩坑记</strong><div class="meta">540 阅读 · 昨天</div></li>
  </ul>
</section>
<!-- 关注：已关注作者动态 -->
<section class="panel" id="panel-follow">
  <ul class="feed">
    <li><strong>@李同学 发布了新 Demo</strong><div class="meta">Tab 切换面板 · 10 分钟前</div></li>
    <li><strong>@王老师 更新了课程</strong><div class="meta">第 8 章 Hooks · 1 小时前</div></li>
    <li><strong>@张工 点赞了你的评论</strong><div class="meta">在「Grid 布局」章节 · 3 小时前</div></li>
  </ul>
</section>
<!-- 热门：榜单 -->
<section class="panel" id="panel-hot">
  <ul class="feed">
    <li><strong>🔥 1. React 19 新特性速览</strong><div class="meta">8.6k 阅读 · 今日榜</div></li>
    <li><strong>🔥 2. CSS Container Queries 入门</strong><div class="meta">6.2k 阅读 · 今日榜</div></li>
    <li><strong>🔥 3. 前端性能优化清单</strong><div class="meta">4.9k 阅读 · 今日榜</div></li>
  </ul>
</section>

<script>
  // Tab 切换：点击 button 切换 .active 与对应 panel
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
    id: 'p3-tabs-js-panels',
    title: 'Tab 切换面板（JS）',
    group: '08-导航标签Tab',
    summary: '点击 Tab 显示对应 panel，classList 切换',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .tabs { display: flex; border-bottom: 1px solid #d9e0d8; max-width: 400px; }
  .tab {
    padding: 10px 16px;
    border: none;
    background: none;
    cursor: pointer;
    font: inherit;
    color: #5c6b62;
    border-bottom: 2px solid transparent;
  }
  .tab.active { color: #2f6b4f; font-weight: 700; border-bottom-color: #2f6b4f; }
  .panel { display: none; padding: 16px 4px; max-width: 400px; }
  .panel.active { display: block; }
</style>

<div class="tabs">
  <button class="tab active" data-i="0" type="button">首页</button>
  <button class="tab" data-i="1" type="button">课程</button>
  <button class="tab" data-i="2" type="button">我的</button>
</div>
<div class="panel active">首页内容：轮播、推荐课程等。</div>
<div class="panel">课程内容：章节列表与学习进度。</div>
<div class="panel">个人中心：头像、设置、退出登录。</div>

<script>
  const tabs = document.querySelectorAll('.tab')
  const panels = document.querySelectorAll('.panel')

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const i = Number(tab.dataset.i)

      // 1. 所有 tab / panel 去掉 active
      tabs.forEach((t) => t.classList.remove('active'))
      panels.forEach((p) => p.classList.remove('active'))

      // 2. 当前项加上 active
      tab.classList.add('active')
      panels[i].classList.add('active')
    })
  })
</script>`,
  },
  {
    id: 'p3-pills-wrap',
    title: 'Pills 标签换行',
    group: '08-导航标签Tab',
    summary: 'flex-wrap 让标签自动换行，药丸圆角',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .pills {
    display: flex;
    flex-wrap: wrap;    /* 空间不够时换行 */
    gap: 8px;
    max-width: 320px;
  }
  .pill {
    padding: 6px 14px;
    border-radius: 999px; /* 大圆角 = 药丸形 */
    background: #eef6f1;
    color: #2f6b4f;
    font-size: 13px;
    border: 1px solid transparent;
    cursor: default;
  }
  .pill.highlight {
    background: #2f6b4f;
    color: #fff;
  }
</style>

<div class="pills">
  <span class="pill highlight">全部</span>
  <span class="pill">HTML</span>
  <span class="pill">CSS</span>
  <span class="pill">JavaScript</span>
  <span class="pill">React</span>
  <span class="pill">TypeScript</span>
  <span class="pill">Node.js</span>
  <span class="pill">Webpack</span>
</div>`,
  },
  {
    id: 'p3-filter-chips',
    title: '可选筛选 Chips（JS）',
    group: '08-导航标签Tab',
    summary: '点击切换选中态，可多选',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .chips { display: flex; flex-wrap: wrap; gap: 8px; max-width: 360px; }
  .chip {
    padding: 6px 12px;
    border: 1px solid #d9e0d8;
    border-radius: 999px;
    background: #fff;
    font: inherit;
    cursor: pointer;
    color: #5c6b62;
  }
  .chip.selected {
    border-color: #2f6b4f;
    background: #eef6f1;
    color: #2f6b4f;
    font-weight: 600;
  }
  .result { margin-top: 14px; font-size: 13px; color: #5c6b62; }
</style>

<div class="chips" id="chips">
  <button class="chip" type="button" data-v="免费">免费</button>
  <button class="chip" type="button" data-v="入门">入门</button>
  <button class="chip" type="button" data-v="进阶">进阶</button>
  <button class="chip" type="button" data-v="实战">实战</button>
</div>
<p class="result" id="out">已选：无</p>

<script>
  const chips = document.querySelectorAll('.chip')
  const out = document.getElementById('out')
  const selected = new Set() // 用 Set 存已选标签，避免重复

  function render() {
    out.textContent = '已选：' + (selected.size ? [...selected].join('、') : '无')
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const v = chip.dataset.v
      // 切换选中：有则删，无则加
      if (selected.has(v)) {
        selected.delete(v)
        chip.classList.remove('selected')
      } else {
        selected.add(v)
        chip.classList.add('selected')
      }
      render()
    })
  })
</script>`,
  },
  {
    id: 'p3-segment-control',
    title: 'Segment 分段控件',
    group: '08-导航标签Tab',
    summary: 'iOS 风格分段选择，JS 切换背景滑块',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .segment {
    display: inline-flex;
    position: relative;
    padding: 3px;
    background: #eef2ee;
    border-radius: 10px;
    gap: 0;
  }
  .segment button {
    position: relative;
    z-index: 1;
    padding: 8px 20px;
    border: none;
    background: transparent;
    font: inherit;
    cursor: pointer;
    color: #5c6b62;
    border-radius: 8px;
  }
  .segment button.active { color: #1f2a24; font-weight: 600; }
  /* 白色滑块垫在按钮下方 */
  .thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    height: calc(100% - 6px);
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,.08);
    transition: transform .2s, width .2s;
  }
  .hint { margin-top: 12px; font-size: 13px; color: #5c6b62; }
</style>

<div class="segment" id="seg">
  <div class="thumb" id="thumb"></div>
  <button class="active" type="button">日</button>
  <button type="button">周</button>
  <button type="button">月</button>
</div>
<p class="hint" id="hint">当前视图：日</p>

<script>
  const seg = document.getElementById('seg')
  const thumb = document.getElementById('thumb')
  const btns = seg.querySelectorAll('button')
  const hint = document.getElementById('hint')
  const labels = ['日', '周', '月']

  function moveThumb(index) {
    const btn = btns[index]
    thumb.style.width = btn.offsetWidth + 'px'
    thumb.style.transform = 'translateX(' + btn.offsetLeft + 'px)'
  }

  btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      btns.forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')
      moveThumb(i)
      hint.textContent = '当前视图：' + labels[i]
    })
  })

  moveThumb(0) // 初始化滑块位置
</script>`,
  },
  {
    id: 'p3-sidebar-active',
    title: '侧栏菜单高亮',
    group: '08-导航标签Tab',
    summary: '左侧导航 + 各面板简单界面',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; color: #1f2a24; }

  .layout { display: flex; min-height: 280px; max-width: 480px; border: 1px solid #d9e0d8; border-radius: 10px; overflow: hidden; }
  .side {
    width: 140px;
    background: #f7faf8;
    border-right: 1px solid #eef2ee;
    padding: 8px 0;
  }
  .side button {
    display: block;
    width: 100%;
    text-align: left;
    padding: 10px 16px;
    border: none;
    background: none;
    font: inherit;
    cursor: pointer;
    color: #5c6b62;
    border-left: 3px solid transparent;
  }
  .side button.active {
    background: #fff;
    color: #2f6b4f;
    font-weight: 600;
    border-left-color: #2f6b4f;
  }
  .main { flex: 1; padding: 16px; background: #fff; }
  .panel { display: none; }
  .panel.active { display: block; }
  .panel h2 { margin: 0 0 8px; font-size: 17px; }
  .panel .sub { margin: 0 0 12px; font-size: 12px; color: #5c6b62; }

  .stats { display: flex; gap: 8px; }
  .stat {
    flex: 1;
    padding: 10px;
    background: #eef6f1;
    border-radius: 8px;
    text-align: center;
    font-size: 13px;
  }
  .stat b { display: block; font-size: 18px; color: #2f6b4f; }

  .post-list { list-style: none; margin: 0; padding: 0; font-size: 13px; }
  .post-list li { padding: 10px 0; border-bottom: 1px solid #eef2ee; }
  .post-list li:last-child { border-bottom: none; }

  .comment { padding: 10px 0; border-bottom: 1px solid #eef2ee; font-size: 13px; }
  .comment:last-child { border-bottom: none; }
  .comment .nick { font-weight: 600; }
  .comment .time { font-size: 11px; color: #9bb5a6; margin-left: 6px; }

  .form label { display: block; margin: 8px 0 4px; font-size: 12px; color: #5c6b62; }
  .form input, .form select {
    width: 100%;
    padding: 7px 10px;
    border: 1px solid #d9e0d8;
    border-radius: 6px;
    font: inherit;
    box-sizing: border-box;
  }
  .form button {
    margin-top: 12px;
    padding: 7px 14px;
    border: 0;
    border-radius: 6px;
    background: #2f6b4f;
    color: #fff;
    font: inherit;
    cursor: pointer;
  }
</style>

<div class="layout">
  <nav class="side" id="nav">
    <button type="button" class="nav-item active" data-panel="overview">概览</button>
    <button type="button" class="nav-item" data-panel="posts">文章</button>
    <button type="button" class="nav-item" data-panel="comments">评论</button>
    <button type="button" class="nav-item" data-panel="settings">设置</button>
  </nav>
  <main class="main">
    <!-- 概览 -->
    <section class="panel active" id="panel-overview">
      <h2>概览</h2>
      <p class="sub">站点数据一览</p>
      <div class="stats">
        <div class="stat"><b>128</b>文章</div>
        <div class="stat"><b>56</b>评论</div>
        <div class="stat"><b>1.2k</b>访问</div>
      </div>
    </section>
    <!-- 文章 -->
    <section class="panel" id="panel-posts">
      <h2>文章</h2>
      <p class="sub">最近发布</p>
      <ul class="post-list">
        <li><strong>Flex 布局入门</strong><br><span style="color:#9bb5a6;font-size:12px">3 月 1 日 · 草稿</span></li>
        <li><strong>Grid 实战笔记</strong><br><span style="color:#9bb5a6;font-size:12px">2 月 28 日 · 已发布</span></li>
        <li><strong>sticky 吸顶详解</strong><br><span style="color:#9bb5a6;font-size:12px">2 月 25 日 · 已发布</span></li>
      </ul>
    </section>
    <!-- 评论 -->
    <section class="panel" id="panel-comments">
      <h2>评论</h2>
      <p class="sub">待审核与最新</p>
      <div class="comment"><span class="nick">王小明</span><span class="time">2 小时前</span><br>讲得很清楚！</div>
      <div class="comment"><span class="nick">陈同学</span><span class="time">昨天</span><br>能否再出一期 Grid？</div>
      <div class="comment"><span class="nick">匿名用户</span><span class="time">3 天前</span><br>收藏了，慢慢看</div>
    </section>
    <!-- 设置 -->
    <section class="panel" id="panel-settings">
      <h2>设置</h2>
      <p class="sub">站点基础配置</p>
      <form class="form" onsubmit="event.preventDefault()">
        <label>站点标题</label>
        <input value="我的博客" />
        <label>评论审核</label>
        <select><option>先审后发</option><option>直接发布</option></select>
        <button type="submit">保存</button>
      </form>
    </section>
  </main>
</div>

<script>
  // 侧栏切换：高亮 nav-item + 显示对应 panel
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
    id: 'p3-breadcrumb',
    title: '面包屑导航',
    group: '08-导航标签Tab',
    summary: '层级路径：首页 / 分类 / 当前页',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .crumb {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 13px;
  }
  .crumb-btn {
    border: 0; background: transparent; color: #2f6b4f; font: inherit; cursor: pointer; padding: 0;
  }
  .crumb a {
    color: #2f6b4f;
    text-decoration: none;
  }
  .crumb a:hover { text-decoration: underline; }
  .crumb li + li::before {
    content: '/';
    margin: 0 6px;
    color: #9bb5a6;
  }
  .crumb .current { color: #5c6b62; }
</style>

<nav aria-label="面包屑">
  <ol class="crumb">
    <li><button type="button" class="crumb-btn">首页</button></li>
    <li><button type="button" class="crumb-btn">课程</button></li>
    <li><button type="button" class="crumb-btn">前端基础</button></li>
    <li><span class="current" aria-current="page">Flex 布局</span></li>
  </ol>
</nav>`,
  },

  // ── 09-聊天与社交（6）──────────────────────────────────────
  {
    id: 'p3-chat-bubbles',
    title: '聊天气泡左右',
    group: '09-聊天与社交',
    summary: '对方左灰泡、自己右绿泡',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; background: #ededed; }

  .chat { max-width: 360px; display: flex; flex-direction: column; gap: 12px; }
  .msg { display: flex; gap: 8px; max-width: 85%; }
  .msg.me { align-self: flex-end; flex-direction: row-reverse; }
  .avatar {
    width: 36px; height: 36px; border-radius: 6px;
    background: #ccc; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center; font-size: 12px;
  }
  .bubble {
    padding: 10px 12px;
    border-radius: 8px;
    background: #fff;
    position: relative;
    line-height: 1.5;
  }
  /* 自己发的：绿色气泡 */
  .msg.me .bubble { background: #95ec69; }
  .msg.me .avatar { background: #2f6b4f; color: #fff; }
</style>

<div class="chat">
  <div class="msg">
    <div class="avatar">TA</div>
    <div class="bubble">你好，作业写完了吗？</div>
  </div>
  <div class="msg me">
    <div class="avatar">我</div>
    <div class="bubble">写完了，刚提交！</div>
  </div>
  <div class="msg">
    <div class="avatar">TA</div>
    <div class="bubble">太好了，晚上一起复习？</div>
  </div>
</div>`,
  },
  {
    id: 'p3-chat-fullpage',
    title: '聊天完整页',
    group: '09-聊天与社交',
    summary: '顶栏 + 可滚动消息区 + 底部输入框',
    code: `<style>
  * { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; }
  body { font: 14px/1.5 system-ui, sans-serif; display: flex; flex-direction: column; max-height: 360px; border: 1px solid #d9e0d8; border-radius: 10px; overflow: hidden; }

  .header {
    flex-shrink: 0;
    padding: 12px 16px;
    background: #2f6b4f;
    color: #fff;
    font-weight: 600;
  }
  .messages {
    flex: 1;
    overflow-y: auto;       /* 消息区单独滚动 */
    padding: 12px;
    background: #ededed;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .bubble {
    max-width: 75%;
    width: fit-content;     /* 宽度跟文字走，不要被 flex 拉满整行 */
    padding: 8px 12px;
    border-radius: 8px;
    background: #fff;
    align-self: flex-start; /* 列布局默认 stretch，必须显式取消 */
  }
  .bubble.me { align-self: flex-end; background: #95ec69; }
  .footer {
    flex-shrink: 0;
    display: flex;
    gap: 8px;
    padding: 10px;
    background: #f7f7f7;
    border-top: 1px solid #ddd;
  }
  .footer input { flex: 1; padding: 8px 12px; border: 1px solid #ccc; border-radius: 6px; font: inherit; }
  .footer button { padding: 8px 16px; border: none; background: #2f6b4f; color: #fff; border-radius: 6px; cursor: pointer; font: inherit; }
</style>

<header class="header">张三</header>
<div class="messages" id="msgs">
  <div class="bubble">在吗？</div>
  <div class="bubble me">在的，什么事？</div>
</div>
<div class="footer">
  <input id="input" type="text" placeholder="输入消息…" />
  <button id="send" type="button">发送</button>
</div>

<script>
  const msgs = document.getElementById('msgs')
  const input = document.getElementById('input')
  const send = document.getElementById('send')

  function append(text, isMe) {
    const div = document.createElement('div')
    div.className = 'bubble' + (isMe ? ' me' : '')
    div.textContent = text
    msgs.appendChild(div)
    msgs.scrollTop = msgs.scrollHeight // 滚到最底
  }

  send.addEventListener('click', () => {
    const t = input.value.trim()
    if (!t) return
    append(t, true)
    input.value = ''
    // 模拟对方回复
    setTimeout(() => append('收到：' + t, false), 600)
  })

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') send.click()
  })
</script>`,
  },
  {
    id: 'p3-wechat-cells',
    title: '微信风格 Cell 列表',
    group: '09-聊天与社交',
    summary: '分组 cell + 右箭头 + 分割线',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 15px/1.4 system-ui, sans-serif; background: #ededed; }

  .group { margin-top: 12px; }
  .group-title { padding: 6px 16px; font-size: 13px; color: #888; }
  .cells { background: #fff; }
  .cell {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
  }
  .cell:last-child { border-bottom: none; }
  .cell:active { background: #ececec; }
  .cell-icon { width: 28px; margin-right: 12px; text-align: center; }
  .cell-label { flex: 1; }
  .cell-arrow { color: #ccc; font-size: 18px; }
</style>

<div class="group">
  <div class="group-title">常用</div>
  <div class="cells">
    <div class="cell"><span class="cell-icon">💳</span><span class="cell-label">支付</span><span class="cell-arrow">›</span></div>
    <div class="cell"><span class="cell-icon">⭐</span><span class="cell-label">收藏</span><span class="cell-arrow">›</span></div>
    <div class="cell"><span class="cell-icon">📷</span><span class="cell-label">相册</span><span class="cell-arrow">›</span></div>
  </div>
</div>
<div class="group">
  <div class="group-title">设置</div>
  <div class="cells">
    <div class="cell"><span class="cell-icon">⚙️</span><span class="cell-label">通用</span><span class="cell-arrow">›</span></div>
    <div class="cell"><span class="cell-icon">🔒</span><span class="cell-label">隐私</span><span class="cell-arrow">›</span></div>
  </div>
</div>`,
  },
  {
    id: 'p3-feed-card',
    title: '朋友圈 / 动态卡片',
    group: '09-聊天与社交',
    summary: '头像 + 正文 + 九宫格图 + 互动栏',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; background: #f4f7f5; }

  .feed {
    max-width: 400px;
    padding: 14px;
    background: #fff;
    border-radius: 10px;
  }
  .head { display: flex; gap: 10px; margin-bottom: 10px; }
  .avatar { width: 40px; height: 40px; border-radius: 6px; background: #2f6b4f; color: #fff; display: flex; align-items: center; justify-content: center; }
  .name { font-weight: 600; color: #576b95; }
  .text { margin: 0 0 10px; line-height: 1.6; }
  .pics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    max-width: 240px;
  }
  .pic { aspect-ratio: 1; background: #d9ebe1; border-radius: 4px; }
  .meta { margin-top: 10px; font-size: 12px; color: #9bb5a6; display: flex; justify-content: space-between; }
  .actions button { border: none; background: none; font: inherit; color: #576b95; cursor: pointer; }
</style>

<article class="feed">
  <div class="head">
    <div class="avatar">李</div>
    <div class="name">李同学</div>
  </div>
  <p class="text">今天把 Flex 作业交啦，九宫格只是占位～</p>
  <div class="pics">
    <div class="pic"></div><div class="pic"></div><div class="pic"></div>
    <div class="pic"></div><div class="pic"></div><div class="pic"></div>
  </div>
  <div class="meta">
    <span>2 小时前</span>
    <div class="actions"><button type="button">♥ 赞</button> · <button type="button">评论</button></div>
  </div>
</article>`,
  },
  {
    id: 'p3-profile-header',
    title: '个人主页头图',
    group: '09-聊天与社交',
    summary: '封面图 + 头像叠在底部',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .profile { max-width: 400px; }
  .cover {
    height: 140px;
    background: linear-gradient(135deg, #6fcf97, #2f6b4f);
    border-radius: 12px 12px 0 0;
  }
  .body {
    position: relative;
    padding: 0 16px 16px;
    background: #fff;
    border: 1px solid #d9e0d8;
    border-top: none;
    border-radius: 0 0 12px 12px;
  }
  /* 头像负 margin 向上叠到封面 */
  .avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    border: 3px solid #fff;
    background: #eef6f1;
    margin-top: -36px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 700;
    color: #2f6b4f;
  }
  .name { margin: 8px 0 4px; font-size: 18px; font-weight: 700; }
  .bio { margin: 0; color: #5c6b62; font-size: 13px; }
  .stats { display: flex; gap: 20px; margin-top: 12px; font-size: 13px; }
  .stats strong { display: block; font-size: 16px; }
</style>

<div class="profile">
  <div class="cover"></div>
  <div class="body">
    <div class="avatar">张</div>
    <h2 class="name">张三</h2>
    <p class="bio">前端学习者 · 爱写 Demo</p>
    <div class="stats">
      <div><strong>128</strong>关注</div>
      <div><strong>56</strong>粉丝</div>
      <div><strong>12</strong>动态</div>
    </div>
  </div>
</div>`,
  },
  {
    id: 'p3-like-bar',
    title: '点赞互动栏',
    group: '09-聊天与社交',
    summary: '底部固定栏：赞 / 评 / 转 / 藏',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; min-height: 200px; position: relative; padding-bottom: 56px; }

  .content { padding: 16px; }
  .bar {
    position: fixed;
    left: 0; right: 0; bottom: 0;
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    background: #fff;
    border-top: 1px solid #eee;
    box-shadow: 0 -2px 8px rgba(0,0,0,.04);
  }
  .bar button {
    border: none;
    background: none;
    font: inherit;
    cursor: pointer;
    color: #5c6b62;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    font-size: 12px;
  }
  .bar button.liked { color: #c53030; }
  .bar button .icon { font-size: 20px; }
</style>

<div class="content">
  <h3>文章标题</h3>
  <p>正文内容… 底部互动栏固定在视口底部。</p>
</div>

<div class="bar">
  <button id="like" type="button"><span class="icon">♡</span><span id="likeN">赞 0</span></button>
  <button type="button"><span class="icon">💬</span>评论</button>
  <button type="button"><span class="icon">↗</span>分享</button>
  <button type="button"><span class="icon">★</span>收藏</button>
</div>

<script>
  const likeBtn = document.getElementById('like')
  const likeN = document.getElementById('likeN')
  let n = 0
  let liked = false

  likeBtn.addEventListener('click', () => {
    liked = !liked
    n += liked ? 1 : -1
    likeBtn.classList.toggle('liked', liked)
    likeBtn.querySelector('.icon').textContent = liked ? '♥' : '♡'
    likeN.textContent = '赞 ' + n
  })
</script>`,
  },

  // ── 10-表单布局（5）──────────────────────────────────────────
  {
    id: 'p3-form-label-top',
    title: '标签在上表单',
    group: '10-表单布局',
    summary: 'label 在上、input 在下，移动端常见',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .form { max-width: 320px; display: flex; flex-direction: column; gap: 16px; }
  .field label {
    display: block;
    margin-bottom: 6px;
    font-weight: 600;
    font-size: 13px;
  }
  .field input, .field textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d9e0d8;
    border-radius: 8px;
    font: inherit;
  }
  .field input:focus, .field textarea:focus {
    outline: none;
    border-color: #2f6b4f;
    box-shadow: 0 0 0 2px rgba(47,107,79,.15);
  }
  button[type="submit"] {
    padding: 10px;
    border: none;
    border-radius: 8px;
    background: #2f6b4f;
    color: #fff;
    font: inherit;
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
    <label for="msg">留言</label>
    <textarea id="msg" rows="3" placeholder="想说点什么…"></textarea>
  </div>
  <button type="submit">提交</button>
</form>`,
  },
  {
    id: 'p3-form-label-left',
    title: '标签在左（Grid）',
    group: '10-表单布局',
    summary: 'grid 两列：左 label 右 input',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .form {
    max-width: 420px;
    display: grid;
    grid-template-columns: 80px 1fr; /* 左列固定宽，右列自适应 */
    gap: 12px 16px;
    align-items: center;
  }
  .form label { text-align: right; color: #5c6b62; font-size: 13px; }
  .form input, .form select {
    padding: 8px 10px;
    border: 1px solid #d9e0d8;
    border-radius: 6px;
    font: inherit;
  }
  .span2 { grid-column: 1 / -1; } /* 横跨两列 */
  .actions { grid-column: 2; }
  button { padding: 8px 20px; border: none; background: #2f6b4f; color: #fff; border-radius: 6px; font: inherit; cursor: pointer; }
</style>

<form class="form">
  <label for="u">用户名</label>
  <input id="u" type="text" />
  <label for="p">密码</label>
  <input id="p" type="password" />
  <label for="role">角色</label>
  <select id="role"><option>学生</option><option>教师</option></select>
  <div class="actions"><button type="submit">保存</button></div>
</form>`,
  },
  {
    id: 'p3-inline-search',
    title: '行内搜索栏',
    group: '10-表单布局',
    summary: '圆角搜索框 + 图标 + 清除',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .search {
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: 360px;
    padding: 8px 12px;
    background: #eef2ee;
    border-radius: 999px;
  }
  .search input {
    flex: 1;
    border: none;
    background: transparent;
    font: inherit;
    outline: none;
  }
  .search button {
    border: none;
    background: none;
    cursor: pointer;
    font: inherit;
    color: #5c6b62;
  }
</style>

<form class="search" id="form">
  <span aria-hidden="true">🔍</span>
  <input id="q" type="search" placeholder="搜索课程、文章…" />
  <button id="clear" type="button" hidden>✕</button>
</form>

<script>
  const q = document.getElementById('q')
  const clear = document.getElementById('clear')

  q.addEventListener('input', () => {
    clear.hidden = q.value.length === 0
  })

  clear.addEventListener('click', () => {
    q.value = ''
    clear.hidden = true
    q.focus()
  })
</script>`,
  },
  {
    id: 'p3-login-card',
    title: '居中登录卡片',
    group: '10-表单布局',
    summary: 'flex 居中 + 白卡片 + 表单',
    code: `<style>
  * { box-sizing: border-box; }
  html, body { height: 100%; margin: 0; }
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f4f7f5;
    font: 14px/1.5 system-ui, sans-serif;
  }
  .card {
    width: 100%;
    max-width: 340px;
    padding: 28px 24px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(31,42,36,.1);
  }
  .card h2 { margin: 0 0 20px; text-align: center; }
  .field { margin-bottom: 14px; }
  .field input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d9e0d8;
    border-radius: 8px;
    font: inherit;
  }
  .submit {
    width: 100%;
    margin-top: 8px;
    padding: 10px;
    border: none;
    border-radius: 8px;
    background: #2f6b4f;
    color: #fff;
    font: inherit;
    cursor: pointer;
  }
  button.link {
    border: 0; background: transparent; font: inherit; cursor: pointer; padding: 0;
  }
  .link { display: block; margin-top: 12px; text-align: center; font-size: 13px; color: #2f6b4f; }
</style>

<div class="card">
  <h2>登录</h2>
  <form>
    <div class="field"><input type="text" placeholder="手机号 / 邮箱" /></div>
    <div class="field"><input type="password" placeholder="密码" /></div>
    <button class="submit" type="submit">登 录</button>
    <button type="button" class="link">忘记密码？</button>
  </form>
</div>`,
  },
  {
    id: 'p3-form-error',
    title: '表单错误提示',
    group: '10-表单布局',
    summary: '校验失败显示红色 tip + 红框',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .form { max-width: 320px; }
  .field { margin-bottom: 14px; }
  .field label { display: block; margin-bottom: 6px; font-weight: 600; font-size: 13px; }
  .field input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d9e0d8;
    border-radius: 8px;
    font: inherit;
  }
  .field.error input { border-color: #c53030; }
  .tip { margin-top: 4px; font-size: 12px; color: #c53030; display: none; }
  .field.error .tip { display: block; }
  button { padding: 10px 20px; border: none; background: #2f6b4f; color: #fff; border-radius: 8px; font: inherit; cursor: pointer; }
</style>

<form class="form" id="form">
  <div class="field" id="emailField">
    <label for="email">邮箱</label>
    <input id="email" type="email" placeholder="you@example.com" />
    <p class="tip">请输入有效的邮箱地址</p>
  </div>
  <button type="submit">提交</button>
</form>

<script>
  const form = document.getElementById('form')
  const emailField = document.getElementById('emailField')
  const email = document.getElementById('email')

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const ok = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value.trim())
    emailField.classList.toggle('error', !ok)
    if (ok) alert('提交成功！')
  })

  email.addEventListener('input', () => {
    emailField.classList.remove('error')
  })
</script>`,
  },

  // ── 11-轮播拖拽交互（9）────────────────────────────────────
  {
    id: 'p3-carousel-snap',
    title: 'CSS scroll-snap 轮播',
    group: '11-轮播拖拽交互',
    summary: '横向滚动 + snap 吸附，无 JS',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .carousel {
    display: flex;
    gap: 12px;
    overflow-x: auto;              /* 横向滚动 */
    scroll-snap-type: x mandatory; /* 滚动结束后吸附到 snap 点 */
    padding: 8px 4px 16px;
    max-width: 100%;
  }
  .carousel::-webkit-scrollbar { height: 6px; }
  .carousel::-webkit-scrollbar-thumb { background: #9bb5a6; border-radius: 3px; }
  .slide {
    flex: 0 0 240px;               /* 不伸缩，固定宽 */
    scroll-snap-align: start;      /* 吸附对齐点 */
    height: 140px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
  }
  .slide:nth-child(1) { background: #2f6b4f; }
  .slide:nth-child(2) { background: #6fcf97; }
  .slide:nth-child(3) { background: #3d7a5c; }
  .slide:nth-child(4) { background: #1a4d38; }
  .hint { font-size: 12px; color: #5c6b62; }
</style>

<p class="hint">手指或鼠标拖动横向滚动，松手会自动吸附到整张 slide</p>
<div class="carousel">
  <div class="slide">Slide 1</div>
  <div class="slide">Slide 2</div>
  <div class="slide">Slide 3</div>
  <div class="slide">Slide 4</div>
</div>`,
  },
  {
    id: 'p3-carousel-js',
    title: 'JS 轮播 + 圆点',
    group: '11-轮播拖拽交互',
    summary: 'prev/next 按钮切换，底部指示点',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .wrap { max-width: 320px; }
  .viewport { overflow: hidden; border-radius: 12px; }
  .track {
    display: flex;
    transition: transform .3s ease;
  }
  .slide {
    flex: 0 0 100%;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 22px;
    font-weight: 700;
  }
  .slide:nth-child(1) { background: #2f6b4f; }
  .slide:nth-child(2) { background: #6fcf97; color: #1f2a24; }
  .slide:nth-child(3) { background: #3d7a5c; }
  .ctrl { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 12px; }
  .ctrl button { padding: 6px 14px; border: 1px solid #d9e0d8; background: #fff; border-radius: 6px; cursor: pointer; font: inherit; }
  .dots { display: flex; gap: 6px; }
  .dot { width: 8px; height: 8px; border-radius: 50%; background: #d9e0d8; border: none; padding: 0; cursor: pointer; }
  .dot.active { background: #2f6b4f; }
</style>

<div class="wrap">
  <div class="viewport">
    <div class="track" id="track">
      <div class="slide">1 / 3</div>
      <div class="slide">2 / 3</div>
      <div class="slide">3 / 3</div>
    </div>
  </div>
  <div class="ctrl">
    <button id="prev" type="button">‹</button>
    <div class="dots" id="dots"></div>
    <button id="next" type="button">›</button>
  </div>
</div>

<script>
  const track = document.getElementById('track')
  const dotsEl = document.getElementById('dots')
  const total = track.children.length
  let index = 0

  // 生成圆点
  for (let i = 0; i < total; i++) {
    const d = document.createElement('button')
    d.className = 'dot' + (i === 0 ? ' active' : '')
    d.type = 'button'
    d.addEventListener('click', () => go(i))
    dotsEl.appendChild(d)
  }

  const dots = dotsEl.querySelectorAll('.dot')

  function go(i) {
    index = (i + total) % total // 循环：-1 变最后一张
    track.style.transform = 'translateX(-' + (index * 100) + '%)'
    dots.forEach((d, j) => d.classList.toggle('active', j === index))
  }

  document.getElementById('prev').addEventListener('click', () => go(index - 1))
  document.getElementById('next').addEventListener('click', () => go(index + 1))
</script>`,
  },
  {
    id: 'p3-drag-scroll',
    title: '拖拽横向滚动',
    group: '11-轮播拖拽交互',
    summary: 'mousedown 拖动改变 scrollLeft',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .scroller {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding: 12px 4px;
    cursor: grab;
    user-select: none; /* 拖拽时不选中文字 */
    max-width: 100%;
  }
  .scroller.dragging { cursor: grabbing; }
  .scroller::-webkit-scrollbar { display: none; }
  .item {
    flex: 0 0 100px;
    height: 100px;
    background: #eef6f1;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: #2f6b4f;
  }
  .hint { font-size: 12px; color: #5c6b62; margin-bottom: 8px; }
</style>

<p class="hint">按住鼠标左键左右拖动列表</p>
<div class="scroller" id="scroller">
  <div class="item">A</div><div class="item">B</div><div class="item">C</div>
  <div class="item">D</div><div class="item">E</div><div class="item">F</div>
  <div class="item">G</div><div class="item">H</div>
</div>

<script>
  const el = document.getElementById('scroller')
  let isDown = false
  let startX = 0
  let scrollStart = 0

  el.addEventListener('mousedown', (e) => {
    isDown = true
    el.classList.add('dragging')
    startX = e.pageX
    scrollStart = el.scrollLeft
  })

  window.addEventListener('mouseup', () => {
    isDown = false
    el.classList.remove('dragging')
  })

  el.addEventListener('mousemove', (e) => {
    if (!isDown) return
    e.preventDefault()
    const dx = e.pageX - startX
    el.scrollLeft = scrollStart - dx // 反向移动 scroll
  })
</script>`,
  },
  {
    id: 'p3-range-slider',
    title: '自定义 Range 滑块',
    group: '11-轮播拖拽交互',
    summary: 'input[type=range] + 实时数值显示',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .slider-box { max-width: 320px; }
  .row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
  .value { font-size: 18px; font-weight: 700; color: #2f6b4f; }
  input[type="range"] {
    width: 100%;
    accent-color: #2f6b4f; /* 现代浏览器：滑块主题色 */
  }
  .preview {
    margin-top: 16px;
    height: 8px;
    background: #eef2ee;
    border-radius: 4px;
    overflow: hidden;
  }
  .fill {
    height: 100%;
    background: #2f6b4f;
    width: 50%;
    transition: width .1s;
  }
</style>

<div class="slider-box">
  <div class="row">
    <span>音量</span>
    <span class="value" id="val">50</span>
  </div>
  <input id="range" type="range" min="0" max="100" value="50" />
  <div class="preview"><div class="fill" id="fill"></div></div>
</div>

<script>
  const range = document.getElementById('range')
  const val = document.getElementById('val')
  const fill = document.getElementById('fill')

  function update() {
    const v = range.value
    val.textContent = v
    fill.style.width = v + '%'
  }

  range.addEventListener('input', update)
  update()
</script>`,
  },
  {
    id: 'p3-accordion',
    title: '手风琴 Accordion',
    group: '11-轮播拖拽交互',
    summary: 'details/summary 原生折叠，零 JS',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; }

  .acc { max-width: 360px; border: 1px solid #d9e0d8; border-radius: 10px; overflow: hidden; }
  details { border-bottom: 1px solid #eef2ee; }
  details:last-child { border-bottom: none; }
  summary {
    padding: 12px 16px;
    cursor: pointer;
    font-weight: 600;
    list-style: none; /* 去掉默认三角（部分浏览器） */
  }
  summary::-webkit-details-marker { display: none; }
  summary::after {
    content: '+';
    float: right;
    color: #9bb5a6;
  }
  details[open] summary::after { content: '−'; }
  .body { padding: 0 16px 12px; color: #5c6b62; font-size: 13px; }
</style>

<div class="acc">
  <details open>
    <summary>什么是 Flex？</summary>
    <div class="body">Flex 是一维布局：主轴 + 交叉轴，适合导航栏、居中、等分。</div>
  </details>
  <details>
    <summary>什么是 Grid？</summary>
    <div class="body">Grid 是二维布局：同时控制行和列，适合卡片网格、整页骨架。</div>
  </details>
  <details>
    <summary>何时用哪个？</summary>
    <div class="body">一行排布用 Flex；整张表格/网格用 Grid。也可嵌套使用。</div>
  </details>
</div>`,
  },
  {
    id: 'p3-modal',
    title: 'Modal 弹窗（JS）',
    group: '11-轮播拖拽交互',
    summary: '遮罩层 + 居中对话框，点击关闭',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .open-btn { padding: 8px 16px; border: none; background: #2f6b4f; color: #fff; border-radius: 8px; font: inherit; cursor: pointer; }
  .overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.45);
    align-items: center;
    justify-content: center;
    z-index: 100;
  }
  .overlay.show { display: flex; }
  .dialog {
    width: min(320px, 90vw);
    padding: 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 16px 48px rgba(0,0,0,.2);
  }
  .dialog h3 { margin: 0 0 8px; }
  .dialog p { margin: 0 0 16px; color: #5c6b62; font-size: 13px; }
  .dialog button { padding: 8px 16px; border: none; background: #2f6b4f; color: #fff; border-radius: 6px; font: inherit; cursor: pointer; }
</style>

<button class="open-btn" id="open" type="button">打开弹窗</button>

<div class="overlay" id="overlay">
  <div class="dialog" role="dialog">
    <h3>确认操作</h3>
    <p>确定要删除这条记录吗？此操作不可撤销。</p>
    <button id="close" type="button">我知道了</button>
  </div>
</div>

<script>
  const overlay = document.getElementById('overlay')

  document.getElementById('open').addEventListener('click', () => {
    overlay.classList.add('show')
  })

  document.getElementById('close').addEventListener('click', () => {
    overlay.classList.remove('show')
  })

  // 点击遮罩（非对话框区域）也关闭
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('show')
  })
</script>`,
  },
  {
    id: 'p3-toast',
    title: 'Toast 轻提示',
    group: '11-轮播拖拽交互',
    summary: 'fixed 底部浮现，几秒后自动消失',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  button { padding: 8px 16px; border: none; background: #2f6b4f; color: #fff; border-radius: 8px; font: inherit; cursor: pointer; }
  .toast {
    position: fixed;
    left: 50%;
    bottom: 32px;
    transform: translateX(-50%) translateY(80px);
    padding: 10px 20px;
    background: rgba(31,42,36,.92);
    color: #fff;
    border-radius: 999px;
    font-size: 14px;
    opacity: 0;
    transition: transform .3s, opacity .3s;
    pointer-events: none;
    z-index: 200;
  }
  .toast.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
</style>

<button id="btn" type="button">显示 Toast</button>
<div class="toast" id="toast">操作成功 ✓</div>

<script>
  const btn = document.getElementById('btn')
  const toast = document.getElementById('toast')
  let timer = null

  btn.addEventListener('click', () => {
    toast.classList.add('show')
    clearTimeout(timer)
    // 2 秒后隐藏
    timer = setTimeout(() => toast.classList.remove('show'), 2000)
  })
</script>`,
  },
  {
    id: 'p3-drag-reorder',
    title: '拖拽排序列表',
    group: '11-轮播拖拽交互',
    summary: 'HTML5 drag & drop 简单重排',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .list { list-style: none; margin: 0; padding: 0; max-width: 280px; }
  .list li {
    padding: 12px 14px;
    margin-bottom: 8px;
    background: #fff;
    border: 1px solid #d9e0d8;
    border-radius: 8px;
    cursor: grab;
  }
  .list li.dragging { opacity: .5; border-style: dashed; }
  .hint { font-size: 12px; color: #5c6b62; margin-bottom: 10px; }
</style>

<p class="hint">拖住某项上下移动可改变顺序</p>
<ul class="list" id="list">
  <li draggable="true">任务 A：写 HTML</li>
  <li draggable="true">任务 B：写 CSS</li>
  <li draggable="true">任务 C：写 JS</li>
</ul>

<script>
  const list = document.getElementById('list')
  let dragEl = null

  list.addEventListener('dragstart', (e) => {
    dragEl = e.target
    dragEl.classList.add('dragging')
    e.dataTransfer.effectAllowed = 'move'
  })

  list.addEventListener('dragend', () => {
    dragEl.classList.remove('dragging')
    dragEl = null
  })

  list.addEventListener('dragover', (e) => {
    e.preventDefault() // 必须 preventDefault 才能 drop
    const after = getAfter(list, e.clientY)
    if (after == null) {
      list.appendChild(dragEl)
    } else {
      list.insertBefore(dragEl, after)
    }
  })

  // 根据鼠标 Y 坐标，找到应插入到哪个元素前面
  function getAfter(container, y) {
    const items = [...container.querySelectorAll('li:not(.dragging)')]
    return items.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child }
      }
      return closest
    }, { offset: Number.NEGATIVE_INFINITY }).element
  }
</script>`,
  },
  {
    id: 'p3-lightbox',
    title: '图片 Lightbox 灯箱',
    group: '11-轮播拖拽交互',
    summary: '点击缩略图全屏 overlay 查看',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .thumbs { display: flex; gap: 8px; }
  .thumb {
    width: 80px;
    height: 60px;
    border-radius: 6px;
    cursor: pointer;
    border: 2px solid transparent;
  }
  .thumb:hover { border-color: #2f6b4f; }
  .thumb:nth-child(1) { background: linear-gradient(135deg, #6fcf97, #2f6b4f); }
  .thumb:nth-child(2) { background: linear-gradient(135deg, #ffd93d, #c53030); }
  .thumb:nth-child(3) { background: linear-gradient(135deg, #667eea, #764ba2); }
  .lightbox {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.85);
    align-items: center;
    justify-content: center;
    z-index: 100;
    cursor: zoom-out;
  }
  .lightbox.show { display: flex; }
  .lightbox img, .lightbox .big {
    max-width: 90vw;
    max-height: 80vh;
    border-radius: 8px;
    width: 360px;
    height: 240px;
  }
  .close {
    position: absolute;
    top: 16px;
    right: 20px;
    color: #fff;
    font-size: 28px;
    cursor: pointer;
    border: none;
    background: none;
  }
</style>

<div class="thumbs">
  <div class="thumb" data-bg="linear-gradient(135deg,#6fcf97,#2f6b4f)"></div>
  <div class="thumb" data-bg="linear-gradient(135deg,#ffd93d,#c53030)"></div>
  <div class="thumb" data-bg="linear-gradient(135deg,#667eea,#764ba2)"></div>
</div>

<div class="lightbox" id="box">
  <button class="close" id="close" type="button" aria-label="关闭">×</button>
  <div class="big" id="big"></div>
</div>

<script>
  const box = document.getElementById('box')
  const big = document.getElementById('big')

  document.querySelectorAll('.thumb').forEach((t) => {
    t.addEventListener('click', () => {
      big.style.background = t.dataset.bg
      box.classList.add('show')
    })
  })

  function close() { box.classList.remove('show') }
  document.getElementById('close').addEventListener('click', close)
  box.addEventListener('click', (e) => { if (e.target === box) close() })
</script>`,
  },
]

export default part3AppsJs
