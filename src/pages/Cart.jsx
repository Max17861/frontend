import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg p-4 text-gray-900"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-32 mx-auto object-contain"
                />
                <h2 className="text-lg font-semibold text-center my-2">
                  {item.title}
                </h2>
                <p className="text-center text-sm text-gray-500">
                  Price: ${Number(item.price).toFixed(2)}
                </p>
                <p className="text-center">Quantity: {item.quantity}</p>
                <p className="text-center font-semibold">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="text-center mt-8">
            <h2 className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
