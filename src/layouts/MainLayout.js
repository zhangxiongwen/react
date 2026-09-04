import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import './MainLayout.css'

/**
 * 主布局：顶栏 + 内容区 + 页脚
 * ScrollToTop：每次换路由都滚回页面顶部
 */
function MainLayout() {
  return (
    <div className="MainLayout">
      <ScrollToTop />
      <Header />
      <main className="MainLayout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
