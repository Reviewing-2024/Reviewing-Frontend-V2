import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// Interceptor 중복 등록 방지

let isInterceptorSetup = false;


// Token 재발급 상태

let isRefreshing = false;
let failedQueue = [];

// 대기 중인 요청 처리

const processQueue = (error, token = null) => {

  failedQueue.forEach((promise) => {

    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }

  });

  failedQueue = [];
};


// Interceptor 설정

export const setupInterceptors = (logout) => {

  // Interceptor가 중복으로 등록되는 것을 방지
  if (isInterceptorSetup) {
    return;
  }

  isInterceptorSetup = true;


  // Request Interceptor

  api.interceptors.request.use(
    (config) => {

      const accessToken =
        localStorage.getItem("accessToken");

      if (accessToken) {

        config.headers.Authorization =
          accessToken;

      }

      return config;
    },

    (error) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor

  api.interceptors.response.use(

    // 정상적인 응답
    (response) => {
      return response;
    },


    // 에러 응답
    async (error) => {

      const originalRequest = error.config;

      const code =
        error.response?.data?.error?.code;

      // Access Token 만료

      if (
        code === "AUTH_401_EXPIRED_ACCESS" &&
        !originalRequest._retry
      ) {


        // 이미 다른 요청이 Token 재발급 중

        if (isRefreshing) {

          return new Promise((resolve, reject) => {

            failedQueue.push({
              resolve,
              reject,
            });

          }).then((newAccessToken) => {

            originalRequest.headers.Authorization =
              newAccessToken;

            return api(originalRequest);

          });

        }

        // Token 재발급 시작

        originalRequest._retry = true;
        isRefreshing = true;


        try {

          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/reissue`,
            {},
            {
              withCredentials: true,
            }
          );

          // 새로운 Access Token

          const newAccessToken =
            response.headers.authorization;

          // localStorage 저장

          localStorage.setItem(
            "accessToken",
            newAccessToken
          );

          // 대기 중인 요청 처리

          processQueue(
            null,
            newAccessToken
          );

          // 원래 요청 다시 실행

          originalRequest.headers.Authorization =
            newAccessToken;

          return api(originalRequest);


        } catch (refreshError) {

          // 대기 중인 요청 실패 처리

          processQueue(
            refreshError,
            null
          );


          const refreshCode =
            refreshError.response?.data?.error?.code;

          // Refresh Token 만료

          if (
            refreshCode ===
            "AUTH_401_EXPIRED_REFRESH"
          ) {

            const message =
              refreshError.response?.data?.error?.message;

            alert(
              message ||
              "로그인이 만료되었습니다. 다시 로그인해주세요."
            );

            logout();
          }


          return Promise.reject(refreshError);


        } finally {

          isRefreshing = false;

        }

      }

      // 그 외 에러
      return Promise.reject(error);

    }

  );

};


export default api;