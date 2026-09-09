/**
 * Ant Design 组件库实战章节
 * 面向「会写 React 组件、但没用过 UI 组件库」的前端小白
 * 环境：antd 6.6.3 + @ant-design/icons 6 + dayjs 1.11
 */
const antdGuide = {
  id: 'antd',
  title: 'Ant Design 组件库实战',
  summary:
    'antd 是国内后台管理系统用得最多的 React 组件库：按钮、表格、表单、弹窗全都现成的。这一章从「为什么不自己手写」讲起，逐个拆 Button、栅格、Card、Form、Table、message、Menu 的属性，中间穿插 20 多个可以直接改代码看效果的实时 Demo，最后用一个完整的「用户管理 CRUD 页面」把所有组件串起来，再补上主题定制和新手踩坑清单。',
  order: 18,
  items: [
    {
      id: 'antd-intro',
      title: '为什么用组件库：手写 vs antd、安装与全局配置',
      summary: '一个「像样的按钮」手写要 30 行 CSS，antd 一行搞定；v5/v6 起样式自动注入，不用再 import css',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '组件库解决的不是「不会写」，而是「写不完」：一个按钮要考虑 hover、点击、禁用、加载、聚焦轮廓、深浅色、无障碍……**antd 把这些都做好了，你只负责传属性**。装完直接 `import { Button } from \'antd\'` 就能用，**antd 5/6 不需要手动引入任何 css 文件**。',
          },
          {
            type: 'text',
            title: '1.1 是什么：Ant Design 到底是什么东西',
            body: 'Ant Design（简称 antd）是蚂蚁集团开源的一套**企业级 UI 设计语言 + React 组件库**。\n\n把它拆成两半理解：\n\n- **设计语言**：一套规定「主色用什么蓝、圆角多大、间距用 8 的倍数、错误提示放哪里」的规范。你不需要懂，用了组件自然就符合规范。\n- **React 组件库**：把上面这套规范做成了 70 多个能直接 `import` 的 React 组件，比如 `Button`、`Table`、`Form`、`Modal`。\n\n你在网上看到的绝大多数「中后台管理系统」「运营平台」「数据看板」，界面风格都出自 antd。所以学会它，几乎等于拿到了国内前端外包和后台项目的通行证。\n\n注意区分几个容易混的名字：\n\n- `antd`：本章讲的 React 组件库（npm 包名就叫 `antd`）\n- `ant-design-vue` / `ant-design-pro`：分别是 Vue 版本、和基于 antd 的完整后台脚手架，不是本章内容\n- `@ant-design/icons`：官方图标库，是**单独的一个包**，要单独装',
          },
          {
            type: 'text',
            title: '1.2 为什么：手写一个「像样的按钮」有多累',
            body: '新手常有的想法是「一个按钮而已，我自己写不就完了」。我们算一下自己写要处理多少件事：\n\n**① 基础样式**：背景色、文字色、内边距、圆角、字号、行高、边框。\n\n**② 五种状态**：默认、鼠标悬停（hover）、按下（active）、键盘聚焦（focus，要有可见轮廓否则不符合无障碍）、禁用（disabled，要变灰且不能点）。\n\n**③ 加载中**：要显示一个旋转的小圈，还要在加载期间禁止重复点击——这个「防重复提交」是真实业务里最常见的 bug 来源。\n\n**④ 尺寸与变体**：大中小三种尺寸、主按钮/次按钮/虚线按钮/文字按钮/危险按钮，组合起来十几种样式。\n\n**⑤ 细节**：图标和文字之间的间距、两个中文字之间要不要加空格、按钮撑满一行的写法。\n\n这些加起来轻松 100 行 CSS，而且每个项目都要重写一遍、每个人写得都不一样。用 antd 的话，上面全部内容是 `<Button type="primary" size="large" loading danger>` 这几个属性。\n\n**更关键的收益是「一致性」**：三个人写的表单，用 antd 出来长得一模一样；手写的话，间距、字号、圆角必然对不齐。',
          },
          {
            type: 'table',
            title: '1.3 手写 vs 用组件库：逐项对比',
            intro: '不是说手写不好，而是要知道自己在省什么、放弃什么。',
            headers: ['对比项', '自己手写', '用 antd'],
            rows: [
              ['开发速度', '一个表单页要一两天', '一个表单页两三小时'],
              ['交互状态', 'hover / 禁用 / 加载都要自己补', '组件自带，传属性即可'],
              ['视觉一致性', '靠人和人约定，很难统一', '天然统一，因为源头是同一套 token'],
              ['无障碍与键盘操作', '基本没人做', '组件内置 `aria-*` 和键盘支持'],
              ['打包体积', '小，只有你写的那点代码', '大一些（按需引入后可接受）'],
              ['样式自由度', '想怎么改怎么改', '受组件结构约束，深度定制要花功夫'],
              ['适合场景', '官网、活动页、强设计感的 C 端页面', '后台管理、内部系统、表单和表格多的业务'],
            ],
            note: '经验法则：**页面里表单和表格多 → 上 antd；页面里动画和插画多 → 手写**。',
          },
          {
            type: 'code',
            title: '1.4 怎么用：安装（两个包一起装）',
            language: 'bash',
            body: `# ① 装组件库本体：所有组件（Button / Table / Form ...）都在这个包里
npm install antd

# ② 装官方图标库：图标是单独的包，不装的话 import 图标会报「找不到模块」
npm install @ant-design/icons

# ③ DatePicker / TimePicker 依赖 dayjs 处理日期，antd 会自动带上它
#    但你自己的代码里要用 dayjs() 的话，最好显式装一次
npm install dayjs

# 装完看一下版本号，本章全部按 antd 6 讲（v4 和 v6 有不少 API 改名）
npm list antd`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：同样的按钮和输入框，手写 vs antd',
            body: `import { Button, Input, Card, Space } from 'antd' // 从 antd 里按需取出要用的组件

export default function Demo() { // 实时 Demo 必须默认导出一个函数组件
  return (
    <Space vertical size={16} style={{ width: '100%' }}> {/* Space 纵向排列两张卡片，间距 16px */}
      <Card title="① 纯手写：样式要自己一条条写" size="small"> {/* size="small" 让卡片紧凑一些 */}
        <button // 原生 button：默认是灰色小方块，必须靠 style 补全部样式
          style={{
            background: '#1677ff', // 手动指定主色（还得记住色号）
            color: '#fff', // 文字白色
            border: 'none', // 去掉原生边框
            borderRadius: 6, // 圆角
            padding: '5px 16px', // 内边距，决定按钮多高多宽
            cursor: 'pointer', // 鼠标移上去变小手
            marginRight: 8, // 和右边输入框拉开距离
          }}
        >
          提交
        </button>
        <input // 原生 input：默认边框很丑，聚焦时也没有高亮效果
          placeholder="请输入姓名"
          style={{ padding: '4px 11px', border: '1px solid #d9d9d9', borderRadius: 6 }}
        />
        <p style={{ margin: '8px 0 0', color: '#999', fontSize: 12 }}>
          注意：上面这两个控件没有 hover、聚焦高亮、禁用、加载态，全都要自己再补
        </p>
      </Card>

      <Card title="② 用 antd：传属性就够了" size="small">
        <Space> {/* Space 横向排列，自动在子元素之间加 8px 间距 */}
          <Button type="primary">提交</Button> {/* type="primary" 就是蓝色主按钮，状态全都内置 */}
          <Input placeholder="请输入姓名" style={{ width: 160 }} /> {/* 输入框，宽度自己给 */}
        </Space>
        <p style={{ margin: '8px 0 0', color: '#999', fontSize: 12 }}>
          鼠标移上去 / 点一下 / 用 Tab 键聚焦，都有对应效果——这些都是组件自带的
        </p>
      </Card>
    </Space>
  )
}`,
          },
          {
            type: 'text',
            title: '1.5 重要变化：antd 5/6 不用手动引入 css 文件',
            body: '如果你搜到的教程里写着 `import \'antd/dist/antd.css\'` 或者 `import \'antd/dist/reset.css\'`，那是 **antd 4 时代的写法**。\n\n从 antd 5 开始改用了 **CSS-in-JS**（内部用 `@ant-design/cssinjs` 实现）：组件被渲染的时候，才把它需要的那段样式动态插入到页面的 `<style>` 标签里。\n\n这带来三个直接的好处：\n\n- **不用引样式文件**：`import { Button } from \'antd\'` 一行就完事，样式自动跟着来\n- **天然按需**：你没用到的 `Table`，它的样式一个字节都不会进页面\n- **主题能动态切换**：改一下 `ConfigProvider` 的主色，页面立刻变色，不需要重新编译\n\n只有一个小注意点：antd 只重置了自己组件内部的样式，**没有重置浏览器默认样式**（比如 `body` 的默认 margin、`h1` 的默认大小）。如果你希望页面基础标签也规整，可以额外引一次 `antd/dist/reset.css`——它现在是可选的，而不是必需的。',
          },
          {
            type: 'code',
            title: '1.6 全局配置 `ConfigProvider`：中文语言包 + 主题（写在项目最外层）',
            language: 'tsx',
            body: `// 这段代码要放在项目入口（比如 src/index.tsx 或 src/App.tsx）的最外层
import { ConfigProvider, DatePicker, Button } from 'antd'
import zhCN from 'antd/locale/zh_CN' // 中文语言包：让「Today」「OK」「暂无数据」都变中文
import dayjs from 'dayjs' // 日期库
import 'dayjs/locale/zh-cn' // dayjs 的中文包：让日历里的「周一」「一月」是中文

dayjs.locale('zh-cn') // 全局把 dayjs 切成中文（必须在渲染前执行一次）

export default function App() {
  return (
    <ConfigProvider
      locale={zhCN} // ① 语言包：所有 antd 组件的内置文案换成中文
      theme={{ token: { colorPrimary: '#1677ff', borderRadius: 6 } }} // ② 主题：主色和圆角
      componentSize="middle" // ③ 全局默认尺寸，可选 small / middle / large
    >
      {/* ConfigProvider 只是一个「配置容器」，不渲染任何多余的 DOM */}
      {/* 它包住的所有 antd 组件都会读到上面的配置 */}
      <DatePicker /> {/* 现在这个日期选择器里面是中文的「今天」「此刻」 */}
      <Button type="primary">主色按钮</Button>
    </ConfigProvider>
  )
}

// 注意：ConfigProvider 只影响它「包住」的组件。
// 所以务必包在最外层，只包一次；不要在每个页面里各包一遍。`,
          },
          {
            type: 'tip',
            title: '为什么上面这段不是实时 Demo？',
            body: '本页的实时预览环境只允许 `import` 四个模块：`react`、`antd`、`@ant-design/icons`、`dayjs`。而中文语言包的路径是 `antd/locale/zh_CN`，属于「antd 包里的子路径」，不在白名单里，所以这段只能作为静态代码展示。**下面那个只用到 `theme` 的 Demo 就可以实时跑**。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：ConfigProvider 换个主色，包住的组件全变',
            body: `import { ConfigProvider, Button, Space, Switch, Slider, Card } from 'antd'
import { useState } from 'react' // 用 state 保存当前选中的主色

const colors = ['#1677ff', '#722ed1', '#13c2c2', '#fa541c'] // 四个候选主色（蓝 / 紫 / 青 / 橙）

export default function Demo() {
  const [color, setColor] = useState<string>(colors[0]) // 当前主色，默认 antd 官方蓝

  return (
    <div>
      <Space style={{ marginBottom: 16 }}> {/* 这一排色块在 ConfigProvider 外面，不受主题影响 */}
        {colors.map((c) => ( // 遍历候选色，渲染成一个个小色块按钮
          <div
            key={c} // 列表渲染必须给稳定的 key
            onClick={() => setColor(c)} // 点击就把主色换成这个颜色
            style={{
              width: 28,
              height: 28,
              background: c, // 色块本身显示这个颜色
              borderRadius: 6,
              cursor: 'pointer',
              outline: color === c ? '2px solid #000' : 'none', // 当前选中的加个黑框
            }}
          />
        ))}
      </Space>

      {/* 关键：ConfigProvider 包住的所有 antd 组件，主色和圆角都跟着 token 变 */}
      <ConfigProvider theme={{ token: { colorPrimary: color, borderRadius: 8 } }}>
        <Card title="下面这些组件都在 ConfigProvider 里面" size="small">
          <Space vertical size={12} style={{ width: '100%' }}>
            <Space>
              <Button type="primary">主按钮</Button> {/* 背景色 = colorPrimary */}
              <Button>次按钮</Button> {/* 边框在 hover 时也会变成主色 */}
              <Switch defaultChecked /> {/* 开关打开时的底色 = colorPrimary */}
            </Space>
            <Slider defaultValue={40} /> {/* 滑块的轨道和圆点也是主色 */}
          </Space>
        </Card>
      </ConfigProvider>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '1.7 `ConfigProvider` 常用配置速查',
            intro: '这几个是真实项目里 99% 会用到的，其余的等有需要再查文档。',
            headers: ['属性', '类型或取值', '作用', '常用值'],
            rows: [
              ['`locale`', '语言包对象', '组件内置文案的语言（分页的「条/页」、表格的「暂无数据」等）', '`zhCN`（从 `antd/locale/zh_CN` 引入）'],
              ['`theme.token`', '对象', '全局设计变量：主色、圆角、字号、间距', '`{ colorPrimary, borderRadius, fontSize }`'],
              ['`theme.components`', '对象', '只改某个组件的变量，不影响其它组件', '`{ Button: { controlHeight: 40 } }`'],
              ['`theme.algorithm`', '函数或函数数组', '换整套配色算法，暗黑模式就靠它', '`theme.darkAlgorithm`'],
              ['`componentSize`', '`small` / `middle` / `large`', '所有组件的默认尺寸', '`middle`（默认值）'],
              ['`form`', '对象', '表单的全局默认行为，比如统一的校验文案', '`{ validateMessages }`'],
              ['`getPopupContainer`', '函数', '弹层挂到哪个 DOM 下（解决弹层被裁切）', '`(node) => node.parentElement`'],
            ],
            note: '`ConfigProvider` 是**包住**才生效的，所以永远放在应用最外层；它可以嵌套，内层会覆盖外层。',
          },
          {
            type: 'list',
            title: '1.8 这一节的易错点',
            intro: '新手第一天用 antd，一般会踩到下面这几个：',
            ordered: true,
            items: [
              '**照搬 v4 教程去 `import \'antd/dist/antd.css\'`**：antd 5/6 里根本没有这个文件，会直接报「Module not found」。v5/v6 不用引样式。',
              '**忘装 `@ant-design/icons`**：图标是独立的包，只装 `antd` 的话 `import { SearchOutlined } from \'@ant-design/icons\'` 会报找不到模块。',
              '**`ConfigProvider` 放错位置**：包在某个子组件里，结果别的页面语言还是英文。它必须在最外层，且只包一次。',
              '**中文语言包路径写错**：正确是 `antd/locale/zh_CN`（下划线），不是 `zh-CN`；v4 时代的路径 `antd/es/locale/zh_CN` 也不要用了。',
              '**以为组件库很大就不敢用**：antd 5/6 的 CSS-in-JS 天然按需，配合现代打包工具，实际进包的只有你用到的组件。',
              '**日历显示英文月份**：那是 `dayjs` 的语言没切，要额外 `import \'dayjs/locale/zh-cn\'` 并执行 `dayjs.locale(\'zh-cn\')`。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '装两个包（`antd` + `@ant-design/icons`）→ 最外层套一个 `ConfigProvider`（配中文语言包 + 主色）→ 之后每个组件按需 `import` 直接用。**不要引 css 文件**，样式是组件自己带的。',
          },
        ],
      },
    },
    {
      id: 'antd-button-icon',
      title: 'Button 按钮与 @ant-design/icons 图标',
      summary: 'type 决定长相、size 决定大小、loading 自动防重复点击；图标就是一个个 React 组件',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'Button 最常用的四个属性：**`type` 管长相**（`primary` 蓝底 / 默认白底 / `dashed` 虚线 / `link` 像链接 / `text` 纯文字）、**`size` 管大小**、**`loading` 管加载**（自动变成不可点，天然防重复提交）、**`danger` 管危险色**（删除按钮用它）。图标用 `icon={<PlusOutlined />}` 传进去。',
          },
          {
            type: 'text',
            title: '2.1 是什么：Button 就是加强版的 `<button>`',
            body: '`Button` 渲染出来的最终还是一个 HTML `<button>` 标签，所以原生 `<button>` 的属性它基本都支持：`onClick`、`disabled`、`autoFocus`，甚至 `data-*` 都能直接传。\n\n它多出来的部分，是把「按钮在真实业务里的各种形态」都变成了属性：\n\n- 视觉层级：这个按钮是页面上最重要的操作，还是次要的？→ `type`\n- 危险程度：点了会不可恢复吗？→ `danger`\n- 忙碌状态：正在提交，别再点了 → `loading`\n- 形状：是不是一个只有图标的圆形按钮？→ `shape="circle"`\n- 布局：要不要撑满一整行（移动端常见）？→ `block`\n\n有一个必须知道的规矩：**`Button` 默认的 `htmlType` 是 `"button"`**。原生 `<button>` 在表单里默认是 `submit`（会提交并刷新页面），antd 特意改成了 `button`。所以你想让某个按钮提交表单，要显式写 `htmlType="submit"`。',
          },
          {
            type: 'table',
            title: '2.2 Button 属性逐个讲',
            intro: '下面这张表按「用到的频率」从高到低排，前六个几乎天天用。',
            headers: ['属性', '类型或取值', '作用', '常用值'],
            rows: [
              ['`type`', '`primary` / `default` / `dashed` / `link` / `text`', '按钮的视觉层级，决定有没有底色、边框', '主操作用 `primary`，其余用默认'],
              ['`onClick`', '`(e) => void`', '点击回调，和原生一样', '`() => setOpen(true)`'],
              ['`loading`', '`boolean` 或 `{ delay: number }`', '显示转圈图标，**并自动禁止点击**', '提交请求期间设为 `true`'],
              ['`disabled`', '`boolean`', '禁用：变灰、不响应点击、不能聚焦', '表单没填完时设为 `true`'],
              ['`danger`', '`boolean`', '危险色（红），配合 `type` 一起用', '删除按钮：`danger` + `type="primary"`'],
              ['`icon`', 'ReactNode', '按钮左边的图标，传一个图标组件实例', '`icon={<PlusOutlined />}`'],
              ['`size`', '`small` / `middle` / `large`', '按钮高度：24 / 32 / 40 像素', '默认 `middle`，表格操作列用 `small`'],
              ['`shape`', '`default` / `circle` / `round` / `square`', '形状；`circle` 常用于「只有图标」的按钮', '`shape="circle"`'],
              ['`block`', '`boolean`', '宽度撑满父容器，变成一整行', '登录页的「登录」按钮'],
              ['`href`', '`string`', '传了它就渲染成 `<a>` 标签而不是 `<button>`', '跳外链时用'],
              ['`htmlType`', '`button` / `submit` / `reset`', '原生 type；**antd 默认是 `button`**', '表单提交按钮要写 `submit`'],
              ['`iconPlacement`', '`start` / `end`', '图标放文字前面还是后面（v6 的新名字）', '「下一步 →」用 `end`'],
            ],
            note: 'v6 里 `iconPosition` 已改名为 `iconPlacement`；另外还多了 `color` + `variant` 两个属性可以更自由地组合颜色和样式，日常用 `type` 就够了。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：type / size / shape / danger 一次看全',
            body: `import { Button, Space, Divider } from 'antd'
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons' // 图标是独立包里的组件

export default function Demo() {
  return (
    <div>
      <Divider titlePlacement="left">type：视觉层级</Divider> {/* 带文字的分割线，v6 用 titlePlacement 指定文字位置 */}
      <Space wrap> {/* wrap 让按钮太多时自动换行，不会横向溢出 */}
        <Button type="primary">primary 主按钮</Button> {/* 蓝底白字，一个页面只该有一两个 */}
        <Button>default 默认</Button> {/* 白底 + 灰边框，最常用的次要操作 */}
        <Button type="dashed">dashed 虚线</Button> {/* 虚线边框，常用于「+ 新增一项」 */}
        <Button type="link">link 链接</Button> {/* 没有边框，看起来像超链接 */}
        <Button type="text">text 文字</Button> {/* 纯文字，只有 hover 时有浅底色 */}
      </Space>

      <Divider titlePlacement="left">size：三种高度</Divider>
      <Space wrap>
        <Button size="large" type="primary">large（40px）</Button> {/* 移动端和落地页常用 */}
        <Button size="middle" type="primary">middle（32px，默认）</Button> {/* 不写 size 就是这个 */}
        <Button size="small" type="primary">small（24px）</Button> {/* 表格操作列里放小按钮 */}
      </Space>

      <Divider titlePlacement="left">danger / disabled / shape</Divider>
      <Space wrap>
        <Button danger type="primary" icon={<DeleteOutlined />}>删除</Button> {/* danger = 红色，表示不可逆操作 */}
        <Button danger>危险次按钮</Button> {/* danger 也能配默认样式：红字红边框 */}
        <Button disabled>禁用中</Button> {/* 变灰且点不动 */}
        <Button type="primary" shape="circle" icon={<SearchOutlined />} /> {/* 圆形图标按钮：不写 children */}
        <Button type="primary" shape="round">round 胶囊形</Button> {/* 两端是半圆 */}
      </Space>

      <Divider titlePlacement="left">block：撑满一行</Divider>
      <Button type="primary" block>block 按钮（宽度 100%）</Button> {/* 登录、提交这种主操作常用 */}
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：loading 防重复提交（点一下体会一下）',
            body: `import { Button, Space, message, Typography } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import { useState } from 'react'

export default function Demo() {
  const [messageApi, contextHolder] = message.useMessage() // v6 必须用 hook 版拿 messageApi
  const [loading, setLoading] = useState<boolean>(false) // 是否正在「提交」
  const [count, setCount] = useState<number>(0) // 统计真正提交成功了几次

  function handleSubmit() { // 点击保存
    setLoading(true) // ① 立刻进入加载态：按钮变转圈，而且自动不可点
    setTimeout(() => { // ② 用定时器假装在请求接口，1 秒后返回
      setLoading(false) // ③ 请求结束，解除加载态
      setCount((c) => c + 1) // ④ 成功次数 +1（用函数式更新，避免拿到旧值）
      messageApi.success('保存成功') // ⑤ 弹一个绿色的成功提示
    }, 1000)
  }

  return (
    <div>
      {contextHolder} {/* 必须渲染这个占位节点，message 才有地方显示 */}
      <Space>
        {/* loading 为 true 时，antd 会自动加上 disabled，所以疯狂点击也只会提交一次 */}
        <Button type="primary" icon={<SaveOutlined />} loading={loading} onClick={handleSubmit}>
          {loading ? '保存中…' : '保存'} {/* 文案也跟着变，体验更好 */}
        </Button>
        {/* 对照组：没有 loading 保护，点几次就提交几次 */}
        <Button onClick={() => setCount((c) => c + 1)}>不做保护的按钮</Button>
      </Space>
      <Typography.Paragraph style={{ marginTop: 12, marginBottom: 0 }}>
        提交计数：<strong>{count}</strong> 次（试着连点左边按钮，计数只会加 1）
      </Typography.Paragraph>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '2.3 `@ant-design/icons`：图标就是普通 React 组件',
            body: '图标库的用法非常简单：**每个图标都是一个 React 组件**，导入就能当标签用。\n\n```\nimport { SearchOutlined } from \'@ant-design/icons\'\n<SearchOutlined />\n```\n\n因为它就是组件，所以可以像普通组件一样传属性：\n\n- `style={{ fontSize: 20, color: \'red\' }}`：图标本质是字体图标（SVG），用 `fontSize` 控制大小、`color` 控制颜色\n- `onClick={...}`：直接给图标绑点击事件\n- `spin`：让图标一直旋转（`<LoadingOutlined spin />`）\n- `rotate={90}`：旋转固定角度\n\n放进 `Button` 时有两种写法，效果不同：\n\n- `<Button icon={<PlusOutlined />}>新增</Button>`：**推荐**，antd 会自动处理图标和文字之间的间距\n- `<Button><PlusOutlined /> 新增</Button>`：能用，但间距要自己调，不推荐',
          },
          {
            type: 'table',
            title: '2.4 图标命名规则：记住三个后缀就能猜出名字',
            intro: '官方图标有 700 多个，但命名极有规律，不用背——猜 + 官网搜索框就够了。',
            headers: ['后缀', '含义', '例子', '什么时候用'],
            rows: [
              ['`Outlined`', '线框风格（空心）', '`SearchOutlined`、`UserOutlined`', '**90% 的场景**，最常用'],
              ['`Filled`', '实底风格（实心）', '`HeartFilled`、`StarFilled`', '表示「已选中 / 已收藏」的状态'],
              ['`TwoTone`', '双色风格', '`SmileTwoTone`', '空状态插画、需要一点色彩时'],
              ['名词部分', '英文单词的驼峰拼写', '`Plus` 加、`Delete` 删、`Edit` 改', '按语义找：搜索 `Search`、设置 `Setting`'],
              ['常见组合', '——', '`PlusOutlined`、`EditOutlined`、`DeleteOutlined`', 'CRUD 页面三件套'],
              ['加载图标', '——', '`LoadingOutlined`', '配 `spin` 或直接用 Button 的 `loading`'],
            ],
            note: '找不到名字就去官网图标页搜中文（比如搜「上传」出 `UploadOutlined`）。**注意是 `Outlined` 不是 `Outline`**，少个 d 是新手最常见的拼写错误。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：图标的三种风格、大小、颜色和旋转',
            body: `import { Space, Divider, Button, Tooltip } from 'antd'
import {
  UserOutlined, // 线框风格：用户
  HeartOutlined, // 线框风格：爱心（未收藏）
  HeartFilled, // 实底风格：爱心（已收藏）
  SmileTwoTone, // 双色风格：笑脸
  LoadingOutlined, // 加载图标
  PlusOutlined, // 加号
  EditOutlined, // 编辑
  DeleteOutlined, // 删除
} from '@ant-design/icons'
import { useState } from 'react'

export default function Demo() {
  const [liked, setLiked] = useState<boolean>(false) // 是否已收藏

  return (
    <div>
      <Divider titlePlacement="left">三种风格</Divider>
      <Space size={20} style={{ fontSize: 24 }}> {/* 父容器给 fontSize，图标会跟着变大 */}
        <UserOutlined /> {/* Outlined：空心线框 */}
        <HeartFilled style={{ color: '#ff4d4f' }} /> {/* Filled：实心，用 color 改颜色 */}
        <SmileTwoTone twoToneColor="#52c41a" /> {/* TwoTone：双色，用 twoToneColor 改主色 */}
        <LoadingOutlined spin /> {/* spin 让图标持续旋转，常用于加载中 */}
      </Space>

      <Divider titlePlacement="left">图标可以点击（本质就是组件）</Divider>
      <Space size={16} style={{ fontSize: 22 }}>
        {/* 根据 liked 切换实心/空心图标，实现「点赞」效果 */}
        {liked ? (
          <HeartFilled style={{ color: '#ff4d4f', cursor: 'pointer' }} onClick={() => setLiked(false)} />
        ) : (
          <HeartOutlined style={{ cursor: 'pointer' }} onClick={() => setLiked(true)} />
        )}
        <span style={{ fontSize: 14, color: '#666' }}>{liked ? '已收藏' : '点左边的心收藏'}</span>
      </Space>

      <Divider titlePlacement="left">CRUD 三件套：图标 + 按钮</Divider>
      <Space>
        <Button type="primary" icon={<PlusOutlined />}>新增</Button> {/* icon 属性传图标，间距自动 */}
        <Button icon={<EditOutlined />}>编辑</Button>
        <Button danger icon={<DeleteOutlined />}>删除</Button>
        {/* 只有图标没有文字时，一定配 Tooltip 说明用途，否则用户猜不到 */}
        <Tooltip title="纯图标按钮建议配 Tooltip">
          <Button shape="circle" icon={<EditOutlined />} />
        </Tooltip>
      </Space>
    </div>
  )
}`,
          },
          {
            type: 'list',
            title: '2.5 这一节的易错点',
            ordered: true,
            items: [
              '**`icon` 传成了组件本身**：要写 `icon={<PlusOutlined />}`（带尖括号，是元素），不是 `icon={PlusOutlined}`（那是类型，会报错）。',
              '**表单里点按钮没提交**：antd Button 默认 `htmlType="button"`，提交按钮必须显式写 `htmlType="submit"`。',
              '**`loading` 时还去手动 `disabled`**：不用，`loading` 已经自动禁用了，重复写只是噪音。',
              '**一个页面放五个 `type="primary"`**：主按钮表示「最推荐的那一个操作」，多了等于没有重点。一屏一两个就够。',
              '**图标名少写 d**：`SearchOutline` ❌ → `SearchOutlined` ✅。',
              '**纯图标按钮不给说明**：`<Button shape="circle" icon={...} />` 一定要外面套 `Tooltip`，否则用户和读屏软件都不知道它干什么。',
              '**用 `iconPosition`**：v6 已改名 `iconPlacement`，老名字会有废弃警告。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '`type` 定层级、`size` 定大小、`loading` 防重复、`danger` 标危险、`icon={<XxxOutlined />}` 加图标。图标包记住后缀 `Outlined`（线框，最常用）、`Filled`（实心，表已选）。表单提交按钮别忘 `htmlType="submit"`。',
          },
        ],
      },
    },
    {
      id: 'antd-layout-space',
      title: '布局四件套：Flex、Space、Row/Col 栅格、Layout',
      summary: 'Space 管小间距、Flex 管灵活对齐、Row/Col 管 24 格分栏、Layout 管整个后台框架',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '按「作用范围从小到大」选：**几个按钮之间加空隙用 `Space`** → **一行里要对齐、要占比用 `Flex`** → **整页分成左右几栏、还要响应式用 `Row`/`Col`** → **搭后台的头部+侧边栏+内容区用 `Layout`**。',
          },
          {
            type: 'text',
            title: '3.1 是什么：四个组件各管一件事',
            body: '很多新手一上来就用 `div` + 手写 `display: flex`，结果满屏都是 `style={{ display: \'flex\', gap: 8 }}`。antd 把这些常见需求封装成了四个组件：\n\n**`Space`（间距）**：唯一职责是「在一堆子元素之间插入相等的空隙」。它会自动跳过 `null` 和 `false`（条件渲染时不会留下空洞），这是它比手写 `gap` 强的地方。\n\n**`Flex`（弹性布局）**：就是对 CSS flexbox 的一层薄封装，把 `justify-content`、`align-items`、`gap`、`flex-wrap` 变成了属性。适合「一行两端对齐」「垂直居中」这类需求。\n\n**`Row` / `Col`（24 栅格）**：把一行的宽度切成 24 等份，`Col` 用 `span` 声明自己占几份。它的杀手级特性是**响应式**：可以规定「手机上占满一行，电脑上占三分之一」。\n\n**`Layout`（页面框架）**：提供 `Layout.Header`、`Layout.Sider`、`Layout.Content`、`Layout.Footer` 四块，专门用来搭后台管理系统的整体骨架。\n\n什么时候用哪个，看下面这张对照表就够了。',
          },
          {
            type: 'table',
            title: '3.2 四个布局组件怎么选',
            intro: '选错了也能做出来，但代码会啰嗦很多。',
            headers: ['需求场景', '该用哪个', '关键属性', '为什么'],
            rows: [
              ['两个按钮之间留 8px', '`Space`', '`size`', '最省事，且自动跳过条件渲染的空节点'],
              ['一行里左边标题、右边按钮', '`Flex`', '`justify="space-between"`', '两端对齐是 flex 的本职'],
              ['标签和内容垂直居中对齐', '`Flex`', '`align="center"`', '同上'],
              ['一行放 3 张等宽卡片', '`Row` + `Col`', '`gutter` + `span={8}`', '24 ÷ 3 = 8，天然等分'],
              ['手机一栏、电脑三栏', '`Row` + `Col`', '`xs={24} md={8}`', '只有栅格有响应式断点'],
              ['内容之间加一条横线', '`Divider`', '`titlePlacement`', '还能在线上放文字'],
              ['整个后台的头部+侧边栏', '`Layout`', '`Header` / `Sider` / `Content`', '自带贴边、可折叠等后台专属能力'],
            ],
            note: '一条经验：**`Space` 和 `Flex` 优先，栅格只在真的要「按比例分栏」时才用**。滥用栅格会让 DOM 层级变深、也更容易溢出。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：Space 和 Flex 的分工',
            body: `import { Space, Flex, Button, Divider, Tag, Card } from 'antd'

export default function Demo() {
  return (
    <div>
      <Divider titlePlacement="left">Space：只管「插空隙」</Divider>
      <Space size="middle" wrap> {/* size 可写 small(8) / middle(16) / large(24) 或数字 */}
        <Button>按钮一</Button>
        <Button>按钮二</Button>
        <Tag color="blue">标签也能放</Tag> {/* Space 不挑子元素类型 */}
        {false && <Button>我不会渲染</Button>} {/* 条件为假时 Space 不会留下多余空隙 */}
      </Space>

      <Divider titlePlacement="left">Space 加 vertical：纵向排列</Divider>
      <Space vertical size={8} style={{ width: '100%' }}> {/* vertical 竖着排；宽度要自己给 100% */}
        <Card size="small">第一行卡片</Card>
        <Card size="small">第二行卡片（两张卡片之间有 8px 空隙）</Card>
      </Space>

      <Divider titlePlacement="left">Flex：管「对齐和占比」</Divider>
      {/* justify="space-between" = 两端对齐，中间空隙自动均分：后台页头最常见的布局 */}
      <Flex justify="space-between" align="center" style={{ background: '#f5f5f5', padding: 12, borderRadius: 8 }}>
        <strong>用户列表</strong> {/* 靠左：标题 */}
        <Space>
          <Button size="small">导出</Button> {/* 靠右：一组操作按钮 */}
          <Button size="small" type="primary">新增</Button>
        </Space>
      </Flex>

      <Divider titlePlacement="left">Flex 加 flex 属性：按比例分配剩余空间</Divider>
      <Flex gap={8}> {/* gap 是子元素之间的间距 */}
        <div style={{ flex: 1, background: '#e6f4ff', padding: 12, borderRadius: 6 }}>flex: 1（占 1 份）</div>
        <div style={{ flex: 2, background: '#bae0ff', padding: 12, borderRadius: 6 }}>flex: 2（占 2 份，是左边的两倍宽）</div>
      </Flex>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '3.3 24 栅格是什么：把一行切成 24 份',
            body: '栅格系统的规则只有三句话：\n\n**① 一行总宽度记作 24 份。** 由 `Row` 代表这一行。\n\n**② 每个 `Col` 用 `span` 声明自己占几份。** `span={12}` 就是占一半，`span={8}` 占三分之一，`span={6}` 占四分之一。\n\n**③ 同一行里所有 `Col` 的 `span` 加起来超过 24，就会换行。**\n\n为什么选 24 而不是 12 或 100？因为 24 能被 2、3、4、6、8、12 整除，做二等分、三等分、四等分、六等分都不会出现小数，非常好用。\n\n除了 `span`，还有两个常用的：\n\n- **`offset`**：向右空出几份。`<Col span={8} offset={8}>` 表示「空 8 份，再占 8 份」，效果就是水平居中。\n- **`gutter`**：写在 `Row` 上，表示列与列之间的间距（单位 px）。它的实现方式是「给 `Col` 加左右 padding，同时给 `Row` 加负 margin」，所以**不要在 `Row` 外面再套一个 `overflow: hidden` 的容器**，否则可能被裁掉。',
          },
          {
            type: 'table',
            title: '3.4 `Row` / `Col` 属性速查',
            intro: '响应式那五个断点是栅格最有价值的部分，务必看懂。',
            headers: ['属性', '写在哪', '作用', '常用值'],
            rows: [
              ['`gutter`', '`Row`', '列之间的水平间距（px）', '`16`；`[16, 16]` 表示水平和垂直都 16'],
              ['`justify`', '`Row`', '水平排列方式', '`start` / `center` / `space-between`'],
              ['`align`', '`Row`', '垂直对齐方式', '`top` / `middle` / `bottom`'],
              ['`wrap`', '`Row`', '超出 24 份是否换行（默认换）', '`false` 表示强制不换行'],
              ['`span`', '`Col`', '占几份（总共 24 份）', '`24` 整行 / `12` 一半 / `8` 三分之一'],
              ['`offset`', '`Col`', '向右偏移几份', '`offset={8}` 配 `span={8}` 实现居中'],
              ['`order`', '`Col`', '显示顺序，可以和 DOM 顺序不一致', '`order={1}`'],
              ['`xs`', '`Col`', '屏幕宽 < 576px（手机竖屏）时占几份', '`xs={24}`（手机上占满一行）'],
              ['`sm`', '`Col`', '≥ 576px（手机横屏）', '`sm={12}`'],
              ['`md`', '`Col`', '≥ 768px（平板）', '`md={8}`'],
              ['`lg`', '`Col`', '≥ 992px（笔记本）', '`lg={6}`'],
              ['`xl` / `xxl`', '`Col`', '≥ 1200px / ≥ 1600px（大屏）', '`xl={4}`'],
            ],
            note: '响应式断点是「**从小到大生效**」的：写了 `xs={24} md={8}`，意思是「768px 以下都占满一行，768px 以上占三分之一」。所以移动端优先的写法是先写 `xs`。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：栅格等分、偏移、响应式（拖动浏览器宽度看变化）',
            body: `import { Row, Col, Divider, Card } from 'antd'

// 一个统一的色块样式，避免每个 Col 里重复写 style
const box: React.CSSProperties = {
  background: '#e6f4ff', // 浅蓝背景，方便看清边界
  border: '1px solid #91caff',
  borderRadius: 6,
  padding: '8px 4px',
  textAlign: 'center',
  fontSize: 12,
}

export default function Demo() {
  return (
    <div>
      <Divider titlePlacement="left">等分：24 ÷ n</Divider>
      <Row gutter={8} style={{ marginBottom: 8 }}> {/* gutter=8：列之间留 8px */}
        <Col span={12}><div style={box}>span 12（一半）</div></Col>
        <Col span={12}><div style={box}>span 12（一半）</div></Col>
      </Row>
      <Row gutter={8} style={{ marginBottom: 8 }}>
        <Col span={8}><div style={box}>span 8</div></Col> {/* 8+8+8 = 24，正好三等分 */}
        <Col span={8}><div style={box}>span 8</div></Col>
        <Col span={8}><div style={box}>span 8</div></Col>
      </Row>

      <Divider titlePlacement="left">offset：向右偏移，实现居中</Divider>
      <Row>
        {/* 左边空 8 份 + 自己占 8 份 + 右边天然剩 8 份 = 水平居中 */}
        <Col span={8} offset={8}><div style={box}>span 8 + offset 8（居中）</div></Col>
      </Row>

      <Divider titlePlacement="left">响应式：把预览窗口拉宽拉窄试试</Divider>
      <Row gutter={[8, 8]}> {/* 数组写法：[水平间距, 垂直间距]，换行时也有空隙 */}
        {[1, 2, 3, 4].map((n) => ( // 用 map 渲染四张卡片，少写重复代码
          <Col key={n} xs={24} sm={12} lg={6}> {/* 手机占满 / 平板两列 / 大屏四列 */}
            <Card size="small" title={'卡片 ' + n}> {/* 字符串拼接给标题 */}
              <span style={{ fontSize: 12, color: '#666' }}>xs=24 sm=12 lg=6</span>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '3.5 `Layout`：后台管理系统的骨架',
            body: '`Layout` 是专门为「中后台系统」准备的，它把一个后台页面拆成四块：\n\n- **`Layout.Header`**：顶部条，放 logo、系统名、右上角的用户头像\n- **`Layout.Sider`**：侧边栏，放导航菜单，支持折叠（`collapsible`）\n- **`Layout.Content`**：中间的主内容区，你的业务页面渲染在这里\n- **`Layout.Footer`**：底部，放版权信息（很多系统会省略）\n\n关键点是**嵌套方式决定了整体形态**：\n\n- 侧边栏「通天」（从顶到底）：最外层 `Layout` 横向排，里面是 `Sider` + 一个纵向 `Layout`（含 Header/Content）\n- 顶部条「通天」（横跨整个宽度）：最外层 `Layout` 里先放 `Header`，下面再放一个横向 `Layout`（含 Sider/Content）\n\n实际项目里，通常会把 `Layout` 写成一个「布局组件」，配合 react-router 的 `<Outlet />` 渲染子路由页面——这样切换页面时，头部和侧边栏不会重新渲染。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：一个能折叠侧边栏的后台框架',
            body: `import { Layout, Menu, Button, Typography } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons'
import { useState } from 'react'

const { Header, Sider, Content } = Layout // 从 Layout 上取出三个子组件，少写 Layout. 前缀

// 菜单数据：v6 里 Menu 必须用 items 数组，不能再写 <Menu.Item> 子元素
const menuItems = [
  { key: 'home', icon: <HomeOutlined />, label: '首页' },
  { key: 'user', icon: <TeamOutlined />, label: '用户管理' },
  { key: 'setting', icon: <SettingOutlined />, label: '系统设置' },
]

export default function Demo() {
  const [collapsed, setCollapsed] = useState<boolean>(false) // 侧边栏是否已折叠
  const [current, setCurrent] = useState<string>('home') // 当前选中哪个菜单

  return (
    <Layout style={{ height: 260, borderRadius: 8, overflow: 'hidden' }}> {/* 演示区高度有限，固定 260px */}
      {/* Sider：侧边栏。collapsible 让它可折叠，collapsedWidth 是折叠后的宽度 */}
      <Sider collapsible collapsed={collapsed} trigger={null} width={160} collapsedWidth={56}>
        <div style={{ height: 40, color: '#fff', textAlign: 'center', lineHeight: '40px', fontSize: 13 }}>
          {collapsed ? 'A' : 'Admin 后台'} {/* 折叠后只留一个字母，避免文字被挤变形 */}
        </div>
        <Menu
          theme="dark" // 深色菜单，和 Sider 的默认深色背景搭配
          mode="inline" // inline = 竖向菜单（侧边栏用这个）
          items={menuItems} // 菜单数据
          selectedKeys={[current]} // 受控高亮：数组里的 key 会被高亮
          onClick={(e) => setCurrent(e.key)} // 点击回调，e.key 就是被点的那一项的 key
        />
      </Sider>

      <Layout> {/* 右侧再套一层纵向 Layout，让 Header 只在内容区上方 */}
        <Header style={{ background: '#fff', padding: '0 12px', height: 48, lineHeight: '48px' }}>
          {/* 折叠按钮：图标随状态切换，点一下取反 collapsed */}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <span style={{ marginLeft: 8, fontWeight: 600 }}>点左边的按钮折叠侧边栏</span>
        </Header>

        <Content style={{ margin: 12, padding: 12, background: '#fff', borderRadius: 6 }}>
          <Typography.Text>当前页面：<strong>{current}</strong></Typography.Text>
          <Typography.Paragraph type="secondary" style={{ fontSize: 12, marginTop: 8, marginBottom: 0 }}>
            真实项目里，这块 Content 通常放 react-router 的 &lt;Outlet /&gt;，用来渲染子路由页面。
          </Typography.Paragraph>
        </Content>
      </Layout>
    </Layout>
  )
}`,
          },
          {
            type: 'list',
            title: '3.6 这一节的易错点',
            ordered: true,
            items: [
              '**`gutter` 导致横向滚动条**：`gutter` 靠负 margin 实现，如果 `Row` 的父容器写了 `overflow: hidden` 或固定宽度，会被裁切或溢出。解决：给父容器留 padding，别用 `overflow: hidden`。',
              '**`Col` 的 `span` 加起来超过 24**：会静默换行，看起来像「布局乱了」。检查每行的 `span` 之和。',
              '**只写 `span` 不写响应式，手机上挤成一条**：移动端要兼容就一定加 `xs={24}`。',
              '**用 `Space` 做整页布局**：`Space` 只适合小范围的间距，整页分栏请用栅格或 `Flex`。',
              '**`Space vertical` 不给宽度**：`Space` 是 `inline-flex`，纵向排列时子元素不会自动撑满，要加 `style={{ width: \'100%\' }}`。',
              '**v6 里给 `Space` 写 `direction="vertical"`**：已废弃，改用 `vertical` 布尔属性或 `orientation="vertical"`。',
              '**`Divider` 用 `orientation="left"` 放文字**：v6 里 `orientation` 改成了表示「横向/纵向」，文字位置要用 `titlePlacement="left"`。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '小间距 `Space`、一行对齐 `Flex`、按比例分栏 `Row`/`Col`（一行 24 份，`gutter` 加间距，`xs/md/lg` 做响应式）、后台骨架 `Layout`（Header + Sider + Content）。**能用 `Space` 和 `Flex` 解决的，就别上栅格**。',
          },
        ],
      },
    },
    {
      id: 'antd-display',
      title: '数据展示：Card、Tag、Badge、Avatar、Typography、Descriptions、Statistic、Empty、List',
      summary: '把后端返回的数据「摆好看」用的一组组件；重点是知道什么数据配什么组件',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '数据展示类组件没什么逻辑，难点在**选对组件**：一块内容套 `Card`、一个状态词用 `Tag`、右上角小红点用 `Badge`、头像用 `Avatar`、文字排版用 `Typography`、「键 - 值」详情用 `Descriptions`、大数字看板用 `Statistic`、没数据时用 `Empty`、简单列表用 `List`。',
          },
          {
            type: 'text',
            title: '4.1 是什么：九个组件分别对应什么数据形态',
            body: '把它们按「你手里的数据长什么样」来分：\n\n- **一整块内容需要边框和标题** → `Card`。后台页面几乎每个区块都是一张卡片。\n- **一个枚举值 / 状态词**（待审核、已完成、进行中） → `Tag`，靠 `color` 区分。\n- **一个数字或红点，要贴在别的东西右上角** → `Badge`（消息未读数、菜单上的小红点）。\n- **一个用户** → `Avatar`（有头像图片就传 `src`，没有就传首字母或 `icon`）。\n- **一段文字要有层级和样式** → `Typography`（标题、正文、次要文字、可复制、超长省略）。\n- **一个对象的多个字段要平铺展示** → `Descriptions`（详情页最常用，比自己写 `div` 省事得多）。\n- **一个关键指标数字** → `Statistic`（看板上的「今日订单 1,234」）。\n- **数组是空的** → `Empty`（别让页面白着，要明确告诉用户「暂无数据」）。\n- **一维数组，每项结构简单** → `List` / `Listy`。**注意：结构复杂、要排序筛选分页的，用 `Table` 而不是列表**。',
          },
          {
            type: 'table',
            title: '4.2 常用属性速查（挑最常用的）',
            intro: '这些组件属性都很多，下面只列真实项目里高频出现的。',
            headers: ['组件', '关键属性', '作用', '常用值'],
            rows: [
              ['`Card`', '`title` / `extra` / `size` / `variant` / `hoverable` / `loading`', '标题 / 右上角内容 / 尺寸 / 有无边框 / 悬浮抬起 / 骨架加载', '`variant="outlined"`（v6 里替代 `bordered`）'],
              ['`Tag`', '`color` / `closable` / `onClose` / `icon`', '颜色 / 能否关闭 / 关闭回调 / 图标', '状态色 `success` `processing` `error` `warning`'],
              ['`Badge`', '`count` / `dot` / `showZero` / `overflowCount` / `status`+`text`', '数字 / 只显示点 / 0 要不要显示 / 超过多少显示 “n+” / 状态点加文字', '`overflowCount={99}`'],
              ['`Avatar`', '`src` / `icon` / `size` / `shape`', '图片地址 / 无图时的图标 / 大小 / 圆形还是方形', '`size="large"`、`shape="square"`'],
              ['`Typography`', '`Title level` / `Text type` / `Paragraph ellipsis` / `copyable`', '标题级别 / 文字语义色 / 超长省略 / 一键复制', '`type="secondary"`、`ellipsis={{ rows: 2 }}`'],
              ['`Descriptions`', '`items` / `column` / `bordered` / `layout`', '数据数组 / 一行几列 / 带表格线 / 横排还是竖排', '`items` 里每项是 `{ key, label, children }`'],
              ['`Statistic`', '`title` / `value` / `precision` / `prefix` / `suffix`', '指标名 / 数值 / 小数位 / 前缀 / 后缀', '`precision={2}`、`suffix="%"`'],
              ['`Empty`', '`description` / `image`', '空状态文案 / 自定义插画', '`description="还没有数据"`'],
              ['`List`（老）', '`dataSource` / `renderItem` / `itemLayout` / `bordered`', '数据数组 / 每项怎么渲染 / 横排还是竖排 / 带边框', '配 `List.Item.Meta` 渲染「头像+标题+描述」'],
              ['`Listy`（新）', '`items` / `rowKey` / `itemRender` / `virtual` / `height`', 'antd 6.6 起用它替代 `List`，自带虚拟滚动', '`rowKey="id"`、短列表加 `virtual={false}`'],
            ],
            note: '`<Descriptions.Item>` 这种 `children` 写法在 v6 已废弃，**统一改用 `items` 数组**。另外 **`List` 从 antd 6.6.0 起被标记废弃**，官方的替代品是 `Listy`，详见下面的说明。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：Card + Tag + Badge + Avatar 组合出一张用户卡片',
            body: `import { Card, Tag, Badge, Avatar, Space, Typography, Button, Divider } from 'antd'
import { UserOutlined, BellOutlined } from '@ant-design/icons'

export default function Demo() {
  return (
    <div>
      {/* Card 的 title 是左上角标题，extra 是右上角的操作区 */}
      <Card
        title="用户信息"
        extra={<Button type="link" size="small">编辑</Button>}
        variant="outlined" // v6 用 variant 控制边框（老写法 bordered 已废弃）
        size="small"
      >
        <Space align="center" size={12}>
          {/* Avatar 没有图片时，可以传 icon 兜底；size 可写 large / middle / small 或数字 */}
          <Avatar size={48} icon={<UserOutlined />} style={{ background: '#1677ff' }} />
          <div>
            <Typography.Text strong>张小明</Typography.Text> {/* strong = 加粗 */}
            <div style={{ marginTop: 4 }}>
              <Tag color="success">已认证</Tag> {/* 状态色：success 绿 / processing 蓝 / error 红 / warning 橙 */}
              <Tag color="blue">管理员</Tag> {/* 也能直接写具体颜色名 */}
            </div>
          </div>
        </Space>
      </Card>

      <Divider titlePlacement="left">Badge：贴在别的元素右上角</Divider>
      <Space size={28}>
        {/* count 是数字角标，超过 overflowCount 就显示 “99+” */}
        <Badge count={5}>
          <Avatar shape="square" icon={<UserOutlined />} />
        </Badge>
        <Badge count={120} overflowCount={99}>
          <Avatar shape="square" icon={<BellOutlined />} />
        </Badge>
        {/* dot 只显示一个小红点，不显示数字：适合「有新内容」的弱提示 */}
        <Badge dot>
          <BellOutlined style={{ fontSize: 20 }} />
        </Badge>
        {/* count 为 0 时默认隐藏，加 showZero 才会显示 0 */}
        <Badge count={0} showZero>
          <Avatar shape="square" icon={<UserOutlined />} />
        </Badge>
        {/* status + text 是「状态点 + 文字」的写法，不需要包子元素 */}
        <Badge status="processing" text="同步中" />
        <Badge status="error" text="已离线" />
      </Space>
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：Typography + Descriptions + Statistic 拼一个详情页',
            body: `import { Typography, Descriptions, Statistic, Card, Row, Col, Divider } from 'antd'
import { ArrowUpOutlined, UserOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography // 取出三个子组件

// Descriptions 的数据：v6 统一用 items 数组，每项是 { key, label, children }
const infoItems = [
  { key: 'name', label: '姓名', children: '张小明' },
  { key: 'phone', label: '手机号', children: '138****8888' },
  { key: 'dept', label: '所属部门', children: '技术部' },
  { key: 'time', label: '注册时间', children: '2024-03-12 10:24' },
  { key: 'remark', label: '备注', children: '这一项用 span 占满两列', span: 2 }, // span 控制跨几列
]

export default function Demo() {
  return (
    <div>
      <Title level={4} style={{ marginTop: 0 }}>用户详情</Title> {/* level 1~5 对应 h1~h5 */}
      <Paragraph type="secondary" style={{ fontSize: 13 }}>
        type="secondary" 是次要文字（灰色）；还可以用 <Text type="success">success</Text>、
        <Text type="warning">warning</Text>、<Text type="danger">danger</Text> 表示语义色，
        或者 <Text code>code</Text>、<Text mark>mark</Text>、<Text delete>delete</Text> 做行内标记。
      </Paragraph>

      <Divider titlePlacement="left">Descriptions：对象的「键 - 值」平铺</Divider>
      {/* column={2} 表示一行放两组；bordered 加上表格线，详情页更清晰 */}
      <Descriptions items={infoItems} column={2} bordered size="small" />

      <Divider titlePlacement="left">Statistic：看板上的关键数字</Divider>
      <Row gutter={12}> {/* 用栅格让三个指标等分一行 */}
        <Col span={8}>
          <Card size="small">
            {/* prefix 放前缀图标，suffix 放单位；precision 控制小数位数 */}
            <Statistic title="今日活跃" value={1128} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            <Statistic title="增长率" value={11.28} precision={2} suffix="%" prefix={<ArrowUpOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small">
            {/* value 传字符串也行，会原样显示；数字会自动加千分位 */}
            <Statistic title="总营收" value={923456} prefix="￥" />
          </Card>
        </Col>
      </Row>
    </div>
  )
}`,
          },
          {
            type: 'tip',
            title: '注意：`List` 在 antd 6.6 起被废弃了',
            body: '如果你用的是 **antd 6.6.0 或更新的版本**，渲染 `List` 时控制台会打出一句废弃警告，让你改用 **`Listy`**。\n\n两者的定位不太一样，别以为是简单换个名字：\n\n- **`List`（老）**：属性是 `dataSource` + `renderItem`，还提供 `List.Item`、`List.Item.Meta`（头像+标题+描述的现成结构）、`header`/`footer`/`bordered`/`pagination`。**功能全、开箱好看**。\n- **`Listy`（新）**：属性是 `items` + `rowKey` + `itemRender`，**默认开启虚拟滚动**（几万条数据也不卡）。但它更「底层」——没有 `Item.Meta`，每一项的样式要你自己用 `Flex`、`Avatar` 搭出来。\n\n**实际怎么选**：\n\n- 现有项目里已经写了一堆 `List`，**不用急着改**，它还能正常工作（只是有警告）\n- 新代码、或者列表可能很长（上千条），用 `Listy`\n- 网上绝大多数教程和老代码都是 `List`，所以**两种写法你都要认得**\n\n下面先给一个能实时跑的 `Listy` 版本（不会有警告），后面再附上经典 `List` 写法作为对照。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：Listy 列表 + Empty 空状态（点「清空」看看）',
            body: `import { Listy, Avatar, Empty, Button, Card, Tag, Space, Flex, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useState } from 'react'

interface Msg { // 一条消息的数据结构
  id: number // 唯一 id，给 rowKey 用
  name: string // 发送人
  text: string // 内容摘要
  unread: boolean // 是否未读
}

const initial: Msg[] = [ // 初始数据，只放三条（预览区高度有限）
  { id: 1, name: '张小明', text: '记得下班前提交周报', unread: true },
  { id: 2, name: '李小红', text: '设计稿已经更新到最新版了', unread: false },
  { id: 3, name: '王小刚', text: '明天上午十点开评审会', unread: true },
]

export default function Demo() {
  const [list, setList] = useState<Msg[]>(initial) // 列表数据放 state，方便演示清空

  return (
    <Card
      size="small"
      title="消息列表"
      extra={
        <Space>
          {/* 清空：把数组置空，下面就会走到 Empty 分支 */}
          <Button size="small" onClick={() => setList([])}>清空</Button>
          {/* 还原：把初始数据放回去 */}
          <Button size="small" type="primary" onClick={() => setList(initial)}>还原</Button>
        </Space>
      }
    >
      {list.length === 0 ? (
        // 数组为空时渲染 Empty：明确告诉用户「不是页面坏了，是真的没数据」
        <Empty description="暂无消息" />
      ) : (
        <Listy
          items={list} // ① 数据数组（老的 List 这里叫 dataSource）
          rowKey="id" // ② 用哪个字段当 key，也可以写成函数 (item) => item.id
          virtual={false} // ③ 只有三条数据，关掉虚拟滚动更简单；长列表就删掉这行并给 height
          itemRender={(item) => ( // ④ 每一项怎么渲染，参数就是数组里的一项
            // Listy 不提供 Item.Meta，所以「头像 + 文字 + 右侧状态」要自己用 Flex 拼
            <Flex align="center" gap={12} style={{ padding: '8px 0' }}>
              <Avatar icon={<UserOutlined />} />
              <div style={{ flex: 1 }}> {/* flex:1 让中间这块吃掉剩余宽度，把标签推到最右 */}
                <Typography.Text strong>{item.name}</Typography.Text>
                <div style={{ fontSize: 12, color: '#888' }}>{item.text}</div>
              </div>
              {item.unread && <Tag color="red">未读</Tag>} {/* 只有未读才显示标签 */}
            </Flex>
          )}
        />
      )}
    </Card>
  )
}`,
          },
          {
            type: 'code',
            title: '对照：经典 `List` 写法（老项目里满地都是，要看得懂）',
            language: 'tsx',
            body: `import { List, Avatar, Tag } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const data = [
  { id: 1, name: '张小明', text: '记得下班前提交周报', unread: true },
  { id: 2, name: '李小红', text: '设计稿已经更新了', unread: false },
]

export default function OldListDemo() {
  return (
    <List
      dataSource={data} // 老 List 用 dataSource（新 Listy 叫 items）
      itemLayout="horizontal" // 每项横向排列：头像在左，文字在右
      bordered // 给整个列表加一圈边框
      header={<strong>消息列表</strong>} // 列表顶部区域
      renderItem={(item) => ( // 老 List 用 renderItem（新 Listy 叫 itemRender）
        <List.Item
          key={item.id} // 老 List 需要自己在 Item 上写 key（新 Listy 用 rowKey 声明）
          actions={[item.unread ? <Tag color="red" key="unread">未读</Tag> : null]} // 右侧状态/操作区
        >
          {/* List.Item.Meta 是老 List 才有的现成结构：头像 + 标题 + 描述 */}
          <List.Item.Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={item.name}
            description={item.text}
          />
        </List.Item>
      )}
    />
  )
}

// 这段在 antd 6.6+ 依然能跑，只是控制台会提示「List is deprecated, please use Listy」。
// 老项目不必着急重写；新代码建议直接上 Listy。`,
          },
          {
            type: 'list',
            title: '4.3 这一节的易错点',
            ordered: true,
            items: [
              '**用 `Card` 的 `bordered`**：v6 已废弃，改用 `variant="outlined"` / `variant="borderless"`，否则控制台会有废弃警告。',
              '**`Descriptions` 还在写 `<Descriptions.Item>` 子元素**：改成 `items` 数组，格式是 `{ key, label, children }`。',
              '**空数组不给空状态**：`List` 自带「暂无数据」，但 `Listy` 和自己拼的列表不会，记得显式渲染 `Empty`，别留一片空白。',
              '**在 antd 6.6+ 继续用 `List` 却看不懂那句警告**：那是提示你官方替代品是 `Listy`。老代码可以先不动，但要知道新写法。',
              '**`Badge count={0}` 不显示**：这是设计如此，想显示 0 要加 `showZero`。',
              '**结构复杂的数据硬用 `List`**：要分页、排序、筛选、多选的一律换 `Table`，用 `List` 会写出一堆自定义代码。',
              '**`Tag` 的 `color` 乱填**：`success` / `processing` / `error` / `warning` / `default` 是有语义的状态色，优先用它们；随手写十几种色号会让页面很花。',
              '**`Statistic` 的 `value` 传字符串**：传字符串就不会自动加千分位了，需要千分位就传 `number`。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '区块套 `Card`（v6 用 `variant` 不用 `bordered`）、状态词用 `Tag`、角标用 `Badge`、详情键值用 `Descriptions`（用 `items`）、关键数字用 `Statistic`、空数据给 `Empty`、简单列表用 `Listy`（老代码里是 `List`）、复杂列表一律用 `Table`。',
          },
        ],
      },
    },
    {
      id: 'antd-form',
      title: 'Form 表单：antd 里最重要也最难的组件',
      summary: 'Form 帮你托管所有输入值和校验；核心是 name 收值、rules 校验、onFinish 提交、useForm 手动操作',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '用了 `Form` 之后，**你不需要为每个输入框写 `useState` 和 `onChange`**。规则只有三条：① 每个字段包一层 `<Form.Item name="字段名">`；② 校验写在 `rules` 里；③ 提交用 `onFinish`，参数就是收集好的整个对象。想手动读写表单，就用 `Form.useForm()` 拿到 `form` 实例。',
          },
          {
            type: 'text',
            title: '5.1 是什么：`Form` 是一个「值的托管容器」',
            body: '先回忆一下不用组件库时怎么写表单：每个输入框一个 `useState`，一个 `onChange`，然后手写 if 判断校验、手写错误文案的显示位置。三个字段还行，十个字段就是一百多行样板代码。\n\n`Form` 做的事情是**把所有字段的值集中托管起来**（内部维护了一个叫 store 的对象），你只要告诉它「这个输入框对应哪个字段名」，剩下的它全包：\n\n- 值的存取：不用 `useState`，也不用 `value` / `onChange`\n- 校验的触发：默认在「输入时」和「提交时」都校验\n- 错误文案的渲染：自动显示在对应输入框下方，红色小字\n- 必填星号：`rules` 里有 `required` 就自动在 label 前面加红星\n- 提交聚合：`onFinish(values)` 一次拿到完整对象\n\n**关键机制（务必理解）**：`Form.Item` 会给它「唯一的那个子组件」自动注入 `value` 和 `onChange`。所以 `<Form.Item name="age"><Input /></Form.Item>` 里的 `Input` 是被 `Form.Item` 接管的受控组件——**你千万不要再自己给它加 `value` 和 `onChange`**，那样会打断托管，表单就收不到值了。',
          },
          {
            type: 'table',
            title: '5.2 `Form` 的属性',
            intro: '前四个是必会的，后面的按需查。',
            headers: ['属性', '类型或取值', '作用', '常用值'],
            rows: [
              ['`onFinish`', '`(values) => void`', '**校验全部通过后**触发，`values` 是收集好的对象', '在这里发请求'],
              ['`onFinishFailed`', '`({ values, errorFields }) => void`', '校验失败时触发，可以用来提示「请检查表单」', '弹一个 message'],
              ['`initialValues`', '对象', '表单初始值；**只在首次渲染生效**', '`{ name: \'\', role: \'user\' }`'],
              ['`form`', 'FormInstance', '绑定 `Form.useForm()` 返回的实例，才能手动操作表单', '`const [form] = Form.useForm()`'],
              ['`layout`', '`horizontal` / `vertical` / `inline`', '标签在左边 / 标签在上面 / 全部挤在一行', '弹窗里用 `vertical`，搜索栏用 `inline`'],
              ['`labelCol` / `wrapperCol`', 'ColProps 对象', 'horizontal 布局时，标签和控件各占几份（24 栅格）', '`{ span: 6 }` / `{ span: 18 }`'],
              ['`requiredMark`', '`boolean` / `optional`', '必填星号的显示方式', '`false` 隐藏星号；`optional` 反过来标「可选」'],
              ['`disabled`', '`boolean`', '一键禁用整个表单里的所有控件', '提交中设为 `true`'],
              ['`size`', '`small` / `middle` / `large`', '统一表单内所有控件的尺寸', '`middle`'],
              ['`scrollToFirstError`', '`boolean`', '校验失败时自动滚动到第一个错误字段', '长表单建议 `true`'],
            ],
            note: '`initialValues` 只在**第一次渲染**时生效。编辑场景下数据是异步拿到的，改 `initialValues` 是无效的，必须用 `form.setFieldsValue(data)`——这是新手第一大坑。',
          },
          {
            type: 'table',
            title: '5.3 `Form.Item` 的属性',
            intro: '`name` 和 `rules` 是灵魂，其余是锦上添花。',
            headers: ['属性', '类型或取值', '作用', '常用值'],
            rows: [
              ['`name`', '`string` / `number` / 数组', '字段名，决定这个值在 `values` 里叫什么', '`name="email"`；嵌套用 `name={[\'addr\', \'city\']}`'],
              ['`label`', 'ReactNode', '左侧（或上方）的标签文字', '`label="邮箱"`'],
              ['`rules`', '规则数组', '校验规则，见下一张表', '`[{ required: true, message: \'必填\' }]`'],
              ['`initialValue`', 'any', '单个字段的初始值（一般更推荐用 Form 的 `initialValues`）', '`initialValue={18}`'],
              ['`valuePropName`', '`string`', '子组件用哪个属性表示值；**Switch 和 Checkbox 必须写 `checked`**', '`valuePropName="checked"`'],
              ['`extra`', 'ReactNode', '输入框下方的灰色补充说明', '`extra="8-20 位字符"`'],
              ['`tooltip`', 'ReactNode', 'label 后面加一个问号提示', '`tooltip="用于接收通知"`'],
              ['`dependencies`', '数组', '声明依赖别的字段，那个字段变了就重新校验自己', '确认密码依赖密码：`[[\'password\']]`'],
              ['`noStyle`', '`boolean`', '不渲染 label 和错误区，只做「值的绑定」', '和外层 Item 组合布局时用'],
              ['`hidden`', '`boolean`', '隐藏但仍然参与收值和校验', '存 id 这种不给用户看的字段'],
            ],
            note: '**`valuePropName="checked"` 是必须记住的例外**：`Switch`、`Checkbox`、`Radio`（单个）用 `checked` 而不是 `value` 表示自己的状态，不写这个属性表单就收不到它们的值。',
          },
          {
            type: 'table',
            title: '5.4 `rules` 校验规则大全',
            intro: '规则是一个数组，里面可以放多条，会按顺序校验，第一条不过就停下。',
            headers: ['规则字段', '含义', '例子', '备注'],
            rows: [
              ['`required`', '必填', '`{ required: true, message: \'请输入姓名\' }`', '会自动给 label 加红星'],
              ['`message`', '这条规则不通过时显示的文案', '同上', '**一定要写**，否则显示英文默认文案'],
              ['`min` / `max`', '字符串按长度、数字按大小', '`{ min: 6, max: 20, message: \'6-20 位\' }`', '对字符串是长度，对 `InputNumber` 是数值'],
              ['`len`', '长度必须正好等于', '`{ len: 11, message: \'手机号 11 位\' }`', ''],
              ['`pattern`', '正则表达式', '`{ pattern: /^1\\d{10}$/, message: \'手机号格式不对\' }`', '正则要写在两个斜杠里，不是字符串'],
              ['`type`', '内置类型校验', '`{ type: \'email\', message: \'邮箱格式不对\' }`', '常用 `email` / `url` / `number` / `array`'],
              ['`whitespace`', '不允许只输入空格', '`{ whitespace: true, message: \'不能全是空格\' }`', '配合 `required` 用'],
              ['`validator`', '自定义校验函数', '`{ validator: (_, value) => value > 0 ? Promise.resolve() : Promise.reject(new Error(\'必须大于 0\')) }`', '**通过就 resolve，失败就 reject 一个 Error**'],
              ['`validateTrigger`', '什么时候触发这条规则', '`{ validateTrigger: \'onBlur\', ... }`', '默认是 `onChange`，失焦校验体验更好'],
            ],
            note: '自定义 `validator` 必须返回 Promise：**成功 `Promise.resolve()`，失败 `Promise.reject(new Error(\'文案\'))`**。返回 `false` 或者直接 `throw` 都不是推荐写法。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo（一）：内置规则 —— 必填 / 长度 / 邮箱 / 正则',
            body: `import { Form, Input, Button, Select, message, Card } from 'antd'

interface Values { username: string; email: string; phone: string; role: string } // 提交时拿到的结构

export default function Demo() {
  const [messageApi, contextHolder] = message.useMessage() // v6 用 hook 版消息提示

  function onFinish(values: Values) { // 校验全部通过才会走到这里
    messageApi.success('提交成功：' + JSON.stringify(values))
  }

  function onFinishFailed() { // 校验没过时走这里，给一个整体提示
    messageApi.error('表单还有没填对的地方，请看红色提示')
  }

  return (
    <Card size="small" title="内置校验规则">
      {contextHolder} {/* message 的挂载点，别忘了渲染 */}
      <Form
        layout="vertical" // 标签放在控件上方，窄容器里最好看
        initialValues={{ role: 'user' }} // 初始值：只在首次渲染生效
        onFinish={onFinish} // 校验通过后的回调
        onFinishFailed={onFinishFailed} // 校验失败的回调
      >
        {/* rules 是数组，按顺序校验；第一条不过就停下不再往后查 */}
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            { required: true, message: '请输入用户名' }, // 必填，会自动在 label 前加红星
            { min: 3, max: 12, message: '用户名 3-12 个字符' }, // 对字符串来说 min/max 是「长度」
            { whitespace: true, message: '不能只输入空格' }, // 挡住「全是空格」这种输入
          ]}
        >
          {/* 注意：被 Form.Item 包住的控件绝对不要自己写 value / onChange */}
          <Input placeholder="3-12 个字符" />
        </Form.Item>

        {/* type: 'email' 是内置格式校验，比自己写正则省事 */}
        <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '邮箱格式不正确' }]}>
          <Input placeholder="name@example.com" />
        </Form.Item>

        {/* pattern 用正则字面量（写在两个斜杠里），不要加引号 */}
        <Form.Item name="phone" label="手机号" rules={[{ pattern: /^1\\d{10}$/, message: '请输入 11 位手机号' }]}>
          <Input placeholder="选填，11 位数字" />
        </Form.Item>

        <Form.Item name="role" label="角色" rules={[{ required: true, message: '请选择角色' }]}>
          {/* Select 用 options 数组，不要再用 <Select.Option> 子元素 */}
          <Select options={[{ value: 'user', label: '普通用户' }, { value: 'admin', label: '管理员' }]} />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          {/* 表单里的提交按钮必须写 htmlType="submit"，否则点了不会触发 onFinish */}
          <Button type="primary" htmlType="submit" block>提交</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo（二）：自定义 validator —— 两次密码一致 + 必须勾选协议',
            body: `import { Form, Input, Button, Checkbox, message, Card } from 'antd'

export default function Demo() {
  const [messageApi, contextHolder] = message.useMessage()

  return (
    <Card size="small" title="自定义校验">
      {contextHolder}
      <Form layout="vertical" initialValues={{ agree: false }} onFinish={() => messageApi.success('校验全部通过')}>
        <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }, { min: 6, message: '至少 6 位' }]}>
          {/* Password 自带右侧「眼睛」按钮，可以切换明文/密文 */}
          <Input.Password placeholder="至少 6 位" />
        </Form.Item>

        {/* dependencies 声明「password 变了就重新校验我」，否则改了密码上面的错误不会刷新 */}
        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          rules={[
            { required: true, message: '请再输入一次密码' },
            ({ getFieldValue }) => ({ // 规则也能写成函数，参数里能拿到读取其它字段的方法
              validator(_, value) {
                // 通过就返回 Promise.resolve()
                if (!value || getFieldValue('password') === value) return Promise.resolve()
                // 不通过就 reject 一个 Error，里面的文案会显示在输入框下面
                return Promise.reject(new Error('两次输入的密码不一致'))
              },
            }),
          ]}
        >
          <Input.Password placeholder="要和上面一致" />
        </Form.Item>

        {/* 关键：Checkbox 用 checked 表示状态，所以必须写 valuePropName="checked" */}
        <Form.Item
          name="agree"
          valuePropName="checked"
          rules={[{ validator: (_, v) => (v ? Promise.resolve() : Promise.reject(new Error('请先同意协议'))) }]}
        >
          <Checkbox>我已阅读并同意用户协议</Checkbox>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" block>注册</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}`,
          },
          {
            type: 'text',
            title: '5.5 `Form.useForm()`：需要「手动操作表单」时才用',
            body: '上面那个 Demo 全靠 `onFinish` 就够了。但真实业务经常需要在 React 代码里**主动读写表单**，比如：\n\n- 打开编辑弹窗时，把接口返回的数据填进表单 → `form.setFieldsValue(data)`\n- 点「重置」按钮清空表单 → `form.resetFields()`\n- 不通过提交按钮，而是在弹窗的确定按钮里触发校验 → `await form.validateFields()`\n- 根据「省份」的选择去动态请求「城市」列表 → `form.getFieldValue(\'province\')`\n\n这些都需要拿到**表单实例**。写法固定两步：\n\n```\nconst [form] = Form.useForm()   // ① 在组件顶层调用 hook\n<Form form={form} ...>          // ② 一定要把实例传给 Form 的 form 属性\n```\n\n**第二步最容易漏**：只调了 `useForm()` 却忘了 `form={form}`，那么所有 `form.xxx()` 调用都不会有任何反应，也不报错——这是新手排查半天找不到原因的经典问题。',
          },
          {
            type: 'table',
            title: '5.6 `form` 实例上最常用的方法',
            intro: '记住前四个就能覆盖绝大多数场景。',
            headers: ['方法', '作用', '典型用法', '注意'],
            rows: [
              ['`setFieldsValue(obj)`', '把一批值写进表单', '编辑时回填数据', '**编辑场景必用**，`initialValues` 对异步数据无效'],
              ['`resetFields()`', '重置回 `initialValues`', '点「重置」、关闭弹窗后清理', '注意是「回到初始值」，不是「清空」'],
              ['`validateFields()`', '手动触发校验，返回 Promise', '弹窗的确定按钮里 `await` 它', '失败会 reject，要用 `try/catch`'],
              ['`getFieldsValue()`', '读取所有字段的当前值', '搜索栏点查询时读条件', '不做校验，直接给值'],
              ['`getFieldValue(name)`', '读取单个字段的值', '联动：省变了去查城市', ''],
              ['`submit()`', '以代码方式触发提交（等于点了 submit 按钮）', '弹窗底部按钮触发表单提交', '会走完整的校验 + `onFinish`'],
              ['`setFields([...])`', '手动设置某字段的值或错误信息', '把后端返回的错误显示到对应字段下', '`[{ name: \'x\', errors: [\'已被占用\'] }]`'],
            ],
            note: '`validateFields()` 失败时会 **reject**，所以正确写法是 `try { const v = await form.validateFields() } catch (e) { /* 校验没过，什么都不用做，错误已经显示在界面上了 */ }`。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：useForm 手动填充 / 重置 / 校验 / 读值',
            body: `import { Form, Input, InputNumber, Button, Space, message, Card, Typography } from 'antd'
import { useState } from 'react'

interface Info { name: string; age: number; city: string } // 表单字段

const mockFromServer: Info = { name: '李小红', age: 26, city: '杭州' } // 假装是接口返回的数据

export default function Demo() {
  const [form] = Form.useForm<Info>() // ① 拿到表单实例（泛型可选，加了之后 setFieldsValue 有类型提示）
  const [messageApi, contextHolder] = message.useMessage()
  const [snapshot, setSnapshot] = useState<string>('') // 用来展示「读到的值」

  function fillFromServer() { // 模拟「编辑」场景：500ms 后拿到数据再回填
    messageApi.loading({ content: '正在加载数据…', key: 'load' }) // 同一个 key 的提示会被后面覆盖
    setTimeout(() => {
      form.setFieldsValue(mockFromServer) // 关键：异步数据必须用 setFieldsValue，改 initialValues 没用
      messageApi.success({ content: '数据已回填', key: 'load' })
    }, 500)
  }

  async function checkAll() { // 手动触发校验，不依赖 submit 按钮
    try {
      const values = await form.validateFields() // 校验通过：拿到值
      messageApi.success('校验通过：' + values.name)
    } catch (e) {
      // 校验失败会走到这里；错误提示 antd 已经画在界面上了，这里不用重复报错
      messageApi.error('校验没通过，看红色提示')
    }
  }

  return (
    <Card size="small" title="useForm 四件套">
      {contextHolder}
      {/* ② 千万别忘了 form={form}，漏了的话下面所有 form.xxx() 都是静默失效 */}
      <Form form={form} layout="vertical" initialValues={{ name: '', age: 18, city: '' }}>
        <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
          <Input placeholder="必填" />
        </Form.Item>
        <Form.Item name="age" label="年龄" rules={[{ required: true, message: '请输入年龄' }, { type: 'number', min: 1, max: 120, message: '年龄要在 1-120 之间' }]}>
          {/* InputNumber 默认只有 90px 宽，放在表单里一般要铺满 */}
          <InputNumber style={{ width: '100%' }} placeholder="1-120" />
        </Form.Item>
        <Form.Item name="city" label="城市">
          <Input placeholder="选填" />
        </Form.Item>
      </Form>

      <Space wrap>
        <Button type="primary" onClick={fillFromServer}>模拟编辑：回填数据</Button>
        <Button onClick={() => form.resetFields()}>重置（回到 initialValues）</Button>
        <Button onClick={checkAll}>手动校验</Button>
        {/* getFieldsValue 直接读当前所有值，不做校验 */}
        <Button onClick={() => setSnapshot(JSON.stringify(form.getFieldsValue()))}>读取当前值</Button>
      </Space>

      {snapshot && (
        <Typography.Paragraph style={{ marginTop: 12, marginBottom: 0, fontSize: 12 }}>
          <Typography.Text code>{snapshot}</Typography.Text>
        </Typography.Paragraph>
      )}
    </Card>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：三种 layout + inline 搜索栏（后台最常见的布局）',
            body: `import { Form, Input, Select, Button, Space, Radio, Card } from 'antd'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import { useState } from 'react'

type LayoutType = 'horizontal' | 'vertical' | 'inline' // 三种布局的字面量类型

export default function Demo() {
  const [layout, setLayout] = useState<LayoutType>('inline') // 当前布局，默认 inline
  const [result, setResult] = useState<string>('（还没查询）') // 展示查询条件

  const [form] = Form.useForm() // 为了能点「重置」，需要表单实例

  return (
    <Card size="small" title="切换 layout 看差别">
      {/* Radio.Group 用 optionType="button" 变成按钮组的样子 */}
      <Radio.Group
        value={layout}
        onChange={(e) => setLayout(e.target.value)} // Radio.Group 的值在 e.target.value 里
        optionType="button"
        buttonStyle="solid"
        style={{ marginBottom: 16 }}
        options={[
          { value: 'inline', label: 'inline（挤一行）' },
          { value: 'horizontal', label: 'horizontal（标签在左）' },
          { value: 'vertical', label: 'vertical（标签在上）' },
        ]}
      />

      <Form
        form={form}
        layout={layout} // 布局由上面的单选控制
        labelCol={layout === 'horizontal' ? { span: 6 } : undefined} // horizontal 时给标签留 6/24 宽
        wrapperCol={layout === 'horizontal' ? { span: 18 } : undefined} // 控件占剩下的 18/24
        initialValues={{ status: 'all' }}
        onFinish={(v) => setResult(JSON.stringify(v))} // 提交时把条件展示出来
      >
        <Form.Item name="keyword" label="关键词">
          {/* allowClear 会在右侧加一个清空小叉 */}
          <Input placeholder="姓名/手机号" allowClear style={{ width: 160 }} />
        </Form.Item>
        <Form.Item name="status" label="状态">
          <Select
            style={{ width: 120 }}
            options={[
              { value: 'all', label: '全部' },
              { value: 'on', label: '启用' },
              { value: 'off', label: '停用' },
            ]}
          />
        </Form.Item>
        <Form.Item> {/* 不写 name 的 Form.Item 就是纯布局用，不参与收值 */}
          <Space>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>查询</Button>
            {/* 重置：清空条件 + 清空结果 */}
            <Button icon={<ReloadOutlined />} onClick={() => { form.resetFields(); setResult('（已重置）') }}>重置</Button>
          </Space>
        </Form.Item>
      </Form>

      <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>提交的查询条件：{result}</div>
    </Card>
  )
}`,
          },
          {
            type: 'list',
            title: '5.7 这一节的易错点（Form 的坑最多，一定要看完）',
            ordered: true,
            items: [
              '**给 `Form.Item` 里的控件自己写 `value` / `onChange`**：这会打断 `Form` 的托管，导致 `onFinish` 里拿不到值。**受 `Form.Item` 管的控件什么都不用传**。',
              '**`Switch` / `Checkbox` 收不到值**：它们用 `checked` 表示状态，`Form.Item` 上必须加 `valuePropName="checked"`。',
              '**用 `initialValues` 回填异步数据**：`initialValues` 只在首次渲染生效。编辑场景必须用 `form.setFieldsValue(data)`。',
              '**调了 `Form.useForm()` 但忘了 `form={form}`**：所有 `form.xxx()` 都会静默失效，且不报错，极难排查。',
              '**提交按钮没写 `htmlType="submit"`**：antd Button 默认是 `button`，点了不会触发 `onFinish`。',
              '**`rules` 里不写 `message`**：会显示英文默认文案，比如「\'username\' is required」，很不专业。',
              '**`pattern` 写成了字符串**：要写 `/^1\\d{10}$/`（正则字面量），写成 `\'^1\\d{10}$\'` 不生效。',
              '**自定义 `validator` 不返回 Promise**：必须 `return Promise.resolve()` 或 `return Promise.reject(new Error(\'文案\'))`。',
              '**`await form.validateFields()` 不加 `try/catch`**：校验失败会 reject，不捕获就是一个未处理的 Promise 报错。',
              '**同一个 `name` 用在两个 `Form.Item` 上**：两个控件会互相覆盖，行为很诡异。字段名必须唯一。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '`<Form.Item name="字段名" rules={[...]}>` 包住控件 → 控件不要自己写 `value`/`onChange` → 提交用 `onFinish(values)`。`Switch`/`Checkbox` 加 `valuePropName="checked"`。要手动操作就 `const [form] = Form.useForm()` **并且** `form={form}`，编辑回填用 `setFieldsValue`。',
          },
        ],
      },
    },
    {
      id: 'antd-inputs',
      title: '表单控件全家桶：Input、Select、Radio、Switch、DatePicker、Upload……',
      summary: '每种数据形态配一个控件：文字用 Input、单选用 Select/Radio、开关用 Switch、日期用 DatePicker（必须配 dayjs）',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '按「用户要输入什么」选控件：**自由文字** `Input`、**多行文字** `Input.TextArea`、**密码** `Input.Password`、**数字** `InputNumber`、**从多个里选一个（>5 项）** `Select`、**从 2-4 个里选一个** `Radio`、**多选** `Checkbox.Group`、**是/否开关** `Switch`、**范围值** `Slider`、**评分** `Rate`、**日期** `DatePicker`（值是 dayjs 对象）、**文件** `Upload`。',
          },
          {
            type: 'text',
            title: '6.1 为什么：控件选错了，体验就差一截',
            body: '同样是「让用户选一个值」，选不同控件的体验差别很大：\n\n- **选项只有 2～4 个**（性别、是否置顶）：用 `Radio`，所有选项一眼可见，点一次就选好。用 `Select` 反而要点两次。\n- **选项 5 个以上**（城市、部门、分类）：用 `Select`，否则一屏放不下。超过 20 个选项时给 `Select` 加 `showSearch`。\n- **只有「开 / 关」两个状态，而且改了立刻生效**：用 `Switch`（比如「接收通知」）。如果是「同意条款」这种要跟着表单一起提交的，用 `Checkbox`。\n- **要输数字**：一定用 `InputNumber` 而不是 `Input`。`Input` 拿到的是字符串 `"18"`，`InputNumber` 拿到的是数字 `18`，还自带上下箭头、`min`/`max` 限制、`precision` 小数位。\n\n还有一个所有控件通用的属性值得记住：**`allowClear`**——给 `Input`、`Select`、`DatePicker` 加上它，输入框右侧会出现一个小叉，用户可以一键清空。搜索条件类的输入框强烈建议都加。',
          },
          {
            type: 'table',
            title: '6.2 文字与数字类控件',
            intro: '`Input` 是最常用的组件，它下面挂着三个变体。',
            headers: ['控件', '关键属性', '作用', '常用值'],
            rows: [
              ['`Input`', '`placeholder` / `allowClear` / `maxLength` / `prefix` / `suffix` / `disabled`', '单行文本；`prefix` 可以放个图标', '`allowClear`、`prefix={<UserOutlined />}`'],
              ['`Input.TextArea`', '`rows` / `autoSize` / `showCount` / `maxLength`', '多行文本；`autoSize` 随内容自动长高', '`autoSize={{ minRows: 2, maxRows: 5 }}`'],
              ['`Input.Password`', '`visibilityToggle`', '密码框，自带「眼睛」切换明文', '默认就好'],
              ['`Input.Search`', '`onSearch` / `enterButton` / `loading`', '带搜索按钮的输入框', '`enterButton="搜索"`'],
              ['`InputNumber`', '`min` / `max` / `step` / `precision` / `prefix` / `suffix`', '数字输入；**值的类型是 number**', '`precision={2}`、`suffix="元"`'],
            ],
            note: '`InputNumber` 默认宽度很窄（约 90px），放在表单里通常要加 `style={{ width: \'100%\' }}`。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：Input 家族 + InputNumber',
            body: `import { Input, InputNumber, Space, Card, Typography } from 'antd'
import { UserOutlined, SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'

export default function Demo() {
  const [keyword, setKeyword] = useState<string>('') // 保存搜索关键词
  const [price, setPrice] = useState<number | null>(99.5) // InputNumber 的值可能被清空，所以类型带 null

  return (
    <Card size="small" title="Input 家族">
      <Space vertical size={12} style={{ width: '100%' }}>
        {/* 基础输入框：prefix 放左侧图标，allowClear 给一个清空小叉，maxLength 限制长度 */}
        <Input prefix={<UserOutlined />} placeholder="姓名（最多 10 个字）" allowClear maxLength={10} showCount />

        {/* 密码框：自带右侧「眼睛」按钮切换明文/密文 */}
        <Input.Password placeholder="密码" />

        {/* 搜索框：enterButton 给一个搜索按钮，onSearch 在点按钮或按回车时触发 */}
        <Input.Search
          placeholder="输入后回车或点按钮"
          enterButton={<SearchOutlined />}
          onSearch={(v) => setKeyword(v)} // v 就是输入框里的内容
        />

        {/* 多行文本：autoSize 让它随内容自动长高，showCount 显示字数统计 */}
        <Input.TextArea
          placeholder="备注（自动长高，最多 5 行）"
          autoSize={{ minRows: 2, maxRows: 5 }}
          maxLength={100}
          showCount
        />

        {/* 数字输入：min/max 限制范围，step 是每次点箭头加减多少，precision 固定小数位 */}
        <InputNumber
          style={{ width: '100%' }} // 默认很窄，铺满更好看
          min={0}
          max={9999}
          step={0.5}
          precision={2} // 固定两位小数
          prefix="￥" // 输入框内左侧的固定文字（v6 用 prefix，老的 addonBefore 已废弃）
          suffix="元" // 输入框内右侧的固定文字
          value={price}
          onChange={(v) => setPrice(v)} // 注意：这里拿到的是 number（或 null），不是字符串
        />

        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          搜索关键词：{keyword || '（空）'}　价格：{price === null ? '（空）' : price}（类型是 {typeof price}）
        </Typography.Text>
      </Space>
    </Card>
  )
}`,
          },
          {
            type: 'table',
            title: '6.3 选择类控件',
            intro: '选项数量决定用哪个，前面已经讲过判断标准。',
            headers: ['控件', '关键属性', '作用', '常用值'],
            rows: [
              ['`Select`', '`options` / `mode` / `showSearch` / `allowClear` / `placeholder`', '下拉选择；`mode="multiple"` 变多选', '`options={[{ value, label }]}`'],
              ['`Select` 搜索', '`showSearch` / `filterOption` / `optionFilterProp`', '输入文字过滤选项', '`showSearch` + `optionFilterProp="label"`'],
              ['`Radio.Group`', '`options` / `value` / `onChange` / `optionType`', '单选组；`optionType="button"` 变按钮组', '`buttonStyle="solid"` 实心高亮'],
              ['`Checkbox.Group`', '`options` / `value` / `onChange`', '多选组，值是数组', '`options={[\'A\',\'B\']}`'],
              ['`Switch`', '`checked` / `onChange` / `checkedChildren`', '开关；**表单里要配 `valuePropName="checked"`**', '`checkedChildren="开"`'],
              ['`Slider`', '`min` / `max` / `step` / `range` / `marks`', '滑块选数值；`range` 变成区间', '`range` + `marks={{ 0: \'0\', 100: \'100\' }}`'],
              ['`Rate`', '`count` / `allowHalf` / `value`', '星级评分', '`allowHalf` 允许半星'],
            ],
            note: '`Select` 的 `<Select.Option>` 子元素写法在 v6 已废弃，**统一用 `options` 数组**——顺便一提，`options` 写法的性能也明显更好。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：Select 的三种形态（单选 / 多选 / 可搜索）',
            body: `import { Select, Space, Card, Typography } from 'antd'
import { useState } from 'react'

// Select 的选项数据：每项固定是 { value, label }
const cityOptions = [
  { value: 'hz', label: '杭州' },
  { value: 'sh', label: '上海' },
  { value: 'bj', label: '北京' },
  { value: 'gz', label: '广州' },
  { value: 'cd', label: '成都' },
]

export default function Demo() {
  const [city, setCity] = useState<string>('hz') // 单选：值是一个字符串
  const [cities, setCities] = useState<string[]>(['hz', 'sh']) // 多选：值是字符串数组

  return (
    <Card size="small" title="Select 三种形态">
      <Space vertical size={12} style={{ width: '100%' }}>
        {/* ① 单选：onChange 直接给值（不是事件对象），allowClear 加清空小叉 */}
        <Select style={{ width: '100%' }} options={cityOptions} value={city} onChange={setCity} placeholder="请选择城市" allowClear />

        {/* ② 多选：加 mode="multiple"，值变成数组，选中项显示为一个个小标签 */}
        <Select
          style={{ width: '100%' }}
          mode="multiple"
          options={cityOptions}
          value={cities}
          onChange={setCities}
          placeholder="可以选多个"
          maxTagCount={3} // 最多显示 3 个标签，多出来的折叠成 “+n”
        />

        {/* ③ 可搜索：showSearch 打开搜索框 */}
        <Select
          style={{ width: '100%' }}
          showSearch
          optionFilterProp="label" // 关键：按中文 label 过滤，不写的话是按 value（'hz'）过滤，搜中文搜不到
          options={cityOptions}
          placeholder="输入「州」试试搜索"
        />

        <Typography.Text code style={{ fontSize: 12 }}>
          {JSON.stringify({ city, cities })}
        </Typography.Text>
      </Space>
    </Card>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：Radio / Checkbox / Switch / Slider / Rate',
            body: `import { Radio, Checkbox, Switch, Slider, Rate, Space, Card, Typography, Divider } from 'antd'
import { useState } from 'react'

export default function Demo() {
  const [gender, setGender] = useState<string>('male') // Radio 的值
  const [hobbies, setHobbies] = useState<string[]>(['read']) // Checkbox.Group 的值是数组
  const [notify, setNotify] = useState<boolean>(true) // Switch 的值是布尔
  const [range, setRange] = useState<number[]>([20, 60]) // range 模式的 Slider 值是 [起, 止]
  const [score, setScore] = useState<number>(4) // 评分

  return (
    <Card size="small" title="其它选择类控件">
      <Space vertical size={12} style={{ width: '100%' }}>
        {/* Radio.Group：选项只有 2-4 个时比 Select 好用（一眼全看到，点一次就选好） */}
        {/* 注意：它的 onChange 给的是事件对象，值要从 e.target.value 里取 */}
        <Radio.Group
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          options={[{ value: 'male', label: '男' }, { value: 'female', label: '女' }, { value: 'other', label: '不便告知' }]}
        />

        {/* Checkbox.Group：多选，值是数组，onChange 直接给数组 */}
        <Checkbox.Group
          value={hobbies}
          onChange={(v) => setHobbies(v as string[])} // 断言成字符串数组，方便后续使用
          options={[{ value: 'read', label: '阅读' }, { value: 'sport', label: '运动' }, { value: 'music', label: '音乐' }]}
        />

        <Divider style={{ margin: '4px 0' }} />

        {/* Switch：布尔开关；checkedChildren / unCheckedChildren 是开关上显示的文字 */}
        <Space>
          <Switch checked={notify} onChange={setNotify} checkedChildren="开" unCheckedChildren="关" />
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>接收通知：{notify ? '是' : '否'}</Typography.Text>
        </Space>

        {/* Slider 的 range 模式：值是 [起点, 终点]；marks 在轨道下面标刻度 */}
        <Slider range value={range} onChange={(v) => setRange(v as number[])} marks={{ 0: '0', 50: '50', 100: '100' }} />

        {/* Rate：allowHalf 允许打半星 */}
        <Space>
          <Rate allowHalf value={score} onChange={setScore} />
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>{score} 分</Typography.Text>
        </Space>

        <Typography.Text code style={{ fontSize: 12 }}>
          {JSON.stringify({ gender, hobbies, notify, range, score })}
        </Typography.Text>
      </Space>
    </Card>
  )
}`,
          },
          {
            type: 'text',
            title: '6.4 `DatePicker` 与 dayjs：值不是字符串！',
            body: '这是 antd 新手最容易卡住的地方之一，务必看清：\n\n**`DatePicker` 的值是一个 `dayjs` 对象，不是字符串**。\n\n所以两个方向都要转换：\n\n**① 往表单里塞初始值时**：如果后端返回的是 `\'2024-03-12\'` 这样的字符串，直接塞进去会报错（大意是 `value.format is not a function`）。必须先转：`dayjs(\'2024-03-12\')`。\n\n**② 提交给后端时**：拿到的是 dayjs 对象，后端要的是字符串，必须转回去：`value.format(\'YYYY-MM-DD\')`。\n\n常用的几个属性：\n\n- `format="YYYY-MM-DD"`：控制**输入框里显示**的格式（不影响值的类型）\n- `showTime`：连时间一起选，格式一般配 `\'YYYY-MM-DD HH:mm:ss\'`\n- `picker="month"` / `"year"` / `"week"`：选月份、年份、周\n- `DatePicker.RangePicker`：选一个日期区间，值是 `[dayjs, dayjs]` 数组\n- `disabledDate={(d) => d && d < dayjs().startOf(\'day\')}`：禁用今天之前的日期\n\n还有一个细节：`dayjs` 对象是**不可变**的，`d.add(1, \'day\')` 会返回一个新对象而不是改原来的，所以要接收返回值。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：DatePicker + dayjs 的取值与格式化',
            body: `import { DatePicker, Space, Card, Typography, Button, Divider } from 'antd'
import dayjs from 'dayjs' // 日期库：DatePicker 的值就是它的实例
import type { Dayjs } from 'dayjs' // 类型：给 state 标注用
import { useState } from 'react'

const { RangePicker } = DatePicker // 区间选择器

export default function Demo() {
  // 初始值：后端给的是字符串，必须用 dayjs() 包一层才能给 DatePicker
  const [date, setDate] = useState<Dayjs | null>(dayjs('2024-03-12'))
  const [range, setRange] = useState<[Dayjs, Dayjs] | null>(null) // 区间值是长度为 2 的数组

  return (
    <Card size="small" title="DatePicker 与 dayjs">
      <Space vertical size={12} style={{ width: '100%' }}>
        {/* format 只影响输入框里「显示成什么样」，不改变值的类型 */}
        <DatePicker
          style={{ width: '100%' }}
          value={date}
          onChange={(d) => setDate(d)} // d 是 Dayjs 对象，清空时是 null
          format="YYYY-MM-DD"
          placeholder="选择日期"
          allowClear
        />

        {/* showTime 连时分秒一起选；disabledDate 禁掉今天之前的日期 */}
        <DatePicker
          style={{ width: '100%' }}
          showTime
          format="YYYY-MM-DD HH:mm"
          placeholder="选择日期和时间（今天之前不可选）"
          disabledDate={(d) => d && d < dayjs().startOf('day')} // startOf('day') 拿到今天 00:00
        />

        {/* picker="month" 只选月份 */}
        <DatePicker style={{ width: '100%' }} picker="month" placeholder="只选月份" />

        {/* 区间选择：值是 [起, 止] */}
        <RangePicker
          style={{ width: '100%' }}
          onChange={(v) => setRange(v as [Dayjs, Dayjs] | null)}
          placeholder={['开始日期', '结束日期']}
        />

        <Space>
          {/* dayjs 是不可变的：add 返回新对象，必须重新赋值 */}
          <Button size="small" onClick={() => setDate((d) => (d ? d.add(1, 'day') : dayjs()))}>日期 +1 天</Button>
          <Button size="small" onClick={() => setDate(dayjs())}>设为今天</Button>
        </Space>

        <Divider style={{ margin: '4px 0' }} />
        <Typography.Text style={{ fontSize: 12 }}>
          {/* 提交给后端前必须 format 成字符串 */}
          单个日期 format 后：<Typography.Text code>{date ? date.format('YYYY-MM-DD') : '（空）'}</Typography.Text>
          <br />
          区间 format 后：
          <Typography.Text code>
            {range ? range[0].format('YYYY-MM-DD') + ' ~ ' + range[1].format('YYYY-MM-DD') : '（空）'}
          </Typography.Text>
        </Typography.Text>
      </Space>
    </Card>
  )
}`,
          },
          {
            type: 'text',
            title: '6.5 `Upload`：真实项目怎么传，Demo 里怎么演示',
            body: '`Upload` 在真实项目里的标准用法是：给 `action` 传后端的上传接口地址，组件自己就会用 `FormData` 发请求、显示进度条、维护文件列表。\n\n但有三件事必须自己做：\n\n**① `beforeUpload` 做前端拦截**：在文件真正上传之前检查类型和大小。返回 `false` 就阻止上传（这也是「只想本地预览、不真传」的实现方式）。\n\n**② `fileList` 受控**：想自己控制列表（比如删除、限制数量），就把 `fileList` 放在 state 里，配合 `onChange` 更新。\n\n**③ 和 `Form` 配合时要转值**：`Form.Item` 拿到的是 `{ file, fileList }` 这样一个对象，不是数组，所以需要 `getValueFromEvent` 把它转成 `fileList`。\n\n下面这个 Demo 用 `beforeUpload` 返回 `false` 的方式，只在前端校验和展示，不发任何网络请求——这样在教学环境里也能跑。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：Upload 用 beforeUpload 拦截（不真传，纯前端校验）',
            body: `import { Upload, Button, message, Card, Typography, Space } from 'antd'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'

interface LocalFile { name: string; size: number } // 自己维护的「已选文件」结构

export default function Demo() {
  const [messageApi, contextHolder] = message.useMessage()
  const [files, setFiles] = useState<LocalFile[]>([]) // 已通过校验的文件列表

  // beforeUpload：文件被选中、真正上传之前调用。返回 false 就阻止上传
  function beforeUpload(file: File) {
    if (!file.type.startsWith('image/')) { messageApi.error('只允许上传图片'); return false } // 类型不对：拦下
    if (file.size / 1024 / 1024 >= 2) { messageApi.error('图片不能超过 2MB'); return false } // 太大：拦下
    if (files.length >= 3) { messageApi.warning('最多只能选 3 个文件'); return false } // 已有 3 个：拦下

    // 校验通过：自己把文件记到 state 里（这里不发请求，纯演示）
    setFiles((prev) => [...prev, { name: file.name, size: file.size }])
    messageApi.success('已选择：' + file.name)
    return false // 关键：始终返回 false，antd 就不会真的去请求接口
  }

  return (
    <Card size="small" title="Upload（本地校验版）">
      {contextHolder}
      {/* showUploadList={false} 关掉 antd 自带的列表，改成自己渲染，方便看清逻辑 */}
      <Upload beforeUpload={beforeUpload} showUploadList={false} accept="image/*" multiple>
        <Button icon={<UploadOutlined />}>选择图片（≤2MB，最多 3 个）</Button>
      </Upload>

      <div style={{ marginTop: 12 }}>
        {files.length === 0 ? (
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>还没有选择文件</Typography.Text>
        ) : (
          <Space vertical size={4} style={{ width: '100%' }}>
            {files.map((f, i) => ( // 渲染已选文件，文件名可能重复所以拼上下标做 key
              <Space key={f.name + i} size={8}>
                <Typography.Text style={{ fontSize: 12 }}>{f.name}（{(f.size / 1024).toFixed(1)} KB）</Typography.Text>
                {/* 删除：过滤掉当前下标那一项 */}
                <Button size="small" type="text" danger icon={<DeleteOutlined />} onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))} />
              </Space>
            ))}
          </Space>
        )}
      </div>

      <Typography.Paragraph type="secondary" style={{ fontSize: 12, marginTop: 8, marginBottom: 0 }}>
        真实项目里把 beforeUpload 的 return 改成 true，并给 Upload 传 action="/api/upload"，组件就会自动发请求、显示进度条。
      </Typography.Paragraph>
    </Card>
  )
}`,
          },
          {
            type: 'code',
            title: '6.6 `Upload` 配合 `Form` 的标准写法（静态代码）',
            language: 'tsx',
            body: `import { Form, Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

// Form.Item 里的 Upload 拿到的 onChange 参数是 { file, fileList } 对象，
// 而我们希望存进表单的是 fileList 数组，所以要用 getValueFromEvent 转一下
function normFile(e: any) {
  if (Array.isArray(e)) return e // 已经是数组就原样返回
  return e && e.fileList // 否则取出里面的 fileList
}

export default function UploadInForm() {
  return (
    <Form onFinish={(v) => console.log(v.avatar)} layout="vertical">
      <Form.Item
        name="avatar" // 字段名
        label="头像"
        valuePropName="fileList" // ① Upload 用 fileList 表示自己的值，不是 value
        getValueFromEvent={normFile} // ② 把 { file, fileList } 转成 fileList 数组
        rules={[{ required: true, message: '请上传头像' }]}
      >
        <Upload
          action="/api/upload" // 真实的上传接口地址，组件会自动 POST FormData
          listType="picture" // 列表样式：picture 会显示缩略图
          maxCount={1} // 最多一个文件，再选会替换掉原来的
        >
          <Button icon={<UploadOutlined />}>点击上传</Button>
        </Upload>
      </Form.Item>

      <Button type="primary" htmlType="submit">提交</Button>
    </Form>
  )
}`,
          },
          {
            type: 'list',
            title: '6.7 这一节的易错点',
            ordered: true,
            items: [
              '**`DatePicker` 传字符串**：`value={\'2024-03-12\'}` 会报 `format is not a function`，必须 `dayjs(\'2024-03-12\')`。',
              '**提交时忘了把 dayjs 转字符串**：后端拿到一个 dayjs 对象序列化后的怪东西。提交前 `.format(\'YYYY-MM-DD\')`。',
              '**用 `Input` 收数字**：拿到的是字符串 `"18"`，做加法会变成 `"181"`。用 `InputNumber`。',
              '**`Select` 还在用 `<Select.Option>`**：v6 已废弃，改用 `options` 数组。',
              '**`Radio.Group` 的 `onChange` 直接当值用**：它给的是事件对象，值在 `e.target.value` 里（`Select` 和 `Switch` 才是直接给值）。',
              '**`Switch` 放进 `Form.Item` 忘了 `valuePropName="checked"`**：表单永远收不到它的值。',
              '**`InputNumber` 没给宽度**：默认约 90px，在表单里显得很怪，加 `style={{ width: \'100%\' }}`。',
              '**`Upload` 在 `Form` 里不写 `getValueFromEvent`**：表单里存的会是 `{ file, fileList }` 对象而不是数组。',
              '**指望 `beforeUpload` 返回 `false` 还能上传**：返回 `false` 就是明确阻止，想上传要返回 `true`（或不返回）。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '数字用 `InputNumber`（值是 number）、选项少用 `Radio` 多用 `Select`（`options` 数组）、开关 `Switch`（表单里配 `valuePropName="checked"`）、日期用 `DatePicker`（**值是 dayjs 对象，进要 `dayjs(str)`、出要 `.format()`**）、文件 `Upload`（`beforeUpload` 做校验，返回 `false` 可阻止上传）。搜索类输入框都加 `allowClear`。',
          },
        ],
      },
    },
    {
      id: 'antd-table',
      title: 'Table 表格：columns 是灵魂，rowKey 是底线',
      summary: 'columns 描述「每列长什么样」，dataSource 提供数据；排序、筛选、分页、多选、操作列一次讲全',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '`Table` 只有三个必填输入：**`columns`（有几列、每列显示什么）+ `dataSource`（数据数组）+ `rowKey`（每行的唯一标识）**。`rowKey` 不写就会有 warning、多选和更新也会出诡异 bug，所以**它不是可选项**。列里最有用的属性是 `render`，它让你把原始数据渲染成标签、按钮、格式化后的文字。',
          },
          {
            type: 'text',
            title: '7.1 是什么：`columns` 是一份「表头说明书」',
            body: '`Table` 的思路和你自己手写 `<table>` 完全不同：**你不写任何 `<tr>` / `<td>`**，而是先描述「这张表有哪些列」，然后把数据数组丢进去，组件自己去循环渲染。\n\n`columns` 是一个数组，数组里每一项描述一列。最基本的三个字段：\n\n- `title`：这一列的表头文字，比如「姓名」\n- `dataIndex`：这一列要读数据对象里的哪个字段，比如 `\'name\'`\n- `key`：这一列的唯一标识（如果 `dataIndex` 已经唯一，可以省略 `key`）\n\n这样 `Table` 就知道：「第一列表头写『姓名』，每一行去 `record.name` 里取值显示」。\n\n然后是那个最重要的可选字段 —— **`render`**：\n\n```\nrender: (value, record, index) => ReactNode\n```\n\n- `value`：`dataIndex` 对应的那个值\n- `record`：**整行的完整数据对象**（做操作列时全靠它拿 id）\n- `index`：行号\n\n有了 `render`，你就能把 `status: \'active\'` 渲染成一个绿色 `Tag`、把时间戳格式化成日期、在最后一列放「编辑 / 删除」按钮。**操作列的写法是：不写 `dataIndex`，只写 `render`。**',
          },
          {
            type: 'table',
            title: '7.2 `columns` 里每一列能配什么',
            intro: '前四个天天用，后面的按需查。',
            headers: ['字段', '类型或取值', '作用', '常用值'],
            rows: [
              ['`title`', 'ReactNode', '表头显示的文字', '`\'姓名\'`'],
              ['`dataIndex`', '`string` / 数组', '读数据对象的哪个字段；嵌套用数组', '`\'name\'`；`[\'addr\', \'city\']`'],
              ['`key`', '`string`', '列的唯一标识；操作列必须写（因为没有 `dataIndex`）', '`\'action\'`'],
              ['`render`', '`(value, record, index) => ReactNode`', '自定义这一格怎么渲染', '渲染 `Tag`、按钮、格式化文字'],
              ['`width`', '`number` / `string`', '列宽；建议至少给操作列固定宽度', '`120`'],
              ['`align`', '`left` / `center` / `right`', '内容对齐方式；金额类用 `right`', '`center`'],
              ['`fixed`', '`left` / `right`', '横向滚动时固定这一列；**必须配 `scroll={{ x: 数字 }}`**', '操作列 `fixed="right"`'],
              ['`sorter`', '`(a, b) => number` 或 `true`', '排序；前端排序给比较函数，后端排序给 `true`', '`(a, b) => a.age - b.age`'],
              ['`filters` + `onFilter`', '数组 + 函数', '表头筛选下拉；两个要一起用', '见下方 Demo'],
              ['`ellipsis`', '`boolean`', '内容超长时显示省略号而不是撑破布局', '`true`'],
              ['`defaultSortOrder`', '`ascend` / `descend`', '默认按这一列排序', '`\'descend\'`'],
            ],
            note: '`fixed` 单独写是没用的，**必须同时给 `Table` 传 `scroll={{ x: 总宽度 }}`**，让表格先能横向滚动，固定列才有意义。',
          },
          {
            type: 'table',
            title: '7.3 `Table` 本身的属性',
            intro: '`pagination` 和 `rowSelection` 是两个「传对象」的属性，最容易写错。',
            headers: ['属性', '类型或取值', '作用', '常用值'],
            rows: [
              ['`columns`', '数组', '列定义', '见上一张表'],
              ['`dataSource`', '数组', '数据源', '接口返回的数组'],
              ['`rowKey`', '`string` / `(record) => key`', '**每行的唯一标识，必写**', '`rowKey="id"`'],
              ['`loading`', '`boolean`', '显示加载遮罩，请求期间用', '`loading={loading}`'],
              ['`pagination`', '对象 / `false`', '分页配置；`false` 表示不分页', '`{ pageSize: 5, showSizeChanger: true }`'],
              ['`rowSelection`', '对象', '多选/单选配置', '`{ selectedRowKeys, onChange }`'],
              ['`size`', '`small` / `middle` / `large`', '行高；后台密集表格常用 `small`', '`\'small\'`'],
              ['`bordered`', '`boolean`', '显示单元格边框', '`true`'],
              ['`scroll`', '`{ x, y }`', '横向/纵向滚动；列多时必给 `x`', '`{ x: 900 }`'],
              ['`onChange`', '`(pagination, filters, sorter) => void`', '分页/筛选/排序变化时触发（后端分页靠它）', '在里面重新请求接口'],
              ['`expandable`', '对象', '行可展开，展开区自定义内容', '`{ expandedRowRender }`'],
            ],
            note: '`rowKey` 的值必须**唯一且稳定**。用 `index` 当 rowKey 是错的：删掉一行之后所有行的 key 都变了，会导致选中状态错乱、组件白白重绘。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：最基础的表格 + render 自定义列',
            body: `import { Table, Tag, Space, Button, Card } from 'antd'
import type { TableColumnsType } from 'antd' // 列定义的类型（编译时会被擦掉）

interface User { // 一行数据的结构
  id: number // 唯一 id，给 rowKey 用
  name: string
  age: number
  dept: string
  status: 'active' | 'off' // 状态只有两种取值
}

const data: User[] = [ // 数据源，演示用四条就够
  { id: 1, name: '张小明', age: 28, dept: '技术部', status: 'active' },
  { id: 2, name: '李小红', age: 32, dept: '设计部', status: 'active' },
  { id: 3, name: '王小刚', age: 24, dept: '技术部', status: 'off' },
  { id: 4, name: '赵小美', age: 41, dept: '市场部', status: 'active' },
]

const columns: TableColumnsType<User> = [
  { title: '姓名', dataIndex: 'name', width: 90 }, // dataIndex 唯一时可以省略 key
  { title: '年龄', dataIndex: 'age', width: 70, align: 'center' }, // align 让数字居中
  { title: '部门', dataIndex: 'dept', width: 90 },
  {
    title: '状态', dataIndex: 'status', width: 90,
    // render 把原始值 'active' / 'off' 渲染成彩色标签，比直接显示英文友好得多
    render: (value: User['status']) => (value === 'active' ? <Tag color="success">在职</Tag> : <Tag>离职</Tag>),
  },
  {
    title: '操作', key: 'action', width: 120, // 操作列没有 dataIndex，所以必须写 key
    // render 的第二个参数 record 是「整行数据」，操作按钮全靠它拿 id
    render: (_, record) => (
      <Space size={4}>
        <Button type="link" size="small" onClick={() => alert('编辑 ' + record.name)}>编辑</Button>
        <Button type="link" size="small" danger onClick={() => alert('删除 id=' + record.id)}>删除</Button>
      </Space>
    ),
  },
]

export default function Demo() {
  return (
    <Card size="small" title="基础表格">
      <Table
        rowKey="id" // 必写：告诉 Table 用 id 字段区分每一行
        columns={columns}
        dataSource={data}
        size="small" // 紧凑行高，后台表格常用
        pagination={false} // 数据少，先关掉分页
      />
    </Card>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：排序 + 筛选 + 分页 + loading（点表头试试）',
            body: `import { Table, Button, Card, Space } from 'antd'
import type { TableColumnsType } from 'antd'
import { useState } from 'react'

interface Row { id: number; name: string; score: number; dept: string }

// 造 8 条数据：用 map 生成，省得手写
const data: Row[] = [
  { id: 1, name: '张小明', score: 88, dept: '技术部' },
  { id: 2, name: '李小红', score: 95, dept: '设计部' },
  { id: 3, name: '王小刚', score: 72, dept: '技术部' },
  { id: 4, name: '赵小美', score: 61, dept: '市场部' },
  { id: 5, name: '钱小方', score: 79, dept: '设计部' },
  { id: 6, name: '孙小圆', score: 90, dept: '市场部' },
]

const columns: TableColumnsType<Row> = [
  { title: '姓名', dataIndex: 'name' },
  {
    title: '分数', dataIndex: 'score', align: 'center',
    // sorter 给一个比较函数就是「前端排序」：点表头会在 升序 → 降序 → 取消 之间切换
    sorter: (a, b) => a.score - b.score,
    defaultSortOrder: 'descend', // 首次进来默认按分数从高到低
  },
  {
    title: '部门', dataIndex: 'dept',
    // filters 是表头漏斗里的可选项：text 是显示文字，value 是筛选值
    filters: [{ text: '技术部', value: '技术部' }, { text: '设计部', value: '设计部' }, { text: '市场部', value: '市场部' }],
    // onFilter 决定「某一行要不要被留下」：返回 true 就保留
    onFilter: (value, record) => record.dept === value,
  },
]

export default function Demo() {
  const [loading, setLoading] = useState<boolean>(false) // 是否显示加载遮罩

  function reload() { // 模拟「刷新」：进 loading，1 秒后出来
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <Card size="small" title="排序 / 筛选 / 分页" extra={<Button size="small" onClick={reload}>模拟刷新</Button>}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        size="small"
        loading={loading} // true 时表格上会盖一层转圈遮罩
        pagination={{
          pageSize: 3, // 每页 3 条，这样 6 条数据正好两页
          showSizeChanger: true, // 显示「每页几条」的下拉
          pageSizeOptions: [3, 5, 10], // 可选的每页条数
          showTotal: (total) => '共 ' + total + ' 条', // 左下角的汇总文案（用字符串拼接）
        }}
      />
    </Card>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：rowSelection 多选 + 批量操作',
            body: `import { Table, Button, Card, Space, Typography, message } from 'antd'
import type { TableColumnsType } from 'antd'
import { useState } from 'react'

interface Row { id: number; name: string; dept: string }

const data: Row[] = [
  { id: 1, name: '张小明', dept: '技术部' },
  { id: 2, name: '李小红', dept: '设计部' },
  { id: 3, name: '王小刚', dept: '技术部' },
  { id: 4, name: '赵小美', dept: '市场部' },
]

const columns: TableColumnsType<Row> = [
  { title: '姓名', dataIndex: 'name' },
  { title: '部门', dataIndex: 'dept' },
]

export default function Demo() {
  const [messageApi, contextHolder] = message.useMessage()
  // 选中的行的 key 列表；注意存的是 key（也就是 id），不是整行对象
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])

  function batchDelete() { // 批量删除（这里只做提示，不真删）
    if (selectedKeys.length === 0) return messageApi.warning('请先勾选要删除的行')
    messageApi.success('删除了 ' + selectedKeys.length + ' 条：id = ' + selectedKeys.join(', '))
    setSelectedKeys([]) // 操作完清空选中状态
  }

  return (
    <Card size="small" title="多选与批量操作">
      {contextHolder}
      <Space style={{ marginBottom: 8 }}>
        {/* 没选中时禁用批量按钮，这是后台表格的标准做法 */}
        <Button type="primary" danger disabled={selectedKeys.length === 0} onClick={batchDelete}>
          批量删除
        </Button>
        <Button disabled={selectedKeys.length === 0} onClick={() => setSelectedKeys([])}>取消选择</Button>
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>
          已选 {selectedKeys.length} 项
        </Typography.Text>
      </Space>

      <Table
        rowKey="id" // rowSelection 靠 rowKey 判断「哪一行被选中了」，所以更加不能省
        columns={columns}
        dataSource={data}
        size="small"
        pagination={false}
        rowSelection={{
          type: 'checkbox', // checkbox 多选；写 'radio' 就是单选
          selectedRowKeys: selectedKeys, // 受控：当前选中哪些 key
          // onChange 的两个参数：新的 key 数组、以及对应的整行数据数组
          onChange: (keys, rows) => {
            setSelectedKeys(keys)
            console.log('选中的完整行数据：', rows) // 需要行内容时用第二个参数
          },
          // 可以按条件禁止某些行被选中
          getCheckboxProps: (record) => ({ disabled: record.name === '赵小美' }),
        }}
      />
    </Card>
  )
}`,
          },
          {
            type: 'list',
            title: '7.4 这一节的易错点',
            ordered: true,
            items: [
              '**不写 `rowKey`**：控制台报 `Each child in a list should have a unique "key"`，而且多选、编辑后刷新都会出错。**永远写 `rowKey="id"`**。',
              '**用数组下标当 `rowKey`**：删一行之后所有 key 都变了，选中状态和渲染都会乱。要用数据里真正唯一的字段。',
              '**操作列忘了写 `key`**：操作列没有 `dataIndex`，必须显式给 `key: \'action\'`，否则也会有 key 警告。',
              '**`render` 里用 `dataIndex` 的值去拿别的字段**：`render` 第一个参数只是这一列的值，要拿整行数据请用**第二个参数 `record`**。',
              '**`filters` 写了但没写 `onFilter`**：下拉能点，但筛选不生效。前端筛选这两个必须成对出现。',
              '**`fixed` 不配 `scroll`**：只写 `fixed="right"` 不会有任何效果，必须给 `Table` 加 `scroll={{ x: 900 }}`。',
              '**前端排序和后端排序混用**：`sorter` 给函数 = 前端排；给 `true` = 只出箭头，你要在 `onChange` 里带排序参数去请求接口。写混了会出现「点了没反应」。',
              '**列很多却不给 `width` 和 `ellipsis`**：表格会被内容撑得很难看。长文本列加 `ellipsis: true`。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '`columns`（`title` + `dataIndex` + `render`）+ `dataSource` + **`rowKey`（必写）**。`render(value, record)` 的 `record` 是整行数据，操作列靠它。排序 `sorter` 给比较函数，筛选 `filters` 必须配 `onFilter`，固定列 `fixed` 必须配 `scroll={{ x }}`，多选用 `rowSelection`（受控存 `selectedRowKeys`）。',
          },
        ],
      },
    },
    {
      id: 'antd-feedback',
      title: '反馈类组件：message、notification、Modal、Drawer、Popconfirm、Spin、Alert、Result、Progress',
      summary: '「告诉用户发生了什么」的一组组件；v6 里 message 和 Modal 一定要用 hook 版',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '按「打扰程度」从轻到重选：**`message`（一句话，2 秒消失）→ `notification`（右上角卡片，信息多）→ `Popconfirm`（就地小气泡确认）→ `Modal`（挡住整个页面，必须处理）**。加载态用 `Spin`（转圈）或 `Skeleton`（骨架屏）。**v6 里 `message` 必须用 `message.useMessage()` 这个 hook 版**，静态的 `message.success()` 会有 context 警告。',
          },
          {
            type: 'text',
            title: '8.1 为什么 v6 要用 hook 版：静态方法拿不到 context',
            body: '这是从 antd 5 开始就有的坑，到 v6 更严格了，一定要理解。\n\n你可能看过这种写法：\n\n```\nimport { message } from \'antd\'\nmessage.success(\'保存成功\')\n```\n\n它能用，但控制台会警告，而且有两个真实的问题：\n\n**① 拿不到 `ConfigProvider` 的配置。** 静态方法是在 React 组件树**外面**调用的（它自己临时创建了一棵新的 React 树），所以你在 `ConfigProvider` 里设的主色、中文语言包、暗黑主题，它一概不知道 —— 结果就是「整个页面是紫色主题，弹出来的提示还是蓝色」。\n\n**② 拿不到你自己的 Context。** 同理，Redux 的 store、你的主题 Context，在静态方法弹出的内容里都读不到。\n\n**正确的 hook 版写法固定三步**：\n\n```\nconst [messageApi, contextHolder] = message.useMessage()  // ① 拿 api 和占位节点\nreturn <div>{contextHolder} ...</div>                      // ② 把占位节点渲染进 JSX\nmessageApi.success(\'保存成功\')                              // ③ 用 api 弹提示\n```\n\n**第 ② 步最容易忘**：不渲染 `contextHolder`，调用 `messageApi.success()` 就一点反应都没有，也不报错。\n\n同样的规则适用于 `notification.useNotification()` 和 `Modal.useModal()`。如果一个页面同时要用三个，可以用更省事的 **`App` 组件 + `App.useApp()`**（第 11 节会讲）。',
          },
          {
            type: 'table',
            title: '8.2 五种「打断用户」的方式怎么选',
            intro: '选错了会很烦人：删除数据用 `message` 太轻，改个标题弹 `Modal` 太重。',
            headers: ['组件', '打扰程度', '适合什么', '关键 API'],
            rows: [
              ['`message`', '最轻，自动消失', '操作结果反馈：保存成功、复制成功', '`message.useMessage()`'],
              ['`notification`', '较轻，右上角卡片', '信息较多、需要标题+正文，或带操作按钮', '`notification.useNotification()`'],
              ['`Popconfirm`', '中，就地小气泡', '**单条数据的删除确认**（最推荐）', '`onConfirm` / `onCancel`'],
              ['`Modal`（受控）', '重，遮住页面', '装表单、装详情，需要用户填东西', '`open` + `onCancel`'],
              ['`Modal.useModal()`', '重，一次性确认框', '「确定要清空全部数据吗」这类严重操作', '`modal.confirm({...})`'],
              ['`Drawer`', '重，从侧边滑出', '内容比 Modal 多（长表单、详情面板）', '`open` + `onClose`'],
            ],
            note: '一条实践建议：**表格里单行的删除用 `Popconfirm`**（点了就地确认，不打断视线）；**批量删除、清空数据用 `Modal.confirm`**（更严重，值得打断）。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：message / notification / Popconfirm 三种提示',
            body: `import { Button, Space, message, notification, Popconfirm, Card, Divider } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

export default function Demo() {
  // v6 标准写法：hook 拿到 api + 占位节点
  const [messageApi, msgHolder] = message.useMessage()
  const [notifyApi, notifyHolder] = notification.useNotification()

  return (
    <Card size="small" title="三种提示">
      {msgHolder} {/* message 的挂载点 */}
      {notifyHolder} {/* notification 的挂载点，两个都要渲染 */}

      <Divider titlePlacement="left">message：一句话，自动消失</Divider>
      <Space wrap>
        <Button onClick={() => messageApi.success('保存成功')}>success</Button>
        <Button onClick={() => messageApi.error('网络异常，请重试')}>error</Button>
        <Button onClick={() => messageApi.warning('还有必填项没填')}>warning</Button>
        {/* 第二个参数是显示秒数，默认 3 秒 */}
        <Button onClick={() => messageApi.info('我会显示 5 秒', 5)}>显示 5 秒</Button>
      </Space>

      <Divider titlePlacement="left">notification：右上角卡片，信息更多</Divider>
      <Space wrap>
        <Button
          onClick={() => notifyApi.success({
            title: '导出完成', // v6 用 title（老版本叫 message，已废弃）
            description: '文件已生成，共 128 条数据，有效期 7 天。', // 正文
            placement: 'topRight', // 出现位置
            duration: 3, // 3 秒后自动关闭；写 0 表示不自动关
          })}
        >
          带标题和正文
        </Button>
        <Button
          onClick={() => notifyApi.warning({
            title: '存储空间不足',
            description: '剩余空间少于 10%，请及时清理。',
            actions: <Button size="small" type="primary">去清理</Button>, // v6 用 actions（老的 btn 已废弃）
            duration: 0, // 不自动消失，强制用户处理
          })}
        >
          带操作按钮
        </Button>
      </Space>

      <Divider titlePlacement="left">Popconfirm：就地确认，删除单条数据最合适</Divider>
      <Popconfirm
        title="确定要删除这条数据吗？" // 气泡标题
        description="删除后无法恢复。" // 补充说明（可选）
        okText="确定删除"
        okButtonProps={{ danger: true }} // 把确定按钮改成红色，强调危险
        onConfirm={() => messageApi.success('已删除')} // 点「确定」触发
        onCancel={() => messageApi.info('已取消')} // 点「取消」触发
      >
        {/* Popconfirm 包住谁，点谁就弹气泡 */}
        <Button danger icon={<DeleteOutlined />}>删除</Button>
      </Popconfirm>
    </Card>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：Modal 受控写法 + Modal.useModal 确认框 + Drawer',
            body: `import { Button, Space, Modal, Drawer, Input, Card, Divider, message } from 'antd'
import { useState } from 'react'

export default function Demo() {
  const [messageApi, msgHolder] = message.useMessage()
  const [modal, modalHolder] = Modal.useModal() // hook 版确认框：拿到 modal api + 占位节点
  const [open, setOpen] = useState<boolean>(false) // 受控 Modal 的开关
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false) // Drawer 的开关
  const [loading, setLoading] = useState<boolean>(false) // 「确定」按钮的加载态

  function handleOk() { // 点 Modal 的确定：模拟提交
    setLoading(true) // 按钮进入转圈状态
    setTimeout(() => { // 模拟 800ms 的请求
      setLoading(false)
      setOpen(false) // 提交完关闭弹窗
      messageApi.success('提交成功')
    }, 800)
  }

  return (
    <Card size="small" title="Modal 与 Drawer">
      {msgHolder}
      {modalHolder} {/* Modal.useModal 的挂载点，忘了写 modal.confirm 就没反应 */}
      <Divider titlePlacement="left">受控 Modal：里面要放表单就用这种</Divider>
      <Space>
        <Button type="primary" onClick={() => setOpen(true)}>打开弹窗</Button>
        <Button onClick={() => setDrawerOpen(true)}>打开抽屉</Button>
        {/* Modal.useModal 的一次性确认框：适合「严重且不可逆」的操作 */}
        <Button
          danger
          onClick={() => modal.confirm({
            title: '确定要清空全部数据吗？',
            content: '这个操作会删除所有记录，且无法恢复。',
            okText: '确定清空',
            okButtonProps: { danger: true },
            onOk: () => messageApi.success('已清空'), // 点确定后执行
          })}
        >
          清空全部（confirm）
        </Button>
      </Space>

      {/* Modal 的受控三件套：open 控制显示、onCancel 关闭、onOk 确定 */}
      <Modal
        title="新增用户" okText="提交" width={420}
        open={open} // v6 用 open（老版本的 visible 已经不能用了）
        onOk={handleOk}
        onCancel={() => setOpen(false)} // 点遮罩、点右上角 X、点取消都会走这里
        confirmLoading={loading} // 确定按钮的加载态，防止重复提交
        destroyOnHidden // v6 的新名字：关闭时销毁内部内容，避免表单里残留上次的值
      >
        <Input placeholder="随便输点什么，然后关闭再打开看看还在不在" />
      </Modal>

      {/* Drawer：内容比 Modal 多的时候用它，从右侧滑出 */}
      <Drawer
        title="用户详情"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)} // Drawer 用 onClose（不是 onCancel）
        size={320} // v6 用 size 指定宽度（老的 width 已废弃）
        placement="right" // 从哪一侧滑出：right / left / top / bottom
      >
        {/* 抽屉适合放「内容比较长」的东西：一整个详情面板、长表单 */}
        <p>它不像 Modal 那样把注意力全部锁死，用户还能看到左边的列表。</p>
      </Drawer>
    </Card>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：Spin vs Skeleton（切换开关对比两种加载态）',
            body: `import { Spin, Skeleton, Alert, Space, Card, Divider, Switch } from 'antd'
import { useState } from 'react'

export default function Demo() {
  const [loading, setLoading] = useState<boolean>(true) // 控制加载态演示

  return (
    <Card size="small" title="加载态">
      {/* 用开关切换 loading，直观对比「加载中」和「加载完」 */}
      <Switch checked={loading} onChange={setLoading} checkedChildren="加载中" unCheckedChildren="已加载" />

      <Divider titlePlacement="left">Spin：已有内容，只是在刷新</Divider>
      {/* Spin 包住内容：spinning 为真时在上面盖一层转圈遮罩 */}
      {/* v6 用 description 写提示文字（老版本的 tip 已废弃） */}
      <Spin spinning={loading} description="加载中…">
        <div style={{ padding: 12, background: '#fafafa', borderRadius: 6, minHeight: 48 }}>
          原来的内容还在，只是被蒙上了一层，用户知道「数据在刷新」
        </div>
      </Spin>

      <Divider titlePlacement="left">Skeleton：首次加载，还什么都没有</Divider>
      {/* Skeleton 用灰色占位条模拟内容轮廓，比转圈更不容易闪 */}
      {/* loading 为真时显示骨架，为假时显示 children */}
      <Skeleton loading={loading} active avatar paragraph={{ rows: 2 }}>
        <div style={{ padding: 12 }}>这是加载完成后真正的内容</div>
      </Skeleton>

      <Divider titlePlacement="left">Alert：常驻的提示条</Divider>
      <Space vertical size={8} style={{ width: '100%' }}>
        {/* v6 用 title（老版本叫 message，已废弃）；showIcon 在左边加图标 */}
        <Alert type="info" title="这是一条说明" description="Alert 是常驻的，不像 message 会自动消失。" showIcon />
        {/* closable 让用户能手动关掉 */}
        <Alert type="error" title="表单里有 2 处错误，请检查" showIcon closable />
      </Space>
    </Card>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：Progress 进度条 + Tooltip / Popover + Result',
            body: `import { Progress, Tooltip, Popover, Result, Button, Space, Card, Divider } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'

