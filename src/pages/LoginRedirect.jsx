import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../context/AuthContext";

const LoginRedirect = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const run = async () => {
      const api = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        withCredentials: true,
      });

      const res = await api.post("/api/v1/auth/access", null, {
        headers: { Accept: "application/json" },
      });

      const accessToken = res.headers.authorization;


      if (!accessToken) {
        alert("access token을 받지 못했어요. 백엔드 응답 형식을 확인해주세요.");
        navigate("/");
        return;
      }

      login(accessToken);
      navigate("/");
    };

    run().catch((e) => {
      console.error(e);
      alert("로그인 처리 중 오류가 발생했어요.");
      navigate("/");
    });
  }, [navigate]);

  return <div style={{ padding: 40 }}>로그인 처리 중...</div>;
};

export default LoginRedirect;
