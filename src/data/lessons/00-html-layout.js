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
  .demo-block {
    display: block; /* 可省略：div/p 默认就是 */
    background: #d9ebe1;
    margin: 8px 0;
    padding: 8px;
  }
</style>

<div class="demo-block">我是 div（块级）</div>
<div class="demo-block">我也是 div，即使文字短，也换行</div>
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
    display: inline;
    background: #f3e6d4;
    /* ❌ 对纯 inline 基本无效 */
    width: 200px;
    height: 80px;
    margin: 20px;
    padding: 10px;
  }
</style>

<p>
  前文
  <span class="demo-inline">span 一</span>
  <span class="demo-inline">span 二</span>
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
    display: inline-block;
    width: 100px;
    height: 36px;
    line-height: 36px; /* 单行文字垂直大致居中 */
    text-align: center;
    margin: 6px;
    border-radius: 8px;
    background: #eef6f1;
  }
</style>

<span class="chip">标签A</span>
<span class="chip">标签B</span>
<span class="chip">标签C</span>

<!-- 想两端对齐、垂直居中整组子项 → 改用父级 display:flex -->`,
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
  .label { font-size: 12px; color: #5c6b62; margin: 12px 0 4px; }
  .box {
    justify-content: center;
    align-items: center;
    gap: 8px;
    height: 48px;
    padding: 0 12px;
    background: #d9ebe1;
    border: 1px solid #2f6b4f;
  }
  .as-flex { display: flex; }           /* 独占一行 */
  .as-inline-flex { display: inline-flex; } /* 可并排 */
  .item {
    padding: 4px 10px;
    background: #fff;
    border-radius: 6px;
  }
</style>

<div class="label">display:flex —— 盒子本身独占一行</div>
<div class="box as-flex">
  <span class="item">A</span>
  <span class="item">B</span>
</div>
<div class="box as-flex">
  <span class="item">C</span>
  <span class="item">D</span>
</div>

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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr; /* 三列等分 */
    gap: 10px;
  }
  .grid > div {
    padding: 16px;
    text-align: center;
    background: #eef6f1;
    border-radius: 8px;
  }
</style>

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
  .row { margin: 10px 0; padding: 8px; background: #f7faf8; }
  .box {
    display: inline-block;
    width: 64px; height: 36px; line-height: 36px;
    text-align: center; margin-right: 8px;
    background: #d9ebe1; border-radius: 6px;
  }
  .gone { display: none; }
  .invisible { visibility: hidden; }
</style>

<div class="row">
  中间用 display:none：
  <span class="box">A</span>
  <span class="box gone">B</span>
  <span class="box">C</span>
  <!-- B 完全不占位，A 和 C 靠在一起 -->
</div>

<div class="row">
  中间用 visibility:hidden：
  <span class="box">A</span>
  <span class="box invisible">B</span>
  <span class="box">C</span>
  <!-- B 看不见，但空位还在 -->
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
  .as-inline-block {
    display: inline-block;
    width: 120px;
    padding: 8px;
    background: #d9ebe1;
  }
  .as-block {
    display: block;
    margin: 8px 0;
    background: #f3e6d4;
  }
</style>

<div class="as-inline-block">div1</div>
<div class="as-inline-block">div2</div>

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
      title: '盒子模型与 box-sizing（必须搞懂）',
      summary: 'content / padding / border / margin 四层，以及 border-box 为什么是默认推荐',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '每个可见元素都是一个「盒子」。从里到外四层：content → padding → border → margin。box-sizing 决定你写的 width/height 到底量的是「纯内容区」还是「含 padding+border 的总盒子」。',
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
    width: 200px;
    padding: 20px;                 /* 内边距：背景色会延伸到这里 */
    border: 5px solid #2f6b4f;     /* 边框：有宽度，占空间 */
    margin: 30px;                  /* 外边距：透明，推开邻居 */
    background: #eef6f1;           /* 背景只覆盖 content + padding */
  }
</style>

<div class="box">内容 content</div>

<!-- Chrome 审查 → Computed → 盒模型图，对照四层数字 -->`,
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
  .row { display: flex; gap: 16px; align-items: flex-start; }

  .a {
    box-sizing: content-box; /* 默认：width 不含 padding/border */
    width: 200px;
    padding: 20px;
    border: 5px solid #c53030;
    background: #fde8e8;
  }
  .b {
    box-sizing: border-box;  /* 推荐：width 含 padding+border */
    width: 200px;
    padding: 20px;
    border: 5px solid #2f6b4f;
    background: #eef6f1;
  }
