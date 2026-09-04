import { Link } from 'react-router-dom'
import { getUserName } from '../../utils/auth'
import './AuthDemo.css'

/**
 * 后台页：需要 admin 角色（RequireAuth + RequireRole）
 */
function AdminPage() {
  return (
    <div className="AuthDemo">
      <nav className="AuthDemo-crumb">
        <Link to="/demo/auth">路由演示</Link>
        <span>/</span>
        <span>后台</span>
      </nav>

      <header className="AuthDemo-header">
        <h1>管理后台</h1>
        <p>
          你好，管理员 {getUserName()}。只有 role=admin 才能进入本页。
        </p>
      </header>

      <div className="AuthDemo-panel">
        <p>这里可以放用户管理、内容审核等假数据。</p>
        <Link to="/demo/auth">返回演示首页</Link>
      </div>
    </div>
  )
}

export default AdminPage
