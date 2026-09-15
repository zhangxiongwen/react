import { useMemo, useState } from 'react'
import CodePlayground from '../../components/CodePlayground'
import playgroundDemos from '../../data/playgroundDemos'
import './Playground.css'

/**
 * 代码演练台页面：左侧 Demo 菜单 + 右主区编辑/预览
 */
const isReactDemo = (demo) => demo.runtime === 'react'
const REACT_TOTAL = playgroundDemos.filter(isReactDemo).length
const HTML_TOTAL = playgroundDemos.length - REACT_TOTAL

const KINDS = [
  { key: 'all', label: `全部 ${playgroundDemos.length}` },
  { key: 'html', label: `HTML/CSS ${HTML_TOTAL}` },
  { key: 'react', label: `React ${REACT_TOTAL}` },
]

function Playground() {
  const [keyword, setKeyword] = useState('')
  const [kind, setKind] = useState('all')
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
    return groups
      .map(([groupName, demos]) => {
        // 先按类型（HTML / React）过滤，再按关键字过滤
        let next = demos
        if (kind !== 'all') {
          next = next.filter((d) => (kind === 'react' ? isReactDemo(d) : !isReactDemo(d)))
        }
        if (q && !groupName.toLowerCase().includes(q)) {
          next = next.filter(
            (d) =>
              d.title.toLowerCase().includes(q) ||
              d.summary.toLowerCase().includes(q) ||
              d.id.toLowerCase().includes(q)
          )
        }
        return [groupName, next]
      })
      .filter(([, demos]) => demos.length > 0)
  }, [groups, keyword, kind])

  const activeDemo =
    playgroundDemos.find((d) => d.id === activeId) || playgroundDemos[0]

  return (
    <div className="Playground">
      <aside className="Playground-sidebar" aria-label="练习 Demo 列表">
        <div className="Playground-sidebarHead">
          <h1 className="Playground-sidebarTitle">代码演练台</h1>
          <p className="Playground-sidebarDesc">
            共 {playgroundDemos.length} 个练习：HTML / CSS / JS（布局、Tab、轮播、伪类、localStorage / Cookie / URL）和 React（状态、传值、Hooks、请求、实战）。
            点选即可填入编辑器，改完右侧立刻重新渲染。
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
          <div className="Playground-kinds" role="group" aria-label="按类型筛选">
            {KINDS.map((k) => (
              <button
                key={k.key}
                type="button"
                className={
                  kind === k.key ? 'Playground-kind is-active' : 'Playground-kind'
                }
                onClick={() => setKind(k.key)}
              >
                {k.label}
              </button>
            ))}
          </div>
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
          language={activeDemo.language}
          runtime={activeDemo.runtime}
        />
      </div>
    </div>
  )
}

export default Playground
