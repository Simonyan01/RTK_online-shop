import { createAsyncThunk } from "@reduxjs/toolkit"
import { Http } from "@helpers/axios"

export const getBasket = createAsyncThunk("basket/get", async () => {
    const response = await Http.get("/basket")
    return response.data
})

export const addToCart = createAsyncThunk("basket/add", async (product, { getState }) => {
    const state = getState().basket.items
    const existingItem = state.find((item) => item.id === product.id)

    if (existingItem) {
        const updatedItem = { ...existingItem, count: existingItem.count + 1 }
        await Http.put(`/basket/${existingItem.id}`, updatedItem)
        return updatedItem
    } else {
        const newItem = { ...product, count: 1 }
        await Http.post("/basket", newItem)
        return newItem
    }
})

export const increaseCount = createAsyncThunk("basket/increase", async (id, { getState }) => {
    const state = getState().basket.items
    const item = state.find((item) => item.id === id)

    if (item) {
        const updatedItem = { ...item, count: item.count + 1 }
        await Http.put(`/basket/${id}`, updatedItem)
        return updatedItem
    }
})

export const decreaseCount = createAsyncThunk("basket/decrease", async (id, { getState }) => {
    const state = getState().basket.items
    const item = state.find((item) => item.id === id)

    if (item && item.count > 1) {
        const updatedItem = { ...item, count: item.count - 1 }
        await Http.put(`/basket/${id}`, updatedItem)
        return updatedItem
    } else {
        await Http.delete(`/basket/${id}`)
        return id
    }
})

export const removeFromCart = createAsyncThunk("basket/remove", async (id) => {
    await Http.delete(`/basket/${id}`)
    return id
})