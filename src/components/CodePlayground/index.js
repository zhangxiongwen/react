import { useEffect, useMemo, useRef, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import './CodePlayground.css'

const EDITOR_FONT =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace'
const EDITOR_FONT_SIZE = 13
const EDITOR_LINE_HEIGHT = 21

/** 允许脚本：演练台需要跑 JS；与课程 LiveDemo 共用同一套包装逻辑 */
function buildSrcDoc(code) {
  const trimmed = String(code ?? '').trim()
  if (!trimmed) {
    return `<!DOCTYPE html><html><body style="margin:16px;font:14px/1.6 system-ui;color:#7a8a80;">（暂无内容，在左侧开始编写）</body></html>`
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
 * 全屏级代码演练：左编辑（高亮）右预览（支持 JS）
 *
 * 预览策略：
 * - 普通编辑：只更新 srcDoc（浏览器会重载文档并执行 script），不额外改 iframe key，避免闪烁
 * - 「立即运行」：在代码未变时也强制 remount，方便重跑 JS
 */
function CodePlayground({
  initialCode = '',
  title = '代码演练',
  onCodeChange,
}) {
  const starter = useMemo(
    () => String(initialCode ?? '').replace(/^\n/, '').replace(/\n$/, ''),
    [initialCode]
  )
  const [code, setCode] = useState(starter)
  const [previewCode, setPreviewCode] = useState(starter)
  const [previewKey, setPreviewKey] = useState(0)

  const editorRef = useRef(null)
  const highlightRef = useRef(null)
  // 挂载后第一次 debounce 与 starter 同步时，若内容没变就不要触发预览更新
  const isFirstDebounceRef = useRef(true)
  const previewCodeRef = useRef(previewCode)
  previewCodeRef.current = previewCode

  useEffect(() => {
    setCode(starter)
    setPreviewCode(starter)
    isFirstDebounceRef.current = true
    // 不在这里 bump previewKey：父级切换 Demo 已用 key remount；再 bump 会连闪两次
  }, [starter])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (isFirstDebounceRef.current) {
        isFirstDebounceRef.current = false
        // 首帧 code 往往等于 previewCode，跳过，避免选中 Demo 后 400ms 再闪一下
        if (code === previewCodeRef.current) {
          onCodeChange?.(code)
          return
        }
      }
      setPreviewCode((prev) => (prev === code ? prev : code))
      onCodeChange?.(code)
    }, 400)
    return () => window.clearTimeout(timer)
  }, [code, onCodeChange])

  useEffect(() => {
    const editor = editorRef.current
    const highlight = highlightRef.current
    if (!editor || !highlight) return
    highlight.scrollTop = editor.scrollTop
    highlight.scrollLeft = editor.scrollLeft
  }, [code])

  const srcDoc = useMemo(() => buildSrcDoc(previewCode), [previewCode])

  function syncHighlightScroll() {
    const editor = editorRef.current
    const highlight = highlightRef.current
    if (!editor || !highlight) return
    highlight.scrollTop = editor.scrollTop
    highlight.scrollLeft = editor.scrollLeft
  }

  function handleReset() {
    isFirstDebounceRef.current = true
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

  function handleRunNow() {
    // 强制重载 iframe，便于在「代码没改」时重新执行 script
    setPreviewCode(code)
    setPreviewKey((k) => k + 1)
  }

  return (
    <div className="CodePlayground">
      <div className="CodePlayground-toolbar">
        <div className="CodePlayground-toolbarMain">
          <span className="CodePlayground-title">{title}</span>
          <span className="CodePlayground-badge">HTML · CSS · JS</span>
        </div>
        <div className="CodePlayground-toolbarActions">
          <button type="button" className="CodePlayground-btn" onClick={handleRunNow}>
            立即运行
          </button>
          <button
            type="button"
            className="CodePlayground-btn CodePlayground-btn--ghost"
            onClick={handleReset}
          >
            重置当前
          </button>
        </div>
      </div>

      <div className="CodePlayground-grid">
        <div className="CodePlayground-pane CodePlayground-pane--code">
          <div className="CodePlayground-paneLabel">代码（可编辑）</div>
          <div className="CodePlayground-editorShell">
            <div
              ref={highlightRef}
              className="CodePlayground-highlight"
              aria-hidden="true"
            >
              <SyntaxHighlighter
                language="markup"
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
                  overflow: 'visible',
                  whiteSpace: 'pre',
                }}
                codeTagProps={{
                  style: {
                    fontFamily: EDITOR_FONT,
                    fontSize: EDITOR_FONT_SIZE,
                    lineHeight: `${EDITOR_LINE_HEIGHT}px`,
                    fontWeight: 400,
                    background: 'transparent',
                    display: 'block',
                    whiteSpace: 'pre',
                  },
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
            <textarea
              ref={editorRef}
              className="CodePlayground-editor"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onScroll={syncHighlightScroll}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              aria-label="代码编辑"
            />
          </div>
        </div>

        <div className="CodePlayground-pane CodePlayground-pane--preview">
          <div className="CodePlayground-paneLabel">实时预览（支持 JS）</div>
          <div className="CodePlayground-previewFrame">
            <iframe
              key={previewKey}
              title="代码实时预览"
              className="CodePlayground-iframe"
              srcDoc={srcDoc}
              sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodePlayground
