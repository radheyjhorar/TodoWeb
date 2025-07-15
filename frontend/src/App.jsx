import "./App.css";
import { Home, Login, PageNotFound, Register } from "./pages/index";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={user ? "/home" : "/login"} />} />
        <Route
          path="register"
          element={user ? <Navigate to="/home" /> : <Register />}
        />
        <Route
          path="login"
          element={user ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="home"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
