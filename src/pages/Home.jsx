import { useState, useEffect } from "react";
import CommodityList from "../components/CommodityList";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Add an item to the cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      let updatedCart;

      if (existingItem) {
        // Increase quantity if item already exists
        updatedCart = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      } else {
        // Add new item to cart with quantity 1
        updatedCart = [...prevCart, { ...item, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
      return updatedCart;
    });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar cartCount={cart.length} />
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
