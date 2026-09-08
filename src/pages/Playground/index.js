import { useMemo, useState } from 'react'
import CodePlayground from '../../components/CodePlayground'
import playgroundDemos from '../../data/playgroundDemos'
import './Playground.css'

/**
 * 代码演练台页面：左侧 Demo 菜单 + 右主区编辑/预览
 */
function Playground() {
  const [keyword, setKeyword] = useState('')
  const [activeId, setActiveId] = useState(playgroundDemos[0]?.id || 'blank')

  const groups = useMemo(() => {
    const map = new Map()
    playgroundDemos.forEach((demo) => {
      const list = map.get(demo.group) || []
      list.push(demo)
      map.set(demo.group, list)
    })
    return [...map.entries()]
  }, [])

  const filteredGroups = useMemo(() => {
    const q = keyword.trim().toLowerCase()
    if (!q) return groups
    return groups
      .map(([groupName, demos]) => {
        const hitGroup = groupName.toLowerCase().includes(q)
        const next = hitGroup
          ? demos
          : demos.filter(
              (d) =>
                d.title.toLowerCase().includes(q) ||
                d.summary.toLowerCase().includes(q) ||
                d.id.toLowerCase().includes(q)
            )
        return [groupName, next]
      })
      .filter(([, demos]) => demos.length > 0)
  }, [groups, keyword])

  const activeDemo =
    playgroundDemos.find((d) => d.id === activeId) || playgroundDemos[0]

  return (
    <div className="Playground">
      <aside className="Playground-sidebar" aria-label="练习 Demo 列表">
        <div className="Playground-sidebarHead">
          <h1 className="Playground-sidebarTitle">代码演练台</h1>
          <p className="Playground-sidebarDesc">
            共 {playgroundDemos.length} 个布局练习，从基础到聊天 / Tab /
            轮播 / 拖拽。点选即可填入编辑器，支持 HTML / CSS / JS。
          </p>
          <label className="Playground-searchLabel">
            <span className="Playground-srOnly">搜索 Demo</span>
            <input
              className="Playground-search"
              type="search"
              placeholder="搜索标题 / 分组…"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </label>
        </div>

        <nav className="Playground-menu">
          {filteredGroups.length === 0 && (
            <p className="Playground-empty">没有匹配的 Demo</p>
          )}
          {filteredGroups.map(([groupName, demos]) => (
            <div key={groupName} className="Playground-group">
              <div className="Playground-groupTitle">
                {groupName}
                <span className="Playground-groupCount">{demos.length}</span>
              </div>
              <ul className="Playground-list">
                {demos.map((demo) => (
                  <li key={demo.id}>
                    <button
                      type="button"
                      className={
                        activeId === demo.id
                          ? 'Playground-item is-active'
                          : 'Playground-item'
                      }
                      onClick={() => setActiveId(demo.id)}
                    >
                      <span className="Playground-itemTitle">{demo.title}</span>
                      <span className="Playground-itemSummary">{demo.summary}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <div className="Playground-main">
        <CodePlayground
          key={activeDemo.id}
          initialCode={activeDemo.code}
          title={activeDemo.title}
        />
      </div>
    </div>
  )
}

export default Playground
