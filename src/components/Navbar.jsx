import { Link } from "react-router-dom"

export const Navbar = () => (
  <nav className="p-4 bg-blue-600 text-white flex gap-4">
    <Link to="/">Products</Link>
    <Link to="/basket">Basket</Link>
    <Link to="/product/add">Add Product</Link>
  </nav>
)