import "./style.css"
import { useContext, useState } from "react";
import { assets } from "@/assets/assets"
import { Link } from "react-router-dom";
import { StoreContext } from "@/context/store.context";

interface INavbarProps {
  setShowLogin: (b: boolean) => void;
}

const Navbar = ({setShowLogin}:INavbarProps) => {
  const [menu, setMenu] = useState<string>("home");
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <div className="navbar">
      <Link to='/'><img className="logo" src={assets.logo} alt="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img style={{width: 25, height: 25}} src={assets.basket_icon} alt="" /></Link>
           <div className={ getTotalCartAmount() > 0 ? 'dot': '' }></div>
        </div>
        <button onClick={()=> setShowLogin(true)}>sign in</button>
      </div>
    </div>
  )
}

export default Navbar;
