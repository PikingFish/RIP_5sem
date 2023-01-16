import { getMessages, sendMessage, deleteMessage } from "./chatAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";

const initialState = {
    loading: false,
    value: [],
    error: null
};

export const doGetMessages = createAsyncThunk(
    'chat/getMessages',
    getMessages
);

export const doSendMessage = createAsyncThunk(
    'chat/sendMessage',
    sendMessage
);

export const doDeleteMessage = createAsyncThunk(
    'chat/deleteMessage',
    deleteMessage
);

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        newMessage: (state, action) => {
            action.payload.User.username = "manager"
            state.value.push(action.payload)
            // как задать pageID?
            //action.payload.to === pageId ? state.value.push(action.payload) : 1
        },
        userStatusUpdate: (state, action) => {
            state.value = state.value.map(el => 
              el.from === action.payload.id ? {...el, status: action.payload.status} : el
            );
        },
        msgDeleted: (state, action) => {
            delete(state.value[action.payload.id])
        }
    },
    extraReducers: builder => {
        builder
            .addCase(doGetMessages.pending, state => {
                state.loading = true;
                state.value = [];
                state.error = null;
            })
            .addCase(doGetMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.value = action.payload;
            })
            .addCase(doGetMessages.rejected, (state, action) => {
                state.loading = false;
                state.value = [];
                state.error = action.error.message;
            })
            .addCase(doSendMessage.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(doSendMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.value.push(action.payload);
            })
            .addCase(doSendMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(doDeleteMessage.fulfilled, (state, action) => {
                state.value = state.value.map(el => el.id === action.meta.arg.id ? {...el, deleted: true} : el );
            })
    }
});

export const selectChatValue = state => state.chat.value;
export const selectChatLoading = state => state.chat.loading;
export const selectChatError = state => state.chat.error;
export default chatSlice.reducer;
