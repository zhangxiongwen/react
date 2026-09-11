import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import ErrorBoundary from '../components/ErrorBoundary'
import './MainLayout.css'

/**
 * 主布局：顶栏 + 内容区 + 页脚
 * 演练台页面隐藏页脚，把垂直空间留给编辑器
 * ErrorBoundary 的 key 用路径：切页时自动重置错误态，避免一页崩了别的页也进不了
 */
function MainLayout() {
  const { pathname } = useLocation()
  const hideFooter = pathname.startsWith('/playground')

  return (
    <div className={hideFooter ? 'MainLayout MainLayout--playground' : 'MainLayout'}>
      <ScrollToTop />
      <Header />
      <main className="MainLayout-main">
        <ErrorBoundary key={pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
      {!hideFooter && <Footer />}
    </div>
  )
}

export default MainLayout
