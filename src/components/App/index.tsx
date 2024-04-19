import Navbar from "@/components/Navbar";
import "./style.css";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import PlaceOrder from "@/pages/PlaceOrder";
import Footer from "@/components/Footer";
import { useState } from "react";
import LoginPopup from "@/components/LoginPopup";
import Verify from "@/pages/Verify";

const App = () => {
  const [showLogin, setShowLogin] = useState<boolean>(false);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
