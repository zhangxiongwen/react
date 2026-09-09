/**
 * State 章节
 */
const state = {
  id: 'state',
  title: 'State：组件自己的数据（useState）',
  summary: 'useState 完整用法、函数式更新、对象/数组不可变更新、状态设计 + 完整表单 Demo',
  order: 7,
  items: [
    {
      id: 'usestate-basic',
      title: 'useState 完整用法：声明、更新、函数式更新、惰性初始化',
      summary: 'state = 组件里会变的数据；setXxx 触发重新渲染；连续更新用函数式写法',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'state = 一个「跨渲染保存」的数据；setState = 告诉 React「数据变了，请重新渲染界面」。普通 let 变量改了，界面不会变。',
          },
          {
            type: 'text',
            title: '为什么这一节是 React 交互的核心？',
            body: '没有 state，页面只能是静态的——按钮点了没反应、输入框打字不显示、列表删不掉。state 让组件「记住」用户操作后的数据，并在变化时自动刷新 UI。\n\n初学最容易混淆：我明明改了变量，为什么界面不变？答案几乎总是：你改的是普通 let，不是用 setState 更新 state。下面从原理到 Demo 完整讲透。',
          },
          {
            type: 'text',
            title: '1）为什么普通变量不够？',
            body: '组件函数每次渲染都会从头到尾重新执行。如果你写 let count = 0，点击按钮执行 count++，变量在「这一次函数执行」里确实变了，但函数执行结束后，React 不会因为你改了一个局部变量就重新跑一遍组件。\n\nuseState 做两件事：\n\n① 在 React 内部保存值，跨多次渲染不丢失（存在组件的「记忆」里，不是普通局部变量）。\n\n② 调用 setCount 时，预约一次重新渲染，下次执行组件函数时 count 是新值，UI 跟着更新。\n\n可以把它想成：React 帮你在组件「背后」存了一个抽屉，setState 是换抽屉里的东西并喊一声「请重画界面」。',
          },
          {
            type: 'table',
            title: '2）普通变量 vs useState 对照',
            headers: ['对比', 'let count = 0', 'useState(0)'],
            rows: [
              ['跨渲染保留', '❌ 每次渲染重新变成 0', '✅ React 内部保存'],
              ['改了会更新 UI', '❌ 不会触发重渲染', '✅ setCount 触发重渲染'],
              ['在哪里声明', '函数体内任意位置', '必须在组件顶层（Hooks 规则）'],
              ['适合存什么', '临时计算、循环变量', '会影响界面显示的数据'],
            ],
          },
          {
            type: 'text',
            title: '3）第一步：useState 基本语法（逐行理解）',
            body: '1）从 react 导入 useState。\n\n2）在组件函数顶层调用：const [count, setCount] = useState(0)——这叫数组解构，第一个是当前值，第二个是更新函数。\n\n3）useState(初始值) 只在组件「首次挂载」时用初始值；之后重渲染不会重置（除非组件被卸载再挂载）。\n\n4）读数据用 count，改数据用 setCount(新值) 或 setCount(c => 新值)。\n\n5）Hooks 必须在组件顶层调用，不能写在 if/for/嵌套函数里——保证每次渲染 Hooks 调用顺序一致，React 才能对上号。',
          },
          {
            type: 'code',
            title: '完整 Demo：计数器（增/减/归零/步长）',
            language: 'jsx',
            body: `import { useState } from 'react'

function Counter() {
  // useState 返回 [当前值, 更新函数]；0 是 count 的初始值
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)  // 步长也是 state，改步长会触发重渲染

  // 事件处理函数：点击时调用 setCount 更新 state，React 会重新渲染界面
  function handleAdd() {
    setCount(count + step)  // 基于当前 count 和 step 计算新值
  }

  function handleSub() {
    setCount(count - step)
  }

  function handleReset() {
    setCount(0)  // 直接设为固定值，不依赖旧 state
  }

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h2>计数器</h2>
      {/* 界面显示的是「当前这次渲染」的 count 快照 */}
      <p style={{ fontSize: 48, margin: '16px 0' }}>{count}</p>

      <div style={{ marginBottom: 12 }}>
        <label>
          步长：
          {/* 受控 input：value 绑定 step state，onChange 更新 step */}
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            style={{ width: 60, marginLeft: 8 }}
          />
        </label>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button type="button" onClick={handleSub}>-{step}</button>
        <button type="button" onClick={handleAdd}>+{step}</button>
        <button type="button" onClick={handleReset}>归零</button>
      </div>
    </div>
  )
}

export default Counter`,
          },
          {
            type: 'text',
            title: '4）第二步：setState 是「预约更新」，不是立刻改变量',
            body: '调用 setCount(5) 后，同一函数里下一行 console.log(count) 往往还是旧值。这不是 bug，是 React 的设计。\n\nReact 会把多次 setState 收集起来，在当前渲染（当前这次函数执行）全部完成后，再统一处理更新、重新执行组件函数。UI 里显示的 count 永远是「当前这次渲染」的快照。\n\n不要依赖 setState 后立即读到新值。如果下一步逻辑必须基于新值，要么用函数式更新，要么把逻辑放到 useEffect 里等 state 更新后再跑（后面章节讲）。',
          },
          {
            type: 'code',
            title: '演示：setState 后立刻读仍是旧值',
            language: 'jsx',
            body: `function Demo() {
  const [count, setCount] = useState(0)

  function handleClick() {
    console.log('点击前 count:', count)  // 例如 0
    setCount(count + 1)  // 「预约」下次渲染时 count 变为 1
    // setState 不是立刻改变量！同一函数里下面读到的仍是旧值
    console.log('setState 后立刻读 count:', count)  // 还是 0！不是 1
    // 界面会在「下一次渲染」时显示 1
  }

  return (
    <div>
      <p>界面上的 count：{count}</p>
      <button type="button" onClick={handleClick}>+1（看控制台）</button>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '5）第三步：函数式更新——新值依赖旧值时必须用',
            body: '写法：setCount(c => c + 1)，参数 c 是「排队中该 state 的最新值」，不是闭包里的旧 count。\n\n适用场景：\n\n① 连续多次 setState（同一事件里 +3）。\n\n② 新状态明确依赖旧状态。\n\n③ 定时器 / setTimeout / 异步回调里更新（闭包可能抓到挂载时的旧 state）。\n\n不确定时，依赖旧值就用函数式更新——多写 (c) => 几乎不会错，少写可能踩坑。',
          },
          {
            type: 'code',
            title: '完整 Demo：连续 +3 的错误 vs 正确写法',
            language: 'jsx',
            body: `import { useState } from 'react'

function AddThreeDemo() {
  const [count, setCount] = useState(0)

  // ❌ 错误：三次都基于「同一次渲染里的旧 count」（闭包陷阱）
  function addThreeWrong() {
    setCount(count + 1)  // 假设 count=0，预约设为 1
    setCount(count + 1)  // 还是基于 0，又预约设为 1
    setCount(count + 1)  // 还是基于 0，又预约设为 1
    // React 合并后结果：只 +1，不是 +3
  }

  // ✅ 正确：函数式更新 setCount(c => c + 1)
  // 参数 c 是「排队中该 state 的最新值」，每次 +1 都基于最新值
  function addThreeRight() {
    setCount((c) => c + 1)
    setCount((c) => c + 1)
    setCount((c) => c + 1)
    // 结果：稳定 +3
  }

  return (
    <div style={{ padding: 20 }}>
      <p style={{ fontSize: 32 }}>{count}</p>
      <button type="button" onClick={addThreeWrong} style={{ marginRight: 8 }}>
        错误 +3（实际只 +1）
      </button>
      <button type="button" onClick={addThreeRight}>
        正确 +3
      </button>
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：连点三次，setN(n+1) 只加 1，setN(v => v+1) 加 3',
            body: `import { useState } from 'react' // 引入 useState，用来保存两个互不影响的计数

export default function Demo() { // live Demo 必须默认导出一个组件
  const [a, setA] = useState(0) // 左边这份计数用「直接传新值」的写法更新
  const [b, setB] = useState(0) // 右边这份计数用「函数式更新」的写法更新

  // ❌ 一次点击里连写三次 setA(a + 1)：a 在这一次渲染里从头到尾都是旧值
  function addThreeWrong() {
    setA(a + 1) // 假设当前 a = 0，这里预约「把 a 设成 1」
    setA(a + 1) // a 还是 0（本次渲染的快照不会变），又预约「设成 1」
    setA(a + 1) // 依旧基于 0，React 合并后最终只 +1
  }

  // ✅ 一次点击里连写三次 setB(v => v + 1)：v 是「排队中的最新值」
  function addThreeRight() {
    setB((v) => v + 1) // v = 0，返回 1
    setB((v) => v + 1) // v = 1，返回 2
    setB((v) => v + 1) // v = 2，返回 3，所以稳定 +3
  }

  const boxStyle = { flex: 1, padding: 16, borderRadius: 8, textAlign: 'center' } // 两个盒子共用的样式

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', gap: 12 }}>
        {/* 左：错误写法，点一次只 +1 */}
        <div style={{ ...boxStyle, background: '#fff1f0', border: '1px solid #ffa39e' }}>
          <div style={{ fontSize: 13, color: '#cf1322' }}>❌ setA(a + 1) 连写三次</div>
          <div style={{ fontSize: 40, margin: '8px 0' }}>{a}</div>
          <button onClick={addThreeWrong} style={{ padding: '6px 12px', cursor: 'pointer' }}>
            点我「+3」
          </button>
        </div>

        {/* 右：正确写法，点一次真的 +3 */}
        <div style={{ ...boxStyle, background: '#f6ffed', border: '1px solid #b7eb8f' }}>
          <div style={{ fontSize: 13, color: '#389e0d' }}>✅ setB(v =&gt; v + 1) 连写三次</div>
          <div style={{ fontSize: 40, margin: '8px 0' }}>{b}</div>
          <button onClick={addThreeRight} style={{ padding: '6px 12px', cursor: 'pointer' }}>
            点我「+3」
          </button>
        </div>
      </div>

      {/* 归零按钮：设成固定值，不依赖旧值，所以直接传 0 就行 */}
      <button
        onClick={() => { setA(0); setB(0) }}
        style={{ marginTop: 12, padding: '6px 12px', cursor: 'pointer' }}
      >
        两边都归零
      </button>

      <p style={{ marginTop: 12, fontSize: 13, color: '#666', lineHeight: 1.8 }}>
        各点一次就能看到：左边只涨 1，右边涨 3。
        原因是「a」是本次渲染的快照，一次事件里读到的永远是同一个旧值；
        而函数式更新的参数 v 由 React 传入，是排队里的最新值。
        <strong>只要新值依赖旧值，就写 setX(v =&gt; ...)。</strong>
      </p>
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: '完整 Demo：定时器里的闭包陷阱与函数式修复',
            language: 'jsx',
            body: `import { useState, useEffect } from 'react'

function TimerTrap() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      // ❌ 闭包陷阱：回调里抓到的 count 永远是挂载时的 0
      // setCount(count + 1)  → 每秒都是 setCount(1)

      // ✅ 函数式更新：不依赖闭包里的 count，永远基于最新 state
      setCount((c) => c + 1)
    }, 1000)
    return () => clearInterval(id)  // 组件卸载时清除定时器
  }, []) // 空依赖 []：只在首次挂载时执行一次

  return <p>自动计数：{count}</p>
}`,
          },
          {
            type: 'table',
            title: '6）直接传值 vs 函数式更新：怎么选',
            headers: ['场景', '推荐写法', '原因'],
            rows: [
              ['设为固定值 setCount(0)', 'setCount(0)', '不依赖旧值'],
              ['基于旧值 +1', 'setCount(c => c + 1)', '避免闭包旧值'],
              ['同一事件连续更新多次', 'setCount(c => c + 1) 连写', '每次基于最新排队值'],
              ['setTimeout/setInterval 内', 'setCount(c => c + 1)', '回调闭包可能是旧渲染'],
              ['新值来自 props 计算', 'setCount(props.initial)', '不依赖旧 state 可直接传'],
            ],
          },
          {
            type: 'text',
            title: '7）第四步：惰性初始化——初始值计算很贵时用',
            body: 'useState(初始值) 的初始值表达式每次渲染都会「经过」React，但 React 只在首次挂载时使用它作为 state 初值。\n\n如果初始值计算很耗时（读 localStorage、大数组 filter、复杂 JSON 解析），写 useState(compute()) 仍会在每次渲染执行 compute()——浪费。\n\n用 useState(() => compute())，传入的是函数，React 只在首次渲染调用一次这个函数取初值。这叫 lazy initial state（惰性初始化）。',
          },
          {
            type: 'code',
            title: '惰性初始化 Demo',
            language: 'jsx',
            body: `function ExpensiveInit() {
  // ❌ 每次组件重渲染都会执行 readFromStorage()，浪费性能
  // const [user, setUser] = useState(readFromStorage())

  // ✅ 惰性初始化：传入函数，React 只在「首次挂载」时调用一次
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : { name: '游客' }
  })

  return <p>当前用户：{user.name}</p>
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：点「重新渲染」，看惰性初始化的函数只跑一次',
            body: `import { useState } from 'react' // 引入 useState

// 放在组件外面的两个计数器：记录「初始值计算」各被执行了多少次
let eagerRuns = 0 // 立即执行版跑了几次
let lazyRuns = 0 // 惰性版跑了几次

// 假装这是一个很贵的计算：读 localStorage、解析大 JSON、遍历大数组……
function expensiveCompute(tag) {
  if (tag === 'eager') eagerRuns += 1 // 每被调用一次就累加，方便在界面上看见
  else lazyRuns += 1
  let sum = 0
  for (let i = 0; i < 100000; i++) sum += i // 故意做点耗时的循环
  return sum
}

export default function Demo() { // 默认导出组件
  const [tick, setTick] = useState(0) // 这个 state 只用来「制造一次重新渲染」

  // ❌ useState(expensiveCompute('eager'))：括号表示「现在就调用」
  //    组件每渲染一次，这个函数就白跑一次，React 只在首次挂载时用它的返回值
  const [eagerValue] = useState(expensiveCompute('eager'))

  // ✅ useState(() => expensiveCompute('lazy'))：传进去的是「函数本身」
  //    React 只在首次挂载时调用它一次，之后再渲染都不会执行
  const [lazyValue] = useState(() => expensiveCompute('lazy'))

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      <button
        onClick={() => setTick(tick + 1)} // 改 state 触发重新渲染，组件函数会整个重跑一遍
        style={{ padding: '6px 12px', cursor: 'pointer' }}
      >
        重新渲染一次（已渲染 {tick + 1} 次）
      </button>

      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <div style={{ flex: 1, padding: 12, borderRadius: 8, background: '#fff1f0', border: '1px solid #ffa39e' }}>
          <div style={{ fontSize: 13, color: '#cf1322' }}>❌ useState(expensiveCompute())</div>
          {/* 这个数字会跟着渲染次数一直涨，说明每次渲染都白算了一遍 */}
          <div style={{ fontSize: 32, margin: '8px 0' }}>{eagerRuns} 次</div>
          <div style={{ fontSize: 12, color: '#999' }}>初始值：{eagerValue}</div>
        </div>

        <div style={{ flex: 1, padding: 12, borderRadius: 8, background: '#f6ffed', border: '1px solid #b7eb8f' }}>
          <div style={{ fontSize: 13, color: '#389e0d' }}>✅ useState(() =&gt; expensiveCompute())</div>
          {/* 这个数字停在 1 不动，说明初始化函数只在首次挂载时跑了一次 */}
          <div style={{ fontSize: 32, margin: '8px 0' }}>{lazyRuns} 次</div>
          <div style={{ fontSize: 12, color: '#999' }}>初始值：{lazyValue}</div>
        </div>
      </div>

      <p style={{ marginTop: 12, fontSize: 13, color: '#666', lineHeight: 1.8 }}>
        多点几次「重新渲染」：左边次数一直涨，右边始终停着不动。
        两边的 state 初始值完全一样，区别只在于<strong>你把「计算结果」还是「计算函数」交给 useState</strong>。
        初始值算起来很便宜（比如 0、''、[]）时随便写；一旦要读 localStorage、解析 JSON、遍历大数组，就写成 useState(() =&gt; ...)。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: 'useState 可以存任何类型',
            language: 'jsx',
            body: `function AllTypes() {
  // useState 可以存任意 JavaScript 类型，初值类型决定后续怎么用
  const [name, setName] = useState('')           // 字符串，表单常用
  const [age, setAge] = useState(0)              // 数字
  const [ok, setOk] = useState(false)            // 布尔，开关/checkbox
  const [user, setUser] = useState(null)         // null 或对象
  const [list, setList] = useState([])           // 数组，列表数据
  const [map, setMap] = useState(new Map())      // 少见，一般用对象/数组即可

  return <div>各种类型都可以作为 state</div>
}`,
          },
          {
            type: 'list',
            title: '8）Hooks 调用规则（违反会报错）',
            ordered: true,
            items: [
              '只在 React 函数组件顶层调用 useState',
              '只在自定义 Hook（名字 use 开头）顶层调用',
              '不要写在 if / for / while 里——会导致每次渲染 Hooks 数量不一致',
              '不要写在普通嵌套函数里（事件处理函数里可以调 setState，但不能调 useState）',
              '违反常见报错：Invalid hook call / Rendered more hooks than expected',
            ],
          },
          {
            type: 'list',
            title: '9）动手练习清单',
            ordered: true,
            items: [
              '做点赞按钮，用函数式更新 setLikes(l => l + 1)',
              '连续点「+1」按钮三次，对比直接 setCount(count+1) 连写三次和函数式更新的差异',
              '用 useState(() => Date.now()) 记录组件首次挂载时间',
              '在 handleClick 里 setState 后立刻 console.log，确认读到的是旧值',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'useState 跨渲染存数据；setState 预约重渲染，同函数内读到仍是旧值。依赖旧值用 setX(x => 新值)；连续更新、定时器里必用函数式。昂贵初值用 useState(() => 初值)。Hooks 只写组件顶层。',
          },
        ],
      },
    },
    {
      id: 'usestate-object',
      title: '对象与数组状态：不可变更新完整大 Demo',
      summary: '不要直接改原对象/数组；用展开运算符复制后 set；增删改查列表',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '更新对象/数组 state 时，必须「复制一份新的」再 set，不能直接改原来的。口诀：展开旧值 + 覆盖要改的字段。',
          },
          {
            type: 'text',
            title: '为什么对象/数组要特别对待？',
            body: '数字、字符串 state 更新时本来就要「换新值」。对象和数组容易让人误以为「改里面字段就行」——但 React 比较的是引用（是不是同一个对象），不是深比较每个字段。\n\n直接改原对象再 setState(同一引用)，React 可能认为「没变」，跳过渲染。更糟的是多处共享引用时，界面和数据会 silently 错乱。不可变更新是 React 生态的基础习惯，Redux、Zustand 同样要求。',
          },
          {
            type: 'text',
            title: '1）为什么不能直接改？',
            body: 'React 用 Object.is（类似 ===）比较新旧 state 是否变化。引用相同 → 认为没变。\n\n错误示范：form.name = "新名字"; setForm(form)——form 还是同一个对象引用。\n\n正确做法：setForm({ ...form, name: "新名字" })——新对象，新引用，React 会更新并触发子组件重渲染。\n\n口诀：永远 new 一个新对象/新数组再 set；更新嵌套结构时，从外到内每一层都要 ...展开复制。',
          },
          {
            type: 'table',
            title: '2）可变 vs 不可变更新对照',
            headers: ['操作', '❌ 错误（mutate）', '✅ 正确（immutable）'],
            rows: [
              ['改对象字段', 'obj.x = 1; setObj(obj)', 'setObj({ ...obj, x: 1 })'],
              ['改数组某项', 'arr[0] = x; setArr(arr)', 'setArr(arr.map(...))'],
              ['数组追加', 'arr.push(x); setArr(arr)', 'setArr([...arr, x])'],
              ['数组删除', 'arr.splice(i,1); setArr(arr)', 'setArr(arr.filter(...))'],
              ['嵌套对象', 'obj.a.b = 1', 'setObj({ ...obj, a: { ...obj.a, b: 1 } })'],
            ],
          },
          {
            type: 'text',
            title: '3）第一步：对象 state——改单个或多个字段',
            body: '先用 useState 存对象。更新时用展开运算符 ...obj 复制所有旧字段，再写要改的字段覆盖。\n\n多个输入框联动时，onChange 里 setForm(prev => ({ ...prev, [key]: value })) 很常用——[key] 是计算属性名，一个 updateField 函数搞定所有字段。\n\n推荐函数式更新 + ...prev：避免闭包里的 form 是旧快照，快速连打键盘时丢字。',
          },
          {
            type: 'code',
            title: '完整 Demo：用户信息表单（对象 state + 输入联动）',
            language: 'jsx',
            body: `import { useState } from 'react'

