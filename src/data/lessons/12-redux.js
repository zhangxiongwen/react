/**
 * Redux 章节：从「什么时候用」到「完整跑通计数器 Demo」
 * 拆成多个条目，每个条目：一句话记住 → 分步讲解 → 代码 → 对比 → 自检
 */
const redux = {
  id: 'redux',
  title: 'Redux 状态管理',
  summary:
    'useState / Context / Redux 怎么选；state / action / reducer 三词；Toolkit 建 store；Provider；useSelector / useDispatch 完整用法',
  order: 13,
  items: [
    {
      id: 'redux-when-to-use',
      title: '什么时候用 Redux？和 useState、Context 怎么选',
      summary:
        '先 props / useState，再 Context，最后才是 Redux——按「共享范围 + 更新复杂度」升级',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '数据只在一个组件里用 → useState；少数几层组件共享、更新不复杂 → props 或 Context；很多页面很多组件都要读写同一份数据、更新规则复杂 → 考虑 Redux。',
          },
          {
            type: 'text',
            title: '1）先理解：React 里「状态」本来就有三种常见归宿',
            body: '初学者容易一学 Redux 就想全项目都用，其实大多数页面 80% 的状态用 useState 就够了。React 官方推荐的升级路径是：① 组件自己的数据 → useState；② 父子/兄弟之间 → props 传递 + 状态提升（前面「组件通信」章节讲过）；③ 跨很多层、但更新简单（比如主题色、语言）→ Context；④ 全局业务数据、多人协作、更新规则多 → Redux（或 Zustand 等）。\n\nRedux 不是「更高级的就一定更好」，而是「全局仓库 + 统一改法」这套模式。小项目硬上 Redux，代码量反而变多。',
          },
          {
            type: 'text',
            title: '2）useState 适合什么？',
            body: '特点：写法最简单，和组件绑在一起，改完自动重渲染。\n\n适合：表单输入、弹窗开关、当前 Tab、某个列表页的筛选条件——总之「只有这个组件（或父子两三个组件）关心」的数据。\n\n不适合：登录用户信息、购物车、全站未读消息数——这些在 Header、侧边栏、详情页、结算页都要读，用 useState 就要一层层 props 往下传，或者到处复制 state，很快乱掉。',
          },
          {
            type: 'text',
            title: '3）Context 适合什么？',
            body: '特点：在树的上层 Provider 存一份值，下层任意组件 useContext 读取，不用 props 钻洞。\n\n适合：主题（暗色/亮色）、国际化语言、当前登录用户「只读展示」、Layout 里需要的少量配置。更新频率低、读写规则简单时 Context 很合适。\n\n局限：Context 的值一变，所有消费它的组件都会重渲染（除非配合 memo 等优化）；复杂业务如果「很多地方都要改同一份数据、还要记录历史、做中间件」，Context 没有 Redux 那套 action / reducer 的规范，大团队难维护。',
          },
          {
            type: 'text',
            title: '4）Redux 适合什么？',
            body: '特点：全应用一个 store（仓库），所有改 state 的操作必须走 dispatch(action)，由 reducer 纯函数算出下一状态。改法集中、可预测、方便调试（Redux DevTools 能看每次 action）。\n\n适合：购物车（多个页面加减商品）、权限 + 用户信息（很多路由都要判断）、复杂表单 wizard、需要「时间旅行调试」的中大型项目。\n\n不必用：单个计数器 demo、只有一个页面的 todo、只在父子之间传的数据——用 useState 或 props 更清晰。',
          },
          {
            type: 'table',
            title: '对比表：useState vs Context vs Redux',
            intro: '按列看「你的场景更像哪一格」，别死记硬背，对照「数据谁用、怎么改、团队规模」来判断。',
            headers: ['维度', 'useState', 'Context', 'Redux (Toolkit)'],
            rows: [
              [
                '数据共享范围',
                '单个组件（或父传子）',
                '跨多层组件，同一棵子树',
                '全应用任意组件',
              ],
              [
                '写法复杂度',
                '最低',
                '中等（Provider + createContext）',
                '较高（slice + store + Hook）',
              ],
              [
                '更新方式',
                'setState 直接改',
                'Provider 的 value 里 setState',
                'dispatch(action)，reducer 统一改',
              ],
              [
                '典型场景',
                '表单、弹窗、局部 UI',
                '主题、语言、简单全局配置',
                '购物车、登录态、复杂业务状态',
              ],
              [
                '调试 / 可追溯',
                'React DevTools 看组件 state',
                '较难追踪「谁改的」',
                'DevTools 看每条 action 前后 state',
              ],
              [
                '本项目建议',
                '默认首选',
                '主题切换等已学过',
                '全局业务数据再用（本章 counter 是入门）',
              ],
            ],
            note: '口诀：能 props 就不 Context，能 Context 就不 Redux。Redux 解决的是「全局 + 规范 + 可维护」，不是「让计数器能 +1」。',
          },
          {
            type: 'list',
            title: '5）自检：我是否需要 Redux？',
            ordered: true,
            intro: '下面任一条打勾很多，再认真考虑 Redux；否则继续 useState / Context。',
            items: [
              '同一份数据在 5 个以上互不相关的组件里都要读或写',
              '多个页面路由都要依赖这份数据（如登录用户、购物车）',
              '希望「怎么改数据」有统一规范，新人看 reducer 就知道有哪些合法操作',
              '需要时间旅行调试、或中间件（日志、持久化到 localStorage）',
              'props 钻洞已经让 JSX 充满无关 props，状态提升也救不了',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'useState = 自家抽屉；Context = 全楼广播；Redux = 中央仓库 + 出库单（action）+ 管理员（reducer）。先抽屉，不够再广播，还不够再仓库。',
          },
        ],
      },
    },
    {
      id: 'redux-core-concepts',
      title: '三个核心词：state、action、reducer（用类比一次搞懂）',
      summary:
        'state 是仓库里的货；action 是出库/入库单；reducer 是管理员按单据改库存',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'state = 当前数据长什么样；action = 描述「想做什么改动」的 plain object；reducer = (旧 state, action) => 新 state 的纯函数。在 React 里：useSelector 读 state，dispatch(action) 触发 reducer 改 state。',
          },
          {
            type: 'text',
            title: '1）state —— 仓库里「现在有什么」',
            body: '是什么：一个普通的 JavaScript 对象（或数组），存放应用当前要管理的业务数据。在本项目 counter 例子里，state 长这样：{ counter: { value: 0 } }。最外层 key counter 来自 configureStore 里 reducer 的注册名；里面的 value 是 slice 的 initialState。\n\n特点：整个应用通常只有一棵 state 树（一个 store），所有组件读的是同一份「真相来源」（single source of truth）。\n\n为什么重要：界面只是 state 的投影——state 变了，订阅它的组件就重渲染。不要同时在组件 useState 和 Redux 各存一份 count，会不同步。',
          },
          {
            type: 'text',
            title: '2）action —— 描述「想怎么改」的指令',
            body: '是什么：一个普通对象，至少要有 type 字段，表示「哪一种改法」。用 Redux Toolkit 的 createSlice 时，你写 increment()，Toolkit 会自动生成 type 为 \'counter/increment\' 的 action。\n\n带参数时：dispatch(incrementByAmount(5)) 会发出 { type: \'counter/incrementByAmount\', payload: 5 }。payload 就是附加数据。\n\n特点：action 本身不改 state，它只是「意图/事件描述」。像快递单：写「入库 +5 件」，不是直接去搬货。\n\n类比：收银员下单 —— 「给顾客 counter 加 1」这张单，不是顾客自己去改仓库数字。',
          },
          {
            type: 'text',
            title: '3）reducer —— 根据 action 算出「新 state」',
            body: '是什么：函数签名 (state, action) => newState。收到 action 后，根据 type 决定怎么改，返回新的 state 对象。\n\n特点：必须是纯函数——同样的 state + 同样的 action，永远得到同样的结果；不能发请求、不能 Math.random、不能直接改参数里的旧 state（Toolkit 里看起来在改 state，其实是 Immer 帮你生成新对象，后面会讲）。\n\n为什么：纯函数好测试、好回放。Redux DevTools 能把你 dispatch 的 action 一条条重放，就是因为 reducer 可预测。\n\n类比：仓库管理员 —— 看到「入库 +5」的单子，在台账上算出新库存，把新台账交给 store。',
          },
          {
            type: 'code',
            title: '4）三个词串起来（伪代码，对应本项目 counter）',
            language: 'javascript',
            body: `// state（当前）
const state = { counter: { value: 0 } }

// action（用户点了 +5）
const action = { type: 'counter/incrementByAmount', payload: 5 }

// reducer（管理员算账）
function counterReducer(state, action) {
  if (action.type === 'counter/incrementByAmount') {
    return { ...state, value: state.value + action.payload }
  }
  return state
}

// 新 state
// { counter: { value: 5 } }

// React 里你不手写上面这些——createSlice 全包了；
// 组件里只做两件事：
//   const value = useSelector(s => s.counter.value)
//   dispatch(incrementByAmount(5))`,
          },
          {
            type: 'table',
            title: '5）对照表：三个词各自回答什么问题',
            headers: ['词', '回答的问题', '在本项目里对应什么'],
            rows: [
              ['state', '现在数据是多少？', 'store 里的 counter.value'],
              ['action', '发生了什么事件/想做什么？', 'increment()、incrementByAmount(5)'],
              ['reducer', '这个事件后数据变成多少？', 'counterSlice 里 reducers 对象中的函数'],
            ],
          },
          {
            type: 'text',
            title: '6）和 useState 对比：改数据的「入口」不同',
            body: 'useState：setCount(c => c + 1)，在组件里直接改。\n\nRedux：组件 dispatch(increment())，改法写在 slice 的 reducer 里，组件不碰 state 对象本身。\n\n好处：所有「合法改法」都在 slice 里一目了然；坏处：多写几个文件。小 demo 用 useState 更短；全局业务用 Redux 更整齐。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '读 state 用 useSelector，改 state 用 dispatch(action)，action 交给 reducer 算新 state——组件永远不直接改 store。',
          },
        ],
      },
    },
    {
      id: 'redux-install',
      title: '安装两个库：@reduxjs/toolkit 和 react-redux 各干什么',
      summary:
        'Toolkit 写 store 和 slice；react-redux 把 store 接到 React（Provider、Hook）',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '@reduxjs/toolkit = 写 Redux 逻辑（createSlice、configureStore）；react-redux = 让 React 组件能读写 store（Provider、useSelector、useDispatch）。两个都要装，缺一个流程跑不通。',
          },
          {
            type: 'text',
            title: '1）为什么要两个包，不是一个？',
            body: 'Redux 核心（store、reducer、dispatch）本身和 UI 框架无关，可以在 Vue、原生 JS 里用。react-redux 是官方维护的「Redux ↔ React 桥梁」：Provider 把 store 放进 React Context，useSelector / useDispatch 从 Context 里取出来用。\n\n@reduxjs/toolkit（RTK）是 Redux 团队推荐的现代写法，把 createStore、手写 action type、switch-case reducer、不可变更新样板代码都封装了。现在新项目不要再用老式的 createStore + 纯 Redux 手写 reducer 了。\n\n只装 @reduxjs/toolkit：能建 store，但 React 组件里没有 Provider / Hook。只装 react-redux：没有 createSlice / configureStore，还是要自己拼老式 API。',
          },
          {
            type: 'table',
            title: '2）两个包分工对照',
            headers: ['包名', '职责', '你会用到的 API'],
            rows: [
              [
                '@reduxjs/toolkit',
                '定义 state、改法、创建 store',
                'createSlice、configureStore、（进阶）createAsyncThunk',
              ],
              [
                'react-redux',
                'React 接入层',
                'Provider、useSelector、useDispatch、（进阶）useStore',
              ],
            ],
          },
          {
            type: 'code',
            title: '3）安装命令（本项目已安装，了解即可）',
            language: 'bash',
            body: `npm install @reduxjs/toolkit react-redux

# 装完后典型文件结构（本项目）：
# src/store/slices/counterSlice.js   ← createSlice
# src/store/index.js                 ← configureStore
# src/index.js                       ← <Provider store={store}>`,
          },
          {
            type: 'list',
            title: '4）装完后的检查清单',
            ordered: true,
            items: [
              'package.json 里能看到 @reduxjs/toolkit 和 react-redux',
              'src/store/slices/ 下有 slice 文件',
              'src/store/index.js 导出 store',
              'src/index.js 根节点有 <Provider store={store}>',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'Toolkit 造仓库，react-redux 把仓库接线到 React 树——Provider 是总开关，不包就报错。',
          },
        ],
      },
    },
    {
      id: 'redux-createSlice',
      title: 'createSlice 逐步拆解：每个字段是什么意思',
      summary:
        'name / initialState / reducers / actions / reducer 导出——一块业务一个 slice',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'createSlice = 一块业务的「初始数据 + 所有合法改法」打包；自动帮你生成 action 函数和 reducer，组件里 import actions 去 dispatch 即可。',
          },
          {
            type: 'text',
            title: '1）slice 是什么？',
            body: 'slice（切片）= store 大状态树里的一块。购物车一块、用户一块、counter 一块。每块一个文件，例如 counterSlice.js。\n\n为什么分 slice：避免一个 reducer 文件几千行 switch-case；团队协作时各改各的 slice，最后在 configureStore 里合并。',
          },
          {
            type: 'text',
            title: '2）name —— slice 的名字前缀',
            body: 'createSlice({ name: \'counter\', ... }) 里的 name 会拼进每个 action 的 type，例如 counter/increment。这样全局 store 里多个 slice 的 action 不会重名。\n\n注意：name 不等于 configureStore 里 reducer 的 key。name 管 action type 前缀；reducer 的 key（如 counter）管 state.counter 这条路径。',
          },
          {
            type: 'text',
            title: '3）initialState —— 这块数据的初始值',
            body: '第一次打开应用、或 persist 还没恢复时，这块 state 长什么样。counter 例子是 { value: 0 }。\n\n可以是对象、数组、嵌套结构。复杂业务常见：{ list: [], loading: false, error: null }。',
          },
          {
            type: 'text',
            title: '4）reducers —— 所有「合法改法」写在这里',
            body: '键名就是 action 的名字：increment、decrement、incrementByAmount。值是函数 (state, action) => { ... }。\n\n在 Toolkit 里你可以写 state.value += 1，看起来像直接修改——底层 Immer 会生成新 state，满足 Redux 不可变要求（下一节细讲）。\n\n带参数：组件 dispatch(incrementByAmount(5)) 时，第二个参数 action.payload 就是 5。多个参数一般打包成一个对象 payload。',
          },
          {
            type: 'code',
            title: '5）完整 counterSlice.js（与项目源码一致，逐段注释）',
            language: 'javascript',
            body: `import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  // name：action type 前缀 → 'counter/increment'
  name: 'counter',

  // initialState：这块 slice 的初始数据
  initialState: {
    value: 0,
  },

  // reducers：每种改法一个函数
  reducers: {
    increment(state) {
      state.value += 1
    },
    decrement(state) {
      state.value -= 1
    },
    // 带参数：dispatch(incrementByAmount(5)) → payload 为 5
    incrementByAmount(state, action) {
      state.value += action.payload
    },
    reset(state) {
      state.value = 0
    },
  },
})

// 解构出 action 创建函数，给组件 dispatch 用
export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions

// 默认导出 reducer，给 configureStore 注册
export default counterSlice.reducer`,
          },
          {
            type: 'text',
            title: '6）导出的两样东西别搞混',
            body: 'counterSlice.actions 上的 increment 等：调用后返回 action 对象，给 dispatch 用。\n\ncounterSlice.reducer：给 store 注册的纯 reducer 函数，组件一般不直接 import。\n\n常见错误：在组件里 import reducer 去 dispatch——应该 import { increment } from \'.../counterSlice\'。',
          },
          {
            type: 'code',
            title: '7）dispatch 时 action 长什么样（帮助理解 DevTools）',
            language: 'javascript',
            body: `import { increment, incrementByAmount } from './store/slices/counterSlice'

// increment() 返回：
// { type: 'counter/increment' }

// incrementByAmount(5) 返回：
// { type: 'counter/incrementByAmount', payload: 5 }

// 组件里写 dispatch(increment()) 等价于：
// dispatch({ type: 'counter/increment' })`,
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'createSlice 填 name + initialState + reducers；export actions 给组件 dispatch，export default reducer 给 store 注册。',
          },
        ],
      },
    },
    {
      id: 'redux-configureStore',
      title: 'configureStore：把多个 reducer 拼成全局 store',
      summary:
        'reducer 对象的 key 决定 state 路径；store 全应用通常只有一个',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'configureStore({ reducer: { counter: counterReducer } }) → 组件里读 state.counter.xxx；key 写错，useSelector 就 undefined。',
          },
          {
            type: 'text',
            title: '1）store 是什么？',
            body: 'store = 整个应用的 Redux 仓库实例，持有当前 state 树，提供 dispatch(getState) 等方法。React 里通过 Provider 把这一个 store 传给全树。\n\n全应用一般只 create 一次 store（在 src/store/index.js），不要在每个组件里 configureStore。',
          },
          {
            type: 'text',
            title: '2）configureStore 比老式 createStore 好在哪？',
            body: 'Toolkit 的 configureStore 默认：① 组合多个 slice reducer；② 开启 Redux DevTools；③ 加常用中间件（包括支持 thunk 的中间件）；④ 开发环境检查 accidental mutation。\n\n你只需传入 reducer 配置对象，其余 sensible defaults 都配好了。',
          },
          {
            type: 'text',
            title: '3）reducer 对象的 key 极其重要',
            body: 'configureStore({ reducer: { counter: counterReducer } }) 里，counter 这个 key 会出现在根 state 上：state.counter。\n\n因此 useSelector(state => state.counter.value) 的第一个 counter 必须和这里 key 一致。有人 slice 文件叫 counterSlice.js 但 key 写成 counters，路径就要改成 state.counters.value。\n\nkey 和 createSlice 的 name 可以不同，但初学者建议保持一致（都叫 counter），少踩坑。',
          },
          {
            type: 'code',
            title: '4）本项目 src/store/index.js',
            language: 'javascript',
            body: `import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'

export const store = configureStore({
  reducer: {
    // ★ key 'counter' → state.counter
    counter: counterReducer,
  },
})

// 以后加 user、cart：
// import userReducer from './slices/userSlice'
// reducer: { counter: counterReducer, user: userReducer }`,
          },
          {
            type: 'code',
            title: '5）合并后 state 树长什么样',
            language: 'javascript',
            body: `// 只有 counter 一个 slice 时：
{
  counter: {
    value: 0
  }
}

// 若再注册 user: userReducer，且 user slice 初始为 { name: '', loggedIn: false }：
{
  counter: { value: 0 },
  user: { name: '', loggedIn: false }
}`,
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'store 只建一次；configureStore 的 reducer key = useSelector 路径的第一段。',
          },
        ],
      },
    },
    {
      id: 'redux-provider',
      title: 'Provider：把 store 接入 React（缺了必报错）',
      summary:
        '在入口用 <Provider store={store}> 包住 App；所有 Hook 都依赖这层 Context',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'Provider 像「电源总闸」——store 必须通过 Provider 注入 React 树，子组件里的 useSelector / useDispatch 才能工作。',
          },
          {
            type: 'text',
            title: '1）Provider 做什么？',
            body: 'react-redux 的 Provider 是一个 React 组件，接收 prop store={store}，通过 React Context 把 store 向下传给所有后代组件。\n\n任何在 Provider 外面的组件调用 useSelector 会报错：could not find react-redux context value。这和 BrowserRouter 必须包在最外层是同一类问题。',
          },
          {
            type: 'text',
            title: '2）应该包在哪一层？',
            body: '惯例：在 src/index.js（或 main.jsx）里，尽量靠外。本项目顺序是：React.StrictMode → Provider → BrowserRouter → App。\n\nProvider 和 BrowserRouter 谁先谁后通常都可以，只要 App 及其子组件同时在两者内部。常见写法：Provider 最外或紧贴 StrictMode 内层，保证整个应用共享同一份 store。',
          },
          {
            type: 'code',
            title: '3）本项目 src/index.js（已配置好）',
            language: 'jsx',
            body: `import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)`,
          },
          {
            type: 'text',
            title: '4）多个 store 可以吗？',
            body: '理论上可以嵌套多个 Provider 传不同 store，但 99% 项目只有一个全局 store。学习阶段和实战都按「一个 Provider + 一个 store」理解即可。\n\n测试里有时用 <Provider store={setupStore()}> 包单个测试组件，那是测试专用，不是生产多 store。',
          },
          {
            type: 'list',
            title: '5）Provider 相关自检',
            ordered: true,
            items: [
              'store 从 ./store 导入，不是组件里临时 configureStore',
              '<Provider store={store}> 包住了要使用 Hook 的整棵子树',
              '报错 context 时先查：当前组件是否在 Provider 外面（如单独 render 测试组件）',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '入口 Provider 包 App → store 全树可用；Hook 报错先查有没有包 Provider。',
          },
        ],
      },
    },
    {
      id: 'redux-hooks',
      title: 'useSelector 与 useDispatch 深入：读、写、坑',
      summary:
        'useSelector 订阅 state 片段；useDispatch 派发 action；路径、引用、重渲染陷阱',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '读：const x = useSelector(state => state.counter.value)；写：const dispatch = useDispatch(); dispatch(increment())。只读用 Selector，只改通过 dispatch，不要直接改 state。',
          },
          {
            type: 'text',
            title: '1）useSelector —— 从 store 里「挑」你要的数据',
            body: '签名：useSelector(selectorFn, equalityFn?)。selectorFn 接收整个根 state，返回你关心的那一小块。返回的值变了，组件重渲染；没变则不渲染（默认用 === 比较返回值）。\n\n为什么用函数挑：store 里可能有很多 slice，组件通常只需要 counter.value，不要整个 state 都订阅，否则无关 slice 变了也会重渲染。',
          },
          {
            type: 'text',
            title: '2）useDispatch —— 拿到 dispatch，用来发 action',
            body: 'const dispatch = useDispatch() 返回稳定的 dispatch 函数（引用不变）。事件里写 dispatch(increment()) 或 dispatch(incrementByAmount(n))。\n\n不要尝试 dispatch 普通对象以外的类型（除非中间件支持）；标准 flow 是 dispatch slice 导出的 action creator。',
          },
          {
            type: 'table',
            title: '3）对比表：读 vs 写 API',
            headers: ['目的', 'Hook / API', '典型写法', '不要做'],
            rows: [
              [
                '读 state',
                'useSelector',
                'useSelector(s => s.counter.value)',
                '在组件里 store.getState() 后改字段',
              ],
              [
                '写 state',
                'useDispatch + action',
                'dispatch(increment())',
                'useSelector 拿到对象后 obj.x = 1',
              ],
              [
                '拿整个 store（少用）',
                'useStore',
                'const store = useStore()',
                '滥用导致和 Hook 模式不一致',
              ],
            ],
          },
          {
            type: 'code',
            title: '4）标准用法模板',
            language: 'jsx',
            body: `import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from '../store/slices/counterSlice'

function CounterPanel() {
  const value = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <p>{value}</p>
      <button type="button" onClick={() => dispatch(increment())}>+1</button>
      <button type="button" onClick={() => dispatch(decrement())}>-1</button>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '5）坑 1：useSelector 路径写错',
            body: '错误：useSelector(s => s.counterSlice.value) —— configureStore 里没有 counterSlice 这个 key。\n\n正确：useSelector(s => s.counter.value) —— counter 是 reducer 注册 key。\n\n调试：临时 useSelector(s => s) 打印整个 state，看 key 到底叫什么。',
          },
          {
            type: 'text',
            title: '6）坑 2：selector 返回新对象导致多余渲染',
            body: '错误写法：useSelector(state => ({ value: state.counter.value })) —— 每次 render 都返回新对象 {}，=== 永远不相等，组件每次都重渲染。\n\n正确：只返回原始值 useSelector(s => s.counter.value)，或先用 reselect 的 createSelector 做 memo（进阶）。\n\n原则：selector 返回值尽量是 primitive（number、string、boolean）或稳定引用。',
          },
          {
            type: 'text',
            title: '7）坑 3：直接修改 useSelector 拿到的对象',
            body: 'const counter = useSelector(s => s.counter) 后写 counter.value = 99 —— 违反 Redux 规则，DevTools 和时间旅行会坏，StrictMode 下还可能出诡异 bug。\n\n正确：dispatch(incrementByAmount(99)) 或写专门的 setValue action。',
          },
          {
            type: 'text',
            title: '8）坑 4：在条件/循环里调 Hook',
            body: 'useSelector、useDispatch 和 useState 一样，必须在函数组件顶层调用，不能写在 if (xxx) { useSelector(...) } 里。需要条件数据时，selector 内部做判断，或 selector 始终调用、用返回值表达「要不要用」。',
          },
          {
            type: 'code',
            title: '9）易错 vs 正确（汇总）',
            language: 'jsx',
            body: `// ❌ 路径错
useSelector((s) => s.counterSlice.value)

// ✅
useSelector((s) => s.counter.value)

// ❌ 每次新对象
useSelector((s) => ({ v: s.counter.value }))

// ✅
useSelector((s) => s.counter.value)

// ❌ 直接改
const c = useSelector((s) => s.counter)
c.value = 99

// ✅
dispatch(incrementByAmount(99))`,
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'Selector 挑 primitive、路径对 reducer key；Dispatch 只发 action；永远不在组件里 mutate store 里的对象。',
          },
        ],
      },
    },
    {
      id: 'redux-counter-demo',
      title: '完整计数器 Demo：从点击到界面更新',
      summary:
        'CounterPanel 完整代码 + 数据流逐步追踪；对照本项目 store 源码运行',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '点按钮 → dispatch(action) → reducer 算新 state → useSelector 发现 value 变了 → 组件重渲染。全程只改 reducer，组件只负责读和 dispatch。',
          },
          {
            type: 'text',
            title: '1）Demo 目标',
            body: '做一个 CounterPanel：显示当前数字，提供 +1、-1、+5、归零四个按钮。状态存在 Redux store，不在组件 useState。这是本项目 src/store/slices/counterSlice.js 配套的标准用法。',
          },
          {
            type: 'code',
            title: '2）完整 CounterPanel 组件',
            language: 'jsx',
            body: `import { useDispatch, useSelector } from 'react-redux'
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from '../store/slices/counterSlice'

function CounterPanel() {
  // 读：订阅 state.counter.value
  const value = useSelector((state) => state.counter.value)
  // 写：拿到 dispatch
  const dispatch = useDispatch()

  return (
    <div>
      <p>当前值：{value}</p>

      <button type="button" onClick={() => dispatch(increment())}>
        +1
      </button>
      <button type="button" onClick={() => dispatch(decrement())}>
        -1
      </button>
      <button type="button" onClick={() => dispatch(incrementByAmount(5))}>
        +5
      </button>
      <button type="button" onClick={() => dispatch(reset())}>
        归零
      </button>
    </div>
  )
}

export default CounterPanel`,
          },
          {
            type: 'text',
            title: '3）点击「+5」时发生了什么？（逐步）',
            body: '① 用户 click → onClick 执行 dispatch(incrementByAmount(5))。\n\n② incrementByAmount(5) 返回 action { type: \'counter/incrementByAmount\', payload: 5 }。\n\n③ store 把当前 state 和 action 交给 counterReducer，reducer 里 state.value += action.payload，得到新 state（value 旧值 + 5）。\n\n④ store 更新内部 state，通知所有订阅者。\n\n⑤ CounterPanel 的 useSelector 重新执行 selector，发现 value 从旧变新，组件 re-render，界面数字更新。',
          },
          {
            type: 'code',
            title: '4）数据流示意图（文字版）',
            language: 'text',
            body: `UI 点击 +5
    ↓
dispatch(incrementByAmount(5))
    ↓
action { type: 'counter/incrementByAmount', payload: 5 }
    ↓
counterReducer(旧 state, action) → 新 state
    ↓
store.state.counter.value 更新
    ↓
useSelector 订阅触发 → CounterPanel 重渲染
    ↓
<p> 显示新数字`,
          },
          {
            type: 'text',
            title: '5）和 useState 版计数器对照',
            body: 'useState 版：const [value, setValue] = useState(0)，按钮 onClick={() => setValue(v => v + 1)}。状态和改法都在组件内。\n\nRedux 版：状态在 store，改法在 slice，组件只有 useSelector + dispatch。如果 Header 也要显示同一个 count，Redux 版 Header 同样 useSelector 即可，不用 props 传递。\n\n这个 counter 用 useState 其实就够；学 Redux 是因为下一个需求往往是「多个页面共享」。',
          },
          {
            type: 'list',
            title: '6）动手自检',
            ordered: true,
            items: [
              '把 CounterPanel 临时挂到 App 或某个 lesson 页',
              '点 +1 / +5 数字是否变化',
              '打开 Redux DevTools（浏览器扩展）是否能看到 counter/increment 等 action',
              '刷新页面后 count 是否回到 0（未做 persist 时应回到 initialState）',
            ],
          },
          {
            type: 'tip',
            title: '对照本项目源码',
            body: '打开 src/store/slices/counterSlice.js、src/store/index.js、src/index.js 里的 Provider，和本章代码一一对应。能加减说明 Redux 基础链路已通。',
          },
        ],
      },
    },
    {
      id: 'redux-immutable-immer',
      title: '不可变更新与 Immer：为什么 reducer 里能写 state.value += 1',
      summary:
        'Redux 要求新 state；RTK 内置 Immer，在 reducer 里「草稿式」写法即可',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'Redux 规则：不能改旧 state，要返回新 state。RTK + Immer 让你写 state.value += 1，Immer 在底层帮你生成新对象——但思想仍是「不可变更新」。',
          },
          {
            type: 'text',
            title: '1）为什么 Redux 强调不可变（immutable）？',
            body: 'store 保存的是 state 的引用。如果 reducer 直接改旧对象，React-Redux 用 === 比较前后 state 时可能看不出变化，组件不重渲染；DevTools 也无法「复制旧 state 再回放」。\n\n所以经典写法是：return { ...state, value: state.value + 1 }，或嵌套对象时层层展开拷贝。',
          },
          {
            type: 'text',
            title: '2）Immer 是什么？',
            body: 'Immer 库提供「draft 草稿」：你在 draft 上像改普通对象一样改，Immer 最后 produce 出一个新 immutable 对象。Redux Toolkit 的 createSlice 默认用 Immer 包一层 reducer。\n\n因此 counterSlice 里写 state.value += 1 是安全的——不是真的 mutate 旧 state，而是改 draft，再 produce 新 state。',
          },
          {
            type: 'code',
            title: '3）同一逻辑：手写不可变 vs RTK Immer 写法',
            language: 'javascript',
            body: `// 老式纯 Redux（无 Immer）—— 必须返回新对象
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, value: state.value + 1 }
    default:
      return state
  }
}

