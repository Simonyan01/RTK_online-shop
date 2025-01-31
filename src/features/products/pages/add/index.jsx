import { setCategory, setCustomCategory } from "@features/products/products.slice"
import { addProduct } from "@features/products/products.api"
import { useDispatch, useSelector } from "react-redux"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

export const AddProduct = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { category, customCategory } = useSelector(state => state.products)

    const handleAdd = async (data) => {
        const productData = {
            ...data,
            category: category === "other" ? customCategory : category,
        }

        try {
            await dispatch(addProduct(productData)).unwrap()
            toast.success("Product added successfully")
            setTimeout(() => {
                navigate("/")
            }, 3000)
        } catch {
            toast.error("Failed to add product.")
        }
    }

    return (
        <form
            onSubmit={handleSubmit(handleAdd)}
            className="max-w-lg mx-auto p-8 mt-22 shadow-lg rounded-lg space-y-3"
        >
            <h2 className="text-2xl font-semibold text-center text-gray-800">Add New Product</h2>
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            <div>
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                    Product Title
                </label>
                <input
                    {...register("title", { required: "Please complete the title" })}
                    type="text"
                    id="title"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 outline-none focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 focus:border-blue-500"
                    placeholder="Enter product title"
                />
            </div>
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
            <div>
                <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                    Price
                </label>
                <input
                    {...register("price", { required: "Please complete the price", setValueAs: (value) => +value })}
                    type="number"
                    id="price"
                    className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 focus:border-blue-500"
                    placeholder="Enter price"
                />
            </div>
            {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
            <div>
                <label htmlFor="quantity" className="block text-gray-700 font-medium mb-2">
                    Quantity
                </label>
                <input
                    {...register("quantity", { required: "Please complete the quantity", setValueAs: (value) => +value })}
                    type="number"
                    id="quantity"
                    className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 focus:border-blue-500"
                    placeholder="Enter quantity"
                />
            </div>
            {errors.category && <p className="text-red-500">{errors.category.message}</p>}
            <div>
                <label htmlFor="category" className="block text-gray-700 font-medium mb-2">Category</label>
                <select
                    {...register("category")}
                    id="category"
                    className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 focus:border-blue-500"
                    value={category}
                    onChange={(e) => dispatch(setCategory(e.target.value))}
                >
                    <option value="">Select a category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="other">Other</option>
                </select>
                {category === "other" && (
                    <div className="mt-8">
                        <label htmlFor="customCategory" className="block text-gray-700 font-medium mb-2">Custom Category</label>
                        <input
                            {...register("customCategory", { required: category === "other" ? "Please specify the category" : false })}
                            id="customCategory"
                            type="text"
                            onChange={(e) => dispatch(setCustomCategory(e.target.value))}
                            className="w-full p-3 border border-gray-300 outline-none rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 focus:border-blue-500"
                        />
                    </div>
                )}
            </div>
            <div className="text-center">
                <button
                    type="submit"
                    className="w-full py-3 px-6 cursor-pointer bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                    Save product
                </button>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </form>
    )
}
