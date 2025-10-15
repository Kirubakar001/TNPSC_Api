import axios from "axios";
import { decryptData } from "../utils/secureStorage";

// ✅ Base URL from environment (.env)
const BASE_URL = import.meta.env.VITE_API_BACKEND_URL;
console.log("Base URL:", BASE_URL);

// ✅ Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: String(import.meta.env.VITE_WITH_CREDENTIALS || "false") === "true",
});

// ✅ Request Interceptor — attach token & dynamic headers
api.interceptors.request.use(
  (config) => {
    try {
      // 🧠 Attach auth token if available
      const cipher = localStorage.getItem("user");
      const user = decryptData(cipher);
      const token = user?.token || user?.accessToken || user?.jwt;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // 🧩 Add default header
      config.headers["X-Requested-With"] = "XMLHttpRequest";

      // 🔍 Detect data type and set content-type accordingly
      if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        config.headers["Content-Type"] = "application/json";
      }
    } catch (error) {
      console.warn("Token or header setup error:", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor — handle global errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized — redirecting to login...");
      localStorage.removeItem("user");
      window.location.href = "/"; // redirect to login or home
    }
    return Promise.reject(error);
  }
);

export default api;
