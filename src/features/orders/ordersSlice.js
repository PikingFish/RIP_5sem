import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doGetOrders } from "./ordersAPI";

const initialState = {
  value: null,
  loading: false,
  error: null
};

export const getOrders = createAsyncThunk(
  'orders/get',
  doGetOrders
);

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: builder => 
    builder
      .addCase(getOrders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
});

export default ordersSlice.reducer;

export const selectOrdersValue = state => state.orders.value;
export const selectOrdersError = state => state.orders.error;
export const selectOrdersLoading = state => state.orders.loading;