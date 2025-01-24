import { userReducer } from "../features/users/users.slice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
        users: userReducer
    }
})