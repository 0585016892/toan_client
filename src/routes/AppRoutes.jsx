import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Machines from "../pages/Machines";
import ProductDetail from "../pages/ProductDetail";
import CartPage from "../pages/CartPage";
import QuoteRequest from "../components/QuoteRequest";
import ProfilePage from "../pages/ProfilePage";
import Contact from "../pages/Contact";
import AboutUs from "../pages/About";

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/machines" element={<Machines />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/quote" element={<QuoteRequest />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
          {/* <Route path="/machines/:id" element={<MachineDetail />} /> */}
          {/* <Route path="/quote" element={<Quote />} /> */}
        </Route>
      </Routes>
  );
}
