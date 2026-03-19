import axios from "axios";

export const handleApiError = (error, {logout}) => {


  const code = error.response.status;
  const message = error.response.data?.error?.message;

  const error_401 = async () => {


    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/access`,
        {}
      );

    } catch (error) {

      const code = error.response.status;
      const message = error.response.data?.error?.message;

      switch (code) {

        case 401: 
          alert(message);
          logout();
          break;
        
        case 404: 
          alert(message);
          break;

        default:
          alert("예기치 못한 오류가 발생하였습니다.");
          break;
      }

    }

  }

  switch (code) {

    case 401:
        error_401();
        break;

    default:
        alert(message || "예기치 못한 오류가 발생하였습니다.");
    }
};