import { useNavigate } from "react-router";

const CategoryButton = ({ cat }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${encodeURIComponent(cat.toLowerCase())}`);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
    >
      {cat ? cat.toUpperCase() : "UNKNOWN"}
    </button>
  );
};

export default CategoryButton;
