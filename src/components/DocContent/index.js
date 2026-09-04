import CodeBlock from '../CodeBlock'
import LiveDemo from '../LiveDemo'
import './DocContent.css'

/** 英文叙述里常见、不应当成代码的词 */
const PROSE_STOPWORDS = new Set(
  [
    'a', 'an', 'the', 'and', 'or', 'but', 'to', 'of', 'in', 'on', 'at', 'by',
    'as', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'with', 'for',
    'from', 'into', 'over', 'under', 'about', 'than', 'then', 'that', 'this',
    'these', 'those', 'it', 'its', 'you', 'your', 'we', 'our', 'they', 'their',
    'can', 'will', 'just', 'also', 'only', 'more', 'most', 'some', 'any', 'all',
    'each', 'both', 'same', 'other', 'such', 'when', 'what', 'which', 'who',
    'how', 'why', 'not', 'no', 'yes', 'ok', 'vs', 'via', 'per', 'off', 'up',
    'out', 'so', 'if', 'do', 'does', 'did', 'done', 'has', 'have', 'had',
    'demo', 'bug', 'ui', 'ux', 'web', 'app', 'apps', 'page', 'pages', 'file',
    'files', 'code', 'codes', 'tip', 'note', 'step', 'steps',
  ].map((w) => w.toLowerCase())
)

/**
 * JS / 常用库关键字与标识符（小写单词也要高亮）
 * 注：from/import/if/for 等虽在 stopwords 里，但关键字表优先
 */
const CODE_KEYWORDS = new Set(
  [
    'import', 'export', 'from', 'default', 'const', 'let', 'var', 'function',
    'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break',
    'continue', 'class', 'extends', 'super', 'new', 'this', 'typeof',
    'instanceof', 'async', 'await', 'try', 'catch', 'finally', 'throw',
    'delete', 'in', 'of', 'yield', 'static', 'get', 'set', 'true', 'false',
    'null', 'undefined', 'void', 'debugger', 'with', 'enum', 'implements',
    'interface', 'package', 'private', 'protected', 'public', 'type', 'as',
    'react', 'redux', 'props', 'prop', 'state', 'dispatch', 'action', 'reducer',
    'store', 'slice', 'selector', 'ref', 'refs', 'key', 'keys', 'children',
    'context', 'provider', 'consumer', 'hooks', 'hook', 'memo', 'lazy',
    'strictmode', 'fragment', 'suspense', 'portal', 'hydrate', 'render',
    'createRoot', 'createElement', 'cloneElement',
    'items', 'item', 'list', 'lists', 'keyword', 'keywords', 'count', 'total',
    'form', 'error', 'errors', 'data', 'loading', 'user', 'users', 'value',
    'values', 'index', 'event', 'events', 'prev', 'next', 'name', 'id', 'ids',
    'url', 'path', 'query', 'params', 'param', 'option', 'options', 'config',
    'result', 'results', 'response', 'request', 'token', 'tokens', 'flag',
    'flags', 'status', 'message', 'messages', 'title', 'text', 'label',
    'input', 'output', 'target', 'source', 'callback', 'handler', 'handlers',
    'onclick', 'onchange', 'onsubmit', 'onload', 'fetch', 'axios', 'promise',
    'resolve', 'reject', 'then', 'map', 'filter', 'reduce', 'find', 'some',
    'every', 'includes', 'push', 'pop', 'shift', 'unshift', 'splice', 'slice',
    'concat', 'join', 'split', 'trim', 'length', 'stringify', 'parse',
    'localstorage', 'sessionstorage', 'window', 'document', 'console',
    'log', 'warn', 'info', 'timeout', 'interval', 'settimeout', 'setinterval',
    'json', 'html', 'css', 'jsx', 'tsx', 'dom', 'api', 'crud', 'rest', 'http',
    'npm', 'npx', 'yarn', 'pnpm', 'node', 'webpack', 'babel', 'vite',
    'router', 'route', 'routes', 'link', 'navlink', 'outlet', 'navigate',
    'basename', 'history', 'location', 'match', 'exact', 'strict',
    'classname', 'style', 'styles', 'cssmodules', 'styled',
    'usestate', 'useeffect', 'usememo', 'usecallback', 'useref', 'usecontext',
    'usereducer', 'uselayouteffect', 'useimperativehandle', 'usedebugvalue',
    'useid', 'usedeferredvalue', 'usetransition', 'usesyncexternalstore',
    'useselector', 'usedispatch', 'usestore', 'usenavigate', 'useparams',
    'uselocation', 'usesearchparams', 'useroutes', 'userouteerror',
    'createroot', 'createslice', 'configurestore', 'createasyncthunk',
    'createcontext', 'createbrowserrouter', 'browserrouter', 'hashrouter',
    'routerprovider', 'navlink', 'navigate', 'outlet', 'link',
  ].map((w) => w.toLowerCase())
)

