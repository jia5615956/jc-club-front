import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
  title: string
}
const initialState: CounterState = {
  value: 0,
  title: 'redux toolkit pre'
}

// 创建一个 Slice
export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    // 定义一个加的方法
    saveUserInfo: (state, { payload }) => {
      state.value = payload
    }
  }
})
// 导出加减的方法
export const { saveUserInfo } = userInfoSlice.actions

// 默认导出
export default userInfoSlice.reducer
