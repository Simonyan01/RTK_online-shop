import { createSlice } from "@reduxjs/toolkit"

export const userList = state => state.users.list

export const userSlice = createSlice({
    name: "users",
    initialState: {
        list: [
            { id: 101, name: "Raffi", age: 24, salary: 600000 },
            { id: 102, name: "Karen", age: 12, salary: 400000 },
            { id: 103, name: "Artak", age: 33, salary: 250000 },
            { id: 104, name: "Vahe", age: 31, salary: 310000 },
            { id: 105, name: "Gevorg", age: 57, salary: 8000 }
        ]
    },
    reducers: {
        add: (state, action) => {
            state.list.push(action.payload)
        },
        remove: (state, action) => {
            state.list = state.list.filter(user => user.id != action.payload)
        },
        increase: (state, action) => {
            const user = state.list.find(user => user.id === action.payload)
            if (user) {
                user.salary += 5000
            }
        },
        decrease: (state, action) => {
            const user = state.list.find(user => user.id === action.payload)
            if (user) {
                user.salary -= 5000
                if (user.salary < 0) {
                    user.salary = 0
                }
            }
        },
    }
})

const { actions, reducer } = userSlice

export const { remove, increase, decrease } = actions
export const userReducer = reducer    