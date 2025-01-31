import { createSlice } from "@reduxjs/toolkit"
import { getProducts } from "./products.api"

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        category: "",
        customCategory: "",
    },
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload
        },
        setCustomCategory: (state, action) => {
            state.customCategory = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.items = action.payload
            })
    }
})

const { reducer, actions } = productsSlice

export const { setCategory, setCustomCategory } = actions
export const productsReducer = reducer