/**
 * 正文里的「行内代码」自动识别
 *
 * 设计目标：一段代码要**整体**命中，不能只框住其中一小截。
 * 反面例子（旧实现）：
 *   .card > p   → 只框住 card 和 p，点号和箭头露在外面
 *   后代 A B    → A、B 各框一次，看不出是一个选择器
 *   display: flex → display 和 flex 各框一次，冒号露在外面
 *
 * 做法：先用「整段优先」的规则（选择器链、声明、函数调用…）去匹配，
 * 匹配不到再退化到单个标识符。多条规则命中时取起点最靠前的；
 * 起点相同则取更长的那一段。
 */

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
    'routerprovider',
  ].map((w) => w.toLowerCase())
)

/** HTML 标签名：用来判断 ul li、nav a 这类「纯标签选择器」 */
const HTML_TAGS = new Set([
  'html', 'head', 'body', 'div', 'span', 'p', 'a', 'ul', 'ol', 'li', 'dl',
  'dt', 'dd', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'footer', 'nav',
  'main', 'section', 'article', 'aside', 'form', 'input', 'textarea', 'select',
  'option', 'optgroup', 'button', 'label', 'fieldset', 'legend', 'table',
  'thead', 'tbody', 'tfoot', 'tr', 'td', 'th', 'caption', 'img', 'picture',
  'video', 'audio', 'source', 'canvas', 'svg', 'iframe', 'figure',
  'figcaption', 'blockquote', 'pre', 'code', 'em', 'strong', 'b', 'i', 'u',
  's', 'small', 'sub', 'sup', 'mark', 'br', 'hr', 'details', 'summary',
  'dialog', 'template', 'slot', 'script', 'link', 'meta', 'style', 'title',
])

/** 单个单词就能构成的 CSS 属性名（带连字符的一律直接认，不用列举） */
const CSS_PROPS = new Set([
  'display', 'position', 'margin', 'padding', 'width', 'height', 'color',
  'background', 'border', 'flex', 'grid', 'gap', 'font', 'overflow', 'top',
  'left', 'right', 'bottom', 'content', 'cursor', 'opacity', 'transition',
  'transform', 'order', 'inset', 'outline', 'visibility', 'float', 'clear',
  'filter', 'resize', 'quotes', 'direction', 'zoom', 'animation', 'contain',
  'isolation', 'appearance', 'translate', 'rotate', 'scale', 'all',
])

/** 带连字符但属于普通英文叙述的词，不当代码 */
const HYPHEN_PROSE = new Set([
  'e-mail', 'front-end', 'back-end', 'full-stack', 'step-by-step',
  'copy-paste', 'up-to-date', 'so-called', 'trade-off', 'trade-offs',
  'know-how', 'all-in-one', 'end-to-end', 'must-have',
  'kebab-case', 'camel-case', 'snake-case', 'read-only', 'tree-shaking',
  're-render', 're-renders', 're-export', 're-run', 're-use',
])

// ── 选择器片段的正则积木 ─────────────────────────────────────
/** 基础单元：div、.card、#app */
const UNIT_BASE = String.raw`(?:[.#][A-Za-z][\w-]*|[A-Za-z][\w-]*)`
/** 尾缀：.b（多 class）、[type="text"]、:hover、::before、:nth-child(2n+1) */
const UNIT_TAIL = String.raw`(?:[.#][A-Za-z][\w-]*|\[[^\]\n]{1,60}\]|::?[a-zA-Z-]+(?:\([^()\n]{0,40}\))?)`
/** 一个完整单元：可以只有尾缀（比如单独写 :hover） */
const UNIT = `(?:${UNIT_BASE}${UNIT_TAIL}*|${UNIT_TAIL}+)`

/**
 * CSS 声明的值：只吃 ASCII，遇到中文或中文标点自然停下。
 * 每段值必须以字母/数字开头（`!important` 除外），且不含裸逗号，
 * 这样「center / space-between」的斜杠、「flex:1, row flex」的逗号
 * 都不会被吞进来，而是断成独立的代码片段。
 */
