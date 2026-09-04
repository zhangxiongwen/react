import { useRoutes } from 'react-router-dom'
import routes from './routes'

/**
 * App 根组件
 * 使用 useRoutes 根据 routes/index.js 的配置渲染页面
 */
function App() {
  const element = useRoutes(routes)
  return element
}

export default App
