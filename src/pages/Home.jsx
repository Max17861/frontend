import { useState, useEffect } from "react";
import CommodityList from "../components/CommodityList";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchDbCart, addToDbCart } from "../network";

const Home = () => {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token"); // Retrieve auth. token
  const totalItems = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + item.quantity, 0)
    : 0;
  // Fetch a cart from Django Database
  useEffect(() => {
    const getInitialCart = async () => {
      if (token) {
        try {
          const dbCartData = await fetchDbCart(token);
          if (dbCartData) {
            setCart(dbCartData);
          }
        } catch (err) {
          console.error("Could not load cart data from backend:", err);
          setCart([]);
        }
      }
    };
    getInitialCart();
  }, [token]);

  // Add item directly to the Database
  const addToCart = async (item) => {
    if (!token) {
      alert("Please log in to append items to your cart.");
      return;
    }

    try {
      const updatedCart = await addToDbCart(item.id, token);
      if (updatedCart) {
        setCart(updatedCart);
      }
    } catch (err) {
      console.error("Could not add item to backend cart:", err);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar cartCount={totalItems} />
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center my-6">E-Shop</h1>
        <CommodityList addToCart={addToCart} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
