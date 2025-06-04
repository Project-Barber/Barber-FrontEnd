import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // ou sua URL de API
    withCredentials: true


});

api.interceptors.request.use((config) => {
  const authData = localStorage.getItem("authData");

  if (authData) {
    const token = JSON.parse(authData).token;
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
