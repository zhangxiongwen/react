import { useEffect, useMemo, useState } from 'react'
import lessons from '../../data/lessons'
import LessonGroup from '../../components/LessonGroup'
import { HOME_TITLE, APP_DESC } from '../../utils/constants'
import './Home.css'

/**
 * 首页：左侧章节导航 + 右侧目录列表
 */
function Home() {
  const categories = useMemo(
    () => [...lessons].sort((a, b) => a.order - b.order),
    []
  )
  const [activeId, setActiveId] = useState(categories[0]?.id || '')

  function scrollToCategory(id) {
    const el = document.getElementById(`category-${id}`)
    if (!el) return
    setActiveId(id)
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const nodes = categories
      .map((c) => document.getElementById(`category-${c.id}`))
      .filter(Boolean)

    if (!nodes.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id.replace('category-', ''))
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.25, 0.5],
      }
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [categories])

  return (
    <div className="Home">
      <aside className="Home-sidebar" aria-label="React 入门学习">
        <p className="Home-sidebar-label">React 入门学习</p>
        <nav className="Home-sidebar-nav">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={
                activeId === category.id
                  ? 'Home-sidebar-item is-active'
                  : 'Home-sidebar-item'
              }
              onClick={() => scrollToCategory(category.id)}
            >
              <span className="Home-sidebar-num">
                {String(category.order).padStart(2, '0')}
              </span>
              <span className="Home-sidebar-title">{category.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="Home-main">
        <section className="Home-hero">
          <p className="Home-eyebrow">Learning Notes</p>
          <h1 className="Home-title">{HOME_TITLE}</h1>
          <p className="Home-desc">{APP_DESC}</p>
          <p className="Home-hint">
            左侧点章节快速定位，右侧点子条目进入详情。
          </p>
        </section>

        <section className="Home-catalog" aria-label="知识点目录">
          {categories.map((category) => (
            <LessonGroup key={category.id} category={category} />
          ))}
        </section>
      </div>
    </div>
  )
}

export default Home
