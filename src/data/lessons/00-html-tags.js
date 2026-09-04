/**
 * HTML 常用标签章节（小白向：标签写法 + 属性说明 + 可编辑预览）
 */
const htmlTags = {
  id: 'html-tags',
  title: 'HTML 常用标签',
  summary:
    '网页由标签搭骨架：标题、段落、链接、图片、列表、表格、表单、语义化布局——写法、常用属性、左边改代码右边看效果',
  order: 1,
  items: [
    {
      id: 'html-basics',
      title: 'HTML 是什么？最小完整页面',
      summary:
        '标签、属性、嵌套规则；DOCTYPE / html / head / body / meta / title 各自干什么',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'HTML（HyperText Markup Language）用「标签」给内容贴身份：这段是标题、那段是段落、那块是链接。浏览器读懂标签后，再配合 CSS 画样式、用 JavaScript 加交互。学 React 之前，先会认标签、写对结构，后面写 JSX 才会轻松。',
          },
          {
            type: 'text',
            title: '1. 标签长什么样？',
            body: '最常见写法是成对出现：\n\n`<标签名 属性名="属性值">内容</标签名>`\n\n例如：`<p class="intro">你好</p>`\n\n- **开始标签**：`<p>`，告诉浏览器「段落从这里开始」\n- **结束标签**：`</p>`，斜杠 `/` 表示结束\n- **内容**：夹在中间的文字或子标签\n- **属性**：写在开始标签里，用 `名="值"`，用来补充信息（链接地址、图片路径、CSS 类名等）\n\n还有一类**自闭合标签**（没有内容可包）：`<img src="..." alt="..." />` 或写成 `<br>`。图片、换行、水平线都属于这一类。',
          },
          {
            type: 'list',
            title: '2. 小白必须先守住的三条规则',
            ordered: true,
            items: [
              '标签要正确闭合：开了 <div> 就要有 </div>；嵌套时后开的先关（像叠盘子）',
              '属性值建议用双引号包起来：class="box"、href="https://..."',
              '标签名不区分大小写，但业界统一写小写：写 <Div> 能跑，但别养成坏习惯',
            ],
          },
          {
            type: 'text',
            title: '3. 最小完整 HTML 文档里每块干什么？',
            body: '**`<!DOCTYPE html>`**：声明「这是 HTML5 文档」。不是标签，是给浏览器的说明书，写在最顶上一行。\n\n**`<html lang="zh-CN">`**：整页根元素。`lang` 属性告诉浏览器/读屏软件这页主要是中文，利于无障碍和 SEO。\n\n**`<head>`**：放「页面元信息」，用户通常看不到 head 里的文字。常见子标签：\n- `<meta charset="UTF-8">`：字符编码，防止中文乱码（几乎每页都要）\n- `<meta name="viewport" content="width=device-width, initial-scale=1.0">`：让手机按设备宽度缩放，移动端必写\n- `<title>`：浏览器标签页上的标题，收藏夹也会用这个名字\n- 还可以放 `<link>` 引 CSS、`<script>` 引 JS（进阶再细讲）\n\n**`<body>`**：用户真正看到的内容，全部写在这里。',
          },
          {
            type: 'code',
            title: '动手改：改 title 和 body 里的文字，看右侧变化',
            language: 'html',
            live: true,
            body: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>我的第一页</title>
</head>
<body>
  <h1>你好，HTML</h1>
  <p>把这段文字改掉，右侧会跟着变。</p>
</body>
</html>`,
          },
          {
            type: 'table',
            title: '骨架标签速查',
            headers: ['写法', '作用', '小白注意'],
            rows: [
              ['<!DOCTYPE html>', '声明 HTML5', '必须放在第一行'],
              ['<html lang="zh-CN">', '页面根节点', 'lang 写语言代码'],
              ['<head>...</head>', '元信息区', '标题、编码、引入资源'],
              ['<meta charset="UTF-8">', '字符编码', '防中文乱码'],
              ['<title>...</title>', '标签页标题', '写在 head 里'],
              ['<body>...</body>', '可见内容', '页面主体都在这'],
            ],
          },
          {
            type: 'tip',
            title: '和本站 Live Demo 的关系',
            body: '下面多数示例只写 body 里的片段（不写完整 html/head）。预览组件会自动包一层完整文档，所以你专心练「内容标签」即可。若你自己写了 <!DOCTYPE> / <html>，则按完整文档直接预览。',
          },
        ],
      },
    },
    {
      id: 'headings-paragraphs',
      title: '标题、段落、换行与分割线',
      summary: 'h1~h6、p、br、hr 的用法；标题层级含义；什么时候用 br、什么时候用新段落',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '标题用 h1~h6 表示「大纲层级」，段落用 p 包一整段话；换行用 br，主题分割用 hr。不要为了「字变大」乱用 h1——那是结构，不是单纯样式。',
          },
          {
            type: 'text',
            title: '1. 标题 h1 ~ h6',
            body: '六个级别，数字越小级别越高：\n\n- **`<h1>`**：通常一页一个，表示页面主标题（文章大标题、产品名）\n- **`<h2>`**：大章节\n- **`<h3>`~`<h6>`**：逐级更小的小节\n\n浏览器默认会把 h1 显示得最大、h6 最小，但这是「默认样式」。真正重要的是**语义**：搜索引擎和读屏软件靠标题层级理解页面结构。\n\n常见错误：为了好看连续写五个 h1；或者跳级（h1 下面直接 h4）。尽量保持层级连贯。',
          },
          {
            type: 'code',
            title: '标题层级：改文字，观察大小与结构',
            language: 'html',
            live: true,
            body: `<h1>一级标题：页面主标题</h1>
<h2>二级标题：章节</h2>
<h3>三级标题：小节</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
<p>这是普通段落，比标题矮一截。</p>`,
          },
          {
            type: 'text',
            title: '2. 段落 p',
            body: '**`<p>一段话</p>`**：表示一个段落。浏览器默认会在段前段后留一点间距。\n\n一段话用一个 p；下一段再开一个新的 p。不要把整篇文章塞进一个巨大的 p 里，也不要用一堆 `<br>` 硬生生「挤」出段落感——正确做法是多个 p。',
          },
          {
            type: 'text',
            title: '3. 换行 br 与分割线 hr',
            body: '**`<br>`**（line break）：强制换行，但仍属于同一段落/同一上下文。适合诗词断行、地址分行。滥用 br 排版是坏习惯，间距该用 CSS margin/padding。\n\n**`<hr>`**（horizontal rule）：主题分割线，表示「上面和下面对话题不同」。默认会画一条横线，语义上不只是装饰。',
          },
          {
            type: 'code',
            title: 'p / br / hr 对比：自己改几行试试',
            language: 'html',
            live: true,
            body: `<p>这是第一段。里面可以很长，浏览器会自动折行。</p>

<p>
  第二段里用 br 强制换行：<br />
  北京市某某区<br />
  某某路 88 号
</p>

<hr />

<p>分割线下面是另一个主题的段落。</p>`,
          },
          {
            type: 'table',
            title: '属性补充（这组标签本身属性很少）',
            headers: ['标签', '常用属性', '作用'],
            rows: [
              ['h1~h6 / p', 'id、class', '给 CSS/JS 定位；id 页内唯一'],
              ['br', '一般无业务属性', '自闭合，表示换行'],
              ['hr', '一般无业务属性', '自闭合，主题分割'],
            ],
            note: '几乎所有标签都能写 id、class、style、title（鼠标悬停提示）。后面会反复用到 class。',
          },
        ],
      },
    },
    {
      id: 'inline-text',
      title: '文本强调与行内标签',
      summary:
        'strong/em、b/i、u/s、mark、small、sub/sup、code/pre、span——语义和样式别混',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '行内标签嵌在句子里，不会独自占一整行。优先选「有语义」的标签（strong 表示重要、em 表示语气强调），别只会用 span + CSS。',
          },
          {
            type: 'text',
            title: '1. 强调：strong 与 em',
            body: '**`<strong>`**：语义是「重要、严重、关键」，默认显示为粗体。警告、必填说明、关键结论适合它。\n\n**`<em>`**：语义是「强调语气」，默认斜体。读屏软件可能会改变读法。\n\n对比：`<b>`、`<i>` 更偏「视觉粗体/斜体」，现代写作更推荐有语义的 strong/em；若只是装饰性加粗，用 CSS 也可以。',
          },
          {
            type: 'text',
            title: '2. 其它常用文本标签',
            body: '**`<u>`**：下划线。注意别和链接长得太像，避免误导用户去点。\n\n**`<s>`**：删除线，表示「不再正确/已废弃」的内容（比如原价划掉）。\n\n**`<mark>`**：高亮标记，像荧光笔，适合搜索关键词高亮。\n\n**`<small>`**：旁注、版权、细字说明，语义是「附属说明」，不只是字变小。\n\n**`<sub>` / `<sup>`**：下标 / 上标。化学式 H<sub>2</sub>O、平方 m<sup>2</sup>、脚注引用。\n\n**`<code>`**：行内代码片段。\n\n**`<pre>`**：预格式文本，保留空格和换行，常和 code 搭配展示多行代码。\n\n**`<span>`**：没有语义的「钩子」，专门用来挂 class / 做局部样式或 JS 选取。能用语义标签时优先语义标签。',
          },
          {
            type: 'code',
            title: '行内标签大杂烩：改文字观察效果',
            language: 'html',
            live: true,
            body: `<p>
  普通文字，
  <strong>strong 很重要</strong>，
  <em>em 强调语气</em>，
  <b>b 粗体</b>，
  <i>i 斜体</i>，
  <u>u 下划线</u>，
  <s>s 删除线</s>，
  <mark>mark 高亮</mark>，
  <small>small 附属说明</small>。
</p>

<p>水分子：H<sub>2</sub>O；面积：12<sup>2</sup> = 144。</p>

<p>行内代码：<code>const x = 1</code></p>

<pre><code>// pre 会保留换行和缩进
function hello() {
  console.log('hi')
}
</code></pre>

<p>用 span 局部染色：<span style="color:#2f6b4f;font-weight:700;">这段是 span</span></p>`,
          },
          {
            type: 'table',
            title: '怎么选？',
            headers: ['需求', '优先标签', '原因'],
            rows: [
              ['这句话特别重要', 'strong', '有「重要性」语义'],
              ['语气强调', 'em', '有强调语义'],
              ['原价划掉', 's', '表示不再有效'],
              ['搜索命中高亮', 'mark', '就是标记用途'],
              ['句子里插变量名', 'code', '表示代码'],
              ['只想加个 class', 'span', '无语义钩子'],
            ],
          },
        ],
      },
    },
    {
      id: 'links-images',
      title: '链接 a 与图片 img（属性讲透）',
      summary:
        'href/target/rel、src/alt/width/height；绝对路径与相对路径；无障碍必写 alt',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '链接靠 a 的 href 指向去哪；图片靠 img 的 src 加载文件。图片一定要写 alt（替代文本），链到新标签页时建议加 rel="noopener noreferrer"。',
          },
          {
            type: 'text',
            title: '1. 链接标签 <a>',
            body: '基本写法：`<a href="地址">用户看到的文字</a>`\n\n**`href`（Hypertext Reference）**：必写，链接目标。可以是：\n- 完整网址：`https://example.com`\n- 站内路径：`/about.html`、`./page2.html`\n- 页内锚点：`#section-id`（跳到同页 id 处）\n- 特殊协议：`mailto:a@b.com` 发邮件，`tel:10086` 拨号（移动端）\n\n**`target`**：在哪打开。\n- 默认 `_self`：当前窗口打开\n- `_blank`：新标签页打开\n\n**`rel`**：和目标文档的关系。当 `target="_blank"` 时，强烈建议写 `rel="noopener noreferrer"`，防止新页面通过 `window.opener` 操纵原页面（安全习惯）。\n\n**`title`**：鼠标悬停时的提示文字（可选，别把关键信息只放在 title 里）。\n\n**`download`**：提示浏览器下载该资源，而不是打开（对同源文件更可靠）。',
          },
          {
            type: 'code',
            title: '链接示例（可改文字和 href）',
            language: 'html',
            live: true,
            body: `<p>
  <a href="https://developer.mozilla.org/zh-CN/">去 MDN 学 HTML</a>
</p>

<p>
  <a href="#bottom">跳到本页底部锚点</a>
</p>

<p>
  <a
    href="https://example.com"
    target="_blank"
    rel="noopener noreferrer"
  >新标签页打开（带安全 rel）</a>
</p>

<p>
  <a href="mailto:hello@example.com">发邮件</a>
  ·
  <a href="tel:10086">拨打电话</a>
</p>

<p id="bottom" style="margin-top:48px;padding:8px;background:#eef6f1;">
  这里是 id="bottom" 的锚点目标
</p>`,
          },
          {
            type: 'text',
            title: '2. 图片标签 <img>（自闭合）',
            body: '基本写法：`<img src="图片地址" alt="替代文字" />`\n\n**`src`（source）**：图片地址，必写。可以是网上 URL，或项目里的相对路径如 `/images/logo.png`。\n\n**`alt`（alternative text）**：图片加载失败或读屏软件朗读时用的文字。装饰性图片可以写 `alt=""`（空字符串，表示可忽略），有信息的图必须写清楚内容。SEO 和无障碍都依赖它。\n\n**`width` / `height`**：显示宽高（数字默认单位是像素，也可写 `width="100%"` 这类）。建议写上，减轻页面加载时的布局抖动；最终视觉多用 CSS 控制。\n\n**`title`**：悬停提示，不是 alt 的替代品。\n\n**`loading="lazy"`**：懒加载，进入可视区域附近再下载，利于长页性能。',
          },
          {
            type: 'code',
            title: '图片：用 SVG 演示（不依赖外网）',
            language: 'html',
            live: true,
            body: `<p>有意义的图，必须写清 alt：</p>
<img
  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='120'%3E%3Crect width='240' height='120' fill='%232f6b4f'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='18' text-anchor='middle' dy='.35em'%3EDemo Image%3C/text%3E%3C/svg%3E"
  alt="绿色背景上写着 Demo Image 的示意图"
  width="240"
  height="120"
  title="这是 title 悬停提示"
/>

<p style="margin-top:16px;">下面故意写错 src，你会看到破图，但 alt 仍可读：</p>
<img src="./not-found.png" alt="一只橙色的猫坐在窗台上" width="200" height="100" />`,
          },
          {
            type: 'list',
            title: '小白易错清单',
            ordered: true,
            items: [
              '忘记写 alt，或写 alt="图片" 这种废话——要描述图里有什么',
              '把大图当背景装饰却不写空 alt=""，读屏会啰嗦',
              '链接文字写「点击这里」——应写成「查看价格表」这类能独立理解的文案',
              'target="_blank" 却不写 rel="noopener noreferrer"',
            ],
          },
        ],
      },
    },
    {
      id: 'lists',
      title: '列表：无序、有序、定义列表',
      summary: 'ul/ol/li 与 type/start；dl/dt/dd 适合名词解释；列表只能直接包 li',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '一堆并列条目用列表，不要用一堆 br。无序用 ul，有步骤顺序用 ol，术语+解释用 dl。',
          },
          {
            type: 'text',
            title: '1. 无序列表 ul + li',
            body: '**`<ul>`**（unordered list）：条目之间没有先后顺序，默认圆点。\n\n**`<li>`**（list item）：每一个条目。\n\n结构必须是：ul 里面直接放 li（可以再在 li 里嵌套 ul 做多级菜单）。不要把 p、div 直接塞进 ul 当兄弟。',
          },
          {
            type: 'code',
            title: '无序列表（可增删 li）',
            language: 'html',
            live: true,
            body: `<p>购物清单：</p>
<ul>
  <li>鸡蛋</li>
  <li>牛奶</li>
  <li>
    水果
    <ul>
      <li>苹果</li>
      <li>香蕉</li>
    </ul>
  </li>
</ul>`,
          },
          {
            type: 'text',
            title: '2. 有序列表 ol + li',
            body: '**`<ol>`**（ordered list）：有先后顺序，默认 1、2、3…\n\n常用属性：\n- **`type`**：编号样式。`1` 数字（默认），`A` 大写字母，`a` 小写字母，`I` 大写罗马，`i` 小写罗马\n- **`start`**：从几号开始，例如 `start="3"` 从 3 起编\n- **`reversed`**：倒序编号\n\n步骤说明、排行榜、比赛名次适合 ol。',
          },
          {
            type: 'code',
            title: '有序列表：改 type / start 看看编号',
            language: 'html',
            live: true,
            body: `<p>做番茄炒蛋：</p>
<ol>
  <li>打蛋加盐搅匀</li>
  <li>热锅倒油</li>
  <li>先炒蛋盛出</li>
  <li>再炒番茄，回锅混合</li>
</ol>

<p>从第 3 步继续的补丁说明：</p>
<ol start="3" type="A">
  <li>这一项会显示为 C（因为 start=3 且 type=A）</li>
  <li>下一项</li>
</ol>`,
          },
          {
            type: 'text',
            title: '3. 定义列表 dl / dt / dd',
            body: '**`<dl>`**（description list）：一组「术语 → 解释」。\n\n- **`<dt>`**（description term）：词条名\n- **`<dd>`**（description details）：对词条的说明\n\n适合词典、配置说明、商品规格参数。一个 dt 后面可以跟多个 dd。',
          },
          {
            type: 'code',
            title: '定义列表示例',
            language: 'html',
            live: true,
            body: `<dl>
  <dt>HTML</dt>
  <dd>负责页面结构和内容语义。</dd>

  <dt>CSS</dt>
  <dd>负责颜色、字体、布局等视觉样式。</dd>

  <dt>JavaScript</dt>
  <dd>负责交互逻辑：点击、请求数据、动态更新界面。</dd>
</dl>`,
          },
        ],
      },
    },
    {
      id: 'tables',
      title: '表格 table',
      summary:
        'table/thead/tbody/tr/th/td/caption；th 的 scope；单元格合并 colspan/rowspan',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '表格用来展示「行列数据」，不是拿来做页面总布局（那是过时写法）。表头用 th，数据用 td，再配 thead/tbody 更清晰。',
          },
          {
            type: 'text',
            title: '1. 基本结构',
            body: '**`<table>`**：整张表。\n\n**`<caption>`**：表格标题，建议写在 table 内第一行，读屏友好。\n\n**`<thead>`**：表头区；**`<tbody>`**：表体；可选 **`<tfoot>`**：表脚（合计行）。\n\n**`<tr>`**（table row）：一行。\n\n**`<th>`**（table header）：表头单元格，默认加粗居中。\n\n**`<td>`**（table data）：普通数据单元格。\n\n**`th` 的 `scope` 属性**：\n- `scope="col"`：这是「列」的标题\n- `scope="row"`：这是「行」的标题\n帮助辅助技术理解表头对应关系。',
          },
          {
            type: 'text',
            title: '2. 合并单元格',
            body: '**`colspan="数字"`**：横向合并几列。\n\n**`rowspan="数字"`**：纵向合并几行。\n\n合并后，被占掉的格子不要再写多余的 td/th，否则行列会对不齐。',
          },
          {
            type: 'code',
            title: '完整小表格（可改数据）',
            language: 'html',
            live: true,
            body: `<style>
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #9bb5a6; padding: 8px 10px; text-align: left; }
  thead { background: #eef6f1; }
  caption { caption-side: top; text-align: left; margin-bottom: 8px; font-weight: 700; }
</style>

<table>
  <caption>本周学习打卡</caption>
  <thead>
    <tr>
      <th scope="col">日期</th>
      <th scope="col">主题</th>
      <th scope="col">时长</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">周一</th>
      <td>HTML 标签</td>
      <td>2 小时</td>
    </tr>
    <tr>
      <th scope="row">周二</th>
      <td>CSS 布局</td>
      <td>1.5 小时</td>
    </tr>
    <tr>
      <td colspan="2">本周合计</td>
      <td>3.5 小时</td>
    </tr>
  </tbody>
</table>`,
          },
          {
            type: 'table',
            title: '标签/属性速查',
            headers: ['名字', '作用'],
            rows: [
              ['table', '表格容器'],
              ['caption', '表格标题'],
              ['thead / tbody / tfoot', '表头 / 表体 / 表脚分区'],
              ['tr', '一行'],
              ['th', '表头格；配 scope'],
              ['td', '数据格'],
              ['colspan / rowspan', '合并列 / 合并行'],
              ['border-collapse: collapse（CSS）', '相邻边框合并，表格更干净'],
            ],
          },
        ],
      },
    },
    {
      id: 'forms',
      title: '表单：input / textarea / select / button',
      summary:
        'form 的 action/method；label 关联；各种 input type；name/value/placeholder/required',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '表单负责「收集用户输入」。每个控件尽量有 label；提交时靠 name 把数据带给服务器。React 里还会学受控组件，但原生 HTML 表单语义必须先懂。',
          },
          {
            type: 'text',
            title: '1. form 容器',
            body: '**`<form>`** 包住一组控件。\n\n常用属性：\n- **`action`**：提交到哪个 URL（不写则提交到当前页）\n- **`method`**：`get`（参数拼在 URL 上，适合搜索）或 `post`（放请求体，适合登录、上传）\n- **`novalidate`**：关闭浏览器自带校验（一般调试才用）\n\n本页 Live Demo 的 iframe 沙箱不能真的提交跳转，所以下面示例重点看「控件长什么样、属性怎么写」。',
          },
          {
            type: 'text',
            title: '2. label：点文字也能聚焦输入框',
            body: '**`<label for="控件id">说明文字</label>`** + 控件写同一 **`id`**。\n\n好处：点「用户名」三个字，光标也会进输入框；读屏软件能读出字段含义。\n\n也可以把控件直接包在 label 里面，此时可不写 for/id（两种写法都常见）。',
          },
          {
            type: 'text',
            title: '3. input 的常用 type（一定要背会）',
            body: '**`<input>`** 是自闭合标签，靠 **`type`** 变成不同控件：\n\n- **`text`**：普通单行文本（默认）\n- **`password`**：密码，显示圆点\n- **`email`**：邮箱，手机会弹出邮件键盘，浏览器可做简单格式检查\n- **`number`**：数字，可配 min/max/step\n- **`tel`**：电话\n- **`url`**：网址\n- **`search`**：搜索框（部分浏览器带清除按钮）\n- **`checkbox`**：多选方框\n- **`radio`**：单选圆点（同一组要写相同的 `name`）\n- **`file`**：选文件\n- **`hidden`**：隐藏字段，用户看不见但会提交\n- **`date` / `time` / `datetime-local`**：日期时间（观感因浏览器而异）\n- **`color`**：颜色选择\n- **`range`**：滑块\n- **`submit`**：提交按钮（也可改用 button）\n- **`reset`**：重置表单\n- **`button`**：普通按钮（需自己用 JS 绑事件）',
          },
          {
            type: 'text',
            title: '4. 几乎每个输入控件都该认识的属性',
            body: '- **`name`**：提交时的字段名。没有 name，数据常常传不出去\n- **`value`**：当前值；对 checkbox/radio 表示「选中时提交什么」\n- **`placeholder`**：输入前的灰字提示，不能代替 label\n- **`required`**：必填，提交前浏览器会拦\n- **`disabled`**：禁用，不可编辑也不提交\n- **`readonly`**：只读，看得见但改不了，通常仍会提交\n- **`maxlength` / `minlength`**：文本长度限制\n- **`autocomplete`**：是否允许浏览器自动填充，如 `autocomplete="username"`\n- **`checked`**：checkbox/radio 默认选中\n- **`multiple`**：file/select 允许多选',
          },
          {
            type: 'code',
            title: '综合表单：改 type / required 体验浏览器校验',
            language: 'html',
            live: true,
            body: `<style>
  label { display: block; margin: 10px 0 4px; font-weight: 600; }
  input, textarea, select, button {
    font: inherit; padding: 6px 8px; max-width: 100%;
  }
  .row { margin-bottom: 8px; }
  .hint { color: #5c6b62; font-size: 12px; }
</style>

<form action="#" method="post">
  <label for="username">用户名</label>
  <input id="username" name="username" type="text"
         placeholder="请输入用户名" required maxlength="20" />

  <label for="pwd">密码</label>
  <input id="pwd" name="password" type="password" required minlength="6" />

  <label for="mail">邮箱</label>
  <input id="mail" name="email" type="email" placeholder="you@example.com" />

  <label for="age">年龄</label>
  <input id="age" name="age" type="number" min="1" max="120" step="1" />

  <p class="row">
    <label>
      <input type="checkbox" name="agree" value="yes" required />
      我已阅读用户协议（必勾）
    </label>
  </p>

  <p class="row">性别：
    <label><input type="radio" name="gender" value="female" checked /> 女</label>
    <label><input type="radio" name="gender" value="male" /> 男</label>
    <label><input type="radio" name="gender" value="other" /> 其他</label>
  </p>

  <label for="city">城市</label>
  <select id="city" name="city">
    <option value="">请选择</option>
    <option value="bj">北京</option>
    <option value="sh" selected>上海</option>
    <option value="gz">广州</option>
  </select>

  <label for="bio">简介</label>
  <textarea id="bio" name="bio" rows="4" cols="30"
            placeholder="多行文本用 textarea"></textarea>

  <p class="hint">下面点「提交」只会触发浏览器自带校验，预览区不会真的跳转。</p>
  <p class="row">
    <button type="submit">提交</button>
    <button type="reset">重置</button>
    <button type="button">普通按钮（不提交）</button>
  </p>
</form>`,
          },
          {
            type: 'text',
            title: '5. textarea、select、button 补充',
            body: '**`<textarea rows="4" cols="30">初始文案</textarea>`**：多行文本。注意：它不是自闭合，内容写在标签中间；用 `rows`/`cols` 或 CSS 控制尺寸。\n\n**`<select>` + `<option>`**：下拉框。`option` 的 `value` 是提交值，标签中间是用户看到的文字；`selected` 表示默认项。需要分组可用 `<optgroup label="分组名">`。\n\n**`<button type="...">`**：\n- `submit`：在 form 里提交（默认类型在 form 中常常是 submit，建议显式写清）\n- `reset`：清空\n- `button`：不自动提交，交给 JS\n\n更老的写法 `<input type="submit" value="提交">` 也能用，但 button 更灵活（里面可嵌图标、文字更好排）。',
          },
          {
            type: 'list',
            title: '表单小白易错',
            ordered: true,
            items: [
              '只有 placeholder 没有 label——手机读屏和不看灰字的用户会懵',
              'radio 忘了写相同 name，结果变成「都能同时选中」',
              'checkbox 需要提交时忘了写 value',
              '把「取消」做成 type="submit"，一点就提交了——应 type="button"',
            ],
          },
        ],
      },
    },
    {
      id: 'semantic-layout',
      title: '布局容器与语义化标签',
      summary:
        'div/span 与 header/nav/main/section/article/aside/footer；什么时候用语义标签',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'div 是无语义箱子，span 是无语义行内钩子；能表达「这是导航/正文/页脚」时，优先用 header、nav、main、section、article、aside、footer。',
          },
          {
            type: 'text',
            title: '1. div 与 span：最常用也最容易滥用',
            body: '**`<div>`**：块级容器，默认独占一行，用来分组、做布局骨架。本身不告诉浏览器「这是什么内容」。\n\n**`<span>`**：行内容器，用来包住句子里一小段，方便加 class 或让 JS 找到它。\n\n它们像透明塑料袋：好用，但满页只有 div 时，搜索引擎和读屏很难理解结构。现代 HTML 提倡「语义化」——用更具体的标签表达角色。',
          },
          {
            type: 'text',
            title: '2. 常见语义化标签（对照页面区域）',
            body: '**`<header>`**：页头或某个区块的头部（Logo、标题、导航入口）。一页可以有多个 header（比如整页一个，文章再一个）。\n\n**`<nav>`**：主导航链接集合。不是所有链接都要包 nav，只有「导航性质」的那一组。\n\n**`<main>`**：页面的核心内容。一页通常只有一个 main，不要把侧栏广告塞进去。\n\n**`<section>`**：文档中一个主题明确的区块，一般自带标题（里面常有 h2）。\n\n**`<article>`**：可独立成篇的内容：博文、新闻稿、用户评论。可以嵌套。\n\n**`<aside>`**：侧边栏、补充说明、相关链接——和主内容相关但非核心。\n\n**`<footer>`**：页脚或区块脚注：版权、备案、次要链接。\n\n**`<figure>` + `<figcaption>`**：插图/图表及其说明文字。\n\n**`<blockquote>`**：长引用；**`<q>`**：短的行内引用。',
          },
          {
            type: 'code',
            title: '语义化页面骨架（可改文字）',
            language: 'html',
            live: true,
            body: `<style>
  body { margin: 0; font-family: system-ui, sans-serif; }
  header, footer { background: #2f6b4f; color: #fff; padding: 12px 16px; }
  nav a { color: #fff; margin-right: 12px; }
  .layout { display: flex; gap: 12px; padding: 12px; }
  main { flex: 1; }
  aside { width: 140px; background: #eef6f1; padding: 10px; }
  section, article { margin-bottom: 12px; padding: 10px; border: 1px solid #cfe0d6; }
  figcaption { font-size: 12px; color: #5c6b62; }
</style>

<header>
  <strong>学习站 Logo</strong>
  <nav>
    <a href="#">首页</a>
    <a href="#">课程</a>
    <a href="#">关于</a>
  </nav>
</header>

<div class="layout">
  <main>
    <article>
      <h2>如何记住语义化标签</h2>
      <p>把页面当成报纸：报头、栏目、正文、边栏、页脚，各有名字。</p>
      <figure>
        <div style="height:60px;background:#d9ebe1;display:flex;align-items:center;justify-content:center;">示意图</div>
        <figcaption>图：页面区域示意</figcaption>
      </figure>
    </article>

    <section>
      <h2>本节练习</h2>
      <p>试着把某个 div 改成 section，看看结构是否更清晰。</p>
    </section>
  </main>

  <aside>
    <h3>相关链接</h3>
    <p>侧栏放补充信息。</p>
  </aside>
</div>

<footer>© 2026 学习站 · footer 页脚</footer>`,
          },
          {
            type: 'table',
            title: '怎么选 div 还是语义标签？',
            headers: ['场景', '更合适的标签'],
            rows: [
              ['只是为了套 flex 布局、没有业务含义', 'div'],
              ['整站顶部品牌+导航', 'header + nav'],
              ['页面独一无二的正文', 'main'],
              ['一篇可单独转发的文章', 'article'],
              ['带标题的主题区块', 'section'],
              ['侧栏推荐/广告补充', 'aside'],
              ['版权与备案', 'footer'],
              ['句子里一段要染色', 'span'],
            ],
          },
        ],
      },
    },
    {
      id: 'media-misc',
      title: '媒体与其它常用标签',
      summary:
        'video/audio 控件属性；iframe 嵌入；details/summary；ul 之外的 progress/meter 了解',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '音视频用 audio/video 并提供 controls；嵌入外部页面用 iframe（注意安全和性能）；折叠面板可以用原生 details/summary，不一定先上 JS。',
          },
          {
            type: 'text',
            title: '1. video 与 audio',
            body: '**`<video src="..." controls></video>`** 或在内部放多个 `<source>` 兼容不同格式。\n\n常用属性：\n- **`controls`**：显示浏览器自带播放控件（没有它，用户可能看不到任何按钮）\n- **`autoplay`**：自动播放（很多浏览器会静音才允许）\n- **`muted`**：静音\n- **`loop`**：循环\n- **`poster`**：视频封面图地址\n- **`width` / `height`**：尺寸\n- **`preload`**：`none` / `metadata` / `auto`，控制是否预加载\n\n**`<audio>`** 属性类似，没有画面和 poster。\n\n本预览环境可能无法播放真实外链媒体，下面用结构示例教你写法。',
          },
          {
            type: 'code',
            title: 'video / audio 写法模板',
            language: 'html',
            live: true,
            body: `<p>视频标签结构（可改属性）：</p>
<video
  width="320"
  height="180"
  controls
  poster=""
  style="background:#d9ebe1;"
>
  你的浏览器不支持 video。
  <!-- 真实项目写：
  <source src="/movies/demo.mp4" type="video/mp4" />
  -->
</video>

<p style="margin-top:16px;">音频：</p>
<audio controls>
  你的浏览器不支持 audio。
  <!-- <source src="/audio/demo.mp3" type="audio/mpeg" /> -->
</audio>`,
          },
          {
            type: 'text',
            title: '2. iframe：嵌入另一张网页',
            body: '**`<iframe src="地址" title="说明"></iframe>`**\n\n常用属性：\n- **`src`**：嵌入谁\n- **`title`**：必写可读说明（无障碍）\n- **`width` / `height`**：尺寸\n- **`loading="lazy"`**：懒加载\n- **`sandbox`**：给嵌入页加沙箱限制（安全）\n- **`allow`**：权限策略（摄像头、全屏等）\n\n注意：乱嵌不明第三方页面有安全与性能风险；能用官方提供的嵌入代码（地图、视频）更好。本站预览 iframe 本身也在沙箱里，嵌套外链可能被限制。',
          },
          {
            type: 'text',
            title: '3. details / summary：原生折叠',
            body: '**`<details>`** 折叠面板；**`<summary>`** 是始终可见的标题行。点击 summary 展开其余内容。\n\n属性 **`open`**：默认展开。\n\n适合 FAQ、说明书折叠，零 JS 就能用。',
          },
          {
            type: 'code',
            title: 'details 折叠面板',
            language: 'html',
            live: true,
            body: `<details open>
  <summary>什么是 HTML？</summary>
  <p>HTML 用标签描述内容结构。点上面的标题可以折叠/展开。</p>
</details>

<details>
  <summary>什么是 CSS？</summary>
  <p>CSS 负责外观：颜色、间距、布局。</p>
</details>

<details>
  <summary>什么是 JavaScript？</summary>
  <p>JavaScript 负责行为：点击、请求、动态更新。</p>
</details>`,
          },
          {
            type: 'text',
            title: '4. 再认识几个「偶尔会用到」的标签',
            body: '**`<button>`**：按钮（表单章已讲）。在 form 外也常用，记住显式写 `type="button"` 以免意外提交。\n\n**`<progress value="70" max="100">`**：进度条（任务完成度）。\n\n**`<meter min="0" max="100" value="60">`**：度量仪（磁盘占用、评分这类「已知范围内的值」），和 progress 语义不同。\n\n**`<abbr title="全称">缩写</abbr>`**：缩写，悬停看全称。\n\n**`<time datetime="2026-09-04">`**：机器可读时间，利于 SEO 与辅助技术。\n\n**`<ul>` 里的导航、`<script>`、`<link>`、`<style>`**：脚本与样式引入属于进阶工程化，学 React 脚手架后会天天见到，此处先混个眼熟即可。',
          },
          {
            type: 'code',
            title: 'progress / meter / abbr / time',
            language: 'html',
            live: true,
            body: `<p>
  课程进度：
  <progress value="70" max="100">70%</progress>
</p>

<p>
  满意度：
  <meter min="0" max="5" value="4.2">4.2 / 5</meter>
</p>

<p>
  我们在学
  <abbr title="HyperText Markup Language">HTML</abbr>
  与
  <abbr title="Cascading Style Sheets">CSS</abbr>。
</p>

<p>
  发布于
  <time datetime="2026-09-04">2026 年 9 月 4 日</time>
</p>`,
          },
        ],
      },
    },
    {
      id: 'more-common-tags',
      title: '补全：表单分组、文本语义、图片与弹层',
      summary:
        'fieldset/legend、kbd/del/ins、picture、dialog、address/cite、colgroup——常用但容易漏的一批',
      content: {
        sections: [
          {
            type: 'tip',
            title: '为什么还要再开一节？',
            body: '前面已经覆盖日常 80% 的标签。下面这批「不算冷门、项目里经常撞见」：表单分组、键盘按键语义、修订标记、响应式图片、原生弹窗、联系地址、表格列组。学完这一节，常用 HTML 标签基本就齐了。',
          },
          {
            type: 'text',
            title: '1. fieldset / legend：给表单分组',
            body: '**`<fieldset>`**：把相关控件圈成一组（比如「收货地址」「登录信息」）。\n\n**`<legend>`**：写在 fieldset 里的第一项，是这一组的标题。浏览器会画一圈边框，legend 骑在边框上。\n\n对读屏软件很友好：用户能听到「现在进入某某分组」。复杂表单强烈建议用。',
          },
          {
            type: 'code',
            title: 'fieldset + legend',
            language: 'html',
            live: true,
            body: `<form>
  <fieldset>
    <legend>账号信息</legend>
    <p>
      <label>用户名
        <input name="user" type="text" />
      </label>
    </p>
    <p>
      <label>密码
        <input name="pwd" type="password" />
      </label>
    </p>
  </fieldset>

  <fieldset>
    <legend>偏好</legend>
    <label><input type="checkbox" name="news" /> 接收邮件通知</label>
  </fieldset>
</form>`,
          },
          {
            type: 'text',
            title: '2. kbd / samp / var / del / ins / cite',
            body: '**`<kbd>`**：表示用户键盘输入，如「按 `Ctrl` + `S`」。\n\n**`<samp>`**：表示程序输出样例（sample output）。\n\n**`<var>`**：表示变量名（数学或程序语境）。\n\n**`<del>`**：删除的内容（修订/对比时用），常带删除线。比单纯装饰性的 `s` 更强调「被删掉的变更」。\n\n**`<ins>`**：新插入的内容，常带下划线。\n\n**`<cite>`**：作品标题引用（书名、文章名、电影名），不是普通引号。\n\n**`<address>`**：联系方式块（作者/组织的联系信息），默认斜体。别把普通邮寄地址段落滥用成整站 footer 装饰。',
          },
          {
            type: 'code',
            title: '文本语义标签',
            language: 'html',
            live: true,
            body: `<p>保存文件请按 <kbd>Ctrl</kbd> + <kbd>S</kbd>。</p>
<p>终端输出：<samp>Build succeeded.</samp></p>
<p>公式里变量 <var>x</var> 表示宽度。</p>
<p>
  原价 <del>99</del>
  现价 <ins>79</ins> 元。
</p>
<p>推荐阅读：<cite>《MDN HTML 指南》</cite></p>
<address>
  作者：小明<br />
  邮箱：demo@example.com
</address>`,
          },
          {
            type: 'text',
            title: '3. picture / source：响应式图片',
            body: '**`<picture>`** 里放多个 **`<source>`** + 一个兜底 **`<img>`**。\n\n浏览器按 `media`（屏幕条件）或 `type`（图片格式）选最合适的源；都不匹配就用最后的 img。\n\n常用：大屏用宽图、小屏用竖图；或优先 WebP、不支持再回退 JPG。\n\n注意：`source` 在 picture 里用 `srcset`，不是 video 里那种 `src` 写法。',
          },
          {
            type: 'code',
            title: 'picture 结构（示意）',
            language: 'html',
            live: true,
            body: `<picture>
  <!-- 宽屏用这张 -->
  <source
    media="(min-width: 700px)"
    srcset="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='100'%3E%3Crect fill='%232f6b4f' width='100%25' height='100%25'/%3E%3Ctext fill='white' x='50%25' y='50%25' text-anchor='middle' dy='.35em' font-size='16'%3EWide%3C/text%3E%3C/svg%3E"
  />
  <!-- 默认 / 窄屏 -->
  <img
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3Crect fill='%23c47d3a' width='100%25' height='100%25'/%3E%3Ctext fill='white' x='50%25' y='50%25' text-anchor='middle' dy='.35em' font-size='16'%3ENarrow%3C/text%3E%3C/svg%3E"
    alt="根据屏幕宽度切换的示意图片"
    width="200"
    height="100"
  />
</picture>
<p style="font-size:12px;color:#5c6b62;">拉窄/拉宽预览区宽度，可能看到不同图（取决于视口）。</p>`,
          },
          {
            type: 'text',
            title: '4. dialog：原生弹窗',
            body: '**`<dialog>`**：浏览器原生对话框。\n\n- 默认隐藏；用 JS 的 `showModal()` 打开模态框，`close()` 关闭\n- 标签上写 **`open`** 属性可默认显示（非模态）\n- 里面通常放标题、内容和关闭按钮\n\n现代浏览器支持已经很好；老项目可能仍用 div 模拟。下面示例用 `open` 直接展示样子（本预览区未开放脚本，所以用 open 演示外观）。',
          },
          {
            type: 'code',
            title: 'dialog 外观（open 演示）',
            language: 'html',
            live: true,
            body: `<dialog open>
  <strong>提示</strong>
  <p>这是原生 dialog。真实项目里常用 JS：dialog.showModal()</p>
  <form method="dialog">
    <button>关闭</button>
  </form>
</dialog>
<p style="margin-top:12px;color:#5c6b62;">上面的「关闭」在支持 method="dialog" 的浏览器里会关掉对话框。</p>`,
          },
          {
            type: 'text',
            title: '5. colgroup / col、datalist、optgroup',
            body: '**`<colgroup>` + `<col>`**：给整列统一设样式或跨列（如某一列加宽）。写在 thead 之前。\n\n**`<datalist>`**：给 `input` 提供建议列表（可输入也可点选）。input 的 **`list`** 属性指向 datalist 的 **`id`**。\n\n**`<optgroup label="分组名">`**：给 select 里的 option 分组（表单章提过，这里给可运行例子）。',
          },
          {
            type: 'code',
            title: 'datalist + optgroup + colgroup',
            language: 'html',
            live: true,
            body: `<label>
  浏览器：
  <input list="browsers" name="browser" placeholder="可输入或点选" />
</label>
<datalist id="browsers">
  <option value="Chrome"></option>
  <option value="Firefox"></option>
  <option value="Safari"></option>
  <option value="Edge"></option>
</datalist>

<p style="margin-top:14px;">
  <label>
    课程：
    <select>
      <optgroup label="基础">
        <option>HTML</option>
        <option>CSS</option>
      </optgroup>
      <optgroup label="进阶">
        <option>React</option>
        <option>TypeScript</option>
      </optgroup>
    </select>
  </label>
</p>

<style>
  table { border-collapse: collapse; width: 100%; margin-top: 14px; }
  th, td { border: 1px solid #9bb5a6; padding: 6px 8px; }
</style>
<table>
  <colgroup>
    <col style="width: 30%; background: #eef6f1;" />
    <col style="width: 70%;" />
  </colgroup>
  <tr><th>姓名</th><th>备注</th></tr>
  <tr><td>小明</td><td>第一列被 col 设了浅绿底</td></tr>
</table>`,
          },
          {
            type: 'table',
            title: '本章 + 前面：常用标签总清单（对照自检）',
            headers: ['分类', '标签', '是否已讲'],
            rows: [
              ['文档骨架', 'DOCTYPE、html、head、body、meta、title', '是'],
              ['标题段落', 'h1~h6、p、br、hr', '是'],
              ['文本语义', 'strong、em、b、i、u、s、mark、small、sub、sup、code、pre、span、kbd、samp、var、del、ins、cite、abbr、time', '是'],
              ['链接媒体', 'a、img、picture、source、video、audio、iframe', '是'],
              ['列表', 'ul、ol、li、dl、dt、dd', '是'],
              ['表格', 'table、caption、thead、tbody、tfoot、tr、th、td、colgroup、col', '是'],
              ['表单', 'form、label、input、textarea、select、option、optgroup、datalist、button、fieldset、legend', '是'],
              ['结构语义', 'div、header、nav、main、section、article、aside、footer、figure、figcaption、address、blockquote', '是'],
              ['交互其它', 'details、summary、dialog、progress、meter', '是'],
              ['工程引入', 'link、script、style、noscript、base', '点到即可：脚手架里天天见，写法随构建工具'],
              ['较少入门用', 'canvas、svg、map/area、object/embed、template、slot、ruby', '进阶再学（画布/矢量/热区/Web Component）'],
            ],
            note: '入门阶段把「是」那几行写熟就够做绝大多数页面；canvas/svg 等放到做图表、图标系统时再专攻。',
          },
        ],
      },
    },
    {
      id: 'global-attrs-cheatsheet',
      title: '全局属性与学习路线清单',
      summary:
        'id/class/style/title/hidden/data-*；块级与行内直觉；接下来去学 HTML 布局章',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '几乎所有标签都能写 id、class、style、title、hidden、data-*。布局与美化主要靠 class + CSS；id 适合页内锚点和唯一钩子。',
          },
          {
            type: 'table',
            title: '全局属性（请当真记）',
            headers: ['属性', '作用', '小白建议'],
            rows: [
              ['id', '页内唯一标识', '锚点、label 的 for、JS 取值；不要重复'],
              ['class', '样式/脚本分类名', '可多个，空格分隔：class="btn primary"'],
              ['style', '行内 CSS', '练手可以，正式项目优先写到 CSS 文件'],
              ['title', '悬停提示', '补充信息，别当唯一说明'],
              ['hidden', '隐藏元素', '存在于 HTML 中但不显示'],
              ['data-*', '自定义数据', '如 data-id="7"，给 JS 读'],
              ['tabindex', '键盘焦点顺序', '谨慎使用，乱写会搞乱无障碍'],
              ['contenteditable', '可编辑内容', '做富文本才用，注意安全'],
            ],
          },
          {
            type: 'text',
            title: '块级 vs 行内（先建立直觉）',
            body: '默认情况下：\n\n- **块级**（div、p、h1、ul、section…）：独占一行，可设宽高\n- **行内**（span、a、strong、em…）：待在文字流里，并排显示，设宽高常常无效\n\n下一章「HTML 布局」会系统讲 display、flex、盒子模型。你现在只要知道：想并排两个大块，通常不是靠 span，而是块级容器 + CSS。',
          },
          {
            type: 'code',
            title: '综合小练习：拼一个名片（自由改）',
            language: 'html',
            live: true,
            body: `<style>
  .card {
    max-width: 360px;
    border: 1px solid #9bb5a6;
    border-radius: 12px;
    padding: 16px;
    font-family: system-ui, sans-serif;
  }
  .card h1 { margin: 0 0 8px; font-size: 20px; }
  .tag {
    display: inline-block;
    padding: 2px 8px;
    margin-right: 6px;
    border-radius: 999px;
    background: #eef6f1;
    font-size: 12px;
  }
  dl { margin: 12px 0; }
  dt { font-weight: 700; }
  dd { margin: 0 0 8px; color: #33443b; }
</style>

<article class="card">
  <header>
    <h1>张三</h1>
    <p>
      <span class="tag">前端学员</span>
      <span class="tag">HTML</span>
    </p>
  </header>

  <p>正在学习 <strong>HTML 常用标签</strong>，下一站是 CSS 布局。</p>

  <dl>
    <dt>邮箱</dt>
    <dd><a href="mailto:demo@example.com">demo@example.com</a></dd>
    <dt>城市</dt>
    <dd>上海</dd>
  </dl>

  <footer>
    <small>更新于 <time datetime="2026-09-04">2026-09-04</time></small>
  </footer>
</article>`,
          },
          {
            type: 'list',
            title: '学完本章你可以自检',
            ordered: true,
            items: [
              '能手写一个含 DOCTYPE/html/head/body/meta/title 的最小页面',
              '分得清 h1~h6、p、br、hr 的使用场景',
              '会写 a（含 target/rel）和 img（含 alt），知道 picture 干嘛',
              '会写 ul/ol/li、dl 与基础 table（含 thead/th/td）',
              '能搭带 label 的 form，认识常见 input type，会用 fieldset/legend',
              '知道何时用 div/span，何时用 header/nav/main/footer 等语义标签',
              '见过 details、dialog、kbd、del/ins、datalist 等补全标签',
              '左侧改代码（有高亮）、右侧看效果，已经形成习惯',
            ],
          },
          {
            type: 'tip',
            title: '下一步',
            body: '标签是「砖块」，下一章「HTML 布局（对照 Flutter）」教你用 display / flex / 盒子模型把砖块排成真正的页面。两章一起学，再进 React/JSX 会顺很多。',
          },
        ],
      },
    },
  ],
}

export default htmlTags
