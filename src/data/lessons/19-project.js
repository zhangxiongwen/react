/**
 * 完整项目实战章节：架构与三方库
 * 面向「学完 React 基础、第一次要独立做一个真实项目」的小白
 * 全章贯穿同一个例子：后台管理系统（用户管理 + 登录 + 多语言）
 */
import projectMoreItems from './19-project-more'

const projectGuide = {
  id: 'project',
  title: '完整项目实战：架构与三方库',
  summary:
    '用一个「后台管理系统（用户管理 + 登录 + 多语言）」把真实项目从 0 到上线走一遍，一共 10 节：项目全景与技术选型、目录分层、脚手架工程化、路由架构、请求封装、数据请求 Hook、登录权限与国际化、全局状态、表单与质量兜底、性能与打包上线。每节都是「为什么需要 → 代码长什么样 → 逐行讲 → 易错点 → 上线前检查」。',
  order: 19,
  items: [
    {
      id: 'project-overview',
      title: '项目全景：我们要做什么、用什么、分几步做',
      summary: '先看清成品长什么样，再看技术选型表，最后记住从 0 到上线的 8 个阶段',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '真实项目不是「把 React 语法再写一遍」，而是**在一堆约定里协作**：目录怎么分、请求怎么发、登录怎么管、文案怎么切语言。这一章用同一个后台管理系统贯穿到底——先看全景，后面各节逐个拆开。',
          },
          {
            type: 'text',
            title: '1.1 是什么：我们这一章要做的东西',
            body: '接下来所有代码都属于同一个项目，名字叫 **admin-system**（后台管理系统）。它是最典型的「第一个真实项目」：几乎所有公司内部系统都是这个样子。\n\n它长这样：\n\n- 左边是一条固定的菜单栏（仪表盘 / 用户管理 / 系统设置），顶部是面包屑和当前登录人的头像\n- 没登录时访问任何页面都会被踢到登录页；登录成功后回到你原本想去的那一页\n- 用户管理页是一张表格：能搜索、能翻页、能新增、能编辑、能删除\n- 删除按钮只有管理员看得见，普通成员看不见\n- 右上角有一个「中 / EN」开关，点一下整站文案立刻切换语言\n\n功能不多，但它把真实项目里**所有的架构问题都覆盖了**——这就是我们选它的原因。',
          },
          {
            type: 'list',
            title: '1.2 功能清单（先写清单，再写代码）',
            intro: '真实项目的第一步不是敲代码，是把功能拆成一条条能打勾的清单。下面这份就是 admin-system 的清单：',
            ordered: true,
            items: [
              '**登录页**：账号 + 密码表单，校验不通过不给提交；登录成功保存 token 并跳转',
              '**整体布局**：左侧菜单 + 顶部栏 + 内容区，所有业务页面共用这一层外壳',
              '**路由守卫**：未登录访问 `/users` 自动跳 `/login`，并记住原来要去哪',
              '**仪表盘**：几个统计数字，用来练「首屏并发请求」',
              '**用户列表**：分页表格 + 关键字搜索 + 加载中 / 出错 / 空数据三种状态',
              '**新增 / 编辑用户**：弹窗表单，两个功能共用一个组件',
              '**删除用户**：二次确认 + 按钮级权限（只有 admin 能看到）',
              '**多语言**：中英文切换，包括 antd 组件内置文案和日期格式',
              '**兜底**：404 页、接口报错统一提示、页面崩了有兜底 UI',
            ],
          },
          {
            type: 'table',
            title: '1.3 技术选型表：每个库解决一个具体问题',
            intro: '新手看到一长串依赖会慌。其实每一个库都只解决一个很具体的痛点——**先记住痛点，再记住库名**，就不会觉得多。',
            headers: ['技术', '解决什么问题', '为什么选它', '常见替代品'],
            rows: [
              ['**React 19**', '把界面拆成组件，数据变了自动重渲染', '生态最大、招聘最多、本笔记全程用它', 'Vue 3、Svelte、Solid'],
              ['**Vite**', '本地开发启动快、改代码秒级热更新、打包产物小', '冷启动 1 秒内；CRA 已停止维护', 'Create React App（已弃）、Rspack、webpack'],
              ['**TypeScript**', '接口字段写错、参数传错，写代码时就报红线', '后台系统字段极多，类型就是最准的文档', '纯 JS + JSDoc 注释'],
              ['**antd 6**', '表格 / 表单 / 弹窗 / 日期选择器不用自己写', '后台系统组件最全，中文文档最好', 'MUI、Arco Design、shadcn/ui'],
              ['**react-router v6**', '一个页面里切换多个「页面」，地址栏跟着变', 'React 官方生态事实标准', 'TanStack Router、Next.js 文件路由'],
              ['**axios**', '统一加 token、统一处理报错、统一剥数据', '拦截器机制是项目级封装的基础', '原生 `fetch` + 自己写包装层'],
              ['**Redux Toolkit**', '用户信息 / 权限 / 主题这类跨页面数据的存放处', '官方推荐写法，DevTools 时间旅行调试好用', 'Zustand（更轻）、Jotai、Context'],
              ['**react-i18next**', '文案不写死在组件里，一键切换中英文', 'i18n 领域最成熟，插值 / 复数都有', '自己写词典对象（小项目够用）'],
              ['**dayjs**', '时间格式化、时区、相对时间（「3 分钟前」）', '体积只有 2KB，API 和 moment 一样', 'date-fns、原生 `Intl`'],
              ['**TanStack Query**', '接口结果缓存、自动去重、失效重取', '接口超过 20 个之后收益极大（本章「数据请求 Hook」那节讲）', 'RTK Query、SWR、自己写 `useRequest`'],
            ],
            note: '选型的判断标准只有一条：**这个库解决的痛点，我现在真的痛吗？** 不痛就先别装——每多一个依赖，就多一份升级和踩坑的成本。',
          },
          {
            type: 'text',
            title: '1.4 为什么：为什么不「什么都自己写」',
            body: '很多新手有个朴素的想法：表格我自己也能写，为什么要用 antd？\n\n答案是**你能写出来，但写不完**。一个「真实可用」的表格要处理：表头固定、列宽拖拽、排序、分页、空数据、加载骨架、键盘无障碍、移动端横向滚动、右键菜单……每一项都是一两天的工作量，而且没人帮你测。\n\n反过来也有一条铁律：**不要为了用库而用库**。判断方法很朴素——\n\n- 这个功能自己写超过 200 行 → 找库\n- 这个功能自己写 20 行就能搞定 → 自己写（比如一个防抖函数）\n- 这个库半年没更新、star 很少、issue 一堆没人回 → 不要用\n\n这一章讲的所有库，都是「自己写会超过 200 行」的那一类。',
          },
          {
            type: 'code',
            title: '1.5 一眼看到成品：项目目录的骨架（细节在本章「目录分层架构」那节）',
            language: 'text',
            body: `admin-system/                 ← 项目根目录
├── .env.development          ← 开发环境变量（接口地址等）
├── .env.production           ← 生产环境变量
├── index.html                ← Vite 的入口 HTML（注意在根目录，不在 public 里）
├── package.json              ← 依赖清单 + npm 脚本
├── vite.config.ts            ← 构建配置：路径别名、跨域代理
├── tsconfig.json             ← TypeScript 配置
└── src/                      ← 我们 99% 的时间都在这里面
    ├── main.tsx              ← 应用启动入口：挂载 React、包全局 Provider
    ├── App.tsx               ← 根组件：渲染路由
    ├── api/                  ← 所有接口请求（见「网络请求」那节）
    ├── assets/               ← 图片、字体、svg
    ├── components/           ← 跨页面复用的通用组件
    ├── config/               ← 常量与配置（菜单、字典、枚举）
    ├── hooks/                ← 自定义 Hook（见「数据请求 Hook」那节）
    ├── layouts/              ← 页面外壳：菜单 + 顶部栏（见「路由架构」那节）
    ├── locales/              ← 多语言词典（见「登录权限 + 国际化」那节）
    ├── pages/                ← 一个业务页面一个文件夹
    ├── router/               ← 路由表 + 守卫（见「路由架构」那节）
    ├── store/                ← 全局状态（见「全局状态」那节）
    ├── types/                ← TypeScript 类型定义
    └── utils/                ← 纯工具函数（不含业务）`,
          },
          {
            type: 'table',
            title: '1.6 从 0 到上线的 8 个阶段',
            intro: '真实项目的推进顺序几乎是固定的。**不要跳阶段**——最常见的翻车就是跳过第 1、2 步直接写页面。',
            headers: ['阶段', '要做的事', '产出物', '典型耗时'],
            rows: [
              ['① 需求梳理', '把功能拆成能打勾的清单，画出页面草图', '功能清单 + 页面原型', '半天'],
              ['② 技术选型 + 搭架子', '定依赖、跑通脚手架、把目录分层建好', '能 `npm run dev` 的空项目', '半天'],
              ['③ 打通地基', '路由表、Layout、请求封装、登录守卫', '能登录、能跳页、能发请求', '1～2 天'],
              ['④ 接口约定', '和后端确认字段、状态码、分页参数；先用 Mock 顶上', 'Mock 数据 + 类型定义', '半天'],
              ['⑤ 业务开发', '一个页面一个页面写，写完自测三态', '所有清单条目打勾', '大头时间'],
              ['⑥ 联调', '换成真实接口，处理字段不一致、报错、边界情况', '和后端跑通的功能', '1～3 天'],
              ['⑦ 优化与兜底', '性能、错误边界、错误上报、多语言补齐', '不白屏、不卡顿的版本', '1～2 天'],
              ['⑧ 打包上线', '环境变量、构建、nginx / 静态托管、上线自检', '线上能访问的地址', '半天'],
            ],
            note: '注意第 ④ 步：**接口没好也不要等**。先按约定造假数据（Mock）把页面写完，等接口好了只改 `api/` 目录里的几行。',
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：点一下阶段，看这一步具体要干什么',
            body: `import { useState } from 'react' // 用 state 记住「现在看的是第几个阶段」
import { Steps, Card, Button, Space, Tag, Alert } from 'antd' // 用现成组件搭一个小导航

// 把上面表格里的 8 个阶段写成数组：数据和 UI 分开，改内容不用动 JSX
const STAGES = [
  { title: '需求梳理', todo: '把功能拆成能打勾的清单，画出页面草图', out: '功能清单 + 原型图', risk: '想边写边想需求，结果反复重构' },
  { title: '搭架子', todo: '定依赖、跑通脚手架、按分层建好目录', out: '能启动的空项目', risk: '目录随手建，后面越堆越乱' },
  { title: '打通地基', todo: '路由表、Layout、请求封装、登录守卫', out: '能登录能跳页能发请求', risk: '先写业务页，最后发现要大改' },
  { title: '接口约定', todo: '确认字段和状态码，先用假数据顶上', out: 'Mock 数据 + 类型定义', risk: '干等后端，白白浪费两天' },
  { title: '业务开发', todo: '一页一页写，每页自测加载/出错/空数据', out: '清单条目全部打勾', risk: '只测成功路径，上线全是白屏' },
  { title: '联调', todo: '换真实接口，处理字段不一致和报错', out: '和后端跑通的功能', risk: '字段名和约定不一样，页面全空' },
  { title: '优化兜底', todo: '性能、错误边界、错误上报、多语言补齐', out: '不白屏不卡顿的版本', risk: '过早优化，或者干脆忘了兜底' },
  { title: '打包上线', todo: '换环境变量、构建、部署、上线自检', out: '线上能访问的地址', risk: '生产还指着本地接口地址' },
]

export default function Demo() {
  const [current, setCurrent] = useState(0) // 当前选中的阶段下标，从 0 开始
  const stage = STAGES[current] // 根据下标取出这个阶段的详细信息

  return (
    <div>
      {/* Steps 的 onChange 让每一步都能点击；items 只给标题，详情放到下面卡片里 */}
      <Steps
        size="small" // 紧凑尺寸，8 步才放得下
        current={current} // 高亮第几步
        onChange={setCurrent} // 点击某一步就更新 state
        items={STAGES.map((s) => ({ title: s.title }))} // 把数组映射成 Steps 需要的格式
        style={{ marginBottom: 16 }}
      />

      {/* 当前阶段的详情卡片：标题里带上第几步，一眼知道进度 */}
      <Card
        size="small"
        title={'第 ' + (current + 1) + ' / ' + STAGES.length + ' 步：' + stage.title}
      >
        <Space vertical size={10} style={{ width: '100%' }}>
          <div>
            <Tag color="blue">要做的事</Tag> {stage.todo}
          </div>
          <div>
            <Tag color="green">产出物</Tag> {stage.out}
          </div>
          {/* Alert 在 antd 6 里用 title 而不是 message（message 已废弃） */}
          <Alert type="warning" showIcon title={'常见翻车：' + stage.risk} />
        </Space>
      </Card>

      {/* 上一步 / 下一步按钮：用 Math.max / Math.min 防止下标越界 */}
      <Space style={{ marginTop: 12 }}>
        <Button
          disabled={current === 0} // 已经是第一步就禁用
          onClick={() => setCurrent(Math.max(0, current - 1))}
        >
          上一步
        </Button>
        <Button
          type="primary"
          disabled={current === STAGES.length - 1} // 已经是最后一步就禁用
          onClick={() => setCurrent(Math.min(STAGES.length - 1, current + 1))}
        >
          下一步
        </Button>
      </Space>
    </div>
  )
}`,
          },
          {
            type: 'list',
            title: '1.7 新手最容易卡在哪几步',
            intro: '带过几个新人之后会发现，卡住的位置高度一致：',
            ordered: false,
              items: [
              '**卡在第 ② 步**：目录随手建，`components` 里堆了 40 个文件，找不到东西——本章「目录分层架构」那节专门解决',
              '**卡在第 ③ 步**：请求散落在每个组件里，加个 token 要改 30 处——本章「网络请求」那节专门解决',
              '**卡在第 ⑤ 步**：只测「接口成功」这条路，加载中和报错完全没做——本章「数据请求 Hook」那节专门解决',
              '**卡在第 ⑦ 步**：中文写死在 JSX 里，要做多语言时发现要改上千处——本章「登录权限 + 国际化」那节专门解决',
              '**卡在第 ⑧ 步**：本地好好的，一上线刷新页面就 404——本章「性能、质量与上线」那节专门解决',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '一个真实项目 = 一份功能清单 + 一套目录约定 + 8 个不能跳的阶段。技术选型的唯一标准是「这个痛点我现在真的痛吗」；后面每一节都在解决上面某一步的具体卡点。',
          },
        ],
      },
    },
    {
      id: 'project-architecture',
      title: '目录分层架构：一个新需求进来，代码该放哪',
      summary: '完整目录树 + 每层职责 + 依赖方向规则（谁能 import 谁）+ 决策表 + 烂架构反例',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '目录不是「文件的收纳盒」，而是**一张依赖方向图**。核心规则只有一条：**上层可以 import 下层，下层永远不能 import 上层**。顺序是 `pages` → `components` / `hooks` → `api` / `store` → `utils` / `types`。',
          },
          {
            type: 'text',
            title: '2.1 为什么需要分层：三个文件的故事',
            body: '假设不分层，所有东西都堆在 `src` 下。一开始只有 3 个文件，很舒服。三个月后你会遇到这三件事：\n\n**第一件：找不到东西。** 「用户列表的搜索框」在哪？可能叫 `UserSearch.tsx`、可能在 `UserList.tsx` 里、也可能叫 `Search2.tsx`。全局搜索一次要 30 秒。\n\n**第二件：不敢改。** 你想改一个格式化金额的函数，但不知道有几个页面在用它，改了怕别的地方崩。\n\n**第三件：改一个字段要改十个文件。** 后端把 `userName` 改成 `user_name`，你要在 10 个组件里逐个搜索替换，漏一个就是线上 bug。\n\n分层能同时解决这三件事：**看目录名就知道去哪找**、**看层级就知道谁依赖谁**、**接口字段只在 `api/` 一层出现**。',
          },
          {
            type: 'code',
            title: '2.2 完整目录树（admin-system 的真实结构）',
            language: 'text',
            body: `src/
├── main.tsx                      ← 启动入口：createRoot + 全局 Provider（只有十几行）
├── App.tsx                       ← 根组件：渲染路由，别在这写业务
│
├── api/                          ← 【接口层】所有 HTTP 请求都住在这里
│   ├── request.ts                ← axios 实例 + 拦截器（全项目唯一的出口）
│   ├── user.ts                   ← 用户模块接口：列表/详情/新增/编辑/删除
│   ├── auth.ts                   ← 登录、登出、获取当前登录人信息
│   └── dashboard.ts              ← 仪表盘统计接口
│
├── assets/                       ← 【静态资源】图片、字体、svg
│   ├── images/
│   └── icons/
│
├── components/                   ← 【通用组件】跨页面复用、不含业务逻辑
│   ├── Auth/                     ← 按钮级权限包装组件（见「登录权限 + 国际化」那节）
│   ├── ErrorBoundary/            ← 页面崩溃兜底（见「表单与质量兜底」那节）
│   ├── LangSwitch/               ← 中英文切换开关（见「登录权限 + 国际化」那节）
│   └── PageContainer/            ← 页面统一外框：标题 + 面包屑 + 内容区
│
├── config/                       ← 【常量配置】写死的、不会变的东西
│   ├── menu.ts                   ← 菜单配置（和路由表共用，见「路由架构」那节）
│   ├── dict.ts                   ← 字典：角色名、状态名、性别枚举
│   └── env.ts                    ← 把 import.meta.env 收拢成一个对象（见「脚手架与工程化」那节）
│
├── hooks/                        ← 【自定义 Hook】可复用的「带状态的逻辑」
│   ├── useRequest.ts             ← 请求三态封装（见「数据请求 Hook」那节）
│   ├── usePermission.ts          ← 判断当前用户有没有某个权限（见「登录权限 + 国际化」那节）
│   └── useDebounce.ts            ← 输入防抖（见「性能、质量与上线」那节）
│
├── layouts/                      ← 【页面外壳】菜单 + 顶部栏 + Outlet
│   ├── BasicLayout/              ← 登录后所有页面共用的外壳
│   └── BlankLayout/              ← 登录页 / 404 用的空白外壳
│
├── locales/                      ← 【多语言词典】（见「登录权限 + 国际化」那节）
│   ├── zh-CN.json
│   ├── en-US.json
│   └── i18n.ts                   ← i18next 初始化
│
├── pages/                        ← 【业务页面】一个页面一个文件夹
│   ├── Login/
│   │   ├── index.tsx             ← 页面主体
│   │   └── index.module.css      ← 只属于这个页面的样式
│   ├── Dashboard/
│   │   └── index.tsx
│   ├── UserList/
│   │   ├── index.tsx             ← 列表页主体
│   │   ├── UserFormModal.tsx     ← 只有这个页面用的子组件，就放在页面文件夹里
│   │   └── columns.tsx           ← 表格列配置，抽出来让主文件短一些
│   └── NotFound/
│       └── index.tsx
│
├── router/                       ← 【路由层】（见「路由架构」那节）
│   ├── index.tsx                 ← 集中式路由表
│   └── RequireAuth.tsx           ← 登录守卫
│
├── store/                        ← 【全局状态】（见「全局状态」那节）
│   ├── index.ts                  ← configureStore
│   ├── hooks.ts                  ← 类型化的 useAppSelector / useAppDispatch
│   └── slices/
│       ├── userSlice.ts          ← 当前登录人 + 权限码
│       └── appSlice.ts           ← 主题、语言、菜单折叠状态
│
├── types/                        ← 【类型定义】只有 interface / type，没有运行代码
│   ├── api.ts                    ← ApiResult<T>、分页参数、分页结果
│   └── user.ts                   ← User、UserRole、CreateUserParams
│
└── utils/                        ← 【纯工具】输入 → 输出，不碰 React、不碰业务
    ├── storage.ts                ← localStorage 读写（带 try/catch）
    ├── format.ts                 ← 日期、金额、手机号格式化
    └── tree.ts                   ← 数组转树、树的遍历`,
          },
          {
            type: 'table',
            title: '2.3 每一层的职责与判断标准',
            intro: '拿不定主意时，就问「这个文件符合下面哪一行的判断标准」。',
            headers: ['目录', '放什么', '判断标准', '不能放什么'],
            rows: [
              ['`api/`', 'HTTP 请求函数、请求实例', '这段代码在发网络请求吗', 'JSX、useState、页面逻辑'],
              ['`components/`', '通用 UI 组件', '换一个项目还能直接用吗', '接口请求、路由跳转、业务判断'],
              ['`config/`', '常量、枚举、菜单配置', '这个值永远不会在运行时变吗', '函数逻辑、请求'],
              ['`hooks/`', '带状态的可复用逻辑', '有 `useState` / `useEffect` 且被 2 个以上地方用', 'JSX 渲染、只用一次的逻辑'],
              ['`layouts/`', '页面外壳、菜单、顶部栏', '它里面有 `<Outlet />` 吗', '具体某个页面的业务'],
              ['`locales/`', '语言词典 JSON', '这是给用户看的文案吗', '代码逻辑'],
              ['`pages/`', '业务页面 + 只属于它的子组件', '地址栏能直接访问到它吗', '别的页面也要用的组件（该挪到 components）'],
              ['`router/`', '路由表、守卫', '这段代码决定「哪个 URL 显示哪个页面」吗', '页面内容'],
              ['`store/`', '跨页面共享的状态', '刷新页面后多个页面都要用它吗', '只有一个页面用的状态（用 useState）'],
              ['`types/`', 'interface / type', '编译后这个文件会消失吗', '任何会运行的代码'],
              ['`utils/`', '纯函数', '同样的输入永远得到同样的输出吗', 'React Hook、接口请求、业务字段'],
            ],
            note: '一个特别实用的补充规则：**只被一个页面用的子组件，就放在那个页面的文件夹里**，不要一律塞进 `components/`。等到第二个页面也要用它时，再挪出来。',
          },
          {
            type: 'text',
            title: '2.4 最重要的规则：依赖方向',
            body: '分层的价值不在「文件放对了位置」，而在**限制 import 的方向**。规则一共三条：\n\n**规则一：上层可以 import 下层，下层不能 import 上层。** `pages/UserList` 可以 import `api/user`、`hooks/useRequest`、`components/Auth`；但 `components/Auth` 绝对不能 import `pages/UserList`。\n\n**规则二：同层之间尽量不互相 import。** 两个页面互相 import 就等于把它们焊死了，以后删一个会连带崩另一个。要共享就把共享部分抽到下层。\n\n**规则三：`utils/` 和 `types/` 是最底层，它们不能 import 任何业务代码。** `utils/format.ts` 里出现 `import { User } from ...` 这种业务类型，或者出现 `axios`，都说明它放错了层。\n\n为什么这条最重要？因为**依赖方向决定了「改一个文件会影响多少个文件」**。底层文件被很多人依赖，所以它必须简单、稳定；上层文件没人依赖它，所以可以随便改、随便删。',
          },
          {
            type: 'code',
            title: '2.5 依赖方向图（箭头只能从上往下）',
            language: 'text',
            body: `        ┌──────────────────────────────┐
        │   pages/  （业务页面）        │   ← 最上层，没人 import 它，可以随便改
        └──────────────┬───────────────┘
                       │ 允许 ↓
        ┌──────────────┴───────────────┐
        │  layouts/   router/          │   ← 组装层：决定页面外壳和 URL 映射
        └──────────────┬───────────────┘
                       │ 允许 ↓
        ┌──────────────┴───────────────┐
        │  components/    hooks/       │   ← 复用层：通用组件、通用逻辑
        └──────────────┬───────────────┘
                       │ 允许 ↓
        ┌──────────────┴───────────────┐
        │   api/       store/          │   ← 数据层：接口请求、全局状态
        └──────────────┬───────────────┘
                       │ 允许 ↓
        ┌──────────────┴───────────────┐
        │  utils/   types/   config/   │   ← 地基层：纯函数、类型、常量
        └──────────────────────────────┘

✅ 合法：pages/UserList/index.tsx  →  import { getUserList } from '@/api/user'
✅ 合法：hooks/useRequest.ts       →  import { sleep } from '@/utils/format'
✅ 合法：api/user.ts               →  import type { User } from '@/types/user'

❌ 违规：utils/format.ts           →  import { store } from '@/store'
         （工具函数依赖了全局状态，从此它就没法单独测试、没法复用）
❌ 违规：components/Auth/index.tsx →  import { getUserList } from '@/api/user'
         （通用组件依赖了具体业务接口，换个项目就不能用了）
❌ 违规：api/user.ts               →  import UserList from '@/pages/UserList'
         （数据层反向依赖页面，会造成循环引用，打包直接报错）`,
          },
          {
            type: 'table',
            title: '2.6 决策表：一个新需求进来，代码该放哪',
            intro: '这张表是本节最实用的东西。遇到新需求先在这里对一眼，能省掉 90% 的纠结。',
            headers: ['需求', '放哪里', '为什么'],
            rows: [
              ['加一个「角色管理」页面', '`pages/RoleList/`', '地址栏能访问到的就是页面'],
              ['角色管理的接口', '`api/role.ts`', '按业务模块拆文件，一个模块一个文件'],
              ['角色管理页里的编辑弹窗', '`pages/RoleList/RoleFormModal.tsx`', '只有这一个页面用，别污染 `components`'],
              ['用户页和角色页都要用的「状态标签」', '`components/StatusTag/`', '两个以上页面用 → 提到通用组件'],
              ['「把手机号中间四位打码」', '`utils/format.ts`', '纯函数，输入输出确定'],
              ['「判断当前用户是不是管理员」', '`hooks/usePermission.ts`', '要读全局状态，是带状态的逻辑'],
              ['接口返回的 `User` 数据结构', '`types/user.ts`', '只有类型，编译后消失'],
              ['角色下拉框的固定选项', '`config/dict.ts`', '写死的常量，不会运行时变'],
              ['「当前登录人」信息', '`store/slices/userSlice.ts`', '菜单、顶部栏、权限判断都要用'],
              ['用户列表页的「搜索关键字」', '页面内 `useState`', '只有这个页面用，放全局是过度设计'],
              ['整站的左侧菜单栏', '`layouts/BasicLayout/`', '所有页面共用的外壳'],
              ['「未登录跳登录页」', '`router/RequireAuth.tsx`', '决定 URL 能不能访问，属于路由层'],
              ['「所有请求自动带 token」', '`api/request.ts` 的拦截器', '全项目统一的请求行为'],
              ['一段中文文案', '`locales/zh-CN.json`', '给用户看的文案一律进词典'],
            ],
            note: '还有一条兜底规则：**实在拿不定主意，就先放在用它的页面文件夹里。** 等到第二个地方也要用时，再往下层挪——这比一开始就过度设计强得多。',
          },
          {
            type: 'list',
            title: '2.7 常见烂架构反例（对着改）',
            intro: '下面每一条我都在真实项目里见过，按严重程度排序：',
            ordered: true,
            items: [
              '**`components/` 变成垃圾场**：40 个平铺的文件，一半只被一个页面用过一次。→ 只被一个页面用的，挪回那个页面文件夹。',
              '**组件里裸写 `axios.get(\'http://192.168.1.7:8080/user/list\')`**：换环境要全局搜索，加 token 要改几十处。→ 一律走 `api/` 层（本章「网络请求」那节）。',
              '**`utils/request.ts` 里 import 了 `store`**：底层依赖上层，导致循环引用，打包时报 `Cannot access before initialization`。→ 需要 token 就从 `localStorage` 读，别从 store 读。',
              '**页面文件 1200 行**：请求、表格列、弹窗表单、权限判断全在一个 `index.tsx` 里。→ 列配置抽 `columns.tsx`，弹窗抽同目录组件，请求抽 `api/`。',
              '**接口字段直接铺满全项目**：`user.user_name` 在 20 个组件里出现，后端改名就是灾难。→ 在 `api/` 层做一次字段转换，对外只暴露自己定义的类型。',
              '**什么都塞进 Redux**：搜索框的输入值、弹窗的开关状态也进全局 store，一个字符触发全站重渲染。→ 只有跨页面共享的才进 store（本章「全局状态」那节）。',
              '**目录按「技术」分而不是按「业务」分**：`hooks/` 里有 30 个 hook，`components/` 里有 40 个组件，但看不出哪些属于用户模块。→ 页面级的东西按业务聚合在 `pages/xxx/` 下。',
              '**没有 `types/`，到处 `any`**：TS 装了但一个类型没写，等于白装。→ 至少把接口返回值类型写全。',
            ],
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：点目录树的节点，看这一层能 import 谁',
            body: `import { useState } from 'react' // 记住当前点中了哪个目录
import { Tree, Card, Tag, Space, Alert } from 'antd' // Tree 画目录，Card 显示职责

// 每个目录的说明：职责、能 import 谁、不能 import 谁
const INFO: Record<string, { desc: string; can: string; cannot: string }> = {
  pages: { desc: '业务页面，地址栏能直接访问到', can: 'layouts / components / hooks / api / store / utils / types', cannot: '别的 page（同层不要互相 import）' },
  layouts: { desc: '页面外壳：菜单 + 顶部栏 + Outlet', can: 'components / hooks / store / utils', cannot: 'pages（外壳不该知道具体页面内容）' },
  router: { desc: '路由表和守卫，决定哪个 URL 显示哪个页面', can: 'pages / layouts / store / config', cannot: '被 components 或 utils 反向 import' },
  components: { desc: '跨页面复用的通用组件，不含业务', can: 'hooks / utils / types / config', cannot: 'pages / api（依赖了业务就不通用了）' },
  hooks: { desc: '带状态的可复用逻辑（有 useState/useEffect）', can: 'api / store / utils / types', cannot: 'pages / components（会造成循环引用）' },
  api: { desc: '所有 HTTP 请求，全项目唯一出口', can: 'utils / types / config', cannot: 'pages / components / store' },
  store: { desc: '跨页面共享的全局状态', can: 'api / utils / types', cannot: 'pages / components' },
  utils: { desc: '纯函数：同样输入永远同样输出', can: '只能 import 其它 utils 和 types', cannot: 'React、axios、store、任何业务代码' },
  types: { desc: '只有 interface / type，编译后完全消失', can: '只能 import 其它 types', cannot: '任何会运行的代码' },
}

// Tree 需要的数据格式：title 显示文字，key 用来查上面的 INFO
const treeData = [
  { title: 'src', key: 'src', children: Object.keys(INFO).map((k) => ({ title: k + '/', key: k })) },
]

export default function Demo() {
  const [selected, setSelected] = useState('pages') // 默认选中 pages
  const info = INFO[selected] // 取出当前目录的说明；选到 src 时是 undefined

  return (
    <Space vertical size={12} style={{ width: '100%' }}>
      <Alert type="info" showIcon title="点击左边任意一层，看它的职责和依赖规则" />
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {/* Tree 的 onSelect 第一个参数是选中的 key 数组，可能为空（再点一次取消选中） */}
        <Tree
          defaultExpandAll // 默认把 src 展开，省一次点击
          selectedKeys={[selected]} // 受控高亮
          treeData={treeData}
          onSelect={(keys) => { if (keys.length) setSelected(String(keys[0])) }}
          style={{ minWidth: 160 }}
        />
        <Card size="small" title={selected + '/'} style={{ flex: 1, minWidth: 260 }}>
          {info ? (
            <Space vertical size={8} style={{ width: '100%' }}>
              <div>{info.desc}</div>
              <div><Tag color="green">可以 import</Tag> {info.can}</div>
              <div><Tag color="red">不能 import</Tag> {info.cannot}</div>
            </Space>
          ) : (
            <div>src 是源码根目录，点它下面的某一层看看。</div>
          )}
        </Card>
      </div>
    </Space>
  )
}`,
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '目录 = 依赖方向图。`pages` 在最上面可以随便改，`utils` / `types` 在最底下必须最稳定，箭头**只能从上往下**。新需求先查 2.6 的决策表；拿不定主意就先放页面文件夹里，等第二个人要用时再往下挪。',
          },
        ],
      },
    },
    {
      id: 'project-tooling',
      title: '脚手架与工程化：Vite、路径别名、代理、环境变量、代码规范',
      summary: '为什么新项目都用 Vite；vite.config.ts 的 alias 和 proxy；三个 .env 文件；eslint + prettier + husky',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '新项目用 `npm create vite@latest`；`vite.config.ts` 里配两件事——**别名 `@` 指向 `src`** 和 **`server.proxy` 解决开发跨域**；接口地址一律走 `.env` 文件，代码里用 `import.meta.env.VITE_XXX` 读；提交前用 husky + lint-staged 自动格式化。',
          },
          {
            type: 'text',
            title: '3.1 为什么现在新项目都用 Vite',
            body: '本笔记前面的章节用的是 **CRA（Create React App）**，因为它配置少、适合学语法。但真做项目要知道一件事：**CRA 已经在 2023 年被官方标记为不再推荐**，React 官方文档现在直接推荐 Vite、Next.js 这类方案。\n\n差别最直观的是**启动速度**。CRA 基于 webpack，启动时要把整个项目打包一遍，项目一大就要等 30 秒以上。Vite 利用浏览器原生支持 ES Module 的特性，启动时**几乎不打包**，只在浏览器请求某个文件时按需编译那一个文件——所以冷启动通常在 1 秒内，改一行代码热更新是毫秒级。\n\n另一个现实问题是 **CRA 的依赖已经很旧**。装 CRA 项目常见几十条 npm 安全警告，而且 `react-scripts` 锁死了 webpack 版本，你想升级什么都动不了。',
          },
          {
            type: 'table',
            title: '3.2 Vite vs CRA 对照',
            intro: '如果你手上是老的 CRA 项目也不用慌，语法完全一样，差别只在配置文件和环境变量前缀。',
            headers: ['对比项', 'Create React App', 'Vite'],
            rows: [
              ['维护状态', '**已停止推荐**，依赖陈旧', '活跃维护，社区默认选择'],
              ['冷启动（中型项目）', '20～60 秒', '**1 秒内**'],
              ['热更新速度', '1～5 秒', '毫秒级（只编译改动的文件）'],
              ['配置文件', '藏在 `react-scripts` 里，要改得 `eject`', '`vite.config.ts`，直接改'],
              ['环境变量前缀', '`REACT_APP_`', '`VITE_`'],
              ['读环境变量', '`process.env.REACT_APP_X`', '`import.meta.env.VITE_X`'],
              ['入口 HTML 位置', '`public/index.html`', '**根目录** `index.html`'],
              ['开发代理配置', '`package.json` 的 `proxy` 字段', '`vite.config.ts` 的 `server.proxy`'],
              ['产物目录', '`build/`', '`dist/`'],
              ['构建工具', 'webpack', 'Rollup（生产）+ esbuild（开发）'],
            ],
            note: '迁移一个 CRA 项目到 Vite 通常只要半天：改入口 HTML 位置、把 `REACT_APP_` 批量替换成 `VITE_`、把 `process.env` 换成 `import.meta.env`、把 `proxy` 搬进 `vite.config.ts`。',
          },
          {
            type: 'code',
            title: '3.3 创建项目：三条命令跑起来',
            language: 'bash',
            body: `# ① 创建项目：react-ts 表示「React + TypeScript」模板
#    最后的 -- 是分隔符，把后面的参数传给 create-vite 而不是 npm
npm create vite@latest admin-system -- --template react-ts

cd admin-system   # 进入项目目录
npm install       # 安装依赖（Vite 模板不会自动装，必须手动跑）
npm run dev       # 启动开发服务器，默认 http://localhost:5173

# ② 装本章要用的业务依赖（一次装齐，省得来回装）
npm install antd @ant-design/icons dayjs          # UI 组件库 + 图标 + 日期库
npm install react-router-dom                      # 路由
npm install axios                                 # HTTP 客户端
npm install @reduxjs/toolkit react-redux          # 全局状态
npm install i18next react-i18next                 # 国际化

# ③ 装开发期工具（-D 表示只在开发时用，不会打进生产包）
npm install -D eslint prettier eslint-config-prettier eslint-plugin-prettier
npm install -D husky lint-staged                  # Git 提交前自动检查
npm install -D @types/node                        # 让 vite.config.ts 里能用 path 模块

# ④ 看一眼版本，确认和教程一致
npm list antd react-router-dom axios`,
          },
          {
            type: 'code',
            title: '3.4 `vite.config.ts`：只配两件事，但都很关键',
            language: 'ts',
            body: `import { defineConfig } from 'vite' // defineConfig 只是为了让编辑器有类型提示
import react from '@vitejs/plugin-react' // 让 Vite 认识 JSX 和 React 热更新
import path from 'path' // Node 内置模块，用来拼绝对路径（需要 @types/node）

export default defineConfig({
  plugins: [react()], // 插件数组，React 项目至少要这一个

  // ===== 关键点 ①：路径别名 =====
  resolve: {
    alias: {
      // 把 '@' 映射到 src 目录的绝对路径
      // 配完之后 import x from '@/api/user' 就等于 import x from 'src/api/user'
      // __dirname 是当前配置文件所在目录，也就是项目根目录
      '@': path.resolve(__dirname, './src'),
    },
  },

  // ===== 关键点 ②：开发服务器与跨域代理 =====
  server: {
    port: 3000, // 开发端口，不写默认 5173
    open: true, // 启动后自动打开浏览器
    proxy: {
      // 意思是：所有以 /api 开头的请求，都由 Vite 转发给下面的 target
      '/api': {
        target: 'http://127.0.0.1:8080', // 后端真实地址（本地或测试环境）
        changeOrigin: true, // 把请求头里的 Host 改成 target 的域名，很多后端会校验这个
        // 后端接口如果本身没有 /api 前缀，就用 rewrite 把它去掉
        // 请求 /api/user/list  →  实际转发到 http://127.0.0.1:8080/user/list
        rewrite: (p) => p.replace(/^\\/api/, ''),
      },
    },
  },

  build: {
    outDir: 'dist', // 产物目录，默认就是 dist
    sourcemap: false, // 生产不产出 sourcemap，避免源码泄露（要排查线上问题可临时开）
  },
})`,
          },
          {
            type: 'text',
            title: '3.5 为什么需要别名 `@`',
            body: '不配别名时，`pages/UserList/index.tsx` 里要引用 `src/api/user.ts`，得写成 `import { getUserList } from \'../../api/user\'`。\n\n这有三个问题：\n\n- **数不清几个 `../`**：层级一深就要一层层数，非常容易多一个少一个\n- **移动文件就全崩**：把这个页面挪到别的目录，所有相对路径都要重算\n- **看不出来引的是什么**：`../../../utils/format` 完全看不出这是项目里的哪一层\n\n配了别名之后统一写 `@/api/user`，无论文件在多深的目录里，这个路径都不变。\n\n**注意：别名要配两处才完整。** `vite.config.ts` 管「打包时能不能找到文件」，`tsconfig.json` 管「编辑器和 TS 检查时能不能找到类型」。只配一处的典型症状是：项目能跑起来，但编辑器满屏红线（或者反过来，编辑器不报错但 `npm run build` 失败）。',
          },
          {
            type: 'code',
            title: '3.6 `tsconfig.json` 里也要配一遍别名',
            language: 'json',
            body: `{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },

    "types": ["vite/client"]
  },
  "include": ["src", "vite.config.ts"]
}`,
          },
          {
            type: 'text',
            title: '3.7 `server.proxy` 到底解决了什么',
            body: '开发时 React 跑在 `localhost:3000`，后端跑在 `127.0.0.1:8080`。浏览器认为这是**两个不同的源**，直接请求会被拦住，控制台报 `blocked by CORS policy`。\n\n解决办法有两种：\n\n**① 让后端加 CORS 响应头。** 最正规，但要麻烦后端，而且很多公司的测试环境不允许改。\n\n**② 用开发服务器代理。** 你的代码请求 `localhost:3000/api/user/list`（同源，浏览器不管），Vite 开发服务器在**服务端**把这个请求转发到 `127.0.0.1:8080/user/list`。服务端之间的请求没有跨域概念，所以畅通无阻。\n\n有三个必须记住的点：\n\n- **proxy 只在开发时生效。** `npm run build` 出来的静态文件里没有 Vite，线上必须靠 nginx 反向代理或者后端开 CORS（本章「性能、质量与上线」那节讲 nginx 配置）\n- **`changeOrigin: true` 基本要一直开。** 不开的话转发过去的请求头里 Host 还是 `localhost:3000`，很多后端框架会因此拒绝\n- **`rewrite` 看后端接口有没有 `/api` 前缀。** 后端路径是 `/user/list` 就要 rewrite 去掉；后端本身就是 `/api/user/list` 就不要 rewrite',
          },
          {
            type: 'code',
            title: '3.8 环境变量：三个 `.env` 文件',
            language: 'text',
            body: `admin-system/
├── .env                  ← 所有环境都生效的公共变量（一般放应用名这类）
├── .env.development      ← 只在 npm run dev 时生效
├── .env.production       ← 只在 npm run build 时生效
├── .env.local            ← 你自己电脑上的私人覆盖，必须写进 .gitignore
└── .gitignore            ← 一定要包含 .env.local，避免把个人配置提交上去

# ===================== .env（公共） =====================
VITE_APP_TITLE=后台管理系统

# ================ .env.development（开发） ===============
# 走 vite proxy，所以只写 /api 这个前缀，不写域名
VITE_API_BASE_URL=/api
# 开发环境打开调试面板、打印请求日志
VITE_USE_MOCK=true

# ================ .env.production（生产） ================
# 上线用真实域名（或者由 nginx 反代的同域路径）
VITE_API_BASE_URL=https://api.example.com
VITE_USE_MOCK=false

# ⚠️ 三条铁律
# 1. 变量名必须以 VITE_ 开头，否则代码里读不到（Vite 故意的，防止误把服务器密钥打进前端包）
# 2. .env 里的值全都是字符串："false" 是一个非空字符串，if 判断它永远为真
# 3. 这些值会被明文打进 JS 产物，用户在浏览器里能看到 —— 绝对不要放数据库密码、私钥`,
          },
          {
            type: 'table',
            title: '3.9 环境变量写法对照（CRA / Vite）',
            intro: '这是从 CRA 转 Vite 时最容易踩的坑，两套写法完全不通用。',
            headers: ['能力', 'CRA', 'Vite'],
            rows: [
              ['变量前缀', '`REACT_APP_`', '`VITE_`'],
              ['代码里读取', '`process.env.REACT_APP_API_URL`', '`import.meta.env.VITE_API_URL`'],
              ['当前是不是开发环境', '`process.env.NODE_ENV === \'development\'`', '`import.meta.env.DEV`（布尔值）'],
              ['当前是不是生产环境', '`process.env.NODE_ENV === \'production\'`', '`import.meta.env.PROD`（布尔值）'],
              ['模式名', '`process.env.NODE_ENV`', '`import.meta.env.MODE`（`development` / `production`）'],
              ['类型提示', '要手写 `react-app-env.d.ts`', '`tsconfig` 里加 `"types": ["vite/client"]`'],
              ['指定自定义模式', '不方便', '`vite build --mode staging` 会读 `.env.staging`'],
            ],
            note: '`import.meta.env` 是 ES Module 的标准语法，**只有被 Vite 编译过的文件里才能用**——在 `vite.config.ts` 里要用 `loadEnv()` 而不是 `import.meta.env`。',
          },
          {
            type: 'code',
            title: '3.10 把环境变量收拢成一个 `config/env.ts`',
            language: 'ts',
            body: `/**
 * 为什么不直接在业务代码里写 import.meta.env.VITE_API_BASE_URL？
 * ① 变量名写错了不会报错，只会拿到 undefined，排查半天
 * ② 全都是字符串，需要布尔值时到处写 === 'true' 很啰嗦
 * ③ 想加默认值、想加校验，只能在这一个文件里做
 * 所以：全项目只有这一个文件碰 import.meta.env，其它地方 import 这里的 env
 */

// 小工具：把 "true" / "false" 这种字符串转成真正的布尔值
function toBool(value: string | undefined, fallback = false): boolean {
  if (value === undefined) return fallback
  return value === 'true' // 注意：非空字符串 "false" 在 if 里是 true，所以必须显式比较
}

export const env = {
  // 应用标题：给 document.title 和登录页用
  appTitle: import.meta.env.VITE_APP_TITLE ?? '后台管理系统',

  // 接口前缀：开发是 '/api'（走 proxy），生产是真实域名
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',

  // 是否启用 Mock 数据
  useMock: toBool(import.meta.env.VITE_USE_MOCK, false),

  // Vite 内置的两个布尔值，不需要自己在 .env 里写
  isDev: import.meta.env.DEV, // npm run dev 时为 true
  isProd: import.meta.env.PROD, // npm run build 时为 true
}

// 启动时检查关键变量有没有配，缺了就在控制台大声报错
// 比上线后发现「请求全打到了 undefined/user/list」要好得多
if (!import.meta.env.VITE_API_BASE_URL) {
  console.error('[env] 缺少 VITE_API_BASE_URL，请检查 .env 文件')
}

// 用法：import { env } from '@/config/env'
//      axios.create({ baseURL: env.apiBaseUrl })`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：切换环境，看接口地址怎么变',
            body: `import { useState } from 'react' // 用 state 模拟「当前处于哪个环境」
import { Segmented, Card, Descriptions, Tag, Space, Alert } from 'antd'

// 模拟三个 .env 文件的内容（真实项目里这是三个文本文件，不是 JS 对象）
const ENV_FILES: Record<string, Record<string, string>> = {
  development: { VITE_APP_TITLE: '后台管理系统', VITE_API_BASE_URL: '/api', VITE_USE_MOCK: 'true' },
  staging: { VITE_APP_TITLE: '后台管理系统(测试)', VITE_API_BASE_URL: 'https://test-api.example.com', VITE_USE_MOCK: 'false' },
  production: { VITE_APP_TITLE: '后台管理系统', VITE_API_BASE_URL: 'https://api.example.com', VITE_USE_MOCK: 'false' },
}

export default function Demo() {
  const [mode, setMode] = useState('development') // 当前模式，对应 vite --mode 参数
  const raw = ENV_FILES[mode] // 取出这个模式下的原始字符串值

  // 模仿 config/env.ts 做的事：补默认值 + 把 "true"/"false" 转成真布尔值
  const env = {
    appTitle: raw.VITE_APP_TITLE ?? '后台管理系统',
    apiBaseUrl: raw.VITE_API_BASE_URL ?? '/api',
    useMock: raw.VITE_USE_MOCK === 'true', // ★ 必须显式比较，不能直接 if (raw.VITE_USE_MOCK)
    isDev: mode === 'development',
  }

  // 最终发出去的请求地址 = baseURL + 接口路径
  const finalUrl = env.apiBaseUrl + '/user/list'

  return (
    <Space vertical size={12} style={{ width: '100%' }}>
      {/* Segmented 就是一个分段选择器，用来切换模式 */}
      <Segmented
        block
        value={mode}
        onChange={(v) => setMode(String(v))}
        options={[
          { value: 'development', label: 'npm run dev' },
          { value: 'staging', label: 'build --mode staging' },
          { value: 'production', label: 'npm run build' },
        ]}
      />

      <Card size="small" title={'.env.' + mode + ' 里的原始内容（全都是字符串）'}>
        {/* pre 保留换行，把 .env 文件的样子还原出来 */}
        <pre style={{ margin: 0, fontSize: 12, lineHeight: 1.8 }}>
          {Object.keys(raw).map((k) => k + '=' + raw[k]).join('\\n')}
        </pre>
      </Card>

      <Card size="small" title="代码里通过 config/env.ts 读到的值">
        <Descriptions
          column={1}
          size="small"
          items={[
            { key: '1', label: 'env.appTitle', children: env.appTitle },
            { key: '2', label: 'env.apiBaseUrl', children: env.apiBaseUrl },
            // 布尔值要转成字符串才能渲染，直接放 false 的话 React 什么都不显示
            { key: '3', label: 'env.useMock', children: <Tag color={env.useMock ? 'green' : 'default'}>{String(env.useMock)}</Tag> },
            { key: '4', label: 'env.isDev', children: <Tag color={env.isDev ? 'blue' : 'default'}>{String(env.isDev)}</Tag> },
            { key: '5', label: '实际请求地址', children: <code>{finalUrl}</code> },
          ]}
        />
      </Card>

      <Alert
        type={env.isDev ? 'info' : 'warning'}
        showIcon
        title={env.isDev ? '开发环境：/api 是相对路径，会被 vite proxy 转发到后端' : '生产环境：必须是完整域名，因为线上没有 vite proxy'}
      />
    </Space>
  )
}`,
          },
          {
            type: 'code',
            title: '3.11 代码规范：eslint 管对错，prettier 管美丑',
            language: 'json',
            body: `// ===== .prettierrc（格式化规则，团队统一，避免「你改了整个文件」的 diff） =====
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "es5",
  "arrowParens": "always",
  "endOfLine": "lf"
}

// ===== .eslintrc.cjs 的核心部分（ESLint 9 用 eslint.config.js，思路一样） =====
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "rules": {
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}

// ===== package.json：脚本 + lint-staged =====
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write \\"src/**/*.{ts,tsx,css,json}\\"",
    "type-check": "tsc --noEmit",
    "prepare": "husky"
  },
  "lint-staged": {
    "src/**/*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "src/**/*.{css,json,md}": ["prettier --write"]
  }
}`,
          },
          {
            type: 'text',
            title: '3.12 四个工具各管什么',
            body: '这四个名字经常一起出现，但职责完全不同：\n\n**ESLint —— 管「写得对不对」。** 它检查代码里的潜在错误：变量声明了没用、`useEffect` 依赖数组漏了东西、用了 `any`。它关心**逻辑风险**。\n\n**Prettier —— 管「写得好不好看」。** 它只负责排版：缩进几个空格、要不要分号、单引号还是双引号、多长要换行。它**完全不关心逻辑**。\n\n为什么要两个？因为如果让 ESLint 也管格式，两个工具的规则会互相打架（保存时你会看到代码来回抖动）。标准做法就是上面配置里的 `"prettier"`：它会关掉 ESLint 里所有和格式有关的规则，让两者各管一段。\n\n**husky —— 管「什么时候检查」。** 它往 `.git/hooks` 里装钩子，让你 `git commit` 时自动跑一段脚本。\n\n**lint-staged —— 管「检查哪些文件」。** 只检查这次 `git add` 进暂存区的文件。这一点很关键：老项目有几千个文件，每次提交全量 lint 要等好几分钟，没人受得了。',
          },
          {
            type: 'code',
            title: '3.13 husky + lint-staged 配置（三条命令）',
            language: 'bash',
            body: `# ① 初始化 husky（会创建 .husky/ 目录，并往 package.json 加 "prepare" 脚本）
npx husky init

# ② 把 pre-commit 钩子的内容改成跑 lint-staged
#    pre-commit 的意思是「在 git commit 真正生成提交之前」执行
echo "npx lint-staged" > .husky/pre-commit

# ③ 验证：随便改一个文件，故意写成很难看的格式，然后提交
git add src/App.tsx
git commit -m "test husky"
# 你会看到 lint-staged 自动跑 eslint --fix 和 prettier --write，
# 格式问题被自动修好并一起提交；如果有 ESLint 报错（不是警告），提交会被拦下来

# ⚠️ 常见问题
# - 钩子不生效：确认 .husky/pre-commit 文件存在，且 package.json 里有 "prepare": "husky"
# - 队友拉代码后钩子没装上：npm install 会自动跑 prepare，所以让他重新 npm install
# - 紧急情况要跳过检查：git commit --no-verify（别养成习惯）`,
          },
          {
            type: 'list',
            title: '3.14 这一节的易错点',
            intro: '按踩到的频率排序：',
            ordered: true,
            items: [
              '**环境变量忘了 `VITE_` 前缀**：写成 `API_BASE_URL=xxx`，代码里读到 `undefined`，请求全打到 `undefined/user/list`。',
              '**别名只配了一处**：只配 `vite.config.ts` → 编辑器满屏红线；只配 `tsconfig.json` → 能通过类型检查但 `npm run dev` 报找不到模块。**两处都要配**。',
              '**把 `.env` 当保险箱**：所有 `VITE_` 变量都会明文打进 JS 产物，浏览器里能直接看到。密钥类的东西必须放后端。',
              '**用 `if (import.meta.env.VITE_USE_MOCK)` 判断开关**：`.env` 里的值全是字符串，`"false"` 是非空字符串，永远为真。必须写 `=== \'true\'`。',
              '**改了 `.env` 没重启**：环境变量是在启动时读进去的，改完必须重启 `npm run dev`。',
              '**以为线上也有 proxy**：`server.proxy` 只属于开发服务器，打包后完全不存在。线上跨域要靠 nginx 或后端 CORS。',
              '**`vite.config.ts` 里写 `import.meta.env`**：配置文件运行在 Node 里，不是被 Vite 编译的业务代码，要用 `loadEnv(mode, process.cwd())`。',
              '**入口 HTML 还放在 `public/`**：Vite 的 `index.html` 在**项目根目录**，放错位置会白屏。',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '`npm create vite@latest` 起项目；`vite.config.ts` 配 `alias` 和 `server.proxy`（别名记得在 `tsconfig.json` 也配一遍）；接口地址进 `.env`，前缀必须 `VITE_`，用 `import.meta.env` 读，并收拢到 `config/env.ts`；ESLint 管对错、Prettier 管美丑、husky 管时机、lint-staged 管范围。',
          },
        ],
      },
    },
    ...projectMoreItems,
  ],
}

export default projectGuide