</style>

<div class="row">
  <div class="a">content-box<br/>实际更宽（约 250px）</div>
  <div class="b">border-box<br/>总宽就是 200px</div>
</div>`,
          },
          {
            type: 'code',
            title: '怎么用：项目 reset 模板',
            language: 'css',
            body: `/* 几乎所有现代项目的第一段 CSS */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0; /* 去掉浏览器默认 8px 外边距 */
}`,
          },
          {
            type: 'text',
            title: '3. margin / padding 简写：四个数字怎么读',
            body: '是什么：用一条声明同时设四边（或部分边）的 margin 或 padding。\n\n特点：顺时针记忆——上 → 右 → 下 → 左（像钟表从 12 点开始）。值个数不同，含义不同：1 个值 = 四边相同；2 个值 = 第一个管上下、第二个管左右；3 个值 = 上、左右、下；4 个值 = 上、右、下、左。\n\n为什么用简写：代码短、四边统一调整方便；单独某一边用 margin-top 等 longhand 覆盖即可。\n\n易错：padding-top: 10% 的百分比相对的是「父元素宽度」，不是高度——这是 CSS 规范，很反直觉，遇到百分比竖向间距要小心。',
          },
          {
            type: 'code',
            title: 'margin / padding 简写速查',
            language: 'css',
            body: `/* 四值：上 右 下 左（顺时针） */
padding: 10px 20px 10px 20px;

/* 三值：上  左右  下 */
padding: 10px 20px 30px;

/* 两值：上下  左右 */
margin: 12px 24px;

/* 单值：四边相同 */
margin: 16px;

/* 只改一边 */
margin-top: 8px;
padding-left: 12px;`,
          },
          {
            type: 'text',
            title: '4. margin 合并（collapsing）：空隙「算不对」时先查这个',
            body: '是什么：两个块级元素的垂直 margin 相遇时，不会简单相加，而是取较大值（有时只留一个）。\n\n特点：主要发生在「上下方向」相邻的块级盒子之间；水平 margin 不合并。父子之间、兄弟之间都可能发生。\n\n为什么存在：历史排版规则，模拟报纸段落间距；现代布局里常让人困惑。\n\n怎么用 / 怎么避：需要精确间距时，用 padding 代替 margin；或父级改 display:flex + gap（Flex 子项之间不发生传统 margin 合并）；或只设一边的 margin（如只设 margin-bottom）。\n\n易错：两个 div 各设 margin-top:20px，中间空隙是 20 不是 40——初学者最常懵的点之一。',
          },
          {
            type: 'list',
            title: '盒子模型自检清单',
            ordered: true,
            items: [
              '全局是否已设 box-sizing: border-box？',
              '设 width:50% 两列时，有没有额外 padding/border 撑破一行？',
              '间距用 margin 还是 padding？背景要不要延伸到间距区？',
              '垂直空隙异常时，是否发生了 margin 合并？',
              'DevTools 盒模型图里，四层数字是否和预期一致？',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '盒子四层：content → padding → border → margin。border-box 让 width 含 padding+border，心算简单、布局不撑破。margin 管盒子间距且可能垂直合并；padding 管内容与边框间留白且吃背景色。',
          },
        ],
      },
    },
    {
      id: 'css-selectors',
      title: 'CSS 选择器详解（怎么选中元素）',
      summary: '标签、class、id、后代、子代、并列、伪类……写样式前先会「选人」',
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
  p { color: #333; }            /* 标签：所有 p */
  .title { font-size: 20px; font-weight: 600; }  /* class */
  #main { max-width: 800px; margin: 0 auto; }     /* id */
  * { box-sizing: border-box; } /* 通配：所有元素（reset 常用） */
</style>

<div id="main">
  <p class="title">标题（.title + p 都匹配）</p>
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
  /* 后代：.card 里所有 p（含嵌套很深的） */
  .card p { color: #5c6b63; }

  /* 子代：只选 .card 的直接孩子 p */
  .card > p { font-weight: 600; color: #1f2a24; }

  /* 邻接兄弟：h2 后面紧挨着的第一个 p */
  h2 + p { margin-top: 0; color: #2f6b4f; }

  /* 通用兄弟：h2 后面所有同级 p */
  h2 ~ p { line-height: 1.7; }
</style>

<section class="card">
  <h2>标题</h2>
  <p>直接孩子段落（> 能选中，字更粗）</p>
  <div><p>孙子段落（后代能选中变灰，> 选不中所以不加粗）</p></div>
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
            body: `/* 并集：标题统一字体 */
