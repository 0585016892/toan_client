// src/api/categoryApi.js
import axiosClient from "./axiosClient";

const categoryApi = {
  getAll() {
    return axiosClient.get("/categories");
  },
};

export default categoryApi;
