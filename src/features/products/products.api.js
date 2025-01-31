import { createAsyncThunk } from "@reduxjs/toolkit"
import { Http } from "@helpers/axios"

export const getProducts = createAsyncThunk("products/get", async () => {
    const response = await Http.get("/products")
    return response.data
})

export const addProduct = createAsyncThunk("products/add", async (payload) => {
    const response = await Http.post("/products", payload)
    return response.data
})

export const updateProduct = createAsyncThunk("products/edit", async ({ id, ...payload }) => {
    const response = await Http.put(`/products/${id}`, payload)
    return response.data
})