/** 匹配规则：越靠前越优先；同一起点取更长的 */
const AUTO_CODE_PATTERNS = [
  // 1) 函数 / 方法调用整段：filterItems(items, keyword)、setCount(c => c + 1)
  /\b[a-zA-Z_$][\w$]*(?:\.[a-zA-Z_$][\w$]*)*\([^)]*\)/g,
  // 2) HTML / JSX 标签
  /<\/?[A-Za-z][A-Za-z0-9]*(?:\s[^<>]*?)?\/?>/g,
  // 3) npm / npx / node 命令
  /\bnpm(?:\s+run)?\s+[\w:-]+/g,
  /\bnpx\s+[\w@/.-]+/g,
  /\bnode\s+-\w+/g,
  // 4) 路径、文件名、scoped 包
  /\b(?:src|public|build)\/[\w./-]+/g,
  /\b[\w-]+\.(?:js|jsx|ts|tsx|css|json|html|md)\b/g,
  /@[a-z0-9-]+\/[a-z0-9._-]+/g,
  // 5) 属性链（无括号）：form.name、item.id、props.onRemove
  /\b[a-zA-Z_$][\w$]*(?:\.[a-zA-Z_$][\w$]*)+/g,
  // 6) 计算属性 / 简单括号表达式残留：[key]、[...list]
  /\[[^\]]+\]/g,
  // 7) camelCase / PascalCase / SCREAMING_SNAKE
  /\b[a-z][a-zA-Z0-9]*[A-Z][a-zA-Z0-9]*\b/g,
  /\b[A-Z][a-z0-9]+(?:[A-Z][a-z0-9]+)+\b/g,
  /\b[A-Z][A-Z0-9]*_[A-Z0-9_]+\b/g,
]

/** 普通单词：关键字，或夹在中文语境中的变量名 */
const IDENT_PATTERN = /\b[a-zA-Z_$][\w$]*\b/g

function isChineseOrCodeFence(ch) {
  if (!ch) return true
  const code = ch.codePointAt(0)
  if (code >= 0x4e00 && code <= 0x9fff) return true
  if (code >= 0x3000 && code <= 0x303f) return true
  if (code >= 0xff00 && code <= 0xffef) return true
  return /[—–\-：:，,。．、；;！!？?（）()【】\[\]《》<>「」『』…\s"'`/\\]/.test(ch)
}

function shouldHighlightIdentifier(word, source, index) {
  const lower = word.toLowerCase()
  if (CODE_KEYWORDS.has(lower)) return true
  if (PROSE_STOPWORDS.has(lower)) return false
  if (/[A-Z]/.test(word) || word.includes('_') || word.includes('$')) return true

  const prev = index > 0 ? source[index - 1] : ''
  const next = source[index + word.length] || ''
  if (isChineseOrCodeFence(prev) && isChineseOrCodeFence(next)) return true

  return false
}

function findNextAutoCode(source, from) {
  let best = null
  const patterns = [...AUTO_CODE_PATTERNS, IDENT_PATTERN]

  for (const pattern of patterns) {
    pattern.lastIndex = from
    let match = pattern.exec(source)

    while (match) {
      const needsFilter = pattern === IDENT_PATTERN
      if (needsFilter && !shouldHighlightIdentifier(match[0], source, match.index)) {
        pattern.lastIndex = match.index + match[0].length
        match = pattern.exec(source)
        continue
      }

      if (
        !best ||
        match.index < best.index ||
        (match.index === best.index && match[0].length > best[0].length)
      ) {
        best = match
      }
      break
    }
  }

  return best
}

function codeNode(content, key) {
  return (
    <code key={key} className="DocContent-code">
      {content}
    </code>
  )
}

/** 对纯文本段做自动代码识别 */
function wrapAutoCode(text, keyPrefix) {
  const source = String(text ?? '')
  if (!source) return null

  const nodes = []
  let lastIndex = 0
  let n = 0
  let guard = 0

  while (lastIndex < source.length && guard++ < source.length + 5) {
    const match = findNextAutoCode(source, lastIndex)
    if (!match) {
      nodes.push(source.slice(lastIndex))
      break
    }

    // 保险：匹配落在已处理区域之后
    if (match.index < lastIndex) {
      lastIndex += 1
      continue
    }

    if (match.index > lastIndex) {
      nodes.push(source.slice(lastIndex, match.index))
    }
    nodes.push(codeNode(match[0], `${keyPrefix}-a-${n++}`))
    lastIndex = match.index + match[0].length
  }

  if (nodes.length === 0) return null
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
    lines.every((line) => /^\s*\d+[\.、]\s+/.test(line))
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
              {renderInline(line.replace(/^\s*\d+[\.、]\s+/, ''))}
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
