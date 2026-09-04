import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import http from '../../utils/request'
import './JsonServerDemo.css'

/**
 * json-server 代码演示页
 * 需要先启动 mock 服务：npm run server（或 npm run start:all）
 */
function JsonServerDemo() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', role: 'user' })
  const [submitting, setSubmitting] = useState(false)

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const data = await http.get('/users')
      setUsers(data)
    } catch (e) {
      setError(
        e.message +
          '。请先另开终端执行 npm run server，或直接用 npm run start:all 同时启动前后端。'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return

    try {
      setSubmitting(true)
      await http.post('/users', {
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
      })
      setForm({ name: '', email: '', role: 'user' })
      await loadUsers()
    } catch (e) {
      alert(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('确定删除这个用户吗？')) return
    try {
      await http.delete(`/users/${id}`)
      await loadUsers()
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="JsonServerDemo">
      <nav className="JsonServerDemo-breadcrumb">
        <Link to="/">知识目录</Link>
        <span>/</span>
        <span>json-server 演示</span>
      </nav>

      <header className="JsonServerDemo-header">
        <h1>json-server 代码演示</h1>
        <p>
          本页通过 axios 请求本地 mock 接口。数据来自项目根目录的{' '}
          <code>db.json</code>，由 json-server 自动生成 REST API。
        </p>
        <p className="JsonServerDemo-hint">
          启动方式：终端执行 <code>npm run server</code>，再{' '}
          <code>npm start</code>；或一条命令 <code>npm run start:all</code>
        </p>
      </header>

      <section className="JsonServerDemo-panel">
        <h2>新增用户（POST /users）</h2>
        <form className="JsonServerDemo-form" onSubmit={handleAdd}>
          <input
            placeholder="姓名"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="邮箱"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <button type="submit" disabled={submitting}>
            {submitting ? '提交中...' : '添加'}
          </button>
        </form>
      </section>

      <section className="JsonServerDemo-panel">
        <div className="JsonServerDemo-panel-head">
          <h2>用户列表（GET /users）</h2>
          <button type="button" onClick={loadUsers}>
            刷新
          </button>
        </div>

        {loading && <p>加载中...</p>}
        {error && <p className="JsonServerDemo-error">{error}</p>}

        {!loading && !error && (
          <ul className="JsonServerDemo-list">
            {users.map((user) => (
              <li key={user.id}>
                <div>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                  <span className="JsonServerDemo-tag">{user.role}</span>
                </div>
                <button type="button" onClick={() => handleDelete(user.id)}>
                  删除
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="JsonServerDemo-panel JsonServerDemo-code-hint">
        <h2>本页核心代码（对照 src/pages/JsonServerDemo/index.js）</h2>
        <pre>{`// 查列表
const data = await http.get('/users')

// 新增
await http.post('/users', { name, email, role })

// 删除
await http.delete(\`/users/\${id}\`)`}</pre>
      </section>
    </div>
  )
}

export default JsonServerDemo
