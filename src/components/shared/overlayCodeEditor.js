import { useCallback, useLayoutEffect, useMemo } from 'react'

/** 两侧共用的等宽字体度量，避免光标/选区错位 */
export const EDITOR_FONT =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace'
export const EDITOR_FONT_SIZE = 13
/** 固定 px，禁止用 1.65 这种相对值（textarea 与 pre 算出来可能不一致） */
export const EDITOR_LINE_HEIGHT = 21

/** 粘贴 Windows 文本时统一换行，避免 \\r 导致高亮层与 textarea 行数不一致 */
export function normalizeEditorCode(value) {
  return String(value ?? '').replace(/\r\n?/g, '\n')
}

/**
 * 高亮层专用：末尾补一个换行，让最后一行光标位置与 textarea 对齐
 * （pre 没有尾换行时，光标会比高亮层「少一行高度」）
 */
export function toHighlightCode(code) {
  const text = normalizeEditorCode(code)
  if (!text) return '\n'
  return text.endsWith('\n') ? text : `${text}\n`
}

/** 去掉 theme 里会改变字形度量的样式（粗体/斜体是错位主因） */
export function buildHighlightStyle(theme) {
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

export const syntaxHighlighterSurfaceStyle = {
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
}

export const syntaxHighlighterCodeStyle = {
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
}

/**
 * 用 transform 平移高亮层，而不是让高亮容器自己 scroll。
 * 这样 textarea 的 scrollbar-gutter 不会把两层内容宽度弄不一致。
 */
export function useOverlayScrollSync(editorRef, highlightContentRef, code) {
  const sync = useCallback(() => {
    const editor = editorRef.current
    const content = highlightContentRef.current
    if (!editor || !content) return
    content.style.transform = `translate3d(${-editor.scrollLeft}px, ${-editor.scrollTop}px, 0)`
  }, [editorRef, highlightContentRef])

  useLayoutEffect(() => {
    sync()
  }, [code, sync])

  return sync
}

export function useHighlightCode(code) {
  return useMemo(() => toHighlightCode(code), [code])
}
