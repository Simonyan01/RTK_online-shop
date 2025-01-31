import { updateProduct } from "@features/products/products.api"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useForm } from "react-hook-form"

export const EditProduct = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const product = useSelector((state) => state.products.items.find((prod) => prod.id === id))

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: product,
    })

    const handleUpdate = async (data) => {
        try {
            await dispatch(updateProduct({ id, ...data })).unwrap()
            toast.success("Product updated successfully")
            setTimeout(() => {
                navigate("/")
            }, 3000)
        } catch {
            toast.error("Failed to update product.")
        }
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6 mt-22">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Edit Product</h2>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <div>
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Product Title</label>
                    <input
                        {...register("title", { required: "Title is required" })}
                        id="title"
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>
                <div>
                    <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price</label>
                    <input
                        {...register("price", { required: "Price is required", valueAsNumber: true })}
                        id="price"
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                </div>
                <div>
                    <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">Quantity</label>
                    <input
                        {...register("quantity", { required: "Quantity is required", valueAsNumber: true })}
                        id="quantity"
                        type="number"
                        className="w-full p-3 border border-gray-300 rounded-md mb-6 focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
                </div>
                <div className="text-center">
                    <button type="submit" className="w-full cursor-pointer py-3 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">Save Changes</button>
                </div>
            </form>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    )
}
