import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

/**
 * 应用入口
 * - Provider：注入 Redux store，子组件才能用 useSelector / useDispatch
 * - BrowserRouter：开启前端路由
 */
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// 如需测量性能，可传入回调，例如 reportWebVitals(console.log)
reportWebVitals()
