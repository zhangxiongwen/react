import { useEffect, useMemo, useState } from 'react'
import './LiveDemo.css'

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

/**
 * 左侧可编辑代码 + 右侧实时渲染（仅用于需要看效果的 demo）
 */
function LiveDemo({ title, language = 'html', initialCode = '' }) {
  const starter = useMemo(
    () => String(initialCode ?? '').replace(/^\n/, '').replace(/\n$/, ''),
    [initialCode]
  )
  const [code, setCode] = useState(starter)
  const [previewCode, setPreviewCode] = useState(starter)
  const [iframeHeight, setIframeHeight] = useState(160)

  // 外部切换小节时，重置编辑内容
  useEffect(() => {
    setCode(starter)
    setPreviewCode(starter)
  }, [starter])

  // 防抖更新预览，避免每敲一个字都重刷 iframe
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPreviewCode(code)
    }, 280)
    return () => window.clearTimeout(timer)
  }, [code])

  const srcDoc = useMemo(() => buildSrcDoc(previewCode), [previewCode])

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
          <textarea
            className="LiveDemo-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            aria-label={title ? `${title} 代码编辑` : '代码编辑'}
          />
        </div>

        <div className="LiveDemo-pane LiveDemo-pane--preview">
          <div className="LiveDemo-paneLabel">渲染效果</div>
          <div className="LiveDemo-previewFrame">
            <iframe
              title={title ? `${title} 预览` : '代码预览'}
              className="LiveDemo-iframe"
              srcDoc={srcDoc}
              sandbox="allow-same-origin"
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
