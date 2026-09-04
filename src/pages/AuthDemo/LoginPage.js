import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../../utils/auth'
import './AuthDemo.css'

/**
 * 登录页 Demo
 * - 未登录可访问（包在 GuestOnly 下）
 * - 登录成功：跳回 state.from，没有则去 /demo/auth
 */
function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/demo/auth'

  const [name, setName] = useState('小明')
  const [role, setRole] = useState('user')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return

    // 模拟登录成功：写入 localStorage
    login({ name: name.trim(), role })

    // 回到「原本想去的页面」
    navigate(from, { replace: true })
  }

  return (
    <div className="AuthDemo">
      <nav className="AuthDemo-crumb">
        <Link to="/demo/auth">路由演示</Link>
        <span>/</span>
        <span>登录</span>
      </nav>

      <header className="AuthDemo-header">
        <h1>登录页</h1>
        <p>
          登录成功后会跳到：<code>{from}</code>
          （来自守卫传入的 location.state.from）
        </p>
      </header>

      <form className="AuthDemo-form" onSubmit={handleSubmit}>
        <label>
          用户名
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          角色（决定能不能进后台）
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">普通用户 user</option>
            <option value="admin">管理员 admin</option>
          </select>
        </label>

        <button type="submit">登录</button>
      </form>
    </div>
  )
}

export default LoginPage
