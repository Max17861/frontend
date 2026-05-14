import { useNavigate } from "react-router";

const CategoryButton = ({ cat }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${cat}`); // Navigate to category page
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
    >
      {cat.toUpperCase()}
    </button>
  );
};

export default CategoryButton;
