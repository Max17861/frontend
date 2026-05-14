import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import SearchResults from "./pages/SearchResults";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="category/:category" element={<Category />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/search" element={<SearchResults />} />
    </Routes>
  );
};

export default App;
