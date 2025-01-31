import { decreaseCount, getBasket, increaseCount, removeFromCart } from "@features/basket/basket.api"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useEffect } from "react"

export const Basket = () => {
    const dispatch = useDispatch()
    const { items, total } = useSelector((state) => state.basket)

    useEffect(() => {
        dispatch(getBasket())
    }, [dispatch])

    return (
        <section className="max-w-3xl max-h-[35rem] overflow-y-auto mx-auto p-6 bg-gray-800 shadow-lg rounded-lg mt-32">
            <h2 className="text-3xl font-semibold text-center mb-5 text-gray-100">Your Cart</h2>
            {items.length === 0 ? (
                <p className="text-center text-gray-400 text-xl">Your cart is empty.</p>
            ) : (
                <ul className="grid gap-4">
                    {items.map(({ id, title, price, count }) => (
                        <li key={id} className="flex justify-between items-center rounded-xl px-5 py-4 bg-gray-600">
                            <div>
                                <p className="font-semibold text-white">{title}</p>
                                <p className="text-gray-400">${price} x {count}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => dispatch(decreaseCount(id))}
                                    className="px-3 py-1 bg-gray-800 rounded cursor-pointer text-white hover:bg-gray-700">
                                    -
                                </button>
                                <span className="text-white">{count}</span>
                                <button
                                    onClick={() => dispatch(increaseCount(id))}
                                    className="px-3 py-1 bg-gray-800 rounded cursor-pointer text-white hover:bg-gray-700">
                                    +
                                </button>
                                <button
                                    onClick={() => {
                                        dispatch(removeFromCart(id))
                                        toast.success("Product removed from cart")
                                    }}
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500">
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <div className="text-right text-lg font-semibold mt-5 text-gray-200">Total: ${total.toFixed(2)}</div>
            <ToastContainer position="top-right" autoClose={2200} />
        </section>
    )
}
