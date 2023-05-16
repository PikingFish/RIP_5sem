import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/auth/userSlice";
import listReducer from "../features/list/listSlice";
import chatReducer from "../features/chat/chatSlice";
import cartReducer from "../features/list/cartSlice";
import shortCatalogReducer from "../features/list/shortCatalogSlice";
import ordersReducer from "../features/orders/ordersSlice";
import websocketReducer from "../features/websocket/websocketSlice";
import notificationReducer from "../features/notification/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    list: listReducer,
    chat: chatReducer,
    cart: cartReducer,
    shortCatalog: shortCatalogReducer,
    orders: ordersReducer,
    websocket: websocketReducer,
    notification: notificationReducer
  }
});