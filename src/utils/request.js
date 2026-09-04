import axios from 'axios'

/**
 * axios 实例
 *
 * 开发环境（配合 json-server）：
 *   1. 终端 A：npm run server   → 启动 mock API（3001 端口）
 *   2. 终端 B：npm start        → 启动 React（3000 端口）
 *   3. package.json 里 proxy 会把 /users 等请求转发到 json-server
 *   4. baseURL 留空，请求写成 http.get('/users')
 *
 * 线上 / 练手公开 API：
 *   新建 .env 设置 REACT_APP_API_BASE_URL=https://jsonplaceholder.typicode.com
 */

const http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }

    const status = error.response?.status
    const message =
      error.response?.data?.message ||
      error.message ||
      '网络异常，请稍后重试'

    if (status === 401) {
      console.warn('未登录或登录已过期')
    }

    return Promise.reject(new Error(message))
  }
)

export default http
export { axios }
