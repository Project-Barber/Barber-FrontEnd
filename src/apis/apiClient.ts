// src/apis/apiClient.ts
import axios from "axios";

axios.defaults.baseURL = import.meta.env.API_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: import.meta.env.API_BASE_URL || "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
