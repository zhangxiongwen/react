import { Navigate, Outlet } from 'react-router-dom'
import { getRole } from '../../utils/auth'

/**
 * 角色守卫：角色不在 allow 列表 → 403
 * @param {{ allow: string[] }} props
 */
function RequireRole({ allow = [] }) {
  const role = getRole()

  if (!allow.includes(role)) {
    return <Navigate to="/demo/auth/403" replace />
  }

  return <Outlet />
}

export default RequireRole
