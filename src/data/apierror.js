import axios from "axios";

export const handleApiError = (error, {logout}) => {


  const code = error.response?.data?.error?.code;
  console.log(code)
  const message = error.response?.data?.error?.message;

  ///api/v1/auth/reissue 호출 (refresh 쿠키 자동 전송) 했을때 401error가 나타날때
  const reissueToken = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/reissue`,
      {},
      {
        withCredentials: true
      }
    );

    const newAccessToken =
      response.headers.Authorization;

    localStorage.setItem(
      "accessToken",
      newAccessToken
    );

    } catch (error) {

      const code = error.response?.data?.error?.code;
      const message = error.response.data?.error?.message;

      switch (code) {

        case "AUTH_401_EXPIRED_REFRESH": 
          alert(message);
          logout();
          break;
        
        case "COMMON_404_NOT_FOUND": 
          alert(message);
          break;

        default:
          alert("예기치 못한 오류가 발생하였습니다.");
          break;
      }

    }

  }

  switch (code) {
    
    case "AUTH_401_EXPIRED_ACCESS":
        reissueToken();
        break;

    default:
        alert(message || "예기치 못한 오류가 발생하였습니다.");
    }
};