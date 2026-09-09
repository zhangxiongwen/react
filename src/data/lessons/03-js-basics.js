/**
 * JavaScript / ES6 必备语法（小白向：补 React 代码里的 JS 地基）
 * 每个 item：tip 开头 → text/table/code/live Demo 交替 → list 自检收尾
 */
const jsBasics = {
  id: 'js-basics',
  title: 'JavaScript / ES6 必备语法',
  summary:
    'React 代码里到处是箭头函数、解构、展开运算符、map、async/await——这一章把这些语法从零讲清，配可运行 Demo，学完再看 React 就不再「看不懂符号」',
  order: 3,
  items: [
    {
      id: 'js-var',
      title: '变量：var / let / const 到底选哪个',
      summary:
        '块级作用域、能不能重新赋值、变量提升；为什么 React 代码里几乎清一色 const',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '**默认写 `const`，需要重新赋值才写 `let`，永远不要写 `var`。** React 组件里的 `const [count, setCount] = useState(0)`、`const handleClick = () => {}` 都是这个习惯的结果。',
          },
          {
            type: 'text',
            title: '1. 变量是什么？',
            body: '变量就是给一个值起名字，方便后面反复使用。\n\n`const price = 99` 读作「声明一个名叫 `price` 的变量，值是 99」。\n\n一行声明由三部分组成：\n\n- **声明关键字**：`var` / `let` / `const`，决定这个名字的「脾气」\n- **变量名**：自己起，只能用字母、数字、`_`、`$`，不能以数字开头，习惯用小驼峰 `userName`\n- **值**：`=` 右边的东西，可以是数字、字符串、数组、对象、函数……\n\n注意 `=` 在 JS 里是「赋值」，不是数学里的「等于」。判断相等要用 `===`（下一节讲）。',
          },
          {
            type: 'text',
            title: '2. 三者的核心差别',
            body: '**`var`（老写法，别用）**：作用域是「整个函数」，写在 `if`、`for` 的 `{}` 里也会漏到外面；还允许重复声明同名变量，覆盖了你都不知道；并且存在「变量提升」——声明前访问它不报错，而是拿到 `undefined`，非常容易写出诡异 bug。\n\n**`let`（需要改值时用）**：块级作用域，只在最近的一对 `{}` 里有效；可以重新赋值；同一作用域不允许重复声明（写错会立刻报错，这是好事）。\n\n**`const`（默认用它）**：块级作用域，**声明时必须赋值**，之后**不能重新赋值**（重新赋值会抛 `TypeError`）。\n\n特别提醒：`const` 锁住的是「这个名字指向哪个值」，不是「值本身不能动」。所以 `const user = { name: "小明" }` 之后，`user.name = "小红"` 是允许的（改的是对象内部），但 `user = {}` 不允许（换了个新对象）。',
          },
          {
            type: 'table',
            title: '3. 三者对照表',
            headers: ['对比项', 'var', 'let', 'const'],
            rows: [
              ['作用域', '函数级（会漏出 {}）', '块级（只在 {} 内）', '块级（只在 {} 内）'],
              ['能否重新赋值', '能', '能', '不能（会报 TypeError）'],
              ['能否重复声明', '能（悄悄覆盖）', '不能（直接报错）', '不能（直接报错）'],
              ['声明前访问', '得到 undefined', '报 ReferenceError', '报 ReferenceError'],
              ['声明时必须给值', '不必', '不必', '必须'],
              ['现代项目里', '不要用', '需要改值时用', '默认用这个'],
            ],
            note: '「声明前访问就报错」不是缺点，是让你早点发现写错顺序，比拿到一个莫名的 undefined 好得多。',
          },
          {
            type: 'code',
            title: '4. 静态对照：同一段逻辑三种写法',
            language: 'js',
            body: `// ❌ var：花括号挡不住它，循环变量漏到外面
for (var i = 0; i < 3; i++) {
  // 这里能用 i
}
console.log(i) // 3 —— 循环结束了 i 还活着，容易和别处撞名

// ✅ let：只在 for 的花括号内有效
for (let j = 0; j < 3; j++) {
  // 这里能用 j
}
// console.log(j) // ReferenceError: j is not defined（这才是想要的）

// ✅ const：值不会被换掉，读代码时更放心
const TAX_RATE = 0.06        // 常量，一眼看出「这辈子都是 0.06」
const items = [1, 2, 3]      // 数组本身不换
items.push(4)                // 允许：改的是数组内部内容
// items = [9]               // 不允许：TypeError，换了新数组

// ✅ 需要重新赋值时才用 let
let total = 0                // total 后面会被反复改，所以用 let
for (const n of items) {     // 每轮循环 n 都是新的，用 const 就够
  total = total + n          // 重新赋值，必须是 let
}`,
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '5. 动手跑一跑：亲眼看到三者的差别',
            body: `<!-- 结果显示区：下面 JS 算出来的东西都打印到这里 -->
<pre id="out" style="margin:0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  // 拿到结果显示区的节点
  const out = document.getElementById('out')
  // 打印函数：把一行文字追加到显示区，方便逐步观察
  const print = (text) => { out.textContent += text + '\\n' }

  // 花括号构成一个「块」：var 会漏出去，let 不会
  {
    var leaked = 'var 声明的我漏到块外面了'
    let hidden = 'let 声明的我只活在块里'
  }
  // 块外面依然能读到 var 声明的变量
  print('块外读 var：' + leaked)
  // 用 try/catch 抓住报错，证明 let 出了块就不存在
  try {
    print('块外读 let：' + hidden)
  } catch (e) {
    print('块外读 let：报错了 → ' + e.name)
  }

  // let 声明的变量可以重新赋值
  let count = 1
  count = 2
  print('let 重新赋值成功：count = ' + count)

  // const 声明的变量不能重新赋值，会抛 TypeError
  const max = 10
  try {
    max = 20
  } catch (e) {
    print('const 重新赋值：报错了 → ' + e.name)
  }

  // const 锁的是「名字指向谁」，对象内部照样能改
  const user = { name: '小明' }
  user.name = '小红'
  print('const 对象改属性是允许的：' + user.name)
</script>`,
          },
          {
            type: 'text',
            title: '6. 为什么 React 代码里几乎只有 const？',
            body: 'React 组件是一个函数，**每次渲染都会把整个函数体重新执行一遍**。组件里的变量都是「这一次渲染专用」的，跑完就丢，根本不需要重新赋值——所以用 `const` 刚好。\n\n你在 React 里最常见的三行，全是 `const`：\n\n- `const [count, setCount] = useState(0)`：`count` 是本次渲染的快照，要改值不是重新赋值，而是调用 `setCount(1)` 让 React 重新渲染\n- `const handleClick = () => { ... }`：事件处理函数，不会被换掉\n- `const doneCount = todos.filter((t) => t.done).length`：由 state 算出来的派生值，用完即弃\n\n换句话说：**React 里「改数据」靠 `setState`，不靠给变量重新赋值。** 想通这一点，`const` 就成了自然选择。',
          },
          {
            type: 'code',
            title: '7. 对照 React：这些位置为什么都是 const',
            language: 'jsx',
            body: `import { useState } from 'react'

function Counter() {
  // const + 数组解构：count 是本次渲染的值，setCount 是更新函数
  const [count, setCount] = useState(0)

  // const 存函数：这个事件处理函数不会被重新赋值
  const handleAdd = () => {
    // 改数据靠调用 setCount，不是写 count = count + 1
    setCount(count + 1)
  }

  // const 存派生值：由 count 算出来，本次渲染用完就丢
  const isBig = count >= 5

  return (
    <div>
      <p>{count} {isBig ? '（已经不小了）' : ''}</p>
      <button type="button" onClick={handleAdd}>+1</button>
    </div>
  )
}`,
          },
          {
            type: 'list',
            title: '8. 小白易错清单',
            ordered: true,
            items: [
              '看到老教程写 var 就跟着写——现代项目一律 let / const',
              '以为 const 的对象不能改属性——能改内部，只是不能换整个对象',
              '在 React 组件里写 count = count + 1 想更新界面——必须调用 setCount',
              '循环里用 var i 导致定时器全打印同一个数字——改用 let i 就好了',
              '变量名用中文或以数字开头（如 1name）——会直接报语法错',
            ],
          },
          {
            type: 'tip',
            title: '本节小结',
            body: '`const` 打头，改值才 `let`，`var` 拉黑。`const` 管的是「名字不能换绑」，不是「内容不能动」。React 组件每次渲染重新执行，变量用完即弃，所以满屏 `const` 是正常的。',
          },
        ],
      },
    },
    {
      id: 'js-types',
      title: '数据类型与判断：typeof、=== 与 truthy/falsy',
      summary:
        '原始类型 vs 对象、typeof 的坑、== 和 === 的差别、null 与 undefined、假值清单',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '**判断相等永远用 `===`，不要用 `==`；判断「有没有值」记住六个假值：`false`、`0`、`""`、`null`、`undefined`、`NaN`。** React 里 `{count && <div/>}` 的坑就出在 `0` 是假值。',
          },
          {
            type: 'text',
            title: '1. 七种原始类型 + 一种对象',
            body: 'JS 的值分两大类。\n\n**原始类型（primitive，简单值，比较时按值比）**：\n\n- `number`：数字，整数小数都是它，`1`、`3.14`、`NaN`、`Infinity`\n- `string`：字符串，`"hi"`、`\'hi\'`、`` `hi` `` 三种引号都行\n- `boolean`：布尔，只有 `true` 和 `false`\n- `undefined`：声明了但没赋值，或函数没写返回值时的默认值\n- `null`：「我故意把它清空」\n- `symbol`：唯一标识（入门阶段几乎用不到）\n- `bigint`：超大整数，写作 `10n`（入门阶段几乎用不到）\n\n**对象类型（object，复杂值，比较时按「是不是同一个」比）**：\n\n- 普通对象 `{ name: "小明" }`\n- 数组 `[1, 2, 3]`（数组本质也是对象）\n- 函数（函数也是对象，所以能当参数传来传去）\n- `Date`、`Map`、`Set`、`Promise` 等内置对象',
          },
          {
            type: 'text',
            title: '2. 用 typeof 看类型（含两个坑）',
            body: '写法是 `typeof 值`，返回一个字符串，例如 `typeof 1` 得到 `"number"`。\n\n**坑一：`typeof null` 返回 `"object"`。** 这是 JS 诞生时的历史 bug，永远改不了。所以想判断「是不是 null」，直接写 `value === null`。\n\n**坑二：`typeof []` 也返回 `"object"`。** 数组和普通对象分不出来。想判断数组要用 `Array.isArray(value)`。\n\n剩下的都还算靠谱：`typeof "hi"` 是 `"string"`，`typeof true` 是 `"boolean"`，`typeof undefined` 是 `"undefined"`，`typeof (() => {})` 是 `"function"`。',
          },
          {
            type: 'table',
            title: '3. typeof 结果速查',
            headers: ['值', 'typeof 结果', '正确的判断方式'],
            rows: [
              ['42', '"number"', 'typeof x === "number"'],
              ['"你好"', '"string"', 'typeof x === "string"'],
              ['true', '"boolean"', 'typeof x === "boolean"'],
              ['undefined', '"undefined"', 'x === undefined'],
              ['null', '"object"（历史 bug）', 'x === null'],
              ['[1, 2]', '"object"', 'Array.isArray(x)'],
              ['{ a: 1 }', '"object"', 'typeof x === "object" && x !== null && !Array.isArray(x)'],
              ['() => {}', '"function"', 'typeof x === "function"'],
              ['NaN', '"number"（它也算数字）', 'Number.isNaN(x)'],
            ],
          },
          {
            type: 'text',
            title: '4. == 和 === 的区别（这里最容易踩坑）',
            body: '**`===`（严格相等）**：类型不同直接判 `false`，类型相同再比值。可预测，永远优先用它。\n\n**`==`（宽松相等）**：会先「悄悄转换类型」再比较，于是出现一堆反直觉结果：\n\n- `1 == "1"` 是 `true`（字符串被转成了数字）\n- `0 == false` 是 `true`\n- `0 == ""` 是 `true`\n- `null == undefined` 是 `true`\n- `null == 0` 却是 `false`（规则不一致，记都记不住）\n\n对应的不等号也是两个：`!==` 严格不等（推荐），`!=` 宽松不等（不推荐）。\n\n唯一常见的「`==` 特例用法」是 `value == null`，它同时覆盖 `null` 和 `undefined`。但现在有更清晰的写法：`value === null || value === undefined`，或者用可选链 `?.` 和空值合并 `??`（后面章节讲）。\n\n还有一个特殊值 `NaN`（Not a Number，通常来自失败的数学运算，比如 `Number("abc")`）。它连自己都不等于：`NaN === NaN` 是 `false`。判断它必须用 `Number.isNaN(value)`。',
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '5. 动手跑一跑：typeof、== vs ===、NaN',
            body: `<!-- 结果显示区：所有比较结果打印到这里 -->
<pre id="out" style="margin:0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  // 拿到结果显示区节点
  const out = document.getElementById('out')
  // 打印函数：左边写说明，右边用 JSON.stringify 显示真实值（能区分 "1" 和 1）
  const print = (label, value) => {
    out.textContent += label + '：' + JSON.stringify(value) + '\\n'
  }

  // typeof 看类型：注意 null 和数组都会返回 "object"
  print('typeof 42', typeof 42)
  print('typeof "你好"', typeof '你好')
  print('typeof true', typeof true)
  print('typeof undefined', typeof undefined)
  print('typeof null（历史 bug）', typeof null)
  print('typeof [1,2]（分不出数组）', typeof [1, 2])
  print('Array.isArray([1,2])（这才对）', Array.isArray([1, 2]))

  // == 会偷偷转换类型，结果反直觉
  print('1 == "1"（宽松，转类型）', 1 == '1')
  print('1 === "1"（严格，推荐）', 1 === '1')
  print('0 == false', 0 == false)
  print('0 === false', 0 === false)
  print('null == undefined', null == undefined)
  print('null === undefined', null === undefined)

  // NaN 连自己都不等于自己，只能用 Number.isNaN 判断
  const bad = Number('abc')
  print('Number("abc") 得到', bad)
  print('bad === NaN（永远 false）', bad === NaN)
  print('Number.isNaN(bad)（这才对）', Number.isNaN(bad))
</script>`,
          },
          {
            type: 'text',
            title: '6. null 与 undefined 的分工',
            body: '两个都表示「没有值」，区别在于**谁造成的**。\n\n**`undefined`（系统给的）**：\n\n- 声明了变量但没赋值：`let a` 之后 `a` 就是 `undefined`\n- 读对象上不存在的属性：`{}.name` 是 `undefined`\n- 函数没写 `return` 时的返回值\n- 调用函数时少传了参数\n\n**`null`（你手动给的）**：表示「这里现在是空的，但以后会有东西」。React 里非常常见：`const [user, setUser] = useState(null)` —— 数据还没请求回来，先占个空位。\n\n还有一个约定：**在 React 组件里 `return null` 表示「这次什么都不渲染」**，这是合法且常用的写法。',
          },
          {
            type: 'text',
            title: '7. truthy 与 falsy：条件判断的隐藏规则',
            body: '写 `if (value)` 时，JS 会把 `value` 转成布尔值。**只有六个值会转成 `false`（叫 falsy / 假值）**：\n\n- `false`\n- `0`（包括 `-0`）\n- `""`（空字符串）\n- `null`\n- `undefined`\n- `NaN`\n\n**除此之外全都是 truthy（真值）**，包括很多新手会看错的：\n\n- `"0"`（内容是 0 的字符串，非空就是真）\n- `"false"`（同理）\n- `[]`（空数组是真值！判断空要用 `arr.length === 0`）\n- `{}`（空对象是真值！判断空要用 `Object.keys(obj).length === 0`）\n\n**React 里最经典的坑**：写 `{count && <p>有 {count} 条</p>}`，当 `count` 是 `0` 时，`0 && ...` 的结果是 `0`，而 React 会把数字 `0` 老老实实渲染到页面上——于是屏幕上莫名多出一个「0」。正确写法是 `{count > 0 && <p>...</p>}`。',
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '8. 动手跑一跑：真值假值清单 + React 的 0 坑',
            body: `<!-- 结果显示区 -->
<pre id="out" style="margin:0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  // 拿到结果显示区节点
  const out = document.getElementById('out')
  // 打印函数：用 Boolean(值) 把值转成 true/false，看它是真值还是假值
  const check = (label, value) => {
    out.textContent += label + ' → ' + (Boolean(value) ? '真值' : '假值') + '\\n'
  }

  // 六个假值：条件判断里都当 false
  check('false', false)
  check('数字 0', 0)
  check('空字符串 ""', '')
  check('null', null)
  check('undefined', undefined)
  check('NaN', NaN)

  // 容易看错的真值：非空字符串、空数组、空对象都是真
  check('字符串 "0"', '0')
  check('字符串 "false"', 'false')
  check('空数组 []', [])
  check('空对象 {}', {})
  check('数字 -1', -1)

  // 演示 React 里的经典坑：0 && 任何东西 → 结果是 0，会被渲染出来
  const count = 0
  out.textContent += '\\n' + 'count 是 0 时：\\n'
  out.textContent += 'count && "有数据" 的结果 → ' + JSON.stringify(count && '有数据') + '\\n'
  out.textContent += 'count > 0 && "有数据" 的结果 → ' + JSON.stringify(count > 0 && '有数据') + '\\n'
  // 判断数组/对象是否为空，不能直接 if(arr)，要看长度或 key 数量
  out.textContent += '\\n空数组长度：' + [].length + '\\n'
  out.textContent += '空对象 key 数量：' + Object.keys({}).length + '\\n'
</script>`,
          },
          {
            type: 'table',
            title: '9. 判断「有没有值」的正确姿势',
            headers: ['你想判断', '别这么写', '推荐写法'],
            rows: [
              ['字符串非空', 'if (str)（"0" 也算真）', 'if (str.trim() !== "")'],
              ['数字有效', 'if (num)（0 会被当空）', 'if (typeof num === "number" && !Number.isNaN(num))'],
              ['数组有内容', 'if (arr)（空数组也是真）', 'if (arr.length > 0)'],
              ['对象有内容', 'if (obj)（空对象也是真）', 'if (Object.keys(obj).length > 0)'],
              ['数据还没回来', 'if (data == null)', 'if (data === null || data === undefined)'],
              ['React 条件渲染', '{count && <div/>}', '{count > 0 && <div/>}'],
            ],
            note: '规律：假值清单里有 0 和 ""，所以凡是「0 或空字符串也是合法数据」的场景，都不能直接用 if(value) 判断。',
          },
          {
            type: 'list',
            title: '10. 自检清单',
            ordered: true,
            items: [
              '能背出六个假值：false、0、""、null、undefined、NaN',
              '知道空数组 [] 和空对象 {} 都是真值',
              '写相等判断时手会自动敲三个等号 ===',
              '判断数组用 Array.isArray，判断 NaN 用 Number.isNaN',
              '看到 React 页面莫名出现一个 0，第一反应是去查 && 短路',
            ],
          },
          {
            type: 'tip',
            title: '本节小结',
            body: '类型分原始类型和对象；`typeof` 有两个坑（`null` 和数组都返回 `"object"`）。相等判断只用 `===`。六个假值背下来，空数组空对象都是真值。React 条件渲染写 `count > 0 &&`，别写 `count &&`。',
          },
        ],
      },
    },
    {
      id: 'js-template',
      title: '模板字符串：反引号和 ${} 插值',
      summary:
        '用反引号拼接变量、写多行文本；对照 + 号拼接为什么难读；React 里拼 className 和文案',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '**把字符串的引号换成反引号 `` ` ``，就能在里面用 `${变量}` 直接插值，还能随意换行。** 从此告别 `"你好，" + name + "！"` 这种加号地狱。',
          },
          {
            type: 'text',
            title: '1. 三种引号的区别',
            body: 'JS 里表示字符串有三种写法：\n\n- **单引号** `\'你好\'`：最常用，本项目代码里都是它\n- **双引号** `"你好"`：和单引号完全等价，只是风格差别（JSX 属性里习惯用双引号）\n- **反引号** `` `你好` ``：ES6 新增的**模板字符串**，多了两个超能力\n\n反引号在键盘上位于左上角、数字 1 的左边、`Esc` 下面，和 `~` 是同一个键。\n\n模板字符串的两个超能力：\n\n1. **插值**：`${表达式}` 会被求值后拼进字符串\n2. **多行**：直接按回车换行，不需要 `\\n` 也不需要加号连接',
          },
          {
            type: 'text',
            title: '2. ${} 里可以放什么？',
            body: '`${}` 里放的是**任意 JavaScript 表达式**（能算出一个值的代码），不只是变量名：\n\n- 变量：`` `你好，${name}` ``\n- 运算：`` `总价 ${price * count} 元` ``\n- 属性访问：`` `城市：${user.profile.city}` ``\n- 函数调用：`` `今年是 ${new Date().getFullYear()} 年` ``\n- 三元表达式：`` `状态：${done ? "已完成" : "进行中"}` ``\n- 嵌套模板字符串（能用但别玩太花）\n\n**注意**：`${}` 里不能放 `if`、`for` 这种语句（它们不产生值）。需要分支就用三元表达式。\n\n还有一点：`${}` 会把值自动转成字符串。对象会变成不太好看的 `[object Object]`，想看内容请用 `JSON.stringify(obj)`。',
          },
          {
            type: 'code',
            title: '3. 静态对照：加号拼接 vs 模板字符串',
            language: 'js',
            body: `const name = '小明'
const count = 3
const price = 29.9

// ❌ 老写法：加号拼接。引号和加号交替出现，空格漏了都看不出来
const oldWay = '你好，' + name + '！你买了 ' + count + ' 件，共 ' + count * price + ' 元'

// ✅ 模板字符串：一眼就能看出最终长什么样
const newWay = \`你好，\${name}！你买了 \${count} 件，共 \${count * price} 元\`

// ❌ 老写法写多行：靠 \\n 转义 + 加号连接，非常难读
const oldLines = '第一行\\n' + '第二行\\n' + '第三行'

// ✅ 模板字符串写多行：直接按回车，所见即所得
const newLines = \`第一行
第二行
第三行\`

// \${} 里可以放表达式，不只是变量名
const done = true
const tip = \`状态：\${done ? '已完成' : '进行中'}，共 \${count} 项\`

// 想在字符串里显示反引号或 \${}，用反斜杠转义
const literal = \`这是一个反引号：\\\` ，这是不插值的写法：\\\${name}\``,
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '4. 动手跑一跑：插值、多行、表达式',
            body: `<!-- 结果显示区：white-space:pre-wrap 让多行字符串的换行真的换行 -->
<pre id="out" style="margin:0;font:13px/1.7 ui-monospace,monospace;white-space:pre-wrap;"></pre>

<script>
  // 拿到结果显示区节点
  const out = document.getElementById('out')
  // 打印函数：直接把字符串追加一行
  const print = (text) => { out.textContent += text + '\\n' }

  // 准备几个变量，后面用来插值
  const name = '小明'
  const count = 3
  const price = 29.9

  // 老写法：加号拼接，容易漏空格、难读
  print('加号拼接：' + '你好，' + name + '，共 ' + count * price + ' 元')

  // 模板字符串：反引号包住，用 \${} 插入变量和运算
  print(\`模板字符串：你好，\${name}，共 \${count * price} 元\`)

  // \${} 里可以放三元表达式做分支
  const done = false
  print(\`状态：\${done ? '已完成' : '进行中'}\`)

  // \${} 里可以调用函数
  print(\`当前年份：\${new Date().getFullYear()}\`)

  // 多行字符串：直接按回车换行，不用写 \\n
  const card = \`姓名：\${name}
数量：\${count}
单价：\${price}
合计：\${(count * price).toFixed(2)}\`
  print('')
  print(card)

  // 注意：对象直接插值会变成 [object Object]，想看内容用 JSON.stringify
  const user = { name: '小红', age: 18 }
  print('')
  print(\`直接插对象：\${user}\`)
  print(\`用 JSON.stringify：\${JSON.stringify(user)}\`)
</script>`,
          },
          {
            type: 'text',
            title: '5. React 里哪里会用到？',
            body: '**拼动态 className**：`` className={`btn ${isActive ? "active" : ""}`} `` —— 基础类名固定，状态类名按条件加。\n\n**拼动态样式值**：`` style={{ width: `${percent}%` }} `` —— CSS 需要带单位的字符串。\n\n**拼提示文案**：`` <p>{`共 ${list.length} 条，已完成 ${doneCount} 条`}</p> ``（不过在 JSX 里更常直接写 `共 {list.length} 条`，因为 JSX 本身就能用 `{}` 插值）。\n\n**拼接口地址**：`` fetch(`/api/users/${id}?page=${page}`) `` —— 这是最高频的用途之一。\n\n**注意 JSX 属性里的两层花括号**：`className={...}` 外层的 `{}` 是 JSX 的「这里开始写 JS」，里面的 `` `${}` `` 才是模板字符串的插值。看到 `` {`a ${b}`} `` 别慌，拆开看就清楚了。',
          },
          {
            type: 'code',
            title: '6. 对照 React：真实项目里的四种用法',
            language: 'jsx',
            body: `function ProgressCard({ user, percent, isActive, tab }) {
  // 1）拼接口地址：模板字符串最高频的用途
  const url = \`/api/users/\${user.id}/stats?tab=\${tab}\`

  // 2）拼动态 className：基础类名 + 条件类名
  const cls = \`card \${isActive ? 'card--active' : ''}\`

  return (
    // JSX 属性里：外层 {} 是「开始写 JS」，里面反引号才是模板字符串
    <div className={cls} data-url={url}>
      {/* 3）JSX 文本里其实可以直接用 {} 插值，不必套模板字符串 */}
      <h3>{user.name} 的进度</h3>

      {/* 4）拼带单位的样式值：CSS 的 width 需要 "60%" 这种字符串 */}
      <div style={{ background: '#eef6f1', height: 8 }}>
        <div style={{ width: \`\${percent}%\`, height: 8, background: '#2f6b4f' }} />
      </div>

      {/* 一段话里混多个变量时，模板字符串比一堆 {} 更好读 */}
      <p>{\`已完成 \${percent}%，继续加油，\${user.name}！\`}</p>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '7. 什么时候用哪种引号',
            headers: ['场景', '推荐写法', '原因'],
            rows: [
              ['普通固定文字', "'你好'", '最简单，本项目统一单引号'],
              ['需要插入变量', '`你好，${name}`', '不用加号，所见即所得'],
              ['多行文本', '`第一行\\n第二行`（直接回车）', '不用写转义换行'],
              ['拼接口 URL', '`/api/users/${id}`', '路径参数一眼可见'],
              ['JSX 属性字符串', 'title="固定文字"', 'JSX 属性习惯双引号'],
              ['JSX 动态属性', 'className={`btn ${extra}`}', '外层 {} 进 JS，内层反引号插值'],
            ],
          },
          {
            type: 'list',
            title: '8. 小白易错清单',
            ordered: true,
            items: [
              '把反引号打成单引号——插值不生效，页面上直接显示 ${name} 这几个字',
              '写成 $ {name}（中间有空格）或漏掉 $ 符号',
              '在普通单引号字符串里写 ${name}——单引号不支持插值',
              '在 ${} 里写 if / for 语句——只能放能算出值的表达式，分支用三元',
              '直接插对象得到 [object Object]——想看内容请用 JSON.stringify',
            ],
          },
          {
            type: 'tip',
            title: '本节小结',
            body: '反引号 + `${表达式}` = 模板字符串，支持插值和多行。凡是「字符串里要塞变量」的地方都用它，尤其是拼 URL 和拼 className。`${}` 里只能放表达式，不能放语句。',
          },
        ],
      },
    },
    {
      id: 'js-function',
      title: '函数三种写法与箭头函数',
      summary:
        'function 声明、函数表达式、箭头函数；箭头函数的简写规则与 this 差别；React 为什么爱箭头函数',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '**`(参数) => 返回值` 就是箭头函数，等价于 `function (参数) { return 返回值 }`。** 它更短，而且没有自己的 `this`，所以在 React 的事件处理和回调里随处可见。',
          },
          {
            type: 'text',
            title: '1. 函数是什么？三种写法',
            body: '函数就是「一段可以反复调用的代码」，接收参数、返回结果。\n\n**写法一：函数声明（function declaration）**\n\n`function add(a, b) { return a + b }`\n\n特点：有名字，会被「提升」——写在文件后面也能在前面调用。React 组件常用这种写法。\n\n**写法二：函数表达式（function expression）**\n\n`const add = function (a, b) { return a + b }`\n\n特点：把一个匿名函数赋值给变量，必须先声明后使用。\n\n**写法三：箭头函数（arrow function，ES6 新增）**\n\n`const add = (a, b) => a + b`\n\n特点：最短，没有自己的 `this`，不能当构造函数用。\n\n三者调用方式完全一样：`add(1, 2)`。',
          },
          {
            type: 'text',
            title: '2. 箭头函数的简写规则（重点，看懂 React 代码的关键）',
            body: '从完整写法一步步简化，理解了这四条，React 里的箭头函数就都能读懂了。\n\n**完整形态**：`const f = (a, b) => { return a + b }`\n\n**规则一：只有一个参数时，圆括号可以省略**\n\n`(n) => { return n * 2 }` 可写成 `n => { return n * 2 }`\n\n（没有参数或有多个参数时，圆括号必须写：`() => {}`、`(a, b) => {}`。本项目风格是一个参数也保留括号，更整齐。）\n\n**规则二：函数体只有一句「返回」时，花括号和 `return` 一起省略**\n\n`(n) => { return n * 2 }` 可写成 `(n) => n * 2`\n\n这叫「隐式返回」。注意：**省略花括号就必须省略 `return`，两者要么都写，要么都不写。**\n\n**规则三：要直接返回一个对象时，必须用圆括号把对象包起来**\n\n`(n) => { count: n }` 是错的——JS 会把 `{` 当成函数体的开始，`count:` 被当成标签语法。\n\n正确写法：`(n) => ({ count: n })`\n\n口诀：**返回对象加圆括号**。React 里 `setForm((prev) => ({ ...prev, name: "小明" }))` 那对括号就是这么来的。\n\n**规则四：函数体要写多行时，花括号和 `return` 都得写回来**\n\n`(n) => { const x = n * 2; return x + 1 }`',
          },
          {
            type: 'table',
            title: '3. 箭头函数简写对照表',
            headers: ['完整写法', '简写', '说明'],
            rows: [
              ['(n) => { return n * 2 }', '(n) => n * 2', '一句返回，省花括号和 return'],
              ['(n) => n * 2', 'n => n * 2', '单参数可省圆括号（本项目仍保留）'],
              ['function () { return 1 }', '() => 1', '无参数，圆括号必须留'],
              ['(a, b) => { return a + b }', '(a, b) => a + b', '多参数，圆括号必须留'],
              ['(n) => { return { id: n } }', '(n) => ({ id: n })', '返回对象必须加圆括号'],
              ['(n) => { console.log(n) }', '不能再简写', '函数体不是「返回值」就要留花括号'],
              ['(n) => { let x = n; return x }', '不能再简写', '多行必须留花括号和 return'],
            ],
            note: '看到 `=>` 后面直接跟表达式，就默认它「返回了这个表达式的值」；看到 `=> {`，就去找里面的 return。',
          },
          {
            type: 'code',
            title: '4. 静态对照：同一个函数的所有写法',
            language: 'js',
            body: `// 写法一：函数声明。有名字，会被提升，React 组件常用这种
function double1(n) {
  return n * 2
}

// 写法二：函数表达式。匿名函数赋给 const，必须先声明后使用
const double2 = function (n) {
  return n * 2
}

// 写法三：箭头函数完整形态（有花括号就必须写 return）
const double3 = (n) => {
  return n * 2
}

// 箭头函数简写：一句返回时，去掉花括号和 return（隐式返回）
const double4 = (n) => n * 2

// 单个参数还能省掉圆括号（本项目风格仍保留括号，更整齐）
const double5 = n => n * 2

// 四种写法调用方式完全一样
double1(3) // 6
double5(3) // 6

// ❌ 想直接返回对象却不加圆括号：JS 把 { 当成函数体开始，结果返回 undefined
// const makeUser1 = (name) => { name: name }

// ✅ 返回对象必须用圆括号包住
const makeUser2 = (name) => ({ name: name, createdAt: Date.now() })

// 多行逻辑：花括号和 return 都要写回来
const makeUser3 = (name) => {
  const trimmed = name.trim()      // 先处理参数
  return { name: trimmed }         // 再显式 return
}

// 参数默认值：调用时没传就用默认值（三种写法都支持）
const greet = (name = '同学', suffix = '！') => \`你好，\${name}\${suffix}\`
greet()        // '你好，同学！'
greet('小明')  // '你好，小明！'`,
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '5. 动手跑一跑：四种写法结果完全一样',
            body: `<!-- 结果显示区 -->
<pre id="out" style="margin:0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  // 拿到结果显示区节点
  const out = document.getElementById('out')
  // 打印函数：本身就是一个箭头函数，参数 label 和 value
  const print = (label, value) => {
    out.textContent += label + '：' + JSON.stringify(value) + '\\n'
  }

  // 写法一：函数声明
  function double1(n) {
    return n * 2
  }

  // 写法二：函数表达式（匿名函数赋给 const）
  const double2 = function (n) {
    return n * 2
  }

  // 写法三：箭头函数完整形态，有花括号就要写 return
  const double3 = (n) => {
    return n * 2
  }

  // 写法四：箭头函数简写，一句返回时省掉花括号和 return
  const double4 = (n) => n * 2

  // 四种写法喂同一个参数，结果一模一样
  print('函数声明 double1(5)', double1(5))
  print('函数表达式 double2(5)', double2(5))
  print('箭头完整 double3(5)', double3(5))
  print('箭头简写 double4(5)', double4(5))

  // ❌ 返回对象忘加圆括号：花括号被当函数体，什么都没返回
  const bad = (name) => { name: name }
  print('忘加圆括号的返回值', bad('小明'))

  // ✅ 返回对象加圆括号，才真的返回了对象
  const good = (name) => ({ name: name })
  print('加了圆括号的返回值', good('小明'))
</script>`,
          },
          {
            type: 'text',
            title: '6. this 的差别：箭头函数没有自己的 this',
            body: '`this` 是「函数运行时的上下文对象」，初学阶段只需记住一条对比：\n\n**普通函数的 `this` 由「谁调用它」决定**，所以很容易丢：\n\n- `obj.say()` 里的 `this` 是 `obj`\n- 但如果把 `obj.say` 当回调传出去（`setTimeout(obj.say, 0)`），调用者就不是 `obj` 了，`this` 变成 `undefined` 或 `window`，于是报「Cannot read property of undefined」\n\n**箭头函数没有自己的 `this`**，它直接用「定义它的那一层」的 `this`（这叫词法 `this`）。定义在哪，`this` 就是哪，谁调用都不会变。\n\n这就解决了回调里 `this` 丢失的经典问题——所以定时器、事件回调、数组方法里几乎都用箭头函数。\n\n**顺带记住箭头函数的三个限制**（都不影响日常使用）：不能用 `new` 调用；没有 `arguments` 对象（用剩余参数 `...args` 代替）；不适合当对象的方法（因为拿不到该对象的 `this`）。',
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '7. 动手跑一跑：回调里的 this 丢失与箭头函数修复',
            body: `<!-- 两个按钮分别触发普通函数回调和箭头函数回调 -->
<button id="btnNormal">普通函数回调</button>
<button id="btnArrow">箭头函数回调</button>
<!-- 结果显示区 -->
<pre id="out" style="margin:12px 0 0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  // 拿到结果显示区节点
  const out = document.getElementById('out')
  // 打印函数：追加一行文字
  const print = (text) => { out.textContent += text + '\\n' }

  // 一个对象，内部两个方法都用 setTimeout 延迟读自己的 label
  const timer = {
    label: '我是 timer.label',

    // 用普通函数当回调：回调被 setTimeout 调用，this 不再是 timer
    startNormal: function () {
      setTimeout(function () {
        // 这里的 this 是 window，window.label 不存在 → undefined
        print('普通函数回调里 this.label = ' + this.label)
      }, 0)
    },

    // 用箭头函数当回调：箭头函数没有自己的 this，沿用 startArrow 的 this（即 timer）
    startArrow: function () {
      setTimeout(() => {
        // 这里的 this 就是 timer，能正确读到 label
        print('箭头函数回调里 this.label = ' + this.label)
      }, 0)
    },
  }

  // 给按钮绑定点击事件：点第一个按钮跑普通函数版
  document.getElementById('btnNormal').addEventListener('click', () => {
    timer.startNormal()
  })
  // 点第二个按钮跑箭头函数版
  document.getElementById('btnArrow').addEventListener('click', () => {
    timer.startArrow()
  })

  // 先给一句提示，告诉用户点按钮看结果
  print('点上面两个按钮，对比 this 的差别：')
</script>`,
          },
          {
            type: 'code',
            title: '8. 对照 React：箭头函数出现在哪些位置',
            language: 'jsx',
            body: `import { useState } from 'react'

// 组件本身习惯用 function 声明（名字清楚、方便提升）
function TodoList({ todos, onToggle }) {
  const [keyword, setKeyword] = useState('')

  // 1）事件处理函数：用 const + 箭头函数，不用担心 this
  const handleClear = () => {
    setKeyword('')
  }

  // 2）数组方法的参数：清一色箭头函数（一句返回，省 return）
  const visible = todos.filter((t) => t.text.includes(keyword))

  return (
    <div>
      {/* 3）行内箭头函数：需要「带参数调用」时必须包一层箭头函数 */}
      {/*    写 onChange={setKeyword} 拿到的是事件对象，不是字符串 */}
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <button type="button" onClick={handleClear}>清空</button>

      <ul>
        {/* 4）map 里的箭头函数：返回 JSX 元素 */}
        {visible.map((todo) => (
          <li key={todo.id}>
            {/* 5）要传 id 给父组件，所以包一层箭头函数延迟调用 */}
            {/*    写 onClick={onToggle(todo.id)} 会在渲染时立刻执行，是常见 bug */}
            <button type="button" onClick={() => onToggle(todo.id)}>
              {todo.text}
            </button>
          </li>
        ))}
      </ul>

      {/* 6）函数式更新里的「返回对象加圆括号」 */}
      {/*    setForm((prev) => ({ ...prev, name: '小明' })) */}
    </div>
  )
}`,
          },
          {
            type: 'list',
            title: '9. 小白易错清单',
            ordered: true,
            items: [
              '写了花括号又想隐式返回：(n) => { n * 2 } 返回的是 undefined，要么去掉花括号，要么写 return',
              '返回对象忘了加圆括号：(n) => { id: n } 是错的，应写 (n) => ({ id: n })',
              'onClick={handleClick(id)} —— 渲染时就执行了，应写 onClick={() => handleClick(id)}',
              '把对象方法当回调直接传出去导致 this 丢失——用箭头函数包一层',
              '给箭头函数用 new：const A = () => {}; new A() 会直接报错',
            ],
          },
          {
            type: 'tip',
            title: '本节小结',
            body: '组件用 `function` 声明，其它一律 `const 名字 = (参数) => ...`。一句返回省 `return`，返回对象加圆括号，多行就写回花括号。箭头函数没有自己的 `this`，这正是回调场景最想要的特性。',
          },
        ],
      },
    },
    {
      id: 'js-destructuring',
      title: '解构赋值：一次性取出想要的值',
      summary:
        '数组解构、对象解构、重命名、默认值、嵌套解构、函数参数解构；对照 useState 和 props',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '**解构 = 把「结构」写在等号左边，按位置（数组）或按名字（对象）一次取出多个值。** `const [count, setCount] = useState(0)` 是数组解构，`function Card({ title })` 是对象解构。',
          },
          {
            type: 'text',
            title: '1. 数组解构：按「位置」取值',
            body: '老写法一个个取，写三行：\n\n`const first = arr[0]`、`const second = arr[1]`\n\n新写法一行搞定：\n\n`const [first, second] = arr`\n\n左边的 `[]` 不是创建数组，而是「告诉 JS：右边是个数组，请按顺序把第 1 项给 first，第 2 项给 second」。\n\n**四个常用技巧**：\n\n- **跳过某项**：用逗号占位，`const [, , third] = arr` 只取第三项\n- **默认值**：`const [a = 0, b = 0] = [5]` —— `b` 没取到值（`undefined`）时用 0\n- **剩余项**：`const [head, ...rest] = arr` —— `rest` 是剩下所有项组成的新数组\n- **交换变量**：`;[a, b] = [b, a]` 一行完成交换，不用临时变量\n\n数组解构**只看位置，不看名字**——所以 `const [count, setCount] = useState(0)` 里这两个名字是你自己起的，叫 `[n, setN]` 也能跑（但请遵守 `[x, setX]` 的社区约定）。',
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '2. 动手跑一跑：数组解构的五种玩法',
            body: `<!-- 结果显示区 -->
<pre id="out" style="margin:0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  // 拿到结果显示区节点
  const out = document.getElementById('out')
  // 打印函数：把说明和值打印成一行
  const print = (label, value) => {
    out.textContent += label + '：' + JSON.stringify(value) + '\\n'
  }

  // 原始数组，后面各种解构都基于它
  const colors = ['红', '黄', '蓝', '绿']

  // 基础：按位置取前两项
  const [first, second] = colors
  print('第一项 first', first)
  print('第二项 second', second)

  // 跳过：前两个位置留空逗号，只取第三项
  const [, , third] = colors
  print('跳过两项取 third', third)

  // 剩余项：...rest 把剩下的打包成新数组
  const [head, ...rest] = colors
  print('head', head)
  print('rest（剩余项组成新数组）', rest)

  // 默认值：位置上是 undefined 时才启用默认值
  const [a = '默认A', b = '默认B'] = ['只有一项']
  print('a（取到了值）', a)
  print('b（没取到，用默认值）', b)

  // 交换两个变量：一行完成，不需要临时变量
  let x = 1
  let y = 2
  ;[x, y] = [y, x]
  print('交换后的 x', x)
  print('交换后的 y', y)

  // 数组解构只看位置、不看名字，所以名字随便起
  const [随便叫什么] = colors
  print('名字自己起也能取到第一项', 随便叫什么)
</script>`,
          },
          {
            type: 'text',
            title: '3. 对象解构：按「名字」取值',
            body: '老写法：`const name = user.name`、`const age = user.age`。\n\n新写法：`const { name, age } = user`。\n\n左边的 `{}` 不是创建对象，而是「按属性名从右边对象里取值」。**顺序无关，名字必须对得上**——写 `const { age, name } = user` 结果一样。\n\n**四个常用技巧**：\n\n- **重命名**：`const { name: userName } = user` —— 取 `name`，但在本地叫 `userName`。用于名字冲突或名字太笼统\n- **默认值**：`const { city = "未知" } = user` —— 属性不存在或是 `undefined` 时用默认值\n- **重命名 + 默认值**：`const { city: userCity = "未知" } = user`\n- **剩余属性**：`const { id, ...others } = user` —— `others` 是除 `id` 外所有属性组成的新对象\n\n**嵌套解构**：数据是 `{ user: { profile: { city: "上海" } } }` 时，可以写 `const { user: { profile: { city } } } = data` 直接掏到最里层。层数多了会很难读，一般掏一两层就够。\n\n**注意**：解构 `null` 或 `undefined` 会直接报错（`Cannot destructure property...`）。所以对可能为空的数据要给兜底：`const { name } = user ?? {}`。',
          },
          {
            type: 'table',
            title: '4. 解构语法速查',
            headers: ['写法', '含义', '典型场景'],
            rows: [
              ['const [a, b] = arr', '按位置取第 1、2 项', 'useState 返回值'],
              ['const [, , c] = arr', '跳过前两项', '只关心后面某项'],
              ['const [x, ...rest] = arr', '取第一项 + 剩余数组', '拆分头部和尾部'],
              ['const { name } = obj', '按名字取属性', '取 props、取接口数据'],
              ['const { name: n } = obj', '取 name 但改叫 n', '名字冲突时重命名'],
              ['const { city = "未知" } = obj', '属性缺失时给默认值', '接口字段可能没返回'],
              ['const { id, ...others } = obj', '取 id + 剩余属性对象', '透传剩余 props'],
              ['const { a: { b } } = obj', '嵌套解构取深层值', '接口返回多层嵌套'],
              ['function f({ a, b })', '参数解构', 'React 组件接收 props'],
            ],
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '5. 动手跑一跑：对象解构（重命名 / 默认值 / 嵌套 / 剩余）',
            body: `<!-- 结果显示区 -->
<pre id="out" style="margin:0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  // 拿到结果显示区节点
  const out = document.getElementById('out')
  // 打印函数
  const print = (label, value) => {
    out.textContent += label + '：' + JSON.stringify(value) + '\\n'
  }

  // 模拟一份接口返回的用户数据（带嵌套对象）
  const user = {
    id: 7,
    name: '小明',
    profile: { city: '上海', score: 92 },
    tags: ['React', 'CSS'],
  }

  // 基础：按属性名取值，顺序无所谓
  const { name, id } = user
  print('name', name)
  print('id', id)

  // 重命名：取 name，但本地改叫 userName（避免和别处的 name 冲突）
  const { name: userName } = user
  print('重命名后的 userName', userName)

  // 默认值：user 里没有 email 属性，就用默认值兜底
  const { email = '没填邮箱' } = user
  print('email（缺失走默认值）', email)

  // 嵌套解构：一次掏到 profile 里的 city 和 score
  const { profile: { city, score } } = user
  print('嵌套取到的 city', city)
  print('嵌套取到的 score', score)

  // 剩余属性：取出 id，其余属性打包成新对象 others
  const { id: onlyId, ...others } = user
  print('onlyId', onlyId)
  print('others（剩余属性）', others)

  // 解构 null / undefined 会报错，用 ?? {} 兜底最安全
  const maybeNull = null
  const { name: safeName = '无数据' } = maybeNull ?? {}
  print('对 null 安全解构', safeName)
</script>`,
          },
          {
            type: 'text',
            title: '6. 函数参数解构：React props 的写法来源',
            body: '函数接收一个对象参数时，可以直接在参数位置解构，省掉函数体里的一堆 `props.xxx`。\n\n**不解构**：\n\n`function Card(props) { return props.title }`\n\n**解构**：\n\n`function Card({ title, children }) { return title }`\n\n后者的花括号不是「函数体」，是「对参数对象做解构」——这是 React 新手最容易看懵的地方之一。\n\n参数解构同样支持默认值和重命名：\n\n`function Card({ title = "无标题", size: cardSize = "md" }) {}`\n\n还可以配合剩余属性做 props 透传：\n\n`function Button({ children, ...rest }) { return <button {...rest}>{children}</button> }` —— 自己关心 `children`，其余属性（`onClick`、`disabled`、`type`…）原样传给真正的 `<button>`。\n\n**一个细节**：如果调用时可能不传参数，要给整个参数一个默认空对象：`function f({ a } = {}) {}`，否则 `f()` 会因为解构 `undefined` 而报错。',
          },
          {
            type: 'code',
            title: '7. 对照 React：解构在项目里的四个真实位置',
            language: 'jsx',
            body: `import { useState, useEffect } from 'react'

// 1）props 参数解构 + 默认值：React 组件最常见的写法
//    花括号是「对 props 对象解构」，不是函数体
function Card({ title = '无标题', footer, children, ...rest }) {
  return (
    // ...rest 把剩余 props（如 onClick、id、className）原样透传
    <section {...rest}>
      <h3>{title}</h3>
      {/* children 是 React 自动塞进来的「标签中间的内容」 */}
      <div>{children}</div>
      {footer && <footer>{footer}</footer>}
    </section>
  )
}

function UserPanel({ userId }) {
  // 2）数组解构：useState 返回 [值, 更新函数]，按位置取
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then((res) => res.json())
      .then((data) => {
        // 3）对接口返回数据做解构 + 默认值，字段缺失也不炸
        const { name = '匿名', profile: { city = '未知' } = {} } = data
        setUser({ name, city })
        setLoading(false)
      })
  }, [userId])

  if (loading) return <p>加载中…</p>

  // 4）在函数体里解构 state 对象，后面写起来更短
  const { name, city } = user

  return (
    <Card title={\`\${name} 的资料\`}>
      <p>城市：{city}</p>
      {/* 事件对象也常解构：({ target }) => target.value */}
      <input onChange={({ target }) => console.log(target.value)} />
    </Card>
  )
}`,
          },
          {
            type: 'list',
            title: '8. 小白易错清单',
            ordered: true,
            items: [
              '对象解构写错属性名——名字必须和对象里的一模一样，写错只会得到 undefined',
              '以为对象解构也看顺序——对象只认名字，数组才认位置',
              '解构 null / undefined 直接报 Cannot destructure——用 ?? {} 或参数默认值兜底',
              '想重命名却写成 const { name = userName }——那是默认值，重命名要用冒号 { name: userName }',
              '在已声明的变量上做解构忘了包括号：({ a } = obj) 前面要有分号或括号',
              '数组解构漏数逗号导致取错位置——跳项时数清逗号个数',
            ],
          },
          {
            type: 'tip',
            title: '本节小结',
            body: '数组解构按位置（`const [a, b] = arr`），对象解构按名字（`const { a } = obj`）。冒号是重命名，等号是默认值，`...` 收剩余。React 的 `useState` 用数组解构、`props` 用参数解构，看懂这两句就够用一大半。',
          },
        ],
      },
    },
    {
      id: 'js-spread',
      title: '展开运算符 ... 与剩余参数',
      summary:
        '数组复制/合并、对象复制/覆盖、函数不定参数；React 为什么必须 {...obj, a: 1}',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '**同一个 `...`，在等号右边是「展开（拆开摊平）」，在参数或解构左边是「收集（打包起来）」。** React 更新 state 必须 `setForm({ ...form, name: "新名" })`，因为 React 靠「是不是新对象」判断要不要重新渲染。',
          },
          {
            type: 'text',
            title: '1. 数组展开：复制、合并、插入',
            body: '`...数组` 会把数组「拆开」成一个个独立元素，通常写在新的 `[]` 里。\n\n- **复制**：`const copy = [...arr]` —— 得到内容相同但**引用不同**的新数组\n- **末尾追加**：`[...arr, newItem]`\n- **开头追加**：`[newItem, ...arr]`\n- **合并两个数组**：`[...a, ...b]`（比 `a.concat(b)` 更直观）\n- **中间插入**：`[...arr.slice(0, 2), newItem, ...arr.slice(2)]`\n- **当函数参数**：`Math.max(...[3, 1, 4])` 等价于 `Math.max(3, 1, 4)`\n- **字符串也能展开**：`[..."abc"]` 得到 `["a", "b", "c"]`\n\n为什么强调「引用不同」？因为 `const copy = arr`（不带 `...`）只是给同一个数组起了第二个名字，改 `copy` 会连原来的 `arr` 一起改。这是新手最容易踩的坑，也是 React 里「界面不更新」的常见原因。',
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '2. 动手跑一跑：复制引用 vs 展开复制',
            body: `<!-- 结果显示区 -->
<pre id="out" style="margin:0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  // 拿到结果显示区节点
  const out = document.getElementById('out')
  // 打印函数
  const print = (label, value) => {
    out.textContent += label + '：' + JSON.stringify(value) + '\\n'
  }

  // 原始数组
  const nums = [1, 2, 3]

  // ❌ 直接赋值：只是给同一个数组起了第二个名字
  const alias = nums
  alias.push(999)
  print('改 alias 之后的 nums（被连坐了）', nums)

  // 把原数组恢复干净，方便下面对比
  nums.pop()

  // ✅ 用 ... 展开复制：内容一样，但是两个不同的数组
  const copy = [...nums]
  copy.push(999)
  print('改 copy 之后的 nums（没被影响）', nums)
  print('copy 自己', copy)

  // 用 === 验证「是不是同一个数组」
  print('alias === nums（同一个）', alias === nums)
  print('copy === nums（不是同一个）', copy === nums)

  // 末尾追加 / 开头追加：都是产生新数组
  print('末尾追加', [...nums, 4])
  print('开头追加', [0, ...nums])

  // 合并两个数组
  const more = [7, 8]
  print('合并两个数组', [...nums, ...more])

  // 中间插入：用 slice 切成两半，中间塞新值
  print('在第 2 项后插入 99', [...nums.slice(0, 2), 99, ...nums.slice(2)])

  // 展开成函数实参：等价于 Math.max(1, 2, 3)
  print('Math.max(...nums)', Math.max(...nums))

  // 字符串也能展开成字符数组
  print('展开字符串', [...'abc'])
</script>`,
          },
          {
            type: 'text',
            title: '3. 对象展开：复制与覆盖（顺序决定谁赢）',
            body: '`{ ...对象 }` 会把对象的属性一个个「摊」到新对象里。\n\n- **复制**：`const copy = { ...user }`\n- **改一个字段**：`{ ...user, name: "小红" }` —— 先摊开旧的，再写新值覆盖\n- **合并两个对象**：`{ ...defaults, ...userConfig }`\n- **补默认值**：把默认值放前面，用户传的放后面\n\n**核心规则：后面的覆盖前面的。**\n\n- `{ ...user, name: "小红" }` → `name` 是「小红」（新值赢）\n- `{ name: "小红", ...user }` → `name` 是 user 里的原值（展开在后面，把前面覆盖了）\n\n这个顺序几乎是所有「合并配置」bug 的来源，一定要想清楚谁该赢。\n\n**注意：展开是「浅拷贝」。** `{ ...user }` 只复制第一层；如果 `user.profile` 是个对象，新旧两个对象里的 `profile` 仍然指向同一个对象。所以要改嵌套字段，每一层都得展开：\n\n`{ ...user, profile: { ...user.profile, city: "北京" } }`',
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '4. 动手跑一跑：对象展开、覆盖顺序、浅拷贝的坑',
            body: `<!-- 结果显示区 -->
<pre id="out" style="margin:0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  // 拿到结果显示区节点
  const out = document.getElementById('out')
  // 打印函数
  const print = (label, value) => {
    out.textContent += label + '：' + JSON.stringify(value) + '\\n'
  }

  // 原始对象，含一层嵌套对象 profile
  const user = { id: 1, name: '小明', profile: { city: '上海' } }

  // 复制并改一个字段：先摊开旧的，再用新值覆盖（后面的赢）
  print('改 name（新值在后，赢）', { ...user, name: '小红' })

  // 顺序反过来：展开写在后面，把前面的新值覆盖掉了
  print('改 name（展开在后，输）', { name: '小红', ...user })

  // 合并配置：默认值在前，用户配置在后 → 用户配置覆盖默认值
  const defaults = { size: 'md', color: '绿', bold: false }
  const mine = { color: '红' }
  print('默认值 + 用户配置', { ...defaults, ...mine })

  // 展开产生的是新对象，和原对象不是同一个
  const copy = { ...user }
  print('copy === user（不是同一个）', copy === user)

  // 但展开只复制第一层：嵌套的 profile 还是同一个对象（浅拷贝）
  print('copy.profile === user.profile（还是同一个）', copy.profile === user.profile)

  // 于是改 copy 里的深层字段，原对象也被改了 —— 这是浅拷贝的坑
  copy.profile.city = '被改成了北京'
  print('原 user 的 city（被连坐）', user.profile.city)

  // ✅ 正确改嵌套字段：每一层都展开一次
  const fixed = { ...user, profile: { ...user.profile, city: '广州' } }
  print('逐层展开后的新对象', fixed)
  print('原 user 的 city（这次没被动）', user.profile.city)
</script>`,
          },
          {
            type: 'text',
            title: '5. 反过来用：剩余参数与剩余属性',
            body: '同一个 `...`，写在**函数参数**或**解构左边**时，作用相反——它负责「把多个收集成一个」。\n\n**剩余参数（rest parameters）**：`function sum(...nums) {}` —— 调用 `sum(1, 2, 3)` 时，`nums` 是数组 `[1, 2, 3]`。适合参数个数不固定的函数。\n\n还能和固定参数搭配：`function log(level, ...messages) {}` —— 第一个参数单独接，剩下的打包。**剩余参数必须是最后一个参数。**\n\n（老代码里会看到 `arguments` 对象做同样的事，但它不是真数组、箭头函数里也没有，一律改用 `...args`。）\n\n**剩余属性 / 剩余元素**：解构时用 `...` 收集没被取走的部分：\n\n- `const { id, ...others } = user` —— `others` 是剩余属性组成的新对象\n- `const [head, ...tail] = arr` —— `tail` 是剩余元素组成的新数组\n\n**怎么区分展开还是收集？看它在等号哪一边**：右边（值的位置）= 展开摊平；左边（接收的位置）或函数参数 = 收集打包。',
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '6. 动手跑一跑：剩余参数与剩余属性',
            body: `<!-- 结果显示区 -->
<pre id="out" style="margin:0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  // 拿到结果显示区节点
  const out = document.getElementById('out')
  // 打印函数
  const print = (label, value) => {
    out.textContent += label + '：' + JSON.stringify(value) + '\\n'
  }

  // 剩余参数：不管传几个数字，都被打包成数组 nums
  const sum = (...nums) => {
    // nums 是真数组，可以直接用数组方法
    return nums.reduce((total, n) => total + n, 0)
  }
  print('sum(1,2,3)', sum(1, 2, 3))
  print('sum(1,2,3,4,5)', sum(1, 2, 3, 4, 5))
  print('sum() 一个都不传', sum())

  // 固定参数 + 剩余参数：剩余参数必须放最后
  const tag = (label, ...rest) => {
    return label + ' → ' + rest.join(' / ')
  }
  print('tag("水果", "苹果", "香蕉")', tag('水果', '苹果', '香蕉'))

  // 剩余参数收进来的是数组，可以再用 ... 展开出去
  const maxOf = (...nums) => Math.max(...nums)
  print('maxOf(3, 9, 5)', maxOf(3, 9, 5))

  // 剩余属性：解构时把没取走的属性打包成新对象
  const props = { id: 1, title: '标题', onClick: 'fn', disabled: true }
  const { title, ...restProps } = props
  print('取走的 title', title)
  print('剩余属性 restProps（React 里常用来透传）', restProps)

  // 剩余元素：数组解构时收集剩下的项
  const [head, ...tail] = [10, 20, 30, 40]
  print('head', head)
  print('tail', tail)
</script>`,
          },
          {
            type: 'table',
            title: '7. 展开 vs 收集 对照表',
            headers: ['写法', '位置', '作用'],
            rows: [
              ['[...arr]', '等号右边（值）', '展开：复制出新数组'],
              ['{ ...obj, a: 1 }', '等号右边（值）', '展开：复制并覆盖字段'],
              ['fn(...arr)', '调用实参', '展开：数组变成一个个参数'],
              ['<Btn {...props} />', 'JSX 属性', '展开：对象属性变成多个 props'],
              ['function fn(...args)', '函数形参', '收集：多个参数打包成数组'],
              ['const { a, ...rest } = obj', '解构左边', '收集：剩余属性打包成对象'],
              ['const [a, ...rest] = arr', '解构左边', '收集：剩余元素打包成数组'],
            ],
            note: '只要判断「它在给值，还是在接值」，就不会搞混这两种用法。',
          },
          {
            type: 'text',
            title: '8. React 为什么必须 {...obj, a: 1}？',
            body: 'React 判断 state 有没有变，用的是 `Object.is`（效果类似 `===`）——**只比较「是不是同一个对象」，不会逐个字段深比较**。\n\n所以：\n\n`form.name = "小明"; setForm(form)` —— 你确实改了内容，但 `form` 还是同一个对象。React 一比较：引用没变，判定「没变化」，直接跳过重新渲染。于是「我明明改了数据，界面却没动」。\n\n`setForm({ ...form, name: "小明" })` —— 展开旧字段 + 覆盖新值，得到一个**全新对象**。React 一比较：引用变了，触发重新渲染。\n\n这套「不改原对象，而是造个新的」的做法叫**不可变更新（immutable update）**，是整个 React 生态（包括 Redux、Zustand）的基本规矩。\n\n配套的口诀：\n\n- 改对象字段 → `{ ...obj, key: 新值 }`\n- 数组追加 → `[...arr, item]`（**不要用 `push`**，它改的是原数组）\n- 数组删除 → `arr.filter((x) => x.id !== id)`\n- 数组改某项 → `arr.map((x) => (x.id === id ? { ...x, done: true } : x))`\n- 数组排序 → `[...arr].sort(fn)`（**`sort` 会改原数组**，先复制）\n- 嵌套结构 → 有几层就展开几层',
          },
          {
            type: 'code',
            title: '9. 对照 React：不可变更新与 props 透传',
            language: 'jsx',
            body: `import { useState } from 'react'

function Settings() {
  const [form, setForm] = useState({ name: '', theme: 'light' })
  const [list, setList] = useState([{ id: 1, text: '学 JS', done: false }])

  // ❌ 错误：直接改原对象，引用没变，React 认为「没变化」，界面不更新
  const wrongUpdate = () => {
    form.name = '小明'
    setForm(form)
  }

  // ✅ 正确：展开旧字段 + 覆盖新值，得到新对象
  //    箭头函数返回对象要加圆括号，就是上一节讲的规则
  const rightUpdate = (value) => {
    setForm((prev) => ({ ...prev, name: value }))
  }

  // ✅ 数组追加：用 [...prev, 新项]，不要用 prev.push(...)
  const addItem = (text) => {
    setList((prev) => [...prev, { id: Date.now(), text, done: false }])
  }

  // ✅ 改数组里某一项：map 找到它，再展开这一项覆盖字段
  const toggle = (id) => {
    setList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    )
  }

  return (
    <div>
      {/* JSX 里的 {...对象}：把对象的每个属性都当成一个 prop 传下去 */}
      <Field {...{ label: '名字', value: form.name }} onChange={rightUpdate} />
      <button type="button" onClick={() => addItem('新任务')}>添加</button>
    </div>
  )
}

// props 透传：自己用 label，其余属性原样丢给真正的 input
function Field({ label, ...rest }) {
  return (
    <label>
      {label}
      <input {...rest} />
    </label>
  )
}`,
          },
          {
            type: 'list',
            title: '10. 小白易错清单',
            ordered: true,
            items: [
              '用 const copy = arr 以为复制了——那只是同一个数组的第二个名字，要写 [...arr]',
              '以为 { ...obj } 是深拷贝——它只复制第一层，嵌套对象仍然共享',
              '合并对象时顺序写反，导致「设置的新值被旧值覆盖」',
              'React 里用 arr.push(item) 后 setArr(arr)——引用没变，界面不更新',
              '对 state 数组直接 .sort()——sort 会改原数组，要先 [...arr] 复制',
              '把剩余参数写在中间：function f(...args, last) 是语法错误，必须放最后',
            ],
          },
          {
            type: 'tip',
            title: '本节小结',
            body: '`...` 在右边是展开、在左边（含函数参数）是收集。改 React 数据永远「先复制再改」：对象 `{ ...obj, key: 值 }`，数组 `[...arr, item]` / `filter` / `map`。展开是浅拷贝，嵌套几层就展开几层。',
          },
        ],
      },
    },
    {
      id: 'js-object-array',
      title: '对象常用操作：简写、?.、?? 与 Object.keys',
      summary:
        '属性简写、计算属性名、可选链 ?.、空值合并 ??、Object.keys/values/entries 遍历',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '**`?.` 是「有就往下取，没有就返回 undefined 而不报错」；`??` 是「左边是 null/undefined 才用右边」。** 处理接口返回的数据时这两个符号能救命。',
          },
          {
            type: 'text',
            title: '1. 属性简写：名字一样就只写一次',
            body: '当变量名和属性名相同时，可以省掉一半：\n\n**老写法**：`const user = { name: name, age: age }`\n\n**简写**：`const user = { name, age }`\n\n完全等价，只是少打字。React 里到处都是这种写法：`setForm({ name, email })`、`return { data, loading, error }`。\n\n**方法也能简写**：\n\n老写法 `{ say: function () {} }` 可以写成 `{ say() {} }`。\n\n注意：对象的方法**不要用箭头函数**（`{ say: () => this.name }`），因为箭头函数拿不到这个对象的 `this`（上一节讲过）。',
          },
          {
            type: 'text',
            title: '2. 计算属性名：属性名也能是变量',
            body: '属性名写死时是 `{ name: "小明" }`。如果属性名本身存在一个变量里怎么办？用方括号：\n\n`const key = "name"`\n\n`const obj = { [key]: "小明" }` → 得到 `{ name: "小明" }`\n\n方括号里可以是任何表达式：`{ ["item" + id]: value }`。\n\n这在 React 表单里是杀手级用法——**一个函数搞定所有输入框**：\n\n`const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))`\n\n调用 `updateField("email", "a@b.com")` 时，`[key]` 变成 `email`，于是只覆盖 `email` 字段。如果不写方括号，你会得到一个真的叫 `key` 的属性——这是高频 bug。\n\n**读取时同理**：`obj.name` 是写死的属性名，`obj[key]` 才是「用变量当属性名去读」。',
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '3. 动手跑一跑：属性简写与计算属性名',
            body: `<!-- 结果显示区 -->
<pre id="out" style="margin:0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  // 拿到结果显示区节点
  const out = document.getElementById('out')
  // 打印函数
  const print = (label, value) => {
    out.textContent += label + '：' + JSON.stringify(value) + '\\n'
  }

  // 两个变量，名字正好和想要的属性名一致
  const name = '小明'
  const age = 18

  // 老写法：属性名和变量名重复写两遍
  print('老写法', { name: name, age: age })
  // 简写：名字相同就只写一次，完全等价
  print('属性简写', { name, age })

  // 计算属性名：属性名来自变量，必须用方括号包起来
  const key = 'email'
  print('用 [key] 当属性名', { [key]: 'a@b.com' })
  // ❌ 不加方括号：属性名就真的叫 "key" 了，这是高频 bug
  print('忘记方括号（错误）', { key: 'a@b.com' })

  // 方括号里可以是任意表达式，比如拼字符串
  const id = 7
  print('拼出来的属性名', { ['item' + id]: '第七项' })

  // 模拟 React 的 updateField：一个函数更新任意字段
  let form = { name: '', email: '', city: '' }
  const updateField = (k, v) => {
    // 展开旧对象 + 用 [k] 覆盖指定字段，得到新对象
    form = { ...form, [k]: v }
  }
  updateField('name', '小红')
  updateField('city', '上海')
  print('两次 updateField 之后', form)

  // 读取时也一样：obj.name 是写死的，obj[key] 才是用变量读
  print('form["name"] 用变量读', form[key === 'email' ? 'name' : 'name'])
</script>`,
          },
          {
            type: 'text',
            title: '4. 可选链 ?.：不存在也不报错',
            body: '接口数据经常缺字段。如果写 `user.profile.city`，而 `user.profile` 是 `undefined`，整个页面会直接崩掉，报错信息是：`Cannot read properties of undefined (reading "city")`。\n\n老办法要层层判断：`user && user.profile && user.profile.city`——又长又丑。\n\n**可选链 `?.`**：`user?.profile?.city`\n\n规则：**`?.` 左边是 `null` 或 `undefined` 时，整个表达式立刻停下来返回 `undefined`，不再往下取，也不报错。**\n\n三种形态：\n\n- 取属性：`user?.name`\n- 取数组项：`list?.[0]`（注意属性名前有个点）\n- 调函数：`onClick?.()` —— 传了才调用，没传就什么也不做。React 里可选回调常这么写\n\n**注意**：`?.` 只对 `null` 和 `undefined` 生效。如果 `user` 是 `0` 或 `""`，`user?.name` 还是会去取属性（然后得到 `undefined`）。',
          },
          {
            type: 'text',
            title: '5. 空值合并 ??：只在 null / undefined 时兜底',
            body: '老办法给默认值用 `||`：`const name = user.name || "匿名"`。\n\n问题是 `||` 看的是「假值」——上一节的六个假值都会走默认值。于是：\n\n- `0 || 10` 得到 `10` ——可是 0 可能是合法的数量！\n- `"" || "默认"` 得到 `"默认"` ——可是空字符串可能是用户故意清空的\n- `false || true` 得到 `true` ——布尔开关直接失效\n\n**空值合并 `??`** 更严格：**只有左边是 `null` 或 `undefined` 时才用右边。**\n\n- `0 ?? 10` 得到 `0`（保住了）\n- `"" ?? "默认"` 得到 `""`（保住了）\n- `undefined ?? 10` 得到 `10`（该兜底时兜底）\n\n**选择口诀**：默认值涉及数字、布尔、可能为空字符串的字段，用 `??`；只是「随便有个兜底」的字符串，用 `||` 也无所谓。搞不清就用 `??`。\n\n常见组合：`const city = user?.profile?.city ?? "未填写"` —— 可选链负责安全取值，空值合并负责兜底。这一行几乎是处理接口数据的标准写法。\n\n（语法细节：`??` 不能和 `||`、`&&` 直接混写，必须加括号，否则报语法错。）',
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '6. 动手跑一跑：?. 与 ?? 的救命效果',
            body: `<!-- 结果显示区 -->
<pre id="out" style="margin:0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  // 拿到结果显示区节点
  const out = document.getElementById('out')
  // 打印函数
  const print = (label, value) => {
    out.textContent += label + '：' + JSON.stringify(value) + '\\n'
  }

  // 模拟一份「字段不全」的接口数据：没有 profile，count 是 0
  const user = { name: '小明', count: 0, nickname: '' }

  // ❌ 不用可选链：读 undefined 上的属性会直接抛错，页面崩掉
  try {
    print('直接读 user.profile.city', user.profile.city)
  } catch (e) {
    print('直接读的结果', '报错 → ' + e.name)
  }

  // ✅ 可选链：左边是 undefined 就停下来返回 undefined，不报错
  print('user?.profile?.city', user?.profile?.city)

  // 可选链取数组项要写成 ?.[0]（属性名前有个点）
  const noList = null
  print('noList?.[0]', noList?.[0])

  // 可选链调函数：传了才调用，没传就什么也不做
  const onClick = undefined
  print('onClick?.() 不报错', onClick?.())

  // || 看「假值」：0 和空字符串都会被当成没值，走默认值
  print('user.count || 99（0 被顶掉了）', user.count || 99)
  print('user.nickname || "默认昵称"', user.nickname || '默认昵称')

  // ?? 只看 null / undefined：0 和空字符串都能保住
  print('user.count ?? 99（0 保住了）', user.count ?? 99)
  print('user.nickname ?? "默认昵称"（空串保住了）', user.nickname ?? '默认昵称')

  // 真的缺字段时，?? 照样兜底
  print('user.age ?? 18（缺字段兜底）', user.age ?? 18)

  // 处理接口数据的标准组合：可选链安全取值 + 空值合并兜底
  print('组合写法', user?.profile?.city ?? '未填写')
</script>`,
          },
          {
            type: 'table',
            title: '7. ?. 、?? 、|| 对照表',
            headers: ['表达式', '结果', '说明'],
            rows: [
              ['undefined?.name', 'undefined', '安全，不报错'],
              ['null?.a?.b', 'undefined', '中途断掉就停'],
              ['fn?.()', 'fn 存在才调用', 'React 可选回调常用'],
              ['0 || 10', '10', '|| 认为 0 是「没值」'],
              ['0 ?? 10', '0', '?? 只认 null/undefined'],
              ['"" || "默认"', '"默认"', '空字符串被顶掉'],
              ['"" ?? "默认"', '""', '空字符串保留'],
              ['false ?? true', 'false', '布尔值保留，开关不会失效'],
              ['null ?? "兜底"', '"兜底"', '该兜底时正常兜底'],
            ],
            note: '涉及数字 0、布尔 false、空字符串时，必须用 ??，否则合法数据会被默认值悄悄替换。',
          },
          {
            type: 'text',
            title: '8. 遍历对象：Object.keys / values / entries',
            body: '数组有 `map`、`filter`，对象没有——想遍历对象，先把它变成数组：\n\n- **`Object.keys(obj)`** → 所有属性名组成的数组：`["name", "age"]`\n- **`Object.values(obj)`** → 所有属性值组成的数组：`["小明", 18]`\n- **`Object.entries(obj)`** → 每项是 `[键, 值]` 的二维数组：`[["name", "小明"], ["age", 18]]`\n\n配合数组方法就能干很多事：\n\n- 判断对象是否为空：`Object.keys(obj).length === 0`（这是标准写法，因为 `{}` 是真值）\n- 遍历渲染：`Object.entries(obj).map(([key, value]) => ...)` —— 注意参数位置的 `[key, value]` 是数组解构\n- 求和：`Object.values(scores).reduce((a, b) => a + b, 0)`\n\n**反过来**：`Object.fromEntries(entries)` 能把 `[[键, 值], ...]` 变回对象。\n\n**顺带一个常用方法**：`Object.assign(target, source)` 也能合并对象，但它会**修改** `target`。现代代码基本被 `{ ...a, ...b }` 取代了，看到老代码认得就行。',
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '9. 动手跑一跑：把对象变成数组来遍历',
            body: `<!-- 结果显示区 -->
<pre id="out" style="margin:0;font:13px/1.7 ui-monospace,monospace;white-space:pre-wrap;"></pre>

<script>
  // 拿到结果显示区节点
  const out = document.getElementById('out')
  // 打印函数
  const print = (label, value) => {
    out.textContent += label + '：' + JSON.stringify(value) + '\\n'
  }

  // 一份成绩单对象，属性名是科目，属性值是分数
  const scores = { 语文: 92, 数学: 78, 英语: 85 }

  // Object.keys：拿到所有属性名（科目）
  print('Object.keys', Object.keys(scores))
  // Object.values：拿到所有属性值（分数）
  print('Object.values', Object.values(scores))
  // Object.entries：拿到 [键, 值] 组成的二维数组
  print('Object.entries', Object.entries(scores))

  // 判断对象是否为空：靠 keys 的长度，不能直接 if({})
  print('空对象是否为空', Object.keys({}).length === 0)
  print('scores 是否为空', Object.keys(scores).length === 0)

  // 配合 reduce 求总分（reduce 下一节细讲）
  const total = Object.values(scores).reduce((sum, n) => sum + n, 0)
  print('总分', total)
  print('平均分', (total / Object.keys(scores).length).toFixed(1))

  // 配合 entries + map 生成文案：参数位置的 [科目, 分数] 是数组解构
  const lines = Object.entries(scores).map(([科目, 分数]) => 科目 + '：' + 分数 + ' 分')
  out.textContent += '\\n逐条渲染（React 里就是这样把对象渲染成列表）：\\n'
  out.textContent += lines.join('\\n') + '\\n'

  // 只保留及格科目：entries 过滤后再用 fromEntries 变回对象
  const passed = Object.fromEntries(
    Object.entries(scores).filter(([, 分数]) => 分数 >= 80)
  )
  print('\\n80 分以上的科目', passed)
</script>`,
          },
          {
            type: 'code',
            title: '10. 对照 React：这些语法在组件里长什么样',
            language: 'jsx',
            body: `import { useState } from 'react'

function ProfileForm({ user, onSave }) {
  // 属性简写：变量名和字段名一致时只写一次
  const [form, setForm] = useState({ name: '', email: '', city: '' })
  const [errors, setErrors] = useState({})

  // 计算属性名 [key]：一个函数更新任意字段（React 表单标准写法）
  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  // 可选链 + 空值合并：接口字段缺失也不会崩，还能给出兜底文案
  const city = user?.profile?.city ?? '未填写'
  // ?? 保住 0：如果用 || ，积分为 0 的用户会显示成 100
  const points = user?.points ?? 100
  // 可选回调：父组件没传 onSave 时不会报错
  const handleSave = () => onSave?.(form)

  // 判断对象是否为空：必须看 keys 长度，因为 {} 本身是真值
  const hasError = Object.keys(errors).length > 0

  return (
    <form>
      {/* Object.entries + map 把对象渲染成一组输入框 */}
      {/* 参数位置的 [key, value] 是数组解构 */}
      {Object.entries(form).map(([key, value]) => (
        <label key={key}>
          {key}
          <input value={value} onChange={(e) => updateField(key, e.target.value)} />
        </label>
      ))}

      <p>城市：{city}｜积分：{points}</p>
      {hasError && <p style={{ color: 'crimson' }}>请检查表单</p>}
      <button type="button" onClick={handleSave}>保存</button>
    </form>
  )
}`,
          },
          {
            type: 'list',
            title: '11. 自检清单',
            ordered: true,
            items: [
              '计算属性名一定要写方括号：{ [key]: value }，漏了就会多出一个叫 key 的属性',
              '接口数据取深层字段先想到 ?.，给默认值先想到 ??',
              '默认值涉及 0 / false / 空字符串时，绝不能用 ||',
              '判断对象为空写 Object.keys(obj).length === 0',
              '?? 不能和 || / && 直接混写，要加括号',
              '对象方法别用箭头函数，否则拿不到该对象的 this',
            ],
          },
          {
            type: 'tip',
            title: '本节小结',
            body: '同名属性简写、变量当属性名用 `[key]`。取值链路不确定就 `?.`，兜底默认值用 `??`（0 和空串能保住）。遍历对象先用 `Object.keys / values / entries` 变成数组，再交给数组方法。',
          },
        ],
      },
    },
    {
      id: 'js-array-methods',
      title: '数组高频方法：map / filter / find / reduce…',
      summary:
        '八个必会方法：各自返回什么、会不会改原数组；map 和 filter 就是 React 列表渲染的全部',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '**`map` 变换（进 3 出 3）、`filter` 筛选（进 3 出 ≤3）、`find` 找一个（出 1 项或 undefined）、`reduce` 归成一个值。** 这四个都返回新东西，不动原数组——正好是 React 需要的。',
          },
          {
            type: 'text',
            title: '1. 先建立总览：谁返回什么、谁会改原数组',
            body: '这些方法的用法高度统一：`arr.方法((item, index) => ...)` —— 传进去一个函数，数组会**替你循环**，每一项都调用一次这个函数。\n\n最关键的两个问题永远是：**返回什么？原数组会不会变？**\n\n**返回新数组（原数组不变）**：`map`、`filter`、`slice`、`concat`\n\n**返回单个值（原数组不变）**：`find`、`findIndex`、`reduce`、`some`、`every`、`includes`、`indexOf`、`join`\n\n**会修改原数组（React 里要当心）**：`push`、`pop`、`shift`、`unshift`、`splice`、`sort`、`reverse`\n\n记住这三组，你就知道哪些能在 React 里直接用、哪些必须先 `[...arr]` 复制一份。\n\n回调函数的参数固定是 `(当前项, 下标, 整个数组)`，一般只用前一两个，用不到就不写。',
          },
          {
            type: 'table',
            title: '2. 八大方法速查表',
            headers: ['方法', '返回什么', '改原数组吗', '典型用途'],
            rows: [
              ['arr.map(fn)', '同样长度的新数组', '不改', '把每项变换成另一个样子（渲染列表）'],
              ['arr.filter(fn)', '只含符合条件项的新数组', '不改', '筛选、搜索、删除某项'],
              ['arr.find(fn)', '第一个符合的项，找不到给 undefined', '不改', '按 id 找一条数据'],
              ['arr.findIndex(fn)', '第一个符合项的下标，找不到给 -1', '不改', '需要位置时用'],
              ['arr.reduce(fn, 初值)', '一个累积出来的值（任意类型）', '不改', '求和、计数、分组'],
              ['arr.some(fn)', '布尔：有没有「至少一个」符合', '不改', '判断是否存在'],
              ['arr.every(fn)', '布尔：是不是「全部」符合', '不改', '表单是否全部通过校验'],
              ['arr.includes(值)', '布尔：数组里有没有这个值', '不改', '判断某值是否在数组中'],
              ['arr.sort(fn)', '排好序的数组（就是原数组）', '会改！', '排序，React 里先 [...arr]'],
              ['arr.forEach(fn)', 'undefined（什么都不返回）', '不改', '只想循环做事，不要结果'],
            ],
            note: 'map 和 forEach 的区别：map 返回新数组（能接着用），forEach 返回 undefined（写 const a = arr.forEach(...) 只会得到 undefined）。JSX 里渲染列表必须用 map。',
          },
          {
            type: 'text',
            title: '3. map：一进一出的「变换机」',
            body: '`arr.map(fn)` 把数组每一项交给 `fn`，**用 `fn` 的返回值组成一个等长的新数组**。\n\n`[1, 2, 3].map((n) => n * 2)` → `[2, 4, 6]`\n\n三个要点：\n\n1. **长度不变**：进 3 项一定出 3 项（想变少请用 `filter`）\n2. **回调必须返回值**：忘了 `return` 就会得到一堆 `undefined`——箭头函数写成 `(n) => n * 2` 就不会忘\n3. **原数组不变**：结果是新数组\n\n最常见的用途是把「数据数组」变成「界面数组」。React 里：\n\n`{todos.map((todo) => <li key={todo.id}>{todo.text}</li>)}`\n\n这一行读作：把每条 todo 数据变换成一个 `<li>` 元素，得到一个元素数组，React 会把数组里的元素依次渲染出来。\n\n**`key` 是必须的**：React 靠 `key` 认出「哪一项是哪一项」，从而在数据变化时精准更新。`key` 要用数据本身稳定唯一的值（通常是 `id`），**不要用数组下标**（删除、排序后下标会错位，导致状态串行）。',
          },
          {
            type: 'text',
            title: '4. filter / find / findIndex：筛选与查找',
            body: '**`filter`（筛选，出 0~n 项）**：回调返回 `true` 就保留这一项。\n\n`[1, 2, 3, 4].filter((n) => n % 2 === 0)` → `[2, 4]`\n\n用途：搜索框过滤、显示未完成任务、**按条件删除**（`arr.filter((x) => x.id !== id)` 是 React 里删除数据的标准写法，因为它返回新数组）。\n\n**`find`（找一个，出 1 项）**：返回**第一个**符合条件的项本身；一个都没有就返回 `undefined`。\n\n`users.find((u) => u.id === 7)` → 那条用户对象\n\n注意 `filter` 和 `find` 的区别：`filter` 永远给你**数组**（可能是空数组 `[]`），`find` 给你**那一项**（可能是 `undefined`）。想要一条数据却用了 `filter`，就会得到 `[{...}]` 这种多套了一层的东西。\n\n**`findIndex`（找位置）**：返回第一个符合项的下标，没有则返回 `-1`。需要「插到某位置」或「替换某位置」时才用。',
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '5. 动手跑一跑：map / filter / find 三兄弟',
            body: `<!-- 结果显示区 -->
<pre id="out" style="margin:0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  // 拿到结果显示区节点
  const out = document.getElementById('out')
  // 打印函数
  const print = (label, value) => {
    out.textContent += label + '：' + JSON.stringify(value) + '\\n'
  }

  // 模拟一份任务列表数据，和 React 里的 state 结构一样
  const todos = [
    { id: 1, text: '学 JS', done: true },
    { id: 2, text: '学 React', done: false },
    { id: 3, text: '写项目', done: false },
  ]

  // map：每项变换成另一个样子，长度不变（3 进 3 出）
  print('map 取出所有文字', todos.map((t) => t.text))
  // map 也能返回对象：展开原项 + 覆盖字段（React 改某项就靠这个）
  print('map 把 id=2 标记完成', todos.map((t) => (t.id === 2 ? { ...t, done: true } : t)))

  // filter：回调返回 true 才保留（3 进 2 出）
  print('filter 未完成的', todos.filter((t) => !t.done))
  // filter 按 id 排除，就是 React 里的「删除」写法
  print('filter 删掉 id=1', todos.filter((t) => t.id !== 1))
  // filter 关键词搜索：includes 判断文字里有没有这几个字
  print('filter 搜索含「学」', todos.filter((t) => t.text.includes('学')))

  // find：返回「那一项」本身，找不到给 undefined
  print('find id=3 的那一项', todos.find((t) => t.id === 3))
  print('find 不存在的 id', todos.find((t) => t.id === 99))
  // 对比：filter 永远给数组，哪怕只有一项也套着中括号
  print('filter id=3（多套了一层）', todos.filter((t) => t.id === 3))

  // findIndex：返回下标，找不到给 -1
  print('findIndex id=2', todos.findIndex((t) => t.id === 2))

  // 最重要的一点：以上方法都不会改原数组
  print('原数组完好无损', todos.length)
  // ⚠️ 忘写 return 的坑：有花括号却不 return，就得到一堆 undefined
  print('忘写 return 的 map', todos.map((t) => { t.text }))
</script>`,
          },
          {
            type: 'text',
            title: '5. reduce：把一个数组「归」成一个值',
            body: '`reduce` 是最强也最容易懵的一个，但结构很固定：\n\n`arr.reduce((累积值, 当前项) => 新的累积值, 初始值)`\n\n它循环整个数组，每轮把「上一轮的结果」和「当前项」交给你，你返回新的结果；循环结束就得到最终值。\n\n求和的例子：`[1, 2, 3].reduce((sum, n) => sum + n, 0)`\n\n- 第 1 轮：`sum = 0`（初始值），`n = 1` → 返回 1\n- 第 2 轮：`sum = 1`，`n = 2` → 返回 3\n- 第 3 轮：`sum = 3`，`n = 3` → 返回 6\n- 结果：6\n\n**初始值一定要写**（上面那个 `0`）。不写的话空数组会直接抛错，而且第一轮的行为也不一样。\n\n**累积值可以是任何类型**，所以 `reduce` 很万能：\n\n- 累积成数字：求和、算总价 `items.reduce((sum, i) => sum + i.price * i.qty, 0)`\n- 累积成对象：统计次数、按字段分组\n- 累积成数组：其实这时候用 `map` / `filter` 更清楚\n\n**建议**：能用 `map` / `filter` 表达的就别硬用 `reduce`；只有「归成一个值」时它才是最佳选择。',
          },
          {
            type: 'text',
            title: '6. some / every / includes：三个返回布尔值的判断',
            body: '**`some`（有没有至少一个）**：`arr.some((x) => 条件)` —— 只要有一项满足就返回 `true`。\n\n用途：「购物车里有没有缺货商品」、「列表里还有没有未完成的」。\n\n**`every`（是不是全部）**：`arr.every((x) => 条件)` —— 全部满足才返回 `true`。\n\n用途：「所有必填项是否都填了」、「是不是全部任务都完成了」（进而决定是否显示「全部完成」）。\n\n小提醒：**空数组上 `some` 永远 `false`，`every` 永远 `true`**（数学上的约定），处理可能为空的列表时留意一下。\n\n**`includes`（数组里有没有这个值）**：`arr.includes(值)` —— 注意它接收的是**值本身**，不是回调函数。\n\n`[1, 2, 3].includes(2)` → `true`\n\n它用的是严格相等（`===`），所以对**对象**无效：`[{id:1}].includes({id:1})` 是 `false`（两个不同的对象）。找对象请用 `some` 或 `find`。\n\n**字符串也有 `includes`**：`"学 React".includes("React")` → `true`，搜索过滤时天天用。',
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '7. 动手跑一跑：reduce 与 some / every / includes',
            body: `<!-- 结果显示区 -->
<pre id="out" style="margin:0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  // 拿到结果显示区节点
  const out = document.getElementById('out')
  // 打印函数
  const print = (label, value) => {
    out.textContent += label + '：' + JSON.stringify(value) + '\\n'
  }

  // 模拟购物车数据
  const cart = [
    { name: '键盘', price: 299, qty: 1, stock: true },
    { name: '鼠标', price: 99, qty: 2, stock: true },
    { name: '显示器', price: 1299, qty: 1, stock: false },
  ]

  // reduce 求和：初始值 0，每轮把上一轮结果 sum 和当前项 i 交给你
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
  print('总价（reduce 归成一个数字）', total)
  // reduce 也能数总件数
  print('总件数', cart.reduce((sum, i) => sum + i.qty, 0))

  // reduce 累积成对象：统计每种价位区间有几件（累积值可以是任意类型）
  const group = cart.reduce((acc, i) => {
    // 按价格分成「便宜」和「贵」两档
    const key = i.price < 500 ? '便宜' : '贵'
    // 展开旧的统计结果，把当前档位 +1
    return { ...acc, [key]: (acc[key] ?? 0) + 1 }
  }, {})
  print('reduce 分组统计', group)

  // some：有没有「至少一个」缺货
  print('some 有缺货吗', cart.some((i) => !i.stock))
  // every：是不是「全部」有货
  print('every 全部有货吗', cart.every((i) => i.stock))
  // 空数组的约定：some 永远 false，every 永远 true
  print('空数组 some', [].some((x) => true))
  print('空数组 every', [].every((x) => false))

  // includes 接收的是「值」，不是回调函数
  const ids = [1, 2, 3]
  print('ids.includes(2)', ids.includes(2))
  // 对象用 includes 无效（两个长得一样的对象也不是同一个）
  print('对象 includes 无效', [{ id: 1 }].includes({ id: 1 }))
  // 找对象要用 some（或 find）
  print('用 some 找对象', cart.some((i) => i.name === '鼠标'))
  // 字符串也有 includes，搜索过滤最常用
  print('字符串 includes', '学 React'.includes('React'))
</script>`,
          },
          {
            type: 'text',
            title: '8. sort：唯一必须先复制的方法',
            body: '`sort` 有两个必须知道的特性。\n\n**特性一：它会修改原数组**（同时也返回这个数组）。所以在 React 里对 state 数组直接 `.sort()` 是 bug：原数组被改了，引用又没变，界面可能不更新。**正确写法是 `[...arr].sort(fn)`**。（`reverse` 同理。）\n\n**特性二：不传参数时按「字符串」排序**，这是新手最震惊的一点：\n\n`[10, 9, 1].sort()` → `[1, 10, 9]`\n\n因为它把数字转成字符串比较，`"10"` 排在 `"9"` 前面。\n\n**数字排序必须传比较函数**：\n\n- 升序：`arr.sort((a, b) => a - b)`\n- 降序：`arr.sort((a, b) => b - a)`\n\n记法：返回负数表示「a 排前面」，正数表示「b 排前面」，0 表示不变。`a - b` 小的在前，就是升序。\n\n**按对象字段排序**：\n\n- 按数字字段：`[...list].sort((a, b) => a.price - b.price)`\n- 按中文/字符串字段：`[...list].sort((a, b) => a.name.localeCompare(b.name))`（`localeCompare` 能正确处理中文和大小写）',
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '9. 动手跑一跑：sort 的两个坑',
            body: `<!-- 结果显示区 -->
<pre id="out" style="margin:0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  // 拿到结果显示区节点
  const out = document.getElementById('out')
  // 打印函数
  const print = (label, value) => {
    out.textContent += label + '：' + JSON.stringify(value) + '\\n'
  }

  // 一组数字，故意包含两位数，用来暴露默认排序的坑
  const nums = [10, 9, 1, 25, 3]
  print('原数组', nums)

  // 坑一：不传比较函数时按「字符串」排，"10" 会排在 "9" 前面
  print('直接 sort()（按字符串排，错的）', [...nums].sort())

  // 正确：数字升序传 (a, b) => a - b
  print('升序 sort((a,b) => a - b)', [...nums].sort((a, b) => a - b))
  // 数字降序传 (a, b) => b - a
  print('降序 sort((a,b) => b - a)', [...nums].sort((a, b) => b - a))

  // 坑二：sort 会改原数组。先做个副本 later 用来对比
  const later = [3, 1, 2]
  later.sort((a, b) => a - b)
  print('直接 sort 之后的原数组（被改了）', later)

  // ✅ React 里的正确姿势：先用 ... 复制，再 sort
  const safe = [3, 1, 2]
  const sorted = [...safe].sort((a, b) => a - b)
  print('复制后再排序：原数组', safe)
  print('复制后再排序：新数组', sorted)

  // 按对象的数字字段排序
  const list = [
    { name: '张三', price: 299 },
    { name: '李四', price: 99 },
    { name: '王五', price: 1299 },
  ]
  print('按 price 升序', [...list].sort((a, b) => a.price - b.price).map((i) => i.price))

  // 按中文字段排序用 localeCompare，能正确处理中文
  print('按姓名排序', [...list].sort((a, b) => a.name.localeCompare(b.name)).map((i) => i.name))
</script>`,
          },
          {
            type: 'code',
            title: '10. 对照 React：一个列表页用到的全部方法',
            language: 'jsx',
            body: `import { useState } from 'react'

function TodoPage() {
  const [todos, setTodos] = useState([
    { id: 1, text: '学 JS', done: true },
    { id: 2, text: '学 React', done: false },
  ])
  const [keyword, setKeyword] = useState('')

  // filter + 字符串 includes：搜索过滤（派生值，不用 useState 存）
  const visible = todos.filter((t) => t.text.includes(keyword))
  // filter().length：统计已完成条数
  const doneCount = todos.filter((t) => t.done).length
  // every / some：全部完成？还有没有未完成？（空数组时 every 为 true，注意兜底）
  const allDone = todos.length > 0 && todos.every((t) => t.done)
  const hasUndone = todos.some((t) => !t.done)
  // reduce：归成一个值（这里算总字数）
  const totalChars = todos.reduce((sum, t) => sum + t.text.length, 0)

  // 删除：filter 返回新数组（不能用 splice，它会改原数组）
  const remove = (id) => setTodos((prev) => prev.filter((t) => t.id !== id))

  // 改某一项：map 找到目标，展开后覆盖字段（不能直接改 t.done）
  const toggle = (id) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  // 排序：state 数组必须先 [...prev] 复制，再 sort
  const sortByText = () =>
    setTodos((prev) => [...prev].sort((a, b) => a.text.localeCompare(b.text)))

  return (
    <div>
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      <p>
        {doneCount}/{todos.length} 完成｜共 {totalChars} 字
        {allDone && '｜全部搞定！'}
      </p>

      <ul>
        {/* map 把数据数组变成元素数组，key 用稳定唯一的 id，不要用下标 */}
        {visible.map((todo) => (
          <li key={todo.id}>
            <span onClick={() => toggle(todo.id)}>{todo.text}</span>
            <button type="button" onClick={() => remove(todo.id)}>删除</button>
          </li>
        ))}
      </ul>

      {/* 空状态：filter 结果可能是空数组，要单独处理 */}
      {visible.length === 0 && <p>没有匹配的任务</p>}
      <button type="button" onClick={sortByText}>按名称排序</button>
    </div>
  )
}`,
          },
          {
            type: 'list',
            title: '11. 小白易错清单',
            ordered: true,
            items: [
              'map 的回调写了花括号却忘记 return，结果得到一堆 undefined',
              '想要一条数据却用 filter，拿到的是 [{...}]，还得再取 [0]——应该用 find',
              'JSX 里用 forEach 渲染列表——forEach 不返回数组，必须用 map',
              'map 的 key 用数组下标 index，删除/排序后状态串行',
              'reduce 忘写初始值，空数组时直接抛错',
              '对 state 数组直接 sort / reverse / push / splice——先 [...arr] 复制',
              'sort 数字忘了传 (a,b) => a - b，结果按字符串排成 1, 10, 9',
              '用 includes 找对象——对象要用 some 或 find',
            ],
          },
          {
            type: 'tip',
            title: '本节小结',
            body: '`map` 变换、`filter` 筛选、`find` 找一项、`reduce` 归一个值、`some`/`every`/`includes` 出布尔——全都不改原数组，正合 React 心意。只有 `sort`、`reverse`、`push`、`splice` 会改原数组，用前先 `[...arr]`。',
          },
        ],
      },
    },
    {
      id: 'js-condition-loop',
      title: '条件与循环的现代写法',
      summary:
        '三元表达式、&& 与 || 短路、for...of 与 for...in 的区别；对照 JSX 条件渲染',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '**JSX 的 `{}` 里只能放表达式，所以条件分支用三元 `条件 ? A : B`，只有一个分支时用 `条件 && A`。** 遍历数组用 `for...of`（或 `map`），`for...in` 是给对象用的。',
          },
          {
            type: 'text',
            title: '1. 三元表达式：会返回值的 if',
            body: '普通 `if` 是**语句**，不产生值，所以不能写在 JSX 的 `{}` 里，也不能直接赋值给变量。\n\n**三元表达式**是**表达式**，会算出一个值：\n\n`条件 ? 条件为真时的值 : 条件为假时的值`\n\n例子：`const label = done ? "已完成" : "进行中"`\n\n读法：`?` 前面是问题，`:` 前后是两个答案。\n\n**可以嵌套**（但请节制，两层以上就该考虑别的写法）：\n\n`score >= 90 ? "优" : score >= 60 ? "及格" : "不及格"`\n\n**在 JSX 里**：\n\n`{isLogin ? <Home /> : <Login />}` —— 二选一渲染，这是最常见的条件渲染写法。',
          },
          {
            type: 'text',
            title: '2. && 和 || 的短路：不只是逻辑运算',
            body: 'JS 里的 `&&` 和 `||` 有个特别之处：**它们返回的不是 `true`/`false`，而是其中某个操作数本身。**\n\n**`A && B`**：A 为假值就直接返回 A（不看 B）；A 为真值才返回 B。\n\n所以 `isLogin && <Panel />` 的含义是：登录了就得到 `<Panel />`（会渲染），没登录就得到 `false`（React 对 `false` 什么都不渲染）。这就是「只有一个分支」的条件渲染。\n\n**`A || B`**：A 为真值就返回 A；A 为假值才返回 B。常用来给默认值：`name || "匿名"`。\n\n**「短路」的意思是右边可能根本不执行**，这一点很有用：\n\n`user && user.getName()` —— `user` 不存在时，右边不会执行，避免报错（不过现在更推荐 `user?.getName()`）。\n\n**React 里最著名的坑（再强调一次）**：\n\n`{list.length && <List />}` —— 当 `list.length` 是 `0` 时，表达式返回数字 `0`，而 React 会把 `0` 渲染到页面上，屏幕上就莫名出现一个「0」。\n\n**正确写法**：`{list.length > 0 && <List />}` —— 把它变成真正的布尔值。',
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '3. 动手跑一跑：三元与短路的返回值',
            body: `<!-- 结果显示区 -->
<pre id="out" style="margin:0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  // 拿到结果显示区节点
  const out = document.getElementById('out')
  // 打印函数：用 JSON.stringify 才能看清返回的到底是 false 还是 0
  const print = (label, value) => {
    out.textContent += label + '：' + JSON.stringify(value) + '\\n'
  }

  // 三元表达式：会算出一个值，所以可以直接赋给变量
  const done = false
  const label = done ? '已完成' : '进行中'
  print('三元表达式的结果', label)

  // 嵌套三元：相当于多级 if...else if（两层以上就别嵌套了）
  const score = 75
  print('嵌套三元判等级', score >= 90 ? '优' : score >= 60 ? '及格' : '不及格')

  // && 返回的是「操作数本身」，不是 true/false
  print('true && "面板"', true && '面板')
  print('false && "面板"（返回 false）', false && '面板')
  print('0 && "面板"（返回 0，React 会渲染出来！）', 0 && '面板')

  // || 返回第一个真值，常用来兜底
  print('"" || "匿名"', '' || '匿名')
  print('"小明" || "匿名"', '小明' || '匿名')

  // 短路：左边决定了结果，右边就不会执行
  let ran = false
  const mark = () => { ran = true; return '执行了' }
  false && mark()
  print('false && mark() 后 mark 执行了吗', ran)

  // 模拟 React 条件渲染的两种写法，看它们返回什么
  const list = []
  print('list.length && "有数据"（返回 0）', list.length && '有数据')
  print('list.length > 0 && "有数据"（返回 false）', list.length > 0 && '有数据')
  // React 会渲染 0，但不会渲染 false / null / undefined —— 所以要写成 > 0
  out.textContent += '\\n结论：把长度、数量比较成布尔值，再交给 &&\\n'
</script>`,
          },
          {
            type: 'table',
            title: '4. 条件写法怎么选',
            headers: ['场景', '推荐写法', '说明'],
            rows: [
              ['两种结果二选一', '条件 ? A : B', '表达式，能放进 JSX 和赋值'],
              ['只有满足才显示', '条件 && A', '不满足时得到 false，React 不渲染'],
              ['给默认值（字符串）', 'value || "默认"', '注意 0 和空串会被顶掉'],
              ['给默认值（数字/布尔）', 'value ?? 默认', '只在 null/undefined 时兜底'],
              ['多分支复杂逻辑', '函数里用 if / return', '别硬塞三元，可读性优先'],
              ['多值对应（状态映射）', '对象查表 map[status]', '比一长串三元清爽'],
              ['JSX 里判断数量', '{count > 0 && ...}', '绝不能写 {count && ...}'],
            ],
          },
          {
            type: 'text',
            title: '5. for...of 与 for...in：一字之差，用途完全不同',
            body: '**`for...of`（遍历「值」，给数组用）**：\n\n`for (const item of arr) { ... }` —— `item` 是每一项的值。\n\n还能配合解构和 `entries()` 拿下标：`for (const [i, item] of arr.entries())`。\n\n**`for...in`（遍历「键」，给对象用）**：\n\n`for (const key in obj) { ... }` —— `key` 是属性名（字符串）。\n\n**为什么不能用 `for...in` 遍历数组？** 两个原因：拿到的下标是**字符串** `"0"`、`"1"`（拼接时容易出错），而且它会连原型链上的可枚举属性一起遍历出来。遍历数组请用 `for...of`、`forEach` 或 `map`。\n\n实践中更推荐遍历对象用 `Object.keys(obj)` / `Object.entries(obj)` 再配数组方法，比 `for...in` 更安全清楚。\n\n**三种「循环」的选择**：\n\n- 要得到新数组 → `map`\n- 要筛选 → `filter`\n- 只是循环做事（打印、累加到外部变量）→ `for...of` 或 `forEach`\n- 需要中途跳出 → **必须用 `for...of`**（`forEach` / `map` 里的 `break` 是语法错，`return` 只能跳过当前这一项，跳不出循环）',
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '6. 动手跑一跑：for...of vs for...in vs forEach',
            body: `<!-- 结果显示区 -->
<pre id="out" style="margin:0;font:13px/1.7 ui-monospace,monospace;white-space:pre-wrap;"></pre>

<script>
  // 拿到结果显示区节点
  const out = document.getElementById('out')
  // 打印函数
  const print = (text) => { out.textContent += text + '\\n' }

  // 一个数组和一个对象，分别演示两种循环
  const fruits = ['苹果', '香蕉', '橙子']
  const user = { name: '小明', age: 18, city: '上海' }

  // for...of 遍历数组：拿到的是每一项的「值」
  print('【for...of 遍历数组的值】')
  for (const fruit of fruits) {
    print('  值：' + fruit)
  }

  // for...of + entries() + 数组解构：同时拿下标和值
  print('【for...of 同时拿下标】')
  for (const [i, fruit] of fruits.entries()) {
    print('  下标 ' + i + ' → ' + fruit)
  }

  // for...in 遍历数组：拿到的是「字符串下标」，容易出错，不推荐
  print('【for...in 遍历数组（不推荐）】')
  for (const i in fruits) {
    // 注意 i 是字符串，所以 i + 1 会变成拼接："0" + 1 = "01"
    print('  下标 ' + i + '（类型：' + typeof i + '），i + 1 = ' + (i + 1))
  }

  // for...in 的正确战场：遍历对象的属性名
  print('【for...in 遍历对象的键】')
  for (const key in user) {
    print('  ' + key + ' = ' + user[key])
  }

  // 更推荐的对象遍历：Object.entries + for...of + 解构
  print('【Object.entries 更清楚】')
  for (const [key, value] of Object.entries(user)) {
    print('  ' + key + ' = ' + value)
  }

  // 需要中途跳出时只能用 for...of：forEach 里没法 break
  print('【中途 break：找到香蕉就停】')
  for (const fruit of fruits) {
    if (fruit === '香蕉') { print('  找到了，break'); break }
    print('  看过了：' + fruit)
  }
</script>`,
          },
          {
            type: 'code',
            title: '7. 对照 React：JSX 里的四种条件渲染',
            language: 'jsx',
            body: `function Dashboard({ user, list, status }) {
  // 1）复杂分支放在 return 之前用 if，提前 return —— 最清晰的写法
  if (!user) {
    return <p>请先登录</p>
  }
  if (status === 'loading') {
    return <p>加载中…</p>
  }

  // 状态映射：多值对应时用对象查表，比一长串三元好读
  const statusText = {
    idle: '待开始',
    loading: '加载中',
    error: '出错了',
    success: '完成',
  }[status] ?? '未知状态'

  return (
    <div>
      {/* 2）二选一：三元表达式 */}
      {user.isVip ? <VipBadge /> : <span>普通用户</span>}

      {/* 3）只有一个分支：&& 短路 */}
      {/*    注意必须写成 length > 0，不能写 list.length &&（0 会被渲染出来） */}
      {list.length > 0 && <p>共 {list.length} 条</p>}

      {/* 空状态也用 && ，两个 && 组合出「有则显示列表，无则显示提示」 */}
      {list.length === 0 && <p>暂无数据</p>}

      {/* 4）列表渲染：map + key（不要用 forEach，它不返回数组） */}
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {/* 三元也能用在属性和样式上 */}
            <span style={{ color: item.done ? '#999' : '#333' }}>{item.text}</span>
          </li>
        ))}
      </ul>

      <p>状态：{statusText}</p>
    </div>
  )
}`,
          },
          {
            type: 'list',
            title: '8. 小白易错清单',
            ordered: true,
            items: [
              '在 JSX 的 {} 里写 if 语句——{} 只能放表达式，要用三元或提前 return',
              '写 {count && <div/>} 导致页面出现一个 0——改成 {count > 0 && <div/>}',
              '用 for...in 遍历数组，拿到字符串下标后做加法变成了拼接',
              '在 forEach / map 里写 break——语法错误；需要跳出请用 for...of',
              '在 map 回调里写 return 以为能跳出循环——那只是结束这一项的回调',
              '三元嵌套三四层，自己第二天都读不懂——改用 if 提前 return 或对象查表',
            ],
          },
          {
            type: 'tip',
            title: '本节小结',
            body: '三元是「会返回值的 if」，所以能放进 JSX；单分支用 `条件 && 内容`，但数量判断一定写 `> 0`。数组用 `for...of` / `map`，对象用 `Object.entries`；要 `break` 只能用 `for...of`。',
          },
        ],
      },
    },
    {
      id: 'js-modules',
      title: '模块化：import / export 把代码拆成文件',
      summary:
        '默认导出、命名导出、混合与重命名；对照本项目 lessons.js、组件文件的真实写法',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '**一个文件就是一个模块**：想给别人用的东西必须 `export`，别人要用就 `import`。`export default` 一个文件只能有一个（导入时名字随你起），`export const` 可以有很多个（导入时名字必须对上，要写花括号）。',
          },
          {
            type: 'text',
            title: '1. 为什么需要模块？',
            body: '如果所有代码写在一个文件里，几千行之后没人敢改：函数名会撞车，谁用了谁没用完全看不出来。\n\n模块化就是「一个文件干一件事」，然后互相引用：\n\n- `Card.js` 只负责卡片组件\n- `03-js-basics.js` 只负责这一章的数据\n- `lessons.js` 负责把所有章节汇总起来\n\n关键规则：**模块里的东西默认是私有的。** 你在 `a.js` 里写 `const secret = 1`，`b.js` 里根本看不到它，除非 `a.js` 主动 `export`。这和 `<script>` 时代「所有变量都挤在一个全局空间里」完全不同，也是现代前端不再担心变量撞名的原因。',
          },
          {
            type: 'text',
            title: '2. 默认导出：export default',
            body: '写法：`export default 某个东西`。\n\n- **一个文件最多只能有一个默认导出**（写第二个直接报错）\n- 导入时**不写花括号**，而且**名字随便起**：`import 随便什么名字 from "./Card"`\n- 语义是「这个文件的主角就是它」\n\n本项目的约定就是这样：每个章节数据文件最后都写 `export default jsBasics`，每个组件文件最后都写 `export default Card`。所以 `import jsx from \'./lessons/05-jsx\'` 这一行里的 `jsx` 只是本地起的名字，和被导入文件里那个变量叫什么无关。\n\n常见两种写法：\n\n- 先声明再导出：`const Card = () => {}` 然后 `export default Card`（本项目风格，好读）\n- 声明时直接导出：`export default function Card() {}`（少一行，也很常见）',
          },
          {
            type: 'text',
            title: '3. 命名导出：export const / export function',
            body: '写法：在声明前面加 `export`，或者最后统一写一个导出清单。\n\n- **一个文件可以有任意多个命名导出**\n- 导入时**必须写花括号**，而且**名字必须一模一样**：`import { useState } from \'react\'`\n- 语义是「这个文件提供一组工具」\n\n你天天写的 `import { useState, useEffect } from \'react\'` 就是命名导入——`useState` 这个名字不能改（想改要用 `as` 重命名）。\n\n统一导出清单的写法也很常见，好处是「这个文件对外提供什么」一目了然：\n\n`export { formatDate, parseQuery, sleep }`',
          },
          {
            type: 'table',
            title: '4. 导出与导入写法对照表',
            headers: ['导出侧写法', '对应的导入写法', '名字能不能改'],
            rows: [
              ['export default jsBasics', "import 任意名 from './file'", '能改，随便起'],
              ['export default function Card() {}', "import Card from './Card'", '能改'],
              ['export const version = 1', "import { version } from './file'", '不能改，除非用 as'],
              ['export function double(n) {}', "import { double } from './file'", '不能改'],
              ['export { a, b, c }', "import { a, b } from './file'", '按名字取，可以只取一部分'],
              ['默认 + 命名混合', "import Card, { CardTitle } from './Card'", '默认在前，命名在花括号里'],
              ['export const a = 1（想改名导入）', "import { a as alpha } from './file'", 'as 重命名'],
              ['（全部都要）', "import * as utils from './utils'", '打包成一个对象 utils.xxx'],
            ],
            note: '记忆口诀：**有花括号 = 按名字取（名字要对）；没花括号 = 取默认那一份（名字随你起）**。',
          },
          {
            type: 'code',
            title: '5. 静态对照：一个工具文件的完整导出/导入',
            language: 'js',
            body: `// ===== 文件 A：utils.js（对外提供工具的模块）=====

// 没有 export 的东西是模块私有的，外面拿不到
const SECRET = 'abc123'

// 命名导出：可以写很多个，导入时名字必须对上
export const version = '1.0.0'

export function double(n) {
  return n * 2
}

// 也可以先声明、最后统一列一个导出清单（对外接口一目了然）
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
function formatMoney(n) {
  return '¥' + n.toFixed(2)
}
export { sleep, formatMoney }

// 默认导出：一个文件最多一个，表示「本文件的主角」
const config = { name: '工具箱', version }
export default config


// ===== 文件 B：main.js（使用上面那个模块）=====

// 默认导出不写花括号，名字随便起（这里起名 myConfig）
import myConfig from './utils'

// 命名导出必须写花括号，名字要一模一样
import { double, sleep } from './utils'

// 混合写法：默认在前，命名在花括号里，一行搞定
import cfg, { version, formatMoney as money } from './utils'
//            ↑ 名字要对    ↑ as 可以在导入时重命名

// 想一次拿全部命名导出，可以打包成一个对象
import * as utils from './utils'

console.log(myConfig.name)   // '工具箱'（默认导出）
console.log(double(21))      // 42（命名导出）
console.log(money(9.5))      // '¥9.50'（重命名后的名字）
console.log(utils.version)   // '1.0.0'（通过对象访问）
// console.log(SECRET)       // ❌ 报错：utils.js 里没有 export 它`,
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '6. 动手跑一跑：亲眼看到默认导出和命名导出的区别',
            body: `<!-- 结果显示区：JS 算出来的东西都打印到这里 -->
<pre id="out" style="margin:0;font:13px/1.7 ui-monospace,monospace;"></pre>

<!-- type="module" 才能使用 import 语法 -->
<script type="module">
  const out = document.getElementById('out')            // 拿到显示区节点
  const print = (t) => { out.textContent += t + '\\n' }  // 打印一行结果

  // 用字符串「手写一个模块文件」的内容，方便在这里现场演示
  const code = [
    'const PI = 3.14',                                        // 私有变量：没 export
    'export default function area(r) { return PI * r * r }',  // 默认导出：只能一个
    'export const version = "1.0"',                           // 命名导出
    'export function double(n) { return n * 2 }',             // 命名导出
  ].join('\\n')

  // 把这段字符串变成一个真实可被 import 的文件地址
  const url = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }))

  try {
    // 动态 import：等价于 import area, { version, double } from './math.js'
    const mod = await import(url)
    // 默认导出挂在 .default 上（平时写 import area from '...' 拿的就是它）
    print('默认导出 area(2)：' + mod.default(2))
    // 命名导出按名字取，名字必须和导出时一致
    print('命名导出 version：' + mod.version)
    print('命名导出 double(21)：' + mod.double(21))
    // 模块里没 export 的东西，外面永远拿不到 → undefined
    print('没导出的 PI：' + mod.PI)
  } catch (e) {
    // 万一浏览器不支持动态 import，也把原因打印出来而不是白屏
    print('当前环境不支持动态 import：' + e.message)
  }
</script>`,
          },
          {
            type: 'code',
            title: '7. 对照本项目：真实文件是怎么写的',
            language: 'js',
            body: `// ===== src/data/lessons/03-js-basics.js（你正在读的这个文件）=====
const jsBasics = {
  id: 'js-basics',
  title: 'JavaScript / ES6 必备语法',
  items: [/* ...省略... */],
}
// 默认导出这一章的数据对象：文件的主角就是它
export default jsBasics


// ===== src/data/lessons.js（把所有章节汇总）=====
// 每一行都是「默认导入」，所以不写花括号，名字由这里自己起
import htmlTags from './lessons/00-html-tags'
import jsx from './lessons/02-jsx'
import jsBasics from './lessons/03-js-basics'   // 名字随便起，写 abc 也能跑
import state from './lessons/04-state'

// 汇总成数组，页面按 order 排序后渲染目录
const lessons = [htmlTags, jsx, jsBasics, state]

export default lessons


// ===== src/components/LiveDemo/index.js（组件文件）=====
// 从 react 包里按名字取多个 Hook：命名导入，必须写花括号
import { useEffect, useMemo, useRef, useState } from 'react'
// 从自己项目里默认导入子组件：名字随便起
import ReactPreview from './ReactPreview'
// 导入 CSS 文件：没有名字，只是「让打包工具把这个样式带上」
import './LiveDemo.css'

function LiveDemo({ title, language = 'html' }) {
  return null // 省略实现
}

// 默认导出组件，别的文件才能 import LiveDemo from './LiveDemo'
export default LiveDemo`,
          },
          {
            type: 'text',
            title: '8. 三个必须知道的细节',
            body: '**① 路径要写对。** 以 `./` 或 `../` 开头表示「我项目里的文件」；不带 `./` 的（如 `react`、`react-dom`）表示「从 node_modules 里的第三方包」。`./Card` 可以省略 `.js` 后缀，这是打包工具帮你补的。\n\n**② `import` 会被提升到最顶上执行。** 所有 `import` 语句一律写在文件最前面，不要写在 `if` 里（想按条件加载要用函数式的 `import()`，它返回 Promise，就是上面 Demo 用的写法）。\n\n**③ 同一个模块只会执行一次。** 十个文件都 `import lessons from \'./lessons\'`，`lessons.js` 也只跑一遍，大家共享同一份结果。这就是为什么模块顶层适合放常量、配置，不适合放「每次调用都要变」的东西。',
          },
          {
            type: 'list',
            title: '9. 小白易错清单',
            ordered: true,
            items: [
              "默认导出却写了花括号：`import { Card } from './Card'` 拿到 undefined —— 去掉花括号",
              "命名导出忘了花括号：`import useState from 'react'` 是错的 —— 要写 `import { useState } from 'react'`",
              '一个文件写两个 `export default` —— 直接报错，默认导出只能一个',
              '命名导入时随手改了名字 —— 名字必须一致，想改用 `import { a as b }`',
              "路径漏了 `./`：`import Card from 'Card'` 会被当成第三方包去 node_modules 里找",
              '在函数里写 `import xxx from` —— 静态 `import` 只能写在模块顶层',
            ],
          },
          {
            type: 'tip',
            title: '本节小结',
            body: '**没花括号 = 取默认那份，名字随你起；有花括号 = 按名字取，名字必须对。** 一个文件一个 `export default` + 任意多个 `export const`。本项目里章节数据、组件都用默认导出，`react` 的 Hook 都用命名导入——你以后每天都在重复这两件事。',
          },
        ],
      },
    },
    {
      id: 'js-promise',
      title: '异步一：回调 → Promise',
      summary:
        '什么叫异步、回调地狱长什么样、new Promise 三种状态、then/catch/finally 链式调用',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '**Promise 是一张「结果稍后给你」的取货凭证。** 拿到凭证先干别的，货到了用 `.then(结果 => {})` 领取，出错了用 `.catch(错误 => {})` 兜住。它的存在就是为了把层层嵌套的回调拉平成一条链。',
          },
          {
            type: 'text',
            title: '1. 先搞懂「异步」是什么意思',
            body: 'JavaScript 只有一个线程，同一时刻只能干一件事。如果「请求服务器数据」要等 1 秒，期间把线程占死，页面就会卡住不能点、不能滚。\n\n所以耗时的事情都设计成**异步**：先登记「等好了叫我」，然后立刻往下执行；等结果回来了，再回头执行你登记的那段代码。\n\n典型的异步操作：\n\n- 网络请求（`fetch`）\n- 定时器（`setTimeout` / `setInterval`）\n- 读文件、读数据库\n- 用户交互事件（点击、输入）\n\n判断标准很简单：**这行代码的结果不是立刻能拿到的，就是异步。** 异步代码的执行顺序和你写的顺序不一样，这是初学者最容易懵的地方。',
          },
          {
            type: 'code',
            title: '2. 感受一下：异步代码不按书写顺序执行',
            language: 'js',
            body: `console.log('1 开始')

// setTimeout 是异步：登记「1 秒后执行这个函数」，然后立刻往下走
setTimeout(() => {
  console.log('3 一秒后才执行')
}, 1000)

// 即使延迟写 0 毫秒，也要等「当前这一轮同步代码」全部跑完才轮到它
setTimeout(() => {
  console.log('4 就算 0 毫秒也排在同步代码后面')
}, 0)

console.log('2 结束')

// 实际打印顺序：1 开始 → 2 结束 → 4 就算 0 毫秒…… → 3 一秒后才执行
// 结论：异步任务被「登记」起来，等同步代码跑完才依次执行`,
          },
          {
            type: 'text',
            title: '3. 老办法：回调函数（callback）',
            body: '在 Promise 出现之前，「等好了叫我」靠的是**把函数当参数传进去**，这个被传进去的函数叫回调函数。\n\n比如 `setTimeout(() => {...}, 1000)`，那个箭头函数就是回调——「一秒后请回头调用我」。\n\n回调本身没问题，麻烦在于**有先后依赖的多步操作**：必须先登录、拿到用户 id 再查订单、拿到订单再查物流。每一步都要等上一步的结果，于是回调套回调套回调，缩进越来越深，形成臭名昭著的**回调地狱（callback hell）**。\n\n回调地狱的三个具体痛点：\n\n- **横向发展**：代码往右缩进，读到第四层已经看不清括号配对\n- **错误处理重复**：每一层都要写一遍 `if (err) return ...`\n- **不好拆分复用**：中间某一步想抽出去单独用，牵一发动全身',
          },
          {
            type: 'code',
            title: '4. 回调地狱长什么样（体会一下就好，不用会写）',
            language: 'js',
            body: `// 老式回调风格：每个函数最后一个参数是「完成后调用的回调」
// 约定 callback(错误, 结果)：第一个参数是错误，没错就传 null

login('小明', function (err, user) {
  if (err) return showError(err)              // 第 1 层的错误处理
  getOrders(user.id, function (err, orders) {
    if (err) return showError(err)            // 第 2 层又写一遍
    getShipping(orders[0].id, function (err, shipping) {
      if (err) return showError(err)          // 第 3 层再写一遍
      getDriver(shipping.driverId, function (err, driver) {
        if (err) return showError(err)        // 第 4 层……
        // 真正想干的事被埋在最深处，缩进已经到屏幕右边了
        render(user, orders, shipping, driver)
      })
    })
  })
})

// 同样的逻辑用 Promise 链写，变成一条竖着往下的直线：
login('小明')
  .then((user) => getOrders(user.id))         // 上一步结果作为下一步输入
  .then((orders) => getShipping(orders[0].id))
  .then((shipping) => getDriver(shipping.driverId))
  .then((driver) => render(driver))
  .catch(showError)                            // 错误处理只写一次，全链共用`,
          },
          {
            type: 'text',
            title: '5. Promise 的三种状态（只会变一次）',
            body: '一个 Promise 一定处于以下三种状态之一：\n\n- **pending（等待中）**：刚创建，结果还没出来\n- **fulfilled（已成功）**：拿到了结果，通过 `resolve(值)` 进入\n- **rejected（已失败）**：出错了，通过 `reject(错误)` 进入\n\n**关键规则：状态只能从 pending 变一次，变完就永久定格。** 已经 `resolve` 过再调 `reject` 完全无效——所以你不用担心「结果被改来改去」。\n\n创建一个 Promise 的标准写法：\n\n`const p = new Promise((resolve, reject) => { /* 干活，成功调 resolve，失败调 reject */ })`\n\n里面那个函数会**立刻同步执行**（这点常被误解），只是 `resolve` 可能在很久以后才被调用。',
          },
          {
            type: 'code',
            title: '6. new Promise 基本写法（逐行注释）',
            language: 'js',
            body: `// new Promise 接收一个函数，参数是 resolve（成功时调）和 reject（失败时调）
const p = new Promise((resolve, reject) => {
  // 这段代码会「立刻」执行，用来启动耗时任务
  setTimeout(() => {
    const ok = Math.random() > 0.5      // 模拟成败随机
    if (ok) {
      resolve('数据拿到了')              // 成功：把结果交出去，状态变 fulfilled
    } else {
      reject(new Error('网络错误'))      // 失败：把错误交出去，状态变 rejected
    }
  }, 500)
})

// 领取结果：then 拿成功值，catch 拿错误，finally 无论成败都跑
p
  .then((data) => {
    console.log('成功：', data)          // data 就是 resolve 传出来的值
  })
  .catch((err) => {
    console.log('失败：', err.message)   // err 就是 reject 传出来的错误
  })
  .finally(() => {
    console.log('无论成败都会执行（适合关掉 loading）')
  })

// 两个快捷方式：直接造一个已完成 / 已失败的 Promise（写测试和兜底时常用）
const okPromise = Promise.resolve(42)
const badPromise = Promise.reject(new Error('直接失败'))`,
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '7. 动手跑一跑：Promise 链按顺序执行，结果一环传一环',
            body: `<!-- 点按钮才开始跑，方便观察「先后顺序」 -->
<button onclick="run()">开始下单流程（每步 500ms）</button>
<!-- 结果显示区：每一步都打印一行 -->
<pre id="out" style="margin:8px 0 0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  const out = document.getElementById('out')             // 拿到显示区节点
  const print = (t) => { out.textContent += t + '\\n' }   // 打印一行结果

  // delay：返回一个「ms 毫秒后才成功」的 Promise，用来模拟网络请求
  const delay = (ms, value) =>
    new Promise((resolve) => setTimeout(() => resolve(value), ms))

  function run() {
    out.textContent = ''                    // 每次点击先清空上次结果
    print('第 0 步：发起登录（后面每步都要等上一步）')

    // 第 1 步：登录，500ms 后 resolve 一个用户对象
    delay(500, { id: 7, name: '小明' })
      .then((user) => {
        // then 的参数就是上一环 resolve 出来的值
        print('第 1 步：登录成功，用户 id = ' + user.id)
        // 在 then 里 return 一个新 Promise，下一个 then 会等它完成
        return delay(500, ['订单A', '订单B'])
      })
      .then((orders) => {
        print('第 2 步：查到订单 ' + orders.join('、'))
        // 也可以 return 普通值，它会被自动包成成功的 Promise
        return orders.length
      })
      .then((count) => {
        print('第 3 步：订单数量 ' + count + '（普通值也能往下传）')
      })
      .finally(() => {
        // finally 无论成败都会执行，适合关掉 loading
        print('第 4 步：流程结束（finally 一定执行）')
      })

    print('（这行是同步代码，会先于上面所有 then 打印出来）')
  }
</script>`,
          },
          {
            type: 'table',
            title: '8. then / catch / finally 速查',
            headers: ['方法', '什么时候执行', '回调参数', '返回值'],
            rows: [
              ['.then(fn)', '前一环成功时', '上一环 resolve 出来的值', '新的 Promise（可继续链）'],
              ['.then(fn1, fn2)', '成功走 fn1，失败走 fn2', '值 / 错误', '新的 Promise'],
              ['.catch(fn)', '链条上任意一环失败', '错误对象 err', '新的 Promise（错误被消化）'],
              ['.finally(fn)', '成功失败都执行', '没有参数', '透传前面的结果'],
              ['Promise.resolve(v)', '立刻成功', '—', '已成功的 Promise'],
              ['Promise.reject(e)', '立刻失败', '—', '已失败的 Promise'],
            ],
            note: '每个 `.then()` 都返回**新的** Promise，这就是能一直 `.then().then()` 接下去的原因。',
          },
          {
            type: 'text',
            title: '9. 链式调用的两条铁律',
            body: '**铁律一：`then` 里 `return` 什么，下一个 `then` 就收到什么。**\n\n- `return 普通值` → 下一环收到这个值\n- `return 另一个 Promise` → 下一环**等它完成**，收到它的结果（这是把嵌套拉平的关键）\n- **什么都不 return** → 下一环收到 `undefined`（新手最常见的「怎么拿不到数据」就是漏了 `return`）\n\n**铁律二：错误会一路往下冒，直到遇到 `catch`。**\n\n中间任何一环抛错或 `reject`，后面的 `then` 会被跳过，直接跳到最近的 `.catch()`。所以整条链只需在末尾写一个 `catch` 就够了，不用每步都写。\n\n补充提醒：`catch` 之后链条会「恢复正常」，还能继续接 `then`——因为错误已经被处理掉了。',
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '10. 动手跑一跑：失败会跳过中间的 then，直奔 catch',
            body: `<!-- 两个按钮：分别演示成功和失败两条路径 -->
<button onclick="run(true)">走成功路径</button>
<button onclick="run(false)">走失败路径</button>
<!-- 结果显示区 -->
<pre id="out" style="margin:8px 0 0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  const out = document.getElementById('out')             // 显示区节点
  const print = (t) => { out.textContent += t + '\\n' }   // 打印一行

  // 传 true 就 resolve，传 false 就 reject，用来模拟请求成败
  const request = (ok) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (ok) resolve({ name: '小明' })        // 成功：交出数据
        else reject(new Error('401 未登录'))     // 失败：交出错误
      }, 400)
    })

  function run(ok) {
    out.textContent = ''                          // 清空上次结果
    print('开始请求……（ok = ' + ok + '）')

    request(ok)
      .then((user) => {
        // 只有成功才会进这里；失败时这一整段被跳过
        print('第 1 个 then：拿到用户 ' + user.name)
        return user.name.length                   // return 的值传给下一个 then
      })
      .then((len) => {
        // 失败路径下这里同样不会执行
        print('第 2 个 then：名字长度 ' + len)
      })
      .catch((err) => {
        // 链条上任意一环出错都会跳到这里，整条链只需一个 catch
        print('catch 兜住了错误：' + err.message)
      })
      .then(() => {
        // catch 之后错误已被处理，链条恢复正常，还能继续接 then
        print('catch 后面的 then 依然会执行')
      })
      .finally(() => {
        print('finally：关掉 loading（成败都执行）')
      })
  }
</script>`,
          },
          {
            type: 'list',
            title: '11. 小白易错清单',
            ordered: true,
            items: [
              '在 `then` 里忘了 `return`，导致下一个 `then` 拿到 `undefined`',
              '把 `.then(fn())` 写成了立刻调用 —— 应该传函数本身：`.then(fn)` 或 `.then(() => fn())`',
              '整条链没有 `.catch()`，请求失败后页面 loading 转到天荒地老',
              '以为 `new Promise` 里的代码是异步的 —— 它是**立刻同步执行**的，只有 `resolve` 的时机是异步',
              '在 `new Promise` 里 `resolve` 之后还写逻辑并以为链条会等它 —— 状态只变一次，后面的 `resolve` 无效',
              '想「等一下再执行」却写成 `setTimeout(fn(), 1000)` —— 少了箭头函数，`fn` 被立刻执行了',
            ],
          },
          {
            type: 'tip',
            title: '本节小结',
            body: 'Promise = 取货凭证，三种状态只变一次。`.then()` 领结果、`.catch()` 兜错误、`.finally()` 收尾；`then` 里 `return` 什么下一环就拿什么，`return` 一个 Promise 就会被自动等待。下一节的 `async/await` 就是把这条链写得更像同步代码——但底层还是 Promise，所以这节必须先懂。',
          },
        ],
      },
    },
    {
      id: 'js-async-await',
      title: '异步二：async / await 与 try/catch、Promise.all',
      summary:
        '把 Promise 链写成同步风格；try/catch 抓错；串行 vs 并发；fetch 请求接口的真实写法',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '**`await` = 在这里等一下，把「取货凭证」换成「货」。** 函数上写 `async`，里面就能用 `await`；错误用 `try/catch` 抓。它只是 Promise 的化妆品，底层还是上一节那套东西。',
          },
          {
            type: 'text',
            title: '1. async / await 解决什么问题？',
            body: 'Promise 链已经比回调地狱好很多，但还是有两个别扭的地方：\n\n- 每一步都要包一层 `.then(res => {...})`，变量都被关在回调里，想同时用第一步和第三步的结果得靠层层传递\n- 想加个 `if` 判断、想写循环，读起来还是绕\n\n`async/await` 让异步代码**长得像同步代码**：\n\n- `const user = await login()` —— 一行拿到结果，变量就在当前作用域，随便用\n- 上下两行天然就是「先后顺序」，不用理解链条\n- 错误处理直接用你已经熟悉的 `try/catch`\n\n**重点：它没有新增任何能力，只是写法更顺。** `await` 后面等的东西必须是 Promise（不是 Promise 也会被自动包一层）。',
          },
          {
            type: 'code',
            title: '2. 同一段逻辑：then 版 vs async/await 版',
            language: 'js',
            body: `// ===== 写法 A：Promise 链 =====
function loadDataThen() {
  return login('小明')
    .then((user) => getOrders(user.id))     // user 只在这个回调里能用
    .then((orders) => {
      // 这里已经拿不到上面的 user 了，想用得一路往下传，很别扭
      return getShipping(orders[0].id)
    })
    .then((shipping) => {
      console.log('物流：', shipping)
    })
    .catch((err) => {
      console.log('出错：', err.message)
    })
}

// ===== 写法 B：async / await（推荐）=====
// 函数前面加 async，函数里才能用 await；async 函数一定返回 Promise
async function loadDataAwait() {
  try {
    const user = await login('小明')            // 等登录完成，直接拿到 user
    const orders = await getOrders(user.id)      // user 在这里照样能用
    const shipping = await getShipping(orders[0].id)
    // 三个变量都在同一个作用域，想怎么组合都行
    console.log('物流：', shipping, '属于', user.name, '共', orders.length, '单')
  } catch (err) {
    // 上面任意一行出错都会跳到这里，和同步代码的 try/catch 一模一样
    console.log('出错：', err.message)
  } finally {
    console.log('收尾：关掉 loading')
  }
}`,
          },
          {
            type: 'text',
            title: '3. 三条使用规则（记死）',
            body: '**规则一：`await` 只能写在 `async` 函数里。** 写在普通函数里直接语法报错。（现代模块的顶层可以直接 `await`，但 React 组件里用不到，先按这条记。）\n\n**规则二：`async` 函数的返回值一定是 Promise。**\n\n`async function f() { return 1 }` 调用后拿到的不是 `1`，而是一个「已成功、值为 1」的 Promise。所以外面还要 `f().then(v => ...)` 或者在另一个 `async` 里 `await f()`。这也解释了新手的困惑：「我明明 return 了对象，为什么打印出来是 Promise？」——因为你忘了 `await`。\n\n**规则三：`await` 会「暂停」当前 async 函数，但不会卡住整个页面。** 暂停期间浏览器照样响应点击、滚动。它只是把这个函数剩下的部分登记为「结果回来后再执行」。\n\n附带提醒：`await` 是**逐行等待**的，写三行 `await` 就是等三次。要同时进行必须用 `Promise.all`（第 8 点讲）。',
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '4. 动手跑一跑：await 让异步代码按顺序往下走',
            body: `<!-- 点按钮触发 async 函数 -->
<button onclick="run()">开始三步流程（每步 500ms）</button>
<!-- 结果显示区 -->
<pre id="out" style="margin:8px 0 0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  const out = document.getElementById('out')             // 显示区节点
  const print = (t) => { out.textContent += t + '\\n' }   // 打印一行

  // delay：ms 毫秒后成功，并把 value 交出去（模拟一次网络请求）
  const delay = (ms, value) =>
    new Promise((resolve) => setTimeout(() => resolve(value), ms))

  // 函数前加 async，内部才能用 await
  async function run() {
    out.textContent = ''                       // 清空上次结果
    print('开始（下面每一行都会等上一行完成）')

    // await：等这个 Promise 完成，并把结果直接赋给 user
    const user = await delay(500, { id: 7, name: '小明' })
    print('拿到用户：' + user.name + '（id=' + user.id + '）')

    // 上一步的 user 在这里照样能用，这就是 await 比 then 顺的地方
    const orders = await delay(500, ['订单A', '订单B'])
    print(user.name + ' 的订单：' + orders.join('、'))

    // 普通值也能 await，会被自动包成成功的 Promise
    const count = await orders.length
    print('订单数量：' + count)

    // async 函数的返回值会被包成 Promise，所以外面要 then / await 才能取
    return count
  }

  // 演示「返回值是 Promise」：直接打印 run() 得到的不是数字
  function showReturn() {
    const result = run()                       // 没有 await，拿到的是 Promise
    print('直接调用 run() 得到：' + result)     // 打印 [object Promise]
    result.then((n) => print('用 then 取出真正的返回值：' + n))
  }
</script>`,
          },
          {
            type: 'text',
            title: '5. 错误处理：try / catch / finally',
            body: '`await` 的 Promise 一旦失败（`reject` 或内部抛错），就等于**在那一行抛出一个异常**。所以处理方式和同步代码完全一致：把可能出错的 `await` 包进 `try { ... }`，用 `catch (err) { ... }` 接住，再用 `finally { ... }` 收尾。\n\n写成一句话就是：`try { const data = await fetchUser() } catch (err) { 显示错误 } finally { 关掉 loading }`。\n\n三个实战建议：\n\n- **`try` 块别包太大**：如果第一步和第三步的错误要给用户看不同提示，就分开写两个 `try`\n- **`finally` 专门放收尾**：`setLoading(false)` 写在 `finally` 里，成功失败都不会漏\n- **不想用 try/catch 时**，可以在末尾挂 `.catch()`：`loadData().catch(showError)`——两种写法可以混用\n\n最危险的写法是**什么都不写**：async 函数里抛出的错误如果没人接，浏览器控制台会报 `Unhandled promise rejection`，而用户只会看到「点了没反应」。',
          },
          {
            type: 'code',
            title: '6. 真实写法：用 fetch 请求接口（这段可以直接抄）',
            language: 'js',
            body: `// fetch 是浏览器自带的请求函数，返回一个 Promise
async function getUser(id) {
  // 第一次 await：等服务器响应「头部」回来，此时还没拿到 body
  const res = await fetch('https://api.example.com/users/' + id)

  // 注意坑：只要服务器有响应，fetch 就算成功；404 / 500 不会自动抛错
  // 必须自己检查 res.ok（状态码 200~299 才是 true）
  if (!res.ok) {
    throw new Error('请求失败，状态码 ' + res.status)
  }

  // 第二次 await：把响应体解析成 JSON，这一步也是异步的
  const data = await res.json()
  return data
}

// 在 React 组件里的典型用法（「常用 Hooks」那一章 useEffect 会细讲）
async function loadUser(id, setUser, setError, setLoading) {
  setLoading(true)          // 开始转圈
  setError('')              // 清掉上次的错误
  try {
    const user = await getUser(id)
    setUser(user)           // 成功：把数据放进 state，界面自动更新
  } catch (err) {
    setError(err.message)   // 失败：把错误文案放进 state，界面显示提示
  } finally {
    setLoading(false)       // 无论成败都要停止转圈，写在 finally 最保险
  }
}

// POST 请求：多传一个配置对象
async function createUser(name) {
  const res = await fetch('https://api.example.com/users', {
    method: 'POST',                                   // 请求方法
    headers: { 'Content-Type': 'application/json' },  // 告诉服务器发的是 JSON
    body: JSON.stringify({ name }),                   // 对象要转成 JSON 字符串
  })
  if (!res.ok) throw new Error('创建失败')
  return res.json()
}`,
          },
          {
            type: 'text',
            title: '7. 串行 vs 并发：Promise.all',
            body: '连续写 `await` 是**串行**（一个一个排队）：\n\n`const a = await taskA()` 然后 `const b = await taskB()` —— 如果两个任务各要 1 秒，总共 2 秒。\n\n但如果它们互不依赖，就该**同时发起**，用 `Promise.all`：\n\n`const [a, b] = await Promise.all([taskA(), taskB()])` —— 总共只要 1 秒。\n\n这里的关键在于：`taskA()` 一被调用就已经开始跑了，`Promise.all` 只是「一起等」。配合数组解构，可以一行取出所有结果。\n\n**什么时候必须串行？** 后一步需要前一步的结果时（先登录拿到 id，才能查这个 id 的订单）。**什么时候该并发？** 几个请求各自独立时（同时拉用户信息、商品列表、公告）。\n\n注意 `Promise.all` 的性格：**一个失败，整体立刻失败**（其余结果就拿不到了）。想要「谁成谁败都告诉我」，用 `Promise.allSettled`。',
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '8. 动手跑一跑：串行 1800ms vs 并发 600ms',
            body: `<!-- 点按钮开始对比：先跑串行版，再跑并发版 -->
<button onclick="runAll()">对比耗时（各 3 个任务，每个 600ms）</button>
<!-- 结果显示区 -->
<pre id="out" style="margin:8px 0 0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  const out = document.getElementById('out')             // 显示区节点
  const print = (t) => { out.textContent += t + '\\n' }   // 打印一行

  // delay：ms 毫秒后把 value 交出去，模拟一个耗时任务
  const delay = (ms, value) =>
    new Promise((resolve) => setTimeout(() => resolve(value), ms))

  // 串行：三个 await 排队等，总耗时 = 600 + 600 + 600
  async function serial() {
    const t0 = Date.now()                 // 记下开始时间
    const a = await delay(600, 'A')       // 等第一个完成
    const b = await delay(600, 'B')       // 再等第二个
    const c = await delay(600, 'C')       // 再等第三个
    print('串行：' + [a, b, c].join(',') + '，耗时约 ' + (Date.now() - t0) + 'ms')
  }

  // 并发：三个任务同时发起，用 Promise.all 一起等
  async function parallel() {
    const t0 = Date.now()                 // 记下开始时间
    const list = await Promise.all([      // 数组里的 Promise 同时开始跑
      delay(600, 'A'),
      delay(600, 'B'),
      delay(600, 'C'),
    ])
    print('并发：' + list.join(',') + '，耗时约 ' + (Date.now() - t0) + 'ms')
  }

  // 依次跑两种写法，方便直接对比耗时数字
  async function runAll() {
    out.textContent = ''                  // 清空上次结果
    print('开始……串行版要 1800ms 左右，请稍等')
    await serial()                        // 先看串行
    await parallel()                      // 再看并发
    print('结论：互不依赖的请求一定要用 Promise.all')
  }
</script>`,
          },
          {
            type: 'table',
            title: '9. Promise 组合方法速查',
            headers: ['写法', '什么时候完成', '拿到什么', '典型场景'],
            rows: [
              ['await Promise.all([a, b])', '全部成功；有一个失败就立刻失败', '结果数组（顺序和传入一致）', '同时拉几个互不依赖的接口'],
              ['await Promise.allSettled([a, b])', '全部有结果（不管成败）', '`[{status, value/reason}]`', '批量操作，要逐个统计成败'],
              ['await Promise.race([a, b])', '第一个有结果的（成功或失败）', '最快那个的结果', '接口超时控制'],
              ['await Promise.any([a, b])', '第一个成功的', '最快成功的那个值', '多个备用源，谁先成功用谁'],
              ['连续写多个 await', '一个一个排队', '各自的结果', '后一步依赖前一步'],
            ],
            note: '`Promise.all` 是日常使用频率最高的，先把它练熟；其余三个知道有这回事，用到再查。',
          },
          {
            type: 'list',
            title: '10. 小白易错清单',
            ordered: true,
            items: [
              '忘了写 `await`，拿到一个 `Promise` 对象却拿它当数据用 —— 打印出 `[object Promise]` 就是这个原因',
              '在普通函数里写 `await` —— 必须给函数加 `async`',
              '在 `forEach` 里写 `await` 以为会按顺序等 —— `forEach` 不认 `await`，要用 `for...of`',
              '明明互不依赖却连续 `await`，白等好几倍时间 —— 改用 `Promise.all`',
              '以为 `fetch` 遇到 404 会抛错 —— 不会，必须自己判断 `res.ok`',
              '`setLoading(false)` 只写在 `try` 里 —— 一出错就永远转圈，应该写在 `finally`',
              'async 函数里的错误没人 `catch` —— 控制台报 `Unhandled promise rejection`，用户只觉得「点了没反应」',
            ],
          },
          {
            type: 'tip',
            title: '本节小结',
            body: '`async` 标记函数、`await` 等结果、`try/catch/finally` 管错误和收尾。`async` 函数返回的永远是 Promise。**依赖前一步就串行 `await`，互不依赖就 `Promise.all` 并发。** `fetch` 要自己检查 `res.ok`，`setLoading(false)` 要写在 `finally`——这两条能省掉你未来一半的 bug。',
          },
        ],
      },
    },
    {
      id: 'js-class',
      title: '类与 this 简介（了解即可）',
      summary:
        'class / constructor / extends 的最小认知；this 为什么会丢；老教程和错误边界组件为什么还在用它',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '**你写业务几乎用不到 `class`，但必须看得懂。** 因为 2019 年以前的 React 教程全是类组件，而且直到今天「错误边界」还只能用类组件写。核心只有三件事：`class` 是模板、`constructor` 是初始化、`this` 是「当前这个实例」。',
          },
          {
            type: 'text',
            title: '1. class 是什么？为什么本章要提它？',
            body: '`class`（类）是「造对象的模板」。写一次模板，就能造出很多个结构相同、数据不同的对象（叫**实例**）。\n\n比如 `class Dog` 是模板，`new Dog(\'旺财\')` 和 `new Dog(\'小黑\')` 是两个实例，各有自己的 `name`。\n\n你在 React 里会撞见它的三个场合：\n\n- **老教程 / 老项目**：`class Counter extends React.Component`，用 `this.state` 和 `this.setState()`\n- **错误边界（ErrorBoundary）**：需要 `componentDidCatch` 生命周期，函数组件至今没有等价 Hook，只能写类\n- **面试和报错信息**：`Cannot read property \'setState\' of undefined` 这类经典报错，根源就是 `this` 丢了\n\n**学习目标定在「读得懂、能照抄一个错误边界」就够**，不需要用它写业务。',
          },
          {
            type: 'code',
            title: '2. class 的最小完整写法（逐行注释）',
            language: 'js',
            body: `// class 是「造对象的模板」，类名习惯用大驼峰
class Dog {
  // constructor：new 的时候自动执行，用来接收参数、初始化数据
  constructor(name, age) {
    this.name = name    // this 指向「正在被创建的这个实例」
    this.age = age      // 给实例挂上属性
  }

  // 方法：写在 class 里的函数，不用写 function 关键字，方法之间不加逗号
  bark() {
    // 方法里用 this.xxx 读实例自己的数据
    return this.name + ' 说：汪！'
  }

  // 方法可以调用同一个实例的其它方法
  intro() {
    return this.bark() + ' 我 ' + this.age + ' 岁了'
  }

  // get 定义「看起来像属性」的计算值：读的时候写 dog.isPuppy，不加括号
  get isPuppy() {
    return this.age < 1
  }

  // static：挂在类本身上的方法，不需要 new 就能用，实例反而调不到
  static create(name) {
    return new Dog(name, 1)
  }
}

// new：按模板造出一个实例，参数传给 constructor
const dog1 = new Dog('旺财', 3)
const dog2 = new Dog('小黑', 0.5)   // 两个实例的数据互不影响

console.log(dog1.bark())      // '旺财 说：汪！'
console.log(dog2.intro())     // '小黑 说：汪！ 我 0.5 岁了'
console.log(dog2.isPuppy)     // true（get 定义的，不加括号）
console.log(Dog.create('豆豆')) // static 直接用类名调用`,
          },
          {
            type: 'text',
            title: '3. this 是什么？为什么会「丢」？',
            body: '`this` 的含义只有一句话：**谁调用这个函数，`this` 就是谁。**\n\n- 写 `dog1.bark()` —— 是 `dog1` 在点它，所以方法里的 `this` 就是 `dog1`\n- 但如果先 `const fn = dog1.bark` 再单独 `fn()` —— 调用时前面没有「谁点它」，`this` 就丢了（在 class 内部是 `undefined`），于是 `this.name` 直接报错\n\n这就是**「`this` 丢失」**，也是老式类组件里最经典的坑：\n\n把 `this.handleClick` 传给 `onClick={this.handleClick}` 时，React 是在别处调用它的，不是 `this.handleClick()` 这样点出来的，所以 `this` 变成 `undefined`，一点按钮就报 `Cannot read property \'setState\' of undefined`。\n\n三种修法（老代码里你都会见到）：\n\n- **在 constructor 里绑定**：`this.handleClick = this.handleClick.bind(this)`（最经典）\n- **用类字段写成箭头函数**：`handleClick = () => {}`（现在最常见）\n- **传的时候包一层箭头函数**：`onClick={() => this.handleClick()}`\n\n**箭头函数为什么能修好？** 因为箭头函数**没有自己的 `this`**，它直接用「定义它的那个位置」的 `this`。这也正是本章第 4 节说「React 更爱箭头函数」的根本原因。',
          },
          {
            type: 'table',
            title: '4. 普通函数 vs 箭头函数的 this 对照',
            headers: ['对比项', '普通函数 / class 方法', '箭头函数'],
            rows: [
              ['this 从哪来', '调用时决定：谁点它就是谁', '定义时决定：外层的 this'],
              ['单独取出来再调用', 'this 丢失（变 undefined）', '不受影响，永远指向定义处'],
              ['能不能被 bind 改变', '能', '不能（bind 对它无效）'],
              ['适合做事件回调吗', '要先 bind 才安全', '适合，天生不会丢'],
              ['能不能当构造函数 new', '能', '不能（会直接报错）'],
              ['有没有 arguments 对象', '有', '没有（用剩余参数 `...args` 代替）'],
            ],
            note: '结论：**回调函数一律写箭头函数**，就绕开了整套 `this` 麻烦。这就是现代 React 代码里满屏 `() => {}` 的原因。',
          },
          {
            type: 'code',
            live: true,
            language: 'html',
            title: '5. 动手跑一跑：亲眼看到 this 丢失和三种修法',
            body: `<!-- 点按钮运行，观察哪种写法会报错 -->
<button onclick="run()">运行对比</button>
<!-- 结果显示区 -->
<pre id="out" style="margin:8px 0 0;font:13px/1.7 ui-monospace,monospace;"></pre>

<script>
  const out = document.getElementById('out')             // 显示区节点
  const print = (t) => { out.textContent += t + '\\n' }   // 打印一行

  // 一个最简单的计数器类，用来演示 this
  class Counter {
    constructor(name) {
      this.name = name    // 实例自己的名字
      this.count = 0      // 实例自己的计数
    }
    // 普通方法：this 由「调用方式」决定，单独取出来就会丢
    add() {
      this.count += 1
      return this.name + ' → ' + this.count
    }
    // 类字段 + 箭头函数：this 由「定义位置」决定，永远指向这个实例
    addArrow = () => {
      this.count += 1
      return this.name + '(箭头) → ' + this.count
    }
  }

  function run() {
    out.textContent = ''                    // 清空上次结果
    const c = new Counter('计数器')          // new 出一个实例

    // ① 正常调用：有「谁点它」，this 就是那个谁
    print('① c.add()：' + c.add())

    // ② 把方法单独取出来再调用：前面没有对象，this 丢了
    const lost = c.add
    try {
      print('② 取出来直接调：' + lost())
    } catch (e) {
      print('② 取出来直接调：报错了 → ' + e.name + '（this 丢了）')
    }

    // ③ 修法一：bind(c) 把 this 永久绑成 c
    const bound = c.add.bind(c)
    print('③ bind 修好：' + bound())

    // ④ 修法二：类字段箭头函数，取出来也不会丢
    const arrow = c.addArrow
    print('④ 箭头函数天生不丢：' + arrow())
  }
</script>`,
          },
          {
            type: 'text',
            title: '6. 继承：extends 与 super',
            body: '`class 子类 extends 父类` 表示「子类继承父类」：父类的方法子类直接就能用，不用重写。\n\n两个配套关键字：\n\n- **`super(参数)`**：在子类 `constructor` 里调用父类的 `constructor`。**必须写在使用 `this` 之前**，否则报错\n- **`super.方法名()`**：调用父类的同名方法（子类想「在父类基础上加点东西」时用）\n\n React 类组件就是这个套路：`class Counter extends React.Component`，意思是「我继承 React 组件的全部能力（`setState`、生命周期等），只补充我自己的 `render`」。\n\n构造函数里那句 `super(props)` 也是同一回事：先让父类把 `props` 装好，之后你才能用 `this.props`。',
          },
          {
            type: 'code',
            title: '7. 对照 React：类组件与错误边界（错误边界请照抄）',
            language: 'jsx',
            body: `import React from 'react'

// ===== 老式类组件：现在写业务不用它，但要看得懂 =====
class OldCounter extends React.Component {
  constructor(props) {
    super(props)              // 必须先调 super，之后才能用 this
    this.state = { count: 0 } // 类组件的 state 是一个对象，挂在 this 上
    // 经典写法：绑定 this，否则 onClick 调用时 this 会丢
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleAdd() {
    // 类组件用 this.setState 更新，会自动合并进 state 对象
    this.setState({ count: this.state.count + 1 })
  }

  // 类字段箭头函数：不需要 bind，现在更常见的写法
  handleReset = () => {
    this.setState({ count: 0 })
  }

  // 类组件必须有 render 方法，返回要显示的 JSX
  render() {
    return (
      <div>
        {/* 读数据要写 this.state.xxx，读 props 要写 this.props.xxx */}
        <p>{this.state.count}</p>
        <button type="button" onClick={this.handleAdd}>+1</button>
        <button type="button" onClick={this.handleReset}>归零</button>
      </div>
    )
  }
}

// 上面那一大坨，用函数组件只要这几行——所以现在都写函数组件
function NewCounter() {
  const [count, setCount] = React.useState(0)
  return (
    <div>
      <p>{count}</p>
      <button type="button" onClick={() => setCount(count + 1)}>+1</button>
      <button type="button" onClick={() => setCount(0)}>归零</button>
    </div>
  )
}

// ===== 错误边界：至今只能用类写，建议整段收藏照抄 =====
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, message: '' }  // 记录是否出错
  }

  // 静态生命周期：子组件渲染时抛错，用返回值更新 state
  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message }
  }

  // 实例生命周期：适合把错误上报给日志服务
  componentDidCatch(error, info) {
    console.log('捕获到组件错误：', error, info)
  }

  render() {
    // 出错了就显示兜底 UI，没出错就正常渲染子组件
    if (this.state.hasError) {
      return <p>页面出错了：{this.state.message}</p>
    }
    return this.props.children
  }
}

// 用法：包在可能出错的组件外面，坏掉一块不至于整站白屏
// <ErrorBoundary><NewCounter /></ErrorBoundary>`,
          },
          {
            type: 'table',
            title: '8. 类组件 vs 函数组件对照（读老代码时查这张表）',
            headers: ['做什么', '类组件写法', '函数组件写法'],
            rows: [
              ['声明组件', 'class A extends React.Component', 'function A() {}'],
              ['读 props', 'this.props.title', '参数解构 `({ title })`'],
              ['声明状态', 'this.state = { count: 0 }', 'const [count, setCount] = useState(0)'],
              ['更新状态', 'this.setState({ count: 1 })', 'setCount(1)'],
              ['挂载后执行', 'componentDidMount()', 'useEffect(fn, [])'],
              ['卸载前清理', 'componentWillUnmount()', 'useEffect 里 return 一个清理函数'],
              ['返回界面', 'render() { return ... }', '直接 return ...'],
              ['捕获子组件错误', 'componentDidCatch()', '暂无等价 Hook，只能用类'],
            ],
            note: '看到 `this.state`、`this.props`、`render()` 就知道这是老代码，按这张表在心里翻译成 Hooks 版即可。',
          },
          {
            type: 'list',
            title: '9. 这一节你需要掌握到什么程度',
            ordered: true,
            items: [
              '看到 `class X extends Y` 知道这是继承，`super(props)` 是先初始化父类',
              '看到 `this.state` / `this.props` / `this.setState` 知道这是类组件，能在心里换成 Hooks 写法',
              '看到 `Cannot read property \'setState\' of undefined` 立刻想到「this 丢了，缺 bind 或没用箭头函数」',
              '知道箭头函数没有自己的 `this`，所以回调一律写箭头函数最安全',
              '需要错误边界时，能把上面那段 ErrorBoundary 照抄进项目',
              '**不需要**用类写新业务组件——新代码一律函数组件 + Hooks',
            ],
          },
          {
            type: 'tip',
            title: '本节小结',
            body: '`class` 是模板、`new` 造实例、`constructor` 初始化、`this` 指当前实例、`extends` + `super` 继承。`this` 会因为「脱离了调用者」而丢失，修法是 `bind` 或箭头函数——**箭头函数没有自己的 `this`，这就是它成为 React 默认写法的根本原因。** 新业务写函数组件，只在错误边界时把类拿出来用。',
          },
        ],
      },
    },
  ],
}

export default jsBasics
