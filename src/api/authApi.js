import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const authApi = {
  login: (data) =>
    axios.post(`${API_URL}/auth/auth/login`, data).then((res) => res.data),
};

export default authApi;
