import { fetchGoods } from "../network";
import { saveToCart, isInTheCart } from "../main";
import CommodityCard from "./CommodityCard";
import { useState, useEffect } from "react";
//import { fetchGoods } from "../network";

let items;

const CommodityList = ({ addToCart }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lstItems = await fetchGoods(); // Fetch
        setItems(lstItems); // Update the state
      } catch (error) {
        console.error("Error fetching goods:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      id="items-list"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4"
    >
      {items.map((item) => (
        <CommodityCard key={item.id} item={item} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default CommodityList;
