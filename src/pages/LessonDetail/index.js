import { Link, useParams } from 'react-router-dom'
import lessons from '../../data/lessons'
import DocContent from '../../components/DocContent'
import { findLesson, getLessonPath } from '../../utils/helpers'
import './LessonDetail.css'

/**
 * 知识点详情页
 * 路由：/lesson/:categoryId/:itemId
 * 根据参数从 data/lessons 取出文档内容渲染
 */
function LessonDetail() {
  const { categoryId, itemId } = useParams()
  const { category, item } = findLesson(lessons, categoryId, itemId)

  // 找不到对应知识点时，给出友好提示
  if (!category || !item) {
    return (
      <div className="LessonDetail LessonDetail--empty">
        <h1>未找到该知识点</h1>
        <p>可能是链接写错了，或内容尚未收录。</p>
        <Link to="/" className="LessonDetail-back">
          返回知识目录
        </Link>
      </div>
    )
  }

  // 同一大类里的上一条 / 下一条，方便连续学习
  const currentIndex = category.items.findIndex((i) => i.id === itemId)
  const prevItem = currentIndex > 0 ? category.items[currentIndex - 1] : null
  const nextItem =
    currentIndex < category.items.length - 1
      ? category.items[currentIndex + 1]
      : null

  return (
    <article className="LessonDetail">
      {/* 面包屑：回首页 / 当前大类名 */}
      <nav className="LessonDetail-breadcrumb" aria-label="面包屑">
        <Link to="/">知识目录</Link>
        <span>/</span>
        <span>{category.title}</span>
      </nav>

      <header className="LessonDetail-header">
        <p className="LessonDetail-category">{category.title}</p>
        <h1 className="LessonDetail-title">{item.title}</h1>
        <p className="LessonDetail-summary">{item.summary}</p>
      </header>

      {/* 文档正文：文字 + 代码 + 提示 */}
      <DocContent sections={item.content?.sections || []} />

      {/* 同大类内上一条 / 下一条 */}
      <footer className="LessonDetail-nav">
        {prevItem ? (
          <Link
            to={getLessonPath(category.id, prevItem.id)}
            className="LessonDetail-nav-link"
          >
            <span className="LessonDetail-nav-label">上一条</span>
            <span className="LessonDetail-nav-title">{prevItem.title}</span>
          </Link>
        ) : (
          <span />
        )}

        {nextItem ? (
          <Link
            to={getLessonPath(category.id, nextItem.id)}
            className="LessonDetail-nav-link LessonDetail-nav-link--next"
          >
            <span className="LessonDetail-nav-label">下一条</span>
            <span className="LessonDetail-nav-title">{nextItem.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </footer>
    </article>
  )
}

export default LessonDetail
