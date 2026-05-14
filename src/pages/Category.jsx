import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { apiConfig } from "../network"; // Import API URLs
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import CommodityCard from "../components/CommodityCard";

const Category = () => {
  const { category } = useParams();
  const [items, setItems] = useState([]);

  const [cart, setCart] = useState([]);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      } else {
        updatedCart = [...prevCart, { ...item, quantity: 1 }];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <Header />
      <div id="items-list" className="...">
        {items.map((item) => (
          <CommodityCard key={item.id} item={item} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Category;
