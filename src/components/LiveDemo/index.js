import { useEffect, useMemo, useRef, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import {
  buildHighlightStyle,
  normalizeEditorCode,
  syntaxHighlighterCodeStyle,
  syntaxHighlighterSurfaceStyle,
  useHighlightCode,
  useOverlayScrollSync,
} from '../shared/overlayCodeEditor'
import ReactPreview from './ReactPreview'
import './LiveDemo.css'

/**
 * 把片段 HTML 包成完整文档，便于 iframe 预览
 */
function buildSrcDoc(code) {
  const trimmed = String(code ?? '').trim()
  if (!trimmed) {
    return `<!DOCTYPE html><html><body style="margin:16px;font:14px/1.6 system-ui;color:#7a8a80;">（暂无内容）</body></html>`
  }

  // 判断是不是「整篇文档」：跳过开头的空白与 HTML 注释后，看首个标签
  // 不能在全文里搜 <html，否则代码注释里提到 <html> 也会被当成完整文档，
  // 于是跳过下面的包装外壳、丢掉基础样式
  const firstTag = trimmed.replace(/^(?:\s|<!--[\s\S]*?-->)+/, '')
  const looksComplete = /^<!DOCTYPE/i.test(firstTag) || /^<html[\s>]/i.test(firstTag)

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
    ts: 'tsx',
    tsx: 'tsx',
    css: 'css',
    html: 'markup',
    markup: 'markup',
    bash: 'bash',
    text: 'text',
  }
  return map[String(language).toLowerCase()] || 'markup'
}

const highlightStyle = buildHighlightStyle(oneLight)

/**
 * 左侧可编辑代码（语法高亮）+ 右侧实时渲染
 */
function isReactRuntime(runtime, language) {
  if (runtime === 'react') return true
  const lang = String(language || '').toLowerCase()
  return lang === 'tsx' || lang === 'jsx'
}

function LiveDemo({ title, language = 'html', initialCode = '', runtime }) {
  const useReactPreview = isReactRuntime(runtime, language)
  const starter = useMemo(
    () => String(initialCode ?? '').replace(/^\n/, '').replace(/\n$/, ''),
    [initialCode]
  )
  const [code, setCode] = useState(starter)
  const [previewCode, setPreviewCode] = useState(starter)
  const [previewKey, setPreviewKey] = useState(0)
  const [iframeHeight, setIframeHeight] = useState(160)

  const editorRef = useRef(null)
  const highlightContentRef = useRef(null)
  const highlightCode = useHighlightCode(code)
  const syncOverlayScroll = useOverlayScrollSync(editorRef, highlightContentRef, code)
  const isFirstDebounceRef = useRef(true)
  const previewCodeRef = useRef(previewCode)
  previewCodeRef.current = previewCode

  useEffect(() => {
    setCode(starter)
    setPreviewCode(starter)
    isFirstDebounceRef.current = true
  }, [starter])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (isFirstDebounceRef.current) {
        isFirstDebounceRef.current = false
        if (code === previewCodeRef.current) return
      }
      // 内容没变就别 setState，避免无意义重绘 / 闪烁
      setPreviewCode((prev) => (prev === code ? prev : code))
    }, 280)
    return () => window.clearTimeout(timer)
  }, [code])

  const srcDoc = useMemo(() => buildSrcDoc(previewCode), [previewCode])
  const prismLang = resolveLanguage(language)

  function handleCodeChange(event) {
    setCode(normalizeEditorCode(event.target.value))
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
    isFirstDebounceRef.current = true
    setCode(starter)
    setPreviewCode(starter)
    // 必须强制重载 iframe：用户可能只在预览里点过按钮（代码没变），
    // 这时 srcDoc 不变、iframe 不会重载，点重置就会像「没反应」
    setPreviewKey((k) => k + 1)
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
            <div className="LiveDemo-highlight" aria-hidden="true">
              <div ref={highlightContentRef} className="LiveDemo-highlightContent">
                <SyntaxHighlighter
                  language={prismLang}
                  style={highlightStyle}
                  PreTag="pre"
                  CodeTag="code"
                  showLineNumbers={false}
                  wrapLongLines={false}
                  wrapLines={false}
                  customStyle={syntaxHighlighterSurfaceStyle}
                  codeTagProps={{ style: syntaxHighlighterCodeStyle }}
                >
                  {highlightCode}
                </SyntaxHighlighter>
              </div>
            </div>
            <textarea
              ref={editorRef}
              className="LiveDemo-editor"
              value={code}
              onChange={handleCodeChange}
              onScroll={syncOverlayScroll}
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
            {useReactPreview ? (
              <ReactPreview key={previewKey} code={previewCode} />
            ) : (
              <iframe
                key={previewKey}
                title={title ? `${title} 预览` : '代码预览'}
                className="LiveDemo-iframe"
                srcDoc={srcDoc}
                sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
                onLoad={handleIframeLoad}
                style={{ height: iframeHeight }}
              />
            )}
          </div>
        </div>
      </div>
    </figure>
  )
}

export default LiveDemo
