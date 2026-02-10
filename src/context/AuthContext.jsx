import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLogin(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsLogin(true);
  };

  const logout = async () => {
    try {
      const api = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        withCredentials: true,
      });

      await api.post("/api/v1/auth/logout", null, {
        headers: { Accept: "application/json" },
      });
    } catch (e) {
      console.error("logout api failed:", e);
    } finally {
      localStorage.removeItem("accessToken");
      setIsLogin(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
