import Header from "../header/Header"
import Footer from "../footer/Footer"
import { Outlet } from 'react-router-dom';

const Layout = () => {

  const viewHeight = window.innerHeight;

  return (
    <div className="layout-container">
      <header>
        <Header />
      </header>
      <main className="content-container p-4 bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
        <Outlet />
      </main>
      <footer style={viewHeight > 100 && { position: "relative" }}>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout