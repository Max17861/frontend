const CommodityCard = ({ item, addToCart }) => {
  if (!item) return null;
  return (
    <div className="border p-4 rounded">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-48 object-cover mb-2"
      />
      <h2 className="text-lg font-bold">{item.title}</h2>
      <p className="text-gray-600">${item.price}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2 hover:bg-blue-600"
        onClick={() => addToCart(item)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CommodityCard;
