import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || console.error("REACT_APP_API_URL is not defined in .env file"),
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================== REQUEST INTERCEPTOR ================== */
axiosClient.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
      console.log("🔐 SEND TOKEN:", user.token.slice(0, 20), "...");
    } else {
      console.warn("⚠️ NO TOKEN IN LOCALSTORAGE");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================== RESPONSE INTERCEPTOR ================== */
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Token hết hạn hoặc không hợp lệ");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
