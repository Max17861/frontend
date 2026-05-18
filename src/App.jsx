import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="category/:category" element={<Category />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
