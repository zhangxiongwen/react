import { Link } from 'react-router-dom'
import './AuthDemo.css'

/**
 * 403 无权限页
 */
function ForbiddenPage() {
  return (
    <div className="AuthDemo AuthDemo--center">
      <p className="AuthDemo-code">403</p>
      <h1>没有权限</h1>
      <p>你的角色不能访问该页面。请用管理员账号登录后再试。</p>
      <div className="AuthDemo-actions">
        <Link to="/demo/auth/login">去登录</Link>
        <Link to="/demo/auth">返回演示首页</Link>
        <Link to="/">回知识目录</Link>
      </div>
    </div>
  )
}

export default ForbiddenPage
