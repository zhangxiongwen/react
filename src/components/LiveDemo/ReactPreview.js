import { Component as ReactComponent, useEffect, useState } from 'react'
import { App, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { buildDemoComponent } from './reactRuntime'

/**
 * 渲染出错时兜底：不能让一个 Demo 的报错把整页白屏
 * key 换了就会重新挂载，所以外层用 code 当 key 即可「重试」
 */
class PreviewBoundary extends ReactComponent {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="LiveDemo-runError">
          渲染出错：{String(this.state.error.message || this.state.error)}
        </div>
      )
    }
    return this.props.children
  }
}

/**
 * React / antd 版实时预览：编译 → 执行 → 直接渲染在页面里
 */
function ReactPreview({ code }) {
  const [state, setState] = useState({ Component: null, error: null, loading: true })

  useEffect(() => {
    let cancelled = false
    setState((prev) => ({ ...prev, loading: true }))

    buildDemoComponent(code).then((result) => {
      if (cancelled) return
      setState({ ...result, loading: false })
    })

    // 代码变化时上一次的编译结果就作废，用 cancelled 挡掉过期回调
    return () => {
      cancelled = true
    }
  }, [code])

  if (state.loading && !state.Component && !state.error) {
    return <div className="LiveDemo-runHint">正在编译…（首次会下载编译器，稍等一下）</div>
  }

  if (state.error) {
    return <div className="LiveDemo-runError">{state.error}</div>
  }

  if (!state.Component) {
    return <div className="LiveDemo-runHint">（暂无内容）</div>
  }

  const Demo = state.Component
  return (
    <div className="LiveDemo-reactStage">
      <PreviewBoundary key={code}>
        <ConfigProvider locale={zhCN} theme={{ token: { borderRadius: 6 } }}>
          <App>
            <Demo />
          </App>
        </ConfigProvider>
      </PreviewBoundary>
    </div>
  )
}

export default ReactPreview
