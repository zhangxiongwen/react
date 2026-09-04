import { createSlice } from '@reduxjs/toolkit'

/**
 * 计数器 slice —— Redux Toolkit 最小可运行示例
 * 详情文档见：知识点「Redux」章节
 */
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment(state) {
      state.value += 1
    },
    decrement(state) {
      state.value -= 1
    },
    incrementByAmount(state, action) {
      state.value += action.payload
    },
    reset(state) {
      state.value = 0
    },
  },
})

export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions

export default counterSlice.reducer
