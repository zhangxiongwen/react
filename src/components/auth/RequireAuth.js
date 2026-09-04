import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isLoggedIn } from '../../utils/auth'

/**
 * 登录守卫：未登录不能进入子路由
 * 用法：作为父路由 element，children 才是真正页面
 */
function RequireAuth() {
  const location = useLocation()

  if (!isLoggedIn()) {
    // replace：避免返回键又回到受保护页
    // state.from：登录成功后跳回原来想去的地址
    return <Navigate to="/demo/auth/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default RequireAuth
