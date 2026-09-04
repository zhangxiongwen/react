import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './AuthDemo.css'

/**
 * 未保存离开提示 Demo
 *
 * 说明：
 * - beforeunload：关闭标签页 / 刷新时浏览器原生提示
 * - 应用内点 Link 跳转：react-router 的 useBlocker 在「数据路由
 *   createBrowserRouter」下最完整；本项目用 BrowserRouter + useRoutes，
 *   这里用「脏状态提示 + 手动确认」演示思路
 */
function UnsavedFormPage() {
  const [title, setTitle] = useState('')
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    function onBeforeUnload(e) {
      if (!dirty) return
      e.preventDefault()
      e.returnValue = '' // Chrome 需要这行才会弹系统提示
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [dirty])

  function handleChange(e) {
    setTitle(e.target.value)
    setDirty(true)
  }

  function handleSave(e) {
    e.preventDefault()
    setDirty(false)
    alert('已保存（演示）：脏标记已清除，刷新不再提示')
  }

  function handleLeaveClick(e) {
    if (!dirty) return
    const ok = window.confirm('表单还没保存，确定离开吗？')
    if (!ok) e.preventDefault()
  }

  return (
    <div className="AuthDemo">
      <nav className="AuthDemo-crumb">
        <Link to="/demo/auth">路由演示</Link>
        <span>/</span>
        <span>未保存提示</span>
      </nav>

      <header className="AuthDemo-header">
        <h1>表单未保存离开</h1>
        <p>
          先改输入框（dirty=true），再刷新页面 → 浏览器会提示。
          点下方链接离开时，会先 confirm。
        </p>
        <p className="AuthDemo-status">
          当前脏状态：{dirty ? '有未保存修改' : '干净'}
        </p>
      </header>

      <form className="AuthDemo-form" onSubmit={handleSave}>
        <label>
          标题
          <input value={title} onChange={handleChange} placeholder="输入任意文字" />
        </label>
        <button type="submit">保存</button>
      </form>

      <div className="AuthDemo-actions">
        <Link to="/demo/auth" onClick={handleLeaveClick}>
          返回演示首页
        </Link>
        <Link to="/" onClick={handleLeaveClick}>
          回知识目录
        </Link>
      </div>

      <section className="AuthDemo-panel">
        <h2>进阶：useBlocker</h2>
        <p>
          React Router 6.4+ 的 <code>useBlocker</code> 可以拦截「应用内路由跳转」。
          它在 <code>createBrowserRouter + RouterProvider</code> 下最稳妥。
          本学习项目为了好懂用的是 BrowserRouter，所以这里用 beforeunload + confirm 演示同类需求。
        </p>
      </section>
    </div>
  )
}

export default UnsavedFormPage
