import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import http from '../../utils/request'
import './JsonServerDemo.css'

const SEED_USERS = [
  { id: 1, name: '小明', email: 'xiaoming@example.com', role: 'admin' },
  { id: 2, name: '小红', email: 'xiaohong@example.com', role: 'user' },
  { id: 3, name: '小刚', email: 'xiaogang@example.com', role: 'user' },
]

function cloneUsers() {
  return SEED_USERS.map((u) => ({ ...u }))
}

/**
 * 线上没有 json-server。nginx 会把 GET /users 回成首页 HTML，
 * 所以生产环境用内存里的假数据把增删查演示跑起来。
 */
function createMemoryApi() {
  let users = cloneUsers()
  let nextId = users.reduce((max, u) => Math.max(max, Number(u.id) || 0), 0) + 1

  return {
    async get() {
      return users.map((u) => ({ ...u }))
    },
    async post(body) {
      const created = { id: nextId, ...body }
      nextId += 1
      users = [...users, created]
      return created
    },
    async delete(id) {
      users = users.filter((u) => String(u.id) !== String(id))
    },
  }
}

function isUserList(data) {
  return Array.isArray(data) && data.every((item) => item && typeof item === 'object')
}

/**
 * json-server 代码演示页
 * 本地：npm run server（或 npm run start:all）走真实 mock
 * 线上：自动切到内存数据，页面仍然能点增删查
 */
function JsonServerDemo() {
  const memoryApiRef = useRef(null)
  if (!memoryApiRef.current) memoryApiRef.current = createMemoryApi()

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [usingMemory, setUsingMemory] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', role: 'user' })
  const [submitting, setSubmitting] = useState(false)

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      if (!usingMemory) {
        const data = await http.get('/users')
        if (!isUserList(data)) {
          throw new Error('接口没有返回用户数组')
        }
        setUsers(data)
        return
      }

      setUsers(await memoryApiRef.current.get())
    } catch (e) {
      // 线上 / 没启动 json-server：切到内存 mock，页面还能用
      setUsingMemory(true)
      setUsers(await memoryApiRef.current.get())
      setError('')
    } finally {
      setLoading(false)
    }
  }, [usingMemory])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) return

    const body = {
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
    }

    try {
      setSubmitting(true)
      if (usingMemory) {
        await memoryApiRef.current.post(body)
      } else {
        await http.post('/users', body)
      }
      setForm({ name: '', email: '', role: 'user' })
      await loadUsers()
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('确定删除这个用户吗？')) return
    try {
      if (usingMemory) {
        await memoryApiRef.current.delete(id)
      } else {
        await http.delete(`/users/${id}`)
      }
      await loadUsers()
    } catch (err) {
      setError(err.message)
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
          本页通过 axios 请求 <code>/users</code>。本地开发时数据来自项目根目录的{' '}
          <code>db.json</code>，由 json-server 自动生成 REST API。
        </p>
        {usingMemory ? (
          <p className="JsonServerDemo-hint JsonServerDemo-hint--warn">
            当前没有可用的 json-server（线上站点本来就不会带假后端）。页面已改用<strong>浏览器内存数据</strong>
            演示增删查，刷新后会恢复成初始三人。本地要连真 mock：终端执行{' '}
            <code>npm run start:all</code>。
          </p>
        ) : (
          <p className="JsonServerDemo-hint">
            已连上 json-server。启动方式：<code>npm run server</code> 再{' '}
            <code>npm start</code>，或一条命令 <code>npm run start:all</code>
          </p>
        )}
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

        {!loading && (
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
