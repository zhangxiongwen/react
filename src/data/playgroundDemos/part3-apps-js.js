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
  /* * 是通用选择器，表示「页面里所有元素」。
     box-sizing: border-box 让元素的 width 包含 padding 和 border，
     这样写 width: 100px 时看到的就是 100px，不会被内边距撑大。 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 16px;                            /* 页面四周留 16px 空白，内容不贴边 */
    font: 14px/1.5 system-ui, sans-serif;    /* font 是缩写：字号 14px / 行高 1.5 倍，字体优先用系统默认无衬线字体 */
    color: #1f2a24;                          /* 全局文字颜色（深墨绿），子元素会继承 */
  }

  /* 去掉 ul 默认圆点，占满宽度 */
  .list {
    list-style: none;                /* ul 默认每项前面有小圆点，none 去掉它 */
    margin: 0;                       /* 浏览器给 ul 的默认上下外边距，清零 */
    padding: 0;                      /* 浏览器给 ul 的默认左内边距（放圆点用），清零让文字贴左边 */
    max-width: 360px;                /* 最大宽度 360px；窗口更窄时会自动变窄，属于响应式写法 */
    border: 1px solid #d9e0d8;       /* 1px 实线浅灰绿描边，把整个列表框出来 */
    border-radius: 10px;             /* 四个角变成 10px 圆角 */
    overflow: hidden; /* 圆角不被子项背景撑破 */
  }
  /* .list li：后代选择器，「.list 里面的所有 li」都会被选中 */
  .list li {
    padding: 12px 16px;              /* 内边距：上下 12px、左右 16px，让每行文字更宽松好点 */
    background: #fff;                /* 每行白底，和外面的页面底色区分开 */
    border-bottom: 1px solid #eef2ee; /* 每项底部分隔线 */
  }
  /* :last-child 是伪类，选中「父元素里的最后一个孩子」，
     这里用来把最后一行多余的那条分割线去掉，否则会和外框的边紧贴显得双线。 */
  .list li:last-child { border-bottom: none; }
  /* :hover 也是伪类，只在鼠标悬停到该 li 上时生效 */
  .list li:hover { background: #f7faf8; } /* 悬停反馈 */
</style>

<!-- ul 表示无序列表（unordered list），语义上就是「一组并列的条目」 -->
<!-- class="list" 给它挂上样式钩子，让上面 .list 的规则能命中 -->
<ul class="list">
  <!-- li 是列表项（list item），必须是 ul/ol 的直接子元素 -->
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
  /* 通用选择器 * 命中所有元素，统一用 border-box 盒模型，宽度计算更直观 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 列表容器：清掉 ul 的默认圆点与内外边距，并限制最大宽度 */
  .list { list-style: none; margin: 0; padding: 0; max-width: 380px; }

  /* 每一行：用 Flex 把「头像 / 文字区 / 时间」横向摆开 */
  .item {
    display: flex;           /* 横向排列：头像 + 文字区 */
    align-items: center;     /* 交叉轴（竖直方向）居中，让头像和文字垂直对齐 */
    gap: 12px;               /* Flex 子元素之间的间距，比给每个孩子写 margin 更省事 */
    padding: 12px;           /* 四周内边距，行与行不会太挤 */
    border-bottom: 1px solid #eef2ee; /* 底部细线当分割线 */
  }

  /* 头像：固定尺寸的圆形色块，里面再用 Flex 把文字居中 */
  .avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;      /* 圆形头像 */
    background: linear-gradient(135deg, #6fcf97, #2f6b4f); /* 线性渐变背景，135deg 表示从左上到右下 */
    flex-shrink: 0;          /* 不被文字挤扁 */
    display: flex;           /* 自己也变成 Flex 容器，用来居中里面那个汉字 */
    align-items: center;     /* 竖直居中 */
    justify-content: center; /* 水平居中 */
    color: #fff;             /* 白字压在深色渐变上 */
    font-weight: 700;        /* 加粗，700 相当于 bold */
  }

  .meta { flex: 1; min-width: 0; } /* min-width:0 让省略号生效 */
  /* flex: 1 表示「占满剩余空间」；Flex 子元素默认 min-width: auto，
     内容太长时会把自己撑开而不肯收缩，导致 text-overflow 失效，所以要手动置 0。 */

  .name { font-weight: 600; margin: 0 0 2px; } /* margin 三个值 = 上 0 / 左右 0 / 下 2px */

  /* 摘要文字：单行显示，超出部分用省略号 —— 这三行是固定搭配，缺一不可 */
  .desc {
    margin: 0;               /* p 标签默认有上下外边距，清零 */
    font-size: 13px;         /* 比正文略小，形成主次层级 */
    color: #5c6b62;          /* 灰绿色，弱化为次要信息 */
    white-space: nowrap;     /* 不允许换行，强制挤在一行里 */
    overflow: hidden;        /* 超出容器的部分裁掉（否则会溢出显示） */
    text-overflow: ellipsis; /* 文字过长显示 … */
  }

  .time { font-size: 12px; color: #9bb5a6; } /* 时间戳：最小号 + 最浅色，视觉优先级最低 */
</style>

<!-- 外层 ul：一组并列的联系人/消息条目 -->
<ul class="list">
  <!-- 每个 li 同时挂 class="item"，让它成为一个 Flex 行 -->
  <li class="item">
    <!-- 头像块：这里用汉字占位，真实项目里换成 <img> -->
    <div class="avatar">张</div>
    <!-- 中间文字区：包住昵称和摘要，负责吃掉剩余宽度 -->
    <div class="meta">
      <p class="name">张三</p>
      <p class="desc">明天下午三点开会，记得带笔记本</p>
    </div>
    <!-- span 是行内容器，只放一小段文字，不会自己换行 -->
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; }

  /* 媒体对象容器：左图右文的横向 Flex 卡片 */
  .media {
    display: flex;              /* 让子元素（缩略图、文字区）横向并排 */
    gap: 14px;                  /* 图与文之间留 14px */
    max-width: 420px;           /* 限制最大宽度，避免一行太长影响阅读 */
    padding: 14px;              /* 卡片内边距，内容不贴边框 */
    background: #fff;           /* 白色卡片底 */
    border: 1px solid #d9e0d8;  /* 浅色描边 */
    border-radius: 10px;        /* 圆角 */
  }

  /* .media + .media 是相邻兄弟选择器：只选中「紧跟在另一个 .media 后面的 .media」，
     也就是从第 2 张卡片开始。效果 = 卡片之间有 12px 间距，第一张上面不会多出空白。 */
  .media + .media { margin-top: 12px; }

  /* 缩略图区域：固定尺寸 */
  .thumb {
    width: 96px;
    height: 72px;
    border-radius: 8px;
    background: #d9ebe1;     /* 浅绿色占位底，真实项目里换成图片 */
    flex-shrink: 0;          /* 禁止收缩：文字再长也不会把图挤扁 */
    display: flex;           /* 自己也当 Flex 容器，方便把「封面图」二字居中 */
    align-items: center;     /* 竖直居中 */
    justify-content: center; /* 水平居中 */
    color: #2f6b4f;
    font-size: 12px;
  }

  .body { flex: 1; }                                    /* 文字区吃掉剩余宽度 */
  .title { margin: 0 0 6px; font-size: 15px; }          /* h3 默认外边距很大，清零后只留下方 6px */
  .text { margin: 0; color: #5c6b62; font-size: 13px; } /* 摘要：灰色小字，弱化为次要信息 */
</style>

<!-- article 表示「一段可独立存在的内容」，比 div 更有语义，利于 SEO 和读屏软件 -->
<article class="media">
  <div class="thumb">封面图</div>
  <!-- 注意这里的 class="body" 是自定义类名，和 HTML 的 <body> 标签没有任何关系 -->
  <div class="body">
    <!-- h3 是三级标题，表示条目标题；层级要顺着 h1 → h2 → h3 用 -->
    <h3 class="title">Flex 布局实战指南</h3>
    <p class="text">Media Object 把图片和文字并排，适合新闻、评论、搜索结果。</p>
  </div>
</article>

<!-- 第二张卡片：因为有 .media + .media 规则，它会自动带上 12px 的上间距 -->
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 16px;
    font: 14px/1.5 system-ui, sans-serif;
    background: #f4f7f5; /* 页面底色设成浅灰绿，白色卡片浮在上面才有层次感 */
  }

  /* 卡片容器：纵向排列的 Flex 列 */
  .cards {
    list-style: none;        /* 去掉 ul 默认圆点 */
    margin: 0;               /* 清掉 ul 默认上下外边距 */
    padding: 0;              /* 清掉 ul 默认左内边距 */
    max-width: 360px;
    display: flex;
    flex-direction: column;  /* 主轴改为竖直方向，子元素从上到下排 */
    gap: 12px; /* 卡片之间的垂直间距 */
  }

  /* 单张卡片 */
  .card {
    padding: 16px;                                /* 内容四周留白 */
    background: #fff;                             /* 白底 */
    border-radius: 12px;                          /* 大圆角，更柔和 */
    box-shadow: 0 2px 8px rgba(31, 42, 36, 0.08); /* 阴影四个值：水平偏移 0 / 垂直下移 2px / 模糊半径 8px / 颜色。
                                                     rgba 最后一位 0.08 是透明度，越小越淡，营造轻微浮起效果 */
  }

  /* .card h3 是后代选择器：只作用于卡片内部的 h3，不影响页面其它标题 */
  .card h3 { margin: 0 0 6px; font-size: 16px; }
  .card p { margin: 0; color: #5c6b62; font-size: 13px; }

  /* 标签：小圆角药丸 */
  .tag {
    display: inline-block; /* span 默认是行内元素，设不了上下 margin；
                              inline-block 让它既能和文字同行，又能吃 margin/padding */
    margin-top: 10px;      /* 和上面的描述文字拉开距离 */
    padding: 2px 8px;      /* 上下 2px、左右 8px，撑出小胶囊的形状 */
    font-size: 12px;
    background: #eef6f1;   /* 浅绿底 */
    color: #2f6b4f;        /* 深绿字 */
    border-radius: 999px;  /* 给一个远大于高度的值，两端就会变成完美半圆（药丸形） */
  }
</style>

<!-- ul 承载一组课程卡片 -->
<ul class="cards">
  <!-- li 同时是列表项和一张卡片 -->
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 商品行：左图 + 右信息区的横向 Flex */
  .product {
    display: flex;
    gap: 12px;
    max-width: 420px;
    padding: 12px;
    border: 1px solid #d9e0d8;
    border-radius: 10px;
    background: #fff;
  }

  /* 商品图：正方形占位块 */
  .pic {
    width: 88px;
    height: 88px;
    border-radius: 8px;
    background: #eef6f1;
    flex-shrink: 0;          /* 禁止收缩，保证永远是 88x88 的正方形 */
    display: flex;           /* 把里面的表情符号居中 */
    align-items: center;
    justify-content: center;
    font-size: 28px;         /* 表情符号按字号放大 */
  }

  /* 信息区：自己又是一个纵向 Flex，方便用 auto 外边距把价格行推到底部 */
  .info { flex: 1; display: flex; flex-direction: column; }

  .title { margin: 0; font-size: 15px; font-weight: 600; }

  /* margin: 4px 0 auto = 上 4px / 左右 0 / 下 auto。
     在纵向 Flex 里，下边距 auto 会吃掉所有剩余空间，
     于是它后面的 .row（价格行）被顶到容器最底部——这是不用定位就能「上下分离」的技巧。 */
  .sub { margin: 4px 0 auto; font-size: 12px; color: #9bb5a6; }

  /* 价格行：左边价格、右边按钮 */
  .row {
    display: flex;
    align-items: center;             /* 价格文字和按钮竖直居中对齐 */
    justify-content: space-between;  /* 两端对齐：第一个贴左、最后一个贴右，中间空开 */
    margin-top: 8px;
  }

  .price { color: #c53030; font-size: 18px; font-weight: 700; } /* 红色大字，电商里价格要最醒目 */
  /* .price small 后代选择器：只把价格里的 <small>（人民币符号）缩小，数字仍然是 18px */
  .price small { font-size: 12px; }

  /* 主按钮 */
  .btn {
    padding: 6px 12px;
    border: none;          /* 去掉浏览器给 button 的默认灰边 */
    border-radius: 6px;
    background: #2f6b4f;
    color: #fff;
    font: inherit;         /* button 默认不继承页面字体，会显示成系统小字，
                              font: inherit 让它跟随 body 的字号和字体 */
    cursor: pointer;       /* 鼠标移上去变成小手，暗示「这里可以点」 */
  }
</style>

<!-- article：一件商品是一块可独立理解的内容 -->
<article class="product">
  <div class="pic">📚</div>
  <div class="info">
    <h3 class="title">前端入门实战手册</h3>
    <p class="sub">包邮 · 7天无理由</p>
    <div class="row">
      <!-- small 是语义标签，表示附注/小字，这里用来缩小货币符号 -->
      <span class="price"><small>¥</small>49.9</span>
      <!-- type="button" 很关键：button 在 <form> 里的默认类型是 submit，会触发表单提交并刷新页面；
           写成 button 表示「这只是个普通按钮」，行为完全由 JS 决定 -->
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; }

  .comments { max-width: 400px; } /* 评论区整体宽度上限，一行不超过 400px 更好读 */

  /* 单条评论：左头像 + 右内容 */
  .comment {
    display: flex;
    gap: 10px;
    padding: 14px 0;                  /* 只给上下内边距，左右为 0，让内容顶到两侧 */
    border-bottom: 1px solid #eef2ee; /* 评论之间的分割线 */
  }

  /* 圆形头像 */
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;      /* 宽高相等 + 50% 圆角 = 正圆 */
    background: #2f6b4f;
    color: #fff;
    display: flex;           /* 用 Flex 把里面的姓氏居中 */
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;          /* 不允许被右侧长文本挤扁 */
  }

  .content { flex: 1; } /* 内容区占满剩余宽度 */

  /* 昵称 + 时间的一行 */
  .head {
    display: flex;
    align-items: baseline; /* 按「文字基线」对齐（字母底部那条线）。
                              昵称 13px、时间 12px 字号不同，用 baseline 比 center 看起来更整齐 */
    gap: 8px;
    margin-bottom: 4px;
  }

  .nick { font-weight: 600; font-size: 13px; }
  .time { font-size: 12px; color: #9bb5a6; }
  .text { margin: 0; color: #3d4a42; font-size: 14px; } /* 评论正文，颜色最深、字号最大 */
  .actions { margin-top: 8px; font-size: 12px; color: #5c6b62; }
  /* .actions span 后代选择器：给操作栏里每个 span 加右间距并显示小手光标 */
  .actions span { margin-right: 12px; cursor: pointer; }
</style>

<!-- section 表示「一个主题区块」，这里是整块评论区 -->
<section class="comments">
  <!-- 每条评论用 article：它可以被独立引用、独立阅读 -->
  <article class="comment">
    <div class="avatar">王</div>
    <div class="content">
      <div class="head">
        <span class="nick">王小明</span>
        <!-- time 是语义标签，专门表示时间点；配上 datetime 属性机器还能读懂具体时刻 -->
        <time class="time">2 小时前</time>
      </div>
      <p class="text">讲得很清楚，尤其是 Flex 那一段！</p>
      <!-- 操作栏：点赞数与回复入口 -->
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 通知列表容器：清掉 ul 默认样式 */
  .notify { list-style: none; margin: 0; padding: 0; max-width: 380px; }

  /* 单条通知 */
  .item {
    display: flex;
    align-items: flex-start;          /* 顶部对齐：描述可能两行，图标应该和第一行齐平而不是居中 */
    gap: 12px;
    padding: 14px 12px;
    border-bottom: 1px solid #eef2ee;
    position: relative;               /* 关键：给自己建立「定位参照系」，
                                         里面 position: absolute 的红点才会相对这一行定位 */
  }

  /* .item.unread 表示「同时拥有 item 和 unread 两个类」的元素（中间没有空格）。
     注意和 .item .unread（后代选择器）区别开。 */
  .item.unread { background: #f7faf8; } /* 未读项浅底 */

  /* 未读红点：脱离文档流，钉在这一行的左侧 */
  .dot {
    position: absolute; /* 绝对定位：不占空间，位置相对最近的已定位祖先（这里是 .item） */
    left: 4px;          /* 距离 .item 左边 4px */
    top: 18px;          /* 距离 .item 顶部 18px，大致和标题文字齐平 */
    width: 8px;
    height: 8px;
    border-radius: 50%; /* 正圆 */
    background: #c53030;
  }

  /* 左侧方形图标底 */
  .icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;     /* 圆角方形（不是正圆），这是「应用图标」的常见形状 */
    background: #eef6f1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;          /* 固定尺寸，不被文字挤压 */
  }

  /* 这里的 .body 是自定义类名，和 HTML 的 <body> 标签无关 */
  .body { flex: 1; }
  .title { margin: 0 0 4px; font-weight: 600; }
  .desc { margin: 0; font-size: 13px; color: #5c6b62; }
  /* white-space: nowrap 禁止换行，保证「5 分钟前」不会被挤成两行 */
  .time { font-size: 12px; color: #9bb5a6; white-space: nowrap; }
</style>

<ul class="notify">
  <!-- class 可以写多个，用空格隔开：item 提供布局，unread 叠加「未读」外观 -->
  <li class="item unread">
    <!-- aria-hidden="true" 告诉读屏软件「这个元素纯装饰，请跳过不要念」 -->
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
  <!-- 这一条没有 unread 类，所以背景是白的、也没有红点 = 已读状态 -->
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 外层固定高度，内部滚动 — 真实虚拟列表会用 JS 只渲染可见项 */
  .scroll-box {
    max-width: 320px;
    height: 280px;             /* 必须给固定高度，否则容器会被 100 条内容撑高，永远不出现滚动条 */
    overflow-y: auto;          /* 纵向超出时出现滚动条 */
                               /* overflow 常用值：visible 默认溢出可见 / hidden 裁掉且不能滚 /
                                  scroll 永远显示滚动条 / auto 只在内容超出时才显示 */
    border: 1px solid #d9e0d8;
    border-radius: 10px;
    background: #fff;
  }

  /* ::-webkit-scrollbar 是 WebKit 内核（Chrome、Safari、新版 Edge）私有的伪元素，
     用来自定义滚动条外观；不支持的浏览器会忽略它，回退到系统默认滚动条。 */
  .scroll-box::-webkit-scrollbar { width: 6px; } /* 把滚动条轨道调窄成 6px */
  /* thumb 指滚动条上那根可以拖动的「滑块」 */
  .scroll-box::-webkit-scrollbar-thumb {
    background: #9bb5a6;
    border-radius: 3px;
  }

  /* 每一行：序号 / 名称 / 徽标 三段横向排布 */
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between; /* 两端对齐，中间的 .label 又设了 flex:1，所以徽标被推到最右 */
    padding: 10px 14px;
    border-bottom: 1px solid #eef2ee;
  }
  /* :hover 伪类：鼠标悬停在该行时换底色，给出「可交互」的暗示 */
  .row:hover { background: #f7faf8; }

  .idx { color: #9bb5a6; font-size: 12px; width: 36px; } /* 固定宽度，保证所有序号左对齐成一列 */
  .label { flex: 1; }                                    /* 名称吃掉中间的剩余空间 */

  /* 右侧小徽标 */
  .badge {
    font-size: 11px;
    padding: 2px 6px;
    background: #eef6f1;
    border-radius: 4px;   /* 小圆角（不是药丸），是「标记」的常见形状 */
    color: #2f6b4f;
  }

  .hint {
    margin-top: 8px;
    font-size: 12px;
    color: #5c6b62;
  }
</style>

<!-- 这个 div 故意留空：内容全部由下面的 JS 动态生成后塞进来 -->
<!-- id="list" 是给 JS 用的唯一标识，document.getElementById 靠它找到这个元素 -->
<div class="scroll-box" id="list"></div>
<p class="hint">共 100 条数据 — 在容器内滚动。真实项目可用 react-window 等库做虚拟化。</p>

<script>
  // 用 JS 批量生成 100 条，模拟后端返回的长列表

  // getElementById 按 id 精确查找一个元素，返回真实 DOM 节点（找不到就返回 null）
  const box = document.getElementById('list')

  // 文档片段（DocumentFragment）是一个「临时的、不在页面上的容器」。
  // 如果每循环一次就 box.appendChild，浏览器要重排/重绘 100 次；
  // 先攒到 fragment 里、最后一次性插入，只触发 1 次渲染，性能好得多。
  const frag = document.createDocumentFragment()

  // for 循环：i 从 1 开始，只要 i <= 100 就执行一轮，每轮结束 i++ 加一
  for (let i = 1; i <= 100; i++) {
    // createElement 凭空造一个 <div> 元素（此刻它还没在页面上）
    const row = document.createElement('div')
    // className 等价于给元素写 class="row"，这样它就能命中上面的 .row 样式
    row.className = 'row'
    // innerHTML 把一段 HTML 字符串解析成真实子节点。
    // 加号是字符串拼接，把数字 i 接进标签之间。
    // 提醒：innerHTML 会执行标签，若内容来自用户输入应改用 textContent 以防 XSS。
    row.innerHTML =
      '<span class="idx">#' + i + '</span>' +
      '<span class="label">列表项 ' + i + '</span>' +
      // % 是取余运算符，i % 3 === 0 表示 i 能被 3 整除；
      // 三元表达式「条件 ? 真值 : 假值」用来在两个文案间二选一
      '<span class="badge">' + (i % 3 === 0 ? '热门' : '普通') + '</span>'
    // appendChild 把这一行追加到片段的末尾
    frag.appendChild(row)
  }

  // 一次性把 100 行插入页面。fragment 本身不会出现在 DOM 里，只有它的子节点会被搬进去。
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* Tab 栏容器 */
  .tabs {
    display: flex;                     /* 三个 Tab 横向并排 */
    gap: 0;                            /* 明确写 0：Tab 之间不留缝，靠等分宽度贴在一起 */
    border-bottom: 2px solid #eef2ee;  /* 整条底部灰线，作为「轨道」；选中项的绿线会盖在它上面 */
    max-width: 400px;
  }

  /* Tab 用 button，不用 href="#" */
  /* 原因：button 天生可以用键盘 Tab 键聚焦、空格/回车触发，读屏软件也会念「按钮」；
     而 <a href="#"> 会改变地址栏并可能让页面跳到顶部。 */
  .tab {
    flex: 1;             /* 每个 Tab 平分容器宽度 */
    text-align: center;  /* 文字水平居中 */
    padding: 10px 0;     /* 上下 10px 内边距，加大点击区域（手机上更好按） */
    border: 0;           /* 去掉 button 默认边框 */
    background: none;    /* 去掉 button 默认灰色背景，变成纯文字外观 */
    color: #5c6b62;      /* 未选中：灰绿色 */
    font: inherit;       /* 继承 body 字体，否则会变成浏览器默认的小号系统字体 */
    position: relative;  /* 建立定位参照系，供下面 ::after 的绿色下划线定位 */
    cursor: pointer;     /* 小手光标 */
  }

  /* 当前 Tab：加粗 + 底部绿色粗线 */
  /* .tab.active 中间没空格 = 同时具备两个类名的元素；这个 active 类由 JS 动态增删 */
  .tab.active {
    color: #2f6b4f;
    font-weight: 700;
  }
  /* ::after 是伪元素：在该元素内容的「后面」凭空插入一个虚拟子节点。
     它不写在 HTML 里，纯靠 CSS 生成，常用来画装饰性的线条、箭头、角标。 */
  .tab.active::after {
    content: '';         /* content 必填！哪怕是空字符串也要写，否则伪元素根本不会被创建 */
    position: absolute;  /* 相对 .tab（它设了 position: relative）定位 */
    left: 20%;           /* 左右各内缩 20%，所以下划线比 Tab 短一些，视觉更精致 */
    right: 20%;          /* 同时给 left 和 right 就等于「拉伸到这个范围」，不用算宽度 */
    bottom: -2px;        /* 负值往下挪 2px，正好压在 .tabs 那条 2px 灰线上把它盖住 */
    height: 2px;
    background: #2f6b4f;
  }

  /* 面板：默认全部隐藏，只有带 active 的那个显示出来 */
  .panel { display: none; padding: 16px 4px; max-width: 400px; color: #3d4a42; }
  /* display: none 是彻底不渲染、不占位；切换 block 就重新出现 */
  .panel.active { display: block; }

  /* 面板里的信息流列表 */
  .feed { list-style: none; margin: 0; padding: 0; }
  .feed li {
    padding: 12px 0;
    border-bottom: 1px solid #eef2ee;
    font-size: 14px;
  }
  /* :last-child 选中最后一项，去掉多余的收尾分割线 */
  .feed li:last-child { border-bottom: none; }
  /* .feed .meta 是后代选择器：只影响信息流内部的 .meta 小字 */
  .feed .meta { font-size: 12px; color: #9bb5a6; margin-top: 4px; }
</style>

<!-- nav 是语义标签，表示「一组导航链接/入口」，读屏软件会把它当导航区域 -->
<nav class="tabs">
  <!-- data-panel 是自定义数据属性（data-* 家族）：
       HTML 允许你自由添加 data-xxx 来存放业务数据，JS 里用 元素.dataset.panel 读取。
       这里存的是该 Tab 对应面板的 id 后缀（recommend / follow / hot）。 -->
  <!-- 初始状态给第一个 Tab 加 active，让页面一进来就有默认选中项 -->
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

  // querySelectorAll 用 CSS 选择器一次选出「所有」匹配的元素，返回一个类数组的 NodeList。
  // 对比：querySelector 只返回第一个匹配项。
  const tabs = document.querySelectorAll('.tab')
  const panels = document.querySelectorAll('.panel')

  // forEach 逐个遍历，tab 就是当前这一轮的那个按钮元素
  tabs.forEach((tab) => {
    // addEventListener('click', 回调) = 给这个按钮登记一个点击监听器；
    // 之后每次用户点它，浏览器就会调用后面这个箭头函数。
    tab.addEventListener('click', () => {
      // dataset 是读取 data-* 属性的入口：data-panel="follow" 对应 tab.dataset.panel === 'follow'
      const id = tab.dataset.panel

      // 第一步：先把所有 Tab 的 active 去掉（classList.remove 删除一个类名，
      // 类名本来不存在也不会报错），这样就不会出现两个高亮
      tabs.forEach((t) => t.classList.remove('active'))
      // 第二步：只给被点的这个 Tab 加回 active
      tab.classList.add('active')

      // 面板同理：先全部隐藏
      panels.forEach((p) => p.classList.remove('active'))
      // 再按 id 拼出目标面板的 id（如 'panel-' + 'follow' = 'panel-follow'）并显示它。
      // ?. 是可选链：万一 getElementById 没找到元素（返回 null），
      // 用 ?. 会直接得到 undefined 而不是抛出「无法读取 null 的属性」的错误。
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* Tab 栏：横向排列 + 底部一条整线 */
  .tabs { display: flex; border-bottom: 1px solid #d9e0d8; max-width: 400px; }

  .tab {
    padding: 10px 16px;                    /* 上下 10px、左右 16px，Tab 宽度随文字长短变化 */
    border: none;                          /* 清掉 button 默认边框 */
    background: none;                      /* 清掉 button 默认背景 */
    cursor: pointer;                       /* 小手光标 */
    font: inherit;                         /* 继承页面字体，避免 button 的默认小字 */
    color: #5c6b62;
    border-bottom: 2px solid transparent;  /* 技巧：未选中时也保留 2px 边框，只是颜色透明。
                                              这样切换选中态时只是换颜色，元素高度不变，不会「跳一下」 */
  }
  /* 选中态：换字色 + 加粗 + 把刚才那条透明边框染成绿色 */
  .tab.active { color: #2f6b4f; font-weight: 700; border-bottom-color: #2f6b4f; }

  /* 面板：默认 none 不显示，加上 active 才 block 显示 */
  .panel { display: none; padding: 16px 4px; max-width: 400px; }
  .panel.active { display: block; }
</style>

<div class="tabs">
  <!-- data-i 存的是这个 Tab 的序号（下标），JS 会用它去 panels[i] 里取对应面板。
       这种「按索引一一对应」的写法要求 Tab 顺序和 panel 顺序严格一致。 -->
  <button class="tab active" data-i="0" type="button">首页</button>
  <button class="tab" data-i="1" type="button">课程</button>
  <button class="tab" data-i="2" type="button">我的</button>
</div>
<!-- 三个面板顺序对应上面三个 Tab；第一个预先带 active 作为默认显示项 -->
<div class="panel active">首页内容：轮播、推荐课程等。</div>
<div class="panel">课程内容：章节列表与学习进度。</div>
<div class="panel">个人中心：头像、设置、退出登录。</div>

<script>
  // 一次性取出所有 Tab 按钮和所有面板，顺序与 HTML 中出现的顺序一致
  const tabs = document.querySelectorAll('.tab')
  const panels = document.querySelectorAll('.panel')

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // dataset.i 读到的是字符串 '0'/'1'/'2'，
      // Number(...) 把它转成数字，才能当数组下标用
      const i = Number(tab.dataset.i)

      // 1. 所有 tab / panel 去掉 active
      tabs.forEach((t) => t.classList.remove('active'))
      panels.forEach((p) => p.classList.remove('active'))

      // 2. 当前项加上 active
      tab.classList.add('active')
      // 用下标从 NodeList 里取出第 i 个面板并显示它
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 标签容器：可换行的 Flex */
  .pills {
    display: flex;
    flex-wrap: wrap;    /* 空间不够时换行 */
                        /* Flex 默认是 nowrap：宁可把子元素压扁也不换行；
                           改成 wrap 后一行放不下就自动折到下一行 */
    gap: 8px;           /* 横向和纵向的间距都是 8px，换行后行与行之间也有 8px */
    max-width: 320px;   /* 限制宽度，才能看到换行效果 */
  }

  .pill {
    padding: 6px 14px;
    border-radius: 999px; /* 大圆角 = 药丸形 */
    background: #eef6f1;
    color: #2f6b4f;
    font-size: 13px;
    border: 1px solid transparent; /* 预留 1px 透明边框，占好位置；
                                      将来做「选中加深边框」时切换颜色就不会让尺寸跳动 */
    cursor: default;      /* default 就是普通箭头光标，明确表示「这只是标签，不可点击」。
                             常见值：default 箭头 / pointer 小手 / text 文本 I 形 /
                             grab 可抓取的手 / grabbing 抓紧的手 / not-allowed 禁止 */
  }
  /* .pill.highlight：同时有 pill 和 highlight 两个类时，反色显示为「当前选中」 */
  .pill.highlight {
    background: #2f6b4f;
    color: #fff;
  }
</style>

<!-- 容器 div 负责布局；每个标签用 span（行内元素，语义中立、不引入多余含义） -->
<div class="pills">
  <!-- 「全部」额外加 highlight 类，表现为当前生效的筛选项 -->
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 筛选项容器：可换行的 Flex，flex-wrap: wrap 表示一行放不下就折行 */
  .chips { display: flex; flex-wrap: wrap; gap: 8px; max-width: 360px; }

  .chip {
    padding: 6px 12px;
    border: 1px solid #d9e0d8; /* 未选中：浅灰描边 */
    border-radius: 999px;      /* 药丸形圆角 */
    background: #fff;
    font: inherit;             /* 继承页面字体，避免 button 默认小字 */
    cursor: pointer;           /* 小手光标：和上一个 Demo 的 cursor: default 对比，
                                  这里是真的能点，所以要用 pointer */
    color: #5c6b62;
  }
  /* 选中态：边框、底色、字色、字重一起变，让选中非常明显。
     selected 这个类由 JS 在点击时增删。 */
  .chip.selected {
    border-color: #2f6b4f;
    background: #eef6f1;
    color: #2f6b4f;
    font-weight: 600;
  }

  .result { margin-top: 14px; font-size: 13px; color: #5c6b62; } /* 展示当前已选结果的一行小字 */
</style>

<div class="chips" id="chips">
  <!-- 用 button 而不是 span，因为这些标签真的要被点击（键盘也能操作）。
       data-v 存这个筛选项的「值」，JS 读 chip.dataset.v 拿到它。
       之所以不直接读按钮文字，是因为文字可能带图标或空格，data-* 更稳定。 -->
  <button class="chip" type="button" data-v="免费">免费</button>
  <button class="chip" type="button" data-v="入门">入门</button>
  <button class="chip" type="button" data-v="进阶">进阶</button>
  <button class="chip" type="button" data-v="实战">实战</button>
</div>
<!-- id="out" 供 JS 定位，用来实时刷新「已选：xxx」这段文字 -->
<p class="result" id="out">已选：无</p>

<script>
  const chips = document.querySelectorAll('.chip')
  const out = document.getElementById('out')
  const selected = new Set() // 用 Set 存已选标签，避免重复
  // Set 是 JS 内置的「集合」：同一个值只会存一份，
  // 提供 has(判断是否存在) / add(加入) / delete(移除) / size(数量) 这些方法，
  // 做「多选」比用数组再手动查重方便得多。

  // 把当前选中结果渲染到页面上。抽成函数，改动一处即可，避免重复代码
  function render() {
    // textContent 只写入纯文本（不解析 HTML 标签），比 innerHTML 更安全
    // selected.size 是数量，0 会被当成「假」，所以三元表达式可以直接用它判断有没有选中项
    // [...selected] 是展开语法，把 Set 转成真正的数组；join('、') 用顿号把各项连成一个字符串
    out.textContent = '已选：' + (selected.size ? [...selected].join('、') : '无')
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const v = chip.dataset.v
      // 切换选中：有则删，无则加
      if (selected.has(v)) {
        selected.delete(v)                  // 数据层：从集合里移除
        chip.classList.remove('selected')   // 视图层：去掉高亮样式
      } else {
        selected.add(v)                     // 数据层：加入集合
        chip.classList.add('selected')      // 视图层：加上高亮样式
      }
      render() // 数据变了就重新渲染结果文字
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 分段控件外壳 */
  .segment {
    display: inline-flex;  /* inline-flex = 内部是 Flex 布局，但整体像行内元素一样
                              «宽度只由内容决定»，不会像 block 那样占满一整行 */
    position: relative;    /* 建立定位参照系：里面绝对定位的白色滑块以它为基准 */
    padding: 3px;          /* 3px 内边距形成一圈灰色«轨道»，滑块在里面移动 */
    background: #eef2ee;   /* 灰色底槽 */
    border-radius: 10px;
    gap: 0;                /* 按钮之间不留缝 */
  }

  /* .segment button 是后代选择器（标签选择器 + 后代关系），
     不用额外 class 就能命中壳子里所有按钮 */
  .segment button {
    position: relative;      /* 配合 z-index 使用：z-index 只对「已定位元素」生效 */
    z-index: 1;              /* 层级抬高到 1，确保文字浮在白色滑块之上，不被它遮住 */
    padding: 8px 20px;
    border: none;
    background: transparent; /* 透明背景，才能透出下面的白色滑块 */
    font: inherit;
    cursor: pointer;
    color: #5c6b62;
    border-radius: 8px;
  }
  /* 选中的那个按钮：字色加深并加粗 */
  .segment button.active { color: #1f2a24; font-weight: 600; }

  /* 白色滑块垫在按钮下方 */
  .thumb {
    position: absolute;   /* 脱离文档流，不占位置，所以不会把按钮挤开 */
    top: 3px;             /* 和外壳的 3px padding 对齐 */
    left: 3px;            /* 初始贴在左侧起点；之后靠 transform 平移 */
    height: calc(100% - 6px); /* calc() 可以在 CSS 里做数学运算，还能混用不同单位。
                                 这里是「外壳高度减掉上下各 3px 的 padding」 */
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,.08); /* 极淡阴影，让滑块看起来浮在槽上 */
    transition: transform .2s, width .2s;
    /* transition 是过渡动画：写成「属性名 时长」，多组用逗号分隔。
       意思是当 transform 或 width 的值发生变化时，不要瞬间跳变，
       而是用 0.2 秒平滑地过渡过去——滑动手感全靠这一行。
       没写在 transition 里的属性（比如 background）仍然是立刻生效。 */
  }

  .hint { margin-top: 12px; font-size: 13px; color: #5c6b62; }
</style>

<!-- id="seg" 供 JS 定位外壳（用来在它内部查找按钮） -->
<div class="segment" id="seg">
  <!-- 滑块必须写在按钮前面：绝对定位元素之间默认按文档顺序叠放，
       写在前面 + 按钮有 z-index:1，就能保证它在按钮下层 -->
  <div class="thumb" id="thumb"></div>
  <!-- 第一个按钮预置 active，与下面 JS 结尾的 moveThumb(0) 保持一致 -->
  <button class="active" type="button">日</button>
  <button type="button">周</button>
  <button type="button">月</button>
</div>
<!-- 结果提示行，JS 会改写它的文字 -->
<p class="hint" id="hint">当前视图：日</p>

<script>
  const seg = document.getElementById('seg')
  const thumb = document.getElementById('thumb')
  // 在 seg 内部查找，而不是 document 全局查找：
  // 这样即使页面别处也有 button，也只会选中分段控件里的这三个
  const btns = seg.querySelectorAll('button')
  const hint = document.getElementById('hint')
  // 用数组存三个文案，和按钮顺序一一对应，靠下标取用
  const labels = ['日', '周', '月']

  // 把白色滑块移动到第 index 个按钮的位置
  function moveThumb(index) {
    const btn = btns[index]
    // offsetWidth 是元素在页面上实际渲染出来的宽度（含 padding 和 border），单位是数字像素。
    // 这里让滑块宽度等于按钮宽度，所以文字多的按钮滑块会自动变宽。
    // 注意：写行内样式必须带单位，所以要拼上 'px'。
    thumb.style.width = btn.offsetWidth + 'px'
    // offsetLeft 是该按钮左边缘相对定位父元素（.segment）的横向距离。
    // translateX(距离) 让滑块沿水平方向平移到这个位置。
    // 用 transform 而不是改 left，是因为 transform 由 GPU 合成，动画更流畅且不触发重排。
    thumb.style.transform = 'translateX(' + btn.offsetLeft + 'px)'
  }

  // forEach 的第二个参数 i 是当前元素的下标（0、1、2）
  btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      btns.forEach((b) => b.classList.remove('active')) // 先清掉所有高亮
      btn.classList.add('active')                       // 再高亮被点的这个
      moveThumb(i)                                      // 滑块滑过去（有 transition 所以是平滑动画）
      hint.textContent = '当前视图：' + labels[i]        // 同步更新提示文字
    })
  })

  moveThumb(0) // 初始化滑块位置
  // 必须手动调用一次：页面刚加载时没人点击，滑块宽度还是 0，
  // 需要先算好第一个按钮的宽度和位置，否则滑块看不见。
</script>`,
  },
  {
    id: 'p3-sidebar-active',
    title: '侧栏菜单高亮',
    group: '08-导航标签Tab',
    summary: '左侧导航 + 各面板简单界面',
    code: `<style>
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  /* 这里 margin: 0 是为了让下面的框架贴边显示，模拟一个后台管理页面 */
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; color: #1f2a24; }

  /* 整体框架：左右两栏。min-height 保证内容少时也有 280px 高，不至于塌成一条 */
  /* overflow: hidden 让子元素的方角背景被圆角裁掉，四角才干净 */
  .layout { display: flex; min-height: 280px; max-width: 480px; border: 1px solid #d9e0d8; border-radius: 10px; overflow: hidden; }

  /* 左侧导航栏：固定宽度 */
  .side {
    width: 140px;                    /* 固定 140px，不参与伸缩 */
    background: #f7faf8;             /* 比主区略灰，形成层次 */
    border-right: 1px solid #eef2ee; /* 右侧竖线，分隔两栏 */
    padding: 8px 0;                  /* 上下留白，左右为 0（让选中项的背景能通栏铺满） */
  }

  /* .side button 后代选择器：侧栏里的所有按钮 */
  .side button {
    display: block;                       /* button 默认是 inline-block，改成 block 后独占一行，从上到下堆叠 */
    width: 100%;                          /* 撑满侧栏宽度，整行都可点击 */
    text-align: left;                     /* button 里的文字默认居中，导航项要改成左对齐 */
    padding: 10px 16px;
    border: none;
    background: none;
    font: inherit;
    cursor: pointer;
    color: #5c6b62;
    border-left: 3px solid transparent;   /* 预留 3px 透明左边框：选中时只换颜色，
                                             文字位置不会左右抖动 */
  }
  /* 选中的导航项：白底 + 绿字 + 左侧绿色指示条 */
  .side button.active {
    background: #fff;
    color: #2f6b4f;
    font-weight: 600;
    border-left-color: #2f6b4f;
  }

  .main { flex: 1; padding: 16px; background: #fff; } /* 右侧主区吃掉剩余宽度 */

  /* 面板切换：同样是「默认 none，加 active 才显示」的套路 */
  .panel { display: none; }
  .panel.active { display: block; }
  .panel h2 { margin: 0 0 8px; font-size: 17px; }               /* 清掉 h2 的默认大外边距 */
  .panel .sub { margin: 0 0 12px; font-size: 12px; color: #5c6b62; } /* 副标题小灰字 */

  /* 概览面板的三个数字卡片 */
  .stats { display: flex; gap: 8px; }
  .stat {
    flex: 1;             /* 三个卡片平分宽度 */
    padding: 10px;
    background: #eef6f1;
    border-radius: 8px;
    text-align: center;
    font-size: 13px;
  }
  /* .stat b：b 标签默认是行内的，会和后面的说明文字挤在同一行；
     改成 display: block 后数字独占一行，形成「大数字在上、小标签在下」的样式 */
  .stat b { display: block; font-size: 18px; color: #2f6b4f; }

  /* 文章面板的列表 */
  .post-list { list-style: none; margin: 0; padding: 0; font-size: 13px; }
  .post-list li { padding: 10px 0; border-bottom: 1px solid #eef2ee; }
  .post-list li:last-child { border-bottom: none; } /* :last-child 去掉末项分割线 */

  /* 评论面板的每条评论 */
  .comment { padding: 10px 0; border-bottom: 1px solid #eef2ee; font-size: 13px; }
  .comment:last-child { border-bottom: none; }
  .comment .nick { font-weight: 600; }                                  /* 后代选择器：评论里的昵称 */
  .comment .time { font-size: 11px; color: #9bb5a6; margin-left: 6px; } /* 时间紧跟昵称，左边留 6px */

  /* 设置面板的表单 */
  .form label { display: block; margin: 8px 0 4px; font-size: 12px; color: #5c6b62; }
  /* 逗号是「并集选择器」：一条规则同时作用于 .form 里的 input 和 select */
  .form input, .form select {
    width: 100%;               /* 输入框撑满一行 */
    padding: 7px 10px;
    border: 1px solid #d9e0d8;
    border-radius: 6px;
    font: inherit;             /* 表单控件默认不继承页面字体，必须显式写 */
    box-sizing: border-box;    /* 再强调一次：让 width:100% 包含 padding，否则会溢出容器 */
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

<!-- 最外层容器：左右分栏的 Flex -->
<div class="layout">
  <!-- nav 语义标签：这是页面的导航区 -->
  <nav class="side" id="nav">
    <!-- 每个导航项都用 data-panel 记住自己对应哪个面板（值 = 面板 id 的后缀） -->
    <button type="button" class="nav-item active" data-panel="overview">概览</button>
    <button type="button" class="nav-item" data-panel="posts">文章</button>
    <button type="button" class="nav-item" data-panel="comments">评论</button>
    <button type="button" class="nav-item" data-panel="settings">设置</button>
  </nav>
  <!-- main 语义标签：页面的主要内容区，整页只应出现一个 -->
  <main class="main">
    <!-- 概览 -->
    <!-- 每个面板的 id 都是「panel- + 导航按钮的 data-panel 值」，JS 靠这个规则拼出目标 id -->
    <section class="panel active" id="panel-overview">
      <h2>概览</h2>
      <p class="sub">站点数据一览</p>
      <div class="stats">
        <!-- b 标签表示「视觉上加粗但无强调语义」的文本，这里就是那个大数字 -->
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
      <!-- onsubmit 是行内事件属性：表单提交时执行这段 JS。
           event.preventDefault() 阻止浏览器的默认行为（默认会跳转/刷新页面），
           这样点「保存」只会停在原地，适合纯演示。 -->
      <form class="form" onsubmit="event.preventDefault()">
        <label>站点标题</label>
        <!-- value 是输入框的初始内容；单标签写法末尾的 /> 是 XHTML 风格，HTML5 里可省略 -->
        <input value="我的博客" />
        <label>评论审核</label>
        <!-- select 是下拉框，每个 option 是一个可选项，默认选中第一个 -->
        <select><option>先审后发</option><option>直接发布</option></select>
        <!-- type="submit" 表示点它会触发所在 form 的 submit 事件（也就是上面那行 onsubmit） -->
        <button type="submit">保存</button>
      </form>
    </section>
  </main>
</div>

<script>
  // 侧栏切换：高亮 nav-item + 显示对应 panel

  const navItems = document.querySelectorAll('.nav-item') // 四个导航按钮
  const panels = document.querySelectorAll('.panel')      // 四个内容面板

  navItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      // 读出这个按钮身上的 data-panel，比如 'posts'
      const id = btn.dataset.panel

      // 导航：先全部取消高亮，再只高亮当前项（保证任何时刻只有一个 active）
      navItems.forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')

      // 面板：先全部隐藏，再显示 id 匹配的那一个
      panels.forEach((p) => p.classList.remove('active'))
      // 拼接出 'panel-posts' 这样的 id 去查找元素；
      // ?. 可选链保证万一找不到（返回 null）也不会报错，只是什么都不做
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 面包屑容器（是一个 ol 有序列表） */
  .crumb {
    display: flex;       /* 各层级横向排列 */
    flex-wrap: wrap;     /* 路径太长时允许折行，不会溢出屏幕 */
    align-items: center; /* 竖直居中，让文字和分隔符对齐 */
    gap: 4px;            /* 项与项之间 4px（分隔符自己还有 margin，合起来间距更舒服） */
    list-style: none;    /* 去掉 ol 默认的 1. 2. 3. 数字标记 */
    margin: 0;           /* 清掉 ol 默认上下外边距 */
    padding: 0;          /* 清掉 ol 默认左内边距 */
    font-size: 13px;
  }

  /* 可点击的层级：用 button 做成「看起来像链接」的样子 */
  .crumb-btn {
    border: 0; background: transparent; color: #2f6b4f; font: inherit; cursor: pointer; padding: 0;
    /* 逐项说明：去掉边框 / 背景透明 / 用主题绿当字色 / 继承页面字体 /
       小手光标 / 内边距清零，这样它和普通文字排在一起时高度一致 */
  }

  /* .crumb a 是后代选择器：面包屑里的 <a> 链接 */
  .crumb a {
    color: #2f6b4f;
    text-decoration: none; /* 去掉浏览器给链接的默认下划线，平时更清爽 */
  }
  /* :hover 是伪类，表示「鼠标悬停时」。
     整条规则的含义：只有当鼠标停在 .crumb 里的 <a> 上时才生效，
     此时 text-decoration: underline 给文字补上下划线，作为可点击的反馈。 */
  .crumb a:hover { text-decoration: underline; }

  /* 这条规则是面包屑的精髓，拆开看：
     - li + li 是「相邻兄弟选择器」，加号表示「紧跟在前一个 li 之后的 li」，
       所以它选中的是第 2、3、4… 项，第一项不会被选中；
     - ::before 是「伪元素」，会在被选中元素的内容前面插入一个虚拟节点（HTML 里并不存在）；
     - content 是伪元素的必填属性，不写 content 伪元素就不会被创建，什么都看不到。
     合起来的效果：除了第一项，每一项前面都自动加一个 / 分隔符，
     不用在 HTML 里手写斜杠，增删层级时也不会漏改。 */
  .crumb li + li::before {
    content: '/';
    margin: 0 6px;   /* 上下 0、左右 6px，让斜杠和两侧文字都留点缝隙 */
    color: #9bb5a6;  /* 浅色，弱化分隔符本身 */
  }

  /* 当前所在页：灰色且不可点，表示「你已经在这里了」 */
  .crumb .current { color: #5c6b62; }
</style>

<!-- aria-label 给这个导航区起一个「无障碍名字」：
     读屏软件会念「面包屑，导航」，帮助视障用户区分页面上的多个 nav -->
<nav aria-label="面包屑">
  <!-- 用 ol（有序列表）而不是 ul，因为面包屑的层级顺序是有意义的：首页 → 课程 → … -->
  <ol class="crumb">
    <li><button type="button" class="crumb-btn">首页</button></li>
    <li><button type="button" class="crumb-btn">课程</button></li>
    <li><button type="button" class="crumb-btn">前端基础</button></li>
    <!-- 最后一项是当前页，所以用 span 而非按钮（不可点击）。
         aria-current="page" 明确告诉辅助技术「这就是当前页面」 -->
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; background: #ededed; }
  /* 灰色底是微信聊天背景的经典配色，白色/绿色气泡浮在上面才清晰 */

  /* 聊天列表：纵向 Flex，每条消息一行 */
  .chat { max-width: 360px; display: flex; flex-direction: column; gap: 12px; }

  /* 单条消息：头像 + 气泡横向排列。max-width: 85% 保证气泡不会长到贴满整行 */
  .msg { display: flex; gap: 8px; max-width: 85%; }

  /* .msg.me = 同时有 msg 和 me 两个类，表示「我发的消息」 */
  .msg.me {
    align-self: flex-end;       /* align-self 只作用于自己，覆盖父容器的 align-items。
                                   在纵向 Flex 里，交叉轴是水平方向，
                                   所以 flex-end 的效果是「把这一条消息推到右边」 */
    flex-direction: row-reverse; /* 主轴方向反转：原本「头像在左、气泡在右」变成「气泡在左、头像在右」，
                                    不需要改 HTML 顺序就能镜像布局 */
  }

  /* 头像：圆角方块（微信风格，不是正圆） */
  .avatar {
    width: 36px; height: 36px; border-radius: 6px;
    background: #ccc; flex-shrink: 0;  /* 不允许被长文本挤扁 */
    display: flex; align-items: center; justify-content: center; font-size: 12px; /* 把里面文字居中 */
  }

  /* 气泡本体 */
  .bubble {
    padding: 10px 12px;
    border-radius: 8px;
    background: #fff;    /* 默认白色 = 对方发的 */
    position: relative;  /* 建立定位参照系，方便以后用 ::before 画气泡小尖角 */
    line-height: 1.5;    /* 行高 1.5 倍，多行文字读起来不挤 */
  }

  /* 自己发的：绿色气泡 */
  /* .msg.me .bubble 读作：在「同时有 msg 和 me 类」的元素内部，找 .bubble。
     前两段中间没空格（同一元素），和 .bubble 之间有空格（后代关系）。 */
  .msg.me .bubble { background: #95ec69; }
  .msg.me .avatar { background: #2f6b4f; color: #fff; }
</style>

<div class="chat">
  <!-- 只有 msg 类 = 对方的消息：左侧头像 + 白气泡 -->
  <div class="msg">
    <div class="avatar">TA</div>
    <div class="bubble">你好，作业写完了吗？</div>
  </div>
  <!-- 多加一个 me 类 = 我的消息：整条靠右 + 顺序反转 + 绿气泡。
       注意 HTML 里头像依然写在气泡前面，是 CSS 的 row-reverse 把它们视觉上调了个头 -->
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  /* html, body 用逗号并集选中两者，都给 height: 100%：
     百分比高度要求父元素有确定高度，所以必须从 html 开始一层层给，
     否则下面消息区的 flex: 1 就没有可分配的高度。 */
  html, body { height: 100%; margin: 0; }

  /* 把 body 自己变成纵向 Flex 容器，形成「顶栏 / 消息区 / 输入栏」三段式布局 */
  body { font: 14px/1.5 system-ui, sans-serif; display: flex; flex-direction: column; max-height: 360px; border: 1px solid #d9e0d8; border-radius: 10px; overflow: hidden; }
  /* max-height 限制总高，overflow: hidden 把超出圆角的部分裁掉 */

  /* 顶栏 */
  .header {
    flex-shrink: 0;      /* 禁止被压缩：高度固定，空间不够时只压缩消息区 */
    padding: 12px 16px;
    background: #2f6b4f;
    color: #fff;
    font-weight: 600;
  }

  /* 中间消息区：占满剩余高度并可独立滚动 */
  .messages {
    flex: 1;                /* 吃掉顶栏和输入栏之外的全部高度 */
    overflow-y: auto;       /* 消息区单独滚动 */
                            /* 因为父容器高度被 max-height 限死了，消息一多这里就出现滚动条，
                               而顶栏和输入栏始终固定可见 */
    padding: 12px;
    background: #ededed;
    display: flex;
    flex-direction: column; /* 消息从上到下排列 */
    gap: 10px;
  }

  /* 气泡 */
  .bubble {
    max-width: 75%;
    width: fit-content;     /* 宽度跟文字走，不要被 flex 拉满整行 */
                            /* fit-content 意思是「刚好包住内容的宽度」，
                               这样短消息的气泡就是短的，不会拉成一整条 */
    padding: 8px 12px;
    border-radius: 8px;
    background: #fff;
    align-self: flex-start; /* 列布局默认 stretch，必须显式取消 */
                            /* 纵向 Flex 的交叉轴是水平方向，align-items 默认 stretch 会把
                               子元素横向拉满；改成 flex-start 才能让气泡靠左并保持自身宽度 */
  }
  /* 加上 me 类：靠右 + 绿色，表示自己发的 */
  .bubble.me { align-self: flex-end; background: #95ec69; }

  /* 底部输入栏 */
  .footer {
    flex-shrink: 0;              /* 同样固定高度，不被压缩 */
    display: flex;
    gap: 8px;
    padding: 10px;
    background: #f7f7f7;
    border-top: 1px solid #ddd;  /* 顶部细线，和消息区分隔 */
  }
  /* flex: 1 让输入框吃掉除按钮之外的全部宽度 */
  .footer input { flex: 1; padding: 8px 12px; border: 1px solid #ccc; border-radius: 6px; font: inherit; }
  .footer button { padding: 8px 16px; border: none; background: #2f6b4f; color: #fff; border-radius: 6px; cursor: pointer; font: inherit; }
</style>

<!-- header 是语义标签，表示某个区块的头部 -->
<header class="header">张三</header>

<!-- 消息容器，id="msgs" 供 JS 往里追加新气泡、以及控制滚动位置 -->
<div class="messages" id="msgs">
  <div class="bubble">在吗？</div>
  <div class="bubble me">在的，什么事？</div>
</div>

<div class="footer">
  <!-- type="text" 是单行文本输入框；
       placeholder 是「占位提示」，只在输入框为空时显示，一开始输入就消失，
       它不是真正的值，所以不能当默认内容用 -->
  <input id="input" type="text" placeholder="输入消息…" />
  <!-- type="button" 表示普通按钮，避免默认提交行为 -->
  <button id="send" type="button">发送</button>
</div>

<script>
  // 先把要反复操作的三个元素缓存到变量里，避免每次都重新查询 DOM
  const msgs = document.getElementById('msgs')
  const input = document.getElementById('input')
  const send = document.getElementById('send')

  // 往消息区追加一条气泡
  // text：消息文字；isMe：true 表示是「我」发的（决定靠左还是靠右）
  function append(text, isMe) {
    const div = document.createElement('div')        // 造一个新的 div 元素
    div.className = 'bubble' + (isMe ? ' me' : '')   // 拼类名：'bubble' 或 'bubble me'。
                                                     // 注意 ' me' 前面那个空格，class 用空格分隔多个类名
    div.textContent = text                           // 用 textContent 写入纯文本：
                                                     // 用户输入的 <b> 之类不会被当标签解析，天然防 XSS
    msgs.appendChild(div)                            // 追加到消息容器末尾，页面上立刻出现
    msgs.scrollTop = msgs.scrollHeight // 滚到最底
    // 原理：scrollHeight 是内容的完整高度（含被滚动隐藏的部分），
    // scrollTop 是当前已向下滚动的距离。把 scrollTop 设成 scrollHeight（一个偏大的值），
    // 浏览器会自动截取到最大可滚动值，于是正好停在最底部，看到最新消息。
  }

  // 点击「发送」
  send.addEventListener('click', () => {
    const t = input.value.trim()  // .value 读输入框当前内容；.trim() 去掉首尾空格
    if (!t) return                // 空字符串在 JS 里是「假值」，所以只输入空格就直接 return 不发送
    append(t, true)               // 先把自己的消息上屏
    input.value = ''              // 清空输入框，方便继续输入
    // 模拟对方回复
    // setTimeout(函数, 毫秒) 表示「等 600 毫秒后执行一次」。
    // 这里纯粹为了模拟网络往返的延迟感；真实项目里这一步换成服务器推送的消息。
    setTimeout(() => append('收到：' + t, false), 600)
  })

  // 键盘支持：在输入框里按回车也能发送
  // keydown 事件在按键「按下」时触发；参数 e 是事件对象，携带这次事件的全部信息
  input.addEventListener('keydown', (e) => {
    // e.key 是按下的键名，回车键就是字符串 'Enter'
    // send.click() 用代码模拟一次点击，直接复用上面的发送逻辑，不必重复写
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  /* margin: 0 让白色分组通栏铺满，模拟手机 App 的全屏效果 */
  body { margin: 0; font: 15px/1.4 system-ui, sans-serif; background: #ededed; }

  .group { margin-top: 12px; }                                  /* 分组之间用灰色间隙隔开 */
  .group-title { padding: 6px 16px; font-size: 13px; color: #888; } /* 分组标题：灰色小字，压在灰底上 */
  .cells { background: #fff; }                                  /* 白色卡片区，承载多个 cell */

  /* 单行设置项 */
  .cell {
    display: flex;
    align-items: center;           /* 图标、文字、箭头竖直居中对齐 */
    padding: 12px 16px;
    border-bottom: 1px solid #eee; /* 行间分割线 */
    cursor: pointer;               /* 小手光标，暗示整行可点 */
  }
  /* :last-child 选中分组里最后一行，去掉分割线，避免和分组间隙叠成双线 */
  .cell:last-child { border-bottom: none; }
  /* :active 是伪类，表示「正在被按下的那一瞬间」（鼠标按住未松开 / 手指触摸中）。
     换个浅灰底就是手机 App 里常见的「按压反馈」，松手立刻恢复。 */
  .cell:active { background: #ececec; }

  .cell-icon { width: 28px; margin-right: 12px; text-align: center; } /* 固定宽度让所有图标纵向对齐成一列 */
  .cell-label { flex: 1; }                                            /* 文字占满中间，把箭头挤到最右 */
  .cell-arrow { color: #ccc; font-size: 18px; }                       /* 右侧 › 箭头，浅灰色表示纯指示 */
</style>

<!-- 一个 group = 一个分组（灰底标题 + 白底若干行） -->
<div class="group">
  <div class="group-title">常用</div>
  <div class="cells">
    <!-- 每行三段：图标 / 文字 / 箭头。这里用 span 是因为它们都只是行内的小片段 -->
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; background: #f4f7f5; }

  /* 动态卡片外壳 */
  .feed {
    max-width: 400px;
    padding: 14px;
    background: #fff;
    border-radius: 10px;
  }

  .head { display: flex; gap: 10px; margin-bottom: 10px; } /* 头像 + 昵称一行 */
  .avatar { width: 40px; height: 40px; border-radius: 6px; background: #2f6b4f; color: #fff; display: flex; align-items: center; justify-content: center; }
  /* 上面这行：固定 40x40 的圆角方块头像，内部用 Flex 把姓氏居中 */
  .name { font-weight: 600; color: #576b95; } /* 蓝色昵称，是微信朋友圈的标志性配色 */
  .text { margin: 0 0 10px; line-height: 1.6; } /* 正文：清掉上边距，只留下方 10px */

  /* 九宫格图片区：Grid 二维布局最典型的用法 */
  .pics {
    display: grid;                          /* 开启网格布局 */
    grid-template-columns: repeat(3, 1fr);  /* 定义三列。1fr 表示「占 1 份剩余空间」，
                                               三列各 1fr 就是等分；repeat(3, 1fr) 是
                                               「1fr 1fr 1fr」的简写。
                                               行数不用声明，子元素满了会自动换到下一行 */
    gap: 4px;                               /* 格子之间的缝隙（行与列都是 4px） */
    max-width: 240px;
  }
  /* aspect-ratio: 1 表示「宽高比 1:1」：只要宽度定了，高度自动等于宽度，
     所以图片格永远是正方形，不用手写 height，响应式也不会变形 */
  .pic { aspect-ratio: 1; background: #d9ebe1; border-radius: 4px; }

  /* 底部一行：左边时间、右边操作，用 space-between 顶到两端 */
  .meta { margin-top: 10px; font-size: 12px; color: #9bb5a6; display: flex; justify-content: space-between; }
  /* .actions button 后代选择器：把操作区里的按钮改造成「看起来像文字链接」的样子 */
  .actions button { border: none; background: none; font: inherit; color: #576b95; cursor: pointer; }
</style>

<!-- article：一条动态是可独立存在的内容单元 -->
<article class="feed">
  <div class="head">
    <div class="avatar">李</div>
    <div class="name">李同学</div>
  </div>
  <p class="text">今天把 Flex 作业交啦，九宫格只是占位～</p>
  <!-- 6 个空 div 当图片占位；因为父级是三列 Grid，它们会自动排成 3 列 2 行 -->
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .profile { max-width: 400px; }

  /* 顶部封面图 */
  .cover {
    height: 140px;
    background: linear-gradient(135deg, #6fcf97, #2f6b4f); /* 135deg 从左上到右下的渐变，代替真实图片 */
    border-radius: 12px 12px 0 0; /* 四个值按「左上 右上 右下 左下」顺时针顺序：
                                     只给上面两个角加圆角，下面接着白色卡片所以保持方角 */
  }

  /* 下方信息卡片（这里的 .body 是自定义类名，与 <body> 标签无关） */
  .body {
    position: relative;           /* 建立定位参照系（也让它盖在封面之上） */
    padding: 0 16px 16px;         /* 上 0 / 左右 16px / 下 16px。
                                     上面留 0 是因为头像要用负 margin 顶出去 */
    background: #fff;
    border: 1px solid #d9e0d8;
    border-top: none;             /* 去掉上边框，和封面无缝衔接 */
    border-radius: 0 0 12px 12px; /* 只给下面两个角加圆角，和封面正好拼成一张卡 */
  }

  /* 头像负 margin 向上叠到封面 */
  .avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;      /* 正圆 */
    border: 3px solid #fff;  /* 白色描边，让头像从深色封面上「脱离」出来 */
    background: #eef6f1;
    margin-top: -36px;       /* 负外边距 = 向上位移。-36px 正好是自身高度的一半，
                                所以头像有一半压在封面上、一半在白卡片里。
                                和 position 不同，负 margin 仍然参与文档流，
                                后面的元素会跟着一起上移 */
    display: flex;           /* 内部用 Flex 把姓氏居中 */
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 700;
    color: #2f6b4f;
  }

  .name { margin: 8px 0 4px; font-size: 18px; font-weight: 700; }
  .bio { margin: 0; color: #5c6b62; font-size: 13px; }
  .stats { display: flex; gap: 20px; margin-top: 12px; font-size: 13px; } /* 三组数据横向排开 */
  /* strong 默认是行内元素，改成 block 后数字独占一行，形成「数字在上、标签在下」 */
  .stats strong { display: block; font-size: 16px; }
</style>

<div class="profile">
  <!-- 空 div 当封面：内容为空，靠 CSS 的 height 和渐变背景撑出来 -->
  <div class="cover"></div>
  <div class="body">
    <div class="avatar">张</div>
    <!-- h2 是二级标题，这里是这块内容的主标题（用户名） -->
    <h2 class="name">张三</h2>
    <p class="bio">前端学习者 · 爱写 Demo</p>
    <div class="stats">
      <!-- strong 表示「重要内容」，语义上比 b 更强，读屏软件会加重语气 -->
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  /* padding-bottom: 56px 是关键：底部工具栏用了 fixed 定位，不占文档空间，
     如果不预留这块内边距，正文最后几行会被工具栏盖住。 */
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; min-height: 200px; position: relative; padding-bottom: 56px; }

  .content { padding: 16px; } /* 正文区内边距 */

  /* 底部互动栏 */
  .bar {
    position: fixed;                    /* 固定定位：相对「浏览器视口」而不是页面，
                                           所以页面滚动时它一直钉在屏幕底部 */
    left: 0; right: 0; bottom: 0;       /* 左右都为 0 = 横向拉满；bottom: 0 = 贴住视口底边 */
    display: flex;
    justify-content: space-around;      /* 四个按钮均匀分布，每个按钮左右两侧的留白相等
                                           （对比 space-between 是「两端顶到边」） */
    padding: 10px 0;
    background: #fff;
    border-top: 1px solid #eee;
    box-shadow: 0 -2px 8px rgba(0,0,0,.04); /* 垂直偏移写成负值 -2px，阴影就朝«上方»扩散，
                                               营造工具栏浮在内容之上的感觉 */
  }

  /* .bar button 后代选择器：栏里的每个按钮都是「图标在上、文字在下」的纵向小块 */
  .bar button {
    border: none;
    background: none;
    font: inherit;
    cursor: pointer;
    color: #5c6b62;
    display: flex;
    flex-direction: column; /* 纵向排列，让图标和文字上下堆叠 */
    align-items: center;    /* 水平居中对齐 */
    gap: 2px;
    font-size: 12px;
  }
  /* 点赞后由 JS 加上 liked 类，整个按钮变红 */
  .bar button.liked { color: #c53030; }
  /* 三层后代关系：.bar 里的 button 里的 .icon，只放大图标不影响下面的文字 */
  .bar button .icon { font-size: 20px; }
</style>

<div class="content">
  <h3>文章标题</h3>
  <p>正文内容… 底部互动栏固定在视口底部。</p>
</div>

<div class="bar">
  <!-- 只有点赞按钮需要交互，所以给它和它的数字各一个 id 供 JS 使用 -->
  <button id="like" type="button"><span class="icon">♡</span><span id="likeN">赞 0</span></button>
  <!-- 其余三个只是静态展示，没有 id 也没有事件 -->
  <button type="button"><span class="icon">💬</span>评论</button>
  <button type="button"><span class="icon">↗</span>分享</button>
  <button type="button"><span class="icon">★</span>收藏</button>
</div>

<script>
  const likeBtn = document.getElementById('like')
  const likeN = document.getElementById('likeN')

  // 用 let 声明「会变化」的状态变量（const 声明的变量不能重新赋值）
  let n = 0          // 点赞总数
  let liked = false  // 我是否已点赞

  likeBtn.addEventListener('click', () => {
    liked = !liked        // ! 是逻辑非，把 true/false 取反 —— 一行实现「切换」
    n += liked ? 1 : -1   // 刚点赞就 +1，取消点赞就 -1；n += x 等价于 n = n + x

    // classList.toggle(类名, 布尔值)：第二个参数为 true 时添加该类，false 时移除。
    // 只写一个参数时是「有就删、没有就加」；这里显式传 liked，让类名和状态严格同步。
    likeBtn.classList.toggle('liked', liked)

    // querySelector 在这个按钮内部找第一个 .icon（不是全页面找），
    // 然后把空心 ♡ 换成实心 ♥
    likeBtn.querySelector('.icon').textContent = liked ? '♥' : '♡'

    // 更新数字文案
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 表单：纵向 Flex，gap 统一管理各字段之间的距离，不用逐个写 margin */
  .form { max-width: 320px; display: flex; flex-direction: column; gap: 16px; }

  /* .field label 后代选择器：每个字段里的标签文字 */
  .field label {
    display: block;      /* label 默认是行内元素，改成 block 后独占一行，
                            输入框才会被挤到它下面（这就是「标签在上」的实现方式） */
    margin-bottom: 6px;
    font-weight: 600;
    font-size: 13px;
  }

  /* 逗号并集选择器：单行输入框和多行文本域共用同一套外观 */
  .field input, .field textarea {
    width: 100%;               /* 撑满字段宽度；配合 border-box 才不会因为 padding 而溢出 */
    padding: 10px 12px;
    border: 1px solid #d9e0d8;
    border-radius: 8px;
    font: inherit;             /* 表单控件默认用系统字体，必须显式继承页面字体 */
  }

  /* :focus 是伪类，表示元素「获得焦点」时（鼠标点进输入框、或用键盘 Tab 键切到它） */
  .field input:focus, .field textarea:focus {
    outline: none;                             /* 去掉浏览器默认的蓝色/黑色焦点轮廓。
                                                  注意：去掉后一定要自己补一个可见的焦点样式，
                                                  否则键盘用户会不知道自己停在哪里 */
    border-color: #2f6b4f;                     /* 边框变主题绿 */
    box-shadow: 0 0 0 2px rgba(47,107,79,.15); /* 偏移和模糊都为 0、只给 2px 扩散半径，
                                                  等于在边框外套一圈淡绿光环，替代原生 outline */
  }

  /* button[type="submit"] 是属性选择器：只命中 type 属性等于 submit 的 button */
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

<!-- form 是表单容器，语义上表示「一组要一起提交的数据」 -->
<form class="form">
  <!-- 每个 .field 包住「一个标签 + 一个控件」，是表单里最常见的分组方式 -->
  <div class="field">
    <!-- label 的 for 必须等于对应控件的 id，两者就此绑定：
         点击文字也能聚焦输入框，读屏软件也知道这个框叫什么。for 和 id 写错就失效 -->
    <label for="name">姓名</label>
    <!-- type="text" 普通单行文本 -->
    <input id="name" type="text" placeholder="请输入姓名" />
  </div>
  <div class="field">
    <label for="email">邮箱</label>
    <!-- type="email" 会让浏览器自带格式校验，手机上还会弹出带 @ 的键盘 -->
    <input id="email" type="email" placeholder="you@example.com" />
  </div>
  <div class="field">
    <label for="msg">留言</label>
    <!-- textarea 是多行文本域，rows="3" 指定初始显示 3 行高。
         注意它是双标签，默认值要写在标签之间（不像 input 用 value 属性） -->
    <textarea id="msg" rows="3" placeholder="想说点什么…"></textarea>
  </div>
  <!-- type="submit"：点击会提交所在的 form（本 Demo 没写提交处理，会走浏览器默认行为） -->
  <button type="submit">提交</button>
</form>`,
  },
  {
    id: 'p3-form-label-left',
    title: '标签在左（Grid）',
    group: '10-表单布局',
    summary: 'grid 两列：左 label 右 input',
    code: `<style>
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 表单用 Grid 做成两列：所有 label 自动落在第 1 列，所有控件落在第 2 列。
     好处是不需要给每一行套一层 div，HTML 结构更扁平。 */
  .form {
    max-width: 420px;
    display: grid;
    grid-template-columns: 80px 1fr; /* 左列固定宽，右列自适应 */
                                     /* 1fr 表示「占满剩下的空间」，所以窗口变宽时只有输入框变宽 */
    gap: 12px 16px;                  /* 两个值分别是「行间距 12px，列间距 16px」 */
    align-items: center;             /* 每一行内，label 和控件竖直居中对齐 */
  }

  /* label 右对齐，让文字紧靠着输入框，视觉上成组 */
  .form label { text-align: right; color: #5c6b62; font-size: 13px; }

  /* 并集选择器：输入框和下拉框共用外观 */
  .form input, .form select {
    padding: 8px 10px;
    border: 1px solid #d9e0d8;
    border-radius: 6px;
    font: inherit;
  }

  .span2 { grid-column: 1 / -1; } /* 横跨两列 */
  /* grid-column 写「起始线 / 结束线」。网格线从 1 开始编号，-1 表示最后一条线，
     所以 1 / -1 就是「从最左跨到最右」，常用来放通栏的说明或分隔线 */

  /* 只指定起始列 = 放在第 2 列（也就是和输入框对齐的那一列），
     这样按钮不会跑到 label 那一列去 */
  .actions { grid-column: 2; }

  /* 这里直接用标签选择器 button，会命中本 Demo 里所有按钮（只有一个，够用） */
  button { padding: 8px 20px; border: none; background: #2f6b4f; color: #fff; border-radius: 6px; font: inherit; cursor: pointer; }
</style>

<!-- 注意：下面的 label 和 input 都是 form 的直接子元素，
     Grid 会按它们出现的顺序自动填格：第 1 个进第 1 列、第 2 个进第 2 列、第 3 个换行… -->
<form class="form">
  <!-- for="u" 与 input 的 id="u" 配对，点「用户名」三个字就能聚焦输入框 -->
  <label for="u">用户名</label>
  <input id="u" type="text" />
  <label for="p">密码</label>
  <!-- type="password" 让输入内容显示成圆点，防止被旁人看到 -->
  <input id="p" type="password" />
  <label for="role">角色</label>
  <select id="role"><option>学生</option><option>教师</option></select>
  <!-- 按钮外面包一层 div，是为了用 .actions 把它固定在第 2 列 -->
  <div class="actions"><button type="submit">保存</button></div>
</form>`,
  },
  {
    id: 'p3-inline-search',
    title: '行内搜索栏',
    group: '10-表单布局',
    summary: '圆角搜索框 + 图标 + 清除',
    code: `<style>
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 思路：外层容器画出「搜索框」的外观（灰底 + 药丸圆角），
     里面真正的 input 反而做成完全透明无边框，视觉上融为一体。 */
  .search {
    display: flex;
    align-items: center;  /* 放大镜、输入框、叉号竖直居中 */
    gap: 8px;
    max-width: 360px;
    padding: 8px 12px;
    background: #eef2ee;
    border-radius: 999px; /* 远大于高度的值 = 两端半圆的药丸形 */
  }

  .search input {
    flex: 1;                 /* 吃掉图标和按钮之外的全部宽度 */
    border: none;            /* 去掉 input 默认边框 */
    background: transparent; /* 透明背景，透出容器的灰底 */
    font: inherit;
    outline: none;           /* 去掉聚焦时的默认轮廓线（本例靠容器整体表达焦点区域） */
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
  <!-- 放大镜只是装饰，aria-hidden="true" 让读屏软件跳过它，不去念「放大镜」 -->
  <span aria-hidden="true">🔍</span>
  <!-- type="search" 语义上表示搜索框；部分浏览器会提供历史建议等增强 -->
  <input id="q" type="search" placeholder="搜索课程、文章…" />
  <!-- hidden 是 HTML 布尔属性：写上就等于「隐藏这个元素」（相当于 display: none）。
       一开始输入框是空的，没什么可清除，所以先隐藏；JS 会根据输入内容切换它 -->
  <button id="clear" type="button" hidden>✕</button>
</form>

<script>
  const q = document.getElementById('q')
  const clear = document.getElementById('clear')

  // input 事件：只要输入框的内容发生变化就触发（打字、删除、粘贴、拖入文本都算）。
  // 它比 keydown 更可靠——keydown 在按键按下的瞬间触发，此时 value 还没更新，
  // 而且鼠标粘贴根本不会触发键盘事件。
  q.addEventListener('input', () => {
    // q.value.length === 0 表示「内容为空」，结果是 true/false，
    // 直接赋给 hidden：空 → true 隐藏叉号；有字 → false 显示叉号
    clear.hidden = q.value.length === 0
  })

  clear.addEventListener('click', () => {
    q.value = ''       // 清空输入框内容
    clear.hidden = true // 已经空了，把叉号收起来
    q.focus()          // focus() 让输入框重新获得焦点、光标回到框内，
                       // 用户可以直接接着打字，不用再点一次。这是个很重要的体验细节
  })
</script>`,
  },
  {
    id: 'p3-login-card',
    title: '居中登录卡片',
    group: '10-表单布局',
    summary: 'flex 居中 + 白卡片 + 表单',
    code: `<style>
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  /* html, body 都设 height: 100% 是「垂直居中」的前提：
     要让卡片在竖直方向居中，容器必须先有确定的高度，
     而 body 的高度默认由内容决定，所以要一层层继承到视口高度。 */
  html, body { height: 100%; margin: 0; }

  /* 把 body 变成 Flex 容器，一行代码实现水平 + 垂直双向居中 —— 最常用的居中方案 */
  body {
    display: flex;
    align-items: center;     /* 交叉轴（竖直）居中 */
    justify-content: center; /* 主轴（水平）居中 */
    background: #f4f7f5;
    font: 14px/1.5 system-ui, sans-serif;
  }

  /* 登录卡片 */
  .card {
    width: 100%;                            /* 先占满可用宽度… */
    max-width: 340px;                       /* …再用 max-width 限制上限。
                                               这对组合让卡片在小屏自动变窄、大屏不至于过宽 */
    padding: 28px 24px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(31,42,36,.1); /* 下移 8px、模糊 24px 的柔和大阴影，
                                                 让卡片明显「浮」在背景之上 */
  }

  .card h2 { margin: 0 0 20px; text-align: center; } /* 标题居中，清掉默认上边距 */

  .field { margin-bottom: 14px; } /* 每个输入行之间的间距 */
  .field input {
    width: 100%;               /* 撑满卡片宽度 */
    padding: 10px 12px;
    border: 1px solid #d9e0d8;
    border-radius: 8px;
    font: inherit;
  }

  /* 主按钮：通栏大按钮 */
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

  /* button.link 是「标签 + 类」的组合选择器（中间无空格），
     表示「同时是 button 且带 link 类」的元素。
     这里专门用来剥掉 button 的原生外观，让它看起来像一个纯文字链接。 */
  button.link {
    border: 0; background: transparent; font: inherit; cursor: pointer; padding: 0;
  }
  /* 这条只按类名匹配，负责排版：display: block + width 撑满后配合 text-align: center 实现居中 */
  .link { display: block; margin-top: 12px; text-align: center; font-size: 13px; color: #2f6b4f; }
</style>

<!-- 卡片是 body 的唯一子元素，所以会被 body 的 Flex 居中规则摆到屏幕正中央 -->
<div class="card">
  <h2>登录</h2>
  <form>
    <!-- 这里没有写 label，而是靠 placeholder 提示。
         真实产品建议补上 label（可视觉隐藏），否则读屏用户不知道该填什么 -->
    <div class="field"><input type="text" placeholder="手机号 / 邮箱" /></div>
    <div class="field"><input type="password" placeholder="密码" /></div>
    <!-- 登录用 type="submit"：这样在输入框里按回车也能提交，符合用户习惯 -->
    <button class="submit" type="submit">登 录</button>
    <!-- 「忘记密码」用 type="button"：它只是个跳转入口，
         不写 type 的话在 form 里会被当成 submit，点一下就误提交表单了 -->
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .form { max-width: 320px; }
  .field { margin-bottom: 14px; }
  .field label { display: block; margin-bottom: 6px; font-weight: 600; font-size: 13px; } /* block 让标签独占一行 */
  .field input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d9e0d8; /* 正常状态：浅灰边框 */
    border-radius: 8px;
    font: inherit;
  }

  /* 核心思路：只在最外层 .field 上加/减一个 error 类，
     内部的边框颜色和提示语显隐全部由 CSS 联动完成，JS 只需管一个类名。 */

  /* .field.error input：「同时有 field 和 error 类」的元素内部的 input → 边框变红 */
  .field.error input { border-color: #c53030; }

  /* 提示语平时隐藏（display: none 完全不渲染、不占空间） */
  .tip { margin-top: 4px; font-size: 12px; color: #c53030; display: none; }
  /* 一旦父级有 error 类，提示语就显示出来 */
  .field.error .tip { display: block; }

  button { padding: 10px 20px; border: none; background: #2f6b4f; color: #fff; border-radius: 8px; font: inherit; cursor: pointer; }
</style>

<!-- id="form" 供 JS 监听提交事件 -->
<form class="form" id="form">
  <!-- id="emailField" 指向整个字段容器：error 类就是加在它身上的 -->
  <div class="field" id="emailField">
    <label for="email">邮箱</label>
    <input id="email" type="email" placeholder="you@example.com" />
    <!-- 错误提示先写在 HTML 里但用 CSS 隐藏，比用 JS 动态创建更简单可靠 -->
    <p class="tip">请输入有效的邮箱地址</p>
  </div>
  <button type="submit">提交</button>
</form>

<script>
  const form = document.getElementById('form')
  const emailField = document.getElementById('emailField')
  const email = document.getElementById('email')

  // submit 事件监听在 form 上（不是按钮上）：
  // 这样无论是点提交按钮、还是在输入框里按回车，都会走到这里
  form.addEventListener('submit', (e) => {
    // e 是事件对象。preventDefault() 阻止浏览器的默认行为——
    // 表单默认会把数据发给服务器并刷新整个页面，那样 JS 校验结果就看不到了。
    // 前端校验、单页应用里几乎必写这一行。
    e.preventDefault()

    // 两个斜杠之间的是「正则表达式」，用来描述一种文本模式：
    //   ^ 开头、$ 结尾（保证整段都要匹配，而不是只匹配其中一部分）
    //   [^\\s@]+ 表示「一个或多个既不是空白也不是 @ 的字符」（^ 在方括号内表示取反）
    //   连起来就是：一段字符 + @ + 一段字符 + . + 一段字符
    // .test(字符串) 返回 true / false，表示是否匹配。
    // trim() 先去掉用户可能误输的首尾空格。
    const ok = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value.trim())

    // toggle 的第二个参数决定「加还是删」：校验失败(!ok 为 true)就加 error，成功就删掉
    emailField.classList.toggle('error', !ok)

    // alert 弹出系统对话框，会阻塞页面，只适合演示；实际项目请用页面内提示
    if (ok) alert('提交成功！')
  })

  // 体验优化：用户一开始重新输入，就立刻清掉红色报错，
  // 而不是让错误提示一直挂着（等下次提交再校验）
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 轮播轨道：横向滚动 + 滚动吸附，全程不需要一行 JS */
  .carousel {
    display: flex;
    gap: 12px;
    overflow-x: auto;              /* 横向滚动 */
                                   /* 子项总宽度超过容器时出现横向滚动条；
                                      如果这里写 hidden，内容就会被裁掉且无法滚动 */
    scroll-snap-type: x mandatory; /* 滚动结束后吸附到 snap 点 */
                                   /* x 表示只在水平方向吸附；
                                      mandatory 是「必须吸附」，松手一定会对齐到某一张；
                                      换成 proximity 则是「离得近才吸附」，比较宽松 */
    padding: 8px 4px 16px;         /* 上 8 / 左右 4 / 下 16px，下方多留些空间给滚动条 */
    max-width: 100%;
  }

  /* ::-webkit-scrollbar 是 WebKit 内核浏览器的私有伪元素，用来美化滚动条；
     横向滚动条要调的是 height（纵向滚动条才调 width） */
  .carousel::-webkit-scrollbar { height: 6px; }
  .carousel::-webkit-scrollbar-thumb { background: #9bb5a6; border-radius: 3px; } /* thumb 是可拖动的滑块 */

  .slide {
    flex: 0 0 240px;               /* 不伸缩，固定宽 */
                                   /* flex 是三个属性的缩写：flex-grow / flex-shrink / flex-basis。
                                      0 不放大、0 不缩小、基准宽度 240px，
                                      所以每张卡片永远是 240px，宽度不够就靠滚动看 */
    scroll-snap-align: start;      /* 吸附对齐点 */
                                   /* start 表示「以自己的左边缘对齐容器左边缘」，
                                      所以每次滚动都会停在一张卡片的开头，不会停在两张之间 */
    height: 140px;
    border-radius: 12px;
    display: flex;                 /* 内部再用 Flex 把文字双向居中 */
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 20px;
    font-weight: 700;
  }

  /* :nth-child(n) 是伪类，按「在父元素里排第几个」来选中元素（从 1 开始数）。
     这里用它给 4 张卡片分别上不同颜色，就不用写 4 个 class 了。 */
  .slide:nth-child(1) { background: #2f6b4f; }
  .slide:nth-child(2) { background: #6fcf97; }
  .slide:nth-child(3) { background: #3d7a5c; }
  .slide:nth-child(4) { background: #1a4d38; }

  .hint { font-size: 12px; color: #5c6b62; }
</style>

<p class="hint">手指或鼠标拖动横向滚动，松手会自动吸附到整张 slide</p>
<!-- 4 张卡片是 .carousel 的直接子元素，才能被 :nth-child 和 Flex 正确处理 -->
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .wrap { max-width: 320px; } /* 整个轮播组件的宽度上限 */

  /* 轮播的核心结构分两层：
     .viewport 是「窗口」，固定大小并把溢出裁掉；
     .track 是「长轨道」，把 3 张卡片横向排成一长条，然后整体左右平移。
     每次只有窗口范围内的那一张能被看到。 */
  .viewport { overflow: hidden; border-radius: 12px; } /* hidden 把窗口外的卡片藏起来，这是关键 */

  .track {
    display: flex;                 /* 三张卡片横向排成一行 */
    transition: transform .3s ease;
    /* 过渡动画：当 transform 变化时用 0.3 秒平滑移动。
       ease 是缓动曲线，表示「先快后慢」，比匀速(linear)更自然。
       正因为有这一行，JS 里改一下 transform 就有滑动效果 */
  }

  .slide {
    flex: 0 0 100%;   /* 不放大、不缩小、基准宽度 = 窗口的 100%。
                         所以每张卡片正好占满窗口，三张就是 300% 长的轨道 */
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 22px;
    font-weight: 700;
  }
  /* :nth-child(n) 按次序选中第 n 个子元素，给三张卡片配不同底色 */
  .slide:nth-child(1) { background: #2f6b4f; }
  .slide:nth-child(2) { background: #6fcf97; color: #1f2a24; } /* 浅底配深字，保证对比度 */
  .slide:nth-child(3) { background: #3d7a5c; }

  /* 控制条：左箭头 / 圆点 / 右箭头 */
  .ctrl { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 12px; }
  .ctrl button { padding: 6px 14px; border: 1px solid #d9e0d8; background: #fff; border-radius: 6px; cursor: pointer; font: inherit; }

  .dots { display: flex; gap: 6px; }
  /* 圆点其实是 button（可点击、可键盘操作），
     所以要清掉 border 和 padding，才能真正变成一个 8x8 的小圆 */
  .dot { width: 8px; height: 8px; border-radius: 50%; background: #d9e0d8; border: none; padding: 0; cursor: pointer; }
  .dot.active { background: #2f6b4f; } /* 当前页的圆点染成深绿 */
</style>

<div class="wrap">
  <!-- 窗口层：负责裁剪 -->
  <div class="viewport">
    <!-- 轨道层：id="track" 供 JS 修改它的 transform 来平移 -->
    <div class="track" id="track">
      <div class="slide">1 / 3</div>
      <div class="slide">2 / 3</div>
      <div class="slide">3 / 3</div>
    </div>
  </div>
  <div class="ctrl">
    <button id="prev" type="button">‹</button>
    <!-- 圆点容器故意留空，由 JS 按卡片数量动态生成，卡片增减时不用改 HTML -->
    <div class="dots" id="dots"></div>
    <button id="next" type="button">›</button>
  </div>
</div>

<script>
  const track = document.getElementById('track')
  const dotsEl = document.getElementById('dots')

  // children 是「元素子节点」的集合，.length 就是卡片数量（这里是 3）。
  // 动态读取而不是写死 3，以后加卡片时 JS 无需改动。
  const total = track.children.length

  // index 记录当前显示第几张（从 0 开始），是这个组件唯一的状态
  let index = 0

  // 生成圆点
  for (let i = 0; i < total; i++) {
    const d = document.createElement('button')
    d.className = 'dot' + (i === 0 ? ' active' : '') // 第一个圆点默认高亮
    d.type = 'button'                                // 等价于 HTML 里的 type="button"
    // 给每个圆点绑点击事件，跳到对应的第 i 张。
    // 这里的箭头函数「记住」了本轮循环的 i（因为用 let 声明，每轮都是独立变量），
    // 这个特性叫闭包 —— 如果换成 var，所有圆点都会跳到最后一张。
    d.addEventListener('click', () => go(i))
    dotsEl.appendChild(d)
  }

  // 圆点已经全部插入页面，现在才能一次性查出来备用
  const dots = dotsEl.querySelectorAll('.dot')

  // 切换到第 i 张
  function go(i) {
    index = (i + total) % total // 循环：-1 变最后一张
    // 取余技巧：i 为 3（越过最后一张）时 3 % 3 = 0 回到第一张；
    // i 为 -1 时先加 total 变成 2，再取余得 2，即最后一张。
    // 先 + total 是为了避开 JS 里负数取余仍为负数的问题。

    // 平移轨道：显示第 2 张就往左移 100%，第 3 张移 200%。
    // 注意百分比是相对轨道自身宽度的…这里 slide 宽度等于窗口宽度，
    // 而 translateX 的百分比按元素自身宽度算，轨道宽 = 3 张，所以恰好每张对应 100% 的窗口宽度。
    track.style.transform = 'translateX(-' + (index * 100) + '%)'

    // 同步圆点高亮：j 是圆点下标，只有 j 等于当前 index 的那个才为 true
    dots.forEach((d, j) => d.classList.toggle('active', j === index))
  }

  // 上一张 / 下一张：直接把 index±1 交给 go，越界由 go 里的取余兜住
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 可拖拽的横向列表 */
  .scroller {
    display: flex;
    gap: 10px;
    overflow-x: auto;  /* 允许横向滚动：JS 改 scrollLeft 才有效果 */
    padding: 12px 4px;
    cursor: grab;      /* grab 是「一只张开的手」光标，暗示这里可以抓起来拖 */
    user-select: none; /* 拖拽时不选中文字 */
                       /* 不加这行的话，按住鼠标横向移动会变成「选中文字」，
                          出现蓝色高亮，拖动手感很糟 */
    max-width: 100%;
  }
  /* 拖拽进行中由 JS 加上 dragging 类，光标换成 grabbing（握紧的手），
     给用户「已经抓住了」的即时反馈 */
  .scroller.dragging { cursor: grabbing; }

  /* 用 WebKit 私有伪元素把滚动条整个隐藏（仍然可以滚，只是看不见滑轨），
     因为这个 Demo 主打鼠标拖拽 */
  .scroller::-webkit-scrollbar { display: none; }

  .item {
    flex: 0 0 100px;   /* 不放大不缩小，固定 100px 宽，保证总宽超出容器才能滚动 */
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

  // 拖拽这类交互都需要「记住按下时的初始状态」，所以要三个变量：
  let isDown = false    // 鼠标当前是否处于按下状态（没按下时移动鼠标不能滚动）
  let startX = 0        // 按下瞬间鼠标的横坐标
  let scrollStart = 0   // 按下瞬间容器已经滚动了多少

  // 第一步：按下鼠标，记录起点
  el.addEventListener('mousedown', (e) => {
    isDown = true
    el.classList.add('dragging')  // 切换成 grabbing 光标
    startX = e.pageX              // e.pageX 是鼠标相对整个页面左边缘的横坐标（单位 px）
    scrollStart = el.scrollLeft   // scrollLeft 是容器当前横向滚动的距离
  })

  // 第二步：松开鼠标，结束拖拽。
  // 注意监听的是 window 而不是 el —— 用户很可能把鼠标拖到列表外面才松手，
  // 如果只监听 el 就收不到这个 mouseup，isDown 会一直是 true，导致「粘住鼠标」的 bug。
  window.addEventListener('mouseup', () => {
    isDown = false
    el.classList.remove('dragging')
  })

  // 第三步：移动鼠标，按位移量改变滚动位置
  el.addEventListener('mousemove', (e) => {
    if (!isDown) return   // 没按下就直接退出，什么也不做（这叫「卫语句」，避免层层嵌套 if）
    e.preventDefault()    // 阻止浏览器默认的拖拽/选中行为，让拖动更干净
    const dx = e.pageX - startX     // dx = 从按下到现在，鼠标横向移动了多少（右移为正）
    el.scrollLeft = scrollStart - dx // 反向移动 scroll
    // 为什么用减号：手指/鼠标往右拖，是想把内容也往右带，
    // 也就是要「看到更左边的内容」，滚动距离应该变小，所以是起始值减去位移。
  })
</script>`,
  },
  {
    id: 'p3-range-slider',
    title: '自定义 Range 滑块',
    group: '11-轮播拖拽交互',
    summary: 'input[type=range] + 实时数值显示',
    code: `<style>
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .slider-box { max-width: 320px; }
  /* 标题行：左边「音量」、右边数值，space-between 把两者顶到两端 */
  .row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
  .value { font-size: 18px; font-weight: 700; color: #2f6b4f; }

  /* input[type="range"] 是属性选择器：只命中 type 等于 range 的 input，
     不会误伤页面上其它类型的输入框 */
  input[type="range"] {
    width: 100%;
    accent-color: #2f6b4f; /* 现代浏览器：滑块主题色 */
                           /* accent-color 是一个便捷属性，能一次性给 range、checkbox、radio
                              这些原生控件换主题色，不用再写一堆浏览器私有伪元素 */
  }

  /* 下方的进度条预览：外层是灰色底槽 */
  .preview {
    margin-top: 16px;
    height: 8px;
    background: #eef2ee;
    border-radius: 4px;
    overflow: hidden;  /* 把里面绿色填充条超出圆角的直角部分裁掉，两端才是圆的 */
  }
  /* 内层是绿色填充条，JS 只需要改它的 width 百分比 */
  .fill {
    height: 100%;          /* 撑满底槽高度 */
    background: #2f6b4f;
    width: 50%;            /* 初始 50%，与下面 input 的 value="50" 保持一致 */
    transition: width .1s; /* width 变化时用 0.1 秒过渡。时间很短，
                              这样跟手感强又不显得生硬（太长会有拖沓的延迟感） */
  }
</style>

<div class="slider-box">
  <div class="row">
    <span>音量</span>
    <!-- id="val" 供 JS 实时写入当前数值 -->
    <span class="value" id="val">50</span>
  </div>
  <!-- type="range" 是原生滑块控件：
       min / max 定义取值范围，value 是初始值。
       还可以加 step 控制步进（默认 1）。 -->
  <input id="range" type="range" min="0" max="100" value="50" />
  <!-- 底槽套填充条的两层结构，是做进度条最常见的写法 -->
  <div class="preview"><div class="fill" id="fill"></div></div>
</div>

<script>
  const range = document.getElementById('range')
  const val = document.getElementById('val')
  const fill = document.getElementById('fill')

  // 把「读取滑块值 → 更新界面」抽成一个函数，事件里和初始化时都能复用
  function update() {
    const v = range.value  // 注意：表单控件的 value 永远是字符串，这里拿到的是 '50' 而不是 50
    val.textContent = v    // 显示数字
    fill.style.width = v + '%' // 拼上百分号写成行内样式；
                               // 因为 v 是字符串，加号在这里是字符串拼接，得到 '50%'
  }

  // range 的 input 事件在拖动过程中持续触发，所以数值和进度条能实时跟着动。
  // （对比 change 事件：它只在松手后触发一次，那样界面会「一顿一顿」的）
  // 这里把函数名直接传进去，不要写成 update()——加括号就变成「立刻执行并把返回值传进去」了
  range.addEventListener('input', update)

  // 页面加载时主动调用一次，保证界面和 input 的初始 value 对得上，
  // 以后改了 HTML 里的 value="30" 也不用同步改 CSS
  update()
</script>`,
  },
  {
    id: 'p3-accordion',
    title: '手风琴 Accordion',
    group: '11-轮播拖拽交互',
    summary: 'details/summary 原生折叠，零 JS',
    code: `<style>
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; }

  .acc { max-width: 360px; border: 1px solid #d9e0d8; border-radius: 10px; overflow: hidden; }

  /* details 是原生「折叠面板」标签，浏览器自带展开/收起功能，不需要写 JS */
  details { border-bottom: 1px solid #eef2ee; }
  details:last-child { border-bottom: none; } /* :last-child 去掉末项分割线 */

  /* summary 是 details 的第一个子元素，充当「可点击的标题」；
     它后面的其它内容就是展开后才显示的部分 */
  summary {
    padding: 12px 16px;
    cursor: pointer;
    font-weight: 600;
    list-style: none; /* 去掉默认三角（部分浏览器） */
                      /* summary 在规范里带有 list-item 的显示特性，
                         所以是用 list-style 而不是别的属性来去掉那个小三角 */
  }
  /* Safari / 旧版 Chrome 需要额外用这个私有伪元素才能彻底去掉三角标记 */
  summary::-webkit-details-marker { display: none; }

  /* 用 ::after 伪元素在标题后面插入一个自定义的「+」号当展开指示器 */
  summary::after {
    content: '+';     /* 伪元素必须写 content，否则不会生成 */
    float: right;     /* 浮动到右边（老办法，但在这种单个小元素上很好用） */
    color: #9bb5a6;
  }
  /* details[open] 是属性选择器：details 展开时浏览器会自动给它加上 open 属性，
     于是这条规则只在展开状态生效，把加号换成减号。
     整条读作：「处于展开状态的 details」里的 summary 的 ::after 伪元素。 */
  details[open] summary::after { content: '−'; }

  /* 这里的 .body 是自定义类名，与 <body> 标签无关 */
  .body { padding: 0 16px 12px; color: #5c6b62; font-size: 13px; }
</style>

<div class="acc">
  <!-- open 是布尔属性：写上就表示这一项默认是展开的。
       用户点击后浏览器会自动增删这个属性，我们只要写好对应的 CSS -->
  <details open>
    <summary>什么是 Flex？</summary>
    <div class="body">Flex 是一维布局：主轴 + 交叉轴，适合导航栏、居中、等分。</div>
  </details>
  <!-- 没写 open，所以默认是收起状态 -->
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .open-btn { padding: 8px 16px; border: none; background: #2f6b4f; color: #fff; border-radius: 8px; font: inherit; cursor: pointer; }

  /* 遮罩层：铺满整个屏幕的半透明黑色 */
  .overlay {
    display: none;              /* 默认隐藏；加上 show 类才变成 flex 显示出来 */
    position: fixed;            /* 相对视口定位，页面滚动它也不动 */
    inset: 0;                   /* inset 是 top/right/bottom/left 的缩写，
                                   全为 0 就等于「四边都贴住视口」= 铺满全屏 */
    background: rgba(0,0,0,.45); /* 45% 不透明度的黑色，能透出后面的页面，
                                    营造「弹窗浮在页面之上」的层次 */
    align-items: center;         /* 这两行是给 flex 用的：把对话框在竖直方向居中… */
    justify-content: center;     /* …和水平方向居中。
                                    注意它们写在 display: none 状态下也没关系，
                                    等切换成 flex 时自然生效 */
    z-index: 100;                /* 层级足够高，压在页面其它内容之上。
                                    z-index 只对已定位元素（如 fixed/absolute）有效 */
  }
  /* 切换显示：这里用 flex 而不是 block，正是为了启用上面那两条居中规则 */
  .overlay.show { display: flex; }

  /* 对话框本体 */
  .dialog {
    width: min(320px, 90vw);  /* min() 取两者中较小的那个：
                                 宽屏时是 320px；窄屏时是视口宽度的 90%（vw = 视口宽度的 1%），
                                 一行代码搞定响应式，弹窗永远不会顶到屏幕边缘 */
    padding: 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 16px 48px rgba(0,0,0,.2); /* 大范围柔和阴影，强化浮起的感觉 */
  }
  /* 后代选择器：只影响对话框内部的标题、段落、按钮 */
  .dialog h3 { margin: 0 0 8px; }
  .dialog p { margin: 0 0 16px; color: #5c6b62; font-size: 13px; }
  .dialog button { padding: 8px 16px; border: none; background: #2f6b4f; color: #fff; border-radius: 6px; font: inherit; cursor: pointer; }
</style>

<button class="open-btn" id="open" type="button">打开弹窗</button>

<!-- 遮罩层包着对话框：这种嵌套结构让「点遮罩关闭」变得很好实现 -->
<div class="overlay" id="overlay">
  <!-- role="dialog" 是无障碍属性，告诉读屏软件「这是一个对话框」，
       它会提示用户当前处在弹窗里。role 用于补充元素缺失的语义 -->
  <div class="dialog" role="dialog">
    <h3>确认操作</h3>
    <p>确定要删除这条记录吗？此操作不可撤销。</p>
    <button id="close" type="button">我知道了</button>
  </div>
</div>

<script>
  const overlay = document.getElementById('overlay')

  // 打开：加上 show 类，CSS 立刻把 display 从 none 变成 flex
  document.getElementById('open').addEventListener('click', () => {
    overlay.classList.add('show')
  })

  // 关闭按钮：移除 show 类
  document.getElementById('close').addEventListener('click', () => {
    overlay.classList.remove('show')
  })

  // 点击遮罩（非对话框区域）也关闭
  overlay.addEventListener('click', (e) => {
    // 为什么要判断？因为对话框在遮罩里面，点对话框时事件会「冒泡」到遮罩上，
    // 如果不判断，点弹窗内部任何地方都会误关闭。
    // e.target 是「真正被点到的那个最内层元素」，
    // 只有它恰好等于遮罩本身时，才说明用户点的是外围空白区域。
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 标签选择器 button：命中本 Demo 里所有按钮 */
  button { padding: 8px 16px; border: none; background: #2f6b4f; color: #fff; border-radius: 8px; font: inherit; cursor: pointer; }

  /* 轻提示：始终存在于页面上，靠透明度和位移在「隐藏 / 显示」之间切换 */
  .toast {
    position: fixed;   /* 相对视口固定，不随页面滚动 */
    left: 50%;         /* 先把左边缘挪到屏幕正中 */
    bottom: 32px;      /* 距底部 32px */
    transform: translateX(-50%) translateY(80px);
    /* transform 可以写多个函数，从左到右依次应用：
       translateX(-50%) 向左回移「自身宽度的一半」，配合 left: 50% 实现真正的水平居中
                        （transform 的百分比是相对元素自身尺寸算的，这是关键）；
       translateY(80px) 向下推 80px，让它藏在屏幕外，作为动画的起始位置。 */
    padding: 10px 20px;
    background: rgba(31,42,36,.92); /* 92% 不透明的深色，略微透出背景 */
    color: #fff;
    border-radius: 999px;           /* 药丸形 */
    font-size: 14px;
    opacity: 0;                     /* 完全透明 = 看不见（但仍占据位置、仍在 DOM 里） */
    transition: transform .3s, opacity .3s;
    /* 同时给位移和透明度加 0.3 秒过渡，于是切换 show 类时就有「淡入 + 上浮」的动画。
       这是比 display 切换更好的做法——display 无法参与过渡动画。 */
    pointer-events: none;           /* 鼠标「穿透」这个元素：点击会落到它下面的内容上。
                                       因为 toast 只是提示、不该挡住用户操作 */
    z-index: 200;                   /* 层级很高，确保浮在所有内容之上 */
  }
  /* 显示态：位移归零（浮上来）+ 不透明度变 1（淡入）。
     注意这里必须把 translateX(-50%) 再写一遍——transform 是「整体替换」的，
     只写 translateY(0) 会丢掉水平居中，toast 会突然跑到右边。 */
  .toast.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
</style>

<button id="btn" type="button">显示 Toast</button>
<!-- toast 一开始就写在 HTML 里（只是透明且位于屏幕外），比每次用 JS 创建再删除更简单 -->
<div class="toast" id="toast">操作成功 ✓</div>

<script>
  const btn = document.getElementById('btn')
  const toast = document.getElementById('toast')

  // 用变量保存定时器的「编号」，后面才能取消它
  let timer = null

  btn.addEventListener('click', () => {
    toast.classList.add('show')  // 显示（CSS 的 transition 负责淡入动画）

    // 关键一步：先清掉上一次的定时器。
    // 假设用户连续点两次，第一次的定时器仍在倒计时，
    // 若不清除，它会在第二次显示后不久就把 toast 关掉，提示一闪而过。
    // clearTimeout 传入 null 也是安全的，不会报错。
    clearTimeout(timer)

    // 2 秒后隐藏
    // setTimeout 返回一个定时器 id，把它存进 timer，供下次 clearTimeout 使用
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .list { list-style: none; margin: 0; padding: 0; max-width: 280px; } /* 清掉 ul 默认样式 */

  /* .list li 后代选择器：列表里每一项都是一张可拖动的小卡片 */
  .list li {
    padding: 12px 14px;
    margin-bottom: 8px;        /* 用 margin 而非 gap，因为这里父级不是 Flex */
    background: #fff;
    border: 1px solid #d9e0d8;
    border-radius: 8px;
    cursor: grab;              /* 张开的手，暗示可以抓起来拖 */
  }
  /* 正在被拖动的那一项：由 JS 加上 dragging 类。
     半透明 + 虚线边框，让用户清楚「这个是我正在搬的东西」 */
  .list li.dragging { opacity: .5; border-style: dashed; }

  .hint { font-size: 12px; color: #5c6b62; margin-bottom: 10px; }
</style>

<p class="hint">拖住某项上下移动可改变顺序</p>
<ul class="list" id="list">
  <!-- draggable="true" 是 HTML5 原生属性：加上它，元素就能被鼠标拖动，
       浏览器会自动触发 dragstart / dragover / dragend 这一套拖放事件。
       不加这个属性，下面的 JS 一行都不会执行 -->
  <li draggable="true">任务 A：写 HTML</li>
  <li draggable="true">任务 B：写 CSS</li>
  <li draggable="true">任务 C：写 JS</li>
</ul>

<script>
  const list = document.getElementById('list')

  // 记住当前正在拖动的那个 li 元素（没在拖时是 null）
  let dragEl = null

  // 事件都绑在父级 ul 上，而不是每个 li 上 —— 这叫「事件委托」：
  // 因为子元素的事件会冒泡到父级，绑一次就能管所有 li，
  // 而且以后动态新增的 li 也自动生效，不用重新绑定。
  list.addEventListener('dragstart', (e) => {
    dragEl = e.target                  // e.target 是真正触发事件的那个元素，即被抓起的 li
    dragEl.classList.add('dragging')   // 加上半透明虚线样式
    // dataTransfer 是拖放事件专属的对象，用来携带拖拽数据、控制拖拽效果。
    // effectAllowed = 'move' 表示这是「移动」而非「复制」，鼠标指针的图标会相应变化。
    e.dataTransfer.effectAllowed = 'move'
  })

  // 拖动结束（松手或按 Esc 取消）：清理状态
  list.addEventListener('dragend', () => {
    dragEl.classList.remove('dragging')
    dragEl = null
  })

  // 拖动经过列表上方时持续触发（大约每几十毫秒一次）
  list.addEventListener('dragover', (e) => {
    e.preventDefault() // 必须 preventDefault 才能 drop
    // 原因：浏览器对大部分区域的默认行为是「不允许放置」，
    // 只有阻止这个默认行为，当前位置才会被认定为合法的放置目标。

    // 算出「应该插到哪个元素前面」
    const after = getAfter(list, e.clientY)
    if (after == null) {
      // 返回 null 说明鼠标已经在所有项的下半部分之下了 → 放到列表末尾
      list.appendChild(dragEl)
    } else {
      // insertBefore(要插入的节点, 参考节点) = 把前者插到后者前面。
      // 妙处在于：dragEl 已经在页面上了，appendChild / insertBefore 作用于
      // 已存在的节点时是「移动」而不是「复制」，所以顺序会实时重排。
      list.insertBefore(dragEl, after)
    }
  })

  // 根据鼠标 Y 坐标，找到应插入到哪个元素前面
  function getAfter(container, y) {
    // li:not(.dragging) —— :not() 是否定伪类，表示「不带 dragging 类的 li」，
    // 把正在拖动的那一项排除掉，否则会拿自己和自己比较。
    // [...] 展开语法把 NodeList 转成真数组，才能用 reduce 等数组方法。
    const items = [...container.querySelectorAll('li:not(.dragging)')]

    // reduce 把数组「归约」成一个值：这里用来在遍历中找出「离鼠标最近、且在鼠标下方的那一项」。
    // closest 是累计结果，child 是当前遍历到的元素。
    return items.reduce((closest, child) => {
      // getBoundingClientRect() 返回元素相对«视口»的位置和尺寸
      //（含 top/bottom/left/right/width/height），和 e.clientY 的坐标系一致，可以直接比较。
      const box = child.getBoundingClientRect()
      // offset = 鼠标 Y 坐标 减去 这一项的垂直中线位置。
      // 负数 = 鼠标还在这一项中线的上方 → 应该插在它前面。
      const offset = y - box.top - box.height / 2
      // 条件一 offset < 0：只考虑鼠标上方（即候选的插入点）；
      // 条件二 offset > closest.offset：在所有负数里挑最接近 0 的那个，也就是「最近的一项」。
      if (offset < 0 && offset > closest.offset) {
        // { offset, element: child } 是对象简写：等价于 { offset: offset, element: child }
        return { offset, element: child }
      }
      return closest // 不符合就保留之前的结果
    // 第二个参数是 reduce 的初始值。Number.NEGATIVE_INFINITY 是负无穷，
    // 作为「最小值」保证第一个符合条件的元素一定能胜出。
    // 注意这个初始对象没有 element 属性，所以当没有任何一项符合时，
    // 最终 .element 就是 undefined —— 上面用 == null 判断能同时覆盖 null 和 undefined。
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
  /* 通用选择器 * 命中所有元素，统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .thumbs { display: flex; gap: 8px; } /* 缩略图横向排列 */

  .thumb {
    width: 80px;
    height: 60px;
    border-radius: 6px;
    cursor: pointer;
    border: 2px solid transparent; /* 预留 2px 透明边框：悬停时只换颜色，
                                      缩略图尺寸和位置都不会跳动 */
  }
  /* :hover 悬停时把刚才那圈透明边框染成主题绿，作为「可点击」的反馈 */
  .thumb:hover { border-color: #2f6b4f; }

  /* :nth-child(n) 按次序选中第 n 个，给三张缩略图配不同渐变（代替真实图片） */
  .thumb:nth-child(1) { background: linear-gradient(135deg, #6fcf97, #2f6b4f); }
  .thumb:nth-child(2) { background: linear-gradient(135deg, #ffd93d, #c53030); }
  .thumb:nth-child(3) { background: linear-gradient(135deg, #667eea, #764ba2); }

  /* 灯箱：全屏黑色遮罩 */
  .lightbox {
    display: none;               /* 默认隐藏 */
    position: fixed;             /* 相对视口，铺满并固定 */
    inset: 0;                    /* = top/right/bottom/left 全为 0，四边贴满视口 */
    background: rgba(0,0,0,.85); /* 85% 的黑，接近全黑但仍能感知背后的页面 */
    align-items: center;         /* 配合下面的 display: flex 把大图双向居中 */
    justify-content: center;
    z-index: 100;                /* 压在所有页面内容之上 */
    cursor: zoom-out;            /* zoom-out 是「缩小镜」光标，
                                    直观暗示「点这里可以退出放大视图」 */
  }
  /* 用 flex 而不是 block，才能启用上面两条居中规则 */
  .lightbox.show { display: flex; }

  /* 逗号并集选择器：无论内容是真实的 <img> 还是这里的占位 div，都套用同一套尺寸限制 */
  .lightbox img, .lightbox .big {
    max-width: 90vw;   /* vw = 视口宽度的 1%，所以 90vw 是屏幕宽的 90%，
                          保证大图在小屏上也不会溢出 */
    max-height: 80vh;  /* vh = 视口高度的 1%，限制高度不超过屏幕的 80% */
    border-radius: 8px;
    width: 360px;      /* 期望尺寸；上面两条 max-* 会在屏幕不够大时把它压下来 */
    height: 240px;
  }

  /* 右上角关闭按钮 */
  .close {
    position: absolute; /* 相对 .lightbox（它是 fixed，也算已定位元素）定位到右上角 */
    top: 16px;
    right: 20px;
    color: #fff;
    font-size: 28px;
    cursor: pointer;
    border: none;       /* 去掉按钮默认边框和背景，只留一个白色的 × */
    background: none;
  }
</style>

<div class="thumbs">
  <!-- data-bg 自定义属性存放这张图对应的「大图样式」（这里是渐变值）。
       点击时 JS 用 t.dataset.bg 读出来，赋给大图的背景。
       真实项目里通常存图片地址，例如 data-src="/photo/1.jpg" -->
  <div class="thumb" data-bg="linear-gradient(135deg,#6fcf97,#2f6b4f)"></div>
  <div class="thumb" data-bg="linear-gradient(135deg,#ffd93d,#c53030)"></div>
  <div class="thumb" data-bg="linear-gradient(135deg,#667eea,#764ba2)"></div>
</div>

<!-- 灯箱层：默认隐藏，点缩略图才显示 -->
<div class="lightbox" id="box">
  <!-- aria-label 给这个按钮一个可读的名字：
       按钮内容只有个 × 符号，读屏软件念不出含义，加上 aria-label 就会念「关闭」 -->
  <button class="close" id="close" type="button" aria-label="关闭">×</button>
  <!-- 大图占位容器，JS 会改它的 background -->
  <div class="big" id="big"></div>
</div>

<script>
  const box = document.getElementById('box')
  const big = document.getElementById('big')

  // 选出全部三张缩略图，逐个绑定点击事件
  document.querySelectorAll('.thumb').forEach((t) => {
    t.addEventListener('click', () => {
      // element.style.xxx 写的是「行内样式」，优先级高于样式表里的规则。
      // dataset.bg 读取 data-bg 属性的值（连字符命名的 data-foo-bar 对应 dataset.fooBar）。
      big.style.background = t.dataset.bg
      box.classList.add('show') // 显示灯箱
    })
  })

  // 关闭逻辑抽成函数，供下面两处复用
  function close() { box.classList.remove('show') }

  // 方式一：点右上角的 × 关闭。
  // 这里把函数名直接作为回调传入（不加括号），点击时才会被调用
  document.getElementById('close').addEventListener('click', close)

  // 方式二：点黑色空白区域关闭。
  // 必须判断 e.target === box：大图和关闭按钮都在灯箱内部，
  // 它们的点击事件会冒泡到 box 上，不判断的话点大图也会误关闭。
  // e.target 表示真正被点中的最内层元素。
  box.addEventListener('click', (e) => { if (e.target === box) close() })
</script>`,
  },
]

export default part3AppsJs
