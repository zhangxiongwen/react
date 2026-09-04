import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'

/**
 * 全局 Store
 * 后续新业务：新建 slice，然后在 reducer 里注册即可
 */
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
