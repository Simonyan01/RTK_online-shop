import { EditProduct } from "@features/products/pages/edit"
import { AddProduct } from "@features/products/pages/add"
import { Products } from "@features/products/products"
import { createBrowserRouter } from "react-router-dom"
import { Basket } from "@features/basket/basket"
import Layout from "../layout"


export const routes = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            { path: "", element: <Products /> },
            { path: "basket", element: <Basket /> },
            { path: "product/add", element: <AddProduct /> },
            { path: "product/edit/:id", element: <EditProduct /> },
        ],
    },
])
