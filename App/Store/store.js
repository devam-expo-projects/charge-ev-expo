import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

export default store = configureStore({
    reducer: {
        user: userReducer,
    }
})