function UserForm() {
  // 对象 state：多个表单字段放在一个对象里，方便整体提交/重置
  const [form, setForm] = useState({
    name: '',
    age: 18,
    city: '上海',
    bio: '',
  })

  // 通用更新函数：改任意字段，避免每个 input 写重复的 setForm
  function updateField(key, value) {
    // 函数式更新 + 展开运算符：复制旧对象，只覆盖要改的 [key]
    setForm((prev) => ({ ...prev, [key]: value }))
    // [key] 是计算属性名，key='name' 时等价于 { ...prev, name: value }
  }

  function handleReset() {
    setForm({ name: '', age: 18, city: '上海', bio: '' })
  }

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <h3>用户信息</h3>

      <div style={{ marginBottom: 8 }}>
        <label>姓名：</label>
        {/* 受控组件：value 来自 state，onChange 更新 state */}
        <input
          value={form.name}
          onChange={(e) => updateField('name', e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>年龄：</label>
        <input
          type="number"
          value={form.age}
          onChange={(e) => updateField('age', Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>城市：</label>
        <select
          value={form.city}
          onChange={(e) => updateField('city', e.target.value)}
        >
          <option value="上海">上海</option>
          <option value="北京">北京</option>
          <option value="广州">广州</option>
        </select>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>简介：</label>
        <textarea
          value={form.bio}
          onChange={(e) => updateField('bio', e.target.value)}
          rows={3}
          style={{ width: '100%' }}
        />
      </div>

      <button type="button" onClick={handleReset}>重置</button>

      {/* 实时预览：受控表单的好处，state 始终和界面同步 */}
      <pre style={{ background: '#f5f5f5', padding: 12, marginTop: 16 }}>
        {JSON.stringify(form, null, 2)}
      </pre>
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: '对象更新：错误 vs 正确对照',
            language: 'jsx',
            body: `const [form, setForm] = useState({ name: '', age: 18 })

// ❌ 错误：直接修改原对象（mutate），引用没变，React 可能不重新渲染
form.name = '小明'
setForm(form)  // 还是同一个对象引用

// ❌ 错误：只传部分字段，没展开的字段会丢失
setForm({ name: '小明' })  // age 字段没了！

// ✅ 正确：展开旧对象 + 覆盖要改的字段，得到新对象
setForm({ ...form, name: '小明' })

// ✅ 更推荐：函数式更新，避免闭包里的 form 是旧快照
setForm((prev) => ({ ...prev, name: '小明' }))`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：直接改对象字段界面不动，展开复制才会更新',
            body: `import { useState } from 'react' // 引入 useState 存一个对象

let renderTimes = 0 // 组件外的普通变量：每渲染一次 +1，用来看「到底有没有重新渲染」

export default function Demo() { // 默认导出组件
  renderTimes += 1 // 渲染时累加，纯粹为了演示，真实项目不要这么写
  const [user, setUser] = useState({ name: '小明', age: 18 }) // 对象类型的 state

  // ❌ 错误：直接改原对象的字段，再把「同一个引用」set 回去
  function wrongUpdate() {
    user.age = user.age + 1 // 悄悄改掉了原对象，React 完全不知道
    setUser(user) // 传进去的还是同一个对象引用，React 用 Object.is 一比：没变 → 不重新渲染
  }

  // ✅ 正确：展开旧对象生成一个「新对象」，只覆盖要改的字段
  function rightUpdate() {
    setUser((prev) => ({ ...prev, age: prev.age + 1 })) // 新引用 → React 判定变了 → 重新渲染
  }

  // ❌ 另一个高频坑：只传要改的字段，没展开的字段会整个丢失
  function missingSpread() {
    setUser({ age: user.age + 1 }) // name 没了！界面上会变成「姓名：（空）」
  }

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      <div style={{ padding: 12, background: '#fafafa', borderRadius: 8, lineHeight: 2 }}>
        <div>姓名：{user.name || '（空）'}</div>
        <div>年龄：{user.age}</div>
        <div style={{ fontSize: 12, color: '#999' }}>组件已渲染 {renderTimes} 次</div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
        <button onClick={wrongUpdate} style={{ padding: '6px 12px', cursor: 'pointer' }}>
          ❌ user.age++ 后 setUser(user)
        </button>
        <button onClick={rightUpdate} style={{ padding: '6px 12px', cursor: 'pointer' }}>
          ✅ setUser({'{'} ...prev, age: prev.age + 1 {'}'})
        </button>
        <button onClick={missingSpread} style={{ padding: '6px 12px', cursor: 'pointer' }}>
          ❌ 忘记 ...prev（name 会丢）
        </button>
        <button
          onClick={() => setUser({ name: '小明', age: 18 })} // 重置：直接给一个全新对象
          style={{ padding: '6px 12px', cursor: 'pointer' }}
        >
          重置
        </button>
      </div>

      <p style={{ marginTop: 12, fontSize: 13, color: '#666', lineHeight: 1.8 }}>
        操作顺序建议：先连点三次红色的第一个按钮 → 界面纹丝不动、渲染次数也不涨；
        再点一次绿色按钮 → 年龄会「一下子跳好几岁」，因为之前偷偷改掉的值这时才一起显示出来。
        这正说明<strong>数据其实被改了，只是 React 不知道该重画</strong>——所以必须复制出新对象再 set。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '4）第二步：数组 state——增、删、改、查',
            body: '数组同样不能 push/splice 后直接 set——push 改的是原数组，引用不变。\n\n新增：[...list, newItem] 或 setList(prev => [...prev, newItem])。\n\n删除：list.filter(item => item.id !== id)。\n\n修改某项：list.map(item => item.id === id ? { ...item, done: !item.done } : item)。\n\n插入中间：[...list.slice(0, i), newItem, ...list.slice(i)]。\n\n排序：先 [...list] 复制再 sort，不要对 state 原数组直接 .sort()（sort 会 mutate 原数组）。',
          },
          {
            type: 'code',
            title: '完整大 Demo：TodoList（增删改切换完成）',
            language: 'jsx',
            body: `import { useState } from 'react'

function TodoApp() {
  // todos：数组 state，每项是对象 { id, text, done }
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 JSX', done: true },
    { id: 2, text: '学习 State', done: false },
  ])
  const [input, setInput] = useState('')      // 输入框文字
  const [nextId, setNextId] = useState(3)     // 自增 id

  // 【新增】末尾追加：用 [...prev, 新项]，禁止 push 后 set 原数组
  function handleAdd() {
    const text = input.trim()
    if (!text) return
    setTodos((prev) => [...prev, { id: nextId, text, done: false }])
    setNextId((id) => id + 1)
    setInput('')
  }

  // 【删除】filter 返回不含指定 id 的新数组
  function handleRemove(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  // 【修改】map 找到目标项，展开后改 done 字段
  function handleToggle(id) {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    )
  }

  // 【批量修改】全部标记完成
  function handleCompleteAll() {
    setTodos((prev) => prev.map((t) => ({ ...t, done: true })))
  }

  // 派生值：从 todos 计算，不需要单独 useState
  const doneCount = todos.filter((t) => t.done).length

  return (
    <div style={{ padding: 20, maxWidth: 480 }}>
      <h3>Todo List（{doneCount}/{todos.length} 完成）</h3>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="输入任务，回车添加"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="button" onClick={handleAdd}>添加</button>
        <button type="button" onClick={handleCompleteAll}>全完成</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 0',
              borderBottom: '1px solid #eee',
            }}
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleToggle(todo.id)}
            />
            <span
              style={{
                flex: 1,
                textDecoration: todo.done ? 'line-through' : 'none',
                color: todo.done ? '#999' : '#333',
              }}
            >
              {todo.text}
            </span>
            <button type="button" onClick={() => handleRemove(todo.id)}>
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：数组增删改——push 为什么没反应，concat / filter / map 才行',
            body: `import { useState } from 'react' // 引入 useState 存一个数组

export default function Demo() { // 默认导出组件
  const [list, setList] = useState([ // 数组 state，每项是一个对象
    { id: 1, text: '学 useState', done: true },
    { id: 2, text: '学不可变更新', done: false },
  ])
  const [text, setText] = useState('') // 输入框内容
  const [nextId, setNextId] = useState(3) // 自增 id，保证 key 唯一

  const newItem = () => ({ id: nextId, text: text.trim() || '新任务 ' + nextId, done: false }) // 造一条新数据

  // ❌ push 是「原地修改」：数组内容确实多了一项，但引用没变，React 认为没变化
  function addByPush() {
    list.push(newItem()) // 改的是原数组本身
    setList(list) // 同一个引用 → 界面不更新（下次因为别的原因重渲染时才会突然冒出来）
    setNextId((id) => id + 1)
    setText('')
  }

  // ✅ concat / [...list, item] 都会返回一个「新数组」，引用变了 React 才会重画
  function addByConcat() {
    setList((prev) => [...prev, newItem()]) // 等价写法：prev.concat(newItem())
    setNextId((id) => id + 1)
    setText('')
  }

  // ✅ 删：filter 把不要的那项过滤掉，返回新数组（不要用 splice）
  function remove(id) {
    setList((prev) => prev.filter((item) => item.id !== id))
  }

  // ✅ 改：map 找到目标项，展开这一项再覆盖要改的字段（其它项原样返回）
  function toggle(id) {
    setList((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)))
  }

  // ✅ 排序：先 [...prev] 复制一份再 sort，因为 sort 会原地修改数组
  function sortByDone() {
    setList((prev) => [...prev].sort((x, y) => Number(x.done) - Number(y.done)))
  }

  const doneCount = list.filter((item) => item.done).length // 派生值：算出来的，不用 useState

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)} // 受控输入框
          placeholder="任务名（留空会自动起名）"
          style={{ padding: 6, flex: 1, minWidth: 160 }}
        />
        <button onClick={addByPush} style={{ padding: '6px 12px', cursor: 'pointer' }}>❌ push 添加</button>
        <button onClick={addByConcat} style={{ padding: '6px 12px', cursor: 'pointer' }}>✅ 展开添加</button>
        <button onClick={sortByDone} style={{ padding: '6px 12px', cursor: 'pointer' }}>按完成排序</button>
      </div>

      <p style={{ fontSize: 13, color: '#666', margin: '10px 0' }}>
        共 {list.length} 项，已完成 {doneCount} 项
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {list.map((item) => ( // map 出列表，key 用稳定唯一的 id
          <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid #eee' }}>
            <input type="checkbox" checked={item.done} onChange={() => toggle(item.id)} />
            <span style={{ flex: 1, textDecoration: item.done ? 'line-through' : 'none', color: item.done ? '#999' : '#333' }}>
              {item.text}
            </span>
            <button onClick={() => remove(item.id)} style={{ cursor: 'pointer' }}>删除</button>
          </li>
        ))}
      </ul>

      <p style={{ marginTop: 12, fontSize: 13, color: '#666', lineHeight: 1.8 }}>
        点「❌ push 添加」列表不会变长；接着随便勾一个复选框触发一次重新渲染，
        刚才 push 进去的那几条会一起冒出来——这说明数据早就改了，只是 React 没被通知到。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '5）数组操作速查表',
            headers: ['需求', '写法', '注意'],
            rows: [
              ['末尾追加', '[...arr, item]', '不要用 push'],
              ['开头追加', '[item, ...arr]', '-'],
              ['按 id 删除', 'arr.filter(x => x.id !== id)', '返回新数组'],
              ['改某一项', 'arr.map(x => x.id===id ? {...x, ...} : x)', '项是对象也要展开'],
              ['排序', '[...arr].sort(fn)', '先复制再 sort'],
              ['清空', 'setArr([])', '新空数组'],
            ],
          },
          {
            type: 'text',
            title: '6）第三步：嵌套对象——一层层展开',
            body: 'state 是 { user: { profile: { city: "上海" } } } 这种嵌套时，改深层字段需要每一层都展开复制——改 profile.score 要复制 user 和 profile 两层。\n\n嵌套太深时，考虑：① 拍平 state 结构（profileCity 单独字段）。② 拆成多个 useState。③ 进阶用 immer 库（produce 里可以「看起来」直接改，内部帮你不可变化）。初学先把 ...展开练熟。',
          },
          {
            type: 'code',
            title: '嵌套对象更新 Demo',
            language: 'jsx',
            body: `const [user, setUser] = useState({
  name: '小明',
  profile: { city: '上海', score: 80 },  // 嵌套对象
  tags: ['React', 'CSS'],                 // 嵌套数组
})

// 只改 profile.score：外层 user、内层 profile 都要 ...展开复制
setUser((prev) => ({
  ...prev,
  profile: {
    ...prev.profile,
    score: 90,
  },
}))

// 给 tags 数组追加一项：[...旧数组, 新项]
setUser((prev) => ({
  ...prev,
  tags: [...prev.tags, 'Node'],
}))

// 改 tags 里某一项（按 index）：用 map
setUser((prev) => ({
  ...prev,
  tags: prev.tags.map((tag, i) => (i === 0 ? 'React 19' : tag)),
}))`,
          },
          {
            type: 'list',
            title: '7）自检口诀',
            ordered: true,
            items: [
              '每次 set 之前问：我有没有 new 一个新对象/新数组？',
              '如果 set 的还是原来的引用，界面可能不更新',
              '更新嵌套结构时，从外到内每一层都要 ...展开',
              '数组排序/反转前先 [...arr] 复制',
              '表单多字段优先 updateField + setForm(prev => ({...prev, [key]: value}))',
            ],
          },
          {
            type: 'list',
            title: '8）动手练习清单',
            ordered: true,
            items: [
              '给 TodoApp 加「编辑任务文字」功能（map 里改 text 字段）',
              '做购物车：items 数组，每项 { id, name, price, qty }，实现加减数量',
              '故意写 setTodos(todos.push(...)) 看为什么不工作，再改成 [...todos, newItem]',
              '练习嵌套：user.profile.city 从「上海」改成「北京」，手写完整 setUser',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '对象/数组 state：复制再 set，禁止 push/splice/直接改字段。口诀 ...prev + 覆盖字段；数组增删改查用 [...arr]、filter、map。嵌套几层展开几层。',
          },
        ],
      },
    },
    {
      id: 'multiple-state',
      title: '状态设计原则 + 完整注册表单 Demo',
      summary: '多个 useState vs 一个对象；最小 state；派生值；完整可提交表单',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '状态设计三原则：1）互不相关的分开存；2）能算出来的不要存；3）谁用谁持有，需要共享再提升到父组件。',
          },
          {
            type: 'text',
            title: '为什么状态设计很重要？',
            body: '会 useState 只是第一步；state 放哪、拆几个、哪些该算哪些该存，决定代码好不好维护。放错位置会导致：改一处要改三处、两个 state 不同步、兄弟组件传参地狱。\n\n本节把「多个 useState vs 一个对象」「派生值」「状态提升」讲清楚，并用一个完整注册表单 Demo 串起来——这套模式可以直接复制到登录、设置页等项目。',
          },
          {
            type: 'text',
            title: '1）多个 useState 还是一个大对象？',
            body: '经验法则：\n\n字段少、互不干扰、更新彼此独立 → 多个 useState（如 isOpen、keyword、selectedId）。\n\n字段总是一起更新、要整体提交/校验（如表单） → 一个对象 state。\n\n不要教条——以「读起来最清晰、最不容易不同步」为准。本节的注册表单用对象 state，因为字段多且要整体 validate + submit。',
          },
          {
            type: 'table',
            title: '2）分散 state vs 对象 state 怎么选',
            headers: ['场景', '推荐', '原因'],
            rows: [
              ['搜索框 keyword + 下拉是否展开', '2 个 useState', '互不相关，各自更新'],
              ['注册表单 5 个字段', '1 个 form 对象', '一起提交、一起重置'],
              ['Modal 开关 + Modal 内表单', 'isOpen + form 分开', '关 Modal 不一定清 form'],
              ['列表 + 筛选 keyword', 'items + keyword', 'visible 用 filter 派生，不另存'],
              ['loading + error + data', '各 1 个 useState 或 reducer', '三种 UI 状态独立'],
            ],
          },
          {
            type: 'code',
            title: '两种方案对照',
            language: 'jsx',
            body: `// 方案 A：分散 state（2～3 个互不相关的简单字段）
function SearchBar() {
  const [keyword, setKeyword] = useState('')   // 搜索关键词
  const [isOpen, setIsOpen] = useState(false)    // 下拉是否展开，和 keyword 无关

  // 优点：各管各的，改 keyword 不会误触 isOpen 的逻辑
}

// 方案 B：对象 state（字段多、要整体提交/重置的表单）
function RegisterForm() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    agree: false,
  })

  // 统一更新入口：一个函数改任意字段
  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }
}`,
          },
          {
            type: 'text',
            title: '3）最小 state 原则：派生值不要存',
            body: '如果某个值可以从现有 state 计算得出，就不要再单独 useState 存一份——否则每次改原 state 还要记得 sync 派生 state，极易漏改导致 UI 矛盾。\n\n例如：购物车 items 有了，total（总价）、count（件数）、isEmpty（是否为空）、filteredList（过滤结果）都应该每次渲染时直接计算。\n\n派生值 = 渲染时算的 const，不是 state。只有「用户操作会直接改变」且「不能从其它 state 推出」的才值得 useState。',
          },
          {
            type: 'code',
            title: '派生值 Demo：购物车',
            language: 'jsx',
            body: `function Cart() {
  const [items, setItems] = useState([
    { id: 1, name: '键盘', price: 299, qty: 1 },
    { id: 2, name: '鼠标', price: 99, qty: 2 },
  ])

  // ✅ 派生值：每次渲染时从 items 计算，不要再用 useState 存一份
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const isEmpty = items.length === 0

  // ❌ 错误：再存 total 的 state，改 items 时还要手动 sync total，容易不同步

  return (
    <div>
      <p>共 {count} 件，合计 ¥{total}</p>
      {isEmpty && <p>购物车是空的</p>}
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：搜索过滤——filtered 是算出来的，不要存成 state',
            body: `import { useState } from 'react' // 引入 useState

const ALL = [ // 原始数据放在组件外：它不会变，所以既不用 state 也不用每次重建
  { id: 1, name: 'React', type: '框架' },
  { id: 2, name: 'Vue', type: '框架' },
  { id: 3, name: 'CSS Grid', type: '样式' },
  { id: 4, name: 'Flexbox', type: '样式' },
  { id: 5, name: 'Node.js', type: '后端' },
]

export default function Demo() { // 默认导出组件
  const [keyword, setKeyword] = useState('') // 真正的 state ①：用户输入的关键字
  const [onlyStyle, setOnlyStyle] = useState(false) // 真正的 state ②：是否只看「样式」分类

  // ✅ 派生值：每次渲染时现算。keyword 一变，组件重跑，filtered 自然就是最新的
  const filtered = ALL.filter((item) => {
    const hitKeyword = item.name.toLowerCase().includes(keyword.trim().toLowerCase()) // 关键字匹配（忽略大小写）
    const hitType = !onlyStyle || item.type === '样式' // 没勾选就全放行，勾选了只留「样式」
    return hitKeyword && hitType
  })

  const count = filtered.length // 同样是派生值，不用单独存
  const isEmpty = count === 0 // 「有没有结果」也能算出来

  // ❌ 千万别这样：const [filtered, setFiltered] = useState(ALL)
  //    那样每次改 keyword 都得记得手动 setFiltered(...)，
  //    只要漏掉一处，界面就会显示上一次的旧结果——这是新手最常见的状态不同步 bug。

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)} // 只更新关键字这一个 state
          placeholder="输入关键字，比如 c"
          style={{ padding: 6, flex: 1, minWidth: 160 }}
        />
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14 }}>
          <input type="checkbox" checked={onlyStyle} onChange={(e) => setOnlyStyle(e.target.checked)} />
          只看「样式」
        </label>
      </div>

      <p style={{ fontSize: 13, color: '#666', margin: '10px 0' }}>
        匹配到 {count} 条（这个数字也是算出来的）
      </p>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filtered.map((item) => ( // 直接渲染派生出来的数组
          <li key={item.id} style={{ padding: '6px 10px', marginBottom: 6, background: '#fafafa', borderRadius: 6 }}>
            {item.name} <span style={{ color: '#999', fontSize: 12 }}>· {item.type}</span>
          </li>
        ))}
      </ul>

      {/* 空状态也是由派生值驱动的条件渲染 */}
      {isEmpty && <p style={{ color: '#cf1322', fontSize: 13 }}>没有匹配的结果</p>}

      <p style={{ marginTop: 12, fontSize: 13, color: '#666', lineHeight: 1.8 }}>
        这个 Demo 只有两个 state：<code>keyword</code> 和 <code>onlyStyle</code>。
        列表、条数、空状态全部是<strong>渲染时现算的普通 const</strong>。
        判断标准很简单：<strong>凡是能从已有 state 推出来的值，就不要再 useState 存一份。</strong>
      </p>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '4）状态提升（直觉版）',
            body: '两个兄弟组件要共享同一份数据时，把 state 提升到它们最近的共同父组件，通过 props 往下传，通过回调往上通知。\n\n例如：TodoList 和 TodoStats 都要 todos——state 放在父组件 App，分别 props 传入；TodoList 里删除一项时调用 props.onRemove，由 App 的 setTodos 更新，TodoStats 自动拿到新数据重渲染。\n\n「提升」的意思是 state 从子组件「升」到父组件，不是全局状态。数据流仍然单向：state 在谁那，谁 setState。',
          },
          {
            type: 'list',
            title: '5）注册表单 state 分工（读 Demo 前先看）',
            ordered: true,
            items: [
              'form 对象：所有输入字段',
              'errors 对象：各字段校验错误文案',
              'submitting 布尔：是否正在提交（loading + 防重复）',
              'success 布尔：是否提交成功（切换成功页）',
              'canSubmit：派生值，form.agree && !submitting，不单独 useState',
            ],
          },
          {
            type: 'code',
            title: '完整大 Demo：带校验的注册表单（可直接复用）',
            language: 'jsx',
            body: `import { useState } from 'react'

function RegisterForm() {
  // form：所有输入字段存在一个对象里
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  })
  const [errors, setErrors] = useState({})       // 各字段校验错误，和 form 分离
  const [submitting, setSubmitting] = useState(false)  // 是否正在提交（loading）
  const [success, setSuccess] = useState(false)    // 是否提交成功

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
    // 用户重新输入时，清掉该字段的旧错误提示
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: '' }))
    }
  }

  function validate() {
    const next = {}
    if (!form.username.trim()) {
      next.username = '请输入用户名'
    } else if (form.username.length < 3) {
      next.username = '用户名至少 3 个字符'
    }

    if (!form.email.trim()) {
      next.email = '请输入邮箱'
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(form.email)) {
      next.email = '邮箱格式不正确'
    }

    if (form.password.length < 6) {
      next.password = '密码至少 6 位'
    }

    if (form.confirmPassword !== form.password) {
      next.confirmPassword = '两次密码不一致'
    }

    if (!form.agree) {
      next.agree = '请同意用户协议'
    }

    setErrors(next)
    return Object.keys(next).length === 0  // 无错误返回 true
  }

  async function handleSubmit(e) {
    e.preventDefault()  // 阻止浏览器默认刷新
    if (!validate()) return

    setSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 1000)) // 模拟网络请求
      setSuccess(true)
      console.log('注册成功', form)
    } finally {
      setSubmitting(false)  // 无论成功失败都复位 loading
    }
  }

  function handleReset() {
    setForm({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agree: false,
    })
    setErrors({})
    setSuccess(false)
  }

  // 派生值：能从现有 state 算出来，不必单独 useState
  const canSubmit = form.agree && !submitting

  if (success) {
    return (
      <div style={{ padding: 20 }}>
        <h3>注册成功！</h3>
        <p>欢迎，{form.username}</p>
        <button type="button" onClick={handleReset}>再注册一个</button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{ padding: 20, maxWidth: 400 }}
    >
      <h3>用户注册</h3>

      {/* Field 子组件无 state，纯展示 + 通过 props 回调通知父组件 */}
      <Field
        label="用户名"
        value={form.username}
        error={errors.username}
        onChange={(v) => updateField('username', v)}
      />

      <Field
        label="邮箱"
        type="email"
        value={form.email}
        error={errors.email}
        onChange={(v) => updateField('email', v)}
      />

      <Field
        label="密码"
        type="password"
        value={form.password}
        error={errors.password}
        onChange={(v) => updateField('password', v)}
      />

      <Field
        label="确认密码"
        type="password"
        value={form.confirmPassword}
        error={errors.confirmPassword}
        onChange={(v) => updateField('confirmPassword', v)}
      />

      <label style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '12px 0' }}>
        <input
          type="checkbox"
          checked={form.agree}
          onChange={(e) => updateField('agree', e.target.checked)}
        />
        我已阅读并同意用户协议
      </label>
      {errors.agree && <ErrorText>{errors.agree}</ErrorText>}

      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button type="submit" disabled={!canSubmit}>
          {submitting ? '提交中...' : '注册'}
        </button>
        <button type="button" onClick={handleReset}>重置</button>
      </div>
    </form>
  )
}

