import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { doAddToCart, doCreateOrder, doGetCart, doRemoveFromCart } from './cartAPI';

const initialState = {
  value: null,
  loading: false,
  error: null
};

export const getCart = createAsyncThunk(
  "cart/getCart",
  doGetCart
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  doAddToCart
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  doRemoveFromCart
);

export const createOrder = createAsyncThunk(
  'cart/createOrder',
  doCreateOrder
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addToCart: (state, action) => {
    //   state.value.push(action.payload);
    // }
  },
  extraReducers: builder => {
    builder
      .addCase(getCart.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        // state.value = [...(state.value ? state.value : []), ...action.payload]
        state.value = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const item = action.meta.arg;
        const itemInCart = state.value.filter(el => el.id === item.id)[0];
        if (itemInCart) {
          itemInCart.count += 1;
        } else {
          state.value.push({...item, count: 1});
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const itemInCart = state.value.filter(el => el.id === action.meta.arg.id)[0]
        itemInCart.count -= 1;
        state.value = state.value.filter(el => el.count);
      })
      .addCase(createOrder.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.value = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});

export const selectCartValue = state => state.cart.value;
export const selectCartLoading = state => state.cart.loading;
export const selectCartError = state => state.cart.error;

export default cartSlice.reducer;
// export const { addToCart } = cartSlice.actions;