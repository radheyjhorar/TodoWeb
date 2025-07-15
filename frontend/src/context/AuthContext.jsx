import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data.user));
    // console.log("Data: ", data.user);
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    setUser(data.user);
    scheduleAutoLogout(data.accessToken);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/login");
  };

  const isTokenValid = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return false;

    try {
      const { exp } = jwtDecode(token);
      return exp > Date.now() / 1000;
    } catch {
      return false;
    }
  };

  const scheduleAutoLogout = (token) => {
    try {
      const { exp } = jwtDecode(token);
      const expiresIn = exp * 1000 - Date.now();
      if (expiresIn > 0) {
        setTimeout(() => {
          logout();
        }, expiresIn);
      } else {
        logout();
      }
    } catch {
      logout();
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("accessToken");

      if (storedUser && storedToken) {
        if (isTokenValid()) {
          setUser(JSON.parse(storedUser));
          scheduleAutoLogout(storedToken);
        } else {
          logout();
        }
      }
      setLoading(false);
    };
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {loading ? "Loading..." : children}
    </AuthContext.Provider>
  );
};

// Hook for easier access
export const useAuth = () => useContext(AuthContext);
