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
  /* * 是「通用选择器」，匹配页面里所有元素。
     box-sizing: border-box 表示宽高把 padding 和 border 算进去，
     这样设了 width 就是最终占位宽度，不会被内边距额外撑大，布局更好算。 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 16px;                          /* 页面四周留 16px 白边，内容不贴着预览框边缘 */
    font: 14px/1.5 system-ui, sans-serif;  /* font 简写：字号 14px / 行高 1.5；字体优先用系统 UI 字体 */
    color: #1f2a24;                        /* 全局文字色（深墨绿），后代元素默认继承 */
  }

  /* 开启 Grid，三列等宽 */
  .grid {
    display: grid;                         /* 把 .grid 变成「网格容器」，它的直接子元素自动成为网格项 */
    grid-template-columns: repeat(3, 1fr); /* 3 列，每列 1fr 平分剩余空间 */
    /* 展开理解这一行：
       - repeat(3, 1fr) 等价于手写 1fr 1fr 1fr，只是更省事；
       - fr 是 Grid 专属单位，表示「一份可用空间」，1fr 1fr 1fr 就是三等分；
       - 因为用的是比例而不是固定 px，预览区变宽变窄时列会跟着缩放。 */
    gap: 12px;                             /* 行列间距统一 12px */
    /* gap 只在格子「之间」产生间隙，不会在容器最外圈多出一圈空白 */
  }
  .col {
    padding: 20px 16px;                    /* 内边距两值写法：上下 20px、左右 16px */
    background: #eef6f1;                   /* 浅绿底色，方便看清每一格的实际范围 */
    border: 1px solid #9bb5a6;             /* 边框简写：宽度 1px、实线、灰绿色 */
    border-radius: 10px;                   /* 四个角都做 10px 圆角 */
    text-align: center;                    /* 让格子里的文字水平居中 */
  }
  /* .col strong 是「后代选择器」（中间有空格）：
     只选中 .col 内部的 <strong>，不影响页面其它地方的 <strong>。 */
  .col strong {
    display: block;                        /* strong 默认是行内元素，改成块级后独占一行，形成小标题 */
    margin-bottom: 4px;                    /* 与下方文字拉开 4px */
    color: #2f6b4f;                        /* 主题绿，突出标题 */
  }
  .hint {
    margin-top: 12px;                      /* 与上方网格拉开距离 */
    font-size: 12px;                       /* 小一号字，说明性文字 */
    color: #5c6b62;                        /* 灰绿色，降低视觉权重 */
  }
</style>

<!-- 网格容器：class="grid" 用来命中上面的 .grid 规则。
     它的 3 个直接子元素会被自动放进 3 个列里。 -->
<div class="grid">
  <!-- 每个 .col 就是一个网格项（一格）；<strong> 当作格内小标题 -->
  <div class="col"><strong>列 A</strong>1fr</div>
  <div class="col"><strong>列 B</strong>1fr</div>
  <div class="col"><strong>列 C</strong>1fr</div>
</div>
<!-- <p> 是段落标签，这里只用来放一句操作提示 -->
<p class="hint">改 repeat(3) 为 2 或 4，观察列数变化</p>`,
  },
  {
    id: 'p2-grid-auto-fill',
    title: 'auto-fill 响应式卡片',
    group: '04-Grid布局',
    summary: 'repeat(auto-fill, minmax) 自动算列数',
    code: `<style>
  /* 通用选择器 *：所有元素统一用 border-box 盒模型（宽高含 padding 与边框） */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 16px;                          /* 页面四周 16px 留白 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 14px、行高 1.5、系统字体 */
  }

  .grid {
    display: grid;                         /* 网格容器 */
    /* auto-fill：尽量多放列；minmax(160px,1fr) 每列最小 160px，多余空间平分 */
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    /* 逐块拆解这一行（响应式卡片墙的核心）：
       - repeat(auto-fill, ...) 不写死列数，让浏览器按容器宽度自己算「能塞几列」；
       - minmax(最小值, 最大值) 定义一条轨道的伸缩范围；
       - 这里最小 160px：容器变窄到放不下时就自动减少列数、卡片换行；
       - 最大 1fr：有剩余空间时各列平分吃掉，不会留下右侧空白条。 */
    gap: 12px;                             /* 卡片之间横竖都留 12px */
  }
  .card {
    padding: 16px;                         /* 卡片内边距，文字不贴边 */
    background: #fff;                      /* 白色卡片底，和页面底色区分 */
    border: 1px solid #9bb5a6;             /* 1px 灰绿实线边框，勾出卡片轮廓 */
    border-radius: 10px;                   /* 圆角 10px */
    box-shadow: 0 2px 8px rgba(31, 42, 36, 0.06);
    /* box-shadow 四个值依次是：水平偏移 0、垂直偏移 2px（向下）、模糊半径 8px、颜色。
       rgba 的第 4 位是透明度，0.06 表示非常淡，只做一点「浮起」的层次感。 */
  }
  /* .card h3：卡片内部的标题。margin 三值写法 = 上 0 / 左右 0 / 下 6px */
  .card h3 {
    margin: 0 0 6px;                       /* 清掉 h3 默认外边距，只保留下方 6px 间隔 */
    font-size: 15px;                       /* 比正文略大，作为卡片标题 */
    color: #2f6b4f;                        /* 主题绿 */
  }
  /* .card p：卡片里的描述文字 */
  .card p {
    margin: 0;                             /* 去掉 <p> 自带的上下外边距，避免卡片被撑高 */
    font-size: 13px;                       /* 描述文字略小 */
    color: #5c6b62;                        /* 灰绿色 */
  }
  .tag {
    display: inline-block;                 /* 行内块：既能和文字并排，又能设置 padding / 宽高 */
    margin-top: 8px;                       /* 与上方描述拉开 8px */
    padding: 2px 8px;                      /* 上下 2px、左右 8px，做成小胶囊 */
    font-size: 11px;                       /* 标签字号最小 */
    background: #d9ebe1;                   /* 浅绿底 */
    border-radius: 999px;                  /* 圆角给一个远大于高度的值 → 两端变成半圆，即「胶囊形」 */
    color: #2f6b4f;                        /* 深绿字，和浅绿底形成对比 */
  }
</style>

<!-- 卡片墙容器：子元素数量随便加，列数由 auto-fill 自动决定 -->
<div class="grid">
  <!-- <article> 是语义化标签，表示一块可以独立成篇的内容，比 <div> 更能表达「一张卡片」 -->
  <article class="card"><h3>React 基础</h3><p>组件与 JSX</p><span class="tag">12 课</span></article>
  <article class="card"><h3>状态管理</h3><p>useState / useReducer</p><span class="tag">8 课</span></article>
  <article class="card"><h3>路由</h3><p>React Router v6</p><span class="tag">6 课</span></article>
  <article class="card"><h3>样式方案</h3><p>CSS Modules</p><span class="tag">5 课</span></article>
  <!-- <span> 是最普通的行内容器，专门用来给一小段文字套样式（这里套成标签胶囊） -->
  <article class="card"><h3>性能优化</h3><p>memo / lazy</p><span class="tag">4 课</span></article>
</div>`,
  },
  {
    id: 'p2-grid-auto-fit',
    title: 'auto-fit 拉伸填满',
    group: '04-Grid布局',
    summary: 'auto-fit vs auto-fill：末列会拉伸',
    code: `<style>
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 16px;                          /* 页面四周留白 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
  }

  .wrap { margin-bottom: 20px; }           /* 每组示例之间垂直隔开 20px */
  .label {
    font-size: 12px;                       /* 小标签字号 */
    font-weight: 700;                      /* 700 即加粗（等价于 bold） */
    color: #2f6b4f;                        /* 主题绿 */
    margin-bottom: 8px;                    /* 与下方网格拉开 8px */
  }

  /* 选择器用逗号分隔表示「或」：.grid-fill 和 .grid-fit 共用下面这几条声明，
     避免把相同样式写两遍。 */
  .grid-fill, .grid-fit {
    display: grid;                         /* 两者都是网格容器 */
    gap: 10px;                             /* 格子间距 10px */
    margin-bottom: 4px;                    /* 与下方说明文字留 4px */
  }
  /* auto-fill：空轨道保留，卡片不会拉伸变宽 */
  .grid-fill {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    /* auto-fill 会「尽量多」地创建列轨道：即使没有元素可放，空轨道也照样占位，
       所以只有 3 个盒子时，右侧那些空轨道把空间吃掉了，盒子保持约 120px 不变宽。 */
  }
  /* auto-fit：空轨道折叠，现有列拉伸填满容器 */
  .grid-fit {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    /* auto-fit 同样先算出很多列，但会把「没有元素的空轨道折叠成 0 宽」，
       剩下的 3 列因为最大值是 1fr，就一起把整行拉满 —— 这是二者唯一的区别。 */
  }
  .box {
    padding: 14px;                         /* 内边距 */
    background: #eef6f1;                   /* 浅绿底 */
    border-radius: 8px;                    /* 圆角 */
    text-align: center;                    /* 文字水平居中 */
    font-size: 13px;                       /* 稍小字号 */
    border: 1px solid #9bb5a6;             /* 边框，方便看清盒子被拉伸了多宽 */
  }
  .hint {
    font-size: 12px;                       /* 说明文字小字号 */
    color: #5c6b62;                        /* 灰绿色 */
  }
</style>

<!-- 第一组：auto-fill 演示 -->
<div class="wrap">
  <!-- 这一层只是文字说明，用 div + class 套样式 -->
  <div class="label">auto-fill（空列保留）</div>
  <div class="grid-fill">
    <!-- 3 个盒子，故意少于容器能容纳的列数，才能看出两种写法的差别 -->
    <div class="box">A</div><div class="box">B</div><div class="box">C</div>
  </div>