const DECL_TOKEN = String.raw`(?:"[^"\n]*"|'[^'\n]*'|[a-zA-Z-]+\([^()\n]{0,40}\)|!?[#.]?[A-Za-z0-9][A-Za-z0-9#%./_-]*)`
const DECL_VALUE = `${DECL_TOKEN}(?:[ \\t]+${DECL_TOKEN})*`

/** 文件名（index.js、Home.css）：是文件不是选择器 */
function looksLikeFileName(unit) {
  return /\.(?:js|jsx|ts|tsx|css|json|html|md)$/i.test(unit)
}

/**
 * 「属性:值」而不是「标签:伪类」
 * overflow:auto、display:flex 是声明；p:hover、li:first-child 是选择器
 */
function looksLikeDeclaration(unit) {
  const m = unit.match(/^([a-z][a-z-]*):[a-z0-9]/i)
  if (!m) return false
  const prop = m[1].toLowerCase()
  if (HTML_TAGS.has(prop)) return false
  return prop.includes('-') || CSS_PROPS.has(prop)
}

/** 这一段看起来像不像「选择器的一个单元」 */
function isPlausibleUnit(unit) {
  if (!unit) return false
  if (looksLikeFileName(unit) || looksLikeDeclaration(unit)) return false
  // 带 . # : [ 的一定是选择器写法
  if (/[.#:[]/.test(unit)) return true
  // 单个大写字母：文档里常用 A、B 当占位符（后代 A B）
  if (/^[A-Z]$/.test(unit)) return true
  // 纯标签名
  return HTML_TAGS.has(unit.toLowerCase())
}

/** 单元里是否带「选择器信号」（点、井号、冒号、方括号） */
function hasSelectorSignal(unit) {
  return /[.#:[]/.test(unit)
}

/** 拆出组合选择器里的各个单元 */
function splitUnits(text) {
  return text
    .split(/[ \t]*[>+~][ \t]*|[ \t]+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function validateSelectorChain(matched) {
  const units = splitUnits(matched)
  if (units.length < 2) return false
  if (!units.every(isPlausibleUnit)) return false
  // 有组合符（> + ~）本身就是强信号，直接通过
  if (/[>+~]/.test(matched)) return true

  // 空格分隔的后代选择器最容易和普通英文短语混淆（比如「table header」
  // 其实是 <th> 的英文注解），所以要求更强的证据：
  // ① 至少一个单元带 . # : [
  if (units.some(hasSelectorSignal)) return true
  // ② 全是单个大写字母占位符，如「后代 A B」
  return units.every((u) => /^[A-Z]$/.test(u))
}

function validateSelectorList(matched) {
  const units = matched.split(',').map((s) => s.trim()).filter(Boolean)
  if (units.length < 2) return false
  if (!units.every(isPlausibleUnit)) return false
  // 逗号在中文里也用来断句，所以必须至少有一个单元带 . # : [ 才敢认
  return units.some(hasSelectorSignal)
}

function validateTagWithTail(matched) {
  const base = matched.match(/^[A-Za-z][\w-]*/)?.[0] || ''
  const tail = matched.slice(base.length)
  // 伪类 / 属性选择器是 CSS 的强信号：p:hover、input[type="text"]
  if (/[:[]/.test(tail)) return true
  // 只有点号时（props.name 这种属性链）交给「属性链」规则处理，
  // 这里只认标签名开头的，比如 p.lead、div.box
  return HTML_TAGS.has(base.toLowerCase())
}

function validateDeclaration(matched) {
  const prop = matched.split(':')[0].trim()
  if (!prop) return false
  // 带连字符的一律认（box-sizing、min-height、align-items…）
  if (prop.includes('-')) return true
  return CSS_PROPS.has(prop.toLowerCase())
}

/**
 * 「flex:1 overflow:auto」这种连写两条声明时，值会一路吃到下一个属性名。
 * 如果匹配结果后面紧跟冒号，说明最后一段是下一条声明的属性名，切掉它。
 */
function refineDeclaration(matched, source, index) {
  let value = matched
  while (source[index + value.length] === ':') {
    const cut = value.lastIndexOf(' ')
    if (cut < 0) return ''
    value = value.slice(0, cut)
  }
  return value
}

/** 匹配规则：越靠前越优先；同一起点取更长的 */
const AUTO_CODE_RULES = [
  // 1) 函数 / 方法调用整段：filterItems(items, keyword)、setCount(c => c + 1)
  { re: /\b[a-zA-Z_$][\w$]*(?:\.[a-zA-Z_$][\w$]*)*\([^)]*\)/g },
  // 2) 以点开头的方法调用：数组.map() 里的 .map()、.filter(Boolean)、.focus()
  { re: /\.[a-zA-Z_$][\w$]*\([^)\n]*\)/g },
  // 3) HTML / JSX 标签
  { re: /<\/?[A-Za-z][A-Za-z0-9]*(?:\s[^<>]*?)?\/?>/g },
  // 4) npm / npx / node 命令
  { re: /\bnpm(?:\s+run)?\s+[\w:-]+/g },
  { re: /\bnpx\s+[\w@/.-]+/g },
  { re: /\bnode\s+-\w+/g },
  // 5) 路径、文件名、scoped 包
  { re: /\b(?:src|public|build)\/[\w./-]+/g },
  { re: /\b[\w-]+\.(?:js|jsx|ts|tsx|css|json|html|md)\b/g },
  { re: /@[a-z0-9-]+\/[a-z0-9._-]+/g },
  // 6) HTML 属性整段：class="btn primary"、style="color:red"、class=lead
  { re: /\b[a-zA-Z][\w-]*=(?:"[^"\n]{0,80}"|'[^'\n]{0,80}'|[\w.:/@-]+)/g },
  // 7) !important 整段（别只框住 important）
  { re: /!important\b/g },
  // 8) 组合选择器整段：.card > p、h2 + p、li + li::before、#nav .item、后代 A B
  {
    re: new RegExp(`${UNIT}(?:[ \\t]*[>+~][ \\t]*${UNIT}|[ \\t]+${UNIT}){1,3}`, 'g'),
    validate: validateSelectorChain,
  },
  // 9) 并集选择器整段：h1, h2, .title —— 别拆成三段
  {
    re: new RegExp(`${UNIT}(?:[ \\t]*,[ \\t]*${UNIT}){1,4}`, 'g'),
    validate: validateSelectorList,
  },
  // 10) CSS 声明整段：display: flex、box-sizing: border-box、margin: 0 auto
  {
    re: new RegExp(`\\b[a-z]+(?:-[a-z]+)*[ \\t]*:[ \\t]*${DECL_VALUE}`, 'g'),
    refine: refineDeclaration,
    validate: validateDeclaration,
  },
  // 11) 单个复合选择器：.card、#app、.btn.primary、:hover、::before、:nth-child(odd)
  {
    re: new RegExp(
      `(?:[.#][A-Za-z][\\w-]*|::?[a-zA-Z-]+(?:\\([^()\\n]{0,40}\\))?)${UNIT_TAIL}*`,
      'g'
    ),
  },
  // 12) 标签 + 伪类 / 属性：p.lead、a[href^="https"]、li:not(:last-child)
  {
    re: new RegExp(`[A-Za-z][\\w-]*${UNIT_TAIL}+`, 'g'),
    validate: validateTagWithTail,
  },
  // 13) 属性链（无括号）：form.name、item.id、props.onRemove
  { re: /\b[a-zA-Z_$][\w$]*(?:\.[a-zA-Z_$][\w$]*)+/g },
  // 14) 计算属性 / 简单括号表达式残留：[key]、[...list]
  { re: /\[[^\]]+\]/g },
  // 15) CSS 变量：--color-accent（别把开头的两个减号漏在外面）
  { re: /--[a-zA-Z][\w-]*/g },
  // 16) 带连字符的小写词：整段是一个 CSS 属性名 / 值 / 伪类名，
  //     比如 box-sizing、justify-content、space-between、nth-child、inline-block
  {
    re: /\b[a-z]{2,}(?:[-_]+[a-zA-Z0-9]+)+(?:\([^()\n]{0,30}\))?/g,
    validate: (matched) =>
      !HYPHEN_PROSE.has(matched.replace(/\(.*$/, '').toLowerCase()),
  },
  // 17) camelCase / PascalCase / SCREAMING_SNAKE
  { re: /\b[a-z][a-zA-Z0-9]*[A-Z][a-zA-Z0-9]*\b/g },
  { re: /\b[A-Z][a-z0-9]+(?:[A-Z][a-z0-9]+)+\b/g },
  { re: /\b[A-Z][A-Z0-9]*_[A-Z0-9_]+\b/g },
]

/** 普通单词：关键字，或夹在中文语境中的变量名 */
const IDENT_PATTERN = /\b[a-zA-Z_$][\w$]*\b/g

function isChineseOrCodeFence(ch) {
  if (!ch) return true
  const code = ch.codePointAt(0)
  if (code >= 0x4e00 && code <= 0x9fff) return true
  if (code >= 0x3000 && code <= 0x303f) return true
  if (code >= 0xff00 && code <= 0xffef) return true
  return /[—–\-：:，,。．、；;！!？?（）()【】[\]《》<>「」『』…\s"'`/\\]/.test(ch)
}

function shouldHighlightIdentifier(word, source, index) {
  const lower = word.toLowerCase()
  if (CODE_KEYWORDS.has(lower)) return true
  // 单个大写字母是文档里的占位符（后代 A B 里的 A、B），
  // 不能因为小写后撞上英文冠词 a 就被当成叙述词跳过
  if (/^[A-Z]$/.test(word)) return true
  if (PROSE_STOPWORDS.has(lower)) return false
  if (/[A-Z]/.test(word) || word.includes('_') || word.includes('$')) return true

  const prev = index > 0 ? source[index - 1] : ''
  const next = source[index + word.length] || ''
  if (isChineseOrCodeFence(prev) && isChineseOrCodeFence(next)) return true

  return false
}

/** 去掉匹配尾部多余的标点 / 空白（值里可能顺带吃进逗号或句点） */
function trimMatch(matched) {
  return matched.replace(/[\s,.;:]+$/, '')
}

const IDENT_RULE = {
  re: IDENT_PATTERN,
  validate: (matched, source, index) =>
    shouldHighlightIdentifier(matched, source, index),
}

function findNextAutoCode(source, from) {
  let best = null
  const rules = [...AUTO_CODE_RULES, IDENT_RULE]

  for (const rule of rules) {
    const { re, refine, validate } = rule
    re.lastIndex = from
    let match = re.exec(source)

    while (match) {
      const raw = refine ? refine(match[0], source, match.index) : match[0]
      const value = trimMatch(raw)
      const ok =
        value.length > 0 && (!validate || validate(value, source, match.index))

      if (!ok) {
        re.lastIndex = match.index + Math.max(1, match[0].length)
        match = re.exec(source)
        continue
      }

      const candidate = { index: match.index, value }
      if (
        !best ||
        candidate.index < best.index ||
        (candidate.index === best.index && candidate.value.length > best.value.length)
      ) {
        best = candidate
      }
      break
    }
  }

  return best
}

/**
 * 把一段纯文本切成 text / code 片段
 * @returns {{ type: 'text' | 'code', value: string }[]}
 */
export function findAutoCodeSegments(text) {
  const source = String(text ?? '')
  if (!source) return []

  const segments = []
  let lastIndex = 0
  let guard = 0

  while (lastIndex < source.length && guard++ < source.length + 5) {
    const match = findNextAutoCode(source, lastIndex)
    if (!match) break

    // 保险：匹配必须落在已处理区域之后
    if (match.index < lastIndex) {
      lastIndex += 1
      continue
    }

    if (match.index > lastIndex) {
      segments.push({ type: 'text', value: source.slice(lastIndex, match.index) })
    }
    segments.push({ type: 'code', value: match.value })
    lastIndex = match.index + match.value.length
  }

  if (lastIndex < source.length) {
    segments.push({ type: 'text', value: source.slice(lastIndex) })
  }

  return segments
}

export default findAutoCodeSegments
