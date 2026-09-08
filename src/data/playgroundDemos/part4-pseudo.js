/**
 * 代码演练台 · 第 4 部分：伪类与伪元素实战
 *
 * 覆盖日常最常用的伪类 / 伪元素套路：
 * 交互四态、链接 LVHA、斑马纹、nth-child 公式、:not / :has / :focus-within、
 * :checked 纯 CSS 开关与 Tab、表单校验伪类、::before / ::after 装饰、
 * content 的 attr() 与 counter()、::first-letter / ::marker / ::selection 等。
 */
const part4PseudoDemos = [
  // ── 12-伪类与伪元素（17）────────────────────────────────────
  {
    id: 'p4-pseudo-btn-states',
    title: '按钮四态：hover / active / focus-visible / disabled',
    group: '12-伪类与伪元素',
    summary: '一个「手感好」的按钮至少要写四个状态',
    code: `<style>
  /* 通用选择器 * 命中所有元素，统一成 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  .row {
    display: flex;        /* 让按钮横向排成一排 */
    gap: 12px;            /* 按钮之间 12px 间距 */
    flex-wrap: wrap;      /* 宽度不够时允许换行，不会溢出 */
    align-items: center;  /* 竖直方向居中对齐 */
  }

  /* ① 默认态：什么都没发生时的样子。
     四个状态里这一条必须先写，后面的伪类都是在它基础上「改一点」 */
  .btn {
    padding: 10px 18px;                 /* 内边距撑出可点击面积，上下 10、左右 18 */
    border: 1px solid #2f6b4f;          /* 1px 实线主题绿描边 */
    border-radius: 8px;                 /* 圆角 8px */
    background: #fff;
    color: #2f6b4f;
    font: inherit;                      /* 继承页面字体，否则按钮会用浏览器默认的小字 */
    cursor: pointer;                    /* 小手光标，暗示这里能点 */
    transition: background 0.15s, transform 0.05s;
    /* transition 让状态切换有 0.15 秒过渡；不写的话颜色会「跳变」，显得很廉价 */
  }

  /* ② :hover 伪类 —— 鼠标悬停在元素上时命中。
     作用：告诉用户「我是可以点的」，是最基础的交互反馈 */
  .btn:hover {
    background: #eef6f1;                /* 浅绿底 */
  }

  /* ③ :active 伪类 —— 鼠标按下、还没松开的那一瞬间命中。
     作用：模拟真实按键被压下去的手感 */
  .btn:active {
    background: #d9ebe1;                /* 底色再深一档 */
    transform: translateY(1px);         /* 整个按钮向下移 1px */
  }

  /* ④ :focus-visible 伪类 —— 只有「键盘」造成的聚焦才命中（按 Tab 键试试）。
     为什么不用 :focus：:focus 在鼠标点击时也会触发，会留下一圈很丑的框；
     :focus-visible 由浏览器判断是不是键盘引起的，既好看又不牺牲无障碍 */
  .btn:focus-visible {
    outline: 3px solid #9bd3b0;         /* 焦点圈 */
    outline-offset: 2px;                /* 焦点圈与按钮边框之间留 2px 缝隙 */
  }

  /* ⑤ :disabled 伪类 —— 元素带 disabled 属性时命中 */
  .btn:disabled {
    opacity: 0.45;                      /* 半透明表示不可用 */
    cursor: not-allowed;                /* 禁止光标 */
    border-color: #9bb5a6;
    color: #5c6b62;
  }
  /* 补充：被 disabled 的按钮不会触发 :hover 效果，
     因为浏览器根本不把鼠标事件派发给它，所以不用额外写「禁用时取消 hover」 */

  /* 实心主按钮：多一个 class 就能换配色，四个状态的规则依然复用 */
  .btn.primary { background: #2f6b4f; color: #fff; }
  /* .btn.primary:hover 是「交集 + 伪类」，两个 class 让它优先级高于上面的 .btn:hover */
  .btn.primary:hover { background: #275a43; }
  .btn.primary:active { background: #1f4a37; }

  .tip { margin: 16px 0 0; font-size: 12px; color: #5c6b62; }
</style>

<div class="row">
  <!-- type="button" 明确这是普通按钮，不会去提交表单 -->
  <button type="button" class="btn">描边按钮</button>
  <button type="button" class="btn primary">主按钮</button>
  <!-- disabled 是布尔属性，写上就生效，:disabled 伪类因此命中 -->
  <button type="button" class="btn" disabled>禁用按钮</button>
</div>

<p class="tip">试三件事：① 鼠标悬停 ② 按住不放 ③ 先点一下空白处，再按 Tab 键——只有第 ③ 种会出现焦点圈。</p>`,
  },
  {
    id: 'p4-pseudo-link-lvha',
    title: '链接四态与 LVHA 顺序',
    group: '12-伪类与伪元素',
    summary: ':link → :visited → :hover → :active，顺序写错就失效',
    code: `<style>
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.8 system-ui, sans-serif; color: #1f2a24; }

  /* ===== 正确顺序：L → V → H → A（口诀 LoVe HAte，爱与恨）=====
     这四个伪类的优先级完全相同（都算一个 class 分），
     既然分数一样，就只能靠「谁写在后面」决胜。
     所以顺序写错，后面的规则会被前面的盖掉，看起来就像样式没生效。 */

  /* :link —— 还没访问过的链接 */
  .ok a:link { color: #2f6b4f; }
  /* :visited —— 已经访问过的链接。
     隐私限制：为了防止网站偷偷探测你的浏览历史，
     :visited 只允许改颜色类属性（color / background-color / border-color），
     改字号、改布局一律无效，用 JS 也读不到它真实的计算样式 */
  .ok a:visited { color: #7a5cc4; }
  /* :hover —— 鼠标悬停。写在 :visited 之后，才能盖住它 */
  .ok a:hover { color: #c53030; text-decoration: underline; }
  /* :active —— 按下的瞬间。写在最后，所以同分时它最终赢 */
  .ok a:active { color: #f0a500; }

  /* ===== 错误顺序示范：把 :hover 写在 :visited 前面 ===== */
  .bad a:link { color: #2f6b4f; }
  .bad a:hover { color: #c53030; }     /* 先写 hover */
  .bad a:visited { color: #7a5cc4; }   /* 后写 visited → 同分靠顺序赢
                                          → 访问过的链接悬停时不再变红 */

  .box {
    padding: 12px 14px;
    margin-bottom: 12px;
    border: 1px solid #d9e0d8;
    border-radius: 10px;
  }
  .box h4 { margin: 0 0 6px; font-size: 13px; }
  .ok h4 { color: #2f6b4f; }
  .bad h4 { color: #c53030; }
  .tip { margin: 0; font-size: 12px; color: #5c6b62; }
</style>

<!-- target="_blank" 让链接在新标签打开，不会把这个预览刷掉；
     rel="noreferrer" 是安全习惯，不把来源信息带给新页面 -->
<div class="box ok">
  <h4>✓ 正确顺序 L-V-H-A</h4>
  <a href="https://developer.mozilla.org" target="_blank" rel="noreferrer">悬停我会变红</a>
</div>

<div class="box bad">
  <h4>✗ 错误顺序（hover 写在 visited 前面）</h4>
  <a href="https://developer.mozilla.org" target="_blank" rel="noreferrer">访问过之后，悬停就不变色了</a>
</div>

<p class="tip">记忆口诀：LoVe（:link、:visited）HAte（:hover、:active）。</p>`,
  },
  {
    id: 'p4-pseudo-zebra-table',
    title: '表格斑马纹 + 整行悬停高亮',
    group: '12-伪类与伪元素',
    summary: 'nth-child(odd) 做隔行变色，tr:hover 做行高亮',
    code: `<style>
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  table {
    width: 100%;
    border-collapse: collapse;   /* 合并相邻单元格的边框，否则会出现双线 */
    font-size: 13px;
    border: 1px solid #d9e0d8;
    border-radius: 10px;
    overflow: hidden;            /* 配合圆角，把超出圆角的底色裁掉 */
  }

  /* th 是表头单元格，td 是数据单元格；用逗号并集选择器一起设置 */
  th, td {
    padding: 10px 12px;
    text-align: left;            /* 默认 th 是居中的，这里统一改成左对齐 */
  }

  thead th {
    background: #2f6b4f;
    color: #fff;
    font-weight: 600;
  }

  /* ① 斑马纹：:nth-child(odd) 命中奇数位的行（第 1、3、5…）。
     tbody tr 是后代选择器，限定只给数据区的行加，不影响表头。
     为什么要斑马纹：行数多时，隔行变色能让眼睛横向扫描不串行 */
  tbody tr:nth-child(odd) {
    background: #f1f7f3;
  }

  /* ② 整行悬停高亮：:hover 写在 tr 上，鼠标进入这一行的任意单元格都会命中。
     注意它写在斑马纹之后，所以同为一个 class 分时靠顺序赢，能盖住奇数行的底色 */
  tbody tr:hover {
    background: #d9ebe1;
  }

  /* ③ :last-child 命中最后一行，去掉它的下边线，
     避免和 table 自身的边框叠成两条 */
  tbody tr:not(:last-child) td {
    border-bottom: 1px solid #eef6f1;
  }
  /* 上面这条读作：「不是最后一行的 tr」里的 td 才画下边线。
     :not() 是否定伪类，比「先全加、再给最后一行去掉」更直接 */

  /* ④ 数字列右对齐更易比较大小；:nth-child(3) 命中每行第 3 个单元格 */
  tbody td:nth-child(3),
  thead th:nth-child(3) {
    text-align: right;
    font-variant-numeric: tabular-nums; /* 等宽数字，让小数点上下对齐 */
  }

  .tip { margin: 12px 0 0; font-size: 12px; color: #5c6b62; }
</style>

<table>
  <!-- thead 表头区，语义上和数据区分开，方便单独设样式 -->
  <thead>
    <tr><th>课程</th><th>讲师</th><th>学员数</th></tr>
  </thead>
  <!-- tbody 数据区，斑马纹和悬停都只作用在这里 -->
  <tbody>
    <tr><td>Flex 布局</td><td>张老师</td><td>1280</td></tr>
    <tr><td>Grid 布局</td><td>李老师</td><td>964</td></tr>
    <tr><td>盒模型</td><td>王老师</td><td>1532</td></tr>
    <tr><td>选择器</td><td>赵老师</td><td>877</td></tr>
    <tr><td>伪类与伪元素</td><td>钱老师</td><td>1105</td></tr>
  </tbody>
</table>

<p class="tip">把鼠标在表格里上下移动，看整行高亮；奇数行本身有浅底色。</p>`,
  },
  {
    id: 'p4-pseudo-nth-formula',
    title: 'nth-child 公式对照（3n / -n+3 / n+5）',
    group: '12-伪类与伪元素',
    summary: 'n 从 0 开始代入，b 定起点、a 定步长',
    code: `<style>
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  /*
   * :nth-child(公式) 的含义是「这个元素在父元素的所有孩子里排第几」。
   * 公式写 an + b 时，浏览器把 n 依次代入 0、1、2、3…，
   * 算出来 ≥1 的整数都会被命中（≤0 的结果直接忽略）。
   * 记忆技巧：b 决定起点，a 决定步长，负号 -n 表示「反着数、只取前面几个」。
   */

  .list {
    list-style: none;   /* 去掉 ul 默认的圆点标记 */
    margin: 0 0 18px;   /* 清掉默认外边距，只保留底部间隔 */
    padding: 0;         /* 清掉 ul 默认的左内边距 */
    border: 1px solid #d9e0d8;
    border-radius: 10px;
    overflow: hidden;   /* 让子项底色被圆角裁切 */
  }
  .list li { padding: 8px 12px; font-size: 13px; }

  /* ① odd（等价于 2n+1）→ 1、3、5、7：最常见的斑马纹 */
  .zebra li:nth-child(odd) { background: #f1f7f3; }

  /* ② 3n → n 取 0,1,2 得 0,3,6 → 命中第 3、6 个。
     用途：每 3 项画一条分组线，比如三列网格的行尾 */
  .every3 li:nth-child(3n) {
    border-bottom: 2px solid #2f6b4f;
    font-weight: 700;
  }

  /* ③ -n+3 → n 取 0,1,2 得 3,2,1 → 只命中前 3 个。
     n 再往大取结果就 ≤0 被忽略，所以这是「只要前三名」的标准写法 */
  .top3 li:nth-child(-n+3) { background: #2f6b4f; color: #fff; }

  /* ④ n+5 → n 取 0,1,2… 得 5,6,7… → 第 5 个及以后全中。
     用途：列表「只展示前 4 条」，其余淡化或直接 display:none */
  .after5 li:nth-child(n+5) { opacity: 0.35; }

  /* ⑤ 两个伪类连写（中间没有空格）表示「同时满足」→ 命中第 2~4 个。
     这是取区间的常用技巧：n+2 是「第 2 个及以后」，-n+4 是「前 4 个」，交集就是 2~4 */
  .range li:nth-child(n+2):nth-child(-n+4) {
    background: #fdf3d6;
    font-weight: 600;
  }

  /* ⑥ :nth-last-child 从后往前数；(2) 就是倒数第 2 个 */
  .fromEnd li:nth-last-child(2) { background: #e8e2f7; font-weight: 600; }

  h4 { margin: 0 0 6px; font-size: 13px; color: #2f6b4f; }
</style>

<h4>① odd → 1、3、5、7</h4>
<ul class="list zebra">
  <li>第 1 项</li><li>第 2 项</li><li>第 3 项</li><li>第 4 项</li>
  <li>第 5 项</li><li>第 6 项</li><li>第 7 项</li>
</ul>

<h4>② 3n → 3、6</h4>
<ul class="list every3">
  <li>第 1 项</li><li>第 2 项</li><li>第 3 项</li><li>第 4 项</li>
  <li>第 5 项</li><li>第 6 项</li><li>第 7 项</li>
</ul>

<h4>③ -n+3 → 只有前 3 个</h4>
<ul class="list top3">
  <li>第 1 项</li><li>第 2 项</li><li>第 3 项</li><li>第 4 项</li>
  <li>第 5 项</li><li>第 6 项</li><li>第 7 项</li>
</ul>

<h4>④ n+5 → 第 5 个及以后</h4>
<ul class="list after5">
  <li>第 1 项</li><li>第 2 项</li><li>第 3 项</li><li>第 4 项</li>
  <li>第 5 项</li><li>第 6 项</li><li>第 7 项</li>
</ul>

<h4>⑤ n+2 与 -n+4 连写 → 第 2~4 个</h4>
<ul class="list range">
  <li>第 1 项</li><li>第 2 项</li><li>第 3 项</li><li>第 4 项</li>
  <li>第 5 项</li><li>第 6 项</li><li>第 7 项</li>
</ul>

<h4>⑥ nth-last-child(2) → 倒数第 2 个</h4>
<ul class="list fromEnd">
  <li>第 1 项</li><li>第 2 项</li><li>第 3 项</li><li>第 4 项</li>
  <li>第 5 项</li><li>第 6 项</li><li>第 7 项</li>
</ul>`,
  },
  {
    id: 'p4-pseudo-first-last',
    title: ':first-child / :last-child 修首尾',
    group: '12-伪类与伪元素',
    summary: '首项去上边距、末项去分割线，圆角只给首尾',
    code: `<style>
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  .card {
    max-width: 340px;
    margin-bottom: 18px;
    border: 1px solid #d9e0d8;
    background: #fff;
  }

  .cell {
    padding: 12px 14px;
    border-bottom: 1px solid #eef6f1;   /* 每一项都先画一条下分割线 */
    font-size: 13px;
  }

  /* ① :last-child —— 是父元素最后一个孩子时命中。
     用途：把末项那条「悬空」的分割线去掉。
     这是全前端最常用的伪类之一，几乎每个列表都要写 */
  .fixed .cell:last-child { border-bottom: none; }

  /* ② :first-child —— 是父元素第一个孩子时命中。
     这里让首项的上方圆角贴合卡片，末项的下方圆角同理 */
  .fixed .cell:first-child { border-radius: 9px 9px 0 0; }
  /* border-radius 四个值按「左上 右上 右下 左下」顺时针 */
  .fixed .cell:last-child { border-radius: 0 0 9px 9px; }

  /* ③ :only-child —— 它是父元素唯一的孩子时才命中。
     用途：列表只有一条时，四个角都要圆，且不需要任何分割线 */
  .fixed .cell:only-child { border-radius: 9px; border-bottom: none; }

  .fixed { border-radius: 10px; }

  /* ④ 段落首尾外边距：文章里常用，避免容器顶部/底部多出一截空白。
     :first-child 去掉上外边距，:last-child 去掉下外边距 */
  .article { max-width: 340px; padding: 14px; border: 1px solid #d9e0d8; border-radius: 10px; }
  .article p { margin: 0 0 10px; }
  .article p:last-child { margin-bottom: 0; }
  .article h4:first-child { margin-top: 0; }

  h4 { margin: 0 0 8px; font-size: 13px; color: #2f6b4f; }
  .label { font-size: 12px; color: #5c6b62; margin: 0 0 6px; }
</style>

<p class="label">✗ 没写 :last-child：最后一条下面多一条悬空的线</p>
<div class="card">
  <div class="cell">支付</div>
  <div class="cell">收藏</div>
  <div class="cell">相册</div>
</div>

<p class="label">✓ 写了 :first-child / :last-child：首尾圆角贴合、末项无多余线</p>
<div class="card fixed">
  <div class="cell">支付</div>
  <div class="cell">收藏</div>
  <div class="cell">相册</div>
</div>

<p class="label">✓ 只有一条时 :only-child 生效：四角全圆</p>
<div class="card fixed">
  <div class="cell">仅一条数据</div>
</div>

<div class="article">
  <!-- h4 是这个容器的第一个孩子，:first-child 帮它去掉了上外边距 -->
  <h4>段落首尾间距</h4>
  <p>第一段正文。</p>
  <!-- 最后一个 p 的下外边距被 :last-child 清零，容器底部不会多留一截空白 -->
  <p>最后一段正文，下面没有多余空隙。</p>
</div>`,
  },
  {
    id: 'p4-pseudo-not-usage',
    title: ':not() 排除法四种用法',
    group: '12-伪类与伪元素',
    summary: '排除末项、排除某类、排除禁用、多条件连写',
    code: `<style>
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  /*
   * :not(选择器) 是否定伪类，意思是「不匹配括号里那个的才要」。
   * 优先级细节：:not() 自己不加分，它取括号里分数最高的参数当分数。
   * 所以 :not(.foo) 相当于一个 class 分，:not(div) 相当于一个标签分。
   */

  h4 { margin: 0 0 8px; font-size: 13px; color: #2f6b4f; }
  .block { margin-bottom: 20px; }

  /* ① 最经典：给列表加分割线，但排除最后一项 */
  .cells { max-width: 320px; border: 1px solid #d9e0d8; border-radius: 10px; overflow: hidden; }
  .cell { padding: 10px 14px; font-size: 13px; }
  .cell:not(:last-child) { border-bottom: 1px solid #eef6f1; }

  /* ② 排除某个 class：所有标签都加浅底，但「主标签」保持高亮不被覆盖 */
  .tags { display: flex; gap: 8px; flex-wrap: wrap; }
  .tag {
    padding: 4px 12px;
    border-radius: 999px;        /* 大圆角 = 胶囊形 */
    font-size: 12px;
    border: 1px solid #d9e0d8;
  }
  .tag:not(.primary) { background: #f7faf8; color: #5c6b62; }
  .tag.primary { background: #2f6b4f; color: #fff; border-color: #2f6b4f; }

  /* ③ 排除禁用项：只给「能点的」按钮加悬停效果，
     避免鼠标停在灰掉的按钮上还变色，产生误导 */
  .btns { display: flex; gap: 10px; }
  .btn {
    padding: 8px 16px;
    border: 1px solid #2f6b4f;
    border-radius: 8px;
    background: #fff;
    color: #2f6b4f;
    font: inherit;
    font-size: 13px;
    cursor: pointer;
  }
  .btn:not(:disabled):hover { background: #eef6f1; }
  /* 上面读作：「不是 disabled 的按钮」在悬停时才变色 */
  .btn:disabled { opacity: 0.45; cursor: not-allowed; border-color: #9bb5a6; color: #5c6b62; }

  /* ④ 多个 :not 连写 = 同时排除多个条件。
     这里给输入框统一加边框，但排除复选框和单选框（它们不需要方框样式） */
  .form { display: flex; flex-direction: column; gap: 10px; max-width: 320px; }
  .form input:not([type="checkbox"]):not([type="radio"]) {
    padding: 8px 10px;
    border: 1px solid #cbd5ce;
    border-radius: 8px;
    font: inherit;
  }
  .form label { display: flex; align-items: center; gap: 8px; font-size: 13px; }
</style>

<div class="block">
  <h4>① :not(:last-child) —— 分割线排除末项</h4>
  <div class="cells">
    <div class="cell">支付</div>
    <div class="cell">收藏</div>
    <div class="cell">相册（末项无线）</div>
  </div>
</div>

<div class="block">
  <h4>② :not(.primary) —— 排除主标签</h4>
  <div class="tags">
    <span class="tag primary">推荐</span>
    <span class="tag">CSS</span>
    <span class="tag">Flex</span>
    <span class="tag">Grid</span>
  </div>
</div>

<div class="block">
  <h4>③ :not(:disabled):hover —— 只让可用按钮有悬停反馈</h4>
  <div class="btns">
    <button type="button" class="btn">可用（悬停变色）</button>
    <button type="button" class="btn" disabled>禁用（悬停无反应）</button>
  </div>
</div>

<div class="block">
  <h4>④ 多个 :not 连写 —— 排除勾选框类型</h4>
  <div class="form">
    <input type="text" placeholder="文本框：有边框" />
    <input type="email" placeholder="邮箱框：有边框" />
    <!-- 复选框被 :not([type="checkbox"]) 排除，不会被套上方框样式 -->
    <label><input type="checkbox" /> 记住我（复选框不加边框）</label>
  </div>
</div>`,
  },
  {
    id: 'p4-pseudo-child-vs-type',
    title: 'nth-child 与 nth-of-type 的区别',
    group: '12-伪类与伪元素',
    summary: '一个数「所有孩子」，一个只数「同类标签」',
    code: `<style>
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  /*
   * 这是最高频的踩坑点，两句话记住：
   * p:nth-child(2)   读作「父元素的第 2 个孩子，而且它得恰好是 p」
   * p:nth-of-type(2) 读作「父元素里所有 p 中的第 2 个」（数数时跳过别的标签）
   *
   * 所以当容器里标签混杂（比如先有个 h3 再是一堆 p）时，两者结果完全不同。
   */

  .box {
    padding: 12px 14px;
    margin-bottom: 14px;
    border: 1px solid #d9e0d8;
    border-radius: 10px;
    max-width: 420px;
  }
  .box h3 { margin: 0 0 8px; font-size: 13px; color: #5c6b62; }
  .box p {
    margin: 0 0 6px;
    padding: 6px 8px;
    border-radius: 6px;
    background: #f7faf8;   /* 默认浅底，被命中的会变成绿底白字 */
    font-size: 13px;
  }
  .label { font-size: 12px; color: #5c6b62; margin: 0; }

  /* A 组：第 1 个孩子是 h3、第 2 个才是 p，所以命中「段落 A」 */
  .a p:nth-child(2) { background: #2f6b4f; color: #fff; }

  /* B 组：数数时跳过 h3，只在 p 之间排序，所以命中「段落 B」 */
  .b p:nth-of-type(2) { background: #2f6b4f; color: #fff; }

  /* C 组：第 1 个孩子是 h3 而不是 p，条件不成立 → 一个元素都选不中。
     这正是新手最常问的「为什么我的样式没生效」 */
  .c p:nth-child(1) { background: #c53030; color: #fff; }

  /* D 组：想要「第一个 p」，正确写法是 :first-of-type（或 nth-of-type(1)） */
  .d p:first-of-type { background: #2f6b4f; color: #fff; }
</style>

<div class="box a">
  <h3>A 组：p:nth-child(2)</h3>
  <p>段落 A（它是父元素的第 2 个孩子 → 被命中）</p>
  <p>段落 B（第 3 个孩子）</p>
  <p class="label">数数时把 h3 也算进去了。</p>
</div>

<div class="box b">
  <h3>B 组：p:nth-of-type(2)</h3>
  <p>段落 A（p 里的第 1 个）</p>
  <p>段落 B（p 里的第 2 个 → 被命中）</p>
  <p class="label">数数时只数 p，跳过了 h3。</p>
</div>

<div class="box c">
  <h3>C 组：p:nth-child(1)</h3>
  <p>段落 A</p>
  <p>段落 B</p>
  <p class="label">一个都没命中：因为第 1 个孩子是 h3，不是 p。</p>
</div>

<div class="box d">
  <h3>D 组：p:first-of-type（想要「第一个 p」的正确写法）</h3>
  <p>段落 A（被命中）</p>
  <p>段落 B</p>
  <p class="label">同理还有 :last-of-type、:only-of-type。</p>
</div>`,
  },
  {
    id: 'p4-pseudo-checked-switch',
    title: ':checked 纯 CSS 开关',
    group: '12-伪类与伪元素',
    summary: '藏起真 checkbox，用兄弟选择器画开关，零 JS',
    code: `<style>
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  /*
   * 思路（纯 CSS 开关的标准套路）：
   * ① 真正的 <input type="checkbox"> 藏起来，但保留它的可勾选 / 可聚焦能力
   * ② 紧跟它后面放一个 span 当「轨道」，用 ::before 伪元素当滑动的圆点
   * ③ 用 input:checked + .track 这种相邻兄弟选择器，把勾选状态传递给轨道
   * ④ 整体包在 <label> 里，点文字也能切换（label 会把点击转发给关联控件）
   */

  .switch {
    display: inline-flex;    /* 让开关和文字同一行并可用 align-items */
    align-items: center;
    gap: 10px;
    cursor: pointer;
    margin-bottom: 14px;
  }

  /* ① 藏起真正的勾选框。
     注意不要用 display:none 或 visibility:hidden ——那样它就无法聚焦、
     键盘用户和读屏软件都会失效。用绝对定位 + 透明是通行做法 */
  .switch input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* ② 轨道：我们自己画出来的胶囊 */
  .track {
    position: relative;          /* 给里面的圆点当定位参照物 */
    display: inline-block;
    width: 46px;
    height: 26px;
    background: #cbd5ce;         /* 关闭时的灰色 */
    border-radius: 999px;        /* 超大圆角 = 胶囊形 */
    transition: background 0.18s;
    flex-shrink: 0;              /* 文字很长时也不许压缩轨道 */
  }

  /* 圆点用 ::before 伪元素造出来，HTML 里并不存在这个节点。
     伪元素必须写 content，哪怕是空字符串，否则不会被创建 */
  .track::before {
    content: '';
    position: absolute;          /* 绝对定位会自动块化，可以直接设宽高 */
    top: 3px;
    left: 3px;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;          /* 正圆 */
    transition: left 0.18s;      /* 让圆点滑动而不是瞬间跳过去 */
    box-shadow: 0 1px 3px rgba(31, 42, 36, 0.25);
  }

  /* ③ 关键两行：input:checked + .track
     :checked 是伪类（勾选时命中），+ 是相邻兄弟选择器（紧跟其后的元素），
     合起来 = 「当勾选框被选中时，紧跟它后面的那个 .track」 */
  .switch input:checked + .track { background: #2f6b4f; }
  .switch input:checked + .track::before { left: 23px; }  /* 圆点滑到右边 */

  /* ④ 键盘无障碍：焦点圈也通过兄弟选择器传给轨道 */
  .switch input:focus-visible + .track {
    outline: 3px solid #9bd3b0;
    outline-offset: 2px;
  }

  /* ⑤ 禁用态：整行变淡，光标改成禁止 */
  .switch input:disabled + .track { opacity: 0.45; }
  .switch:has(input:disabled) { cursor: not-allowed; color: #9bb5a6; }
  /* :has() 是「父选择器」：内部含有被禁用 input 的 label 才命中 */

  .rows { display: flex; flex-direction: column; align-items: flex-start; }
  .tip { margin: 8px 0 0; font-size: 12px; color: #5c6b62; }
</style>

<div class="rows">
  <!-- label 包住 input：点文字、点轨道都能切换，不需要写 for 属性 -->
  <label class="switch">
    <input type="checkbox" />
    <span class="track"></span>
    <span>深色模式</span>
  </label>

  <!-- checked 是布尔属性，写上就默认打开 -->
  <label class="switch">
    <input type="checkbox" checked />
    <span class="track"></span>
    <span>消息通知（默认开）</span>
  </label>

  <label class="switch">
    <input type="checkbox" disabled />
    <span class="track"></span>
    <span>实验功能（暂不可用）</span>
  </label>
</div>

<p class="tip">全程没有一行 JavaScript：状态存在 checkbox 自己身上，样式由 :checked 派生。</p>`,
  },
  {
    id: 'p4-pseudo-checked-tabs',
    title: ':checked 纯 CSS Tab 切换',
    group: '12-伪类与伪元素',
    summary: 'radio + 通用兄弟选择器 ~，零 JS 切换面板',
    code: `<style>
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  /*
   * 纯 CSS Tab 的原理：
   * ① 用一组同名 radio（name 相同 → 只能选中一个）表示「当前是第几个 Tab」
   * ② radio 全部藏在最前面，和标签栏、面板区是「兄弟关系」
   * ③ 用 #id:checked ~ 选择器把状态传给后面的兄弟
   *    ~ 是通用兄弟选择器：选中它后面所有同级元素（不要求紧挨着）
   * ④ 面板默认 display:none，只有被选中的那个显示
   *
   * 为什么用 radio 而不是 checkbox：radio 天然「同组只能选一个」，
   * 正好对应 Tab「同时只有一个激活」的语义。
   */

  .tabs { max-width: 420px; }

  /* ① 藏起 radio，但保留可聚焦能力（键盘可用左右方向键切换） */
  .tabs > input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* ② 标签栏 */
  .tab-bar {
    display: flex;
    gap: 4px;
    border-bottom: 1px solid #d9e0d8;
  }
  .tab-bar label {
    padding: 8px 14px;
    font-size: 13px;
    color: #5c6b62;
    cursor: pointer;
    border-bottom: 2px solid transparent; /* 先占好 2px 位置，激活时只换颜色，避免文字跳动 */
    margin-bottom: -1px;                  /* 让自己的下边线盖住容器那条线 */
    transition: color 0.15s;
  }
  .tab-bar label:hover { color: #2f6b4f; }

  /* ③ 面板：默认全部隐藏 */
  .panel {
    display: none;
    padding: 14px 2px;
    font-size: 13px;
    color: #3d4a42;
  }
  .panel h4 { margin: 0 0 6px; font-size: 14px; color: #1f2a24; }
  .panel p { margin: 0; line-height: 1.7; }

  /* ④ 状态派发：id 选择器 + :checked + 通用兄弟 ~
     读作「当 #tab-a 被选中时，它后面同级里的 .tab-bar 中那个 for="tab-a" 的 label」 */
  #tab-a:checked ~ .tab-bar label[for="tab-a"],
  #tab-b:checked ~ .tab-bar label[for="tab-b"],
  #tab-c:checked ~ .tab-bar label[for="tab-c"] {
    color: #2f6b4f;
    font-weight: 600;
    border-bottom-color: #2f6b4f;   /* 激活下划线 */
  }
  /* label[for="tab-a"] 是属性选择器：for 属性等于 tab-a 的 label */

  /* 显示对应面板 */
  #tab-a:checked ~ .panels .panel-a,
  #tab-b:checked ~ .panels .panel-b,
  #tab-c:checked ~ .panels .panel-c {
    display: block;
  }

  /* 键盘聚焦时给标签栏一个提示，方便 Tab 键用户知道焦点在哪 */
  .tabs > input:focus-visible ~ .tab-bar { outline: 2px dashed #9bd3b0; outline-offset: 3px; }

  .tip { margin: 12px 0 0; font-size: 12px; color: #5c6b62; }
</style>

<div class="tabs">
  <!-- 三个 radio 共用 name="tab"，所以同时只能选中一个；
       checked 指定默认激活项。它们必须排在标签栏和面板区「前面」，
       因为 ~ 只能选中后面的兄弟 -->
  <input type="radio" name="tab" id="tab-a" checked />
  <input type="radio" name="tab" id="tab-b" />
  <input type="radio" name="tab" id="tab-c" />

  <!-- label 的 for 指向 radio 的 id，点 label 等于点那个 radio -->
  <div class="tab-bar">
    <label for="tab-a">商品简介</label>
    <label for="tab-b">规格参数</label>
    <label for="tab-c">用户评价</label>
  </div>

  <div class="panels">
    <section class="panel panel-a">
      <h4>商品简介</h4>
      <p>这是第一个面板。切换 Tab 全靠 radio 的 :checked 状态，没有任何 JavaScript。</p>
    </section>
    <section class="panel panel-b">
      <h4>规格参数</h4>
      <p>尺寸 120 × 80 × 35 mm，净重 480 g，支持 5V/2A 快充。</p>
    </section>
    <section class="panel panel-c">
      <h4>用户评价</h4>
      <p>共 1286 条评价，好评率 97%。「做工扎实，续航超出预期。」</p>
    </section>
  </div>
</div>

<p class="tip">点标签切换；也可以按 Tab 键聚焦后用方向键切换——radio 天生支持键盘操作。</p>`,
  },
  {
    id: 'p4-pseudo-focus-within',
    title: ':focus-within 整块高亮',
    group: '12-伪类与伪元素',
    summary: '内部有元素聚焦时，让父容器整体变样',
    code: `<style>
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  /*
   * :focus 只命中「被聚焦的那个元素本身」。
   * :focus-within 命中「自己或内部任意后代被聚焦」的祖先元素。
   * 有了它，以前必须写 JS（focus/blur 事件里给父级加 class）的效果，
   * 现在一条 CSS 就够了。
   */

  h4 { margin: 0 0 8px; font-size: 13px; color: #2f6b4f; }
  .block { margin-bottom: 20px; max-width: 360px; }

  /* ① 搜索框：外层容器画边框，里面的 input 去掉自己的边框和轮廓，
     这样「整条」看起来像一个控件 */
  .search {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: 1px solid #cbd5ce;
    border-radius: 999px;               /* 胶囊形搜索条 */
    background: #fff;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .search input {
    flex: 1;                            /* 输入框吃掉剩余宽度 */
    border: 0;                          /* 去掉自带边框，交给外层容器画 */
    outline: none;                      /* 去掉聚焦轮廓，同样交给外层 */
    font: inherit;
    background: transparent;
    min-width: 0;                       /* Flex 子项默认不肯缩到内容以下，这行防止溢出 */
  }
  .search .icon { color: #9bb5a6; flex-shrink: 0; }

  /* 关键：input 聚焦时，整条搜索框高亮 */
  .search:focus-within {
    border-color: #2f6b4f;
    box-shadow: 0 0 0 3px rgba(47, 107, 79, 0.15);  /* 用阴影模拟柔和的焦点圈 */
  }
  .search:focus-within .icon { color: #2f6b4f; }     /* 图标也一起变色 */

  /* ② 表单项：聚焦时连标签文字一起变色，视线不容易丢 */
  .field {
    padding: 10px 12px;
    border: 1px solid #d9e0d8;
    border-radius: 10px;
    transition: background 0.15s, border-color 0.15s;
  }
  .field label {
    display: block;
    margin-bottom: 4px;
    font-size: 12px;
    color: #5c6b62;
    transition: color 0.15s;
  }
  .field input {
    width: 100%;
    padding: 6px 8px;
    border: 1px solid #cbd5ce;
    border-radius: 6px;
    font: inherit;
  }
  .field:focus-within { background: #f7faf8; border-color: #2f6b4f; }
  .field:focus-within label { color: #2f6b4f; font-weight: 600; }

  .tip { margin: 8px 0 0; font-size: 12px; color: #5c6b62; }
</style>

<div class="block">
  <h4>① 搜索条：input 聚焦 → 整条高亮</h4>
  <div class="search">
    <span class="icon">🔍</span>
    <input type="search" placeholder="搜索课程…" />
  </div>
  <p class="tip">点进输入框，注意边框、外发光和左边图标一起变色。</p>
</div>

<div class="block">
  <h4>② 表单项：input 聚焦 → 标签也跟着强调</h4>
  <div class="field">
    <label for="nickname">昵称</label>
    <!-- id 和 label 的 for 配对，点标签也能聚焦输入框 -->
    <input id="nickname" type="text" placeholder="请输入昵称" />
  </div>
</div>`,
  },
  {
    id: 'p4-pseudo-form-validate',
    title: '表单校验伪类（:required / :invalid / :placeholder-shown）',
    group: '12-伪类与伪元素',
    summary: '填过才报错，避免一进页面就一片红',
    code: `<style>
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  /*
   * 四个表单伪类：
   * :required          —— 带 required 属性（必填项）
   * :valid / :invalid  —— 浏览器内置校验通过 / 不通过（配合 type="email" 等）
   * :placeholder-shown —— 输入框还空着，正在显示占位文字
   *
   * 关键技巧：单用 :invalid 会「一进页面就全红」，体验很差。
   * 配合 :not(:placeholder-shown) 表示「已经填了东西但格式不对」才报错。
   */

  .form { max-width: 340px; }
  .field { margin-bottom: 18px; }
  .field > label {
    display: block;
    margin-bottom: 6px;
    font-size: 13px;
    font-weight: 600;
  }

  .input {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #cbd5ce;
    border-radius: 8px;
    font: inherit;
    transition: border-color 0.15s, background 0.15s;
  }

  /* ① :required —— 必填项左侧加一条绿色竖条做视觉提示 */
  .input:required { border-left: 3px solid #2f6b4f; }

  /* ② :placeholder-shown —— 空着的时候底色浅一点，暗示「还没填」 */
  .input:placeholder-shown { background: #f7faf8; }

  /* ③ 填过了但格式不对 → 报红。
     :invalid 命中校验失败，:not(:placeholder-shown) 保证「不是空着」 */
  .input:invalid:not(:placeholder-shown) {
    border-color: #c53030;
    background: #fff5f5;
  }

  /* ④ 填过了且格式正确 → 变绿，给正向反馈 */
  .input:valid:not(:placeholder-shown) { border-color: #2f6b4f; }

  /* ⑤ 错误提示默认隐藏，只有「填了且不合法」时才出现。
     ~ 是通用兄弟选择器：输入框后面同级的 .err */
  .err {
    display: none;
    margin: 6px 0 0;
    font-size: 12px;
    color: #c53030;
  }
  .input:invalid:not(:placeholder-shown) ~ .err { display: block; }

  /* ⑥ 必填星号用 ::after 伪元素自动补，不用在 HTML 里手写 <span>*</span> */
  .field.need > label::after {
    content: ' *';
    color: #c53030;
  }

  /* ⑦ 提交按钮：表单内还有不合法项时禁用外观。
     :has() 是父选择器，读作「内部含有不合法输入框的 form」 */
  .submit {
    width: 100%;
    padding: 10px;
    border: 0;
    border-radius: 8px;
    background: #2f6b4f;
    color: #fff;
    font: inherit;
    font-weight: 600;
    cursor: pointer;
  }
  form:has(.input:invalid) .submit {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .tip { font-size: 12px; color: #5c6b62; margin: 4px 0 0; }
</style>

<!-- novalidate 关掉浏览器提交时的原生弹窗，只演示 CSS 效果 -->
<form class="form" novalidate>
  <div class="field need">
    <label for="mail">邮箱</label>
    <!-- type="email" 让浏览器自带格式校验；required 触发 :required；
         placeholder 让 :placeholder-shown 在空着时命中 -->
    <input id="mail" class="input" type="email" required placeholder="you@example.com" />
    <p class="err">邮箱格式不对，需要包含 @ 符号</p>
    <p class="tip">先随便输几个字母 → 变红；补成完整邮箱 → 变绿；清空 → 恢复灰底。</p>
  </div>

  <div class="field need">
    <label for="pwd">密码（至少 6 位）</label>
    <!-- minlength 参与校验，不足 6 位就是 :invalid -->
    <input id="pwd" class="input" type="password" required minlength="6" placeholder="不少于 6 位" />
    <p class="err">密码太短，至少需要 6 位</p>
  </div>

  <div class="field">
    <label for="site">个人主页（选填）</label>
    <!-- 没写 required，所以不会有左侧竖条，也不会被当成必填 -->
    <input id="site" class="input" type="url" placeholder="https://..." />
    <p class="err">网址要以 http:// 或 https:// 开头</p>
  </div>

  <button type="submit" class="submit">注 册</button>
</form>`,
  },
  {
    id: 'p4-pseudo-has-parent',
    title: ':has() 父选择器实战',
    group: '12-伪类与伪元素',
    summary: '按子孙的状态反过来改父级样式，以前必须写 JS',
    code: `<style>
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  /*
   * :has(选择器) 是期待多年的「父选择器」。
   * .card:has(img) 读作「内部含有 img 的 .card」。
   * 它让 CSS 第一次能根据子孙的存在或状态，反过来修改父级样式。
   * 优先级：取括号里分数最高的参数，本身不额外加分。
   * 兼容性：2023 年起各主流浏览器才全面支持，很老的浏览器里不生效。
   */

  h4 { margin: 0 0 8px; font-size: 13px; color: #2f6b4f; }
  .block { margin-bottom: 22px; max-width: 360px; }

  /* ① 待办列表：勾选后整行变样（背景、边框、删除线一起来） */
  .todo { list-style: none; margin: 0; padding: 0; }
  .todo li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    margin-bottom: 8px;
    border: 1px solid #d9e0d8;
    border-radius: 10px;
    background: #fff;
    transition: background 0.15s, opacity 0.15s, border-color 0.15s;
  }
  /* 内部含有「被勾选的 input」的 li 才命中 */
  .todo li:has(input:checked) {
    background: #f1f7f3;
    border-color: #9bd3b0;
    opacity: 0.75;
  }
  /* 再配合后代选择器，把文字加删除线 */
  .todo li:has(input:checked) .text {
    text-decoration: line-through;
    color: #5c6b62;
  }

  /* ② 卡片：有没有配图，内边距完全不同。
     没有 :has() 的年代，只能在 HTML 上手动多加一个 class */
  .card {
    border: 1px solid #d9e0d8;
    border-radius: 12px;
    padding: 14px;
    margin-bottom: 10px;
    background: #fff;
  }
  .card:has(img) {
    padding: 0;          /* 有图时内边距归零，让图片顶到边 */
    overflow: hidden;    /* 配合圆角裁掉图片直角 */
  }
  .card:has(img) .body { padding: 14px; }   /* 文字区自己补回内边距 */
  .card img {
    display: block;      /* 去掉 img 作为行内元素时底部的空隙 */
    width: 100%;
    height: 80px;
    object-fit: cover;   /* 等比裁剪填满，不变形 */
  }
  .card h5 { margin: 0 0 4px; font-size: 14px; }
  .card p { margin: 0; font-size: 12px; color: #5c6b62; }

  /* ③ 表单行：内部输入框不合法时，整行加红底提示 */
  .row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border: 1px solid #d9e0d8;
    border-radius: 10px;
    font-size: 13px;
  }
  .row input {
    flex: 1;
    padding: 6px 8px;
    border: 1px solid #cbd5ce;
    border-radius: 6px;
    font: inherit;
    min-width: 0;
  }
  .row:has(input:invalid:not(:placeholder-shown)) {
    background: #fff5f5;
    border-color: #c53030;
  }

  .tip { margin: 8px 0 0; font-size: 12px; color: #5c6b62; }
</style>

<div class="block">
  <h4>① 勾选后整行变样</h4>
  <ul class="todo">
    <li><input type="checkbox" /><span class="text">学 Flex 布局</span></li>
    <li><input type="checkbox" checked /><span class="text">学盒模型</span></li>
    <li><input type="checkbox" /><span class="text">学伪类与伪元素</span></li>
  </ul>
  <p class="tip">随便勾一项试试，整个 li 的底色和文字都会变。</p>
</div>

<div class="block">
  <h4>② 卡片有没有图，内边距自动不同</h4>
  <div class="card">
    <div class="body">
      <h5>无图卡片</h5>
      <p>没有 img，:has(img) 不命中，保留 14px 内边距。</p>
    </div>
  </div>
  <div class="card">
    <!-- 这里用一段 SVG 数据当占位图，不依赖外部网络 -->
    <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='120'><rect width='400' height='120' fill='%232f6b4f'/></svg>" alt="示意图" />
    <div class="body">
      <h5>有图卡片</h5>
      <p>:has(img) 命中，图片自动贴满顶部。</p>
    </div>
  </div>
</div>

<div class="block">
  <h4>③ 输入不合法时整行变红</h4>
  <div class="row">
    <span>邮箱</span>
    <input type="email" placeholder="填错格式看整行变红" />
  </div>
</div>`,
  },
  {
    id: 'p4-pseudo-before-decor',
    title: '::before / ::after 装饰合集',
    group: '12-伪类与伪元素',
    summary: '必填星号、未读角标、标题装饰线、引号、加载省略号',
    code: `<style>
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  /*
   * ::before / ::after 会在目标元素「内容的最前 / 最后」插一个虚拟节点。
   * 它是元素内部的第一个 / 最后一个孩子，不是元素前后的兄弟——这点常被记反。
   *
   * 三条铁律：
   * ① 必须写 content，不写就根本不会被创建；纯装饰块写 content: ''
   * ② 默认是行内（inline），想设宽高要加 display:block 或用绝对定位
   * ③ 自闭合标签用不了（img / input / br / hr 没有内容区，塞不进虚拟孩子）
   */

  h4 { margin: 0 0 8px; font-size: 13px; color: #2f6b4f; }
  .block { margin-bottom: 22px; }

  /* ① 必填星号：HTML 里只加一个 class，星号由 CSS 自动补 */
  .required::after {
    content: ' *';
    color: #c53030;
    font-weight: 700;
  }

  /* ② 未读角标：::before 造一个绝对定位的小红点。
     父级必须写 position: relative，否则红点会跑到更外层的参照物上去 */
  .badge-wrap {
    position: relative;
    display: inline-block;   /* 行内元素设不了定位参照区，改成 inline-block */
  }
  .badge-wrap::before {
    content: '';             /* 纯装饰，空字符串即可 */
    position: absolute;      /* 绝对定位自动块化，可以直接设宽高 */
    top: -4px;
    right: -4px;
    width: 10px;
    height: 10px;
    background: #c53030;
    border: 2px solid #fff;  /* 白边把红点和下面的按钮隔开，更清晰 */
    border-radius: 50%;
  }
  .icon-btn {
    padding: 8px 14px;
    border: 1px solid #d9e0d8;
    border-radius: 8px;
    background: #fff;
    font: inherit;
    font-size: 13px;
    cursor: pointer;
  }

  /* ③ 标题两侧装饰线：flex + 两个伪元素各占一半剩余宽度，标题自然居中 */
  .fancy {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
    font-size: 15px;
    font-weight: 600;
  }
  .fancy::before,
  .fancy::after {
    content: '';
    flex: 1;                 /* 两条线平分左右剩余空间 */
    height: 1px;
    background: #d9e0d8;
  }

  /* ④ 引用大引号：用伪元素放装饰性标点，不污染正文文字 */
  .quote {
    position: relative;
    margin: 0;
    padding: 12px 16px 12px 40px;
    background: #f7faf8;
    border-left: 3px solid #2f6b4f;
    border-radius: 0 8px 8px 0;
    font-size: 13px;
    color: #3d4a42;
  }
  .quote::before {
    content: '“';            /* 中文排版常用的全角引号 */
    position: absolute;
    left: 10px;
    top: 2px;
    font-size: 36px;
    line-height: 1;
    color: #9bd3b0;
  }

  /* ⑤ 加载省略号：content 配合动画，做出「...」逐个出现的效果。
     steps(4, end) 让动画分 4 个台阶跳变，而不是平滑过渡 */
  @keyframes dots {
    0%   { content: ''; }
    25%  { content: '.'; }
    50%  { content: '..'; }
    75%  { content: '...'; }
    100% { content: ''; }
  }
  .loading::after {
    content: '';
    animation: dots 1.6s steps(1, end) infinite;
  }

  /* ⑥ 外链标记：属性选择器 + 伪元素，自动给站外链接加箭头 */
  a[target="_blank"]::after {
    content: ' ↗';
    font-size: 12px;
    color: #9bb5a6;
  }
  a { color: #2f6b4f; text-decoration: none; }
  a:hover { text-decoration: underline; }
</style>

<div class="block">
  <h4>① ::after 自动补必填星号</h4>
  <label class="required">用户名</label>
</div>

<div class="block">
  <h4>② ::before 做未读角标</h4>
  <span class="badge-wrap">
    <button type="button" class="icon-btn">消息</button>
  </span>
</div>

<div class="block">
  <h4>③ ::before + ::after 做标题装饰线</h4>
  <p class="fancy">章节小标题</p>
</div>

<div class="block">
  <h4>④ ::before 放大引号</h4>
  <blockquote class="quote">伪元素让纯装饰的内容留在 CSS 里，HTML 只负责语义。</blockquote>
</div>

<div class="block">
  <h4>⑤ ::after + 动画做加载省略号</h4>
  <span class="loading">数据加载中</span>
</div>

<div class="block">
  <h4>⑥ 属性选择器 + ::after 自动标记外链</h4>
  <a href="https://developer.mozilla.org" target="_blank" rel="noreferrer">MDN 文档</a>
</div>`,
  },
  {
    id: 'p4-pseudo-crumb-sep',
    title: '面包屑分隔符（li + li::before）',
    group: '12-伪类与伪元素',
    summary: '除第一项外自动加斜杠，HTML 里不用手写',
    code: `<style>
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  h4 { margin: 0 0 8px; font-size: 13px; color: #2f6b4f; }
  .block { margin-bottom: 22px; }

  .crumb {
    display: flex;       /* 各层级横向排列 */
    flex-wrap: wrap;     /* 路径太长时允许折行，不会溢出屏幕 */
    align-items: center; /* 竖直居中，让文字和分隔符对齐 */
    list-style: none;    /* 去掉 ol 默认的 1. 2. 3. 数字标记 */
    margin: 0;           /* 清掉 ol 默认上下外边距 */
    padding: 0;          /* 清掉 ol 默认左内边距 */
    font-size: 13px;
  }

  /* 可点击层级：用 button 做成「看起来像链接」的样子，
     不用 <a href="#">，避免点击后跳到页面顶部 */
  .crumb-btn {
    border: 0;
    background: transparent;
    color: #2f6b4f;
    font: inherit;
    cursor: pointer;
    padding: 0;
  }
  /* :hover 是伪类，只在鼠标停在这个按钮上时命中，补一条下划线做点击反馈 */
  .crumb-btn:hover { text-decoration: underline; }

  /* ★ 本 Demo 的核心，拆成三步理解：
     ① li + li 是「相邻兄弟选择器」，加号意思是「紧跟在另一个 li 之后的 li」，
        因此它命中第 2、3、4… 项，第一项永远不会被选中；
     ② ::before 是伪元素，在被命中元素的内容最前面插入一个虚拟节点；
     ③ content 是伪元素的必填项，不写 content 就什么都不会出现。
     合起来的效果：除第一项外，每项前面自动加一个斜杠分隔符。
     好处是 HTML 里完全不用手写斜杠，将来增删层级也不会漏改、不会多一个。 */
  .crumb li + li::before {
    content: '/';        /* 要插入的字符 */
    margin: 0 6px;       /* 上下 0、左右 6px，让斜杠两侧留缝 */
    color: #9bb5a6;      /* 浅色，弱化分隔符本身 */
  }

  /* 当前页：灰色且不可点，表示「你已经在这里了」 */
  .crumb .current { color: #5c6b62; }

  /* 对比写法：:not(:first-child) 表示「不是第一个孩子的」。
     在这个全是 li 的列表里，它和 li + li 效果相同，但读起来更直白。
     换个分隔符符号也只需改 content 一处 */
  .crumb2 li:not(:first-child)::before {
    content: '›';
    margin: 0 8px;
    color: #9bb5a6;
  }

  /* 再一种：用 ::after 加在「除最后一项以外」的每项后面，
     视觉结果一样，思路是从后往前排除 */
  .crumb3 li:not(:last-child)::after {
    content: '>';
    margin: 0 8px;
    color: #9bb5a6;
  }

  .tip { margin: 0; font-size: 12px; color: #5c6b62; }
</style>

<div class="block">
  <h4>① li + li::before 插入 / 分隔符</h4>
  <!-- ol 是有序列表，语义上正好表示「有层级顺序的路径」；
       nav + aria-label 让读屏软件知道这是面包屑导航 -->
  <nav aria-label="面包屑">
    <ol class="crumb">
      <li><button type="button" class="crumb-btn">首页</button></li>
      <li><button type="button" class="crumb-btn">课程</button></li>
      <li><button type="button" class="crumb-btn">前端基础</button></li>
      <!-- aria-current="page" 告诉读屏软件「这是当前页」 -->
      <li class="current" aria-current="page">伪类与伪元素</li>
    </ol>
  </nav>
</div>

<div class="block">
  <h4>② :not(:first-child)::before 插入 › 分隔符</h4>
  <ol class="crumb crumb2">
    <li>首页</li>
    <li>课程</li>
    <li>前端基础</li>
    <li class="current">伪类与伪元素</li>
  </ol>
</div>

<div class="block">
  <h4>③ :not(:last-child)::after 插入 &gt; 分隔符</h4>
  <ol class="crumb crumb3">
    <li>首页</li>
    <li>课程</li>
    <li>前端基础</li>
    <li class="current">伪类与伪元素</li>
  </ol>
</div>

<p class="tip">试着删掉某条规则里的 content 那一行——分隔符会整个消失，因为没有 content 的伪元素不会被创建。</p>`,
  },
  {
    id: 'p4-pseudo-content-attr-counter',
    title: 'content 进阶：attr() 与 counter()',
    group: '12-伪类与伪元素',
    summary: '读 HTML 属性做纯 CSS 提示，自动编号不用手写数字',
    code: `<style>
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  /*
   * content 除了写死字符串，还能：
   * • attr(属性名)  —— 读取该元素 HTML 上的属性值
   * • counter(名字) —— 显示 CSS 计数器的当前值
   * • ''            —— 空字符串，用于纯色块装饰
   * • url(图片)     —— 直接插一张图
   *
   * 提醒：伪元素里的文字是装饰性的，选不中也复制不了，
   * 读屏软件也可能读不到——所以正文内容永远写在 HTML 里，别塞进 content。
   */

  h4 { margin: 0 0 8px; font-size: 13px; color: #2f6b4f; }
  .block { margin-bottom: 24px; }

  /* ① attr()：纯 CSS 悬停提示。
     同一条规则服务所有提示，文案各自写在 data-tip 属性里，不用写多条 CSS */
  .tipbox {
    position: relative;              /* 给提示气泡当定位参照物 */
    display: inline-block;
    border-bottom: 1px dashed #9bb5a6;
    cursor: help;                    /* 问号光标，暗示这里有解释 */
  }
  .tipbox::after {
    content: attr(data-tip);         /* 读取 HTML 上的 data-tip 值 */
    position: absolute;
    left: 0;
    bottom: 130%;                    /* 放到元素上方，130% 留出小箭头的空间 */
    white-space: nowrap;             /* 提示文字不换行 */
    padding: 6px 10px;
    background: #1f2a24;
    color: #fff;
    font-size: 12px;
    border-radius: 6px;
    opacity: 0;                      /* 默认透明；不用 display:none 才能做淡入 */
    pointer-events: none;            /* 透明时不挡鼠标事件 */
    transition: opacity 0.15s;
  }
  .tipbox:hover::after { opacity: 1; }

  /* ② attr() 读单位提示：给输入框右侧显示单位，随属性变化 */
  .unit { position: relative; display: inline-block; }
  .unit::after {
    content: attr(data-unit);
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);     /* 百分比参照自身高度，实现垂直居中 */
    font-size: 12px;
    color: #9bb5a6;
    pointer-events: none;
  }
  .unit input {
    padding: 8px 40px 8px 10px;      /* 右内边距留给单位文字 */
    border: 1px solid #cbd5ce;
    border-radius: 8px;
    font: inherit;
    width: 160px;
  }

  /* ③ counter()：自动编号。三件套配合使用
     counter-reset     在祖先上建立并归零计数器
     counter-increment 每遇到一个元素就加 1
     content: counter()把当前值显示出来
     好处：中间插入或删除步骤，编号自动重排，不用手改数字 */
  .steps {
    counter-reset: step;             /* 建一个名叫 step 的计数器，从 0 开始 */
    list-style: none;
    margin: 0;
    padding: 0;
    max-width: 340px;
  }
  .steps li {
    counter-increment: step;         /* 每个 li 让 step 加 1 */
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    font-size: 13px;
  }
  .steps li::before {
    content: counter(step);          /* 显示当前编号 */
    flex-shrink: 0;                  /* 圆圈不许被文字压缩 */
    width: 24px;
    height: 24px;
    display: flex;                   /* 让数字在圆圈里居中 */
    align-items: center;
    justify-content: center;
    background: #2f6b4f;
    color: #fff;
    border-radius: 50%;
    font-size: 12px;
  }

  /* ④ 嵌套编号：1、1.1、1.2 这种多级序号。
     counters(名字, 分隔符) 会把各层级的值用分隔符连起来 */
  .outline { counter-reset: sec; list-style: none; padding-left: 0; }
  .outline ol { counter-reset: sec; list-style: none; padding-left: 20px; }
  .outline li { counter-increment: sec; font-size: 13px; padding: 3px 0; }
  .outline li::before {
    content: counters(sec, '.') '  ';  /* 注意是 counters（带 s），多级连接 */
    color: #2f6b4f;
    font-weight: 600;
  }
</style>

<div class="block">
  <h4>① content: attr(data-tip) 做纯 CSS 提示</h4>
  <!-- data-tip 是自定义属性（data- 开头随便起名），值被 attr() 读走当提示文字 -->
  <span class="tipbox" data-tip="伪元素不会出现在 HTML 结构里">悬停看提示</span>
  &nbsp;&nbsp;
  <span class="tipbox" data-tip="换一句话也只改属性，不用改 CSS">再看一个</span>
</div>

<div class="block">
  <h4>② attr(data-unit) 显示输入框单位</h4>
  <span class="unit" data-unit="px">
    <input type="number" value="16" />
  </span>
</div>

<div class="block">
  <h4>③ counter() 自动编号</h4>
  <ol class="steps">
    <li>写 HTML 结构</li>
    <li>加 CSS 样式</li>
    <li>调伪类交互</li>
    <li>自测无障碍</li>
  </ol>
</div>

<div class="block">
  <h4>④ counters() 多级编号</h4>
  <ol class="outline">
    <li>CSS 基础
      <ol>
        <li>选择器</li>
        <li>盒模型</li>
      </ol>
    </li>
    <li>布局
      <ol>
        <li>Flex</li>
        <li>Grid</li>
      </ol>
    </li>
  </ol>
</div>`,
  },
  {
    id: 'p4-pseudo-text-parts',
    title: '文字类伪元素（first-letter / marker / placeholder / selection）',
    group: '12-伪类与伪元素',
    summary: '改浏览器默认渲染出来的那几个小部件',
    code: `<style>
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.7 system-ui, sans-serif; color: #1f2a24; }

  /*
   * 这几个伪元素针对的是「浏览器内部渲染出来的部件」，
   * 所以只允许改一小部分属性（主要是颜色、字体、背景一类），
   * 改 position、display 之类的布局属性通常无效。
   * 另外它们只支持双冒号写法，写成单冒号不生效。
   */

  h4 { margin: 0 0 6px; font-size: 13px; color: #2f6b4f; }
  .block { margin-bottom: 24px; max-width: 400px; }

  /* ① ::first-letter —— 段落的第一个字，做杂志风格的首字下沉 */
  .drop::first-letter {
    float: left;             /* 让首字浮到左边，后面文字自动绕排 */
    font-size: 42px;
    line-height: 1;
    padding: 2px 8px 0 0;
    color: #2f6b4f;
    font-weight: 700;
  }

  /* ② ::first-line —— 段落渲染后的第一行。
     注意它是「视觉上的第一行」，容器宽度变化时命中的字数会跟着变 */
  .lead::first-line {
    font-weight: 700;
    color: #2f6b4f;
  }

  /* ③ ::marker —— 列表项前面的圆点或编号。
     以前想换颜色只能去掉 list-style 再用 ::before 伪造，现在可以直接改 */
  .marked { padding-left: 22px; margin: 0; }
  .marked li { margin-bottom: 4px; font-size: 13px; }
  .marked li::marker {
    color: #2f6b4f;
    font-size: 18px;
  }
  /* 有序列表的编号同样能改，还能配合 content 换成自定义标记 */
  .numbered { padding-left: 26px; margin: 0; }
  .numbered li::marker {
    color: #c53030;
    font-weight: 700;
  }

  /* ④ ::placeholder —— 输入框占位文字的样式 */
  .input {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #cbd5ce;
    border-radius: 8px;
    font: inherit;
  }
  .input::placeholder {
    color: #9bb5a6;
    font-style: italic;      /* 斜体，和真正输入的文字区分开 */
  }

  /* ⑤ ::selection —— 用户划选文字时的高亮配色。
     可以按区块分别设置，做出品牌感 */
  .pick::selection {
    background: #2f6b4f;
    color: #fff;
  }

  /* ⑥ 滚动条也能改（属于浏览器私有伪元素，Chrome / Safari 支持） */
  .scrollbox {
    max-height: 90px;
    overflow-y: auto;
    padding: 8px 10px;
    border: 1px solid #d9e0d8;
    border-radius: 8px;
    font-size: 13px;
  }
  .scrollbox::-webkit-scrollbar { width: 8px; }
  .scrollbox::-webkit-scrollbar-thumb { background: #9bd3b0; border-radius: 999px; }
  .scrollbox::-webkit-scrollbar-track { background: #f1f7f3; }
</style>

<div class="block">
  <h4>① ::first-letter 首字下沉</h4>
  <p class="drop">伪元素让我们不必为纯装饰的内容额外写标签，首字下沉就是最经典的例子，整段只多了一条 CSS 规则。</p>
</div>

<div class="block">
  <h4>② ::first-line 第一行加粗</h4>
  <p class="lead">这一段的第一行会被加粗变绿，剩下的行保持原样。它命中的是渲染后的第一行，所以把预览区拉窄，被加粗的字数会跟着变化。</p>
</div>

<div class="block">
  <h4>③ ::marker 改列表标记</h4>
  <ul class="marked">
    <li>圆点变成主题绿</li>
    <li>字号也能单独调</li>
  </ul>
  <ol class="numbered">
    <li>编号变红加粗</li>
    <li>不用去掉 list-style</li>
  </ol>
</div>

<div class="block">
  <h4>④ ::placeholder 改占位文字</h4>
  <input class="input" type="text" placeholder="我是斜体浅绿的占位文字" />
</div>

<div class="block">
  <h4>⑤ ::selection 改选中高亮</h4>
  <p class="pick">用鼠标把这句话划选一下，看看高亮颜色变成了深绿底白字。</p>
</div>

<div class="block">
  <h4>⑥ ::-webkit-scrollbar 改滚动条</h4>
  <div class="scrollbox">
    <p>往下滚动看滚动条颜色。</p>
    <p>第 2 行内容。</p>
    <p>第 3 行内容。</p>
    <p>第 4 行内容。</p>
    <p>第 5 行内容。</p>
  </div>
</div>`,
  },
  {
    id: 'p4-pseudo-empty-target',
    title: ':empty 空状态与伪类易错清单',
    group: '12-伪类与伪元素',
    summary: '内容为空时自动显示占位提示，附常见坑对照',
    code: `<style>
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  h4 { margin: 0 0 8px; font-size: 13px; color: #2f6b4f; }
  .block { margin-bottom: 22px; max-width: 380px; }

  .list {
    list-style: none;
    margin: 0;
    padding: 0;
    min-height: 60px;
    border: 1px dashed #cbd5ce;
    border-radius: 10px;
  }
  .list li { padding: 10px 12px; font-size: 13px; }
  .list li:not(:last-child) { border-bottom: 1px solid #eef6f1; }

  /* ① :empty —— 元素内部完全没有内容时命中（连空格和换行都不能有！）。
     配合 ::before 自动显示空状态提示，不用写 JS 判断数组长度 */
  .list:empty::before {
    content: '暂无数据';
    display: flex;               /* 伪元素默认行内，这里块化后才能居中 */
    align-items: center;
    justify-content: center;
    height: 60px;
    color: #9bb5a6;
    font-size: 13px;
  }

  /* 易错提示：下面这个容器里有换行和空格，所以 :empty 不命中。
     这是最常踩的坑——HTML 里换行写标签就已经算「有内容」了 */
  .fake-empty:empty::before { content: '暂无数据'; }

  /* ② 伪元素在自闭合标签上无效的对照。
     input 没有内容区，塞不进虚拟孩子，所以下面这条完全不生效 */
  .no-effect::before { content: '✗ 这行不会出现'; color: #c53030; }
  /* 正确做法：给外层容器加伪元素 */
  .wrap-icon { position: relative; display: inline-block; }
  .wrap-icon::before {
    content: '🔍';
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 13px;
    pointer-events: none;        /* 别挡住输入框的点击 */
  }
  .wrap-icon input {
    padding: 8px 10px 8px 32px;  /* 左内边距留给图标 */
    border: 1px solid #cbd5ce;
    border-radius: 8px;
    font: inherit;
    width: 220px;
  }

  /* ③ 伪元素会被父级 overflow:hidden 裁掉的对照 */
  .clip-demo { display: flex; gap: 14px; }
  .card {
    position: relative;
    width: 110px;
    padding: 14px 10px;
    border: 1px solid #d9e0d8;
    border-radius: 10px;
    font-size: 12px;
    text-align: center;
  }
  .card::after {
    content: 'NEW';
    position: absolute;
    top: -8px;                   /* 故意跑到父级外面 */
    right: -8px;
    padding: 2px 6px;
    background: #c53030;
    color: #fff;
    border-radius: 999px;
    font-size: 10px;
  }
  /* 这张卡开了 overflow:hidden，角标就被裁掉看不见了 */
  .card.clipped { overflow: hidden; }

  .note { margin: 6px 0 0; font-size: 12px; color: #5c6b62; }
  .bad { color: #c53030; }
  .good { color: #2f6b4f; }
</style>

<div class="block">
  <h4>① :empty 自动显示空状态</h4>
  <!-- 这个 ul 内部一个字符都没有（标签紧挨着写），:empty 命中 -->
  <ul class="list"></ul>
  <p class="note good">✓ 标签紧挨着写、内部零字符，:empty 生效。</p>
</div>

<div class="block">
  <h4>① 对照：看起来空、其实不空</h4>
  <!-- 下面这个 ul 里有换行和缩进空格，:empty 不命中，所以没有提示 -->
  <ul class="list fake-empty">
  </ul>
  <p class="note bad">✗ 里面有换行 / 空格，:empty 不命中——这是最常见的坑。</p>
</div>

<div class="block">
  <h4>① 有数据时提示自动消失</h4>
  <ul class="list"><li>Flex 布局</li><li>Grid 布局</li></ul>
</div>

<div class="block">
  <h4>② input 用不了伪元素，要包一层</h4>
  <!-- 直接给 input 加 ::before 无效（自闭合标签没有内容区） -->
  <input class="no-effect" type="text" placeholder="直接加伪元素：没有图标" />
  <div style="height:10px;"></div>
  <!-- 正确做法：外层容器加伪元素当图标 -->
  <span class="wrap-icon">
    <input type="text" placeholder="包一层：图标出来了" />
  </span>
  <p class="note">✓ 想给输入框加图标，就给外层容器写伪元素，或者用背景图。</p>
</div>

<div class="block">
  <h4>③ 伪元素会被 overflow:hidden 裁掉</h4>
  <div class="clip-demo">
    <div class="card">正常<br />角标露在外面</div>
    <div class="card clipped">开了<br />overflow:hidden</div>
  </div>
  <p class="note">右边那张卡的 NEW 角标被裁掉了：::after 是元素内部的孩子，受父级 overflow 约束。</p>
</div>`,
  },
]

export default part4PseudoDemos
