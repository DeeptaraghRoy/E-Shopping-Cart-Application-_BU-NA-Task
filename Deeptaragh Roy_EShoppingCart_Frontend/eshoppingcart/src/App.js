import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Product from "./components/Product";
import Contact from "./components/Contact";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import ProductByCategory from "./components/ProductByCategory";
import ProductSearch from "./components/ProductSearch";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ViewProfile from "./components/ViewProfile";
import EditProfile from "./components/EditProfile";
import AdminEdit from "./components/AdminEdit";
import AdminEditProductDetails from "./components/AdminEditProductDetails";
import AdminProductByCategory from "./components/AdminProductByCategory";
import AdminProductSearch from "./components/AdminProductSearch";

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/Cat/:cat" element={<ProductByCategory />} />
        <Route path="/product/Search/:search" element={<ProductSearch />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ViewProfile" element={<ViewProfile />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/AdminEdit" element={<AdminEdit />} />
        <Route
          path="/AdminEdit/ProductDetails/:id"
          element={<AdminEditProductDetails />}
        />
        <Route
          path="/AdminProductEdit/Cat/:cat"
          element={<AdminProductByCategory />}
        />
        <Route
          path="/AdminProductEdit/Search/:search"
          element={<AdminProductSearch />}
        />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
