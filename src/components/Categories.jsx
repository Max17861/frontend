import { getCategories } from "../network";
import CategoryButton from "./CategoryButton";
import { useState, useEffect } from "react";

const Categories = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lstItems = await getCategories(); // Fetch the data
        setItems(lstItems); // Update the state with the fetched items
      } catch (error) {
        console.error("Error by fetching categories:", error);
      }
    };

    fetchData(); // Call the async function to fetch data
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div
      id="cat-list"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4"
    >
      {items.map((item, index) => (
        <CategoryButton key={index} cat={item} />
      ))}
    </div>
  );
};

export default Categories;
