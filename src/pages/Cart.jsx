import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { fetchDbCart, checkoutDbCart, addToDbCart } from "../network";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token"); // Grab token from auth state

  // 1. Fetch initial cart contents from Database
  useEffect(() => {
    const getCartData = async () => {
      if (token) {
        const dbCart = await fetchDbCart(token);
        if (dbCart) setCart(dbCart);
      }
    };
    getCartData();
  }, [token]);

  const removeFromCart = (id) => {
    // Keep your existing deletion or sync it with a backend endpoint later
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // 2. Buy Handler execution
  const handleBuy = async () => {
    if (!token) {
      alert("Please log in to complete your purchase.");
      return;
    }

    const confirmation = window.confirm(
      "Are you sure you want to purchase these items?",
    );
    if (confirmation) {
      const result = await checkoutDbCart(token);
      if (result) {
        alert("🎉 Purchase successful! Thank you for your order.");
        setCart([]); // Clear out the frontend UI state completely
      }
    }
  };

  const handleCheckout = async () => {
    if (!token) return;

    try {
      const response = await checkoutDbCart(token);
      if (response && response.message) {
        alert(response.message);
        setCart([]);
      }
    } catch (err) {
      console.error("Could not complete checkout:", err);
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar cartCount={cart.reduce((acc, curr) => acc + curr.quantity, 0)} />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-lg text-gray-400">
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cart.map((item) => (
                <div
                  key={item.cart_item_id}
                  className="bg-white shadow-md rounded-lg p-4 text-gray-900 flex flex-col h-full justify-between"
                >
                  <div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-32 h-32 mx-auto object-contain"
                    />
                    <h2 className="text-lg font-semibold text-center my-2 line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-center text-sm text-gray-500">
                      Price: ${Number(item.price).toFixed(2)}
                    </p>
                    <p className="text-center">Quantity: {item.quantity}</p>
                    <p className="text-center font-semibold">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Total and Buy action area */}
            <div className="text-center mt-8 bg-gray-800 p-6 rounded-lg max-w-md mx-auto shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                Total: ${totalPrice.toFixed(2)}
              </h2>
              <button
                onClick={handleBuy}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform active:scale-95 shadow-md"
              >
                Place Order (Buy Now)
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
