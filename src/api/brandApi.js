import axiosClient from "./axiosClient";

const brandApi = {
  getAll() {
    return axiosClient.get("/brands");
  },
};

export default brandApi;
