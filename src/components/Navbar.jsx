import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { logoutUser } from "../network";

const Navbar = ({ cartCount }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  const handleLogout = async () => {
    try {
      if (token) {
        await logoutUser(token);
      }
    } catch (err) {
      console.error("Backend logout failed:", err);
    } finally {
      // clear local tokens and redirect
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/");
      window.location.reload(); // Refresh
    }
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Home */}
        <Link to="/" className="text-lg font-bold">
          Home
        </Link>

        {/* Search Bar  */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-grow justify-center mx-8"
        >
          <div className="relative w-full max-w-md flex">
            <input
              id="search-bar"
              type="search"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-l-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-r-lg hover:bg-yellow-500"
            >
              Search
            </button>
          </div>
        </form>

        {/* Auth & Cart Navigation Links */}
        <div className="flex items-center space-x-6">
          {token ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">Hi, {username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.2 rounded text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4 flex">
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-sm font-medium transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Cart Link  */}
          <Link to="/cart" className="text-lg flex items-center relative">
            Cart
            {cartCount > 0 && (
              <span className="ml-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
