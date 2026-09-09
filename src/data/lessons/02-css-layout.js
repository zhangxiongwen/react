/**
 * HTML / CSS 布局章节（小白向，概念先讲透再上代码）
 */
const htmlLayout = {
  id: 'html-layout',
  title: 'CSS 布局与选择器（对照 Flutter）',
  summary:
    'display 常用值讲透（含 flex）；盒子模型、选择器与伪类；Flex 容器/子项属性；Grid 与响应式；再对照 Flutter 做案例',
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
              ['margin: 12px 24px;', '上下 12，左右 24', '`top/bottom=12px`；`left/right=24px`'],
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
      id: 'css-grid',
      title: 'CSS Grid 网格布局详解（Flex 之后的第二把武器）',
      summary:
        '一维 Flex vs 二维 Grid 怎么选；template-columns/rows、fr、repeat、minmax、auto-fit、gap、跨行跨列、命名区域、对齐，最后做自适应卡片墙',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'Flex 是「一条线上排队」，Grid 是「先画好格子再往里塞」。父级写 display:grid + grid-template-columns 定义列，子项不用写 width 就自动填格子；一维列表用 Flex，行列都要对齐的表格/后台骨架/卡片墙用 Grid。',
          },
          {
            type: 'text',
            title: '1. 为什么需要 Grid：Flex 的天花板在哪',
            body: '是什么：Grid（网格布局）是父容器上写 display:grid 后启用的二维布局系统——你先声明「几列、每列多宽、几行、每行多高」，子项再按顺序落进这些格子里。\n\nFlex 的痛点：Flex 只管一个方向。用 flex-wrap 换行做卡片列表时，第二行的列宽和第一行是各算各的，很难保证「第 2 列永远对齐」；每个卡片还得自己写 width: calc(33.33% - 8px) 这种减 gap 的丑公式。\n\nGrid 的解法：列宽由父级统一定义，子项一个 width 都不用写，gap 也不用从百分比里减——因为 1fr 分的是「减掉 gap 之后的剩余空间」。\n\n关键认知：Grid 不是来取代 Flex 的。真实项目里两者混用——外层骨架用 Grid，骨架里每一块内部的「图标 + 文字 + 按钮」还是用 Flex。',
          },
          {
            type: 'table',
            title: 'Grid 和 Flex 怎么选（对照表）',
            intro: '判断口诀：只关心「一条线上怎么排」用 Flex；同时关心「行和列都要对齐」用 Grid。',
            headers: ['场景', '选谁', '原因'],
            rows: [
              ['顶栏：Logo 左、按钮右', 'Flex', '一维分布，justify-content: space-between 一行搞定'],
              ['一行按钮组 / 标签 chips', 'Flex', '数量不定、内容宽度决定尺寸，Flex 更贴合'],
              ['卡片墙：每行 N 个，列要对齐', 'Grid', '列宽父级统一定义，行行对齐，还能自动换列'],
              ['后台骨架：顶栏 + 侧栏 + 主区 + 底栏', 'Grid', 'grid-template-areas 一眼看出版式，改版式只改父级'],
              ['表单：左标签右输入，标签列等宽', 'Grid', '两列网格天然等宽，不用给标签写死 width'],
              ['数据看板：某块跨 2 列 2 行', 'Grid', 'grid-column/grid-row 直接跨越，Flex 做不到'],
              ['内容宽度决定尺寸（自适应内容）', 'Flex', 'Grid 的列是父级说了算，反而不灵活'],
              ['文字截断行（图标 + 省略号文字）', 'Flex', 'flex:1 + min-width:0 是成熟套路'],
            ],
            note: '结论：外层版式（二维）用 Grid，内层内容（一维）用 Flex，这是现在最主流的组合。',
          },
          {
            type: 'text',
            title: '2. 三行入门：display:grid + grid-template-columns',
            body: '是什么：display:grid 让父元素变成网格容器（grid container），它的直接子元素自动变成网格子项（grid item）。grid-template-columns 声明「有几列、每列多宽」，写几个值就是几列。\n\n怎么写：grid-template-columns: 90px 90px 90px 就是三列各 90px；写成 1fr 1fr 1fr 就是三等分。\n\n为什么子项不写 width：子项的宽度由它所在的列决定。这是 Grid 和 Flex 手感上最大的差别——Flex 里你调子项的 flex/width，Grid 里你调父级的列定义。\n\n自动换行：子项个数超过列数时，Grid 会自动开新行（叫「隐式行」），不需要 flex-wrap。\n\n不写会怎样：只写 display:grid 不写 grid-template-columns → 默认只有一列，所有子项上下堆叠（这本身也是个常用效果，等于「竖排 + gap」）。',
          },
          {
            type: 'code',
            title: 'Demo：固定列宽 vs 1fr 弹性列（子项都没写 width）',
            language: 'html',
            live: true,
            body: `<style>
  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效。 */
  body { margin: 16px; font: 13px/1.6 system-ui, sans-serif; color: #1f2a24; }

  h4 { margin: 0 0 6px; font-size: 12px; color: #2f6b4f; } /* 小标题：区分两个对照块 */
  .block { margin-bottom: 18px; } /* 两个对照块之间拉开距离 */

  /* 写法 A：列宽写死 —— 容器变宽变窄，列宽都不变，右边会留空 */
  .g-fixed {
    display: grid; /* ★ 开启网格布局：直接子元素自动变成「网格子项」 */
    grid-template-columns: 90px 90px 90px; /* 声明 3 列，每列固定 90px（写几个值就是几列） */
    gap: 8px; /* 格子之间的间距，行间距和列间距都是 8px */
    padding: 8px;
    border: 1px dashed #ccc; /* 虚线框标出 grid 容器的范围，方便观察 */
  }

  /* 写法 B：1fr 弹性列 —— 列宽跟着容器一起伸缩，右边不留空 */
  .g-fr {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; /* 3 等分列：剩余宽度分成 3 份，每列吃 1 份 */
    gap: 8px;
    padding: 8px;
    border: 1px dashed #ccc;
  }

  /* 网格子项：注意这里一个 width 都没写，宽度完全由「列」决定 */
  .g-fixed > div,
  .g-fr > div {
    padding: 10px 0;
    text-align: center;
    background: #eef6f1;
    border-radius: 6px;
  }
</style>

<div class="block">
  <h4>A. grid-template-columns: 90px 90px 90px</h4>
  <!-- 5 个子项塞进 3 列 → Grid 自动开第二行（隐式行），不需要 flex-wrap -->
  <div class="g-fixed">
    <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div>
  </div>
</div>

<div class="block">
  <h4>B. grid-template-columns: 1fr 1fr 1fr</h4>
  <!-- 同样的 HTML，只改父级列定义，列宽就变成自适应 -->
  <div class="g-fr">
    <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div>
  </div>
</div>`,
          },
          {
            type: 'text',
            title: '3. fr 单位是什么（和百分比的关键区别）',
            body: '是什么：fr 是 fraction（份数）的缩写，只能在 Grid 的行列定义里用。1fr 的含义是「把可分配的剩余空间切成若干份，我要 1 份」。\n\n怎么算：grid-template-columns: 1fr 2fr 1fr，总份数 4 份，三列分别拿 25% / 50% / 25%——但这个百分比是对「减掉 gap 之后的剩余空间」算的。\n\n和 % 的区别（重点）：\n- 百分比是相对容器总宽算的，gap 要你自己减：33.33% 三列 + 8px gap = 100% + 16px → 溢出。\n- fr 天生就是「剩余空间」，gap 已经先被扣掉了，永远不溢出。\n\n还有一个坑：1fr 的最小值其实是 auto（约等于内容最小宽度），所以里面塞一段超长不换行文字时，列会被撑破。解法是 minmax(0, 1fr)，或给子项加 min-width: 0 —— 和 Flex 里的 min-width:0 是同一个道理。\n\nFlutter 对照：1fr 2fr 1fr ≈ Row 里三个 Expanded(flex: 1 / 2 / 1)。',
          },
          {
            type: 'code',
            title: 'Demo：fr 不溢出，33.33% + gap 会溢出',
            language: 'html',
            live: true,
            body: `<style>
  h4 { margin: 0 0 6px; font-size: 12px; color: #2f6b4f; }
  .block { margin-bottom: 18px; }

  /* 共用外框：故意加深色底，子项一旦溢出就能明显看出来 */
  .stage {
    padding: 8px;
    background: #f4f7f5;
    border: 1px solid #dfe7e2;
    border-radius: 6px;
    overflow-x: auto; /* 溢出时出现横向滚动条 —— 这就是「布局炸了」的信号 */
  }

  /* A：百分比列 + gap → 33.33%*3 = 100%，再加两个 8px gap 就超出容器 */
  .g-percent {
    display: grid;
    grid-template-columns: 33.33% 33.33% 33.33%; /* ✗ 百分比是相对容器总宽算的，没给 gap 留位置 */
    gap: 8px;
  }

  /* B：fr 列 + gap → fr 分的是「扣掉 gap 之后」的剩余空间，天生不溢出 */
  .g-fr {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; /* ✓ 推荐：gap 先扣，剩下的三等分 */
    gap: 8px;
  }

  /* C：不等份 —— 总份数 1+2+1=4 份，中间那列拿走一半 */
  .g-ratio {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr; /* 25% / 50% / 25%（对剩余空间而言） */
    gap: 8px;
  }

  .stage div > div {
    padding: 10px 0;
    text-align: center;
    background: #dfeee6;
    border-radius: 4px;
    font-size: 12px;
  }
</style>

<div class="block">
  <h4>A. 33.33% × 3 + gap 8px → 溢出（下面出现横向滚动条）</h4>
  <div class="stage">
    <div class="g-percent"><div>33.33%</div><div>33.33%</div><div>33.33%</div></div>
  </div>
</div>

<div class="block">
  <h4>B. 1fr × 3 + gap 8px → 刚好填满</h4>
  <div class="stage">
    <div class="g-fr"><div>1fr</div><div>1fr</div><div>1fr</div></div>
  </div>
</div>

<div class="block">
  <h4>C. 1fr 2fr 1fr → 按份数分</h4>
  <div class="stage">
    <div class="g-ratio"><div>1fr</div><div>2fr</div><div>1fr</div></div>
  </div>
</div>`,
          },
          {
            type: 'text',
            title: '4. repeat()、minmax()、auto-fit / auto-fill',
            body: '是什么：这三个函数是 Grid 真正好用的地方，专门解决「列数很多懒得手写」和「列宽要有上下限」。\n\nrepeat(次数, 尺寸)：repeat(3, 1fr) 等价于 1fr 1fr 1fr；repeat(12, 1fr) 就是常见的 12 栅格。\n\nminmax(最小, 最大)：给一条轨道（track，就是「一行」或「一列」）设尺寸区间。minmax(180px, 1fr) 的含义是「最窄 180px，有富余就一起长大」。\n\nauto-fit / auto-fill：把 repeat 的次数交给浏览器算——「容器有多宽就塞几列」。配合 minmax 就能做出不写任何媒体查询的自适应卡片墙。\n\n差别只在「空轨道怎么处理」：\n- auto-fill：把空轨道留着（占位），子项少的时候不会被拉宽。\n- auto-fit：把空轨道塌缩掉（折叠成 0），剩余空间给已有子项，子项会被拉宽。\n\n怎么选：希望「卡片保持整齐宽度、右边允许留白」用 auto-fill；希望「永远铺满一整行」用 auto-fit。',
          },
          {
            type: 'code',
            title: 'repeat / minmax / auto-fit 语法拆解（静态对照）',
            language: 'css',
            body: `.grid {
  display: grid; /* 前提：这些函数只在网格容器的行列定义里有意义 */

  grid-template-columns: repeat(3, 1fr); /* 等价于 1fr 1fr 1fr —— 列多时省写 */
  grid-template-columns: repeat(12, 1fr); /* 12 栅格系统的本质，就这一行 */
  grid-template-columns: repeat(2, 120px 1fr); /* 一次重复一组：120px 1fr 120px 1fr（共 4 列） */

  grid-template-columns: minmax(120px, 240px) 1fr; /* 第 1 列在 120~240px 之间伸缩，第 2 列吃剩余 */
  grid-template-columns: repeat(3, minmax(0, 1fr)); /* ★ 防撑破写法：最小值给 0，长文本不再顶开列 */

  /* 自适应列数：容器每宽出 180px 就多一列，窄了就少一列，全程零媒体查询 */
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); /* 空列保留，卡片宽度更整齐 */
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* 空列塌缩，现有卡片被拉宽铺满 */
}`,
          },
          {
            type: 'code',
            title: 'Demo：auto-fill vs auto-fit（子项少时差别最明显）',
            language: 'html',
            live: true,
            body: `<style>
  h4 { margin: 0 0 6px; font-size: 12px; color: #2f6b4f; }
  .block { margin-bottom: 18px; }
  .hint { margin: 0 0 12px; font-size: 12px; color: #5c6b62; }

  /* auto-fill：容器能放几列就声明几列，放不满的列「空着占位」 */
  .fill {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); /* 空列保留 → 卡片停在 90px 左右不被拉宽 */
    gap: 8px;
    padding: 8px;
    border: 1px dashed #bbb;
  }

  /* auto-fit：同样先算列数，但把没内容的列「塌缩成 0」，空间还给已有子项 */
  .fit {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); /* 空列塌缩 → 两个卡片被拉宽铺满整行 */
    gap: 8px;
    padding: 8px;
    border: 1px dashed #bbb;
  }

  .fill > div,
  .fit > div {
    padding: 12px 0;
    text-align: center;
    background: #eef6f1;
    border-radius: 6px;
    font-size: 12px;
  }
</style>

<p class="hint">两个容器宽度一样、都只有 2 个子项：上面停在最小宽度，下面被拉宽铺满。</p>

<div class="block">
  <h4>auto-fill（空列保留占位）</h4>
  <div class="fill"><div>A</div><div>B</div></div>
</div>

<div class="block">
  <h4>auto-fit（空列塌缩，子项拉宽）</h4>
  <div class="fit"><div>A</div><div>B</div></div>
</div>`,
          },
          {
            type: 'table',
            title: 'auto-fill 与 auto-fit 速查',
            headers: ['写法', '空轨道', '子项少时的表现', '适合'],
            rows: [
              [
                'repeat(auto-fill, minmax(180px, 1fr))',
                '保留占位',
                '卡片保持约 180px，右侧留白',
                '商品/文章卡片，宽度要统一',
              ],
              [
                'repeat(auto-fit, minmax(180px, 1fr))',
                '塌缩为 0',
                '卡片被拉宽，整行铺满',
                '统计数字块、仪表盘，不想留白',
              ],
              ['repeat(3, 1fr)', '不适用', '永远 3 列，窄屏会挤扁', '列数必须固定的场景（需配媒体查询）'],
            ],
            note: '子项足够多、能填满每一行时，auto-fill 和 auto-fit 的表现完全一样——所以差别只在「最后一行 / 子项很少」的时候。',
          },
          {
            type: 'text',
            title: '5. grid-template-rows 与隐式行（grid-auto-rows）',
            body: '是什么：grid-template-rows 声明「有几行、每行多高」，语法和 columns 完全一致（可以用 px、fr、auto、minmax、repeat）。\n\n显式行 vs 隐式行：你在 grid-template-rows 里写出来的是「显式行」；子项个数超出、Grid 自动补出来的行叫「隐式行」。隐式行的高度默认是 auto（内容多高就多高），要统一控制就写 grid-auto-rows。\n\n常用组合：grid-template-rows: 48px 1fr 32px（顶栏固定高、主区吃剩余、底栏固定高），这是后台页面骨架的标准写法——1fr 在行方向上就是「吃掉剩余高度」，等价于 Flex 里的 flex:1。\n\n前提：行方向用 1fr 时，容器必须有确定高度（height 或 100vh），否则「剩余高度」无从计算，1fr 会退化成内容高度。\n\n易错：想让每行等高却只写了 gap，结果行高被最高的内容撑开——需要 grid-auto-rows: 80px 或 minmax(80px, auto)。',
          },
          {
            type: 'code',
            title: 'Demo：行高控制（1fr 吃剩余高度 + grid-auto-rows 统一隐式行）',
            language: 'html',
            live: true,
            body: `<style>
  h4 { margin: 0 0 6px; font-size: 12px; color: #2f6b4f; }
  .block { margin-bottom: 18px; }

  /* A：三行版式 —— 头部固定、主区吃剩余、底部固定 */
  .rows {
    display: grid;
    grid-template-rows: 36px 1fr 28px; /* 3 行：36px 固定 / 1fr 吃掉剩余高度 / 28px 固定 */
    height: 160px; /* ★ 行方向用 1fr 必须有确定高度，否则没有「剩余」可分 */
    gap: 6px;
    padding: 6px;
    border: 1px dashed #bbb;
  }
  .rows > div { background: #eef6f1; border-radius: 4px; padding: 4px 8px; font-size: 12px; }

  /* B：隐式行统一高度 —— 只声明了 2 列，行是 Grid 自动补的 */
  .auto {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 只定义列，不定义行 */
    grid-auto-rows: 56px; /* ★ 所有「自动补出来的行」统一 56px，内容多也不会撑高 */
    gap: 8px;
    padding: 6px;
    border: 1px dashed #bbb;
  }
  .auto > div {
    background: #dfeee6;
    border-radius: 4px;
    padding: 6px 8px;
    font-size: 12px;
    overflow: auto; /* 内容超过 56px 时在格子内部滚动，而不是把行撑高 */
  }
</style>

<div class="block">
  <h4>A. grid-template-rows: 36px 1fr 28px</h4>
  <div class="rows">
    <div>头部（36px）</div>
    <div>主区（1fr：吃掉剩余高度）</div>
    <div>底部（28px）</div>
  </div>
</div>

<div class="block">
  <h4>B. grid-auto-rows: 56px（隐式行等高）</h4>
  <div class="auto">
    <div>短内容</div>
    <div>很长很长很长很长很长很长很长很长很长的内容，行高仍是 56px</div>
    <div>短内容</div>
    <div>短内容</div>
  </div>
</div>`,
          },
          {
            type: 'text',
            title: '6. gap / row-gap / column-gap：Grid 里的间距',
            body: '是什么：gap 控制格子之间的空隙。它和 Flex 里的 gap 是同一个属性，行为也一致。\n\n怎么写：gap: 12px 行列同距；gap: 8px 16px 前者是 row-gap（行距）后者是 column-gap（列距）；也可以单独写 row-gap / column-gap。\n\n为什么别用 margin：给子项写 margin 会在容器四周也留出一圈边距，还要用负 margin 补偿；gap 只作用在「格子之间」，首尾不加。\n\n重要历史包袱：grid-gap / grid-row-gap / grid-column-gap 是旧写法，已废弃（deprecated）。现在统一写 gap，浏览器支持早就没问题了——看到老代码里的 grid-gap 可以直接改掉。',
          },
          {
            type: 'code',
            title: 'Demo：gap 的三种写法对比',
            language: 'html',
            live: true,
            body: `<style>
  h4 { margin: 0 0 6px; font-size: 12px; color: #2f6b4f; }
  .block { margin-bottom: 16px; }

  /* 共用列定义：2 列等分，方便观察行距和列距 */
  .g {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 等分列 */
    padding: 6px;
    border: 1px dashed #bbb;
  }

  .g-a { gap: 4px; } /* 一个值：行距 = 列距 = 4px */
  .g-b { gap: 20px 4px; } /* 两个值：行距 20px、列距 4px（顺序是「行 列」，别记反） */
  .g-c { row-gap: 4px; column-gap: 24px; } /* 分开写更好读：行距 4px、列距 24px */

  .g > div {
    padding: 8px 0;
    text-align: center;
    background: #eef6f1;
    border-radius: 4px;
    font-size: 12px;
  }
</style>

<div class="block">
  <h4>A. gap: 4px</h4>
  <div class="g g-a"><div>1</div><div>2</div><div>3</div><div>4</div></div>
</div>

<div class="block">
  <h4>B. gap: 20px 4px（行距大、列距小）</h4>
  <div class="g g-b"><div>1</div><div>2</div><div>3</div><div>4</div></div>
</div>

<div class="block">
  <h4>C. row-gap: 4px + column-gap: 24px</h4>
  <div class="g g-c"><div>1</div><div>2</div><div>3</div><div>4</div></div>
</div>`,
          },
          {
            type: 'text',
            title: '7. 子项跨行跨列：grid-column / grid-row',
            body: '是什么：默认每个子项占一个格子。想让某个子项横跨多列或多行，就在这个子项上写 grid-column / grid-row。\n\n两种写法：\n- 数网格线：grid-column: 1 / 3 表示「从第 1 根竖线到第 3 根竖线」，也就是占 2 列。注意数的是「线」不是「列」，N 列有 N+1 根线，这是新手最容易绕晕的地方。\n- 数跨度：grid-column: span 2 表示「从我现在的位置往右占 2 格」。不关心具体位置时用 span，写起来更省心也更抗改动。\n\n负数技巧：grid-column: 1 / -1 表示「从第一根线一直到最后一根线」，即「占满整行」——列数变了也不用改，做「通栏标题 / 通栏底部」特别好用。\n\n简写：grid-area: 行开始 / 列开始 / 行结束 / 列结束，四个值一次写完（顺序容易记错，日常更推荐分开写 grid-row / grid-column）。\n\n易错：跨列数超过总列数时，浏览器会自动加隐式列或直接截断，布局会跑偏——跨越范围别超过 grid-template-columns 声明的列数。',
          },
          {
            type: 'table',
            title: '跨行跨列写法速查',
            headers: ['写法', '含义', '什么时候用'],
            rows: [
              ['grid-column: span 2', '从当前位置往后占 2 列', '最常用，不关心具体落在哪'],
              ['grid-column: 1 / 3', '从第 1 根线到第 3 根线（= 2 列）', '要精确定位到某列开始'],
              ['grid-column: 1 / -1', '从第一根线到最后一根线', '通栏：占满一整行，列数变了也不用改'],
              ['grid-row: span 2', '往下占 2 行', '看板里的高卡片、侧栏跨两行'],
              ['grid-row: 2 / 4', '从第 2 根横线到第 4 根横线', '精确定位行'],
              ['grid-area: 2 / 1 / 4 / 3', '行 2→4、列 1→3 的矩形区域', '一次写完，但顺序易记错'],
            ],
            note: '记住「数字数的是线，span 数的是格」，就不会算错一格。',
          },
          {
            type: 'code',
            title: 'Demo：span 跨列、跨行与 1 / -1 通栏',
            language: 'html',
            live: true,
            body: `<style>
  .board {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 等分列 → 有 4 根竖线（1、2、3、4） */
    grid-auto-rows: 52px; /* 每行统一 52px，跨行效果才看得清 */
    gap: 8px;
    padding: 8px;
    border: 1px dashed #bbb;
  }
  .board > div {
    display: flex; /* 格子内部用 flex 做居中 —— 外层 Grid、内层 Flex 的典型组合 */
    align-items: center;
    justify-content: center;
    background: #eef6f1;
    border-radius: 6px;
    font-size: 12px;
    text-align: center;
  }

  .wide { grid-column: span 2; background: #d7eadf; } /* 占 2 列宽 */
  .tall { grid-row: span 2; background: #f3e6d4; } /* 占 2 行高 */
  .full { grid-column: 1 / -1; background: #2f6b4f; color: #fff; } /* 从第一根线到最后一根线 = 通栏 */
</style>

<div class="board">
  <!-- 通栏标题：不管以后列数改成几列，1 / -1 都能占满整行 -->
  <div class="full">grid-column: 1 / -1（通栏）</div>

  <!-- 跨 2 列：注意它自己没写 width，宽度由「两列 + 中间的 gap」决定 -->
  <div class="wide">span 2 列</div>
  <div>普通</div>

  <!-- 跨 2 行：右边的普通格子会自动流到它左边的空位里 -->
  <div class="tall">span 2 行</div>
  <div>普通</div>
  <div>普通</div>
  <div>普通</div>
  <div>普通</div>
</div>`,
          },
          {
            type: 'text',
            title: '8. grid-template-areas：给区域起名字（后台骨架的最佳写法）',
            body: '是什么：grid-template-areas 用「字符串画图」的方式声明版式：每个字符串是一行，字符串里用空格分隔的名字代表这一格属于哪个区域；子项上写 grid-area: 名字 就归位。\n\n为什么值得学：它是 CSS 里可读性最高的布局写法——打开样式表就能看出页面长什么样。而且改版式时只改父级那几行字符串，HTML 一个字都不用动（响应式里换手机版布局特别爽，下一节会用到）。\n\n规则（不遵守就整块失效）：\n1. 每行的「格子数」必须一样，形成一个完整矩形，否则 grid-template-areas 无效。\n2. 同一个名字必须连成矩形（不能是 L 形），否则也无效。\n3. 用点号 . 表示「这一格留空」。\n4. 名字不用引号，是自定义标识符；行与行之间建议换行写，排版成矩阵一眼就能看懂。\n\n配套：还是要写 grid-template-columns / grid-template-rows 来定义每列多宽、每行多高，areas 只负责「谁在哪」。',
          },
          {
            type: 'code',
            title: 'Demo：用命名区域搭后台骨架（header / sidebar / main / footer）',
            language: 'html',
            live: true,
            body: `<style>
  .admin {
    display: grid;
    /* ★ 用字符串「画」出版式：每个字符串是一行，名字代表这一格属于哪个区域。
       两行必须格子数相同（这里都是 2 格），并且同名区域要连成矩形，否则整条属性失效。 */
    grid-template-areas:
      "topbar topbar"
      "side   main"
      "footer footer";
    grid-template-columns: 96px 1fr; /* 第 1 列侧栏固定 96px，第 2 列主区吃剩余 */
    grid-template-rows: 38px 1fr 26px; /* 顶栏 38px、主区吃剩余高度、底栏 26px */
    gap: 6px;
    height: 220px; /* 给固定高度，1fr 才有「剩余高度」可分 */
    padding: 6px;
    background: #f4f7f5;
    border: 1px solid #dfe7e2;
    border-radius: 8px;
  }

  /* 子项只需要认领区域名，完全不用管自己在第几行第几列 */
  .topbar { grid-area: topbar; background: #2f6b4f; color: #fff; } /* 认领 topbar 区域 */
  .side { grid-area: side; background: #dfeee6; } /* 认领 side 区域 */
  .main { grid-area: main; background: #fff; overflow: auto; } /* 主区内容多时内部滚动 */
  .footer { grid-area: footer; background: #eceff0; font-size: 11px; } /* 认领 footer 区域 */

  .admin > * {
    display: flex; /* 每块内部用 flex 居中文字 */
    align-items: center;
    padding: 0 10px;
    border-radius: 6px;
    font-size: 12px;
  }
</style>

<div class="admin">
  <!-- HTML 顺序不重要：真正决定位置的是 grid-area 认领的区域名 -->
  <div class="topbar">顶栏 topbar</div>
  <div class="side">侧栏 side</div>
  <div class="main">主区 main（试试把上面 areas 的 "side main" 改成 "main side"，左右立刻互换，HTML 一个字都不用动）</div>
  <div class="footer">底栏 footer</div>
</div>`,
          },
          {
            type: 'text',
            title: '9. 对齐：justify 管横向，align 管纵向',
            body: '是什么：Grid 有两套对齐属性，区别在于「对齐的是子项在格子里的位置」还是「整个网格在容器里的位置」。\n\n第一套（管子项在自己格子里怎么站，最常用）：\n- justify-items：横向（行内轴），值 start / end / center / stretch（默认 stretch，所以子项默认被拉满格子宽度）。\n- align-items：纵向（块轴），同样的值。\n- place-items：上面两个的简写，place-items: center 就是「格子内水平垂直都居中」——一行代码完成居中，这是 Grid 最讨喜的一招。\n- 子项想单独破例：justify-self / align-self / place-self。\n\n第二套（管整个网格在容器里怎么摆，只有网格总尺寸小于容器时才看得出效果）：\n- justify-content：所有列作为整体在横向如何分布（start / center / space-between…）。\n- align-content：所有行作为整体在纵向如何分布。\n\n怎么分清：items 管「格子里的项」，content 管「网格这一整块内容」。这和 Flex 里 align-items / align-content 的分法是同一套思路。\n\n易错：列宽写了 1fr（已经铺满容器）时改 justify-content 看不出任何变化——因为没有剩余空间可分配，此时该改的是 justify-items。',
          },
          {
            type: 'table',
            title: 'Grid 对齐属性速查',
            headers: ['属性', '写在哪', '管什么', '默认值'],
            rows: [
              ['justify-items', '容器', '每个子项在自己格子里的横向位置', 'stretch（拉满）'],
              ['align-items', '容器', '每个子项在自己格子里的纵向位置', 'stretch（拉满）'],
              ['place-items', '容器', '上面两个的简写（纵 横）', 'stretch'],
              ['justify-self / align-self / place-self', '子项', '单个子项破例，覆盖容器的设置', '继承容器'],
              ['justify-content', '容器', '整个网格（所有列）在容器里的横向分布', 'start'],
              ['align-content', '容器', '整个网格（所有行）在容器里的纵向分布', 'start'],
            ],
            note: 'place-items: center 是「一行代码搞定水平垂直居中」的现代标准答案，比老的 absolute + transform 简单太多。',
          },
          {
            type: 'code',
            title: 'Demo：place-items 居中 vs 默认 stretch vs justify-content',
            language: 'html',
            live: true,
            body: `<style>
  h4 { margin: 0 0 6px; font-size: 12px; color: #2f6b4f; }
  .block { margin-bottom: 16px; }

  /* 共用：故意把格子做得比内容大，才能看出对齐差别 */
  .g {
    display: grid;
    grid-template-columns: repeat(3, 80px); /* 3 列固定 80px：容器还有剩余空间，justify-content 才有效果 */
    grid-auto-rows: 56px; /* 行高 56px，比文字高很多，纵向对齐差别明显 */
    gap: 6px;
    padding: 6px;
    border: 1px dashed #bbb;
  }
  .g > div { background: #eef6f1; border-radius: 4px; font-size: 12px; padding: 2px 6px; }

  /* A：故意留空，对照「不写任何对齐属性」的默认行为 —— 默认 stretch，子项被拉满整个格子 */
  .a { align-items: stretch; justify-items: stretch; } /* 这两行就是默认值，写出来只为看清对照 */
  .b { place-items: center; } /* B：简写 = align-items:center + justify-items:center，格子内水平垂直居中 */
  .c { place-items: center; justify-content: center; } /* C：再让「整个网格」在容器里横向居中（注意是整块一起移动） */
  .c-self > div:nth-child(2) { justify-self: end; align-self: start; } /* 单个子项破例：靠右上角 */
</style>

<div class="block">
  <h4>A. 默认 stretch（子项被拉满格子）</h4>
  <div class="g a"><div>1</div><div>2</div><div>3</div></div>
</div>

<div class="block">
  <h4>B. place-items: center（格子内居中）</h4>
  <div class="g b"><div>1</div><div>2</div><div>3</div></div>
</div>

<div class="block">
  <h4>C. 再加 justify-content: center（整块网格居中）</h4>
  <div class="g c"><div>1</div><div>2</div><div>3</div></div>
</div>

<div class="block">
  <h4>D. justify-self / align-self：第 2 个子项单独靠右上</h4>
  <div class="g b c-self"><div>1</div><div>2</div><div>3</div></div>
</div>`,
          },
          {
            type: 'text',
            title: '10. 实战：自适应卡片墙（Grid 最实用的一招）',
            body: '需求：卡片列表要求「宽屏多列、窄屏少列、最窄时一列」，卡片最小不能窄于 180px，而且不许写一堆媒体查询。\n\n答案就一行：grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))。\n\n它是怎么工作的：浏览器拿容器宽度去除以 180px（gap 会先扣掉），算出「最多能放几列」，然后把这几列按 1fr 平分剩余空间。容器变宽自动多一列，变窄自动少一列，到最窄时自然只剩一列——响应式白送。\n\n对照旧写法：以前得写 width: calc(33.33% - 8px)，再配 @media 改成 50%、100%，三段媒体查询加一堆 calc。现在一行代替全部。\n\n下面这个 Demo 的容器加了 resize: horizontal，可以直接拖右下角改宽度，实时看列数变化——比缩浏览器窗口方便。\n\n配合建议：卡片内部（图片 + 标题 + 描述 + 按钮）继续用 Flex 竖排 + gap，Grid 管外面、Flex 管里面。',
          },
          {
            type: 'code',
            title: 'Demo：自适应卡片墙（拖右下角改容器宽度，看列数自动变化）',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 10px; font-size: 12px; color: #5c6b62; }

  /* 外壳：resize:horizontal 让读者能用鼠标拖出不同宽度（需要 overflow 不是 visible 才生效） */
  .stage {
    resize: horizontal; /* ★ 允许横向拖拽改变宽度，右下角会出现拖拽手柄 */
    overflow: auto; /* resize 生效的前提 */
    width: 100%;
    min-width: 140px; /* 别拖到看不见 */
    padding: 8px;
    background: #f4f7f5;
    border: 1px solid #cfdad4;
    border-radius: 8px;
  }

  /* 核心就这一行：容器每多出 140px 就自动多一列，窄了自动减列 */
  .wall {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); /* 最窄 140px，有余量就一起长大 */
    gap: 10px; /* 卡片间距，gap 已被 fr 计算时扣除，永远不溢出 */
  }

  /* 卡片内部改用 Flex 竖排 —— 外层 Grid 管版式、内层 Flex 管内容，这是标准组合 */
  .card {
    display: flex;
    flex-direction: column; /* 竖排：封面 → 标题 → 描述 → 按钮 */
    gap: 6px;
    padding: 10px;
    background: #fff;
    border: 1px solid #e3eae6;
    border-radius: 8px;
  }
  /* 用渐变色块假装封面图（本项目 Demo 不用外链图片） */
  .cover {
    height: 52px;
    border-radius: 6px;
    background: linear-gradient(135deg, #cfe6da, #9fc9b4);
  }
  .card h5 { margin: 0; font-size: 13px; } /* 标题：去掉浏览器默认 margin */
  .card p {
    margin: 0;
    font-size: 11px;
    color: #5c6b62;
    overflow: hidden; /* 配合下面两行做两行截断 */
    display: -webkit-box; /* 多行截断的老写法，兼容性最好 */
    -webkit-line-clamp: 2; /* 最多显示 2 行 */
    -webkit-box-orient: vertical;
  }
  .card button {
    margin-top: auto; /* ★ 把按钮推到卡片底部：flex 竖排里 margin-top:auto 等于「上面全是空隙」 */
    padding: 5px 0;
    border: 1px solid #2f6b4f;
    border-radius: 5px;
    background: #fff;
    color: #2f6b4f;
    font-size: 12px;
  }
</style>

<p class="hint">拖下面这块的右下角把宽度拉宽 / 收窄：列数会自动变化，一句媒体查询都没写。</p>

<div class="stage">
  <div class="wall">
    <div class="card">
      <div class="cover"></div>
      <h5>卡片一</h5>
      <p>描述文字，超过两行会被截断，保证每张卡片高度接近。</p>
      <button>查看</button>
    </div>
    <div class="card">
      <div class="cover"></div>
      <h5>卡片二</h5>
      <p>短描述。</p>
      <button>查看</button>
    </div>
    <div class="card">
      <div class="cover"></div>
      <h5>卡片三</h5>
      <p>描述文字长一些也没关系，按钮仍然被 margin-top:auto 压在底部对齐。</p>
      <button>查看</button>
    </div>
    <div class="card">
      <div class="cover"></div>
      <h5>卡片四</h5>
      <p>描述文字。</p>
      <button>查看</button>
    </div>
  </div>
</div>`,
          },
          {
            type: 'table',
            title: 'Grid 易错点清单',
            intro: '下面每一条都是真实项目里高频踩到的。',
            headers: ['现象', '原因', '正确做法'],
            rows: [
              [
                '列宽加起来正好 100% 却横向溢出',
                '百分比是相对容器总宽算的，没给 gap 留位置',
                '改用 fr（fr 分的是扣掉 gap 后的剩余空间）',
              ],
              [
                '子项里塞了长文本，把列撑破',
                '1fr 的最小值其实是 auto（≈ 内容最小宽度）',
                '写 minmax(0, 1fr)，或给子项加 min-width: 0',
              ],
              ['子项写了 width: 100% 但没效果 / 反而错乱', '子项默认已被拉满格子（stretch），width 是多余的', '删掉子项的 width，宽度交给列定义'],
              ['grid-gap 在新代码里被 lint 报警', 'grid-gap / grid-row-gap / grid-column-gap 已废弃', '统一改成 gap / row-gap / column-gap'],
              [
                'grid-template-areas 整条没生效',
                '各行格子数不一致，或同名区域不是矩形',
                '把字符串排成整齐矩阵，空位用点号 . 占位',
              ],
              ['行方向写了 1fr 但没效果', '容器没有确定高度，「剩余高度」算不出来', '给容器 height（如 100vh 或固定值）'],
              ['改 justify-content 毫无变化', '列已用 1fr 铺满容器，没有剩余空间可分', '要改的是 justify-items（子项在格子里的位置）'],
              ['span 跨列后布局跑偏', '跨越数超过了声明的列数，产生了隐式列', '跨越范围不要超过总列数；通栏用 1 / -1'],
              ['给子项写 justify-content 没反应', 'justify-content 是容器属性', '子项上要写 justify-self'],
            ],
          },
          {
            type: 'list',
            title: '自检清单：写 Grid 之前过一遍',
            ordered: true,
            intro: '能对着回答出来，Grid 就算掌握了。',
            items: [
              '这个布局是「一维」还是「二维」？一维就别上 Grid，Flex 更省事',
              'display: grid 写在父容器上了吗？子项才不用写 width',
              '列宽用 fr 而不是百分比了吗？（有 gap 时百分比一定溢出）',
              '会不会被长文本撑破？需要的话把 1fr 换成 minmax(0, 1fr)',
              '列数需要自适应吗？用 repeat(auto-fill, minmax(180px, 1fr)) 而不是写死列数 + 媒体查询',
              '需要「空列塌缩铺满」还是「保持卡片宽度」？前者 auto-fit，后者 auto-fill',
              '行方向用了 1fr 的话，容器有确定高度吗？',
              '跨列优先用 span N，通栏用 1 / -1（列数改了也不用动）',
              '版式复杂就上 grid-template-areas：格子数对齐、同名成矩形、空位用点号',
              '格子内居中记得 place-items: center；间距一律用 gap，不要用 grid-gap',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '父级 display:grid + grid-template-columns 定义列，子项不写 width；用 fr 不用 %；列数自适应用 repeat(auto-fill, minmax(180px, 1fr))；跨越用 span N、通栏用 1 / -1；复杂版式用 grid-template-areas；居中用 place-items: center；间距一律 gap。外层 Grid、内层 Flex。',
          },
        ],
      },
    },
    {
      id: 'css-responsive',
      title: '响应式与媒体查询（@media）：一套代码适配手机和电脑',
      summary:
        'viewport、@media 语法、min-width/max-width、移动优先 vs 桌面优先、断点参考表，以及 flex-wrap / minmax / clamp / min() 这些不用媒体查询的响应式技巧',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '响应式 = 先写「不写死宽度」的弹性布局（flex-wrap / auto-fill minmax / clamp / min()），实在扛不住了才用 @media 在断点处换版式。@media (max-width: 768px) { ... } 的意思是「视口宽度 ≤ 768px 时，花括号里的规则才生效」。',
          },
          {
            type: 'text',
            title: '1. 为什么需要：固定 px 在手机上会横向滚动',
            body: '现象：给容器写 width: 900px，在 1440px 的电脑上很好看；换到 390px 宽的手机上，这块内容比屏幕还宽 500px，于是整页出现横向滚动条，用户要左右拖着看——这是最典型的「没做响应式」。\n\n根因：px 是绝对单位，它不认识「屏幕有多宽」。而屏幕宽度从 320px 的小手机到 2560px 的显示器，跨度接近 8 倍。\n\n第一原则（比媒体查询更重要）：不要写 width，要写 max-width。\n- width: 900px → 死宽，窄屏必溢出。\n- max-width: 900px → 「最多 900px，屏幕不够就跟着缩」，一个属性解决 90% 的溢出问题。\n\n第二原则：图片、表格、超长英文串这些「天生有最小宽度」的东西要单独处理（本节最后讲）。\n\n所以顺序是：弹性布局 → max-width 兜底 → 版式实在换不过来时才上 @media。很多新手一上手就写五段媒体查询，其实是把弹性布局那一步跳过了。',
          },
          {
            type: 'code',
            title: 'Demo：width: 900px vs max-width: 900px（上面溢出，下面自适应）',
            language: 'html',
            live: true,
            body: `<style>
  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效。 */
  body { margin: 16px; font: 13px/1.6 system-ui, sans-serif; color: #1f2a24; }

  h4 { margin: 0 0 6px; font-size: 12px; color: #2f6b4f; }
  .block { margin-bottom: 18px; }

  /* 外框：模拟「手机屏幕」，宽度固定 300px，看内容会不会顶出去 */
  .phone {
    width: 300px; /* 假装这是一台窄屏手机的可视宽度 */
    padding: 8px;
    background: #f4f7f5;
    border: 1px solid #cfdad4;
    border-radius: 8px;
    overflow-x: auto; /* 子元素超宽时出现横向滚动条 —— 就是手机上左右拖动的那种体验 */
  }

  /* ✗ 死宽：不管容器多窄，都硬撑 480px，于是溢出 */
  .fixed {
    width: 480px; /* 绝对宽度，不认识「屏幕有多宽」 */
    padding: 10px;
    background: #fbe6e2;
    border-radius: 6px;
  }

  /* ✓ 弹性上限：最多 480px，容器不够宽就自动跟着缩 */
  .fluid {
    max-width: 480px; /* ★ 只设上限，下限由容器决定 —— 一个属性解决大部分溢出 */
    padding: 10px;
    background: #e4f0e9;
    border-radius: 6px;
  }
</style>

<div class="block">
  <h4>✗ width: 480px —— 出现横向滚动条</h4>
  <div class="phone">
    <div class="fixed">我被写死了 480px，比容器还宽，只能让用户左右拖。</div>
  </div>
</div>

<div class="block">
  <h4>✓ max-width: 480px —— 自动收窄，不溢出</h4>
  <div class="phone">
    <div class="fluid">我最多 480px，容器只有 300px 时我就乖乖变成 300px。</div>
  </div>
</div>`,
          },
          {
            type: 'text',
            title: '2. meta viewport：不写这一行，媒体查询基本白写',
            body: '是什么：写在 HTML 的 head 里的一行标签，告诉手机浏览器「按设备真实宽度来排版，初始不要缩放」。\n\n写法：meta 标签的 name 是 viewport，content 是 width=device-width, initial-scale=1。\n\n不写会怎样（这是历史遗留的坑）：手机浏览器为了兼容那些「只为电脑做的老网站」，会假装自己是一块 980px 宽的虚拟屏幕，把整页渲染完再整体缩小塞进屏幕。后果是：\n1. 文字小得看不清，用户必须双指放大。\n2. 你的 @media (max-width: 768px) 永远不触发——因为浏览器认为视口是 980px。这就是「明明写了响应式，在手机上却没生效」最常见的原因。\n\n注意：不要加 user-scalable=no 或 maximum-scale=1 去禁止缩放——视力不好的用户需要放大，这是无障碍问题。\n\n本项目里：React 项目的这行在 public/index.html 里已经写好了，你平时不用管；但自己从零建站时必须记得写。',
          },
          {
            type: 'code',
            title: 'meta viewport 标准写法（放在 head 里）',
            language: 'html',
            body: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />

  <!-- ★ 响应式的开关，缺了它手机上会按 980px 虚拟宽度渲染再缩小，媒体查询不触发
       width=device-width  → 视口宽度 = 设备真实宽度（390px 的手机就是 390px）
       initial-scale=1     → 初始缩放比例 1，不要自动缩小 -->
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- ✗ 不要这样写：禁止用户缩放会伤害视力不好的用户（无障碍问题） -->
  <!-- <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" /> -->

  <title>响应式页面</title>
</head>
<body>
  <p>页面内容</p>
</body>
</html>`,
          },
          {
            type: 'text',
            title: '3. @media 语法拆解',
            body: '一条媒体查询由三部分组成：@media + 条件 + 花括号里的规则。\n\n@media (max-width: 768px) { .box { flex-direction: column; } } 读作：「当视口宽度小于或等于 768px 时，让 .box 竖排」。\n\n逐块解释：\n- @media 是 CSS 的「条件语句」关键字（叫 at-rule，@ 规则）。\n- (max-width: 768px) 是媒体特性（media feature），必须带括号。max-width 表示「宽度上限」，也就是「窄屏才生效」。\n- 花括号里放的是完整的选择器 + 声明，写法和平时的 CSS 一模一样，只是多了一层缩进。\n\n关键点：媒体查询本身不改变优先级（specificity）。@media 里的 .box 和外面的 .box 权重相同，谁生效取决于「谁写在后面」。所以媒体查询必须写在被覆盖的规则之后，这是新手最常见的失效原因。\n\n条件可以组合：\n- and 表示「都满足」：(min-width: 768px) and (max-width: 1199px) 只在平板区间生效。\n- 逗号表示「或者」：(max-width: 480px), print 在窄屏或打印时都生效。\n- 新语法（现代浏览器已可用）：@media (400px <= width <= 900px) 这种区间写法更直观。',
          },
          {
            type: 'table',
            title: '@media 常用条件',
            headers: ['写法', '含义', '常见用途'],
            rows: [
              ['(max-width: 768px)', '视口宽度 ≤ 768px', '桌面优先：给窄屏打补丁'],
              ['(min-width: 768px)', '视口宽度 ≥ 768px', '移动优先：给宽屏加增强（推荐）'],
              ['(min-width: 768px) and (max-width: 1199px)', '两个条件同时满足', '只针对平板区间'],
              ['(max-width: 480px), print', '逗号 = 或者', '窄屏或打印时都生效'],
              ['(orientation: landscape)', '横屏', '视频播放页、游戏'],
              ['(prefers-color-scheme: dark)', '系统开了深色模式', '暗色主题'],
              ['(prefers-reduced-motion: reduce)', '系统开了「减弱动效」', '关掉动画（无障碍）'],
              ['(hover: hover)', '设备支持真正的悬停', '只给鼠标设备写 hover 效果'],
              ['print', '打印或打印预览', '隐藏导航、去掉背景色'],
            ],
            note: 'max-width 是「≤」，min-width 是「≥」，都包含等号——这也是断点容易写重叠的原因（见文末易错点）。',
          },
          {
            type: 'text',
            title: '4. 移动优先 vs 桌面优先：先写哪一套',
            body: '两种写法能实现同样的效果，区别在于「基础样式写给谁」。\n\n移动优先（mobile first，推荐）：基础样式按手机写（单列、竖排），然后用 min-width 逐级往上加宽屏增强。\n- 优点：基础 CSS 最简单（手机版本来就是单列，很多属性都不用写）；手机加载的规则最少，性能最好；min-width 的层层递进符合「逐步增强」的思路。\n- 心理模型：「默认最简单，屏幕大了再变复杂」。\n\n桌面优先（desktop first）：基础样式按电脑写（多列、有侧栏），再用 max-width 一层层「打补丁」把它改回手机版。\n- 优点：改造老的桌面站时不用重写基础样式，加两段 max-width 就能上线。\n- 缺点：常常要在媒体查询里写一堆「取消」（float: none、width: auto、display: block），CSS 越写越乱。\n\n怎么选：新项目一律移动优先；接手老的桌面站就桌面优先。别在同一个项目里混着写——min-width 和 max-width 交叉嵌套后，很难判断某个屏宽下到底哪条规则赢了。\n\n后台管理项目的现实：主要用户在电脑上，但产品经理一定会问「手机能不能看」。稳妥做法还是移动优先写基础，min-width 加上侧栏和多列。',
          },
          {
            type: 'code',
            title: '两种写法代码对照（同样的效果，顺序相反）',
            language: 'css',
            body: `/* ============ 写法 A：移动优先（推荐）============ */
/* 基础样式 = 手机版：单列，最简单，属性最少 */
.layout {
  display: grid; /* 网格布局 */
  grid-template-columns: 1fr; /* 手机：一列 */
  gap: 12px;
}

/* 屏幕 ≥ 768px（平板起）：升级成两列 */
@media (min-width: 768px) {
  .layout { grid-template-columns: repeat(2, 1fr); } /* 逐步增强：加列 */
}

/* 屏幕 ≥ 1200px（桌面起）：再升级成三列 */
@media (min-width: 1200px) {
  .layout { grid-template-columns: repeat(3, 1fr); } /* 只加不减，越写越清爽 */
}


/* ============ 写法 B：桌面优先（改造老站用）============ */
/* 基础样式 = 电脑版：三列 */
.layout2 {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 桌面：三列 */
  gap: 12px;
}

/* 屏幕 ≤ 1199px：降级成两列（注意断点比上面小 1px，避免和下一条重叠） */
@media (max-width: 1199px) {
  .layout2 { grid-template-columns: repeat(2, 1fr); }
}

/* 屏幕 ≤ 767px：降级成一列 —— 这种「往回改」的规则多了就容易乱 */
@media (max-width: 767px) {
  .layout2 { grid-template-columns: 1fr; }
}

/* ★ 两种写法都必须把 @media 写在基础规则之后：
   媒体查询不提升优先级，权重相同时「后写的赢」。
   把 @media 块放到文件开头，它就会被后面的基础规则覆盖，看起来像「媒体查询失效」。 */`,
          },
          {
            type: 'table',
            title: '移动优先 vs 桌面优先取舍',
            headers: ['维度', '移动优先（min-width）', '桌面优先（max-width）'],
            rows: [
              ['基础样式写给谁', '手机（单列、竖排）', '电脑（多列、侧栏）'],
              ['媒体查询在做什么', '逐步增强：加列、加侧栏', '打补丁：取消浮动、改回单列'],
              ['CSS 体积与可读性', '更小更清爽，很少写「取消」', '容易堆满 auto / none / block'],
              ['手机端性能', '好（手机命中的规则最少）', '一般（要解析并覆盖桌面规则）'],
              ['适合场景', '所有新项目', '改造已有的桌面站'],
              ['断点数值', '常用 768 / 1024 / 1200 起', '常用 1199 / 767（比上一档少 1px）'],
            ],
            note: '选一种坚持到底，不要在一个项目里 min-width 和 max-width 混着写。',
          },
          {
            type: 'table',
            title: '常用断点参考（数值仅供起步，最终要由设计稿决定）',
            intro: '这些数字不是标准，只是行业里用得多。真正的断点应该是「布局在多少宽度下开始变丑」，把浏览器慢慢拖窄，看到内容挤了就在那里加一个断点。',
            headers: ['设备档位', '常见宽度区间', '移动优先断点', '布局形态'],
            rows: [
              ['小手机', '320 ~ 374px', '（基础样式）', '单列，内容全宽，不要侧栏'],
              ['主流手机', '375 ~ 767px', '（基础样式）', '单列，导航收进汉堡菜单/底部 Tab'],
              ['平板竖屏', '768 ~ 1023px', 'min-width: 768px', '两列，侧栏可折叠为窄图标条'],
              ['小笔记本 / 平板横屏', '1024 ~ 1279px', 'min-width: 1024px', '侧栏常驻，主区两到三列'],
              ['桌面', '1280 ~ 1599px', 'min-width: 1280px', '三列，内容区加 max-width 居中'],
              ['大屏 / 2K 以上', '≥ 1600px', 'min-width: 1600px', '内容不再无限拉宽，两侧留白'],
            ],
            note: '经验：断点数量控制在 2~3 个就够用了。断点越多，测试成本越高，还容易出现某个区间没人管的「夹缝布局」。宁可把弹性布局写好，也不要靠加断点堆效果。',
          },
          {
            type: 'text',
            title: '5. 在这个预览区里怎么做媒体查询实验',
            body: '要先说清一件事：右边的预览区是一个 iframe（内嵌页面），它内部的「视口宽度」就是这块预览区的宽度，通常只有三四百 px。\n\n这带来两个结果：\n1. 你写 @media (max-width: 768px)，在预览区里会「一直是生效状态」——因为预览区本来就比 768px 窄。所以本节 Demo 的断点都故意设得很小（比如 360px / 420px），这样默认能看到宽屏样式。\n2. 三个可以真正看到「切换瞬间」的办法：\n   - 改数字：把断点从 360px 改成 900px，等于瞬间把窗口变窄，样式立刻切换（最快）。\n   - 缩窗口：把整个浏览器窗口拖窄，预览区跟着变窄，断点会真实触发。\n   - 用容器查询：@container 让样式响应「父容器宽度」而不是「视口宽度」，再给容器加 resize: horizontal，就能用鼠标直接拖出效果——下面有 Demo。\n\n顺便记住一个实战技巧：真机调试前先用浏览器开发者工具的设备模拟（Chrome 里 F12 → 左上角手机图标），能快速切换 iPhone / iPad 等预设尺寸。',
          },
          {
            type: 'code',
            title: 'Demo ①：卡片列表 —— 宽屏三列、中屏两列、窄屏一列（grid + @media）',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 10px; font-size: 12px; color: #5c6b62; }

  /* 基础样式 = 最窄屏（移动优先）：一列 */
  .cards {
    display: grid;
    grid-template-columns: 1fr; /* 手机：单列 */
    gap: 10px;
  }

  /* ≥ 300px：升级成两列（正常项目里这里是 768px，
     这里故意设小，因为预览区本身只有三四百 px 宽） */
  @media (min-width: 300px) {
    .cards { grid-template-columns: repeat(2, 1fr); } /* 平板：两列 */
  }

  /* ≥ 420px：升级成三列（正常项目里这里是 1200px） */
  @media (min-width: 420px) {
    .cards { grid-template-columns: repeat(3, 1fr); } /* 桌面：三列 */
  }

  .cards > div {
    padding: 14px 8px;
    text-align: center;
    background: #eef6f1;
    border: 1px solid #dfe7e2;
    border-radius: 8px;
    font-size: 12px;
  }
</style>

<p class="hint">实验：把上面 420px 改成 2000px，三列规则立刻失效变两列；再把 300px 也改大，就退回手机版单列。</p>

<div class="cards">
  <div>卡片 1</div>
  <div>卡片 2</div>
  <div>卡片 3</div>
  <div>卡片 4</div>
  <div>卡片 5</div>
  <div>卡片 6</div>
</div>`,
          },
          {
            type: 'code',
            title: 'Demo ②：后台布局 —— 宽屏侧栏固定，窄屏侧栏变顶部横向菜单',
            language: 'html',
            live: true,
            body: `<style>
  * { box-sizing: border-box; } /* 统一盒模型，padding 不再额外撑宽 */
  .hint { margin: 0 0 10px; font-size: 12px; color: #5c6b62; }

  /* ===== 基础样式 = 手机版：上下堆叠，侧栏变成顶部横向菜单 ===== */
  .admin {
    display: grid;
    grid-template-areas:
      "topbar"
      "side"
      "main"; /* 手机：三块从上到下排 */
    grid-template-columns: 1fr; /* 单列 */
    gap: 6px;
    padding: 6px;
    background: #f4f7f5;
    border: 1px solid #dfe7e2;
    border-radius: 8px;
  }
  .topbar { grid-area: topbar; background: #2f6b4f; color: #fff; }
  .side { grid-area: side; background: #dfeee6; }
  .main { grid-area: main; background: #fff; min-height: 90px; }
  .admin > * { padding: 8px 10px; border-radius: 6px; font-size: 12px; }

  /* 手机版的菜单：横向排列 + 可横滑，而不是竖着占满一屏 */
  .side ul {
    display: flex; /* 横排菜单项 */
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none; /* 去掉圆点 */
    overflow-x: auto; /* 菜单多时可以横向滑动，不换行挤压 */
  }
  .side li { white-space: nowrap; } /* 菜单文字不折行，保证横滑体验 */

  /* ===== ≥ 380px：升级成桌面版 —— 侧栏回到左边并固定宽度 =====
     正常项目里这个断点是 768px 或 1024px；预览区窄，这里设成 380px 才看得到两种形态 */
  @media (min-width: 380px) {
    .admin {
      grid-template-areas:
        "topbar topbar"
        "side   main"; /* 桌面：顶栏通栏，下面左侧栏 + 右主区 */
      grid-template-columns: 110px 1fr; /* 侧栏固定 110px，主区吃剩余宽度 */
    }
    .side ul {
      flex-direction: column; /* 桌面：菜单项恢复竖排 */
      overflow-x: visible; /* 不再需要横滑 */
    }
  }
</style>

<p class="hint">实验：把下面 @media 的 380px 改成 2000px（等于把窗口变窄），侧栏会立刻跑到顶部变成横向菜单。</p>

<div class="admin">
  <div class="topbar">顶栏：后台管理</div>
  <nav class="side">
    <ul>
      <li>概览</li>
      <li>订单</li>
      <li>用户</li>
      <li>设置</li>
    </ul>
  </nav>
  <div class="main">主内容区：宽屏时在侧栏右边，窄屏时在横向菜单下面。同一份 HTML，只有父级的 grid-template-areas 变了。</div>
</div>`,
          },
          {
            type: 'text',
            title: '6. 容器查询 @container：让组件响应「父容器」而不是「屏幕」',
            body: '媒体查询的局限：它问的是「屏幕多宽」。但一个卡片组件可能被放在全宽的首页，也可能被塞进 260px 的侧栏里——屏幕宽度一样，可用空间差 5 倍。用 @media 无法区分这两种情况，只能靠传一堆 size 参数。\n\n容器查询（container query）的解法：让样式去问「我的父容器多宽」。\n\n三步写法：\n1. 在父容器上写 container-type: inline-size（声明「我是可被查询的容器，按横向尺寸算」）。\n2. 可选：container-name: card 给它起个名字，方便嵌套时指定。\n3. 用 @container (min-width: 320px) { ... } 代替 @media，条件里的宽度指的就是这个容器的宽度。\n\n为什么值得用：组件真正做到「自适应、可复用、不关心自己被放在哪」，这也是设计系统（design system）的方向。现代浏览器已经普遍支持；老浏览器兜底就退化成基础样式（也就是最窄的那套），不会崩。\n\n本节 Demo 特别适合用它：容器加上 resize: horizontal 就能用鼠标拖出宽度变化，看到样式实时切换，比缩浏览器窗口直观得多。',
          },
          {
            type: 'code',
            title: 'Demo ③：容器查询 —— 拖右下角改宽度，卡片自己换布局',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 10px; font-size: 12px; color: #5c6b62; }

  /* 外壳：可拖拽改宽度，用来模拟「同一个组件被放进不同宽度的位置」 */
  .holder {
    container-type: inline-size; /* ★ 第 1 步：声明我是查询容器，按横向尺寸（宽度）来算 */
    container-name: card; /* ★ 第 2 步：起个名字，嵌套多层容器时可以精确指定 */
    resize: horizontal; /* 允许用鼠标拖右下角改宽度 */
    overflow: auto; /* resize 生效的前提（overflow 不能是 visible） */
    width: 100%;
    min-width: 150px;
    padding: 8px;
    background: #f4f7f5;
    border: 1px solid #cfdad4;
    border-radius: 8px;
  }

  /* 卡片基础样式 = 窄容器形态：竖排（封面在上、文字在下） */
  .card {
    display: flex;
    flex-direction: column; /* 窄的时候上下堆叠 */
    gap: 8px;
    padding: 10px;
    background: #fff;
    border: 1px solid #e3eae6;
    border-radius: 8px;
  }
  .cover {
    height: 60px;
    border-radius: 6px;
    background: linear-gradient(135deg, #cfe6da, #9fc9b4); /* 用渐变假装封面图 */
  }
  .card h5 { margin: 0 0 4px; font-size: 13px; }
  .card p { margin: 0; font-size: 12px; color: #5c6b62; }

  /* ★ 第 3 步：容器宽度 ≥ 320px 时改成左右布局。
     注意条件问的是「名为 card 的容器有多宽」，跟屏幕宽度无关 */
  @container card (min-width: 320px) {
    .card { flex-direction: row; } /* 宽容器：封面在左、文字在右 */
    .cover {
      flex: 0 0 110px; /* 封面固定 110px：不放大、不缩小 */
      height: auto; /* 高度交给 align-items 默认的 stretch 去拉满 */
    }
  }
</style>

<p class="hint">拖下面这块的右下角：宽度越过 320px，卡片自己从竖排变横排（用的是 @container，不是 @media）。</p>

<div class="holder">
  <div class="card">
    <div class="cover"></div>
    <div>
      <h5>容器查询卡片</h5>
      <p>我不关心屏幕多宽，只看自己被放在多宽的位置里——放进侧栏就竖排，放进主区就横排。</p>
    </div>
  </div>
</div>`,
          },
          {
            type: 'text',
            title: '7. 不用媒体查询也能响应式的四招（比 @media 更该先学）',
            body: '真实项目里，一个页面往往 80% 的响应式是靠下面这几个属性实现的，媒体查询只负责最后那 20%「必须换版式」的部分。\n\n① flex-wrap: wrap —— 一行放不下就自动折行。工具栏按钮、筛选标签、表单字段最常用。配合 flex: 1 1 200px（理想宽 200px，能伸能缩），就得到一个「宽屏一行、窄屏自动多行」的弹性行，零断点。\n\n② repeat(auto-fill, minmax(180px, 1fr)) —— 上一节讲过的 Grid 自适应列数。它就是「用一行代码替掉三段媒体查询」的典型。\n\n③ clamp(最小值, 理想值, 最大值) —— 给任意长度值设区间，理想值通常带 vw（viewport width，视口宽度的 1%）。比如 font-size: clamp(16px, 4vw, 28px) 的意思是「跟着屏幕缩放，但绝不小于 16px、不大于 28px」。字号、内边距、标题都很适合，可以完全避免「手机上标题大到换行三次」。\n\n④ width: min(100%, 600px) —— min() 取「更小的那个」。屏幕比 600px 宽时用 600px，比 600px 窄时用 100%。它和 max-width: 600px 效果基本相同，但因为写在 width 里，能直接参与 calc() 之类的计算，也更容易读出意图。相对的 max(a, b) 取更大值，常用来兜底最小尺寸。\n\n为什么优先用它们：断点是「离散的跳变」（768px 时突然换布局），这些函数是「连续的适配」（每一个宽度都刚好）。少了断点，也少了「在 769px 这个夹缝里布局很丑」的问题。',
          },
          {
            type: 'code',
            title: 'Demo ④：flex-wrap + flex: 1 1 200px（宽屏一行、窄屏自动折行，零断点）',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 10px; font-size: 12px; color: #5c6b62; }

  /* 可拖拽外壳：方便直接观察折行的瞬间 */
  .stage {
    resize: horizontal; /* 拖右下角改宽度 */
    overflow: auto; /* resize 的前提 */
    width: 100%;
    min-width: 150px;
    padding: 8px;
    background: #f4f7f5;
    border: 1px solid #cfdad4;
    border-radius: 8px;
  }

  /* 弹性行：一行排不下就自动折到下一行，不需要任何 @media */
  .bar {
    display: flex;
    flex-wrap: wrap; /* ★ 核心：放不下就换行（不写的话子项会被挤扁或溢出） */
    gap: 8px; /* 行距和列距都是 8px，换行后行与行之间也有空隙 */
  }
  .bar > .field {
    flex: 1 1 180px; /* 简写：可放大(1) 可缩小(1) 理想宽 180px —— 宽屏一行多个，窄屏自动一行一个 */
    min-width: 0; /* 允许比内容更窄，防止长文本把行撑破 */
  }
  .field label { display: block; margin-bottom: 4px; font-size: 12px; color: #5c6b62; }
  .field input {
    width: 100%; /* 输入框填满所属的弹性列 */
    padding: 6px 8px;
    border: 1px solid #cfdad4;
    border-radius: 6px;
    font: inherit;
  }
  /* 按钮组：不参与放大，保持自身宽度并靠右 */
  .actions { flex: 0 0 auto; margin-left: auto; display: flex; gap: 8px; align-items: flex-end; }
  .actions button { padding: 6px 14px; border: 1px solid #2f6b4f; border-radius: 6px; background: #fff; color: #2f6b4f; }
</style>

<p class="hint">拖右下角收窄：三个字段从「一行三个」逐步变成「一行两个」「一行一个」，全程没有媒体查询。</p>

<div class="stage">
  <form class="bar">
    <div class="field"><label>关键词</label><input placeholder="请输入" /></div>
    <div class="field"><label>状态</label><input placeholder="全部" /></div>
    <div class="field"><label>负责人</label><input placeholder="不限" /></div>
    <div class="actions"><button type="button">查询</button></div>
  </form>
</div>`,
          },
          {
            type: 'code',
            title: 'Demo ⑤：clamp() 与 min() —— 字号、间距、内容宽度连续自适应',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 10px; font-size: 12px; color: #5c6b62; }

  .stage {
    resize: horizontal; /* 拖右下角改宽度，观察字号和留白的连续变化 */
    overflow: auto;
    width: 100%;
    min-width: 150px;
    padding: 8px;
    background: #f4f7f5;
    border: 1px solid #cfdad4;
    border-radius: 8px;
  }

  /* 内容容器：min() 取更小值 —— 屏幕宽时定格在 520px，屏幕窄时用满 100% */
  .wrap {
    width: min(100%, 520px); /* ★ 等价于 max-width:520px，但意图更直白，还能参与 calc() */
    margin: 0 auto; /* 左右 auto → 水平居中 */
    padding: clamp(10px, 4%, 24px); /* 内边距也能连续变化：最小 10px、最大 24px */
    background: #fff;
    border: 1px solid #e3eae6;
    border-radius: 8px;
  }

  /* 标题字号：跟着容器宽度连续缩放，但被锁在 16px ~ 26px 之间 */
  .wrap h3 {
    margin: 0 0 8px;
    /* clamp(最小值, 理想值, 最大值)：4vw 表示视口宽度的 4%，
       屏幕再小也不会低于 16px（保证可读），再大也不超过 26px（避免标题巨大换行） */
    font-size: clamp(16px, 4vw, 26px);
    line-height: 1.3;
  }
  .wrap p {
    margin: 0;
    font-size: clamp(12px, 2.4vw, 15px); /* 正文同理，区间收窄一些 */
    color: #5c6b62;
  }
</style>

<p class="hint">拖右下角：标题字号、内边距都在连续变化（不是到某个断点才跳变），并且永远不会小到看不清。</p>

<div class="stage">
  <div class="wrap">
    <h3>clamp() 让字号连续自适应</h3>
    <p>width: min(100%, 520px) 让这块内容在宽屏定格并居中、在窄屏铺满；padding 和字号用 clamp() 设了上下限，所以既跟着屏幕变，又不会变得离谱。</p>
  </div>
</div>`,
          },
          {
            type: 'table',
            title: '不用媒体查询的响应式技巧速查',
            intro: '优先用这些「连续适配」的写法，@media 留给真正需要换版式的场景。',
            headers: ['写法', '含义', '典型用途', '替代了什么'],
            rows: [
              ['flex-wrap: wrap + flex: 1 1 200px', '排不下自动折行，理想宽 200px', '筛选栏、按钮组、表单字段', '一整套「窄屏改成竖排」的媒体查询'],
              ['grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))', '容器有多宽就放几列', '卡片墙、商品列表、数据看板', '三段改列数的媒体查询 + calc()'],
              ['font-size: clamp(16px, 4vw, 28px)', '连续缩放但有上下限', '标题、正文、按钮字号', '每个断点单独调字号'],
              ['width: min(100%, 600px)', '取更小值：宽屏定宽、窄屏铺满', '文章正文、表单容器', 'width + max-width 两行'],
              ['padding: clamp(12px, 3vw, 32px)', '内边距连续变化', '页面边距、卡片内边距', '各断点分别改 padding'],
              ['aspect-ratio: 16 / 9', '按比例算高度', '视频位、封面图占位', 'padding-top 百分比那种老 hack'],
              ['overflow-x: auto', '窄屏时局部横向滚动', '宽表格、长菜单', '强行把表格改成卡片'],
              ['@container (min-width: 320px)', '响应父容器宽度', '可复用组件（卡片、面板）', '给组件传 size 参数'],
            ],
            note: '一句话：能用「连续适配」就别用「断点跳变」。',
          },
          {
            type: 'text',
            title: '8. 顺带两个常用媒体查询：深色模式与打印',
            body: '@media (prefers-color-scheme: dark)：读取用户系统的深色模式偏好，命中时切换成暗色配色——不需要用户在你的页面里再点一次「切换主题」，写法上通常配合 CSS 变量（custom property），只在这个查询里改变量值，全站颜色跟着变。\n\n@media print：打印或打印预览时才生效，用来隐藏导航/侧栏/按钮、去掉背景色和阴影（省墨）、把链接地址显示出来——后台系统的报表和单据页几乎一定要写这一段。',
          },
          {
            type: 'code',
            title: 'Demo ⑥：深色模式 + 打印样式（跟着系统设置变化）',
            language: 'html',
            live: true,
            body: `<style>
  /* 用 CSS 变量（自定义属性）集中管理颜色，切主题时只改变量，不用改每条规则 */
  :root {
    --bg: #ffffff; /* 卡片背景（浅色模式） */
    --fg: #1f2a24; /* 主文字色 */
    --muted: #5c6b62; /* 次要文字色 */
    --line: #e3eae6; /* 边框色 */
  }

  /* ★ 系统开了深色模式时，只重新赋值这几个变量，整块配色就变了 */
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #1c2622;
      --fg: #eaf2ee;
      --muted: #a8bbb2;
      --line: #33453d;
    }
  }

  .panel {
    padding: 14px;
    background: var(--bg); /* 用变量取色 */
    color: var(--fg);
    border: 1px solid var(--line);
    border-radius: 8px;
  }
  .panel p { margin: 6px 0 0; font-size: 12px; color: var(--muted); }
  .panel button {
    margin-top: 10px;
    padding: 6px 12px;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: transparent;
    color: var(--fg);
  }

  /* ★ 打印时才生效：隐藏按钮、去掉边框和背景，省墨也更清爽 */
  @media print {
    .panel { border: 0; background: #fff; color: #000; } /* 打印统一黑字白底 */
    .panel button { display: none; } /* 纸上没法点的东西就别打出来 */
  }
</style>

<div class="panel">
  <strong>配色跟随系统</strong>
  <p>把电脑系统切到「深色外观」，这块会自动变暗（用的是 prefers-color-scheme，不需要页面里再放切换按钮）。按 Ctrl/Cmd + P 预览打印，按钮会消失。</p>
  <button type="button">这个按钮打印时会被隐藏</button>
</div>`,
          },
          {
            type: 'text',
            title: '9. 别忘了图片、表格和长串文本',
            body: '只把布局做成响应式，页面照样会横向滚动——因为下面这几类内容有「天生的最小宽度」。\n\n图片：一张 1200px 宽的图放进 375px 的手机，会把页面顶宽。全站兜底写 img { max-width: 100%; height: auto; }：max-width 让图片不超过容器，height: auto 保持比例不被压扁。想更进一步就用 srcset / picture 给不同屏幕发不同尺寸的图（省流量），再用 aspect-ratio 预留位置避免加载时页面跳动（布局抖动，CLS）。\n\n表格：列多时无法真正塞进手机屏幕。最省事也最好用的办法是给表格套一层 div，写 overflow-x: auto，让表格自己横向滚动，而不是把整页顶宽。\n\n长串文本：超长英文单词、URL、订单号不会自动换行。需要时用 overflow-wrap: break-word（长词允许断行）或 word-break: break-all（更激进，中文场景慎用）。\n\n视频与 iframe：和图片同理，用 max-width: 100% 加 aspect-ratio 控制比例。',
          },
          {
            type: 'code',
            title: 'Demo ⑦：图片、表格、长串文本的响应式兜底',
            language: 'html',
            live: true,
            body: `<style>
  h4 { margin: 0 0 6px; font-size: 12px; color: #2f6b4f; }
  .block { margin-bottom: 18px; }

  /* ① 图片兜底（全站建议加）：这里用内联 SVG 数据地址模拟一张 900px 宽的大图 */
  .shot {
    max-width: 100%; /* ★ 不超过容器宽度，容器窄了就跟着缩 */
    height: auto; /* ★ 高度自动，保持原始宽高比不被压扁 */
    aspect-ratio: 3 / 1; /* 提前告诉浏览器比例，加载时不会「跳一下」（减少布局抖动） */
    display: block; /* 去掉 inline 元素底部那 3px 缝隙 */
    border-radius: 6px;
  }

  /* ② 宽表格：外面套一层可横滑的壳，而不是让整页横向滚动 */
  .table-scroll {
    overflow-x: auto; /* ★ 只让表格这一块能横滑 */
    border: 1px solid #e3eae6;
    border-radius: 6px;
  }
  table { border-collapse: collapse; min-width: 460px; font-size: 12px; } /* min-width 保证列不被挤成一坨 */
  th, td { padding: 6px 10px; border-bottom: 1px solid #eef2f0; white-space: nowrap; text-align: left; }

  /* ③ 长串文本：默认不换行会顶宽容器 */
  .long-bad {
    width: 220px;
    padding: 8px;
    background: #fbe6e2;
    border-radius: 6px;
    font-size: 12px;
    overflow-x: auto; /* 溢出时出现滚动条，暴露问题 */
  }
  .long-good {
    width: 220px;
    padding: 8px;
    background: #e4f0e9;
    border-radius: 6px;
    font-size: 12px;
    overflow-wrap: break-word; /* ★ 允许在超长单词内部断行，不再顶宽容器 */
  }
</style>

<div class="block">
  <h4>① 图片：max-width: 100% + height: auto</h4>
  <!-- 用 data: 开头的内联 SVG 当图片，不发任何网络请求 -->
  <img class="shot" alt="示意图" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='900' height='300'><rect width='900' height='300' fill='%23cfe6da'/><text x='450' y='165' font-size='42' text-anchor='middle' fill='%232f6b4f'>900px 宽的大图</text></svg>" />
</div>

<div class="block">
  <h4>② 宽表格：外层 overflow-x: auto</h4>
  <div class="table-scroll">
    <table>
      <thead><tr><th>订单号</th><th>客户</th><th>金额</th><th>状态</th><th>创建时间</th></tr></thead>
      <tbody>
        <tr><td>NO-20240001</td><td>张三</td><td>￥1,280</td><td>已付款</td><td>2024-05-01 10:22</td></tr>
        <tr><td>NO-20240002</td><td>李四</td><td>￥860</td><td>待发货</td><td>2024-05-02 09:14</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="block">
  <h4>③ 长串文本：overflow-wrap: break-word</h4>
  <p style="margin:0 0 8px;font-size:12px;color:#5c6b62;">左边没处理（横向滚动），右边加了 break-word。</p>
  <div style="display:flex;gap:10px;flex-wrap:wrap;">
    <div class="long-bad">ORDER-ABCDEFGHIJKLMNOPQRSTUVWXYZ-1234567890</div>
    <div class="long-good">ORDER-ABCDEFGHIJKLMNOPQRSTUVWXYZ-1234567890</div>
  </div>
</div>`,
          },
          {
            type: 'table',
            title: '响应式易错点清单',
            headers: ['现象', '原因', '正确做法'],
            rows: [
              [
                '电脑上缩窗口正常，真机手机上却整页缩小、媒体查询不触发',
                'head 里少了 meta viewport',
                '补上 width=device-width, initial-scale=1',
              ],
              ['媒体查询里的规则被忽略', '@media 写在了基础规则之前（媒体查询不提升优先级）', '把 @media 块放到被覆盖规则之后'],
              [
                '768px 这个宽度下样式「闪」一下或两套都生效',
                '断点重叠：max-width:768px 和 min-width:768px 都含等号',
                '用 max-width: 767.98px 配 min-width: 768px，或统一只用 min-width',
              ],
              ['布局响应式了，页面还是横向滚动', '图片 / 表格 / 长串文本没处理', 'img 加 max-width:100%，表格套 overflow-x:auto，长文本 overflow-wrap'],
              ['手机上图片很模糊或很费流量', '所有设备发同一张图', '用 srcset / picture 按屏幕发不同尺寸'],
              ['断点越加越多，某些宽度下布局很丑', '用断点堆效果，跳过了弹性布局', '先用 flex-wrap / auto-fill minmax / clamp，断点控制在 2~3 个'],
              ['写了 width: 100% 还是溢出', '子元素还有 padding/border，且没设 box-sizing', '全局 *, *::before, *::after { box-sizing: border-box }'],
              ['100vh 在手机上比屏幕高，底部被地址栏挡住', 'vh 不含移动端浏览器工具栏', '用 100dvh（动态视口高度）或 min-height: 100%'],
              ['组件放进侧栏就挤爆', '用屏幕宽度判断，但可用空间由父容器决定', '改用容器查询 @container'],
              ['hover 效果在手机上「粘住」不消失', '触屏没有真正的悬停状态', '把 hover 样式包进 @media (hover: hover)'],
            ],
          },
          {
            type: 'list',
            title: '自检清单：交付前逐条确认',
            ordered: true,
            intro: '把浏览器从最宽慢慢拖到 320px，边拖边对照这个清单。',
            items: [
              'head 里有 meta viewport（width=device-width, initial-scale=1）吗',
              '全站有 box-sizing: border-box 吗（否则 padding 会额外撑宽）',
              '有没有写死的 width？能不能换成 max-width 或 min(100%, Npx)',
              '弹性布局先用上了吗：flex-wrap / repeat(auto-fill, minmax()) / clamp()',
              '断点是「看着布局变丑」定出来的，而不是照着别人的数字抄的',
              '整个项目统一了移动优先（min-width）或桌面优先（max-width），没有混用',
              '@media 块都写在被它覆盖的基础规则之后',
              '相邻断点没有重叠（768 / 767.98 这种成对出现）',
              'img 有 max-width: 100% + height: auto；宽表格套了 overflow-x: auto',
              '长订单号 / URL 有 overflow-wrap: break-word 兜底',
              '在 320px 最窄宽度下，页面没有横向滚动条',
              '深色模式（prefers-color-scheme）和减弱动效（prefers-reduced-motion）至少考虑过',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '先弹性再断点：max-width 代替 width、flex-wrap / auto-fill minmax / clamp() / min() 打底，剩下真的要换版式时才写 @media。新项目一律移动优先（min-width 逐级增强），断点由设计稿和「什么时候变丑」决定，2~3 个够用；别忘 meta viewport、图片 max-width:100% 和表格 overflow-x:auto。',
          },
        ],
      },
    },
    {
      id: 'css-transition-animation',
      title: '过渡与动画：transition 和 @keyframes',
      summary:
        'transition 四个值逐个拆解、哪些属性能过渡（display 为什么不行）、transform 与合成层性能、@keyframes 与 animation 全部子属性，再做 spinner / 骨架屏 / 弹窗 / 折叠面板 / 列表错落入场等实战',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '状态 A 变到状态 B、由用户操作触发 → 用 transition（写在元素本身，不是写在 :hover 里）；要自己反复播、要多个中间步骤 → 用 @keyframes + animation。\n\n性能只有一句话：能用 transform 和 opacity 做的动画，就别去动 width / height / left / margin。',
          },
          {
            type: 'text',
            title: '1. 先分清 transition 和 animation 是两个东西',
            body: '是什么：CSS 里让画面「动起来」有两套机制，很多新手把它们混着写，结果两边都不生效。\n\ntransition（过渡）：本质是「补间」。元素本来就要从状态 A 跳到状态 B（hover 上去背景色从灰变绿），浏览器默认是瞬间跳变；写了 transition 之后，浏览器会自动把中间的每一帧补出来，看起来就平滑了。\n关键点：它必须由「状态改变」触发——:hover、:focus、:checked，或者 React 里改了 style / className。没人去改状态，transition 永远不会自己动。\n\nanimation（动画）：本质是「自己写剧本」。先用 @keyframes 定义一段剧本（0% 什么样、50% 什么样、100% 什么样），再用 animation 把剧本挂到元素上。它不需要任何触发条件，元素一出现就开始播，还能设置无限循环。\n\n怎么选：\n• 只有「两个状态」，且是用户操作引起的 → transition（按钮 hover、输入框聚焦、开关滑动）。\n• 有「多个中间步骤」，或者要一直循环 → animation（loading 转圈、骨架屏微光、心跳呼吸灯）。\n\n它们的共同点：都是浏览器原生实现，跑在渲染管线里，比用 JS 定时器改样式流畅得多，也不占 JS 主线程。',
          },
          {
            type: 'table',
            title: 'transition 和 animation 怎么选（对照表）',
            intro: '判断口诀：「有人碰它才动」用 transition，「自己就会动」用 animation。',
            headers: ['维度', 'transition 过渡', 'animation 动画'],
            rows: [
              ['触发方式', '必须有状态变化（hover / focus / 改 class）', '元素出现就自动播，不需要触发'],
              ['中间步骤', '只有起点和终点两个状态', '@keyframes 里想写几个百分比就写几个'],
              ['能否循环', '不能，一次到位', 'animation-iteration-count: infinite 无限循环'],
              ['能否往返', '状态改回去才会回来', 'direction: alternate 自动来回'],
              ['能否暂停', '不能', 'animation-play-state: paused 随时暂停'],
              ['结束后状态', '回到 CSS 里写的原状态', 'fill-mode: forwards 可以停在最后一帧'],
              ['典型场景', '按钮 hover、输入框聚焦、开关、折叠展开', 'loading 转圈、骨架屏、入场动画、呼吸灯'],
            ],
            note: '两者不冲突，可以同时用：比如卡片自己有入场 animation，hover 时再叠一层 transition 放大。',
          },
          {
            type: 'text',
            title: '2. transition 的四个值：property / duration / timing-function / delay',
            body: '完整写法：transition: <哪些属性> <持续多久> <速度曲线> <延迟多久>;\n例：transition: transform 0.3s ease-in-out 0.1s;\n\n① transition-property —— 哪些属性要平滑\n写属性名，多个用逗号隔开：transition-property: background-color, transform。写 all 表示「所有能过渡的属性都平滑」，方便但有隐患（后面易错点会讲）。\n不写会怎样：默认值是 all，但只写 transition-duration 而不写属性名时，很多人会以为没生效——其实是别的地方错了。\n\n② transition-duration —— 花多长时间走完\n必须带单位：0.3s 或 300ms。这是四个值里唯一必填的——不写它，duration 默认是 0s，等于没有过渡，元素还是瞬间跳变。这是新手第一大坑。\n经验值：微交互（按钮变色、图标旋转）150~250ms；中等位移（下拉菜单、折叠面板）250~400ms；大块入场（弹窗、抽屉）300~500ms。超过 500ms 用户就会觉得「这网站卡」。\n\n③ transition-timing-function —— 速度曲线\n决定「这 0.3s 里，前快后慢还是匀速」。默认 ease（先快后慢），下一段单独讲。\n\n④ transition-delay —— 等多久才开始\n默认 0s。写正数表示延迟启动，常用来做「多个元素依次动」的错落效果。\n\n顺序规则（重要）：简写里写两个时间值时，第一个永远是 duration，第二个才是 delay。写反了就变成「等 0.3 秒再瞬间跳变」。',
          },
          {
            type: 'code',
            title: 'Demo①：transition-property —— 只有列进去的属性才会平滑',
            language: 'html',
            live: true,
            body: `<style>
  /* 关于 body：本 Demo 没有手写 <html>/<body> 标签，
     预览器会自动把下面的代码包进一个完整 HTML 文档的 <body> 里，
     所以这里的 body { ... } 依然能生效。 */
  body { margin: 16px; font: 13px/1.6 system-ui, sans-serif; color: #1f2a24; }

  h4 { margin: 0 0 6px; font-size: 12px; color: #2f6b4f; } /* 小标题：区分三个对照块 */
  .block { margin-bottom: 16px; } /* 每个对照块之间拉开距离，避免看串行 */

  /* 三个盒子的公共外观。注意：这里没写 transition，各自在下面单独写 */
  .box {
    width: 120px; /* 起点宽度 120px，hover 时会变成 220px，用来观察宽度是否平滑 */
    padding: 10px; /* 内边距：让文字不贴边 */
    border-radius: 6px; /* 圆角：纯装饰 */
    background: #dfeee6; /* 起点背景色，hover 时会变深，用来观察颜色是否平滑 */
    font-size: 12px;
    cursor: pointer; /* 鼠标变成小手，暗示「这块可以互动」 */
  }

  /* A：只把 background-color 列进过渡名单 */
  .a {
    transition-property: background-color; /* 只有背景色会补间；width 不在名单里 */
    transition-duration: 0.6s; /* 必填！不写 duration 默认 0s，等于完全没有过渡效果 */
  }

  /* B：把两个属性都列进名单，用逗号隔开 */
  .b {
    transition-property: background-color, width; /* 两个属性都补间，宽度也会平滑地拉长 */
    transition-duration: 0.6s; /* 两个属性共用同一个时长 */
  }

  /* C：用 all 偷懒 —— 所有「可过渡」的属性统统补间 */
  .c {
    transition-property: all; /* 省事写法：不用一个个列。隐患见本节易错点表 */
    transition-duration: 0.6s;
  }

  /* ★ 关键：过渡写在元素本身（.a/.b/.c），不是写在 :hover 里。
     这里的 :hover 只负责「改成什么样」，怎么变过去由上面的 transition 决定。
     好处：鼠标移入是平滑的，移出也一样平滑。 */
  .box:hover {
    width: 220px; /* 终点宽度：比起点宽 100px */
    background: #2f6b4f; /* 终点背景：深绿 */
    color: #fff; /* 文字转白，保证深色背景上还看得清（color 也是可过渡属性） */
  }
</style>

<div class="block">
  <h4>A. transition-property: background-color（宽度会「啪」地跳）</h4>
  <!-- 鼠标移上去：颜色慢慢变，宽度瞬间弹开 —— 因为 width 没被列进名单 -->
  <div class="box a">只有颜色平滑</div>
</div>

<div class="block">
  <h4>B. transition-property: background-color, width（两个都平滑）</h4>
  <div class="box b">颜色和宽度都平滑</div>
</div>

<div class="block">
  <h4>C. transition-property: all（连 color 文字色也一起平滑）</h4>
  <div class="box c">全部平滑</div>
</div>`,
          },
          {
            type: 'code',
            title: 'Demo②：transition-duration 三档对比（150ms / 400ms / 1200ms）',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 10px; font-size: 12px; color: #5c6b62; } /* 操作提示文字 */

  /* 舞台：鼠标移到这一整块上，三根条同时开始跑，方便横向对比速度差 */
  .stage {
    padding: 10px; /* 内边距：让条不贴着边框 */
    background: #f4f7f5; /* 浅灰底：和白色页面区分开 */
    border: 1px dashed #cfdad4; /* 虚线框：标出「鼠标要移进来的范围」 */
    border-radius: 8px;
  }

  .row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; } /* 一行 = 标签 + 轨道，用 flex 横排 */
  .label { width: 70px; font-size: 11px; color: #5c6b62; flex: none; } /* 左侧标签固定 70px，flex:none 防止被压缩 */
  .track { flex: 1; height: 22px; background: #e6ece9; border-radius: 11px; } /* 轨道：吃掉剩余宽度，做成胶囊形 */

  /* 小方块：真正会动的东西 */
  .dot {
    width: 22px; /* 正方形边长 22px，和轨道等高，看起来像轨道里的滑块 */
    height: 22px;
    border-radius: 50%; /* 50% 圆角 = 正圆 */
    background: #2f6b4f;
    transition-property: transform; /* 只过渡 transform：位移动画的标准做法，不触发重排 */
    transition-timing-function: linear; /* 统一用匀速，排除曲线干扰，只对比「时长」这一个变量 */
  }

  /* 三根条唯一的差别就是 duration */
  .d1 { transition-duration: 0.15s; } /* 150ms：快，适合按钮变色这类微交互 */
  .d2 { transition-duration: 0.4s; } /* 400ms：中等，适合面板展开、下拉菜单 */
  .d3 { transition-duration: 1.2s; } /* 1200ms：明显偏慢，界面里会显得拖沓（这里故意夸张，方便观察） */

  /* 鼠标移到舞台上，三个圆点一起向右移动同样的距离 */
  .stage:hover .dot {
    transform: translateX(220px); /* 沿 X 轴右移 220px；translate 不改变文档流，不会挤动别人 */
  }
</style>

<p class="hint">把鼠标移到下面这块灰色区域里：三个点走的距离一样，只是用时不同。</p>

<div class="stage">
  <div class="row"><span class="label">0.15s 快</span><div class="track"><div class="dot d1"></div></div></div>
  <div class="row"><span class="label">0.4s 适中</span><div class="track"><div class="dot d2"></div></div></div>
  <div class="row"><span class="label">1.2s 偏慢</span><div class="track"><div class="dot d3"></div></div></div>
</div>`,
          },
          {
            type: 'text',
            title: '3. timing-function：速度曲线决定动效「像不像真的」',
            body: '是什么：同样是 0.4 秒走完 200px，可以匀速走，也可以「起步慢、中间快、快到终点再刹车」。timing-function（速度曲线，也叫缓动函数 easing）就是描述这个节奏的。\n\n为什么重要：现实世界里没有任何东西是匀速启动、匀速停止的——都有加速和减速。所以 linear（匀速）看起来最「假」、最机械；带缓动的曲线才像真实物体。这是「动效做得好不好看」的分水岭，比时长还关键。\n\n五个常用值：\n• linear：全程匀速。只推荐给「转圈 loading」「跑马灯」这种本来就应该匀速的循环动画。\n• ease（默认值）：快速起步 → 中段最快 → 结尾缓慢刹车。不知道选什么就用它。\n• ease-in：慢启动、越走越快，结尾是最快的时候突然停。适合「元素飞出屏幕 / 消失」。\n• ease-out：起步最快、越走越慢，轻轻停住。适合「元素进入屏幕 / 出现」，是界面里用得最多的一个。\n• ease-in-out：两头慢、中间快。适合「来回移动」「展开收起」这类有始有终的动作。\n\ncubic-bezier(x1, y1, x2, y2)：自定义曲线，四个数字是两个控制点的坐标。上面四个词其实都是它的别名，比如 ease-in-out 就是 cubic-bezier(0.42, 0, 0.58, 1)。\n它还有个隐藏能力：y 值允许超出 0~1，比如 cubic-bezier(0.34, 1.56, 0.64, 1) 会「冲过终点再弹回来」，做出果冻回弹的手感。不用自己算，Chrome DevTools 里点开曲线图标可以直接拖。\n\nsteps(n)：跳步，不补间。把过程切成 n 段台阶跳过去，专门用来播放雪碧图逐帧动画、做打字机光标闪烁。\n\n一条实用规则：出现用 ease-out（快进慢停，显得反应快），消失用 ease-in（慢起快走，走得干脆）。',
          },
          {
            type: 'code',
            title: 'Demo③：四种速度曲线并排跑（linear / ease / ease-in-out / cubic-bezier 回弹）',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 10px; font-size: 12px; color: #5c6b62; }

  /* 舞台：鼠标移进来，四根条同时出发、同时到达，差别全在「路上的节奏」 */
  .stage {
    padding: 10px;
    background: #f4f7f5;
    border: 1px dashed #cfdad4;
    border-radius: 8px;
  }

  .row { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; } /* 每行横排：标签 + 轨道 */
  .label { width: 108px; font-size: 11px; color: #5c6b62; flex: none; } /* 标签比上一个 Demo 宽，因为曲线名字更长 */
  .track {
    flex: 1; /* 吃掉剩余宽度 */
    height: 20px;
    background: #e6ece9;
    border-radius: 10px;
    position: relative; /* 给里面的小方块当定位参照（这里只是为了保险，实际用的是 transform） */
  }

  .dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #2f6b4f;
    transition-property: transform; /* 同样只动 transform */
    transition-duration: 1.1s; /* ★ 四根条时长完全相同，唯一变量是曲线，对比才公平 */
  }

  .f1 { transition-timing-function: linear; } /* 匀速：全程一个速度，最机械、最像机器人 */
  .f2 { transition-timing-function: ease; } /* 默认值：起步快、结尾缓，通用挡 */
  .f3 { transition-timing-function: ease-in-out; } /* 两头慢中间快：适合来回移动、展开收起 */
  .f4 { transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); } /* 自定义：第二个 y 值 1.56 > 1，会冲过终点再弹回来 */

  .stage:hover .dot {
    transform: translateX(200px); /* 四个点位移距离完全一样，都是 200px */
  }
</style>

<p class="hint">鼠标移进灰色区域：四个点同时出发、同时到达（都是 1.1s），但节奏完全不同。注意看第 4 个会冲过头再弹回来。</p>

<div class="stage">
  <div class="row"><span class="label">linear 匀速</span><div class="track"><div class="dot f1"></div></div></div>
  <div class="row"><span class="label">ease 默认</span><div class="track"><div class="dot f2"></div></div></div>
  <div class="row"><span class="label">ease-in-out</span><div class="track"><div class="dot f3"></div></div></div>
  <div class="row"><span class="label">cubic-bezier 回弹</span><div class="track"><div class="dot f4"></div></div></div>
</div>`,
          },
          {
            type: 'code',
            title: 'Demo④：transition-delay —— 靠递增延迟做出错落感',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 10px; font-size: 12px; color: #5c6b62; }

  .stage {
    padding: 12px;
    background: #f4f7f5;
    border: 1px dashed #cfdad4;
    border-radius: 8px;
  }

  .row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
  .label { width: 96px; font-size: 11px; color: #5c6b62; flex: none; }
  .track { flex: 1; height: 20px; background: #e6ece9; border-radius: 10px; }

  .dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #2f6b4f;
    transition: transform 0.45s ease-out; /* ★ 简写：属性 时长 曲线（这里先不写 delay，下面单独加） */
  }

  /* 三个点的位移和时长都一样，只差「什么时候开始」 */
  .g1 { transition-delay: 0s; } /* 立刻出发 */
  .g2 { transition-delay: 0.15s; } /* 等 0.15 秒再出发 */
  .g3 { transition-delay: 0.3s; } /* 等 0.3 秒再出发 —— 三个点就形成了「一个接一个」的波浪感 */

  .stage:hover .dot { transform: translateX(200px); }

  /* 反面教材：把两个时间值写反了会怎样 */
  .wrong {
    transition: transform 0.45s ease-out 0s; /* 正确顺序：先 duration 后 delay */
  }
</style>

<p class="hint">鼠标移进灰色区域：三个点依次出发，形成波浪。这就是「列表项依次入场」最朴素的原理。</p>

<div class="stage">
  <div class="row"><span class="label">delay: 0s</span><div class="track"><div class="dot g1"></div></div></div>
  <div class="row"><span class="label">delay: 0.15s</span><div class="track"><div class="dot g2"></div></div></div>
  <div class="row"><span class="label">delay: 0.3s</span><div class="track"><div class="dot g3"></div></div></div>
</div>`,
          },
          {
            type: 'text',
            title: '4. 哪些属性能过渡？为什么 display 不行',
            body: '规则很简单：只有「值是连续可插值的」属性才能过渡。\n\n能过渡的：颜色（color、background-color、border-color，浏览器会在两个颜色之间取中间色）、长度（width、height、padding、margin、top/left、font-size）、opacity（0 到 1 之间的小数）、transform（位移/缩放/旋转都是数值）、box-shadow、filter、还有 Grid 的 grid-template-rows / columns（现代浏览器已支持，后面折叠面板会用到）。\n\n不能过渡的：\n• display —— 它的值是 none / block / flex 这些关键词，none 和 block 之间没有「中间态」，浏览器算不出第 0.15 秒该显示成什么，所以直接跳变。\n• visibility —— 严格说它是「离散属性」，但有个特殊规则：它会在过渡时间结束时才切换，所以能配合 opacity 用（见下面 Demo）。\n• position、float、font-family、background-image（换图片） —— 同理，关键词或离散值，没有中间态。\n• height: auto —— auto 不是具体数值，浏览器不知道终点是多少像素，也没法插值（折叠面板那节专门讲）。\n\n新手最大的坑：写了 transition: all 0.3s，然后 hover 时把 display: none 改成 display: block，指望它淡入——结果永远是瞬间出现。\n\n正确替代方案（三件套，缺一不可）：\n1. opacity: 0 → 1 负责淡入淡出（可过渡）。\n2. visibility: hidden → visible 负责「隐藏时不能被点到、读屏软件也读不到」（opacity:0 的元素其实还在原地挡着鼠标）。\n3. 给 visibility 单独设 transition，让它延迟到动画结束才切回 hidden，否则元素会先消失再开始淡出，等于没淡。\n\n2024 年后的新写法：现代浏览器支持 transition-behavior: allow-discrete，配合 @starting-style 可以让 display 也参与过渡。但兼容性还没铺满，工作中仍以 opacity + visibility 这套为准。',
          },
          {
            type: 'table',
            title: '常见属性能否过渡（对照表）',
            intro: '判断标准就一条：这个属性的值，能不能算出「中间状态」。',
            headers: ['属性', '能否过渡', '原因 / 备注'],
            rows: [
              ['opacity', '✅ 能', '0~1 的小数，插值最自然，性能也最好'],
              ['transform', '✅ 能', '位移/缩放/旋转都是数值，且不触发重排，动画首选'],
              ['color / background-color / border-color', '✅ 能', '浏览器能在两个颜色之间取中间色'],
              ['width / height（具体数值）', '✅ 能', '能过渡，但会触发重排，性能差，能避则避'],
              ['margin / padding / top / left', '✅ 能', '同上：能动但会重排，位移优先改用 transform'],
              ['box-shadow / filter / border-radius', '✅ 能', '能过渡，box-shadow 大范围模糊时较耗性能'],
              ['grid-template-rows / columns', '✅ 能', '现代浏览器已支持，0fr → 1fr 是折叠面板的新解法'],
              ['display', '❌ 不能', 'none/block 是关键词，没有中间态 → 用 opacity + visibility 替代'],
              ['visibility', '⚠️ 半能', '离散切换，但会等到过渡结束再切，所以能给 opacity 兜底'],
              ['height: auto', '❌ 不能', 'auto 不是具体数值，终点算不出来 → 用 max-height 或 0fr→1fr'],
              ['position / float', '❌ 不能', '关键词属性，改了直接重排跳变'],
              ['background-image（换图）', '❌ 不能', '两张图之间没有中间图；渐变之间部分浏览器可插值'],
              ['font-family', '❌ 不能', '字体是离散值，无法插值'],
            ],
            note: '拿不准时的土办法：打开 DevTools 改这个属性，看画面是「滑过去」还是「跳过去」，一试便知。',
          },
          {
            type: 'code',
            title: 'Demo⑤：display 过渡失败 vs opacity + visibility 正确写法',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 10px; font-size: 12px; color: #5c6b62; }
  h4 { margin: 0 0 6px; font-size: 12px; color: #2f6b4f; }
  .block { margin-bottom: 18px; }

  /* 触发区：鼠标移到这块上，下面的提示框就「出现」 */
  .trigger {
    display: inline-block; /* 行内块：既能设内边距，又不独占一整行 */
    padding: 8px 14px;
    background: #dfeee6;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
  }

  /* 提示框的公共外观 */
  .pop {
    margin-top: 8px;
    padding: 10px;
    width: 240px;
    background: #2f6b4f;
    color: #fff;
    border-radius: 6px;
    font-size: 12px;
  }

  /* ===== A：错误示范 —— 想给 display 加过渡 ===== */
  .pop-bad {
    display: none; /* 初始隐藏。none 表示「从渲染树里彻底拿掉」，不占位置 */
    transition: display 0.6s; /* ✗ 白写：display 是关键词属性，没有中间态，浏览器直接忽略补间 */
  }
  .block-bad:hover .pop-bad {
    display: block; /* 终点：变回块级显示。结果是「啪」地弹出来，完全没有淡入 */
  }

  /* ===== B：正确示范 —— opacity 负责淡，visibility 负责能不能点 ===== */
  .pop-good {
    opacity: 0; /* ① 透明度 0：看不见，但元素仍然占位、仍然能挡住鼠标 */
    visibility: hidden; /* ② 所以还要 visibility:hidden：彻底不可交互，读屏软件也会跳过它 */
    transform: translateY(-6px); /* ③ 顺便向上偏移 6px，配合淡入做出「从上方滑下来」的手感 */

    /* ★ 三条过渡分别写，用逗号隔开 —— 这是本 Demo 的核心 */
    transition:
      opacity 0.35s ease, /* 透明度：正常补间 0.35 秒 */
      transform 0.35s ease, /* 位移：和透明度同步 */
      visibility 0s linear 0.35s; /* 关键：时长 0s + 延迟 0.35s，让「变回 hidden」推迟到淡出结束之后 */
      /* 如果不给 visibility 加这个延迟：鼠标一移开它立刻 hidden，元素瞬间消失，淡出动画根本来不及播 */
  }

  .block-good:hover .pop-good {
    opacity: 1; /* 终点：完全不透明 */
    visibility: visible; /* 终点：可见可交互 */
    transform: translateY(0); /* 终点：回到原位，完成「滑下来」的效果 */
    transition-delay: 0s; /* 出现时不要延迟：三条过渡的 delay 统统清零，立刻开始淡入 */
  }
</style>

<p class="hint">分别把鼠标移到两个按钮上，再移开，对比「出现」和「消失」的手感。</p>

<div class="block block-bad">
  <h4>A. transition: display（无效，硬跳）</h4>
  <span class="trigger">鼠标移上来</span>
  <div class="pop pop-bad">我是硬跳出来的，没有任何淡入淡出。</div>
</div>

<div class="block block-good">
  <h4>B. opacity + visibility + transform（正确）</h4>
  <span class="trigger">鼠标移上来</span>
  <div class="pop pop-good">我是淡入 + 下滑出现的，移开时也会平滑淡出。</div>
</div>`,
          },
          {
            type: 'text',
            title: '5. transform：translate / scale / rotate 三件套',
            body: '是什么：transform 让元素在「视觉上」发生位移、缩放、旋转、倾斜，但不改变它在文档流里占的位置——周围的元素完全不知道它动了，不会被挤开。这一点是它和 margin / left 的本质区别。\n\n三个最常用的函数：\n• translate(x, y) —— 位移。translateX(20px) 右移 20px，translateY(-10px) 上移 10px。百分比是相对「元素自身尺寸」算的，所以 translateX(-50%) 是「往左挪自己一半宽」，这就是经典居中写法 left:50% + translateX(-50%) 的原理。\n• scale(n) —— 缩放。scale(1.05) 放大 5%，scale(0.9) 缩到 90%。可以写两个值 scale(2, 1) 只横向拉伸。缩放是以元素中心为基准的（可用 transform-origin 改基准点）。\n• rotate(deg) —— 旋转。rotate(45deg) 顺时针 45 度，负数逆时针。转圈 loading 就是 rotate(0) → rotate(360deg)。\n\n还有 skew(倾斜) 和 3D 版的 translate3d / rotateY 等，日常用得少。\n\n三条必须知道的规则：\n① 可以连写，但顺序会影响结果：transform: translateX(50px) rotate(45deg) 是「先移动再旋转」，反过来写结果不一样（旋转会把坐标轴一起转过去）。\n② 写第二个 transform 会覆盖第一个，不是叠加。想在 hover 时「保留原有位移再加个放大」，必须把两个函数都重新写全：transform: translateY(-4px) scale(1.05)。这是高频踩坑点。\n③ 对纯行内元素（display: inline 的 span、a）无效——它没有盒子可以变换。加 display: inline-block 就好了。',
          },
          {
            type: 'code',
            title: 'Demo⑥：translate / scale / rotate 三连（外加「组合会覆盖」的坑）',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 10px; font-size: 12px; color: #5c6b62; }

  /* 用 Grid 把四个方块排成一行，间距统一 —— 外层 Grid、内层 Flex 的老组合 */
  .wall {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); /* 自适应列数：窄了自动折行 */
    gap: 12px;
    padding: 20px 12px; /* 上下留白大一点，防止放大/旋转时被容器裁掉 */
    background: #f4f7f5;
    border: 1px dashed #cfdad4;
    border-radius: 8px;
  }

  .box {
    display: flex; /* 内部用 flex 让文字水平垂直居中 */
    align-items: center;
    justify-content: center;
    height: 70px;
    background: #dfeee6;
    border-radius: 8px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.35s ease-out; /* ★ 只过渡 transform：位移/缩放/旋转都走这一条 */
  }

  .t1:hover { transform: translateY(-12px); } /* 上移 12px：负值向上。注意周围方块纹丝不动，因为 translate 不占文档流 */
  .t2:hover { transform: scale(1.15); } /* 放大到 115%：以元素中心为基准；超出部分会盖住邻居，不会挤开它们 */
  .t3:hover { transform: rotate(12deg); } /* 顺时针转 12 度；负数就是逆时针 */

  /* 组合：两个函数写在同一条 transform 里，空格隔开。
     ✗ 如果分两行写 transform: translateY(-8px); transform: scale(1.08);
       后面那条会整个覆盖前面那条，只剩缩放，位移丢失。 */
  .t4:hover { transform: translateY(-8px) scale(1.08); } /* 先上移再放大，一条里写全 */
</style>

<p class="hint">依次把鼠标移到四个方块上。重点观察：动的那个方块「压根没挤动」它的邻居。</p>

<div class="wall">
  <div class="box t1">translateY(-12px)<br />上移</div>
  <div class="box t2">scale(1.15)<br />放大</div>
  <div class="box t3">rotate(12deg)<br />旋转</div>
  <div class="box t4">位移 + 放大<br />（必须写在同一条里）</div>
</div>`,
          },
          {
            type: 'text',
            title: '6. 为什么动画只推荐动 transform 和 opacity（性能核心）',
            body: '先理解浏览器画一帧要走几步（渲染管线）：\n\n① Layout（布局 / 重排 / 回流 reflow）：算出每个元素在页面上的位置和尺寸。改 width、height、margin、padding、top/left、font-size 都会触发这一步——而且是「牵一发动全身」，一个元素变宽，它后面所有兄弟、父级、可能整棵子树的位置都要重算。这是三步里最贵的。\n② Paint（重绘 repaint）：把算好位置的元素画成像素（填色、画边框、画阴影）。改 background-color、color、box-shadow、border-radius 会触发，比重排便宜，但仍然要重新画。\n③ Composite（合成）：把已经画好的图层像贴纸一样摆到屏幕上。transform 和 opacity 只影响这一步。\n\n关键点来了：合成这一步可以完全交给 GPU 做，而且不占用 JS 主线程。也就是说，即使你的 JS 正在忙（比如在算一个大列表），transform 动画依然能跑满 60fps 不卡。而重排必须在主线程做，主线程一忙，动画立刻掉帧。\n\n所以业界铁律：动画只动 transform 和 opacity。\n• 要位移 → 用 translate，别用 left / margin-left。\n• 要变大变小 → 用 scale，别用 width / height。\n• 要显隐 → 用 opacity，别用 display / visibility 单飞。\n\n补充一个进阶工具：will-change: transform 可以提前告诉浏览器「这个元素等下要动，请先给它单独提升成一个合成层」，避免动画启动那一瞬间的卡顿。但它很费显存，只在真的卡的时候加，而且动画结束后要去掉——绝对不能给一大堆元素无脑加 will-change: transform，那反而会更卡。',
          },
          {
            type: 'table',
            title: '改这个属性会触发渲染管线的哪一步',
            intro: '越靠上越贵。做动画时，尽量只碰最后一档。',
            headers: ['你改的属性', '触发到哪一步', '代价', '动画里该怎么办'],
            rows: [
              ['width / height', '重排 → 重绘 → 合成', '最贵，整棵子树重算', '改用 transform: scale()'],
              ['margin / padding', '重排 → 重绘 → 合成', '最贵，会挤动兄弟元素', '改用 transform: translate()'],
              ['top / left / right / bottom', '重排 → 重绘 → 合成', '贵（即使 position:absolute 也仍需重排）', '改用 transform: translate()'],
              ['font-size / border-width', '重排 → 重绘 → 合成', '贵，会影响文字换行', '尽量别在动画里改'],
              ['background-color / color', '重绘 → 合成', '中等，需要重新画像素', '可以用，小面积无所谓'],
              ['box-shadow / border-radius', '重绘 → 合成', '中等偏贵，大面积模糊很耗', 'hover 上用没问题，别做无限循环'],
              ['transform', '只有合成', '最便宜，可交给 GPU', '✅ 位移 / 缩放 / 旋转全用它'],
              ['opacity', '只有合成', '最便宜，可交给 GPU', '✅ 淡入淡出全用它'],
            ],
            note: '一句话记：transform 和 opacity 是「免费」的，其他都要花钱。想验证的话，打开 DevTools 的 Performance 面板录一段，重排会显示成一大片紫色的 Layout 块。',
          },
          {
            type: 'code',
            title: 'Demo⑦：改 left / width 会挤动别人，改 transform 不会',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 10px; font-size: 12px; color: #5c6b62; }
  h4 { margin: 0 0 6px; font-size: 12px; color: #2f6b4f; }
  .block { margin-bottom: 18px; }

  .stage {
    padding: 10px;
    background: #f4f7f5;
    border: 1px dashed #cfdad4;
    border-radius: 8px;
  }

  .line { display: flex; align-items: center; gap: 8px; } /* 一行里放「会动的块」和「参照物」 */

  .mover {
    width: 90px;
    padding: 10px 0;
    text-align: center;
    background: #2f6b4f;
    color: #fff;
    border-radius: 6px;
    font-size: 12px;
  }
  .ref { padding: 10px 8px; background: #e6ece9; border-radius: 6px; font-size: 11px; color: #5c6b62; } /* 参照物：用来观察它有没有被挤走 */

  /* ===== A：动 width —— 触发重排，右边的参照物被一路推着走 ===== */
  .bad {
    transition: width 0.8s ease-in-out; /* 过渡 width：每一帧浏览器都要重新计算整行的布局 */
  }
  .stage-bad:hover .bad {
    width: 200px; /* 变宽 110px。注意右边灰色参照物被顶着往右跑了 —— 这就是重排 */
  }

  /* ===== B：动 transform —— 只走合成，参照物纹丝不动 ===== */
  .good {
    transition: transform 0.8s ease-in-out; /* 过渡 transform：不参与布局计算，GPU 直接搬图层 */
    transform-origin: left center; /* 缩放基准点改到左边缘，这样它是「往右长」而不是两边一起长，便于和 A 对照 */
  }
  .stage-good:hover .good {
    transform: scaleX(2.2); /* 横向拉伸到 2.2 倍，视觉宽度和 A 差不多，但一次重排都没有 */
  }
</style>

<p class="hint">分别把鼠标移到两块灰色区域里，盯住右边那个「参照物」标签：上面那个会被推走，下面那个一动不动。</p>

<div class="block">
  <h4>A. transition: width（重排，会挤动兄弟元素）</h4>
  <div class="stage stage-bad">
    <div class="line">
      <div class="mover bad">改 width</div>
      <span class="ref">参照物（我被推走了）</span>
    </div>
  </div>
</div>

<div class="block">
  <h4>B. transition: transform（只合成，谁也不打扰）</h4>
  <div class="stage stage-good">
    <div class="line">
      <div class="mover good">改 transform</div>
      <span class="ref">参照物（我没动）</span>
    </div>
  </div>
</div>`,
          },
          {
            type: 'text',
            title: '7. @keyframes：自己写一段动画剧本',
            body: '是什么：@keyframes 用来定义一段「剧本」——在动画进行到 0%、50%、100% 的时候，元素分别长什么样。剩下的中间帧由浏览器补。\n\n语法两步走：\n第一步，定义剧本（写在样式表的任何位置都行，通常放文件末尾统一管理）：\n@keyframes 动画名 { 0% { ... } 100% { ... } }\n第二步，把剧本挂到元素上：\n.box { animation: 动画名 1s ease-in-out infinite; }\n\n关键帧可以写百分比，也可以用 from（= 0%）和 to（= 100%）这两个别名。只有两个状态时用 from/to 更好读；三个及以上就老老实实写百分比。\n\n几个必须知道的细节：\n① 动画名是自定义标识符，不加引号，别用 CSS 关键字（比如别叫 none、inherit）。命名建议带上语义：spin、fade-in-up、pulse。\n② 关键帧里能写的属性和「能过渡的属性」是同一批——display 在这里同样不会补间。\n③ 可以省略 0% 或 100%：省略的那一头会取元素「本来的样式」作为起点/终点。\n④ 同一个百分比可以合并写：0%, 100% { opacity: 1 } —— 做「呼吸灯」这类首尾相同的动画时很省事。\n⑤ @keyframes 是全局的，不像 class 那样有作用域。两个文件里定义同名 keyframes 会互相覆盖（后加载的赢），所以团队里通常给动画名加前缀。CSS Modules / styled-components 会自动帮你把名字改成唯一的哈希，就是为了解决这个问题。',
          },
          {
            type: 'code',
            title: '@keyframes 与 animation 语法拆解（静态对照）',
            language: 'css',
            body: `/* ===== 第一步：定义剧本 ===== */

/* 写法 A：只有首尾两个状态，用 from / to 最好读 */
@keyframes fade-in {
  from { opacity: 0; } /* from 等价于 0%：动画开始时完全透明 */
  to { opacity: 1; } /* to 等价于 100%：动画结束时完全不透明 */
}

/* 写法 B：三个以上的状态，必须写百分比 */
@keyframes bounce {
  0% { transform: translateY(0); } /* 起点：在原位 */
  40% { transform: translateY(-24px); } /* 走到 40% 时弹到最高点 */
  70% { transform: translateY(-10px); } /* 70% 时二次小弹跳，更像真实小球 */
  100% { transform: translateY(0); } /* 终点：回到原位 */
}

/* 写法 C：首尾状态相同时合并写，做呼吸灯 / 心跳最省事 */
@keyframes pulse {
  0%, 100% { transform: scale(1); } /* 两个百分比共用一段样式，逗号隔开 */
  50% { transform: scale(1.12); } /* 中途放大一点点，然后自己缩回去 */
}

/* ===== 第二步：把剧本挂到元素上 ===== */

.demo {
  /* 逐个属性写（清晰，适合初学和调试） */
  animation-name: bounce; /* ① 用哪个剧本，填 @keyframes 后面那个名字 */
  animation-duration: 1.2s; /* ② 播一遍要多久。必填，不写默认 0s 等于不播 */
  animation-timing-function: ease-in-out; /* ③ 速度曲线，和 transition 那一套完全一样 */
  animation-delay: 0.2s; /* ④ 等 0.2 秒才开始（这期间元素显示的是它自己的原样式） */
  animation-iteration-count: infinite; /* ⑤ 播几遍。数字或 infinite 无限循环 */
  animation-direction: alternate; /* ⑥ 播放方向。alternate = 正播一遍倒播一遍，来回往复 */
  animation-fill-mode: forwards; /* ⑦ 结束后停在最后一帧，不弹回原样（详见下一节） */
  animation-play-state: running; /* ⑧ running 播放 / paused 暂停，可随时切换 */

  /* 简写（工作中最常见）：名字和时长必须有，其他按需补。
     顺序规则和 transition 一样：出现两个时间值时，第一个是 duration，第二个是 delay */
  animation: bounce 1.2s ease-in-out 0.2s infinite alternate forwards;

  /* 多个动画同时跑，用逗号隔开（比如既淡入又上移，还各自用不同时长） */
  animation: fade-in 0.4s ease-out, bounce 1.2s ease-in-out infinite;
}`,
          },
          {
            type: 'table',
            title: 'animation 八个子属性速查',
            intro: '简写 animation: name duration timing-function delay iteration-count direction fill-mode play-state。除了两个时间值有先后顺序要求，其余顺序随意。',
            headers: ['子属性', '常用值', '作用', '默认值'],
            rows: [
              ['animation-name', '自定义名字', '用哪段 @keyframes 剧本', 'none（不播）'],
              ['animation-duration', '0.3s / 1200ms', '播一遍要多久（必填，否则等于没动画）', '0s'],
              ['animation-timing-function', 'linear / ease-out / cubic-bezier() / steps()', '速度曲线；转圈 loading 必须用 linear', 'ease'],
              ['animation-delay', '0.2s / -0.5s', '延迟多久开始；负值表示「跳到中间开播」，做错落时很有用', '0s'],
              ['animation-iteration-count', '1 / 3 / infinite', '播几遍；loading、骨架屏用 infinite', '1'],
              ['animation-direction', 'normal / reverse / alternate / alternate-reverse', 'alternate = 正播一遍再倒播一遍，省一半关键帧', 'normal'],
              ['animation-fill-mode', 'none / forwards / backwards / both', '动画开始前、结束后元素长什么样（新手大坑，下节详解）', 'none'],
              ['animation-play-state', 'running / paused', '播放或暂停，配合 :hover / :checked 可做暂停按钮', 'running'],
            ],
            note: 'iteration-count 也可以写小数：0.5 表示只播前半段就停。',
          },
          {
            type: 'code',
            title: 'Demo⑧：iteration-count 与 direction（播几遍、要不要来回）',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 10px; font-size: 12px; color: #5c6b62; }

  /* 剧本：从左边一路移到右边 200px 处 */
  @keyframes slide {
    from { transform: translateX(0); } /* 起点：原位 */
    to { transform: translateX(200px); } /* 终点：右移 200px */
  }

  .stage { padding: 12px; background: #f4f7f5; border: 1px dashed #cfdad4; border-radius: 8px; }
  .row { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
  .label { width: 130px; font-size: 11px; color: #5c6b62; flex: none; }
  .track { flex: 1; height: 20px; background: #e6ece9; border-radius: 10px; }

  .dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #2f6b4f;
    animation-name: slide; /* 三个点用的是同一段剧本 */
    animation-duration: 1.4s; /* 时长也一样 */
    animation-timing-function: ease-in-out; /* 曲线也一样 —— 只让下面三行产生差异 */
  }

  /* A：只播一遍（默认值），播完就停，然后「啪」地弹回起点（因为没设 fill-mode） */
  .k1 { animation-iteration-count: 1; }

  /* B：无限循环，但方向是 normal —— 每次都从头开始，所以到终点后会瞬间闪回起点，看着很跳 */
  .k2 { animation-iteration-count: infinite; }

  /* C：无限循环 + alternate —— 第 2 遍自动倒着播，来回往复，非常顺滑。
     好处：只写了 from/to 两个关键帧，却得到了「去 + 回」完整的往返动画 */
  .k3 { animation-iteration-count: infinite; animation-direction: alternate; }
</style>

<p class="hint">对比看：第一个只走一趟就弹回；第二个到头就硬闪回；第三个来回滑，最自然。</p>

<div class="stage">
  <div class="row"><span class="label">count: 1（走一趟）</span><div class="track"><div class="dot k1"></div></div></div>
  <div class="row"><span class="label">infinite（硬闪回）</span><div class="track"><div class="dot k2"></div></div></div>
  <div class="row"><span class="label">infinite + alternate</span><div class="track"><div class="dot k3"></div></div></div>
</div>`,
          },
          {
            type: 'text',
            title: '8. animation-fill-mode：动画结束后为什么会「弹回原位」',
            body: '现象：写了一段淡入动画 @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }，播完之后元素却又变回半透明/原样了；或者做「滑入后停在右边」，结果一到终点就瞬间弹回左边。\n\n原因：动画只在「播放期间」临时接管元素的样式。播放结束的那一刻，浏览器把控制权还给 CSS 规则本身——元素立刻恢复成它在样式表里写的样子。@keyframes 的最后一帧不会被保留。\n\n解决：animation-fill-mode 就是专门规定「播放区间之外，元素听谁的」。\n\n四个值：\n• none（默认）：动画前后都完全不管，只有播放期间生效。→ 这就是「弹回原位」的元凶。\n• forwards：结束后保留最后一帧（100% / to 里的样式）。→ 最常用，几乎所有一次性动画都要加。\n• backwards：开始前（也就是 delay 那段等待期）就提前应用第一帧（0% / from 的样式）。→ 解决「设了 delay，元素在等待期间先以原样闪一下」的问题。\n• both：forwards + backwards 都要。→ 有 delay 的一次性入场动画基本都写 both，最省心。\n\n实战判断：\n• 一次性入场（弹窗出现、提示条滑入）→ both（或至少 forwards）。\n• 无限循环（spinner、骨架屏）→ 不需要 fill-mode，反正永远不结束。\n\n注意一个副作用：forwards 会让元素「卡」在最后一帧的样式上，后续你用 JS/React 改它的 style 可能会被动画的最终值压住（动画的优先级比普通样式高）。真要在动画结束后接管样式，通常做法是监听 animationend 事件，把动画 class 移除、换成一个普通的最终态 class。',
          },
          {
            type: 'code',
            title: 'Demo⑨：fill-mode none / forwards / both 三方对比',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 10px; font-size: 12px; color: #5c6b62; }

  /* 剧本：从透明 + 偏左，变成不透明 + 归位 */
  @keyframes enter {
    from { opacity: 0; transform: translateX(-40px); } /* 第一帧：看不见，且在左边 40px 处 */
    to { opacity: 1; transform: translateX(0); } /* 最后一帧：完全显示，回到原位 */
  }

  .stage { padding: 12px; background: #f4f7f5; border: 1px dashed #cfdad4; border-radius: 8px; }
  .row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .label { width: 128px; font-size: 11px; color: #5c6b62; flex: none; }

  .card {
    padding: 8px 14px;
    background: #2f6b4f;
    color: #fff;
    border-radius: 6px;
    font-size: 12px;
    opacity: 0.25; /* ★ 元素「本来」的样式：25% 透明。动画结束后如果不设 fill-mode，就会掉回这个值 */
    animation-name: enter;
    animation-duration: 1s; /* 播 1 秒 */
    animation-delay: 1s; /* 等 1 秒才开播 —— 这段等待期正好用来看清 backwards 的作用 */
    animation-timing-function: ease-out;
  }

  /* A：默认 none —— 等待期显示「本来的 0.25 透明」，播完又掉回 0.25，白忙一场 */
  .f-none { animation-fill-mode: none; }

  /* B：forwards —— 结束后保留最后一帧（opacity:1），元素稳稳停住。
     但等待那 1 秒里，它仍然显示的是本来的 0.25 透明，会「先闪一下」 */
  .f-fwd { animation-fill-mode: forwards; }

  /* C：both —— 等待期就提前套用第一帧（完全透明、偏左），结束后又保留最后一帧。
     一次性入场动画的标准答案，前后都不闪 */
  .f-both { animation-fill-mode: both; }
</style>

<p class="hint">动画延迟 1 秒才开始、播 1 秒。刷新预览重看：A 播完掉回半透明；B 播完留住了，但前 1 秒会先闪出来；C 前后都干净。</p>

<div class="stage">
  <div class="row"><span class="label">A. none（播完掉回去）</span><div class="card f-none">fill-mode: none</div></div>
  <div class="row"><span class="label">B. forwards（留住结尾）</span><div class="card f-fwd">fill-mode: forwards</div></div>
  <div class="row"><span class="label">C. both（前后都管）</span><div class="card f-both">fill-mode: both</div></div>
</div>`,
          },
          {
            type: 'text',
            title: '9. 实战开始：从最常用的按钮 hover 说起',
            body: '接下来六个 Demo 覆盖真实项目里出现频率最高的动效，每一个都能直接搬进 React 组件里用。\n\n第一个是按钮 hover。看似简单，但有三个细节决定它「像不像专业作品」：\n① transition 一定写在按钮本身，不写在 :hover 里。写在 :hover 里的话，鼠标移入有动画、移开却是硬跳回去（因为鼠标一离开，:hover 规则连同它里面的 transition 一起失效了）。\n② 放大幅度要小。scale(1.03) ~ scale(1.06) 就够了，超过 1.1 会显得廉价、还容易挡住旁边的内容。\n③ 阴影要跟着变。物理直觉是「离手指越近 = 抬得越高 = 阴影越大越淡」，所以 hover 时阴影要变大变柔，:active（按下）时反而要把元素压回去、阴影收小，形成「按下去」的手感。\n\n另外记得配 :active 状态，让用户点下去有反馈——很多网站只做了 hover，手机上完全没反应，因为触屏没有真正的悬停。',
          },
          {
            type: 'code',
            title: 'Demo⑩：按钮 hover 平滑放大 + 阴影 + 按下回弹',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 12px; font-size: 12px; color: #5c6b62; }
  .bar { display: flex; gap: 12px; flex-wrap: wrap; padding: 16px; background: #f4f7f5; border-radius: 8px; } /* 按钮横排，窄屏自动换行 */

  .btn {
    padding: 9px 20px; /* 内边距撑出按钮的点击区域，别小于 44px 高度太多（移动端易点性） */
    border: none; /* 去掉浏览器默认边框 */
    border-radius: 8px;
    background: #2f6b4f;
    color: #fff;
    font-size: 13px;
    cursor: pointer; /* 鼠标小手：明确告诉用户这能点 */
    box-shadow: 0 1px 3px rgba(31, 42, 36, 0.18); /* 静止态：贴地的浅阴影 */

    /* ★ 过渡写在按钮本身，不写在 :hover 里 —— 这样移入移出都平滑 */
    transition:
      transform 0.18s ease-out, /* 位移/缩放：180ms，微交互要快，慢了显得迟钝 */
      box-shadow 0.18s ease-out, /* 阴影和位移同步变化，物理上才自洽 */
      background-color 0.18s ease-out; /* 背景色也一起过渡 */
  }

  .btn:hover {
    transform: translateY(-2px) scale(1.04); /* 上抬 2px 再放大 4%：幅度克制，才不廉价。两个函数必须写在同一条里 */
    box-shadow: 0 6px 16px rgba(47, 107, 79, 0.32); /* 抬起来了 → 阴影变大变柔变远 */
    background: #3a815f; /* 背景稍微提亮，强化「被选中」的感觉 */
  }

  .btn:active {
    transform: translateY(0) scale(0.98); /* 按下去：落回地面并轻微缩小，模拟「被压扁」 */
    box-shadow: 0 1px 2px rgba(31, 42, 36, 0.22); /* 贴地了 → 阴影收得更小更实 */
    transition-duration: 0.08s; /* 按下的反馈要更快（80ms），慢了会觉得按键失灵 */
  }

  .btn:focus-visible {
    outline: 2px solid #1f4a37; /* 键盘 Tab 聚焦时给明显焦点框 —— 无障碍必备，别用 outline:none 直接删掉 */
    outline-offset: 2px; /* 焦点框和按钮之间留 2px 空隙，更清楚 */
  }

  /* 次要按钮：同一套动效换个配色，说明这套写法是可复用的 */
  .btn.ghost { background: #fff; color: #2f6b4f; border: 1px solid #b9d5c7; }
  .btn.ghost:hover { background: #eef6f1; }
</style>

<p class="hint">移上去看放大和阴影，按住不放看「压下去」的反馈，用 Tab 键切换看焦点框。</p>

<div class="bar">
  <button class="btn">主要按钮</button>
  <button class="btn ghost">次要按钮</button>
</div>`,
          },
          {
            type: 'code',
            title: 'Demo⑪：加载中 spinner（infinite + rotate，必须用 linear）',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 12px; font-size: 12px; color: #5c6b62; }
  .bar { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; padding: 20px; background: #f4f7f5; border-radius: 8px; }
  .cell { display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 11px; color: #5c6b62; } /* 竖排：图 + 说明文字 */

  /* 剧本：转一整圈。这是全世界所有 spinner 的核心 */
  @keyframes spin {
    from { transform: rotate(0deg); } /* 起点 0 度 */
    to { transform: rotate(360deg); } /* 终点 360 度 = 转回原样，所以循环时看不出接缝 */
  }

  /* 经典款：一个圆环，其中一条边染成深色，转起来就是 loading */
  .spinner {
    width: 34px;
    height: 34px;
    border: 3px solid #d8e5de; /* 四条边都是浅色，构成完整圆环底色 */
    border-top-color: #2f6b4f; /* ★ 只把上边染成深色：转起来就成了「一段弧在跑」 */
    border-radius: 50%; /* 正圆：宽高相等 + 50% 圆角 */
    animation: spin 0.8s linear infinite; /* 简写：剧本 spin / 0.8 秒一圈 / ★ 必须 linear 匀速 / 无限循环 */
    /* 为什么必须 linear：默认的 ease 会「每圈起步快、结尾慢」，循环时就一顿一顿的，像卡住了 */
  }

  /* 慢速版：同一段剧本，只改时长，说明剧本是可复用的 */
  .spinner.slow { animation-duration: 1.6s; }

  /* 双色版：把左右两条边也染色，视觉更饱满 */
  .spinner.dual { border-color: #d8e5de; border-top-color: #2f6b4f; border-right-color: #7bb195; }

  /* 三点跳动版：另一种常见 loading，用 animation-delay 递增做出「依次跳」 */
  @keyframes jump {
    0%, 100% { transform: translateY(0); opacity: 0.45; } /* 首尾相同：在底部、偏淡 */
    50% { transform: translateY(-8px); opacity: 1; } /* 中途跳起 8px 并变实 */
  }
  .dots { display: flex; gap: 6px; } /* 三个点横排 */
  .dots i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #2f6b4f;
    animation: jump 0.9s ease-in-out infinite; /* 三个点共用一段剧本 */
  }
  .dots i:nth-child(2) { animation-delay: 0.15s; } /* 第 2 个晚 0.15 秒起跳 */
  .dots i:nth-child(3) { animation-delay: 0.3s; } /* 第 3 个晚 0.3 秒 —— 就有了波浪感 */
</style>

<p class="hint">三种最常见的 loading 写法，核心都只有一段 @keyframes。</p>

<div class="bar">
  <div class="cell"><div class="spinner"></div><span>0.8s linear</span></div>
  <div class="cell"><div class="spinner slow dual"></div><span>1.6s 双色</span></div>
  <div class="cell"><div class="dots"><i></i><i></i><i></i></div><span>三点跳动</span></div>
</div>`,
          },
          {
            type: 'code',
            title: 'Demo⑫：骨架屏微光扫过（linear-gradient + background-position 动画）',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 12px; font-size: 12px; color: #5c6b62; }

  /* 剧本：让背景图从左边外面一路移到右边外面，形成「一道光扫过」 */
  @keyframes shimmer {
    from { background-position: -150% 0; } /* 起点：背景往左挪出去 1.5 个身位，光带还没进画面 */
    to { background-position: 250% 0; } /* 终点：挪到右边外面，光带彻底离开 */
  }

  .card {
    display: flex;
    gap: 12px;
    padding: 14px;
    background: #fff;
    border: 1px solid #e3eae6;
    border-radius: 10px;
  }

  /* 所有灰条的公共样式：这就是骨架屏的「占位块」 */
  .sk {
    /* ★ 三段式渐变：浅灰 → 更亮的白 → 浅灰，中间那道白就是「光」 */
    background: linear-gradient(90deg, #e9eeec 25%, #f7faf9 50%, #e9eeec 75%);
    background-size: 200% 100%; /* ★ 关键：把背景图拉成容器的 2 倍宽，才有富余空间给它左右滑动 */
    border-radius: 5px;
    animation: shimmer 1.4s linear infinite; /* 匀速无限循环；linear 保证扫光速度均匀不顿挫 */
    /* 为什么动 background-position 而不是真的移动一个光带 div：
       省一个元素、不用 overflow 裁剪，而且这属性只触发重绘、不触发重排 */
  }

  .avatar { width: 44px; height: 44px; border-radius: 50%; flex: none; } /* 头像占位：正圆，flex:none 防止被压扁 */
  .lines { flex: 1; display: flex; flex-direction: column; gap: 8px; } /* 右侧文字占位竖排 */
  .l1 { height: 12px; width: 45%; } /* 第一行短一些，模拟标题 */
  .l2 { height: 10px; width: 92%; } /* 正文行 */
  .l3 { height: 10px; width: 68%; } /* 最后一行故意短，模拟段落收尾，更像真实内容 */
</style>

<p class="hint">数据没回来时用它占位：比转圈更能减少「页面在跳」的感觉，用户也大概知道内容长什么样。</p>

<div class="card">
  <div class="sk avatar"></div>
  <div class="lines">
    <div class="sk l1"></div>
    <div class="sk l2"></div>
    <div class="sk l3"></div>
  </div>
</div>`,
          },
          {
            type: 'code',
            title: 'Demo⑬：弹窗淡入淡出（opacity + transform 位移，纯 CSS 开关）',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 12px; font-size: 12px; color: #5c6b62; }

  /* 舞台：给绝对定位的遮罩当参照物（position:relative 是 absolute 的定位父级） */
  .stage {
    position: relative;
    height: 210px;
    background: #f4f7f5;
    border: 1px dashed #cfdad4;
    border-radius: 8px;
    overflow: hidden; /* 裁掉超出部分，避免弹窗动画时把外面撑出滚动条 */
  }

  .toggle { display: none; } /* 藏起真正的复选框，只用它记录「开/关」状态（纯 CSS 开关的老套路） */

  .open-btn {
    display: inline-block;
    margin: 16px;
    padding: 8px 16px;
    background: #2f6b4f;
    color: #fff;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
  }

  /* 半透明黑遮罩：铺满整个舞台 */
  .mask {
    position: absolute; /* 相对 .stage 定位 */
    inset: 0; /* inset:0 是 top/right/bottom/left 全为 0 的简写 = 铺满父级 */
    display: flex; /* 内部用 flex 让弹窗水平垂直居中 */
    align-items: center;
    justify-content: center;
    background: rgba(31, 42, 36, 0.45); /* 半透明黑：压暗背景，聚焦弹窗 */

    opacity: 0; /* 初始透明 */
    visibility: hidden; /* 初始不可交互（光有 opacity:0 的话，它还会挡住下面的按钮） */
    transition:
      opacity 0.28s ease, /* 遮罩淡入淡出 */
      visibility 0s linear 0.28s; /* 关闭时延迟 0.28s 才真正 hidden，给淡出留出时间 */
  }

  /* 弹窗本体：淡入的同时从下方 + 略小 变成 归位 + 原尺寸 */
  .dialog {
    width: 220px;
    padding: 16px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 12px 28px rgba(31, 42, 36, 0.28); /* 大而柔的阴影 = 浮在最上层 */
    font-size: 12px;
    text-align: center;

    opacity: 0; /* 初始透明 */
    transform: translateY(16px) scale(0.96); /* 初始：在下方 16px 处、缩到 96%，营造「从下面弹上来」 */
    transition:
      opacity 0.28s ease-out,
      transform 0.28s cubic-bezier(0.34, 1.3, 0.64, 1); /* 轻微回弹曲线，让弹窗有「弹上来」的手感 */
  }

  /* ★ 核心开关：复选框被勾选时，用「后续兄弟选择器 ~」找到遮罩并改状态 */
  .toggle:checked ~ .mask {
    opacity: 1;
    visibility: visible;
    transition-delay: 0s; /* 打开时不要那 0.28s 的延迟，立刻显示 */
  }
  .toggle:checked ~ .mask .dialog {
    opacity: 1;
    transform: translateY(0) scale(1); /* 归位 + 恢复原尺寸 */
  }

  .close-btn {
    display: inline-block;
    margin-top: 12px;
    padding: 6px 14px;
    background: #eef6f1;
    color: #2f6b4f;
    border-radius: 6px;
    cursor: pointer;
  }
</style>

<p class="hint">点「打开弹窗」和「知道了」，注意弹窗是「淡入 + 从下方弹上来」，关闭时也是平滑淡出，不是硬跳。</p>

<div class="stage">
  <!-- label 的 for 指向 checkbox 的 id，点 label 等于点这个隐藏的复选框 -->
  <input class="toggle" type="checkbox" id="dlg" />
  <label class="open-btn" for="dlg">打开弹窗</label>

  <div class="mask">
    <div class="dialog">
      <strong>这是一个弹窗</strong>
      <p style="margin: 8px 0 0; color: #5c6b62;">opacity 负责淡，transform 负责位移，两个都是「只走合成」的便宜属性。</p>
      <label class="close-btn" for="dlg">知道了</label>
    </div>
  </div>
</div>`,
          },
          {
            type: 'text',
            title: '10. 折叠面板：height: auto 为什么不能过渡，怎么绕过去',
            body: '现象：写了 .panel { height: 0; transition: height 0.3s } .panel.open { height: auto }，结果展开是「啪」地一下，完全没有动画。\n\n原因：过渡需要一个明确的终点数值才能插值。auto 不是数值，它是「让浏览器自己去算」的指令，而这个计算要等布局跑完才知道结果。浏览器在启动过渡的那一刻拿不到具体像素值，于是干脆跳过补间。同理，width: auto、margin: auto 也都不能过渡。\n\n三种解法，从老到新：\n\n方案 A：max-height 障眼法（老项目里最常见）\n把 height 换成 max-height，从 0 过渡到一个「肯定比真实内容高」的值，比如 500px。因为 max-height 只是上限，元素实际高度仍由内容决定，所以看起来就是正常展开。\n代价（必须知道）：如果内容真实高度只有 120px，而你写了 max-height: 500px，那么这 0.3 秒里有超过一半时间是在「从 120px 涨到 500px」，而这段高度变化肉眼看不见——表现就是「展开很快，然后莫名其妙卡住一会儿才结束」。收起时更明显：会先「卡着不动」再突然掉下来。所以 max-height 要尽量贴近真实高度，别随手写 9999px。\n\n方案 B：JS 量高度（很多组件库的做法）\n展开前先用 JS 读出 scrollHeight，把它写成具体的 height 值，动画结束后再设回 auto。效果最精确，但需要 JS 参与，React 里通常靠 ref + useLayoutEffect 实现。\n\n方案 C：grid-template-rows: 0fr → 1fr（现代写法，推荐）\n给容器 display: grid 和 grid-template-rows: 0fr，内层包一个 div 设 overflow: hidden，展开时改成 1fr。\n为什么这样行：grid-template-rows 是可过渡属性，而 0fr → 1fr 的插值是由浏览器在布局阶段算的，它天然知道内容的真实高度。所以既有平滑动画，又不用猜高度、不用写 JS。\n注意：内层那个 div 的 overflow: hidden 不能省，否则收起时内容会溢出来露在外面。\n兼容性：Chrome/Edge/Safari/Firefox 现代版本都已支持，要兼容老浏览器就退回方案 A。',
          },
          {
            type: 'code',
            title: 'Demo⑭：折叠面板三种写法对比（height:auto 失败 / max-height / 0fr→1fr）',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 12px; font-size: 12px; color: #5c6b62; }
  h4 { margin: 0 0 6px; font-size: 12px; color: #2f6b4f; }
  .block { margin-bottom: 16px; }

  .toggle { display: none; } /* 同样藏起复选框，只借用它的 :checked 状态 */

  .head {
    display: block;
    padding: 9px 12px;
    background: #dfeee6;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    user-select: none; /* 防止连点标题时选中文字，交互更像原生控件 */
  }

  .inner {
    padding: 10px 12px; /* 注意：内边距写在最内层，不写在会变高的那一层，否则收起时 padding 会撑出一条缝 */
    background: #f4f7f5;
    font-size: 12px;
    color: #5c6b62;
    line-height: 1.7;
  }

  /* ===== A：直接过渡 height: auto —— 无效，硬跳 ===== */
  .body-auto {
    height: 0; /* 收起状态：高度 0 */
    overflow: hidden; /* 裁掉内容，否则高度 0 也照样露出来 */
    transition: height 0.35s ease; /* ✗ 终点是 auto，浏览器算不出中间值，直接跳变 */
  }
  .toggle:checked ~ .body-auto { height: auto; } /* auto = 「你自己算」，不是数值 → 无法插值 */

  /* ===== B：max-height 障眼法 —— 能动，但有「延迟感」 ===== */
  .body-max {
    max-height: 0; /* 收起：上限 0，等于看不见 */
    overflow: hidden;
    transition: max-height 0.35s ease; /* ✓ max-height 两端都是数值，可以插值 */
  }
  .toggle:checked ~ .body-max {
    max-height: 200px; /* 展开：给一个「肯定够用」的上限。写得越离谱（比如 9999px），收起时的卡顿感越明显 */
  }

  /* ===== C：grid-template-rows 0fr → 1fr —— 现代解法，高度自动精确 ===== */
  .body-grid {
    display: grid; /* 变成网格容器，只有一行 */
    grid-template-rows: 0fr; /* 收起：这一行分到 0 份高度。★ 这个属性是可过渡的 */
    transition: grid-template-rows 0.35s ease; /* 浏览器在布局阶段知道内容真实高度，插值天然准确 */
  }
  .body-grid > div {
    overflow: hidden; /* ★ 必须写：行高被压到 0 时，把内容裁掉，否则会溢出来露在外面 */
    min-height: 0; /* 保险：防止内容的最小高度把行顶开（和 Grid 里 minmax(0,1fr) 是同一个道理） */
  }
  .toggle:checked ~ .body-grid { grid-template-rows: 1fr; } /* 展开：这一行吃满内容需要的高度 */
</style>

<p class="hint">依次点三个标题。A 是硬跳；B 能动但收起时会先「愣一下」；C 最顺滑，而且完全不用猜内容有多高。</p>

<div class="block">
  <h4>A. transition: height（auto 不能过渡 → 硬跳）</h4>
  <input class="toggle" type="checkbox" id="p1" />
  <label class="head" for="p1">点我展开 / 收起</label>
  <div class="body-auto"><div class="inner">height 从 0 到 auto，浏览器不知道 auto 到底是多少像素，于是直接跳过去，一帧动画都没有。</div></div>
</div>

<div class="block">
  <h4>B. max-height: 0 → 200px（能动，但上限给多了会卡顿）</h4>
  <input class="toggle" type="checkbox" id="p2" />
  <label class="head" for="p2">点我展开 / 收起</label>
  <div class="body-max"><div class="inner">max-height 两端都是具体数值，所以能插值。但真实高度只有 60 多像素，剩下的 130 多像素是在「空跑」，收起时就表现为先愣一下再落下。</div></div>
</div>

<div class="block">
  <h4>C. grid-template-rows: 0fr → 1fr（推荐）</h4>
  <input class="toggle" type="checkbox" id="p3" />
  <label class="head" for="p3">点我展开 / 收起</label>
  <div class="body-grid"><div><div class="inner">内容想多高就多高，动画依然精确顺滑。内层那个 div 的 overflow: hidden 是必需品，负责在收起时把内容裁掉。</div></div></div>
</div>`,
          },
          {
            type: 'code',
            title: 'Demo⑮：列表项依次入场（animation-delay 递增做错落）',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 12px; font-size: 12px; color: #5c6b62; }

  /* 剧本：从「下方 + 透明」滑到「原位 + 不透明」，只动 opacity 和 transform，最省性能 */
  @keyframes rise-in {
    from { opacity: 0; transform: translateY(14px); } /* 第一帧：看不见，且在下方 14px */
    to { opacity: 1; transform: translateY(0); } /* 最后一帧：完全显示并归位 */
  }

  .list {
    list-style: none; /* 去掉小圆点 */
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column; /* 竖排 */
    gap: 8px; /* 项之间 8px 间距，用 gap 不用 margin，首尾不会多出空隙 */
  }

  .list li {
    padding: 10px 12px;
    background: #eef6f1;
    border-left: 3px solid #2f6b4f; /* 左侧色条，纯装饰 */
    border-radius: 6px;
    font-size: 12px;

    animation: rise-in 0.45s ease-out both; /* 剧本 / 0.45s / 快进慢停 / ★ both：等待期就先藏好，播完停在最终态 */
    /* 如果这里不写 both：delay 期间每一项都会先以「完整样子」闪出来，然后才开始动画，非常难看 */
  }

  /* ★ 核心：用 :nth-child(n) 给每一项设置递增的延迟，形成「一个接一个」的错落效果 */
  .list li:nth-child(1) { animation-delay: 0.05s; } /* 第 1 项几乎立刻开始 */
  .list li:nth-child(2) { animation-delay: 0.13s; } /* 每项多等 80ms 左右，是最舒服的节奏 */
  .list li:nth-child(3) { animation-delay: 0.21s; } /* 间隔太小（<50ms）看不出错落；太大（>150ms）会觉得页面加载慢 */
  .list li:nth-child(4) { animation-delay: 0.29s; }
  .list li:nth-child(5) { animation-delay: 0.37s; }
  .list li:nth-child(6) { animation-delay: 0.45s; }
  /* 项数不确定时（React 里循环渲染），一般改成行内 style 计算：style={{ animationDelay: index * 0.08 + 's' }} */
  /* 注意：列表很长时不要给第 50 项写 4 秒延迟，用户早就划过去了。通常只给前 6~8 项加延迟，后面统一 */
</style>

<p class="hint">刷新预览重看入场效果：六项依次浮现，而不是「唰」地一起出现。</p>

<ul class="list">
  <li>第 1 项：delay 0.05s</li>
  <li>第 2 项：delay 0.13s</li>
  <li>第 3 项：delay 0.21s</li>
  <li>第 4 项：delay 0.29s</li>
  <li>第 5 项：delay 0.37s</li>
  <li>第 6 项：delay 0.45s</li>
</ul>`,
          },
          {
            type: 'text',
            title: '11. animation-play-state：随时暂停和继续',
            body: '是什么：animation-play-state 只有两个值——running（播放，默认）和 paused（暂停）。它最有价值的地方是：暂停会「冻结在当前这一帧」，恢复时从冻结的地方接着播，而不是从头开始。\n\n三个典型用途：\n① 鼠标移上去暂停轮播 / 跑马灯。这是无障碍规范（WCAG 2.2.2）的明确要求：任何自动播放超过 5 秒的动效，都必须给用户一个暂停的办法。\n② 调试。给某个动画临时加上 paused，就能定格观察某一帧长什么样。\n③ 省电省性能。列表滚出可视区域时把里面的循环动画暂停掉（配合 IntersectionObserver），能明显降低移动端耗电。\n\n和「删掉 animation」的区别：把 animation 属性整个去掉，动画会立刻回到元素的原始样式（相当于取消）；而 paused 是原地定格，状态还留着。所以要「暂停」就必须用 play-state，不能靠删属性。\n\n写法上，配合 :hover 或 :checked 就能纯 CSS 实现：.marquee:hover { animation-play-state: paused }。React 里则通常绑成 style={{ animationPlayState: isPaused ? "paused" : "running" }}。',
          },
          {
            type: 'code',
            title: 'Demo⑯：animation-play-state（勾选暂停 / 鼠标悬停暂停）',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 12px; font-size: 12px; color: #5c6b62; }
  .panel { padding: 16px; background: #f4f7f5; border: 1px dashed #cfdad4; border-radius: 8px; }
  .row { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
  .tip2 { font-size: 11px; color: #5c6b62; }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .spinner {
    width: 32px;
    height: 32px;
    border: 3px solid #d8e5de;
    border-top-color: #2f6b4f;
    border-radius: 50%;
    animation: spin 1s linear infinite; /* 一圈 1 秒，匀速无限转 */
    flex: none; /* 别被 flex 压扁 */
  }

  /* ① 用复选框控制：勾上就暂停。~ 是「后续兄弟选择器」，从复选框往后找 .spinner */
  .pause-box:checked ~ .row .spinner {
    animation-play-state: paused; /* ★ 定格在当前这一帧；取消勾选会从定格处接着转，不会跳回 0 度 */
  }

  .switch {
    display: inline-flex; /* 让「方框 + 文字」并排且能设内边距 */
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: #dfeee6;
    border-radius: 6px;
    font-size: 12px;
    cursor: pointer;
    user-select: none;
  }
  .pause-box { display: none; } /* 藏起原生复选框，用下面的方块自己画 */
  .fake-box {
    width: 13px;
    height: 13px;
    border: 1px solid #2f6b4f;
    border-radius: 3px;
    background: #fff;
    transition: background-color 0.15s ease; /* 勾选状态切换时也来个小过渡，细节更精致 */
  }
  /* 勾上时方块填充深绿：~ 从复选框往后找到 .row，再往里找到那个假方块 */
  .pause-box:checked ~ .row .switch .fake-box { background: #2f6b4f; }

  /* ② 鼠标悬停暂停：轮播 / 跑马灯的标准做法，也是无障碍的基本要求 */
  @keyframes marquee {
    from { transform: translateX(0); } /* 起点：原位 */
    to { transform: translateX(-50%); } /* 终点：左移自身宽度的一半（内容复制了两份，所以刚好首尾相接） */
  }
  .marquee-box {
    overflow: hidden; /* 裁掉滚出去的部分，做出「窗口」效果 */
    background: #fff;
    border: 1px solid #e3eae6;
    border-radius: 6px;
    padding: 8px 0;
  }
  .marquee-track {
    display: flex;
    gap: 20px;
    width: max-content; /* 宽度由内容决定，别被父级压缩，否则 -50% 算错 */
    font-size: 12px;
    color: #2f6b4f;
    animation: marquee 8s linear infinite; /* 匀速滚动，8 秒一轮 */
  }
  .marquee-box:hover .marquee-track {
    animation-play-state: paused; /* ★ 鼠标一停就暂停，方便用户看清内容 */
  }
</style>

<p class="hint">① 点「暂停动画」勾选框，转圈会原地定格，再点一次从定格处继续；② 把鼠标停在下面滚动条上，跑马灯会停住。</p>

<div class="panel">
  <input class="pause-box" type="checkbox" id="pause" />
  <div class="row">
    <div class="spinner"></div>
    <label class="switch" for="pause"><span class="fake-box"></span>暂停动画（play-state: paused）</label>
    <span class="tip2">注意是「定格」不是「重置」</span>
  </div>

  <div class="marquee-box">
    <div class="marquee-track">
      <!-- 内容写两遍，滚动 -50% 时刚好首尾无缝衔接 -->
      <span>鼠标停在这一行上试试 —— 悬停暂停是无障碍的基本要求 ·</span>
      <span>鼠标停在这一行上试试 —— 悬停暂停是无障碍的基本要求 ·</span>
    </div>
  </div>
</div>`,
          },
          {
            type: 'text',
            title: '12. 无障碍：prefers-reduced-motion（别让动效伤到人）',
            body: '为什么必须做：一部分用户对动效是真的会有生理反应的——前庭功能障碍、偏头痛、晕动症患者，看到大幅度位移、缩放、视差滚动会头晕甚至恶心；癫痫敏感人群则怕闪烁。这不是「体验好不好」的问题，是「能不能用」的问题。\n\n操作系统早就提供了开关：Windows 的「显示动画效果」、macOS 的「减少动态效果」、iOS/Android 的辅助功能里都有。用户打开后，浏览器就会让 @media (prefers-reduced-motion: reduce) 这条媒体查询命中。\n\n怎么写（两种策略）：\n① 一刀切兜底：在全局样式里写一段，把所有动画时长压到接近 0。适合快速给整个项目上保险，一般放在 reset.css 里。\n② 精细降级（更推荐）：保留「不引起眩晕」的效果（比如纯 opacity 淡入淡出），只去掉大幅位移、缩放、旋转、视差。这样既照顾了敏感用户，界面也不会变得完全死板。\n\n三个实操细节：\n• 别把时长写成 0s —— 有些依赖 transitionend / animationend 事件的 JS 代码会因为事件不触发而卡住。写 0.01ms 是社区通行做法：既看不见动画，事件又照常触发。\n• 反过来还有 prefers-reduced-motion: no-preference，表示「用户没有特殊要求」。有些人会把炫酷动画整个包进这个查询里，默认不给动画，只在用户明确没要求时才加——属于更保守的做法。\n• 功能性动效（比如加载 spinner）可以保留，因为它传达的是「系统在忙」这个信息；但可以把它换成不旋转的形式，比如脉冲淡入淡出。\n\n这是很多面试会问、但绝大多数人写不出来的加分项，成本却只有几行代码。',
          },
          {
            type: 'code',
            title: 'Demo⑰：prefers-reduced-motion 降级写法（可在系统设置里开关验证）',
            language: 'html',
            live: true,
            body: `<style>
  .hint { margin: 0 0 12px; font-size: 12px; color: #5c6b62; line-height: 1.7; }
  .panel { padding: 16px; background: #f4f7f5; border: 1px dashed #cfdad4; border-radius: 8px; }

  @keyframes float-y {
    0%, 100% { transform: translateY(0); } /* 首尾相同：在原位 */
    50% { transform: translateY(-14px); } /* 中途浮起 14px，来回飘 */
  }

  .ball {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: #2f6b4f;
    animation: float-y 1.4s ease-in-out infinite; /* 默认状态：一直上下浮动 */
  }

  .card {
    margin-top: 14px;
    padding: 10px 14px;
    background: #fff;
    border: 1px solid #e3eae6;
    border-radius: 8px;
    font-size: 12px;
    transition: transform 0.3s ease-out, box-shadow 0.3s ease-out; /* 默认状态：hover 时抬起 */
    cursor: pointer;
  }
  .card:hover {
    transform: translateY(-6px) scale(1.02); /* 位移 + 缩放，正是最容易让人晕的那类效果 */
    box-shadow: 0 8px 20px rgba(31, 42, 36, 0.18);
  }

  /* ===== 策略①：一刀切兜底（通常放全局 reset 里） ===== */
  @media (prefers-reduced-motion: reduce) {
    /* 选中所有元素、以及它们的两个伪元素，一个都不放过 */
    *, *::before, *::after {
      animation-duration: 0.01ms !important; /* ★ 用 0.01ms 而不是 0s：肉眼看不见，但 animationend 事件仍会触发，避免 JS 卡死 */
      animation-iteration-count: 1 !important; /* 把无限循环强制改成只播一次，彻底停下来 */
      transition-duration: 0.01ms !important; /* 过渡同理，瞬间到位 */
      scroll-behavior: auto !important; /* 顺手关掉平滑滚动，它同样会引起眩晕 */
    }
  }

  /* ===== 策略②：精细降级（同一个 Demo 里演示，实际项目二选一即可） ===== */
  @media (prefers-reduced-motion: reduce) {
    .ball {
      animation: none; /* 大幅位移的浮动直接关掉 */
      opacity: 0.75; /* 换成一个静态的视觉区分，信息不丢失 */
    }
    .card:hover {
      transform: none; /* ★ 去掉位移和缩放（晕动的主要来源） */
      box-shadow: 0 4px 12px rgba(31, 42, 36, 0.16); /* 保留阴影变化：不引起眩晕，反馈也还在 */
    }
  }
</style>

<p class="hint">
  默认情况下小球会上下浮动、卡片 hover 会抬起。<br />
  在 macOS「辅助功能 → 显示 → 减少动态效果」或 Windows「设置 → 辅助功能 → 视觉效果 → 动画效果」里打开开关后回来看：小球停住，卡片只剩阴影变化。
</p>

<div class="panel">
  <div class="ball"></div>
  <div class="card">把鼠标移到这张卡片上（开启「减少动态效果」后，它就不再位移了）</div>
</div>`,
          },
          {
            type: 'text',
            title: '13. 易错点专题：三个一定会踩的坑',
            body: '坑一：transition 写在 :hover 里，移出时不平滑\n错误写法：.btn:hover { transform: scale(1.05); transition: transform 0.3s }。\n移入时确实是平滑的——因为此刻 :hover 规则生效，transition 也跟着生效。但鼠标一移开，:hover 规则整体失效，transition 也一起消失了，浏览器手里没有任何过渡指令，只能瞬间跳回原状。\n正确做法：transition 永远写在元素本身（.btn 上），:hover 里只写「变成什么样」。\n唯一的例外是你故意要「进慢出快」：那就在元素上写一个默认 transition，再在 :hover 里覆盖一个不同的时长——这是有意为之，和上面那个错误不是一回事。\n\n坑二：transition: all 的隐患\n它省事，但有三个问题：\n① 你只想让 background-color 平滑，结果连 width、height、box-shadow、甚至以后别人新加的属性都被卷进来，容易出现「莫名其妙的抖动」。\n② 它会把可能触发重排的属性也一起过渡，性能不可控。\n③ 最典型的翻车：元素上有 position: absolute 且用了 top/left 定位，父级尺寸一变，all 会把定位变化也做成动画，元素在页面上「飘」过去。\n建议：明确列出属性名。属性多的时候用逗号分组写，多写几个字换来可预期的行为，非常值。\n\n坑三：React 里 key 一变，动画就重播\nReact 用 key 来判断「这还是不是同一个元素」。key 变了，React 会卸载旧节点、挂载新节点——对浏览器来说这是个全新元素，元素上的入场 animation 自然从头再播一遍。\n最常见的翻车现场：列表用 index 当 key，删掉中间一项，后面所有项的 index 都变了，于是整个列表集体重播入场动画，画面一片混乱。\n解法：\n• 用数据的稳定 id 当 key，不要用 index。\n• 一次性入场动画建议加 fill-mode: both 或 forwards，至少保证停在最终态。\n• 需要「离场动画」时，CSS 单独做不了（元素一被 React 移除就立刻消失，来不及播），要靠库：react-transition-group、framer-motion 的 AnimatePresence，或者自己用状态延迟卸载。\n• 反过来，如果你就是想「让动画重播」（比如错误提示抖一下），最简单的办法反而是手动改 key 强制重建，或者先移除动画 class、强制读一次 offsetWidth 触发重排、再加回来。',
          },
          {
            type: 'table',
            title: '过渡与动画易错点清单',
            intro: '下面每一条都是真实项目里高频踩到的。',
            headers: ['现象', '原因', '正确做法'],
            rows: [
              ['写了 transition 完全不动', '漏写 duration，默认 0s 等于没过渡', '必须写时长：transition: color 0.3s'],
              ['移入平滑、移开却硬跳', 'transition 写在了 :hover 里，移开时规则失效', '把 transition 写在元素本身，:hover 只写终点样式'],
              ['给 display 加过渡没反应', 'display 是关键词属性，没有中间值', '用 opacity + visibility 三件套，visibility 记得配延迟'],
              ['height: 0 → auto 展开是硬跳', 'auto 不是数值，插值算不出终点', '用 max-height，或 grid-template-rows: 0fr → 1fr'],
              ['折叠面板收起时先愣一下才落下', 'max-height 给得远大于真实高度，在空跑', '把 max-height 调到贴近真实高度，或改用 0fr → 1fr'],
              ['hover 时位移丢了只剩缩放', '写了两条 transform，后一条整个覆盖前一条', '合并成一条：transform: translateY(-4px) scale(1.05)'],
              ['动画一卡一卡、掉帧', '动的是 width / left / margin，每帧都触发重排', '换成 transform / opacity，只走合成层'],
              ['转圈 loading 一顿一顿', '用了默认的 ease，每圈起步快结尾慢', '循环动画必须用 linear'],
              ['动画播完弹回原样', 'fill-mode 默认 none，播完就交还控制权', '加 animation-fill-mode: forwards 或 both'],
              ['设了 delay，元素在等待期先闪一下', '等待期还没进入动画，显示的是原样式', '用 fill-mode: backwards 或 both'],
              ['transform 对 span 无效', '纯 inline 元素没有可变换的盒子', '加 display: inline-block 或 block'],
              ['transition: all 导致莫名抖动', 'all 把不想动的属性也卷了进来', '明确列出属性名，多个用逗号隔开'],
              ['React 列表删一项，全部重播动画', 'index 当 key，索引变化导致节点重建', '用数据的稳定 id 当 key'],
              ['元素消失时没有离场动画', '被 React 移除后立刻没了，来不及播', '用 AnimatePresence / react-transition-group 延迟卸载'],
              ['两个组件的动画互相覆盖', '@keyframes 名字是全局的，同名会被后加载的覆盖', '动画名加前缀，或用 CSS Modules 自动哈希'],
            ],
          },
          {
            type: 'list',
            title: '自检清单：动效上线前过一遍',
            ordered: true,
            intro: '能对着逐条回答，动效这块就算过关了。',
            items: [
              'transition 写在元素本身了吗？（不是写在 :hover 里）',
              'duration 写了吗？微交互 150~250ms、面板 250~400ms、大块入场 300~500ms',
              '属性名是明确列出的吗？还是偷懒写了 transition: all',
              '动的是 transform / opacity 吗？有没有在动 width / height / left / margin',
              '循环动画（spinner、跑马灯）用的是 linear 吗？',
              '一次性动画加了 fill-mode: forwards 或 both 吗？（否则播完弹回）',
              '有 delay 的入场动画，等待期会不会先闪一下？（加 backwards / both）',
              '要淡入淡出的元素，opacity 之外配了 visibility 吗？隐藏时还挡不挡鼠标',
              '折叠展开用的是 max-height（贴近真实高度）还是 grid 0fr → 1fr，没在硬过渡 height: auto',
              '自动播放超过 5 秒的动效，给了暂停方式吗？（animation-play-state: paused）',
              '写了 @media (prefers-reduced-motion: reduce) 降级吗？时长用 0.01ms 而不是 0s',
              'hover 动效在手机上有备选方案吗？（触屏没有真正的悬停，可配 @media (hover: hover)）',
              'React 列表用的是稳定 id 当 key，不是 index 吗？',
              '@keyframes 的名字够独特吗？会不会和别的模块撞名',
              'will-change 只加在真的卡顿的元素上，而且用完就移除了吗？',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '两个状态用 transition（写在元素本身，必写 duration，属性名别偷懒写 all）；多步骤或循环用 @keyframes + animation（一次性的记得 fill-mode: forwards/both，循环的记得 linear）。\n\n性能只认一条：位移用 translate、缩放用 scale、显隐用 opacity，别碰 width / height / left / margin。\n\ndisplay 不能过渡 → opacity + visibility；height: auto 不能过渡 → max-height 或 grid-template-rows: 0fr → 1fr。\n\n最后别忘了给敏感用户留条后路：@media (prefers-reduced-motion: reduce)。',
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
            body: '全屏 `column` → body `flex:1` + `row` → 侧栏固定 + 主区 `flex:1` + `overflow:auto`。flex 嵌套滚动必写 `min-height:0`，这是后台布局的分水岭。',
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
