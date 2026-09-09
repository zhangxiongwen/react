/**
 * 在浏览器里直接跑 React / antd 代码的运行时
 *
 * 为什么需要它：
 * 普通 Demo 是把 HTML 片段塞进 iframe，浏览器天生就认。
 * 但 React 的代码是 JSX + import，浏览器不认，必须先「编译」再「执行」：
 *   ① 编译：用 @babel/standalone 把 JSX 变成函数调用、把 import 变成 require
 *   ② 执行：给它一个假的 require，把 react、antd 这些真实模块喂进去
 *
 * @babel/standalone 和 antd 体积都不小，所以这里用动态 import 懒加载：
 * 只有真正打开一个 React Demo 时才下载，不拖慢首屏。
 */

let runtimePromise = null

function loadRuntime() {
  if (!runtimePromise) {
    runtimePromise = Promise.all([
      import('@babel/standalone'),
      import('react'),
      import('react/jsx-runtime'),
      import('antd'),
      import('@ant-design/icons'),
      import('dayjs'),
    ]).then(([babel, react, jsxRuntime, antd, icons, dayjs]) => ({
      babel,
      // Demo 里允许 import 的模块白名单
      modules: {
        react,
        'react/jsx-runtime': jsxRuntime,
        antd,
        '@ant-design/icons': icons,
        dayjs,
      },
    }))
  }
  return runtimePromise
}

/**
 * 编译并执行一段 Demo 源码，返回它 export default 的组件
 *
 * Demo 的写法约定：必须 `export default` 一个组件，例如
 *   import { Button } from 'antd'
 *   export default function Demo() { return <Button>点我</Button> }
 */
export async function buildDemoComponent(source) {
  const code = String(source ?? '').trim()
  if (!code) return { Component: null, error: null }

  const { babel, modules } = await loadRuntime()

  let compiled = ''
  try {
    // presets 是「倒序」生效的：先 typescript 脱类型 → 再 react 处理 JSX
    // → 最后 env 把 import/export 转成 require/exports
    const result = babel.transform(code, {
      filename: 'demo.tsx',
      presets: [
        ['env', { modules: 'commonjs', targets: { chrome: '110' } }],
        ['react', { runtime: 'automatic' }],
        'typescript',
      ],
    })
    compiled = result.code
  } catch (err) {
    return { Component: null, error: `语法错误：${err.message}` }
  }

  try {
    const moduleObj = { exports: {} }
    const requireFn = (name) => {
      const mod = modules[name]
      if (!mod) {
        throw new Error(
          `这个演示环境暂时只支持 import：${Object.keys(modules).join('、')}（你写的是 '${name}'）`
        )
      }
      return mod
    }

    // eslint-disable-next-line no-new-func
    const factory = new Function('require', 'module', 'exports', compiled)
    factory(requireFn, moduleObj, moduleObj.exports)

    const Component = moduleObj.exports.default || moduleObj.exports.Demo
    if (typeof Component !== 'function') {
      return {
        Component: null,
        error: '没找到组件：Demo 代码需要 export default 一个函数组件',
      }
    }
    return { Component, error: null }
  } catch (err) {
    return { Component: null, error: `运行出错：${err.message}` }
  }
}
