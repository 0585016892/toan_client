import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || console.error("REACT_APP_API_URL is not defined in .env file");

const authApi = {
  login: (data) =>
    axios.post(`${API_URL}/auth/auth/login`, data).then((res) => res.data),
};

export default authApi;
