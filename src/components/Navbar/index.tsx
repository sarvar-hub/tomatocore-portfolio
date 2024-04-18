import "./style.css"
import { useContext, useState } from "react";
import { assets } from "@/assets/assets"
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "@/context/store.context";

interface INavbarProps {
  setShowLogin: (b: boolean) => void;
}

const Navbar = ({ setShowLogin }: INavbarProps) => {
  const [menu, setMenu] = useState<string>("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken("");
    navigate("/");
  }

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
        <img className="navbar-icon" src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img className="navbar-icon" src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() > 0 ? 'dot' : ''}></div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
          : <div className="navbar-profile">
            <img className="navbar-icon" src={assets.profile_icon} alt="profile_icon" />
            <ul className="nav-profile-dropdown">
              <li>
                <img src={assets.bag_icon} alt="bag_icon" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="logout_icon" />
                <p>Logout</p>
              </li>
            </ul>
          </div>}
      </div>
    </div>
  )
}

export default Navbar;

