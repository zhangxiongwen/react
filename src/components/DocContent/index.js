import CodeBlock from '../CodeBlock'
import LiveDemo from '../LiveDemo'
import './DocContent.css'

/**
 * 正文：按空行拆成多段，读起来更像「详细笔记」而不是一大坨
 */
function TextBody({ body }) {
  const parts = String(body ?? '')
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  if (parts.length === 0) return null

  return parts.map((part, i) => (
    <p key={i} className="DocContent-para">
      {part}
    </p>
  ))
}

/**
 * 文档内容渲染器
 * sections：tip / text / list / table / code（code + live → 左右预览）
 */
function DocContent({ sections = [] }) {
  return (
    <div className="DocContent">
      {sections.map((section, index) => {
        if (section.type === 'code' && section.live) {
          return (
            <LiveDemo
              key={index}
              title={section.title}
              language={section.language}
              initialCode={section.body}
            />
          )
        }

        if (section.type === 'code') {
          return (
            <CodeBlock
              key={index}
              title={section.title}
              language={section.language}
            >
              {section.body}
            </CodeBlock>
          )
        }

        if (section.type === 'tip') {
          return (
            <aside key={index} className="DocContent-tip">
              {section.title && <strong>{section.title}</strong>}
              <TextBody body={section.body} />
            </aside>
          )
        }

        if (section.type === 'list') {
          const Tag = section.ordered ? 'ol' : 'ul'
          return (
            <section key={index} className="DocContent-list">
              {section.title && <h3>{section.title}</h3>}
              {section.intro && <TextBody body={section.intro} />}
              <Tag>
                {(section.items || []).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </Tag>
            </section>
          )
        }

        if (section.type === 'table') {
          return (
            <section key={index} className="DocContent-tableWrap">
              {section.title && <h3>{section.title}</h3>}
              {section.intro && <TextBody body={section.intro} />}
              <div className="DocContent-tableScroll">
                <table className="DocContent-table">
                  <thead>
                    <tr>
                      {(section.headers || []).map((h, i) => (
                        <th key={i}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(section.rows || []).map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {section.note && (
                <p className="DocContent-tableNote">{section.note}</p>
              )}
            </section>
          )
        }

        return (
          <section key={index} className="DocContent-text">
            {section.title && <h3>{section.title}</h3>}
            <TextBody body={section.body} />
          </section>
        )
      })}
    </div>
  )
}

export default DocContent