// RTK createSlice 里 —— Immer 允许「突变式」写法
reducers: {
  increment(state) {
    state.value += 1  // 实际 produce 了新 state
  },
}`,
          },
          {
            type: 'text',
            title: '4）什么时候要 return？',
            body: 'Immer 规则：多数情况改 draft 不用 return。如果你想整个替换 state（而不是改字段），可以 return 新对象，例如 return { value: 0, extra: 1 } 会替换整个 slice state。\n\nreturn 新对象后，不要再混用对 draft 的修改。初学者在 reducers 里只做字段修改即可，很少需要 return 整棵子树。',
          },
          {
            type: 'text',
            title: '5）组件里仍然不能 mutate',
            body: 'Immer 只在 createSlice 的 reducer 回调里生效。useSelector 取出来的 state 仍是 frozen 的只读数据（开发环境可能 Object.freeze）。组件里 counter.value++ 依然禁止，必须通过 dispatch。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'reducer 里 Immer 帮你 mutable 写法 → immutable 结果；组件里拿到的 state 只读，改必须 dispatch。',
          },
        ],
      },
    },
    {
      id: 'redux-multi-slice',
      title: '多 slice 模式：业务变大怎么拆',
      summary:
        '一业务一 slice 文件；configureStore 里多个 key 合并；useSelector 路径跟着变',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '购物车一个 slice、用户一个 slice；store 的 reducer 多写几个 key；读 state.cart.items、state.user.name，互不干扰。',
          },
          {
            type: 'text',
            title: '1）为什么要多个 slice？',
            body: '一个 counter 一个文件刚好。项目变大后，用户登录、购物车、UI 偏好、通知未读数如果全塞进一个 slice，initialState 巨大、reducers 几十上百个，难维护。按业务边界拆成 userSlice、cartSlice、uiSlice，各团队改各的文件。',
          },
          {
            type: 'code',
            title: '2）configureStore 注册多个 reducer',
            language: 'javascript',
            body: `import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import userReducer from './slices/userSlice'
