import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { apiConfig, getProductsByCategory, fetchDbCart } from "../network"; // Import API URLs
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import CommodityCard from "../components/CommodityCard";
//import { getProductsByCategory } from "../network";

const Category = () => {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem("token");
  // Fetch products for the specific category
  useEffect(() => {
    const fetchCategoryItems = async () => {
      if (category) {
        const data = await getProductsByCategory(category);
        setItems(data);
      }
    };
    fetchCategoryItems();
  }, [category]); // Re-runs when the URL changes

  // Load cart from localStorage
  //useEffect(() => {
  //  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  //  setCart(storedCart);
  //}, []);
  useEffect(() => {
    const syncCart = async () => {
      if (token) {
        const dbCartData = await fetchDbCart(token);
        if (dbCartData) {
          setCart(dbCartData);
        }
      }
    };
    syncCart();
  }, [token]);

  /* const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      let updatedCart = existingItem
        ? prevCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem,
          )
        : [...prevCart, { ...item, quantity: 1 }];

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }; */

  const addToCart = async (item) => {
    if (!token) {
      alert("Please log in to append records to your cart.");
      return;
    }
    // Update structural state on DB, returning whole list back down to set state
    const updatedCart = await addToDbCart(item.id, token);
    if (updatedCart) {
      setCart(updatedCart);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* <Navbar /> */}
      <Navbar cartCount={cart.reduce((acc, curr) => acc + curr.quantity, 0)} />
      <Header />
      <div
        id="items-list"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 py-6"
      >
        {items.length > 0 ? (
          items.map((item) => (
            <CommodityCard key={item.id} item={item} addToCart={addToCart} />
          ))
        ) : (
          <p className="col-span-full text-center">
            No products found in {category}
          </p>
        )}
      </div>
    </div>
  );
};

export default Category;
