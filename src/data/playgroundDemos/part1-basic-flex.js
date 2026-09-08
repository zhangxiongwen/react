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
<!-- DOCTYPE 是「文档类型声明」，必须写在文件最前面。
     它不是标签，作用是告诉浏览器：请用现代标准模式来解析这份文档。 -->
<html lang="zh-CN">
<!-- <html> 是整份文档的根标签，所有内容都装在它里面。
     lang="zh-CN" 声明页面语言为简体中文，方便屏幕阅读器发音、
     搜索引擎识别、以及浏览器判断是否要弹出翻译提示。 -->
<head>
  <!-- <head> 装的是「给浏览器看的信息」，里面的内容不会显示在页面上 -->
  <meta charset="UTF-8" />
  <!-- charset 指定字符编码为 UTF-8。不写或写错，中文就会显示成乱码 -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- viewport 是手机端适配的关键一行：
       width=device-width  让页面的布局宽度等于设备屏幕宽度；
       initial-scale=1.0   初始缩放比例为 1 倍（不自动放大或缩小）。
       不写这行，手机上会按 980px 的假想宽度渲染再缩小，字会很小。 -->
  <title>空白模板</title>
  <!-- <title> 是浏览器标签页上显示的文字，也是收藏夹里的默认名称 -->
  <style>
    /* <style> 标签里写的是 CSS 样式，作用范围是当前这份文档 */

    /* 选择器 * 表示「所有元素」，*::before / *::after 表示「所有元素的两个伪元素」。
       三者用逗号并列，等于把同一条声明应用到页面上的一切东西上。 */
    /* 全局：让 padding/border 算进 width，避免布局意外 */
    *, *::before, *::after { box-sizing: border-box; }

    /* body 选择器命中文档主体，也就是页面上所有可见内容的容器 */
    body {
      margin: 16px;                              /* 去掉浏览器默认 8px 外边距 */
      font: 14px/1.6 system-ui, sans-serif;      /* 系统字体 + 行高 */
      /* 上面这行是 font 简写：14px 是字号，斜杠后的 1.6 是行高倍数
         （14 × 1.6 ≈ 22.4px 一行）；system-ui 表示直接用操作系统的界面字体，
         sans-serif 是兜底的「无衬线字体」，前面找不到时才用它 */
      color: #1f2a24;                            /* 全局文字颜色（深墨绿），会被后代元素继承 */
    }
  </style>
</head>
<body>
  <!-- <body> 装的是「给用户看的内容」，写在这里的标签才会渲染到屏幕上 -->
  <!-- 从这里开始写你的 HTML -->
  <h1>开始写代码吧</h1>
  <!-- <h1> 是一级标题，语义上代表本页最重要的标题。
       它是块级元素，默认独占一行，字号大且加粗 -->
  <p>左侧改代码，右侧实时预览。支持 HTML / CSS / JavaScript。</p>
  <!-- <p> 是段落标签，同样是块级元素，默认自带上下外边距 -->
