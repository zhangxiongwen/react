/**
 * 第 5 章：事件与表单
 */
const events = {
  id: 'events',
  title: '事件与表单',
  summary: '事件绑定完整用法、受控表单全家桶、带校验的登录表单完整 Demo',
  order: 7,
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
  const [log, setLog] = useState([])

  function addLog(msg) {
    setLog((prev) => [...prev, \`\${new Date().toLocaleTimeString()} - \${msg}\`])
  }

  function handleClick(e) {
    // e 是合成事件，用法接近原生 Event
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

  function handleRemove(id, e) {
    e.stopPropagation() // 阻止冒泡到父级
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
            {/* ✅ 传参：箭头函数包一层 */}
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
      {/* ✅ 正确：传函数引用，点击时执行 */}
      <button type="button" onClick={handleClick}>正确</button>

      {/* ✅ 正确：箭头函数，点击时执行 */}
      <button type="button" onClick={() => handleClick()}>也正确</button>

      {/* ✅ 正确：传参 */}
      <button type="button" onClick={() => handleClick()}>传参</button>

      {/* ❌ 错误：渲染时就执行，页面一加载就 alert */}
      {/* <button onClick={handleClick()}>错</button> */}

      {/* ❌ 错误：传参写法错，渲染时就执行 */}
      {/* <button onClick={handleClick(123)}>错</button> */}
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
    if (q) onSearch?.(q)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div style={{ display: 'flex', gap: 8, padding: 20 }}>
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
  function handleSubmit(e) {
    e.preventDefault() // ← 必须！否则页面刷新，state 全丢
    console.log('安全地处理提交逻辑')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" />
      {/* type="submit" 或回车都会触发 onSubmit */}
      <button type="submit">提交</button>
      {/* type="button" 不会触发表单提交 */}
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
  const [form, setForm] = useState({
    name: '',
    bio: '',
    city: 'shanghai',
    agree: false,
    gender: 'female',
    skills: [],        // 多选 checkbox 存数组
    level: 'beginner', // radio
  })

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

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

      {/* 1. 单行文本 input */}
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

      {/* 2. 多行文本 textarea */}
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

      {/* 3. 下拉 select */}
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

      {/* 4. 单个 checkbox → checked + e.target.checked */}
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

      {/* 5. 多个 checkbox（多选）→ 数组 state */}
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

      {/* 6. radio 单选 → 同一组 name，checked 比较 value */}
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

      {/* 7. radio 另一组：水平 */}
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

      {/* 实时预览：受控的好处——随时能读到最新值 */}
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
            body: `// input[type=text|email|password|number]  → value + e.target.value
// textarea                                  → value + e.target.value
// select                                    → value + e.target.value
// input[type=checkbox] 单个                 → checked + e.target.checked
// input[type=checkbox] 多个                 → checked={arr.includes(x)} + 手动 toggle 数组
// input[type=radio]                         → checked={state === 'value'} + onChange 设 state`,
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

// ❌ 原因：初始值是 undefined，后来变成字符串
const [name, setName] = useState()  // undefined
<input value={name} onChange={...} />

// ✅ 修复：给明确初始类型
const [name, setName] = useState('')       // 文本
const [agree, setAgree] = useState(false)  // 复选
const [city, setCity] = useState('shanghai') // 下拉要有默认 option 值`,
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
  const [form, setForm] = useState({
    account: '',
    password: '',
    remember: false,
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('') // 整表单错误（如账号密码不匹配）

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
    // 用户重新输入时，清掉该字段错误和整表单错误
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
    e.preventDefault()
    setFormError('')

    if (!validate()) return

    setSubmitting(true)
    try {
      // 模拟 API 请求
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 模拟：账号 admin / 密码 123456 登录成功
          if (form.account === 'admin' && form.password === '123456') {
            resolve({ token: 'fake-token', name: '管理员' })
          } else {
            reject(new Error('账号或密码错误'))
          }
        }, 1000)
      })

      const result = { token: 'fake-token', name: '管理员' }
      console.log('登录成功', { ...form, password: '***' })
      onSuccess?.(result)
    } catch (err) {
      setFormError(err.message || '登录失败，请稍后重试')
    } finally {
      setSubmitting(false)
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
        {/* 整表单错误 */}
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

        {/* 账号 */}
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

        {/* 密码 */}
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

        {/* 记住我 */}
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

        {/* 按钮组 */}
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

// 使用示例
function App() {
  return (
    <LoginForm
      onSuccess={(user) => alert(\`欢迎，\${user.name}！\`)}
    />
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
  e.preventDefault()
  if (!validate()) return

  setSubmitting(true)
  try {
    // 换成真实请求
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
    onSuccess?.(data)
  } catch (err) {
    setFormError(err.message)
  } finally {
    setSubmitting(false)
  }
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
