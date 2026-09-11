import { Component } from 'react'
import './ErrorBoundary.css'

/**
 * 渲染期报错兜底：一个子页面抛错时，不要把整站（导航栏都算）白屏掉。
 * 必须用 class 组件：函数组件没有 componentDidCatch。
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('页面渲染出错', error, info?.componentStack)
  }

  handleRetry = () => {
    this.setState({ error: null })
  }

  render() {
    if (this.state.error) {
      return (
        <div className="ErrorBoundary" role="alert">
          <h1>这一页出错了</h1>
          <p>
            多半是接口返回了意料之外的数据。顶部导航还能用，可以先去别的页面。
          </p>
          <pre>{String(this.state.error.message || this.state.error)}</pre>
          <button type="button" onClick={this.handleRetry}>
            再试一次
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
