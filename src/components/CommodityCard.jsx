const CommodityCard = ({ item, addToCart }) => {
  if (!item) return null;

  return (
    <div className="border p-4 rounded-lg flex flex-col h-full bg-slate-900">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-48 object-cover mb-2 rounded"
      />
      <h2 className="text-lg font-bold text-white">{item.title}</h2>
      <p className="text-gray-400">${item.price}</p>
      <button
        className="bg-blue-600 text-white px-4 py-2 mt-auto rounded-md hover:bg-blue-700 transition-colors"
        onClick={() => addToCart(item)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CommodityCard;
