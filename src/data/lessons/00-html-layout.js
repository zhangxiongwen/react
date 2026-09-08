/**
 * HTML / CSS 布局章节（小白向，概念先讲透再上代码）
 */
const htmlLayout = {
  id: 'html-layout',
  title: 'HTML 布局（对照 Flutter）',
  summary:
    'display 常用值讲透（含 flex）；盒子模型、选择器；Flex 容器/子项属性；再对照 Flutter 做案例',
  order: 2,
  items: [
    {
      id: 'display-common',
      title: 'display 常用属性（重点）',
      summary:
        '控制元素是什么盒子、内部用什么布局；block/inline/flex/grid/none 一次讲清，并接到你正在学的 Flex',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'display 用来控制两件事：① 元素本身是什么类型的盒子（占不占一整行、能不能设宽高）；② 内部子元素用什么布局规则排（普通流 / flex / grid）。\n\n想内部用 justify-content、align-items 对齐 → 父级必须是 flex 或 inline-flex（后面学 Grid 则用 grid）。',
          },
          {
            type: 'text',
            title: '为什么这一节要单独讲透？',
            body: '小白最常踩的坑：给 span 设 width 没效果；两个 div 想横排却总换行；写了 justify-content 却完全不生效……多半是 display 搞错了。\n\nFlutter 里几乎每个 Widget 都能设宽高；HTML 里「行内元素」默认不能设宽高——这是思维差异。下面按「前端最常用」分层讲，并始终连到你正在学的 Flex。',
          },
          {
            type: 'text',
            title: '1. 老的基础类型：block',
            body: 'display: block —— 块级元素。\n\n默认就是 block 的常见标签：div、p、ul、ol、li、header、footer、section、nav、article、main、h1~h6、form。\n\n特点：① 独占一整行（后面的兄弟被挤到下一行）；② width / height / padding / margin 全部生效；③ width:auto 时往往横向撑满父容器。\n\n什么时候用：页面大结构、段落、上下堆叠的区块。div 默认就是 block，多数时候不用手写 display:block，但你要知道它的行为。',
          },
          {
            type: 'code',
            title: 'block：即使内容很少，也各占一行',
            language: 'html',
            live: true,
            body: `<style>
  /* .demo-block 是自定义 class 名，用来给多个元素统一加样式 */
  .demo-block {
    display: block; /* 块级：每个元素独占一整行；div/p 默认就是 block，这里写出来是为了强调 */
    background: #d9ebe1; /* 背景色：填充元素内部区域（含 padding），方便看清盒子范围 */
    margin: 8px 0; /* 外边距：上下各 8px，把相邻盒子推开；左右为 0 不额外占宽 */
    padding: 8px; /* 内边距：文字与边框/背景边缘之间留白 8px，让内容不贴边 */
  }
</style>

<!-- div：通用块级容器，常用来包一块独立区域 -->
<div class="demo-block">我是 div（块级）</div>
<!-- 第二个 div 即使文字很短，block 也会让它换到下一行 -->
<div class="demo-block">我也是 div，即使文字短，也换行</div>
<!-- p：段落标签，语义上表示一段文字，默认也是 block -->
<p class="demo-block">我是 p 段落，同样是块级</p>`,
          },
          {
            type: 'text',
            title: '1. 老的基础类型：inline',
            body: 'display: inline —— 行内元素。\n\n默认常见：span、a、strong、em、label。\n\n特点：① 不会独占一行，多个可以排在同一行；② 设置 width / height 通常无效，只能靠内容撑开；③ 左右 margin/padding 往往有效，上下 margin 基本“推不动布局”（初学记住：别指望 margin-top 把 span 往下推很多）。\n\n什么时候用：嵌在句子里的强调、链接、小标记。不要用 inline 去做卡片、按钮尺寸控制。',
          },
          {
            type: 'code',
            title: 'inline：并排显示，设宽高无效',
            language: 'html',
            live: true,
            body: `<style>
  .demo-inline {
    display: inline; /* 行内：像文字一样排在同一行，不会独占一行 */
    background: #f3e6d4; /* 背景色仍生效，方便看出 span 的范围 */
    /* ❌ 下面三项对纯 inline 基本无效——这是和 block 最大的区别 */
    width: 200px; /* 行内元素设宽度通常被忽略，盒子仍由内容撑开 */
    height: 80px; /* 行内元素设高度通常也无效 */
    margin: 20px; /* 上下 margin 几乎推不动布局；左右 margin 可能有一点效果 */
    padding: 10px; /* 左右 padding 有效；上下 padding 会画出来但不太改变行高布局 */
  }
</style>

<!-- p 是块级段落；里面的 span/a 是行内，嵌在句子中间 -->
<p>
  前文
  <!-- span：无语义的行内标签，常用来给文字的一小段加样式 -->
  <span class="demo-inline">span 一</span>
  <span class="demo-inline">span 二</span>
  <!-- a：超链接，默认也是 inline，href 是跳转地址 -->
  <a class="demo-inline" href="#">链接</a>
  后文
</p>`,
          },
          {
            type: 'text',
            title: '1. 老的基础类型：inline-block',
            body: 'display: inline-block —— 行内块。\n\n特点：① 可以和其他元素排在同一行；② 同时支持设置 width、height、垂直方向的 margin/padding。\n\n适合：按钮并排、标签 chips、导航项。单行文字大致居中可以用 line-height ≈ height，但没有 justify-content / align-items——那是 Flex 的能力。\n\n注意：HTML 源码里标签之间的空格/换行，可能造成约 4px 空隙；现代项目更推荐父级用 flex + gap，少踩这个坑。',
          },
          {
            type: 'code',
            title: 'inline-block：同行 + 可设宽高（但没有 flex 对齐）',
            language: 'html',
            live: true,
            body: `<style>
  .chip {
    display: inline-block; /* 行内块：既能并排，又能设宽高（比 inline 灵活） */
    width: 100px; /* 固定宽度 100px——inline-block 下 width 有效 */
    height: 36px; /* 固定高度 36px——inline-block 下 height 有效 */
    line-height: 36px; /* 行高等于高度：单行文字在盒子里垂直大致居中（老办法，没有 flex 时用） */
    text-align: center; /* 文字水平居中 */
    margin: 6px; /* 标签之间的外边距，四边各 6px */
    border-radius: 8px; /* 圆角 8px，让标签看起来像「胶囊/chip」 */
    background: #eef6f1; /* 浅绿背景，区分每个标签 */
  }
</style>

<!-- 三个 span 默认是 inline，这里用 inline-block 改成可设宽高的并排标签 -->
<span class="chip">标签A</span>
<span class="chip">标签B</span>
<span class="chip">标签C</span>

<!-- 提示：若要让整组标签两端对齐、垂直居中，应改用父级 display:flex + justify-content / align-items -->`,
          },
          {
            type: 'text',
            title: '2. Flex 系列（你现在重点在用）：flex',
            body: 'display: flex —— 当前元素变成「flex 块容器」。\n\n盒子本身：像 block 一样，默认独占一行。\n内部：子元素开启 Flex 布局，可以用 justify-content、align-items、gap、flex-direction 等全套属性。\n\n这是现代前端一维布局（顶栏、侧栏、卡片横排、垂直居中）的主力。后面几节会把每个容器属性、子项属性拆开讲。',
          },
          {
            type: 'text',
            title: '2. Flex 系列：inline-flex',
            body: 'display: inline-flex —— 当前元素变成「flex 行内容器」。\n\n盒子本身：可以和其他元素并排在同一行（像 inline-block 的外层行为）。\n内部：同样开启 Flex，支持 flex 全套属性。\n\n✅ 关键结论：flex 和 inline-flex，内部布局逻辑完全一样；差别只是「这个 flex 盒子在外层怎么摆」——独占一行，还是可以跟邻居并排。',
          },
          {
            type: 'code',
            title: '对照：flex vs inline-flex（看外层占位）',
            language: 'html',
            live: true,
            body: `<style>
  /* 说明文字样式：小字号、灰色，上下留白与 demo 区分 */
  .label { font-size: 12px; color: #5c6b62; margin: 12px 0 4px; }
  /* .box 是 flex 容器的公共样式（内部子项怎么排） */
  .box {
    justify-content: center; /* 主轴方向（默认水平）上，子项整体居中 */
    align-items: center; /* 交叉轴方向（默认垂直）上，子项垂直居中 */
    gap: 8px; /* 子项之间的固定间距 8px，比 margin 更干净 */
    height: 48px; /* 给容器固定高度，align-items 才有「上下对齐」的参照 */
    padding: 0 12px; /* 左右内边距 12px，上下为 0 */
    background: #d9ebe1; /* 容器背景色，方便看清 flex 盒子占多大 */
    border: 1px solid #2f6b4f; /* 1px 实线边框，描出容器边界 */
  }
  .as-flex { display: flex; } /* flex：容器本身像 block，独占一整行 */
  .as-inline-flex { display: inline-flex; } /* inline-flex：容器本身可与其他元素并排 */
  /* 子项样式：每个 span 是一个 flex item */
  .item {
    padding: 4px 10px; /* 子项内边距，让文字不贴边 */
    background: #fff; /* 白色背景，和容器底色对比 */
    border-radius: 6px; /* 圆角 */
  }
</style>

<!-- 第一组：display:flex —— 注意两个 .box 各占一行，上下堆叠 -->
<div class="label">display:flex —— 盒子本身独占一行</div>
<div class="box as-flex">
  <span class="item">A</span>
  <span class="item">B</span>
</div>
<div class="box as-flex">
  <span class="item">C</span>
  <span class="item">D</span>
</div>

<!-- 第二组：display:inline-flex —— 两个 .box 可以排在同一行 -->
<div class="label">display:inline-flex —— 两个盒子可以并排</div>
<div class="box as-inline-flex">
  <span class="item">A</span>
  <span class="item">B</span>
</div>
<div class="box as-inline-flex">
  <span class="item">C</span>
  <span class="item">D</span>
</div>`,
          },
          {
            type: 'list',
            title: '和 Flex 学习的衔接（先记住）',
            ordered: true,
            items: [
              '要对齐、分布子元素 → 先给「父元素」写 display:flex 或 inline-flex',
              'justify-content / align-items 写在父级，不是写在子级（子级用 align-self 才是例外）',
              'flex 与 inline-flex 选哪个：看这个容器要不要独占一行；内部能力一样',
              '后面章节会细讲：主轴/交叉轴、容器属性、子项 flex:1',
            ],
          },
          {
            type: 'text',
            title: '3. Grid 网格布局（后面学，先认识）',
            body: 'display: grid —— 网格块容器（独占一行）。\ndisplay: inline-grid —— 网格行内容器（可并排）。\n\nGrid 是二维布局：行 + 列同时控制，特别适合商品卡片网格、后台仪表盘分区。\n\n和 Flex 怎么选（直觉）：一维排列（一行或一列为主）→ Flex；明确的二维格子 → Grid。本教程先把 Flex 学透，Grid 遇到卡片墙再专攻。',
          },
          {
            type: 'code',
            title: 'Grid 直觉小 Demo（了解即可）',
            language: 'html',
            live: true,
            body: `<style>
  .grid {
    display: grid; /* 开启 Grid 网格布局：同时管「行」和「列」（二维） */
    grid-template-columns: 1fr 1fr 1fr; /* 三列，每列 1fr 表示等分剩余宽度（像三份一样宽） */
    gap: 10px; /* 格子之间的行距、列距都是 10px */
  }
  /* > 表示只选 .grid 的直接子 div，不选更深层嵌套的 div */
  .grid > div {
    padding: 16px; /* 卡片内边距 */
    text-align: center; /* 文字居中 */
    background: #eef6f1; /* 卡片背景色 */
    border-radius: 8px; /* 圆角，让卡片更好看 */
  }
</style>

<!-- .grid 是网格容器；里面每个 div 会自动放进格子里，多了就换行 -->
<div class="grid">
  <div>卡片1</div>
  <div>卡片2</div>
  <div>卡片3</div>
  <div>卡片4</div>
  <div>卡片5</div>
  <div>卡片6</div>
</div>`,
          },
          {
            type: 'text',
            title: '4. 特殊常用：none 与 visibility',
            body: 'display: none —— 元素直接消失，不占页面空间（布局上像没这个元素）。常见：隐藏菜单、条件不满足时不渲染占位。\n\n务必和 visibility: hidden 区分：visibility 只是看不见，位置还保留（留白还在）。\n\ndisplay: table / table-cell —— 老式表格布局模拟，现在基本不用，用 Flex/Grid 替代。知道名字即可。',
          },
          {
            type: 'code',
            title: 'none vs visibility:hidden',
            language: 'html',
            live: true,
            body: `<style>
  /* 每一行 demo 的外层容器，浅灰背景方便区分两行对比 */
  .row { margin: 10px 0; padding: 8px; background: #f7faf8; }
  /* 小方块：用 inline-block 方便横排并设固定宽高 */
  .box {
    display: inline-block; /* 行内块：A/B/C 可以排在同一行 */
    width: 64px; height: 36px; line-height: 36px; /* 固定尺寸 + 行高居中文字 */
    text-align: center; margin-right: 8px; /* 水平居中；右边距与下一个方块隔开 */
    background: #d9ebe1; border-radius: 6px; /* 背景色 + 圆角 */
  }
  .gone { display: none; } /* 完全从布局中移除：不占空间、不可见、不可交互 */
  .invisible { visibility: hidden; } /* 只隐藏视觉：仍占位，像透明块一样 */
</style>

<!-- 第一行：中间 B 用 display:none -->
<div class="row">
  中间用 display:none：
  <span class="box">A</span>
  <span class="box gone">B</span>
  <span class="box">C</span>
  <!-- 效果：B 像不存在，A 和 C 紧挨在一起 -->
</div>

<!-- 第二行：中间 B 用 visibility:hidden -->
<div class="row">
  中间用 visibility:hidden：
  <span class="box">A</span>
  <span class="box invisible">B</span>
  <span class="box">C</span>
  <!-- 效果：B 看不见，但原来那块位置还空着，C 不会左移过来 -->
</div>`,
          },
          {
            type: 'text',
            title: '5. 新的值（简单了解）',
            body: 'display: contents —— 元素自己的盒子“消失”，子元素提升到上一层参与布局。极少场景使用（无障碍、特殊组件封装时可能见到）。初学遇到先查文档，不要当常规布局手段。',
          },
          {
            type: 'table',
            title: '核心对比表（建议收藏）',
            intro: '对照「是否独占一行 / 能否设宽高 / 是否支持 flex 那套对齐」。',
            headers: [
              'display',
              '是否独占一行',
              '能否设置宽高',
              '是否支持 justify-content / align-items',
            ],
            rows: [
              ['block', '✅ 独占一行', '✅ 有效', '❌ 不支持'],
              ['inline', '❌ 同行排列', '❌ 无效', '❌ 不支持'],
              ['inline-block', '❌ 同行排列', '✅ 有效', '❌ 不支持'],
              ['flex', '✅ 独占一行', '✅ 有效', '✅ 支持 flex 全套'],
              ['inline-flex', '❌ 同行排列', '✅ 有效', '✅ 支持 flex 全套'],
              ['grid', '✅ 独占一行', '✅ 有效', '✅ 用的是 grid 属性'],
              ['inline-grid', '❌ 同行排列', '✅ 有效', '✅ 用的是 grid 属性'],
              ['none', '元素消失、不占位', '-', '-'],
            ],
            note: 'flex 与 inline-flex：内部能力一样，只是外层盒子是否独占一行。',
          },
          {
            type: 'code',
            title: '用 display 改默认类型（很常见）',
            language: 'html',
            live: true,
            body: `<style>
  /* 把默认 block 的 div 改成 inline-block：两个 div 可以并排 */
  .as-inline-block {
    display: inline-block; /* 覆盖 div 默认的 block，变成行内块 */
    width: 120px; /* inline-block 下可以设宽度 */
    padding: 8px; /* 内边距让文字不贴边 */
    background: #d9ebe1;
  }
  /* 把默认 inline 的 span 改成 block：每个 span 独占一行 */
  .as-block {
    display: block; /* 覆盖 span 默认的 inline，变成块级 */
    margin: 8px 0; /* 上下外边距，块与块之间拉开距离 */
    background: #f3e6d4;
  }
</style>

<!-- div 默认 block，这里改成 inline-block 后 div1、div2 并排 -->
<div class="as-inline-block">div1</div>
<div class="as-inline-block">div2</div>

<!-- span 默认 inline，这里改成 block 后每个 span 各占一行 -->
<span class="as-block">span 变成块级了</span>
<span class="as-block">我也独占一行</span>`,
          },
          {
            type: 'list',
            title: '怎么选 display？（决策顺序）',
            ordered: true,
            items: [
              '要隐藏且不占位 → none；只是隐形还占位 → visibility:hidden',
              '内部需要两端对齐 / 垂直居中 / 比例分配 → flex 或 inline-flex',
              '明确的行列网格（商品墙）→ grid（后面学）',
              '只要并排且设宽高、不要复杂对齐 → inline-block（或直接上 flex 更省事）',
              '嵌在文字里的小片段 → 保持 inline（span/a）',
              '大结构上下堆 → 默认 block（div/section）即可',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '想内部用 flex 对齐 → 必须 flex / inline-flex。div 默认 block，span 默认 inline。inline 不能设宽高；inline-block 可以设宽高，但没有 flex 对齐能力。flex 和 inline-flex 内部一样，差在外层占不占一整行。',
          },
        ],
      },
    },
    {
      id: 'box-model-sizing',
      title: '盒子模型、单位与 margin/padding（必须搞懂）',
      summary:
        'content/padding/border/margin；px 与 %；只有 0 能省略单位；margin/padding 简写与 box-sizing',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '每个可见元素都是一个「盒子」。从里到外四层：content → padding → border → margin。写距离时 CSS 必须带单位（`10px`/`50%`，只有 `0` 可省略）；box-sizing 决定 width/height 量的是内容区还是含 padding+border 的总盒子。',
          },
          {
            type: 'text',
            title: '1. 是什么：CSS 盒子模型',
            body: '浏览器渲染任何元素时，都会把它当成一个矩形盒子来排版。这个盒子由四层同心区域组成：最里面是 content（内容区，放文字/图片）；往外是 padding（内边距，内容与边框之间的留白）；再往外是 border（边框线）；最外面是 margin（外边距，盒子与盒子之间的空隙）。\n\n你在 DevTools 里选中元素，切到 Computed 或 Layout，能看到这四层的可视化示意图——初学布局时强烈建议经常打开看一眼。',
          },
          {
            type: 'text',
            title: '1. 特点：四层各自的行为',
            body: 'content：真正承载内容的区域；width/height 默认主要作用在这一层（取决于 box-sizing）。\n\npadding：向内扩，背景色/背景图会铺到 padding 区域；不会把相邻元素「推开」到 margin 那么远，但会增大盒子总尺寸（content-box 模式下）。\n\nborder：画在 padding 外面；有宽度，会参与占位（content-box 下算进总宽）。\n\nmargin：透明、不涂背景；负责盒子与盒子之间的间距；垂直方向可能发生 margin 合并（后面讲）。\n\nFlutter 对照：Padding widget ≈ padding；Container(margin: ...) ≈ margin；Container(decoration: BoxDecoration(border: ...)) ≈ border；SizedBox 设宽高 ≈ 直接控制 content 区尺寸。',
          },
          {
            type: 'text',
            title: '1. 为什么：不学盒子模型，Flex 也会算错',
            body: 'Flex 管的是「子项怎么排列」，但每个子项占多大空间，仍然由盒子模型决定。两列各写 width:50% 却换行了？多半是 content-box + padding 把总宽撑破 100%。设了 height:100% 却撑出滚动条？可能是 margin/padding/border 叠加上去超出父级。\n\n所以 box-sizing 和 margin/padding 简写，是 Flex 之前的地基——地基不稳，后面 justify-content 调再漂亮也会「尺寸不对劲」。',
          },
          {
            type: 'code',
            title: 'Demo：看清四层（建议打开审查元素对照）',
            language: 'html',
            live: true,
            body: `<style>
  .box {
    width: 200px; /* 内容区宽度 200px（具体量哪一层取决于 box-sizing，默认是 content-box） */
    padding: 20px; /* 内边距：文字与边框之间留白；背景色会铺到 padding 区域 */
    border: 5px solid #2f6b4f; /* 边框：5px 实线，有宽度会占布局空间 */
    margin: 30px; /* 外边距：透明，把本盒子与周围元素推开 */
    background: #eef6f1; /* 背景只覆盖 content + padding，不覆盖 margin */
  }
</style>

<!-- 一个 div 演示盒子模型四层：content → padding → border → margin -->
<div class="box">内容 content</div>

<!-- 建议：Chrome 审查元素 → Computed → 盒模型图，对照四层数字 -->
`,
          },
          {
            type: 'text',
            title: '2. box-sizing: content-box（浏览器默认值）',
            body: '是什么：width 和 height 只作用于 content 区域，padding 和 border 会「加在外面」。\n\n特点：你写 width:200px，实际占位宽度 ≈ 200 + padding-left + padding-right + border-left + border-right。padding 或 border 越大，盒子在页面上占的位置越大。\n\n为什么默认是它：CSS 早期规范如此，历史原因；但对现代布局不友好。\n\n易错：「我明明两个 div 各 50%，怎么换行了？」——因为每个还加了 padding/border，总宽超过 100%。',
          },
          {
            type: 'text',
            title: '2. box-sizing: border-box（项目强烈推荐）',
            body: '是什么：width 和 height 指的是「从 border 外缘量到另一边 border 外缘」的总尺寸（content + padding + border 包在里面）。\n\n特点：写 width:200px，无论 padding 设 10 还是 30，盒子在布局里占的横向空间始终是 200px；padding 变大，content 区会自动变小。\n\n为什么推荐：心算简单；百分比布局、Flex 均分、Grid 分栏都不容易被 padding「撑破」。几乎所有现代项目全局写 * { box-sizing: border-box; }。\n\n怎么用：在全局 reset 或 :root 里设一次即可；个别需要「内容区固定 200、padding 额外加宽」的罕见场景再单独改回 content-box。',
          },
          {
            type: 'table',
            title: 'content-box vs border-box 对比',
            intro: '同样写 width:200px; padding:20px; border:5px solid，占位差多少？',
            headers: ['box-sizing', 'width 量的是', '实际占位宽度（约）', 'padding 变大时'],
            rows: [
              ['content-box（默认）', '仅 content 区', '200 + 40 + 10 = 250px', '总占位变宽，content 不变'],
              ['border-box（推荐）', 'content+padding+border 总和', '就是 200px', '总占位不变，content 变窄'],
            ],
            note: 'margin 永远不算进 width/height，两种模式都一样。',
          },
          {
            type: 'code',
            title: 'Demo：同样 width:200 + padding，视觉宽度差一截',
            language: 'html',
            live: true,
            body: `<style>
  /* 父级用 flex 横排，方便并排对比两个盒子 */
  .row { display: flex; gap: 16px; align-items: flex-start; }

  /* A：content-box（浏览器默认）—— width 只量 content，padding/border 会加在外面 */
  .a {
    box-sizing: content-box; /* 默认模式：width 不含 padding 和 border */
    width: 200px; /* 仅 content 区 200px */
    padding: 20px; /* 左右各 +20，总宽还要再加 border */
    border: 5px solid #c53030; /* 红色边框，方便和 B 对比 */
    background: #fde8e8; /* 浅红背景 */
  }
  /* B：border-box（推荐）—— width 含 content+padding+border，总占位就是 200px */
  .b {
    box-sizing: border-box; /* 推荐：width 把 padding+border 包在里面 */
    width: 200px; /* 整个盒子在布局里占的横向宽度就是 200px */
    padding: 20px; /* padding 变大时，content 区会自动变窄，总宽不变 */
    border: 5px solid #2f6b4f;
    background: #eef6f1;
  }
</style>

<!-- 并排对比：同样写 width:200px，A 实际更宽，B 总宽固定 -->
<div class="row">
  <div class="a">content-box<br/>实际更宽（约 250px）</div>
  <div class="b">border-box<br/>总宽就是 200px</div>
</div>`,
          },
          {
            type: 'code',
            title: '怎么用：项目 reset 模板',
            language: 'css',
            body: `/* 几乎所有现代项目的第一段 CSS：统一盒模型，避免 width 被 padding 撑破 */
/* 通配选择器 *：选中页面上所有元素 */
*,
/* ::before / ::after 是伪元素，很多 reset 也会给它们设 box-sizing */
*::before,
*::after {
  box-sizing: border-box; /* 让 width/height 含 padding+border，心算尺寸更简单 */
}

body {
  margin: 0; /* 去掉浏览器给 body 的默认 8px 外边距，避免页面四周莫名留白 */
}`,
          },
          {
            type: 'text',
            title: '3. 长度单位：px、%、只有 0 能省略单位（必背）',
            body: '写 `width`、`height`、`margin`、`padding`、`top`、`left`、`gap`、`border-width` 等「距离 / 尺寸」时，**数值必须带单位**。\n\n**`.css` 文件里（也包括 `<style>` 标签）：**\n- ✅ `top: 10px;`、`margin: 16px;`、`width: 50%;`\n- ❌ `top: 10;`、`margin: 16;` —— **非法或无效**，浏览器可能直接忽略整条声明\n- ✅ **唯一例外：`0` 可以省略单位**——`margin: 0;`、`top: 0;` 都对（0px、0%、0em 意义相同）\n\n**常用单位：**\n- **`px`（像素）**：固定大小，最常用。设计稿几像素就写几 `px`。例：`padding: 12px;`、`top: 10px;`\n- **`%`（百分比）**：相对**父容器**对应方向的尺寸。`width: 50%` = 父级内容宽度的一半；`height: 50%` = 父级高度的一半（父级高度要先有明确值才好用）。注意：`padding-top: 10%`、`margin-top: 10%` 的百分比也是相对**父级宽度**（不是高度），很反直觉。\n\n后面还会见到 `rem`/`em`/`vh` 等，入门先把 `px` 和 `%` 用熟。',
          },
          {
            type: 'table',
            title: '单位速查（CSS 文件）',
            headers: ['写法', '对不对', '说明'],
            rows: [
              ['top: 10px;', '✅', '固定 10 像素'],
              ['top: 10;', '❌', '缺单位，整条常被忽略'],
              ['top: 0;', '✅', '只有 0 可以省略单位'],
              ['top: 0px;', '✅', '和 top:0 等价，多写 px 也行'],
              ['width: 50%;', '✅', '父容器宽度的 50%'],
              ['margin: 16;', '❌', '必须写成 16px 或其它合法单位'],
              ['padding: 8px 16px;', '✅', '简写也要每个数字都带单位（0 除外）'],
            ],
            note: '记住口诀：CSS 里「有数就要有单位」，零例外。',
          },
          {
            type: 'code',
            title: 'Demo：带单位 vs 漏单位（右侧对照）',
            language: 'html',
            live: true,
            body: `<style>
  .row { display: flex; gap: 16px; align-items: flex-start; }
  .card {
    width: 140px;
    background: #eef6f1;
    border: 1px solid #2f6b4f;
  }
  .label { font-size: 12px; color: #5c6b62; margin: 0 0 6px; }

  /* ✅ 正确：距离必须带 px（或 % 等单位） */
  .ok {
    margin-top: 20px;   /* 上外边距 20 像素 */
    padding: 12px;      /* 内边距四边 12px */
    /* top / left 常配合 position 使用，这里用 margin 演示单位规则即可 */
  }

  /* ❌ 错误示范：漏写 px —— 多数浏览器会忽略这条声明，等于没写 */
  .bad {
    margin-top: 20;     /* 无效！应写成 20px */
    padding: 12;        /* 无效！应写成 12px */
  }

  /* ✅ 0 可以不写单位 */
  .zero {
    margin: 0;          /* 等于 margin: 0px */
    padding: 12px;
  }

  /* ✅ 百分比：相对父容器宽度 */
  .half {
    width: 50%;         /* 父级 .card 宽 140px → 约 70px */
    margin: 0 auto;     /* 左右 auto：块级盒子水平居中的经典写法 */
    padding: 8px;
    background: #d9ebe1;
    box-sizing: border-box;
  }
</style>

<p class="label">左侧 ✅ 带 px；中间 ❌ 漏单位（可能看起来没间距）；右侧 0 与 %</p>
<div class="row">
  <div class="card ok">margin-top:20px<br/>padding:12px</div>
  <div class="card bad">margin-top:20<br/>（缺单位，常无效）</div>
  <div class="card zero">
    margin:0
    <div class="half">width:50%</div>
  </div>
</div>`,
          },
          {
            type: 'text',
            title: '4. margin / padding：是什么、干什么',
            body: '**`padding`（内边距）**：内容与边框之间的留白；背景色会铺进 padding 区域。\n\n**`margin`（外边距）**：盒子与盒子之间的空隙；透明、不涂背景。\n\n可写四边统一简写，也可写单边：`margin-top` / `margin-right` / `margin-bottom` / `margin-left`，padding 同理（`padding-top` 等）。\n\n**负 margin**（如 `margin-left: -8px`）可以让盒子「往回拉」，入门少用，知道有这回事即可。',
          },
          {
            type: 'text',
            title: '4. margin / padding 简写：1～4 个值怎么读',
            body: '一条声明可同时设四边。**顺时针**记忆：上 → 右 → 下 → 左（从钟表 12 点开始）。\n\n- **1 个值**：四边相同 → `padding: 16px;`\n- **2 个值**：上下 | 左右 → `margin: 12px 24px;`\n- **3 个值**：上 | 左右 | 下 → `padding: 10px 20px 30px;`\n- **4 个值**：上 | 右 | 下 | 左 → `padding: 10px 20px 10px 20px;`\n\n每个非 0 数字都要带单位：`padding: 10px 0;`（上下 10px，左右 0）合法；`padding: 10 0;` 非法。\n\n需要只改一边时，用 longhand 覆盖：`margin-top: 8px;`。',
          },
          {
            type: 'table',
            title: 'margin / padding 写法全家桶',
            headers: ['写法', '含义', '等价展开（示意）'],
            rows: [
              ['margin: 16px;', '四边都是 16px', 'top/right/bottom/left 全 16px'],
              ['margin: 12px 24px;', '上下 12，左右 24', 'top/bottom=12px；left/right=24px'],
              ['margin: 10px 20px 30px;', '上 10，左右 20，下 30', '三值简写'],
              ['margin: 1px 2px 3px 4px;', '上1 右2 下3 左4', '四值顺时针'],
              ['margin: 0;', '四边清零（可省单位）', '常用于去掉浏览器默认空隙'],
              ['margin: 0 auto;', '上下 0，左右自动', '定宽块级盒子水平居中'],
              ['margin-top: 8px;', '只改上边', '其余边保持原样或继承简写'],
              ['padding: 8px 16px;', '上下 8，左右 16', '按钮、输入框很常见'],
              ['padding: 10%;', '四边都是父宽的 10%', '慎用：竖向 % 也相对父宽'],
            ],
          },
          {
            type: 'code',
            title: 'Demo：margin / padding 各种写法（可改数字看效果）',
            language: 'html',
            live: true,
            body: `<style>
  body { font: 13px/1.5 system-ui, sans-serif; color: #1f2a24; }
  .label { font-size: 12px; color: #5c6b62; margin: 14px 0 6px; }
  .stage {
    background: #f7faf8;
    border: 1px dashed #9bb5a6;
    padding: 8px; /* 舞台自己的内边距，方便看出子盒子的 margin */
  }
  .box {
    background: #d9ebe1;
    border: 2px solid #2f6b4f;
    box-sizing: border-box;
  }

  /* 1 个值：四边相同 */
  .m1 { margin: 16px; padding: 12px; }

  /* 2 个值：上下 | 左右 */
  .m2 { margin: 8px 24px; padding: 8px 16px; }

  /* 4 个值：上 右 下 左（顺时针） */
  .m4 { margin: 4px 12px 20px 32px; padding: 10px; }

  /* 单边 longhand */
  .side {
    margin-top: 20px;      /* 只推上面 */
    margin-left: 40px;     /* 只推左边 */
    padding-right: 24px;   /* 只加右边内空 */
    padding-bottom: 8px;
  }

  /* 水平居中：定宽 + margin: 0 auto */
  .center {
    width: 60%;            /* 相对父容器宽度 */
    margin: 0 auto;        /* 左右 auto → 居中 */
    padding: 10px;
    text-align: center;
  }

  /* 0 省略单位 */
  .flush { margin: 0; padding: 10px; }
</style>

<p class="label">① margin/padding: 单值（四边相同）</p>
<div class="stage"><div class="box m1">margin:16px; padding:12px</div></div>

<p class="label">② 两值：上下 | 左右</p>
<div class="stage"><div class="box m2">margin:8px 24px; padding:8px 16px</div></div>

<p class="label">③ 四值：上 右 下 左</p>
<div class="stage"><div class="box m4">margin:4px 12px 20px 32px</div></div>

<p class="label">④ 单边 + 水平居中 + margin:0</p>
<div class="stage">
  <div class="box side">margin-top/left + padding-right</div>
  <div class="box center">width:60%; margin:0 auto</div>
  <div class="box flush">margin:0（可贴边）</div>
</div>`,
          },
          {
            type: 'tip',
            title: '和 React 行内样式的区别（先记结论）',
            body: '上面规则针对 **`.css` / `<style>`**。在 React 里写 `style={{ marginTop: 10 }}` 时，**数字会自动当成 px**，等于 `marginTop: \'10px\'`。百分比、或要明确单位时仍要写字符串：`style={{ width: \'50%\' }}`。样式章「动态 className + 内联 style」会展开讲。',
          },
          {
            type: 'text',
            title: '5. margin 合并（collapsing）：空隙「算不对」时先查这个',
            body: '是什么：两个块级元素的垂直 margin 相遇时，不会简单相加，而是取较大值（有时只留一个）。\n\n特点：主要发生在「上下方向」相邻的块级盒子之间；水平 margin 不合并。父子之间、兄弟之间都可能发生。\n\n为什么存在：历史排版规则，模拟报纸段落间距；现代布局里常让人困惑。\n\n怎么用 / 怎么避：需要精确间距时，用 padding 代替 margin；或父级改 display:flex + gap（Flex 子项之间不发生传统 margin 合并）；或只设一边的 margin（如只设 margin-bottom）。\n\n易错：两个 div 各设 margin-top:20px，中间空隙是 20 不是 40——初学者最常懵的点之一。',
          },
          {
            type: 'list',
            title: '盒子模型自检清单',
            ordered: true,
            items: [
              '全局是否已设 box-sizing: border-box？',
              'CSS 里的宽度/间距是否都带了 px 或 %？（只有 0 可省略单位）',
              '设 width:50% 两列时，有没有额外 padding/border 撑破一行？',
              '间距用 margin 还是 padding？背景要不要延伸到间距区？',
              '垂直空隙异常时，是否发生了 margin 合并？',
              'DevTools 盒模型图里，四层数字是否和预期一致？',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '盒子四层：content → padding → border → margin。border-box 让 width 含 padding+border。CSS 里距离必须带单位（`10px` / `50%`），只有 `0` 能省略；margin/padding 简写按「上右下左」顺时针读。',
          },
        ],
      },
    },
    {
      id: 'css-selectors',
      title: 'CSS 选择器详解（含优先级实战）',
      summary:
        '标签/class/id、关系与伪类；优先级怎么算、为何改不动；6 个可编辑 Demo 对照',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'CSS 语法 = 选择器 { 属性: 值 }。选择器负责「选中哪些元素」，花括号里负责「改成什么样」。选错人，属性写得再对也不生效——布局课里，你要能准确选中 flex 容器和它的直接子项。',
          },
          {
            type: 'text',
            title: '1. 是什么：选择器在干什么',
            body: '浏览器拿到 CSS 后，会用选择器去 HTML 文档里「匹配」元素，把匹配的元素的对应属性改掉。一条规则可以匹配零个、一个或多个元素。\n\n布局学习里，选择器的典型用途：给顶栏容器加 display:flex；给卡片里的标题加 font-weight；给 :hover 状态的按钮改颜色。不会选，就找不到该写样式的那一层 DOM。',
          },
          {
            type: 'text',
            title: '1. 基础三种：标签 / class / id',
            body: '是什么：\n• 标签选择器 div { } —— 选中页面上所有该标签。\n• class 选择器 .card { } —— 选中 class 含 card 的元素（HTML 里 class="card"）。\n• id 选择器 #app { } —— 选中 id 为 app 的元素（HTML 里 id="app"）。\n\n特点：标签范围最大，容易误伤；class 可复用、最常用；id 理论上一页唯一、优先级高。\n\n为什么 class 是主力：组件化思维——同一个 .btn 样式可以套在很多 button 上；改一处，全局生效。\n\n怎么用：布局结构用标签或语义化标签（header/nav/main）；具体外观几乎都用 class。\n\n易错：id 不要滥用写样式（优先级太高，后面难覆盖）；不要用 div1、red 这种含义不清的 class 名。',
          },
          {
            type: 'code',
            title: 'Demo：基础选择器',
            language: 'html',
            live: true,
            body: `<style>
  /* 标签选择器 p：选中页面上所有 <p> 段落 */
  p { color: #333; } /* 文字颜色深灰 */
  /* class 选择器 .title：选中 class="title" 的元素（最常用，可复用） */
  .title { font-size: 20px; font-weight: 600; } /* 字号 20px，字重半粗 */
  /* id 选择器 #main：选中 id="main" 的元素（一页建议唯一，优先级高） */
  #main { max-width: 800px; margin: 0 auto; } /* 最大宽 800px，左右 auto 实现水平居中 */
  /* 通配 *：所有元素；reset 里常用来统一 box-sizing */
  * { box-sizing: border-box; }
</style>

<!-- id 在一个页面里应唯一；这里是主内容区容器 -->
<div id="main">
  <!-- 这个 p 同时匹配 p 和 .title 两条规则 -->
  <p class="title">标题（.title + p 都匹配）</p>
  <!-- 只匹配 p { color: #333 } -->
  <p>正文（只匹配 p）</p>
</div>`,
          },
          {
            type: 'text',
            title: '2. 组合关系：后代、子代、兄弟',
            body: '是什么：用空格、>、+、~ 描述元素之间的 DOM 树关系，缩小选中范围。\n\n特点：\n• 后代 A B：A 内部任意层级里的 B（孙子也算）。\n• 子代 A > B：只选 A 的「直接孩子」B。\n• 邻接兄弟 A + B：紧挨在 A 后面的第一个同级 B。\n• 通用兄弟 A ~ B：A 后面所有同级 B。\n\n为什么重要：.card p 会给卡片里所有段落上色；.card > p 只给直接孩子段落加粗——嵌套深时差别巨大。\n\n怎么用：给 flex 容器里的直接子项设 flex:1 → 用 .row > .item；给标题后面第一段取消 margin → 用 h2 + p。\n\n易错：空格 descendant 选得太宽，深层嵌套全被染色；想只选儿子却漏写 >，样式「串」到孙子身上。',
          },
          {
            type: 'code',
            title: 'Demo：关系选择器',
            language: 'html',
            live: true,
            body: `<style>
  /* 后代选择器（空格）：.card 内部任意层级的 p 都会选中，包括嵌套很深的 */
  .card p { color: #5c6b63; } /* 灰色正文 */

  /* 子代选择器（>）：只选 .card 的直接孩子 p，孙子 p 选不中 */
  .card > p { font-weight: 600; color: #1f2a24; } /* 更粗、更深，只作用于直接孩子 */

  /* 邻接兄弟（+）：h2 后面紧挨着的第一个 p（中间不能夹别的同级元素） */
  h2 + p { margin-top: 0; color: #2f6b4f; } /* 去掉顶部 margin，标题下第一段更紧凑 */

  /* 通用兄弟（~）：h2 后面所有同级 p（不要求紧挨着） */
  h2 ~ p { line-height: 1.7; } /* 行高 1.7，多段正文更易读 */
</style>

<!-- section：语义化区块；class="card" 供选择器匹配 -->
<section class="card">
  <h2>标题</h2>
  <!-- 直接孩子 p：.card p 和 .card > p 都能选中 -->
  <p>直接孩子段落（> 能选中，字更粗）</p>
  <div>
    <!-- 孙子 p：只有 .card p 能选中（变灰），> 选不中所以不加粗 -->
    <p>孙子段落（后代能选中变灰，> 选不中所以不加粗）</p>
  </div>
  <!-- 第二个同级 p：~ 也能选中，行高 1.7 -->
  <p>第二个同级 p（~ 也能选中）</p>
</section>`,
          },
          {
            type: 'text',
            title: '3. 并集与交集',
            body: '是什么：\n• 并集（逗号）：h1, h2, .title { } —— 多个选择器共享同一套样式。\n• 交集（连写）：p.lead —— 必须同时满足「是 p 标签」且「有 class=lead」。\n• 多 class：.btn.primary —— 同时有 btn 和 primary 两个 class（HTML 里 class="btn primary"）。\n\n特点：并集减少重复代码；交集精确命中某一类元素。\n\n易错：.a .b 是后代（中间有空格）；.a.b 是交集（同一个元素有两个 class）——少一个点，含义完全不同。',
          },
          {
            type: 'code',
            title: '并集 / 交集示例',
            language: 'css',
            body: `/* 并集选择器（逗号）：多个选择器共享同一套样式，减少重复代码 */
h1, h2, h3 { font-family: Georgia, serif; } /* 所有 h1/h2/h3 标题用衬线字体 */

/* 交集选择器（连写无空格）：必须同时满足——既是 p 标签又有 class="lead" */
p.lead { font-size: 18px; line-height: 1.6; } /* 导语段落：更大字号、更松行高 */

/* 多 class 交集：同一元素同时有 btn 和 primary 两个 class */
.btn.primary { background: #2f6b4f; color: #fff; } /* 实心主按钮：绿底白字 */
.btn.ghost { background: transparent; border: 1px solid #2f6b4f; } /* 幽灵按钮：透明底+描边 */

/* 对应 HTML 写法示例（注释说明，不是可运行标签）：
   <button class="btn primary">确定</button>
   class 属性里用空格分隔多个 class 名 */
`,
          },
          {
            type: 'text',
            title: '4. 属性选择器',
            body: '是什么：按 HTML 属性名/属性值选中元素，如 input[type="text"]、a[href^="https"]。\n\n特点：表单样式、链接区分、无障碍状态（[disabled]、[aria-*]）特别好用。\n\n怎么用：\n• [attr] —— 有该属性即可。\n• [attr="val"] —— 精确等于。\n• [attr^="val"] —— 以 val 开头。\n• [attr$="val"] —— 以 val 结尾。\n• [attr*="val"] —— 包含 val。\n\n易错：属性值区分大小写（HTML 属性名不区分，但某些值如 type 要小写匹配）。',
          },
          {
            type: 'code',
            title: '属性选择器常用写法',
            language: 'css',
            body: `/* 属性选择器：按 HTML 属性名/值来「选人」，表单和链接样式特别常用 */

/* [type="text"]：选中 type 属性恰好等于 text 的 input（文本框） */
input[type="text"] { border: 1px solid #ccc; border-radius: 6px; }
/* 密码框：字母间距加大，输入时圆点更易区分 */
input[type="password"] { letter-spacing: 2px; }
/* [disabled]：只要有 disabled 属性就选中，不管值是什么 */
input[disabled] { opacity: 0.5; cursor: not-allowed; } /* 半透明 + 禁止光标 */
/* [href^="https"]：href 以 https 开头的外链 */
a[href^="https"] { color: #2f6b4f; }
/* [href$=".pdf"]：href 以 .pdf 结尾的链接；::after 在链接文字后面插入内容 */
a[href$=".pdf"]::after { content: " PDF"; }
/* [alt]：有 alt 属性的 img（无障碍相关，有 alt 说明图片有替代文字） */
img[alt] { outline: 1px dashed #ccc; }`,
          },
          {
            type: 'text',
            title: '5. 伪类与伪元素',
            body: '是什么：\n• 伪类（单冒号 :）：根据元素状态或位置选中，如 :hover、:focus、:first-child、:nth-child(odd)。\n• 伪元素（双冒号 ::）：在元素内部「插入」虚拟节点，如 ::before、::after（必须写 content 才可见）。\n\n特点：伪类不改变 DOM 结构；伪元素常做装饰线、图标前缀、清除浮动（老技巧）。\n\n为什么：交互反馈（悬停变色、聚焦描边）和列表斑马纹（nth-child）离不开伪类。\n\n易错：:first-child 要求「它是父元素的第一个孩子且标签匹配」——如果第一个孩子是 div，第二个 p 用 p:first-child 选不中。',
          },
          {
            type: 'code',
            title: 'Demo：伪类与伪元素',
            language: 'html',
            live: true,
            body: `<style>
  /* 伪类 :hover —— 鼠标悬停时的状态（交互反馈） */
  .link:hover { color: #2f6b4f; text-decoration: underline; }
  /* 伪类 :active —— 鼠标按下未松开时的状态 */
  .link:active { opacity: 0.7; }
  /* :first-child —— 作为父元素第一个孩子的 .item（且标签要匹配） */
  .item:first-child { font-weight: 700; }
  /* :nth-child(odd) —— 奇数位置的 .item，做斑马纹背景 */
  .item:nth-child(odd) { background: #f7faf8; }
  /* :focus —— 输入框获得键盘焦点时（Tab 切过来） */
  input:focus {
    outline: 2px solid #2f6b4f; /* 焦点描边，比浏览器默认更好看 */
    outline-offset: 2px; /* 描边与边框之间留 2px 空隙 */
  }
  /* 伪元素 ::before —— 在元素内容前面插入虚拟节点，必须写 content 才显示 */
  .btn::before { content: "→ "; } /* 按钮文字前加箭头 */
</style>

<!-- a：超链接；class="link" 供伪类样式使用 -->
<a class="link" href="#">悬停 / 按下我</a>
<!-- ul/li：无序列表，每个 li 是一个列表项 -->
<ul>
  <li class="item">一</li>
  <li class="item">二</li>
  <li class="item">三</li>
</ul>
<!-- input：单行输入框；placeholder 是占位提示文字 -->
<input type="text" placeholder="聚焦看描边" />
<button class="btn">继续</button>`,
          },
          {
            type: 'tip',
            title: '一句话记住',
            body: '多条 CSS 同时命中同一元素时，不是「后写的一定赢」，而是先比**优先级（特异性）**，优先级相同才看**书写顺序**。粗记：`!important` > 行内 `style` > `#id` > `.class` / 属性 / 伪类 > 标签 > `*`。日常尽量只用 class，少用 id 写样式，几乎不用 `!important`。',
          },
          {
            type: 'text',
            title: '6. 是什么：优先级（特异性 Specificity）',
            body: '当你给同一个元素写了多条会改同一属性的规则，浏览器要决定「听谁的」。这个比较过程叫**特异性计算**。\n\n可以把它想成记分：选择器越「点名到人」，分越高，越高的覆盖越低的。\n\n**记分口诀（四档，从左到右）：**\n1. **行内 style**（写在 HTML 的 `style="..."` 上）—— 极高\n2. **id 选择器**（`#app`）—— 每个 id 记 1 分（这一档）\n3. **class / 属性选择器 / 伪类**（`.btn`、`[type="text"]`、`:hover`）—— 每个记 1 分\n4. **标签 / 伪元素**（`div`、`p`、`::before`）—— 每个记 1 分\n\n比较时从左到右比：先比「有没有行内」；没有再比 id 个数；再比 class 档个数；再比标签档个数。左边已经分出胜负，右边不用再比。\n\n**通配 `*`、组合符（空格、`>`、`+`、`~`）、`:where()` 不计分。**',
          },
          {
            type: 'table',
            title: '常见选择器怎么计分（入门够用）',
            intro: '下面用「(id数, class档数, 标签数)」表示，数字越大越优先。',
            headers: ['选择器', '计分示意', '谁更容易赢'],
            rows: [
              ['*', '(0,0,0)', '几乎总是输'],
              ['div / p', '(0,0,1)', '最低档，易被覆盖'],
              ['.card', '(0,1,0)', '日常主力'],
              ['p.lead / .btn.primary', '(0,1,1) / (0,2,0)', '多 class 更具体'],
              ['.card .title', '(0,2,0)', '两个 class，常盖过单独 .title'],
              ['#header', '(1,0,0)', '轻易盖过所有 class'],
              ['#nav .item', '(1,1,0)', '比单独 .item 高得多'],
              ['style="color:red"', '行内档', '普通选择器很难赢它'],
              ['color: red !important', '另开通道', '能压普通声明，但难维护'],
            ],
            note: '伪类 :hover、:nth-child 和 class 同一档；伪元素 ::before 和标签同一档。',
          },
          {
            type: 'text',
            title: '6. 同优先级怎么办？看源码顺序',
            body: '如果两条规则**特异性完全相同**，则**后写的覆盖先写的**（同一文件里靠后的、或后加载的样式表）。\n\n所以：\n- `.a { color: red }` 写在前面，`.a { color: blue }` 写在后面 → 最终蓝色\n- 但 `.box .a { color: red }`（两个 class）永远压过后面的单独 `.a { color: blue }`——因为左边分数已经更高，顺序救不了低分那条',
          },
          {
            type: 'code',
            title: 'Demo①：标签 < class < id（颜色谁赢）',
            language: 'html',
            live: true,
            body: `<style>
  /* (0,0,1) 标签 —— 最低 */
  p { color: #999; font-size: 16px; }

  /* (0,1,0) class —— 压过标签 */
  .text { color: #2f6b4f; }

  /* (1,0,0) id —— 压过 class */
  #hero { color: #c53030; font-weight: 700; }

  .hint { font-size: 12px; color: #5c6b62; margin: 8px 0; }
</style>

<p class="hint">下面三行都是 p，但命中的选择器不同 → 最终颜色不同</p>

<!-- 只命中 p → 灰色 -->
<p>① 只有标签 p → 灰色（最低）</p>

<!-- 命中 p + .text → class 赢 → 绿色 -->
<p class="text">② class="text" → 绿色（class 盖过标签）</p>

<!-- 命中 p + .text + #hero → id 赢 → 红色 -->
<p id="hero" class="text">③ 同时有 id 和 class → 红色（id 最高）</p>

<p class="hint">试着删掉 #hero 那条规则，或去掉 id="hero"，看颜色怎么变。</p>`,
          },
          {
            type: 'code',
            title: 'Demo②：更具体的 class 组合 vs 单独 class',
            language: 'html',
            live: true,
            body: `<style>
  /* (0,1,0) */
  .title { color: #999; font-size: 18px; }

  /* (0,2,0) —— 两个 class，比上面更具体 */
  .card .title { color: #2f6b4f; }

  /* (0,3,0) —— 三个 class，再压一层 */
  .card.featured .title { color: #c53030; }

  .card {
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #9bb5a6;
    background: #f7faf8;
  }
  .card.featured { border-color: #c53030; background: #fde8e8; }
  .hint { font-size: 12px; color: #5c6b62; }
</style>

<p class="hint">三个 .title 文字一样，但祖先不同 → 命中规则不同</p>

<!-- 只命中 .title → 灰 -->
<p class="title">卡片外的 .title → 灰色</p>

<!-- 命中 .title 和 .card .title → 绿 -->
<div class="card">
  <p class="title">.card 里的 .title → 绿色（.card .title 赢）</p>
</div>

<!-- 命中三条，.card.featured .title 最具体 → 红 -->
<div class="card featured">
  <p class="title">.card.featured 里的 .title → 红色（三个 class 最具体）</p>
</div>`,
          },
          {
            type: 'code',
            title: 'Demo③：同优先级时「后写的赢」',
            language: 'html',
            live: true,
            body: `<style>
  /* 两条都是 (0,1,0)，特异性相同 → 看书写顺序 */
  .box { 
    padding: 12px;
    margin: 8px 0;
    border: 1px solid #9bb5a6;
  }

  .box { background: #fde8e8; color: #c53030; } /* 先写：浅红 */
  .box { background: #eef6f1; color: #2f6b4f; } /* 后写：同优先级，覆盖上面 → 浅绿 */

  .hint { font-size: 12px; color: #5c6b62; }
</style>

<p class="hint">两条都是单独的 .box，分数一样 → 以后面那条为准</p>
<div class="box">最终应是绿底绿字（后写的那条生效）</div>

<p class="hint">把下面注释打开，会再次被「更具体」的规则盖掉——顺序救不了低分。</p>
<style>
  /* 取消下面注释试一下：
  .wrap .box { background: #fff3cd; color: #92400e; }
  */
</style>
<div class="wrap">
  <div class="box">若启用 .wrap .box，会变成黄底（两个 class 更高）</div>
</div>`,
          },
          {
            type: 'code',
            title: 'Demo④：行内 style 压过 class / id',
            language: 'html',
            live: true,
            body: `<style>
  .btn {
    display: inline-block;
    padding: 8px 14px;
    margin: 6px 8px 6px 0;
    border-radius: 8px;
    background: #2f6b4f; /* class 想要的绿色 */
    color: #fff;
    border: none;
    font: inherit;
  }
  #special {
    background: #1d4ed8; /* id 想要的蓝色 —— 比 class 高 */
  }
  .hint { font-size: 12px; color: #5c6b62; margin: 8px 0; }
</style>

<p class="hint">三个按钮都带 .btn；有的还有 id / 行内 style</p>

<button class="btn">① 只有 class → 绿色</button>

<button class="btn" id="special">② 有 id → 蓝色（id > class）</button>

<!-- 行内 style 比 id 还高 -->
<button class="btn" id="special" style="background:#c53030;">
  ③ 行内 style → 红色（行内最高档）
</button>

<p class="hint">React 里 style={{}} 最终也会变成这种行内 style，所以能盖过普通 class——这也是「能 class 就别滥用 style」的原因之一。</p>`,
          },
          {
            type: 'code',
            title: 'Demo⑤：!important 能压过谁？为何少用',
            language: 'html',
            live: true,
            body: `<style>
  .text { color: #2f6b4f; }           /* 普通 class：绿 */
  #title { color: #1d4ed8; }          /* id：蓝，本应压过 class */
  .text-force { color: #c53030 !important; } /* !important：红，能压普通 id/class */

  /* 两个 !important 互相比：仍看特异性，再看顺序 */
  .a { color: orange !important; }
  .wrap .a { color: purple !important; } /* 更具体的 !important 赢 */

  .box { padding: 10px; margin: 8px 0; border: 1px solid #ddd; }
  .hint { font-size: 12px; color: #5c6b62; }
</style>

<p id="title" class="text box">① id + class，无 !important → 蓝色（id 赢）</p>

<p id="title" class="text text-force box">② 加上 .text-force !important → 红色（important 压过 id）</p>

<div class="wrap">
  <p class="a box">③ 两个 !important：.wrap .a 更具体 → 紫色</p>
</div>

<p class="hint">
  !important 像「作弊器」：一时改得动，团队里会演变成互相加 important 的战争。<br/>
  正确做法：提高选择器特异性（加父级 class），或调整结构，而不是堆 !important。
</p>`,
          },
          {
            type: 'code',
            title: 'Demo⑥：实战翻车 —— 为什么改 .item 不生效？',
            language: 'html',
            live: true,
            body: `<style>
  /* 组件库 / 旧代码里常见：带 id 的导航 */
  #nav .item {
    color: #1d4ed8;          /* (1,1,0) 很高 */
    padding: 6px 10px;
    display: inline-block;
  }

  /* 你后来想改成绿色 —— 只写了 .item */
  .item {
    color: #2f6b4f;          /* (0,1,0) 更低 → 赢不了上面 */
  }

  /* ✅ 正确覆盖：至少达到同等或更高特异性 */
  #nav .item.is-active,
  #nav .item:hover {
    color: #2f6b4f;          /* 仍带 #nav，才能盖过 #nav .item */
    font-weight: 700;
  }

  #nav { background: #f4f7f5; padding: 8px; }
  .hint { font-size: 12px; color: #5c6b62; margin-top: 10px; }
</style>

<nav id="nav">
  <a class="item" href="#">首页（仍是蓝：.item 盖不过 #nav .item）</a>
  <a class="item is-active" href="#">当前页（绿：用了 #nav .item.is-active）</a>
  <a class="item" href="#">关于（悬停变绿）</a>
</nav>

<p class="hint">
  打开开发者工具看 Computed：你会发现「想改的 .item { color }」被划掉，<br/>
  生效的是 #nav .item。这就是「怎么改都不生效」的最常见原因。
</p>`,
          },
          {
            type: 'list',
            title: '优先级实战清单（改不动样式时按序查）',
            ordered: true,
            items: [
              'DevTools → Elements → 右侧 Styles：被划掉的规则就是输了的那条',
              '数一数对手选择器有几个 id、几个 class，你的是否更低',
              '同优先级？看你的规则是否写在对方后面（或被更晚加载的 CSS 盖住）',
              '有没有行内 style / !important 挡着',
              '覆盖时优先加父级 class（.Card .title），避免新加 !important',
              '能不用 id 写样式就不用——id 太重，后面难盖',
            ],
          },
          {
            type: 'list',
            title: '布局课必会选择器（先练这些）',
            ordered: true,
            items: [
              'class：.nav、.card、.btn —— 最常用',
              '子代：.nav > a —— 只选顶栏直接链接',
              '后代：.card p —— 卡片内所有段落',
              '伪类：:hover、:focus —— 交互态',
              '伪类：:first-child、:nth-child —— 列表首尾/斑马纹',
              '并集：h1, h2, h3 —— 批量设标题',
              '优先级：改不动时先比特异性，再比书写顺序',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'class 复用样式；`>` 只选儿子，空格选所有后代；`+` 紧挨的下一个兄弟。伪类管状态（`:hover`），伪元素管装饰（`::before`）。优先级：行内 > id > class > 标签；同级比先后；少用 `!important`，多用「更具体的 class 组合」精确命中。',
          },
        ],
      },
    },
    {
      id: 'css-pseudo',
      title: 'CSS 伪类与伪元素详解（重点）',
      summary:
        '状态类 / 位置类 / 表单类伪类逐个讲透；nth-child 公式、:not/:is/:has；::before/::after 与 content；10 个可编辑 Demo',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '**伪类（单冒号 `:`）= 选中「处于某种状态或某个位置」的真实元素**，比如 `:hover`（鼠标悬停）、`:nth-child(2)`（第 2 个孩子）。\n\n**伪元素（双冒号 `::`）= 凭空造一个 HTML 里不存在的虚拟节点**，比如 `::before`、`::after`，必须写 `content` 才会出现。\n\n它们的价值：不写一行 JS、不多写一个标签，就能做出交互反馈和装饰效果。',
          },
          {
            type: 'text',
            title: '1. 是什么：普通选择器不够用的时候',
            body: '普通选择器（`div`、`.card`、`#app`）只能按「标签名 / class / id」来选人——这些信息写死在 HTML 里，页面加载后就不变了。\n\n但真实页面里有大量**动态状态**和**位置关系**：\n• 鼠标正停在这个按钮上（状态）\n• 输入框刚刚被 Tab 键聚焦（状态）\n• 复选框现在是勾选的（状态）\n• 这一行是列表里的第 3 行（位置）\n• 这是列表最后一项，不该再画分割线（位置）\n\n这些「加载后才知道、还会变来变去」的情况，HTML 里没有对应的 class 可以选。伪类就是浏览器替你维护的一批**虚拟 class**：状态一变，样式自动跟着变。\n\n伪元素解决另一个问题：有些内容纯粹是装饰（分隔符 `/`、必填星号 `*`、装饰短线），为它们在 HTML 里写一堆 `<span>` 既啰嗦又污染语义。伪元素让你在 CSS 里「就地生成」这些装饰。',
          },
          {
            type: 'text',
            title: '2. 为什么是一个冒号 / 两个冒号',
            body: '这是**历史遗留**，不是规则冲突：\n\nCSS2 时代，伪类和伪元素都写一个冒号（`:hover`、`:before`）。CSS3 为了区分「选状态」和「造节点」，规定**伪元素改用两个冒号**（`::before`）。\n\n所以今天的约定是：\n• 伪类 → 一个冒号：`:hover`、`:focus`、`:nth-child()`、`:checked`、`:not()`\n• 伪元素 → 两个冒号：`::before`、`::after`、`::first-letter`、`::placeholder`、`::marker`\n\n为了兼容老页面，浏览器至今仍认识 `:before` 这种老写法，但**新代码一律写 `::before`**，一眼就能看出「这是在造虚拟节点」。\n\n新增的伪元素（如 `::placeholder`、`::marker`）**只支持双冒号**，写成单冒号无效。',
          },
          {
            type: 'text',
            title: '3. 伪类分三大类（先建立地图）',
            body: '几十个伪类不用死记，按用途分成三类就清楚了：\n\n**① 状态 / 交互类** —— 跟着用户操作变\n`:hover` 悬停、`:active` 按下、`:focus` 聚焦、`:focus-visible` 键盘聚焦、`:focus-within` 内部有元素聚焦、`:link` 未访问链接、`:visited` 已访问链接、`:target` URL 锚点指向的元素\n\n**② 结构 / 位置类** —— 看它在父元素里排第几\n`:first-child` 第一个孩子、`:last-child` 最后一个孩子、`:only-child` 独生子、`:nth-child()` 第 n 个孩子、`:nth-last-child()` 倒数第 n 个、`:nth-of-type()` 同标签里第 n 个、`:empty` 内容为空\n\n**③ 表单 / 逻辑类** —— 表单控件的状态，以及逻辑组合\n`:checked` 已勾选、`:disabled` 禁用、`:enabled` 可用、`:required` 必填、`:optional` 选填、`:valid` 校验通过、`:invalid` 校验失败、`:placeholder-shown` 正在显示占位文字、`:not()` 取反、`:is()` 任选其一、`:where()` 同 `:is()` 但不计优先级、`:has()` 「包含某元素的父级」',
          },
          {
            type: 'table',
            title: '最常用伪类速查（背这一张就够开工）',
            headers: ['伪类', '什么时候命中', '典型用途'],
            rows: [
              ['`:hover`', '鼠标停在元素上', '按钮变色、链接加下划线'],
              ['`:active`', '鼠标按下还没松开', '按下时下沉 1px，做「按到了」的手感'],
              ['`:focus`', '元素获得焦点（点击或 Tab）', '输入框描边'],
              [
                '`:focus-visible`',
                '**键盘**导致的聚焦',
                '只给键盘用户显示焦点框，鼠标点击不显示',
              ],
              ['`:focus-within`', '自己或内部任意元素聚焦', '整个表单项高亮'],
              ['`:first-child`', '是父元素的第一个孩子', '首项去掉上边距'],
              ['`:last-child`', '是父元素的最后一个孩子', '末项去掉分割线'],
              [
                '`:nth-child(odd)`',
                '排在奇数位（1、3、5…）',
                '表格斑马纹',
              ],
              ['`:not(.x)`', '不匹配括号里的选择器', '除了某几项之外都加样式'],
              ['`:checked`', '复选框 / 单选框被勾选', '纯 CSS 开关、折叠面板'],
              ['`:disabled`', '控件带 disabled 属性', '灰掉按钮、禁止光标'],
              [
                '`:placeholder-shown`',
                '输入框还空着（在显示占位文字）',
                '浮动标签、只在填过后才报错',
              ],
              ['`:has(.x)`', '内部包含匹配的元素', '「父选择器」，按内容改父级样式'],
            ],
            note: '优先级记分上：**伪类和 class 同一档**（`:hover` 算 1 个 class 分）；**伪元素和标签同一档**（`::before` 算 1 个标签分）。',
          },
          {
            type: 'text',
            title: '4. 状态类实战：一个按钮的四种样子',
            body: '一个「手感好」的按钮，至少要写四个状态，缺一个就会显得廉价：\n\n• **默认**：静止时长什么样\n• **`:hover`**：鼠标靠近 → 底色变浅，告诉用户「我能点」\n• **`:active`**：按下瞬间 → 位置下沉或颜色加深，模拟真实按键\n• **`:focus-visible`**：用键盘 Tab 过来 → 显示清晰的焦点圈（无障碍必需）\n• **`:disabled`**：不可用时 → 半透明 + `cursor: not-allowed`\n\n为什么用 `:focus-visible` 而不是 `:focus`：`:focus` 在**鼠标点击**时也会触发，会留下一圈很丑的框；`:focus-visible` 由浏览器判断「这次聚焦是不是键盘引起的」，只在键盘操作时才显示——既好看又不牺牲无障碍。\n\n易错：写了 `:hover` 却不写 `transition`，颜色会「跳变」；加一句 `transition: background .15s` 就顺滑了。',
          },
          {
            type: 'code',
            title: 'Demo①：按钮的 hover / active / focus-visible / disabled',
            language: 'html',
            live: true,
            body: `<style>
  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效。 */
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  .row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }

  /* 默认状态：静止时的样子 */
  .btn {
    padding: 10px 18px;
    border: 1px solid #2f6b4f;
    border-radius: 8px;
    background: #fff;
    color: #2f6b4f;
    font: inherit;               /* 继承页面字体，否则按钮会用浏览器默认小字 */
    cursor: pointer;             /* 小手光标，暗示可点击 */
    transition: background 0.15s, transform 0.05s; /* 让状态切换有过渡，不生硬 */
  }

  /* :hover 伪类 —— 鼠标悬停在按钮上时命中 */
  .btn:hover { background: #eef6f1; }

  /* :active 伪类 —— 鼠标按下、还没松开的那一瞬间 */
  .btn:active {
    background: #d9ebe1;
    transform: translateY(1px);  /* 向下移 1px，模拟按键被压下去 */
  }

  /* :focus-visible 伪类 —— 只有「键盘」导致的聚焦才命中（请按 Tab 键试试）
     用它代替 :focus，鼠标点击就不会留下丑丑的焦点框 */
  .btn:focus-visible {
    outline: 3px solid #9bd3b0;  /* 焦点圈 */
    outline-offset: 2px;         /* 焦点圈和按钮之间留 2px 缝 */
  }

  /* :disabled 伪类 —— 元素带 disabled 属性时命中 */
  .btn:disabled {
    opacity: 0.45;               /* 半透明表示不可用 */
    cursor: not-allowed;         /* 禁止光标 */
    border-color: #9bb5a6;
    color: #5c6b62;
  }
  /* 注意：被 disabled 的按钮不会触发 :hover 效果，
     因为浏览器根本不把鼠标事件派发给它 */

  .tip { margin: 14px 0 0; font-size: 12px; color: #5c6b62; }
</style>

<div class="row">
  <!-- 普通按钮：可以悬停、按下、Tab 聚焦 -->
  <button type="button" class="btn">正常按钮</button>
  <!-- disabled 属性：让按钮不可用，:disabled 伪类因此命中 -->
  <button type="button" class="btn" disabled>禁用按钮</button>
</div>

<p class="tip">试三件事：① 鼠标悬停 ② 按住不放 ③ 点一下预览区空白处，再按 Tab 键——只有第 ③ 种会出现焦点圈。</p>`,
          },
          {
            type: 'text',
            title: '5. 链接的四个状态与 LVHA 顺序陷阱',
            body: '链接 `<a>` 有四个专属状态伪类：\n\n• `:link` —— 还没访问过的链接\n• `:visited` —— 访问过的链接\n• `:hover` —— 鼠标悬停\n• `:active` —— 正在被按下\n\n**顺序必须是 L → V → H → A**（口诀：**L**o**V**e **HA**te，爱恨），否则后面的会被前面的盖掉。\n\n为什么：这四个伪类特异性完全相同（都算 1 个 class 分）。既然分数一样，**就只能靠书写顺序决胜**。如果把 `:hover` 写在 `:visited` 前面，那么访问过的链接在悬停时会继续显示 `:visited` 的颜色——因为 `:visited` 写在后面赢了。\n\n**隐私限制**：为了防止网站偷偷探测你的浏览历史，`:visited` 只允许改极少数属性（主要是 `color`、`background-color`、`border-color`），改 `font-size`、`display` 一律无效，用 JS 也读不到真实的计算样式。',
          },
          {
            type: 'code',
            title: 'Demo②：链接四态与 LVHA 顺序',
            language: 'html',
            live: true,
            body: `<style>
  body { margin: 16px; font: 14px/1.8 system-ui, sans-serif; color: #1f2a24; }

  /* ===== 正确顺序：L → V → H → A（Love / Hate）===== */

  /* :link —— 未访问过的链接 */
  .demo a:link { color: #2f6b4f; }
  /* :visited —— 访问过的链接（只能改颜色类属性，这是浏览器的隐私限制） */
  .demo a:visited { color: #7a5cc4; }
  /* :hover —— 鼠标悬停；写在 :visited 之后，才能盖住它 */
  .demo a:hover { color: #c53030; text-decoration: underline; }
  /* :active —— 按下的瞬间；写在最后，优先级最高（同分靠顺序赢） */
  .demo a:active { color: #f0a500; }

  /* ===== 错误顺序示范：把 hover 写在 visited 前面 ===== */
  .bad a:link { color: #2f6b4f; }
  .bad a:hover { color: #c53030; }    /* 先写 hover */
  .bad a:visited { color: #7a5cc4; }  /* 后写 visited，同分靠顺序赢
                                         → 访问过的链接悬停时不会变红 */

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

<!-- target="_blank" 让链接在新标签打开，不会刷掉这个预览 -->
<div class="box demo ok">
  <h4>✓ 正确顺序 L-V-H-A</h4>
  <a href="https://developer.mozilla.org" target="_blank" rel="noreferrer">悬停我会变红</a>
</div>

<div class="box bad">
  <h4>✗ 错误顺序（hover 写在 visited 前）</h4>
  <a href="https://developer.mozilla.org" target="_blank" rel="noreferrer">访问过之后，悬停就不变色了</a>
</div>

<p class="tip">口诀：LoVe（:link、:visited）HAte（:hover、:active）。四者同分，顺序写错就等于没写。</p>`,
          },
          {
            type: 'text',
            title: '6. 位置类伪类：:nth-child() 公式讲透',
            body: '`:nth-child(公式)` 是最强也最容易懵的一个。它的含义是：**这个元素在父元素的所有孩子里排第几**。\n\n括号里可以写四种东西：\n\n**① 具体数字** —— `:nth-child(3)` 就是第 3 个。\n\n**② 关键字** —— `odd` 奇数位（1、3、5…）、`even` 偶数位（2、4、6…）。表格斑马纹就靠它。\n\n**③ `an + b` 公式** —— 这是重点。浏览器会把 `n` 依次代入 **0、1、2、3…**，算出的每个结果（只保留 ≥1 的整数）都会命中：\n• `2n` → 0、2、4、6…（等于 even）\n• `2n+1` → 1、3、5、7…（等于 odd）\n• `3n` → 3、6、9…（每 3 个命中 1 个）\n• `3n+1` → 1、4、7…（每组的第一个，做 3 列网格时很有用）\n• `n+3` → 3、4、5…（**从第 3 个开始，之后全中**）\n• `-n+3` → 3、2、1（**只命中前 3 个**，因为 n 再大结果就 ≤0 了）\n\n**④ `of` 语法（较新）** —— `:nth-child(2 of .item)` 表示「在 .item 里排第 2 个」。\n\n记忆技巧：`b` 决定**起点**，`a` 决定**步长**；负号 `-n` 表示**反过来数，只取前面几个**。',
          },
          {
            type: 'table',
            title: 'nth-child 公式对照表',
            intro: '假设父元素里有 8 个孩子，编号 1~8。',
            headers: ['写法', '命中第几个', '常见用途'],
            rows: [
              ['`:nth-child(1)`', '1', '等价于 `:first-child`'],
              ['`:nth-child(odd)` / `2n+1`', '1、3、5、7', '斑马纹（浅色行）'],
              ['`:nth-child(even)` / `2n`', '2、4、6、8', '斑马纹（深色行）'],
              ['`:nth-child(3n)`', '3、6', '每 3 个加一条分组线'],
              ['`:nth-child(3n+1)`', '1、4、7', '三列网格里每行的第一个'],
              ['`:nth-child(n+3)`', '3、4、5、6、7、8', '「第 3 个及以后」全部隐藏 / 淡化'],
              ['`:nth-child(-n+3)`', '1、2、3', '只强调前 3 名'],
              ['`:nth-child(n+2):nth-child(-n+4)`', '2、3、4', '取一个区间（两个条件叠加）'],
              ['`:nth-last-child(1)`', '8', '等价于 `:last-child`'],
              ['`:nth-last-child(2)`', '7', '倒数第 2 个'],
            ],
            note: '公式里的 `n` 从 **0** 开始代入，算出 ≤0 的结果直接忽略。两个伪类**连写**（中间不加空格）表示「同时满足」。',
          },
          {
            type: 'code',
            title: 'Demo③：斑马纹 + nth-child 各种公式对照',
            language: 'html',
            live: true,
            body: `<style>
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  .list {
    list-style: none;   /* 去掉 ul 默认的圆点 */
    margin: 0 0 18px;   /* 清掉默认外边距，只留底部间隔 */
    padding: 0;         /* 清掉默认左内边距 */
    border: 1px solid #d9e0d8;
    border-radius: 10px;
    overflow: hidden;   /* 让子项的背景色被圆角裁切，不会溢出圆角 */
  }
  .list li {
    padding: 8px 12px;
    font-size: 13px;
  }

  /* ① :nth-child(odd) —— 奇数位（1、3、5、7），最经典的斑马纹 */
  .zebra li:nth-child(odd) { background: #f1f7f3; }

  /* ② :nth-child(3n) —— n 取 0,1,2… 得 0,3,6 → 命中第 3、6 个
        用途：每 3 项画一条分组线 */
  .every3 li:nth-child(3n) {
    border-bottom: 2px solid #2f6b4f;
    font-weight: 700;
  }

  /* ③ :nth-child(-n+3) —— n 取 0,1,2 得 3,2,1 → 只命中前 3 个
        n 再往大取，结果就 ≤0 被忽略。用途：只高亮前三名 */
  .top3 li:nth-child(-n+3) {
    background: #2f6b4f;
    color: #fff;
  }

  /* ④ :nth-child(n+5) —— n 取 0,1,2… 得 5,6,7… → 第 5 个及以后全中
        用途：列表「只显示前 4 条」，其余淡化或隐藏 */
  .after5 li:nth-child(n+5) {
    opacity: 0.35;
  }

  /* ⑤ 两个伪类连写（中间无空格）= 同时满足 → 命中第 2~4 个 */
  .range li:nth-child(n+2):nth-child(-n+4) {
    background: #fdf3d6;
    font-weight: 600;
  }

  h4 { margin: 0 0 6px; font-size: 13px; color: #2f6b4f; }
</style>

<h4>① odd 斑马纹</h4>
<ul class="list zebra">
  <li>第 1 项</li><li>第 2 项</li><li>第 3 项</li><li>第 4 项</li>
  <li>第 5 项</li><li>第 6 项</li><li>第 7 项</li>
</ul>

<h4>② 3n：每 3 项一条分组线</h4>
<ul class="list every3">
  <li>第 1 项</li><li>第 2 项</li><li>第 3 项</li><li>第 4 项</li>
  <li>第 5 项</li><li>第 6 项</li><li>第 7 项</li>
</ul>

<h4>③ -n+3：只命中前 3 个</h4>
<ul class="list top3">
  <li>第 1 项</li><li>第 2 项</li><li>第 3 项</li><li>第 4 项</li>
  <li>第 5 项</li><li>第 6 项</li><li>第 7 项</li>
</ul>

<h4>④ n+5：第 5 个及以后全部淡化</h4>
<ul class="list after5">
  <li>第 1 项</li><li>第 2 项</li><li>第 3 项</li><li>第 4 项</li>
  <li>第 5 项</li><li>第 6 项</li><li>第 7 项</li>
</ul>

<h4>⑤ n+2 与 -n+4 连写：取第 2~4 个区间</h4>
<ul class="list range">
  <li>第 1 项</li><li>第 2 项</li><li>第 3 项</li><li>第 4 项</li>
  <li>第 5 项</li><li>第 6 项</li><li>第 7 项</li>
</ul>`,
          },
          {
            type: 'text',
            title: '7. 易错重点：:nth-child 与 :nth-of-type 的区别',
            body: '这是面试和实战里都高频踩的坑。\n\n• **`p:nth-child(2)`** 读作：「**先看父元素的第 2 个孩子，它恰好是 `<p>` 吗？**」是 `<p>` 才命中，不是就一个都不选。\n• **`p:nth-of-type(2)`** 读作：「**父元素里所有 `<p>` 中的第 2 个**」——数数时会跳过其它标签。\n\n举例：父元素里依次是 `<h3>`、`<p>A</p>`、`<p>B</p>`\n• `p:nth-child(2)` → 命中 **A**（因为第 2 个孩子正好是 p）\n• `p:nth-child(1)` → **什么都不中**（第 1 个孩子是 h3，不是 p）\n• `p:nth-of-type(1)` → 命中 **A**（p 里的第 1 个）\n• `p:nth-of-type(2)` → 命中 **B**\n\n同理 `:first-child` vs `:first-of-type`、`:last-child` vs `:last-of-type`。\n\n**怎么选**：列表里所有孩子都是同一种标签（比如全是 `<li>`）时，两者结果一样，用 `:nth-child` 更短；只要孩子标签混杂，就要想清楚你要的是「第几个孩子」还是「第几个同类标签」。',
          },
          {
            type: 'code',
            title: 'Demo④：nth-child 与 nth-of-type 对比',
            language: 'html',
            live: true,
            body: `<style>
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  .box {
    padding: 12px 14px;
    margin-bottom: 14px;
    border: 1px solid #d9e0d8;
    border-radius: 10px;
  }
  .box h3 { margin: 0 0 8px; font-size: 14px; color: #5c6b62; }
  .box p { margin: 0 0 6px; padding: 6px 8px; border-radius: 6px; background: #f7faf8; }
  .label { font-size: 12px; color: #5c6b62; margin: 0; }

  /* A 组：p:nth-child(2)
     含义是「父元素的第 2 个孩子，并且它得是 p」。
     这里第 1 个孩子是 h3、第 2 个才是 p，所以命中「段落 A」 */
  .a p:nth-child(2) { background: #2f6b4f; color: #fff; }

  /* B 组：p:nth-of-type(2)
     含义是「父元素里所有 p 中的第 2 个」，数数时会跳过 h3，
     所以命中「段落 B」 */
  .b p:nth-of-type(2) { background: #2f6b4f; color: #fff; }

  /* C 组：p:nth-child(1)
     第 1 个孩子是 h3 而不是 p，所以这条规则一个元素都选不中——
     全部段落保持原色，这正是新手最常见的「为什么我的样式没生效」 */
  .c p:nth-child(1) { background: #c53030; color: #fff; }
</style>

<div class="box a">
  <h3>A 组：p:nth-child(2) → 选中「段落 A」</h3>
  <p>段落 A（父元素的第 2 个孩子）</p>
  <p>段落 B（父元素的第 3 个孩子）</p>
  <p class="label">数数时把 h3 也算进去了。</p>
</div>

<div class="box b">
  <h3>B 组：p:nth-of-type(2) → 选中「段落 B」</h3>
  <p>段落 A（p 里的第 1 个）</p>
  <p>段落 B（p 里的第 2 个）</p>
  <p class="label">数数时只数 p，跳过了 h3。</p>
</div>

<div class="box c">
  <h3>C 组：p:nth-child(1) → 一个都选不中</h3>
  <p>段落 A</p>
  <p>段落 B</p>
  <p class="label">因为第 1 个孩子是 h3，不是 p。</p>
</div>`,
          },
          {
            type: 'text',
            title: '8. 逻辑类伪类：:not() / :is() / :where() / :has()',
            body: '**`:not(选择器)`** —— 取反，「不是这个的才要」。最经典用法：`.cell:not(:last-child) { border-bottom: 1px solid #eee }`，给列表每项加分割线但**放过最后一项**。比「先全加、再用 `:last-child` 去掉」更直接。\n\n**`:is(a, b, c)`** —— 任选其一，用来合并冗长的选择器。\n`.card :is(h1, h2, h3)` 等价于 `.card h1, .card h2, .card h3`，少写很多重复前缀。\n\n**`:where(a, b, c)`** —— 写法和 `:is()` 完全一样，**唯一区别是它的优先级永远是 0**。写通用基础样式时用 `:where()`，后续用一个普通 class 就能轻松覆盖，不会打优先级仗。\n\n**`:has(选择器)`** —— 期待多年的「**父选择器**」。`.card:has(img)` 表示「内部含有 `<img>` 的 .card」；`label:has(input:checked)` 表示「里面的勾选框被选中了的 label」。它让 CSS 第一次能**根据子孙的状态反过来改父级样式**，很多以前必须写 JS 的效果现在纯 CSS 就能做。\n\n**优先级细节**（容易被问到）：\n• `:not()` 和 `:is()` 取**括号里分数最高**的那个参数当自己的分数\n• `:where()` 恒为 0 分\n• `:has()` 同样取括号里最高分',
          },
          {
            type: 'code',
            title: 'Demo⑤：:not() 去掉末项分割线 + :is() 合并写法',
            language: 'html',
            live: true,
            body: `<style>
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  .cells {
    max-width: 320px;
    margin-bottom: 18px;
    border: 1px solid #d9e0d8;
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
  }

  /* :not(:last-child) —— 「不是最后一个孩子」的才画下边线。
     这样列表内部有分割线，但最后一条不会多出一根贴着圆角的线。
     对比写法（更啰嗦）：先给所有 .cell 加线，再写 .cell:last-child 把线去掉 */
  .cell:not(:last-child) {
    border-bottom: 1px solid #eef6f1;
  }
  .cell { padding: 10px 14px; }

  /* :is(h1, h2, h3) —— 任选其一，等价于写三遍 .article h1 / h2 / h3。
     注意它取括号里分数最高的参数当自己的分数（这里三个都是标签，1 分） */
  .article :is(h1, h2, h3) {
    margin: 0 0 6px;
    color: #2f6b4f;
    font-size: 15px;
  }

  /* :where(p, li) —— 和 :is 用法相同，但优先级恒为 0。
     所以下面那条只有一个 class 的 .lead 能轻松覆盖它的颜色 */
  .article :where(p, li) { color: #8a968f; }
  .lead { color: #1f2a24; font-weight: 600; }

  .article {
    max-width: 320px;
    padding: 12px 14px;
    border: 1px solid #d9e0d8;
    border-radius: 10px;
  }
</style>

<div class="cells">
  <div class="cell">支付</div>
  <div class="cell">收藏</div>
  <div class="cell">相册</div>
  <div class="cell">最后一项（下面没有多余的线）</div>
</div>

<div class="article">
  <h2>标题（被 :is 命中）</h2>
  <!-- 这段被 :where(p, li) 染成浅灰 -->
  <p>普通段落：被 :where 染成浅灰色。</p>
  <!-- .lead 只有一个 class（1 分），却能盖过 :where（0 分） -->
  <p class="lead">导语段落：一个 class 就盖过了 :where。</p>
</div>`,
          },
          {
            type: 'code',
            title: 'Demo⑥：表单伪类（:checked / :placeholder-shown / :invalid / :required）',
            language: 'html',
            live: true,
            body: `<style>
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  .field { margin-bottom: 18px; max-width: 340px; }
  .field > label { display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; }

  /* ===== ① :checked —— 纯 CSS 开关，一行 JS 都不用 ===== */

  /* 把真正的 checkbox 藏起来（但保留它的可聚焦与可勾选能力） */
  .switch input { position: absolute; opacity: 0; width: 0; height: 0; }
  /* 这个 span 是我们画出来的「轨道」 */
  .switch .track {
    display: inline-block;
    width: 46px; height: 26px;
    background: #cbd5ce;
    border-radius: 999px;      /* 大圆角 = 胶囊形 */
    position: relative;        /* 给里面的圆点当定位参照物 */
    transition: background 0.18s;
    vertical-align: middle;
  }
  /* ::before 伪元素当作滑动的白色圆点（HTML 里并不存在这个节点） */
  .switch .track::before {
    content: '';               /* 伪元素必须写 content，哪怕是空字符串 */
    position: absolute;
    top: 3px; left: 3px;
    width: 20px; height: 20px;
    background: #fff;
    border-radius: 50%;        /* 正圆 */
    transition: left 0.18s;    /* 让圆点滑动而不是跳过去 */
  }
  /* 关键一行：input:checked + .track
     :checked 是伪类（勾选时命中），+ 是相邻兄弟选择器
     整句含义是「当勾选框被选中时，紧跟它后面的 .track」*/
  .switch input:checked + .track { background: #2f6b4f; }
  .switch input:checked + .track::before { left: 23px; } /* 圆点滑到右边 */
  /* :focus-visible 也能穿透到兄弟身上，键盘用户才看得到焦点圈 */
  .switch input:focus-visible + .track { outline: 3px solid #9bd3b0; outline-offset: 2px; }
  .switch { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; }

  /* ===== ② :required / :placeholder-shown / :invalid ===== */

  .input {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #cbd5ce;
    border-radius: 8px;
    font: inherit;
  }
  /* :required —— 带 required 属性的输入框，左侧加一条竖条提示「必填」 */
  .input:required { border-left: 3px solid #2f6b4f; }

  /* :placeholder-shown —— 输入框还空着（正在显示占位文字）时命中 */
  .input:placeholder-shown { background: #f7faf8; }

  /* :invalid 单独用会「一进页面就报红」，体验很差。
     配合 :not(:placeholder-shown) 表示「已经填了内容，但格式不对」才报红 */
  .input:invalid:not(:placeholder-shown) {
    border-color: #c53030;
    background: #fff5f5;
  }
  /* :valid + 已填过 → 绿色边框，正向反馈 */
  .input:valid:not(:placeholder-shown) { border-color: #2f6b4f; }

  /* 错误提示默认隐藏，只有「填了且不合法」时才出现（用兄弟选择器联动） */
  .err { display: none; margin: 6px 0 0; font-size: 12px; color: #c53030; }
  .input:invalid:not(:placeholder-shown) ~ .err { display: block; }

  .hint { font-size: 12px; color: #5c6b62; margin: 4px 0 0; }
</style>

<div class="field">
  <label>① :checked 做纯 CSS 开关</label>
  <!-- label 包住 input，点文字也能切换；input 藏起来，视觉全靠 .track -->
  <label class="switch">
    <input type="checkbox" />
    <span class="track"></span>
    <span>深色模式</span>
  </label>
  <p class="hint">点一下试试：没有任何 JS，全靠 input:checked + .track。</p>
</div>

<div class="field">
  <label for="mail">② 邮箱（必填 + 格式校验）</label>
  <!-- type="email" 让浏览器自带格式校验；required 触发 :required；
       placeholder 让 :placeholder-shown 在空着时命中 -->
  <input id="mail" class="input" type="email" required placeholder="you@example.com" />
  <p class="err">邮箱格式不对，需要包含 @ 符号</p>
  <p class="hint">先随便输几个字母 → 变红；补成完整邮箱 → 变绿；清空 → 恢复。</p>
</div>`,
          },
          {
            type: 'code',
            title: 'Demo⑦：:has() 父选择器（按内容改父级样式）',
            language: 'html',
            live: true,
            body: `<style>
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  .todo { list-style: none; margin: 0 0 16px; padding: 0; max-width: 340px; }
  .todo li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    margin-bottom: 8px;
    border: 1px solid #d9e0d8;
    border-radius: 10px;
    background: #fff;
    transition: background 0.15s, opacity 0.15s;
  }

  /* :has() 是「父选择器」：
     li:has(input:checked) 读作「内部含有一个被勾选的 input 的 li」。
     以前这件事必须写 JS 给父级加 class，现在纯 CSS 就能做到 */
  .todo li:has(input:checked) {
    background: #f1f7f3;
    border-color: #9bd3b0;
    opacity: 0.7;
  }
  /* 配合后代选择器，把勾掉的文字加删除线 */
  .todo li:has(input:checked) .text {
    text-decoration: line-through;
    color: #5c6b62;
  }

  /* 另一个例子：卡片里有没有图片，内边距不一样 */
  .card {
    max-width: 340px;
    padding: 14px;
    border: 1px solid #d9e0d8;
    border-radius: 12px;
    margin-bottom: 10px;
  }
  /* .card:has(img) —— 只命中「内部含 img」的卡片 */
  .card:has(img) { padding: 0; overflow: hidden; }
  .card:has(img) .body { padding: 14px; }
  .card img { display: block; width: 100%; height: 90px; object-fit: cover; }
  .card h4 { margin: 0 0 4px; font-size: 14px; }
  .card p { margin: 0; font-size: 12px; color: #5c6b62; }
  .hint { font-size: 12px; color: #5c6b62; }
</style>

<ul class="todo">
  <!-- 勾选任意一项，整个 li 的背景、边框、文字样式都会变 -->
  <li><input type="checkbox" /><span class="text">学 Flex 布局</span></li>
  <li><input type="checkbox" checked /><span class="text">学盒模型</span></li>
  <li><input type="checkbox" /><span class="text">学伪类与伪元素</span></li>
</ul>

<div class="card">
  <div class="body">
    <h4>无图卡片</h4>
    <p>没有 img，所以 :has(img) 不命中，保留 14px 内边距。</p>
  </div>
</div>

<div class="card">
  <!-- 这张卡里有 img，:has(img) 命中 → 内边距归零、图片顶到边 -->
  <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='120'><rect width='400' height='120' fill='%232f6b4f'/></svg>" alt="示意图" />
  <div class="body">
    <h4>有图卡片</h4>
    <p>:has(img) 命中，图片自动贴满顶部。</p>
  </div>
</div>

<p class="hint">:has() 是 2023 年才被各浏览器全面支持的新特性，很老的浏览器里不生效。</p>`,
          },
          {
            type: 'text',
            title: '9. 伪元素：::before / ::after 与必填的 content',
            body: '`::before` 和 `::after` 会在目标元素**内容的最前面 / 最后面**插一个虚拟节点。它是「元素内部的第一个 / 最后一个孩子」，不是元素的前后兄弟——这点常被记反。\n\n**三条铁律**：\n\n**① 必须写 `content`。** 不写 `content`，伪元素根本不会被创建，什么都看不到。只想画个色块时就写 `content: ""`（空字符串）。\n\n**② 默认是行内（inline）。** 想设宽高，得加 `display: block` / `inline-block`，或者用 `position: absolute`（绝对定位会自动块化）。\n\n**③ 自闭合标签用不了。** `<img>`、`<input>`、`<br>`、`<hr>` 没有「内容区」，塞不进虚拟孩子，所以给 `input::before` 写样式无效。想给输入框加图标，要么给外层容器加伪元素，要么用背景图。\n\n**`content` 能写什么**：\n• 字符串：`content: "→ "`\n• 空串（纯装饰块）：`content: ""`\n• 读取属性：`content: attr(data-tip)` —— 把 HTML 上的 `data-tip` 值显示出来，做纯 CSS 气泡提示\n• 计数器：`content: counter(step)` —— 配合 `counter-reset` / `counter-increment` 做自动编号\n• 图片：`content: url(icon.png)`\n\n**注意**：伪元素里的文字是「装饰性」的，屏幕阅读器可能读不到，也不能被鼠标选中复制，所以**不要把正文内容放进 `content`**。',
          },
          {
            type: 'code',
            title: 'Demo⑧：面包屑分隔符（li + li::before 逐层拆解）',
            language: 'html',
            live: true,
            body: `<style>
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  .crumb {
    display: flex;          /* 各层级横排 */
    flex-wrap: wrap;        /* 路径长了允许折行 */
    align-items: center;
    list-style: none;       /* 去掉 ol 默认的 1. 2. 3. */
    margin: 0 0 20px;
    padding: 0;             /* 去掉 ol 默认左内边距 */
    font-size: 13px;
  }
  .crumb a { color: #2f6b4f; text-decoration: none; }
  /* :hover 伪类：只在鼠标停在这个 a 上时命中，给文字补下划线做点击反馈 */
  .crumb a:hover { text-decoration: underline; }

  /* ★ 本 Demo 的核心，拆成三步理解：
     ① li + li 是「相邻兄弟选择器」，加号意思是「紧跟在另一个 li 之后的 li」，
        因此它命中第 2、3、4… 项，第一项永远不会被选中；
     ② ::before 是伪元素，在被命中元素的内容最前面插一个虚拟节点；
     ③ content 是伪元素的必填项，不写 content 就什么都不会出现。
     合起来的效果：除第一项外，每项前面自动加一个斜杠分隔符。
     好处是 HTML 里完全不用手写斜杠，将来增删层级也不会漏改。 */
  .crumb li + li::before {
    content: '/';           /* 要插入的字符 */
    margin: 0 6px;          /* 上下 0、左右 6px，让斜杠两侧留缝 */
    color: #9bb5a6;         /* 浅色，弱化分隔符本身 */
  }

  /* 当前页：灰色不可点，表示「你已经在这里了」 */
  .crumb .current { color: #5c6b62; }

  /* 对比组：换个分隔符，并且改用 :not(:first-child)
     :not(:first-child) 表示「不是第一个孩子的」，
     在这个全是 li 的列表里，它和 li + li 效果相同，但读起来更直白 */
  .crumb2 { display: flex; list-style: none; margin: 0 0 20px; padding: 0; font-size: 13px; }
  .crumb2 li:not(:first-child)::before {
    content: '›';           /* 换成右尖括号 */
    margin: 0 8px;
    color: #9bb5a6;
  }

  h4 { margin: 0 0 8px; font-size: 13px; color: #2f6b4f; }
  .tip { font-size: 12px; color: #5c6b62; }
</style>

<h4>① li + li::before 插入 / 分隔符</h4>
<!-- ol 是有序列表，语义上正好表示「有层级顺序的路径」 -->
<ol class="crumb">
  <li><a href="https://developer.mozilla.org" target="_blank" rel="noreferrer">首页</a></li>
  <li><a href="https://developer.mozilla.org" target="_blank" rel="noreferrer">课程</a></li>
  <li><a href="https://developer.mozilla.org" target="_blank" rel="noreferrer">前端基础</a></li>
  <!-- aria-current="page" 告诉屏幕阅读器「这是当前页」 -->
  <li class="current" aria-current="page">伪类与伪元素</li>
</ol>

<h4>② :not(:first-child)::before 插入 › 分隔符</h4>
<ol class="crumb2">
  <li>首页</li>
  <li>课程</li>
  <li>前端基础</li>
  <li>伪类与伪元素</li>
</ol>

<p class="tip">试着删掉 CSS 里的 content 那一行——分隔符会整个消失，因为没有 content 的伪元素不会被创建。</p>`,
          },
          {
            type: 'code',
            title: 'Demo⑨：::before / ::after 常见装饰（星号、角标、装饰线、attr 提示）',
            language: 'html',
            live: true,
            body: `<style>
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  .block { margin-bottom: 22px; }
  h4 { margin: 0 0 8px; font-size: 13px; color: #2f6b4f; }

  /* ① 必填星号：给 label 的文字后面补一个红星
     好处：HTML 里只加一个 class，不用手写 <span>*</span> */
  .required::after {
    content: ' *';
    color: #c53030;
    font-weight: 700;
  }

  /* ② 角标：::before 造一个绝对定位的小圆点
     父级必须有 position: relative，否则圆点会跑到更外层的参照物上去 */
  .badge-wrap { position: relative; display: inline-block; }
  .badge-wrap::before {
    content: '';              /* 纯装饰，用空字符串就行 */
    position: absolute;       /* 绝对定位会自动块化，可以直接设宽高 */
    top: -4px; right: -4px;
    width: 10px; height: 10px;
    background: #c53030;
    border: 2px solid #fff;   /* 白边把圆点和底下的图标隔开 */
    border-radius: 50%;
  }
  .icon-btn {
    padding: 8px 12px;
    border: 1px solid #d9e0d8;
    border-radius: 8px;
    background: #fff;
    font: inherit;
    cursor: pointer;
  }

  /* ③ 标题两侧装饰线：用 flex + 两个伪元素各占一半剩余空间 */
  .fancy {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
    font-size: 15px;
  }
  .fancy::before,
  .fancy::after {
    content: '';
    flex: 1;                  /* 两条线平分左右剩余宽度，标题自然居中 */
    height: 1px;
    background: #d9e0d8;
  }

  /* ④ attr()：把 HTML 上的 data-tip 属性值读出来当提示内容 */
  .tipbox { position: relative; display: inline-block; border-bottom: 1px dashed #9bb5a6; cursor: help; }
  .tipbox::after {
    content: attr(data-tip);  /* 动态读取属性，不用为每个提示写一条 CSS */
    position: absolute;
    left: 0; bottom: 130%;
    white-space: nowrap;      /* 提示文字不换行 */
    padding: 6px 10px;
    background: #1f2a24;
    color: #fff;
    font-size: 12px;
    border-radius: 6px;
    opacity: 0;               /* 默认透明（不是 display:none，才能做淡入动画） */
    pointer-events: none;     /* 透明时不挡鼠标 */
    transition: opacity 0.15s;
  }
  /* 悬停时让提示淡入 */
  .tipbox:hover::after { opacity: 1; }

  /* ⑤ 自动编号：counter-reset 建计数器，counter-increment 每项加一，
     content: counter() 把数字显示出来 */
  .steps { counter-reset: step; list-style: none; margin: 0; padding: 0; max-width: 340px; }
  .steps li {
    counter-increment: step;  /* 每遇到一个 li，计数器加 1 */
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
  }
  .steps li::before {
    content: counter(step);   /* 显示当前计数值 */
    flex-shrink: 0;
    width: 22px; height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2f6b4f;
    color: #fff;
    border-radius: 50%;
    font-size: 12px;
  }
</style>

<div class="block">
  <h4>① ::after 加必填星号</h4>
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
  <h4>④ content: attr() 做纯 CSS 悬停提示</h4>
  <!-- data-tip 是自定义属性，值被 CSS 的 attr() 读走当提示文字 -->
  <span class="tipbox" data-tip="伪元素不会出现在 HTML 结构里">悬停看提示</span>
</div>

<div class="block">
  <h4>⑤ counter() 自动编号</h4>
  <ol class="steps">
    <li>写 HTML 结构</li>
    <li>加 CSS 样式</li>
    <li>调伪类交互</li>
  </ol>
</div>`,
          },
          {
            type: 'text',
            title: '10. 其它常用伪元素',
            body: '除了 `::before` / `::after`，还有几个「改浏览器默认样式」的伪元素很实用：\n\n• **`::first-letter`** —— 段落第一个字。做杂志风格的首字下沉。\n• **`::first-line`** —— 段落第一行（注意：随容器宽度变化，第一行的内容会跟着变）。\n• **`::placeholder`** —— 输入框的占位文字。默认灰色太深或太浅时用它改。\n• **`::selection`** —— 用户用鼠标选中文字时的高亮配色。\n• **`::marker`** —— 列表项前面的圆点或编号。以前想换颜色只能把 `list-style` 去掉再用 `::before` 伪造，现在直接改就行。\n\n这些伪元素**只允许改一小部分属性**（主要是颜色、字体、背景一类），改 `position`、`display` 之类的布局属性通常无效——因为它们是浏览器内部渲染出来的东西，不是完整的盒子。',
          },
          {
            type: 'code',
            title: 'Demo⑩：::first-letter / ::marker / ::placeholder / ::selection',
            language: 'html',
            live: true,
            body: `<style>
  body { margin: 16px; font: 14px/1.7 system-ui, sans-serif; color: #1f2a24; }

  h4 { margin: 0 0 6px; font-size: 13px; color: #2f6b4f; }
  .block { margin-bottom: 22px; max-width: 380px; }

  /* ① ::first-letter —— 段落的第一个字，做首字下沉 */
  .drop::first-letter {
    float: left;              /* 让首字浮到左边，后面文字绕排 */
    font-size: 42px;
    line-height: 1;
    padding: 2px 8px 0 0;
    color: #2f6b4f;
    font-weight: 700;
  }

  /* ② ::first-line —— 段落第一行（把预览拉宽窄，命中的字会跟着变） */
  .lead::first-line {
    font-weight: 700;
    color: #2f6b4f;
  }

  /* ③ ::marker —— 列表项前面的圆点/编号，可以直接改颜色和字号 */
  .marked { padding-left: 22px; }
  .marked li::marker {
    color: #2f6b4f;
    font-size: 18px;
  }
  .marked li { margin-bottom: 4px; }

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
    font-style: italic;       /* 斜体，和真正输入的文字区分开 */
  }

  /* ⑤ ::selection —— 鼠标选中文字时的高亮配色 */
  .pick::selection {
    background: #2f6b4f;
    color: #fff;
  }
</style>

<div class="block">
  <h4>① ::first-letter 首字下沉</h4>
  <p class="drop">伪元素让我们不必为纯装饰的内容额外写标签，首字下沉就是最经典的例子，整段只多了一条 CSS 规则。</p>
</div>

<div class="block">
  <h4>② ::first-line 第一行加粗</h4>
  <p class="lead">这一段的第一行会被加粗变绿，剩下的行保持原样。它命中的是「渲染后的第一行」，所以把窗口拉窄，被加粗的字数会跟着变化。</p>
</div>

<div class="block">
  <h4>③ ::marker 改列表标记</h4>
  <ul class="marked">
    <li>圆点变成主题绿</li>
    <li>字号也能单独调</li>
  </ul>
</div>

<div class="block">
  <h4>④ ::placeholder 改占位文字</h4>
  <input class="input" type="text" placeholder="我是斜体浅绿的占位文字" />
</div>

<div class="block">
  <h4>⑤ ::selection 改选中高亮</h4>
  <p class="pick">用鼠标把这句话划选一下，看看高亮颜色变成了深绿底白字。</p>
</div>`,
          },
          {
            type: 'table',
            title: '伪类 vs 伪元素 对比',
            headers: ['对比项', '伪类 `:hover`', '伪元素 `::before`'],
            rows: [
              ['冒号数量', '一个 `:`', '两个 `::`'],
              ['作用', '选中「处于某状态/位置」的真实元素', '创造一个 HTML 里不存在的虚拟节点'],
              ['是否改 DOM', '不改，只是换套样式', '不改 DOM 树，但会多渲染一个盒子'],
              ['必需属性', '无', '**必须写 `content`**，否则不出现'],
              ['优先级记分', '和 class 同档（1 个 class 分）', '和标签同档（1 个标签分）'],
              ['一个元素能用几个', '可以叠很多个（`a:hover:focus`）', '`::before` 和 `::after` 各一个'],
              ['JS 能选中吗', '元素本身能选中', '选不到，只能用 `getComputedStyle(el, "::before")` 读样式'],
            ],
          },
          {
            type: 'list',
            title: '易错清单（踩过一次就记住了）',
            ordered: true,
            items: [
              '**伪元素忘写 `content`** → 什么都不显示。纯装饰块写 `content: ""`。',
              '**`::before` 是「内部第一个孩子」**，不是元素前面的兄弟；它会被父元素的 `overflow: hidden` 裁掉。',
              '**给 `img` / `input` 写 `::before` 无效** —— 自闭合标签没有内容区，改用外层容器或背景图。',
              '**链接四态顺序写反** → `:hover` 失效。记住 LoVe HAte：`:link` → `:visited` → `:hover` → `:active`。',
              '**`p:nth-child(1)` 选不中东西** —— 它要求「第 1 个孩子恰好是 p」；想要「第 1 个 p」得用 `:nth-of-type(1)`。',
              '**`:nth-child(2n)` 里的 n 从 0 开始**，不是从 1 开始；`-n+3` 才是「只要前 3 个」。',
              '**伪元素默认 inline，设宽高不生效** → 加 `display: block` 或 `position: absolute`。',
              '**绝对定位的伪元素跑偏** → 父元素忘了写 `position: relative`。',
              '**`:invalid` 一进页面就报红** → 配合 `:not(:placeholder-shown)`，等用户填过再校验。',
              '**用 `content` 放正文** → 无法被选中复制，屏幕阅读器也可能读不到；正文永远写在 HTML 里。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '**伪类选状态**（`:hover` 悬停、`:checked` 勾选、`:nth-child(odd)` 奇数行、`:not(:last-child)` 除末项），**伪元素造装饰**（`::before` / `::after` + 必填 `content`）。\n\n链接顺序背 **LoVe HAte**；`nth-child` 里 **n 从 0 数起**，`b` 定起点、`a` 定步长；`:nth-child` 数「所有孩子」而 `:nth-of-type` 只数「同类标签」；想按内容改父级样式就用 `:has()`。',
          },
        ],
      },
    },
    {
      id: 'flex-full-guide',
      title: 'Flex 入门：先开启，再谈主轴 / 交叉轴',
      summary: 'flex 与 inline-flex 区别；为什么必须先 display:flex；主轴交叉轴是什么',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'Flex 不是某个属性，而是一套布局模式——必须先给父元素写 display:flex 或 inline-flex，justify-content / align-items 才有意义。先定主轴方向（flex-direction），再谈对齐。',
          },
          {
            type: 'text',
            title: '1. 是什么：Flex（Flexible Box）',
            body: 'Flex 是 CSS 专门为一维排版设计的布局模式：子元素沿一条主轴依次排列，并在交叉轴上对齐。\n\n你给某个元素写上 display:flex 之后：\n• 该元素变成「flex 容器（flex container）」\n• 它的直接子元素变成「flex 子项（flex items）」\n• 子项默认横排（flex-direction:row），可以用 justify-content、align-items、gap 等控制分布\n\n没有开启 flex 之前，元素仍按普通 block/inline 规则排——这时写 justify-content 等于白写。',
          },
          {
            type: 'text',
            title: '1. 为什么：属性不生效，90% 是顺序错了',
            body: '小白最常见错误链：\n① 父元素没写 display:flex\n② 却在父或子上写 justify-content: center\n③ 页面完全没变化 → 以为 CSS 坏了\n\n正确顺序：先 display:flex → 再 flex-direction（定主轴）→ 再 justify-content / align-items（定对齐）→ 最后在子项上写 flex:1 等。\n\nFlutter 对照：必须先有 Row/Column 容器，MainAxisAlignment 才有对象；CSS 同理，必须先有 flex 容器。',
          },
          {
            type: 'text',
            title: '1. 怎么用：对齐属性写在谁身上？',
            body: '写在父容器上的：display、flex-direction、flex-wrap、justify-content、align-items、align-content、gap。\n\n写在子项上的：flex（grow/shrink/basis）、align-self、order。\n\n易错：把 justify-content 写在子项上——无效（子项用 align-self 才是「单独改交叉轴对齐」的例外）。',
          },
          {
            type: 'code',
            title: 'Demo：错误 vs 正确（务必看注释）',
            language: 'html',
            live: true,
            body: `<style>
  /* ❌ 错误示范：没有 display:flex，这不是 flex 容器 */
  .wrong {
    justify-content: center; /* 主轴居中——但父级不是 flex，这些属性不会按 Flex 生效 */
    align-items: center; /* 交叉轴居中——同样无效 */
    height: 80px; /* 有高度，但 span 仍是普通 inline，不会垂直居中 */
    border: 1px solid #c53030; /* 红色边框标记「错误」区域 */
    background: #fde8e8;
  }

  /* ✅ 正确示范：先开启 flex，再写对齐属性 */
  .right {
    display: flex; /* 第一步：必须把父元素变成 flex 容器，后面属性才有意义 */
    justify-content: center; /* 第二步：子项在主轴（默认水平）方向居中 */
    align-items: center; /* 第二步：子项在交叉轴（默认垂直）方向居中 */
    height: 80px;
    border: 1px solid #2f6b4f;
    background: #eef6f1;
  }
</style>

<!-- 没有 flex 的容器：span 不会真正居中 -->
<div class="wrong"><span>我没有真正居中</span></div>
<!-- 有 flex 的容器：span 在 80px 高度里水平+垂直居中 -->
<div class="right"><span>我居中了</span></div>`,
          },
          {
            type: 'text',
            title: '2. flex 和 inline-flex：内部一样，外层不同',
            body: '是什么：两者都能开启 Flex，子项排列规则、justify-content / align-items 用法完全相同。\n\n差别只在「这个 flex 容器自己，在外层文档流里怎么占位」：\n• display:flex —— 容器像 block，默认独占一行，width:auto 时常横向撑满父级。\n• display:inline-flex —— 容器像 inline-block，可以和文字、其他 inline 元素并排，宽度默认由内容撑开。\n\n为什么分两档：有时你要整行工具栏（flex）；有时只要段落里嵌一小撮并排按钮（inline-flex）。\n\n怎么用：页面大结构、顶栏、卡片行 → flex；文字旁 inline 工具组 → inline-flex。\n\n详细对比表见本章「display 常用属性」一节（display-common）；这里只记结论：内部能力一样，差在外层占不占一整行。',
          },
          {
            type: 'table',
            title: 'flex vs inline-flex 对比',
            intro: '两者内部 Flex 能力相同；差别在容器自身的外层表现。（详见 display-common 节）',
            headers: ['display', '开启 Flex?', '容器外层像什么', '默认宽度（auto 时）', '典型场景'],
            rows: [
              ['flex', '✅', '块级（独占一行）', '常撑满父容器', '顶栏、整行列表、页面区块'],
              ['inline-flex', '✅', '行内块（可并排）', '常由内容撑开', '段落内按钮组、标签 chips'],
            ],
            note: '子项都会变成 flex items；flex-direction / justify-content / align-items 用法完全相同。',
          },
          {
            type: 'code',
            title: 'Demo：flex vs inline-flex（看外层占位）',
            language: 'html',
            live: true,
            body: `<style>
  /* display:flex：容器本身像 block，独占一整行 */
  .as-flex {
    display: flex;
    gap: 8px; /* 子项间距 */
    padding: 8px;
    background: #d9ebe1;
  }

  /* display:inline-flex：容器本身像 inline-block，可嵌在段落里并排 */
  .as-inline-flex {
    display: inline-flex;
    gap: 8px;
    padding: 8px;
    background: #f3e6d4;
  }

  /* 两种容器里的 span 子项样式相同——内部 flex 能力完全一样 */
  .as-flex span,
  .as-inline-flex span {
    padding: 4px 8px;
    background: #fff;
    border-radius: 4px;
  }
</style>

<!-- flex 容器默认独占一行，后面的 p 会被挤到下一行 -->
<p>display:flex 的容器（自己独占一行）：</p>
<div class="as-flex">
  <span>A</span><span>B</span><span>C</span>
</div>
<p>后面的文字会被挤到下一行。</p>

<!-- inline-flex 可以嵌在 p 段落中间，与前后文字同一段 -->
<p>
  段落里可以嵌
  <span class="as-inline-flex">
    <span>1</span><span>2</span>
  </span>
  inline-flex，大家还在同一段。
</p>`,
          },
          {
            type: 'list',
            title: 'flex / inline-flex 怎么选？',
            ordered: true,
            items: [
              '整行顶栏、侧栏+主区、卡片横排 → display: flex',
              '嵌在文字旁的一小组按钮/标签 → display: inline-flex',
              '内部要对齐、gap、flex:1 → 两者都行，看外层要不要独占一行',
              '不确定时先用 flex，需要并排进段落再改 inline-flex',
            ],
          },
          {
            type: 'text',
            title: '3. 主轴（main axis）和交叉轴（cross axis）',
            body: '是什么：开启 flex 后，容器里有两条 imaginary 的轴。主轴：子项依次排列的方向。交叉轴：垂直于主轴的方向。\n\n特点：默认 flex-direction:row 时，主轴 = 水平向右，交叉轴 = 垂直向下。改成 column 后，主轴变垂直，交叉轴变水平——justify 和 align 管的「左右/上下」会对调。\n\n为什么重要：不要死记「justify 一定管水平」——它管的是主轴；主轴方向由 flex-direction 决定。\n\nFlutter 对照：Row 主轴水平 → flex-direction:row；Column 主轴垂直 → column。MainAxisAlignment → justify-content；CrossAxisAlignment → align-items。',
          },
          {
            type: 'table',
            title: 'row vs column 时，谁管水平、谁管垂直',
            intro: 'justify-content 管主轴；align-items 管交叉轴。方向一变，含义跟着变。',
            headers: ['flex-direction', '主轴方向', 'justify-content 主要管', 'align-items 主要管', 'Flutter 对照'],
            rows: [
              ['row（默认）', '水平 →', '左右分布', '上下对齐', 'Row'],
              ['column', '垂直 ↓', '上下分布', '左右对齐', 'Column'],
            ],
            note: 'row-reverse / column-reverse 只反转主轴箭头方向，轴的概念不变。',
          },
          {
            type: 'code',
            title: '轴示意图（文字版）',
            language: 'text',
            body: `# Flex 主轴与交叉轴文字示意图（配合 flex-direction 理解 justify / align）

【flex-direction: row】（默认，像 Flutter Row）

   主轴 →→→→→→→→→→→→→→→→→→  （子项从左到右排）
  ┌─────────────────────────┐
  │  [1]   [2]   [3]        │  ↓ 交叉轴（垂直方向）
  └─────────────────────────┘
  justify-content：沿主轴分布（row 时管「左右怎么排」）
  align-items     ：沿交叉轴对齐（row 时管「上下怎么对齐」）


【flex-direction: column】（像 Flutter Column）

  主轴 ↓  （子项从上到下排）
  ┌─────────┐
  │  [1]    │
  │  [2]    │  交叉轴 →→→  （水平方向）
  │  [3]    │
  └─────────┘
  justify-content：沿主轴分布（column 时管「上下怎么排」）
  align-items     ：沿交叉轴对齐（column 时管「左右怎么对齐」）

# 记住：justify 永远管主轴，align-items 管交叉轴；方向由 flex-direction 决定`,
          },
          {
            type: 'text',
            title: '3. 易错：没开 flex、轴搞反、属性写错层级',
            body: '没开 flex 就写 justify-content → 无效。\n\nflex-direction:column 后还在想「justify 管水平」→ 其实管垂直了。\n\nalign-content 和 align-items 混淆 → align-content 管多行整体，单行用 align-items。\n\n给非直接孩子写 flex:1 → 无效，flex 子项必须是 flex 容器的直接子元素（DOM 结构层面）。',
          },
          {
            type: 'list',
            title: 'Flex 入门学习顺序',
            ordered: true,
            items: [
              '父级 display:flex 或 inline-flex',
              'flex-direction 定主轴（row / column）',
              'justify-content 主轴分布',
              'align-items 交叉轴对齐',
              'gap 设间距',
              '子项 flex:1 吃剩余空间',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '先 display:flex，再谈对齐。flex 独占一行，inline-flex 可并排——内部一样（详见 display-common）。justify 管主轴，align-items 管交叉轴；方向由 flex-direction 决定，别死记水平/垂直。',
          },
        ],
      },
    },
    {
      id: 'flex-container-props',
      title: 'Flex 容器属性详解（每个值是什么意思）',
      summary: 'direction、wrap、justify-content、align-items、align-content、gap 逐项讲清',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '下面所有属性都写在「已经 display:flex 或 inline-flex 的父容器」上。direction 定主轴，wrap 定换行，justify 管主轴分布，align-items 管单行交叉轴，align-content 管多行，gap 管间距。',
          },
          {
            type: 'text',
            title: '前提：容器必须先开启 Flex',
            body: '是什么：flex-direction、flex-wrap、justify-content、align-items、align-content、gap 都是「容器属性」，只对 flex container 生效。\n\n易错：子项上写 justify-content → 无效。父级没 display:flex 就写这些 → 全部无效。\n\n唯一例外：align-self 写在子项上，用来覆盖父级 align-items 对某一个孩子的默认对齐。',
          },
          {
            type: 'text',
            title: '1. flex-direction：主轴朝哪',
            body: '是什么：决定 flex 子项依次排列的方向，同时定义哪条是主轴、哪条是交叉轴。\n\n特点：row 横排（默认）、column 竖排；带 reverse 的值会反转视觉顺序（DOM 顺序不变，读屏顺序也不变——无障碍要注意）。\n\n为什么：同一组 HTML，只改 direction 就能在「顶栏横排」和「侧栏竖排」之间切换。\n\nFlutter 对照：row ≈ Row；column ≈ Column；row-reverse 类似 Row(textDirection: rtl) 的视觉效果。',
          },
          {
            type: 'table',
            title: 'flex-direction 每个值的含义',
            headers: ['值', '主轴方向', '子项怎么排', 'Flutter 直觉'],
            rows: [
              ['row（默认）', '水平 →', '从左到右横排', 'Row'],
              ['row-reverse', '水平 ←', '横排但顺序反了', 'Row + 反转'],
              ['column', '垂直 ↓', '从上到下竖排', 'Column'],
              ['column-reverse', '垂直 ↑', '竖排但顺序反了', 'Column + 反转'],
            ],
          },
          {
            type: 'code',
            title: 'Demo：横排 vs 竖排',
            language: 'html',
            live: true,
            body: `<style>
  /* 公共 flex 容器样式：下面两个 demo 共用 */
  .demo {
    display: flex; /* 必须先开启 flex，direction 等属性才生效 */
    gap: 8px; /* 子项间距 8px */
    margin-bottom: 16px; /* 两个 demo 之间拉开距离 */
    padding: 8px;
    border: 1px dashed #ccc; /* 虚线框标出 flex 容器范围 */
  }
  .row-demo { flex-direction: row; } /* 主轴水平：子项横排 1 2 3（默认值，可省略） */
  .col-demo { flex-direction: column; } /* 主轴垂直：子项竖排，1 在上 3 在下 */
  /* 只选 .demo 的直接子 div（每个数字块） */
  .demo div {
    padding: 10px 14px;
    background: #eef6f1;
    border-radius: 6px;
  }
</style>

<!-- row：flex-direction 默认就是 row，子项从左到右横排 -->
<div class="demo row-demo">
  <div>1</div><div>2</div><div>3</div>
</div>

<!-- column：主轴改为垂直，同样的 HTML 变成上下堆叠 -->
<div class="demo col-demo">
  <div>1</div><div>2</div><div>3</div>
</div>`,
          },
          {
            type: 'text',
            title: '2. flex-wrap：排不下时换不换行',
            body: '是什么：控制主轴方向放不下时，子项是挤在一行里（nowrap）还是折到下一行（wrap）。\n\n特点：nowrap 是默认——子项可能被压缩（flex-shrink）或溢出容器。wrap 类似 Flutter Wrap，适合标签云、多行卡片。\n\n为什么：顶栏菜单项固定不换行用 nowrap；商品标签、筛选 chips 用 wrap。\n\n易错：开了 wrap 但容器太宽，看不出换行效果——故意收窄 width 做实验。',
          },
          {
            type: 'table',
            title: 'flex-wrap 每个值的含义',
            headers: ['值', '含义', '典型效果'],
            rows: [
              ['nowrap（默认）', '强制在一行/一列里排完', '子项被挤扁或溢出'],
              ['wrap', '主轴放不下就换到下一行/列', '多行网格感'],
              ['wrap-reverse', '也换行，但新行在交叉轴反方向', '较少用'],
            ],
          },
          {
            type: 'code',
            title: 'Demo：nowrap vs wrap',
            language: 'html',
            live: true,
            body: `<style>
  .box {
    display: flex; /* flex 容器 */
    width: 260px; /* 故意做窄，三个 100px 子项放不下，方便观察换行 */
    gap: 8px;
    margin-bottom: 12px;
    border: 1px solid #ccc;
    padding: 8px;
  }
  .no-wrap { flex-wrap: nowrap; } /* 默认：不换行，子项可能被挤扁或溢出容器 */
  .wrap { flex-wrap: wrap; } /* 放不下时折到下一行，像 Flutter Wrap */
  .box span {
    flex: 0 0 100px; /* 简写：不放大(0) 不缩小(0) 基础宽 100px——每个标签固定 100px */
    text-align: center;
    padding: 8px 0;
    background: #f3e6d4;
    border-radius: 6px;
  }
</style>

<!-- nowrap：三个 span 挤在一行（可能溢出或被压缩） -->
<div class="box no-wrap">
  <span>1</span><span>2</span><span>3</span>
</div>
<!-- wrap：放不下的 span 自动换到第二行 -->
<div class="box wrap">
  <span>1</span><span>2</span><span>3</span>
</div>`,
          },
          {
            type: 'text',
            title: '3. justify-content：主轴上怎么分布',
            body: '是什么：控制 flex 子项在主轴方向上的对齐与间距分配。\n\n特点：row 时主要管水平；column 时主要管垂直——永远跟主轴走，不跟「屏幕水平」走。\n\n为什么：顶栏 space-between（Logo 左、按钮右）、表单按钮组 center、底部工具栏 space-evenly 都靠它。\n\nFlutter 对照：MainAxisAlignment.start / center / end / spaceBetween / spaceAround / spaceEvenly 一一对应。',
          },
          {
            type: 'table',
            title: 'justify-content 每个值的含义（以 row 为例）',
            intro: '主轴水平时，各值的大致视觉效果。',
            headers: ['值', '含义', 'Flutter 对照'],
            rows: [
              ['flex-start（默认）', '全部靠主轴起点（左）挤在一起', 'MainAxisAlignment.start'],
              ['flex-end', '全部靠主轴终点（右）', 'MainAxisAlignment.end'],
              ['center', '主轴方向整体居中', 'MainAxisAlignment.center'],
              ['space-between', '首尾贴边，中间空隙均分', 'MainAxisAlignment.spaceBetween'],
              ['space-around', '每项两侧都有空隙', 'MainAxisAlignment.spaceAround'],
              ['space-evenly', '所有空隙（含两端）完全相等', 'MainAxisAlignment.spaceEvenly'],
            ],
          },
          {
            type: 'code',
            title: 'Demo：只改 justify-content 做实验',
            language: 'html',
            live: true,
            body: `<style>
  .j {
    display: flex; /* 先开 flex */
    justify-content: center; /* 主轴分布：当前是 center（居中）；可改成 flex-start / space-between 等做实验 */
    align-items: center; /* 交叉轴：垂直居中（row 时管上下） */
    height: 56px; /* 给高度，align-items 才有垂直对齐效果 */
    margin-bottom: 8px;
    padding: 0 8px;
    border: 1px solid #e6ddd0;
    background: #fff;
  }
  .j span { padding: 4px 10px; background: #eef6f1; border-radius: 4px; }
</style>

<!-- 实验：把 justify-content 依次改成 flex-start | center | flex-end | space-between | space-around | space-evenly -->
<div class="j">
  <span>A</span><span>B</span><span>C</span>
</div>`,
          },
          {
            type: 'text',
            title: '4. align-items：交叉轴上怎么对齐（单行）',
            body: '是什么：控制「当前这一行（或这一列）里」，每个子项在交叉轴方向如何对齐。\n\n特点：row 时管垂直；column 时管水平。stretch 是默认——子项会被拉高/拉宽填满交叉轴（除非子项自己设了固定 height/width）。\n\n为什么：顶栏垂直居中（center）、底栏按钮底对齐（flex-end）、等高卡片（stretch）都靠它。\n\n易错：容器没有交叉轴方向的尺寸（如 row 时没 height），stretch/center 看不出差别——给容器设 height 再实验。',
          },
          {
            type: 'table',
            title: 'align-items 每个值的含义',
            headers: ['值', '含义（row 时）', 'Flutter 对照'],
            rows: [
              ['stretch（默认）', '交叉轴方向拉满容器高度', 'CrossAxisAlignment.stretch'],
              ['flex-start', '靠交叉轴起点（上）', 'CrossAxisAlignment.start'],
              ['flex-end', '靠交叉轴终点（下）', 'CrossAxisAlignment.end'],
              ['center', '交叉轴居中（最常用）', 'CrossAxisAlignment.center'],
              ['baseline', '按文字基线对齐', 'CrossAxisAlignment.baseline'],
            ],
          },
          {
            type: 'code',
            title: 'Demo：交叉轴对齐（父级要有高度）',
            language: 'html',
            live: true,
            body: `<style>
  .cross {
    display: flex;
    align-items: center; /* 交叉轴对齐：当前 center；可改成 flex-start / flex-end / stretch 对比 */
    height: 100px; /* ★ 父级必须有交叉轴方向尺寸（row 时要有 height），对齐才看得出差别 */
    gap: 8px;
    border: 1px dashed #999;
    padding: 8px;
  }
  .cross div { background: #d9ebe1; padding: 8px; border-radius: 4px; }
  .tall { height: 64px; } /* 故意做一个更高的块，方便观察垂直对齐差异 */
</style>

<!-- 三个子项高度不同：改 align-items 看「短/高/短」如何对齐 -->
<div class="cross">
  <div>短</div>
  <div class="tall">高</div>
  <div>短</div>
</div>`,
          },
          {
            type: 'text',
            title: '5. align-content：多行时「行与行」怎么分布',
            body: '是什么：当 flex-wrap:wrap 且确实折成多行时，控制「这些行作为整体」在交叉轴上如何分布。\n\n特点：只有多行时才有明显效果；单行时改 align-content 几乎看不出变化——此时应改 align-items。\n\n为什么：商品标签区行间距均匀、多行表单域垂直居中，会用到 align-content: center / space-between 等。\n\n易错：只有一行却调 align-content → 没效果，误以为属性坏了。',
          },
          {
            type: 'table',
            title: 'align-content 常见值（需 wrap + 多行）',
            headers: ['值', '含义'],
            rows: [
              ['flex-start', '各行靠交叉轴起点堆叠'],
              ['flex-end', '各行靠交叉轴终点堆叠'],
              ['center', '各行整体在交叉轴居中'],
              ['space-between', '首行贴一边、末行贴另一边，行距均分'],
              ['space-around', '每行两侧都有空隙'],
              ['space-evenly', '行间距完全相等'],
              ['stretch（默认）', '各行拉伸瓜分交叉轴剩余空间'],
            ],
          },
          {
            type: 'text',
            title: '6. gap：子项间距',
            body: '是什么：专门控制 flex 子项之间（以及 wrap 多行时的行/列间）的空隙。\n\n特点：比给每个子项写 margin 更干净——不会和首尾外边距纠缠，也不会触发 margin 合并问题。\n\n怎么用：gap: 12px 行列同距；gap: 8px 16px 先行间距后列间距；row-gap / column-gap 单独控制。\n\nFlutter 对照：Row/Column/Wrap 的 spacing 参数 ≈ gap。',
          },
          {
            type: 'code',
            title: 'gap 写法',
            language: 'css',
            body: `/* gap：专门控制 flex/grid 子项之间的间距，比 margin 更干净（不会和首尾外边距纠缠） */
.box {
  display: flex; /* gap 只在 flex 或 grid 容器上生效 */
  gap: 12px; /* 行间距和列间距都是 12px（一维 flex 横排时就是子项之间的空隙） */
  gap: 8px 16px; /* 两个值：第一个是 row-gap（行距），第二个是 column-gap（列距） */
  row-gap: 8px; /* 只改行与行之间的间距（wrap 多行时有用） */
  column-gap: 16px; /* 只改列与列之间的间距 */
}`,
          },
          {
            type: 'code',
            title: 'Demo：综合小练习——顶栏',
            language: 'html',
            live: true,
            body: `<style>
  /* 典型顶栏：综合运用 flex 容器五大属性 */
  .nav {
    display: flex; /* 1. 开启 flex，默认 row 横排 */
    flex-direction: row; /* 2. 主轴水平（默认值，写出来是为了对照学习顺序） */
    justify-content: space-between; /* 3. 主轴：Logo 靠左、按钮靠右，中间均分空隙 */
    align-items: center; /* 4. 交叉轴：Logo / 链接 / 按钮垂直居中对齐 */
    gap: 16px; /* 5. 子项之间最小间距 16px（space-between 时 gap 仍生效） */
    height: 56px; /* 顶栏固定高度 */
    padding: 0 16px; /* 左右内边距，内容不贴屏幕边缘 */
    background: #fff;
    border: 1px solid #e6ddd0; /* 底部分割线效果 */
  }
  .nav a { color: #5c6b63; text-decoration: none; } /* 链接去下划线、设颜色 */
</style>

<!-- header 语义：页面顶部导航区域 -->
<div class="nav">
  <strong>Logo</strong>
  <a href="#">课程</a>
  <button>登录</button>
</div>`,
          },
          {
            type: 'list',
            title: 'align-items vs align-content 怎么分？',
            ordered: true,
            items: [
              '只有一行 → 用 align-items',
              '多行（wrap 且折行）→ align-items 管每行内部对齐，align-content 管行与行之间',
              '记不住时：items 管「项」，content 管「内容块（多行整体）」',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'direction 定主轴，wrap 定换行，justify 管主轴分布，align-items 管单行交叉轴，align-content 管多行整体，gap 管间距。全部写在已 display:flex 的父容器上；column 时 justify 管垂直、align 管水平。',
          },
        ],
      },
    },
    {
      id: 'flex-item-props',
      title: 'Flex 子项属性详解（flex:1 到底是什么）',
      summary: 'flex-grow / shrink / basis、flex 简写、align-self、order、Spacer 写法',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '子项属性写在「flex 容器的直接孩子」上。最常用 flex:1（吃剩余空间，≈ Flutter Expanded）。搞懂 grow / shrink / basis 三个词，简写就不神秘了。',
          },
          {
            type: 'text',
            title: '前提：必须是 flex 容器的直接子项',
            body: '是什么：flex-grow、flex-shrink、flex-basis、flex 简写、align-self、order 只对 flex item 生效。\n\n易错：嵌套结构里给孙子元素写 flex:1，但父级不是 flex 容器 → 无效。DOM 上必须是 display:flex 那个元素的直接 child。\n\nFlutter 对照：Expanded 只能放在 Row/Column 的 children 里；CSS 同理。',
          },
          {
            type: 'text',
            title: '1. flex-grow：有多余空间时，要不要变大？',
            body: '是什么：当主轴方向还有剩余空间时，控制子项是否参与分配、以及分配比例。\n\n特点：默认 0——有空位也不抢。设为 1 参与分配；多个子项都是 1 则均分；1 和 2 则按 1:2 比例分。\n\n为什么：侧边栏固定 + 主内容自适应、三等分按钮组，都靠 grow。\n\n易错：父容器主轴方向没有剩余空间（子项已经撑满或溢出）→ 改 grow 看不出效果。',
          },
          {
            type: 'table',
            title: 'flex-grow 值含义',
            headers: ['值', '含义'],
            rows: [
              ['0（默认）', '不放大，旁边有空也不吃'],
              ['1', '按 1 份参与分剩余空间'],
              ['2', '按 2 份参与（是 1 的两倍）'],
              ['n', '按 n 份比例放大'],
            ],
            note: '只有父容器主轴上还有剩余空间时，grow 才看得出效果。',
          },
          {
            type: 'text',
            title: '2. flex-shrink：空间不够时，要不要变小？',
            body: '是什么：主轴空间不足时，控制子项是否允许被压缩。\n\n特点：默认 1——可以被挤小。设为 0——「别挤我」（固定宽度按钮、图标常用，配合 flex-shrink:0 或 flex:none）。\n\n为什么：顶栏 Logo 固定宽、中间菜单可缩、右侧按钮不缩，靠 shrink 差异实现。\n\n易错：只设 width 不设 shrink:0，窄屏时按钮仍可能被挤扁——图标/按钮常写 flex-shrink:0。',
          },
          {
            type: 'table',
            title: 'flex-shrink 值含义',
            headers: ['值', '含义'],
            rows: [
              ['1（默认）', '空间不足时允许被挤小'],
              ['0', '尽量不缩小（固定项常用）'],
              ['2', '比 shrink:1 更愿意被挤小（按比例）'],
            ],
          },
          {
            type: 'text',
            title: '3. flex-basis：分配前的「理想尺寸」',
            body: '是什么：在 grow/shrink 计算之前，子项在主轴上「希望」占多少空间。\n\n特点：可以是 200px、30%、auto（参考 width/height 或内容）。flex:1 常配合 basis:0%——从 0 起分，均分更「干净」。\n\n为什么：basis 决定「先占多少，再谈分剩余」；和 width 在 flex 项上有关联但不完全等同（row 时 basis 类似 width，column 时类似 height）。\n\nFlutter 对照：SizedBox(width:200) 设初始尺寸 ≈ flex-basis:200px + flex-grow:0。',
          },
          {
            type: 'table',
            title: 'flex-basis 常见值',
            headers: ['值', '含义'],
            rows: [
              ['auto（默认）', '参考 width/height 或内容大小'],
              ['0 / 0%', '从 0 开始参与分配（flex:1 常用）'],
              ['200px', '理想主轴尺寸先按 200px'],
              ['30%', '相对 flex 容器主轴尺寸的百分比'],
            ],
          },
          {
            type: 'text',
            title: '4. flex 简写：grow shrink basis 一次写完',
            body: '是什么：flex 是 flex-grow、flex-shrink、flex-basis 的简写。\n\n特点：日常最常用 flex:1，浏览器解析为 flex: 1 1 0%——能伸能缩、从 0 起分剩余。\n\n为什么：少写两行，语义清晰——看到 flex:1 就想到 Expanded。\n\n易错：flex: 200px 实际是 flex: 1 1 200px（一个值当 basis）；flex: none 是 0 0 auto（固定不伸缩）。',
          },
          {
            type: 'table',
            title: 'flex 简写对照（必背）',
            headers: ['写法', '展开为', '直觉', 'Flutter'],
            rows: [
              ['flex: 1', '1 1 0%', '均分 / 吃剩余', 'Expanded'],
              ['flex: 2', '2 1 0%', '占两份', 'Expanded(flex:2)'],
              ['flex: auto', '1 1 auto', '可伸可缩，按内容先占', 'Flexible'],
              ['flex: none', '0 0 auto', '固定不伸缩', '不用 Expanded'],
              ['flex: 0 0 200px', '0 0 200px', '固定 200px', 'SizedBox(width:200)'],
            ],
          },
          {
            type: 'code',
            title: 'Demo：均分、固定+剩余、1:2 比例',
            language: 'html',
            live: true,
            body: `<style>
  /* 每一行 demo 的 flex 父容器 */
  .line {
    display: flex; /* ★ 父级必须是 flex，子项上的 flex:1 等才会生效 */
    gap: 8px;
    margin-bottom: 12px;
  }
  .line > div { background: #eef6f1; padding: 10px; border-radius: 6px; }

  .grow { flex: 1; } /* 简写 flex: 1 1 0%：能伸能缩，从 0 起分剩余空间（≈ Flutter Expanded） */
  .two { flex: 2; } /* 占 2 份，旁边 flex:1 占 1 份，比例 1:2 */
  .fixed {
    width: 80px; /* 固定宽度 80px */
    flex-shrink: 0; /* 空间不够时也不要被挤扁（顶栏 Logo/按钮常用） */
  }
</style>

<!-- 三个 flex:1 → 剩余空间三等分 -->
<div class="line">
  <div class="grow">1</div>
  <div class="grow">1</div>
  <div class="grow">1</div>
</div>

<!-- 左边固定 80px，右边 flex:1 吃掉全部剩余（≈ 固定 + Expanded） -->
<div class="line">
  <div class="fixed">固定</div>
  <div class="grow">剩余全给我</div>
</div>

<!-- flex:1 与 flex:2 → 按 1:2 比例分配剩余空间 -->
<div class="line">
  <div class="grow">1份</div>
  <div class="two">2份</div>
</div>`,
          },
          {
            type: 'text',
            title: '5. align-self：单独改某一个子项的交叉轴对齐',
            body: '是什么：覆盖父级 align-items 对该子项的默认设置。\n\n特点：取值与 align-items 相同：flex-start / center / flex-end / stretch / baseline。\n\n为什么：顶栏大多数垂直居中，但某一个 badge 想贴顶——只给那个子项 align-self:flex-start。\n\nFlutter 对照：CrossAxisAlignment 是整行默认；单个 Widget 包 Align 或 Row 里某 child 特殊对齐 ≈ align-self。',
          },
          {
            type: 'code',
            title: 'Demo：大多数居中，一个贴顶',
            language: 'html',
            live: true,
            body: `<style>
  .row {
    display: flex;
    align-items: center; /* 父级默认：所有子项在交叉轴（垂直）居中 */
    height: 90px; /* 给高度才能看出垂直对齐差异 */
    gap: 8px;
    border: 1px dashed #999;
    padding: 8px;
  }
  .row div { background: #d9ebe1; padding: 8px; border-radius: 4px; }
  .top {
    align-self: flex-start; /* 只覆盖这一个子项：靠交叉轴起点（row 时是顶部），不理会父级 center */
  }
</style>

<!-- 中间块用 align-self 单独贴顶，左右仍跟随父级 align-items: center -->
<div class="row">
  <div>中</div>
  <div class="top">我在顶</div>
  <div>中</div>
</div>`,
          },
          {
            type: 'text',
            title: '6. order：改视觉顺序（了解即可）',
            body: '是什么：用整数排序，默认 0，越小越靠前。\n\n特点：只改视觉顺序，DOM 顺序和读屏顺序不变。\n\n为什么：响应式里「移动端把图片放标题下」偶尔用 order 微调，而不改 HTML。\n\n易错：滥用 order 会让无障碍读屏顺序和视觉不一致——正式项目慎用，优先改 DOM 结构。',
          },
          {
            type: 'text',
            title: '7. Spacer：把后面的东西推走',
            body: '是什么：Flutter 的 Spacer() = 一个没有内容的 Expanded，专门吃剩余空间把后面的 Widget 推走。\n\nCSS 两种写法：\n① 空 div + flex:1 占位。\n② 更常见：给右侧元素 margin-left:auto（row 主轴时），把它推到最右。\n\n为什么：顶栏「左 Logo、右按钮，中间留空」是最高频布局之一。\n\n易错：margin-left:auto 只在 flex 容器里对 flex item 有效；普通 block 里行为不同。',
          },
          {
            type: 'code',
            title: 'Demo：两种 Spacer 写法',
            language: 'html',
            live: true,
            body: `<style>
  /* 顶栏行：flex 横排 + 垂直居中 */
  .bar {
    display: flex;
    align-items: center; /* 标题和按钮垂直居中 */
    padding: 8px 12px;
    border: 1px solid #e6ddd0;
    margin-bottom: 8px; /* 两行 demo 之间间距 */
  }
  /* 写法 A：空 div 当 Spacer，flex:1 吃掉中间所有剩余空间 */
  .spacer { flex: 1; }
</style>

<!-- 写法 A：标题 | 空占位(flex:1) | 按钮 —— 按钮被推到最右 -->
<div class="bar">
  <strong>标题</strong>
  <div class="spacer"></div>
  <button>操作</button>
</div>

<!-- 写法 B：margin-left:auto 在 flex 主轴上把元素推到底（row 时推最右），代码更短 -->
<div class="bar">
  <strong>标题</strong>
  <button style="margin-left: auto">操作</button>
</div>`,
          },
          {
            type: 'text',
            title: '8. min-width:0：flex 文本截断的高频搭档',
            body: '是什么：flex 子项默认 min-width:auto（约等于内容最小宽度），长文本可能把布局撑破，text-overflow:ellipsis 失效。\n\n特点：给需要收缩的文本容器加 min-width:0（column 主轴场景常用 min-height:0），再配合 overflow:hidden + text-overflow:ellipsis。\n\n为什么：卡片列表「固定头像 + 自适应文字 + 省略号」几乎必写 min-width:0。\n\n易错：只写 ellipsis 不写 min-width:0 → 省略号不出现，文字把 flex 行撑开。',
          },
          {
            type: 'code',
            title: 'Demo：防止文字撑破 flex 行',
            language: 'html',
            live: true,
            body: `<style>
  /* 卡片行：固定图标 + 自适应文字（Feed 列表最常见结构） */
  .card {
    display: flex; /* 横排：图标 | 文字 */
    width: 280px; /* 限制卡片总宽，才能演示文字被截断 */
    gap: 8px;
    border: 1px solid #ccc;
    padding: 8px;
  }
  .icon {
    flex-shrink: 0; /* 图标不要被挤扁，始终保持 40px */
    width: 40px;
    background: #2f6b4f;
    color:#fff;
    text-align:center;
  }
  .text {
    flex: 1; /* 吃掉剩余宽度（Expanded） */
    min-width: 0; /* ★ 关键：允许比文字内容更窄，否则 ellipsis 永远不触发 */
    overflow: hidden; /* 超出部分裁切隐藏 */
    white-space: nowrap; /* 不换行，单行省略才有效 */
    text-overflow: ellipsis; /* 超出显示 … */
  }
</style>

<div class="card">
  <div class="icon">图</div>
  <div class="text">很长很长很长很长很长很长的标题文字</div>
</div>`,
          },
          {
            type: 'list',
            title: '子项属性速查',
            ordered: true,
            items: [
              'flex:1 → 吃剩余（Expanded）',
              'flex-shrink:0 → 固定项不被挤扁',
              'align-self → 单独改交叉轴对齐',
              'margin-left:auto → Spacer 效果（row 时推右）',
              'min-width:0 → 文本 ellipsis 必备',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'grow 管放大，shrink 管缩小，basis 管理想尺寸；flex:1 ≈ Expanded。flex-shrink:0 保固定项；align-self 单独对齐；Spacer = 空 flex:1 或 margin-left:auto；文本截断记得 min-width:0。',
          },
        ],
      },
    },
    {
      id: 'flutter-row-column',
      title: '对照 Flutter：Row / Column 怎么映射',
      summary: '把已学的 Flex 属性和 Flutter 的 MainAxis/CrossAxis 对上号',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'Row = display:flex + flex-direction:row；Column = flex + column。MainAxisAlignment → justify-content；CrossAxisAlignment → align-items。Expanded → flex:1；Spacer → 空 flex:1 或 margin-left:auto。',
          },
          {
            type: 'text',
            title: '1. 是什么：两套语法，同一套布局思维',
            body: 'Flutter 用 Widget 树描述 UI：Row/Column 是容器，MainAxisAlignment/CrossAxisAlignment 管对齐，Expanded 吃剩余空间。\n\nCSS Flex 是同一套「一维弹性布局」思想的不同写法：display:flex 开启容器，flex-direction 选 Row 还是 Column，justify-content / align-items 管两条轴，flex:1 管剩余空间分配。\n\n如果你已经会 Flutter 布局，学 CSS Flex 不是从零开始——主要是把熟悉的概念映射到新的属性名上。',
          },
          {
            type: 'text',
            title: '1. 为什么：对照学能少踩「属性名陌生」的坑',
            body: 'Flutter 里写 MainAxisAlignment.spaceBetween，CSS 里写 justify-content:space-between——名字不同，视觉效果几乎一样。\n\n常见迁移场景：把 Flutter 个人页顶栏改成 Web 顶栏；把 Flutter 卡片列表改成 HTML feed。对照表让你看到 HTML 该写哪几行 CSS，而不是重新理解布局原理。',
          },
          {
            type: 'table',
            title: 'Flutter ↔ CSS Flex 完整对照表',
            intro: '从左到右：Flutter Widget/属性 → 等价的 CSS。',
            headers: ['Flutter', 'CSS Flex', '说明'],
            rows: [
              ['Row(...)', 'display:flex; flex-direction:row;', '横排（row 可省略）'],
              ['Column(...)', 'display:flex; flex-direction:column;', '竖排'],
              ['Wrap(...)', 'flex-wrap:wrap; gap:...;', '换行 + 间距'],
              ['MainAxisAlignment.start', 'justify-content:flex-start;', '主轴起点'],
              ['MainAxisAlignment.center', 'justify-content:center;', '主轴居中'],
              ['MainAxisAlignment.end', 'justify-content:flex-end;', '主轴终点'],
              ['MainAxisAlignment.spaceBetween', 'justify-content:space-between;', '两端对齐'],
              ['MainAxisAlignment.spaceAround', 'justify-content:space-around;', '两侧留空'],
              ['MainAxisAlignment.spaceEvenly', 'justify-content:space-evenly;', '空隙均等'],
              ['CrossAxisAlignment.start', 'align-items:flex-start;', '交叉轴起点'],
              ['CrossAxisAlignment.center', 'align-items:center;', '交叉轴居中'],
              ['CrossAxisAlignment.end', 'align-items:flex-end;', '交叉轴终点'],
              ['CrossAxisAlignment.stretch', 'align-items:stretch;', '交叉轴拉满'],
              ['Expanded(child: w)', '子项 { flex: 1; }', '吃剩余空间'],
              ['Expanded(flex: 2, ...)', '子项 { flex: 2; }', '按 2 份分'],
              ['Spacer()', '空 div { flex:1 } 或 margin-left:auto', '推走后续元素'],
              ['SizedBox(width: 12)', 'gap:12px / width / flex-basis', '固定间距或尺寸'],
            ],
          },
          {
            type: 'text',
            title: '2. 怎么用：从 Flutter 代码反推 CSS',
            body: '步骤：\n① 找到最外层 Row/Column → 对应元素加 display:flex + direction。\n② 看 mainAxisAlignment → 写 justify-content。\n③ 看 crossAxisAlignment → 写 align-items。\n④ 看 children 里有没有 Expanded → 对应子项 flex:1。\n⑤ 看 mainAxisSize：Flutter Row 默认 max（撑满），CSS flex 容器 width:auto 时也常撑满——类似。\n\n易错：Flutter 的 padding 在 Container 上；CSS 里 padding 写在同一个元素或子元素上，别漏层。',
          },
          {
            type: 'code',
            title: 'Demo：同一 UI——Flutter 思维 → HTML',
            language: 'html',
            live: true,
            body: `<!-- 下面 HTML 等价于 Flutter Row + spaceBetween + center + Expanded 的个人资料行 -->
<!-- Flutter 等价写法：
Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [
    CircleAvatar(radius: 20),
    Expanded(child: Text('小明')),
    TextButton(child: Text('关注')),
  ],
)
-->
<style>
  .profile {
    display: flex; /* Row：横排容器 */
    flex-direction: row; /* 主轴水平（可省略，flex 默认就是 row） */
    justify-content: space-between; /* MainAxisAlignment.spaceBetween：两端对齐 */
    align-items: center; /* CrossAxisAlignment.center：垂直居中 */
    gap: 12px; /* 子项间距，类似 Flutter SizedBox 或 spacing */
    padding: 12px 16px;
    border: 1px solid #e6ddd0;
    border-radius: 12px;
  }
  .avatar {
    width: 40px; height: 40px; /* 固定 40×40 圆形头像 */
    border-radius: 50%; /* 50% 圆角 = 正圆 */
    background: #2f6b4f;
    flex-shrink: 0; /* 头像不被挤扁（固定尺寸项） */
  }
  .name {
    flex: 1; /* Expanded：吃掉中间剩余空间 */
    min-width: 0; /* 若名字很长，配合 ellipsis 需要这行（本 demo 名字短可省略效果） */
  }
</style>

<div class="profile">
  <div class="avatar"></div>
  <span class="name">小明</span>
  <button>关注</button>
</div>`,
          },
          {
            type: 'list',
            title: '对照记忆口诀',
            ordered: true,
            items: [
              'Row/Column → flex-direction',
              'MainAxis → justify-content',
              'CrossAxis → align-items',
              'Expanded → flex:1',
              'Wrap → flex-wrap + gap',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'Flutter 的 Row/Column/Wrap/Expanded/Spacer，在 CSS 里就是 flex-direction / wrap / flex:1 / margin-left:auto。轴的名字换了，布局直觉不用换。',
          },
        ],
      },
    },
    {
      id: 'flutter-stack',
      title: '对照 Flutter：Stack、定位与 sticky 吸顶',
      summary:
        'relative/absolute/fixed/sticky 全讲透；角标、封面、吸顶导航可编辑 Demo',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'Stack ≈ 父 `position:relative`；Positioned ≈ 子 `absolute` + 四边偏移。`fixed` 钉死在视口；`sticky` 是「滚到阈值才吸住」——吸顶导航、表头最常用。父级忘记 `relative` 是 absolute 最高频 bug；sticky 不生效多半是祖先 `overflow` 裁掉了粘滞。',
          },
          {
            type: 'text',
            title: '1. 是什么：Stack 式层叠布局',
            body: 'Flutter Stack 让多个 child 叠在同一区域，用 Positioned 或 Align 决定每个 child 的位置。\n\nCSS 里没有名叫 Stack 的属性，但用「定位（position）」可以实现同样效果：\n• 父容器 position:relative —— 建立定位参考系（像 Stack 的边界）。\n• 子元素 position:absolute + top/left/right/bottom —— 相对父容器定位（像 Positioned）。\n• z-index 控制层叠顺序（谁在上）。',
          },
          {
            type: 'text',
            title: '1. position 五个值：各自干什么',
            body: '**`static`（默认）**：正常文档流，`top`/`left` 无效，不能当 absolute 的参考祖先。\n\n**`relative`**：相对自己原来的位置偏移，仍占着原来的坑。最常用来当 Stack 容器——本身不一定偏移，只是「我成为定位上下文」。\n\n**`absolute`**：脱离文档流，相对「最近的非 static 祖先」定位；找不到则相对初始包含块（常是 viewport）。\n\n**`fixed`**：相对**视口**定位，页面怎么滚它都钉在屏幕上——回到顶部按钮、全局悬浮客服。\n\n**`sticky`（粘性定位）**：滚动过程中的「两段人生」——还没碰到阈值时像 `relative` 待在文档流里；一旦滚到 `top`/`bottom`/`left`/`right` 设定的阈值，就表现得像 `fixed` 吸在那里，直到它的**包含块**滚出视野才松开。',
          },
          {
            type: 'table',
            title: 'position 值对比',
            headers: ['值', '是否脱离文档流', '定位参考', '典型用途'],
            rows: [
              ['static', '否', '无', '默认，正常排版'],
              ['relative', '否（仍占位）', '自身原位置', 'Stack 容器、微调偏移'],
              ['absolute', '是', '最近定位祖先', '角标、浮层、Positioned'],
              ['fixed', '是', '视口', '固定导航、回到顶部'],
              ['sticky', '特殊（先占位后吸住）', '最近滚动祖先 + 阈值', '吸顶导航、表头、章节标题'],
            ],
          },
          {
            type: 'text',
            title: '2. 为什么：Flex 管「排成一行/列」，Stack 管「叠在一起」',
            body: '头像角标、图片上的播放按钮、卡片右上角的「新」标签——这些都不是 flex 横排能优雅解决的，而是「底图 + 绝对定位 overlay」。\n\nFlutter 里你本能用 Stack；Web 里对应 relative + absolute。两套语法，场景相同。',
          },
          {
            type: 'code',
            title: 'Demo：头像角标（Stack + Positioned 等价）',
            language: 'html',
            live: true,
            body: `<style>
  /* Stack 容器：position:relative 建立定位参考系，absolute 子元素相对它定位 */
  .wrap {
    position: relative; /* 像 Flutter Stack，成为子元素 absolute 的「锚点」 */
    width: 56px; height: 56px; /* 固定尺寸，否则 absolute 子项可能撑不开父级 */
  }
  .avatar {
    width: 56px; height: 56px;
    border-radius: 50%; /* 圆形头像 */
    background: #2f6b4f;
  }
  /* Positioned(top:0, right:0) 等价：角标钉在右上角 */
  .badge {
    position: absolute; /* 脱离文档流，相对最近的 non-static 祖先（这里是 .wrap）定位 */
    top: 0; right: 0; /* 上边缘、右边缘与 .wrap 对齐 */
    width: 14px; height: 14px;
    border-radius: 50%; /* 小红点 */
    background: #c53030;
    border: 2px solid #fff; /* 白边让角标和头像区分开 */
  }
</style>
<!-- .wrap 是 Stack；.avatar 是底图；.badge 是右上角角标 -->
<div class="wrap">
  <div class="avatar"></div>
  <span class="badge"></span>
</div>`,
          },
          {
            type: 'text',
            title: '3. 怎么用：cover 封面、居中浮层',
            body: '铺满父容器：absolute 子项写 top:0; left:0; right:0; bottom:0;（四边钉死，类似 Positioned.fill）。\n\n居中浮层：absolute + top:50%; left:50%; transform:translate(-50%,-50%)，或 Flex 居中（父 relative 里再套一层 flex 居中）。\n\nz-index：数值大的在上；同级才比 z-index，不同 stacking context 另说（初学先记「角标 z-index:1」够用了）。',
          },
          {
            type: 'code',
            title: 'Demo：图片封面 + 居中播放按钮',
            language: 'html',
            live: true,
            body: `<style>
  /* 封面区域：relative 容器 + 渐变背景模拟视频封面 */
  .cover {
    position: relative; /* 播放按钮 absolute 相对这个盒子定位 */
    width: 200px; height: 120px;
    border-radius: 12px;
    background: linear-gradient(135deg, #2f6b4f, #5c9a78); /* 135° 斜向渐变 */
  }
  /* 居中播放按钮：50%+50% 定位再 translate 拉回自身中心（经典居中技巧） */
  .play {
    position: absolute;
    top: 50%; left: 50%; /* 元素的左上角移到容器中心 */
    transform: translate(-50%, -50%); /* 再向左上移动自身宽高的 50%，实现真正居中 */
    width: 44px; height: 44px;
    border-radius: 50%;
    background: rgba(255,255,255,0.9); /* 半透明白底 */
    display: flex; align-items: center; justify-content: center; /* flex 让 ▶ 在圆里居中 */
    font-size: 18px;
  }
</style>
<div class="cover">
  <div class="play">▶</div>
</div>`,
          },
          {
            type: 'text',
            title: '4. sticky 吸顶：是什么、和 fixed 差在哪',
            body: '**是什么**：`position: sticky` 让元素在滚动时「粘」在容器里的某个位置。必须配合 `top` / `bottom` / `left` / `right` 之一作为阈值，例如 `top: 0` 表示滚到贴视口顶就吸住。\n\n**和 fixed 的关键差别**：\n- `fixed`：一开始就钉在视口上，**不占文档流位置**（后面内容要自己加 padding 躲开）。\n- `sticky`：平时仍在文档流里占位；只有滚过阈值才吸住；当它的父级整块滚出屏幕时，sticky 元素也会一起被带走（不会永远钉在屏幕上）。\n\n**典型场景**：顶部导航吸顶、表格表头吸顶、长文每个章节的小标题吸顶、电商详情「商品/评价/详情」锚点条。',
          },
          {
            type: 'text',
            title: '4. sticky 怎么写才生效（易错必看）',
            body: '**生效条件（缺一不可的直觉版）：**\n1. 写了 `position: sticky`\n2. 写了至少一个阈值：通常 `top: 0`（或 `top: 56px` 躲开更高的固定栏）\n3. 祖先没有把粘滞「掐死」——最常见凶手是祖先设了 `overflow: hidden / auto / scroll`（会创建新的滚动包含块，sticky 相对它粘，看起来像「坏了」）\n4. 父级还要有足够高度让你「滚得动」——父级刚好和 sticky 一样高，没有滚动空间，也就粘不住\n\n**和 Flutter 对照**：类似「滚到一定位置再固定」的 SliverAppBar / sticky header 插件；Web 用纯 CSS 就能做基础吸顶。',
          },
          {
            type: 'code',
            title: 'Demo：sticky 吸顶导航（请向下滚动预览区）',
            language: 'html',
            live: true,
            body: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }

  /* 普通顶栏内容：先占位，不吸顶 */
  .banner {
    padding: 24px 16px;
    background: #d9ebe1;
  }

  /* ★ sticky 吸顶条 */
  .sticky-nav {
    position: sticky;   /* 粘性定位 */
    top: 0;             /* 阈值：滚到贴视口顶部就吸住（必写！） */
    z-index: 20;        /* 盖住后面滚上来的内容 */
    padding: 12px 16px;
    background: #2f6b4f;
    color: #fff;
    display: flex;
    gap: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  }
  .sticky-nav a { color: #fff; text-decoration: none; font-size: 13px; }

  .block {
    height: 100px;
    margin: 12px 16px;
    border-radius: 8px;
    background: #eef6f1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #5c6b62;
  }
  .hint { padding: 8px 16px; font-size: 12px; color: #5c6b62; }
</style>

<div class="banner">我是普通横幅 —— 先把我滚出去</div>

<nav class="sticky-nav">
  <strong>吸顶导航</strong>
  <a href="#">首页</a>
  <a href="#">课程</a>
  <a href="#">关于</a>
</nav>

<p class="hint">继续向下滚：导航会粘在顶部；若把 top:0 删掉，sticky 会失效。</p>
<div class="block">内容块 1</div>
<div class="block">内容块 2</div>
<div class="block">内容块 3</div>
<div class="block">内容块 4</div>
<div class="block">内容块 5</div>`,
          },
          {
            type: 'code',
            title: 'Demo：sticky vs fixed 对照 + 祖先 overflow 坑',
            language: 'html',
            live: true,
            body: `<style>
  * { box-sizing: border-box; }
  body { margin: 0; font: 13px/1.5 system-ui, sans-serif; }

  .row { display: flex; gap: 12px; padding: 12px; height: 260px; }
  .col {
    flex: 1;
    border: 1px solid #9bb5a6;
    border-radius: 8px;
    overflow: auto;           /* 各自内部滚动 */
    background: #f7faf8;
  }
  .col h3 { margin: 8px; font-size: 13px; }

  .fixed-bar {
    position: fixed;          /* 相对整个预览视口钉死 */
    right: 16px;
    bottom: 16px;
    padding: 8px 12px;
    background: #c53030;
    color: #fff;
    border-radius: 999px;
    z-index: 99;
    font-size: 12px;
  }

  .sticky-h {
    position: sticky;
    top: 0;
    background: #2f6b4f;
    color: #fff;
    padding: 8px;
  }

  /* ❌ 易错：外层再包一层 overflow:hidden 时，里面的 sticky 可能不符合预期 */
  .broken {
    overflow: hidden;         /* 常见坑：裁切 / 改变 sticky 参照 */
    height: 120px;
    border: 1px dashed #c53030;
    margin: 8px;
  }
  .broken .sticky-h { background: #92400e; }

  .pad { height: 80px; margin: 8px; background: #eef6f1; border-radius: 6px; }
</style>

<div class="row">
  <div class="col">
    <h3>左：正常 sticky（滚我）</h3>
    <div class="sticky-h">我 sticky top:0</div>
    <div class="pad"></div><div class="pad"></div><div class="pad"></div>
  </div>
  <div class="col">
    <h3>右：祖先 overflow 干扰</h3>
    <div class="broken">
      <div class="sticky-h">被 overflow:hidden 包住</div>
      <div class="pad"></div><div class="pad"></div>
    </div>
    <p style="padding:8px;color:#5c6b62;font-size:12px;">
      右栏外层还能滚，但 broken 里的 sticky 粘滞范围被限制 —— 开发里很常见。
    </p>
  </div>
</div>

<div class="fixed-bar">fixed 悬浮钮</div>`,
          },
          {
            type: 'list',
            title: '定位 / sticky 易错清单',
            ordered: true,
            items: [
              '父级忘记 position:relative → absolute 子项跑到更外层或 viewport',
              'absolute 子项不撑开父高度 → 父要自己设 height 或非 absolute 内容撑开',
              'sticky 忘写 top/bottom/left/right → 完全不吸顶',
              '祖先 overflow: hidden/auto/scroll → sticky「失灵」或粘错容器',
              '父级高度不够 → 没有滚动空间，sticky 表现不出来',
              '误用 fixed 当吸顶 → 不占位，内容会被挡，还要自己垫 padding',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'Stack = relative 父 + absolute 子。吸顶用 sticky + top（别忘阈值）；永久钉屏幕用 fixed。sticky 不生效先查祖先 overflow，再查有没有 top。',
          },
        ],
      },
    },
    {
      id: 'flutter-scroll',
      title: '对照 Flutter：滑动列表',
      summary: 'overflow + 固定宽高；横向滚、纵向滚',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'ListView / SingleChildScrollView ≈ 容器有明确宽或高 + overflow:auto/scroll。整页滚动浏览器自带；局部滚动必须自己限高（或限宽）。',
          },
          {
            type: 'text',
            title: '1. 是什么：Web 里的「可滚动区域」',
            body: 'Flutter 里 ListView、SingleChildScrollView 明确告诉框架「这块区域可以滚」。\n\nWeb 里默认：body 内容超出视口时，整页由浏览器滚动（不需要你写 ListView）。\n\n局部滚动（聊天列表、侧栏菜单、横向 chips）：你要自己创建一个「有固定尺寸 + overflow 可滚」的盒子——内容超出时出现滚动条。',
          },
          {
            type: 'text',
            title: '1. 为什么：overflow 不生效，99% 是没限高',
            body: '容器 height:auto 时会随内容长高——没有「超出」的概念，overflow:auto 就不会出滚动条。\n\n必须：height:200px 或 max-height:200px 或父级 flex:1 + min-height:0（见 holy-layout 案例）——给滚动区一个「天花板」。\n\nFlutter 对照：ListView 外层常有 Expanded 或 SizedBox 限高；CSS 同理，滚动容器要有 bounded 高度。',
          },
          {
            type: 'table',
            title: 'overflow 常用值',
            headers: ['值', '含义', '典型场景'],
            rows: [
              ['visible（默认）', '超出部分画在外面，不裁切', '一般布局'],
              ['hidden', '超出裁切，无滚动条', 'ellipsis、裁切图片'],
              ['auto', '需要时才出现滚动条', '列表、侧栏（最常用）'],
              ['scroll', '始终显示滚动条轨道', '明确告诉用户可滚'],
            ],
          },
          {
            type: 'text',
            title: '2. 纵向列表：ListView 等价写法',
            body: '是什么：固定高度的容器 + overflow-y:auto + 多个子项堆叠。\n\n特点：overflow-y 管垂直；overflow-x 通常 hidden 避免横向溢出。\n\nFlutter 对照：ListView(children:[...]) 或 ListView.builder 包在 SizedBox(height:200) 里。\n\n易错：忘了 height → 容器被内容撑开，永远滚不动。',
          },
          {
            type: 'code',
            title: 'Demo：纵向列表滚动',
            language: 'html',
            live: true,
            body: `<style>
  /* 纵向可滚列表：等价 Flutter ListView 包在固定高度里 */
  .list {
    height: 200px; /* ★ 必须有明确高度，否则容器随内容长高，不会出现「超出」 */
    overflow-y: auto; /* 内容超出时，垂直方向出现滚动条（需要时才显示） */
    border: 1px solid #e6ddd0;
    border-radius: 8px;
  }
  .item {
    padding: 12px; /* 每行内边距 */
    border-bottom: 1px solid #f0ebe3; /* 行间分割线 */
  }
</style>
<!-- 8 个列表项，总高度超过 200px，.list 内部可滚动 -->
<div class="list">
  <div class="item">1</div><div class="item">2</div>
  <div class="item">3</div><div class="item">4</div>
  <div class="item">5</div><div class="item">6</div>
  <div class="item">7</div><div class="item">8</div>
</div>`,
          },
          {
            type: 'text',
            title: '3. 横向滚动：SingleChildScrollView(scrollDirection: horizontal)',
            body: '是什么：flex 横排 + overflow-x:auto + 子项 flex:0 0 auto（或不收缩），让内容总宽超出容器宽。\n\n特点：常用于标签 chips、图片横滑、Tab 过多时。\n\nFlutter 对照：SingleChildScrollView(scrollDirection: Axis.horizontal, child: Row(...))。\n\n易错：子项被 flex-shrink 挤扁 → 加 flex-shrink:0 或 flex:0 0 auto；white-space:nowrap 防止文字换行。',
          },
          {
            type: 'code',
            title: 'Demo：横向 chips 滚动',
            language: 'html',
            live: true,
            body: `<style>
  /* 横向 chips：等价 SingleChildScrollView(scrollDirection: horizontal) + Row */
  .chips {
    display: flex; /* 横排所有 chip */
    gap: 8px;
    overflow-x: auto; /* 总宽超出容器时出现横向滚动条 */
    overflow-y: hidden; /* 禁止纵向溢出滚动 */
    padding: 4px 0;
  }
  .chip {
    flex: 0 0 auto; /* 不放大不缩小，保持内容固有宽度（不被 flex 挤扁） */
    white-space: nowrap; /* 文字不换行，保证每个 chip 是单行 */
    padding: 8px 14px;
    border-radius: 999px; /* 超大圆角 = 胶囊形 */
    background: #eef6f1;
  }
</style>
<!-- 多个 chip 总宽度超过屏幕/容器时，可左右滑动 -->
<div class="chips">
  <span class="chip">推荐</span>
  <span class="chip">热门</span>
  <span class="chip">布局</span>
  <span class="chip">Flex 详解</span>
  <span class="chip">选择器</span>
  <span class="chip">盒子模型</span>
  <span class="chip">Stack 定位</span>
</div>`,
          },
          {
            type: 'list',
            title: '滚动区自检',
            ordered: true,
            items: [
              '局部滚动是否给了 height 或 max-height？',
              'flex 嵌套滚动是否加了 min-height:0？',
              '横向滚子项是否 flex-shrink:0？',
              '整页滚 vs 局部滚：是否只需要 body 默认行为？',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '局部滚 = 限高（或限宽）+ overflow:auto。纵向 overflow-y，横向 flex 横排 + overflow-x。Flex 骨架里滚不动 → 查 min-height:0。',
          },
        ],
      },
    },
    {
      id: 'case-navbar',
      title: '小案例 1：顶栏（Row + Spacer）',
      summary: '综合运用 flex、对齐、margin-left:auto',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '顶栏 = display:flex + align-items:center + gap；右端按钮用 margin-left:auto 推过去（≈ Spacer + 右侧 Widget）。',
          },
          {
            type: 'text',
            title: '1. 是什么：典型 AppBar / 导航栏布局',
            body: '几乎所有 Web/App 顶栏都是同一结构：左侧 Logo/返回，中间或左侧菜单链接，右侧登录/设置按钮。\n\nFlutter 写法常是 Row + Spacer() + 右侧按钮。CSS 等价：header 设 display:flex，子项 align-items:center，登录按钮 margin-left:auto。',
          },
          {
            type: 'text',
            title: '2. 用到的知识点',
            body: 'display:flex —— 开启横向 flex 容器（默认 row）。\n\nalign-items:center —— 交叉轴垂直居中，Logo/链接/按钮 baseline 对齐。\n\ngap:16px —— 子项间距，比逐个 margin 干净。\n\nmargin-left:auto —— 在主轴(row)上把该 flex item 推到最右，等价于前面塞一个 Spacer。\n\nbox-sizing:border-box —— reset 里全局设，padding 不会撑破顶栏高度计算。',
          },
          {
            type: 'text',
            title: '3. 为什么不用 justify-content:space-between',
            body: 'space-between 也可以做「两端对齐」，但中间多个菜单链接会被均分到整行——有时不是你想要的。\n\n更常见模式：左侧 Logo+菜单自然靠左成组，只把「登录」推到最右 → margin-left:auto 只推最后一个，中间菜单保持紧凑。\n\n也可用「左侧一组 flex + 空 div flex:1 + 右侧按钮」——两种 Spacer 写法，见 flex-item-props 节。',
          },
          {
            type: 'code',
            title: 'Demo：完整顶栏代码',
            language: 'html',
            live: true,
            body: `<!DOCTYPE html>
<!-- 完整 HTML 文档结构：顶栏案例 -->
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <style>
    /* 全局 reset：统一盒模型、去掉默认 margin */
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; } /* 系统默认无衬线字体 */
    .nav {
      display: flex; /* Row：顶栏横排 Logo + 菜单 + 按钮 */
      align-items: center; /* 交叉轴垂直居中，Logo/链接/按钮对齐 */
      gap: 16px; /* 子项间距 */
      padding: 12px 20px; /* 上下 12、左右 20 内边距 */
      border-bottom: 1px solid #e6ddd0; /* 底部分割线 */
    }
    .brand { font-weight: 700; text-decoration: none; color: #1f2a24; } /* Logo 链接样式 */
    /* 菜单本身再套一层 flex，让多个链接横排 */
    .menu { display: flex; gap: 16px; }
    .menu a { color: #5c6b63; text-decoration: none; font-size: 14px; }
    .btn {
      margin-left: auto; /* ★ Spacer 效果：在主轴上把按钮推到最右（≈ Flutter Spacer） */
      padding: 8px 14px; border: 0; border-radius: 8px;
      background: #2f6b4f; color: #fff; cursor: pointer; /* 手型光标表示可点击 */
    }
  </style>
</head>
<body>
  <!-- header：页面头部语义标签 -->
  <header class="nav">
    <a class="brand" href="#">Web Study</a>
    <!-- nav：导航链接组 -->
    <nav class="menu">
      <a href="#">首页</a><a href="#">课程</a><a href="#">关于</a>
    </nav>
    <button class="btn">登录</button>
  </header>
</body>
</html>`,
          },
          {
            type: 'list',
            title: '练习建议',
            ordered: true,
            items: [
              '把 margin-left:auto 改成空 div.flex:1，对比效果',
              '加 flex-shrink:0 到 .btn，窄屏时按钮不被挤扁',
              '菜单 .menu 也加 margin-left:auto，观察与只推按钮的差别',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '顶栏 flex 横排 + align-items:center；要「只把右边推走」用 margin-left:auto，不是 space-between 包打天下。',
          },
        ],
      },
    },
    {
      id: 'case-card-list',
      title: '小案例 2：卡片列表（Expanded 文字区）',
      summary: '固定头像 + flex:1 文本 + 省略号',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '卡片行 = flex 横排 + 固定宽头像(flex-shrink:0) + 文字区(flex:1 + min-width:0 + ellipsis)。缺 min-width:0 省略号不生效。',
          },
          {
            type: 'text',
            title: '1. 是什么：Feed 流 / 消息列表单行卡片',
            body: '社交 App、新闻列表、通知中心——每条都是「左侧固定图标/头像 + 右侧自适应文字」。\n\nFlutter 典型写法：Row(children:[固定 Avatar, Expanded(child: Column(...))])。\n\nCSS 等价：.card { display:flex }，.avatar 固定宽高 + flex-shrink:0，.content { flex:1; min-width:0 }。',
          },
          {
            type: 'text',
            title: '2. 为什么必须 min-width:0',
            body: 'flex 子项默认 min-width:auto，浏览器不允许它比内容更窄——长标题会把整行撑开，text-overflow:ellipsis 永远不会触发。\n\n加 min-width:0 等于告诉浏览器：「允许我比文字内容窄，请截断。」再配合 overflow:hidden + white-space:nowrap + text-overflow:ellipsis。\n\n这是 Web 卡片列表最高频坑之一，Flutter Expanded 里 Text overflow:ellipsis 有时「开箱即用」，CSS 要多这一步。',
          },
          {
            type: 'text',
            title: '3. 外层 feed 容器',
            body: '多条卡片纵向堆：.feed { display:flex; flex-direction:column; gap:12px } —— 等价 Flutter Column + 间距。\n\nmax-width:480px 限制阅读宽度，大屏居中时常见。',
          },
          {
            type: 'code',
            title: 'Demo：完整卡片列表',
            language: 'html',
            live: true,
            body: `<style>
  * { box-sizing: border-box; } /* 全局 border-box，width 计算更直观 */
  /* Feed 外层：Column 纵向堆多条卡片 */
  .feed {
    max-width: 480px; /* 限制阅读宽度，大屏上不会过宽 */
    display: flex;
    flex-direction: column; /* 主轴垂直：卡片从上到下排列 */
    gap: 12px; /* 卡片之间的间距 */
  }
  /* 单条卡片：Row 横排 头像 + 文字区 */
  .card {
    display: flex;
    gap: 12px;
    padding: 14px;
    border: 1px solid #e6ddd0;
    border-radius: 12px;
    background: #fff;
  }
  .avatar {
    width: 48px; height: 48px;
    border-radius: 12px; /* 圆角方形头像 */
    background: #2f6b4f;
    flex-shrink: 0; /* 固定 48px，不被文字区挤扁 */
  }
  .content {
    flex: 1; /* Expanded：文字区吃掉剩余宽度 */
    min-width: 0; /* ★ 允许比文字更窄，ellipsis 才能生效 */
  }
  .title { font-weight: 600; } /* 标题加粗 */
  .desc {
    margin-top: 4px; /* 标题与描述之间小间距 */
    font-size: 13px;
    color: #5c6b63; /* 次要文字灰色 */
    white-space: nowrap; /* 单行不换行 */
    overflow: hidden; /* 超出隐藏 */
    text-overflow: ellipsis; /* 超出显示省略号 … */
  }
</style>
<!-- article：语义化表示一条独立内容（Feed 里的一条） -->
<div class="feed">
  <article class="card">
    <div class="avatar"></div>
    <div class="content">
      <div class="title">学习 Flex</div>
      <div class="desc">长文字会被省略号收起长文字会被省略号收起……</div>
    </div>
  </article>
  <article class="card">
    <div class="avatar"></div>
    <div class="content">
      <div class="title">盒子模型</div>
      <div class="desc">border-box 让 width 计算更简单</div>
    </div>
  </article>
</div>`,
          },
          {
            type: 'list',
            title: '自检：省略号不出现时查什么',
            ordered: true,
            items: [
              '文字容器是否有 flex:1？',
              '是否写了 min-width:0？',
              '是否有 overflow:hidden + text-overflow:ellipsis？',
              '是否 white-space:nowrap（单行省略）？',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '固定图标 + flex:1 文字 + min-width:0 + ellipsis —— Feed 卡片四件套，缺最后一个 ellipsis 就罢工。',
          },
        ],
      },
    },
    {
      id: 'case-holy-layout',
      title: '小案例 3：后台骨架（固定侧栏 + 可滚主区）',
      summary: '嵌套 flex、min-height:0、overflow 综合题',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '全屏骨架 = 外层 column flex + 中间 body flex:1 + min-height:0 + 主区 overflow:auto。缺 min-height:0，主区永远滚不动。',
          },
          {
            type: 'text',
            title: '1. 是什么：Holy Grail / 后台 Admin 布局',
            body: '顶部固定 Header + 下方「左侧固定侧栏 + 右侧可滚动主内容」——后台管理系统、文档站、Dashboard 标配。\n\nFlutter 近似：Column(children:[AppBar, Expanded(child: Row(children:[固定 Drawer, Expanded(child: ListView(...))]))])。\n\nCSS 实现：#app 纵向 flex 占满 100vh；.body 横向 flex 吃剩余；.main overflow:auto 局部滚。',
          },
          {
            type: 'text',
            title: '2. 结构分层（从上到下）',
            body: '#app（column flex, height:100vh）\n├─ .top（flex-shrink:0，固定顶栏高度）\n└─ .body（flex:1, row flex, min-height:0）← 关键\n   ├─ .side（固定 width:200px, flex-shrink:0）\n   └─ .main（flex:1, overflow:auto）← 滚动发生在这里\n\nhtml, body, #app { height:100% } 保证百分比和 flex 有参照高度。',
          },
          {
            type: 'text',
            title: '3. 为什么写 min-height:0？',
            body: '是什么：flex 子项默认 min-height:auto，含义约等于「我不能比内容更矮」。\n\n问题：.body 里 .main 内容很长时，.body 会被内容撑高 → 超出 #app 的 100vh → 整页滚，而不是 .main 内部滚。\n\n解决：.body { flex:1; min-height:0 } —— 允许 flex 子项收缩到小于内容高度，把「溢出」交给 .main 的 overflow:auto 处理。\n\nFlutter 对照：Expanded 里的 ListView 能滚，是因为 Expanded 给了 bounded constraint；min-height:0 是 CSS 里类似的「允许收缩」信号。',
          },
          {
            type: 'code',
            title: 'Demo：完整后台骨架',
            language: 'html',
            live: true,
            body: `<style>
  * { box-sizing: border-box; margin: 0; }
  /* 让 html/body/#app 都能撑满高度，flex 百分比和 100vh 才有参照 */
  html, body, #app { height: 100%; }
  /* 最外层：Column 布局，占满整个视口高度 */
  #app {
    display: flex;
    flex-direction: column; /* 顶栏在上，body 在下 */
    height: 100vh; /* 100vh = 视口高度 100%，一屏高 */
  }
  .top {
    flex-shrink: 0; /* 顶栏高度由内容决定，flex 布局时不要被压缩 */
    padding: 12px 16px;
    background: #1f2a24;
    color: #fff;
  }
  /* 中间区域：Row 布局，侧栏 + 主区 */
  .body {
    flex: 1; /* 吃掉顶栏以下的全部剩余高度（≈ Expanded） */
    display: flex; /* 横向：侧栏 | 主区 */
    min-height: 0; /* ★ 关键：允许 flex 子项比内容更矮，把溢出交给 .main 滚动 */
  }
  .side {
    width: 200px; /* 侧栏固定宽 200px */
    flex-shrink: 0; /* 不要被主区挤窄 */
    background: #24352c;
    color: #c5d4cb;
    padding: 12px;
  }
  .main {
    flex: 1; /* 主区吃掉剩余宽度 */
    overflow: auto; /* 内容超出时在 .main 内部滚动，而不是整页滚 */
    padding: 16px;
    background: #fffaf3;
  }
  /* 模拟主区里的内容块 */
  .block {
    height: 120px;
    margin-bottom: 12px;
    background: #fff;
    border: 1px solid #e6ddd0;
    border-radius: 10px;
  }
</style>
<!-- 后台骨架：#app > .top + .body > .side + .main -->
<div id="app">
  <header class="top">后台</header>
  <div class="body">
    <aside class="side">菜单</aside>
    <main class="main">
      <div class="block"></div><div class="block"></div>
      <div class="block"></div><div class="block"></div>
      <div class="block"></div><div class="block"></div>
    </main>
  </div>
</div>`,
          },
          {
            type: 'list',
            title: '滚不动时排查顺序',
            ordered: true,
            items: [
              '滚动容器是否 overflow:auto/scroll？',
              '滚动容器是否有 flex:1 且祖先有 min-height:0？',
              '#app 是否 height:100vh 或等价限高？',
              '是否误在 body 上滚（整页滚）而非 .main 局部滚？',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '全屏 column → body flex:1 row → 侧栏固定 + 主区 flex:1 overflow:auto。flex 嵌套滚动必写 min-height:0，这是后台布局的分水岭。',
          },
        ],
      },
    },
    {
      id: 'layout-cheatsheet',
      title: '入门清单与速查',
      summary: '学完应能口头说出标签类型、box-sizing、常用选择器、Flex 主属性',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'display 定盒子类型和内部布局；border-box 省心算尺寸；class 选择器写样式；flex 先开容器再对齐；Flutter 概念能一一映射到 CSS。',
          },
          {
            type: 'text',
            title: '1. 自测：你应该能口头回答',
            body: '下面 6 题能流利答出，说明本章主干已掌握。答不出就回到对应小节，改 demo 里的数值做实验。',
          },
          {
            type: 'list',
            title: '6 道自测题',
            ordered: true,
            items: [
              'span 为什么设 width 往往没效果？（inline 不能设宽高 → display-common）',
              'border-box 和 content-box 占位差在哪？（width 是否含 padding+border → box-model-sizing）',
              '.card p 和 .card > p 差别？（后代 vs 子代 → css-selectors）',
              'justify-content 和 align-items 各管哪条轴？（主轴 vs 交叉轴，跟 flex-direction 走 → flex-full-guide）',
              'flex:1 干什么？（grow+shrink+basis 简写，≈ Expanded → flex-item-props）',
              '局部滚动为什么要限高度？flex 骨架里为什么要 min-height:0？（overflow + flex 收缩 → flutter-scroll / case-holy-layout）',
            ],
          },
          {
            type: 'table',
            title: 'Flutter → CSS 速查总表',
            intro: '本章对照精华，复习时扫一眼。',
            headers: ['Flutter', 'CSS', '章节'],
            rows: [
              ['Row / Column', 'flex-direction: row / column', 'flutter-row-column'],
              ['MainAxisAlignment.*', 'justify-content:*', 'flex-container-props'],
              ['CrossAxisAlignment.*', 'align-items:*', 'flex-container-props'],
              ['Expanded / Spacer', 'flex:1 / margin-left:auto', 'flex-item-props'],
              ['Wrap', 'flex-wrap:wrap + gap', 'flex-container-props'],
              ['Stack / Positioned', 'relative + absolute', 'flutter-stack'],
              ['ListView / 横向滚', 'overflow:auto + 限高/限宽', 'flutter-scroll'],
              ['Padding / margin', 'padding / margin', 'box-model-sizing'],
            ],
          },
          {
            type: 'table',
            title: 'display 与 Flex 决策速查',
            headers: ['需求', '用什么'],
            rows: [
              ['内部要对齐、gap、flex:1', 'display:flex 或 inline-flex'],
              ['整行区块', 'flex'],
              ['嵌在段落里的小按钮组', 'inline-flex'],
              ['二维网格商品墙', 'grid（后续学）'],
              ['元素消失不占位', 'display:none'],
            ],
          },
          {
            type: 'list',
            title: '怎么练才有手感',
            ordered: true,
            items: [
              '不要只看站内 demo——复制到本地 .html，改一个属性保存刷新',
              '实验顺序：先 flex-direction，再 justify-content，再给子项 flex:1',
              '每做一个案例（顶栏/卡片/骨架）对照 Flutter 写法说一遍映射',
              'Chrome DevTools → 审查元素 → 看盒模型、看 flex  overlay（Chrome 有 flex 调试）',
              '遇到「不生效」：先查 display:flex 有没有、选择器有没有选中、是不是优先级被盖',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'display 开布局，border-box 算尺寸，class 选中元素，flex 管一维排布，relative+absolute 管层叠，overflow+限高 管滚动。Flutter 会了，CSS 只是换名字——动手改 demo 比背表快十倍。',
          },
        ],
      },
    },
  ],
}

export default htmlLayout
