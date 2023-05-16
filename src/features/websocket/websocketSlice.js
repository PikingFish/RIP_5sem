import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { connectWebSocket } from "./websocketAPI";

const initialState = {
  loading: false,
  connected: false,
  error: null
};

export const doConnect = createAsyncThunk(
  'websocket/connect',
  async (params, {dispatch}) => {
    const websocket = await connectWebSocket();
    websocket.onmessage = (message) => {
      dispatch(JSON.parse(message.data));
    }
  }
);

export const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(doConnect.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(doConnect.fulfilled, state => {
        state.loading = false;
        state.connected = true;
      })
      .addCase(doConnect.rejected, (state, action) => {
        state.loading = false;
        state.connected = false;
        state.error = action.error.message
      })
  }
});

export const selectConnected = state => state.websocket.connected;
export default websocketSlice.reducer;