import { Link } from 'react-router-dom'
import { getRole, getUserName, logout } from '../../utils/auth'
import './AuthDemo.css'

/**
 * 个人中心：必须登录（RequireAuth 包裹）
 */
function ProfilePage() {
  function handleLogout() {
    logout()
    // 退出后去登录页；也可用 navigate
    window.location.assign('/demo/auth/login')
  }

  return (
    <div className="AuthDemo">
      <nav className="AuthDemo-crumb">
        <Link to="/demo/auth">路由演示</Link>
        <span>/</span>
        <span>个人中心</span>
      </nav>

      <header className="AuthDemo-header">
        <h1>个人中心（受保护页面）</h1>
        <p>能看到这一页，说明 RequireAuth 已经放行。</p>
      </header>

      <div className="AuthDemo-panel">
        <p>用户名：{getUserName()}</p>
        <p>角色：{getRole()}</p>
        <button type="button" onClick={handleLogout}>
          退出登录
        </button>
      </div>
    </div>
  )
}

export default ProfilePage
