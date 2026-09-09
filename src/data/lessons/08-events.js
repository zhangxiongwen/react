/**
 * 事件与表单章节
 */
const events = {
  id: 'events',
  title: '事件与表单',
  summary: '事件绑定完整用法、受控表单全家桶、带校验的登录表单完整 Demo',
  order: 8,
  items: [
    {
      id: 'event-basic',
      title: 'React 事件完整用法大 Demo：绑定、传参、合成事件',
      summary: 'onClick/onChange/onSubmit；传函数不传调用结果；event 对象；列表里绑事件',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'React 事件 = 给 JSX 属性传一个函数（onClick={fn}），不是传函数调用结果（onClick={fn()}）。事件名用小驼峰：onClick、onChange。',
          },
          {
            type: 'text',
            title: '为什么 React 事件要单独学？',
            body: 'HTML 里写 onclick="handleClick()" 字符串；React 里写 onClick={handleClick} 传函数——看起来差不多，踩坑点完全不同。\n\n最常见 bug：onClick={handleClick()} 导致「页面一加载就执行」；列表里 onClick={remove(id)} 同理。还有 preventDefault、stopPropagation、合成事件对象 e 的用法，表单提交必写 e.preventDefault()。\n\n本节把绑定、传参、常用事件、表单提交串成完整 Demo，并对照原生 HTML 事件讲清差异。',
          },
          {
            type: 'text',
            title: '1）React 事件和 HTML 事件有什么不同？',
            body: '1）属性名驼峰：onClick 不是 onclick，onKeyDown 不是 onkeydown。\n\n2）值必须是函数引用或箭头函数：onClick={handleClick}，不是 HTML 字符串。\n\n3）React 使用「合成事件」(SyntheticEvent)，包装了原生 Event，API 很像（preventDefault、stopPropagation、target、currentTarget），跨浏览器更一致。\n\n4）React 17+ 事件委托到 root 容器，不是 document（知道即可，一般不影响写法）。\n\n5）不要 return false 阻止默认行为，必须 e.preventDefault()。',
          },
          {
            type: 'table',
            title: '2）HTML 事件 vs React 事件对照',
            headers: ['点', 'HTML', 'React'],
            rows: [
              ['事件名', 'onclick（小写）', 'onClick（驼峰）'],
              ['绑定值', '字符串 "alert(1)"', '函数 {handler} 或 {() => ...}'],
              ['阻止默认', 'return false 有时有效', 'e.preventDefault()'],
              ['阻止冒泡', 'event.stopPropagation()', 'e.stopPropagation() 一样'],
              ['this 指向', '依赖 DOM 绑定方式', '函数组件无 this，用闭包/state'],
            ],
          },
          {
            type: 'text',
            title: '3）第一步：最基础的点击事件',
            body: '在组件里定义一个函数 handleXxx，在 JSX 里写 onClick={handleXxx}。\n\nReact 会在用户点击时调用这个函数，并传入合成事件对象 e。\n\n致命错误：写 onClick={handleXxx()}——括号表示「现在立刻调用」，渲染阶段就执行了，不是等点击。传参也要用箭头函数包一层：onClick={() => handleXxx(id)}。',
          },
          {
            type: 'code',
            title: '完整 Demo：点击、双击、鼠标事件',
            language: 'jsx',
            body: `import { useState } from 'react'

function EventDemo() {
  const [log, setLog] = useState([])  // 用数组 state 存事件日志

  function addLog(msg) {
    // 函数式更新 + 展开：在旧数组末尾追加一条新日志
    setLog((prev) => [...prev, \`\${new Date().toLocaleTimeString()} - \${msg}\`])
  }

  // 事件处理函数：React 会在用户操作时调用，并传入合成事件对象 e
  function handleClick(e) {
    // e 是 SyntheticEvent，用法接近原生 Event（clientX、preventDefault 等）
    addLog(\`单击位置：(\${e.clientX}, \${e.clientY})\`)
  }

  function handleDoubleClick() {
    addLog('双击了！')
  }

  function handleMouseEnter() {
    addLog('鼠标进入区域')
  }

  return (
    <div style={{ padding: 20 }}>
      {/* onXxx={函数}：传函数引用，不是 onClick={handleClick()} */}
      <div
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={handleMouseEnter}
        style={{
          width: 200,
          height: 100,
          background: '#e6f4ff',
          border: '2px dashed #1677ff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          marginBottom: 16,
        }}
      >
        点我 / 双击 / 移入
      </div>

      <button type="button" onClick={() => setLog([])}>清空日志</button>

      <ul style={{ marginTop: 16, fontSize: 14 }}>
        {log.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '4）第二步：传参的三种正确写法',
            body: '如果事件处理函数需要额外参数（如 id、name），不能写 onClick={handleClick(id)}——渲染时就执行了。\n\n正确写法：\n\n① 箭头函数包一层：onClick={() => handleClick(id)}（最常用）。\n\n② bind：onClick={handleClick.bind(null, id)}（较少用，可读性一般）。\n\n③ 柯里化：const makeHandler = (id) => () => { ... }，map 里 onClick={makeHandler(item.id)}。\n\n列表删除、切换选中、传 index 等场景，几乎总是箭头函数包一层。',
          },
          {
            type: 'code',
            title: '完整 Demo：列表删除 / 切换（传参 + 阻止冒泡）',
            language: 'jsx',
            body: `import { useState } from 'react'

function TagList() {
  const [tags, setTags] = useState([
    { id: 1, name: 'React', color: '#61dafb' },
    { id: 2, name: 'JavaScript', color: '#f7df1e' },
    { id: 3, name: 'CSS', color: '#264de4' },
  ])

  // 删除标签：需要 id 参数 + 事件对象 e（用于阻止冒泡）
  function handleRemove(id, e) {
    e.stopPropagation()  // 阻止事件冒泡到父级 div，避免误触 handlePanelClick
    setTags((prev) => prev.filter((t) => t.id !== id))
  }

  function handlePanelClick() {
    console.log('点击了面板背景（不是标签）')
  }

  return (
    <div
      onClick={handlePanelClick}
      style={{ padding: 20, background: '#fafafa', borderRadius: 8 }}
    >
      <h4>点击 × 删除标签（不会触发面板点击）</h4>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {tags.map((tag) => (
          <span
            key={tag.id}
            style={{
              background: tag.color,
              padding: '4px 12px',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            {tag.name}
            {/* ✅ 传参正确写法：箭头函数包一层，点击时才执行 handleRemove(tag.id, e) */}
            <button
              type="button"
              onClick={(e) => handleRemove(tag.id, e)}
              style={{
                border: 'none',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '50%',
                width: 18,
                height: 18,
                cursor: 'pointer',
                color: 'white',
                fontSize: 12,
              }}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}`,
          },
          {
            type: 'code',
            title: '错误 vs 正确：事件绑定对照',
            language: 'jsx',
            body: `function Mistakes() {
  function handleClick() {
    alert('点了')
  }

  return (
    <div>
      {/* ✅ 正确：传函数引用，用户点击时才执行 */}
      <button type="button" onClick={handleClick}>正确</button>

      {/* ✅ 正确：箭头函数包裹，点击时才调用 handleClick() */}
      <button type="button" onClick={() => handleClick()}>也正确</button>

      {/* ✅ 正确：需要传参时用箭头函数 */}
      <button type="button" onClick={() => handleClick()}>传参</button>

      {/* ❌ 错误：handleClick() 带括号 → 渲染阶段立刻执行，不是等点击 */}
      {/* <button onClick={handleClick()}>错</button> */}

      {/* ❌ 错误：handleClick(123) 同样在渲染时就执行了 */}
      {/* <button onClick={handleClick(123)}>错</button> */}
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：事件传参的三种写法——箭头函数 / bind / data 属性',
            body: `import { useState } from 'react' // 引入 useState 记录点了哪个按钮

const FRUITS = ['苹果', '香蕉', '橙子'] // 列表数据，用来演示 map 里怎么传参

export default function Demo() { // 默认导出组件
  const [msg, setMsg] = useState('还没点，点下面任意按钮试试') // 显示最近一次点击结果

  // 公共处理函数：需要两个参数，这就是「传参」的由来
  function pick(name, way) {
    setMsg('选中了「' + name + '」　←　用的是：' + way) // 拼一句话显示出来
  }

  // 写法三专用：不接收自定义参数，改成从事件对象里读 DOM 上的 data-* 属性
  function pickFromDataset(e) {
    // currentTarget 是「绑事件的那个元素」，dataset.name 对应 JSX 上的 data-name
    pick(e.currentTarget.dataset.name, 'data 属性 + dataset')
  }

  const btn = { padding: '6px 12px', cursor: 'pointer' } // 按钮共用样式

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      {/* 写法一：箭头函数包一层（最常用）。点击时才执行 pick(...)，渲染阶段只是创建了个函数 */}
      <div style={{ marginBottom: 10 }}>
        <span style={{ fontSize: 13, color: '#666', marginRight: 8 }}>① 箭头函数包一层：</span>
        {FRUITS.map((name) => (
          <button key={name} onClick={() => pick(name, '箭头函数包一层')} style={{ ...btn, marginRight: 6 }}>
            {name}
          </button>
        ))}
      </div>

      {/* 写法二：bind 预先绑定参数，返回一个新函数。第一个参数是 this，函数组件里传 null 即可 */}
      <div style={{ marginBottom: 10 }}>
        <span style={{ fontSize: 13, color: '#666', marginRight: 8 }}>② bind 预绑参数：</span>
        {FRUITS.map((name) => (
          <button key={name} onClick={pick.bind(null, name, 'bind 预绑参数')} style={{ ...btn, marginRight: 6 }}>
            {name}
          </button>
        ))}
      </div>

      {/* 写法三：参数写在 DOM 的 data-* 属性上，处理函数从 e.currentTarget.dataset 里读 */}
      <div style={{ marginBottom: 10 }}>
        <span style={{ fontSize: 13, color: '#666', marginRight: 8 }}>③ data 属性：</span>
        {FRUITS.map((name) => (
          <button key={name} data-name={name} onClick={pickFromDataset} style={{ ...btn, marginRight: 6 }}>
            {name}
          </button>
        ))}
      </div>

      <div style={{ padding: 10, background: '#e6f4ff', borderRadius: 6, fontSize: 14 }}>{msg}</div>

      <p style={{ marginTop: 12, fontSize: 13, color: '#666', lineHeight: 1.8 }}>
        三种写法效果一样，日常 <strong>99% 用第一种</strong>。
        千万不要写成 <code>onClick={'{'}pick(name){'}'}</code>：带括号表示「渲染时就调用」，
        页面一加载就会执行一遍，还会因为不停 setState 而无限循环。
        写成 <code>{'{'}() =&gt; pick(name){'}'}</code>，交给 React 的才是一个「等着被调用」的函数。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：点击冒泡三层盒子 + stopPropagation / preventDefault 开关',
            body: `import { useState } from 'react' // 引入 useState 记录日志和开关

export default function Demo() { // 默认导出组件
  const [logs, setLogs] = useState([]) // 事件触发日志，新的放最前面
  const [stop, setStop] = useState(false) // 开关①：中层要不要 stopPropagation
  const [prevent, setPrevent] = useState(true) // 开关②：链接要不要 preventDefault

  function log(text) {
    setLogs((prev) => [text, ...prev].slice(0, 8)) // 只保留最近 8 条，避免越堆越长
  }

  function onOuter() {
    log('③ 外层（最外面的灰盒子）') // 冒泡的最后一站
  }

  function onMiddle(e) {
    log('② 中层（蓝盒子）')
    // stopPropagation：阻止事件继续往父级冒泡，外层的 onOuter 就不会被触发
    if (stop) {
      e.stopPropagation()
      log('　↑ 已 stopPropagation，事件到此为止')
    }
  }

  function onInner() {
    log('① 内层按钮') // 事件从这里开始，然后一层层往外传
  }

  function onLink(e) {
    // preventDefault：阻止元素的「默认行为」，<a> 的默认行为就是按 href 跳转
    if (prevent) {
      e.preventDefault()
      log('🔗 已 preventDefault：地址栏没变，页面留在原地')
    } else {
      log('🔗 没有 preventDefault：浏览器会按 href 走，地址栏后面会多出 #jump')
    }
  }

  const box = { padding: 16, borderRadius: 8, cursor: 'pointer' } // 三层盒子共用的内边距

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 12, fontSize: 14, flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <input type="checkbox" checked={stop} onChange={(e) => setStop(e.target.checked)} />
          中层调用 e.stopPropagation()
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <input type="checkbox" checked={prevent} onChange={(e) => setPrevent(e.target.checked)} />
          链接调用 e.preventDefault()
        </label>
      </div>

      {/* 三层嵌套：点最里面的按钮，事件会依次触发 内层 → 中层 → 外层（这就是冒泡） */}
      <div onClick={onOuter} style={{ ...box, background: '#f0f0f0' }}>
        外层
        <div onClick={onMiddle} style={{ ...box, background: '#e6f4ff', marginTop: 8 }}>
          中层
          <button onClick={onInner} style={{ padding: '6px 12px', cursor: 'pointer', marginTop: 8 }}>
            内层按钮（点我看冒泡）
          </button>
        </div>
      </div>

      <p style={{ marginTop: 12, fontSize: 14 }}>
        {/* href="#jump" 页面上没有这个锚点，不勾开关时点它只会在地址栏加个 #jump，方便你观察默认行为 */}
        <a href="#jump" onClick={onLink} style={{ color: '#1677ff' }}>
          我是一个 &lt;a&gt; 链接，点我
        </a>
      </p>

      <button onClick={() => setLogs([])} style={{ padding: '4px 10px', cursor: 'pointer' }}>清空日志</button>

      <ul style={{ fontSize: 13, color: '#555', paddingLeft: 18, marginTop: 8, lineHeight: 1.9 }}>
        {logs.map((item, i) => (
          <li key={i}>{item}</li> // 纯展示的日志列表，顺序不会变，用 index 当 key 没问题
        ))}
      </ul>

      <p style={{ fontSize: 13, color: '#666', lineHeight: 1.8 }}>
        不勾第一个开关：点内层按钮会连着打出 ①②③ 三条日志——事件一路往外冒泡。
        勾上以后只剩 ①②，外层收不到了。真实场景就是「卡片整体可点，卡片里的删除按钮不能连带触发卡片点击」。
        <strong>stopPropagation 管的是「往上传」，preventDefault 管的是「浏览器自带的动作」，两件完全不同的事。</strong>
      </p>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '5）常用事件一览',
            headers: ['事件', '触发时机', '常用取值 / 注意'],
            rows: [
              ['onClick', '单击', '传函数，不传 fn()'],
              ['onChange', '输入/选择变化', 'e.target.value / e.target.checked'],
              ['onSubmit', '表单提交', '必须 e.preventDefault()'],
              ['onKeyDown', '按键按下', 'e.key === "Enter" 回车提交'],
              ['onFocus / onBlur', '聚焦 / 失焦', '失焦校验常用 onBlur'],
              ['onMouseEnter', '鼠标进入', '无冒泡版 hover 逻辑'],
            ],
          },
          {
            type: 'text',
            title: '6）第三步：搜索框与键盘事件',
            body: '搜索框典型组合：onChange 更新 keyword state，onKeyDown 里判断 e.key === "Enter" 触发搜索。\n\n为什么用 onKeyDown 而不是 onKeyPress？onKeyPress 已废弃倾向；onKeyDown 能可靠拿到 Enter、Escape、方向键。记得 Enter 在 form 里可能触发表单提交，必要时 e.preventDefault()。',
          },
          {
            type: 'code',
            title: '完整 Demo：搜索框（onChange + onKeyDown 回车）',
            language: 'jsx',
            body: `import { useState } from 'react'

function SearchBox({ onSearch }) {
  const [keyword, setKeyword] = useState('')

  function handleSubmit() {
    const q = keyword.trim()
    if (q) onSearch?.(q)  // 可选链：父组件没传 onSearch 也不报错
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()  // 阻止 form 内回车触发表格默认提交
      handleSubmit()
    }
  }

  return (
    <div style={{ display: 'flex', gap: 8, padding: 20 }}>
      {/* onChange：每次输入更新 keyword state（受控组件） */}
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="输入关键词，回车搜索"
        style={{ flex: 1, padding: 8 }}
      />
      <button type="button" onClick={handleSubmit}>搜索</button>
    </div>
  )
}

function App() {
  const [result, setResult] = useState('')

  return (
    <>
      {/* onSearch 是回调 prop：子组件搜索完成后通知父组件 */}
      <SearchBox onSearch={(q) => setResult(\`搜索：\${q}\`)} />
      {result && <p style={{ padding: '0 20px' }}>{result}</p>}
    </>
  )
}`,
          },
          {
            type: 'text',
            title: '7）第四步：表单 onSubmit 与 preventDefault',
            body: 'form 里按回车或点 type="submit" 按钮会触发浏览器默认提交——整页刷新，React state 全丢。\n\nReact 里必须：<form onSubmit={handleSubmit}>，handleSubmit 第一行 e.preventDefault()。\n\ntype="button" 的按钮不会触发表单提交，适合「取消」「重置」；type="submit" 或省略 type 的 button 在 form 内会触发 onSubmit。',
          },
          {
            type: 'code',
            title: 'onSubmit 标准模板',
            language: 'jsx',
            body: `function MyForm() {
  // 表单提交处理函数：e 是合成事件对象
  function handleSubmit(e) {
    e.preventDefault() // ← 必须！否则浏览器会刷新整页，React state 全丢
    console.log('安全地处理提交逻辑')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" />
      {/* type="submit" 或 form 内回车 → 触发 onSubmit */}
      <button type="submit">提交</button>
      {/* type="button" 不会触发表单提交，适合「取消」 */}
      <button type="button">取消</button>
    </form>
  )
}`,
          },
          {
            type: 'list',
            title: '8）代码组织建议',
            ordered: false,
            items: [
              'onClick 里超过 2～3 行逻辑，抽成具名函数 handleXxx',
              '列表 map 里的事件几乎总是 onClick={() => fn(item.id)}',
              '不要在 JSX 里写大段业务逻辑——可读性和可测性都差',
              '需要 stopPropagation 时在子元素 handler 里调 e.stopPropagation()',
              '表单统一 onSubmit + preventDefault，别分散到每个按钮 onClick',
            ],
          },
          {
            type: 'list',
            title: '9）动手练习清单',
            ordered: true,
            items: [
              '做计数器，加 onMouseEnter 变色',
              '做可删除的标签列表，用 stopPropagation 防止误触面板',
              '做搜索框，回车和点按钮都能触发搜索',
              '故意写 onClick={alert(1)} 看页面加载时是否立刻弹窗',
              'form 里不写 preventDefault，体验页面刷新丢 state 的现象',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'onClick={fn} 不是 {fn()}；传参用箭头函数包一层。form 提交必 preventDefault。onChange 取 value/checked；回车用 onKeyDown + e.key === "Enter"。',
          },
        ],
      },
    },
    {
      id: 'controlled-input',
      title: '受控表单全家桶大 Demo：文本/下拉/复选/单选/多选',
      summary: '受控 = value 由 state 控制 + onChange 更新；所有表单控件统一模式',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '受控组件 = 输入框显示什么由 React state 决定（value={state}），用户输入时 onChange 更新 state。表单数据完全在 React 手里。',
          },
          {
            type: 'text',
            title: '为什么初学要优先掌握受控组件？',
            body: '受控组件让「界面显示」和「React state」始终同步——任何时候 console.log(form) 都是最新值，随时能校验、禁用提交、字段联动。\n\n非受控组件（defaultValue + ref）适合文件上传等特殊场景，但初学阶段统一用受控，心智模型更简单：输入 = state 变化 = 重渲染显示新值。\n\n下面用一个大 Demo 覆盖 text、textarea、select、checkbox、radio、多选 checkbox，并给出对照表和常见警告修复。',
          },
          {
            type: 'text',
            title: '1）受控 vs 非受控（初学只掌握受控）',
            body: '受控：value + onChange，React 跟踪每次输入，数据在 state 里。\n\n非受控：defaultValue + ref，DOM 自己存值，提交时用 ref.current.value 读一次。\n\n为什么 99% 初学项目用受控？① 实时校验 ② 重置按钮 setState 即可 ③ 字段联动 ④ 提交前统一读 form 对象 ⑤ 和 React 数据流一致。\n\n非受控适合：file 输入、接入 jQuery 插件、极简单的一次性读取。',
          },
          {
            type: 'table',
            title: '2）受控 vs 非受控对照',
            headers: ['对比', '受控', '非受控'],
            rows: [
              ['值存在哪', 'React state', 'DOM 内部'],
              ['怎么读当前值', '直接读 state', 'ref.current.value'],
              ['怎么改显示', 'setState', '改 DOM 或 defaultValue 仅初值'],
              ['实时校验', '✅ 每次 onChange', '❌ 要手动读 ref'],
              ['重置表单', 'setState(初始值)', 'ref 或 form.reset()'],
              ['初学推荐', '✅ 默认选择', '特殊场景再用'],
            ],
          },
          {
            type: 'text',
            title: '3）统一模式（所有控件都适用）',
            body: '四步循环：\n\n① useState 存值（明确初值类型：字符串 ""、布尔 false、数组 []）。\n\n② 控件写 value={state}（checkbox/radio 用 checked）。\n\n③ onChange 里 setState(e.target.value) 或 e.target.checked。\n\n④ 渲染时 value/checked 来自 state，形成闭环。\n\n初始值不要用 undefined——否则先「非受控」后变「受控」，控制台会警告。',
          },
          {
            type: 'code',
            title: '完整大 Demo：用户偏好表单（全部控件类型）',
            language: 'jsx',
            body: `import { useState } from 'react'

function PreferenceForm() {
  // 一个 form 对象存所有字段，受控组件的统一模式
  const [form, setForm] = useState({
    name: '',
    bio: '',
    city: 'shanghai',
    agree: false,
    gender: 'female',
    skills: [],        // 多选 checkbox 用数组
    level: 'beginner',
  })

  // 通用更新：改单个字段
  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  // 多选 checkbox：在数组里 toggle 某项
  function toggleSkill(skill) {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }))
  }

  const skillOptions = ['React', 'Vue', 'Node', 'CSS']

  return (
    <form style={{ padding: 20, maxWidth: 480 }}>
      <h3>用户偏好（受控表单全家桶）</h3>

      {/* 1. 单行文本：value + onChange(e.target.value) */}
      <div style={{ marginBottom: 12 }}>
        <label>姓名：</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="请输入姓名"
          style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
        />
      </div>

      {/* 2. 多行文本 textarea：同样用 value */}
      <div style={{ marginBottom: 12 }}>
        <label>简介：</label>
        <textarea
          value={form.bio}
          onChange={(e) => update('bio', e.target.value)}
          rows={4}
          placeholder="介绍一下自己"
          style={{ width: '100%', padding: 8, boxSizing: 'border-box' }}
        />
      </div>

      {/* 3. 下拉 select：value 绑定 state，option 的 value 要对应 */}
      <div style={{ marginBottom: 12 }}>
        <label>城市：</label>
        <select
          value={form.city}
          onChange={(e) => update('city', e.target.value)}
          style={{ padding: 8, minWidth: 120 }}
        >
          <option value="shanghai">上海</option>
          <option value="beijing">北京</option>
          <option value="guangzhou">广州</option>
        </select>
      </div>

      {/* 4. 单个 checkbox：用 checked + e.target.checked（不是 value） */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={form.agree}
            onChange={(e) => update('agree', e.target.checked)}
          />
          同意用户协议
        </label>
      </div>

      {/* 5. 多个 checkbox：checked={数组.includes(项)} + toggle 函数 */}
      <div style={{ marginBottom: 12 }}>
        <p>技能（多选）：</p>
        {skillOptions.map((skill) => (
          <label key={skill} style={{ display: 'block', marginBottom: 4 }}>
            <input
              type="checkbox"
              checked={form.skills.includes(skill)}
              onChange={() => toggleSkill(skill)}
            />
            {' '}{skill}
          </label>
        ))}
      </div>

      {/* 6. radio 单选：checked={state === '选项值'}，onChange 设 state */}
      <div style={{ marginBottom: 12 }}>
        <p>性别：</p>
        <label style={{ marginRight: 16 }}>
          <input
            type="radio"
            name="gender"
            checked={form.gender === 'female'}
            onChange={() => update('gender', 'female')}
          />
          {' '}女
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            checked={form.gender === 'male'}
            onChange={() => update('gender', 'male')}
          />
          {' '}男
        </label>
      </div>

      {/* 7. radio 用 map 渲染一组选项 */}
      <div style={{ marginBottom: 12 }}>
        <p>水平：</p>
        {['beginner', 'intermediate', 'advanced'].map((lv) => (
          <label key={lv} style={{ marginRight: 12 }}>
            <input
              type="radio"
              name="level"
              checked={form.level === lv}
              onChange={() => update('level', lv)}
            />
            {' '}{lv}
          </label>
        ))}
      </div>

      {/* 受控表单好处：state 和界面始终同步，可随时预览 */}
      <pre
        style={{
          background: '#f5f5f5',
          padding: 12,
          borderRadius: 4,
          fontSize: 13,
        }}
      >
        {JSON.stringify(form, null, 2)}
      </pre>
    </form>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：受控表单全家桶——文本 / 下拉 / 复选 / 单选 / 多选，实时看 state',
            body: `import { useState } from 'react' // 引入 useState 存整个表单

const SKILLS = ['React', 'Vue', 'Node', 'CSS'] // 多选用的候选项
const LEVELS = [ // 单选用的候选项，value 是存进 state 的值，label 是显示给用户看的
  { value: 'beginner', label: '入门' },
  { value: 'advanced', label: '进阶' },
]

export default function Demo() { // 默认导出组件
  // 所有字段的初值都写明类型：文本用 ''、布尔用 false、多选用 []，绝不要留 undefined
  const [form, setForm] = useState({
    name: '',
    city: 'shanghai',
    agree: false,
    level: 'beginner',
    skills: [],
  })

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value })) // 通用更新：展开旧对象，只覆盖这一个字段
  }

  // 多选 checkbox：在数组里做「有就删掉、没有就加上」的 toggle
  function toggleSkill(skill) {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill) // 已选中 → 过滤掉
        : [...prev.skills, skill], // 未选中 → 追加
    }))
  }

  const inputStyle = { width: '100%', padding: 6, boxSizing: 'border-box', marginTop: 4 }

  return (
    <div style={{ display: 'flex', gap: 16, padding: 16, fontFamily: 'system-ui', flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 220, fontSize: 14 }}>
        {/* ① 文本框：绑 value，取 e.target.value */}
        <label style={{ display: 'block', marginBottom: 10 }}>
          姓名（input text）
          <input value={form.name} onChange={(e) => update('name', e.target.value)} style={inputStyle} />
        </label>

        {/* ② 下拉：同样绑 value，option 的 value 要和 state 的取值一一对应 */}
        <label style={{ display: 'block', marginBottom: 10 }}>
          城市（select）
          <select value={form.city} onChange={(e) => update('city', e.target.value)} style={inputStyle}>
            <option value="shanghai">上海</option>
            <option value="beijing">北京</option>
            <option value="chengdu">成都</option>
          </select>
        </label>

        {/* ③ 单个复选框：绑的是 checked，取的是 e.target.checked（不是 value！） */}
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <input type="checkbox" checked={form.agree} onChange={(e) => update('agree', e.target.checked)} />
          同意用户协议（checkbox）
        </label>

        {/* ④ 单选 radio：checked 写成「state === 这个选项的值」，选中时把 state 设成该值 */}
        <div style={{ marginBottom: 10 }}>
          水平（radio）：
          {LEVELS.map((lv) => (
            <label key={lv.value} style={{ marginLeft: 10 }}>
              <input
                type="radio"
                name="demo-level" // 同一组 radio 用同一个 name，浏览器才知道它们互斥
                checked={form.level === lv.value}
                onChange={() => update('level', lv.value)}
              />
              {' ' + lv.label}
            </label>
          ))}
        </div>

        {/* ⑤ 多选：checked 用「数组里有没有这一项」判断 */}
        <div>
          技能（多选 checkbox）：
          {SKILLS.map((skill) => (
            <label key={skill} style={{ marginLeft: 10 }}>
              <input type="checkbox" checked={form.skills.includes(skill)} onChange={() => toggleSkill(skill)} />
              {' ' + skill}
            </label>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 220 }}>
        <div style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>整个表单对象（改哪都会立刻变）：</div>
        <pre style={{ background: '#f5f5f5', padding: 10, borderRadius: 6, fontSize: 12, margin: 0 }}>
          {JSON.stringify(form, null, 2)}
        </pre>
        <p style={{ fontSize: 13, color: '#666', lineHeight: 1.8 }}>
          受控组件的核心就是这条闭环：<strong>界面显示 state → 用户操作触发 onChange → setState → 重新渲染</strong>。
          所以任何时刻 state 都等于你在界面上看到的内容，校验、重置、联动都变得很简单。
        </p>
      </div>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '4）各控件 value 来源对照表',
            headers: ['控件', '绑定属性', 'onChange 取值'],
            rows: [
              ['input text/email/password/number', 'value', 'e.target.value'],
              ['textarea', 'value', 'e.target.value'],
              ['select', 'value', 'e.target.value'],
              ['checkbox 单个', 'checked', 'e.target.checked'],
              ['checkbox 多个', 'checked={arr.includes(x)}', '手动 toggle 数组'],
              ['radio', 'checked={state === "x"}', 'onChange 里 setState 为选项值'],
            ],
            note: 'radio 的 name 属性用于 HTML 原生分组；React 里主要靠 checked 比较 state 值。',
          },
          {
            type: 'code',
            title: '各控件 value 来源对照表（代码速查）',
            language: 'jsx',
            body: `// ========== 受控组件速查：每种控件绑什么属性、onChange 取什么 ==========

// input[type=text|email|password|number]
//   → value={state} + onChange={(e) => setState(e.target.value)}

// textarea
//   → value={state} + onChange={(e) => setState(e.target.value)}

// select
//   → value={state} + onChange={(e) => setState(e.target.value)}

// input[type=checkbox] 单个
//   → checked={state} + onChange={(e) => setState(e.target.checked)}

// input[type=checkbox] 多个（多选）
//   → checked={arr.includes(项)} + 手动 toggle 数组

// input[type=radio]
//   → checked={state === '选项值'} + onChange 里 setState 为选项值`,
          },
          {
            type: 'text',
            title: '5）常见报错：uncontrolled → controlled',
            body: '控制台警告：A component is changing an uncontrolled input to be controlled。\n\n原因：初始值是 undefined，第一次渲染 input 是非受控；后来 setState 变成字符串，变受控——React 认为这不可靠。\n\n修复：给明确初始类型——文本 useState("")，布尔 useState(false)，下拉 useState("shanghai") 且 option 有对应 value。永远不要让 value={maybeUndefined} 从 undefined 变成字符串。',
          },
          {
            type: 'code',
            title: '常见报错：uncontrolled → controlled',
            language: 'jsx',
            body: `// 控制台警告：A component is changing an uncontrolled input to be controlled

// ❌ 原因：初始值 undefined → 第一次渲染「非受控」；后来变成字符串 → 变「受控」
const [name, setName] = useState()  // undefined，没有明确初值
// <input value={name} onChange={...} />

// ✅ 修复：给明确初始类型，从第一次渲染就是受控组件
const [name, setName] = useState('')       // 文本用空字符串
const [agree, setAgree] = useState(false)  // 复选框用 false
const [city, setCity] = useState('shanghai') // 下拉要有默认 option 值对应`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：为什么这个输入框打不进字？漏写 onChange / 正确受控 / 非受控 三格对照',
            body: `import { useState } from 'react' // 引入 useState

export default function Demo() { // 默认导出组件
  const [good, setGood] = useState('正确的受控输入框') // 正确受控：state 就是输入框的内容
  const [bad] = useState('这里一个字也打不进去') // 故意不解构 setter：没人能改这个 state
  const [keyCount, setKeyCount] = useState(0) // 统计在左边敲了多少次键，证明「事件有，只是没 setState」

  const box = { flex: 1, minWidth: 220, padding: 12, borderRadius: 8 } // 三个格子共用样式
  const input = { width: '100%', padding: 6, boxSizing: 'border-box', marginTop: 6 }

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {/* ❌ 只写了 value，没有 onChange：value 被 state 锁死，用户敲什么都会被 React 覆盖回去 */}
        <div style={{ ...box, background: '#fff1f0', border: '1px solid #ffa39e' }}>
          <div style={{ fontSize: 13, color: '#cf1322' }}>❌ 只有 value，没有 onChange</div>
          <input
            value={bad} // 每次渲染都把内容强行设回 state 的值
            onKeyDown={() => setKeyCount((c) => c + 1)} // 只用来计数，不改 bad，所以内容纹丝不动
            style={input}
          />
          <div style={{ fontSize: 12, color: '#999', marginTop: 6 }}>
            你已经敲了 {keyCount} 次键，内容却没变（控制台还会有一条 React 警告）
          </div>
        </div>

        {/* ✅ value + onChange 配套：敲键 → setState → 重新渲染 → value 变成新内容 */}
        <div style={{ ...box, background: '#f6ffed', border: '1px solid #b7eb8f' }}>
          <div style={{ fontSize: 13, color: '#389e0d' }}>✅ value + onChange 配套</div>
          <input
            value={good}
            onChange={(e) => setGood(e.target.value)} // e.target.value 是用户刚敲出来的最新内容
            style={input}
          />
          <div style={{ fontSize: 12, color: '#999', marginTop: 6 }}>
            state 现在是：「{good}」（长度 {good.length}）
          </div>
        </div>

        {/* 🟡 非受控：defaultValue 只提供初始内容，之后由 DOM 自己保管，React 不掺和 */}
        <div style={{ ...box, background: '#fffbe6', border: '1px solid #ffe58f' }}>
          <div style={{ fontSize: 13, color: '#d48806' }}>🟡 非受控：defaultValue，没有 value</div>
          <input defaultValue="能打字，但 React 不知道内容" style={input} />
          <div style={{ fontSize: 12, color: '#999', marginTop: 6 }}>
            能正常输入，可 React 读不到它的值，要提交时得靠 ref 去 DOM 里取
          </div>
        </div>
      </div>

      <p style={{ marginTop: 12, fontSize: 13, color: '#666', lineHeight: 1.8 }}>
        为什么左边打不进字？因为 <code>value={'{'}state{'}'}</code> 的意思是
        <strong>「这个框永远显示 state 的值」</strong>。你按下按键，浏览器刚要改内容，
        React 下一次渲染又把它设回 state——而 state 从来没被更新过，所以看起来像卡死了。
        <strong>受控组件的 value 和 onChange 必须成对出现</strong>：value 负责显示，onChange 负责写回 state，缺一不可。
        中间那格才是标准写法；如果确实只想展示不让改，请用 <code>readOnly</code> 或 <code>disabled</code>，而不是省略 onChange。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '6）受控表单的好处（为什么要学）',
            body: '1）随时读取最新值做校验——onChange 或 onBlur 里检查。\n\n2）可以程序化修改——重置按钮 setForm(initial) 一行搞定。\n\n3）多个字段联动——选「其它」才显示额外输入框，用 state 驱动条件渲染。\n\n4）提交前统一 validate()——读 form 对象即可。\n\n5）submitting 时 disabled 所有输入，防重复提交。\n\n6）下方 JSON 预览 Demo 就是受控的直观证明：打字时 state 实时变。',
          },
          {
            type: 'list',
            title: '7）非受控仅了解',
            ordered: false,
            items: [
              '文件上传 <input type="file" /> 通常非受控，用 e.target.files 或 ref',
              '简单场景可用 defaultValue 代替 value，但初学统一用受控',
              'ref + uncontrolled 在 React 19 仍可用，只是不是默认推荐路径',
            ],
          },
          {
            type: 'list',
            title: '8）动手练习清单',
            ordered: true,
            items: [
              '在 PreferenceForm 加「年龄」number 输入框',
              '选 skills 包含 React 时，下方显示「前端路线」提示（联动）',
              '加「重置」按钮，把所有字段恢复初始值',
              '故意用 useState() 不设初始值，看控制台警告',
              '对照表：默写 textarea 和 checkbox 分别绑 value 还是 checked',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '受控 = value/checked 来自 state + onChange 更新 state。文本用 value，checkbox 用 checked。初值别 undefined；多选 checkbox 用数组 + includes/toggle。',
          },
        ],
      },
    },
    {
      id: 'form-submit',
      title: '完整登录表单 Demo：校验、提交、loading、错误展示',
      summary: '可复用的登录表单模式：validate + async submit + 字段级错误 + 防重复提交',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '表单提交四步：preventDefault → validate → 发请求 → 根据结果更新 UI（成功跳转 / 失败显示错误）。',
          },
          {
            type: 'text',
            title: '为什么单独做一个登录表单 Demo？',
            body: '事件章节的受控输入是「零件」；登录表单是「整机组装」——把 state 设计、校验、async 请求、loading、字段错误、整表单错误、UX 细节（显示密码、记住我）串成生产里最常见的模式。\n\n你把这个 Demo 吃透，注册、设置、评论发布等表单都能复用同一骨架：form + errors + submitting + validate + handleSubmit。',
          },
          {
            type: 'text',
            title: '1）一个生产级登录表单需要哪些部分？',
            body: '1）form state 存 account/password/remember。\n\n2）errors state 存各字段校验错误（和 form 分离）。\n\n3）formError 存接口返回的整体错误（如「账号密码不匹配」）。\n\n4）submitting state 控制 loading 文案和 disabled。\n\n5）validate() 函数集中校验，返回 boolean。\n\n6）handleSubmit：preventDefault → validate → async 请求 → try/catch/finally。\n\n7）每个字段下方条件渲染错误；顶部渲染 formError。\n\n8）update 时清掉对应错误，避免用户改了还显示旧错。',
          },
          {
            type: 'table',
            title: '2）字段错误 vs 整表单错误',
            headers: ['类型', 'state', '展示位置', '典型来源'],
            rows: [
              ['字段错误', 'errors.account', '输入框下方', 'validate() 格式校验'],
              ['整表单错误', 'formError', '表单顶部红条', '接口 401/500 返回'],
              ['何时清', 'update 输入时清该字段', 'update 或重试时清', '用户重新提交前清'],
            ],
          },
          {
            type: 'text',
            title: '3）逐步实现思路',
            body: 'Step 1：搭表单骨架，受控 input，能打字。\n\nStep 2：加 onSubmit + preventDefault，console.log 表单值。\n\nStep 3：写 validate，失败 setErrors 并 return。\n\nStep 4：模拟 async 登录，加 submitting，按钮显示「登录中...」。\n\nStep 5：try/catch 处理失败 setFormError；finally 里 submitting 复位。\n\nStep 6：UX——显示密码、记住我、disabled 态、autoComplete。',
          },
          {
            type: 'code',
            title: '完整 Demo：登录表单（可直接复制到项目）',
            language: 'jsx',
            body: `import { useState } from 'react'

function LoginForm({ onSuccess }) {
  // form state：账号、密码、记住我
  const [form, setForm] = useState({
    account: '',
    password: '',
    remember: false,
  })
  const [errors, setErrors] = useState({})           // 字段级校验错误
  const [submitting, setSubmitting] = useState(false) // 提交中 loading
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')     // 整表单错误（如接口返回）

  // 统一更新 form，并清掉对应错误（改善 UX）
  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }))
    if (formError) setFormError('')
  }

  function validate() {
    const next = {}
    const account = form.account.trim()

    if (!account) {
      next.account = '请输入账号（邮箱或手机号）'
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(account) && !/^1\\d{10}$/.test(account)) {
      next.account = '请输入正确的邮箱或 11 位手机号'
    }

    if (!form.password) {
      next.password = '请输入密码'
    } else if (form.password.length < 6) {
      next.password = '密码至少 6 位'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()  // 阻止页面刷新
    setFormError('')

    if (!validate()) return  // 校验失败不发请求

    setSubmitting(true)
    try {
      // 模拟 API 请求
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (form.account === 'admin' && form.password === '123456') {
            resolve({ token: 'fake-token', name: '管理员' })
          } else {
            reject(new Error('账号或密码错误'))
          }
        }, 1000)
      })

      const result = { token: 'fake-token', name: '管理员' }
      console.log('登录成功', { ...form, password: '***' })
      onSuccess?.(result)  // 回调 prop 通知父组件
    } catch (err) {
      setFormError(err.message || '登录失败，请稍后重试')
    } finally {
      setSubmitting(false)  // 无论成功失败都结束 loading
    }
  }

  function handleReset() {
    setForm({ account: '', password: '', remember: false })
    setErrors({})
    setFormError('')
  }

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '40px auto',
        padding: 24,
        border: '1px solid #e8e8e8',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <h2 style={{ marginTop: 0, textAlign: 'center' }}>登录</h2>
      <p style={{ color: '#999', fontSize: 13, textAlign: 'center' }}>
        测试账号：admin / 123456
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* 整表单错误：接口/业务失败时显示在顶部 */}
        {formError && (
          <div
            style={{
              background: '#fff2f0',
              border: '1px solid #ffccc7',
              color: '#cf1322',
              padding: '8px 12px',
              borderRadius: 4,
              marginBottom: 16,
              fontSize: 14,
            }}
          >
            {formError}
          </div>
        )}

        {/* 账号：受控 input */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
            账号
          </label>
          <input
            type="text"
            value={form.account}
            onChange={(e) => update('account', e.target.value)}
            placeholder="邮箱或手机号"
            autoComplete="username"
            disabled={submitting}
            style={{
              width: '100%',
              padding: '10px 12px',
              boxSizing: 'border-box',
              border: errors.account ? '1px solid #ff4d4f' : '1px solid #d9d9d9',
              borderRadius: 6,
            }}
          />
          {errors.account && (
            <span style={{ color: '#ff4d4f', fontSize: 12 }}>{errors.account}</span>
          )}
        </div>

        {/* 密码：type 随 showPassword 切换 text/password */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
            密码
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              placeholder="至少 6 位"
              autoComplete="current-password"
              disabled={submitting}
              style={{
                flex: 1,
                padding: '10px 12px',
                boxSizing: 'border-box',
                border: errors.password ? '1px solid #ff4d4f' : '1px solid #d9d9d9',
                borderRadius: 6,
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              disabled={submitting}
              style={{ padding: '0 12px', whiteSpace: 'nowrap' }}
            >
              {showPassword ? '隐藏' : '显示'}
            </button>
          </div>
          {errors.password && (
            <span style={{ color: '#ff4d4f', fontSize: 12 }}>{errors.password}</span>
          )}
        </div>

        {/* 记住我：checkbox 用 checked */}
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 24,
            fontSize: 14,
          }}
        >
          <input
            type="checkbox"
            checked={form.remember}
            onChange={(e) => update('remember', e.target.checked)}
            disabled={submitting}
          />
          记住我
        </label>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="submit"
            disabled={submitting}
            style={{
              flex: 1,
              padding: '10px 0',
              background: submitting ? '#91caff' : '#1677ff',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: submitting ? 'not-allowed' : 'pointer',
              fontSize: 16,
            }}
          >
            {submitting ? '登录中...' : '登录'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={submitting}
            style={{ padding: '10px 16px', borderRadius: 6 }}
          >
            重置
          </button>
        </div>
      </form>
    </div>
  )
}

// 使用示例：onSuccess 是回调 prop
function App() {
  return (
    <LoginForm
      onSuccess={(user) => alert(\`欢迎，\${user.name}！\`)}
    />
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：登录表单全流程——失焦校验、提交拦截、loading、成功页',
            body: `import { useState } from 'react' // 引入 useState

const EMPTY = { account: '', password: '' } // 初始表单值，重置时复用

// 校验函数放在组件外：纯函数，进什么值出什么错，好读也好测
function validateField(key, value) {
  if (key === 'account') {
    if (!value.trim()) return '请输入账号'
    if (value.trim().length < 3) return '账号至少 3 个字符'
  }
  if (key === 'password') {
    if (!value) return '请输入密码'
    if (value.length < 6) return '密码至少 6 位'
  }
  return '' // 空字符串表示这个字段没问题
}

export default function Demo() { // 默认导出组件
  const [form, setForm] = useState(EMPTY) // 表单字段
  const [errors, setErrors] = useState({}) // 字段级错误文案，和 form 分开存
  const [formError, setFormError] = useState('') // 整表单错误（模拟接口返回的「账号密码不对」）
  const [loading, setLoading] = useState(false) // 是否正在提交，控制 loading 文案和禁用
  const [user, setUser] = useState(null) // 登录成功后的结果，null 表示还没登录

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' })) // 用户一改就清掉旧错误，别让红字一直挂着
    if (formError) setFormError('')
  }

  // 失焦校验：离开输入框时才提示，比每敲一个字就报红友好得多
  function handleBlur(key) {
    setErrors((prev) => ({ ...prev, [key]: validateField(key, form[key]) }))
  }

  async function handleSubmit(e) {
    e.preventDefault() // 第一步：必须阻止浏览器默认提交，否则整页刷新、state 全丢
    // 第二步：提交前把所有字段再校验一遍（用户可能一个都没碰过，blur 从没触发）
    const next = { account: validateField('account', form.account), password: validateField('password', form.password) }
    setErrors(next)
    if (next.account || next.password) return // 有错就拦下来，不发请求

    setLoading(true) // 第三步：进入 loading，按钮禁用防重复提交
    try {
      // 用 setTimeout 假装网络请求，1 秒后根据账号密码决定成功还是失败
      const result = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (form.account === 'admin' && form.password === '123456') resolve({ name: '管理员' })
          else reject(new Error('账号或密码错误（试试 admin / 123456）'))
        }, 1000)
      })
      setUser(result) // 第四步：成功，切换到结果视图
    } catch (err) {
      setFormError(err.message) // 失败：整表单错误显示在顶部
    } finally {
      setLoading(false) // 不管成功失败都要关掉 loading，否则会永远卡在「登录中…」
    }
  }

  // 成功后展示结果视图（真实项目里这一步通常是跳转路由）
  if (user) {
    return (
      <div style={{ padding: 24, fontFamily: 'system-ui', textAlign: 'center' }}>
        <div style={{ fontSize: 18, marginBottom: 8 }}>登录成功，欢迎 {user.name} 👋</div>
        <button
          onClick={() => { setUser(null); setForm(EMPTY); setErrors({}) }} // 退出：把所有状态复位
          style={{ padding: '6px 14px', cursor: 'pointer' }}
        >
          退出，再试一次
        </button>
      </div>
    )
  }

  const field = (key, label, type) => ( // 小工具函数：两个字段结构一样，抽出来少写一半代码
    <label style={{ display: 'block', marginBottom: 12, fontSize: 14 }}>
      {label}
      <input
        type={type}
        value={form[key]} // 受控：显示 state
        onChange={(e) => update(key, e.target.value)} // 受控：写回 state
        onBlur={() => handleBlur(key)} // 失焦时校验这一个字段
        disabled={loading} // 提交中禁止修改
        style={{ width: '100%', padding: 6, boxSizing: 'border-box', marginTop: 4, border: errors[key] ? '1px solid #ff4d4f' : '1px solid #d9d9d9', borderRadius: 4 }}
      />
      {/* && 短路：有错误文案才渲染这行红字 */}
      {errors[key] && <span style={{ color: '#ff4d4f', fontSize: 12 }}>{errors[key]}</span>}
    </label>
  )

  return (
    <form onSubmit={handleSubmit} noValidate style={{ padding: 16, maxWidth: 340, fontFamily: 'system-ui' }}>
      <div style={{ fontSize: 13, color: '#999', marginBottom: 10 }}>测试账号：admin / 123456</div>
      {formError && (
        <div style={{ background: '#fff2f0', border: '1px solid #ffccc7', color: '#cf1322', padding: '6px 10px', borderRadius: 4, marginBottom: 12, fontSize: 13 }}>
          {formError}
        </div>
      )}
      {field('account', '账号', 'text')}
      {field('password', '密码', 'password')}
      <button type="submit" disabled={loading} style={{ padding: '6px 16px', cursor: loading ? 'not-allowed' : 'pointer' }}>
        {loading ? '登录中…' : '登录'}
      </button>
      <p style={{ fontSize: 13, color: '#666', lineHeight: 1.8 }}>
        试试这几种情况：直接点「登录」（会被校验拦住）、随便填个错密码（顶部出现接口错误）、
        填对了看按钮变成「登录中…」并且输入框被禁用。这套骨架
        <strong>form + errors + formError + loading</strong> 可以原样搬到注册、改密码等任何表单里。
      </p>
    </form>
  )
}`,
          },
          {
            type: 'text',
            title: '4）代码 Walkthrough：关键逻辑在哪',
            body: 'update()：统一更新 form 并清错误——避免每个 input 重复四行逻辑。\n\nvalidate()：返回 boolean，true 才继续；错误集中 setErrors(next)，UI 自动显示。\n\nhandleSubmit：async + try/catch/finally 保证 submitting 一定复位，即使抛错也不会卡在「登录中...」。\n\nformError vs errors.account：前者是接口/业务整体失败，后者是单字段格式问题——用户能区分「邮箱格式错了」和「账号密码不对」。\n\nnoValidate：关闭浏览器原生校验气泡，用我们自己的中文 validate 文案。\n\ndisabled={submitting}：提交中禁止改输入和重复点，防双份请求。',
          },
          {
            type: 'code',
            title: '接入真实 API 时只需改 handleSubmit 里 try 块',
            language: 'jsx',
            body: `async function handleSubmit(e) {
  e.preventDefault()       // 第一步：阻止浏览器默认提交
  if (!validate()) return  // 第二步：校验失败直接 return

  setSubmitting(true)
  try {
    // 第三步：换成真实 fetch 请求
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        account: form.account.trim(),
        password: form.password,
      }),
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message || '登录失败')
    }

    const data = await res.json()
    localStorage.setItem('token', data.token)
    onSuccess?.(data)  // 第四步：成功回调
  } catch (err) {
    setFormError(err.message)  // 接口错误显示在表单顶部
  } finally {
    setSubmitting(false)  // 第五步：无论成败都复位 loading
  }
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：表单提交为什么第一行必须 e.preventDefault()',
            body: `import { useState } from 'react' // 引入 useState

export default function Demo() { // 默认导出组件
  const [usePrevent, setUsePrevent] = useState(true) // 开关：模拟「写不写 e.preventDefault()」
  const [keyword, setKeyword] = useState('') // 输入框内容，用来演示刷新后会丢什么
  const [times, setTimes] = useState(0) // 提交次数，同样是「刷新就会清零」的 state
  const [tip, setTip] = useState('') // 提示文案

  function handleSubmit(e) {
    // 注意：这里无论开关是什么都调用 preventDefault，
    // 否则这个教学页面会被真的刷新掉，你就看不到下面的说明了。
    // 真实项目里，你「不写这一行」时的效果就等于下面 else 分支描述的那样。
    e.preventDefault()

    setTimes((n) => n + 1) // 提交次数 +1

    if (usePrevent) {
      setTip('✅ 写了 e.preventDefault()：页面没刷新，输入框内容和提交次数都还在，可以安心去发请求。')
    } else {
      setTip(
        '❌ 如果没写 e.preventDefault()：浏览器会执行 form 的默认行为——' +
          '带着表单数据向当前地址发一次 GET 并整页刷新。' +
          '结果就是输入框被清空、提交次数归零、React 应用整个重新挂载，你的 fetch 往往还没发出去就被打断了。'
      )
    }
  }

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui', maxWidth: 460 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, fontSize: 14 }}>
        <input type="checkbox" checked={usePrevent} onChange={(e) => setUsePrevent(e.target.checked)} />
        handleSubmit 里写了 e.preventDefault()
      </label>

      {/* onSubmit 绑在 form 上：点 type="submit" 的按钮、或在输入框里按回车都会触发 */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)} // 受控输入框
          placeholder="随便输点字，再按回车"
          style={{ flex: 1, padding: 6 }}
        />
        {/* type="submit"（或省略 type）会触发表单提交 */}
        <button type="submit" style={{ padding: '6px 12px', cursor: 'pointer' }}>提交</button>
        {/* type="button" 不会触发提交，所以「清空」不会走 handleSubmit */}
        <button
          type="button"
          onClick={() => { setKeyword(''); setTimes(0); setTip('') }}
          style={{ padding: '6px 12px', cursor: 'pointer' }}
        >
          清空
        </button>
      </form>

      <div style={{ marginTop: 12, padding: 10, background: '#fafafa', borderRadius: 6, fontSize: 13, lineHeight: 1.9 }}>
        <div>已提交 {times} 次，输入框里现在是：「{keyword || '（空）'}」</div>
        <div style={{ color: usePrevent ? '#389e0d' : '#cf1322' }}>{tip}</div>
      </div>

      <p style={{ marginTop: 12, fontSize: 13, color: '#666', lineHeight: 1.8 }}>
        &lt;form&gt; 的默认行为是「提交给服务器并刷新页面」——这是 React 出现之前的网页玩法。
        单页应用里我们要自己接管这个过程：<strong>onSubmit 的第一行永远是 e.preventDefault()</strong>，
        然后再校验、发请求、更新 state。
        另外记住 <code>type="button"</code> 的按钮不会触发提交，「取消 / 重置 / 清空」这类按钮一定要写上它，
        否则在 form 里它默认就是 submit，会莫名其妙把表单提交出去。
      </p>
    </div>
  )
}`,
          },
          {
            type: 'list',
            title: '5）实战清单',
            ordered: false,
            items: [
              '✅ onSubmit + preventDefault',
              '✅ 校验失败 return，不发请求',
              '✅ submitting 时 disabled 按钮和输入',
              '✅ 字段错误放字段旁，接口错误放表单顶部',
              '✅ 输入时清错误，体验更好',
              '✅ 密码框 autoComplete="current-password"',
              '✅ 重置用 type="button"，避免误触 submit',
            ],
          },
          {
            type: 'list',
            title: '6）动手练习清单',
            ordered: true,
            items: [
              '加「忘记密码」链接（type="button" 或 <a>，不要误触 submit）',
              '登录成功后显示欢迎页而不是 alert',
              '加「验证码」字段，6 位数字校验',
              '把 validate 抽成独立函数文件 utils/validateLogin.js',
              '对接真实 mock API 或 json-server 练 fetch',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '登录表单模板：form + errors + formError + submitting；submit 先 preventDefault 再 validate；async 用 try/catch/finally；字段错在框下，接口错在顶部；提交中全 disabled。',
          },
        ],
      },
    },
  ],
}

export default events
