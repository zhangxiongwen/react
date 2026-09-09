import CodeBlock from '../CodeBlock'
import LiveDemo from '../LiveDemo'
import { findAutoCodeSegments } from './autoCode'
import './DocContent.css'

function codeNode(content, key) {
  return (
    <code key={key} className="DocContent-code">
      {content}
    </code>
  )
}

/** 对纯文本段做自动代码识别 */
function wrapAutoCode(text, keyPrefix) {
  const segments = findAutoCodeSegments(text)
  if (segments.length === 0) return null

  const nodes = segments.map((seg, i) =>
    seg.type === 'code' ? codeNode(seg.value, `${keyPrefix}-a-${i}`) : seg.value
  )

  return nodes.length === 1 ? nodes[0] : nodes
}

/**
 * 行内轻量 Markdown：`code`、**粗体**；其余纯文本再自动识别代码片段
 */
function renderInline(text, keyPrefix = 'i') {
  const source = String(text ?? '')
  if (!source) return null

  const nodes = []
  const re = /(\*\*(.+?)\*\*|`([^`]+)`)/g
  let lastIndex = 0
  let match
  let n = 0

  while ((match = re.exec(source)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        wrapAutoCode(source.slice(lastIndex, match.index), `${keyPrefix}-t${n}`)
      )
    }

    if (match[2] != null) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${n++}`}>
          {renderInline(match[2], `${keyPrefix}-nb-${n}`)}
        </strong>
      )
    } else {
      nodes.push(codeNode(match[3], `${keyPrefix}-c-${n++}`))
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < source.length) {
    nodes.push(wrapAutoCode(source.slice(lastIndex), `${keyPrefix}-t-end`))
  }

  const flat = nodes.filter((x) => x != null && x !== '')
  if (flat.length === 0) return null
  return flat.length === 1 ? flat[0] : flat
}

function isBulletBlock(lines) {
  return (
    lines.length > 0 &&
    lines.every((line) => /^\s*[-*]\s+/.test(line))
  )
}

function isOrderedBlock(lines) {
  return (
    lines.length > 0 &&
    lines.every((line) => /^\s*\d+[.、]\s+/.test(line))
  )
}

/**
 * 一段正文：支持空行分段、段内换行、段内 - / 1. 列表、行内 code/粗体
 */
function TextBody({ body }) {
  const parts = String(body ?? '')
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  if (parts.length === 0) return null

  return parts.map((part, i) => {
    const lines = part
      .split('\n')
      .map((l) => l.trimEnd())
      .filter((l) => l.length > 0)

    if (isBulletBlock(lines)) {
      return (
        <ul key={i} className="DocContent-inlineList">
          {lines.map((line, li) => (
            <li key={li}>{renderInline(line.replace(/^\s*[-*]\s+/, ''))}</li>
          ))}
        </ul>
      )
    }

    if (isOrderedBlock(lines)) {
      return (
        <ol key={i} className="DocContent-inlineList">
          {lines.map((line, li) => (
            <li key={li}>
              {renderInline(line.replace(/^\s*\d+[.、]\s+/, ''))}
            </li>
          ))}
        </ol>
      )
    }

    const softLines = part.split('\n')
    return (
      <p key={i} className="DocContent-para">
        {softLines.map((line, li) => (
          <span key={li}>
            {li > 0 && <br />}
            {renderInline(line, `p${i}-${li}`)}
          </span>
        ))}
      </p>
    )
  })
}

function RichCell({ children }) {
  return renderInline(children, 'cell')
}

function SectionTitle({ children }) {
  if (!children) return null
  return <h3>{renderInline(children, 'h')}</h3>
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
              runtime={section.runtime}
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
              {section.title && (
                <strong className="DocContent-tipTitle">
                  {renderInline(section.title, 'tip-title')}
                </strong>
              )}
              <TextBody body={section.body} />
            </aside>
          )
        }

        if (section.type === 'list') {
          const Tag = section.ordered ? 'ol' : 'ul'
          return (
            <section key={index} className="DocContent-list">
              <SectionTitle>{section.title}</SectionTitle>
              {section.intro && <TextBody body={section.intro} />}
              <Tag>
                {(section.items || []).map((item, i) => (
                  <li key={i}>{renderInline(item, `li-${i}`)}</li>
                ))}
              </Tag>
            </section>
          )
        }

        if (section.type === 'table') {
          return (
            <section key={index} className="DocContent-tableWrap">
              <SectionTitle>{section.title}</SectionTitle>
              {section.intro && <TextBody body={section.intro} />}
              <div className="DocContent-tableScroll">
                <table className="DocContent-table">
                  <thead>
                    <tr>
                      {(section.headers || []).map((h, i) => (
                        <th key={i}>
                          <RichCell>{h}</RichCell>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(section.rows || []).map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci}>
                            <RichCell>{cell}</RichCell>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {section.note && (
                <p className="DocContent-tableNote">
                  {renderInline(section.note, 'note')}
                </p>
              )}
            </section>
          )
        }

        return (
          <section key={index} className="DocContent-text">
            <SectionTitle>{section.title}</SectionTitle>
            <TextBody body={section.body} />
          </section>
        )
      })}
    </div>
  )
}

export default DocContent
