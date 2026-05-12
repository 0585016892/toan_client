// src/api/productApi.js
import axiosClient from "./axiosClient";

const productApi = {
  search(keyword) {
    return axiosClient.get(`/products/timkiem?search=${keyword}`);
  },
  getAll: (params) =>
    axiosClient.get("/products/timkiem", { params }),
  getDetail: (slug) =>
    axiosClient.get(`/products/detail/${slug}`),
};

export default productApi;
