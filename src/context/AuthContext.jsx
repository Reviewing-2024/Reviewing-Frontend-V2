import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("accessToken");
    const savedUsername = localStorage.getItem("username");
    const savedProfileImage = localStorage.getItem("profileImage");

    setIsLogin(!!token);
    setUsername(savedUsername);
    setProfileImage(savedProfileImage);

  }, []);


  const login = (token, username, profileImage) => {

    localStorage.setItem("accessToken", token);
    localStorage.setItem("username", username);
    localStorage.setItem("profileImage", profileImage);

    setIsLogin(true);
    setUsername(username);
    setProfileImage(profileImage);

  };


  const logout = async () => {

    try {

      const api = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        withCredentials: true,
      });

      await api.post("/api/v1/auth/logout");

    } catch (e) {

      console.error("logout api failed:", e);

    } finally {

      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      localStorage.removeItem("profileImage");

      setIsLogin(false);
      setUsername(null);

    }

  };


  return (
    <AuthContext.Provider value={{
      isLogin,
      username,
      profileImage,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => useContext(AuthContext);
