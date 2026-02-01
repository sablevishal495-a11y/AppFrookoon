import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import ProductListing from "./pages/ProductListing.jsx";
import Cart from "./pages/Cart.jsx";
import LoginPhone from "./pages/LoginPhone.jsx";
import LoginOtp from "./pages/LoginOtp.jsx";
import { isLoggedIn } from "./utils/auth";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPhone />} />
        <Route path="/login-otp" element={<LoginOtp />} />

        <Route
          path="/"
          element={
            isLoggedIn() ? (
              <ProductListing />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/cart"
          element={
            isLoggedIn() ? (
              <Cart cart={cart} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
