import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './CodeBlock.css'

/**
 * 把文档里的 language 字段映射成 Prism 支持的语言名
 */
function resolveLanguage(language = 'jsx') {
  const map = {
    js: 'javascript',
    javascript: 'javascript',
    jsx: 'jsx',
    ts: 'typescript',
    typescript: 'typescript',
    tsx: 'tsx',
    bash: 'bash',
    shell: 'bash',
    sh: 'bash',
    css: 'css',
    json: 'json',
    html: 'markup',
    text: 'text',
    plaintext: 'text',
  }
  return map[String(language).toLowerCase()] || 'jsx'
}

/**
 * 代码展示块（带语法高亮）
 * - title / language：顶栏说明
 * - children：代码字符串
 */
function CodeBlock({ title, language = 'jsx', children }) {
  const code = String(children ?? '').replace(/^\n/, '').replace(/\n$/, '')
  const lang = resolveLanguage(language)

  return (
    <figure className="CodeBlock">
      {(title || language) && (
        <figcaption className="CodeBlock-meta">
          {title && <span className="CodeBlock-title">{title}</span>}
          {language && <span className="CodeBlock-lang">{language}</span>}
        </figcaption>
      )}

      <div className="CodeBlock-body">
        <SyntaxHighlighter
          language={lang}
          style={oneLight}
          showLineNumbers={false}
          wrapLongLines={false}
          customStyle={{
            margin: 0,
            padding: '16px 18px',
            background: '#ffffff',
            fontSize: 13,
            lineHeight: 1.7,
            borderRadius: 0,
          }}
          codeTagProps={{
            style: {
              fontFamily:
                '"IBM Plex Mono", Menlo, Monaco, Consolas, monospace',
              background: 'transparent',
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </figure>
  )
}

export default CodeBlock
