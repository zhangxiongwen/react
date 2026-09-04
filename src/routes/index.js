import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/index'
import LessonDetail from '../pages/LessonDetail/index'
import JsonServerDemo from '../pages/JsonServerDemo/index'
import AuthDemoHome from '../pages/AuthDemo/index'
import LoginPage from '../pages/AuthDemo/LoginPage'
import ProfilePage from '../pages/AuthDemo/ProfilePage'
import AdminPage from '../pages/AuthDemo/AdminPage'
import ForbiddenPage from '../pages/AuthDemo/ForbiddenPage'
import UnsavedFormPage from '../pages/AuthDemo/UnsavedFormPage'
import NotFoundPage from '../pages/NotFound/index'
import RequireAuth from '../components/auth/RequireAuth'
import GuestOnly from '../components/auth/GuestOnly'
import RequireRole from '../components/auth/RequireRole'

/**
 * 路由表
 *
 * 公开页：/, lesson/..., demo/json-server, demo/auth, demo/auth/403
 * 仅游客：demo/auth/login（已登录会被踢走）
 * 需登录：demo/auth/profile, demo/auth/unsaved
 * 需 admin：demo/auth/admin
 * 404：*
 */
const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'lesson/:categoryId/:itemId', element: <LessonDetail /> },
      { path: 'demo/json-server', element: <JsonServerDemo /> },

      // ---------- 路由守卫演示 ----------
      { path: 'demo/auth', element: <AuthDemoHome /> },
      { path: 'demo/auth/403', element: <ForbiddenPage /> },

      // 已登录不能进登录页
      {
        element: <GuestOnly />,
        children: [{ path: 'demo/auth/login', element: <LoginPage /> }],
      },

      // 必须登录
      {
        element: <RequireAuth />,
        children: [
          { path: 'demo/auth/profile', element: <ProfilePage /> },
          { path: 'demo/auth/unsaved', element: <UnsavedFormPage /> },

          // 必须登录 + 必须是 admin
          {
            element: <RequireRole allow={['admin']} />,
            children: [{ path: 'demo/auth/admin', element: <AdminPage /> }],
          },
        ],
      },

      // 404：放在同级 children 最后
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

export default routes
