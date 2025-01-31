import { addToCart, decreaseCount, getBasket, increaseCount, removeFromCart } from "@features/basket/basket.api"
import { createSlice } from "@reduxjs/toolkit"

export const basketSlice = createSlice({
    name: "basket",
    initialState: {
        items: [],
        total: 0
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBasket.fulfilled, (state, action) => {
                state.items = action.payload
                state.total = state.items.reduce((sum, item) => sum + item.price * item.count, 0)
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                const existingIndex = state.items.findIndex((item) => item.id === action.payload.id)
                if (existingIndex !== -1) {
                    state.items[existingIndex] = action.payload
                }

                state.items = action.payload
                state.total = state.items.reduce((sum, item) => sum + item.price * item.count, 0)
            })
            .addCase(increaseCount.fulfilled, (state, action) => {
                const index = state.items.findIndex((item) => item.id === action.payload.id)
                if (index !== -1) {
                    state.items[index] = action.payload
                }

                state.total = state.items.reduce((sum, item) => sum + item.price * item.count, 0)
            })
            .addCase(decreaseCount.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id)
                if (index !== -1) {
                    state.items[index] = action.payload
                }

                state.items = state.items.filter((item) => item.id !== action.payload)
                state.total = state.items.reduce((sum, item) => sum + item.price * item.count, 0)
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload)
                state.total = state.items.reduce((sum, item) => sum + item.price * item.count, 0)
            })
    }
})


const { reducer } = basketSlice

export const basketReducer = reducer