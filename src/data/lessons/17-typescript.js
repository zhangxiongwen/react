/**
 * TypeScript 专栏
 * 面向「刚学完 React 基础语法」的前端小白：从为什么学 TS，到能用 TS 写 React 组件
 */
const typescript = {
  id: 'typescript',
  title: 'TypeScript 入门到能写 React',
  summary:
    'TS 就是「带类型的 JavaScript」：写代码时编辑器就替你查错。这一章从基础类型、interface、联合类型、泛型、工具类型讲到 React 组件 Props、Hooks、事件、接口数据的类型写法，最后给一份新手报错清单和速查表。',
  order: 17,
  items: [
    {
      id: 'ts-why',
      title: '为什么要学 TypeScript？（JS 的痛点）',
      summary: 'TS = JS + 类型；错误从「用户点出来」提前到「你写代码时」',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'TypeScript 是 JavaScript 的**超集**：会 JS 就已经会 90% 的 TS。多出来的那 10% 是「给变量、参数、返回值贴标签」，好处是编辑器能在你写代码的当下就告诉你哪里写错了。',
          },
          {
            type: 'text',
            title: '1.1 是什么：TS 就是「多了类型」的 JS',
            body: 'TypeScript 是微软出的一门语言，你可以理解成：**JavaScript 的所有语法在 TS 里都合法**，TS 只是额外允许你写「类型标注」。\n\n比如 JS 里写 `let name = "小明"`，TS 里可以写 `let name: string = "小明"`——多出来的 `: string` 就是类型标注。\n\n浏览器并不认识 TS，所以 TS 文件在跑之前会被编译（转译）成普通 JS：**编译过程中把类型全部擦掉**，剩下的就是你熟悉的 JS。\n\n所以有一句关键结论：类型只在「开发阶段」起作用，运行时一行类型代码都不存在。',
          },
          {
            type: 'text',
            title: '1.2 为什么：纯 JS 的三个典型痛点',
            body: '**痛点一：拼错属性名不报错。** `user.nmae` 在 JS 里是 `undefined`，页面显示空白，你要翻半天才发现少了一个字母。\n\n**痛点二：不知道函数要传什么。** 同事写的 `formatPrice(value, options)`，`options` 里能放什么字段？只能去翻源码或者猜。\n\n**痛点三：接口数据结构靠记忆。** 后端返回的对象里到底是 `userName` 还是 `user_name`？是数组还是对象？写错了要等页面报错才知道。\n\n这些错误的共同点：**都要等到代码真正跑起来（甚至用户点到那一步）才暴露**。TS 的价值就是把这些错误提前到你敲键盘的那一秒。',
          },
          {
            type: 'code',
            title: '1.3 纯 JS 的痛点：错误要等到运行时才暴露',
            language: 'ts',
            body: `// 下面这段是普通 JavaScript：没有任何类型，写什么都「合法」
const user = { name: '小明', age: 18 } // 定义一个用户对象，有 name 和 age 两个属性

console.log(user.nmae) // 属性名拼错了（nmae），JS 不报错，安静地输出 undefined

function formatPrice(value) { // 定义函数：把价格格式化成「￥12.00」这种字符串
  return '￥' + value.toFixed(2) // toFixed 是数字才有的方法，字符串没有这个方法
}

formatPrice(100) // ✅ 传数字，正常输出 ￥100.00
formatPrice('100') // ❌ 传字符串，JS 允许你这么写，但运行时才崩：toFixed is not a function
formatPrice() // ❌ 一个参数都不传，运行时崩：Cannot read properties of undefined`,
          },
          {
            type: 'code',
            title: '1.4 换成 TS：同样的错误，编辑器当场画红线',
            language: 'ts',
            body: `// 同样的代码用 TypeScript 写：给对象和参数都贴上类型标签
interface User { // interface 定义「一个 User 对象长什么样」
  name: string // name 属性必须是字符串
  age: number // age 属性必须是数字
}

const user: User = { name: '小明', age: 18 } // 声明 user 的类型是 User

console.log(user.nmae) // 编辑器红线：属性"nmae"在类型"User"上不存在，你是否想访问"name"？

function formatPrice(value: number): string { // 参数必须是 number，返回值必须是 string
  return '￥' + value.toFixed(2) // 因为 value 一定是数字，这里放心调用 toFixed
}

formatPrice(100) // ✅ 类型匹配，没有红线
formatPrice('100') // ❌ 编辑器红线：类型"string"的参数不能赋给类型"number"的参数
formatPrice() // ❌ 编辑器红线：应有 1 个参数，但获得 0 个`,
          },
          {
            type: 'text',
            title: '1.5 注意：「红线」不等于「页面崩了」',
            body: '上面代码里的报错，**全部发生在编辑器里**（VS Code 会在出错的地方画红色波浪线，鼠标悬停能看到中文提示）。\n\n这一点对新手非常重要：TS 的报错是「静态检查」，它在你保存文件之前就出现，不需要打开浏览器、不需要点按钮复现。\n\n另外要知道：即使有红线，代码通常**仍然能编译出 JS 并跑起来**（类型被擦掉了）。所以不要看到红线就以为项目挂了——红线是提醒你「这里逻辑很可能有问题」。',
          },
          {
            type: 'table',
            title: '1.6 JS 与 TS 对照',
            intro: '同一件事在两种语言里的差别，主要在「什么时候发现问题」。',
            headers: ['对比项', 'JavaScript', 'TypeScript'],
            rows: [
              ['错误发现时机', '运行时（打开页面才知道）', '写代码时（编辑器画红线）'],
              ['编辑器自动补全', '很弱，靠猜属性名', '很强，输入 `.` 就列出所有属性'],
              ['函数参数说明', '要看源码或注释', '把光标放上去就显示参数类型'],
              ['重构改字段名', '全局搜索替换，容易漏', '改类型定义，所有用到的地方都报错提示'],
              ['浏览器能直接跑吗', '能', '不能，要先编译成 JS'],
              ['额外学习成本', '无', '大约 1～2 周能上手写业务'],
            ],
            note: 'TS 不会让你的代码跑得更快，它让你的代码更难写错——这是两回事。',
          },
          {
            type: 'list',
            title: '1.7 什么项目值得上 TS？',
            intro: '不是所有场景都必须 TS，但下面这些情况收益非常明显：',
            ordered: false,
            items: [
              '多人协作的项目：类型就是最准确的接口文档，不会像注释那样过期',
              '长期维护的项目：半年后回来改代码，靠类型就能想起数据结构',
              '接口数据复杂的项目：后台管理系统、表单多的业务，类型能挡住大量低级错误',
              '要用组件库的项目：`antd` 等主流库都自带类型，属性写错立刻提示',
              '反过来：三十行的一次性小页面、纯静态官网，用 JS 也完全够',
            ],
          },
          {
            type: 'text',
            title: '1.8 新手常见的三个误解',
            body: '**误解一：「TS 是新框架，要重新学一遍」。** 不是。TS 里 `if`、`for`、`map`、`async/await`、React 写法全都和 JS 一模一样，你只是在原来的代码上加标注。\n\n**误解二：「TS 会让运行更慢」。** 不会。类型在编译时被删掉，最终跑在浏览器里的还是 JS，性能完全一样。\n\n**误解三：「有 TS 就不会有 bug 了」。** 不对。TS 只能保证「类型对得上」，它管不了业务逻辑写反了、接口地址写错了这类问题。它是护栏，不是自动驾驶。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: 'TS = JS + 类型标注；类型只在开发期存在，编译后被擦掉。它的核心价值是把「运行时才发现的错」变成「写代码时的红线」，顺带获得超强的自动补全。会 JS 就能直接开始写 TS。',
          },
        ],
      },
    },
    {
      id: 'ts-setup',
      title: '怎么在项目里用上 TS（脚手架 / tsconfig / .ts 与 .tsx / @types）',
      summary: '用官方模板一键创建；tsconfig 关键字段逐个看懂；带 JSX 的文件必须 .tsx',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '新项目别手动配环境，直接用官方 TS 模板创建；配置都在 `tsconfig.json` 里；**含 JSX 的文件必须叫 `.tsx`**，纯逻辑文件叫 `.ts`。',
          },
          {
            type: 'text',
            title: '2.1 是什么：一个 TS 项目多了哪些东西？',
            body: '相比 JS 项目，TS 项目其实只多三样东西：\n\n**① 一个编译器**：`typescript` 这个 npm 包，它提供 `tsc` 命令，负责把 TS 编译成 JS、以及做类型检查。\n\n**② 一个配置文件**：`tsconfig.json`，告诉编译器「检查得多严、编译到哪个 JS 版本、哪些文件要检查」。\n\n**③ 一堆类型声明包**：形如 `@types/react`、`@types/node`，它们只包含类型、不包含运行代码。\n\n除此之外，目录结构、React 写法、打包流程全都不变。',
          },
          {
            type: 'code',
            title: '2.2 怎么用：两种主流脚手架的创建命令',
            language: 'bash',
            body: `# ===== 方式一：Create React App（本仓库同系列，配置少、上手快）=====
npx create-react-app my-app --template typescript  # --template typescript 表示用 TS 模板创建
cd my-app                                          # 进入刚创建的项目目录
npm start                                          # 启动开发服务器，浏览器自动打开 3000 端口

# ===== 方式二：Vite（现在更主流，启动快得多）=====
npm create vite@latest my-app -- --template react-ts  # react-ts 表示「React + TypeScript」模板
cd my-app                                             # 进入项目目录
npm install                                           # 安装依赖（Vite 模板不会自动装）
npm run dev                                           # 启动开发服务器，默认 5173 端口

# ===== 方式三：给已有的 JS 项目加 TS（渐进迁移）=====
npm install -D typescript @types/react @types/react-dom  # -D 表示装到 devDependencies（只开发时用）
npx tsc --init                                           # 生成一份默认的 tsconfig.json
# 之后把想改造的文件从 .js 逐个重命名成 .tsx，一次改一个，不用一口气全改完`,
          },
          {
            type: 'text',
            title: '2.3 为什么：`.ts` 和 `.tsx` 一定要分清',
            body: '规则很简单：**文件里出现 JSX（也就是 `<div>`、`<Button />` 这种标签），就必须用 `.tsx` 后缀**；否则用 `.ts`。\n\n为什么不能都用 `.ts`？因为在 `.ts` 文件里，尖括号 `<T>` 被解释成「类型断言」或「泛型」，编译器无法判断 `<div>` 到底是标签还是类型，会直接报语法错。\n\n实践对照：\n\n- 组件文件 `UserCard.tsx`（有 JSX）\n- 工具函数 `formatDate.ts`（纯逻辑）\n- 类型集中定义 `types.ts`（只有 `interface` / `type`）\n- 自定义 Hook：不返回 JSX 的话用 `useAuth.ts`，返回 JSX 的话用 `.tsx`',
          },
          {
            type: 'code',
            title: '2.4 tsconfig.json：关键字段逐个解释',
            language: 'json',
            body: `{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },
    "noEmit": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}`,
          },
          {
            type: 'table',
            title: '2.5 tsconfig 字段速查（上面每一行都在这里）',
            intro: '刚开始只需要看懂 `strict`、`jsx`、`paths`、`include` 这四个，其余用默认值即可。',
            headers: ['字段', '作用', '新手建议'],
            rows: [
              ['`target`', '编译产物用哪个 JS 版本的语法（比如 `ES2020`）', '保持模板默认'],
              ['`lib`', '允许使用哪些内置 API 的类型，`DOM` 表示能用 `document`、`window`', '前端项目必须含 `DOM`'],
              ['`jsx`', '如何处理 JSX，`react-jsx` 表示新写法（不用 `import React`）', 'React 17+ 都用 `react-jsx`'],
              ['`module` / `moduleResolution`', '模块用什么规范、按什么规则找依赖文件', '保持模板默认'],
              ['`strict`', '**总开关**：一次打开全部严格检查', '强烈建议 `true`，新手养成好习惯'],
              ['`noImplicitAny`', '参数没写类型且推断不出来时报错', '被 `strict` 包含，别单独关掉'],
              ['`strictNullChecks`', '`null` / `undefined` 不能随便赋给其它类型', '被 `strict` 包含，是最有用的一条'],
              ['`noUnusedLocals`', '有声明但没用到的变量就报错', '嫌烦可以先设 `false`'],
              ['`esModuleInterop`', '让 `import x from` 兼容老的 CommonJS 包', '保持 `true`'],
              ['`skipLibCheck`', '跳过 `node_modules` 里的类型检查，编译快很多', '保持 `true`'],
              ['`baseUrl` + `paths`', '配路径别名，`@/utils` 就等于 `src/utils`', '可选，但用了很舒服'],
              ['`noEmit`', '只做类型检查，不输出 JS 文件（因为打包交给 Vite / Webpack）', 'React 项目通常 `true`'],
              ['`include` / `exclude`', '哪些目录要检查、哪些排除掉', '一般只写 `src`'],
            ],
            note: '`strict: true` 打开后新手会遇到更多红线，但每条红线都在帮你挡真实的 bug，别急着关。',
          },
          {
            type: 'text',
            title: '2.6 `@types/xxx` 是什么？为什么要单独装？',
            body: '有些库本身是用 JS 写的（比如老版本的 `lodash`），包里没有类型信息。这时 TS 不知道 `_.chunk()` 的参数是什么，就会报「找不到模块的声明文件」。\n\n社区为此维护了一个仓库叫 **DefinitelyTyped**，专门给这些 JS 库补写类型，发布成 `@types/库名` 这种包。\n\n关键点：\n\n- `@types/xxx` 里**只有类型定义**（`.d.ts` 文件），没有一行会运行的代码，所以装到 `devDependencies` 就行\n- 现代库（`antd`、`axios`、`dayjs`、`zustand`）大多**自带类型**，不需要额外装 `@types`\n- 判断方法：`import` 之后编辑器报「隐式具有 any 类型」或「找不到声明文件」，就去搜一下有没有对应的 `@types` 包',
          },
          {
            type: 'code',
            title: '2.7 类型声明包的安装与使用',
            language: 'bash',
            body: `# React 项目里最常见的两个类型包（TS 模板已自动装好）
npm install -D @types/react @types/react-dom  # 提供 React.FC、React.ReactNode 等类型

# 举例：装 lodash（自身没类型）时，要额外装它的类型包
npm install lodash                            # 装真正会跑的代码
npm install -D @types/lodash                  # 装它的类型定义，装完红线消失

# 举例：axios 自带类型，不需要 @types/axios
npm install axios                             # 一行就够，import 后直接有补全

# 查看某个包有没有自带类型：看它的 package.json 里有没有 "types" 字段
npm view axios types                          # 输出类型入口文件路径说明自带类型`,
          },
          {
            type: 'list',
            title: '2.8 环境搭建自检清单',
            ordered: true,
            items: [
              '项目根目录是否存在 `tsconfig.json`？',
              '`compilerOptions.strict` 是否为 `true`？',
              '含 JSX 的文件后缀是否都是 `.tsx`？',
              '编辑器是否装了 TypeScript 支持（VS Code 自带，无需插件）？',
              '`npx tsc --noEmit` 能否跑通（这条命令只查类型不产出文件）？',
              '第三方库报「找不到声明文件」时，是否先搜过 `@types/包名`？',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '新项目用 `--template typescript` 或 `react-ts` 模板起；配置看 `tsconfig.json`，先打开 `strict: true`；有 JSX 用 `.tsx`，没 JSX 用 `.ts`；库缺类型就找 `@types/库名`。',
          },
        ],
      },
    },
    {
      id: 'ts-basic-types',
      title: '基础类型全家桶：string、数组、元组、any、unknown、void、never',
      summary: '八个基础类型 + 数组两种写法 + any 为什么危险 + unknown 才是安全选择',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '基础类型名全部**小写**：`string`、`number`、`boolean`。数组写 `string[]`。`any` 是「关掉类型检查」的后门，尽量别用；不知道类型时该用 `unknown`。',
          },
          {
            type: 'text',
            title: '3.1 是什么：类型写在变量名后面的冒号里',
            body: 'TS 的语法格式固定是：`变量名: 类型 = 值`。\n\n注意一个新手极易犯的错：类型名是**小写**的 `string`，不是大写的 `String`。大写的 `String` 指的是 JS 里的包装对象，几乎永远不该用。\n\n同理：`number` 不是 `Number`，`boolean` 不是 `Boolean`。\n\n还有一个心理调整：TS 里的「类型」不是变量，它是给编译器看的说明。所以 `let x: string` 这一整行编译成 JS 后只剩 `let x`。',
          },
          {
            type: 'code',
            title: '3.2 原始类型：string / number / boolean / null / undefined',
            language: 'ts',
            body: `let userName: string = '小明' // 字符串类型，注意是小写 string 不是 String
let age: number = 18 // 数字类型：整数和小数都是 number，TS 里没有 int/float 之分
let isVip: boolean = true // 布尔类型，只能是 true 或 false
let nothing: null = null // null 类型：只能存 null 这一个值，表示「明确的空」
let notSet: undefined = undefined // undefined 类型：表示「还没赋值」

userName = 123 // ❌ 红线：不能将类型"number"分配给类型"string"

let score: number = 95.5 // 小数也是 number，不需要另外的类型
let big: bigint = 100n // bigint：超大整数，末尾要加 n（业务里很少用）
let sym: symbol = Symbol('id') // symbol：唯一标识符（业务里很少用）

// 打开 strictNullChecks 后，null 不能随便塞进别的类型
let title: string = null // ❌ 红线：不能将类型"null"分配给类型"string"
let title2: string | null = null // ✅ 用联合类型明确说「可能是字符串，也可能是 null」`,
          },
          {
            type: 'code',
            title: '3.3 数组与元组：`string[]`、`Array<string>`、`[string, number]`',
            language: 'ts',
            body: `const names: string[] = ['小明', '小红'] // 写法一：类型后面加 []，表示「字符串数组」
const ages: Array<number> = [18, 20] // 写法二：Array<number>，效果和 number[] 完全一样

names.push('小刚') // ✅ 往字符串数组里放字符串，没问题
names.push(123) // ❌ 红线：类型"number"的参数不能赋给类型"string"的参数

const mixed: (string | number)[] = ['a', 1] // 元素可能是字符串或数字：注意括号不能省
const matrix: number[][] = [[1, 2], [3, 4]] // 二维数组：number[] 再加一层 []

const users: { id: number; name: string }[] = [ // 对象数组：把对象类型整段包起来再加 []
  { id: 1, name: '小明' }, // 每个元素都必须有 id 和 name，且类型对得上
]

// ===== 元组 tuple：长度固定、每个位置类型固定的数组 =====
const point: [number, number] = [10, 20] // 坐标点：必须正好两个数字
const entry: [string, number] = ['age', 18] // 第 0 位必须是字符串，第 1 位必须是数字
const wrong: [string, number] = [18, 'age'] // ❌ 红线：顺序反了，类型对不上

const [key, value] = entry // 解构时 key 自动推断为 string，value 自动推断为 number
// 元组最常见的场景就是 useState：它返回的就是 [值, 设置函数] 这样一个元组`,
          },
          {
            type: 'text',
            title: '3.4 为什么 `any` 要少用？',
            body: '`any` 的意思是「这个值可以是任何类型，请不要检查它」。写上 `any` 之后，TS 对这个变量彻底放手——你怎么用它都不报错。\n\n危险在于 **`any` 会传染**：一个 `any` 变量赋值给别人，别人也变得不受检查；从 `any` 上取的属性也是 `any`。一个项目里 `any` 用多了，等于花了钱买 TS 却把功能关掉了。\n\n什么时候可以短暂用 `any`？\n\n- 老项目迁移时先让代码跑起来，之后再逐步补类型\n- 第三方库类型实在写不出来，加上注释说明原因\n\n更好的替代：优先用 `unknown`，或者干脆把类型认真写出来。',
          },
          {
            type: 'code',
            title: '3.5 `any` vs `unknown`：一个放弃检查，一个强制你先判断',
            language: 'ts',
            body: `// ===== any：完全关闭检查，什么都能干，运行时才崩 =====
let loose: any = '这是一个字符串' // 声明为 any，TS 不再管它
loose.toFixed(2) // ✅ 编辑器不报错，但运行时崩：字符串没有 toFixed
loose.foo.bar.baz // ✅ 编辑器不报错，运行时崩：读不到 undefined 的属性
const n: number = loose // ✅ any 能赋给任何类型，错误就这样传染出去了

// ===== unknown：也表示「不知道是什么」，但用之前必须先判断 =====
let safe: unknown = '这是一个字符串' // 声明为 unknown，表示类型待确认
safe.toFixed(2) // ❌ 红线："safe"的类型为"未知"，禁止直接调用方法
const m: number = safe // ❌ 红线：不能将类型"unknown"分配给类型"number"

if (typeof safe === 'string') { // 用 typeof 做判断，这一步叫「类型收窄」
  console.log(safe.toUpperCase()) // ✅ 判断过了，这个分支里 safe 就是 string，能安全调用
}

if (typeof safe === 'number') { // 再判断另一种可能
  console.log(safe.toFixed(2)) // ✅ 这个分支里 safe 是 number，toFixed 合法
}

// 结论：JSON.parse、后端返回、第三方回调这些「先天不确定」的值，用 unknown 而不是 any`,
          },
          {
            type: 'code',
            title: '3.6 `void` 与 `never`：两个容易混的类型',
            language: 'ts',
            body: `// ===== void：函数「没有返回值」=====
function logMessage(text: string): void { // 返回值标 void，表示这个函数不 return 东西
  console.log(text) // 只做打印，没有 return 语句
}

const result = logMessage('你好') // result 的类型是 void，值是 undefined，不要拿它做判断

const onClick: () => void = () => { // 事件回调最常见的类型就是 () => void
  console.log('被点击了') // 回调只干事，不需要把结果交回去
}

// ===== never：函数「永远不会正常结束」=====
function fail(message: string): never { // 返回 never：因为下面直接抛错，函数走不到结尾
  throw new Error(message) // 抛异常 → 函数不会返回任何值
}

function loopForever(): never { // 死循环同样永远不返回
  while (true) { // 条件恒为 true，永不退出
    // 这里一直跑下去
  }
}

// never 的实用价值：在 switch 里帮你检查「是不是所有分支都处理了」
type Size = 'small' | 'large' // 只有两种取值
function getWidth(size: Size): number { // 根据尺寸返回宽度
  if (size === 'small') return 100 // 处理 small
  if (size === 'large') return 300 // 处理 large
  const rest: never = size // ✅ 两种都处理完了，size 剩下 never，编译通过
  return rest // 如果以后 Size 加了 'medium' 却忘了处理，上面这行会立刻报红线
}`,
          },
          {
            type: 'table',
            title: '3.7 基础类型速查表',
            headers: ['类型', '含义', '写法示例', '什么时候用'],
            rows: [
              ['`string`', '字符串', '`let s: string = \'hi\'`', '名字、地址、任何文本'],
              ['`number`', '数字（整数小数都算）', '`let n: number = 3.14`', '年龄、价格、数量'],
              ['`boolean`', '真假', '`let b: boolean = true`', '开关、是否登录'],
              ['`null`', '明确为空', '`let a: string | null = null`', '「暂时没有数据」'],
              ['`undefined`', '未赋值', '`let u: number | undefined`', '可选属性、还没初始化'],
              ['`string[]`', '字符串数组', '`[\'a\', \'b\']`', '列表数据，最常用'],
              ['`Array<string>`', '同上，另一种写法', '`Array<string>`', '和 `string[]` 完全等价'],
              ['元组 `[string, number]`', '长度和顺序都固定', '`[\'age\', 18]`', '`useState` 返回值、坐标'],
              ['`any`', '放弃检查', '`let x: any`', '尽量别用，迁移期临时用'],
              ['`unknown`', '待确认，用前必判断', '`let x: unknown`', '`JSON.parse`、接口原始数据'],
              ['`void`', '函数无返回值', '`(): void`', '事件回调、只打印的函数'],
              ['`never`', '永远不返回 / 不可能存在', '`(): never`', '抛错函数、穷尽检查'],
              ['`object`', '任意非原始值', '`let o: object`', '很少用，通常写具体结构'],
            ],
            note: '`string[]` 和 `Array<string>` 选哪个纯看团队习惯，同一个项目里统一就好。',
          },
          {
            type: 'text',
            title: '3.8 易错点汇总',
            body: '① 把类型写成大写：`String`、`Number`、`Boolean` 都能编译过，但含义是包装对象，一律改成小写。\n\n② `(string | number)[]` 忘记加括号写成 `string | number[]`——后者意思变成「字符串，或者数字数组」，完全不同。\n\n③ 以为 `any` 和 `unknown` 差不多：`any` 是关掉检查，`unknown` 是逼你先判断，安全性天差地别。\n\n④ 用 `void` 类型的返回值做判断：`if (logMessage(\'x\'))` 永远为假，因为 `void` 的值是 `undefined`。\n\n⑤ 数组用 `any[]`：等于放弃了数组元素的所有检查，`map` 里的 `item` 也失去补全。',
          },
          {
            type: 'list',
            title: '3.9 动手练习清单',
            ordered: true,
            items: [
              '声明一个 `string[]`，往里 `push` 一个数字，看红线提示写了什么',
              '把一个变量声明成 `unknown`，直接调方法，再加 `typeof` 判断，对比两次的红线',
              '写一个 `[string, number]` 元组并解构，把鼠标悬停在解构出的变量上看推断类型',
              '写一个返回 `never` 的抛错函数，在别处调用它，观察后面代码变成「不可达」',
              '把 `Size` 联合类型加一个 `\'medium\'`，看穷尽检查那行是否立刻报红',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '类型名小写；数组 `string[]`；长度固定用元组；`any` 是后门要少开，不确定就用 `unknown` 再配 `typeof` 判断；无返回值是 `void`，永不返回是 `never`。',
          },
        ],
      },
    },
    {
      id: 'ts-annotation-inference',
      title: '类型注解 vs 类型推断：什么时候可以不写类型',
      summary: 'TS 会自己猜类型；有初始值就别手写，函数参数一定要写',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '**有初始值的变量不用写类型**（TS 自己能推断出来）；**函数参数必须写类型**（TS 猜不到别人会传什么）。写得越少但推断越准，才是好的 TS 代码。',
          },
          {
            type: 'text',
            title: '4.1 是什么：注解是你告诉 TS，推断是 TS 自己猜',
            body: '**类型注解（annotation）**：你主动写 `: 类型`，比如 `const n: number = 1`。\n\n**类型推断（inference）**：你不写，TS 根据右边的值自动判断，比如 `const n = 1`，TS 知道 `n` 是 `number`。\n\n很多新手一上手会给每个变量都写类型，代码变得又长又啰嗦。实际的团队规范恰恰相反：**能推断出来的就别写**，把注解留给推断不出来的地方。\n\n验证推断结果的方法：在 VS Code 里把鼠标悬停在变量名上，会显示 TS 推断出的类型。这是学 TS 最好用的工具，多用。',
          },
          {
            type: 'code',
            title: '4.2 推断够用的情况：这些地方别写类型',
            language: 'ts',
            body: `const count = 0 // TS 推断 count 是 number，写 : number 属于多余
const name = '小明' // TS 推断 name 是 string
const isDone = false // TS 推断 isDone 是 boolean
const list = [1, 2, 3] // TS 推断 list 是 number[]
const user = { id: 1, name: '小明' } // TS 推断出 { id: number; name: string }

count = '文字' // ❌ 红线：推断出的类型一样有约束力，不是「没类型」

function double(n: number) { // 参数必须写类型；返回值这里故意不写
  return n * 2 // TS 从 return 推断出返回值是 number
}
const doubled = double(5) // doubled 被推断为 number，鼠标悬停可以验证

const upper = ['a', 'b'].map((item) => item.toUpperCase()) // item 自动推断为 string
// 因为数组是 string[]，所以回调参数不用写类型，upper 也自动推断为 string[]

// const 和 let 的推断粒度不同，这是个容易忽略的细节
const literal = 'small' // const 推断为字面量类型 'small'（只能是这个值）
let variable = 'small' // let 推断为更宽的 string（因为以后还能改成别的字符串）`,
          },
          {
            type: 'code',
            title: '4.3 必须手写注解的四种场景',
            language: 'ts',
            body: `// ===== 场景一：函数参数（最重要，TS 永远猜不到）=====
function greet(who) { // ❌ 红线：参数"who"隐式具有"any"类型
  return 'hi ' + who // 因为 TS 不知道调用方会传什么进来
}
function greetOk(who: string) { // ✅ 写上类型，函数内部就有完整补全
  return 'hi ' + who.trim() // 知道是字符串，才能放心调用 trim
}

// ===== 场景二：先声明后赋值 =====
let selectedId // ❌ 没有初始值也没注解，被推断为 any
let selectedId2: number | null = null // ✅ 明确说明「以后是数字，现在是空」

// ===== 场景三：空数组、空对象 =====
const tags = [] // ❌ 被推断为 any[]，push 什么都不检查
const tags2: string[] = [] // ✅ 明确是字符串数组，后面 push 数字会报红

// ===== 场景四：想让类型比推断结果更宽 =====
const size = 'small' // 推断为字面量 'small'，之后不能改成 'large'
let size2: 'small' | 'large' = 'small' // ✅ 明确允许两种取值，业务上更合理

// ===== 加分项：给对外暴露的函数写返回值类型 =====
function getUserName(id: number): string { // 手写返回值 string 相当于一份契约
  return '用户' + id // 万一哪天不小心 return 了数字，这里会立刻报红线
}`,
          },
          {
            type: 'text',
            title: '4.4 为什么函数参数必须写、变量可以不写？',
            body: '因为**信息来源不同**。\n\n变量的类型可以从「右边的初始值」直接看出来——`const n = 1`，值就在眼前，不需要你再说一遍。\n\n函数参数的值来自「未来某次调用」，编译器在定义函数的时候根本看不到实参。它只能有两种选择：报错提醒你写类型（`noImplicitAny: true` 时），或者悄悄当成 `any`（关掉严格模式时）。后者非常危险，函数内部的所有补全和检查全部失效。\n\n所以有一句实用口诀：**「进函数的门要检票，函数里的变量随它自己长」**。',
          },
          {
            type: 'table',
            title: '4.5 写不写注解决策表',
            headers: ['场景', '要写类型吗', '示例'],
            rows: [
              ['有初始值的 `const` / `let`', '❌ 不用写', '`const count = 0`'],
              ['函数参数', '✅ 必须写', '`function f(n: number)`'],
              ['函数返回值', '🟡 可选，对外 API 建议写', '`function f(): string`'],
              ['空数组 / 空对象', '✅ 必须写', '`const list: User[] = []`'],
              ['先声明后赋值', '✅ 必须写', '`let id: number | null = null`'],
              ['`map` / `filter` 回调参数', '❌ 不用写', '`list.map((item) => item.id)`'],
              ['想放宽字面量推断', '✅ 要写', '`let size: \'small\' | \'large\'`'],
              ['`useState` 初始值是 `null`', '✅ 要写泛型', '`useState<User | null>(null)`'],
            ],
            note: '判断标准只有一条：TS 能不能从代码里看出来。看得出来就别重复，看不出来就明确写。',
          },
          {
            type: 'code',
            title: '4.6 反例对照：过度注解 vs 恰当注解',
            language: 'ts',
            body: `// ❌ 反例：处处注解，读起来累，改类型时要改两处
const total: number = 100 // 右边就是数字，: number 是废话
const items: string[] = ['a', 'b'] // 右边已经是字符串数组，推断完全够
const flag: boolean = items.length > 0 // 比较表达式必然是布尔，不需要说明

// ✅ 正例：让 TS 推断，只在必要处注解
const total2 = 100 // 推断 number
const items2 = ['a', 'b'] // 推断 string[]
const flag2 = items2.length > 0 // 推断 boolean

function findUser(id: number, list: { id: number; name: string }[]) { // 参数必须注解
  return list.find((item) => item.id === id) // 回调参数不注解，返回值让 TS 推断
} // 返回值被推断为 { id: number; name: string } | undefined（可能找不到）

const found = findUser(1, items2 as never) // 这里只是演示调用，实际要传对象数组
if (found) { // 因为返回值可能是 undefined，必须先判断
  console.log(found.name) // 判断之后才能安全读 name
}`,
          },
          {
            type: 'list',
            title: '4.7 自检清单',
            ordered: true,
            items: [
              '是否给每个函数参数都写了类型（哪怕是回调里的自定义函数）？',
              '有初始值的变量是否被你多余地注解了？',
              '空数组是否写了元素类型，而不是留成 `any[]`？',
              '「以后才赋值」的变量是否写成了 `X | null` 并初始化为 `null`？',
              '有没有把鼠标悬停在变量上确认过推断结果符合预期？',
              '对外导出的工具函数是否写了返回值类型作为契约？',
            ],
          },
          {
            type: 'text',
            title: '4.8 易错点汇总',
            body: '① 空数组不写类型：`const list = []` 推断成 `any[]`，之后 `list.map(item => item.name)` 里的 `item` 没有任何补全。\n\n② 以为「没写类型就是没类型」：推断出来的类型和手写的一样有约束力，照样会报红线。\n\n③ 函数参数漏写类型但严格模式没开：代码不报错，但函数内部完全失去检查，是最隐蔽的坑。\n\n④ 给 `useState(null)` 不写泛型：会被推断成 `null` 类型，之后 `setUser(realUser)` 直接报红。\n\n⑤ 需要多种取值时依赖 `const` 推断：`const size = \'small\'` 的类型是 `\'small\'`，不能再赋 `\'large\'`。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '参数必写、空数组必写、先声明后赋值必写；其余交给推断。判断口诀：TS 从代码里看得出来的就别重复写，看不出来的就说清楚。多用鼠标悬停验证推断结果。',
          },
        ],
      },
    },
    {
      id: 'ts-object-types',
      title: '对象类型：interface 与 type、可选属性、readonly、索引签名',
      summary: '描述对象结构的两种写法；`?` 可选、`readonly` 只读、`[key: string]` 索引签名',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '描述对象结构用 `interface`，描述联合 / 工具类型用 `type`。属性后面加 `?` 表示可选，前面加 `readonly` 表示只读。',
          },
          {
            type: 'text',
            title: '5.1 是什么：给对象画一张「结构图」',
            body: '前端代码里 90% 的类型工作，就是描述对象长什么样：一个用户有哪些字段、一个组件接收哪些 props、一个接口返回什么结构。\n\nTS 提供两种语法做这件事：\n\n**`interface`**：`interface User { name: string }`，专门用来描述对象结构，可以被继承（`extends`），同名会自动合并。\n\n**`type`**：`type User = { name: string }`，本质是「给类型起个别名」，能描述的东西更广——对象、联合类型、函数类型、工具类型都行。\n\n描述纯对象时两者几乎等价，写法上只差一个 `=`。',
          },
          {
            type: 'code',
            title: '5.2 怎么写：`interface` 与 `type` 的基本用法',
            language: 'ts',
            body: `// ===== 写法一：interface（描述对象结构的首选）=====
interface User { // interface 后面直接跟大括号，注意没有等号
  id: number // 必填属性：数字
  name: string // 必填属性：字符串
  email?: string // 可选属性：加 ? 表示「可以不传」，类型实际是 string | undefined
  readonly createdAt: string // 只读属性：赋值之后不允许再改
}

// ===== 写法二：type（给类型起别名，注意有等号）=====
type UserAlias = { // type 名字 = { ... }，别忘了等号
  id: number // 字段写法和 interface 完全一样
  name: string // 分号、逗号、换行都可以作为分隔符
}

const u: User = { // 声明变量时标注类型为 User
  id: 1, // 必填，给了数字 ✅
  name: '小明', // 必填，给了字符串 ✅
  createdAt: '2026-09-08', // 只读属性在「创建时」是可以赋值的
} // email 没给也不报错，因为它是可选属性

u.name = '小红' // ✅ 普通属性可以改
u.createdAt = '2026-01-01' // ❌ 红线：无法为"createdAt"赋值，因为它是只读属性
u.age = 18 // ❌ 红线：类型"User"上不存在属性"age"（这正是我们想要的保护）

console.log(u.email?.toUpperCase()) // 可选属性可能是 undefined，必须用 ?. 安全访问`,
          },
          {
            type: 'code',
            title: '5.3 嵌套对象、数组字段、索引签名',
            language: 'ts',
            body: `interface Address { // 先把地址单独抽成一个类型，便于复用
  city: string // 城市
  street: string // 街道
}

interface Profile { // 用户档案：演示嵌套对象和数组字段
  name: string // 普通字符串字段
  address: Address // 嵌套对象：直接引用上面定义的 Address 类型
  tags: string[] // 字符串数组字段
  friends: { id: number; name: string }[] // 内联的对象数组（结构简单时可以不抽出去）
  meta?: { // 可选的嵌套对象：整块都可以不传
    source: string // 里面的字段在传了 meta 时才必填
  }
}

// ===== 索引签名：属性名不固定，但值的类型固定 =====
interface ScoreMap { // 比如「科目 -> 分数」这种字典结构
  [subject: string]: number // 意思是：任意字符串键，对应的值必须是 number
}

const scores: ScoreMap = { math: 95, english: 88 } // 键名随便起，值必须是数字
scores.chinese = 90 // ✅ 新增一个键也合法，因为键名不受限制
scores.art = '优秀' // ❌ 红线：值必须是 number，不能是字符串

// 更常用的等价写法是 Record 工具类型（第 9 节会讲）
type ScoreMap2 = Record<string, number> // 和上面的 ScoreMap 完全等价，但更短`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：用 interface 描述数据，渲染一张用户卡片',
            body: `import { useState } from 'react'

interface User { // 定义用户的数据结构
  id: number // 用户 id
  name: string // 用户名
  email?: string // 可选：有的用户没填邮箱
}

const users: User[] = [ // 一个 User 数组，每项都必须符合 User 结构
  { id: 1, name: '小明', email: 'ming@qq.com' }, // 有邮箱
  { id: 2, name: '小红' }, // 没有邮箱，因为 email 是可选属性
]

export default function Demo() { // live Demo 必须默认导出一个组件
  const [index, setIndex] = useState<number>(0) // 当前显示第几个用户，泛型标明是数字
  const user = users[index] // 按下标取出当前用户，类型自动是 User

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      {/* 读 user.name：因为是必填属性，可以直接用 */}
      <h3 style={{ margin: '0 0 8px' }}>{user.name}</h3>
      {/* email 是可选的，用 ?? 给一个兜底文案，避免显示 undefined */}
      <p style={{ margin: '0 0 12px', color: '#666' }}>
        邮箱：{user.email ?? '未填写'}
      </p>
      {/* 点击切换下标，取余保证不越界 */}
      <button onClick={() => setIndex((index + 1) % users.length)}>
        看下一个（当前第 {index + 1} 个）
      </button>
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '5.4 为什么可选属性要配 `?.` 使用？',
            body: '写了 `email?: string` 之后，`email` 的真实类型是 `string | undefined`。\n\n这意味着你不能直接 `user.email.toUpperCase()`——万一这个用户没填邮箱，运行时就是「读不到 undefined 的属性」这个经典错误。TS 会提前拦住你，报「对象可能为 undefined」。\n\n三种正确处理方式：\n\n- 可选链：`user.email?.toUpperCase()`，为空时整个表达式是 `undefined`\n- 空值合并：`user.email ?? \'未填写\'`，为空时用默认值\n- 先判断：`if (user.email) { ... }`，进入分支后类型自动收窄成 `string`\n\n这套组合拳你会在整个 TS 生涯里天天用到。',
          },
          {
            type: 'code',
            title: '5.5 `interface` 的两个独门本领：继承与合并',
            language: 'ts',
            body: `interface Base { // 基础字段：很多实体都有 id 和创建时间
  id: number // 主键
  createdAt: string // 创建时间
}

interface Article extends Base { // extends 表示「继承 Base 的所有字段，再加自己的」
  title: string // 文章标题
  content: string // 文章正文
} // 最终 Article 有 id、createdAt、title、content 四个字段

interface Comment extends Base { // 另一个实体也复用 Base
  articleId: number // 属于哪篇文章
  text: string // 评论内容
}

// type 想做同样的事要用交叉类型 &（效果相同，写法不同）
type ArticleType = Base & { // & 表示「两边的字段都要有」
  title: string // 自己的字段
}

// interface 独有：同名声明会自动合并（给第三方库补类型时很有用）
interface Window { // 全局 Window 已经有很多字段
  myAppVersion: string // 这里给它再补一个自定义字段
} // 之后写 window.myAppVersion 就不报错了

// type 不能重名，下面这样写会直接报错
type Dup = { a: string } // 第一次声明
type Dup2 = { b: string } // 换个名字才行，重名会报「标识符重复」`,
          },
          {
            type: 'table',
            title: '5.6 `interface` 还是 `type`？到底选哪个',
            intro: '结论先给：**描述对象用 `interface`，其它情况用 `type`**。下面是细节差异。',
            headers: ['能力', '`interface`', '`type`', '说明'],
            rows: [
              ['描述对象结构', '✅', '✅', '两者几乎等价，随便用'],
              ['继承 / 组合', '`extends`', '`&` 交叉类型', '`extends` 报错信息更友好'],
              ['同名自动合并', '✅ 能', '❌ 报重复', '给全局对象补字段时只能用 `interface`'],
              ['联合类型', '❌ 不行', '✅ 行', '`type S = \'a\' | \'b\'` 只能用 `type`'],
              ['元组类型', '❌ 不行', '✅ 行', '`type P = [number, number]`'],
              ['函数类型别名', '写法别扭', '✅ 自然', '`type Fn = (n: number) => void`'],
              ['工具类型（`Pick` 等）', '❌ 不行', '✅ 行', '`type A = Pick<User, \'id\'>`'],
              ['编辑器提示可读性', '略好', '有时会展开成一大坨', 'Props 用 `interface` 提示更清楚'],
            ],
            note: '不要为了这个纠结太久。团队统一 > 个人偏好，改起来也只是一个关键字的事。',
          },
          {
            type: 'text',
            title: '5.7 易错点汇总',
            body: '① `type` 忘了等号：`type User { }` 是语法错误，必须写 `type User = { }`。\n\n② 对象里多写一个字段：TS 有「多余属性检查」，直接写字面量时多给字段会报红——这是特性不是 bug。\n\n③ 以为 `readonly` 能冻结整个对象：`readonly` 只管当前这一层，嵌套对象内部照样能改。\n\n④ 可选属性直接点方法：`user.email.trim()` 会报「对象可能为 undefined」，要用 `?.`。\n\n⑤ 索引签名滥用：`[key: string]: any` 等于放弃了整个对象的检查，尽量写具体字段。\n\n⑥ 把 `interface` 里的属性用逗号、分号混着写：其实都合法，但同一个项目里保持一致更整齐。',
          },
          {
            type: 'list',
            title: '5.8 动手练习清单',
            ordered: true,
            items: [
              '定义 `interface Product { id, name, price, tags?, stock: readonly }` 并创建一个对象',
              '故意多写一个不存在的属性，读一遍报错信息',
              '用 `extends` 抽出 `Base { id, createdAt }`，让两个实体都继承它',
              '把可选属性直接点方法，再改成 `?.` 和 `??`，对比红线变化',
              '用索引签名写一个 `{ [code: string]: string }` 的城市编码字典',
              '把同一个对象类型分别用 `interface` 和 `type` 写一遍，感受差异',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '对象结构用 `interface`（能 `extends`、能合并）；联合 / 元组 / 工具类型用 `type`。`?` 可选、`readonly` 只读、`[key: string]` 索引签名。可选属性一律配 `?.` 或 `??` 使用。',
          },
        ],
      },
    },
    {
      id: 'ts-union-narrow',
      title: '联合类型、字面量类型、交叉类型与类型收窄',
      summary: '`A | B` 是「或」、`A & B` 是「且」；用 `typeof`、`in`、真值判断把范围缩小',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '`|` 是「或者」，`&` 是「并且」。联合类型只能用「所有成员都有的能力」，想用某一个成员的专属能力，必须先**类型收窄**。',
          },
          {
            type: 'text',
            title: '6.1 是什么：字面量类型把取值锁死在几个选项里',
            body: '**字面量类型**指的是「类型就是某个具体的值」，比如 `type Size = \'small\'` 的意思是：这个变量只能等于字符串 `\'small\'`，别的都不行。\n\n单独一个字面量没什么用，把几个用 `|` 连起来才是杀手级功能：\n\n`type Size = \'small\' | \'medium\' | \'large\'`\n\n这一行做到了三件事：\n\n- 传错值立刻报红，比运行时校验早得多\n- 编辑器输入引号就弹出三个候选，不用记文档\n- 以后加一个尺寸，所有 `switch` 没覆盖的地方都会提示你\n\n这就是替代「魔法字符串」的正确姿势，React 组件的 `variant`、`size`、`status` 这类 props 全都该这么写。',
          },
          {
            type: 'code',
            title: '6.2 怎么写：联合类型与字面量类型',
            language: 'ts',
            body: `type Size = 'small' | 'medium' | 'large' // 字符串字面量联合：只能是这三个值之一

let size: Size = 'small' // ✅ 在候选里
size = 'large' // ✅ 也在候选里
size = 'big' // ❌ 红线：不能将类型"big"分配给类型"Size"

type Status = 'loading' | 'success' | 'error' // 请求状态：三态用联合类型最合适
type Code = 200 | 404 | 500 // 数字也能做字面量联合
type Flag = true | false // 布尔字面量联合，其实就等于 boolean

type Id = string | number // 混合类型联合：id 可能是数字也可能是字符串
function printId(id: Id) { // 参数接受两种类型
  console.log(id.toUpperCase()) // ❌ 红线：number 上不存在 toUpperCase
  console.log(id.toString()) // ✅ toString 是两种类型都有的方法，可以直接调
} // 规则：联合类型只能直接使用「所有成员共有的成员」

type MaybeUser = { name: string } | null // 最常见的联合：可能有对象，也可能是空
function showName(user: MaybeUser) { // 参数可能是 null
  console.log(user.name) // ❌ 红线：对象可能为"null"
  console.log(user?.name) // ✅ 可选链：null 时整个表达式返回 undefined
}`,
          },
          {
            type: 'code',
            title: '6.3 类型收窄的四种方式',
            language: 'ts',
            body: `// ===== 方式一：typeof —— 判断原始类型 =====
function format(value: string | number) { // 参数可能是字符串或数字
  if (typeof value === 'string') { // typeof 判断把范围缩小到 string
    return value.trim() // ✅ 这个分支里 value 就是 string，能用字符串方法
  }
  return value.toFixed(2) // ✅ 走到这里只剩 number，能用数字方法
}

// ===== 方式二：真值判断 —— 排除 null / undefined =====
function greet(name?: string) { // 可选参数，类型是 string | undefined
  if (!name) return '你好，游客' // 早退：把 undefined 和空字符串一起挡掉
  return '你好，' + name.toUpperCase() // ✅ 这里 name 一定是非空字符串
}

// ===== 方式三：in —— 判断对象有没有某个属性 =====
interface Cat { meow: () => void } // 猫会 meow
interface Dog { bark: () => void } // 狗会 bark
function speak(pet: Cat | Dog) { // 参数是两种动物之一
  if ('meow' in pet) { // in 判断属性是否存在，据此区分是哪种类型
    pet.meow() // ✅ 这个分支里 pet 被收窄成 Cat
  } else {
    pet.bark() // ✅ 否则就是 Dog
  }
}

// ===== 方式四：判别属性 + switch（最推荐的写法）=====
type Shape = // 每个成员都带一个 kind 字段做「身份标签」
  | { kind: 'circle'; radius: number } // 圆：有半径
  | { kind: 'rect'; width: number; height: number } // 矩形：有宽高
function area(shape: Shape): number { // 根据形状算面积
  switch (shape.kind) { // 用 kind 分流，TS 自动知道每个分支是哪个成员
    case 'circle': return Math.PI * shape.radius ** 2 // ✅ 这里能读 radius
    case 'rect': return shape.width * shape.height // ✅ 这里能读 width / height
  }
}`,
          },
          {
            type: 'code',
            title: '6.4 自定义类型守卫：把判断逻辑复用起来',
            language: 'ts',
            body: `interface ApiSuccess { ok: true; data: string } // 成功响应：ok 为 true 且有 data
interface ApiFail { ok: false; message: string } // 失败响应：ok 为 false 且有 message
type ApiResult = ApiSuccess | ApiFail // 接口返回可能是两者之一

// 类型守卫函数：返回值写成 "参数 is 某类型"，TS 就会据此收窄
function isSuccess(res: ApiResult): res is ApiSuccess { // 关键字是 is
  return res.ok === true // 函数体只要返回布尔值即可，判断逻辑由你决定
}

function handle(res: ApiResult) { // 处理接口返回
  if (isSuccess(res)) { // 调用守卫函数，TS 认为这个分支里 res 是 ApiSuccess
    console.log(res.data) // ✅ 能读 data，不能读 message
  } else {
    console.log(res.message) // ✅ 另一个分支自动是 ApiFail，能读 message
  }
}

// 常见实用守卫：过滤掉数组里的 null
function isNotNull<T>(v: T | null): v is T { // 泛型守卫：任意类型都能用
  return v !== null // 不为 null 就通过
}
const raw: (string | null)[] = ['a', null, 'b'] // 一个可能含 null 的数组
const clean = raw.filter(isNotNull) // ✅ clean 的类型是 string[]，null 被类型系统也一起过滤掉了`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：字面量联合类型控制按钮尺寸',
            body: `import { useState } from 'react'

type Size = 'small' | 'medium' | 'large' // 字面量联合：尺寸只有三种合法取值

const sizeMap: Record<Size, number> = { // Record 把每种尺寸映射到一个字号
  small: 12, // 小号字体 12px
  medium: 16, // 中号 16px
  large: 22, // 大号 22px
}

const options: Size[] = ['small', 'medium', 'large'] // 供渲染按钮组用的数组

export default function Demo() { // 默认导出组件
  const [size, setSize] = useState<Size>('medium') // state 类型就是 Size，写错值会报红

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {/* 遍历三个选项渲染切换按钮，item 自动推断为 Size */}
        {options.map((item) => (
          <button
            key={item} // 列表渲染要有稳定 key
            onClick={() => setSize(item)} // 点击把 state 换成对应尺寸
            style={{ fontWeight: item === size ? 700 : 400 }} // 当前选中的加粗
          >
            {item}
          </button>
        ))}
      </div>
      {/* 用 sizeMap 取出字号：因为 size 一定是三个之一，这里绝不会取到 undefined */}
      <p style={{ fontSize: sizeMap[size], margin: 0 }}>
        当前尺寸：{size}（{sizeMap[size]}px）
      </p>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '6.5 收窄手段选择表',
            headers: ['要区分的东西', '用什么', '示例'],
            rows: [
              ['原始类型（字符串 / 数字 / 布尔）', '`typeof`', '`if (typeof v === \'string\')`'],
              ['是否为空（`null` / `undefined`）', '真值判断或 `!= null`', '`if (!user) return`'],
              ['两个对象类型', '`in` 判断属性', '`if (\'meow\' in pet)`'],
              ['多个对象类型', '判别属性 + `switch`', '`switch (shape.kind)`'],
              ['复杂 / 需复用的判断', '自定义守卫 `x is T`', '`function isSuccess(r): r is ApiSuccess`'],
              ['类实例', '`instanceof`', '`if (err instanceof Error)`'],
              ['数组元素过滤', '守卫 + `filter`', '`list.filter(isNotNull)`'],
            ],
            note: '判别属性（给每个成员加一个 `kind` 或 `type` 字段）是最省事、可读性最好的方案，写业务时优先考虑。',
          },
          {
            type: 'text',
            title: '6.6 交叉类型 `&`：把多个类型合成一个',
            body: '`A & B` 表示「同时满足 A 和 B」，也就是两边的字段都必须有。\n\n典型用法是给组件 props 叠加基础属性：\n\n`type ButtonProps = BaseProps & { size: Size }`\n\n两个容易混的点：\n\n**① `|` 和 `&` 的直觉是反的。** 联合 `A | B` 是「取值范围变大」但「可用属性变少」（只能用共有的）；交叉 `A & B` 是「要求变多」但「可用属性变全」。\n\n**② 原始类型交叉会得到 `never`。** `string & number` 表示「既是字符串又是数字」，世上没有这种值，所以结果是 `never`。\n\n实际业务里 `&` 主要用来合并对象类型，别拿它去交叉原始类型。',
          },
          {
            type: 'code',
            title: '6.7 交叉类型示例',
            language: 'ts',
            body: `interface WithId { id: number } // 有 id 的东西
interface WithTime { createdAt: string; updatedAt: string } // 有时间戳的东西

type Entity = WithId & WithTime // 交叉：既要 id，也要两个时间戳

const e: Entity = { // 三个字段一个都不能少
  id: 1, // 来自 WithId
  createdAt: '2026-09-01', // 来自 WithTime
  updatedAt: '2026-09-08', // 来自 WithTime
} // 少任何一个都会报「缺少属性」

type Article = Entity & { title: string } // 继续叠加自己的字段

// 组件 props 常用写法：基础样式属性 + 业务属性
type BaseProps = { className?: string; style?: object } // 通用外观属性
type CardProps = BaseProps & { title: string; onClose: () => void } // 叠加业务属性

const bad: string & number = 1 // ❌ 红线：原始类型交叉结果是 never，无法赋值
// 记住：& 是给对象类型用的，不是给 string / number 用的`,
          },
          {
            type: 'list',
            title: '6.8 自检清单',
            ordered: true,
            items: [
              '状态、尺寸、类型这类「几个固定选项」的 props，是否用了字面量联合而不是 `string`？',
              '用联合类型的值时，是否先收窄再访问专属属性？',
              '多个对象类型的联合，是否给每个成员加了 `kind` 判别属性？',
              '可能为 `null` 的值，是否用真值判断或 `?.` 处理过？',
              '重复出现的判断逻辑，是否抽成了 `x is T` 的类型守卫？',
              '`&` 是否只用在对象类型上，而不是原始类型上？',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '固定选项用字面量联合 `\'a\' | \'b\'`；联合类型只能用共有成员，用专属成员前先收窄（`typeof` / 真值 / `in` / `switch` 判别属性 / 自定义守卫 `x is T`）；`&` 用来合并对象类型。',
          },
        ],
      },
    },
    {
      id: 'ts-functions',
      title: '函数类型：参数、返回值、可选参数、默认值、函数类型别名',
      summary: '参数必须注解、返回值可推断；`?` 可选参数、默认值自动推断、`type Fn = () => void`',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '函数的类型 = **参数类型 + 返回值类型**。参数一定要写，返回值通常可以让 TS 推断。回调函数的类型写成 `(a: number) => void` 这种箭头形式。',
          },
          {
            type: 'text',
            title: '7.1 是什么：函数类型的三个位置',
            body: '给函数加类型，一共有三个地方可以写：\n\n**① 参数**：`function f(n: number)`，写在参数名后面。\n\n**② 返回值**：`function f(): string`，写在参数括号后面。\n\n**③ 整个函数的类型**：`const f: (n: number) => string = ...`，用箭头语法描述「接收什么、返回什么」。\n\n第三种最容易被新手忽略，但它非常重要——你给组件传回调 props 时写的就是它：`onChange: (value: string) => void`。\n\n注意箭头语法里的 `=>` 和箭头函数的 `=>` 长得一样但含义不同：在类型位置它表示「返回」，在值位置它表示「函数体开始」。',
          },
          {
            type: 'code',
            title: '7.2 怎么写：四种声明形式',
            language: 'ts',
            body: `// ===== 形式一：普通函数声明 =====
function add(a: number, b: number): number { // 两个数字参数，返回数字
  return a + b // 返回值类型其实能推断出来，写出来是为了当契约
}

// ===== 形式二：箭头函数（返回值让 TS 推断）=====
const multiply = (a: number, b: number) => a * b // 推断返回值为 number

// ===== 形式三：先声明函数类型，再赋值实现 =====
type MathFn = (a: number, b: number) => number // 类型别名：接收两数字，返回数字
const subtract: MathFn = (a, b) => a - b // 有了类型标注，参数 a、b 不用再写类型

// ===== 形式四：作为参数的回调函数 =====
function repeat(times: number, callback: (index: number) => void): void {
  for (let i = 0; i < times; i++) { // 循环 times 次
    callback(i) // 每次把当前下标交给回调
  } // 回调类型是 (index: number) => void，表示「接收下标、不需要返回值」
}

repeat(3, (i) => console.log(i)) // ✅ i 自动推断为 number，不用手写类型
repeat(3, (i) => i.toUpperCase()) // ❌ 红线：number 上不存在 toUpperCase`,
          },
          {
            type: 'code',
            title: '7.3 可选参数、默认参数、剩余参数',
            language: 'ts',
            body: `// ===== 可选参数：参数名后加 ?，实际类型是 "T | undefined" =====
function greet(name: string, title?: string): string { // title 可以不传
  if (!title) return '你好，' + name // 没传 title 时走这条分支
  return '你好，' + title + name // 传了 title 才拼接
}
greet('小明') // ✅ 只传必填参数
greet('小明', '张老师') // ✅ 两个都传
greet() // ❌ 红线：name 是必填的

// ===== 规则：可选参数必须放在必填参数后面 =====
function bad(title?: string, name: string) {} // ❌ 红线：必选参数不能跟在可选参数后面

// ===== 默认参数：给了默认值就自动变可选，且类型能推断 =====
function paginate(page = 1, pageSize = 10) { // 不用写 : number，从默认值推断出来
  return { page, pageSize } // 返回一个对象，类型被推断为 { page: number; pageSize: number }
}
paginate() // ✅ 全部用默认值
paginate(2) // ✅ 只覆盖第一个
paginate(2, '20') // ❌ 红线：第二个参数必须是 number

// ===== 剩余参数：用 ...，类型必须是数组 =====
function sum(...numbers: number[]): number { // 接收任意多个数字
  return numbers.reduce((total, n) => total + n, 0) // reduce 累加，初始值 0
}
sum(1, 2, 3) // ✅ 返回 6
sum(1, '2') // ❌ 红线：第二个参数不是 number`,
          },
          {
            type: 'code',
            title: '7.4 函数类型别名的实战价值',
            language: 'ts',
            body: `// 场景：多个地方都要用「同一种回调」，抽成别名后改一处就够
type ChangeHandler = (value: string) => void // 输入变化回调：拿到新值，不返回东西
type SubmitHandler = (data: { name: string; age: number }) => Promise<void> // 提交回调：返回 Promise

interface FormProps { // 表单组件的 props
  onChange: ChangeHandler // 直接复用别名，比每处重复写箭头类型清爽
  onSubmit: SubmitHandler // 同上
  onCancel?: () => void // 无参数、无返回值的回调，最常见的形式
}

const handleChange: ChangeHandler = (value) => { // 标了别名，value 自动是 string
  console.log(value.trim()) // ✅ 有完整的字符串方法补全
}

const handleSubmit: SubmitHandler = async (data) => { // data 自动推断为那个对象类型
  console.log(data.name, data.age) // ✅ 两个字段都有补全
} // async 函数天然返回 Promise，符合别名要求

// 小技巧：回调返回值写 void 时，实现里返回什么都不报错（TS 故意允许）
const list = [1, 2, 3] // 一个数字数组
const onEach: (n: number) => void = (n) => n * 2 // ✅ 返回了数字也不报错，因为返回值会被忽略
list.forEach(onEach) // 这就是 forEach 能接受 "() => 任意值" 回调的原因`,
          },
          {
            type: 'text',
            title: '7.5 为什么回调参数不用写类型？',
            body: '这叫**上下文类型推断（contextual typing）**：当函数出现在一个「已经知道类型」的位置时，TS 会反过来推断它的参数类型。\n\n比如 `const f: MathFn = (a, b) => a + b`，因为左边已经声明是 `MathFn`，TS 就知道 `a`、`b` 都是 `number`，你再手写一遍反而啰嗦。\n\n同样的道理让下面这些写法都不需要注解：\n\n- `list.map((item) => item.id)`——`item` 从数组类型推断\n- `onClick={(e) => e.preventDefault()}`——`e` 从 `onClick` 的类型推断\n- `useState<number>(0)` 之后 `setCount((c) => c + 1)`——`c` 是 `number`\n\n**判断口诀：函数「定义在有类型的位置」就不用写参数类型，「独立定义」就必须写。**',
          },
          {
            type: 'table',
            title: '7.6 函数类型写法速查',
            headers: ['需求', '写法', '备注'],
            rows: [
              ['两个数字相加', '`(a: number, b: number) => number`', '最基础的形式'],
              ['无参数无返回', '`() => void`', '`onClose`、`onRefresh` 这类'],
              ['接收新值的回调', '`(value: string) => void`', '`onChange` 最常见形态'],
              ['异步函数', '`(id: number) => Promise<User>`', '`async` 函数返回值必须是 `Promise<T>`'],
              ['可选参数', '`(name: string, title?: string)`', '`?` 必须放在必填参数后面'],
              ['默认参数', '`(page = 1)`', '有默认值就不用写类型，也自动可选'],
              ['剩余参数', '`(...args: number[])`', '类型必须是数组'],
              ['取现成函数的返回值类型', '`ReturnType<typeof fn>`', '第 9 节工具类型会详讲'],
            ],
            note: '给组件写回调 props 时，`() => void` 和 `(value: T) => void` 这两种能覆盖八成场景。',
          },
          {
            type: 'text',
            title: '7.7 易错点汇总',
            body: '① 可选参数放在必填参数前面：直接语法报错，顺序必须是「必填在前、可选在后」。\n\n② 可选参数当必填用：`title?: string` 的真实类型是 `string | undefined`，直接 `title.length` 会报「可能为 undefined」。\n\n③ `async` 函数的返回值类型忘了包 `Promise`：写 `async function f(): string` 会报错，应该是 `Promise<string>`。\n\n④ 把返回值类型写在参数括号里：`function f(a: number: string)` 是语法错误，返回值写在括号外面。\n\n⑤ 给回调参数重复写类型：`list.map((item: Item) => ...)` 能跑但多余，而且数组类型变了这里不会跟着变。\n\n⑥ 用 `Function` 当类型：`Function` 相当于函数版的 `any`，一律改成具体的箭头类型。',
          },
          {
            type: 'list',
            title: '7.8 动手练习清单',
            ordered: true,
            items: [
              '写 `formatPrice(value: number, currency = \'￥\'): string`，试着不传第二个参数调用',
              '写 `type Validator = (value: string) => string | null`，实现一个「非空校验」函数',
              '写一个接收回调的 `retry(times: number, fn: () => void)` 并调用',
              '把可选参数放到必填参数前面，读一遍报错信息',
              '写一个 `async function fetchUser(id: number): Promise<{ name: string }>`',
              '把某个回调的类型从内联箭头改成 `type` 别名，感受可读性变化',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '参数必注解，返回值可推断；可选参数 `?` 放最后且真实类型含 `undefined`；默认参数自动可选；回调类型写 `(value: T) => void` 并抽成别名复用；`async` 返回值要包 `Promise<T>`；别用 `Function`。',
          },
        ],
      },
    },
    {
      id: 'ts-generics',
      title: '泛型入门：T 是什么、泛型约束、在 Hook 里用泛型',
      summary: '泛型 = 类型的参数；`function first<T>(list: T[]): T`；`extends` 加约束',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '泛型就是**类型的参数**。函数的参数是「调用时才知道的值」，泛型是「调用时才知道的类型」。`<T>` 里的 `T` 只是个名字，就像函数参数叫 `x` 一样随意。',
          },
          {
            type: 'text',
            title: '8.1 为什么需要泛型：三种失败的尝试',
            body: '需求：写一个函数 `first`，取出数组的第一个元素。\n\n**尝试一：写死类型。** `function first(list: string[]): string`——只能用于字符串数组，数字数组要再复制一份，对象数组再一份，重复得离谱。\n\n**尝试二：用 `any`。** `function first(list: any[]): any`——能通用了，但返回值变成 `any`，拿到结果之后没有任何补全和检查，等于白写 TS。\n\n**尝试三：用联合类型。** `string[] | number[]`——每加一种类型就要改函数签名，而且返回值还得自己收窄。\n\n泛型解决的正是这个矛盾：**既通用，又保留精确的类型信息**。`function first<T>(list: T[]): T | undefined`，传字符串数组就返回字符串，传用户数组就返回用户。',
          },
          {
            type: 'code',
            title: '8.2 怎么写：第一个泛型函数',
            language: 'ts',
            body: `// <T> 声明一个「类型参数」，T 的具体是什么由调用时决定
function first<T>(list: T[]): T | undefined { // 接收 T 数组，返回 T 或 undefined（数组可能为空）
  return list[0] // 取第一个元素；空数组时是 undefined，所以返回值要带 undefined
}

const a = first(['x', 'y']) // 传 string[] → T 被推断为 string → a 是 string | undefined
const b = first([1, 2, 3]) // 传 number[] → T 是 number → b 是 number | undefined
const c = first([{ id: 1 }]) // 传对象数组 → T 是 { id: number }
console.log(c?.id) // ✅ 有 id 的补全；因为可能是 undefined，用 ?. 访问

const d = first<string>(['x']) // 也可以手动指定 T，一般不用写，让它自动推断

// 多个类型参数：名字随便起，常见约定是 T、U、K、V
function pair<T, U>(a: T, b: U): [T, U] { // 把两个值组成元组
  return [a, b] // 返回元组，第 0 位是 T，第 1 位是 U
}
const p = pair('age', 18) // p 的类型是 [string, number]

// 对比 any 版本，看差别有多大
function firstAny(list: any[]): any { // 用 any 也能通用
  return list[0] // 但返回值是 any
}
const e = firstAny(['x']) // e 是 any → e.toFixed()、e.foo.bar 全都不报错，隐患巨大`,
          },
          {
            type: 'code',
            title: '8.3 泛型约束 `extends`：给 T 加个门槛',
            language: 'ts',
            body: `// 问题：想读 list 里每个元素的 length，但 T 可能是数字（数字没有 length）
function totalLength<T>(list: T[]): number { // 没有约束的 T
  return list.reduce((sum, item) => sum + item.length, 0) // ❌ 红线：T 上不存在属性 length
}

// 解决：用 extends 约束 T「至少要有 length 属性」
function totalLengthOk<T extends { length: number }>(list: T[]): number {
  return list.reduce((sum, item) => sum + item.length, 0) // ✅ 有约束，能安全读 length
}
totalLengthOk(['ab', 'cde']) // ✅ 字符串有 length，通过
totalLengthOk([[1], [2, 3]]) // ✅ 数组也有 length，通过
totalLengthOk([1, 2]) // ❌ 红线：number 不满足约束 { length: number }

// 最常用的约束：keyof 让 key 只能是对象已有的属性名
function getField<T, K extends keyof T>(obj: T, key: K): T[K] { // K 只能是 T 的键名
  return obj[key] // 返回值类型是 T[K]，也就是那个键对应的值类型
}
const user = { id: 1, name: '小明' } // 推断为 { id: number; name: string }
const id = getField(user, 'id') // ✅ id 的类型精确到 number，不是笼统的 any
const nm = getField(user, 'name') // ✅ nm 的类型是 string
const no = getField(user, 'age') // ❌ 红线："age"不能赋给类型 "id" | "name"

// 默认类型参数：不传就用默认值
function wrap<T = string>(value: T): T[] { // T 默认是 string
  return [value] // 包成一个单元素数组
}`,
          },
          {
            type: 'code',
            title: '8.4 泛型在 React Hook 里的样子',
            language: 'tsx',
            body: `import { useState } from 'react' // useState 本身就是一个泛型函数

interface User { id: number; name: string } // 先定义业务数据结构

// useState<T> 的作用：告诉 React「这个 state 里放的是什么」
const [user, setUser] = useState<User | null>(null) // 初始为空，以后放 User
// 如果不写泛型：useState(null) 会把类型推断成 null，setUser(realUser) 直接报红

const [list, setList] = useState<User[]>([]) // 空数组必须写泛型，否则推断成 never[]
const [count, setCount] = useState(0) // 有明确初始值时不用写，推断为 number

// 自己写的泛型 Hook：任何类型的数据都能存进 localStorage
function useLocalStorage<T>(key: string, initial: T) { // T 由 initial 的类型决定
  const [value, setValue] = useState<T>(() => { // state 类型跟着 T 走
    const raw = localStorage.getItem(key) // 先尝试读缓存，可能是 null
    return raw ? (JSON.parse(raw) as T) : initial // 有缓存就解析成 T，没有就用初始值
  })
  return [value, setValue] as const // as const 让返回值是元组而不是数组，解构时类型才准
}

const [theme, setTheme] = useLocalStorage('theme', 'light') // T 推断为 string
const [nums, setNums] = useLocalStorage<number[]>('nums', []) // 空数组时手动指定 T`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：泛型列表组件，字符串和对象都能渲染',
            body: `import { useState } from 'react'

interface ListProps<T> { // 泛型 props：T 是列表元素的类型
  items: T[] // 数据数组
  renderItem: (item: T) => string // 怎么把一项渲染成文字，参数类型跟着 T 走
}

function SimpleList<T>(props: ListProps<T>) { // 泛型组件：用 function 声明最省事
  return (
    <ul style={{ margin: '0 0 12px', paddingLeft: 20 }}>
      {/* map 的 item 自动是 T 类型，index 用作 key */}
      {props.items.map((item, index) => (
        <li key={index}>{props.renderItem(item)}</li>
      ))}
    </ul>
  )
}

interface User { id: number; name: string } // 业务数据结构
const users: User[] = [{ id: 1, name: '小明' }, { id: 2, name: '小红' }] // 对象数组
const fruits: string[] = ['苹果', '香蕉'] // 字符串数组

export default function Demo() { // 默认导出的演示组件
  const [showUsers, setShowUsers] = useState<boolean>(true) // 控制显示哪一组数据

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      {/* 同一个组件既能渲染 User[]，也能渲染 string[]，类型各自精确 */}
      {showUsers ? (
        <SimpleList items={users} renderItem={(u) => u.name + '（id ' + u.id + '）'} />
      ) : (
        <SimpleList items={fruits} renderItem={(f) => '水果：' + f} />
      )}
      <button onClick={() => setShowUsers(!showUsers)}>换一组数据</button>
    </div>
  )
}`,
          },
          {
            type: 'table',
            title: '8.5 泛型常见写法速查',
            headers: ['写法', '含义', '典型用途'],
            rows: [
              ['`<T>`', '一个类型参数，调用时推断', '`first<T>(list: T[])`'],
              ['`<T, U>`', '两个类型参数', '`pair<T, U>(a, b)`'],
              ['`<T extends X>`', 'T 必须满足 X', '`<T extends { id: number }>`'],
              ['`<K extends keyof T>`', 'K 只能是 T 的属性名', '`getField(obj, key)`'],
              ['`<T = string>`', 'T 的默认类型', '不传时用默认值'],
              ['`useState<T>(init)`', '指定 state 的类型', '`useState<User | null>(null)`'],
              ['`Promise<T>`', '异步结果的类型', '`Promise<User[]>`'],
              ['`Array<T>`', '数组的另一种写法', '等价于 `T[]`'],
              ['`axios.get<T>(url)`', '指定接口返回数据类型', '第 13 节详讲'],
            ],
            note: '`T` 这个名字没有魔力，写 `Item`、`Data` 都行。多个参数时用有意义的名字反而更好读。',
          },
          {
            type: 'text',
            title: '8.6 易错点汇总',
            body: '① 分不清「使用泛型」和「定义泛型」：`useState<User>(...)` 是使用（尖括号里填具体类型）；`function f<T>()` 是定义（尖括号里声明参数名）。\n\n② 在 `.tsx` 文件里写泛型箭头函数：`const f = <T>(x: T) => x` 会被当成 JSX 标签而报错，要写成 `<T,>` 或者干脆用 `function` 声明。\n\n③ 没加约束就访问属性：`T` 默认可能是任何类型，想读 `item.id` 必须先 `extends { id: number }`。\n\n④ 泛型用得过头：只有一种类型的场景直接写死类型就好，硬套泛型只会让人看不懂。\n\n⑤ 自定义 Hook 返回数组忘了 `as const`：会被推断成联合类型的数组，解构后类型不准。\n\n⑥ 空数组的 `useState` 不写泛型：`useState([])` 推断成 `never[]`，之后 `setList([user])` 必报红。',
          },
          {
            type: 'list',
            title: '8.7 动手练习清单',
            ordered: true,
            items: [
              '写 `function last<T>(list: T[]): T | undefined`，用字符串和对象数组各调一次',
              '写 `function pluck<T, K extends keyof T>(list: T[], key: K): T[K][]` 取出某列',
              '给一个无约束的泛型函数里写 `item.length`，看报错，再加 `extends` 修好',
              '把 `useState([])` 改成 `useState<User[]>([])`，对比 `setList` 的红线变化',
              '在 `.tsx` 里写 `const f = <T>(x: T) => x`，看报错，再改成 `function` 声明',
              '写一个泛型 `useToggle<T>(a: T, b: T)`，在两个值之间来回切换',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '泛型 = 类型的参数，让函数既通用又保留精确类型（比 `any` 强一万倍）。`<T extends X>` 加门槛，`K extends keyof T` 限定属性名。`useState<T>()` 就是最常用的泛型；空数组和 `null` 初始值一定要写泛型。',
          },
        ],
      },
    },
    {
      id: 'ts-utility-types',
      title: '常用工具类型：Partial / Required / Pick / Omit / Record / ReturnType / keyof',
      summary: '基于已有类型「加工」出新类型，不用手写第二遍',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '工具类型是 TS 内置的「类型加工厂」：给它一个已有类型，它返回一个变形后的新类型。**核心价值是别再复制粘贴类型定义**。',
          },
          {
            type: 'text',
            title: '9.1 为什么需要工具类型',
            body: '真实业务里同一份数据会有好几种形态：\n\n- 列表接口返回**完整的** `User`\n- 创建用户时提交的数据**没有** `id`（后端生成）\n- 编辑用户时提交的数据**每个字段都可选**（只改动过的字段）\n- 下拉选项只需要 `id` 和 `name` **两个字段**\n\n手写的话就是四份几乎一样的 `interface`，改一个字段要改四处，必漏。\n\n工具类型让你从一份「源类型」派生出其余所有形态：`Omit<User, \'id\'>`、`Partial<User>`、`Pick<User, \'id\' | \'name\'>`。源类型改了，派生类型自动跟着变。',
          },
          {
            type: 'code',
            title: '9.2 `Partial` / `Required` / `Readonly`：整体改造可选性',
            language: 'ts',
            body: `interface User { // 源类型：一份完整的用户
  id: number // 必填
  name: string // 必填
  email?: string // 本来就是可选
}

// Partial<T>：把所有属性变成可选 —— 最常用，适合「局部更新」
type UserPatch = Partial<User> // 等价于 { id?: number; name?: string; email?: string }
const patch: UserPatch = { name: '小红' } // ✅ 只传要改的字段，不用凑齐所有属性

function updateUser(id: number, data: Partial<User>) { // 更新接口的经典签名
  console.log(id, data) // 调用方想改哪个字段就传哪个
}
updateUser(1, { email: 'a@b.com' }) // ✅ 只改邮箱

// Required<T>：把所有属性变成必填 —— 和 Partial 相反
type FullUser = Required<User> // email 也变成必填了
const full: FullUser = { id: 1, name: '小明' } // ❌ 红线：缺少属性 email

// Readonly<T>：把所有属性变成只读 —— 适合配置对象、常量数据
type Config = Readonly<{ apiUrl: string; timeout: number }> // 两个字段都不能改
const config: Config = { apiUrl: '/api', timeout: 3000 } // 初始化时可以赋值
config.timeout = 5000 // ❌ 红线：无法为"timeout"赋值，因为它是只读属性`,
          },
          {
            type: 'code',
            title: '9.3 `Pick` / `Omit` / `Record`：挑字段、去字段、造字典',
            language: 'ts',
            body: `interface User { // 还是这份源类型
  id: number // 主键
  name: string // 名字
  email: string // 邮箱
  password: string // 密码（绝不能传给前端展示）
}

// Pick<T, K>：从 T 里「挑出」几个字段，第二个参数用 | 连接属性名
type UserOption = Pick<User, 'id' | 'name'> // 只要 id 和 name，适合下拉选项
const option: UserOption = { id: 1, name: '小明' } // ✅ 只需这两个字段

// Omit<T, K>：从 T 里「去掉」几个字段，Pick 的反面
type PublicUser = Omit<User, 'password'> // 去掉密码，剩下 id、name、email
type CreateUserDto = Omit<User, 'id'> // 创建时没有 id（后端生成），去掉它
const dto: CreateUserDto = { name: '小明', email: 'a@b.com', password: '123' } // ✅ 不用给 id

// Record<K, V>：造一个「键是 K、值是 V」的字典类型
type Status = 'loading' | 'success' | 'error' // 三种状态
const statusText: Record<Status, string> = { // 每种状态对应一句文案
  loading: '加载中', // 三个键一个都不能少，少了会报红（这是它比索引签名强的地方）
  success: '成功', // ✅
  error: '失败', // ✅
}
console.log(statusText.loading) // ✅ 有补全，写错键名会报红

type IdMap = Record<number, User> // 键是数字，值是 User —— 「id 到对象」的映射表`,
          },
          {
            type: 'code',
            title: '9.4 `keyof` / `typeof` / `ReturnType`：从值和函数里「反推」类型',
            language: 'ts',
            body: `interface User { id: number; name: string; email: string } // 源类型

// keyof T：拿到 T 所有属性名组成的联合类型
type UserKey = keyof User // 结果是 'id' | 'name' | 'email'
const k: UserKey = 'name' // ✅ 三个之一
const k2: UserKey = 'age' // ❌ 红线：不在候选里

// typeof 值：从一个「已有的值」反推出它的类型（注意是类型位置的 typeof）
const defaultUser = { id: 0, name: '游客', email: '' } // 先有一个普通对象
type DefaultUser = typeof defaultUser // 反推出 { id: number; name: string; email: string }
const another: DefaultUser = { id: 1, name: '小明', email: 'a@b.com' } // ✅ 复用这个类型

// keyof typeof 组合拳：从「值」拿到它的键名联合，配置对象场景超常用
const themeColors = { primary: '#1677ff', danger: '#ff4d4f' } // 一份颜色配置
type ThemeName = keyof typeof themeColors // 结果是 'primary' | 'danger'
function setTheme(name: ThemeName) { // 参数只能是配置里真实存在的键
  console.log(themeColors[name]) // ✅ 一定取得到值，不会是 undefined
}

// ReturnType<typeof fn>：拿到某个函数的返回值类型
function createUser(name: string) { // 一个工厂函数
  return { id: Date.now(), name, createdAt: new Date().toISOString() } // 返回一个对象
}
type NewUser = ReturnType<typeof createUser> // 自动得到那个对象的类型，不用手写一遍
const nu: NewUser = createUser('小明') // ✅ 函数返回值改了，NewUser 自动跟着变

// Parameters<typeof fn>：拿到参数类型组成的元组（同系列，偶尔有用）
type CreateArgs = Parameters<typeof createUser> // 结果是 [name: string]`,
          },
          {
            type: 'code',
            title: '9.5 组合使用：一份源类型派生出整套业务类型',
            language: 'ts',
            body: `interface User { // 唯一的「真相来源」：改字段只改这里
  id: number // 主键，后端生成
  name: string // 姓名
  email: string // 邮箱
  password: string // 密码，只在注册/登录时用
  createdAt: string // 创建时间，后端生成
}

// ① 前端展示用：去掉敏感字段
type UserView = Omit<User, 'password'> // 有 id、name、email、createdAt

// ② 创建接口提交用：去掉后端生成的字段
type UserCreateDto = Omit<User, 'id' | 'createdAt'> // 只需 name、email、password

// ③ 编辑接口提交用：在创建的基础上全部可选，再去掉密码
type UserUpdateDto = Partial<Omit<UserCreateDto, 'password'>> // 工具类型可以嵌套使用

// ④ 下拉选项用：只要两个字段
type UserOption = Pick<User, 'id' | 'name'> // 轻量结构，传给 Select 组件

// ⑤ 表单校验用：每个可编辑字段对应一条错误信息
type UserErrors = Partial<Record<keyof UserCreateDto, string>> // 键来自 DTO，值是错误文案
const errors: UserErrors = { email: '邮箱格式不正确' } // ✅ 只填出错的字段

// 好处：以后 User 里加一个 phone 字段，上面五个派生类型全部自动更新`,
          },
          {
            type: 'table',
            title: '9.6 工具类型「什么场景用」对照表',
            intro: '这张表是本节的核心，写业务时直接照着查。',
            headers: ['工具类型', '作用', '什么场景用'],
            rows: [
              ['`Partial<T>`', '所有属性变可选', '局部更新接口、编辑表单的草稿数据'],
              ['`Required<T>`', '所有属性变必填', '校验通过后的「完整数据」'],
              ['`Readonly<T>`', '所有属性变只读', '全局配置、常量数据、防误改'],
              ['`Pick<T, K>`', '挑出指定字段', '下拉选项、列表只展示部分字段'],
              ['`Omit<T, K>`', '去掉指定字段', '去掉 `password`、去掉后端生成的 `id`'],
              ['`Record<K, V>`', '造键值字典', '状态文案映射、id 到对象的索引表'],
              ['`keyof T`', '取所有属性名的联合', '限定「排序字段」「列名」只能是真实字段'],
              ['`typeof 值`', '从值反推类型', '有默认对象 / 配置对象时复用它的结构'],
              ['`keyof typeof 值`', '取配置对象的键名联合', '主题名、路由名、图标名'],
              ['`ReturnType<typeof fn>`', '取函数返回值类型', '工厂函数、`useXxx` Hook 的返回值'],
              ['`Parameters<typeof fn>`', '取参数元组类型', '包装 / 转发已有函数'],
              ['`NonNullable<T>`', '去掉 `null` 和 `undefined`', '判断过之后的「一定有值」'],
            ],
            note: '前六个（`Partial`、`Pick`、`Omit`、`Record`、`keyof`、`ReturnType`）覆盖日常九成需求，先把这几个用熟。',
          },
          {
            type: 'text',
            title: '9.7 易错点汇总',
            body: '① `Pick` / `Omit` 的第二个参数要写**属性名字符串**，用 `|` 连接：`Omit<User, \'id\' | \'createdAt\'>`，不是数组。\n\n② `Record` 的键用联合类型时**必须写全**：`Record<Status, string>` 少一个状态就报「缺少属性」——这正是它的优点。\n\n③ 混淆两个 `typeof`：值位置的 `typeof x` 返回字符串（运行时），类型位置的 `typeof x` 返回类型（编译时），写在 `type` 后面的是后者。\n\n④ `ReturnType` 里忘了 `typeof`：必须写 `ReturnType<typeof fn>`，直接写 `ReturnType<fn>` 是错的（`fn` 是值不是类型）。\n\n⑤ `Partial` 用在了不该用的地方：接口要求必填的字段全变可选，会让漏传字段的 bug 溜过去。\n\n⑥ 无脑嵌套三四层工具类型：可读性会崩，超过两层就起个中间别名。',
          },
          {
            type: 'list',
            title: '9.8 动手练习清单',
            ordered: true,
            items: [
              '定义 `interface Product` 含 6 个字段，用 `Omit` 派生「创建 DTO」',
              '用 `Partial` 写一个 `updateProduct(id: number, data: Partial<Product>)`',
              '用 `Record<Status, string>` 写状态文案表，故意少写一个键看报错',
              '用 `Pick` 派生 `ProductOption`，只保留 `id` 和 `name`',
              '写一份配置对象，用 `keyof typeof` 派生出它的键名联合类型',
              '写一个工厂函数，用 `ReturnType<typeof fn>` 拿到它的返回值类型',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '一份源类型 + 工具类型 = 整套派生类型。`Partial` 变可选、`Required` 变必填、`Pick` 挑字段、`Omit` 去字段、`Record` 造字典、`keyof` 取键名、`typeof` 从值反推、`ReturnType<typeof fn>` 取返回值。永远不要复制粘贴类型定义。',
          },
        ],
      },
    },
    {
      id: 'ts-react-props',
      title: 'React 实战一：组件 Props 怎么标类型',
      summary: '`interface Props` + `children: React.ReactNode`；`React.FC` 到底该不该用',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '写一个 `interface Props`，然后 `function Card(props: Props)`——这就是 React + TS 里最标准、最推荐的写法。**不需要 `React.FC`**。',
          },
          {
            type: 'text',
            title: '10.1 是什么：Props 类型就是「组件的说明书」',
            body: 'JS 里写组件，别人要用你的组件只能去翻源码：这个 `variant` 能传什么？`onClose` 是必传的吗？`children` 支持吗？\n\n加上 Props 类型之后，这些问题全都由编辑器回答：\n\n- 输入 `<Card ` 会自动列出所有可传属性\n- 漏传必填属性会立刻报红\n- `variant` 是字面量联合时，输入引号会弹出候选值\n- 鼠标悬停在组件名上能看到完整的 props 列表\n\n**Props 类型是整个 React + TS 里投入产出比最高的部分**，只学这一节都值。',
          },
          {
            type: 'code',
            title: '10.2 标准写法：`interface Props` + 解构',
            language: 'tsx',
            body: `import type { ReactNode } from 'react' // import type 表示「只导入类型」，编译时会被完全删掉

interface CardProps { // 命名约定：组件名 + Props
  title: string // 必填：标题
  description?: string // 可选：描述，加 ? 表示可以不传
  variant?: 'default' | 'primary' | 'danger' // 可选 + 字面量联合：只能传这三个值
  count?: number // 可选数字
  disabled?: boolean // 可选布尔
  onClose?: () => void // 可选回调：无参数、无返回值
  onSelect?: (id: number) => void // 可选回调：带一个数字参数
  children?: ReactNode // 可选：标签之间的内容，类型固定用 ReactNode
}

// 标准写法：参数解构 + 默认值，类型标在参数上
function Card({ title, description, variant = 'default', children, onClose }: CardProps) {
  return (
    <div className={'card card--' + variant}> {/* 用 variant 拼 class */}
      <h3>{title}</h3> {/* 必填属性，直接用 */}
      {/* 可选属性要判断后再渲染，&& 短路是最常见的写法 */}
      {description && <p>{description}</p>}
      {/* children 直接放进内容区 */}
      <div>{children}</div>
      {/* 可选回调：父组件没传时按钮就不渲染 */}
      {onClose && <button onClick={onClose}>关闭</button>}
    </div>
  )
}

export default Card // 默认导出组件

// 使用时的检查效果：
// <Card />                         ❌ 红线：缺少必需的属性 title
// <Card title="标题" variant="x" /> ❌ 红线：'x' 不在候选值里
// <Card title="标题" onClose={1} /> ❌ 红线：数字不能赋给 () => void`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：带完整 Props 类型的卡片组件真的能跑',
            body: `import { useState } from 'react'
import type { ReactNode } from 'react'

interface CardProps { // 组件的「说明书」
  title: string // 必填标题
  variant?: 'default' | 'primary' // 可选：两种外观
  onClose?: () => void // 可选：关闭回调
  children?: ReactNode // 可选：卡片内容
}

function Card({ title, variant = 'default', onClose, children }: CardProps) {
  const bg = variant === 'primary' ? '#e6f4ff' : '#f7f7f7' // 根据 variant 选背景色
  return (
    <div style={{ background: bg, padding: 12, borderRadius: 8, marginBottom: 8 }}>
      <strong>{title}</strong> {/* 必填属性直接渲染 */}
      <div style={{ margin: '6px 0', color: '#555' }}>{children}</div>
      {/* 可选回调：父组件传了才渲染按钮 */}
      {onClose && <button onClick={onClose}>关闭</button>}
    </div>
  )
}

export default function Demo() { // live Demo 的入口组件
  const [visible, setVisible] = useState<boolean>(true) // 控制第二张卡片是否显示

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      {/* 只传必填 title，其余用默认值 */}
      <Card title="默认样式卡片">这是 children 内容</Card>
      {/* 传了 variant 和 onClose，点击后隐藏自己 */}
      {visible && (
        <Card title="主色卡片" variant="primary" onClose={() => setVisible(false)}>
          点右下角按钮把我关掉
        </Card>
      )}
      {!visible && <button onClick={() => setVisible(true)}>再显示出来</button>}
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '10.3 `children` 该用什么类型？',
            body: '答案：**`React.ReactNode`**，这是最宽松也最实用的选择。\n\n它能容纳 React 里所有能被渲染的东西：JSX 元素、字符串、数字、数组、`null`、`undefined`、布尔值。\n\n几个相关类型的区别：\n\n- `ReactNode`：**默认选它**。任何可渲染内容。\n- `ReactElement`：只接受单个 JSX 元素，字符串会报错。要求「必须传一个元素」时用。\n- `JSX.Element`：和 `ReactElement` 基本等价，是组件返回值的类型。\n- `string`：明确只接受文字时用，比如 `children: string`。\n\n还要注意：`children` 要不要加 `?` 取决于业务。写 `children: ReactNode`（不加 `?`）表示「必须传内容」，写 `children?: ReactNode` 表示可以是空壳。',
          },
          {
            type: 'code',
            title: '10.4 默认值的三种写法',
            language: 'tsx',
            body: `interface ButtonProps { // 按钮组件的 props
  text: string // 必填文案
  size?: 'small' | 'large' // 可选尺寸
  count?: number // 可选数量
  onClick?: () => void // 可选点击回调
}

// ===== 写法一：解构时给默认值（✅ 推荐，最直观）=====
function ButtonA({ text, size = 'small', count = 0 }: ButtonProps) { // 默认值写在解构里
  return <button>{text} {size} {count}</button> // size 和 count 在函数体里一定有值
} // 好处：一眼看到默认值，且函数体内不用再判断 undefined

// ===== 写法二：函数体里用 ?? 兜底 =====
function ButtonB(props: ButtonProps) { // 不解构，整体接收 props
  const size = props.size ?? 'small' // ?? 只在左边是 null/undefined 时取右边
  return <button>{props.text} {size}</button> // 注意：不要用 ||，因为 0 和 '' 会被当成假值
}

// ===== 写法三：给必填字段配默认值（把类型标成必填，值由外层保证）=====
interface InnerProps { size: 'small' | 'large' } // 内部组件要求必填
function Inner({ size }: InnerProps) { // 函数体里 size 一定有值
  return <span>{size}</span> // 无需任何判断
}

// ⚠️ 已废弃的老写法：Component.defaultProps
// 函数组件上的 defaultProps 在新版 React 里已被废弃，不要再用，改用解构默认值`,
          },
          {
            type: 'text',
            title: '10.5 `React.FC` 到底该不该用？',
            body: '`React.FC<Props>` 是早期社区流行的写法：`const Card: React.FC<CardProps> = ({ title }) => ...`。\n\n**现在的主流结论是：不用它，直接标注参数类型。** 理由：\n\n① React 18 之后 `React.FC` **不再自动包含 `children`**，你还是得自己在 Props 里声明，它的最大卖点消失了。\n\n② 它让泛型组件变得难写：`React.FC<ListProps<T>>` 这种写法非常别扭。\n\n③ 它绑定了「箭头函数 + 变量」的形式，函数声明写法更简洁，也更适合 `export default function`。\n\n④ 官方 TS 文档和 React 文档现在给的示例都是直接标参数类型。\n\n但如果你接手的老项目里全是 `React.FC`，**不要为了「正确」去大改**——保持一致更重要。',
          },
          {
            type: 'code',
            title: '10.6 三种组件写法对照',
            language: 'tsx',
            body: `import type { ReactNode } from 'react' // 只导入类型

interface Props { title: string; children?: ReactNode } // 共用的 props 类型

// ===== ✅ 推荐：函数声明 + 参数注解 =====
function CardA({ title, children }: Props) { // 类型标在参数上，最直白
  return <div><h3>{title}</h3>{children}</div> // 正常写 JSX
}

// ===== ✅ 也可以：箭头函数 + 参数注解 =====
const CardB = ({ title, children }: Props) => { // 和上面等价，只是函数形式不同
  return <div><h3>{title}</h3>{children}</div> // 团队喜欢箭头函数就用这个
}

// ===== 🟡 老写法：React.FC（能用，但不再推荐）=====
const CardC: React.FC<Props> = ({ title, children }) => { // 类型标在变量上
  return <div><h3>{title}</h3>{children}</div> // React 18 后 children 仍需自己声明
}

// ===== ✅ 需要 export default 时的最佳形态 =====
export default function CardD({ title, children }: Props) { // 一行搞定导出 + 类型
  return <div><h3>{title}</h3>{children}</div> // 项目里最常见的写法
}`,
          },
          {
            type: 'table',
            title: '10.7 常见 Props 类型对照表',
            headers: ['props 用途', '类型写法', '说明'],
            rows: [
              ['文本 / 数字 / 开关', '`title: string`、`count: number`、`open: boolean`', '最基础'],
              ['可选属性', '`description?: string`', '真实类型含 `undefined`'],
              ['几个固定选项', '`variant?: \'a\' | \'b\'`', '别用 `string`，用字面量联合'],
              ['无参回调', '`onClose?: () => void`', '`onClose`、`onRefresh`'],
              ['带参回调', '`onChange: (value: string) => void`', '把新值交回父组件'],
              ['嵌套内容', '`children?: React.ReactNode`', '默认选 `ReactNode`'],
              ['数组数据', '`items: User[]`', '元素类型要具体'],
              ['自定义渲染函数', '`renderItem: (item: T) => ReactNode`', 'render props 模式'],
              ['样式相关', '`className?: string`、`style?: React.CSSProperties`', '`style` 有专门的类型'],
              ['组件本身', '`icon?: React.ReactNode`', '传图标就用 `ReactNode`'],
              ['透传原生属性', '`React.ComponentProps<\'button\'>`', '进阶：继承原生 button 的全部属性'],
            ],
            note: '不确定某个 props 类型怎么写时，去看 `antd` 的类型定义（按住 Ctrl 点组件名跳转），那是最好的参考书。',
          },
          {
            type: 'list',
            title: '10.8 Props 类型自检清单',
            ordered: true,
            items: [
              '是否定义了 `interface XxxProps` 而不是把类型内联在参数里？',
              '`children` 是否用了 `React.ReactNode`？',
              '「几个固定选项」的 props 是否用了字面量联合而不是 `string`？',
              '可选 props 是否加了 `?`，并且在函数体里给了默认值或做了判断？',
              '回调 props 是否写成了 `onXxx` 且类型是 `(...) => void`？',
              '有没有还在用 `defaultProps`（已废弃）或不必要的 `React.FC`？',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '`interface XxxProps` + `function Xxx(props: XxxProps)` 是标准答案；`children` 用 `React.ReactNode`；固定选项用字面量联合；默认值写在解构里；`React.FC` 和 `defaultProps` 都可以忘掉。',
          },
        ],
      },
    },
    {
      id: 'ts-react-hooks',
      title: 'React 实战二：useState / useRef / useEffect / useReducer 的类型',
      summary: '`useState` 泛型什么时候必写；`useRef<HTMLInputElement>(null)` 配 `?.`；action 用联合类型',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '`useState` **有明确初始值时不写泛型**，初始值是 `null` 或空数组时**必须写泛型**。`useRef` 拿 DOM 一律写 `useRef<HTMLInputElement>(null)`，用的时候配 `?.`。',
          },
          {
            type: 'code',
            title: '11.1 `useState`：什么时候要写泛型',
            language: 'tsx',
            body: `import { useState } from 'react' // useState 本身是泛型函数

interface User { id: number; name: string } // 业务数据结构

// ===== 不用写泛型：初始值已经说明了一切 =====
const [count, setCount] = useState(0) // 推断为 number
const [name, setName] = useState('') // 推断为 string
const [open, setOpen] = useState(false) // 推断为 boolean
const [user1, setUser1] = useState({ id: 1, name: '小明' }) // 推断为那个对象类型

// ===== 必须写泛型（一）：初始值是 null =====
const [user, setUser] = useState<User | null>(null) // 明确「以后是 User，现在是空」
// 反例：useState(null) 会被推断成 null 类型，之后 setUser(realUser) 直接报红
console.log(user?.name) // 读的时候必须用 ?.，因为可能是 null

// ===== 必须写泛型（二）：初始值是空数组 =====
const [list, setList] = useState<User[]>([]) // 明确是 User 数组
// 反例：useState([]) 推断成 never[]，之后 setList([user]) 必报红

// ===== 必须写泛型（三）：想让类型比推断更宽 =====
const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')
// 反例：useState('idle') 推断成 string，会允许 setStatus('随便写')

setCount(count + 1) // ✅ 传数字
setCount('1') // ❌ 红线：字符串不能赋给 number
setCount((c) => c + 1) // ✅ 函数式更新：c 自动推断为 number`,
          },
          {
            type: 'code',
            title: '11.2 `useRef`：DOM 引用与可变值两种用法',
            language: 'tsx',
            body: `import { useEffect, useRef } from 'react' // useRef 也是泛型函数

function Demo() { // 演示组件
  // ===== 用法一：指向 DOM 节点，泛型写具体的元素类型，初始值必须是 null =====
  const inputRef = useRef<HTMLInputElement>(null) // input 元素用 HTMLInputElement
  const divRef = useRef<HTMLDivElement>(null) // div 用 HTMLDivElement
  const btnRef = useRef<HTMLButtonElement>(null) // button 用 HTMLButtonElement

  useEffect(() => { // 挂载后 DOM 才存在，聚焦要放在 effect 里
    inputRef.current?.focus() // ✅ 用 ?. ：current 的类型是 HTMLInputElement | null
    inputRef.current.focus() // ❌ 红线：对象可能为"null"
    inputRef.current!.focus() // 🟡 ! 表示「我保证不是 null」，能过检查但失去保护，慎用
  }, []) // 空依赖：只在挂载时执行一次

  // ===== 用法二：存不需要触发渲染的可变值，泛型跟着值的类型走 =====
  const timerRef = useRef<number | null>(null) // 定时器 id，浏览器里 setInterval 返回数字
  const countRef = useRef<number>(0) // 计数器初始 0，类型就是 number（不会是 null）

  function start() { // 启动定时器
    if (timerRef.current !== null) return // 先判断，避免重复创建
    timerRef.current = window.setInterval(() => { // 用 window.setInterval 返回值才是 number
      countRef.current += 1 // 改 ref 不会触发重渲染
    }, 1000) // 每秒一次
  }

  return <input ref={inputRef} /> // 把 ref 绑到 input 上，React 会填充 current
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：useState 泛型 + useRef 操作 DOM',
            body: `import { useRef, useState } from 'react'

interface Todo { id: number; text: string } // 待办项的数据结构

export default function Demo() { // 默认导出组件
  const [list, setList] = useState<Todo[]>([]) // 空数组必须写泛型，否则是 never[]
  const [text, setText] = useState<string>('') // 输入框内容，泛型写不写都行
  const inputRef = useRef<HTMLInputElement>(null) // DOM 引用：类型是 HTMLInputElement | null

  function add() { // 新增一条待办
    if (!text.trim()) return // 空内容直接返回
    setList([...list, { id: Date.now(), text }]) // 用展开运算符生成新数组，符合 Todo[]
    setText('') // 清空输入框
    inputRef.current?.focus() // ?. 安全调用：current 可能为 null
  }

  return (
    <div style={{ padding: 16, fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {/* ref 绑定到 input；value + onChange 组成受控输入 */}
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入待办后回车或点添加"
          onKeyDown={(e) => e.key === 'Enter' && add()}
        />
        <button onClick={add}>添加</button>
      </div>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        {/* item 自动推断为 Todo，所以 item.text 有补全 */}
        {list.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
      {list.length === 0 && <p style={{ color: '#999' }}>还没有待办</p>}
    </div>
  )
}`,
          },
          {
            type: 'text',
            title: '11.3 `!` 非空断言和 `?.` 可选链怎么选',
            body: '两个都在处理「可能是 null」，但性质完全不同：\n\n**`?.`（可选链）**：安全访问。`ref.current?.focus()` 的意思是「有值才调用，没值就整体返回 `undefined`」。**默认用这个。**\n\n**`!`（非空断言）**：跳过检查。`ref.current!.focus()` 的意思是「我向 TS 保证这里不是 null，你别管了」。如果你保证错了，运行时照样崩，而且 TS 不会再提醒你。\n\n什么时候可以用 `!`？只在你**有代码之外的把握**时，比如「这个 ref 绑在最外层 div 上，effect 里必然已挂载」。即使这样，写 `?.` 通常也不吃亏。\n\n新手建议：**先一律用 `?.`**，等你能清楚说出「为什么这里绝对不为 null」再考虑 `!`。',
          },
          {
            type: 'code',
            title: '11.4 `useEffect` 的类型要点',
            language: 'tsx',
            body: `import { useEffect, useState } from 'react' // 导入 Hook

function Demo({ userId }: { userId: number }) { // props 内联标注类型
  const [data, setData] = useState<string | null>(null) // 数据可能还没来，用联合类型

  // 要点一：effect 回调的返回值只能是「清理函数」或「什么都不返回」
  useEffect(() => { // 回调本身不用标类型，React 已经声明好了
    const timer = window.setTimeout(() => { // window.setTimeout 返回 number
      setData('加载完成 ' + userId) // 更新 state，类型必须匹配 string | null
    }, 500) // 500 毫秒后执行
    return () => window.clearTimeout(timer) // ✅ 返回清理函数，类型是 () => void
  }, [userId]) // 依赖数组：userId 变化时重新执行

  // 要点二：effect 不能是 async 函数（async 返回 Promise，不是清理函数）
  useEffect(() => { // ❌ 反例：useEffect(async () => {...}) 会报类型错误
    async function load() { // ✅ 正确做法：在里面定义 async 函数
      const res = await fetch('/api/user/' + userId) // 发请求
      const json = (await res.json()) as { name: string } // 断言返回结构（第 13 节讲更好的做法）
      setData(json.name) // 写入 state
    }
    load() // 立即调用
  }, [userId]) // 依赖 userId

  return <div>{data ?? '加载中'}</div> // data 可能是 null，用 ?? 兜底
}`,
          },
          {
            type: 'code',
            title: '11.5 `useReducer`：action 用「判别联合类型」',
            language: 'tsx',
            body: `import { useReducer } from 'react' // useReducer 适合状态复杂、动作多的场景

interface State { // ① 先定义 state 的结构
  count: number // 当前计数
  step: number // 每次增减的步长
}

// ② action 用「判别联合类型」：每个成员一个 type 字面量，各带自己的载荷
type Action =
  | { type: 'increment' } // 加一步，不需要额外数据
  | { type: 'decrement' } // 减一步
  | { type: 'setStep'; payload: number } // 设置步长，带一个数字载荷
  | { type: 'reset' } // 重置

const initialState: State = { count: 0, step: 1 } // ③ 初始状态

// ④ reducer：参数和返回值都标类型，switch 里 TS 会自动收窄 action
function reducer(state: State, action: Action): State {
  switch (action.type) { // 按 type 分流
    case 'increment': // 这个分支里 action 是 { type: 'increment' }
      return { ...state, count: state.count + state.step } // 返回新对象，不改原 state
    case 'decrement': // 减少
      return { ...state, count: state.count - state.step } // 同样返回新对象
    case 'setStep': // 这个分支里 action 有 payload，能安全读取
      return { ...state, step: action.payload } // ✅ payload 类型是 number
    case 'reset': // 重置
      return initialState // 直接返回初始状态
    default: // 兜底：所有分支都覆盖后，这里的 action 类型是 never
      return state // 保证函数总有返回值
  }
}

function Counter() { // 使用 useReducer 的组件
  const [state, dispatch] = useReducer(reducer, initialState) // 类型全部自动推断出来
  dispatch({ type: 'increment' }) // ✅ 合法 action
  dispatch({ type: 'setStep', payload: 5 }) // ✅ 带载荷
  dispatch({ type: 'setStep' }) // ❌ 红线：缺少属性 payload
  dispatch({ type: 'unknown' }) // ❌ 红线：不在 Action 联合类型里
  return <span>{state.count}</span> // 渲染当前计数
}`,
          },
          {
            type: 'table',
            title: '11.6 Hooks 类型速查表',
            headers: ['Hook', '写法', '要点'],
            rows: [
              ['`useState` 有初始值', '`useState(0)`', '不写泛型，靠推断'],
              ['`useState` 初始 `null`', '`useState<User | null>(null)`', '**必写泛型**'],
              ['`useState` 空数组', '`useState<User[]>([])`', '**必写泛型**，否则 `never[]`'],
              ['`useState` 状态机', '`useState<\'idle\' | \'done\'>(\'idle\')`', '避免推断成 `string`'],
              ['`useRef` 拿 DOM', '`useRef<HTMLInputElement>(null)`', '用时配 `?.`'],
              ['`useRef` 存可变值', '`useRef<number | null>(null)`', '定时器 id 用 `window.setInterval`'],
              ['`useEffect`', '回调不标类型', '返回清理函数，**不能是 `async`**'],
              ['`useReducer`', 'state 用 `interface`，action 用判别联合', '`switch` 里自动收窄'],
              ['`useCallback`', '`useCallback((id: number) => {...}, [])`', '参数要标类型'],
              ['`useMemo`', '`useMemo(() => compute(a), [a])`', '返回值自动推断'],
              ['`useContext`', '`createContext<Ctx | null>(null)`', '消费时先判断非 `null`'],
            ],
            note: '一条通用规律：**初始值能说明类型就不写泛型，说明不了（`null` / 空数组）就必须写**。',
          },
          {
            type: 'text',
            title: '11.7 易错点汇总',
            body: '① `useState([])` 不写泛型：推断成 `never[]`，之后往里放东西必报红。\n\n② `useState(null)` 不写泛型：推断成 `null`，`setUser(user)` 报红。\n\n③ `useRef<HTMLInputElement>()` 忘了传 `null`：会得到「只读 ref」类型，绑到 JSX 上报错，必须写 `useRef<HTMLInputElement>(null)`。\n\n④ 直接 `ref.current.focus()`：报「对象可能为 null」，要用 `?.`。\n\n⑤ `useEffect(async () => {})`：类型报错，因为 effect 的返回值必须是清理函数。\n\n⑥ Node 和浏览器的 `setInterval` 返回值类型不同：在浏览器里用 `window.setInterval` 才是 `number`，直接用 `setInterval` 可能被推断成 `NodeJS.Timeout`。\n\n⑦ `useReducer` 的 action 用 `{ type: string; payload?: any }`：等于放弃检查，一定要用判别联合类型。',
          },
          {
            type: 'list',
            title: '11.8 动手练习清单',
            ordered: true,
            items: [
              '写 `useState<User | null>(null)`，故意去掉泛型看 `setUser` 的报错',
              '写 `useState<Todo[]>([])` 并实现增删，感受 `map` 里的补全',
              '用 `useRef<HTMLInputElement>(null)` 做「进页面自动聚焦」',
              '把 `?.` 换成 `!`，再换成什么都不写，对比三次的红线和运行结果',
              '写一个 `useReducer` 计数器，action 用判别联合，故意漏传 `payload` 看报错',
              '把 `useEffect` 写成 `async` 箭头函数，读一遍报错信息，再改成内部 `async function`',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '`useState`：初始值说明不了类型（`null` / 空数组 / 状态机）就写泛型。`useRef<HTMLInputElement>(null)` + `?.` 是拿 DOM 的固定搭配。`useEffect` 不能是 `async`。`useReducer` 的 action 一律用判别联合类型。',
          },
        ],
      },
    },
    {
      id: 'ts-react-events',
      title: 'React 实战三：事件类型与受控表单完整 TS 版',
      summary: '`React.ChangeEvent<HTMLInputElement>`、`MouseEvent`、`FormEvent` 三件套',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '事件类型的公式是 **`React.事件名Event<元素类型>`**，比如 `React.ChangeEvent<HTMLInputElement>`。**写在 JSX 里的内联箭头函数不用标类型**，抽成独立函数时才需要。',
          },
          {
            type: 'text',
            title: '12.1 为什么事件类型这么长？',
            body: '两个尖括号里的信息缺一不可：\n\n**外层是事件种类**：`ChangeEvent`（值变化）、`MouseEvent`（鼠标）、`FormEvent`（表单提交）、`KeyboardEvent`（键盘）、`FocusEvent`（聚焦失焦）。它决定事件对象上有哪些属性，比如 `MouseEvent` 才有 `clientX`。\n\n**内层是元素种类**：`HTMLInputElement`、`HTMLButtonElement`、`HTMLSelectElement`。它决定 `e.target` 上有什么，比如 `HTMLInputElement` 才有 `value` 和 `checked`。\n\n所以 `React.ChangeEvent<HTMLInputElement>` 读作「一个来自 input 元素的值变化事件」，`e.target.value` 才有精确的 `string` 类型。\n\n如果内层写错（比如写成 `HTMLDivElement`），`e.target.value` 就会报「属性 value 不存在」。',
          },
          {
            type: 'code',
            title: '12.2 内联写法：完全不用标类型（推荐）',
            language: 'tsx',
            body: `import { useState } from 'react' // 导入 Hook

function Demo() { // 演示组件
  const [text, setText] = useState('') // 输入框的值

  return (
    <div>
      {/* onChange 的类型 React 已经声明好了，e 自动推断为 ChangeEvent<HTMLInputElement> */}
      <input value={text} onChange={(e) => setText(e.target.value)} />

      {/* e.target.value 精确到 string，所以 setText 不会报错 */}
      <textarea value={text} onChange={(e) => setText(e.target.value)} />

      {/* 点击事件：e 自动是 MouseEvent<HTMLButtonElement>，能读 clientX */}
      <button onClick={(e) => console.log(e.clientX, e.clientY)}>看坐标</button>

      {/* 键盘事件：e.key 自动有类型，判断回车键 */}
      <input onKeyDown={(e) => e.key === 'Enter' && console.log('回车')} />

      {/* 复选框：读 e.target.checked（布尔），不是 value */}
      <input type="checkbox" onChange={(e) => console.log(e.target.checked)} />

      {/* 下拉选择：元素是 HTMLSelectElement，同样自动推断 */}
      <select onChange={(e) => console.log(e.target.value)}>
        <option value="a">A</option>
      </select>
    </div>
  )
} // 结论：内联箭头函数享受「上下文类型推断」，一个类型都不用手写`,
          },
          {
            type: 'code',
            title: '12.3 抽成独立函数：这时才必须标类型',
            language: 'tsx',
            body: `import { useState } from 'react' // 导入 Hook
import type { ChangeEvent, MouseEvent, FormEvent, KeyboardEvent } from 'react' // 只导入类型

function Demo() { // 演示组件
  const [text, setText] = useState('') // 输入框值

  // 独立定义的函数不在「有类型的位置」，参数必须自己标注
  function handleChange(e: ChangeEvent<HTMLInputElement>) { // 输入变化事件
    setText(e.target.value) // e.target.value 是 string
  }

  function handleCheck(e: ChangeEvent<HTMLInputElement>) { // 复选框也是 ChangeEvent
    console.log(e.target.checked) // 复选框读 checked（boolean），不读 value
  }

  function handleClick(e: MouseEvent<HTMLButtonElement>) { // 鼠标点击事件
    e.preventDefault() // 阻止默认行为
    console.log(e.currentTarget.textContent) // currentTarget 精确到 button 元素
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) { // 表单提交事件
    e.preventDefault() // 阻止页面刷新，这是表单必写的一行
    console.log('提交', text) // 提交逻辑
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) { // 键盘事件
    if (e.key === 'Enter') console.log('回车提交') // e.key 是字符串
  }

  return (
    <form onSubmit={handleSubmit}> {/* 传函数引用，不要写 handleSubmit() */}
      <input value={text} onChange={handleChange} onKeyDown={handleKeyDown} />
      <input type="checkbox" onChange={handleCheck} />
      <button onClick={handleClick}>提交</button>
    </form>
  )
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：完整 TS 版受控表单（含校验）',
            body: `import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

interface FormData { name: string; email: string; agree: boolean } // 表单数据结构

export default function Demo() { // 默认导出组件
  const [form, setForm] = useState<FormData>({ name: '', email: '', agree: false })
  const [error, setError] = useState<string>('') // 错误提示文案

  // 一个函数处理所有文本输入：用 name 属性决定改哪个字段
  function handleText(e: ChangeEvent<HTMLInputElement>) {
    const key = e.target.name as 'name' | 'email' // 断言成两个合法键名之一
    setForm({ ...form, [key]: e.target.value }) // 展开旧值再覆盖目标字段
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) { // 提交处理
    e.preventDefault() // 阻止表单默认刷新页面
    if (!form.name.trim()) return setError('请填写姓名') // 校验姓名
    if (!form.email.includes('@')) return setError('邮箱格式不正确') // 校验邮箱
    if (!form.agree) return setError('请勾选同意条款') // 校验勾选
    setError('') // 校验通过，清空错误
    alert('提交成功：' + form.name) // 演示用弹窗
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: 16, fontFamily: 'system-ui' }}>
      {/* 受控输入：value 来自 state，onChange 写回 state */}
      <input name="name" value={form.name} onChange={handleText} placeholder="姓名" />
      <input name="email" value={form.email} onChange={handleText} placeholder="邮箱" style={{ marginLeft: 8 }} />
      <label style={{ display: 'block', margin: '10px 0' }}>
        {/* 复选框读 checked 而不是 value */}
        <input type="checkbox" checked={form.agree} onChange={(e) => setForm({ ...form, agree: e.target.checked })} />
        我同意条款
      </label>
      {error && <p style={{ color: 'crimson', margin: '0 0 8px' }}>{error}</p>}
      <button type="submit">提交</button>
    </form>
  )
}`,
          },
          {
            type: 'table',
            title: '12.4 事件类型对照表（照着抄）',
            intro: '所有类型都在 `react` 包里，可以写 `React.XxxEvent` 或 `import type { XxxEvent } from \'react\'`。',
            headers: ['场景', '事件类型', '常用属性'],
            rows: [
              ['输入框输入', '`ChangeEvent<HTMLInputElement>`', '`e.target.value`'],
              ['多行文本', '`ChangeEvent<HTMLTextAreaElement>`', '`e.target.value`'],
              ['下拉选择', '`ChangeEvent<HTMLSelectElement>`', '`e.target.value`'],
              ['复选框 / 单选', '`ChangeEvent<HTMLInputElement>`', '`e.target.checked`'],
              ['按钮点击', '`MouseEvent<HTMLButtonElement>`', '`e.clientX`、`e.currentTarget`'],
              ['div 点击', '`MouseEvent<HTMLDivElement>`', '`e.stopPropagation()`'],
              ['表单提交', '`FormEvent<HTMLFormElement>`', '`e.preventDefault()`'],
              ['键盘按下', '`KeyboardEvent<HTMLInputElement>`', '`e.key`、`e.ctrlKey`'],
              ['聚焦 / 失焦', '`FocusEvent<HTMLInputElement>`', '`e.target.value`'],
              ['文件选择', '`ChangeEvent<HTMLInputElement>`', '`e.target.files`（可能为 `null`）'],
              ['任意事件（兜底）', '`SyntheticEvent`', '只有通用属性，尽量别用'],
            ],
            note: '记不住就把内联箭头函数里的 `e` 悬停一下，编辑器会告诉你完整类型，直接抄下来。',
          },
          {
            type: 'text',
            title: '12.5 `e.target` 和 `e.currentTarget` 的区别',
            body: '这是一个 TS 会「逼你搞懂」的经典点：\n\n**`e.currentTarget`**：事件监听器**绑定在哪个元素上**，类型就是你在尖括号里写的那个（比如 `HTMLButtonElement`）。类型永远精确。\n\n**`e.target`**：**真正被点到的那个元素**，可能是子元素。TS 里它的类型比较宽松（`EventTarget`），所以有时读属性会报错。\n\n实践建议：\n\n- 输入框场景用 `e.target.value`——React 为 `ChangeEvent` 做了特殊处理，`target` 的类型是准确的\n- 点击场景想读绑定元素的信息，用 `e.currentTarget`\n- 事件委托（点击父级判断子元素）时读 `e.target`，需要自己断言：`(e.target as HTMLElement).dataset.id`',
          },
          {
            type: 'code',
            title: '12.6 几个进阶小坑',
            language: 'tsx',
            body: `import type { ChangeEvent, MouseEvent } from 'react' // 只导入类型

// ===== 坑一：文件选择的 files 可能是 null =====
function handleFile(e: ChangeEvent<HTMLInputElement>) { // 文件输入框的变化事件
  const file = e.target.files?.[0] // files 类型是 FileList | null，必须用 ?.
  if (!file) return // 用户取消选择时 file 是 undefined，早退
  console.log(file.name, file.size) // ✅ 这里 file 一定存在，有完整补全
}

// ===== 坑二：事件委托里读 e.target 要断言 =====
function handleListClick(e: MouseEvent<HTMLUListElement>) { // 监听在 ul 上
  const el = e.target as HTMLElement // e.target 可能是任意子元素，断言成 HTMLElement
  const id = el.dataset.id // 读 data-id 属性；dataset 的值类型是 string | undefined
  if (!id) return // 点到空白处时没有 id，早退
  console.log('点击了', id) // ✅ 拿到被点击项的 id
}

// ===== 坑三：想复用一个 handler 给多种元素，用联合类型 =====
type AnyInput = HTMLInputElement | HTMLTextAreaElement // 两种输入元素
function handleAny(e: ChangeEvent<AnyInput>) { // 同一个函数处理 input 和 textarea
  console.log(e.target.value) // ✅ 两种元素都有 value，可以直接读
}

// ===== 坑四：给回调 props 定义事件类型，别用 any =====
interface Props { onInputChange: (e: ChangeEvent<HTMLInputElement>) => void } // ✅ 精确
interface BadProps { onInputChange: (e: any) => void } // ❌ 等于放弃检查`,
          },
          {
            type: 'list',
            title: '12.7 表单与事件自检清单',
            ordered: true,
            items: [
              '内联箭头函数里是否多余地给 `e` 标了类型？',
              '抽出的独立 handler 是否标了 `React.XxxEvent<元素类型>`？',
              '尖括号里的元素类型是否和实际标签对得上（`input` 对 `HTMLInputElement`）？',
              '复选框是否读的 `checked` 而不是 `value`？',
              '表单提交是否写了 `e.preventDefault()`？',
              '`e.target.files` 是否用 `?.` 处理了可能为 `null` 的情况？',
              '受控输入是否 `value` 和 `onChange` 成对出现（只写 `value` 会变成只读）？',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '公式 `React.事件名Event<元素类型>`：输入用 `ChangeEvent<HTMLInputElement>`（读 `value`）、复选框读 `checked`、点击用 `MouseEvent<HTMLButtonElement>`、提交用 `FormEvent<HTMLFormElement>` 并 `preventDefault()`。内联不用标，抽出来才标；不确定就悬停看类型。',
          },
        ],
      },
    },
    {
      id: 'ts-react-api',
      title: 'React 实战四：接口返回数据怎么定类型',
      summary: '定义 `interface User`、`axios.get<User[]>`、请求三态 `data: User[] | null`',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '先照着接口文档写一个 `interface`，再把它交给请求函数的泛型：`axios.get<User[]>(url)`。请求状态永远是三个：`data`（可能为 `null`）、`loading`、`error`。',
          },
          {
            type: 'text',
            title: '13.1 为什么接口数据最需要类型',
            body: '接口数据是整个前端项目里**最容易写错、也最难自查**的部分：\n\n- 字段是 `userName` 还是 `user_name`？大小写和下划线一字之差\n- `list` 在 `res.data` 里还是 `res.data.data` 里？\n- `age` 后端返回的是数字还是字符串 `"18"`？\n- 某个字段在「没数据」时是 `null`、`undefined` 还是空字符串？\n\n这些问题在 JS 里只能靠 `console.log` 一个个试。写了 `interface` 之后，字段名和层级由编辑器补全，写错立刻报红。\n\n**重要提醒**：TS 的类型是「你对后端的假设」，它**不会在运行时校验真实数据**。如果后端改了字段而你没改类型，TS 不会报错——线上照样出问题。所以类型要和接口文档同步维护，关键接口可以配 `zod` 这类运行时校验库（进阶话题）。',
          },
          {
            type: 'code',
            title: '13.2 第一步：照着接口文档定义类型',
            language: 'ts',
            body: `// 假设接口文档说：GET /api/users 返回 { code, message, data: [...] }

// ① 先定义业务实体：一个用户长什么样
export interface User { // export 出去，其它文件都能复用
  id: number // 用户 id
  name: string // 姓名
  email: string // 邮箱
  avatar?: string // 可选：有的用户没头像，后端会不返回这个字段
  role: 'admin' | 'user' | 'guest' // 角色是固定几种，用字面量联合而不是 string
  createdAt: string // 后端返回的时间是 ISO 字符串，不是 Date 对象
}

// ② 再定义统一的响应外壳，用泛型让 data 部分可替换
export interface ApiResponse<T> { // T 是「业务数据」的类型
  code: number // 业务状态码，比如 0 表示成功
  message: string // 提示文案
  data: T // 真正的数据，类型由调用方指定
}

// ③ 分页接口再包一层
export interface PageData<T> { // 分页数据结构
  list: T[] // 当前页的数据数组
  total: number // 总条数
  page: number // 当前页码
}

// 组合出各接口的具体返回类型
type UserListRes = ApiResponse<User[]> // 用户列表：data 是 User 数组
type UserDetailRes = ApiResponse<User> // 用户详情：data 是单个 User
type UserPageRes = ApiResponse<PageData<User>> // 分页列表：data 里还有 list 和 total`,
          },
          {
            type: 'code',
            title: '13.3 第二步：把类型交给请求函数（axios / fetch）',
            language: 'ts',
            body: `import axios from 'axios' // axios 自带类型，不用装 @types/axios
import type { ApiResponse, User } from './types' // 只导入类型

// ===== axios 写法：把返回类型写进泛型 =====
async function getUsers(): Promise<User[]> { // 函数返回值也标上类型作为契约
  const res = await axios.get<ApiResponse<User[]>>('/api/users') // 泛型说明「响应体长什么样」
  return res.data.data // res.data 是 ApiResponse<User[]>，再取 .data 才是 User[]
} // 注意这里有两层 data：axios 的 res.data + 后端外壳的 data

async function getUser(id: number): Promise<User> { // 查单个用户
  const res = await axios.get<ApiResponse<User>>('/api/users/' + id) // data 是单个 User
  return res.data.data // 返回业务数据
}

async function createUser(payload: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  const res = await axios.post<ApiResponse<User>>('/api/users', payload) // 提交数据用 Omit 派生
  return res.data.data // 返回后端创建好的完整用户
}

// ===== fetch 写法：fetch 没有泛型，要自己断言 =====
async function getUsersByFetch(): Promise<User[]> { // 原生 fetch 版本
  const res = await fetch('/api/users') // 发请求
  if (!res.ok) throw new Error('HTTP ' + res.status) // 手动判断 HTTP 状态
  const json = (await res.json()) as ApiResponse<User[]> // res.json() 返回 any，必须断言
  return json.data // 取出业务数据
} // 提醒：as 只是「告诉 TS 我认为是这样」，不做任何运行时校验`,
          },
          {
            type: 'code',
            title: '13.4 第三步：请求三态的类型写法',
            language: 'tsx',
            body: `import { useEffect, useState } from 'react' // 导入 Hook
import type { User } from './types' // 导入用户类型

function UserList() { // 用户列表组件
  // 三态之一：数据。初始没有数据，所以类型是 User[] | null
  const [data, setData] = useState<User[] | null>(null)
  // 三态之二：加载中。布尔值，初始 true 表示进页面就在加载
  const [loading, setLoading] = useState<boolean>(true)
  // 三态之三：错误。用字符串存错误文案，没错时是空串
  const [error, setError] = useState<string>('')

  useEffect(() => { // 挂载后拉数据
    let cancelled = false // 竞态标志：组件卸载后不再 setState

    async function load() { // effect 里定义 async 函数再调用
      setLoading(true) // 开始加载
      setError('') // 清掉上次的错误
      try {
        const list = await getUsers() // 调上一节写好的请求函数，返回 User[]
        if (!cancelled) setData(list) // ✅ 类型匹配 User[] | null
      } catch (e) { // catch 里的 e 类型是 unknown（TS 4.4+ 的严格行为）
        const msg = e instanceof Error ? e.message : '请求失败' // 用 instanceof 收窄后读 message
        if (!cancelled) setError(msg) // 写入错误文案
      } finally {
        if (!cancelled) setLoading(false) // 无论成败都结束 loading
      }
    }

    load() // 立即执行
    return () => { cancelled = true } // 清理函数：标记已卸载
  }, []) // 空依赖：只在挂载时请求一次

  if (loading) return <p>加载中...</p> // 先处理 loading
  if (error) return <p>出错了：{error}</p> // 再处理 error
  if (!data || data.length === 0) return <p>暂无数据</p> // 处理空数据，这一步顺便帮 TS 排除 null

  // 走到这里 data 一定是非空的 User[]，item 有完整补全
  return <ul>{data.map((item) => <li key={item.id}>{item.name}</li>)}</ul>
}`,
          },
          {
            type: 'code',
            live: true,
            runtime: 'react',
            language: 'tsx',
            title: 'Live Demo：带类型的请求三态（用定时器模拟接口）',
            body: `import { useEffect, useState } from 'react'

interface User { id: number; name: string; role: 'admin' | 'user' } // 接口数据结构

// 模拟接口：500ms 后返回 User[]，避免 Demo 依赖真实网络
function fetchUsers(): Promise<User[]> {
  return new Promise((resolve) => { // 返回一个 Promise<User[]>
    setTimeout(() => resolve([ // 半秒后给出数据
      { id: 1, name: '小明', role: 'admin' }, // role 必须是两个字面量之一
      { id: 2, name: '小红', role: 'user' },
    ]), 500)
  })
}

export default function Demo() { // 默认导出组件
  const [data, setData] = useState<User[] | null>(null) // 数据三态之一：可能还没有
  const [loading, setLoading] = useState<boolean>(true) // 三态之二：加载中
  const [error, setError] = useState<string>('') // 三态之三：错误文案

  useEffect(() => { // 挂载后请求一次
    fetchUsers()
      .then((list) => setData(list)) // 成功：list 类型是 User[]
      .catch((e: unknown) => setError(e instanceof Error ? e.message : '失败')) // 失败收窄后取 message
      .finally(() => setLoading(false)) // 无论成败结束 loading
  }, [])

  if (loading) return <p style={{ padding: 16 }}>加载中...</p> // 先渲染 loading
  if (error) return <p style={{ padding: 16, color: 'crimson' }}>{error}</p> // 再渲染错误
  if (!data) return <p style={{ padding: 16 }}>暂无数据</p> // 排除 null，下面就能安全 map

  return (
    <ul style={{ padding: 16, fontFamily: 'system-ui' }}>
      {/* data 已确定非空，item 是 User，name 和 role 都有补全 */}
      {data.map((item) => (
        <li key={item.id}>{item.name} —— {item.role}</li>
      ))}
    </ul>
  )
}`,
          },
          {
            type: 'table',
            title: '13.5 接口类型常见问题速查',
            headers: ['问题', '怎么写', '说明'],
            rows: [
              ['字段可能不返回', '`avatar?: string`', '加 `?`，用时配 `?.`'],
              ['字段可能是 `null`', '`parentId: number | null`', '后端明确返回 `null` 时用联合'],
              ['固定几种取值', '`role: \'admin\' | \'user\'`', '别写 `string`'],
              ['时间字段', '`createdAt: string`', '后端给的是字符串，不是 `Date`'],
              ['数字型字符串', '`count: string`', '后端给 `"18"` 就老实写 `string`'],
              ['统一响应外壳', '`ApiResponse<T>`', '用泛型复用 `code` / `message` / `data`'],
              ['分页数据', '`PageData<T>`', '`list: T[]` + `total: number`'],
              ['`axios` 指定返回类型', '`axios.get<ApiResponse<User[]>>(url)`', '注意两层 `data`'],
              ['`fetch` 指定返回类型', '`(await res.json()) as ApiResponse<T>`', '`as` 不做运行时校验'],
              ['`catch` 里的错误', '`e instanceof Error ? e.message : \'失败\'`', '`e` 的类型是 `unknown`'],
              ['提交数据的类型', '`Omit<User, \'id\' | \'createdAt\'>`', '从实体派生，别手写第二遍'],
            ],
            note: '一个实用习惯：把所有接口类型集中放在 `src/types/api.ts`，请求函数放 `src/api/`，页面只 import 类型。',
          },
          {
            type: 'text',
            title: '13.6 易错点汇总',
            body: '① 忘了 `axios` 的两层 `data`：`res.data` 是整个响应体，`res.data.data` 才是业务数据。\n\n② 用 `as` 就以为安全了：`as ApiResponse<User[]>` 只是骗过编译器，后端返回什么它都不检查。\n\n③ `catch (e)` 里直接 `e.message`：报「`e` 的类型为 unknown」，必须先 `e instanceof Error` 收窄。\n\n④ `useState<User[]>([])` 和 `useState<User[] | null>(null)` 混用：用空数组做初始值就分不出「还没请求」和「请求完但没数据」，需要区分时用 `null`。\n\n⑤ 时间字段写成 `Date`：后端给的是字符串，写 `Date` 会让 `new Date(item.createdAt)` 处处报错。\n\n⑥ 把接口类型写在组件文件里：多个页面用到同一实体时会重复定义，抽到 `types` 目录统一维护。\n\n⑦ 认为「类型对了运行时就不会错」：后端字段一改，类型不会自动跟着变，仍需人工同步。',
          },
          {
            type: 'list',
            title: '13.7 动手练习清单',
            ordered: true,
            items: [
              '照一个真实接口文档写 `interface`，把可选字段和 `null` 字段都标准确',
              '写 `ApiResponse<T>` 外壳，用它组合出列表和详情两个返回类型',
              '写 `getUsers(): Promise<User[]>`，注意 `res.data.data` 两层',
              '用 `useState<User[] | null>(null)` + `loading` + `error` 实现完整三态',
              '在 `catch` 里直接读 `e.message` 看报错，再用 `instanceof Error` 修好',
              '用 `Omit<User, \'id\'>` 定义创建接口的提交类型',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '接口类型三步走：写 `interface` → 交给泛型（`axios.get<ApiResponse<User[]>>`）→ 用 `data | null` + `loading` + `error` 三态渲染。`catch` 里的 `e` 是 `unknown`，先 `instanceof Error`。类型是假设，不是运行时校验。',
          },
        ],
      },
    },
    {
      id: 'ts-common-errors',
      title: '新手最常撞的 TS 报错清单',
      summary: '每条给：报错长什么样 → 为什么 → 怎么改',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: 'TS 的报错信息其实**写得很清楚**，只是有点长。养成习惯：**从报错里找出「谁不能赋给谁」这两个类型名**，答案基本就出来了。',
          },
          {
            type: 'text',
            title: '14.1 先学会读报错：三段结构',
            body: 'VS Code 里的 TS 报错通常是这个结构：\n\n**① 结论**：比如「不能将类型 `string` 分配给类型 `number`」——告诉你哪两个类型对不上。\n\n**② 位置链**：比如「属性 `age` 的类型不兼容」——告诉你是嵌套结构里的哪一层出了问题。\n\n**③ 建议**：比如「你是否想访问 `name`？」——TS 经常会直接给出修正建议。\n\n看长报错的技巧：**从最后一行往前读**。最后一行往往是最具体的原因，前面几行只是层层包裹的上下文。\n\n另外，VS Code 里按住 `Ctrl`（Mac 是 `Cmd`）点报错里的类型名，可以直接跳到类型定义处，比猜快得多。',
          },
          {
            type: 'table',
            title: '14.2 十大高频报错清单',
            intro: '按遇到频率排序，前五条几乎每个新手都会撞。',
            headers: ['报错关键字', '为什么会这样', '怎么改'],
            rows: [
              ['不能将类型"X"分配给类型"Y"', '赋值两边类型不一致，最基础的类型不匹配', '看清 Y 要什么：改值、改类型标注，或用联合类型 `X | Y`'],
              ['对象可能为"null"/"undefined"', '值的类型里含 `null`，你却直接访问属性或调方法', '用 `?.`、`??`、`if (x)` 早退；确实不为空时才用 `!`'],
              ['参数"x"隐式具有"any"类型', '函数参数没写类型，`noImplicitAny` 拦住了', '给参数补上类型标注'],
              ['类型"X"上不存在属性"p"', '属性名拼错，或这个类型里真没这个字段', '看 TS 的「你是否想访问…」提示；确实要加就改类型定义'],
              ['应有 N 个参数，但获得 M 个', '调用函数时参数个数不对', '补上缺的参数，或把可选参数标 `?`'],
              ['类型"undefined"不能用作索引类型', '用一个可能为空的值去索引对象', '先判断非空，或给索引值加默认值'],
              ['不能将类型"never[]"分配给…', '`useState([])` 把类型推断成了 `never[]`', '写泛型：`useState<User[]>([])`'],
              ['缺少属性"p"，但类型"Y"中需要该属性', '对象少写了必填字段', '补上字段，或把该字段标成可选 `p?:`'],
              ['对象字面量只能指定已知属性', '多写了类型里没有的字段（多余属性检查）', '删掉多余字段，或在类型里加上它'],
              ['类型"unknown"的参数…', '`catch (e)` 的 `e` 或 `JSON.parse` 结果是 `unknown`', '先收窄：`e instanceof Error`、`typeof x === \'string\'`'],
              ['JSX 元素类型…不具有任何构造签名', '在 `.ts` 文件里写了 JSX', '把文件后缀改成 `.tsx`'],
              ['找不到模块"x"或其相应的类型声明', '库没有自带类型', '装 `@types/x`，或写一个 `.d.ts` 声明'],
            ],
            note: '看到没见过的报错，先在报错里找两个被引号括起来的类型名，问自己「谁要什么、我给了什么」。',
          },
          {
            type: 'code',
            title: '14.3 报错 1～3 的代码现场与修法',
            language: 'ts',
            body: `// ===== 报错 1：不能将类型"string"分配给类型"number" =====
let age: number = '18' // ❌ 声明要 number，给了字符串
let age1: number = 18 // ✅ 改法一：给正确的值
let age2: number = Number('18') // ✅ 改法二：转换一下
let age3: number | string = '18' // ✅ 改法三：如果业务上真会有两种，用联合类型

// ===== 报错 2：对象可能为"null" =====
interface User { name: string } // 用户类型
let user: User | null = null // 可能是空
console.log(user.name) // ❌ 直接访问，报「对象可能为 null」
console.log(user?.name) // ✅ 改法一：可选链，为空时整体是 undefined
console.log(user?.name ?? '游客') // ✅ 改法二：再配 ?? 给默认值
if (user) console.log(user.name) // ✅ 改法三：判断后收窄，分支里就是 User
console.log(user!.name) // 🟡 改法四：非空断言，只在你确信不为空时用

// ===== 报错 3：参数"who"隐式具有"any"类型 =====
function greet(who) { // ❌ 参数没类型，strict 模式下报错
  return 'hi ' + who // 函数体里 who 完全没有补全
}
function greetOk(who: string) { // ✅ 改法：补上类型标注
  return 'hi ' + who.trim() // 有了类型，字符串方法全都有补全
}
const items = [1, 2] // number[]
items.map((n) => n * 2) // ✅ 回调参数不用标：从数组类型推断出 n 是 number`,
          },
          {
            type: 'code',
            title: '14.4 报错 4～7 的代码现场与修法',
            language: 'tsx',
            body: `// ===== 报错 4：类型"User"上不存在属性"nmae" =====
interface User { name: string; age: number } // 类型定义
const u: User = { name: '小明', age: 18 } // 一个用户
console.log(u.nmae) // ❌ 拼错了，TS 提示「你是否想访问 name?」
console.log(u.name) // ✅ 改法：按提示改正拼写
// 如果确实需要新字段，就去 interface 里加，而不是想办法绕过检查

// ===== 报错 5：应有 2 个参数，但获得 1 个 =====
function add(a: number, b: number) { return a + b } // 两个必填参数
add(1) // ❌ 少传一个
add(1, 2) // ✅ 改法一：补齐参数
function add2(a: number, b = 0) { return a + b } // ✅ 改法二：给默认值，第二个参数变可选

// ===== 报错 6：不能将类型"never[]"分配给类型"User[]" =====
const [list, setList] = useState([]) // ❌ 空数组被推断成 never[]
setList([{ name: '小明', age: 18 }]) // ❌ 这一行报错，因为 never[] 装不了任何东西
const [list2, setList2] = useState<User[]>([]) // ✅ 改法：写泛型说明元素类型
setList2([{ name: '小明', age: 18 }]) // ✅ 现在完全合法

// ===== 报错 7：对象字面量只能指定已知属性，"nickname"不在类型"User"中 =====
const u2: User = { name: '小明', age: 18, nickname: '明明' } // ❌ 多余属性检查拦住了
const u3: User = { name: '小明', age: 18 } // ✅ 改法一：删掉多余字段
interface UserWithNick extends User { nickname?: string } // ✅ 改法二：类型里补上这个字段
const u4: UserWithNick = { name: '小明', age: 18, nickname: '明明' } // ✅ 现在合法`,
          },
          {
            type: 'code',
            title: '14.5 报错 8～10 的代码现场与修法',
            language: 'tsx',
            body: `// ===== 报错 8：类型"unknown"，禁止直接使用（catch 场景）=====
try {
  JSON.parse('坏数据') // 会抛异常
} catch (e) { // TS 4.4+ 里 e 的类型是 unknown
  console.log(e.message) // ❌ 报错：e 的类型为"未知"
  const msg = e instanceof Error ? e.message : String(e) // ✅ 改法：先用 instanceof 收窄
  console.log(msg) // 现在安全了
}

// ===== 报错 9：JSX 元素类型…不具有任何构造签名（文件后缀错）=====
// 现象：在 utils.ts 里写了 return <div>hi</div>，报一堆看不懂的错
// 原因：.ts 文件里尖括号被当成类型语法，不是 JSX
// ✅ 改法：把文件重命名为 utils.tsx（含 JSX 的文件必须用 .tsx）

// ===== 报错 10：找不到模块"lodash"或其相应的类型声明 =====
// import _ from 'lodash'  // ❌ lodash 自身没带类型
// ✅ 改法一：npm install -D @types/lodash
// ✅ 改法二（没有 @types 包时）：自己写一个 src/types/xxx.d.ts
// declare module 'some-lib' {          // 声明这个模块存在
//   export function doSomething(): void // 只声明你用到的部分即可
// }

// ===== 附赠：类型太宽导致的隐性 bug（不报错但更危险）=====
interface Props { size: string } // ❌ 类型太宽：任何字符串都合法
interface PropsOk { size: 'small' | 'large' } // ✅ 字面量联合：写错值立刻报红
const p: Props = { size: 'smalll' } // ❌ 拼错了三个 l，但 TS 不会报错！
const pOk: PropsOk = { size: 'smalll' } // ✅ 这里会报红，bug 当场被拦住`,
          },
          {
            type: 'text',
            title: '14.6 三个「治标不治本」的坏习惯',
            body: '遇到红线时，新手常用三种方式「消灭」它。它们都能让红线消失，但也让 TS 白装了：\n\n**① 加 `any`。** `const x: any = ...` 之后所有检查都没了，而且会传染给后续代码。\n\n**② 加 `as`。** `value as User` 只是宣布「我说它是 User」，如果实际不是，运行时照样崩，而且 TS 从此不再帮你检查。\n\n**③ 加 `@ts-ignore`。** 直接让下一行不做检查，等于挖了个坑埋起来。\n\n正确的顺序应该是：**先读懂报错 → 判断是「代码错了」还是「类型写得不准」→ 改对应的那一边**。\n\n实在解决不了、又必须交付时，允许临时用 `as` 或 `any`，但**必须写注释说明原因**，方便以后回来修。',
          },
          {
            type: 'list',
            title: '14.7 报错处理标准流程',
            ordered: true,
            items: [
              '把鼠标悬停在红线上，完整读一遍报错（从最后一行往前读）',
              '找出报错里的两个类型名：TS 要什么，我给了什么',
              '判断是「值写错了」还是「类型标注不准」——这决定改哪一边',
              '`Ctrl` / `Cmd` 点类型名跳到定义处，确认它真实的样子',
              '优先用「收窄」解决（`?.`、`if` 判断、`typeof`、`instanceof`），而不是断言',
              '改完跑一次 `npx tsc --noEmit`，确认没有连带的新错误',
              '万不得已用 `as` / `any` / `@ts-ignore` 时，写注释说明原因',
            ],
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '报错就两句话：「谁要什么、我给了什么」。空值问题用 `?.` / 判断收窄；`any` 报错就补参数类型；`never[]` 就补 `useState` 泛型；`unknown` 就先 `instanceof`；JSX 报怪错就检查文件后缀是不是 `.tsx`。别用 `any` 和 `@ts-ignore` 糊过去。',
          },
        ],
      },
    },
    {
      id: 'ts-cheatsheet',
      title: '速查表 + 学习路线自检',
      summary: '一页纸的语法速查 + 分阶段学习路线 + 上手检查清单',
      content: {
        sections: [
          {
            type: 'tip',
            title: '一句话记住',
            body: '入门 TS 真正必须掌握的只有五样：**基础类型、`interface`、联合类型、泛型的用法（会用就行）、React 那几个固定搭配**。其余全是查表就够的东西。',
          },
          {
            type: 'table',
            title: '15.1 语法总速查（收藏这一张）',
            intro: '写代码时忘了怎么写，直接在这里找。',
            headers: ['要做的事', '写法', '所属章节'],
            rows: [
              ['标注变量', '`let n: number = 0`', '第 3 节'],
              ['字符串数组', '`string[]` 或 `Array<string>`', '第 3 节'],
              ['对象数组', '`User[]`', '第 3 节'],
              ['长度固定的数组', '`[number, number]`（元组）', '第 3 节'],
              ['不确定的类型', '`unknown`（**不要用 `any`**）', '第 3 节'],
              ['描述对象结构', '`interface User { name: string }`', '第 5 节'],
              ['可选属性', '`email?: string`', '第 5 节'],
              ['只读属性', '`readonly id: number`', '第 5 节'],
              ['键值字典', '`Record<string, number>`', '第 5、9 节'],
              ['几个固定选项', '`\'small\' | \'medium\' | \'large\'`', '第 6 节'],
              ['可能为空', '`User | null`', '第 6 节'],
              ['合并对象类型', '`A & B`', '第 6 节'],
              ['类型收窄', '`typeof` / `in` / `instanceof` / `if (x)`', '第 6 节'],
              ['自定义类型守卫', '`function isX(v): v is X`', '第 6 节'],
              ['函数类型', '`(value: string) => void`', '第 7 节'],
              ['异步函数返回值', '`Promise<User[]>`', '第 7 节'],
              ['泛型函数', '`function first<T>(list: T[]): T`', '第 8 节'],
              ['泛型约束', '`<T extends { id: number }>`', '第 8 节'],
              ['所有属性可选', '`Partial<User>`', '第 9 节'],
              ['挑 / 去字段', '`Pick<User, \'id\'>` / `Omit<User, \'password\'>`', '第 9 节'],
              ['取属性名联合', '`keyof User` / `keyof typeof config`', '第 9 节'],
              ['取函数返回值类型', '`ReturnType<typeof fn>`', '第 9 节'],
              ['组件 Props', '`interface Props` + `function C(p: Props)`', '第 10 节'],
              ['children', '`children?: React.ReactNode`', '第 10 节'],
              ['state 初始为空', '`useState<User | null>(null)`', '第 11 节'],
              ['state 初始空数组', '`useState<User[]>([])`', '第 11 节'],
              ['DOM 引用', '`useRef<HTMLInputElement>(null)` + `?.`', '第 11 节'],
              ['reducer 的 action', '判别联合 `{ type: \'x\'; payload: T }`', '第 11 节'],
              ['输入事件', '`React.ChangeEvent<HTMLInputElement>`', '第 12 节'],
              ['点击事件', '`React.MouseEvent<HTMLButtonElement>`', '第 12 节'],
              ['表单提交', '`React.FormEvent<HTMLFormElement>`', '第 12 节'],
              ['接口返回', '`axios.get<ApiResponse<User[]>>(url)`', '第 13 节'],
              ['catch 里的错误', '`e instanceof Error ? e.message : \'失败\'`', '第 13 节'],
            ],
          },
          {
            type: 'table',
            title: '15.2 React + TS 固定搭配（背下来就能开工）',
            intro: '这九行覆盖了日常 React + TS 的绝大部分场景。',
            headers: ['场景', '固定写法'],
            rows: [
              ['组件 + Props', '`function Card({ title }: CardProps) { ... }`'],
              ['可传内容的组件', '`children?: React.ReactNode`'],
              ['普通 state', '`const [n, setN] = useState(0)`'],
              ['可能为空的 state', '`const [u, setU] = useState<User | null>(null)`'],
              ['列表 state', '`const [list, setList] = useState<User[]>([])`'],
              ['DOM ref', '`const ref = useRef<HTMLInputElement>(null)`'],
              ['受控输入', '`onChange={(e) => setText(e.target.value)}`'],
              ['独立的输入 handler', '`(e: React.ChangeEvent<HTMLInputElement>) => ...`'],
              ['请求三态', '`data: T \\| null` + `loading: boolean` + `error: string`'],
            ],
            note: '把这张表抄到自己的笔记里，前两周写代码时对照着抄，很快就形成肌肉记忆。',
          },
          {
            type: 'list',
            title: '15.3 学习路线：三个阶段',
            intro: '不要一口气学完所有语法。按下面顺序推进，每个阶段都能立刻用在项目里。',
            ordered: true,
            items: [
              '**阶段一（1～3 天）：能读懂。** 基础类型、`interface`、可选属性、联合类型、类型注解与推断。目标：看别人的 TS 代码不发怵。',
              '**阶段二（3～5 天）：能写业务。** 函数类型、类型收窄、`Partial` / `Pick` / `Omit` / `Record`、会用泛型（`useState<T>`、`axios.get<T>`）。目标：能独立给一个页面加类型。',
              '**阶段三（1～2 周）：能写组件。** 组件 Props、Hooks 类型、事件类型、接口数据类型、`useReducer` 判别联合。目标：能用 TS 从零写一个完整功能模块。',
              '**进阶（不着急）：** 定义泛型、条件类型 `T extends X ? A : B`、映射类型 `{ [K in keyof T]: ... }`、`declare module`、运行时校验库（`zod`）。这些在读源码或写公共组件时才需要。',
              '**练习方法：** 把之前写过的 JS 组件逐个改成 TS，一次改一个文件。改的过程中每条红线都读懂再修，比看教程有效十倍。',
            ],
          },
          {
            type: 'text',
            title: '15.4 学习期的四个心态建议',
            body: '**① 红线是朋友，不是敌人。** 每条红线都在替你挡一个潜在 bug。花两分钟读懂它，比花两小时在浏览器里排查划算得多。\n\n**② 允许自己「先跑起来」。** 刚开始遇到实在搞不定的类型，用一次 `any` 并加上 `// TODO: 补类型` 注释，继续往下写。不要卡在一个类型上一小时。\n\n**③ 多用鼠标悬停。** 悬停看推断结果，是学 TS 最高效的手段——它让抽象的类型系统变得可视化。\n\n**④ 读现成的类型定义。** `Ctrl` 点 `useState` 跳进 React 的类型文件，看官方是怎么写泛型的。`antd` 的组件类型也是极好的教材。\n\n最后一句实话：**TS 的收益不是第一天就来的**。第一周你会觉得处处受限、写得慢；两周之后你会开始享受自动补全和重构时的安全感；一个月后再回去写纯 JS，会觉得像闭着眼睛走路。',
          },
          {
            type: 'list',
            title: '15.5 上手前的最终自检清单',
            intro: '能全部答上来，说明这一章你学到位了，可以直接在项目里开工。',
            ordered: true,
            items: [
              '能说清 `any` 和 `unknown` 的区别，以及为什么该优先用 `unknown`？',
              '知道什么时候必须写类型注解、什么时候交给推断？',
              '能说出 `interface` 和 `type` 各自的适用场景？',
              '会用字面量联合类型替代「随便一个字符串」？',
              '遇到联合类型，知道要先收窄再访问专属属性？',
              '会写 `function first<T>(list: T[]): T | undefined` 这样的泛型函数？',
              '能不查文档说出 `Partial`、`Pick`、`Omit`、`Record` 各自干什么？',
              '会用 `interface Props` + 参数注解写一个组件，并正确标 `children`？',
              '知道 `useState` 什么时候必须写泛型（`null` / 空数组 / 状态机）？',
              '会写 `useRef<HTMLInputElement>(null)` 并用 `?.` 访问？',
              '能写出受控输入的 `onChange` 事件类型？',
              '会给接口返回数据定义 `interface`，并实现 `data | null` + `loading` + `error` 三态？',
              '看到红线时，能先读懂再改，而不是直接加 `any` 或 `@ts-ignore`？',
            ],
          },
          {
            type: 'text',
            title: '15.6 下一步做什么',
            body: '看完这一章，最好的动作不是继续看教程，而是**立刻动手改一个真实文件**。\n\n推荐路径：\n\n**① 用 `--template typescript` 新建一个小项目**，把「待办列表」写一遍：新增、删除、勾选完成、筛选。这四个功能会用到 state 泛型、事件类型、Props 类型、列表渲染，正好把本章知识全过一遍。\n\n**② 把你之前写的一个 JS 组件改成 `.tsx`**，一次只改一个文件，每条红线都读懂再修。\n\n**③ 给一个真实接口写类型**，走完「定义 `interface` → 请求函数泛型 → 三态渲染」的完整流程。\n\n**④ 遇到不会写的类型，去看 `antd` 或 React 的类型定义。** `Ctrl` 点组件名跳进去，那里有最标准的答案。\n\n卡住的时候回来查本章的速查表（15.1 和 15.2 两张），基本都能找到对应写法。',
          },
          {
            type: 'tip',
            title: '一句话记忆',
            body: '入门 TS 只要五样：基础类型、`interface`、联合类型、会用泛型、React 固定搭配（Props / `useState<T>` / `useRef<HTMLInputElement>(null)` / `ChangeEvent`）。红线是朋友，多用鼠标悬停，把老 JS 文件一个个改成 TS——这是最快的路。',
          },
        ],
      },
    },
  ],
}

export default typescript