h1, h2, h3 { font-family: Georgia, serif; }

/* 交集：既是 p 又有 lead class */
p.lead { font-size: 18px; line-height: 1.6; }

/* 多 class 交集 */
.btn.primary { background: #2f6b4f; color: #fff; }
.btn.ghost { background: transparent; border: 1px solid #2f6b4f; }

/* HTML：<button class="btn primary">确定</button> */`,
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
            body: `input[type="text"] { border: 1px solid #ccc; border-radius: 6px; }
input[type="password"] { letter-spacing: 2px; }
input[disabled] { opacity: 0.5; cursor: not-allowed; }
a[href^="https"] { color: #2f6b4f; }  /* 外链 */
a[href$=".pdf"]::after { content: " PDF"; }
img[alt] { outline: 1px dashed #ccc; } /* 有 alt 的图片 */`,
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
  .link:hover { color: #2f6b4f; text-decoration: underline; }
  .link:active { opacity: 0.7; }
  .item:first-child { font-weight: 700; }
  .item:nth-child(odd) { background: #f7faf8; } /* 奇数行 */
  input:focus {
    outline: 2px solid #2f6b4f;
    outline-offset: 2px;
  }
  .btn::before { content: "→ "; }
</style>

<a class="link" href="#">悬停 / 按下我</a>
<ul>
  <li class="item">一</li>
  <li class="item">二</li>
  <li class="item">三</li>
</ul>
<input type="text" placeholder="聚焦看描边" />
<button class="btn">继续</button>`,
          },
          {
            type: 'text',
            title: '6. 优先级（特异性）：谁覆盖谁',
            body: '是什么：多条规则同时命中同一元素时，浏览器按「特异性」决定哪条生效。\n\n粗记顺序（高 → 低）：\n!important > 行内 style > id > class / 属性 / 伪类 > 标签 > 通配 *。\n\n特点：同级别、同特异性时，后写的覆盖先写的（源码顺序）。\n\n为什么了解：改样式「怎么改都不生效」，多半是优先级不够或被更具体的选择器盖掉。\n\n怎么用：日常只用 class，避免 id 写样式、避免 !important；需要覆盖时用「同样或更高特异性」的选择器，而不是无脑加 !important。\n\n易错：#nav .item 比 .item Specificity 高——只改 .item 可能赢不了。',
          },
          {
            type: 'table',
            title: '选择器优先级直觉对照',
            intro: '同一元素被多条规则命中时，谁赢？（简化版，够日常用）',
            headers: ['选择器示例', '特异性（粗记）', '说明'],
            rows: [
              ['*', '最低', '通配，几乎总是输'],
              ['div', '低', '标签'],
              ['.card', '中', 'class，日常主力'],
              ['.card.active', '中+', '多 class 叠加'],
              ['#header', '高', 'id，慎用写样式'],
              ['style="..."', '更高', '行内样式'],
              ['!important', '最高', '能压过普通声明，但难维护'],
            ],
            note: '同等特异性看源码顺序：后写的赢。',
          },
          {
            type: 'code',
            title: '优先级示例',
            language: 'css',
            body: `p { color: black; }        /* 标签：低 */
.text { color: blue; }     /* class：赢 black */
#title { color: red; }      /* id：赢 blue */
/* HTML: <p id="title" class="text"> → 最终红色 */

/* 提高 specificity 的正确方式：加父级，而不是 !important */
.card .title { color: #1f2a24; }`,
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
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'class 复用样式；> 只选儿子，空格选所有后代；+ 紧挨的下一个兄弟。伪类管状态（:hover），伪元素管装饰（::before）。优先级：id > class > 标签；少用 !important，多用 class 组合精确命中。',
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
  /* ❌ 没有 display:flex，justify/align 不会按 Flex 生效 */
  .wrong {
    justify-content: center;
    align-items: center;
    height: 80px;
    border: 1px solid #c53030;
    background: #fde8e8;
  }

  /* ✅ 先开启 flex，再设对齐 */
  .right {
    display: flex;           /* 第一步：必须先开 */
    justify-content: center; /* 第二步：主轴居中 */
    align-items: center;     /* 第二步：交叉轴居中 */
    height: 80px;
    border: 1px solid #2f6b4f;
    background: #eef6f1;
  }
</style>

<div class="wrong"><span>我没有真正居中</span></div>
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
  .as-flex {
    display: flex;          /* 像块级：独占一行 */
    gap: 8px;
    padding: 8px;
    background: #d9ebe1;
  }

  .as-inline-flex {
    display: inline-flex;   /* 像行内块：可并排、可嵌在段落里 */
    gap: 8px;
    padding: 8px;
    background: #f3e6d4;
  }

  .as-flex span,
  .as-inline-flex span {
    padding: 4px 8px;
    background: #fff;
    border-radius: 4px;
  }
</style>

<p>display:flex 的容器（自己独占一行）：</p>
<div class="as-flex">
  <span>A</span><span>B</span><span>C</span>
</div>
<p>后面的文字会被挤到下一行。</p>

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
            body: `【flex-direction: row】（像 Flutter Row）

   主轴 →→→→→→→→→→→→→→→→→→
  ┌─────────────────────────┐
  │  [1]   [2]   [3]        │  ↓ 交叉轴
  └─────────────────────────┘
  justify-content：沿主轴（左右）怎么分布
  align-items     ：沿交叉轴（上下）怎么对齐


【flex-direction: column】（像 Flutter Column）

  主轴 ↓
  ┌─────────┐
  │  [1]    │
  │  [2]    │  交叉轴 →→→
  │  [3]    │
  └─────────┘
  justify-content：沿主轴（上下）怎么分布
  align-items     ：沿交叉轴（左右）怎么对齐`,
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
  .demo {
    display: flex;     /* 必须先开 flex */
    gap: 8px;
    margin-bottom: 16px;
    padding: 8px;
    border: 1px dashed #ccc;
  }
  .row-demo { flex-direction: row; }       /* 横排（可省略，默认） */
  .col-demo { flex-direction: column; }    /* 竖排 */
  .demo div {
    padding: 10px 14px;
    background: #eef6f1;
    border-radius: 6px;
  }
</style>

<!-- 横着：1 2 3 -->
<div class="demo row-demo">
  <div>1</div><div>2</div><div>3</div>
</div>

<!-- 竖着：1 在上，3 在下 -->
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
    display: flex;
    width: 260px;          /* 故意做窄，方便看换行 */
    gap: 8px;
    margin-bottom: 12px;
    border: 1px solid #ccc;
    padding: 8px;
  }
  .no-wrap { flex-wrap: nowrap; } /* 不换行：挤在一起或溢出 */
  .wrap { flex-wrap: wrap; }      /* 换行 */
  .box span {
    flex: 0 0 100px;       /* 基础宽 100px，不放大不缩小 */
    text-align: center;
    padding: 8px 0;
    background: #f3e6d4;
    border-radius: 6px;
  }
</style>

<div class="box no-wrap">
  <span>1</span><span>2</span><span>3</span>
</div>
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
    display: flex;           /* 先开 flex */
    justify-content: center; /* ← 改成 flex-start / flex-end / space-between 等 */
    align-items: center;
    height: 56px;
    margin-bottom: 8px;
    padding: 0 8px;
    border: 1px solid #e6ddd0;
    background: #fff;
  }
  .j span { padding: 4px 10px; background: #eef6f1; border-radius: 4px; }
</style>

<!-- 依次试：flex-start | center | flex-end | space-between | space-around | space-evenly -->
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
    align-items: center;    /* ← 改成 flex-start / flex-end / stretch 对比 */
    height: 100px;
    gap: 8px;
    border: 1px dashed #999;
    padding: 8px;
  }
  .cross div { background: #d9ebe1; padding: 8px; border-radius: 4px; }
  .tall { height: 64px; }   /* 故意做一个更高的，方便观察 */
</style>

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
            body: `.box {
  display: flex;
  gap: 12px;        /* 行间距和列间距都是 12px */
  gap: 8px 16px;    /* 第一个：行间距；第二个：列间距 */
  row-gap: 8px;     /* 只改行间距 */
  column-gap: 16px; /* 只改列间距 */
}`,
          },
          {
            type: 'code',
            title: 'Demo：综合小练习——顶栏',
            language: 'html',
            live: true,
            body: `<style>
  .nav {
    display: flex;                 /* 1. 开启 flex */
    flex-direction: row;           /* 2. 主轴水平（默认，可省略） */
    justify-content: space-between;/* 3. 主轴：两端对齐 */
    align-items: center;           /* 4. 交叉轴：垂直居中 */
    gap: 16px;                     /* 5. 子项空隙 */
    height: 56px;
    padding: 0 16px;
    background: #fff;
    border: 1px solid #e6ddd0;
  }
  .nav a { color: #5c6b63; text-decoration: none; }
</style>

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
  .line {
    display: flex;   /* 父级必须是 flex，子项 flex:1 才有效 */
    gap: 8px;
    margin-bottom: 12px;
  }
  .line > div { background: #eef6f1; padding: 10px; border-radius: 6px; }

  .grow { flex: 1; }           /* 吃剩余，多份均分 */
  .two { flex: 2; }            /* 占两份 */
  .fixed {
    width: 80px;
    flex-shrink: 0;            /* 不要被挤扁 */
  }
</style>

<!-- 三个 flex:1 → 三等分 -->
<div class="line">
  <div class="grow">1</div>
  <div class="grow">1</div>
  <div class="grow">1</div>
</div>

<!-- 左边固定，右边 Expanded -->
<div class="line">
  <div class="fixed">固定</div>
  <div class="grow">剩余全给我</div>
</div>

<!-- 1:2 -->
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
    align-items: center; /* 默认交叉轴居中 */
    height: 90px;
    gap: 8px;
    border: 1px dashed #999;
    padding: 8px;
  }
  .row div { background: #d9ebe1; padding: 8px; border-radius: 4px; }
  .top {
    align-self: flex-start; /* 只让我靠上 */
  }
</style>

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
  .bar {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    border: 1px solid #e6ddd0;
    margin-bottom: 8px;
  }
  .spacer { flex: 1; } /* 空的弹性空间 */
</style>

<!-- 写法 A：空 div -->
<div class="bar">
  <strong>标题</strong>
  <div class="spacer"></div>
  <button>操作</button>
</div>

<!-- 写法 B：margin-left:auto（更短，常用） -->
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
  .card {
    display: flex;
    width: 280px;
    gap: 8px;
    border: 1px solid #ccc;
    padding: 8px;
  }
  .icon { flex-shrink: 0; width: 40px; background: #2f6b4f; color:#fff; text-align:center; }
  .text {
    flex: 1;
    min-width: 0;              /* 关键：允许比内容更窄 */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;   /* 超出显示 … */
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
            body: `<!-- Flutter 等价写法：
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
    display: flex;
    flex-direction: row;
    justify-content: space-between; /* MainAxisAlignment.spaceBetween */
    align-items: center;            /* CrossAxisAlignment.center */
    gap: 12px;
    padding: 12px 16px;
    border: 1px solid #e6ddd0;
    border-radius: 12px;
  }
  .avatar {
    width: 40px; height: 40px; border-radius: 50%;
    background: #2f6b4f; flex-shrink: 0; /* 固定尺寸，不挤扁 */
  }
  .name { flex: 1; min-width: 0; } /* Expanded：吃剩余 */
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
      title: '对照 Flutter：Stack 与定位',
      summary: '层叠布局：relative 父级 + absolute 子级，角标与封面',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'Stack ≈ 父 position:relative；Positioned ≈ 子 position:absolute + top/right/bottom/left。z-index 控制谁盖在上面。父级忘记 relative 是最高频 bug。',
          },
          {
            type: 'text',
            title: '1. 是什么：Stack 式层叠布局',
            body: 'Flutter Stack 让多个 child 叠在同一区域，用 Positioned 或 Align 决定每个 child 的位置。\n\nCSS 里没有名叫 Stack 的属性，但用「定位（position）」可以实现同样效果：\n• 父容器 position:relative —— 建立定位参考系（像 Stack 的边界）。\n• 子元素 position:absolute + top/left/right/bottom —— 相对父容器定位（像 Positioned）。\n• z-index 控制层叠顺序（谁在上）。',
          },
          {
            type: 'text',
            title: '1. position 五个值：各自干什么',
            body: 'static（默认）：正常文档流，top/left 无效，不能当 absolute 的参考祖先。\n\nrelative：相对自己原来的位置偏移（top/left 等），仍占着原来的坑。最常用来当 Stack 容器——本身不一定偏移，只是「我成为定位上下文」。\n\nabsolute：脱离文档流，相对「最近的非 static 祖先」定位；找不到则相对初始包含块（常是 viewport）。\n\nfixed：相对视口定位，滚动也不动——固定顶栏、悬浮按钮。\n\nsticky：滚动到阈值前像 relative，超过阈值像 fixed——吸顶标题栏。',
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
              ['sticky', '特殊', '滚动容器 + 阈值', '吸顶表头、章节标题'],
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
  /* Stack：建立定位上下文 */
  .wrap { position: relative; width: 56px; height: 56px; }
  .avatar {
    width: 56px; height: 56px; border-radius: 50%;
    background: #2f6b4f;
  }
  /* Positioned(top:0, right:0) */
  .badge {
    position: absolute;
    top: 0; right: 0;
    width: 14px; height: 14px; border-radius: 50%;
    background: #c53030; border: 2px solid #fff;
  }
</style>
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
  .cover {
    position: relative;
    width: 200px; height: 120px;
    border-radius: 12px;
    background: linear-gradient(135deg, #2f6b4f, #5c9a78);
  }
  .play {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 44px; height: 44px;
    border-radius: 50%;
    background: rgba(255,255,255,0.9);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
  }
</style>
<div class="cover">
  <div class="play">▶</div>
</div>`,
          },
          {
            type: 'list',
            title: 'Stack 布局易错清单',
            ordered: true,
            items: [
              '父级忘记 position:relative → absolute 子项跑到更外层或 viewport',
              'absolute 子项不撑开父高度 → 父要自己设 height 或非 absolute 内容撑开',
              '只设 top 不设 left → 元素水平位置可能不符合预期',
              '滥用 fixed 导致移动端视口问题 → 先理解再用于全屏浮层',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'Stack = relative 父；Positioned = absolute 子 + 四边偏移。角标、封面、浮层都这套。父没 relative，子就「飘」到别处去了。',
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
  .list {
    height: 200px;      /* 必须有可视高度 —— ListView 的 bounded height */
    overflow-y: auto;   /* 超出则垂直滚动 */
    border: 1px solid #e6ddd0;
    border-radius: 8px;
  }
  .item { padding: 12px; border-bottom: 1px solid #f0ebe3; }
</style>
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
  .chips {
    display: flex;
    gap: 8px;
    overflow-x: auto;    /* 横向滚 */
    overflow-y: hidden;
    padding: 4px 0;
  }
  .chip {
    flex: 0 0 auto;      /* 不缩小，保持固有宽度 */
    white-space: nowrap;
    padding: 8px 14px;
    border-radius: 999px;
    background: #eef6f1;
  }
</style>
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
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <style>
    * { box-sizing: border-box; margin: 0; }
    body { font-family: system-ui, sans-serif; }
    .nav {
      display: flex;              /* Row */
      align-items: center;        /* 垂直居中 */
      gap: 16px;
      padding: 12px 20px;
      border-bottom: 1px solid #e6ddd0;
    }
    .brand { font-weight: 700; text-decoration: none; color: #1f2a24; }
    .menu { display: flex; gap: 16px; } /* 菜单内部再套一层 flex */
    .menu a { color: #5c6b63; text-decoration: none; font-size: 14px; }
    .btn {
      margin-left: auto;          /* Spacer 效果：推到最右 */
      padding: 8px 14px; border: 0; border-radius: 8px;
      background: #2f6b4f; color: #fff; cursor: pointer;
    }
  </style>
</head>
<body>
  <header class="nav">
    <a class="brand" href="#">Web Study</a>
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
  * { box-sizing: border-box; }
  .feed {
    max-width: 480px;
    display: flex;
    flex-direction: column;  /* Column：多条卡片纵向 */
    gap: 12px;
  }
  .card {
    display: flex;           /* Row：头像 + 文字横排 */
    gap: 12px;
    padding: 14px;
    border: 1px solid #e6ddd0;
    border-radius: 12px;
    background: #fff;
  }
  .avatar {
    width: 48px; height: 48px;
    border-radius: 12px;
    background: #2f6b4f;
    flex-shrink: 0;          /* 固定尺寸，不被挤扁 */
  }
  .content {
    flex: 1;                 /* Expanded：吃剩余 */
    min-width: 0;            /* 允许文字区变窄 → ellipsis 生效 */
  }
  .title { font-weight: 600; }
  .desc {
    margin-top: 4px;
    font-size: 13px;
    color: #5c6b63;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
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
  html, body, #app { height: 100%; }
  #app {
    display: flex;
    flex-direction: column;
    height: 100vh;           /* 占满视口 */
  }
  .top {
    flex-shrink: 0;          /* 顶栏不被压缩 */
    padding: 12px 16px;
    background: #1f2a24;
    color: #fff;
  }
  .body {
    flex: 1;                 /* 吃掉顶栏以下全部高度 */
    display: flex;
    min-height: 0;           /* ★ 关键：允许内部出现滚动 */
  }
  .side {
    width: 200px;
    flex-shrink: 0;          /* 侧栏固定宽 */
    background: #24352c;
    color: #c5d4cb;
    padding: 12px;
  }
  .main {
    flex: 1;
    overflow: auto;          /* 主区局部滚 */
    padding: 16px;
    background: #fffaf3;
  }
  .block {
    height: 120px;
    margin-bottom: 12px;
    background: #fff;
    border: 1px solid #e6ddd0;
    border-radius: 10px;
  }
</style>
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