// 可复用字段组件：通过 props 接收 value、error、onChange
function Field({ label, type = 'text', value, error, onChange }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'block', marginBottom: 4 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  )
}

function ErrorText({ children }) {
  return <span style={{ color: 'crimson', fontSize: 12 }}>{children}</span>
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：多字段用一个对象 state 管理，右侧实时看 state 长什么样',
            body: `import { useState } from 'react' // 引入 useState

const INITIAL = { username: '', email: '', city: 'shanghai', agree: false } // 初始值抽出来，重置时可以复用

export default function Demo() { // 默认导出组件
  // 这些字段总是一起提交、一起重置，所以合并成一个对象 state 最省心
  const [form, setForm] = useState(INITIAL)
  const [submitted, setSubmitted] = useState(null) // 提交结果：null 表示还没提交过

  // 统一的字段更新入口：[key] 是计算属性名，一个函数搞定所有输入框
  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value })) // 展开旧对象 + 覆盖这一个字段
  }

  // 派生值：能算出来就别存 state，改了 form 它自动就是最新的
  const filled = form.username.trim() !== '' && form.email.includes('@') // 必填是否填好
  const canSubmit = filled && form.agree // 还要勾了协议才能提交

  function handleSubmit(e) {
    e.preventDefault() // 阻止浏览器默认提交（会整页刷新）
    if (!canSubmit) return // 不满足条件直接返回，不做后续处理
    setSubmitted(form) // 真实项目里这一步是发请求，这里直接把 form 存下来展示
  }

  const inputStyle = { width: '100%', padding: 6, boxSizing: 'border-box', marginTop: 4 } // 输入框共用样式

  return (
    <div style={{ display: 'flex', gap: 16, padding: 16, fontFamily: 'system-ui', flexWrap: 'wrap' }}>
      <form onSubmit={handleSubmit} style={{ flex: 1, minWidth: 220 }}>
        <label style={{ display: 'block', marginBottom: 10, fontSize: 14 }}>
          用户名
          <input value={form.username} onChange={(e) => update('username', e.target.value)} style={inputStyle} />
        </label>

        <label style={{ display: 'block', marginBottom: 10, fontSize: 14 }}>
          邮箱
          <input value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="要含 @" style={inputStyle} />
        </label>

        <label style={{ display: 'block', marginBottom: 10, fontSize: 14 }}>
          城市
          {/* select 也是受控组件：value 绑 state，option 的 value 要对得上 */}
          <select value={form.city} onChange={(e) => update('city', e.target.value)} style={inputStyle}>
            <option value="shanghai">上海</option>
            <option value="beijing">北京</option>
            <option value="chengdu">成都</option>
          </select>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, fontSize: 14 }}>
          {/* 复选框用 checked 绑定，取值用 e.target.checked */}
          <input type="checkbox" checked={form.agree} onChange={(e) => update('agree', e.target.checked)} />
          我同意用户协议
        </label>

        <div style={{ display: 'flex', gap: 8 }}>
          {/* disabled 由派生值 canSubmit 控制，不需要额外的 state */}
          <button type="submit" disabled={!canSubmit} style={{ padding: '6px 14px', cursor: canSubmit ? 'pointer' : 'not-allowed' }}>
            提交
          </button>
          {/* 重置只要把整个对象换回初始值，这就是用对象 state 的好处 */}
          <button type="button" onClick={() => { setForm(INITIAL); setSubmitted(null) }} style={{ padding: '6px 14px', cursor: 'pointer' }}>
            重置
          </button>
        </div>
      </form>

      <div style={{ flex: 1, minWidth: 220 }}>
        <div style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>当前 form state（打字就变）：</div>
        <pre style={{ background: '#f5f5f5', padding: 10, borderRadius: 6, fontSize: 12, margin: 0 }}>
          {JSON.stringify(form, null, 2)}
        </pre>
        <div style={{ fontSize: 13, color: '#666', margin: '10px 0 4px' }}>
          派生值：canSubmit = {String(canSubmit)}（没有为它单独 useState）
        </div>
        {/* 提交结果：submitted 不为 null 时才渲染 */}
        {submitted && (
          <div style={{ padding: 10, background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 6, fontSize: 13 }}>
            提交成功：{submitted.username} · {submitted.email}
          </div>
        )}
      </div>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '6）这个表单 Demo 涵盖了哪些状态设计要点',
            body: '1）表单字段用一个 form 对象，整体提交、整体 reset。\n\n2）errors 单独 state，和 form 分离——校验失败时不污染 form 数据本身。\n\n3）submitting/success 是 UI 流程状态，独立管理，逻辑清晰。\n\n4）canSubmit 是派生值，不存 state，避免和 form.agree、submitting 双份维护。\n\n5）updateField 统一更新入口，输入时顺带清该字段错误，体验好。\n\n6）validate() 集中校验，submit 前调用，失败 return 不发请求。\n\n7）Field 子组件无 state，纯展示 + 回调——典型「状态在父、UI 在子」。',
          },
          {
            type: 'list',
            title: '7）实战清单',
            ordered: false,
            items: [
              '表单字段 → form 对象；错误 → errors 对象',
              '加载/成功 → 独立布尔 state',
              '能算的（总价、是否可提交、过滤结果）→ 派生值',
              '提交时 e.preventDefault()，校验失败不发请求',
              'submitting 时 disabled 按钮防重复提交',
              '用户改输入时清对应错误，减少「旧错误还挂着」的困惑',
            ],
          },
          {
            type: 'list',
            title: '8）动手练习清单',
            ordered: true,
            items: [
              '给注册表单加「手机号」字段和校验',
              '提交成功后 3 秒自动跳回表单（用 setTimeout + setSuccess）',
              '把 Field 抽成独立组件文件，感受 state 在父组件、UI 在子组件的分工',
              '故意把 total 存成 useState，改 items 忘记 sync total，观察 bug 再改回派生值',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '互不相关分开存；能算的不存 state；共享数据提升到共同父组件。表单：form + errors + submitting，派生 canSubmit。validate 集中校验，submit 前 preventDefault。',
          },
        ],
      },
    },
  ],
}

export default state
