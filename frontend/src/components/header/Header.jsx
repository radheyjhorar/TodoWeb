import "./Header.css";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { ThemeSwitch } from "../buttons";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login')
  };

  const msg = `Logged in as "${
    user && user.name.charAt(0).toUpperCase() + user.name.slice(1)
  }"`;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header-container ">
      <div className="h-left-div">
        <Link to="/">
        <h1 className="text-xl font-bold">MERN ToDo App</h1>
        </Link>
      </div>

      <div className="h-right-div">
        <ThemeSwitch />
        {user && (
          <>
            <span className="flex items-center">{msg}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>

      <div className="menu" onClick={toggleMenu}>
        <button className={`menu-icon ${menuOpen ? 'open': 'close'}`}>{menuOpen ? <IoIosClose /> : <IoIosMenu />}</button>
        <div
          className="menu-options"
          style={{ display: menuOpen ? "block" : "none" }}
        >
          <ul>
            <li>PRofile</li>
            <li>Dark</li>
            <li>Logout</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
