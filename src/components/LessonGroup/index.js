import { Link } from 'react-router-dom'
import { getLessonPath } from '../../utils/helpers'
import './LessonGroup.css'

/**
 * 首页上的「一大类知识点」
 * 展示标题、简介，以及下面可点击的子条目列表
 */
function LessonGroup({ category }) {
  return (
    <article
      className="LessonGroup"
      id={`category-${category.id}`}
    >
      <header className="LessonGroup-header">
        <span className="LessonGroup-order">
          {String(category.order).padStart(2, '0')}
        </span>
        <div>
          <h2 className="LessonGroup-title">{category.title}</h2>
          <p className="LessonGroup-summary">{category.summary}</p>
        </div>
      </header>

      <ul className="LessonGroup-list">
        {category.items.map((item, index) => (
          <li key={item.id}>
            <Link
              to={getLessonPath(category.id, item.id)}
              className="LessonGroup-item"
            >
              <span className="LessonGroup-item-head">
                {/* 自动编号，文章里的「第 N 节」按这个数字对照 */}
                <span className="LessonGroup-item-num">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="LessonGroup-item-title">{item.title}</span>
              </span>
              <span className="LessonGroup-item-summary">{item.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}

export default LessonGroup
