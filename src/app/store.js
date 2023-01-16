import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/auth/userSlice";
import listReducer from "../features/list/listSlice";
import chatReducer from "../features/chat/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    list: listReducer,
    chat: chatReducer,
  }
});