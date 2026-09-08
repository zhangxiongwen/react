import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import './MainLayout.css'

/**
 * 主布局：顶栏 + 内容区 + 页脚
 * 演练台页面隐藏页脚，把垂直空间留给编辑器
 */
function MainLayout() {
  const { pathname } = useLocation()
  const hideFooter = pathname.startsWith('/playground')

  return (
    <div className={hideFooter ? 'MainLayout MainLayout--playground' : 'MainLayout'}>
      <ScrollToTop />
      <Header />
      <main className="MainLayout-main">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  )
}

export default MainLayout
