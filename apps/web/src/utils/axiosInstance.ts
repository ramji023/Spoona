import axios from "axios";
import { useAuthStore } from "../stores/authStore";
export const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response, //directly return response successfully
  async (error) => {
    const originalRequest = error.config;
    // if error response is 401 and we have not retried yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const storedToken = await axios.post("/api/v1/user/refresh", {
          withCredentials: true,
        });
        useAuthStore.setState({
          token: storedToken.data.data,
          isAuthenticated: true,
        });
        originalRequest.headers.Authorization = `Bearer ${storedToken.data.accessToken}`;
        return api(originalRequest); //retry the original request with new token
      } catch (err) {
        useAuthStore.setState({
          token: null,
          isAuthenticated: false,
        });
        window.location.href = "/auth/signin";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
