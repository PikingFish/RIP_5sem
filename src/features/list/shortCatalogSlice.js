import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doGetShortCatalog } from "./shortCatalogAPI";

const initialState = {
  loading: false,
  value: null,
  error: null
};

export const getShortCatalog = createAsyncThunk(
  'shortCatalog/get',
  doGetShortCatalog
);

export const shortCatalogSlice = createSlice({
  name: "shortCatalog",
  initialState,
  reducers: {},
  extraReducers: builder => 
    builder
      .addCase(getShortCatalog.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getShortCatalog.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(getShortCatalog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
});

export default shortCatalogSlice.reducer;
export const selectShortCatalogValue = state => state.shortCatalog.value;
export const selectShortCatalogError = state => state.shortCatalog.error;
export const selectShortCatalogLoading = state => state.shortCatalog.loading;