export default function Demo() {
  const [percent, setPercent] = useState<number>(30) // 进度百分比

  return (
    <Card size="small" title="进度与提示">
      <Divider titlePlacement="left">Progress：进度条</Divider>
      <Space vertical size={8} style={{ width: '100%' }}>
        <Progress percent={percent} /> {/* 默认是横向条形进度 */}
        <Space>
          <Progress type="circle" percent={percent} size={60} /> {/* type="circle" 变环形 */}
          <Space vertical>
            {/* Math.min / Math.max 保证不会超出 0-100 */}
            <Button size="small" onClick={() => setPercent((p) => Math.min(100, p + 20))}>+20%</Button>
            <Button size="small" onClick={() => setPercent((p) => Math.max(0, p - 20))}>-20%</Button>
          </Space>
        </Space>
      </Space>

      <Divider titlePlacement="left">Tooltip / Popover：悬停提示</Divider>
      <Space>
        {/* Tooltip 只能放纯文字，用于「解释这个按钮是干什么的」 */}
        <Tooltip title="这是一句简单的文字说明">
          <Button icon={<QuestionCircleOutlined />}>悬停看 Tooltip</Button>
        </Tooltip>
        {/* Popover 能放任意 JSX，还能有标题，适合放一小段富内容 */}
        <Popover title="Popover 有标题" content={<div style={{ fontSize: 12 }}>内容可以是<b>任意 JSX</b></div>}>
          <Button>悬停看 Popover</Button>
        </Popover>
      </Space>

      <Divider titlePlacement="left">Result：整页的结果反馈</Divider>
      {/* status 可选 success / error / info / warning / 404 / 403 / 500 */}
      <Result status="success" title="操作成功" subTitle="订单号 2024031200123" extra={<Button type="primary" size="small">返回列表</Button>} />
    </Card>
  )
}`,
          },
          {
            type: 'list',
            title: '8.3 这一节的易错点',
            ordered: true,
            items: [
              '**用静态 `message.success()`**：控制台会有 context 警告，而且读不到 `ConfigProvider` 的主题和语言。改用 `message.useMessage()`。',
              '**用了 hook 但忘了渲染 `contextHolder`**：调用 `messageApi.xxx()` 完全没反应，也不报错。**这是最常见的「提示不弹出来」原因**。',
              '**`Modal` 还在用 `visible`**：v6 里叫 `open`，写 `visible` 弹窗永远不显示。',
              '**`Modal` 里的表单残留上次的值**：加 `destroyOnHidden`（v6 的新名字，老名字 `destroyOnClose` 已废弃），关闭时销毁内容。',
              '**`Alert` / `notification` 还在用 `message` 属性**：v6 都改叫 `title` 了，老名字有废弃警告。',
              '**`Spin` 用 `tip`**：v6 改成了 `description`。',
              '**`Drawer` 写 `onCancel`**：Drawer 的关闭回调叫 `onClose`，不是 `onCancel`；宽度在 v6 里也从 `width` 改成了 `size`。',
              '**什么操作都弹 `Modal.confirm`**：删一行数据就把整个屏幕挡住太重了，单条删除用 `Popconfirm`。',
              '**`Popconfirm` 里的按钮自己又写了 `onClick`**：确认逻辑要写在 `Popconfirm` 的 `onConfirm` 上，写在子按钮的 `onClick` 上会「还没确认就执行了」。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '轻提示 `message`（**hook 版 + 渲染 `contextHolder`**）、多信息 `notification`（用 `title` 不用 `message`）、单条删除 `Popconfirm`、要填东西 `Modal`（`open` + `destroyOnHidden`）、内容长用 `Drawer`（`onClose`）、严重操作 `Modal.useModal().confirm`。有内容在刷新用 `Spin`（`description`），首次加载用 `Skeleton`。',
          },
        ],
      },
    },
    {
      id: 'antd-nav',
      title: '导航类组件：Menu、Tabs、Breadcrumb、Steps、Pagination、Dropdown、Segmented',
      summary: '导航组件的共同套路是「items 数组 + 受控的当前选中值」；再讲怎么和 react-router 配合',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '导航类组件在 v6 里几乎都统一成了同一个套路：**`items` 数组描述有哪些项 + 一个受控属性表示「现在选中谁」**（`Menu` 是 `selectedKeys`、`Tabs` 是 `activeKey`、`Steps` 是 `current`）。**不要再写 `<Menu.Item>`、`<Tabs.TabPane>` 这种子元素写法了**，v6 已经废弃。',
          },
          {
            type: 'text',
            title: '9.1 是什么：七个组件各自的用途',
            body: '- **`Menu`**：主导航。侧边栏（`mode="inline"`）或顶部栏（`mode="horizontal"`），支持多级子菜单。\n- **`Tabs`**：同一个页面内切换几块内容，**不改变 URL**（比如「基本信息 / 权限设置 / 操作日志」）。\n- **`Breadcrumb`**：面包屑，告诉用户「我现在在哪、怎么回去」，常见于「首页 / 用户管理 / 用户详情」。\n- **`Steps`**：多步骤流程的进度指示（填写信息 → 确认订单 → 完成付款）。\n- **`Pagination`**：独立的分页器。**注意：`Table` 自带分页，不需要额外配它**，只在自己手写列表时才用。\n- **`Dropdown`**：点击或悬停弹出一组操作，用于「更多操作」这种放不下的按钮。\n- **`Segmented`**：分段控制器，视觉上像一排连在一起的按钮。适合「切换视图」（列表/网格）这类少量互斥选项。\n\n关于 `Tabs` 和 `Menu` 的区别，一句话：**`Menu` 换页面（改 URL），`Tabs` 换的是同一个页面里的一块内容（不改 URL）**。当然你也可以让 Tabs 同步到 URL 参数，但那是额外做的。',
          },
          {
            type: 'table',
            title: '9.2 导航组件属性速查',
            intro: '注意每个组件「表示当前选中」的属性名都不一样，这是最容易记混的地方。',
            headers: ['组件', '数据属性', '「当前选中」属性', '其它常用属性'],
            rows: [
              ['`Menu`', '`items`（`{ key, label, icon, children }`）', '`selectedKeys`（**数组**）', '`mode`（`inline`/`horizontal`）、`theme`、`openKeys`、`onClick`'],
              ['`Tabs`', '`items`（`{ key, label, children }`）', '`activeKey`（字符串）', '`onChange`、`type="card"`、`tabPlacement`、`destroyOnHidden`'],
              ['`Breadcrumb`', '`items`（`{ title, href }`）', '（无，最后一项就是当前）', '`separator`'],
              ['`Steps`', '`items`（`{ title, content }`）', '`current`（**数字下标**）', '`orientation`、`status`、`size="small"`'],
              ['`Pagination`', '（无，靠 `total`）', '`current`（页码）', '`total`、`pageSize`、`onChange`、`showSizeChanger`'],
              ['`Dropdown`', '`menu={{ items }}`', '（无）', '`trigger={[\'click\']}`、`placement`'],
              ['`Segmented`', '`options`（`{ value, label }`）', '`value`', '`onChange`、`block`、`size`'],
            ],
            note: '几个 v6 的改名要记住：`Steps` 的每项用 **`content`**（不是 `description`）、方向用 **`orientation`**（不是 `direction`）；`Tabs` 的位置用 **`tabPlacement`**（不是 `tabPosition`）；`Dropdown` 用 **`menu={{ items }}`**（不是 `overlay`）。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：Menu（含子菜单）+ Breadcrumb',
            body: `import { Menu, Breadcrumb, Card, Typography, Divider } from 'antd'
import { HomeOutlined, TeamOutlined, SettingOutlined, BarChartOutlined } from '@ant-design/icons'
import { useState } from 'react'

// items 里嵌 children 就是二级子菜单；每项的 key 必须唯一
const items = [
  { key: 'home', icon: <HomeOutlined />, label: '首页' },
  {
    key: 'user',
    icon: <TeamOutlined />,
    label: '用户管理', // 有 children 的项本身不可选中，点它只会展开/收起
    children: [
      { key: 'user-list', label: '用户列表' },
      { key: 'user-role', label: '角色权限' },
    ],
  },
  { key: 'report', icon: <BarChartOutlined />, label: '数据报表' },
  { key: 'setting', icon: <SettingOutlined />, label: '系统设置' },
]

// 把 key 映射成中文名，用来拼面包屑（真实项目里通常从路由配置里读）
const nameMap: Record<string, string> = {
  home: '首页',
  'user-list': '用户列表',
  'user-role': '角色权限',
  report: '数据报表',
  setting: '系统设置',
}

export default function Demo() {
  const [current, setCurrent] = useState<string>('user-list') // 当前选中的菜单 key
  const [openKeys, setOpenKeys] = useState<string[]>(['user']) // 当前展开的子菜单

  return (
    <Card size="small" title="Menu + Breadcrumb">
      {/* Breadcrumb 用 items 数组，每项是 { title }；最后一项代表当前位置 */}
      <Breadcrumb
        items={[
          { title: <HomeOutlined /> }, // title 可以是图标
          { title: '控制台' },
          { title: nameMap[current] || current }, // 当前页面名字随菜单联动
        ]}
      />

      <Divider style={{ margin: '12px 0' }} />

      <div style={{ display: 'flex', gap: 12 }}>
        <Menu
          mode="inline" // inline = 竖向可折叠菜单（侧边栏用）
          items={items}
          style={{ width: 180, borderRadius: 8 }}
          selectedKeys={[current]} // 受控高亮，注意是数组
          openKeys={openKeys} // 受控展开的子菜单
          onOpenChange={(keys) => setOpenKeys(keys)} // 用户展开/收起时同步 state
          onClick={(e) => setCurrent(e.key)} // e.key 就是被点击那一项的 key
        />
        <div style={{ flex: 1, padding: 12, background: '#fafafa', borderRadius: 8 }}>
          <Typography.Text>当前选中的 key：<Typography.Text code>{current}</Typography.Text></Typography.Text>
        </div>
      </div>
    </Card>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：Tabs + Segmented + Dropdown',
            body: `import { Tabs, Segmented, Dropdown, Button, Card, Divider, Space, Typography, message } from 'antd'
