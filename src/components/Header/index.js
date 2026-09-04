import { Link, useLocation } from 'react-router-dom'
import { APP_NAME } from '../../utils/constants'
import { getUserName, isLoggedIn, logout } from '../../utils/auth'
import './Header.css'

/**
 * 顶部导航栏
 */
function Header() {
  const loggedIn = isLoggedIn()
  const location = useLocation()

  function handleLogout() {
    logout()
    window.location.assign('/demo/auth')
  }

  function handleContactClick(event) {
    // 已在首页时平滑滚到页脚；其它页先回首页再滚
    if (location.pathname === '/') {
      event.preventDefault()
      document.getElementById('contact')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <header className="Header">
      <div className="Header-inner">
        <Link to="/" className="Header-brand">
          {APP_NAME}
        </Link>
        <nav className="Header-nav" aria-label="主导航">
          <Link to="/" className="Header-link">
            知识目录
          </Link>
          <Link to="/demo/json-server" className="Header-link">
            API 演示
          </Link>
          <Link to="/demo/auth" className="Header-link">
            路由演示
          </Link>
          {loggedIn ? (
            <>
              <span className="Header-user">{getUserName()}</span>
              <button type="button" className="Header-link Header-btn" onClick={handleLogout}>
                退出
              </button>
            </>
          ) : (
            <Link to="/demo/auth/login" className="Header-link">
              登录
            </Link>
          )}
          <Link to="/#contact" className="Header-link" onClick={handleContactClick}>
            联系
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
