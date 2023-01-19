import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doGetInfoOrder, doGetOrders } from "./ordersAPI";

const initialState = {
  value: null,
  loading: false,
  error: null
};

export const getOrders = createAsyncThunk(
  'orders/get',
  doGetOrders
);

export const getInfoOrder = createAsyncThunk(
  'orders/getInfoOrder',
  doGetInfoOrder
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
      .addCase(getInfoOrder.fulfilled, (state, action) => {
        state.value = state.value.map(el => el.id === action.meta.arg ? {...el, stafs: action.payload, loaded: true} : el);
      })
});

export default ordersSlice.reducer;

export const selectOrdersValue = state => state.orders.value;
export const selectOrdersError = state => state.orders.error;
export const selectOrdersLoading = state => state.orders.loading;