import { AppstoreOutlined, BarsOutlined, MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'

export default function Demo() {
  const [messageApi, contextHolder] = message.useMessage()
  const [view, setView] = useState<string>('list') // Segmented 当前值

  // Tabs 用 items 数组：children 就是这个标签页对应的内容
  const tabItems = [
    { key: 'basic', label: '基本信息', children: <div style={{ padding: 8 }}>这里是基本信息表单</div> },
    { key: 'auth', label: '权限设置', children: <div style={{ padding: 8 }}>这里是权限配置</div> },
    { key: 'log', label: '操作日志', children: <div style={{ padding: 8 }}>这里是历史操作记录</div> },
  ]

  // Dropdown 的菜单项；danger: true 会把这一项变成红色
  const menuItems = [
    { key: 'edit', icon: <EditOutlined />, label: '编辑' },
    { key: 'copy', label: '复制链接' },
    { type: 'divider' as const }, // 分割线，用 as const 让类型对得上
    { key: 'delete', icon: <DeleteOutlined />, label: '删除', danger: true },
  ]

  return (
    <Card size="small" title="Tabs / Segmented / Dropdown">
      {contextHolder}

      <Divider titlePlacement="left">Tabs：同一页面内切换内容</Divider>
      {/* v6 必须用 items，不能再写 <Tabs.TabPane> */}
      <Tabs items={tabItems} defaultActiveKey="basic" size="small" />

      <Divider titlePlacement="left">Segmented：切换视图</Divider>
      <Space>
        <Segmented
          value={view}
          onChange={(v) => setView(v as string)} // onChange 直接给值（不是事件对象）
          options={[
            { value: 'list', label: '列表', icon: <BarsOutlined /> },
            { value: 'grid', label: '网格', icon: <AppstoreOutlined /> },
          ]}
        />
        <Typography.Text type="secondary" style={{ fontSize: 12 }}>当前视图：{view}</Typography.Text>
      </Space>

      <Divider titlePlacement="left">Dropdown：放不下的「更多操作」</Divider>
      <Space>
        <Dropdown
          menu={{ items: menuItems, onClick: (e) => messageApi.info('点了：' + e.key) }} // v6 用 menu={{ items }}
          trigger={['click']} // 默认是悬停触发，改成点击更适合操作菜单
        >
          <Button icon={<MoreOutlined />}>更多操作</Button>
        </Dropdown>
      </Space>
    </Card>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：Steps 步骤条 + Pagination 分页器',
            body: `import { Steps, Button, Space, Card, Divider, Pagination, Typography } from 'antd'
import { useState } from 'react'

// Steps 的每项：v6 用 content 描述细节（老版本叫 description，已废弃）
const steps = [
  { title: '填写信息', content: '录入收货地址和联系方式' },
  { title: '确认订单', content: '核对商品和金额' },
  { title: '完成支付', content: '选择支付方式并付款' },
]

export default function Demo() {
  const [current, setCurrent] = useState<number>(0) // 当前第几步，注意是数字下标（从 0 开始）
  const [page, setPage] = useState<number>(1) // 当前页码，注意是从 1 开始
  const [pageSize, setPageSize] = useState<number>(10) // 每页条数

  return (
    <Card size="small" title="Steps 与 Pagination">
      <Divider titlePlacement="left">Steps：多步骤流程</Divider>
      {/* current 表示走到第几步；size="small" 更紧凑 */}
      <Steps current={current} items={steps} size="small" />

      <div style={{ margin: '12px 0', padding: 12, background: '#fafafa', borderRadius: 6, fontSize: 13 }}>
        第 {current + 1} 步：{steps[current].content} {/* 下标从 0 开始，展示给人看要 +1 */}
      </div>

      <Space>
        {/* 第一步时禁用「上一步」 */}
        <Button disabled={current === 0} onClick={() => setCurrent(current - 1)}>上一步</Button>
        {/* 最后一步时禁用「下一步」 */}
        <Button type="primary" disabled={current === steps.length - 1} onClick={() => setCurrent(current + 1)}>
          下一步
        </Button>
      </Space>

      <Divider titlePlacement="left">Pagination：自己手写列表时才需要</Divider>
      <Pagination
        current={page} // 当前页码（从 1 开始）
        pageSize={pageSize} // 每页多少条
        total={87} // 总条数，由后端返回
        showSizeChanger // 显示「每页几条」下拉
        showQuickJumper // 显示「跳至第几页」输入框
        size="small"
        showTotal={(total, range) => '第 ' + range[0] + '-' + range[1] + ' 条 / 共 ' + total + ' 条'}
        onChange={(p, size) => { // 页码或每页条数变化时触发
          setPage(p)
          setPageSize(size)
        }}
      />
      <Typography.Paragraph type="secondary" style={{ fontSize: 12, marginTop: 8, marginBottom: 0 }}>
        真实项目里，onChange 里要拿着新的页码去重新请求接口。用 Table 的话它自带分页，不用另外放 Pagination。
      </Typography.Paragraph>
    </Card>
  )
}`,
          },
          {
            type: 'text',
            title: '9.3 怎么和 react-router 配合（重点）',
            body: '`Menu` 自己只管「哪一项高亮」，它**不会帮你跳转路由**。跳转要你自己接上 react-router，套路固定两步：\n\n**① 点菜单 → 跳路由**：用 `useNavigate()` 拿到 `navigate` 函数，在 `Menu` 的 `onClick` 里 `navigate(e.key)`。所以**菜单项的 `key` 直接写成路由路径**（比如 `key: \'/users\'`）最省事。\n\n**② 路由变了 → 菜单高亮**：用 `useLocation()` 拿到当前 `pathname`，赋值给 `selectedKeys`。\n\n为什么第 ② 步必须做？因为用户可能**直接在地址栏输入 URL**、或者**点浏览器的前进后退**。这时菜单的 `onClick` 根本没被触发，如果你把「当前选中」存在自己的 `useState` 里，菜单高亮就会和实际页面不一致。\n\n**结论：不要用 `useState` 存当前菜单，要以 URL 为唯一数据源**（`useLocation` 读出来）。这是「单一数据源」原则在导航上的体现。\n\n下面这段是静态代码——因为本页的实时预览环境不允许 `import \'react-router-dom\'`，只能这样展示。',
          },
          {
            type: 'code',
            title: '9.4 `Menu` + `useNavigate` / `useLocation` 的标准写法（静态代码）',
            language: 'tsx',
            body: `import { Layout, Menu, Breadcrumb } from 'antd'
import { HomeOutlined, TeamOutlined } from '@ant-design/icons'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'

const { Sider, Content } = Layout

// 关键技巧：把菜单项的 key 直接写成路由路径，onClick 里就能直接 navigate(e.key)
const menuItems = [
  { key: '/', icon: <HomeOutlined />, label: '首页' },
  { key: '/users', icon: <TeamOutlined />, label: '用户管理' },
  { key: '/settings', label: '系统设置' },
]

export default function AdminLayout() {
  const navigate = useNavigate() // 用来跳转路由
  const location = useLocation() // 用来读当前 URL

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          // ② 高亮以 URL 为准：地址栏直接输入、浏览器前进后退时也能同步
          selectedKeys={[location.pathname]}
          // ① 点击就跳转：因为 key 就是路径，直接传给 navigate 即可
          onClick={(e) => navigate(e.key)}
        />
      </Sider>

      <Layout>
        <Content style={{ margin: 16 }}>
          {/* 面包屑也能从 pathname 推导出来 */}
          <Breadcrumb
            style={{ marginBottom: 12 }}
            items={[
              { title: '首页' },
              { title: menuItems.find((m) => m.key === location.pathname)?.label ?? '当前页' },
            ]}
          />
          {/* Outlet 是子路由的渲染出口：切页面时头部和侧边栏不会重新挂载 */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

// 常见变体：路由是 /users/123 这种详情页时，selectedKeys 要「取前缀」而不是全等匹配，例如：
// const activeKey = menuItems.find((m) => location.pathname.startsWith(m.key) && m.key !== '/')?.key ?? '/'
// selectedKeys={[activeKey]}`,
          },
          {
            type: 'list',
            title: '9.5 这一节的易错点',
            ordered: true,
            items: [
              '**还在用 `<Menu.Item>` / `<Tabs.TabPane>`**：v6 已废弃，全部改成 `items` 数组。',
              '**`selectedKeys` 传了字符串**：`Menu` 的 `selectedKeys` 是**数组**，要写 `selectedKeys={[current]}`。',
              '**`Steps` 的 `current` 当成「第几步（从 1 开始）」**：它是**数组下标，从 0 开始**。显示给用户看要 `current + 1`。',
              '**`Steps` 每项用 `description`**：v6 改叫 `content`，方向属性 `direction` 改叫 `orientation`。',
              '**用 `useState` 存当前菜单**：地址栏直接输入 URL 或点浏览器后退时高亮会错位。要用 `useLocation().pathname`。',
              '**`Dropdown` 用 `overlay`**：v6 改成 `menu={{ items }}`。',
              '**在 `Table` 旁边又放一个 `Pagination`**：`Table` 自带分页，会出现两个分页器。要么用 `Table` 的 `pagination`，要么 `pagination={false}` 后自己放。',
              '**子菜单的父项也想被选中**：有 `children` 的菜单项是「分组」，本身不可选中，点它只会展开。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '导航组件统一是 **`items` 数组 + 受控的当前值**：`Menu` 用 `selectedKeys`（数组）、`Tabs` 用 `activeKey`、`Steps` 用 `current`（下标从 0）、`Segmented` 用 `value`。和路由配合的口诀：**菜单 `key` 写成路由路径，`onClick` 里 `navigate(e.key)`，`selectedKeys` 从 `useLocation().pathname` 来**。',
          },
        ],
      },
    },
    {
      id: 'antd-crud-case',
      title: '综合案例：完整的「用户管理」CRUD 页面',
      summary: '把 Table + 搜索表单 + 新增/编辑弹窗 + 删除确认 + message + loading 串成一个真实页面',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '一个后台 CRUD 页面永远是这五块：**① 顶部搜索表单**（`Form layout="inline"`）**② 中间数据表格**（`Table` + `loading`）**③ 新增/编辑弹窗**（`Modal` + `Form`）**④ 删除确认**（`Popconfirm`）**⑤ 结果提示**（`message`）。学会这一节，你就能独立写后台页面了。',
          },
          {
            type: 'text',
            title: '10.1 先想清楚：这个页面需要哪些 state',
            body: '写 CRUD 页面最容易乱的地方是 state 太多、互相纠缠。所以动手前先列清单，**每个 state 只负责一件事**：\n\n- **`list`**：表格数据（真实项目里来自接口，这里用组件内数组模拟）\n- **`loading`**：是否正在请求，控制表格的加载遮罩\n- **`open`**：新增/编辑弹窗是否打开\n- **`editing`**：**当前正在编辑哪一条**。这是最关键的一个设计：\n  - `editing === null` → 弹窗是「新增」模式，表单要清空\n  - `editing` 是某个用户对象 → 弹窗是「编辑」模式，表单要回填这个对象\n  - 这样一个弹窗就同时服务了新增和编辑两种场景，不用写两个 Modal\n- **`saving`**：弹窗的「确定」按钮是否在提交中，防重复提交\n\n还有两个不是 `useState` 的「状态持有者」：\n\n- **`searchForm`**（`Form.useForm()`）：搜索条件由 `Form` 自己托管，不需要我们建 state\n- **`form`**（`Form.useForm()`）：弹窗里的表单同理',
          },
          {
            type: 'text',
            title: '10.2 编辑弹窗最容易踩的两个坑',
            body: '**坑一：弹窗关掉再打开，上次填的内容还在。**\n\n原因是 `Modal` 默认只是把内容**藏起来**（`display: none`），DOM 和 React 状态都还活着，所以表单里的值也还在。解决办法是给 `Modal` 加 **`destroyOnHidden`**（v6 的新名字，老名字是 `destroyOnClose`），关闭时把内部内容整个销毁。\n\n**坑二：点「编辑」，表单里是空的。**\n\n这是因为回填时机错了。很多人写：\n\n```\nsetEditing(record)\nform.setFieldsValue(record)   // ❌ 此时表单可能还没渲染出来\n```\n\n配了 `destroyOnHidden` 之后，弹窗关闭时表单控件是不存在的，所以在「打开弹窗的那一瞬间」立刻 `setFieldsValue`，可能作用在一个还没挂载的表单上，值就丢了。\n\n**正确做法：用 `useEffect` 在「弹窗已经打开」之后再回填。**\n\n```\nuseEffect(() => {\n  if (!open) return                        // 没打开就什么都不做\n  if (editing) form.setFieldsValue(editing) // 编辑：回填数据\n  else form.resetFields()                   // 新增：清空表单\n}, [open, editing])\n```\n\n`useEffect` 在**渲染完成之后**才执行，此时表单已经挂载好了，`setFieldsValue` 一定生效。这个模式请直接背下来，后台开发天天用。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：完整的用户管理页面（增删改查全都能点）',
            body: `import { Table, Form, Input, Select, Button, Space, Modal, Popconfirm, message, Tag, Card } from 'antd'
import type { TableColumnsType } from 'antd'
import { PlusOutlined, SearchOutlined, ReloadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

interface User { id: number; name: string; dept: string; status: 'active' | 'off' } // 一条用户数据

const seed: User[] = [ // 模拟「数据库」里的初始数据
  { id: 1, name: '张小明', dept: '技术部', status: 'active' },
  { id: 2, name: '李小红', dept: '设计部', status: 'active' },
  { id: 3, name: '王小刚', dept: '技术部', status: 'off' },
]

// 部门选项：搜索栏和弹窗表单共用一份，避免两处写重复
const depts = [{ value: '技术部', label: '技术部' }, { value: '设计部', label: '设计部' }, { value: '市场部', label: '市场部' }]

export default function Demo() {
  const [messageApi, contextHolder] = message.useMessage() // v6 的 hook 版消息提示
  const [list, setList] = useState<User[]>(seed) // 全部数据（真实项目里来自接口）
  const [query, setQuery] = useState<{ keyword?: string; dept?: string }>({}) // 已生效的搜索条件
  const [loading, setLoading] = useState<boolean>(false) // 表格加载遮罩
  const [open, setOpen] = useState<boolean>(false) // 弹窗开关
  const [editing, setEditing] = useState<User | null>(null) // null=新增；对象=正在编辑那一条
  const [saving, setSaving] = useState<boolean>(false) // 弹窗「保存」按钮的加载态
  const [searchForm] = Form.useForm() // 搜索表单实例（为了能重置）
  const [form] = Form.useForm<User>() // 弹窗表单实例（为了能回填和校验）

  // 按搜索条件算出表格真正要展示的数据（真实项目里这一步在后端做）
  const view = list.filter((u) => (!query.keyword || u.name.includes(query.keyword)) && (!query.dept || u.dept === query.dept))

  // 关键模式：等弹窗「已经打开」之后再回填，保证表单控件已经挂载
  useEffect(() => {
    if (!open) return // 没打开就什么都不做
    if (editing) form.setFieldsValue(editing) // 编辑：把这一行的数据填进表单
    else form.resetFields() // 新增：清空成初始状态
  }, [open, editing])

  function handleSearch(v: { keyword?: string; dept?: string }) { // 点「查询」
    setLoading(true) // 进加载态
    // 用定时器模拟 600ms 的网络延迟，之后让搜索条件生效
    setTimeout(() => { setQuery({ keyword: (v.keyword || '').trim(), dept: v.dept }); setLoading(false) }, 600)
  }

  async function handleSave() { // 弹窗点「保存」：先校验，再提交
    let values: User
    // validateFields 校验不通过会 reject，此时错误已经画在表单上了，直接 return
    try { values = await form.validateFields() } catch { return }
    setSaving(true) // 按钮转圈，防止重复提交
    setTimeout(() => { // 模拟保存接口
      setList((prev) => (editing
        ? prev.map((u) => (u.id === editing.id ? { ...u, ...values } : u)) // 编辑：替换同 id 那条
        : [...prev, { ...values, id: Date.now() }])) // 新增：追加一条，用时间戳当 id
      setSaving(false)
      setOpen(false) // 关闭弹窗
      messageApi.success(editing ? '修改成功' : '新增成功')
    }, 600)
  }

  function handleDelete(id: number) { // 删除一条：过滤掉这个 id
    setList((prev) => prev.filter((u) => u.id !== id))
    messageApi.success('删除成功')
  }

  const columns: TableColumnsType<User> = [
    { title: '姓名', dataIndex: 'name', width: 100 },
    { title: '部门', dataIndex: 'dept', width: 100 },
    // render 把 'active' / 'off' 渲染成中文彩色标签
    { title: '状态', dataIndex: 'status', width: 80, render: (v: User['status']) => <Tag color={v === 'active' ? 'success' : 'default'}>{v === 'active' ? '在职' : '离职'}</Tag> },
    {
      title: '操作', key: 'action', width: 130, // 操作列没有 dataIndex，必须自己给 key
      render: (_, record) => ( // record 是整行数据，编辑和删除全靠它
        <Space size={0}>
          {/* 先记下要编辑的对象，再打开弹窗 */}
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => { setEditing(record); setOpen(true) }}>编辑</Button>
          {/* 单条删除用 Popconfirm 就地确认，不打断视线 */}
          <Popconfirm title="确定删除吗？" okText="删除" okButtonProps={{ danger: true }} onConfirm={() => handleDelete(record.id)}>
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Card
      size="small"
      title="用户管理"
      // 新增：把 editing 置为 null，同一个弹窗就变成「新增」模式
      extra={<Button type="primary" size="small" icon={<PlusOutlined />} onClick={() => { setEditing(null); setOpen(true) }}>新增用户</Button>}
    >
      {contextHolder} {/* message 的挂载点，忘写就没有提示 */}

      {/* ① 搜索栏：layout="inline" 让条件挤在一行；条件由 Form 托管，不用自己建 state */}
      <Form form={searchForm} layout="inline" onFinish={handleSearch} style={{ marginBottom: 12 }}>
        <Form.Item name="keyword"><Input placeholder="按姓名搜索" allowClear style={{ width: 140 }} /></Form.Item>
        <Form.Item name="dept"><Select placeholder="部门" allowClear options={depts} style={{ width: 110 }} /></Form.Item>
        <Form.Item>
          <Space>
            {/* 表单里的提交按钮必须写 htmlType="submit" */}
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>查询</Button>
            {/* 重置：清空表单 + 清空已生效的条件 */}
            <Button icon={<ReloadOutlined />} onClick={() => { searchForm.resetFields(); setQuery({}) }}>重置</Button>
          </Space>
        </Form.Item>
      </Form>

      {/* ② 表格：rowKey 必写，loading 显示请求中 */}
      <Table rowKey="id" columns={columns} dataSource={view} size="small" loading={loading} pagination={{ pageSize: 5 }} />

      {/* ③ 新增和编辑共用一个弹窗：标题和行为都由 editing 是否为 null 决定 */}
      <Modal
        title={editing ? '编辑用户' : '新增用户'}
        open={open} onOk={handleSave} onCancel={() => setOpen(false)} okText="保存" width={400}
        confirmLoading={saving} // 保存中：按钮转圈且不可重复点
        destroyOnHidden // 关闭时销毁内容，避免下次打开还留着上次的输入
      >
        <Form form={form} layout="vertical" initialValues={{ status: 'active' }}>
          <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }, { max: 10, message: '最多 10 个字' }]}><Input placeholder="请输入姓名" /></Form.Item>
          <Form.Item name="dept" label="部门" rules={[{ required: true, message: '请选择部门' }]}><Select placeholder="请选择部门" options={depts} /></Form.Item>
          <Form.Item name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}><Select options={[{ value: 'active', label: '在职' }, { value: 'off', label: '离职' }]} /></Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：亲手体验「弹窗残留」这个坑（左右对比）',
            body: `import { Button, Modal, Form, Input, Space, Card, Typography } from 'antd'
import { useState } from 'react'

export default function Demo() {
  const [badOpen, setBadOpen] = useState<boolean>(false) // 错误示范的弹窗开关
  const [goodOpen, setGoodOpen] = useState<boolean>(false) // 正确示范的弹窗开关

  return (
    <Card size="small" title="destroyOnHidden 的作用">
      <Typography.Paragraph style={{ fontSize: 13 }}>
        操作步骤：打开弹窗 → 随便输点字 → 点「取消」关闭 → 再打开。看两边的差别。
      </Typography.Paragraph>

      <Space>
        <Button danger onClick={() => setBadOpen(true)}>打开「会残留」的弹窗</Button>
        <Button type="primary" onClick={() => setGoodOpen(true)}>打开「不残留」的弹窗</Button>
      </Space>

      {/* ❌ 错误示范：没有 destroyOnHidden，关闭只是隐藏，输入的内容还活着 */}
      <Modal
        title="❌ 没加 destroyOnHidden"
        open={badOpen}
        onCancel={() => setBadOpen(false)}
        onOk={() => setBadOpen(false)}
        width={360}
      >
        <Form layout="vertical">
          <Form.Item name="note" label="随便输点字，然后关闭再打开">
            <Input placeholder="上次输的内容还会在这里" />
          </Form.Item>
        </Form>
      </Modal>

      {/* ✅ 正确示范：加了 destroyOnHidden，关闭时内部内容整个销毁 */}
      <Modal
        title="✅ 加了 destroyOnHidden"
        open={goodOpen}
        onCancel={() => setGoodOpen(false)}
        onOk={() => setGoodOpen(false)}
        destroyOnHidden // 关键就是这一行
        width={360}
      >
        <Form layout="vertical">
          <Form.Item name="note" label="随便输点字，然后关闭再打开">
            <Input placeholder="再打开时一定是空的" />
          </Form.Item>
        </Form>
      </Modal>

      <Typography.Paragraph type="secondary" style={{ fontSize: 12, marginTop: 12, marginBottom: 0 }}>
        Drawer 也有同样的问题和同样的解法：加 destroyOnHidden。
      </Typography.Paragraph>
    </Card>
  )
}`,
          },
          {
            type: 'list',
            title: '10.3 这个案例里值得记住的套路',
            intro: '这些不是 antd 的 API，而是「后台页面怎么写」的经验，换成别的组件库也一样适用：',
            ordered: true,
            items: [
              '**一个弹窗服务新增和编辑两种场景**：用 `editing` 是否为 `null` 区分，省掉一半代码。',
              '**回填放在 `useEffect` 里**，依赖 `[open, editing]`，保证表单已挂载再 `setFieldsValue`。',
              '**`Modal` 一定加 `destroyOnHidden`**，否则下次打开会残留上次的输入。',
              '**保存按钮用 `confirmLoading`**，请求期间不可重复点，这是最常见的重复提交防线。',
              '**`await form.validateFields()` 一定包 `try/catch`**，校验失败会 reject。',
              '**搜索条件不要自己建 state**，交给 `Form` 托管，重置就是 `searchForm.resetFields()`。',
              '**单条删除用 `Popconfirm`，批量删除用 `Modal.confirm`**，打扰程度和操作严重程度匹配。',
              '**操作成功后要给 `message` 反馈**，否则用户不知道到底成没成。',
              '**真实项目里，保存/删除成功后应该重新请求列表**（而不是像 Demo 里手动改本地数组），这样才能拿到后端计算出的最新数据。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'CRUD 页面五件套：**inline 搜索表单 + Table（`rowKey` + `loading`）+ Modal 表单（`destroyOnHidden` + `useEffect` 回填 + `confirmLoading`）+ Popconfirm 删除 + message 反馈**。用一个 `editing` state 同时表达「新增还是编辑」。',
          },
        ],
      },
    },
    {
      id: 'antd-theme',
      title: '主题定制：token、components、暗黑模式与 App 组件',
      summary: '改一个 colorPrimary 全站变色；theme.components 精确覆盖单个组件；darkAlgorithm 一键暗黑',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '主题定制全部通过 `ConfigProvider` 的 `theme` 属性完成，它只有三个字段：**`token`（全局变量，如主色、圆角、字号）、`components`（只改某个组件）、`algorithm`（换整套配色算法，暗黑模式就靠它）**。改完立刻生效，不用重新编译。',
          },
          {
            type: 'text',
            title: '11.1 是什么：设计变量（Design Token）',
            body: 'antd 5/6 把所有视觉细节抽成了几百个**变量**，官方叫 Design Token。它们分三层：\n\n**① Seed Token（种子变量）**：最源头的少数几个，比如 `colorPrimary`（主色）、`borderRadius`（圆角）、`fontSize`（基础字号）。**你平时只需要改这一层。**\n\n**② Map Token（派生变量）**：由算法从种子变量算出来的一批，比如主色的 hover 态、浅色背景、边框色。改了 `colorPrimary`，这一层会**自动全部重算**——所以你只改一个色号，按钮的悬停色、Switch 的底色、Slider 的轨道色就全都跟着变了。\n\n**③ Alias Token（别名变量）**：给具体场景用的最终变量，比如 `colorBgContainer`（容器背景色）。\n\n这就是为什么 antd 5/6 的换肤这么轻松：**你动源头，剩下的它自己算。**\n\n最常用的几个 token：\n\n- `colorPrimary`：主色，影响面最大\n- `borderRadius`：圆角，改成 `0` 立刻变「硬朗风」，改成 `16` 变「圆润风」\n- `fontSize`：基础字号（默认 14）\n- `colorSuccess` / `colorWarning` / `colorError`：语义色\n- `controlHeight`：控件高度（默认 32），影响按钮、输入框等所有「一行高」的控件',
          },
          {
            type: 'table',
            title: '11.2 `theme` 的三个字段',
            intro: '弄清这三个的分工，主题定制就没有难点了。',
            headers: ['字段', '类型', '作用范围', '例子'],
            rows: [
              ['`theme.token`', '对象', '**全局**：所有组件一起变', '`{ colorPrimary: \'#722ed1\', borderRadius: 8 }`'],
              ['`theme.components`', '对象（按组件名分组）', '**局部**：只改指定组件，优先级高于 `token`', '`{ Button: { controlHeight: 40 }, Table: { headerBg: \'#f0f5ff\' } }`'],
              ['`theme.algorithm`', '函数或函数数组', '换整套配色算法', '`theme.darkAlgorithm`；数组可组合'],
              ['`theme.cssVar`', '`boolean`', '用 CSS 变量输出样式，切主题更快', '`true`（大型项目可开）'],
              ['`theme.inherit`', '`boolean`', '嵌套 `ConfigProvider` 时是否继承外层主题', '默认 `true`'],
            ],
            note: '`algorithm` 可以传数组来组合，比如 `[theme.darkAlgorithm, theme.compactAlgorithm]` 就是「暗黑 + 紧凑」。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：token 全局改 vs components 局部改',
            body: `import { ConfigProvider, Button, Space, Input, Card, Slider, Divider, Segmented } from 'antd'
import { useState } from 'react'

export default function Demo() {
  const [radius, setRadius] = useState<number>(6) // 圆角大小
  const [color, setColor] = useState<string>('#1677ff') // 主色

  return (
    <div>
      <Space vertical size={8} style={{ width: '100%', marginBottom: 12 }}>
        <Space>
          <span style={{ fontSize: 12 }}>主色：</span>
          <Segmented
            value={color}
            onChange={(v) => setColor(v as string)}
            size="small"
            options={[
              { value: '#1677ff', label: '蓝' },
              { value: '#722ed1', label: '紫' },
              { value: '#fa541c', label: '橙' },
            ]}
          />
        </Space>
        <Space style={{ width: '100%' }}>
          <span style={{ fontSize: 12, whiteSpace: 'nowrap' }}>圆角 {radius}px：</span>
          {/* 拖动滑块实时改 borderRadius，能直观看到 token 的影响面 */}
          <Slider min={0} max={20} value={radius} onChange={setRadius} style={{ width: 160 }} />
        </Space>
      </Space>

      <ConfigProvider
        theme={{
          // ① token：全局变量，所有组件一起变
          token: { colorPrimary: color, borderRadius: radius },
          // ② components：只改指定组件，优先级比 token 高
          components: {
            Button: { controlHeight: 40 }, // 只把按钮变高（输入框不受影响）
            Input: { colorBorder: '#faad14' }, // 只把输入框的边框改成橙色
          },
        }}
      >
        <Card title="ConfigProvider 包住的区域" size="small">
          <Space vertical size={10} style={{ width: '100%' }}>
            <Space>
              <Button type="primary">主按钮（被 components 改高了）</Button>
              <Button>次按钮</Button>
            </Space>
            {/* 输入框高度没变（因为 components 只改了 Button），但边框是橙色的 */}
            <Input placeholder="输入框：高度没变，边框被单独改成橙色" />
          </Space>
        </Card>
      </ConfigProvider>

      <Divider titlePlacement="left" style={{ marginTop: 16 }}>对照组（在 ConfigProvider 外面）</Divider>
      {/* 这些组件不在 ConfigProvider 里，所以保持默认样式，方便对比 */}
      <Space>
        <Button type="primary">默认主按钮</Button>
        <Input placeholder="默认输入框" style={{ width: 160 }} />
      </Space>
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：一键切换暗黑模式（theme.darkAlgorithm）',
            body: `import { ConfigProvider, theme, Switch, Space, Card, Button, Input, Table, Tag, Typography } from 'antd'
