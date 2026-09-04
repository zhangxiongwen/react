import { useEffect, useMemo, useRef, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './LiveDemo.css'

/** 两侧共用的等宽字体度量，避免光标/选区错位 */
const EDITOR_FONT =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace'
const EDITOR_FONT_SIZE = 13
const EDITOR_LINE_HEIGHT = 21 // 固定 px，禁止用 1.65 这种两边算出来不一致的值

/**
 * 把片段 HTML 包成完整文档，便于 iframe 预览
 */
function buildSrcDoc(code) {
  const trimmed = String(code ?? '').trim()
  if (!trimmed) {
    return `<!DOCTYPE html><html><body style="margin:16px;font:14px/1.6 system-ui;color:#7a8a80;">（暂无内容）</body></html>`
  }

  const looksComplete =
    /<!DOCTYPE/i.test(trimmed) || /<html[\s>]/i.test(trimmed)

  if (looksComplete) return trimmed

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body {
      margin: 14px;
      font: 14px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif;
      color: #1f2a24;
      background: #fff;
    }
    button { font: inherit; cursor: pointer; }
  </style>
</head>
<body>
${trimmed}
</body>
</html>`
}

function resolveLanguage(language = 'html') {
  const map = {
    js: 'javascript',
    javascript: 'javascript',
    jsx: 'jsx',
    css: 'css',
    html: 'markup',
    markup: 'markup',
    text: 'text',
  }
  return map[String(language).toLowerCase()] || 'markup'
}

/**
 * 去掉 theme 里会改变字形度量的样式（粗体/斜体会导致越往下越错位）
 */
function buildHighlightStyle(theme) {
  const next = { ...theme }
  Object.keys(next).forEach((key) => {
    const rule = next[key]
    if (!rule || typeof rule !== 'object') return
    next[key] = {
      ...rule,
      fontWeight: '400',
      fontStyle: 'normal',
      textDecoration: 'none',
      letterSpacing: 'normal',
      fontFamily: EDITOR_FONT,
      fontSize: `${EDITOR_FONT_SIZE}px`,
      lineHeight: `${EDITOR_LINE_HEIGHT}px`,
    }
  })
  return next
}

const highlightStyle = buildHighlightStyle(oneLight)

/**
 * 左侧可编辑代码（语法高亮）+ 右侧实时渲染
 */
function LiveDemo({ title, language = 'html', initialCode = '' }) {
  const starter = useMemo(
    () => String(initialCode ?? '').replace(/^\n/, '').replace(/\n$/, ''),
    [initialCode]
  )
  const [code, setCode] = useState(starter)
  const [previewCode, setPreviewCode] = useState(starter)
  const [iframeHeight, setIframeHeight] = useState(160)

  const editorRef = useRef(null)
  const highlightRef = useRef(null)

  useEffect(() => {
    setCode(starter)
    setPreviewCode(starter)
  }, [starter])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPreviewCode(code)
    }, 280)
    return () => window.clearTimeout(timer)
  }, [code])

  // 高亮层内容变化后，重新对齐一次滚动位置
  useEffect(() => {
    const editor = editorRef.current
    const highlight = highlightRef.current
    if (!editor || !highlight) return
    highlight.scrollTop = editor.scrollTop
    highlight.scrollLeft = editor.scrollLeft
  }, [code])

  const srcDoc = useMemo(() => buildSrcDoc(previewCode), [previewCode])
  const prismLang = resolveLanguage(language)

  function syncHighlightScroll() {
    const editor = editorRef.current
    const highlight = highlightRef.current
    if (!editor || !highlight) return
    highlight.scrollTop = editor.scrollTop
    highlight.scrollLeft = editor.scrollLeft
  }

  function handleIframeLoad(event) {
    try {
      const doc = event.currentTarget.contentDocument
      if (!doc?.body) return
      const next = Math.max(120, Math.min(doc.body.scrollHeight + 28, 520))
      setIframeHeight(next)
    } catch {
      setIframeHeight(200)
    }
  }

  function handleReset() {
    setCode(starter)
    setPreviewCode(starter)
  }

  function handleKeyDown(event) {
    if (event.key !== 'Tab') return
    event.preventDefault()
    const el = event.currentTarget
    const start = el.selectionStart
    const end = el.selectionEnd
    const next = `${code.slice(0, start)}  ${code.slice(end)}`
    setCode(next)
    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = start + 2
    })
  }

  return (
    <figure className="LiveDemo">
      <figcaption className="LiveDemo-meta">
        <div className="LiveDemo-metaMain">
          {title && <span className="LiveDemo-title">{title}</span>}
          <span className="LiveDemo-badge">可编辑 · 实时预览</span>
        </div>
        <div className="LiveDemo-metaActions">
          {language && <span className="LiveDemo-lang">{language}</span>}
          <button type="button" className="LiveDemo-reset" onClick={handleReset}>
            重置
          </button>
        </div>
      </figcaption>

      <div className="LiveDemo-grid">
        <div className="LiveDemo-pane LiveDemo-pane--code">
          <div className="LiveDemo-paneLabel">代码</div>
          <div className="LiveDemo-editorShell">
            <div
              ref={highlightRef}
              className="LiveDemo-highlight"
              aria-hidden="true"
            >
              <SyntaxHighlighter
                language={prismLang}
                style={highlightStyle}
                PreTag="pre"
                CodeTag="code"
                showLineNumbers={false}
                wrapLongLines={false}
                wrapLines={false}
                customStyle={{
                  margin: 0,
                  padding: 0,
                  background: 'transparent',
                  fontFamily: EDITOR_FONT,
                  fontSize: EDITOR_FONT_SIZE,
                  lineHeight: `${EDITOR_LINE_HEIGHT}px`,
                  fontWeight: 400,
                  fontStyle: 'normal',
                  letterSpacing: 'normal',
                  wordSpacing: 'normal',
                  tabSize: 2,
                  overflow: 'visible',
                  whiteSpace: 'pre',
                }}
                codeTagProps={{
                  style: {
                    fontFamily: EDITOR_FONT,
                    fontSize: EDITOR_FONT_SIZE,
                    lineHeight: `${EDITOR_LINE_HEIGHT}px`,
                    fontWeight: 400,
                    fontStyle: 'normal',
                    letterSpacing: 'normal',
                    wordSpacing: 'normal',
                    background: 'transparent',
                    display: 'block',
                    tabSize: 2,
                    whiteSpace: 'pre',
                  },
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
            <textarea
              ref={editorRef}
              className="LiveDemo-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onScroll={syncHighlightScroll}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              aria-label={title ? `${title} 代码编辑` : '代码编辑'}
            />
          </div>
        </div>

        <div className="LiveDemo-pane LiveDemo-pane--preview">
          <div className="LiveDemo-paneLabel">渲染效果</div>
          <div className="LiveDemo-previewFrame">
            <iframe
              title={title ? `${title} 预览` : '代码预览'}
              className="LiveDemo-iframe"
              srcDoc={srcDoc}
              sandbox="allow-same-origin allow-forms"
              onLoad={handleIframeLoad}
              style={{ height: iframeHeight }}
            />
          </div>
        </div>
      </div>
    </figure>
  )
}

export default LiveDemo
