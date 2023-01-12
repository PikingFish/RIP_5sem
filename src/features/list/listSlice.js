import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchData} from "./listAPI";

const initialState = {
  value: [],
  status: "idle",
  error: null
}

// export const getData = createAsyncThunk(
//   'list/fetchData',
//   async (where) => {
//     const response = await fetchData(where);
//     console.log(response)
//     const tasks = response.data;
//     return Object.keys(tasks).map(a => ({"id": a, ...tasks[a]}));
//   }
// );

export const getData = createAsyncThunk(
  'list/fetchData',
  fetchData
);

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    updateListItem: (state, action) => {
      const item = action.payload;
      state.value = state.value.map(el => {
        if (el.id === item.id) {
          return Object.keys(item)
            .filter(e => e in el)
            .reduce((a, e) => a = {[e]: item[e], ...a}, {});
        }
        return el;
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(getData.rejected, (state, action) => {
        state.error = action.error.message;
        state.value = [];
        state.status = "idle";
      });
  },
});

export const selectValue = (state) => state.list.value;
export const selectStatus = (state) => state.list.status;
export const selectLoading = (state) => state.list.status === "loading";
export const selectListError = (state) => state.list.error;
export const { updateListItem } = listSlice.actions;

export default listSlice.reducer;
