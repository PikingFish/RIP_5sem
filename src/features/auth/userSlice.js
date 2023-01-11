import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser, updateUser } from './userAPI';

const initialState = {
    value: {},
    loading: false,
    error: null
}

export const doGetUser = createAsyncThunk(
    "user/getUser",
    getUser
);

export const doUpdateUser = createAsyncThunk(
    "user/updateUser",
    updateUser
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(doGetUser.pending, state => {
                state.loading = true;
                state.error = null;
                state.value = {};
            })
            .addCase(doGetUser.fulfilled, (state, action) => {
                state.value = action.payload;
                state.loading = false;
            })
            .addCase(doGetUser.rejected, (state, action) => {
                state.loading = false;
                state.value = {};
                state.error = action.error.message;
            })
            .addCase(doUpdateUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(doUpdateUser.fulfilled, state => {
                state.loading = false;
            })
            .addCase(doUpdateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export default userSlice.reducer;
export const selectUser = state => state.user.value
export const selectUserLoading = state => state.user.loading;
export const selectUserError = state => state.user.error;
export const { setUser } = userSlice.actions;