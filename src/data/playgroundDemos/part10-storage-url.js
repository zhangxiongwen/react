/**
 * 演练台 · 浏览器存储与 URL 取值
 * 纯 HTML/JS，走 iframe，不需要 runtime: 'react'
 */
const part10 = [
  {
    id: 'p10-local-vs-session',
    title: 'localStorage vs sessionStorage',
    group: '18-浏览器存储与URL',
    summary: '刷新还在用 local；关标签就丢用 session。只能存字符串',
    code: `<!-- 关于 body：本 Demo 没写 <html>/<body>，预览器会自动包一层，所以下面的 body 样式仍然生效 -->
<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }
  .row { display: flex; flex-wrap: wrap; gap: 8px; margin: 8px 0 12px; }
  input, button { font: inherit; padding: 7px 12px; border-radius: 6px; }
  input { border: 1px solid #c5d2ca; min-width: 160px; }
  button { border: 0; background: #2f6b4f; color: #fff; cursor: pointer; }
  button.ghost { background: #fff; color: #1f2a24; border: 1px solid #c5d2ca; }
  pre { margin: 0; padding: 12px; background: #f4f7f5; border-radius: 8px; white-space: pre-wrap; }
</style>

<p>写入后点预览区右上角「重置」不会清仓库；要清请点下面的按钮，或刷新/关标签看差别。</p>
<div class="row">
  <input id="name" placeholder="写个名字" />
  <button type="button" id="save">写入两种仓库</button>
  <button type="button" class="ghost" id="clearLs">清空 local</button>
  <button type="button" class="ghost" id="clearSs">清空 session</button>
</div>
<pre id="out"></pre>

<script>
  const KEY = 'pg-storage-name' // 加 pg- 前缀，避免和网站自己的 key 打架
  const nameInput = document.getElementById('name')
  const out = document.getElementById('out')

  function render() {
    // getItem 没有这个 key 时返回 null，不是空字符串
    const fromLocal = localStorage.getItem(KEY)
    const fromSession = sessionStorage.getItem(KEY)
    out.textContent =
      'localStorage：' + (fromLocal ?? '（空）') + '\\n' +
      'sessionStorage：' + (fromSession ?? '（空）') + '\\n\\n' +
      '同一标签刷新：两个都在。\\n' +
      '关掉这个浏览器标签再打开：local 还在，session 没了。'
    if (fromLocal) nameInput.value = fromLocal
  }

  document.getElementById('save').onclick = () => {
    const value = nameInput.value.trim() || '小明'
    try {
      localStorage.setItem(KEY, value)   // 只能存字符串
      sessionStorage.setItem(KEY, value)
    } catch (e) {
      out.textContent = '写入失败：' + e.message
      return
    }
    render()
  }
  document.getElementById('clearLs').onclick = () => {
    localStorage.removeItem(KEY)
    render()
  }
  document.getElementById('clearSs').onclick = () => {
    sessionStorage.removeItem(KEY)
    render()
  }
  render()
</script>`,
  },
  {
    id: 'p10-json-storage',
    title: '对象必须 JSON.stringify 再存',
    group: '18-浏览器存储与URL',
    summary: '直接 setItem(对象) 会变成 [object Object]，读回来就是废的',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }
  .cols { display: flex; gap: 12px; flex-wrap: wrap; }
  .card { flex: 1; min-width: 220px; padding: 12px; border: 2px solid; border-radius: 10px; }
  button { margin-top: 8px; padding: 6px 12px; border: 0; border-radius: 6px; background: #2f6b4f; color: #fff; cursor: pointer; }
  pre { margin: 8px 0 0; font: 13px/1.6 ui-monospace, monospace; white-space: pre-wrap; }
</style>

<div class="cols">
  <div class="card" style="border-color:#e0a0a0">
    <strong>❌ 直接存对象</strong>
    <button type="button" id="bad">写入错误写法</button>
    <pre id="badOut"></pre>
  </div>
  <div class="card" style="border-color:#8fc0a9">
    <strong>✅ stringify / parse</strong>
    <button type="button" id="ok">写入正确写法</button>
    <pre id="okOut"></pre>
  </div>
</div>

<script>
  const cart = [{ id: 1, name: 'React 书', count: 2 }]

  document.getElementById('bad').onclick = () => {
    // 对象会被隐式 toString 成 "[object Object]"
    localStorage.setItem('pg-cart-bad', cart)
    const raw = localStorage.getItem('pg-cart-bad')
    document.getElementById('badOut').textContent = '仓库里实际是：\\n' + raw
  }

  document.getElementById('ok').onclick = () => {
    localStorage.setItem('pg-cart-ok', JSON.stringify(cart))
    const raw = localStorage.getItem('pg-cart-ok')
    const data = JSON.parse(raw)
    document.getElementById('okOut').textContent =
      '仓库里的字符串：\\n' + raw + '\\n\\nparse 之后：\\n' + data[0].name + ' × ' + data[0].count
  }
</script>`,
  },
  {
    id: 'p10-cookie',
    title: 'document.cookie 读写',
    group: '18-浏览器存储与URL',
    summary: '普通 Cookie 能读；HttpOnly 的登录态 JS 永远看不见',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }
  .row { display: flex; flex-wrap: wrap; gap: 8px; margin: 8px 0 12px; }
  input, button { font: inherit; padding: 7px 12px; border-radius: 6px; }
  input { border: 1px solid #c5d2ca; }
  button { border: 0; background: #2f6b4f; color: #fff; cursor: pointer; }
  pre { margin: 0; padding: 12px; background: #f4f7f5; border-radius: 8px; white-space: pre-wrap; }
</style>

<p>Cookie 每次请求都会带给服务器，所以只适合很小的键值。真正的登录 token 应由后端设置 HttpOnly。</p>
<div class="row">
  <input id="theme" value="dark" />
  <button type="button" id="write">写入 Cookie（1 小时）</button>
  <button type="button" id="read">读全部可见 Cookie</button>
</div>
<pre id="out"></pre>

<script>
  const out = document.getElementById('out')

  function readAll() {
    const raw = document.cookie // 格式是 "a=1; b=2"，没有就空字符串
    out.textContent = raw
      ? ('当前 JS 能看到的 Cookie：\\n' + raw)
      : '（还没有可读的 Cookie。HttpOnly 的也永远不会出现在这里。）'
  }

  document.getElementById('write').onclick = () => {
    const theme = document.getElementById('theme').value.trim() || 'dark'
    // max-age 单位秒；path=/ 表示整个站点请求都会带上
    document.cookie = 'pg-theme=' + encodeURIComponent(theme) + '; max-age=3600; path=/'
    readAll()
  }
  document.getElementById('read').onclick = readAll
  readAll()
</script>`,
  },
  {
    id: 'p10-search-params',
    title: 'URLSearchParams 拆 ?q= 和 page',
    group: '18-浏览器存储与URL',
    summary: '问号后面的筛选条件用它读；路径里的 :id 在 React 里用 useParams',
    code: `<style>
  * { box-sizing: border-box; }
  body { margin: 16px; font: 14px/1.6 system-ui, sans-serif; color: #1f2a24; }
  input, button { font: inherit; padding: 7px 12px; border-radius: 6px; }
  input { width: min(100%, 420px); border: 1px solid #c5d2ca; }
  button { border: 0; background: #2f6b4f; color: #fff; cursor: pointer; margin-left: 8px; }
  pre { margin: 12px 0 0; padding: 12px; background: #f4f7f5; border-radius: 8px; white-space: pre-wrap; }
</style>

<p>资源 id 放路径 <code>/users/42</code>（React：useParams）。筛选放问号 <code>?q=react&page=2</code>（原生 URLSearchParams / React：useSearchParams）。</p>
<input id="raw" value="?q=react 入门&page=2&sort=new" />
<button type="button" id="parse">解析</button>
<pre id="out"></pre>

<script>
  const rawInput = document.getElementById('raw')
  const out = document.getElementById('out')

  function parse() {
    const params = new URLSearchParams(rawInput.value) // 自动 decode 中文和空格
    const q = params.get('q')       // 没有这个 key 时是 null
    const page = params.get('page') // 注意：永远是字符串 "2"，不是数字 2
    const next = new URLSearchParams(params)
    next.set('page', String(Number(page || 1) + 1)) // 只改 page，其它条件保留

    out.textContent =
      'q = ' + JSON.stringify(q) + '\\n' +
      'page = ' + JSON.stringify(page) + '  ← 字符串，不是数字\\n' +
      'sort = ' + JSON.stringify(params.get('sort')) + '\\n\\n' +
      '页码 +1 拼回去：?' + next.toString()
  }

  document.getElementById('parse').onclick = parse
  parse()
</script>`,
  },
]

export default part10
