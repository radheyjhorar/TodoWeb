import "./Layout.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Layout = () => {
  const { loading } = useAuth();

  return (
    <div className="layout-container">
      <header>
        <Header />
      </header>
      <main>
        <div className="contenet-container">
          {loading ? "Loading...": <Outlet />}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
