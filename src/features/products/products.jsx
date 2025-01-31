import { addToCart, getBasket, increaseCount } from "@features/basket/basket.api"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getProducts } from "./products.api"
import { Link } from "react-router-dom"
import { useEffect } from "react"

export const Products = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.items)
  const cartItems = useSelector((state) => state.basket.items)

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getBasket())
  }, [dispatch])

  const handleMoveToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id)

    try {
      if (existingProduct) {
        dispatch(increaseCount(existingProduct.id))
      } else {
        dispatch(addToCart(product))
      }
      toast.success("Product added to cart")
    } catch {
      toast.error("Failed to add product")
    }
  }

  return (
    <section className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-100 mb-6 text-center">
        🛒 Total Products: {products.length}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-start transition-transform transform hover:scale-105"
          >
            <h2 className="text-xl font-semibold text-white">{product.title}</h2>
            <span className="mt-4 text-green-400 font-bold">
              ${product.price.toFixed(2)}
            </span>
            <div className="flex justify-between w-full mt-4">
              <Link
                to={`product/edit/${product.id}`}
                className="px-2 py-2 tracking-wider text-sm font-medium bg-pink-300 hover:bg-pink-400 text-black rounded-lg transition"
              >
                ✏ Edit
              </Link>
              <button
                onClick={() => handleMoveToCart(product)}
                className="px-4 py-2 tracking-wider text-sm font-medium bg-blue-600 cursor-pointer hover:bg-blue-700 text-white rounded-lg transition"
              >
                🛒 Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={2200} />
    </section>
  )
}
