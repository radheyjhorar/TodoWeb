import "./Header.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const user = localStorage.getItem("user");
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark" || false
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>MERN ToDo App</h1>

      <button
        onClick={() => setDark(!dark)}
        className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 ml-4"
      >
        {dark? 'Light': "Dark"} Mode
      </button>

      {user && (
        <>
          <h4>Logged in as {user.name}</h4>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