</body>
</html>`,
  },
  {
    id: 'p1-basic-block-stack',
    title: '块级元素纵向堆叠',
    group: '01-基础入门',
    summary: 'div / p / h1 默认占满一行，自上而下排列',
    code: `<style>
  /* 选择器 * 是通用选择器，命中页面上所有元素。
     box-sizing: border-box 让元素的 width/height 把 padding 和 border 一起算进去，
     这样「写多少就占多少」，不会因为加内边距而意外变宽。 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }
  /* margin: 16px 让内容离窗口四边各留 16px；
     font 简写里 14px 是字号、1.6 是行高倍数、system-ui 用系统界面字体；
     color 设置全局文字颜色，后代元素会继承它。 */

  /* .block 是「类选择器」，命中所有写了 class="block" 的元素 */
  /* 块级元素：width 默认 100%，独占一行 */
  .block {
    padding: 12px 16px;           /* 内边距：上下 12px、左右 16px，把文字和边框撑开 */
    margin-bottom: 8px;           /* 块与块之间的垂直间距 */
    background: #eef6f1;          /* 背景色（浅绿），便于看清每个块的实际占位范围 */
    border: 1px solid #9bb5a6;    /* 边框简写：1px 宽 + solid 实线 + 颜色 */
    border-radius: 8px;           /* 圆角半径 8px，让方块看起来柔和一些 */
  }
  /* .block--accent 是 BEM 命名里的「修饰类」，和 .block 一起用来覆盖个别属性。
     它和 .block 权重相同，但写在后面，所以后写的颜色会生效。 */
  .block--accent { background: #d9ebe1; border-color: #2f6b4f; }
</style>

<!-- 三个 div 会纵向堆叠，不会并排 -->
<!-- <div> 是最通用的「容器」标签，本身没有语义，专门用来分块和挂样式。
     它默认是块级元素，所以不用写任何布局代码就会自动竖向排列。 -->
<div class="block block--accent">标题区 — 块级元素</div>
<!-- class 属性可以写多个类名，用空格隔开：这里同时应用了基础样式和强调样式 -->
<div class="block">正文段落：块级元素宽度撑满父级，换行后仍占一整行。</div>
<div class="block">底部说明：无需 flex，默认文档流就是竖排。</div>`,
  },
  {
    id: 'p1-basic-inline-block',
    title: '行内 vs 块级',
    group: '01-基础入门',
    summary: 'span 不换行；display:block 可强制换行',
    code: `<style>
  /* 通用选择器 *：给所有元素统一盒模型，避免 padding 把宽度撑大 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; }

  /* .row 只是一个外层演示框，用来把两组对比装起来 */
  .row {
    padding: 12px;                     /* 四周内边距 12px，让内容不贴着虚线框 */
    margin-bottom: 12px;               /* 和下一个框之间留 12px 垂直距离 */
    background: #f7faf8;               /* 极浅的灰绿底色 */
    border: 1px dashed #9bb5a6;        /* dashed 是虚线边框，视觉上表示「辅助框」 */
    border-radius: 8px;                /* 8px 圆角 */
  }
  /* 行内：在同一行里排列，宽高由内容决定 */
  .tag {
    display: inline;              /* 默认值，可省略 */
    /* display 决定元素的「显示类型」：
       inline 行内元素 → 像文字一样在行里流动，不换行，也不能设置有效的 width/height；
       block  块级元素 → 独占一行，可设宽高。 */
    padding: 4px 10px;            /* 上下 4px、左右 10px 的内边距，做出胶囊内的留白 */
    background: #2f6b4f;          /* 深绿背景 */
    color: #fff;                  /* 白色文字，和深色背景形成对比 */
    border-radius: 999px;         /* 一个远大于高度的圆角值，效果就是左右两端变成半圆（胶囊形） */
    font-size: 12px;              /* 字号调小，符合「标签」的视觉层级 */
    /* 注意：inline 元素的上下 padding 可能不影响行高 */
  }
  /* 块级：独占一行 */
  .tag-block {
    display: block;               /* 把本来是行内的 <span> 改成块级，于是它开始独占一行 */
    margin-top: 6px;              /* 每块和上一块之间留 6px */
    padding: 8px 12px;            /* 变成块级后，上下 padding 会真实地把盒子撑高 */
    background: #eef6f1;
    border: 1px solid #9bb5a6;
    border-radius: 6px;
    color: #1f2a24;               /* 深色文字，因为背景换成了浅色 */
  }
</style>

<div class="row">
  <!-- span 是行内元素，多个 span 会排在同一行 -->
  <!-- <span> 是「无语义的行内容器」，专门用来包一小段文字并单独设置样式 -->
  <span class="tag">React</span>
  <span class="tag">CSS</span>
  <span class="tag">HTML</span>
  <span>← 这些标签在同一行流动</span>
  <!-- 这个 span 没有 class，保持浏览器默认样式，用来对比 -->
</div>

<div class="row">
  <!-- 同样是 <span>，但 CSS 里给它 display:block，于是每个都换行 -->
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
  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; }

  /* .compare 是并排对比的容器：
     display: flex   开启弹性布局，子元素默认沿水平主轴排成一行；
     gap: 16px       子项之间留 16px 间隙（只在子项之间，不影响容器内边缘）；
     flex-wrap: wrap 空间不够时允许折行，避免盒子被挤扁。 */
  .compare { display: flex; gap: 16px; flex-wrap: wrap; }

  /* .box 是两个盒子共用的基础样式，故意把 padding 和 border 都写得很粗，
     这样两种 box-sizing 的差别才看得明显 */
  .box {
    width: 160px;                 /* 声明宽度都是 160px */
    padding: 20px;                /* 四周各 20px 内边距，左右合计 40px */
    border: 4px solid #2f6b4f;    /* 4px 实线边框，左右合计 8px */
    background: #eef6f1;
    border-radius: 8px;
    font-size: 13px;
  }
  /* content-box（默认）：160px 只算内容区，总宽 = 160 + 40 + 8 = 208px */
  .content-box {
    box-sizing: content-box;      /* width 只管内容区，padding/border 额外往外加 */
  }
  /* border-box（推荐）：160px 含 padding + border，视觉宽度就是 160px */
  .border-box {
    box-sizing: border-box;       /* width 是「含边框的总宽」，内容区被自动压缩 */
  }
  /* .label 是盒子里的小标题 */
  .label { font-weight: 700; margin-bottom: 6px; color: #2f6b4f; }
  /* font-weight: 700 等价于 bold（加粗）；数值范围通常 100~900，400 是正常 */

  /* .hint 是页面上的说明文字，字号更小、颜色更淡，降低视觉权重 */
  .hint { font-size: 12px; color: #5c6b62; margin-top: 12px; }
</style>

<!-- <p> 段落，这里当作说明文字使用 -->
<p class="hint">两个盒子都写 width:160px — 观察实际占位宽度差异</p>

<!-- Flex 容器：把下面两个盒子并排放，方便直接比较宽度 -->
<div class="compare">
  <!-- class 里写了两个类名：.box 提供公共外观，.content-box 单独指定盒模型 -->
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
  /* 统一盒模型，后面算宽度时不用再脑补 padding */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body {
    margin: 0;                    /* 外边距清零，让背景色铺满整个预览区 */
    padding: 24px;                /* 改用内边距留白：内边距在背景色「里面」，不会露白边 */
    font: 14px/1.6 system-ui, sans-serif;
    background: #f4f7f5;          /* 浅灰绿页面底色，衬托白色卡片 */
  }

  /* 关键：块级 + 有明确 width + margin-left/right:auto → 水平居中 */
  .card {
    width: 280px;                 /* 必须有明确宽度，才会有「剩余空间」可以平分 */
    margin: 0 auto;               /* 上下 0，左右自动平分剩余空间 */
    /* margin 两个值的简写：第一个管上下，第二个管左右。
       auto 的含义是「把剩余空间都给我」，左右都是 auto 时会各分一半 → 居中。 */
    padding: 20px 24px;           /* 上下 20px、左右 24px 内边距 */
    background: #fff;
    border: 1px solid #9bb5a6;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(31, 42, 36, 0.08);
    /* box-shadow 四个值依次是：水平偏移 0、垂直偏移 4px（往下）、
       模糊半径 16px、颜色。rgba 最后的 0.08 是透明度（8%），做出很淡的浮起感。 */
  }
  /* 后代选择器「.card h2」：命中 .card 内部的所有 <h2>，中间的空格表示「里面的」 */
  .card h2 { margin: 0 0 8px; font-size: 18px; color: #2f6b4f; }
  /* margin: 0 0 8px 是三值简写：上 0、左右 0、下 8px。
     先清掉标题的默认外边距，再单独给下方留出间距。 */
  .card p { margin: 0; color: #5c6b62; font-size: 13px; }
</style>

<!-- 登录卡片示例：经典 margin:auto 居中 -->
<!-- <article> 是语义化标签，表示一块「可独立成篇的内容」。
     换成 <div> 视觉上完全一样，但语义更弱；这里用 article 更贴合「一张卡片」的含义。 -->
<article class="card">
  <h2>欢迎回来</h2>
  <!-- <h2> 二级标题，表示卡片内部的标题层级 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* .toolbar 是横向工具条容器 */
  .toolbar {
    display: flex;                /* 开启 Flex：子元素（按钮）默认横向排成一行 */
    gap: 12px;                    /* 按钮之间留 12px 间隙 */
    align-items: center;          /* 交叉轴（这里是垂直方向）居中，让高矮不同的按钮中线对齐 */
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
    font: inherit;                /* inherit 表示继承父级字体。按钮默认用系统小字体，
                                     写了 inherit 才会跟随 body 的字号和字族 */
    cursor: pointer;              /* 鼠标移上去变成手型指针，暗示「这里可以点」 */
  }
  .btn--primary {
    padding: 10px 24px;           /* 主按钮可以更大一点 */
    background: #2f6b4f;          /* 实心深绿背景，视觉上最突出 */
    color: #fff;
    border-color: #2f6b4f;        /* 边框颜色和背景一致，看起来像没有边框 */
  }
  /* 对比：padding 太小，难点 */
  .btn--tiny {
    padding: 2px 6px;             /* 内边距极小 → 热区很小，手指/鼠标不容易命中 */
    font-size: 12px;
  }
</style>

<div class="toolbar">
  <!-- <button> 是原生按钮标签，自带键盘可聚焦、可回车触发等无障碍能力 -->
  <button class="btn">取消</button>
  <!-- 同时挂 .btn 和 .btn--primary：前者给通用外观，后者覆盖成主按钮配色 -->
  <button class="btn btn--primary">保存修改</button>
  <button class="btn btn--tiny">太小</button>
  <!-- style 属性是「行内样式」，直接写在标签上，优先级高于 <style> 里的类选择器。
       临时说明文字这样写很方便，但正式项目里建议统一写到 CSS 里便于维护。 -->
  <span style="font-size:12px;color:#5c6b62;">← 对比 padding 差异</span>
</div>`,
  },
  {
    id: 'p1-basic-two-cols-percent',
    title: '两栏 50% 溢出 vs 修复',
    group: '01-基础入门',
    summary: 'content-box 下 50%+50% 会换行；border-box 可并排',
    code: `<style>
  /* 先给所有元素设成 border-box，作为「正确写法」的基准 */
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* .section 把「一个对比案例」整体往下隔开 */
  .section { margin-bottom: 20px; }
  /* 后代选择器：.section 里面的 <h3> 才会被命中 */
  .section h3 { margin: 0 0 8px; font-size: 14px; color: #2f6b4f; }

  /* .row 是两栏的父容器：
     display: flex   横向排列子项；
     flex-wrap: wrap 一行装不下就折到下一行（正是本 Demo 要演示的现象）；
     虚线边框用来标出容器的真实边界。 */
  .row { display: flex; flex-wrap: wrap; border: 1px dashed #9bb5a6; }

  .col {
    width: 50%;                   /* 各占一半 */
    padding: 12px;                /* 左右各 12px，合计额外 24px */
    border: 2px solid #2f6b4f;    /* 左右各 2px，合计额外 4px */
    background: #eef6f1;
    font-size: 13px;
  }
  /* 问题演示：content-box 时 border+padding 让总宽 > 50%，第二列被挤换行 */
  /* 选择器 .broken .col 的意思是「.broken 内部的 .col」，
     所以只有上面那组会被改成 content-box，下面那组仍是 border-box。 */
  .broken .col { box-sizing: content-box; }

  /* .hint 用红色表示「这是错误示范的说明」 */
  .hint { font-size: 12px; color: #c53030; margin-top: 6px; }
  /* .ok 用绿色表示「这是正确写法的说明」 */
  .ok { font-size: 12px; color: #2f6b4f; margin-top: 6px; }
</style>

<div class="section">
  <h3>❌ content-box：50% + 50% 却换行了</h3>
  <!-- 这个 .row 额外加了 .broken 类，用来触发上面那条 content-box 覆盖规则 -->
  <div class="row broken">
    <div class="col">左栏 50%</div>
    <div class="col">右栏被挤到下一行</div>
  </div>
  <p class="hint">padding + border 额外占宽，总和超过 100%</p>
</div>

<div class="section">
  <h3>✓ border-box：两栏正常并排</h3>
  <!-- 没有 .broken，继承通用选择器给的 border-box，于是 50%+50% 刚好填满 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* .demo 是每组示范的外层，负责把两组隔开 */
  .demo { margin-bottom: 20px; }
  .demo h3 { margin: 0 0 8px; font-size: 14px; color: #2f6b4f; }

  /* .cards 只开启 Flex，不设间距；间距由下面两种不同方式分别提供 */
  .cards { display: flex; }

  .card {
    flex: 1;                      /* 等分剩余空间：每张卡片宽度相同，一起填满整行 */
    padding: 12px;
    background: #eef6f1;
    border: 1px solid #9bb5a6;
    border-radius: 8px;
    font-size: 13px;
  }

  /* 方式 A：margin-right 做间距 — 最后一个也要记得处理 */
  /* .with-margin .card 是后代选择器：只给「间距用 margin 那一组」里的卡片加右外边距 */
  .with-margin .card { margin-right: 12px; }
  /* :last-child 是伪类，表示「在父元素里排最后一个的那个子元素」。
     不加这条的话，最后一张卡片右边也会多出 12px，导致整行右侧留白不对齐。 */
  .with-margin .card:last-child { margin-right: 0; }

  /* 方式 B：gap — 只作用于 flex 子项之间，更干净 */
  /* gap 写在「容器」上而不是子项上，浏览器自动只在相邻子项之间插空隙，
     首尾不会多出边距，也就不需要 :last-child 之类的特殊处理。 */
  .with-gap { gap: 12px; }

  .note { font-size: 12px; color: #5c6b62; margin-top: 6px; }
</style>

<div class="demo">
  <h3>margin-right 间距</h3>
  <!-- .cards 提供 Flex 布局，.with-margin 决定「用 margin 制造间距」 -->
  <div class="cards with-margin">
    <div class="card">卡片 A</div>
    <div class="card">卡片 B</div>
    <div class="card">卡片 C</div>
  </div>
  <p class="note">需 :last-child 去掉末尾 margin，且 margin 会参与外边距折叠</p>
</div>

<div class="demo">
  <h3>gap 间距（Flex 推荐）</h3>
  <!-- 同样的三张卡片，只把修饰类换成 .with-gap，间距改由容器的 gap 提供 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 开启 Flex：子元素沿主轴（默认水平）排列 */
  .bar {
    display: flex;                /* 一旦父元素是 flex，它的直接子元素就变成「弹性子项」并横向排列 */
    gap: 12px;                    /* 子项之间 12px 间隙 */
    padding: 12px 16px;           /* 上下 12px、左右 16px 内边距，撑出顶栏高度 */
    background: #2f6b4f;
    color: #fff;                  /* 白色文字；颜色会被后代继承，所以里面的文字都变白 */
    border-radius: 10px;
  }
  /* .bar__logo 是 BEM 命名：两个下划线表示「bar 这个块里的 logo 元素」 */
  .bar__logo { font-weight: 700; }
  /* 导航自己也是一个 Flex 容器（Flex 可以任意嵌套），让三个按钮横向排列 */
  .bar__nav { display: flex; gap: 16px; }
  /* 后代选择器：只命中 .bar__nav 里面的 <button>，把原生按钮外观清空成「文字链接」样 */
  .bar__nav button {
    border: 0; background: transparent; font: inherit; cursor: pointer;
    /* border: 0 去掉默认边框；transparent 是透明背景；
       font: inherit 让按钮继承 body 字体；cursor: pointer 显示手型 */
    color: #fff; opacity: 0.9; padding: 0;
    /* opacity: 0.9 整体 90% 不透明度（略微变淡）；padding: 0 清掉按钮默认内边距 */
  }
  /* :hover 是伪类，表示「鼠标悬停在该元素上时」才应用的样式。
     这里悬停时把透明度提到 1（变亮），并用 text-decoration: underline 给文字加下划线，
     给用户「这是可点击项」的反馈。 */
  .bar__nav button:hover { opacity: 1; text-decoration: underline; }
</style>

<!-- 简易顶栏：logo 和导航横排 -->
<!-- <header> 是语义化标签，表示「页头」区域；视觉效果同 div，但更利于无障碍与 SEO -->
<header class="bar">
  <div class="bar__logo">Study</div>
  <!-- <nav> 表示「导航链接的集合」，屏幕阅读器可以据此快速跳到导航区 -->
  <nav class="bar__nav">
    <!-- type="button" 明确声明这是普通按钮。
         如果按钮在 <form> 里且不写 type，默认会是 submit 从而触发表单提交，
         所以养成写 type="button" 的习惯可以避免意外刷新页面。 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; }
  /* margin: 0 让导航栏能顶到预览区最边缘，做出「通栏」效果 */

  .nav {
    display: flex;
    justify-content: space-between; /* 主轴：首尾贴边，中间均分剩余空间 */
    /* justify-content 控制「主轴」（这里是水平方向）上的分布。
       space-between 会把剩余空间全部塞到子项之间，首尾两个子项紧贴容器边缘。 */
    align-items: center;            /* 交叉轴：垂直居中 */
    /* align-items 控制「交叉轴」（这里是垂直方向）的对齐，
       center 让高矮不同的三组内容在竖直方向对齐中线。 */
    padding: 12px 20px;
    background: #1f2a24;            /* 接近黑的深色底 */
    color: #fff;
  }
  .nav__brand { font-weight: 700; font-size: 16px; }
  /* 中间的链接组自己也是 Flex 容器，负责让三个按钮横排并留 20px 间距 */
  .nav__links { display: flex; gap: 20px; }
  /* 清掉按钮的原生外观，让它看起来像导航文字 */
  .nav__links button { border: 0; background: transparent; font: inherit; cursor: pointer; padding: 0; }
  /* 逗号表示「或」：同时命中 .nav__links 里的 <a> 和 <button>，给它们统一的文字样式。
     text-decoration: none 去掉链接默认的下划线。 */
  .nav__links a, .nav__links button { color: #e8f0eb; text-decoration: none; }
  /* 右侧操作区：同样是嵌套 Flex，两个按钮间距 8px */
  .nav__actions { display: flex; gap: 8px; }
  .nav__btn {
    padding: 6px 14px;
    border-radius: 6px;
    border: 1px solid #6fcf97;      /* 亮绿描边 */
    background: transparent;        /* 透明背景 → 「幽灵按钮」，视觉权重低于实心按钮 */
    color: #6fcf97;
    font: inherit;
    cursor: pointer;
  }
  /* 修饰类：把幽灵按钮改成实心，用来表达「这是首选操作」 */
  .nav__btn--fill { background: #2f6b4f; border-color: #2f6b4f; color: #fff; }
</style>

<!-- 最外层直接用 <nav>，语义上说明整条是导航栏 -->
<nav class="nav">
  <!-- 第 1 个 flex 子项：品牌名，靠最左 -->
  <div class="nav__brand">React Study</div>
  <!-- 第 2 个 flex 子项：链接组，被 space-between 推到中间 -->
  <div class="nav__links">
    <button type="button">文档</button>
    <button type="button">示例</button>
    <button type="button">社区</button>
  </div>
  <!-- 第 3 个 flex 子项：操作按钮组，靠最右 -->
  <div class="nav__actions">
    <button class="nav__btn">登录</button>
    <!-- 两个类名叠加：基础样式 + 实心修饰 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .tabs {
    display: flex;
    justify-content: space-around; /* 子项周围空间相等（首尾只有半份） */
    /* space-around 的算法：给每个子项左右各分配「一份」空隙。
       相邻两项之间的空隙由各自的半份相加 → 看起来是 1 份；
       而首尾两侧只有单个子项的半份 → 看起来是 0.5 份。
       所以边缘留白比中间小，这是它和 space-evenly 的关键差异。 */
    padding: 8px;
    background: #f7faf8;
    border: 1px solid #d9e0d8;
    border-radius: 10px;
  }
  .tab {
    padding: 10px 16px;           /* 撑出足够大的点击热区 */
    border: none;                 /* 去掉按钮默认边框 */
    background: transparent;      /* 未选中时透明，融入容器背景 */
    font: inherit;                /* 继承 body 字体，避免按钮用系统小字号 */
    color: #5c6b62;               /* 未选中用灰绿色，视觉权重低 */
    cursor: pointer;
    border-radius: 6px;
  }
  /* 修饰类：表示「当前选中的那个 Tab」 */
  .tab--active {
    background: #2f6b4f;          /* 深绿实心底 */
    color: #fff;
    font-weight: 600;             /* 半粗体，进一步强调选中态 */
  }
  .hint { font-size: 12px; color: #5c6b62; margin-top: 8px; }
</style>

<!-- Tab 栏容器 -->
<div class="tabs">
  <!-- 第一个按钮叠加 .tab--active，表示它是当前页 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .steps {
    display: flex;
    justify-content: space-evenly;  /* 所有间隙（含首尾）宽度相同 */
    /* space-evenly 把剩余空间平均切成「子项数 + 1」份：
       3 个子项就切成 4 份，容器左边缘、每两项之间、右边缘各占 1 份，
       所以边缘留白和中间留白完全一样宽。 */
    align-items: center;            /* 交叉轴（垂直）居中 */
    padding: 16px;
    background: #eef6f1;
    border-radius: 10px;
  }
  .step {
    text-align: center;             /* 让圆圈和下方文字都在自己这一列里水平居中 */
    font-size: 13px;
    color: #1f2a24;
  }
  .step__num {
    display: inline-flex;           /* inline-flex：对外像行内元素（不独占一行），
                                       对内是 Flex 容器，可以用下面两行把数字居中 */
    width: 32px;
    height: 32px;                   /* 宽高相等是画正圆的前提 */
    align-items: center;            /* 数字在圆圈内垂直居中 */
    justify-content: center;        /* 数字在圆圈内水平居中 */
    background: #2f6b4f;
    color: #fff;
    border-radius: 50%;             /* 圆角设为宽高的一半（50%），正方形就变成正圆 */
    font-weight: 700;
    margin-bottom: 4px;             /* 圆圈和下面文字之间留 4px */
  }
  .hint { font-size: 12px; color: #5c6b62; margin-top: 8px; }
</style>

<!-- 步骤条容器：三个步骤在水平方向完全均分 -->
<div class="steps">
  <!-- 每个 .step 内部：上面是圆形序号（块级会换行），下面紧跟文字说明 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  /* html, body 用逗号同时命中这两个元素：
     height: 100% 是「垂直居中」的前提——只有 body 真的有一屏那么高，
     才存在可以居中的垂直空间（html 也要给高度，否则 body 的 100% 无参照）。 */
  html, body { height: 100%; margin: 0; }
  body {
    display: flex;            /* 把 body 本身变成 Flex 容器 */
    justify-content: center;  /* 主轴（水平）居中 */
    align-items: center;      /* 交叉轴（垂直）居中 */
    /* 这两行组合就是最常用的「双轴居中」写法，比老式的定位 + 负 margin 简单得多 */
    background: #f4f7f5;
    font: 14px/1.5 system-ui, sans-serif;
  }
  .modal {
    width: 300px;             /* 固定宽度，弹窗不随屏幕拉伸 */
    padding: 24px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #9bb5a6;
    box-shadow: 0 12px 40px rgba(31, 42, 36, 0.12);
    /* 大偏移（12px）+ 大模糊（40px）+ 低透明度，做出「悬浮在页面之上」的观感 */
    text-align: center;       /* 内部所有行内内容（标题、文字、按钮）水平居中 */
  }
  .modal h2 { margin: 0 0 8px; color: #2f6b4f; }
  .modal p { margin: 0 0 16px; color: #5c6b62; font-size: 13px; }
  /* 三值 margin 简写：上 / 左右 / 下。先清默认外边距，再单独控制下方间距 */
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
<!-- 注意这里只有一个子元素：body 作为 Flex 容器把它居中，
     所以 .modal 自己完全不需要写任何定位代码 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .demo { margin-bottom: 16px; }
  .demo h3 { margin: 0 0 8px; font-size: 13px; color: #2f6b4f; }
  .row {
    display: flex;
    gap: 8px;
    padding: 12px;
    min-height: 56px;             /* 最小高度：内容再少也保持 56px，
                                     这样虚线框大小一致，方便对比对齐效果 */
    background: #f7faf8;
    border: 1px dashed #9bb5a6;   /* 虚线框标出容器边界，才能看出「靠哪边」 */
    border-radius: 8px;
  }
  .chip {
    padding: 6px 12px;
    background: #d9ebe1;
    border-radius: 6px;
    font-size: 13px;
  }
  /* 靠左（主轴起点，默认） */
  /* flex-start 表示对齐到主轴起点。水平排列且从左往右阅读时，起点就是左边。
     这是 justify-content 的默认值，写出来只是为了和下面形成对照。 */
  .start { justify-content: flex-start; }
  /* 靠右（主轴终点） */
  /* flex-end 对齐到主轴终点：子项整体被推到右侧，剩余空间集中在左边 */
  .end { justify-content: flex-end; }
</style>

<div class="demo">
  <h3>justify-content: flex-start（默认靠左）</h3>
  <!-- .row 提供 Flex 容器，.start 只负责指定主轴对齐方式 -->
  <div class="row start">
    <span class="chip">标签 A</span>
    <span class="chip">标签 B</span>
  </div>
</div>

<div class="demo">
  <h3>justify-content: flex-end（靠右）</h3>
  <!-- 结构完全相同，只把修饰类换成 .end，验证「布局差异只来自这一个属性」 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .actions {
    display: flex;
    gap: 10px;                    /* 子项之间固定 10px，不影响容器边缘 */
    /* gap 也可以写两个值，如 gap: 12px 8px（行间距 12px、列间距 8px）；
       写一个值时行、列共用同一个间距。 */
    flex-wrap: wrap;              /* 允许换行：窗口很窄时按钮折到下一行而不是被压扁 */
  }
  .btn {
    padding: 8px 16px;
    border-radius: 8px;
    border: 1px solid #9bb5a6;    /* 默认按钮：灰绿描边 + 白底，视觉权重最低 */
    background: #fff;
    font: inherit;
    cursor: pointer;
  }
  /* 主操作：实心深绿，最醒目 */
  .btn--primary { background: #2f6b4f; color: #fff; border-color: #2f6b4f; }
  /* 危险操作：只把文字和描边改成红色，保持白底，避免比主按钮还抢眼 */
  .btn--danger { color: #c53030; border-color: #c53030; }
</style>

<!-- 表单底部操作栏 -->
<!-- 三个按钮就是这个 Flex 容器的三个子项，横向排列并由 gap 隔开 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .tags {
    display: flex;
    flex-wrap: wrap;              /* 允许换行（默认 nowrap 会挤在一起） */
    gap: 8px;                     /* 行内、行间间距都由 gap 控制 */
    /* 这是 gap 相比 margin 的一大优势：换行后「行与行之间」也自动有 8px，
       用 margin 实现的话上下左右都要单独处理，还要去掉边缘多余间距。 */
    padding: 12px;
    background: #f7faf8;
    border-radius: 10px;
    max-width: 320px;             /* 缩窄容器触发换行 */
    /* max-width 是「最大宽度」：容器最多 320px 宽，比这更窄时会跟着变窄。
       这里故意限制宽度，好让标签数量超出一行、演示 wrap 效果。 */
  }
  .tag {
    padding: 4px 10px;
    background: #eef6f1;
    border: 1px solid #9bb5a6;
    border-radius: 999px;         /* 超大圆角 → 左右两端变半圆，即胶囊形标签 */
    font-size: 12px;
    color: #2f6b4f;
  }
  .hint { font-size: 12px; color: #5c6b62; margin-top: 8px; }
</style>

<!-- 标签云：子项数量不定，正是 flex-wrap 的典型场景 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .scroll-row {
    display: flex;
    flex-wrap: nowrap;              /* 强制单行 */
    /* nowrap 是 flex-wrap 的默认值：无论多挤都不换行。
       此时子项会先被压缩（shrink），压不动了才真正溢出容器。 */
    gap: 12px;
    overflow-x: auto;               /* 溢出时横向滚动（常见移动端方案） */
    /* overflow-x 控制水平方向内容超出时的行为：
       visible（默认）溢出照样画出来；hidden 直接裁掉；
       auto 内容超出才出现滚动条，没超出就不显示，最实用。 */
    padding: 12px;
    background: #f7faf8;
    border-radius: 10px;
    max-width: 280px;               /* 故意限制宽度，让 6 个标签一定装不下 */
  }
  .pill {
    flex-shrink: 0;                 /* 禁止被 flex 压缩宽度 */
    /* flex-shrink 默认是 1，意思是「空间不够时允许我按比例被压缩」。
       改成 0 表示「宁可溢出也不许压扁我」，这样文字不会被挤成一团，
       溢出的部分才交给上面的 overflow-x: auto 变成滚动。 */
    padding: 8px 16px;
    background: #2f6b4f;
    color: #fff;
    border-radius: 999px;           /* 胶囊形 */
    font-size: 13px;
    white-space: nowrap;            /* 文字内部不允许自动折行，保证每个标签只有一行 */
  }
  .hint { font-size: 12px; color: #5c6b62; margin-top: 8px; }
</style>

<!-- 横向滑动分类 Tab -->
<!-- 试着在灰色框内左右拖动或横向滚轮，可以滑出后面被藏住的标签 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .demo { margin-bottom: 16px; }
  .demo h3 { margin: 0 0 8px; font-size: 13px; color: #2f6b4f; }
  .row {
    display: flex;
    gap: 8px;
    min-height: 72px;             /* 给容器一个最小高度，才有「垂直方向的空间」可供对齐 */
    padding: 8px;
    background: #f7faf8;
    border: 1px dashed #9bb5a6;
    border-radius: 8px;
  }
  .box { padding: 8px 12px; background: #d9ebe1; border-radius: 6px; font-size: 13px; }
  /* 修饰类：加大上下 padding，人为造出一个「更高」的盒子来做对比 */
  .box--tall { padding: 20px 12px; }
  /* 修饰类：放大字号，用来演示 baseline（不同字号的文字底线如何对齐） */
  .box--text { font-size: 20px; }

  /* align-items 控制「交叉轴」对齐。主轴水平时，交叉轴就是垂直方向。 */
  .stretch { align-items: stretch; }    /* 默认：拉伸到容器交叉轴高度 */
  /* stretch 是默认值：子项若没写固定高度，就被拉伸到和容器一样高，
     所以「矮」盒子看起来和「高」盒子等高。 */
  .center { align-items: center; }      /* 垂直居中 */
  /* center：子项保持自身高度，整体在垂直方向居中对齐 */
  .baseline { align-items: baseline; }  /* 文字基线对齐 */
  /* baseline 按「文字底线」对齐（汉字/字母坐着的那条线）。
     字号不同时特别有用：能让大小字的底部落在同一水平线上，视觉更整齐。 */
</style>

<div class="demo">
  <h3>stretch（默认拉伸）</h3>
  <div class="row stretch">
    <div class="box">矮</div>
    <!-- 叠加 .box--tall 让这个盒子内容更高，便于观察对齐差异 -->
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
    <!-- 这个盒子字号 20px，观察它和左边 14px 文字的底线是否对齐 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .toolbar {
    display: flex;
    align-items: center;          /* 标题、徽标、按钮三者垂直居中对齐 */
    gap: 12px;
    padding: 10px 14px;
    background: #eef6f1;
    border-radius: 10px;
  }
  .toolbar__title { font-weight: 600; color: #1f2a24; }
  .toolbar__badge {
    padding: 2px 8px;             /* 内边距很小，做成紧凑的小徽标 */
    background: #2f6b4f;
    color: #fff;
    border-radius: 999px;         /* 胶囊形，数字徽标的常见样式 */
    font-size: 11px;
  }
  /* 关键：auto 会吃掉左侧所有剩余空间，把元素推到最右 */
  .toolbar__action {
    margin-left: auto;
    /* 在 Flex 里，margin 的 auto 会「抢走主轴上所有剩余空间」。
       只给左侧设 auto，空白全被挤到这个元素左边 → 它自然贴到最右。
       相比给容器写 justify-content: space-between，这种写法可以精确控制
       「从第几个子项开始靠右」，前面几项仍然保持紧挨在一起。 */
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
  <!-- 前两项紧挨着（由 gap 提供 12px 间隙） -->
  <span class="toolbar__title">未读消息</span>
  <span class="toolbar__badge">3</span>
  <!-- 第三项靠 margin-left: auto 被推到最右侧 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .stats {
    display: flex;                  /* 三个统计卡横向排列 */
    gap: 12px;                      /* 卡片之间 12px；等分时 gap 会先被扣除再分配剩余空间 */
  }
  .stat {
    flex: 1;                        /* flex-grow:1 + flex-shrink:1 + flex-basis:0% */
    /* flex 是三个属性的简写：
       flex-grow   有剩余空间时的「放大比例」，1 表示参与瓜分；
       flex-shrink 空间不足时的「缩小比例」，1 表示允许被压缩；
       flex-basis  分配前的基准尺寸，0% 表示不考虑内容本身宽度。
       三项一起的效果就是：忽略内容长短，把容器宽度严格等分。
       注意：如果写成 flex: 1 1 auto，基准会变成内容宽度，列宽就不再完全相等。 */
    padding: 16px;
    background: #fff;
    border: 1px solid #9bb5a6;
    border-radius: 10px;
    text-align: center;             /* 数字和标签在卡片内水平居中 */
  }
  .stat__num { font-size: 24px; font-weight: 700; color: #2f6b4f; }
  .stat__label { font-size: 12px; color: #5c6b62; margin-top: 4px; }
</style>

<!-- 三列数据概览：每列等宽 -->
<div class="stats">
  <!-- 每个 .stat 是一个 flex 子项；内部两个 div 是块级元素，自然上下堆叠 -->
  <div class="stat">
    <div class="stat__num">128</div>
    <div class="stat__label">学习时长(h)</div>
  </div>
  <div class="stat">
    <div class="stat__num">42</div>
    <div class="stat__label">完成章节</div>
  </div>
  <div class="stat">
    <!-- 内容长度不同（95% 比 128 短），但 flex-basis: 0% 保证宽度仍然相等 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .layout {
    display: flex;
    gap: 8px;
    padding: 12px;
    background: #f7faf8;
    border-radius: 10px;
    max-width: 360px;               /* 限制总宽，好让三列去争抢有限空间 */
  }
  /* 下面三个类演示 flex 简写的三个数字：flex: grow shrink basis */
  .side {
    flex: 0 0 80px;                 /* 不 grow 不 shrink，固定 80px */
    /* grow=0 有剩余空间也不变宽；shrink=0 空间不足也不许被压缩；
       basis=80px 基准宽度。结果就是「铁打的 80px」，典型的固定侧栏写法。 */
    padding: 12px;
    background: #eef6f1;
    border-radius: 6px;
    font-size: 12px;
    text-align: center;
  }
  .main {
    flex: 1 1 auto;                 /* 可 grow 可 shrink，吃掉剩余空间 */
    /* basis=auto 表示基准取内容自身宽度；grow=1 让它独享剩余空间，
       所以主内容区会随容器变宽变窄，是「自适应主栏」的标准写法。 */
    padding: 12px;
    background: #d9ebe1;
    border-radius: 6px;
    font-size: 13px;
  }
  .aside {
    flex: 0 1 100px;                /* 不 grow，但空间不够时可 shrink 到 100px 以下 */
    /* grow=0 → 空间富余时它老实待在 100px，不跟主栏抢；
       shrink=1 → 空间紧张时允许被压缩，起到「优先牺牲我」的作用。 */
    padding: 12px;
    background: #eef6f1;
    border-radius: 6px;
    font-size: 12px;
  }
  .hint { font-size: 12px; color: #5c6b62; margin-top: 8px; }
</style>

<div class="layout">
  <!-- <aside> 语义化标签，表示「与主内容相关但可独立的附属内容」，如侧边栏 -->
  <!-- <br/> 是强制换行标签，自闭合（没有结束标记） -->
  <aside class="side">侧栏<br/>固定 80px</aside>
  <!-- <main> 表示页面的主要内容区，一份文档里通常只应出现一个 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .card {
    display: flex;
    gap: 12px;
    align-items: center;            /* 缩略图、文字、按钮垂直居中对齐 */
    padding: 14px;
    background: #fff;
    border: 1px solid #9bb5a6;
    border-radius: 10px;
    max-width: 360px;
  }
  .card__thumb {
    width: 56px;
    height: 56px;                   /* 固定正方形尺寸 */
    background: #d9ebe1;
    border-radius: 8px;
    flex-shrink: 0;                 /* 不允许被压缩，保证缩略图始终是正方形 */
    display: flex;                  /* 自己也当 Flex 容器，用于把中间的图标居中 */
    align-items: center;            /* 图标垂直居中 */
    justify-content: center;        /* 图标水平居中 */
    font-size: 24px;                /* emoji 图标放大 */
  }
  .card__body { flex: 1; }          /* 文字区吃掉中间剩余宽度，把按钮挤到边上 */
  .card__body h3 { margin: 0 0 4px; font-size: 15px; }
  .card__body p { margin: 0; font-size: 13px; color: #5c6b62; }
  /* DOM 里按钮在最后，但 order 让它显示在最左（移动端常见：操作按钮前置） */
  .card__action {
    order: -1;                      /* 数字越小越靠前，默认是 0 */
    /* order 只影响 Flex（和 Grid）子项的「视觉排列顺序」，不会真的移动 DOM 节点。
       其他子项都是默认 0，这一项是 -1，所以它排到了最前面。 */
    padding: 6px 10px;
    border: 1px solid #c53030;
    border-radius: 6px;
    background: #fff;
    color: #c53030;                 /* 红色表示这是「取消 / 危险」类操作 */
    font: inherit;
    font-size: 12px;                /* 写在 font 简写之后，用来单独覆盖字号 */
    cursor: pointer;
  }
  .hint { font-size: 12px; color: #5c6b62; margin-top: 8px; }
</style>

<!-- <article> 表示一条可独立成篇的内容，这里是一张订单卡片 -->
<article class="card">
  <div class="card__thumb">📦</div>
  <div class="card__body">
    <h3>订单 #1024</h3>
    <p>已发货 · 预计明天送达</p>
  </div>
  <!-- HTML 顺序：缩略图 → 文字 → 按钮；视觉上按钮被 order:-1 拉到最前 -->
  <button class="card__action">取消</button>
</article>
<!-- 这条提醒很重要：order 改了视觉却没改 DOM，
     用键盘 Tab 键切换焦点、或屏幕阅读器朗读时，顺序仍按 HTML 里的先后。
     所以 order 只适合做小幅调整，不要用它大改阅读顺序。 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  .article {
    display: flex;
    flex-direction: column;         /* 主轴改为垂直 → 子元素自上而下 */
    /* flex-direction 决定主轴方向，共四个值：
       row（默认，从左到右）、row-reverse（从右到左）、
       column（从上到下）、column-reverse（从下到上）。
       主轴一换，justify-content / align-items 管的方向也跟着互换。 */
    gap: 12px;                      /* 竖排时 gap 就是「上下间距」，替代逐个写 margin-bottom */
    max-width: 360px;               /* 限制阅读宽度，长文一行不会太宽 */
    padding: 16px;
    background: #fff;
    border: 1px solid #9bb5a6;
    border-radius: 12px;
  }
  .article__meta { font-size: 12px; color: #5c6b62; }
  /* margin: 0 清掉标题的默认外边距——因为间距已经统一交给容器的 gap 管理，
     若不清零就会出现「gap + 默认 margin」双重叠加，间距忽大忽小 */
  .article__title { margin: 0; font-size: 20px; color: #2f6b4f; }
  .article__body { margin: 0; color: #1f2a24; }
  /* 标签行反过来用 row（默认方向），做成横排 —— Flex 可以任意嵌套 */
  .article__tags { display: flex; gap: 6px; }
  .tag {
    padding: 2px 8px;
    background: #eef6f1;
    border-radius: 999px;           /* 胶囊形小标签 */
    font-size: 11px;
    color: #2f6b4f;
  }
</style>

<article class="article">
  <!-- 第 1 项：元信息（日期、阅读时长），字号最小 -->
  <div class="article__meta">2026-09-07 · 5 分钟阅读</div>
  <!-- 第 2 项：<h1> 一级标题，语义上是这篇内容的主标题 -->
  <h1 class="article__title">Flex 纵向布局入门</h1>
  <!-- 第 3 项：正文段落 -->
  <p class="article__body">把 flex-direction 设为 column，就能优雅地堆叠标题、正文和标签。</p>
  <!-- 第 4 项：标签组，它自己内部又是一个横向 Flex -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  /* html, body 一起给 100% 高度：垂直居中必须先有「一屏高的容器」，
     只写 body 的话它默认按内容高度收缩，就没有空间可以居中了。 */
  html, body { height: 100%; margin: 0; }
  body {
    display: flex;
    flex-direction: column;         /* 竖排 */
    justify-content: center;        /* 主轴（垂直）居中 */
    align-items: center;            /* 交叉轴（水平）居中 */
    /* 注意方向已经互换了：主轴变成竖的，所以 justify-content 现在管上下，
       align-items 反而管左右。这一点是初学者最容易搞混的地方。 */
    background: #f4f7f5;
    font: 14px/1.5 system-ui, sans-serif;
  }
  .empty {
    text-align: center;             /* 卡片内部的文字自身也居中 */
    padding: 24px;
  }
  .empty__icon { font-size: 48px; margin-bottom: 12px; }
  /* 用 font-size 放大 emoji，比放图片更轻量，适合做空状态插画 */
  .empty__title { margin: 0 0 8px; color: #1f2a24; }
  .empty__desc { margin: 0 0 16px; color: #5c6b62; font-size: 13px; }
  /* 后代选择器：命中 .empty 里的 <button>，不影响页面其他按钮 */
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
<!-- body 是 Flex 容器，这个 div 是它唯一的子项，所以自动被居中在屏幕正中 -->
<div class="empty">
  <div class="empty__icon">📭</div>
  <!-- <h2> 二级标题：因为空状态一般不是整页的主标题，所以用 h2 而不是 h1 -->
  <h2 class="empty__title">暂无数据</h2>
  <p class="empty__desc">你还没有创建任何项目，点击下方开始吧。</p>
  <!-- 空状态里放一个「引导操作」按钮，是很常见的设计做法 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  /* 「页脚沉底」的第一个前提：整条高度链都要撑满一屏。
     html 有 100% 高，body 的 100% 才有参照对象。 */
  html, body { height: 100%; margin: 0; }
  body {
    display: flex;
    flex-direction: column;         /* 整页竖排：header → main → footer */
    font: 14px/1.5 system-ui, sans-serif;
  }
  /* 逗号选择器：同时命中 <header> 和 <footer> 两种标签（这里直接用标签名做选择器） */
  header, footer {
    padding: 12px 16px;
    background: #2f6b4f;
    color: #fff;
    flex-shrink: 0;                 /* 头尾不被压缩 */
    /* flex-shrink 默认为 1，内容一多头尾就可能被压扁；
       设成 0 表示「我的高度由内容决定，谁也别压我」。 */
  }
  main {
    flex: 1;                        /* 吃掉剩余高度，把 footer 推到底部 */
    /* 竖排时 flex: 1 分配的是「高度」而不是宽度。
       main 抢走 header/footer 之外的全部剩余高度，
       于是即使内容很少，footer 也被顶到了屏幕最下方。 */
    padding: 16px;
    background: #f7faf8;
  }
</style>

<!-- 三个语义化标签直接作为 body 的 flex 子项，不需要额外的 div 包裹 -->
<header>顶栏 Header</header>
<main>
  <!-- 行内样式 margin-top:0 用来清掉 h1 的默认上外边距，
       否则标题会把自己顶离内容区上边缘（这是 margin 常见的「意外留白」） -->
  <h1 style="margin-top:0;">内容区</h1>
  <p>内容少时，footer 仍贴在视口底部。</p>
</main>
<!-- <footer> 语义化页脚标签 -->
<footer>底栏 Footer</footer>`,
  },
  {
    id: 'p1-flex-col-chat',
    title: '聊天布局三件套',
    group: '03-Flex·Column',
    summary: '头 + 可滚动列表 + 底部输入',
    code: `<style>
  * { box-sizing: border-box; }

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 0; font: 14px/1.5 system-ui, sans-serif; }

  /* 聊天窗外壳：竖向三段式（头部 / 消息列表 / 输入区） */
  .chat {
    display: flex;
    flex-direction: column;
    height: 280px;                    /* 模拟固定高度容器 */
    /* 高度必须固定（或受父级限制），中间区域才知道「剩余多少高度」可以滚动。
       如果不写高度，容器会被消息撑高，永远不会出现滚动条。 */
    max-width: 360px;
    margin: 16px;                     /* 因为 body 的 margin 是 0，这里自己留出外边距 */
    border: 1px solid #9bb5a6;
    border-radius: 12px;
    overflow: hidden;                 /* 裁掉溢出圆角外的内容，
                                         否则子元素的直角背景会盖住父级的圆角 */
  }
  .chat__header {
    flex-shrink: 0;                   /* 头部高度固定，不被中间区域挤压 */
    padding: 12px 16px;
    background: #2f6b4f;
    color: #fff;
    font-weight: 600;
  }
  .chat__list {
    flex: 1;                        /* 中间区域占满剩余高度 */
    overflow-y: auto;               /* 消息多了就滚动 */
    /* 这里 overflow-y 直接写在 flex 子项上，浏览器会自动把它的最小高度当成 0，
       所以不必额外写 min-height: 0 就能正常滚动。 */
    padding: 12px;
    background: #f7faf8;
    display: flex;                  /* 消息列表自己又是一个 Flex 容器 */
    flex-direction: column;         /* 消息从上往下排 */
    gap: 8px;                       /* 气泡之间 8px 垂直间距 */
  }
  .msg {
    align-self: flex-start;         /* align-self 只作用于「这一个子项」，
                                       覆盖父级的 align-items。
                                       竖排时交叉轴是水平方向，flex-start 即靠左 */
    max-width: 75%;                 /* 气泡最宽占列表的 75%，长消息会自动折行 */
    padding: 8px 12px;
    background: #fff;
    border: 1px solid #d9e0d8;
    border-radius: 12px 12px 12px 4px;
    /* border-radius 四个值按「左上 右上 右下 左下」顺时针指定。
       左下角只有 4px，做出「小尾巴指向左边说话人」的气泡效果。 */
    font-size: 13px;
  }
  /* 修饰类：自己发出的消息 */
  .msg--me {
    align-self: flex-end;           /* 单独靠右，实现「我在右、对方在左」 */
    background: #d9ebe1;            /* 换成绿底，颜色上区分说话人 */
    border-color: #9bb5a6;
    border-radius: 12px 12px 4px 12px;  /* 小尾巴改到右下角，指向右边的自己 */
  }
  .chat__input {
    flex-shrink: 0;                 /* 输入区高度固定，不被压缩 */
    display: flex;                  /* 内部横排：输入框 + 发送按钮 */
    gap: 8px;
    padding: 10px;
    border-top: 1px solid #d9e0d8;  /* 只画上边框，作为和消息区的分隔线 */
    background: #fff;
  }
  .chat__input input {
    flex: 1;                        /* 输入框吃掉剩余宽度，按钮保持自身大小 */
    padding: 8px 12px;
    border: 1px solid #9bb5a6;
    border-radius: 8px;
    font: inherit;                  /* 表单控件默认不继承字体，必须显式写 inherit */
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
  <!-- 第 1 段：<header> 语义化头部，显示对话人 -->
  <header class="chat__header">小明</header>
  <!-- 第 2 段：消息列表，是唯一可滚动的区域（试试在里面滚轮） -->
  <div class="chat__list">
    <div class="msg">你好，Flex column 怎么做聊天框？</div>
    <!-- 加上 .msg--me 表示这条是自己发的，会靠右显示 -->
    <div class="msg msg--me">头尾 flex-shrink:0，中间 flex:1 + overflow</div>
    <div class="msg">明白了，谢谢！</div>
    <div class="msg">再多几条消息试试滚动 ↓</div>
    <div class="msg msg--me">OK</div>
    <div class="msg">👍</div>
  </div>
  <!-- 第 3 段：<footer> 作为输入区，固定在底部 -->
  <footer class="chat__input">
    <!-- type="text" 是单行文本输入框；
         placeholder 是「占位提示」，输入框为空时显示，用户一输入就消失。
         <input> 是自闭合标签，没有结束标记。 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 表单外层：竖排每个字段块 */
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
  /* 每个字段块：内部再竖排「标签 + 输入框」，这就是「Flex 嵌套 Flex」 */
  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;                       /* label 与 input 之间小间距 */
    /* 两级 gap（外层 14px、内层 4px）形成清晰的视觉分组：
       同一字段内部靠得紧，不同字段之间隔得开。 */
  }
  .field label { font-size: 13px; font-weight: 600; color: #1f2a24; }
  /* 逗号选择器：输入框和多行文本框共用同一套外观 */
  .field input, .field textarea {
    padding: 8px 12px;
    border: 1px solid #9bb5a6;
    border-radius: 8px;
    font: inherit;                  /* 表单控件默认用系统字体，必须写 inherit 才跟随页面字体 */
  }
  .field textarea { min-height: 72px; resize: vertical; }
  /* min-height 保证多行框至少三行高；
     resize 控制用户能否拖拽改变尺寸：vertical 只允许上下拉，
     避免用户横向拉宽而破坏表单布局（none 则完全禁止拖拽）。 */
  .form button {
    margin-top: 4px;                /* 在 gap 之外再多留一点，让提交按钮和字段稍微分开 */
    padding: 10px;
    border: none;
    border-radius: 8px;
    background: #2f6b4f;
    color: #fff;
    font: inherit;
    font-weight: 600;               /* 写在 font 简写之后，单独覆盖字重 */
    cursor: pointer;
  }
</style>

<!-- <form> 是表单容器，语义上表示「一组要提交的数据」，
     它也是这里的 Flex 容器，宽度由 align-items 默认值 stretch 让子项撑满 -->
<form class="form">
  <div class="field">
    <!-- <label> 的 for 属性要和对应输入框的 id 一致。
         配对成功后，点击文字也能聚焦到输入框，屏幕阅读器也会正确念出字段名。 -->
    <label for="name">姓名</label>
    <input id="name" type="text" placeholder="请输入姓名" />
  </div>
  <div class="field">
    <label for="email">邮箱</label>
    <!-- type="email" 会让手机弹出带 @ 的键盘，并在提交时做基础的邮箱格式校验 -->
    <input id="email" type="email" placeholder="you@example.com" />
  </div>
  <div class="field">
    <label for="bio">简介</label>
    <!-- <textarea> 是多行文本框。注意它必须有结束标记，
         默认值写在开始和结束标记「之间」，而不是用 value 属性。 -->
    <textarea id="bio" placeholder="简单介绍一下自己"></textarea>
  </div>
  <!-- type="submit" 表示点击它会提交所在的 <form>（也是 form 内按钮的默认行为） -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .timeline {
    display: flex;
    flex-direction: column-reverse; /* 主轴反向：最后一个 DOM 元素显示在最上 */
    /* column-reverse 把主轴起点从「上」改成「下」：
       第一个 DOM 子元素排在最下面，最后一个排在最上面。
       好处是后端接口按时间正序返回即可，不用在 JS 里反转数组。
       代价同样是「视觉顺序 ≠ DOM 顺序」，键盘 Tab 和朗读顺序仍按 HTML。 */
    gap: 8px;
    max-width: 320px;
  }
  .event {
    padding: 12px 14px;
    background: #eef6f1;
    border-left: 3px solid #2f6b4f; /* 只画左边框，做出时间轴的竖线标记感 */
    border-radius: 0 8px 8px 0;
    /* 四个角按「左上 右上 右下 左下」顺时针：左侧两角设 0 保持直角，
       这样左边框看起来是一条笔直的竖线；右侧两角圆润。 */
    font-size: 13px;
  }
  .event__time { font-size: 11px; color: #5c6b62; margin-bottom: 4px; }
  .hint { font-size: 12px; color: #5c6b62; margin-top: 10px; }
</style>

<!-- DOM 按时间正序写，CSS 反转让最新事件在上 -->
<div class="timeline">
  <!-- 这是 HTML 里的第 1 个，但因为 column-reverse，它会显示在最下面 -->
  <div class="event">
    <div class="event__time">09:00</div>
    创建账号
  </div>
  <div class="event">
    <div class="event__time">09:15</div>
    完成首次登录
  </div>
  <!-- 这是 HTML 里的最后一个，反而显示在最上面 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .panel {
    display: flex;
    flex-direction: column;
    align-items: stretch;           /* 默认值：子项在水平方向拉满 */
    /* 竖排时交叉轴是水平方向，stretch 让没有固定宽度的子项被拉伸到容器同宽。
       这正是「全宽按钮」能自动等宽的原因——完全不用给按钮写 width: 100%。
       如果改成 align-items: flex-start，按钮就会缩回文字宽度、各自长短不一。 */
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
    text-align: center;             /* 按钮被拉宽后，文字仍在中间 */
  }
  /* 主按钮：实心，视觉权重最高 */
  .btn--primary { background: #2f6b4f; color: #fff; border-color: #2f6b4f; }
  /* 幽灵按钮：透明底 + 彩色文字，权重最低，用于次要出口 */
  .btn--ghost { background: transparent; color: #2f6b4f; }
</style>

<div class="panel">
  <p>选择登录方式：</p>
  <!-- 三个按钮宽度完全一致，靠的是父级的 align-items: stretch -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* 主轴（垂直）首尾贴边，中间均分空隙 */
    /* 主轴已经改成竖向，所以 space-between 分配的是「上下」空间：
       第一项贴顶、最后一项贴底、中间那项被剩余空间推到中央。 */
    height: 200px;                    /* 必须有明确高度才看得出效果 */
    /* 关键前提：没有多余高度就没有可分配的空隙，
       不写 height 的话容器只有内容那么高，三行会紧紧挨在一起。 */
    width: 240px;
    padding: 16px;
    background: #fff;
    border: 1px solid #9bb5a6;
    border-radius: 12px;
  }
  .card__top { font-size: 12px; color: #5c6b62; }
  /* 中间的数字放大加粗，是整张卡片的视觉焦点 */
  .card__mid { font-size: 32px; font-weight: 700; color: #2f6b4f; }
  .card__bottom {
    font-size: 12px;
    color: #2f6b4f;
    cursor: pointer;                /* 手型指针暗示这行可以点击进入详情 */
  }
</style>

<!-- 数据卡片：标题贴顶、数字居中、入口贴底 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; color: #1f2a24; }

  /* 顶部说明文字 */
  .intro {
    margin: 0 0 14px;               /* 三值简写：上 0、左右 0、下 14px */
    font-size: 12px;
    color: #5c6b62;
    line-height: 1.65;              /* 行高倍数，说明文字行距大一点更易读 */
  }
  /* 后代选择器：只给说明段落里的 <code> 加浅底色，做成「行内代码块」的样式 */
  .intro code {
    padding: 1px 4px;
    background: #eef6f1;
    border-radius: 4px;
    font-size: 11px;
  }
  /* 左右并排两个案例的外层容器 */
  .compare {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;                /* 窄屏时两栏折行，不至于挤变形 */
    align-items: flex-start;        /* 交叉轴靠顶对齐：两栏内容高度不同也从同一水平线开始，
                                       若用默认 stretch，矮的那栏会被拉伸 */
  }
  .col { width: 200px; }
  .col h4 { margin: 0 0 8px; font-size: 13px; }
  /* 选择器 .col.bad 中间没有空格，表示「同时拥有这两个类名的同一个元素」，
     不要和有空格的后代选择器（.col .bad）混淆 */
  .col.bad h4 { color: #c53030; }   /* 错误示范用红色标题 */
  .col.good h4 { color: #2f6b4f; }  /* 正确示范用绿色标题 */

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
    height: 180px;      /* 固定壳高：这是「限制内部高度」的唯一来源 */
    border: 2px solid #c53030;
    border-radius: 10px;
    background: #fff;
    overflow: hidden; /* 统一裁切，对比「能不能在框内滚」 */
    /* hidden 表示溢出内容直接裁掉、也不给滚动条。
       两栏都裁切，差异就只剩「内层能不能自己滚动」这一点。 */
  }
  /* .shell.good 同一元素同时有这两个类时才生效，用来把边框改成绿色 */
  .shell.good { border-color: #2f6b4f; }

  .head {
    flex-shrink: 0;     /* 标题栏高度锁死，不参与压缩 */
    padding: 8px 10px;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    background: #c53030;
  }
  /* 三段式选择器：「同时有 shell 和 good 的元素」内部的 .head */
  .shell.good .head { background: #2f6b4f; }

  .mid {
    flex: 1;              /* 想占满「头以下」剩余空间 */
    /* ❌ 左边：不写 min-height:0
         默认 min-height:auto → 高度至少等于内容
         → .mid 被内容撑高 → 相对 .shell 溢出被裁掉
         → 内层 .scroll 的 height:100% 也跟着变高，框内滚不动 */
    /* 补充说明：min-height 是「最小高度」下限。规范给 flex 子项的默认值是 auto，
       含义是「至少要能装下我的内容」——这个下限比 flex:1 的计算结果优先，
       于是 flex:1 想把它压回剩余高度也压不动。 */
  }
  .shell.good .mid {
    min-height: 0;        /* ✓ 右边：允许比内容更矮，才能把高度锁在壳里 */
    /* 把下限改成 0，等于告诉浏览器「我可以比内容更矮，多出来的交给子级去滚」，
       flex:1 的计算结果才能真正生效。
       口诀：Flex 里做嵌套滚动时，滚动层的每一级祖先都要 min-height: 0（横向则是 min-width: 0）。 */
  }

  .scroll {
    height: 100%;         /* 相对 .mid；.mid 被撑高时它也跟着高 */
    /* 百分比高度总是相对「父元素的高度」计算，所以父级 .mid 有多高，它就有多高。
       这也是为什么陷阱会传导下来：父级失控，子级的 100% 也就失去了限制作用。 */
    overflow-y: auto;     /* 内容超出自身高度时才出现纵向滚动条 */
    padding: 8px 10px;
    background: #f7faf8;
    font-size: 12px;
  }
  /* 后代选择器：滚动区里的每个段落做成一张小条目卡片 */
  .scroll p {
    margin: 0 0 8px;
    padding: 8px 10px;
    background: #fff;
    border: 1px solid #d9e0d8;
    border-radius: 6px;
  }

  /* 框下方的结论文字 */
  .note {
    margin-top: 10px;
    font-size: 11px;
    line-height: 1.55;
  }
  .note.bad { color: #c53030; }
  .note.good { color: #2f6b4f; }
  /* 小标记（徽章） */
  .badge {
    display: inline-block;  /* inline-block：像行内元素一样不独占一行，
                               但又能像块级元素那样让上下 padding 和宽高真实生效 */
    margin-top: 6px;
    padding: 2px 8px;
    border-radius: 999px;   /* 胶囊形 */
    font-size: 11px;
    font-weight: 700;
  }
  .badge.bad { background: #fde8e8; color: #c53030; }   /* 浅红底 + 深红字 */
  .badge.good { background: #e6f4ec; color: #2f6b4f; }  /* 浅绿底 + 深绿字 */
</style>

<!-- 顶部操作说明。
     <strong> 表示「重要内容」，默认加粗，语义比纯样式的 <b> 更强；
     <br /> 是强制换行；<code> 表示一段代码文本，默认用等宽字体。 -->
<p class="intro">
  请试着在<strong>两个红/绿框内部</strong>用滚轮或触控板滑动。<br />
  左边：框内<strong>滚不动</strong>（下面条目被裁掉，看不到）。<br />
  右边：框内<strong>可以滚</strong>，能看到第 8 条。<br />
  唯一区别：右边的中间层多了 <code>min-height: 0</code>。
</p>

<!-- 左右并排两个案例，结构完全一致，只差一个 CSS 声明 -->
<div class="compare">
  <!-- 左栏：.bad 标记这是错误示范 -->
  <div class="col bad">
    <!-- <h4> 四级标题，用于这种小标题层级 -->
    <h4>❌ 中间层没有 min-height:0</h4>
    <!-- 第 1 层 .shell：固定 180px 高的 Flex 列容器 -->
    <div class="shell">
      <div class="head">好友列表</div>
      <!-- 第 2 层 .mid：flex:1 的中间层，是本 Demo 的主角 -->
      <div class="mid">
        <!-- 第 3 层 .scroll：真正写了 overflow 的滚动层 -->
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

  <!-- 右栏：.good 标记这是正确示范；.shell 上多了 good，
       从而命中前面那条 .shell.good .mid { min-height: 0 } -->
  <div class="col good">
    <h4>✓ 中间层写了 min-height:0</h4>
    <div class="shell good">
      <div class="head">好友列表</div>
      <!-- 结构、条目数量都和左边一模一样，唯一差别来自继承下来的 min-height:0 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 第 1 层：整个列表，竖排每张卡片 */
  .list {
    display: flex;
    flex-direction: column;
    gap: 10px;                /* 卡片之间 10px */
    max-width: 360px;
  }
  /* 每个卡片：外层 column */
  /* 第 2 层：卡片内部也竖排——上面是头部一行，下面是描述文字 */
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
  /* 第 3 层：这里不写 flex-direction，用默认的 row，于是三块横向排列。
     「外层 column + 内层 row」是搭页面最常用的组合套路。 */
  .item__top {
    display: flex;
    align-items: center;      /* 头像、文字、按钮垂直居中对齐 */
    gap: 12px;
  }
  .avatar {
    width: 40px;
    height: 40px;             /* 宽高相等，配合下面的 50% 圆角变成正圆 */
    border-radius: 50%;
    background: #d9ebe1;
    display: flex;            /* 第 4 层 Flex：只为把里面的 emoji 居中 */
    align-items: center;
    justify-content: center;
    flex-shrink: 0;           /* 禁止压缩，保证头像永远是正圆而不会被挤成椭圆 */
  }
  .item__info { flex: 1; }    /* 中间信息区吃掉剩余宽度，把按钮顶到最右 */
  .item__info h3 { margin: 0; font-size: 14px; }
  .item__info p { margin: 2px 0 0; font-size: 12px; color: #5c6b62; }
  /* 三值 margin：上 2px、左右 0、下 0，只在名字下方留一点点缝 */
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
  /* margin: 0 清掉 <p> 的默认外边距，间距统一交给父级的 gap 管理 */
</style>

<div class="list">
  <!-- 每条动态用 <article>，语义上是一条可独立阅读的内容 -->
  <article class="item">
    <!-- 头部一行：横向布局 -->
    <div class="item__top">
      <div class="avatar">🧑</div>
      <div class="item__info">
        <h3>张三</h3>
        <p>2 小时前</p>
      </div>
      <button class="item__action">关注</button>
    </div>
    <!-- 卡片第二块：描述文字，因为父级是 column 所以自动换到下一行 -->
    <p class="item__desc">嵌套 Flex：column 管整体，row 管头部一行。</p>
  </article>
  <!-- 第二条动态，结构完全复用同一套 class -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 外层：联系人列表，竖排每一行 */
  .contacts {
    display: flex;
    flex-direction: column;
    gap: 4px;                       /* 行间距很小，列表才紧凑 */
    max-width: 320px;
    padding: 8px;
    background: #fff;
    border: 1px solid #9bb5a6;
    border-radius: 12px;
  }
  /* 每一行联系人：row 布局 */
  /* 不写 flex-direction，用默认 row：头像、文字、状态点横向排列 */
  .contact {
    display: flex;
    align-items: center;            /* 三块内容垂直居中，视觉上一条线 */
    gap: 12px;
    padding: 10px 8px;
    border-radius: 8px;
    cursor: pointer;
  }
  /* :hover 伪类：鼠标悬停在这一行时才应用。
     换个浅底色，给用户「这一行可以点」的即时反馈。 */
  .contact:hover { background: #f7faf8; }
  .contact__avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;             /* 正方形 + 50% 圆角 = 正圆头像 */
    background: #2f6b4f;
    color: #fff;
    display: flex;                  /* 嵌套 Flex，把里面的汉字居中 */
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    flex-shrink: 0;                 /* 名字很长时也不许把头像压扁 */
  }
  .contact__text {
    display: flex;
    flex-direction: column;         /* 名字 + 副标题竖排 */
    gap: 2px;
    flex: 1;                        /* 吃掉中间剩余宽度 */
    min-width: 0;                   /* 配合 text-overflow 截断长文本 */
    /* 这是很常被忽略的一行：flex 子项的最小宽度默认是 auto，
       也就是「至少要能放下最长的那段文字」，于是它宁可把整行撑破也不肯变窄，
       省略号自然永远不出现。改成 0 后它才允许被压窄，截断逻辑才会启动。 */
  }
  .contact__name { font-weight: 600; font-size: 14px; }
  .contact__status {
    font-size: 12px;
    color: #5c6b62;
    /* 下面三行是「单行文字省略号」的固定三件套，必须同时写齐： */
    white-space: nowrap;            /* 1. 不允许自动折行，强制挤在一行 */
    overflow: hidden;               /* 2. 超出部分裁掉，不然会溢出到外面 */
    text-overflow: ellipsis;        /* 3. 在被裁掉的位置显示省略号 … */
  }
  .contact__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;             /* 小圆点，表示在线状态 */
    background: #6fcf97;            /* 亮绿 = 在线 */
    flex-shrink: 0;                 /* 不许被压缩，否则小圆点会变形消失 */
  }
</style>

<div class="contacts">
  <div class="contact">
    <div class="contact__avatar">王</div>
    <div class="contact__text">
      <span class="contact__name">王五</span>
      <span class="contact__status">在线 · 正在写代码</span>
    </div>
    <!-- 空的 <span>：不放任何文字，纯粹靠 CSS 的宽高和背景色画出一个状态圆点。
         只有「在线」的联系人才写这个元素，所以下面两行没有它。 -->
    <span class="contact__dot"></span>
  </div>
  <!-- 这一行的状态文字较长，缩窄预览宽度就能看到末尾出现省略号 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 外层：所有步骤竖向排列 */
  .steps {
    display: flex;
    flex-direction: column;
    gap: 0;                   /* 故意设 0：步骤之间的间距要靠竖线连起来，
                                 有 gap 反而会把连接线切断 */
    max-width: 300px;
    padding: 8px 0;           /* 两值简写：上下 8px、左右 0 */
  }
  /* 每一步：横向两栏（左边指示器 + 右边文字） */
  .step {
    display: flex;
    gap: 14px;
    position: relative;       /* relative 让元素保持在原位，但成为内部绝对定位子元素的
                                 「定位参照物」。这里作为预留的定位上下文。 */
  }
  /* 左侧圆点 + 竖线 */
  .step__track {
    display: flex;
    flex-direction: column;   /* 圆点在上、竖线在下 */
    align-items: center;      /* 让圆点和竖线在水平方向对齐到同一中轴 */
    flex-shrink: 0;           /* 指示器列不许被文字挤压 */
  }
  .step__dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;       /* 正圆 */
    background: #9bb5a6;      /* 灰绿 = 未开始 */
    border: 2px solid #fff;   /* 白边把圆点和外圈隔开一圈 */
    box-shadow: 0 0 0 2px #9bb5a6;
    /* 偏移和模糊都是 0、只给 2px 扩散半径，此时 box-shadow 相当于「第二层边框」。
       这是画双层圆环的常用技巧（border 只能画一层）。 */
  }
  /* 已完成：实心深绿 */
  .step--done .step__dot { background: #2f6b4f; box-shadow: 0 0 0 2px #2f6b4f; }
  /* 进行中：白心 + 绿环，做出「空心高亮」的当前态 */
  .step--active .step__dot { background: #fff; box-shadow: 0 0 0 2px #2f6b4f; }
  .step__line {
    flex: 1;                  /* 竖排时 flex:1 抢的是高度：线会自动拉长到填满这一步的高度，
                                 所以文字多少行都能自动连上下一个圆点 */
    width: 2px;               /* 线的粗细 */
    min-height: 32px;         /* 即使文字很短，也至少 32px 长，保证连贯观感 */
    background: #d9e0d8;      /* 用背景色画线，比 border 更好控制长度 */
    margin: 4px 0;            /* 上下各留 4px，不要贴住圆点 */
  }
  /* :last-child 是伪类，命中「在父元素里排最后的那个」。
     整体含义：最后一步内部的连接线要隐藏——它后面已经没有下一步可连了。
     display: none 表示彻底不渲染，既不显示也不占位置。 */
  .step:last-child .step__line { display: none; }
  /* 已完成的那一段线也变绿，形成「进度已走到这里」的视觉 */
  .step--done .step__line { background: #2f6b4f; }
  .step__content { padding-bottom: 20px; }
  /* 用下内边距撑出步骤之间的纵向距离；
     用 padding 而不用 margin，是为了让这段高度仍算在 .step 内部，
     左侧的 flex:1 竖线才能跟着一起延长。 */
  .step__title { font-weight: 600; font-size: 14px; margin-bottom: 2px; }
  .step__desc { font-size: 12px; color: #5c6b62; }
  /* 当前步骤的标题也染成主题绿，强调「你在这一步」 */
  .step--active .step__title { color: #2f6b4f; }
</style>

<div class="steps">
  <!-- 第 1 步：叠加 .step--done，圆点和连接线都是实心绿 -->
  <div class="step step--done">
    <div class="step__track">
      <!-- 两个空 div：纯装饰元素，形状完全由 CSS 画出来 -->
      <div class="step__dot"></div>
      <div class="step__line"></div>
    </div>
    <div class="step__content">
      <div class="step__title">填写信息</div>
      <div class="step__desc">已完成</div>
    </div>
  </div>
  <!-- 第 2 步：叠加 .step--active，白心绿环表示进行中 -->
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
  <!-- 第 3 步：没有修饰类，保持灰色未开始态 -->
  <div class="step">
    <div class="step__track">
      <!-- 这里本来就没写 .step__line；就算写了，也会被 :last-child 规则隐藏 -->
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

  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效——常用来去掉默认外边距、设置全局字体。 */
  body { margin: 16px; font: 14px/1.5 system-ui, sans-serif; }

  /* 最外层：横向两栏（左图 + 右信息），用默认的 row 方向 */
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
    height: 100px;                  /* 固定正方形，商品图区域大小恒定 */
    background: #eef6f1;
    border-radius: 10px;
    display: flex;                  /* 嵌套 Flex，用来把 emoji 图标居中 */
    align-items: center;
    justify-content: center;
    font-size: 36px;
    flex-shrink: 0;                 /* 不许被压缩，图片区不能变形 */
  }
  /* 右侧信息区：改成竖排，把标题、价格、标签、按钮从上到下堆起来 */
  .product__info {
    display: flex;
    flex-direction: column;
    gap: 6px;                       /* 标题、价格、标签之间统一间距 */
    flex: 1;                        /* 吃掉图片之外的全部剩余宽度 */
  }
  .product__title { margin: 0; font-size: 15px; font-weight: 600; }
  /* 价格区：再嵌一层 column，让现价和原价上下排 */
  .product__price {
    display: flex;
    flex-direction: column;
    gap: 2px;                       /* 现价与原价贴得很近，视觉上是一组 */
  }
  /* 现价：放大加粗 + 红色，是整张卡片的视觉焦点 */
  .price-now { font-size: 22px; font-weight: 700; color: #c53030; }
  .price-old {
    font-size: 13px;
    color: #9bb5a6;                 /* 灰绿色，降低视觉权重 */
    text-decoration: line-through;  /* 给文字加中划线（删除线），表示这是被划掉的原价。
                                       同一属性的其他常用值：underline 下划线、none 去掉装饰 */
  }
  /* 标签行：横排 + 允许换行，标签多了自动折到下一行 */
  .product__tags { display: flex; gap: 6px; flex-wrap: wrap; }
  .badge {
    padding: 2px 8px;
    font-size: 11px;
    border-radius: 4px;             /* 小圆角，方形标签（对比前面胶囊形的 999px） */
    background: #fef3f2;            /* 浅红底 + 深红字，用于促销信息 */
    color: #c53030;
  }
  /* 修饰类：换成绿色系，用于「包邮」这类中性/正向信息 */
  .badge--green { background: #eef6f1; color: #2f6b4f; }
  .product__btn {
    margin-top: auto;               /* 把按钮推到底部（在 column 里常用） */
    /* 和前面 margin-left: auto 同理：auto 会抢走主轴上的剩余空间。
       竖排时主轴是垂直方向，所以顶部 auto 把空白全塞到按钮上方 → 按钮贴底。
       好处是不管上面内容多少行，按钮始终对齐在卡片底部。 */
    padding: 8px;
    border: none;
    border-radius: 8px;
    background: #2f6b4f;
    color: #fff;
    font: inherit;
    cursor: pointer;
  }
</style>

<!-- <article> 表示一件可独立展示的商品 -->
<article class="product">
  <!-- 左栏：商品图占位（这里用 emoji 代替真实图片） -->
  <div class="product__img">📚</div>
  <!-- 右栏：信息区，内部竖排四块内容 -->
  <div class="product__info">
    <h3 class="product__title">React 实战教程（电子版）</h3>
    <div class="product__price">
      <span class="price-now">¥49.00</span>
      <span class="price-old">¥99.00</span>
    </div>
    <div class="product__tags">
      <span class="badge">限时 5 折</span>
      <!-- 两个类名叠加：基础徽章样式 + 绿色修饰 -->
      <span class="badge badge--green">包邮</span>
    </div>
    <!-- 这个按钮靠 margin-top: auto 被推到信息区底部 -->
    <button class="product__btn">加入购物车</button>
  </div>
</article>`,
  },
]

export default demos