import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    cart: cartReducer,
  },
})

// 根 state 形状：
// {
//   counter: { value: 0 },
//   user: { name: '', loggedIn: false },
//   cart: { items: [] }
// }`,
          },
          {
            type: 'code',
            title: '3）组件里读不同 slice',
            language: 'jsx',
            body: `function Header() {
  const userName = useSelector((s) => s.user.name)
  const cartCount = useSelector((s) => s.cart.items.length)
  const counterValue = useSelector((s) => s.counter.value)

  return (
    <header>
      {userName} | 购物车 {cartCount} 件 | 计数 {counterValue}
    </header>
  )
}`,
          },
          {
            type: 'text',
            title: '4）slice 之间要不要互相调用？',
            body: '初学阶段：尽量让一个 action 只改一个 slice。跨 slice 逻辑（登出时清空 cart）可以：① 在组件里连续 dispatch 两个 action；② 在 thunk 里统一 dispatch（下一节了解）；③ extraReducers 监听别的 slice 的 action（进阶）。\n\n不要在一个 slice 的 reducer 里直接改另一个 slice 的 state——每个 reducer 只负责自己那一块。',
          },
          {
            type: 'list',
            title: '5）拆分建议',
            ordered: true,
            items: [
              '按业务域命名：userSlice、cartSlice，不要 dataSlice1',
              'reducer key 与团队口头说的名字一致，方便 useSelector',
              '每个 slice 文件 export actions + default reducer',
              'store/index.js 只做「汇总注册」，不写业务逻辑',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'slice 按业务拆；store 像拼积木；selector 路径 = reducer key + 字段路径。',
          },
        ],
      },
    },
    {
      id: 'redux-async-thunks',
      title: '异步与 createAsyncThunk（了解即可）',
      summary:
        '请求 API 再改 state 用 thunk；入门先掌握同步 counter，异步后面再学',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'reducer 必须同步纯函数；发请求、setTimeout 等异步放在 createAsyncThunk 里，请求完成后再 dispatch 改 state 的 action。',
          },
          {
            type: 'text',
            title: '1）为什么 reducer 里不能写 fetch？',
            body: 'reducer 要求同步、纯函数。fetch 是异步的，且副作用不属于「算新 state」这一步。Redux 用 middleware（中间件）处理异步：最常见是 thunk 中间件，让 dispatch 可以是一个函数 dispatch(asyncFn)。\n\nconfigureStore 默认已加 thunk 中间件，所以 RTK 里可以直接用 createAsyncThunk。',
          },
          {
            type: 'text',
            title: '2）createAsyncThunk 大致长什么样？',
            body: '定义一个「异步 action」：pending 时设 loading true， fulfilled 时把接口数据写入 state，rejected 时记 error。Toolkit 自动生成 pending/fulfilled/rejected 三种 action type，在 slice 的 extraReducers 里监听即可。\n\n你现在只要知道：登录、拉列表、提交表单「等接口再更新 Redux」走这条路；具体写法在实战章节（axios + 登录）里展开。',
          },
          {
            type: 'code',
            title: '3）极简示意（不必现在抄进项目）',
            language: 'javascript',
            body: `import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// 异步 thunk：里面可以 await fetch / axios
export const fetchUser = createAsyncThunk('user/fetch', async (userId) => {
  const res = await fetch(\`/api/users/\${userId}\`)
  return res.json()
})

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
  },
})

// 组件：dispatch(fetchUser(123))`,
          },
          {
            type: 'text',
            title: '4）入门阶段怎么学？',
            body: '先把本章同步 flow 练熟：createSlice → configureStore → Provider → useSelector / useDispatch。异步场景在组件里 useEffect + fetch 然后 dispatch 一个「设置数据」的同步 action 也可以，只是逻辑分散。等项目需要统一 loading/error 状态时，再系统学 createAsyncThunk。\n\n不要还没跑通 counter 就学 thunk，容易两个都没懂。',
          },
          {
            type: 'tip',
            title: '了解即可',
            body: '记住有 createAsyncThunk 这条道就行；当前练习专注同步 reducer + dispatch，异步放到后面实战。',
          },
        ],
      },
    },
    {
      id: 'redux-cheat-sheet',
      title: '速查表 + 常见错误 + 学习路线自检',
      summary:
        '文件放哪、API 怎么写、报错怎么查——本章结尾一张清单带走',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'slice 定义 → store 汇总 → Provider 注入 → 组件 Selector 读 + Dispatch 写；路径错、没 Provider、直接改 state 是三大经典坑。',
          },
          {
            type: 'table',
            title: '1）文件与 API 速查',
            headers: ['步骤', '文件 / 位置', '核心 API', '记住'],
            rows: [
              [
                '定义业务状态',
                'store/slices/xxxSlice.js',
                'createSlice',
                'export actions + default reducer',
              ],
              [
                '创建 store',
                'store/index.js',
                'configureStore',
                'reducer key → state 路径',
              ],
              [
                '接入 React',
                'index.js',
                '<Provider store={store}>',
                '包住 App 整树',
              ],
              [
                '组件读',
                '任意组件',
                'useSelector(s => s.xxx.yyy)',
                '路径第一段 = reducer key',
              ],
              [
                '组件写',
                '任意组件',
                'dispatch(actionCreator())',
                '不要 mutate state',
              ],
            ],
          },
          {
            type: 'table',
            title: '2）useState vs Redux 在本章 counter 上的对照',
            headers: ['', 'useState', 'Redux Toolkit'],
            rows: [
              ['状态在哪', '组件内 count', 'store.counter.value'],
              ['怎么改', 'setCount(n)', 'dispatch(increment())'],
              ['多组件共享', '需 props 或 Context', '任意组件 useSelector'],
              ['改法定义在哪', '组件内函数', 'counterSlice reducers'],
              ['适用规模', '局部 UI', '全局业务（本章为入门）'],
            ],
          },
          {
            type: 'list',
            title: '3）常见错误与修复',
            ordered: true,
            items: [
              'could not find react-redux context → 入口缺 <Provider store={store}>',
              'useSelector 得到 undefined → 检查 reducer key（state.counter 不是 state.counterSlice）',
              '界面不更新 → 是否在组件里直接改了 state；或 selector 每次返回新对象',
              'dispatch 了但 reducer 没执行 → action type 不对；或 reducer 没注册到 store',
              'StrictMode 下 effect 执行两次 → 与 Redux 无关，别在 reducer 里写副作用',
              '刷新后 state 丢失 → 正常，需 persist 中间件才会存 localStorage（进阶）',
            ],
          },
          {
            type: 'code',
            title: '4）最小模板（复制骨架用）',
            language: 'javascript',
            body: `// slice
import { createSlice } from '@reduxjs/toolkit'
const slice = createSlice({ name: 'x', initialState: {}, reducers: {} })
export const { /* actions */ } = slice.actions
export default slice.reducer

// store
import { configureStore } from '@reduxjs/toolkit'
export const store = configureStore({ reducer: { x: sliceReducer } })

// 组件
const v = useSelector(s => s.x.field)
const dispatch = useDispatch()
dispatch(someAction())`,
          },
          {
            type: 'list',
            title: '5）本章学会了吗？自检清单',
            ordered: true,
            items: [
              '能说出 useState、Context、Redux 分别适合什么场景',
              '能解释 state、action、reducer 三个词',
              '能看懂 counterSlice 每个字段含义',
              '知道 configureStore 里 key 和 useSelector 路径的关系',
              '知道 Provider 必须包在入口',
              '能独立写出 useSelector + useDispatch 的 CounterPanel',
              '知道 reducer 里 Immer、组件里不能 mutate',
              '知道多 slice 怎么注册；异步 thunk 知道名字即可',
            ],
          },
          {
            type: 'tip',
            title: '下一步学什么',
            body: '在本项目里把 CounterPanel 跑通；装 Redux DevTools 看 action 流；然后到「实战」章节看 axios 登录如何把接口结果 dispatch 进 store。基础链路通了，异步只是多一层 createAsyncThunk。',
          },
        ],
      },
    },
  ],
}

export default redux