</div>
<!-- 第二组：auto-fit 演示，HTML 结构与上面完全一样，只有 class 不同 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 0;                             /* 布局要贴满，所以把默认外边距清成 0 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
    color: #1f2a24;                        /* 全局文字色 */
  }

  .holy {
    display: grid;
    /* 三行：顶栏 auto、中间 1fr、底栏 auto；两列：侧栏 180px + 主栏 1fr */
    grid-template-columns: 180px 1fr;
    /* 第 1 列固定 180px 给侧栏；第 2 列 1fr 表示「吃掉剩下的所有宽度」 */
    grid-template-rows: auto 1fr auto;
    /* auto 表示行高由内容决定（顶栏/底栏有多高就多高）；
       中间行 1fr 把剩余高度全吃掉，于是页脚被自然压到最底部。 */
    /* 用名字描述每个格子归属哪个区域 */
    grid-template-areas:
      "header header"
      "nav    main"
      "footer footer";
    /* grid-template-areas 用「字符串画图」的方式描述布局：
       每个字符串是一行，行内用空格分开的每个名字对应一列的格子。
       同一个名字连续出现就表示该区域跨越这些格子（header 横跨两列）。
       下面每个区域再用 grid-area: 名字 把元素放进去，不必去数网格线编号。 */
    min-height: 320px;                     /* 至少 320px 高，内容少时也能看出三段式结构 */
    gap: 0;                                /* 区域之间不留缝，各块背景直接相接 */
  }
  /* 下面用「标签选择器」直接选中 header/nav/main/footer 这些语义化标签 */
  header { grid-area: header; padding: 12px 16px; background: #2f6b4f; color: #fff; }   /* 放进 header 区域（横跨两列）；深绿底白字 */
  nav    { grid-area: nav;    padding: 16px; background: #eef6f1; border-right: 1px solid #9bb5a6; } /* 左侧栏；右边框把它和主内容分开 */
  main   { grid-area: main;   padding: 16px; background: #f7faf8; overflow: auto; }      /* 主内容区；overflow: auto 让内容过多时只有它自己滚动 */
  footer { grid-area: footer; padding: 10px 16px; background: #d9ebe1; font-size: 12px; color: #5c6b62; } /* 页脚；小字灰绿 */

  /* 侧栏用 button，避免 href="#" 跳转 */
  nav strong { display: block; margin-bottom: 8px; color: #2f6b4f; }   /* 侧栏小标题：改成块级独占一行 */
  nav button {
    display: block;                        /* 按钮默认行内块，改成块级后每个占一行 */
    width: 100%;                           /* 占满侧栏宽度，整行都可点 */
    padding: 6px 0;                        /* 上下 6px 内边距，撑出点击区域 */
    border: 0;                             /* 去掉按钮默认边框 */
    background: transparent;               /* 背景透明，看起来像纯文字链接 */
    color: #2f6b4f;                        /* 主题绿文字 */
    font: inherit;                         /* 继承父级字体；否则按钮会用浏览器默认小字体 */
    text-align: left;                      /* 按钮文字默认居中，这里改成左对齐更像菜单 */
    cursor: pointer;                       /* 鼠标移上去变成小手，提示可点击 */
  }
  /* nav button.active 中间没有空格：表示「同时是 nav 的后代按钮，且带 active 类」的元素。
     active 这个类由下面的 JS 动态加/删，用来标记当前选中项。 */
  nav button.active {
    font-weight: 700;                      /* 加粗 */
    text-decoration: underline;            /* 加下划线，强调当前所在页面 */
  }

  .panel { display: none; }                /* 所有面板默认隐藏（display:none 完全不渲染、不占位） */
  .panel.active { display: block; }        /* 只有带 active 类的面板显示出来 —— 这就是「切换标签页」的最简做法 */
  .panel h2 { margin: 0 0 12px; font-size: 18px; }   /* 面板标题：清掉默认上边距，只留下方 12px */

  .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }  /* 统计卡片：三等分网格 */
  .card {
    padding: 12px;                         /* 卡片内边距 */
    background: #fff;                      /* 白底 */
    border: 1px solid #d9e0d8;             /* 浅灰绿边框 */
    border-radius: 8px;                    /* 圆角 */
    text-align: center;                    /* 数字和文字都居中 */
  }
  .card b { display: block; font-size: 20px; color: #2f6b4f; }   /* <b> 改块级独占一行，做大号数字 */
  .card span { font-size: 12px; color: #5c6b62; }                /* 数字下方的小字说明 */

  /* 直接对 table 标签设样式，本 Demo 里的表格都会命中 */
  table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; font-size: 13px; }
  /* border-collapse: collapse 让相邻单元格共用一条边框线，不会出现双线；
     overflow: hidden 配合 border-radius，把超出圆角的表头背景裁掉，圆角才可见。 */
  th, td { padding: 8px 10px; text-align: left; border-bottom: 1px solid #eef6f1; }  /* 表头和单元格共用：内边距、左对齐、底部分隔线 */
  th { background: #eef6f1; }              /* 表头再单独加浅绿底色以区分 */

  .form { max-width: 280px; }              /* 表单最大宽度 280px，输入框不会拉得过长 */
  .form label { display: block; margin: 10px 0 4px; font-size: 12px; color: #5c6b62; }  /* label 独占一行；margin 三值 = 上 10px / 左右 0 / 下 4px */
  .form input, .form select {
    width: 100%;                           /* 撑满表单宽度 */
    padding: 7px 10px;                     /* 输入框内边距，文字不贴边 */
    border: 1px solid #c5d2ca;             /* 浅灰绿边框 */
    border-radius: 6px;                    /* 小圆角 */
    font: inherit;                         /* 表单控件不会自动继承字体，必须显式 inherit */
    box-sizing: border-box;                /* 再次声明，确保 width:100% 含内边距不溢出 */
  }
  .form button {
    margin-top: 12px;                      /* 与上方控件拉开 */
    padding: 8px 14px;                     /* 按钮内边距 */
    border: 0;                             /* 去掉默认边框 */
    border-radius: 6px;                    /* 圆角 */
    background: #2f6b4f;                   /* 主题绿背景 */
    color: #fff;                           /* 白色文字 */
    font: inherit;                         /* 继承字体 */
    cursor: pointer;                       /* 小手光标 */
  }
</style>

<!-- 最外层网格容器，对应上面的 grid-template-areas 那张「图」 -->
<div class="holy">
  <!-- <header> 语义化标签：页面/区块的头部。它被 grid-area: header 放到横跨两列的第一行 -->
  <header>Header — 横跨两列</header>
  <!-- <nav> 表示导航区域，读屏软件会把它识别成「导航」 -->
  <nav>
    <strong>导航</strong>
    <!-- type="button" 很重要：不写的话按钮在 <form> 内默认是 submit，会触发表单提交。
         data-panel 是「自定义数据属性」（data- 开头随便起名），
         JS 里用 btn.dataset.panel 读到它的值，从而知道该显示哪个面板。 -->
    <button type="button" class="nav-item active" data-panel="dashboard">仪表盘</button>
    <button type="button" class="nav-item" data-panel="users">用户</button>
    <button type="button" class="nav-item" data-panel="settings">设置</button>
  </nav>
  <!-- <main> 表示页面主要内容区，一个页面只应有一个 -->
  <main>
    <!-- ① 仪表盘：统计卡片 -->
    <!-- <section> 表示一个内容分块；id 供 JS 用 getElementById 精确找到它，
         命名规则是 panel- 加上按钮的 data-panel 值 -->
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
        <!-- thead 装表头行，th 是表头单元格（默认加粗）；tbody 装数据行，td 是普通单元格 -->
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
      <!-- onsubmit="event.preventDefault()" 阻止表单默认提交（默认会刷新/跳转页面），
           这里只是演示界面，所以点保存什么都不发生 -->
      <form class="form" onsubmit="event.preventDefault()">
        <label>站点名称</label>
        <input value="Demo Admin" />
        <label>默认语言</label>
        <!-- select 是下拉框，每个 option 是一个可选项 -->
        <select><option>简体中文</option><option>English</option></select>
        <button type="submit">保存</button>
      </form>
    </section>
  </main>
  <!-- <footer> 页脚，被 grid-area: footer 放到最后一行 -->
  <footer>Footer © 2026</footer>
</div>

<script>
  // 圣杯布局侧栏切换：button + data-panel，不用 href="#"
  // querySelectorAll 按 CSS 选择器一次性取回所有匹配元素（返回类数组的 NodeList）
  const navItems = document.querySelectorAll('.nav-item')  // 3 个侧栏按钮
  const panels = document.querySelectorAll('.panel')       // 3 个内容面板

  // 给每个按钮都绑定点击事件
  navItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      // 读出这个按钮身上的 data-panel 值，例如 'users'
      const id = btn.dataset.panel
      // 第 1 步：把所有按钮的 active 去掉（先全部取消高亮）
      navItems.forEach((b) => b.classList.remove('active'))
      // 第 2 步：只给被点的那个按钮加上 active（高亮当前项）
      btn.classList.add('active')
      // 第 3 步：把所有面板的 active 去掉 → 全部隐藏
      panels.forEach((p) => p.classList.remove('active'))
      // 第 4 步：拼出目标面板的 id（panel- + 名字），给它加 active → 显示出来。
      // ?. 是可选链：万一没找到元素（返回 null）也不会报错，直接跳过。
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 0;                             /* 后台布局要贴满，清掉默认外边距 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
    color: #1f2a24;                        /* 全局文字色 */
  }

  .layout {
    display: grid;                         /* 网格容器 */
    /* 左 220px 固定，右 1fr 自适应；单行 */
    grid-template-columns: 220px 1fr;
    /* 只写了列、没写行，两个子元素就自动落进同一行的两列里。
       220px 是固定值（侧栏宽度不随窗口变化），1fr 表示主栏吃掉全部剩余宽度。 */
    min-height: 280px;                     /* 最小高度，保证侧栏深色背景有足够视觉面积 */
  }
  .sidebar {
    padding: 20px 16px;                    /* 上下 20px、左右 16px 内边距 */
    background: #1f2a24;                   /* 深色底，做成暗色侧栏 */
    color: #e8f0eb;                        /* 浅色文字，和深底形成对比 */
  }
  .sidebar .logo { font-weight: 700; font-size: 16px; margin-bottom: 16px; }  /* 侧栏顶部品牌名：加粗、稍大、与菜单拉开 16px */
  /* 侧栏菜单用 button，避免 href="#" 导致页面跳动 */
  .sidebar button {
    display: block;                        /* 块级，每个菜单项独占一行 */
    width: 100%;                           /* 撑满侧栏，整行可点 */
    padding: 8px 10px;                     /* 内边距，做出可点区域 */
    margin-bottom: 4px;                    /* 菜单项之间留 4px */
    border: 0;                             /* 去掉按钮默认边框 */
    background: transparent;               /* 透明背景，未选中时看不出是按钮 */
    color: #b8cfc0;                        /* 未选中时用偏灰的浅绿 */
    font: inherit;                         /* 继承父级字体，否则按钮字体会变小 */
    text-align: left;                      /* 文字左对齐，符合菜单习惯 */
    border-radius: 6px;                    /* 圆角，选中时的色块更柔和 */
    cursor: pointer;                       /* 小手光标 */
  }
  /* .active 类由 JS 在点击时加上，用来表示「当前选中的菜单」 */
  .sidebar button.active { background: #2f6b4f; color: #fff; }   /* 选中项：绿色块 + 纯白字 */
  .main { padding: 24px; background: #fff; }   /* 右侧主内容区：白底 + 24px 内边距 */
  .panel { display: none; }                /* 面板默认隐藏 */
  .panel.active { display: block; }        /* 带 active 的面板才显示 —— 单页多视图切换的核心 */
  .panel h1 { margin: 0 0 8px; font-size: 20px; }                    /* 面板主标题；margin 三值 = 上 0 / 左右 0 / 下 8px */
  .panel .sub { margin: 0 0 16px; color: #5c6b62; font-size: 13px; }  /* 标题下方的副标题说明 */

  .stat-row { display: flex; gap: 12px; }  /* Flex 横向排列三个统计块，间距 12px */
  .stat {
    flex: 1;                               /* 三块平分宽度（flex:1 = 可放大、可缩小、基准 0） */
    padding: 12px;                         /* 内边距 */
    background: #eef6f1;                   /* 浅绿底 */
    border-radius: 8px;                    /* 圆角 */
    text-align: center;                    /* 内容居中 */
  }
  .stat b { display: block; font-size: 22px; color: #2f6b4f; }   /* 大号数字，块级独占一行 */

  table { width: 100%; border-collapse: collapse; font-size: 13px; }   /* 表格铺满；collapse 合并相邻边框避免双线 */
  th, td { padding: 8px 10px; text-align: left; border-bottom: 1px solid #eef6f1; }  /* 单元格内边距 + 左对齐 + 底部分隔线 */
  th { background: #f7faf8; color: #5c6b62; }   /* 表头浅灰底、灰绿字 */

  .product-grid {
    display: grid;                         /* 商品网格 */
    grid-template-columns: repeat(3, 1fr); /* 固定 3 列等宽 */
    gap: 10px;                             /* 间距 10px */
  }
  .product {
    padding: 12px;                         /* 内边距 */
    background: #f7faf8;                   /* 极浅灰绿底 */
    border: 1px solid #d9e0d8;             /* 浅边框 */
    border-radius: 8px;                    /* 圆角 */
    text-align: center;                    /* 居中 */
    font-size: 13px;                       /* 小字号 */
  }
  .product .emoji { font-size: 24px; margin-bottom: 4px; }   /* 用大字号把 emoji 当图标使用 */

  .chart-box {
    height: 140px;                         /* 固定高度，模拟图表画布 */
    background: linear-gradient(180deg, #d9ebe1 0%, #eef6f1 100%);
    /* linear-gradient 线性渐变：180deg 表示从上往下；
       后面是色标 —— 0% 处是深一点的绿，100% 处是浅绿。 */
    border-radius: 10px;                   /* 圆角 */
    display: flex;                         /* 用 Flex 做居中 */
    align-items: center;                   /* 交叉轴（纵向）居中 */
    justify-content: center;               /* 主轴（横向）居中 */
    color: #5c6b62;                        /* 占位文字颜色 */
    font-size: 13px;                       /* 占位文字字号 */
  }
</style>

<!-- 最外层两列网格：左侧栏 + 右主栏 -->
<div class="layout">
  <!-- <aside> 语义化标签，表示与主内容相关但相对独立的侧边区域 -->
  <aside class="sidebar">
    <div class="logo">Admin</div>
    <!-- type="button" 明确它不是提交按钮；data-panel 是自定义数据属性，
         JS 通过 btn.dataset.panel 拿到值，再去显示 id="panel-值" 的那个面板。
         初始时给第一项加 active，保证进来就有一个高亮项和一个可见面板。 -->
    <button type="button" class="nav-item active" data-panel="overview">概览</button>
    <button type="button" class="nav-item" data-panel="orders">订单</button>
    <button type="button" class="nav-item" data-panel="products">商品</button>
    <button type="button" class="nav-item" data-panel="reports">报表</button>
  </aside>
  <!-- 右侧主内容区，里面放 4 个面板，同一时刻只显示 1 个 -->
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
      <!-- 三列商品网格；每个 .product 里再放一个 .emoji 当图标 -->
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
      <!-- 真实项目里这里会渲染图表库的画布，本 Demo 只用一个渐变色块占位 -->
      <div class="chart-box">📈 折线图区域 — 可接入 ECharts 等库</div>
    </section>
  </main>
</div>

<script>
  // 侧栏切换：data-panel 对应 panel-{id}
  const navItems = document.querySelectorAll('.nav-item')  // 取回 4 个侧栏按钮
  const panels = document.querySelectorAll('.panel')       // 取回 4 个内容面板

  navItems.forEach((btn) => {
    // 为每个按钮注册 click 监听；箭头函数是点击时才执行的回调
    btn.addEventListener('click', () => {
      const id = btn.dataset.panel                         // 例如 'orders'
      navItems.forEach((b) => b.classList.remove('active'))  // 先清掉所有按钮高亮
      btn.classList.add('active')                            // 只高亮当前按钮
      panels.forEach((p) => p.classList.remove('active'))    // 先隐藏所有面板
      // 拼出 'panel-orders' 这样的 id 并显示它；?. 可选链保证找不到时不报错
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 16px;                          /* 页面四周留白 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
  }

  .demo {
    display: grid;                         /* 网格容器 */
    grid-template-columns: repeat(3, 1fr); /* 3 列等宽 */
    grid-template-rows: repeat(2, 60px);   /* 2 行，每行固定 60px 高（写死行高才好观察行间距） */
    /* gap 简写 = row-gap column-gap */
    row-gap: 20px;      /* 行间距 20px */
    column-gap: 8px;    /* 列间距 8px — 故意设不同值便于对比 */
    /* 小结：gap 是 row-gap 与 column-gap 的简写。
       写 gap: 20px 表示行列都 20px；写 gap: 20px 8px 表示「先行后列」。
       这里拆成两条单独写，就是为了让你看清两个方向可以互不相同。 */
    margin-bottom: 24px;                   /* 网格与下方说明文字拉开 24px */
  }
  .cell {
    display: flex;                         /* 每格自己再变成 Flex 容器，方便把数字居中 */
    align-items: center;                   /* 纵向居中 */
    justify-content: center;               /* 横向居中 */
    background: #d9ebe1;                   /* 浅绿底，凸显格子边界与间距 */
    border-radius: 6px;                    /* 小圆角 */
    font-size: 13px;                       /* 数字字号 */
    color: #2f6b4f;                        /* 主题绿文字 */
    font-weight: 600;                      /* 半粗体 */
  }
  .legend { font-size: 12px; color: #5c6b62; }   /* 底部说明文字：小字号 + 灰绿色 */
  /* .legend code：说明文字里的 <code> 标签，做成浅底小药丸，突出这是代码 */
  .legend code { background: #eef6f1; padding: 2px 6px; border-radius: 4px; }
</style>

<!-- 6 个格子按「先填满第一行，再换到第二行」的默认顺序自动排布 -->
<div class="demo">
  <div class="cell">1</div><div class="cell">2</div><div class="cell">3</div>
  <div class="cell">4</div><div class="cell">5</div><div class="cell">6</div>
</div>
<!-- 说明区：<code> 表示行内代码，<br/> 是强制换行 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 16px;                          /* 页面四周留白 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
  }

  .board {
    display: grid;                         /* 网格容器 */
    grid-template-columns: repeat(4, 1fr); /* 4 列等宽 */
    grid-template-rows: repeat(3, 72px);   /* 3 行，每行 72px 高 */
    gap: 8px;                              /* 格子间距 8px */
    /* 重要概念「网格线」：4 列会产生 5 条纵向线，从左到右编号 1~5；
       3 行会产生 4 条横向线，从上到下编号 1~4。
       下面的 grid-column / grid-row 就是用这些线的编号来划定元素占据的范围。 */
  }
  .tile {
    display: flex;                         /* 每格用 Flex 居中内容 */
    align-items: center;                   /* 纵向居中 */
    justify-content: center;               /* 横向居中 */
    background: #eef6f1;                   /* 默认浅绿底 */
    border: 1px solid #9bb5a6;             /* 边框，看清格子范围 */
    border-radius: 8px;                    /* 圆角 */
    font-size: 13px;                       /* 字号 */
    color: #2f6b4f;                        /* 文字色 */
  }
  /* 从第 1 列线到第 3 列线 → 占 2 列 */
  .wide {
    grid-column: 1 / 3;                    /* 语法是「起始线 / 结束线」，1 到 3 之间夹着第 1、2 列，所以占 2 列 */
    background: #2f6b4f;                   /* 深绿底，突出这是跨列块 */
    color: #fff;                           /* 白字 */
    font-weight: 700;                      /* 加粗 */
  }
  /* 从第 2 行到第 4 行 → 占 2 行 */
  .tall {
    grid-column: 4;                        /* 只写一个数字 = 放在第 4 列（相当于 4 / 5），占 1 列 */
    grid-row: 1 / 3;                       /* 纵向从第 1 行线到第 3 行线，占第 1、2 行两行 */
    background: #d9ebe1;                   /* 浅绿底 */
  }
  /* span 写法：从当前格起跨 2 列 */
  .hero {
    grid-column: span 2;                   /* span N 不指定具体位置，只说「从我自动落到的位置起，横向跨 2 格」 */
    grid-row: span 2;                      /* 纵向也跨 2 格，于是形成 2×2 的大方块 */
    background: #c8dfd0;                   /* 中绿底 */
    font-weight: 600;                      /* 半粗体 */
  }
  /* 对比记忆：写死编号（1 / 3）= 钉在固定位置；
     写 span 2 = 位置交给浏览器自动排，只锁定「占几格」，改动 HTML 顺序时更省心。 */
</style>

<!-- 网格里混用了普通格子和跨行跨列的格子；
     每个元素写两个 class：.tile 提供公共外观，.wide/.tall/.hero 负责占位规则。 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 16px;                          /* 页面四周留白 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
  }

  .grid {
    display: grid;                         /* 网格容器 */
    grid-template-columns: repeat(4, 1fr); /* 4 列等宽 */
    gap: 8px;                              /* 间距 8px */
    /* dense：后面的小块会回填前面因跨列产生的空位 */
    grid-auto-flow: dense;
    /* grid-auto-flow 控制「自动排列算法」：
       - 默认值 row：按顺序一行行放，遇到放不下的跨列元素就换行，
         前面剩下的窄空位永远空着（因为算法不会回头看）；
       - 加上 dense：允许算法回头，把后面体积合适的小块塞进前面的空洞里。
       代价是元素的视觉顺序可能和 HTML 顺序不一致，用键盘 Tab 浏览时会觉得跳。 */
  }
  .item {
    padding: 16px;                         /* 内边距 */
    background: #eef6f1;                   /* 默认浅绿底 */
    border-radius: 8px;                    /* 圆角 */
    text-align: center;                    /* 文字居中 */
    font-size: 13px;                       /* 字号 */
    color: #2f6b4f;                        /* 文字色 */
  }
  /* .item.w2 表示「同时有 item 和 w2 两个 class」的元素（两个类名之间不能有空格） */
  .item.w2 { grid-column: span 2; background: #2f6b4f; color: #fff; }   /* 横向跨 2 格，深绿底白字 */
  .item.h2 { grid-row: span 2; background: #d9ebe1; }                    /* 纵向跨 2 格，浅绿底 */
  .hint { margin-top: 10px; font-size: 12px; color: #5c6b62; }           /* 底部提示文字 */
</style>

<!-- 注意 HTML 顺序和最终显示顺序可能不同：dense 会让后面的小块跑到前面填空 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 16px;                          /* 页面四周留白 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
  }

  .layout {
    display: grid;                         /* 网格容器 */
    /* 给列线起名字，便于 grid-column 引用 */
    grid-template-columns:
      [sidebar-start] 200px
      [sidebar-end main-start] 1fr
      [main-end];
    /* 读法：方括号里是「网格线的名字」，方括号之间是「轨道（列）的尺寸」。
       所以这行同时描述了 3 条线和 2 列：
         线1 = sidebar-start，然后一列 200px；
         线2 同时叫 sidebar-end 和 main-start（一条线可以有多个别名），然后一列 1fr；
         线3 = main-end。
       好处：后面写位置时用名字而不是数字，改布局时不用重新数编号，可读性也更好。 */
    min-height: 200px;                     /* 最小高度，保证能看出两栏 */
    border: 1px solid #9bb5a6;             /* 外框 */
    border-radius: 10px;                   /* 圆角 */
    overflow: hidden;                      /* 裁掉超出圆角的子元素背景，圆角才不会被方角背景盖住 */
  }
  aside {
    /* 从 sidebar-start 到 sidebar-end */
    grid-column: sidebar-start / sidebar-end;   /* 用线名指定占位，等价于 grid-column: 1 / 2 */
    padding: 16px;                         /* 内边距 */
    background: #eef6f1;                   /* 浅绿底 */
  }
  main {
    grid-column: main-start / main-end;    /* 同理，等价于 grid-column: 2 / 3 */
    padding: 16px;                         /* 内边距 */
    background: #fff;                      /* 白底 */
  }
  /* 标签选择器 code：本 Demo 里所有 <code> 都套上这层「代码药丸」样式 */
  code { font-size: 12px; background: #f7faf8; padding: 2px 6px; border-radius: 4px; }
</style>

<!-- 两栏容器；两个子元素分别用线名把自己钉到左右两列 -->
<div class="layout">
  <aside>
    <strong>侧栏</strong>
    <!-- style="..." 是行内样式，只作用于这一个元素，优先级比 <style> 里的普通规则高 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 16px;                          /* 页面四周留白 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
  }

  .masonry {
    display: grid;                         /* 网格容器 */
    grid-template-columns: repeat(3, 1fr); /* 固定 3 列等宽 */
    /* 每行最小 80px，内容多则自动增高（默认 auto） */
    grid-auto-rows: minmax(80px, auto);
    /* grid-auto-rows 管的是「没有在 grid-template-rows 里显式定义的行」的高度，
       也就是元素多到自动新增出来的那些行。
       minmax(80px, auto)：最矮 80px（保证短卡片不会太扁），
       上限 auto 表示由内容决定，文字多就自动变高。 */
    gap: 10px;                             /* 砖块间距 10px */
  }
  .brick {
    padding: 12px;                         /* 内边距 */
    background: #fff;                      /* 白底 */
    border: 1px solid #9bb5a6;             /* 边框 */
    border-radius: 8px;                    /* 圆角 */
    font-size: 13px;                       /* 字号 */
    color: #1f2a24;                        /* 文字色 */
  }
  .brick h4 { margin: 0 0 6px; color: #2f6b4f; font-size: 14px; }   /* 砖块小标题；margin 三值 = 上 0 / 左右 0 / 下 6px */
  .brick p { margin: 0; color: #5c6b62; line-height: 1.5; }          /* 正文：清掉默认外边距，行高 1.5 便于阅读 */
  /* 不同 span 制造高低错落 */
  .brick.tall { grid-row: span 2; background: #eef6f1; }   /* 纵向跨 2 行 → 变高 */
  .brick.wide { grid-column: span 2; }                     /* 横向跨 2 列 → 变宽 */
</style>

<!-- 通过给部分砖块加 .tall / .wide，制造高低错落的「伪瀑布流」效果 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 16px;                          /* 页面四周留白 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
    background: #f4f7f5;                   /* 浅灰绿页面底色，让白色 widget 浮出来 */
  }

  .dashboard {
    display: grid;                         /* 网格容器 */
    /* 12 列栅格，方便 widget 按 3/4/6/12 切分 */
    grid-template-columns: repeat(12, 1fr);
    /* 为什么选 12 列？因为 12 能被 2、3、4、6 整除，
       所以「一行 2 个 / 3 个 / 4 个」都能整齐切分（span 6 / span 4 / span 3）。
       这正是 Bootstrap 等框架栅格系统的思路。 */
    gap: 12px;                             /* widget 之间间距 12px */
  }
  .widget {
    padding: 16px;                         /* 卡片内边距 */
    background: #fff;                      /* 白底 */
    border-radius: 12px;                   /* 较大圆角，观感更现代 */
    box-shadow: 0 2px 8px rgba(31, 42, 36, 0.06);   /* 向下 2px、模糊 8px 的极淡投影 */
  }
  .widget h3 { margin: 0 0 4px; font-size: 13px; color: #5c6b62; font-weight: 500; }  /* 指标名：小字、灰色、不太粗 */
  .widget .val { font-size: 28px; font-weight: 700; color: #2f6b4f; }                  /* 指标数值：大号加粗，视觉焦点 */
  .widget .delta { font-size: 12px; color: #38a169; }                                  /* 涨跌幅：小字、绿色 */
  /* 各占 12 栅格中的 3 列 = 一行 4 个 */
  .kpi { grid-column: span 3; }            /* 12 ÷ 3 = 4，所以 4 个 KPI 正好排满一行 */
  /* 图表占 8 列，侧栏占 4 列 */
  .chart { grid-column: span 8; min-height: 140px; }   /* 8 + 4 = 12，图表与待办并排占满第二行 */
  .side  { grid-column: span 4; }
  .chart-placeholder {
    height: 100px;                         /* 固定高度，模拟图表画布 */
    background: linear-gradient(180deg, #d9ebe1 0%, #eef6f1 100%);   /* 自上而下的绿色渐变占位 */
    border-radius: 8px;                    /* 圆角 */
    display: flex;                         /* Flex 三行组合实现完美居中 */
    align-items: center;                   /* 纵向居中 */
    justify-content: center;               /* 横向居中 */
    color: #5c6b62;                        /* 占位文字色 */
    font-size: 13px;                       /* 占位文字字号 */
  }
  .list { margin: 0; padding: 0; list-style: none; font-size: 13px; }
  /* <ul> 自带外边距、左内边距和小圆点，这三条分别把它们清掉，做成干净的自定义列表 */
  .list li { padding: 6px 0; border-bottom: 1px solid #eef6f1; color: #1f2a24; }   /* 每条上下 6px 内边距 + 底部细分隔线 */
</style>

<!-- 12 列栅格容器：每个 widget 靠 span N 决定占几列，凑够 12 就换行 -->
<div class="dashboard">
  <!-- 4 个 KPI 小卡片，每个 class 都是「widget（外观）+ kpi（占 3 列）」 -->
  <div class="widget kpi"><h3>总用户</h3><div class="val">12,480</div><div class="delta">↑ 8.2%</div></div>
  <div class="widget kpi"><h3>日活</h3><div class="val">3,291</div><div class="delta">↑ 2.1%</div></div>
  <div class="widget kpi"><h3>转化率</h3><div class="val">4.7%</div><div class="delta">↓ 0.3%</div></div>
  <div class="widget kpi"><h3>营收</h3><div class="val">¥86k</div><div class="delta">↑ 12%</div></div>
  <!-- 图表 widget：占 8 列 -->
  <div class="widget chart">
    <h3>近 7 日趋势</h3>
    <div class="chart-placeholder">📈 折线图区域</div>
  </div>
  <!-- 侧边 widget：占 4 列，和上面的 8 列刚好凑满 12 -->
  <div class="widget side">
    <h3>待办</h3>
    <!-- <ul> 无序列表，<li> 是列表项；样式里去掉了默认圆点 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 16px;                          /* 页面四周留白 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
  }

  .gallery {
    display: grid;                         /* 网格容器 */
    grid-template-columns: repeat(4, 1fr); /* 4 列等宽 */
    gap: 6px;                              /* 相册墙间距小一点，显得紧凑 */
  }
  .photo {
    position: relative;       /* 为里面 absolute 的说明条建立定位参照（下面详解） */
    /* position: relative 有两个作用：
       ① 元素仍留在正常文档流里（不写 top/left 时看起来毫无变化）；
       ② 它成为后代 absolute 元素的「定位参照物」，
          所以 .cap 的 bottom/left/right 是相对这张照片算的，而不是相对整个页面。 */
    aspect-ratio: 1;          /* 正方形格子 */
    /* aspect-ratio: 1 就是 1 / 1 的简写：高度自动等于宽度。
       列宽随容器变化时格子也始终保持正方形，不用写死 px 高度。 */
    border-radius: 8px;                    /* 圆角 */
    overflow: hidden;                      /* 裁掉溢出内容，让图片/渐变也跟着圆角 */
    background: #d9ebe1;                   /* 兜底底色（图片没加载出来时显示） */
  }
  /* Featured 占 2×2 大格 */
  .photo.featured {
    grid-column: span 2;                   /* 横向跨 2 列 */
    grid-row: span 2;                      /* 纵向跨 2 行 */
    aspect-ratio: auto;                    /* 取消上面的正方形约束：尺寸由所跨的 2×2 网格区域决定 */
  }
  .photo img {
    width: 100%;                           /* 宽度铺满格子 */
    height: 100%;                          /* 高度铺满格子 */
    object-fit: cover;        /* 裁剪填满，不变形 */
    /* object-fit 决定图片如何适配自己的框：
       cover = 等比放大到铺满、超出部分裁掉（不拉伸变形，最常用）；
       contain = 完整显示但可能留白；fill（默认）= 强行拉满、会变形。 */
    display: block;                        /* img 默认是行内元素，底部会有几像素空隙；改块级可消除 */
  }
  /* .photo .cap：照片内部的文字说明条 */
  .photo .cap {
    position: absolute;                    /* 脱离文档流，按下面的偏移值贴到父级 .photo 上 */
    bottom: 0; left: 0; right: 0;          /* 同时贴住下、左、右三边 → 自动拉出一条通栏的底部横条 */
    padding: 6px 8px;                      /* 文字内边距 */
    background: linear-gradient(transparent, rgba(0,0,0,.55));
    /* 不写角度时默认从上到下：顶部完全透明 → 底部半透明黑，
       这样文字压在图片上也看得清，又不会生硬地糊一块黑条。 */
    color: #fff;                           /* 白字 */
    font-size: 11px;                       /* 小字号 */
  }
  /* 用渐变色块模拟图片 */
  /* 135deg 表示渐变方向从左上角斜向右下角；两个颜色即起止色 */
  .ph1 { background: linear-gradient(135deg, #2f6b4f, #6fcf97); }
  .ph2 { background: linear-gradient(135deg, #4a5568, #a0aec0); }
  .ph3 { background: linear-gradient(135deg, #c53030, #fc8181); }
  .ph4 { background: linear-gradient(135deg, #2b6cb0, #63b3ed); }
  .ph5 { background: linear-gradient(135deg, #744210, #d69e2e); }
</style>

<!-- 相册墙容器 -->
<div class="gallery">
  <!-- 这个格子写了三个 class：photo（基础外观）+ featured（占 2×2）+ ph1（渐变配色） -->
  <div class="photo featured ph1"><span class="cap">封面 · 旅行相册</span></div>
  <!-- 其余格子只有基础外观 + 配色，尺寸交给 aspect-ratio 保持正方形 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 24px;                          /* 四周留 24px，角标是负偏移的，留白才不会被裁掉 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
  }

  .card {
    position: relative;       /* 建立定位上下文，absolute 子元素相对它 */
    /* position 的五种取值速记：
       static（默认）—— 在正常文档流里，top/left/z-index 全都无效；
       relative —— 仍占原来的位置，但可以用 top/left 做视觉偏移，
                   并且成为后代 absolute 元素的参照物（本例用的就是这一点）；
       absolute —— 脱离文档流，相对「最近的非 static 祖先」定位；
       fixed —— 脱离文档流，相对浏览器视口定位，滚动时不动；
       sticky —— 平时正常流，滚到阈值后粘住。
       如果这里不写 relative，下面的角标就会跑去参照整个页面，位置全乱。 */
    width: 240px;                          /* 固定卡片宽度，方便观察角标贴在右上角 */
    padding: 20px;                         /* 内边距 */
    background: #fff;                      /* 白底 */
    border: 1px solid #9bb5a6;             /* 边框 */
    border-radius: 12px;                   /* 圆角 */
    box-shadow: 0 4px 16px rgba(31, 42, 36, 0.08);   /* 向下 4px、模糊 16px 的淡投影 */
  }
  .card h3 { margin: 0 0 8px; color: #1f2a24; }        /* 标题：清默认外边距，仅留下方 8px */
  .card p { margin: 0; font-size: 13px; color: #5c6b62; }   /* 描述文字 */
  .badge {
    position: absolute;         /* 脱离文档流，按 top/right 定位 */
    /* 脱离文档流的意思是：它不再占据自己那一行，
       所以下面的 <h3> 会顶上来，角标只是「浮」在卡片上。 */
    top: -10px;                            /* 负值 = 往上超出卡片边界 10px */
    right: -10px;                          /* 负值 = 往右超出卡片边界 10px，于是骑在右上角 */
    min-width: 24px;                       /* 最小宽度，保证只有一个字时也是圆的 */
    height: 24px;                          /* 固定高度 24px */
    padding: 0 7px;                        /* 左右 7px 内边距，文字多时自动变长 */
    line-height: 24px;                     /* 行高等于高度，是让单行文字垂直居中的经典技巧 */
    text-align: center;                    /* 文字水平居中 */
    background: #c53030;                   /* 红底，做成醒目的提醒色 */
    color: #fff;                           /* 白字 */
    border-radius: 999px;                  /* 远大于高度的圆角 → 两端半圆，即胶囊形 */
    font-size: 12px;                       /* 小字号 */
    font-weight: 700;                      /* 加粗 */
    box-shadow: 0 2px 6px rgba(197, 48, 48, 0.4);   /* 与背景同色系的投影，让角标更立体 */
  }
</style>

<!-- 父容器写了 position: relative，才是角标的定位参照 -->
<div class="card">
  <!-- 角标写在最前面还是最后面都不影响显示位置，因为它已经 absolute 脱离文档流了 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 24px;                          /* 四周留白 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
  }

  .cover {
    position: relative;       /* 封面容器：给播放按钮当参照 */
    /* 只要写了 relative（且不写 top/left），元素外观完全不变，
       但它就成了内部所有 absolute 子元素的「坐标原点」。 */
    width: 320px;                          /* 封面宽度 */
    aspect-ratio: 16 / 9;                  /* 宽高比 16:9，高度由宽度自动算出（320 ÷ 16 × 9 = 180px） */
    border-radius: 12px;                   /* 圆角 */
    overflow: hidden;                      /* 裁掉溢出内容，让内部的遮罩也遵守圆角 */
    background: linear-gradient(135deg, #1f2a24, #2f6b4f);   /* 左上到右下的深绿渐变，代替真实封面图 */
  }
  /* 如果换成真实 <img>，这条规则让图片铺满且不变形 */
  .cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
  /* 半透明遮罩 + 居中按钮 */
  .overlay {
    position: absolute;                    /* 相对 .cover 定位 */
    inset: 0;                 /* top/right/bottom/left 全 0 */
    /* inset: 0 是 top:0; right:0; bottom:0; left:0 的简写。
       四边都贴住父级 → 遮罩自动铺满整个封面，不用写 width/height:100%。 */
    display: flex;                         /* 遮罩自己当 Flex 容器 */
    align-items: center;                   /* 纵向居中 */
    justify-content: center;               /* 横向居中 —— 于是播放按钮正好在封面正中间 */
    background: rgba(0, 0, 0, 0.25);       /* 25% 不透明度的黑，压暗封面让按钮更突出 */
    transition: background 0.2s;           /* 背景色变化时用 0.2 秒过渡，避免生硬跳变 */
  }
  /* .cover:hover .overlay 读作：当鼠标悬停在 .cover 上时，改变它内部 .overlay 的样式。
     :hover 是伪类，表示某种「状态」；写在祖先上就能联动改后代样式。 */
  .cover:hover .overlay { background: rgba(0, 0, 0, 0.4); }   /* 悬停时遮罩加深到 40% */
  .play {
    width: 56px;                           /* 按钮宽 */
    height: 56px;                          /* 按钮高（与宽相等才能做正圆） */
    border: none;                          /* 去掉默认边框 */
    border-radius: 50%;                    /* 圆角 50% → 正圆（前提是宽高相等） */
    background: rgba(255, 255, 255, 0.95); /* 近白色半透明底 */
    color: #2f6b4f;                        /* 三角图标用主题绿 */
    font-size: 22px;                       /* 图标字号 */
    cursor: pointer;                       /* 小手光标 */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);   /* 较大的柔和阴影，让按钮从封面上浮起 */
    /* 三角形播放图标用 padding 偏移模拟 */
    padding-left: 4px;                     /* ▶ 字形本身偏左，加 4px 左内边距让它视觉居中 */
  }
  .duration {
    position: absolute;                    /* 同样相对 .cover 定位 */
    bottom: 10px;                          /* 距封面底部 10px */
    right: 10px;                           /* 距封面右侧 10px → 贴右下角 */
    padding: 2px 8px;                      /* 内边距，做成小标签 */
    background: rgba(0, 0, 0, 0.7);        /* 70% 黑底，保证白字可读 */
    color: #fff;                           /* 白字 */
    font-size: 12px;                       /* 小字号 */
    border-radius: 4px;                    /* 小圆角 */
  }
</style>

<!-- 封面容器（relative）→ 内部两个 absolute 层：铺满的遮罩 + 右下角时长标签 -->
<div class="cover">
  <div class="overlay">
    <!-- aria-label 给读屏软件用：按钮里只有一个 ▶ 符号，
         没有可读文字，所以补一个「播放」的无障碍名称 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 48px;                          /* 留白大一些，tooltip 弹到按钮上方才不会被裁掉 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
  }

  .trigger {
    position: relative;       /* tooltip 的定位参照 */
    /* 关键：tooltip 用 absolute 定位，它会去找「最近的非 static 祖先」。
       这里把触发按钮设成 relative，tooltip 就以按钮为坐标原点。 */
    display: inline-flex;                  /* 行内 Flex：既能与文字同行，内部又能用 Flex 对齐 */
    align-items: center;                   /* 内部内容纵向居中 */
    gap: 6px;                              /* 内部子元素间距 6px */
    padding: 8px 14px;                     /* 上下 8px、左右 14px 内边距 */
    background: #2f6b4f;                   /* 主题绿底 */
    color: #fff;                           /* 白字 */
    border: none;                          /* 去掉默认边框 */
    border-radius: 8px;                    /* 圆角 */
    font: inherit;                         /* 继承页面字体，否则按钮会用浏览器默认字体 */
    cursor: pointer;                       /* 小手光标 */
  }
  .tooltip {
    position: absolute;                    /* 相对 .trigger 定位 */
    bottom: calc(100% + 8px); /* 出现在按钮上方，留 8px 间距 */
    /* 拆解：bottom 是「自己的下边缘距父级下边缘的距离」。
       100% 指父级高度，所以 bottom: 100% 会把 tooltip 整个顶到按钮正上方（紧贴）；
       calc() 可以做四则运算，再 + 8px 就是额外往上挪 8px 留出缝隙。
       注意 calc 里加减号两边必须留空格，否则不生效。 */
    left: 50%;                             /* 左边缘移到按钮宽度的中点（百分比参照父级宽度） */
    transform: translateX(-50%); /* 水平居中于按钮 */
    /* 为什么还要 translateX(-50%)？
       left: 50% 只是把 tooltip 的「左边缘」对准中线，整体会偏右。
       translateX 的百分比参照的是「自身宽度」，往左挪自己一半宽，
       中点才真正对齐中线 —— 这就是经典的居中套路，且不需要知道 tooltip 多宽。 */
    padding: 6px 10px;                     /* 气泡内边距 */
    background: #1f2a24;                   /* 深色气泡底 */
    color: #e8f0eb;                        /* 浅色文字 */
    font-size: 12px;                       /* 小字号 */
    white-space: nowrap;                   /* 禁止换行，气泡保持一行（否则窄处会折成多行） */
    border-radius: 6px;                    /* 圆角 */
    opacity: 0;                            /* 完全透明 = 平时看不见，但元素仍在（可以做淡入动画） */
    pointer-events: none;                  /* 不接收鼠标事件，避免透明的气泡挡住按钮点击 */
    transition: opacity 0.15s;             /* 透明度变化用 0.15 秒过渡，实现淡入淡出 */
  }
  /* 小三角 */
  /* ::after 是伪元素：在 .tooltip 内容的「后面」插入一个虚拟节点，
     它不存在于 HTML 里，纯靠 CSS 生成，常用来做装饰（这里做气泡的小尖角）。 */
  .tooltip::after {
    content: '';                           /* content 是伪元素的必填项，哪怕是空字符串；不写则伪元素不显示 */
    position: absolute;                    /* 相对 .tooltip 定位（tooltip 自己是 absolute，也算非 static） */
    top: 100%;                             /* 顶边对齐气泡的底边 → 三角挂在气泡下方 */
    left: 50%;                             /* 配合下一行做水平居中 */
    transform: translateX(-50%);           /* 往左移自身一半宽，真正居中 */
    border: 5px solid transparent;         /* 宽高为 0 的元素加粗边框后，四条边各是一个三角形；先全部透明 */
    border-top-color: #1f2a24;             /* 只把上边框染成气泡色 → 只剩一个朝下的实心小三角 */
  }
  /* 逗号分隔表示两种情况都生效：
     :hover 鼠标悬停在按钮上；:focus 按钮通过键盘 Tab 获得焦点。
     加上 :focus 是为了让只用键盘的用户也能看到提示。 */
  .trigger:hover .tooltip,
  .trigger:focus .tooltip { opacity: 1; }  /* 把透明度调回 1 → 气泡淡入显示 */
</style>

<!-- tooltip 直接写在按钮内部，这样才能被 .trigger:hover .tooltip 这种后代选择器命中 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 0;                             /* 遮罩要铺满，清掉默认外边距 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
    min-height: 220px;                     /* 给页面一个最小高度，遮罩才有足够面积可看 */
  }

  .page { padding: 24px; }                 /* 底层页面内容的内边距 */
  .page h2 { margin: 0 0 8px; }            /* 标题：只保留下方 8px 间距 */
  .page p { margin: 0 0 16px; color: #5c6b62; }   /* 说明文字 */
  .open-btn {
    padding: 10px 18px;                    /* 内边距 */
    border: 0;                             /* 去掉默认边框 */
    border-radius: 8px;                    /* 圆角 */
    background: #2f6b4f;                   /* 主题绿 */
    color: #fff;                           /* 白字 */
    font: inherit;                         /* 继承页面字体 */
    font-weight: 600;                      /* 半粗体（写在 font 简写之后才不会被覆盖） */
    cursor: pointer;                       /* 小手光标 */
  }

  /* fixed：相对视口定位；默认隐藏，.open 时显示 */
  .backdrop {
    position: fixed;                       /* 相对「浏览器视口」定位，页面滚动时它不会跟着走 */
    inset: 0;                              /* 四边都贴 0 → 铺满整个视口，正好当遮罩层 */
    background: rgba(31, 42, 36, 0.45);    /* 45% 不透明的深绿黑，压暗背后内容 */
    display: none;                         /* 默认完全不渲染 = 弹窗关闭状态 */
    align-items: center;                   /* 纵向居中（只有在 display 变成 flex 后才起作用） */
    justify-content: center;               /* 横向居中 */
    z-index: 100;                          /* 层级调高，确保盖在页面所有普通内容之上 */
  }
  /* 加上 .open 类时才切成 flex 显示。
     注意：正因为提前写好了 align-items / justify-content，
     一旦变成 flex，对话框立刻自动居中，不需要额外计算。 */
  .backdrop.open { display: flex; }
  .dialog {
    width: min(360px, 90vw);               /* min() 取较小值：宽屏时 360px，窄屏时不超过视口宽的 90%（vw = 视口宽度的 1%） */
    padding: 24px;                         /* 内边距 */
    background: #fff;                      /* 白色对话框 */
    border-radius: 14px;                   /* 圆角 */
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);   /* 又大又柔的投影，强调它浮在最上层 */
  }
  .dialog h3 { margin: 0 0 8px; color: #1f2a24; }               /* 对话框标题 */
  .dialog p { margin: 0 0 20px; color: #5c6b62; font-size: 13px; }   /* 对话框正文 */
  .actions { display: flex; gap: 8px; justify-content: flex-end; }   /* 按钮组：横向排列，间距 8px，整体靠右 */
  .btn {
    padding: 8px 16px;                     /* 内边距 */
    border-radius: 8px;                    /* 圆角 */
    border: 1px solid #9bb5a6;             /* 描边（次要按钮的默认外观） */
    background: #fff;                      /* 白底 */
    font: inherit;                         /* 继承字体 */
    cursor: pointer;                       /* 小手光标 */
  }
  /* .btn.primary：同时带 btn 和 primary 两个类，用来做「危险/主操作」按钮 */
  .btn.primary { background: #c53030; color: #fff; border-color: #c53030; }   /* 红底白字，提示这是不可撤销操作 */
</style>

<!-- 底层页面内容 -->
<div class="page">
  <h2>我的文件</h2>
  <p>点击下方按钮打开确认框；点「取消 / 删除」或遮罩可关闭。</p>
  <!-- id 供 JS 精确抓取；type="button" 保证它不会意外提交表单 -->
  <button type="button" class="open-btn" id="open-modal">删除文件…</button>
</div>

<!-- 遮罩层：整个弹窗（遮罩 + 对话框）平时是 display:none 的。
     aria-hidden="true" 告诉读屏软件「这块现在不可见，请忽略」，
     打开时 JS 会把它改成 false。 -->
<div class="backdrop" id="backdrop" aria-hidden="true">
  <!-- role="dialog" 声明这是对话框；
       aria-modal="true" 表示它是模态的（打开时背后内容不可交互）；
       aria-labelledby 指向标题元素的 id，读屏时用那段文字当对话框的名字。 -->
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
  // 先把遮罩元素存进变量，后面反复用，避免每次都去查询 DOM
  const backdrop = document.getElementById('backdrop')

  // 打开弹窗：加 .open 让 CSS 把 display 从 none 变成 flex
  const open = () => {
    backdrop.classList.add('open')
    // 同步无障碍状态：现在可见了，所以 aria-hidden 改为 false
    backdrop.setAttribute('aria-hidden', 'false')
  }
  // 关闭弹窗：把上面两步反过来做
  const close = () => {
    backdrop.classList.remove('open')
    backdrop.setAttribute('aria-hidden', 'true')
  }

  // 三个按钮分别绑定：主按钮开；取消和删除都关（本 Demo 不做真实删除）
  document.getElementById('open-modal').addEventListener('click', open)
  document.getElementById('btn-cancel').addEventListener('click', close)
  document.getElementById('btn-ok').addEventListener('click', close)
  // 点遮罩关闭；点对话框本身不关闭
  backdrop.addEventListener('click', (e) => {
    // 点击会「冒泡」：点对话框时事件也会传到遮罩上，如果不判断就会误关。
    // e.target 是真正被点中的那个元素，只有它就是遮罩本身时才关闭。
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 0;                             /* 底部栏要贴边铺满，清掉默认外边距 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
    color: #1f2a24;                        /* 全局文字色 */
  }

  .content { padding: 16px 16px 80px; } /* 底部留白，避免被 fixed 栏遮挡 */
  /* padding 三值 = 上 16px / 左右 16px / 下 80px。
     因为 fixed 元素脱离文档流、不占位置，它会直接压在内容上，
     所以必须手动给内容底部预留出「比操作栏更高」的空白。 */
  .item {
    padding: 14px;                         /* 商品行内边距 */
    margin-bottom: 10px;                   /* 行之间间隔 10px */
    background: #eef6f1;                   /* 浅绿底 */
    border-radius: 8px;                    /* 圆角 */
  }
  .bar {
    position: fixed;          /* 固定于视口 */
    /* fixed 的参照物是浏览器视口（而不是任何祖先元素），
       所以无论页面怎么滚，这条栏都稳稳停在同一个位置。 */
    bottom: 0;                             /* 贴视口底部 */
    left: 0;                               /* 贴左边 */
    right: 0;                              /* 贴右边（左右都为 0 → 自动横向铺满，不用写 width:100%） */
    display: flex;                         /* 内部横向排列 */
    align-items: center;                   /* 价格和按钮纵向居中对齐 */
    justify-content: space-between;        /* 两端对齐：价格靠左、按钮靠右，中间空隙自动分配 */
    padding: 12px 16px;                    /* 内边距 */
    background: #fff;                      /* 白底（必须有不透明背景，否则会看到下方内容透过来） */
    border-top: 1px solid #d9e0d8;         /* 顶部细线，和内容区分开 */
    box-shadow: 0 -4px 16px rgba(31, 42, 36, 0.08);   /* y 偏移写负值 = 阴影朝上投，强调这条栏浮在内容之上 */
    z-index: 50;                           /* 提高层级，确保盖住普通内容 */
  }
  .price { font-size: 18px; font-weight: 700; color: #c53030; }              /* 价格：大号加粗红字 */
  .price small { font-size: 12px; color: #5c6b62; font-weight: 400; }        /* 「合计」二字：小一号、灰色、不加粗 */
  .checkout {
    padding: 10px 24px;                    /* 左右内边距大一些，按钮更好点 */
    background: #2f6b4f;                   /* 主题绿 */
    color: #fff;                           /* 白字 */
    border: none;                          /* 去掉默认边框 */
    border-radius: 8px;                    /* 圆角 */
    font: inherit;                         /* 继承页面字体 */
    font-weight: 600;                      /* 半粗体 */
    cursor: pointer;                       /* 小手光标 */
  }
</style>

<!-- 可滚动的页面内容；底部预留了 80px 空白 -->
<div class="content">
  <!-- 行内 style 里的 margin-top:0 用来抵消 h2 自带的上外边距 -->
  <h2 style="margin-top:0;">购物车</h2>
  <div class="item">React 实战课程 × 1</div>
  <div class="item">CSS 布局手册 × 1</div>
  <div class="item">TypeScript 入门 × 1</div>
</div>

<!-- 固定底栏：写在文档最后，但因为是 fixed，位置由 CSS 决定而非文档顺序 -->
<div class="bar">
  <!-- <small> 是语义化的「附注」标签，这里用来放较小的「合计」字样 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 0;                             /* 顶栏要贴边铺满，清掉默认外边距 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
    /* fixed 顶栏高度 52px，内容区需 padding-top 避免被遮挡 */
    padding-top: 52px;
    /* 这是 fixed 顶栏的必备补偿：fixed 元素不占文档流空间，
       如果不加这 52px 内边距，页面第一屏的内容就会被顶栏盖住。
       数值要和顶栏的 height 保持一致。 */
    color: #1f2a24;                        /* 全局文字色 */
  }
  .navbar {
    position: fixed;                       /* 相对视口固定，滚动时不移动 */
    top: 0;                                /* 贴视口顶部 */
    left: 0;                               /* 贴左 */
    right: 0;                              /* 贴右（左右都 0 → 自动横向铺满） */
    height: 52px;                          /* 固定高度，和 body 的 padding-top 对应 */
    display: flex;                         /* 内部横向排列 */
    align-items: center;                   /* 纵向居中 */
    justify-content: space-between;        /* 两端对齐：logo 靠左、导航靠右 */
    padding: 0 20px;                       /* 上下 0、左右 20px */
    background: rgba(255, 255, 255, 0.92); /* 92% 不透明的白，略微透出下方内容 */
    backdrop-filter: blur(8px);            /* 对「元素背后」的画面做 8px 模糊 → 毛玻璃效果（需配合半透明背景） */
    border-bottom: 1px solid #d9e0d8;      /* 底部细线，划出顶栏边界 */
    z-index: 100;                          /* 层级足够高，确保压在所有内容之上 */
  }
  .navbar .logo { font-weight: 700; color: #2f6b4f; }   /* 品牌名：加粗 + 主题绿 */
  /* 顶栏链接用 button 模拟，避免 href="#" 跳转；本 Demo 重点在 fixed 滚动 */
  /* .navbar nav button 是层层后代选择器：.navbar 里的 nav 里的 button */
  .navbar nav button {
    margin-left: 16px;                     /* 每项左侧间隔 16px */
    padding: 0;                            /* 清掉按钮默认内边距，看起来像纯文字 */
    border: 0;                             /* 去掉边框 */
    background: none;                      /* 去掉背景 */
    color: #5c6b62;                        /* 未选中项用灰绿色 */
    font: inherit;                         /* 继承页面字体 */
    cursor: pointer;                       /* 小手光标 */
  }
  .navbar nav button.active { color: #2f6b4f; font-weight: 600; }   /* 当前项：主题绿 + 半粗体 */
  main { padding: 24px 20px; max-width: 640px; }   /* 正文区内边距；限制最大宽度让长文更易读 */
  .block {
    height: 100px;                         /* 固定高度，堆几个就能撑出滚动条 */
    margin-bottom: 12px;                   /* 区块间隔 */
    background: #eef6f1;                   /* 浅绿底 */
    border-radius: 8px;                    /* 圆角 */
    display: flex;                         /* Flex 居中文字 */
    align-items: center;                   /* 纵向居中 */
    justify-content: center;               /* 横向居中 */
    color: #5c6b62;                        /* 文字色 */
  }
</style>

<!-- <header> 语义化头部；这里用 fixed 钉在视口顶部 -->
<header class="navbar">
  <div class="logo">LearnHub</div>
  <!-- <nav> 表示导航区；三个按钮只是演示外观，没有绑定跳转逻辑 -->
  <nav>
    <!-- active 类标记「当前所在页」，此处是写死的静态状态 -->
    <button type="button" class="active">首页</button>
    <button type="button">课程</button>
    <button type="button">关于</button>
  </nav>
</header>

<!-- 主内容：向下滚动即可验证顶栏始终可见 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 0;                             /* 各区块要通栏铺满，清掉默认外边距 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
  }

  .hero {
    padding: 40px 20px;                    /* 上下 40px、左右 20px，撑出一块视觉焦点区 */
    background: linear-gradient(135deg, #2f6b4f, #6fcf97);   /* 左上到右下的绿色渐变 */
    color: #fff;                           /* 白字 */
    text-align: center;                    /* 文字居中 */
  }
  .hero h1 { margin: 0; font-size: 24px; } /* 清掉 h1 默认外边距，避免渐变块出现白边 */
  .tabs {
    position: sticky;         /* 滚动到阈值前正常流，之后「粘」在 top */
    /* sticky 是 relative 和 fixed 的混合体：
       ① 没滚到阈值时，它就是普通的 relative 元素，正常占位、跟着页面走；
       ② 一旦它距离滚动容器顶部小于 top 的值，就切换成「钉住」状态；
       ③ 父容器滚完后它又会被带走，不会永远悬停（这点和 fixed 不同）。
       两个常见坑：必须写 top（或 bottom/left/right）之一，否则毫无效果；
       任何祖先元素设了 overflow: hidden/auto/scroll 都会让 sticky 失效或提前结束。 */
    top: 0;                                /* 阈值：距顶部 0 时开始吸附 */
    z-index: 10;                           /* 提高层级，吸顶后压在下方内容之上 */
    display: flex;                         /* 三个 tab 横向排列 */
    gap: 0;                                /* 相邻 tab 之间不留缝，形成一整条 */
    background: #fff;                      /* 不透明白底，吸顶时才能遮住下面滚过的内容 */
    border-bottom: 1px solid #d9e0d8;      /* 底部分隔线 */
  }
  .tab {
    flex: 1;                               /* 三个 tab 平分宽度 */
    padding: 12px;                         /* 内边距，撑出点击高度 */
    text-align: center;                    /* 文字居中 */
    font-size: 13px;                       /* 字号 */
    color: #5c6b62;                        /* 未选中用灰绿色 */
    border-bottom: 2px solid transparent;  /* 先占好 2px 透明下边框：这样切到选中态时不会因为多出边框而抖动 */
  }
  .tab.active { color: #2f6b4f; font-weight: 700; border-bottom-color: #2f6b4f; }   /* 选中态：变绿、加粗，并把预留的下边框染色成指示条 */
  .section { padding: 20px; }              /* 内容区内边距 */
  .card {
    height: 80px;                          /* 固定高度，多堆几个才能滚起来 */
    margin-bottom: 10px;                   /* 卡片间隔 */
    background: #eef6f1;                   /* 浅绿底 */
    border-radius: 8px;                    /* 圆角 */
    display: flex;                         /* Flex 便于纵向居中文字 */
    align-items: center;                   /* 纵向居中 */
    padding: 0 16px;                       /* 左右内边距，文字不贴边 */
    color: #5c6b62;                        /* 文字色 */
  }
</style>

<!-- 顶部大图区：会随页面一起滚走 -->
<div class="hero"><h1>产品详情</h1></div>
<!-- Tab 栏：滚动到顶部时会粘住 -->
<div class="tabs">
  <div class="tab active">概述</div>
  <div class="tab">规格</div>
  <div class="tab">评价</div>
</div>
<!-- 足够长的内容，用来产生滚动条以观察吸顶效果 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 0;                             /* 列表要通栏，清掉默认外边距 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
    color: #1f2a24;                        /* 全局文字色 */
  }

  .list { max-width: 400px; margin: 0 auto; }
  /* margin: 0 auto 是块级元素水平居中的经典写法：
     上下 0，左右 auto 表示「剩余空间左右平分」，配合 max-width 才有效果。 */
  .section-title {
    position: sticky;                      /* 章节标题吸顶：滚到顶部时粘住 */
    top: 0;                                /* 吸附阈值为距顶 0；不写 top 则 sticky 无效 */
    /* 注意这里没有额外的滚动容器，sticky 参照的就是整个页面的滚动。
       多个 sticky 元素依次滚上来时，后面的会把前面的顶走，
       形成通讯录那种「章节头依次替换」的效果。 */
    padding: 10px 16px;                    /* 内边距 */
    background: #eef6f1;                   /* 不透明浅绿底，吸顶时才能遮住滚过的行 */
    font-weight: 700;                      /* 加粗 */
    font-size: 13px;                       /* 小字号 */
    color: #2f6b4f;                        /* 主题绿 */
    border-bottom: 1px solid #9bb5a6;      /* 底部分隔线 */
    z-index: 5;                            /* 层级高于列表行，避免被行内容盖住 */
  }
  .row {
    padding: 12px 16px;                    /* 每行内边距 */
    border-bottom: 1px solid #f0f4f2;      /* 行之间的细分隔线 */
    display: flex;                         /* 头像和文字横向排列 */
    align-items: center;                   /* 纵向居中对齐 */
    gap: 12px;                             /* 头像与文字间距 12px */
  }
  .avatar {
    width: 36px;                           /* 头像宽 */
    height: 36px;                          /* 头像高（与宽相等才能是正圆） */
    border-radius: 50%;                    /* 50% 圆角 → 正圆 */
    background: #d9ebe1;                   /* 浅绿占位色，代替真实头像图 */
    flex-shrink: 0;                        /* 禁止被压缩：Flex 项默认会在空间不足时缩小，圆头像会被压成椭圆 */
  }
  .name { font-weight: 500; }              /* 姓名：中等字重 */
  .sub { font-size: 12px; color: #5c6b62; }   /* 状态说明：小字灰绿 */
</style>

<!-- 通讯录列表；每个 .section-title 都是一个会吸顶的章节头 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 16px;                          /* 页面四周留白 */
    font: 13px/1.4 system-ui, sans-serif;  /* 表格类内容字号小一点、行高紧凑一点 */
    color: #1f2a24;                        /* 全局文字色 */
  }

  .table-wrap {
    max-height: 220px;        /* 限制高度触发滚动 */
    overflow: auto;
    /* 这两条配合使用：内容超过 220px 时，这个 div 自己变成「滚动容器」。
       本例的 sticky 表头就是相对这个容器吸顶的，而不是相对整个页面 ——
       注意这里 overflow 是有意为之，因为 sticky 元素在容器「内部」；
       如果 overflow 加在 sticky 元素的祖先之外的层级上，反而会让吸顶失效。 */
    border: 1px solid #9bb5a6;             /* 外框 */
    border-radius: 10px;                   /* 圆角 */
  }
  table { width: 100%; border-collapse: collapse; }   /* 表格铺满容器；collapse 合并边框避免双线 */
  th, td { padding: 10px 14px; text-align: left; border-bottom: 1px solid #eef6f1; }   /* 表头与单元格公共样式 */
  th {
    position: sticky;                      /* 表头单元格吸顶 */
    top: 0;                   /* 表头吸在滚动容器顶部 */
    background: #2f6b4f;                   /* 深绿底（必须不透明，否则会看见数据行从背后穿过） */
    color: #fff;                           /* 白字 */
    font-weight: 600;                      /* 半粗体 */
    z-index: 2;                            /* 层级高于数据行 */
  }
  /* tr:hover td 读作：鼠标悬停在某一行 <tr> 上时，改变该行内所有 <td> 的样式。
     为什么不直接写 tr:hover { background } ？因为 td 自己的背景会盖住 tr 的背景，
     所以要把颜色加在 td 上才可靠。 */
  tr:hover td { background: #f7faf8; }     /* 悬停行高亮，方便横向阅读数据 */
  /* td.num：带 num 类的单元格，用于数字列 */
  td.num {
    text-align: right;                     /* 数字右对齐，个位数能对齐更好比较大小 */
    font-variant-numeric: tabular-nums;    /* 启用等宽数字：每个数字占同样宽度，上下列不会参差不齐 */
  }
</style>

<!-- 滚动容器：限制了 max-height，所以表格在它内部滚动 -->
<div class="table-wrap">
  <table>
    <!-- <thead> 表头区，语义上标明这些是标题行；里面的 th 设了 sticky -->
    <thead>
      <tr><th>商品</th><th>分类</th><th class="num">库存</th><th class="num">单价</th></tr>
    </thead>
    <!-- <tbody> 数据区 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 16px;                          /* 页面四周留白 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
  }

  .row { display: flex; gap: 24px; flex-wrap: wrap; }
  /* 两组对比示例横向并排；flex-wrap: wrap 允许空间不够时换行，窄屏也不会挤爆 */
  .demo { flex: 1; min-width: 200px; }     /* 两组平分宽度，但每组至少 200px（配合 wrap 实现简易响应式） */
  .demo h4 { margin: 0 0 8px; font-size: 13px; color: #2f6b4f; }   /* 每组的小标题 */

  .flow { border: 1px dashed #9bb5a6; padding: 8px; border-radius: 8px; }
  /* 虚线框（dashed）代表「正常文档流」的范围，方便看出谁还占着位置 */
  .box {
    width: 60px;                           /* 固定宽 */
    height: 40px;                          /* 固定高 */
    background: #d9ebe1;                   /* 浅绿底 */
    border: 1px solid #9bb5a6;             /* 边框 */
    border-radius: 4px;                    /* 小圆角 */
    display: flex;                         /* Flex 居中盒内文字 */
    align-items: center;                   /* 纵向居中 */
    justify-content: center;               /* 横向居中 */
    font-size: 12px;                       /* 小字号 */
    margin-bottom: 6px;                    /* 盒子之间纵向间隔 6px */
  }
  /* relative：相对自身原位置偏移，仍占据原来的空间 */
  .rel-box {
    position: relative;                    /* 关键：relative 的参照物是「它自己原本该在的位置」 */
    top: 12px;                             /* 相对原位置往下移 12px */
    left: 20px;                            /* 相对原位置往右移 20px */
    /* 重点：这只是「视觉上」挪走了，它原来那块空间依旧被保留着，
       所以下方的 box3 不会往上补位 —— 这是 relative 和 absolute 最大的区别。 */
    background: #2f6b4f;                   /* 深绿底，突出这个被偏移的盒子 */
    color: #fff;                           /* 白字 */
  }
  /* absolute：完全脱离文档流，不占位 */
  .abs-parent { position: relative; min-height: 100px; }
  /* 父级设 relative（自身不偏移），只为给里面的 absolute 子元素提供参照；
     再给一个 min-height，否则子元素脱离文档流后父级会「塌陷」变矮。 */
  .abs-box {
    position: absolute;                    /* 脱离文档流，不再占据任何空间 */
    top: 20px;                             /* 距父级 .abs-parent 内边缘顶部 20px */
    left: 40px;                            /* 距父级左边缘 40px */
    /* 因为它不占位了，原本排在它后面的 box3 会直接顶上来填补空缺。 */
    background: #c53030;                   /* 红底，强调它已经「浮」出文档流 */
    color: #fff;                           /* 白字 */
  }
  .note { font-size: 11px; color: #5c6b62; margin-top: 6px; }   /* 每组下方的结论说明 */
</style>

<!-- 两组示例并排，HTML 结构完全一致，只有第 2 个盒子的定位方式不同 -->
<div class="row">
  <!-- 左组：relative -->
  <div class="demo">
    <h4>relative — 保留占位</h4>
    <div class="flow">
      <div class="box">1</div>
      <!-- 两个 class：.box 提供外观，.rel-box 负责 relative 偏移 -->
      <div class="box rel-box">2 ↘</div>
      <div class="box">3（不被覆盖）</div>
    </div>
    <p class="note">box2 视觉偏移，但原位置仍留白</p>
  </div>
  <!-- 右组：absolute。容器多加了 .abs-parent 来当定位参照 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 32px;                          /* 四周留白多一些，层叠块不贴边 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
  }

  .stage {
    position: relative;                    /* 舞台容器：给三个 absolute 色块当定位参照 */
    width: 280px;                          /* 固定宽 */
    height: 180px;                         /* 固定高（子元素都 absolute 脱离文档流，父级必须写死高度才不会塌陷） */
  }
  .layer {
    position: absolute;                    /* 三个色块都绝对定位，才能互相重叠 */
    width: 120px;                          /* 统一宽 */
    height: 80px;                          /* 统一高 */
    border-radius: 10px;                   /* 圆角 */
    display: flex;                         /* Flex 居中文字 */
    align-items: center;                   /* 纵向居中 */
    justify-content: center;               /* 横向居中 */
    font-size: 13px;                       /* 字号 */
    font-weight: 700;                      /* 加粗 */
    color: #fff;                           /* 白字 */
    box-shadow: 0 4px 12px rgba(0,0,0,.15);   /* 淡投影，增强层次感 */
  }
  /* z-index 只在定位元素（或非 static）上生效 */
  /* 关于层叠的三点认识：
     ① 不写 z-index 时，后写的 HTML 元素盖在先写的上面（文档顺序决定）；
     ② 写了 z-index 后，数值大的盖在数值小的上面，与 HTML 顺序无关；
     ③ 比较只在「同一个层叠上下文」内进行 —— 这里三块的父级都是 .stage，属于同一上下文，
        所以能直接比。若某个祖先自己形成了新的层叠上下文（如设置了 opacity 小于 1、transform 等），
        它内部子元素的 z-index 再大也翻不出这个祖先所在的层级。 */
  .a { top: 20px;  left: 20px;  background: #2f6b4f; z-index: 1; }   /* 绿块：层级最低，被其它两块压住 */
  .b { top: 50px;  left: 80px;  background: #3182ce; z-index: 3; } /* 最高 */
  .c { top: 80px;  left: 140px; background: #c53030; z-index: 2; }   /* 红块：虽然写在最后，但 z-index 2 小于蓝块的 3，所以仍被蓝块压住 */
  .legend { margin-top: 16px; font-size: 12px; color: #5c6b62; }     /* 底部图例文字 */
  /* .legend span：图例里的小色块。span 是行内元素，必须改成 inline-block 才能设置宽高 */
  .legend span { display: inline-block; width: 12px; height: 12px; border-radius: 2px; margin-right: 4px; vertical-align: middle; }
  /* vertical-align: middle 让小色块与旁边文字在垂直方向大致居中对齐 */
</style>

<!-- 舞台（relative）内放三个 absolute 色块，通过不同 top/left 让它们部分重叠 -->
<div class="stage">
  <div class="layer a">z:1</div>
  <div class="layer b">z:3 最上</div>
  <div class="layer c">z:2</div>
</div>
<!-- 图例：每个 span 用行内 style 指定颜色方块 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 24px;                          /* 四周留白 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
  }

  /* Stack 容器：类似 Flutter Stack widget */
  /* 思路：容器 relative 定好范围，内部每一层都用 absolute 贴到想要的边角，
     于是多个图层像叠卡片一样堆起来 —— 这就是 Flutter Stack 的 CSS 版本。 */
  .stack {
    position: relative;       /* 所有 absolute 子元素相对此容器 */
    width: 280px;                          /* 固定宽 */
    height: 200px;                         /* 固定高（子元素都脱离文档流，必须写死高度） */
    border-radius: 16px;                   /* 大圆角 */
    overflow: hidden;                      /* 裁掉超出圆角的图层，避免方角背景露出来 */
    background: #1f2a24;                   /* 兜底深色底 */
  }
  /* 第 1 层：铺满的渐变背景 */
  .stack-bg {
    position: absolute;                    /* 绝对定位 */
    inset: 0;                              /* 四边贴 0 → 铺满整张卡片（等于 top/right/bottom/left 都是 0） */
    background: linear-gradient(160deg, #2f6b4f 0%, #1a2420 100%);   /* 160deg 的斜向渐变，从绿到近黑 */
  }
  /* 第 2 层：左下角的标题文字块 */
  .stack-content {
    position: absolute;                    /* 绝对定位 */
    bottom: 16px;                          /* 距底部 16px */
    left: 16px;                            /* 距左侧 16px */
    right: 16px;                           /* 距右侧 16px（左右同时给值 → 宽度自动撑开，长标题能正常换行） */
    color: #fff;                           /* 白字，压在深色渐变上 */
  }
  .stack-content h3 { margin: 0 0 4px; font-size: 18px; }             /* 主标题 */
  .stack-content p { margin: 0; font-size: 12px; opacity: 0.85; }     /* 副标题；opacity 0.85 让它比标题弱一点 */
  /* 第 3 层：左上角的「精选」小胶囊 */
  .stack-badge {
    position: absolute;                    /* 绝对定位 */
    top: 12px;                             /* 距顶 12px */
    left: 12px;                            /* 距左 12px → 钉在左上角 */
    padding: 4px 10px;                     /* 内边距 */
    background: rgba(255,255,255,0.2);     /* 20% 白色半透明底 */
    backdrop-filter: blur(4px);            /* 模糊背后画面 4px，做出毛玻璃质感 */
    border-radius: 999px;                  /* 超大圆角 → 胶囊形 */
    font-size: 11px;                       /* 小字号 */
    color: #fff;                           /* 白字 */
  }
  /* 第 4 层：右上角的圆形收藏按钮 */
  .stack-action {
    position: absolute;                    /* 绝对定位 */
    top: 12px;                             /* 距顶 12px */
    right: 12px;                           /* 距右 12px → 钉在右上角 */
    width: 32px;                           /* 宽 */
    height: 32px;                          /* 高（与宽相等才能做正圆） */
    border: none;                          /* 去掉默认边框 */
    border-radius: 50%;                    /* 正圆 */
    background: rgba(255,255,255,0.9);     /* 近白半透明底 */
    font-size: 16px;                       /* 图标字号 */
    cursor: pointer;                       /* 小手光标 */
  }
</style>

<!-- Stack 容器。这里没有写任何 z-index：
     几个 absolute 层互不重叠位置，且背景层写在最前面，
     按「文档顺序靠后者在上」的默认规则，背景自然在最底下。 -->
<div class="stack">
  <div class="stack-bg"></div>
  <span class="stack-badge">精选</span>
  <!-- aria-label 补充无障碍名称：按钮里只有一个 ♡ 符号，读屏软件读不出含义 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  /* 逗号选择器同时命中 html 和 body。
     height: 100% 必须两个都写：body 的百分比高度参照的是 html，
     而 html 的参照是视口。少写一个，下面的「页脚沉底」就失效了。 */
  html, body { height: 100%; margin: 0; }
  body {
    display: flex;                         /* 把 body 本身当成 Flex 容器 */
    flex-direction: column;   /* 纵向排列：头-身-脚 */
    /* 默认 row 是横向；改成 column 后主轴变成竖直方向，
       于是 header / main / footer 自上而下排成一列。 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
    color: #1f2a24;                        /* 全局文字色 */
  }
  header {
    padding: 14px 20px;                    /* 内边距 */
    background: #2f6b4f;                   /* 主题绿底 */
    color: #fff;                           /* 白字 */
    display: flex;                         /* 顶栏内部横向排列 */
    justify-content: space-between;        /* 两端对齐：站名靠左、导航靠右 */
    align-items: center;                   /* 纵向居中 */
  }
  .top-links { display: flex; gap: 4px; align-items: center; }   /* 导航按钮组：横向、间距 4px、纵向居中 */
  .top-links button {
    border: 0; background: transparent; color: rgba(255,255,255,.85);   /* 去边框去底色，文字用 85% 白 */
    font: inherit; font-size: 13px; cursor: pointer; margin-left: 12px; padding: 0;
    /* font: inherit 继承页面字体后，再用 font-size 覆盖成 13px（顺序不能颠倒，否则被简写覆盖）；
       padding: 0 清掉按钮默认内边距，让它看起来就是一段普通文字链接。 */
  }
  /* :hover 是伪类，表示「鼠标悬停」状态。
     这条规则只在指针移到 .top-links 里的按钮上时生效。 */
  .top-links button:hover { color: #fff; text-decoration: underline; }
  /* text-decoration: underline 给文字加下划线，模仿链接的悬停反馈 */
  main {
    flex: 1;                  /* 撑满中间，footer 自然沉底 */
    /* flex: 1 让 main 吃掉 body 里剩余的全部高度。
       所以哪怕正文只有一行字，页脚也会被推到视口最底部 ——
       这就是经典的 sticky footer（页脚沉底）方案。 */
    padding: 24px 20px;                    /* 内边距 */
    background: #f7faf8;                   /* 极浅底色，和顶栏页脚区分 */
    max-width: 720px;                      /* 正文最大宽度，行太长不易阅读 */
    width: 100%;                           /* 窄屏时铺满 */
    margin: 0 auto;                        /* 左右 auto → 在 body 里水平居中 */
  }
  footer {
    padding: 12px 20px;                    /* 内边距 */
    background: #eef6f1;                   /* 浅绿底 */
    text-align: center;                    /* 文字居中 */
    font-size: 12px;                       /* 小字号 */
    color: #5c6b62;                        /* 灰绿字 */
    border-top: 1px solid #d9e0d8;         /* 顶部细线，和正文分隔 */
  }
</style>

<!-- 三段式结构的第 1 段：<header> 语义化头部 -->
<header>
  <strong>SiteName</strong>
  <nav class="top-links">
    <!-- 装饰性顶栏：用 button，避免 href="#" 跳转 -->
    <!-- type="button" 明确它不是提交按钮，纯装饰、不触发任何默认行为 -->
    <button type="button">文档</button>
    <button type="button">博客</button>
    <button type="button">GitHub</button>
  </nav>
</header>
<!-- 第 2 段：<main> 主内容，靠 flex:1 吃掉剩余高度 -->
<main>
  <!-- 行内 style 抵消 h1 自带的上外边距，避免正文区顶部多一段空白 -->
  <h1 style="margin-top:0;">文章标题</h1>
  <p>这是正文区域。内容少时 footer 仍贴在视口底部，靠 flex:1 实现。</p>
</main>
<!-- 第 3 段：<footer> 页脚 -->
<footer>© 2026 SiteName · 保留所有权利</footer>`,
  },
  {
    id: 'p2-skel-admin-2col',
    title: '两栏后台管理',
    group: '06-页面骨架',
    summary: '侧栏切换：仪表盘 / 用户 / 订单 / 设置（带简单界面）',
    code: `<style>
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 0;                             /* 后台布局要贴满，清掉默认外边距 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
    color: #1f2a24;                        /* 全局文字色 */
  }

  .admin {
    display: grid;                         /* 网格容器 */
    grid-template-columns: 220px 1fr;      /* 左侧栏固定 220px，右工作区 1fr 吃掉剩余宽度 */
    min-height: 360px;                     /* 最小高度，保证侧栏色块有面积 */
  }
  .sidenav {
    background: #1a2420;                   /* 深色侧栏底 */
    color: #b8cfc0;                        /* 浅绿字（子元素通过 inherit 继承它） */
    padding: 20px 0;                       /* 上下 20px、左右 0（左右留白交给每个菜单项自己的 padding） */
  }
  .sidenav .brand {
    padding: 0 20px 20px;                  /* 三值 = 上 0 / 左右 20px / 下 20px */
    font-weight: 700;                      /* 加粗 */
    color: #fff;                           /* 品牌名用纯白，比菜单更醒目 */
    font-size: 16px;                       /* 稍大字号 */
  }
  /* 侧栏用 button，不要用 href="#" —— 避免跳转、方便 JS 切面板 */
  .sidenav button {
    display: block;                        /* 块级，每项独占一行 */
    width: 100%;                           /* 撑满侧栏，整行可点、高亮色块也是通栏 */
    padding: 10px 20px;                    /* 内边距 */
    border: 0;                             /* 去掉默认边框 */
    background: transparent;               /* 透明背景 */
    color: inherit;                        /* 继承 .sidenav 的浅绿色文字（按钮默认是黑色，必须显式继承） */
    font: inherit;                         /* 继承字体，否则按钮字体变小 */
    text-align: left;                      /* 左对齐，符合菜单习惯 */
    cursor: pointer;                       /* 小手光标 */
  }
  /* 逗号选择器：悬停状态和选中状态用同一套高亮样式。
     :hover 是鼠标悬停伪类；.active 是 JS 点击后加上的类。 */
  .sidenav button:hover,
  .sidenav button.active {
    background: #2f6b4f;                   /* 绿色高亮块 */
    color: #fff;                           /* 纯白字 */
  }

  .workspace {
    background: #f4f7f5;                   /* 浅灰绿工作区底色 */
    padding: 20px 24px;                    /* 内边距 */
    overflow: auto;                        /* 内容过多时工作区自己滚动，侧栏保持不动 */
  }
  .workspace h1 { margin: 0 0 6px; font-size: 20px; }                     /* 页面标题 */
  .workspace .sub { margin: 0 0 16px; font-size: 12px; color: #5c6b62; }  /* 标题下的小字说明 */

  /* 默认只显示当前面板 */
  .panel { display: none; }                /* 全部隐藏 */
  .panel.active { display: block; }        /* 只有带 active 的显示，实现单页多视图切换 */

  .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }   /* 指标卡片三等分 */
  .mini-card {
    padding: 16px;                         /* 内边距 */
    background: #fff;                      /* 白底 */
    border-radius: 10px;                   /* 圆角 */
    box-shadow: 0 1px 4px rgba(31,42,36,.06);   /* 极淡投影 */
  }
  .mini-card b { display: block; font-size: 22px; color: #2f6b4f; }   /* 大号数字，块级独占一行 */
  .mini-card span { font-size: 12px; color: #5c6b62; }                /* 数字下方的小字标签 */

  table {
    width: 100%;                           /* 铺满工作区 */
    border-collapse: collapse;             /* 合并相邻单元格边框，避免出现双线 */
    background: #fff;                      /* 白底 */
    border-radius: 10px;                   /* 圆角 */
    overflow: hidden;                      /* 配合圆角：裁掉方角的表头背景，圆角才可见 */
    box-shadow: 0 1px 4px rgba(31,42,36,.06);   /* 极淡投影 */
  }
  th, td {
    padding: 10px 12px;                    /* 单元格内边距 */
    text-align: left;                      /* 左对齐 */
    border-bottom: 1px solid #e8eee9;      /* 行分隔线 */
    font-size: 13px;                       /* 表格字号略小 */
  }
  th { background: #eef6f1; font-weight: 650; }   /* 表头浅绿底；650 是介于 600 与 700 之间的字重 */
  .tag {
    display: inline-block;                 /* 行内块，才能设内边距和圆角 */
    padding: 2px 8px;                      /* 内边距 */
    border-radius: 999px;                  /* 超大圆角 → 胶囊形状态标签 */
    font-size: 11px;                       /* 最小字号 */
    background: #e3f0e9;                   /* 默认（正常状态）浅绿底 */
    color: #1f5c40;                        /* 深绿字 */
  }
  /* 下面两条是「状态变体」：在 .tag 基础上再加一个类，只覆盖颜色，其余样式复用 */
  .tag.warn { background: #fff3cd; color: #92400e; }   /* 警告态：浅黄底棕字 */
  .tag.bad { background: #fde8e8; color: #c53030; }    /* 异常态：浅红底红字 */

  .toolbar {
    display: flex;                         /* 工具条横向排列 */
    gap: 8px;                              /* 控件间距 8px */
    margin-bottom: 12px;                   /* 与下方表格拉开 */
  }
  /* 逗号选择器把工具条和表单卡片里的输入控件合并设置，避免重复写 */
  .toolbar input, .form-card input, .form-card select {
    font: inherit;                         /* 表单控件不会自动继承字体，必须显式 inherit */
    padding: 7px 10px;                     /* 内边距 */
    border: 1px solid #c5d2ca;             /* 浅灰绿边框 */
    border-radius: 8px;                    /* 圆角 */
  }
  /* 同理，把三类按钮的公共外观合并声明 */
  .toolbar button, .form-card button, .btn {
    font: inherit;                         /* 继承字体 */
    padding: 7px 12px;                     /* 内边距 */
    border: 0;                             /* 去掉默认边框 */
    border-radius: 8px;                    /* 圆角 */
    background: #2f6b4f;                   /* 主题绿（主按钮外观） */
    color: #fff;                           /* 白字 */
    cursor: pointer;                       /* 小手光标 */
  }
  /* .btn.ghost：幽灵按钮变体，用于次要操作 */
  .btn.ghost {
    background: #fff;                      /* 改成白底 */
    color: #3d4a43;                        /* 深灰字 */
    border: 1px solid #c5d2ca;             /* 补一条描边（上面被 border:0 去掉了） */
  }

  .form-card {
    max-width: 420px;                      /* 表单最大宽度，输入框不会拉得过长 */
    padding: 16px;                         /* 内边距 */
    background: #fff;                      /* 白底 */
    border-radius: 10px;                   /* 圆角 */
    box-shadow: 0 1px 4px rgba(31,42,36,.06);   /* 极淡投影 */
  }
  .form-card label {
    display: block;                        /* label 独占一行，输入框排在它下方 */
    margin: 10px 0 4px;                    /* 三值 = 上 10px / 左右 0 / 下 4px */
    font-size: 12px;                       /* 小字号 */
    font-weight: 650;                      /* 略粗 */
    color: #5c6b62;                        /* 灰绿字 */
  }
  .form-card input, .form-card select { width: 100%; box-sizing: border-box; }
  /* 撑满表单卡片宽度；再次声明 border-box 确保内边距算在 100% 之内、不溢出 */
  .form-actions { margin-top: 16px; display: flex; gap: 8px; }   /* 底部按钮组：横向、间距 8px */
</style>

<!-- 最外层两列网格容器 -->
<div class="admin">
  <!-- 侧栏：用 data-panel 标记要打开哪一页，不要写 href="#" -->
  <!-- data-panel 是自定义数据属性（data- 前缀的属性名可自己起），
       JS 用 btn.dataset.panel 读取它的值，再拼成 panel-值 去找目标面板。 -->
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
      <!-- 工具条：搜索框 + 两个按钮 -->
      <div class="toolbar">
        <!-- type="search" 是搜索用输入框；placeholder 是未输入时的灰色提示文字；
             行内 style="flex:1" 让它吃掉工具条里的剩余宽度 -->
        <input type="search" placeholder="搜索用户名 / 邮箱" style="flex:1" />
        <button type="button">搜索</button>
        <!-- class="btn ghost" = 基础按钮 + 幽灵变体（白底描边），表示次要操作 -->
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
            <!-- <br> 是换行标签（自闭合，没有结束标签）；下面一行用 span + 行内样式做小字副信息 -->
            <td>张三<br><span style="color:#7a8a80;font-size:12px">zhang@demo.com</span></td>
            <td>管理员</td>
            <!-- .tag 不加变体类 = 默认绿色「正常」状态 -->
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
      <!-- 工具条：下拉筛选 + 搜索 + 按钮 -->
      <div class="toolbar">
        <!-- <select> 下拉框，内部每个 <option> 是一个选项 -->
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
      <!-- id="settings-form" 供 JS 绑定 submit 事件 -->
      <form class="form-card" id="settings-form">
        <!-- label 的 for 必须等于对应控件的 id：点击文字也能聚焦该输入框，对无障碍也很重要。
             input 的 name 是提交时的字段名，下面 JS 用 FormData 就是靠 name 取值的。 -->
        <label for="site-name">站点名称</label>
        <input id="site-name" name="siteName" value="知趣集 Admin" />

        <label for="site-lang">默认语言</label>
        <select id="site-lang" name="lang">
          <!-- option 的 value 是真正提交的值，标签之间的文字只是给人看的 -->
          <option value="zh-CN">简体中文</option>
          <option value="en">English</option>
        </select>

        <label for="site-notify">
          <!-- type="checkbox" 复选框；checked 表示默认勾选（布尔属性，写上即为真）。
               行内 style 的 width:auto 覆盖掉上面「输入框宽度 100%」的规则，
               否则复选框会被拉成一整条。 -->
          <input id="site-notify" name="notify" type="checkbox" checked style="width:auto;margin-right:6px" />
          开启邮件通知
        </label>

        <div class="form-actions">
          <!-- type="submit" 触发表单提交（被下面 JS 拦截）；
               type="reset" 是浏览器内置行为：把所有控件还原成初始值，无需写 JS。 -->
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
  // querySelectorAll 用 CSS 选择器一次取回所有匹配元素
  const navItems = document.querySelectorAll('.nav-item')  // 4 个侧栏按钮
  const panels = document.querySelectorAll('.panel')       // 4 个内容面板

  navItems.forEach((btn) => {
    // 给每个按钮注册点击监听
    btn.addEventListener('click', () => {
      const id = btn.dataset.panel // dashboard | users | orders | settings

      // 侧栏高亮
      navItems.forEach((b) => b.classList.remove('active'))  // 先把所有按钮的高亮清掉
      btn.classList.add('active')                            // 再只给当前按钮加上

      // 只显示对应面板
      panels.forEach((p) => p.classList.remove('active'))    // 先全部隐藏
      const target = document.getElementById('panel-' + id)  // 拼出目标 id，如 panel-users
      if (target) target.classList.add('active')             // 判断存在再操作，避免 null 报错
    })
  })

  // 设置页：阻止真正提交，演示一下取值
  document.getElementById('settings-form').addEventListener('submit', (e) => {
    // 表单默认提交会刷新/跳转页面，preventDefault 把这个默认行为拦掉
    e.preventDefault()
    // FormData 按控件的 name 属性收集当前所有值；e.target 就是这个 <form> 元素
    const fd = new FormData(e.target)
    // fd.get('字段名') 取值；复选框未勾选时不会出现在 FormData 里，取到的是 null
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 0;                             /* 三栏要贴满，清掉默认外边距 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
    color: #1f2a24;                        /* 全局文字色 */
  }

  .three-col {
    display: grid;                         /* 网格容器 */
    grid-template-columns: 180px 1fr 240px; /* 左固定 | 中自适应 | 右固定 */
    /* 这是文档站最常见的骨架：两侧固定像素、中间用 1fr 弹性伸缩。
       窗口变宽时只有正文变宽，两侧栏宽度始终稳定。 */
    min-height: 320px;                     /* 最小高度，保证三栏底色都能看到 */
  }
  .left {
    padding: 16px;                         /* 内边距 */
    background: #eef6f1;                   /* 浅绿底 */
    border-right: 1px solid #d9e0d8;       /* 右边框，与正文分隔 */
  }
  .left strong { display: block; margin-bottom: 8px; color: #2f6b4f; }   /* 「目录」小标题，改块级独占一行 */
  /* 左侧目录：button + data-panel，不用 href="#" */
  .left button {
    display: block;                        /* 每项独占一行 */
    width: 100%;                           /* 撑满侧栏，整行可点 */
    padding: 6px 0;                        /* 上下 6px 内边距 */
    border: 0;                             /* 去掉边框 */
    background: transparent;               /* 透明背景，看起来像链接 */
    color: #2f6b4f;                        /* 主题绿 */
    font: inherit;                         /* 继承页面字体 */
    font-size: 13px;                       /* 再单独把字号调小（必须写在 font 简写之后） */
    text-align: left;                      /* 左对齐 */
    cursor: pointer;                       /* 小手光标 */
  }
  /* .active 由 JS 点击时添加，标记「当前正在看的章节」 */
  .left button.active { font-weight: 700; text-decoration: underline; }   /* 加粗 + 下划线 */

  .center { padding: 20px; background: #fff; }   /* 中间正文区 */
  .panel { display: none; }                /* 章节面板默认隐藏 */
  .panel.active { display: block; }        /* 只显示带 active 的那一章 */
  .panel h2 { margin: 0 0 12px; font-size: 18px; }   /* 章节标题 */
  .article { line-height: 1.7; color: #3d4a42; font-size: 14px; margin: 0 0 10px; }
  /* 正文段落：行高放宽到 1.7 更适合长文阅读；margin 三值 = 上 0 / 左右 0 / 下 10px */

  .right {
    padding: 16px;                         /* 内边距 */
    background: #f7faf8;                   /* 极浅底 */
    border-left: 1px solid #d9e0d8;        /* 左边框，与正文分隔 */
  }
  .widget {
    padding: 12px;                         /* 内边距 */
    background: #fff;                      /* 白底小卡片 */
    border: 1px solid #d9e0d8;             /* 边框 */
    border-radius: 8px;                    /* 圆角 */
    margin-bottom: 12px;                   /* 卡片之间间隔 */
    font-size: 13px;                       /* 小字号 */
  }
  .widget h4 { margin: 0 0 8px; font-size: 13px; color: #2f6b4f; }   /* 小卡片标题 */
  .widget p { margin: 0; color: #5c6b62; line-height: 1.5; }         /* 小卡片正文 */
</style>

<!-- 三栏网格容器 -->
<div class="three-col">
  <!-- 左栏：文档目录，点击切换中间正文 -->
  <!-- data-panel 存章节标识，JS 拼成 panel-intro / panel-install 等去找对应面板 -->
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
  <!-- 这里的 id 是给 JS 用的锚点：JS 直接改这两个 <p> 的文字内容，
       不必整块重新渲染 HTML。 -->
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
  const navItems = document.querySelectorAll('.nav-item')       // 4 个目录按钮
  const panels = document.querySelectorAll('.panel')            // 4 个章节面板
  const tocText = document.getElementById('toc-text')           // 右栏「本页目录」的文字节点
  const linksText = document.getElementById('links-text')       // 右栏「相关链接」的文字节点

  // 各章对应的右侧栏文案
  // 这是一个普通对象，充当「查表用的数据字典」：
  // 键是章节标识（和 data-panel 的值一致），值是该章要显示的两段文案。
  // 把数据和逻辑分开，以后加章节只需在这里加一行。
  const sidebarMeta = {
    intro:      { toc: '概述 · 适用场景 · 下一步', links: 'GitHub · 示例仓库' },
    install:    { toc: 'npm 安装 · CDN · 环境要求', links: 'Node 版本说明 · 故障排查' },
    quickstart: { toc: '启动 dev · 写第一篇 · 部署', links: '部署到 Vercel · 主题定制' },
    api:        { toc: 'createSite · renderPage · 插件', links: 'TypeScript 类型 · 更新日志' },
  }

  navItems.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.panel                              // 读出章节标识，如 'install'

      navItems.forEach((b) => b.classList.remove('active'))     // 清掉所有目录项高亮
      btn.classList.add('active')                               // 高亮当前项

      panels.forEach((p) => p.classList.remove('active'))       // 隐藏所有章节
      document.getElementById('panel-' + id)?.classList.add('active')   // 显示目标章节（?. 防止找不到时报错）

      // 第 3 步：同步更新右栏文案
      const meta = sidebarMeta[id]                              // 用中括号按变量取对象属性
      if (meta) {
        // textContent 只改纯文字，比 innerHTML 更安全（不会把内容当 HTML 解析）
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 0 auto;                        /* 上下 0、左右 auto → 配合下面的 max-width 让整个「手机屏」水平居中 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
    color: #1f2a24;                        /* 全局文字色 */
    max-width: 390px;                      /* 390px 约等于常见手机的逻辑宽度，模拟手机屏 */
    background: #f4f7f5;                   /* 浅灰绿底，白色卡片才浮得出来 */
    min-height: 420px;                     /* 最小高度，撑出一个屏幕的感觉 */
  }
  .screen { padding: 16px 16px 72px; min-height: 360px; }
  /* padding 三值 = 上 16px / 左右 16px / 下 72px。
     底部这 72px 是给固定 Tab 栏预留的空间，否则最后一条内容会被挡住。 */
  .screen h2 { margin: 0 0 12px; font-size: 18px; }   /* 每页标题 */
  .panel { display: none; }                /* 5 个页面默认全部隐藏 */
  .panel.active { display: block; }        /* 只显示带 active 的那一页 */
  /* 逗号选择器：两种不同名字的列表项共用同一套卡片外观 */
  .feed-item, .cell {
    padding: 14px; margin-bottom: 10px; background: #fff;      /* 内边距 / 间隔 / 白底 */
    border-radius: 10px; box-shadow: 0 1px 4px rgba(31,42,36,.05);   /* 圆角 + 极淡投影 */
  }
  .tabbar {
    position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
    /* fixed 参照浏览器视口，所以 Tab 栏永远贴在屏幕底部、不随内容滚动。
       但注意：fixed 元素的 left 是相对视口而不是相对 body 的，
       所以这里用「left: 50% 把左边缘移到视口中线」
       + 「translateX(-50%) 再往左挪自身一半宽」的组合来居中，
       否则在宽屏下 Tab 栏会偏到右边，对不上上面 390px 宽的手机屏。 */
    width: 100%; max-width: 390px; display: flex; background: #fff;   /* 与手机屏同宽；Flex 让 5 个 tab 横向排列；白色不透明底 */
    border-top: 1px solid #d9e0d8;         /* 顶部细线 */
    padding-bottom: env(safe-area-inset-bottom, 0);
    /* env() 读取设备的环境变量，safe-area-inset-bottom 是 iPhone 底部「小黑条」的高度。
       在这类机型上自动垫高，避免按钮被手势条压住；第二个参数 0 是取不到时的默认值。 */
  }
  .tab {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    /* flex: 1 让 5 个 tab 平分宽度；
       自己再变成纵向 Flex 容器（column），于是「图标在上、文字在下」并水平居中。 */
    padding: 8px 0 6px; border: 0; background: transparent;   /* 内边距；去掉按钮默认边框和底色 */
    font-size: 10px; color: #5c6b62; cursor: pointer;         /* 极小字号；未选中灰绿色；小手光标 */
  }
  .tab .icon { font-size: 20px; margin-bottom: 2px; }   /* 用大字号把 emoji 当图标；与文字留 2px */
  .tab.active { color: #2f6b4f; font-weight: 600; }     /* 选中态：变绿 + 半粗体（由 JS 切换 active 类） */
</style>

<!-- 内容区：5 个 section 就是 5 个「页面」，同一时刻只有一个带 active -->
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
      <!-- <textarea> 是多行文本框；rows="4" 指定初始显示 4 行高。
           注意它没有 value 属性，默认内容要写在开闭标签之间（这里留空）。 -->
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

<!-- 底部 Tab 栏：固定在屏幕底部。
     每个 tab 用 data-panel 指明要显示哪一页，避免使用会跳转的 <a href="#">。 -->
<nav class="tabbar">
  <button type="button" class="tab active" data-panel="home"><span class="icon">🏠</span>首页</button>
  <button type="button" class="tab" data-panel="discover"><span class="icon">🔍</span>发现</button>
  <button type="button" class="tab" data-panel="publish"><span class="icon">➕</span>发布</button>
  <button type="button" class="tab" data-panel="msg"><span class="icon">💬</span>消息</button>
  <button type="button" class="tab" data-panel="me"><span class="icon">👤</span>我的</button>
</nav>

<script>
  const tabs = document.querySelectorAll('.tab')       // 5 个底部 tab 按钮
  const panels = document.querySelectorAll('.panel')   // 5 个页面
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.panel                             // 读出这个 tab 对应的页面标识
      tabs.forEach((t) => t.classList.remove('active'))        // 清掉所有 tab 的选中态
      tab.classList.add('active')                              // 点亮当前 tab
      panels.forEach((p) => p.classList.remove('active'))      // 隐藏所有页面
      document.getElementById('panel-' + id)?.classList.add('active')   // 显示目标页面
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 0;                             /* 清掉默认外边距 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
    color: #1f2a24;                        /* 全局文字色 */
  }

  .master-detail {
    display: grid;                         /* 网格容器 */
    grid-template-columns: 260px 1fr;      /* 左列表固定 260px，右详情 1fr 自适应 */
    height: 300px;                         /* 固定总高度：这样两栏才能各自独立滚动 */
    border: 1px solid #d9e0d8;             /* 外框 */
    border-radius: 12px;                   /* 圆角 */
    overflow: hidden;                      /* 裁掉超出圆角的子元素背景 */
  }
  .master {
    border-right: 1px solid #d9e0d8;       /* 右边框，分隔列表与详情 */
    overflow-y: auto;                      /* 只在纵向溢出时出现滚动条，列表长了自己滚 */
    background: #f7faf8;                   /* 极浅底色 */
  }
  .master-item {
    padding: 12px 16px;                    /* 内边距 */
    border-bottom: 1px solid #eef6f1;      /* 条目之间的分隔线 */
    cursor: pointer;                       /* 小手光标，暗示可点击（本 Demo 只展示样式，未绑事件） */
    font-size: 13px;                       /* 字号 */
  }
  /* :hover 伪类：鼠标悬停在某个条目上时才生效 */
  .master-item:hover { background: #eef6f1; }   /* 悬停时加浅底，给出即时反馈 */
  /* .active 表示当前选中的条目 */
  .master-item.active {
    background: #fff;                      /* 选中项用白底，与未选中的浅灰底区分 */
    border-left: 3px solid #2f6b4f;        /* 左侧 3px 绿色指示条，是列表选中态的常见做法 */
    font-weight: 600;                      /* 半粗体 */
  }
  .master-item .sub { font-size: 11px; color: #5c6b62; font-weight: 400; margin-top: 2px; }
  /* 条目里的第二行小字；font-weight: 400 把父级选中态的加粗重置回常规粗细 */
  .detail {
    padding: 20px 24px;                    /* 内边距 */
    background: #fff;                      /* 白底 */
    overflow-y: auto;                      /* 详情过长时自己滚动，不影响左侧列表 */
  }
  .detail h2 { margin: 0 0 8px; font-size: 18px; }                        /* 详情标题 */
  .detail .meta { font-size: 12px; color: #5c6b62; margin-bottom: 16px; } /* 元信息行（负责人、状态） */
  .detail p { line-height: 1.7; color: #3d4a42; }                         /* 正文，行高放宽便于阅读 */
</style>

<!-- 两列网格：左列表 + 右详情 -->
<div class="master-detail">
  <!-- 左侧列表（master）：可独立滚动 -->
  <div class="master">
    <!-- 第一项带 active，表示它是当前选中项（静态演示，未接 JS） -->
    <div class="master-item active">项目 Alpha<div class="sub">更新于 2 小时前</div></div>
    <div class="master-item">项目 Beta<div class="sub">更新于 昨天</div></div>
    <div class="master-item">项目 Gamma<div class="sub">更新于 3 天前</div></div>
    <div class="master-item">项目 Delta<div class="sub">更新于 1 周前</div></div>
  </div>
  <!-- 右侧详情（detail）：展示左侧选中项的完整内容 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 0;                             /* 清掉默认外边距 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
    color: #1f2a24;                        /* 全局文字色 */
  }

  .app {
    display: flex;                         /* Flex 容器 */
    flex-direction: column;                /* 纵向排列：顶栏在上、主区在下 */
    height: 320px;            /* 模拟视口高度 */
    /* App Shell 的关键：外壳必须有确定高度，
       里面的主区域才知道「剩余空间」是多少，从而只让它自己滚动。 */
    border: 1px solid #d9e0d8;             /* 外框 */
    border-radius: 12px;                   /* 圆角 */
    overflow: hidden;                      /* 裁掉超出圆角的内容 */
  }
  .app-header {
    flex-shrink: 0;                        /* 禁止被压缩：空间不足时优先压主区，顶栏高度恒定 */
    display: flex;                         /* 内部横向排列 */
    align-items: center;                   /* 纵向居中 */
    justify-content: space-between;        /* 两端对齐：标题靠左、按钮靠右 */
    padding: 0 16px;                       /* 上下 0、左右 16px（高度由下面的 height 决定） */
    height: 48px;                          /* 固定顶栏高度 */
    background: #2f6b4f;                   /* 主题绿底 */
    color: #fff;                           /* 白字 */
  }
  .app-header .title { font-weight: 600; }   /* 标题半粗体 */
  .app-header button {
    background: rgba(255,255,255,.15);     /* 15% 白色半透明底，在绿色顶栏上做出「轻按钮」质感 */
    border: none;                          /* 去掉边框 */
    color: #fff;                           /* 白字 */
    padding: 4px 10px;                     /* 内边距 */
    border-radius: 6px;                    /* 圆角 */
    font-size: 12px;                       /* 小字号 */
    cursor: pointer;                       /* 小手光标 */
  }
  .app-main {
    flex: 1;                /* 占据剩余高度 */
    /* 顶栏是固定 48px 且不许收缩，所以 flex:1 让主区吃掉 320 - 48 = 272px */
    overflow-y: auto;         /* 仅主区域滚动，壳层不动 */
    /* 这就是 App Shell（应用外壳）的核心体验：
       顶栏/底栏这些「壳」始终静止，只有内容区滚动，接近原生 App 的感觉。 */
    padding: 16px;                         /* 内边距 */
    background: #f7faf8;                   /* 极浅底色 */
  }
  .card {
    padding: 14px;                         /* 内边距 */
    margin-bottom: 10px;                   /* 卡片间隔 */
    background: #fff;                      /* 白底 */
    border-radius: 8px;                    /* 圆角 */
    border: 1px solid #eef6f1;             /* 极浅边框 */
  }
</style>

<!-- 外壳容器：固定高度 + 纵向 Flex -->
<div class="app">
  <!-- 壳层顶栏：flex-shrink:0 保证它永远 48px 高、不参与滚动 -->
  <header class="app-header">
    <span class="title">📚 学习 App</span>
    <button>设置</button>
  </header>
  <!-- 内容区：flex:1 吃掉剩余高度，超出时只有它自己滚动 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 0;                             /* 清掉默认外边距 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
    color: #1f2a24;                        /* 全局文字色 */
    background: #f4f7f5;                   /* 浅灰绿底，白色分组卡片才浮得出来 */
  }

  .settings { max-width: 480px; margin: 16px auto; }
  /* 限制内容宽度；margin 两值 = 上下 16px、左右 auto（左右 auto 实现水平居中） */
  .settings h1 { margin: 0 0 20px; font-size: 22px; padding: 0 4px; }   /* 页面大标题；左右 4px 内边距与卡片对齐 */
  .group { margin-bottom: 24px; }          /* 分组之间的间隔 */
  .group-label {
    padding: 0 4px 8px;                    /* 三值 = 上 0 / 左右 4px / 下 8px */
    font-size: 12px;                       /* 小字号 */
    font-weight: 700;                      /* 加粗 */
    color: #5c6b62;                        /* 灰绿字 */
    text-transform: uppercase;             /* 强制转成大写（只影响英文字母的显示，不改变实际文字内容） */
    letter-spacing: 0.04em;                /* 字距略微放宽；em 相对当前字号，全大写时这样更易读 */
  }
  .group-body {
    background: #fff;                      /* 白色分组卡片 */
    border-radius: 12px;                   /* 圆角 */
    overflow: hidden;                      /* 裁掉溢出内容，使第一/最后一行的底色也遵守圆角 */
    border: 1px solid #d9e0d8;             /* 边框 */
  }
  .row {
    display: flex;                         /* 每行横向排列 */
    align-items: center;                   /* 纵向居中 */
    justify-content: space-between;        /* 两端对齐：文字靠左、开关/箭头靠右 */
    padding: 14px 16px;                    /* 内边距 */
    border-bottom: 1px solid #eef6f1;      /* 行分隔线 */
    font-size: 14px;                       /* 字号 */
  }
  /* :last-child 是伪类，表示「在父元素中排最后一个的子元素」。
     这里用来去掉最后一行多余的底边线，否则会和卡片边框叠成双线。 */
  .row:last-child { border-bottom: none; }
  .row .desc { display: block; font-size: 12px; color: #5c6b62; margin-top: 2px; }
  /* 行内的补充说明；span 默认是行内元素，改块级后会换到下一行 */
  /* 可点击 toggle：用 button，on/off 靠 aria-checked */
  .toggle {
    width: 44px; height: 26px;             /* 开关轨道尺寸 */
    padding: 0;                            /* 清掉按钮默认内边距 */
    border: 0;                             /* 去掉边框 */
    background: #2f6b4f;                   /* 默认（开启态）绿色轨道 */
    border-radius: 999px;                  /* 远大于高度的圆角 → 胶囊形轨道 */
    position: relative;                    /* 给里面 absolute 的圆点当定位参照 */
    cursor: pointer;                       /* 小手光标 */
    flex-shrink: 0;                        /* 禁止被压缩，保证开关尺寸不变形 */
    transition: background 0.15s;          /* 背景色切换时平滑过渡 0.15 秒 */
  }
  /* ::after 伪元素：在按钮内部生成一个虚拟节点，用来当开关上的白色圆点。
     好处是不用额外写 HTML 标签。 */
  .toggle::after {
    content: '';                           /* 伪元素必须写 content，否则不会渲染（空字符串即可） */
    position: absolute;                    /* 相对 .toggle 定位 */
    top: 3px; right: 3px;                  /* 默认贴在轨道右侧，即「开」的位置 */
    width: 20px; height: 20px;             /* 圆点尺寸（26 - 3 - 3 = 20，正好嵌在轨道里） */
    background: #fff;                      /* 白色圆点 */
    border-radius: 50%;                    /* 正圆 */
    transition: left 0.15s, right 0.15s;   /* left 和 right 变化都加过渡，圆点滑动而非跳变 */
  }
  /* [aria-checked="false"] 是属性选择器：只命中该属性值等于 false 的元素。
     这里巧妙地把「无障碍状态」直接当成样式开关用，不必再额外维护一个 class。 */
  .toggle[aria-checked="false"] { background: #cbd5ce; }   /* 关闭态：轨道变灰 */
  .toggle[aria-checked="false"]::after { right: auto; left: 3px; }
  /* 关闭态的圆点：先把 right 还原成 auto（取消右侧约束），再用 left: 3px 贴到左边 → 圆点滑向左侧 */
  .chevron { color: #9bb5a6; }             /* 右侧「›」箭头的颜色 */
  .hint { margin: 0 4px; font-size: 12px; color: #5c6b62; }   /* 顶部操作提示文字 */
</style>

<div class="settings">
  <h1>设置</h1>
  <p class="hint">点右侧开关可切换开 / 关</p>
  <!-- 第一组：账户。只有箭头，没有交互 -->
  <div class="group">
    <div class="group-label">账户</div>
    <div class="group-body">
      <div class="row"><div>个人资料<span class="desc">头像、昵称</span></div><span class="chevron">›</span></div>
      <div class="row"><div>修改密码</div><span class="chevron">›</span></div>
    </div>
  </div>
  <!-- 第二组：偏好。前两行是可点击的开关 -->
  <div class="group">
    <div class="group-label">偏好</div>
    <div class="group-body">
      <div class="row">
        <div>深色模式</div>
        <!-- role="switch" 告诉辅助技术「这是一个开关控件」而不是普通按钮；
             aria-checked 表示当前开/关状态，既被读屏软件使用，也被上面的属性选择器用来控制样式；
             aria-label 提供无障碍名称，因为按钮内部没有任何可读文字。 -->
        <button type="button" class="toggle" role="switch" aria-checked="false" aria-label="深色模式"></button>
      </div>
      <div class="row">
        <div>消息通知</div>
        <!-- 这个初始是 true，所以进来就是绿色、圆点在右 -->
        <button type="button" class="toggle" role="switch" aria-checked="true" aria-label="消息通知"></button>
      </div>
      <div class="row"><div>语言</div><span style="color:#5c6b62;font-size:13px;">简体中文 ›</span></div>
    </div>
  </div>
</div>

<script>
  // 取到页面上所有开关，逐个绑定点击事件
  document.querySelectorAll('.toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      // getAttribute 读回来的永远是字符串，所以要和 'true' 这个字符串比较，得到布尔值
      const on = btn.getAttribute('aria-checked') === 'true'
      // 三元运算符：当前是开就写 'false'，当前是关就写 'true'，即取反
      // 只改这一个属性，CSS 的属性选择器会自动把轨道颜色和圆点位置切换过去 ——
      // 状态存在 DOM 属性上，样式由 CSS 派生，逻辑因此非常简洁
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 0;                             /* 清掉默认外边距，空状态区才能铺满 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
  }

  .page {
    min-height: 280px;                     /* 给一个最小高度，纵向居中才有意义 */
    display: flex;                         /* Flex 容器 */
    flex-direction: column;                /* 纵向排列：图标 → 标题 → 说明 → 按钮 */
    align-items: center;                   /* 交叉轴（此时是横向）居中 → 各元素水平居中 */
    justify-content: center;               /* 主轴（此时是纵向）居中 → 整组内容垂直居中 */
    /* 记住：flex-direction 改成 column 后，
       align-items 和 justify-content 管的方向就互换了，这是最容易搞混的一点。 */
    padding: 32px;                         /* 内边距 */
    background: #f7faf8;                   /* 极浅底色 */
    text-align: center;                    /* 文字居中（Flex 只对齐盒子，文字对齐还得靠这条） */
  }
  .icon {
    width: 80px;                           /* 宽 */
    height: 80px;                          /* 高（与宽相等才能是正圆） */
    margin-bottom: 16px;                   /* 与下方标题拉开 */
    background: #eef6f1;                   /* 浅绿圆底 */
    border-radius: 50%;                    /* 正圆 */
    display: flex;                         /* 内部再用 Flex 把 emoji 居中 */
    align-items: center;                   /* 纵向居中 */
    justify-content: center;               /* 横向居中 */
    font-size: 36px;                       /* 放大 emoji 当插图用 */
  }
  .page h2 { margin: 0 0 8px; font-size: 18px; color: #1f2a24; }                     /* 主标题 */
  .page p { margin: 0 0 20px; color: #5c6b62; font-size: 14px; max-width: 280px; }   /* 说明文字；限宽 280px 避免一行太长 */
  .btn {
    padding: 10px 20px;                    /* 内边距 */
    background: #2f6b4f;                   /* 主题绿 */
    color: #fff;                           /* 白字 */
    border: none;                          /* 去掉默认边框 */
    border-radius: 8px;                    /* 圆角 */
    font: inherit;                         /* 继承页面字体 */
    font-weight: 600;                      /* 半粗体 */
    cursor: pointer;                       /* 小手光标 */
  }
</style>

<!-- 空状态的标准四件套：图标 + 标题 + 一句解释 + 一个引导操作 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 16px;                          /* 页面四周留白 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
    color: #1f2a24;                        /* 全局文字色 */
  }

  .toolbar {
    display: flex;                         /* 横向排列 */
    align-items: center;                   /* 纵向居中 */
    justify-content: space-between;        /* 两端对齐：标题靠左、按钮靠右 */
    gap: 12px;                             /* 最小间距 12px */
    margin-bottom: 12px;                   /* 与下方状态行拉开 */
  }
  .toolbar h2 { margin: 0; font-size: 16px; }   /* 清掉默认外边距，避免 Flex 行被撑高 */
  .refresh {
    padding: 6px 12px;                     /* 内边距 */
    border: 1px solid #9bb5a6;             /* 描边按钮 */
    border-radius: 8px;                    /* 圆角 */
    background: #fff;                      /* 白底 */
    font: inherit;                         /* 继承页面字体 */
    font-size: 13px;                       /* 再单独调小字号 */
    cursor: pointer;                       /* 小手光标 */
  }
  .status { font-size: 12px; color: #5c6b62; margin: 0 0 12px; }   /* 状态提示行 */

  /* @keyframes 定义一段可复用的动画，pulse 是自己起的名字，
     下面用 animation 引用它。百分比表示动画进行到的时间点。 */
  @keyframes pulse {
    0%, 100% { opacity: 1; }               /* 开头和结尾都完全不透明 */
    50%       { opacity: 0.45; }            /* 中间点淡到 45% → 来回呼吸的效果 */
  }
  .grid {
    display: grid;                         /* 网格容器 */
    grid-template-columns: repeat(2, 1fr); /* 两列等宽 */
    gap: 12px;                             /* 间距 12px */
  }
  /* 骨架卡片和真实卡片共用同一套外框尺寸，切换时布局不会跳动 */
  .sk-card, .real-card {
    padding: 16px;                         /* 内边距 */
    background: #fff;                      /* 白底 */
    border: 1px solid #eef6f1;             /* 极浅边框 */
    border-radius: 10px;                   /* 圆角 */
  }
  .sk-line {
    height: 12px;                          /* 灰条高度，模拟一行文字 */
    background: #d9ebe1;                   /* 浅绿占位色 */
    border-radius: 4px;                    /* 小圆角 */
    margin-bottom: 10px;                   /* 行间距 */
    animation: pulse 1.5s ease-in-out infinite;
    /* animation 四个值依次是：动画名、单次时长 1.5 秒、
       缓动曲线 ease-in-out（两头慢中间快，呼吸感更自然）、infinite 无限循环。 */
  }
  /* 三种宽度变体，让骨架的线条长短不一，更像真实文本段落 */
  .sk-line.w80 { width: 80%; }
  .sk-line.w60 { width: 60%; }
  .sk-line.w40 { width: 40%; }
  /* 骨架头像和真实头像共用尺寸，保证两种状态占位一致 */
  .sk-avatar, .avatar {
    width: 40px;                           /* 宽 */
    height: 40px;                          /* 高（与宽相等 → 正圆） */
    border-radius: 50%;                    /* 正圆 */
    margin-bottom: 12px;                   /* 与下方内容拉开 */
  }
  .sk-avatar {
    background: #d9ebe1;                   /* 骨架态：浅绿色块 */
    animation: pulse 1.5s ease-in-out infinite;   /* 同样加呼吸动画 */
  }
  .avatar {
    display: flex;                         /* 真实头像：Flex 居中里面的文字 */
    align-items: center;                   /* 纵向居中 */
    justify-content: center;               /* 横向居中 */
    background: #2f6b4f;                   /* 主题绿底 */
    color: #fff;                           /* 白字 */
    font-weight: 700;                      /* 加粗 */
    font-size: 14px;                       /* 字号 */
  }
  .real-card h3 { margin: 0 0 6px; font-size: 14px; }                        /* 真实卡片标题 */
  .real-card p { margin: 0; font-size: 12px; color: #5c6b62; line-height: 1.5; }   /* 真实卡片描述 */
  .hidden { display: none !important; }
  /* 工具类：JS 通过加/删这个 class 来切换显示。
     !important 提升优先级，确保能盖住 .grid 的 display: grid，
     否则两条规则都作用于同一元素时不一定生效。 */
</style>

<!-- 顶部工具条：标题 + 重新演示按钮 -->
<div class="toolbar">
  <h2>学员列表</h2>
  <button type="button" class="refresh" id="refresh">刷新重演</button>
</div>
<!-- 状态提示：文字由 JS 动态改写 -->
<p class="status" id="status">加载中…（约 2 秒后显示真实数据）</p>

<!-- 骨架屏：加载中显示。用灰块模拟即将出现的内容轮廓，
     比转圈 loading 更能减少「页面在跳」的感觉。 -->
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

<!-- 真实数据区：初始带 hidden 所以看不见，2 秒后由 JS 去掉 hidden 显示出来 -->
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
  // 先把三个会反复操作的元素存进变量
  const skeleton = document.getElementById('skeleton')   // 骨架屏容器
  const real = document.getElementById('real')           // 真实数据容器
  const status = document.getElementById('status')       // 状态提示文字
  // 保存定时器的编号，供下次重演时取消上一次尚未触发的定时器
  let timer = null

  // 把「进入加载态 → 2 秒后出数据」这一整套流程封装成函数，方便复用
  function showSkeleton() {
    // 关键一步：若上一次的定时器还在等待中，先清掉。
    // 否则连续点几次刷新会堆叠多个定时器，导致画面乱闪。
    clearTimeout(timer)
    skeleton.classList.remove('hidden')   // 显示骨架
    real.classList.add('hidden')          // 隐藏真实数据
    status.textContent = '加载中…（约 2 秒后显示真实数据）'   // 更新提示文字

    // setTimeout 延迟执行：这里用它模拟一次约 2 秒的网络请求。
    // 返回值是定时器编号，存起来供上面的 clearTimeout 使用。
    timer = setTimeout(() => {
      skeleton.classList.add('hidden')      // 隐藏骨架
      real.classList.remove('hidden')       // 显示真实数据
      status.textContent = '加载完成 ✓  点「刷新重演」可再看一遍骨架 → 真数据'
    }, 2000)                                // 2000 毫秒 = 2 秒
  }

  // 点「刷新重演」再跑一遍流程
  document.getElementById('refresh').addEventListener('click', showSkeleton)
  // 页面加载后立刻调用一次，这样一进来就能看到骨架 → 真数据的完整过程
  showSkeleton()
</script>`,
  },
  {
    id: 'p2-skel-toolbar',
    title: '面包屑 + 标题 + 操作栏',
    group: '06-页面骨架',
    summary: '页面顶部工具条组合',
    code: `<style>
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 0;                             /* 清掉默认外边距 */
    font: 14px/1.5 system-ui, sans-serif;  /* 字号 / 行高 / 字体 */
    color: #1f2a24;                        /* 全局文字色 */
    background: #f4f7f5;                   /* 浅灰绿底，白色内容卡才浮得出来 */
  }

  .toolbar-page { padding: 20px 24px; }    /* 整页内边距 */
  .breadcrumb {
    display: flex;                         /* 面包屑各项横向排列 */
    align-items: center;                   /* 纵向居中，文字和斜杠对齐 */
    gap: 6px;                              /* 项与分隔符之间留 6px */
    font-size: 13px;                       /* 小字号 */
    color: #5c6b62;                        /* 灰绿字（当前页那一项的颜色） */
    margin-bottom: 12px;                   /* 与下方标题区拉开 */
  }
  /* .breadcrumb a：面包屑里的链接。
     text-decoration: none 去掉浏览器默认的下划线，让它看起来更清爽。
     本 Demo 实际用的是 button，这条规则是为改用真实 <a> 时准备的。 */
  .breadcrumb a { color: #2f6b4f; text-decoration: none; }
  /* .breadcrumb span：面包屑里的 <span>，这里专门装「/」分隔符 */
  .breadcrumb span { color: #9bb5a6; }     /* 分隔符用更浅的颜色，弱化存在感 */
  .page-header {
    display: flex;                         /* 标题区横向排列：左标题、右按钮 */
    align-items: flex-start;               /* 顶部对齐（不用 center，否则标题有两行时按钮会掉到中间） */
    justify-content: space-between;        /* 两端对齐 */
    gap: 16px;                             /* 中间至少留 16px */
    margin-bottom: 20px;                   /* 与下方内容卡拉开 */
  }
  .page-header h1 { margin: 0; font-size: 24px; }                          /* 主标题，清掉默认外边距 */
  .page-header .subtitle { margin: 4px 0 0; font-size: 13px; color: #5c6b62; }   /* 副标题；三值 = 上 4px / 左右 0 / 下 0 */
  .actions { display: flex; gap: 8px; flex-shrink: 0; }
  /* 按钮组横向排列；flex-shrink: 0 禁止被压缩，标题很长时按钮也不会被挤变形 */
  .btn {
    padding: 8px 14px;                     /* 内边距 */
    border-radius: 8px;                    /* 圆角 */
    border: 1px solid #9bb5a6;             /* 描边（次要按钮外观） */
    background: #fff;                      /* 白底 */
    font: inherit;                         /* 继承页面字体 */
    font-size: 13px;                       /* 单独调小字号 */
    cursor: pointer;                       /* 小手光标 */
  }
  /* .btn.primary：主按钮变体，只覆盖颜色，其它样式复用 .btn */
  .btn.primary { background: #2f6b4f; color: #fff; border-color: #2f6b4f; }
  .content-box {
    padding: 20px;                         /* 内边距 */
    background: #fff;                      /* 白底内容卡 */
    border-radius: 12px;                   /* 圆角 */
    border: 1px solid #d9e0d8;             /* 边框 */
  }
</style>

<div class="toolbar-page">
  <!-- 面包屑导航：<nav> 表明这是一组导航链接。
       这里用 button 而不是 <a href="#">，避免点击后跳转 hash 或页面滚到顶部；
       行内 style 把按钮的默认边框/背景/内边距清掉，让它看起来就是一段链接文字。 -->
  <nav class="breadcrumb">
    <button type="button" class="crumb-link" style="border:0;background:transparent;color:#2f6b4f;font:inherit;cursor:pointer;padding:0;">项目</button><span>/</span>
    <button type="button" class="crumb-link" style="border:0;background:transparent;color:#2f6b4f;font:inherit;cursor:pointer;padding:0;">Alpha</button><span>/</span>
    任务详情
  </nav>
  <!-- 标题区：左侧标题 + 副标题，右侧操作按钮 -->
  <div class="page-header">
    <!-- 这层 div 把标题和副标题打包成一个 Flex 项，好和右侧按钮组做两端对齐 -->
    <div>
      <h1>重构导航组件</h1>
      <p class="subtitle">#TASK-1284 · 分配给李四</p>
    </div>
    <div class="actions">
      <button class="btn">分享</button>
      <!-- 两个 class：btn 提供基础外观，primary 覆盖成主色调 -->
      <button class="btn primary">编辑</button>
    </div>
  </div>
  <!-- 正文内容卡 -->
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
  /* 所有元素统一 border-box 盒模型 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 16px;                          /* 页面四周留白 */
    font: 13px/1.5 'SF Mono', Consolas, monospace;
    /* 字体列表按顺序回退：先试 SF Mono，没有就用 Consolas，最后退到系统等宽字体。
       带空格的字体名必须加引号。monospace（等宽）适合展示代码。 */
    color: #1f2a24;                        /* 全局文字色 */
  }

  .hint { margin: 0 0 10px; font: 12px/1.5 system-ui, sans-serif; color: #5c6b62; }
  /* 操作提示：这里把字体改回普通无衬线体，不跟着页面用等宽字体 */
  .split {
    display: flex;                         /* 横向 Flex：左栏 + 分隔条 + 右栏 */
    height: 260px;                         /* 固定高度 */
    border: 1px solid #d9e0d8;             /* 外框 */
    border-radius: 10px;                   /* 圆角 */
    overflow: hidden;                      /* 裁掉超出圆角的子元素背景 */
    background: #fff;                      /* 白底 */
  }
  .pane {
    overflow: auto;                        /* 每栏内容过多时自己滚动 */
    padding: 12px;                         /* 内边距 */
    min-width: 80px;                       /* 最小宽度，防止拖拽时被压成 0 */
  }
  .pane-code {
    width: 50%;              /* 初始宽度；拖拽时由 JS 改写 */
    flex-shrink: 0;                        /* 禁止 Flex 自动压缩，宽度完全由 width 说话（否则 JS 设的值会被 Flex 覆盖） */
    background: #1a2420;                   /* 深色代码区背景 */
    color: #a8d4b8;                        /* 浅绿代码文字 */
  }
  .pane-preview {
    flex: 1;                 /* 右侧吃掉剩余宽度 */
    /* 因此只需要用 JS 改左栏宽度，右栏会自动补足 —— 不用同时计算两边 */
    background: #f7faf8;                   /* 浅色预览区背景 */
    font-family: system-ui, sans-serif;    /* 预览区用普通字体，模拟真实页面效果 */
  }
  .divider {
    width: 6px;                            /* 分隔条宽度 */
    flex-shrink: 0;                        /* 不许被压缩，保证始终可拖 */
    background: #d9e0d8;                   /* 平时的浅灰色 */
    cursor: col-resize;                    /* 光标变成左右双箭头，明确提示「可以横向拖动」 */
    transition: background 0.15s;          /* 颜色变化加过渡 */
  }
  /* 两种情况都变绿：鼠标悬停（:hover），以及正在拖拽（.dragging 类由 JS 添加）。
     加 .dragging 的意义是：拖动过程中指针可能已经移出分隔条，
     此时 :hover 失效，但仍需要保持高亮告诉用户「还在拖」。 */
  .divider:hover,
  .divider.dragging { background: #2f6b4f; }
  .pane-code pre { margin: 0; white-space: pre-wrap; font-size: 12px; line-height: 1.6; }
  /* <pre> 会原样保留空格和换行；white-space: pre-wrap 在此基础上允许「过长的行自动折行」，
     这样窄栏时代码不会横向溢出。margin: 0 清掉 pre 自带的外边距。 */
  .preview-box {
    padding: 16px;                         /* 内边距 */
    background: #2f6b4f;                   /* 主题绿 */
    color: #fff;                           /* 白字 */
    border-radius: 8px;                    /* 圆角 */
    text-align: center;                    /* 文字居中 */
  }
  .label {
    font-size: 11px;                       /* 小字号 */
    font-weight: 700;                      /* 加粗 */
    color: #5c6b62;                        /* 默认灰绿色 */
    margin-bottom: 8px;                    /* 与下方内容拉开 */
    font-family: system-ui, sans-serif;    /* 标签文字用普通字体 */
  }
  /* 更具体的后代选择器会覆盖上面的 .label：
     深色代码区里的标签改用亮绿色，才看得清。 */
  .pane-code .label { color: #6fcf97; }
</style>

<p class="hint">按住中间绿色分隔条左右拖动，可调整左右栏宽度。</p>
<!-- 三个 Flex 子元素：左栏、分隔条、右栏。三个 id 都供 JS 使用 -->
<div class="split" id="split">
  <!-- 左栏：两个 class = pane（公共滚动/内边距）+ pane-code（深色代码区外观） -->
  <div class="pane pane-code" id="left">
    <div class="label">EDITOR</div>
    <!-- <pre> 保留原始空格与换行，适合展示代码。
         &lt; 和 &gt; 是 HTML 实体，分别代表 < 和 >：
         直接写尖括号会被浏览器当成真的标签解析，所以必须转义。 -->
    <pre>&lt;div class="box"&gt;
  Hello Split!
&lt;/div&gt;

.box {
  padding: 16px;
  background: #2f6b4f;
}</pre>
  </div>
  <!-- 分隔条：title 属性会在鼠标悬停时显示一个原生小提示气泡 -->
  <div class="divider" id="divider" title="拖拽调整宽度"></div>
  <!-- 右栏：flex:1 自动占满剩余宽度，不需要 id -->
  <div class="pane pane-preview">
    <div class="label">PREVIEW</div>
    <div class="preview-box">Hello Split!</div>
  </div>
</div>

<script>
  const split = document.getElementById('split')       // 整个分栏容器，用来量它的位置和宽度
  const left = document.getElementById('left')         // 左栏，拖拽时改它的宽度
  const divider = document.getElementById('divider')   // 分隔条，拖拽的把手
  // 用一个布尔变量记录「现在是否处于拖拽中」，这是拖拽交互的标准套路
  let dragging = false

  // 第 1 步：在分隔条上按下鼠标 → 进入拖拽状态
  divider.addEventListener('mousedown', (e) => {
    // 阻止浏览器默认的「拖选文字」行为，否则拖动时会把页面文字刷成蓝色
    e.preventDefault()
    dragging = true
    divider.classList.add('dragging')                  // 加高亮类，拖动中分隔条保持绿色
    document.body.style.cursor = 'col-resize'           // 整页光标都改成左右箭头，指针移出分隔条也不变回来
    document.body.style.userSelect = 'none'             // 拖动期间全页禁止选中文字
  })

  // 第 2 步：鼠标移动 → 计算新宽度。
  // 注意监听的是 document 而不是 divider：因为快速拖动时指针会甩出分隔条，
  // 只监听分隔条会导致拖动中断。
  document.addEventListener('mousemove', (e) => {
    if (!dragging) return                              // 没在拖拽就直接返回，避免无谓计算
    // getBoundingClientRect() 返回元素相对视口的位置和尺寸（left/top/width/height 等）
    const rect = split.getBoundingClientRect()
    // 相对 split 左边缘的坐标，限制最小/最大宽度
    // e.clientX 是鼠标相对视口的横坐标，减去容器左边缘就得到「容器内部的横向距离」，
    // 这个距离正好就是左栏应有的宽度。
    let w = e.clientX - rect.left
    const min = 80
    const max = rect.width - 86 // 预留 divider + 右栏最小宽
    // 用 max 和 min 嵌套把 w 夹在 [min, max] 区间内（这是常用的「限幅」写法）：
    // 先 Math.min(max, w) 保证不超上限，再 Math.max(min, ...) 保证不低于下限。
    w = Math.max(min, Math.min(max, w))
    // 写回行内样式。注意必须拼上 'px' 单位，否则浏览器不认这个值。
    left.style.width = w + 'px'
  })

  // 第 3 步：松开鼠标 → 退出拖拽状态，并把临时改动的全局样式还原
  document.addEventListener('mouseup', () => {
    if (!dragging) return                              // 本来就没在拖，什么都不用做
    dragging = false
    divider.classList.remove('dragging')               // 去掉高亮
    document.body.style.cursor = ''                    // 空字符串 = 删除这条行内样式，回到 CSS 里的原值
    document.body.style.userSelect = ''                // 恢复可选中文字
  })
</script>`,
  },
]

export default part2GridPositionDemos
