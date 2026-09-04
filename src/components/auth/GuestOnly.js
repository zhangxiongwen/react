import { Navigate, Outlet } from 'react-router-dom'
import { isLoggedIn } from '../../utils/auth'

/**
 * 反向守卫：已登录就不要再进登录页
 */
function GuestOnly() {
  if (isLoggedIn()) {
    return <Navigate to="/demo/auth" replace />
  }
  return <Outlet />
}

export default GuestOnly
