import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    stack: []
  },
  reducers: {
    notify: (state, action) => {
      state.stack = [...state.stack, action.payload]
    },
    delete: (state, action) => {
      state.stack.splice(state.stack.indexOf(action.payload), 1)
    }
  }
})

export const selectStack = (state) => state.notification.stack;
export default notificationSlice.reducer;