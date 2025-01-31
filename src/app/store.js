import { productsReducer } from "@features/products/products.slice"
import { basketReducer } from "@features/basket/basket.slice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
        products: productsReducer,
        basket: basketReducer
    }
})