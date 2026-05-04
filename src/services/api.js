import axios from "axios";

const API = axios.create({
  baseURL: "https://noble-spirit-production-cb4d.up.railway.app/api"
});

// request interceptor → token attach karega
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 🔥 FIXED
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // 🔥 extra cleanup
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;