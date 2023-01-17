import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doGetCart } from './cartAPI';

const initialState = {
  value: [],
  loading: false,
  error: null
};

export const getCart = createAsyncThunk(
  "cart/getCart",
  doGetCart
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.value.push(action.payload);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.value = [...state.value, ...action.payload]
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});

export const selectCartValue = state => state.cart.value;
export const selectCartLoading = state => state.cart.loading;
export const selectCartError = state => state.cart.error;

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;