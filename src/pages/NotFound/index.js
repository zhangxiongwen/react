import { Link, useLocation } from 'react-router-dom'
import '../AuthDemo/AuthDemo.css'

/**
 * 404 页面：路径不存在时展示
 */
function NotFoundPage() {
  const location = useLocation()

  return (
    <div className="AuthDemo AuthDemo--center">
      <p className="AuthDemo-code">404</p>
      <h1>页面不存在</h1>
      <p>
        没有匹配到路由：<code>{location.pathname}</code>
      </p>
      <p className="AuthDemo-muted">
        在 routes 里用 path: '*' 捕获未匹配路径并渲染本页。
      </p>
      <div className="AuthDemo-actions">
        <Link to="/">回首页</Link>
        <Link to="/demo/auth">路由演示</Link>
      </div>
    </div>
  )
}

export default NotFoundPage
