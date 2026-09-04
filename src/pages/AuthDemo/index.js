import { Link } from 'react-router-dom'
import { getRole, getUserName, isLoggedIn, logout } from '../../utils/auth'
import './AuthDemo.css'

/**
 * 路由实战演示入口：说明有哪些可点的案例
 */
function AuthDemoHome() {
  const loggedIn = isLoggedIn()

  function handleLogout() {
    logout()
    window.location.reload()
  }

  return (
    <div className="AuthDemo">
      <nav className="AuthDemo-crumb">
        <Link to="/">知识目录</Link>
        <span>/</span>
        <span>路由守卫演示</span>
      </nav>

      <header className="AuthDemo-header">
        <h1>路由常见功能 · 可运行 Demo</h1>
        <p>
          下面每个链接都对应真实路由配置。请打开控制台 / 看地址栏变化，对照
          <code> src/routes/index.js </code> 和
          <code> src/components/auth/ </code>。
        </p>
        <p className="AuthDemo-status">
          当前状态：
          {loggedIn ? (
            <>
              已登录（{getUserName()} / 角色 {getRole()}）
              <button type="button" className="AuthDemo-linkish" onClick={handleLogout}>
                退出登录
              </button>
            </>
          ) : (
            '未登录'
          )}
        </p>
      </header>

      <ul className="AuthDemo-list">
        <li>
          <Link to="/demo/auth/login">1. 登录页</Link>
          <span>未登录可进；已登录会被反向守卫踢回本页</span>
        </li>
        <li>
          <Link to="/demo/auth/profile">2. 个人中心（需登录）</Link>
          <span>未登录访问 → 自动跳登录，登录后回到这里</span>
        </li>
        <li>
          <Link to="/demo/auth/admin">3. 后台页（需 admin）</Link>
          <span>user 登录后访问 → 403；admin 可进</span>
        </li>
        <li>
          <Link to="/demo/auth/unsaved">4. 未保存离开提示</Link>
          <span>改过表单再刷新/关闭标签页会提示</span>
        </li>
        <li>
          <Link to="/this-page-does-not-exist-404">5. 故意访问不存在的地址</Link>
          <span>进入自定义 404 页（不是静默回首页）</span>
        </li>
      </ul>

      <section className="AuthDemo-panel">
        <h2>建议体验顺序</h2>
        <ol>
          <li>先点「个人中心」→ 应跳到登录页</li>
          <li>用「普通用户」登录 → 回到个人中心</li>
          <li>再点「后台页」→ 应到 403</li>
          <li>退出，再用「管理员」登录 → 后台可进</li>
          <li>已登录时再打开登录页 → 应被踢回本页</li>
          <li>点「不存在的地址」→ 看 404 页</li>
        </ol>
      </section>
    </div>
  )
}

export default AuthDemoHome
