import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * 路由切换时把页面滚回顶部
 * 若 URL 带 hash（如 /#contact），滚到对应锚点，不强制回顶
 */
function ScrollToTop() {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      // 等一帧，确保页脚已挂载
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 0)
      return () => window.clearTimeout(timer)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    return undefined
  }, [pathname, search, hash])

  return null
}

export default ScrollToTop
