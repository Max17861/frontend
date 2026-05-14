import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { fetchGoods } from "../network";
import Navbar from "../components/Navbar";
import CommodityCard from "../components/CommodityCard.jsx";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);

  useEffect(() => {
    const getFilteredResults = async () => {
      const allItems = await fetchGoods();
      // Filter
      const filtered = allItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      );
      setResults(filtered);
    };

    getFilteredResults();
  }, [query]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Results for: "{query}"</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {results.length > 0 ? (
            results.map((item) => <CommodityCard key={item.id} item={item} />)
          ) : (
            <p>No items found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
