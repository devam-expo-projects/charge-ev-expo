import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { token: "" },
    reducers: {
        addUser(state, action) {
            state.token = action.payload;
        },
        clearUser(state) {
            state.token = '';
        }
    }
});

export const { addUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