import type { TableColumnsType } from 'antd'
import { useState } from 'react'

interface Row { id: number; name: string; status: string }
const data: Row[] = [
  { id: 1, name: '张小明', status: '在职' },
  { id: 2, name: '李小红', status: '离职' },
]
const columns: TableColumnsType<Row> = [
  { title: '姓名', dataIndex: 'name' },
  { title: '状态', dataIndex: 'status', render: (v: string) => <Tag color={v === '在职' ? 'success' : 'default'}>{v}</Tag> },
]

export default function Demo() {
  const [dark, setDark] = useState<boolean>(false) // 是否暗黑模式
  const [compact, setCompact] = useState<boolean>(false) // 是否紧凑模式

  // algorithm 可以传数组来组合多个算法；用 filter(Boolean) 去掉没启用的
  const algorithm = [
    dark ? theme.darkAlgorithm : theme.defaultAlgorithm, // 暗黑 or 默认
    compact ? theme.compactAlgorithm : null, // 紧凑（可选叠加）
  ].filter(Boolean) as typeof theme.darkAlgorithm[]

  return (
    <div>
      <Space style={{ marginBottom: 12 }}>
        <Switch checked={dark} onChange={setDark} checkedChildren="暗" unCheckedChildren="亮" />
        <Switch checked={compact} onChange={setCompact} checkedChildren="紧凑" unCheckedChildren="常规" />
      </Space>

      <ConfigProvider theme={{ algorithm, token: { colorPrimary: '#1677ff' } }}>
        {/* 注意：算法只改 antd 组件的颜色，页面自身的背景要你自己配合切换 */}
        <div style={{ background: dark ? '#141414' : '#fff', padding: 12, borderRadius: 8 }}>
          <Card title="切换上面的开关看效果" size="small">
            <Space vertical size={10} style={{ width: '100%' }}>
              <Space>
                <Button type="primary">主按钮</Button>
                <Button>次按钮</Button>
              </Space>
              <Input placeholder="输入框的背景和边框也跟着变了" />
              <Table rowKey="id" columns={columns} dataSource={data} size="small" pagination={false} />
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                连表格斑马纹、次要文字的颜色都是算法自动算出来的
              </Typography.Text>
            </Space>
          </Card>
        </div>
      </ConfigProvider>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '11.3 `App` 组件：一次解决所有「静态方法」问题',
            body: '第 8 节讲过，`message`、`notification`、`Modal.confirm` 的静态方法拿不到 context。如果一个页面三个都要用，就得写三对 hook 和三个 `contextHolder`，很啰嗦。\n\n**`App` 组件就是官方给的统一解法**：\n\n**① 在应用最外层包一层 `<App>`**（放在 `ConfigProvider` 里面）：\n\n```\n<ConfigProvider theme={...}>\n  <App>\n    <YourRoutes />\n  </App>\n</ConfigProvider>\n```\n\n**② 任何后代组件里用 `App.useApp()` 一次拿到三个 api**：\n\n```\nconst { message, notification, modal } = App.useApp()\nmessage.success(\'保存成功\')   // 自动带上主题和语言，不用渲染 contextHolder\n```\n\n它还有一个附带好处：`App` 会为它包住的区域提供 antd 的**基础文字颜色和字号**（重置样式），所以里面的普通 `div`、`p` 也能和组件对齐。\n\n**注意两点**：`App.useApp()` 必须在 `<App>` 内部调用（否则会警告）；`<App>` 只包一次，放最外层。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：App 组件 + App.useApp() 免去 contextHolder',
            body: `import { App, ConfigProvider, Button, Space, Card, Typography } from 'antd'

// 子组件：只要在 <App> 内部，就能用 useApp 拿到三个 api
function Inner() {
  // 一行拿到 message / notification / modal，不需要任何 contextHolder
  const { message, notification, modal } = App.useApp()

  return (
    <Card size="small" title="在 <App> 内部">
      <Space wrap>
        <Button onClick={() => message.success('保存成功（自动跟随主题）')}>message</Button>
        <Button onClick={() => notification.info({ title: '通知', description: '也不用 contextHolder' })}>
          notification
        </Button>
        <Button
          danger
          onClick={() =>
            modal.confirm({
              title: '确定删除吗？',
              content: '这个确认框能读到 ConfigProvider 的主题（注意主色是紫色的）',
              okButtonProps: { danger: true },
              onOk: () => message.success('已删除'),
            })
          }
        >
          modal.confirm
        </Button>
      </Space>
      <Typography.Paragraph type="secondary" style={{ fontSize: 12, marginTop: 8, marginBottom: 0 }}>
        对比一下：如果用静态的 message.success()，弹出来的提示还是默认蓝色，读不到这里的紫色主题。
      </Typography.Paragraph>
    </Card>
  )
}

export default function Demo() {
  return (
    // 顺序很重要：ConfigProvider 在外，App 在内
    <ConfigProvider theme={{ token: { colorPrimary: '#722ed1', borderRadius: 8 } }}>
      <App>
        <Inner />
      </App>
    </ConfigProvider>
  )
}`,
          },
          {
            type: 'text',
            title: '11.4 antd 的样式怎么和你自己的 CSS 共存',
            body: 'antd 5/6 用 CSS-in-JS 动态插入样式，这带来一个新手常遇到的问题：**「我写的 CSS 怎么覆盖不了 antd 的样式？」**\n\n原因是**优先级和插入顺序**：antd 的样式在运行时插入到 `<head>` 里，可能比你的 CSS 文件更靠后，于是同等优先级下 antd 赢了。\n\n按「推荐程度」从高到低，有四种解决办法：\n\n**① 优先用 `theme.token` / `theme.components`（最推荐）**。想改圆角、主色、控件高度、表头背景，这些都有对应 token，根本不需要写 CSS。这是官方设计的正道。\n\n**② 用组件的 `styles` / `classNames` 语义化属性（v6 力推）**。v6 给几乎每个组件都加了这两个属性，可以精确指定「改内部哪一块」，比如 `<Card styles={{ body: { padding: 8 } }}>`、`<Modal classNames={{ body: \'my-body\' }}>`。**这比写全局 CSS 覆盖安全得多**，因为不依赖 antd 的内部 class 名。\n\n**③ 直接传 `style` / `className`**：作用在组件最外层元素上，改宽高间距足够了。\n\n**④ 实在没办法才写 CSS 覆盖内部 class**：比如 `.ant-table-thead > tr > th { ... }`。这是**下策**，因为：内部 class 名可能随版本变化；而且往往要加权重（多写一层选择器）才能生效。如果非要用，请把这类样式集中放在一个文件里，方便升级时排查。\n\n另外提醒：**不要给组件的内部 class 名加 `!important` 满天飞**，一旦开始就很难收场。',
          },
          {
            type: 'code',
            title: '11.5 四种定制方式的代码对照（静态代码）',
            language: 'tsx',
            body: `import { ConfigProvider, Card, Table, Modal } from 'antd'

// ✅ ① 最推荐：改 token / components，一次配置全站生效
const themeConfig = {
  token: {
    colorPrimary: '#722ed1', // 主色
    borderRadius: 8, // 全局圆角
    fontSize: 14, // 基础字号
  },
  components: {
    Table: { headerBg: '#f0f5ff' }, // 只把表格表头背景改了
    Card: { paddingLG: 16 }, // 只改卡片的内边距
  },
}

export default function StyleDemo() {
  return (
    <ConfigProvider theme={themeConfig}>
      {/* ✅ ② 推荐：用 styles 语义化属性，精确改组件内部某一块 */}
      <Card
        title="卡片"
        styles={{
          body: { padding: 12, background: '#fafafa' }, // 只改 body 区
          header: { fontWeight: 700 }, // 只改标题区
        }}
      >
        {/* ✅ ③ 可以：style / className 作用在最外层，改布局尺寸够用 */}
        <Table
          style={{ marginTop: 8 }}
          className="my-table"
          rowKey="id"
          columns={[]}
          dataSource={[]}
        />
      </Card>

      {/* ✅ ② 弹窗同理，用 classNames 给内部区域挂自己的类名 */}
      <Modal open={false} classNames={{ body: 'my-modal-body' }} title="弹窗">
        内容
      </Modal>
    </ConfigProvider>
  )
}

/* ⚠️ ④ 下策：直接覆盖 antd 内部 class（写在你的 .css 文件里）
   问题：内部 class 名可能随版本变化，而且经常要加权重才能生效。

   .my-table .ant-table-thead > tr > th {
     background: #f0f5ff;
   }

   能用 token 或 styles 解决的，就不要走到这一步。
*/`,
          },
          {
            type: 'list',
            title: '11.6 这一节的易错点',
            ordered: true,
            items: [
              '**`ConfigProvider` 包的范围不对**：主题只对「被包住的组件」生效，务必包在应用最外层。',
              '**静态 `message.success()` 读不到主题**：这就是为什么要用 hook 版或 `App.useApp()`。',
              '**`App.useApp()` 在 `<App>` 外面调用**：会警告并且拿不到正确的 api。`<App>` 要包在 `ConfigProvider` 里面。',
              '**开了 `darkAlgorithm` 但页面还是白的**：算法只改 antd 组件，页面自身的 `body` 背景要你自己切（比如加一个类名切换背景色）。',
              '**`theme.components` 的组件名写错**：必须是组件名的**大写驼峰**，比如 `Button`、`InputNumber`、`DatePicker`，写成 `button` 无效且不报错。',
              '**先写 CSS 覆盖再想起有 token**：顺序反了。**先找 token → 再找 `styles` 语义属性 → 最后才考虑 CSS 覆盖**。',
              '**给内部 class 加一堆 `!important`**：升级 antd 时会成为定时炸弹。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '主题三件套：**`token`（全局）、`components`（单个组件）、`algorithm`（暗黑/紧凑）**，全部写在 `ConfigProvider` 的 `theme` 里。最外层 `ConfigProvider` 套一层 `<App>`，之后用 `App.useApp()` 拿 `message`/`modal`/`notification`。定制样式的优先顺序：**token → `styles`/`classNames` 语义属性 → `style` → 最后才是 CSS 覆盖**。',
          },
        ],
      },
    },
    {
      id: 'antd-cheatsheet',
      title: '速查表 + 新手十大踩坑清单',
      summary: '组件选型速查、v6 改名对照、以及最容易卡住新手的 10 个问题和它们的解法',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '遇到问题先按这个顺序排查：**① 提示不弹出来 → 忘渲染 `contextHolder`；② 表单拿不到值 → 自己写了 `value`/`onChange`，或漏了 `valuePropName="checked"`；③ 控制台一堆 warning → `rowKey` 没写，或者用了 v6 已改名的老属性。** 这三类占了新手问题的八成。',
          },
          {
            type: 'table',
            title: '12.1 组件选型速查：「我要做 X，用哪个组件」',
            intro: '按需求反查组件，比翻文档目录快得多。',
            headers: ['我要做的事', '用这个组件', '关键属性'],
            rows: [
              ['一个操作按钮', '`Button`', '`type` / `loading` / `danger` / `icon`'],
              ['几个元素之间留空隙', '`Space`', '`size` / `vertical` / `wrap`'],
              ['一行左右两端对齐', '`Flex`', '`justify="space-between"`'],
              ['按比例分栏 + 响应式', '`Row` / `Col`', '`gutter` / `span` / `xs` `md` `lg`'],
              ['后台整体框架', '`Layout`', '`Header` / `Sider` / `Content`'],
              ['一块带标题的内容区', '`Card`', '`title` / `extra` / `variant`'],
              ['一个状态词（待审核、已完成）', '`Tag`', '`color="success"` 等状态色'],
              ['右上角未读数 / 小红点', '`Badge`', '`count` / `dot` / `overflowCount`'],
              ['对象的多个字段平铺', '`Descriptions`', '`items` / `column` / `bordered`'],
              ['看板上的关键数字', '`Statistic`', '`value` / `precision` / `suffix`'],
              ['一个完整的输入表单', '`Form`', '`onFinish` / `Form.Item name` / `rules`'],
              ['输数字', '`InputNumber`', '`min` / `max` / `precision`'],
              ['从 5+ 个里选一个', '`Select`', '`options` / `showSearch` / `mode="multiple"`'],
              ['从 2-4 个里选一个', '`Radio.Group`', '`options` / `optionType="button"`'],
              ['开 / 关', '`Switch`', '表单里配 `valuePropName="checked"`'],
              ['选日期', '`DatePicker`', '值是 dayjs 对象；`format` / `showTime`'],
              ['上传文件', '`Upload`', '`action` / `beforeUpload` / `maxCount`'],
              ['带排序筛选分页的数据列表', '`Table`', '`columns` / `dataSource` / **`rowKey`**'],
              ['结构简单的一维列表', '`Listy`（老代码是 `List`）', '`items` / `rowKey` / `itemRender`'],
              ['「保存成功」这种轻提示', '`message`', '`message.useMessage()`'],
              ['删除单条数据前确认', '`Popconfirm`', '`onConfirm` / `okButtonProps`'],
              ['弹窗里放表单', '`Modal`', '`open` / `destroyOnHidden` / `confirmLoading`'],
              ['侧边滑出的长内容', '`Drawer`', '`open` / `onClose` / `size`'],
              ['已有内容正在刷新', '`Spin`', '`spinning` / `description`'],
              ['首次加载还没内容', '`Skeleton`', '`loading` / `avatar` / `paragraph`'],
              ['常驻的页面提示条', '`Alert`', '`type` / `title` / `showIcon`'],
              ['整页的成功/失败结果', '`Result`', '`status` / `title` / `extra`'],
              ['主导航', '`Menu`', '`items` / `mode` / `selectedKeys`'],
              ['页面内切换几块内容', '`Tabs`', '`items`（`{ key, label, children }`）'],
              ['多步骤流程', '`Steps`', '`items` / `current`（下标从 0）'],
              ['「更多操作」下拉', '`Dropdown`', '`menu={{ items }}`'],
            ],
            note: '拿不定主意时的判断标准：**要不要排序/筛选/分页/多选？要 → `Table`；不要 → 列表组件。**',
          },
          {
            type: 'table',
            title: '12.2 antd 6 改名对照表（照着老教程写就会中招）',
            intro: '网上大量教程是 v4/v5 时代写的。下面这些老属性还能用，但会打废弃警告，将来会被移除。',
            headers: ['组件', '老写法（别用）', 'v6 正确写法'],
            rows: [
              ['`Modal`', '`visible`', '`open`'],
              ['`Modal` / `Drawer` / `Tabs`', '`destroyOnClose`', '`destroyOnHidden`'],
              ['`Drawer`', '`width`', '`size`'],
              ['`Card` / `Tag` / `Input` / `Select`', '`bordered`', '`variant`'],
              ['`Alert`', '`message`', '`title`'],
              ['`notification`', '`message` / `btn`', '`title` / `actions`'],
              ['`Spin`', '`tip`', '`description`'],
              ['`Space`', '`direction="vertical"`', '`vertical` 或 `orientation="vertical"`'],
              ['`Divider`', '`orientation="left"`（放文字）', '`titlePlacement="left"`'],
              ['`Steps`', '每项 `description`、`direction`', '每项 `content`、`orientation`'],
              ['`Tabs`', '`<Tabs.TabPane>`、`tabPosition`', '`items` 数组、`tabPlacement`'],
              ['`Menu`', '`<Menu.Item>` 子元素', '`items` 数组'],
              ['`Select`', '`<Select.Option>` 子元素', '`options` 数组'],
              ['`Descriptions`', '`<Descriptions.Item>` 子元素', '`items` 数组'],
              ['`Breadcrumb`', '`routes`、`<Breadcrumb.Item>`', '`items` 数组（`{ title }`）'],
              ['`Dropdown`', '`overlay`', '`menu={{ items }}`'],
              ['`Button`', '`iconPosition`', '`iconPlacement`'],
              ['`InputNumber`', '`addonBefore` / `addonAfter`', '`prefix` / `suffix` 或 `Space.Compact`'],
              ['`Progress`', '`trailColor`、`gapPosition`', '`railColor`、`gapPlacement`'],
              ['`Slider`', '`onAfterChange`', '`onChangeComplete`'],
              ['`Avatar.Group`', '`maxCount`', '`max={{ count: n }}`'],
              ['`List`', '（整个组件废弃）', '`Listy`（`items` + `rowKey` + `itemRender`）'],
              ['`Statistic`', '`valueStyle`', '`styles.content`'],
              ['`Empty`', '`imageStyle`', '`styles.image`'],
              ['样式引入', '`import \'antd/dist/antd.css\'`', '**不需要引入**（CSS-in-JS 自动注入）'],
            ],
            note: '判断自己有没有用老 API 最简单的方法：**打开浏览器控制台，看有没有 `Warning: [antd: XXX] ... is deprecated`**。有就照着提示改。',
          },
          {
            type: 'text',
            title: '12.3 新手十大踩坑清单（含症状和解法）',
            body: '**坑 1：表单提交后 `onFinish` 里拿不到某个字段的值。**\n\n症状：控制台打印 `values`，少了几个字段，或者某字段永远是 `undefined`。\n\n原因和解法：① `Form.Item` 忘了写 `name`（没有 `name` 就不参与收值）；② 你给里面的控件自己写了 `value` 和 `onChange`，**把 `Form` 的托管打断了**，删掉即可；③ 那个控件是 `Switch` / `Checkbox`，需要在 `Form.Item` 上加 `valuePropName="checked"`。\n\n**坑 2：`Table` 报 key 相关的 warning。**\n\n症状：`Each child in a list should have a unique "key" prop`。\n\n解法：给 `Table` 加 `rowKey="id"`（用数据里真正唯一的字段）；操作列因为没有 `dataIndex`，也要显式写 `key: \'action\'`。**不要用数组下标当 `rowKey`**。\n\n**坑 3：弹窗关掉再打开，上次填的内容还在。**\n\n原因：`Modal` 默认只是隐藏，内部 React 状态还活着。\n\n解法：给 `Modal`（`Drawer` 同理）加 **`destroyOnHidden`**。\n\n**坑 4：`message.success()` 有 context 警告 / 提示颜色不跟主题。**\n\n解法：改用 hook 版 `const [messageApi, contextHolder] = message.useMessage()`，并且**一定要在 JSX 里渲染 `{contextHolder}`**。全局多处要用就在最外层套 `<App>`，然后 `App.useApp()`。\n\n**坑 5：调了 `messageApi.success()` 但什么都没弹出来。**\n\n这几乎 100% 是**忘了渲染 `contextHolder`**。它不报错，只是静默无效。\n\n**坑 6：`DatePicker` 报 `value.format is not a function`。**\n\n原因：给了字符串。`DatePicker` 的值必须是 **dayjs 对象**。\n\n解法：进去时 `dayjs(\'2024-03-12\')`，出去（提交给后端）时 `value.format(\'YYYY-MM-DD\')`。\n\n**坑 7：栅格出现横向滚动条 / 内容被裁掉。**\n\n原因：`Row` 的 `gutter` 是用「负 margin」实现的，父容器有固定宽度或 `overflow: hidden` 时就会溢出或被裁。\n\n解法：给父容器留 padding，不要用 `overflow: hidden`；同时检查同一行 `Col` 的 `span` 之和有没有超过 24。\n\n**坑 8：编辑时用 `initialValues` 回填，表单永远是空的。**\n\n原因：`initialValues` **只在首次渲染生效**，而接口数据是之后才回来的。\n\n解法：用 `form.setFieldsValue(data)`，并且放在 `useEffect(() => {...}, [open, editing])` 里（等表单挂载完再填）。\n\n**坑 9：`import \'antd/dist/reset.css\'` 报 Module not found，或者以为必须手动引样式。**\n\n解法：antd 5/6 是 CSS-in-JS，**样式自动注入，不需要引任何 css**。`antd/dist/antd.css` 这个文件在 v5 之后已经不存在了。（`reset.css` 仍然存在但是**可选**的，只用于重置浏览器默认样式。）\n\n**坑 10：以为要手动配「按需引入」（babel-plugin-import 之类）。**\n\n解法：**不需要**。那是 antd 4 时代的方案，在 v5/v6 上用还会报错。现在样式天然按需，配合现代打包工具的 tree-shaking，直接 `import { Button } from \'antd\'` 就是最优写法。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：把十大坑全部写对的迷你表单（可当模板抄）',
            body: `import { Form, Input, Switch, DatePicker, Button, Space, Card, message, Typography } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

export default function Demo() {
  // ✅ 坑 4/5：hook 版 message + 一定要渲染 contextHolder
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm() // ✅ 拿到实例，下面别忘了 form={form}
  const [result, setResult] = useState<string>('')

  function onFinish(values: any) {
    // ✅ 坑 6：dayjs 对象提交前要 format 成字符串
    const payload = {
      ...values,
      birthday: values.birthday ? values.birthday.format('YYYY-MM-DD') : null,
    }
    setResult(JSON.stringify(payload))
    messageApi.success('提交成功')
  }

  function fillDemoData() {
    // ✅ 坑 8：回填用 setFieldsValue；字符串日期要先用 dayjs() 包一层
    form.setFieldsValue({ name: '张小明', vip: true, birthday: dayjs('1998-06-15') })
  }

  return (
    <Card size="small" title="正确写法模板">
      {contextHolder}
      <Form form={form} layout="vertical" initialValues={{ vip: false }} onFinish={onFinish}>
        {/* ✅ 坑 1：有 name 才收值；控件本身不写 value / onChange */}
        <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
          <Input placeholder="必填" />
        </Form.Item>

        {/* ✅ 坑 1：Switch 用 checked 表示值，所以必须写 valuePropName */}
        <Form.Item name="vip" label="是否 VIP" valuePropName="checked">
          <Switch checkedChildren="是" unCheckedChildren="否" />
        </Form.Item>

        {/* ✅ 坑 6：DatePicker 的值是 dayjs 对象，不是字符串 */}
        <Form.Item name="birthday" label="生日">
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" placeholder="选择日期" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Space>
            {/* ✅ 提交按钮必须写 htmlType="submit" */}
            <Button type="primary" htmlType="submit">提交</Button>
            <Button onClick={fillDemoData}>模拟编辑回填</Button>
            <Button onClick={() => form.resetFields()}>重置</Button>
          </Space>
        </Form.Item>
      </Form>

      {result && (
        <Typography.Paragraph style={{ marginTop: 12, marginBottom: 0, fontSize: 12 }}>
          提交给后端的数据：<Typography.Text code>{result}</Typography.Text>
        </Typography.Paragraph>
      )}
    </Card>
  )
}`,
          },
          {
            type: 'list',
            title: '12.4 排查问题的固定流程',
            intro: '卡住的时候别乱改，按这个顺序走一遍，绝大多数问题十分钟内能定位：',
            ordered: true,
            items: [
              '**打开浏览器控制台**，先看有没有红色 error 和黄色 warning。antd 的警告写得很清楚，一般直接告诉你该用什么属性。',
              '**如果是「没反应」类问题**（提示不弹、`form.xxx()` 无效），先检查两个「挂载」：`contextHolder` 渲染了吗？`form={form}` 传了吗？',
              '**如果是「值不对」类问题**，在 `onFinish` 里 `console.log(values)`，看是少字段还是值的类型不对。',
              '**如果是「样式不对」类问题**，先用浏览器的元素审查看看 antd 实际给了什么 class 和 style，再决定是改 token 还是用 `styles` 属性。',
              '**去官网看对应组件的示例**：antd 官网每个组件下面都有可运行的代码示例，比搜博客准确得多（博客常常是老版本的）。',
              '**确认版本**：`npm list antd`。看博客前先确认它写的是哪个大版本，v4 的文章对 v6 参考价值很低。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '记住三条保命规则：**① 用了 hook 版提示，就必须渲染 `contextHolder`；② `Table` 必须有 `rowKey`，`Modal` 必须有 `destroyOnHidden`；③ 表单里的控件不要自己写 `value`/`onChange`，`Switch`/`Checkbox` 要加 `valuePropName="checked"`。** 剩下的都能靠控制台警告和官网示例解决。',
          },
        ],
      },
    },
  ],
}

export default antdGuide
